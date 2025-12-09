from http.server import BaseHTTPRequestHandler
import json
import os
import datetime
from supabase import create_client

class handler(BaseHTTPRequestHandler):
    def do_POST(self):
        try:
            data = json.loads(self.rfile.read(int(self.headers.get('Content-Length'))))
            user_id = data.get('user_id')
            
            SUPABASE_URL = os.environ.get('SUPABASE_URL')
            SUPABASE_KEY = os.environ.get('SUPABASE_SERVICE_ROLE_KEY')
            supabase = create_client(SUPABASE_URL, SUPABASE_KEY)

            # --- 自動キャンセル処理 ---
            pending_orders = supabase.table('orders').select('*').eq('user_id', user_id).eq('status', 'pending').execute().data
            
            now_utc = datetime.datetime.now(datetime.timezone.utc)
            
            for order in pending_orders:
                created_at_str = order['created_at']
                try:
                    # 'Z' をUTCオフセットに変換してパース
                    created_at = datetime.datetime.fromisoformat(created_at_str.replace('Z', '+00:00'))
                    
                    if (now_utc - created_at).total_seconds() > 3600:
                        supabase.table('orders').update({'status': 'expired'}).eq('id', order['id']).execute()
                        
                except Exception as e:
                    print(f"Date parse error: {e}")
                    continue

            # 最新履歴を返す
            orders = supabase.table('orders').select('*').eq('user_id', user_id).order('created_at', desc=True).execute().data
            
            self.send_response(200)
            self.send_header('Content-type', 'application/json')
            self.end_headers()
            self.wfile.write(json.dumps(orders).encode())
        except Exception as e:
            self.send_response(500)
            self.end_headers()
            self.wfile.write(json.dumps({"error": str(e)}).encode())
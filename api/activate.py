from http.server import BaseHTTPRequestHandler
import json
import os
import datetime
from supabase import create_client

class handler(BaseHTTPRequestHandler):
    def do_POST(self):
        try:
            content_len = int(self.headers.get('Content-Length'))
            data = json.loads(self.rfile.read(content_len))
            
            discord_id = str(data.get('discord_id'))
            license_key = data.get('license_key', '').strip()

            if not discord_id or not license_key:
                raise Exception("入力が不足しています")

            SUPABASE_URL = os.environ.get('SUPABASE_URL')
            SUPABASE_KEY = os.environ.get('SUPABASE_SERVICE_ROLE_KEY')
            supabase = create_client(SUPABASE_URL, SUPABASE_KEY)

            code_res = supabase.table('codes').select('*').eq('code', license_key).eq('is_used', False).execute()
            
            if not code_res.data:
                raise Exception("無効なライセンスキー、または既に使用されています。")

            code_data = code_res.data[0]
            add_days = int(code_data['days'])

            user_res = supabase.table('users').select('*').eq('discord_id', discord_id).execute()
            
            now_utc = datetime.datetime.now(datetime.timezone.utc)
            new_expires_at = None

            if user_res.data:
                current_expires_str = user_res.data[0]['expires_at']
                current_expires = datetime.datetime.fromisoformat(current_expires_str.replace('Z', '+00:00'))
                
                if current_expires > now_utc:
                    new_expires_at = current_expires + datetime.timedelta(days=add_days)
                else:
                    new_expires_at = now_utc + datetime.timedelta(days=add_days)
            else:
                new_expires_at = now_utc + datetime.timedelta(days=add_days)
            
            supabase.table('codes').update({'is_used': True}).eq('code', license_key).execute()
            
            upsert_data = {
                'discord_id': discord_id,
                'expires_at': new_expires_at.isoformat(),
                'plan_name': f"{add_days}Day Plan",
                'is_active': True
            }
            supabase.table('users').upsert(upsert_data).execute()

            jst_tz = datetime.timezone(datetime.timedelta(hours=9))
            new_expiry_jst = new_expires_at.astimezone(jst_tz).strftime('%Y-%m-%d %H:%M')

            self.send_response(200)
            self.send_header('Content-type', 'application/json')
            self.end_headers()
            self.wfile.write(json.dumps({
                "success": True, 
                "new_expiry": new_expiry_jst
            }).encode())

        except Exception as e:
            self.send_response(400)
            self.end_headers()
            self.wfile.write(json.dumps({"error": str(e)}).encode())
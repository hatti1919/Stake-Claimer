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
            
            SUPABASE_URL = os.environ.get('SUPABASE_URL')
            SUPABASE_KEY = os.environ.get('SUPABASE_SERVICE_ROLE_KEY')
            supabase = create_client(SUPABASE_URL, SUPABASE_KEY)

            # ユーザー情報を取得
            user_res = supabase.table('users').select('*').eq('discord_id', discord_id).execute()
            
            info = {
                "active": False,
                "plan_name": None,
                "expires_at": None,
                "account_limit": 1,     # デフォルト上限
                "linked_accounts": []   # 連携済みアカウントリスト
            }

            if user_res.data:
                user_data = user_res.data[0]
                expires_at_str = user_data['expires_at']
                
                # 期限チェック (タイムゾーン処理を安全に行う)
                try:
                    # 'Z' を '+00:00' に置換して UTC として認識させる
                    expires_dt = datetime.datetime.fromisoformat(expires_at_str.replace('Z', '+00:00'))
                    now_utc = datetime.datetime.now(datetime.timezone.utc)

                    if expires_dt > now_utc:
                        info["active"] = True
                        info["plan_name"] = user_data.get('plan_name', 'License')
                        info["expires_at"] = expires_at_str
                except Exception as e:
                    print(f"Date Parse Error: {e}")
                    # パースエラー時は無効扱いにするが、処理は続行
                
                # アカウント上限数を取得
                info["account_limit"] = user_data.get('account_limit', 1)

                # 連携済みStakeアカウント一覧を取得
                acc_res = supabase.table('stake_accounts').select('*').eq('discord_id', discord_id).order('created_at').execute()
                if acc_res.data:
                    # セキュリティのためAPIキーそのものは返さず、IDとユーザー名のみ返す
                    info["linked_accounts"] = [
                        {
                            "id": acc["id"], 
                            "username": acc["username"], 
                            "created_at": acc["created_at"]
                        }
                        for acc in acc_res.data
                    ]

            self.send_response(200)
            self.send_header('Content-type', 'application/json')
            self.end_headers()
            self.wfile.write(json.dumps(info).encode())

        except Exception as e:
            self.send_response(500)
            self.end_headers()
            self.wfile.write(json.dumps({"error": str(e)}).encode())
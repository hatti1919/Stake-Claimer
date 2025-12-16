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

            # usersテーブルから情報を取得
            user_res = supabase.table('users').select('*').eq('discord_id', discord_id).execute()
            
            info = {
                "active": False,
                "plan_name": "Free",
                "expires_at": None,
                "account_limit": 1,
                "linked_accounts": []
            }

            if user_res.data:
                user_data = user_res.data[0]
                
                # 有効期限チェック
                expires_at_str = user_data.get('expires_at')
                plan_name = user_data.get('plan_name', 'License')
                # account_limitはDB定義上textですが数値として扱う
                try:
                    acc_limit = int(user_data.get('account_limit', 1))
                except:
                    acc_limit = 1

                info["expires_at"] = expires_at_str
                info["plan_name"] = plan_name
                info["account_limit"] = acc_limit

                # 有効期限判定
                if expires_at_str:
                    try:
                        # タイムゾーン処理（簡易的）
                        expires_dt = datetime.datetime.fromisoformat(expires_at_str.replace('Z', '+00:00'))
                        now_utc = datetime.datetime.now(datetime.timezone.utc)
                        if expires_dt > now_utc:
                            info["active"] = True
                    except:
                        pass
                
                # Stakeアカウント情報の構築
                # usersテーブルに stake_username があれば連携済みとみなす
                if user_data.get('stake_username'):
                    info["linked_accounts"] = [{
                        "id": 1, # IDはダミー（必要ならDBに追加するか、固定値で運用）
                        "username": user_data.get('stake_username'),
                        "created_at": user_data.get('created_at') # 連携日時はユーザー作成日時で代用、または無視
                    }]

            self.send_response(200)
            self.send_header('Content-type', 'application/json')
            self.end_headers()
            self.wfile.write(json.dumps(info).encode())

        except Exception as e:
            self.send_response(500)
            self.end_headers()
            self.wfile.write(json.dumps({"error": str(e)}).encode())
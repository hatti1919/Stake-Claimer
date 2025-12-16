from http.server import BaseHTTPRequestHandler
import json
import os
from supabase import create_client

class handler(BaseHTTPRequestHandler):
    def do_POST(self):
        try:
            # 1. リクエストの取得
            content_len = int(self.headers.get('Content-Length'))
            req_body = json.loads(self.rfile.read(content_len))
            
            discord_id = str(req_body.get('discord_id'))

            if not discord_id:
                raise Exception("ユーザーIDが指定されていません")

            # 2. Supabase接続
            SUPABASE_URL = os.environ.get('SUPABASE_URL')
            SUPABASE_KEY = os.environ.get('SUPABASE_SERVICE_ROLE_KEY')
            supabase = create_client(SUPABASE_URL, SUPABASE_KEY)

            # 3. 連携情報の削除 (NULL更新)
            # api_token と stake_username を NULL に設定します
            update_data = {
                'api_token': None,
                'stake_username': None
            }
            
            # 指定したDiscord IDのユーザーを更新
            res = supabase.table('users').update(update_data).eq('discord_id', discord_id).execute()

            if not res.data:
                # ユーザーが存在しない、または更新されなかった場合
                raise Exception("解除に失敗しました。ユーザーが見つからないか、既に解除されています。")

            # 4. 成功レスポンス
            self.send_response(200)
            self.send_header('Content-type', 'application/json')
            self.end_headers()
            self.wfile.write(json.dumps({"success": True}).encode())

        except Exception as e:
            self.send_response(400)
            self.end_headers()
            self.wfile.write(json.dumps({"error": str(e)}).encode())
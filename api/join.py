from http.server import BaseHTTPRequestHandler
import json
import os
import requests

class handler(BaseHTTPRequestHandler):
    def do_POST(self):
        try:
            # 1. フロントエンド(index.html)からデータを受け取る
            content_len = int(self.headers.get('Content-Length'))
            post_body = self.rfile.read(content_len)
            data = json.loads(post_body)

            user_id = data.get('user_id')
            access_token = data.get('provider_token')
            
            # Vercelの環境変数から「Botの鍵」と「サーバーID」を読み込む
            # ※ コードに直書きすると危険なので、Vercelの設定画面で入れます
            BOT_TOKEN = os.environ.get('DISCORD_BOT_TOKEN')
            GUILD_ID = os.environ.get('DISCORD_GUILD_ID')

            if not BOT_TOKEN or not GUILD_ID:
                print("Error: 環境変数が設定されていません (DISCORD_BOT_TOKEN, DISCORD_GUILD_ID)")
                self.send_response(500)
                self.end_headers()
                return

            # 2. Discord APIを叩いてサーバーに参加させる (Add Guild Member)
            url = f"https://discord.com/api/v10/guilds/{GUILD_ID}/members/{user_id}"
            
            headers = {
                "Authorization": f"Bot {BOT_TOKEN}",
                "Content-Type": "application/json"
            }
            
            payload = {
                "access_token": access_token
            }

            print(f"Adding user {user_id} to guild {GUILD_ID}...")
            response = requests.put(url, headers=headers, json=payload)
            
            # ログ用に出力（VercelのLogsで見れます）
            print(f"Discord API Response: {response.status_code} - {response.text}")

            # 3. 結果をサイト側に返す
            self.send_response(200)
            self.send_header('Content-type', 'application/json')
            self.end_headers()
            
            if response.status_code == 201:
                self.wfile.write(json.dumps({"message": "Joined! (新規参加)"}).encode())
            elif response.status_code == 204:
                self.wfile.write(json.dumps({"message": "Already joined (既に参加済み)"}).encode())
            else:
                self.wfile.write(json.dumps({"message": f"Failed: {response.text}"}).encode())
                
        except Exception as e:
            print(f"Server Error: {str(e)}")
            self.send_response(500)
            self.end_headers()
            self.wfile.write(json.dumps({"error": str(e)}).encode())
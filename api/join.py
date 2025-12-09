from http.server import BaseHTTPRequestHandler
import json
import os
import requests

class handler(BaseHTTPRequestHandler):
    def do_POST(self):
        try:
            content_len = int(self.headers.get('Content-Length'))
            body = self.rfile.read(content_len)
            data = json.loads(body)

            user_id = data.get('user_id')
            access_token = data.get('provider_token')
            
            BOT_TOKEN = os.environ.get('DISCORD_BOT_TOKEN')
            GUILD_ID = os.environ.get('DISCORD_GUILD_ID')

            if not BOT_TOKEN or not GUILD_ID:
                raise Exception("Server config error: Missing tokens")

            # Discord API: Add Guild Member
            url = f"https://discord.com/api/v10/guilds/{GUILD_ID}/members/{user_id}"
            headers = {
                "Authorization": f"Bot {BOT_TOKEN}",
                "Content-Type": "application/json"
            }
            # access_tokenを使ってサーバーに参加させる
            payload = { "access_token": access_token }

            res = requests.put(url, headers=headers, json=payload)
            
            # 201: Created, 204: No Content (Already joined)
            if res.status_code in [201, 204]:
                self.send_response(200)
                self.send_header('Content-type', 'application/json')
                self.end_headers()
                self.wfile.write(json.dumps({"success": True}).encode())
            else:
                # 失敗してもフロントを止めないために200でエラー内容を返す
                self.send_response(200)
                self.send_header('Content-type', 'application/json')
                self.end_headers()
                self.wfile.write(json.dumps({"success": False, "discord_status": res.status_code, "msg": res.text}).encode())

        except Exception as e:
            self.send_response(500)
            self.end_headers()
            self.wfile.write(json.dumps({"error": str(e)}).encode())
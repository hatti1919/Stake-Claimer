from http.server import BaseHTTPRequestHandler
import json
import os

class handler(BaseHTTPRequestHandler):
    def do_GET(self):
        self.send_response(200)
        self.send_header('Content-type', 'application/json')
        self.end_headers()
        # 環境変数からフロントに必要な情報を取得
        config = {
            "SUPABASE_URL": os.environ.get('SUPABASE_URL'),
            "SUPABASE_KEY": os.environ.get('SUPABASE_KEY'),
            "TURNSTILE_SITE_KEY": os.environ.get('TURNSTILE_SITE_KEY'), # サイトキーを追加
        }
        self.wfile.write(json.dumps(config).encode())
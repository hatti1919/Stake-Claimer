from http.server import BaseHTTPRequestHandler
import json
import os
import requests
from supabase import create_client

class handler(BaseHTTPRequestHandler):
    def do_POST(self):
        try:
            # 1. リクエストボディの取得
            content_len = int(self.headers.get('Content-Length'))
            req_body = json.loads(self.rfile.read(content_len))
            
            discord_id = str(req_body.get('discord_id'))
            api_key = req_body.get('api_key', '').strip()

            if not discord_id or not api_key:
                raise Exception("APIキーが入力されていません")

            # 2. Stake APIでの検証 (ご提示のロジックを統合)
            # Vercel環境用に requests を使用しますが、ヘッダーやクエリは提示コードに準拠
            
            url = "https://stake.com/_api/graphql"
            
            headers = {
                "Accept": "*/*",
                "Content-Type": "application/json",
                "Origin": "https://stake.com",
                "Referer": "https://stake.com/",
                "Sec-Ch-Ua": '"Not_A Brand";v="99", "Google Chrome";v="109", "Chromium";v="109"',
                "Sec-Ch-Ua-Mobile": "?0",
                "Sec-Ch-Ua-Platform": '"Windows"',
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36",
                "X-Access-Token": api_key,
                "X-Language": "ja",
                "X-Operation-Name": "GetUserInfo",
                "X-Operation-Type": "query"
            }
            
            # クエリ定義
            payload = {
                "operationName": "GetUserInfo",
                "query": """query GetUserInfo {
                  user {
                    id
                    name
                    __typename
                  }
                }"""
            }

            # リクエスト送信
            try:
                response = requests.post(
                    url,
                    json=payload,
                    headers=headers,
                    timeout=15
                )
            except Exception as e:
                raise Exception(f"Stake APIへの接続に失敗しました: {str(e)}")

            if response.status_code != 200:
                # 403等はCloudflare等の影響の可能性あり
                raise Exception(f"Stake API Error (Status: {response.status_code})")

            try:
                data = response.json()
            except:
                raise Exception(f"Invalid JSON response (Status: {response.status_code})")

            # エラーチェック
            if data.get("errors"):
                error_msg = data["errors"][0].get("message", "Unknown API Error")
                raise Exception(f"API Error: {error_msg}")

            # ユーザー情報の取得確認
            if not (data.get("data") and data["data"].get("user")):
                raise Exception("無効なAPIキーです (User Not Found)")

            user_data = data["data"]["user"]
            stake_username = user_data["name"]

            # 3. Supabaseへの保存処理
            SUPABASE_URL = os.environ.get('SUPABASE_URL')
            SUPABASE_KEY = os.environ.get('SUPABASE_SERVICE_ROLE_KEY')
            supabase = create_client(SUPABASE_URL, SUPABASE_KEY)

            # ユーザー存在確認
            user_check = supabase.table('users').select('*').eq('discord_id', discord_id).execute()
            
            if not user_check.data:
                 raise Exception("ユーザーが見つかりません。先にログインしてください。")

            # api_token と stake_username を更新
            update_data = {
                'api_token': api_key,
                'stake_username': stake_username
            }
            
            update_res = supabase.table('users').update(update_data).eq('discord_id', discord_id).execute()

            if not update_res.data:
                 raise Exception("データベースの更新に失敗しました。")

            # 成功レスポンス
            self.send_response(200)
            self.send_header('Content-type', 'application/json')
            self.end_headers()
            self.wfile.write(json.dumps({
                "success": True, 
                "stake_username": stake_username
            }).encode())

        except Exception as e:
            self.send_response(400)
            self.end_headers()
            self.wfile.write(json.dumps({"error": str(e)}).encode())
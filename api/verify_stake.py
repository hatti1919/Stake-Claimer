from http.server import BaseHTTPRequestHandler
import json
import os
import tls_client
from supabase import create_client

class handler(BaseHTTPRequestHandler):
    def do_POST(self):
        try:
            # 1. リクエストボディの読み込み
            content_len = int(self.headers.get('Content-Length'))
            req_body = json.loads(self.rfile.read(content_len))
            
            discord_id = str(req_body.get('discord_id'))
            api_key = req_body.get('api_key', '').strip()

            if not discord_id or not api_key:
                raise Exception("APIキーが入力されていません")

            # 2. Stake APIでの検証 (tls_clientを使用)
            url = "https://stake.com/_api/graphql"
            
            # ブラウザの挙動を模倣するためのセッション作成
            # Edge 129 の情報を使用するため、近いプリセットを使用
            session = tls_client.Session(
                client_identifier="chrome_120", # 新しめのChromeベースとして設定
                random_tls_extension_order=True
            )

            # tomato1212.yml の値を直書きで設定
            headers = {
                "authority": "stake.com",
                "accept": "*/*",
                "content-type": "application/json",
                "origin": "https://stake.com",
                "referer": "https://stake.com/",
                # ここに指定されたUAとCHUAを直書き
                "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36 Edg/129.0.0.0",
                "sec-ch-ua": '"Microsoft Edge";v="129", "Not=A?Brand";v="8", "Chromium";v="129"',
                "sec-ch-ua-mobile": "?0",
                "sec-ch-ua-platform": '"Windows"',
                "sec-fetch-dest": "empty",
                "sec-fetch-mode": "cors",
                "sec-fetch-site": "same-origin",
                "x-access-token": api_key,
                "x-language": "ja",
                "x-operation-name": "GetUserInfo",
                "x-operation-type": "query"
            }
            
            # tomato1212.yml の cf_clearance を直書き
            cookies = {
                "cf_clearance": "GLQ5sNGliHkN_zm9PuD_d.uJC_I6yNvpHhcl7ipAvug-1761108806-1.2.1.1-MOCs6fIrMBbjxZAMuhUlBC2cKxYPWJPrKYTVkf07cQd73aBfFD6pgG.cVMWiadA0mfuJT4JCwkAf5JRQz2tr9uS.rXMVd5j8GLkjILiYRBgEmFsAKmE8zgAUR.jQKP65XDuagxLY6NUhHZTlg2Sktb.EB0BjsTuKuBMBvkXGGyoiKRpdP5xka5Qj0bGu8Di7dRodxBybaTKYcmD6x6K..lYetbo5kKeNPirm9ki2ReA"
            }

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

            try:
                # リクエスト送信
                response = session.post(
                    url,
                    json=payload,
                    headers=headers,
                    cookies=cookies,
                    timeout_seconds=15
                )
            except Exception as e:
                raise Exception(f"Stake APIへの接続エラー: {str(e)}")

            # レスポンスチェック
            if response.status_code == 403:
                 raise Exception("Stake APIへのアクセスが拒否されました(403)。Cloudflareによるブロックです。")

            if response.status_code != 200:
                 raise Exception(f"Stake API Error (Status: {response.status_code})")

            try:
                data = response.json()
            except:
                raise Exception(f"Invalid JSON response")

            if data.get("errors"):
                error_msg = data["errors"][0].get("message", "Unknown API Error")
                raise Exception(f"API Error: {error_msg}")

            if not (data.get("data") and data["data"].get("user")):
                raise Exception("無効なAPIキーです (User Not Found)")

            user_data = data["data"]["user"]
            stake_username = user_data["name"]

            # 3. Supabaseへの保存処理
            SUPABASE_URL = os.environ.get('SUPABASE_URL')
            SUPABASE_KEY = os.environ.get('SUPABASE_SERVICE_ROLE_KEY')
            
            if not SUPABASE_URL or not SUPABASE_KEY:
                raise Exception("サーバー設定エラー: DB接続情報がありません")

            supabase = create_client(SUPABASE_URL, SUPABASE_KEY)

            # ユーザー存在確認
            user_check = supabase.table('users').select('*').eq('discord_id', discord_id).execute()
            
            if not user_check.data:
                 raise Exception("ユーザーが見つかりません。先にライセンスを有効化してください。")

            # 情報を更新
            update_data = {
                'api_token': api_key,
                'stake_username': stake_username
            }
            
            update_res = supabase.table('users').update(update_data).eq('discord_id', discord_id).execute()

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
from http.server import BaseHTTPRequestHandler
import json
import os
import requests
import datetime
from supabase import create_client

class handler(BaseHTTPRequestHandler):
    def do_POST(self):
        try:
            # リクエストの読み込み
            content_len = int(self.headers.get('Content-Length'))
            data = json.loads(self.rfile.read(content_len))
            
            discord_id = str(data.get('discord_id'))
            api_key = data.get('api_key', '').strip()

            if not discord_id or not api_key:
                raise Exception("APIキーが入力されていません")

            # Supabaseクライアント初期化
            SUPABASE_URL = os.environ.get('SUPABASE_URL')
            SUPABASE_KEY = os.environ.get('SUPABASE_SERVICE_ROLE_KEY')
            supabase = create_client(SUPABASE_URL, SUPABASE_KEY)

            # 1. Stake GraphQL APIで有効性検証
            url = "https://api.stake.com/graphql"
            headers = {
                "Content-Type": "application/json",
                "x-access-token": api_key
            }
            query = """
            query {
                user {
                    id
                    username
                }
            }
            """
            
            response = requests.post(url, json={"query": query}, headers=headers)
            
            if response.status_code != 200:
                raise Exception("Stake APIへの接続に失敗しました")
            
            res_json = response.json()
            if "errors" in res_json or "data" not in res_json or not res_json["data"]["user"]:
                raise Exception("無効なAPIキーです。")

            stake_username = res_json["data"]["user"]["username"]

            # 2. DBへの保存処理 (usersテーブルを更新)
            # 指定されたテーブル定義に合わせてデータを更新します
            
            # まずユーザーが存在するか確認
            user_check = supabase.table('users').select('*').eq('discord_id', discord_id).execute()
            
            if not user_check.data:
                # ユーザーが見つからない場合のエラー
                 raise Exception("ユーザーが見つかりません。")

            # api_token と stake_username を更新
            update_data = {
                'api_token': api_key,
                'stake_username': stake_username
            }
            
            update_res = supabase.table('users').update(update_data).eq('discord_id', discord_id).execute()

            if not update_res.data:
                 raise Exception("データの更新に失敗しました。")

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
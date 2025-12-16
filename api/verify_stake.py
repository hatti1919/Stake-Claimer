from http.server import BaseHTTPRequestHandler
import json
import os
import requests
import datetime
from supabase import create_client

class handler(BaseHTTPRequestHandler):
    def do_POST(self):
        try:
            content_len = int(self.headers.get('Content-Length'))
            data = json.loads(self.rfile.read(content_len))
            
            discord_id = str(data.get('discord_id'))
            api_key = data.get('api_key', '').strip()

            if not discord_id or not api_key:
                raise Exception("APIキーが入力されていません")

            SUPABASE_URL = os.environ.get('SUPABASE_URL')
            SUPABASE_KEY = os.environ.get('SUPABASE_SERVICE_ROLE_KEY')
            supabase = create_client(SUPABASE_URL, SUPABASE_KEY)

            # 1. ユーザー情報とアカウント上限のチェック
            user_res = supabase.table('users').select('account_limit').eq('discord_id', discord_id).execute()
            limit = 1
            if user_res.data:
                limit = user_res.data[0].get('account_limit', 1)

            # 現在の登録数をカウント
            count_res = supabase.table('stake_accounts').select('*', count='exact').eq('discord_id', discord_id).execute()
            current_count = count_res.count if count_res.count is not None else len(count_res.data)

            # APIキーの重複チェック
            dup_check = supabase.table('stake_accounts').select('*').eq('api_key', api_key).execute()
            if dup_check.data:
                raise Exception("このAPIキーは既に登録されています。")

            # 上限チェック
            if current_count >= limit:
                raise Exception(f"アカウント登録数の上限({limit}個)に達しています。")

            # 2. Stake GraphQL APIで有効性検証
            url = "https://api.stake.com/graphql"
            headers = {
                "Content-Type": "application/json",
                "x-access-token": api_key
            }
            # 最小限のクエリでユーザー名を取得
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
                raise Exception("無効なAPIキーです。権限がないか、間違っています。")

            stake_username = res_json["data"]["user"]["username"]

            # 3. DBへの保存処理
            
            # ユーザーが存在しない場合は作成 (Freeプラン/期限切れ状態)
            if not user_res.data:
                now_utc = datetime.datetime.now(datetime.timezone.utc)
                # on_conflict='discord_id' で重複エラーを回避してUpsert
                supabase.table('users').upsert({
                    'discord_id': discord_id,
                    'expires_at': now_utc.isoformat(),
                    'plan_name': 'Free',
                    'is_active': False,
                    'account_limit': 1
                }, on_conflict='discord_id').execute()

            # stake_accounts テーブルに追加
            supabase.table('stake_accounts').insert({
                'discord_id': discord_id,
                'api_key': api_key,
                'username': stake_username
            }).execute()

            # usersテーブルの連携フラグを更新
            supabase.table('users').update({'stake_verified': True}).eq('discord_id', discord_id).execute()

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
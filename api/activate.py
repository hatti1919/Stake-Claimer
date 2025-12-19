from http.server import BaseHTTPRequestHandler
import json
import os
import datetime
import requests  # 追加: Discordへの送信に使用
from supabase import create_client

class handler(BaseHTTPRequestHandler):
    def do_POST(self):
        try:
            content_len = int(self.headers.get('Content-Length'))
            data = json.loads(self.rfile.read(content_len))
            
            discord_id = str(data.get('discord_id'))
            license_key = data.get('license_key', '').strip()

            if not discord_id or not license_key:
                raise Exception("入力が不足しています")

            # 環境変数読み込み
            SUPABASE_URL = os.environ.get('SUPABASE_URL')
            SUPABASE_KEY = os.environ.get('SUPABASE_SERVICE_ROLE_KEY')
            DISCORD_BOT_TOKEN = os.environ.get('DISCORD_BOT_TOKEN') # Bot Token
            LOG_CHANNEL_ID = os.environ.get('LOG_CHANNEL_ID')       # ログ用チャンネルID
            VOUCH_CHANNEL_ID = os.environ.get('VOUCH_CHANNEL_ID')   # 実績用チャンネルID

            supabase = create_client(SUPABASE_URL, SUPABASE_KEY)

            # 1. コード検証
            code_res = supabase.table('codes').select('*').eq('code', license_key).eq('is_used', False).execute()
            if not code_res.data:
                raise Exception("無効なライセンスキー、または既に使用されています。")

            code_data = code_res.data[0]
            add_days = int(code_data.get('days', 0))
            add_hours = int(code_data.get('hours', 0)) # hoursも取得

            # 2. 現在のユーザー情報を取得
            user_res = supabase.table('users').select('*').eq('discord_id', discord_id).execute()
            
            now_utc = datetime.datetime.now(datetime.timezone.utc)
            new_expires_at = None

            # 期限計算
            delta = datetime.timedelta(days=add_days, hours=add_hours)
            if user_res.data:
                current_expires_str = user_res.data[0]['expires_at']
                try:
                    current_expires = datetime.datetime.fromisoformat(current_expires_str.replace('Z', '+00:00'))
                except:
                    current_expires = now_utc

                if current_expires > now_utc:
                    new_expires_at = current_expires + delta
                else:
                    new_expires_at = now_utc + delta
            else:
                new_expires_at = now_utc + delta
            
            # 3. データ更新
            supabase.table('codes').update({'is_used': True}).eq('code', license_key).execute()
            
            plan_name = f"{add_days}Day" if add_days > 0 else ""
            if add_hours > 0: plan_name += f" {add_hours}Hour"
            plan_name += " Plan"

            upsert_data = {
                'discord_id': discord_id,
                'expires_at': new_expires_at.isoformat(),
                'plan_name': plan_name,
                'is_active': True
            }
            supabase.table('users').upsert(upsert_data, on_conflict='discord_id').execute()

            # JST変換
            jst_tz = datetime.timezone(datetime.timedelta(hours=9))
            new_expiry_jst = new_expires_at.astimezone(jst_tz).strftime('%Y-%m-%d %H:%M')

            # --- Discord通知送信機能 (Web統合) ---
            def send_discord_msg(channel_id, embed):
                if not channel_id or not DISCORD_BOT_TOKEN: return
                url = f"https://discord.com/api/v9/channels/{channel_id}/messages"
                headers = {
                    "Authorization": f"Bot {DISCORD_BOT_TOKEN}",
                    "Content-Type": "application/json"
                }
                requests.post(url, headers=headers, json={"embeds": [embed]})

            # ログ送信 (Owner Log)
            if LOG_CHANNEL_ID:
                log_embed = {
                    "title": "🎟 Webコード有効化",
                    "description": f"ユーザー: <@{discord_id}>\nコード: `{license_key}`\n追加: {add_days}日 {add_hours}時間\n期限: {new_expiry_jst}",
                    "color": 0x00AAFF,
                    "timestamp": datetime.datetime.now(datetime.timezone.utc).isoformat()
                }
                send_discord_msg(LOG_CHANNEL_ID, log_embed)

            # 実績送信 (Vouch Log)
            if VOUCH_CHANNEL_ID:
                vouch_embed = {
                    "title": "🎉 Vouch",
                    "color": 0x00FF00, # Green
                    "fields": [
                        {"name": "👤利用者", "value": f"<@{discord_id}>", "inline": False},
                        {"name": "📆追加", "value": f"```{add_days}日 {add_hours}時間```", "inline": False},
                        {"name": "⏳有効期限", "value": f"```{new_expiry_jst}```", "inline": False},
                        {"name": "☘️FeedBack", "value": "**[お客様の声を見る](https://discord.gg/GtUnnxmtpN)**", "inline": False}
                    ],
                    "footer": {"text": "ご利用ありがとうございます🙇"},
                    "timestamp": datetime.datetime.now(datetime.timezone.utc).isoformat()
                }
                send_discord_msg(VOUCH_CHANNEL_ID, vouch_embed)
            # ---------------------------------------

            self.send_response(200)
            self.send_header('Content-type', 'application/json')
            self.end_headers()
            self.wfile.write(json.dumps({
                "success": True, 
                "new_expiry": new_expiry_jst
            }).encode())

        except Exception as e:
            self.send_response(400)
            self.end_headers()
            self.wfile.write(json.dumps({"error": str(e)}).encode())
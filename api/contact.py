from http.server import BaseHTTPRequestHandler
import json
import os
import discord
import asyncio
import base64
import io
import datetime
import pytz
import requests
import re
from supabase import create_client # ★Supabaseクライアントを追加

class DeleteButtonView(discord.ui.View):
    def __init__(self):
        super().__init__(timeout=None)
        self.add_item(discord.ui.Button(
            style=discord.ButtonStyle.danger,
            label="チケットを削除",
            custom_id="persistent_ticket_delete_v1",
            emoji="🗑️"
        ))

class SimpleClient(discord.Client):
    def __init__(self, data):
        intents = discord.Intents.default()
        intents.members = True
        super().__init__(intents=intents)
        self.contact_data = data
        self.result = None

    async def on_ready(self):
        try:
            guild_id = int(os.environ.get('DISCORD_GUILD_ID'))
            category_id = int(os.environ.get('DISCORD_WEB_TICKET_CATEGORY_ID'))
            staff_role_id = os.environ.get('DISCORD_STAFF_ROLE_ID')
            log_channel_id = os.environ.get('DISCORD_LOG_CHANNEL_ID')
            
            guild = self.get_guild(guild_id)
            if not guild:
                guild = await self.fetch_guild(guild_id)
            
            category = guild.get_channel(category_id)
            
            user_name = self.contact_data.get('user_name', 'Unknown')
            user_id = self.contact_data.get('user_id') 
            discord_user_id = self.contact_data.get('discord_user_id') 
            subject = self.contact_data.get('subject') 
            
            # チャンネル名生成
            safe_username = re.sub(r'[^a-z0-9]', '-', user_name.lower())
            safe_username = re.sub(r'-+', '-', safe_username).strip('-')
            channel_suffix = safe_username if safe_username else discord_user_id
            ch_name = f"ticket-{channel_suffix}"
            
            # 重複チェック
            existing_channel = discord.utils.get(category.channels, name=ch_name)
            if existing_channel:
                self.result = {"success": False, "error": "既に未解決のチケットが存在します。"}
                await self.close()
                return

            topic = f"WebContact UserID:{user_id} DiscordID:{discord_user_id}"
            
            # 権限設定
            overwrites = {
                guild.default_role: discord.PermissionOverwrite(read_messages=False),
                guild.me: discord.PermissionOverwrite(read_messages=True, send_messages=True)
            }

            if staff_role_id:
                try:
                    staff_role = guild.get_role(int(staff_role_id))
                    if staff_role:
                        overwrites[staff_role] = discord.PermissionOverwrite(read_messages=True, send_messages=True, attach_files=True)
                except: pass

            target_member = None
            if discord_user_id:
                try:
                    target_member = guild.get_member(int(discord_user_id))
                    if not target_member:
                        target_member = await guild.fetch_member(int(discord_user_id))
                    
                    if target_member:
                        overwrites[target_member] = discord.PermissionOverwrite(read_messages=True, send_messages=True, attach_files=True)
                except: pass

            channel = await guild.create_text_channel(
                name=ch_name,
                category=category,
                topic=topic,
                overwrites=overwrites
            )
            
            staff_mention = f"<@&{staff_role_id}>" if staff_role_id else "@here"
            user_mention = target_member.mention if target_member else f"<@{discord_user_id}>"

            embed1 = discord.Embed(
                title="🧾 チケットが作成されました！",
                description=f"{user_mention} 様\nスタッフが対応しますので、少々お待ちください。",
                color=discord.Color.green()
            )
            embed1.add_field(name="チケット番号", value="`Web Ticket`", inline=True)
            embed1.add_field(name="カテゴリ", value=subject, inline=True)
            embed1.timestamp = datetime.datetime.now(pytz.timezone("Asia/Tokyo"))

            embed2 = discord.Embed(
                title="お問合せ内容",
                description=self.contact_data.get('description'),
                color=discord.Color.from_rgb(230, 230, 230)
            )
            embed2.set_author(name=user_name) 
            if self.contact_data.get('order_id'):
                embed2.add_field(name="関連オーダーID", value=f"`{self.contact_data.get('order_id')}`", inline=False)
            embed2.timestamp = datetime.datetime.now(pytz.timezone("Asia/Tokyo"))

            files = []
            img_data = self.contact_data.get('image_data')
            if img_data:
                try:
                    if "," in img_data: header, encoded = img_data.split(",", 1)
                    else: encoded = img_data
                    decoded_data = base64.b64decode(encoded)
                    file = discord.File(io.BytesIO(decoded_data), filename="attachment.png")
                    files.append(file)
                    embed2.set_image(url="attachment://attachment.png")
                except: pass

            view = DeleteButtonView()
            await channel.send(
                content=f"{staff_mention} {user_mention}",
                embeds=[embed1, embed2],
                view=view,
                files=files
            )

            if log_channel_id:
                try:
                    log_ch = guild.get_channel(int(log_channel_id))
                    if log_ch:
                        log_embed = discord.Embed(title="🆕 Webチケット作成", description=f"CH: {channel.mention}\nUser: {user_name}", color=discord.Color.green())
                        await log_ch.send(embed=log_embed)
                except: pass

            self.result = {"success": True}
        except Exception as e:
            self.result = {"success": False, "error": str(e)}
        finally:
            await self.close()

class handler(BaseHTTPRequestHandler):
    def do_POST(self):
        try:
            # 1. ヘッダーからSupabaseトークンを取得
            auth_header = self.headers.get('Authorization')
            if not auth_header or not auth_header.startswith("Bearer "):
                raise Exception("認証エラー: ログインが必要です。")

            token = auth_header.split(" ")[1]

            # 2. Supabaseでトークンを検証し、ユーザー情報を取得
            SUPABASE_URL = os.environ.get('SUPABASE_URL')
            SUPABASE_KEY = os.environ.get('SUPABASE_SERVICE_ROLE_KEY') # 管理者キーで検証
            
            supabase = create_client(SUPABASE_URL, SUPABASE_KEY)
            user_res = supabase.auth.get_user(token)
            
            if not user_res.user:
                raise Exception("認証エラー: 無効なトークンです。再ログインしてください。")

            # ★ここが最重要: トークンから判明した「本物のID」を取得
            real_user = user_res.user
            real_user_id = real_user.id
            # Discord IDは user_metadata に入っているはず
            real_discord_id = real_user.user_metadata.get('provider_id')
            real_user_name = real_user.user_metadata.get('full_name', 'Unknown')

            if not real_discord_id:
                raise Exception("Discord IDが見つかりません。")

            # 3. リクエストボディの読み込み
            content_len = int(self.headers.get('Content-Length'))
            body = self.rfile.read(content_len)
            data = json.loads(body)
            
            # ★上書き: リクエストの内容にかかわらず、本物のIDを使用する
            data['user_id'] = real_user_id
            data['discord_user_id'] = real_discord_id
            data['user_name'] = real_user_name

            # --- 以下、Bot処理 ---
            discord_bot_token = os.environ.get('DISCORD_BOT_TOKEN')
            discord_guild_id = os.environ.get('DISCORD_GUILD_ID')
            provider_token = data.get('provider_token')

            # サーバー参加処理 (もしDiscordトークンがあれば)
            if discord_bot_token and discord_guild_id and provider_token:
                try:
                    url = f"https://discord.com/api/v10/guilds/{discord_guild_id}/members/{real_discord_id}"
                    headers = { "Authorization": f"Bot {discord_bot_token}", "Content-Type": "application/json" }
                    payload = { "access_token": provider_token }
                    requests.put(url, headers=headers, json=payload)
                except: pass

            client = SimpleClient(data)
            asyncio.run(client.start(discord_bot_token))
            
            if client.result and client.result["success"]:
                self.send_response(200)
                self.send_header('Content-type', 'application/json')
                self.end_headers()
                self.wfile.write(json.dumps({"message": "Sent"}).encode())
            else:
                error_msg = client.result["error"] if client.result else "Unknown error"
                self.send_response(400)
                self.send_header('Content-type', 'application/json')
                self.end_headers()
                self.wfile.write(json.dumps({"error": error_msg}).encode())

        except Exception as e:
            # 401 Unauthorized または 500 Error
            status_code = 401 if "認証エラー" in str(e) else 500
            self.send_response(status_code)
            self.end_headers()
            self.wfile.write(json.dumps({"error": str(e)}).encode())
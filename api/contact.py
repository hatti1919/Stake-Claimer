from http.server import BaseHTTPRequestHandler
import json
import os
import discord
import asyncio
import base64
import io
import datetime
import pytz

# 削除ボタン用のView (ticket 3.pyのBotが反応できるようにIDを統一)
class DeleteButtonView(discord.ui.View):
    def __init__(self):
        super().__init__(timeout=None)
        self.add_item(discord.ui.Button(
            style=discord.ButtonStyle.danger,
            label="チケットを削除",
            custom_id="persistent_ticket_delete_v1", # ticket 3.py と同じID
            emoji="🗑️"
        ))

class SimpleClient(discord.Client):
    def __init__(self, data):
        intents = discord.Intents.default()
        super().__init__(intents=intents)
        self.contact_data = data
        self.result = None

    async def on_ready(self):
        try:
            # 環境変数の読み込み
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
            subject = self.contact_data.get('subject') # カテゴリ
            
            # --- 1. チャンネル名: ticket-{user_id} ---
            topic = f"WebContact UserID:{user_id}"
            ch_name = f"ticket-{user_id}"
            
            channel = await guild.create_text_channel(
                name=ch_name,
                category=category,
                topic=topic
            )
            
            # --- 2. メンションの準備 ---
            staff_mention = f"<@&{staff_role_id}>" if staff_role_id else "@here"
            user_mention = f"<@{user_id}>"

            # --- 3. Embed作成 (2つに分ける) ---
            
            # Embed 1: 通知用 (緑色)
            embed1 = discord.Embed(
                title="🧾 チケットが作成されました！",
                description=f"{user_mention} 様\nスタッフが対応しますので、少々お待ちください。",
                color=discord.Color.green()
            )
            embed1.add_field(name="チケット番号", value="`Web Ticket`", inline=True)
            embed1.add_field(name="カテゴリ", value=subject, inline=True)
            # 現在時刻 (JST)
            now_jst = datetime.datetime.now(pytz.timezone("Asia/Tokyo"))
            embed1.timestamp = now_jst

            # Embed 2: 内容用 (グレー/白)
            embed2 = discord.Embed(
                title="お問合せ内容",
                description=self.contact_data.get('description'),
                color=discord.Color.from_rgb(230, 230, 230)
            )
            # ユーザー情報をAuthorに設定
            # アイコンURLが取得できない場合はデフォルト
            # ※ 本来はAPIでアバターURLも送ってもらうのが確実ですが、今回は簡易的に設定
            embed2.set_author(name=user_name) 
            
            if self.contact_data.get('order_id'):
                embed2.add_field(name="関連オーダーID", value=f"`{self.contact_data.get('order_id')}`", inline=False)
            
            embed2.timestamp = now_jst

            # --- 4. 画像処理 (Base64 -> File) ---
            files = []
            img_data = self.contact_data.get('image_data')
            if img_data:
                try:
                    if "," in img_data:
                        header, encoded = img_data.split(",", 1)
                    else:
                        encoded = img_data
                    
                    decoded_data = base64.b64decode(encoded)
                    # 画像ファイルとして添付
                    file = discord.File(io.BytesIO(decoded_data), filename="attachment.png")
                    files.append(file)
                    embed2.set_image(url="attachment://attachment.png") # Embed内に表示させる
                except Exception as e:
                    embed2.set_footer(text=f"画像展開エラー: {str(e)}")

            # --- 5. 送信 (ボタン付き) ---
            view = DeleteButtonView()
            
            await channel.send(
                content=f"{staff_mention} {user_mention}",
                embeds=[embed1, embed2],
                view=view,
                files=files
            )

            # --- 6. ログ送信 ---
            if log_channel_id:
                try:
                    log_ch = guild.get_channel(int(log_channel_id))
                    if log_ch:
                        log_embed = discord.Embed(
                            title="🆕 Webチケット作成ログ",
                            description=f"チャンネル: {channel.mention}\nユーザー: {user_name} ({user_id})",
                            color=discord.Color.green()
                        )
                        log_embed.timestamp = now_jst
                        await log_ch.send(embed=log_embed)
                except:
                    pass

            self.result = {"success": True}
        except Exception as e:
            self.result = {"success": False, "error": str(e)}
        finally:
            await self.close()

class handler(BaseHTTPRequestHandler):
    def do_POST(self):
        try:
            content_len = int(self.headers.get('Content-Length'))
            body = self.rfile.read(content_len)
            data = json.loads(body)
            
            token = os.environ.get('DISCORD_BOT_TOKEN')
            
            client = SimpleClient(data)
            asyncio.run(client.start(token))
            
            if client.result and client.result["success"]:
                self.send_response(200)
                self.send_header('Content-type', 'application/json')
                self.end_headers()
                self.wfile.write(json.dumps({"message": "Sent"}).encode())
            else:
                error_msg = client.result["error"] if client.result else "Unknown error"
                raise Exception(error_msg)

        except Exception as e:
            self.send_response(500)
            self.end_headers()
            self.wfile.write(json.dumps({"error": str(e)}).encode())
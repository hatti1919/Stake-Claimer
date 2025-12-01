from http.server import BaseHTTPRequestHandler
import json
import os
import requests
import discord
import asyncio

# Discord Client設定 (Botとして振る舞うため)
class SimpleClient(discord.Client):
    def __init__(self, data):
        intents = discord.Intents.default()
        super().__init__(intents=intents)
        self.contact_data = data
        self.result = None

    async def on_ready(self):
        try:
            guild_id = int(os.environ.get('DISCORD_GUILD_ID'))
            category_id = int(os.environ.get('DISCORD_WEB_TICKET_CATEGORY_ID')) # 環境変数に追加要
            
            guild = self.get_guild(guild_id)
            if not guild:
                guild = await self.fetch_guild(guild_id)
            
            category = guild.get_channel(category_id)
            
            # チケットチャンネル作成
            user_name = self.contact_data.get('user_name', 'Unknown')
            user_id = self.contact_data.get('user_id')
            topic = f"WebContact UserID:{user_id}"
            
            ch_name = f"web-ticket-{user_name[:10]}"
            
            channel = await guild.create_text_channel(
                name=ch_name,
                category=category,
                topic=topic
            )
            
            # Embed作成
            embed = discord.Embed(
                title=f"📩 Webからのお問い合わせ: {self.contact_data.get('subject')}",
                description=self.contact_data.get('description'),
                color=discord.Color.blue()
            )
            embed.add_field(name="送信者", value=f"{user_name} ({user_id})", inline=True)
            if self.contact_data.get('order_id'):
                embed.add_field(name="関連オーダーID", value=self.contact_data.get('order_id'), inline=True)
            
            # 画像がある場合（URLとして渡すか、今回は簡易的に説明文に追加）
            # ファイルアップロードはServerlessでは複雑になるため、
            # 画像URLがある場合のみEmbedに設定する形が望ましいが、
            # 今回はDiscord Webhook等を使わないClient方式なのでsend時にfile引数が使える
            
            # ここではファイルパスがないため、Base64などで送られてこない限りテキストのみ
            # (contact.html側で画像をWebhookなどで先にアップするか、
            #  またはここでシンプルにテキスト通知のみにする)
            
            await channel.send(content="@here Webからのお問い合わせです。", embed=embed)
            
            self.result = {"success": True, "channel_id": channel.id}
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
            
            # Botを一時的に起動してチャンネルを作る
            client = SimpleClient(data)
            asyncio.run(client.start(token))
            
            if client.result and client.result["success"]:
                self.send_response(200)
                self.send_header('Content-type', 'application/json')
                self.end_headers()
                self.wfile.write(json.dumps({"message": "Sent!"}).encode())
            else:
                raise Exception(client.result.get("error", "Unknown error"))

        except Exception as e:
            self.send_response(500)
            self.end_headers()
            self.wfile.write(json.dumps({"error": str(e)}).encode())
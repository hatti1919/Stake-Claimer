from http.server import BaseHTTPRequestHandler
import json
import os
import requests
import time
from supabase import create_client

class handler(BaseHTTPRequestHandler):
    def do_POST(self):
        try:
            content_len = int(self.headers.get('Content-Length'))
            data = json.loads(self.rfile.read(content_len))

            action = data.get('action') 
            user_id = data.get('user_id')
            email = data.get('email')
            plan_id = data.get('plan_id')
            coupon_code = data.get('coupon_code', '').strip()

            SUPABASE_URL = os.environ.get('SUPABASE_URL')
            SUPABASE_KEY = os.environ.get('SUPABASE_SERVICE_ROLE_KEY')
            MERCHANT_KEY = os.environ.get('OXAPAY_MERCHANT_KEY')
            supabase = create_client(SUPABASE_URL, SUPABASE_KEY)

            plans = {
                '1day':   {'price': 1200, 'label': '1 Day Plan'},
                '1week':  {'price': 3000, 'label': '1 Week Plan'},
                '2weeks': {'price': 5000, 'label': '2 Weeks Plan'},
                '1month': {'price': 6800, 'label': '1 Month Plan'}
            }
            
            if plan_id not in plans: raise Exception("無効なプランIDです")

            original_price = plans[plan_id]['price']
            final_price = original_price
            discount = 0

            # クーポン計算
            if coupon_code:
                res = supabase.table('coupons').select('*').eq('code', coupon_code).eq('is_active', True).execute()
                if res.data:
                    discount = res.data[0]['discount_amount']
                    final_price = max(1, original_price - discount)
                elif action == 'check_coupon':
                    # ★修正: クーポンが見つからない場合はエラーメッセージを返す
                    self.send_response(400)
                    self.send_header('Content-type', 'application/json')
                    self.end_headers()
                    self.wfile.write(json.dumps({"error": "クーポンコードが見当たりません。"}).encode())
                    return

            # 確認アクション (verifyOrderから呼ばれる)
            if action == 'check_coupon':
                self.send_response(200)
                self.send_header('Content-type', 'application/json')
                self.end_headers()
                self.wfile.write(json.dumps({
                    "valid": True,
                    "original_price": original_price,
                    "discount": discount,
                    "final_price": final_price,
                    "plan_name": plans[plan_id]['label']
                }).encode())
                return

            # 注文作成
            order_id = f"{int(time.time())}_{user_id[:4]}"
            
            payload = {
                "merchant": MERCHANT_KEY,
                "amount": final_price,
                "currency": "JPY",
                "lifeTime": 60,
                "feePaidByPayer": 1,
                "orderId": order_id,
                "email": email,
                "description": f"StakeClaimer: {plans[plan_id]['label']}",
                "callbackUrl": "https://stake-claimer.vercel.app/api/webhook", # Webhook
                "returnUrl": f"https://stake-claimer.vercel.app/checkout/{order_id}" 
            }
            
            oxa_res = requests.post("https://api.oxapay.com/merchants/request", json=payload).json()
            if oxa_res.get("result") != 100: raise Exception(f"Payment Error: {oxa_res.get('message')}")

            pay_link = oxa_res.get("payLink")

            supabase.table('orders').insert({
                "user_id": user_id,
                "order_id": order_id,
                "plan_type": plan_id,
                "amount": original_price,
                "discount_amount": discount,
                "final_amount": final_price,
                "coupon_code": coupon_code if coupon_code else None,
                "status": "pending",
                "pay_url": pay_link,
                "created_at": "now()"
            }).execute()

            # ★通知作成 (リンク付きメッセージ)
            plan_label = plans[plan_id]['label']
            link_html = f'<a href="/checkout/{order_id}" style="color:#fff; text-decoration:underline; font-weight:bold;">{plan_label}</a>'
            
            supabase.table('notifications').insert({
                "user_id": user_id,
                "title": f"支払い: {plan_label}",
                "message": f"{link_html} の注文を作成しました。\n下のリンクをクリックして支払いへ進んでください。",
                "type": "info"
            }).execute()

            self.send_response(200)
            self.send_header('Content-type', 'application/json')
            self.end_headers()
            self.wfile.write(json.dumps({"order_id": order_id, "pay_url": pay_link}).encode())

        except Exception as e:
            self.send_response(400)
            self.end_headers()
            self.wfile.write(json.dumps({"error": str(e)}).encode())
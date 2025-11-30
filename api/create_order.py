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
            body = self.rfile.read(content_len)
            data = json.loads(body)

            user_id = data.get('user_id')
            plan_id = data.get('plan_id')
            coupon_code = data.get('coupon_code', '').strip()
            # TrueならOxapayには投げず、計算結果だけ返す
            is_dry_run = data.get('dry_run', False) 

            # 環境変数
            MERCHANT_KEY = os.environ.get('OXAPAY_MERCHANT_KEY')
            SUPABASE_URL = os.environ.get('SUPABASE_URL')
            SUPABASE_KEY = os.environ.get('SUPABASE_KEY')
            supabase = create_client(SUPABASE_URL, SUPABASE_KEY)

            # 1. プラン定価定義
            plans = {
                '1day':   {'price': 1200, 'label': '1 Day Plan'},
                '1week':  {'price': 3000, 'label': '1 Week Plan'},
                '2weeks': {'price': 5000, 'label': '2 Weeks Plan'},
                '1month': {'price': 6800, 'label': '1 Month Plan'}
            }
            
            if plan_id not in plans:
                raise Exception("無効なプランIDです")

            original_price = plans[plan_id]['price']
            final_price = original_price
            discount = 0

            # 2. クーポン確認・適用
            if coupon_code:
                # DB検索
                res = supabase.table('coupons').select('*').eq('code', coupon_code).eq('is_active', True).execute()
                if res.data:
                    discount = res.data[0]['discount_amount']
                    final_price = max(1, original_price - discount)

            # --- ドライラン（計算確認）の場合 ---
            if is_dry_run:
                self.send_response(200)
                self.send_header('Content-type', 'application/json')
                self.end_headers()
                self.wfile.write(json.dumps({
                    "original_price": original_price,
                    "discount": discount,
                    "final_price": final_price,
                    "message": "Calculation only"
                }).encode())
                return

            # --- 本番注文作成 ---
            
            # Oxapay用注文ID生成
            order_id = f"{int(time.time())}_{user_id[:4]}"
            
            payload = {
                "merchant": MERCHANT_KEY,
                "amount": final_price,
                "currency": "JPY",
                "lifeTime": 60,       # 60分
                "feePaidByPayer": 1,  # 購入者負担
                "orderId": order_id,
                "description": f"StakeClaimer: {plans[plan_id]['label']} (Coupon: {coupon_code})",
                "returnUrl": "https://stake-claimer.vercel.app/index.html?action=history" 
            }
            
            # Oxapay API Request
            oxa_res = requests.post("https://api.oxapay.com/merchants/request", json=payload, headers={"Content-Type": "application/json"}).json()

            if oxa_res.get("result") != 100:
                raise Exception(f"Oxapay Error: {oxa_res.get('message')}")

            pay_link = oxa_res.get("payLink")

            # DB保存 (Pending)
            supabase.table('orders').insert({
                "user_id": user_id,
                "order_id": order_id,
                "plan_type": plan_id,
                "amount": final_price,
                "status": "pending",
                "pay_url": pay_link,
                "created_at": "now()"
            }).execute()

            self.send_response(200)
            self.send_header('Content-type', 'application/json')
            self.end_headers()
            self.wfile.write(json.dumps({
                "payLink": pay_link,
                "original_price": original_price,
                "discount": discount,
                "final_price": final_price
            }).encode())

        except Exception as e:
            self.send_response(500)
            self.end_headers()
            self.wfile.write(json.dumps({"error": str(e)}).encode())
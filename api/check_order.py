from http.server import BaseHTTPRequestHandler
import json
import os
import requests
from supabase import create_client
from datetime import datetime, timedelta, timezone

class handler(BaseHTTPRequestHandler):
    def do_POST(self):
        try:
            content_len = int(self.headers.get('Content-Length'))
            data = json.loads(self.rfile.read(content_len))
            
            order_id = data.get('order_id')
            user_id = data.get('user_id')

            MERCHANT_KEY = os.environ.get('OXAPAY_MERCHANT_KEY')
            SUPABASE_URL = os.environ.get('SUPABASE_URL')
            SUPABASE_KEY = os.environ.get('SUPABASE_KEY')
            supabase = create_client(SUPABASE_URL, SUPABASE_KEY)

            # DBから注文取得
            res = supabase.table('orders').select('*').eq('order_id', order_id).eq('user_id', user_id).execute()
            if not res.data:
                raise Exception("Order not found")
            
            order = res.data[0]

            # 既にPaidなら即返す
            if order['status'] == 'paid':
                self.send_response(200)
                self.send_header('Content-type', 'application/json')
                self.end_headers()
                self.wfile.write(json.dumps({
                    "status": "paid",
                    "license_key": order.get('license_key')
                }).encode())
                return

            # Oxapayに問い合わせ
            oxa_res = requests.post("https://api.oxapay.com/merchants/inquiry", 
                                  json={"merchant": MERCHANT_KEY, "orderId": order_id}).json()
            
            payment_status = oxa_res.get('status')

            if oxa_res.get('result') == 100 and payment_status == 'Paid':
                # 在庫引き当て
                key_res = supabase.rpc('claim_license_key', {
                    'p_plan_type': order['plan_type'],
                    'p_buyer_id': user_id
                }).execute()

                license_key = key_res.data
                
                # 在庫切れハンドリング
                if not license_key:
                    self.send_response(200)
                    self.send_header('Content-type', 'application/json')
                    self.end_headers()
                    self.wfile.write(json.dumps({
                        "status": "error",
                        "message": "支払いは確認できましたが、在庫切れが発生しました。サポートへ連絡してください。"
                    }).encode())
                    return

                # DB更新
                supabase.table('orders').update({
                    'status': 'paid',
                    'license_key': license_key
                }).eq('id', order['id']).execute()

                self.send_response(200)
                self.send_header('Content-type', 'application/json')
                self.end_headers()
                self.wfile.write(json.dumps({
                    "status": "paid",
                    "license_key": license_key
                }).encode())
            
            elif payment_status == 'Expired':
                supabase.table('orders').update({'status': 'expired'}).eq('id', order['id']).execute()
                self.send_response(200)
                self.send_header('Content-type', 'application/json')
                self.end_headers()
                self.wfile.write(json.dumps({"status": "expired"}).encode())
            
            else:
                self.send_response(200)
                self.send_header('Content-type', 'application/json')
                self.end_headers()
                self.wfile.write(json.dumps({"status": "pending"}).encode())

        except Exception as e:
            self.send_response(500)
            self.end_headers()
            self.wfile.write(json.dumps({"error": str(e)}).encode())
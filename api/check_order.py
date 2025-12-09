from http.server import BaseHTTPRequestHandler
import json
import os
import requests
import string
import random
from supabase import create_client

def generate_license_key(plan_type):
    chars = string.ascii_letters + string.digits
    random_str = ''.join(random.choices(chars, k=20))
    days_map = {'1day': 1, '1week': 7, '2weeks': 14, '1month': 30}
    days = days_map.get(plan_type, 0)
    return f"{random_str}-{days}", days

class handler(BaseHTTPRequestHandler):
    def do_POST(self):
        try:
            data = json.loads(self.rfile.read(int(self.headers.get('Content-Length'))))
            order_id = data.get('order_id')
            user_id = data.get('user_id')

            MERCHANT_KEY = os.environ.get('OXAPAY_MERCHANT_KEY')
            SUPABASE_URL = os.environ.get('SUPABASE_URL')
            SUPABASE_KEY = os.environ.get('SUPABASE_SERVICE_ROLE_KEY')
            supabase = create_client(SUPABASE_URL, SUPABASE_KEY)

            res = supabase.table('orders').select('*').eq('order_id', order_id).eq('user_id', user_id).execute()
            if not res.data: raise Exception("Order not found")
            order = res.data[0]

            if order['status'] == 'paid':
                self.send_response(200)
                self.end_headers()
                self.wfile.write(json.dumps({"status": "paid", "license_key": order.get('license_key')}).encode())
                return

            oxa_res = requests.post("https://api.oxapay.com/merchants/inquiry", 
                                  json={"merchant": MERCHANT_KEY, "orderId": order_id}).json()
            
            payment_status = oxa_res.get('status')

            if oxa_res.get('result') == 100 and payment_status == 'Paid':
                new_key, days = generate_license_key(order['plan_type'])

                supabase.table('orders').update({
                    'status': 'paid', 'license_key': new_key
                }).eq('id', order['id']).execute()

                supabase.table('codes').insert({
                    "code": new_key, "days": days, "is_used": True, "created_at": "now()"
                }).execute()

                supabase.table('notifications').insert({
                    "user_id": user_id, "title": "支払い完了",
                    "message": f"ライセンスキーが発行されました。\nKey: {new_key}", "type": "success"
                }).execute()

                self.send_response(200)
                self.end_headers()
                self.wfile.write(json.dumps({"status": "paid", "license_key": new_key}).encode())
            
            elif payment_status == 'Expired':
                supabase.table('orders').update({'status': 'expired'}).eq('id', order['id']).execute()
                self.send_response(200)
                self.end_headers()
                self.wfile.write(json.dumps({"status": "expired"}).encode())
            else:
                self.send_response(200)
                self.end_headers()
                self.wfile.write(json.dumps({"status": "pending"}).encode())

        except Exception as e:
            self.send_response(500)
            self.end_headers()
            self.wfile.write(json.dumps({"error": str(e)}).encode())
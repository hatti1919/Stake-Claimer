from http.server import BaseHTTPRequestHandler
import json
import os
import requests
from supabase import create_client
from datetime import datetime, timedelta, timezone

class handler(BaseHTTPRequestHandler):
    def do_POST(self):
        try:
            # 1. リクエスト
            content_len = int(self.headers.get('Content-Length'))
            data = json.loads(self.rfile.read(content_len))
            user_id = data.get('user_id')

            # 環境変数
            MERCHANT_KEY = os.environ.get('OXAPAY_MERCHANT_KEY')
            SUPABASE_URL = os.environ.get('SUPABASE_URL')
            SUPABASE_KEY = os.environ.get('SUPABASE_KEY')
            supabase = create_client(SUPABASE_URL, SUPABASE_KEY)

            # 2. ユーザーの全注文を取得 (新しい順)
            orders = supabase.table('orders').select('*').eq('user_id', user_id).order('created_at', desc=True).execute().data
            
            updated_orders = []

            for order in orders:
                # 3. Pending状態のものはOxapayに確認する
                if order['status'] == 'pending':
                    
                    # 作成日時チェック (1時間以上経過していたら強制期限切れにする)
                    # DBから取得した時刻文字列をパース
                    try:
                        created_at = datetime.fromisoformat(order['created_at'].replace('Z', '+00:00'))
                        is_old = datetime.now(timezone.utc) - created_at > timedelta(hours=1)
                    except:
                        is_old = False

                    if is_old:
                        # 期限切れ更新
                        supabase.table('orders').update({'status': 'expired'}).eq('id', order['id']).execute()
                        order['status'] = 'expired'
                    else:
                        # Oxapay APIで確認
                        res = requests.post("https://api.oxapay.com/merchants/inquiry", 
                                          json={"merchant": MERCHANT_KEY, "orderId": order['order_id']}).json()
                        
                        payment_status = res.get('status') # Paid, Expired, Waiting...

                        if res.get('result') == 100 and payment_status == 'Paid':
                            # --- 支払い完了処理 ---
                            
                            # 在庫からライセンスキーを引き当てる (DB関数呼び出し)
                            # claim_license_key は SQL Editor で定義済みとする
                            key_res = supabase.rpc('claim_license_key', {
                                'p_plan_type': order['plan_type'],
                                'p_buyer_id': user_id
                            }).execute()

                            license_key = key_res.data
                            if not license_key:
                                license_key = "在庫切れ (管理者に連絡してください)"

                            # DB更新
                            supabase.table('orders').update({
                                'status': 'paid',
                                'license_key': license_key
                            }).eq('id', order['id']).execute()

                            order['status'] = 'paid'
                            order['license_key'] = license_key
                        
                        elif payment_status == 'Expired':
                            # 期限切れ更新
                            supabase.table('orders').update({'status': 'expired'}).eq('id', order['id']).execute()
                            order['status'] = 'expired'

                updated_orders.append(order)

            # 4. フロントへ返す
            self.send_response(200)
            self.send_header('Content-type', 'application/json')
            self.end_headers()
            self.wfile.write(json.dumps(updated_orders).encode())

        except Exception as e:
            self.send_response(500)
            self.end_headers()
            self.wfile.write(json.dumps({"error": str(e)}).encode())
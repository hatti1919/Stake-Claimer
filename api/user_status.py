from http.server import BaseHTTPRequestHandler
import json
import os
import datetime
from supabase import create_client

class handler(BaseHTTPRequestHandler):
    def do_POST(self):
        try:
            content_len = int(self.headers.get('Content-Length'))
            data = json.loads(self.rfile.read(content_len))
            discord_id = str(data.get('discord_id'))
            
            SUPABASE_URL = os.environ.get('SUPABASE_URL')
            SUPABASE_KEY = os.environ.get('SUPABASE_SERVICE_ROLE_KEY')
            supabase = create_client(SUPABASE_URL, SUPABASE_KEY)

            user_res = supabase.table('users').select('*').eq('discord_id', discord_id).execute()
            
            info = {
                "active": False,
                "plan_name": None,
                "expires_at": None,
                "account_limit": 1,
                "linked_accounts": []
            }

            if user_res.data:
                user_data = user_res.data[0]
                expires_at_str = user_data['expires_at']
                
                expires_dt = datetime.datetime.fromisoformat(expires_at_str.replace('Z', '+00:00'))
                now_utc = datetime.datetime.now(datetime.timezone.utc)

                if expires_dt > now_utc:
                    info["active"] = True
                    info["plan_name"] = user_data.get('plan_name', 'License')
                    info["expires_at"] = expires_at_str
                
                info["account_limit"] = user_data.get('account_limit', 1)

                acc_res = supabase.table('stake_accounts').select('*').eq('discord_id', discord_id).order('created_at').execute()
                if acc_res.data:
                    info["linked_accounts"] = [
                        {"id": acc["id"], "username": acc["username"], "created_at": acc["created_at"]}
                        for acc in acc_res.data
                    ]

            self.send_response(200)
            self.send_header('Content-type', 'application/json')
            self.end_headers()
            self.wfile.write(json.dumps(info).encode())

        except Exception as e:
            self.send_response(500)
            self.end_headers()
            self.wfile.write(json.dumps({"error": str(e)}).encode())
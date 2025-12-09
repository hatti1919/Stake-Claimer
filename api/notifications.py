from http.server import BaseHTTPRequestHandler
import json
import os
from supabase import create_client

class handler(BaseHTTPRequestHandler):
    def do_POST(self):
        try:
            data = json.loads(self.rfile.read(int(self.headers.get('Content-Length'))))
            user_id = data.get('user_id')
            action = data.get('action') 
            
            SUPABASE_URL = os.environ.get('SUPABASE_URL')
            SUPABASE_KEY = os.environ.get('SUPABASE_SERVICE_ROLE_KEY')
            supabase = create_client(SUPABASE_URL, SUPABASE_KEY)

            if action == 'get':
                res = supabase.table('notifications').select('*').eq('user_id', user_id).order('created_at', desc=True).limit(20).execute()
                self.send_response(200)
                self.end_headers()
                self.wfile.write(json.dumps(res.data).encode())
            elif action == 'read':
                notif_id = data.get('id')
                supabase.table('notifications').update({'is_read': True}).eq('id', notif_id).eq('user_id', user_id).execute()
                self.send_response(200)
                self.end_headers()
                self.wfile.write(json.dumps({"success": True}).encode())
        except Exception as e:
            self.send_response(500)
            self.end_headers()
            self.wfile.write(json.dumps({"error": str(e)}).encode())
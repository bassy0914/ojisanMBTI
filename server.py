import http.server
import os

os.chdir(os.path.dirname(os.path.abspath(__file__)))

handler = http.server.SimpleHTTPRequestHandler
handler.extensions_map.update({'.js': 'application/javascript'})

server = http.server.HTTPServer(('', 8080), handler)
print("Serving on http://localhost:8080")
server.serve_forever()

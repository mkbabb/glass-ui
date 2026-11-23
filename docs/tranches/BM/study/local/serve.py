"""Serves www/ on 0.0.0.0: plain HTTP on 4415, and the same pages over TLS on 4416 with a self-signed certificate
(tls/, made by start.sh) so R6 can read merged finger positions. No caching, so a rebuild shows at once."""
import functools, http.server, os, ssl, threading

HERE = os.path.dirname(os.path.abspath(__file__))
ROOT = os.path.join(HERE, "www")


class Handler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header("Cache-Control", "no-store")
        super().end_headers()


handler = functools.partial(Handler, directory=ROOT)
plain = http.server.ThreadingHTTPServer(("0.0.0.0", 4415), handler)
secure = http.server.ThreadingHTTPServer(("0.0.0.0", 4416), handler)
ctx = ssl.SSLContext(ssl.PROTOCOL_TLS_SERVER)
ctx.load_cert_chain(os.path.join(HERE, "tls", "cert.pem"), os.path.join(HERE, "tls", "key.pem"))
secure.socket = ctx.wrap_socket(secure.socket, server_side=True)
threading.Thread(target=secure.serve_forever, daemon=True).start()
print("serving", ROOT, "on :4415 (http) and :4416 (https)", flush=True)
plain.serve_forever()

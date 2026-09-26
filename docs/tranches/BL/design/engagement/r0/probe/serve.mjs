// D5 r0 probe: a static server for a built probe app, and Playwright from glass-ui's own node_modules.
import http from "node:http"; import fs from "node:fs"; import path from "node:path";
const GLASS = process.env.GLASS_UI ?? "/Users/mkbabb/Programming/glass-ui";
export async function serve(dist) {
  const types = { ".js": "text/javascript", ".css": "text/css", ".html": "text/html", ".svg": "image/svg+xml", ".woff2": "font/woff2" };
  const srv = http.createServer((q, r) => { let p = path.join(dist, decodeURIComponent(q.url.split("?")[0])); if (p.endsWith("/")) p += "index.html"; if (!fs.existsSync(p)) { r.writeHead(404); return r.end(); } r.writeHead(200, { "content-type": types[path.extname(p)] ?? "application/octet-stream" }); fs.createReadStream(p).pipe(r); });
  await new Promise((ok) => srv.listen(0, ok)); return { url: `http://127.0.0.1:${srv.address().port}/`, close: () => srv.close() };
}
export const pw = (await import(`${GLASS}/node_modules/playwright/index.mjs`)).default;
export const PNGJS = `${GLASS}/node_modules/pngjs/lib/png.js`;

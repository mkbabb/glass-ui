import { readFileSync, statSync } from "node:fs"; import { join } from "node:path";
const d = process.argv[2]; const html = readFileSync(join(d, "index.html"), "utf8");
const pre = [...html.matchAll(/<link[^>]+rel="modulepreload"[^>]+href="([^"]+)"/g)].map((m) => m[1]);
const ent = [...html.matchAll(/<script[^>]+type="module"[^>]+src="([^"]+)"/g)].map((m) => m[1]);
const files = [...new Set([...pre, ...ent])]; const sz = (h) => statSync(join(d, h.replace(/^\//, ""))).size;
const dock = files.filter((f) => /dock|Dock/.test(f)).map((f) => `${f.replace(/-[\w-]{8}\.js$/, "")}:${sz(f)}`);
console.log(JSON.stringify({ preloads: pre.length, entries: ent.length, files: files.length, bytes: files.reduce((a, f) => a + sz(f), 0), dock }));

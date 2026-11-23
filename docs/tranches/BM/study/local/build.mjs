// The BM reading pages and the choice board as a local site in www/, for the owner's iPhone over the network.
// Each page is wrapped as the publisher wraps it (the wrap in check-all/page-check-all.mjs), and the board's artifact
// links point at the local copies. R6 alone gains a line linking its secure copy, shown only where Safari withholds
// merged finger positions from a plain link.
// Run: ~/.claude/guard/guarded --light -- node docs/tranches/BM/study/local/build.mjs   (then ./start.sh)
import { readFileSync, writeFileSync, mkdirSync, rmSync } from "node:fs";
import path from "node:path";

const HERE = path.dirname(new URL(import.meta.url).pathname);
const STUDY = path.resolve(HERE, "..");
const OUT = path.join(HERE, "www");
export const SECURE_PORT = 4416;

// Page file → its published artifact (study/READINGS.md).
const PAGES = {
  R1: "Eo3h83fZXynfDXNVqGXU5i", R2: "1TR7FSwN3VUaMAZQ4fonXk", R3: "KpFG8qLhsSpQnUHf1ekm8a", R3b: "SjJWLQHbJ56B7DEC1MZjzo",
  R5: "GBaSutb84j26cysowDCQ7R", R6: "9sGtAjQccg2KFZCZbn4Y1J", R7: "Hs9t552WkFNwkgU2nC8y4Z", "P2-scroll": "KkU8yz1FLHmtamSbdUTjqs",
  "P4-bud": "8RyqCYtFMhc8xFdJquLHC2", "P5-mark": "Sf5VYMX7HQeQ6k584cpZxk", "P6-hosts": "LbxfwsT94bouKtzq5VoXci",
  "P7-fuse": "RziFpt9Bj5RUTSVBtdAxTU", "P8-present": "5Jed1k3wBJvGY72BDUw6AD",
};

const wrap = (body) => `<!doctype html><html lang="en"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<link rel="icon" href="data:,">
<style>:root{color-scheme:light;padding-top:env(safe-area-inset-top,0px);padding-bottom:env(safe-area-inset-bottom,0px)}
body{margin:0;font:14px system-ui,sans-serif}img{max-width:100%}[hidden]{display:none!important}</style></head><body>${body}</body></html>`;

const R6_ENV = `<p class="env" id="env">Reading your Safari version…</p>`;
const R6_SECURE = `
  <p class="env" id="secure-note" hidden>On this link Safari keeps merged finger positions from the page, so the second number reads n/a. <a id="secure-link" href="#">Open the secure copy</a>: Safari warns once; tap Show Details, then visit this website.</p>
  <script>
  if (!window.isSecureContext && !("getCoalescedEvents" in PointerEvent.prototype)) {
    document.getElementById("secure-link").href = "https://" + location.hostname + ":${SECURE_PORT}" + location.pathname;
    document.getElementById("secure-note").hidden = false;
  }
  </script>`;

const slug = (t) => t.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
rmSync(OUT, { recursive: true, force: true });
mkdirSync(OUT, { recursive: true });

const links = {};
for (const [file, id] of Object.entries(PAGES)) {
  let html = readFileSync(path.join(STUDY, "pages", file + ".html"), "utf8");
  const title = (html.match(/<title>([^<]+)<\/title>/) || [])[1];
  if (!title) throw new Error(`${file}: no <title>`);
  if (file === "R6") {
    if (!html.includes(R6_ENV)) throw new Error("R6: the env line moved");
    html = html.replace(R6_ENV, R6_ENV + R6_SECURE);
  }
  const name = slug(title) + ".html";
  writeFileSync(path.join(OUT, name), wrap(html));
  links[`https://claude.ai/artifact/${id}`] = name;
  console.log(`${file.padEnd(10)} → ${name}`);
}

let board = readFileSync(path.join(STUDY, "choices", "glass-choices.html"), "utf8");
for (const [url, name] of Object.entries(links)) {
  if (!board.includes(url)) throw new Error(`the board does not link ${url}`);
  board = board.split(url).join(name);
}
if (/https:\/\/claude\.ai\//.test(board)) throw new Error("the board still links claude.ai");
writeFileSync(path.join(OUT, "index.html"), wrap(board));
console.log(`board      → index.html (${Object.keys(links).length} links pointed at the local copies)`);

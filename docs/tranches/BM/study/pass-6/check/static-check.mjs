// BM pass 6 (copied from pass 5; P5-mark rebuilt by the pass-5 fold, P6-hosts added): a static check of each reading page against the page contract, needing no browser.
// The browser check at 390 and 1440 px is page-check.mjs beside this file; it is owed while guarded refuses browser runs.
// Run: guarded --light -- node docs/tranches/BM/study/pass-6/check/static-check.mjs
import { readFileSync, writeFileSync, mkdtempSync, rmSync } from "node:fs";
import { execFileSync } from "node:child_process";
import path from "node:path";
import os from "node:os";

const HERE = path.dirname(new URL(import.meta.url).pathname);
const PAGES = path.resolve(HERE, "../../pages");
const files = ["R1", "R2", "R3", "R3b", "R4", "R5", "R6", "R7", "P2-scroll", "P4-bud", "P5-mark", "P6-hosts"];
const tmp = mkdtempSync(path.join(HERE, ".tmp-"));
const out = [];
try {
  for (const f of files) {
    const s = readFileSync(path.join(PAGES, f + ".html"), "utf8");
    const head = s.slice(0, 400);
    const title = (s.match(/^<title>([^<]+)<\/title>/) || [])[1] || "";
    const style = (s.match(/<style>([\s\S]*?)<\/style>/) || [])[1] || "";
    const tokenBlocks = style.match(/:root\s*\{[\s\S]*?\n\}/g)?.join("\n") || "";
    const darkBlock = /@media \(prefers-color-scheme: dark\)\s*\{\s*:root:not\(\[data-theme="light"\]\)\s*\{[\s\S]*?color-scheme: dark/.test(style);
    const darkAttr = /:root\[data-theme="dark"\]\s*\{[\s\S]*?color-scheme: dark/.test(style);
    // literal colours in rules other than the token blocks (masks' #000 are coverage, not paint, and are listed apart)
    const rules = style.replace(/:root[^{]*\{[^}]*\}/g, "").replace(/@media \(prefers-color-scheme: dark\)\s*\{[\s\S]*?\n\}\n/g, "");
    const literals = [...rules.matchAll(/(?<![\w-])(#[0-9a-fA-F]{3,8}\b|(?:hsl|rgb|oklch|oklab)a?\([^)]*\))/g)].map((m) => m[1]);
    const scripts = [...s.matchAll(/<script>([\s\S]*?)<\/script>/g)].map((m) => m[1]);
    let syntax = "ok";
    scripts.forEach((js, i) => {
      const p = path.join(tmp, `${f}-${i}.js`);
      writeFileSync(p, js);
      try { execFileSync(process.execPath, ["--check", p], { stdio: "pipe" }); } catch (e) { syntax = String(e.stderr || e.message).split("\n").slice(0, 3).join(" "); }
    });
    const row = {
      page: f,
      bytes: s.length,
      title,
      titleWords: title.trim().split(/\s+/).length,
      viewportMetaNearTop: head.includes('<meta name="claude:viewport-fit-sides" content="cover">'),
      noWrapperTags: !/<(!doctype|html|head|body)\b/i.test(s),
      noDialogs: !/\b(alert|confirm|prompt)\s*\(/.test(scripts.join("\n")),
      noExternal: !/(src|href)\s*=\s*["']https?:|url\(\s*["']?https?:|@import/.test(s),
      darkBlock, darkAttr,
      bodyBackgroundToken: /body\s*\{[^}]*background:\s*var\(--/.test(style),
      gutter: /padding-left:\s*max\(16px, env\(safe-area-inset-left, 0px\)\)/.test(style) && /padding-right:\s*max\(16px, env\(safe-area-inset-right, 0px\)\)/.test(style),
      firstIsAsk: /<main[^>]*>\s*<p class="ask">/.test(s),
      boldButtons: /button[^{]*\{[^}]*font:\s*(600|700)/.test(style),
      literalColoursOutsideTokens: literals.filter((c) => !/^#000$/.test(c)),
      scriptSyntax: syntax,
    };
    out.push(row);
  }
} finally {
  rmSync(tmp, { recursive: true, force: true });
}
writeFileSync(path.join(HERE, "static-check.json"), JSON.stringify({ at: new Date().toISOString(), rows: out }, null, 1));
for (const r of out) {
  const fails = Object.entries(r).filter(([k, v]) => (typeof v === "boolean" && (k === "boldButtons" ? v : !v)) || (k === "scriptSyntax" && v !== "ok") || (k === "titleWords" && (v < 2 || v > 4)));
  console.log(`${r.page.padEnd(10)} ${String(r.bytes).padStart(6)} B  "${r.title}"  ${fails.length ? "FAIL " + fails.map(([k, v]) => k + "=" + v).join(", ") : "ok"}${r.literalColoursOutsideTokens.length ? "  literals: " + r.literalColoursOutsideTokens.join(" ") : ""}`);
}

# W-C.4 · W-TOKEN-HYGIENE: every token is declared once, read somewhere, and read without a literal fallback · 11.0.0

| field | value |
|---|---|
| seat | band-C wave-spec seat, formation run `wf_68eb18d6-b21` |
| model | `claude-opus-5-5`, asserted from own system identity |
| HEAD | `26d193b7` in a scratch worktree, with `dist/` and `dist-demo/` built there |
| ships in | 11.0.0 |
| families | F-64 (`audit/REGISTRY.md:1374-1392`), plus the rows W-B.1 and W-B.12 fold here (the `.input-pill` recipe, `data-reparse-ok`, W-CONTROL-CHASSIS, the GU-1 shadow size ladder, the `--radius` ladder) |
| depends on | PLAN §5, the one record of edges |
| dependants | PLAN §5 (its inverse) |

## 1 · What it closes

| id | what |
|---|---|
| #20 (L01a-20), L05a-*, L05b-* token rows, L14-* | literal fallbacks on declared tokens (E-2's fallback half: a fallback that paints when the token is missing hides a dead token) |
| R3-02-16 | the demo reads `--ring` and `--surface-tint-*`, which nothing declares |
| L15a token rows, A2-KE-L1-28 | dead tokens and dead selectors (`.ios` among them) left from retired features |
| UIA-F-218 | `.popover-content`: a class the canon documents and no component emits |
| #47 residue | `--dock-vertical-*` phantoms and `--dock-morph-max-stretch` |
| W-B.1 folds | `.input-pill` (no emitter), `data-reparse-ok` (1 site, no reader), W-CONTROL-CHASSIS (three size authorities for one control height), the `--shadow-sm…2xl` size overrides (GU-1) |
| W-B.12 fold | the shadcn `--radius` ladder in `radius.css` `@theme static` |
| legacy ladders | `pageYOffset`, `@supports not (color: oklch(`, `-webkit-mask-composite`, all inside the declared targets |

## 2 · The defect at HEAD

Measured with the appendix-A detector (`node token-hygiene.mjs . --list`) over tracked `src` and `demo` `.css`, `.vue` and `.ts`. Names a dependency declares are excluded: Tailwind's `theme.css`, `--reka-*`, `--tw-*`.

```
token-hygiene: fallbacks 326 (masking 256, knob 70) · phantom 5 · dead 27 · duplicate 77 · dead selectors 49 · ladders 6
```

- **Literal fallbacks: 326.** 256 mask a declared token (the fallback paints only if the token is gone, so a deleted token paints a plausible value and no test sees it); 70 are knobs (the name is declared nowhere and the fallback is the value). Densest files: `src/styles/material.css` 27, `slider/styles.css` 27, dock `density.css` 27, `liquid-enter` 15, `animations` 14, `icon-button` 10, `reveal` 9. 30 are in `demo`; 21 are in `src` `.ts`/`.vue` strings.
- **Phantoms: 5, all demo.** `var(--ring)` at `demo/stories/.../surface.vue:241`, the `--surface-tint-*` reads. Each paints as the property's initial value.
- **Dead tokens: 27**, none on `.published-roster`: `--configurator-size`, `--deck-dock-clearance`, `--dock-morph-max-stretch`, `--dock-search-shrink-start`, `--dock-search-shrink-end`, `--easing-curve-accent`, `--glass-grain-engage-duration`, `--glass-key-lit-x`, `--glass-curvature-overlay`, `--glass-plate-chassis`, `--glass-plate-dialog`, `--route-route-spring`, six `--engage-*`, `--select-chevron-opacity`, `--spring-bloom-duration`, `--spring-bloom-exit-duration`, four `--search-*`, `--dock-coarse-scale`, `--dock-scroll-gutter`.
- **Duplicates at `:root`/`:host`/`@theme` in two or more files: 77.** 55 are light-dark twins (W-C.5's). 22 are plain duplicates: `--color-gold*`, `--color-silver*`, `--color-bronze*` (`bridges.css` and `scale-paper.css`), seven `--ease-*`, `--opacity-disabled`, `--opacity-icon-muted`, `--glass-grain-opacity`.
- **Dead class selectors: 49 distinct**, none on the published utility roster: `.input-pill`, `.ios`, `.glass-top-layer`, `.gold-shimmer`, `.hover-lift-*`, `.liquid-stage`, `.motion-calm`, `.preserve-3d`, among others. The detector reads `.shape-*` as dead because its emitters build the name in a way it does not parse; the wave adjudicates each of the 49 by hand before deleting (§3.5).
- **Engine ladders: 6**, each for a feature inside `vite.targets.ts`'s targets: `pageYOffset` at `scrollReader.ts:54` and `useScrollChrome.ts:236`; `@supports not (color: oklch(` at `overlay-plate.css:409` and `shadow.css:154`; `-webkit-mask-composite` at `focus-veil.css:113` and `metal.css:163`.
- **Raw utilities.** 20 single-class rules sit in `@layer` blocks under `src/styles/utilities`, next to 14 `@utility` declarations (Tailwind-first: a utility is an `@utility`).
- **The `--radius` ladder.** `radius.css`'s `@theme static` sets `--radius: 0.625rem` (shadcn's default) and derives `--radius-lg`, `--radius-media` and `--radius-button` from it. `--radius` and `--radius-lg` are on `.published-roster`. Readers of `var(--radius-lg)`: dock `run.css:479` (`--dock-cap-cut`), `base.css:203`, the demo's `surface.vue`. Overriding Tailwind's `--radius-lg` also changes every consumer's `rounded-lg`.
- **The shadow size ladder.** `shadow.css:22-26` overrides Tailwind's `--shadow-sm…2xl`. Readers in `src`: sm 16, md 12, lg 8, xl 4, 2xl 3. The same override changes every consumer's `shadow-*` utility.
- **`data-reparse-ok`:** one writer (`EasingPicker.vue:571`), no reader.

## 3 · The cure

1. **The detector is a test.** Appendix A becomes `tests/gates/token-hygiene.test.ts`, bound to G-13 LADDER-EMITTED in the roster with its bite patch. Every class must read 0. It is E-2's fallback enforcement: a token is read as `var(--x)`, and if `--x` can be missing the missing case is a defect, not a fallback.
2. **Fallbacks.** Every masking fallback is deleted (the token is declared; the fallback is dead code that would hide its deletion). Every knob becomes a declared token next to its component's other tokens, with the fallback's value, or, where the value is set nowhere but its one reader, is inlined. `var(--a, var(--b))` chains are kept only where both are declared tokens and the first is a documented consumer override; the test lists those names.
3. **Phantoms** are declared or their reads removed. The demo's `--ring` reads `--focus-ring-color` (the declared token); `--surface-tint-*` reads are removed with the story rows that used them.
4. **Dead tokens** (27) are deleted. **Duplicates** (22 plain) are declared once: the metal colour bridges live in `bridges.css` only; the seven `--ease-*` in the motion token file only; the three opacity/grain tokens in their token file only.
5. **Dead selectors.** Each of the 49 is checked against `src` and `demo` emitters, and, read-only, against the consumers W-L.6 censuses (`rg -n '\b<class>\b' ~/Programming/<consumer>/src`). A class no one emits is deleted. A class a consumer emits and the library documents is re-expressed as `@utility` (the consumer's use becomes the declared API). The per-class verdict is recorded in the wave record. `.glass-top-layer`'s verdict is passed to W-L.6.
6. **Ladders** are removed: `window.scrollY`; the `@supports not (color: oklch(` blocks; the prefixed mask-composite line.
7. **Raw utilities.** The 20 raw rules become `@utility` or are deleted when Tailwind already ships them (`.preserve-3d` is Tailwind's `transform-3d`).
8. **`--radius` goes.** `--radius` and the derived `--radius-lg` are removed from `@theme`; each role token (`--radius-media`, `--radius-button`, and the others `radius.css` derives) declares `0.625rem` directly. The three `--radius-lg` readers read the role token they mean (`--radius-button` for the dock cap cut, per W-E.8's role table). Tailwind's `rounded-lg` returns to 8 px in consumers.
9. **The shadow size overrides go.** `shadow.css:22-26` is deleted; the 43 `src` readers read the role shadows (`--shadow-plate`, `--shadow-raised` and the others `shadow.css` declares by role). Tailwind's `shadow-*` returns to its defaults in consumers.
10. **One control size authority (W-CONTROL-CHASSIS).** `--control-pill-h` (5 sites), `controlSizeClass` (6 sites) and `input-bar` (15 sites) resolve one height per size: `controlSizeClass` is deleted and its callers read the size tokens `--control-h-{sm,md,lg}`; `--control-pill-h` becomes `--control-h-md`. `.input-pill`, having no emitter, is deleted (§3.5).
11. **`data-reparse-ok`** is deleted.

## 4 · Files it touches

`src/styles/**/*.css` (material, animations, reveal, liquid-enter, radius, shadow, bridges, scale-paper, overlay-plate, focus-veil, metal, the utilities directory, the token files), the component `styles.css` files the fallback list names (slider, icon-button, dock `density.css` and `run.css`, disclosure and others), `src/**/*.ts|vue` with fallback strings (21) or `pageYOffset` (2) or `controlSizeClass` (6), `EasingPicker.vue`, `demo/**` (30 fallbacks, 5 phantoms), `.published-roster` (drops `--radius`, `--radius-lg`, the shadow size names). New: `tests/gates/token-hygiene.test.ts`, `scripts/computed-sweep.mjs` (appendix B).

## 5 · Acceptance gates

| id | gate | passes when | HEAD reading |
|---|---|---|---|
| C4-G1 · no literal fallbacks | `node <appendix A> .`, class F | 0 | **326** (256 masking, 70 knob) |
| C4-G2 · no phantoms | class P | 0 | **5** |
| C4-G3 · no dead tokens | class D | 0 | **27** |
| C4-G4 · one declaration site | class U, less the light-dark twins W-C.5 owns | 0 plain | **22** plain (77 total) |
| C4-G5 · no dead selectors | class S, with the adjudicated false positives listed in the test | 0 | **49** |
| C4-G6 · no engine ladders | class L | 0 | **6** |
| C4-G7 · utilities are `@utility` | `rg -c '^\s*\.[a-z][\w-]*\s*\{' src/styles/utilities` inside `@layer` | 0 | **20** |
| C4-G8 · no shadcn radius base, no shadow size overrides | `! rg -n -- '--radius\s*:\|--radius-lg\s*:\|--shadow-(sm\|md\|lg\|xl\|2xl)\s*:' src/styles` | exit 0 | **exit 1** (`radius.css`, `shadow.css:22-26`) |
| C4-G9 · one control size authority | `! rg -n 'controlSizeClass\|--control-pill-h\|data-reparse-ok\|input-pill' src` | exit 0 | **exit 1** (5 + 6 + 1 + the `.input-pill` rule) |
| C4-G10 · the hold line | appendix B, HEAD vs wave, all routes, light and dark: `--diff` prints only the cells in the wave's allowed-delta list | the list | at HEAD the tool is new; the HEAD-vs-HEAD run reads `0 changed values over 1268 elements` on 20 routes, and a planted `--radius-2xl` change reads `254 changed values` |

Can the detector fail and pass? Run on a clean fixture (one declared-and-read token, one emitted class) it exits 0; planting `var(--x, 4px)`, an undeclared read, an unread declaration and an unemitted class each adds one row to its class (run at this seat, `tests` fixtures in the scratch worktree).

## 6 · π and DELTA obligations

The wave claims no paint change except §3.8 and §3.9, and those only in consumers. Evidence:

- **Library hold line (C4-G10).** Appendix B over every `s("cat","id")` route in `demo/stories/manifest.ts`, light and dark, `[data-slot]` elements, 16 computed properties, `dist-demo` at `<C4-base>` against the wave. Allowed deltas: none in the library, since role tokens keep their values. Each masking-fallback removal is paint-neutral by construction (the token was declared); each knob promotion keeps the value. Any changed cell is a defect or is listed with its cause.
- **Consumer specimens.** A fresh Vite app that imports `@mkbabb/glass-ui/styles` and renders one `rounded-lg shadow-sm` div, captured at `<C4-base>` and at the wave: the paired screenshots show 10 px → 8 px radius and the shadow change. This is the DELTA the MIGRATION rows describe.
- Cells: Chromium measured; Playwright WebKit measured and labelled as the engine build; real Safari UNMEASURED (the safaridriver checkbox is the owner's).

## 7 · MIGRATION rows

| before | after | note |
|---|---|---|
| `--radius` custom property (0.625rem) | removed | read the role token you mean (`--radius-button`, `--radius-media`, …) |
| `--radius-lg` overridden to `var(--radius)` | Tailwind's `--radius-lg` (0.5rem) | consumer `rounded-lg` paints 8 px, not 10 px |
| `--shadow-sm`, `--shadow-md`, `--shadow-lg`, `--shadow-xl`, `--shadow-2xl` overridden by the library | Tailwind's defaults | consumer `shadow-*` utilities paint Tailwind's shadows; read `--shadow-plate`/`--shadow-raised` for the library's |
| `--control-pill-h` | `--control-h-md` | |
| `controlSizeClass()` | removed | set `size` on the control; the height comes from `--control-h-{sm,md,lg}` |
| deleted classes that the per-class verdict (§3.5) finds documented (e.g. `.popover-content`, `.ios`) | removed | one row per class, written from the wave record |

No aliases: the old names are not kept.

## 8 · Ledger rows

Closes #64's declaration column (`census-register-b.md:54`), E-2's fallback half, E-4 (legacy engine ladders), #47's dock phantom and stretch residue, #55's token residue, UIA-F-218, A2-KE-L1-28, R3-02-16, and the W-B.1 and W-B.12 folds named in §1.

## 9 · Gestalt passes (P-1)

Tranche fit (one detector for every token class, one sweep tool shared with W-C.5), wave (C4-G1..G10 green in one run), feature (the consumer specimen renders Tailwind's own `rounded-lg`, and a library card still paints its role radius, compared side by side in one capture).

## Appendix A · the token-hygiene detector (prototype run at this seat)

```js
// W-C.4 prototype: the token-hygiene detector (E-2's literal-fallback half, plus phantom, dead and
// duplicate tokens, dead class selectors and legacy engine ladders). Reads tracked src/ and demo/.
//   F fallback   `var(--x, <literal>)` anywhere (a literal is anything that is not itself a var());
//                sub-classed: masking (--x is declared) and knob (--x is declared nowhere).
//   P phantom    `var(--x)` with no fallback and no declaration anywhere (src, demo).
//   D dead       `--x:` declared in src with no read anywhere (src, demo): no var(--x), no
//                getPropertyValue("--x"), no "--x" string in TS/Vue.
//   U duplicate  `--x` declared at a :root/:host rule in two or more src files.
//   S selector   a class selector in src CSS that no .vue/.ts file in src or demo emits as a class token.
//   L ladder     `@supports not (color: oklch(`, `-webkit-mask-composite`, `pageYOffset`, `@supports not (` for
//                a feature inside the declared targets (vite.targets.ts).
// Usage: node token-hygiene.mjs [root] [--list]. Prints per-class counts; exit 1 if any class is non-empty.
import fs from "node:fs"; import path from "node:path"; import { execFileSync } from "node:child_process";
const root = path.resolve(process.argv[2] && !process.argv[2].startsWith("--") ? process.argv[2] : ".");
const list = process.argv.includes("--list");
const files = execFileSync("git", ["ls-files", "src", "demo"], { cwd: root, encoding: "utf8" }).split("\n").filter((f) => /\.(css|vue|ts)$/.test(f) && !/\.d\.ts$/.test(f));
const text = new Map(files.map((f) => [f, fs.readFileSync(path.join(root, f), "utf8")]));
const strip = (s, f) => (/\.css$/.test(f) ? s.replace(/\/\*[\s\S]*?\*\//g, (m) => m.replace(/[^\n]/g, " ")) : s.replace(/\/\*[\s\S]*?\*\//g, (m) => m.replace(/[^\n]/g, " ")).replace(/(^|[^:"'`])\/\/[^\n]*/gm, "$1").replace(/<!--[\s\S]*?-->/g, (m) => m.replace(/[^\n]/g, " ")));
const code = new Map([...text].map(([f, s]) => [f, strip(s, f)]));
const lineOf = (s, i) => s.slice(0, i).split("\n").length;
// Names a dependency declares or sets: Tailwind's theme (node_modules/tailwindcss/theme.css) and reka-ui's runtime vars.
const twTheme = new Set([...fs.readFileSync(path.join(root, "node_modules/tailwindcss/theme.css"), "utf8").matchAll(/(--[A-Za-z0-9_-]+)\s*:/g)].map((m) => m[1]));
const depDeclared = (t) => twTheme.has(t) || /^--reka-/.test(t) || /^--tw-/.test(t);
const themeDecl = new Set();
const decl = new Map(), rootDecl = new Map(), reads = new Set(), out = { F: [], Fm: 0, Fk: 0, P: [], D: [], U: [], S: [], L: [] };
for (const [f, s] of code) {
  for (const m of s.matchAll(/(?<![\w-])(--[A-Za-z0-9_-]+)\s*:/g)) { if (!decl.has(m[1])) decl.set(m[1], []); decl.get(m[1]).push(`${f}:${lineOf(s, m.index)}`); }
  for (const m of s.matchAll(/@property\s+(--[A-Za-z0-9_-]+)/g)) { if (!decl.has(m[1])) decl.set(m[1], []); decl.get(m[1]).push(`${f}:${lineOf(s, m.index)}`); }
  if (/\.(ts|vue)$/.test(f)) for (const m of s.matchAll(/["'`](--[A-Za-z0-9_-]+)["'`]/g)) { reads.add(m[1]); if (!decl.has(m[1])) decl.set(m[1], []); decl.get(m[1]).push(`${f}:${lineOf(s, m.index)} (string)`); }
  for (const m of s.matchAll(/var\(\s*(--[A-Za-z0-9_-]+)/g)) reads.add(m[1]);
  for (const blk of s.matchAll(/@theme[^{]*\{([^}]*)\}/g)) for (const m of blk[1].matchAll(/(--[A-Za-z0-9_-]+)\s*:/g)) themeDecl.add(m[1]);
  if (/\.(css|vue)$/.test(f)) for (const blk of s.matchAll(/(:root|:host|@theme)[^{]*\{([^}]*)\}/g)) for (const m of blk[2].matchAll(/(--[A-Za-z0-9_-]+)\s*:/g)) { if (!rootDecl.has(m[1])) rootDecl.set(m[1], new Set()); rootDecl.get(m[1]).add(f); }
}
for (const [f, s] of code) {
  for (const m of s.matchAll(/var\(\s*(--[A-Za-z0-9_-]+)\s*,\s*([^)]*)/g)) {
    const fb = m[2].trim(); if (/^var\(/.test(fb) || fb === "") continue;
    const known = decl.has(m[1]) || depDeclared(m[1]); out.F.push(`${f}:${lineOf(s, m.index)} var(${m[1]}, ${fb.slice(0, 30)}) ${known ? "masking" : "knob"}`); known ? out.Fm++ : out.Fk++;
  }
  for (const m of s.matchAll(/var\(\s*(--[A-Za-z0-9_-]+)\s*\)/g)) if (!decl.has(m[1]) && !depDeclared(m[1])) out.P.push(`${f}:${lineOf(s, m.index)} ${m[1]}`);
}
for (const [t, where] of decl) if (!reads.has(t) && !themeDecl.has(t) && where.some((w) => w.startsWith("src/") && !w.endsWith("(string)"))) out.D.push(`${where[0]} ${t}`);
for (const [t, fs_] of rootDecl) if ([...fs_].filter((f) => f.startsWith("src/")).length > 1) out.U.push(`${t} in ${[...fs_].join(", ")}`);
const emitted = new Set();
const prefixes = [];
for (const [f, s] of code) if (/\.(vue|ts)$/.test(f)) {
  for (const m of s.matchAll(/[A-Za-z0-9_-]+/g)) emitted.add(m[0]);
  for (const m of s.matchAll(/(?:<Transition(?:Group)?[^>]*\sname|name\s*:)\s*=?\s*["'`]([a-z0-9-]+)["'`]/gi)) for (const suf of ["enter-active", "leave-active", "enter-from", "leave-to", "enter-to", "leave-from", "move"]) emitted.add(`${m[1]}-${suf}`);
  for (const m of s.matchAll(/["'`\s]([a-z][a-z0-9_-]*-)\$\{/g)) prefixes.push(m[1]);
}
for (const [f, s] of code) if (/^src\/.*\.css$/.test(f)) {
  const sel = s.replace(/\{[^{}]*\}/g, "{}");
  for (const m of sel.matchAll(/\.([A-Za-z_][A-Za-z0-9_-]*)(?![^(]*\)\s*\{\}\s*$)/g)) { const c = m[1]; if (/^\d/.test(c) || emitted.has(c) || prefixes.some((p) => /[-_].*[-_]$/.test(p) && c.startsWith(p))) continue; out.S.push(`${f}:${lineOf(s, m.index)} .${c}`); }
}
for (const [f, s] of code) for (const re of [/@supports\s+not\s*\(\s*color:\s*oklch/g, /-webkit-mask-composite/g, /\bpageYOffset\b/g, /@supports\s+not\s*\(\s*color:\s*light-dark/g]) for (const m of s.matchAll(re)) out.L.push(`${f}:${lineOf(s, m.index)} ${m[0]}`);
const uniq = (a) => [...new Set(a)];
out.S = uniq(out.S);
console.log(`token-hygiene: fallbacks ${out.F.length} (masking ${out.Fm}, knob ${out.Fk}) · phantom ${out.P.length} · dead ${out.D.length} · duplicate ${out.U.length} · dead selectors ${uniq(out.S.map((x) => x.split(" ")[1])).length} · ladders ${out.L.length}`);
if (list) for (const k of ["F", "P", "D", "U", "S", "L"]) for (const x of out[k]) console.log(`${k} ${x}`);
process.exitCode = out.F.length + out.P.length + out.D.length + out.U.length + out.S.length + out.L.length ? 1 : 0;
```

## Appendix B · the computed-style sweep (shared with W-C.5)

```js
// Serves dist-demo/, visits every route the demo manifest names (the `s("cat","id")` rows), in light and in
// dark (html.dark), and records, for every element carrying data-slot, the computed values of PROPS.
// Writes <out>.json; with --diff <a.json> <b.json> prints every changed cell and exits 1 if any changed.
// Usage: node computed-sweep.mjs <root> <out.json> [--limit N]  |  node computed-sweep.mjs --diff a.json b.json
import fs from "node:fs"; import path from "node:path"; import http from "node:http"; import { createRequire } from "node:module";
const PROPS = ["color", "background-color", "background-image", "border-top-color", "border-radius", "box-shadow", "backdrop-filter", "filter", "opacity", "mix-blend-mode", "outline-color", "font-size", "padding-top", "padding-inline-start", "block-size", "inline-size"];
if (process.argv[2] === "--diff") {
  const [a, b] = [process.argv[3], process.argv[4]].map((f) => JSON.parse(fs.readFileSync(f, "utf8")));
  let n = 0; const cells = new Set();
  for (const k of Object.keys(a)) { if (!(k in b)) { console.log(`missing ${k}`); n++; continue; } for (const p of PROPS) if (a[k][p] !== b[k][p]) { n++; cells.add(k.split("|")[0] + "|" + p); if (n <= 40) console.log(`${k} ${p}: ${a[k][p]} -> ${b[k][p]}`); } }
  for (const k of Object.keys(b)) if (!(k in a)) { console.log(`added ${k}`); n++; }
  console.log(`computed-sweep diff: ${n} changed values over ${Object.keys(a).length} elements (${cells.size} route·property cells)`);
  process.exitCode = n ? 1 : 0;
} else {
  const root = path.resolve(process.argv[2]); const out = process.argv[3];
  const limit = process.argv.includes("--limit") ? +process.argv[process.argv.indexOf("--limit") + 1] : Infinity;
  const require = createRequire(path.join(root, "package.json")); const { chromium } = require("playwright");
  const src = fs.readFileSync(path.join(root, "demo/stories/manifest.ts"), "utf8");
  const routes = [...new Set([...src.matchAll(/\bs\(\s*"([a-z0-9-]+)"\s*,\s*"([a-z0-9-]+)"/g)].map((m) => `/${m[1]}/${m[2]}`))].slice(0, limit);
  const dist = path.join(root, "dist-demo");
  const types = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".woff2": "font/woff2", ".svg": "image/svg+xml", ".png": "image/png", ".jpg": "image/jpeg", ".wasm": "application/wasm" };
  const srv = http.createServer((req, res) => { const p = path.join(dist, decodeURIComponent(new URL(req.url, "http://x").pathname)); const f = fs.existsSync(p) && fs.statSync(p).isFile() ? p : path.join(dist, "index.html"); res.writeHead(200, { "content-type": types[path.extname(f)] ?? "application/octet-stream" }); fs.createReadStream(f).pipe(res); });
  await new Promise((r) => srv.listen(0, r)); const base = `http://127.0.0.1:${srv.address().port}`;
  const b = await chromium.launch({ args: ["--force-color-profile=srgb"] });
  const ctx = await b.newContext({ viewport: { width: 1280, height: 900 }, reducedMotion: "reduce", colorScheme: "light" });
  const page = await ctx.newPage(); const rec = {};
  for (const r of routes) for (const theme of ["light", "dark"]) {
    await page.goto(base + r, { waitUntil: "networkidle" }).catch(() => {});
    await page.evaluate((t) => document.documentElement.classList.toggle("dark", t === "dark"), theme); await page.waitForTimeout(120);
    const rows = await page.evaluate((PROPS) => [...document.querySelectorAll("[data-slot]")].slice(0, 400).map((e, i) => { const cs = getComputedStyle(e); const o = { key: `${e.getAttribute("data-slot")}#${i}` }; for (const p of PROPS) o[p] = cs.getPropertyValue(p); return o; }), PROPS);
    for (const row of rows) { const k = `${r}|${theme}|${row.key}`; delete row.key; rec[k] = row; }
  }
  await b.close(); srv.close(); fs.writeFileSync(out, JSON.stringify(rec));
  console.log(`computed-sweep: ${routes.length} routes × 2 themes · ${Object.keys(rec).length} elements → ${out}`);
}
```

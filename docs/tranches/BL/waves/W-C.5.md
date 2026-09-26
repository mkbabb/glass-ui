# W-C.5 · one source per quantity: one dark authority, one colour leaf, one randomness source, one table per constant · 11.0.0

| field | value |
|---|---|
| seat | band-C wave-spec seat, formation run `wf_68eb18d6-b21` |
| model | `claude-opus-5-5`, asserted from own system identity |
| HEAD | `26d193b7` in a scratch worktree, with `dist/` and `dist-demo/` built there |
| ships in | 11.0.0 |
| families | F-65 remainder (`audit/REGISTRY.md:1394-1412`) |
| depends on | PLAN §5, the one record of edges |
| dependants | PLAN §5 (its inverse) |

## 1 · What it closes

| id | what |
|---|---|
| L10-03, R2-08-12, R8-02-01 | the dark state has two authorities: `light-dark()` follows the used `color-scheme` (the OS under `:root{color-scheme: light dark}`), while 52 of the 53 light-dark tokens are re-declared under `.dark`, and 20 `.dark` rules hold 124 more declarations. OS-dark with no controller class mixes the two and fails contrast; a scoped `color-scheme: dark` does the same |
| R6-01-06 | a shadow-root mount under `html.dark` reads the light arm of every class-keyed value, since `.dark` does not cross the shadow boundary |
| R8-02-02 | UA forced dark on an explicit light pick darkens the page (decided in §3.3) |
| L10-04, R2-04-08 | 16 constants hand-mirrored between TS and CSS in 5 tables (seven pairs named in L10-04) |
| L10-05, #64 GAP-B2a | 24 `Math.random` code lines outside the library's PRNG; the typewriter, the constellation and the aurora are not reproducible |
| L15a-F8, L11-07, O-30 | four colour resolvers; `resolveTokenColor`'s docblock promises `rgb()` and it returns `oklch()`; two luminance thresholds |
| UIA-F-225 | the consumer's report of the dark/scheme split |
| #86 F-65 item | the one-source edict's remaining rows |
| D5 (found at this seat) | an open Collapsible does not rotate its icon; the rotate rule is keyed on the Accordion's class only |

Not here: R9-02-02 and R10-01-* (W-E.3), O-81 (5) (W-0.6).

## 2 · The defect at HEAD

Engine lane: appendix A (`node scheme-probe.mjs <wt>`), the built `dist/styles/index.css` in a blank page, Chromium (Playwright's bundled build, `--force-color-profile=srgb`). Output at `26d193b7`:

```
RED   D1 muted on card >= 4.5 (OS dark, no class)                       2.12
RED   D1 foreground on input well >= 4.5 (OS dark, no class)            1.06
RED   D2 shadow --control-bit-fill equals top level (dark)              oklch(0 0 0 / 0.14) vs color-mix(in oklab,hsl(30 14% 90%) 4%,transparent)
RED   D2 shadow .glass-deep backdrop at depth 0.35 equals top level     blur(17.75px) saturate(1.8) vs blur(17.75px) saturate(1.605)
RED   D3 forced dark keeps the light pick's ink contrast within 10 %    16.77 plain, 2.43 forced
RED   D4 resolveTokenColor returns rgb() for an oklch token             oklch(0.739 0.134 318.1)
RED   D5 an open Collapsible trigger rotates its icon as the Accordion  none vs 180deg
```

With `CONTROL=1` (the `.dark` class added, as the controller does), D1 reads 7.21 and 9.37: the defect is the missing class, not the palette.

- **Two dark authorities.** `scheme-motion.css:29` `:root{color-scheme: light dark}`; `theme/dark.css:7` `@variant dark (&:where(.dark, .dark *))`. 53 tokens use `light-dark()` (123 `light-dark(` in all); 52 of them are re-declared in `dark-arm.css` (102 declarations). `rg -c '\.dark(?![\w-])'` over `src/**/*.css` (PCRE): 20 rules in 15 files, holding 87 colour, 11 shadow and 26 non-colour declarations (blend modes, numbers, transforms, gradients). There is 1 `dark:` utility use in `src`.
- **The shadow mount (D2)** is the same split seen from a shadow root: the class-keyed arm never applies inside it, so the shadow tree paints the light number with the dark colour.
- **Forced dark (D3).** Measured two ways, each with 6 page stances (none; `<meta name="color-scheme" content="only light">`; `html{color-scheme: only light}`; `light dark`; `dark`; a dark page with `#111` background). CDP `Emulation.setAutoDarkModeOverride` (appendix A, D3) and the product flag (`--enable-features=WebContentsForceDark` under full-Chromium new-headless, `channel: "chromium"`, probe `forced-dark-probe4.mjs`) both give, for every stance, `light-dark(rgb(1,1,1), rgb(2,2,2))` → `rgb(2, 2, 2)` and a white `#fff` plate painted `[18,18,18]`. In the headless shell the flag has no effect. No page-side stance opts out in this Chromium.
- **The inline scheme mirror.** `useGlobalDark.ts:164-174` writes `document.documentElement.style.colorScheme` alongside the class. `webkit-flip-probe.mjs` (a class-only flip, no inline write) gives, in Chromium and in Playwright WebKit alike, plate `[253,245,236]` → `[53,42,34]` and `--control-bit-fill` → `oklch(0 0 0 / 0.14)`, equal to a fresh dark load. The mirror is not needed in either engine build. Real Safari is UNMEASURED.
- **Colour resolution, four implementations:** `src/composables/color/useResolveTokenColor.ts` (the docblock calls it the one leaf and promises `rgb()`), `glass/canvas2d/resolveCanvasColor.ts` (exported from the root barrel), a probe in `FourierField.vue:103-113`, and `backdropLuminanceSample.ts`. Luminance linearisation: `0.03928` at `backdropSampleMath.ts:10`, `0.04045` at `auroraFallbackGround.ts:219`.
- **Randomness.** `rg -n 'Math\.random' src --type ts --type vue` less comments: 24 code lines. Typewriter 20 (`keyboard` 10, `pausePatterns` 3, `timing` 3, `typoStateMachine` 3, `useTypewriter` 1); constellation 2 (`useConstellation.ts:113`, `constellationField.ts:127`, the default `rng` of the exported `stepField`); aurora 1 (`useCursorInteraction.ts:119`). The library's PRNG is `src/composables/glass/procedural/prng.ts` (`mulberry32`, `hashString`).
- **TS↔CSS twins**, each a number typed twice: `engageEnvelopes.ts` ↔ `motion-registers.css:180-187`; `dissolveGrammar` `VAPORIZE_CONSTANTS` ↔ `dissolve.css`; `routeGrammar` ↔ `motion-registers.css:117-119`; constellation `DEFAULT_WELL_CONFIG` ↔ `color-radius.css:293-297`; `useSelectionIndicator.ts:105` ↔ `scale-paper.css:47`; `worm.ts` ↔ `scheme-spring.css:150`; `tokens.ts:48-52` ↔ `scheme-motion.css:116`. R2-04-08 counts 16 pairs across these 5 tables. `scripts/regen-spring-tokens.mjs` already generates the spring tokens from `springPresets.ts`; the others are hand-kept.
- **D5.** The rotate rule is `.disclosure-group-trigger[data-state="open"] > .disclosure-icon` (`disclosure.css:86`). Collapsible's trigger carries `.disclosure-trigger` only.
- **Targets.** `vite.targets.ts`: chrome120, edge120, firefox114, safari16.4, ios16.4.

## 3 · The cure

1. **One dark authority: the `.dark` class.** `:root{color-scheme: light}`: one scheme until the controller runs (the pre-paint script in `darkModeSyncScript.ts` sets the class before first paint, so OS-dark users see dark without a flash). `.dark{color-scheme: dark; …}` is the only dark rule: one block that sets `color-scheme` and every non-colour dark value as a custom property (the 26 blend/number/transform/gradient values become tokens read where they apply). No `.dark` descendant selectors remain. Colours are expressed only through `light-dark()`, which follows the used scheme, so the 52 re-declarations in `dark-arm.css` and its `@supports` guard are deleted. A scoped `color-scheme: dark` (R2-08-12) then paints the dark colours, since `light-dark()` reads the scheme at each element.
2. **Engine floor.** `light-dark()` without a guard needs chrome123, edge123, firefox120, safari17.5, ios17.5; `vite.targets.ts` is raised to those (MIGRATION row). Shadows keep their geometry and take colour through a `light-dark()` colour token, never an inset fragment inside `light-dark()` (the G-15 LIGHTDARK-INSET trap: such a `box-shadow` computes to `none`).
3. **Forced dark (R8-02-02): decided, no page-side cure.** The engine applies forced dark regardless of the page's `color-scheme` or meta tag in every stance measured. The library does not ship a counter-measure (a filter inversion would be a masking fallback). The consumer docs (`docs/canon/theming.md`) state the limit: a user who enables the browser's forced-dark setting gets the browser's darkening, and a light pick does not override it. The gate asserts the statement exists and re-runs the probe so a Chromium change that honours the opt-out turns it RED and re-opens the row.
4. **The inline mirror goes.** `useGlobalDark` sets the class only; the `style.colorScheme` write at `:164-174` is deleted (MIGRATION row for consumers who read it). Playwright WebKit shows the flip without it; the real-Safari cell is carried to W-A.6.
5. **Shadow mounts.** With one class block that sets inherited custom properties and `color-scheme`, a shadow root under `html.dark` inherits every dark value (custom properties and `color-scheme` inherit through the shadow boundary). D2 checks it.
6. **One colour leaf.** `resolveTokenColor(value, el)` returns sRGB `rgb()`/`rgba()`: it reads the engine's computed serialization and converts it with value.js (a peer dependency, `^4.0.0`), so the docblock is true. `resolveCanvasColor` is deleted and removed from the root barrel (MIGRATION row); its callers, the FourierField probe and `backdropLuminanceSample` call the leaf. One `relativeLuminance` in `src/composables/color/`, at `0.04045`, replaces both copies.
7. **One randomness source.** Every `Math.random` goes through `mulberry32` from `prng.ts`. `prng.ts` gains `freshSeed()` (one `crypto.getRandomValues` read), used where a caller gives no seed. The typewriter gains a `seed` prop; `useConstellation` and the aurora cursor take a seed option. `stepField`'s `rng` parameter becomes required (MIGRATION row): an exported function with a hidden `Math.random` default is not reproducible.
8. **One table per constant.** `scripts/regen-tokens.mjs` extends `regen-spring-tokens.mjs`: each TS table (`engageEnvelopes`, `VAPORIZE_CONSTANTS`, `routeGrammar`, `DEFAULT_WELL_CONFIG`, the selection indicator, `worm`, `tokens.ts`) writes its CSS block between generated markers; `--check` exits 1 when a block differs. `regen-spring-tokens.mjs` folds into it. The TS table is the source; CSS never declares these by hand.
9. **D5.** The rotate rule becomes `.disclosure-trigger[data-state="open"] .disclosure-icon`, serving Collapsible and Accordion alike.

## 4 · Files it touches

`src/styles/theme/{dark,dark-arm}.css`, `scheme-motion.css`, the 15 files with `.dark` rules, `disclosure.css`, `vite.targets.ts`, `src/composables/dark/useGlobalDark.ts`, `src/composables/color/useResolveTokenColor.ts` and a new sibling `luminance.ts`, `glass/canvas2d/resolveCanvasColor.ts` (deleted), `src/index.ts`, `FourierField.vue`, `backdropLuminanceSample.ts`, `backdropSampleMath.ts`, `auroraFallbackGround.ts`, `prng.ts`, the typewriter module (5 files), `useConstellation.ts`, `constellationField.ts`, `useCursorInteraction.ts`, the 7 TS tables and their CSS blocks, `scripts/regen-tokens.mjs` (new; replaces `regen-spring-tokens.mjs`), `docs/canon/theming.md`. New tests: `tests/styles/dark-one-arm.test.ts`, `tests/styles/twin-data.test.ts`, `tests/gates/scheme.test.ts` (appendix A's cells in the Playwright suite).

## 5 · Acceptance gates

| id | gate | passes when | HEAD reading |
|---|---|---|---|
| C5-G1 · OS dark with no class paints one coherent scheme | appendix A D1 (muted on card, foreground on input well) | the pair renders in one scheme: both ≥ 4.5 | **RED** 2.12, 1.06 |
| C5-G1b · a scoped `color-scheme: dark` paints dark colours | D1b: a `<div style="color-scheme: dark">` in a light page; `var(--card)` inside equals the `.dark` value | equal | **RED**: `light-dark()` tokens flip, the 52 class-keyed re-declarations do not, so the pair mixes (R2-08-12) |
| C5-G2 · a shadow mount reads the dark values | D2 (fill and `.glass-deep` backdrop, shadow vs top level) | equal | **RED** (§2) |
| C5-G3 · forced dark is documented and still measured | `rg -q 'forced dark' docs/canon/theming.md` and appendix A D3 still shows the darkening | both true | **RED**: the doc statement is absent. (The contrast form of D3 is dropped: no page can pass it in Chromium) |
| C5-G4 · the colour leaf returns sRGB | D4 | `/^rgba?\(/` | **RED** `oklch(0.739 0.134 318.1)` |
| C5-G5 · an open Collapsible rotates its icon | D5 | equal and not `none` | **RED** `none` vs `180deg` |
| C5-G6 · one dark arm | `dark-one-arm.test.ts`: `.dark` appears in exactly one selector in `dist/styles/index.css`, which declares no colour; `rg -c 'light-dark\(' dark-arm.css` is 0 | pass | **fail**: 20 rules in 15 files; 52 re-declared tokens |
| C5-G7 · one randomness source | `! rg -n 'Math\.random' src` less comment lines | exit 0 | **exit 1**: 24 lines |
| C5-G8 · one table per constant | `node scripts/regen-tokens.mjs --check` and `twin-data.test.ts` (each of the 16 pairs read from the TS table equals the emitted CSS) | exit 0 | **exit 1**: the script does not exist; the 16 pairs are hand-kept |
| C5-G9 · one colour leaf, one luminance | `! rg -n 'resolveCanvasColor\|0\.03928' src` | exit 0 | **exit 1** |

Can each flip? D1, D2, D4 and D5 read GREEN on the controls measured here (`CONTROL=1` D1 7.21/9.37; D2's top-level values; D5's Accordion `180deg`), so the assertions can pass. G6 to G9 are counts with zero reachable.

## 6 · π and DELTA obligations

- **Hold line.** W-C.4's computed sweep (appendix B there), every manifest route, light and dark (`html.dark`), `<C5-base>` against the wave. Allowed deltas: none with the class present; the class path's values do not change. The diff is attached.
- **Paired captures** (`.cache/evidence/W-C.5/`): D1 (OS dark, no class) before and after, one card with muted text and one input; D2 (a shadow-mounted control beside a top-level one, dark); D5 (an open Collapsible). Each pair shows the change the gate states.
- **Forced dark:** the D3 pair is captured and labelled as the browser's behaviour, unchanged by this wave.
- Cells: Chromium measured; Playwright WebKit measured and labelled as the engine build (the class-only flip already verified there at HEAD); real Safari UNMEASURED, carried to W-A.6 for the flip without the inline mirror and for the raised floor.

## 7 · MIGRATION rows

| before | after | note |
|---|---|---|
| browser targets chrome120, edge120, firefox114, safari16.4, ios16.4 | chrome123, edge123, firefox120, safari17.5, ios17.5 | `light-dark()` without a guard |
| `:root{color-scheme: light dark}` (dark colours followed the OS before the controller ran) | `:root{color-scheme: light}`; dark is `.dark` | apply `.dark` (the provided pre-paint script does) to paint dark |
| `useGlobalDark` wrote `html.style.colorScheme` | class only | read `document.documentElement.classList.contains("dark")` |
| `resolveCanvasColor` from `@mkbabb/glass-ui` | removed | `resolveTokenColor` from `@mkbabb/glass-ui/color` |
| `resolveTokenColor` returned the engine serialization (`oklch(…)` for oklch tokens) | returns `rgb()`/`rgba()` | |
| `stepField(field, dt, rng?)` defaulted to `Math.random` | `rng` required | pass `mulberry32(seed)` |

## 8 · Ledger rows

Closes #86's F-65 item (`census-register-b.md:71`), #64's GAP-B2a randomness half (`census-register-b.md:54`), E-10's one-source row (`census-carries-recap.md:60`), L10-03, L10-04, L10-05, R2-04-08, R2-08-12, R6-01-06, R8-02-01, R8-02-02 (decided: engine limit, documented, probed), UIA-F-225, L15a-F8, L11-07, O-30.

## 9 · Gestalt passes (P-1)

Tranche fit (one generator for every TS↔CSS constant, one leaf, one PRNG; nothing parallel remains), wave (C5-G1..G9 green in one run), feature (a consumer page in OS dark before hydration, after the pre-paint script, and inside a shadow-mounted widget paints the same card in all three, captured side by side).

## Appendix A · the scheme probe (prototype run at this seat)

```js
// W-C.5 prototype engine lane: the built dist CSS loaded into a blank page (no demo), Chromium.
// Cells:
//   D1 OS dark, no controller class: --on-glass-muted over --card, --foreground over --input-on-glass (WCAG ratio).
//   D2 shadow mount under html.dark: --control-bit-fill and .glass-deep backdrop-filter, shadow vs top level.
//   D3 UA forced dark (CDP auto dark) on an explicit light pick (html style color-scheme: light, as useGlobalDark writes):
//      text core vs plate in paint, the default Badge pair (--primary-foreground on --primary), with and without the override.
//   D4 resolveTokenColor (the dist leaf) on an oklch token (--primary's dark arm, html.dark): the returned string's form.
//   D5 a .disclosure-icon inside an open plain .disclosure-trigger (the Collapsible's class): computed rotate.
// Usage: node scheme-probe.mjs <repo root with dist/>. Prints JSON per cell and a verdict line per gate; exit 1 if any gate is RED.
import fs from "node:fs"; import path from "node:path"; import http from "node:http"; import { createRequire } from "node:module";
const root = path.resolve(process.argv[2] ?? ".");
const require = createRequire(path.join(root, "package.json"));
const { chromium } = require("playwright");
const types = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css", ".woff2": "font/woff2" };
const leaf = fs.readdirSync(path.join(root, "dist")).find((f) => /^useResolveTokenColor-.*\.js$/.test(f));
const srv = http.createServer((req, res) => {
  const u = new URL(req.url, "http://x");
  if (u.pathname === "/") { res.writeHead(200, { "content-type": "text/html" }); res.end(`<!doctype html><html><head><link rel="stylesheet" href="/dist/styles/index.css"></head><body style="margin:0;background:var(--background)"></body></html>`); return; }
  const p = path.join(root, decodeURIComponent(u.pathname));
  if (!fs.existsSync(p)) { res.writeHead(404); res.end(); return; }
  res.writeHead(200, { "content-type": types[path.extname(p)] ?? "application/octet-stream" }); fs.createReadStream(p).pipe(res);
});
await new Promise((r) => srv.listen(0, r));
const base = `http://127.0.0.1:${srv.address().port}/`;
const b = await chromium.launch({ args: ["--force-color-profile=srgb"] });
const toRgb = `(css)=>{const c=document.createElement('canvas');c.width=c.height=1;const x=c.getContext('2d');x.fillStyle='#000';x.fillStyle=css;x.fillRect(0,0,1,1);const d=x.getImageData(0,0,1,1).data;return [d[0],d[1],d[2]];}`;
const ratio = `(a,b)=>{const L=([r,g,bb])=>{const f=v=>{v/=255;return v<=0.04045?v/12.92:((v+0.055)/1.055)**2.4};return 0.2126*f(r)+0.7152*f(g)+0.0722*f(bb)};const [h,l]=[L(a),L(b)].sort((p,q)=>q-p);return +((h+0.05)/(l+0.05)).toFixed(2);}`;
const out = {}; const verdict = [];

// D1
{ const ctx = await b.newContext({ colorScheme: "dark" }); const page = await ctx.newPage(); await page.goto(base);
  if (process.env.CONTROL) await page.evaluate(()=>document.documentElement.classList.add('dark'));
  out.D1 = await page.evaluate(`(()=>{const toRgb=${toRgb};const ratio=${ratio};const rd=(v)=>{const e=document.createElement('i');e.style.color=v;document.body.append(e);const s=getComputedStyle(e).color;e.remove();return s};
    const card=rd('var(--card)'),muted=rd('var(--on-glass-muted)'),fg=rd('var(--foreground)'),well=rd('var(--input-on-glass)');
    return {htmlClass:document.documentElement.className,scheme:getComputedStyle(document.documentElement).colorScheme,card,muted,fg,well,mutedOnCard:ratio(toRgb(muted),toRgb(card)),fgOnWell:ratio(toRgb(fg),toRgb(well))}})()`);
  verdict.push(["D1 muted on card >= 4.5 (OS dark, no class)", out.D1.mutedOnCard >= 4.5]);
  verdict.push(["D1 foreground on input well >= 4.5 (OS dark, no class)", out.D1.fgOnWell >= 4.5]);
  await ctx.close(); }

// D2
{ const ctx = await b.newContext({ colorScheme: "light" }); const page = await ctx.newPage(); await page.goto(base);
  out.D2 = await page.evaluate(`(async()=>{document.documentElement.classList.add('dark');
    const mk=(host)=>{const w=document.createElement('div');w.innerHTML='<span class="control-bit" id="cb"></span><div class="glass-deep" id="gd"></div>';host.append(w);return w;};
    const top=mk(document.body);const h=document.createElement('div');document.body.append(h);const sr=h.attachShadow({mode:'open'});
    const l=document.createElement('link');l.rel='stylesheet';l.href='/dist/styles/index.css';sr.append(l);await new Promise(r=>l.onload=r);const inner=mk(sr);
    const read=(w)=>{const cb=w.querySelector('#cb'),gd=w.querySelector('#gd');return {fill:getComputedStyle(cb).getPropertyValue('--control-bit-fill').trim(),deep:(()=>{gd.style.setProperty('--glass-depth','0.35');gd.style.backdropFilter='var(--glass-blur-deep)';return getComputedStyle(gd).backdropFilter})()}};
    return {top:read(top),shadow:read(inner)}})()`);
  verdict.push(["D2 shadow --control-bit-fill equals top level (dark)", out.D2.top.fill === out.D2.shadow.fill]);
  verdict.push(["D2 shadow .glass-deep backdrop at depth 0.35 equals top level (dark)", out.D2.top.deep === out.D2.shadow.deep]);
  await ctx.close(); }

// D3
for (const forced of [false, true]) {
  const ctx = await b.newContext({ colorScheme: "light", viewport: { width: 400, height: 200 }, deviceScaleFactor: 1 }); const page = await ctx.newPage();
  if (forced) { const cdp = await ctx.newCDPSession(page); await cdp.send("Emulation.setAutoDarkModeOverride", { enabled: true }); }
  await page.goto(base);
  await page.evaluate((cs) => { document.documentElement.style.colorScheme = cs; document.body.innerHTML = '<div id="p" style="position:absolute;inset:20px;background:var(--primary);color:var(--primary-foreground);font:700 64px/1 sans-serif;padding:20px">█████</div>'; }, process.env.PICK ?? "light");
  await page.waitForTimeout(100);
  const png = await page.screenshot();
  const { PNG } = require("pngjs"); const img = PNG.sync.read(png);
  const px = (x, y) => { const i = (img.width * y + x) << 2; return [img.data[i], img.data[i + 1], img.data[i + 2]]; };
  const plate = px(200, 170), ink = px(60, 60);
  const L = ([r, g, bb]) => { const f = (v) => { v /= 255; return v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4; }; return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(bb); };
  const [h, l] = [L(plate), L(ink)].sort((p, q) => q - p);
  out[forced ? "D3forced" : "D3plain"] = { plate, ink, ratio: +((h + 0.05) / (l + 0.05)).toFixed(2) };
  await ctx.close();
}
verdict.push(["D3 forced dark keeps the light pick's ink contrast within 10 %", out.D3forced.ratio >= 0.9 * out.D3plain.ratio]);

// D4
{ const ctx = await b.newContext({ colorScheme: "light" }); const page = await ctx.newPage(); await page.goto(base);
  out.D4 = await page.evaluate(`(async()=>{document.documentElement.classList.add('dark');const m=await import('/dist/${leaf}');const el=document.createElement('div');document.body.append(el);
    return {token:getComputedStyle(document.documentElement).getPropertyValue('--primary').trim(),resolved:m.n('var(--primary)',el)}})()`);
  verdict.push(["D4 resolveTokenColor returns rgb() for an oklch token (its docblock)", /^rgba?\(/.test(out.D4.resolved)]);
  await ctx.close(); }

// D5
{ const ctx = await b.newContext(); const page = await ctx.newPage(); await page.goto(base);
  out.D5 = await page.evaluate(`(()=>{document.body.innerHTML='<button class="disclosure-trigger" data-state="open"><span class="disclosure-icon">v</span></button><button class="disclosure-trigger disclosure-group-trigger" data-state="open"><span class="disclosure-icon">v</span></button>';
    const [a,g]=[...document.querySelectorAll('.disclosure-icon')].map(e=>getComputedStyle(e).rotate);return {collapsible:a,accordion:g}})()`);
  verdict.push(["D5 an open Collapsible trigger rotates its icon as the Accordion's does", out.D5.collapsible === out.D5.accordion && out.D5.collapsible !== "none"]);
  await ctx.close(); }

await b.close(); srv.close();
console.log(JSON.stringify(out, null, 1));
for (const [name, ok] of verdict) console.log(`${ok ? "GREEN" : "RED  "} ${name}`);
process.exitCode = verdict.every(([, ok]) => ok) ? 0 : 1;
```

The wave's test keeps D1, D2, D4 and D5 as written, adds D1b, and replaces D3's contrast verdict with C5-G3's form. D4 imports the leaf from its hashed dist chunk (`m.n` is the minified export name at this HEAD); the test imports it from `@mkbabb/glass-ui/color` instead.

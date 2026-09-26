# W-G.7 · W-PAYLOAD-SPLIT: a shader-free aurora derive subpath, and CSS that ships with its entry · 11.0.0

| field | value |
|---|---|
| seat | band-G wave-spec seat, formation (relaunch 2026-09-25) |
| model | `claude-opus-5-5`, asserted from own system identity |
| HEAD | `b37a37c3` (`src`, `package.json`, build config identical to `f3ad78d0`); scratch worktree built with `npm run build`; the band-G harness's one-Button page (W-G.6 appendix D) built against that `dist` |
| ships in | 11.0.0 |
| families | F-52, payload does not shake (`audit/REGISTRY.md:1237-1250`): L07-05, L07-06, R2-04-07, R2-07-06. Inbound: O-53 R-1 (value.js X-W6, `BK/coordination/valuejs-outbound-2026-09-23-xw6-aurora-derive-relay.md`; `INBOUND-MAP.md:530`) |
| depends on | PLAN §5, the one record of edges |
| dependants | PLAN §5 (its inverse) |

## 1 · What it closes

| id | defect |
|---|---|
| L07-05, R2-04-07, O-53 R-1 | a consumer that wants the aurora's palette maths (`deriveAurora`, `paletteToCssGradient`) imports `./aurora`, which carries both render backends, every shader and the runtime |
| L07-06, R2-07-06 | CSS does not shake: 0 of 63 JS entries import their CSS; `./styles` imports every component's stylesheet plus a `@source "../*.js"` scan of every compiled chunk; `./styles.css` is a second, partial CSS entry the canon offers as an alternative |

## 2 · The defect at HEAD

Appendix A (`node g7-payload.mjs <worktree>`) over the built `dist` and `package.json`:

| reading | HEAD |
|---|---|
| aurora subpaths in `exports` | `./aurora` only; no derive subpath |
| `dist/aurora.js` static closure | **14** files, **247,120 B** raw, **78,420 B** gzip (level 9); **2** `@fragment`, **3** `#version 300 es` |
| value.js's budget for the derive import (O-53) | 12,288 B gzip; value.js measured 50,989 B for its own shaken graph |
| JS entries that import a CSS file | **0 of 63** |
| `dist/styles/index.css` | one line of 37 `@import`s: every component stylesheet (music-staff, deck, carousel, sheet, dock, slider, metric, configurator …) and `@source "../*.js";` (`src/styles/index.css:283-313`, 30 lines of comment defending it as a backstop) |
| `exports["./styles.css"]` | `./dist/component-styles.css` (a second CSS entry) |

The one-Button consumer (harness `b` page: `@import "tailwindcss"; @import "tw-animate-css"; @import "@mkbabb/glass-ui/styles";` and one `Button`), built with Vite and Tailwind 4:

| reading | HEAD |
|---|---|
| CSS | **440,746 B** raw, **65,961 B** gzip (`gzip -9c b-*.css \| wc -c`) |
| `music-staff` occurrences in that CSS | **180** |
| `@font-face` rules | **5** |
| JS (`button-*.js`) | 193,484 B raw (not gated here; W-A.5 owns the JS budget) |

(L07-06 read 507 KB / 161 KB gzip for the same consumer at an earlier HEAD; R2-07 read 507,342 / 160,827.)

## 3 · The cure

1. **`./aurora-palette`**, a new subpath with a shader-free graph: `deriveAurora`, `paletteToCssGradient`, `auroraGround` (W-G.1's CSS ground) and their types (`AuroraPalette`, `DerivedAurora`, the palette-stop types). Its source modules import nothing from `composables/wgpu*`, `shaders/`, the runtime or any `.vue`. `./aurora` stops exporting them (`src/components/aurora/index.ts:78,81` lose `deriveAurora` and `paletteToCssGradient`): one door per binding (E-1), so there is one definition and no re-export. `resolveRenderMode` is not in it: W-G.1 deletes it (the engine is WebGPU or the CSS ground, decided by the adapter, with no tier resolver), and the reply to O-53 says so.
2. **CSS per entry.** The library build emits one stylesheet per JS entry (`dist/<entry>.css`, the entry's SFC styles, its colocated `styles.css`, and its compiled component utilities, in `@layer components` and `@layer utilities`), and the entry's JS imports it (`import "./<entry>.css"`). `package.json` `sideEffects` lists `**/*.css` so bundlers keep those imports. Component utilities are compiled at library build per entry (the `emitComponentUtilities` path, split by entry); the `@source "../*.js"` backstop and its comment are deleted.
3. **`./styles` is the foundation only**: tokens, theme, typography, glass, base, transitions, utilities, accessibility. It imports no component stylesheet. Fonts stay at `./styles/fonts` for W-E.11.
4. **One CSS entry.** `./styles.css` and `dist/component-styles.css` are removed; the canon's alternative-entry prose goes with them.

## 4 · Files it touches

`src/components/aurora/`: a new `palette/index.ts` (or the colocated equivalent under the colocation edict) holding the derive modules' public face; `index.ts` drops `deriveAurora` and `paletteToCssGradient` (`:78,81`) and does not re-export the subpath. `package.json` (`exports`: `./aurora-palette` added, `./styles.css` removed; `sideEffects`). The library Vite config and `vite.style-assets.ts` / `vite.style-fold.ts` (per-entry CSS emission and injected import; `component-styles.css` emission removed). `src/styles/index.css` (component imports and `@source` out). Each component's stylesheet that `index.css` imported moves under its entry's import graph (the colocated `styles.css` is imported by the component's `index.ts`). `README.md` and the canon's install section (one `@import "@mkbabb/glass-ui/styles"`). Tests: `tests/build/payload.test.ts` (appendix A's rows as assertions after `npm run build`), and the one-Button fixture moved into `tests-visual/fixtures/` with its budget row in W-A.5's invariant.

## 5 · Acceptance gates

All run after `npm run build`; appendix A for G7-G1 to G7-G7, appendix B for G7-G8.

| id | gate | passes when | HEAD reading |
|---|---|---|---|
| G7-G1 · the derive subpath exists | `exports` has `./aurora-palette` | present | **FAIL**: `./aurora` only |
| G7-G2 · the derive graph is shader-free | the `./aurora-palette` closure has 0 `@fragment`, 0 `@vertex`, 0 `@compute`, 0 `#version 300 es` | all 0 | **FAIL**: no subpath; `./aurora`'s closure carries 2 `@fragment`, 3 `#version 300 es` |
| G7-G3 · the derive budget | the closure's gzip ≤ 8,192 B (value.js's 12,288 B less the headroom W-A.5 ratchets) | ≤ 8,192 | **FAIL**: 78,420 B through `./aurora` |
| G7-G4 · one door (static) | `! grep -qwE 'deriveAurora\|paletteToCssGradient' src/components/aurora/index.ts` | exit 0 | **exit 1**: `index.ts:78`, `:81` |
| G7-G5 · CSS ships with its entry | every JS entry whose source graph has a stylesheet imports a `.css` file; `./button` at least | 63 of 63 applicable | **FAIL**: 0 of 63 |
| G7-G6 · no scan backstop | `dist/styles/index.css` has no `@source` | 0 | **FAIL**: `@source "../*.js";` |
| G7-G7 · one CSS entry | `exports` has no `./styles.css` | absent | **FAIL**: `./dist/component-styles.css` |
| G7-G8 · a one-Button consumer pays for a Button | appendix B: the built CSS ≤ 32,768 B gzip, 0 `music-staff`, 0 `.deck`/`carousel` selectors | all | **FAIL**: 65,961 B gzip, 180 `music-staff`, 109 deck and carousel selectors |

G7-G8's bound is set at half of HEAD; the post-landing reading is written into W-A.5's invariant as the exact figure with its ratchet, which is where the payload literal lives (W-A.5 deletes the equality ratchet literal and owns the number).

## 6 · π and DELTA obligations

- **Paint parity, per entry.** Every demo route before and after, light and dark, Chromium: a pixel-diff at the wired suite's tolerance. Moving a stylesheet from `./styles` into its entry must change no pixel on a page that imports the component; a route that paints differently names the rule that moved out of order (layer placement is the risk: every entry sheet declares `@layer components` / `@layer utilities` inside the consumer's `@layer theme, base, components, utilities` order).
- **The one-Button page**, before and after, both themes: the same Button, with the CSS byte figures beside the screenshots.
- **value.js's reading.** The derive import's gzip in value.js's own build is value.js's to take (read-only here); the reply letter (W-B.2) carries G7-G3's figure and asks value.js to re-measure.
- Engines: Chromium measured; Playwright WebKit and real Safari not measured (OW-3). CSS layering behaves the same in both engines by spec; the WebKit parity cell is owed at W-A.6.

## 7 · MIGRATION rows

| removed or changed | replacement |
|---|---|
| `import { deriveAurora, paletteToCssGradient } from "@mkbabb/glass-ui/aurora"` for palette maths | `from "@mkbabb/glass-ui/aurora-palette"` (`./aurora` no longer exports them; it carries the renderer only) |
| `resolveRenderMode` (O-53 asked for it on the derive subpath) | deleted by W-G.1; the engine is WebGPU or the CSS ground |
| `@import "@mkbabb/glass-ui/styles.css"` | `@import "@mkbabb/glass-ui/styles"` |
| `./styles` delivers every component's CSS | each component's CSS arrives with its JS import; a consumer that renders a component without importing its entry (not possible through the public API) gets no styles |
| the consumer's `@source` over glass-ui's `dist` | none needed; component utilities ship compiled in each entry's CSS |

Consumers: value.js adopts `./aurora-palette` (its X-W6); keyframes.js, slides and atlas drop any `styles.css` import and any `@source` line pointing into glass-ui's `dist`, each in its own tranche.

## 8 · Dependencies

PLAN §5, the one record of edges.

## 9 · Ledger rows it closes

F-52: L07-05, L07-06, R2-04-07, R2-07-06 (BUILD). O-53 R-1: BUILT (`./aurora-palette`; `resolveRenderMode` answered as deleted; a re-export from `./aurora` is DECLINED under E-1, and the reply letter says so).

## 10 · Gestalt passes (P-1)

- **Tranche fit:** an import costs what it uses, in JS and CSS.
- **Wave:** G7-G1 to G7-G8 green on one build.
- **Feature:** every demo route paints the same; the one-Button page's stylesheet holds a Button.

## Appendix A · `g7-payload.mjs`

```js
// The derive graph carries no shader and fits the budget; JS entries carry their CSS; one CSS entry.
// node g7-payload.mjs <worktree>   (after npm run build)
import fs from 'node:fs'; import path from 'node:path'; import { gzipSync } from 'node:zlib';
const WT = process.argv[2]; const D = path.join(WT, 'dist'); const pkg = JSON.parse(fs.readFileSync(path.join(WT, 'package.json'), 'utf8'));
const rows = []; const row = (id, pass, r) => { rows.push(pass); console.log(`${pass ? 'PASS' : 'FAIL'} ${id} ${JSON.stringify(r)}`); };
const closure = (entry) => { const seen = new Set(); const st = [path.resolve(entry)]; while (st.length) { const f = st.pop(); if (seen.has(f) || !fs.existsSync(f)) continue; seen.add(f); const s = fs.readFileSync(f, 'utf8'); for (const m of s.matchAll(/(?:^|[;\n}])\s*(?:import|export)\s*(?:[^'"]*?from\s*)?["'](\.[^"']+)["']/g)) st.push(path.resolve(path.dirname(f), m[1])); } return [...seen]; };
const measure = (files) => { const js = files.filter((f) => f.endsWith('.js')).map((f) => fs.readFileSync(f, 'utf8')).join('\n'); return { files: files.length, raw: js.length, gzip: gzipSync(js, { level: 9 }).length, fragment: (js.match(/@fragment/g) || []).length, glslVersion: (js.match(/#version 300 es/g) || []).length }; };
const exp = pkg.exports;
const deriveKey = Object.keys(exp).find((k) => /^\.\/aurora[/-](derive|palette)$/.test(k));
const deriveEntry = deriveKey ? path.join(WT, (exp[deriveKey].import || exp[deriveKey])) : path.join(D, 'aurora.js');
const dm = measure(closure(deriveEntry));
row('G7-G1 a shader-free aurora derive subpath exists in exports', !!deriveKey, { deriveKey: deriveKey || null, subpaths: Object.keys(exp).filter((k) => k.startsWith('./aurora')) });
row('G7-G2 the derive closure has 0 @fragment and 0 "#version 300 es"', dm.fragment === 0 && dm.glslVersion === 0, { entry: path.relative(WT, deriveEntry), ...dm });
row('G7-G3 the derive closure gzip <= 8192 B', dm.gzip <= 8192, { gzip: dm.gzip });
const am = measure(closure(path.join(D, 'aurora.js')));
row('G7-G4 ./aurora has no eager shader for an unarmed backend (0 "#version 300 es")', am.glslVersion === 0, am);
const entries = Object.entries(exp).filter(([k, v]) => typeof v === 'object' && v.import && v.import.endsWith('.js'));
const withCss = entries.filter(([k, v]) => /import\s*["'][^"']+\.css["']/.test(fs.readFileSync(path.join(WT, v.import), 'utf8')));
row('G7-G5 every component JS entry imports its own CSS (./button at least)', withCss.some(([k]) => k === './button'), { jsEntries: entries.length, entriesImportingCss: withCss.length });
const idx = fs.readFileSync(path.join(D, 'styles/index.css'), 'utf8');
row('G7-G6 no @source backstop in the styles entry', !/@source\b/.test(idx), { atSource: (idx.match(/@source[^;]*;/g) || []).slice(0, 2) });
row('G7-G7 one CSS entry: ./styles.css is not exported', !('./styles.css' in exp), { stylesCss: exp['./styles.css'] || null });
process.exitCode = rows.includes(false) ? 1 : 0;
```

HEAD output (re-run at the time of writing, identical to the first run):

```
FAIL G7-G1 … {"deriveKey":null,"subpaths":["./aurora"]}
FAIL G7-G2 … {"entry":"dist/aurora.js","files":14,"raw":247120,"gzip":78420,"fragment":2,"glslVersion":3}
FAIL G7-G3 … {"gzip":78420}
FAIL G7-G4 … {"files":14,"raw":247120,"gzip":78420,"fragment":2,"glslVersion":3}
FAIL G7-G5 … {"jsEntries":63,"entriesImportingCss":0}
FAIL G7-G6 … {"atSource":["@source \"../*.js\";"]}
FAIL G7-G7 … {"stylesCss":"./dist/component-styles.css"}
```

The script's row G7-G4 (no `#version 300 es` under `./aurora`) is the probe's form of W-G.1's G1-G11 and is kept there; this spec's G7-G4 is the static one-door check above, exit 1 at `183e021a` (fix-2).

## Appendix B · the one-Button consumer

The harness `b` page (W-G.6 appendix D): `src/b.css` is `@import "tailwindcss"; @import "tw-animate-css"; @import "@mkbabb/glass-ui/styles";`; `src/b.js` is `import "./b.css"; import { createApp, h } from "vue"; import { Button } from "@mkbabb/glass-ui/button"; createApp({ render: () => h(Button, null, () => "One") }).mount("#app");`. Built with `npx vite build --config vite.config.js` in the harness directory, then:

```sh
cd dist/assets; cat b-*.css $(grep -l '' button-*.css 2>/dev/null) > /tmp/b-all.css   # after the wave the Button's own sheet is a separate asset
wc -c < /tmp/b-all.css; gzip -9c /tmp/b-all.css | wc -c
grep -o 'music-staff' /tmp/b-all.css | wc -l; grep -oE '\.(deck|carousel)[-_a-z]*' /tmp/b-all.css | wc -l
```

HEAD output: `440746`, `65961`, `180` (music-staff), `109` (deck and carousel selectors), and 5 `@font-face` rules. Pass: gzip ≤ 32,768 and both counts 0.

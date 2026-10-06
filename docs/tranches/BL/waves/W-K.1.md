# W-K.1 · W-ROOT-RELATIVE: the host is read from the node's own root · 11.0.0

| field | value |
|---|---|
| seat | band-K wave-spec seat, formation |
| model | `claude-opus-5-5`, asserted from own system identity |
| HEAD | `9866d229` (the task named `f3ad78d0`; `git diff --stat f3ad78d0 HEAD -- src demo package.json` is empty, so `src` is the published 10.1.0). Probes ran in the scratch worktree `scratchpad/formation/band-K/wt` against the packed HEAD build (`npm pack` of that tree) installed in a consumer app, and against the built demo |
| ships in | 11.0.0 |
| families | F-81 (all four members) |
| depends on | PLAN §5, the one record of edges |
| dependants | PLAN §5 (its inverse) |
| harness | appendix B (shared by W-K.1 .. W-K.10): the fixture app, its two builds (reka 2.10.5, what a fresh consumer resolves, and reka 2.10.1, the library's lock), the demo preview, and `lib.mjs` |

## 1 · What it closes

| id | what |
|---|---|
| R6-01-02 (HIGH) | keystrokes typed into an open shadow root's `<input>` fire the app's registry shortcuts (`k` 3 times, Escape once) |
| R6-01-03 (MED) | the modal trap's Tab walk never reaches a web component's input placed after the Dialog footer |
| R6-01-04 (MED) | DataTable's focus-retention guard fails inside a shadow root; the nine `document.activeElement` reads |
| R6-01-05 (LOW) | with the stylesheet only in a shadow root, `--primary`, `--background` and `--space-body` compute to `""` |

## 2 · The defect at HEAD

The library asks the document where it is and what holds focus.

| site | HEAD |
|---|---|
| `src/composables/keyboard/useKeyboardShortcuts.ts:351,355` | the registry listens on `window`; a keystroke from inside a shadow root arrives retargeted to the host |
| `useKeyboardShortcuts.ts:176-183`, called at `:328` | `isEditableTarget(e.target)`: the host is not an `INPUT`, so the editable filter passes the key |
| nine reads in eight files | `document.activeElement` at `tabs/composables/useTabRovingFocus.ts:98`, `dialog/DialogContent.vue:137`, `pager-dots/PagerDots.vue:210,211`, `sheet/SheetContent.vue:259`, `expandable-container/ExpandableContainer.vue:211`, `dock/composables/useDockRun.ts:219`, `dock/DockCrossfade.vue:158`, `data-table/DataTable.vue:101`. `rg -c 'document\.activeElement' src` sums to 9; `rg -c 'composedPath\|getRootNode' src` is 0 |
| reka 2.10.1 `dist/FocusScope/utils.js:42` | the trap takes its Tab edges from `document.createTreeWalker(container, SHOW_ELEMENT)`, which does not descend shadow roots |
| `src/styles/**` | token blocks declare on `:root` (e.g. `paper.css:58`, `scroll-chrome.css:43`); `rg -c ':host' src/styles` is 0. Tailwind's own theme declares `:root, :host`, which is why `--radius` arrives in a shadow root and the glass tokens do not |

Measured with appendix A (`node k1.mjs`, both fixture builds and Playwright WebKit):

| gate | Chromium (reka 2.10.5 and 2.10.1, identical) | Playwright WebKit |
|---|---|---|
| K1-G1 shadow input keystrokes | FAIL: `k` 3, Escape 1 (typed `kkk`); the top-level glass Input control reads 0 and 0 | FAIL: 3 and 1 |
| K1-G2 trap reaches the shadow input | FAIL: never in 8 Tabs; trail `din, ok, BUTTON, din, ok, …` | FAIL: reached at press 2, then focus leaves the Dialog to `BODY` on the next Tab (2 leaks in 8) |
| K1-G3 DataTable retention, top level | PASS 4 of 4 (control) | PASS 4 of 4 |
| K1-G3 DataTable retention, shadow root | FAIL 2 of 4 (`a, null, null, d`) | FAIL 2 of 4 |
| K1-G4 shadow-only tokens | FAIL: `--primary ""`, `--background ""`, `--space-body ""`, `--radius .625rem`, Button background transparent | FAIL, same |
| K1-S static | exit 1: 9 reads, 0 `:host` | — |

## 3 · The cure

1. **One root module.** `src/composables/dom/root.ts` (published through the existing `./dom` subpath) exports `composedTarget(e)` (`e.composedPath()[0]`), `deepActiveElement(root = document)` (the root's `activeElement`, descending each open `shadowRoot.activeElement`) and `activeWithin(node)` (`node.getRootNode()` read the same way, true when the deep active element is `node` or inside it, crossing shadow boundaries through `getRootNode().host`).
2. **The registry's editable test reads the composed target.** `dispatchShortcut` calls `isEditableTarget(composedTarget(e))`. W-K.6 moves this read into the one keystroke predicate; this wave lands the read.
3. **The nine reads.** Each site reads `deepActiveElement()` or `activeWithin(el)`. DataTable's retention guard compares rows against `deepActiveElement(el.getRootNode())`.
4. **The trap's Tab edges are the layer's.** The modal layer (W-E.4's `_shared/overlay/layer.ts`) handles Tab in the capture phase on its content: it computes the first and last tabbable with a walker that descends open shadow roots and wraps at those edges. A Tab it handles does not propagate to reka's FocusScope handler, so exactly one handler acts on any Tab. The walker's shadow descent is reported upstream to reka as an issue; when a reka release descends shadow roots, the wave that bumps reka deletes the layer's Tab handler in the same change. That is a re-trigger for a deletion, not a second path.
5. **Tokens declare on `:root, :host`.** Every token block that declares on `:root` or `html` declares on `:root, :host`. Decided BUILD, not a documented limit: Tailwind's theme already follows this convention, the cost is a selector list, and the shadow-only mount then styles itself. The dark arm is W-C.5's inherited `color-scheme`, which crosses the shadow boundary; no `.dark` ancestor selector is written for the shadow case.

## 4 · Files it touches

`src/composables/dom/root.ts` (new) and `src/composables/dom/index.ts`; `src/composables/keyboard/useKeyboardShortcuts.ts`; the eight files in §2; `src/components/_shared/overlay/layer.ts` (the Tab edge leg); every `src/styles/**` file with a `:root` or `html` token block. New wired spec `tests-visual/wired/root-relative.spec.ts` (appendix A), and the band's fixture app `tests-visual/fixtures/band-k/` (appendix B's app and `lib.mjs`) that every band-K wired spec drives; `.github/workflows/visual.yml` gains the step that builds it against the packed library (W-A.3's workflow; W-D.2 keeps the step where it stands, W-D.2 §3 item 6). The band-K waves that drive it wait on this wave (PLAN §5 notes, fix-6, FE-01).

## 5 · Acceptance gates

| id | gate | passes when | HEAD reading |
|---|---|---|---|
| K1-G1 | appendix A G1, Chromium and Playwright WebKit | `k` 0 and Escape 0 from the shadow input | **FAIL** 3 and 1, both engines |
| K1-G2 | appendix A G2 | the shadow input is reached within 5 Tabs and no Tab leaves the Dialog | **FAIL**: Chromium never reaches it; WebKit reaches it and leaks to `BODY` twice |
| K1-G3 | appendix A G3, top level and shadow root | 4 of 4 in both mounts | top level PASS 4 of 4 (control); shadow **FAIL** 2 of 4 |
| K1-G4 | appendix A G4 | `--primary`, `--background`, `--space-body` non-empty inside a shadow-only mount | **FAIL** all three `""` |
| K1-S | `test "$(rg -c 'document\.activeElement' src \| awk -F: '{s+=$2} END {print s+0}')" = 0 && ! rg -q 'isEditableTarget\(e\.target\)' src && rg -q ':host' src/styles` | exit 0 | **exit 1** (9 reads; the `e.target` test at `:328`; 0 `:host`) |

Each browser gate has a passing control on the same page (the top-level Input in G1, the top-level mount in G3), so each can pass; each fails at HEAD on the shadow leg.

## 6 · π and DELTA obligations

One paint claim: the shadow-only mount renders a styled Button, Input and DataTable.
- **Surface:** `s.html?mode=shadow` and `s.html?mode=top` (control), 1024×768.
- **Themes:** light, and dark once W-C.5 lands (the `color-scheme` arm).
- **Engines:** Chromium and Playwright WebKit measured; real Safari UNMEASURED (OW-3).
- **Paired capture:** `page.screenshot` of the shadow host before and after the wave, with the paired reading of G4's computed tokens and the Button's `background-color` (HEAD: transparent). HEAD shot to be taken by the executing seat with `--shots` on `s.html?mode=shadow`; the G4 JSON (`cap/k1-chromium.json`) is the paired π reading at HEAD.

## 7 · MIGRATION rows

| before | after | note |
|---|---|---|
| tokens declared on `:root` / `html` only | declared on `:root, :host` | a consumer that adopts the stylesheet into a shadow root gets the tokens; a document-level stylesheet behaves as before |
| a key typed in a shadow root's field fires registry shortcuts | it is an editable keystroke and skips them | a consumer relying on the old leak (none known) registers with `allowInInput` |

No public API is removed. `root.ts`'s three helpers are new exports on `./dom`.

## 8 · Ledger rows

Closes F-81 (R6-01-02, -03, -04, -05). No BK register row or inbound row maps to F-81 (INBOUND-MAP has none). The reka report (trap walker shadow descent) is an outbound ask the LEDGER seat records with this wave as its owner.

## 9 · Gestalt passes (P-1)

- **Tranche fit:** one root module serves the registry (here), the keystroke predicate (W-K.6), the layer's trap (W-E.4, W-K.3) and every focus-containment read.
- **Wave:** K1-G1..G4 and K1-S green in one run, both engines.
- **Feature:** a web component beside a glass app, and glass mounted in a shadow root: typing in the component fires no app shortcut, the Dialog's Tab ring includes it, a reordered DataTable keeps focus, and the shadow-mounted page is styled. Recorded as one frame strip with the key log.

## Appendix A · `k1.mjs` (lands as `tests-visual/wired/root-relative.spec.ts`)

```js
// W-K.1 born-RED probe: the host is read root-relative (F-81). node k1.mjs [--eng webkit]
import { open, sleep, SAPP, runner, argEng } from './lib.mjs';
const eng = argEng(); const { row, safe, done } = runner('k1');
// G1 · a keystroke typed inside an open shadow root's <input> is an editable keystroke: app `k` and global Escape fire 0 and 0
await safe('K1-G1 shadow input keystrokes', async () => {
  const { browser, page } = await open({ eng, qs: 's=shadow' });
  await page.click('[data-probe=gi]'); await page.keyboard.type('kkk'); await page.keyboard.press('Escape'); await sleep(100);
  const ctl = await page.evaluate(() => ({ k: window.__k, esc: window.__esc }));
  await page.evaluate(() => { window.__k = 0; window.__esc = 0; document.querySelector('[data-probe=xf]').shadowRoot.querySelector('input').focus(); });
  await page.keyboard.type('kkk'); await page.keyboard.press('Escape'); await sleep(100);
  const st = await page.evaluate(() => ({ k: window.__k, esc: window.__esc, typed: document.querySelector('[data-probe=xf]').shadowRoot.querySelector('input').value }));
  row('K1-G1 shadow input: app k 0, Escape 0', st.k === 0 && st.esc === 0, { shadow: st, topLevelControl: ctl });
  await browser.close();
});
// G2 · the Dialog's Tab trail reaches a web component's input placed after the footer, within 5 presses, and never leaves
await safe('K1-G2 trap reaches shadow input', async () => {
  const { browser, page } = await open({ eng, qs: 's=trap&auto=dlg', settle: 700 });
  const trail = [];
  let reached = -1;
  for (let i = 0; i < 8; i++) { await page.keyboard.press('Tab'); await sleep(60); const a = await page.evaluate(() => { const a = document.activeElement; const sr = a?.shadowRoot?.activeElement; const inside = !!document.querySelector('[data-probe=dialog]')?.contains(a); return (a?.dataset?.probe || a?.tagName) + (sr ? '>' + (sr.dataset.probe || sr.tagName) : '') + (inside ? '' : '!out'); }); trail.push(a); if (a === 'xf>si' && reached < 0) reached = i + 1; }
  const leaks = trail.filter((x) => x.endsWith('!out')).length;
  row('K1-G2 trap Tab reaches shadow input ≤ 5 and never leaves the dialog', reached > 0 && reached <= 5 && leaks === 0, { reached, leaks, trail });
  await browser.close();
});
// G3 · DataTable keeps focus on the focused row across a reorder, 4 of 4 rows, at top level (control) and in a shadow root
for (const mode of ['top', 'shadow']) await safe(`K1-G3 datatable retention ${mode}`, async () => {
  const { browser, page } = await open({ eng, url: `${SAPP}?mode=${mode}`, waitReady: true });
  let kept = 0; const reads = [];
  for (const id of ['a', 'b', 'c', 'd']) {
    const r = await page.evaluate(async (id) => { const root = window.__rootNode(); const el = root.querySelector(`[data-row="${id}"]`); el.focus(); window.__reverse(); await new Promise((r) => setTimeout(r, 80)); const a = root.activeElement; return a?.dataset?.row || a?.tagName || null; }, id);
    reads.push(r); if (r === id) kept++;
  }
  row(`K1-G3 datatable reorder keeps focus (${mode})`, kept === 4, { kept, reads });
  await browser.close();
});
// G4 · stylesheet adopted only by the shadow root: tokens compute inside it
await safe('K1-G4 shadow-only tokens', async () => {
  const { browser, page } = await open({ eng, url: `${SAPP}?mode=shadow`, waitReady: true });
  const t = await page.evaluate(() => { const b = window.__root.querySelector('[data-probe=btn]'); const c = getComputedStyle(b); return { primary: c.getPropertyValue('--primary').trim(), background: c.getPropertyValue('--background').trim(), spaceBody: c.getPropertyValue('--space-body').trim(), radius: c.getPropertyValue('--radius').trim(), bg: c.backgroundColor }; });
  row('K1-G4 shadow-only --primary, --background, --space-body non-empty', !!(t.primary && t.background && t.spaceBody), t);
  await browser.close();
});
done(eng);
```

## Appendix B · the band-K harness (shared by W-K.1 .. W-K.10)

**Setup** (all inside one scratch worktree; nothing builds in the checkout):

```sh
git worktree add $WT HEAD
ln -s $REPO/node_modules $WT/node_modules; ln -s $REPO/tests-visual/node_modules $WT/tests-visual/node_modules
cd $WT && npx vite build && npm pack --ignore-scripts --pack-destination ..          # the HEAD library tarball
npx vite build --config demo/vite.demo-dist.config.ts                                # the demo → dist-demo/
npx vite preview --config demo/vite.demo-dist.config.ts --port 6271 --strictPort    # DEMO
# fixture app $WT/.kapp: node_modules = a consumer install (vue 3.5, reka-ui 2.10.5 as npm resolves ^2.9 today,
#   @tailwindcss/vite, tw-animate-css) with @mkbabb/glass-ui extracted from the tarball; vite build; preview on :6272
# fixture app $WT/.kapp1: the same, with reka-ui copied from the library's lock (2.10.1); preview on :6273 (KAPP_PORT=6273)
```

Probes run with `node kN.mjs [--eng webkit|firefox]`; `KAPP_PORT=6273` selects the reka 2.10.1 build. Each writes `cap/kN-<eng>[-r1].json` and exits 1 when any row fails. Playwright WebKit crashes on pages that mount GlassDock (the known crash recorded by band E), so WebKit cells use `nodock=1` in the fixture and record demo cells as crashes.

`lib.mjs`:

```js
// Band K probe library: the packed HEAD build in a consumer app on :6272, the built demo on :6271.
import { chromium, webkit, firefox } from '/Users/mkbabb/Programming/glass-ui/node_modules/playwright/index.mjs';
import os from 'node:os';
import fs from 'node:fs';
export const PORT = process.env.KAPP_PORT || '6272';
export const APP = `http://localhost:${PORT}/pages/k.html`;
export const SAPP = `http://localhost:${PORT}/pages/s.html`;
export const DEMO = 'http://localhost:6271';
const WAVE = process.env.WAVE; // the running wave's id: the one evidence root is .cache/evidence/<wave>/ (PLAN §1)
if (!/^W-[0-9A-L]\.[0-9]+$/.test(WAVE ?? '')) throw new Error('run as WAVE=<wave id> node <probe>');
export const CAP = `.cache/evidence/${WAVE}`;
fs.mkdirSync(CAP, { recursive: true });
export const load = () => os.loadavg().map((x) => x.toFixed(2)).join('/');
export const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
export const ENG = { chromium, webkit, firefox };
export const argEng = () => (process.argv.includes('--eng') ? process.argv[process.argv.indexOf('--eng') + 1] : 'chromium');
export const LIVE = new Set();
export async function open(o) {
  const eng = o.eng || 'chromium';
  const browser = await ENG[eng].launch(); LIVE.add(browser); browser.on('disconnected', () => LIVE.delete(browser));
  const ctx = await browser.newContext({ viewport: { width: o.w || 1024, height: o.h || 768 }, hasTouch: !!o.touch, deviceScaleFactor: o.dsf || 1, colorScheme: o.theme === 'dark' ? 'dark' : 'light', reducedMotion: o.reduce ? 'reduce' : 'no-preference', forcedColors: o.fc ? 'active' : 'none' });
  const page = await ctx.newPage();
  let cdp = null;
  if (eng === 'chromium') { cdp = await ctx.newCDPSession(page); if (o.media) await cdp.send('Emulation.setEmulatedMedia', { features: o.media }); }
  if (o.init) await page.addInitScript(o.init);
  const url = o.url || `${APP}?${o.qs || ''}${o.theme === 'dark' ? '&theme=dark' : ''}`;
  await page.goto(url, { waitUntil: o.url ? 'networkidle' : 'load' });
  if (!o.url || o.waitReady) await page.waitForFunction(() => window.__ready, null, { timeout: 15000 });
  await sleep(o.settle ?? 400);
  return { browser, ctx, page, cdp };
}
export const rectOf = (page, sel) => page.evaluate((s) => { const e = document.querySelector(s); if (!e) return null; const r = e.getBoundingClientRect(); return { l: +r.left.toFixed(1), t: +r.top.toFixed(1), r: +r.right.toFixed(1), b: +r.bottom.toFixed(1), w: +r.width.toFixed(1), h: +r.height.toFixed(1), x: r.left + r.width / 2, y: r.top + r.height / 2 }; }, sel);
export function runner(name) {
  const out = { name, load: load(), rows: [] };
  const row = (id, pass, reading) => { out.rows.push({ id, pass, reading }); console.log(`${pass ? 'PASS' : 'FAIL'} ${id} ${JSON.stringify(reading)}`); };
  const safe = async (label, fn, ms = 60000) => { let to; try { await Promise.race([fn(), new Promise((_, rej) => { to = setTimeout(() => rej(new Error(`timeout ${ms} ms (page hung or crashed)`)), ms); })]); } catch (e) { row(label, false, { error: String(e.message).split('\n')[0].slice(0, 200) }); for (const b of [...LIVE]) await b.close().catch(() => {}); } finally { clearTimeout(to); } };
  const done = (eng) => { out.load2 = load(); fs.writeFileSync(`${CAP}/${name}-${eng}${PORT === "6273" ? "-r1" : ""}.json`, JSON.stringify(out, null, 1)); const fails = out.rows.filter((r) => !r.pass).length; console.log(`${name} ${eng}${PORT === "6273" ? " reka-2.10.1" : " reka-2.10.5"}: ${out.rows.length} rows, ${fails} FAIL · load ${out.load} → ${out.load2}`); process.exitCode = fails ? 1 : 0; setTimeout(() => process.exit(process.exitCode), 200); };
  return { row, safe, done, out };
}
// changed pixels between two PNGs: { any: count over thr, c3: count whose new pixel is ≥ 3:1 against the old one }
export async function ringPx(page, a, b) {
  return page.evaluate(async ([a, b]) => {
    const ld = (s) => new Promise((r) => { const i = new Image(); i.onload = () => r(i); i.src = 'data:image/png;base64,' + s; });
    const [ia, ib] = await Promise.all([ld(a), ld(b)]);
    const c = document.createElement('canvas'); c.width = ia.width; c.height = ia.height; const x = c.getContext('2d');
    x.drawImage(ia, 0, 0); const da = x.getImageData(0, 0, c.width, c.height).data; x.clearRect(0, 0, c.width, c.height); x.drawImage(ib, 0, 0); const db = x.getImageData(0, 0, c.width, c.height).data;
    const lin = (v) => { v /= 255; return v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4; };
    const L = (d, i) => 0.2126 * lin(d[i]) + 0.7152 * lin(d[i + 1]) + 0.0722 * lin(d[i + 2]);
    let any = 0, c3 = 0; for (let i = 0; i < da.length; i += 4) { const dd = Math.abs(da[i] - db[i]) + Math.abs(da[i + 1] - db[i + 1]) + Math.abs(da[i + 2] - db[i + 2]); if (dd > 24) { any++; const l1 = L(da, i), l2 = L(db, i); if ((Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05) >= 3) c3++; } } return { any, c3 };
  }, [a.toString('base64'), b.toString('base64')]);
}
export const contrast = (c1, c2) => { const p = (s) => s.match(/[\d.]+/g).slice(0, 3).map(Number); const lin = (v) => { v /= 255; return v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4; }; const L = (s) => { const [r, g, b] = p(s); return 0.2126 * lin(r) + 0.7152 * lin(g) + 0.0722 * lin(b); }; const a = L(c1), b = L(c2); return +(((Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05)).toFixed(2)); };
```

Fixture `vite.config.js` (inputs `pages/k.html`, `pages/s.html`, `pages/o.html`; `@vitejs/plugin-vue`, `@tailwindcss/vite`), `src/app.css` and `src/shadow.css` (identical):

```css
@import "tailwindcss";
@import "tw-animate-css";
@import "@mkbabb/glass-ui/styles";
@source "../node_modules/@mkbabb/glass-ui/dist";
@source "./";
@variant dark (&:where(.dark, .dark *));
```

`src/k.js` (mounts `K.vue`; defines the `x-field` web component with an open shadow root holding one `<input data-probe="si">`):

```js
import "./app.css";
import { createApp } from "vue";
import K from "./K.vue";
const q = new URLSearchParams(location.search);
if (q.get("theme") === "dark") document.documentElement.classList.add("dark");
window.__warns = [];
customElements.define("x-field", class extends HTMLElement { constructor() { super(); const r = this.attachShadow({ mode: "open" }); r.innerHTML = '<input data-probe="si" aria-label="shadow field" style="border:1px solid #888;padding:4px">'; } });
const app = createApp(K);
app.config.errorHandler = (e) => window.__warns.push("ERR " + String(e).slice(0, 300));
app.config.warnHandler = (m) => window.__warns.push("WARN " + String(m).slice(0, 200));
app.mount("#app");
```

`src/s.js` (the shadow mounts; `?mode=shadow` puts the stylesheet only inside the shadow root, `?mode=top` is the control):

```js
import css from "./shadow.css?inline";
import { createApp, h, ref } from "vue";
import { Button } from "@mkbabb/glass-ui/button";
import { DataTable } from "@mkbabb/glass-ui/data-table";
const q = new URLSearchParams(location.search);
const mode = q.get("mode") || "shadow";
let mountEl;
if (mode === "top") { const st = document.createElement("style"); st.textContent = css; document.head.appendChild(st); mountEl = document.getElementById("app"); }
else { const host = document.getElementById("app"); host.setAttribute("data-probe", "host"); const root = host.attachShadow({ mode: "open" }); const st = document.createElement("style"); st.textContent = css; root.appendChild(st); mountEl = document.createElement("div"); root.appendChild(mountEl); window.__root = root; }
window.__rootNode = () => (mode === "top" ? document : window.__root);
const rows = ref([{ _id: "a", n: "Alpha" }, { _id: "b", n: "Bravo" }, { _id: "c", n: "Charlie" }, { _id: "d", n: "Delta" }]);
window.__reverse = () => { rows.value = [...rows.value].reverse(); };
createApp({ setup: () => () => h("div", { style: "padding:16px" }, [
  h(Button, { "data-probe": "btn" }, () => "Primary"),
  h(DataTable, { columns: [{ key: "n", label: "Name" }], rows: rows.value, ariaLabel: "t", getRowAttrs: (row) => ({ tabindex: 0, "data-row": row._id }) }),
]) }).mount(mountEl);
window.__ready = true;
```

`pages/o.html` is a plain page (`<p>other page</p>`) used as a navigation target.

`src/K.vue` (one scene per `?s=`; `auto=` opens named overlays after mount; hooks are `data-probe` attributes and `window.__*`):

```vue
<script setup>
import { ref, onMounted, nextTick } from "vue";
import { Button } from "@mkbabb/glass-ui/button";
import { Input } from "@mkbabb/glass-ui/input";
import { Textarea } from "@mkbabb/glass-ui/textarea";
import { Label } from "@mkbabb/glass-ui/label";
import { Checkbox } from "@mkbabb/glass-ui/checkbox";
import { Switch } from "@mkbabb/glass-ui/switch";
import { RadioGroup, RadioGroupItem } from "@mkbabb/glass-ui/radio-group";
import { Slider } from "@mkbabb/glass-ui/slider";
import { NumberField, NumberFieldInput } from "@mkbabb/glass-ui/number-field";
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription, DialogFooter, DialogHeader } from "@mkbabb/glass-ui/dialog";
import { Popover, PopoverTrigger, PopoverContent } from "@mkbabb/glass-ui/popover";
import { SheetContent } from "@mkbabb/glass-ui/sheet";
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } from "@mkbabb/glass-ui/menu";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@mkbabb/glass-ui/select";
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from "@mkbabb/glass-ui/tooltip";
import { Command, CommandDialog, CommandInput, CommandList, CommandItem, CommandEmpty } from "@mkbabb/glass-ui/command";
import { ExpandableContainer } from "@mkbabb/glass-ui/expandable-container";
import { Collapsible, CollapsibleTrigger, CollapsibleContent } from "@mkbabb/glass-ui/collapsible";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@mkbabb/glass-ui";
import { Carousel, CarouselContent, CarouselItem } from "@mkbabb/glass-ui/carousel";
import { ConfiguratorLayer } from "@mkbabb/glass-ui/configurator";
import { SegmentedTabs } from "@mkbabb/glass-ui/tabs";
import { PagerDots } from "@mkbabb/glass-ui/pager-dots";
import { Card } from "@mkbabb/glass-ui/card";
import { TypewriterText } from "@mkbabb/glass-ui/typewriter";
import { SortableList, SortableItem, SortableHandle } from "@mkbabb/glass-ui/sortable-list";
import { ToggleGroup, ToggleGroupItem } from "@mkbabb/glass-ui/toggle-group";
import { registerShortcut, formatComboParts } from "@mkbabb/glass-ui/keyboard";
import { routeTransition } from "@mkbabb/glass-ui/motion-core";
import { Chip } from "@mkbabb/glass-ui/chip";
import { GlassDock, DockControl } from "@mkbabb/glass-ui/dock";

const q = new URLSearchParams(location.search);
const s = q.get("s") || "none";
window.__k = 0; window.__esc = 0; window.__picked = null; window.__closes = 0; window.__submits = [];
window.__formatComboParts = formatComboParts; window.__routeTransition = routeTransition;
const nodock = q.get('nodock') === '1';
if (s === "shadow" || s === "ime") { registerShortcut("k", () => { window.__k++; }, { label: "app k" }); registerShortcut("Escape", () => { window.__esc++; }, { label: "app escape" }); }

const dlg = ref(false); const cmdOpen = ref(false); const menu = ref(false); const pop = ref(false); const ec = ref(false); const sel = ref(false);
const refs = { dlg, cmdOpen, menu, pop, ec, sel };
window.__set = (k, v = true) => { refs[k].value = v; };
window.__state = () => ({ dlg: dlg.value, cmdOpen: cmdOpen.value, menu: menu.value, pop: pop.value, ec: ec.value, sel: sel.value, picked: window.__picked, closes: window.__closes, acc: acc.value, cfg: cfg.value, car: car.value, tab: tab.value });
function onCmdOpen(v) { cmdOpen.value = v; if (v === false) window.__closes++; }
function mpick(i) { window.__picked = i; }
function hpick() { window.__picked = (window.__picked || 0) + 1; }
function onPick(v) { window.__picked = v; }
const fruits = ["apple", "banana", "plum", "cherry"];
const f = { fruit: ref("apple"), agree: ref(false), on: ref(false), plan: ref("solo"), vol: ref([40]), qty: ref(3), name: ref(""), note: ref("") };
window.__model = () => ({ fruit: f.fruit.value, agree: f.agree.value, on: f.on.value, plan: f.plan.value, vol: f.vol.value?.[0], qty: f.qty.value, name: f.name.value, note: f.note.value });
window.__formData = () => Object.fromEntries(new FormData(document.querySelector("[data-probe=form]")).entries());
function onSubmit(e) { e.preventDefault(); window.__submits.push(window.__formData()); }
const fsDisabled = q.get("fs") === "1";
const acc = ref(q.get("acc") || "a"); const cfg = ref(false); const car = ref(0); const coll = ref(false);
const tab = ref("a"); const tabOpts = ref([{ label: "Overview", value: "a" }, { label: "Members", value: "b" }, { label: "Audit", value: "c" }]);
window.__relabel = () => { tabOpts.value = [{ label: "Übersicht der Mitglieder und Rollen", value: "a" }, ...tabOpts.value.slice(1)]; };
const tgv = ref("a");
const listOpts = Array.from({ length: 12 }, (_, i) => ({ id: "r" + i, label: "Result " + (i + 1) }));
const activeOpt = ref("r0");
const tasks = ref([{ id: "t1", label: "Write the brief" }, { id: "t2", label: "Review the gates" }, { id: "t3", label: "Ship the minor" }]);
const count0 = Number(q.get("count") ?? 0);
onMounted(async () => {
  await nextTick();
  for (const k of (q.get("auto") || "").split(",").filter(Boolean)) refs[k].value = true;
  await nextTick();
  window.__ready = true;
});
</script>

<template>
  <main style="min-height:100dvh;padding:16px;background:#f4f1ec" :data-scene="s">
    <!-- W-K.1 · F-81 -->
    <section v-if="s === 'shadow'" style="display:flex;gap:12px;align-items:center">
      <Input data-probe="gi" aria-label="glass field" />
      <x-field data-probe="xf"></x-field>
    </section>
    <section v-if="s === 'trap'">
      <Dialog v-model:open="dlg">
        <DialogContent data-probe="dialog">
          <DialogHeader><DialogTitle>Trap</DialogTitle><DialogDescription>Tab walk</DialogDescription></DialogHeader>
          <Input data-probe="din" aria-label="inside" />
          <DialogFooter><Button data-probe="ok">OK</Button></DialogFooter>
          <x-field data-probe="xf"></x-field>
        </DialogContent>
      </Dialog>
    </section>
    <!-- W-K.2 · F-37 -->
    <section v-if="s === 'cmd'">
      <Button data-probe="before">Before</Button>
      <Button data-probe="opencmd" @click="cmdOpen = true">Open palette</Button>
      <CommandDialog :open="cmdOpen" @update:open="onCmdOpen" @update:model-value="onPick">
        <CommandInput placeholder="Search" />
        <CommandList data-probe="cl">
          <CommandItem v-for="x in fruits" :key="x" :value="x" :data-probe="'ci-' + x">{{ x }}</CommandItem>
        </CommandList>
      </CommandDialog>
    </section>
    <section v-if="s === 'inline'" style="display:flex;flex-direction:column;gap:12px;max-width:420px">
      <Button data-probe="outside">Outside button</Button>
      <Command class="glass-floating" data-probe="cmd">
        <CommandInput placeholder="Filter" data-probe="cin" />
        <CommandList data-probe="cl"><CommandItem v-for="x in fruits" :key="x" :value="x">{{ x }}</CommandItem></CommandList>
      </Command>
      <a href="#x" data-probe="link">A link</a>
    </section>
    <section v-if="s === 'cmdindlg'">
      <Dialog v-model:open="dlg">
        <DialogContent data-probe="dialog">
          <DialogHeader><DialogTitle>Pick</DialogTitle><DialogDescription>An inline command in a dialog</DialogDescription></DialogHeader>
          <Command data-probe="cmd">
            <CommandInput placeholder="Filter" data-probe="cin" />
            <CommandList><CommandItem v-for="x in fruits" :key="x" :value="x">{{ x }}</CommandItem></CommandList>
          </Command>
        </DialogContent>
      </Dialog>
    </section>
    <!-- W-K.3 · F-38 -->
    <section v-if="s === 'dlgfocus'">
      <Dialog v-model:open="dlg">
        <DialogTrigger as-child><Button data-probe="trig">Open dialog</Button></DialogTrigger>
        <DialogContent data-probe="dialog">
          <DialogHeader><DialogTitle>Focus</DialogTitle><DialogDescription>Lifecycle</DialogDescription></DialogHeader>
          <Input data-probe="din" aria-label="inside" />
        </DialogContent>
      </Dialog>
      <Button data-probe="after">After</Button>
    </section>
    <section v-if="s === 'sheetfocus'">
      <Dialog v-model:open="dlg">
        <DialogTrigger as-child><Button data-probe="trig">Open sheet</Button></DialogTrigger>
        <SheetContent :side="q.get('side') || 'right'" data-probe="sheet"><DialogTitle>Sheet</DialogTitle><DialogDescription>side</DialogDescription><Input data-probe="sin" aria-label="in sheet" /></SheetContent>
      </Dialog>
      <Button data-probe="after">After</Button>
    </section>
    <section v-if="s === 'popfocus'">
      <Popover v-model:open="pop"><PopoverTrigger as-child><Button data-probe="trig">Popover</Button></PopoverTrigger><PopoverContent data-probe="popc"><Input data-probe="pin" aria-label="in popover" /></PopoverContent></Popover>
    </section>
    <section v-if="s === 'ctldlg'">
      <Button data-probe="trig" @click="dlg = true">Open controlled</Button>
      <Dialog v-model:open="dlg">
        <DialogContent data-probe="dialog">
          <DialogHeader><DialogTitle>Controlled</DialogTitle><DialogDescription>No DialogTrigger</DialogDescription></DialogHeader>
          <Input data-probe="din" aria-label="inside" />
        </DialogContent>
      </Dialog>
    </section>
    <section v-if="s === 'menu'">
      <DropdownMenu v-model:open="menu">
        <DropdownMenuTrigger as-child><Button data-probe="mtrig">Menu</Button></DropdownMenuTrigger>
        <DropdownMenuContent data-probe="menuc">
          <DropdownMenuItem v-for="i in 5" :key="i" :data-probe="'mi' + i" @select="mpick(i)">Item {{ i }}</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </section>
    <!-- W-K.4 · F-39 -->
    <section v-if="s === 'ring'" style="display:flex;flex-direction:column;gap:24px;padding:24px;max-width:520px">
      <div style="padding:8px" data-probe="slwrap"><Slider v-model="f.vol.value" aria-label="Volume" data-probe="slider" /></div>
      <div style="display:flex;gap:24px;padding:8px" data-probe="cbwrap">
        <span data-probe="cbe" style="padding:6px;display:inline-flex"><Checkbox aria-label="enabled" /></span>
        <span data-probe="cbd" style="padding:6px;display:inline-flex"><Checkbox aria-label="disabled" disabled /></span>
        <span data-probe="swe" style="padding:6px;display:inline-flex"><Switch aria-label="enabled sw" /></span>
        <span data-probe="swd" style="padding:6px;display:inline-flex"><Switch aria-label="disabled sw" disabled /></span>
      </div>
      <div data-probe="segwrap" style="padding:8px"><SegmentedTabs v-model="tab" :options="tabOpts" aria-label="View" /></div>
      <div data-probe="tgwrap" style="padding:8px"><ToggleGroup type="single" v-model="tgv"><ToggleGroupItem value="a" data-probe="tga">A</ToggleGroupItem><ToggleGroupItem value="b" data-probe="tgb">B</ToggleGroupItem></ToggleGroup></div>
      <div v-if="!nodock" data-probe="dockwrap" style="padding:12px;display:flex"><GlassDock :collapse="false" data-probe="dock"><DockControl aria-label="Home" data-probe="dc1">H</DockControl><DockControl aria-label="Next" data-probe="dc2">N</DockControl></GlassDock></div>
      <div data-probe="accwrap" style="padding:8px"><Accordion type="single" collapsible><AccordionItem value="a"><AccordionTrigger data-probe="acct">Question</AccordionTrigger><AccordionContent>Answer</AccordionContent></AccordionItem></Accordion></div>
      <div data-probe="inwrap" style="padding:8px"><Input aria-label="invalid" aria-invalid="true" data-probe="inv" /></div>
    </section>
    <!-- W-K.5 · F-40 -->
    <section v-if="s === 'listbox'">
      <input data-probe="lbin" aria-label="search" role="combobox" aria-controls="lb" :aria-activedescendant="activeOpt" />
      <div id="lb" role="listbox" aria-label="Results" data-probe="lb" style="display:grid;gap:8px;margin-top:8px">
        <Card v-for="o in listOpts" :key="o.id" :id="o.id" :selected="o.id === activeOpt">{{ o.label }}</Card>
      </div>
    </section>
    <!-- W-K.6 · F-42 -->
    <section v-if="s === 'names'" style="display:flex;flex-direction:column;gap:16px;max-width:420px">
      <div><Label for="vol">Volume</Label><Slider id="vol" :default-value="[30]" data-probe="lslider" /></div>
      <Select v-model:open="sel"><SelectTrigger aria-label="Fruit" data-probe="strig"><SelectValue placeholder="Pick" /></SelectTrigger><SelectContent data-probe="selc"><SelectItem v-for="x in fruits" :key="x" :value="x">{{ x }}</SelectItem></SelectContent></Select>
      <Popover v-model:open="pop"><PopoverTrigger as-child><Button data-probe="ptrig">Open popover</Button></PopoverTrigger><PopoverContent aria-label="Share settings" data-probe="popc">Body</PopoverContent></Popover>
    </section>
    <section v-if="s === 'empty'">
      <PagerDots :count="count0" aria-label="Empty rail" data-probe="dots" />
      <Select v-model:open="sel"><SelectTrigger aria-label="None" data-probe="strig"><SelectValue placeholder="Nothing" /></SelectTrigger><SelectContent data-probe="selc"><template #empty><span data-probe="selempty">No options</span></template></SelectContent></Select>
    </section>
    <section v-if="s === 'ime'">
      <Dialog v-model:open="dlg"><DialogContent data-probe="dialog"><DialogHeader><DialogTitle>IME</DialogTitle><DialogDescription>composition</DialogDescription></DialogHeader><Input data-probe="din" aria-label="ime field" /></DialogContent></Dialog>
      <ExpandableContainer v-model:expanded="ec" data-probe="ecroot"><template #default><Input data-probe="ecin" aria-label="ec field" /></template></ExpandableContainer>
      <Command data-probe="cmd"><CommandInput placeholder="Filter" data-probe="cin" /><CommandList><CommandItem v-for="x in fruits" :key="x" :value="x">{{ x }}</CommandItem></CommandList></Command>
    </section>
    <section v-if="s === 'held'">
      <Dialog v-model:open="dlg"><DialogTrigger as-child><Button data-probe="trig">Open dialog</Button></DialogTrigger><DialogContent data-probe="dialog"><DialogHeader><DialogTitle>Held</DialogTitle><DialogDescription>repeat</DialogDescription></DialogHeader></DialogContent></Dialog>
      <DropdownMenu v-model:open="menu"><DropdownMenuTrigger as-child><Button data-probe="mtrig">Menu</Button></DropdownMenuTrigger><DropdownMenuContent><DropdownMenuItem v-for="i in 3" :key="i" @select="hpick()">Item {{ i }}</DropdownMenuItem></DropdownMenuContent></DropdownMenu>
    </section>
    <!-- W-K.7 · F-43 -->
    <section v-if="s === 'tabsin'">
      <Popover v-model:open="pop"><PopoverTrigger as-child><Button data-probe="ptrig">Tabs in popover</Button></PopoverTrigger><PopoverContent data-probe="popc"><SegmentedTabs v-model="tab" :options="tabOpts" aria-label="In popover" data-probe="segp" /></PopoverContent></Popover>
      <Dialog v-model:open="dlg"><DialogContent data-probe="dialog"><DialogHeader><DialogTitle>Tabs</DialogTitle><DialogDescription>in a dialog</DialogDescription></DialogHeader><SegmentedTabs v-model="tab" :options="tabOpts" aria-label="In dialog" data-probe="segd" /></DialogContent></Dialog>
      <div style="margin-top:24px"><SegmentedTabs v-model="tab" :options="tabOpts" aria-label="Top" data-probe="segt" /></div>
    </section>
    <!-- W-K.8 · F-82 -->
    <form v-if="s === 'form'" data-probe="form" @submit="onSubmit" style="display:flex;flex-direction:column;gap:12px;max-width:420px">
      <fieldset :disabled="fsDisabled" data-probe="fs" style="display:flex;flex-direction:column;gap:12px;border:0;padding:0">
        <Select v-model="f.fruit.value" name="fruit" required><SelectTrigger aria-label="Fruit" data-probe="strig"><SelectValue /></SelectTrigger><SelectContent><SelectItem v-for="x in fruits" :key="x" :value="x" :data-probe="'so-' + x">{{ x }}</SelectItem></SelectContent></Select>
        <Checkbox v-model="f.agree.value" name="agree" value="yes" required aria-label="Agree" data-probe="cb" />
        <Switch v-model="f.on.value" name="on" required aria-label="On" data-probe="sw" />
        <RadioGroup v-model="f.plan.value" name="plan" aria-label="Plan" data-probe="rg"><RadioGroupItem value="solo" aria-label="solo" /><RadioGroupItem value="team" aria-label="team" /></RadioGroup>
        <Slider v-model="f.vol.value" name="vol" aria-label="Volume" data-probe="sl" />
        <NumberField v-model="f.qty.value" name="qty" aria-label="Quantity" data-probe="nf"><NumberFieldInput data-probe="nfin" /></NumberField>
        <Input v-model="f.name.value" name="name" required aria-label="Name" data-probe="in" />
        <Textarea v-model="f.note.value" name="note" aria-label="Note" data-probe="ta" />
      </fieldset>
      <div style="display:flex;gap:8px"><button type="submit" data-probe="submit">Submit</button><button type="reset" data-probe="reset">Reset</button></div>
    </form>
    <!-- W-K.9 · F-83 -->
    <section v-if="s === 'find'" style="display:flex;flex-direction:column;gap:16px;max-width:520px">
      <Accordion v-model="acc" type="single" collapsible data-probe="acc">
        <AccordionItem value="a"><AccordionTrigger>First</AccordionTrigger><AccordionContent>Alpha answer text.</AccordionContent></AccordionItem>
        <AccordionItem value="b"><AccordionTrigger>Second</AccordionTrigger><AccordionContent>Needle quartzite borealis inside item two.</AccordionContent></AccordionItem>
      </Accordion>
      <Collapsible v-model:open="coll" data-probe="coll"><CollapsibleTrigger as-child><Button>Toggle</Button></CollapsibleTrigger><CollapsibleContent force-mount data-probe="collc">Forcemounted pelican marmalade text.</CollapsibleContent></Collapsible>
      <ConfiguratorLayer v-model:open="cfg" label="Field" data-probe="cfg"><div>Diffusion radius</div></ConfiguratorLayer>
      <Carousel v-model:active="car" data-probe="car">
        <CarouselContent><CarouselItem v-for="i in 5" :key="i" :index="i - 1" :label="'Slide ' + i"><div style="height:120px;padding:12px">{{ i === 4 ? 'Slide four walrus tangerine' : 'Slide ' + i }}</div></CarouselItem></CarouselContent>
      </Carousel>
    </section>
    <!-- W-K.10 · F-84 -->
    <section v-if="s === 'text'" style="display:flex;flex-direction:column;gap:16px;max-width:520px">
      <p data-probe="tw"><TypewriterText text="Typewriter says hello world" :base-speed="10" :humanize="false" /></p>
      <TooltipProvider :delay-duration="0"><Tooltip :open="true"><TooltipTrigger as-child><Button data-probe="ttrig">Italic</Button></TooltipTrigger><TooltipContent data-probe="tipc">Italic · ⌘I</TooltipContent></Tooltip></TooltipProvider>
      <SortableList :items="tasks" :get-id="(t) => t.id" :get-label="(t) => t.label" label="Tasks" data-probe="sort" @reorder="tasks = $event">
        <SortableItem v-for="t in tasks" :key="t.id" :id="t.id"><SortableHandle>::</SortableHandle><span :data-probe="'row-' + t.id">{{ t.label }}</span></SortableItem>
      </SortableList>
      <Chip data-probe="chip">Static chip label</Chip>
      <div class="interactive-item" data-probe="ii" style="padding:8px">Interactive row title text</div>
    </section>
  </main>
</template>
```

# W-E.5 · W-TOAST: one viewport, a queue, one announce channel, named items, placement below `sm` · 11.0.0

| field | value |
|---|---|
| seat | band-E wave-spec seat, formation (relaunch 2026-09-25) |
| model | `claude-opus-5-5`, asserted from own system identity |
| HEAD | `4d2e3123` (`src`/`demo` identical to `f3ad78d0`), scratch worktree; probes drive the band-E fixture app (W-E.1 appendix B: `pages/e.html` scene `toast`, `pages/f.html` two app roots) and the built demo |
| ships in | 11.0.0 |
| families | F-41 (#34 W-TOAST; UIA-F-51, O-59's one BLOCKING row; UIA-F-142; UIA-KF-221, UIA-F-227; #33b; #31f) |
| depends on | PLAN §5, the one record of edges |
| dependants | PLAN §5 (its inverse) |

## 1 · What it closes

| id | what |
|---|---|
| #34 | W-TOAST: its fence (#33) is met; the store, the queue, the announce channel and the placement are open |
| F-41 viewport | two Toasters on a page, or two app roots each with a Toaster, render every toast twice |
| F-41 queue | `TOAST_LIMIT = 5` with `slice(0, 5)` evicts live toasts; a burst of 50 renders 5 |
| F-41 announce | every toast is announced on one polite list region, whatever its tone; list items are unnamed |
| F-41 deck | the deck stage and PagerDots each own a polite region, so one step is announced twice |
| UIA-F-51 | below `sm`, a `bottom-*` toast renders at the top |
| UIA-F-142 | stacked toasts touch (gap 0) |
| UIA-KF-221 | no caller id for replace-in-place, and no tone glyph in the Toaster's item |
| UIA-F-227 | the close glyph takes the tone (`Toast.vue:138`, `[&_svg]:text-(--tone)` colours every svg, the close included), and the stack order flips at `sm` (`Toaster.vue:83,87,91` `flex-col-reverse` below it, `sm:flex-col` above) |
| #33b | `ToastTitle.vue:14` sets `text-small font-semibold`: `text-small` declares `font-weight: 400` (`typography/semantic.css:221`) and the second utility overrides it, two weight sources on one element |
| #31f (RT-31F) | the feedback recipes' own tint and ink decisions: RETIRE CURED at HEAD. Title and description ink on all five tone plates, light and dark, pass 4.5:1 (fix-2's probe, scene `toast`, Chromium: 10 of 10, the lowest a description at 7.66 on the light destructive plate). E5-G15 holds it. Re-trigger: any tone plate under 4.5:1 |

## 2 · The defect at HEAD

Measured with appendix A (`node e5.mjs`), Chromium, AX reads over CDP `Accessibility.getFullAXTree`: **9 rows, 9 FAIL**. Load 51.1 → 40.6. Playwright WebKit was not run (the AX reads are CDP). The wired spec's WebKit arm runs G1-G4, G6 and G7, which are DOM and geometry.

| gate | HEAD reading | source |
|---|---|---|
| G1 two Toasters, one page | 2 viewports, 2 toasts | `Toaster.vue` renders its own viewport per mount over the shared store |
| G2 two app roots | 2 viewports, 2 toasts | same |
| G3 seven infinite toasts, 400 ms apart | "Toast 1" and "Toast 2" are removed while open; 3-7 present | `use-toast.ts:5` `TOAST_LIMIT = 5`; `:62` `[action.toast, ...toasts.value].slice(0, TOAST_LIMIT)` |
| G4 a same-tick burst of 50 (250 ms each) | 5 ever rendered | same slice |
| G5 destructive | one exposed region, `list` / `polite`; item name `""` | the list is the live region; items carry no name |
| G5 neutral | one `list` / `polite` region; item name `""` | |
| G6 390, `bottom-right` | toast top 16, bottom 122.2 | `Toaster.vue:72` `VIEWPORT_BASE = "fixed top-0 …"`; the bottom anchor applies only under `sm:` |
| G7 two stacked toasts | gap 0 | no gap on the viewport's flex stack |
| G8 `/motion/deck` after two steps | 2 exposed polite regions hold "Slide 3" (a `paragraph` and a `status`) | `DeckStage.vue:91-93` renders its own `aria-live` paragraph; `PagerDots.vue:79` `announce: true` by default and its region at `:411-418` |

## 3 · The cure

1. **One viewport per page.** The store (`use-toast.ts`) keeps a module-level viewport owner. The first `<Toaster>` to mount owns the viewport and renders it. A later `<Toaster>` renders nothing and logs a dev-mode `console.error` naming the owner's position, so a duplicate fails loud instead of rendering twice. The owner hands off on unmount to the next mounted Toaster. Two app roots on one page share the module, so G2 follows.
2. **A queue behind a visible window.** `toasts` holds every admitted toast. The viewport renders the first `TOAST_VISIBLE = 5`, oldest first. The rest wait, and a waiting toast's `duration` timer starts when it becomes visible. `ADD_TOAST` appends; nothing is ever sliced away. A toast leaves only through `DISMISS_TOAST`/`REMOVE_TOAST`.
3. **One announce channel.** The store owns two visually hidden regions in the viewport, one `role="status"` (`aria-live="polite"`) and one `role="alert"` (`aria-live="assertive"`). Each admitted toast is announced once, as its title and description, through the assertive region if its tone is `destructive` and the polite region otherwise. The list (`ol`) is no longer live. Each item is named: `aria-labelledby` its title and `aria-describedby` its description.
4. **The deck is stated once.** PagerDots renders its region only when it is outside a deck: it injects the deck context and skips the region inside `DeckStage`, whose paragraph is the deck's one announcer. The `announce` prop stays, for opting out outside a deck.
5. **Placement at every width.** `VIEWPORT_BASE` drops `top-0`. Each position's anchor fragment (`top-*` or `bottom-*`, and its flex direction) applies at every width, not under `sm:`. `VIEWPORT_PAD` is W-E.1's inset-aware pad.
6. **A stack gap.** The viewport's flex stack has `gap: var(--space-atom)` (the 8 px gap rung at `tokens/sizing.css:121`, stepped by the width query like every gap, W-E.7); the toast's own margin is removed.
7. **Replace in place.** `toast({ id })` with an id already on the store replaces that toast's content and restarts its timer, in its place; with a new id it appends.
8. **The tone glyph.** A non-neutral toast renders its tone's glyph (the feedback register's, shared with Alert) at the item's start; `[&_svg]:text-(--tone)` narrows to that glyph, so the close glyph keeps the item's ink.
9. **One stack order.** With cure 5 each anchor has one direction at every width: oldest first, newest nearest the anchor edge. `flex-col-reverse` and the `sm:flex-col` override leave `Toaster.vue`.
10. **One weight source.** `ToastTitle` reads one type role that owns its size and weight; `font-semibold` leaves `ToastTitle.vue:14`.

## 4 · Files it touches

`src/components/toast/use-toast.ts`, `src/components/toast/Toaster.vue`, `src/components/toast/Toast.vue` (item naming), `src/components/toast/index.ts` (`TOAST_VISIBLE`), `src/components/pager-dots/PagerDots.vue`, `src/components/deck/DeckStage.vue` (the context PagerDots reads, if it does not already provide it). New: `tests-visual/wired/toast-store.spec.ts` (appendix A), plus a unit test `tests/components/toast/store.test.ts` for §3.1-3.2 (owner handoff, queue order, timer start on visibility).

## 5 · Acceptance gates

| id | gate | passes when | HEAD reading |
|---|---|---|---|
| E5-G1 · one viewport | appendix A G1 | 1 viewport, 1 toast | **2, 2** |
| E5-G2 · one viewport, two apps | appendix A G2 | 1, 1 | **2, 2** |
| E5-G3 · no live eviction | appendix A G3 | 0 evicted | **2** ("Toast 1", "Toast 2") |
| E5-G4 · burst | appendix A G4 | 50 rendered | **5** |
| E5-G5 · announce and name | appendix A G5, destructive and neutral | one region per toast, `assertive` for destructive and `polite` otherwise, item named | **2 of 2 FAIL** (`list`/`polite`, name `""`) |
| E5-G6 · placement below `sm` | appendix A G6 | bottom ≥ 724 at 390×844 | **top 16, bottom 122.2** |
| E5-G7 · stack gap | appendix A G7 | ≥ 8 px | **0** |
| E5-G8 · deck once | appendix A G8 | 1 exposed region | **2** |
| E5-G9 · no slice | `! grep -qE '\.s(p)?lice\([^)]*TOAST_LIMIT' src/components/toast/use-toast.ts` | exit 0 | **exit 1** (fix-13, `3ce80b06`, the span as re-written: 1 line in 1 file, first `use-toast.ts:62`; the spellings it is held to are its `formation-audit/sweeps/hold-line-claim.py` CLAIMS entry). Before fix-13: **exit 1** (`use-toast.ts:62`) |
| E5-G10 · one title weight (static, #33b) | `! grep -qE 'font-(thin\|extralight\|light\|normal\|medium\|semibold\|bold\|extrabold\|black)([^-a-z]\|$)\|font-weight' src/components/toast/ToastTitle.vue` | exit 0 | **exit 1** (fix-13, `3ce80b06`, the span as re-written: 1 line in 1 file, first `ToastTitle.vue:14`; the spellings it is held to are its `formation-audit/sweeps/hold-line-claim.py` CLAIMS entry). Before fix-13: **exit 1** (`:14`) |
| E5-G11 · replace in place (UIA-KF-221) | fix-2's probe scene `mtoast`: `toast({ id: 'same', title: 'first' })`, then `toast({ id: 'same', title: 'second' })` | one toast titled "second" | **FAIL**, both engines: 2 toasts, "second" and "first" both rendered |
| E5-G12 · the tone glyph (UIA-KF-221) | the same scene: a `tone: 'success'` toast's svg count, excluding the close | ≥ 1 | **FAIL**, both engines: 1 svg in the item, the close only |
| E5-G13 · the close keeps its ink (UIA-F-227, static) | `! grep -qF '[&_svg]:text-(--tone)' src/components/toast/Toast.vue` | exit 0 | **exit 1** (`:138`) |
| E5-G14 · one stack order (UIA-F-227, static) | `! grep -rqE 'flex-col-reverse\|column-reverse' src/components/toast` | exit 0 | **exit 1** (fix-13, `3ce80b06`, the span as re-written: 3 lines in 1 file, first `Toaster.vue:83`; the spellings it is held to are its `formation-audit/sweeps/hold-line-claim.py` CLAIMS entry). Before fix-13: **exit 1** (`:83`, `:87`, `:91`) |
| E5-G15 · tone ink holds (#31f) | fix-2's probe scene `toast`, rows `W-E.5/TOAST-INK`: title and description on each tone plate, light and dark | 10 of 10 ≥ 4.5:1 | hold line: 10 of 10, lowest 7.66. Bite: a tone wash that pushes a description under 4.5 |

Can each fail and pass? All nine browser rows fail at HEAD. The AX row G5 has a passing shape on any page with one named `status` item; its planted twin sets the list back to `aria-live="polite"`, which adds a second region. G9, G10, G13 and G14 are static and exit 1 at HEAD; G11 and G12 fail in both engines; G15 is a hold line with its bite.

## 6 · π and DELTA obligations

- **Surfaces:** the fixture scenes `toast` (`pos` all six, `two=1`, `tone=destructive`) and `pages/f.html`; demo `/feedback/toast` and `/motion/deck`.
- **Themes:** light and dark for G6 and G7, the geometry. The store rows are theme-independent.
- **Engines:** Chromium measured. Playwright WebKit runs the DOM and geometry rows in the wired spec. Real Safari is UNMEASURED (OW-3), and VoiceOver's reading of the two regions is an owner cell, not a claim this wave makes.
- **Paired capture:** at `<E5-base>` and at the wave, the 390×844 `bottom-right` toast frame (top, then bottom) and a two-toast stack at 1024×768 (touching, then gapped), each with the appendix A JSON. The AX dumps of G5 and G8 are saved beside them.

## 7 · MIGRATION rows

| before | after | note |
|---|---|---|
| every mounted `<Toaster>` renders a viewport | the first mounted owns it; others render nothing and log a dev error | mount one Toaster per page |
| at most 5 toasts exist; a sixth evicts the oldest | all admitted toasts queue; 5 are visible | a toast is never removed while open; a waiting toast's `duration` starts when it becomes visible, not when it is added (fix-15) |
| the toast list is the live region (polite) | one polite `status` and one assertive `alert` region; `destructive` toasts announce assertively | assistive tech hears an error toast at once |
| `bottom-*` positions anchor at the top below `sm` | they anchor at the bottom at every width | |
| PagerDots announces inside a deck | the deck announces; PagerDots announces only outside one | |

## 8 · Ledger rows

Closes #34, UIA-F-51 (O-59's BLOCKING row), UIA-F-142, UIA-KF-221 (E5-G11, E5-G12), UIA-F-227 (E5-G13, E5-G14) and #33b (E5-G10, BUILD). Records #31f as RETIRE CURED (E5-G15 its hold).

## 9 · Gestalt passes (P-1)

- **Tranche fit:** one store owns admission, visibility and speech. The viewport is a layer in W-E.4's stack and pads by W-E.1's tokens.
- **Wave:** E5-G1..G9 green in one run.
- **Feature:** at 390×844, a burst of eight toasts, one of them an error. Five show at the bottom with gaps, the rest follow as each closes, and the AX dump shows each announced once, the error assertively.

## Appendix A · `e5.mjs` (lands as `tests-visual/wired/toast-store.spec.ts`)

```js
// W-E.5 born-RED probe: the toast store (one viewport per page, a queue, one announce channel, named items, placement below sm).
// node e5.mjs   (Chromium; the AX reads use CDP Accessibility.getFullAXTree)
import { open, rectOf, sleep, load, CAP, DEMO, APP2, ENG } from './lib.mjs';
import fs from 'node:fs';
const out = { load: load(), rows: [] };
const row = (id, pass, reading) => { out.rows.push({ id, pass, reading }); console.log(`${pass ? 'PASS' : 'FAIL'} ${id} ${JSON.stringify(reading)}`); };
const safe = async (label, fn) => { try { await fn(); } catch (e) { row(label, false, { error: String(e.message).split('\n')[0] }); } };
// exposed live regions (not aria-hidden, via the AX tree) whose text contains `needle`
async function liveRegions(cdp, needle) {
  const { nodes } = await cdp.send('Accessibility.getFullAXTree');
  const byId = new Map(nodes.map((n) => [n.nodeId, n]));
  const text = (n, d = 0) => d > 30 || !n ? '' : (n.name?.value || '') + ' ' + (n.childIds || []).map((c) => text(byId.get(c), d + 1)).join(' ');
  const res = [];
  for (const n of nodes) { if (n.ignored) continue; const live = n.properties?.find((p) => p.name === 'live')?.value?.value; const root = n.properties?.find((p) => p.name === 'liveRoot'); if (live && live !== 'off' && (!root || root.value?.relatedNodes?.[0]?.backendDOMNodeId === n.backendDOMNodeId) && text(n).includes(needle)) res.push({ role: n.role?.value, live }); }
  const items = nodes.filter((n) => !n.ignored && n.role?.value === 'listitem').map((n) => n.name?.value ?? '');
  return { regions: res, items };
}

// G1 · two Toasters on one page render one viewport holding the toast
await safe('E5-G1 one viewport, two Toasters', async () => {
  const { browser, page } = await open({ w: 1024, h: 768, qs: 's=toast&two=1&n=1&title=Hello' });
  await sleep(600);
  const m = await page.evaluate(() => ({ viewports: [...document.querySelectorAll('ol')].filter((o) => o.textContent.includes('Hello')).length, toasts: document.querySelectorAll('[data-slot=toast]').length }));
  row('E5-G1 one viewport, two Toasters', m.viewports === 1 && m.toasts === 1, m); await browser.close();
});
// G2 · two app roots, each with a Toaster: one toast() renders once
await safe('E5-G2 one viewport, two apps', async () => {
  const browser = await ENG.chromium.launch(); const page = await (await browser.newContext({ viewport: { width: 1024, height: 768 } })).newPage();
  await page.goto(APP2); await page.waitForFunction(() => window.__ready); await page.evaluate(() => window.__toast({ title: 'Hello' })); await sleep(600);
  const m = await page.evaluate(() => ({ viewports: [...document.querySelectorAll('ol')].filter((o) => o.textContent.includes('Hello')).length, toasts: document.querySelectorAll('[data-slot=toast]').length }));
  row('E5-G2 one viewport, two apps', m.viewports === 1 && m.toasts === 1, m); await browser.close();
});
// G3 · admission: seven infinite toasts 400 ms apart; no open toast leaves the DOM, toasts 1 and 2 stay open or queued
await safe('E5-G3 no live toast evicted', async () => {
  const { browser, page } = await open({ w: 1024, h: 768, qs: 's=toast&n=0' });
  await page.evaluate(() => { window.__evicted = []; new MutationObserver((ms) => { for (const m of ms) for (const n of m.removedNodes) if (n.nodeType === 1) for (const t of [n, ...n.querySelectorAll('[data-slot=toast]')]) if (t.dataset?.slot === 'toast' && t.dataset.state === 'open') window.__evicted.push(t.textContent.trim().slice(0, 12)); }).observe(document.body, { childList: true, subtree: true }); });
  for (let i = 1; i <= 7; i++) { await page.evaluate((i) => window.__toast({ title: 'Toast ' + i, duration: Number.POSITIVE_INFINITY }), i); await sleep(400); }
  await sleep(600);
  const m = await page.evaluate(() => ({ evicted: window.__evicted, present: [...document.querySelectorAll('[data-slot=toast]')].map((t) => t.textContent.trim().slice(0, 8)) }));
  row('E5-G3 no live toast evicted', m.evicted.length === 0, m); await browser.close();
});
// G4 · admission: a same-tick burst of 50 short toasts eventually renders all 50
await safe('E5-G4 burst of 50', async () => {
  const { browser, page } = await open({ w: 1024, h: 768, qs: 's=toast&n=0' });
  await page.evaluate(() => { window.__seen = new Set(); new MutationObserver(() => { for (const t of document.querySelectorAll('[data-slot=toast]')) window.__seen.add(t.textContent.trim().split(' ').slice(0, 2).join(' ')); }).observe(document.body, { childList: true, subtree: true, characterData: true }); for (let i = 1; i <= 50; i++) window.__toast({ title: 'B' + i + ' ', duration: 250 }); });
  await sleep(25000);
  const n = await page.evaluate(() => window.__seen.size);
  row('E5-G4 burst of 50', n === 50, { rendered: n }); await browser.close();
});
// G5 · announce: an error-tone toast is announced once, assertively, as a named item; a default toast once, politely
for (const tone of ['destructive', 'neutral']) await safe(`E5-G5 announce ${tone}`, async () => {
  const { browser, page, cdp } = await open({ w: 1024, h: 768, qs: `s=toast&n=1&title=Upload%20failed&tone=${tone}` });
  await sleep(800);
  const a = await liveRegions(cdp, 'Upload failed');
  const want = tone === 'destructive' ? 'assertive' : 'polite';
  row(`E5-G5 announce ${tone}`, a.regions.length === 1 && a.regions[0].live === want && a.items.some((x) => x.includes('Upload failed')), a); await browser.close();
});
// G6 · placement below sm: at 390 a bottom position anchors at the bottom (UIA-F-51)
await safe('E5-G6 bottom anchor at 390', async () => {
  const { browser, page } = await open({ w: 390, h: 844, touch: true, mobile: true, qs: 's=toast&n=1&pos=bottom-right' });
  await sleep(700); const r = await rectOf(page, '[data-slot=toast]');
  row('E5-G6 bottom anchor at 390', r.b >= 844 - 120, { top: r.t, bottom: r.b }); await browser.close();
});
// G7 · stack: two toasts are separated by a gap (UIA-F-142)
await safe('E5-G7 stack gap', async () => {
  const { browser, page } = await open({ w: 1024, h: 768, qs: 's=toast&n=2&inf=1' });
  await sleep(800);
  const g = await page.evaluate(() => { const r = [...document.querySelectorAll('[data-slot=toast]')].map((t) => t.getBoundingClientRect()).sort((a, b) => a.top - b.top); return r.length < 2 ? null : +(r[1].top - r[0].bottom).toFixed(1); });
  row('E5-G7 stack gap', g != null && g >= 8, { gap: g }); await browser.close();
});
// G8 · the deck: one exposed live region holds "Slide N of M" after each step (/motion/deck)
await safe('E5-G8 deck one announcer', async () => {
  const { browser, page, cdp } = await open({ w: 1280, h: 900, url: `${DEMO}/motion/deck`, settle: 1500 });
  const next = page.getByRole('button', { name: /next/i }).first(); await next.click(); await sleep(500); await next.click(); await sleep(800);
  const a = await liveRegions(cdp, 'Slide 3');
  row('E5-G8 deck one announcer', a.regions.length === 1, { regions: a.regions }); await browser.close();
});
out.load2 = load(); fs.writeFileSync(`${CAP}/e5.json`, JSON.stringify(out, null, 1));
const fails = out.rows.filter((r) => !r.pass).length; console.log(`e5: ${out.rows.length} rows, ${fails} FAIL · load ${out.load} → ${out.load2}`);
process.exitCode = fails ? 1 : 0;
```

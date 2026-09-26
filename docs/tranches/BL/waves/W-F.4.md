# W-F.4 · W-EXTENT-OWNED: the moving box owns every layout contribution it changes · 11.0.0

| field | value |
|---|---|
| seat | band-F wave-spec seat, formation (relaunch 2026-09-25) |
| model | `claude-opus-5-5`, asserted from own system identity |
| HEAD | `84b470aa` (`src`, `demo`, `scripts`, `tests` identical to `f3ad78d0`), scratch worktree, demo built and served on :5961 |
| ships in | 11.0.0 |
| families | F-76 (members R3-01-06, R3-01-07, R3-01-08, R4-02-10) |
| depends on | PLAN §5, the one record of edges |
| dependants | PLAN §5 (its inverse) |

The dock instance of this shape (DockCrossfade sizes the box to the entering face and lays the leaving face absolute, R2-03-03) stays in F-16 for W-I.1 (loop D2), as the family statement rules (`REG:1104`); this wave does not touch the dock.

## 1 · What it closes

| id | what |
|---|---|
| R3-01-07 | Collapsible: the root's `gap` appears in one frame when the content mounts and disappears in one frame when it unmounts, while the disclosure animates `block-size`. `CollapsibleContent.vue:40-52` puts `.disclosure-content` on the content with no body; `AccordionContent.vue:48-52` has `.disclosure-content-body`. The story roots each Collapsible as `grid gap-3` (`demo/stories/containers/collapsible.vue:26,40,61`), the ordinary consumer shape |
| R3-01-06 | the toast stack: the Toaster viewport stacks toasts in flow (`Toaster.vue:80-95`); a new toast blooms by `scale` while the resting neighbour is pushed by layout in one frame |
| R3-01-08 | the typewriter: hidden `.tw-reserve` spans size the box without the cursor (`TypewriterText.vue:8-15`, `:219-226`); the visible layer is `absolute; inset: 0` with a `nowrap` tail (`:228-237`), so text plus cursor wraps a line the reserve never held |
| R4-02-10 | HandMark: every fragment's SVG frame is `absolute; left: 0; top: 0` of the inline host (`HandMark.vue:447-453`) with geometry relative to the first fragment's origin (`:234`); a wrapped mark's second frame is a layout box on line one that counts as scrollable overflow |
| UIA-KF-016 | FadingScroll: `.fading-scroll` declares no containing block and no overscroll contract (`src/styles/utilities/base-misc.css:52-61`), so an absolute layer inside it resolves outside the port (`INBOUND-MAP.md:425`, the round-4 absolute-layer clause, `REG:1112`) |
| UIA-F-225 | the disclosure twins diverge on the body wrapper (`INBOUND-MAP.md:463`, F-65; the body clause is this wave's) |

## 2 · The defect at HEAD

`node f4.mjs` (appendix A), Chromium: **8 rows, 8 FAIL** (load 225.9 → 159.6).

| gate | cell | HEAD reading |
|---|---|---|
| G1 Collapsible, `/containers/collapsible`, the first "Show release notes" | light | first open step **12.0 px** against a median of 2.52; last close step **13.86** against 2.88 |
| | dark | **12.0** vs 2.47; **13.83** vs 2.63 |
| G2 toast insert, `/feedback/toast`, "Default" twice | light, dark | the resting toast (135.9 px tall) moves **135.9 px in one frame** |
| G3 typewriter, `/motion/text-motion` → Typewriter, 6 s settled | 1280 | "echo 'warm cream' \|": reserved box **22.4 px**, visible `scrollHeight` **45** |
| | 390 | **19.6** vs **39** |
| G4 HandMark, `/motion/handmark` | 320×640 | `main` `scrollWidth` **366** against `clientWidth` 320: the page pans 46 px (R4-02-10's reading exactly) |
| G5 FadingScroll, `/navigation/carousel` | 1440×900 | an absolute child's `offsetParent` is **not** the port; `position: static`, `contain: none`, `overscroll-behavior: auto` |

The measures can pass at HEAD on their controls: the typewriter's hero line passes G3 in the same run (its reserve holds it), and R4-02 recorded that HandMark does not pan at 390.

## 3 · The cure

1. **The Collapsible's content owns its spacing.** `CollapsibleContent` renders `.disclosure-content-body` inside W-F.2's grid-rows wrapper, as `AccordionContent` does. The space between trigger and content is `--collapsible-gap` on the root, applied as the body's `padding-block-start`, inside the clip, so it grows and shrinks with the size. With W-F.2's always-mounted content, a `gap` on the root would separate the trigger from a zero-height row at rest; the library's docs state that the root takes no `gap` and the spacing hook is `--collapsible-gap`. The demo story's `grid gap-3` roots move to `--collapsible-gap: var(--space-…)` (the 12 px rung they use now). Accordion and Collapsible then share one body rule (the F-65 twin clause of UIA-F-225).
2. **Toast offsets ride a spring inside W-E.5's store.** The viewport lays toasts out absolutely in one stack; the store keeps each toast's measured block size, and each toast's resting offset is the sum of the sizes and gaps before it. The offset is a `springStepper("present")` per toast (W-F.1) driving `translate`, so an insert or a dismissal moves the neighbours along a spring, and the viewport's block size is the stack's sum (it owns what it occupies). The flow stack (`Toaster.vue:80-95`, `flex-col-reverse` / `sm:flex-col`) is deleted.
3. **The typewriter's reserve holds the cursor.** Each `.tw-reserve` span renders the same structure as the visual layer: the leading text plus a `nowrap` tail made of the last character and a cursor-sized spacer (`inline-size` of `.tw-cursor`). The reserve then wraps where the visual layer wraps, and the box holds every settled candidate with its cursor.
4. **HandMark's frames sit at their own fragments.** `measure()` keeps one rect per fragment and each fragment's geometry is relative to its own rect; each `svg.hm-mark` is positioned at its fragment's offset from the host (`left`/`top` from the fragment rect), with `width` its own. No frame's layout box leaves its fragment.
5. **FadingScroll is a containing block and holds its overscroll.** `.fading-scroll { position: relative; overscroll-behavior: contain; }` (the `-x`/`-y` modifiers keep their axis masks). An absolute layer inside a fading port resolves against the port, and a port inside a dialog does not chain its overscroll to the dialog.

## 4 · Files it touches

`src/components/collapsible/CollapsibleContent.vue`, `src/components/_shared/disclosure/disclosure.css`, `demo/stories/containers/collapsible.vue`; `src/components/toast/{Toaster.vue,Toast.vue}` and W-E.5's store module; `src/components/typewriter/TypewriterText.vue`; `src/components/handmark/HandMark.vue`; `src/styles/utilities/base-misc.css`. New: `tests-visual/wired/extent-owned.spec.ts` (appendix A). `MIGRATION.md` (§7).

## 5 · Acceptance gates

| id | gate | passes when | HEAD reading |
|---|---|---|---|
| F4-G1 · the Collapsible's first and last steps | appendix A `--only G1`, light and dark | the parent's first open step ≤ its median step, and its last close step ≤ its median step | **12.0 vs 2.52; 13.86 vs 2.88** (light) |
| F4-G2 · a resting toast glides | appendix A `--only G2`, light and dark | the resting toast moves ≤ ¼ of its height per frame on an insert | **135.9 px in one frame** |
| F4-G3 · the reserve holds the cursor | appendix A `--only G3`, 1280 and 390 | every line's visible `scrollHeight` ≤ its box + 1 px | **45 vs 22.4; 39 vs 19.6** |
| F4-G4 · HandMark does not pan | appendix A `--only G4`, 320×640 | `main.scrollWidth ≤ main.clientWidth` | **366 > 320** |
| F4-G5 · FadingScroll owns its layers | appendix A `--only G5` | an absolute child's `offsetParent` is the port, and `overscroll-behavior` contains | **not the port; `auto`** |

These are the registry's invariants (`REG:1111-1112`): a motion's first and last geometry steps are each no larger than its median step; a resting neighbour moves at most ¼ of the inserted height per frame; at rest the painted content's `scrollHeight` equals the reserved box; `<main>` scrollWidth equals clientWidth at 320 on `/motion/handmark`. Planted bites for the wired twins (W-A.3): G1, a style tag giving the Collapsible root `gap: 12px` back; G2, `[data-slot=toast]{translate:none!important}`; G3, `.tw-reserve::after{content:none}` over the cured spacer; G5, `.fading-scroll{position:static}`. Each must redden its gate on its own assertion.

## 6 · π and DELTA obligations

- **Collapsible (G1):** `/containers/collapsible`, the first specimen, light and dark: a frame strip of the open and of the close (every 16 ms for 400 ms), cropped to the ShowcaseFrame. HEAD shows the 12 px jump on the first open frame and the last close frame (`audit/captures/R3-01/strip-collapsible-open-gap-snap.png`, `strip-collapsible-close-gap-snap.png`); the wave shows none.
- **Toast (G2):** `/feedback/toast`, two inserts, light and dark, 1440×900 and 390×844: a strip of the resting toast from the second click to +500 ms (HEAD: `audit/captures/R3-01/strip-toast-stack-jump.png`).
- **Typewriter (G3):** `/motion/text-motion` Typewriter member, 1280 and 390, light and dark, a still at rest: HEAD shows the CLI line resting wrapped with the cursor on a second line outside the box (`audit/captures/R3-01/typewriter-cli-line-light-1280.png`).
- **HandMark (G4):** `/motion/handmark` at 320×640 and under WCAG 1.4.12 spacing (R4-02: 79 px pan), a still scrolled to the right edge.
- **FadingScroll (G5):** the keyframes shortcuts dialog is the consumer witness (UIA-KF-016); in the library, `/navigation/carousel`'s fading port with an absolute child, one still.
- **Engines:** Chromium measured. Playwright WebKit: the demo routes crash it (W-F.1 §2); the wave records each WebKit cell as a crash or a reading. Real Safari: UNMEASURED (OW-3).

## 7 · MIGRATION rows

| removed or changed | replacement |
|---|---|
| a `gap` on the `Collapsible` root as the trigger-to-content spacing | `--collapsible-gap` on the root (the body's `padding-block-start`) |
| the Toaster viewport as a flex stack of toasts in flow | an absolutely positioned stack whose offsets the toast store computes; a consumer styling the viewport's `flex-direction` or `gap` uses W-E.5's stack-gap token |
| `.fading-scroll` computed `position: static` | `position: relative; overscroll-behavior: contain`. A consumer that positioned an absolute child of a fading port against an outer ancestor re-anchors it |

## 8 · Dependencies

PLAN §5, the one record of edges (this wave builds on the re-targeting disclosure engine and the toast store). The dock's crossfade extent is W-I.1's (loop D2); nothing here pre-empts it.

## 9 · Ledger rows it closes

F-76 (all four members); UIA-KF-016; UIA-F-225's body-wrapper clause (its icon-rotation clause stays with F-65, W-C.5).

## 10 · Gestalt passes (P-1)

- **Tranche fit:** every moving surface now reserves and animates the box it occupies; W-K.7's arrival and W-K.10's text-once read these boxes.
- **Wave:** F4-G1..G5 green in one run.
- **Feature:** the Collapsible opens with no first-frame jump, a toast insert slides the stack, the typewriter rests on one line, a wrapped HandMark leaves the page unscrolled, each captured.

## Appendix A · `f4.mjs` (lands as `tests-visual/wired/extent-owned.spec.ts`; `lib.mjs` is W-F.2 appendix D)

```js
// W-F.4 born-RED probe: the moving box owns every layout contribution it changes (F-76).
// node f4.mjs [--only G1,...] [--eng webkit]
import { open, reporter, sleep } from './lib.mjs';
const only = process.argv.includes('--only') ? process.argv[process.argv.indexOf('--only') + 1].split(',') : null;
const want = (g) => !only || only.includes(g);
const R = reporter('f4');
// G1 — Collapsible in a gap-3 grid: the parent's first open step and last close step are each <= the median step
if (want('G1')) for (const theme of ['light', 'dark']) {
  const { browser, page } = await open('/containers/collapsible', { theme });
  const r = await page.evaluate(async () => {
    const t = document.querySelector('main button[data-slot$="-trigger"]'); t.scrollIntoView({ block: 'center', behavior: 'instant' });
    if (t.getAttribute('aria-expanded') === 'true') { t.click(); await new Promise((r) => setTimeout(r, 900)); }
    const box = t.closest('[data-slot=collapsible]') || t.parentElement; const parent = box.parentElement;
    const run = async () => { const hs = []; let on = true; (function f() { if (!on) return; hs.push(parent.getBoundingClientRect().height); requestAnimationFrame(f); })(); t.click(); await new Promise((r) => setTimeout(r, 900)); on = false; return hs; };
    const open = await run(); const close = await run();
    const mv = (hs) => { const st = hs.slice(1).map((x, i) => Math.abs(x - hs[i])).filter((s) => s > 0.05); return st; };
    const o = mv(open), c = mv(close);
    const med = (a) => { const s = [...a].sort((x, y) => x - y); return s[Math.floor(s.length / 2)] || 0; };
    return { parentGap: getComputedStyle(parent).rowGap, openFirst: +(o[0] || 0).toFixed(2), openMedian: +med(o).toFixed(2), closeLast: +(c.at(-1) || 0).toFixed(2), closeMedian: +med(c).toFixed(2) };
  });
  R.row(`F4-G1 ${theme}: Collapsible first open step <= median and last close step <= median`, r.openFirst <= r.openMedian && r.closeLast <= r.closeMedian, r);
  await browser.close();
}
// G2 — a toast insert moves the resting toast at most 1/4 of the inserted height per frame
if (want('G2')) for (const theme of ['light', 'dark']) {
  const { browser, page } = await open('/feedback/toast', { theme });
  const r = await page.evaluate(async () => {
    const btn = [...document.querySelectorAll('main button')].find((b) => b.textContent.trim() === 'Default');
    btn.click(); await new Promise((r) => setTimeout(r, 1200));
    const first = [...document.querySelectorAll('[data-slot=toast]')].filter((e) => e.getBoundingClientRect().height > 20)[0];
    if (!first) return { error: 'no toast' };
    const ys = []; let on = true; (function f() { if (!on) return; ys.push(first.getBoundingClientRect().top); requestAnimationFrame(f); })();
    btn.click(); await new Promise((r) => setTimeout(r, 1200)); on = false;
    const st = ys.slice(1).map((y, i) => Math.abs(y - ys[i]));
    return { restingToastHeight: +first.getBoundingClientRect().height.toFixed(1), maxStep: +Math.max(0, ...st).toFixed(1), totalMove: +Math.abs(ys.at(-1) - ys[0]).toFixed(1), slot: first.getAttribute('data-slot') };
  });
  R.row(`F4-G2 ${theme}: resting toast moves <= 1/4 of its height per frame on an insert`, !r.error && r.maxStep <= r.restingToastHeight / 4, r);
  await browser.close();
}
// G3 — typewriter: at rest, the visible layer's scrollHeight equals the reserved box for every line, at 390 and 1280
if (want('G3')) for (const w of [1280, 390]) {
  const { browser, page } = await open('/motion/text-motion', { w, h: 900 });
  await page.locator('main [role=tab], main .segmented-tab', { hasText: 'Typewriter' }).first().click().catch(() => {});
  await sleep(6000);
  const r = await page.evaluate(() => [...document.querySelectorAll('.tw-visual')].map((v) => { const host = v.parentElement; return { text: v.textContent.trim().slice(0, 24), box: +host.getBoundingClientRect().height.toFixed(1), visible: v.scrollHeight }; }));
  const bad = r.filter((x) => x.visible > x.box + 1);
  R.row(`F4-G3 ${w}: every typewriter line's visible scrollHeight <= its reserved box (+1 px)`, r.length > 0 && bad.length === 0, { lines: r.length, overflowing: bad });
  await browser.close();
}
// G4 — HandMark: a wrapped mark's frames sit at their own fragments; <main> does not pan at 320
if (want('G4')) for (const theme of ['light']) {
  const { browser, page } = await open('/motion/handmark', { w: 320, h: 640, theme });
  const r = await page.evaluate(() => { const m = document.querySelector('main'); return { scrollWidth: m.scrollWidth, clientWidth: m.clientWidth }; });
  R.row('F4-G4 320x640: main scrollWidth == clientWidth on /motion/handmark', r.scrollWidth <= r.clientWidth, r);
  await browser.close();
}
// G5 — FadingScroll is the containing block of its own absolute layers (UIA-KF-016)
if (want('G5')) {
  const { browser, page } = await open('/navigation/carousel');
  const r = await page.evaluate(() => { const f = document.querySelector('.fading-scroll'); if (!f) return { error: 'no fading-scroll' }; const probe = document.createElement('div'); probe.style.cssText = 'position:absolute;inset:0'; f.appendChild(probe); const own = probe.offsetParent === f; probe.remove(); const cs = getComputedStyle(f); return { offsetParentIsPort: own, position: cs.position, contain: cs.contain, overscroll: cs.overscrollBehavior }; });
  R.row('F4-G5 an absolute child of .fading-scroll resolves to the port, and the port contains its overscroll', !r.error && r.offsetParentIsPort && /contain/.test(r.overscroll), r);
  await browser.close();
}
R.done();
```

# W-E.4 · the overlay layer contract: z, edge, dismissal, host, outside, block ceilings, one cast · 11.0.0

| field | value |
|---|---|
| seat | band-E wave-spec seat, formation (relaunch 2026-09-25) |
| model | `claude-opus-5-5`, asserted from own system identity |
| HEAD | `4d2e3123` (`src`/`demo` identical to `f3ad78d0`), scratch worktree; probes drive the band-E fixture app (W-E.1 appendix B) on the packed build |
| ships in | 11.0.0 |
| families | F-22 remainder (#89 residue; O-74's F-22 rows; G-38 LOCKED-DISMISS from the W-A.2 roster; the W-B.4 fold B4-G4 "an open floating plate computes one cast"; the W-B.2 fold UIA-F-77 Popover content-fit width) |
| depends on | PLAN §5, the one record of edges |
| dependants | PLAN §5 (its inverse) |

## 1 · What it closes

| id | what |
|---|---|
| F-22 z | a Tooltip opened inside a Popover or Dialog paints under its host (both at z 120) |
| F-22 dismissal | a consumed Escape reaches the app's global Escape shortcut; one Escape inside a Dialog closes the Select and the Dialog |
| F-22 host | inside a native `showModal()` dialog, every overlay portals to `body` and is inert under the top layer; inside an expanded ExpandableContainer, Popover and Tooltip are not hit-testable |
| F-22 outside | with a Select open, a DockControl click still fires; a non-modal Sheet closes on a dock tap; a native `[popover]` above a Dialog is dead and the Dialog closes; a framed Popover stays open after a click in the embedding page |
| F-22 ceilings | Popover, Dialog and menu have no block ceiling that fits a landscape phone |
| F-22 edge | at 390 a Popover or menu opened from an edge trigger touches the viewport edge |
| B4-G4 | Popover and menu compute 2 outer casts, Select 5 |
| UIA-F-77 | a Popover with a 12-character body is 336 px wide |
| #89 residue | SelectContent composes its plate by hand instead of the overlay content seam |
| `--z-fullscreen` | declared (`tokens/scheme-motion.css:213`), bridged (`theme/bridges.css:275`), read by nothing |
| G-38 | `dismiss="locked"` holds (hold line) |
| the F-22 mechanism rows | the `[M]` rows the LEDGER places here, each on the gate §5's table names |

## 2 · The defect at HEAD

Measured with appendix A (`node e4.mjs`). Chromium: **33 rows, 30 FAIL** (the first run read 31 rows and 28 FAIL with a single G9 row; G9 was then re-run as three rows, all FAIL). Load 58.7 → 51.0. Playwright WebKit (`--eng webkit`): **30 rows, 27 FAIL** with the same readings, except that G4 `sel` and G8 menu-left pass there as in Chromium, and G6 and G10 crash the page (the known Playwright WebKit crash on scenes mounting GlassDock). G13 passes on both.

| gate | HEAD reading | source |
|---|---|---|
| G1 tooltip over its host | hit at the tooltip's centre is `host` in a Popover and in a Dialog; tooltip z 120 | `tokens/scheme-motion.css:210-214` z rungs are absolute per role; the Popover (`z-popover`) and the tooltip share 120 |
| G2 Escape consumed | `__esc` = 1 after one Escape on `sel`, `pop`, `menu`, `dialog`, `dsel`; on `dsel` one Escape also closes the Dialog (`dlg: false`) | reka's Escape handling does not `preventDefault`; `useKeyboardShortcuts.ts:298` already honours `defaultPrevented` |
| G3 native modal host | 0 of 5 overlays (Select, Popover, menu, Tooltip, Dialog) are inside the host or hit-testable | 0 Portals pass `to`; content goes to `body`, under the top layer |
| G4 ExpandableContainer host | Select passes; Popover hit `null`; Tooltip hit `seltrig` | the expanded container is `z-modal` above `z-popover` |
| G5 Escape inside ExpandableContainer | one Escape on the open Select collapses the container too (`ec: false`) | `ExpandableContainer.vue:213` registers a global Escape shortcut, the only in-library Escape registrant |
| G6 outside inert | a DockControl click under an open Select fires (`__clicks` 1); no ancestor is `inert` | |
| G7a Popover ceiling, 844×390 | 14 rows span top 200 to bottom 1311 and do not scroll | no block ceiling on the `panel` role |
| G7b Dialog ceiling | plate −127..517 at 844×390, −217..427 at 844×210; title off-screen; no scroll | `DialogContent.vue:183` caps only under `props.scroll` |
| G7c menu ceiling, 844×390 | 234 px tall against 338 available, 728 px of content, no fade mask | `--overlay-max-block: min(24rem, 60dvh)` at `tokens/offsets.css:82` |
| G8 edge clearance at 390 | Popover left edge `l = 0`, right edge `r = 390`; menu from the right `r = 390`; menu from the left passes (`l = 8`) | no `collisionPadding` on Popover or menu |
| G9 one cast | outer casts, not counting inset rims or the 0-offset hairline: Popover 2, menu 2, Select 5 (raw layers 6, 6, 9) | the plate stack in `glass/overlay-plate.css` plus SelectContent's own `glass-floating` |
| G10 non-modal Sheet and dock chrome | a touch tap and a mouse click on a DockControl close a non-modal detented Sheet | outside-press treats dock chrome as outside |
| G11 native `[popover]` over a Dialog | a click on the popover's button fires 0 times, and the Dialog closes | the Dialog's outside-press and body `pointer-events` lock cover the top-layer popover |
| G12 frame blur | a click in the embedding page leaves the framed Popover open | no `window` `blur` dismissal |
| G13 G-38 (hold line) | `dismiss="locked"` survives Escape and an outside press: PASS | |
| UIA-F-77 | the G3 `pop` cell reads a 336 px plate for the body "Popover body" | `.glass-overlay-plate[data-reveal="overlay"]{inline-size:min(21rem, …)}` at `glass/overlay-plate.css:88-90` |

## 3 · The cure

The contract lives in one module, `src/components/_shared/overlay/layer.ts`, read by the content seam (`overlayContentAttrs` in `_shared/overlay/content.ts`) that Popover, DropdownMenu (and SubContent), Tooltip and, after this wave, SelectContent and DialogContent compose.

1. **One layer stack.** Every open overlay registers a layer when it opens and unregisters it when it closes: Popover, menu, Select, Tooltip, Dialog, Sheet, ExpandableContainer's expanded state, the Toaster viewport (W-E.5), and a native `[popover]` or `dialog` observed through a document `beforetoggle`/`toggle` listener. A layer carries `{ modal, dismiss, host, z }`. The stack order is the open order.
2. **A host-relative z.** A layer's z is `max(role rung, parent layer z + 1)`, where the parent is the layer whose content contains the trigger. It is passed by `provide`/`inject`, because the content is portaled and CSS inheritance cannot carry it. It is written inline as `z-index` on the content. The role rungs (`ROLE_Z`, W-0.4) stay the floor. A Tooltip in a Popover computes 121.
3. **The host is resolved from the trigger.** The portal `to` is the nearest ancestor of the trigger that is an open `dialog:modal`, an open `[popover]`, or an expanded ExpandableContainer; otherwise `body`. Content inside a top-layer host is in the top layer with it. `--z-fullscreen` and its bridge `--z-index-fullscreen` are deleted: the expanded container is a host, not a rung.
4. **Dismissal.** One capture-phase `keydown` listener on `window` handles Escape for the whole stack. With a non-empty stack it closes the top layer (unless its `dismiss` is `locked`) and calls `preventDefault()`, so the shortcut registry skips it. The listener is ExpandableContainer's Escape too; its `registerShortcut("Escape", …)` at `ExpandableContainer.vue:213` is deleted. `useModalShortcutBarrier` (`_shared/overlay/shortcuts.ts`) is deleted with its three callers: the stack is the barrier. An outside press is judged by stack order, so a press inside any higher layer, including a native top-layer popover, is never outside.
5. **Outside.** While a modal layer is open, the top-level siblings of its portal root carry `inert`, replacing reka's `pointer-events: none` body lock and `aria-hidden` sweep, and the stack's higher layers are exempt. A non-modal layer leaves the outside live. It does not dismiss on a press inside a region registered as tethered chrome: GlassDock registers its root, so a dock tap acts and the Sheet stays. Every non-modal layer closes on `window` `blur` when the document has lost focus (the press landed outside the frame).
6. **Block ceilings.** Every popper role reads `max-block-size: min(var(--overlay-max-block), var(--reka-popper-available-height))` and scrolls in its fading scroll port. `--overlay-max-block` becomes `24rem`, not `min(24rem, 60dvh)`: the available height is the viewport term. The Dialog is capped at `calc(100dvh - 2 * max(var(--overlay-pad), var(--safe-block-start), var(--safe-block-end)))` and scrolls its body by default. The `scroll` prop is deleted.
7. **The edge.** The seam's `collisionPadding` (W-E.1) is `max(8px, token)` per side. 8 px is the clearance, one number for every popper.
8. **One cast.** `glass/overlay-plate.css` writes the plate's `box-shadow` once: the inset rim layers, the 0-offset hairline and one outer cast, `var(--shadow-plate)` (W-C.4's role shadow). SelectContent drops `glass-floating`, `rounded-card`, `overflow-hidden` and its own z class, and composes `overlayContentAttrs({ role: "menu", slot: "select-content" })` (#89 residue). The side-translate utilities are already gone in W-E.2.
9. **Content-fit width (UIA-F-77).** The panel role sizes to its content: `inline-size: max-content; max-inline-size: min(21rem, calc(100dvw - 2 * var(--overlay-pad)))`.
10. **G-38 stays a hold line.** Its R2-05 bites are B12 (rename `@escape-key-down="refuse"` in `DialogContent.vue`) and B13 (drop the `@pointer-down-outside` guard). The stack reads `dismiss: "locked"` from the Dialog, so the bite path becomes the stack's `locked` check. The roster's bite patch is re-pointed to that line.
11. **On-scale z and offsets (UIA-V-676, UIA-F-219).** `--z-toggle` takes a rung of the z scale in `tokens/scheme-motion.css`, not `999`. The content seam passes one side offset, read from a token in `tokens/offsets.css`, to every popper, so no component passes a literal `sideOffset` (fix-14: E4-G19's cure, which §3 did not state).

## 4 · Files it touches

`src/components/_shared/overlay/` (`layer.ts` new; `content.ts`, `placement.ts`, `index.ts`; `shortcuts.ts` deleted), `src/components/popover/PopoverContent.vue`, `src/components/menu/DropdownMenuContent.vue`, `DropdownMenuSubContent.vue`, `src/components/tooltip/TooltipContent.vue`, `src/components/select/SelectContent.vue`, `src/components/dialog/DialogContent.vue`, `src/components/sheet/SheetContent.vue`, `src/components/expandable-container/ExpandableContainer.vue`, `src/components/dock/` (tethered-chrome registration), `src/styles/glass/overlay-plate.css`, `src/styles/tokens/offsets.css`, `src/styles/tokens/scheme-motion.css`, `src/styles/theme/bridges.css`. New: `tests-visual/wired/overlay-layer.spec.ts` (appendix A). The G-38 roster entry's bite patch is updated.

## 5 · Acceptance gates

| id | gate | passes when | HEAD reading |
|---|---|---|---|
| E4-G1 · z | appendix A G1 | tooltip hit = content, over Popover and Dialog | **2 of 2 FAIL** (hit `host`) |
| E4-G2 · Escape consumed | appendix A G2 | `__esc` 0 on 5 overlays; on `dsel` the Dialog stays open | **5 of 5 FAIL** (`__esc` 1; `dsel` closes both) |
| E4-G3 · native host | appendix A G3 | 5 of 5 in host and hit-testable | **0 of 5** |
| E4-G4 · ExpandableContainer host | appendix A G4 | 3 of 3 hit content | **1 of 3** (Popover `null`, Tooltip `seltrig`) |
| E4-G5 · Escape scoped | appendix A G5 | Select closed, container expanded | **FAIL** (`ec: false`) |
| E4-G6 · outside inert | appendix A G6 | `__clicks` 0 | **1** |
| E4-G7 · ceilings | appendix A G7a, G7b (two cells), G7c, plus fix-2's Select cell (scene `mseltall`: 60 rows, 1280×900) | 5 of 5; the Select shows a scroll cue when clipped | **5 of 5 FAIL** (Popover 200..1311; Dialog −127..517 and −217..427; menu 234 of 338, no mask; the Select clips at 108..492 with 0 scroll cues and `mask: none`, both engines) |
| E4-G8 · edge clearance | appendix A G8, plus fix-2's Select cell (scene `msel`: a 120 px trigger 8 px from the right edge at 390, two long captions) | 5 of 5 ≥ 8 px from both inline edges | **4 of 5 FAIL** (appendix A 3 of 4; the Select's right edge at 610.9 of 390, both engines) |
| E4-G9 · one cast | appendix A G9 | ≤ 1 outer cast on Popover, menu, Select | **3 of 3 FAIL** (2, 2, 5) |
| E4-G10 · tethered chrome | appendix A G10, touch and mouse | Sheet open after the dock tap | **2 of 2 FAIL** |
| E4-G11 · higher layer live | appendix A G11 | `__clicks` 1, Dialog open | **FAIL** (0, closed) |
| E4-G12 · frame blur | appendix A G12 | framed Popover closed after the parent click | **FAIL** (still open) |
| E4-G13 · G-38 (hold line) | appendix A G13 | Dialog open | PASS at HEAD; bites B12, B13 make it red |
| E4-G14 · content-fit | the `pop&short=1` cell (see below the appendix): the Popover plate is ≤ its content's `max-content` width + 2 × `--overlay-pad` + 2 px | pass | **336 px** for a 12-character body |
| E4-G15 · static | `! rg -q 'z-fullscreen\|useModalShortcutBarrier\|registerShortcut\("Escape"' src && ! grep -q 'props.scroll' src/components/dialog/DialogContent.vue` | exit 0 | **exit 1** (`scheme-motion.css:213`, `bridges.css:275`, `shortcuts.ts`, `ExpandableContainer.vue:213`, `DialogContent.vue:183`) |
| E4-G16 · dock clearance (UIA-F-137, UIA-KF-131, UIA-V-293) | fix-2's probe scene `mdockmenu`: a DropdownMenu opened from a DockControl in a bottom GlassDock at 1440×900, Chromium (GlassDock crashes Playwright WebKit) | menu bottom ≤ dock top − 8 | **FAIL**: menu bottom 776, dock top 772 (overlap 4) |
| E4-G17 · submenu clears its parent (UIA-V-113) | scene `msub`: an open `DropdownMenuSub` beside its parent | overlap 0 px² | **FAIL**, both engines: 741 px² |
| E4-G18 · the close seat is on top (UIA-F-44) | scene `mclose`: a Dialog with a transparent `position: absolute` 120×120 child at the block-start inline-end corner; `elementFromPoint` at the ✕ centre | the ✕ | **FAIL**, both engines: hit `cover` |
| E4-G19 · no off-scale z and no literal offsets (static; UIA-V-676, UIA-F-219) | `! grep -qE -- '--z-toggle: *999' src/styles/tokens/scheme-motion.css && ! grep -rqE '(sideOffset\|side-offset)["'\'']? *[:=] *["'\'']?[0-9]' src/components` | exit 0 | **exit 1** (fix-13, `3ce80b06`, the span as re-written: 6 lines in 6 files, first `scheme-motion.css:215`; the spellings it is held to are its `formation-audit/sweeps/hold-line-claim.py` CLAIMS entry). Before fix-13: **exit 1**: `scheme-motion.css:215`; `sideOffset` 4, 4, 4, 0, 0 at `TooltipContent.vue:26`, `PopoverContent.vue:39`, `DropdownMenuContent.vue:35`, `DropdownMenuSubContent.vue:20`, `SelectContent.vue:35` |

**The mechanism rows.** Each F-22 row the LEDGER marks `[M]`:

| row | gate or terminal |
|---|---|
| UIA-F-13, UIA-V-676 | E4-G1 (the tooltip over its host) and E4-G19 (`--z-toggle`) |
| UIA-KF-015 | E4-G2 |
| UIA-F-137, UIA-KF-131, UIA-V-293 | E4-G16 |
| UIA-V-113 | E4-G17, with E4-G8 for its edge half |
| UIA-F-44 | E4-G18 |
| UIA-F-219 | E4-G19 |
| UIA-F-56, UIA-KF-113, UIA-V-287, UIA-V-520, UIA-V-2, UIA-V-208, UIA-V-5 | E4-G8 |
| UIA-V-32, UIA-V-220 | E4-G7 |
| A2-KE-L2-1 (the press that opened a non-modal Sheet counted as outside) | E4-G10 (tethered chrome, touch and mouse) |
| A2-VA-L2-1, A2-FO-L2-8 (the Popover role and the modal Dialog have no block ceiling) | E4-G7, with E4-G15's `props.scroll` clause for the Dialog |
| A2-FO-L2-12, A2-KE-L2-12 (`collisionPadding` only on Select) | E4-G8 |
| A2-VA-L2-3, A2-KE-L2-17 (a clipped overlay shows no scroll cue) | E4-G7's scroll-cue clause |
| A2-KE-L1-27 (a press on the library's own toast dismisses an open overlay) | RETIRE NOT-REPRODUCED in the library: fix-3's probe (`formation-audit/fix-3.md` appendix Q2, `?k=` `dialog`, `pop`, `sheet`), a toast with a `ToastAction` over an open Dialog, Popover and Dialog-rooted `SheetContent`, mouse and touch, Chromium and Playwright WebKit: 12 of 12 cells the action fires once and the overlay stays open (`be1969ea`). The consumers' private `data-slot` guards retire in their W-L.7 packets. Re-trigger: a press on a glass toast that dismisses a glass overlay, reproduced without consumer code |
| UIA-V-476 | RETIRE NOT-REPRODUCED: the open list seats the selected row inside the port (scene `mseltall`, value 45: Chromium 322..366 within 108..492; Playwright WebKit 403..447). Re-trigger: a selected row outside the list's port on open |

Can each fail and pass? Every browser row except G4 `sel`, G8 menu-left and G13 fails at HEAD. Those three are the controls that show the gates can pass. G13 is a hold line whose bite is in the roster. G15 and G19 are static and fail at HEAD; G16 to G18 fail in every engine that mounts them.

## 6 · π and DELTA obligations

- **Surfaces:** the fixture scenes `tip`, `esc`, `native`, `ec`, `inert`, `pop&tall`, `dialog`, `menu&tall`, `sheet&modal=0&dock=top`, `pages/g.html`; demo `/overlays/popover`, `/overlays/menu`, `/forms/select`, `/containers/dialog` at 390×844, 844×390 and 1440×900.
- **Themes:** light and dark for G1, G7, G8 and G9 (paint and geometry). Dismissal rows are theme-independent and run light.
- **Engines:** Chromium measured. Playwright WebKit measured, with G6 and G10 crashing its page, recorded as crashes. Real Safari is UNMEASURED (OW-3). The native `showModal` host and `beforetoggle` rows are the cells most likely to differ in real Safari.
- **Paired capture:** `node e4.mjs --shots` at `<E4-base>` and at the wave: `tip-{pop,dialog}-*.png` (tooltip under, then over its host), `ec-pop-*.png`, `pop-tall-*.png`. Also a demo pair of `/containers/dialog` at 844×390 showing the Dialog cut off and then capped and scrolling. The before set is taken at `<E4-base>` with `WAVE=W-E.4`, into `.cache/evidence/W-E.4/e4/`; formation's HEAD shots sat in a session scratchpad and are not evidence.

## 7 · MIGRATION rows

| before | after | note |
|---|---|---|
| `DialogContent` `scroll` prop | removed | every Dialog is capped and scrolls |
| `--z-fullscreen`, `--z-index-fullscreen` | removed | an overlay inside an expanded ExpandableContainer portals into it |
| `useModalShortcutBarrier` (exported from `_shared/overlay`) | removed | the layer stack consumes Escape and `preventDefault`s it; a registry shortcut skips a consumed key |
| overlays portal to `body` | portal to the trigger's nearest top-layer or expanded host | a consumer that styles overlay content by a `body >` selector re-targets it |
| a consumer's own global Escape shortcut fires while an overlay is open | it fires only when no layer consumed the key | |
| `--overlay-max-block: min(24rem, 60dvh)` | `24rem`, intersected with the available height | a tall menu on a landscape phone uses the available room |
| Popover panel fixed at `min(21rem, …)` | content-fit, capped at the same measure | a Popover with a short body is narrower |

## 8 · Ledger rows

Closes #89's residue and O-74's F-22 rows. Closes the F-22 mechanism rows on §5's table (E4-G16 to E4-G19 new, the Select cells in E4-G7 and E4-G8), and records UIA-V-476 as RETIRE NOT-REPRODUCED. Closes B4-G4 (from W-B.4) and UIA-F-77 (from W-B.2). G-38 is bound in the roster with its re-pointed bite.

## 9 · Gestalt passes (P-1)

- **Tranche fit:** one stack owns z, host, dismissal and outside for every overlay, including the toast viewport (W-E.5) and the Sheet (W-E.3). One seam owns the plate.
- **Wave:** E4-G1..G15 green in one run.
- **Feature:** at 844×390, a Dialog holds a Select whose Tooltip is visible over both. Escape closes only the Tooltip, then only the Select, then the Dialog, and the app's shortcut never fires. Recorded as one frame strip with the key log.

## Appendix A · `e4.mjs` (lands as `tests-visual/wired/overlay-layer.spec.ts`)

```js
// W-E.4 born-RED probe: the overlay layer contract (z, edge, dismissal, host, outside, block ceilings, one cast).
// node e4.mjs [--shots] [--eng webkit]
import { open, rectOf, cs, sleep, load, CAP, hit, ENG } from './lib.mjs';
import fs from 'node:fs';
const eng = process.argv.includes('--eng') ? process.argv[process.argv.indexOf('--eng') + 1] : 'chromium';
const cr = eng === 'chromium';
const shots = process.argv.includes('--shots'); fs.mkdirSync(`${CAP}/e4`, { recursive: true });
const out = { eng, load: load(), rows: [] };
const row = (id, pass, reading) => { out.rows.push({ id, pass, reading }); console.log(`${pass ? 'PASS' : 'FAIL'} ${id} ${JSON.stringify(reading)}`); };
const safe = async (label, fn) => { try { await fn(); } catch (e) { row(label, false, { error: String(e.message).split('\n')[0] }); } };
const center = async (page, sel) => { const r = await rectOf(page, sel); if (!r) return { r: null, hit: null }; return { r, hit: await page.evaluate(([x, y, s]) => { const e = document.elementFromPoint(x, y); const c = document.querySelector(s); return e && c && c.contains(e) ? 'content' : (e?.closest('[data-probe]')?.dataset.probe || e?.tagName || null); }, [r.x, r.y, sel]) }; };

// G1 · host-relative z: a tooltip opened inside a Popover and a Dialog paints above its host
for (const ov of ['pop', 'dialog']) await safe(`E4-G1 tooltip over ${ov}`, async () => {
  const { browser, page } = await open({ eng, w: 1024, h: 768, qs: `s=tip&ov=${ov}&auto=${ov === 'pop' ? 'pop' : 'dlg'},tip` });
  await sleep(700);
  const c = await center(page, '[data-probe=tipc]'); const z = await cs(page, '[data-probe=tipc]', ['z-index']);
  row(`E4-G1 tooltip over ${ov}`, c.hit === 'content', { hit: c.hit, tipRect: c.r && [c.r.l, c.r.t, c.r.r, c.r.b], z: z?.['z-index'] });
  if (shots) await page.screenshot({ path: `${CAP}/e4/tip-${ov}-${eng}.png` });
  await browser.close();
});

// G2 · dismissal: a consumed Escape is preventDefaulted, so the app's global Escape shortcut fires 0 times
for (const [ov, auto] of [['sel', 'sel'], ['pop', 'pop'], ['menu', 'menu'], ['dialog', 'dlg'], ['dsel', 'dlg,sel']]) await safe(`E4-G2 escape ${ov}`, async () => {
  const { browser, page } = await open({ eng, w: 1024, h: 768, qs: `s=esc&ov=${ov}&auto=${auto}` });
  await sleep(600);
  await page.keyboard.press('Escape'); await sleep(400);
  const st = await page.evaluate(() => ({ esc: window.__esc, ...window.__state() }));
  const ok = st.esc === 0 && (ov !== 'dsel' || (st.dlg === true && st.sel === false));
  row(`E4-G2 escape ${ov}`, ok, st);
  await browser.close();
});

// G3 · host: inside a showModal() dialog each overlay is a descendant of the host and hit-testable at its centre
for (const [ov, auto] of [['sel', 'sel'], ['pop', 'pop'], ['menu', 'menu'], ['tip', 'tip'], ['dialog', 'dlg']]) await safe(`E4-G3 native host ${ov}`, async () => {
  const { browser, page } = await open({ eng, w: 1024, h: 768, qs: `s=native&ov=${ov}&auto=${auto}` });
  await sleep(700);
  const m = await page.evaluate(() => { const c = document.querySelector('[data-probe=ovc]'); const host = document.querySelector('[data-probe=native]'); if (!c) return { mounted: false }; const r = c.getBoundingClientRect(); const e = document.elementFromPoint(r.left + r.width / 2, r.top + r.height / 2); return { mounted: true, inHost: host.contains(c), hit: !!(e && c.contains(e)), rect: [r.left, r.top, r.width, r.height].map((v) => +v.toFixed(0)) }; });
  row(`E4-G3 native host ${ov}`, m.mounted && m.inHost && m.hit, m);
  await browser.close();
});

// G4 · host: inside an expanded ExpandableContainer (z-modal) each overlay is hit-testable at its centre
for (const [ov, auto, sel] of [['sel', 'ec,sel', '[data-probe=selc]'], ['pop', 'ec,pop', '[data-probe=popc]'], ['tip', 'ec,tip', '[data-probe=tipc]']]) await safe(`E4-G4 expandable host ${ov}`, async () => {
  const { browser, page } = await open({ eng, w: 1024, h: 768, qs: `s=ec&auto=${auto}` });
  await sleep(800);
  const c = await center(page, sel);
  row(`E4-G4 expandable host ${ov}`, c.hit === 'content', { hit: c.hit });
  if (shots && ov === 'pop') await page.screenshot({ path: `${CAP}/e4/ec-pop-${eng}.png` });
  await browser.close();
});

// G5 · dismissal: Escape on a Select inside an expanded ExpandableContainer closes the Select and leaves the container expanded
await safe('E4-G5 escape inside expandable', async () => {
  const { browser, page } = await open({ eng, w: 1024, h: 768, qs: 's=ec&auto=ec,sel' });
  await sleep(800); await page.keyboard.press('Escape'); await sleep(500);
  const st = await page.evaluate(() => window.__state());
  row('E4-G5 escape inside expandable', st.sel === false && st.ec === true, st);
  await browser.close();
});

// G6 · outside: with a Select open, a click on a DockControl fires nothing
await safe('E4-G6 outside inert', async () => {
  const { browser, page } = await open({ eng, w: 1024, h: 768, qs: 's=inert&dock=bottom&auto=sel' });
  await sleep(700);
  const d = await rectOf(page, '[data-probe=dc2]');
  await page.mouse.click(d.x, d.y); await sleep(400);
  const st = await page.evaluate(() => ({ clicks: window.__clicks, inert: document.querySelector('[data-probe=dock]')?.closest('[inert]') ? true : false }));
  row('E4-G6 outside inert', st.clicks === 0, st);
  await browser.close();
});

// G7 · block ceilings at 844×390: a 14-row Popover lies within the viewport and scrolls; an 8-field Dialog's title and action are reachable; a 16-item menu uses the available height
await safe('E4-G7 popover ceiling', async () => {
  const { browser, page } = await open({ eng, w: 844, h: 390, qs: 's=pop&tall=1&edge=mid&auto=pop' });
  await sleep(700);
  const m = await page.evaluate(() => { const c = document.querySelector('[data-probe=popc]'); const r = c.getBoundingClientRect(); const sc = [c, ...c.querySelectorAll('*')].some((e) => e.scrollHeight > e.clientHeight + 1 && /(auto|scroll)/.test(getComputedStyle(e).overflowY)); return { top: +r.top.toFixed(0), bottom: +r.bottom.toFixed(0), scrolls: sc }; });
  row('E4-G7a popover ceiling 844x390', m.top >= 0 && m.bottom <= 390 && m.scrolls, m);
  if (shots) await page.screenshot({ path: `${CAP}/e4/pop-tall-${eng}.png` });
  await browser.close();
});
await safe('E4-G7b dialog ceiling', async () => {
  for (const [w, h] of [[844, 390], [844, 210]]) {
    const { browser, page } = await open({ eng, w, h, qs: 's=dialog&auto=dlg' });
    await sleep(700);
    const m = await page.evaluate((h) => { const d = document.querySelector('[data-probe=dialog]'); const r = d.getBoundingClientRect(); const t = document.querySelector('[data-probe=dtitle]').getBoundingClientRect(); const a = document.querySelector('[data-probe=action]').getBoundingClientRect(); const scrolls = d.scrollHeight > d.clientHeight + 1 && /(auto|scroll)/.test(getComputedStyle(d).overflowY); return { plate: [+r.top.toFixed(0), +r.bottom.toFixed(0)], titleTop: +t.top.toFixed(0), actionBottom: +a.bottom.toFixed(0), scrolls, inView: r.top >= 0 && r.bottom <= h }; }, h);
    row(`E4-G7b dialog ceiling ${w}x${h}`, m.inView && (m.scrolls || (m.titleTop >= 0 && m.actionBottom <= h)), m);
    await browser.close();
  }
});
await safe('E4-G7c menu ceiling', async () => {
  const { browser, page } = await open({ eng, w: 844, h: 390, qs: 's=menu&tall=1&edge=top&auto=menu' });
  await sleep(700);
  const m = await page.evaluate(() => { const c = document.querySelector('[data-probe=menuc]'); const r = c.getBoundingClientRect(); const avail = parseFloat(getComputedStyle(c).getPropertyValue('--reka-dropdown-menu-content-available-height') || getComputedStyle(c.parentElement).getPropertyValue('--reka-popper-available-height')); return { h: +r.height.toFixed(0), avail: +avail.toFixed(0), sh: c.scrollHeight, mask: getComputedStyle(c).maskImage || getComputedStyle(c).webkitMaskImage }; });
  row('E4-G7c menu ceiling 844x390', m.h >= Math.min(384, m.avail) - 1 && m.mask && m.mask !== 'none', m);
  await browser.close();
});

// G8 · edge: at 390 a Popover and a DropdownMenu opened from an edge trigger keep a clearance ≥ 8 px from both inline edges
for (const [kind, sel] of [['pop', '[data-probe=popc]'], ['menu', '[data-probe=menuc]']]) for (const edge of ['left', 'right']) await safe(`E4-G8 ${kind} ${edge}`, async () => {
  const { browser, page } = await open({ eng, w: 390, h: 844, touch: true, mobile: cr, qs: `s=${kind}&edge=${edge}&auto=${kind}` });
  await sleep(700);
  const r = await rectOf(page, sel);
  row(`E4-G8 ${kind} 390 ${edge}`, r.l >= 8 && r.r <= 390 - 8, { l: r.l, r: r.r });
  await browser.close();
});

// G9 · one cast: an open floating plate computes one outer cast (W-B.4 B4-G4). Inset rim layers and the zero-offset,
// zero-blur hairline are the rim, not a cast. Popover, menu and Select listbox.
for (const [kind, qs, sel] of [['popover', 's=pop&edge=mid&auto=pop', '[data-probe=popc]'], ['menu', 's=menu&edge=mid&auto=menu', '[data-probe=menuc]'], ['select', 's=selslide&auto=sel', '[data-probe=selc]']]) await safe(`E4-G9 one cast ${kind}`, async () => {
  const { browser, page } = await open({ eng, w: 1024, h: 768, qs });
  await sleep(700);
  const n = await page.evaluate((sel) => { const bs = getComputedStyle(document.querySelector(sel)).boxShadow; const parts = []; let d = 0, cur = ''; for (const ch of bs) { if (ch === '(') d++; if (ch === ')') d--; if (ch === ',' && d === 0) { parts.push(cur.trim()); cur = ''; } else cur += ch; } parts.push(cur.trim()); const casts = parts.filter((p) => !/\binset\b/.test(p) && !/\b0px 0px 0px [\d.]+px$/.test(p.replace(/^(color\([^)]*\)|oklch\([^)]*\)|oklab\([^)]*\)|rgba?\([^)]*\))\s*/, '').trim())); return { total: parts.length, casts: casts.length }; }, sel);
  row(`E4-G9 one cast ${kind}`, n.casts <= 1, n);
  await browser.close();
});

// G10 · dismissal: a tap and a click on dock chrome leave a non-modal detented Sheet open (dock tethered to the layer's branch)
for (const kind of cr ? ['touch', 'mouse'] : ['mouse']) await safe(`E4-G10 nm sheet ${kind}`, async () => {
  const { browser, page } = await open({ eng, w: 390, h: 844, touch: kind === 'touch', mobile: kind === 'touch' && cr, qs: 's=sheet&inj=fixed&side=bottom&det=0.12,0.36,1&d=0.36&modal=0&dock=top&auto=sheet' });
  await sleep(900);
  const d = await rectOf(page, '[data-probe=dc3]');
  if (kind === 'touch') await page.touchscreen.tap(d.x, d.y); else await page.mouse.click(d.x, d.y);
  await sleep(600);
  const st = await page.evaluate(() => window.__state());
  row(`E4-G10 nm sheet stays open, ${kind}`, st.open === true, st);
  await browser.close();
});

// G11 · outside, the other direction: a native [popover] above a glass Dialog activates on click and the Dialog stays open
await safe('E4-G11 native popover over dialog', async () => {
  const { browser, page } = await open({ eng, w: 1024, h: 768, qs: 's=dialog&auto=dlg' });
  await sleep(600);
  await page.evaluate(() => document.querySelector('[data-probe=npop]').showPopover()); await sleep(200);
  const b = await rectOf(page, '[data-probe=npopbtn]'); await page.mouse.click(b.x, b.y); await sleep(400);
  const st = await page.evaluate(() => ({ clicks: window.__clicks, dlg: window.__state().dlg }));
  row('E4-G11 native popover over dialog', st.clicks === 1 && st.dlg === true, st);
  await browser.close();
});

// G12 · dismissal crosses the frame edge: after a click in the embedding page the framed Popover is closed
await safe('E4-G12 frame blur', async () => {
  const browser = await ENG[eng].launch(); const ctx = await browser.newContext({ viewport: { width: 900, height: 700 } }); const page = await ctx.newPage();
  await page.goto('http://localhost:5874/pages/g.html');
  const f = page.frames().find((x) => x.url().includes('e.html')) || (await (async () => { await sleep(1500); return page.frames().find((x) => x.url().includes('e.html')); })());
  await f.waitForFunction(() => window.__ready); await sleep(700);
  const before = await f.evaluate(() => window.__state().pop);
  await page.click('#outside'); await sleep(600);
  const after = await f.evaluate(() => window.__state().pop);
  row('E4-G12 frame blur closes the framed popover', before === true && after === false, { before, after });
  await browser.close();
});

// G13 · G-38 LOCKED-DISMISS (hold line): dismiss="locked" survives Escape and an outside press
await safe('E4-G13 locked dismiss', async () => {
  const { browser, page } = await open({ eng, w: 1024, h: 768, qs: 's=dialog&auto=dlg&dismiss=locked' });
  await sleep(600); await page.keyboard.press('Escape'); await sleep(300); await page.mouse.click(5, 5); await sleep(400);
  const st = await page.evaluate(() => window.__state());
  row('E4-G13 locked dismiss (hold line)', st.dlg === true, st);
  await browser.close();
});

out.load2 = load(); fs.writeFileSync(`${CAP}/e4-${eng}.json`, JSON.stringify(out, null, 1));
const fails = out.rows.filter((r) => !r.pass).length; console.log(`e4 ${eng}: ${out.rows.length} rows, ${fails} FAIL · load ${out.load} → ${out.load2}`);
process.exitCode = fails ? 1 : 0;
```

E4-G14 is added to the wired spec from the G3 `pop` cell. The fixture's `pop` scene gains a `short=1` arm whose body is the text "Popover body" alone (the G3 native-host scene's body). The gate opens `s=pop&short=1&edge=mid&auto=pop` and compares the plate's width with the `max-content` width of that text plus the two pads. At HEAD the G3 cell with the same body reads a 336 px plate.

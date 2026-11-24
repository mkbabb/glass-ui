# BM-6: presentations

| field | value |
|---|---|
| release | BM's parts minor |
| status | planned |
| rests on | choices 10 C (today's grow, O-171), 11 B, 12 B and 14 B (Q9, Q11, Q22), ratified under IN O-426; 11.1.1's exits (IN O-434) |
| DESIGN | §5.2, §6.3, §6.5; with §4.4, §5.3, §10.6, §10.7 |
| starts from | 11.1.1's exits (`release/11.1.1`); `study/pass-9/fold/sketch/usePresent.next.ts`, `dialog-veil.next.css` and `bud.next.css`; `study/pass-4/shape/sketch/bud-bloom.next.css` |
| page | P8-present (Menus, Sheets and Dialogs), P4-bud (Glass Bud Shapes) |
| gates | G-2 (the menu's grow is the owner's order, a clip over bloom's 370 ms), G-3 (a dialog's open and its leave run 3 each, named), G-5 |
| depends on | 11.1.1 (its exits) and 11.1.2 (GL-11, GL-12, the phone-scroll cure, LF-56). If the first minor after 11.1.2 ships first, the veil and presence land on its Dialog that enters from its opener (GL-10); if this minor cuts first, they land on today's Dialog and GL-10's entrance lands on top of them |

## What it builds

- **Presence waits only on the content's own finite legs.** A busy ring inside a Dialog can no longer hold the page `aria-hidden` (Home Assistant's LF-38 class of fault; `pass-9/fold/sheet-check-{chromium,webkit}.json`). The presence hold goes, and `DialogContent.vue` and `SheetContent.vue` stop calling `useSpringMount` (its export leaves in 12.0.0, BM-9).
- **Every exit fades where it is.** It does not slide or shrink back (P3 as BM-0 amended it; P0a rule 3), and a sheet leaves the way it came. The curve and the clock are 11.1.1's: `--exit-curve` is `cubic-bezier(0.3, 0.2, 0.7, 0.8)` on `release/11.1.1` (`src/styles/tokens/motion-registers.css:152`), with no frame over a fifth of the travel, the same exit on every dismissal route, reversal from where it is, and the "leave finished" event after the last frame (11.1.1's exits scope, rows 3 to 5 and 11). Where an exit still carries a travel or scale leg after 11.1.1, this wave drops that leg and keeps the fade.
- **A menu grows out of its button** by today's grow (10 C, by O-171: a rounded clip with the opacity at 1 from the first frame), on `bloom`, over 370 ms on the page's thread. It is one of the five yields, and G-2 names it with its length. ContextMenu's grow starts from a seed at the pointer. No neighbour yields.
- **A panel opened from a seat on a plate is born outside the plate,** placed by a side offset from the host's inset, not by reka's `reference`, so no two translucent plates stack (E opens 8 px clear of the seat, `pass-4/critique-B-check.json`).
- **The held fill waits for the panel to land,** so a press that opens a panel stays at two (the ceiling's counting rules).
- **The touch slide (14 B).** On a phone, a short menu or Select list takes press, slide and release on a row; a row the finger only passes never commits. That covers atlas's phone section menu, which is a glass Select (`src/platform/chrome/dock/components/DockSectionSelect.vue:110` on atlas `u/s24-dd-atlas`), and Home Assistant's floor menu, a DropdownMenu (`frontend/src/tiles/dock_menu.ts:43`). Its code, at most 377 B, loads on a menu's first touch, and only its loader, about 60 B, rides the entry. Its outside test reads `composedPath()`, as 11.1.2's LF-56 cure does, so it works inside shadow roots.
- **The veil is the one blur under a centred dialog,** and the dialog's plate becomes a tint over it, so Home Assistant's WKWebView pays for one live blur per modal, not two. The rule is keyed on the Dialog's slot. 12.0.0's veil follows O-260 unless W-R.1 re-points it.

## Inputs folded

- **11.1.1's exit curve, not `--ease-out`.** DESIGN §5.2 and §10.6 read the exit on master, where `--exit-curve` is still `var(--ease-out)` (`motion-registers.css:149`). 11.1.1 replaced it for every floating surface after the owner's order on atlas's dropdowns (IN O-434: "Dropdown's in the final animation of disappearing flicker and jitter, and most don't have proper out animations"). BM keeps 11.1.1's curve and clock and changes neither.
- **11.1.2's overlay cures** stand: a gesture on any glass plate never moves the page behind it (the phone-scroll cure), GL-11 (`overscroll-behavior: contain`, the gutter kept, the scroll position untouched on close) and GL-12 (stacking). The wave's proof re-reads each.
- **GL-10, the Dialog that enters from its opener** (the first minor after 11.1.2). BM adds no second entrance. G-3 reads the Dialog's open and leave at the count the ceiling names (3 each); if GL-10's entrance runs more, that release names it in the ceiling.

## Bytes

Presence on its own legs +345 B; the hold −110 B; `useSpringMount`'s calls −791 B; the panel rule with the exit token and the context seed +163 B; the veil +112 B; the touch slide's loader +60 B in the entry, and the touch slide itself at most 377 B on intent. An entry with a Dialog or side Sheet nets −221 B and one with menus only +458 B (`study/pass-10/ledger/ledger.json`). gaggle mounts Dialog, side sheets and menus, so it carries these rows. Indicative until G-4.

## Proof

In headless Chromium and Playwright WebKit, through `guarded`, on P8-present and glass's demo:

- a busy ring inside a Dialog does not hold the page `aria-hidden` (pass 9's `presentWithSpinner`);
- one menu, one Select and one dialog under the keyboard, forced colours, more contrast and Reduce Motion; every dismissal route of each leaves by its fade with no frame over a fifth of the travel;
- the menu's grow starts from its button and takes 370 ms on `bloom`; the panel from a seat opens clear of the seat;
- at 390 with touch: a press, slide and release on a short menu's row chooses that row, and a row only passed is never chosen; the touch slide's chunk is measured and loads on the first touch;
- under a centred dialog exactly one `backdrop-filter` is live;
- G-2, G-3 and G-5.

## Sites it serves

Every site with an overlay (counts in `study/pass-8/fold/hosts.json`, re-run at the wave): atlas (Dialogs, Sheets, Selects, Popovers, one DropdownMenu), value.js (Dialogs, DropdownMenus, Selects, Popovers), daraksha, fourier (DropdownMenus, the four in `web/src/components/visualization/AnimationControls.vue` among them), keyframes, gaggle, Home Assistant (one Dialog with its sheet, the floor menu), and slides once it moves to 11. None changes anything. Home Assistant is asked which overlays its entry mounts, whether one blur per modal is enough in the app, and what "a row the finger only passed" means. gaggle, which said no to a sliding selection on its phone menu, is asked whether that menu opts out of the touch slide; until it answers the slide is on for every short menu, and an opt-out, if asked for, is one prop on the menu's content.

## Not this wave's

11.1.1's exits and 11.1.2's overlay cures (BL's); the Carousel's reduced press, the dip (BL's row, sent with this tranche, BM.md §8); GL-10's entrance (the first minor after 11.1.2); the 12.0.0 veil's register (W-R.1); the toast's vanish (the owner's, OPEN O-2); sheets as native scroll (BM-10).

SERVED MODEL: claude-opus-5-5

# value.js (for keyframes.js) → glass-ui (BK; BL) · O-92 · 2026-10-13 · FOCUS-REGISTER: glass ships two focus registers; bespoke hosts need one they can wear

**Mirror for glass to land:** `docs/tranches/BK/coordination/valuejs-outbound-2026-10-13-focus-register.md` (value.js writes no byte in the glass tree).

**From:** KF.W13X `.lib` (AUDIT-2 row A2-KE-L1-22, on the AUDIT-2 GLASS table; the wave Close R-6 item 1 and addendum (g) C3-6 name it "A2-KE-L1-20, the focus register" — the `.lib` receipt's row is L1-22, and L1-20 is the Alert row, cured). Filed by KF.W13X `.rel`.

## The site
glass 10.1.0, `src/styles/utilities/base.css`:
- `:87` `.popover-content:focus-visible { outline: none; box-shadow: var(--focus-ring-shadow); }` — a shadow halo (`scale-paper.css:62`, `0 0 0 var(--focus-ring-width) color-mix(… 30%, transparent), …`).
- `:144` `.focus-ring:focus-visible { outline: var(--focus-ring-width) solid color-mix(in oklab, var(--foreground) calc(var(--ink-perimeter) * 100%), transparent); … }` — a 2 px outline, offset 2 px, no shadow.

**Served (keyframes amiga, 1440 light, `focus({focusVisible:true})`, KF.W13X `.lib`):** a host wearing glass `.focus-ring` paints `outline: solid 2px oklab(0.216 … / 0.48)`, `outline-offset: 2px`, no shadow. keyframes' own `.kf-focus-ring` hosts paint `box-shadow: … 0 0 0 2px, … 0 0 8px 0` with `outline: none`, the halo register glass itself uses on `.popover-content`. The two are **not equivalent** on screen in ordinary mode, so the audit's "swap the local rule for glass's" branch fails and its relay branch fires.

## Ask (10.2.0)
1. One canonical focus register in glass: either `.popover-content:focus-visible` and `.focus-ring` converge on one paint, or glass publishes the halo as a named variant of `.focus-ring` (a class or a data attribute on the same utility) that bespoke hosts can wear.
2. A stated rule for which register a non-glass host wears (canvas plates, track thumbs, cards that hold a focused child via `:has(:focus-visible)`).
3. For the ruling: the KF.W6 radius rationale for the local rule has lapsed (10.x `.focus-ring` declares no radius, so the ring follows the host's own).

## Consumer posture
keyframes copies no producer selector. The local `.kf-focus-ring` rule and its hosts stay (keyframes `2c11f034`: 16 uses in 9 demo files plus `design-idioms.css`) as the one keyframes owner until glass rules, then ADOPT-AT-LANDING: the hosts take glass's register and the local rule is deleted in the same commit. A2-KE-L1-22 holds **honest-RED (glass-owned)** until then.

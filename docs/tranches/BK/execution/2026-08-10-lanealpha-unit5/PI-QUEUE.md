# LANE α — UNIT 5 (α6 · #47 W2-W9) · π QUEUE

**ENQUEUE ONLY.** No browser was opened by this seat. Every cell below is owed to the
singleton browser seat and none is claimed. π-CUT cells carry the mandatory **≥500ms
settle** between scroll write and style read (Safari updates scroll-driven styles
ASYNCHRONOUSLY — a synchronous read already nearly banked a false REFUTE of the whole
cut-cap mechanism once) **plus screenshot corroboration**. π-SEAT's dark arm has never
been photometered and stays owed.

Chromium 149 @1440×900 · 768 · 393×852 dpr3. Real Safari 26.4 via
`scripts/safari-probe.mjs` (`pkill -f safaridriver` first) @1440×848 · 430×848 — never
Playwright-WebKit under a Safari label (they give OPPOSITE results on this repo).

| cell | what it must show | why it cannot be a unit test |
|---|---|---|
| **π-RUN** | interior rests ≡ **P/2 (mod P)**, terminals 0/max; leading peek `P/2 − gap ± 1` at every interior rest; rendered seat box === computed `--dock-touch-target`; capacity at 393 | jsdom has no layout, no scroll offset and no cascade — `clientWidth` is 0 and no `@property` registers. A gate asserting this in jsdom would green on a page that never painted. |
| **π-CUT** | cap radius at 3 offsets + a 40px pixel scan; the forced-choice read test (the "round = complete" prior is asserted, never evidenced); the rAF frame-time histogram **cap-live vs cap-inert** | the cap animates `border-radius` on the backdrop-filter box every scroll frame — the one place the headline mark can fail on COST, and only a real compositor can price it. Contingency if it fails: radius + `overflow: clip` on a non-frosted wrapper, frost inboard (+1 element, must be budgeted). |
| **π-REACH** | activated seat lands 100%-visible at its `−P/2` anchor, both orientations; the `(m−1)·P` term correct past an `aria-current` seat; no cross-axis travel by wheel AND drag | the anchor arithmetic is unit-tested; whether the ENGINE HOLDS the glide's target as a snap point is engine-defined and diverges between them. If it diverges, reach falls back to `scrollTo(smooth)` and loses its spring. |
| **π-MATERIAL** | **NEW, owed by this unit.** The focus ring moved `box-shadow` → `outline` on all four control families + the switcher tab: 2px solid, 2px offset, accent at 48%. Must clear contrast over the dock's own frosted plate, must not overlap the glyph, and must survive **forced-colors** (the channel the old shadow ring lost entirely). | contrast over a live `backdrop-filter` surface is a compositor output; no static token read predicts it. |
| **π-PROPORTION** | **NEW, owed by this unit.** `--dock-run-gap` 6px → 8px on the run only (P = 44 + 8 = 52 at the coarse seat). Every dock in the library respaces. The family's `--dock-layer-gap` must be seen NOT to move with it. | a spacing retune is an owner-paint acceptance, not an assertion. |
| **π-MORPH** | rAF box trace across a collapse and an expand: no `+125px` single-frame jump, no ~350ms hold past settle; collapsed non-survivors occupy no layout | the pre-measure guard is now falsified at the unit seat (G-DOCK-MORPH), but the *absence of the jump on a real compositor* is the claim the trace makes. |
| **π-HOVER-HANDOFF** | **NEW, owed by this unit.** The collapsed hover pre-scale is DELETED. Hover→expand must now read as ONE motion; previously it ran 56 → 61.6, snapped back un-tweened, then expanded. Confirm the `box-shadow` elevation alone still reads as a hover on a collapsed dock. | the defect was a 54ms un-tweened frame — visible, not measurable in jsdom. |
| **π-DEFAULT-POSTURE** | **CARRIED from unit 4, still owed.** An unprop'd `<GlassDock>` now mounts COLLAPSED where it previously painted force-pinned-expanded. Four bare in-fence sites keep the default (`/dock/overview` dock-capture · dock-tap-capture · the DockBackgroundToggle tile; `/dock/layers` dock-nested-collapsible) plus the re-pointed `/dock` landing tile. Light AND dark arms. | — |
| **π-SEAT** | open-seat fill / label / ink channel deltas **light AND dark**, hover well, press, specular ceilings | the dark arm has never been photometered. Standing owed. |
| **π-TAP** | the pill tap-to-expand contract. No unit test under the suite's `vi.useFakeTimers()` can witness it: a frozen clock makes the compat click carry the same millisecond as the listener's attach, and Vue's invoker guard (`e._vts <= invoker.attached`) refuses it as a pre-attach replay. | carried from unit-5 §7 CORRECTION 1. |

## §5b (the arbitrary-shape strike) OWES NO CELL — and here is why that is not a dodge

The queue grew by three cells this unit and **not by a fourth for §5b**, which is worth
stating explicitly so a later seat does not read the absence as an oversight.

Every other act in this unit changed a rendered value: the ring changed property, the gap
changed number, the pre-scale stopped happening. §5b changed **none**. The struck corner
LERP read `--dock-shape-from` ≡ `--dock-shape-to` ≡ `--radius-dock` — with zero setters
anywhere, measured — so it computed `r + (r − r)·t` = `r` at every scalar value, and it
was replaced by the literal `border-radius: var(--radius-dock)`. The struck clip register
resolved `none` on every branch and was replaced by the property's initial value, `none`.
**A paint acceptance answers "does this look right?"; §5b cannot move a pixel to look at.**

What *would* owe a cell is the opposite outcome — if a capture ever showed the dock's
corner differing across the strike, that would be evidence one of the four tokens had a
setter this seat's census missed, and the strike would be wrong rather than merely
unphotographed. **π-CUT already covers the surviving animated corner** (the cut cap on
`.dock-plate`), which is the only radius in the band that moves at all now, and §5b's new
biconditional arm is what holds it as the only one.

---

**BLOCKED, and this band must never self-certify around it:** every Safari cell sits
behind the ~249 build-emitted `@supports color-mix` guards (no dock partial is the cure
site) → **BAND-BUILD**. Two narrow-Safari cells stay owed: `/dock/layers` and
`/dock/overflow` @430×848.

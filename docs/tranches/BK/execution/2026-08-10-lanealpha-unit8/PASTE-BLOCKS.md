# LANE α — UNIT 8 (π-CURE · R1–R4) · PASTE-BLOCKS

Literal blocks for the driver. `⊕ⁿ` and `<SHA>` are placeholders the driver fills at the
commit; nothing here invents either.

**A RESUMED UNIT.** The commit lands the dead seat's adopted partials together with this
seat's own bytes; §1 says so in the message rather than presenting inherited work as
freshly authored.

---

## 1 · COMMIT MESSAGE

```
fix(dock,search): cure the four α-owned π routes — the gap with two owners, the
ring the port cut off, the third site of the one-property collision, and the
combobox that was not one

The π band routed four defects to lane α (PI-CENSUS.md §3, R1-R4). All four are
cured at the root here, and the implement seat that started them died mid-write —
its partials were on the tree at resume and were censused file-by-file against the
four orders before a byte was added, not inherited on a claim.

R1 · THE VERTICAL RUN GAP HAD TWO OWNERS. `.glass-dock.vertical .dock-layer`
(shell-regions.css, 0,3,0) declared `gap: --dock-layer-gap`, and `.dock-run` rides
the SAME element as `.dock-layer--full` (GlassDock.vue:464), so it out-ranked
`.glass-dock .dock-run` (0,2,0): every vertical run painted 6px while `--dock-pitch`
computed on `--dock-run-gap` 8px — 2px per seat, 24px over a 12-seat column, both
library vertical docks. The declaration is STRUCK, not out-specified: a
`.glass-dock.vertical .dock-run` rung would have made three rules own one value,
and the strike leaves exactly two, disjoint by element — layers.css:210 carrying the
byte-identical declaration to every non-run layer, and run.css:219 the only gap
statement the run matches. Every `--dock-layer-gap` site in src/ was walked to
prove the disjointness rather than assert it.

R2 · THE FOCUS RING WAS CLIPPED AWAY BY THE RUN PORT on 63 of 67 controls, both
themes, every clipper the same box. A scroll port clips to its PADDING box; this
one had none, the run's cross-axis extent equals the seat's exactly, and the cross
axis cannot simply stop clipping (CSS coerces a `visible` cross axis to `auto`
beside a scrollable one). So the geometry moves: `--dock-ring-reserve` is DERIVED
from the ring's own width+offset in the register that declares them, and each run
rule reserves it on its CLIPPED axis with an equal negative margin handing the
growth straight back — the run's margin box, the seats' positions and the lattice
byte-unchanged, only the clip rectangle moved. Not a masking fallback: the room is
real, and nothing above clips it back (`.glass-dock` is `overflow: visible` with its
aperture deleted, corroborated by the census finding persistent-region seats clean).
The scroll-axis residual — a seat flush at a scroll extremity still loses its
outward 4px — is REFUSED with grounds, not folded away: curing it means padding the
scroll axis, which moves the snapport against `scroll-padding: P/2` and risks the
W3 modular correction for a 4px edge.

R3 · A THIRD SITE OF THE ONE-PROPERTY COLLISION, which W8 closed at two.
`overlay-plate.css` paired `box-shadow: var(--focus-ring-shadow); outline: none;` on
`.menu__trigger:focus-visible`, and DropdownMenuTrigger puts that class on the same
element DockTrigger gives `dock-dropdown-trigger` — three concentric rings at one
:focus-visible, all of it focus paint, none of it elevation. Cured the way the other
two were: the ring moves to `outline`, the property nothing else competes for, and
the `outline: none` goes with the shadow it was pairing. The recipe RESTATES
`.focus-ring` rather than composing it, and the reason is the cascade, not
preference — utilities load AFTER the dock at equal specificity, so the utility would
take the outline channel away from the DOCK ring and trade three rings for one wrong
one. W8's own "two sites" figure is struck in place at unit 5's RECORD and at the
switcher-tab rule; the forced-colors group keeps its entry with its GROUND changed.

R4 · THE COMBOBOX WAS NOT A COMBOBOX. `aria-activedescendant` walked all five
ArrowDown steps while `aria-selected` and `role=option` counted ZERO document-wide
and `[role=listbox]` had an empty id. The route's template READ correct — it authored
`role="option"` and `:aria-selected` on each Card — and both silently no-opped:
Card binds `v-bind="$attrs"` FIRST and then restates `:role`/`:tabindex`/
`:aria-selected` off its own `selected` prop, so an unset `selected` REMOVED what the
consumer authored. The engine half was never the defect. The cure writes to the
channel the component owns, gives the listbox an id both ends read, and adds the four
attributes that make an active-descendant field a combobox — which also lights the
library's own selected-option paint, dead on this route for the same reason, so the
active row has a visual state for the first time. Born RED against a `git show`
extraction of the pristine route (3 failed, exit 1), green at 7 (exit 0), reading the
rendered DOM because this is precisely the binding class vue-tsc and units cannot see.

ONE RESIDUAL IS ADOPTED AND PINNED RATHER THAN HIDDEN. Consuming `selected` also
consumes Card's tab stop — 12 focusable rows beside a field that walks them with
aria-activedescendant, two focus models on one widget. The route cannot undo it
($attrs binds first — the same clobber that caused R4); the wrapper alternative
drops the selected paint and leaves an announced selection with no visual state; and
fixing Card's blanket `tabindex: 0` is outside this lane's fence and changes
precedence for every Card consumer. So the arm ASSERTS tabindex === "0" with the
grounds beside it, and the question is routed to the Card owner.

vue-tsc 0/0. Battery 1 failed | 2137 passed | 10 expected fail (2148) — the single
RED is tests/public-surface.spec.ts Row 8, an eighteen-day-old dist/ that still ships
the deleted overflow.css and lacks run.css; this unit neither adds nor removes a
shipped file, and the same stale dist throws verify:package before it ever reaches
the ratchet arm. Receipt unmoved: seats:60 … violations:0 — nothing minted.
Four π re-capture cells ENQUEUED (π-RERUN-R1..R4); no browser was opened here and no
pixel is claimed.
```

---

## 2 · ⊕ⁿ LEDGER APPEND

```
⊕ⁿ  LANE α UNIT 8 · π-CURE R1-R4 · <SHA>

The four α-owned π routes cured at the root, by a RESUMED seat: the predecessor
died mid-write and its partials were censused file-by-file (9 paths, 7 ADOPTED, 2
ADOPTED+EXTENDED) before a byte was added.

R1 the vertical run gap — the orientation rule was a second owner of the run's gap;
     STRUCK, leaving two rules disjoint by element instead of three owning one value.
R2 the clipped focus ring — 63 of 67 controls; `--dock-ring-reserve` derived from the
     ring's own terms, reserved on each run's CLIPPED axis with an equal negative
     margin, lattice byte-unchanged. Scroll-axis residual REFUSED with grounds.
R3 the triple ring — the third site of the one-property collision, W8 having closed
     it at two; re-pointed onto `outline`, and W8's "two sites" figure struck in place.
R4 the combobox — role=option/aria-selected were authored and silently clobbered by
     Card's own bindings; written to the channel the component owns. Born RED via
     `git show` extraction (3 failed, exit 1) → green 7 (exit 0), off the rendered DOM.

VERIFY: vue-tsc 0/0 · battery 1f | 2137p | 10xf (2148), the one RED foreign
(eighteen-day-old dist/, Row 8 built-artifact acceptance; the same staleness throws
verify:package before the ratchet arm is reached) · receipt seats:60 … violations:0,
UNMOVED, nothing minted.

OWED: π-RERUN-R1..R4, four DELTA cells against the band's own arms, 0 claimed. No
browser was opened by this seat.

ROUTED, not swept: Card's option contract gives every selectable card a tab stop, so
R4's cure adds 12 of them to a field that walks its options with
aria-activedescendant. Out of fence, pinned by assertion at the arm, owner = Card.
```

---

## 3 · FILES THIS UNIT TOUCHED

```
src/components/dock/styles/index.css          --dock-ring-reserve (R2)
src/components/dock/styles/run.css            the cross-axis reserve, both rules (R2)
src/components/dock/styles/shell-regions.css  the gap strike (R1)
src/components/dock/styles/layer-group.css    W8's "second of two" → "worse of the first two" (R3)
src/styles/glass/overlay-plate.css            .menu__trigger:focus-visible → outline (R3)
src/styles/utilities/a11y-overrides.css       the WHC entry's ground re-stated (R3)
demo/stories/data/search.vue                  the combobox + listbox + option channel (R4)
tests/composables/search/search-contracts.test.ts   the born-RED arm + the residual pin (R4)
docs/tranches/BK/execution/2026-08-10-lanealpha-unit5/RECORD.md   the dated R3 strike
docs/tranches/BK/execution/2026-08-10-lanealpha-unit8/            RECORD · PI-QUEUE · PASTE-BLOCKS · 3 logs
```

**NOT this unit's, do not stage:** `demo/chassis/hero/story-hero.css` ·
`demo/stories/navigation/toc-tracking.vue` ·
`src/components/fourier-field/shaders/render.wgsl.ts` ·
`src/components/fourier-field/useFourierField.ts` ·
`tests/components/fourier-field/FourierField.smoke.test.ts` ·
`tests/components/fourier-field/wgsl-splice-contract.test.ts` ·
`tests/demo/page-chrome-shrink.test.ts` ·
`docs/tranches/BK/execution/2026-08-10-lanedelta-unit5/` — lane δ unit 5, mid-flight.

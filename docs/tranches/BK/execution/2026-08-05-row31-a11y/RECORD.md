# BK #31 — W-A11Y (≡BAND-A11Y five) · Φ5

**Spec of record:** TR §A row #31 → `ECOUTE §3` + `docs/tranches/BJ/waves/BAND-A11Y.md` (five
waves, 359 lines) + `O-8` (`COMPONENT-WAVES-TERMINAL.md:1291`), as amended by the TR ✦ and ⊕⁷
one-liners. Seats: `G-COARSE-TARGET` · `G-CONTRAST-COMPUTED` · `G-FOCUS-VISIBLE` · `G-KEY-SCOPE`
(§B.5 A11Y family, four seats, **+0** minted). DAG dep: **none** (`EXECUTION-DAG:42`).

---

## §0 · THE SHAPE OF THE ROW

Twenty-one items across five waves plus three ECOUTE gate assertions plus O-8. The first act was
to measure every one of them **on disk at HEAD** rather than inherit the spec's HEAD (`485891a2`,
long superseded by the BI restructure and #18's deletions). That census is §1, and it is the
reason the cut is 17 files rather than 40: **ten items were already satisfied**, **five had lost
their subject**, and **eleven were live**. Nothing was taken on the spec's word; nothing live was
deferred.

The row's centre of gravity turned out to be a single class of defect that the band named three
separate times without connecting: **a contrast figure nobody could check.** The status tones, the
control boundary, and the dark error ink were all wrong, and the token comment that should have
caught the last one asserted `4.60:1` for a pair that computes `3.67:1` — the reciprocal ratio,
transposed. So the gate this row owes is not another identity check; it is an actual computation,
and it holds the *comments* too (§5 of the gate).

---

## §1 · THE ON-DISK CENSUS (measured, not assumed)

### Already satisfied at HEAD — no bytes, trace recorded

| item | contract | trace at HEAD |
|---|---|---|
| W1-A | nav landmark | `demo/shell/AppShell.vue:240` `<nav aria-label="Category navigation">`; test `tests/demo/sidebar-nav-landmark.a11y.test.ts` |
| W1-B | `aria-pressed` tri-state | `DockControl.vue:109-116` — `active !== undefined` gate, `data-active` truthy-gated |
| W1-C | centre-spring focus return | `DialogContent.vue:404` guards `sideSpringLive \|\| centerSpringActive`; `:370` `closingInert` covers both |
| W1-D | placeholder repoint + `--surface-tint-35` delete | four registers on bare `var(--muted-foreground)`; `grep -rn surface-tint-35 src/` → 0 |
| W2-A | tab↔panel linkage | `DockLayerGroup.vue:252` `aria-controls`, `DockLayer.vue:82-86` `role="tabpanel"`+`aria-labelledby`, `PagerDots.vue:382` `aria-controls` |
| W2-C | kbd combo de-dup | `AppShell.vue:308` — the combo labels the `<dt>`, parts unlabelled |
| W2-D | Carousel conditional tab stop | `Carousel.vue:89` `:tabindex="accessibleName ? 0 : undefined"` |
| W3-B | dialog close-X seat | already re-inked `muted-foreground` → `accent-foreground`; **measured 5.32:1 light / 5.40:1 dark at `opacity-70`**, against a 3.0 floor — the spec's 2.34 is a pre-cure figure |
| W4-A | InfiniteScroll announce | `InfiniteScroll.vue:84` sr-only `role="status"` `aria-live="polite"` |
| W5-C | boundary-disabled model | `DockControl.vue:116` stamps `aria-disabled` alone; `blockDisabledActivation` suppresses the click |

### Subject gone — recorded, not "fixed"

- **W2-B** (Combobox `SearchIcon`): the 9-SFC combobox family is DELETED (`src/components/combobox`
  absent). The band's own D-14 contingency called this exactly. The sweep-class arm survives and is
  live at `tests/components/a11y/decorative-icon-sweep.test.ts`.
- **W5-B** (HeaderRibbon roving): `src/components/header-ribbon` is DELETED.
- **W5-A** (dock keyboard model): implementation is OWNED by **#47 GF-DOCK W3** by the band's own
  ruling ("this band does not fork a second dock keyboard model"). Recorded, not built here.
- **W5-D** (hero heading dedup): the chassis seam is family D's (**#58**). The band registers the
  acceptance criterion only — which §W1-F's second case now asserts as a count.
- **W4-B** (`invalid`/`errorLive`): a RULING, no code. KEEP holds; `LabeledField.vue:25,28,38,59-60`
  + `:68` still carry the wiring the ruling protects.

### Live — the eleven built below

W1-E · W1-F · W2-E · W2-F · W3-A · W3-C · O-8 · `G-KEY-SCOPE` · `G-FOCUS-VISIBLE` ·
`G-CONTRAST-COMPUTED` (the control-boundary and error-ink halves).

---

## §2 · W3-A — THE STATUS-TONE RE-INK, AND THE LAW IT LANDED

**The finding, re-derived independently before touching anything.** Five of eight tone/ink pairs
were under the 4.5 body floor on **solid opaque fills** — no glass, no alpha, so the arithmetic is
the whole truth:

| | light | dark |
|---|---|---|
| success | **2.21** | **1.58** |
| warning | 8.19 ✓ | 9.47 ✓ |
| info | **3.49** | **2.36** |
| destructive | 4.70 ✓ | **3.07** |

Every figure reproduces RU-18 pass-2's banked numbers exactly.

**THE LAW: ink polarity is DERIVED, never chosen.** For each tone the ink is whichever polarity
computes the higher ratio against that tone's *own authored value*; the tone moves only when
neither polarity clears. Warning had been obeying it all along — a luminous amber plate with dark
ink — and was the only pair that passed. Applied to the rest, measured:

```
success  light  dark ink 7.60  vs white 2.21     dark  dark ink 10.21 vs off-white 1.58
warning  light  dark ink 8.19  vs white 2.05     dark  dark ink  9.47 vs off-white 1.70
info     light  dark ink 4.82  vs white 3.49     dark  dark ink  6.82 vs off-white 2.36
destr    light  white 4.70 vs dark ink 3.58      dark  (see below)
```

**NO HUE MOVES.** The plates are the library's identity (presets-in-consumers; `feedback-tone.css`
states "NO new colors" as its own law) and a contrast defect is not a licence to retune them. Four
of the five failures are cured by flipping ink alone. The warm ink is `hsl(24 10% 10%)` — the exact
literal `--warning-foreground` and the dark `--primary-foreground` already speak. **No ink minted.**

**The one tone that had to move, and why it is the only one.** `--destructive` holds **two jobs**:
it is the error INK (`Label.vue:85` required marker, `LabeledField.vue:106` error message) and the
destructive PLATE (`button/styles.css:107`). In the dark arm those pull against each other and it
was failing both. Its comment recorded a previous lift made for the ink job, claiming
`4.60:1 as text over --card` — but **4.60 is the dark ink over that red**, the reciprocal pair. The
pair the comment named computes **3.67:1**. The lift was sized against a transposition, so the job
it was made for never cleared, on both arms, for the whole interval.

Lifted to `oklch(0.702 0.184 27.5)` — the light arm's own hue (`hsl(0 72% 50%)` is oklch h 27.5),
at the chroma the dark success rung already speaks — which clears both jobs at once:
**4.85** as ink over `--card`/`--popover` · **6.88** over the page · **6.08** as a plate under the
warm ink. Its ink flips with the other three.

**THE ONE PAINTED PLATE THE TOKEN TABLE CANNOT SEE — `badge/index.ts:15`.** The ink flip is a
token move, and one shipped component did not take its plate from a token:
`dark:bg-[hsl(0_70%_45%)]`, the only hardcoded plate in `src/components/` (swept). An arbitrary
`dark:` utility outranks `bg-destructive` in the cascade while the element still wears
`text-destructive-foreground` — so it kept a plate sized for the OLD ink and took the NEW one:
**4.74 → 2.98**, a PASS→FAIL below both the 4.5 text floor and the 3.0 non-text floor, in a
component the demo renders. §1 measures `var(--destructive)` (6.08) and is blind to it by
construction: this row's own thesis — a contrast figure nobody could check — one level down.
The literal is DELETED; the dark badge tracks the lifted token, so its plate is the 6.08 §1
already holds. Paint-verified live (§9). The detector gap is real and is routed, not widened
in-row: **RT-31G → #65** (§11).

**Sequencing honoured (APOTHEOSIS D-09):** the alert/badge/toast recipe arm lands with-or-after FM
W4, and **R-3 is already RULED and landed** — `_shared/feedback/feedback-tone.css` paints neutral
glass + status ink, body ink stays `--foreground`, the tone is a bounded tint and a full-chroma
GLYPH (a non-text graphic). So the recipe half needs no alpha decision from this row and the gate
tables carry no alert row that OPEN-FM-2 could invalidate. The button-tone half — which the band
says "may lead" — is what moved.

---

## §3 · THE CONTROL BOUNDARY AND THE FALSE FIGURES

**`--control-ring` at 1.28:1.** `scale-paper.css` documented the intent precisely — "a
slightly-stronger ~12% warm-ink outline that reads as a DEFINED circle at 16px" — and missed it by
a factor of 2.3. For an UNCHECKED checkbox or radio the boundary *is* the whole control; WCAG
1.4.11 sets 3.0 for it. The alpha is now **derived, not estimated**: swept against every surface a
checks atom sits on (`--background`, `--card`, `--popover`, `--secondary`, `--muted`) in both arms,
the arithmetic floor is **48%** (worst surface 3.01) and the shipped value takes the next even rung
for headroom, **50%** → worst surface **3.18** light / **3.98** dark. Still half-strength ink, so
the fence the comment records (no dark `--primary` hairline) holds.

**Nine claimed figures were false and are struck in place**, each with its dated bracket:

| site | claimed | computes |
|---|---|---|
| `light-dark.css` + `dark-arm.css:109` | 4.60:1 destructive as text over `--card` (dark) | **3.67** |
| same | 5.03:1 destructive as a plate vs page (dark) | **5.20** |
| same | 4.70:1 light destructive over `--card` | **4.53** (4.70 is the vs-PAGE figure) |
| `light-dark.css:119` | 1.75:1 the stock shadcn red as ink over dark `--card` | **1.39** |
| `dark-arm.css:59`, `:64`, `:278` | 7.64:1 `--neutral-5` vs page | **7.70** |
| `dark-arm.css:64` | 10.29:1 `--neutral-6` vs page | **10.25** |
| `color-radius.css:45` | 4.90:1 `--neutral-5` vs muted | **4.89** |
| `color-radius.css:53` | 7.88:1 `--neutral-6` vs L98 page | **7.89** |
| same | 7.43:1 `--neutral-6` vs L95 muted | **7.41** |

The last three sit within nine lines of each other in one block: the 4.90 strike was made and the
two beside it were not, which is how a strike pass leaves a file it has already touched still
carrying false figures. All three are now in §5.

Verified TRUE and left alone: `--primary-foreground` on dark `--primary` **7.15** (exact) and
light `--neutral-5` vs page **5.21** (exact).

**One figure this row MINTED was false and is corrected in place, not struck** (it never shipped):
`dark-arm.css:192`'s off-white column read **2.5** against a computed **2.65** — one decimal, which
is precisely why §5 could not hold it: a two-decimal harvester cannot see a one-decimal claim. The
harvester now takes any precision and the two-decimal statement is itself asserted, and the whole
losing off-white column (1.58 · 1.70 · 2.36 · 2.65) is enrolled.

**N8 recorded, not churned** (the band's own instruction): `--muted-foreground` on `--secondary`
computes **4.39** light — marginal, and no `src/` pairing actually makes it. Documented here; it is
deliberately NOT a gate row, because gating a pair no code paints is how a gate table grows without
a defect behind it.

---

## §4 · W2-F — THE SLIDER, EXONERATED AND THEN FLOORED HONESTLY

TR ⊕⁷ (o19 A-7/A-11) is the operative amendment: RU-33 booked a WCAG **2.5.5** regression (a 44px
`touch-hit-area` halo "lost" from the thumb); value.js's counter-measurement of **339.4 × 24** CSS
px overruled it — the operable target is the **track**, not the 12×24 glyph — and ordered the
exoneration recorded and the restore *sized honestly*.

Two findings on disk, both reproduced from the bytes:

1. **There is no thumb to measure on the standard recipe.** `.slider-thumb` ships `width: 0;
   opacity: 0` — "the grab IS the track", by design. The 12×24 glyph is the SPECTRUM handle, drawn
   on a track draggable along its whole length. `touch-hit-area` itself no longer exists in `src/`.
   So no halo is restored, and **2.5.5's 44px stays overruled** — the literal `2.75rem` is
   gate-forbidden here.
2. **The rung the counter-measurement covered is the one that already cleared.** Derived from the
   authored `[data-size]` blocks: sm `0.75rem` = **12px**, md `1.25rem` = **20px**, lg `1.75rem` =
   **28px**; spectrum md = `1rem × 1.5` = **24px** — exactly the `× 24` of `339.4 × 24`. Two of
   three standard rungs sit under 24. That is the honest remainder, and 24 (WCAG **2.5.8** AA, the
   floor the measurement cleared) is the only number this row is entitled to size to.

**Mechanism ruled, not copied.** The dock family's answer is a transparent `::after` hit-slop
(`dock/styles/controls/touch-floor.css`, reused by `glass/dissolve.css`), which is right for a
`<button>` with nothing inside that owns events. The slider root contains a thumb that must keep
its own pointer capture, and a pseudo painted after its siblings would sit over it. The root paints
**nothing** (a bare flex row; track/fill/thumb carry every pixel) and centres its children, so
`min-*-size` on the root moves no pixel: the track keeps its authored height, still centred, and
the acquired region is the element reka's handler is bound to. Growing the box also means the
target is really THERE — a slop overhanging a neighbour would steal the neighbour's taps.

**Both axes, because the narrow one swaps with the orientation.** This was caught in the live pass,
not the spec: `[data-orientation="vertical"]` sets `width: var(--slider-track-height)` and
`height: var(--slider-vertical-size, 12rem)`, so the vertical rung's 12/20/28px axis is **INLINE**.
A block-only floor would have left the vertical slider exactly as thin as the finding forbids. One
`max()` floors both orientations without a `[data-orientation]` fork, and is a no-op on whichever
axis is already long. What the floor DOES move is the root's own box in its parent's flow on the
axis that was under it — the honest cost of a target that is really there, stated in the comment
rather than the earlier "moves no paint at all", which was true of the slider's own pixels and not
of its box.

**The floor's token is DECLARED**, in `tokens/sizing.css` beside `--touch-target` (44px, 2.5.5)
and `--dock-touch-target` (44px): `--slider-touch-target: 1.5rem` — 24px, 2.5.8, a distinct rung
because the two answer different criteria and 2.5.5 is overruled here. It is declared in the
tokens file rather than on `.glass-slider` so a consumer can still override it from any ancestor
scope; the `var()` fallback stays only as long as it agrees with the declaration, which the gate
now holds. Undeclared, it was a literal wearing a token's name — a new instance of exactly the
class **#20 W-FALLBACK-LITERAL-SWEEP** exists to sweep, minted in the same tranche. It is
declared rather than routed because the home was obvious and one line; the slider's *pre-existing*
undeclared knobs (`--slider-vertical-size`, `--glass-slider-track-background`) are untouched and
remain #20's sweep, not this row's.

---

## §5 · THE OTHER LIVE CURES

**`G-KEY-SCOPE`** — `useSortable.ts`'s `onKeydown` is bound on the `<li>`, so every key pressed
anywhere in a sortable row reached it, and the controller `preventDefault()`s Space and Enter. Its
`onPointerdown` sibling one branch up already asked whether the event started at the grip; the key
path did not. Reproduced: a nested `<input>` could not type a space, and a nested `<button>` had
its own activation swallowed. Cured with **one predicate for both input modes** —
`eventTargetIsGrip` in `touchGate.ts`, the gate module: a declared handle selector means the
handle is the grip (the pointer rule, verbatim); `null` (the documented drag-from-anywhere
contract) means the ROW is the grip, so the event must start on the row. The `null` branch takes
nothing away that worked — with no handle and no author-set `tabindex` the row is not focusable, so
a row-targeted keydown could only ever have arrived from a focusable descendant, which is the case
it closes.

**`G-FOCUS-VISIBLE`** — `dropdown-menu/styles.css` carried exactly ONE `.dropdown-menu__trigger`
rule and it was **`outline: none`**: the UA ring SUPPRESSED with nothing painted in its place, on
a component that renders a bare `<button>`. That is 2.4.7 by **commission**, not omission — the
trigger showed a keyboard user less than an unstyled `<button>` would have. The new
`:focus-visible` rule beats it on specificity (0,2,0 over 0,1,0), but a rule that suppresses on
every register while painting on one is a masking fallback, so it is **deleted** rather than left
beaten, and the element now has exactly one focus statement — which paints. (Held: the gate reds
if a bare-trigger `outline: none` returns.) Every other focus indicator in the library is an
OPT-IN utility (`.focus-ring`,
`.interactive-item`) — the right shape for a class a consumer composes, the wrong shape for an
element the library itself renders, since nothing was composing one. The trigger now carries the
ring inherently, reading the SAME single register (`--focus-ring-shadow`) — one focus vocabulary,
no second ring minted — on `:focus-visible`, never bare `:focus`. Because it is the library's first
*inherent* (non-opt-in) ring, it could not inherit the forced-colors restore from a utility, so it
is enrolled in `a11y-overrides.css`'s `Highlight` block: a box-shadow ring that WHC strips and no
`outline` behind it is a ring that vanishes for exactly the users who need it most.

**W2-E** — the same law read from the other end: `.glass-slider…:focus-within .slider-track` painted
the KEYBOARD ring on a pointer grab, while the spectrum sibling three rules down already used
`:focus-visible`. One component, two disagreeing definitions of "focused". Both track registers
(valid and invalid) now use `:has(:focus-visible)` — the identical relationship, restricted to the
heuristic the engine already computes. No `:focus-within` fallback pairs with it: on the target
engines `:has()` resolves, and a fallback would paint the very ring the cure removes (no-masking).

**O-8** — two dock controls carried `:title` *and* `:aria-label`, and the dock family's documented
label affordance is the library's own `<Tooltip side="right">` (`touch-floor.css:61`;
`SidebarDock.vue:120` and `stories/dock/rail.vue:89` wrap both sites in real Tooltips). The native
rect painted over the styled one on the browser's own delay. Struck at both sites; the accessible
name is untouched — `aria-label` is and was the name. The gate holds the CLASS, not the two sites.

**W1-E** — no skip link existed anywhere (`grep` → 0). The shell's route-settle focus move covers
navigations and covers first load not at all, which is the one arrival every visitor makes. The
link is first in the DOM (hence first in tab order — nothing sets a positive `tabindex`), hidden
until focused, and its activation calls **the shell's one `focusMain()`** — the same function the
route-settle watch calls. Two mechanisms for one intent is how a shell ends up with two disagreeing
definitions of "the top of the page". The `href` carries the semantic contract and the default is
prevented because the native jump would write `#demo-main` into a history-mode SPA URL to perform
a focus move the shell already owns.

**W1-F** — `empty-states.vue` rendered h3 under the chassis h1 with no h2, and `auth-shell.vue` did
the same under its own authored h1 (`hero-title="false"`). Both are h2 now; `text-heading` carries
the size, so **no paint changes**. The gate scans all six compositions and blanks comments first —
`auth-shell.vue` mentions `<h1>` in prose and `<h2>` inside a CSS comment, and a scanner that
counts those measures the documentation instead of the page. Its second case asserts exactly-one-h1
per composition, which is W5-D's registered acceptance criterion (the chassis seam stays #58's).

---

## §6 · THE GATE — ONE SEAT, FIVE TABLES

`tests/styles/contrast-computed.test.ts` binds `G-CONTRAST-COMPUTED`. It **absorbs**
`tests/styles/placeholder-contrast.test.ts`, which is DELETED — BAND-A11Y §Gate posture orders
"ONE invariant gate (W3-C, absorbing the W1-D source scan)", and W1-D's own row says the scan
"folds into W3's single contrast invariant gate at band close (one gate, two tables)". Both halves
of the absorbed file survive on its source bytes; nothing is lost, apparatus is not duplicated.
It is not a C19 active row, so the register is undisturbed.

Why a computation and not another identity check: the absorbed file asserted that four selectors
resolved onto `var(--muted-foreground)` — true, real, and blind to the value that token holds.
ECOUTE booked the seat RED on exactly that ground.

| table | holds |
|---|---|
| §1 | eight tone/ink pairs ≥ 4.5, **plus** the derived-polarity law itself (a shipped ink that loses to the opposite polarity REDs) |
| §2 | the four placeholder registers on the bare token (no `surface-tint`, no `opacity`, no `color-mix`), **and** that token ≥ 4.5 over `--background`/`--card`/`--muted`; `--surface-tint-35` stays deleted |
| §3 | `--control-ring` ≥ 3.0 on all five surfaces × both arms, and both checks atoms read the register |
| §4 | `--destructive`'s **two jobs** (ink ≥ 4.5 over card/popover/page), that the ink consumers really read it, and the `light-dark()` ↔ `.dark` **LOCKSTEP** |
| §5 | **thirty-four claimed figures** across ALL FOUR gate-read token files, by name, against the same engine — a stale claim REDs and so does a silent re-tune that leaves its claim behind. Both polarities of every tone are held (the LOSING column is what the derived-polarity law is derived from), and the harvester takes any precision then **demands two decimals**, so a hand-rounded figure cannot hide in a claim the table structurally could not read |
| §6 | the engine: the two WCAG anchors exactly (21.00 / 1.00), all three authored syntaxes + `var()` depth, that translucent ink is **composited** (a resolver reading `--control-ring` neat would have scored the 1.28:1 boundary a pass at 21:1), and that an unparsable colour **throws** rather than being silently skipped |

The engine is ~90 lines inline, deliberately not a dependency: the pairs are authored in `hsl()`,
`oklch()` and `color-mix()` behind arbitrary `var()` depth, and a detector that cannot resolve the
real bytes silently skips the rows that matter. Composited-over-glass pairs stay OUT, in the band's
LIVE-DEFER register — a ratio against a backdrop-filtered plate is a paint measurement, not an
arithmetic one, and asserting it from authored bytes would be a figure with no detector behind it.

**Seats +0.** All four A11Y seats pre-exist in §B.5 and all four record `binding: "none"` in
`SEAT-BINDING.json`. They now have live detectors under their own names; the SEAT-BINDING re-bind
is **RT-31A → #65** (the ⊕²⁷ "ABSENT seats with live detectors" caveat class, which this row adds
four rows to). The register receipt is byte-identical because `bound` is computed from
SEAT-BINDING.json, which this row does not touch.

---

## §7 · BORN-RED

**THE METHOD, PINNED** (the first measurement was taken three ways and got three answers — 42/71,
40/72, 43/72 — so the method is stated here as part of the figure, and anyone may reproduce it
verbatim):

```
mirror=$(mktemp -d)
git archive HEAD | tar -x -C "$mirror"          # WHOLE tree at HEAD, not a per-file restore;
ln -s <repo>/node_modules "$mirror/node_modules" # the shared tree is never stashed or checked out
cp tests/styles/contrast-computed.test.ts                       "$mirror/tests/styles/"
cp tests/components/a11y/{key-scope,focus-visible,coarse-target,native-title}.test.ts \
                                                               "$mirror/tests/components/a11y/"
cp tests/demo/skip-link.a11y.test.ts                           "$mirror/tests/demo/"
cd "$mirror" && npx vitest run <those six paths>
```

**GATES AS SHIPPED, SOURCES AS AT HEAD.** The six batteries are the delivered (post-cure) files;
everything they read is HEAD. The mirror's own `vitest.config.ts` is HEAD's and this row does not
touch it. `tests/components/a11y/decorative-icon-sweep.test.ts` exists at HEAD, is not this row's,
and is NOT in the run — counting it was one source of the disagreement.

**Environment:** node **v26.0.0** · `vitest/4.1.10 darwin-arm64 node-v26.0.0` · invoked as above,
the six paths named explicitly. Counted from vitest's own JSON reporter (`--reporter=json`), not
from reading terminal output. **Two consecutive identical runs.**

**68 of 97 cases RED**, every one for its own reason:

| battery | RED / total |
|---|---|
| `contrast-computed` | 42 / 61 |
| `key-scope` | 3 / 4 |
| `focus-visible` | 6 / 8 |
| `coarse-target` | 7 / 9 |
| `native-title` | 3 / 3 |
| `skip-link.a11y` | 7 / 12 |

Headline and table agree: 42+3+6+7+3+7 = **68**, 68+29 = **97**. The counts moved from the first
delivery because the CURE cut widened three batteries (§5 grew from eleven claims to thirty-four,
`focus-visible` gained the bare-suppression invariant, `coarse-target` the declaration lockstep) —
a born-RED figure is a property of the gates that ship, so it is re-measured whenever they move.

The 29 green-at-HEAD cases are the honest half: the ten already-satisfied items (§1), warning's two
already-correct pairs, light destructive's, and the placeholder identity table the gate absorbed
intact.

---

## §8 · MUTATIONS — 23 planted, 23 BITE, every restore byte-exact

Each mutation is reverted from a scratch copy of the cured bytes and `shasum -c`-compared (never
`git checkout` — the tree is shared and holds an uncommitted cut).

| | mutation | bites |
|---|---|---|
| M1 | light `--success-foreground` back to white ink | §1 |
| M2 | dark `--destructive` back to the un-lifted red | §1/§4 |
| M3 | `--control-ring` back to 12% | §3 |
| M4 | a token comment claims a figure the bytes do not compute | §5 |
| M5 | LOCKSTEP broken — the `light-dark()` arm drifts | §4 |
| M6 | a placeholder register re-acquires an `opacity` | §2 |
| M7 | the delegated keydown drops its grip guard | key-scope |
| M8 | the grip predicate admits any descendant | key-scope |
| M9 | the trigger ring demoted to bare `:focus` | focus-visible |
| M10 | the trigger loses its forced-colors restore | focus-visible |
| M11 | the slider reverts to `:focus-within` | focus-visible |
| M12 | the coarse floor sized to the overruled 44px | coarse-target |
| M13 | the coarse floor stops being self-limiting | coarse-target |
| M18 | the vertical (inline) axis loses its floor | coarse-target |
| M19 | the vertical rule stops putting the narrow rung on the inline axis | coarse-target |
| M14 | the native `title` returns on a Tooltip-bearing control | native-title |
| M15 | the skip link stops being first | skip-link |
| M16 | the skip link forks its own focus path | skip-link |
| M17 | a composition skips a heading level again | skip-link |
| M20 | the bare-trigger `outline: none` suppression comes back | focus-visible |
| M21 | `--slider-touch-target` loses its declaration (the fallback becomes the value again) | coarse-target |
| M22 | a claimed figure drops to ONE decimal — in the comment AND in the table row, so nothing but the precision law can see it | §5 |

M13's first anchor missed after the both-axes cure re-wrote the rule; it was re-anchored and
re-run rather than counted. M22's first anchor moved only the comment, which the claim-string
assert catches for the wrong reason (a missing string, not a hidden figure); it was re-anchored to
move both halves, and it then failed exactly where it should — `"off-white 2.6" must state TWO
decimals`. Stated because a mutation that bites for the wrong reason is a gate you have not
actually tested.

**One cure carries NO detector and says so: CURE-1.** No gate in this row sees a per-component
arbitrary-value plate; the badge is held by the live paint pair in §9 and by **RT-31G → #65**. A
mutation that restores `dark:bg-[hsl(0_70%_45%)]` bites nothing — recorded rather than papered
over with an in-row widening the adjudication expressly routed elsewhere.

---

## §9 · PAINT VERIFICATION — the shipped bundle, both arms, paired

Measured in Chromium against `dist-demo` served at `:5200` (the real built consumer path), with
the computed-style **oklab arm** parsed properly — `getComputedStyle()` returns `oklch(…)` and
`color(srgb …)` verbatim for those authored syntaxes, and a probe that assumes `rgb()` reads the
oklch components as sRGB channels and reports nonsense. The first probe did exactly that and was
discarded.

**The paired DELTA** — the pre-cure token set replayed through the same live engine, so both halves
come from one code path and neither figure is remembered:

| pair | light | dark |
|---|---|---|
| success | 2.21 → **7.60** | 1.57 → **10.21** |
| warning | 8.19 → 8.19 | 9.47 → 9.47 |
| info | 3.48 → **4.82** | 2.35 → **6.82** |
| destructive | 4.69 → 4.69 | 3.07 → **6.08** |
| `--control-ring` / page | 1.28 → **3.32** | 1.28 → **4.50** |
| error ink / `--card` | 4.53 → 4.53 | 3.67 → **4.85** |

Every painted figure matches §2–§3's arithmetic within **0.01** (the residual is the browser's
oklch→sRGB gamut mapping against exact arithmetic). Warning and light-destructive are unchanged in
paint, exactly as designed — they were already correct, and a cure that moved them would have been
churn.

**Cells:** `cells/tone-reink-delta-light.png` · `cells/tone-reink-delta-dark.png` — one root mode
per capture. A first two-column cell was **captured, read, and deleted**: its "light" column
inherited the root's dark token scope, so its BEFORE swatches were not the light arm at all. A
misleading cell is worse than no cell.

**Skip link, live in the built shell:** `skipIsFirstFocusable: true` · **1×1 at rest → 146×39 on
focus** · focus lands on `#demo-main` · the ring resolves to the two-stop `--focus-ring-shadow`.

**THE BADGE PAIR (CURE-1), live in `.dark` on the shipped `dist-demo` at `:5400`, `/display/badge`,
the four-badge SEMANTIC TONES row the demo really renders.** Both halves come from one path on one
element: the post-cure plate is read from the element's own computed style, and the pre-cure half
is the deleted literal replayed as an inline plate on that same element with the ink untouched —
so neither figure is remembered. Computed colours resolved to sRGB through the browser's own
pipeline (a detached 1×1 2D canvas), because `getComputedStyle()` returns `oklch(…)` verbatim for
the lifted token and a probe that assumes `rgb()` reports nonsense:

| | plate | ink | ratio |
|---|---|---|---|
| pre-cure (the arbitrary literal) | `rgb(195,34,34)` | `rgb(28,25,23)` | **2.97** |
| post-cure (the token) | `oklch(0.702 0.184 27.5)` → `rgb(253,104,92)` | `rgb(28,25,23)` | **6.09** |

FAIL → PASS, within 0.01 of §2's arithmetic (2.98 / 6.08). Measured in **both dark paths** — the
`.dark` class arm and the `light-dark()` enhancement arm (`color-scheme: dark`) — which return the
identical `6.09`, so §4's LOCKSTEP is confirmed in paint and not only in the bytes. Token scope
verified at the element itself (`--background #0b0a09`, `--card #352a22`), because a cell whose
subject inherited the wrong scope is the failure this row already deleted one capture for.
Cell: `cells/badge-destructive-dark-cure.png`.

**Shipped bytes re-read from the delivered `dist/`** (re-captured after the cure — the first
capture predated the both-axes fix and quoted a rule the build no longer emits):
`dist/glass-ui.css` ·
`@media (pointer:coarse){.glass-slider[data-v-197f9133]{--slider-target-floor:max(var(--slider-track-height,.375rem), var(--slider-touch-target,1.5rem));min-block-size:var(--slider-target-floor);min-inline-size:var(--slider-target-floor)}}` ·
`.dropdown-menu__trigger:focus-visible{border-radius:var(--radius-control);box-shadow:var(--focus-ring-shadow);outline:none}` — and **no** bare `.dropdown-menu__trigger{…}` rule anywhere in the bundle (`grep` → 0) ·
`dist/styles/utilities/a11y-overrides.css` · `@media (forced-colors: active){…,.dropdown-menu__trigger:focus-visible,…{outline: 2px solid Highlight;outline-offset: 2px;}}` ·
`dist/styles/tokens/scale-paper.css` · `--control-ring: color-mix(in srgb,var(--foreground) 50%,transparent)` ·
`dist/styles/tokens/light-dark.css` · `--destructive: light-dark(hsl(0 72% 50%),oklch(0.702 0.184 27.5))` ·
`dist/styles/tokens/sizing.css` · `--slider-touch-target: 1.5rem;` — declared, beside `--touch-target` and `--dock-touch-target`, and the badge literal `hsl(0 70% 45%)` is gone from the bundle (`grep` → 0).

---

## §10 · VERIFY

```
npx vue-tsc --noEmit                                  → clean (no output)
npx vitest run tests/styles tests/components tests/gates
                                                      → 158 files / 1296 passed + 3 expected fail
                                                        (three consecutive clean runs; 5 of 6 total)
npx vitest run  (full)                                → 219 files / 1714 passed + 3 expected fail
node scripts/gate-register.mjs
  seats:60 active:48 reserved:5 worstCase:53 remaining:7 external:11 bound:8 armOnly:2
  unbound:50 drift:1 rosterSha256:dc05df91 violations:0        ← byte-identical, pre and post
npm run build            → green, 63 public entries, ratchet 903382 untouched
npm run demo:dist:build  → green
tests/public-surface.spec.ts → 89 / 89
```

**ONE intermittent, disclosed and PROVEN NOT THIS ROW'S.**
`tests/components/dropdown-menu.contract.test.ts > "keeps the click branch to one portaled menu and
restores focus on execute"` — the `setTimeout(…, 30)` focus-restore assertion #29 and #30 both
disclosed. Post-cut it failed **3 of 13** full mandated runs and **0 of 15** in isolation. Rather
than assert it was pre-existing, it was **measured**: at pristine HEAD (the 14 sources reverted and
this row's batteries removed) the identical case failed **2 of 6** runs — the same rate. This row's
only contact with that component is a CSS partial, and happy-dom applies no stylesheet.

**The CURE cut's own run record, stated as measured rather than as remembered:** six mandated runs,
five clean at `1296 + 3`, one carrying a single failure whose name was not captured in that run's
output (a summary-only capture — the omission is mine, and reporting a captured name I do not have
would be the species of claim this row exists to remove). The three runs after it are consecutive
clean, and the full suite is clean at `1714 + 3`. The rate is consistent with the intermittent
above and with nothing else: the cure's own edits are a deleted utility literal, four comment
strikes, one token declaration, two CSS deletions and three new source-reading assertions, none of
which touches a timer.

`tests/gates/boot-graph.test.ts`'s dist-demo staleness arm RED'd once mid-cut and was right:
`demo:dist:build` is the STANDING last-before-verify step (⊕⁴²), run before every figure above.

---

## §11 · ROUTED RESIDUE

- **RT-31A → #65** — the SEAT-BINDING re-bind for all four A11Y seats. They record
  `binding: "none"` and now carry live detectors under their own names
  (`G-CONTRAST-COMPUTED` → `tests/styles/contrast-computed.test.ts`; `G-KEY-SCOPE` →
  `tests/components/a11y/key-scope.test.ts`; `G-FOCUS-VISIBLE` →
  `tests/components/a11y/focus-visible.test.ts`; `G-COARSE-TARGET` →
  `tests/components/a11y/coarse-target.test.ts`). This row may not edit `SEAT-BINDING.json` without
  moving the receipt, so the correction routes — and it EXTENDS the ⊕²⁷ caveat #65 is ordered to
  carry: striking on `unbound` would now strike four more covered invariants.
- **RT-31B → #47 (GF-DOCK W3)** — W5-A's dock keyboard model + π-KEYBOARD, by the band's own ruling.
- **RT-31C → #58 (BAND-STORY)** — W5-D's StoryHero/StorySection chassis h1↔h2 seam. The
  acceptance criterion (exactly one h1) is asserted here for the six compositions; the chassis fix
  is family D's.
- **RT-31D → #61 (W-DOC-TRUTH)** — the band's comment/CHANGELOG truth-ups (SidebarDock tablist
  comments, the Slider CHANGELOG correction, `useSelectionIndicator`). Note the `touch-hit-area`
  header truth-up is MOOT: the utility no longer exists.
- **RT-31E → #10 (π-SUITE)** — the Safari cell for `:has(:focus-visible)` on the slider track and
  for `light-dark()` + `oklch()` in the re-inked tone arms. Chromium is measured above; the
  Playwright-webkit ≠ Safari law forbids inferring the other engine's cell from it.
- **RT-31F → #33/#34 (W-ALERT / W-TOAST)** — those rows own the feedback recipes' own tint/ink
  decisions on the seam this row's tone tokens feed. Nothing here decides an alert alpha
  (R-3 already ruled neutral glass + status ink), so the α-order is honoured by ABSTENTION.
- **RT-31G → #65 (the detector-hardening sitting)** — `G-CONTRAST-COMPUTED` measures TOKENS and is
  blind to a per-component arbitrary-value plate (`badge/index.ts`'s `dark:bg-[hsl(0_70%_45%)]`,
  the defect §2 records). The gap is real and the row's own thesis one level down, but the widening
  is a detector question, not a token question, so it does not happen inside §1: #65 owns the arm
  that reads component variant maps for hardcoded colour literals and puts them through the same
  engine. Until then the badge is held by paint (§9), not by a gate — stated, not papered over.
- **N8, documented not gated** — `--muted-foreground` on `--secondary` at 4.39 light. No `src/`
  pairing makes it; the band says document, do not churn.

**Not minted:** the CURE-7 route the adjudication contemplated at this letter (`--slider-touch-target`
→ #20). The token is DECLARED (§4), so there is nothing to owe; the letter went to the detector gap
above.

---

## §12 · FILES

**Source (16):** `src/styles/tokens/{color-radius,dark-arm,light-dark,scale-paper,sizing}.css` ·
`src/styles/utilities/a11y-overrides.css` · `src/components/slider/Slider.vue` ·
`src/components/dropdown-menu/styles.css` · `src/components/badge/index.ts` ·
`src/components/sortable-list/composables/{touchGate,useSortable}.ts` ·
`src/components/dock/{DockLayerGroup,DockBackgroundToggle}.vue` · `demo/shell/AppShell.vue` ·
`demo/stories/compositions/{empty-states,auth-shell}.vue`

**Tests:** +`tests/styles/contrast-computed.test.ts` ·
+`tests/components/a11y/{key-scope,focus-visible,coarse-target,native-title}.test.ts` ·
+`tests/demo/skip-link.a11y.test.ts` · −`tests/styles/placeholder-contrast.test.ts` (absorbed)

**Evidence:** this file · `cells/tone-reink-delta-{light,dark}.png` ·
`cells/badge-destructive-dark-cure.png`

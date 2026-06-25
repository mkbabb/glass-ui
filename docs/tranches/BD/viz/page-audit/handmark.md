# Page audit — HANDMARK (motion/handmark) — W-HANDMARK-AUDIT

**Branch:** `prototype/liquid-dock` · **Route:** `/motion/handmark` · **Live:** confirmed on real Chrome (isolated context; the W-DEMO-NAV-FIX nav-loop fired ≥3× mid-session — direct nav to `/motion/handmark` bounced to `/compositions/hero` / `/foundations/intro` within ~1s; reached the page only via `router.push()` through `__vue_app__`). **proof:handmark:** PASS (0 violations).

Verdict up front: **the facility is REAL and mostly SOTA-grade — NOT over-built, NOT a mock. The highlighter, crayon, marker, pencil, and ring read convincingly hand-made and the C-1 five field-deltas are LIVE on the page. Two genuine problems: (1) the `boil` "natural morphology" — the register the demo bills as the masthead voice — renders as a REGULAR SHALLOW SINUSOID that reads mechanical/spell-check-squiggle, the weakest mark of the seven; (2) the demo UNDER-DEMONSTRATES hard — 4 of 7 shapes and 2 of 4 animations are never shown.** No dead marks, no broken anchor, no broken Range measure.

---

## 1. NECESSITY — do the 7 shapes × 7 mediums earn their place?

**Shapes (7): mostly earned, with two soft spots.**
- `underline` · `highlight` · `circle` — the three the demo shows; all carry weight, all distinct registers. KEEP.
- `strikethrough` — one switch-arm (`geometry.ts:153`, `L(x1,cy,x2,cy)`), trivially cheap, genuinely distinct semantic (redaction/edit voice). KEEP — but NEVER demoed.
- `box` (4 wobbled sides, `geometry.ts:167`) + `bracket` (3-line open corner, `:180`) — both are the positioned/annotation register (circle-an-anomaly's siblings). Cheap, distinct. KEEP — but NEVER demoed, and **without a single live consumer or demo these are the closest thing to substrate-without-consumer.** They pass the gate on existence, not on use.
- `path` (escape hatch, short-circuits geometry) — the SPEC §5 arbitrary-`d` door. One field, zero cost. KEEP.
- **Verdict: NOT over-built.** Each shape is one `switch` arm in a pure mapper (`shapeGeom`), zero downstream branching — the "Brush ⟂ Path" generality lever is real. The cost of `box`/`bracket`/`strikethrough` existing is ~30 LOC total. The risk is the inverse: they're **under-exercised**, so a regression in `box`/`bracket`/`strikethrough` would ship silently (no demo, the π spec covers only underline/highlight/circle).

**Mediums (7): pen·boil·pencil·crayon·marker·highlighter·ring — earned, the continuum is real.**
- The Brush model (`brush.ts`) is a genuine continuum (12 scalars + 4 enums + `lerpBrush`), NOT a taxonomy of classes — `ink.ts` reads FIELDS, never an instrument name. This is the right architecture; adding a medium IS one row.
- `ring` is a DERIVATIVE of crayon (thin/single-pass/low-alpha) tuned for the positioned circle — borderline a preset-in-consumer, but it earns its row as the ONE re-tonable margin-mark register (`brush.ts:196`).
- `boil` is `pen` + the `natural` morphology auto-engage (`normalizeProps:101`). It earns its row ONLY via the procedural centerline (its scalars are near-pen) — and that's exactly the row whose RENDER is weak (see §2/§3).
- **Verdict: the medium set is right-sized.** The field-count discipline (resist a 13th scalar) is documented and held — `blend` is the only enum a single medium (highlighter) forced. No over-build.

## 2. CORRECTNESS — trace the ink/seed/anchor math (live-verified)

**Highlighter C-1 five deltas — ALL LIVE (visually + getComputedStyle confirmed):**
- (a) LOW seat: live bbox `y=18.6 h=26.5` (viewBox 40) — band centerline below mid, covers x-height→baseline. ✓ (`HIGHLIGHT_RISE=0.22`)
- (b) hull ribbon: `fill="#ffd84a" stroke="none" sw=0` — a FILLED pf hull, not a stroked rect. ✓
- (c) taper: preset `taper:{start:6,end:10}` non-zero → the live band has tapered/irregular ends (screenshot). ✓
- (d) square cap: `stroke-linecap="square"` reaches the DOM path. ✓
- (e) multiply un-walled: `mix-blend-mode:multiply` computed on the path, `.hm` has NO `isolation:isolate` → **the page text reads THROUGH the yellow band (screenshot-confirmed).** `fill-opacity:0.38`. ✓
- **The highlighter is the strongest mark on the page.** It paints like a real highlighter.

**Seed/determinism — correct.** `naturalUnderlinePoints` (`geometry.ts:68`) seeds off the HOUSE `mulberry32` (`utils/prng`), feeds pencil-boil a house-derived int — the [S2] reconcile holds (grep-clean, gate W4 GREEN). Live: `boil seed=3` vs `seed=17` produce DISTINCT paths (y-range 2.42 vs 1.94, `identical:false`) — "two seeds read distinct, one seed reproduces" is TRUE.

**Anchor / B-1 Range measure — WORKS, no bug.** Live on the pen masthead: `glyphBottom=3450`, `underlineTop=3454` → **gap = 3px below the descenders** (the `UNDERLINE_GAP=0.06` intent, a hairline under the real baseline, never through it). The `textRangeRect` content-node anchoring (`HandMark.vue:133`, first-node + `setEndAfter(last)`) correctly skips the trailing empty slot anchor — the 3.11.0 zero-rect bug does NOT reproduce. The viewBox-y≈41.7 (just below `VB_H=40`) is BY DESIGN — `.hm__svg` is `overflow:visible` and the box bottom == glyph bottom, so the line paints right under the word. NOT a bug.

**Draw-on — correct.** Replay → `stroke-dashoffset 1px→0` over `0.8s cubic-bezier(.16,1,.3,1)`, `drawKind=dashoffset` for clean ink (no filter to re-raster). The clip-path wipe path (grained ink) is selected by FIELD (`drawKind = grained ? clip : dashoffset`) — correct, never dashoffset-under-filter.

**Un-demoed shapes — structurally sound** (validated against source): box=4 lines, bracket=3 lines, strikethrough=cy, path=empty short-circuit. Under-exercised but not broken.

## 3. SOTA — convincing hand-voice, or mechanical/wobbly-fake?

**Mixed — and the weak link is the wrong one.**
- pencil (thin grainy grey), crayon (thick waxy red, textured), marker (flat juicy green, square caps), highlighter (translucent multiply slab), ring (overshoot hand-circle) — **ALL read convincingly hand-made.** The grain filter + variable hull + overshoot are doing real work. SOTA-grade.
- **`boil` is the problem.** Billed as "the natural morphology · the masthead default voice," it renders as a REGULAR ~3-4-hump SHALLOW SINE WAVE (`naturalUnderlinePoints` is literally `w1·sin(…) + w2·sin(…)` over an even period grid, amplitude `span·0.022`). On screen "future"/"here"/"boil" read as a **mechanical squiggle / spell-check underline**, not a hand pen line. A real hand underline is MOSTLY-STRAIGHT with low-freq tremor + thick/thin pressure, NOT a periodic sinusoid. This is the exact "wobbly-fake" failure the audit asks about — and it sits on the register the family most advertises. The plain `pen` underline (pencil-boil `wobbleLinePoints`, irregular) actually reads MORE hand-made than `boil`.
- **Recommendation:** retune `naturalUnderlinePoints` toward a hand line — break the period regularity (jitter the period spacing, not just the count), drop the amplitude floor, add pressure/thickness variation, or route `boil`'s underline through the same pencil-boil irregular line the pen uses + a pressure taper. The current "sum of two clean sines" is the mechanical tell.

## 4. The LIVE DEMO — renders correctly but UNDER-DEMONSTRATES the family

- **Renders:** all 12 marks on the page paint correctly (path counts, bboxes, fills, blends all sane); zero console errors. The chassis is clean (`StoryPage`/`StorySection`, NO hand-rolled in-card header — a reference model, no double-header).
- **Under-demonstration (the real demo defect):** shows **3 of 7 shapes** (`underline`/`highlight`/`circle`) and **2 of 4 animations** (`none`/`draw-on`). NEVER shown: `strikethrough`, `box`, `bracket`, `path`, the `boil` CONTINUOUS animation, `draw-then-boil`. The living-line "boil" clock — a headline capability (the whole `useLineBoil`/frame-cycle engine) — is INVISIBLE on the page; only the *static* `boil` brush morphology shows. A reader cannot see the family at its breadth.
- **Section affordance miss (SYSTEMIC, per-page arm):** only section 1 uses `heading=` (renders `<h2>`); the other **6 sections use `label=` only** (eyebrow caption, 0 `<h2>`) — the `label→heading` re-key the batch-2/3 audits flag. Folds into W-PAGE-CHASSIS.
- **Background:** rides `paper` (the per-route exception, idiom-true — the page IS a paper-grain register). BUT per W-PAPER-MORPHISM the grain is sub-perceptual (`--glass-grain-opacity:0.025`) and the `bg-card` opaque cards occlude it — the `paper-grain-overlay` is declared on every card yet barely reads. The marks would read MORE hand-made over visibly-grittier paper.

## 5. BUGS / over-built / under-demonstrated — summary

| # | Severity | Finding | Locus |
|---|---|---|---|
| 1 | **SOTA-defect** | `boil` natural morphology renders as a regular shallow sinusoid (mechanical/spell-check), the weakest of 7 marks — on the family's headline register | `geometry.ts:68-101` `naturalUnderlinePoints` (sum-of-two-clean-sines, even period grid) |
| 2 | **Demo (under-demo)** | 4/7 shapes (strike/box/bracket/path) + 2/4 animations (boil-continuous, draw-then-boil) NEVER shown; the living-line clock is invisible | `demo/stories/motion/handmark.vue` |
| 3 | Demo (systemic) | 6/7 `<StorySection>` use `label=` only → 0 `<h2>` section headings (the `label→heading` re-key) | `handmark.vue:37,50,66,85,99,119` |
| 4 | Demo (W-PAPER-MORPHISM) | paper grain sub-perceptual under opaque `bg-card`; marks billed "over the paper-grain" but the grain barely reads | per-card `paper-grain-overlay` + `--glass-grain-opacity:0.025` |
| 5 | Risk (not a live bug) | `box`/`bracket`/`strikethrough` have zero demo + π only covers underline/highlight/circle → a regression would ship silent | π `tests-visual/handmark.spec.ts` + demo coverage |
| 6 | Infra (band-wide) | W-DEMO-NAV-FIX nav-loop fired ≥3× during audit; direct `/motion/handmark` un-reachable without `router.push` | demo-shell persisted-route precedence |

**NOT bugs (verified):** the B-1 Range anchor (3px gap, correct), the underline viewBox-y≈41.7 (overflow:visible by design), all 5 highlighter deltas (live), draw-on dashoffset, seed determinism. The facility is NOT over-built — the continuum architecture is sound and KISS.

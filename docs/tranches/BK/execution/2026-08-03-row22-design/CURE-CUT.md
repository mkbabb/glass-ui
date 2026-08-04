# ROW #22 · W-FROST — THE CURE CUT

The cure record over `DEBT-ADJUDICATION.json` (all 13 findings) and the three driver
rulings. The cut under cure is `4b1a9733`; the design of record stays `APOTHEOSIS-SPEC.md`
— this file records every DELTA from it, so the spec is never silently rewritten.

Verify gate: `npx vue-tsc --noEmit` clean · `npx vitest run tests/styles tests/components`
green (one contention flake isolate-rerun clean, named below) · `node scripts/gate-register.mjs`
receipt UNMOVED at `seats:60 … rosterSha256:dc05df91 violations:0`. Gates stay at 60 seats;
every new assertion is an ARM under the existing `glass-subtlety` seat.

---

## F-1 (CRITICAL) — the dock's earned darken, re-landed AT THE ELEMENT

The plate no longer paints a `:root`-baked colour. It lerps its own INK between two rung
endpoints and composes the colour through `@utility glass-plate`, where the observer's
measured luminance is read.

**The live code path, hop by hop:**

| # | hop | file:line |
|---|---|---|
| 1 | the observer mounts on the dock ROOT (`dockEl`) | `src/components/dock/GlassDock.vue:102` |
| 2 | it WRITES the measured luminance on that element | `src/composables/glass/useGlassBackdropLuminance.ts:248` |
| 3 | the property is a typed INHERITING `<number>`, so the write reaches every descendant | `src/styles/tokens/property-regs.css:247` |
| 4 | the plate is a descendant of that element | `src/components/dock/GlassDock.vue:378` |
| 5 | the plate lerps its TIER between the two rung endpoints on `--dock-expand-t` | `src/components/dock/styles/dock.css:117` |
| 6 | …whose endpoints are ink rungs, not colours | `src/components/dock/styles/shell.css:122,124` (→ `tokens/glass.css:60,153`) |
| 7 | the plate composes the plate utility AT THE ELEMENT | `src/components/dock/styles/dock.css:124` |
| 8 | the utility clamps the tier UPWARD by the inherited luma past the knee | `src/styles/glass/veil.css:48` (knee: `tokens/glass-fx.css:224`) |
| 9 | the painted rung resolves that clamped rest ink | `src/styles/glass/veil.css:64` |
| 10 | the veil colour is the warm ink at that alpha, lerped on `--glass-level` | `src/styles/glass/veil.css:65` (ink: `tokens/glass.css:43` / `dark-arm.css:239`) |
| 11 | the plate PAINTS it | `src/styles/glass/veil.css:71` |

Built-CSS confirmation (`dist-demo/assets/index-*.css`): the emitted `.dock-plate` rule
carries `--glass-veil-rest:clamp(… var(--glass-backdrop-luma,0) …)` and
`background:var(--glass-veil)`. The pre-cure chain had NO luma term anywhere on it.

Also under F-1:
- both permanently-zero-alpha gradient layers STRUCK — `--dock-plate-tint-veil`
  (`dock/styles/dock.css`) and `--sheet-tint-veil` (`drawer/styles.css`). Zero remaining
  references in `src/`, `demo/`, `tests/`.
- the no-op `@container style(--glass-backdrop: light)` dock bucket DELETED (both the plain
  and the `@supports contrast-color` copy) — each declared exactly what the unconditional
  self-engage above it declares.
- prose corrected: `dock/styles/adaptive-legibility.css` (header + the `:where(.glass-dock)`
  block), `dock/styles/shell.css:106-116` and `:161-169` (both cited `dock/morph.css` for a
  rule that lives in `adaptive-legibility.css`, and both claimed a token re-point darkens the
  plate), `dock/styles/morph.css` header, `dock/styles/dock.css` header + the "7px
  peer-locked" radius (it is 16px).
- the static-backdrop arm's `--card` plate endpoints struck: `--glass-level: 0` already
  resolves the veil recipe to solid `--card` through the one machinery.
- `.glass-dock.vertical`'s plate endpoint re-point struck — every declaration resolved to
  what it overrode.

---

## F-2 — the crown's distinct descent endpoint (DRIVER RULING 1)

`--glass-veil-crown` MINTED at **+1** and amended into the off-ladder footprint table
(`src/styles/tokens/glass.css:130-157`). The lerp now runs **sheet (+2) → crown (+1)** —
one step of ink across the descent, a live lerp at every sampled `--sheet-descent`.

**Table amendment, of record:**

| footprint | offset | radius pairing | note |
|---|---|---|---|
| chassis | −2 | wash 10px (PINNED here) | the −2 ink carries the 64rem plate's weight |
| dock | −1 | RULED EXEMPTION: resting 16px | the grasp calibration host (26px = 16 × 1.625) |
| **crown** | **+1 (NEW)** | — | the Drawer crown's descent TARGET |
| dialog | +1 | floating 20px | |
| sheet | +2 | overlay 22px | the crown's descent START |

Why not "declare the crown constant": a declared constant is the R-1 dead-mechanism shape
this cure-cut exists to kill, and the liquid-weight edict wants the lerp live. Ruled, not
drifted. The lerp START moved from `--glass-veil-overlay` to `--glass-veil-sheet` (byte-equal,
+2) so the sheet's own footprint token stays read and the sentence reads true.

---

## F-3 — the white legs

- `GlassTimeline.vue` `.timeline-cel`: the local keyed edge (white α .26 + a `--cartoon-ink`
  counter-leg) COLLAPSED onto `var(--glass-material-rim)`. It said the same thing in its own
  white at twice the ceiling, and off the `--glass-key-*` sign pair, so a consumer moving the
  key left the cel lit from the old side.
- `ContinuousMarkers.vue` `.continuous-dot`: the DOUBLE rim collapsed. `--glass-material-rim`
  is the RAISED read (lit top / shade bottom); the dot is a flush rivet (shaded top / lit
  bottom). The raised leg is struck, the pressed pair kept, and its white lands on the rim's
  own **0.10**.
- The A-5 census ARM WIDENED (no new gate): a second arm sweeps `src/**/*.{css,vue}` for every
  `inset` box-shadow leg in every white spelling — `hsl(0 0% 100% / a)`, `rgb(255 255 255 / a)`,
  `oklch(1 0 0 / a)`, `white N%`/`#fff N%` inside `color-mix()` — and the `calc(a * var(--glass-level))`
  form the rim now uses. The old arm could only see two token files in two spellings.

---

## F-4 — the grasp topology, and the mount

The engage selector no longer enumerates rung classes. **The carriers ARE the opt-in:**
every rule hangs off `:has(> .glass-grasp-carrier[data-grasp="grasp"])`.

- ~~reaches ANY plate (the rungs, the card, `.dock-plate`, `.slider-range`) with zero
  enumeration~~ [RC-5 2026-08-04: the RE-CURE §R-3 below adjudicated this claim FALSE for the
  rungs+card (`contain: paint` + the grain blend `::after` are unstood-down formers — a card
  mount is a guaranteed flatten); the charter is narrowed to the two SHIPPED consumers with the
  stand-down LAW stated generically in grasp.css] — both named consumers paint on composed
  plates that carry no rung class, which is why the class list was structurally unmatchable.
- ~~the silent-flatten hazard is now UNREPRESENTABLE~~ [RC-5: same adjudication — the hazard is
  unrepresentable ON THE SHIPPED HOSTS whose formers stand down under the gate; on any new host
  it is exactly what the discovered-host stand-down arm exists to catch]: the host's filter is
  suppressed only where a carrier exists to carry it.
- "releasing" is a STRUCTURE, not a flag: carriers mounted + `[data-held]` gone. No
  `data-releasing` attribute exists to forget to clear.

**Mounted in both named consumers**, on the plate that carries the hold:
~~`GlassDock.vue:378`~~ [RC-5 2026-08-04: the R-1 edits moved the mounts — carriers at
`GlassDock.vue:390-392` at HEAD] (`.dock-plate`, `:data-held`, carriers inside) and
~~`Slider.vue:257`~~ [RC-5: `Slider.vue:269-271`] (`.slider-range`, same). Unmount is the release fade's own `transitionend`, guarded on
`isHeld` so a re-grab mid-release cannot unmount under the finger. ~5 lines of state per SFC;
no composable, because `src/composables/**` is outside this seat's wall.

Consequent: `dock/styles/morph.css`'s `[data-held]` plate BODY lift is struck — it pushed the
same axis the opposite way from the register ("held" cannot mean both "lift a tier" and "shed
40% of the ink"). The RIM half of that response survives.

### The precondition the probe found — CAPTURED, Chrome 148

A `backdrop-filter` samples only as far back as its BACKDROP ROOT. A host that forms one
hands its carriers a backdrop of *nothing*: the hold blurs **nothing at all**, at full
opacity, looking exactly like a mount defect.

| probe | host | carrier blurs? |
|---|---|---|
| A | `clip-path: inset(0px 0px)` + `backdrop-filter: none` | **NO** |
| B | plain | yes |
| C | `backdrop-filter: blur(0px)` | **NO** |
| D | `contain: layout style` | yes |
| G | dock-plate shape (clip + blending `::after`) | **NO** |
| H | blending `::after` only | **NO** |
| I | `clip-path` only | **NO** |
| J | neither | yes |
| K | **both cleared (the cure)** | **yes** |
| M/N | slider-range shape, ± held squash `transform` | yes / yes |

So `.dock-plate` formed a backdrop root TWICE (the extent `clip-path`, and the grain
`::after` whose `mix-blend-mode` isolates its parent), and each alone was enough to kill the
register. Both now stand down under the same carrier gate
(`dock/styles/dock.css`, `.dock-plate:has(…)` + `…::after{display:none}`); neither costs
anything while held (the clip is `inset(0px 0px)` at rest and a held dock is held OPEN; the
grain is a texture at `--glass-grain-opacity`). The liquid fill carries neither former and
needs nothing. The law is stated in `glass/grasp.css` and ARMED (mutation-tested: removing
the gated `clip-path: none` turns the arm red).

---

## F-5 — the band holds by construction

`@utility glass-plate` now factors the CLAMPED rest rung into ONE token,
`--glass-veil-rest` (`glass/veil.css:48`), and `--glass-veil-rung` resolves it at rest
(`:64`). The register reads that token:

- held = `calc(var(--glass-veil-rest) * 0.6)`
- releasing = `var(--glass-veil-rest)`

A-11/§5.4's band `[0.6·α_rest, α_rest]` is therefore true at every sampled `f` by
construction. The pre-cure form shed from the RAW TIER, so over a bright backdrop the held
ink fell below its own floor (.084 vs .132 at f=1) — a falsifier that failed analytically,
and which π would have misread as a mount defect. The carrier unmount is now
value-identical to the releasing state, so the `.14 → .22` one-frame release pop is gone.

---

## F-6 — the fence, corrected (DRIVER RULING 3)

The false HONORED ruling is already corrected by reference at the cursor + debt bank. This
seat's half — the genuinely-discretionary in-fence edits the finding names:

| delta | disposition |
|---|---|
| the dead-darken replacement | KEPT — cured under F-1; §7.5 pre-authorises §4's re-key "in the same cut" |
| `segmented.css` (4 prose lines) | KEPT — MANDATED, not discretionary: §6's `--glass-bg-*` → `--glass-plate-*` rename forces the prose or it cites dead token names |
| `search.css`'s `@apply glass-plate` | KEPT — it IS §4's element-level seam, and F-1 generalises it to the plate; reverting it would re-break the field's darken. Prose corrected under F-B5 |
| `tab-button.css:138` lone `--glass-rim-top` | **REVERTED** → `var(--glass-material-rim)`. The lit leg alone is a halo, not a key |

---

## F-7 — the six off-diagonal pairings, disposed

| # | site | pairing | disposition |
|---|---|---|---|
| 1 | `GlassTimeline.vue` `.timeline-rail` | resting ink / floating 20px | **FIXED** → resting 16px |
| 2 | `SegmentedTimeline.vue` `.segmented-dot` | floating ink / quiet 14px | **FIXED** by SUBTRACTION — the dot sits on `.segmented-track.timeline-rail`, itself a filtering plate, so it is a nested CELL and allocates no second backdrop sample (glass.css's own no-PLATE-on-PLATE discipline). No radius on the ladder is right for an element narrower than the kernel |
| 3 | `button/styles.css` `[data-emphasis="secondary"]` | quiet ink / resting 16px | **FIXED** → quiet 14px |
| 4 | `instrument-chassis/styles.css` | chassis ink / quiet 14px | **PINNED** → wash 10px (the −2 footprint's pairing; the table now assigns it) |
| 5 | `button/styles.css` `[data-emphasis="primary"]` | floating ink / `--glass-blur-deep` | **ON-DIAGONAL BY ANCHOR** — the deep tier is a separate continuum anchored ON the floating endpoint at depth 0, so this IS the diagonal with the depth axis engaged. Recorded, allow-listed by name in the arm |
| 6 | `shell.css` `.glass-dock` | dock ink (−1) / resting 16px | **RULED EXEMPTION** — the dock plate is the grasp register's calibration host (§5.2: 26px = 16 × 1.625) and one of its two named consumers. The ground is on the surface (`dock/styles/dock.css`) and in the footprint table |

The A-3/A-4 census now PAIRS the axes (no new gate): every rule that puts a rung's ink on a
plate and hands a rung's radius to `backdrop-filter` must agree, matched by ALPHA so the
off-ladder footprints pair with the ladder rung they share an alpha with. It sees 11 painted
surfaces today and all are on-diagonal.

---

## F-B1 — the cascade, fixed by SPECIFICITY (DRIVER RULING on the structural pick)

Every rule in the register is now ≥ **(0,2,0)** — the `:has()` argument
(`.glass-grasp-carrier[data-grasp="grasp"]`) alone is (0,2,0); the engage and release rules
are (0,3,0). They beat the single-class rest rule of every plate in the library from any
position in the cascade.

**Why specificity and not import order.** Import order cannot be the mechanism: in the built
bundle the register sits at byte 27665 and `.dock-plate` at 61085 — the register's real
consumers are component partials imported AFTER `glass.css`, so a tied (0,1,0) engage rule
loses to them wherever it sits. Moving the `@import` past `surfaces.css` would have fixed
`.glass-card` and left `.dock-plate` and `.glass-liquid-fill` broken. State outranks rest,
said once, in the selector. §8.1's import-order line is unchanged (grasp still sits after
`rim.css` — a cohesion fact, and the arm still asserts it, but it is no longer load-bearing).

---

## F-B2 — the gate seat can now observe the register it certifies

All arms rewritten off single-file regex:
- the φ bound is PARSED from `grasp.css` (`√(1+φ²)/φ ≤ 1.25` computed on the live literal),
  not from a local `const` that was true in any repository state.
- a cascade arm asserts the carrier gate is never wrapped in a `:where()` that zeroes it,
  plus the `glass.css` import-order fact.
- a co-occurrence arm asserts EVERY host state rule is gated on the carriers.
- a cross-file CONSUMER arm reads `GlassDock.vue` + `Slider.vue`: the element carrying the
  plate class also carries `data-held`, both carriers mount inside it, and the unmount is a
  `@transitionend` (never a timer).
- a cross-file BACKDROP-ROOT arm reads the two named hosts' stylesheets and requires any
  former they declare to be stood down under the same gate.

---

## F-B3 — the nested-plate arm reads the real habitat

Re-pointed from CSS selector-text depth (observed max 1 vs bound 2 — could not fail) to a
class-nesting WALK over `src/**/*.vue` templates, which is where plate-in-plate actually
lives (the `CommandDialog`-inside-`DialogContent` case: neither component's stylesheet
mentions the other). `glass/material.css:57`'s prose re-worded to cite where the assertion
genuinely lives, and to name the runtime ancestor-filter count as the π half.

---

## F-B4 — the reduced-transparency white-inset kill, restored ARCHITECTURALLY

Chosen per the a11y-fallback architecture ("ONE knob, every rung, no per-rung enumeration"):
**the rim tokens gained the level term.** Both legs of both arms scale their alpha by
`--glass-level` (`tokens/glass-fx.css`, `tokens/dark-arm.css`), so the material's edge dies
with the material under `prefers-reduced-transparency` AND `forced-colors` — both set that
one knob — with nothing enumerated in either bracket. At level 1 the legs are byte-identical
to the pinned form. Re-zeroing a named token in the bracket would only ever cover the tokens
someone remembered to list. Recorded in `glass/a11y-fallback.css`.

---

## F-B5 — the two stale citations

- `dock/styles/search.css:6-13` claimed `morph.css` "re-points" `--glass-veil-ink`/`-rung`
  (it declares neither) and asserted a dead lockstep. Rewritten to the real seam: the field
  and the dock's L0 plate take the SAME `@utility glass-plate` path, so they darken in
  lockstep by construction rather than by two recipes agreeing.
- `tokens/property-regs.css:231+` cited `glass/ladder.css` + `dock/morph.css` for a clamp
  that lives only in `glass/veil.css`. Corrected.

---

## F-B6 — `will-change` STRUCK (DRIVER RULING 2)

`will-change: backdrop-filter` is gone from the engage rule and no `will-change` exists
anywhere in the register (the arm asserts **zero**, not one). It named a GROUPING property on
the direct ancestor of two `backdrop-filter` boxes — and the probe above turns the
backdrop-root question from "a π item" into a MEASURED fact for the sibling formers, so the
defensive cure is now the correct cure on its merits. No carrier-side `will-change` either:
the animated property is opacity, which the compositor already handles, and rest cost stays
exactly zero because at rest neither carrier exists. The backdrop-root question for
`will-change` specifically remains a π item; nothing in the register depends on its answer.

---

## Deltas from the spec, declared (nothing silent)

1. **`--glass-veil-crown` minted** at +1; the off-ladder table gains a radius column and two
   ruled entries (F-2, F-7).
2. **The grasp opt-in is the carriers, not a rung-class list** (F-4). §5.1's E-3 naming duty
   is discharged by the mount, not by the selector.
3. **No `prefers-reduced-motion` arm in the register.** The release is an opacity cross-fade
   in place — nothing translates, scales or parallaxes — which is the substitution
   reduced-motion asks FOR. And `transition: none` would strand the register: the carriers
   unmount on `transitionend` (clause 4 forbids a timer), so a released plate would stay
   flattened and held for the rest of the session. The landed cut carried that arm; it is
   struck as a defect, not as a preference.
4. **The dock plate stands down two backdrop roots under the gate** (F-4), with the capture
   above as the ground.
5. **`dock/styles/morph.css`'s `[data-held]` plate BODY lift struck**, rim half kept (F-4).

---

## Verify gate

```
$ npx vue-tsc --noEmit
(clean, exit 0)

$ npx vitest run tests/styles tests/components
 Test Files  144 passed | 1 failed (145)
      Tests  1017 passed | 1 failed | 1 expected fail (1019)
   └─ tests/components/dropdown-menu.contract.test.ts — a 30ms focus-restore timer under a
      145-file parallel run. ISOLATE-RERUN CLEAN:
$ npx vitest run tests/components/dropdown-menu.contract.test.ts
 Test Files  1 passed (1)
      Tests  12 passed (12)
(and tests/components alone: 130 files / 876 tests, all green)

$ npx vitest run tests/styles
 Test Files  15 passed (15)
      Tests  142 passed | 1 expected fail (143)

$ node scripts/gate-register.mjs
seats:60 active:48 reserved:5 worstCase:53 remaining:7 external:11 bound:7 armOnly:2
unbound:51 drift:1 rosterSha256:dc05df91 violations:0
(UNMOVED — byte-identical to the pre-cure baseline; the one DRIFT row is #65's, pre-existing)
```

---

# RE-CURE (R-1 … R-7)

Round 1 was adjudicated CURE-REQUIRED. Ten findings — F-1, F-2 (DR-1), F-3, F-6 (DR-3),
F-7, F-B1, F-B2, F-B4, F-B5, F-B6 (DR-2), and F-5's dock half — stand CURED AND SETTLED
and are not re-opened; their files are touched only where an R-item names the site. This
section is the record of R-1..R-7, and the `## Verify gate` at its foot is the re-cure's
own run, superseding the round-1 block above for the tree as it now stands.

---

## R-1 (HIGH, F-4) — the grasp predicate is an ACTUAL HAND

The optic was sourced from `keepOpenCount > 0` — POSTURE. An armed search field or an
open popover took a token, so the held look (0.6× ink, 1.625× blur, brightness .96, the
plate's clip and grain stood down) engaged for the whole time a panel was open, every
slider inside the dock co-engaged off a sibling, and a slider outside a dock could never
engage at all. The register is a direct-manipulation answer to a finger; a state is not
a finger. **Two counts now, two facts** — and only one of them is a hand.

| # | hop | file:line |
|---|---|---|
| 1 | the hold KIND is typed on the seam | `dock/composables/dockContext.ts:22` (`DockHoldKind = "morph" \| "grasp"`) |
| 2 | the counts split: posture `keepOpenCount`, hand `graspCount` | `dock/composables/useDockState.ts:142-143` |
| 3 | …and so do the predicates: `isHeld` (posture) vs `graspHeld` (hand) | `useDockState.ts:144-145` |
| 4 | a token takes the grasp count ONLY when asked | `useDockState.ts:343-347` (`keepOpen`), `:349-351` (`release`) |
| 5 | the ONE caller that asks is the pointer ACQUIRE | `dock/composables/useDockHold.ts:96-102` — `pointerdown`/`touchstart` on the resolved host (`:137-144`) |
| 6 | …and the window-scoped release drops it | `useDockHold.ts:104-108`, `:114-120` |
| 7 | the dock publishes the GRASP edge as the context's `held` | `GlassDock.vue:166` (typed `dockContext.ts:60`) |
| 8 | the root's `data-held` is that edge | `GlassDock.vue:352` |
| 9 | the PLATE's is too, and the carriers mount under it | `GlassDock.vue:388-395`, armed on `graspHeld` at `:313-317` |
| 10 | the slider reads its OWN returned hand, not the dock | `Slider.vue:100` (`const { isHeld } = useDockHold(getRootEl)`) |
| 11 | …onto its own range, with its own carriers | `Slider.vue:233` (root), `:266-274` (the fill) |
| 12 | the register keys on `[data-held]` + the carrier gate | `glass/grasp.css:121-123`, charter at `:9-15` |

**The non-hands stay non-hands, and no consumer call-site moved.** `keepOpen()` defaults
to `"morph"`, so the three posture callers are untouched and now mean what they always
said: `useDockSearch.ts:256` (armSearch), `Popover.vue:78`, `DockLayerGroup.vue:198`.
Each still suppresses the collapse timer and each now drives ZERO paint.

**A standalone slider grasps.** `useDockHold` consumes `useOptionalDockContext()`
(`:85`) and the returned flag is written before the dock is consulted (`:96-101`), so the
hand flips with no dock in scope — the DOCK half is the optional side effect, not the
definition. A slider inside a dock likewise never lights off a sibling's drag: it reads
its own returned edge, never `dock.held`.

---

## R-2 (HIGH, F-4/F-5) — LIVE INK on the fill, not narrowed prose

`.glass-liquid-fill` composes no plate and read no rung, so "sheds 40% of its ink" moved
nothing in paint on the slider and §5.4's band was unfalsifiable on the host it was
written for. Cured by scaling the fill THROUGH the rung — no `glass-plate` refactor, the
fill keeps its own composition. The narrow-to-the-blur-half fallback was NOT taken.

| # | hop | file:line |
|---|---|---|
| 1 | the fill declares the register's pair itself (it is not a plate) | `glass/liquid-fill.css:59-60` — `--glass-veil-rest: 1`, `--glass-veil-rung: var(--glass-veil-rest)` |
| 2 | the tint % is the strength SCALED by the rung | `liquid-fill.css:71` — `calc(var(--liquid-fill-strength, 88%) * var(--glass-veil-rung))` |
| 3 | held re-points the rung to 0.6× rest | `glass/grasp.css:122` |
| 4 | so the fill paints 88% → 52.8% tint under the finger, and back | (2)∘(3) |
| 5 | the release lerps it on the register's own envelope | `grasp.css:193-196` (`--glass-veil-rung` is `@property`-registered `<number>`) |
| 6 | the PLATE host gets the same scalar from the utility | `glass/veil.css:48` (clamped rest) → `:64` (rung) → `:65` (the veil colour) → `:71` (paint) |

`--glass-veil-rest: 1` makes the ratio `rung ÷ rest ≡ rung`, so the same 1 → 0.6 runs on
a host that has no veil, with no division to resolve and byte-identical paint at rest.
The band is now falsifiable on BOTH named consumers, and the arm asserts it generically
over every DISCOVERED host rather than over two names
(`tests/styles/glass-subtlety.test.ts:997`). Detector, stated: the arm requires a host to
either compose `glass-plate` or declare `--glass-veil-rest` AND scale a painted value by
`var(--glass-veil-rung)`. MUTATION-CHECKED — dropping the `* var(--glass-veil-rung)`
factor from `liquid-fill.css:71` reds it (`1 failed | 38 passed`).

**Consequent, and it is a real one.** The fill's background is now a FUNCTION of the
rung, so a rule transitioning both `background` and `--glass-veil-rung` chases one change
down two clocks. `Slider.vue:510-514`'s release-window shorthand drops `background` and
carries the ink channel instead, on the register's own clock — see R-6.

---

## R-3 (MED, F-4) — the charter narrowed, the LAW stated generically, the arm widened

The charter claimed the register "reaches ANY plate" and that silent flatten was
"unrepresentable". False for the five rungs and the card: `contain: paint`
(`glass/material.css:101`) and the grain `::after`'s `mix-blend-mode`
(`glass/grain-overlay.css:47`) are backdrop-root formers nobody stands down, so a carrier
mounted on a `.glass-card` today blurs exactly nothing.

- **Prose narrowed to the two SHIPPED consumers, with the reach/precondition distinction
  stated** — `glass/grasp.css:27-38`. The two named formers are named, with their files.
- **The LAW is generic**: a host mounting the carriers must stand down EVERY backdrop-root
  former it declares, under the same carrier gate, for the duration of the hold
  (`grasp.css:33-38`). Cross-referenced AT the former sites, which is where the next
  author reads: `glass/material.css:98-107`, `glass/grain-overlay.css:26-35`.
- **The arm is DISCOVERY-based, not a hard-coded pair** —
  `tests/styles/glass-subtlety.test.ts:852-909` walks each `.vue` template's own tag
  stack, finds the element the carriers are direct children of AND which carries
  `data-held` (stepping over `<template v-if>` wrappers, and NOT taking the outer box
  that carries `data-held` for the public API contract), and takes its classes. A third
  consumer inherits every arm by MOUNTING.
- **The rule scan follows the SUBJECT, not the prefix** — `:912-941` masks parenthesised
  groups (so a combinator inside `:has(> …)` is never read as structure), splits the
  selector list, and matches the trailing compound. `.dark .dock-plate::after` and
  `.glass-slider[data-held] .slider-range` are now visible; `startsWith` could not see
  either.
- **FORMERS gains `contain`** — `:974`, matching `paint`/`strict`/`content` only.
  `contain: layout style` (which `.glass-dock` carries, `dock/styles/shell.css:144`)
  measured CLEAN in the round-1 probe matrix and is deliberately not matched: the list is
  the matrix, not a guess. MUTATION-CHECKED both legs — removing the gated
  `clip-path: none` at `dock/styles/dock.css:155` reds it, and adding `contain: paint` to
  the liquid fill reds it (`1 failed | 38 passed` each).
- **The spectrum variant is excluded from carrier mounting** — `Slider.vue:188`
  (`graspable = v !== "spectrum"`) gating the mount at `:268`. That recipe de-glasses its
  range on purpose (`Slider.vue:573-578`: no background, no `backdrop-filter`, no rim), so
  a carrier there would frost a surface deliberately made not-glass. The spectrum's held
  read is its thumb halo, which it already carries.

---

## R-4 (MED) — the collapsed-hover identity paint, DELETED

`morph.css:285-293` retargeted all four plate endpoints under a "surface lift" comment.
Its COLLAPSED endpoints were byte-equal to `shell.css:122-123`'s base, and its EXPANDED
endpoints are unread while `--dock-expand-t` is pinned at 0 — which it is, on a collapsed
dock. It painted identity at rest.

| delta | site |
|---|---|
| the rule + its comment STRUCK; nothing invented in its place | `dock/styles/morph.css:285-292` (the strike, recorded in situ) |
| the redundant collapsed-border leg dropped from the held rule | `morph.css:316-321` — expanded endpoint only |
| …and from the static-backdrop arm | `dock/styles/adaptive-legibility.css:85-94` — expanded endpoint only |

No hover rung was minted: a collapsed-dock hover lift is in no spec, and inventing one to
make a comment true is how a register acquires a state nobody designed. The collapsed
dock's hover read remains its `box-shadow` elevation (`morph.css:282-284`) and its scale
lift (`:294-297`).

---

## R-5 (LOW) — the five prose/hygiene corrections, applied in place

| # | site | was | now |
|---|---|---|---|
| 1 | `dock/styles/adaptive-legibility.css:1-13` + `:19-48` | the header asserted a tint-token re-point its own body and inner comment denied | header + body agree: this partial owns the FOREGROUND half; the plate's darken is composed at the element (`dock/dock.css:124` → `glass/veil.css:48`) |
| 2 | `tokens/glass.css:161-171` | cited the `@container style(--glass-backdrop: light)` bright bucket round 1 deleted | states the unconditional dock re-point and WHY no conditional one can differ (a style query cannot self-match) |
| 3 | `tokens/glass.css:190-197` | `--glass-plate-dock` declared with ZERO `var()` readers — the R-1 orphan shape | STRUCK, with the strike recorded in place and the live ink rung (`--glass-veil-dock`) named |
| 4 | `tokens/glass-fx.css:153-174` | the rim rationale over-claimed per-element reach | bounded: the level term re-resolves only at `:root`-scoped brackets (the a11y path); an element-scoped `--glass-level: 0` does NOT re-resolve it — the substitution trap `glass/surface-axis.css` documents |
| 5 | `CURE-CUT.md` verify block | `140 passed \| 2 expected fail (142)` | `142 passed \| 1 expected fail (143)` — re-run on the round-1 tree before any re-cure edit |

---

## R-6 (LOW) — the four arm repairs

**A-5's white matcher could not match two of its own alternations.** `\b(?:white|#fff|#ffffff)`
— a word boundary before `#` requires a word character to its LEFT, and every live
spelling is preceded by a space or a comma, so only `white N%` was ever censused. Fixed
at `tests/styles/glass-subtlety.test.ts:451-476`: the boundary belongs to the keyword
alone, and the legacy comma form `rgba(255, 255, 255, a)` is covered (no live occurrence
today — arm hygiene). **The detector is now checked against itself** at `:477-495`:
synthetic values in all six spellings, plus two negatives, so a matcher that stops
matching reds instead of greening.

**The F-7 pairing arm's scope is recorded beside it** — `:253-268`. It sees a surface only
where ONE flat rule body spells BOTH names literally. Correction to the dispatch's
parenthetical, made on the trace rather than parroted: the two RULED dispositions are NOT
symmetric. Row 5 (`button/styles.css:40-45`, floating ink under the deep kernel) declares
both in one body, IS visible, and is exempted BY NAME (`:283-288`). Row 6 (the dock) is
invisible on BOTH legs — its ink is a `calc()` lerp of two consumer tokens declared in
`dock/styles/shell.css:122-124` and resolved on the plate, and its radius is an
indirection (`--dock-surface-blur`) — so its exemption is carried by the footprint table
and the surface's own comment, and the arm can neither green nor red on it.

**F-B3's nested-plate arm resolves ONE hop** — `:599-628`. A component counts as a plate
if its own comment-stripped source names a rung class or calls the library's one surface
resolver (`resolveSurfaceClass`, which returns `glass-${tier}` by construction) — which is
where `DialogContent`'s computed `contentClass` actually resolves its rung, with no render
needed. Result, measured: 17 plate-rendering components resolved (was 0 — the arm read
literal `class` attributes only), and `CommandDialog.vue` now reads as
`DialogContent > Command` at depth **2** against a bound of 2. The arm sits AT its bound
instead of at 1 with no way to reach it. The hop is asserted live at ~~`:621-627`~~
[RC-5 2026-08-04: `test:634`/`test:636` — the earlier cite drifted under this file's own
edits] so a future refactor cannot quietly un-wire it. Scope stated both ways in the comment: one hop
only (a plate two components deep is still invisible), and a component counts as one plate
wherever the plate sits in its template, so a slot that does not land inside it is
over-counted — over-counting can only make a bound RED, which is the correct direction.

**The unlayered scoped exception is recorded AND cured AND armed.** Recorded:
`glass/grasp.css:48-54` states it as the one hole in the outrank-by-specificity doctrine
and names `Slider.vue`'s release-window rule. Cured, because the R-2 live-ink cure DID
make it clobber the register — `Slider.vue:510` declares `transition` on the very element
the register releases on, from an UNLAYERED scoped block, so the register's own
`--glass-veil-rung` transition (`grasp.css:195`) loses there and the ink would have
stepped 0.6 → 1 in one frame under a blur still fading. The shorthand now COMPOSES the
channel off the register's own clock (`Slider.vue:513`) and drops the dependent
`background` leg. Armed at `:1023-1050`, MUTATION-CHECKED: removing the channel reds it.

---

## R-7 (MECHANICAL) — the build

`npm run demo:dist:build` run as the last act after every edit above (`✓ built in 1.13s`),
so `tests/gates/boot-graph.test.ts:530`'s freshness arm measures a `dist-demo/` newer than
every source it is built from at the driver's commit. The freshness arm walks `demo/` and
`src/` only, so this record file — written afterwards — is not one of its inputs.

---

## Undeclared deltas, disclosed

1. **`Slider.vue:541-546` prose corrected** (not named by any R-item, but made false by
   R-1): the held-state comment said `data-held` fires on "any sibling drag the dock
   observes". It is now this slider's own hand and nothing else, so the sentence was a
   live falsehood about the code beside it.
2. **Cross-reference comments added at the two unstood-down former sites** —
   `glass/material.css:98-107` and `glass/grain-overlay.css:26-35`. R-3 mandates the
   generic law; this puts it where the next host author actually reads, and both files are
   inside the seat's edit surface. No selector or declaration changed in either.
3. **The R-6 pairing-arm note corrects the dispatch's "both are invisible to it"** to
   one-of-two, on the trace above. Stated rather than silently written the other way.

## Routed — out-of-fence prose remainder (R-5 #3)

`--glass-plate-dock` is struck at its declaration, and every `var()` reader is gone. Three
PROSE sites still cite the dead name and sit OUTSIDE this seat's edit surface; each is a
citation, none is a live read, and none affects paint:

| site | text | why not touched here |
|---|---|---|
| `src/styles/tokens/sizing.css:379,384` | "the dock's own `--glass-plate-dock` substrate" / "The +ΔL above `--glass-plate-dock`" | EXPLICITLY WALLED (row-68/Q-4 committed work) |
| `src/styles/glass/surfaces-pager.css:34` | "The dock `--glass-plate-dock` self-re-point precedent" | outside the enumerated edit surface |
| `src/styles/glass/defined.css:46` | "the `--dock-scale` re-declare / `--glass-plate-dock` pre-substituted-seam precedent — CLAUDE.md …" | outside the enumerated edit surface; ALSO cites the deleted CLAUDE.md |

## Verify gate — the re-cure's own

```
$ npx vue-tsc --noEmit
(clean, exit 0)

$ npx vitest run tests/styles
 Test Files  15 passed (15)
      Tests  146 passed | 1 expected fail (147)

$ npx vitest run tests/components
 Test Files  130 passed (130)
      Tests  876 passed (876)

$ npx vitest run tests/gates
 Test Files  6 passed (6)
      Tests  57 passed (57)

$ node scripts/gate-register.mjs
seats:60 active:48 reserved:5 worstCase:53 remaining:7 external:11 bound:7 armOnly:2
unbound:51 drift:1 rosterSha256:dc05df91 violations:0
(byte-identical to the receipt the dispatch pins; the one DRIFT row is #65's, pre-existing)
```

Gates stay at 60 seats. The four assertions added (`censuses white in EVERY spelling`,
`DISCOVERS its hosts from the mounts`, `moves REAL INK on every mounted host`, `keeps the
ONE unlayered scoped exception COMPOSING the register's ink`) are ARMS under the existing
`glass-subtlety` seat, which is why `tests/styles` moves 143 → 147 and the register
receipt does not move at all. `tests/components` also ran clean UNPARALLELED with
`tests/styles` this time, so the round-1 contention flake did not recur.

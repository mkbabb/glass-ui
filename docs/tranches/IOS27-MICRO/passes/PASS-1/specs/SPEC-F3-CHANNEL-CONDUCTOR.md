# SPEC-F3-CHANNEL-CONDUCTOR — coupled clocks off one gesture scalar

verified-model: claude-fable-5 (system-context model ID, verbatim). Synthesize seat, pass 1, 2026-07-18.
Status: ACTIVE. Inputs: REGISTRY §F3, MARKS (whole), F3 digest + conductor probe, X1/X2/X3 digests.
Tooling: DesignSync reachable this pass (live `list_projects` call; empty project list — noted for
pass-2 component seats).
PASS-2 AMENDMENT (cure seat F3, 2026-07-18, verified-model claude-fable-5): CRIT-F3 cures G1/G2/
G4/G5/G6/G7/G8/G10/G11/G12 landed in place below; MARKS PASS-2 CORRECTIONS (C1–C4) folded in;
the WebKit arm (PROBE-NOTES "PASS-2 SAFARI ARM") is the second-engine evidence. Ledger:
`passes/PASS-2/cures-F3.md`.

---

## 1. Architecture

Desync by coupling constants, never by authored curves. A conductor primitive owns a rack of named
channels per surface, each a follower of the gesture scalar under its own coupling law; the MARKS
choreography falls out of the constants. The pass-1 probe closed the family's riskiest unknown:
four laws, one integrator, zero authored timelines reproduce every MARKS §5/§6 band emergently —
fade/stretch ratio 0.250 against the measured ~1:4, a 117ms empty-medium beat inside the 100–200ms
design band, close-order inversion from per-channel release laws, per-channel interrupt continuity
with the medium persisting across cycles, one joint park predicate, and tempo-invariant ratios.

**The primitive — `useConductor(manifest)`.** Engine-free, `/motion-core`-eligible, one hand-rolled
rAF (semi-implicit Euler spring sub-stepped ×8 + exponential followers — the `useLeadTrail` math),
parks on the joint predicate, PRM seats every channel (the `useRAFLoop` chassis is disqualified —
it pauses under PRM instead of seating).

```ts
const c = useConductor({
  el: surfaceRoot,
  channels: {
    medium:    { law: "cliff",  tau: 0.03, sat: 0.12, close: { hold: 0.25, tau: 0.17 } },
    geometry:  { law: "spring", response: 0.6, zeta: 1.0 }, // per-surface pair — see the register note
    content:   { law: "follow", tau: 0.07, close: { tau: 0.055 } },
    periphery: { law: "follow", tau: 0.07, delay: 0.10, source: "content" },
  },
});
c.scrub(g);            // gesture-live: state = f(position)
c.release(target, v);  // seeds sprung channels with release velocity
c.seat(g);             // instant: mount / resize / PRM
```

**The register note (G1 cured).** The CC geometry pair `(response 0.6, ζ 1.0)` is the pair that
produced every accepted battery number (probe, Chrome 150, WebKit 26.5) — it is a PER-SURFACE
pair, housed at the presets-in-consumers per-primitive-default seam (`springPresets.ts:116–122`,
the ScrubberTimeline precedent): documented local to the consumer, JS-only, never a
`SPRING_PRESETS` row, never a CSS token. `preset: "dock"` names the shipped dock register
`(0.30, ζ 0.82)` — verified on disk, and corpus-true for the dock morph itself (MARKS PASS-2 C2:
f_d 1.91 Hz, ζ 0.82 sit inside the fitted bracket ζ 0.77–0.88 / f_d 1.4–2.0 Hz) — a channel says
`preset: "dock"` only when it means THAT register; at (0.3, 0.82) the CC geometry lands far below
the 583–667 ms gate and rings ~1%. The conductor stays a consumer of the `springPresets`
vocabulary — named presets when a global register fits, documented per-surface pairs through the
per-primitive-default seam when not; no second table either way.

- **Law vocabulary — THREE laws + three modifiers, closed (G5 cured: this is the honest shape;
  "delay" was never a fourth law).** Laws: `cliff` (fast follower + release hold), `follow`
  (first-order lag), `spring` (`springPreset` name or (response, ζ)). Modifiers, each usable on
  any channel where stated:
  - `open:`/`close:` **direction overrides, LATCHED AT DRIVE TIME** (G6 cured): the active
    direction is fixed per channel at each `scrub`/`release`/`seat` call (`target < x` AT THE
    DRIVE), never re-inferred per frame — per-frame inference flips a direction-asymmetric
    spring's (response, ζ) pair at every overshoot crossing. This is the shared F1×F3 intent law
    (AGGLOMERATION §3-1). Probed: the latch row in `check.mjs` matches a latched-reference
    integration to 0 deviation through a 31% overshoot; the pre-cure per-frame code fails it at
    dev 0.19.
  - `sat` **input shaping** (G4 cured — promoted from the prototype into the vocabulary):
    `target_ch = clamp01(g / sat)` — the channel's target saturates at `sat` of gesture travel.
    THE SCRUB-REGIME MEDIUM LAW: under scrub the medium is position-mapped through the first
    `sat` of travel — full blur by g = sat, proportional (and reversible) below it. CC register:
    `sat 0.12` — corpus-grounded: the CC blur completes within ~12% of the open gesture's travel
    (MARKS §5: cliff done ≤12.42 against a pull spanning 12.33→~13.05). A held sub-sat scrub
    shows the medium at g/sat in paint on both engines (WebKit exhibit: 0.8333 at g≈0.10,
    `f3-wk-held-near-closed.png`) — the blur visibly thins under a hesitant finger; adjudicated
    INTENDED (the Q10 position-mapped law: state under the finger is a pure function of
    position; MARKS measured released dismissals only, and the release-regime hold is untouched).
    A fully hand-carried dismissal therefore takes NO release hold and NO empty-medium beat —
    the medium leaves WITH the finger at the fast tracking τ; the beat is release-regime luxury.
    Note for the overlay archetype: N8's softened-onset register may declare a larger `sat`
    (toward 1/φ) per surface — `sat` is the per-surface dial; the CC register is 0.12.
  - `delay` + `source` **follow gating** (G5 cured — the semantics as implemented and measured):
    a WAKE-ARMED DEAD-TIME GATE on the channel's own response, then a chase of the LIVE source.
    NOT a transport delay — the transport reading gives periphery lag ~211 ms, off-band; the
    gate reading gives 130–142 ms, on-band on both engines. Re-arm rules: the gate arms ONLY on
    wake-from-parked; mid-flight retargets never re-arm it (a close-while-awake has no periphery
    delay — adjudicated intended: MARKS measured the rail's ~80–160 ms lag on OPEN only; the
    close leaves as one body, ~170 ms); `seat()` clears it.
  No fourth law without a MARKS-grade measurement — the vacuous-generality fence. A fifth clock
  on a dialog surface is refusal (suffusion F: B-Q6).
- **Channel roles are conventions**: `medium/geometry/content/periphery/light` are documented role
  names with default laws; a typical manifest is ≤5 lines. Depth grading is a per-row GAIN on the
  published geometry value, not a channel — **normalized (G7 cured): ×(1 + 0.2·depthIndex/depthMax)**,
  i.e. deepest/shallowest = 1.20 exactly regardless of row count (MARKS §5 note 3 measured ≈1.22;
  the prototype's normalized form measures 1.20 on BOTH engines, rect-read). The un-normalized
  ×(1 + 0.2·depthIndex) transcribes to +60% at four rows and is wrong.
- **Two regimes, one API**: scrub under gesture, velocity-seeded release after; interrupt = calling
  `scrub` mid-release — every law integrates from live state, so the catch is continuous per
  channel by construction.
- **Tempo**: every time constant ×`motionTempo(el)` at construction; the desync ratios are
  tempo-invariant (probe F).
- **CSS seam (G2 RULED, with the WebKit price card)**: per-channel registered vars (`@property`)
  written on the surface root, registered **`inherits: true`** — the depth-graded rows and the
  reveal-ladder children are DESCENDANTS and must read them. This is the `--scrub-t` subtree
  class (suffusion §3.1-6: "the subtree price is the feature — scoped to the morph root, never
  body"), NOT the `--flex-vel` single-element class; `property-regs.css` is the CONTRAST here,
  not the cover. Honest cost, measured (WebKit 26.5, safari-arm): the per-frame write invalidates
  the surface subtree — baseline 7.3 ms avg frame ramps to 14.7 ms with +240..+960 inheriting
  consumers (halves the achievable VRR cadence) yet holds ≤18 ms worst, zero frames >24 ms — a
  60 Hz budget through ~1000 consumers; forced-recalc proxy 0.72 ms avg. The alternative
  (per-row JS writes keeping `inherits: false`) is REJECTED: N×rows writes per frame, layout
  knowledge re-coupled into JS, and the CSS-only consumer authoring surface lost. Bounds sworn
  with the ruling: the publication root is the surface root, never body/document; the stress
  gate is "no frame >24 ms at ×3 conductors + 960 consumers". Chrome style-recalc ATTRIBUTION
  (devtools trace) stays queued — evidence deepening, not a blocker on the ruling
  (`passes/PASS-2/reverify-queue.md` §F3).
- **The no-second-engine fence, resolved by construction**: the conductor is `useLeadTrail`
  generalized from the fixed {lead, trail} pair to a named rack — same math, same one-rAF/park/seat
  contract; `useLeadTrail` becomes expressible as a two-channel manifest and stays shipped as the
  N=2 primitive. To `SpringProgress`: consumer of the preset vocabulary, never a wrapper — kf vector
  lanes are (ω, ζ)-homogeneous and per-instance `play()` would fork N rAFs. Single-scalar morphs
  KEEP `useDockSpring`; the conductor exists only where ≥2 channels with DIFFERENT laws follow one
  gesture scalar. `useStagger` cascades are not absorbed.
- **Adoption boundary**: gesture-coupled surfaces only — the census is now NAMED with file paths
  (§7, G12 cured). The degenerate no-JS manifest — per-property `transition-duration`/`-delay`
  plus the `--spring-*` `linear()` tokens — is written out in §7 for one-shot surfaces.

**Detents.** The geometry channel's release law owns terminal detents: retargets seeded with
release velocity (the `useDockSpring` re-base idiom or kf `Draggable.snap` at the gesture layer).
The transient mid-detent catch is DEMOTED to a design hypothesis (MARKS PASS-2 C3: the corpus
instance is VOID — collapse #1 was finger-owned constant-velocity crossing the zone with zero
catch, collapse #2 crossed it uncaught at ~6,000 px/s; no measured instance remains, and the
~170 ms constant is a design number, not a corpus fact). The mechanism sketch (a scheduled
weak-well retarget: target the well when the projected path crosses it at speed; retarget onward
at arrival-or-170 ms) is KEPT as designed-affordance vocabulary, unbuilt and ungated — under the
honesty law a gate for it would derive from nothing; it gets a born-RED gate only if a wave
charters the affordance deliberately.

## 2. Mechanism per hallmark

**H1 growth ladder — DEMOTED to consumed (G10).** F3 owns the geometry channel's clock; the
fraction-keyed reveal ladder, the sides-breathe shaping, and the clipped tray are F1
SCALAR-SPINE's authoring surface (its pass-2 demand), consumed by the card manifest — contingent
on the F1×F3 arbitration (AGGLOMERATION §4-4). F3 evidence for the composition exists only at
the CC scale (rows reading the geometry var, depth-graded, both engines); no F3 artifact proves
the H1 card ladder and this spec no longer claims one. The height-mapped principle stands (under
scrub the scalar IS position — the Find My held-height proof).

**H2 overpull compression + arrival register — REWRITTEN to the corrected corpus (G10 + MARKS
PASS-2 C1/C2/C3).** The gesture scalar g extends past the bounds through a saturating rubber-band
map at the gesture layer (the conductor consumes g, never raw pointers — the
`usePointerVelocityField`/`Draggable` seam). What survives measured: the deformation vocabulary —
in the margin a bound-compression channel maps margin depth to one container-level scale (width
−7.8% down, ~−1% up, bottom-anchored; content deforms WITH the container), and the pre-commit
stretch zone is real and ≥70 px video scale (C1 revised it up from ~40 px). What is VOID: the
underdamped overpull close-register (the ζ 0.30–0.65 bracket) — C1 proved the overpull window
contains NO free springback (every candidate was finger-scrubbed; both prior ζ brackets fitted
hand motion). The arrival register is C2's, the one free transient in the corpus: **ζ = 0.80
(bracket 0.77–0.88), f_d ≈ 1.7 Hz, settle ≈180 ms — expressed as `springPreset("dock")`
(0.30, ζ 0.82), on-disk and inside the fitted bracket; no close-law override, no separate bound
register.** Overshoot is VELOCITY-BOUGHT, never intrinsic (~1–2% of travel at a real fling;
≈0.02 px per px/s of crossing velocity) — analytic in the conductor (overshoot iff v₀ > ωₙ·Δ),
no mode switch, no synthetic bounce; the suffusion §6-q2 fence exemption DISSOLVES (the [0,10%]
preset fence stands with room to spare). Direction-asymmetric spring pairs remain vocabulary —
and the drive-time latch (§1) is what makes them safe through overshoot. The rubber-band g-map
ratio stays UNMEASURABLE from this corpus (C1: no touch overlay) — §6 U13.

**H3 lens — F3 owns the CLOCKS, now probed; the BODY is F5's, now evidenced (G10).** A conductor
rack on the tab bar: light = cliff (near-instant charge + wash), geometry = spring (the capsule),
content = follow (label magnification ~5–8% as a content-scale read), periphery = delayed follow
(sibling response). "Light leads, geometry follows" is emergent — τ_light ≪ response_geometry —
never authored: the F3-owned lens-clock probe row (`check.mjs`) runs
{light: cliff τ0.02, geo: spring("dock")} and lands light t90 50 ms against geometry t90 150 ms
(ratio 0.34) — the lead is the constants speaking. One-body corroboration: MARKS PASS-2 C4
overturned the Safari "blink" (the one-body morph is platform grammar in both apps, ~165 ms at
control register), and C5 confirmed direction symmetry + mid-cool re-seat — the velocity-
continuous interrupt the conductor provides by construction. The lens BODY (barbell anatomy,
goo, sibling ≥AA legibility under bloom) is F5's layer contract, now carrying WebKit paint
evidence of its own (safari-arm: 132-frame no-blink burst, arrival 1.150 held ~200 ms,
press→settle 1334 ms, siblings ≥4.5:1) — the conductor supplies clocks only; the F5 boundary is
the arbitration seat's (AGGLOMERATION §3-6).

**H4 material tiers.** The conductor writes; the material reads. The medium channel var drives
overlay OPACITY at constant blur radius (the glass tiers own `backdrop-filter`; a raw per-frame
blur-radius write is fenced — the `.scroll-chrome` hazard note). Tier budgets stay on the shipped
five-rung ladder; light/specular reads gate on the light channel — engagement only, never idle.

**H5 multi-clock choreography.** The family's proof, now on BOTH engines with the §1 manifest
(probe → Chrome 150 → WebKit 26.5):

| test | probe | Chrome 150 | WebKit 26.5 | GATE (printed = gated, MARKS-derived — G8) |
|---|---|---|---|---|
| open: medium t90 | 67ms | 58ms | 67ms | ≤100ms (cliff ≤83 @12fps + 17 display) |
| open: fade t90 | 158ms | 150ms | 158ms | 133–267ms (150–250 ±17) |
| open: geometry t99 | 633ms | 627ms | 638ms | 583–667ms (600–650 ±17) |
| open: fade/stretch | 0.250 | 0.239 | 0.248 | derived-info (φ³ ref 0.236; primaries gate it) |
| open: periphery lag | 142ms | 137ms | 130ms | 63–177ms (80–160 ±17) |
| close: content out | 158ms | 160ms | 162ms | 111–229ms (~170 ±42 ±17) |
| close: empty-medium beat | 117ms | 102ms | 94ms | 63–217ms (floor 80−17; ceiling 200+17) |
| close: medium out | 642ms | 636ms | 630ms | 561–679ms (~620 ±42 ±17) |
| interrupt | medium min 1.000 | 1.0000 | 1.0000 | held across cycles (region g ≥ sat) |
| sub-sat catch | — | — | 0.8333 in paint | medium = g/sat ±0.02 (the §1 scrub law) |
| park | 883ms | 0 ticks | 0 ticks | 0 ticks / 600ms |
| tempo ×1.3 | 0.253 | 0.245 | 0.256 | invariance |Δ| ≤ 0.06 vs base |

Gate bands live in ONE source (the prototype's BANDS block, extracted verbatim by `check.mjs` —
zero drift), each derived from MARKS ± declared quantization; the shown-vs-gated split is gone.
Close inversion is per-channel release law; the beat is the gap between release laws; depth grade
is a row gain (1.20 exact, both engines); every phase is a scrub because every law integrates
from live state.

**H6 momentum facility — F4 OWNS IT, by pass-1 ruling (G11 cured).** AGGLOMERATION §3-4: F4
ENERGY-FIELD is the H6 owner; F3 exposes the `(g, ġ_release)` seam into the field and never owns
tracking. The facility's shape (one element-space kinematics primitive unifying the four in-tree
systems — kf Draggable release window, SpringProgress analytic velocity,
`usePointerVelocityField` v+a chain, `useLiquidFlex`/`writeVelocityWeight` CSS law, per X2 §4)
is F4's pass-2 charter, not this spec's. Components that need momentum WITHOUT choreography
couple to the facility's CSS vars directly; the conductor is only for multi-clock surfaces.

## 3. MARKS acceptance targets

Every §5/§6 band: the H5 table above, REPRODUCED IN PAINT on both engines (Chrome 150 pass 1,
WebKit 26.5 pass 2 — PROBE-NOTES "PASS-2 SAFARI ARM"). Growth asymmetry, ladder, taffy,
compression magnitudes: §2 mechanisms, CSS-band + gesture-layer constructions shared with F1 (the
probe-fitted constants transfer). Arrival register: C2's — ζ 0.80 / f_d 1.7 Hz / settle ≈180 ms,
expressed as the on-disk dock row (0.30, ζ 0.82); the prior two-local-pairs adoption and the
"dock row ruled out as the bound register" line are VOID (MARKS PASS-2 C2 reversed them; the
pin-release register stays INCONCLUSIVE — bounds only, C3). Detent catch: design hypothesis,
ungated (§1 Detents). Everything-is-a-scrub: `scrub()` re-entry at any instant, per-channel
continuity probed and gated at the law bound in both regimes (g ≥ sat at τ0.055; sub-sat at
τ0.03).

## 4. Safari-2026 feasibility

The conductor's hot path is JS-integrated vars + compositor-only CSS consumption — nothing above
`@property` (Safari 16.4) and `linear()` tokens (17.2) is required; scroll-driven timelines are an
optional hybrid for the scrub regime (Safari 26.0/26.4, probe-gated via `supportsCssTimeline`,
U12). The two platform costs are now PRICED on the floor engine (WebKit 26.5, safari-arm): the
inheriting per-frame var write holds a 60 Hz budget through ~1000 consumers (§1 CSS seam — the
G2 ruling's price card), and no nested-backdrop-filter cost cliff appeared at ×3 conductors
(~67 fps, frame gaps ≤24 ms, tile blur intact). Blur-rides-element-opacity is answered in WebKit
paint (ratio 0.0150→0.0037 across the opacity ramp, `f3-wk-blur-ramp.png`). Remaining: Chrome
recalc attribution (queued), and the shared moving-backdrop probe (F5's turf).

## 5. The prototype that proves the riskiest claim

**Riskiest claim: the probe's emergent choreography survives contact with paint — the rack hits the
MARKS bands in-browser, under scrub, release, AND a mid-close catch, with the medium held
featureless between cycles and zero idle rAF after park.** STATUS: built and proven on both
engines (Chrome 150 12/12 pass 1; WebKit 26.5 12/12 pass 2). The battery contract, stated
honestly (G9): battery rows sample per-frame values and certify integrator math; the shipped
PAINT-SIDE SAMPLING MODE re-reads every row from style-engine-resolved values (scrim computed
opacity, row-0 computed translateY inverted, row/rail opacity) and certifies the var→CSS binding
— a typo'd var name fails paint-side where internal sampling would lie; PIXEL truth rides the
screenshot/rect/video artifact set (both engines, in PROBE-NOTES). The paint-side battery run on
both engines is queued (`passes/PASS-2/reverify-queue.md` §F3) — this seat owns no browser.
Gate bands: the BANDS block, one source, printed = gated (G8).

## 6. Open gaps

| # | gap | status (pass 2) |
|---|---|---|
| U9 | adoption census | CLOSED — §7, named components with file paths + manifests + the degenerate manifest |
| U10 | per-frame var-write cost, N conductors live | PRICED (WebKit differential, §1 CSS seam ruling); Chrome recalc ATTRIBUTION queued (reverify-queue §F3) — deepening, not blocking |
| U11 | light channel ownership — conductor clock vs F5 body | OPEN by design — the pass-2 arbitration seat owns the boundary (AGGLOMERATION §3-6); this spec supplies clocks only (§2 H3) |
| U12 | hybrid CSS-timeline scrub (threaded) with the JS rack taking over at release | DEFERRED EXPLICITLY to a named pass-3 wave (working name W-F3-SDA) — optional path, `supportsCssTimeline`-gated; the safari-arm F2 U-R1 result (SDA binds + resamples exactly on WebKit 26.5; threading TOOL-DEFER) is its entry evidence |
| U13 | overpull rubber-band ratio (g mapping, upstream of the rack) | BLOCKED-BY-CORPUS — MARKS PASS-2 C1: unmeasurable without a touch-indicator recording; re-opens when such a corpus exists |
| — | manifest authoring bar: a consumer states ≤5 lines or the family has dissolved into "animations, again" | HELD — every §7 manifest is ≤5 lines, dialog included |

## 7. The consumer census (U9 closed — G12)

The conductor mounts ONLY where ≥2 channels with DIFFERENT laws follow one gesture scalar. The
real library, censused (all paths repo-relative from `src/`):

| surface | files | today | conductor manifest (≤5 lines each) |
|---|---|---|---|
| GlassDock (grow-to-card) | `components/dock/GlassDock.vue`, `components/dock/composables/useDockMorph.ts` + `useDockSpring.ts` | single-scalar `SpringProgress` via `useDockSpring` — STAYS until the grow-to-card band lands (the fence: one scalar, one law = no conductor) | `{ medium: cliff(τ.03, sat.12, close hold), geometry: spring("dock"), content: follow(τ.07), periphery: follow(τ.07, delay.10, src content) }` |
| Drawer (peek/half/full scrub body) | `components/drawer/DrawerContent.vue` (house `SpringProgress` snap engine, `--glass-drawer-t`) | single-scalar snap fraction — the first adopter: the reveal ladder + scrim need the desync | `{ medium: cliff(τ.03, sat.12, close hold), geometry: spring(per-surface), content: follow(τ.07, close τ.055) }` |
| Dialog / side sheet + scrim | `components/dialog/DialogContent.vue`, `components/dialog/sheet-motion.ts`, `components/dialog/ModalOverlay.vue` | `scrimOpacity(p)` is a DEGENERATE one-scalar sync by construction ("reads the SAME live scalar — no desync") — exactly the state N2's three-clock open replaces | the three N2 permutations are three named ≤5-line manifests (destructive / form / media): `{ medium: cliff(τ.04), content: follow(τ.07, delay per permutation), geometry: spring(per-surface) }` |
| CommandDialog (palette open, depth-graded rows) | `components/command/CommandDialog.vue` | overlay enter/exit, no channels | dialog-form manifest + the depth row gain (§1) |
| SegmentedTabs lens bar | `components/tabs/SegmentedTabs.vue` + `composables/motion/morph/useSelectionIndicator.ts` | one-body indicator, single clock | the H3 lens rack: `{ light: cliff(τ.02), geometry: spring("snappy"), content: follow(τ.07), periphery: follow(τ.07, delay.08, src content) }` — body stays F5's |
| ExpandableContainer (edge-drag) | `components/expandable-container/ExpandableContainer.vue` | CONDITIONAL — joins iff its edge-drag gesture ships (suffusion H); until then degenerate | drawer manifest minus medium |

**NOT consumers, named so the boundary is real:** Carousel (`components/carousel/useCarousel.ts`
— single-scalar swipe + snap; velocity inheritance is the gesture layer's, no second law);
HeaderRibbon (`components/header-ribbon/HeaderRibbon.vue` — scroll-mapped ladder, F1/F2
territory); Toast/Popover/DropdownMenu/Tooltip/Accordion one-shots — the degenerate manifest.

**The degenerate no-JS manifest, written out (a consumer can now find it here):** one-shot
surfaces express the same desync with zero conductor —

```css
.surface  { transition: scale var(--geo-dur) var(--spring-smooth); }   /* geometry clock  */
.content  { transition: opacity calc(var(--geo-dur) / 4) ease-out; }   /* fade ≈ stretch/4 */
.periph   { transition: opacity 150ms ease-out 100ms; }                /* dead-time gate   */
/* close: swap the durations per direction on a [data-closing] flag — direction asymmetry */
```

`--spring-*` `linear()` tokens supply the spring shapes (Safari 17.2+). The line: a surface that
never scrubs and never inherits velocity takes the CSS manifest; the moment a finger owns it
mid-flight, it graduates to the conductor. Migration order: Drawer → Dialog/N2 → CommandDialog →
dock grow-to-card wave → SegmentedTabs (with F5).

Note for round 2: F3's rack and F1's follower bank are the same kernel reached independently —
first-order direction-asymmetric laws off one gesture scalar, probe-verified twice against the same
MARKS bands with compatible constants. The routes differ on where the scalar's physics lives
(conductor-external gesture layer vs spine-internal regimes) and on the authoring surface (manifest
vs transfer bands). The merge, if any, is round 2's call; this spec keeps the family's center —
coupling constants as the ONLY desync authority — intact.

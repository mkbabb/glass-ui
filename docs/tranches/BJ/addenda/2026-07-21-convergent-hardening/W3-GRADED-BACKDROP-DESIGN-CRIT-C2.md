# MATERIAL W3 graded-backdrop design judgment — C2 Sol critic

**Seat:** delegated independent Sol x-high design/judgment critic. The exact backend model identifier
is not exposed in this task context; this report therefore records the delegated Sol x-high role and
does not counterfeit a model ID. It must not be relabelled as Luna, Opus, Fable, DesignSync, Browser,
or implementation evidence.
**Date:** 2026-07-22 (America/New_York)
**Scope:** formation only. No product source, test, demo, package, consumer, workflow, prior formation
file, or evidence artifact was edited.
**Binding design verdict:** **ADOPT / REDRESS.** Keep the public `backdrop="graded"` semantic and the
three `--glass-halo-*` names, but do **not** ratify their current geometry, values, compositing, or
tests. Replace the viewport-centred field with one measured, bounded, surface-concentric **focus
apron**; retain a quiet whole-field modal veil; hand the Dialog's backdrop sample from its plate to the
apron atomically; use MATERIAL W2's fixed 14px stage-effect role; and keep mask geometry static. The
roster remains 92. `BJ.W-IMMERSIVE-SCRIM` is not minted. If the exact Safari/Chromium paint and cost
gates below fail, ADOPT fails closed to ASK-26 **DECLINE**, which then mints row 93 and refreezes.

## 1. Authority, pin, and movement fence

The judgment read the complete MATERIAL W3 owning prose, ASK-26 and PLAN routing, the current
registry/gates/challenges/coordination/roster addenda, the F49/F50 dossier and stills, the amended iOS
law 1, the exemplar material reconciliation/critics, and MATERIAL W2's third adjudication. Important
input digests at read time were:

| input | SHA-256 |
| --- | --- |
| `waves/BAND-MATERIAL.md` | `21d0e912779fa48b2ea695d75fbc92faeede9491f34e19e1d7676d903cb78581` |
| `ASK.md` | `d4614fcc8b172f7470353cd74c5bf2ec59ce5726e32781f8095e23207ac45fe4` |
| C2 `REGISTRY.md` | `da317ce99beb779da0de46b298ad54d3f7d8f6feee6de7affdbbb6cf8b9d202a` |
| C2 `GATES.md` | `163a5dc626f80c69d2681a0d4b1771124a34c118bbbdae8c126db9f488490ade` |
| C2 `CHALLENGES.md` | `76f2d516fcc93130c5c275362aa9b44255dfa77a2768808b3d749de3c45e905a` |
| C2 `ROW-CHALLENGE-MATRIX.md` | `3364af68b1b4376247ada6abc93d8fd2fe2fff215a5d0fe97b4f1e1debeac9b0` |
| C2 `UNTOUCHED-WAVES-CHALLENGE-C2.md` | `1516c3a1fb643f5960c883317a262c9dbc52d502a0c7661025035bc26d34849e` |
| C2 `EXEMPLAR-RECONCILIATION.md` | `ba8441522aad3bd539eb8ded4c099e7278573ff7ffce8cc64b6c6c9eb6ce49e0` |
| C2 `EXEMPLAR-CRIT-MATERIAL-C2.md` | `3c0ae38c3c496d24393db802d230112824c0c11d25bcf141f7202b437b165ee4` |
| W2 third adjudication | `acaa9cae8b5fbde6a9f3ed6c70ef71ff41d89f0df19a5df3f95c127a090cea29` |
| amended `IOS27-CODEX.md` | `807b4949da222f8428935c2f2301d4779dfe9e08c790f42ccb8eb2ed9989d22a` |
| F49 / F50 stills | `05275f5f…` / `4660e58b…` |

The exact committed source pin is:

```text
commit c0a8981486e37d60fad9fd74b441ad4b2d39e417
tree   a2c062f39f838bdbf6dacfb3bd727a5b8cc6dca3
parent d75885144cf1c975b27467851d9511c88f855d2c
date   2026-07-22T03:03:32-04:00
name   @mkbabb/glass-ui@7.0.0
```

At 2026-07-22T03:17:13-04:00 the sorted porcelain digest was
`f58fdc19ec58d9ae0108d1a597fbdd4963fca604556b22e5eabb5a1ab9d300e2`. The working tree was dirty,
including concurrent W2 edits to `src/styles/tokens/glass.css` and
`src/components/drawer/styles.css`. Every source claim below was therefore re-read with
`git show c0a8981:<path>`; no dirty product byte receives credit. The most relevant pinned blobs are:

| file | blob |
| --- | --- |
| `src/components/_shared/axes.ts` | `1b112f0937c1ace972489b8eb67a3a66e249e80a` |
| `src/components/dialog/DialogContent.vue` | `dcafdb6590502dbb823b502f93aaaee09024ee37` |
| `src/components/dialog/ModalOverlay.vue` | `1f6f6cbe947b71f89ab3ef6eb9eed21579722de6` |
| `src/components/dialog/placement.css` | `17cbc696f7821ddf28852a219e9044b8b89a1c2c` |
| `src/components/drawer/styles.css` | `2fb536da5c6dd08a69dce0487af0060fe059f8f7` |
| `src/styles/tokens/glass.css` | `a240eaba5f9d834975b9ca3dfedffcbcf2ade442` |
| `tests/components/ui/dialog/graded-backdrop.test.ts` | `ed148bb5ebf92cd366bf44b0cf73ce27cb6bc506` |
| `tests/components/ui/dialog/dialog-graded-edge.test.ts` | `e196f42b9de71872aec5915e8a353b5adae86a88` |

No supported in-app Browser session or DesignSync surface was available to this seat. The stills were
inspected at original resolution; there is **zero live Safari/Chromium acceptance** in this report.
That absence is why ADOPT is a precise design ruling plus a born-RED implementation contract, not a
paint-green claim.

## 2. Present-source truth: the experiment is real, but its description overclaims

At `c0a8981`, the public axis is `scrim | graded` (`axes.ts:62-64`). A centred Dialog can pass the axis
to `ModalOverlay`; graded removes the normal blur and scrim class, mounts one full-viewport child, and
marks the overlay `data-backdrop="graded"` (`ModalOverlay.vue:43-49,75-100`). The child uses one
20px blur plus overlay saturation, a fixed two-axis mask based on one 13rem half-extent and one 7rem
falloff (`placement.css:142-202`; `tokens/glass.css:210-225`). The flat stage dim and immersive 14px
sample are excluded whenever the marker exists (`drawer/styles.css:330-340,375-381`).

That implementation has six material defects which static source can already prove:

1. **It does not follow the box.** No content rectangle reaches the overlay. Both mask axes are fixed
   around the viewport centre. One 13rem half-extent cannot follow a 32rem-wide low Dialog, a 24rem
   narrow Dialog, and a tall scroll Dialog simultaneously.
2. **Its sampling area is unbounded.** The child is `position:absolute; inset:0`; masking changes
   composited visibility, not the fact that the backdrop-filter element spans the viewport. This
   contradicts the exemplar reconciliation's explicit rejection of unbounded backdrop area.
3. **It double-samples the modal core.** The halo samples at the overlay while the centred content
   still resolves `glass-floating`, whose pinned rule independently applies
   `backdrop-filter:var(--glass-blur-floating)` (`DialogContent.vue:237-247`; `ladder.css:139-154`).
   The side-sheet FORM 1 correctly disables its host sample; the centred FORM 2 does not.
4. **It leaves the far modal field visually actionable.** Graded drops the whole-field dim as well as
   the whole-field blur. Far content remains sharp and undimmed although modal semantics make it inert.
   The result is a local special effect, not a truthful modal hierarchy.
5. **Its accessibility fallback can become no scrim.** Reduced transparency and forced colors set the
   halo to `display:none`, while the `:not([data-backdrop="graded"])` selectors still exclude both
   flat stage arms. Hiding decoration must not erase the visual modality barrier.
6. **The tests prove source vocabulary, not material.** They pin 20px/13rem/7rem/34px, selector text,
   and node count. They do not prove real box alignment, bounded paint, one sample per pixel, hierarchy,
   reduced-transparency fallback, transmission, or Safari paint.

Consumer truth is narrower than the prose implies. `/containers/dialog` contains the one real graded
story (`DialogContent stage="immersive" :backdrop="dialogBackdrop"`). `CommandDialog` forwards only
Dialog-root props and `surface`; it cannot request `stage` or `backdrop`
(`CommandDialog.vue:17-33`, `command/types.ts:19-22`). Drawer has its own stage contract and never sets
the marker. Side-placed `DialogContent` has a separate always-on FORM 1 edge sampler. Popover does not
consume this axis. The token comment's second ENGAGE-AFFORD consumer remains false.

## 3. Design thesis: a focus apron, not a glow puddle

Glass-ui's subject is not “iOS clone.” It is a warm-cream, softly concentric instrument language for
interfaces that must stay readable over living scientific and chromatic substrates. The page behind
an overlay is evidence, not wallpaper: enough low-frequency structure should survive to preserve
place, while high-frequency detail recedes so the current decision becomes dominant.

The one signature behavior W3 is allowed to spend boldness on is therefore a **focus apron**:

```text
far page: quiet warm veil, spatial identity intact, no blur sample
                       ↓ 60–85px fixed falloff
             ┌───────────────────────────┐
             │  locally resolved frost   │
             │   ┌───────────────────┐   │
             │   │  warm Dialog body │   │
             │   └───────────────────┘   │
             └───────────────────────────┘
```

The apron is measured from the actual surface, bounded to the surface plus its falloff, and owns the
one local backdrop sample. The Dialog body keeps its warm tint, deft radius, restrained rim, shadow,
and content, but an explicit graded-ready owner rule suppresses its own second sample after the apron
is ready. A low whole-field veil
preserves modal truth. Nothing shines, sweeps, pulses, or glows at rest. “Breath of Life” is the
cause-aware handoff from ordinary plate to settled apron, not autonomous decoration. W3 makes no
false Movement-of-Momentum claim; the existing overlay director owns movement and the medium shares
its scalar without inventing another clock.

This is a declared Glass divergence. F49/F50 show a horizontal attention band behind a discrete
four-step control, not a modal and not continuous Slider evidence. Their useful lesson is bounded
secondary focus. `X-GRADBLUR`/`V-ALENS` retains the interaction-following attention field; W3 does not
duplicate it. The W3 focus apron is static environmental staging for a modal surface.

## 4. Four materially distinct hypotheses

### H-A — ADOPT the current viewport-centred axis product

**Prototype.** One full-viewport plate; fixed `r=20px`, `h_x=h_y=13rem`, `b=7rem`; mask
`m(x,y)=s_x(x)s_y(y)` around viewport centre; no far veil.

**Why it is tempting.** One DOM child, no layout observer, current API preserved, one CSS
`backdrop-filter`, and the corners are softer than a uniform scrim.

**Adversarial result: REJECT.** It is box-shaped only by coincidence on one story. The same square
core over-frosts short Dialogs and under-covers wide ones; the element remains viewport-sized; the
Dialog core is sampled twice; far sharp content competes with a modal; PRT/forced-colors can erase the
scrim; and the test suite rewards literal preservation. It reads as a generic “spotlight” effect and
does not justify three public geometry tokens.

### H-B — ADOPT an attested three/four-band progressive blur curtain

**Prototype.** Three or four full-width masked plates with fixed radii, e.g. `r, 2r, 4r`, nested over
the 60–85px directional band. The strongest plate is nearest the surface; each farther plate is
narrower in effect. No radius animates.

**Why it is tempting.** This is closer to amended iOS law 1's directional band and can approximate a
true spatial blur-radius gradient rather than merely fading one blurred image.

**Adversarial result: REJECT for W3.** It multiplies backdrop samples, creates WebKit seam/order risk,
increases fill cost, conflicts with the one-sample-per-body canon, and still imports a nonmodal
control's directional anatomy into every modal. It is an appropriate disposable mechanism study for
the already-seated `X-GRADBLUR` attention lens, not a public Dialog default or a second W3 facility.

### H-C — ADOPT/REDRESS as a measured, bounded, one-sample focus apron

**Prototype.** Let `R` be the settled Dialog border box, centre `(c_x,c_y)`, half extents
`(q_x,q_y)`. Let `g` be the public core clearance and `b` the falloff. The apron element is bounded to
`R ⊕ (g+b)`, clipped by the viewport. Its static mask is the current economical axis product, but its
hold extents come from the real surface:

```text
h_x = q_x + g
h_y = q_y + g
s_x = 1 - smoothstep(h_x, h_x + b, |x - c_x|)
s_y = 1 - smoothstep(h_y, h_y + b, |y - c_y|)
m(x,y) = s_x * s_y
```

For page pixel `C`, warm scrim ink `I`, far alpha `a_f`, near alpha `a_n`, and W2 stage blur `B_r`:

```text
F = mix(C, I, a_f)
H = mix(B_r(F), I, a_n)
O = mix(F, H, m)
0 < a_f < a_n <= a_flat
r = 14px * --glass-level at the W2 default
```

The Dialog body consumes `H` with tint/rim/shadow and `backdrop-filter:none` once the apron is ready.
Before readiness, the ordinary Dialog sample remains active. Readiness flips apron visibility and
host sampling in one style commit, so no frame contains zero samples or two settled samples.

**Adversarial result: SELECT.** It retains the user's useful experiment, gives the library one
memorable environmental behavior, preserves modal hierarchy, bounds cost, consumes W1/W2 instead of
minting a new radius/blur ladder, and generalizes across actual Dialog sizes. It is warmer and quieter
than the photographed white stadium. Its risk—geometry registration and WebKit mask truth—is bounded,
observable, and allowed to fail closed to DECLINE.

### H-D — DECLINE and keep only W2's flat 14px immersive scrim

**Prototype.** Strip `backdrop="graded"`, all `--glass-halo-*`, FORM 2, and its tests; retain a
whole-field warm dim plus W2's fixed 14px blur; mint `BJ.W-IMMERSIVE-SCRIM` row 93.

**Why it is tempting.** Smallest runtime surface, clearest modal hierarchy, no geometry observer, no
mask-composite dependency, and the strongest cost predictability.

**Adversarial result: PASSING FALLBACK, not selected.** It is honest and preferable to H-A, but it
throws away a bounded capability that directly answers the user's “experiment and judge” order and
makes every immersive overlay a uniform slab. H-C earns one implementation attempt because its boldness
is concentrated, its fallback is explicit, and it reuses existing owners. If H-C fails either target
engine, the bounded-area budget, or modal hierarchy, H-D fires immediately; there is no half-adopted
third state.

## 5. Adversarial comparison

| criterion | H-A current | H-B layered band | H-C focus apron | H-D decline |
| --- | --- | --- | --- | --- |
| substrate transmission | local but often double-mushed | graded, but multiply sampled | one local resolved sample; far identity survives | uniform resolved field |
| hierarchy | far page sharp/competitive | depends on separate veil | quiet far veil + stronger local separation | strong but flat |
| warm-cream language | generic dark spotlight | exemplar-like, easy to over-design | warm ink + restrained body; one signature | safe, least distinctive |
| exact box relation | false fixed square | directional, not box-led | measured content geometry | not applicable |
| one-sample rule | violated at modal core | violated by construction | explicit atomic sample handoff | one flat sample |
| reduced transparency | current no-scrim hole | needs separate fallback | opaque/solid veil; no blur; same semantics | straightforward |
| PRM | static, but stage semantics unclear | static masks | no mask/radius motion; instant semantic state | instant stage state |
| Safari honesty | current source claims only | highest seam/composite risk | one standard mask pair; must paint in Safari | strongest |
| cost | viewport-sized sample | multiple broad samples | measured bounded sample; zero settle loop | one viewport sample |
| nested overlays | fixed centres collide | plate explosion | instance-owned geometry/context; no document fallback | instance-owned flat stage |
| Dialog | one story only | overbuilt | selected real receiver | valid fallback |
| Drawer | accidental coupling risk | poor fit | retains its own edge/stage owners | retains own stage owner |
| Command | cannot request it | would require API invention | explicitly excluded | unchanged |
| Breath of Life | decoration without cause | spectacle risk | cause-aware material handoff; no idle loop | quiet but less expressive |
| parsimony | small code, false contract | too many plates | one observer seam + one plate | smallest |

## 6. Binding ADOPT/REDRESS contract

### 6.1 Public semantic and token contract

- Keep `BACKDROPS = ["scrim", "graded"]` and `DialogContent.backdrop`. Default remains `scrim`.
- Keep the three public names, but correct their 8.0 meanings and ledger the clean break:
  - `--glass-halo-blur`: the apron sample radius; its default aliases W2's private stage-effect
    radius, mandated there as 14px at `--glass-level:1`. The use site multiplies by
    `--glass-level`; it has no saturation or brightness companion.
  - `--glass-halo-core`: **clearance outside the measured surface border box before falloff begins**,
    defaulting to `var(--radius-dialog)`. It is no longer a 13rem viewport-centred half-extent.
  - `--glass-halo-bloom`: the mask falloff distance, initial default `5rem` and paint-tunable only
    within the amended 60–85px comparator band.
- The tests assert these relationships, not the literal values `20px/13rem/7rem/34px`. W2 owns the
  14px source; W1 owns `--radius-dialog`; W3 must not copy either number into a second canon.
- `scrim` and `graded` remain material choices, not browser capability names. Safari and Chromium get
  one visual language.

### 6.2 Geometry and compositing

- Register the actual centred content element through the instance-owned scene-staging context. No
  `document.querySelector`, global “latest Dialog,” or root fallback is allowed.
- On open and the house resize-observer seam's delivery, write private centre/half-extent variables
  to that instance's scrim. Clamp the bounded halo box to the viewport. Disconnect on close/unmount;
  do not mint a second observer abstraction.
- The halo element's painted/sampled bounds are `surface + 2*(core+bloom)`, not `inset:0`.
- The parent overlay retains a low whole-field warm veil. The local apron has a stronger but still
  subordinate dim. Exact alphas are paint-tuned; the binding relation is
  `0 < far < near <= flat-scrim`, with no zero-far modal arm.
- In ready state, one Dialog-owned selector overrides the centred `.glass-floating` host's actual
  `backdrop-filter` to `none` while retaining warm tint, rim, grain/accessibility behavior, and shadow.
  Do not pretend `--glass-cell-backdrop-filter` controls that host: at the pinned source the floating
  rule reads `var(--glass-blur-floating)` directly. The apron is the one backdrop sample under it. The
  seating state keeps the ordinary Dialog sample until the atomic handoff.
- The current side-sheet FORM 1 already disables its host sample. Preserve that one-sample behavior,
  but separate its descriptive name and tests from the ASK-26 centred-axis decision so a later W3
  decline cannot accidentally delete a valid sheet mechanism by a broad `glass-halo` grep.
- Nested Dialogs own separate contexts and geometry. Opening an inner Dialog must not move, resize, or
  release the outer instance's apron.

### 6.3 Motion, Breath of Life, and Momentum

- Blur radius, mask stops, and apron bounds do not animate. There is no rAF geometry loop and no idle
  breath.
- The apron opacity uses the existing overlay/stage lifecycle. It may lead or trail the Dialog only
  through that owner's named channel order; W3 adds no independent spring, duration, or easing.
- The seating→ready sample handoff is atomic. Reopen/cancel invalidates stale observer callbacks.
- Under PRM, semantic state commits immediately; the static apron/veil may remain because reduced
  motion is not reduced transparency. Under reduced transparency, the blur disappears and an honest
  opaque/translucent veil remains. Forced colors uses system colors and no decorative halo.
- W3 does not claim velocity continuity from a static material. If later source-continuous motion
  moves a Dialog, the motion owner supplies geometry; W3 remains a bounded medium carrier.

### 6.4 Applicability: real components only

| receiver | ruling |
| --- | --- |
| `/containers/dialog` → `DialogContent` Backdrop story | **Primary W3 receiver.** Add short/tall/wide and content-resize cases on the existing structured shell field; do not create a showcase-only component. |
| `/containers/sheet` → side-placed `DialogContent` | **Regression receiver only.** Preserve one edge sampler, stationary plate, scroll-region reach, and all four placements. It does not consume centred `backdrop="graded"`. |
| `/containers/drawer` → `Drawer`/`DrawerContent` | **Not a graded receiver.** It retains W2's detent/stage effect and its own evidence. No `data-backdrop` axis is smuggled onto Drawer. |
| `/containers/command` → `CommandDialog` | **Not a receiver at current public contract.** Do not add stage/backdrop props just to raise adoption count. Its paint must remain unchanged. |
| `/containers/popover` and hover/menu family | **No W3 rollout.** Interaction-following attention belongs to existing `X-GRADBLUR/V-ALENS`; overlay motion belongs to the exhale/choreography owners. |

The second ENGAGE-AFFORD consumer comment is deleted or rewritten as single-consumer-held. No
consumer is invented to defend the token cohort.

## 7. Born-RED and mutation matrix

All rows below must fail on the pinned pre-redress source or on an explicit restoration mutation.

| id | detector / mutation | required RED |
| --- | --- | --- |
| W3-R1 | restore fixed `13rem` half extents and move a wide/tall Dialog | mask hold no longer tracks all four measured surface edges |
| W3-R2 | restore `inset:0` halo | sampled element equals viewport instead of bounded apron |
| W3-R3 | leave `glass-floating` backdrop active after apron ready | core has two effective backdrop samples / stronger edge-energy loss than one-sample control |
| W3-R4 | hide apron before enabling ordinary content sample, or reverse the handoff | at least one painted frame has zero sample or settled double sample |
| W3-R5 | set far veil alpha to zero | sharp far content competes with the modal and visual modality no longer matches inertness |
| W3-R6 | restore `display:none` halo while flat arms remain gated under PRT/forced colors | modal paints no honest visual barrier |
| W3-R7 | restore `20px` literal or omit `--glass-level` | W2 relationship breaks; level 1/.3/0 no longer yields 14/4.2/0 |
| W3-R8 | restore saturation/brightness on the stage apron | local field shifts toward shiny/chromatic material rather than scene separation |
| W3-R9 | animate blur radius, mask stops, or bounds | compositor/performance and PRM detector fails |
| W3-R10 | replace one plate with three stacked backdrop samples | sample-count and cost detector fails |
| W3-R11 | drop the `-webkit-mask-composite` arm or make Safari use a different skin | Safari paint/fallback parity fails |
| W3-R12 | use document query/global latest element | sibling/nested Dialog ownership test moves the wrong apron |
| W3-R13 | keep a stale `ResizeObserver` callback after close/reopen | old generation rewrites the live instance's geometry |
| W3-R14 | auto-apply graded to Drawer/Command/Popover | public-contract and unchanged-receiver snapshots fail |
| W3-R15 | replace frost with an opaque cream patch of similar mean luminance | structured substrate region identity collapses while declarations still look “warm” |
| W3-R16 | keep literal-mirror tests or omit the 7→8 migration ledger | GATES W1/public-8.0 contract remains RED |
| W3-R17 | delete/rename the side-sheet edge by a broad cohort strip | `/containers/sheet` four-side glass regression fails |
| W3-R18 | publish another changed artifact as `7.0.0` | immutable package/consumer fixture fails |

## 8. Exact receiver and browser evidence

Terminal W3 evidence is one pinned candidate, not a moving HMR session. The receipt records commit,
tree, clean/dirty status, source SHA set, built CSS SHA set, package integrity, engine versions, viewport,
color/accessibility modes, DPR, and every PNG/trace/probe digest.

### Required capture matrix

- Engines: current production Chromium and current Safari/WebKit, same candidate CSS and same script.
- Viewports: 390×844 at DPR 1 and 3 where available; 1440×900 at DPR 1 and 2.
- Modes: light, dark, PRM, reduced transparency, forced colors where the engine exposes it.
- Dialog states: closed baseline; first open before readiness; atomic ready; settled; content resize;
  keyboard-focus traversal; close; immediate reopen; nested outer+inner; scrollable tall body.
- Comparators at identical coordinates: flat `scrim`; pre-redress graded source; selected focus apron;
  opaque-cream falsifier; no-glass substrate control; F49/F50 shown only as design reference, never a
  pixel-match oracle.

### Required readbacks

1. Dialog rect, halo rect, viewport rect, core/falloff edges, computed custom properties, data state,
   overlay alpha, and effective backdrop-filter owners.
2. A structured substrate with one warm/cool boundary, one high-frequency text/grid region, and one
   low-frequency shape. Near field must reduce high-frequency energy while retaining the boundary's
   region identity; far field retains structure under a lower warm veil. The opaque mutation must erase
   materially more region identity.
3. Pixel cuts normal to all four Dialog edges. The full-hold region begins from each real surface edge
   plus `core`; the falloff ends within the 60–85px default band. A width/height mutation must move
   those cuts accordingly.
4. Sample ownership: seating state has the Dialog plate only; ready state has apron only beneath the
   Dialog; no ready coordinate reports two backdrop-filter owners.
5. Paint bounds and performance: no halo element spans the viewport unless clipping makes that
   unavoidable for an almost-full-screen surface; zero continuous geometry writes after settle; no
   per-frame mask/radius work; compare open/resize/close paint and style cost against flat scrim.
6. Modality and access: full keyboard containment, close visibility/focus, correct accessible name,
   outside content inertness, focus return, no pointer interception by the halo, and an honest PRT/
   forced-colors barrier.
7. `/containers/sheet`: four placements, glass/veil/opaque, scroll/no-scroll, one sample, no W3 marker.
8. `/containers/drawer`: current stage paint unchanged; `/containers/command`: no new W3 props or
   automatic halo; `/containers/popover`: unchanged unless its own owner later adopts an attention lens.

No screenshot alone is GREEN. Computed CSS without composited pixels is also insufficient. Safari
must paint the mask and bounded blur; a Chromium-green/Safari-unseen result triggers DECLINE rather
than an engine-specific design.

## 9. Bounded Luna x-high implementation

Only after this design report is absorbed into the registry may a declared Luna x-high seat perform
the mechanical redress. Historical or in-flight Opus source is a banked candidate only and receives no
Luna/model-law credit.

1. **Scene-stage extraction, paint-neutral commit.** Extract the existing instance-owned Dialog/Drawer
   stage roots and scrim registration into the already-authorized shared seam. Preserve A11Y's landed
   focus/anchor edits and the existing DialogContent edit order. Prove byte/DOM/behavior parity,
   sibling/nested ownership, cleanup, and no document fallback.
2. **Focus-apron source commit.** Register the centred surface, seat the bounded geometry variables,
   retain a low whole-field veil, implement the seating→ready sample handoff, consume W2's stage blur
   and W1's Dialog radius, remove saturation, and preserve the side-sheet edge. No consumer or unrelated
   overlay edit.
3. **Contract/gate/document/package commit.** Replace literal mirrors with the relationship/mutation
   set; true the one-consumer comment; document the corrected token meanings and 7→8 migration; build
   one unique immutable `8.0.0` artifact and installed-package fixture. Do not republish changed bytes
   as 7.0.0.
4. **Evidence seat, no taste invention.** Run the exact matrix above, retain raw manifests/traces/PNGs,
   and write the receipt. Luna may tune within the ruled relationships only: bloom stays in 60–85px,
   blur comes from W2, core comes from W1, and far alpha remains nonzero and subordinate. Any desire for
   a new plate, animation, consumer, saturation, or token returns to Sol.

The implementation may be three reviewable commits, but W3/package/freeze acceptance is atomic across
all three plus evidence. A paint-neutral extraction may bank independently; no partial graded contract
ships.

## 10. Union without duplicate novelty

- **Keep in W3:** the static modal focus apron, public backdrop axis, bounded geometry, one-sample
  handoff, whole-field modal veil, and single-consumer truth.
- **Consume, do not duplicate:** W1 `--radius-dialog`; W2 private 14px stage effect and
  `--glass-level`; the existing overlay lifecycle; the existing shared scene-stage extraction;
  A11Y focus/forced-color/reduced-transparency owners; GATES W1 literal-collapse/public ledger.
- **Route elsewhere:** interaction-following ChatGPT attention → existing `X-GRADBLUR/V-ALENS`;
  popover birth/exhale → existing overlay/X-CHOREO owners; Drawer motion/stage → MATERIAL W2 + FM W7;
  ENGAGE-AFFORD consumer → its own built wave when real.
- **Reject:** a generic graded-glass primitive, a second opacity axis, a second blur ladder, radial
  foreground glow, multiple stacked samplers, browser-specific skins, Command/Drawer adoption-by-count,
  and any autonomous “breathing” backdrop.

ASK-26 is thereby decided **ADOPT/REDRESS** at the Sol paint lane, subject to the user's standing veto.
Because ADOPT retains the 92-row roster, no row-93 arithmetic or freeze rewrite occurs now. A terminal
DECLINE triggered by the browser/cost kill switch must mint and seat `BJ.W-IMMERSIVE-SCRIM`, change the
roster to 93, and refreeze before further implementation.

## 11. Required two fresh Sol critic tails

Both critics inspect the exact same immutable 8.0 candidate and retained evidence after Luna finishes.
Neither may be the author of this report or the implementation.

1. **Sol material/hierarchy critic.** Re-judge F49/F50 only as reference; compare focus apron, flat
   scrim, opaque falsifier, short/wide/tall/nested Dialogs, warm/cool transmission, modal hierarchy,
   rim restraint, one-sample handoff, and side-sheet regression. It can select ADOPT GREEN or fire
   DECLINE; it cannot invent a fourth treatment.
2. **Sol mechanism/accessibility/performance critic.** Reproduce ownership, ResizeObserver lifecycle,
   mask parity, sample count, PRT/forced-colors/PRM, first paint/reopen/nesting, package integrity, and
   Chromium/Safari paint/cost. Restoring any W3-R1…R18 mutation must turn its detector RED.

Any critic-requested byte change invalidates both tails and requires two fresh critics on the new bytes.

## 12. Concise final judgment

The prior lean to ADOPT was directionally right but insufficiently critical. The current 20px/13rem/
7rem viewport spotlight is not a box-following, bounded, one-sample, accessibility-honest modal
material. Keep the capability because a restrained environmental focus field is genuinely useful and
distinctive; replace its mechanism with the measured focus apron above. The result should feel alive
because the page context gathers around the Dialog and settles, not because another shiny thing moves.
If that exact idea cannot paint truthfully and cheaply in both target engines, decline it completely.

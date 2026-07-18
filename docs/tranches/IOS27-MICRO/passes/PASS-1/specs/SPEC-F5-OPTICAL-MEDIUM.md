# SPEC-F5-OPTICAL-MEDIUM — medium, body, light

verified-model: claude-fable-5 (system-context model ID, verbatim). Synthesize seat, pass 1, 2026-07-18.
Status: ACTIVE — the material architecture. F5 supplies no clock; it owns the layer contract, the
two-tier budgets, the medium's persistence machine, and the lens body, and states its consumption
seams into whichever physics family wins. Inputs: REGISTRY §F5, MARKS (whole), F5 digest, X1/X2/X3
digests.
Tooling: DesignSync reachable this pass (live `list_projects` call; empty project list — noted for
pass-2 component seats).

PASS-2 REVISION (cure seat F5, 2026-07-18 — verified-model: claude-fable-5): the one spec revision
per CRIT-F5 G8 + the binding suffusion forPass2 demand. Deltas, all marked in place: §1 the full
backdrop-root enumeration + the z/DOM contract table + the named lint artifact + the medium
one-writer contract + isolation:isolate reconciled + DOM-cost metrology corrected (G10); §2-H3 the
compositor fence (no SVG filter on the hot path — the fence anatomy is primary, the filter merge
demoted to a duel arm); §3 the C4/C5 MARKS-correction adoptions; §4 U1 CLOSED-RED with the WebKit
verdict + the routed repair; §6 rows re-graded on the safari-arm evidence + two NEW rows (U7
moving-backdrop cost, U8 N8-at-opacity-0). Nothing pass-1 is silently rewritten — voids are quoted.

---

## 1. Architecture

Three strictly separated sibling layers per liquid region, and the separation is platform-forced,
not taste: by the CSS backdrop-root law, an ancestor carrying `filter`, `opacity < 1`, any
mask/clip-path, or a blend mode severs every descendant's backdrop sampling — so a goo-filtered
light layer and a backdrop-sampling body CANNOT nest and must be siblings under an effect-free
ancestor. The shipped pager (`PagerDots.vue` three-way split, the σ8 defect) is the in-tree proof;
the CC interrupt (blur held featureless across caught cycles) proves the medium's independent
lifetime. Independent lifetime + forced sibling topology = the decomposition is the only shape that
works.

**The layer contract, per region.**
- One effect-free positioning ancestor — the FULL backdrop-root trigger enumeration
  (filter-effects-2): no filter, no backdrop-filter, no opacity < 1, no mask, no clip-path, no
  blend mode, no `isolation: isolate`, no `contain: paint`, no `will-change` naming any of these.
  (Pass-2 correction: ~~"no filter, no opacity < 1, no mask/clip, no blend"~~ under-enumerated —
  `contain: paint` and `isolation: isolate` are backdrop-root triggers too and would sever every
  descendant's sampling; the root may carry NEITHER. Enumerated and now actually lintable — the
  named lint is `prototypes/f5-optical-medium/lint-layer-contract.mjs` (static, CI-able, with a
  --self-test falsification arm) + the in-page `window.f5LintLayerContract()` (computed-style,
  both engines, includes the rogue-writer throw probe). A check that cannot fail is not a gate;
  the lint's self-test proves it fails on each broken clause.)
- MEDIUM — the persistent blur/dim field. Per-region singleton (`ModalOverlay`'s `fixed inset-0`
  wash is the seed), pre-mounted, CONSTANT blur radius, opacity-only animation (radius animation is
  paint-bound and fenced — Chrome's own guidance, the Chromium flicker defect, Safari CPU
  fallback). Never unmounted; a three-state machine — engaged / held / relaxing — with scrub
  re-entry at any state; the CC empty-blur beat and the held featureless scrim are NAMED states,
  not transients. Enter/exit choreography never animates an ancestor's opacity (it would sever
  sampling) — only the medium's own.
  **The one-writer contract (pass 2, G8d):** a region's medium has exactly ONE writer. Mechanism:
  the writer acquires the medium through `claimMediumWriter(el, id)` — the claim is durable and
  visible (`data-writer="<id>"` on the element, checked by the lint), every state/opacity write
  routes through the returned writer, and a second claimant THROWS (dev-fatal, never a silent
  last-write-wins). Scrub, open, close, and interrupt are all verbs of the one controller; a
  consumer that wants medium influence asks the writer (the `--medium-t` handshake with K reads
  the medium, it never writes it). Prototype: `index.html` `claimMediumWriter`/`ccWriter`.
- BODY — the two-tier glass geometry on the existing rung ladder; ONE transform tree; content
  lives inside the transform, so overpull compression is one `scale` and content deforms free;
  own-element opacity only.
- LIGHT — sibling above body: aria-hidden, pointer-events none, `contain: layout paint` +
  `isolation: isolate`, zero backdrop sampling, luminance-composited via `mix-blend-mode:
  plus-lighter` (Safari 9.1+). (Pass-2 G8a reconciliation: the prototype omitted
  `isolation: isolate`; RULING — MANDATED AND ADDED, not struck. `contain: paint` already implies
  a stacking context, but the contract is enumerated-and-lintable: isolation names the
  children-contained compositing boundary as a semantic property the lint checks directly, and
  the boundary survives any future containment retune. Safe here because the light layer never
  backdrop-samples; the same property is FORBIDDEN on the region root, where it is a
  backdrop-root trigger.) Goo anatomy: see §2-H3 — pass 2 re-arms the hot path to the compositor
  fence; the SVG filter is no longer the primary.
- DOM cost, measured against the repo: BOUNDED, NONZERO (pass-2 G10 correction — ~~"zero
  per-component DOM additions"~~ overstated): light hosts (~4 components: tabs, dock, pager,
  segmented) and per-region mediums (~overlay family) each add one element; body layers exist.
  Metrology re-measured 2026-07-18 (~~"120 backdrop-filter declarations, 54 files"~~ reproduces
  under no cut of the tree): 63 unprefixed `backdrop-filter:` declaration sites across 36 files,
  9 `-webkit-` across 8, 133 total mentions across 62 files — cut:
  `grep -rEo "(^|[^-])backdrop-filter\s*:" src` / `grep -r "backdrop-filter" src`. The
  `material.css:66` cell-suppression seam (`--glass-cell-backdrop-filter: none` on tier children)
  is the existing instrument bounding concurrent blur count.

**The z/DOM contract against arbitrary consumer content (pass 2, G8b).** Ordinals are per-region,
under the effect-free root; DOM order IS the paint order contract:

| plane | z | DOM position | contract on consumers |
|---|---|---|---|
| MEDIUM | 1 | first child of the region root | never carries content; exactly one writer (above); reads via `--medium-t` only |
| BODY | 2 | after medium (one or more siblings: container glass, control capsules) | backdrop-sampling glass; own-element opacity only; ONE transform tree per body; a sampler nested in a sampler is DEFINED (samples the outer's backdrop-root image — U3, proven both engines) but budget-bounded by the cell-suppression seam |
| LIGHT | 3 | after the last body, before content | aria-hidden, pointer-events none, contain layout paint + isolation isolate, ONE plus-lighter composite on the layer (children carry no blend of their own), zero sampling, no filter while traveling (§2-H3 fence) |
| CONTENT | 4 | last | labels/targets; full-contrast text; must not interpose filter/blend/opacity<1 wrappers between itself and the region root (that would re-plane or sever the stack) |

Consumer law: content that needs its own glass becomes a NESTED region (its own effect-free
root, its own four planes) — never a fifth plane in the parent. Focus/interaction targets live
on CONTENT; the light layer is invisible to the tree (aria-hidden) and to the pointer.

**Clock consumption seams (no second authority).** Light travel consumes `useLeadTrail` as-is;
body consumes the winning physics family's channels (`springPreset` rows by name); medium rides
CSS duration tokens. The measured desync — medium ≤100ms, fade ≈ stretch/4, stretch ~600ms, close
inverted, periphery +100ms — is specified as TOKEN RATIOS over consumed clocks.

## 2. Mechanism per hallmark

**H1 growth ladder.** The card is one region: medium (optional, for CC-like overlays), body
(container-tier glass, origin bottom-center, the one transform tree carrying the ladder's rungs as
content), light (dormant — no idle light on cards, MARKS §4). The rungs' fade+rise are body-content
transfers on the physics family's scalar; icons emerge from a clipped tray inside the body tree.
F5's own contribution: the layer topology guarantees the growth never breaks sampling (no wrapper
fades) and the top-edge inner glow (the Find My raised-card light band) is a light-layer leg.

**H2 overpull compression + springback.** Body-layer mechanism by construction: the compression is
one container-level `scale` on the body's transform tree, bottom-anchored — glass AND content
deform as one because they ARE one tree. The medium never deforms (it is the field, not the body).
Springback clocks are consumed, not owned.

**H3 lens — the family's crown.** The central claim, corpus-licensed: the traveling lens carries
NO backdrop-filter while traveling — light travels while glass stays put, which is exactly what iOS
paints (the source capsule de-materializes under the blob and re-materializes behind it).
- Rest: control-tier capsule (static backdrop sample, cheap); content magnification ~5–8% as a
  content `scale` under the capsule — a transform, not refraction. Idle specular sweep on the
  ACTIVE lens only (Safari's good idea, engagement-gated).
- Press-charge: light-layer bloom past the capsule bounds + whole-bar wash on pointerdown — before
  any travel.
- Travel: the capsule de-materializes; a light BARBELL travels — two bodies + welling neck off
  `useLeadTrail`'s (lo, hi) edges, the pager worm at tab-bar scale. **THE COMPOSITOR FENCE
  (pass-2 amendment — the suffusion forPass2 demand, binding): the travel hot path is
  transform/opacity/clip-path ONLY; no SVG filter runs while the lens travels.** Primary anatomy
  = additive gradient metaballs: the bodies and neck are soft-falloff radial-gradient sprites
  moved by transform; their overlap SUMS under the layer's one plus-lighter composite, so the
  merge is optical, not filtered — zero per-frame filter re-render. ~~Arm A goo merge with the
  Arm B clip floor~~ re-graded: the pass-1 SVG-filter merge (`filter: url(#goo)` on the layer,
  pager precedent) is DEMOTED to a duel arm — a static-cost challenger that must beat the fence
  anatomy in the queued pass-2 paint duel (reverify §F5; the WebKit 4-slot morph's one 26ms long
  frame is the suspect it must answer) or retire. The old Arm B (@supports-not floor) is moot for
  the fence anatomy, which never filters. Chromatic fringe stays a Chromium-only garnish, never
  the primary.
- Arrival: capsule re-forms OVERSIZED (~110–120%, in scale AND light), held ~200ms, cools to rest;
  press→settle 1.2–1.4s total.
- Sibling legibility — the best-iOS move: sibling labels live OUTSIDE the light layer (they are
  body content; the light layer paints between body and content planes), and the bloom gradient
  carries a `--lens-bloom-text-clamp` alpha leg under text runs. iOS loses ~300ms of legibility
  because its bloom is opaque; ours is bounded-alpha by construction.
- Pill self-centering (Safari's second good idea) rides the existing `useSelectionGroup` recenter
  seam.
The expensive moving backdrop re-sample never happens FOR THE LENS — resolved by architecture.
(Pass-2 G4 honesty bound: that resolution is H3-scoped. H1 growth and H2 overpull DO animate a
live backdrop-sampling body — priced as §6-U7, with the mitigations and the honest boundary
stated there; the elegant-reduction read of the pass-1 sentence is retracted.)

**MARKS PASS-2 corrections adopted (C4/C5).** C4: the one-body morph is PLATFORM GRAMMAR, proven
in both apps — Safari's lens travels as one continuous body at control-register speed (~165±35ms);
the pass-1 framing of one-body as a Find My exclusive is void, and the lens contract's
control-register clock (travel ≤500ms) is corpus-backed, not merely budgeted. C5: (a) rapid
re-taps RE-SEAT the lens mid-cool with no reset and no blink — velocity-continuous interruption
holds on the lens body itself; the machine expresses this through the same retarget path as
mid-travel interrupts (morph non-null through cool; prototype honors it); (b) cool-down after the
final arrival is 350–400ms measured — now a gated band (prototype `roCool`); (c) the 1.2–1.4s
press→settle is the full deliberate ritual of ONE morph, never the geometry's own speed — geometry
per hop under rapid re-taps runs 150–250ms, which is NOT gated here (different gesture class;
gates derive from MARKS for the matching gesture, never from what the prototype happens to do).

**H4 material tiers — the family owns this hallmark.** The two-tier rule mapped onto the shipped
five-rung ladder: container = resting (.65α/7px) or floating (.80α/11px); control = quiet
(.50α/7px) + its OWN rim + brighter fill — a control never shares its container's surface, and the
spec backs this: a control-tier `backdrop-filter` inside container glass samples the container's
backdrop-root image, frosted-on-frosted as defined behavior. The 1px top rim light is a required
leg (`--glass-rim-top`/`--glass-specular` reuse). Tint from beneath with text clamped to full
contrast — the brightness-bucket adaptive tint + AA floor is already shipped (`glass-fx.css`);
only positional hue sampling remains open (U4). Specular and light motion gate on engagement
(F4's threshold grammar is the natural enforcement seam).

**H5 multi-clock choreography.** F5 contributes the medium's persistence machine — the piece no
clock family can fake: engaged (≤100ms opacity cliff on the constant-radius field), held (the
featureless scrim — a stable state, entered whenever content leaves first), relaxing (~400ms
decelerating tail). Close order inverts because content (body) and medium are different layers on
different clocks; the empty-medium beat is the held state's minimum dwell. Interrupt = scrub
re-entry; the medium never resets because it never unmounts. Channel ratios beyond the medium are
consumed token ratios.

**H6 momentum facility.** Out of scope — consumed. The light layer's bloom/specular reads gate on
the F4 energy contract where present; the body's deformation rides the physics family. F5 adds no
tracking.

## 3. MARKS acceptance targets

| target | mechanism |
|---|---|
| two tiers, distinct budgets, control never shares surface (§4) | rung mapping + spec-backed nesting + cell-suppression seam |
| 1px top rim light (§4) | required rim leg, shipped tokens |
| text full-contrast on any tint (§4) | AA-clamped tint floor, shipped + carried |
| specular never idle (§4) | engagement gating (F4 seam) |
| lens one continuous body, never blinks (§3) | barbell travel + de/re-materialize choreography |
| press-charge + whole-bar wash (§3) | light-layer bloom on pointerdown |
| oversized arrival in scale AND light, ~200ms (§3) | capsule re-form + light hold |
| sibling legibility under bloom — best iOS (§3) | labels outside light layer + alpha clamp leg |
| magnification ~5–8% (Beyond) | content transform under capsule |
| blur cliff ≤100ms, relax ~400ms, empty beat (§5) | medium state machine, opacity on constant radius |
| medium persists across interrupts (§5) | never unmounts; held is a named state |
| content deforms with glass (§2) | one body transform tree |

## 4. Safari-2026 feasibility

Every primary sits at the floor: unprefixed `backdrop-filter` (Safari 18+), `plus-lighter` (9.1+),
in-document `filter: url()` on HTML (shipped, pager precedent — now duel-arm-only per §2-H3),
anchor positioning (26.0) if the lens geometry wants it. Refraction (`backdrop-filter: url()`) is
Chromium-only and stays a garnish — not available at the floor, full stop; no masking fallback
pretends otherwise. Blur-radius animation is fenced everywhere.

**U1 ANSWERED (pass 2 — CLOSED RED).** ~~"sources conflict on whether Safari rejects at parse time
or accepts-and-drops"~~ — the conflict is over: WebKit 26.5 ACCEPTS at parse (`CSS.supports` true
on all four probed forms — fragment, blur+fragment, the shipped gate form, the shipped data-URI
value; computed style retains the full composite) and DROPS THE WHOLE VALUE at paint, blur leg
included (chips B/C/D stone sharp at 0.0748–0.0749 vs baseline 0.0756; chip A blur-only 0.0018;
fragment and data-URI die identically — the G7 divergence question: none). Consequence: the
shipped `glass-refract.css` gate ENGAGES on the Safari floor, the gated declaration overrides the
un-gated blur base, and `.glass-lens` paints with NO backdrop filter at all — a live defect
against glass-ui 7.0.0. Chrome 150: the full value paints; the gate tells the truth there. The
repair is ROUTED, not applied (the do-not-edit-src ruling):
`docs/tranches/BJ/coordination/ios27micro-inbox-2026-07-18-glass-refract-webkit-gate-lie.md`
carries the exact gate repair (runtime latch, `supportsCssTimeline`-class harden, born-RED WebKit
paint gate). Evidence: safari-arm.md §F5 + PROBE-NOTES "PASS-2 SAFARI ARM" + `f5-wk-u1-chips.png`.

## 5. The prototype that proves the riskiest claim

**Riskiest claim: the lens reads as ONE continuous body in Safari paint — capsule de-materialize,
light-barbell travel, oversized re-form — with no visible blink at either handoff and sibling
labels legible throughout.** Build the tab-bar lens demo: rest capsule + press-charge + travel +
arrival on `useLeadTrail`, labels instrumented (goo anatomy per §2-H3's fence). Capture per the
live-π law on Safari 26 AND Chrome: a 12fps-equivalent screenshot burst across one full morph (the
blink test — no frame may show zero lens presence), a contrast read on sibling labels at bloom
peak (the best-iOS gate), the U2 medium probe (opacity fade over constant radius — trace for
re-raster, screenshot pair for the perceptual blur-decay read), the U3 nested two-tier sampling
probe, and the U1 `@supports` lying-gate probe with the repair if red.

PASS-2 STATUS: the Safari half LANDED (safari-arm, WebKit 26.5 — the blink test paint-true at
25fps/132 frames min presence 0.824, sibling legibility 4.53–5.03:1 at bloom peak, U2/U3/U1 as
§4/§6; captures ferry-frozen, the G2 confound dead). The capture law is now enforceable by
harness: the page carries ferry-off + clock ×1/×4/×20 toggles (readouts normalize to ×1), so no
future capture can be ferry-confounded or transient-starved. Chrome transient captures + the
Chrome sibling pixel pair remain queued (reverify §F5 rows 1/6). The three pass-1 PNGs whose
names claimed transient states were RELABELED to their true content (PROBE-NOTES "PASS-2 CURES").

## 6. Open gaps (pass-2 re-grade — statuses on the safari-arm evidence + this seat's cures)

| # | gap | status / next move |
|---|---|---|
| U1 | the `glass-refract.css` lying gate on Safari | **CLOSED RED** (§4): @supports true + whole-value paint drop on WebKit 26.5, both url() forms; repair routed to BJ (inbox row, exact latch design + born-RED gate); src untouched by ruling |
| U2 | medium opacity-fade compositing in Safari + the perceptual read of blur-decay-by-opacity | **SPLIT**: mechanism ANSWERED in WebKit paint — constant-radius medium, opacity-only decay, blur visibly attenuating with element opacity (F5 ramp + the decisive same-engine F1/F3 ramp artifacts `f1-wk-h4-blur-ramp.png`/`f3-wk-blur-ramp.png`; cliff 104ms, beat 150ms, relax 422ms, 1:4.0, floor 0.09-never-0). OPEN: the re-raster trace (TOOL-DEFER — desktop Safari Web Inspector/Instruments) + the Chrome-side pair, skipped in pass 1 WITHOUT being named — now named and queued (reverify §F5 row 6) |
| U3 | nested control-on-container sampling paints per spec in WebKit | **CLOSED GREEN** on the engine it existed for: 0.00186 vs 0.00233 (~20% smoother), distinct paint (`f5-wk-u3-board.png`); Chrome green pass 1 |
| U4 | positional hue sampling (codex law 2 full form) — no web primitive exists | open by design: pass-2/3 design decision (consumer hint token vs sampled-swatch approximation); unchanged |
| U5 | concurrent-blur budget on a CC-like screen vs the ~3–5 mobile guidance | open: DEVICE-DEFER (real iOS Safari); the WebKit ×3-conductor stress (no nested-backdrop cliff, 67fps) is the interim desktop-proxy datum |
| U6 | stacked-mask progressive blur inside budget when the medium also hosts choreography | open: bounded 3–4 layers; measured pass 2/3 |
| **U7** | **NEW (G4): the H1/H2 moving-backdrop cost** — dock-to-card growth and overpull animate a live backdrop-sampling body (translate/scale on container glass, ~600ms per gesture) on the LARGEST surface; exactly the per-frame re-sample H3's architecture avoids for the lens. Priced (desktop proxies, both engines): F4's transform-modulated dock frosts live in WebKit video (U6a/U6b); F1's clip-path growth holds cadence (max 19ms, 0 >24ms, WebKit); F5's own morphs worst 19ms (1-slot) / one 26ms frame (4-slot, filter-arm suspect); Chrome morph worst 11.3ms | MITIGATIONS bound: (a) the medium never re-filters (constant radius, opacity-only); (b) growth prefers clip-path reveal over animated scale where the ladder allows (F1's H1 mechanism — the sample rect stays stable); (c) concurrent samplers bounded by the cell-suppression seam; (d) the light layer never samples. HONEST BOUNDARY: per-frame re-raster ATTRIBUTION is TOOL-DEFER (desktop Safari Instruments — safari-arm §3); the interim gate is cadence (no frame >24ms during any gesture window) and it is a real gate — the 4-slot 26ms frame breached it once and is queued against the fence arm. The body's transform CLOCKS belong to the physics family; the material PRICE is F5's row — this line is the boundary, stated |
| **U8** | **NEW (suffusion §2-N8 standing obligation): does Safari keep paying for a backdrop-filter parked at opacity 0?** The N8 scrubbed-medium-onset layer idles at opacity 0 by design; if the engine still pays, N8 must park via `display:none` | prototype now mounts an opacity-0 cost twin + a 3s cadence meter (`n8Mount`/`n8Measure`); priced by the re-verify seat on both engines (reverify §F5 row 3); both outcomes actionable — certify opacity-0 parking or mandate display:none parking |
| — | the light-clock boundary with F1/F3 (who drives the barbell's charge/hold states — this spec assumes: physics family supplies the clock, F5 the body) | owner ASSIGNED at agglomeration (§3-6): the pass-2 arbitration seat, jointly with F3's U11; this spec's assumption stands until that seat rules |

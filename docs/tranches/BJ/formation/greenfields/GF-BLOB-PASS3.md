# GF-BLOB — greenfield design, PASS 3 (Fable seat, over CRIT2)

One-seat compression of the design-loop charter (`PROMPTS/design-loop-prompt.md`): adjudicate every
CRIT2 charge on disk → decide the deferred designs (material identity, the goo-engine relationship,
the shadow mechanism, the topology reconciliation, the always-alive seam) → re-cost the mis-scoped
wave → honest convergence. TRANCHE-DEVELOPMENT: no source touched; this doc is the only artifact. No
browser (a Playwright suite owns the seat) — every π obligation stays OWED, and convergence is capped
accordingly.

Authorities re-read in full at HEAD (`codex/bi-p-q-execution`): `GF-BLOB-PASS1.md`, `GF-BLOB-CRIT2.md`,
`ADJUDICATION-1.md` (blob touch = line 48 only), `ios27/IOS27-CODEX.md` (laws 5/6/9/13),
`ios27/MARKS-B.md` (§V2 `f-0017/0018/0019`, the METAL FLOW stills `:215-218`, the rim caustic `:262-269`),
`FEEDBACK-LEDGER.md:79` (the A12 ask), `GF-DOCK-PASS3.md` (the sibling goo engine). On-disk re-verified:
`src/components/blob/{constants.ts,types.ts,Blob.vue,composables/useBlobMood.ts,composables/useMetaballRenderer.ts,shaders/metaball.frag.ts}`
and the value.js archaeology `docs/tranches/S/audit/lanes/design-blob-atmosphere-vision.md:150-159` (READ-ONLY).

Every CRIT2 charge below was re-checked against the disk by THIS seat, not taken on CRIT2's word — the
two seats agree on all seven findings' facts. Adjudication is on the DESIGN CONSEQUENCE, not the fact.

---

## 0. What pass-3 inherits

CRIT2 re-scored pass-1 from 50% → 45%. Its verdict on the two central tests holds and I do not
re-litigate it: **(a) the archaeology is real, precise, byte-exact** (the `06929a4b` FSM values, the
old shader primitives, every genesis/design-vision citation resolve on disk — CRIT2 §0/§1, independently
re-confirmed here); **(b) the contract is mechanics not adjectives, with one load-bearing exception** —
the "restore the bold envelope" mood claim, which is largely a NON-deficit (F1). The −5 is F1 (−3),
F2 (−1.5), F3 (−1), with the zero-paint cap dominating throughout. Pass-3 resolves F1–F7 on disk and
decides the four designs pass-1 deferred; it adds NO paint, so the cap persists.

---

## 1. Critique adjudication — every CRIT2 charge, one row, zero silent drops

CRIT2 carries seven ranked findings (F1–F7) plus a 16-row on-disk verification ledger (§1). The
ledger rows that move the design are folded into the finding they feed (noted); the rest are
fact-confirmations of pass-1 that need no design action and are marked CONFIRMED-NO-ACTION at the end.

| # | CRIT2 charge | verdict | design consequence / evidence |
|---|--------------|---------|-------------------------------|
| **F1** | The "restore the `06929a4b` bold envelope (orbit 2.2 / wobble 2.0 / pulse 0.05)" mood claim is largely a NON-deficit; G-MOOD-AMPLITUDE is born-GREEN for orbit/wobble/pulse | **ACCEPTED** | Re-verified: `MOOD_AVA.excited={valence 0.7, arousal 1.0}` (`constants.ts:53`); `paramsFor` (`:66-69`) is `orbitSpeedScale=lerp(0.4,2.2,arousal)`, `wobbleScale=lerp(0.5,2.0,arousal)`, `pulseAmp=lerp(0.008,0.05,arousal)` → excited ALREADY paints 2.2/2.0/0.05. The clause cannot fail at HEAD. Also confirmed: the OLD `06929a4b` shader is flat HSV goo with NO lit surface, so `iridScale`/spec/SSS have NO value.js referent to "restore" — they are law-13-forward AUTHOR-NEW. **Consequence:** W-MOOD re-costed (§2.4) to its real residual — the mood-owned pointer SIGN (sleepy repel) + an author-new taste call on the excited `iridScale` ceiling + the β topology target. G-MOOD-AMPLITUDE's orbit/wobble/pulse clause is DELETED; the gate is split into G-POINTER-SIGN (RED) and dropped for the amplitude (§4). |
| **F2** | Law 13 and the raw MARKS-B observation DIVERGE on topology; β builds its emotion→topology map on the codex over-reading without reconciling them | **ACCEPTED** | Re-verified: law 13 (`IOS27-CODEX.md:58`) = "pill↔orb↔dot-ring", three peers; MARKS-B (`:101-102` f-0019, `:273`) = "pill → orb → pill morph" with "the Siri listening dot-ring (ring of white dots) INSIDE the pill". The dot-ring is a WITHIN-PILL decoration, not a third macro-topology. **Consequence:** the topology grammar is re-decided (§2.5) as a two-pole `orb↔pill` deflate on ONE spring scalar, with `dot-ring` demoted to a within-pill satellite-arrangement sub-mode — reconciling both authorities and collapsing pass-1's split of curious/sleepy into the SAME deflated macro (differentiated by the listening sub-mode + material), exactly the split CRIT2 flags. Warrant stated in §2.5. |
| **F3** | W-ALIVE's "never-park while `satelliteCount>0`" collides with the `settled` public seam + the U3 single-signal discipline it is built on | **ACCEPTED** | Re-verified: `settled` (`useMetaballRenderer.ts:74-86`) is "Derived from the SAME predicate the demand gate (`shouldContinue`) reads to decide whether to park — NO parallel busy-flag (U3)"; `isSettled` (`useBlobMood.ts:171-179`) is the physics-quiescence predicate. **Consequence:** the reconciliation is DECIDED in §2.6 (decouple "physics-quiescent" from "may-park": `settled` keeps its meaning; the demand gate stops using it as a park trigger and parks on VISIBILITY only). Moved to W0 contract-lock; a new joint gate G-BREATHE-WHILE-SETTLED proves the breath continues while `settled===true` AND an armed consumer still parks its idle logic. |
| **F4** | The cartoon-shadow mechanism contradicts the design-vision it cites, and leaves the in-shader `uShadow` unaddressed (two shadow systems) | **ACCEPTED (with a correction to CRIT2's own framing)** | Re-verified: design-vision (`design-blob-atmosphere-vision.md:157-159`) says "tune the `uShadow` procedural shadow to the cartoon-offset geometry: ~4px SE, near-black ink." BUT at HEAD `uShadow` (`metaball.frag.ts:424-435`) darkens the body's OWN `oklch.x` at merge necks — a rim-weighted interior self-AO gated `morphT>0`; it CANNOT paint an offset stamp OUTSIDE the silhouette onto the plate. The *cast* offset stamp is the CSS `drop-shadow` (`Blob.vue:354`). So design-vision's citation is itself imprecise about what `uShadow` does. **Consequence:** the mechanism is PINNED in §2.3 — the cartoon offset ink-stamp is a CAST shadow, owned by the CSS `--blob-shadow-*` layer (single hard SE offset, gel-dome pair deleted); `uShadow` KEEPS its distinct job (interior merge-neck AO) and is NOT the stamp. One cast shadow + one interior AO — stated, not a silent pair. |
| **F5** | B-INTERACT's "single lean channel / no avoidance" understates the existing signed mechanism; the genuine hit-test deficit is precision, not corner fall-through | **ACCEPTED** | Re-verified: `interaction` carries `pointerAttraction 0.35` AND `pointerStrength 0.1` (`types.ts:423-424`) with the comment "the negative half genuinely shies away (the body shifts away AND the pseudopod retracts, reachFactor 0)" (`:421-422`) — the signed channel EXISTS. Sleepy's arithmetic (`valence -0.1`) → `paramsFor` → `+0.114` (a weak lean-IN), so G-CURSOR-AVOID is legitimately RED but the fix is a VALENCE-MAP / sign re-tune, not a one-channel→two-channel rebuild. And corner fall-through already works (`Blob.vue:379-381`, "a click on the corners / empty margin falls THROUGH"). **Consequence:** B-INTERACT re-scoped (§2.4/§2.7); G-SDF-HITTEST re-worded to the precision win. |
| **F6** | The SDF hit-test becomes NECESSARY (not just nicer) once W-SHOW promotes orbit 0.30 > body 0.22 — no single circle can hit-test an orbit>body silhouette | **ACCEPTED** | Confirmed by construction: default `orbitRadius 0.17 < bodyRadius 0.22` (`types.ts:298-300`) absorbs the satellites, but HERO `orbitRadius 0.30 > 0.22` (`presets.ts:57-58`) puts them outboard; a `clip-path:circle(body)` disc (`Blob.vue:393`) cannot cover an outboard satellite, and a disc sized to reach it eats the corners. **Consequence:** W-HITTEST is COUPLED to and ORDERED at/after W-SHOW (§3); its warrant is the precision win, not corner fall-through. |
| **F7** | The `settled`-consuming ecosystem is the always-alive blast radius; "consumer #1 = demo hero" understates it until F3's seam ruling lands | **ACCEPTED** | Follows F3. **Consequence:** the always-alive consumer is EVERY reader of the quiescence seam; folded into W0 with the F3 ruling (§2.6). The demo hero is consumer #1 of the material/shadow/show primitives, which stands. |

### Ledger rows re-confirmed, no independent design action (already folded above or CONFIRMED for pass-1)
CONFIRMED-NO-ACTION (these hold pass-1 as written; re-checked on disk): OLD value.js blob exists at
`06929a4b` with the affective FSM; B-SHADOW gel-dome + `<Card cartoon>`-only rationale (`Blob.vue:344-350`);
B-LIGHT whisper defaults (`types.ts:398,402,405,407`); B-EXPRESS orbit<body / HERO orbit 0.30
(`types.ts:298-300`, `presets.ts:57-58`); `morphT` is a flat↔dressed SURFACE axis, not a shape machine
(`types.ts:270-274`); G-RIM-CAUSTIC iridescence is uniform fres-weighted not lower-rim
(`metaball.frag.ts:376-396`); G-NO-WGPU WebGPU-first selection (`useMetaballRenderer.ts:92-95`). None
of these was contested by CRIT2; they remain the spine and are NOT softened (CRIT2 §6 "do not re-verify").

**Net:** zero REFUTED — CRIT2 is correct on all seven findings' facts. Every charge is ACCEPTED and each
forces a concrete change below. F4 carries a correction to CRIT2's own framing (the in-shader `uShadow`
cannot BE the cast stamp), which sharpens the ruling rather than reversing it.

---

## 2. The decided design (revised by the accepted charges)

The §4.1 load-bearing decomposition SURVIVES intact and disk-verified (CRIT2 §6): **material register ⊥
shadow register ⊥ show-visible default ⊥ mood amplitude ⊥ always-alive rest ⊥ topology.** Pass-3 does not
touch it; it decides the five designs pass-1 deferred and re-costs the one mis-scoped wave.

### 2.1 Material identity — DECIDED single identity (not a material-mode toggle)

The task: reconcile law 13's liquid-metal/pearlescent register with the A12 cartoon-shadow register
(`FEEDBACK-LEDGER.md:79` — "cartoon-like shadow, better lighting, more expressive, proper metaballing,
better emotional states"). **Decision: ONE blob, one identity — a liquid-metal chrome creature that
casts a cartoon offset ink-stamp shadow.** No material modes.

The reconciliation is that "cartoon" and "liquid-metal" name TWO DIFFERENT LAYERS, not two competing
surface fills:
- The **surface** is liquid-metal chrome — warm/neutral chrome with a MOBILE pearlescent specular
  sweep + a lower-rim iridescent caustic (law 13; `MARKS-B.md:215-218` METAL FLOW "warm/neutral chrome
  with a mobile specular highlight"; `:262-269` the caustic concentrates lower-rim + cycles hue). This
  is the "better lighting / more expressive" half of A12.
- The **cast shadow** is the cartoon offset ink-stamp — a hard SE near-black graphic stamp on the plate
  (design-vision `:157-159`). This is the "cartoon-like shadow" half of A12.

A glossy chrome bead grounded by a graphic offset stamp is a single coherent register (a cel-shaded 3D
object), not a contradiction — the same way iOS-27 glass carries both a dimensional specular caustic AND
a flat cast shadow. There is NO `register="cartoon"` vs `register="chrome"` split; the cartoon quality
lives ENTIRELY in the shadow layer, the dimensional quality entirely in the surface layer, and they
compose. This kills pass-1 open-gap-1's implicit "material modes" ambiguity: there are none.

The one taste call this does NOT decide unilaterally is the **default-register break** — whether the
DEFAULT `<Blob>` ships as the loud liquid-metal creature or stays the calm warm-cream whisper with
liquid-metal opt-in. That is a library-identity call bearing on the presets-in-consumers fence → routed
to the ASK with a recommendation (§7, Q-BLOB-DEFAULT).

### 2.2 The goo/metaball engine and its relationship to the dock's goo-morph engine — DECIDED: shared SPRING, separate FIELD

The task: decide, with evidence, whether the blob's metaball engine and the dock greenfield's goo-morph
engine are one shared engine or two. **Decision: they are TWO renderers that SHARE ONE spring-scalar
primitive and NOTHING else.** Evidence:

1. **Different substrates, non-fungible.** The blob is a WebGL2 per-pixel analytic-SDF field — a fragment
   shader evaluating an IQ-normalized smin over a canvas quad (`shaders/sdf-body.glsl.ts`,
   `metaball.frag.ts`). The dock goo-morph is DOM elements moved by a JS spring — `useDockSpring` +
   `DockCrossfade` + `useSelectionIndicator` with a `--stretch` neck (`GF-DOCK-PASS3.md:69,254-256`). A
   dock holds real interactive `RouterLink`s, focus, and `aria-current`; it cannot become a WebGL canvas.
   A blob is a single continuous field; it has no discrete cells to neck between. Neither substrate can
   host the other.
2. **The dock explicitly REJECTS the shader/filter goo the blob IS.** `GF-DOCK-PASS3.md:184`: the dock
   pill is "explicitly NOT the Q051 fission goo (no `filter:url()`, no metaball neck) — it is a plain
   detent"; `:254-256`: "the `--stretch` squish IS a lightweight neck… without any `filter:url()`." The
   true metaball-neck pill is a flagged ASK enhancement there, Safari-risk-gated. So the two "goo"s are
   different mechanisms by the dock's own ruling — sharing the renderer would drag the dock into the
   `filter:url()` Safari class it was designed to avoid.
3. **What they DO share is the spring.** Codex "To BEST iOS 27" names "the single-scalar spring engine we
   already ship" (`IOS27-CODEX.md:69`), and law 9 (`:44`) orders "extend useLiquidMorph to named x/y/z
   scalars." The blob's β topology morph (§2.5) rides the SAME `springPreset`/`SpringProgress` engine the
   dock uses (memory: `DOCK_SPRING={0.68,0.64}` via `springPreset("dock")`), giving cross-component
   liquid-weight consistency (the liquid-weight-universal edict) without merging renderers.

So: the blob's smin FIELD stays the blob's; the topology squash SCALAR is the shared spring. The blob's
own click-impulse pulse-spring (`PULSE_OMEGA/ZETA`, `constants.ts:132-135`) stays a bespoke one-shot
oscillator for the click bounce (a different job) — it is NOT replaced. This is the elegant-reduction-safe
answer: no new engine, one shared primitive, evidence for the boundary.

### 2.3 The shadow mechanism — PINNED (closes F4)

- **The cartoon offset ink-stamp is a CAST shadow → owned by the CSS layer.** Replace the gel-dome pair
  `filter: drop-shadow(--blob-shadow-ambient) drop-shadow(--blob-shadow-contact)` (`Blob.vue:354`, plus
  the `:hover` pair `:358-359`) with ONE hard SE-offset near-black `drop-shadow` on the canvas alpha
  (silhouette-following, ~4px SE, near-black ink per design-vision `:157-159`). Clean break, no alias.
- **The in-shader `uShadow` KEEPS its distinct job.** `uShadow` (`metaball.frag.ts:424-435`) darkens the
  body's own `oklch.x` at merge necks (a rim-weighted interior self-AO) — it is NOT and CANNOT be the
  cast stamp (it never writes fragments outside the silhouette). It reads the necking satellites in 3D,
  which the liquid-metal register (§2.1) WANTS. It stays ON at the default (`morphT` default `1`,
  `types.ts:430`, so the `morphT>0` gate passes). Its fate is stated, not silent: KEEP as interior AO.
- **Result: one cast shadow (CSS stamp) + one interior AO (`uShadow`), orthogonal.** This is not the
  "silent pair" no-backwards-compat forbids — the pair being deleted are two CAST shadows (ambient +
  contact); the survivor is one cast + one interior, doing different things.
- **Context-awareness (pass-1 open-gap-7) carried as a design note, not an ASK:** on a bare/dark
  background a hard SE near-black stamp risks reading as a detached Memphis sticker. The stamp attenuates
  (softens + shortens the offset) when the blob is NOT over a card plate — driven off the same token base
  (`--shadow-color`/`--foreground`, `Blob.vue:351-352`) the gel-dome already re-resolves under `.dark`.
  This is a tuning within W-SHADOW, not a new primitive.

### 2.4 Emotional-states model — RE-COST (closes F1, F5)

The `{valence, arousal}` circumplex (`constants.ts:40-104`) SURVIVES as the interpolation surface — it
is principled, one-surface, and disk-sound (design-vision "Mood FSM — VERDICT: KEEP"). The re-cost strips
the born-GREEN "amplitude restoration" and states the REAL residual per mood.

| mood | valence / arousal (`MOOD_AVA`) | topology (§2.5) | amplitude at HEAD | residual work (what is actually RED / author-new) | pointer sign |
|------|-------------------------------|-----------------|-------------------|---------------------------------------------------|--------------|
| **idle** | 0.0 / 0.35 | orb, calm breath | fine | never-freeze rest pose (§2.6) | neutral |
| **curious** | 0.3 / 0.5 | orb; → within-pill dot-ring ONLY on sustained listening | orbit/wobble already scale with arousal | topology target + (taste) attract magnitude — the flatten (`constants.ts:84-92`) is DELIBERATE, do NOT blindly restore 0.6 | attract (already `+0.248`) |
| **happy** | 0.8 / 0.6 | orb, brighter sweep | fine | brighter chrome sweep (author-new, §2.1) | mild lean-in |
| **excited** | 0.7 / 1.0 | orb, satellites fling wide + fission | orbit **2.2** / wobble **2.0** / pulse **0.05** ALREADY (F1) | pearlescent sweep peak (author-new); `iridScale` ceiling `1.35` is a taste call with NO `06929a4b` referent (F1) — keep or raise, NOT "restore" | one-shot click bounce |
| **sleepy** | -0.1 / 0.1 | → pill (deflate), satellites gather in, matte | leans IN at `+0.114` — WRONG | **RED — the genuine mood deficit:** sleepy must shy AWAY (negative lean) | **repel** (fix, §below) |

The ONE genuinely RED motion deficit is the **sleepy pointer SIGN**: at HEAD sleepy computes
`pointerAttraction = lerp(-0.2, 0.6, valence·0.5+0.5) · (0.7+0.15·arousal)` = `+0.114` (`constants.ts:93`),
a weak lean-IN, when the creature should shy away. Fix = a valence-map re-tune (push sleepy's effective
valence below the map's zero-crossing, or restore a mood-owned sign that survives the arousal multiplier).
**W0 must first confirm which pointerAttraction the shader lean actually reads** — the mood-derived one
(`paramsFor`) or the config constant `interaction.pointerAttraction 0.35` (`types.ts:423`) — because that
determines the fix locus (the signed shy-away CHANNEL already exists, `types.ts:421-422`; only the SIGN
that reaches it is wrong). Triggers (`useBlobMood.update`, `:130-153`) and the manual/auto latch
(`:102-114,171-179`) are RETAINED verbatim — they are correct primitives.

### 2.5 The morph grammar — RECONCILED (closes F2)

**Warrant for choosing the frame reading over the codex letter:** the prompt names BOTH authorities;
where they diverge, the raw frame observation (`MARKS-B.md:101-102,273`, "pill → orb → pill", dot-ring
"INSIDE the pill") is the PRIMARY record of the actual Siri behavior, and law 13's "pill↔orb↔dot-ring"
(`IOS27-CODEX.md:58`) is the codifier's compression of it. I follow the frame geometry and honor the
law's INTENT (all three visual registers exist), rather than treating dot-ring as a third macro-topology
the law's phrasing implies. Stated openly (F2's requirement: name the divergence as the thing resolved).

The topology machine, decided:
- **ONE macro scalar `deflate ∈ [0,1]` on the shared spring (§2.2).** `0` = **orb** (expanded, satellites
  orbiting outside the body at the show geometry); `1` = **pill** (body squashed toward the Dynamic-Island
  axis, satellites gathered in). This is the observed `orb↔pill`. Law 5 (origin-anchored) → the pill
  deflates TOWARD its anchor on one spring; law 9 (axis-parametrized) → the squash is an axis morph (body
  stretches along the island axis); the satellites gather via the shader smin necks (law 6 — the field
  already does this).
- **ONE within-pill sub-mode `listening: bool`.** `dot-ring` is NOT a peer shape — it is the satellite
  ARRANGEMENT rendered inside the deflated pill during listening: the satellites snap onto an interior
  ring at low `smoothK` so they read as DISTINCT dots (the Siri listening ring), with the body dimmed.
  This is exactly "the dot-ring lives inside the deflating pill" (MARKS-B `:101-102`).

This collapses pass-1's error (CRIT2 F2): **curious-listening and sleepy now share the SAME deflated-pill
macro-state**, differentiated only by the sub-mode + material — curious = deflated pill + `listening`
dot-ring + bright chrome; sleepy = deflated pill + gathered (no dot-ring) + matte. They are no longer two
different macro-topologies for one source register.

**The morph is RARE and meaningful (pass-1 gap-3):** the `orb→pill` deflate fires ONLY on a sustained
signal — sustained sleepy (`idleMs > IDLE_SLEEP_MS`, the existing arc `useBlobMood.ts:148`) OR an explicit
sustained-attention / "listening" activation — NEVER a transient hover. A transient hover stays `orb` +
`curious` (wobble + attract only, no shape change). A mascot that reshapes every hover is the gimmick
CRIT2 and pass-1 both name; gating deflate behind a sustained signal is the cure.

### 2.6 Always-alive vs the `settled` seam — DECIDED (closes F3, F7)

The clean reconciliation is NOT "park invisible, breathe visible" (pass-1's under-specified assertion) but
**decouple two questions that HEAD conflates**: *is the physics quiescent?* (a physics predicate) vs *may
the rAF park?* (a lifecycle predicate). Pre-breath-of-life, quiescent physics was a SUFFICIENT reason to
park, so `settled` and `shouldContinue` shared one predicate (the U3 discipline, `useMetaballRenderer.ts:78-80`).
Post-breath-of-life it is no longer sufficient. The decision:

- **`settled` (the public seam) KEEPS its exact current meaning** — physics-quiescent: no mood transition,
  no satellite mid-transition, pointer at rest (`isSettled`, `useBlobMood.ts:171-179`). Consumers' arming
  logic ("park my idle logic only while `settled`", `useMetaballRenderer.ts:81-83`) is UNCHANGED — an
  armed-but-idle hero still parks correctly. The low-energy breathing rest pose is STILL `settled` (it is
  an idle animation, not an in-flight transition) — so `settled` stays TRUE during the breath.
- **The demand gate `shouldContinue` STOPS using `settled` as a park trigger.** It parks ONLY on the
  lifecycle predicates that already exist in the substrate — offscreen (`composeIntersectionPark`,
  `useMetaballRenderer.ts:162`), `document.hidden`, PRM. While the blob is visible and `satelliteCount>0`,
  the loop keeps running and renders the breath, even while `settled===true`.
- **This preserves U3.** U3 forbids a parallel BUSY-FLAG that drifts from the physics. Splitting a
  physics-quiescence predicate (`settled`, unchanged) from a visibility/lifecycle predicate (already
  distinct in the substrate) is NOT a busy-flag — they answer genuinely different questions. There is one
  physics predicate and one lifecycle predicate, no second physics.

This is a W0 contract-lock ruling (not a W-ALIVE implementation detail), and its blast radius is EVERY
reader of the quiescence seam (F7), not just the demo hero. The joint gate G-BREATHE-WHILE-SETTLED (§4)
proves both halves at once: with the blob on-screen the breath continues while `settled===true`, AND an
armed consumer reading `settled` still parks its idle logic. The offscreen/hidden/PRM park stays GREEN
(G-PARK-OFFSCREEN, non-regression). The `<7%`-of-page GPU budget (`blob-genesis.md:330`) is π-PERF's owed
obligation, unchanged.

### 2.7 Interactivity + hit-test — RE-WORDED (closes F5, F6)

- **Pointer lean/avoid** — the signed channel EXISTS (`types.ts:421-422`); the only fix is the sleepy SIGN
  (§2.4). Not a rebuild.
- **Exact-silhouette hit-test** — the deficit is PRECISION, not corner fall-through (already green,
  `Blob.vue:379-381`). Once W-SHOW promotes `orbit 0.30 > body 0.22`, no single `clip-path:circle()` can
  cover an outboard satellite while sparing the corners (F6). The CPU SDF field-mirror `hitTest(x,y)`
  (evaluate the same smin at the pointer coord — the sources upload every frame anyway) becomes the ONLY
  correct hit surface for the promoted geometry, not a nicety. W-HITTEST is ordered at/after W-SHOW.
- **Click bounce / always-alive / topology squash / `v-model:paused`** — as pass-1 §4.4, with the topology
  squash riding the shared spring (§2.2) and always-alive resolved per §2.6.

---

## 3. Revised wave shape (bbnf-lang tranche format; hard gates; FINAL.md)

Changes from pass-1 §4.5 in **bold**.

| wave | title | scope | hard gate(s) | π obligation |
|------|-------|-------|--------------|--------------|
| **W0** | CENSUS + CONTRACT-LOCK | freeze §2 survives/replaces; author born-RED gate scaffolds; **rule the `settled` seam (§2.6); confirm which pointerAttraction the shader lean reads (§2.4); pin the shadow mechanism (§2.3)**; decide the WGPU-twin delete coordination | gate suite compiles + all RED | — |
| **W-DELETE-TWIN** | WEBGL2-ONLY | delete `metaball.wgsl.ts` + `wgpuSetup.ts` + `uniformBridgeWGPU.ts`; WebGL2-only (genesis §3.1) | G-NO-WGPU | π-SAFARI-SINGLE |
| **W-SHADOW** | CARTOON INK-STAMP | **replace the gel-dome CSS pair (`Blob.vue:354,358-359`) with ONE hard SE offset near-black stamp; `uShadow` STAYS as interior AO (§2.3); context-attenuate off-plate** | **G-CARTOON-STAMP, G-USHADOW-INTERIOR** | π-SHADOW |
| **W-CHROME** | LIQUID-METAL MATERIAL | the `uSpecSweep` traveling-sweep term + re-anchored chrome defaults + the iridescent lower-rim caustic (law 13, `MARKS-B.md:262-269`); whisper stays as the calm register | G-CHROME, G-RIM-CAUSTIC | π-CHROME-SWEEP |
| **W-SHOW** | SHOW-VISIBLE DEFAULT | promote the `BLOB_HERO` orbit>body posture (`presets.ts:57-58`) toward the default; merge/absorb/emerge READS | G-SHOW-VISIBLE | π-SHOW |
| **W-ALIVE** | ALWAYS-ALIVE REST | **implement the W0 seam ruling (§2.6): demand gate parks on VISIBILITY only; breath continues while `settled`** | **G-BREATHE-WHILE-SETTLED, G-PARK-OFFSCREEN** | π-ALIVE, π-PERF |
| **W-MOOD** | POINTER-SIGN + IRID CEILING | **re-cost (F1): fix the sleepy pointer SIGN (RED); (taste) the excited `iridScale` ceiling — author-new, NO `06929a4b` referent; the β topology target per mood; keep the latch. NO orbit/wobble/pulse "restoration" (born-GREEN)** | **G-POINTER-SIGN** | π-MOOD |
| **W-HITTEST** | EXACT SILHOUETTE HIT | **CPU SDF `hitTest(x,y)`; the PRECISION win (disc-gap + outboard-satellite), NOT corner fall-through; ORDERED at/after W-SHOW (F6)** | **G-SDF-HITTEST-PRECISION** | π-HITTEST |
| **W-TOPOLOGY** | ORB↔PILL + WITHIN-PILL DOT-RING (β) | **`useBlobTopology` two-pole `deflate` scalar on the shared spring (§2.2) + within-pill `listening` dot-ring sub-mode (§2.5); the emotion→topology map; deflate gated behind a SUSTAINED signal (rare, not per-hover)** | **G-DEFLATE-MORPH, G-DOTRING-WITHIN-PILL** | π-TOPOLOGY |
| **W-FINAL** | CONSUMER + AUDIT | demo hero adopts the liquid-metal default; overfitting audit (≥2 sites / exported / private helper); FINAL.md | G-CONSUMER, overfit-audit | π-HERO |

---

## 4. Born-RED gate sketches (each states its RED-at-HEAD condition; kept small per the gates-abrogation mandate)

- **G-NO-WGPU** — no `metaball.wgsl` / `navigator.gpu` selection path in the blob renderer. *RED:*
  `useMetaballRenderer.ts:92-95` selects WebGPU-first.
- **G-CARTOON-STAMP** — the blob casts ONE hard SE-offset near-black ink-stamp following the silhouette;
  NO soft gel-dome pair. *RED:* `Blob.vue:354` is the two-drop-shadow gel-dome; `:358-359` the hover pair.
- **G-USHADOW-INTERIOR** — `uShadow` remains the interior merge-neck AO (darkens body `oklch.x`), NOT the
  cast stamp, and is NOT double-cast with the CSS stamp. *RED-by-construction guard* — must stay coherent
  across W-SHADOW (proves the two systems do different jobs, closing F4's "silent pair").
- **G-CHROME** — the default `<Blob>` surface reads as a lit chrome bead with a MOBILE specular sweep (a
  highlight whose POSITION changes frame-to-frame), not a static whisper glint. *RED:* `specStrength 0.16 /
  iridescence 0.09` static, no `uSpecSweep` (`types.ts:398,402`).
- **G-RIM-CAUSTIC** — the lower rim + corners carry a brighter iridescent caustic (law 13). *RED:*
  iridescence is uniform fres-weighted (`metaball.frag.ts:376-396`), no lower-rim bias.
- **G-SHOW-VISIBLE** — at the shipped default geometry, ≥2 satellites read as DISTINCT orbiting beads at
  rest. *RED:* `orbitRadius 0.17 < bodyRadius 0.22` (`types.ts:298-300`) → absorbed bulges.
- **G-BREATHE-WHILE-SETTLED** *(new, closes F3)* — with the blob on-screen, the rAF renders the breath
  while `settled===true`, AND an armed consumer reading `settled` still parks its idle logic (both proven
  jointly). *RED:* the demand gate parks the moment `isSettled` is true — `settled` and `shouldContinue`
  share one predicate (`useMetaballRenderer.ts:78-80`), so a visible at-rest blob freezes.
- **G-PARK-OFFSCREEN** — an offscreen / `document.hidden` / PRM blob STILL parks. *RED-by-construction
  guard* — must stay GREEN across W-ALIVE (GAP-4 non-regression).
- **G-POINTER-SIGN** *(re-scoped from G-MOOD-AMPLITUDE, closes F1/F5)* — in `sleepy`, the body/pseudopod
  shy AWAY from a near cursor (negative lean). *RED:* sleepy computes `+0.114` (a weak lean-IN) —
  `lerp(-0.2,0.6,0.45)·0.715` at `constants.ts:93`. *(The pass-1 orbit/wobble/pulse "amplitude" clause is
  DELETED — born-GREEN at `constants.ts:53,66-69`.)*
- **G-SDF-HITTEST-PRECISION** *(re-worded, closes F5/F6)* — a click in the disc-but-not-body gap falls
  through, AND a click ON an outboard satellite (orbit>body) activates. *RED:* `clip-path:circle()` is a
  disc (`Blob.vue:393`); it cannot hit an outboard satellite once W-SHOW promotes `orbit 0.30 > body 0.22`.
  *(Corner fall-through is NOT the gate — already green, `Blob.vue:379-381`.)*
- **G-DEFLATE-MORPH** *(re-worded, closes F2)* — the blob morphs `orb↔pill` on ONE shared spring scalar
  with a volume-preserving squash overshoot; deflate fires only on a SUSTAINED signal, never a transient
  hover. *RED:* no topology FSM; `morphT` is a surface axis (`types.ts:270-274`).
- **G-DOTRING-WITHIN-PILL** *(new, closes F2)* — the `dot-ring` renders as a distinct-dot satellite ring
  INSIDE the deflated pill during listening (not a standalone third macro-shape). *RED:* no listening
  sub-mode; satellites only orbit or absorb.
- **G-CONSUMER** — every greenfield primitive has ≥2 sites OR is exported OR is a named private demo
  helper; the liquid-metal default's consumer #1 = the demo hero.

---

## 5. π obligations (live paint-verified deltas — ALL OWED; run live-π per band, both Chrome + Safari; paint-arm parses oklab)

Unchanged from pass-1 §4.7 except the re-scoped gates' baselines: **π-MOOD** now proves ONLY the
sleepy-repel sign delta + the (author-new) chrome-sweep/irid peak, NOT an orbit/wobble/pulse "restoration"
(F1); **π-HITTEST** proves a disc-gap click + an outboard-satellite click, NOT corner fall-through (F5);
**π-TOPOLOGY** proves `orb→pill` deflate + the within-pill dot-ring, NOT a standalone dot-ring macro (F2).
π-CHROME-SWEEP, π-SHADOW, π-SHOW, π-ALIVE/π-PERF, π-SAFARI-SINGLE stand. Every one is OWED against an
un-captured RED baseline — this seat has no browser. Serialize the browser seat (browser-seat-singleton);
run live π in BOTH engines (the no-masking-fallback + WGPU-delete hinge on Safari paint).

---

## 6. Banked-route dispositions (unchanged in RANK; β's map now reconciled)

- **α (material + shadow + show + mood + alive redress): LEADING** — the destination CRIT2 confirms;
  every re-registration grounded in a landed root re-verified on disk. The three wave surgeries (W-MOOD
  re-cost, W-SHADOW mechanism pin, W-HITTEST re-word/re-order) are applied above; none re-orders α.
- **β (topology FSM): ALIVE, map now RECONCILED** — `orb↔pill` on the shared spring + within-pill dot-ring
  (§2.5), the law-13-vs-MARKS-B divergence resolved with a stated warrant (F2). Delivers law 13's topology
  half via a provable spring-scalar arrangement-selector; the new `useBlobTopology` is an arrangement
  selector over the shipped field, not a new renderer (passes the elegant-reduction test).
- **γ (WebGPU 3D-raymarch): BLOCKED** — three independent disk-verified blocks (permanent-floor
  ratification `blob-genesis.md:111`; mobile fill-rate wall; active WGPU-twin delete order `:122`). Reopens
  ONLY if α+β provably cannot make 2D read as liquid-metal (§7 gap-1, the α↔γ pivot) after a real 2D
  matcap/env term is π-captured. Do not resolve independently of the WGPU-twin delete.
- **δ (SVG-goo resurrection): BANKED-AS-ANCHOR** — assets harvested into α (cartoon shadow → W-SHADOW; free
  hit-test → the CPU SDF mirror); substrate not resurrected (no analytic edge, PRM-degrades-to-nothing,
  Safari `filter:url()` risk).

---

## 7. Convergence + open questions for the ASK

**Convergence: 60%** (pass-1 50 → CRIT2 45 → pass-3 60). Justification: every CRIT2 finding (F1–F7) is
resolved on disk, and the four designs pass-1 deferred are now DECIDED with evidence — the single material
identity (§2.1), the shared-spring/separate-field engine boundary (§2.2), the pinned shadow mechanism
(§2.3), the reconciled topology grammar (§2.5), and the `settled`-seam decoupling (§2.6). The mis-costed
wave is re-costed (F1) and the born-GREEN gate clause is cut. The DESIGN axis is now internally coherent
and adversarially hardened. The number does not go higher because the VERIFICATION axis is still 0%: this
is a paint-less seat, every π obligation is OWED against an un-captured RED baseline, and the sharpest gap
— does a 2D analytic field read as liquid-METAL chrome (the α↔γ pivot) — is unverified. The charter caps a
paint-less seat below convergence regardless (convergence needs a captured DELTA + a fresh adversarial
audit + two consecutive clean passes).

Open gaps (carried; the first is the dominant limiter):
1. **Zero paint / does 2D read as liquid-METAL chrome (the α↔γ pivot).** Next pass must prototype a 2D
   matcap/env-reflection term (still analytic, still WebGL2) and π-capture it against the METAL FLOW stills
   (`MARKS-B.md:215-218`) BEFORE conceding γ's substrate. Every gate born-RED here awaits paint.
2. **The always-alive `<7%` budget with aurora co-present** on a DPR-3 tile GPU is unmeasured (π-PERF owes).
3. **The sleepy-sign fix locus** depends on which pointerAttraction the shader lean reads (§2.4) — a W0
   disk check, not a design gap, but named so it is not assumed.

Open QUESTIONS routed to the user ASK (with recommendations):
- **Q-BLOB-DEFAULT (the default-register break).** Does the DEFAULT `<Blob>` ship as the loud liquid-metal
  creature, or stay the calm warm-cream whisper with liquid-metal opt-in (`register="liquid-metal"`)? This
  is a library-identity call on the presets-in-consumers fence. *Recommendation:* the library's OWN default
  evolves to the liquid-metal chrome identity (per the "lib's own default tokens evolve as its identity
  changes" memory), with the calm whisper preserved as a named register — but this is a taste call the user
  owns, and it inherits to every existing consumer (a clean break).
- **WGPU-twin delete coordination (cross-tranche).** W-DELETE-TWIN implements the value.js-genesis order
  (`BG.W-VIZ-SUBSTRATE-DELETE2`) that also touches dot-matrix/goo-dot. Whether it lands in THIS greenfield
  or a shared substrate-delete coordination wave is a sequencing call → surface in the BJ ASK, not resolved
  unilaterally.

---

## 8. Self-critique (failure-mode checklist)

- **Vacuous convergence:** avoided — 60%, capped honestly on zero paint; not a convergence claim.
- **Spec-cites-itself circularity:** the material target cites law 13 + `MARKS-B.md:215-218,262-269` + the
  METAL FLOW stills; the mood re-cost cites `constants.ts:53,66-69,93` disk facts; the topology
  reconciliation cites `MARKS-B.md:101-102,273` vs `IOS27-CODEX.md:58`; the shadow ruling cites
  `metaball.frag.ts:424-435`, `Blob.vue:354`, and design-vision `:157-159`. Not self-citing.
- **Gates that cannot fail:** the born-GREEN clause CRIT2 caught (G-MOOD-AMPLITUDE orbit/wobble/pulse) is
  DELETED; every remaining gate names a RED-at-HEAD file:line. G-CHROME's "reads as chrome" stays the
  softest, operationalized as frame-to-frame highlight motion but still partly taste (gap-1). G-POINTER-SIGN
  now asserts only the disk-RED sleepy sign (`+0.114`).
- **Elegant-reduction trap:** α's steps are re-tunes of landed roots; β's `useBlobTopology` is an
  arrangement-selector over the shipped field on the SHARED spring (no new engine, §2.2); γ FAILS honestly
  (→ BLOCKED); δ FAILS on material (→ BANKED). No "and then the hard part."
- **Legacy aliases / masked fallbacks:** clean break — gel-dome pair, whisper defaults, freeze-quiescence,
  WGPU twin DELETED, not aliased. The shadow ruling keeps ONE cast + ONE interior AO (stated, not silent).
- **Unverified gestalt:** REAL and dominant — no browser this seat; every π owed; the liquid-metal-2D
  question is the α↔γ pivot and remains unverified. This is the primary cap and is kept front-and-center.
- **Consumer-less substrate:** α's primitives have consumer #1 (demo hero + default `<Blob>`); the
  always-alive change's real consumer is EVERY `settled` reader (F7), addressed by the W0 seam ruling;
  β's topology consumer #1 is the autonomic mood arc + the demo mood pills. Overfit audit at W-FINAL.

Per the charter this is pass 3; convergence is not contemplated while paint is 0% and gap-1 (the α↔γ
pivot) is unverified. Next pass: prototype + π-capture the 2D matcap/env chrome term vs METAL FLOW; measure
the always-alive budget with aurora co-present; carry the two ASK questions.

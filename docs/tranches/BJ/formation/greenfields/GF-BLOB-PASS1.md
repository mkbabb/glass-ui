# GF-BLOB — greenfield design, PASS 1 (Fable seat)

One-seat compression of the design-loop charter (`PROMPTS/design-loop-prompt.md`): round-zero
portfolio → archaeology + codebase census per family → leading-spec draft (emotional-state model +
interactivity contract + wave shape + born-RED gates + π obligations) → self-critique → honest
convergence. TRANCHE-DEVELOPMENT: no source touched; this doc is the only artifact. No browser (a
Playwright suite owns the seat) — every π obligation is OWED, not discharged, and convergence is
capped accordingly.

Authorities read in full: `ios27/IOS27-CODEX.md` (law 13 + the material/motion laws 3/5/6/8),
`ios27/MARKS-B.md` (§V2 the Siri liquid-glass blob `f-0004/0017/0018/0019`, the METAL FLOW
material `:215-218`, the radius table). Archaeology (value.js, READ-ONLY):
`value.js docs/tranches/S/audit/blob-genesis.md` (the three-era survey + joint-rebuild contract),
`value.js docs/tranches/S/audit/lanes/design-blob-atmosphere-vision.md` (the material-hero brief),
the OLD demo goo-blob source at git `06929a4b` / `e32111c7^`
(`useBlobMood.ts` bold FSM, `metaball.frag.glsl` HSV perturb + pointer deform). Codebase census
at HEAD (`codex/bi-p-q-execution`): the shipped `src/components/blob/` engine (`Blob.vue`,
`composables/`, `shaders/`, `types.ts`, `constants.ts`, `presets.ts`).

---

## 1. Problem statement (the user's order + law 13)

The user, verbatim: *look to the OLD value.js implementation from several months back — cartoon-like
shadow, better lighting, more expressive, proper metaballing, better emotional states, high +
dynamic interactivity.* The codex authority (`IOS27-CODEX.md:58-60`, law 13): *the blob is liquid
metal — a 3D chrome metaball with a mobile pearlescent specular sweep, morphing pill↔orb↔dot-ring
on a spring squash (Siri V2/f-0004/0017/0019).*

The paradox the archaeology exposes: **the shipped engine is technically SUPERIOR to every past
implementation and yet reads as LESS alive.** The value.js genesis brief already proved this
(`blob-genesis.md §1.3`): the era-3 producer engine won the field math (IQ-normalized smin +
analytic gradient), the color (in-shader OKLCh + gamut clamp + OETF + dither), the motion doctrine,
and the lifecycle economics — but each generation *lost* something the prior had. Era 2 lost free
silhouette hit-testing; era 3's default lost the visible satellite show and flattened the mood.
The user is naming those losses. Six named deficits vs the remembered value.js blob:

| id | deficit | evidence at HEAD |
|----|---------|------------------|
| B-SHADOW | the shadow is a soft "grounded gel-dome", NOT the cartoon offset ink-stamp | `Blob.vue:343-360` DELIBERATELY chose the gel-dome and reserved the offset-stamp "for `<Card cartoon>` ONLY" — the exact choice the user overrules |
| B-LIGHT | the lit surface is a WHISPER, not liquid-metal chrome | `types.ts:398-407` `specStrength 0.16`, `iridescence 0.09`, `sssScale 0.1`, `coreGlow 0.06` — "the sheen is FELT, not seen" (`:379`); law 13 wants a MOBILE pearlescent chrome sweep |
| B-EXPRESS | the default hides the metaball show; the creature reads as a contained gumdrop | `types.ts:297-300` `orbitRadius 0.17 < bodyRadius 0.22` — satellite centers orbit INSIDE the body skin; the show-visible geometry (`orbit 0.30`) exists but only in the un-defaulted `BLOB_HERO` preset (`presets.ts`) |
| B-META | "proper metaballing" — the merge/absorb/emerge choreography is invisible at the default + FROZEN at rest | the quiescence gate parks the rAF when settled (`useMetaballRenderer.ts:75-86`, README `:322-327`); the genesis measured "zero distinct beads at rest, often absorbed" (`blob-genesis.md §1.3-4`) |
| B-MOOD | the emotional states were flattened when era-2's bold discrete FSM was reframed onto a circumplex | `constants.ts:64-104` `paramsFor` derives all 5 moods off one {valence,arousal} surface, then FLATTENS the punch: `pointerAttraction` multiplied by `(0.7+0.15·arousal)` (`:93`), the excited iridescence ceiling dropped `1.8→1.35` (`:99`). The OLD FSM (`06929a4b`) hand-tuned excited to `orbitSpeed 2.2 / wobble 2.0 / pulseAmp 0.05` and gave curious `pointerAttraction 0.6`, sleepy `-0.2` (a genuine shy-away) |
| B-INTERACT | interactivity is a single calm lean; the old blob had per-mood cursor attraction AND avoidance | `types.ts:415-427` `pointerStrength 0.10`, one lean channel; the OLD `metaball.frag.glsl` deformed the field toward the pointer AND the SVG era had cursor-repulsion (`blob-genesis.md §1.1`) — free because satellites were DOM |

No topology morph exists at all: `morphT` (`types.ts:274`) is a flat↔dressed SURFACE axis (cream
blob → lit meatball), NOT the law-13 pill↔orb↔dot-ring SHAPE machine. The Siri dot-ring (listening)
and pill (collapsed island) states are absent; the blob is always an orb.

The codex verdict to BEST, not photocopy (`MARKS-B.md:215-218`): the Siri material is warm/neutral
**chrome with a mobile specular highlight** (the METAL FLOW stills), and the boundary is a
**specular caustic that concentrates on the lower rim + corners and animates a hue cycle**
(`MARKS-B.md:262-269`) — which glass-ui can tokenize + prove where iOS is convention-only.

---

## 2. Census — what survives, what the greenfield replaces

The analytic single-pass 2D-SDF engine is the ratified permanent floor (`blob-genesis.md §1.3`
table; README `:59-60`). The greenfield's target is the REGISTER, DEFAULT, MOOD, and MATERIAL
layers riding on it — not the field algorithm. Evidence is file:line at HEAD.

### SURVIVES (the engine spine — reuse, do not re-fork)
- **The analytic smin field** — IQ-normalized quadratic/circular smin with the gradient carried
  through the merge (`shaders/sdf-body.glsl.ts`, `metaball.frag.ts:170-174`), dome-Z lift,
  premultiplied alpha. Gate-green, the `proof:blob-*` locks. Nothing to add (genesis §2.2 "no
  architecture change is on the table").
- **The OKLCh material pipeline** — in-shader OKLCh perturbation + hue-preserving gamut clamp +
  sRGB OETF + IGN dither (README `:78-82`); the shared `procedural-color` chunk. The greenfield's
  chrome material EXTENDS this, does not replace it.
- **The satellite FSM** — `orbiting → merging → absorbed → emerging (→ fissioning)`
  (`types.ts:57-62`, `useBlobSatellites.ts`), seeded incommensurate multi-frequency wobble. The
  conserved soul of all three generations (`blob-genesis.md §1.4`). The greenfield RE-EXPOSES it,
  never freezes it.
- **The lit-surface machinery** — the engine ALREADY carries `uLit / uRimColor / uSpecStrength /
  uSpecShininess / uRimPower / uIridescence / uIridHue / uSssScale / uCoreGlow / uShadow`
  (`constants.ts:241-256`, the Blinn-Phong + Fresnel + iridescence + fast-SSS + procedural contact
  shadow blocks `metaball.frag.ts:376-455`). **The chrome material is a RE-TUNE + one traveling-
  sweep term, NOT a new shading engine.** This is the single most important census finding: the
  material deficit is a DEFAULT/AMPLITUDE problem, not a missing-primitive problem.
- **The pointer spring + click impulse** — critically-damped follow (`useBlobPointer.ts`),
  symplectic-Euler underdamped click bounce (`constants.ts:127-138` `PULSE_OMEGA/ZETA`), the
  velocity squash-stretch. Survives; the greenfield RE-AMPLIFIES it (B-INTERACT).
- **The 8-atom `BlobConfig` partition** — `geometry/satellites/membrane/color/surface/interaction`
  + `morphT/quality/tempo` (`types.ts:261-284`). The greenfield adds at most one register axis, no
  new atom zoo (the config-stability contract, genesis OQ10).
- **The manual/auto mood precedence latch** — `setMood(m, {source})` pins above the autonomic arc,
  releases on fresh live interaction (`useBlobMood.ts:102-153`). A correct primitive; the
  greenfield keeps the LATCH and turns the AMPLITUDE back up.
- **`BLOB_HERO` preset** — the show-visible geometry (`orbit 0.30 > body 0.22`, 4 satellites,
  near-circular eccentricity, `smoothK 0.06`) is ALREADY solved + exported (`presets.ts`). The
  greenfield PROMOTES this posture toward the default.

### REPLACED (the greenfield's target — clean break, no alias; no-backwards-compat)
- **The gel-dome CSS shadow** (`Blob.vue:343-360`) — `filter: drop-shadow(--blob-shadow-ambient)
  drop-shadow(--blob-shadow-contact)`. REPLACED by the cartoon offset ink-stamp register
  (design-vision §2: "~4px SE near-black ink… the register bridge that makes the blob belong to
  the plate"). The gel-dome's explicit rejection of the offset-stamp is the choice being overruled.
- **The flattened mood amplitude** (`constants.ts:64-104`) — the `paramsFor` derivation SURVIVES
  as the interpolation surface, but the flattening multipliers (`:93` pointerAttraction, `:99-102`
  iridescence ceiling) are RE-DERIVED to the bold envelope (the OLD `06929a4b` targets are the
  amplitude reference, not the circumplex smoothness). Clean re-tune, not an alias.
- **The freeze-at-rest quiescence** — the rAF parks when `settled` (`useMetaballRenderer.ts:75-86`).
  REPLACED by a never-park-while-`satelliteCount>0` low-energy breathing rest pose (genesis OQ2
  measured the always-on satellite pass at <7% of the page GPU cost) — the breath-of-life edict
  (every component ALWAYS displays engagement) forbids a frozen-dead blob. The offscreen/hidden/PRM
  parks (`composeIntersectionPark`, `:161-162`) are RETAINED — they park an INVISIBLE blob, not a
  visible-but-idle one.
- **The whisper surface defaults** (`types.ts:398-407`) — REPLACED by the chrome register defaults
  (B-LIGHT). The whisper stays available as the `WatercolorDot`-adjacent "calm ambient" register;
  the DEFAULT `<Blob>` becomes the liquid-metal creature.

### USER-GATED / CROSS-REPO (do not decide unilaterally)
- **The WGPU twin** — `metaball.wgsl.ts` (528 LoC) + `wgpuSetup.ts` + `uniformBridgeWGPU.ts`, still
  selected by `navigator.gpu` (`useMetaballRenderer.ts:93-95`). The value.js genesis brief ORDERED
  it deleted (`BG.W-VIZ-SUBSTRATE-DELETE2`, `blob-genesis.md §1.3-ails-1 / §3.1`) — WebGL2-only
  from day one — because it causes the Safari dual-surface contention P0 (Chrome takes WebGPU,
  Safari the less-exercised WebGL2, aurora holds a 2nd WebGL2 context). At HEAD it SURVIVES. The
  greenfield takes the position that the material/mood redress lands WebGL2-only (§4 W-DELETE-TWIN)
  but flags the delete as a cross-tranche coordination point, not a silent decision.

---

## 3. Portfolio — four orthogonal families (round zero)

Keyed by ARCHITECTURAL CENTER, not by surface. Two routes that share a center share a family.

### Family α — MATERIAL + MOOD REDRESS; center = the shipped WebGL2 analytic-SDF engine, re-registered
The center is the EXISTING solver. The thesis: the six deficits are a DEFAULT / AMPLITUDE /
REGISTER problem, not an engine problem — the genesis brief already proved the field math, color,
motion, and lifecycle are SOTA. The greenfield re-tunes.
- **Mechanism (five decoupled re-registrations):** (1) chrome material — animate the EXISTING
  specular into a traveling pearlescent sweep + push the iridescent lower-rim caustic (law 13 +
  MARKS-B `:262-269`), re-anchor the whisper defaults to a chrome envelope; (2) cartoon offset
  ink-stamp shadow replacing the gel-dome; (3) show-visible default — promote the `BLOB_HERO`
  orbit>body posture toward the shipped default; (4) bold mood amplitude — re-derive the flattened
  `paramsFor` back to the `06929a4b` envelope, keep the latch; (5) always-alive rest pose — kill
  the freeze-at-rest quiescence for `satelliteCount>0`.
- **Codebase fit:** STRONGEST — every re-registration has a landed root (the surface uniforms
  exist, the HERO geometry is solved, the mood surface exists, the satellite FSM exists). ZERO new
  primitives; the material change is a re-tune + ONE traveling-sweep GLSL term.
- **Research verdict:** the lowest-risk route that satisfies ALL SIX user deficits + law 13's
  material half (chrome + pearlescent sweep + rim caustic). Does NOT deliver law 13's TOPOLOGY half
  (pill↔orb↔dot-ring) — that is β. GAP: "chrome" faked by 2D gradient may not read as liquid-METAL
  (vs matte gumdrop) without a matcap/env term (§6 gap 1).
- **Disposition: LEADING** — full spec §4. Composes WITH β (β's topology FSM rides α's redressed
  surface).

### Family β — TOPOLOGY-MORPH FSM; center = a pill↔orb↔dot-ring shape state machine on one squash-spring scalar
The center is not the material but the SHAPE STATES. Law 13 taken literally: the blob MORPHS
topology on a spring squash. Today it is always an orb.
- **Mechanism:** a topology FSM {`pill`, `orb`, `dot-ring`} where each state is a smin arrangement
  of the SAME point sources: `orb` = body + orbiting satellites (today's state); `dot-ring` =
  satellites arranged on a ring at low smoothK with a hollow/dim body (the Siri listening dots,
  V2/f-0019); `pill` = body stretched along one axis with the satellites gathered in (the collapsed
  Dynamic Island). Morphs run on ONE spring squash scalar (the shipped `SpringProgress` /
  `springPreset` the dock uses, or the blob's own pulse spring) — volume-preserving squash on the
  transition. The EMOTIONAL states MAP to topology (dot-ring = curious/listening, orb = idle/happy,
  pill = sleepy/collapsed).
- **Codebase fit:** the satellites ARE the point sources; the smin field renders any arrangement;
  the spring primitive is shipped. The NEW primitive is the topology FSM + the emotion→topology map
  + the per-state SDF arrangement (a `useBlobTopology` composable). Tractable — the field already
  merges N sources — but the "pill" and "dot-ring" SDF arrangements + the morph choreography are a
  genuine design, not a re-tune.
- **Research verdict:** the most codex-faithful (delivers law 13's topology half) and the most
  novel — a mascot that changes SHAPE with mood is the breath-of-life edict's "novel affordance
  that BESTs iOS 27." BEST-iOS-27 because the topology is a PROVABLE spring-scalar machine where
  Siri's is a black-box animation.
- **Disposition: ALIVE** — specced as the §4 W-TOPOLOGY wave (composes on α); the emotion→topology
  map is the open design (§6 gap 3).

### Family γ — WebGPU 3D-RAYMARCH CHROME REBUILD; center = a new substrate (real 3D SDF + env-mapped metal)
The center is the SUBSTRATE. Law 13's "3D chrome metaball" taken literally as REAL 3D: a WebGPU
raymarched 3D SDF droplet (Codrops 2025 reference, `blob-genesis.md §2.2`) with a matcap /
environment-mapped chrome surface — genuine liquid-metal reflection, not faked-by-gradient.
- **Mechanism:** per-fragment sphere-tracing of a 3D smin field; real surface normals; env-map /
  matcap reflection for the chrome; screen-space refraction of the backdrop (the sanctioned
  `uBackdrop` extension taken to 3D). True volume, true specular sweep from a real light.
- **Codebase fit:** runs HEAD-ON into the ratified decision. `blob-genesis.md §1.3` table:
  **"WebGL2 single-pass 2D-SDF is the PERMANENT floor. WebGPU is NOT warranted"** — for a flat UI
  mark at ≤4 nuclei the 2D analytic field dominates on cost (flat `O(W·H·N)`, no overdraw,
  fwidth-AA resolution independence) vs a per-fragment step loop. AND the WGPU twin the repo
  carries is ORDERED DELETED (§2). A raymarch is also fill-rate-catastrophic on the tile-based
  mobile GPUs the Q7 full-presence constraint targets (`blob-genesis.md §2.4`).
- **Research verdict:** genuine liquid-metal, but the load-bearing substrate is blocked by a
  ratified permanent-floor decision + a mobile perf wall + an active delete order. The "and then
  the hard part" is the entire substrate.
- **Disposition: BLOCKED** — reopens ONLY if α+β provably CANNOT make 2D read as liquid-metal
  chrome (i.e. if §6 gap 1 fails after a real matcap/env term in 2D is tried). It intersects the
  WGPU-twin delete; do not resolve independently.

### Family δ — SVG-GOO + DOM-SATELLITE RESURRECTION; center = the DOM/filter substrate (era-1)
The literal "resurrect the OLD value.js implementation": the era-1 `#gooey-filter` blur+threshold
goo with absolutely-positioned DOM satellites, DOM `drop-shadow` (the CARTOON shadow, free),
free silhouette hit-testing, cursor repulsion (`blob-genesis.md §1.1`).
- **Mechanism:** SVG `feGaussianBlur` + `feColorMatrix` alpha threshold goo; DOM satellite divs;
  CSS filters for the cartoon shadow.
- **Codebase fit:** it was DELETED for cause (`88f8f09`, −798 LoC): the blur+threshold has NO
  analytic edge (halo/fringe class, flat discs, no per-pixel shading — the whole material story was
  drop-shadow), the 14px blur re-runs the whole layer every frame (filter fill-cost), and
  reduced-motion had to DISABLE the goo entirely (the register degraded to NOTHING). Safari can't
  chain `url()` + `drop-shadow()` in one filter.
- **Research verdict:** it delivers the cartoon shadow + free hit-test the user misses, but it is a
  hard REGRESSION on material (the exact lighting/expressiveness the user ALSO asks for is
  impossible in it). The `filter:url()` Safari risk is the SAME class the retired dock fission goo
  died on.
- **Disposition: BLOCKED / BANKED-AS-ANCHOR** — the archaeological reference for what to CONSERVE
  (cartoon shadow → α B-SHADOW; free hit-test → the SDF CPU-mirror hit-test seam, genesis §2.5),
  not a serious substrate contender. Its assets are harvested into α, not resurrected whole.

---

## 4. Leading spec — GF-BLOB-α "Liquid-Metal Creature" (+ β topology as a composed wave)

### 4.1 The load-bearing decomposition
The greenfield's thesis: **material register ⊥ shadow register ⊥ show-visible default ⊥ mood
amplitude ⊥ always-alive rest ⊥ topology.** Today they are fused into one whisper-lit contained
gumdrop that freezes at rest. Splitting them lets each deficit be fixed at its OWN landed root
without a rewrite, and lets the topology FSM (β) ride the redressed surface as an additive wave.
This is what makes α+β BEST-iOS-27 (a provable spring-scalar topology + tokenized chrome caustic)
rather than a photocopy of Siri.

### 4.2 The new primitives (small, named, tractable — NOT equal-difficulty to the problem)
1. **One GLSL traveling-sweep term** (α) — a `uSpecSweep` phase that moves the pearlescent
   highlight ACROSS the equator over time (the METAL FLOW mobile sheen), added to the EXISTING
   Blinn-Phong block (`metaball.frag.ts:442-455`). ~10 lines; the light machinery already exists.
2. **`useBlobTopology`** (β) — a topology FSM {pill, orb, dot-ring} publishing a per-state target
   arrangement of the point sources + one squash-spring scalar. Drives the satellite target
   positions the EXISTING `useBlobSatellites` already animates. The one genuinely new composable;
   scoped as an arrangement-selector over the shipped field, NOT a new renderer.
3. **The cartoon offset-stamp shadow** (α) — a derived `--blob-shadow-cartoon` (SE offset, near-
   black ink, silhouette-following via `drop-shadow` on the metaball alpha) replacing the gel-dome
   pair. Data + one CSS rule; no new engine.
4. **The CPU SDF hit-test mirror** (α, harvested from δ) — evaluate the same smin field at the
   pointer coord on the CPU (the sources upload every frame anyway) for an exact-silhouette
   hit-test (genesis §2.5) — restores era-1's free hit-test, cures the dead-corner sibling-click
   eat (B-INTERACT + the corner-break composition). ~a handful of flops; a `hitTest(x,y)` expose.

### 4.3 Emotional-state model (REQUIRED by charter)
The circumplex {valence, arousal} derivation SURVIVES as the interpolation surface — but re-derived
to the BOLD envelope and extended with topology + a cursor-avoidance axis.

| mood | valence / arousal | topology (β) | amplitude (α, vs today) | pointer (B-INTERACT) |
|------|-------------------|--------------|-------------------------|----------------------|
| **idle** | 0.0 / 0.35 | orb, calm breath | keep calm, but NEVER freeze (always-alive rest) | neutral |
| **curious** | 0.3 / 0.5 | → **dot-ring** (Siri listening), body dims | wobble up | strong ATTRACT (restore old `0.6`, un-flatten `:93`) |
| **happy** | 0.8 / 0.6 | orb, brighter sweep | brighter chrome sweep, faster orbit | mild lean-in |
| **excited** | 0.7 / 1.0 | orb, satellites fling wide + fission | restore old bold (`orbit 2.2 / wobble 2.0 / pulseAmp 0.05`), pearlescent sweep peaks | one-shot bounce (click) |
| **sleepy** | -0.1 / 0.1 | → **pill** (collapse toward island), satellites gather in | dim, slow, chrome dulls to matte | shy AWAY (restore old `-0.2` repel — genuine cursor-avoidance) |

Triggers (autonomic arc, `useBlobMood.update`, RETAINED): fresh click → excited (held ~0.9s);
pointer-over → curious; idle > `IDLE_SLEEP_MS` (6s) → sleepy; else idle. The manual `setMood` latch
(pins above the arc, releases on fresh interaction) is RETAINED. NEW: each mood carries a topology
target (β) and the pointer sign (attract/repel) is mood-owned again, not a flattened multiplier.

### 4.4 Interactivity contract (REQUIRED by charter)
- **Pointer lean/avoid** — the body + trail-pseudopod lean TOWARD the cursor (attract moods) or
  shy AWAY (sleepy, `-0.2`); the sign is mood-owned. Magnitude in `interaction.pointerStrength`,
  re-amplified from the calm `0.10`.
- **Click bounce** — the one-shot underdamped spring impulse (`PULSE_OMEGA/ZETA`), emits `click`,
  drives excited. Under PRM: the semantic action fires; the animated impulse resolves to the static
  rest pose (WCAG 2.2.2, README `:355-361`).
- **Exact-silhouette hit-test** — the CPU SDF mirror (§4.2-4): a click on the body/satellite
  silhouette activates; a click on the dead corners/margin falls THROUGH to the sibling card. The
  current `clip-path: circle()` approximation (`Blob.vue:383-394`) is replaced by the true field
  test.
- **Always-alive** — while `satelliteCount>0` the loop never parks; the creature breathes,
  satellites orbit, the sweep travels — even with no pointer (breath-of-life edict). Offscreen /
  `document.hidden` / PRM still park (the GAP-4 lifecycle is not regressed).
- **Topology squash on morph** (β) — a mood-driven topology change runs on the spring squash
  scalar with a volume-preserving overshoot (law 13 "spring squash"; the liquid-weight edict).
- **`v-model:paused`** — the declarative WCAG pause seam (`Blob.vue:238-242`) is RETAINED.

### 4.5 Wave shape (bbnf-lang tranche format; hard gates; FINAL.md)

| wave | title | scope | hard gate(s) | π obligation |
|------|-------|-------|--------------|--------------|
| **W0** | CENSUS + CONTRACT-LOCK | freeze §2 survives/replaces; author all born-RED gate scaffolds (all RED at HEAD); decide the WGPU-twin delete coordination | gate suite compiles + all RED | — |
| **W-DELETE-TWIN** | WEBGL2-ONLY | delete `metaball.wgsl.ts` + `wgpuSetup.ts` + `uniformBridgeWGPU.ts`; renderer is WebGL2-only (genesis §3.1); dissolves the Safari dual-surface P0 | G-NO-WGPU | π-SAFARI-SINGLE |
| **W-SHADOW** | CARTOON INK-STAMP | replace the gel-dome (`Blob.vue:343-360`) with the SE offset near-black ink-stamp shadow register; silhouette-following | G-CARTOON-SHADOW | π-SHADOW |
| **W-CHROME** | LIQUID-METAL MATERIAL | the `uSpecSweep` traveling-sweep term + re-anchored chrome defaults + the iridescent lower-rim caustic (law 13, MARKS-B `:262-269`); the whisper stays as the calm register | G-CHROME, G-RIM-CAUSTIC | π-CHROME-SWEEP |
| **W-SHOW** | SHOW-VISIBLE DEFAULT | promote the `BLOB_HERO` orbit>body posture toward the shipped default; the merge/absorb/emerge choreography READS at the default scale | G-SHOW-VISIBLE | π-SHOW |
| **W-ALIVE** | ALWAYS-ALIVE REST | kill freeze-at-rest for `satelliteCount>0` (never-park); retain offscreen/hidden/PRM park; perf budget gate | G-NEVER-FREEZE, G-PARK-OFFSCREEN | π-ALIVE, π-PERF |
| **W-MOOD** | BOLD EMOTIONAL STATES | re-derive `paramsFor` to the bold envelope (un-flatten `:93`, `:99-102`); restore mood-owned pointer sign (curious attract / sleepy repel); keep the latch | G-MOOD-AMPLITUDE, G-CURSOR-AVOID | π-MOOD |
| **W-HITTEST** | EXACT SILHOUETTE HIT | CPU SDF field-mirror `hitTest(x,y)` expose; replace the `clip-path:circle()` approximation; corner clicks fall through | G-SDF-HITTEST | π-HITTEST |
| **W-TOPOLOGY** | PILL↔ORB↔DOT-RING (β) | `useBlobTopology` FSM + emotion→topology map + squash-spring morph (law 13 topology half) | G-TOPOLOGY-MORPH | π-TOPOLOGY |
| **W-FINAL** | CONSUMER + AUDIT | demo hero adopts the liquid-metal default; overfitting audit (≥2 sites / exported / private helper); FINAL.md | G-CONSUMER, overfit-audit | π-HERO |

### 4.6 Born-RED gates (each states its RED-at-HEAD condition; kept small per the gates-abrogation mandate)
- **G-NO-WGPU** — no `metaball.wgsl` / `navigator.gpu` selection path in the blob renderer. *RED:*
  `useMetaballRenderer.ts:93-95` selects WebGPU-first today.
- **G-CARTOON-SHADOW** — the blob casts an SE-offset near-black ink-stamp shadow following the
  metaball silhouette; NO soft gel-dome pair. *RED:* `Blob.vue:343-360` is the gel-dome.
- **G-CHROME** — at the default `<Blob>`, the surface reads as a lit chrome bead with a MOBILE
  specular sweep (a highlight whose position changes frame-to-frame), not a static whisper glint.
  *RED:* `specStrength 0.16 / iridescence 0.09` static, no `uSpecSweep` (`types.ts:398-407`).
- **G-RIM-CAUSTIC** — the lower rim + corners carry a brighter iridescent caustic (law 13). *RED:*
  the iridescence is a uniform fres-weighted whisper (`metaball.frag.ts:376-396`), not lower-rim
  concentrated.
- **G-SHOW-VISIBLE** — at the shipped default geometry, ≥2 satellites read as DISTINCT orbiting
  beads at rest (not absorbed bulges). *RED:* `orbitRadius 0.17 < bodyRadius 0.22` (`types.ts:300`)
  → all read as breathing bulges (design-vision P1-3).
- **G-NEVER-FREEZE** — with `satelliteCount>0` and the blob on-screen, the rAF does NOT park at
  rest (the creature keeps breathing). *RED:* the quiescence gate parks when settled
  (`useMetaballRenderer.ts:75-86`).
- **G-PARK-OFFSCREEN** — an offscreen / `document.hidden` / PRM blob STILL parks (GAP-4 non-
  regression). *RED-by-construction guard* — must stay GREEN across W-ALIVE.
- **G-MOOD-AMPLITUDE** — the excited mood's orbit/wobble/pulse and the curious pointer-attraction
  reach the bold envelope (the `06929a4b` reference targets), not the flattened one. *RED:*
  `constants.ts:93` flattens pointerAttraction to `×(0.7+0.15·arousal)`; `:99` drops the excited
  ceiling.
- **G-CURSOR-AVOID** — in `sleepy`, the body/pseudopod shy AWAY from a near cursor (negative lean).
  *RED:* the flattened multiplier suppresses the negative half at low arousal (`:93`).
- **G-SDF-HITTEST** — a pointer over the silhouette activates; over the dead corners it falls
  through to the sibling. *RED:* `clip-path: circle()` is a disc approximation (`Blob.vue:393`).
- **G-TOPOLOGY-MORPH** — the blob morphs between pill / orb / dot-ring on one spring squash scalar
  (law 13). *RED:* no topology FSM exists; `morphT` is a surface axis (`types.ts:274`).
- **G-CONSUMER** — every greenfield primitive has ≥2 sites OR is exported OR is a named private
  demo helper (the overfitting-audit invariant); the liquid-metal default has consumer #1 = the
  demo hero.

### 4.7 π obligations (live paint-verified deltas — ALL OWED; run live-π per band; paint-arm parses oklab)
- **π-CHROME-SWEEP** — capture N frames of a default `<Blob>`; prove the specular highlight
  POSITION travels (frame-to-frame delta), reads as chrome not gumdrop. Baseline = static whisper.
- **π-SHADOW** — capture the blob on a card; prove the SE offset ink-stamp follows the silhouette
  (not a soft gel-dome, not a rectangle box-shadow). Baseline = `Blob.vue` gel-dome.
- **π-SHOW** — capture the default at rest; prove ≥2 distinct orbiting beads. Baseline = absorbed
  bulges (design-vision `blob-closeup-t0.png`).
- **π-ALIVE / π-PERF** — capture a 3s idle window; prove continuous motion (no frozen frame) AND
  the per-frame GPU cost stays within the genesis <7%-of-page budget.
- **π-MOOD** — capture excited vs sleepy; prove the bold amplitude delta (fast wide orbit vs
  slow gathered) and the curious-attract / sleepy-repel pointer sign.
- **π-TOPOLOGY** — capture orb→dot-ring→pill morphs; prove the spring squash + volume-preserving
  overshoot, no bare crossfade (law 13 / motion law 8).
- **π-HITTEST** — capture a corner click falling through to the sibling card + a silhouette click
  activating. Baseline = disc `clip-path` eats corner clicks.
- **π-SAFARI-SINGLE** — capture blob + aurora coexisting in Safari on ONE WebGL2 context path each
  (no WGPU split). Baseline = the dual-surface contention P0.

Per the browser-seat-singleton + live-π memory: serialize the browser seat; run live π per band
(device-free gates pass while live π false-FAILS on oklab tokens — paint-arm now parses oklab); run
live π in BOTH Chrome and Safari (the no-masking-fallback + WGPU-delete both hinge on Safari paint).

---

## 5. Banked-route dispositions
- **α (material + mood redress): LEADING** — full §4 spec; satisfies all six user deficits + law
  13's material half; ZERO new renderers, four small named primitives.
- **β (topology FSM): ALIVE** — composed as W-TOPOLOGY on α; delivers law 13's topology half; the
  emotion→topology map is the open design (§6 gap 3). Kept alive because it is the codex headline
  and the breath-of-life "novel affordance."
- **γ (WebGPU 3D-raymarch): BLOCKED** — reopens ONLY if α+β provably cannot make 2D read as liquid-
  metal (§6 gap 1 fails after a real 2D matcap/env term is tried); intersects the WGPU-twin delete,
  do not resolve independently. The permanent-floor ratification + the mobile fill-rate wall + the
  active delete order are three independent blocks.
- **δ (SVG-goo resurrection): BLOCKED / BANKED-AS-ANCHOR** — its conserved assets (cartoon shadow,
  free hit-test) are HARVESTED into α (B-SHADOW, the CPU hit-test mirror); the substrate itself is
  a material regression (no analytic edge, no lit surface, PRM-degrades-to-nothing, Safari
  `filter:url()` risk) and is not resurrected whole.

---

## 6. Self-critique (failure-mode checklist)
- **Vacuous convergence:** avoided — PASS 1, ~50%, not a convergence claim.
- **Spec-cites-itself circularity:** the material target cites law 13 + MARKS-B Siri frames
  (`V2/f-0004/0017/0019`) + the METAL FLOW stills + shipped file:line; the mood target cites the
  OLD `06929a4b` amplitude; the deficits cite HEAD file:line. Not self-citing. Clean.
- **Gates that cannot fail:** each gate names its RED-at-HEAD condition with a file:line. G-NEVER-
  FREEZE is a hard behavioral assertion; G-SHOW-VISIBLE is a countable ≥2-distinct-beads test;
  G-NO-WGPU is a presence check. G-CHROME's "reads as chrome" is the softest — mitigated by the
  MOBILE-sweep operationalization (highlight position changes frame-to-frame) but still partly a
  taste judgment (gap 1).
- **Elegant-reduction trap ("and then the hard part"):** α's load-bearing steps are the traveling-
  sweep GLSL term (~10 lines on existing machinery), the cartoon-shadow data+CSS, the default
  geometry promotion, the mood re-derivation, and the never-park flag — all re-tunes/re-registers
  of LANDED roots, none equal-difficulty to the problem. β's new primitive (`useBlobTopology`) is
  named + scoped as an arrangement-selector over the shipped field. γ FAILS this test (its
  substrate IS the hard part → BLOCKED honestly). δ FAILS on material (→ BANKED).
- **Legacy aliases / masked fallbacks:** clean break — the gel-dome, the whisper defaults, the
  freeze-quiescence, and the WGPU twin are DELETED, not aliased (no-backwards-compat). The chrome
  works in paint or fails loud; no fallback hides a matte gumdrop. The WGPU-twin delete removes the
  masking dual-backend split.
- **Unverified gestalt:** REAL — no browser this seat; every π obligation is OWED against an
  un-captured RED baseline. This is the primary convergence cap. Especially: "does 2D read as
  liquid-METAL chrome" is unverified and is the α↔γ pivot.
- **Consumer-less substrate:** α's primitives all have consumer #1 (the demo hero + the default
  `<Blob>`); overfit audit at W-FINAL. β's topology needs a real trigger surface (the mood arc
  drives it — consumer #1 is the autonomic mood, plus the demo mood pills); flagged, not hidden.

## 7. Convergence + open gaps
**Convergence: 50%.** The decomposition (§4.1) is sound and every α re-registration is grounded in
a landed root with a file:line — the material machinery, the HERO geometry, the mood surface, and
the satellite FSM all already exist, so α is a re-tune not a rewrite. The gates are born-RED and
small. What is NOT earned:

1. **Does 2D read as liquid-METAL chrome? (the sharpest gap, the α↔γ pivot).** Law 13 + METAL FLOW
   want warm/neutral CHROME with a mobile sheen. α fakes it by animating a 2D gradient sweep +
   iridescent caustic on a flat SDF. Whether that reads as METAL (vs a shinier gumdrop) is
   UNVERIFIED and is the single decision that could re-order α vs γ. Next pass: prototype a 2D
   matcap/env-reflection term (still analytic, still WebGL2) and π-capture it against the METAL
   FLOW reference BEFORE conceding γ's substrate.
2. **Zero paint verification.** Doc-only seat; every π obligation is OWED. No RED baseline captured
   (the design-vision session's `blob-closeup` shots are the nearest prior baseline, not this
   greenfield's).
3. **The emotion→topology map (β) is under-specified.** §4.3 proposes curious→dot-ring,
   sleepy→pill, but WHY those pairings, and how the morph choreography avoids reading as a gimmick
   (a mascot changing shape every hover is exhausting), is unresolved. The morph must be RARE +
   meaningful (dot-ring only on genuine "listening" moments), not per-hover. Needs the DESIGN-
   ITERATION convergent loop (brainstorm-3 → golden → challenge-3).
4. **The always-alive vs quiescence economics tension.** G-NEVER-FREEZE (breath-of-life) directly
   contradicts the GAP-4 quiescence the genesis brief says must NOT regress. The reconciliation
   ("park invisible, breathe visible") is asserted but the exact seam against
   `composeIntersectionPark` + the aurora's shared substrate budget at <lg (both alive on a DPR-3
   tile GPU) is unmeasured. This is the perf gate π-PERF owes.
5. **The WGPU-twin delete is cross-tranche.** W-DELETE-TWIN implements a value.js-genesis order
   (`BG.W-VIZ-SUBSTRATE-DELETE2`) that the BJ branch has not executed; whether it lands in THIS
   greenfield or a coordination wave with the substrate-delete band is undecided (the delete also
   touches dot-matrix/goo-dot per the same book).
6. **The default-register break is a consumer-visible identity change.** Making the DEFAULT `<Blob>`
   the loud liquid-metal creature (vs the calm cream whisper) is a clean break that every existing
   consumer inherits; the calm register survives but is no longer the default. Whether that is the
   right default (vs an opt-in `register="liquid-metal"` preset) is a taste decision the presets-in-
   consumers fence bears on (the LIBRARY's own identity may evolve, per the memory) — undecided.
7. **Cartoon shadow vs the plate.** The design-vision §2 specced the offset ink-stamp as "the
   register bridge that makes the blob belong to the plate" — but that assumed the corner-break
   card composition. On a bare/dark background the SE near-black stamp may read as a detached
   Memphis sticker, not a grounded creature. The shadow register may need to be context-aware
   (stamp on a plate, softer off it) — unresolved.

Per the charter, this is PASS 1 of ≥3 before contemplating convergence. Next pass should:
prototype the 2D matcap/env chrome term + π-capture it vs METAL FLOW (resolve gap 1, the α↔γ
pivot); run the DESIGN-ITERATION loop on the emotion→topology map (gap 3); and measure the
always-alive perf budget with aurora co-present (gap 4).

# AX.W09 — Specular tune-to-subtle: warm-cream low-alpha + one token ladder + retire the double-light

**Band** B · GRAPHICS · **Severity** blocker (raised from major — THREE live consumer confirmations, §24)
· **dependsOn** AX.W00 (the π-lane close machinery)
· **Charter** AX.md §3 (the `### AX.W09` block, lines 618-657) + §4 note 12 (the published-vs-HEAD
reconcile) + §4 note 2 (the substrate-hygiene `-1000` routing) + §2b band-B precept row · **Audit**
`deep-audit-corpus.json` slice `graphics-specular-substrate` (index 14, findings F0-F4) + slice
`tailwind-styling` (index 27, findings F3/F4/F5) + `converge-digest.md` digest lines 8-9, 145-146 (the
keyframes.js live-consumer `Card specular` ask + the published-3.4.0 magnitude the tune must beat).

---

## State (born-RED — the gate must fail at HEAD)

The wave is born-RED on a **tokenized-subtle-specular** witness that does NOT exist at HEAD `eaba94f`. Three
falsifiable RED witnesses:

- **RED witness 1 (the headline — magnitude, source-true).** The unified moving-specular at its single source
  (`glass.css` `.glass-material::before`, the `.glass-*`/`.glass-card`/`.dock-icon-button` group) paints a
  **pure-white** screen-blended catch-light: the inner gradient stop is `hsl(40 30% 100% / 0.55)` — L=100%
  saturates the 30% away, so the "warm-cream tint" the comment CLAIMS is in fact PURE WHITE at 0.55α —
  composited with `mix-blend-mode: screen`, scaled by an intensity ladder of **rest 0.35 / hover 0.6 / active
  0.85** (the layer `opacity`). At active that is ≈ 0.55 × 0.85 ≈ 0.47 pure-white-screen — a blown-out
  hotspot that washes the surface toward white under the cursor. The falsifiable RED assertion: *parse the
  `.glass-material::before` inner gradient stop + the three intensity rungs — at HEAD the inner color is
  `hsl(40 30% 100%)` (resolves pure white) and the rungs are the literal `0.35`/`0.6`/`0.85` (RED). After the
  wave the inner color is a genuine low-alpha warm-cream and the three rungs resolve through the
  `--glass-specular-intensity-{rest,hover,active}` token cohort at the SUBTLE magnitudes (≈ 0/0.08 · 0.22 ·
  0.32) (GREEN).*

- **RED witness 2 (the token cohort does not exist — grep-falsifiable, deletion-of-literals proof).**
  `grep "specular-intensity-"` over `src/styles/` returns **NONE**. The three magnitudes are buried literals
  across two files (`glass.css` rest `0.35` + `:hover 0.6` + `:active 0.85`; the `.dark` arm `0.22`), NOT a
  single overridable cohort, so the "subtle vs extreme" axis has **no consumer knob** — a token-first-axis
  violation (J invariant). RED: there is no `--glass-specular-intensity-rest/-hover/-active` token; the
  magnitude is un-overridable. The `@property --specular-intensity` is correctly registered with
  `initial-value: 0` (tokens.css:1724-1727), but the `::before` rule overrides it to `0.35` unconditionally —
  the rest floor DEFEATS the @property dormancy, so every static unwired `.glass-*` plate paints a centered
  catch-light at rest.

- **RED witness 3 (the dock double-specular + the duplicated pointer seam — grep + computed-style
  falsifiable).** `.dock-icon-button` is a member of the `.glass-material` `::before` group AND
  `dock-controls.css:101-102` SEPARATELY applies `:hover:not(:focus-visible) { box-shadow:
  var(--dock-icon-hover-shadow, var(--glass-highlight)) }` — a SECOND inset top-edge specular that STACKS on
  the moving `::before` on the most-hovered, slides-visible surface (the worst-offending blowout). RED: the
  dock control resolves two independent specular systems on hover. SEPARATELY, the identical `trackSpecular`
  pointer-write is hand-copied **verbatim** in `Card.vue:65` and `DockIconButton.vue:54`
  (`getBoundingClientRect → % → write --mouse-x/--mouse-y`) with NO composable home (`find` for a `specular`
  composable returns NONE) — a §0 DRY violation at ≥ 2 sites with a third (Button glass) wanting it. AND the
  Card carries NO `specular` prop (grep `specular` over `card/index.ts` = a `surface='glass'` opt-in only, no
  `off|subtle|full` control) — so a resting glass panel cannot be made clean without editing library source.

The wave is RED at HEAD on all three; the HardGate below drives each to GREEN.

---

## Goal

The moving-specular catch-light becomes a **subtle, warm-cream, token-overridable whisper** — one tokenized
intensity ladder at the single unified source, the dock no longer the hottest surface, static plates clean,
and a Card `specular` opt-in — closing the system-wide white-blowout the AW.W22 blast-radius promotion shipped.

---

## Scope (the gestalt fix — no workaround, no legacy, no per-component patch)

The audit's findings (slice 14 F0-F4 + slice 27 F3/F4/F5) are the SAME architectural seam at the SAME unified
source; ONE cohesive retune, NOT per-component patches. **The headline correction (slice 14 root + §4 note
12): the offending VALUES are unchanged since AV.W15 (`8036370`) and the blast-radius is AW.W22 (`6bb442f`)
promoting the `::before` from 3 opt-in components onto every band surface — the requirement's W23/W24 guess is
WRONG; the pointer-wiring is ALREADY at HEAD (do NOT re-wire). W09 is TUNE + tokenize + opt-in + retire-the-
double, NOT "wire the pointer."**

1. **Warm-cream low-alpha core (slice 14 F0 magnitude — the headline).** At the ONE unified source
   (`glass.css` `.glass-material::before`), drop the inner gradient stop from pure-white `hsl(40 30% 100% /
   0.55)` to a **genuinely warm-cream low-alpha** core (≈ `hsl(40 30% 96% / 0.22)` core, `/0.08` mid) so the
   ACTUAL painted light color carries the warm identity the comment falsely claims — L below 100% so the warm
   hue survives, alpha low so the catch-light reads as a lens not a flash. One stop edit at one site.

2. **Halve the ladder to a SUBTLE rung set + tokenize the cohort (slice 14 F0 ladder + slice 27 F3 token-
   first).** Mint `--glass-specular-intensity-{rest,hover,active}` (+ a `.dark` arm) as a single overridable
   cohort in `tokens.css` (§11b / the `@property --specular-intensity` neighbourhood), and re-baseline the
   defaults to a SUBTLE ladder: **rest ≈ 0 (or a near-imperceptible 0.08) · hover ≈ 0.22 · active ≈ 0.32** —
   roughly half the present `0.35/0.6/0.85`. `glass.css` READS the tokens (the `:hover`/`:active` rules set
   `--specular-intensity: var(--glass-specular-intensity-hover/-active)`), so the magnitude becomes a token a
   consumer or the dark arm retunes ON THE CASCADE — never three buried literals. (The cartoon-shadow override
   contract is the canonical precedent: override on `:root`, never a dead local.)

3. **Drop the rest floor to ~0 (slice 14 F3 — align painted behaviour with the @property initial 0).** Set the
   rest rung to ≈ 0 so static, UNWIRED surfaces are CLEAN — the catch-light wakes only on hover/active (where
   the user intent is) or on a pointer-wired surface. This aligns the painted behaviour with the correctly-
   registered `@property --specular-intensity { initial-value: 0 }` (tokens.css:1727) that the present
   unconditional `0.35` floor defeats. A Dialog/Popover that never wires `--mouse-x` no longer shows a centered
   white hotspot.

4. **Retire the dock control's SECOND specular (slice 14 F1 — the worst-offending blowout).** Pick ONE
   specular owner for `.dock-icon-button`: the moving `::before` is the sole catch-light (W22's material-
   uniformity intent). **Retire the `dock-controls.css:101-102` `:hover:not(:focus-visible)` `--glass-highlight`
   box-shadow** — either delete it, or DEMOTE it to a non-specular surface-tint fill so hover still reads a
   background shift without a second light. This also removes the `:not(:focus-visible)` specular-vs-ring
   juggling. One source per surface — the §0 "excise or fail" discipline. (The dock control is the most-hovered,
   slides-floated-over-aurora surface — the concrete worst offender; fixing magnitude alone without retiring
   this leaves the dock hotter than the rest of the band.)

5. **Lift the duplicated pointer seam into `useSpecularTracking()` (slice 14 F2 + slice 27 F4 — DRY).** Extract
   the verbatim-identical `trackSpecular` (Card.vue:65-76 ≡ DockIconButton.vue:54-65) into a tiny
   `useSpecularTracking()` composable under `src/composables/glass/` (or `/dom`) returning `{ specularStyle,
   onPointerMove }` — and respecting the reduced-motion freeze. Card + DockIconButton consume it; the moving-
   specular becomes a one-import opt-in instead of a hand-rolled pointermove handler at every site. This is the
   right home to ALSO read the new intensity tokens, so the composable and the token cohort stay one seam.

6. **Card `specular?: 'off' | 'subtle' | 'full'` opt-in prop (CONVERGE fold — the keyframes.js consumer ask,
   digest 8-9).** Add an explicit `specular` prop to `<Card>` (default **`subtle`** — or `off` if the live
   audit prefers a clean resting default) so a resting glass panel is CLEAN by default and the catch-light is
   opt-in, not always-on. `off` resolves zero specular intensity; `subtle` the token-ladder default; `full` the
   pre-tune brighter ladder for the busy-backdrop case the recipe was originally authored for. This COMPLEMENTS
   the token ladder this wave mints (the prop selects WHICH rung set; the tokens carry the magnitudes).

### SOTA deepening (liquid-glass research)

The iOS-26 Liquid-Glass corpus names the W09 specular retune the "single biggest, lowest-risk win" on the
material axis and is precise on the magnitudes (facets 0, 4, 20, 21, 22 —
`docs/tranches/AX/research/liquidglass-synthesis.md`):

1. **The SOTA color rule: warm-cream low-alpha, NEVER pure-white** (facets 0, 4, 22). The corpus pins the
   exact anti-pattern glass-ui ships: `hsl(40 30% 100% / 0.55)` is pure white at 0.55α, directly
   contradicting its own "warm-cream" comment, blown out further by the AW.W22 blast-radius promotion onto
   every band surface. The fix is a warm-cream low-alpha core (~`hsl(40 40% 96%)`, L<100% so the warm hue
   survives) at rest≈0 / hover≈0.22 / active≈0.32 — and the corpus flags the blend caveat (facet 0): `screen`
   of even low-alpha white still LIFTS toward white over LIGHT surfaces, so keep `screen` on dark and rely
   on the lowered alpha + warm-cream over light first (the §Open-Questions.3 blend-mode decision is
   research-grounded).

2. **The catch-light is a rim/normal-driven highlight that "defines the silhouette," not a flat bloom**
   (facets 0, 4, 22). WWDC25 §219: the moving rim catch-light + the full-perimeter `--glass-edge-light` rim
   read the glass body as a discrete lifting object. glass-ui's `--glass-edge-light` (AW.W22) is
   SOTA-correct and current; W09 must NOT touch it — only the moving-`::before` core color + the
   intensity ladder.

3. **Specular and squish are ONE clock — `.glassEffect(.interactive())`** (facets 5, 18, 20, 26). The
   corpus's unification point: Apple's interactive material flexes AND energizes-with-light on ONE press
   spring — light and geometry move together. Tie `--glass-specular-intensity` to the press spring in
   lockstep (the §Scope item the synthesis names "the unification of material-light and spring-squish").
   `held`/`pressed` is a morph-state INPUT that raises the specular rung, not a token race (facet 26 — the
   W03 contract on the dock).

4. **Retire the SECOND specular — one owner per surface** (facets 21, 22). The corpus confirms the dock
   control stacks THREE lights at HEAD: the baked `#glass-refract` feImage specular + the pointer-tracked
   `::before` moving-specular + the `--glass-highlight` hover box-shadow (the worst blowout, on the
   most-hovered surface). iOS-26 has ONE specular owner per surface; adding any lens/highlight fidelity
   without first collapsing to one owner re-creates the ~0.47 pure-white hotspot. W09 retires the dock's
   `--glass-highlight`; the feImage-vs-`::before` consolidation is the W09/W21 ownership split the corpus
   names (refraction carries the lens-bend, `::before` owns the motion-responsive catch-light).

5. **Critical gate coupling, research-confirmed** (facets 4, 17, 20). `proof-glass-material-unified.mjs`
   HARDCODES `0.6`/`0.85` — the corpus is explicit: "co-update the gate or the retune lands RED." The §Scope
   gate co-update is non-negotiable in the SAME wave.

6. **The lens scale, not the specular, springs off the morph clock** (facets 4, 21). Registering
   `--glass-refract-scale` as a typed `@property` so the lens can spring is W20's refraction concern, NOT
   W09's — W09 owns the SPECULAR half. Flagged so the two material halves stay un-conflated.

### CONVERGE folds (consumer-grounded + the published-vs-HEAD correction)

- **Published-vs-HEAD reconcile (LOAD-BEARING — §4 note 12 + digest 8-9).** The AW.W24 Card pointer-wiring IS
  at HEAD (the Card tracks the pointer; `Card.vue:65` `trackSpecular`). The keyframes.js consumer MEASURED the
  published **3.4.0**, which pins `--specular-x` at 50% mid-hover → a **dead-centered white bloom** at opacity
  0.35-rest/0.6-hover — the consumer-visible blowout the tune must beat. So W09 does **NOT** "wire the pointer"
  (already done); it TUNES + tokenizes + opts-in + retires-the-double, then the fix reaches consumers via the
  AX publish (the W41 dts-watch + the W33/W34/W35 pin-bump hinge). Verify against HEAD, then publish — do NOT
  re-fix what is already at HEAD.
- **keyframes.js consumer leg (digest 145-146 — H.W2/W4 a-glass-ui-consumption D14).** The keyframes.js demo
  defaults every Card to `surface="glass"`, inheriting the harsh radial; no `--specular-intensity` tune exists
  in its `design-idioms.css`. Once glass-ui softens the default + tokenizes the cohort, the keyframes demo
  re-verifies its panels read clean — it gets the fix FREE via the softened default after a pin bump. **Fold:**
  confirm no kf-side override remains needed (the consumer leg routes to W34; this wave authors the note + the
  D14 evidence cross-ref, not the sibling edit).
- **The forced-colors:active glass-language skin is NOT folded here (digest 75; charter §3).** That a11y
  obligation is its OWN wave (W36) — flagged so the specular tune does not absorb the broader scope.

### Substrate-hygiene decisions (routed, NOT done here)

- **The `-1000` resume time-warp (slice 14 F4 / slice 27 F5) — ROUTED, optional.** The
  `createCanvasLifecycle.ts` `startTime = performance.now() - 1000` resume clock back-date (a 1s animation
  time-discontinuity on tab-show / scroll-back) is COSMETIC, the substrate is HEALTHY (slice 13 F6 / 14 F4),
  and §4 note 2 says it "rides AX.W09/§J, not a blocker." **Recommendation: route the fix to W25b/§J** (the
  encapsulation band that owns the substrate-hygiene churn) and keep W09 focused on the specular gestalt — the
  specular work does NOT depend on it. If the orchestrator prefers it in-wave, it is an additive, file-disjoint
  (`createCanvasLifecycle.ts`) sub-step. **RATIFY-BEFORE-IMPL.**
- **The `glass-specular-track.css` → `glass-material.css` rename (slice 27 F5) is W25b's, NOT W09's.** The
  stale filename + cross-file doc pointers are routed to the §J CSS-monolith carve (charter §1 W25b row +
  §3). W09 does NOT rename the file; it only retunes the recipe inside `glass.css`'s `.glass-material::before`.

---

## FileBounds (the EXACT files this wave may touch — for parallel-dispatch disjointness)

| File | Edit |
|------|------|
| `src/styles/glass.css` | The `.glass-material::before` recipe (`:54-95`): drop the inner stop `hsl(40 30% 100% / 0.55)` → low-alpha warm-cream; the `:hover`/`:active`/`.dark` rules set `--specular-intensity: var(--glass-specular-intensity-{hover,active,rest})`; drop the rest floor to ~0; fix the false "warm-cream tint intact" comment. |
| `src/styles/tokens.css` | **ADD** the `--glass-specular-intensity-{rest,hover,active}` token cohort (+ `.dark` arm) near the `@property --specular-intensity` registration (`:1724-1727` / §11b). The `@property` reg itself is unchanged (already `initial-value: 0`). |
| `src/styles/dock-controls.css` | **RETIRE** the `:hover:not(:focus-visible)` `--glass-highlight` box-shadow (`:101-102`) — delete or demote to a non-specular surface-tint fill; tidy the `--dock-icon-hover-shadow` comment chain (`:78-100`). |
| `src/composables/glass/useSpecularTracking.ts` | **NEW** — the `{ specularStyle, onPointerMove }` composable (the lifted `trackSpecular`, PRM-aware, reads the intensity tokens). |
| `src/composables/glass/index.ts` | Re-export `useSpecularTracking` from the glass composable sub-tree barrel. |
| `src/components/ui/card/Card.vue` | Replace the inline `trackSpecular` (`:64-76`) with `useSpecularTracking()`; ADD the `specular?: 'off'｜'subtle'｜'full'` prop (default `subtle`/`off`) gating which rung set / whether the seam is wired. |
| `src/components/ui/card/index.ts` | Co-export the `CardSpecular` type for the new prop. |
| `src/components/custom/dock/DockIconButton.vue` | Replace the inline `trackSpecular` (`:53-65`) with `useSpecularTracking()`. |
| `scripts/proof-glass-material-unified.mjs` | **CO-UPDATE** lines 167/170 (the hardcoded `--specular-intensity: 0.6`/`0.85` regex) to assert the token COHORT exists + is read (not the retired literals); add the Card-`specular`-prop three-distinct-intensities assertion. |
| `package.json` | (If a new gate name is added) the `proof:*` entry + the W00 meta-gate parity match. The primary gate `proof:glass-material-unified` already exists — this re-points it. |
| `docs/tranches/AX/audit/W09-specular-tune.json` | **NEW** — the wave's born-RED→GREEN audit artefact. |

**OUT of bounds:** `glass-specular-track.css` → `glass-material.css` RENAME (W25b/§J); `createCanvasLifecycle.ts`
`-1000` resume fix (W25b/§J recommended — see decisions above); the `forced-colors:active` skin (W36); the
WebGL substrate structure (HEALTHY, slice 13/14 F4 — no rework); the Button glass specular wiring (a future
consumer of `useSpecularTracking`, not in this wave's bounds); any aurora/blob shader (W07/W08); the dock
MORPH driver / `useLayerTransition` (W01).

---

## Disjointness (sibling waves it must NOT overlap)

W09 is **self-contained** (the audit's own `dependsOn: "none"` for the proposed AX.W-specular-tune) and runs in
band B alongside the two graphics blockers, but shares NO files with them. The dispatch contract:

- **vs W07 (aurora core unblock) + W08 (blob core unblock).** Fully file-disjoint — W07/W08 are WGSL/GLSL
  shader + uniform-packing surfaces; W09 is `glass.css`/`tokens.css`/`dock-controls.css` + two SFCs + one
  composable. No shared file. Can run concurrently.
- **vs W06 (dock storybook consolidation + dock.css split).** W06 carves `dock.css` into `src/styles/dock/`
  partials and consolidates the dock STORY home; W09 retires the `dock-controls.css` `--glass-highlight`
  box-shadow. `dock-controls.css` is the W06-era carve-target FILE (the five dock CONTROL families) — coordinate
  so W09's `:hover` box-shadow retirement lands BEFORE or is rebased onto the W06 partials split (W06 is LAST in
  the dock band, dependsOn W01+W04). RECOMMENDATION: W09 lands its `dock-controls.css` edit first (it is a value/
  recipe retirement, not a structural move); W06's split then carves the SETTLED `dock-controls.css`. Coordinate
  the one shared file via dependency order.
- **vs W20 (primitive fix), W23 (carousel re-author), W36 (forced-colors skin), W38 (aurora-configurator glass-
  atoms restyle) — all dependsOn W09.** These DOWNSTREAM waves consume the W09-tokenized glass-material spine
  (the subtle ladder + the `--glass-specular-intensity-*` cohort + the retired double-light). They run AFTER
  W09 lands so the glass-atoms spine is settled — they do NOT touch W09's recipe; they READ it. No concurrent
  collision (sequential by dependsOn).
- **vs W25b (CSS monolith carves).** W25b owns the `glass-specular-track.css` → `glass-material.css` rename +
  the substrate-hygiene `-1000` fix (both ROUTED OUT of W09). W25b dependsOn W09 (the §J band re-tags the
  glass-material recipe AFTER W09's tune settles). No file collision: W09 edits the recipe INSIDE
  `glass.css`/`tokens.css`; W25b moves/renames files AROUND it.
- **vs W34 (cross-repo consumer adoption).** W09 authors the keyframes.js consumer-leg NOTE (confirm-no-kf-
  override-remains after the softened default); the sibling-repo verification executes in W34. W09 writes NO
  sibling source.

---

## Triumvirate (implement / adversarially-verify / gate-author split)

- **Implement (≤1 agent — the surface is one cohesive retune).** Lands the warm-cream low-alpha core + the
  subtle token cohort (tokens.css) + the `glass.css` read-the-tokens rewrite + the rest-floor-to-0, the
  `dock-controls.css` double-specular retirement, the `useSpecularTracking()` extraction + its two consumers
  (Card + DockIconButton), and the Card `specular` opt-in prop. Lint + typecheck at every interval.
- **Adversarially-verify (≤1 read-only lane).** Re-runs the three RED witnesses against the patched tree.
  Parses the `.glass-material::before` inner stop (asserts NOT pure-white `hsl(40 30% 100%)`; asserts a low-
  alpha warm-cream with L < 100%); reads `getComputedStyle` for the three rungs (asserts they resolve through
  `--glass-specular-intensity-{rest,hover,active}` at the SUBTLE magnitudes ≤ half the old values; asserts rest
  ≈ 0); confirms `.dock-icon-button:hover` resolves ONE specular system (the `--glass-highlight` box-shadow is
  gone); greps that `trackSpecular` no longer appears inline in Card.vue/DockIconButton.vue (the composable is
  the sole home); asserts the Card `specular` prop produces three DISTINCT computed-style intensities
  (`off`/`subtle`/`full`). ADVERSARIAL twist: tries to make `proof:glass-material-unified` pass with the OLD
  literal `0.6`/`0.85` still present (confirms the co-updated gate REDs on the retired literals), and tries a
  pure-white core (confirms the gate / the live audit catches the blowout regression).
- **Gate-author (≤1 agent).** Co-updates `scripts/proof-glass-material-unified.mjs:167,170` from the hardcoded
  `0.6`/`0.85` literals to a token-cohort-exists + token-read assertion + the Card-`specular` three-intensity
  probe. Confirms the gate FAILS at `eaba94f` (born-RED — the tokens do not exist) and PASSES on the patched
  tree. Registers any new gate name in `package.json` + the W00 meta-gate parity match.

(All within the AX ≤6-implementation / ≤7-read-only ceiling — this wave's actual count is 3.)

**Autonomous-resilience clause + triumvirate auto-triggers (per WAVE_SPEC §3a; AX REQUIREMENTS §22.4b — mandatory):**
The wave-agnostic authorization grant lives ONCE in AX.md §6.1 (the master template — devise an in-FileBounds idiomatic gestalt fix; spawn a tangent triumvirate to work AROUND, never stall; escalate ONLY when genuinely user-gated) with the 4-class halt-vs-work-around decision tree in AX.md §6.2 — by reference, not restated here. This wave's §3a triumvirate AUTO-TRIGGERS (Class-2 → research→plan-augment(Exact-Wave-Amendment-Text)→redress, caps 20/15/30):
- **Out-of-FileBounds reveal** — the specular tune needs an edit to the `glass-specular-track.css`→`glass-material.css` RENAME (W25b), the `createCanvasLifecycle.ts` `-1000` resume fix (W25b), the `forced-colors:active` skin (W36), the WebGL substrate structure (HEALTHY — no rework), the Button glass-specular wiring (a future `useSpecularTracking` consumer, out of bounds), any aurora/blob shader (W07/W08), or the dock morph driver / `useLayerTransition` (W01) — NEVER absorbed in-line; HALT and triumvirate.
- **`proof:glass-material-unified` fails non-locally** — the re-pointed gate (the hardcoded `--specular-intensity: 0.6`/`0.85` literals at `:167,170` MUST co-update IN THIS WAVE) cannot simultaneously assert the token cohort is minted+read, the subtle magnitude ladder (rest≈0, hover≈0.22, active≈0.32, each ≤ half the retired rungs), the warm-cream-not-pure-white inner stop (L < 100%), the rest-floor≈0, the ONE dock catch-light owner, the three distinct Card-`specular` intensities, AND the `trackSpecular` DRY deletion-proof → triumvirate, never split the gate or relax a rung.
- **The 3rd diagnostic-loop iteration** on the `useSpecularTracking` extraction race (the PRM-aware `{specularStyle, onPointerMove}` lift reading the intensity tokens, replacing the two inline `trackSpecular` copies in `Card.vue` + `DockIconButton.vue` without a pointer-move regression) — HALT and triumvirate rather than re-spin the composable seam.
- **A §5.3 ratify reached un-ratified** (Class-3) — the §24 third-confirmation Card `specular` DEFAULT (`off` vs `subtle`, rest≈0) reached without its recorded default → take the §21 no-user-gate recorded default (`subtle`, rest≈0) per the charter, never self-ratify a divergent default.

---

## Consumer hand-off confirmation (§20 — USF-1 + kf-G-1 + kf-G-2)

TWO independent consumers (USF/slides + keyframes.js, each audited-not-patched per inv-16) confirm
the resting-specular blowout and sharpen the root cause to THREE compounding facts in
`glass.css .glass-material::before`:

1. the inner stop `hsl(40 30% 100% / 0.55)` resolves to PURE WHITE — `L=100%` washes the `30%` sat,
   so the "warm-cream" the comment claims never paints (the W09 warm-cream-low-alpha core fixes this);
2. `mix-blend-mode: screen` of that white over the dark canvas — the `.dark` arm only drops the floor
   `0.35→0.22` ≈ `0.47` white-screen at active (the over-hot bloom);
3. a NON-ZERO rest floor `opacity: var(--specular-intensity, 0.35)` paints the radial AT REST, defeating
   the `@property` `initial-value:0` — and the banded stops produce the light-mode concentric rings.

**The rest-floor→0 is the single highest-value fix for a flat-data consumer** (USF emphasis — worst over
flat backplates). W09 gains a SECOND leg from kf-G-1 — **wire-or-omit**: a glass surface either writes
`--specular-x/y` from pointer ITSELF (as `dock.js` already does) OR does NOT emit `.glass-specular-track`
until a consumer opts in. A mouse-tracked radial with NO mouse writer must never be the default (kf live:
~13 glass hosts, 0 pointer-wired). The calmer DEFAULT lands at rest ≤ 0.25 (not 0.55), radius ≤ 40%.
kf-G-2: the dock-icon `.glass-specular-track` (dock.js:568) IS already pointer-wired, so the dock icons
are a TUNE within this same `--glass-specular-intensity-{rest,hover,active}` cohort, not a wire-up.

**RATIFY-BEFORE-IMPL (consumer-driven):** the Card `specular` prop default — `subtle` (rest≈0) vs `off`.
Flat-data consumers (USF charts) want `off` trivially declarable; the recommendation is `specular="off"`
as the resting default for the `surface="glass"` data-backplate case, `subtle` for hero surfaces.

**Cross-repo consume gate (the chronic-closure forcing function):** kf `proof:specular-handoff` +
USF's specular visual gate — both born-RED, greening ONLY when glass-ui ships the wire-or-omit + the
calmer default and the consumer bumps to the AX publish.

---

## Live-feedback fold (§23/§24) — THIRD specular confirmation + the `off`-default ratification

REQUIREMENTS §24 records a **THIRD** independent live confirmation (2026-06-08) of the EXACT defect this
wave already owns — the slides til-briefing-adjacent **"Runs locally" glass Card** screenshot shows the
egregious resting-specular bloom (a harsh white center bloom on a resting `surface="glass"` Card over a
dark backplate). This is NOT a new finding and gets **NO new wave** — it is the SAME
`glass.css .glass-material::before` rest-floor blowout the §20 USF + keyframes hand-offs already routed
here. **THREE independent consumers now confirm it** (USF flat-data charts + keyframes ~13 glass hosts +
this slides Card). The fold is two non-duplicative refinements to the EXISTING scope:

1. **Priority RAISE — definite blocker, not "major."** The third confirmation upgrades W09 from a band-B
   `major` to a **definite blocker for every glass-Card-over-dark consumer**. The slides deck, USF, and
   keyframes ALL paint a resting `surface="glass"` Card over a dark/aurora backplate, and ALL show the
   ~0.47 pure-white screen-blend hotspot at rest. The **rest-floor→0** correction (Scope item 3 / HardGate
   "Rest floor ~0") is the SINGLE highest-value, lowest-risk fix — it cleans every static unwired plate
   library-wide off ONE token re-baseline, and is the gating fix for the §21 publish hinge (no
   glass-Card-over-dark consumer reads clean until it ships). The visual-truth live audit's "static plates
   clean" + "`specular='off'` genuinely clean" criteria are the close-bar for this blocker.

2. **RATIFY the `off`-default for data/content backplates (resolves Open-Question 1).** §24 states the
   **consumer-confirmed resolution**: `specular="off"` is the default for **data/content backplates** (the
   `surface="glass"` case that carries charts, metrics, copy — the slides "Runs locally" Card, the USF
   chart panels, the keyframes settings panels). This is the convergent answer to the wave's own
   Open-Question 1 (`subtle` vs `off`) — three live consumers all want `off` trivially the default on a
   content surface. The ratified contract: **`<Card specular>` resolves the default by intent** — a
   data/content Card (the common case) defaults `off` (zero catch-light, clean over any backplate); a
   `subtle` lens is the EXPLICIT opt-in for a hero/chrome surface; `full` stays the busy-backdrop case.
   The token-ladder rest rung still lands at ≈ 0 so even an explicit `subtle` is clean at rest — but the
   PROP DEFAULT for the content-Card case is `off`, not `subtle`. This closes the J-invariant gap (a
   resting content panel must be clean WITHOUT a consumer editing library source) the consumer-confirmed
   way, and is the ratified resolution the implement-lane carries (Open-Question 1's "if `subtle`-at-rest
   still reads hot over an aurora backdrop, default to `off`" is now SETTLED to `off` by three live
   confirmations — no need to re-litigate at the live audit).

**Non-duplication note:** the §20 two-consumer hand-off (USF + kf) is ALREADY recorded above (lines
274-301); this §24 fold adds ONLY the third confirmation's two consequences (the priority raise + the
`off`-default ratification). It mints NO new token, NO new prop, NO new gate, NO new file beyond what the
existing scope already specs — the `specular="off"` value, the rest-floor→0, the warm-cream core, and the
wire-or-omit leg are all already in Scope/FileBounds/HardGate. The third confirmation is a
priority-and-default ratification, not a scope expansion.

---

## HardGate (born-RED→GREEN + the MANDATORY VISUAL-TRUTH live audit)

**Headless / runtime gate — born-RED→GREEN.** `proof:glass-material-unified` (EXISTING, re-pointed; the
CRITICAL COUPLING the charter §3 names — `scripts/proof-glass-material-unified.mjs:167,170` HARDCODE
`--specular-intensity: 0.6`/`0.85`, so any tune lands RED unless the gate is co-updated IN THE SAME WAVE):

- **Token cohort exists + is read.** Assert `--glass-specular-intensity-rest`, `-hover`, `-active` are minted
  in `tokens.css` (+ a `.dark` arm) AND that `glass.css`'s `:hover`/`:active` rules READ them
  (`--specular-intensity: var(--glass-specular-intensity-…)`), NOT the retired literals. **Born-RED at HEAD**
  (the tokens do not exist; the gate currently asserts the literal `0.6`/`0.85`).
- **Subtle magnitude.** Assert the resolved rung values are the SUBTLE ladder (rest ≈ 0, hover ≈ 0.22, active
  ≈ 0.32 — each ≤ half the retired `0.35`/`0.6`/`0.85`).
- **Warm-cream not pure-white.** Assert the `.glass-material::before` inner gradient stop is NOT
  `hsl(40 30% 100%)` (a parse/lightness check: L < 100% so the warm hue survives) at a low alpha.
- **Rest floor ~0.** Assert the rest-state `--specular-intensity` resolves to ≈ 0 (the @property dormancy is no
  longer defeated by a `0.35` floor).
- **One dock specular.** Assert `.dock-icon-button:hover` does NOT apply the `--glass-highlight` box-shadow (the
  second specular is retired) — a computed-style probe that the dock control has ONE catch-light owner.
- **Card `specular` prop.** Assert `<Card specular="off|subtle|full">` produces three DISTINCT computed-style
  intensities (`off` ≈ 0; `subtle` the ladder; `full` the brighter rung set).
- **DRY composable.** Deletion-proof that the inline `trackSpecular` no longer appears in `Card.vue` /
  `DockIconButton.vue` (the composable `useSpecularTracking` is the sole home) — a deletion proof (a valid hard-
  gate form per SPEC.md §Hard Gates), not a runtime claim.

This is a **runtime-observation + deletion-proof** gate (the precept-valid artefact forms per SPEC.md §Hard
Gates — accepted forms include build/test/runtime/deletion-proof; INVALID is "grep found a source string" FOR
RUNTIME BEHAVIOUR). The computed-style probes are runtime observation; the `trackSpecular`-removal grep is a
deletion proof.

**VISUAL-TRUTH live audit (NON-NEGOTIABLE per AX.W00 — the wave's close criterion).** A live Playwright +
frontend-design pass on the glass-material surfaces — hover/press a `<Card surface="glass">`, a
`<DockIconButton>`, and a `<Dialog>` — over **BOTH** a flat warm-cream substrate AND an aurora backdrop, in
**light AND dark** (the two contexts the magnitude reads differently in — the recipe was tuned over a busy
backdrop):

- **The press-light reads as a whisper, not a flash** — on active, the catch-light is a subtle lens, NOT a
  blown-out white hotspot (the ≈ 0.47-white-screen defect is visually gone).
- **The dock is no longer the hottest surface** — with the second `--glass-highlight` specular retired, the
  most-hovered dock control reads at parity with the rest of the band (not the worst-offending blowout).
- **Static plates clean** — a `<Card>`, `<Dialog>`, `<Popover>` that does NOT wire a pointer shows NO centered
  white hotspot at rest (the rest-floor-0 fix).
- **`specular="off"` genuinely clean** — a `<Card specular="off">` resting panel carries zero catch-light; the
  keyframes.js consumer-side surface (D14) reads clean after the softened default.
- **Affordance / hierarchy / spacing / NO visual occlusion** per the AX cardinal gate.

**The wave does NOT close on the headless gate alone** — the executed live audit (captured as a paired-π
BEFORE/AFTER + DELTA artefact under `docs/tranches/AX/audit/`, per the W00 protocol) is the binding close
criterion. The BEFORE capture pins the published-3.4.0 magnitude (the dead-centered white bloom) the tune must
beat (§4 note 12).

---

## Cadence (sub-step order)

1. **Live re-diagnosis ritual (W00 wave-open).** Re-confirm the three RED witnesses against HEAD `eaba94f` on
   the live demo: the pure-white core + the `0.35/0.6/0.85` ladder, the missing `--glass-specular-intensity-*`
   cohort, the dock double-specular, the duplicated `trackSpecular`. Capture the published-3.4.0 BEFORE
   magnitude (the dead-centered white bloom — §4 note 12). Record in `audit/W09-specular-tune.json` as the
   born-RED baseline. Do NOT proceed on the audit's word — re-prove.
2. **Mint the token cohort + co-update the gate (born-RED).** ADD `--glass-specular-intensity-{rest,hover,active}`
   (+ `.dark`) to `tokens.css`; co-update `proof-glass-material-unified.mjs:167,170` to assert the cohort
   exists + is read; confirm the gate FAILS at HEAD (tokens absent).
3. **Retune the unified source.** `glass.css` `.glass-material::before`: warm-cream low-alpha inner stop; the
   `:hover`/`:active`/`.dark` rules read the tokens; drop the rest floor to ~0; fix the false comment. Lint +
   typecheck.
4. **Retire the dock double-specular.** `dock-controls.css:101-102` — delete/demote the `--glass-highlight`
   hover box-shadow; tidy the comment chain.
5. **Extract `useSpecularTracking()`.** New `composables/glass/useSpecularTracking.ts` (PRM-aware, reads the
   tokens); re-export from the glass barrel; re-point Card.vue + DockIconButton.vue onto it; delete the inline
   `trackSpecular` from both.
6. **Card `specular` opt-in prop.** Add `specular?: 'off'｜'subtle'｜'full'` to `<Card>` (default `subtle`/`off`);
   co-export `CardSpecular`; wire the prop to which rung set / whether the seam is armed.
7. **Gate GREEN + VISUAL-TRUTH.** Confirm `proof:glass-material-unified` passes; run the VISUAL-TRUTH live
   audit over flat + aurora backdrop in light/dark; capture the paired-π BEFORE/AFTER + DELTA; write
   `audit/W09-specular-tune.json` to GREEN; author the keyframes.js consumer-leg NOTE (routes to W34).

---

## Artefacts (the audit json + evidence it emits)

- `docs/tranches/AX/audit/W09-specular-tune.json` — the born-RED→GREEN ledger: the three RED witnesses
  (pure-white core + literal ladder, the cohort-grep=NONE, the dock-double + trackSpecular-duplication), the
  per-finding (slice 14 F0-F4 + slice 27 F3/F4/F5) disposition, the published-3.4.0 BEFORE magnitude, and the
  post-wave GREEN measurements.
- `scripts/proof-glass-material-unified.mjs` — the co-updated gate (the `0.6`/`0.85` hardcodes → token-cohort
  assertion + Card-`specular` three-intensity probe).
- `src/composables/glass/useSpecularTracking.ts` — the new DRY pointer seam.
- The paired-π **BEFORE/AFTER + DELTA** capture (the W00 protocol): screenshots of a Card-glass / DockIconButton
  / Dialog hover+active over flat-cream and aurora backdrops, light/dark — BEFORE (the published-3.4.0 white
  bloom + the HEAD pure-white blowout) vs AFTER (the subtle warm-cream whisper), and the dock-no-longer-hottest
  A/B.
- A consumer-NOTE annex (folded into the W34 coordination ledger, NOT executed here): the keyframes.js demo
  re-verification (confirm no kf-side `--specular-intensity` override remains needed after the softened default).

---

## CommitPlan (conventional-commit messages, one per sub-step)

1. `test(glass): proof:glass-material-unified co-update born-RED — token-cohort + Card-specular assertions replace the 0.6/0.85 hardcodes (AX.W09)`
2. `feat(tokens): mint --glass-specular-intensity-{rest,hover,active} cohort (+ dark arm) — the single overridable magnitude knob (AX.W09 slice27-F3)`
3. `fix(glass): warm-cream low-alpha specular core + subtle ladder + rest-floor-0 — retune the unified .glass-material::before off pure-white (AX.W09 slice14-F0/F3)`
4. `fix(dock): retire the dock-control second specular — one catch-light owner, drop the --glass-highlight hover box-shadow (AX.W09 slice14-F1)`
5. `refactor(glass): useSpecularTracking() composable — DRY the verbatim trackSpecular off Card + DockIconButton (AX.W09 slice14-F2/slice27-F4)`
6. `feat(card): specular?: off|subtle|full opt-in prop — clean resting panel by default (AX.W09 digest-consumer-ask)`
7. `chore(AX.W09): audit ledger GREEN + paired-π BEFORE/AFTER + DELTA + keyframes consumer-leg note`

(One conventional-commit per sub-step; the orchestrator owns the index — agents NEVER stage/commit/stash per
the hardened agent git clause. These are the messages the orchestrator authors.)

---

## Dependencies (dependsOn from the charter + why)

- **AX.W00 (π visual-runtime lane) — the close machinery (charter §3 dependsOn AX.W00).** The fail-CLOSED π
  workspace is the home of the binding live-audit close criterion. W09 cannot close on the co-updated headless
  gate alone (the cardinal AW lesson — a green CPU gate over a white-blowout live surface is exactly the gap);
  W00 stands up the lane it closes on, and the paired-π BEFORE/AFTER + DELTA protocol it captures.
- **No hard code-dependency on W07/W08** — the audit's proposed `AX.W-specular-tune` declares `dependsOn:
  "none"` (a self-contained CSS/token/composable retune; the proof-gate co-update is internal). It runs in band
  B alongside the graphics blockers but shares no file with them.
- **Downstream (waves that dependsOn W09):** **W20** (primitive fix — consumes the settled glass-atoms spine),
  **W23** (carousel re-author), **W25b** (CSS monolith carves — re-tags glass-material AFTER the tune + owns the
  routed `glass-specular-track.css` rename + `-1000` fix), **W36** (forced-colors skin), **W38** (aurora-
  configurator glass-atoms restyle). Each READS the W09-tokenized cohort; none re-edits the recipe. **W34**
  receives the keyframes.js consumer-leg NOTE this wave authors.

---

## Archaeology (the git commits / prior-tranche lineage the audit cited)

- **`8036370`** (AV.W15) — the ORIGIN of the offending VALUES. The moving-specular recipe was authored here
  with `hsl(40 30% 100% / 0.55)` pure-white core + the `0.35/0.6/0.85` ladder, tuned over a BUSY aurora/goo-blob
  backdrop where a screen-blend white core reads as a tasteful lens. Over glass-ui's own flat warm-cream
  substrate the same recipe is a hot blowout. The VALUES are unchanged since (the §4 note-12 / slice-14
  correction: the requirement's W23/W24 guess is WRONG — W23/W24 did not author the brightness).
- **`6bb442f`** (AW.W22) — the BLAST RADIUS. AV.W15 scoped the `::before` to 3 opt-in components (Button glass,
  DockIconButton, Card). AW.W22 PROMOTED it onto every band surface (all five `.glass-*` ladder rungs +
  `.glass-card` + `.dock-icon-button`), so every Dialog/Sheet/Popover/DropdownMenu and every plain
  `.glass-resting`/`.glass-quiet` plate now carries the rest-floor catch-light statically and lifts to 0.85 on
  press — the extremity is now visible SYSTEM-WIDE. W22 folded the dock control into the `.glass-material` group
  but NEVER reconciled the now-redundant pre-existing `--glass-highlight` hover box-shadow (the double-specular
  origin).
- **AT.W7-dock-b** (`dock-controls.css:78-87` origin comment) — the dock-control hover-highlight that PREDATES
  W22's promotion; the second specular W09 retires.
- **AW.W24** — wired the Card pointer-tracking (the `trackSpecular` at `Card.vue:65`). At HEAD `eaba94f` the
  Card tracks the pointer; the consumers MEASURED the published 3.4.0 which pins `--specular-x` at 50% mid-hover
  (the dead-centered white bloom). So W09 is TUNE, NOT wire (§4 note 12).
- **`8554e33`** (W22/W23 fold — slice 27 F5) — the `.glass-specular-track` → `.glass-material` unification that
  updated the CODE selectors but NOT the FILE NAMES (the stale `glass-specular-track.css` filename + cross-file
  doc pointers). The rename is ROUTED to W25b, not W09.
- **HEAD `eaba94f`** (batch-1 integration, UNPUBLISHED) — the audit baseline; the pure-white-core +
  `0.35/0.6/0.85` ladder + the dock double-specular + the duplicated `trackSpecular` are all live-proven here.
- **Corroboration:** `docs/tranches/J/research/R1-dock-subsystem.md:213` — the perceived dock over-brightness
  traces to the specular cascade + aurora bleed-through (the J-tranche note the audit cites).

---

## PreceptAlignment (the SPECIFIC precepts this wave is pursuant to + must not violate)

Per §2b the band-B binding precepts (pinned `docs/precepts/` @ `63240e6`):

- **one-path (one specular source).** The dock control carries TWO compounding specular systems (the moving
  `::before` AND the `--glass-highlight` hover box-shadow); the wave collapses to ONE catch-light owner per
  surface — the §0 "excise or fail" discipline. MUST NOT leave the redundant second light. The duplicated
  `trackSpecular` collapses onto `useSpecularTracking()` — one pointer seam, not ≥ 2 verbatim copies.
- **token-first / no magic numbers (J invariant — "every visual behaviour is a CSS custom property; no consumer
  edits library source for styling").** The three intensity rungs are buried literals across two files at HEAD;
  the wave mints the `--glass-specular-intensity-{rest,hover,active}` cohort (+ dark arm) so the magnitude is a
  single overridable token a consumer or the dark arm retunes ON THE CASCADE — the cartoon-shadow override
  contract is the precedent (override on `:root`, never a dead local). MUST NOT re-bury a literal.
- **abrogate-before-patch.** The recipe is re-derived at the unified source (warm-cream low-alpha, subtle
  ladder, rest-floor-0), NOT patched per-component. The proof gate's `0.6`/`0.85` hardcodes are co-updated to
  assert the token contract, not papered over.
- **substrate-with-consumer / visual-load-bearing-ness (Design-Axis-3).** `useSpecularTracking()` ships WITH ≥ 2
  named consumers (Card + DockIconButton) the same wave — never substrate-without-consumer. The Card `specular`
  prop is the consumer-requested opt-in (keyframes.js live-audit) — a real consumer drove it.
- **fail-explicit on library-internal violations (vs befitting-silent browser-API degradation).** The
  pure-white-vs-"warm-cream-comment" mismatch is a library-internal contract violation (the code violates the
  comment); the wave makes the painted light TRUE to the warm-cream identity, not silently divergent. (The
  reduced-motion freeze the composable respects is a befitting-silent browser-API path — the two are NOT
  collapsed: the library-internal magnitude is made honest; the PRM freeze stays silent.)
- **π visual-runtime lane / Gates-close-on-evidence (SPEC.md §Hard Gates).** The gate is a runtime-observation
  (computed-style probes of the rungs / the dock single-specular / the Card three-intensity) + deletion-proof
  (the inline `trackSpecular` removal) — the precept-valid artefact forms; NOT a "grep found a source string"
  FOR RUNTIME BEHAVIOUR (the invalid form). The wave's close is the executed live Playwright + frontend-design
  audit over flat + aurora backdrops, never the headless proof alone — the cardinal AX precept.
- **no-overfitting.** The Card `specular` prop is a real three-state consumer control (`off`/`subtle`/`full`),
  each with a named use case (clean resting panel / default lens / busy-backdrop full) and a live consumer
  (keyframes.js) — not a speculative knob. The token cohort is a single overridable axis, not three orphan
  presets.
- **no-silent-deferrals.** The keyframes.js consumer-leg re-verification is ROUTED to W34 with a named annex
  (the sibling verification executes there; this wave authors the note). The `-1000` resume time-warp + the
  `glass-specular-track.css` rename are explicitly ROUTED to W25b/§J with rationale (§4 note 2 / slice 27 F5) —
  not silently dropped. The forced-colors skin is explicitly its OWN wave (W36), flagged so the specular tune
  does not absorb it.
- **canonical-readme-shape (band-B precept row).** Any README/comment touched (the false "warm-cream tint
  intact" claim in `glass.css`) is corrected to match the painted reality — documentation is part of the change.

---

## Open questions / RATIFY-BEFORE-IMPL

1. **Card `specular` default — `subtle` vs `off`. RATIFIED → `off` for data/content backplates (§24
   third confirmation).** The original recommendation was `subtle` with a rest rung ≈ 0; the §24 fold
   above SETTLES this to **`off`** as the default for the data/content `surface="glass"` Card (the common
   case — three live consumers confirm a resting content Card must be clean over a dark backplate). A
   `subtle` always-available lens is the EXPLICIT opt-in for a hero/chrome surface; `full` the
   busy-backdrop case. The rest rung still lands at ≈ 0 so an explicit `subtle` is clean at rest too — but
   the PROP DEFAULT for the content Card is `off`. No longer an open question; carried as the ratified
   contract. (See "Live-feedback fold (§23/§24)" above.)
2. **Exact subtle magnitudes — the rung set.** The charter recommends rest ≈ 0/0.08 · hover ≈ 0.22 · active ≈
   0.32 (≈ half the present `0.35/0.6/0.85`). RATIFY the final triple against the live audit over BOTH flat and
   aurora backdrops (the magnitude reads differently in each). **Recommendation: rest 0 · hover 0.22 · active
   0.32**, tuned live — the tokens make this a one-value re-baseline if the audit wants softer/brighter.
3. **`mix-blend-mode` demotion — keep `screen` or soften over light.** Slice 14 F0(d) raises demoting `screen`
   to a softer `plus-lighter`/`overlay` over LIGHT surfaces (screen of even low-alpha white still lifts toward
   white) while keeping `screen` on dark. RATIFY whether the lowered alpha alone suffices or a per-context
   blend-mode is warranted. **Recommendation: rely on the lowered alpha + warm-cream core first** (the simpler
   one-axis change); add the per-context blend-mode ONLY if the live audit still reads a white lift over light.
4. **`-1000` resume time-warp — in-wave or routed to W25b/§J.** §4 note 2 says it "rides AX.W09/§J." It is
   COSMETIC, file-disjoint (`createCanvasLifecycle.ts`), and the substrate is HEALTHY. **Recommendation: ROUTE
   to W25b/§J** (keep W09 focused on the specular gestalt) — RATIFY whether the orchestrator wants it folded
   in-wave as an additive sub-step.
5. **`--glass-highlight` box-shadow — delete vs demote.** Slice 14 F1 offers delete OR demote-to-surface-tint
   (so dock hover still reads a background shift without a second light). **Recommendation: demote to a
   non-specular surface-tint fill** (preserves a hover affordance on the dock control without a second
   catch-light) — RATIFY against the live audit (delete entirely if the moving `::before` already reads the
   hover sufficiently).

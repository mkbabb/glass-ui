# GLASS MATERIAL — DELTA-ASSAY (golden vs. CURRENT, the UNION path)

> The 7-tier ladder · the six-layer composite · the BA.W-NO-GRAY warm floor · the
> transmissive read · the §3 colorful-field-behind + defined-edge requirement.
> LIVE-inspected on `localhost:5173` (Chrome, both modes, 2026-06-24) + source-read in
> full. Reconciles `GOLDEN.md` against the three challenges — which independently kill
> the golden's de-risk numbers and re-scope two of its three legs — and FOLDS their
> hardening into the union. **Tranche-dev only. A UNION with the landed gray triumvirate.**

---

## 0 — THE ONE TRUTH, RE-MEASURED LIVE (the diagnosis is fit; keep it)

Re-measured independently on `/forms/select`, byte-confirming the golden's §0 AND the
three challenges' shared confirmation. The diagnosis SURVIVES; the golden's synthesis
does not survive intact.

| surface (live, light) | measured | OKLab | verdict |
|---|---|---|---|
| `--card` | `hsl(30 85% 96%)` | L 0.974 · **C 0.0147** · H 70.9 | WARM — leg (a) LANDED |
| `--neutral-0` (page) | `rgb(251,250,248)` | L 0.985 · **C 0.0029** · H 84.6 | flat, near-achromatic |
| plate@0.65 over page | — | **C 0.0105** H 72.2 | clears the 0.01 floor + STILL reads gray |
| floating@0.80 over page | — | **C 0.0123** H 71.5 | the literal Select panel |
| `--glass-ambient-hue` / `-strength` | `transparent` / `0%` | — | written-but-un-consumed off-dock |
| Select trigger | `box-shadow: none`, border α **0.05** | — | dissolves cream-on-cream |
| `.paper-field` count | **0** | — | NO field behind any glass |
| `.paper-underpaint` count | **1** (PaperBackdrop, AppShell:251) | — | a FLAT neutral underpaint IS mounted |

| dark (re-measured) | OKLab | verdict |
|---|---|---|
| `--card` | C 0.0216 H 57.8 | warm-luminous |
| floating@0.80 over dark page | C 0.0181 H 58.1 | clears G5, glows — leg (a) landed dark too |

**The screenshot (`delta-select-light.png`) is the gestalt witness:** a flat cream wash,
cream-on-cream Select triggers with no cut edge, cards barely lifting. The plate is warm
to the byte and the surface still reads gray — exactly because the page is flat (nothing
to transmit) and the edge dissolves. **glass is a RELATIONSHIP, not a color** — the
golden's spine is correct.

---

## 1 — THE DELTA: KEEP / REFINE / RE-INVENT (survival of the fittest)

### KEEP (fit — frozen, byte-untouched)
- **Leg (a) — the warm `--card` / `--glass-saturate-*` / dark-arm tokens.** `W-GLASS-
  ABROGATE-GRAY` is landed and gate-green in BOTH modes (live-confirmed C 0.0123 light /
  0.0181 dark). The union RE-TOUCHES ZERO chroma tokens. Re-forking it is the sin all
  three lenses forbid.
- **The 7-tier alpha/radius/tint ladder + the six-layer composite vocabulary.** No new
  tier, no new compose recipe.
- **The directional rim ALREADY SHIPS.** `rim.css:70-83` + `glass-fx.css:78-95` (BC.W-
  BLACK-BAR D2): `--glass-rim-top` (bright top catch 0.30/0.40) + `--glass-rim-bottom`
  (warm under-shadow 6%), accent-composed. The golden's "HEAD rim is a flat omnidirectional
  halo" premise is **two waves stale** (challenge #1 R2.1, #2 R5). KEEP the directional rim.
- **The moving-specular `::before` is FULLY OCCUPIED** (`material.css:80-200`): a 2-layer
  conic-glint + radial-disc catch-light with its own `mask-image`/`mask` + `plus-lighter`.
  The `::after` is the grain overlay + rim-ring. **Both pseudos are taken** (challenge #1 R4,
  #2 R4, #3 R4). KEEP them — the keyed-edge move must NOT evict the catch-light.
- **The ambient-hue histogram is GENERAL and SHIPS.** `useGlassBackdropLuminance.ts:112-221`
  (BE.W-AMBIENT-TINT) is a 12-bucket chroma×alpha OKLCh histogram that ALREADY imports
  `srgbToOKLab`/`rawOklabToOklch` and returns `ambientHue` for every sample with a gray-null
  identity, AND writes `--glass-ambient-hue` (`:448`). The golden's §5 "luminance ONLY" is
  FALSE (challenge #1 R2.2). KEEP the sampler whole.
- **The ambient bias seam ALREADY EXISTS in the cascade.** `liquid-morph.css:33-36`
  (`.liquid-stage`) re-points `--glass-tint-source: var(--glass-ambient-hue)` /
  `--glass-tint-strength: var(--glass-ambient-strength)`. The `@property --glass-ambient-
  strength` (`<percentage>`, init `0%`, ≤8% ceiling) is registered (`glass.css:389`). The
  generalization is a RE-POINT of an extant seam onto more tiers — not composable surgery.
- **The cartoon-shadow directional register SHIPS.** `--shadow-cartoon-{sm,md,lg}`
  (`shadow.css:92-100`): `-3px 2px` / `-4px 3px` / `-6px 4px` — a down-LEFT cast (key at
  upper-RIGHT), `--shadow-color: var(--foreground)` (warm, re-tints in dark). KEEP — it is
  the loud register the golden wants, already coherent.
- **`PaperBackdrop` is mounted + consumer-tunable.** `AppShell.vue:251` mounts it
  `fixed inset-0 -z-10`; the component reads `--paper-underpaint-color` (a consumer token).
  This is the field's home — DON'T stack a second fixed plane (challenge #2 R8).

### REFINE (weak — evolve on extant seams)
- **The page has no chroma to transmit.** The flat `--neutral-0` underpaint gives the
  blur nothing to bend. REFINE the EXISTING `PaperBackdrop`/`paper-underpaint` mounted
  layer into a warm-chroma plenum (a `paper-field` register ON the mounted layer), decoupled
  from `--neutral-0` (which stays the KEEP-NEUTRAL solid floor + the PRM/reduce-transparency
  escape). ONE backdrop, warmed — not two stacked fixed planes.
- **The defined edge dissolves over a flat host.** Over the (refined) warm field the
  directional rim + a warm cast cut the shape; REFINE the keyed coherence by driving the
  EXISTING `--glass-rim-top`/`--glass-rim-bottom` stops + the EXISTING `.shadow-cartoon-*`
  cast off ONE key vector — NOT a new conic on an occupied pseudo (challenge #2 R4
  hardening, #3 R3 fix).
- **The ambient-hue bias is dock-only.** REFINE: re-point the EXTANT `.liquid-stage` seam
  onto every glass tier OVER the field at the bounded `--glass-ambient-strength` (≤8%).

### RE-INVENT (broken)
- **Nothing in the material is broken.** The triumvirate cured the only broken thing (gray
  plate). The remaining work is ADDITIVE (a field layer + a keyed-edge re-point + an ambient
  re-point) — survival of the fittest: keep what is fit, refine what is weak, re-invent
  nothing here.

---

## 2 — THE FALSIFIED GOLDEN NUMBERS (the three challenges' shared kill — BINDING)

All three challenges independently killed the golden's headline calibration. The union
DOES NOT inherit these; it re-derives from paint.

1. **The 0.018 composite bar is falsified by the golden's own spike** (C #1 R1, #2 R1,
   #3 R1): the spike self-reports plate-over-field **C 0.0077 light / 0.0051 dark** — a
   2.3–3.5× MISS — and the spike's readback HARDCODES `fieldSample={252,244,232}` rather
   than sampling the painted field. The honest sample (over `--field-base`) is C 0.0013 —
   identical to the "gray read." **A born-RED gate at 0.018 over a mechanism that tops out
   at ~0.008 stays RED after the work lands.** → UNION: the bar is set from a REAL painted-
   composite spike, NOT prose. Likely ~0.012 (a measurable lift over the 0.0105 HEAD
   composite), proven before written.
2. **The §3 field values were never in the spike** (C #2 R2): §3 mandates `oklch(0.93
   0.075 70)`; the spike paints `oklch(0.96 0.045 72)`. The "live-verified" provenance is
   broken. → UNION: the field chroma + plate-α are a CALIBRATION the live gate tunes; the
   spec quotes only what a real composite paints.
3. **The §8 gate samples the wrong layer** (C #3 R2): `getComputedStyle().backgroundColor`
   resolves ONLY the solid `--field-base`, never the `background-image` gradient where the
   warmth lives → composites to C 0.0013 (the gray read). → UNION: the gate samples the
   PAINTED composite (canvas `drawImage`+`getImageData` of the region, or reads the resolved
   `background-image` stops), with a self-test arm that FAILS on a flat-base field and PASSES
   on the gradient field.
4. **The cast formula is sign-inverted** (C #2 R3): `cos(-58°)*-14, sin(-58°)*14` → up-LEFT
   (toward the light) — the iOS-7 sticker the golden forbids. → UNION: drop the bespoke trig.
   Reuse the SHIPPED `.shadow-cartoon-*` convention (down-LEFT, key upper-right), already
   coherent and `@supports`-free. NO `cos()/sin()` first-use, NO box-shadow-drop risk
   (C #2 R7, the light-dark inset-shadow trap class).
5. **The conic rim collides with the occupied `::before`** (C #1 R4, #2 R4, #3 R4): a
   `mask-composite: exclude` border-ring would CLOBBER the moving-specular catch-light;
   the "zero new layer" claim is false. → UNION: NO conic, NO new pseudo. Drive the EXISTING
   two-stop directional rim (`--glass-rim-top`/`--glass-rim-bottom`) off the key — a token
   re-point, genuinely zero-new-layer (C #2 R4/R5 hardening: "parametrize the existing
   two-stop rim by `--glass-key`").
6. **"Enforced by construction" is a demo-chassis claim, not a material property** (C #1 R6,
   #3 R5): the field lives in `AppShell.vue`, not in the glass primitive; a consumer that
   renders `<Card glass-resting>` over a flat page still reads gray. → UNION: HONEST scope.
   The field is a DEMO-CHASSIS preset (presets-in-consumers); the F4 "no flat glass" arm is
   a dev-time `console.warn` when a `.glass-*` paints with no field behind it (the precept as
   a runtime dev-assert, scoped to enrolled demo routes — NOT a false-RED generator over
   teleported portals, C #2 secondary).
7. **Paired-engine π is unwired** (C #2 R6): `no-gray.spec.ts` is NOT in the WebKit project
   `testMatch`. → UNION: either enroll it (or a carved `no-gray-field.spec.ts`) in the WebKit
   project, or state honestly "Chromium π + WebKit reasoned-safe + a `local`-tagged WebKit
   capture." Pick one; do not promise a gate the harness can't run.

---

## 3 — THE UNION PATH (deft, KISS, DRY, no fork, no legacy)

ONE coherent evolution, every leg composing an EXTANT seam:

### (b) THE FIELD — warm the MOUNTED PaperBackdrop, don't stack a second plane
- Add a warm-chroma radial plenum to the EXISTING `paper.css` `paper-underpaint` register
  (the `<PaperBackdrop>` already mounted at `AppShell.vue:251`), gated behind a
  `[data-paper-field]` / `field` prop so the warm stops are OPT-IN (the calm neutral
  underpaint stays the default for solid-chrome routes). The warm stops sit OVER
  `--neutral-0` (the KEEP-NEUTRAL floor, untouched, decoupled). Three drifting warm radials
  at FIELD lightness (L 0.90–0.93 light / 0.28–0.34 dark, where the gamut allows real
  chroma — NOT the gamut-bound L0.98 plate), compositor-only drift on a `::before` transform,
  PRM freezes the drift (warm stays). The exact chroma/α is the gate's calibration target
  (§2.1/§2.2), tuned until the live composite clears the honest bar.
- Mount: the demo chassis sets `field` on the existing `<PaperBackdrop>` for enrolled glass
  routes (band-C scope). ONE backdrop, warmed — `--neutral-0` decoupled for free (C #2 R8).

### (c) THE KEYED EDGE — ONE key vector → the EXISTING rim stops + the EXISTING cartoon cast
- `--glass-key` (a single token, the cel keystone) drives WHICH of the existing
  `--glass-rim-top`/`--glass-rim-bottom` stops reads lit vs. shade — a token RE-POINT of the
  shipped directional rim (NOT a new conic, NOT a new pseudo — C #2 R4/R5 resolved). The
  catch-light `::before` is untouched.
- The warm cast is the SHIPPED `.shadow-cartoon-*` family (down-left, key upper-right,
  warm-`--foreground`-tinted) — the loud register opts in via `<Card surface="cartoon">`;
  the calm default keeps the six-layer cast. NO bespoke trig, NO sign-inversion, NO
  `@supports` floor needed (the cartoon family is plain `box-shadow`).
- The keyed rim is the FLAT-PAGE + reduce-transparency insurance: even when host and
  control collapse to the same tier, the lit edge + warm cast cut the shape. The F3 gate
  asserts a min non-text-contrast ΔL (WCAG 1.4.11, 3:1) so the rim is real for low-vision,
  not a 0.6α white-on-cream whisper (C #3 R8).

### (transmit) THE AMBIENT GENERALIZATION — re-point the EXTANT `.liquid-stage` seam
- The ambient-hue bias (`--glass-tint-source: color-mix(in oklab, …, var(--glass-ambient-
  hue) var(--glass-ambient-strength))`) ALREADY exists at `.liquid-stage` (`liquid-morph.css`)
  and the histogram ALREADY writes `--glass-ambient-hue`. Generalize the re-point to every
  glass tier OVER the field at the bounded ≤8% strength. Over a gray backdrop the histogram
  writes `transparent` (no-op). The combined plate-over-field-plus-ambient H is CLAMPED to
  stay in [45,88] for all section-accents (C #1 R4: skip-ambient-when-field-already-at-bar to
  avoid the triple-count over-rotation).
- **The transmit is a HUE event, NOT the load-bearing ΔC.** The field (b) + the saturate
  ladder (landed) carry the ΔC; the ambient adds the directional hue lift. This avoids
  pinning the 0.018-class bar on the ambient mix (which C #1 R4 showed triple-counts).

**The reconciliation of the cross-lens tensions** — resolved as the challenges direct: the
field is the calm CSS universal floor (`<Aurora>` stays the GL opt-in); the field is decoupled
from `--neutral-0` (KEEP-NEUTRAL holds); the edge rides shipped seams (zero new layer); the
transmit rides the shipped cascade (zero new compositing seam). **No new tier, no new recipe,
no source-token re-edit on the calm axis.**

---

## 4 — DUP-CHECK against the 116-wave union set (no duplicative work)

| golden leg | extant wave(s) | relationship |
|---|---|---|
| leg (a) warm plate | `W-GLASS-ABROGATE-GRAY` (landed) | FROZEN — re-touch zero |
| ambient-hue histogram + bias | `BD.W-AMBIENT-TINT` (specs the ≤8% bias on the self-engage cascade) | the AMBIENT-GENERAL leg is the SAME wave WIDENED past the dock — **augment, do not mint a parallel wave** |
| dock content field | `BD.W-DOCK-CONTENT-FIELD` (live-backdrop-reactive GENERIC dock field) | ORTHOGONAL — that is the per-route VIZ field behind the DOCK; this is the universal CALM material field behind EVERY glass demo. Distinct scope; cite the boundary. |
| GPU field hoist | `BD.W-FIELD-ENGINE` / `BD.W-WAVE-FIELD-HARNESS` | ORTHOGONAL — that is the shader value-noise basis (procedural viz), NOT the CSS material field. No overlap. |
| directional rim | BC.W-BLACK-BAR D2 (landed) | the keyed-edge AUGMENTS the landed two-stop rim with ONE key token — distinct from the retired perimeter border. |
| cartoon cast register | `--shadow-cartoon-*` (shadow.css, landed) + the cartoon-shadow greenfield | the loud register is SHIPPED; the keyed default opts into it. No new cast system. |
| the gate | `no-gray.spec.ts` arms (a)-(f) + `proof:no-gray` | EXTEND in place (the triumvirate's own discipline) — the field/edge/transmit arms; born-RED, paired-engine. |

**No new wave needed for the FIELD ENGINE, AMBIENT, or CAST** — they augment extant waves.
The ONE genuinely-new surface is the universal warm-field register + the keyed-edge token +
the chassis mount, captured as TWO new augment-class waves (the WAVE-AMENDMENT names them).

---

## 5 — CONVERGENCE

The golden's **direction survives (refine, not re-invent)**; its **shippable spec does not**
(5 self-inflicted kills, all source/capture-grounded, all folded above). The union is a
clean REFINE: warm the mounted backdrop, key the shipped rim/cast, widen the shipped ambient
bias, extend the shipped gate — every leg composes an extant seam, zero fork, zero legacy.

**Convergence for glass-material: ~88%.** The 12% remaining is BUILD-TIME de-risk the
challenges mandate: (1) a REAL painted-composite spike that sets the honest bar from paint
(not the hardcoded `fieldSample`); (2) the gate sampling the PAINTED field (not
`backgroundColor`) with the flat-base/gradient self-test; (3) a real WebKit paired-π capture;
(4) the F3 rim ΔL proven ≥3:1. The DESIGN is converged and deftly-integrable; the NUMBERS
are gate-tuned against real paint at implementation (user-gated).

# BLEND-MORPH ENGINE — lens-a (PURE iOS-27 FIDELITY)

> GREENFIELD brainstorm, designed from first principles against the iOS-27
> Liquid-Glass canon, then reconciled to a DEFT union with the extant ecosystem
> (KISS/DRY, no re-fork, NO LEGACY). The ONE unifying blend/morph primitive every
> morph in glass-ui consumes — the goo neck (carousel/deck/pager) · EVERY dock
> animation (collapse/expand · V↔H · the fission split + sub-dock · contextual
> recompose) · general component morph (one element OUT/INTO another).
>
> **Binding law:** design.md §L1 (glass) · §L2 (driver/observer) · §L4 (cartoon) ·
> §L5 (PRM) · §L6 (golden proportion) · §Easing (`--ease-cartoon-punch`) · §L7
> (cross-engine) + `GREENFIELD-HARDENING-PLAN.md §1` + `IOS27-REFERENCE.md`
> (T1–T17). The iOS-27 reference demos are the guiding light. The four sibling
> GOLDENs (`goo-morph`, `dock-core`, `dock-fission`, `dock-hub`) already converged
> the SHAPE half — this lens does NOT re-litigate the barbell/hourglass; it NAMES
> the iOS-27 abstraction that makes all of them (plus component-morph) ONE engine,
> and it carries a FRESH live diagnosis of the broken showcase.

---

## 0. THE LIVE DIAGNOSIS — `/dock/morph-showcase` is BROKEN, captured live (2026-06-24)

I navigated `/dock/morph-showcase` + `/navigation/carousel` on `localhost:5173`
in Chrome DevTools, drove the morph in BOTH modes, and read back the DOM/computed
state. The "only the teardrop preview functions" defect is REAL and has **three
distinct root causes**, all now grep+live-confirmed:

### Defect 1 — the SHIPPED default is a crossfade DODGE, not a morph (the "doesn't work" the user means)

The default mode (`liquidPreview = false`) wraps a **hard DOM state-swap** in
`document.startViewTransition`. I clicked the toggle and sampled across the flip:

```
before: {vt-horizontal present:true,  vt-vertical:false}
+60ms:  {vt-horizontal present:false, vt-vertical:true}   ← INSTANT DOM swap
… holds vertical for 480ms …
```

There is **no continuous silhouette** — the vertical dock is unmounted and the
horizontal mounted in a single frame, and the platform compositor opacity-crossfades
the two snapshots. To the user this reads as "the morph does not work" because there
IS no morph: a dock vanishes, another appears, an opacity dissolve papers the seam.
The story's OWN comment confesses it ("the platform cannot continuously interpolate a
mismatched-topology silhouette … the showcase respects that limit rather than fighting
it"). **That is a fork admitting defeat — and shipping the defeat as the default.** A
scalar FIELD has no topology to mismatch; this whole limit is self-imposed by choosing
DOM-reflow + crossfade over a field weld.

### Defect 2 — even the PREVIEW teardrop is a DEGENERATE BLOB, not a V↔H teardrop

I forced `liquidPreview = on`, pinned `t = 0.5` (the morph midpoint), and screenshotted.
**The result is a single featureless white circle** (`diag-morph-preview-mid.png`).
The DOM is correct — the bridge holds a 52×296 vertical plate crossed with a 332×52
horizontal plate, the goo filter is mounted (`url(#dock-morph-goo)`), and BOTH real
docks are correctly `opacity:0` at mid (so only the goo teardrop should show). But the
goo `feColorMatrix` threshold (`stdDeviation 7`, alpha `×20 −9`) **over-eats the cross**:
at the midpoint the two thin plates blur into a lump and the threshold rounds it to a
plain circle. There is **no waist, no teardrop, no column→row read** — the defining
iOS-27 signature (T1) is absent even in the "working" mode. The blur is too aggressive
relative to the plate girth, AND there is no structural clip-path hourglass underneath
to GUARANTEE the waist before the filter softens it. This is exactly the failure the
field-weld spike's `kOf(p)` gap-tuning fixed (the smin BULGE failure when `k > gap`).

### Defect 3 — the cartoon tokens are PHANTOM, the goo mounts are MULTIPLIED

Live readback at root: `--motion-weight = EMPTY`, `--ease-cartoon-punch = EMPTY` —
the two tokens every "cartoon punch" claim depends on are UNSHIPPED (matches the
dock-core diagnosis). And on `/navigation/carousel` ALONE I counted **5 live goo
`<filter id>` mounts** — `dock-fission-goo`, `glass-goo`×2, `pager-goo`×2 — plus 4
inline `--goo-t` consumers. The byte-near-identical metaball graph is mounted FIVE
times on one route. **M1 is born-RED, live-measured.**

### The reframe these three defects force

The directive asks "research SDF/smin/Houdini." The live diagnosis says the problem
is NOT a missing technique — glass-ui already ships a real analytic smin engine
(`goo-blob/shaders/sdf-body.glsl.ts`: `sdgCircle`, `sminQuadratic`, `sminCircular`,
`sminG` — IQ-2024 normalized smooth-min, in GLSL **and** WGSL), Apple's literal
`feDisplacementMap` refraction (`useGlassRenderer.ts`), and three Safari-safe static
goo graphs. The problem is **NO SHARED SPINE + a topology-crossfade default that
fakes the morph + a filter with no structural waist underneath**. The cure is to NAME
the operation, give it a guaranteed waist, and kill the crossfade — not to add a shader.

### Verified de-risk (live)

`golden/field-weld.html` runs in-page: Tier-G WebGL2 `sminQuadratic` waist/body =
**0.412** (`k=57, gap=140`), Tier-S CSS clip-path hourglass matches within ±0.05 —
the two renderers agree (one field, two projections). The mechanism this lens proposes
is already de-risked across both tiers.

---

## 1. THE GOLDEN CORE IDEA — `useMorphField`: the iOS-27 `glassEffectContainer`, made literal

**Every blend/morph in glass-ui is a `smin`-union of N warm "bodies" whose
centers/radii are driven by a `0→1` field, rasterized through a tier chosen by
caps.** Goo neck, dock collapse, V↔H, fission, component morph — the SAME field
operation; they differ ONLY in their **body descriptor** (how many bodies, their `t=0`
and `t=1` endpoints, each silhouette) and their **weight** (`--motion-weight`).

This is not an analogy — it is the literal iOS-27 model. Apple's `glassEffectContainer`
is a smin union of rounded-rects driven by a progress field; the `[Library●][◀player▶]
[●Search]` triad, the carousel neck, the V↔H teardrop are the SAME shader with different
rects. glass-ui already has the smin; it lacks the ENVELOPE that says "these are the
bodies, this is the drive, this is the tier." `useMorphField` is that envelope.

### 1.1 The keystone reconcile — DRIVE vs WELD (the line that prevents an EIGHTH fork)

The single most important reconcile, and what makes this a UNION not a parallel fork:

> **`useElementMorph` (the dock-hub GOLDEN's deliverable — NOT yet built, grep-confirmed
> absent in `src/`) = the DRIVE / TRANSLATE runner.** A rect inverts to a rect on ONE
> spring (FLIP). It owns WHERE the masses are: the travel, the rect endpoints, the
> `envelop` boundary-as-surface.
> **`useMorphField` (THIS engine) = the WELD layer.** N convex masses fuse through a
> neck/threshold into one continuous liquid silhouette with a real waist. It owns HOW the
> masses BLEND: the neck waist, the filter/SDF, the squish channel, the tier.
> They **COMPOSE.** `useMorphField` mints NO second FLIP loop — when it needs rect travel
> it calls `useElementMorph`. A pure `translate` with no metaball is `useElementMorph`
> ALONE. The goo-tear eruption is `useElementMorph` (boundary rect) + `useMorphField`
> (the tear's goo neck).

This is the correction the prior lens-a/c missed — they folded the drive INTO the engine,
which would be the eighth fork. The drive has a GOLDEN home (dock-hub); the engine is the
WELD half only.

### 1.2 The unification proof — ONE field model fits ALL the morphs

| consumer | bodies | `t=0` → `t=1` envelope | waist? | iOS-27 signature | drive scalar (UNCHANGED) |
|---|---|---|---|---|---|
| **carousel/deck neck** | 2 equal beads (`D=step/φ`) | apart → near → coalesce | yes (hourglass) | T13 momentum-neck | `--goo-t` |
| **pager-dots worm** | 2 pips | dot A → dot B | yes (thin filament) | the goo-morph worm | `--goo-t` |
| **dock collapse/expand** | 1 body | collapsed-px → expanded-px (convex blend, NO ratio) | no (single mass squishes) | T1 | `--dock-morph-t` |
| **dock V↔H morph** | 1–2 bodies | H footprint → V footprint (continuous teardrop) | optional (teardrop mid) | T1 | `--dock-morph-t` |
| **dock fission split** | 1 plate + N island buds | union → bud-off → necks pinch → triad | yes (asymmetric) | T2 (the HEADLINE) | `--neck-t`/`--island-t` |
| **component → component morph** | 1 source silhouette + 1 target | FLIP source-rect → target-rect, smin mid-flight | yes (the morph IS the neck) | T5 bloom-up | `--dock-portal-t` |

The dock collapse (1 body, no waist) and the fission (1+N bodies, waist) are the SAME weld
with a different body count — which is *exactly* why dock-core's ratio-free `--dock-live`
blend and dock-fission's `--neck-girth` bell are two projections of one math. **The
size-blend is the degenerate 1-body field; the goo neck is the 2-body field; the fission is
the (1+N)-body field. No fork — a parameter.**

### 1.3 The honest token contract (HARDENING-corrected)

The dock-core HARDENING BANNER is binding and OVERRIDES any "one clock" / "this engine
ships `--motion-weight`" claim:

- **DO NOT rename `--dock-morph-t`** (registered, the dock's collapse authority). The
  engine READS it. The carousel keeps `--goo-t`; the fission keeps `--neck-t`/`--island-t`
  as named reads off the consumer's field scalar. NO rename, NO alias.
- **The cartoon punch is NOT one clock.** A monotone `SpringProgress` cannot express
  anticipation (a damped spring approaches from one side only — design.md §Easing). The
  punch rides a SEPARATE driver on `--ease-cartoon-punch` (the real ~4% sub-origin dip +
  ~22% overshoot `linear()`), written to a DEDICATED CSS-only `@property` squish channel —
  NEVER `--stretch` (6 JS owners + the `--dock-morph-max-stretch:1.14` clobber). Honestly
  TWO drivers per morph: the SIZE channel (convex blend) + the orthogonal volume-preserving
  PUNCH (deforms but mathematically cannot resize).
- **`--motion-weight`/`--ease-cartoon-punch` are BOOKED by Band-0** (`BD.W-MOTION-WEIGHT`/
  `BD.W-CARTOON-PUNCH`). This engine DEPENDS on them; it does NOT re-mint them. The phantom
  tokens I read live are Band-0's to ship; this engine is their first library-wide consumer.

### 1.4 The API (the WELD contract — the thing consumers author)

```ts
// src/composables/motion/useMorphField.ts — THE ONE weld primitive
export function useMorphField(opts: MorphFieldOptions): MorphFieldHandle;

interface MorphFieldOptions {
  bodies: MaybeRef<BodySpec[]>;        // 1..N warm masses
  signature: MorphSignature;           // GEOMETRY only — never an app name (dock-hub law)
  driveVar?: string;                   // the EXISTING scalar this weld reads — default '--goo-t';
                                       // dock passes '--dock-morph-t', fission '--neck-t'. NO rename.
  weight?: MaybeRef<number>;           // → --motion-weight (Band-0, DEPENDED, not minted)
  tier?: MorphTier | 'auto';           // 'css' | 'svg-goo' | 'gpu' — default 'auto'
}
interface BodySpec {
  el?: Ref<HTMLElement | null>;        // the DOM node this body IS (FLIP via useElementMorph)
  at0: () => Rect;  at1: () => Rect;    // measured-ONCE endpoints (dock-core: no per-frame measure)
  radius?: () => number;               // D = thickness/φ default (golden-minor BLOB, not a plate)
  silhouette?: 'circle' | 'squircle' | 'capture';  // 'capture' = sample clip-path → SDF (tier-gpu)
}
type MorphSignature = { vector: 'lateral'|'radial'|'inward'|'axial'|'directed';
                        kRest: number; kPeak: number; neckHold: number; maxStretch: number };
type MorphTier = 'css' | 'svg-goo' | 'gpu';

interface MorphFieldHandle {
  readonly t: Readonly<Ref<number>>;       // mirrors the consumer's drive scalar (read-only)
  readonly waist: Readonly<Ref<number>>;   // the neck waist fraction (for π readback)
  readonly tier: Readonly<Ref<MorphTier>>; // the resolved tier
}
```

The **signature is DATA, not code paths**: `search`/`media`/`nav` are rows in ONE
`MORPH_SIGNATURES` map carrying `{vector, kRest, kPeak, neckHold, maxStretch}`, MOTION-named
(`radialBurst`/`lateralPeel`/`inwardMerge`), never app-named (the dock-hub law). One weld
reads the row; one recipe (`morph-field.css`) paints whatever the masses carry.

---

## 2. THE iOS-27 FIDELITY SPEC — the signatures the field MUST honor

This is the lens's contribution: the field model is correct only if it reproduces the
REFERENCE motion, frame for frame. Each fidelity edict below is a concrete constraint on
`useMorphField`, drawn from `IOS27-REFERENCE.md` and the live defects above.

### 2.1 The V↔H teardrop — fix Defect 1 + 2 (T1, the money-shot)

The crossfade DIES. V↔H becomes a continuous metaball interpolation: the column mass and
the row mass are two distributions in ONE field; the weld fuses them into a **teardrop at
the midpoint that genuinely flows column→row**. There is no topology to mismatch because
the field is topology-free — the threshold finds fewer-then-more connected components as
`--dock-morph-t` sweeps, with a gooey neck spanning the transition.

The teardrop must be a REAL teardrop, not the degenerate circle I captured. Two mechanisms,
both already proven in the field-weld spike:
- a **structural clip-path hourglass** underneath the filter — the concave waist is present
  on BOTH engines BEFORE the goo softens it (so it can never round to a circle);
- a **gap-tuned `kOf(t)`** so the blend band crosses the bridge threshold AT the midpoint but
  never bulges past it (the spike's `k > gap` BULGE fix). The current showcase's fixed
  `stdDeviation 7` is the BULGE; the cure is a `t`-driven `k`.

The drive stays `--dock-morph-t` (dock-core authority) — only the PROJECTION changes from a
crossfade to a weld.

### 2.2 The fission triad — the lateral transport-anchored peel (T2, the HEADLINE)

The fission `media` signature is EXACTLY the v3 lateral peel: a 5-tab bar goo-splits into
`[Library●][◀player▶][●Search]` on scroll. The field constraints:
- the necks **stretch + thin to a metaball waist then SNAP** (not a fade-disconnect) — the
  goo mount reads at the split midpoint, waist/body ≤ 0.45;
- the three resting capsules each carry their OWN margin + transmissive glass (box-INVIOLATE);
- bidirectional + interruptible (a mid-split scroll-reverse re-seats velocity-continuous);
- PRM → instant topology swap, zero neck frames.

This is the `(1+N)`-body descriptor with `vector:'lateral'`, `signature` row = `lateralPeel`.

### 2.3 The bloom-up / sheet FLIP — the component morph (T5, the new surface)

The iOS "tap a pill → it becomes the full player sheet" is `silhouette:'capture'` +
`useElementMorph` (the FLIP travel) + `useMorphField` (the goo neck of the bloom). The album
art is the FLIP element (same DOM node scales pill-rect → sheet-rect — NOT a cross-fade of
two arts); the scrim is brown-tinted transmissive (page reads through). The morph IS the
neck: the source silhouette smin-blends INTO the target silhouette mid-flight — the ONLY tier
that can goo two ARBITRARY outlines together is Tier-G (clip-path cannot interpolate two
arbitrary polygons gooily). This is the one genuinely new capability the directive names.

### 2.4 The cartoon punch — welded INTO the field (T1/T4, §L4 universal)

In a 1940s-technicolor cel the deformation ITSELF carries the anticipation/follow-through.
So the cartoon principles are WELD PARAMETERS, all `f(--ease-cartoon-punch)`/`f(--motion-
weight)` on the DEDICATED squish channel (never `--stretch`), compositor-only:

- **Anticipation** = bodyB BUDS out of bodyA (scale 0→1) AND the neck `k` pre-dips ~4% before
  it wells (a `linear()` dip no spring expresses).
- **Squash & stretch** = each mass's volume-preserving `useLiquidFlex` on the travel axis
  (cap ≤ 1.08 — the anti-taffy fence HOLDS; the LOUD register lives in NECK girth, not taffy).
- **Exaggeration** = the mid-neck girth swells PAST rest (the bold meatball); masses overshoot
  their slots by `--motion-weight · 1/φ` then settle.
- **Follow-through** = the trailing mass's neck-limb lags (`--i`-indexed stagger, the fission
  idiom); the `--neck-specular-angle` conic catch-light (`plus-lighter`, sRGB-safe) sweeps the
  throat ~60ms AFTER the geometry.
- **Arc** = mass centers travel a parabola (`±D·0.06·sin(πt)`) so the merge LOBS.
- **Solid drawing (the cartoon SHADOW)** = a moving cast-shadow plane under the silhouette (a
  `::after` compositor-transform caster on the real `--shadow-cartoon-md/lg` rung — NEVER an
  animated `box-shadow`, §design.md §Shadows) that slides OPPOSITE the field's motion and
  DEEPENS mid-merge. The single most ALIVE detail — the blob reads as a heavy droplet of mercury.

**morph-MORE-on-move** (the iOS-27 weight-responds-to-gesture signature): `usePointerVelocity
Field` (already fed from inside the loop) wells a fatter/longer neck on a fast gesture. ALL
gated on `--motion-weight`; PRM → 0 zeroes squash/overshoot/anticipation/arc/cast/stagger in
ONE assignment. The §L2 carve holds: PUNCH on drivers; the embla CONTENT snap stays
calm-overdamped (T13 — momentum YES, snap-bounce NO).

### 2.5 Material + proportion (warm six-layer survives every tier, NEVER gray, both modes)

Bodies/neck/island share the warm-cream domed-droplet `radial-gradient` → ONE continuous
liquid-glass droplet with an inner catch-light, transmissive (~0.55–0.80 α) so the §3 colorful
field reads THROUGH the weld; the threshold IS the crisp metaball edge + a 1px `--glass-edge`
inner rim (§3 defined edge). Light `srgb .944/.903/.865`; `.dark` the L0.68 warm-chroma lift +
`saturate/brightness` companion (plain per-mode arms — NO inset-shadow-in-`light-dark()` trap),
C ≥ 0.010, H ∈ [45,85] BOTH modes, R>G>B never gray. **Aristotelian proportion everywhere:**
body D = thickness/φ, reach = thickness·φ, neck rest D/φ, overshoot share `motion-weight·1/φ`,
arc 1/φ², radii concentric. **Audacious √φ type** on sub-dock/context labels (−1.5% tracking,
1.05 leading).

---

## 3. THE TIER LADDER — SDF/GPU where it MATERIALLY helps, static-SVG-goo where it is the floor

Never a single-tier bet. The same `useMorphField` call resolves to ONE of three render tiers,
chosen by `@supports` + PRM + body count + an explicit override. The tiers are a LADDER — each
the graceful degrade of the one above — so a feature is correct on Chrome AND Safari AND below.
**The structural clip-path hourglass is present in ALL THREE tiers** (the shared geometry), so
the three tiers sit on ONE waist and degrade by *softening*, never by changing the silhouette.
This is the fix for Defect 2 (a guaranteed waist under every tier).

- **Tier C — compositor CSS (DEFAULT for 1-body + small 2-body).** ONE body (dock collapse)
  needs NO weld — the dock-core ratio-free `--dock-live` convex blend on `scale` + the
  `useLiquidFlex` squish. A 2-body neck at viewport scale uses the §L7 sibling-layer goo: two
  masses + a clip-path hourglass neck, NO filter — the structural concave waist + a warm-cream
  `radial-gradient` alpha skirt reads as a metaball on both engines with ZERO filter cost. The
  universal floor; most morphs never need a filter at all.
- **Tier S — static SVG goo (DEFAULT for 2..N-body true metaball merges).** The carousel neck,
  the fission bud-off, the V↔H teardrop, the goo-tear render through the ONE static `#morph-goo`
  SVG filter (blur→threshold→atop). The Safari-correct metaball tier — the §L7 facts live in the
  static graph. Tier C's hourglass is STILL present underneath, so Tier S = Tier C + a soft warm
  fuse. The filter is gated to `[data-morphing]` — never a steady-state re-blur (the §L7 budget
  fence the V↔H showcase violated). Sweet spot: blur ~13/10/8 · slope ~15 · offset ~−7 — but
  with the `t`-driven `kOf(t)` so it never bulges. Where ~95% of morphs live.
- **Tier G — GPU SDF / displacement (OPT-IN, where the analytic field IS the point).** A
  WebGL2/WebGPU pass on the EXISTING `useGpuSubstrate` leaf rasterizing a true analytic `smin`
  field. Scoped HARD to exactly three cases: **(a)** the `silhouette:'capture'` component morph
  (the ONLY tier that can goo two arbitrary outlines); **(b)** n>3 merges (the radial burst);
  **(c)** deep transmissive refraction-on-the-neck (`feDisplacementMap`, Apple's literal
  technique). TWO sub-paths, BOTH in the repo: **G-sdf** reuses `goo-blob`'s `sminG`/`sdgCircle`
  chunk; **G-refract** reuses `feDisplacementMap`. OPT-IN, budget-gated (one GL per route,
  offscreen-paused, PRM-frozen), ALWAYS degrades to Tier S/C. A dock/carousel/pager morph NEVER
  mounts a GL context for its neck.

**The tier selector** (`tier:'auto'`) is geometry + caps, never an app name:
```
PRM reduce                          → C, t snaps 0→1, zero neck frames
@supports not (filter:url(#x))      → C (clip-path waist + cross-fade floor)
bodies.length === 1                 → C (collapse — no weld needed)
vector ∈ {lateral,radial,inward,directed} (a metaball) → S (the default)
silhouette:'capture' || bodies>3 || (opt GPU + substrate live + GL budget free) → G
```

**The boldest perf claim, and why it is RIGHT: 90%+ of morphs resolve to C or S, both
compositor-only and Safari-airtight; tier G is a deliberate viz luxury, never load-bearing.**
That is what makes the engine idiomatic + compatible + performant at once.

### Houdini `paint()` is REJECTED as a tier — the cross-engine verdict

The directive asks to PROTOTYPE Houdini paint + the css-paint-polyfill on Safari. The verdict
(MDN/web.dev): native Houdini `paint()` is Safari-absent (in-development). The
GoogleChromeLabs **css-paint-polyfill** backs it on Safari via `-webkit-canvas()` — but that
means on Safari the "idiomatic CSS paint" is *actually a 2D-canvas raster behind a polyfill*,
i.e. the SAME raster Tier S/G already do, with an extra abstraction layer and a per-frame
`paint()` invalidation cost that the static `filter:url()` (cached, gated to `[data-morphing]`)
does NOT pay. **A polyfilled-paint() on Safari is strictly more expensive than the static SVG
goo it would emulate, for identical pixels.** So Houdini paint buys nothing on the engine that
matters (Safari) and adds a Chromium-only fast path the floor must cover anyway. Tier G (the GL
SDF) gives the same analytic raster cross-engine-safely. Houdini is named ONLY as a
forward-ref, never a binding tier — the IDIOMATIC path here is the static SVG filter + the
`@property`-animatable drive scalars (which ARE CSS-native and Safari-airtight), not paint().

---

## 4. DOES SDF SUPERSEDE OR COMPLEMENT THE CSS/SVG GOO? — COMPLEMENT, decisively

1. **Safari cannot run a per-frame backdrop SDF as a default UI primitive.** iOS Safari
   throttles GL under memory pressure and backgrounds it on tab-switch; the one-GL-per-route
   budget means a dock cannot spend the route's GL on its own neck. A dock/carousel/pager morph
   MUST work with ZERO GL. SDF as the default re-introduces the exact single-tier fragility the
   V↔H showcase fell into.
2. **The SVG blur-threshold is a 2D screen-space metaball already exact enough.** The
   field-weld spike measured Tier-S = 0.409 vs Tier-G = 0.412 — |S−G| = 0.003. The eye cannot
   distinguish a 0.27 blur-threshold waist from a 0.27 smin waist at UI scale and speed.
3. **The CSS clip-path hourglass is the cross-engine INSURANCE for BOTH.** Whether the weld is
   SVG (S) or SDF (G), the structural concave waist underneath reads on both engines before any
   filter/shader fuses it. SDF sits ON TOP of the same structural waist; it does not replace the
   CSS layer.

**Therefore: SDF/GPU is the viz-luxury tier + the one true element-silhouette-capture morph,
COMPLEMENTING — never replacing — the SVG-goo (UI-chrome default) and compositor-CSS (universal
floor). The smin MATH is the unifying contract either tier honors: Tier C/S *approximate*
smin(k) geometrically; Tier G *evaluates* smin per-pixel. Same field, three projections, chosen
by caps.**

---

## 5. THE DELTA — which of the 7 forks RETIRE / MERGE / SURVIVE (DRY, no legacy)

| fork (L) | disposition | into what |
|---|---|---|
| `useGooMorph.ts` (353) | **REFINE → thin recipe over `useMorphField`** | the 2-bead `neck` descriptor; keeps public name + carousel/deck/pager + the `--goo-t` drive (NO rename); the N-plate bed DELETED |
| `useLiquidMorph.ts` (462) | **DELETE** (the duplicate FLIP loop) | re-pointed to `useElementMorph` (drive) + `useMorphField` (weld); `RADIAL_SPLIT`/`DIRECTED_SPLIT` become signature DATA; the `directed`/`capture` morph IS `silhouette:'capture'` |
| `useLiquidFlex.ts` (206) | **KEEP (consumed)** — the FEEL leaf | `useMorphField` composes it for the squish channel. NO change. |
| `useDockOrientationMorph.ts` (286) | **REFINE → thin recipe** | V↔H is a continuous field weld on `--dock-morph-t` (NO rename); the crossfade DIES; the dead `--dock-bridge-goo-filter` wire fixed to `url(#dock-morph-goo)` off the ONE `<GooFilter>` |
| `useDockMorphWindow.ts` (118) | **KEEP** — the timing window | the asymmetric enter/leave is orthogonal SCHEDULING; `useMorphField` USES it to open/close the morph window |
| `dockMorphMeasure.ts` (354) | **DELETE** (the ratio-FLIP seizure) | per dock-core GOLDEN; replaced by measure-ONCE `at0()/at1()`. The 1-body convex blend IS the degenerate field (`collapse`, tier C) |
| `useDockFission.ts` (599) | **REFINE → `useMorphField` consumer** | drive/spring/signatures/seam-tension/PRM-seat are FIT → the weld's signature DATA (`MORPH_SIGNATURES`, motion-named); keeps public API (box-inviolate); per-piece offsets indexed off `--neck-t`/`--island-t` (NO rename) |
| `GlassGooFilter`+`DockGooFilter`(+pager/morph mounts — **5 live on /carousel**) | **MERGE → ONE `<GooFilter :id :blur :slope :offset>`** | byte-identical graphs → one mount, an `id` prop; `#glass-goo`/`#dock-fission-goo`/`#pager-goo`/`#dock-morph-goo` resolve off the ONE mount |
| `goo-blob`/`goo-dot-matrix` smin (WGSL/GLSL) | **PROMOTE → Tier-G shared raster** | `sminQuadratic`/`sminCircular`/`sminG`/`sdgCircle` becomes the GPU-tier field renderer; the viz keeps consuming it; the capture-morph ALSO consumes it. ONE smin library-wide |
| `feDisplacementMap` (`useGlassRenderer`) | **PROMOTE → Tier-G refraction** | the deep transmissive media-dock + the captured-silhouette refraction read this existing path |

**Net:** 7 forks → ONE `useMorphField` weld + 2 SURVIVING leaves (`useLiquidFlex`,
`useDockMorphWindow`) + ONE `<GooFilter>` + the PROMOTED GPU/displacement tiers (already
shipped, now NAMED) + the COMPOSED `useElementMorph` drive (dock-hub's, not duplicated).
`dockMorphMeasure` + `useLiquidMorph`'s loop are the only pure DELETES (both broken/redundant).
**NO LEGACY, NO ALIASES** — the same amendment deletes the forks it replaces.

---

## 6. CROSS-ENGINE (Chrome + Safari) — the binding §L7 contract

- **The structural clip-path hourglass (Tier C) is the cross-engine FLOOR + insurance** — a
  concave waist on BOTH engines BEFORE any filter (proven live in both sibling spikes). The
  "works in Chrome, broken in Safari" class is closed at the GEOMETRY layer.
- **Tier S** = static `filter:url(#morph-goo-*)` (NEVER `backdrop-filter:url` — WebKit bug
  245510), `color-interpolation-filters="sRGB"` (bug 136418 → Chrome MATCHES Safari's forced
  sRGB so the waist thresholds IDENTICALLY), static literals (bug 283156 absent), region
  `−50%/200%`. All per-frame writes are `transform`/`opacity`/`clip-path`/the drive scalar.
  Gated to `[data-morphing]`.
- **Tier G** runs ONLY on `useGpuSubstrate`, one-GL-per-route, offscreen-paused, PRM-frozen;
  `feDisplacementMap` on the element (not `backdrop-filter`) → cross-engine. Degrades to S.
- **Houdini `paint()` REJECTED** (Safari-absent; the polyfill is strictly costlier than the
  static SVG goo it emulates) — the GL SDF gives analytic raster cross-engine-safely.
- **Acceptance = a PAIRED-engine π** (Chromium AND real Safari-26-on-Metal) at the neck peak,
  BOTH modes — never a single-engine green (§L7 / the live-verify-capture lesson).

---

## 7. A11Y / PRM CARVE (§L5)

PRM (`reduce`) → `seatSync()`: one-frame topology snap, `--motion-weight → 0` zeroes
squish/overshoot/anticipation/arc/cast/stagger, zero neck frames, bodies cross-fade (no weld);
the morph still CONFIRMS; the goo/SDF layer drops to `display:none` (tier G parks offscreen).
`prefers-contrast:more` → cartoon-cast opacity floors UP (inked edge = legibility asset).
`prefers-reduced-transparency` → body α → 1 (the `.glass-opaque` endpoint via the ONE
`--glass-level` path). The goo/field layer is `aria-hidden="true"` + `pointer-events:none`
decoration over an already-accessible surface. **WCAG-2.2.2:** one-shot per gesture, no
auto-loop — no pause owed.

---

## 8. THE WAVE AMENDMENT — `BD.W-MORPH-FIELD-WELD` (reconcile vs the 4 siblings + the 116-set)

ONE amendment (band: motion/foundations; the WELD spine the morph band rides), reconciled so
it UNIONS — never duplicates — the four sibling GOLDENs:

- **vs `BD.W-GOO-BARBELL-NECK` (goo-morph):** makes `useGooMorph` a thin recipe over
  `useMorphField` + lands the `<GooFilter>` merge it FLAGGED. Barbell geometry CONSUMED;
  `--goo-t` NOT renamed.
- **vs `BD.W-DOCK-FISSION-*` (dock-fission):** makes `useDockFission` a recipe over the SAME
  weld + folds `#dock-fission-goo`/`#dock-morph-goo` into the ONE mount + signatures →
  `MORPH_SIGNATURES`. Hourglass + dead-wire fix CONSUMED; `--neck-t`/`--island-t` NOT renamed.
- **vs `BD.W-DOCK-CORE` (dock-core):** the `collapse` signature (tier C, 1-body) IS the
  ratio-free `--dock-live` blend; `dockMorphMeasure.ts` DELETE is shared. `--dock-morph-t` NOT
  renamed; `--motion-weight`/`--ease-cartoon-punch` DEPENDED-ON (Band-0), not re-minted; the
  punch rides a DEDICATED squish `@property`, NOT `--stretch`.
- **vs `W-DOCK-HUB-API` (dock-hub):** `useElementMorph` (the DRIVE runner) is the dock-hub
  deliverable; `useMorphField` (the WELD) is THIS one — the orthogonal drive-vs-weld pair (§1.1).
  The amendment names the seam so the two waves COMPOSE, never fork. `silhouette:'capture'` is the
  engine surface the hub's component-morph rides.
- **vs the VIZ band:** tier G (the GPU smin SDF) AUGMENTS `W-GOOBLOB-*`/`W-DOTFLOW-REBUILD` with
  the shared smin field; it degrades to S for UI-chrome so it never becomes the dock's
  load-bearing path. `W-GOO-SPLIT-PERF` (the Safari-Metal budget) is ORTHOGONAL — untouched.

**The fix-list this wave delivers (born-RED on HEAD, live-measured):**
- M1 — ONE `<GooFilter>` mount (grep: zero duplicate graphs — **born-RED: 5 mounts live on
  /carousel**); `useLiquidMorph` DELETED (zero 2nd FLIP loop).
- M2 — every metaball morph shows a CONCAVE waist (waist/body ≤ 0.45, `hasLocalMinimum` true) —
  **born-RED: the V↔H preview is a degenerate circle**; identical on real Safari-26.
- M3 — V↔H is a continuous field weld (a gooey teardrop column→row), NOT a View-Transitions
  crossfade — **born-RED: the shipped default is the crossfade dodge**.
- M4 — the SAME call resolves tier C/S/G by caps; the SDF smin neck-radius matches the CSS
  clip-path waist within ±0.05 (**verified live in `field-weld.html`: |S−G| = 0.003**).
- M5 — cartoon punch on the DEDICATED channel (NOT `--stretch`), volume-preserving (X·Y≈1),
  anticipation dip below rest, √φ overshoot, traveling cast, warm-cream NEVER gray —
  **born-RED: `--motion-weight`/`--ease-cartoon-punch` EMPTY at root**.
- M6 — ~2–4 transforms/frame, static filter gated to `[data-morphing]`, tier G one-GL
  offscreen-paused; `proof:no-layout-animation` green.

**DE-RISK:** the four sibling spikes prove the Tier-0/1 floor across scales; `golden/field-
weld.html` (verified live in Chrome) proves the TIER AGREEMENT (0.412 ≈ 0.409, |S−G|=0.003), the
crossfade-kill, and the capture morph. The spike THIS wave still owes paired-engine is the
**Tier-G contextual component morph on real Safari-26-on-Metal**.

`W-GOO-SPLIT-PERF` + `W-DOTFLOW-REBUILD` are ORTHOGONAL — untouched. ONE engine, one smin
vocabulary, one goo filter, one drive, library-wide. NO LEGACY.

---

## 9. WHY THIS IS THE PURE-iOS-27 READ

The fidelity model is the field: every morph is a smin-union of warm bodies driven by a `0→1`
field — the literal `glassEffectContainer`. The body-descriptor makes collapse/neck/fission/V↔H/
component-morph ONE weld with a parameter, not seven forks. The lens's load-bearing addition
beyond the prior draft is the **fresh live diagnosis** (the crossfade dodge default, the
degenerate-circle preview, the 5 live goo mounts, the phantom tokens) and the **three concrete
fidelity constraints** — the guaranteed structural waist (so the teardrop never rounds to a
circle), the gap-tuned `kOf(t)` (so the goo never bulges), and the welded cartoon punch (so the
generalized weld feels as ALIVE as a hand-built per-app morph). The result: every blend/morph in
glass-ui is one thin descriptor over one weld — exactly what the user asked for, correct on
Chrome AND Safari by construction, with SDF a complement reserved for where the metaball IS the
content, and Houdini honestly rejected on a measured cross-engine cost — never an eighth fork,
never a single-tier bet.

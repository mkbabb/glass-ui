# BD.W-GLASS-ABROGATE-GRAY — RESEARCH TARGET (RESEARCH-2: the SOTA / design target)

> **The brief.** "The glass is too GREY/DARK — COMPLETELY ABROGATE dark-gray glass." Live user
> screenshots: the select dropdown panel is a flat medium-GRAY plate in LIGHT mode (should be
> warm-cream luminous glass); the glass CARDS are far too gray; the TOGGLE BUTTONS are gray glass
> (buttons should NOT be gray glass); surfaces are far too gray/dark and the TEXT ISN'T READABLE.
> The target is iOS-27 Liquid Glass: warm-cream LUMINOUS TRANSMISSIVE glass everywhere, real warm
> chroma, NEVER a dark-gray cast, readable text — in BOTH light AND dark mode. (Maps card reference:
> the backdrop shows THROUGH the glass tinted, with VIBRANT accents — not a gray slab.)

This doc defines PRECISELY what the surface SHOULD look like (the numeric target + the acceptance
bar). It does NOT prescribe the implementation (that is RESEARCH-1 / the build wave). The north star
is binding: `design.md` (the six-layer optical composite, the seven tiers, the warm-cream identity) +
the iOS-27 Liquid Glass material + glass+PAPER morphism + `CLAUDE.md` §BA.W-NO-GRAY (glass is warm
MATERIAL, never gray) + §W-DARK-MATERIAL (the luminous-dark transmissive register) + the
[[feedback-liquid-weight-universal]] motion law.

---

## 0 — THE ROOT CAUSE (measured truth, not a guess)

Measured LIVE off the running demo (`getComputedStyle` + an in-page oklab transform, 2026-06-23):

| token / surface | raw | resolved OKLab (L / C / H) | verdict |
|---|---|---|---|
| `--card` (light) | `hsl(36 48% 97%)` → `rgb(251,248,244)` | **L 0.980 · C 0.0062 · H 75.4** | warm hue, but **chroma 0.0062 — 3× BELOW the BA.W-NO-GRAY STRONG_FLOOR (C ≥ 0.020)** |
| `--neutral-0` (page) | `hsl(40 30% 98%)` → `rgb(251,250,248)` | L 0.985 · **C 0.0029** · H 84.6 | near-achromatic — the page itself is barely warm |
| `--glass-bg-floating` | `color-mix(srgb, --card 80%, transparent)` | plate = `rgb(251,248,244)` @ 0.80α | **the plate's OWN colour is C≈0.006 — it injects NO warm chroma** |
| `--glass-tint-strength` (default) | `0%` | — | **the adaptive tint adds ZERO warmth at rest** (it only engages under the bright-bucket / dark arm) |
| content-tier `backdrop-filter` | `blur(10px) saturate(1.05)` | saturate **1.05** | the warmth-carrying term is **near-1.0 — too weak to inject chroma from the backdrop** |
| dock control `--glass-bg-floating` plate | `srgb 0.984 0.973 0.956 / 0.80` | C 0.0002 | the toggle/dock buttons paint a near-neutral cream at 80% — over a neutral page → **reads GRAY** |

**The defect, named precisely.** glass-ui's glass is a TRANSLUCENT NEAR-NEUTRAL plate (`--card` at
C 0.0062 ≈ 6× too low) composited over a NEAR-NEUTRAL page (C 0.0029), with a saturate term (1.05)
too weak to pull any warmth out of the backdrop. The result is exactly what the composite math
predicts: **a translucent ~neutral plate over a ~neutral page = a flat medium-gray.** Nothing in the
stack carries enough warm chroma to survive transmission. The system DESIGNED the warmth into `--card`
(BA.W-NO-GRAY warmed the hue to H 75.4) but never lifted the CHROMA high enough, and never made the
glass PLATE inject its own warmth — so on a flat page the glass has nothing to be warm with.

This is **not** a token-base bug (the hue is correct, H 75.4 warm-amber) — it is a **chroma + saturate +
tint-at-rest deficiency**:
1. `--card` chroma sits at the gamut-bound near-white floor (C 0.0062), below the perceptual-warm bar.
2. the glass `saturate()` companion (1.05 content / 1.18 floating) is far below the iOS/apple.com nav
   load-bearing `saturate(1.8)` — Apple's web nav and the LogRocket SOTA both run `saturate(180%)`.
3. `--glass-tint-strength` is `0%` at rest, so the plate adds no warm tint of its own; it only darkens
   under the bright-bucket (which made it grayer, not warmer).
4. there is no warm-LUMINOSITY lift (`brightness`/warm tint) on the light content tiers — only the dark
   arm got the luminosity companions; the light glass is flat-shaded.

---

## 1 — THE SOTA GROUND (what iOS-27 Liquid Glass + apple.com actually are)

Authority in-repo: `docs/tranches/BC/research/apple-glass.md` (live-measured apple.com DOM) +
`apple-ios27.md` (the OS material model). The measured truth:

- **The saturate term is LOAD-BEARING.** apple.com's nav glass = `backdrop-filter: saturate(1.8) blur(20px)`
  over `white/0.8`, NO border, NO shadow. The **1.8 saturate is the highest term**; blur is moderate
  (20px). The LogRocket/CSS-SOTA recipe is the same shape: `backdrop-filter: blur(2px) saturate(180%)`.
  **Saturation carries the "concentrated light" reading** (design.md §L1.1: "the saturation channel
  matters as much as the blur radius"). glass-ui runs 1.05 on content — that is the gray.
- **The plate is TRANSMISSIVE, warm, lower-opacity.** apple.com nav is `white/0.8`; glass-ui's
  differentiator (apple-glass.md §3) is **warm-cream `--card` at LOWER opacity (more transmissive)** —
  the backdrop shows THROUGH it tinted warm. The Maps-card reference in the brief is exactly this: the
  backdrop is visible through the glass, tinted, with vibrant accents — not an opaque slab.
- **Buttons are NOT gray glass.** apple.com CTAs are SOLID-fill capsules; glass-ui's glass buttons are
  TRANSMISSIVE warm-cream capsules with a pointer gleam + press-spring (W-BUTTON-GLASS-IOS). A gray
  glass button is the failure — it must read as warm transmissive material or (for the prominence CTA)
  carry a `--glass-accent` data-hue.
- **Glass on CRAFT, not glass on photo (the differentiation).** glass-ui glass floats over the
  warm-cream paper underpaint + blueprint grid + audacious type. The warmth must be visible THROUGH the
  glass — the craft beneath is the identity Apple's flat `#f5f5f7` panels lack.

---

## 2 — THE TARGET SPEC (what the fixed surface MUST resolve to)

The numbers below are the ACCEPTANCE TARGET — the build wave hits them; the π gate verifies them.
All are measured on the FINAL COMPOSITED paint (the rendered plate over its real backdrop), in BOTH
modes, via `getComputedStyle` → oklab (the [[feedback-live-pi-oklab-paint-arm]] discipline — grey
separates by L, warmth by C+H).

### 2.1 — LIGHT mode — warm-cream luminous transmissive glass

| axis | HEAD (measured) | TARGET | rationale |
|---|---|---|---|
| **plate chroma** (`--card` / glass base) | C 0.0062 | **C ≥ 0.018–0.024** (warm-amber) at L ~0.97 | clear the BA.W-NO-GRAY plate-warmth bar (≈2× HEAD); the warmth must be PERCEPTIBLE, not gamut-floor token-only. The L82/border rungs already clear C ≥ 0.020 — the near-white plate must clear a materially-warm PLATE floor (not pushed to a visible CAST — warm, not tinted) |
| **plate hue** | H 75.4 | **H 62–78** (warm-amber `--foreground` family) | KEEP — the hue is already correct; do NOT drift toward yellow-green (H 95) |
| **composited plate over a neutral/light page** | reads ~gray (C ≈ 0.006 final) | **final composite C ≥ 0.012, H 60–85, L ≥ 0.88** | the plate over the flat page must STILL read warm-cream — never neutral-gray; the warmth survives transmission |
| **`saturate()` content tier** | 1.05 | **1.3–1.5** content / **1.5–1.8** floating+overlay+dock | lift toward the apple.com/SOTA load-bearing register; the saturate is the warmth-from-backdrop term. Bound by the calm-default fence — content stays calmer than the deep tier's 1.8 ceiling, but materially above 1.05 |
| **warm LUMINOSITY** | none on light tiers | a small warm-tint / brightness companion so the plate reads LIT, not flat-shaded | the iOS "glass concentrates light" — the light tier must glow warm like the dark arm already does (dark glass got saturate/brightness companions; light glass did not) |
| **`--glass-tint-strength` at rest** | 0% | a small POSITIVE warm floor (e.g. the `--glass-tint-strength-floor` 4% engaged on content tiers, or a warm tint source) so the plate injects its OWN warmth even over a flat page | the plate must not depend on a warm backdrop existing; it carries warmth intrinsically |
| **transmission** | opaque-reading at 0.65–0.95α over flat page | the backdrop must read THROUGH (Maps-card) — KEEP/lower opacity where the tier allows; the blur+saturate makes the through-read warm | transmissive, not a slab |
| **TEXT contrast** | failing in places | `--foreground` body ≥ 4.5:1, `--muted-foreground`/on-glass ≥ 4.5:1 over the COMPOSITED warm plate, BOTH modes | readable is non-negotiable (design.md §L5 worst-case-contrast); the on-glass-fg family already exists — verify it clears over the NEW warmer plate |

### 2.2 — DARK mode — luminous-dark transmissive material (NOT a charcoal slab)

The dark arm (W-DARK-MATERIAL) is already the correct SHAPE (`--card` L16, `--foreground` warmed to
H 75.4, saturate/brightness luminosity companions, dark tint-seam lift). The brief's "too gray/dark"
applies in dark mode too — the dark plate must read as **luminous warm-dark glass that GLOWS where the
backdrop passes through**, never a dead charcoal void:

| axis | TARGET |
|---|---|
| dark plate | warm-dark, the backdrop transmits + GLOWS (the existing `saturate(1.22–1.35) brightness(1.06–1.18)` companions are the right idea — verify they read as luminous, lift if the plate reads flat-charcoal) |
| dark plate chroma | warm (H ~75), C materially above neutral so a chip/divider/plate reads warm-dark not gray-dark |
| dark tint-seam | the gentle LIFT toward luminous translucent dark (bounded 12% AA) — KEEP; verify it lifts WARM not gray |
| edge rim | the PRIMARY silhouette device in dark (α 0.22) — the warm edge carries the plate |
| text | `--foreground` (H 75.4, AA 15.9:1 over page) — KEEP; verify body + muted clear 4.5:1 over the dark COMPOSITED plate |

### 2.3 — The per-tier ladder (the warm-cream identity, both modes)

Every tier (wash → quiet → resting → floating → overlay → dock → chassis) stays **alpha-monotonic +
warm**. The fix is UNIFORM across the ladder (lift chroma + saturate proportionally) so tier SEPARATION
is preserved (design.md §Glass-Surfaces monotone-weight rule). NO tier may read gray in either mode.
The deep tier (`--glass-depth` / `.glass-deep`) keeps its `saturate(1.8) blur(16px)` Apple-nav ceiling
— the content tiers lift TOWARD it but stay below it (the calm-vs-deep two-register fence).

### 2.4 — Buttons specifically (the brief calls them out)

A toggle/glass `<Button>` MUST NOT read as gray glass. Target: a **warm-cream transmissive capsule** —
the warmer plate (§2.1) + the pointer gleam + the press-spring + (prominence) the `--glass-accent`
data-hue. The `.btn-glass` surfaces already reach the element-level oklab tint seam (W-BUTTON-GLASS);
they inherit the §2.1 chroma+saturate lift. A gray glass button at the close = FAIL.

---

## 3 — THE MOTION TARGET (the liquid-weight law, a binding acceptance lens)

Per [[feedback-liquid-weight-universal]] — the standing law: ALL motion carries inertia, weight, bounce,
liquid-glass quality; nothing snaps. This refine is a glass-MATERIAL fix, but the acceptance bar still
binds the surfaces it touches:

- any surface whose tint/opacity/saturate ANIMATES (the adaptive engage, the hover/press fill, the
  dropdown bloom) rides the spring register + fade-coupled-to-transform, NEVER a linear fade or a
  hard swap — compositor-only (`transform`/`opacity`/`filter`), PRM-carved (fade keeps, transform/blur
  drops under reduce), Safari-verified (the `filter` blur-settle on WebKit).
- the dropdown/select panel materializes with the `.glass-reveal` bloom (scale + fade + `filter:
  blur(4px)→0`) on `--spring-snappy` + the per-spring duration clock — not a flat zoom-95.
- a surface that snaps / hops / linear-fades its glass FAILS the liquid-weight bar.

(The glass-material fix does not itself add a goo-morph; it must not REGRESS the existing liquid motion.)

---

## 4 — THE ACCEPTANCE BAR (the binding π / gestalt verdict)

The wave closes ONLY when ALL hold, measured on a FRESH whole-page capture over the real backdrop, in
BOTH modes (the `proof:ba-gestalt` gestalt-verdict discipline — a per-mechanism ΔL is necessary but not
sufficient; the human-read gestalt "warm-cream luminous glass, not gray" is the bar):

1. **NO-GRAY (the headline).** Every enrolled glass surface — the select dropdown panel, the glass
   cards, the toggle/glass buttons, the dock — resolves a COMPOSITED warm chroma (final C ≥ 0.012, H
   60–85) over its real backdrop in BOTH modes. A surface whose composited C < the neutral floor at the
   warm hue REDS. (Grey separates by L, warmth by C+H — the paint-arm parses oklab.)
2. **LUMINOUS + TRANSMISSIVE.** The backdrop reads THROUGH the glass tinted warm (the Maps-card / iOS-27
   read) — the plate is not an opaque slab; the blur+saturate+tint make the through-read warm. Verified
   by the backdrop-visible-through capture (a busy/aurora backdrop modulates the plate).
3. **READABLE TEXT.** `--foreground` body ≥ 4.5:1 AND `--muted-foreground`/on-glass ≥ 4.5:1 over the
   composited warm plate, both modes (design.md §L5 worst-case). No regression of the on-glass-fg family.
4. **BUTTONS ARE WARM, NOT GRAY.** A glass/toggle `<Button>` reads as warm transmissive material (or
   carries an accent hue for prominence) — never gray glass.
5. **TIER SEPARATION PRESERVED.** The ladder stays alpha-monotonic + the deep tier stays the richest;
   the content tiers stay CALMER than deep (the two-register fence holds — calm content default not
   re-tuned past the deep ceiling).
6. **BOTH MODES.** Light reads warm-cream-luminous; dark reads warm-luminous-dark-that-glows — neither
   reads gray/charcoal/dead.
7. **LIQUID-WEIGHT un-regressed.** Any animated glass channel rides the spring + fade-coupled register,
   compositor-only, PRM-carved, Safari-floored (§3).
8. **IDIOMATIC / NO-LEGACY.** Token-first (lift the named chroma/saturate/tint INPUTS, not a parallel
   recipe — the substitution-vs-redeclaration discipline); clean break, no alias; the in-srgb
   `--surface-tint-*` brand-overlay fence (AW.W26) UNTOUCHED; the `in oklab` glass-tint axis is where
   the warmth lifts; Safari-compatible (the cross-engine blur+saturate+tint base carries the warmth —
   never load-bearing on the Chrome-only lens).

---

## 5 — THE EVIDENCE FILES

- `before-select-light.png` — the user-reported gray select dropdown (the defect ground).
- `before-glass-material-light.png` — the glass-material foundations page (the gray content tiers).
- The measured oklab table in §0 — the smoking gun (plate C 0.0062, saturate 1.05, tint 0%).

The build wave's AFTER capture, side-by-side with these, IS the captured-delta acceptance artefact
([[feedback-live-verify-capture]] — "live-verified" needs a captured DELTA, not a commit claim).

---

## Sources

- In-repo: `design.md` (§L1 six-layer composite, §Glass-Surfaces tier table, §L5 a11y/worst-case),
  `CLAUDE.md` (§BA.W-NO-GRAY warm-chroma floor, §W-DARK-MATERIAL, the `--glass-tint-*` adaptive seam),
  `docs/tranches/BC/research/apple-glass.md` (live apple.com DOM measure — `saturate(1.8)` nav, warm
  transmissive differentiation), `apple-ios27.md` (OS material model).
- Measured live off the running glass-ui demo, 2026-06-23 (getComputedStyle → oklab).
- [LogRocket — How to create Liquid Glass effects with CSS and SVG](https://blog.logrocket.com/how-create-liquid-glass-effects-css-and-svg/) (the `backdrop-filter: blur(2px) saturate(180%)` SOTA recipe — saturation as the load-bearing warmth term)
- [CSS-Tricks — Getting Clarity on Apple's Liquid Glass](https://css-tricks.com/getting-clarity-on-apples-liquid-glass/) (navigation-layer-only / regular-vs-clear / tint rules)

# BG Audit A — the GLASS + PAPER + MATERIAL + TOKEN cascade (KISS/DRY/encapsulation)

> Scope: `src/styles/glass/*.css` · `src/styles/tokens/*.css` · the `--glass-level`/`--glass-depth`/
> `--glass-tint-*`/`--glass-accent` axes · the per-tier alpha · the warm-chroma floor · the dark-material
> arm · the BD additions `--glass-key`/`.cartoon-cast`/`.paper-field`/`.glass-capsule`/`.glass-atom`/`.glass-chip`.
> Verified against HEAD `998136bb` (4.2.0). Cross-refs: A-routing (the field-as-aurora), A-field-aurora,
> A-aliasing (the red cast). Default-broken skepticism applied — every claim has file:line evidence.

The glass+token cascade is **8712 lines across 33 CSS files** (17 in `glass/`, 16 in `tokens/`). It is
not a clean four-axis system; it is a five-chromatic-axis sprawl with three live visual defects rooted in
**chroma-floor math** and **per-route paint** that was tuned by gates, never by eye.

---

## FINDINGS (what is actually true at HEAD)

### F1 — The red/maroon dock cast is `--cartoon-ink` chroma-floor math producing PURE OXBLOOD (defect #3, ROOT)

`src/styles/tokens/shadow.css:107`:
```
--cartoon-ink: oklch(from var(--foreground) clamp(0.14, l, 0.18) max(c, 0.11) h);
```
`--foreground` is `hsl(24 10% 10%)` (`tokens/color-radius.css:58`) — OKLch ≈ `L 0.16, C 0.013, H ~50°`
(warm near-black ink, deliberately LOW chroma per BA.W-NO-GRAY). The cast recipe **FLOORS chroma to 0.11**
(`max(c, 0.11)`, an 8× lift) at `L 0.14–0.18` and the warm hue. Computed sRGB:

| oklch | sRGB |
|---|---|
| `oklch(0.16 0.11 50)` | **rgb(44, 0, 0)** |
| `oklch(0.16 0.11 30)` | **rgb(46, 0, 0)** |
| `oklch(0.18 0.11 40)` | **rgb(51, 0, 0)** |

At that lightness, forcing chroma to 0.11 on a warm hue clamps green+blue to ZERO — the result is **pure
blood-red/oxblood**, NOT the "warm dark brown ink" the comment intends (`shadow.css:96-106` literally says
"TECHNICOLOR, not merely-non-gray… a warm DARK ink"). The math overshot: a chroma floor that high at L 0.16
cannot stay brown, it goes maroon by gamut necessity.

This `--cartoon-ink` feeds the three-plane offset stamp `--shadow-cartoon-{sm,md,lg}` (`shadow.css:120-131`,
hard 0-blur, down-LEFT offsets `-3px 3px`/`-5px 5px`/`-7px 7px`). The **dock emits a `.cartoon-cast` child**
(`GlassDock.vue:606`) painting `--shadow-cartoon-md` at rest → `-lg` mid-punch (`dock/shape.css:217-240`), so
the maroon stamp bleeds **down-left of every dock** — exactly the user's "red halo on the left/bottom of docks."
Cards carry the same child (`Card.vue:409`, `cards.css:359-381`).

### F2 — Card-corner rectangular aliasing is the hard-edged maroon offset stamp poking past the round silhouette (defect #3b)

The `.cartoon-cast` child is `inset:0; border-radius:inherit; z-index:-1` with a HARD 0-blur offset box-shadow
(`cards.css:365`, `shadow.css:120-131`). A `border-radius`-following box-shadow on an offset-stamp register
paints a colored rectangle shifted `-3..-11px` — its SQUARE corners protrude past the rounded card edge at the
top-left/corners (the offsets are down-left, so the top edge of the stamp shows above the card top). This is the
"card corners do not clip (rectangular aliasing at card top corners)" + "strange aliasing in the bottom-left
corner of docks." It is a SYMPTOM of F1 (the stamp is loud + maroon, so its geometry reads); a soft ambient
contact shadow would not alias. The card root has **no `overflow`/clip** (`Card.vue:319-321` — `rounded-card`
only), but clipping is the wrong fix; the offset stamp is supposed to extend (that's the Memphis-sticker look) —
the real fix is killing the maroon and softening the register.

### F3 — `.paper-field` is a 4-stop high-chroma warm CEL + conic glaze on EVERY route at 0.85 intensity (defect #2/#5, ROOT)

`src/styles/paper.css:138-183`: `.paper-field` paints (light arm) a `conic-gradient(from -45deg at 78% 22%, …)`
cel SHEEN over **four stacked radial-gradients** at OKLch chroma **0.155 / 0.145 / 0.115 / 0.075** (amber key →
terracotta mid → sand bounce → base wash) on `--neutral-0`. `--field-intensity` defaults **0.85**
(`property-regs.css:242`) and `[data-paper-field]` is mounted **globally in AppShell** (`AppShell.vue:360`
`<PaperBackdrop field>`). On top rides `.paper-underpaint` `--paper-grain-tooth` feTurbulence speckle at
**0.22 multiply** (`paper.css:31,56-58`). The composite = the "disgusting brown woven metallic wash on every page":
the conic glaze (`from -45deg`) is the iridescent sheen; the four high-chroma radials over a multiply-grain are
the brown woven texture; the `::before` `field-cel-drift` 42s animation (`paper.css:226-253`) makes it shimmer.

The conic glaze's first stop at 0% with a hard sheen edge at `78% 22%` from `-45deg` is a candidate source of the
**aberrant top bar** (defect #5) — the sheen band terminates at a hard alpha edge across the upper third.
**USER DIRECTIVE: every page should have an AURORA, not this paper wash.** The whole `.paper-field` chroma
primitive is the thing to retire in favor of a per-route aurora floor.

### F4 — FIVE disjoint chromatic glass tint axes; THREE do the identical `color-mix(in oklab, plate, hue strength)` op (sprawl)

The glass system carries **five** per-instance chromatic axes (all `@property`, all `inherits:true`):

| axis | tokens | role | mix |
|---|---|---|---|
| legibility darken | `--glass-tint-source` + `--glass-tint-strength` (`glass-fx.css:157-158`) | whole-plate AA darken over bright | `in oklab` |
| rim accent | `--glass-accent` + `--glass-accent-strength` (`property-regs.css:285-291`) | rim + `::before` specular core | `in oklab` |
| plate fill | `--glass-fill-tint` + `--glass-fill-strength` (`glass.css:399-411`) | plate BODY toward data hue | `in oklab` |
| ambient hue | `--glass-ambient-hue` + `--glass-ambient-strength` (`glass.css:379-392`) | sampled backdrop hue bias | `in oklab` |
| luminance bucket | `--glass-backdrop` + `--glass-backdrop-luma` (`glass-fx.css:219`, `property-regs.css:347`) | discrete/continuous darken trigger | — |

Plus the two NON-chromatic geometry scalars `--glass-level` (opacity+blur, `property-regs.css:327`) and
`--glass-depth` (deep diffusion, `property-regs.css:368`).

Three of the chromatic axes — `tint-source`, `fill-tint`, `ambient-hue` — are the SAME operation
(`color-mix(in oklab, <plate>, <hue> <strength>)`) applied at three nominal "layers" (legibility / body / ambient).
`liquid-morph.css:34-35` literally feeds `--glass-ambient-hue` INTO `--glass-tint-source` (proving they collapse).
This is the documented "THREE+ disjoint axes" smell: the system has one tint OPERATION wearing three token names.

### F5 — `--glass-ambient-*` is a half-built axis: read everywhere, WRITTEN nowhere → permanently inert

`grep` for any `--glass-ambient-strength:` declaration returns **zero** (only the `@property initial-value: 0%`).
The observer `useGlassBackdropLuminance.ts:448` writes `--glass-ambient-hue` but **never writes
`--glass-ambient-strength`**. So on the dock (the only wired consumer, `GlassDock.vue:93-94`) the ambient hue is
multiplied by the 0% default (`glass.css:271` dock bg reads `var(--glass-ambient-strength)` which is unset → 0%).
The ambient-hue axis paints NOTHING. It is a fully-registered `@property` + a histogram pass in the observer +
read-sites in `liquid-morph.css` and `DockExampleTile.vue` — all for a value that is structurally always 0.
A 5th chromatic axis that does not paint.

### F6 — Duplicated tint-floor / press-squash / loud-register idioms across the three new registers (DRY miss)

The `.glass-capsule` body composite (`glass-capsule.css`) genuinely UNIFIED the lifted-plate (~17 component
consumers: Slider, Button, Select, Badge, tabs, chips, dock controls, configurator, timeline — VERIFIED). That is
a **positive** finding — `.glass-atom` (`glass-atom.css:9-15`) and `.glass-chip` (`glass-chip.css:11-15`) both
COMPOSE it and are DISTINCT-not-fork. The capsule is NOT a 4th body dialect.

But the per-instance TUNING is re-pasted per register, not factored:
- **tint floor** `12% light / 15% dark` declared verbatim in `glass-atom.css:47,76` AND `glass-chip.css:82,140`
  (`--atom-tint-floor` / `--chip-tint-floor` — same numbers, two names).
- **press squash** `scale: 1.04 0.94` in `glass-atom.css:86,182` + `cards.css:339`; the hover squish
  `scale: 1.015 0.985` in `cards.css:327` — the same volume-preserving X/Y pairing, hand-pasted.
- **loud-register coupling** `--motion-weight: 1` in `cards.css:308`, `glass-atom.css:98,196`, `glass-chip.css`,
  `utilities/btn.css:146` — the SAME "don't mute the punch" guard, re-declared per consumer instead of a
  `.loud` class.
- **warm-zero stop** `oklch(0.9 0.05 75 / 0)` re-typed in **5 sites** (`glass-atom.css:61`, `glass-chip.css:100,102`,
  et al.) — should be ONE `--glass-warm-zero` token.

These are not separate dialects; they are ONE idiom re-keyed N times. Each new register re-derives the same
floor/squash/loud/zero constants.

### F7 — Dead tokens + dead `@property` registrations

- `--glass-saturate-deep-ceiling: 1.8` (`tokens/glass-deep.css:64`) — **0 `var()` readers** (documentation-only;
  a ceiling that nothing reads).
- `--glass-spine-blur` / `--glass-spine-opacity` (`tokens/glass-fx.css`) — **0 readers** (the spine register was
  retired but its tokens survive).
- `--cartoon-cast-dx` / `--cartoon-cast-dy` (`property-regs.css:209-215`) — registered `@property` + READ in
  `cards.css:371-372,378-379` (the cast translate + transition legs), but the `useCartoonCast` DOM bridge that
  would WRITE them **does not exist** (`grep` finds it only in comments: `cards.css:357`, `property-regs.css:186`).
  So they are permanently 0 — two dead transition legs + a dead drag-track that was "labeled honestly" as future
  and never built. The `--glass-depth` scalar-lerp (`glass-deep.css`) is similarly read only by its own file —
  `.glass-deep` is a static decoration, no host ever animates the depth, so the whole lerp machinery is unused
  geometry (2 static consumers: `Card.vue` deep tier + button).

### F8 — `liquid-morph.css` (850 lines) lives in `src/styles/` but ships ONLY to the demo

`liquid-morph.css` is the largest file in `glass/` (850 lines, over the no-god-module 500 bound the cascade
otherwise enforces) and is `@import`-ed by **`demo/demo.css:125` ONLY** — `critical-partition.mjs:174` confirms
"`liquid-morph.css` is demo-only." Yet it is consumed by a LIBRARY composable `src/composables/motion/useLiquidMorph.ts`
and a library style `dock/morph-bridge.css`. A 850-line stylesheet in the published `src/styles/` tree that the
library's own `/styles` cascade never ships is a structural smell — either it is library CSS (then it belongs in
`index.css`) or it is demo CSS (then it belongs in `demo/`). It is in neither lane cleanly.

---

## ROOT CAUSES (gestalt, first-principles)

1. **Gate-tuned, never eye-tuned chroma floors.** F1 and F3 share one disease: a numeric chroma floor
   (`max(c, 0.11)` for the cast, `C 0.155` radials for the field) was set to satisfy a "not gray / technicolor"
   gate, with no live look at the *resulting hue at the resulting lightness*. A chroma floor is gamut-coupled to
   lightness — 0.11 chroma is brown at L 0.5 and maroon at L 0.16. The system has many `proof:no-gray`-style gates
   asserting chroma ≥ floor; **none assert hue stays in band at the actual L**. The fix is not a different number;
   it is removing the floor mechanism on the cast (a cast is INK — it should be `--foreground` at low alpha, no
   chroma surgery) and replacing the field with aurora (no chroma-floored CSS gradient at all).

2. **One tint operation, five token names (axis proliferation).** Each tranche that needed "tint glass toward a
   hue" minted a NEW axis (W55 legibility, BB accent, BE fill, BE ambient) rather than parameterizing the ONE
   `color-mix(in oklab, plate, hue strength)` seam by INTENT. The result is five half-overlapping axes, one of
   which (ambient, F5) never paints, plus per-register re-derivation of the same floor/squash/loud constants (F6).
   The gestalt is: there is ONE chromatic glass tint — a `(hue, strength)` pair — and at most TWO targets it can
   hit (the PLATE body and the RIM). Legibility-darken is just "tint toward ink at AA strength"; ambient is just
   "tint toward sampled hue at sub-perceptual strength." They are presets of ONE axis, not four axes.

3. **The BD plan unified the BODY (capsule, key, material) but bolted the per-instance DECORATIONS on per
   consumer.** `.glass-capsule` + `--glass-key` + `material.css` are real unifications (positive). But the cast,
   the tint floor, the press squash, the loud-register, and the warm-zero stop were re-pasted into each new
   register's rule block instead of being factored into shared primitives. The plan's "consume-only, no-fork"
   fences (`glass-atom.css:7`, `glass-chip.css:9`) held for TOKENS but not for these IDIOMS.

4. **Half-built mechanisms shipped as "honest future."** `--cartoon-cast-dx/dy` (drag-track), `--glass-ambient-strength`
   (write side), `--glass-depth` (lerp), `--glass-saturate-deep-ceiling` — each is a registered/declared mechanism
   whose driver was never built. "Labeled honestly as future" still ships dead `@property` registrations + dead
   transition legs in the critical CSS. No-legacy means: a mechanism with no driver does not exist.

---

## PROPOSED WAVES

### BG.W-CAST-INK-DEMAROON — kill the maroon; the cast is `--foreground` ink, no chroma floor
- **Intent:** a cel cast is INK, not a colored event — remove the `max(c, 0.11)` chroma-floor surgery; paint the
  stamp as low-alpha `--foreground` (already warm by identity, BA.W-NO-GRAY), softened.
- **Approach:** retire `--cartoon-ink` chroma-floor recipe (`shadow.css:107`) → `--cartoon-ink` resolves
  `--foreground` directly at the existing 32/26/18% alpha ramp (in oklab); the warm hue rides for free, the maroon
  is gone by construction. Soften the dock cast register specifically (the dock is chrome, not a Memphis sticker —
  it should carry a soft ambient under-shadow, not the hard 0-blur offset stamp; re-point `dock/shape.css:217-240`
  off `--shadow-cartoon-*` onto a soft `--shadow-dock` register). Card cartoon surface keeps the hard offset look
  but de-maroon'd.
- **Files:** `tokens/shadow.css`, `dock/shape.css`, `cards.css`, `GlassDock.vue` (remove/soften the `.cartoon-cast`
  child on the dock).
- **π bar:** computed cast color is warm-brown (sRGB G,B channels > 0, not `rgb(N,0,0)`) at both stamp lightnesses;
  no maroon halo on any dock in either mode; card corners read clean (no rectangular protrusion above the round
  silhouette). Folds defect #3 + #3b.

### BG.W-FIELD-TO-AURORA — retire `.paper-field` chroma primitive; every route gets an aurora floor
- **Intent:** **USER DIRECTIVE** — every page has an aurora, not the metallic paper wash. Delete the high-chroma
  warm-cel CSS field; route every glass band onto a per-route offscreen-paused aurora floor.
- **Approach:** RETIRE `.paper-field` (`paper.css:94-218`) + `--field-h-raw`/`--field-intensity`/`field-cel-drift`
  + the conic glaze (the aberrant top-bar source) — clean break, no alias. The warm-route floor becomes a single
  shared `<Aurora>` instance (one GL context per route, the `useIntersectionPause`/offscreen-pause discipline the
  substrate already ships) at a calm warm preset, mounted by the demo chassis the way `<DockStage>` already shares
  ONE aurora. Keep `.paper-underpaint` grain as an OPT-IN texture only (drop it from the global mount). `--neutral-0`
  stays the KEEP-NEUTRAL opaque floor under PRT.
- **Files:** `paper.css` (gut the field), `AppShell.vue` (`<PaperBackdrop field>` → shared aurora mount),
  `warm-field.ts` (retire or repoint to an aurora-preset hue), `PaperBackdrop.vue`, `property-regs.css`
  (retire `--field-*` `@property`s), `StoryPage.vue`/`DemoFrame.vue` (`[data-paper-field]` → the aurora floor).
- **π bar:** no `.paper-field` selector ships; no high-chroma conic/radial wash on any route; every glass band reads
  over a live (or PRM-static) aurora; no aberrant top bar; one GL context per route (offscreen-pause honored).
- **CROSS-REF:** coordinate the aurora-floor mechanism with **A-field-aurora** + **A-routing** (the field is also
  entangled in the route-transition collision). Folds defects #2 + #5.

### BG.W-GLASS-TINT-UNIFY — collapse the five chromatic axes to ONE `(hue, strength)` × {plate, rim}
- **Intent:** ONE chromatic glass tint operation, two targets (plate body, rim), three named PRESETS (legibility /
  data-hue / ambient) — not five disjoint axes.
- **Approach:** keep ONE plate-tint pair (`--glass-tint-source` + `--glass-tint-strength`, the seam already wired
  everywhere) and ONE rim pair (`--glass-accent` + `--glass-accent-strength`). RETIRE `--glass-fill-tint`/
  `--glass-fill-strength` (fold onto the plate pair — `glass-atom`/`glass-chip`/`IconChip`/`SelectableChip` set the
  plate pair directly). RETIRE the inert `--glass-ambient-hue`/`--glass-ambient-strength` axis (F5 — it never
  paints; if a future ambient-hue is wanted, the observer writes the plate pair, no new axis). Document the three
  intents (AA-darken / data-hue / ambient) as STRENGTH presets of the one plate axis, not tokens. `--glass-level`/
  `--glass-depth` stay (they are geometry, not chroma) — but fold `--glass-depth`'s unused lerp (F7) unless a host
  driver lands.
- **Files:** `tokens/glass.css` (retire fill `@property`s + ambient `@property`s), `glass/glass-atom.css`,
  `glass/glass-chip.css`, `liquid-morph.css`, `useGlassBackdropLuminance.ts` (drop the ambient histogram pass),
  `IconChip.vue`, `SelectableChip.vue`, `DockExampleTile.vue`.
- **π bar:** ≤2 chromatic tint token-pairs exist (plate, rim); zero inert chromatic axes (every read axis is also
  written); the colored-chip register (green/violet chips) still paints via the plate pair (byte-equivalent at the
  data hue). Folds F4 + F5.

### BG.W-GLASS-IDIOM-FACTOR — one tint-floor token, one press-squash recipe, one loud class, one warm-zero token
- **Intent:** factor the re-pasted per-register idioms (F6) into shared primitives — DRY the tuning, not just the body.
- **Approach:** mint `--glass-tint-floor` (the 12%/15% per-mode pair, ONE home in `glass.css`/`dark-arm.css`) read
  by atom + chip; mint `.glass-press-squash` (the `scale: 1.04 0.94` volume-preserving press) composed by atom/chip/
  card/button instead of re-pasted; mint `.loud` (the `--motion-weight: 1` coupling) composed by cards/atom/chip/btn;
  mint `--glass-warm-zero: oklch(0.9 0.05 75 / 0)` read at the 5 sites. Delete the dead `--glass-saturate-deep-ceiling`,
  `--glass-spine-*` tokens (F7) and the dead `--cartoon-cast-dx/dy` legs + `@property`s (no driver — no-legacy).
- **Files:** `tokens/glass.css`, `tokens/dark-arm.css`, `glass/glass-atom.css`, `glass/glass-chip.css`, `cards.css`,
  `utilities/btn.css`, `tokens/shadow.css`, `tokens/property-regs.css`, `tokens/glass-deep.css`, `tokens/glass-fx.css`.
- **π bar:** the 12%/15% floor declared ONCE; `scale: 1.04 0.94` literal appears ONCE; `--motion-weight: 1` declared
  ONCE (the `.loud` class); `oklch(0.9 0.05 75 / 0)` declared ONCE; zero dead tokens / dead `@property`s in the glass
  cascade. Folds F6 + F7.

### BG.W-LIQUID-MORPH-REHOME — resolve the 850-line demo-only `liquid-morph.css` into its true lane
- **Intent:** a 850-line stylesheet in `src/styles/glass/` that the library `/styles` never ships, but a library
  composable + dock style consume, is in no clean lane (F8). Pick one.
- **Approach:** audit `useLiquidMorph.ts` + `dock/morph-bridge.css`'s actual dependence on `liquid-morph.css`. If the
  morph engine is library behavior (it is — it drives the dock V↔H morph), the load-bearing rules move into
  `dock/morph.css`/`material.css` (shipped) and the demo-only showcase rules stay in `demo/`. Break the 850-line file
  under the 500 bound the rest of the cascade honors. Coordinate with the dock-morph redesign (defect #13, the morph
  becomes a dock button) — much of `liquid-morph.css` may retire with the modal demo.
- **Files:** `glass/liquid-morph.css`, `composables/motion/useLiquidMorph.ts`, `dock/morph-bridge.css`,
  `demo/demo.css`, `critical-partition.mjs`.
- **π bar:** no library-consumed CSS lives demo-only; `liquid-morph.css` either ships in `index.css` or is gone; no
  glass file exceeds 500 lines. **CROSS-REF A-dock** (the morph-as-button redesign owns the demo side).

---

## Chronic / deferred folds
- **The chroma-floor-without-hue-band gate gap** (root 1) — propose a `proof` that asserts a chroma-floored token's
  RESULTING hue stays in band at its resulting L (would have caught the maroon at authoring). Booked into
  BG.W-CAST-INK-DEMAROON's bar.
- **The "honest future" dead-mechanism pattern** (F7/root 4) — `--cartoon-cast-dx/dy`, `--glass-depth` lerp,
  ambient-strength write: the no-driver-no-mechanism discipline. Folded into BG.W-GLASS-IDIOM-FACTOR.

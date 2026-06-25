# iOS-27 glass for BUTTONS · ICONS · CONTROLS — the shadcn-abrogation + suffusion map (fleet2)

**Lane** BD viz-research / fleet2 / glass-ios27-buttons-icons-controls · **Status** AUTHORED 2026-06-22 · **Branch** `prototype/liquid-dock` ·
**Substrate-grounded** (READ at HEAD): `src/components/ui/button/{index.ts,Button.vue}` · `src/components/ui/{switch/Switch.vue, checkbox/Checkbox.vue, radio-group/RadioGroupItem.vue, slider/Slider.vue}` · `src/components/custom/icon-chip/{IconChip.vue,types.ts}` · `src/styles/glass/{material.css,surfaces.css,control-surfaces.css,rim.css}` · `src/styles/tokens/{glass-fx.css,scale-paper.css}` · `scripts/proof-no-shadcn-default.mjs` ·
**Scope** PLANNING/RESEARCH ONLY — zero `src/` edits.

> Read alongside `media-analysis.md §C` (ios27-a/b + maps-card), `docs/tranches/BC/research/apple-ios27.md §1.3/§1.5/§1.6/§2.5` (the edge/rim/press SOTA + community values), the `UNIFIED-ROSTER` Band-7 rows (`W-ICONCHIP-GLASS · W-GLASS-CONTROL · W-TINTED-CHIP · W-CONTROL-GLASS · W-GLASS-EVERY-ELEMENT · W-DESHADCN-SWEEP/GATE`), and `arch/no-fallback-policy.md` (Safari-first — the cross-engine fence on the SVG lens).

---

## 0. TL;DR — the binding deltas

The user's ios27-a critique reads verbatim against the four glass refinements: **(1) lighter INNER shadow inside glass buttons · (2) FLATTER tops/sides (less extreme squircle) · (3) BRIGHTER upper+lower specular edges in light mode, L/R edges lighter · (4) the believable-glass bar = the edge highlight must READ.** Plus ios27-a's icon question ("is the shine around icons the same or changed") and the Maps-card circular gradient icon-chips + floating control discs.

The KEY architectural finding: **glass-ui already minted the directional-edge primitives the critique asks for** (`--glass-rim-top` bright catch-light / `--glass-rim-bottom` faint warm under-shadow, BA.W-DARK-MATERIAL, glass-fx.css:88-89) — but the BUTTONS + CONTROLS do NOT read them. `.btn-glass` reads the OMNIDIRECTIONAL `--glass-edge-light` ring (a uniform 0.18α inset, all four sides equal) for its rim; the directional top-bright/bottom-shadow pair is consumed only by the CARD ladder (rim.css). So the iOS-27 button-edge refinement is a SUBSTITUTION re-point (point `--glass-btn-rim` at the directional pair), NOT a new mechanism. This is the elegant transposition: the primitive exists, the consumer is wrong.

Six binding moves, all token-first / substitution-over-redeclaration, all on the EXISTING glass-fx/surfaces/rim seams (no new compositing axis, KISS+DRY):

| # | element | iOS-27 delta | mechanism (re-point, not re-mint) | roster home |
|---|---|---|---|---|
| 1 | **Button glass rim** | brighter top/bottom edges, lighter L/R, READ the glass | `--glass-btn-rim` re-points from the uniform `--glass-edge-light` ring onto the DIRECTIONAL `--glass-rim-top` + `--glass-rim-bottom` pair (already minted) | W-DESHADCN-SWEEP / a new `W-BTN-EDGE-IOS27` fold |
| 2 | **Button inner shadow** | LIGHTER inner shadow | the `--glass-btn-under-shadow` quiet-tier drop softens one notch + the inset specular `--glass-specular` (0.45α) is the load-bearing inner-top highlight, not a dark inner drop | same |
| 3 | **Button squircle** | FLATTER tops/sides | a less-extreme corner profile on the button radius (the `--radius-pill`/squircle `n` toward less-rounded) — W-SQUIRCLE owns the library-wide corner-AA + profile | W-SQUIRCLE (Band 7) |
| 4 | **Icon shine** | the shine around icons (Maps gradient chips) | `<IconChip surface="glass">` reads the ONE `--glass-fill-tint` plate axis + the directional rim — the chip's "shine" IS the glass rim+specular, not a baked glyph glow | W-ICONCHIP-GLASS + W-TINTED-CHIP |
| 5 | **Control glass tracks** | switch/checkbox/radio read glass | the `.glass-control-track` register (NEW, mirrors `.glass-search-well`) — switch already glass; checkbox/radio LIFT off the 16px opaque allowlist onto the small-control glass register | W-CONTROL-GLASS |
| 6 | **De-shadcn floor** | abrogate every shadcn neutral | `proof:no-shadcn-default` widened to the form-control register (switch thumb / checkbox / radio / slider track), reds any `bg-background`/`border-input`/`bg-secondary` off-allowlist | W-DESHADCN-GATE |

---

## 1. The ios27-a critique, frame-read against HEAD

> ios27-a: "Glass is tweaked quite a bit. **Lighter drop-shadows INSIDE the glass buttons. Flatter tops and sides** (instead of such rounded squircles). **Much brighter upper and lower edges in light mode.** Edges on left and right aren't quite as dark grey. Edges are still too dark to trick my brain into believing they're glass."

Four discrete deltas, each mapped to a precise HEAD token:

### 1.1 "Lighter drop-shadows INSIDE the glass buttons"

HEAD `.btn-glass` (surfaces.css:187-208) carries `box-shadow: var(--glass-btn-rim), var(--glass-btn-under-shadow)` where `--glass-btn-under-shadow: var(--glass-under-shadow-quiet)`. The "inner drop-shadow" the user sees as too heavy is the under-shadow tier + the dark-side of the rim. **The iOS-27 model (apple-ios27.md §1.3): the inner highlight is a BRIGHT inset-white top stop (`inset 0 4px 20px rgba(255,255,255,0.3)`), NOT a dark inner drop.** The button already has `--glass-specular: inset 0 1.5px 0 0 hsl(0 0% 100% / 0.45)` minted (glass-fx.css:55) — a strong inner-top white highlight — but `.btn-glass` does NOT compose it (only the moving `::before` specular gleam + the rim ring). DELTA: soften `--glass-btn-under-shadow` one notch (quiet→wash drop) AND compose the inset-white specular top stop into the rest box-shadow so the inner read is BRIGHT-top not DARK-drop. The inner shadow lightens; the inner highlight carries the glass.

### 1.2 "Flatter tops and sides (instead of such rounded squircles)"

HEAD buttons read `--radius-pill` (fully rounded) for the text buttons + the squircle bevel profile `⁴√(1-(1-x)⁴)` for the lens. iOS-27's refinement is a LESS extreme corner — the believable-glass shape is flatter on the top/bottom run with a tighter corner, not a full pill capsule. This is **W-SQUIRCLE's scope** (the library-wide corner profile / corner-AA, Band 7) — the button radius is a CONSUMER of the squircle profile; this wave records the iOS-27 target (flatter = lower squircle exponent / a continuous-corner radius nearer `--radius-card` than `--radius-pill` for the rectangular glass buttons) and defers the profile mint to W-SQUIRCLE. The fold: a "flatter" glass button is `<Button>` reading a `--btn-corner-profile` that W-SQUIRCLE owns, NOT a button-local radius literal.

### 1.3 "Much brighter upper and lower edges in light mode" + "L/R edges lighter" — THE HEADLINE

This is the elegant find. The PRIMITIVES EXIST:
- `--glass-rim-top: inset 0 1px 0 hsl(0 0% 100% / 0.30)` (glass-fx.css:88) — the BRIGHT top catch-light (kevinbism `inset 0 1px white`, the apple-ios27.md §1.3 community 0.3α value).
- `--glass-rim-bottom: inset 0 -1px 0 color-mix(in srgb, var(--foreground) 6%, transparent)` (glass-fx.css:89) — the FAINT warm bottom under-shadow.

The CARD ladder reads them (rim.css:80-83 composes `--glass-material-rim` = top + bottom directional). **The BUTTONS do NOT** — `.btn-glass` reads the OMNIDIRECTIONAL `--glass-edge-light` ring (uniform 0.18α all four sides). So the button's top edge is the SAME 0.18α as its L/R edges — exactly the "edges still too dark, L/R not lighter, top/bottom not brighter" the user reports. **DELTA (the binding move): `--glass-btn-rim` re-points from `var(--glass-edge-light)` onto the directional pair `var(--glass-rim-top), var(--glass-rim-bottom)`** — the top edge jumps to 0.30α white (brighter), the bottom to the faint warm shadow, and the L/R edges drop to the faint border ink only (lighter). ZERO new token, ZERO new mechanism — a one-line substitution pointing the button at the directional primitive the card already reads. For an even brighter upper/lower in LIGHT mode the rim-top can lift to 0.34-0.36α on the button-scope (a button is a smaller lit surface than a card, so its rim can run a notch brighter without blowing out — the same logic the dock-control rim runs hotter).

### 1.4 "Edges still too dark to trick my brain into believing they're glass"

The believable-glass bar = the edge highlight must READ as a light-catching bevel, not a dark hairline. The compound fix of 1.1 (bright inner-top highlight) + 1.3 (directional bright top/bottom, light L/R) IS the believability fix. The verification is the binding π: a glass button over a bright field must show a BRIGHT top edge + a faint bottom + light sides (the getComputedStyle box-shadow readback + the visual gestalt), both modes. The acceptance is the GESTALT (proof:ba-gestalt) — "does it read as glass," not just a token assert.

---

## 2. BUTTONS — the buttonVariants map (shadcn-abrogation status + iOS-27 suffusion)

### 2.1 The variant census at HEAD (verified)

| variant | HEAD register | shadcn-abrogated? | iOS-27 delta owed |
|---|---|---|---|
| `default` | `glass-wash btn-glass glass-deep` + oklab-tinted hover/active | ✓ glass-first (AX.W54) | the directional rim (1.3) + lighter inner shadow (1.1) |
| `primary-audacious` | same as default + `--scale-hover-btn` lift | ✓ calm glass (BA.W-GLASS-CAL H2a) | same rim/shadow + the flatter corner (1.2) |
| `gold-audacious` | `glass-wash btn-glass` + static gold wash | ✓ calm gold (no disco) | the directional rim reaches the gold tint too (the rim is decoration, the gold the fill — disjoint) |
| `outline`/`secondary`/`accent` | GLASS reskin (BC.W-BUTTON-GLASS-IOS BG-IOS-6) — quieter glass, prominence-by-tint | ✓ de-shadcn'd at BC | the directional rim (the quieter glass buttons read the SAME edge primitive — ONE rim source) |
| `destructive` | `bg-destructive text-destructive-foreground` | PARTIAL — opaque tone slab | the FEEDBACK-TONE colored-glass register (the destructive button = colored glass, not an opaque red slab) — folds to W-FEEDBACK-TONE consumer follow / W-DESHADCN-SWEEP |
| `ghost`/`link` | transparent / text-only | n/a (no surface) | — |
| `ai` | (variant key) | check at execution | record |

**The de-shadcn floor is largely MET at BC** (outline/secondary/accent reskinned BG-IOS-6). The OPEN buttons-band item: `destructive` is the lone opaque tone slab — the iOS-27 + W-FEEDBACK-TONE direction is colored GLASS (the `.feedback-tone` `color-mix(in oklab, <rung>, var(--tone) 18%)` register the Toast/Alert family already reads). A destructive button is a glass button with `--tone: var(--destructive)` on the tint seam — NOT `bg-destructive/90`. RECORD as a W-DESHADCN-SWEEP fold (the buttons-band tail).

### 2.2 The press register (verified SHIPPED, keep)

The press is iOS-correct at HEAD (BC.W-BUTTON-GLASS-IOS): `useSpringPress` defaults to the `press` preset (response 0.15 / ζ 0.86 — the Apple `interactiveSpring`), drives `useLiquidFlex` reciprocal squish (cap 1.04), couples the `--glass-btn-press-t` 0..1 scalar to BOTH the squish AND the specular brightness leg (surfaces.css:250 — the touch-illumination, apple-ios27.md §2.5). NO change owed — this is the SOTA press. The note (CLAUDE.md:473) is being reconciled by BD.W-BUTTON-GLASS-IOS-NOTE (the doc-only wave). The Button.vue:66 comment "0.25/0.7" is stale (a code-comment drift; the runtime is 0.15/0.86) — record for the SFC-comment sweep.

---

## 3. ICONS — the shine question (ios27-a) + the Maps gradient chips

> ios27-a asks: "is the shine around icons the same or changed."

### 3.1 What the iOS-27 icon "shine" IS

The Maps-card reference (maps-card / vid-ios27) shows CIRCULAR GRADIENT icon-chips (Work brown / Home blue / Walmart yellow / Add blue — concentric radii) — each a filled gradient disc with a glass shine: a bright top catch-light + a soft rim, the glyph centred. The "shine around icons" is the GLASS RIM + the inset specular on the chip plate — the SAME directional rim primitive the buttons get (§1.3), reaching the chip. It is NOT a baked per-glyph glow (the IconChip has NO glyph-glow today — verified: IconChip.vue renders a plain `<component :is="icon">` over a `color-mix(… 25%, transparent)` backplate, no shine).

### 3.2 The HEAD IconChip vs the iOS-27 chip

IconChip.vue (HEAD): a `color-mix(in srgb, <section/tone> 25%, transparent)` flat backplate + a full-chroma glyph, the `--icon-chip-glyph-ratio` floor, the `:duotone`/`:bloom`/`:saturated`/`:reveal` axes. The backplate is FLAT (in-srgb brand-overlay, no glass rim, no specular). DELTA (W-ICONCHIP-GLASS, Band 7): a `surface="glass"` arm that:
- reads the ONE `--glass-fill-tint` per-instance plate axis (W-TINTED-CHIP's — the chip is TINTED-CHIP's genuine ≥2nd consumer; NO parallel `--icon-chip-plate-color` glass-tint fork);
- composes the directional rim (`--glass-rim-top`/`-bottom`) + the inset specular for the "shine" — the chip reads as a glass disc that catches light, not a flat tinted square;
- the gradient is the consumer's context hue (presets-in-consumers — Work-brown/Home-blue are CONSUMER hues, never library tokens).

The `<IconChipCluster>` concentric arm (W-ICONCHIP-GLASS) is the Maps cluster (concentric radii, the icon-chip row).

### 3.3 The answer to "same or changed"

CHANGED — but additively. The HEAD `surface="filled"` (the flat 25% backplate, the section-color POP) STAYS (the calm one-color-event idiom, the suffuse register). The NEW `surface="glass"` arm is the iOS-27 Maps chip (glass rim + shine + per-instance tint). The shine is the GLASS RIM reaching the chip — the same directional-edge primitive the whole band consumes. ONE rim source, not a per-element re-paste.

### 3.4 The demo-icon watermark purge (a DISTINCT icon concern, recorded)

The 2026-06-22 user defect (W-DEMO-ICON-PURGE, Band 9): the storybook chassis empty-preview-box giant greyed-out placeholder icon watermark. NOT this wave's scope (demo-only, off `src/`) — recorded here only to fence it OUT of the icon-shine concern (the watermark is a demo placeholder, the shine is the IconChip rim).

---

## 4. CONTROLS — switch / checkbox / radio / slider glass-tracks

### 4.1 The HEAD state (verified)

- **Switch** (Switch.vue): the TRACK is ALREADY glass (AY.W-PRIM-POLISH D7 ARM A — `glass-wash glass-specular-track`, the 24×44px track is large enough to read glass; the unchecked register is a translucent wash plate, the checked ON-state `bg-primary`). The thumb reads `bg-card` (BC.W-CONTROL-SMOOTH — the warm-cream MATERIAL, de-shadcn'd off `bg-background`). **Switch is the reference — glass already.**
- **Checkbox** (Checkbox.vue): a 16px `border-primary` box, `data-[state=checked]:bg-(--control-checked-bg)`. The unchecked register is a bare bordered box — NO glass track. It is on the AY.W-PRIM-POLISH ARM B opaque allowlist (16px is "below the size where glass reads as glass over a flat substrate").
- **Radio** (RadioGroupItem.vue): a 16px `border-(--control-ring)` circle, `data-[state=checked]:bg-(--control-checked-bg)`. Same as checkbox — ARM B allowlist, no glass.
- **Slider** (Slider.vue): the THUMB reads `glass-specular-track` (glass), the track/range read the `.slider-track`/`.slider-range` CSS recipes. Check at execution whether the TRACK is glass or a flat `bg-secondary`.

### 4.2 The W-CONTROL-GLASS delta — the `.glass-control-track` register

The roster names W-CONTROL-GLASS as "the last glass-for-every-element PARTIAL: the explicit `.glass-control-track` register for switch/checkbox/radio + a calm single-color breathing preset." The binding finding: **a `.glass-control-track` register does NOT exist at HEAD** (grep: zero `glass-control-track` in src/styles/). The mint:
- `.glass-control-track` — a NEW register (control-surfaces.css or a new `glass/control-track.css`) mirroring the `.input-pill`/`.control-surface` form-REST register: the `--control-surface-bg`/`-border`/`-blur` glass fill + the directional rim (`--glass-rim-top`/`-bottom` reaching the control) + the inset specular. The switch track FOLDS onto it (retiring the hand-composed `glass-wash glass-specular-track` triplet — the substitution-over-redeclaration discipline, ONE control-track source);
- checkbox + radio LIFT off the ARM B opaque allowlist onto `.glass-control-track` IFF the small-control glass reads (the 16px-glass legibility bar — the directional rim + a bright top catch-light may make even a 16px box read as glass; verify at the π). If the 16px glass does NOT read (the original ARM B rationale), they STAY allowlisted with the rationale RE-RECORDED — the honest hold, not a forced glass that reads muddy. **This is the judgement call the wave decides on real pixels, not a forced uniform glass.**
- the "calm single-color breathing preset" — a `prefers-reduced-motion`-gated slow opacity/specular breathe on the control track (a single warm hue, the §6 calm register — NOT a disco shimmer; the metal-glow PRM-static precedent).

### 4.3 The de-shadcn floor on the control register (W-DESHADCN-GATE)

`proof:no-shadcn-default` (verified) ALREADY targets: switch thumb `bg-background` (reskinned to `bg-card` at BC.W-CONTROL-SMOOTH), toggle `outline` `border-input`. The control-band WIDEN: red any `bg-background`/`bg-input`/`border-input`/`bg-secondary` base surface fill on checkbox/radio/slider-track off the recorded opaque allowlist. The `--control-ring` (12% foreground) + `--control-checked-bg` (88% primary + glass-floating) are the de-shadcn'd control tokens (verified, scale-paper.css:105-106) — KEEP; the gate fences a regression back to a neutral slab.

### 4.4 The checked/ON register (keep)

`--control-checked-bg: color-mix(in srgb, var(--primary) 88%, var(--glass-bg-floating))` (scale-paper.css:106) — the checked state is the warm-ink `--primary` MIXED toward the glass-floating tier (a glass-tinted fill, BC.W-BLACK-BAR). This is the de-shadcn'd SELECTED register — KEEP. The dark `--primary` is the legendre-violet (BA.W-DARK-MATERIAL §4), so a checked control in dark reads the chromatic violet, not achromatic cream — correct.

---

## 5. The shadcn-abrogation + iOS-27 suffusion LAW (W-GLASS-EVERY-ELEMENT + W-DESHADCN)

### 5.1 The coverage law

W-GLASS-EVERY-ELEMENT (roster): "enumerate ~92 packages; gate a glass facility OR a recorded opaque reason (the AX.W54 allowlist) per element." For BUTTONS/ICONS/CONTROLS specifically:
- BUTTONS: glass ✓ (all surface variants); destructive = the one tone-slab tail (→ colored-glass);
- ICONS (IconChip): `surface="glass"` arm (W-ICONCHIP-GLASS) + the flat `filled` KEEP;
- CONTROLS: switch glass ✓; checkbox/radio = `.glass-control-track` OR honest opaque hold (§4.2); slider track = verify.

### 5.2 The de-shadcn gate widen

`proof:de-shadcn` (W-DESHADCN-GATE — extends `proof:no-shadcn-default`/`proof:glass-cohesion` in place): reds on any off-allowlist reka/shadcn FORM token across the button/control/icon register. The form-control register is the last frontier — the gate's existing button/toggle/switch arms widen to the full control set + the destructive-tone-slab.

### 5.3 The fences (binding)

- **ONE rim source.** The directional `--glass-rim-top`/`-bottom` primitive is the SINGLE edge source — buttons, icon-chips, control-tracks ALL re-point onto it. NO per-element rim re-paste (the N-pastes anti-pattern the IconChip already collapsed once).
- **Presets-in-consumers.** Maps Work-brown / Home-blue chip hues are CONSUMER values; the library ships the glass chip register + the warm-cream default, never a context hue token.
- **Safari-first.** The directional rim + inset specular + glass blur are pure box-shadow + backdrop-filter blur (cross-engine — Safari paints them). The `:liquid` SVG lens stays Chromium-only with the un-gated blur+tint Safari floor (arch/no-fallback-policy.md). NO control/button depends on the SVG lens for its glass read.
- **No new compositing axis.** Every delta is a substitution (re-point a `--glass-btn-rim`/`--control-*` token) or a consumer of an EXISTING axis (`--glass-fill-tint`, `--glass-rim-*`, `--control-surface-*`). KISS+DRY.
- **The honest opaque hold.** The AX.W54 legibility allowlist (avatar/label/separator/skeleton/table) STAYS. If 16px checkbox/radio glass reads muddy on real pixels, they REMAIN allowlisted with the rationale re-recorded — a forced glass that reads worse is a regression, not a win (paint-first).

---

## 6. Wave map (the roster rows this research feeds)

| roster row | this research's contribution |
|---|---|
| **W-DESHADCN-SWEEP** (Band 9) | the directional-rim button re-point (§1.3) + the destructive colored-glass tail (§2.1); a `W-BTN-EDGE-IOS27` fold candidate if the rim re-point wants its own row |
| **W-ICONCHIP-GLASS** (Band 7) | the `surface="glass"` chip + the shine = glass rim answer (§3); the `<IconChipCluster>` Maps cluster |
| **W-TINTED-CHIP** (Band 7) | the ONE `--glass-fill-tint` plate axis the glass chip consumes (§3.2) — no parallel chip-tint fork |
| **W-CONTROL-GLASS** (Band 7) | the NEW `.glass-control-track` register + the switch fold + the checkbox/radio lift-or-honest-hold decision (§4.2) + the calm breathing preset |
| **W-GLASS-CONTROL** (Band 7) | the floating glass control DISCS (Maps 3D/compass/binoculars/nav) — `<GlassControl shape=circle>` (distinct from the form controls; the floating-positioned disc) |
| **W-SQUIRCLE** (Band 7) | the flatter-tops/sides corner profile (§1.2) — the button radius is a consumer of the squircle `n` |
| **W-DESHADCN-GATE** (Band 9) | the form-control de-shadcn widen (§5.2) |
| **W-DEMO-ICON-PURGE** (Band 9) | fenced OUT — the watermark is demo, not the icon shine (§3.4) |

---

## 7. The single most elegant move (the headline transposition)

**`--glass-btn-rim` re-points from the omnidirectional `--glass-edge-light` ring onto the directional `--glass-rim-top, --glass-rim-bottom` pair.** One line. It makes the button's top edge bright (0.30α white), the bottom a faint warm shadow, and the L/R edges drop to the faint border ink only — the EXACT "brighter upper/lower edges, lighter L/R, believable glass" the user asked for, using the primitive the CARD ladder already reads. The icon-chip + control-track consume the SAME pair. ONE directional-edge source, three consumers, zero new mechanism — the iOS-27 glass-edge suffusion is a DRY substitution, the architectural-transposition-for-elegance the mandate names.

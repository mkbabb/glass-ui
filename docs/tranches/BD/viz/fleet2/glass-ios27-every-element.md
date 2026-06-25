# Glass-iOS27 every element — the full-element shadcn-abrogation + suffusion audit (W-GLASS-IOS27 fleet)

**Lane** BD viz-research / fleet2 / glass-ios27 · **Status** AUTHORED 2026-06-22 · **Branch** `prototype/liquid-dock` ·
**Substrate-grounded** against `src/styles/tokens/{glass.css, glass-fx.css}`, `src/styles/glass/{ladder.css, material.css, rim.css, surfaces.css, squircle.css}`, the 42 `ui/` + 49 `custom/` component dirs at HEAD ·
**Scope** PLANNING/RESEARCH ONLY — zero `src/` edits. WRITE-only.

> Read alongside `media-analysis.md §C` (the iOS-27 deltas + Maps card + Proofread popover), the union roster Band-7 (`UNIFIED-ROSTER.md:83-101`) and its wave specs (`waves/BD.W-GLASS-EVERY-ELEMENT.md`, `BD.W-CONTROL-GLASS.md`, `BE.W-GLASS-CONTROL.md`, `BF.W-SQUIRCLE.md`, `BD.W-CORNER-AA-WIDEN.md`), the de-shadcn waves (`BF.W-DESHADCN-SWEEP.md`/`-GATE.md`), and the existing CLAUDE.md §"Glass-first canon (AX.W54)" / §"Adaptive glass legibility (W55)" / §"The refractive --glass-refract edge-lensing axis (W-LENSING)" sections. This doc is the ELEMENT-BY-ELEMENT audit that GROUNDS those waves: the enumeration, the residue ledger, and the iOS-27 token-delta map.

---

## 0. TL;DR

The roster already mints the BUILD waves (ICONCHIP-GLASS, GLASS-CONTROL, CONTROL-GLASS, SHEET-TRANSLUCENT, CLEAR-VARIANT, SQUIRCLE, CORNER-AA-WIDEN, GLASS-EVERY-ELEMENT census). This doc is the **audit substrate** under them: (1) the full element enumeration (~92 packages → glass-bearing / opaque-allowlisted / infra census), (2) the shadcn-residue ledger to abrogate (the exact `rounded-md`/`rounded-sm`/`bg-accent`/`bg-secondary`/`bg-popover` literals + the reka FORM defaults), and (3) the **iOS-27 glass token-delta map** — five concrete deltas the media critique names, each mapped to an EXISTING token seam (no new compositing path):

1. **Lighter INNER drop-shadow on glass controls** → re-tune `--glass-under-shadow-*` α downward on the control tiers (NOT the card tiers).
2. **FLATTER tops/sides (less squircle)** → the SQUIRCLE wave's superellipse exponent biased toward a flatter `n` on controls (a per-register `--glass-superellipse-n`), distinct from the card register.
3. **BRIGHTER upper+lower specular EDGES in light mode** → lift `--glass-rim-top` α (0.30→~0.40 light) + ADD a bright lower-edge stop (the directional rim's bottom currently a 6% warm under-shadow, not a specular catch — add a bright bottom catch in light).
4. **L/R edges less dark-grey** → the per-rung `--glass-border-*` ink is already ≤5% (BC.W-BLACK-BAR retired the dark perimeter); the residual L/R darkness is the SIDE under-shadow — drop the side darkening, keep top/bottom directional rim.
5. **Real backdrop bleed-through (the Proofread popover)** → the popover/dropdown/menu tier on the `--glass-opacity-sheet`/`clear` translucent register, not the opaque `bg-popover` shadcn default (the de-shadcn FORM abrogation).

The whole fleet is token-first + compositor-only + Safari-first (REGULAR `backdrop-filter: blur()` + cross-engine `box-shadow`/`clip-path` — NEVER `backdrop-filter: url()` as a load-bearing path; the W-LENS-PRISM chromatic rim is the Chromium-only refinement OVER the cross-engine floor). Default byte-near-identical where a register defaults reproduce HEAD.

---

## 1. The element enumeration — the glass-coverage census (state 1/2/3)

The verified surface: **42 `ui/` dirs** (41 packages + `_shared`) + **49 `custom/` dirs** = ~92 packages (`ls -d src/components/{ui,custom}/*/`). W-GLASS-EVERY-ELEMENT's census asserts each is in EXACTLY ONE of three states. The audit-confirmed classification at HEAD (live grep `grep -rl "glass\|backdrop-filter\|--glass-"` per dir):

### State 1 — GLASS-BEARING (ships a glass facility; routes the ONE model)

**ui/ band (verified ≥1 glass-bearing file each):**

| Element | Glass facility at HEAD | iOS-27 delta owed |
|---|---|---|
| `button` | `variant="glass"`/`default`/`primary-audacious` compose `btn-glass`+`glass-wash`/`glass-deep`, element-level oklab-tinted hover/press (W-BUTTON-GLASS) | lighter inner shadow (D1) · flatter-top (D2) · brighter edges (D3) |
| `card` | the 5-rung ladder + `surface="glass\|veil\|opaque"` axis + cartoon superset | corner-AA-widen (the 2026-06-22 screenshot) · brighter edges (D3) |
| `dialog` | `--glass-bg-dialog` (0.68 control-center register) + `.glass-top-layer` `@starting-style` + `.glass-reveal` | backdrop bleed-through is already there; flatter-top + lighter inner shadow |
| `sheet` | `--glass-opacity-sheet` (0.74) frosted-card register (W-SHEET-TRANSLUCENT) | the Maps see-through card register · backdrop bleed |
| `drawer` | `.glass-drawer[data-surface]` + the house snap engine | backdrop bleed (live-behind already non-modal) |
| `popover` | `.glass-reveal` + glass-floating plate | **the Proofread bleed-through (D5) — must NOT be opaque `bg-popover`** |
| `dropdown-menu` | `.glass-menu-row` + `.glass-reveal` | bleed-through (D5) · row glass already lands |
| `context-menu` | `.glass-menu-row` | bleed-through (D5) |
| `command` | `.glass-menu-row` + glass plate | bleed-through (D5) |
| `select` | SelectTrigger `.control-surface` + `.glass-menu-row` content | bleed-through on content panel |
| `combobox` (forms) | `.input-pill` well + menu-glass | well-on-glass (W-ON-GLASS-FG already) |
| `input` / `textarea` / `number-field` | `.input-pill` + `--control-surface-*` register | flatter-top (D2) on the well · lighter inner shadow |
| `tabs` (SegmentedTabs) | `pill` = `--glass-bg-quiet` track + `--glass-bg-floating` indicator | brighter edges on the active glass plate |
| `tooltip` | `--rounded-tooltip` + glass plate | flatter-top · bleed-through |
| `toast` / `notification` / `alert` | `.feedback-tone` colored-glass (W-FEEDBACK-TONE) + `surface` axis | bleed-through · the tone tint already rides glass |
| `progress` / `border-progress` | frosted `--glass-bg-quiet` rail + masked-conic border | (rail register already glass) |
| `slider` | thumb/track on glass tier | (geometry register) |
| `switch` | HAND-COMPOSED `glass-wash glass-specular-track` → W-CONTROL-GLASS promotes to `.glass-control-track` register | the named register mint |
| `badge` | the LOUD-saturated pill register (a glass-bearing-OR-allowlist edge case — see §note) | stays loud by design |

**custom/ band (glass-bearing):** `dock`+controls (`--glass-*-dock` family), `glass-panel`, `icon-chip` (→ `surface="glass"` arm via W-ICONCHIP-GLASS), `configurator` (chassis dividers + ColorSwatch), `metric-cell`/`metric-stack` (on glass), `expandable-container` (`glass-overlay` un-walled tier), `completion-seal`/`border-progress` (focal feedback over glass), `instrument-chassis`, `hover-popover`, `selectable-chip` (`.accent-tone` tonal), `spa-view` (out-in over glass), the viz surfaces that host glass chrome. **NEW glass-control (W-GLASS-CONTROL):** the `<GlassControl shape=circle>` floating disc (Maps control circles) — a NEW package landing GLASS-BEARING by construction.

### State 2 — OPAQUE-ALLOWLISTED (recorded opaque reason; the AX.W54 legibility allowlist)

| Element | Recorded opaque reason |
|---|---|
| `avatar` | a photo carrier; glass-frost would muddy the face |
| `label` / `separator` | sub-perceptual at hairline scale (glass reads as nothing at 1px) |
| `skeleton` | a loading placeholder reads as solid (`surface="glass"` is the NEW over-glass register — moves it toward state 1 opt-in) |
| `table` / `data-table` | dense data wants flat legibility |
| `badge` | the loud-saturated pill register (an intentional opaque event, not a glass surface) |
| `checkbox` / `radio-group` | 16px selection atoms below the glass-reads-as-glass scale (the AY.W-PRIM-POLISH D7 ratify) — **W-CONTROL-GLASS RE-OPENS them: the opt-in `surface="glass"` arm moves them to state-1-eligible while the flat default stays the allowlist floor** |

### State 3 — INFRA / non-component (no rendered surface; bounded named set)

`_shared` (the resolver/CVA leaf dir), `focus-scope` (behavior-only focus-trap host), `controls` (the DarkModeToggle dir). BOUNDED — a new element cannot be dumped into infra to evade coverage.

**The census closure (W-GLASS-EVERY-ELEMENT C1/C2):** every package is in EXACTLY one state, and the three-state union ≡ the on-disk package set. The HEAD coverage is near-complete (the birthdaycolor verdict "glass-ui already exceeds birthdaycolor's per-element coverage") — the census's load-bearing value is the FORWARD floor (a new un-glassed, non-allowlisted, non-infra element REDS — the gap `proof:glass-cohesion`'s `continue` could never catch).

---

## 2. The shadcn-residue ledger — what to ABROGATE (W-DESHADCN-SWEEP)

The de-shadcn FORM abrogation targets the literal shadcn/reka defaults still in the `ui/` source. The audit-confirmed residue (live grep at HEAD):

### A. Radius residue (shadcn `rounded-md`/`rounded-sm`/`rounded-lg` → named register)

| Site | Literal | Abrogate to |
|---|---|---|
| `alert/index.ts:11` | `rounded-lg` base | `rounded-card` / `--radius-card` (the named feedback panel radius) |
| `dialog/DialogContent.vue:187` | `rounded-sm` (close button) | `--radius-control` / `rounded-control` (the chip-scale close affordance) |
| `sheet/SheetContent.vue:135` | `rounded-sm` (close button) | `--radius-control` |
| `separator/Separator.vue:70` | `rounded-sm` (label chip) | `--radius-chip` |
| `data-table/DataTable.vue:159,177,247` | `rounded-lg` (data cards) | **allowlisted** — data-table is opaque-by-design (state 2); the `rounded-lg` is the dense-data flat register, NOT a glass surface — keep OR re-point to `--radius-card` for token-hygiene (no glass owed) |

The `--radius-*` named register already exists (`rounded-button`/`-card`/`-pill`/`-chip`/`-control`/`-panel`/`-tooltip`). The de-shadcn sweep re-points the 4 genuine residue sites (alert + 2 close buttons + separator label). The data-table `rounded-lg` is a token-hygiene re-point, not a glass abrogation.

### B. Opaque-fill residue (shadcn `bg-popover`/`bg-secondary`/`bg-accent`/`bg-background`)

| Site | Literal | Abrogate to |
|---|---|---|
| `dialog/DialogContent.vue:187` | `data-[state=open]:bg-accent` (close hover) | a glass-quiet hover or `--glass-bg-quiet` tint (the menu-row precedent) |
| `sheet/SheetContent.vue:135` | `data-[state=open]:bg-secondary` (close hover) | same glass-quiet hover register |
| `separator/Separator.vue:70` | `bg-background` (label chip backing) | allowlisted (separator label is a hairline-scale chip; opaque-by-design, the state-2 reason) |
| `select/SelectSeparator.vue` | `bg-*` | menu-glass register (already routes; confirm no opaque escape) |
| `command/Command.vue` | `bg-popover` palette plate | **the Proofread bleed-through (D5) — the command palette MUST be the translucent `--glass-opacity-sheet`/`clear` register, never opaque `bg-popover`** |

**The Proofread-popover delta (D5, the headline bleed-through):** the media critique's `ios27-b` shows the Messages "Proofread" popover with the purple chat backdrop bleeding THROUGH a frosted plate. The library's popover/dropdown/command/menu tiers must read as translucent glass over the live backdrop — NOT the opaque shadcn `bg-popover` plate. The `.glass-menu-row` + `.glass-reveal` already deliver the row + entrance glass; the residual abrogation is any `bg-popover`/`bg-card` opaque PLATE on the content container (the panel BEHIND the rows). Map: the popover/dropdown/command content plate re-points off any opaque fill onto the `--glass-opacity-overlay`/`-sheet` translucent register (the W-SHEET-TRANSLUCENT register, or the `clear` rung for maximal bleed).

### C. The de-shadcn GATE (W-DESHADCN-GATE)

`proof:de-shadcn` extends `proof:glass-cohesion`/`proof:no-shadcn-default` in place: reds on any off-allowlist reka/shadcn FORM token (a `rounded-md`/`-sm`/`-lg` off the named-radius register, an opaque `bg-popover`/`bg-accent`/`bg-secondary` glass-plate fill off the allowlist). The "exact-6 named-chip-radius sweep" (roster line 117) is the bounded residue set above. The allowlisted opaque sites (data-table, separator-label, badge) carry recorded reasons (state 2) and are NOT flagged.

---

## 3. The iOS-27 glass token-delta map — the FIVE deltas (media-analysis §C)

Each delta maps to an EXISTING token seam (no new compositing path). The critique (`ios27-a`): "Lighter drop-shadows INSIDE the glass buttons. Flatter tops and sides. Much brighter upper and lower edges in light mode. Edges on left and right aren't quite as dark grey. Edges are still too dark to trick my brain into believing they're glass."

### D1 — Lighter INNER drop-shadow on glass CONTROLS

**The seam:** `--glass-under-shadow-{quiet,default,vivid}` (`glass-fx.css:352-354`) — the inset/drop under-shadow the ladder composes. HEAD α: quiet 0.04 / default 0.08 / vivid 0.12 (oklch black).

**The delta:** the iOS-27 control inner shadow is LIGHTER than the current control register. The fix is a CONTROL-scoped under-shadow lightening — NOT a library-wide drop (the card register's grounding shadow is correct; the iOS-27 critique is specifically about glass BUTTONS/controls). Mint a `--glass-under-shadow-control` (~0.02-0.05, lighter than `-default`) that the control tiers (`.btn-glass`, `.control-surface`, `.glass-control-track`, the dock control plates) read, leaving the card/sheet/dialog under-shadows untouched. Presets-in-consumers: a consumer retunes the control under-shadow via the one token.

**Fence:** the lighter inner shadow must not collapse the press-feedback (the `--glass-btn-press-t` coupled brightness/specular leg carries the press read; the under-shadow is the resting depth, not the feedback).

### D2 — FLATTER tops/sides (less squircle)

**The seam:** `glass/squircle.css` — the `@supports (corner-shape: superellipse(2))` arm + the `--glass-refract` squircle bevel-profile (`glass-refract.css`). HEAD ships the Apple-preferred superellipse exponent baked at one curve.

**The delta:** the iOS-27 controls read FLATTER (less extreme corner curvature) than the current squircle — "flatter tops and sides instead of such rounded squircles." Mint a per-register superellipse exponent `--glass-superellipse-n` (a `<number>` the `corner-shape: superellipse(var(--glass-superellipse-n))` reads), with the CONTROL register defaulting FLATTER (a lower exponent → flatter sides, the rectangle-ward bias) and the CARD register keeping the rounder Apple curve. This is the W-SQUIRCLE wave's coverage (the cross-engine superellipse floor) PLUS a per-register exponent so a control can be flatter than a card. Compositor-safe (corner-shape is a paint property; on a gap engine the `border-radius` is the floor — the rounded fallback, never broken).

**Fence:** Safari-first — `corner-shape: superellipse()` is the newest primitive; the `@supports` gate keeps the `border-radius` floor on WebKit where superellipse is unsupported (W-SQUIRCLE owns the cross-engine fence). The flatter-n is a refinement OVER the radius floor.

### D3 — BRIGHTER upper+lower specular EDGES in light mode

**The seam:** `--glass-rim-top` (`inset 0 1px 0 hsl(0 0% 100% / 0.30)`) + `--glass-rim-bottom` (`inset 0 -1px 0 color-mix(in srgb, var(--foreground) 6%, transparent)`) — the BC.W-BLACK-BAR DIRECTIONAL rim (`glass-fx.css:90-91`). HEAD: top = bright 30% white catch-light; bottom = faint 6% warm UNDER-SHADOW (a grounding shadow, NOT a specular catch).

**The delta (the headline believable-glass fix):** the iOS-27 light-mode glass has BRIGHTER upper AND LOWER specular edges — both the top AND bottom edge catch light (the plate's bottom lip reads as a lit glass edge, not a shadow). Two moves: (a) lift `--glass-rim-top` α from 0.30 → ~0.40 in LIGHT mode (currently only the DARK arm sits at 0.40); (b) ADD a bright lower-edge specular catch — a `--glass-rim-bottom-light` that, in light mode, paints a brighter lower catch (e.g. `inset 0 -1px 0 hsl(0 0% 100% / 0.20)`) BESIDE the warm under-shadow (the bottom lip is BOTH a grounding shadow AND a glass-edge catch — two stops, like the top). This is the "much brighter upper and lower edges in light mode" verbatim. The DARK arm already glows the top to 0.40 (dark glass glows where light passes); the LIGHT arm is the one under-lit.

**Fence:** plain per-mode arms — NEVER an inset fragment inside `light-dark()` (the dark arm re-declares in `dark-arm.css`; light-dark() round an inset computes the whole box-shadow to none — the MEMORY trap). The brighter rim must not eat AA legibility over a busy backdrop (the rim is decoration; α bounded so it stays below the text-reading threshold).

### D4 — L/R edges less dark-grey

**The seam:** the per-rung `--glass-border-*` ink (`glass.css:311-316`, already ≤5% α after BC.W-BLACK-BAR retired the load-bearing dark perimeter) + any SIDE under-shadow.

**The delta:** "Edges on left and right aren't quite as dark grey." The perimeter ink is ALREADY a whisper (≤5%, BC.W-BLACK-BAR), so the residual L/R darkness is NOT the border ink — it is the omnidirectional component of the under-shadow / the lack of a SIDE catch. The directional rim (D3) carries TOP+BOTTOM; the L/R edges currently get only the faint perimeter ink. The fix: confirm the L/R edges read the same lit-glass register (a faint side catch OR simply the perimeter ink staying ≤5% with no added side darkening), so the four edges read as a continuous lit rim, not dark-grey sides framing lit top/bottom. This is largely VERIFIED-already (BC.W-BLACK-BAR did the work); the audit confirms the L/R darkness is gone and the directional rim (D3) completes the four-edge lit read. **Mostly a re-affirm + a π readback, not a new token.**

### D5 — Real backdrop bleed-through (the Proofread popover)

**The seam:** the popover/dropdown/command/menu/tooltip content PLATE opacity — `--glass-opacity-overlay` (0.95, near-opaque) vs `--glass-opacity-sheet` (0.74) vs `--glass-opacity-clear` (0.58). The de-shadcn fill abrogation (§2.B) — any `bg-popover`/`bg-card` opaque plate.

**The delta:** the Proofread popover (`ios27-b`) shows the purple chat backdrop bleeding THROUGH a frosted plate — a translucent, legible glass sheet, not an opaque panel. The library's overlay-band plates default to `--glass-opacity-overlay` (0.95 — too opaque for real bleed-through). The fix: the popover/dropdown/command/tooltip content plate moves toward the `--glass-opacity-sheet`/`clear` translucent register (with the W55 adaptive tint + the legibility scrim from W-CLEAR-VARIANT carrying the AA floor over a busy backdrop). The menu ROWS already glass (`.glass-menu-row`); this is the PLATE behind them — the panel reads the backdrop, not a solid fill. The `surface` axis (`glass\|veil\|opaque\|clear`) is the consumer knob; the DEFAULT for the floating-overlay band shifts translucent.

**Fence:** the legibility scrim is STRUCTURALLY coupled (W-CLEAR-VARIANT's `::before` luma-derived scrim) — a bleed-through plate over a busy backdrop must keep text AA; the scrim is the floor (W55 bright-bucket darken + the on-glass-fg muted lift). Safari-first: REGULAR `backdrop-filter: blur()`, never `url()`.

---

## 4. The cross-cutting iOS-27 fidelity waves (already in the roster, grounded here)

- **W-CORNER-AA-WIDEN (Band 3):** the 2026-06-22 corner-aliasing defect — clip the `backdrop-filter` saturate halo to the `border-radius` across ALL `.glass-*` tiers (the lost `b538dec7` `clip-path: inset(0 round …)` fix, widened library-wide, Safari-verified). This is the prerequisite for the flatter-squircle (D2) reading clean (a jaggy arc defeats the believable-glass bar regardless of the rim).
- **W-SQUIRCLE (Band 7):** the cross-engine superellipse silhouette floor (iOS continuous-corner, compositor-safe, Safari-critical) — D2's mechanism home; the per-register `--glass-superellipse-n` is the audit's proposed refinement on it.
- **W-LENS-SAFARI → W-LENS-PRISM (Band 7):** the `.glass-lens` cross-engine blur+tint floor (LENS-SAFARI), then the chromatic-aberration rim refinement (LENS-PRISM, Chromium-only OVER the floor). The edge dispersion reads as glass thickness — complements the brighter rim (D3).
- **W-MAPS-CARD (Band 7):** the composite gestalt — card + filled chips + search-pill-with-avatar + floating controls + chevron headers + recents list-row, with the card-EXPAND liquid morph. The composite verdict = BOTH Chromium + WebKit. The iOS-27 deltas (D1-D5) all land ON the Maps card surfaces (the card plate, the chip glass, the control discs).
- **W-SHEET-TRANSLUCENT + W-CLEAR-VARIANT:** the `--glass-opacity-sheet` (0.74) + `surface="clear"` (0.58) + the coupled legibility scrim — D5's register home.

---

## 5. The token-delta summary table (the build map)

| Delta | Existing seam | Proposed token / move | Fence |
|---|---|---|---|
| D1 inner shadow | `--glass-under-shadow-*` | mint `--glass-under-shadow-control` (~0.02-0.05), control tiers read it | card/sheet under-shadow untouched; press-feedback preserved |
| D2 flatter corners | `corner-shape: superellipse()` (squircle.css) | per-register `--glass-superellipse-n`, control flatter than card | `@supports` gate, `border-radius` Safari floor |
| D3 brighter edges | `--glass-rim-top`/`-bottom` (glass-fx.css) | lift light `--glass-rim-top` 0.30→~0.40 + add bright `--glass-rim-bottom-light` catch | plain per-mode arms (no light-dark() inset); AA-bounded α |
| D4 L/R less grey | `--glass-border-*` (≤5%, BC.W-BLACK-BAR) | re-affirm (mostly done); drop any side under-shadow | four-edge continuous lit rim |
| D5 bleed-through | `--glass-opacity-sheet`/`clear` + `surface` axis | overlay-band default translucent; abrogate opaque `bg-popover` | W-CLEAR-VARIANT legibility scrim floor; Safari REGULAR blur |

All five are token-first (the warm-cream identity + W55 tint + W-DARK-MATERIAL dark arm + the AW.W26 in-srgb fence all hold by reading the ladder, never re-forking it). The census (W-GLASS-EVERY-ELEMENT) is the coverage LAW over the BUILDS; the de-shadcn gate is the residue floor.

---

## 6. Open questions / decisions for the orchestrator

1. **D1 scope** — is the lighter inner shadow control-ONLY (the proposed `--glass-under-shadow-control`) or library-wide? The critique names "glass BUTTONS" specifically → control-scoped is the conservative read (cards keep their grounding depth).
2. **D2 flatter-n value** — the exact control superellipse exponent needs a π calibration (flatter than card, not a hard rectangle). Booked to W-SQUIRCLE's π.
3. **D5 default opacity shift** — moving the overlay-band default from 0.95 → 0.74 is a VISIBLE register change (more bleed-through). Is this the new library DEFAULT or an opt-in `surface="sheet"`/`clear`? The Proofread ref argues for the translucent default on popovers; the W-CLEAR-VARIANT scrim makes it AA-safe. Recommend: popover/command/tooltip → translucent default; dialog/sheet keep their current (already-tuned) registers.
4. **D3 light-rim α ceiling** — the brighter light rim must stay below the text-AA-eating threshold over a busy backdrop. Booked to the π (the readback measures the rim contributes silhouette without dropping caption AA).

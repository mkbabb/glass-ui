# AZ.W-REFLECT — dock surface reflection record

**Surface:** dock (the taxonomy · the hairline switcher rail + the DockRail beyond-dock facility · collapse/expand/morph on BOTH orientations · tap integrity · the flicker kill · the contextual layers · the coarse register · normalization · the V↔H morph showcase · the iOS-glassy selected/hover/press register — live on the SHELL + the stories, both modes, fine + coarse pointer)
**Auditor lane:** dock · **Date:** 2026-06-11 · **Branch:** tranche/AY @ `58c4265a` (AZ Batch 0–5 + R4/R5 corrective landed)
**Verdict:** **FAIL** (ONE real miss — the DockRail beyond-dock HAIRLINE is sub-perceptible, so R4-1's "rails should extend OUTSIDE the dock" reads as a detached orphan end-icon; first-time-auditor "wtf"-class, S2, routes to the triumvirate. Every other dock item — taxonomy, switcher rail, both-orientation morph, tap integrity, flicker kill, contextual layers, coarse register, normalization, V↔H showcase, the de-red iOS register, adaptive auto-darken — is LIVE-DISCHARGED in both modes at ≥2 viewports.)

---

## 1 — RECAPITULATION (every dock audit item × discharging wave × RE-VERIFIED live state)

| id | source | the user's words / mandate (condensed) | discharging wave + claim | RE-VERIFIED state (this audit) |
|---|---|---|---|---|
| R3-1 | USER R3 | "Dock layers is still broken — we should have a HAIRLINE rail therein." (switcher rail painted as a heavy dark blob column, icons illegible) | W-DOCK-RAIL: indicator-token-not-plate, rail-hairline-not-gutter, glyph-floored-16px | **HELD.** `/dock/layers` switcher rail: rail bg transparent, vertical rails carry the 1px `--dock-layer-rail-divider` hairline, ALL glyphs 16px (no 4px sliver), indicator paints `--glass-bg-floating` (no baked backdrop plate). Reads clean in both modes (`dock-layers-switcher-rail-{light,dark}.png`). `proof:dock-rail-hairline` PASS (W1/W2/W3). |
| R3-2 | USER R3 | "remove this facility and properly have a dock that's horizontal and vertical and disambiguate the names." ONE vertical + ONE horizontal, both morph/shrink/animate. | W-DOCK-TAXONOMY (arm a): ONE GlassDock, `orientation` axis, `variant` discriminant GONE | **HELD.** Vertical dock = `orientation="vertical"` ALONE; `/dock/rail` renders the canonical vertical column. `proof:dock-taxonomy` PASS (T1 dead-variant=0, T2 rail-noun allowlist clean, T3 force-pin gone, T4 single DockProps). |
| R3-3 | USER R3 | "Edge case bug with dock morphing on hover that causes flashing and flickering when at the edge — resolved totally." | W-DOCK-FLICKER: scale-guard `:not([data-morphing])` + hover hysteresis | **HELD LIVE.** Live collapse-onset replay: `maxScaleOnWideBox=1.000` (no +1.1 multiply on the wide box), `maxWidthSeen=expandedW` (no width pop, popDetected=false). `proof:dock-no-scale-pop` PASS (W1/W2/W3/W4 + C2 self-test). |
| R3-5 | USER R3 / AY B1 | "ALL docks should have persistent controls for nav, home — normalized." | W-DOCK-NORMALIZE + W-DOCK-NAV: home-left `#persistent` + `<DockSeparator>` + the NAV-vs-FEATURE census | **HELD.** Shell docks: 3 persistent slots, 10 `.dock-separator` (zero raw-class), home controls = ["glass-ui home","Home","Open category nav…"]. `proof:dock-unify` PASS (F4 census: 3/3 showcase + 2/2 shell STRICT + 3 feature-exempt recorded, 8 SFCs all accounted). |
| R3-6 | USER R3 / AY B2 | "Don't like the red hovered/click state — iOS inspired and glassy, AT THE ROOT." | W-REGISTER-IOS: de-red every interactive register; active=`--glass-bg-floating`, press=resting+7% ink, accent=foreground 14% lift | **HELD.** Tokens read live: active-bg = floating glass tier, press-bg = resting mixed 7% toward `--foreground`, selected-accent = `color-mix(in oklab, --foreground 14%, transparent)`, dock-fg-on-aurora = warm `--foreground`. `proof:register-ios` PASS incl. "no-interactive-red-anywhere: 0 rule across 63 css files reads --viz-fourier on an interactive selector". Grep confirms ZERO viz-fourier in the dock band. |
| R3-7 | USER R3 | "Dock items on light backgrounds need a dynamic facility like iOS 27 to darken dynamically." | W-ADAPTIVE-AUTO: self-engage + the sampled-luminance observer | **HELD.** The collapsible dock over the cyan gradient self-darkens: `--glass-tint-source` → warm-ink, `--glass-tint-strength` → 20% (the AA floor `--glass-tint-strength-aa: 20%`), `--glass-backdrop: light`, painted bg `srgb 0.62.. / 0.54` (a darkened translucent plate). Text on-dock legible over the bright backdrop in both overview captures. |
| R3-13 | USER R3 | "A button: the VERTICAL dock morphs — liquid-glass, amorphous metaball-teardrop — to a HORIZONTAL dock; bidirectional, deterministic." | W-MORPH-SHOWCASE: VT crossfade default (arm c) + perf-gated teardrop preview (arm a) on ONE `--dock-morph-t` | **HELD LIVE.** `/dock/morph-showcase`: "Morph to horizontal" toggles V↔H (button flips to "Morph to vertical"). LIQUID/teardrop mode drives `--dock-morph-t` inline on `.dock-morph-stage`: 0.23→0.31→0.46→0.53→…→peak 1.046 (spring overshoot), settles T=1.000. VT default = MODE=VIEW-TRANSITION. `proof:morph-showcase` PASS (M1–M5). |
| R3-14 | USER R3 | "The dock displays the layering system with different layers based on the PAGE's context." | W-DOCK-CONTEXT: route→facets map on both shell docks | **HELD LIVE.** `/forms/inputs` → facets [Text·Selection·Toggles]; `/data/table` → facets [Tables·Lists·Series] — SAME shell docks, route-driven swap, on BOTH sidebar + bottom (`sidebar-dock-context-group`/`bottom-dock-context-group`). |
| R4-1 | USER R4 | "Rails are totally broken — they should extend OUTSIDE of the dock itself. The animations are janky." (live read: a BLACK BLOB clipping at the dock's bottom edge) | W-RAIL-EXTEND / R4-RAIL: `#rail` chrome slot outside the clip, `--dock-rail-extend-length` beyond-edge, `--border-hairline` whisper, context-switch end-icon | **PARTIAL — the BLACK BLOB + JANK are GONE (the S1/S2 of R4-1 fixed); the VISIBLE rail is NOT.** End-icon = a clean 40px glass circle (bg `--glass-bg-floating`, radius 9999px, 16px glyph) positioned BEYOND the dock (slot `position:absolute`, escapes the clip). BUT the hairline (`::before`, 1px×40px, box-shadow α 0.06/0.04) is **imperceptible** over the cream substrate — a 20×36px pixel strip where the line should be is a uniform near-white field; in dark mode the end-icon floats DETACHED below the dock with no connecting line. **Miss D1.** `proof:rail-extend` PASS (R1–R6) but it asserts the TOKEN composition, not the rendered visibility. |
| R4-2 | USER R4 | "wtf are these other options even" — confusing demo-IA options (rail/layers post-taxonomy sections, contextual facets). | R4-RAIL demo-IA arm | **HELD (dock band).** The `/dock/layers` sections (Drill-in / Switcher rail / Rail-hosted) read as a coherent teaching progression; the contextual facets are legible route-keyed groups. No noise option draws a "wtf" in the dock band. (The broader shell-IA read is the shell lane's surface.) |
| R5-1 | USER R5 (slides) | `--dock-mobile-scale` is DEAD — the coarse `--dock-local-scale` lift never reaches the geometry (the AX.W55 substitution-vs-inheritance trap). | R5-TOKENS: RE-DECLARE `--dock-scale` inside the coarse `.glass-dock[data-density]` block | **HELD LIVE.** Under coarse-pointer emulation (iPhone context, `matchMedia('(pointer:coarse)')`=true): `--dock-scale: calc(1.5 * 0.78)` = 1.17 effective on the dock element (`--dock-local-scale: 0.78` THREADS through, NOT frozen at root's 1). `proof:ui-scale` PASS (dock-coarse-redeclares-scale + dock-coarse-scale-minted witnesses). |
| R5-2 | USER R5 (slides) | "the dock is 20-25% too big on mobile." | R5-TOKENS: `--dock-coarse-scale: 0.78` tighter dock-layer coarse register | **HELD.** Effective coarse scale 1.17 (0.78×1.5), NOT the bare 1.5 — the dock is a tight chrome strip, not a body control. Mobile coarse capture reads comfortable, not oversized. Collapsible dock expanded h=64px coarse. |
| R5-3 | USER R5 (slides) | The collapsed-tap pass-through + the hover-expand MORPH-RACE (a click during the FLIP lands on a swapped control at old coordinates). | R5-TAP: `useDockClickIntegrity` — identity-scoped pass-through + internal morph-settle window | **HELD.** `useDockClickIntegrity.ts` (10.7KB) wired capture-phase on the dock root. R5-TAP readback: touch_tap.clean=true, fine_race.clean=true, settled click reached "Play", mid-morph race swallowed. Dock unit suite 93/93 green (the 1 flake cleared on isolated + clean re-run). |
| B4 | AY USER-AUDIT | "Dock collapsed state must be a CIRCLE, not oval." | W-DOCK-NAV: collapsed-floor tokens, `aspect-ratio: 1`, symmetric center-out morph | **HELD (horizontal).** `proof:dock-unify` F1/F2 (floor minted + scaled + symmetric). The collapsible VERTICAL dock collapses to 59×105 — a vertical pill carrying its persistent control stack (expected for a multi-control vertical dock, not the single-control circle case). |
| B6/B7 | AY USER-AUDIT | "/dock/layers TOTALLY broken — laggy, NO rail line; vertical overflow broken." | W-DOCK-RAIL + W-DOCK-TAXONOMY (vertical overflow) | **HELD.** Rail line restored (the hairline divider), glyphs legible, no lag observed on the live route; the vertical-overflow case mounts in the "Rail-hosted layer stack" section. |
| B15 | AY USER-AUDIT | "dock animations expand FROM THE RIGHT — must morph from the CENTER." | W-DOCK-NAV: center-out symmetric morph (empty `#collapsed` collapses to zero) | **HELD.** `proof:dock-unify` F2 symmetric collapsed-summary floor; the collapse↔expand morph grows about the persistent control. No right-anchored void observed in the live expand. |

**Gate roster (re-run live this audit):**

| gate | result | note |
|---|---|---|
| `proof:dock-taxonomy` | **PASS** | T1–T4; rail-noun allowlist = {dock-layer-rail, DockRail} clean |
| `proof:register-ios` | **PASS** | all 6 clauses; no-interactive-red across 63 css files |
| `proof:rail-extend` | **PASS** | R1–R6; 2 live consumers + shell mount witness (asserts token, not pixel visibility — see D1) |
| `proof:dock-rail-hairline` | **PASS** | W1 token-not-plate · W2 hairline-not-gutter · W3 floored ≥14px |
| `proof:dock-unify` | **PASS** | F1–F5; census closure 8 SFCs all accounted |
| `proof:dock-no-scale-pop` | **PASS** | W1–W4 + C2 baseline self-test (collapse-onset pop ≤1.02, cursor-edge flips ≤2) |
| `proof:morph-showcase` | **PASS** | M1–M5 (one scalar, topology-occluded, bidirectional, useLiquidFlex ≥2 consumers, bridge clock-bound) |
| `proof:dock-perfection` | **PASS** | Q1/Q3/C1/C2/C4/C5/C7 |
| `proof:ui-scale` | **PASS** | R5-1 re-declare + `--dock-coarse-scale: 0.78` minted + 44px floor |
| dock unit suite | **93/93** | (1 parallel-load flake on a detect test cleared on isolated + clean re-run) |

---

## 2 — RE-VERIFY LIVE (fresh captures, ≥2 viewports × both modes + π readbacks)

All captured live on `:5199` this audit (Playwright, deterministic single-context; theme via `localStorage['glass-ui-dark']` + reload; coarse via an isolated `isMobile+hasTouch` context). Stored beside this record.

**Capture list (literal filenames):**
- `dock-overview-desktop-light.png` / `dock-overview-desktop-dark.png` (1440×900 — the GlassDock walkthrough: collapsible-over-gradient, media transport, select/dropdown, shell sidebar + bottom nav)
- `dock-layers-desktop-light.png` / `dock-layers-desktop-dark.png` (the drill-in / switcher-rail / rail-hosted sections)
- `dock-layers-switcher-rail-light.png` / `dock-layers-switcher-rail-dark.png` (element zoom — the hairline rail column + active indicator + content)
- `dock-rail-vertical-desktop-light.png` / `dock-rail-vertical-desktop-dark.png` (the canonical vertical dock)
- `dock-rail-vertical-expanded-light.png` (the collapsible vertical dock hover-expanded — block-axis morph)
- `dock-morph-showcase-light.png` / `dock-morph-showcase-dark.png` (the V↔H morph showcase)
- `dock-morph-showcase-midframe-light.png` (post-click VT state V→H)
- `dock-morph-teardrop-after-light.png` / `dock-morph-teardrop-midframe-light.png` (LIQUID/teardrop mode engaged, T=1.000 settle)
- `dock-coarse-mobile-light.png` (390×844 coarse-pointer — the R5-1/R5-2 register)
- `dock-shell-rail-bottom-light.png` (the sidebar dock bottom + the DockRail end-icon)
- `dock-rail-hairline-zoom-light.png` / `dock-rail-hairline-zoom-dark.png` (the beyond-dock hairline + end-icon zoom — the D1 evidence)
- `dock-rail-hairline-strip-light.png` (the 20×36px pixel strip where the hairline should be — a uniform near-white field, the D1 imperceptibility proof)
- `dock-shell-bottom-nav-light.png` (an in-page nav-dock zoom)

**π readbacks (measured live this audit):**
- **Switcher rail** (`/dock/layers`): 5 `.dock-layer-rail` — ALL bg transparent; vertical rails carry `border-right: 1px solid color(srgb 0.721.. / 0.4)` (`--dock-layer-rail-divider`); ALL glyphs 16px; indicator bg `color(srgb 0.982 / 0.8)` = `--glass-bg-floating`, backdrop-filter `none` (no baked plate). [R3-1 HELD]
- **De-red register** (root tokens): active-bg = `--glass-bg-floating` (0.80); press-bg = resting (0.65) mixed 7% toward `--foreground`; selected-accent = `color-mix(in oklab, --foreground 14%, transparent)`; dock-fg-on-aurora = `--foreground` warm ink. `--viz-fourier` exists as a token (oklch 0.579 0.201 30.4) but ZERO references on any interactive dock selector. [R3-6 HELD]
- **Adaptive darken** (collapsible dock over cyan gradient): tint-source = warm-ink, tint-strength = 20% (AA floor), backdrop bucket = `light`, painted bg `srgb 0.624/0.617/0.611 / 0.536`. [R3-7 HELD]
- **Coarse register** (iPhone context): `(pointer:coarse)` = true; `--dock-scale` on the dock el = `calc(1.5 * 0.78)` (1.17 effective); `--dock-local-scale` = 0.78; `--dock-coarse-scale` = 0.78. [R5-1/R5-2 HELD]
- **Vertical-dock morph** (`/dock/rail` collapsible): collapsed 59×105 → hover-expanded 59×314 = **+209px block-axis (height) morph** (matches W-DOCK-TAXONOMY HG2's +234px light). [R3-2 / both-orientation morph HELD]
- **Flicker kill** (live collapse onset, 142-rAF replay): `maxScaleOnWideBox = 1.000`, `maxWidthSeen = expandedW` (no pop), popDetected = false. [R3-3 HELD]
- **Morph-showcase** (`/dock/morph-showcase`, LIQUID mode): `--dock-morph-t` inline on `.dock-morph-stage` swept 0.23→…→peak 1.046 (overshoot) → settle 1.000; button flips "Morph to horizontal" ⇄ "Morph to vertical". [R3-13 HELD]
- **Contextual layers**: `/forms` facets [Text·Selection·Toggles] ≠ `/data` facets [Tables·Lists·Series], on both shell docks, route-driven. [R3-14 HELD]
- **Nav-pattern**: 3 persistent slots, 10 `.dock-separator` (zero raw-class), home controls present. [R3-5 HELD]
- **DockRail end-icon** (the D1 miss): 40×40 glass circle (bg `--glass-bg-floating`, radius 9999px, glyph 16px) — clean, no black blob; hairline `::before` 1px×40px, box-shadow α 0.06 (light catch-light) / 0.04 (under-shadow) → **sub-perceptible over cream** (pixel strip uniform near-white).
- **Console**: dock routes 0 errors (2 benign aurora deferred-init warnings from the shell background, not dock).

---

## 3 — THE PERFECTION QUESTION (first-time-auditor walk)

Walking the dock band cold (shell + the four stories, both modes, fine + coarse):

- **The four stories read FINISHED.** `/dock/overview` is a clean teaching progression (collapsible-over-gradient, media transport, triggers) with the collapsible dock LEGIBLE over a bright cyan gradient (the adaptive darken visibly working). `/dock/layers` switcher rail is a crisp hairline column with legible 16px glyphs and a glass active indicator — a complete reversal of R3-1's "heavy dark blob, icons illegible." `/dock/rail` renders the canonical vertical dock, collapsing/expanding its height on hover. `/dock/morph-showcase` flows V↔H on the one scalar, both VT and LIQUID modes working. **This is a PASS half.**
- **The de-red iOS register is the headline win.** No warm-red anywhere on a hover/active/selected/pressed state, on the shell OR the stories, in either mode; the selected register reads as a glass luminance-lift exactly as the user asked. The ℱ wordmark + the data-viz strokes correctly survive as static brand ink.
- **ONE thing draws an immediate "wtf":** the DockRail "rail that extends beyond the dock." R4-1's verbatim mandate was "rails should extend OUTSIDE of the dock itself." The STRUCTURAL fix landed cleanly — the black-blob artifact is gone, the slot escapes the clip, the end-icon is a clean glass circle positioned beyond the dock, the jank is gone. But the HAIRLINE that should make this read as "an extended rail" is painted at α 0.04–0.06 over a cream substrate and is **imperceptible**: a first-time auditor sees a detached chevron button floating in the empty space below the dock, with NO visible line connecting it to the dock (the dark-mode zoom makes the detachment stark). The "beyond-dock RAIL" affordance the user explicitly drew does not visually exist; only a free-floating end-icon does. The contract demands a whisper (`--border-hairline`, no hard `1px solid`), and the gate asserts that token composition — but the whisper is below the perceptual floor on the cream surface, so the user's "I want to SEE the rail extend" intent is not met. **Miss D1.**

Per the protocol bar (a "wtf" is a FAIL even if every ledger row is green), the surface FAILs on this ONE miss.

---

## 4 — MISSES (severity-graded, evidence-anchored → the triumvirate)

| id | severity | what | evidence |
|---|---|---|---|
| D1 | **S2** | The DockRail beyond-dock HAIRLINE is sub-perceptible (`::before` box-shadow α 0.06 catch-light / 0.04 under-shadow, 1px×40px) over the cream substrate, so R4-1's "rails should extend OUTSIDE of the dock itself" reads as a DETACHED orphan end-icon floating below the dock with no visible connecting line. The structural fix (no black blob, slot escapes clip, clean glass end-icon, no jank) DID land; the *visible rail* did not. The triumvirate should research the SOTA "extended hairline rail" register (a perceptible-but-restrained line — e.g. lift the `--dock-rail-extend-length` hairline to a `color-mix(in oklab, var(--border) N%, transparent)` rule at a visibility floor that still reads as a hairline, or anchor the end-icon to the dock with a visible connector), keeping the `proof:rail-extend` R1 "no hard 1px solid" spirit while crossing the perceptual floor. Pixel evidence: `dock-rail-hairline-strip-light.png` (uniform near-white where the line should be), `dock-rail-hairline-zoom-{light,dark}.png` (the detached end-icon). |

**Scope-fence note:** AUDIT-ONLY — no source/demo/script/git edits were made. D1 routes to the triumvirate (research → ad-hoc wave spec → redress → re-reflect). All protected contracts (`expanded` ref exposed, `useDockClickIntegrity`, the slides-consumer seams) hold and were not touched. The fix for D1 must preserve `proof:rail-extend` R1's no-hard-rule spirit and the `proof:dock-rail-hairline` in-dock register (this miss is the BEYOND-dock extend hairline, a distinct element from the in-dock switcher divider, which is correctly visible at α 0.4).

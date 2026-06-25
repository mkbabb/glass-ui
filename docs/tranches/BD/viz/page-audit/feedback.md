# Page-audit — FEEDBACK category (8 pages)

Branch `prototype/liquid-dock`. Live-confirmed on `:5199` (fresh server, isolated of the demo-shell nav-loop). PLANNING audit — no src edits.

Pages: `alert` · `toast` · `toaster` · `notification` · `progress` · `skeleton` · `confirm-dialog` · `completion-seal`.

## 1. Chassis usage — CONFIRMED (DRY holds)

Every page is `<StoryPage>`-rooted; zero page hand-rolls the page header/hero. The structural fixes (header-scale, the `--story-header-rule`, sticky-condense, page-background) land ONCE in the chassis and propagate. The category-specific arm is the duplicate in-card header + the glass-not-staged miss.

## 2. SYSTEMIC defects — DO they apply? (per page)

### (a) W-HEADER-SCALE — APPLIES (live-measured)
Feedback is a NON-hero band (no `hero:true`), so the chrome `<h1>` paints at the depth-keyed `heroScale`:
- `alert` (D2, alphabetically-first → `text-display-5`): **h1 = 109.7px** — viewport-filling (screenshot-confirmed, the title dominates the fold; the first alert specimen is pushed below).
- `toast`/`notification`/`progress`/`skeleton`/`confirm-dialog`/`completion-seal`/`toaster` (D3 → `text-display-4`): **h1 = 86.1px**.
Source: `manifest.ts:454 assignDepths()` `heroScale = depth==="D2" ? "5" : "4"`. Library √φ ladder untouched — DEMO rung over-scaled. → **W-HEADER-SCALE** (chassis-once).

### (b) W-PAGE-CHASSIS — the `--story-header-rule` + the DUPLICATE HAND-ROLLED HEADER
- **`--story-header-rule` ABSENT.** Live: `header` `border-bottom-width = 0px`. No header→body seam on any feedback page. → folds **W-PAGE-CHASSIS**.
- **The DUPLICATE in-card `<header>` (the double-header root) — 6 of 8 pages.** A SECONDARY hand-rolled `<header>` IconChip cluster duplicates the chassis descriptor byte-for-byte (the ruby `--section-color-8` IconChip + `section-label--tinted` eyebrow + a `text-small text-muted-foreground` blurb that repeats the chassis blurb). Live: `header .section-label--tinted` present on `alert`; screenshot shows BOTH "FEEDBACK·ALERT / Alert / role=alert..." (chrome) AND "FEEDBACK·ALERTS / Status surfaces — the alert tones..." (in-card) → the descriptor rendered TWICE.
  - **HAS the duplicate header** (`<header class="flex items-center gap-4 pl-5" :style="{borderLeft 3px...}">` + `<IconChip :section="8" bloom reveal>`):
    - `alert.vue:24-42`
    - `toast.vue:103-121`
    - `notification.vue:74-92`
    - `progress.vue:65-83`
    - `skeleton.vue:19-37`
    - `confirm-dialog.vue:46-64`
  - **CLEAN reference (no duplicate header)** — the fold target models:
    - `toaster.vue` (pure `<StorySection label= blurb=>` + `<ShowcaseFrame>`)
    - `completion-seal.vue` (no header; straight into the grid + a `<StorySection heading=>`)
  → **W-PAGE-CHASSIS** folds the per-page header into the chassis (route the `--section-color-8` ruby identity through a chassis prop), removing 6 hand-rolls + killing the double-header in ONE edit.

### (c) W-PAGE-BACKGROUND / the glass-not-staged miss — APPLIES, and this is the CATEGORY's CORE defect
Feedback default background is `paper` (`manifest.ts:190`) — a STATIC wash. Live on `alert`: `bgKind = story-bg-paper`, **`canvasCount = 0`**, card tier = `glass-resting` (OPAQUE). So the colored-glass tone surfaces sit inside an OPAQUE resting card over a flat paper wash — **nothing live behind to refract.** See §3.

### (d) W-PAPER-MORPHISM — SUB-PERCEPTUAL (applies)
Live: `--glass-grain-opacity = 0.025` (invisible) and the opaque `glass-resting` card occludes the page paper wash. The `paper` bg is declared but reads as flat near-white. → **W-PAPER-MORPHISM** (lift grain + tint the light paper-wash; chassis).

### (e) W-STICKY-TITLE-CONDENSE — APPLIES (no backing bar)
The `.story-hero-shrink` register is on the chassis header but has no backing/scrim bar, so on scroll the floating title occludes the body. Generic chassis defect. → **W-STICKY-TITLE-CONDENSE**.

## 3. CATEGORY-SPECIFIC — the feedback-tone colored-glass register

**The COMPONENT wiring is CORRECT; the STAGING is the defect.** The component CVAs compose `.feedback-tone` properly:
- `Toast.vue:84-88` — non-`default` variant adds `feedback-tone feedback-tone-<name>` + `[&_svg]:text-(--tone)` over the `surfaceClass(surface,'floating')` base. Correct.
- `alert/index.ts:32-38` — each toned variant composes `feedback-tone feedback-tone-<name> [--feedback-tone-rung:var(--glass-bg-wash)]`. Correct.
- `Notification.vue:10` — `glass-floating feedback-tone` + `toneClasses[type]`. Correct.

Live on `/feedback/alert` the four tones resolve as REAL tinted glass:
```
destructive bg=oklab(0.893 0.042 0.027 / 0.836)  border=...(/0.4)  backdrop=blur(1px) saturate(1.05)
warning     bg=oklab(0.935 0.013 0.039 / 0.836)
info        bg=oklab(0.904 -0.006 -0.034 / 0.836)
success     bg=oklab(0.924 -0.035 0.026 / 0.836)
```
α = 0.836 (< the 0.92 translucency floor ✓), distinct per-tone hue, tone-keyed rim, real `backdrop-filter`. The W-FEEDBACK-TONE register PAINTS as colored glass — **NOT a flat opaque slab at the component level.**

**BUT — the user's read is FLAT OPAQUE TONE SLABS, and they're right at the GESTALT level (screenshot-confirmed):** because `canvasCount=0` and the card is opaque `glass-resting` over a static near-white paper wash, there is **nothing live behind the α=0.836 plate to refract**. The translucency transmits a flat cream backdrop → the destructive alert reads as a flat pink pastel rectangle, the warning a flat amber rectangle (screenshot). The morphism is structurally translucent but PERCEPTUALLY a slab — the glass refract has no live field to bend. This is exactly the addendum's [SYSTEMIC] "glass demos DON'T stage over a live field" finding, localized to feedback. → **W-PAGE-BACKGROUND** must stage the toast/notification/alert specimens over a live field (`tier="field"` glass-over-live-field) so the colored-glass morphism reads.

Note: `notification.vue:116` ALREADY wraps its tones-table in `<ShowcaseFrame tier="field">` (the BG-2 fix attempt) — but `tier="field"` only drops the plate to transparent; with NO live page background behind feedback, "field" still floats over static paper. The fix is the live page field (W-PAGE-BACKGROUND), not just the frame tier.

## 4. Progress sectioned (the phase-bus single-fill) — RENDERS CORRECTLY
Live on `/feedback/progress`:
- `.progress-sectioned-flow` count = **1** (ONE single-fill element, not N per-cell rectangles ✓ — W-PROGRESS-GRADIENT holds).
- `.progress-sectioned-seam` count = **0** (the retired `mix-blend-mode:screen` seam band gone ✓).
- `flowBgImg = linear-gradient(90deg, oklch(0.579 0.201 30.4) 0%, ...30.13%, oklch(0.484 0.163 265.5) 36.53%, ...)` — the hard stop-PAIRS with short transition zones (30.13→36.53%) ✓ — segments hold their hue across their core, blend at boundaries.
- BorderProgress ring present, mask-composited (`bp.maskComposite` resolves) — the W-BORDER-PROGRESS conic-in-border-band renders.
No per-page progress bug found. (One minor nit: `progress.vue:120` uses an arbitrary `[&>[data-state=loading]]:bg-viz-fourier` override for the "animated" demo — fine, demo-local; not a register fork.)

## 5. Per-page bugs (category-specific)

- **`confirm-dialog.vue:69, 114, 157` — hand-rolled opaque demo plates.** The three specimen wells are `bg-card/60 border-border/60 rounded-2xl` raw triplets (NOT `<ShowcaseFrame>`/`tier="field"`), so the ConfirmDialog demo stages over an opaque card-on-card — the dialog's own glass morphism (and the destructive register) reads flat. Should route through `<ShowcaseFrame>` like skeleton/notification do.
- **`completion-seal.vue:22` — empty leading node.** A bare `<div class="grid gap-8">` with a leading comment-only line — no header/eyebrow at all (the ONLY feedback page with zero descriptor). It reads as orphaned content (no page identity). The chassis header still paints the chrome title, but the page lacks the in-body affordance the siblings carry — inconsistent. (Acceptable once W-PAGE-CHASSIS folds the header, but flag the asymmetry.)
- **`toast.vue:166-168` / `notification.vue:140` — viewport anchored top-right via inline `fixed top-0 right-0`** while the copy says "bottom-right on desktop". The `ToastViewport` class hardcodes `top-0 right-0 ... sm:bottom-0 sm:top-auto` — correct at sm+, but on the demo page the viewport is a FIXED overlay that can collide with the dock. Minor; not a tone bug.
- **`skeleton.vue` — correct.** Uses `<ShowcaseFrame>` for the card/list specimens (the FD-FS X-2 fix landed); only the duplicate header applies. Note skeleton default is intentionally opaque (`bg-muted`, the W54 allowlist) — NOT a glass-staging miss.
- **`alert.vue` indentation drift** (`:44-112` the `<StorySection>` blocks are over-indented under a dangling close) — cosmetic only.

## 6. Demo-shell nav-loop — CONFIRMED
Direct nav to `/feedback/*` intermittently bounces to a random `/data/*` route (`/data/timeline`, `/data/metric-cell` observed) on a slow first-paint — the W-DEMO-NAV-FIX guard race. A fresh `:5199` server (no persisted state) stuck reliably; the user's pre-existing `:5173` instance hijacked every direct nav. Confirms the addendum's [NEW WAVE] W-DEMO-NAV-FIX (URL must win on direct nav).

---

## VERDICT (5 lines)
1. CHASSIS CONFIRMED on all 8; W-HEADER-SCALE (alert h1=109.7px / rest 86.1px), `--story-header-rule` absent (border-bottom 0px), and the DUPLICATE hand-rolled `<header>` IconChip cluster on 6/8 (alert/toast/notification/progress/skeleton/confirm-dialog; toaster + completion-seal are the clean models) ALL apply.
2. The feedback-tone register is WIRED CORRECTLY at the component level — live α=0.836 translucent, distinct per-tone hue, real backdrop-filter — NOT opaque slabs in the CVA.
3. BUT the user's "flat opaque tone slabs" read is RIGHT at the gestalt: feedback bg = static `paper`, `canvasCount=0`, opaque `glass-resting` card → nothing live behind the tone plate to refract → the colored glass reads flat (screenshot-confirmed). → W-PAGE-BACKGROUND must stage toast/notification/alert over a live field.
4. Progress sectioned RENDERS the single-fill gradient correctly (`.progress-sectioned-flow` count=1, seam=0, hard-stop-pair gradient); BorderProgress conic-in-border renders. No progress bug.
5. Per-page: confirm-dialog uses raw `bg-card/60` plates not ShowcaseFrame (glass reads flat); completion-seal has zero in-body descriptor (asymmetry); grain sub-perceptual (0.025); nav-loop reproduced.

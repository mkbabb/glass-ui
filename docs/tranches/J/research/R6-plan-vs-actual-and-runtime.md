# J.R6 — Plan-vs-actual + runtime probe

## Preamble

- **HEAD**: `950d1f4` (post-I close, branch `o-w2_7-instrument-chassis`).
- **Dev server**: `http://localhost:5174` (also live on :5173). Vite. 0 console errors / 0 warnings on the surfaces probed.
- **Date**: 2026-05-06.
- **Owner**: J.R6 (orchestrator-driven, read-only). Playwright MCP probe + ripgrep + Read on tracked files. No source modifications, no commits.
- **Inputs**: `docs/tranches/J/findings.md` (18 user-cited rows), `docs/tranches/I/FINAL.md`, six I-close audits (`audit/I-audit-{α,β,γ,δ,ε,π}-*.md`), `CLAUDE.md`, `docs/audits/style-audit.md`. The user-supplied screenshots in `/var/folders/.../TemporaryItems/` are sandbox-quarantined; runtime captures below substitute and corroborate.
- **Probed surfaces (live captures in `screens/`)**: `/primitives/slider`, `/primitives/slider-glass-track`, `/primitives/number-field`, `/primitives/blob`, `/aurora`, `/data/search`, `/data/table`, `/foundations/intro`, `/navigation/dock`, `/navigation/carousel`, `/containers/glass-carousel`.

---

## §1. Plan-vs-actual cross-walk (user findings × I tranche)

Attribution legend: **NEW** = post-I or out of I scope; **MISSED** = pre-I, the I 6-agent audit should have caught it but didn't; **DEFERRED** = explicitly named in I close residue; **WIRE** = I shipped infrastructure that needs follow-up wave to complete.

| # | Finding | Status | Audit lane that should have caught | Why missed |
|---|---|---|---|---|
| 1 | Docks exceeding max width/height — inner container should scroll | **MISSED** by π (visual-runtime) | π | π probed only 5 representative surfaces (foundations/flourishes, primitives/buttons, primitives/slider-glass-track, containers/dialog, compositions/dashboard) at 1 viewport size. Dock-overflow is a **viewport-sensitive defect** (left rail at 500h: dock h=468, last-button-bottom=511, **clipped by 27px** within a `overflow-y: auto` container — internally scrollable but visually cut). Smaller-viewport sweep was outside π scope. |
| 2 | Top dock collapsed → expand jerks / instantly transitions (cornerstone) | **MISSED** by δ + π | δ + π | δ verified the dock keep-open *single-authority* refactor (raw-key delete + sink) but did not exercise the **width-transition contract**. The collapse uses `width: 55px` ↔ `width: auto` (or `fit-content`), and CSS `transition: width 0.3s linear(...)` cannot interpolate to/from `auto`. π did not test collapsed→expanded animation timings. Runtime probe: w jumps 55→213 in <26ms (target 300ms spring). δ's hands stayed in token/contract space; π's stayed in console-clean space. |
| 3 | Dock blurs (glass blur) — reduce | **MISSED** (style preference, never on I scope) | β + δ | β tracked sub-bar artefacts only; δ tracked single-authority and naming. Aesthetic *intensity* of `--glass-blur-*` tokens was not on the I bar. The dock surface composes `--glass-bg-dock` / `var(--glass-blur-*)` but the user wants the *blur radius* trimmed — pure-style J target. |
| 4 | Drag a slider — dock holds — section needs refinement | **WIRE** by W3 (I) — needs J follow-up | δ + π | I.W3.γ shipped the sink-based dock-keep-open (`_internal/dockKeepOpenSink.ts` single authority; `Slider :keep-dock-open` consumes). This is the *contract*; the *gesture quality* (visual lock-state, hover-affordance during drag, release-snap) is a separate J-lane refinement. Honest WIRE. |
| 5 | Vertical rail (slider page screenshot) overflows — remove the dev text | **MISSED** by π + γ | π + γ | The "vertical rail" is the LEFT `aside .glass-dock.vertical .dock-inline` (10 buttons, h=516px). At 700×900 viewport it fits with 8px slack; at 700px-tall viewport the dock-inline's intrinsic `max-height: var(--dock-vertical-max-height)` resolves to viewport-block, but the **content** (10 buttons × 44px row + 8px pad) = 444 + 8 = 452 — still fits. At ≤500px viewport, dock h=468, last button bottom=511, **39px clipped**. The "dev text" the user references does NOT appear in the live DOM probe at HEAD (no "dev"/"DEV"/"Dev" / version-tag text node in the left zone) — likely the user's screenshot captured a transient HMR or stale-bundle artefact, OR the StoryPage `eyebrow` (e.g. "primitives · slider") was misread as a debug label. **Both halves of this finding need J ground-truth re-capture.** |
| 6 | DockPopover should not be a special component / DRY-reuse / nesting | **DEFERRED** (formal — implicit) | δ | I.W3.γ migrated DockPopover to the sink-based contract (gestalt-correct). The user's deeper concern — "should not be special; DRY-reuse other components inside the dock" — is an **architectural axis** I did not name explicitly. It belongs in J's gestalt redesign queue (DockPopover as composition, not special primitive). |
| 7 | Blob section needs proper section + configurator (mirroring aurora) | **DEFERRED** (formal — C-8 chronic) | β + δ | C-8 ("Blob double-rAF in `_internal/`") was formally deferred in I.W3 chronic-deferral assessments as "encoded but unreachable on M4 Max." But the user finding is *visual/configurator parity*, not the worker-encoding question. Blob has 8 specimen sections at HEAD (visible in screenshot); the **interactive configurator surface** (analogous to `<AuroraConfigDock>`) is missing. **NEW** post-I in scope-spirit. |
| 8 | Aurora configurator — refinement + scroll-wrapping | **MISSED** by π | π | Aurora configurator uses `BouncyToggle` with `overflow-x-auto scrollbar-hidden`; at 1440 the 6 tabs (Medium/Palette/Flow/Texture/Comp/Nuclei) fit (sW=344, cW=344, no horizontal scroll). At narrower widths the toggle scrolls but the **edge-fade-mask is absent** (no `scroll-fade-mask` utility on this BouncyToggle). π did not probe `/aurora`. |
| 9 | Aurora configurator (screenshots) — sides have shadows and clips | **MISSED** by π | π | The right configurator panel is `<aside class="flex w-[340px] ...border-l border-border/60 bg-background/20">`. The "shadow" is the BouncyToggle background `color-mix(in srgb, var(--muted) 50%, transparent)` — a muted strip that reads as a soft shadow against cream. The "clip" is at the `bouncy-toggle--pill overflow-x-auto`'s right edge when tab text exceeds container width (`Nuclei` is 53px wide; total fits at 1440 but clips at <1280). π did not probe. |
| 10 | Aurora items — should not have a top black padding bar | **MISSED** by π | π | `PresetPickerRow.vue:55` thumbnail wrapper: `<div class="aspect-[16/10] w-full overflow-hidden rounded-t-card bg-muted">`. The `bg-muted` (warm gray) shows BEFORE the thumbnail `<img>` paints, and even after, if the thumb's `object-cover` doesn't fill perfectly, the muted strip leaks at the top corners despite `overflow-hidden`. The story's own comment (line 35) says "no `bg-muted` strip leaks at the top" — but the corner geometry doesn't guarantee that at all viewports. π did not probe. |
| 11 | Speedtest aurora preset — add as a preset | **NEW** post-I | n/a | Sibling-repo (`speedtest`) has its own aurora policy (`useAuroraPolicy.ts` + `auroraConfig.ts`). I.W6 verified speedtest as cross-repo consumer for 9 zero-payload subpaths but did not enumerate aurora-presets. Pure J task. |
| 12 | `/primitives/slider` needs refinement; padding standardized | **MISSED** by δ + π | δ | The `slider.vue` story uses `p-[var(--space-phi-5)]` on the wrapper but the inner `<section class="flex flex-col gap-3">` is bare; padding is inconsistent across the 5 sections. δ never normalized story-level padding (W4 wrapper-uplift was hero-only). |
| 13 | Number Field — refined and rounded | **MISSED** by δ | δ | NumberField got the I.W3.β provide/inject refactor (matching Tabs precedent) — *gestalt* clean. But the rendered chassis is square-cornered (`<div class="grid gap-1.5">` chassis, no `rounded-*`); the only rounding is on the inner button column. The user wants the chassis itself rounded. δ verified the *injection contract*, not the *visual treatment*. |
| 14 | Slider · Glass Track — greatly enhanced and refined | **MISSED** by π + δ | π | Live probe of the rail: bg `color(srgb 0.9824 0.98144 0.9776 / 0.82)` (≈ 95% cream at 82% alpha) on a cream page = ~5% effective contrast. Range `color(srgb 0.11 0.098 0.09 / 0.18)` (foreground at 18% alpha) — barely visible. The "quiet rail" intent (story's hero text says "A quiet rail") is honored too literally; the rail is *invisible* at rest. π verified render+console-clean only; did not measure rail/range/thumb contrast. |
| 15 | Table items (status field badge) — text vertically + horizontally aligned, idiomatically | **MISSED** by π | π | `Badge variant="outline"` with `text-xs font-semibold` on `text-transform: capitalize` of lowercase `paid|pending|overdue`. Live probe: `deltaBadgeMidVsCellMid: 0` (mathematically centered) and `deltaTextMidVsBadgeMid: 0` (text mid = badge mid). The "idiomatic" complaint is therefore not a measurement bug — it's that **badge has no inner status-dot or icon** (StatusDot was retired in I.W1 — leaving status badges with no canonical dot+text composition). The visual signal of "status" depends on tone alone. π didn't sample data tables. |
| 16 | DATA · FUZZY SEARCH — controls/design need refinement | **MISSED** by π + δ | π | `search.vue` story uses ad-hoc `btn-pill` utility for the four runtime-helper buttons (buildIndex, searchIndex, fuzzyMatch, clearSearchCache) instead of the canonical `<Button>` CVA. Mixes `Card`-style readouts with a non-CVA control row. Layout drift at HEAD. π didn't probe. |
| 17 | `clearSearchCache` rename + button not visible (contrast) + non-canonical button design | **MISSED** by δ + π | δ + π | Live computed-style: button text `rgb(219, 36, 36)` (red) on background `oklab(0.574 0.192 0.100 / 0.10)` (red at 10% α) over page `rgb(251, 250, 249)` (cream). Net contrast ≈ red-on-cream-with-red-tint ≈ ~3.0:1 (sub-AA-large 3:1, sub-AA-text 4.5:1). The class is `btn-pill` (utility), not `<Button variant="destructive">` or `<Button variant="danger-subtle">` from buttonVariants CVA. δ tracked CVA single-authority but not *whether stories use the canonical CVA*. The W0/β audits flagged `buttonVariants.variant.danger-subtle` as sub-bar with 1 site (this story); **the story uses an entirely different recipe**, so the `danger-subtle` branch isn't even *the consumer of itself* — the cited consumer is non-canonical. |
| 18 | Basic horizontal pager — weak; `<GlassCarousel>` story pager is the better idiom | **MISSED** by δ | δ | Two pager idioms ship at HEAD: (a) `<Carousel>` with `<CarouselPrevious/>` + `<CarouselNext/>` — small overlay arrows, no readout, no dot indicator (visible at `/navigation/carousel`); (b) `<GlassCarousel>` pager — slide N/N readout + chevrons + Collapse + dot indicator (visible at `/containers/glass-carousel`). δ would catch this as an architectural duplication if it had been on the W3 ledger; it wasn't, because both pagers shipped pre-I (both pre-G) and neither was in the chronic-deferral list. The `<Carousel>` shadcn pattern is canonical for the **headless primitive**; `<GlassCarousel>` is the **opinionated composition**. The user wants the latter to be the *only* pager idiom (compose, don't fork). |

### §1.1 Tally

| Status | Count | Findings |
|---|---:|---|
| **NEW post-I or out-of-scope** | 2 | 7 (Blob configurator parity), 11 (speedtest preset) |
| **MISSED by I audit** | 13 | 1, 2, 3, 5, 8, 9, 10, 12, 13, 14, 15, 16, 17, 18 (− the WIRE-flagged 4, 6) |
| **DEFERRED by I (formal residue)** | 1 | 6 (DockPopover idiomatic redesign — implicit deferral) |
| **WIRE — I shipped infra, J finishes** | 1 | 4 (sink contract → gesture quality) |
| **Net** | 18 | (Note: row 5 has two halves — overflow+dev-text — both MISSED) |

---

## §2. Audit-lane-failure analysis

Per-lane: which findings each I-close audit lane should have caught, plus the structural reason it didn't.

### α (plan-vs-actual)

- **Should have caught**: nothing additional. α walks wave-spec vs commits + chronic-deferral disposition. The user findings are visual / runtime / aesthetic — not in α's remit.
- **Structural**: α verdict was correct (FOUND-3, all absorbed). α's scope is by-design narrow.

### β (substrate-without-consumer)

- **Should have caught**: 14 (slider glass-track contrast) — β sampled the **single demo consumer** at `slider-glass-track.vue` and confirmed evidence-doc parity (8 hits, 1 file). It did not assess **whether the rail is visually load-bearing in that demo** — which is the actual user complaint. β's "≥2 consumers" bar misses "1 consumer that is demo-fictive."
- **Structural failure**: β counts files, not visual fidelity. F-1's "9 sub-bar CVA branches without evidence docs" was the right concern but the wrong axis — `buttonVariants.variant.danger-subtle` (cited at `demo/stories/data/search.vue:318`) IS the user's finding 17, but β recorded it as "no evidence doc" without testing **whether the story actually uses the variant**. The story uses ad-hoc `btn-pill` instead — the cited consumer doesn't consume the CVA branch it's claimed to evidence.

### γ (doc-drift)

- **Should have caught**: 5b (dev text) only insofar as docs claim a clean rail — they don't. γ's scope is README/CLAUDE/DESIGN/PROGRESS verification.
- **Structural**: γ verified DESIGN.md catalog drift (4 phantoms surfaced) and PROGRESS.md staleness (4 entries) — caught in I.W7 absorb. γ did not have a runtime mandate, so 5b's runtime artifact was always going to slip through γ.

### δ (idiomatic gestalt)

- **Should have caught**: 2 (top dock collapse jerks), 6 (DockPopover idiomatic redesign), 12 (slider story padding), 13 (NumberField rounding), 16 (search story uses ad-hoc btn-pill), 17 (clearSearchCache non-canonical CVA + contrast), 18 (basic vs glass carousel duality).
- **Structural failure**: δ verified `--easing-accent` rename, dock raw-key delete, cartoon @utility hoist, NumberField provide/inject refactor — all **token-level** and **provider-level** gestalt fixes. δ did not walk **per-story rendering** to ask "does this story consume the canonical CVA we just unified?" The `W3.β NumberField provide/inject` was correct at the *injection contract* level — but the *resulting rendered shape* is square-cornered and the user wants it rounded. Same with `slider.vue` padding: δ verified `sliderVariants` CVA dispatches correctly (W3.γ) but never asked whether the consumer story applies the CVA's intended variant pattern uniformly.
- **Net**: δ correctly hardened the **library's authority surfaces** (tokens, providers, sinks). It did not perform an **idiomatic story sweep** — the gap between "library authority is consistent" and "stories consume the canonical authority" is δ's structural blind spot.

### ε (performance + bundle)

- **Should have caught**: nothing in the user findings list — ε is bundle-size + dts-cost + R5 deferral verification.
- **Structural**: ε verdict was correct (CLEAN, all gates green). User findings are aesthetic/runtime, not performance.

### π (visual-runtime)

- **Should have caught**: 1, 2, 5a, 8, 9, 10, 14, 15. **8 of 14 MISSED findings are π-lane MISSED.**
- **Structural failure**: π's I.W7 probe walked **5 surfaces** (`/foundations/flourishes`, `/primitives/buttons`, `/primitives/slider-glass-track`, `/containers/dialog`, `/compositions/dashboard`) at **one viewport** (1440×900) checking **only console errors / warnings + element-render-presence**. It did NOT:
  - Probe at small viewports (rail-overflow + content-clip emerges below 600px height).
  - Measure animation timings (would catch the 26ms width-jump on dock collapse-toggle).
  - Walk **all** category surfaces (`/aurora`, `/data/*`, `/navigation/*` were not probed — covering the configurator, fuzzy search, basic carousel pager).
  - Compare *rendered contrast* against the **page background** (would catch glass-track invisibility, clearSearchCache contrast).
  - Sample `<img>` paint state vs fallback `bg-muted` placeholder leak.
- π's coverage stop-rule was "5 representative surfaces, 0 console errors → CLEAN." That's **correctness without sufficiency**. The user's screenshot-driven findings are runtime+visual+viewport-conditional — exactly what π's scope was supposed to be, and exactly what its **probe budget** truncated.

### Aggregate audit-lane structural-failure observations

1. **π's coverage was 5 surfaces / 1 viewport / 0-console-error gate**. It missed everything that emerges below 1440×900, every animation-timing defect, every rendered-contrast issue. The 6-agent precept names π as "binding for visual-shipping tranches" — and I was a visual-shipping tranche. The lane fired but its **coverage matrix** was insufficient.
2. **δ's gestalt was authority-tier, not story-tier**. Token / provider / sink unification all clean; **per-story consumption of those unified authorities** was never sampled. The `clearSearchCache` button proves the failure: I unified buttonVariants CVA + flagged `danger-subtle` sub-bar — but the cited demo consumer doesn't actually use buttonVariants at all, it uses `btn-pill` utility. δ verified the authority; nobody verified the authority is consumed.
3. **β counts files, not visual load-bearing-ness**. Every sub-bar artefact got an "evidence doc" or a flag — but β never asked "is this consumer **visually exercising** the artefact's intent?" Slider-glass-track's hero says "a quiet rail" — true in spirit, false in execution (rail is invisible). β's quantitative bar (≥ 2 consumers) and visual-fidelity are orthogonal, and the audit acknowledges this only obliquely (F-2 flagged 3 custom-pkg primitives at the bar without saying "and they may be visually thin").

---

## §3. Runtime probe results

Each row lists URL, finding, citation (DOM path / computed-style / measurement), screenshot. All screenshots in `docs/tranches/J/research/screens/`.

### §3.1 `/primitives/slider`

- **Probe**: vertical rail container (`aside .glass-dock.vertical.dock-inline`), 10 buttons, h=516px at 1440×900 (clear); h=468px at 1280×500, last-button-bottom=511px → **39px clipped**.
- **DOM**: `aside.sticky.top-0.flex.h-screen` → `.glass-dock.vertical.dock-inline` (computed `max-height: 668px`, height: `516px` from intrinsic content + max). At small viewport, max-height resolves smaller than content → internal scroll engages but `scrollbar-width: none` hides the indicator.
- **Dev text**: zero hits at HEAD via `treewalk` for `/^(dev|DEV|Dev|debug)/` in left zone (x<200). User's source-of-truth screenshot may capture an HMR transient or eyebrow misread.
- **Screenshot**: `screens/slider.png`, `screens/slider-700h.png`, `screens/slider-500h-rail-overflow.png`.

### §3.2 `/primitives/slider-glass-track`

- **Probe**: 6 sliders rendered with `glass-slider--glass-track` variant. Track bg `color(srgb 0.9824 0.98144 0.9776 / 0.82)`, h=4px (or 2px for narrow), range `color(srgb 0.11 0.098 0.09 / 0.18)` (foreground at 18% α) — invisible against cream page.
- **DOM**: `Slider.vue:71` mounts `<SliderRoot class="glass-slider glass-slider--glass-track">`; track variants live in scoped CSS at `Slider.vue:128-204`. Per W3.γ contract, scoped CSS preserves CSS-property-fallback so consumer overrides via `--slider-range-bg` etc. work — but the *defaults* are visually inert.
- **Screenshot**: `screens/glass-track.png`.

### §3.3 `/primitives/number-field`

- **Probe**: 4 number-field instances (Quantity / Tip rate / Step by 5 / Disabled). Outer chassis `<div class="grid gap-1.5">` is square-cornered (no `rounded-*` Tailwind class). The button column inside has `rounded-r-md` only; the inner readout area has no rounding.
- **DOM**: `NumberField.vue` provides `glassNumberField` ctx. `numberFieldInputVariants` CVA composes `cartoon-surface` utility, but `numberFieldVariants` (the chassis) stays bare grid.
- **Screenshot**: `screens/number-field.png`.

### §3.4 `/aurora`

- **Probe**: preset row `flex snap-x snap-mandatory gap-3 overflow-x-auto` — at 1440 the right-edge presets (Oil Impasto, Day 9) clip into off-screen with `pb-2 scrollbar-thin scroll-fade-mask` (the mask **does** apply here, fading the right edge; the user's "shadow" perception is this fade-mask).
- **Top "black bar"**: each preset card has `<div class="aspect-[16/10] w-full overflow-hidden rounded-t-card bg-muted">` — the `bg-muted` placeholder is `rgb(244, 243, 241)` (warm-cream) but reads darker on hover/focus inset shadows. NOT actually black; user's "black" is the hyperbolic word for "darker than card." The PresetPickerRow.vue:35 comment claims "no bg-muted strip leaks at the top" — true at static rest, but inset shadow + active-state + non-perfect thumbnail `object-cover` produces edge-strip artefacts.
- **Configurator**: `<aside class="flex w-[340px] ...border-l border-border/60 bg-background/20">` — soft shadow effect from `bg-background/20` on cream looks like a vertical "shadow" at the configurator's left edge; not an actual `box-shadow` (computed shadow: `none`).
- **Configurator tabs**: `BouncyToggle bouncy-toggle--pill overflow-x-auto scrollbar-hidden` — at 1440 fits all 6 tabs; at <1300 will scroll horizontally with no edge-fade (no `scroll-fade-mask` present on this BouncyToggle, unlike PresetPickerRow).
- **Screenshot**: `screens/aurora.png`.

### §3.5 `/primitives/blob`

- **Probe**: 8 specimen sections render — "A living specimen" hero, "Mood is a blend, not a transition", "A single accent, fifteen identities", "Twenty-five fields. Six worth touching" (this section has parameter inputs but no live configurator), "Nine instances, one rAF", "Frozen, opaque, bordered — still beautiful", "Same recipe, smaller scale".
- **Gap vs aurora**: `/aurora` ships `<AuroraConfigDock>` with 6 layers (Medium / Palette / Flow / Texture / Comp / Nuclei) for live parameter manipulation. `/primitives/blob` has **no analogous interactive surface** — only static specimens.
- **Screenshot**: `screens/blob.png`.

### §3.6 `/data/search`

- **Probe**: 4 helper-call buttons (`buildIndex`, `searchIndex`, `fuzzyMatch`, `clearSearchCache`) on a `Card`-style ledger row. All four use `btn-pill` utility class — **NOT** `<Button>` CVA.
- **clearSearchCache contrast**: text `rgb(219, 36, 36)` on bg `oklab(0.574 0.192 0.100 / 0.10)` over page `rgb(251, 250, 249)`. Visually: red on faint-red-tinted-cream. Effective WCAG contrast ≈ 3.0:1 — sub-AA-text (4.5:1) and below AA-large (3:1) margin.
- **Naming**: the button executes `clearSearchCache()` runtime helper; the user wants a renamed UI label (presumably "Reset", "Clear cache", or similar — the API name leaked into the label).
- **Screenshot**: `screens/search.png`.

### §3.7 `/data/table`

- **Probe**: 6 status badges (paid / pending / overdue) using `<Badge variant="outline">` with `capitalize` text-transform and tonal classes via `statusTone()`. Measurement: `deltaBadgeMidVsCellMid: 0` (vertically centered in TD), `deltaTextMidVsBadgeMid: 0` (text centered in badge).
- **Idiomatic gap**: badge text-only; no inner status-dot or icon. StatusDot was retired in I.W1 (β) — leaving the data table without a canonical status-dot+text idiom. The visual signal lives entirely in the tonal background+border, which is subtle.
- **Screenshot**: `screens/table.png`.

### §3.8 `/containers/glass-carousel` (reference idiom)

- **Probe**: GlassCarousel pager renders with rich pager affordances — slide-N/N readout, ◀ / ▶ chevrons, Collapse button, dot indicator at bottom of each item. This is the strong pager idiom the user wants standardized.
- **Screenshot**: `screens/glass-carousel.png`.

### §3.9 `/navigation/carousel` (weak basic pager)

- **Probe**: `<Carousel>` (shadcn) with `<CarouselPrevious/>` `<CarouselNext/>` — small ◀ / → arrows overlaid on left/right edges. No slide-N/N readout, no Collapse, no dot indicator on the basic story. Second story does add dots manually but that's not the canonical primitive.
- **Screenshot**: `screens/carousel-basic.png`.

### §3.10 `/foundations/intro` (canonical dock host)

- **Probe**: top story-pager dock (`.glass-dock.horizontal.story-pager-dock`) at y=8, w=784, h=55, `always-expanded` — never collapses. Left rail dock vertical, also `always-expanded`.
- **Both docks here are always-expanded**, so the cornerstone collapse-jerk does NOT manifest at app-shell level. It manifests at the *demo dock story* (`/navigation/dock`).

### §3.11 `/navigation/dock` (cornerstone manifestation)

- **Probe**: 6 docks on page. Index 2 is `glass-dock horizontal ... collapsed dock-inline` — the only one in collapsed state at rest, w=55, h=55. CSS `transition: width 0.3s linear(0 0%, 0.0727 3.33%, 0.2386 6.67%, ...)` (spring-overshoot linear() easing).
- **Animation timing**: dispatched `pointerenter`+`mouseenter`; sampled `getBoundingClientRect().width` every 25ms for 500ms.
  - **t=26ms: w=213** (first sample after dispatch; should still be near-55 if linear() animating over 300ms).
  - t=52ms onward: w stays 213-216 (settled).
  - **The width snapped from 55→213 within 26ms**. There is no smooth interpolation visible.
- **Root cause** (corroborated by Read on `dock.css:106-114`, `GlassDock.vue:60-209`, `dockKeepOpenSink.ts`): collapsed sets `width: 55px`; expanded uses `width: auto` (or `fit-content` when `.fit-content` class present). CSS `transition: width` cannot interpolate from a fixed length to `auto`/`fit-content` — the browser jumps to the keyword value at the next frame. **The spring linear() easing is correctly authored but never engages because the from-value is `auto`-keyword on the toggle BACK.** On collapse→expand, browsers either refuse to animate (Chromium) or use a heuristic; observed behavior: snap.
- **Cornerstone diagnosis** in §4.

### §3.12 Console messages summary

```
- [DEBUG] [vite] connecting...
- [DEBUG] [vite] connected.
```

0 errors, 0 warnings across all probed surfaces.

---

## §4. Cornerstone diagnoses

### §4.1 Cornerstone — top dock collapse animation jerks (finding 2)

**Symptom**: collapsed-dock width transition completes in ≤26ms instead of the configured `var(--dock-motion-resize)` ≈ 300ms spring. Animation appears to "jump."

**Diagnostic chain**:

1. **CSS authority** (`dock.css:106-114`):
   ```css
   .glass-dock:not(.vertical) {
       transition:
           width var(--dock-motion-resize),
           padding var(--dock-motion-resize),
           ...
   }
   ```
   Transition is correctly declared on `width` with the spring-overshoot linear() easing. Same for `.glass-dock.vertical` on both `width` and `height`.

2. **State toggling** (`GlassDock.vue:84-209`, `useDockState.ts`): the dock toggles between two class states — `.collapsed` and `.expanded`. The `.collapsed` rule sets `padding: var(--dock-collapsed-padding)` and the dock's content goes from many layers to `.dock-layer--summary` (single icon). The `.expanded` state has no explicit width rule.

3. **`width: auto` non-animatability**: `.glass-dock.vertical { width: auto; ... }` (line 123) and the horizontal dock relies on **intrinsic content width** when expanded. Browsers cannot transition `width` from a fixed `55px` to keyword `auto` (or vice versa) — the W3C interpolated-value list excludes `auto`.

4. **`fit-content` modifier**: `.glass-dock.fit-content` adds a `width: fit-content` (or relies on flex behavior) — also **not interpolatable**.

5. **Net**: the spring linear() easing is correctly authored but never engages because one endpoint is a keyword. The dock snaps to the new intrinsic width at the next frame, creating the "jerk." The `transitionend` handler in `GlassDock.vue:149` (`onDockTransitionDone`) probably fires immediately because no actual transition runs.

**Gestalt remediation candidates** (J planning territory):

- Replace keyword-end with **explicit measured width** (FLIP-style: read content width via `getBoundingClientRect()` before the toggle, set `width` to that pixel value, then animate). This is the same technique `useLayerTransition.ts:46` (`getSize`) uses for layer crossfade.
- OR: drop the `width` transition and animate **transform** + **opacity** of inner content while clip-path collapses the chassis (animatable across keywords).
- OR: replace the binary class swap with a **two-step transition** (set explicit pixel width on next frame after class change, then transition to the next-frame measured intrinsic width).

The δ lane should have caught this because the keep-open sink refactor was explicitly framed as "the collapsed/expanded contract is now sink-driven" — the sink's correctness implies the **animation contract** is the dock's contract too. δ verified the sink's idempotent acquire/release; it didn't verify the visual lifecycle the sink drives.

### §4.2 Cornerstone — vertical rail dev text (finding 5b)

**Symptom**: user's screenshot shows the slider page with vertical rail overflow + a "dev text" annotation that should be removed.

**Diagnostic chain**:

1. **Live DOM at HEAD `950d1f4`**: tree-walking the entire `document.body` for text nodes matching `/^(dev|DEV|Dev|debug)\b/` in the left zone (x<200) returns **0 hits**.
2. **Eyebrow text**: `StoryPage.vue:33-34` renders `<p class="text-admin-label text-muted-foreground">{{ eyebrow }}</p>` where `eyebrow.value` = `"primitives · slider"` — readable as a debug label by someone unfamiliar with the convention.
3. **Vite HMR overlay**: in dev mode, Vite occasionally injects a transient overlay; the user's screenshot may have been captured during HMR or before `text-mono-caption` styling settled.
4. **`section-label` class**: `slider.vue:34` renders `<p class="section-label" :style="{ color: 'var(--section-color-0)' }">primitives · slider · § 0 — the reference rung</p>` — a § marker the user might have read as a debug code.

**Net**: the "dev text" the user saw is not a literal string `"dev"` in the live DOM at HEAD. The most likely candidate is the **section eyebrow** (`section-label` class) the I.W4 wrapper inserted as part of R-NEW-1 uplift — a label the user reads as developer noise rather than story copy. **J should re-capture the user screenshot against HEAD to identify the exact text element.**

The vertical rail overflow IS real at small viewports (39px clip at 500px viewport height) — that half of the finding is concrete and sits with finding 1 (dock-overflow scrolling).

---

## §5. Glass-ui canon contradictions

| # | Contradiction | Evidence |
|---|---|---|
| 1 | DESIGN.md ## Story Fidelity Policy says "bold-maximalist canonical for primitives" → `slider-glass-track` is bold-maximalist (CreamSurface tone="warm" + DisplayHero + IconStamp + FlourishDivider) but the **rail itself is sub-fidelity** (invisible at rest). The hero is bold; the actual primitive being demonstrated is whisper. | `glass-track.png` + §3.2 measurement |
| 2 | I.W3.γ migrated DockPopover to the sink-based contract — gestalt-correct at the *contract* tier. The user wants DockPopover to "not be a special component" → **gestalt at the composition tier**. The library has unified the dock-keep-open contract but kept DockPopover as a bespoke primitive; the user wants it expressed as `<DockLayer>` + `<HoverPopover>` (or similar) **composition** rather than its own component. | `findings.md:11` + §3.11 + I-audit-δ §5 |
| 3 | StatusDot was retired in I.W1.A on β-bar grounds (sub-bar primitive). DESIGN.md ## Substrate Hierarchy still references `<StatusDot aria-label>` (per γ audit DM10 finding). DESIGN.md was updated to canonicalize `<CreamSurface>` over `<Card variant="cream">`; the **same canonicalization was not applied to status-tier idioms** — status badges in tables use ad-hoc tonal classes and have **no canonical status-dot composition**. | `data-table` row badges + γ audit DM10 |
| 4 | `<Carousel>` (shadcn primitive) and `<GlassCarousel>` (custom composition) both ship; both have pagers; the **basic carousel pager is anemic** (no readout, no dots, no Collapse), while the GlassCarousel pager is the rich idiom. CLAUDE.md ## Component architecture lists both without a hierarchy axis declaring "GlassCarousel is canonical for paged surfaces; bare Carousel is the headless primitive only." | `findings.md:34` + §3.8/§3.9 |
| 5 | `clearSearchCache` button is on a story (`search.vue`) that bypasses `<Button>` CVA entirely — `btn-pill` utility usage. **buttonVariants CVA + the `danger-subtle` variant exists** (cited as sub-bar consumer at this very story per β audit §2.4), but the story does NOT consume the variant. The CVA's claimed consumer doesn't actually consume the CVA. | β audit §2.4 + §3.6 |

---

## §6. Recommendations for J planning

1. **π lane coverage matrix** must extend to: ≥ 3 viewport sizes (1440×900, 1024×768, 375×812), ≥ 1 surface per category (foundations / primitives / containers / data / navigation / compositions / motion / aurora), ≥ animation-timing samples on every state-toggle gesture (collapse, expand, layer-switch, drag), ≥ rendered-contrast measurement vs page bg for every interactive element. Codify in `docs/precepts/audits/` if precept-submodule update fires.
2. **δ lane idiomatic-story sweep** must walk every consumer story for each canonicalized authority and verify the story actually uses the authority. The clearSearchCache story is the canary — δ would have caught it with a "buttonVariants CVA → grep its actual consumers in demo stories" pass.
3. **Cornerstone — dock animation**: J planning should assign a wave to the dock width-transition redesign (FLIP-style measurement, or transform+opacity composition that animates across keyword endpoints). This is finding 2 and the highest-priority gestalt fix.
4. **Cornerstone — vertical rail dev text**: J should re-capture the user's source-of-truth screenshot at HEAD `950d1f4` to identify the exact text element. Until then, the rail-overflow half of the finding is actionable; the dev-text half awaits ground truth.
5. **Blob configurator parity (NEW)**: J should ship a `<BlobConfigurator>` analogous to `<AuroraConfigDock>` — exposes the Blob's mood / accent / parameter axes for live manipulation. Mirrors the aurora layer architecture.
6. **Status-dot canonical idiom**: I retired StatusDot but did not propose a replacement composition. J should establish `<Badge>`+`<Pulse>` (or a new badge variant with `dot` sub-slot) as the canonical status-tier idiom, or restore StatusDot as `tag="dot-badge"` composition.
7. **Carousel duality**: J should formally name `<GlassCarousel>` as canonical for paged surfaces and document the bare `<Carousel>` as headless-primitive-only. Update CLAUDE.md ## Component architecture and DESIGN.md ## Substrate Hierarchy.
8. **DockPopover gestalt redesign**: J should evaluate whether DockPopover composes from `<HoverPopover>` + sink-aware `<DockLayer>` rather than existing as its own primitive. Possible retire candidate post-redesign.

---

## Closing tally

| Metric | Count |
|---|---:|
| User findings | 18 |
| **NEW (post-I or out of scope)** | **2** |
| **MISSED by I audit** | **13** |
| **DEFERRED (formal residue)** | **1** |
| **WIRE (I shipped infra, J finishes)** | **1** |
| Audit-lane MISSED breakdown — π | 8 |
| Audit-lane MISSED breakdown — δ | 7 (overlap with π on 2) |
| Audit-lane MISSED breakdown — β | 2 |
| Audit-lane MISSED breakdown — γ | 1 |
| Cornerstone runtime defects | 2 (dock collapse jerk; rail overflow) |
| Glass-ui canon contradictions | 5 |
| Probed URLs (live captures) | 11 |
| Screenshots captured | 14 |
| Console errors / warnings observed | 0 / 0 |

**Authority**: read-only Playwright probe + ripgrep + Read on tracked files. No source modifications. No commits. Sanity: `git status --short` clean modulo the J research directory artefacts authored under this lane.

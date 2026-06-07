# Frontend-design + library-convergence audit (6-agent)

## SYNTHESIS

All anchors confirmed. The `gooColor = ref("var(--primary)")` and `blobColors[0] = "var(--primary)"` at goo-blob.vue:19/21 are exactly as brief 2 states. The `showClose` prop ships, the `.input-pill` invalid selector keys off `:user-invalid`/`.user-invalid-fallback` (not `[aria-invalid]`), the `gold-audacious` `text-white` token, the empty `--dock-active-*` defaults, and the prng/useRAFLoop leaves all confirmed.

I have everything needed. Here is the synthesis.

---

# AW/H Frontend-Design + Convergence Synthesis — glass-ui ↔ slides ↔ AI-Nutrition-Label

Six lanes audited live (glass-ui `:5179`, slides `:5173`, XRAY `:5180/:5190`), sources read by path. Load-bearing claims re-verified against HEAD before writing. Two tranches seed out: **AW** (glass-ui library waves) and **H** (slides consumer waves). The throughline: glass-ui's primitives are largely well-built and cohesive; the gaps are (a) glass/affordance that doesn't read on flat cream, (b) one shading/color-fidelity lag at the low-saturation end, (c) a dock that's structurally mature but visually under-resolved as a Liquid-Glass object, and (d) a same-org sibling app (XRAY) that participates in none of the shared language.

---

## 1. COMPONENT-QUALITY LEDGER

Verdicts consolidated across lanes. "AW refinement" = the wave that closes it.

### Core primitives (Brief 1)

| Primitive | Verdict | Defect / gap | AW refinement |
|---|---|---|---|
| **Slider** | Polished (best in set) | Standard track shows no fill left of thumb — same gray as remainder (Volume 42%, Balance 65). Only the spectrum variant tints. No state feedback. | AW.W-affordance: extend the spectrum variant's proven track-fill mechanism to the standard track (`--primary`/darker tone to thumb). Don't fork. |
| **Badge** | Polished | — | — |
| **Dialog / Sheet / Tooltip / Popover** | Polished | All consume the shared `glass-floating` tier — strong cohesion, correct hierarchy, scrim feedback, close affordance. | — (scrim-tint token is an optional cohesion polish, AW.W-overlay-tint) |
| **Switch** | Polished | Binding correct (`v-model`→`modelValue`, reka-ui v2). | — |
| **Input / Select** | Good, minor | At-rest border resolves to `oklab(… / 0.08)` (8%α) — edge nearly vanishes on cream. Error state proves the system *can* show a present border. | AW.W-affordance: lift resting input/select border alpha (token) for affordance without going loud. |
| **Card** | Good, perception trap | Toggles WORK (verified: shadow switch flips `data-state`, removes `shadow-card`). Tier alpha steps (0.30→0.95) imperceptible on flat cream with nothing high-frequency behind. | AW.W-backdrop: give card/glass-panel demos a high-frequency backdrop (existing Aurora/PaperBackdrop). Re-verify tier steps after. |
| **Tabs** | Good, minor | pill variant's active highlight floats center inside an over-wide gray track — off-center rhythm, large empty flanks. | AW.W-tabs (small): size pill tablist track to content or left-align. |
| **Button** | Mixed — one real defect | **`gold-audacious` sets `text-white` (index.ts:17) over an 8%-gold-tint-over-glass rest substrate (utilities.css:861) = near-invisible cream-on-cream CTA text in light mode** (verified at index.ts:17). `primary-audacious` is `bg-primary` (fine when primary is dark) but the specular backplate lightens it — verify. | AW.W-button-token: replace `text-white` on `gold-audacious` with a foreground/contrast token surviving the 8% rest tint; audit `primary-audacious`. Add a light-mode contrast check to the button story. |
| **Glass Panel** | **Broken** (the flagged "sucks") | **`GlassPanel.vue:62-63` — the `svg-filter` branch (default detected tier on Chromium) returns `glass-panel glass-panel--svg` for ALL variants, and the scoped CSS (`:104-108`) paints only `background: var(--glass-bg-wash)` — the lightest rung — for every variant** (verified). Five rungs render as five identical flat cream rectangles. Premise of the showcase defeated in the default tier. Secondary: bg tokens are double-nested `light-dark(light-dark(...))`. | AW.W-glasspanel: make `--svg` (and `--fallback`) honor `variant` via `--glass-bg-{variant}` instead of hardcoding wash; + the high-frequency backdrop. |

### Substrate tier (Brief 2)

Bimodal. **Painterly half is stunning, keep verbatim:** Aurora watercolor/pastel/oil (authentic bleed/grain/striations), GlyphFace (phase-tinted radial backplates + catch-light cap — strongest glyph primitive), Configurator studio shell, DiscoGlyph.

| Substrate | Verdict | Defect | AW refinement |
|---|---|---|---|
| **GooBlob** | **Broken (runtime throw)** + flat shading | **`defaultBlobColorResolver`→`cssToOklch` (color/index.ts:79-80) feeds the string straight to value.js `parseCSSColor`, which parses literal color syntax and throws on `var(--primary)`.** The story passes `var(--primary)` at goo-blob.vue:19 and :21 (verified). Per-frame throw → missing blob bodies, two orphaned red satellites floating in dead space. Secondary (F2): flat gel fill + foreground-heavy `drop-shadow` (`GooBlob.vue:127-130`, mixes 80% foreground) reads muddy on cream. | AW.W-blob-resolver (resolve `var()` against computed style OR document concrete-colors + fix story) + AW.W-blob-shading (body highlight + perceptual OKLCh-derived contact shadow, reusing `procedural-color.glsl.ts` — no new color seam). |
| **Aurora "smooth" default (Sky)** | Anemic | Renders near-white pale-blue vs its own rich thumbnail. Cause: linear-sRGB `mix()` palette interp (`composition.glsl.ts:16`) desaturates low-sat midpoints to grey. | Fold into existing AW.W1 (in-shader OKLCh interp); flag smooth as the highest-visibility win (most-seen default). |
| **PaperBackdrop** | Grain invisible | Clean vs Aged indistinguishable at default `--glass-grain-opacity`. The substrate's whole payload (perceptible grain) doesn't read. | AW.W-paper-grain: re-baseline default grain opacity / aged frequency; prove with pixel-variance assertion (aged > clean > floor). Token-only, library identity evolves. |

### Dock family (Brief 3)

Structurally mature (axis-aware FLIP, density tokens, container-query labels, typed-DI context, WCAG floors) but **visually under-resolved as a Liquid-Glass object**. The polish lives on the *buttons* (AV.W15 specular track) but never reached the *shell* or unified the *family*.

| Finding | Verdict | AW refinement |
|---|---|---|
| **F2 shell has no specular identity** — flat translucent plate, no lensing/edge-refraction/inner-shadow on the shell itself | Under-glassy | AW.W-dock-shell: `.glass-dock` gets its own `--dock-specular` top-edge highlight + `--dock-inner-shadow` bottom inner-shadow, distinct from the per-button track. Dark-arm via existing `--shadow-color` flip. |
| **F3 four control families, four hover idioms** (icon-button card-tint+specular+scale; tab-button flat fill no specular no scale; select `--muted` no scale; dropdown `--muted` + scale) | Biggest cohesion gap | AW.W-dock-hover: collapse to one `:where()` comma-group hover material; per-control deltas only where semantically required. |
| **F4 default active state invisible** — `--dock-active-{bg,color,scale,border,shadow}` default empty (verified dock-controls.css:121-125), so an `aria-pressed` Play button looks identical to idle | Mute by default | AW.W-dock-active: non-empty `--dock-active-*` defaults; media-transport story as canary; consumers still override. |
| **F1 collapsed pill is a featureless lozenge** — no resting grip/handle/chevron, reads as a stray border | Weak affordance | AW.W-dock-collapsed: default grip/handle hint in the `#collapsed` slot path. |
| **F5/F7 seams are CSS hairlines** — rail divider 30%-border; `.dock-separator` hardcodes `margin:0 0.375rem` independent of `--dock-layer-gap` (0.25→0.875rem) | Seam not groove | AW.W-dock-seams: borrow the InstrumentChassis engraved-groove `::before` (already at dock.css:352-360) for the rail; re-derive separator margin from `--dock-layer-gap`. |
| F6 audacious tier reads as a fork; density rhythm otherwise sound | Acceptable | No wave (documented). |

---

## 2. LIBRARY-OPTIMUM CONVERGENCE PLAN (what AW adds for H to consume)

The convergence story is **mostly subtractive**. Slides already consumes glass-ui where it should (gate = `Dialog+Input+Button`; gear = `DropdownMenu+DarkModeToggle+DockIconButton`; dock = `GlassDock+DockIconButton`), and the source repeatedly books deferred `/deck` moves correctly. AW's main job is to make two shipped/near-shipped library capabilities reachable so slides can delete its workarounds — not to extract a deck engine.

### AW ADDS (only the genuinely ≥2-consumer items)

| Library change | ≥2-consumer justification | No-duplication note |
|---|---|---|
| **`.input-pill` invalid-ring widens to include `[aria-invalid="true"]`** alongside `:user-invalid`/`.user-invalid-fallback` (glass.css:328 — verified the selector currently keys only off native constraint-validation) | Any form driving validity imperatively (custom key-match, not native `required`/`pattern`) — the canonical app-driven-validation case, NOT slides-specific | One-selector add to the existing ring; does not fork a new state |
| **`--dock-active-*` non-empty defaults** (AW.W-dock-active above) | Every dock with an `aria-pressed`/`is-active` control — media transport, view toggles, the slides dock | Reuses the existing active-paint cohort; just gives it defaults |
| **Scrim-tint token on `DialogOverlay`/`ModalOverlay`** (OPTIONAL/polish) | Gate on a 2nd interested themed-dialog consumer; slides wants a warm cream-ink scrim vs the cold mid-grey letterbox | No new overlay; one token on the shared `ModalOverlay` from `_shared` |

### AW DEFERS (1 consumer today — would manufacture overfit)

- **DeckProgress → NOT a component.** The de-docked bar (`DeckView.vue:238-260`) is clean and generic, but glass-ui already ships `Progress/ProgressDefault/ProgressGradient/ProgressSectioned`. A new `DeckProgress` forks the fill. Its only value-add is the viewport-pinned chrome recipe (fixed/full-width/safe-area/z-layer/leading-glow). **If** a 2nd pinned-progress consumer appears → ship a `.glass-progress-rail` CSS recipe composing the existing `<Progress>` fill, not a second component. Today: defer.
- **`showClose` is ALREADY SHIPPED** (verified DialogContent.vue:62 + :134 `v-if="props.showClose"`). No AW change — slides consumes it today (see H.W-gate-showclose).

### STAYS SLIDES-SPECIFIC (correctly deferred, per source's own bookings)

- **The `/deck` engine** (`useDeck`/`useDeckNav`/`DeckView`/`DeckSlide`/`DeckPager`) — exactly 1 consumer; source books the future move (`useDeck.ts:5-8`, `DeckPager.vue:15`, `DeckSlide.vue:10`). Promoting now = the overfit the invariant forbids.
- **Constellation** — 489-line Canvas2D viz, 2 mount sites in 1 deck (til-briefing cover + closing), deeply editorial (red anomaly node, dashed callout, audit narrative). Fails ≥2-consumer. Memory records "constellation stays local" — confirmed. AW-adjacent only: it should **consume** glass-ui's existing leaves (`prng.ts`, `useRAFLoop`, `useIntersectionPause` — all verified present) instead of re-rolling `mulberry32`/RAF-park/MutationObserver. That's slides-side cleanup (H), not a glass-ui extraction.
- **XRAY portal window** (`SlideXray.vue` faux-browser frame) — 1 mount, editorial chrome. `--portal-*` tokens are deck identity. Keep local; document the `<DataWindow>` extract-trigger inline (fires only on a 2nd live-data-window slide).

### The ≥2-consumer rule, applied

Every AW add clears the bar (the input-invalid ring and dock-active defaults are canonical multi-consumer affordances; the overlay-tint is explicitly gated on a 2nd consumer). Every deferred item has exactly 1 consumer and a documented promotion trigger. **No duplication is created; some is removed.**

---

## 3. DESIGN-LANGUAGE COHESION PLAN

### The shared language (glass-ui = source, slides = model consumer)

- **Color** — warm cream field (`--neutral-0: hsl(48 12% 98%)`, hue-48 warm-paper L\* ladder), muted-black ink (`--foreground: hsl(24 10% 10%)`), NCSU-red hero accent layered by the consumer (`#cc0000` + `light-dark()` ink lift).
- **Type** — Fraunces display + Plus Jakarta Sans brand + Fira Code mono, golden-ratio √φ scale.
- **Material** — 5-rung glass ladder, cartoon offset-stamp shadow as signature, `0.625rem` base radius, iOS-26 Liquid Glass rim/specular.
- **Consumption pattern (the model)** — slides `index.css` imports `@mkbabb/glass-ui/styles`, `@source`s the dist, layers its identity via `@theme`/`@utility`, and **renamed** its cartoon shadow to `--shadow-deck-stamp-*` so it won't intercept glass-ui's chain. Textbook presets-in-consumers / token-first discipline.

### The XRAY divergence (Briefs 5 + 6)

The **AI-Nutrition-Label (XRAY)** app — same org (Friday Institute / NCSU TIL) — participates in **none** of it. It's internally coherent but fully orthogonal: FDA-nutrition-label brutalism, cold-blue `#60a5fa` accent (zero NCSU red), Helvetica/IBM-Plex (no serif), hard 2px square borders (no glass), Tailwind v3 (no `@theme` path), no `@mkbabb/*` dependency. Concrete debt:

- Grade green/orange/red defined **5+ times** with no single source (`tokens.css --fail/--warn`; `GradeChip` Tailwind classes; `ScoreGauge` inline hex; `ModelAggregate`/`Results` `.score-good`; `Statistics` SERIES_PALETTE) — three different "good greens" for the same meaning. glass-ui already ships `--success/--warning/--destructive/--info` + foregrounds.
- A dead `.glass-panel` orphan (`main.css:13-16`) from a retired glassmorphic layer, contradicting `tokens.css:8` ("Glassmorphism intentionally omitted").
- Three chip idioms (`GradeChip` pill / `dev-chip` square mono / `LeanBadge` blue-red) where glass-ui ships `Badge`+`badgeVariants`/`MetricBadge`/`MetricPill`/`StatusDot`.

### The cohesion goal (NOT "glassify the label")

The FDA-nutrition-label brutalism is XRAY's **strength and should survive** — Brief 6 confirms the live app is the editorial-broadsheet idiom (heavy-grotesk display, mono labels, the load-bearing `bar-thick` 6-8px solid-ink rule, tabular numerics), and that `GradeChip`/`ScoreGauge`/`.glass-panel` are **stale glassmorphic-layer orphans referencing removed Tailwind tokens** — do NOT model anything on them. The print-label is canonical.

The goal is to make XRAY a **glass-ui consumer the way slides is**: pull the shared color spine, type, and the ONE grade-semantic token set; keep the label/card/gauge as XRAY-local recipes that READ those shared tokens. And critically — the audits **disagree on direction** for the slides nutrition slide, and Brief 6 (which read both the source live AND `SlideNutrition.vue`) is the correct one to follow:

> The slides' existing `SlideNutrition.vue` **already absorbs the idiom correctly** in the deck's own dialect (Fraunces head, Newsreader rows, `--ncsu-red` trip-line). **Do NOT reskin it toward Helvetica/blue** — that would import the source's surface and break deck cohesion. The work on the slides side is additive craft (the missing heavy-bar) + de-duplication (consume StatusDot/MetricBadge), not a reskin.

So cohesion is **two-directional**: XRAY adopts glass-ui's tokens/type/accent (restyle toward the shared language); slides keeps its dialect and just absorbs the heavy-bar signature + de-dupes onto glass-ui primitives.

### `<NutritionLabel>` / FactsPanel — the one real ≥2-consumer headline candidate

The FDA-facts label is the genuinely new reusable idiom XRAY contributes. glass-ui already ships the family (`MetricCell`/`MetricStack`/`MetricBadge`). **Gate strictly:** extract a token-driven `FactsPanel`/`MetricLabel` into glass-ui ONLY if slides' "model facts" card AND XRAY both consume it. If slides won't, it stays XRAY-local — do not add substrate without a 2nd consumer. The `ScoreGauge` conic dial overlaps `Progress`/`useAnimatedNumber` — fold rather than keep bespoke.

---

## 4. AW + H WAVE SEEDS

### AW (glass-ui library)

- **AW.W1 — Aurora OKLCh interp (EXISTING; re-prioritized).** Fold the smooth-medium (Sky default) path to the front — it's the most-seen surface and currently desaturates to grey via linear-sRGB `mix()`. Already gated (`proof:aurora-oklch-interp`). [Brief 2 F3/H3]
- **AW.W2 — GlassPanel tier-honoring + demo backdrop.** `glass-panel--svg`/`--fallback` honor `variant` via `--glass-bg-{variant}` (stop hardcoding wash); clean the double-nested `light-dark()` bg tokens; give glass-panel + card stories a high-frequency backdrop (existing Aurora/PaperBackdrop). ≥2 consumers: glass-panel + card stories. [Brief 1 F1/F5]
- **AW.W3 — Button audacious text-token fix.** Replace `text-white` on `gold-audacious` with a foreground/contrast token surviving the 8% rest tint; audit `primary-audacious`; add a light-mode contrast check to the button story. Pure token/CVA. [Brief 1 F2]
- **AW.W4 — At-rest affordance pass (tokenized).** Lift resting input/select border alpha; add a filled-track recipe to the standard Slider (extend the spectrum variant's proven mechanism). Token + CSS only. [Brief 1 F3/F4]
- **AW.W5 — Blob color resolver resolves `var()`.** `defaultBlobColorResolver` resolves CSS custom-property refs against computed style before `parseCSSColor`, OR document concrete-colors-only + fix the story (goo-blob.vue:19,21). Gate: resolver unit test over `var(--primary)` + story-mount no-error assertion. Bug-fix, ships now. [Brief 2 F1]
- **AW.W6 — Blob dimensional shading on the OKLCh core.** Replace flat fill + foreground-heavy drop-shadow with a body highlight + perceptual OKLCh-derived contact shadow, reusing `procedural-color.glsl.ts` (no new color seam, no value.js coupling). Gate: snapshot-bless + `proof:blob-color-equivalence`. [Brief 2 F2]
- **AW.W7 — PaperBackdrop grain register.** Re-baseline default `--glass-grain-opacity`/aged frequency so clean vs aged is perceptible; pixel-variance assertion (aged > clean > floor). Token-only, library identity. [Brief 2 F4]
- **AW.W8 — Dock shell Liquid-Glass identity.** `.glass-dock` gets `--dock-specular` top-edge highlight + `--dock-inner-shadow`; dark-arm via existing `--shadow-color` flip. [Brief 3 F2]
- **AW.W9 — Unify dock control-family hover grammar.** Collapse the four hover idioms in `dock-controls.css` to one `:where()` comma-group + per-control deltas only where semantically required. [Brief 3 F3]
- **AW.W10 — Default dock active-state paint.** Non-empty `--dock-active-*` defaults (verified empty at dock-controls.css:121-125); media-transport story as canary; overridable. **Doubles as the convergence affordance slides' dock consumes.** [Brief 3 F4]
- **AW.W11 — Collapsed-pill affordance + dock seam vocabulary.** Default grip/handle hint in the `#collapsed` slot path (F1); borrow the InstrumentChassis engraved-groove `::before` (dock.css:352-360) for the rail divider; re-derive `.dock-separator` margin from `--dock-layer-gap` (F5/F7). [Brief 3 F1/F5/F7]
- **AW.W12 — `.input-pill` invalid ring widens to `[aria-invalid="true"]`** (glass.css:328 — verified). ≥2-consumer: any app-driven-validation form. **Lets slides delete its `:deep()` ring.** [Brief 4 F2]
- **AW.W13 (smaller) — Tabs pill track sizing + demo hygiene.** Size pill tablist to content / left-align; replace the glass-panel story's raw `<button>` tier-force controls with `<ToggleGroup>` (canonical single-select-toggles case); sweep stories for raw-HTML control re-rolls. No library change beyond Tabs CSS. [Brief 1 F6/demo-δ]
- **AW.W14 (optional/polish) — Scrim-tint token on `DialogOverlay`/`ModalOverlay`.** Gate on a 2nd themed-dialog consumer. [Brief 4 F6]
- **NOT in AW:** the `/deck` primitive set, a `DeckProgress` component, the constellation extraction, the XRAY portal window — all 1-consumer; deferred with documented promotion triggers.

### H (slides + XRAY consumers — mostly delete-the-workaround / restyle)

- **H.W0 — Make XRAY a glass-ui consumer (precondition).** Upgrade XRAY to Tailwind v4, add `@mkbabb/glass-ui`, adopt the slides `index.css` pattern (`@import "@mkbabb/glass-ui/styles"` + `@source` dist + `@theme`/`@utility` for XRAY-local identity). Everything below depends on it. [Brief 5]
- **H.W1 — XRAY adopts the shared color spine; restore NCSU red.** Replace `--bg/--ink/--accent` with glass-ui warm-cream neutrals + `--foreground`; re-point `--accent` from `#60a5fa` to the NCSU-red register. Cold blue survives ONLY as the shared "AI-lane" counterpart slides already tokenizes (`--color-ai-blue*`) — promote that to the shared set, don't let XRAY mint its own. [Brief 5 H1]
- **H.W2 — One grade/score token set (kills the 5× dupe).** Collapse `GradeChip`/`ScoreGauge`/`--fail/--warn`/`.score-good`/SERIES_PALETTE/`LeanBadge` onto glass-ui `--success/--warning/--destructive/--info` (+ `*-foreground`). Highest-leverage no-duplication fix. [Brief 5 H2]
- **H.W3 — XRAY shared type idiom.** Drop the Google-CDN Helvetica/IBM-Plex link; consume glass-ui's self-hosted Fraunces + Plus Jakarta + Fira Code. Preserves the editorial-label feel on shared faces. [Brief 5 H3]
- **H.W4 — Purge the dead glass orphan.** Delete XRAY `main.css:13-16` `.glass-panel`; content substrate stays flat (correct per no-glass-on-glass). IF XRAY adds floating chrome (`ModelModal.vue`), use glass-ui `Dialog`/`.glass-overlay`. [Briefs 5 H4 / 6 W4]
- **H.W5 — XRAY consumes glass-ui chip/badge/dot primitives.** Replace `GradeChip`/`dev-chip`/`LeanBadge` with `Badge`/`badgeVariants` + `StatusDot` (the dev-chip dot is literally a StatusDot case). [Brief 5 H5]
- **H.W6 — Gate close-X: consume + delete (HIGH, zero-risk, available TODAY).** Pass `:show-close="false"` on the gate `<DialogContent>` (prop verified shipped); delete `.deck-gate > button:has(> .sr-only)` from `deck.css:565`. No AW dependency. [Brief 4 F1]
- **H.W7 — Gate invalid ring: delete after AW.W12.** Once `.input-pill` includes `[aria-invalid]`, delete DeckGate's `:deep(input[aria-invalid])` ring (`DeckGate.vue:118-121`). [Brief 4 F2]
- **H.W8 — Constellation legibility + dedup (slides-local).** Floor edge alpha + lift node tone for cream legibility (the lattice is the concept yet the faintest layer); token the anomaly callout font (`--font-mono` or body face). Keep the anomaly ring verbatim (F9 — the strongest element). Refactor the loop lifecycle onto glass-ui `useRAFLoop`; replace local `mulberry32` with `prng.ts` (both verified present). NOT an extraction. [Briefs 3 W6/W7, 4 F4]
- **H.W9 — SlideNutrition heavy-bar signature (token-only, biggest cogency win).** Add the full-bleed solid-`--foreground` `bar-thick` rule to `.nutrition-label` in `deck.css` (header/body and body/DV separators), mirroring `NutritionLabel.vue:238`. Pure token composition. Do NOT reskin toward Helvetica/blue — the slide already speaks the idiom in the deck's dialect. [Brief 6 W0]
- **H.W10 — SlideNutrition/SlideXray consume glass-ui figure + dot primitives.** Replace bespoke `.nl-cadence__dot` + `@keyframes pulse-dot` AND XRAY `.status__dot` + `@keyframes portal-live` with `StatusDot` (two consumers → legitimate de-dup). Map tabular figure rows onto `MetricBadge`/`MetricCell` where the affordance fits (DV headline figure yes; prose rows no). [Brief 6 W1/W2]
- **H.W11 (conditional, documented trigger) — `<DataWindow>` / `FactsPanel` extraction.** The XRAY faux-browser window and the FDA-facts label are extract candidates ONLY on a real 2nd consumer (a 2nd live-data-window slide; slides' model-facts card consuming the label). Until then both stay local. [Briefs 3 W8, 5 W6, 6 W3]

---

**Headline:** glass-ui's primitives are well-built and cohesive — the AW work is a targeted fix pass, not a rebuild: honor the glass-panel rungs in the svg-filter tier, fix the gold-audacious cream-on-cream text and the goo-blob `var()` throw, lift the too-timid cream affordances (8% borders, fill-less slider track, sub-threshold grain), close the low-saturation color-fidelity lag (OKLCh smooth aurora + perceptual blob shadow), and give the structurally-mature dock the Liquid-Glass shell identity, unified hover grammar, and default active state its buttons already have. Convergence is mostly subtractive — slides already consumes glass-ui correctly, so AW just widens the input-invalid ring and adds dock-active defaults so slides can delete two workarounds (`showClose` already ships today); the deck engine, constellation, and XRAY portal correctly stay local until a real 2nd consumer exists. The one same-org outlier, the XRAY nutrition-label app, keeps its FDA-broadsheet brutalism but becomes a glass-ui consumer like slides — adopting the shared cream/red/Fraunces spine and the single grade-semantic token set to kill its 5× color duplication — while the slides nutrition slide keeps its dialect and just gains the missing heavy-bar signature and de-dupes onto StatusDot/MetricBadge. No new primitive ships below the ≥2-consumer bar; the only duplication created is none, and a fair amount is removed.

---

## Lane briefs

### Lane 1

Server confirmed alive. I have full coverage. Here is the brief.

---

# AW/H Lane "core-primitives-design" — component-quality ledger

Audited at `http://localhost:5179` (re-pinned port; 5174/5173 were contended by a sibling slides/xray dev server sharing the Playwright session — note for the orchestrator: the browser session is NOT exclusive, screenshots intermittently captured other apps). Light/warm-cream theme forced via `localStorage vueuse-color-scheme=light`. SFCs read by path. dpr=1, 1440-wide viewport.

## Ledger (polished → needs refinement)

| Primitive | Verdict | Note |
|---|---|---|
| **Slider** | Polished (best in set) | iOS-26 rounded knobs, range/two-thumb, spectrum gradient track, value labels, full size matrix. One gap below. |
| **Badge** | Polished | Variants + leading-dot status + size×variant matrix, clean pill geometry, good contrast. |
| **Dialog** (and Sheet/Tooltip/Popover by composition) | Polished | All overlays consume the shared `glass-floating` tier — strong cohesion, correct hierarchy, scrim feedback, close affordance. |
| **Input / forms** | Good, minor | Pill fields, excellent error state (red border+label+helper). At-rest border is 8%α — barely visible (low affordance). |
| **Select** | Good | Trigger matches Input; chevron + focus-ring border. Cohesive. |
| **Card** | Good, with a perception trap | Toggles WORK (verified: shadow switch flips `data-state` and removes `shadow-card`); tier alpha steps are real but near-imperceptible on the flat cream page. |
| **Tabs** | Good, minor | default/pill/underline/vertical all clean; pill variant's active highlight floats in an over-wide gray track (off-center rhythm). |
| **Button** | Mixed — one real defect | Core variants solid. **gold-audacious + primary-audacious CTAs render near-invisible cream-on-cream text in light mode.** |
| **Switch** | Polished | `--primary` fill, thumb translate, correct `data-state`/`aria-checked`. Binding is correct (`v-model`→`modelValue` matches reka-ui v2). |
| **Glass Panel** | Broken (the flagged "sucks") | Five-rung ladder collapses to ONE rung under the default detected tier. |

## Findings with file:line

**1. Glass Panel — the five-rung ladder is void under the default `svg-filter` tier (headline).**
`src/components/custom/glass-panel/GlassPanel.vue:60-72` — `cssClass` only applies `VARIANT_CLASS[variant]` in the **CSS tier branch**. When `activeTier === "svg-filter"` (the detected default on Chromium, per the story's "DETECTED: SVG-FILTER") it returns `glass-panel glass-panel--svg` for ALL variants, and `:104-108` paints only `background: var(--glass-bg-wash)` (the lightest 30% rung) for every panel. Result (screenshot `glasspanel.png`): wash/quiet/resting/floating/overlay render as five **identical** flat cream rectangles. The SVG displacement filter over the story's smooth low-frequency pastel gradient produces no visible refraction, so there's no glass read at all. The entire premise of the showcase is defeated in the default tier.
Secondary: the bg tokens are double-nested `light-dark(light-dark(...), ...)` (live-resolved value) — a malformed/redundant token construction worth cleaning.
Secondary: the story's tier-force control (`glass-panel.vue:38-51`) hand-rolls raw `<button class="bg-card border ...">` instead of consuming `<Button>`/`<ToggleGroup>` — design-system inconsistency inside the design-system demo.

**2. Button gold-audacious / primary-audacious — unreadable text at rest in light mode.**
`src/components/ui/button/index.ts:17-18` sets `text-white` on `gold-audacious`. `src/styles/utilities.css:861-867` makes `btn-audacious-gold` an **8% gold tint over glass** at rest. White-on-near-cream = the washed-out "Next / Submit / Disabled" buttons in `btn-light.png`. `primary-audacious` (`index.ts:15-16`) is `bg-primary` so it's fine when primary is dark, but the audacious recipe's specular backplate lightens it — verify. Fix route: rest text should be a foreground/dark token; reserve `text-white` for a saturated (not 8%) substrate.

**3. Input / Select at-rest border affordance is sub-visible.**
Live computed resting border = `oklab(... / 0.08)` (8%α) — the field edge nearly vanishes on cream (`inputs.png`). The error state proves the system *can* show a present border. Bump resting border alpha for affordance without going loud.

**4. Standard Slider track shows no fill/progress.**
`slider2.png` — the filled portion left of the thumb is the same gray as the remaining track (Volume 42%, Balance 65, Price window). Only the spectrum variant colors its track. The standard track should fill to the thumb (`--primary` or a darker tone) for state feedback.

**5. Card tier differentiation + the "broken toggle" perception.**
Toggles are functionally fine (verified via DOM). The complaint is visual: tier alpha steps (0.30→0.95) are imperceptible on a flat cream page with nothing busy behind the glass, and shadow-off vs shadow-on differ by a faint inset. Same root cause as Glass Panel — **the demo backdrops don't reveal glass.**

**6. Tabs pill-variant rhythm.** `tabs.png` — active pill + label cluster center inside a full-bleed gray track, leaving large empty track flanks. Either size the track to content or left-align.

## Design diagnosis

The primitives themselves are largely well-built and **cohesive**: a single rounded-pill/`rounded-card` geometry, one `glass-floating` tier shared by every overlay (dialog/sheet/tooltip/popover all consume it — no hand-rolled surfaces), consistent `--primary`/`--destructive` token usage, good typographic ladder. The iOS-26 lean shows best in Slider and the pill inputs.

Three systemic gaps:
1. **Glass doesn't read on flat cream backdrops.** Both flagged complaints (glass-panel "sucks", card toggles "broken") trace to the same thing — translucency/blur is invisible with nothing high-frequency behind it. The component CSS is right; the *demo staging* and (for GlassPanel) the *svg-filter-tier variant collapse* are wrong.
2. **At-rest affordance is too quiet.** 8%α borders on inputs/selects, no slider track fill, sub-visible tier steps — the warm-cream palette is being rendered *too* timidly. iOS-26 Liquid Glass is translucent but still has clearly legible edges and fills.
3. **One hard legibility defect** (gold/audacious white text) and **one demo consuming raw HTML instead of glass-ui primitives** (glass-panel tier buttons).

## Wave-seed (AW/H)

- **AW.W?-α — GlassPanel tier-honoring across ALL renderer tiers.** Make `glass-panel--svg` and `--fallback` honor `variant` (the svg-filter branch must still tint per-rung via `--glass-bg-{variant}`, not hardcode wash). Plus give the glass-panel + card demos a high-frequency backdrop (photo/pattern/the existing Aurora or PaperBackdrop substrate — both already shipped, consume them, don't add a new one) so the five rungs and blur are legible. Closes the "sucks" report. ≥2 consumers: glass-panel + card stories.
- **AW.W?-β — Button audacious text-token fix.** Replace `text-white` on `gold-audacious` (and audit `primary-audacious`) with a foreground/contrast token that survives the 8%-tint rest state in light mode. Add a light-mode contrast check to the button story. Pure token/CVA fix, no new primitive.
- **AW.W?-γ — At-rest affordance pass (tokenized).** Lift the resting input/select border alpha (`--input`/border token) and add a filled-track recipe to the standard Slider (track-fill to thumb via `--primary`). Token + CSS only; spectrum variant already proves the track-fill mechanism — extend it, don't fork a new slider.
- **AW.W?-δ — Demo design-system hygiene.** Replace the glass-panel story's raw `<button>` tier-force controls with `<ToggleGroup>` (the canonical single-select-toggles-over-one-surface case per CLAUDE.md). No library change; consumes existing primitive. Sweep other stories for raw-HTML control re-rolls while here.
- **AW.W?-ε (smaller) — Tabs pill track sizing + Card tier-step legibility.** Size the pill tablist track to its content (or left-align), and once γ's backdrop lands, re-verify Card tier steps read. No new primitive.

Constraints honored: every seed is a token/CSS/variant fix or a demo consuming an **already-shipped** primitive (ToggleGroup, Aurora/PaperBackdrop, the existing slider track mechanism). No new primitive proposed; nothing added below the ≥2-consumer bar. The one structural bug (GlassPanel) is a fix to existing code, not new surface.

Screenshots saved at `/Users/mkbabb/Programming/glass-ui/{btn-light,card-vp2,glasspanel,inputs,badge,tabs,select,slider2,dialog-open}.png`. Dev server left running on port 5179 (PID via `/tmp/glassui-dev2.log`).

---

### Lane 2

Confirmed: `cssToOklch` (the core of `defaultBlobColorResolver`) feeds the string to value.js's `parseCSSColor` (index.ts:80), which cannot resolve a `var(--primary)` reference — it parses literal color syntax. The demo story passes `var(--primary)` as the blob color in two places (goo-blob.vue:19 and :21), so those blobs throw on every frame. The resolver needs to either resolve `var()` against the computed style first, or the story must pass a concrete color. This is the root cause of the missing-body / orphaned-satellite occlusion.

I have a complete, grounded audit. Let me write the brief.

I have completed the audit. Here is the brief.

---

# AW/H Substrate & Showcase Components — Frontend-Design Audit

Lane: substrate-components-design. READ-ONLY. Captured live on glass-ui (`localhost:5179`) + slides (`localhost:5173`); sources read by absolute path. Screenshots saved under `/Users/mkbabb/Programming/glass-ui/aw-*.png`.

Server note: the dev port drifted (glass-ui ended up on **5179**, slides on **5173**); the original 5175 in the brief was stale. The Playwright session multiplexed page handles across the two vite apps, so captures were driven through `browser_run_code_unsafe` pinning the right page by URL.

## What's genuinely good (keep, don't touch)

- **Aurora painterly mediums are stunning where they're meant to be.** Watercolor (Day 9: cyan→yellow diagonal with authentic bleed edges + paper showing through), pastel (Pastel Rainbow: creamy full-spectrum grain), and oil (Oil Impasto: vivid palette-knife striations) all read as real mixed paint. `aw-aur-day-9.png`, `aw-aur-pastel-rainbow.png`, `aw-aurora-oil.png`. The preset thumbnails match the live stage for these three mediums.
- **GlyphFace is the strongest glyph primitive.** Phase-tinted radial backplates (blue ping / red download / gold complete) with catch-light cap read as iOS-26 Liquid Glass; the gold "primary action" row is excellent. `aw-glyph-face.png`. `GlyphFace.vue` cap-default-off + `mix-blend-mode: screen` is the right call for translucent dock substrates.
- **Configurator studio shell is clean and cohesive** — glass-floating panel, live specimen stage + sectioned controls column with correct spacing rhythm and label hierarchy. `aw-configurator.png`. It's the canonical chrome Aurora consumes; no redesign needed.
- **Constellation (slides `til-briefing/constellation.ts`) is a well-engineered motif** — seeded PRNG, RAF-parking (only the active slide animates, ~90% of deck pays zero cost), pointer-reactive web, anomaly pulse/label, reduced-motion static frame, dark-mode re-tint via MutationObserver. The title slide (Fraunces display, NCSU-red "AI", scattered red lattice on cream) is on-brand and handsome. `aw-constellation-title.png`, `aw-constellation-deck.png` (404 page is also nicely on-brand).
- **DiscoGlyph** state matrix is clean and well-documented (`aw-disco-glyph.png`); the gold facet + catch-light reads at larger sizes.

## Findings (defects + gaps)

**F1 — GooBlob live-color + first-grid blob throw every frame (runtime bug → occlusion).**
Console on `/substrates/goo-blob`: `Error: Parse error at offset 0: "...var(--pr..."` spamming each frame. Root cause: the story passes `gooColor = ref("var(--primary)")` (`demo/stories/substrates/goo-blob.vue:19`) and `blobColors[0] = "var(--primary)"` (`:21`) as the blob color, but `defaultBlobColorResolver` → `cssToOklch` (`src/composables/color/index.ts:80`) feeds the string to value.js `parseCSSColor`, which parses literal color *values* and cannot resolve a `var()` reference. So those blob *bodies* never paint — that's why the grid declares 4 colors but renders 3 bodies, with two orphaned red satellites floating in the top-left dead space of the frame (`aw-goo-blob.png`, `aw-watercolor-dots.png`). Fix-route is design-level: either the resolver resolves `var()` against computed style before parsing, or the contract documents "concrete colors only" and the story passes a resolved token. Either way the demo currently ships a broken-looking substrate.

**F2 — GooBlob shading is flat gel + muddy drop-shadow.** The blobs are a soft radial fill plus a heavy dark `drop-shadow(5px 5px 2.5px color-mix(--blob-color 20%, --foreground))` (`GooBlob.vue:127-130`). No dimensional/specular lighting; the shadow mixes 80% foreground so on warm cream the green blob's lower edge reads muddy where shadow meets body (`aw-goo-blob.png`). Against the aurora/glyph work this is the least "stunning" substrate. The shadow wants to be lighter and color-derived, and the body wants a subtle highlight to read as a gel volume rather than a flat sticker.

**F3 — Aurora "smooth" medium (the default Sky) renders anemic.** The live Sky stage is near-white, barely-tinted pale blue with faint nucleus rings — dramatically paler than its own thumbnail (`aw-aur-default.png`). Every other medium is rich; smooth is the weak one. The README names the cause: palette interpolation is linear-sRGB `mix()` (`composition.glsl.ts:16`), so the smooth medium's distant-hue/low-saturation midpoints desaturate to grey. This is exactly what `AW.W1` (in-shader OKLCh interp) targets — the default look is the most-seen surface and currently undersells the engine.

**F4 — PaperBackdrop grain is invisible.** Clean vs Aged cards are indistinguishable (both flat near-white) at the default opacity (`aw-paper-clean2.png`, `aw-paper-backdrop.png`). The whole point of the substrate is perceptible grain; at `--glass-grain-opacity` default the texture doesn't read, so the "two frequencies" story has no visible payload. `PaperBackdrop.vue` is a thin `.paper-underpaint` wrapper — the grain authority lives in `styles/paper.css` tokens; the default opacity needs lifting or the story needs a darker substrate to show it against.

**F5 — Stale gray scrim leaks across demo routes.** `/foundations/paper-backdrop` rendered under a full-page gray scrim with the dock rail half-lit (`aw-paper-backdrop.png`) — an overlay/ExpandableContainer body-lock from a prior route didn't dismiss on navigation. Demo-private, not library, but it occludes the substrate it's meant to showcase. Worth flagging to the demo arm.

**F6 — Cross-repo PRNG duplication.** `slides/src/decks/til-briefing/constellation.ts:18` hand-rolls `mulberry32` + a seed-hash; glass-ui already ships the single-source `src/utils/prng.ts` (mulberry32 + hashString, consumed by watercolor-dot + goo-blob). The constellation is a 2nd-consumer candidate for a published seeded-PRNG leaf rather than a private copy — but only if the constellation itself ever becomes a glass-ui primitive (see seed AW-H4).

## Design diagnosis

The substrate tier is bimodal. The **painterly half** (aurora watercolor/pastel/oil, GlyphFace, DiscoGlyph, Configurator) is at or near "stunning" and cohesively on-brand: warm-cream glass, NCSU-red phase accent, Fraunces/Jakarta typography, iOS-26 catch-light language. The **procedural-color half** (GooBlob shading, the aurora smooth default, PaperBackdrop grain) lags — flat shading, sRGB-desaturated smooth ramps, sub-threshold grain. The single design throughline of the lag is **color/shading fidelity at the low-saturation end**: linear-sRGB interpolation greys the smooth aurora, the blob has no perceptual-color shadow, the paper grain has no perceptual contrast. The existing AW aurora wave seeds (W1 OKLCh interp, W2 derive) already address the aurora arm; the blob and paper arms are not yet covered and should ride the same OKLCh color core to keep the library on one color seam (no duplication).

Cohesion is otherwise strong: the constellation, aurora, and glyph primitives all speak the same red-anomaly / phase-tint / catch-light vocabulary across both repos.

## Wave-seed (AW/H)

- **AW-H1 — Blob color resolver resolves `var()` (fixes F1).** `defaultBlobColorResolver` resolves CSS custom-property references against computed style before `parseCSSColor`, OR the contract is documented "concrete colors" and the demo story passes resolved tokens. Either route kills the per-frame throw and restores the missing blob bodies. Gate: a resolver unit test over `var(--primary)` + a story-mount no-error assertion. (Bug-fix, ships now.)
- **AW-H2 — Blob dimensional shading on the OKLCh color core (fixes F2).** Replace the flat fill + foreground-heavy drop-shadow with a body highlight + a perceptual (OKLCh-derived, color-not-foreground) contact shadow, reusing the aurora OKLCh matrices (`procedural-color.glsl.ts`) — no new color seam, no value.js coupling. ≥2 consumers: GooBlob + value.js's own blob consumer. Gate: snapshot-bless + the existing `proof:blob-color-equivalence` canary.
- **AW-H3 — Smooth-medium OKLCh interp is the headline of the aurora default (folds into existing AW.W1).** Prioritize the smooth path in AW.W1 so the most-seen default (Sky) stops desaturating to grey. Already seeded + gated (`proof:aurora-oklch-interp`); this seed just flags it as the highest-visibility win, not a back-burner.
- **AW-H4 — PaperBackdrop grain register that actually reads (fixes F4).** Re-baseline the default `--glass-grain-opacity` / aged frequency so clean vs aged is perceptible, and prove it with a pixel-variance assertion (aged variance > clean variance > floor). Token-only, no component change. The library's own identity token evolves here (presets-in-consumers precept).
- **AW-H5 — Constellation as a glass-ui substrate primitive (consume-where-befitting; ≥2-consumer gate).** The constellation is slides-local but is a genuine reusable substrate (anomaly-web motif). Promote it to glass-ui ONLY if a 2nd consumer materializes (e.g. an aurora/empty-state backdrop); on promotion it consumes `src/utils/prng.ts` instead of its private `mulberry32` (resolves F6) and the Canvas2D loop joins the `useWebGLCanvas`-style offscreen-park substrate. If no 2nd consumer, it stays local and F6 is a documented allowance, not a defect. This is the substrate-quality ledger entry that keeps "≥2 consumers or formally retired" honest.
- **AW-H6 (demo-arm, non-library) — kill the stale-scrim leak (F5)** so substrate stories aren't shown under a dimming overlay. Route to the demo navigation/ExpandableContainer dismiss-on-route logic, not `src/`.

Emphasis held: no new primitive proposed without a ≥2-consumer gate (AW-H5 is explicitly conditional); the blob/paper/aurora color fixes all consume the ONE existing OKLCh color core rather than duplicating it; the constellation PRNG dedup is gated on promotion. The painterly half is already stunning — the wave seeds concentrate on closing the procedural-color/shading gap that keeps the default aurora, the blob, and the paper from matching it.

---

### Lane 3

There's a `probe.txt` and `docs/tranches/AW/` already present (from concurrent agents, not mine). I didn't create those. My screenshots are cleaned. Now I'll write the audit brief as my final return value.

# AW/H Tranche — Dock + Constellation Frontend-Design Audit

Lane: `dock-constellation-design`. READ-ONLY. Targets: glass-ui `GlassDock` family + slides `til-briefing` constellation. Live capture was partial — the three co-located vite dev servers (glass-ui demo `:5173/:5174`, til-briefing `:5175`, AI-XRAY `:5180`) cross-redirect through a `127.0.0.1` fallthrough and one crashed mid-audit, so screenshot coverage is: one clean constellation cover capture + dock-in-chrome captures (left CategoryRail dock, center collapsed pill, configurator FAB). Source/CSS read in full.

## Findings — Dock

**F1. The collapsed pill is a featureless lozenge — weak affordance.** In every capture the collapsed `GlassDock` renders as a bare rounded-rect outline (`constellation-cover` chrome, the demo center-top pill) with no glyph, grip, or directional cue. `GlassDock.vue:408-414` only paints the `#collapsed` slot; the demo passes a single `<Home>` icon (`dock.vue:80-82`), but the app-chrome instances pass nothing, so the pill reads as a stray border. The collapsed surface has `cursor:pointer` + a hover-scale (`dock.css:386-391`) but no *resting* signal that it is interactive or expandable. iOS-26 Liquid Glass docks always carry a grip/handle hint at rest.

**F2. The dock material is under-glassy for the stated aesthetic.** `dock.css:84-90` composes `--glass-bg-resting` + a single `backdrop-filter` blur + a 1.5px border + the `--glass-edge-light` rim. Against the warm-cream backdrop the pill reads as a flat translucent plate, not Liquid-Glass: there is no specular *lensing* (the AV.W15 moving specular at `DockIconButton.vue:53-65` lives on the *buttons*, never on the *shell*), no edge refraction, no inner-shadow depth on the shell itself. The grain `::after` (`dock.css:231-242`, `mix-blend overlay`) is the only surface texture and is invisible at dock scale. For iOS-26 parity the shell wants a thin specular top-edge highlight + a subtle bottom inner-shadow as its own identity.

**F3. Control-family visual vocabulary is fragmented across four hover idioms.** The dock's controls each hover differently: `.dock-icon-button` → card-tint fill + `--glass-highlight` specular + scale (`dock-controls.css:88-103`); `.dock-tab-button` → `--surface-tint-8` flat fill, no specular, no scale (`:244-247`); `.dock-select-trigger`/`.dock-dropdown-trigger` → `--muted` fill (`:403-407`), and only the *dropdown* gets a hover-scale while the *select* does not (`:409-411`). Four controls in one pill, four different hover materials and three different scale behaviours. This is the single biggest cohesion gap — the family does not read as one system.

**F4. Active-state feedback is invisible by default.** `.dock-icon-button` active paint (`dock-controls.css:120-126`) resolves `--dock-active-bg/-color/-scale/-border/-shadow`, but those tokens default to empty/none — so an `aria-pressed` icon button (the media Play/Pause in `dock.vue:92-99`) shows **no** persistent active treatment unless a consumer wires the cohort. The pressed Play button looks identical to its idle siblings. Default active feedback should not be opt-in.

**F5. The layer-switcher rail divider is a hard hairline against soft glass.** `.dock-layer-rail` uses `border-right: 1px solid color-mix(--border 30%)` (`dock.css:751`), repeated four ways for the orientation/position matrix (`:754-768`). A flat 30%-border hairline inside a blurred glass pill reads as a CSS seam, not a designed groove — it breaks the material illusion. The InstrumentChassis groove vocabulary (engraved-bezel `::before`, already lifted for `instrument-strip` at `dock.css:352-360`) is the cohesive treatment the rail should borrow.

**F6. Density rhythm is sound but the audacious tier is a different component.** The four density rungs (`dock.css:103-208`) are well-tokenized and the `@container dock` label compression (`:220-229`) is genuinely portable. But `audacious` jumps control-size 2.5rem→4rem and adds the disco-grain/sparkle primary tier (`dock-controls.css:285-341`) — a typographic-CTA surface that shares almost no visual DNA with the compact/comfortable tray. It reads as a fork, not a rung.

**F7. Spacing/padding rhythm — separator margins fight the gap token.** `.dock-separator` hardcodes `margin: 0 0.375rem` (`dock.css:708-714`) independent of `--dock-layer-gap` (which varies 0.25→0.875rem across densities). At audacious density (gap 0.875rem) the separator's fixed 0.375rem margin collapses the rhythm; at compact (gap 0.25rem) it over-spaces. The separator margin should derive from the gap token.

## Findings — Constellation

**F8. The lattice is near-invisible against warm cream.** Live cover capture + computed styles: edges paint in `--foreground` (`hsl(24 10% 10%)`, near-black) at `0.17 × t × 0.92α` (`constellation.ts:251`) and nodes in `--neutral-4` (`hsl(48 7% 70%)`, a pale grey ~1.4:1 against cream). On the cover the web is barely perceptible — only the red anomaly + its callout read. The motif's "continually re-triangulating lattice" is the whole concept yet it is the least visible layer. Edge alpha and node tone need a floor for cream legibility.

**F9. The anomaly ring is the strongest design element — and it works.** `drawAnomaly` (`constellation.ts:278-331`) composes a phase-pulsing outer ring + a static 16px ring + the red core + the dashed `'Fira Code'` callout (`:312-330`). This is genuinely good: clear focal hierarchy, the NCSU-red accent lands, the dashed-leader callout reads as an annotation. This is the part worth preserving verbatim in any abstraction.

**F10. Typographic mismatch in the callout.** The anomaly label renders in `'Fira Code', monospace` (`constellation.ts:326`) while the deck's body is Plus-Jakarta and display is Fraunces. The mono callout is an intentional "data-annotation" voice, but it is a *third* typeface introduced on the cover with no token backing — a hardcoded font string, not a `--font-mono` var. Either justify it as a system mono token or drop it to the body face.

**F11. The constellation is single-consumer and re-duplicates three glass-ui primitives.** It lives in exactly one deck (`til-briefing`; the 4 grep hits are all that one deck). Yet slides already depends on `@mkbabb/glass-ui ^3.3.0` and the constellation hand-rolls: (a) `mulberry32` (`constellation.ts:18-26`) — glass-ui ships the identical single-source in `src/utils/prng.ts`; (b) its own RAF-park loop (`:448-477`) — glass-ui ships `useRAFLoop`; (c) its own offscreen/active gating via MutationObserver — glass-ui ships `useIntersectionPause`. Three concerns glass-ui already owns are re-implemented locally.

## Design diagnosis

The **dock** is structurally mature (axis-aware FLIP, density tokens, container-query labels, a clean typed-DI context, WCAG floors) but **visually under-resolved as a Liquid-Glass object**: its shell has no specular identity of its own (F2), its four control families speak four hover dialects (F3), its default active state is mute (F4), and its internal seams (rail divider F5, separator margins F7) are CSS hairlines rather than designed grooves. The polish lives on the *buttons* (the AV.W15 specular track) but never reached the *shell* or unified the *family*. The fix is a cohesion pass, not a rebuild: one shell material, one control hover grammar, one default active treatment, groove vocabulary for seams.

The **constellation** is a well-built single-deck motif whose best element (the anomaly ring, F9) is excellent and whose substrate (the lattice, F8) is too faint to carry its own concept. It is **not yet a glass-ui component candidate** under the ≥2-consumer rule (F11) — but it is a textbook case of a consumer that should *consume* glass-ui's existing leaves (prng, useRAFLoop, useIntersectionPause) instead of re-rolling them. Abstracting it into glass-ui now would be substrate-without-a-second-consumer; the right move is dedup-into-glass-ui-leaves first, and only extract a `Canvas2D` substrate if/when a second deck wants a particle field.

## Wave-seed list (AW/H)

Design-language cogency, no duplication, ≥2-consumer for any new primitive.

- **AW.W1 — Dock shell Liquid-Glass identity.** Give `.glass-dock` its own specular top-edge highlight + bottom inner-shadow as shell tokens (`--dock-specular`, `--dock-inner-shadow`), distinct from the per-button AV.W15 track. Token-first, dark-arm via existing `--shadow-color` flip. (F2)

- **AW.W2 — Unify the control-family hover grammar.** One hover material across `dock-icon-button` / `dock-tab-button` / `dock-select-trigger` / `dock-dropdown-trigger`: same fill token, same specular, same scale policy. Collapse the four idioms in `dock-controls.css` to one `:where()` comma-group + per-control deltas only where semantically required. (F3)

- **AW.W3 — Default active-state paint.** Give `--dock-active-*` non-empty defaults so an `aria-pressed`/`is-active` control shows persistent feedback out of the box; consumers still override the cohort. Audit the media-transport story as the canary. (F4)

- **AW.W4 — Collapsed-pill affordance.** A resting grip/handle hint (or a default chevron in the `#collapsed` slot path) so the collapsed dock reads as expandable without a consumer-supplied glyph. (F1)

- **AW.W5 — Seam vocabulary.** Replace the rail-divider hairline (`dock.css:751-768`) and re-derive `.dock-separator` margin from `--dock-layer-gap` (F7); borrow the InstrumentChassis engraved-groove `::before` (already present at `:352-360`) for the rail divider. (F5, F7)

- **AW.W6 — Constellation legibility pass (slides-local).** Floor the edge alpha + lift node tone for cream-background legibility; token the anomaly callout font (`--font-mono` or drop to body face). No glass-ui change. (F8, F10)

- **AW.W7 — Constellation dedup onto glass-ui leaves (slides-local, NOT an extraction).** Replace the local `mulberry32` with glass-ui `prng`, the hand-rolled RAF-park with `useRAFLoop`, and the active-gating MutationObserver with `useIntersectionPause`. Keep the anomaly-ring renderer (F9) verbatim. Defer any `Canvas2D` substrate extraction until a second deck needs a particle field — single-consumer today fails the ≥2 bar. (F11)

- **AW.W8 (gate, conditional) — Canvas2D substrate seam.** ONLY if AW scope adds a second particle-field consumer: extract a `useCanvas2D` substrate paralleling `useWebGLCanvas` (shared resize/dpr/RAF-park), with the constellation passes as the first consumer and the new field as the second. Otherwise this wave does not fire.

Source anchors: dock — `src/components/custom/dock/GlassDock.vue`, `src/styles/dock.css`, `src/styles/dock-controls.css`, `src/components/custom/dock/composables/dockContext.ts`. Constellation — `/Users/mkbabb/Programming/slides/src/decks/til-briefing/constellation.ts` (`drawAnomaly` :278-331; `mulberry32` :18-26; RAF park :448-477). Existing glass-ui leaves to consume — `src/utils/prng.ts`, `src/composables/motion/useRAFLoop.ts`, `src/composables/motion/useIntersectionPause.ts`.

---

### Lane 4

I have all the evidence I need. Here is the brief.

---

# AW/H convergence audit — slides ↔ glass-ui (lane: convergence-gaps)

## What I looked at

Slides deck engine (`src/deck/*`), the gate (`views/DeckGate.vue`, `useDeckUnlock.ts`, `DeckPage.vue`), the de-docked progress bar + dock chrome (`DeckView.vue`), the pager (`DeckPager.vue`), the gear (`DeckSettings.vue`), the constellation (`decks/til-briefing/constellation.ts` + its 2 mount sites), the footers, and the deck-theme tokens. Cross-read glass-ui `components/{ui,custom}`, `composables/motion/useRAFLoop.ts`, the Dialog/Input/Progress primitives. Live: gate + cover screenshots on the running deck (warm-cream ground, Fraunces hero, red-anomaly constellation lattice, glass access card on a flat mid-grey scrim). The shared browser session kept stealing focus across the three concurrent dev servers, so deeper in-deck shots were unreliable — source reads carry the rest.

## Design diagnosis

The slides chrome is already **disciplined about consuming glass-ui**, and it says so out loud in comments. The gate is `Dialog + Input + Button` (`DeckGate.vue:3-6`); the gear is `DropdownMenu + DarkModeToggle + DockIconButton` with a "no new primitive" note (`DeckSettings.vue:18-22`); the dock is `GlassDock + DockIconButton` (`DeckView.vue:5`). The design language reads cleanly — warm-cream glass, NCSU-red accent, Fraunces/Jakarta — and the gate composites correctly from library parts.

The real convergence story is **not "extract a big DeckEngine into glass-ui."** Every deck-engine artefact has exactly ONE consumer (the slides repo) and glass-ui has zero deck consumers — confirmed: `useDeck`, `useDeckNav`, `DeckView`, `DeckProgress`, `DeckPager`, the gate, and the constellation each appear in slides only. The source itself flags this discipline repeatedly: `useDeck.ts:5-8` ("Kept LOCAL until a second real consumer exists… glass-ui's ≥2-consumer invariant"), `DeckPager.vue:15` ("the eventual `@mkbabb/glass-ui/deck <DeckPager>` generalizes this"), `DeckSlide.vue:10` ("local consumer #1 of the eventual… `<DeckSlide>`"). Those are correctly **deferred**, not gaps. Promoting them now would manufacture a single-consumer primitive — exactly the overfit the invariant forbids.

What IS actionable for AW are two classes:
1. **Stale local hacks that a SHIPPED glass-ui capability now obsoletes** (consume what already exists; delete the workaround).
2. **Small, genuinely ≥2-consumer library affordances** the gate/forms surface needs.

### Finding 1 — the gate's close-X hack is already obsolete (HIGH, zero-risk)

`deck.css:565` carries `.deck-gate > button:has(> .sr-only) { display: none }` to hide reka-ui's close X on the non-dismissable gate, with a comment booking "the true fix is glass-ui FG.W-dialog: a `showClose` prop." **That prop already ships** — `DialogContent.vue:62` `showClose?: boolean` (default `true`), rendered behind `v-if="props.showClose"` at line 134. So the fix is already in the library at the version slides depends on (`^3.3.0`). H-side: pass `:show-close="false"` on the gate's `<DialogContent>` and delete the `:has()` global. No glass-ui change needed — pure consume-and-delete.

### Finding 2 — the gate's invalid-ring duplicates `.input-pill`'s, but on the wrong selector (MEDIUM)

`DeckGate.vue:118-121` hand-paints a destructive ring via `:deep(input[aria-invalid="true"])`, with a comment "glass-ui Input has no native data-invalid state yet — BOOK FG.W-input." But glass-ui's `.input-pill` DOES paint an invalid ring (`glass.css:328-338`) — it just keys off `:user-invalid` + a `.user-invalid-fallback` class, the browser-constraint-validation path, NOT the `aria-invalid` attribute the gate sets manually. So a consumer driving validity imperatively (custom key-match, not native `required`/`pattern`) gets no library ring. **AW seed:** widen the `.input-pill` invalid-ring selector group to include `[aria-invalid="true"]` alongside `:user-invalid` / `.user-invalid-fallback`. Then the gate drops its `:deep()` ring. ≥2-consumer: any glass-ui form with app-driven (non-native) validation — the canonical case, not slides-specific.

### Finding 3 — DeckProgress: a real reusable bar, but as TOKENS/recipe, not a component (MEDIUM)

The de-docked progress bar (`DeckView.vue:238-260`) is a clean `position:fixed` full-width track with a `--p` percentage fill, red-glow leading edge, `ease-out-expo` width transition, safe-area-aware, reduced-motion-aware. It's good work and genuinely generic. But glass-ui already ships a `Progress` family (`Progress/ProgressDefault/ProgressGradient/ProgressSectioned`) — a NEW `DeckProgress` component would fork it. The bar's value-add over `<Progress>` is purely the **viewport-pinned chrome recipe** (fixed/full-width/safe-area/z-layer/leading-glow), not the fill mechanic. **AW seed (if pursued):** a `.glass-progress-rail` CSS recipe in glass-ui styles (the pinned-chrome shell) that composes the existing `Progress` fill — NOT a second progress component. Honestly: defer unless a second consumer appears. Today it's one consumer; the `Progress` primitive already covers the fill; the recipe is ~20 lines of fixed-position CSS that isn't load-bearing across repos yet.

### Finding 4 — the constellation belongs in slides, NOT glass-ui (KEEP LOCAL — explicit)

`constellation.ts` is a 489-line Canvas2D viz with TWO mount sites, both inside ONE deck (til-briefing cover + closing — `Slide01.vue:11`, `Slide10.vue:17`). It is deeply editorial: the red "anomaly" node, the dashed callout label, the resolved-check, the audit narrative. This is **deck content, not a design-system primitive** — it fails ≥2-consumer (2 sites, 1 deck, 1 repo) and it's domain-bound to the AI-audit story. It stays slides-local. Memory already records "constellation stays local" — confirmed correct.

One genuine convergence sub-point: the constellation hand-rolls its own RAF-park machinery (`constellation.ts:448-477` — per-slide `[data-state]` MutationObserver, `anyActive()` gating, reduced-motion static frame). glass-ui ships `useRAFLoop` (`useRAFLoop.ts`) with `pauseWhenHidden` + `respectReducedMotion` + start/stop/pause already built. The constellation could **consume `useRAFLoop`** for the loop lifecycle (it can't use the slide-active gating, which is deck-specific, but the hidden/reduced-motion/dispose plumbing is exactly what it reimplements). Small internal cleanup, slides-side, no new glass-ui surface.

### Finding 5 — XRAY portal window: slides-local, correctly (KEEP LOCAL)

The faux-browser portal frame (`SlideXray.vue` — traffic-light dots, live/preview status pulse, poster↔iframe degradation) is one mount, one deck. It's editorial chrome ("the transparency portal"), not a primitive. The `--portal-*` tokens already live in deck.css as deck identity. No convergence — keep local.

### Finding 6 — design-language cogency (NO occlusion, good hierarchy)

Gate screenshot: clean. Lock disc (red-wash focal, subordinate to the Fraunces title), good vertical rhythm (`DialogContent grid gap-4` + the `__head`/`__form` refinements), pill Input, ink primary-audacious Unlock button. One small note: the gate scrim renders as a **flat mid-grey letterbox** (reka-ui's default dialog overlay) — against the warm-cream + NCSU-red language it reads slightly cold/generic. Not a bug, but if glass-ui's `DialogOverlay` exposed a tint token (it composes `ModalOverlay` from `_shared`), the gate could warm the scrim to cream-ink for cohesion. Low priority; flagged for design-cohesion completeness.

## Convergence ledger

| Artefact | Verdict | Why |
|---|---|---|
| Gate close-X hack (`deck.css:565`) | **Consume + delete (H)** | `DialogContent showClose` already ships in 3.3.0 |
| Gate invalid ring (`DeckGate.vue:118`) | **AW: widen `.input-pill` invalid selector to include `[aria-invalid]`** | ≥2-consumer (any app-driven-validity form); then H deletes the `:deep()` |
| DeckProgress bar | **Defer; if pursued → `.glass-progress-rail` recipe composing existing `<Progress>`** | 1 consumer today; `<Progress>` covers the fill; new component would fork |
| `useDeck`/`useDeckNav`/`DeckView`/`DeckSlide`/`DeckPager` | **KEEP LOCAL (deferred, correctly)** | 1 consumer; source already books the future `/deck` move; promoting now = overfit |
| Constellation | **KEEP LOCAL**; AW-adjacent: consume `useRAFLoop` for loop lifecycle (slides-side) | 2 sites/1 deck, editorial; fails ≥2-consumer |
| XRAY portal window | **KEEP LOCAL** | 1 site, editorial chrome |
| Gear / dock / footers | **Already converged** | Composited from shipped subpaths; no action |
| Dialog scrim tint | **Optional AW: tint token on `DialogOverlay`/`ModalOverlay`** | cohesion polish; ≥2-consumer if any themed-dialog consumer wants warm scrim |

## Wave-seed list (AW/H)

**AW (glass-ui adds — only the genuinely ≥2-consumer items):**
- **AW.W-input-invalid** — add `[aria-invalid="true"]` to `.input-pill`'s invalid-ring selector group (`glass.css:328,338`), so app-driven (non-native-validation) forms get the destructive ring. Canonical, not slides-specific.
- **AW.W-overlay-tint** (optional/polish) — expose a scrim-tint token on `DialogOverlay`/`ModalOverlay` so themed consumers (slides cream, others) can warm the default mid-grey letterbox. Gate on a second interested consumer.
- **AW.W-progress-rail** (defer) — IF a second viewport-pinned-progress consumer materializes, ship a `.glass-progress-rail` chrome recipe composing the existing `<Progress>` fill. Do NOT ship a `DeckProgress` component (forks `Progress`).
- **Explicitly NOT in AW:** a `/deck` primitive set (`useDeck`/`DeckView`/`DeckPager`/`DeckSlide`). One consumer. Stays a deferred move, per the invariant and the in-source bookings.

**H (slides consumes — mostly delete-the-workaround):**
- **H.W-gate-showclose** — pass `:show-close="false"` on the gate `<DialogContent>`; delete `.deck-gate > button:has(> .sr-only)` from `deck.css:565`. (Available today; no AW dependency.)
- **H.W-gate-invalid** — after AW.W-input-invalid lands, delete DeckGate's `:deep(input[aria-invalid])` ring (`DeckGate.vue:118-121`).
- **H.W-constellation-raf** — refactor `constellation.ts` loop lifecycle onto `useRAFLoop` (keep the deck-specific slide-active gating; drop the hand-rolled hidden/reduced-motion/dispose plumbing). Slides-internal cleanup.

**Headline:** the convergence is mostly **subtractive** — slides already consumes glass-ui where it should; AW's main job is to make two shipped/near-shipped library capabilities reachable (`showClose` is already there; `aria-invalid` ring is a one-selector add) so slides can delete its workarounds. The deck engine, constellation, and XRAY portal correctly stay slides-specific until a real second consumer exists. No duplication to create; some to remove.

---

### Lane 5

This confirms the full diagnosis. The XRAY app:
- Is a Friday Institute / NCSU TIL product (same org as slides) but uses ZERO NCSU red — it's all cold blue `#60a5fa`
- Has the green/orange/red grade semantics scattered across **5+ hardcoded sites** (`tokens.css --fail/--warn`, `GradeChip` Tailwind classes, `ScoreGauge` inline hex, `ModelAggregate`/`Results` scoped `.score-good`, `Statistics` SERIES_PALETTE) — no single source
- Has a **dead `.glass-panel`** in `main.css` (leftover from a prior glassmorphic design, now orphaned, contradicting tokens.css's "glassmorphism intentionally omitted")
- Uses square corners (`border-radius: 50%` only for dots; otherwise hard 2px brutalist borders) — opposite of glass-ui's `0.625rem` soft radius

I now have everything. Let me write the brief.

---

# AW/H Design-Language Cohesion Audit — Lane: design-language-cohesion

## Verdict

There is a coherent warm-cream-glass language shared by **glass-ui ↔ slides** — slides is a model consumer. The **AI-Nutrition-Label (XRAY) app does not participate in it at all.** It is an internally-coherent but fully orthogonal design system: near-black brutalist FDA-label editorial, cold-blue accent, Helvetica/IBM-Plex, hard 2px borders, zero glass. Same org (Friday Institute / NCSU TIL), zero shared tokens, zero shared red, zero shared type, zero shared primitives, not even a glass-ui dependency.

## What the shared language IS (glass-ui = source, slides = consumer)

The reference idiom, from the files + screenshots:
- **Color** — warm cream field (`--neutral-0: hsl(48 12% 98%)`, hue-48 warm-paper L* ladder, `tokens.css:310-324`), muted-black ink (`--foreground: hsl(24 10% 10%)`), NCSU-red hero accent layered by the consumer (`#cc0000` + `light-dark()` ink lift, `deck-theme.css:36-46`). Warm red-bloom aurora background (glass-ui intro screenshot).
- **Type** — Fraunces display/serif + Plus Jakarta Sans brand + Fira Code mono, golden-ratio √φ scale (`typography.css:1-19, 102-115`; `--font-stack-display: "Fraunces"`, `tokens.css:43`).
- **Material** — 5-rung glass ladder (`.glass-wash…overlay`, `glass.css:48-90`), cartoon offset-stamp shadow as the signature (`--shadow-cartoon-*`, `tokens.css:476-477`), `0.625rem` base radius, iOS-26 Liquid Glass rim/specular folds.
- **Consumption pattern (the model)** — slides `index.css:11-25` imports `@mkbabb/glass-ui/styles`, `@source`s the dist, then layers ITS identity via `@theme`/`@utility` (NCSU-red registers + `card`/`chip`/`badge`/`eyebrow` recipes that read glass-ui's `--glass-bg-resting`, `--hairline`, `--radius-*`). It even **renamed** its cartoon shadow to `--shadow-deck-stamp-*` so it would not intercept glass-ui's chain (`deck-theme.css:64-71`). This is exactly the "presets-in-consumers / token-first" discipline. **The XRAY app should consume glass-ui the same way slides does.**

## Findings — XRAY divergence (file:line)

1. **No glass-ui dependency, wrong Tailwind major.** `package.json` has no `@mkbabb/*`; `tailwindcss ^3.4.3` (glass-ui + slides are v4). No `@theme`/`@utility` path. Hard blocker for token sharing until upgraded.

2. **Cold-blue accent, not NCSU red.** `tokens.css:13` `--accent: #60a5fa` (+ `--accent-dim: #3b82f6`). The brand mark, eyebrow dots, active-tab dot, dim-weight, dim-special all read this blue (`TopBar.vue:181,242,286`; `DimensionCard.vue:67,109,115`). Same org as slides; uses none of the `#cc0000` Wolfpack red. Screenshots confirm: XRAY is blue-on-black; slides is red-on-cream.

3. **Wrong type stack.** `tokens.css:25-27` Helvetica Neue + IBM Plex Mono + Caveat; fonts loaded from Google CDN (`index.html`), not the self-hosted Fraunces/Jakarta/Fira faces glass-ui ships. No serif display register at all. `NutritionLabel.vue:210` title is 900-weight Helvetica with `-1px` tracking — a grotesk, not Fraunces.

4. **Dark-default + near-black, no warm cream.** `tokens.css:30-46` `--bg: #0a0b0a`, cool greys (`#111312`, `#1a1d1b`); light theme `#f5f4ee` is a cool off-white, not glass-ui's hue-48 warm cream. `App.vue:31` body font = `--font-display`.

5. **Brutalist material, zero glass.** Everything is `2px solid var(--ink)` hard borders + 8px-thick black bars (`NutritionLabel.vue:185-252`, `DimensionCard.vue:48`, `TopBar.vue:153,175`). No radius (square corners). The ONE glass artefact is **dead**: `main.css:13-16` `.glass-panel { bg-white/5 … backdrop-blur-xl … rounded-3xl }` with a teal/purple gradient — an orphan from a retired design, contradicting `tokens.css:8` ("Glassmorphism tokens … intentionally omitted"). Either purge it or replace with glass-ui's ladder; right now it's design debt.

6. **Grade/score color set defined 5+ times, no single source.** The green/orange/red A–F semantic appears as: `tokens.css:15-16` (`--fail #ef4444`, `--warn #f59e0b`); `GradeChip.vue:15-23` (`grade-success/warning/danger` Tailwind classes = `#22c55e/#f97316/#ef4444` from `tailwind.config.ts`); `ScoreGauge.vue:27-29` (inline `#22c55e/#f97316/#ef4444`); `ModelAggregate.vue:451` + `Results.vue:458` (`.score-good {#22c55e}`); `Statistics.vue:166` SERIES_PALETTE. Three different "good greens" (`#22c55e` vs `#4ade80`) for the same meaning. glass-ui already ships these: `--success/--warning/--destructive`/`--info` (`tokens.css:356,459-461`) with foregrounds (`:469-471`).

7. **LeanBadge uses a 4th ad-hoc palette.** `LeanBadge.vue:11-13` hardcodes `bg-blue-500/20`, `bg-slate-500/20`, `bg-red-500/20` for L/N/R — another off-token color set.

8. **Three chip idioms, none shared.** `GradeChip` (pill, Tailwind grade colors), `dev-chip` (`TopBar.vue:259`, mono caps, square), `LeanBadge` (pill, blue/red). slides has ONE `chip`/`chip-red`/`badge` recipe (`deck-theme.css:202-233`) and glass-ui ships `Badge` + `badgeVariants`, `MetricBadge`, `MetricPill`, `StatusDot`.

## Diagnosis

The XRAY app and the slides+glass-ui pair are two **separate, internally-coherent** design languages. XRAY's FDA-nutrition-label brutalism is a legitimate and on-theme concept (it IS a nutrition label) — the problem is it was built as a standalone "AI-Guardrails template" port (`tokens.css:2`) with **no awareness of glass-ui**, so it re-invents type, color, grade-semantics, and chips from scratch, duplicates the grade palette 5×, carries a dead glass orphan, and — most tellingly for a same-org product — drops the NCSU red entirely for a generic SaaS blue.

The cohesion goal is **not** to glassify the nutrition label (the FDA-label brutalism is its strength and should survive). It is to make XRAY a **glass-ui consumer** the way slides is: pull the warm-cream neutrals, the Fraunces/Jakarta/Fira type, the NCSU-red accent, and the ONE grade-semantic token set from glass-ui, then keep the label/card/gauge as XRAY-local recipes that READ those shared tokens. The nutrition-label form factor itself (the FDA-facts structure, the thick rules, tabular numerics) is a strong idiom that glass-ui and slides could both benefit from — it is the clearest >=2-consumer candidate for a new shared primitive.

## Wave-seed list (AW/H)

Ordered; each names the cohesion win and the no-duplication rule.

- **H.W0 — Make XRAY a glass-ui consumer (precondition).** Upgrade XRAY to Tailwind v4, add `@mkbabb/glass-ui` dep, adopt the slides `index.css` pattern (`@import "@mkbabb/glass-ui/styles"` + `@source` dist + `@theme`/`@utility` for XRAY-local identity). Everything below depends on this. No token sharing is possible on Tailwind v3.

- **H.W1 — Adopt the shared color spine; restore NCSU red.** Replace XRAY's `--bg/--ink/--accent` set with glass-ui's warm-cream neutrals + `--foreground`, and re-point `--accent` from `#60a5fa` to the NCSU-red register slides already defines (`#cc0000` + `light-dark()` ink lift). XRAY keeps its `[data-theme]` dark/light switch but resolves both arms from glass-ui tokens. Cold blue may survive ONLY as the deliberate "AI-lane" counterpart slides already tokenizes (`--color-ai-blue*`, `deck-theme.css:48-56`) — promote that to the shared set rather than XRAY minting its own.

- **H.W2 — One grade/score token set (kills the 5× dupe).** Collapse `GradeChip`, `ScoreGauge`, `--fail/--warn`, `.score-good`, SERIES_PALETTE, `LeanBadge` onto glass-ui's `--success/--warning/--destructive/--info` (+ `*-foreground`). A→success, C→warning, D/F→destructive. Single source; zero local hex. This is the highest-leverage no-duplication fix.

- **H.W3 — Shared type idiom.** Drop the Google-CDN Helvetica/IBM-Plex link; consume glass-ui's self-hosted Fraunces + Plus Jakarta + Fira Code. The nutrition label's heavy-grotesk display becomes Fraunces display (or the `brand-uniform-sans` Jakarta preset if a grotesk is wanted), mono labels become Fira Code. Preserves the editorial-label feel on the shared faces.

- **H.W4 — Purge the dead glass orphan; adopt the real ladder where glass belongs.** Delete `main.css:13-16` `.glass-panel`. XRAY's content substrate stays flat (correct per glass-ui's no-glass-on-glass discipline). IF XRAY adds floating chrome (modals — it has `ModelModal.vue`), use glass-ui's `Dialog`/`.glass-overlay`, not a hand-rolled blur.

- **H.W5 — Consume glass-ui chip/badge primitives.** Replace `GradeChip`, `dev-chip`, `LeanBadge` with glass-ui `Badge`/`badgeVariants` + `StatusDot` (the dot dev-chip is literally a StatusDot use-case). Removes three local chip idioms. >=2-consumer is automatic (slides + XRAY + glass-ui demo already use these).

- **H.W6 — `<NutritionLabel>` as a shared primitive (the >=2-consumer headline).** The FDA-facts label is the one genuinely new, reusable idiom XRAY contributes. If slides wants a "model facts" card (the TIL deck pitches LLM evaluation) AND XRAY needs it, extract a token-driven `MetricLabel`/`FactsPanel` primitive into glass-ui (it already ships `MetricCell`/`MetricStack`/`MetricBadge` — this is the same family). Gate on a real second consumer per the visual-load-bearing-ness invariant; if slides won't consume it, it stays XRAY-local (do NOT add substrate without a 2nd consumer). The `ScoreGauge` conic-gradient dial similarly overlaps glass-ui's `Progress`/`useAnimatedNumber` — fold rather than keep a bespoke gauge.

- **H.W7 — Cohesion proof + token-audit gate.** After W1–W6, add a grep gate (mirrors glass-ui's overfitting/shadow-contract gates): no raw `#22c55e|#f97316|#ef4444|#60a5fa|#cc0000` hex in XRAY `src/` outside the token file; every grade/accent/series color resolves through a shared `var(--*)`. Locks the no-duplication win.

## No-duplication summary (what becomes ONE set)

| Concern | Today (XRAY) | Should be ONE source |
|---|---|---|
| Grade green/orange/red | 5+ hardcoded sites | glass-ui `--success/--warning/--destructive` |
| Accent | local `#60a5fa` | glass-ui NCSU-red (+ shared `--ai-blue` if a cool lane is wanted) |
| Neutrals / bg / ink | local `--bg/--ink/--bg-2/3` | glass-ui warm-cream `--neutral-*` / `--foreground` |
| Type stack | local Helvetica + CDN IBM Plex | glass-ui Fraunces + Jakarta + Fira (self-hosted) |
| Chips / badges / dots | GradeChip + dev-chip + LeanBadge (3 idioms) | glass-ui `Badge`/`StatusDot` |
| Glass | dead `.glass-panel` orphan | glass-ui `.glass-*` ladder (overlay band only) |
| Lean L/N/R colors | `blue-500/slate-500/red-500` | shared `--ai-blue` / `--muted` / NCSU-red |

Screenshots saved at `/Users/mkbabb/Programming/glass-ui/cohesion-xray-home-dark.png`, `/Users/mkbabb/Programming/glass-ui/cohesion-xray-methodology-dark.png` (XRAY brutalist blue-on-black), `/Users/mkbabb/Programming/glass-ui/cohesion-xray-home.png` (slides deck — warm cream + Fraunces + NCSU-red reference), `/Users/mkbabb/Programming/glass-ui/glass-ui-intro.png` (warm-cream aurora reference). XRAY dev server left running on `http://localhost:5190` (background id `biq98ia9l`); the API backend on :8000 is down so data pages render empty (chrome still valid).

---

### Lane 6

I now have a complete, grounded picture of both the source idiom and the slides' current implementation. I have everything needed to write the brief.

---

# AW/H Lane "nutrition-label-extract" — Design Brief

## What I read & saw

**Source app** (`/Users/mkbabb/Programming/AI-Nutrition-Label/frontend/src`): ran it live on :5180, captured the Home page (dark) and DevLogin (light) — plus full source read of every named SFC + `tokens.css`. **Slides target** (`/Users/mkbabb/Programming/slides`): both `SlideXray.vue` and `SlideNutrition.vue` already exist and are well-built; `deck.css` already ships a `.nutrition-label` panel grammar.

## The source design idiom (ground truth)

The header in `tokens.css:8` is explicit: **"Glassmorphism tokens from the previous design are intentionally omitted."** The live app is **NOT** glassmorphic and **NOT** NCSU-red. It is an **editorial broadsheet / FDA-nutrition-label print idiom**:

**Typography** (`tokens.css:24-27`): display is `Helvetica Neue` (heavy compressed sans, `font-weight:900`, negative tracking `-3px` on the hero — `Home.vue:262-265`), data/labels are `IBM Plex Mono` with `letter-spacing:0.12-0.18em` uppercase kickers, signature is `Caveat`. No serif. The whole system is sans-display + mono-label.

**Palette**: dark default + light theme via `[data-theme]` on `<html>`. Light = warm-cream paper `--bg:#f5f4ee`, black ink `#0a0b0a` (`tokens.css:48-64`). The **accent is BLUE `#60a5fa`** (`tokens.css:13`), used as a solid highlight-marker block behind text (`Home.vue:269-274` `.hero-title-accent` — blue box, black text) and as the grade-chip fill. Signals: `--fail:#ef4444`, `--warn:#f59e0b`.

**Structural language — the load-bearing motif is the RULE**: everything is built from black hairlines and heavy bars, not cards/shadows.
- `bar-thick` = 6-8px solid-ink full-bleed bar (`NutritionLabel.vue:238-242`) — the food-label signature rule.
- `rule-med` = 2px ink; `rule-hair` = 1px `--rule-hair` (`NutritionLabel.vue:243-252`).
- Panels are `border:2px solid var(--ink)` with zero radius (`NutritionLabel.vue:184-194`, `DimensionCard.vue:48`, `BenchmarkRun.vue:320-325`) — hard square corners, no shadow.
- Topbar + stats band + features grid are full-bleed **hairline-divided cells** (`Home.vue:417-432` stats band has `border-top/bottom:2px solid ink`, cells `border-right:1px hairline`; `TopBar.vue:212-244` tab cells).

**The label/grade/gauge/figure vocabulary**:
- `NutritionLabel.vue` = the centerpiece. AI Facts kicker → giant model name (34px/900) → bar-thick → "Benchmark · serving" mono row → giant **overall score** (56px/900 tabular) sitting beside a **square grade chip** (52×52, 2px ink border, blue fill, black letter — `:302-315`) → bar-thick → "Dimension / Weight / %Score*" mono column header → hairline-divided dimension rows with tabular figures → bar-thick → mono footnote.
- The active grade rendering is the **square ink-bordered blue tile**, NOT the `GradeChip.vue` pill. **`GradeChip.vue` (rounded pill, `bg-grade-success/20`) and `ScoreGauge.vue` (conic-gradient ring) are STALE legacy** from the abandoned glassmorphic layer (`main.css:13-16` `.glass-panel`, `bg-slate-950`) — they reference Tailwind tokens that no longer exist in the live token set. Do **not** model the slides on them; the print-label is canonical.
- `RadarChart.vue` is a clean dashed-ring SVG (mono 9px uppercase axis labels, `--rule-hair` grid, series polygons at `fill-opacity:0.15`) — pure line-art, on-idiom.
- Tabular figures everywhere (`font-variant-numeric:tabular-nums`), mono for all metadata.

**Animated background** (`AnimatedBG.vue`): a 2D-canvas data-substrate — faint 60px grid, sliding "data bars", rising mono `%` markers, **drifting nutrition-label outline rectangles** (stroke rects with horizontal rule lines + a blue corner tag — `:137-172`), bottom vignette for legibility. `prefers-reduced-motion` → one static frame (`:185-188`). It is a low-contrast editorial texture, never a hero.

## Design diagnosis (source → slides)

The source idiom and the slides idiom are **two different newspapers printed on the same press**. They share the deep structure — **rules over cards, mono labels, tabular figures, a heavy top rule on the label, a two-column field/value grid, a focal accent reserved for one event** — but differ in surface skin: source = Helvetica/blue/dark-default/square-hard-borders; slides = Fraunces+Newsreader / NCSU-red / cream-glass / `--radius-lg` / `light-dark()`.

The slides' existing `SlideNutrition.vue` **already absorbs the idiom correctly and idiomatically** — it re-expressed the FDA panel into the slides' own tokens (Fraunces head, Newsreader rows, `--ncsu-red` trip-line, `--hairline` rows, the reused delta-bar / pulse-dot / node-glyph atoms), with the `.nutrition-label` panel chrome in `deck.css:684-722`. This is exactly the "re-express via @theme/tokens, never paste raw" + "presets-in-consumers" discipline. **It should not be reskinned toward Helvetica/blue** — that would import the source's surface and break deck cohesion.

The **real H-tranche opportunity** is convergence + the two craft gaps the source nails that the slides version under-uses:

1. **The HEAVY-BAR signature is missing.** The source's most recognizable move is the full-bleed `bar-thick` solid-ink bar segmenting the label (`NutritionLabel.vue:238`). The slides panel uses only a 2px top rule + hairlines — it reads as a generic bordered card, not a "nutrition facts" label. Adding the heavy mid-bar (header→body and body→DV separators) is the single highest-leverage cogency fix, and it's a pure token composition (`--foreground` bar), no new primitive.

2. **The two slides don't share a "data-window" chrome.** `SlideXray.vue` hand-rolls a faux-browser window (`.window`, `.window__bar`, traffic dots, LIVE pulse — `:95-116`, styled `:163-220`) reading `--portal-*` tokens. The source's `AnimatedBG` drifting-label-outline motif and the XRAY window are the same family ("a live data surface, framed"). There's no shared primitive; the portal chrome is XRAY-only. If a second consumer emerges (a future "live leaderboard" or "live label feed" slide), it's a ≥2-consumer extract candidate — **today it is correctly slide-local** (one consumer = no premature primitive, per L invariant 8).

3. **glass-ui is barely consumed in these two slides.** Both are raw SFCs. The `MetricBadge` / `MetricCell` / `MetricStack` / `StatusDot` / `Separator` families in glass-ui map almost 1:1 onto the label's figure-rows, the cadence pulse dot, and the rule dividers. The slides currently re-implement these (`.nl-cadence__dot` keyframe `:264-275` duplicates a status-dot pulse; `.nl-tab` tabular figure duplicates MetricBadge's job). Consuming glass-ui here removes duplication and is the stated H goal.

## Wave-seed (AW/H)

Plain, audit-grounded, each ≥2-consumer or token-only or formally slide-local:

- **H.W0 — heavy-bar label signature (token-only).** Add the full-bleed solid-`--foreground` `bar-thick` rule to `.nutrition-label` in `deck.css` (header/body and body/DV segment separators), mirroring `NutritionLabel.vue:238`. Pure token composition, no new `--*`, no primitive. Highest cogency-per-line. Apply to `SlideNutrition.vue` only (1 consumer = a slide-local recipe, not a primitive).

- **H.W1 — consume glass-ui `StatusDot` for the cadence/live pulse.** Replace the bespoke `.nl-cadence__dot` + `@keyframes pulse-dot` (`SlideNutrition.vue:264-275`) AND the XRAY `.status__dot` + `@keyframes portal-live` (`SlideXray.vue:212-215`) with `StatusDot` from `@mkbabb/glass-ui` (root barrel) tinted via `--phase-color`/token override. **Two consumers** → legitimate de-duplication, and it retires two near-identical keyframe blocks. Verify the pulse envelope matches before/after (binding-verification note: confirm StatusDot's pulse variant exists; if not, this stays a shared deck-local `.pulse-dot` utility in deck.css consumed by both slides — still ≥2 consumers, no new lib primitive).

- **H.W2 — consume glass-ui figure primitives for the label rows.** Map the tabular figure rows (`.nl-tab`, `.nl-dv__fig`, the records-checked / confidence rows) onto `MetricBadge`/`MetricCell` (subpath `/metric-cell`, `/metric-badge`) where the figure+label pairing matches. Audit first: only adopt where the primitive's affordance fits the row (the DV headline figure is a strong fit; the prose rows are not). Drop the row-local font/tabular CSS that the primitive already owns. Reduces `SlideNutrition.vue` scoped CSS.

- **H.W3 — XRAY window cohesion pass (slide-local, no extract).** Tighten the faux-browser chrome (`SlideXray.vue:163-220`) for design cogency with the label: the source's drifting-label-outline motif (`AnimatedBG.vue:137-172`) is the same "framed live data surface" family — bring the window's address-bar/status rhythm into the mono ladder already used by the label footer (`--type-admin-label`, `--font-mono`). Keep it slide-local (one consumer). Document the ≥2-consumer extract trigger inline: IF a second "live data window" slide lands, THEN extract a `<DataWindow>` deck primitive — not before.

- **H.W4 — retire the stale source-side legacy (source-repo cleanup, optional).** Flag `GradeChip.vue` + `ScoreGauge.vue` + `main.css` `.glass-panel` in the Nutrition-Label repo as dead glassmorphic-layer orphans referencing removed Tailwind tokens (`bg-grade-success`, `shadow-glass`, `bg-slate-950`). Out of slides scope, but the extraction surfaced them — note for the source repo's own overfitting audit.

**Cohesy verdict:** the slides already speak the nutrition-label LANGUAGE correctly in the deck's own dialect — do not reskin toward Helvetica/blue. The work is (a) the missing heavy-bar signature (H.W0, biggest win), (b) replacing duplicated dot/figure CSS with glass-ui primitives (H.W1-W2, the de-duplication mandate), (c) a slide-local cohesion pass on the XRAY window (H.W3) with the extract-trigger documented, not pre-built.

**Live screenshots captured (then cleaned up):** Home/dark confirmed the broadsheet grid + blue highlight-marker + ledger stats band; DevLogin/light confirmed the cream-paper inversion + full-bleed hairline topbar with numbered mono tab cells + boxed-blue `X` brand-mark.

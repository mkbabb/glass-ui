# AS.W5 design slice — the constellation primitives glass-ui OWNS

**Additive to AS.md §Wave sequence / §Folded ledger. Authored 2026-06-03 from the constellation grand-audit (`value.js/docs/tranches/K/audit/visual-evidence-2026-06-02/grand-audit/MASTER-FINDINGS.md` §A/§B/§C/§E).** This slice grounds — at glass-ui `file:line` — the cross-cutting primitives the grand-audit's §B owner-matrix assigns to glass-ui, each with its consuming repos and the chronic-age it closes. It does NOT rewrite the AS plan; it is the design detail for the AS-GU bundle already routed to **AS.W5** (the ≥2-gated AS-GU re-derivation), with G4/G1/G2 already routed to **AS.W3/W4**. Every item is a glass-ui-owned primitive or token; consumer arms are NAME-FORWARDED under inv-16 (glass-ui writes only glass-ui).

The grand-audit's headline finding is the AS thesis confirmed from the outside: **the "8 glass-ui primitive asks" (A→I, age 6-7) collapse to ~4 TRUE net-new** — `deriveAurora` · Configurator `asideSide` · Metaballs+BlobDot · `useTextHighlight` — plus 2 absent CSS levers (interpolate-size/calc-size, relative-color). Everything else (the OKLab color stack, `startViewTransition`, `useYieldToMain`, the `useSpring` family, `linear()` tokens, the 44px floor, native Popover, `@property`, container size-queries, `@starting-style`, content-visibility) ALREADY SHIPS — the chronic was adoption, not absence. This slice's discipline: **no double-mint of landed substrate** (inv J-10 / L-8); each net-new item is gated ≥2-consumer-or-demo-or-not-shipped against HEAD.

---

> **CONSTELLATION DEC-1 (2026-06-03, user-ratified) — re: P1 `asideSide`.** The
> configurator side stays **RIGHT constellation-wide** (the inspector idiom). P1
> ships `asideSide` as a **reversible capability defaulted to `'right'`**, NOT to
> drive a mandated fourier flip — fourier's LEFT flip is an **optional, one-prop,
> user-taste** switch (its PRIMARY fix is composing its empty-state void with
> controls staying RIGHT). The load-bearing, unconditional part of P1 is the
> **`asideWidth`/`--configurator-aside-min` token band** (muster's CLS-fence
> carrier; value.js dual-pane) — that ships regardless. P1's ≥2-consumer gate is
> met by the *token* consumers (muster + value.js + speedtest) independent of any
> side flip.

## §1 — The owned-primitive ledger (grounded at glass-ui HEAD = 3.1.1)

Disposition vocab — **SHIP→wave** (net-new, ≥2 live consumers witnessed) · **BOOK→trigger+owner** (≥2 gate not yet met) · **KILL** (no glass-ui lever / terminal) · **ADOPT-CHECK** (ships; verify no consumer shadows it).

| # | Primitive | glass-ui HEAD evidence (verified) | Net-new vs adoption | Consumers (§B) | Chronic-age it closes | Disposition |
|---|---|---|---|---|---|---|
| **P1** | **Configurator `asideSide:'left'\|'right'`** (+ `asideWidth`/`--configurator-aside-min` token band) | `Configurator.vue:49-70` props have NO `asideSide`/`order`/`dir`; aside hard-locked by `grid-cols-[minmax(0,1fr)_minmax(280px,360px)]` (`:104`) + `lg:border-l` (`:131`) + stage-before-aside DOM order (`:122-191`). The KEYSTONE. | **net-new prop** (story `manifest.ts:105` exists) | fourier (controls-LEFT mandate), muster (placeholder track), speedtest (re-founding), value.js (dual-pane downstream) | configurator-side contested in 3-4 repos (fourier RIGHT→LEFT · muster F's 4 approaches · speedtest re-founding); A→I, the keystone | **SHIP→AS.W5** — must-land-before fourier's flip wave |
| **P2** | **`deriveAuroraFromColor(css\|OklchStop, stopCount)→OklchStop[]`** producer + OKLab-LUT bake composable | `color.ts:78` `oklchToLinear`, `:90` `flattenPalette`, `:125` `paletteToCssGradient`, `:142` `hexToOklchStop`, `:166` `cssToOklch` ALL SHIP; `presets.ts:4` ships Sky/Dawn/Meadow/… palettes; `AuroraConfig.palette:OklchStop[]` ships (`presets.ts:70`). The ONLY gap: no one-color→N-stop L/C/h-spread producer. The twin-chronic root. | **net-new** composing-helper (low-level math ships — a no-op re-impl is FORBIDDEN, inv J-10) | value.js (C2/K.W4 = the 2nd live adopter), muster, speedtest (hand-rolls the equivalent in `useSpeedtestAuroraConfig`) | the single LONGEST chronic — glass-ui 3 (AO→AR) + value.js 4 (G→J) tranches | **SHIP→AS.W5 ONLY-IF live ≥2** (value.js K.W4 clears the gate); else value.js executes the VAL-1 KILL |
| **P3** | **Metaballs (WebGL) + BlobDot (SVG watercolor)** family | `manifest.ts` = 21 stories, ZERO blob/metaball; `grep metaball src/` → only aurora `DESIGN.md` + a configurator-state file (no primitive). value.js carries TWO blob systems locally (WebGL goo-blob + CSS watercolor-dot). | **net-new** public surface | value.js (goo-blob + watercolor-dot, C3), bbnf-buddy (mascot physics), keyframes.js (physics driver) | blob-extirpation A→J 7+ tranches (C3) | **SHIP→AS post-v1.0.0** (net-new public surface ships AFTER value.js K.W6); owns footprint==render-resolution + corner-anchor token + PRM single-frame |
| **P4** | **`useTextHighlight`** (CSS Custom Highlight API wrapper) | `grep 'CSS.highlights\|::highlight\|new Highlight' src/` → **0**; glass-ui's own `FuzzySearch.vue:113,143` hand-rolls `<mark>`-splitting (DOM mutation). | **net-new** leaf on `/motion-core` | fourier (equation vars), words (search marks), glass-ui (retires its own FuzzySearch `<mark>` splitter) | net-new; retires the `<mark>`-injection legacy across 3 sites (≥2 real + glass-ui's own) | **SHIP→AS.W5** (glass-ui authors FIRST) |
| **P5** | **Self-hosted Fraunces `@font-face`** (opsz+SOFT+WONK variable woff2 + Capsize fallback) via `@mkbabb/glass-ui/styles/fonts` | `fonts.css:80-138` self-hosts Plus Jakarta Sans + Fira Code but ships NO Fraunces face; `typography.css:98` applies `--font-display-variation-settings: "WONK" 1, "SOFT" 0` → SILENTLY INERT (no face carries the axes). Consumers load an axis-incomplete CDN subset. | **net-new** @font-face | value.js, words, slides (each currently loads an axis-incomplete Google-Fonts CDN subset) | Fraunces-axes-never-engaged — glass-ui SPECIFIES WONK/SOFT but ships no face, inert in 3 apps (the WC-design highest-impact/lowest-risk lever) | **SHIP→AS.W5** — mirror the Plus-Jakarta/Fira pattern at `fonts.css:80` |
| **P6** | **Dock tokens** — `--dock-fg-on-aurora` legibility (net-new) · DockIconButton 44px coarse floor (ships) · `--dock-motion-*` compositor-only (ships) · `@starting-style` dock-layer enter (consumer-owned) · DockIconButton `as`/`asChild` (net-new) | 44px floor SHIPS (`dock.css:1075-1083`, `@media(pointer:coarse)` lifts `--dock-control-size`/`--size-icon-btn` to `--dock-touch-target` 2.75rem). `--dock-motion-{fast,standard,resize}` SHIP (`dock.css:20-22`, consumed `:185-220`). `--glass-opacity-dock:0.42` ships (`tokens.css:620`) but NO `--dock-fg-on-aurora` token → dark-over-aurora fg can drop below contrast. | **mixed**: 44px/motion = adoption-check; `--dock-fg-on-aurora` + `as`/`asChild` = net-new | value.js (C1), slides (routed Home control), bbnf-buddy, fourier, muster | DockIconButton 44px floor AQ→AP→AR age 3 (S-2); dock-over-aurora legibility | **44px/motion: ADOPT-CHECK** (verify no consumer shadows `--dock-control-size` below floor) · **`--dock-fg-on-aurora`: SHIP→AS.W5** (couples to the C2 aurora-derive wave) · **`as`/`asChild`: SHIP→AS.W5** (slides routes via a RouterLink workaround) |
| **P7** | **Mascot / monogram-pose primitive** (the shared orange-sun + pencil-boil family) | `glyph-face.ts`/`disco-glyph.ts`/`AnimatedDigit` ship (`src/index.ts`, `DiscoGlyph.vue`) but NO mascot; bbnf-buddy `MascotMonogram.vue` + `useMascot.ts` is bespoke; the skin recurs in sudoku/fourier. | **net-new** over the glyph-face family | bbnf-buddy (MascotMonogram), fourier, sudoku (share the skin) | shared orange-sun + pencil-boil skin with no glass-ui home (3 repos) | **BOOK→trigger: bbnf 2.0→3.1.1 bump; owner: glass-ui** (serial after the bump — the lift is a MOVE not a rewrite once bbnf is on HEAD) — **OWNER QUESTION, see §4** |
| **P8** | **VT helper `.ready` rejection hardening** + ship the helpers consumers need | `useViewTransition.ts:91-94` swallows `vt.finished` (`.then(()=>undefined, ()=>undefined)`) but NEVER touches `vt.ready` → on rapid re-trigger `vt.ready` rejects ('Transition was skipped') and leaks a `pageerror` (the speedtest AT-R2 / dock leak). | **hardening** of a shipped primitive | speedtest (must-land-before AT-R2), fourier (cross-page VT widening), keyframes.js (scene-swap), slides (home↔deck), words, muster, value.js dock | VT-rejection-leak chronic | **SHIP→AS.W5** — attach `vt.ready.catch(()=>{})` beside the existing `.finished` swallow; must-land-before speedtest AT-R2 |

> **Already-shipped, adoption-only (NOT in this net-new ledger, recorded so they are not re-minted, inv J-10):** `startViewTransition` (`.finished` swallow), `useYieldToMain`, the `useSpring` family, `linear()` spring tokens (`--spring-{smooth,snappy,bouncy,gentle}`), the 44px floor, `@property`, container size-queries, `@starting-style`, `.deferred-section` content-visibility, `light-dark()` tokens, `--section-color-*` jewels, `--muted-foreground-strong`, native Popover/dialog top-layer. The grand-audit confirms ALL present — pure consumer adoption (MASTER-FINDINGS §C "Adoption-gap").

---

## §2 — The chronic CSS levers (already routed; this slice grounds them against HEAD)

These three fold onto the existing AS.W3/W4 leverage waves; the grand-audit re-confirms each consumer.

| Lever | grand-audit tag | glass-ui HEAD evidence | Consumers (§B/§D) | Routed wave (already in AS.md) |
|---|---|---|---|---|
| **G4 `scheduler.postTask` priority lanes** | G4 chronic AQ→AR age 2 | `useYieldToMain` wraps only binary `scheduler.yield()`; no typed `user-blocking`/`user-visible`/`background` posting. | value.js (slider-gradient), fourier (hot path), muster (hot paths), words, keyframes.js | **AS.W3** (`usePrioritizedTask`/`postTaskSafe` on `/motion-core` + `TaskController` + `MessageChannel` fallback; the `postTask` `@supports` is the 3rd guard → consolidate to `platformSupport.ts`) |
| **G1 `@container style(--density)` queries** | G1 chronic AQ→AR age 2 | dock/chassis tier re-declares tokens per-selector (the 44px-floor specificity war at `dock.css:1075-1083`). | value.js (picker pane), speedtest (gauge), muster (shipped), slides (letterbox) | **AS.W4** (`@container style(--density:…)` over kept `[data-density]` via `:where()` flat specificity) |
| **G2 `@container scroll-state(scrollable)` overflow-fade** | G2 chronic AQ→AR age 2 (RE-SCOPED) | the overflow-fade JS scroll listener in `useGlassCarousel`. | (glass-ui-internal carousel; embla kept on the OTHER carousel as drag-physics fallback) | **AS.W4** (retire the listener; `scrollable` not snapped/pager — wrong primitive, 0 consumers, per AS.W0 L6) |

> **Additional absent CSS levers the grand-audit assigns to glass-ui (already in AS scope):** **interpolate-size / calc-size(auto)** migration of the 0fr↔1fr collapse hack (`ConfiguratorLayer.vue:31`; value.js Dock action-bar copies it) — glass-ui migrates FIRST w/ `@supports` fallback, THEN value.js retires its copy. **relative-color `oklch(from …)`** token recipe for CSS-tier tints (dock hover, accent washes, scrim) — deletes the canvas-2d `cssToRgb` probe (`color.ts` `_parseCtx`). Both are net-new CSS levers in the §C ledger; route under AS.W4/W5 as opportunistic-SFC touches where a consumer is witnessed, else NAME-FORWARD (no speculative migration).

---

## §3 — Serial constraints (the spine — who-before-whom)

The grand-audit §E "serial spine" confirmed against HEAD. glass-ui primitives land BEFORE their consumers; the already-shipped helpers + the deploy/CSP standard are independent adoptions.

| Primitive | Serial constraint | Gate |
|---|---|---|
| **P1 asideSide** | must-land-before fourier's flip wave; flip via grid-column placement + border-side, NOT DOM reorder (preserve tab order — visual flip with NO a11y regression); keep mobile `grid-cols-1` | ≥2 met (fourier + muster + speedtest + value.js) — SHIP AS.W5 |
| **P2 deriveAurora** | must-land-before value.js K.W4; low-level color stack ships; value.js K.W4 IS the 2nd live consumer (after speedtest's hand-rolled equivalent) | ≥2 met ONLY at K.W4 — SHIP-OR-VAL-1-KILL |
| **P3 Metaballs+BlobDot** | ships AFTER glass-ui v1.0.0 (= value.js K.W6); net-new public surface | post-v1.0.0 |
| **P4 useTextHighlight** | glass-ui authors FIRST; ≥2 real (fourier + words) + glass-ui's own FuzzySearch = 3 sites | ≥2 met — SHIP AS.W5 |
| **P5 Fraunces face** | independent (glass-ui references Fraunces but ships no face) | 3 consumers — SHIP AS.W5 |
| **P7 Mascot** | serial AFTER bbnf 2.0→3.1.1 bump (the lift is a MOVE once bbnf is on HEAD) | BOOK on the bump |
| **P8 VT `.ready` harden** | must-land-before speedtest AT-R2 + keyframes scene-swap VT | hardening — SHIP AS.W5 |

---

## §4 — Open questions (maintainer/owner decisions)

1. **Cross-repo ordering ratification.** The serial spine (§3) assumes glass-ui ships P1/P2/P4/P5/P8 at AS.W5 and P3 at post-v1.0.0 BEFORE the consumer flips (fourier J, value.js K.W3/K.W4/K.W6, speedtest AT-R2). AS.W2 (gate-integrity, tooling-only, no publish) lands first; the AS-GU bundle folds into the **3.2.0 minor** at AS.W6. Does the 3.2.0 publish gate the consumer waves, or do consumers adopt against a local `file:` link pre-publish? (The AS.md §Cross-repo perimeter item 1 names 3.2.0 as the end-to-end #177-repair proof; the consumer adoption cadence is unstated.)

2. **P7 Mascot ownership.** Is the shared orange-sun + pencil-boil mascot a glass-ui primitive (lifted over the glyph-face/disco-glyph family) or does it stay bbnf-local? The skin recurs in 3 repos (bbnf-buddy/fourier/sudoku) with no shared home; the lift is serial-after the bbnf 2.0→3.1.1 bump. **Propose: glass-ui owns it** (consistent with the glyph-face family already living in glass-ui), gated on the bbnf bump as the ≥2nd consumer. Maintainer confirm.

3. **P3 Metaballs color-resolver injection.** The grand-audit specifies the color-resolver is INJECTED (no value.js default) — glass-ui owns footprint==render-resolution + corner-anchor + PRM single-frame, but the CSS-color→RGB resolver is the consumer's (value.js injects its 1x1-canvas resolver; glass-ui's own `cssToRgb` at `color.ts` is a candidate but couples aurora's canvas-2d probe into the blob primitive). Confirm the resolver stays consumer-injected.

4. **Constellation `proof:*` inconsistency (RECORDED, glass-ui's call — NOT imposed).** value.js retired its grep-based `proof:*` invariant fleet as "overfit junk" (value.js MEMORY [[feedback-proof-idiom-retired]], 2026-06-02), enforcing invariants structurally (types + tsc/eslint + review). **glass-ui's open AS tranche is the OPPOSITE bet** — AS.W2 is *hardening* its own `proof:*` gate fleet into a pure, sibling-portable substrate (`constellation.mjs`/`gates.mjs`/inv-θ). This is a deliberate constellation inconsistency: value.js judges the idiom overfit and structural enforcement sufficient; glass-ui judges the gate fleet load-bearing and worth making sound. **This slice imposes NOTHING on AS.W2 — the gate-integrity work is glass-ui's call.** Recorded as an open question only: should the two repos reconcile the `proof:*` posture, or is the divergence correct (a library substrate warrants binding-correctness gates a consuming app does not)? Lean: the divergence is correct — glass-ui's gates guard a *published public surface* (VT-name collision, phantom-classes, consumer-resolution) that a leaf app has no equivalent of; value.js's retirement was of *app-local* overfit scripts. No action; surfaced for the maintainer.

---

## §5 — Disposition summary (terminal for every grand-audit glass-ui row)

| Item | Disposition |
|---|---|
| P1 Configurator `asideSide` (+ `asideWidth` token) | **SHIP→AS.W5** (keystone; must-land-before fourier flip) |
| P2 `deriveAuroraFromColor` + OKLab-LUT bake | **SHIP→AS.W5 ONLY-IF value.js K.W4 live ≥2**; else **value.js VAL-1 KILL** |
| P3 Metaballs + BlobDot family | **SHIP→AS post-v1.0.0** (net-new public surface; after value.js K.W6) |
| P4 `useTextHighlight` (Custom Highlight) | **SHIP→AS.W5** (retires FuzzySearch `<mark>` splitter) |
| P5 self-hosted Fraunces @font-face (opsz+SOFT+WONK) | **SHIP→AS.W5** (mirror Plus-Jakarta/Fira pattern) — consumers = **value.js + words** (slides DROPPED per constellation DEC-8: slides font final as-is; ≥2 gate still met) |
| P6 `--dock-fg-on-aurora` + `as`/`asChild` | **SHIP→AS.W5**; 44px floor + `--dock-motion-*` **ADOPT-CHECK** (already ship) |
| P7 Mascot / monogram-pose primitive | **KILLED (constellation DEC-3, 2026-06-03, user)** — the bbnf-"b" / orange-sun / sudoku mascots are *disparate* (they share a pencil-boil **skin**, not a **shape**); NO glass-ui mascot primitive, NO new `@mkbabb/mascot` package. Shapes stay app-local; the skin/physics + the mid-session reactive-PRM-teardown fix stay in `@mkbabb/pencil-boil`. §4.2 resolved: glass-ui does NOT own it. |
| P8 VT `.ready` rejection hardening | **SHIP→AS.W5** (must-land-before speedtest AT-R2) |
| G4 `scheduler.postTask` priority | **SHIP→AS.W3** (already routed) |
| G1 `@container style(--density)` | **SHIP→AS.W4** (already routed) |
| G2 `@container scroll-state(scrollable)` | **SHIP→AS.W4** (already routed; overflow-fade, not pager) |
| interpolate-size/calc-size · relative-color `oklch(from…)` | **AS.W4/W5 where consumer witnessed; else NAME-FORWARD** |

> **No perpetual punts.** Every grand-audit glass-ui row above carries a terminal disposition (SHIP→named wave · BOOK→trigger+owner · KILL-on-gate-miss). The net-new surface (P1/P2/P4/P5/P6-tokens/P8) folds into the **3.2.0 minor** at AS.W6; P3+P7 ship post-v1.0.0 / post-bbnf-bump as named-forward public surface. This slice adds NO source change — it is the AS.W5 design detail for the AS-GU bundle, grounded at glass-ui HEAD.

---

## §6 — P9: the fourier configurator-square ROOT CAUSE (grounded live 2026-06-03, user-flagged)

User: fourier's configurator + inner sections render with **square corners** ("non-rounded edges … not correct; fix at the root, glass-ui or fourier"). Grounded on live fourier `:5260` via computed-style probe + source read. **Two compounding causes, BOTH glass-ui-owned:**

1. **`rounded-panel` utility does not resolve in the consumer build (the dominant cause).** `.configurator` carries `rounded-panel` (`Configurator.vue:102`) but computes **`border-radius: 0px`** on fourier — while the *token* `--radius-panel` (12px) DOES resolve. fourier `@import "@mkbabb/glass-ui/styles"` and has **no** local `.viz-configurator` radius override (`VisualizationView.vue:296-348` sets only flex/margin/grid). The gap: `rounded-panel` is a Tailwind-v4 `@theme`-derived utility (`theme.css:223` `--radius-panel` inside `@theme`) **used only inside glass-ui's own components** — Tailwind emits a utility rule only when the BUILD scans the file that uses it, and a consumer's content-scan does not include glass-ui's `node_modules` `.vue` files. So the token ships but the utility *rule* is never emitted in the consumer → **every glass-ui-component-used utility class is a silent no-op across ALL consumers** (not fourier-specific; likely the cause of other silently-unstyled glass-ui surfaces constellation-wide).
2. **ConfiguratorLayer "no per-section radius" policy.** `ConfiguratorLayer.vue:98` deliberately keeps inner sections flush/square ("rounding owned at the container root clip"). With (1) zeroing the root clip's radius too, the inner content reads doubly-square.

**Root fix — glass-ui (owner), P9, SHIP→AS.W5 (no workaround):**
- (a) **Ship component-utilities build-independently.** The distributed `@mkbabb/glass-ui/styles` must EMIT the utility *rules* glass-ui's own components depend on (`rounded-panel` + the audit-implied siblings) as static CSS in the shipped stylesheet (`@utility`/`@layer` rendered into the dist `./styles` entry unconditionally), NOT rely on the consumer's Tailwind to regenerate them. (`utilities.css:102` already holds the `var(--radius-panel)` rule — the fix is guaranteeing it lands in the consumer-facing entry, build-independent. A documented `@source "../node_modules/@mkbabb/glass-ui"` is a fallback, but consumers import CSS — they should not have to scan glass-ui's components; the build-independent ship is the root fix.) **Highest-leverage: this likely repairs other silently-unstyled glass-ui surfaces across the constellation, not just the configurator.**
- (b) **ConfiguratorLayer content rounding** (the P5 chronic, now rooted): round CONTENT — clip content to the panel's rounded corners; round standalone content cards (the fourier upload dropzone) + the panel's first/last section so nothing reads square inside the rounded panel. Keep flush `border-b` dividers BETWEEN list rows (the hairline concern of `ConfiguratorLayer.vue:98` stands for dividers), but the user rejects the squared CONTENT look — round it. This supersedes the flush-square policy for content.

**fourier side (consumer, J.WC §F · P5):** once (a) lands, `.configurator` rounds (12px) with **no fourier change** (no `@source` needed if glass-ui ships build-independent CSS); fourier verifies via the π before/after (rounded configurator). P5 is satisfied-on-adopt by P9. The DEC-1 void-fix + this P9 rounding together are fourier's W5 configurator polish — controls stay RIGHT, rounded, void composed.

**Disposition:** P9 **SHIP→AS.W5** (folds into 3.2.0). It is the grounded root of the chronic P5 + a likely constellation-wide consumer-styling repair. (W8 deep-dive glass-ui + fourier agents corroborate.)

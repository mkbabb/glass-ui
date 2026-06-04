# AT.W0 Lens L4 — the deferred + chronically-deferred ledger (the FOLD)

The terminal disposition for EVERY deferred / chronic / named-forward / watched /
booked item carried into AT, the successor to AS (closed at **3.2.0**, HEAD
`06b35d9`). Each item is verified against HEAD source (grep `file:line`), the AS
record (`FINAL.md`, `AS.md`, `W0b-path-forward.md`, `W6-postpublish-verify.md`,
the two W0/W0b deferred ledgers), and the sibling repos read-only (value.js,
muster, speedtest, fourier, words, slides). **Disposition vocabulary:**

- **AT-WAVE** — folds + executes in AT (clears the ≥2-distinct-consumer bar NOW, OR
  is correctness/hygiene, OR is the user-ruled AT headline).
- **BOOK** — named-forward, carried, with a CONCRETE graduation trigger (≥2-consumer
  convergence, Baseline-Widely, or a sibling-arm landing). Glass-ui holds the lever
  but the gate is not met at HEAD.
- **KILL** — terminal, no glass-ui lever or ratified dead. Stop tracking.
- **USER-DOMAIN** — cross-repo / submodule; glass-ui writes only glass-ui (inv-16),
  so the item is the owning arm's, recorded not absorbed.

"≥2 distinct consumer CONTEXTS" = ≥2 distinct repos/surfaces, NOT 2 call-sites in
one demo (the binary-substrate invariant, J inv 10; convergence not census).

## §0 — The frame: what AS left, what the user ruled

AS shipped its whole W2-W5 implementation set (`d2d1d0b` + `8c0cced`) and published
3.2.0 through the repaired CI. The AS W0b/W6 redux already FOLDED everything
shippable-at-the-time; the AT residual is three buckets:

1. **The AT headline (user-ruled, 2026-06-04 prompt):** lift `goo-blob` +
   `watercolor-dot` from value.js's demo into glass-ui subpaths with a REQUIRED
   injected color-resolver seam (inv-K-3 — no value.js default baked in). Plus the
   D1 OKLCh GLSL shader that backs the goo-blob. **This is the AT-WAVE headline.**
2. **The two HEAD findings AS.W6 surfaced** (DataTable vueuse root-barrel leak +
   `supportsPostTask` thin witness) — explicitly named "AT, not 3.2.1."
3. **The booked + chronic + watched ledger** — the BOOK backlog from
   `W6-postpublish-verify.md §follow-up`, the DDR-AS-RC-2 bundle, the W-ASKS, the CSS
   levers, the demo-gated pilots, the watched conditions, and the two terminal kills.

The **P5 = OUTER-ONLY rounding** question the AS.W6 punch-list flagged as
"decision-needed" is **RESOLVED by the user**: AS.W7 was right, fourier adjusts on
its side, NOT a glass-ui change. It is therefore **KILLed from the glass-ui ledger**
(no glass-ui lever; the decision is made). It does not appear as a live AT item.

## §1 — HEAD verification of the headline + the two AS.W6 findings

| Claim | HEAD reality | cite |
|---|---|---|
| `goo-blob` + `watercolor-dot` live in value.js's DEMO (not src) | CONFIRMED. `value.js/demo/@/components/custom/{goo-blob/GooBlob.vue, watercolor-dot/WatercolorDot.vue}` + `goo-blob/composables/useMetaballRenderer.ts` + `goo-blob/shaders/metaball.{frag,vert}.glsl` + `watercolor-dot/composables/useWatercolorBlob.ts`. value.js's PUBLISHED `src/` has ZERO blob code (`find value.js/src -iname '*blob*' = 0`). | value.js demo tree |
| The blob is consumed across MANY value.js demo call-sites | CONFIRMED but NOT distinct contexts. Consumers: `demo/color-picker/App.vue`, `demo/@/components/custom/{mix,palette-browser,panes/BlobPane,dock/Dock,color-picker/visual/HeroBlob}`. ALL inside value.js's ONE demo app → ONE consumer context. | value.js grep |
| glass-ui has NO blob primitive at HEAD | CONFIRMED. `grep -rniE 'goo.?blob|watercolor|metaball|blob.?dot' src/ = 0` matches outside the aurora shader. The only `watercolor`/`metaball` hits are the aurora MEDIUM overlay (`aurora.frag.ts:352 mediumWatercolor`, `runtime.ts:26`) — a fragment-shader medium, NOT a standalone blob component. | glass-ui grep |
| D1 OKLCh GLSL shader is glass-ui-owned | The aurora frag is ALREADY OKLab/OKLCh-aware (`aurora.frag.ts:6` linear-sRGB LUT from `color.ts oklchToLinear`). The goo-blob's `metaball.frag.glsl` is value.js-demo-local and NOT OKLCh-resolved — it bakes value.js's color core. The D1 ask is the goo-blob shader's color path, NOT the aurora frag. | aurora.frag.ts:6 |
| `deriveAurora` already ships (VAL-1 producer) | CONFIRMED. `aurora/composables/color.ts:182 deriveAurora()`, exported `aurora/index.ts:28`, witnessed by `__tests__/derive-aurora.test.ts` (D10b). This is the AS-shipped producer — NOT an AT item; it is the ≥2 *witness pending consumer*. | color.ts:182 |
| DataTable vueuse root-barrel leak | CONFIRMED. `src/index.ts:104 export * from "./components/ui/data-table"` + `DataTable.vue:3 import { useElementSize } from "@vueuse/core"` (`:78` consumes it). A vueuse symbol reachable through the SOURCE root barrel — Design-Axis-6 violation, pre-existing since v1.8.x, NOT an AS regression. No gate enforces vueuse-free-root. | index.ts:104, DataTable.vue:3 |
| `supportsPostTask` thin witness | CONFIRMED. Exported (`utils/platformSupport.ts:23`, re-exported `utils/index.ts:9`) but `usePrioritizedTask.ts` uses `getSchedulerPostTask()` directly (`:38,:104`) — 0 in-repo call sites of the public predicate. | platformSupport.ts:23 |

## §2 — The ≥2-distinct-consumer verdict for the AT headline (the load-bearing finding)

The AT headline asks to LIFT goo-blob + watercolor-dot into glass-ui subpaths. The
binary-substrate invariant (J inv 10) requires ≥2 DISTINCT consumer contexts before
a primitive ships on the public surface. The verification:

- **Consumer #1 — value.js.** Firm: the demo already runs both primitives across 6+
  call-sites (all ONE context). value.js A.W6 + D + F/coordination/Q.md §2 carry the
  STANDING ask "glass-ui must ship `BlobDot` + the metaballs `positionSource` hook"
  (`value.js/docs/tranches/A/audit/W6-deferred.md:22,71`; `G/coordination/Q.md`,
  `F/coordination/Q.md:23` — OPEN, glass-ui-authorship-required). value.js carrying
  both blob systems locally is "legitimate — the home does not exist yet"
  (AS.W0b-L4:49). **This is a real, firm, multi-tranche-aged ask (value.js A→F).**
- **Consumer #2 — muster.** RESEARCH-ONLY, NOT a firm commitment.
  `muster/docs/tranches/F/research/R1-value-js-design-language.md:206,215,241` cites
  `WatercolorDot`/`GooBlob` as a candidate "hero object," but it appears ONLY in a
  design-language survey, never in muster's tranche plan body (`grep GooBlob
  muster/docs/tranches/*/[A-Z].md = 0`). Muster's FIRM glass-ui ask is the
  native-drawer (`K/audit/grand-audit-fold-2026-06-02.md:38`), not the blob.
- **The glass-ui demo (#2 fallback).** A glass-ui demo `<GooBlob>`/`<WatercolorDot>`
  story would be the 2nd context — but a demo story is the SAME pattern AS.W6 called
  out for `/deck`: "the glass-ui demo `<Deck>` story would be greenfield-in-AT" — a
  manufactured 2nd consumer, not an independent convergence.

**Verdict — the headline clears the bar, but on a SPECIFIC reading.** The user
RULED the lift the AT headline (2026-06-04 prompt: "The headline AT ask: lift
goo-blob + watercolor-dot from value.js's demo into glass-ui subpaths"). A
user-ruled headline is its own authorization — it does not wait on a census. The
≥2 is satisfied as: **value.js (the firm producer-consumer, A→F-aged ask) + the
glass-ui demo story (the canonical 2nd context for a deliberately-lifted
substrate)**, exactly as `deriveAurora` shipped at AS.W7 on the demo + speedtest
witness. The honest caveat AT must record: muster's blob interest is design-survey,
NOT a committed 2nd app — so AT ships the primitive on value.js + glass-ui-demo, and
the inv-K-3 injected-color-resolver seam is what makes it NOT a value.js-only
artefact (no value.js default baked in → the primitive is genuinely
substrate-shaped, reusable by muster/speedtest if they converge later).

**This inverts the AS.W6 posture deliberately.** AS.W6 (`W6-postpublish-verify.md:64`)
said the blob lift "is NOT a slipped commitment" and the "9 consumers" were "all
call-sites inside value.js's ONE demo — the ≥2-DISTINCT-consumer bar is not clearly
met." That was correct AS posture (don't react-patch). AT differs because the USER
RULED it the headline and because the inv-K-3 seam is the design move that makes the
lift substrate-correct rather than a value.js-coupling. AT must author this as a
proper tranche plan (a WebGL Metaballs renderer + GLSL + the injected color-resolver
seam) — exactly what AS.W6 said it "warrants" (`:69`).

## §3 — The disposition table (one row per deferred/chronic item)

| # | Item | Origin / chronic depth | HEAD state | **AT disposition** | Wave / gate / trigger |
|---|---|---|---|---|---|
| 1 | **goo-blob primitive** (`GooBlob` + `useMetaballRenderer` + `metaball.{vert,frag}.glsl`) + **D1 OKLCh GLSL** color path | value.js A→F (5+); the AT headline | NOT in glass-ui; lives value.js-demo-local | **AT-WAVE** | AT.W?-blob: new `/goo-blob` subpath + `useMetaballRenderer` composable + GLSL, with the **inv-K-3 injected `colorResolver` seam** (no value.js default baked in). Gate: ≥2 (value.js + glass-ui demo story) + a `proof:no-value-default` assertion that the subpath has ZERO `@mkbabb/value.js` import. The D1 OKLCh shader path is the same wave (the goo-blob frag resolves stops via the injected resolver, not value.js's color core). |
| 2 | **watercolor-dot primitive** (`WatercolorDot` + `useWatercolorBlob`) | value.js A→F (5+); the AT headline | NOT in glass-ui; value.js-demo-local | **AT-WAVE** | Same wave as #1 (sibling primitive, shared injected-color seam). Subpath `/watercolor-dot` (SVG/canvas watercolor medium). Gate: identical to #1. |
| 3 | **DataTable vueuse root-barrel re-export** (Design-Axis-6 leak) | AS.W6 HEAD finding ("AT, not 3.2.1") | `index.ts:104` + `DataTable.vue:3` | **AT-WAVE** | AT correctness wave: make `data-table` subpath-only (the `/data-table` subpath exists) OR swap `useElementSize`→in-house `useResizeObserver`. **AND** add the missing gate: a static-import-graph `proof:vueuse-free-root` that fails closed on `@vueuse/core` reachability from `dist/glass-ui.js`. The gate gap is the real AT value (the leak is build-split-mitigated). |
| 4 | **`supportsPostTask` thin witness** (0 in-repo call sites) | AS.W6 HEAD finding ("AT, not 3.2.1") | `platformSupport.ts:23` exported, unused internally | **AT-WAVE** | AT hygiene: either wire `supportsPostTask()` into `usePrioritizedTask`'s `getSchedulerPostTask` guard (DRY) OR drop it from the public surface. Rides the overfitting-audit at AT close. Trivial; fold into the same correctness wave as #3. |
| 5 | **P5 OUTER-ONLY rounding** (configurator inner-section dividers) | fourier J→AS (chronic); AS.W6 "decision-needed" | `Configurator.vue:130` root clip; inner straight | **KILL** | **TERMINAL — user RULED (2026-06-04): outer-only is canonical, AS.W7 was right, fourier adjusts on its side.** No glass-ui change. Exits the ledger. fourier reconciles its ADOPTION-ASK row (inv-16). |
| 6 | **`/deck` subpath** (+ `--deck-pager-active` token) | slides R33; AS.W6 BOOK | no `/deck` in `package.json` exports (verified) | **BOOK** | Trigger: slides C.W1/C.W3 lands its dock rebuild AND a glass-ui demo `<Deck>` story is the 2nd consumer. Constellation-ordering-2026-06-04:54 names it a still-blocking debt for slides C.W3 — but it is a future-tranche subpath BY DESIGN (slides' own arm gates it). Not AT unless slides C-wave converges during AT. |
| 7 | **Fraunces `@font-face`** (opsz+SOFT+WONK woff2) | grand-audit / AS W0b (the one slipped SHIP) | `typography.css:34-82` self-hosts Plus-Jakarta + Fira Code ONLY; Fraunces is a stack token (`tokens.css:43`) with NO `@font-face`; `typography.css:150` WONK/SOFT axes are SILENTLY INERT (no face carries them) | **AT-WAVE** | ≥2 MET: words (A.W5-P1c live blocked site, `W6-postpublish-verify.md:38`) + value.js (display face). slides DROPPED (DEC-8) but ≥2 holds without it. This is the "slipped ship," not a watch (AS.W0b-L4:123). AT.W?-fonts: mirror the Plus-Jakarta `@font-face` pattern at `fonts.css`, Capsize-calibrate the fallback, wire `--font-display`. Gate: a `proof:font-axes` assertion that every axis `typography.css` references (`WONK`/`SOFT`/`opsz`) is carried by a shipped face. Lowest-risk highest-impact WC lever. |
| 8 | **Drawer `:native` / `GlassNativeDrawer` / `/native-drawer` subpath** (+ `GlassDrawerSnapController`) | AN.W3 (vaul re-snap bug); AS.W6 BOOK | no native-drawer in src (only `Drawer.vue` vaul-vue; `:native` exists on HoverPopover only) | **BOOK → AT-WAVE-CANDIDATE** | ≥2 NAMED: muster (`MobileInstrumentSheet.vue`, FIRM — `muster/K/audit/grand-audit-fold-2026-06-02.md:38,84` "muster does NOT hand-roll regardless") + speedtest (mobile sheet). Both firm, both gated on glass-ui shipping it. **This is the strongest BOOK→WAVE candidate after the headline** — it has a real ≥2 and a concrete bug it retires (vaul-vue `activeSnapPoint`). AT decision: fold IF the AT scope admits a 2nd substrate wave; else BOOK with the muster/speedtest trigger named. Lean **AT-WAVE** (≥2 firm, correctness-retiring). |
| 9 | **`useGlobalDark({ initialValue })`** | speedtest dark-PRIMARY + T7; AS.W6 BOOK | `composables/dark/` has NO `initialValue` (verified) | **AT-WAVE (small)** | Speedtest's dark-PRIMARY needs an SSR/parse-time initial. Additive option arg, no barrel change (`/dark` subpath). ≥1 firm (speedtest) + the FOUC primitive (#10) is its natural pair → ships together. Small, additive, fold into the AT correctness/ergonomics wave. |
| 10 | **FOUC parse-time `darkModeSyncScript()` primitive** | speedtest T7; AS.W6 BOOK | NO `darkModeSyncScript` in src (verified; `tokens.css:1006` only mentions parse-time baking) | **AT-WAVE (small)** | Pairs with #9. A string-emitting helper a consumer inlines in `<head>` to set `.dark` before first paint (no FOUC). On `/dark` subpath. ≥2: speedtest (firm) + words (`light-dark()` dark-mode site). Fold with #9. |
| 11 | **GlassDock `overflow` vs `wrap` clarification** | bbnf-lang playground (`:wrap`); AS.W6 BOOK | BOTH props exist at HEAD: `GlassDock.vue:18 wrap?`, `:70 overflow?: "grow"|"scroll"` | **AT-WAVE (docs/contract)** | NOT a code change — a CONTRACT clarification. `wrap` (multi-line layout) and `overflow` (grow/scroll strategy) are ADDITIVE, not supersede. AT: document the supersede-vs-additive semantics in the dock contract (CLAUDE.md + dock index jsdoc) so bbnf-lang playground migrates `:wrap` cleanly. Zero src risk. Fold into the AT docs pass. |
| 12 | **W-ASK: Button `size="icon-sm"`** | value.js W-ASKS; AS.W6 BOOK | `button/index.ts:36-41` has `default/sm/lg/icon` — NO `icon-sm` | **BOOK** (lean AT-WAVE if value.js K-wave confirms) | 1 firm consumer (value.js compact dock controls). Additive CVA size — trivially additive, no risk. Trigger: value.js K.W4 confirms the call-site count. If value.js + a 2nd (glass-ui dock demo) → AT-WAVE; else BOOK. Lean fold (additive, cheap, the overfitting bar is "exported public" which a CVA variant clears). |
| 13 | **W-ASK: `DockSelectTrigger clampLabel`** | value.js W-ASKS; AS.W6 BOOK | NO `clampLabel` in dock (verified) | **BOOK** | 1 consumer (value.js). A label-truncation prop. Trigger: a 2nd dock-select consumer wants clamp OR value.js's count justifies. Until then 1-consumer → BOOK (substrate-without-2nd-consumer). |
| 14 | **W-ASK: `TooltipContent variant="mono"`** | value.js W-ASKS; AS.W6 BOOK | NO `variant`/`mono` on tooltip (verified) | **BOOK** | 1 consumer (value.js code/value tooltips). A CVA variant. Trigger: a 2nd mono-tooltip consumer. BOOK (1-consumer). |
| 15 | **W-ASK: `Select size`** | value.js W-ASKS; AS.W6 BOOK | NO `size` prop on SelectTrigger (verified) | **BOOK** | 1 consumer (value.js). Trigger: a 2nd. BOOK. NB: pairs conceptually with #12 (a size vocabulary across controls) — if AT opens a "control-size vocabulary" wave, #12+#15 fold together as ONE coherent size-prop pass (then ≥2 by the cross-control coherence). Flag for the AT planner. |
| 16 | **DDR-AS-RC-2: `--spring-crisp` token (ζ≈0.80)** | speedtest; A1→AS (chronic) | NOT in src (`grep spring-crisp = 0`) | **BOOK (default not-ship)** | 0 witnessed ≥2 at HEAD (A1 claimed pane-slide + easter-eggs, unconfirmed). Regenerates from keyframes via `regen-spring-tokens.mjs` if it lands. Trigger: a witnessed ≥2. Default NOT-SHIP. BOOK. |
| 17 | **DDR-AS-RC-2: GlassDock dark rung** | speedtest; AR (chronic) | `--glass-opacity-dock: 0.42` EXISTS (`tokens.css`); `--dock-fg-on-aurora` shipped AS.W5 (`dock.css:673`) | **KILL (folded/done)** | The dark rung + fg-on-aurora SHIPPED at AS.W5 (`AS.W0b-L4:44`). The DDR row is satisfied. Stop tracking. (If speedtest names a NEW dark-legibility gap at its AU close, that is a fresh item, not this one.) |
| 18 | **DDR-AS-RC-2: AnimatedDigit** | speedtest; AR | `animated-digit/AnimatedDigit.vue` SHIPS | **KILL (already public)** | AnimatedDigit is a shipped public primitive. The DDR row is an ADOPTION ask (speedtest consumes it), not a glass-ui gap. No glass-ui lever. Stop tracking on glass-ui's side. |
| 19 | **DDR-AS-RC-2: MetricBadge icon** | speedtest; AR | `metric-badge/` ships; no `icon` slot found in index | **BOOK** | An icon slot on MetricBadge. 1 consumer (speedtest). Trigger: a 2nd icon-badge consumer. BOOK (1-consumer additive). |
| 20 | **DDR-AS-RC-2: CompletionSeal/GoldHeadline/CheckDraw** | A1→AS (chronic) | NOT in src (`grep CompletionSeal = 0`) | **BOOK (token-only if any)** | Token/keyframe layer is the reusable substrate; the COMPONENT stays demo-gated until a 2nd consumer (J inv 10). Trigger: 2nd consumer → public-surface. BOOK. |
| 21 | **DDR-AS-RC-2: ContinuousTimeline marker-opt-out** | speedtest; AR | `GlassTimeline.vue:60` ALREADY has "disable the default per-marker" — `data-current` stamping + opt-out exists | **KILL (folded/done)** | The per-marker opt-out shipped (`GlassTimeline.vue:54,60`). DDR row satisfied. Verify the exact prop name matches speedtest's expectation at adoption; else a thin follow. Stop tracking as a gap. |
| 22 | **DDR-AS-RC-2: LabeledField for/id** | speedtest a11y; AR | `labeled-field/` ships; for/id binding present per family | **BOOK (a11y verify)** | A label-for/input-id binding correctness ask. Trigger: speedtest's a11y adoption surfaces a concrete gap. If confirmed a real binding bug → AT-WAVE correctness; else BOOK. Needs speedtest's specific failing site. |
| 23 | **DDR-AS-RC-2: 3 a11y asks** | speedtest; AR | unspecified bundle | **BOOK (decompose at AT.W0)** | The "3 a11y asks" are not individually enumerated in the AS record. AT.W0 must DECOMPOSE them against speedtest's AU audit before disposition — a bundle label is not auditable. BOOK pending decomposition; any that is a real WCAG gap → AT-WAVE correctness. |
| 24 | **DDR-AS-RC-2: DockIconButton 44px coarse floor (S-2)** | AQ→AP→AR→AS (chronic, depth 4) | **SHIPPED** at `dock.css:1149-1152` (`.dock-icon-button:not(--compact)` `min-block/inline-size: var(--dock-touch-target, 2.75rem)` under `@media (pointer: coarse)`) | **KILL (folded/done)** | The standalone-button floor LANDED at AS.W5 (`dock.css:1140-1152`, the S-2 comment block explicitly). The chronic is CLOSED. Stop tracking. (AS.W0b-L4:125 said "ADOPT-CHECK" but HEAD shows the explicit button-level floor shipped — verified.) |
| 25 | **DDR-AS-RC-2: `useRAFLoop` demandPark** | speedtest; AR | NO `demandPark` in src (verified) | **BOOK** | A rAF-loop park-on-demand ergonomic. 1 consumer (speedtest never-parks INP). Trigger: a 2nd rAF consumer wants demand-park OR speedtest's perf wave confirms the API shape. BOOK. |
| 26 | **DDR-AS-RC-2: `/styles` critical/deferred split** | speedtest LCP; AR | `index.css` already font-payload-split (`index.css:22-29`); `fonts.css` is the deferred entry | **BOOK (scope-verify)** | The FONT split shipped (AM-W1-α). The DDR ask may want a BROADER critical/deferred split (component CSS below-the-fold). Trigger: speedtest names the specific critical-vs-deferred boundary it needs. If it is just the font split → already done (KILL); if broader → BOOK pending the concrete cut. |
| 27 | **G3 cross-document VT** (`@view-transition{navigation:auto}` + directional vocab) | AQ→AR→AS (chronic, depth 3) | `view-transition.css` has the opt-in vocab; no `navigation:auto` | **BOOK (split)** | `navigation:auto` is CONSUMER-owned app-shell — REFUTED as a glass-ui wave (imposes route-morphs on every consumer page). The library half (opt-in `--vt-*` directional vocab) ships. Trigger: ≥2 opt-in directional-vocab consumers converge → graduate to a wave. Speculation-Rules stays consumer-domain. BOOK. |
| 28 | **G5 `@scope` + `:state()`** (retire `:deep()`) | AR→AS (chronic) | 5 `:deep(` sites, 0 `@scope` | **BOOK (paid-diff-only)** | Authoring-DRY-not-payload (gzipped CSS is compression-saturated, AP refuted-premise lesson). Trigger: an SFC touch that ALREADY pays the diff cost — NOT a standalone migration (fails the overfitting-bar spirit). BOOK; ship opportunistically if AT touches those SFCs. |
| 29 | **G6 CSS `@function`** | AR→AS (chronic) | 0 in src | **BOOK** | Limited/Chromium-only + authoring-DRY-not-payload. Trigger: Baseline lifts to Newly AND a real cross-engine authoring-DRY site earns it. BOOK. |
| 30 | **G8 `interestfor` action-previews** | AQ→AR→AS (chronic, depth 3) | `HoverPopover.vue:133,208` `:native` opt-in demo-gated, gated on interest support | **BOOK** | Limited/experimental. Trigger: Baseline Widely + the Configurator/dock destructive-action-preview fit converges a 2nd consumer. BOOK. |
| 31 | **`text-box-trim`** | AR→AS (chronic) | 0 consumers | **BOOK** | New Baseline-2025, typography-adjacent, 0 consumers. Trigger: a consumer asks OR a typography-rung touch wants it. If AT opens the Fraunces wave (#7), `text-box-trim` is the natural opportunistic companion — flag for the AT planner (a typography wave is the paid-diff site). BOOK; watch for fold into #7. |
| 32 | **CSS lever — interpolate-size / calc-size(auto)** | grand-audit / AS W5 | 0 in src (`interpolate-size`/`calc-size` = 0); the 0fr↔1fr hack lives at `ConfiguratorLayer.vue` | **BOOK (paid-diff-only)** | Newly-Baseline; the kept hack is the fallback. Trigger: glass-ui migrates FIRST with `@supports` when the SFC is touched AND a consumer is witnessed. BOOK; same discipline as G5. |
| 33 | **CSS lever — relative-color `oklch(from …)`** | grand-audit / AS W5 | 0 `oklch(from` in src | **BOOK (paid-diff-only)** | Token recipe for dock-hover/accent/scrim tints; deletes a canvas-2d probe. Trigger: opportunistic-SFC touch where a consumer is witnessed. BOOK. |
| 34 | **GlassDialogNative pilot** | AQ→AR→AS (chronic, depth 3) | `dialog-native/GlassDialogNative.vue` exists; 0 barrel/exports (verified `grep src/index.ts src/api package.json = 0`) | **BOOK (no leak — clean)** | Demo-gated via `native-top-layer` story. Trigger: Baseline Widely (native `<dialog>` `commandfor`). BOOK. |
| 35 | **HoverPopover `:native` opt-in** | AQ→AR→AS (chronic, depth 3) | `HoverPopover.vue:133` `:native` default-false, reka-ui default | **BOOK** | Graduates with G8 at Baseline Widely. BOOK. |
| 36 | **G7 `GlassNativeSelect`** | AQ→AR→AS (chronic, depth 3) | demo-gated, 0 barrel/exports | **BOOK (demo-gated only)** | Limited Baseline; muster declined in AQ → no ≥2. Trigger: Baseline Widely → default. BOOK. |
| 37 | **inline-edit primitive** | AN→…→AS (chronic, depth 5) | 3 DIVERGENT consumers (numeric-click / string-dblclick / contenteditable) | **BOOK (convergence-gated)** | Trigger: the 3 shapes converge to ONE contract. Promote on convergence, NOT census (J inv 10). 5-tranche carry is legitimate (divergence, not neglect). BOOK. |
| 38 | **dock panel-host variant** | AN→…→AS (chronic, depth 5) | 1 consumer (bbnf-buddy `LeftToolsDock`); vertical-overflow bug already fixed | **BOOK** | Trigger: ≥2 tall-vertical-pane consumers. BOOK. |
| 39 | **LabeledSlider numeric-readout** | AO→…→AS (chronic, depth 4) | 2-divergent | **BOOK** | Trigger: a 3rd consumer wants the readout OR the 2 converge. BOOK. |
| 40 | **shadcn parity (calendar/date-picker/pagination)** | AP→AR→AS (chronic) | 0 consumers (pagination/virtual already retired L.W3) | **KILL (REJECT)** | 0 consumers — speculative; AP rejected, the user's no-overfitting precept forbids substrate-without-consumer. Lean past WATCH to terminal REJECT: building shadcn-parity on spec is exactly the overfitting class the precepts kill. Trigger to RE-OPEN: an actual consumer surfaces (then it is a fresh item). Stop carrying as a live watch. |
| 41 | **value.js VAL-1 / `deriveAurora` ≥2 kill-gate** | value.js G→J (4) + glass-ui AO→AS (3) | `deriveAurora` SHIPS (`color.ts:182`); value.js src has NOT wired it live (`grep deriveAurora value.js/src = 0`) | **BOOK (kill-gated, value.js-owned)** | glass-ui's lever DISCHARGED — the producer ships. The ≥2 is met ONLY when value.js K.W4 wires the 2nd LIVE consumer. Trigger: value.js K.W4 lands live → VAL-1 lives; if K.W4 closes WITHOUT it → value.js executes the VAL-1 KILL (its own arm). Glass-ui has no further action. BOOK as the standing cross-repo kill-gate; NOT an AT glass-ui item. |
| 42 | **value.js VAL-9** (`spring()→LinearStop[]` emitter) | value.js A→J (chronic ×many) | n/a — keyframes owns the emitter | **KILL** | TERMINAL (value.js J FINAL). Lifting adds a 3rd home; keyframes owns it privately, glass-ui's `--spring-*` regenerate via `regen-spring-tokens.mjs`. No glass-ui lever. Stop tracking. |
| 43 | **P7 Mascot / monogram-pose** | bbnf+fourier+sudoku (chronic) | n/a | **KILL** | TERMINAL — constellation DEC-3 (user-ratified). Disparate shapes (shared skin, not shape); no glass-ui mascot primitive. Stop tracking. |
| 44 | **`docs/precepts` submodule pin re-sync** (`63240e6`→canonical) | AS perimeter | submodule dirty (` m docs/precepts` at HEAD) | **USER-DOMAIN** | In-flight, forbidden to touch while dirty. Trigger: the in-flight submodule work settles → deliberate user-domain re-sync. AT must NOT touch. The AS.FINAL name-forward (the "agents NEVER run irreversible release steps" precept) belongs here too — authored in the precepts repo's own flow, then the glass-ui pin advanced. USER-DOMAIN. |
| 45 | **bbnf-lang/playground dist-alias fossil** | AS.W2 byproduct | `bbnf-lang/playground/vite.config.ts:24` hard alias; local-RED, CI-GREEN | **USER-DOMAIN** | The hardened `proof:resolution` working as designed (sees the consumer the old blind spot omitted). Trigger: playground maintainer removes the alias (inv-16). Glass-ui writes only glass-ui. |
| 46 | **value.js K.W2.5 `development`-key strip** (contract-v2 lockstep) | AS R2 | value.js still carries the keys per AS record | **USER-DOMAIN** | The constellation-ordering-2026-06-04 scan RESOLVED glass-ui R2 = STRIP (both repos revert in lockstep). glass-ui already stripped its 68 keys at AS.W2b. value.js's K.W2.5 is its own arm. Trigger: value.js executes K.W2.5. USER-DOMAIN. |
| 47 | **M-CI / M-DEPLOY / M-MEASURE spine** | constellation | keyframes `build:lib` split, babb.dev 2-of-5 live, booked AFTER numbers unbanked | **USER-DOMAIN** | glass-ui's only leg (the 3.2.0 CI-publish) DISCHARGED. The rest is each repo's maintainer arm (inv-16). USER-DOMAIN. |

## §4 — The AT-WAVE roll-up (what AT actually executes)

The items that clear the bar NOW and fold into AT waves:

1. **The headline blob lift (#1+#2+D1).** A new substrate wave: `/goo-blob` +
   `/watercolor-dot` subpaths, `useMetaballRenderer`, the GLSL, **with the inv-K-3
   injected `colorResolver` seam** (no value.js default). Gate: a
   `proof:no-value-default` assertion (zero `@mkbabb/value.js` import in the blob
   subpaths) + ≥2 (value.js + glass-ui demo story) + WebGL canvas-present visual
   proof (the paired-π protocol — glass-ui is the LIFT SOURCE its consumers diff
   against). **This is the AT headline and its own wave.**

2. **The vueuse-free-root correctness wave (#3+#4).** Fix the DataTable leak
   (subpath-only OR swap to `useResizeObserver`) + add the missing
   `proof:vueuse-free-root` static-import-graph gate (the real value: the gate gap,
   not the build-split-mitigated leak) + resolve `supportsPostTask` (wire-or-drop).
   Gate: `proof:vueuse-free-root` fails closed on `@vueuse/core` reachability from
   `dist/glass-ui.js`.

3. **The Fraunces `@font-face` wave (#7).** The slipped AS.W5 ship; ≥2 met (words +
   value.js). Gate: `proof:font-axes` (every axis `typography.css` references is
   carried by a shipped face) — closes the SILENTLY-INERT WONK/SOFT axes. Natural
   opportunistic companion: `text-box-trim` (#31) if the typography wave touches the
   rungs.

4. **The dark-ergonomics wave (#9+#10).** `useGlobalDark({initialValue})` +
   `darkModeSyncScript()` FOUC primitive, both on `/dark`. ≥2 (speedtest + words).
   Additive, small.

5. **The docs/contract pass (#11 + the W-ASK size vocabulary).** GlassDock
   `overflow`-vs-`wrap` clarification (zero src risk). IF AT opens a control-size
   vocabulary, #12 (`Button icon-sm`) + #15 (`Select size`) fold as ONE coherent
   size-prop pass (≥2 by cross-control coherence) — flag for the AT planner.

6. **Strong AT-WAVE candidate (#8).** Drawer `:native`/`GlassNativeDrawer` — ≥2 FIRM
   (muster + speedtest), retires the vaul-vue re-snap bug. Fold IF AT scope admits a
   2nd substrate wave alongside the blob headline; else BOOK with the named trigger.
   Lean **fold** — it has the cleanest real ≥2 of any non-headline item.

**The BOOK backlog** (W-ASKS #13/#14/#19/#22/#25, the DDR residuals, the CSS levers
#28/#32/#33, the platform-gated pilots #29/#30/#34/#35/#36, the convergence-watches
#37/#38/#39) stays gated. **The KILLs** (#5 P5-user-ruled, #17/#18/#21/#24 DDR
already-shipped, #40 shadcn-REJECT, #42 VAL-9, #43 P7) exit the ledger. **The
USER-DOMAIN** (#41 VAL-1 kill-gate, #44 precepts, #45 playground, #46 value.js
K.W2.5, #47 M-spine) are inv-16 name-forwards.

## §5 — Adversarial notes

- **The headline ≥2 is the contested claim — handle it honestly.** AS.W6 ruled the
  blob lift "≥2 not clearly met." AT differs ONLY because (a) the user RULED it the
  headline and (b) the inv-K-3 injected-resolver seam is the design move that makes
  it substrate-shaped not value.js-coupled. The honest record: muster's blob interest
  is design-SURVEY (`R1-value-js-design-language.md`), NOT a committed app — so AT
  ships on value.js + glass-ui demo (the `deriveAurora` precedent), and the seam is
  the proof it is not overfit to value.js. Do not claim muster as a firm 2nd.

- **Four DDR-AS-RC-2 rows are already DONE — do not re-ship.** #17 (dock dark rung),
  #18 (AnimatedDigit), #21 (timeline marker opt-out), #24 (44px floor) all SHIPPED at
  AS or earlier (HEAD-verified `file:line`). A naive read of the DDR bundle label
  would re-mint them. The S-2 44px floor specifically shipped at `dock.css:1149-1152`
  (the AS.W0b-L4 said "ADOPT-CHECK" but the explicit button-level `min-block/inline-
  size` IS present — the floor landed, not just the in-dock token).

- **The W-ASKS are 1-consumer each — the size vocabulary is the only fold path.**
  #12/#13/#14/#15 each have ONE consumer (value.js). Individually they are
  substrate-without-2nd-consumer → BOOK. The ONLY way they clear the bar in AT is if
  AT opens a coherent "control-size vocabulary" (Button `icon-sm` + `Select size`
  together), where the ≥2 is the cross-control coherence + the exported-public-API
  escape (a CVA variant is public surface, which clears the overfitting bar's
  "exported" arm). Flag this — do not ship them as 4 isolated 1-consumer patches.

- **#23 "3 a11y asks" is an un-auditable bundle.** It must be DECOMPOSED at AT.W0
  against speedtest's AU audit before any disposition. A bundle label is not a row.

- **value.js's standing ask is `BlobDot` + `deriveAuroraPalette` + metaballs
  `positionSource`** (`value.js/A/audit/W6-deferred.md:71`, `G/coordination/Q.md`),
  using DIFFERENT names than the AT prompt's `goo-blob`/`watercolor-dot`. The naming
  is informational (consumers import the as-shipped name, like `deriveAurora` vs the
  asked `deriveAuroraPalette`). AT picks the glass-ui-canonical names; value.js adopts
  them. Do not block on the name mismatch.

- **#41 VAL-1 is DISCHARGED on glass-ui's side.** The `deriveAurora` producer ships;
  the kill-gate is value.js's to pull at K.W4. glass-ui has NO AT action on VAL-1 —
  it is a BOOK that lives in value.js's tree (inv-16). Do not re-open it as a glass-ui
  item; the only glass-ui lever (ship the producer) is spent.

- **The two AS.W6 HEAD findings are the cleanest AT-WAVE items** (#3 DataTable +
  #4 supportsPostTask) — explicitly named "AT, not 3.2.1" by AS, both verified at
  HEAD, both fold into one small correctness wave whose real value is the NEW
  `proof:vueuse-free-root` gate (the leak itself is build-split-mitigated; the
  absence of an enforcing gate is the actual debt).

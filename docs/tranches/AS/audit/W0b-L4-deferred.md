# AS.W0b — Lens 4 redux: the DEFINITIVE deferred + chronic fold-or-watch-or-kill ledger

The W0-L4 ledger (`W0-L4-deferred-ledger.md`) was authored against AR-mid-flight HEAD,
BEFORE AS's implementation set ran. The impl has since LANDED: `d2d1d0b` (AS.W2
gate-integrity) + `8c0cced` (AS.W3/W4/W5 — postTask, container-queries, the AS-GU
bundle, P9 silent-styling root fix). This redux re-grounds every deferred item against
**3.1.1 HEAD with W2-W5 landed** (grep-verified `file:line`), folds the AS.W5 design-doc
P-items (`design/AS.W5-constellation-primitives.md`), and produces the terminal
fold-or-watch-or-kill verdict the user asked for twice. **No item is carried unruled.**

Chronic = deferred across ≥2 tranches. The verdict columns: **FOLDED** (already shipped
in W2-W5 — closed, exits the watch) · **FOLD** (rule it into a named wave now) · **WATCH**
(named-forward with a concrete graduation trigger) · **KILL** (terminal, no glass-ui lever
or ratified dead) · **USER-DOMAIN** (cross-repo / submodule; glass-ui holds no lever).

## §0 — The state correction (why this redux exists)

The W0-L4 ledger said "FOLD into AR's authored W3-W6 (= the AS implementation set)" for
G1/G2/G3/G4 and the AS-GU clusters, treating them as unrun. **They ran.** Grep at HEAD:

- `src/composables/motion/usePrioritizedTask.ts` (G4 postTask, `postTaskSafe` + `TaskController` + `MessageChannel` fallback) — LANDED.
- `src/utils/platformSupport.ts` (the 3-guard consolidation `supportsPostTask`/`supportsMoveBefore`/`supports{Scroll,View}Timeline`) — LANDED.
- `src/styles/utilities.css:483-502` (G1 `@container style(--density)` over kept `[data-density]`) — LANDED.
- `src/components/custom/glass-carousel/useGlassCarousel.ts:19,46,82` + `GlassCarousel.vue:174` (G2 `@container scroll-state(scrollable)`, overflow-fade listener retired on supporting engines) — LANDED.
- `scripts/{constellation,gates,gate-output,proof-lockfile}.mjs` (inv-θ) + `proof-vt-names.mjs` hardened — LANDED.
- `Configurator.vue:85,101` `asideSide` + `--configurator-aside-{min,max}` (P1); `composables/dom/useTextHighlight.ts` (P4); `dock.css:673,677` `--dock-fg-on-aurora` + `DockIconButton.vue:31` `asChild`/`as` (P6); `useViewTransition.ts:95` `vt.ready?.catch()` (P8); `utilities.css` +49 the P9 silent-styling root fix — ALL LANDED.

So the deferred ledger today is the RESIDUAL: the items W5 deliberately did NOT ship
(P2/P3/P5, the CSS levers), the killed item (P7), the exogenous-trigger watches, and the
constellation-adoption bookings. That is what this ledger rules.

## §1 — The definitive ledger

| Item | Origin | Tranches carried | Chronic? | Fold-or-watch | Target |
|---|---|---|---|---|---|
| **inv-θ gate-integrity** (5× hardcoded list, 3× absent-sibling, 22 timestamped tracked JSONs, divergent gate lists) | AR.W2 byproduct | AR→AS (2) | yes | **FOLDED** | `d2d1d0b` AS.W2 — `constellation.mjs`/`gates.mjs`/`gate-output.mjs`; `git status` clean post-run; `release.sh` runs the floor. CLOSED. |
| **proof:vt-names over-claim** (4 evasion vectors + file-level `useId`) | AR.W2 | AR→AS (2) | yes | **FOLDED** | AS.W2 — 4 mint forms + per-mint dataflow trace, 6 fixtures. CLOSED. |
| **G4 `scheduler.postTask` priority** | A1 §3.G4 (ext AQ.W3) | AQ→AR→AS (3) | yes | **FOLDED** | `8c0cced` AS.W3 — `usePrioritizedTask.ts` on `/motion-core` + `TaskController` + `MessageChannel`. CLOSED. |
| **`supports*` consolidation** (the 3rd-guard trigger) | A1 §1 | AR→AS (2) | yes | **FOLDED** | AS.W3 — `platformSupport.ts` (postTask was the 3rd guard, trigger fired). CLOSED. |
| **G1 container STYLE queries** (`@container style(--density)`) | AQ.W7 no-show → A1 §3.G1 | AQ→AR→AS (3) | yes | **FOLDED** | `8c0cced` AS.W4 — `utilities.css:483-502` over kept `[data-density]` via `:where()`. CLOSED. |
| **G2 scroll-state queries** (RE-SCOPED → `scrollable` overflow-fade) | AQ no-show → A1 §3.G2 | AQ→AR→AS (3) | yes | **FOLDED** | `8c0cced` AS.W4 — `useGlassCarousel.ts` retires the JS listener on supporting engines; embla kept on the other carousel. CLOSED. |
| **P1 Configurator `asideSide` + `asideWidth` token band** | grand-audit §B / W5 design | AS (1) | no | **FOLDED** | `8c0cced` AS.W5 — `Configurator.vue:85,101`; default `'right'` (DEC-1); ≥2 met by the token consumers. CLOSED. |
| **P4 `useTextHighlight`** (CSS Custom Highlight) | grand-audit §B / W5 design | AS (1) | no | **FOLDED** | AS.W5 — `composables/dom/useTextHighlight.ts`; retires the FuzzySearch `<mark>` splitter. CLOSED. |
| **P6 `--dock-fg-on-aurora` + DockIconButton `as`/`asChild`** | grand-audit §B / W5 design | AS (1) | no | **FOLDED** | AS.W5 — `dock.css:673`, `DockIconButton.vue:31,34`. The 44px floor (S-2, chronic AQ→AP→AR age 3) was found ALREADY-SHIPPED at `dock.css:1075-1083` (ADOPT-CHECK, not re-minted). CLOSED. |
| **P8 VT `.ready` rejection hardening** | grand-audit §B / W5 design | AS (1) | no | **FOLDED** | AS.W5 — `useViewTransition.ts:95` `vt.ready?.catch(()=>{})`. CLOSED. |
| **P9 silent component-utility no-op** (fourier configurator-square root cause) | user-flagged 2026-06-03 / W5 §6 | AS (1) | no | **FOLDED** | `8c0cced` AS.W5 — `utilities.css` build-independent emit + `@source` fallback; supersedes the inner-section flush-square content policy. The chronic P5-inner-rounding (fourier J→AR) is satisfied-on-adopt by P9. CLOSED. |
| **glass-ui-a11y / glass-ui-P5-inner / cascade-gui** | fourier H/J cross-repo | H→J→AR (2-3) | yes | **FOLDED (AR.W2) + P9** | a11y `inert` + cascade-gui shipped AR.W2; P5-inner now rooted by P9. fourier reconciles its own ledger rows (inv-16). EXIT the live watch. |
| **P2 `deriveAuroraFromColor` + OKLab-LUT** (= value.js VAL-1) | A1 §5 / speedtest AU2 / value.js VAL-1 | glass-ui AO→AR→AS (3) + value.js G→J (4) | **yes (heaviest)** | **WATCH (kill-gated)** | NOT in src (`grep deriveAurora src/ = 0`); the low-level OKLab math ships (`aurora/composables/color.ts`), a no-op re-impl is FORBIDDEN (inv J-10). The ≥2 gate is met ONLY when **value.js K.W4 wires the 2nd live consumer**. Trigger: value.js K.W4 lands live → glass-ui SHIPs `deriveAuroraFromColor` (3.2.x). If value.js K.W4 closes WITHOUT it → **value.js executes the VAL-1 KILL** and glass-ui drops the watch. Single highest-stakes chronic. |
| **P3 Metaballs (WebGL) + BlobDot (SVG watercolor) family** | grand-audit §B / W5 design | value.js A→J (7) for the blob-extirpation; glass-ui AS (1) for the home | **yes (value.js side)** | **WATCH** | NOT in src (`grep Metaball src/ = 0`). Net-new PUBLIC surface — ships **post-v1.0.0** (after value.js K.W6), with the color-resolver consumer-INJECTED (§4.3). Trigger: glass-ui v1.0.0 cut + value.js K.W6's 2nd consumer live. Until then, value.js carries both blob systems locally (legitimate — the home does not exist yet). |
| **P5 self-hosted Fraunces `@font-face`** (opsz+SOFT+WONK woff2) | grand-audit §B / W5 design | AS (1) | no | **FOLD** | NOT in src (`grep Fraunces src/styles/fonts.css = 0`; `typography.css:98` `--font-display-variation-settings: WONK/SOFT` is SILENTLY INERT — no face carries the axes). Consumers narrowed to **value.js + words** (DEC-8 dropped slides; ≥2 still met). This is the one W5-SHIP item that did NOT land. Trigger: **AS.W5 follow-on / 3.2.x** — mirror the Plus-Jakarta/Fira `@font-face` pattern at `fonts.css:80`. Lowest-risk highest-impact WC lever; do not let it slip a tranche. |
| **CSS lever — interpolate-size / calc-size(auto)** | grand-audit §C / W5 §2 | AS (1) | no | **WATCH** | The 0fr↔1fr collapse hack (`ConfiguratorLayer.vue:31`) + value.js's Dock copy. Trigger: glass-ui migrates FIRST with `@supports` fallback when the SFC is touched AND a consumer is witnessed; else NAME-FORWARD (no speculative migration — Newly-Baseline, the fallback is the kept hack). |
| **CSS lever — relative-color `oklch(from …)`** | grand-audit §C / W5 §2 | AS (1) | no | **WATCH** | Token recipe for dock-hover/accent/scrim tints; deletes the canvas-2d `cssToRgb` probe (`color.ts _parseCtx`). Trigger: opportunistic-SFC touch where a consumer is witnessed; else NAME-FORWARD. Same discipline as G5 — ship only with a paid diff cost. |
| **G3 cross-document VT** (`@view-transition{navigation:auto}` + directional vocab + Speculation-Rules) | A1 §3.G3 (ext AQ.W5) | AQ→AR→AS (3) | yes | **WATCH (split)** | `navigation: auto` is CONSUMER-owned app-shell — REFUTED as a glass-ui wave (would impose route-morphs on every consumer page). The library half (the opt-in directional `--vt-*` vocab in `view-transition.css`) ships; the cross-doc coupling does NOT. Trigger: ≥2 opt-in directional-vocab consumers converge → graduate to a wave. Speculation-Rules stays consumer-domain (fourier route-morph). |
| **G5 `@scope` + `:state()`** (retire `:deep()`) | A1 §3.G5 | AR→AS (2) | yes | **WATCH** | Authoring-DRY-not-payload (AP refuted-premise lesson: gzipped CSS is compression-saturated). 5 `:deep(` sites, 0 `@scope`. Trigger: an SFC touch that already pays the diff cost — NOT a standalone migration (fails the overfitting-bar spirit). |
| **G6 CSS `@function`** | A1 §3.G6 | AR→AS (2) | yes | **WATCH** | Limited/Chromium-only + authoring-DRY-not-payload. 0 in src. Trigger: Baseline lifts to Newly AND a real cross-engine authoring-DRY site earns it. Progressive-only on landing. |
| **G8 `interestfor` action-previews** | A1 §3.G8 / AQ.W6 | AQ→AR→AS (3) | yes | **WATCH** | Limited/experimental; `HoverPopover :native` opt-in already ships demo-gated (`HoverPopover.vue:112,121`). Trigger: Baseline Widely + the Configurator/dock destructive-action-preview fit converges a 2nd consumer. |
| **`text-box-trim`** | A1 / grand-audit | AR→AS (2) | yes | **WATCH** | New Baseline-2025, 0 consumers, typography-adjacent. Trigger: a consumer asks OR a typography-rung touch wants it. |
| **GlassDialogNative pilot** | AQ.W6 (demo-gated) | AQ→AR→AS (3) | yes | **WATCH** | `dialog-native/GlassDialogNative.vue` exists, demo-gated via `native-top-layer` story, 0 barrel/exports entries (grep-confirmed). No leak — clean. Trigger: Baseline Widely (native `<dialog>` `commandfor`). |
| **HoverPopover `:native` opt-in** | AQ.W6 (demo-gated) | AQ→AR→AS (3) | yes | **WATCH** | `native?: boolean` default-false (`HoverPopover.vue:112,121`), reka-ui default. Graduates with G8 at Baseline Widely. |
| **G7 `GlassNativeSelect`** | A1 §3.G7 / AQ.W4 design | AQ→AR→AS (3) | yes | **WATCH (demo-gated only)** | Limited Baseline; muster declined in AQ → no ≥2 real consumers. Stays behind the story, 0 barrel/exports. Trigger: Baseline Widely → default. |
| **`--spring-crisp` token (ζ≈0.80)** | A1 §5 | AR→AS (2) | yes | **WATCH (not-ship default)** | NOT in src (`grep spring-crisp src/ = 0`). 0 witnessed cross-repo ≥2 consumers at HEAD. Trigger: a witnessed ≥2 (pane-slide + easter-eggs were the A1 claim — unconfirmed at HEAD). Default NOT-SHIP; regenerates from keyframes via `regen-spring-tokens.mjs` if it lands. |
| **whisper-heading typography rung** | A1 §5 | AR→AS (2) | yes | **WATCH (not-ship default)** | NOT in src. 0 consumers; the thinnest fold (the AR plan's own hedge "demo-or-not-shipped if thin"). Trigger: 2 real consumers surface. Do not ship a typography rung on spec. |
| **CompletionSeal/GoldHeadline/CheckDraw family** | A1 §5 | AR→AS (2) | yes | **WATCH (token-only if any)** | NOT in src (`grep CompletionSeal src/ = 0`). Token/keyframe layer is the reusable substrate; the COMPONENT stays demo-gated until a 2nd consumer converges (J inv 10). Trigger: 2nd consumer → public-surface. |
| **P7 Mascot / monogram-pose primitive** | A1 §5 / grand-audit §B / W5 §5 | bbnf+fourier+sudoku skin (3 repos) | yes | **KILL** | **TERMINAL — constellation DEC-3 (2026-06-03, user-ratified).** The bbnf-"b"/orange-sun/sudoku mascots are DISPARATE (shared pencil-boil *skin*, not *shape*). NO glass-ui mascot primitive, NO `@mkbabb/mascot` package. Shapes stay app-local; skin/physics stay in `@mkbabb/pencil-boil`. Stop tracking. |
| **value.js VAL-9** (`spring()→LinearStop[]` emitter) | value.js A | value.js A→J (chronic ×many) | yes | **KILL** | **TERMINAL — value.js J FINAL.** Lifting adds a 3rd home; keyframes.js owns the emitter privately, glass-ui's `--spring-*` regenerate via `regen-spring-tokens.mjs`. No de-dup won. Glass-ui has NO lever. Stop tracking; do not re-open. |
| **inline-edit primitive** | AN watched → AO → AP → AR | AN→…→AS (5) | yes | **WATCH (convergence-gated)** | 3 consumers but DIVERGENT (numeric-click / string-dblclick / contenteditable — AP.FINAL). Trigger: the 3 shapes converge to ONE contract. Do NOT promote on count — J inv 10 is convergence, not census. 5-tranche carry is legitimate (divergence, not neglect). |
| **dock panel-host variant** | AN ARCHIVED → AP → AR | AN→…→AS (5) | yes | **WATCH** | 1 consumer (bbnf-buddy `LeftToolsDock`), under the 2-consumer gate; its vertical-overflow bug was already fixed (AP — correctness ≠ promotion). Trigger: ≥2 tall-vertical-pane consumers. |
| **LabeledSlider numeric-readout** | AO watched → AP → AR | AO→…→AS (4) | yes | **WATCH** | 2-divergent. Trigger: a 3rd consumer wants the readout OR the 2 converge. |
| **shadcn parity (calendar/date-picker/pagination)** | AP watched-conditions | AP→AR→AS (3) | yes | **WATCH → REJECT-leaning** | 0 consumers — speculative (AP rejected, pagination/virtual already retired at L.W3). Trigger: an ACTUAL consumer surfaces. Until then substrate-without-consumer; lean REJECT, do not build on spec. |
| **102 loose root PNGs + 6 `.DS_Store` + 3 `docs/constellation/*` superseded docs** | constellation-adoption fold 2026-06-02 | AS (1) | no | **FOLD** | HEAD-verified: `ls *.png = 102`, `find .DS_Store = 7` (6 outside node_modules; drifted from the catalogue's 1), `MODERN-WEB-{CLOSE,EXECUTION-PLAN}.md` + `NEXT-ROUND-EXECUTION-PLAN.md` present. Archive-not-delete: `git mv` into `-ASarchive` baseline leaves; `.DS_Store` gitignore+delete; the 3 plan docs ledger-retire. Adjacent to inv-θ's "`git status` clean" thesis. Trigger: **AS.W6 ι-sweep** (the open question in `constellation-adoption-2026-06-02.md §E` resolves to riding AS.W6, not a dedicated post-AS tranche). |
| **paired-π visual-evidence protocol adoption** | constellation-adoption fold 2026-06-02 | AS (1) | no | **FOLD** | Adopt at AS.W6 close: BEFORE/AFTER viewport matrix + per-page `DELTA.md` + the WebGL canvas present/positioned + non-empty-pixel assertion (glass-ui is the aurora/blob LIFT SOURCE — its baseline is what value.js diffs against). Tooling-contingency: build-verification floor if browser automation absent, provisional verdict inherited. Trigger: **AS.W6**. |
| **`docs/precepts` submodule pin re-sync** (`63240e6` → canonical `458c2d1`) | AS.md §Cross-repo perimeter item 7 | AS (1) | no | **USER-DOMAIN** | HEAD-verified: pin still `63240e6`; submodule working-tree-dirty (` m docs/precepts`) — in-flight, forbidden to touch. The paired-π `tranche/SPEC.md` subsection lives behind this pin. Trigger: the in-flight submodule work settles → deliberate user-domain re-sync. Glass-ui holds no lever while dirty. |
| **dev.sh / deploy.sh standard adoption** (library SHAPE :5173) | constellation-adoption fold 2026-06-02 §(a) | AS (1) | no | **USER-DOMAIN** | No `scripts/dev.sh` today (verified). DRAFT recorded (library CONFIG block); `deploy.sh` N/A (library publishes via CI tag, `release.sh` kept). Trigger: cross-repo dev-CLI rollout dispatch (its own per-repo commit, outside AS's wave set). |
| **`bbnf-lang/playground` dist-alias fossil** (proof:resolution local-RED) | AS.W2 byproduct | AS (1) | no | **USER-DOMAIN** | `bbnf-lang/playground/vite.config.ts:24` hard `@mkbabb/keyframes.js → dist/` alias (contract-v1→v2 transient); local-RED, CI-GREEN. The hardened gate working as designed (it now sees the consumer the old blind spot omitted). Trigger: playground maintainer removes the alias (inv-16). Glass-ui writes only glass-ui. |
| **NPM_TOKEN CI-publish proof** (3.2.0 minor through repaired `release.yml`) | AO→AP→AR cross-repo perimeter | AO→AR→AS (3) | yes | **USER-DOMAIN** | NPM_TOKEN seeded this session; 3.1.1 was published locally (pre-proof). Trigger: **AS.W6** tags 3.2.0 on a clean runner — the end-to-end #177-repair proof. Glass-ui's pipeline is ready; the tag is the user-domain release leg AS owns. |
| **value.js J / fourier J cohort execution** | constellation CONSTELLATION §3 | cohort (1, synchronized) | no | **USER-DOMAIN** | value.js-J ↔ fourier-J, glass-ui the hub. value.js K.W4 is P2's ≥2 gate; value.js K.W6 is P3's. Both authored-awaits-Begin (CONSTELLATION §7). Glass-ui's arm (P-bundle) landed; the cohort is each repo's own arm (inv-16). Trigger: the cohort's own paired-close. |
| **WAVE-C application** (24 authored design slices at 0 src sites; `--font-display` decouple) | constellation §3 | cross-repo (1) | no | **USER-DOMAIN** | Each repo's impl wave consumes the slices (glass-ui primitives they reach already ship). `--font-display` decouple is the biggest distinctiveness lever. Glass-ui side overlaps P5 Fraunces. Trigger: each consumer's WC wave. |
| **M-CI / M-DEPLOY / M-MEASURE spine** | constellation §6 / ADOPTION-ASKS | cross-repo (multi) | yes | **USER-DOMAIN** | keyframes `build:lib` split missing; babb.dev 2-of-5 live; muster no deploy target; booked AFTER numbers unbanked. glass-ui's only leg is the 3.2.0 CI-publish (above). The rest is each repo's maintainer arm (inv-16). Trigger: per-repo. |
| **bbnf-lang fossil** (the tranche-letter substrate, not the dist-alias) | constellation lineage | — | n/a | **N/A** | No glass-ui artefact named `bbnf-lang` beyond the `constellation.mjs` consumer entry (`scripts/constellation.mjs:87`) — a CORRECT membership row, not a fossil. The only `bbnf-lang` debt is the dist-alias (USER-DOMAIN, above). Nothing to fold. |

## §2 — Chronic roll-up (≥2-tranche survivors, ranked by carry-depth, post-landing)

1. **inline-edit + dock panel-host** (AN→AS, 5 each) — deepest carry; both legitimately WATCH (divergence / under-count, not neglect). The 5-tranche depth is the signal to RE-CONFIRM the trigger is real: both are (3-divergent contracts / 1 consumer). Watched correctly.
2. **value.js VAL-9** (A→J ×many) — **KILLED** in value.js J. No glass-ui lever. Terminal.
3. **P2 deriveAurora / value.js VAL-1** (glass-ui AO→AS 3, value.js G→J 4) — **the one live kill-gated watch.** Its life is decided at value.js K.W4: ship (≥2 met) or VAL-1 KILL. Highest-stakes — do NOT claim ≥2 until value.js K.W4 is LIVE (designed ≠ adopted; `grep deriveAurora src/ = 0` confirms not-yet-shipped on the glass-ui side either).
4. **P3 Metaballs+BlobDot** (value.js A→J 7) — WATCH; the home does not exist yet (post-v1.0.0 net-new public surface). value.js carrying it locally is legitimate, not a leak.
5. **G4/G1/G2** (AQ→AS 3 each) — **all FOLDED in `8c0cced`.** The chronic broke; they no longer carry.
6. **44px DockIconButton floor (S-2)** (AQ→AP→AR 3) — found ALREADY-SHIPPED (`dock.css:1075-1083`); the W5 disposition correctly downgraded it to ADOPT-CHECK. Closed without a 4th-tranche carry.
7. **G6/G7/G8/dialog-native/HoverPopover-native** (AQ→AS 2-3) — platform-Baseline-gated; exogenous trigger (Baseline Widely). Legitimately wait; 0 leak at HEAD (grep-confirmed).
8. **G3/G5 + text-box-trim** (AQ/AR→AS 2-3) — authoring-DRY or consumer-owned; WATCH with a paid-diff-cost or convergence trigger.

## §3 — The fold decision, distilled

**FOLDED (already shipped W2-W5 — exit the watch):** inv-θ gate-integrity, proof:vt-names
harden, G4 postTask + `supports*` consolidation, G1 density-container-query, G2
scroll-state(scrollable), P1 asideSide, P4 useTextHighlight, P6 dock-fg + as/asChild (44px
floor ADOPT-CHECK), P8 VT `.ready`, P9 silent-styling root fix (+ the P5-inner / a11y /
cascade-gui cohort asks).

**FOLD now (rule into a named wave):**
- **P5 Fraunces `@font-face`** → AS.W5 follow-on / 3.2.x (the one W5-SHIP that did not land; verified absent from `fonts.css`).
- **102 PNGs + 6 `.DS_Store` + 3 superseded `docs/constellation/*` docs** → AS.W6 ι-sweep (archive-not-delete).
- **paired-π protocol adoption** → AS.W6 close.

**WATCH (named-forward, concrete trigger):**
- **P2 deriveAurora** (kill-gated at value.js K.W4 — ship-or-VAL-1-KILL).
- **P3 Metaballs+BlobDot** (post-v1.0.0, after value.js K.W6).
- CSS levers interpolate-size + relative-color (opportunistic-SFC, witnessed-consumer).
- G3 directional vocab (≥2 opt-in convergence), G5 `@scope` (paid-diff SFC touch), G6 `@function` (Baseline+DRY-site), G8 + GlassDialogNative + HoverPopover-native + G7 (Baseline Widely), text-box-trim (consumer ask).
- `--spring-crisp` / whisper-heading / CompletionSeal-component (witnessed ≥2; default not-ship).
- inline-edit (3-shape convergence), dock panel-host (≥2 consumers), LabeledSlider readout (3rd consumer), shadcn-parity (any consumer — REJECT-leaning).

**KILL (terminal — stop tracking):**
- **P7 Mascot** (constellation DEC-3 — disparate shapes, no shared primitive).
- **value.js VAL-9** (value.js J — keyframes owns the emitter; no glass-ui lever).

**USER-DOMAIN (glass-ui holds no lever):**
- precepts pin re-sync (submodule dirty), dev.sh standard, bbnf-lang dist-alias, NPM_TOKEN 3.2.0 publish (AS.W6 leg), value.js/fourier J cohort, WAVE-C, M-CI/DEPLOY/MEASURE spine.

## §4 — Adversarial notes

- **The ledger's premise has shifted under it.** W0-L4 ruled "FOLD into AR's unrun waves"; those waves RAN. Re-reading the old ledger as the live state would double-count. This redux is grounded at HEAD-with-W2-W5-landed — every "FOLDED" row cites the commit (`d2d1d0b`/`8c0cced`) and a `file:line`, not a plan.
- **P5 Fraunces is the one slipped SHIP.** W5 §5 dispositioned it SHIP→AS.W5; HEAD shows it did NOT land (`grep Fraunces src/styles/fonts.css = 0`; the `--font-display-variation-settings: WONK/SOFT` at `typography.css:98` is SILENTLY INERT — glass-ui SPECIFIES axes no shipped face carries). This is the highest-priority FOLD residual — not a watch, a slipped ship. Route to the AS.W5 follow-on / 3.2.0 fold.
- **P2 deriveAurora's kill-date is the single highest-stakes chronic.** value.js J BOOKED VAL-1 with a kill-date at the glass-ui aurora-derive close. The ≥2 bar is met ONLY when value.js K.W4 wires the 2nd LIVE consumer (speedtest's `useSpeedtestAuroraConfig` hand-rolls the equivalent — designed, not adopted). Do NOT claim ≥2 from the paper roster; verify value.js K.W4 is live before shipping `deriveAuroraFromColor`, else the kill fires correctly.
- **The 44px floor did not need a 4th tranche.** W0-L4 routed S-2 to "lift to the button"; the W5 grand-audit found it ALREADY-SHIPPED at `dock.css:1075-1083` (the `@media(pointer:coarse)` lift). The correct disposition was ADOPT-CHECK (verify no consumer shadows `--dock-control-size` below the floor), not a re-mint. Closed without carry — the chronic-fold worked.
- **The 102 PNGs are adjacent to inv-θ but NOT covered by it.** inv-θ froze the gate-output tracked-JSON churn (the 22 timestamped artefacts); the 102 loose root PNGs are a SEPARATE hygiene class (visual-evidence scratch). AS.W6's ι-sweep is the named home; the open question in `constellation-adoption-2026-06-02.md §E` (ride AS.W6 vs a dedicated post-AS visual-close tranche) resolves to AS.W6 — the archival is `git mv` (archive-not-delete), the `.DS_Store` is gitignore+delete, the 3 plan docs ledger-retire. None touches the dirty `docs/precepts` submodule.
- **`.DS_Store` count drifted** (catalogue said 1; HEAD shows 6 outside node_modules). Re-verify counts at sweep time from `ls`/`find`, not from the catalogue snapshot — the catalogue is a 2026-06-02 freeze.
- **No item is left unruled.** Every named-forward / deferred / watched / chronic item from the prompt + the W0-L4 ledger + the W5 design-doc P-items + the constellation-adoption bookings carries a terminal verdict (FOLDED / FOLD / WATCH+trigger / KILL / USER-DOMAIN). The user's "delineate chronically deferred items and fold them" is discharged: the foldable are folded (W2-W5 landed + P5/PNGs/π → AS.W5-follow-on/W6), the watch-only carry a concrete graduation trigger, the dead are killed (P7, VAL-9), the cross-repo are user-domain.

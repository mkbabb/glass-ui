# Tranche AU — AUGMENT (the dock-motion overhaul + the convergence folds)

This is the **binding augmentation** of Tranche AU. It does NOT replace `AU.md` (the original
charter, W0–W10) — it RE-SCOPES the forward waves (W8–W10) and FOLDS the new directive's mass on
top of the landed W0–W7. Where a row here supersedes an `AU.md` row, it says so explicitly.

**Provenance.** Authored from a 57-agent read-only assay (2 workflows) condensed to three digests:
`audit/AUGMENT/AU-augment-digest.md` (glass-ui, 29 focus agents over the 44-agent assay),
`audit/AUGMENT/assay-wf1-raw.json` (the raw), and the slides siblings under
`slides/docs/tranches/F/audit/AUGMENT/`. Every claim below carries a `file:line` traceable to a
digest. **Tranche-development only — no `src` edits land from this document; the IMPL waves execute
on greenlight.**

---

## §0 — The new directive (verbatim intent → disposition)

The user's new round, glass-ui-facing items:

| # | Ask (paraphrased) | Disposition |
|---|---|---|
| D1 | dock animations "not properly springy and iOS-like" | **W8** dock-motion overhaul (§2) |
| D2 | "animations still quite delayed; the dock shrinks before the elements fade/animate out" | **W8** — the async-fork root cause (§2.1), the headline fix |
| D3 | "audit the keyframes.js tranche + our tranche with 12 agents; animation SOTA; `npx modern-web-guidance`" | **DONE** (12 AnimSOTA agents); SOTA adopt/defer table (§2.4) |
| D4 | "dock animations, layering &c need great refinement; collaborate with the keyframes.js workflow" | **W8** — keyframes.js `SpringProgress.play()` one-rAF driver (§2.2; NOT the HEAVY `AnimationGroup`); keyframes is READ-ONLY upstream (§6) |
| D5 | "constellation should be abstracted into a glass-ui component, if not already" | **KEEP-DEFERRED / BOOK** `useCanvas2D` — single-consumer, Canvas2D ≠ the WebGL substrate (§4). The visibility fix is slides-local. |
| D6 | "what gaps in glass-ui / slides; converge on a library optimum" | **library-optimum map** (§7) + the slides arm's `F-AUGMENT` |
| D7 | "break large components (>500 lines) into sub-components; modern Vue patterns; colocate composables; logical grouping; KISS" | **W8b/W10** encapsulation folds (§5.1–5.3) |
| D8 | "deeply-nested/brittle selectors; non-idiomatic Tailwind; bespoke styling; a localized design-idiom area; design cohesion; isomorphic" | **W8/W8b** styling folds (§5.4) + `proof:design-idiom-localization` |
| D9 | "delineate chronically-deferred items and fold them" | **§3** deferred-sweep verdict (chronics FOLDed) |
| D10 | "NO legacy; gestalt transpositions; tranche development only" | governs every fold; the dock fix is a transposition (one timing origin), not a patch |

The full prompt-coverage recap (every ask across the engagement, addressed/open) is **§8**.

---

## §1 — Where AU stands (the re-ground, unchanged facts)

`PROGRESS.md` is binding: **W0–W7 DONE** (the strict-templates keystone, the vueuse-free root, the
`/color` leaf, the `useWebGLCanvas` substrate, the blob trio — all green at HEAD, 644 tests, 32 ci
gates). The 3.3.0-publish-blocking correctness debts (W3) are **discharged**. What remains is the
dock-design headline (W8) — and the user's directive **re-scopes it from a rail/a11y pass into a
MOTION-led overhaul**, plus W9 (folds + slides-supply) and W10 (close + publish).

---

## §2 — The dock-motion overhaul (THE headline; supersedes AU.md §3 W8 + §4.2 #11–12)

### 2.1 Root cause — the timing ORIGIN, not the timing TOKEN

AU.W2 unified the timing **tokens** (`.dock-layer` opacity and the container morph both reference
`--dock-motion-resize`) and `proof:dock-opacity-lockstep` (`scripts/gates.mjs:44`) went green. But
that gate is a **string-match** proof — it asserts both CSS rules name the same token; it cannot
see a frame-origin skew. Four assay agents independently found the residual cause the user still
feels:

> **The FLIP fallback starts opacity and width on different frames.** In
> `src/components/custom/dock/composables/useLayerTransition.ts:140-170` the layer **class swap is
> synchronous** (`leavingLayer`/`currentLayer` mutated at `:146-147` → Vue paints classes → the
> `.dock-layer` opacity transition fires ~T3-5ms), but the **width animation is deferred** through
> `nextTick` (`:150`, measure/re-pin) **then** `requestAnimationFrame` (`:167-169`, width set) →
> starts ~T7-10ms. Net: **opacity runs ~one frame ahead of the width morph.** On collapse the
> container shrinks while items are mid-paint; on expand items fade in mid-morph.

Corroborating, independent contributors (do NOT regress them while fixing the above):
- **Layout reflow** — `dock.css:382-385` animates `width` on `.dock-layers`; flex children reflow
  immediately on width change (no containment), a second "items lag the box" source.
- **No entry state** — `dock.css:431-436` `.dock-layer:not(.layer-active)` has **no
  `@starting-style`**, so first-swap fades are non-deterministic.
- **The visibility-semantic fork is LOAD-BEARING, not the bug** — `dock.css:428` (`visibility 0s
  linear var(--duration-normal)`) vs `:449` (`visibility 0s`): active must paint at once, leaving
  must stay hit-testable through the fade. Name it as one token family; do NOT collapse it.

### 2.2 The fix — one spring ORIGIN, one rAF driver (a transposition, not a patch)

Two complementary moves. **(A) is the minimum that kills the visible jank; (B) makes it
iOS-grade.** Both are isomorphic (no public API change).

- **(A) Single-frame sync.** Move the `leavingLayer`/`currentLayer` ref mutations OUT of the
  synchronous section (`useLayerTransition.ts:146-147`) INTO the rAF callback (`:167-169`), so
  **class-apply (→ opacity) and width-set start in the same animation frame** (measured target:
  `< 16ms` between class-apply and width-start). Refs still track the same state, deferred by one
  rAF. No API change.
- **(B) One spring AUTHORITY via keyframes.js.** Drive the morph through **one `SpringProgress`
  solver** (`keyframes.js/src/animation/spring.ts` — analytic 2nd-order ODE) via its **`.play(onFrame)`
  rAF loop**, mapping one `value∈[0,1]` to BOTH width-px and opacity in the same callback so they
  settle within one frame of each other. **CORRECTION (AU.W8 + AU-keyframes-coordination, formed
  specs):** the prior draft named `AnimationGroup.advanceTo(t)` as the driver — that is WRONG.
  `AnimationGroup`'s runtime constructor is **HEAVY**, reachable only behind `loadAnimationEngine()`'s
  `await import("./engine")`, which pulls `@mkbabb/value.js` — using it would breach the value.js-free
  guarantee. The correct value.js-free path is `SpringProgress.play(onFrame)` directly, exactly the
  SHIPPED `useSpring.ts:105-136` pattern. **LIGHT surface only** (value.js-free): `SpringProgress`,
  `springLinearStops()`, `springTimingFunction()`, `Timeline`, `ElementMorph`, `RAFPlayback`,
  `toEasing` — the **FORBIDDEN HEAVY list** is `loadAnimationEngine`, the `AnimationGroup` runtime,
  `fromString`, `resolveEasing`. See `waves/AU-keyframes-coordination.md §2` for the exact permitted/
  forbidden symbol table.

**Who emits the spring.** glass-ui already does the right thing: `scripts/regen-spring-tokens.mjs`
runs the keyframes.js solver at BUILD time to bake the `--spring-*` CSS `linear()` tokens
(`tokens.css:158-161`, 48-sample grid). The morph curve stays a **CSS token**; the FLIP/VT
transition consumes it. keyframes.js is the build-time AUTHOR of the curve and (for B) the runtime
DRIVER of the `SpringProgress.play()` loop — **one solver, both paths, bit-identical motion.** No
keyframes.js change is required (§6). The implementation-ready detail lives in the formed wave specs
`waves/AU.W8-dock-motion.md` + `waves/AU.W8b-modern-css.md` + `waves/AU-gate-fleet-augment.md` (which
SUPERSEDE this section's sketch).

### 2.3 iOS spring params — author `--spring-dock`

The current morph rides `--spring-snappy` = `{response: 0.35, ζ: 0.65}`, +6.8% overshoot
(`tokens.css:1266`). One agent says KEEP; another reads the user's "not springy" as the snappy
curve reaching 1.0 at ~48% then plateauing (mechanical). **Decision:** author a dedicated
`--spring-dock` (~15–30% overshoot, ζ≈0.5), generated by the SAME `regen-spring-tokens.mjs` solver,
and route `--dock-resize-spring` through it — a tuning change, isomorphic. Per-class:

| interaction | preset | (response, ζ) | overshoot |
|---|---|---|---|
| expand/collapse morph | **`--spring-dock`** (new) | (0.5, 0.5) | ~15–30% |
| show/hide (idle-collapse) | smooth / critically-damped | (0.5, 0.86) | none |
| icon/tab press-back | `--dock-press-spring` (existing) | (0.5, 0.45) | +20.5% |

**Do NOT touch `--dock-press-spring`** (`tokens.css:1275`) — press feedback is an orthogonal
transform-only family that must never touch surface fades (`dock.css` docstring; risk §6).

### 2.4 Modern CSS — ADOPT / DEFER (from the 12 AnimSOTA agents + `modern-web-guidance`)

| feature | verdict | why |
|---|---|---|
| View Transitions (layer A↔B morph) | **KEEP (mature)** | shipped + correct; VT/FLIP unified on `--dock-resize-spring` (`view-transition.css:47-62`). iOS Safari has no VT → **FLIP is the live iOS path; the §2.2 fix MUST land in the FLIP fallback.** |
| `interpolate-size: allow-keywords` + `calc-size(auto)` | **ADOPT (W8b)** | lets `.dock-layers` transition to `width:auto` natively, **eliminating the JS measure/pin dance that CAUSES the async gap**. Baseline 2024. Caveat: verify no double-animate with the VT path. |
| `@starting-style` + `transition-behavior: allow-discrete` | **ADOPT (W8b)** | recipe proven for top-layer (`animations.css:300-366`); apply to `.dock-layer` so visibility flips in lockstep with opacity — folds the §2.1 visibility fork into one discrete-animated property. |
| anchor positioning (dock popovers) | **ADOPT (W8, P1)** | native `anchor()` replaces floating-ui CSS overrides; `@supports`-gated. |
| CSS nesting (dock.css refactor) | **ADOPT (W8b, P2)** | readability; zero behavior change; pairs with the dock.css split (§5.4). |
| compositor `scaleX` over `width` | **DEFER → BOOK** | escapes layout reflow but distorts children unless counter-scaled; adopt only if (A)+interpolate-size do not settle the feel. |
| child stagger orchestration | **DEFER → BOOK** | the user wants items to **lead-or-lockstep, NOT trail** — stagger risks re-introducing perceived lag. Matches AU.md §4.2 #14 BOOK. |
| container queries · `:has()` · scroll-driven · popover · `color-mix` · `text-wrap` | **KEEP (mature)** | already idiomatic. |

### 2.5 reduced-motion

CSS VT already gates to `animation:none` under PRM (`view-transition.css:27-33`) and the spatial
gate suppresses width/height (`dock.css:372-374`). **Gap to close:** wire the FLIP fallback + any
keyframes.js driver to honor PRM explicitly — `SpringProgress({ respectReducedMotion: true })`
snaps to target in one emission; the VT path checks `prefersReducedMotion()` before
`startViewTransition`.

---

## §3 — Re-scoped wave table (supersedes AU.md §3 rows W8–W10)

| id | what | type | one-line gate |
|---|---|---|---|
| **W8** | **Dock-design headline — MOTION-led, ONE atomic pass.** (1) single-frame FLIP sync (`useLayerTransition.ts:146→167`); (2) author `--spring-dock` (~20% overshoot) + route `--dock-resize-spring` (+ re-pin `proof-dock-motion-parity.mjs:193` off the hard `--spring-snappy` assert); (3) the keyframes.js `SpringProgress.play()` one-rAF driver for the FLIP fallback (value.js-free LIGHT surface; NOT `AnimationGroup`); (4) reka-ui `Tabs` rail + travelling indicator; (5) the dock a11y/state contract test; (6) `<Role>Dock` docs vocabulary (README + gate already authored); (7) anchor-positioning for dock popovers | IMPL | `proof:dock-motion-single-source` (Playwright settle probe: container-width-stop ↔ child-opacity≤0.01 within ±1 frame) **+** `proof:dock-a11y-contract` **+** `proof:dock-vocabulary` |
| **W8b** *(NEW)* | **Modern-CSS + encapsulation/styling folds.** `interpolate-size`+`@starting-style`+`allow-discrete` on `.dock-layer` (folds the visibility fork); CSS-nesting; split `dock.css` → `dock.css`/`dock-controls.css`; non-idiomatic Tailwind lift (12 sites → `@theme`/`@utility`); deprecated `-webkit-*` cleanup; `defineModel` ×8; context `Readonly<>` guards | IMPL | `proof:design-idiom-localization` + `proof:dock-css-split` (born-RED on inject) |
| **W9** | **Control-pane + dark-ergonomics + lean folds + slides-supply** (intent unchanged): A-1 divider + A-2 label ladder; `useGlobalDark({initialValue})` + `darkModeSyncScript()`; Drawer `:native` (FOLD-IF, now FOLDed — chronic, §3.1); size-vocabulary FOLD-IF; the publish-gated slides-supply (`showClose`, `/deck` lift, Card/Badge, `useCountup`+`v-reveal`) | IMPL | `proof:au-w9-consumers` — each fold names ≥2 consumers |
| **W10** | **Close + 3.3.0 READY-TO-PUBLISH** (unchanged): the component splits (§5.1, polish-tier), overfitting audit, gates matrix green, `AU.FINAL` + the deferral register, the changeset staged not auto-published (publish USER-DOMAIN) | IMPL (LAST) | `proof:au-final` |

**Why W8b is split from W8.** The publish-blocking a11y/motion CONTRACT (W8) must not be gated by
readability/encapsulation polish. W8 is the one atomic motion+a11y+vocab commit; W8b is the
modern-CSS + hygiene fold that can land just after without blocking the 3.3.0 contract.

### 3.1 Deferred-sweep verdict — chronics FOLDed (supersedes AU.md §4 BOOK rows where noted)

| item | chronic? | verdict | why |
|---|---|---|---|
| dock motion quality (spring + containment) | NEW | **FOLD → W8** | the user directive promotes it to the headline (was AU-DOCK KEEP-DEFERRED, overridden) |
| Drawer `:native` / `GlassNativeDrawer` | **YES (AT→AU)** | **FOLD-W9** | strongest non-headline ≥2 (muster + speedtest FIRM); user wants chronics folded |
| `text-box-trim` | **YES (AS→AT→AU)** | **BOOK-named** (explicit, no silent drop) | 3-tranche chronic, 0-consumer; W4 closed without the SFC diff; keep named |
| `proof:webgl-golden` | YES (W6→W7→W10) | **KEEP-DEFERRED (documented)** | headless WebGL-live unavailable in CI; CPU-equivalence ~2e-16 + aurora capture-render = GPU correctness. Write `proof-webgl-golden-DEFERRED.md`; cite in FINAL |
| `useCanvas2D` + constellation lift | — | **KEEP-DEFERRED (BOOK)** | §4 — single-consumer, Canvas2D ≠ WebGL substrate; ≥2-consumer bar UNMET |
| `useDockMagnify` / dock BOOK batch #13–16 | partial | **KEEP-DEFERRED** | named-trigger BOOKs (≥2 dock consumers) |
| `<Role>Dock` base component | — | **BOOK** (docs vocabulary FOLDs to W8) | the COMPONENT waits for a 2nd consumer (keyframes D.W5); the README+gate ship now |
| Button `size=icon-sm` (#17)+Select size (#20); useGlobalDark+syncScript (#21–22); ConfiguratorLayer A-1/A-2 (#30–31) | no | **FOLD-W9** | paired vocabulary / dark-ergo / control-pane |
| KILL batch (#23,#36,#47–55; inner-rounding user-RULED) | — | **KILL (terminal)** | do not resurrect |
| OUT batch (#56–63: value.js, precepts, CI) | — | **OUT (inv-16)** | #57 value.js unblocks on the W10 publish |

---

## §4 — The constellation question (D5, answered)

The user asks the constellation be "abstracted into a glass-ui component, if not already." **Verdict:
NOT now — KEEP-DEFERRED (BOOK `useCanvas2D`).** Grounds (`gap-constellation`, `audit-overfitting`):
the constellation is **single-consumer** (one deck), **identity-embedded** (the anomaly ring +
dashed label + `data-resolved` checkmark + `--ncsu-red` are total TIL semantics), and **Canvas2D,
not WebGL2** — forcing it onto AU's `useWebGLCanvas` substrate is the WRONG tier (architectural
distortion). The ≥2-consumer bar is UNMET (grep of keyframes.js + feedback-coder = 0 drifting-lattice
canvas). The correct FUTURE home is a `useCanvas2D` composable (composing the shipped `useRAFLoop` +
`useIntersectionPause`), **BOOK** until a 2nd deck wants a lattice. The slides arm does the
**neutral/skin split** locally (F.W4) so a future lift is mechanical without adding abstraction now.
The visibility fixes the user reports (dark + light) are **slides-local token work**, not a glass-ui
lift (§7).

---

## §5 — The convergence folds (D6–D8)

### 5.1 Component splits (`enc-gu-splits`) — W8b/W10, polish-tier

| site | lines | fold |
|---|---|---|
| `timeline/ContinuousTimeline.vue` | 901 | → `ContinuousRail.vue` (`:222-249`) + `ContinuousMarkers.vue` (`:255-365`); keep the orchestrator |
| `tabs/BouncyToggle.vue` | 544 | extract `composables/useBouncySlider.ts` (state `:103-149`, measure `:153-200`, RO `:251-281`) |
| `aurora/Aurora.vue` + `shaders/` | 212 + 819 | lift `shaders/`+`presets.ts`+`renderMode.ts` into a `constants/` subdir |
| `dock/GlassDock.vue` (421) · Configurator (945) · MetricStack · Command · DataTable | — | **NO split — already KISS / well-factored** (cited as the reference pattern; do NOT over-engineer) |

### 5.2 Colocation (`enc-colocation`) — W8b, optional/KISS
`Pulse`/`StatusDot`/`IconTooltip`/`ToggleChip` 2-file dirs → optional `custom/primitives/` (FOLD if
the team prefers; otherwise the flat layout is already correct — no contrivance).

### 5.3 Modern Vue patterns (`enc-vue-patterns`, all isomorphic) — W8b/W9
- **`defineModel` (8 sites):** `MultiSelect`, `BouncyTabs`, `UnderlineTabs`, `BouncyToggle`,
  `ResponsiveTabs` (`:82-84`), `HoverPopover` (`:156-166` — folds 10 lines of dual-watch),
  `DataTable` (`:62-65`), `ConfiguratorLayer`.
- `SearchBar` ref → `useTemplateRef` (P3). `defineSlots` — KEEP-DEFERRED (no high-complexity slot
  consumer).
- **`Readonly<>` context guards (type-only, zero-runtime):** `dock/composables/dockContext.ts:27-36`
  (keepOpen/release), `dockLayerContext.ts:20-25` (the mutable `currentLayerId`/`leavingLayerId`
  refs leak — wrap `readonly()`).

### 5.4 Styling folds (D8)
- **Non-idiomatic Tailwind (12 sites, W8b):** `text-[var(--…)]` wraps → `@theme` tokens
  (`CardDescription.vue:11`, `TabsTrigger.vue:22`); fixed px (`ComboboxList.vue:24`) → sizing
  tokens; compound `transition-[…]` (`CarouselDots.vue:62`, `AccordionContent.vue:18`) → `@utility`;
  `shadow-[var(--shadow-card)]` (`Card.vue:73`) → `shadow-card`.
- **Monolith (W8b):** `dock.css` (1200 L) → `dock.css` (shell+density `:8-179`) / `dock-controls.css`
  (control family `:730-1103`). `glass.css` + `animations.css` correctly global — KEEP.
- **Design-idiom (W8):** glass-ui's `tokens.css → theme.css → utilities.css → scoped CSS` cascade is
  the **GOLD STANDARD** (it is the pattern slides-F adopts). The fold ENFORCES "scoped `<style>`
  consumes only `var(--…)` + `@utility`, no hardcoded literals" via `proof:design-idiom-localization`.
- **Deprecated (W8b) — RE-GROUNDED (these AU-AUGMENT citations were stale; `waves/AU.W8b-modern-css.md
  §7` corrects them):** `glass.css:326` `-webkit-backdrop-filter` is a **feature-test predicate — KEEP**;
  `utilities.css` `-webkit-scrollbar` is **already `@supports`-guarded — KEEP**; there are **zero raw
  `rgb(255 255 255)`** at HEAD. Per the modern-web-guidance Baseline ledger, `scrollbar-color` is only
  *Newly* available (Baseline 2025-12-12), so `::-webkit-scrollbar` MUST be kept as a fallback for a
  "Widely Available" target — do NOT strip it. The ONE real fold is adding `scrollbar-width: none` to
  `.scrollbar-hidden`. Keep `-webkit-background-clip:text` (load-bearing).

---

## §6 — Cross-repo coordination + risks

- **keyframes.js is READ-ONLY upstream (inv-16).** The dock consumes the **LIGHT, value.js-free**
  surface only — `SpringProgress` (+ `.play()`), `springLinearStops`, `springTimingFunction`,
  `ElementMorph`, `Timeline`, `RAFPlayback`, `toEasing`; **no keyframes.js change is required.** The
  `AnimationGroup` runtime + `loadAnimationEngine`/`fromString` are the **FORBIDDEN HEAVY** path (they
  pull `@mkbabb/value.js`) — see `waves/AU-keyframes-coordination.md §2.4`. The dock-driver uses
  `SpringProgress.play(onFrame)` and never touches the HEAVY boundary, so ZERO value.js enters the
  bundle. keyframes D.W5 *consumes* the published 3.3.0 dock (one-way).
- **slides coordination.** AU publishes 3.3.0 → slides F bumps `^3.2.0 → ^3.3.0` and the dock-motion
  fix lands downstream. The motion fix is **glass-ui-owned, NOT slides-local.** The progress-de-dock
  is **already structurally clean** (the bar is a viewport-root sibling); its visual articulation is
  **slides-local** (F arm). The constellation dark-arm token is **slides-local** (`deck.css:196`,
  F.W4).
- **Isomorphism risks.** (A) defers refs one rAF — safe Vue reactivity, no API change. `interpolate-size`
  may double-animate with the VT path — browser-test before landing. `--spring-dock` retune is
  isomorphic (same duration) but `proof:dock-motion-parity` (`gates.mjs:43`) must still see both
  engines on one source — and `proof-dock-motion-parity.mjs:193` currently **hard-asserts
  `--spring-snappy`**, so it MUST be re-pinned to `--spring-dock` in the same commit or it goes RED. The visibility-fork (§2.1) is LOAD-BEARING — any `@starting-style` rewrite
  preserves the 3-state contract. `--dock-press-spring` must NEVER fold into the resize family.

### 6.1 Gate fleet (the §3 gates, born-RED)

`scripts/gates.mjs` is the manifest (inv-θ; `verifyCi()` enforces manifest==ci). **Four W-gates are
enumerated in the AU.W1c registry but ABSENT from `gates.mjs`** — they are added at their wave:

| gate | wave | born-RED bite-check | status |
|---|---|---|---|
| `proof:dock-motion-single-source` (NEW) | W8 | Playwright: collapse the dock, rAF-sample `getComputedStyle`; assert container-width-stop frame == child-opacity≤0.01 frame within ±1 frame. Re-inject the async fork → RED. The **perceptual** sibling of the string-match `proof:dock-opacity-lockstep`. | author |
| UPDATE `proof:dock-opacity-lockstep` | W8 | keep the static token-match (`gates.mjs:44`); demote to "syntactic"; note → the perceptual gate. | edit |
| `proof:dock-a11y-contract` (NEW) | W8 | vitest: `role=tablist`/`tab`+`aria-selected` (NOT `aria-pressed`), roving tabindex (Arrow/Home/End), focus-visible, keepOpen/release. Delete `aria-selected` → RED. | author |
| `proof:dock-vocabulary` (ready) | W8 | `scripts/proof-dock-vocabulary.mjs` EXISTS + passes (bite verified); delete a role from the README → RED. Add the manifest entry. | add entry |
| `proof:design-idiom-localization` (NEW) | W8b | grep flagged SFCs for `text-[var(--…)]`/`shadow-[var(--…)]` wraps → must be 0. Re-inject one → RED. | author |
| `proof:dock-css-split` (NEW) | W8b | assert no `.dock-icon-button`/`.dock-tab-button` rule survives in `dock.css`. | author |
| `proof:au-w9-consumers` (NEW) | W9 | each W9 fold item ↦ ≥2 consumers OR a correctness tag. | author |
| `proof:au-final` (NEW) | W10 | release-only: full matrix green / clean tree; FINAL cites a green run id per wave; overfitting zero orphans; changeset staged not auto-published. | author |

The `README.md` + `proof-dock-vocabulary.mjs` are **already authored** (untracked, passing) — they
land with W8; the manifest entry is the only registration step (deferred to W8 IMPL so CI stays
green until the gate's siblings exist).

---

### 6.2 modern-web-guidance Baseline decision-changes (folded)

The `modern-web-guidance` npm package was run (`retrieve`) over every modern-platform / a11y / forms
item; the authoritative Baseline-dated corpus + the crosswalk are at
`audit/AUGMENT/{mwg/, modern-web-guidance-crosswalk.md}`. Six decisions change or sharpen as a
result — each is folded where named:

| # | decision-change | Baseline authority | folds into |
|---|---|---|---|
| 1 | **`:user-invalid` REVISIT** — AU.W3 KILL'd the `.input-pill :user-invalid` rung; the `accessible-error-announcement` use case gives the canonical `aria-invalid`↔`:user-invalid` + validate-after-interaction recipe. Reinstate it for the glass-ui Input (and the slides DeckGate). | `:user-valid`/`:user-invalid` Widely, Baseline **2023-11-02** | **W9** (glass-ui Input a11y) + slides **F.W1** (DeckGate) |
| 2 | **VT keep-FLIP CONFIRMED** + mandatory post-VT focus routing | View Transitions Newly **2025-10-14** (active-VT 2026-01-13) | **W8** (AU.W8 reform folds it) |
| 3 | **keep `::-webkit-scrollbar` fallback** (do NOT strip) | `scrollbar-color` Newly **2025-12-12** | **W8b §7** (already re-grounded) |
| 4 | **`@property` typed tokens** — type interpolated custom props, but NEVER register a design-token color as `<color>` (`light-dark()` stops re-resolving) | registered custom props Newly **2024-07-09** | **W8b** (design-idiom unit) |
| 5 | **`interpolate-size`/`calc-size()` are LIMITED (Chrome/Edge), NOT Baseline** → the `@supports` gate is mandatory CORRECTNESS, not polish; `@starting-style`/`transition-behavior` ARE Baseline-safe | starting-style **2024-08-06**; calc-size limited | **W8b §1** |
| 6 | **`text-wrap:pretty` + `accent-color` are NOT Baseline** → gate as enhancements | per corpus | **W8b** / slides typography |

## §7 — The library-optimum map (D6 — what glass-ui owns vs what stays slides-local)

| slides surface | current | glass-ui target | gate |
|---|---|---|---|
| dock collapse/morph | consumes `GlassDock` | **glass-ui owns the fix** (W8) — slides bumps the pin post-3.3.0 | `proof:dock-motion-single-source` |
| access modal | hand-composed reka primitives | **Dialog `showClose` gap** (FG.W-dialog, post-3.3.0) — slides restyles onto Dialog `variant=glass` locally now | F.W1 |
| locked-card affordance | slides-local | **KEEP-LOCAL** (single-consumer identity) | F.W1 |
| pptx light/dark submenu | DropdownMenuSub | **CONVERGED at HEAD** (DropdownMenu shipped) — slides adds icons | F.W2 |
| constellation | slides-local Canvas2D | **KEEP-LOCAL**; `useCanvas2D` BOOK (§4) | F.W4 |
| `.card`/cartoon surface | slides re-decl | Card `surface="cartoon"` dark-arm (FG.W-card-badge, post-3.3.0; 7 consumers — liftable) | FG.W-card-badge |
| count-up / reveal motion | forked in `useDeckNav` | `useCountup` + `v-reveal` (FG.W-motion, AT-disjoint, can open now) | FG.W-motion |

**Gaps in glass-ui** (folded): the dock-motion contract (W8), Dialog `showClose` (W9 slides-supply),
the design-idiom enforcement gate (W8b). **Gaps in slides** (the F arm): the visual articulation of
the progress bar, the constellation dark-arm token, the systemic mobile-squish, the per-slide
data-viz aspect-ratios — all slides-local, see `F-AUGMENT.md`.

---

## §8 — Prompt-coverage recap (glass-ui-facing; every ask → addressed)

Cross-checked against `recap-prompts`. The slides-facing recap is in `slides/.../F-AUGMENT.md §RECAP`.

| ask (across the engagement) | status | where |
|---|---|---|
| dock VT/FLIP spring parity | **DONE-AT-HEAD** (`e906448`; re-verified on AU CI at W10) | AU.md §4.9 ASK-6 |
| dock touch-gate double-tap | **DONE-AT-HEAD** (`f0b0ffb`) | AU.md §4.9 ASK-8 |
| dock springy/iOS + the shrink-before-fade lag | **FOLD → W8** (the headline) | §2 |
| keyframes.js collaboration for the spring engine | **W8** (read-only upstream, LIGHT surface) | §2.2, §6 |
| animation SOTA + modern-web-guidance | **DONE** (12 agents) → adopt/defer table | §2.4 |
| constellation → glass-ui component | **KEEP-DEFERRED** (`useCanvas2D` BOOK; reasoned) | §4 |
| glass-ui ↔ slides gaps / library optimum | **mapped** | §7 |
| >500-line component splits | **W8b/W10** (ContinuousTimeline 901, BouncyToggle 544; Configurator/GlassDock KISS) | §5.1 |
| modern Vue patterns + colocation + composable consistency | **W8b/W9** (`defineModel` ×8, Readonly guards) | §5.2–5.3 |
| brittle selectors / non-idiomatic Tailwind / bespoke styling | **W8/W8b** (12 sites + monolith split + design-idiom gate) | §5.4 |
| localized design-idiom area | glass-ui is the **gold-standard already**; enforce via gate | §5.4 |
| chronically-deferred items folded | **§3.1** (Drawer:native FOLD-W9; text-box-trim/webgl-golden named-deferred) | §3.1 |
| Fraunces WONK/SOFT (slipped) | **DONE** (W4, `proof:font-axes`) | PROGRESS W4 |
| strict-templates keystone + correctness debts | **DONE** (W3) | PROGRESS W3 |
| the blob trio + shader-quality | **DONE** (W7) | PROGRESS W7 |

**Zero glass-ui-facing asks unaddressed.** The remaining open items are the IMPL execution of
W8/W8b/W9/W10 (greenlit) and the USER-DOMAIN publish.

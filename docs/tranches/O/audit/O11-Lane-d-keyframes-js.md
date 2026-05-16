# O11 Lane d—keyframes.js consumer deep audit

## Preamble

**Scope:** `/Users/mkbabb/Programming/keyframes.js/`—O.W1 consumer-audit round-2 deliverable. READ-ONLY.

**Target:** keyframes.js @ `7561af3` on `master` (v2.1.0—AB.W6 settle release). Working tree CLEAN; `--since=2026-05-13` log returns 0 commits.

**Glass-ui reference:** `/Users/mkbabb/Programming/glass-ui/` @ O open (post-N close `37288e0`, v1.1.4 published).

**Baseline:** `docs/tranches/N/audit/N11-Lane-d-keyframes-js-N4-rerun.md` (2026-05-14). The N4 re-run confirmed the M.W1 subpath-migration commit (`b788205`) is on master—not on a WIP branch as the original N11 baseline assumed.

**Round-1 glass-ui findings touching this consumer:** O-Rα §F1 (Aurora init swallow → throw); the rest of round-1 (god-modules / DI / pipeline / chronic-deferrals) are glass-ui-internal and do not radiate to keyframes.js.

**Method:** per O11/a + per-component scaffolding cleanup analysis; angle prompts in the dispatch (idiomatic-use; gates blocking the 84 % overfitting + marginal cleanup; F1 Aurora-throw impact; idle-bob disposition).

---

## Section 1—F1 Aurora-throw impact

**Question:** does keyframes.js consume `<Aurora>` or `useAurora` from `@mkbabb/glass-ui/aurora`?

**Evidence:** `rg "Aurora|useAurora|Metaball|MetaballCanvas|aurora" demo/ -l` → **0 hits** (one match in `useEditorShortcuts.ts` for the unrelated word "or"; no Aurora/Metaball substrate consumption).

**Verdict:** **F1 NO-IMPACT** on keyframes.js. The Aurora subpath is not on this consumer's import surface. Whatever throw / event-emit / consumer-opt-in shape Rα §F1 lands at O.W1 Lane A, keyframes.js does not need to consume the new contract.

**Cross-Rα verification:** the Rα F2/F3 metaball-shader throws are also outside scope (no metaball consumption); F4 (Configurator clone)—no Configurator consumption (re-verified at N4: `rg "from \"@mkbabb/glass-ui/configurator"` → 0 hits); F5 (typewriter unreachable)—no typewriter consumption. **Entire Rα cohort is NO-IMPACT on keyframes.js.**

---

## Section 2—idle-bob keyframe disposition

**Site:** `demo/cube/CubeTarget.vue:139-146`.

```css
.idle-hover {
    animation: idle-bob 3s var(--ease-standard) infinite alternate;
}
@keyframes idle-bob {
    0% { transform: translateY(0); }
    100% { transform: translateY(5px); }
}
```

**Consumer scope:** scoped `<style scoped>` block in the cube demo's `CubeTarget.vue`; one consumer only (`demo/cube/`). Pure decorative idle-state hover bob.

**Canonical-candidate evaluation:** the keyframe is two-stop, single-axis, fixed 5px translate. It is NOT recipe-overlapping with any glass-ui-canonical animation (no `floating-panel-in`, no `tooltip`, no `collapsible`, no `shimmer`). Pattern is local to a single demo scene.

**Verdict:** **ad-hoc—not a canonical candidate.** Documented per N4 re-run as a 3rd raw ungated `@keyframes` block (alongside `liftDown`, `dotFade` in `AnimatedText.vue`). Disposition unchanged from N4: carry-forward under N7 proposal (`.motion-safe` / `@motion-gate` utility) which would wrap this + 2 baseline keyframes with `prefers-reduced-motion: reduce`.

If consumer-side cleanup ever lands, the idle-bob can either (a) move to `animations.css` consumer-local pattern, or (b) inline `prefers-reduced-motion: reduce { .idle-hover { animation: none; } }`. Glass-ui-side: **no action**; the recipe does not reach the ≥ 2-consumer bar (J invariant 10).

---

## Section 3—84 % overfitting + marginal cleanup gates

**Re-verification at O HEAD:** scaffolding shape unchanged from N4 re-run.

```
demo/@/components/ui/ (25 dirs total)
 STRICT-ZERO external consumers (20 dirs):
   alert, alert-dialog, aspect-ratio, auto-form, breadcrumb,
   carousel, chart-area, chart-bar, chart-donut, chart-line,
   menubar, navigation-menu, pagination, pin-input, range-calendar,
   resizable, sonner, table, toast, v-calendar
 MARGINAL (1 dir):
   calendar—1 external consumer
 ACTIVE-CONSUMED (4 dirs):
   button (19), form (10), chart (4), label (2)
 NOMINAL (one external consumer, but high-value singletons—kept by N4):
   input (3), accordion (2), textarea/switch/separator/select/
   radio-group/popover/checkbox/card (1 each)
```

Total 84 % (21/25 zero-or-marginal); **0 dirs cleaned at HEAD since N4** (1 day window; no expected change).

### 3.1 Why has the gate not cleared?

Per CONSTELLATION.md §6: keyframes.js orchestrates its own tranche stream—glass-ui is READER-ONLY here. The user has not dispatched a cleanup wave inside keyframes.js. Possible reasons (hypothesis, not fact):

1. **Carrying-cost-low.** The scaffolding is genre-recognizable shadcn-vue init; deleting requires hand-verification that nothing in `auto-form/`, `chart-*`, `range-calendar/` is reached via indirect string-keyed lookup (e.g., `auto-form` is field-type driven). The audit cost > the maintenance cost at present.
2. **Latent-genre value.** Auto-form / charts / pin-input / range-calendar are pre-positioned for "if a future demo needs them." Demo-private substrate that hasn't been needed yet but might be.
3. **No tranche has demanded it.** The 84 % count is a finding, not a directive. Without a user "clean up shadcn scaffolding" prompt, it stays.

### 3.2 Glass-ui-side affordance opportunities

The dispatch prompt asks for **idiomatic-use finds glass-ui SIDE could offer**. Two candidates surfaced:

#### Candidate L1—`/scaffold-baseline` curated re-export subpath (DEFER; not justified)

A `@mkbabb/glass-ui/scaffold-baseline` subpath that re-exports the genre-canonical shadcn-vue scaffolding (Alert, Breadcrumb, NavigationMenu, Pagination, Resizable, Table, Toast, Sonner) would let keyframes.js retire its 8 strict-zero dirs by replacing `demo/@/components/ui/alert/index.ts` etc. with a one-line `export * from "@mkbabb/glass-ui/scaffold-baseline";`.

**Cost-benefit:** the substrate-without-consumer invariant (J invariant 10, L invariant 8) forbids glass-ui from shipping primitives without ≥ 2 consumers. Of the 8 candidates above, glass-ui itself ships only a subset (alert, table, toast, sheet; not navigation-menu, pagination, resizable, sonner, breadcrumb, auto-form, range-calendar, pin-input—most retired at L.W3 or never landed). **Building `/scaffold-baseline` would re-introduce substrate-without-consumer.** REJECTED.

#### Candidate L2—`MIGRATION.md` precept: "shadcn-vue init scaffolding hygiene" (LIGHT-WEIGHT; PROPOSE)

A short precept addition to `MIGRATION.md` or `CLAUDE.md` documenting the cleanup pattern for consumers that init via the shadcn-vue CLI and then accumulate dead scaffolding. Shape:

> When initializing a consumer demo via `shadcn-vue init`, the CLI generates 25-40 `ui/` dirs by default. Before tagging a release: run a consumer-count audit (`rg "@/components/ui/<dir>" demo/ -l | grep -v "components/ui/<dir>/" | wc -l`). Delete any dir with 0 external consumers UNLESS it is held for a documented near-term feature (record the deferral in the consumer's PROGRESS.md).

**Cost-benefit:** documentation-only; one-shot author. Benefits all 6 consumers in the constellation (words/frontend, fourier-analysis, bbnf-buddy, keyframes.js, value.js, speedtest). LOW-COST; PROPOSE for O.W*-precept-tier wave (~10 LOC + a `docs/precepts/` slot).

### 3.3 Gate-clearing without glass-ui-side action

The 84 % overfitting can be cleared entirely consumer-side via a single keyframes.js commit:

```
rm -r demo/@/components/ui/{alert,alert-dialog,aspect-ratio,auto-form,breadcrumb,carousel,chart-area,chart-bar,chart-donut,chart-line,menubar,navigation-menu,pagination,pin-input,range-calendar,resizable,sonner,table,toast,v-calendar}
git rm demo/@/components/custom/{Animated.vue,CommandPalette.vue,ResponsiveSelect.vue}  # zero-consumer custom
```

That's a 23-path delete, 0 import-rewrites required (because no external file imports any of them). Build + test + dev should pass unchanged. **The gate is not blocked by glass-ui; it is awaiting a keyframes.js orchestrator wave.**

---

## Section 4—Hover-scale regression continues to grow

**N4 baseline:** `hover:scale-105` count was 6 (Sept) → 10 (N4 re-run, 2026-05-14 morning) → **13 at O HEAD (2026-05-14 evening)**.

Sites at O HEAD (13 total):
- `demo/@/components/custom/editor-shell/SharePopover.vue:1`
- `demo/@/components/custom/editor-shell/EditorShell.vue:1`
- `demo/@/components/custom/editor-shell/EditorHeader.vue:1`
- `demo/@/components/custom/animation-controls/timeline/KeyframeTimeline.vue:1`
- `demo/@/components/custom/animation-controls/keyframes/KeyframeCard.vue:1`
- `demo/@/components/custom/animation-controls/keyframes/KeyframesEditor.vue:3`
- `demo/@/components/custom/animation-controls/controls/TimingFunctionPanel.vue:1`
- `demo/cube/App.vue:2`
- `demo/app/App.vue:1`
- `demo/app/scenes/CubeScene.vue:1`

**Glass-ui-side affordance:** `--scale-hover` is already a canonical glass-ui token (`src/styles/tokens.css`). The consumer-side migration is `hover:scale-105` → `hover:scale-[var(--scale-hover)]` or `class="... scale-on-hover"` if a utility lands.

**Candidate L3—`@utility scale-on-hover`** (LIGHT-WEIGHT; PROPOSE for token-tier wave). A 2-line `@utility` in `src/styles/utilities.css`:

```css
@utility scale-on-hover {
    @apply transition-transform duration-fast ease-standard;
    &:hover {
        transform: scale(var(--scale-hover));
    }
}
```

Two-consumer bar: 13 sites in keyframes.js alone + similar drift expected in other consumers (per N4: Words frontend has 9 `--scale-press-{xs..lg}` ladder sites; the hover-scale ladder is the dual). **CLEARS J invariant 10.** Cohort with O-N-7 `--scale-press-{xs..lg}` ladder proposal for the same token-tier wave.

---

## Section 5—Subpath migration health (M.W1 Lane A → O HEAD)

Verified via `rg "from \"@mkbabb/glass-ui` demo/`. All 7 M.W1 subpath targets remain canonical:

| Subpath | Sites at O HEAD | Notes |
|---------|------------------|-------|
| `@mkbabb/glass-ui` (root barrel) | **32 files** | Curated vueuse-FREE surface (L.W1 Lane A)—consumed correctly |
| `@mkbabb/glass-ui/forms` | 7 files | `Input` (6), `Textarea` (1) |
| `@mkbabb/glass-ui/dark` | 3 files | `useGlobalDark` |
| `@mkbabb/glass-ui/keyboard` | 4 files | `registerShortcut`, `useRegisteredShortcuts`, `formatComboParts` |
| `@mkbabb/glass-ui/controls` | 4 files | `DarkModeToggle` |
| `@mkbabb/glass-ui/dock` | 4 files | `GlassDock`, `DockLayer`, `DockLayerGroup`, `DockIconButton`, `DockSelectTrigger` |
| `@mkbabb/glass-ui/labeled-field` | 2 files | `LabeledSelect`, `LabeledSlider`, `LabeledSwitch`, `LabeledInput` |
| `@mkbabb/glass-ui/icon-tooltip` | 5 files | `IconTooltip` |

**Subpath surface integrity: 100 %.** Zero retired-subpath references (no `composables/dark`, `composables/keyboard`, `virtual`, `pagination`).

**N-wire regression check:** N.W0/W1/W2 strategic-wire batch + Configurator density CVA + N7 dock-blur NO-OP → keyframes.js does not consume Aurora, Configurator, GlassPanel, DockTabButton, or MetaballCanvas. **Zero regression.**

---

## Section 6—Glass-ui-side gap candidates (re-affirmed)

Carried from N11/d N4 re-run; unchanged at O HEAD:

| # | Gap | Sites in keyframes.js | Cohort suggestion |
|---|-----|------------------------|-------------------|
| **N6** | Focus-ring slot-class prop on `<Button>` variants | 5 custom-button consumers missing `:focus-visible` (`CopyButton`, `KeyboardShortcutsModal`, `TimingFunctionPanel`, `TimelineCaret`, easing-curve canvas handles) | O.W*-token-tier wave |
| **N7** | `.motion-safe` / `@motion-gate` utility wrapping `prefers-reduced-motion: reduce` | 3 raw ungated `@keyframes` blocks (`liftDown`, `dotFade`, `idle-bob`); 0 demo files reference `prefers-reduced-motion` at all | O.W*-token-tier wave |
| **L3** (new) | `@utility scale-on-hover` over `--scale-hover` token | 13 sites in keyframes.js; cross-consumer dual to O-N-7 press-scale ladder | O.W*-token-tier wave |

---

## Section 7—Findings (facts vs. hypotheses)

### Facts (cited, spot-verified)

- F1 Aurora-throw has zero impact on keyframes.js (`rg "Aurora|useAurora" demo/` → 0 hits).
- The full Rα cohort (F1-F5) is NO-IMPACT on keyframes.js.
- `idle-bob` is a 1-consumer, 2-stop, ad-hoc keyframe scoped to `demo/cube/CubeTarget.vue`. Not canonical-candidate-eligible per J invariant 10.
- 84 % overfitting unchanged from N4 (20/25 strict-zero + 1 marginal).
- 3 zero-consumer custom components unchanged from N4 (Animated, CommandPalette, ResponsiveSelect).
- `hover:scale-105` count grew 10 → 13 sites since N4 (1 day).
- Subpath migration health 100 %; zero retired-subpath references; zero N-wire regression.

### Hypotheses (flagged)

- The 84 % overfitting gate is not glass-ui-blocked—it is consumer-orchestrator-blocked. A single keyframes.js cleanup commit (`rm -r` + `git rm`) would clear it without any glass-ui-side action. (Hypothesis: zero import-rewrites needed; verified via consumer scan but not via build.)
- L1 `/scaffold-baseline` subpath REJECTED on substrate-without-consumer grounds (J invariant 10 / L invariant 8).
- L2 (precept) + L3 (`@utility scale-on-hover`) are LIGHT-WEIGHT idiomatic-use proposals; cohort with the existing N6/N7/O-N-7 token-tier carryforward.

---

## Section 8—Plan implications (which O.W* wave absorbs)

| Finding | Wave candidate | Notes |
|---|---|---|
| F1 Aurora-throw consumer-impact = NONE | n/a | No keyframes.js-side action; tracked at Rα §F1 / O.W1 Lane A. |
| L2 precept "shadcn-vue init scaffolding hygiene" | **O.W*-precept-tier** | Cross-consumer documentation; benefits 6 consumers. ~10 LOC. |
| L3 `@utility scale-on-hover` | **O.W*-token-tier** | Cohort with N6/N7/O-N-7 (`--scale-press-{xs..lg}`); clears J invariant 10. |
| N6 Button focus-ring slot-class | **O.W*-token-tier** | Same wave; 5 sites in keyframes.js. |
| N7 `.motion-safe` / `@motion-gate` | **O.W*-token-tier** | Same wave; 3 raw blocks in keyframes.js. |
| 84 % overfitting + 3 zero-consumer custom | **CONSUMER-OWNED (keyframes.js orchestrator)** | Glass-ui READER-ONLY per CONSTELLATION.md §6. |
| `hover:scale-105` 13-site regression | **CONSUMER-OWNED** post-L3 lands | Migration: `hover:scale-105` → `scale-on-hover` utility. |

---

## Section 9—Risks and unknowns

1. **L3 utility name collision.** `scale-on-hover` is a candidate name; if a clearer canonical (`hover-pop`? `hover-scale`?) is preferred, surface at synthesis. The `--scale-hover` token already exists; the utility binds to it.
2. **N7 motion-safe shape.** Two competing shapes: `@utility motion-safe { ... }` vs. `@keyframes-safe` directive. Existing glass-ui practice: per-keyframe `@media (prefers-reduced-motion: reduce)` wrapper inside `animations.css`. The utility shape is the cleaner export; the per-keyframe shape is the current canon. Decision deferred to O.W* token-tier wave.
3. **Build-without-cleanup not verified.** Section 3.3's claim that "23-path delete, 0 import-rewrites required, build + test + dev pass unchanged" is import-graph-verified but not run-time verified. The orchestrator can spot-verify if/when a consumer-side cleanup wave dispatches.
4. **`idle-bob` re-classification.** If a future cube-demo-adjacent consumer (e.g., a future glass-ui story) wires the same pattern, the keyframe clears the ≥ 2-consumer bar and becomes a canonical candidate. Re-evaluate at next tranche if cube-pattern propagation appears elsewhere.

---

**Audit signature:** O11 Lane d—F1 NO-IMPACT; idle-bob ad-hoc (not canonical); 84 % overfitting unchanged, gate is consumer-owned; hover-scale-105 regression growing (10 → 13 in 1 day); 3 LIGHT-WEIGHT glass-ui-side affordance proposals (L2 precept, L3 `@utility scale-on-hover`, plus carry-forward N6 + N7); subpath migration health 100 %; zero N-wire regression.

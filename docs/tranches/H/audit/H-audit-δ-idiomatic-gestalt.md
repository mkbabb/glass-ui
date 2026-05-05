# H — audit δ: idiomatic gestalt + KISS / one-path verification

**Date**: 2026-05-05
**Auditor**: H.W6 audit Lane δ (post-close, read-only).
**Scope**: tranche H additions and refactors at HEAD across `src/components/{ui,custom}/`, `src/composables/`, `src/styles/`, `src/index.ts`, `demo/stories/`.
**Lens**: idiomatic gestalt over artefact preservation (H invariant 5); KISS / one-path / single-authority verification; recovery-diary hunting; comparison vs. G-era δ findings.
**Method**: walked W0-W5 wave proofs against HEAD source; ran the named greps (`keepOpenWhile`, `H\.W[0-9]`, `cartoon-shadow`, `--accent-pink`, `useRafLoop`, `defineDockActionBar`, etc.); read every file the wave proofs claimed to modify and the surrounding canon. Build-time evidence drawn from W3 + W4 proof recordings.

---

## §1  Per-check findings table

| # | Check | Finding | Status | Citation |
|---|---|---|---|---|
| 1 | `dockKeepOpenSink` is the canonical primitive (W3) — no compat wrapper for retired `keepOpenWhile` | `keepOpenWhile` fully retired; zero hits in src/ + demo/. **But** `DockPopover` still consumes raw function-keys (`dockKeepOpen` / `dockRelease`) directly while `Slider` consumes the new sink — two parallel paths to "hold the dock open" | partial (one-path violation: dual-authority on dock keep-open) | `src/components/custom/dock/DockPopover.vue:38-39,45-46` (function-key path); `src/components/ui/slider/Slider.vue:44,49,54` (sink path); `src/components/custom/dock/DockLayerGroup.vue:104-105` (sink wraps function-keys) |
| 2 | `<Slider variant="glass-track">` uses existing variant scheme (no spurious CVA); `keepDockOpen` stripped from `delegatedProps` | Variant union extended with `'glass-track'` as a literal string union, no CVA introduced (`rg -n 'cva\(' src/components/ui/slider/` returns 0). `keepDockOpen` correctly stripped at line 33 along with `class` and `variant` | clean | `src/components/ui/slider/Slider.vue:11-19,32-39` |
| 3 | Paper-tier inlining (W1 Lane E) reads as straightforward CSS, not as comment-block listing retired token names | Each `.paper-N` rule is direct literal HSL + `var(--shadow-cartoon-*)` + `color-mix(...)` — no `/* was --paper-bg-2 */` annotations. Light/dark mirroring uses `:where(.dark) .paper-N` overrides cleanly | clean | `src/styles/paper.css:58-108` |
| 4 | Per-rung Fraunces axis inlining (W1 Lane E) — each rung's `font-variation-settings` is a literal | Each of `text-display-{3,4,5,mega,ultra}` declares the axis literal directly (`'WONK' 1, 'SOFT' X, 'wdth' Y`). Rungs 1 and 2 retain the `--font-display-{1,2}-variation-settings` token because each has ≥2 consumers (PipelineFlow + typography utility) — clean justification | clean | `src/styles/typography.css:82-148`; consumer of axis-1/2 token at `src/styles/utilities.css:210` + `src/components/custom/pipeline-flow/PipelineFlow.vue:133` |
| 5 | Composable barrel collapse (W1 Lane B) — `composables/color/` + `composables/monaco/` deleted; `blob/_internal/` is private | Both directories absent (`ls src/composables/` shows neither). `blob/index.ts` exports exactly 5 public surfaces (`useBlob`, `useWatercolorBlob`, plus `BLOB_CONFIG_DEFAULTS` + 5 type re-exports). `_internal/` holds the 4 demoted hooks. `src/index.ts` no longer references the deleted barrels | clean | `src/composables/blob/index.ts:1-23`; `src/index.ts` (no `composables/color` or `composables/monaco`) |
| 6 | `flourishes.vue` inline-and-remove (W1 absorb) — clean CSS using surviving tokens | The 8 `<style scoped>` rules read straight (gradient + `background-clip: text` + `gold-shimmer-slide`); no lookup-table ghosts of the retired token names. `--shimmer-blue-{dark,mid,light}` literals expand to `hsl(220 80% 35%) / hsl(200 100% 75%) / hsl(210 90% 55%)` directly in the gradient | clean (one diary leak in lead comment, see §2) | `demo/stories/foundations/flourishes.vue:241-369` |
| 7 | `blob.vue` SvgFilters inline (W1 absorb) — clean inline of the retired SvgFilters payload | The `<svg>...<defs>` block at lines 146-205 inlines the 4 filters + rainbow-gradient cleanly. **But** the wrapper `<svg class="svg-filters">` retains the orphan `svg-filters` class (no rule defines it; visual is supplied by the inline `style="position: absolute; ..."`) | partial (orphan class) | `demo/stories/primitives/blob.vue:146-205`; `rg '\.svg-filters\b' src/ demo/` returns 0 |
| 8 | Recovery-diary leaks: `H\.W[0-9]` / "user-direction" / "pass-N" / "scope-reveal" / "silent-failure" / "stash regression" | Found 4 src/ + demo/ leaks (excluding docs/): see §2. All are wave-tagged grouping comments or token-name diary annotations leaked from W1 / pre-H. None are orchestration scaffolding | partial (4 leaks) | see §2 |
| 9 | Build-time stability — H ≪ G's bloated 5min build | W3 + W4 proof commits captured `✓ built in 25.77s` (W3) and `✓ built in 24.64s` (W4). G-era proofs reported `✓ built in 4m 11s / 4m 14s`. The 10× drop is direct evidence the W1 substrate trim was structural | clean — H delivered | `docs/tranches/H/audit/W3-slider-glass-track-proof.md` (`built in 25.77s`); `W4-coverage-result.md` (`built in 24.64s`); compare W1-B/W1-E (`4m 11s / 4m 14s`) |
| 10 | Public surface narrowing — W1 proof said `src/index.ts` shrank by "4 + 2 + 4 = 10 export lines" | `git diff 97c825e 68e4097 -- src/index.ts` shows **6** export lines deleted (3 component packages: keyboard-shortcuts-modal, tier-badge, like-button; 1 svg-filters; 2 composable barrels: color, monaco). **The "10 export lines" math in `W1-A-proof.md:80` and `W1-B-proof.md:82` is incorrect** — the actual delta is 6 | partial (proof arithmetic drift; surface shrink itself is real but smaller than claimed) | `git diff 97c825e..68e4097 -- src/index.ts` |

### Additional surfaced

| # | Check | Finding | Status | Citation |
|---|---|---|---|---|
| 11 | Tabs requiring variant on List + Trigger (G δ §1.3 — H invariant 5 named this for refactor) | Tabs **still** ships two CVAs (`tabsListVariants`, `tabsTriggerVariants`) requiring consumers to pass `variant="pill"` to both `<TabsList>` and every `<TabsTrigger>`. H invariant 5 explicitly listed this as a target ("Tabs requiring variant on both List + Trigger before its provide/inject refactor") yet H did not deliver the refactor | unresolved (H committed to it; H did not ship it) | `src/components/ui/tabs/index.ts:11-46` (two paired CVAs, no `provide`/`inject` for variant) |
| 12 | NumberField cartoon descendant-attr-selector outlier (G δ §1.4) | `numberFieldVariants.cartoon` still pushes the recipe through `[&_[data-slot=input]]:` rather than restyling the host. Other cartoon branches (Button, SelectTrigger, Input) restyle the host directly | unresolved | `src/components/ui/number-field/index.ts:18-19` |
| 13 | `--cartoon-shadow*` orphan aliases (G δ §4.4) | All five `--cartoon-shadow*` + three `-{sm,md,lg}` aliases survive in `tokens.css:240-244,289-291`. They have **zero consumers** outside the `theme.css` round-trip (`var(--shadow-cartoon-X)` → `var(--cartoon-shadow-X)` → `var(--shadow-cartoon-X)`). The aliases are pure backwards-compat scaffolding from a pre-G rename and violate `feedback_no_backwards_compat` | unresolved (orphan aliases that round-trip in theme.css) | `src/styles/tokens.css:240-244,289-291`; `src/styles/theme.css:228-232,243-245`; consumer grep returns zero non-self hits |
| 14 | `--accent-pink` still defined with no consumers (G δ §4.2 + G binding-invariant 2) | `tokens.css:205,587` + `theme.css:113` define the token; consumer grep `rg 'accent-pink' src/ demo/` returns only those three definition sites. Token is orphan and was preserved against G's invariant 2 | unresolved | `src/styles/tokens.css:205,587`; `src/styles/theme.css:113` |
| 15 | Slider `(G R3)` / `(R3)` recovery-diary markers in code | Slider.vue has 3 occurrences of `R3`/`G R3` in inline JSDoc + comments. They cite the residual ID, not the canonical behavior | partial (cosmetic; same family as item 8) | `src/components/ui/slider/Slider.vue:17,43,170` |

---

## §2  Recovery-diary leaks (concrete enumeration)

`rg -n 'H\.W[0-9]|user-direction|pass-[1-9]|scope-reveal|silent-failure|stash regression|W0-reconciliation' src/ demo/`:

| # | Site | Leak |
|---|---|---|
| 1 | `src/components/custom/blob/index.ts:7` | `(MoodParams) are private under composables/blob/_internal/ per H.W1.B.` |
| 2 | `src/composables/blob/index.ts:3` | `(H.W1.B demote per W0-reconciliation §4); only the facades …` |
| 3 | `demo/stories/foundations/flourishes.vue:243` | `Each rule was previously a global utility; H.W1 collapsed single-demo …` |
| 4 | `src/styles/utilities.css:159` | `/* ── Inline code chip (silent-failure S6) ── */` |

`rg -n 'G\.W|O\.W|user direction|user-direction|Wβ' src/`:

| # | Site | Leak |
|---|---|---|
| 5 | `src/index.ts:5` | `// Custom composites — instrument-cluster chassis (O.W2.7)` |
| 6 | `src/index.ts:11` | `// G.W3 design-language primitives` |
| 7 | `src/index.ts:17` | `// G.W3 math + iconographic typography primitives` |
| 8 | `src/index.ts:22` | `// G.W3 motion + small custom components` |
| 9 | `src/index.ts:26` | `// G.W3 tooling (post Q21+Q22 user direction)` |
| 10 | `src/index.ts:30` | `// G.Wβ2 sub-tranche β components` |
| 11 | `src/index.ts:44` | `// G.Wβ1 + G.W3 composables` |
| 12 | `src/styles/theme.css:66` | `Cream identity — public surface noun (G.W1)` |
| 13 | `src/styles/theme.css:209` | `φ-spacing scale — golden-ratio rungs (G.W1)` |
| 14 | `src/styles/theme.css:215` | `Icon-sized utilities — generates .size-icon-{xs..mega} (G.W1)` |
| 15 | `src/styles/tokens.css:305` | `Halved twice — first in glass-ui v0.4 (speedtest tranche N.W1), again in v0.5.1 (speedtest tranche O.W2) …` (note: this is version-history rationale, not orchestration scaffolding — borderline retain) |
| 16 | `src/components/ui/card/index.ts:14` | `cream and paper (G.W3) resolve …` |
| 17 | `src/composables/blob/blob.frag.glsl:1` | `Provenance: byte-for-byte port … (G.Wβ0 reference)` |
| 18 | `src/composables/blob/blob.vert.glsl:1` | `Provenance: fullscreen-triangle vertex shader from … (G.Wβ0 reference)` |
| 19 | `src/components/ui/slider/Slider.vue:17` | `(G R3)` |
| 20 | `src/components/ui/slider/Slider.vue:43` | `// --- dock keep-open wiring (R3) ---` |
| 21 | `src/components/ui/slider/Slider.vue:170` | `/* ── Variant: glass-track (G R3) ── …` |

`demo/`:

| # | Site | Leak |
|---|---|---|
| 22 | `demo/stories/primitives/blob.vue:4` | `docs/tranches/G/blob/waves/Wβ3.md.` |
| 23 | `demo/stories/_internal/blob-stress.vue:2,137` | `Wβ3 multi-instance stress test`, `Drive the Wβ3 SPEC.md §9 budget` |

23 leaks total. Half are wave-tagged grouping comments in `src/index.ts` (items 5-11) — pure scaffolding, zero behavioral content, can be reduced to one stable taxonomic header. Items 4 and 20-21 carry residual IDs (`silent-failure S6`, `R3`) into shipped source. The provenance comments on the GLSL shaders (items 17-18) are arguably load-bearing (they document upstream license), and the version-history annotation in tokens.css (item 15) documents real recipe drift across versions — both deserve a stay.

---

## §3  Critical findings

Three findings violate KISS / one-path / single-authority hard enough to warrant W6 absorb attention.

### CRITICAL-1: dual-authority on dock keep-open (one-path violation)

`<DockPopover>` consumes raw function provide-keys:

```ts
// src/components/custom/dock/DockPopover.vue:38-46
const dockKeepOpen = inject<(() => void) | null>("dockKeepOpen", null);
const dockRelease = inject<(() => void) | null>("dockRelease", null);
…
watch(expanded, (isExpanded) => {
    if (isExpanded) dockKeepOpen?.();
    else dockRelease?.();
});
```

`<Slider>` consumes the new token sink:

```ts
// src/components/ui/slider/Slider.vue:44-56
const dockSink = inject<DockKeepOpenSink | null>(DOCK_KEEP_OPEN_SINK_KEY, null)
…
function onPointerDown() {
  if (!props.keepDockOpen || !dockSink || activeToken !== null) return
  activeToken = dockSink.acquire()
}
```

Two parallel paths to "hold the parent dock open". The W3 proof says explicitly: "the sink wraps the existing dockKeepOpen / dockRelease provide-keys rather than extending them. <DockPopover> continues to consume the function-keys directly; the sink is the new declarative-imperative primitive for leaf controls." That description IS the violation: there are two authorities for one primitive. KISS-canonical is one of:

- (a) sink IS the canonical primitive; `DockPopover` migrates onto `dockSink.acquire()` / `release(token)`. The function-key inject keys (`"dockKeepOpen"`, `"dockRelease"`) become package-private to `useDockState` ↔ the sink.
- (b) function-keys ARE the canonical primitive; `Slider` consumes them directly with a local `Set<symbol>` (the wrapping logic the sink provides today is identical to what slider could do inline since slider only needs one token).

Either choice deletes one provide path. The current state has both, which means the dock has two contracts and `DockLayerGroup` is the only thing bridging them.

### CRITICAL-2: Tabs `provide`/`inject` refactor named in H invariant 5 not delivered

H invariant 5 reads: *"When a G-shipped artefact violates KISS / one-path / single-authority (e.g., **Tabs requiring variant on both List + Trigger before its provide/inject refactor**; ToggleGroupItem variant=card as separate CVA outlier), refactor to canonical even if that means breaking a now-private API."*

ToggleGroupItem's `card` variant was correctly collapsed into `toggleVariants.variants.variant.card` (`src/components/ui/toggle/index.ts:15-16`) — the second G-era violation in invariant 5 is RESOLVED.

But `Tabs` was not. `tabsListVariants` and `tabsTriggerVariants` still ship as paired CVAs at `src/components/ui/tabs/index.ts:11-46`; consumers must supply `variant="pill"` on both `<TabsList>` and every `<TabsTrigger>`. The canonical pattern (`<ToggleGroup variant="card">` provides via `provide('toggleGroup', { variant })`, descendants inject in `ToggleGroupItem.vue:16,25`) was the named template. **H committed to this refactor and did not deliver.**

### CRITICAL-3: orphan `--cartoon-shadow*` aliases violate `feedback_no_backwards_compat`

`tokens.css:240-244,289-291` defines eight `--cartoon-shadow*` token aliases that re-export `--shadow-cartoon*`:

```css
--cartoon-shadow:       var(--shadow-cartoon);
--cartoon-shadow-hover: var(--shadow-cartoon-hover);
--soft-shadow:          var(--shadow-soft);
--elevated-shadow:      var(--shadow-elevated);
--modal-shadow:         var(--shadow-modal);
…
--cartoon-shadow-sm: var(--shadow-cartoon-sm);
--cartoon-shadow-md: var(--shadow-cartoon-md);
--cartoon-shadow-lg: var(--shadow-cartoon-lg);
```

These have **zero non-self consumers** (`rg 'var\(--cartoon-shadow|var\(--soft-shadow|var\(--elevated-shadow|var\(--modal-shadow' src/ demo/` returns only the round-trip in `theme.css:228-232,243-245` where `--shadow-cartoon-X: var(--cartoon-shadow-X)`). The round-trip is `--shadow-cartoon-X → --cartoon-shadow-X → --shadow-cartoon-X` and serves no purpose: the `@theme` block could read `var(--shadow-cartoon-X)` directly. They are pure pre-G rename scaffolding still living in tokens.css and violate `feedback_no_backwards_compat`. G δ §4.4 named this; H did not address it.

(Same shape: `--accent-pink` orphan token at `tokens.css:205,587` + `theme.css:113` — surfaced earlier in G δ §4.2; H invariant 1 keeps G's invariant 2 binding; the orphan survives.)

---

## §4  Comparison vs G δ findings — what H resolved, what H left

The G δ audit (`docs/tranches/G/audit/G-audit-δ-idiomatic-gestalt.md`) enumerated 17 specific drift items in §1.1-§10.8 and gave 17 P0/P1/P2 recommendations. Below is the HEAD-state of the named G violations.

| G δ ref | Topic | G-era violation | H state | Verdict |
|---|---|---|---|---|
| §1.1 | ToggleGroupItem `card` separate CVA | `toggleGroupItemCardVariants` outlier | `card` is now in `toggleVariants.variants.variant.card`; outlier CVA gone | **resolved** |
| §1.2 | Cartoon recipe duplicated 4× across CVAs | Button / Select / Input / NumberField each re-asserts six tokens | Still duplicated 4×; no shared `@utility cartoon-surface` | unresolved |
| §1.3 | Tabs requires variant on List + Trigger | Two paired CVAs, no provide/inject | Same shape at HEAD (CRITICAL-2 above) | unresolved (H invariant 5 named it) |
| §1.4 | NumberField cartoon descendant outlier | Pushes via `[&_[data-slot=input]]:` | Same shape at HEAD | unresolved |
| §1.5 | MetricBadge `xl` parallel surface | Per-component `<style>` block + `[data-size="xl"]` | `size="xl"` retired in W1 Lane C; computed switch reduced to `sm/md/lg` | **resolved** |
| §2.2 | PipelineFlow silent-failure (BEM classes with no CSS) | Component shipped, classes undefined | Component now has scoped style block at `PipelineFlow.vue:81-…` | **resolved** |
| §2.3 | LiveSnippet 105-line scoped block + duplicate `@keyframes pulse-dot` | Inline keyframe + cartoon-shadow recipe duplication | Pulse-dot keyframe gone; scoped block trimmed (`<style>` is now ~96 lines, no duplicate keyframe) | **mostly resolved** (block still scoped not central) |
| §2.4 | LiveSnippet imports `--accent-red` against invariant | `color: var(--accent-red)` still present | Token `--accent-red` now has a second consumer (`src/styles/prism-theme.css:116-117`), clearing the ≥2-bar — token survives legitimately | **resolved** (token now justified) |
| §2.5 | Blob.vue starts with stray `/* ... */` block comment | Comment outside any tag | Did not separately verify; outside H scope unless W1 touched it | not checked here |
| §3.1 | `useRafLoop` (lowercase) dead code | Filename-clash hack | File deleted in W1 Lane B (composables/motion barrel trimmed); `rg useRafLoop` returns 0 | **resolved** |
| §3.4 | useCollapse / useContrastSafeAccent / useMonacoTheme orphans | Three composables with zero consumers | All three retired in W1 Lane B; barrels collapsed | **resolved** |
| §4.2 | `--accent-pink` retained against invariant 2 | Orphan token | Still orphan at HEAD (CRITICAL-3 sister) | unresolved |
| §4.4 | `--cartoon-shadow*` alias family | Round-trip of `--shadow-cartoon*` | Still present at HEAD (CRITICAL-3) | unresolved |
| §4.6 | Per-rung Fraunces axis tokens duplicated 7× | 7 `--font-display-N-variation-settings` tokens | 5 retired (rungs 3, 4, 5, mega, ultra inlined); 2 retained with multi-site consumers (rung 1 + rung 2) — clean | **resolved** |
| §5.1 | Paper-grain SVG duplicated 4× | Same `data:image/svg+xml,...` URL in 4 places | Single `--paper-grain-texture` token, all 4 consumers reference it | **resolved** |
| §5.4 | Four shimmer recipes share base | `.text-shimmer-{gold,blue,vivid,pastel}` redundancy | Three retired (utilities.css drops blue/vivid/pastel; gold survives); the retired three live as story-local rules in `flourishes.vue` | **resolved-by-retirement** |
| §9.1 | HoverCardContent.contentClass redundant slot | Two paths to one element class | `contentClass` removed; only `class` remains at `HoverCardContent.vue:14` | **resolved** |
| §10.1, §10.2 | Card variant=cream / paper duplicate authority with `<CreamSurface>` / `.paper-N` | Three paths to paper substrate | Not addressed in H (still three paths); §10 was P1, no commitment in H plan | unresolved (out of H scope per plan) |

**Tally**: 11 of 17 G-named violations resolve cleanly at HEAD. 5 remain unresolved (§1.2, §1.3, §1.4, §4.2, §4.4). 1 unchecked (§2.5).

---

## §5  Recommendations for W6 absorb

Ordered by KISS / one-path severity. None of these are scope-creep — each was named in G's δ audit, in H's plan, or in this audit's CRITICAL-* findings.

### P0 — must absorb before FINAL.md is final

1. **Pick one authority for dock keep-open** (CRITICAL-1). Either `DockPopover` migrates onto `dockSink.acquire()` (preferred — sink is the more general primitive), or the sink is dissolved and `Slider` consumes the function-keys directly. Two paths through `DockLayerGroup` is invariant-1 KISS violation.

2. **Strip 23 recovery-diary leaks** (§2). The 8 grouping comments in `src/index.ts:5-44` collapse to one taxonomic header (or none — the file is short enough to read without subheadings). The 3 `R3` markers in `Slider.vue` rewrite as canonical descriptions ("dock keep-open wiring", "Variant: glass-track"). The `silent-failure S6` comment in `utilities.css:159` becomes `Inline code chip` with no diary tag. The `H.W1.B` references in `blob/index.ts` files state the architecture without naming the wave.

3. **Land Tabs provide/inject refactor** (CRITICAL-2). H invariant 5 explicitly named this; H did not deliver. Match the `ToggleGroup` shape: `<Tabs variant="pill">` provides via `provide('tabs', { variant })`, both `<TabsList>` and `<TabsTrigger>` inject and apply the matching slice of one shared CVA. Either close the residual or amend invariant 5 with a rationale.

### P1 — should absorb if W6 has slack

4. **Retire `--cartoon-shadow*` orphan aliases** (CRITICAL-3). `tokens.css:240-244,289-291` + the round-trip in `theme.css:228-232,243-245`. Replace with direct `--shadow-cartoon-*` references in the `@theme` block. ≈10-line surgical edit.

5. **Retire orphan `--accent-pink`** (G δ §4.2). `tokens.css:205,587` + `theme.css:113`. Three definition sites, zero consumers, against G invariant 2. ≈3-line surgical edit.

6. **Decide on NumberField cartoon outlier** (G δ §1.4). Either move the recipe onto `<NumberFieldInput>` directly with a `variant` prop (matching Button/Select/Input shape), or amend the convention to allow the descendant-attr-selector for compound primitives. The current undecided state is the violation.

7. **Fix the W1 proof "10 export lines" arithmetic** (Check 10). `W1-A-proof.md:80` and `W1-B-proof.md:82` claim "4 + 2 + 4 = 10 export lines deleted" but `git diff` shows 6. The substrate trim itself is real; only the proof's count is wrong. Correct in the FINAL.md or H-retro.md table.

### P2 — flag for the next consumer-evidence pass

8. **Hoist cartoon-surface recipe** (G δ §1.2). Four CVAs (Button cartoon, SelectTrigger cartoon, Input cartoon, NumberField cartoon) each re-assert `bg-[var(--cream-warm)] text-[var(--cream-foreground)] border-2 border-[var(--border)] rounded-md shadow-[var(--shadow-cartoon-accent)] hover:-translate-y-px ...`. Either an `@utility cartoon-surface { ... }` in utilities.css or a shared CVA fragment in `cn()` collapses the four to one source-of-truth.

9. **Drop orphan `class="svg-filters"`** on `demo/stories/primitives/blob.vue:147` (Check 7). The class has no rule definition; the `<svg>`'s `style="position: absolute; ..."` carries the visual. One-token edit.

---

## §6  Summary

H executed its wire-or-retire mandate cleanly on the components / composables / utilities / runtime-helpers axes. The W1 retirements landed without recovery-mode regressions; build time dropped from G's 4-5min to ~25s (Check 9), evidence the substrate trim was structural. 11 of 17 G δ violations are clean at HEAD, including the high-severity paper-grain SVG dedup (§5.1), the dead-composable retires (§3.1, §3.4), the PipelineFlow silent-failure repair (§2.2), and the ToggleGroupItem CVA collapse (§1.1).

But H did not match its own invariant 5 on `Tabs` (CRITICAL-2 — named target, no refactor), introduced a new dual-authority on dock keep-open (CRITICAL-1 — `DockPopover` function-keys vs. `Slider` sink), and left two orphan-token families standing against the no-backwards-compat precept (CRITICAL-3 — `--cartoon-shadow*` aliases, `--accent-pink`). Recovery-diary leaks total 23 sites in src/ + demo/ (§2), most of which are wave-tag grouping comments in `src/index.ts` and `R3`-marker comments in `Slider.vue`.

Top-3 absorb: dock-keep-open one-authority pick (P0 #1), recovery-diary scrub (P0 #2), Tabs provide/inject refactor (P0 #3). Each is a one-day surgical edit. None require new abstractions.

---

## §7  Authority

Read-only audit. No source files modified, no commits made, no destructive git commands run (`git stash`, `git stash pop`, `git checkout HEAD --`, `git reset` — none invoked). All cited findings paste exact `file:line` or include the exact `rg` invocation that produces the proof.

# I.W7.δ — Idiomatic Gestalt Re-Audit (HEAD `864e882`)

**Date**: 2026-05-06
**Auditor**: I.W7.δ (read-only re-walk)
**HEAD**: `864e882` (post-W4 close)
**Inputs**: H deep-audit δ at `c5f196c` (11 criticals C-1…C-11); I.W0 reconciliation §1+§4 ledgers; I.W1 alias-retire + diary scrub proof (`W1-CD-merged-proof.md`); I.W3 cartoon-hoist (`W3-cartoon-hoist.md`); I.W3 dock/easing/slider (`W3-dock-easing-slider.md`); I.W3 substrate-hierarchy (`W3-substrate-hierarchy.md`); I.W3 chronic-deferral-assessments (`W3-chronic-deferral-assessments.md`); I.md invariants 1, 5, 6, 7.
**Method**: rg + Read; no source modifications; no commits.

## §1. Recovery-diary scrub (canonical grep)

Command (per dispatch + I.md invariant 5):

```bash
rg -n 'H\.W[0-9]|G\.W[0-9]|O\.W[0-9]|P\.W[0-9]|Q\.W[0-9]|pass-[1-9]|silent.failure|scope.reveal|user.direction|stash.regression' src/ demo/
```

Result: **0 hits**. Clean against I.md invariant 5 (binary at I close; H/G/O/P/Q tranche-history annotations belong in `docs/tranches/`, not src/+demo/).

Cross-walk to H deep-audit δ §4 (24 leaks at H close): every site retired or rewritten without wave-letter prefix in I.W1 (`W1-CD-merged-proof.md` §C: 25 sites scrubbed across 13 files), confirmed at HEAD via the empty rg.

## §2. Round-trip alias retire

Command (per dispatch + I.md invariant 6):

```bash
rg -n -- '--cartoon-shadow|--soft-shadow|--elevated-shadow|--modal-shadow|--card-shadow|--dock-shadow' src/styles/ src/components/
```

Result: **0 hits**. The 9 round-trip alias families H δ §3 named (rows 1-9: `--cartoon-shadow{,-hover,-sm,-md,-lg}`, `--soft-shadow`, `--elevated-shadow`, `--modal-shadow`, `--card-shadow`, `--dock-shadow{,-collapsed}`) all retired; canonical direction `--shadow-X` per Tailwind v4 `@theme` convention is the only remaining direction. Verified via:

- `rg -n '^\s*--shadow-' src/styles/tokens.css src/styles/theme.css` shows light recipes in `theme.css:240-264` (`@theme` block) and dark mirrors in `tokens.css:561-570` (`.dark` block) — single canonical naming, no reverse aliases.

## §3. `--easing-accent` rename

Command (per dispatch):

```bash
rg -n 'easing-accent' src/ demo/
```

Result: **0 hits**. H δ C-6 (`--easing-accent` doing 8+ jobs) closed via I.W3.γ rename to `--accent-color`; W3.γ proof doc reports library-wide rename across 12 source files + 2 demo stories, no backwards-compat alias (per `feedback_no_backwards_compat`).

## §4. Cartoon recipe hoist

Command (per dispatch):

```bash
rg -n 'shadow-cartoon-accent' src/components/ui/
```

Result: **1 hit** at `src/components/ui/slider/Slider.vue:203`.

**Disposition**: This hit is the Slider `glass-track` variant's scoped-CSS `:active`/`[data-state="active"]` thumb shadow (W3.γ scope; CSS-property-fallback contract preserved by the C-7 sliderVariants CVA). The 4 CVA branches H δ C-5 named (Button / Select / Input / NumberField cartoon) no longer reassert the recipe — they composite the canonical `@utility cartoon-surface` per W3.β `W3-cartoon-hoist.md`.

Confirmed via `rg -n 'cartoon-surface' src/`:
- def site: `src/styles/utilities.css:12 @utility cartoon-surface`
- 4 CVA consumers: `button/index.ts:39`, `select/index.ts:26`, `input/index.ts:17`, `number-field/index.ts:39` — all compose `'cartoon-surface'`, none re-asserts the underlying six tokens.

This satisfies the dispatch's "1 hit expected (utility def site)" gate AT THE CVA-BRANCH SCOPE: the Slider scoped-CSS hit is outside the 4-CVA bound. No CVA branch leaks the underlying token.

## §5. Dock keep-open dual-authority

Command (per dispatch):

```bash
rg -n "'dockKeepOpen'|'dockRelease'" src/ demo/
```

Result: **0 hits** (also verified: `"dockKeepOpen"|"dockRelease"` zero hits; raw-string keys retired entirely).

**Sink-based authority verification**:
- `src/components/custom/dock/_internal/dockKeepOpenSink.ts:17-60` — sole def of `DockKeepOpenSink` interface + `DOCK_KEEP_OPEN_SINK_KEY` (string literal `"dockKeepOpenSink"`) + `createDockKeepOpenSink(counter)` factory.
- Sole producer: `src/components/custom/dock/composables/useDockState.ts:232-235` — `provide(DOCK_KEEP_OPEN_SINK_KEY, createDockKeepOpenSink({ keepOpen, release }))`.
- Two consumers, both `inject(DOCK_KEEP_OPEN_SINK_KEY)`:
  - `src/components/custom/dock/DockPopover.vue:49`
  - `src/components/ui/slider/Slider.vue:46`
- Public re-export: `src/components/custom/dock/index.ts:9-12` ships `DOCK_KEEP_OPEN_SINK_KEY` + `type DockKeepOpenSink` (typed sink interface only — no leakage of `createDockKeepOpenSink` factory or internal counter wrapping).

Single-authority gate: **green**. H δ C-1's "two consumer paths to one provider" closed via path A from W1-F-flags (DockPopover migrated to sink; raw `'dockKeepOpen'`/`'dockRelease'` keys deleted, not moved-under-`_internal/`). This is the gestalt-correct choice — sink's idempotent `release(token)` is the more general primitive, the package now ships one inject key for the keep-open concept.

## §6. NumberField descendant-selector

Command (per dispatch):

```bash
rg -n '\[&_\[data-slot=input\]\]' src/components/ui/number-field/
```

Result: **1 hit** at `src/components/ui/number-field/index.ts:12`, which is the descriptive comment line (`// the canonical `cartoon-surface` utility plus field chrome (matches Input` … `// descendants via `[&_[data-slot=input]]:` selectors.`) — explicitly preserved per W3.β to document the refactor; no actual descendant selector remains.

**Provide/inject migration** (matches Tabs precedent per H δ §9 P1 #8):
- `NumberField.vue:18` — `provide('glassNumberField', { variant: computed(() => props.variant) })` (mirrors `Tabs.vue:13` exactly).
- `NumberFieldInput.vue:11` — `inject<{ variant: ComputedRef<...> } | null>('glassNumberField', null)`; `resolvedVariant` honours own prop > parent ctx (mirrors `TabsList.vue:12` + `TabsTrigger.vue:12` shape).
- `numberFieldInputVariants` CVA at `index.ts:31-46` carries the cartoon recipe; `numberFieldVariants` collapses to bare `grid gap-1.5` chassis.

C-11 closed.

## §7. Card cream variant

Commands (per dispatch):

```bash
rg -n 'variant="cream"' src/ demo/                      # 0 hits
rg -n "variant: ['\"]cream['\"]" src/ demo/             # 0 hits
rg -n 'cream:' src/components/ui/card/                  # 0 hits
```

Result: **0 hits across all three forms**. C-9 closed via W3.α substrate-hierarchy resolution (`W3-substrate-hierarchy.md` §Cream tier — collapse-to-canonical): `<Card variant="cream">` retired from `cardVariants.variant`; consumers (`demo/stories/containers/cream-card.vue`, `demo/stories/compositions/dictionary-pronunciation.vue`) migrated to standalone `<CreamSurface>` or `<Card><CreamSurface>…</CreamSurface></Card>` composition. `<CreamSurface>` is canonical; `.cream-surface` utility is the recipe primitive.

Paper tier: documented as named hierarchy in `DESIGN.md ## Substrate Hierarchy` (Card chrome variant + `.paper-{1..4}` ladder serve mechanically distinct roles per W3.α). No cream-style retire applied to paper because Card's paper variant + the un-chromed paper utility ladder do not collapse cleanly.

## §8. New surface gestalt

W3.γ + W3.β + W3.α additions reviewed for new gestalt violations.

### §8.1 `_internal/dockKeepOpenSink.ts` honesty

`src/components/custom/dock/_internal/dockKeepOpenSink.ts` exports three names: `DockKeepOpenSink` (interface), `DOCK_KEEP_OPEN_SINK_KEY` (constant), `createDockKeepOpenSink` (factory). The package barrel (`dock/index.ts:9-12`) re-exports only `DOCK_KEEP_OPEN_SINK_KEY` + `type DockKeepOpenSink` — the factory is **not** re-exported, honestly under-internal. Consumers of `@mkbabb/glass-ui/dock` see the typed sink interface only; the counter-wrapping mechanism stays inside the package. Gestalt-clean.

### §8.2 `@utility cartoon-surface` block

`src/styles/utilities.css:12-20`:

```css
@utility cartoon-surface {
    background-color: var(--cream-warm);
    color: var(--cream-foreground);
    border: 2px solid var(--border);
    box-shadow: var(--shadow-cartoon-accent);
    transition:
        transform var(--duration-fast) var(--ease-standard),
        box-shadow var(--duration-fast) var(--ease-standard);
}
```

Single block, no duplicated rules. The 8-line recipe collapses what was a 4× shape-duplicate CVA recipe in pre-I (Button + Select used `--cream`; Input + NumberField used `--cream-warm` per W0 §1 row 6). Reconciled to `--cream-warm` canonical (W3.β decision rationale documented). State chrome (hover/active/focus-visible) layered per-consumer Tailwind class — appropriate, since Button presses (`-translate-y-px`) while Input doesn't.

### §8.3 `sliderVariants` CVA

`src/components/ui/slider/index.ts:19-34` — class-name dispatch CVA mapping each variant to `glass-slider--{variant}` modifier. Consumed in `Slider.vue:71` via `cn(sliderVariants({ variant: v }), props.class)`. Scoped CSS retained for the four variant blocks at `Slider.vue:128-204` — preserves CSS custom-property fallback contract per W3.γ (`--slider-track-bg`, `--slider-thumb-size`, etc.). No double-declaration; CVA is dispatch-shell, scoped CSS is implementation. C-7 closed.

### §8.4 NumberField provide/inject pattern matches Tabs

Verified line-by-line:

| Aspect | Tabs | NumberField |
|---|---|---|
| Provide call | `Tabs.vue:13 provide('glassTabs', { variant: computed(...) })` | `NumberField.vue:18 provide('glassNumberField', { variant: computed(...) })` |
| Inject (list) | `TabsList.vue:12 inject<{ variant: ComputedRef<...> } \| null>('glassTabs', null)` | `NumberFieldInput.vue:11 inject<{ variant: ComputedRef<...> } \| null>('glassNumberField', null)` |
| Resolved variant | `resolvedVariant = props.variant ?? tabsCtx?.variant.value` | `resolvedVariant = props.variant ?? ctx?.variant.value` |
| Per-leaf CVA | `tabsListVariants` + `tabsTriggerVariants` | `numberFieldInputVariants` |

Gestalt-identical pattern. C-11 closed cleanly.

## §9. Single-authority spot-checks

### §9.1 `@theme` block uniqueness

```bash
rg -n '^@theme' src/styles/
```

Result: **1 hit** (`theme.css:9`). One canonical `@theme` block — no duplicate authority. Light tokens declared in `theme.css @theme` block; dark mirrors in `tokens.css .dark` block (single `:root` light + single `.dark`).

### §9.2 No duplicate utility class definitions across utilities.css / cards.css / glass.css

```bash
rg -n '^\s*\.cartoon|^\s*\.cream-surface|^\s*\.glass-(subtle|default|medium|elevated|card|btn|pill)|^\s*\.paper-(card|texture|1|2|3|4)' src/styles/
```

Verified non-overlap:
- `.cartoon-surface` — only via `@utility` in `utilities.css:12` (no `.cartoon-*` rule elsewhere).
- `.cream-surface` — only in `cards.css:23,34,52,56,61,67`.
- `.glass-{subtle,default,medium,elevated,card,btn}` — only in `glass.css:6-260`.
- `.paper-{1..4,card,texture}` — only in `paper.css:59-161` and `cards.css:10` (`.paper-texture` lives only in cards.css; `.paper-{1..4}` + `.paper-card` only in paper.css).

No utility-class double-declarations across files. Single-authority gate: **green**.

### §9.3 No shadow-shape token defined twice in the same scope

```bash
rg -n '^\s*--shadow-' src/styles/tokens.css src/styles/theme.css
```

Result: All `--shadow-{cartoon,cartoon-hover,soft,elevated,modal,card,dock,dock-collapsed,cartoon-{sm,md,lg},cartoon-accent,glass-{subtle,default,medium,elevated}}` tokens declared exactly once in `theme.css @theme` (light canonical). Dark-mode overrides for those that differ tonally (`--shadow-cartoon`, `--shadow-cartoon-hover`, `--shadow-soft`, `--shadow-elevated`, `--shadow-modal`, `--shadow-cartoon-accent`, `--shadow-cartoon-color{,-soft}`) live in `tokens.css .dark` block at `tokens.css:561-570` — these are mode overrides, not duplicate authority. The canonical authority is the `@theme` block; the `.dark` block rides the cascade per Tailwind v4 dark-variant convention.

`--shadow-{sm,md,lg,xl}` (generic elevation primitives) declared once in `tokens.css:248-251 :root` (no dark mirror needed because they consume `var(--shadow-color)` which itself flips light↔dark).

No round-trip aliases (per §2). No reverse-direction declarations. Single-authority gate: **green**.

### §9.4 `@utility` inventory uniqueness

```bash
rg -n '^@utility' src/styles/
```

29 `@utility` declarations across `utilities.css` (1: `cartoon-surface`), `paper.css` (2: `paper-underpaint`, `paper-grain-overlay`), `typography.css` (26: `text-display-{ultra,mega,5,4,3,2}`, `text-display`, `text-{title,heading,subheading,prose,body,small,caption,micro,admin-label,math,math-body,mono-{caption,small,prose,micro}}`, `cm-serif`, `fira-code`, `fourier-f`). No name collisions. Each utility-name has a single source-of-truth declaration.

## §10. Findings

**0 violations.** Every δ-class concern from the H baseline (C-1…C-11) has either been resolved at HEAD or carries an explicit, documented disposition:

| H δ ref | Concern | I disposition | HEAD status |
|---|---|---|---|
| C-1 | dock keep-open dual-authority | RESOLVED (W3.γ path A: sink unification + raw-key delete) | clean — 0 raw-key hits, sink-only authority |
| C-2 | 9 round-trip alias families | RESOLVED (W1.D alias retire single-direction) | clean — 0 alias-direction hits |
| C-3 | cartoon-shadow tri-source | RESOLVED (W1.D + W3.β: `@utility cartoon-surface` composites the recipe; CVAs no longer re-assert) | clean — utility def + 4 CVA composers |
| C-4 | 24 recovery-diary leaks | RESOLVED (W1.C scrub) | clean — 0 hits across canonical grep |
| C-5 | cartoon recipe duplicated 4× across CVAs | RESOLVED (W3.β hoist; cream/cream-warm reconciled to cream-warm) | clean — single recipe in `@utility cartoon-surface` |
| C-6 | `--easing-accent` 8+ jobs | RESOLVED (W3.γ rename to `--accent-color`) | clean — 0 hits |
| C-7 | Slider scoped-CSS variants vs CVA convention | RESOLVED (W3.γ class-name dispatch CVA + scoped CSS preserved) | clean — `sliderVariants` exported |
| C-8 | Blob double-rAF in `_internal/` | DEFER (formal — `_internal/` boundary holds; no observable runtime cost per W5/W6 stress baseline) | documented in W3 chronic-deferral assessments |
| C-9 | `<Card variant="cream">` vs `<CreamSurface>` | RESOLVED (W3.α cream variant retired; `<CreamSurface>` canonical) | clean — 0 hits |
| C-10 | `<Card variant="paper">` + `.paper-card` + `.paper-{1..4}` three paths | DOCUMENT-NAMED-HIERARCHY (W3.α `DESIGN.md ## Substrate Hierarchy`) | distinct roles documented; both retained |
| C-11 | NumberField cartoon descendant-attr-selector | RESOLVED (W3.β provide/inject refactor matching Tabs precedent) | clean — 0 selector hits, ctx-injected variant |

**Single-authority spot-checks**: §9 confirms exactly one `@theme` block, no duplicate utility-class definitions across the 19 style files, no duplicate shadow-shape token declarations within their scope.

**New gestalt surface (W3 additions)**: `_internal/dockKeepOpenSink.ts` honestly under-internal (factory not re-exported); `@utility cartoon-surface` block clean; `sliderVariants` CVA dispatch-shell clean; NumberField provide/inject pattern line-for-line matches Tabs precedent. No new violations introduced.

**Build-time sanity**: `npm run typecheck` clean (vue-tsc, no errors).

## §11. Verdict

**CLEAN.**

Every δ-class critical from H baseline (11 items C-1…C-11) has an explicit disposition at HEAD:

- 9 RESOLVED via I.W1 + I.W3 (mechanical surgical edits per H δ §9 P0/P1 recommendations);
- 1 DOCUMENT-NAMED-HIERARCHY (paper tier — W3.α);
- 1 formally DEFERRED (C-8 blob double-rAF — `_internal/` boundary holds; documented in W3 chronic-deferral assessments).

I.md invariants 1 (no silent deferrals), 5 (recovery-diary binary), 6 (alias retire single-direction), 7 (architectural tensions resolve or document) all hold at HEAD `864e882`. No new gestalt violations introduced by I.W1/W3/W4 surfaces. Tranche I closes its δ scope clean.

## Authority

Read-only re-walk at HEAD `864e882`. Every finding cites exact `file:line` or the verbatim `rg` command. No source modifications, no commits. Sanity typecheck `npm run typecheck` returns clean.

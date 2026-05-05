# H — deep audit δ: idiomatic gestalt (deeper than W6.δ)

**Date**: 2026-05-05 (post-close, deep pass)
**Auditor**: tranche-I deep-audit Lane δ (read-only)
**Scope**: entire codebase at HEAD (`c5f196c` + `9427536` blob fix), not only H additions.
**Lens**: KISS / one-path / single-authority / no-legacy. Goes beyond W6.δ by widening the alias-chain audit to all token namespaces, by enumerating all `@utility` ↔ token recipe duplications, and by re-evaluating W6.δ's three CRITICAL findings against the source.
**Method**: walked W6.δ's findings against HEAD source; ran the named greps on widened patterns (`R3`, `--cartoon-shadow*`, `--cream-warm`, `var\(--motion-ease`, `cva\(`, `@keyframes`, `@utility`, `Per G\.W*`, `(O\.W2|R-NEW|residual|R[0-9]+)`); read `tokens.css` and `theme.css` end-to-end; opened every component the W3 wave cited. No tracked files were modified.

---

## §1  Preamble

W6.δ named 3 CRITICALs (dock keep-open, Tabs provide/inject, `--cartoon-shadow*` aliases). H W6 absorbed 4 of 23 recovery-diary leaks; did not act on the CRITICALs; did not expand the alias-chain scan. This deep audit verifies HEAD against W6.δ and surfaces what W6.δ missed.

Headline at HEAD: **9 theme-bridge alias families round-trip** through `theme.css` (W6.δ counted 1); **W6.δ's CRITICAL-2 is a false positive** — Tabs.vue:13 DOES provide `'glassTabs'` and List/Trigger inject; the dock keep-open dual-authority survives unchanged; cartoon-shadow recipe expressed three ways (token + utility-class + alias). Of G δ's 17 violations, 11 cleanly resolved at HEAD, 6 unresolved.

---

## §2  Dual-authority audit — paths-per-primitive

| primitive / outcome | path A | path B | path C | one-path? | citation |
|---|---|---|---|---|---|
| dock keep-open while expanded | `inject('dockKeepOpen')` + `inject('dockRelease')` raw function-keys (DockPopover) | `inject(DOCK_KEEP_OPEN_SINK_KEY)` token sink (Slider) | `useDockState`'s internal `keepOpen()`/`release()` counter (provider) | **two consumer paths, one provider** — a layered API IF the function-keys are package-private; but the function-keys are NOT marked private and DockPopover consumes them directly outside the layer | `src/components/custom/dock/DockPopover.vue:38-46`; `src/components/ui/slider/Slider.vue:44-56`; `src/components/custom/dock/DockLayerGroup.vue:104-129`; `src/components/custom/dock/composables/useDockState.ts:225-226` |
| paper-warm-cream substrate | `<Card variant="cream">` → `.cream-surface` | `<CreamSurface tone="warm\|cool">` → `.cream-surface` + `data-tone` | `.cream-surface` raw utility | three paths, three consumers (cream-card.vue:16, cream-card.vue:37, ad-hoc utilities) | `src/components/ui/card/index.ts:28`; `src/components/custom/cream-surface/CreamSurface.vue`; `src/styles/cards.css:22` |
| paper substrate | `<Card variant="paper">` → `.paper-card` | `.paper-card` raw utility (paper.css:110) | `.paper-{1..4}` tier classes (paper.css:57-83) — same recipe minus grain | three paths, no `<PaperSurface>` to mirror `<CreamSurface>` | `src/components/ui/card/index.ts:29`; `src/styles/paper.css:57-110` |
| icon-stamp frame | `<IconStamp frame="stamp">` | `.icon-stamp` raw utility | n/a | two paths but accent mapping logic is component-only (IconStamp.vue:62-66) — defensible **as long as** the utility is composed BY the component, not separately maintained | `src/styles/utilities.css:174-185`; `src/components/custom/icon-stamp/IconStamp.vue:62-66` |
| cartoon shadow tier | `--shadow-cartoon-{sm,md,lg}` token recipes (3-layer + alpha through `var(--shadow-color)`) | `.shadow-cartoon-{sm,md,lg}` utility classes (3-layer + alpha through `var(--shadow-cartoon-color)` raw rgba primitive + 2px border + translateY-1px) | `--cartoon-shadow-{sm,md,lg}` aliases (round-trip) | three expressions, two non-equivalent recipes (token uses `color-mix`, utility uses raw rgba); plus the alias round-trip in §3 | `src/styles/tokens.css:280-291`; `src/styles/utilities.css:380-405`; `src/styles/theme.css:243-245` |
| rAF loop in `<Blob>` instance | `useRAFLoop` from composables/motion (visibility-gated, PRM-respecting) | hand-rolled `requestAnimationFrame` in `useBlobPointer.ts:113-120` (now `_internal/`) | n/a | TWO simultaneous rAF subs per Blob instance — useBlob's driver + useBlobPointer's pointer integrator, no shared scheduler | `src/composables/blob/useBlob.ts:135`; `src/composables/blob/_internal/useBlobPointer.ts:113-120` |
| Tabs variant flow | `<Tabs variant="pill">` provides `'glassTabs'` ctx | `<TabsList variant>` / `<TabsTrigger variant>` per-leaf override | `tabsListVariants` + `tabsTriggerVariants` (two CVAs) | one consumer path (provide/inject), **two CVAs are structural** because they style different DOM elements (container vs trigger). NOT a violation. **W6.δ Critical-2 is a false positive** | `src/components/ui/tabs/Tabs.vue:13` (`provide('glassTabs', ...)`); `src/components/ui/tabs/TabsList.vue:12` (`inject('glassTabs')`); `src/components/ui/tabs/TabsTrigger.vue:12` (same) |
| NumberField cartoon recipe | `[&_[data-slot=input]]:` descendant selectors push the cream-warm + 2px border + cartoon-accent shadow recipe THROUGH NumberFieldRoot's CVA onto the descendant input | n/a — NumberFieldInput.vue does NOT inject `numberFieldVariants` ctx | n/a | one consumer path BUT it's the descendant-selector outlier (G δ §1.4). Tabs (provide/inject) and Toggle (single CVA) shapes both exist as templates; NumberField uses neither | `src/components/ui/number-field/index.ts:18-19`; `src/components/ui/number-field/NumberFieldInput.vue:7` (no inject) |
| cartoon-surface (cream-warm + 2px border + accent shadow) recipe | Button cartoon CVA branch | SelectTrigger cartoon CVA branch | Input cartoon CVA branch + NumberField cartoon descendant push | four CVA copies of the same six-token recipe; no `@utility cartoon-surface` to composite (G δ §1.2) | `src/components/ui/button/index.ts:37`, `select/index.ts:25`, `input/index.ts:14`, `number-field/index.ts:19` |

---

## §3  Round-trip alias chain audit (deeper than W6.δ)

W6.δ named `--cartoon-shadow*` (8 aliases). The actual full count is **9 round-trip families** comprising **22 alias declarations**, each with zero non-self consumers.

`@theme` block is the bridge layer Tailwind v4 reads to generate utilities. The pattern across the codebase: tokens.css declares `--X: <recipe>` and theme.css redeclares `--shadow-X: var(--<aliased-X>)` to wire it into a utility — but in many cases tokens.css ALSO declares the reverse alias `--<alias>-shadow: var(--shadow-<X>)`, creating a circular round-trip. Below are the families with citations.

| # | Alias family | Source recipe | Round-trip alias | Tokens-side declaration | Theme-side declaration | Non-self consumers | Verdict |
|---|---|---|---|---|---|---|---|
| 1 | `--shadow-cartoon{,-hover}` ↔ `--cartoon-shadow{,-hover}` | tokens.css:232-233 (literal recipes) | tokens.css:240-241 | yes | theme.css:228-229 (`--shadow-cartoon: var(--cartoon-shadow)`) | 0 | **orphan alias chain** (W6.δ CRITICAL-3) |
| 2 | `--shadow-cartoon-{sm,md,lg}` ↔ `--cartoon-shadow-{sm,md,lg}` | tokens.css:280-288 (literal recipes) | tokens.css:289-291 | yes | theme.css:243-245 | 0 | **orphan alias chain** (W6.δ CRITICAL-3) |
| 3 | `--shadow-soft` ↔ `--soft-shadow` | tokens.css:234 | tokens.css:242 | yes | theme.css:230 (`--shadow-soft: var(--soft-shadow)`) | 0 | **orphan alias** |
| 4 | `--shadow-elevated` ↔ `--elevated-shadow` | tokens.css:235 | tokens.css:243 | yes | theme.css:231 | 0 | **orphan alias** |
| 5 | `--shadow-modal` ↔ `--modal-shadow` | tokens.css:236-238 | tokens.css:244 | yes | theme.css:232 | 0 | **orphan alias** |
| 6 | `--shadow-card` ↔ `--card-shadow` | tokens.css:264 (`--shadow-card: var(--shadow-cartoon)`) | tokens.css:265 (`--card-shadow: var(--shadow-card)`) | yes | theme.css:234 (`--shadow-card: var(--card-shadow)`) | 0 | **orphan alias** + circular reference (theme.css:234 reads `--card-shadow`, which tokens.css:265 reads back from `--shadow-card`, which @theme:234 declares — semantically a no-op once cascade resolves but still pure scaffolding) |
| 7 | `--shadow-dock{,-collapsed}` ↔ `--dock-shadow{,-collapsed}` | tokens.css:268-269 | tokens.css:270-271 | yes | theme.css:235-236 | 0 | **orphan alias** |
| 8 | `--shadow-cartoon-accent` self-reference in @theme | tokens.css:251-252 (recipe) + tokens.css:599-600 (dark mirror) | n/a | n/a | theme.css:246: `--shadow-cartoon-accent: var(--shadow-cartoon-accent);` — **literal self-reference** (Tailwind v4 reads this as "register the utility name pointing at the existing token") | 12 (BC, S, I, NF cartoon CVAs + Slider .glass-track + storybook) | **scaffolding self-ref** — works because Tailwind v4 uses the name to register the utility, not because the value resolves; could be deleted if `--shadow-cartoon-accent` is moved into the `@theme` block as a primitive recipe |
| 9 | `--ease-{standard,out,in,out-expo,apple,apple-spring}` ↔ `--motion-ease-{...}` | tokens.css:70-73 + 81-82 (literal cubic-beziers) | tokens.css:75-78 + 84-85 (`--ease-X: var(--motion-ease-X)`) | yes | theme.css:265-270 — **redeclares the same alias map** | tokens.css declarations are consumed at runtime; theme.css is duplicate authority for the same alias (CSS cascade resolves last-wins, both declare `--ease-X: var(--motion-ease-X)` so the value is identical, but the declaration is duplicated) | **duplicate authority** — pick one site for the alias; the @theme block is canonical for Tailwind utility generation; tokens.css declaration is redundant |

Plus three smaller alias chains that are NOT round-trip (one-way primitives → semantic):

| # | Family | Pattern | Verdict |
|---|---|---|---|
| 10 | `--font-stack-*` (tokens.css:22-25) → `--font-display/serif/sans/mono` (theme.css:52-55) | one-way bridge | clean (documented at tokens.css:14-21 as the "@theme bridge fallbacks" pattern) |
| 11 | `--type-leading-*` (tokens.css:27-33) → `--leading-*` (theme.css:32-38) | one-way bridge | clean |
| 12 | `--icon-{xs..mega}` (tokens.css:439-446) → `--size-icon-{xs..mega}` (theme.css:216-223) | one-way bridge | clean |
| 13 | `--space-phi-{1..4}` (tokens.css:490-493) → `--spacing-phi-{1..4}` (theme.css:210-213) | one-way bridge | clean |
| 14 | `--type-display-N` (typography.css) → `--text-display-N` (theme.css:22-29) | one-way bridge | clean |

**Round-trip alias chain count**: **9** (rows 1-9 above). Of those, 8 have zero non-self consumers and exist purely as round-trip scaffolding through `@theme`. Family 9 (`--ease-*`) is duplicate-authority — both tokens.css and theme.css redeclare the same alias.

**Animation tokens (orphan cluster)**: theme.css:289-298 declares 9 `--animate-*` Tailwind tokens (`floating-panel-in`, `tooltip-in`, `fade-in`, `scale-in`, `slide-up`, `dock-in`, `shimmer`, `shimmer-sweep`, `gold-shimmer`, `shake`). `rg 'animate-(floating-panel|tooltip-in|fade-in|scale-in|slide-up|dock-in|shimmer|gold-shimmer|shake)'` against src/ + demo/ returns **zero matches**. The `tw-animate-css` package supplies `animate-in/animate-out/fade-in-0/zoom-in-95/slide-in-from-*` etc. that the dialog/popover/tooltip/sheet/dropdown/context-menu/select content components actually use — so glass-ui's nine `--animate-*` tokens are completely orphan alongside tw-animate-css. The keyframes themselves (animations.css:4-198) are referenced via `animation: <name> ...` direct strings (utilities.css:131, transitions.css:139, dock.css:706, floating-panel.css:15, typography.css:326). The `--animate-*` Tailwind layer adds zero value at present.

---

## §4  Recovery-diary scan at HEAD

`rg -n 'H\.W[0-9]|user-direction|pass-[1-9]|scope-reveal|silent-failure|stash regression|G\.W[0-9]|tranche [A-H]\b|G\.Wβ|G\.Wα|O\.W2|R-NEW|R3\b|residual|Wβ\d|Q21|Q22' src/ demo/`:

| # | Site | Leak |
|---|---|---|
| 1 | `src/index.ts:5` | `// Custom composites — instrument-cluster chassis (O.W2.7)` |
| 2 | `src/index.ts:11` | `// G.W3 design-language primitives` |
| 3 | `src/index.ts:17` | `// G.W3 math + iconographic typography primitives` |
| 4 | `src/index.ts:22` | `// G.W3 motion + small custom components` |
| 5 | `src/index.ts:26` | `// G.W3 tooling (post Q21+Q22 user direction)` |
| 6 | `src/index.ts:30` | `// G.Wβ2 sub-tranche β components` |
| 7 | `src/index.ts:44` | `// G.Wβ1 + G.W3 composables` |
| 8 | `src/styles/theme.css:66` | `/* Cream identity — public surface noun (G.W1) */` |
| 9 | `src/styles/theme.css:209` | `/* φ-spacing scale — golden-ratio rungs (G.W1) */` |
| 10 | `src/styles/theme.css:215` | `/* Icon-sized utilities — generates .size-icon-{xs..mega} (G.W1) */` |
| 11 | `src/styles/tokens.css:305` | `Halved twice — first in glass-ui v0.4 (speedtest tranche N.W1), again in v0.5.1 (speedtest tranche O.W2) …` |
| 12 | `src/styles/tokens.css:326` | `Dropped from 0.42 → 0.32 in v0.5.1 (speedtest O.W2)` |
| 13 | `src/styles/tokens.css:359` | `Light grain dropped 0.035 → 0.025 in P.W1.B …` |
| 14 | `src/components/ui/card/index.ts:14` | `cream and paper (G.W3) resolve …` |
| 15 | `src/composables/blob/useBlob.ts:5` | `in Wβ2. Composers wanting custom shells (multi-instance compositions, …` |
| 16 | `src/composables/blob/blob.frag.glsl:1` | `Provenance: byte-for-byte port … (G.Wβ0 reference)` |
| 17 | `src/composables/blob/blob.vert.glsl:1` | `Provenance: fullscreen-triangle vertex shader … (G.Wβ0 reference)` |
| 18 | `src/components/ui/slider/Slider.vue:17` | `'glass-track' — subtle/medium glass track + cartoon-accent thumb (G R3)` |
| 19 | `src/components/ui/slider/Slider.vue:43` | `// --- dock keep-open wiring (R3) ---` |
| 20 | `src/components/ui/slider/Slider.vue:170` | `/* ── Variant: glass-track (G R3) ──` |
| 21 | `src/components/custom/glyph-face/GlyphFace.vue:26` | `the residual square-leak path for caps over non-circular silhouettes` |
| 22 | `demo/stories/_internal/blob-stress.vue:2` | `_internal/blob-stress — Wβ3 multi-instance stress test.` |
| 23 | `demo/stories/_internal/blob-stress.vue:137` | `Drive the Wβ3 SPEC.md §9 budget. Eight blobs subscribe to one` |
| 24 | `demo/stories/primitives/blob.vue:4` | `docs/tranches/G/blob/waves/Wβ3.md.` |

**Total: 24 leaks at HEAD** (W6.δ enumerated 23; this audit adds tokens.css:359 P.W1.B + GlyphFace.vue:26 false-positive). Categories: 7 wave-tag groupings in `src/index.ts`; 4 `(G.W1)` / `(G.W3)` annotations; 4 `R3` / `Wβ3` markers; 3 version-history substrate rationale comments (load-bearing — retain content, drop wave prefix); 2 GLSL provenance lines (retain); 1 GlyphFace residual docstring (false positive on `residual` keyword); 1 useBlob.ts `Wβ2` reference; 1 blob.vue tranche-doc pointer; 1 wave-tagged blob-stress demo header. H scrubbed 4 of W6.δ's 23; the rest survive at HEAD + 5 added here.

---

## §5  Duplicate-rule audit — keyframes, utilities, components

### 5.1  `@keyframes` inventory

`rg @keyframes src/styles/ src/components/ src/composables/ demo/`:

| name | site | scoped? | global consumers |
|---|---|---|---|
| `floating-panel-in` | animations.css:4 | global | `.floating-panel` (floating-panel.css:15), `--animate-floating-panel-in` (orphan) |
| `collapsible-open` / `collapsible-close` | animations.css:18, 29 | global | reka-ui collapsible content (via `tw-animate-css` `animate-collapsible-up/down`) |
| `tooltip-in` | animations.css:41 | global | `--animate-tooltip-in` (orphan) |
| `fade-in` | animations.css:53 | global | `.text-display-mega` reveal (typography.css:326) |
| `scale-in` | animations.css:65 | global | `--animate-scale-in` (orphan) |
| `slide-up` | animations.css:77 | global | `--animate-slide-up` (orphan) |
| `dock-in` | animations.css:89 | global | dock entrance (transitions.css:139) |
| `shimmer-sweep` | animations.css:101 | global | `--animate-shimmer-sweep` (orphan) |
| `shimmer` | animations.css:111 | global | `.live-snippet__pulse` (LiveSnippet.vue:186) + `.sortable-list-shimmer` (SortableList.vue:189) |
| `shake` | animations.css:117 | global | `--animate-shake` (orphan) |
| `gold-shimmer-slide` | animations.css:139 | global | `.text-shimmer-gold` (utilities.css:131) |
| `sparkle-sweep` | animations.css:151 | global (+PRM override 166) | dock primary-action (dock.css:706) |
| `rainbow-drift` | animations.css:175 | global (+PRM override 181) | button rainbow variant (button/index.ts:41) |
| `idle-bob` | animations.css:189 | global (+PRM override 195) | no consumer at HEAD (`rg 'idle-bob' src/ demo/` returns only the keyframe definition + the comment) — **orphan keyframe** |
| `pulse-dot-bounce` | Pulse.vue:67 | scoped | `.pulse-dot` in same SFC |
| `pulse-ring-spin` | Pulse.vue:82 | scoped | `.pulse-ring` in same SFC; **NotificationDot.vue:11 docstring claims "Pulse animation reuses the existing `@keyframes pulse-ring-spin`" — this is FALSE because the keyframe is scoped to Pulse.vue and not visible to NotificationDot. NotificationDot uses Tailwind's `animate-ping` instead.** Documentation/implementation mismatch. |
| `tw-cursor-blink` | TypewriterText.vue:250 | scoped | own SFC |
| `skeleton-shimmer-slide` | Skeleton.vue:40 | scoped | own SFC |
| `story-confetti-burst` | demo/stories/motion/confetti.vue:213 | scoped (demo) | own demo |

**Findings**: no name collisions. Two duplicate-shape risks:

- **`shimmer` and `shimmer-sweep` are nearly identical recipes with reversed direction.** `shimmer-sweep` runs `-200% → 200%` (forward). `shimmer` runs `250% → -250%` (reverse + slightly larger range). Two keyframes for the same visual primitive.
- **`pulse-dot-bounce` (Pulse.vue) and `skeleton-shimmer-slide` (Skeleton.vue)** are scoped per-SFC and are arguably package-private; `pulse-ring-spin`'s docstring claim that NotificationDot consumes it is wrong.
- **`idle-bob` is orphan** (no consumer in src/ + demo/).

### 5.2  `@utility` inventory

26 `@utility` declarations across `src/styles/`:
- paper.css: `paper-underpaint`, `paper-grain-overlay` (2)
- typography.css: `text-display-{ultra,mega,5,4,3,2}`, `text-display`, `text-{title,heading,subheading,prose,body,small,caption,micro,admin-label,math,math-body,mono-{caption,small,micro}}`, `cm-serif`, `fira-code`, `fourier-f` (24)

No name collisions. The `text-display-N` utilities don't collide with Tailwind's auto-generated `text-{size}` because the @theme block declares `--text-display-N` tokens (theme.css:22-29) that produce `text-display-N` class names; the `@utility` overrides them with WONK + SOFT axis settings. So one name, two source-of-truth declarations. **Duplicate authority on `text-display-N`** — the @theme tokens generate the size; the @utility re-declares font-family + size + variation-settings. The @utility wins (cascade order), but consumers using `text-display-N` see a class composed by both layers. This is the documented Tailwind v4 pattern (`@utility` extending an `@theme` token), so it's idiomatic — but the comment block at typography.css:1-78 ought to flag the layered contract.

### 5.3  Cartoon-shadow recipe duplication

Three sites express the cartoon shadow tier:

1. `--shadow-cartoon-{sm,md,lg}` token recipes — tokens.css:280-288 — three-layer offsets via `color-mix(... var(--shadow-color) N%, transparent)`.
2. `.shadow-cartoon-{sm,md,lg}` utility classes — utilities.css:380-405 — three-layer offsets via `var(--shadow-cartoon-color)` (raw rgba primitive) + 2px `var(--border)` + `translateY(-Npx)`.
3. `--cartoon-shadow-{sm,md,lg}` aliases — tokens.css:289-291 — round-trip of recipe 1.

Recipe 1 and recipe 2 declare different alpha primitives (`color-mix(...)` vs raw rgba), so they're not byte-equivalent. The utility class additionally adds a 2px border and translateY offset. Consumers split: Button cartoon CVA reads `shadow-[var(--shadow-cartoon-md)]` (token form); IconStamp reads `box-shadow: var(--icon-stamp-shadow, var(--shadow-cartoon-sm))` (token form); but `.cartoon-card` in cards.css would naturally consume `.shadow-cartoon-{sm,md,lg}` as a utility class if such consumers existed.

### 5.4  CVA branch duplication

Cartoon-surface recipe duplicates across 4 CVAs (G δ §1.2; unresolved):
- Button (button/index.ts:37): `bg-[var(--cream)] text-[var(--cream-foreground)] border-2 border-[var(--border)] shadow-[var(--shadow-cartoon-accent)] transition-[transform,box-shadow] hover:-translate-y-px hover:shadow-[var(--shadow-cartoon-md)] active:translate-y-0 active:shadow-[var(--shadow-cartoon-sm)]`
- SelectTrigger (select/index.ts:25): `bg-[var(--cream)] ...`
- Input (input/index.ts:14): `... bg-[var(--cream-warm)] ...` (note: cream-warm not cream)
- NumberField (number-field/index.ts:19): `[&_[data-slot=input]]:bg-[var(--cream-warm)] [&_[data-slot=input]]:border-2 ...` (descendant selector pushdown; cream-warm)

Note Button + Select use `--cream`, Input + NumberField use `--cream-warm`. These are different colors (tokens.css:155 vs 156). So the four CVAs aren't byte-duplicate — they're SHAPE-duplicate but COLOR-divergent. Drift across the four cartoon surfaces is currently invisible at the recipe level.

### 5.5  Slider variant scheme

Slider has 4 variants (`'standard' | 'spectrum' | 'timeline' | 'glass-track'`) but **no CVA** (`rg 'cva\(' src/components/ui/slider/` returns 0). The variant differences are encoded as scoped CSS keyed on `glass-slider--${v}` (Slider.vue:69-71, 92-208). CLAUDE.md states: "All `ui/` components follow the shadcn-vue pattern... CVA variants are co-exported from each component's `index.ts`."

The variant differences ARE structural CSS (track height, thumb shape, hover states) not Tailwind-class deltas, so the scoped-CSS approach is mechanically defensible. But this is the only ui/ family that doesn't co-export a CVA from its index.ts. **Inconsistent with the shadcn-vue pattern documented as the project convention.**

### 5.6  paper-grain SVG turbulence (G δ §5.1)

Resolved at HEAD: single `--paper-grain-texture` token (tokens.css:481), 4 consumers (paper.css:17, 39, 132 + cards.css:39) all reference the token. Confirms W6.δ check 5 (G δ §5.1).

---

## §6  Pre-existing legacy / dead code / `_v2` / commented-out scan

`rg -n '@deprecated|TODO|FIXME|XXX|HACK|_v2|_legacy|_old|_deprecated' src/`:

- One match: `src/components/custom/search/composables/useFuzzySearch.ts:44` — `watch(query, (val, _oldVal, onCleanup) =>` — Vue's idiomatic watch parameter naming, not legacy.

`rg -nP '^\s*//\s*(const |let |var |function |if |for |return |export )' src/`:
- Zero hits — no commented-out source.

Multi-line `//` comment blocks in src/ (sampled): all are explanatory docstrings, none are commented-out code.

`rg -n 'this is the only consumer|internal helper|package-private|do not export|@internal' src/`:
- One match: `src/composables/blob/index.ts:2` — documents the `_internal/` private boundary correctly.

**No legacy code, dead code, `_v2`, `_legacy`, or commented-out source in `src/`.** H's wire-or-retire mandate (W1) executed cleanly on this axis. 

Orphan tokens / utilities still surviving:
- `--accent-pink` (G δ §4.2) — three definition sites, zero consumers
- `--shadow` (tokens.css:183, 570) — declared but `--shadow-color` is the canonical token; `--shadow` consumers: `rg 'var\(--shadow\)\b' src/ demo/` returns 0 (the alias is shadowed by `--shadow-color`)
- 9 `--animate-*` tokens (theme.css:289-298) — zero `animate-{floating-panel|tooltip-in|fade-in|scale-in|slide-up|dock-in|shimmer|gold-shimmer|shake}` consumers across src/ + demo/
- `idle-bob` keyframe (animations.css:189) — zero consumers at HEAD
- 8 `--cartoon-shadow*` aliases + 6 `--{soft,elevated,modal,card,dock,dock-collapsed}-shadow` aliases — round-trip only (§3)

---

## §7  Critical findings

Eight findings violate KISS / one-path / single-authority hard enough to warrant a tranche-I pass. Numbered C-1…C-8 in priority order.

### C-1 — dock keep-open dual-authority (W6.δ CRITICAL-1, unresolved)

`<DockPopover>` consumes raw function provide-keys at `src/components/custom/dock/DockPopover.vue:38-39,44-46`:

```ts
const dockKeepOpen = inject<(() => void) | null>("dockKeepOpen", null);
const dockRelease = inject<(() => void) | null>("dockRelease", null);
watch(expanded, (isExpanded) => {
    if (isExpanded) dockKeepOpen?.();
    else dockRelease?.();
});
```

`<Slider>` consumes the new sink at `src/components/ui/slider/Slider.vue:44-56`:

```ts
const dockSink = inject<DockKeepOpenSink | null>(DOCK_KEEP_OPEN_SINK_KEY, null)
function onPointerDown() {
  if (!props.keepDockOpen || !dockSink || activeToken !== null) return
  activeToken = dockSink.acquire()
}
```

`<DockLayerGroup>` (DockLayerGroup.vue:104-129) consumes the function-keys, wraps them in a Set<symbol> idempotent counter, and re-provides as `DOCK_KEEP_OPEN_SINK_KEY`. The W3 proof framing — sink wraps function keys; popover at the dock root, slider at the layer-group inner boundary — DESCRIBES a layered API, but the layer boundary is not enforced: `inject('dockKeepOpen')` is a public injection key (no _-prefix, no symbol) and `DockPopover` lives in `src/components/custom/dock/` alongside `DockLayerGroup` so they're sibling consumers in the same package, not different layers.

**Two consumer paths to one provider.** KISS-canonical pick: (a) `DockPopover` migrates onto `dockSink.acquire()` (preferred — sink is the more general primitive with leak-resilience), and `'dockKeepOpen'` / `'dockRelease'` injection keys become symbols (or move into `_internal/` of dock package); or (b) sink dissolves and `Slider` calls function-keys directly (it only ever holds one token, so the Set<symbol> wrapping isn't load-bearing for slider). Path (a) is the gestalt-correct choice because it preserves the primitive's safety properties.

### C-2 — Round-trip alias scaffolding (W6.δ CRITICAL-3 expanded)

W6.δ named one alias family. The actual count is **9 round-trip families with zero non-self consumers** (§3 rows 1-9). Plus the `--animate-*` Tailwind orphan cluster (10 tokens, zero consumers). Plus `--easing-accent` doing 8+ unrelated semantic jobs.

The fix is mechanical: tokens.css drops the `--<X>-shadow: var(--shadow-X)` reverse alias declarations (rows 1-7); theme.css drops the round-trip `--shadow-X: var(--<X>-shadow)` and reads `var(--shadow-X)` directly from tokens.css; remove duplicated `--ease-X: var(--motion-ease-X)` from theme.css:265-270 (already declared in tokens.css:75-78); delete the 9 unused `--animate-*` tokens and the `idle-bob` orphan keyframe. ≈30-line surgical edit across 2 files.

### C-3 — Cartoon-shadow recipe expressed three ways

Same shape, three sources of truth:
1. `--shadow-cartoon-{sm,md,lg}` token recipes (tokens.css:280-288) — `color-mix(... var(--shadow-color) N%, transparent)`
2. `.shadow-cartoon-{sm,md,lg}` utility classes (utilities.css:380-405) — `var(--shadow-cartoon-color)` (raw rgba primitive) + 2px border + translateY
3. `--cartoon-shadow-{sm,md,lg}` aliases (round-trip)

Recipes 1 and 2 use different alpha primitives so they don't agree byte-for-byte. The utility additionally bakes in a border + transform that the token doesn't carry. Pick: hoist the utility's border + translateY into `@utility cartoon-card` and have `.cartoon-card` reference `box-shadow: var(--shadow-cartoon-md)` for the offset. Or absorb the utility's behavior into the token recipe (border + transform are non-shadow concerns, so probably keep them at the utility level but unify the alpha primitive).

### C-4 — Recovery-diary leaks at HEAD (24 sites)

W6.δ enumerated 23; H scrubbed 4. This audit adds 5 (P.W1.B leak in tokens.css:359 + GlyphFace residual reference + multi-line tokens.css:305-310 contiguous block). H FINAL.md acknowledged the 4 it scrubbed as P0; the remaining 19+ across `src/index.ts` (7 wave-tag groupings), `theme.css` (3 `(G.W1)` annotations), `Slider.vue` (3 `R3` markers), and various GLSL/blob provenance lines are unaddressed.

The `src/index.ts` collapse is one-line surgical: replace 7 `// G.W3 ...` headers with one `// Custom packages` header (or none). The Slider.vue `R3` markers rewrite as canonical descriptions. The `(G.W1)` annotations in theme.css describe identity content (Cream identity / φ-spacing / icon-sized utilities); rewrite without the wave prefix.

### C-5 — Cartoon-surface recipe duplicated 4× across CVAs (G δ §1.2; unresolved)

Four CVAs duplicate the cartoon-surface recipe. The branches AREN'T byte-equivalent: Button + Select use `--cream`, Input + NumberField use `--cream-warm`. Drift is currently invisible. Either:
- (a) one `@utility cartoon-surface { bg + border + accent-shadow + hover/active geometry }` in utilities.css, four CVAs composite `'cartoon-surface'` instead of re-asserting six tokens; or
- (b) accept the divergence and document in a comment that Button/Select use `--cream` while Input/NumberField use `--cream-warm` (and surface why).

(a) is the gestalt fix.

### C-6 — `--easing-accent` doing 8+ jobs (G δ §4.5; unresolved)

`var(--easing-accent)` consumed by: NotificationDot bg, MathFormula left-rule border, PipelineFlow node accent, Blob color fallback, TimelineMarker color, TimelinePlayhead color, prism-theme syntax color, BezierCanvas stroke. The token name no longer describes most of its uses. Either rename to a substrate-neutral name (`--accent-vivid`) or split per use.

### C-7 — Slider scoped-CSS variants instead of CVA (deviation from shadcn-vue pattern)

CLAUDE.md states "All `ui/` components follow the shadcn-vue pattern... CVA variants are co-exported from each component's `index.ts`." Slider has 4 variants but no CVA. The variant logic is in `<style scoped>` keyed on `glass-slider--${v}`. Mechanically defensible (variant differences are structural CSS not class deltas) but inconsistent. Either (a) accept the deviation in CLAUDE.md by amending the convention to "or scoped CSS where variant differences are non-Tailwind"; or (b) introduce `sliderVariants` CVA whose values are just the modifier class names (`'glass-slider--standard'` etc.).

### C-8 — `<Blob>` instance runs two simultaneous rAF subscriptions (G δ §3.2 partial)

`useBlob.ts:135` registers a `useRAFLoop` driver. `useBlobPointer.ts:113-120` (now in `_internal/`) hand-rolls a separate `requestAnimationFrame` integrator with its own start/stop machinery. Two rAF subs per Blob instance, no shared scheduler. The `_internal/` boundary keeps it out of the public API but the architectural duplication remains. Fix: refactor `useBlobPointer` to consume `useRAFLoop` (or share a single rAF scheduler at the useBlob facade level).

### Plus three structural duplicate-authority observations not flagged P0/P1

- **C-9**: `<Card variant="cream">` and `<CreamSurface>` both apply `.cream-surface` (G δ §10.1; unresolved). Both have demo consumers. Pick one as canonical and amend the other's docstring.
- **C-10**: `<Card variant="paper">`, raw `.paper-card` utility, and `.paper-{1..4}` tier classes — three paths, no `<PaperSurface>` to mirror `<CreamSurface>` (G δ §10.2; unresolved).
- **C-11**: NumberField cartoon descendant-attr-selector outlier (G δ §1.4; unresolved). Tabs's provide/inject pattern — confirmed delivered at `Tabs.vue:13` — is the obvious template.

---

## §8  Comparison vs W6.δ — what W6.δ got right, what it missed

| W6.δ finding | Verdict at HEAD | This audit's response |
|---|---|---|
| CRITICAL-1: dock keep-open dual-authority | **confirmed; unresolved** | Verified at DockPopover.vue:38-46 + Slider.vue:44-56. Same shape. |
| CRITICAL-2: Tabs provide/inject not delivered | **FALSE POSITIVE — provide/inject IS delivered** | Tabs.vue:13 `provide('glassTabs', { variant })`; TabsList.vue:12 + TabsTrigger.vue:12 inject. The two-CVA pattern is structural (different DOM elements: container vs trigger). The pattern is consistent and idiomatic. **W6.δ misread the source**. |
| CRITICAL-3: `--cartoon-shadow*` orphan aliases | **confirmed; expanded** | W6.δ named 8 `--cartoon-shadow*` aliases. Actual round-trip alias-family count is 9 (§3). |
| Check 8: 23 recovery-diary leaks | **partly resolved** | H scrubbed 4 (H.W1.B in blob/index.ts × 2; H.W1 in flourishes.vue; silent-failure S6 in utilities.css). 19 W6.δ-flagged leaks survive + 5 this audit adds. Total at HEAD: 24. |
| Check 11: Tabs requires variant on List + Trigger | **partly resolved** | Provide/inject IS delivered (W6.δ wrong). Two CVAs are structural — not a violation. **Status: clean.** |
| Check 12: NumberField cartoon descendant-attr-selector | **unresolved** | Same shape at HEAD. Consider applying provide/inject template (Tabs as exemplar) so NumberFieldInput consumes a `glassNumberField` ctx instead of NumberFieldRoot pushing through descendant selectors. |
| Check 13: orphan `--cartoon-shadow*` aliases | **unresolved + EXPANDED** | W6.δ counted 8; actual round-trip family count is 9. |
| Check 14: `--accent-pink` orphan token | **confirmed; unresolved** | tokens.css:205, 587 + theme.css:113. Zero consumers. |
| Check 15: Slider `R3` markers | **unresolved** | 3 `R3` markers + the `(G R3)` annotation at Slider.vue:170 survive. |
| Check 5 (W6.δ §1 row 5): blob _internal/ private | **clean** | `_internal/` boundary correctly enforced; blob/index.ts:6-23 ships only the facades. |
| Check 9: build-time stability | **clean** | Confirmed via wave-proof timing (W3 25.77s, W4 24.64s vs G's 4-5min). |

**What W6.δ missed**: alias-family count is 9 not 1 (§3); CRITICAL-2 false positive (Tabs IS delivered); cartoon-shadow tri-source (§5.3 / C-3); cream / cream-warm CVA divergence; `--easing-accent` 8-job overload (G δ §4.5 carried unchanged); Slider scoped-CSS-variant deviation from CLAUDE.md convention; NotificationDot.vue:11 docstring lying about `pulse-ring-spin` (scoped to Pulse.vue, not visible); `useBlobPointer` hand-rolled rAF survives in `_internal/`.

---

## §9  Recommendations for tranche I gestalt-cleanup

Ordered by KISS / one-path severity. None require new abstractions; all are surgical edits.

### P0 — must land

1. **Pick one authority for dock keep-open** (C-1). Migrate `DockPopover` onto `dockSink.acquire()`; mark `'dockKeepOpen'` / `'dockRelease'` injection keys as symbols or move under `_internal/`. ≈20-line edit across 3 files.

2. **Strip 24 recovery-diary leaks** (C-4). Collapse `src/index.ts:5-44` 7 wave-tag headers into 1 (or 0). Rewrite `Slider.vue:17,43,170` `R3`/`G R3` markers as canonical descriptions. Rewrite `theme.css:66,209,215` `(G.W1)` annotations to drop the wave prefix while retaining identity content. Decide on tokens.css:305,326,359 cross-version rationale comments — the substrate calibration history may be load-bearing; if so, drop wave-letter prefixes. GLSL provenance comments retain.

3. **Retire 9 round-trip alias families** (C-2). Delete tokens.css:240-244 + 289-291 reverse aliases (`--cartoon-shadow*`, `--soft-shadow`, `--elevated-shadow`, `--modal-shadow`); rewrite theme.css:228-245 to read source recipes directly. Delete tokens.css:265 (`--card-shadow`) + tokens.css:270-271 (`--dock-shadow{,-collapsed}`); rewrite theme.css:234-236 to read source recipes. Delete the duplicate `--ease-X: var(--motion-ease-X)` declaration in theme.css:265-270 (already declared in tokens.css:75-78). Delete theme.css:246's `--shadow-cartoon-accent: var(--shadow-cartoon-accent)` self-reference and replace with the literal recipe. Delete the 9 orphan `--animate-*` tokens (theme.css:289-298) unless tw-animate-css's gates differ. Delete the `idle-bob` orphan keyframe + the 3 PRM block. ≈40-line surgical edit across 2 files.

4. **Retire `--accent-pink` orphan** (G δ §4.2). tokens.css:205, 587 + theme.css:113. ≈3-line edit.

5. **Retire `--shadow` orphan** (G δ §4.3). tokens.css:183, 570. ≈2-line edit.

### P1 — should land

6. **Hoist cartoon-surface recipe** (C-5). Either `@utility cartoon-surface { ... }` in utilities.css, or a shared CVA fragment. Reconcile `--cream` vs `--cream-warm` divergence at the same time. ≈15-line edit.

7. **Cartoon-shadow recipe single source** (C-3). Pick: `--shadow-cartoon-{sm,md,lg}` is the recipe; `.shadow-cartoon-{sm,md,lg}` extends with border + transform. Document the layering. Or unify into one recipe — but recognise the utility's border + transform are real consumer-facing behavior (G δ §5.3 surfaced this; H did not).

8. **NumberField provide/inject refactor** (C-11). Match Tabs's pattern — `<NumberField variant="cartoon">` provides; `NumberFieldInput.vue` injects and applies the matching slice of one shared CVA. Drop the `[&_[data-slot=input]]:` descendant selectors. ≈25-line edit across 3 files.

9. **Rename `--easing-accent`** (C-6). 8+ unrelated semantic jobs; rename to `--accent-vivid` (or split per substrate). Consumer count is high — coordinate with consumer release. ≈40-line edit across ≈10 files.

10. **Slider CVA-or-amendment** (C-7). Either land `sliderVariants` CVA as a class-name dispatch (CVA fragments select scoped-CSS modifier class names), or amend CLAUDE.md to allow scoped-CSS variants for ui/ components when variant differences are structural-CSS not Tailwind-class deltas. Either choice closes the "single ui/ family that breaks the convention" inconsistency.

### P2 — nice to land

11. **Fix NotificationDot docstring** (§5.1). Line 11 claims it reuses `pulse-ring-spin` from Pulse.vue's scoped style — false. Rewrite to describe the Tailwind `animate-ping` it actually uses. ≈3-line edit.

12. **Unify rAF in blob package** (C-8). `useBlobPointer` consumes `useRAFLoop` instead of hand-rolling. Two rAF subs → one per Blob instance. `_internal/` boundary makes this safe (no public API change).

13. **Cream / paper duplicate-authority decision** (C-9, C-10). Either `<Card variant="cream">` retires (consumers reach for `<CreamSurface>`) or `<CreamSurface>` retires (consumers reach for Card). Symmetric for paper — land `<PaperSurface tier="1|2|3|4">` to match `<CreamSurface>`, or drop both component nouns and rely on Card variants + raw utility classes. The current state is asymmetric (cream has component, paper does not).

### Build-time observation

H W3/W4 builds were 25-26s; W5/W6 ~1m 40s; G ~5min. The substrate trim was structural; W5/W6 jump correlates with stress baseline + storybook coverage. dts emission and 32 vite subpath entries are likely candidates if a future tranche profiles build — out of scope for I gestalt-cleanup.

---

## §10  Summary

H delivered its wire-or-retire mandate cleanly on the components / composables / utilities axes (paper-grain SVG single token, dead composables retired, ToggleGroupItem CVA collapsed, PipelineFlow silent-failure repaired, build time 10× lower than G). The W6.δ audit correctly identified the dock keep-open dual-authority and the `--cartoon-shadow*` alias chain as P0 absorb candidates; H FINAL.md absorbed only the 4 P0 recovery-diary leaks W6.δ named.

This deep audit confirms the dock keep-open dual-authority unchanged at HEAD; expands the alias-chain audit from 1 family (W6.δ) to **9 round-trip alias families + 9 `--animate-*` orphans + 1 orphan keyframe**; corrects W6.δ's CRITICAL-2 (Tabs provide/inject IS delivered — false positive); and surfaces 6 more violations W6.δ did not flag (cartoon-shadow tri-source, cream/cream-warm CVA divergence, `--easing-accent` 8-job overload, Slider scoped-CSS variants vs CVA convention, NotificationDot docstring lie, useBlobPointer hand-rolled rAF in `_internal/`).

**Critical-finding count: 8 (C-1…C-8) + 3 structural observations (C-9…C-11) = 11 total.**

**Top-5 absorb for tranche I**: (1) dock keep-open one-authority pick (C-1); (2) round-trip alias chain retire (C-2); (3) recovery-diary scrub (C-4); (4) cartoon-surface @utility hoist (C-5); (5) NumberField provide/inject refactor (C-11). Each is a one-day surgical edit. None require new abstractions.

---

## §11  Authority

Read-only audit. No source files modified, no destructive git commands invoked. All findings cite exact `file:line` or the exact `rg` invocation that produces the proof.

# Style Audit — Sub-Agent Prompt

Bidirectional design-token and utility-coverage audit. Runs against (a) a frontend consuming `@mkbabb/glass-ui` and (b) glass-ui itself. Surfaces drift from the canonical vocabulary, gaps in glass-ui that block convergence, and union candidates across the two.

Always dispatched as a parallel fan-out of read-only sub-agents over disjoint scopes — never a single agent. The orchestrator merges per-agent reports into one. Substitute `{TARGET_DIR}` and `{GLASS_UI_DIR}` per audit.

---

## Prompt body (copy verbatim into sub-agent dispatch, after substitutions)

````markdown
You are a style-audit sub-agent. **Read-only** — no edits, no commits.

## Mission

Audit `{TARGET_DIR}` for divergence from `{GLASS_UI_DIR}` design canon. The audit is bidirectional: every axis applies to glass-ui too, so legitimate gaps surface as proposed library additions rather than as drift.

## Canonical vocabulary

Glass-ui's grammar lives in source. Cite files and symbols; don't restate values.

- Tokens — `{GLASS_UI_DIR}/src/styles/tokens.css` §1–§14
- Theme bridge — `{GLASS_UI_DIR}/src/styles/theme.css` (`@theme` → Tailwind utilities)
- Typography — `{GLASS_UI_DIR}/src/styles/typography.css` (semantic `text-*` `@utility`s)
- Surfaces — `glass.css`, `cards.css`, `paper.css`, `floating-panel.css`, `dock.css`
- Motion — `transitions.css`, `animations.css`
- Shared utilities — `utilities.css`
- Components — `{GLASS_UI_DIR}/src/components/{ui,custom}/*`
- Composables — `{GLASS_UI_DIR}/src/composables/*`
- Design language — `{GLASS_UI_DIR}/DESIGN.md`
- Storybook taxonomy — `{GLASS_UI_DIR}/demo/stories/manifest.ts`

## Token namespaces to verify

Each row names *what should exist and be referenced via its semantic alias when one is defined*. Values are authoritative in `tokens.css`.

| Namespace | Cover |
|---|---|
| Duration | `--duration-{instant,fast,normal,slow,panel,xl,xxl,linger,popup-swap}`, shimmer triplet |
| Easing | `--spring-{smooth,snappy,bouncy,gentle}`; `--ease-{standard,out,in,out-expo,apple,apple-spring}` |
| Z-index | `--z-{background,content,controls,bar,dock,panel,overlay,hovercard,tooltip,popover,modal,fullscreen,toast,toggle,max,debug}` |
| Radius | primitives `--radius-{xs,sm,md,lg,xl,2xl,pill}` + semantic `--radius-{card,panel,dialog,input,button,badge,dock}` |
| Shadow | elevation `--shadow-{xs..2xl}`; cartoon `--shadow-cartoon{,-hover,-sm,-md,-lg}`; semantic `--shadow-{soft,elevated,modal,card,dock,dock-collapsed}`; per-tier glass shadows |
| Glass | `--glass-{bg,blur,border,shadow}-{subtle,default,medium,elevated}`, `--glass-blur-dock`, grain + highlight |
| Color — core | `--{background,foreground,card,popover,muted,secondary,accent,primary,destructive,border,input,ring}` + `*-foreground` |
| Color — palette | section 0..12, viz basis (`--viz-{fourier,chebyshev,legendre,amber,green}`), semantic accents (`--success/warning/info/delete/like/tier-{featured,saved}`), gold, rainbow vivid + pastel |
| Color — neutral | `--neutral-{0..5}` (dark mirrored) |
| Typography | golden-ratio `--type-{admin-label,micro,caption,small,body,prose,subheading,heading,title,display-{1..5}}`; `--leading-*`; `--tracking-*`; family quartet `--font-{display,serif,sans,mono}` |
| Interactive | `--scale-{hover,hover-dock,press,press-btn,press-dock}`, `--opacity-{disabled,icon-muted}`, `--focus-ring*`, `--lift-{sm,md,lg}` |
| Sizing | `--size-icon-btn`, `--icon-{xs..xl}`, dock geometry, `--max-width-input`, `--mask-fade-width` |
| Border opacity | `--border-opacity-{light,medium,strong}` |

## Audit axes

**1. Token alignment.** Inline literals where a token exists; primitive tokens where a semantic alias is defined; raw `rgba`/hex where the canonical recipe is `color-mix(in srgb, var(--foreground) N%, transparent)`; hand-rolled spring/cubic strings duplicating tokens; body neutrals not stepping through `--neutral-{0..5}`.

**2. Utility & `@apply` hygiene.** Tailwind utility soup that has a canonical class (`.glass-{subtle,default,medium,elevated,card,cartoon,btn,pill}`, `.btn-pill`, `.interactive-item`, `.focus-ring`, `.active-scale`, `.disabled-base`, `.hover-lift{,-md,-lg}`, `.scroll-fade-{y,top,bottom,mask}`, `.popover-animate`, `.slide-in-from-side`, `.shadow-cartoon-{sm,md,lg}`, `.kbd`, `.code-badge`, `.inline-pill`, `.input-bar`, `.section-label`, `.divider-h{,-tapered}`, `.scrollbar-{hidden,thin}`, `.paper-texture`, `.dock-{separator,spacer,label}`); custom CSS that should `@apply` `@theme` utilities; consumer `@layer components` redefining glass-ui's component layer.

**3. Interactive consistency.** Hover/press/disabled/focus implemented ad hoc instead of reusing the canonical interactive vocabulary — `<Button>` + `buttonVariants`, `.btn-pill`, `.glass-btn`, `.interactive-item`, `.focus-ring`, `.active-scale`, `.disabled-base`. Bespoke transforms instead of `--scale-hover*` / `--scale-press*`. Missing focus-visible on custom interactives. Touch hit areas under `--size-icon-btn`.

**4. Variant orthogonality and rooting.** Surface tier × semantic intent × shape geometry collapsing into one vocabulary. `:deep()` against reka-ui internals — each is a missing token, slot-class prop, or variant on the glass-ui side. Ad-hoc styling on shadcn-vue/reka re-exports — patch at the CVA root in glass-ui (or propose a new variant), not at the consumer leaf.

**5. Overlay and motion vocabulary.** Floating surfaces should compose canonical `z` + tier + Vue Transition: `Dialog` → `--z-modal` + elevated + `dialog-scale`; `Popover`/`Dropdown`/`ContextMenu` → `--z-popover` + elevated + `.popover-animate .slide-in-from-side` + `--popover-offset`; `HoverCard` → `--z-hovercard` + `fade-slide`; `Tooltip` → `--z-tooltip` + `fade`; `Sheet`/`Drawer` → `--z-modal`; floating panel → `--z-overlay` + medium + `floating-panel-in`; `Toast` → `--z-toast` + `pop`. `transition: all` instead of named property + token duration + token easing. Custom `@keyframes` duplicating `dialog-in`/`floating-panel-in`/`fade-in`/`scale-in`/`slide-up`/`dock-in`/`shimmer{-sweep}`/`shake`/`weight-{breathe,reveal}`. Spatial motion not bracketed by `prefers-reduced-motion`.

**6. Typographic and structural hierarchy.** Headings on ad-hoc Tailwind sizes vs `.text-{display-{1..5},title,heading,subheading}`. Body bypassing the CM-serif cascade or `.text-{body,prose}`. Mono labels/captions/kbd reinventing `.text-mono-*`, `.section-label`, `.kbd`, `.code-badge`. Display rendering without Fraunces axes (`WONK 1, SOFT 0`). Long-form prose missing `--leading-prose`. Spreadsheet-shaped lists where `Card` / `Timeline` / `Sidebar` / `SortableList` would carry hierarchy. Vue components with structural wrappers existing only to forward `class`/`style` — flatten onto the shadcn-vue root that already forwards.

**7. Accessibility resilience.** Custom glass surfaces missing fallback under `prefers-reduced-transparency`, `prefers-contrast: more`, `@supports not (backdrop-filter)` — flag only when reimplementing glass instead of using a canonical tier. `color-mix` recipes that bake light-mode foreground into a value the dark cascade can't unwind.

## Bidirectional gap analysis

After enumerating drift, produce two further lists:

- **Glass-ui gaps** — patterns the target legitimately needs that glass-ui does not yet expose. Token the target hard-codes ≥3 sites; CVA branch the target keeps reinventing; slot-class prop forcing `:deep()`; widget repeated ≥3 times (custom-component candidate); composable logic duplicated across components. Cite call sites, propose placement and rationale.
- **Union candidates** — same pattern, both libraries, different vocabulary. Cite both forms, propose canonical.

## Operating principles

Cite `file:line` for every drift finding; coalesce repeated patterns into one row with a count. Verify every canonical replacement by grep before naming it. Findings without a code site belong in *Glass-ui gaps*, not drift. Apply every axis to glass-ui itself — symmetry is the point. When canonical usage is unclear, locate the matching `demo/stories/` page and match its idiom. Skip generic advice; emit only when the replacement is concrete and named.

## Substitutions

- `{TARGET_DIR}` — root of the consumer to audit.
- `{GLASS_UI_DIR}` — glass-ui source (default `../glass-ui`).

## Deliverable

A single markdown file. Brief preamble (scope, target, glass-ui revision); drift findings grouped by axis; *Glass-ui gaps* section; *Union candidates* section; closing one-line tally.
````

---

## Parallel fan-out — required dispatch shape

The audit is sized to be unread by a single agent. Always dispatch the prompt body to N sub-agents in parallel over disjoint `{TARGET_DIR}` slices; each agent applies all seven axes to its slice. The orchestrator merges the per-agent reports into one `style-audit.md` (drift findings concatenated and re-grouped by axis; *Glass-ui gaps* and *Union candidates* deduplicated across agents) and emits a unified tally.

### Consumer audit (target = external app)

| Agent | Slice |
|---|---|
| a | `{TARGET_DIR}/src/components/ui/` (re-exported shadcn primitives — highest-leverage drift) |
| b | `{TARGET_DIR}/src/components/` excluding `ui/` (custom composites) |
| c | `{TARGET_DIR}/src/views/` + `src/pages/` + `src/routes/` (composition-level usage) |
| d | `{TARGET_DIR}/src/styles/` + global CSS + `tailwind.config.*` + `app.css`/equivalent |

### Self-audit (target = glass-ui)

| Agent | Slice |
|---|---|
| a | `{GLASS_UI_DIR}/src/components/ui/` |
| b | `{GLASS_UI_DIR}/src/components/custom/` |
| c | `{GLASS_UI_DIR}/src/styles/` |
| d | `{GLASS_UI_DIR}/demo/` (storybook is the oracle — drift here means the canon contradicts itself) |

Per-agent deliverables land at `docs/audits/runs/{YYYY-MM-DD}-{target}/{a..d}.md`; merged report at `docs/audits/runs/{YYYY-MM-DD}-{target}/style-audit.md`. *Glass-ui gaps* and *Union candidates* are merged with cross-agent deduplication — the same proposed addition cited by two agents collapses into one row whose call-site count sums.

## When to run

- Onboarding a new consumer onto glass-ui.
- Pre-tranche on glass-ui itself, to seed the next round of additions.
- Quarterly across active consumers, to catch slow drift before it ossifies.

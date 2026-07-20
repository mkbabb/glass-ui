# Design Idioms — the localized home

**Owner**: glass-ui (`@mkbabb/glass-ui`).
**Scope**: every Tailwind-v4 design idiom in `src/styles/` — `@theme` aliases,
`@utility` recipes, `@apply` composition, and the cohesion-aware `@import`-
partial discipline that bounds the central stylesheets.
**Binding**: a contributor adding a new `@theme` alias, `@utility`, or scoped
component style answers "where does it go?" from this doc alone. The
`src/styles/index.css` cascade header documents the load ORDER; this doc
documents where each IDIOM lives + where a new one belongs.

---

## §1 — Why this doc exists

The Tailwind-v4 idioms were localized organically across `src/styles/` but never
NAMED, so a contributor adding a `@utility` had no documented answer for which
file it belonged in, and the central stylesheets grew into god-modules. This doc
is the single home: it enumerates each idiom's file, states the cohesion-domain
placement rule, and records the `@import`-partial carve discipline so the next
complex stylesheet is built to the convention rather than retro-fitted.

It does NOT re-locate the idioms (that would break the cascade order the
`index.css` ledger preserves) — it makes the existing localization legible and
binding.

---

## §2 — `@theme` aliases → `theme.css`

The `@theme` block — the Tailwind color/font/radius/shadow bridge that mints the
named utilities (`rounded-panel`, `text-muted-foreground`, `shadow-cartoon-lg`,
…) — lives in ONE file: `src/styles/theme.css`. Its three-part structure is
load-bearing (the header documents it):

- a **LEADING plain `@theme`** — the radius primitives + the radius semantic
  aliases (declared before the inline aliases so `var(--radius-*)` recipes
  resolve across the file);
- an **`@theme inline`** block — the `var(--token)` BRIDGES (color / shadow /
  duration / easing / glass-blur) that re-point a Tailwind namespace at a
  `tokens.css` token, so a `bg-card` utility resolves to `var(--card)`;
- a **trailing plain `@theme`** — the remaining literals (`--animate-*`,
  opacity).

**Rule for a NEW `@theme` alias.** A bridge from a `tokens.css` token to a
Tailwind namespace goes in the `@theme inline` block; a primitive literal goes
in the trailing plain block; a radius primitive goes in the leading plain block.
Never declare a `@theme` alias in any other stylesheet — the bridge is
single-source in `theme.css`. The raw VALUE the alias bridges to is a token in
`tokens.css` (see §3); `theme.css` only names the Tailwind-facing alias.

**The token-vs-alias split.** `tokens.css` owns the raw `--token: <value>`
source-of-record (a complete `hsl()`/`color-mix()`/`linear()` value). `theme.css`
owns the `@theme`-namespace alias that bridges that token into a Tailwind utility.
A consumer retunes by overriding the `tokens.css` token on `:root`; the
`@theme`-bridged utility re-resolves with zero library edit (the cartoon-shadow
contract is the worked example — see `CLAUDE.md` §Cartoon-shadow override).

**The BA token-IDENTITY axes (where a re-calibration lives).** `tokens.css` (the
`tokens/*` partials it `@import`s) carries deliberate token-IDENTITY work — a
re-calibration that changes the library's OWN default identity, not a consumer
preset (the presets-in-consumers fence). Two BA arms a contributor must place
correctly:

- **The warm-chroma floor** — the `--neutral-*` ladder + the `--card` plate are
  authored at the warm hue with a chroma floor (the no-gray identity keep; values
  in `CLAUDE.md` §"The warm-chroma floor", source `tokens/color-radius.css`). A
  re-tune of a neutral rung is a token-IDENTITY edit in the `tokens/*` partial,
  NEVER a new `--neutral-*-warm` parallel family.
- **The dark luminous-transmissive material** — the dark register's
  `--glass-*`/`--surface-tint-*` arm lives in the per-mode pair partials
  (`tokens/dark-arm.css` the `.dark` fallback floor + `tokens/light-dark.css` the
  `light-dark()` enhancement arm, in LOCKSTEP), NOT a new parallel `--*-dark`
  family (the W-DARK-MATERIAL discipline; the `light-dark()` inset-shadow trap is
  why a fragment that breaks inside `light-dark()` uses the plain per-mode pair).
  A dark-arm re-declaration goes in the dark-arm/light-dark partial; the values
  live in `CLAUDE.md` §"The dark register as a luminous transmissive material" —
  this doc points, it does not duplicate.

---

## §3 — `@utility` recipes → the cohesion-domain file

A `@utility` recipe (a custom Tailwind utility composed via `@apply` or raw
declarations) lives in the file that owns its COHESION DOMAIN. The home map:

| domain | file | examples |
|---|---|---|
| typography | `src/styles/typography.css` | the golden-ratio type scale, semantic type classes, the engraved/depth text utilities |
| interactive / button | `src/styles/utilities/btn.css` | `scale-on-hover`, `twin-line-divider`, `transition-control/collapse`, `sheet-animate`, `rainbow-vivid/pastel`, `btn-interactive`, `table-cell/head` |
| a11y / capability override | `src/styles/utilities/a11y-overrides.css` | `touch-hit-area` + the `@media` overrides |
| glass surface | `src/styles/glass/*.css` | `glass-progress-rail` (the deck-position rail @utility); the `[data-surface="glass\|veil\|opaque"]` shared surface-decoration axis + the `.paper-ink-mark` MARK register (`glass/surface-axis.css` — see below); the `--control-surface-{bg,border,blur,bg-hover}` form-family REST tier (`glass/surfaces.css`) |
| feedback tone | `src/components/_shared/feedback/feedback-tone.css` | `.feedback-tone` + `.feedback-tone-{success,warning,info,destructive}` (the ONE shared tinted-glass tone register; a `_shared/feedback/` cohesion-domain register, `@import`ed at cascade rung 7a after `card/styles.css`) |
| menu glass | `src/components/_shared/menu/menu.css` | `.glass-menu-row` (the shared interactive menu-row register, a `_shared/menu/` cohesion-domain register) |
| paper texture | `src/styles/paper.css` | the paper underpaint + grain utilities |
| card / cartoon surface | `src/styles/cards.css` | `cartoon-surface` |
| dock control | `src/styles/dock-controls.css` | the dock-control surface utilities |
| instrument chassis | `src/styles/instrument-chassis.css` | the chassis bezel utility · the `[data-phase]` ink bus (BB.W-PHASE-PALETTE: `complete` reads `--phase-complete-color`, default `--color-gold` — the consumer-seam twin of the four active arms' `--chart-{phase}`, so completion ink is a CONSUMER choice; gold is EARNED, not the chassis default leaking onto every completion) |

**The shared-register idiom files (the cascade-position note).** Three BA-shipped
files mint a SHARED recipe register ≥2 component families compose — they are
`@import`-positioned for a cascade win, so the home-map records WHERE each sits
(the `index.css` ledger documents the ORDER; the two agree on the partial set):

- **`glass/surface-axis.css`** — the `[data-surface]` decoration axis `@import`s
  AFTER `glass/ladder.css`/`glass/surfaces.css` (`glass.css:51`) so its
  `[data-surface]` attr rules win over the base rung by source order. The
  `.paper-ink-mark` register it also carries is a MARK register (a 2px
  `--foreground` ink hairline drawn directly on PAPER — no plate, no blur, no
  glass), NOT a `[data-surface]` plate rung; it has ≥2 consumers (the math-paper
  section rail + the SegmentedTabs underline indicator, `segmented-tabs.css`), so
  it is a CENTRAL register, not a per-component scoped style (§7).
- **`_shared/feedback/feedback-tone.css`** — `@import`s at `index.css` cascade
  rung 7a (after `card/styles.css`), so the tone tint composes ON the resolved
  glass surface. It colocates in `_shared/feedback/` (component-family shared
  vocabulary) rather than a top-level `src/styles/*` partial; the `@import` rung
  is the cascade order, so the home and the position are independent.
- **`_shared/menu/menu.css`** — `@import`s at `index.css` cascade rung 11a (after
  `utilities.css`), so `.glass-menu-row`'s `@layer components` rules source-order-
  win over the flat-accent base (the cascade-trap pre-empt the file's header
  records).

**Rule for a NEW `@utility` or shared register.** Place it in the file whose
cohesion domain it belongs to (a button-press recipe → `utilities/btn.css`; a
glass-surface recipe → a `glass/*` partial; a type recipe → `typography.css`; a
new feedback-tone variant → `feedback-tone.css`; a new menu-row recipe →
`menu.css`). If no existing domain fits and the recipe is interactive/general,
`utilities/` is the catch-all home; add it to the partial whose §-section it
cohesively extends, NOT to whichever file is shortest. A `@utility` that belongs
to a single component's family lives in that component's central partial (the
dock/chassis/instrument files), never scattered into `utilities/`. A NEW SHARED
register that ≥2 component families compose (the feedback-tone / menu / surface-
axis precedent) is its OWN cohesion-domain partial with a §3 home-map row —
either a top-level `src/styles/*` file (`surfaces-pager.css`, `glass-capsule.css`)
or a `_shared/<domain>/` register when it is component-family shared vocabulary
(`_shared/feedback/feedback-tone.css`, `_shared/menu/menu.css`) — `@import`-
positioned for its cascade win, NOT folded into a per-component file (that would
couple the shared register to one component's load order).

---

## §4 — `@apply` composition discipline

`@apply` composes existing utilities (Tailwind or `@theme`-minted) into a named
class. The discipline:

- `@apply` only utilities that EXIST — a `@theme`-minted alias (§2) or a
  Tailwind built-in. Never `@apply` a class a consumer's content-scan might not
  generate; the `dist/styles/components.css` emit (`vite.style-assets.ts`) is the
  build-independent safety net, but the source must compose real utilities.
- A scoped component style (`<style scoped>` in an SFC) consumes the
  `@theme`-generated utility via `@apply`, NOT a `text-[var(--…)]` /
  `shadow-[var(--…)]` arbitrary wrap (the cascade discipline — gated by
  `proof:design-idiom-localization`). The sole sanctioned exception is a runtime
  custom-property binding (a value computed in JS and written to the element).
- The custom-property reference syntax in a Tailwind class follows the
  `var-in-arbitrary` rule (§6).

---

## §5 — Cohesion-aware `@import`-partial carve (the god-module discipline)

A `src/styles/*.css` stylesheet that grows past the 500-line no-god-module bound
is carved into cohesive partials, NOT chopped at an arbitrary line. The
discipline (the `dock.css` precedent — AX.W06 — generalized by AY.W-CSS1 to
`tokens.css` / `glass.css` / `utilities.css`):

1. **Carve by §-section cohesion**, never by line count. Each partial is a
   coherent section (a `:root` sub-range, a `@layer components` block family, a
   `@utility` cluster, a `@media`/`@supports` override group). The
   section-boundary box-comment is the seam; never split a `:root{}` or a rule
   mid-declaration.
2. **The monolith becomes a thin `@import` root.** It carries only the file
   header + the `@import` chain (CSS `@import` rules MUST precede every other
   rule, so the thin root has no rules of its own). The partials live in a
   same-named subdir (`tokens/`, `glass/`, `utilities/`, `dock/`).
3. **Preserve CASCADE ORDER.** The `@import` sequence is the cascade order — a
   later partial overrides an earlier one. Splitting one `:root{}` into N
   adjacent `:root{}` blocks, or one `@layer components{}` into N adjacent same-
   layer blocks, is cascade-isomorphic (same selector/layer, same source order).
   The cascade-order invariant is BINDING: an override partial (`light-dark`,
   `dark-arm`, the a11y `@media`/`@supports` arms) MUST `@import` AFTER the base
   it overrides; a `@property` registration MUST precede any rule that reads it.
4. **Each partial carries a COHESION header** (what the §-section IS), not
   migration archaeology — name what the partial DOES, never "carved from the
   old monolith vN.N".
5. **Keep the root authoritative.** Its literal `@import` sequence records the
   cascade. Style-surface tests follow those imports directly, and the production
   build verifies that the assembled stylesheet resolves.

The carved partial directories at HEAD: `src/styles/dock/*` (the AX.W06 dock
carve), `src/styles/tokens/*` · `src/styles/glass/*` · `src/styles/utilities/*`
(the AY.W-CSS1 central-stylesheet carve).

---

## §6 — The `var-in-arbitrary` rule (one encoded syntax)

A custom-property reference in a Tailwind-v4 class uses the **`<util>-(--x)`
shorthand** when (a) it follows a known utility prefix (`bg-`, `h-`, `w-`,
`border-`, `ml-`, `text-`, `size-`, `translate-x-`, …) AND (b) it carries NO
fallback. The arbitrary-value `[var(--x)]` / `[var(--x, fallback)]` form is
RESERVED for exactly three cases:

1. a **fallback-bearing** ref — `[var(--x, fb)]` (the shorthand cannot express
   the fallback);
2. an **arbitrary-PROPERTY** — `[backdrop-filter:var(--x)]`,
   `[box-shadow:var(--x)]` (no `(--x)` shorthand exists for an arbitrary
   property);
3. a **typed/modifier value** — `[length:var(--x)]`, `[color-mix(…)]` (a typed
   modifier has no shorthand).

A variant-modified shorthand IS valid (`[&_svg]:size-(--ui-glyph)` compiles
byte-equivalent to `[&_svg]:size-[var(--ui-glyph)]`). No bare
`<util>-[var(--x)]` (utility-prefix, no fallback, has-a-shorthand) survives in
`src/`. Machine-locked by `proof:var-in-arbitrary-guard`.

---

## §7 — The colocation convention's CSS half

A complex component (a god-module candidate — a WebGL/Canvas surface, a
multi-composable family) is structured into a feature-dir: components at the
package root, composables under `<dir>/composables/`, constants in
`<dir>/constants.ts`, shaders in `<dir>/shaders/`, skeletons in
`<dir>/skeleton/` (each "if needed"), a colocated `<dir>/styles.css` (or a
`<dir>/styles/` dir when the recipe carves into partials), and a `README.md`.
The colocation-hygiene fence (BAND-COLOCATION Wave 3; its form — reach-audit fold
vs standalone gate — is family A's pending budget call) will keep the convention
honest once it lands.

**Where a per-component style lives — it COLOCATES.** A component's own visual
recipe lives in its feature-dir as `<dir>/styles.css` (or `<dir>/styles/*.css`),
`@import`ed from `index.css` at the correct rung. **The `@import` POSITION is the
cascade order** — a partial's file LOCATION and its cascade RUNG are independent
axes, so colocation and cascade-safety are never in tension: a colocated
`<dir>/styles.css` `@import`ed at the right position wins (or yields) exactly as a
central partial would. ~15 feature-dir styles already ship this way in `index.css`'s component band
(ledger rungs 7-17, `card/styles.css` → `dialog/placement.css`) (`header-ribbon`,
`dock`, `card`, `button`, `configurator`,
`instrument-chassis`, `drawer`, `tabs`, `dialog`, `metric`, `scroll-progress-rim`,
`completion-seal`, …). A SHARED register that ≥2 component families compose does
NOT colocate onto one component — it stays central (`surfaces-pager.css`,
`glass-capsule.css` under `src/styles/glass/`) or lives in `_shared/<domain>/`
(`_shared/feedback/feedback-tone.css`, `_shared/menu/menu.css`), so no single
component owns the shared load order.

The SFC `<style scoped>` block is reserved for rules STRUCTURALLY local to one
component (layout/grid the component owns, a runtime custom-property binding) that
no other surface composes and that carry no cross-component cascade concern. The
rule for choosing: a recipe ≥2 surfaces compose → a central / `_shared/` shared
register; a component's own visual recipe → its colocated `<dir>/styles.css`,
`@import`ed at the right rung; a component's private structure with no cascade
stake → `<style scoped>`. Never duplicate a central recipe into a scoped block
(the cascade override would diverge).

## §8 — The scoped dark-arm idiom (NEVER `:global()` for a `.dark` ancestor)

A `<style scoped>` block that needs a dark-mode override of a LOCAL element
(the component's own `.dark`-conditioned tokens / fill) MUST use the **plain
ancestor form** — `.dark .my-thing` — and **NEVER** the `:global()` form
`:global(.dark) .my-thing`. The `:global()` form is a recurring footgun
(THREE production recurrences, consumer-verified) that the scoped-style compiler
**mis-compiles**: the trailing local selector after the `:global()` segment is
**DROPPED**, so the rule lands on the bare `.dark` ROOT and leaks every override
to the whole document — the dark arm you wrote never applies to your element.

**The CSSOM evidence** (`@vue/compiler-sfc` `compileStyle`, `scoped: true`,
`id: data-v-XYZ`):

```css
/* SOURCE (the footgun) — a scoped block: */
:global(.dark) .my-thing { --tok: var(--dark-value); background: var(--ink); }

/* EMITTED (the local selector DROPPED, the scope id GONE) — leaks to root: */
.dark { --tok: var(--dark-value); background: var(--ink); }
```

```css
/* SOURCE (the working idiom) — the plain ancestor: */
.dark .my-thing { --tok: var(--dark-value); background: var(--ink); }

/* EMITTED (correctly scoped — the scope id reattaches to the local leg): */
.dark .my-thing[data-v-XYZ] { --tok: var(--dark-value); background: var(--ink); }
```

The plain-ancestor form works because `.dark` is a real ancestor selector the
compiler leaves global by NATURE (an ancestor class is not the scoped subject),
while the local `.my-thing` leg correctly receives the `[data-v-XYZ]` attribute.
No `:global()` is ever needed to reach the `.dark` ancestor from inside a scoped
block. Machine-locked by `proof:no-scoped-global` (a static sweep: zero
`:global(` inside any `<style scoped>` block across `src/` + `demo/`; allowlist
empty). The same trap eats `body.export-mode`-style ancestor arms — use the
plain `body.export-mode .my-thing` form there too.

## §9 — Recorded twin-primitive divergences (the deliberate keeps)

Some primitives look like they want a merge but legitimately DIVERGE — the same
recorded-divergence discipline the project applies to `cn` (the hand-rolled
deduplicator over `tailwind-merge`), `.focus-ring` (the utility over the inline
ring chain), and the `in srgb` surface-tint family (over `in oklab`). The keep is
recorded HERE + cross-referenced in-source so a contributor choosing between two
near-twins has documented guidance instead of guessing.

**ConfiguratorRow vs LabeledField.** Both are "label
(+ meta) above/beside a slotted control", but they emphasize DIFFERENT features
and are NOT interchangeable:

| primitive | use for | carries |
|---|---|---|
| `<ConfiguratorRow>` (`custom/configurator/`) | TOKEN / PRESET controls inside a `<Configurator>` | token-`name` reference + opt-in `reset` (`canReset`) + the four-rung `density` axis (local-prop-over-inject) |
| `<LabeledField>` (`components/labeled-field/`) | accessible form controls | stable label/description/error IDs + required/optional + invalid/disabled + default/horizontal layout; no control paint |

These concepts diverge deliberately. Use ConfiguratorRow only when token metadata
or reset is itself content; use LabeledField directly for a form control, even
inside a Configurator. Do not nest them merely to repeat a label.

(The sibling Metric*-family abstraction — the `coalesceMetric` value core the four
Metric* surfaces share — is the OPPOSITE verdict from the same wave: those four
genuinely wanted ONE core, so they got `src/utils/coalesceMetric.ts`, not a
divergence note. The judge-don't-force discipline cuts both ways.)

**The `in srgb` `--surface-tint-*` family (AW.W26).** The `--surface-tint-*`
ladder generates its foreground-over-transparent overlay with
`color-mix(in srgb, var(--foreground) N%, transparent)` — `in srgb`, NOT
`in oklab` — DELIBERATELY (source `tokens/color-radius.css` light arm; the dark
arm in `tokens/dark-arm.css` keeps the same `in srgb` OUTER mix with an
`oklch(from …)` ink SOURCE, not a mix-space change). The mwg-CSS guidance prefers
`in oklab` for tint GENERATION (perceptually uniform mixing), but glass-ui's tints
are hand-tuned at fixed α stops against a warm-ink `--foreground` over a cream
substrate: `in srgb` is the brand-calibrated mix the whole token ladder + the
shadow family already speak, and switching the interpolation space would shift
every resting border/wash α off its hand-set value. This is the house identity, a
recorded KEEP — NOT a gap to "fix" to `in oklab`. The DISTINCTION: the GLASS-tint
axis (`--glass-tint-*`, the W55 legibility seam + the feedback-tone register) DOES
use `in oklab` (the perceptual glass family), and aurora/blob shaders that want
perceptual interpolation run OKLCh in-shader — those are the separate, correct
oklab paths. The `--surface-tint-*` brand-overlay is the in-srgb keep; the
glass-tint perceptual axis is the oklab path; the two are NOT a drift to
reconcile. (Cross-ref `CLAUDE.md` Conventions §"color-mix(in srgb …) over
in oklab for the surface-tint family — DELIBERATE".)

## §10 — The house snap engine on `SpringProgress` (the §6 per-spring clock)

When a surface needs a detented drag-to-snap motion (a bottom-sheet peek/half/full,
a side-lens slide), the snap settle rides ONE house `SpringProgress` on a NAMED
`(response, ζ)` register — NEVER a foreign drag library's injected
`cubic-bezier(.32,.72,0,1)` transition or a bespoke `setInterval`/`setTimeout`
detent timer. This is the §6 easing doctrine made structural: ONE motion vocabulary
per the library, each register its own clock.

The reference is the Drawer family (BB.W-DRAWER-ABROGATE). vaul-vue owned the snap
math through a `cubic-bezier` transform transition (and dragged a `@vueuse/core
^10.8.0` hard-dep — a second @vueuse major against the constellation's `^14` spine).
The de-fork moves the family onto the HOUSE reka `DialogRoot`/`DialogPortal`/
`DialogContent` headless substrate (the SAME vueuse-free substrate every other
compound wrapper binds — `Dialog`/`Sheet`/`Popover`/`Command`) and re-builds the
snap math as a THIN house engine:

- **The settle is ONE `SpringProgress`** (`useDrawerSnap.ts`, the
  `dockMorphContext.ts` precedent — `new SpringProgress({response, dampingFraction})`
  owning its own rAF via `.play(onFrame)`), writing a single `--glass-drawer-t`
  snap-fraction scalar (0..1) the content root reads as a token-driven inline
  `transform` (the tailwind-first law — the scalar IS a custom property, no raw
  pasted CSS). A re-target mid-flight RE-SEATS the spring from its current
  `(value, velocity)` so an interrupted snap stays one continuous trajectory.
- **The register is the surface's OWN clock** (`DRAWER_SNAP` in `drawer/constants.ts`
  — `{ response: 0.4, dampingFraction: 0.82 }`), NOT a re-use of the dock's
  `DOCK_SPRING` morph-settle. The per-spring-clock §6 doctrine: a heavier sheet
  settling is not the dock's crisp box-morph; each register names its own value.
- **The drag-release decision reuses the `useDockState` velocity SHAPE** (a fling
  past a velocity threshold advances a detent in the drag direction; a slow release
  snaps to the nearest detent) — re-expressed in the composable, never a shared
  mutation of the dock's state.
- **PRM is the engine's** — `SpringProgress`'s `respectReducedMotion: true` jumps the
  scalar to target in one frame under `prefers-reduced-motion: reduce` (a CSS reset
  cannot reach the spring's rAF; the engine owns the deterministic detent seat).

Machine-locked by `proof:drawer-abrogate` W3 — a re-introduced `cubic-bezier(.32,
.72,0,1)` curve, a `setInterval` snap loop, or a `DOCK_SPRING` import into the drawer
all RED the gate, the way the §6 doctrine forbids a second motion vocabulary.

## §11 — The editor-on-the-Configurator idiom (the `<EasingConfigurator>` register)

When a library editor primitive has a fuller register — the bare editor seated as
one row in a preset-driven controls column — the register is the bare editor
COMPOSED INTO the shipped `<ConfiguratorLayer>`/`<ConfiguratorRow>` chassis, NOT a
re-authored second control column. The W-HIERARCHY vocabulary (the §φ section rung,
the row label register, the control rhythm) is INHERITED from the Configurator the
way the aurora/blob studios inherit it — no per-editor re-tuning.

The reference is the EasingPicker family (BB.W-EASING-PRIMITIVE). `<EasingPicker>` is
the bare curve editor; `<EasingConfigurator>` is the chassis-seated register — both
on the `/easing` subpath, sharing the `useEasingPicker` composable. The
configurator register is a THIN composition: it seats the SAME `<EasingPicker>`
(single-sourced state — NO second composable instance, NO duplicated drag/sample
logic) inside a `<ConfiguratorLayer><ConfiguratorRow>` shell and threads the
`v-model` through. The two names are ONE primitive family.

The boundary law rides the idiom unchanged: the editor COMPONENT is glass-ui, the
curve MATH is value.js (`CSSCubicBezier`/`steppedEase`/`bezierPresets`/`jumpTerms`,
composed by the `useEasingPicker` composable — never re-implemented), the playback
is keyframes.js (the one-shot rAF default; the kf `Oscillator` slots into the
picker's `loop` seam when it ships). The curve's single color event is
`--motion-accent` with the library's OWN `--viz-legendre` violet twin as the
self-sufficient default (`var(--motion-accent, var(--viz-legendre))` — the ppmycota
fence: a demo hue NEVER enters a library token).

Machine-locked by `proof:easing-primitive` (W2 the math is COMPOSED not forked —
no inline staircase evaluator / cubic-bezier solver; W5 this idiom is homed here +
the boundary law recorded in CLAUDE.md).

## §12 — The tier-root specular auto-arm + the grain pop-kill (BB.W-LIQUIDHOVER)

The interactive-glass tier's pointer-following gleam is a PROPERTY OF THE TIER, not a
per-consumer opt-in. The position write (`--mouse-x`/`--mouse-y`, mapped by the
`.glass-material::before` recipe onto the typed `--specular-*` channel) has ONE logic
source (`createSpecularWriter`, the rAF-coalesced + cached-PRM + cleanup core in
`useSpecularTracking.ts`) delivered TWO ways:

- **The `vSpecular` directive** (`composables/glass/vSpecular.ts`, the `vReveal`
  `ObjectDirective` playbook) — the ZERO-WIRING tier-root delivery. An interactive glass
  surface auto-arms the gleam by being a directive target: Button (the glass-register
  variants, gated by `v-specular="specularArmed"`) + the four dock controls
  (DockIconButton/DockTabButton/DockSelectTrigger/DockDropdownTrigger, bare `v-specular`)
  carry it internally, so a bare `<Button variant="glass">` / `<DockIconButton>` gleams
  pointer-following with NO consumer `@pointermove`. Published on `/glass` so a NET-NEW
  interactive glass surface auto-arms with `v-specular` (the ≥2-consumer generality).
- **The `useSpecularTracking` composable** — the Vue `:style`-ref delivery for the
  CONDITIONAL case (Card's prop-gated `specular` opt-in: a Card is NOT inherently
  interactive, the gleam is an explicit affordance). Card routes the gated case through
  the SAME directive (`v-specular="specularArmed"`), so no hand-composed `@pointermove`
  triplet survives on an always-on control.

The RULE: ONE position-write source (`createSpecularWriter`), the directive WRAPS it
(never a hand-rolled rAF/PRM/coordinate copy). A consumer/sibling wave forking its own
`--mouse-x/y` writer fails `proof:glass-cohesion`'s `no-forked-mouse-writer` clause. The
directive host must be the box whose `::before` paints the gleam (the §Triumvirate
host-geometry rule).

**The grain pop-kill (the COMPOSITION CLASS).** The grain `::after` overlay
(`glass/ladder.css`) keeps `background-image: var(--paper-clean-texture)` ALWAYS PRESENT
(the longhand, decoded once at rest, NEVER toggled to `none`); any state-driven grain
engage cross-fades the `opacity` ONLY on the thin `--glass-grain-engage-duration` (~120ms
linear direct-write — no spring, "instant-but-smooth"). A `background-image: none → image`
engage decodes-and-appears in one frame (the "disco-grain pop", T8-F6) — forbidden. The
engage collapses to 0ms under the PRM bracket (a hover grain cross-fade under reduce is
still motion); the reduced-transparency / forced-colors brackets already zero
`--glass-grain-opacity`. The opacity cross-fade is the only sanctioned grain engage.

Machine-locked by `proof:glass-cohesion` (the `liquid-hover` arm — W1 auto-arm seam
minted-once-wrapping-the-core + no-forked-writer, W2 the Button + dock auto-arm zero-
wiring, W3 the hand-wire retired no-two-copies, W4 the grain opacity cross-fade + the
none→image self-test bite) + the binding π (`tests-visual/liquid-hover.spec.ts` — the
gleam tracks the cursor off the dead-centre 50%, the grain image is constant across the
hover onset, the PRM bracket pins static; both modes) + the `proof:ba-gestalt` dock/CTA
verdict.

## §13 — The component customization-surface contract (BC.W-CUSTOMIZABILITY-CENSUS)

Every published glass-ui component exposes the SAME three-layer customization surface —
this is the binding bar (`component-customizability.md §0`): *"all our components are fully
customizable with reasonable, pragmatic, GOLDEN (like our golden typography) defaults that
afford design hierarchy."*

- **PROPS = the semantic per-instance choices** (variant / size / tier / tone), typed +
  published on `@mkbabb/glass-ui/api` (the `*Variants` types). A primary CTA reads bigger
  and glassier than a secondary with ONE prop — hierarchy out of the box, no per-site
  hand-tuning.
- **TOKENS = the visual magnitudes** (padding / blur / glyph / alpha / hue / duration) as
  CSS custom properties a consumer retunes from ONE `:root` override: the
  `--control-h-{xs,sm,md,lg}` / `--control-text` cohort, the φ `--overlay-pad-inline/-block`
  ladder, the sqrt-φ `--card-pad-*` ladder, the √φ `--type-*` / `text-display-*` ladder,
  `--glass-level` / the `--glass-bg-*` tiers.
- **SLOTS = content insertion.**

AND the BARE component already reads as a proportioned √φ-typography / warm-cream-glass /
spring-clocked design (the golden default) — the bar the library SET inside itself (Card's 7
tiers + the golden √φ pad ladder, Button's 13 variants + 6 size rungs reading `--control-h-*`,
GlassDock's 12 axes).

**THE THREE FENCES (binding):**

- **DON'T over-prop — a TOKEN beats a prop where a `:root` override suffices.** Magnitudes →
  tokens; semantic per-instance choices → props. A wave that adds a `padding` prop where
  `--overlay-pad-inline` already serves is the anti-pattern (the `--focus-ring-shadow`
  token-first divergence, AW.W26 — a magnitude is a token, not a prop).
- **No contrivance — a size/variant/tier axis is added ONLY where the hierarchy choice is
  REAL.** The input register (Input / Switch / Textarea / NumberField) gets a `size` axis
  (control-size hierarchy is real); Separator / Label / Skeleton / a 16px checkbox atom do
  NOT (a hairline / a selection atom has no size hierarchy — forcing one is contrivance).
- **DRY — thread the EXISTING register, ZERO new register.** The `--control-*` cohort, the
  shared `{glass·veil·opaque}` `Surface` axis (`_shared/useSurfaceAxis.ts`), the φ overlay-pad
  ladder, the √φ type ladder all have ≥2 consumers. A wave that mints a parallel
  size/surface/pad register instead reds.

Machine-locked by `proof:customizability-census` (`scripts/proof-customizability-census.mjs`,
`["local","ci"]`) — C1 no hardcoded control type/height off the `--control-*` cohort · C2
overlay golden uniformity (the `surface` axis + the φ `--overlay-pad-*` ladder) · C3 no
fork-forced px literal / `!important`-fighting-CVA in a compound · C4 audacious-type-not-
starved — plus the EXACTLY-ONE-LIST census closure (`docs/tranches/BC/audit/W-CUSTOMIZABILITY-
census.md`: `gold` | `gap` | `token-only-correct`; a new bare un-listed component reds) + the
binding π (`tests-visual/customizability.spec.ts` — a bare component resolves the golden
default magnitude, a size/surface prop visibly retunes, a `:root` token override cascades into
the magnitude; both modes). The gate scopes the customization-SURFACE axis; `proof:no-shadcn-
default` owns the default-paint vocabulary, `proof:glass-cohesion` the bg-opacity axis —
disjoint by clause. The per-component THREADS land in the owning band waves
(`BC.W-CONTROL-CUSTOM` / `BC.W-OVERLAY-UNIFORM` / `BC.W-SEARCH-CUSTOM` / `BC.W-HERO-AUDACIOUS`),
each re-earning its own `proof:ba-gestalt` verdict.

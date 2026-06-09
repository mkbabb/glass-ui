# AY.W-CSS1 — CSS monolith carves cascade-order-safe + the .css-aware god-module gate

| | |
|---|---|
| **State** | OPEN |
| **Repo** | glass-ui (`/Users/mkbabb/Programming/glass-ui`) |
| **Type** | refactor + gate |
| **Hardening finding** | `docs/tranches/AY/audit/hardening/H-godmodule.md` (F3, F7) |
| **Depends on** | none (W-GOD1 is the `.vue`/`.ts` arm; this is the orthogonal `.css` arm — they touch disjoint files and disjoint gates) |
| **Sibling** | W-GOD1 (TS/Vue carves + `proof:no-god-module` CI-promotion), W-LEG1 (the `var-in-arbitrary` GATE registration — this wave AUTHORS the rule; W-LEG1 wires `proof:var-in-arbitrary-guard`) |

---

## Defect (verified, file:line)

### D1 — The line-bound gate is `.css`-BLIND, and the three biggest stylesheets are 2–4.5× over with ZERO coverage

`scripts/proof-no-god-module.mjs:47` collects ONLY `.ts`/`.vue`:

```js
if (entry.name.endsWith(".ts") || entry.name.endsWith(".vue")) {
    acc.push(full);
}
```

It never walks `.css`. The `HARD_LIMIT = 500` (line 20) the whole structural-close band is named for therefore does not bind the CSS tree at all. Measured (`wc -l`):

| css file | lines | ratio over 500 | gate coverage TODAY |
|---|---|---|---|
| `src/styles/tokens.css` | **2281** | 4.56× | NONE |
| `src/styles/utilities.css` | **1170** | 2.34× | NONE |
| `src/styles/glass.css` | **1113** | 2.23× | NONE |
| `src/styles/dock-controls.css` | 623 | 1.25× | NONE |
| `src/styles/theme.css` | 529 | 1.06× | NONE |
| `src/styles/dock/shell.css` | 457 | — | `proof:dock-css-carve` (scoped to `src/styles/dock/*` ONLY) |

The ONLY `.css`-aware line gate is `proof:dock-css-carve` (`scripts/proof-dock-css-carve.mjs:38`, `HARD_LIMIT = 500`) — scoped to `src/styles/dock/*` via `DOCK_PARTIAL_ORDER`. Its own header (line 9) concedes the scope: *"W25a owns the ci-tagged `.css`-extension of the shared collector; until it lands, this gate proves the dock arm"*. W25a never landed; this wave IS the general `.css` extension.

### D2 — A naive line-count chop would break the cascade-order resolution the CLAUDE.md contracts depend on

`tokens.css` is NOT flat declarations — it is an ORDERED cascade ledger. The block structure (verified by grep):

- `:root { … }` (lines 13–1784): the master token block — §-1 color-scheme, §0 font, §1 duration, §2 easing, §2.A ambient-motion, §3 z-index, §4 radius, §5 color palette, §5c constellation, §7 shadows, §8 glass ladder, §11 interactive scales, §12 paper, §20 platform-motion.
- §-1a/§-1b `:root` + `@media (pointer:coarse)` (1785) + `@media (min-resolution:2dppx)` (1798) + `@supports (color: light-dark(...))` (1835): the light-dark color architecture overrides.
- `.dark { … }` (1941–2150): the dark-arm re-resolution (`--foreground`, `--shadow-color`, constellation dark arm).
- `@property` registrations (2151–2269): `--progress-crescendo`, `--phase-tint-amount`, `--ripple-radius`, `--specular-{x,y,intensity}`, `--glass-level`, `--ui-scale`.
- final `:root` (2270) + `.dark` (2278): the specular-intensity magnitude cohort.

The CLAUDE.md cartoon-shadow contract (`:root` raw value → `.dark` re-resolution of `--shadow-color`) and the glass-level contract (`@property --glass-level` registered BEFORE the `.dark`/`@supports` brackets that re-point it) both depend on this ordering. A 500-line chop at an arbitrary boundary would (a) split the master `:root` mid-block, (b) risk emitting a `@property` registration AFTER a rule that reads it, (c) move a `.dark` override above the `:root` base it overrides. The carve must be **cohesion-aware by §-section, cascade-order-preserving** — the `src/styles/dock.css` precedent (`dock.css` lines 1–42: a thin `@import` root over `dock/{shell,morph,density,layers,layer-group,overflow}.css` in cascade order, each `@layer components`, "isomorphic" — same layer, same source order → ZERO visual delta).

`glass.css` (1113) is a set of `@layer components` blocks (lines 31, 902, 1078) interleaved with the W55 adaptive-glass `@container style(--glass-backdrop: light)` blocks (371) + the `@supports (corner-shape: superellipse(2))` squircle arm (903) + `@media (prefers-reduced-transparency: reduce)` (919), `@media (prefers-contrast: more)` (940), `@media (forced-colors: active)` (968), `@supports not selector(:has(*))` (1108) overrides — splittable on the `@layer`/`@media`/`@supports` block seams. `utilities.css` (1170) is `@utility …` directives (8, 19, 708, 732, …, 1046) + `@layer components` (26) + `@media` overrides (1083, 1126, 1163) — splittable on the `@utility`-family seams.

### D3 — The library mixes two Tailwind-v4 custom-property syntaxes in one class string; the rule is unencoded

`src/components/ui/tabs/TabsIndicator.vue:19` uses BOTH forms in ONE string: `w-(--reka-tabs-indicator-size)` (v4 shorthand) AND `bg-[var(--glass-bg-quiet)]` (arbitrary-value). `src/components/ui/tabs/TabsList.vue:34`: `h-[var(--control-h-md)]`. Measured at HEAD (`grep -rPno '\[var\(--[a-z0-9-]+\)\]' --include='*.vue' --include='*.ts' src/`): **61 raw bare `[var(--x)]`** total, of which **~54 are class-1 (util-prefix, no fallback — the shorthand-eligible TARGET)**, the remaining ~7 are arbitrary-PROPERTY (`[backdrop-filter:var(--x)]`, `[box-shadow:var(--x)]`) keeps; PLUS **5 fallback-bearing `[var(--x, …)]`** keeps. Empirically the bare cases split into THREE classes:

1. **`<util>-[var(--x)]`** (e.g. `bg-[var(--glass-bg-wash)]`, `h-[var(--control-h-md)]`, `ml-[var(--stack-overlap-md)]`) — HAS a v4 shorthand `<util>-(--x)`. **The rule's TARGET.**
2. **`[<prop>:var(--x)]`** arbitrary-PROPERTY / typed-value (e.g. `[backdrop-filter:var(--glass-blur-quiet)]`, `[box-shadow:var(--glass-shadow-floating)]`, `[length:var(--control-text)]`, `[&>svg]:size-[var(--ui-glyph)]`) — NO `(--x)` shorthand exists (the `(--x)` form only follows a KNOWN utility prefix; arbitrary-property `[prop:value]` and typed `[length:…]` modifiers have no shorthand). **Legitimate keep.**
3. **`[var(--x, fallback)]`** fallback-bearing (`src/components/ui/progress/ProgressDefault.vue:14` DOCUMENTS `bg-[var(--progress-track,var(--secondary))]` as intentional — the `(--x)` shorthand CANNOT carry a fallback). **Legitimate keep.**

The carve cannot blanket-convert `[var(--x)]` → `(--x)`. The rule must target class 1 ONLY.

---

## Goal criterion (the aim)

The CSS tree is bounded by the SAME structural discipline as the TS/Vue tree: no `src/styles/*.css` file is a god-module, the carve is cohesion-aware (every partial is a coherent §-section in cascade order, the `dock.css` precedent), the `/styles` bundle a consumer compiles is byte-for-byte unchanged (the carve is a pure structural re-`@import`, ZERO visual delta), and the two-syntax custom-property idiom inconsistency is resolved to ONE encoded rule (shorthand where it applies; arbitrary-value only where a fallback or arbitrary-property demands it).

---

## Objective (the work)

### O1 — Extend the god-module gate collector to walk `.css`

The shared collector at `scripts/proof-no-god-module.mjs:39-53` (`collect()`) gets `.css` added to its file filter (line 47), so the ONE gate bounds `.ts`, `.vue`, AND `.css` under the 500 line bound. This is the F3-mandated general `.css`-extension `proof:dock-css-carve`'s header named and never landed. KISS: one filter clause, no second gate to maintain.

The `.css`-aware extension carries TWO assertions beyond the bare line count (the F3 caveat: *"The gate must assert import-order preservation, not just per-file line count"*):

- **import-order preservation** — for each carved monolith, the gate reads the thin `@import` root and asserts the partials are `@import`-ed in the recorded cascade order (the `read-dock-css.mjs` `DOCK_PARTIAL_ORDER` pattern — a per-monolith ordered partial list). A reordered `@import` → RED.
- **single-`@layer` isomorphism for component-layer monoliths** — `glass.css`/`utilities.css` partials each carry their own `@layer components` (or `@utility`) so the carve is layer-isomorphic (same layer, same source order). `tokens.css` partials carry their `:root`/`.dark`/`@property`/`@media`/`@supports` blocks in the recorded order. The gate asserts no partial leaks a rule into a different layer than its monolith declared.

### O2 — Carve `tokens.css` (2281) cohesion-aware, cascade-order-preserving

`tokens.css` becomes a thin `@import` root (the `dock.css` model — `@import` rules MUST precede every other rule). Carve by the §-section seams into `src/styles/tokens/` partials, each < 500 lines, in cascade order:

| partial | content (by §) | source range (approx) |
|---|---|---|
| `tokens/scheme-motion.css` | §-1 color-scheme, §0 font source-of-truth, §1 duration, §2 easing (spring `linear()`), §2.A ambient-motion, §3 z-index | 13–341 |
| `tokens/color-radius.css` | §4 radius reference, §5 color palette (warm cream/muted black), §5c constellation | 342–566 |
| `tokens/shadow-glass.css` | §7 shadows (cartoon offset), §8 glassmorphism five-tier ladder | 567–1005 |
| `tokens/scale-paper.css` | §11 interactive scales & focus, §11b/§12 paper textures, §20 platform-motion | 1006–1784 |
| `tokens/light-dark.css` | §-1a/§-1b light-dark `:root` overrides + the `@media (pointer:coarse)` / `@media (min-resolution:2dppx)` / `@supports (light-dark())` arms | 1785–1940 |
| `tokens/dark-arm.css` | the `.dark { … }` block (foreground/shadow-color/constellation dark re-resolution) | 1941–2150 |
| `tokens/property-regs.css` | the `@property` registrations (specular/glass-level/ui-scale/progress/phase/ripple) + the final `:root`/`.dark` specular-magnitude cohort | 2151–2281 |

The cascade-order invariant is BINDING: `light-dark.css` after the master token partials (it overrides them), `dark-arm.css` after `light-dark.css`, `property-regs.css` last (registrations + the magnitude cohort). The section-boundary line numbers above are the AUTHORING GUIDE — the executing agent splits on the actual `═══ §N ═══` box-comment seams (`grep -nE '§-?[0-9]'`), keeping each section WHOLE (never split a `:root{}` mid-property). Each partial under 500 (the largest section, §11–§20 at ~778 lines, splits further on the §11/§11b/§12/§20 sub-seams).

### O3 — Carve `glass.css` (1113) on `@layer`/`@media`/`@supports` seams

Thin `@import` root over `src/styles/glass/` partials (cascade order). The seam map below is the AUTHORING GUIDE — the executing agent splits on the actual top-level `@layer`/`@media`/`@supports` braces (`grep -nE '^@layer|^@media|^@supports|^@container' src/styles/glass.css` → 31, 371-inner, 902, 903-inner, 919, 940, 968, 1078, 1108), keeping each block WHOLE:

| partial | content | seam |
|---|---|---|
| `glass/ladder.css` | the five-rung `.glass-{wash,quiet,resting,floating,overlay}` ladder + `.glass-material` + `.glass-card`/`-pill`/`-btn` + the moving-specular wiring + the W55 adaptive-glass `@container style(--glass-backdrop: light)` blocks (co-located with their rung, including the `@supports (color: contrast-color())` refinement) | `@layer components` 31–901 (the ~870-line ladder block is OVER bound — splits further: the ladder/`.glass-material` rungs vs `.glass-card`/`-pill`/`-btn` at the card seam, each < 500, with the W55 `@container` blocks riding their owning rung's partial) |
| `glass/squircle.css` | the `@layer components` superellipse arm — `@supports (corner-shape: superellipse(2))` over the glass surfaces | `@layer components` 902 + `@supports` 903 (~16 lines) |
| `glass/a11y-fallback.css` | the `@media (prefers-reduced-transparency: reduce)` / `@media (prefers-contrast: more)` / `@media (forced-colors: active)` arms + the final `@layer components` (1078) + `@supports not selector(:has(*))` (1108) `:has`-less fallback | 919–1113 |

The squircle `@supports` + the a11y/`@supports` arms MUST stay AFTER the base `@layer components` ladder in source order (they override it) — the cascade-order invariant the gate's import-order assertion (O1) locks. The W55 `@container style(--glass-backdrop: light)` blocks stay co-located with their rung in `glass/ladder.css` (NOT hoisted into a11y-fallback — they are the tint axis on each rung, not a media override).

### O4 — Carve `utilities.css` (1170) on `@utility`-family seams

Thin `@import` root over `src/styles/utilities/` partials (cascade order):

| partial | content | seam |
|---|---|---|
| `utilities/animate-layer.css` | the `@utility popover-animate`/`slide-in-from-side` + the `@layer components` focus-ring/btn-press block | 8–707 (splits at the `@layer components` close if >500) |
| `utilities/btn.css` | `@utility scale-on-hover`/`twin-line-divider`/`transition-*`/`sheet-animate`/`btn-audacious`/`btn-audacious-gold`/`table-*`/`rainbow-*`/`btn-interactive` | 708–1082 |
| `utilities/a11y-overrides.css` | the `@media (prefers-reduced-motion)` / `@media (forced-colors)` / `@media (pointer:coarse)` arms | 1083–1170 |

### O5 — Wire the carved roots into `index.css` with ZERO order change

`src/styles/index.css:115-134` currently `@import`s `./tokens.css`, `./glass.css`, `./utilities.css` (among others). After the carve those three files BECOME thin `@import` roots — `index.css` keeps importing them at the SAME position (lines 115, 118, 130), so the consumer-facing import order is byte-unchanged. The cascade comment block (`index.css:38-114`) gets the partial-set note appended per file (the `dock.css` precedent at index.css:63-71). No new `index.css` import lines; the carved roots transparently fan out.

### O6 — Encode the `var-in-arbitrary` RULE (this wave authors it; W-LEG1 gates it)

Author the rule as a documented, machine-checkable predicate (the gate `proof:var-in-arbitrary-guard` is REGISTERED in W-LEG1; this wave produces the rule definition + the conversions so W-LEG1's gate is born-GREEN):

> A custom-property reference in a Tailwind-v4 class uses the **`<util>-(--x)` shorthand** when (a) it follows a known utility prefix (`bg-`, `h-`, `w-`, `border-`, `ml-`, `text-`, …) AND (b) it carries NO fallback. The **arbitrary-value `[var(--x)]` / `[var(--x, fallback)]` form is RESERVED for**: a fallback-bearing ref (`[var(--x, fb)]` — the shorthand cannot express the fallback), an arbitrary-PROPERTY (`[backdrop-filter:var(--x)]`, `[box-shadow:var(--x)]`), or a typed/modifier value (`[length:var(--x)]`, `[&>svg]:size-[var(--x)]`). No bare `<util>-[var(--x)]` (no fallback, has-a-shorthand) survives.

**W-CSS1 OWNS ALL the conversion edits (the write-scope authority).** Convert the ~54 class-1 cases to the shorthand (`bg-[var(--glass-bg-wash)]` → `bg-(--glass-bg-wash)`, `h-[var(--control-h-md)]` → `h-(--control-h-md)`, `size-[var(--ui-glyph)]` → `size-(--ui-glyph)`, etc.) at their call sites (`ui/alert/index.ts`, `ui/button/index.ts`, `ui/avatar/index.ts`, `ui/badge/index.ts`, `ui/tabs/{TabsIndicator,TabsList}.vue`, `ui/number-field/NumberFieldInput.vue`, `ui/tags-input/TagsInput.vue`, `ui/command/CommandInput.vue`, `custom/search/FuzzySearch.vue`, `custom/stacked-icons/StackedIconGroup.vue`, `custom/dock/GlassDock.vue:513`, …). The 5 fallback-bearing + the ~7 arbitrary-property/typed cases are UNTOUCHED (legitimate keep). The gate predicate: match `\b[a-z-]+-\[var\(--[a-z0-9-]+\)\]` (utility-prefix, no comma → no fallback) → RED; the arbitrary-property `[prop:var(...)]` and the comma-bearing fallback forms do NOT match.

> **Write-scope boundary with W-LEG1 (the overlap the seed flagged).** W-CSS1 owns BOTH the rule definition AND the ~54 conversion edits in `src/`. W-LEG1 owns ONLY the gate AUTHORING (`proof-var-in-arbitrary-guard.mjs` + its `package.json`/`gates.mjs` registration). The two do NOT both edit the call sites — W-CSS1 lands the conversions, so W-LEG1's gate is **born-GREEN against an already-clean tree** (W-LEG1's "converts the 5 D3 sites" framing is corrected to "verifies W-CSS1's conversions landed; converts any class-1 site W-CSS1 missed as a backstop only"). If W-CSS1 has not yet landed when W-LEG1 dispatches, W-LEG1 lands the gate RED-with-named-survivors (the fail-EXPLICIT shape) and W-CSS1's conversion turns it GREEN. NO double-edit on the same line.

---

## Edit-sites

| file | edit |
|---|---|
| `scripts/proof-no-god-module.mjs:47` | add `\|\| entry.name.endsWith(".css")` to the collector filter; add import-order-preservation + single-layer-isomorphism assertions for the carved monoliths (the `read-dock-css.mjs` ordered-partial-list pattern) |
| `scripts/read-css-monoliths.mjs` | NEW — the per-monolith ordered partial-list authority (the `read-dock-css.mjs` model): `TOKENS_PARTIAL_ORDER`, `GLASS_PARTIAL_ORDER`, `UTILITIES_PARTIAL_ORDER`; the import-order assertion reads these |
| `src/styles/tokens.css` | becomes a thin `@import` root over `tokens/*` (7 partials) |
| `src/styles/tokens/{scheme-motion,color-radius,shadow-glass,scale-paper,light-dark,dark-arm,property-regs}.css` | NEW carve partials (cascade order) |
| `src/styles/glass.css` | becomes a thin `@import` root over `glass/*` |
| `src/styles/glass/{ladder,atoms,a11y-fallback}.css` | NEW carve partials |
| `src/styles/utilities.css` | becomes a thin `@import` root over `utilities/*` |
| `src/styles/utilities/{animate-layer,btn,a11y-overrides}.css` | NEW carve partials |
| `src/styles/index.css:38-134` | append per-file partial-set notes to the cascade comment; the `@import` lines for `./tokens.css`/`./glass.css`/`./utilities.css` stay at their position |
| ~16 call-site files (`ui/{tabs,alert,button,avatar,badge,number-field,tags-input,command,…}`, `custom/{search,stacked-icons,dock}`) | convert the ~54 class-1 bare `<util>-[var(--x)]` → `<util>-(--x)` (W-CSS1 OWNS these edits; W-LEG1 only gates the result — see O6 write-scope boundary) |
| `scripts/gates.mjs:384-389` | the `proof:no-god-module` registration tag goes `["local"]` → `["local","ci"]` (the F2 CI-promotion the gate's own note promised at AV W6) |
| `.github/workflows/ci.yml` | RE-EMITTED via `npm run gates:emit-ci` (the byte-match the `proof:gen-ci-fresh` gate enforces — a hand-edit fails closed; regenerate, don't hand-add) |

---

## Hard gate (evidence-backed)

The wave closes when ALL FOUR hold, each backed by a named artefact:

1. **The `.css`-aware gate is CI-tagged + GREEN with import-order asserted.** `scripts/gates.mjs` carries `proof:no-god-module` with `tags: ["local","ci"]`; `npm run proof:no-god-module` exits 0 with the artefact (`.cache/gates/AV-no-god-module.json` — the `gate-output.mjs` writer's `.cache/gates/<cacheName>.json` path) reporting `status: "pass"` over a corpus that NOW includes `.css` (`facts.scanned` count rises by the full `src/styles/**` `.css` tree; no `src/styles/*.css` appears in `violations`); the artefact's `facts` includes the per-monolith `importOrderPreserved: true` assertion. `npm run gates:verify-ci` reports `ci.yml matches the manifest ci set` AND `proof:gen-ci-fresh` is GREEN (the re-emitted `ci.yml` is byte-identical to `gates.mjs --emit-ci` and CONTAINS a `proof:no-god-module` step). **Artefact: the gate JSON (`status:pass`, `.css` in scope, import-order flag) + the `verify-ci`/`gen-ci-fresh` pass output.**

2. **The `/styles` bundle is byte-equivalent — a COMPILED CSS-output diff is empty.** Capture the baseline FIRST (pre-carve): compile the `@import`-expanded `src/styles/index.css` through the repo's PostCSS+Tailwind pipeline (the same `@tailwindcss/postcss` `vite.style-assets.ts` uses) to a normalized CSS string `before.css`. After the carve, recompile to `after.css`. `diff before.css after.css` is EMPTY. The check is a NEW gate script `scripts/proof-css-carve-equiv.mjs` (or folded into the `.css` arm of `proof:no-god-module`) that compiles the expanded cascade and snapshots a content hash; the carve PR shows the hash unchanged. The raw `@import` resolution is order-preserving by construction (the carved roots `@import` in the recorded cascade order), and the compiled output proves it. **Artefact: an empty `diff before.css after.css` (the cardinal DELTA — a captured before/after of the COMPILED bundle, not a grep claim that the carve "looks equivalent").**

3. **Every carved monolith partial is < 500 lines AND in cascade order.** `proof:no-god-module` (now `.css`-aware) reports no `src/styles/**` `.css` over 500; `scripts/read-css-monoliths.mjs`'s ordered partial-lists match the `@import` order in each thin root (`TOKENS_PARTIAL_ORDER` ↔ `tokens.css`'s `@import` sequence, etc.); a reordered `@import` or a leaked-layer rule → RED. **Artefact: the gate JSON `facts.partials` list (every partial `exists:true`, `lines < 500`, `imported:true`) per monolith.**

4. **The `var-in-arbitrary` rule is encoded + the ~54 conversions land.** Zero class-1 bare `<util>-[var(--x)]` (utility-prefix, no fallback, has-a-shorthand) survives in `src/ *.ts`/`*.vue`: `grep -rPn '\b[a-z-]+-\[var\(--[a-z0-9-]+\)\]' --include='*.ts' --include='*.vue' src/` (excluding the comma-bearing fallback form) returns 0 (born ~54 at HEAD); the 5 fallback-bearing `[var(--x, fb)]` + every arbitrary-property `[prop:var(--x)]`/typed `[length:var(--x)]` case is UNTOUCHED (preserved count — the 5 + ~7 keeps survive verbatim). The rule is documented (in CLAUDE.md conventions or the W-CSS1 wave doc) and the predicate is handed to W-LEG1 so `proof:var-in-arbitrary-guard` is born-GREEN. `npm run typecheck` + `npm run build` GREEN (the shorthand conversions compile + the dist CSS still carries every utility — verified by gate 2's empty diff: the `(--x)` shorthand and `[var(--x)]` arbitrary form compile to the SAME declaration, so the conversions are IN gate 2's empty diff). **Artefact: the grep returning 0 class-1 survivors + the preserved fallback/arbitrary-property count + the empty compiled-diff from gate 2.**

**Negative control (no consumer behavior delta):** the carve is a pure structural re-`@import` + a syntax normalization that compiles identically. Gate 2's empty compiled-diff IS the no-delta proof — no `.glass-*` rung, no `@utility`, no token resolves differently. No π live-readback is required for this wave (the carve emits byte-identical CSS; the visual surface is provably unchanged by the empty diff — but W-GLASS / the convergence π audit will ratify the painted surface as a downstream witness).

---

## Completion criterion

Gates 1–4 all verify against their named artefacts: the `.css`-aware `proof:no-god-module` is CI-tagged + green with import-order + single-layer assertions; `verify-ci`/`gen-ci-fresh` confirm `ci.yml` carries the promoted step; the compiled `/styles` before/after diff is EMPTY (the cardinal DELTA); every `tokens/`·`glass/`·`utilities/` partial is < 500 in cascade order; the class-1 `var-in-arbitrary` survivors are 0 with the fallback/arbitrary-property keeps intact; `typecheck` + `build` green.

---

## Precept honor

- **Gestalt + no-workaround.** The carve is cohesion-aware §-section splits in cascade order (the `dock.css` precedent), NOT a naive 500-line chop — the root structural fix, not a line-budget dodge.
- **Root-not-consumer.** The gate collector + the monolith carve are in `src/styles/` + `scripts/`; consumers see a byte-identical compiled `/styles` (gate 2).
- **The cardinal DELTA.** Gate 2 is a captured before/after of the COMPILED bundle (empty diff), not a "looks equivalent" grep claim.
- **≥2-consumer / no-overfit.** No new substrate ships; the carve only re-homes existing rules. `read-css-monoliths.mjs` is the multi-monolith authority (3 consumers: tokens/glass/utilities arms), mirroring `read-dock-css.mjs`.
- **Greenfield-no-meta.** The carved partials carry COHESION headers (what the §-section IS), not migration archaeology; the partial-set notes in `index.css` describe the cascade, not "carved from the old monolith" version-history (the `dock.css` header is the model — it names what each partial DOES).
- **Clean break (no-backwards-compat).** `tokens.css`/`glass.css`/`utilities.css` become thin `@import` roots — no dual-path, no legacy alias; the old monolith content moves wholesale into partials.

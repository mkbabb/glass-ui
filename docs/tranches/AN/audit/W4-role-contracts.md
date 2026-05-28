# AN.W4 — Role contracts on StatusDot · SortableHandle · NumberField (+ SP-1 Toast.duration)

Closes F.W8.6-axe named-misses A/B/C and disposition-ledger gaps A/B/C. Folds in SP-1 (the muster-G `Toast.duration` typecheck gap).

## Method

The repo carries no `@axe-core` dependency and no Playwright config, so the axe smoke is run as a **DOM-reasoned** probe — the demo is served (`npm run dev`, Vite 8 at `:5173`) and the three story routes are driven via the Playwright MCP, reading the live DOM and computing the accessible name the same way axe's `label`/`aria-prohibited-attr` rules do (name on the focusable element itself, allowed-attr per role). DOM snippets + the per-site rule verdict are recorded below. Zero glass-ui dev deps were added.

## W4.A — StatusDot role contract (LANDED)

`src/components/custom/status-dot/StatusDot.vue` — Shape A2: the `<span>` root emits `:role="$attrs['aria-label'] != null ? 'img' : undefined"`. The component is a single-root `<script setup>` SFC with default attr fall-through, so a consumer's `:aria-label` reaches the root span natively; no explicit forward needed. `role="img"` is emitted ONLY when a label is bound — the pure-decorative case stays role-free (escape hatch preserved).

### DOM (route `/primitives/status-dot`)

Consumer-bound (`<StatusDot aria-label="Cary hue · active" />`):

```html
<span role="img" class="inline-flex items-center gap-1.5 align-middle"
      aria-label="Cary hue · active" data-probe="labelled"> … </span>
```

Decorative (`<StatusDot variant="error" />`):

```html
<span class="inline-flex items-center gap-1.5 align-middle" data-probe="decorative"> … </span>
```

| Probe | tag | role | aria-label | axe `aria-prohibited-attr` |
|---|---|---|---|---|
| labelled | SPAN | `img` | `Cary hue · active` | PASS (role allows the attr) |
| decorative | SPAN | _(none)_ | _(none)_ | PASS (no aria attr to prohibit) |

## W4.B — SortableHandle role contract (LANDED)

`src/components/custom/sortable-list/SortableHandle.vue` — when the default `as="span"` tag is used, the root emits `role="button"` + `tabindex="0"` (`interactive = computed(() => props.as === "span")`). When the consumer overrides `as` with a natively-interactive element (`as="button"`), neither is emitted — the host tag already carries the role + tab stop, so a forced `role="button"` would be redundant. The consumer's `:aria-label="'Reorder ' + name"` reaches the root via native single-root fall-through.

### DOM (route `/data/sortable-list`)

Default span grip (`<SortableHandle :aria-label="'Reorder Draft spec'">`):

```html
<span class="sortable-handle …" data-sortable-handle role="button" tabindex="0"
      aria-label="Reorder Draft spec"> ⋮⋮ </span>
```

`as="button"` grip (`<SortableHandle as="button" :aria-label="'Drag …'">`):

```html
<button class="sortable-handle …" data-sortable-handle aria-label="Drag Pin keyboard affordance"> … </button>
```

| Grip | tag | role | tabindex | aria-label | axe `aria-prohibited-attr` |
|---|---|---|---|---|---|
| default span | SPAN | `button` | `0` | `Reorder Draft spec` | PASS |
| `as="button"` | BUTTON | _(native)_ | _(native)_ | `Drag Pin keyboard affordance` | PASS |

## W4.C — NumberField label binding — verdict **C2** (CONFIRM-LANDED, DOCUMENTED)

**The AM.W0.2 chain is sound; no glass-ui code change needed.** `NumberFieldInput.vue` carries `inheritAttrs:false` + `v-bind="$attrs"` (further hardened beyond the AM doc's cherry-picked aria forward to a full `$attrs` spread), which lands every consumer attr on the inner reka `<input>`. All three accessible-name channels resolve the name on the focusable `<input role="spinbutton">`:

### DOM (route `/primitives/number-field`)

| Channel | binding | input role | resolved acc-name | source | axe `label` |
|---|---|---|---|---|---|
| 1 | `<Label for>` → `<NumberFieldInput id>` | `spinbutton` | `Servings` | `label[for]` | PASS |
| 2 | `<NumberFieldInput aria-labelledby="…">` | `spinbutton` | `Portions` | `aria-labelledby` | PASS |
| 3 | `<NumberFieldInput aria-label="…">` | `spinbutton` | `Helpings` | `aria-label` | PASS |

Side finding: in the installed reka-ui version, `<NumberField id="nf-qty">` forwards the `id` onto the inner `<input>` (the existing demo's `<Label for="nf-qty">` resolves to the input, tag `INPUT`, role `spinbutton`). So `id`-on-the-root also works — but the **safe canonical channel is binding on `<NumberFieldInput>`** (channels 1-3 above), which is version-independent.

### Why F.W8.6 still saw `label` residue — consumer-authoring gap

muster's SignalsLayer wraps the field in `<div role="group" aria-label="Rating weight value">`. axe's `label` rule fires on the `<input>` regardless of a wrapper's `aria-label` — a `role="group"`/`aria-label` container does NOT propagate the name to the inner input. The redress is a consumer-side binding change (name the `<NumberFieldInput>` directly via one of the three channels), not a glass-ui code fix. Documented as the binding contract below (proposed for CLAUDE.md §Component architecture — orchestrator applies; W4 does not edit CLAUDE.md due to concurrent agents).

## SP-1 (folded-in) — Toast.duration (LANDED)

`src/components/ui/toast/use-toast.ts` — added `duration?: number` to the `Toast` interface (with doc comment: forwarded to reka `ToastRoot`; omit to inherit `ToastProvider` default; `Number.POSITIVE_INFINITY` keeps it open). `ToasterToast = Toast & {…}` inherits it; `ToastOptions = Omit<ToasterToast,'id'>` so `toast({ title, duration: 6000 })` now typechecks.

No change needed in `Toaster.vue` / `Toast.vue`: the forward chain already carries `duration` — `Toaster.vue` spreads `v-bind="toast"` onto `<Toast>`, whose props extend reka `ToastRootProps` (which declares `duration`), and `<Toast>` forwards via `v-bind="delegatedProps"` onto `<ToastRoot>`. reka's `ToastRootImpl` consumes `props.duration` (`node_modules/reka-ui/dist/Toast/ToastRootImpl.js:28,60` — `duration: { … }` prop + `computed(() => typeof props.duration === "number" ? props.duration : providerContext.duration.value)`). The data shape was the only missing seam. Additive; no break.

Type probe: `toast({ title: "Saved", description: "ok", duration: 6000 })` compiles clean (full `vue-tsc --noEmit` exit 0; the standalone probe surfaced only TS5112 config-flag noise, no `duration` type error).

## Gate evidence

```
$ npm run typecheck   # vue-tsc --noEmit
EXIT:0
```

`npm run build` NOT run here — the ~6.7 GB type-graph walk is run once by the orchestrator at W7 to avoid concurrent-build thrash (per dispatch).

Axe smoke (DOM-reasoned, via Vite dev + Playwright MCP): **zero `aria-prohibited-attr`** at the StatusDot + SortableHandle sites; **zero `label` violations** at the three NumberField sites. No render errors in the dev-server log across the three routes.

## Proposed CLAUDE.md §Component architecture paragraph (orchestrator applies)

> **NumberField label-binding contract.** axe's `label` rule fires on the inner `<input role="spinbutton">`, not on the NumberField group wrapper. Bind the accessible name on `<NumberFieldInput>` via one of three channels — `aria-label`, `aria-labelledby`, or a sibling `<Label for>` → `<NumberFieldInput id>` — each of which `NumberFieldInput.vue` (`inheritAttrs:false` + `v-bind="$attrs"`) lands on the focusable input. A `role="group"` wrapper carrying an `aria-label` does NOT propagate the name to the input; name the field itself for axe `label` compliance.

## Files

- `src/components/custom/status-dot/StatusDot.vue` — `:role="img"` when `aria-label` bound (W4.A; WRITE)
- `src/components/custom/sortable-list/SortableHandle.vue` — `role="button"` + `tabindex="0"` on default span grip (W4.B; WRITE)
- `src/components/ui/number-field/{NumberField,NumberFieldInput}.vue` — READ-ONLY; chain confirmed sound (W4.C verdict C2; no edit)
- `src/components/ui/toast/use-toast.ts` — `duration?: number` on `Toast` (SP-1; WRITE)
- `demo/stories/primitives/status-dot.vue` — aria-label probe section (WRITE)
- `demo/stories/data/sortable-list.vue` — `:aria-label` on default span grip (WRITE)
- `demo/stories/primitives/number-field.vue` — three label-channel probe sections (WRITE)
- `docs/tranches/AN/audit/W4-role-contracts.md` — this file (CREATE)

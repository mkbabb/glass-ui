# W-L.2 · the type surface: every binding a consumer writes is either typed and delivered, or rejected · 11.0.0

| field | value |
|---|---|
| seat | band-L wave-spec seat, formation |
| model | `claude-opus-5-5`, asserted from own system identity |
| HEAD | `78922b26` in a scratch worktree; `src` identical to v10.1.0. `dist/` built there. The consumer fixture (appendix A) type-checks against the built package; the runtime witnesses ran under `vitest` (happy-dom) and one in Chromium (appendix B) |
| ships in | 11.0.0 |
| families | F-70 whole (`audit/REGISTRY.md:1478-1509`): L15a-F6, L13-12, R2-02-17, R2-03-02, R2-05-F4, R2-05-F5, R2-07-02, R3-01-01, R4-01-18, R5-02-04, R5-02-05, R6-02-06, R8-02-05. Inbound O-57 R-1; O-56 G-2's consumer half (N-8b); O-72 (W-B.2 §3.6 routes it here) |
| depends on | PLAN §5, the one record of edges |
| dependants | PLAN §5 (its inverse) |
| roster | G-08 STRICT-CONSUMER and G-39 REKA-EMIT-WITNESS turn `bound` here (`waves/W-A.2.md:142,173`) |

## 1 · What it closes

| id | defect |
|---|---|
| L15a-F6, O-57 R-1, L13-12 | components with a native root do not type their attribute and listener surface: a consumer on `strictTemplates` gets an error for every `aria-*`, `onClick` and `title` it writes (value.js counted 290 at 7.0.0) |
| R2-05-F5 | the library cannot turn on `checkUnknownEvents`: native root listeners are untyped |
| R2-07-02 | the published Chip declaration is `DefineSetupFnComponent<Record<string, any>, …>`, so no Chip binding is checked |
| R2-05-F4 | 18 of 37 forwarded reka emit channels have no runtime witness |
| R3-01-01 | Carousel `v-model:active` is read once; a model write never moves the deck |
| R4-01-18, O-72 | the Tooltip emits `data-state="delayed-open"` or `"instant-open"`; the reveal recipe keys only `open` and `closed`, so the hint appears in one frame |
| R5-02-04 | CommandDialog emits `update:open` twice per Escape and per pick |
| R5-02-05 | seven overlay roots drop consumer attributes with no warning; Toaster's comment says they land on the region |
| R6-02-06 | `form` and `name` land on elements with no form association (SegmentedTabs, ToggleGroup, a Checkbox or Slider outside its form), silently |
| R6-02-05 (declaration half) | NumberField declares `update:modelValue: [value: number]` and emits `undefined` on clear |
| R2-02-17, R8-02-05, L05b-11 | struck dock props (`start-collapsed`, `always-expanded`, …) land on the GlassDock root as attributes; the dock README's own example mounts a collapsed dock |
| R2-03-02, N-8b (consumer half) | value.js bound Button's removed `variant` |
| UIA-V-214, UIA-V-165 (F-70 mechanism rows) | the same stale `variant` binding, seen as dead variants: G-L2-1's fixture rejects it |
| UIA-V-149 (F-70 mechanism row) | EasingPicker's preset reads "Pick a curve" for an interval that is a named preset: `usePicker.ts:242` sets `CUSTOM_PRESET` for any seed with points, without matching the seed against `bezierPresets` |

## 2 · The defect at HEAD

All readings below were taken at `78922b26`.

**The consumer fixture** (appendix A: `vue-tsc --noEmit`, `strictTemplates: true`, `@mkbabb/glass-ui` resolved to the built package). Exit 2, six errors:

```
(10,30) TS2353 'aria-label' does not exist in type '{ readonly emphasis?: … }'        ← Button, legal
(10,71) TS2353 'onClick' does not exist in type 'NonNullable<{ readonly emphasis?: …'  ← Button, legal
(11,10) TS2353 'aria-describedby' does not exist in type '{ readonly class?: … }'      ← Input, legal
(11,43) TS2353 'onFocus' does not exist in type …                                     ← Input, legal
(14,3)  TS2578 Unused '@ts-expect-error' directive.   ← <Chip :not-a-prop="1"> is accepted
(16,3)  TS2578 Unused '@ts-expect-error' directive.   ← a number-only handler on NumberField is accepted
```

The fixture's `<Button variant="outline">` line carries `@vue-expect-error` and is rejected at HEAD (`checkUnknownProps`, `tsconfig.json:21-23`), so the struck-prop arm already holds; it stays in the fixture as a hold line.

**`checkUnknownEvents`.** `tsconfig.json` with `vueCompilerOptions.checkUnknownEvents: true` added, `vue-tsc --noEmit`: exit 2, **110** `TS2353` (27 in `src`, 83 in `demo`); by listener `onClick` 85, `onKeydown` 5, `onPointerenter` 3, `onPointerleave` 3, `onPointerdown` 3, `onPointerup` 2, `onPointercancel` 2, `onKeyup` 2, others 5. In `src`: `dock/DockControl.vue` 9, `button/Button.vue` 9, `easing/EasingPicker.vue` 3, `carousel/CarouselPager.vue` 2, `toast/Toaster.vue:111` 1, `sheet/SheetContent.vue:311` 1, `dock/DockBackgroundToggle.vue` 1, `data-table/DataTable.vue` 1. R2-05-F5 counted 109.

**The erased declaration.** `grep -rn "DefineSetupFnComponent<Record<string, any>" dist/components` → one line, `dist/components/chip/Chip.vue.d.ts:11`.

**Runtime witnesses** (appendix B):

| witness | reading at HEAD |
|---|---|
| W1 the Tooltip's emitted `data-state` is a value `styles/glass/reveal.css` keys on | **fail**: emitted `instant-open`; the recipe keys `{open, closed}`; `grep -c "delayed-open\|instant-open" -r src` → 0 |
| W2 `<Toaster aria-label="Status updates">` lands on the region | **fail**: the region reads `aria-label="Notifications (F8)"` |
| W3 `<SegmentedTabs name="mode">` in a form submits `mode=b` | **fail**: `FormData` entries `[]` |
| W4 Carousel `v-model:active` written to 3 moves the deck | **fail**: deck index 0 |
| W5 CommandDialog, Chromium: one `update:open` per Escape (first open, reopen) and per keyboard pick | **fail**: `{"esc1":["open=false","open=false"],"esc2":["open=false","open=false"],"kbdPick":["open=false","open=false"]}` |

W5 was first run under happy-dom and passed (one emit each path): the double emit needs reka's nested dismissable layers in a real engine. The gate runs in Chromium.

**Source.** `command/CommandDialog.vue:67` and `:99` both forward `update:open`. `CommandDialog.vue:8`, `select/Select.vue:26`, `menu/DropdownMenu.vue:50`, `tooltip/Tooltip.vue:18` set `inheritAttrs: false` with no `$attrs` rebinding. `toast/Toaster.vue:141-142` says the attributes fall through to the region; they do not. `carousel/useCarousel.ts:35-45` seeds `useDeck` with `initial: active.value` and writes the model outbound only. `number-field/NumberField.vue:29-31` declares `[value: number]`.

**Consumer bindings now.** Read-only greps of the consumer trees at seat time: `<Button … variant=` on one line: value.js 0, keyframes.js 0, fourier 1 (a comment, `GalleryCard.vue:332`), others 0; the struck dock props appear only in comments (value.js `Dock.vue:254`, keyframes `ChromeDock.vue:370,387`, fourier `CanvasControlsDock.vue:146`, atlas `Dock.vue:41,210`, speedtest `SurveyResultDock.vue:258`). The value.js `variant` bindings R2-03-02 counted are gone at value.js HEAD, so N-8b's consumer half is closed consumer-side; this wave keeps the fixture line that rejects it. The grep is single-line and is a floor; the landing packets (W-L.7) read the template AST.

## 3 · The cure

1. **Typed native fallthrough.** Every exported component whose root is a native element (or forwards to one) declares its attribute surface in `defineProps` with Vue's attribute-only intersection: `defineProps<ButtonProps & /* @vue-ignore */ ButtonHTMLAttributes>()` (the element's interface from `vue`'s `runtime-dom` types). The `@vue-ignore` intersection types the attributes and listeners for the consumer without declaring runtime props, so they still fall through. It is already used in three components; this makes it the rule for every native root.
2. **Renderless roots reject attributes.** The reka roots that render no element (`Dialog`, `Popover`, `Select`, `DropdownMenu`, `Tooltip`, `Collapsible` roots) declare no HTML attributes, so a consumer attribute on them is a `strictTemplates` error. In development each also warns on a non-empty `$attrs` (`process.env.NODE_ENV !== "production"`, W-L.3's guard form).
3. **Attributes land on the element that carries the role.** `CommandDialog` binds `$attrs` onto `DialogContent`; `Toaster` onto `ToastViewport` (the consumer's `aria-label` replaces reka's "Notifications (F8)"). Each is typed as that element's attributes.
4. **`checkUnknownEvents: true`** in `tsconfig.json`. The 27 `src` diagnostics are cured by rule 1 (the inner components' listener surfaces become typed); the 83 `demo` diagnostics follow from the same types.
5. **The Chip declaration.** `Chip.vue` drops the explicit `Readonly<ChipProps>` annotation over `withDefaults(defineProps<ChipProps>())` that erases the emitted type (`ae17992c`). A declaration gate in `tests/public-surface.spec.ts` fails on any `dist/**/*.vue.d.ts` matching `DefineSetupFnComponent<Record<string, any>`.
6. **A runtime witness per forwarded reka channel.** `scripts/gen-reka-witness.mjs` walks `src/components/**/*.vue`, finds every template listener on a reka component that calls `emit(...)`, and writes `tests/components/_witness/reka-channels.test.ts`: per channel, mount the glass component, trigger the reka event through its public interaction (key, pointer or model write), and assert the consumer receives exactly one emit with the payload. The test fails when the generated list and the committed file differ, so a new forward without a witness fails.
7. **One `update:open` per close.** `CommandDialog` forwards only the Dialog's `update:open`. The inner `Command`'s dismissal request (its nested layer's Escape) routes to the Dialog's close through the controlled `open` it already receives (`CommandDialog.vue:59-62`), not to a second consumer emit.
8. **The state vocabulary.** The reveal recipe keys `.glass-reveal:is([data-state="open"], [data-state="delayed-open"], [data-state="instant-open"])` for the enter state (`styles/glass/reveal.css:136-160`). W1 generalises: for each overlay content part, the witness asserts every `data-state` value reka can emit for it appears in a recipe selector.
9. **The Carousel's inbound half.** `useProvideCarousel` watches `active` and calls `deck.go(to)` when `to !== deck.index`, which scrolls through `useDeckSnap.scrollTo`; the outbound `onChange` write stays. Born-RED W4 plus a Chromium arm: PagerDots bound to the same model, click dot 3, `scrollLeft` = 3 × pitch within 1 s.
10. **`form` and `name` land or are rejected.** W-K.8 builds the participation proxy (`waves/W-K.8.md`); this wave types `name` and `form` on each control that submits (Checkbox, Switch, RadioGroup, Slider, Select, SegmentedTabs, ToggleGroup, NumberField) and asserts delivery: W3's form submits `mode=b`; a Checkbox and a Slider with `form="fc"` outside `#fc` submit into `#fc`. A control that does not submit declares neither, so `name=` on it is a type error.
11. **NumberField** declares `"update:modelValue": [value: number | undefined]`.
12. **The consumer fixture.** `tests/consumer/strict/` (a `tsconfig.json` with `strictTemplates`, `checkUnknownProps` and `checkUnknownEvents`, and `.vue` files) type-checks against the built package: legal native attributes and listeners on every native-root component; `@vue-expect-error` lines for a struck prop (Button `variant`), an unknown prop on each component (Chip first), an attribute on a renderless root, a number-only NumberField handler, and the dock README's first example after W-C.3 regenerates it (R8-02-05: a struck `start-collapsed` must fail). `npm run check:consumer` runs it; `ci.yml` runs it after `build`; W-L.3's matrix runs it against the installed tarball.

**The seeded preset (UIA-V-149).** `usePicker` resolves a seed's points against `bezierPresets` and seeds `preset` with the matching name; `CUSTOM_PRESET` only when none matches. `tests/components/easing/usePicker.test.ts` gains the case (a seed equal to `ease-in-out`'s points reads `ease-in-out`).

## 4 · Files it touches

- New: `tests/consumer/strict/` (tsconfig and fixtures), `scripts/gen-reka-witness.mjs`, `tests/components/_witness/reka-channels.test.ts`, `tests/components/_witness/state-vocabulary.test.ts`, `tests-visual/command-dialog-emits.spec.ts`.
- Edited: every native-root component's `defineProps` (the census is the output of rule 1's sweep: `rg -l "defineProps<" src/components` × a native root in the template); `CommandDialog.vue`, `Toaster.vue`, `Select.vue`, `DropdownMenu.vue`, `Tooltip.vue`, `Dialog.vue`, `Popover.vue`; `Chip.vue`; `NumberField.vue`; `carousel/useCarousel.ts`; `styles/glass/reveal.css`; `tsconfig.json`; `tests/public-surface.spec.ts`; `package.json` (`check:consumer`); `.github/workflows/ci.yml`; `tests/gates/roster.json` (G-08, G-39 `bound`); `MIGRATION.md`.

## 5 · Acceptance gates

| id | gate | passes when | HEAD reading (ran here) |
|---|---|---|---|
| G-L2-1 · the consumer fixture | `npm run build && npm run check:consumer` (appendix A is its first file) | exit 0 | **exit 2**: 4 `TS2353` on legal attributes and listeners, 2 unused `@vue-expect-error` (Chip, NumberField) |
| G-L2-2 · `checkUnknownEvents` | `vue-tsc --noEmit` with the option on in `tsconfig.json` | exit 0 | **exit 2**: 110 diagnostics |
| G-L2-3 · no erased declaration | `! grep -rq "DefineSetupFnComponent<Record<string, any>" dist/components` | exit 0 | **exit 1**: `chip/Chip.vue.d.ts:11` |
| G-L2-4 · the state vocabulary | W1 | the emitted state is keyed | **fail**: `instant-open` against `{open, closed}` |
| G-L2-5 · attributes land | W2, plus `<CommandDialog data-probe="x">` puts `data-probe` on the element with `role="dialog"` | both | **fail**: W2 reads "Notifications (F8)" |
| G-L2-6 · `name` submits | W3, plus the `form=` arms of rule 10 | all | **fail**: `[]` |
| G-L2-7 · the carousel model moves the deck | W4, plus the Chromium PagerDots arm | both | **fail**: deck index 0 |
| G-L2-8 · one emit per close | W5 in Chromium (`tests-visual/command-dialog-emits.spec.ts`) | each path `["open=false"]` | **fail**: two emits on each of the three paths |
| G-L2-9 · every forwarded channel witnessed | `node scripts/gen-reka-witness.mjs --check && npx vitest run tests/components/_witness` | exit 0 | **fail**: the generator is absent; R2-05's sweep counts 18 of 37 channels unwitnessed |
| G-L2-10 · the witness list bites | delete one generated case from `reka-channels.test.ts`, run `gen-reka-witness.mjs --check` | exit 1 naming the channel | absent |
| G-L2-11 · a preset seed names its preset (static; UIA-V-149) | `! grep -q 'seedPoints ? CUSTOM_PRESET' src/components/easing/usePicker.ts` | exit 0 | **exit 1** (`:242`; fix-2) |

G-L2-1's struck-prop line holds at HEAD, so the fixture's RED comes from its four legal lines and two expect-errors; each of those can pass only when the matching cure lands.

## 6 · π and DELTA obligations

| surface | themes | engines | paired capture | π |
|---|---|---|---|---|
| the Tooltip entrance: frames 0, 2, 4 and 8 after open | light, dark | Chromium; Playwright WebKit labelled | before: the hint at opacity 1 on frame 0; after: the reveal ramp | opacity per frame from the probe; frame 0 < 0.5 after |
| the Carousel after a model write (PagerDots dot 3) | light | Chromium; WebKit labelled | before: strip at `scrollLeft` 0; after: the third member centred | `scrollLeft` and the centred member's index |

Captures under `.cache/evidence/W-L.2/`, sha256 in the wave record. Real-Safari cells UNMEASURED until OW-3. The type gates make no visual claim.

## 7 · MIGRATION rows (11.0.0)

| changed | what a consumer does |
|---|---|
| `NumberField` `update:modelValue` payload is `number \| undefined` | handle `undefined` (the cleared field) |
| `Chip` has a typed declaration | bindings Chip does not declare now fail `vue-tsc`; remove them |
| attributes on `Dialog`, `Popover`, `Select`, `DropdownMenu`, `Tooltip`, `Collapsible` roots are type errors (they never rendered) | move them to the content or trigger part |
| `CommandDialog` emits `update:open` once per close | a handler that toggled on each emit now sees one |
| `Toaster`'s attributes land on the viewport region | an `aria-label` on `Toaster` now names the region |
| `name` on a control that does not submit is a type error | remove it, or use a submitting control |

## 8 · Ledger rows

Closes F-70 (every member in §1), E-11's enforcement (`ledger/CENSUS.md:177`: typecheck of fallthrough and emits; the consumer fixture is the sweep E-11 asks for at each version bump), O-57 R-1, N-8b's consumer half (measured cured at value.js HEAD; the fixture keeps the rejection), O-72. Roster G-08 and G-39 bound. The F-70 mechanism rows: UIA-V-214 and UIA-V-165 close on G-L2-1, UIA-V-149 on G-L2-11. UIA-F-43 is W-K.11's (K11-G2). UIA-V-456 (a consumer token, `--skeleton-glass-bg`, the library never reads) is W-L.7's silent-binding section (G-L7-5). UIA-F-146 is RETIRE NOT-REPRODUCED: no floating primitive wraps its content in a `<Transition>` (`grep -rl '<Transition' src/components` lists only InfiniteScroll, Button and DotRing; fix-2, `183e021a`); re-trigger, a `<Transition>` over a fragment root in `src/components`.

## Appendix A · the consumer fixture as run at HEAD

`tests/_bandL/strict/tsconfig.json`: `target ES2022`, `moduleResolution bundler`, `strict`, `skipLibCheck`, `noEmit`, `types: []`, `vueCompilerOptions: { strictTemplates: true }`; `node_modules/@mkbabb/glass-ui` a link to the worktree (its `package.json` `exports` resolve to `dist/`).

```vue
<script setup lang="ts">
import { Button } from "@mkbabb/glass-ui/button";
import { Chip } from "@mkbabb/glass-ui/chip";
import { Input } from "@mkbabb/glass-ui/input";
import { NumberField, NumberFieldInput } from "@mkbabb/glass-ui/number-field";
function takesNumber(n: number) { void n; }
function f() {}
</script>
<template>
  <Button emphasis="primary" aria-label="Run" data-row="1" title="t" @click="f">Run</Button>
  <Input aria-describedby="h" data-x="1" @focus="f" />
  <!-- @vue-expect-error a struck prop -->
  <Button variant="outline">Old</Button>
  <!-- @vue-expect-error an unknown Chip prop -->
  <Chip :not-a-prop="1">c</Chip>
  <!-- @vue-expect-error a cleared NumberField emits undefined, so a number-only handler must not type-check -->
  <NumberField @update:model-value="(v) => takesNumber(v)"><NumberFieldInput /></NumberField>
</template>
```

## Appendix B · the runtime witnesses as run at HEAD

W1-W4, `vitest` (happy-dom, teleport stubbed):

```ts
// W1
mount(`<TooltipProvider :delay-duration="0"><Tooltip :open="true"><TooltipTrigger>t</TooltipTrigger><TooltipContent>hint</TooltipContent></Tooltip></TooltipProvider>`);
const state = document.querySelector("[data-slot=tooltip-content]").getAttribute("data-state");         // "instant-open"
const keyed = new Set([...readFileSync("src/styles/glass/reveal.css","utf8").matchAll(/data-state="([^"]+)"/g)].map(m => m[1])); // {open, closed}
expect(keyed.has(state)).toBe(true);
// W2
mount(Toaster, { attrs: { "aria-label": "Status updates" } });
expect(document.querySelector('[role="region"]').getAttribute("aria-label")).toBe("Status updates");  // "Notifications (F8)"
// W3
mount(`<form id="f"><SegmentedTabs v-model="v" :options="[{value:'a',label:'A'},{value:'b',label:'B'}]" name="mode" /></form>`); // v = "b"
expect(new FormData(document.getElementById("f")).get("mode")).toBe("b");                            // entries []
// W4 — a child calls useCarousel() and reads deck.index
active.value = 3; await nextTick();
expect(deckIndex()).toBe(3);                                                                            // 0
```

W5, Chromium, a consumer page with `<CommandDialog v-model="picked" v-model:open="open" @update:open="v => events.push('open=' + v)">` (the R5-02 harness's `CmdOnly.vue`): open via a button, press Escape; reopen, Escape; reopen, ArrowDown, Enter. Reading: `{"esc1":["open=false","open=false"],"esc2":["open=false","open=false"],"kbdPick":["open=false","open=false"],"errs":[]}`.

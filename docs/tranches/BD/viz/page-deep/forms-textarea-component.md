# forms/textarea — COMPONENT deep audit (Pass-E)

**Page:** `forms/textarea` · **Import:** `@mkbabb/glass-ui/forms`
**Components audited (real src):**
- `src/components/ui/textarea/Textarea.vue` (the SFC)
- shared recipe: `src/styles/glass/control-surfaces.css` (the `.input-pill` REST register + the `[data-autosize]` arm)
- shared axis: `src/components/ui/_shared/useControlSize.ts` (`ControlSize` / `controlSizeClass`)
- shared tokens: `src/styles/tokens/glass.css` (`--control-surface-*`), `on-glass-fg.css` / `dark-arm.css` (`--input-on-glass`), `--textarea-autosize-max`
- prefix build pass: `vite.style-assets.ts` (`-webkit-backdrop-filter` injection) + `proof:webkit-backdrop`

`Textarea.vue` is a thin shadcn wrapper: a native `<textarea>` + `useVModel` (passive) + `inheritAttrs:false`/`v-bind="$attrs"` passthrough. All design lives in the SHARED `.input-pill` CSS recipe. The textarea is the SAME register as Input/NumberField with two textarea-specific deltas: `rounded-field` (overrides the pill stadium → a finite multi-line corner, AW.W25) and the opt-in `autosize` → `field-sizing: content` arm. No procedural viz. It is the LARGEST single glass plate in the form band, so the composite/animation gaps below are the MOST visible here.

---

## 1 · ANIMATION — the headline gap (shared with the input register)

**The textarea has the LOWEST animation affordance of any interactive surface in the library** — the four-state contract is present in COLOR only; spring physics, entrance, and the specular/liquid registers the rest of the band ships are ABSENT.

- **What exists** (control-surfaces.css:58-63): a single bezier `transition` over `background-color / border-color / box-shadow / color / opacity` on `--duration-fast` `--ease-standard`. This is the EFFECTS leg only (motion-canon P1) — correct as far as it goes, but it is the WHOLE animation budget.
- **MISSING vs the band's own SOTA:**
  - **No spring physics / press register.** `useSpringPress` / `useLiquidPress` + `--*-press-t` (W-PRESS-UNIFY) are on Button + Card; the textarea has NO focus-engage transform. A focused field is a static color swap — it never reads "alive." (A text well never "presses," but a focus-bloom spring on the ring/scale is the affordance the band ships everywhere else.)
  - **No specular / catch-light.** `vSpecular` / `useSpecularTracking` (W-LIQUIDHOVER tier-root auto-arm) reach Button-glass + the four dock controls; the textarea does NOT compose `.glass-material` and has no `::before` pointer-following gleam. Worst-affected of the form family because it is the biggest plate — a large flat translucent slab over a live aurora reads as dead glass.
  - **No entrance.** No `@starting-style`, no `.glass-reveal`, no `vReveal`/`[data-reveal]` on mount — the field does not animate in. (Contrast: the sibling `ComboboxList.vue` PANEL correctly rides `.glass-reveal`.)
  - **No focus-ring spring.** The `:focus-visible` ring (control-surfaces.css:94-98) is an instant `box-shadow` bezier — no spring-clocked bloom.
- **Verdict:** the four-state contract is half-met (states differ; the TRANSITIONS between them are inert). Against the BD "HIGH animation affordance for EVERY component" bar this is the largest single component deficit on the page.

## 2 · PROCEDURAL VIZ
N/A — no aurora/blob/fourier. The COLORFUL-aurora-backdrop is a demo/page concern (the field floats over `<Aurora>` via the demo card), not a component capability. Component-side the textarea must READ as liquid glass over that field, which routes back to §1 + §6 (no specular, half-composite).

## 3 · PERFORMANCE — clean
- **Compositor-safe:** only `background-color / border-color / box-shadow / color / opacity` animate — all paint/composite, zero layout-thrash. `backdrop-filter` is static (never animated).
- **`field-sizing: content` autosize is the SOTA path** (control-surfaces.css:144-150): native CSS auto-grow, NO JS resize loop, NO ResizeObserver, NO scroll-height mirror. Grows between `3lh` and `--textarea-autosize-max` (12lh) then scrolls. Degrades to the fixed `min-block-size: 3lh` floor on non-supporting engines. No JS, no `@supports`, no polyfill. Best-in-class.
- **No offscreen-pause / rAF / canvas concern.** N/A.
- One nit: the `backdrop-filter` is a real quiet-tier blur — N textareas = N blurred wells over a busy aurora. Acceptable (8px quiet tier), cost scales with field count.

## 4 · SAFARI COMPATIBILITY — clean
- **`.input-pill backdrop-filter` (control-surfaces.css:49) ships UNPREFIXED in source — and that is CORRECT.** The build (`vite.style-assets.ts:497`, AY.W-A11Y-PERF O-2a) injects the `-webkit-backdrop-filter:` pair into `dist/styles/*.css` as a last pass; `proof:webkit-backdrop` (gates.mjs:1099, the `proof:material-core` clause too) enforces count-parity over shipped dist. **So the textarea well blur paints on Safari ≤17. No paint bug.**
- **`field-sizing: content` is Chromium-only (not Safari/Firefox yet)** — but degrades to the fixed `min-block-size: 3lh` floor + standard scroll. Graceful, not a break. The Textarea docstring documents it.
- **`min-block-size: 3lh` / `max-block-size: 12lh` use `lh` units** — Safari 16.4+ / all modern engines support `lh`; safe on the Safari bar.
- The `.ios input/select/textarea { font-size: max(1rem, 1em) }` auto-zoom guard (base-misc.css:46) is a consumer-`.ios`-gated opt-in, not the component's concern — correct boundary.

## 5 · IDIOMATIC / NO-LEGACY
- **Strong:** `inheritAttrs:false` + explicit `v-bind="{...$attrs, ...elementAttrs}"` passthrough is the right a11y contract (every native `<textarea>` attr — `aria-*`, `required`, `maxlength`, `name` — lands on the focusable element). `useControlSize` is a clean token-substitution axis (no recipe fork). `rounded-field` overriding the pill stadium is correctly documented (AW.W25). `--input-on-glass` / `--control-surface-*` are the correct shared-register seams.
- **No dead code, no dual-path, no workaround** in the SFC.
- **`.control-surface` hand-authors the `-webkit-backdrop-filter` source pair** (control-surfaces.css:82) against the build-owns-the-prefix discipline — a lone source pair (NOT `.input-pill`'s concern, but in the SAME file; a future Lightning-CSS dedup could re-bite it). Minor hygiene.
- **Architectural transposition opportunity:** the four control SFCs each re-spell the `cn('input-pill [--control-surface-bg:var(--input-on-glass)] rounded-field py-2', controlSizeClass(size), …)` class soup inline. A shared `useInputSurface(size, { multiline })` returning the resolved class (mirroring `controlSizeClass`) would single-source the recipe string — minor, optional. The textarea's `[--control-surface-bg:var(--input-on-glass)]` is identical to Input's — duplicated inline.

## 6 · THE GLASS SIX-LAYER COMPOSITE — only 3 of 6 present (worst-felt here)
The `.input-pill` paints: (1) backdrop blur+saturate ✓ · (2) surface tint (`--control-surface-bg` over `--input-on-glass`) ✓ · (5) drop shadow — ONLY as the focus/invalid `box-shadow` ring, NO resting elevation shadow ✗. **MISSING: (3) edge rim, (4) inner catch-light, (6) grain.** The pill carries a flat `1.5px solid border`, NOT the `--glass-material-rim` inset ring + per-rung `--glass-border-*`; no `::before` specular core; no grain `::after`. It is a **half-composite** — does not adhere to the DESIGN.md six-layer optical model. Because the textarea is the LARGEST plate, the flat-slab read is most conspicuous here (a 12lh well over a live aurora is a big dead rectangle). Same root as §1 (it is not a `.glass-material` surface).

---

## BD-tranche mapping (cite the wave)

| Finding | Action | BD wave |
|---|---|---|
| No specular/press/entrance; half four-state (§1) | **AUGMENT (new wave)** | `BD.W-FORMS-CARD-FOLD` is DEMO-ONLY (zero src paint) — does NOT cover this. Shared with `forms-inputs-component.md`'s ask: a NEW src wave `BD.W-CONTROL-LIQUID` arming the input/textarea register with the `vSpecular` tier-root gleam + a focus/press spring (`useSpringPress`/`--control-press-t`) + a `.glass-reveal`-class entrance, reusing shipped Button/dock primitives (no fork). Textarea is the highest-value target (biggest plate). |
| Six-layer composite 3/6 — no rim/catch-light/grain (§6) | **AUGMENT** | same `BD.W-CONTROL-LIQUID` — re-base `.input-pill` onto `.glass-material` rim+core+grain (or compose the rim group) so the well is a full composite. Coordinate with `BD.W-GLASS-LENS-CHROMA` (the rim/lens owner). |
| `.control-surface` hand-authored webkit source pair (§5) | **MODIFY** | fold into `BD.W-DESHADCN-CANON` or a hygiene clause — drop the source pair, let the build inject it; re-assert `proof:webkit-backdrop`. (Shared finding with the inputs audit — dedup, one fix.) |
| Inline `.input-pill […]` recipe-string duplication across 4 control SFCs (§5) | **PRUNE/MODIFY (optional)** | minor — a shared `useInputSurface(size,{multiline})` helper; book to `BD.W-DESHADCN-CANON` if that wave touches the control SFCs, else defer. Not load-bearing. |
| `field-sizing` autosize + `lh` bounds; Safari prefix build-injected | **KEEP (no action)** | already SOTA + gated. Record as a positive in the BD close — no wave needed. |
| Demo asks (own glassy card per sub-section, bigger main card, dock APIs, aurora bg, import-label, tighten copy) | **MODIFY (demo, zero src)** | the page/demo-shell concern — `BD.W-FORMS-CARD-FOLD` (card fold) + the page-header/import-label folds (`BD.W-PAGE-HEADER-FOLD`); NOT a Textarea component change. |

---

### Verdict (5 lines)
1. **§1 ANIMATION is the headline gap** — the textarea is COLOR-only four-state: no specular, no focus/press spring, no entrance; worst-felt because it is the band's biggest glass plate. → new `BD.W-CONTROL-LIQUID`.
2. **§6 six-layer composite is 3/6** (blur+tint+ring-only-shadow; missing rim/catch-light/grain) — the `.input-pill` is a flat slab, not `.glass-material`. → same `BD.W-CONTROL-LIQUID` + coordinate `BD.W-GLASS-LENS-CHROMA`.
3. **§3 PERFORMANCE + §4 SAFARI are CLEAN** — `field-sizing` autosize is native/no-JS/graceful-degrade; `backdrop-filter` Safari prefix is build-injected and `proof:webkit-backdrop`-gated. Keep.
4. **§5 IDIOMATIC** is strong (passthrough, `useControlSize`, shared registers, no dual-path); two minor hygiene items — the `.control-surface` source webkit pair (→ `BD.W-DESHADCN-CANON`) and the duplicated inline recipe string (optional helper).
5. **The user-asks (per-section glassy cards, bigger main card, dock APIs, aurora bg, import-label, copy) are DEMO/page-shell work** (`BD.W-FORMS-CARD-FOLD` + `BD.W-PAGE-HEADER-FOLD`, zero src) — distinct from the component fix; the component's binding deficit is animation + composite (`BD.W-CONTROL-LIQUID`).

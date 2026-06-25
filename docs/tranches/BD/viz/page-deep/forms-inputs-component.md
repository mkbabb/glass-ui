# forms/inputs — COMPONENT deep audit (Pass-E)

**Page:** `forms/inputs` · **Import:** `@mkbabb/glass-ui/forms`
**Components audited (real src):**
- `src/components/ui/input/Input.vue`
- `src/components/ui/textarea/Textarea.vue`
- `src/components/ui/number-field/NumberFieldInput.vue`
- `src/components/ui/combobox/ComboboxInput.vue`
- shared recipe: `src/styles/glass/control-surfaces.css` (the `.input-pill` / `.control-surface` REST register)
- shared axis: `src/components/ui/_shared/useControlSize.ts`
- shared tokens: `src/styles/tokens/glass.css` (`--control-surface-*`), `on-glass-fg.css` / `dark-arm.css` (`--input-on-glass`)

These are thin shadcn-wrapper SFCs (native `<input>`/`<textarea>` + reka `NumberFieldInput`/`ComboboxInput`); all the design lives in the shared `.input-pill` CSS recipe. No procedural viz here.

---

## 1 · ANIMATION — the headline gap

**The form controls have the LOWEST animation affordance of any interactive surface in the library.** The four-state contract is present in COLOR only; spring physics, entrance, and the specular/liquid registers the rest of the band ships are entirely ABSENT.

- **What exists (control-surfaces.css:58-63):** a single bezier `transition` over `background-color / border-color / box-shadow / color / opacity` on `--duration-fast` `--ease-standard`. This is the EFFECTS leg only (motion-canon P1) — correct as far as it goes.
- **What is MISSING vs the band's own SOTA:**
  - **No spring physics / press register.** `useSpringPress` / `useLiquidPress` (the W-PRESS-UNIFY interruptible coupled spring-press) and `--*-press-t` are wired onto Button + Card; the input controls have NO `:active`/focus-engage transform at all. A focused field is a static color swap — it never reads "alive."
  - **No specular / catch-light.** `vSpecular` / `useSpecularTracking` (the W-LIQUIDHOVER tier-root auto-arm) reach Button-glass + the four dock controls; the input pill does NOT compose `.glass-material` and has no `::before` pointer-following gleam. The control is a flat translucent slab, not a lit glass surface.
  - **No entrance.** No `@starting-style`, no `.glass-reveal`, no `vReveal`/`[data-reveal]` on mount. (Contrast: the sibling `ComboboxList.vue:24` dropdown PANEL correctly rides `.glass-reveal` — the input field that opens it does not animate in at all.)
  - **No focus-ring spring.** The `:focus-visible` ring (control-surfaces.css:94-98) is an instant `box-shadow` bezier — no spring-clocked bloom.
- **Verdict:** the four-state contract is half-met (states differ; the TRANSITIONS between them are inert). Against the BD "HIGH animation affordance for EVERY component" bar this is the largest single component deficit on the page.

## 2 · PROCEDURAL VIZ
N/A — no aurora/blob/fourier. The page's COLORFUL-aurora-backdrop requirement is a demo/page concern (the field floats over `<Aurora>` via the demo card), not a component capability. Component-side: the controls must read as LIQUID glass over that live field, which routes back to the §1 + §6 gaps (no specular, thin composite).

## 3 · PERFORMANCE
- **Compositor-safe:** the only animated props are `background-color`/`border-color`/`box-shadow`/`color`/`opacity` — all paint/composite, zero layout-thrash. `backdrop-filter` is static (not animated). CLEAN.
- **`field-sizing: content` autosize (Textarea, control-surfaces.css:144-150):** native CSS, no JS resize loop, no ResizeObserver — the SOTA path. Degrades to a fixed `min-block-size: 3lh` floor on non-supporting engines. CLEAN.
- **No offscreen-pause concern** (no rAF, no canvas). N/A.
- One nit: `.input-pill` paints a real `backdrop-filter` blur (`--control-surface-blur` = quiet-tier). Over a busy live aurora that is N blurred wells per form — acceptable (quiet tier, 8px), but worth noting the cost scales with field count.

## 4 · SAFARI COMPATIBILITY — clean (corrected mid-audit)
- **`.input-pill backdrop-filter` (control-surfaces.css:49) ships UNPREFIXED in source — and that is CORRECT.** The build (`vite.style-assets.ts publishStyleAssets()`, AY.W-A11Y-PERF O-2a) injects the `-webkit-backdrop-filter:` pair into `dist/styles/*.css` as a last pass; `proof:webkit-backdrop` enforces count-parity over the shipped dist. So Safari ≤17 paints the well blur. **No Safari paint bug.**
- **Minor inconsistency (not a bug):** `.control-surface` (control-surfaces.css:82) HAND-AUTHORS the `-webkit-backdrop-filter` pair in source, against the build-owns-the-prefix discipline the ladder header documents. It still works (the build is idempotent), but it is a lone source-pair that a future Lightning-CSS dedup could re-bite. Worth normalizing.
- `field-sizing` is Chromium-only (not Safari yet) but degrades to the fixed floor — graceful, not a break.

## 5 · IDIOMATIC / NO-LEGACY
- **Strong:** `inheritAttrs:false` + explicit `v-bind="$attrs"` passthrough is the right a11y contract (accessible-name attrs reach the focusable element). `useControlSize` is a clean token-substitution axis (no recipe fork). `--input-on-glass` / `--control-surface-*` are the correct shared-register seams (no per-control fork). The `:where(:user-invalid, .user-invalid-fallback, [aria-invalid])` validity group + `--invalid-ring` token are idiomatic and non-redundant.
- **Smell — the autocomplete `string` widen (Input.vue:48-50):** typed as bare `string` to dodge TS2590 union-budget overflow. Documented, defensible, but it drops the literal-union autocomplete safety. Acceptable keep, flagged.
- **No dead code, no dual-path, no workaround** in the components themselves.
- **Architectural transposition opportunity:** the four control SFCs each re-spell the `.input-pill [--control-surface-bg:…] rounded-field …` class soup inline. A shared `useInputSurface(size)` returning the resolved class (mirroring `controlSizeClass`) would single-source the recipe string — minor, optional.

## 6 · THE GLASS SIX-LAYER COMPOSITE — only 3 of 6 present
The `.input-pill` paints: (1) backdrop blur+saturate ✓ · (2) surface tint (`--control-surface-bg` over `--input-on-glass`) ✓ · (5) drop shadow — only as the focus/invalid `box-shadow` ring, NO resting elevation shadow ✗. **MISSING: (3) edge rim, (4) inner catch-light, (6) grain.** The pill carries a flat `1.5px solid border`, NOT the `--glass-material-rim` inset ring + per-rung `--glass-border-*`; it has no `::before` specular core and no grain `::after`. The control is a **half-composite** — it does not adhere to the DESIGN.md six-layer optical model the glass tiers ship. This is the same root as §1 (it is not a `.glass-material` surface).

---

## BD-tranche mapping (cite the wave)

| Finding | Action | BD wave |
|---|---|---|
| No specular/press/entrance on input controls; half four-state | **AUGMENT (new wave)** | `BD.W-FORMS-CARD-FOLD` is DEMO-ONLY (zero src paint) and does NOT cover this. Needs a NEW src wave — `BD.W-CONTROL-LIQUID` — arming the input register with the `vSpecular` tier-root gleam + a focus/press spring (`useSpringPress`/`--control-press-t`) + a `.glass-reveal`-class entrance, reusing the shipped Button/dock primitives (no fork). |
| Six-layer composite is 3/6 (no rim/catch-light/grain) | **AUGMENT** | same new `BD.W-CONTROL-LIQUID` — re-base `.input-pill` onto the `.glass-material` rim+core+grain layering (or compose the rim group) so the well is a full composite, not a flat slab. Coordinate with `BD.W-GLASS-LENS-CHROMA` (the rim/lens owner). |
| `.control-surface` hand-authored webkit pair (source inconsistency) | **MODIFY** | fold into `BD.W-DESHADCN-CANON` or a hygiene clause — drop the source webkit pair, let the build inject it; re-assert `proof:webkit-backdrop`. |
| Demo: each sub-section own glassy card / bigger main area / dock contextual-switch / over aurora / import-label / tighten copy | **MODIFY (demo)** | `BD.W-FORMS-CARD-FOLD` already folds the residual hand-rolled wrappers onto `<Card>`/`<ShowcaseFrame>`; EXTEND its scope (or a sibling page wave) for the bigger-main-area + dock-API contextual switching + aurora backdrop + the `@mkbabb/glass-ui/forms` import-label standardization. |
| autocomplete `string` widen; inline class-soup repetition | **PRUNE/keep** | low-priority; optional `useInputSurface` single-source. No wave needed unless a hygiene pass picks it up. |

---

## 5-LINE VERDICT
1. The forms controls are the LOWEST-affordance interactive surface in the library: the four-state contract is COLOR-only (a single bezier cross-fade) with NO spring physics, NO specular/liquid-hover, and NO entrance — the W-PRESS-UNIFY / W-LIQUIDHOVER registers wired onto Button + dock never reached the input pill.
2. The glass six-layer composite is only 3/6 — backdrop-blur + surface-tint are present, but the edge rim, inner catch-light, and grain are MISSING (the pill is a flat-bordered slab, not a `.glass-material` surface), so it cannot read as liquid glass over the page's aurora.
3. Performance is clean (compositor-only color transitions, native `field-sizing` autosize, no rAF/layout-thrash) and Safari is clean (the unprefixed `backdrop-filter` is build-injected with the webkit pair, `proof:webkit-backdrop`-enforced) — the only Safari nit is `.control-surface`'s lone hand-authored source pair.
4. The components are otherwise idiomatic — clean attr-passthrough a11y contract, token-substitution `useControlSize` axis, shared `--control-surface-*`/`--input-on-glass`/`--invalid-ring` seams, no dead code/dual-path/workaround.
5. ACTION: the demo-side `BD.W-FORMS-CARD-FOLD` does NOT touch the component; AUGMENT with a new src wave `BD.W-CONTROL-LIQUID` (specular + focus/press spring + entrance + the rim/core/grain composite, all reusing shipped primitives), MODIFY `BD.W-DESHADCN-CANON` for the `.control-surface` webkit-source hygiene, and EXTEND the demo fold for bigger-main-area/dock-contextual-switch/aurora/import-label.

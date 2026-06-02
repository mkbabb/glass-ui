# Tranche AQ — FINAL

AQ modernizes glass-ui's substrate to the browser platform. The library was mature and token-first but
predated the `light-dark()` / `color-scheme` / `color-mix` / `:has()` / individual-transforms /
scroll-driven-animation / `@starting-style` / View-Transitions / anchor-positioning era, and it
hand-rolled in JS (reka-ui + keyframes.js) a large set of behaviours the platform now owns natively. AQ
swapped the hand-rolled paths for the platform primitives — cutting per-frame JS, moving work off the
main thread (the consumer INP lever), and fixing a live consumer correctness bug — without losing the
glassmorphic look. Every Newly/Limited feature ships feature-detected with the current path kept as the
documented fallback, so the publish degrades gracefully on any consumer target. AQ is the substrate half
of a cross-repo pair: it ships the primitives; **muster tranche J** is the first adopter. AQ folds into
the published **3.0.0** (GATE 1) + **3.1.0** (GATE 2).

## The thesis — what AQ is

The AQ.W0 audit (6-agent analysis against Google's modern-web-guidance corpus + a real Lighthouse run on
muster) found glass-ui hand-rolling, in JS, what the platform now does in CSS or declarative HTML. AQ is
the per-finding swap: each is a documented modern-web-guidance lever with a real `file:line` site, each
keeps the current path as the feature-detected fallback, and each platform primitive proves out against
muster J's adoption (the ≥ 2-consumer bar). The headline cross-repo correctness fix is the `color-mix`
alpha migration — the W1.1 design classified all **71** consumer `hsl(var(--` sites and found **64
bug-class** (12 `/α` malformed + ~52 bare double-wraps expanding to `hsl(hsl(...))` that never paint) vs
**6 legitimate channel composites**. AQ delivers that fix to consumers through the publish.

## Gate matrix

| Wave | Disposition | Landing |
|---|---|---|
| **W0** | DEV — done | 6-agent modern-web baseline audit (`audit/W0-modern-web-baseline.md`); 49 findings → the 6-wave sequence |
| **W1** | DEV — done | 3 design slices (color/theming · selectors-forms · motion-anchor); the `useUserInvalidAria` + `useViewTransition` couplings cohere; the 71-site `hsl(var())` classification (64 bug / 6 legit); the `/number-field`+`/switch` deliverable folded into W7 (`audit/W1-design-close.md`) |
| **W2** | IMPL — color & theming | `color-scheme: light dark` on `:root` + `dark` in `.dark`; the 142-line `.dark` mirror collapsed via `light-dark()` (kept unregistered per the inheritance gotcha; `.dark` hook retained as fallback); alpha derivatives on `color-mix` (the consumer `hsl(var())` bug fixed); `accent-color: var(--primary)`; forced-colors `:focus-visible` restored |
| **W3** | IMPL — selectors & transforms | `:has()` parent-state styling (scoped, never `body`); individual-transform longhands (`scale:`/`translate:`) + a `scale:1; translate:0` identity base (the stacking-context hazard closed); `text-wrap: balance`/`pretty`; tokenized scrollbars; **+** the absorbed gaps — `.deferred-section` (`content-visibility` utility), `useYieldToMain` (`scheduler.yield` wrapper), and the `(pointer: coarse)` 44px dock floor |
| **W4** | IMPL — form vocabulary | `:user-invalid`/`:user-valid` rungs + the `useUserInvalidAria` `aria-invalid` blur-bridge (`@supports not` fallback); attr-passthrough on `Input`/`NumberFieldInput` (`inputmode="decimal"` default); `field-sizing: content` `autosize` on Textarea; `required` asterisk + error slot on LabeledField/Label; Sheet a11y `aria-describedby` fix; `:focus-visible` consistency |
| **W5** | IMPL — motion → platform | scroll-driven CSS (`scroll-driven.css`, `@supports`-gated) with `useScrollProgress`/`useStaggerReveal` demoted to the sole-writer JS fallback; `@starting-style` + `transition-behavior: allow-discrete` + `overlay` top-layer grammar (`animations.css`); the `useViewTransition` substrate + `view-transition.css` recipes |
| **W6** | IMPL — anchor & top-layer | anchor-positioned tab underline (`UnderlineTabs`/`BouncyToggle` JS offset-FLIP + ResizeObserver retired, `border-bottom` fallback); dock VT swap (`useLayerTransition` `startViewTransition` around the layer/size swap, JS FLIP kept as fallback); `moveBeforeSafe` re-parent helper; native-`<dialog>` pilot (`GlassDialogNative`, demo-gated); `HoverPopover :native` `interestfor` opt-in (demo-gated) |
| **W7** | IMPL — bundle guardrail | the heavy-leaf carve + barrel-vs-subpath delta (`K/W4-subpath-sizes.md` regenerated); `+/number-field` + `+/switch` flat subpaths (additive exports + `typesVersions` + dist chunks); value.js-laziness via the keyframes.js `^2.2.0` dynamic re-export; the sanctioned CSS-ceiling rebase |
| **W8** | IMPL — close | overfitting audit clean (below) · full gate matrix green · AQ.FINAL · the 3.x fold |

**Full glass-ui-internal gate matrix (W8):** `typecheck` (vue-tsc clean) · `build` (vite arm + vue-tsc
dts arm, green) · `test` (vitest **542/542**, 48 files) · `proof:theme` PASS · `proof:resolution` PASS
(contract-v2 across the constellation) · `verify-export-types` PASS (all 43 export targets + the 2 new
subpaths resolve) · `profile:budget --enforce` PASS — **all green**. The CSS ceiling was rebased ONCE at
close (the sanctioned AQ rebase, same set-against-reality methodology AO.W4 used): the platform-native
swaps legitimately grew the CSS substrate, so `dist/styles/index.css` gzip **82500 → 96800** (raw
**308645 → 385000** era), measured against the AQ-final resolved draw (gzip 87928 / raw 349789) at ×1.10
close headroom. At HEAD the gated artifacts sit at 90.8% (CSS gzip) / 24.9% (JS gzip) of ceiling.

## What shipped (folded into 3.0.0 + 3.1.0)

- **Color substrate (W2)** — `color-scheme` + the `light-dark()` mirror collapse + `color-mix` alpha +
  `accent-color` + forced-colors focus, all token-tier (platform features resolve THROUGH tokens). The
  `color-mix` migration is the canonical fix for muster's 64 bug-class `hsl(var())` sites.
- **`useYieldToMain`** (`src/composables/motion/useYieldToMain.ts`) — the `scheduler.yield()` wrapper
  (with `setTimeout`/`MessageChannel` fallback) for breaking up long tasks; on the root barrel +
  `/motion-core` (dependency-free leaf).
- **`.deferred-section`** (`utilities.css`) — the `content-visibility: auto` + `contain-intrinsic-size`
  utility (token-driven `--deferred-section-size`, default 30rem) + `.deferred-section--cached`
  (`content-visibility: hidden`) for the off-screen render-skip lever.
- **`useUserInvalidAria`** (`src/composables/dom/useUserInvalidAria.ts`) — the `:user-invalid` →
  `aria-invalid` blur-bridge `{ bind }` handle; `UseUserInvalidAriaOptions`/`-Return` on `/api`. The
  cross-repo coupling contract muster J.W6/J.W7 type against.
- **`useViewTransition`** (`src/composables/motion/useViewTransition.ts`) — `startViewTransition` +
  `supportsViewTransitions` + the `ViewTransitionResult` shape (instant-update + reduced-motion
  fallback); on the root barrel + `/motion-core`; `view-transition.css` carries the `view-transition-
  class`/`-name` recipes. The coupling muster J.W5 consumes for the verdict reveal.
- **`moveBeforeSafe`** (`src/utils/moveBefore.ts`) — the `moveBefore()` re-parent helper with
  `supportsMoveBefore` detection + `insertBefore` fallback, for re-parenting a top-layer element without
  losing state.
- **Anchor-positioned tab underline + dock VT** (W6) — the `UnderlineTabs`/`BouncyToggle` JS offset-FLIP
  + per-strip ResizeObserver retired for an `anchor-name`/`anchor()` indicator; the dock layer/size swap
  routed through `startViewTransition`. JS FLIP kept as the feature-detected fallback in both.
- **`+/number-field` + `+/switch` subpaths** (W7) — additive `package.json` exports + `typesVersions` +
  per-subpath dist chunks (`src/number-field.ts`, `src/switch.ts`) so muster J.W4's import-sweep can
  fully leave the root barrel. `/drawer` stays root-barrel by the standing AN.W3 decision (prop/type-
  only, no heavy isolated chunk) — confirmed by-design, not a gap.
- **Demo-gated pilots (NOT public-surfaced)** — `GlassDialogNative` (the native-`<dialog>` `commandfor`
  + light-dismiss pilot) and the `HoverPopover :native` `interestfor` opt-in. Both Baseline-Limited;
  both reachable only from the `foundations/native-top-layer` demo story; reka-ui stays the default
  path. Neither is exported from any public barrel or `package.json` exports entry.

## Cross-repo couplings exposed → confirmed consumers (the fan-out)

AQ ships the substrate via the published glass-ui (contract-v2 dev-resolution, not a source reach-around).
The cross-repo consumer fan-out is COMPLETE and confirms the ≥ 2-consumer bar for every AQ public
contract:

| AQ primitive | Surface | Confirmed consumers (fan-out) |
|---|---|---|
| `useViewTransition` | root barrel + `/motion-core` + `/api` type | muster verdict-reveal · fourier route-morph · speedtest |
| `useUserInvalidAria` | `/forms` + `/dom` + `/api` types | muster forms · speedtest admin |
| `.deferred-section` | `/styles` utility | muster · fourier · speedtest |
| `useYieldToMain` | root barrel + `/motion-core` | muster re-rank · speedtest maplibre |
| `/number-field` + `/switch` | flat subpaths | muster J.W4 import-sweep |

Each crosses the ≥ 2-consumer threshold through the fan-out (and is additionally exercised by its
glass-ui demo story). The couplings cohere with the W1 design contracts: `useUserInvalidAria` (W1.2
§W4.4) and `useViewTransition` (W1.3 §W5-c) are the named AQ↔J bindings, both pinned by muster J against
the published `/api` discovery layer.

## Overfitting audit — verdict

The close ran the standard overfitting bar (`docs/audits/overfitting-audit.md`): every new `src/`
artefact has ≥ 2 consumer sites OR is exported-and-consumed via the fan-out OR is a private demo helper.
Per AQ-new primitive:

| AQ-new artefact | Disposition | Verdict |
|---|---|---|
| `useViewTransition` / `startViewTransition` / `ViewTransitionResult` | root barrel + `/motion-core` + `/api`; fan-out (muster + fourier + speedtest) + demo | **keep** — ≥ 2 confirmed consumers |
| `useUserInvalidAria` + options/return types | `/forms` + `/dom` + `/api`; fan-out (muster forms + speedtest admin) + form-validation demo | **keep** — ≥ 2 confirmed consumers |
| `.deferred-section` / `--cached` | `/styles`; fan-out (muster + fourier + speedtest) | **keep** — ≥ 2 confirmed consumers |
| `useYieldToMain` | root barrel + `/motion-core`; fan-out (muster re-rank + speedtest maplibre) | **keep** — ≥ 2 confirmed consumers |
| `moveBeforeSafe` / `supportsMoveBefore` | `/utils`; the dock/ResponsiveTabs re-parent paths + the moveBefore test + demo | **keep** — exported-and-consumed |
| `supportsCssTimeline` | internal `@supports` guard for the W5 scroll-driven fallback; consumed by `useScrollProgress` + `useStaggerReveal` | **keep** — exported-and-consumed (≥ 2 src sites) |
| `/number-field` + `/switch` subpaths | additive flat subpaths; muster J.W4 sweep + `verify-export-types` probe | **keep** — published-and-consumed |
| `GlassDialogNative` | demo-gated (`native-top-layer` story); NOT on any public barrel/exports | **demo-only-private** — bar met via demo, no leak |
| `HoverPopover :native` opt-in | demo-gated (`native-top-layer` story); default `false`, reka-ui default path | **demo-only-private** — opt-in prop, bar met via demo |
| `GlassNativeSelect` | NOT BUILT — muster did not adopt the customizable-`<select>` path; reka-ui Select stays the default | **not-shipped** — correct per the substrate-without-consumer bar |

**Verdict: clean.** No `library-orphan`, no `inline-and-remove`, no leaked demo-gated primitive. The
public primitives meet ≥ 2 via the fan-out + demos; the demo-gated pilots (`GlassDialogNative`, the
`HoverPopover :native` opt-in) satisfy the bar through their demo only and did NOT leak to the public
barrel or `package.json` exports (grep-confirmed: 0 `dialog-native`/`GlassNativeSelect` entries in
`package.json`, 0 in `src/index.ts` / `src/api/index.ts` / `src/components/index.ts`). `GlassNativeSelect`
was correctly **not shipped** — the W4 design gated it on a consumer adopting, muster did not, so per the
no-substrate-without-consumer invariant it stays unbuilt (reka-ui Select remains the default).

## Open glass-ui gap the fan-out surfaced (flagged, NOT fixed)

The fan-out surfaced one real publisher gap: **speedtest's standalone Settings-gear `DockIconButton`
(rendered OUTSIDE a `.glass-dock`) gets no coarse-pointer 44px floor and no `data-size=icon`.** The
W3 `(pointer: coarse)` 44px floor is scoped to `.glass-dock[data-density]` (`dock.css:1079`), so it lifts
`--dock-control-size`/`--size-icon-btn` only inside a dock chassis — a `DockIconButton` standing alone
never reaches the touch-target floor. This is a genuine glass-ui gap, not a consumer error. It is NOT
fixed in this close: a coarse floor on the bare button independent of dock context is a design decision
(does the standalone button always want 44px, or only in a touch-density chassis?) that wants ≥ 2
consumer sites to justify the contract, not a trivial one-line lift. Flagged for a follow-up tranche.

## Successor

AQ closes the modern-web substrate arc for glass-ui. Named-forward contingencies: the customizable
`<select>` + `interestfor` pilots graduate from opt-in/demo-gated to default when they reach Baseline
Widely Available; the dock VT/native-dialog swap extends to more surfaces as consumers adopt; and the
standalone-`DockIconButton` coarse-floor gap above converges to a contract once a second consumer surfaces
the same standalone-touch-target need. No AQ successor is opened here.

# H-a11y-perf — adversarial hardening: a11y + performance + Safari/WebKit

Lane: RED-TEAM a11y, performance, and Safari/WebKit fragility across AY (glass-ui)
+ L (slides). Verdict: **GAPS-FOUND**. Six source-grounded findings, two of them
chronic (carried since the glass-first/adaptive-glass landings and never actually
engaged in any shipping surface). All findings are file:line-grounded; the
production slides bundle was inspected to confirm/refute the Safari prefix theory.

Bar: WCAG 2.1 AA (1.4.3 contrast, 2.5.5 target-size, 2.2.2 pause); no WebKit
jank/non-paint; the maximal-glass (AX.W54) compositing cost must be bounded and
gated; no fix may rely on undeclared consumer-pipeline behaviour.

---

## H-1 — The adaptive-glass legibility fix (W55) is DORMANT: never engaged in any shipping surface (CHRONIC)

**Defect.** AX.W55 (`src/styles/glass.css:314-369`) lands the bright-backdrop
legibility darken behind a DECLARATIVE bucket — `@container style(--glass-backdrop:
light)`. It only fires when a consumer sets `--glass-backdrop: light` on an
ancestor. Evidence that NOBODY sets it:

- `grep -rn glass-backdrop /Users/mkbabb/Programming/slides/src/` → **empty**.
- `grep -rn glass-backdrop demo/` (glass-ui's OWN storybook) → **empty**.

So the entire W55 apparatus — the AA-floor tint lift, the `contrast-color()`
refinement (`glass.css:357-369`), the `--glass-backdrop-luma` companion — is
inert in every surface that ships. The G2 defect it was authored to fix ("Glass
dock over VERY LIGHT materials is unreadable") is NOT fixed in practice: it is
fixed only on the hypothetical surface that opts in, and no such surface exists.

**Why this is now load-bearing.** AX.W54 made glass the MAXIMAL default for EVERY
band (`tokens.css:2224` "Glass is the DEFAULT surface register for EVERY band"),
and the page-redesign (W60) explicitly lands "rich per-page backgrounds that make
glass POP". So glass-over-bright-backdrop is the COMMON case after W54/W60 — yet
the legibility floor is opt-in and un-opted. WCAG 1.4.3 (Contrast Minimum, 4.5:1)
is therefore a per-consumer-discipline gamble, not a library guarantee. The fix
exists but is decorative.

**Source.** `src/styles/glass.css:314-369`; `src/styles/tokens.css:872`
(the "no web API reads pixels behind backdrop-filter" rationale for the
declarative-only design — true, but it does not excuse shipping zero default
engagement).

---

## H-2 — glass-ui's shipped CSS ships UNPREFIXED backdrop-filter; Safari paint depends entirely on the consumer's autoprefixer (UNDER-SPECCED, Safari)

**Defect.** The five glass rungs author `backdrop-filter:` UNPREFIXED only
(`src/styles/glass.css:251,271,282,298,309` etc.), by deliberate policy
(`glass.css:233-240`: "declares the unprefixed `backdrop-filter` only … Lightning
CSS / autoprefixer in the consumer's pipeline emits the `-webkit-` legacy form").
The shipped artefact `@mkbabb/glass-ui/styles` resolves to `dist/styles/index.css`,
which `@import`s the RAW source-copied `dist/styles/glass.css`. Per-occurrence
counts on the shipped file:

- `dist/styles/glass.css`: **1 `-webkit-backdrop-filter` / 16 total** (the lone
  webkit is inside the `@supports not` query at `glass.css:1037`).

So glass-ui ships its glass ladder unprefixed. The webkit form materialises ONLY
if the consumer re-runs an autoprefixer/Lightning CSS over node_modules CSS with
a Safari-bearing target. This is an UNDECLARED, UNVERIFIED dependency on every
consumer's pipeline — there is no gate that the prefix reaches the rendered CSS.

**The WebKit trap is specific and severe.** The `@supports not ((backdrop-filter:
blur(1px)) or (-webkit-backdrop-filter: blur(1px)))` opaque fallback
(`glass.css:1037-1056`) fires only when the engine supports NEITHER form. Safari
≤17 (still non-trivial 2026 traffic) SUPPORTS the `-webkit-` form, so:
1. `@supports` query → TRUE (webkit supported) → opaque fallback does NOT fire.
2. The painted rule uses the UNPREFIXED property → Safari 17 ignores it → no blur.
3. Net result: a TRANSPARENT glass surface with floating text and NO opaque
   fallback — strictly worse than a browser with no backdrop-filter at all.

This is the worst-case legibility failure (text over arbitrary backdrop, no
plate), and it triggers exactly when the consumer's autoprefixer fails to add the
prefix — which the library cannot control.

**Verification (production bundle).** The slides bundle WAS inspected:
`/Users/mkbabb/Programming/slides/dist/assets/index-CyPZZFYn.css` carries
**38 `-webkit-backdrop-filter` / 77 total** — Tailwind v4's internal Lightning CSS
DID autoprefix the glass-ui rungs there. So slides currently survives Safari 17,
but ONLY because Tailwind v4's default target happens to include a Safari version
that still needs the prefix. A consumer that declares `browserslist: ["last 2
Safari versions"]` (= Safari 18+, where unprefixed is supported) would correctly
DROP the webkit prefix per their target — and break Safari 17 with no fallback,
because the library's own `@supports not` guard never fires. The contract is
fragile by construction: the library's correctness is hostage to a config it
doesn't own and doesn't verify.

**Inconsistency tell.** `src/components/ui/slider/Slider.vue:200,288` and
`src/components/custom/timeline/ContinuousRail.vue:89` DO hand-author
`-webkit-backdrop-filter`, contradicting the unprefixed-only policy — so the
policy isn't even uniformly applied across the source.

---

## H-3 — useSpecularTracking forces layout + reads matchMedia on EVERY pointermove; no rAF coalescing (PERF, repaint-storm)

**Defect.** `src/composables/glass/useSpecularTracking.ts:48-67`, the shared
pointer-anchored specular write seam (consumed by `Card.vue:134` and
`DockIconButton.vue:70`), on EVERY `pointermove`:

1. Calls `window.matchMedia("(prefers-reduced-motion: reduce)").matches`
   (line ~37, `prefersReducedMotion()`) — mints a fresh MediaQueryList per event,
   synchronous, every tick. (Should be a single cached `matchMedia` listener.)
2. Calls `target.getBoundingClientRect()` (line 56) — forces a synchronous layout
   read on every pointer sample, unbatched, uncached.
3. Writes `--mouse-x/--mouse-y` inline, which drives the `.glass-material::before`
   radial-gradient catch-light (`glass.css:126-132`) that sits ON a
   `backdrop-filter` glass surface — so each write repaints a blurred layer.

There is NO `requestAnimationFrame` coalescing: a pointer device firing 120–1000
events/s drives 120–1000 forced layouts + blurred-surface repaints per second.
On WebKit (where backdrop-filter repaint is the most expensive op the library
runs — `tokens.css:697` calls it "glass-ui's most" costly) this is a jank vector,
multiplied under W54's maximal-glass where many surfaces carry the `::before`.
The composable's own docstring claims "style-only — no reflow, no re-render" —
the `getBoundingClientRect()` read directly contradicts "no reflow".

**Contrast with the well-built path.** The aurora cursor write-path
(`useCursorInteraction.ts`) is explicitly decoupled and PRM-early-outs at the
write; the constellation `onMove` (`Constellation.vue:215-225`) at least caches
into a canvas (GPU). The DOM-CSS-var path (`useSpecularTracking`) is the one that
thrashes layout against a blurred surface. The fix is a single rAF-coalesced
write + a cached PRM ref (the substrate pattern AV.W7 already established).

---

## H-4 — Maximal-glass (W54) compositing cost is unbounded and UNGATED; nested backdrop-filter on the common glass-in-glass composition (PERF)

**Defect.** AX.W54 made the DEFAULT `<Button>` variant `glass-wash btn-glass`
(`src/components/ui/button/index.ts:34-35`), and `.btn-glass` paints a real 10px
`backdrop-filter: var(--glass-blur-btn)` (`glass.css:623`). Glass is now the
default for cards (`.glass-card`, `glass.css:481`), the five rungs, dialogs,
sheets. So the COMMON modern composition — default glass Buttons inside a
`.glass-card` inside a glass Dialog over a glass/aurora page — stacks 3–4
INDEPENDENT `backdrop-filter` layers, and NESTS them where they overlap.

WebKit handles nested backdrop-filter especially poorly: each nested level
re-samples the already-blurred buffer below it (a non-linear cost), and the
blur is recomputed on every scroll/resize/animation frame of any ancestor. There
is:
- NO paint-containment hint on `.glass-dock`/`.glass-btn` (only `.glass-card`
  carries `contain: layout style` at `glass.css:485` — and that omits `paint`,
  so the backdrop sample still escapes the box).
- NO `proof:*` frame-budget / repaint gate anywhere (`grep frame|fps|perf|repaint
  package.json` → only the unrelated `proof:dock-perfection`). The AY plan's
  W-BLOB3 ("frame-budget") and W-AUR3 ("real-GPU") gate the SHADER surfaces, not
  the CSS backdrop-filter cost of the maximal-glass default.

The library made glass MAXIMAL without measuring or gating the WebKit compositing
cost of the resulting glass-in-glass stacks. This is the perf debt AX.W54 created
and AY inherits ungated.

(Note: I initially suspected the dock control nested a blur inside the dock shell;
`dock-controls.css:68` shows `.dock-icon-button { background: transparent }` with
no own backdrop-filter, so the DOCK is clean. The nesting is in the
Button/Card/Dialog default-glass stack, which W54 created.)

---

## H-5 — Touch-target floor is a 3-selector allowlist, NOT the library-wide system the user asked for; no proof:touch-target gate exists (CHRONIC, a11y)

**Defect.** Corpus #4 asks for a "touch-target + font-size GENERAL increase on
mobile AND desktop … across components (NOT just the dock coarse-pointer floor)".
What shipped (`src/styles/utilities.css:1163-1170`) is a 3-selector allowlist
under `@media (pointer: coarse)`:

```
[data-size="icon"], .expandable-container__trigger, .segmented-tabs__trigger
```

This MISSES every other interactive atom: default/sm `<Button>` (only the icon
size is covered), Checkbox, Switch, RadioGroupItem, Slider thumb, Select trigger,
NumberField steppers, Toggle, ToggleGroupItem, Tabs triggers, Badge-as-button,
links, DropdownMenuItem. WCAG 2.5.5 (Target Size) is therefore met only on a
sliver of the surface. And the floor is `@media (pointer: coarse)` ONLY — the
user explicitly asked for "mobile AND desktop"; fine-pointer (desktop) gets NO
increase from this rule.

**The gate the plan names does not exist.** AY.W-SCALE1's hard gate is
"`proof:touch-target` (every interactive atom ≥ floor on coarse)". `grep
touch-target|target-size|tap-target package.json` → there is NO such script. The
plan gates against a non-existent proof; the wave is under-specced (no
evidence-backed hard gate is authorable from a gate that doesn't exist yet, and
the existing source can't pass it — most atoms fail).

---

## H-6 — proof:dark-semantic-contrast computes contrast over SOLID --card, but W54 made the surface TRANSLUCENT glass (the oracle is stale; a11y)

**Defect.** `scripts/proof-dark-semantic-contrast.mjs` (the dark destructive
legibility gate) resolves WCAG contrast of the destructive ink "vs `--card`"
(the solid token) and "vs the page". But after AX.W54, the Alert/Toast surface
the ink actually sits on is a TRANSLUCENT glass plate
(`color-mix(in oklab, var(--glass-bg-*), …)`, `glass.css:280-281`) that lets the
page show through — so the REAL rendered contrast is LOWER than the proof's
oracle asserts (the effective background is a blend of `--card` and whatever is
behind, not the opaque `--card`). The gate's number is an upper bound, not the
truth. The oracle was authored (AX.W44) against the pre-W54 opaque-card model and
was not re-derived when W54 made the surface glass.

**Why it matters.** The whole point of the gate is to catch the illegible dark
destructive Alert (D10). Over glass-over-a-bright-page it can pass the oracle
(≥4.6 vs opaque `--card`) while the user sees <4.5 (because the bright page bleeds
through the translucent plate). The gate gives false assurance precisely in the
W54+W60 common case. It must model the glass blend (or assert over the worst-case
backdrop the glass admits), and tie into the H-1 default-engaged darken.

---

## Cross-cutting: the contrast-color() gate is correct but progressive-only

`glass.css:357-369` gates `contrast-color()` behind `@supports (color:
contrast-color(white))` and anchors on `--card` (the light surface), not the ink —
this is correct and Safari-safe (it degrades to the declarative bucket on
non-supporting engines). NO finding here; recorded as SOLID so the wave specs
don't churn it. The problem is upstream: the declarative bucket it refines is
itself never engaged (H-1).

---

## Convergence criteria (what "perfected" means for this lane)

1. **Default legibility floor engaged, not opt-in.** Either (a) glass-ui's own
   surfaces that ship over a light/rich backdrop set `--glass-backdrop: light`
   themselves (dock shell, dialogs, the demo page shells, the slides decks), OR
   (b) a heavier default — the W55 darken auto-applies and the `dark` bucket is
   the explicit override. A π contrast readback over the ACTUAL shipping
   surface (not synthetic white) clears 4.5:1.
2. **Safari paint is library-guaranteed, not consumer-gambled.** glass-ui ships
   the `-webkit-backdrop-filter` form in `dist/` itself (build-time prefix or a
   hand-authored pair as the SFCs already do), so paint does not depend on the
   consumer's autoprefixer; AND the `@supports not` fallback is reworked so a
   webkit-only engine (Safari ≤17) that DOESN'T get the prefix still gets the
   opaque plate, never transparent-with-floating-text. A gate asserts the prefix
   is present in the shipped CSS.
3. **Specular write is rAF-coalesced + cached-PRM.** No `getBoundingClientRect`
   per raw pointermove; matchMedia is a single cached listener. A
   forced-layout/repaint count over a synthetic pointer sweep is bounded.
4. **Maximal-glass cost is gated.** A frame-budget / nested-backdrop-depth gate
   bounds the glass-in-glass compositing cost; paint containment lands on the
   stacking surfaces.
5. **Touch-target is a library-wide system with a real gate.** `proof:touch-target`
   EXISTS and asserts every interactive atom ≥ floor on coarse; the type-scale
   axis covers mobile AND desktop per corpus #4.
6. **The dark-contrast oracle models glass translucency** (or asserts the
   worst-case backdrop), tied to the H-1 default darken.

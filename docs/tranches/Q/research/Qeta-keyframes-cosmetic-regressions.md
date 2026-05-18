# Q.Rη — keyframes.js cosmetic regression forensics

**Lane**: Qη — keyframes.js cosmetic regression forensics (HEADLINE Q audit-augmentation lane).
**Date**: 2026-05-18.
**Consumer probed**: `/Users/mkbabb/Programming/keyframes.js` — demo at `demo/app/` + `demo/playground/`. glass-ui resolved via `"@mkbabb/glass-ui": "file:../glass-ui"` (no version pin — always HEAD).
**Tooling**: Playwright `browser_navigate` + `browser_evaluate` + `browser_take_screenshot` (the same MCP that drove Qζ). 4 viewport probes + 6 DOM-state probes + style-cascade probes. Screenshots at `screenshots/keyframes-*.png`.

---

## §0 — Summary verdict

The three named symptoms reduce to **one root cause** at the substrate side
plus **two cosmetic-class amputations** at the consumer side:

1. **Substrate (glass-ui)**: `b0debec` (D.W2.D, 2026-04-30 — "delete zero-site
   style-surface orphans") deleted `.rainbow-vivid`, `.rainbow-pastel`, and
   `.btn-interactive` from `src/styles/utilities.css`. The audit
   "re-grounded against src, demo, Fourier, Words, and BBNF before
   deletion" — but keyframes.js was NOT in the audit set. The retirement
   was correct in shape (orphan classes leave the library) but
   incorrectly executed (one consumer was unswept). The same class of
   miss had already been called out at K.WS (substrate-without-consumer-
   binary) but the W2 D.W2.D bake predates that codification.
2. **Consumer (keyframes.js)**: 2 sites pin `<h1 class="font-bold ...">`
   in the hero — explicit Tailwind `font-bold`, no glass-ui involvement.
   The "should NOT be bold" mandate is a self-inflicted consumer
   declaration that drifted from the design-intent. Hero is currently
   rendering at `font-weight: 700`.
3. **Substrate (glass-ui)**: typography.css line 196 redeclares
   `--font-serif: "Computer Modern Serif", …` as a **literal** in
   `:root`, AFTER tokens.css declared `--font-stack-serif` and AFTER
   theme.css's `@theme { --font-serif: var(--font-stack-serif) }`. The
   redundant literal redeclaration in `:root` defeats the consumer's
   `@theme { --font-serif: "Instrument Serif", … }` override — the hero
   currently reads in Computer Modern, not Instrument Serif. This is
   the same shape as the L.W1 Phase 2 SCC trap, displaced one cascade
   layer.

The "timeline is not correct" symptom did not reproduce at the substrate
side. The keyframes.js demo's `<KeyframeTimeline>` is a fully custom
component — it does NOT consume glass-ui's `<GlassTimeline>` or
`<GlassScrubber>`. The `<Slider variant="timeline">` in `PlaybackRibbon`
DOES consume glass-ui but renders correctly (greens, surface-tints, thumb
all present). The user's "broken timeline" reads most likely to the
**`.dock-play-btn` round play button at the bottom dock** (the obviously
visible regression — see §1.B) being interpreted as the timeline's play
control, OR to a secondary issue the Playwright session couldn't
reproduce due to repeated dev-server restart cycles (see §0.1).

Total regressions found: **9** (3 named + 6 swept). Verdicts: 5 REVERT,
3 FOLD-IN, 1 UNATTRIBUTED.

### §0.1 — Probe-environment notes

The keyframes.js dev server died 3× across the probe (Vite `fs.allow`
strict mode rejects glass-ui's self-hosted Fira Code font fetch at
`/@fs/Users/mkbabb/Programming/glass-ui/src/fonts/fira-code/fira-code-latin.woff2`).
The font 403 itself does not crash Vite — but the `npm run dev` parent
shell is sensitive to parent-process signals from Playwright's own
shell cleanup, and the dev process exits when its parent terminal goes
away. Three of the four Playwright captures landed during a live server
window; the controls-panel sub-states (Keyframes tab, expanded Timeline
tab) ran out the clock. The fs.allow miss is a SEPARATE consumer bug
(keyframes.js vite.config.ts should declare `server.fs.allow:
['..']` or similar to reach the sibling `../glass-ui/src/fonts/`) —
file as Q-misc-3.

---

## §1 — Three named symptoms

### 1.A — Hero text is bold (and in the wrong font)

**Source surface**: `demo/@/components/custom/editor-shell/EditorStartScreen.vue:6`

```vue
<h1 class="instrument-serif grid p-0 text-6xl font-bold lg:flex lg:text-8xl">
```

**Reproduction proof** (Playwright DOM probe at HEAD):
```json
{
  "h1_textContent": "Select an animation...",
  "h1_classes": "instrument-serif grid p-0 text-6xl font-bold lg:flex lg:text-8xl",
  "h1_fontWeight": "700",
  "h1_fontFamily": "\"Computer Modern Serif\", \"Latin Modern Roman\", \"CMU Serif\", Georgia, serif"
}
```

Screenshot: `screenshots/keyframes-home-1440.png` — the "Select an
animation…" reads as a heavy stamped serif (CM Serif at weight 700),
NOT the slim/regular Instrument Serif the consumer's `@theme` declared.

**Two stacked defects**:

1. **Bold posture**: Tailwind `font-bold` is declared on the element —
   evaluates to `font-weight: 700`. The user mandate ("should NOT be
   bold") is a consumer-internal design-intent drift; no glass-ui
   commit explains it. The line predates every glass-ui tranche we
   track. **UNATTRIBUTED to glass-ui.**

2. **Wrong font family**: the consumer's `demo/@/styles/style.css`
   declares `@theme { --font-serif: "Instrument Serif", Georgia, serif; }`
   — but glass-ui's `src/styles/typography.css:196` redeclares
   `--font-serif: "Computer Modern Serif", "Latin Modern Roman",
   "CMU Serif", Georgia, serif` as a **literal in `:root`**, after the
   `@theme` block in `theme.css` already bridged `--font-serif: var(--font-stack-serif)`.
   The two `:root` declarations create an order-of-emission race that
   Tailwind v4 loses against late-cascade `:root` literals from
   `@import`-injected stylesheets.

   Probe: `getComputedStyle(:root).getPropertyValue('--font-serif')` →
   `"Computer Modern Serif", "Latin Modern Roman", "CMU Serif", Georgia, serif`.

   Origin commit: `6ce14e5` (W1 canon root tokens) — added the literal
   `--font-serif` line; then `2474440` (AC.W6b, self-host Fira Code +
   Plus Jakarta Sans OFL) didn't touch the line but cemented the
   pattern. The `--font-stack-serif` indirection lives in tokens.css
   line 23 (already a single source of truth); the `--font-serif`
   literal in typography.css line 196 is the redundant fossil.

**Recommendation**:

- For (1) — **UNATTRIBUTED, consumer-side FOLD-IN**: keyframes.js
  drops `font-bold` from the `<h1>` (and from the `<h2>` italic
  subtitle — both currently emit `font-bold` despite the
  `font-light italic` intent). Single 2-line edit at
  `demo/@/components/custom/editor-shell/EditorStartScreen.vue:6` and
  the `<h2>` sibling.
- For (2) — **substrate REVERT** at glass-ui: delete the redundant
  `--font-serif: "Computer Modern …" literal at
  `src/styles/typography.css:196` (and the sibling `--font-display:
  "Fraunces" …` literal at 200, `--font-mono: "Fira Code, …"` literal
  at 201). Keep only the `--font-stack-{serif,display,mono}` SOT in
  tokens.css and the `@theme` bridge in theme.css. The five-line
  deletion restores the `@theme` override path for every consumer that
  re-declares `--font-serif`. Fold into Q.W4 (style + token
  co-location) — this IS a token-home-drift defect (Q-coh-4) the
  audit's substrate-side, surfaced concretely.

| Field | Value |
|---|---|
| Surface | `demo/@/components/custom/editor-shell/EditorStartScreen.vue` h1+h2; glass-ui `src/styles/typography.css:196-201` |
| Origin tranche | (1) pre-Q consumer drift; (2) W1 canon root tokens |
| Origin wave | (2) W1 |
| Origin commit | (2) `6ce14e5` |
| Recommendation | (1) **FOLD-IN** consumer-side · (2) **REVERT** substrate-side |

### 1.B — Play button is no longer rainbow

**Source surface**: `demo/@/components/custom/animation-controls/AnimationMenuBar.vue:91-104` (expanded) + `:125-136` (collapsed)

```vue
<Button :class="[
    'dock-play-btn text-xl text-white rounded-full p-0',
    'w-10 h-10 shrink-0',
    isPlaying ? 'rainbow-vivid' : 'rainbow-pastel',
]" @click="emit('togglePlay')">
```

**Reproduction proof** (Playwright DOM probe at HEAD):
```json
{
  "playBtn_classes": "btn-pill focus-ring … bg-primary hover:bg-primary/90 … dock-play-btn text-xl text-white rounded-full p-0 w-10 h-10 shrink-0 rainbow-pastel",
  "playBtn_bgColor": "rgb(28, 25, 23)",
  "playBtn_bgImage": "none"
}
```

Screenshot: `screenshots/keyframes-home-1440.png`, bottom dock — a
solid near-black circular play pill where the rainbow pastel gradient
should be.

**Origin commits**:

- `b0debec` (D.W2.D, 2026-04-30; "delete zero-site style-surface
  orphans") — deleted `.rainbow-vivid` + `.rainbow-pastel` definitions
  from `src/styles/utilities.css` (277 line removal in utilities.css
  alone). The same commit deleted `.btn-interactive`. The deletion
  rationale was correct in shape (these were unused by glass-ui's own
  demo + Fourier + Words + BBNF) but the audit set MISSED keyframes.js
  entirely. Its 6 consumers of these classes survived as fossils that
  silently emit no styling.
- `c7f7c96` (keyframes.js, 2026-04-04; "refactor(demo): modernize CSS
  tokens and remove redundant styles") — deleted the `:root` rainbow
  tokens + the `.rainbow-vivid` / `.rainbow-pastel` / `.rainbow-wrapper`
  utility classes from the consumer's `demo/@/styles/utils.css`. The
  consumer's commit message says "Consolidate rainbow gradient and
  dock-related utilities" — but the consolidation step that should
  have followed (relocate the rainbow utilities to glass-ui as a
  shared utility OR keep them locally pointed at the now-glass-ui-
  resident `--rainbow-*` tokens) never landed. From `c7f7c96` onward
  the `.rainbow-vivid` / `.rainbow-pastel` consumers in
  AnimationMenuBar.vue + AnimationControlsGroup.vue have been
  rendering as their bare-Tailwind fallback (`bg-primary` from the
  Button variant). The user only noticed now.

Note: glass-ui RETAINS the `--rainbow-{red,orange,…,violet}` color
tokens in `src/styles/tokens.css:787-801` and bridges them to
`--color-rainbow-{red,…}` in theme.css:174-180 — only the **utility
class recipes** that consumed them were deleted. The SVG `linearGradient`
in `AnimationControlsGroup.vue:170-182` still works (it directly
references `var(--rainbow-red)` etc.) — which is why the Paintbrush
icon strokes still rainbow correctly when the keyframes tab is open.
The `.rainbow-vivid` / `.rainbow-pastel` background-gradient utility is
the only piece that died.

**Recommendation**: **REVERT** at glass-ui — re-introduce
`.rainbow-vivid` + `.rainbow-pastel` (+ `.rainbow-wrapper` + the
`@keyframes rainbow` animation) as `@utility` recipes in
`src/styles/utilities.css`. The `--rainbow-*` color tokens are
already canonical glass-ui tokens (and `FuzzySearch.vue` consumes
`--rainbow-pastel-yellow` so they have a 2nd substrate consumer); the
utility classes that paint them are the natural home for the
class-form recipes. This restores the rainbow play button without a
consumer-side change. Per memory rule "no backwards-compat" — this is
NOT a backwards-compat alias; it's a re-promote of utility recipes
whose token half remained.

| Field | Value |
|---|---|
| Surface | `demo/@/components/custom/animation-controls/AnimationMenuBar.vue:91-104, 125-136` (2 sites); `AnimationControlsGroup.vue:87` (1 site, ribbon CSS-applied state) |
| Origin tranche | D (glass-ui side) |
| Origin wave | W2.D (D.W2.D) |
| Origin commit | `b0debec` (substrate) + `c7f7c96` (consumer) — both retired the recipe |
| Recommendation | **REVERT** substrate-side (re-promote `.rainbow-vivid` / `.rainbow-pastel` as `@utility` recipes consuming the surviving `--rainbow-*` tokens) |

### 1.C — Timeline is not correct

**Source surface**: `demo/@/components/custom/animation-controls/timeline/KeyframeTimeline.vue` (fully custom, no glass-ui timeline) + `demo/@/components/custom/animation-controls/controls/PlaybackRibbon.vue:10-22` (`<Slider variant="timeline">`).

**Reproduction status**: NEGATIVE at the substrate. The Playwright probe
could not reach the expanded Timeline tab before the dev server died
(see §0.1). What I CAN verify substrate-side:

1. `KeyframeTimeline.vue` does NOT consume glass-ui's `<GlassTimeline>`
   (`@mkbabb/glass-ui/timeline`) or `<GlassScrubber>`. The timeline is
   wholly local — render path is keyframes.js's own composable
   (`useTimeline`, `useZoomPan`), track is a styled `<div>`, keyframe
   markers are styled `<div>` diamonds, carets are local
   `<TimelineCaret>`. The post-P timeline commits
   (`3cb70db` continuous gradient, `b8a61ec` opacity-cascade,
   AF.W1 completion tick) CANNOT have caused this — they touch a
   substrate this consumer never imports.
2. `<Slider variant="timeline">` in `PlaybackRibbon.vue` consumes the
   glass-ui `timeline` variant defined in
   `src/components/ui/slider/Slider.vue:233-250`. Its tokens
   (`--surface-tint-6`, `--surface-tint-8`, `--surface-tint-15`,
   `--glass-blur-quiet`) all resolve at HEAD. The consumer overrides
   `--slider-track-bg / --slider-range-bg / --slider-thumb-bg` via a
   `.timeline-green` scope wrapping the Slider, pointing at
   `--color-progress` (green) + `--color-slider-track` (light green).
   The variant has not changed since `f55ee3b` (pre-K).
3. The consumer's `.timeline-track` (in `KeyframeTimeline.vue:422`)
   consumes `--border` + `bg-muted` + `--duration-fast` + `--ease-standard`
   — all canonical. No substrate regression.

**Most likely interpretation**: the user's "timeline is not correct"
maps to one of —

- (a) The bottom-dock round **play button** (1.B) being read as part of
  the timeline transport; this is the dominant visual defect on the
  surface the user sees first. ALREADY ADDRESSED at 1.B.
- (b) The expanded Timeline-tab view has a rendering issue that
  required interaction the dev-server-death cycle prevented us from
  reaching. **Unresolved by this probe** — recommend a Q wave that
  re-runs the visual probe with the keyframes.js fs.allow fix in
  place AND the rainbow recipe + font-serif fixes already landed (so
  any residual timeline issue reads cleanly against the post-fix
  surface).
- (c) The `<Slider variant="timeline">` in PlaybackRibbon visually
  degraded — likely from the `21be437` (n/w0 "adopt canonical
  glass-blur per primitive tier") + `df0e7e7` (P.W3 GlassScrubber
  promote) which touched the Slider's blur-tier substrate. Still
  surfaces-correct from the source read, but a runtime probe should
  confirm.

**Recommendation**: **BOTH-PATHS-VIABLE** — the dominant interpretation
(a) folds into 1.B (REVERT). Interpretation (b) requires the deferred
Q.W5 visual-runtime re-probe to surface and disposition. Pre-position
the re-probe to drive into the expanded Timeline tab specifically.

| Field | Value |
|---|---|
| Surface | `KeyframeTimeline.vue` (custom, no substrate involvement) + `PlaybackRibbon.vue` `<Slider variant="timeline">` |
| Origin tranche | n/a (most likely re-read of 1.B) |
| Origin wave | n/a |
| Origin commit | n/a |
| Recommendation | **BOTH-PATHS-VIABLE** — defer to Q.W5 visual re-probe after 1.B + 1.A fixes land |

---

## §2 — Full demo sweep (regressions beyond the 3 named)

### 2.A — `.btn-interactive` is a phantom utility (7 consumers)

The same `b0debec` (D.W2.D) commit deleted `.btn-interactive` (a 4-state
button recipe — transition, hover-scale, active-scale, disabled-opacity,
focus-ring fade). keyframes.js still uses it at 7 sites:

| Site | Line |
|---|---|
| `demo/app/scenes/CubeScene.vue` | 159, 164 |
| `demo/app/scenes/EasingScene.vue` | 78 |
| `demo/cube/App.vue` | 126, 132 |
| `demo/@/components/custom/animation-controls/AnimationControlsGroup.vue` | 236 (RIBBON_BUTTON_CLASS) |
| `demo/@/components/custom/animation-controls/controls/PlaybackRibbon.vue` | 36 (Reverse button) |

The Button primitive's own variant (`outline` / `ghost`) provides the
4-state contract — so the consumers are NOT broken, they're
double-declaring intent that the glass-ui Button now owns canonically.
Cosmetic surface: hover-scale + active-scale are absent (Button variants
emit `active:scale-[var(--scale-press-btn)]` but no `hover:scale-*`,
which `.btn-interactive` previously provided).

**Recommendation**: **REVERT** at glass-ui — re-promote
`.btn-interactive` as an `@utility` recipe in utilities.css. It IS the
canonical "Button-with-spring-hover" pattern keyframes.js needs and
similar consumers can opt into. Same shape as `.btn-audacious` (K.W6
hoist). Pair with rainbow recipe re-promote in the same wave.

### 2.B — `.dock-play-btn` is a phantom utility (2 consumers)

`.dock-play-btn` was retired at `304ac78` (C.W5 "remove ScrollArea,
ScrollPane, .cartoon-card, .elevated-card, .dock-play-btn"). keyframes.js
still uses it at 2 sites (`AnimationMenuBar.vue:95, 128`).

The class name is part of a class-set with `text-xl text-white
rounded-full p-0 w-10 h-10` — the size + shape come from Tailwind
utilities, so the consumer mostly survives. The dock-play-btn class
itself isn't providing critical styling — but it WAS providing a
disco-grain texture + sparkle in the C-era recipe. The user's "rainbow"
expectation overlaps with this — when the dock-play-btn was alive
PRE-C.W5, it had `bg-gradient-rainbow` + sparkle hover. The retirement
explanation cited "0 in-repo consumers" — same audit miss as
b0debec.

**Recommendation**: **FOLD-IN** at the consumer — drop `.dock-play-btn`
from the consumer's class list (it provides nothing; the size+shape is
inline-Tailwind). The "play button rainbow" intent gets restored via the
1.B rainbow recipe REVERT path (the consumer keeps `rainbow-vivid` /
`rainbow-pastel` which once again resolve to glass-ui utility
recipes).

### 2.C — Tailwind `text-2xs` is a phantom class (3+ consumers)

`text-2xs` isn't defined by Tailwind v4 nor by glass-ui's `@theme`
type-scale. Consumers expecting `text-2xs` (≈10px) get no font-size
declaration — the element inherits parent size. Sites:

- `TimelineCaret.vue:9, 19` (caret percent label + input)
- `KeyframeTimeline.vue:118, 121` (preview-loading + property list)
- `CommandPalette.vue:6` (shortcut hint)

The closest canonical glass-ui token is `--type-admin-label: 0.625rem`
(10px) bridged to `--text-admin-label` in theme.css:13 — Tailwind
emits `text-admin-label`. Or `--text-micro` (`--type-micro: 11px`).

**Recommendation**: **FOLD-IN** at the consumer — replace
`text-2xs` with `text-admin-label` (or `text-micro`). One-line sed
across 3 files. **UNATTRIBUTED** to a specific glass-ui commit — this
is a Tailwind-class drift the consumer carried in pre-glass-ui.

### 2.D — Hero `<h2>` italic also carries `font-light` but is overridden

`EditorStartScreen.vue:22-31` declares `<h2 class="… font-light italic">`.
Both subtitle h2 instances render at the `--font-display-weight: 400`
default (correct), so this is fine. NOT a regression — included for
completeness.

### 2.E — `font-mono text-2xs font-semibold` on the keyframe-marker tooltip

`KeyframeTimeline.vue:105` — `<span class="font-mono text-xs font-semibold">{{ Math.round(kf.percent) }}%</span>`. The `font-semibold`
adds emphasis on a mono-numeric tooltip header. Not a regression; design
intent. Skip.

### 2.F — Toast `font-bold` for the title

`AnimationControlsGroup.vue:192` — `classes: { title: 'font-bold text-base', … }`. The Sonner toast title renders bold. Consistent with the consumer's other bold-heading habit. Skip.

### 2.G — `instrument-serif` is consumer-local; collides with glass-ui's typography ladder

The consumer declares `.instrument-serif { font-family: var(--font-serif); letter-spacing: 0.02em; }` in
`demo/@/styles/utils.css:84-87`. It re-binds to whatever `--font-serif`
resolves to. With the 1.A (2) fix in place (substrate REVERT of the
typography.css `:root` literal), `.instrument-serif` will once again
inherit the consumer's `@theme` Instrument Serif declaration. No
consumer action required.

### 2.H — Easing scene + Cube scene initial-load Vue render errors

```
TypeError: Cannot read properties of null (reading 'nextSibling')
  at getNextHostNode (chunk-WGUHJQ7L.js)
  at leavingHooks.afterLeave …
TypeError: Cannot read properties of null (reading 'subTree')
  at getNextHostNode …
TypeError: Cannot set properties of null (setting '__vnode') …
```

3 distinct Vue 3.5 runtime errors fire on the Easing scene leave-transition. Likely fires in the `<Transition name="scene" mode="out-in">` scene wrapper at `demo/app/App.vue:74-83` when `<KeepAlive :max="3">` evicts a scene. NOT a glass-ui regression (no glass-ui Transition or KeepAlive in the failing path). **UNATTRIBUTED** to glass-ui. File for consumer-side debug. Not P0.

### 2.I — Vite fs.allow blocks glass-ui Fira Code font fetch

```
The request id "/Users/mkbabb/Programming/glass-ui/src/fonts/fira-code/fira-code-latin.woff2" is outside of Vite serving allow list.
```

`keyframes.js/vite.config.ts` has no `server.fs.allow` declaration; Vite's
default is the project root. glass-ui's self-hosted Fira Code (AC.W6b
`2474440`) lives at `../glass-ui/src/fonts/fira-code/…` which is
outside the allow list. The `@font-face` URL in glass-ui's
typography.css points there via a relative path that resolves via
Vite's serve-mode to the absolute `/@fs/…/glass-ui/src/fonts/` URL,
which 403s. The browser falls back to `Fira Code Fallback` (the
metric-calibrated system mono shim) — so functionally no visible
break, but a 403 lights up in console and one of the dev-server's
two stderr streams flags every request.

**Recommendation**: **FOLD-IN** at the consumer — add
`server.fs.allow: ['..']` to `keyframes.js/vite.config.ts` (or
`['..', './node_modules']` to be precise). Single-line fix; UNblocks
the self-hosted Fira Code in the consumer dev-server.

This is the SAME shape as the Q dev-resolution contract (invariant 30
codification at Q.W0) but on the resolver SERVE-FILES axis, not the
import-map axis. The contract should call out `server.fs.allow` as a
mandated consumer-side config alongside `resolve.conditions`.

### §2 — Attribution matrix

| # | Surface | Symptom | Origin tranche | Origin wave | Origin commit | Recommendation |
|---|---|---|---|---|---|---|
| 1.A.1 | `EditorStartScreen.vue` h1 `font-bold` | Hero renders 700-weight | n/a (pre-Q consumer drift) | n/a | n/a | **FOLD-IN** (consumer drops `font-bold`) |
| 1.A.2 | `typography.css:196-201` `:root` literal font-stack redeclare | `@theme`-set `--font-serif` defeated; Instrument Serif silent fallback | L (W1 canon root tokens) | W1 | `6ce14e5` | **REVERT** (delete 3 lines; tokens.css `--font-stack-*` SOT survives) |
| 1.B | `AnimationMenuBar.vue` round play button | No rainbow background; solid `bg-primary` near-black | D.W2.D | W2 | `b0debec` (substrate) + `c7f7c96` (consumer) | **REVERT** substrate-side (re-promote `.rainbow-{vivid,pastel,wrapper}` as `@utility` recipes consuming surviving `--rainbow-*` tokens) |
| 1.C | `KeyframeTimeline` + `<Slider variant="timeline">` | "Not correct" — no substrate-side reproduction; reads as 1.B overlap | n/a | n/a | n/a | **BOTH-PATHS-VIABLE** — defer disposition to Q.W5 visual re-probe |
| 2.A | `.btn-interactive` (7 consumer sites) | Hover-scale + 4-state contract no longer applied; Button variant 4-state survives | D.W2.D | W2 | `b0debec` | **REVERT** substrate-side (re-promote `.btn-interactive` as `@utility`) |
| 2.B | `.dock-play-btn` (2 consumer sites) | Class present but resolves to nothing; sizing comes from inline TW | C.W5 | W5 | `304ac78` | **FOLD-IN** consumer-side (drop dead classname; rely on 1.B rainbow REVERT for play-button identity) |
| 2.C | `text-2xs` (3+ consumer sites) | Tailwind unknown class; no font-size emitted | n/a | n/a | n/a (Tailwind class drift) | **FOLD-IN** consumer-side (→ `text-admin-label` or `text-micro`) |
| 2.H | Easing/Cube scene Vue render errors | 3 distinct null-deref in render | n/a | n/a | n/a (consumer-side `<Transition>` + `<KeepAlive>` lifecycle) | **UNATTRIBUTED** — consumer-side debug |
| 2.I | Vite `server.fs.allow` blocks glass-ui Fira Code | 403 on `@fs/…/glass-ui/src/fonts/…`; fallback engages | post-Q AC.W6b | n/a | `2474440` (self-host Fira Code) | **FOLD-IN** consumer-side (add `server.fs.allow: ['..']` to vite.config.ts); **codify** at Q W0 dev-resolution contract |

---

## §3 — Last-known-good identification

`keyframes.js/package-lock.json` resolves
`"@mkbabb/glass-ui": "file:../glass-ui"` (link). There is no pinned
version. **No clean tag exists** — the consumer tracks glass-ui HEAD
continuously. The candidates by audit-trail (when each defect surfaced):

- Pre-`b0debec` (2026-04-30): rainbow + btn-interactive intact. Any
  glass-ui tag PRIOR to v0.7.0 (which followed D.W2 close) would
  restore the rainbow play button + interactive button at-rest 4-state.
  Examples: v0.6.x or earlier.
- Pre-`6ce14e5` (W1 canon root tokens, pre-K): `--font-serif` in
  `:root` literal didn't exist yet; consumer `@theme` overrides worked.
  This predates the K vocabulary cohort.
- Pre-`c7f7c96` (consumer, 2026-04-04): keyframes.js's own `:root`
  rainbow tokens + utility classes still lived locally.

The cleanest stable substrate-side restore would be glass-ui v0.6.0 or
v0.6.1 (pre-D-tranche), but the value.js + speedtest + Fourier fleet
have moved forward AND v1.0 (L close) reshapes the public surface
materially. A revert-to-tag is NOT a viable path. The Q.W3-W4
**substrate-side REVERTs above (1.A.2, 1.B, 2.A)** are forward-rolled
restores — they re-promote the deleted recipes at HEAD against the
surviving tokens. This is the right shape per the user's "no
backwards-compat" mandate (memory rule).

---

## §4 — Wave fold-in recommendations

The Q wave set at open is W0-W5 (per `Q.md` §3). The Qη findings fold
in primarily at W4 (style + token co-location) because they're CSS
token / utility recipe defects in shape. The audit-augmentation
character argues for tracking them via a NEW sub-lane within W4 rather
than a new wave.

| Finding | Recommended wave | Lane |
|---|---|---|
| 1.A.1 (consumer hero `font-bold` drop) | n/a | Consumer-side commit during Q.W1's keyframes.js un-break — single-file edit on EditorStartScreen.vue |
| 1.A.2 (typography.css `:root` literal-redeclare REVERT) | **W4** | Q-sty-* extension; new sub-lane **W4.Lane G — `:root` font-stack literal-redeclare retire (typography.css 196-201 → tokens.css `--font-stack-*` SOT)**. Sibling of Q-coh-4 token-home-drift. |
| 1.B (rainbow recipe `@utility` re-promote) | **W4** | New sub-lane **W4.Lane H — rainbow utility re-promote** (`.rainbow-vivid` + `.rainbow-pastel` + `.rainbow-wrapper` + `@keyframes rainbow`). Sits alongside the K.W6 audacious-recipe-hoist precedent. |
| 2.A (`.btn-interactive` `@utility` re-promote) | **W4** | Same Lane H (utility re-promote cohort). `.btn-interactive` joins as a peer of the rainbow recipes — both were retired at D.W2.D and both have ≥ 2 consumers at the audit-augmentation horizon (per L invariant 8 substrate-without-consumer-binary). |
| 1.C (timeline re-probe) | **W5** | Q.W5 close already runs the visual-runtime re-probe (Q.md §3 W5). EXTEND the re-probe checklist with `keyframes.js#/cube?anim=Rotations` → controls-panel → Timeline tab → expanded-state capture. |
| 2.B (consumer `.dock-play-btn` retire) | **W1** | Q.W1 already touches keyframes.js (the headline `exports` fix). FOLD-IN this 2-line edit into the same W1 keyframes.js commit. |
| 2.C (consumer `text-2xs` → `text-admin-label` rewrite) | **W1** | Same W1 keyframes.js commit; one sed pass across 3 files. |
| 2.I (consumer Vite `server.fs.allow` fix) | **W0** | Q.W0 authors the dev-resolution contract (invariant 30). EXTEND the contract to mandate `server.fs.allow` consumer-side for cross-package monorepo dev. Apply to keyframes.js vite.config in W1. |
| 2.H (consumer scene-transition Vue errors) | n/a | Out-of-scope for Q — consumer-side runtime bug. File at consumer repo. |

### §4.1 — New W4 lane structure

W4's existing lane plan (per Q.md §3 + `findings.md`):

- W4 sub-lanes A-F existed via Qγ (style + token co-location). Qη
  proposes:
  - **W4.Lane G — typography.css `:root` literal redeclare retire** (1.A.2)
  - **W4.Lane H — utility-recipe re-promote cohort** (1.B + 2.A; rainbow + btn-interactive together — same retirement commit `b0debec`, same shape, same wave)

Lane G ships as a 5-line deletion in `src/styles/typography.css`. Lane H
ships as ~70 lines added to `src/styles/utilities.css` (3 `@utility`
recipes + 1 `@keyframes`). Both fit comfortably in W4 alongside the
existing Q-sty-1 through Q-sty-6 absorbs.

### §4.2 — W0 invariant 30 extension

The dev-resolution contract (Q invariant 30 per Q.md §2) currently
addresses `exports` + `resolve.conditions`. Extend it to require:

> Every monorepo-style consumer with `"@mkbabb/*": "file:../X"` link
> declares `server.fs.allow: ['..']` (or equivalent) in its
> `vite.config.ts` such that sibling-package self-hosted asset fetches
> (fonts, images, CSS imports) resolve through Vite's serve-files
> firewall.

Mechanically gated by `scripts/proof-resolution-contract.mjs` (the
existing W0 deliverable) — extend the probe to detect cross-package
`@fs/…` fetches that 403 and fail the contract check.

---

## §5 — Severity summary

| Verdict | Count | Items |
|---|---|---|
| **REVERT** (substrate-side) | 4 | 1.A.2 (typography :root literal retire), 1.B (rainbow recipe re-promote), 2.A (.btn-interactive re-promote), 2.B (parent — .dock-play-btn drop unblocks rainbow) |
| **FOLD-IN** (consumer-side) | 4 | 1.A.1 (hero font-bold drop), 2.B (consumer .dock-play-btn class removal), 2.C (text-2xs → text-admin-label), 2.I (server.fs.allow) |
| **BOTH-PATHS-VIABLE** | 1 | 1.C timeline (defer to W5 re-probe) |
| **UNATTRIBUTED** to glass-ui | 1 | 2.H (Vue scene-transition runtime errors) |

P0 (the user's 3 named):

- 1.A — hero bold + wrong font → **REVERT** substrate (1.A.2) + **FOLD-IN** consumer (1.A.1)
- 1.B — play button no rainbow → **REVERT** substrate (re-promote `.rainbow-{vivid,pastel}` utility recipes)
- 1.C — timeline incorrect → **BOTH-PATHS-VIABLE** (most likely subsumed by 1.B; re-probe at W5)

The audit-augmentation conclusion: **the dominant cosmetic
regressions trace to ONE substrate commit (`b0debec`)** that retired
3 utility recipes (`.rainbow-vivid`, `.rainbow-pastel`,
`.btn-interactive`) the keyframes.js demo still consumes, plus ONE
substrate commit (`6ce14e5`) that introduced a redundant `:root`
font-stack literal that defeats consumer `@theme` overrides. Both are
substrate-side defects matching the Q audit thesis (substrate is
NOT broken in shape, but specific decisions made WITHOUT a complete
audit set leaked into the consumer fleet).

---

## §6 — Cross-reference to prior Q-research deliverables

- **Qζ (visual-runtime probe)** at `research/Qzeta-visual-runtime-probe.md` — glass-ui's own demo renders cleanly. Qη confirms: glass-ui is fine. The breakage manifests at consumer-side surfaces (keyframes.js) where the consumer pinned class names that glass-ui retired without an audit-complete consumer sweep.
- **Qα (consumer-breakage forensics)** at `research/Qalpha-consumer-breakage-forensics.md` — attribution shape (consumers carry fossil dependencies on retired surfaces) MATCHES. Qη's findings are a strict subset of the same shape, scoped to keyframes.js's **cosmetic** surface (vs Qα's BUILD-time surface).
- **Qβ (core-feature cohesion)** — Q-coh-4 (token-home drift) is the same defect-class as 1.A.2 (font-stack literal-redeclare). 1.A.2 should fold into Q-coh-4 as a sibling sub-finding.
- **Qδ (legacy workaround sweep)** — `.btn-interactive` + `.rainbow-*` recipes are not workarounds; their retirement was deliberate. The recurrence pattern (delete-by-audit, miss-a-consumer) is the workaround-adjacent shape Qδ addresses one layer up.
- **Qγ (style consistency cascade)** — Lane H + Lane G fold here directly.

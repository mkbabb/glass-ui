# P11/d — keyframes.js consumer audit (round 2)

## Preamble

**Scope:** `/Users/mkbabb/Programming/keyframes.js/` @ `7561af3` on `master` (v2.1.0 — AB.W6 settle release). Working tree CLEAN; UNCHANGED since the O11/d baseline (2026-05-14 morning) and the O.W7 re-run.

**Glass-ui reference:** `/Users/mkbabb/Programming/glass-ui/` @ v1.7.0 HEAD `b201b03` (per P findings §5). Local `file:../glass-ui` link wires keyframes.js to v1.7.0; `node_modules/@mkbabb/glass-ui/package.json` confirms `"version": "1.7.0"`.

**Mission:** Round-2 consumer audit — verify build at v1.7.0; concretize the CR-3 cross-repo write (HeaderRibbon + scale-on-hover); reaffirm 84 % UI-scaffolding + idle-bob carry-forward; check AB+1 primitive adoption; verify renames + the v1.5.0 font subsystem opportunity.

**Method:** READ-ONLY walk + diff. No mutations. HARD CAP 20 min.

---

## § Build verification at v1.7.0

`npm run build` GREEN.

```
> @mkbabb/keyframes.js@2.1.0 prebuild
> node scripts/freshness-gate.mjs --pre
[keyframes.js freshness] dist/ is fresh.

> @mkbabb/keyframes.js@2.1.0 build
> vite build --mode production
vite v7.3.1 building client environment for production...
transforming...
"lerpColorValue", "lerpComputedValue", "lerpNumericValue" and "parseCSSPercent" are imported from external module "@mkbabb/value.js" but never used in "src/animation/utils.ts" and "src/animation/index.ts".
✓ 12 modules transformed.
rendering chunks...
[vite:dts] Start generate declaration files...
computing gzip size...
dist/keyframes.js  50.19 kB │ gzip: 14.51 kB
[vite:dts] Declaration files built in 5128ms.
✓ built in 5.58s
```

Bundle: 50.19 kB raw / 14.51 kB gzip. No regressions vs O baseline; no build-time errors from v1.5–v1.7 glass-ui surface changes.

The unused-import warning (`lerpColorValue` + 3 siblings from `@mkbabb/value.js`) is a keyframes.js-side lint signal, not a glass-ui interaction. NOT IN SCOPE.

Subpath consumption surface at HEAD (`rg "from \"@mkbabb/glass-ui" demo/ src/`):

```
"@mkbabb/glass-ui"              — root barrel (vueuse-FREE curated)
"@mkbabb/glass-ui/controls"     — DarkModeToggle
"@mkbabb/glass-ui/dark"         — useGlobalDark
"@mkbabb/glass-ui/dock"         — GlassDock, DockLayer, DockLayerGroup, DockIconButton, DockSelectTrigger
"@mkbabb/glass-ui/forms"        — Input, Textarea
"@mkbabb/glass-ui/icon-tooltip" — IconTooltip
"@mkbabb/glass-ui/keyboard"     — registerShortcut, useRegisteredShortcuts, formatComboParts
"@mkbabb/glass-ui/labeled-field"— LabeledInput / Select / Slider / Switch
```

8 canonical subpaths; zero retired-subpath drift. **Substrate non-regression: CLEAN.**

---

## § CR-3 concrete migrations

### CR-3.1 — HeaderRibbon canonical adoption

**Fork status at HEAD:** UNCHANGED from O11/d + O.W7.

- Fork path: `demo/@/components/custom/header-ribbon/HeaderRibbon.vue` (152 LOC) + `index.ts` (barrel, ~1 LOC).
- Consumer: `demo/@/components/custom/editor-shell/EditorShell.vue:70` — the sole import site.

```ts
// EditorShell.vue:70 — current
import { HeaderRibbon } from "@components/custom/header-ribbon";
```

**Glass-ui canonical at v1.7.0:**

- `src/components/custom/header-ribbon/HeaderRibbon.vue` (155 LOC) + `types.ts` + `index.ts`.
- Subpath: `@mkbabb/glass-ui/header-ribbon` — verified in `package.json` exports lines 100–101 (`typesVersions`) + 213–216 (`exports`).
- `/api` re-exports `HeaderRibbonProps` + `HeaderRibbonPosition`.

**Concrete P-wave migration patch (1 file, 1 import-rewrite, 1 dir delete):**

```diff
# demo/@/components/custom/editor-shell/EditorShell.vue
- import { HeaderRibbon } from "@components/custom/header-ribbon";
+ import { HeaderRibbon } from "@mkbabb/glass-ui/header-ribbon";
+ // optional:
+ // import type { HeaderRibbonProps, HeaderRibbonPosition } from "@mkbabb/glass-ui/api";
```

Then:

```bash
rm -r demo/@/components/custom/header-ribbon/
# 152 (HeaderRibbon.vue) + ~1 (index.ts) ≈ 153 LOC delete
```

**Surface diff (fork → canonical) — all cosmetic, behavior identical** (per O.W7 §1.4):

| Aspect | Fork (152 LOC) | Canonical (155 LOC) |
|---|---|---|
| Z-index | `z-dock` | `z-[var(--z-dock)]` |
| Slot tags | `<slot name="..."></slot>` | `<slot name="..." />` |
| Prop type | inline anonymous interface | `HeaderRibbonProps` from `./types` |
| Function annotation | `function clearHoverTimeout()` | `function clearHoverTimeout(): void` |

The canonical IS the keyframes.js variant verbatim with surface polish — the "isMouseOver hover-tracking guard" was explicitly the keyframes.js refinement upstreamed at W6 Lane A. **Risk near zero.**

**P-wave write proposal:** single commit, single consumer (`EditorShell.vue`), single dir deletion. Cohort with CR-3.2 (same wave; `EditorShell.vue` is touched by both).

### CR-3.2 — `scale-on-hover` utility adoption

**Site count at HEAD:** 13 (UNCHANGED from O11/d + O.W7), spanning 10 files:

```
demo/@/components/custom/animation-controls/controls/TimingFunctionPanel.vue   1
demo/@/components/custom/animation-controls/keyframes/KeyframeCard.vue          1
demo/@/components/custom/animation-controls/keyframes/KeyframesEditor.vue       3
demo/@/components/custom/animation-controls/timeline/KeyframeTimeline.vue       1
demo/@/components/custom/editor-shell/EditorHeader.vue                          1
demo/@/components/custom/editor-shell/EditorShell.vue                           1
demo/@/components/custom/editor-shell/SharePopover.vue                          1
demo/app/App.vue                                                                1
demo/app/scenes/CubeScene.vue                                                   1
demo/cube/App.vue                                                               2
TOTAL                                                                          13
```

**Glass-ui canonical** (`src/styles/utilities.css`):

```css
@utility scale-on-hover {
    @apply transition-transform duration-fast ease-standard;
    &:hover {
        transform: scale(var(--scale-hover));
    }
}
```

Bundled via `@mkbabb/glass-ui/styles` which keyframes.js already imports (verified at `demo/@/styles/style.css` cascade). **0 JS import changes required; CSS-only class rename.**

**Concrete P-wave migration patch — 10 files / 13 edits:**

```diff
- <button class="hover:scale-105 transition-transform">
+ <button class="scale-on-hover">
```

(Compound state sites — e.g. `hover:scale-105 active:scale-95` — need targeted preservation of the `active:` half; only a minority of the 13 sites compound this way. Verified survey at O11/d §4.)

**P-wave write proposal:** single commit, 10 files, 13 line-edits. Cohort with CR-3.1 (HeaderRibbon).

### CR-3 cohort — single proposed commit

Both migrations share `EditorShell.vue`. The cleanest P-wave shape is:

```
commit subject: feat(consumer): adopt glass-ui v1.7 HeaderRibbon + scale-on-hover canonicals
  - 1 import rewrite (EditorShell.vue:70)
  - 1 dir delete (demo/@/components/custom/header-ribbon/)
  - 13 class renames across 10 files
  net delta: ~-153 LOC + 13 edited lines
```

---

## § 84 % UI-scaffolding + idle-bob + AB+1 adoption

### 84 % UI-scaffolding overfitting

**Re-verification at HEAD:** `demo/@/components/ui/` = **25 dirs** (UNCHANGED from O11/d + O.W7). Same distribution per O11/d §3:

- 20 strict-zero external consumers (84 %)
- 1 marginal (`calendar`)
- 4 active-consumed (`button`, `form`, `chart`, `label`)

**glass-ui-side disposition:** per CONSTELLATION.md §6 the cleanup is consumer-orchestrator-owned; glass-ui is READER-ONLY. **No glass-ui-side action available.**

**P-wave disposition (formal carry retire):** per P §1 "ZERO DEFERRAL" + §7 "every item lands OR formally retires" — formally **RETIRE from P carry** as consumer-owned, with the L2 precept proposal ("shadcn-vue init scaffolding hygiene") landed in glass-ui's precept-tier wave as the rationale memorialization. The substrate-without-consumer issue lives entirely inside keyframes.js's own tranche stream and cannot be moved by a glass-ui P-wave write. **Permanent-out-of-scope rationale: cross-repo authority boundary (CONSTELLATION.md §6).**

### idle-bob ad-hoc at CubeTarget.vue:133-146

**Site at HEAD:** UNCHANGED. Single consumer; 2-stop keyframe; fixed 5 px translate.

```css
/* demo/cube/CubeTarget.vue:133-146 */
.idle-hover {
    animation: idle-bob 3s var(--ease-standard) infinite alternate;
}
.idle-hover.playing {
    animation: none;
}
@keyframes idle-bob {
    0% { transform: translateY(0); }
    100% { transform: translateY(5px); }
}
```

**glass-ui canon search:** `rg "idle-bob|@keyframes idle" src/styles/` → 0 hits. Not graduated.

**P-wave disposition — formal RETIRE-as-inline:** 1 site + 2-stop animation does NOT clear J invariant 10's ≥ 2-consumer substrate bar. The animation is appropriately local to `CubeTarget.vue`. The ONLY remaining glass-ui-side question — `prefers-reduced-motion` gating — folds into the separate N7 `@motion-gate` / `.motion-safe` token-tier proposal (a glass-ui orchestrator decision, not a substrate-promotion decision).

**Recommendation:** P closes the idle-bob carry as **RETIRED-AS-INLINE** (consumer-local; J-invariant-10 fails); separately, P's token-tier wave decides the N7 `@motion-gate` proposal on its own merits (covers idle-bob + `liftDown` + `dotFade` + future cases).

### AB+1 primitive adoption (MetricCell / MetricStack / MetricRow / AnimatedDigit / ResponsiveTabs)

**Search at HEAD:** `rg "MetricCell|MetricStack|MetricRow|AnimatedDigit|ResponsiveTabs" demo/ src/` → **0 hits.**

**Disposition:** keyframes.js does NOT consume any AB+1-tier primitive. This is the expected substrate fit — keyframes.js is an animation-editor product, not a metric/dashboard product; MetricCell/Stack/Row + AnimatedDigit are dashboard primitives (lifted from speedtest AC.W6); ResponsiveTabs is a Tabs-list extension that keyframes.js's existing `Tabs` consumption does not currently need.

**Adoption opportunity assessment:** LOW. No concrete site identifiable where MetricCell/Stack would replace existing markup. `AnimatedDigit` is conceptually adjacent to keyframes.js's numeric-scrubber tooling but keyframes.js owns its own `@mkbabb/keyframes.js` numeric interpolation runtime (it IS the upstream library), so consuming a glass-ui AnimatedDigit would be circular dependency-shaped (glass-ui consumes the runtime keyframes.js publishes).

**P-wave write proposal:** NONE. Document the non-fit at P close and remove `keyframes.js` from any AB+1 cohort adoption tracker.

---

## § Renames audit + v1.5.0 font subsystem

### `avatarVariants` + `installDarkModeSync` renames

**Search at HEAD:** `rg "avatarVariants|installDarkModeSync" demo/ src/` → **0 hits.**

Neither renamed symbol is on keyframes.js's import surface. **NO BREAKAGE.** Renames are NO-IMPACT to this consumer.

### v1.5.0 Fira Code + Plus Jakarta Sans self-host — adoption opportunity

**glass-ui at v1.7.0:**

- Self-hosted woff2 at `src/fonts/fira-code/{fira-code-latin,fira-code-latin-ext}.woff2` (variable wght 300..700) + `src/fonts/plus-jakarta-sans/{plus-jakarta-sans-latin,plus-jakarta-sans-latin-ext}.woff2` (variable wght 200..800).
- `@font-face` cascade lives in `src/styles/typography.css` (verified — 4+ `@font-face` blocks under `../fonts/fira-code/` + `../fonts/plus-jakarta-sans/`).
- Both ship via `@import "@mkbabb/glass-ui/styles"` — zero additional consumer plumbing required.

**keyframes.js at HEAD:**

- `demo/@/styles/style.css:--font-mono: "Fira Code", monospace;` — declares the family.
- 8 HTML entry points still preload + stylesheet-link from `fonts.googleapis.com` (verified — `demo/app/index.html`, `cube/index.html`, `playground/index.html`, `square/index.html`, `simple/index.html`, `boxes/index.html`, `balls/index.html`, `bench/index.html`, `amiga/index.html`). Each entry pulls **Fira Code** AND **Instrument Serif** from Google Fonts CDN.

**Adoption opportunity assessment: MEDIUM.**

- **Fira Code:** glass-ui v1.5.0 self-hosted woff2 covers wght 300..700; the keyframes.js Google Fonts request is `family=Fira+Code:wght@300;400;500;700&display=swap` — **perfect overlap.** Adoption deletes 16 `<link>` tags (1 preload + 1 stylesheet per HTML × 8 entries) per Fira Code; the `--font-mono` cascade resolves to the bundled woff2 automatically once consumer cascade includes glass-ui `@import`.
- **Instrument Serif:** NOT in glass-ui's font subsystem (only Fira Code + Plus Jakarta Sans ship). Instrument Serif is a keyframes.js-private decision; remains Google-Fonts-loaded after Fira Code migration.

**Concrete P-wave migration patch (NOT cohort-able with CR-3 — different file class):**

```diff
# 8 × HTML entry points (demo/app/index.html, demo/cube/index.html, etc.)
- <link rel="preconnect" href="https://fonts.googleapis.com" />
- <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
- <link rel="preload" as="style"
-       href="https://fonts.googleapis.com/css2?family=Fira+Code:wght@300;400;500;700&display=swap" />
- <link rel="stylesheet"
-       href="https://fonts.googleapis.com/css2?family=Fira+Code:wght@300;400;500;700&display=swap" />
  <!-- Instrument Serif lines preserved -->
  <link rel="preload" as="style" href="https://fonts.googleapis.com/css2?family=Instrument+Serif:..." />
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Instrument+Serif:..." />
```

**Net delta:** 8 files × 4 line-deletes = 32 line-deletes; 0 new lines (Fira Code arrives through the existing `@import "@mkbabb/glass-ui/styles"` cascade). **Latency reduction:** removes Google Fonts CDN dependency for the mono stack on every page-load.

---

## § P-wave cross-repo write proposals

| ID | Item | Scope | Cost | Authority gate |
|---|---|---|---|---|
| **CR-3.1** | HeaderRibbon canonical adoption | 1 import rewrite + 1 dir delete (153 LOC) | Trivial | P cross-repo write |
| **CR-3.2** | `scale-on-hover` utility adoption | 10 files / 13 class renames | Trivial | P cross-repo write |
| **CR-3.cohort** | Single commit absorbing both | Same `EditorShell.vue` touch surface | Trivial | P cross-repo write |
| **CR-3-font** | Self-host Fira Code via glass-ui v1.5+ cascade | 8 HTML entries / 32 line-deletes | Trivial | P cross-repo write (separate commit; non-cohort) |

Items NOT requiring a P-wave write (formally retired or out-of-scope):

| Item | Retire rationale |
|---|---|
| 84 % UI-scaffolding | Consumer-orchestrator-owned per CONSTELLATION.md §6 (cross-repo authority boundary) |
| idle-bob ad-hoc | Single-consumer + 2-stop = J-invariant-10 fail; RETIRE-AS-INLINE |
| AB+1 primitive adoption | No substrate fit (animation-editor product; not metric/dashboard); circular-dep risk for AnimatedDigit |
| avatarVariants + installDarkModeSync renames | 0 usage; NO-IMPACT |

**Authority gate:** all four write items require explicit user authorization per the hardened agent git clause + P11's read-only mandate. This audit doc proposes; the P-wave implementation dispatch acts.

---

## § Verdict

**CLEAN with adoption opportunities.**

Build green at v1.7.0 (50.19 kB raw / 14.51 kB gzip). Eight subpath imports — zero retired-subpath drift; zero renames-induced breakage. The v1.4 → v1.7 substrate cohort is BINARY-TRANSPARENT to keyframes.js's import surface.

The two HIGH-leverage CR-3 migrations (HeaderRibbon + scale-on-hover) are concretely specified above as a single cohort-able P-wave commit (1 import rewrite + 1 dir delete + 13 class renames; net -153 LOC + 13 edited lines). The v1.5.0 font subsystem adds a third MEDIUM-leverage write (8 HTML entries; -32 lines; removes Google Fonts CDN dep for mono stack).

Four carry-bound items formally retire at P close:

1. 84 % UI-scaffolding — consumer-orchestrator-owned (CONSTELLATION.md §6).
2. idle-bob — J-invariant-10 fail; RETIRE-AS-INLINE.
3. AB+1 primitive adoption — no substrate fit.
4. avatarVariants + installDarkModeSync renames — 0 usage / NO-IMPACT.

**ZERO BLOCKERS. ZERO MINORS.** Substrate is clean across the K → L → M → N → O → AB+1 → P window. Adoption opportunities are well-bounded and authority-gated.

---

**Audit signature:** P11/d round-2 — keyframes.js v2.1.0 @ `7561af3` against glass-ui v1.7.0 @ `b201b03`. Build green. Eight subpaths consumed; zero drift. CR-3.1 (HeaderRibbon: -153 LOC; 1 import rewrite) + CR-3.2 (scale-on-hover: 10 files / 13 edits) concretized as single-commit cohort. CR-3-font (Fira Code self-host: 8 HTML / -32 lines) added as adjacent P-wave write. 84 % scaffolding + idle-bob + AB+1 + renames formally retired from carry with named rationales. Read-only invariant honored.

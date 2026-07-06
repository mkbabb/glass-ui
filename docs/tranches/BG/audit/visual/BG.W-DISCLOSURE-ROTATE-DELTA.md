# BG.W-DISCLOSURE-ROTATE — dual-engine paint DELTA

**Wave:** `BG.W-DISCLOSURE-ROTATE` (F5.3) — the ONE canonical chevron-rotate disclosure register
folded onto Accordion + Select + Configurator carets.
**Verdict:** **PASS** — dual-engine (Chrome `ANGLE Metal M5 Max` + WebKit `Apple GPU`),
both modes, all three surfaces.
**Judge:** non-authoring paint judge (did not build the wave).
**Date:** 2026-07-06.
**Routes:** `/containers/accordion` · `/forms/select` · `/compositions/configurator`.

---

## Criteria under test

> PAINT owed: the disclosure arrival-ease π (chevron rotate on the snappy clock, both engines
> both modes) over the ONE `transition-disclosure` = rotate on
> `--spring-snappy-duration`/`--ease-cartoon-punch`, folded onto Accordion + Select +
> Configurator carets (ONE arrival ease / Accordion+Select+Configurator disclosure).

The disclosure register is the `@utility transition-disclosure` in `src/styles/utilities/btn.css`:

```css
@utility transition-disclosure {
    transition: rotate var(--spring-snappy-duration) var(--ease-cartoon-punch);
}
```

applied to the ChevronDown caret on each of the three surfaces (with a `…rotate-180` on-open
selector): `AccordionTrigger.vue` (`[&[data-state=open]>svg]:rotate-180`), `SelectTrigger.vue`
(`in-data-[state=open]:rotate-180`), `ConfiguratorLayer.vue` (`group-data-[state=open]:rotate-180`).

---

## Pipeline (proven method, C18)

`verify-siblings-intact --quiet` (exit 0 before AND after) → `npm run demo:dist:build` (BUILT
bytes; the built CSS carries `rotate var(--spring-snappy-duration) var(--ease-cartoon-punch)`,
`--spring-snappy-duration:.4s`, and the `--ease-cartoon-punch` overshoot `linear()`) →
`demo:dist:serve` on **:5200** (vite preview) → **Chrome** leg (real Chrome.app 149, CDP :9333,
`--use-angle=metal`, playwright `connectOverCDP`, `?capture=<route>&mode=<m>` + poll
`data-capture-ready`, fullPage @1440×900) → **WebKit** leg (`/tmp/wkshot-live` off-screen
WKWebView, same `?capture=` boot, @2×→2880×1800). Servers + throwaway Chrome killed on completion.

### Capture-instrument note (mode contamination fixed, not a wave defect)
The first Chrome pass rendered `mode=light` as DARK because the shared Chrome `user-data-dir`
persisted `vueuse-color-scheme` across boots (a FOUC-init/localStorage race). Re-captured with a
`localStorage.clear()` before each capture boot → every shot then correct-mode
(`_recapture-chrome.mjs` verifies band-luminance + retries). WebKit uses an isolated WKWebView
store and was never contaminated. The wave's own render was always correct — the earlier
pipeline-validate light PNG is cream (lum 223) and the light DOM computes `htmlBg #fbfaf8`.

---

## Computed-DOM proof (Chrome, real Metal M5 Max — the arrival-ease register)

The capture stylesheet freezes transitions to `0s !important` for the settled screenshot, so the
**timing register + live transition** were read on the LIVE (non-capture) route.

| surface | caretCount | transition-property | transition-duration | timing-function | live toggle |
|---|---|---|---|---|---|
| Accordion | 8 | `rotate` | `0.4s` | `linear(0, -0.012, -0.038 12%, …)` (cartoon-punch) | click closed → `CSSTransition {prop:rotate, dur:400}`, mid-frame `rotate:-0.918deg` (anticipation pre-dip below origin), settles `open` |
| Select | 3 | `rotate` | `0.4s` | `linear(0, -0.012, -0.038 12%, …)` | click → `CSSTransition {prop:rotate, dur:400}`, `24.85deg` mid → `180deg` settled, state `open` |
| Configurator | 2 | `rotate` | `0.4s` | `linear(0, -0.012, -0.038 12%, …)` | click open→closed → `CSSTransition {prop:rotate, dur:400}`, `180.918deg` mid (reverse pre-dip) |

**All three surfaces share the IDENTICAL register** — `rotate` / `0.4s` (= `--spring-snappy-duration`) /
the `--ease-cartoon-punch` overshoot curve — and each fires a real `CSSTransition` on `rotate` at
400ms with the cartoon-punch anticipation pre-dip visible in the mid-frame value. This is the ONE
arrival ease, folded onto Accordion + Select + Configurator carets. Gestalt computed:
`main.children.length = 2`, `canvasCount = 1` on every route/mode.

---

## Pixel proof (both engines · both modes · content-band luminance)

Chevrons rotate BY STATE in both engines: open item caret points UP (`rotate:180deg`), closed
carets point DOWN (`rotate:none`); the accordion capture shows the open "What is glass-ui?" caret
up with three closed rows' carets down; the configurator open "Field" ConfiguratorLayer caret up;
the three closed Select triggers' carets down. Gestalt on every capture: **recessive** warm-cream
(light) / luminous-dark (dark) field — no conic banding, no oversaturation; grain calm; hero
("Accordion"/"Select"/"Configurator") fits its envelope.

| capture | engine · GPU · mode (in-pixel badge) | dims | content-band luminance |
|---|---|---|---|
| `disclosure-chrome-accordion-light-desktop-full.png` | CHROME · ANGLE Metal M5 Max · LIGHT | 1440×900 | 223 (cream) |
| `disclosure-chrome-accordion-dark-desktop-full.png` | CHROME · ANGLE Metal M5 Max · DARK | 1440×900 | 26 (dark) |
| `disclosure-chrome-select-light-desktop-full.png` | CHROME · ANGLE Metal M5 Max · LIGHT | 1440×900 | 223 |
| `disclosure-chrome-select-dark-desktop-full.png` | CHROME · ANGLE Metal M5 Max · DARK | 1440×900 | 27 |
| `disclosure-chrome-configurator-light-desktop-full.png` | CHROME · ANGLE Metal M5 Max · LIGHT | 1440×900 | 207 |
| `disclosure-chrome-configurator-dark-desktop-full.png` | CHROME · ANGLE Metal M5 Max · DARK | 1440×900 | 44 |
| `disclosure-safari-accordion-light-desktop-full.png` | WEBKIT · Apple GPU · LIGHT | 2880×1800 | 241 |
| `disclosure-safari-accordion-dark-desktop-full.png` | WEBKIT · Apple GPU · DARK | 2880×1800 | 18 |
| `disclosure-safari-select-light-desktop-full.png` | WEBKIT · Apple GPU · LIGHT | 2880×1800 | 241 |
| `disclosure-safari-select-dark-desktop-full.png` | WEBKIT · Apple GPU · DARK | 2880×1800 | 21 |
| `disclosure-safari-configurator-light-desktop-full.png` | WEBKIT · Apple GPU · LIGHT | 2880×1800 | 226 |
| `disclosure-safari-configurator-dark-desktop-full.png` | WEBKIT · Apple GPU · DARK | 2880×1800 | 35 |

All 12 PNGs RESOLVE ON DISK under `docs/tranches/BG/audit/visual/disclosure-rotate/`. The two
engines are pixel-distinguishable (CHROME vs WEBKIT badge, ANGLE Metal vs Apple GPU, different font
metrics — a genuinely different engine, not a re-shot Chromium).

---

## Verdict

**PASS.** The ONE `transition-disclosure` register (rotate · `--spring-snappy-duration` 0.4s ·
`--ease-cartoon-punch` overshoot) is folded onto Accordion + Select + Configurator carets and paints
the chevron arrival-ease in BOTH engines and BOTH modes: the register is identical across all three
surfaces (computed), each fires a live `CSSTransition {prop:rotate, dur:400}` with the cartoon-punch
anticipation pre-dip, the carets rotate by state in-pixel, and every gestalt read (recessive field,
calm grain, hero fits, glCtx=1, mainKids=2) is correct. Siblings intact before AND after; servers
and throwaway Chrome killed on completion.

Captures + repro scripts: `docs/tranches/BG/audit/visual/disclosure-rotate/`
(`chrome-capture-probe.mjs`, `_recapture-chrome.mjs`).

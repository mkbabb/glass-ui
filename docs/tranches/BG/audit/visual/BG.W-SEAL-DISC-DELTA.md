# BG.W-SEAL-DISC — dual-engine PAINT VERDICT (non-authoring judge)

**Wave:** F6.7 · BG.W-SEAL-DISC (SPEEDTEST-AX-INBOUND #1) · **src SHA:** `c7753e4f`
**Route:** `/feedback/completion-seal` · **Date:** 2026-07-03 · **Verdict:** **PASS**
**Judge:** non-authoring paint judge (did NOT build; verified painted truth vs criteria)
**Method:** built bytes on `:5200` (`demo:dist:build` + vite preview) — the PROVEN C18
`?capture=<route>&mode=<light|dark>` harness (poll `data-capture-ready`), BOTH engines
(Chrome real Chrome.app + CDP / Safari off-screen WKWebView, system WebKit+Metal), BOTH
modes. Gate `proof:completion-seal` GREEN (CS1–CS7 + CS6 self-test bites RED).

## The criteria (recovered — no explicit paint-clause string)

> `CompletionSeal shape="disc"` (joins {check|ring|wordmark}) + `personalBest:boolean`
> earned-gold garnish + the disc→ring→check draw SEQUENCING; kf5 `fromDrawSVG`
> decide-at-build over the CSS `stroke-dashoffset` floor (PRM/compositor laws hold).
> **Paint = the disc seal draws 0→full in earned gold with the personalBest garnish,
> both modes, dual-engine non-authoring.**

The four seals draw ONCE on mount then hold static; capture at `data-capture-ready`
(~4500ms) reads the **settled fully-drawn** endpoint of the 0→full draw (computed
`stroke-dashoffset` resolves to **0** → `--seal-draw: 100%`, the draw reached full).

## The evidence (4 PNGs — all resolve on disk, all 2880×1800 @2x)

| PNG | dim | bytes | badge ENGINE / GPU / MODE |
|---|---|---|---|
| `completion-seal-chrome-light-desktop-full.png` | 2880×1800 | 2.42 MB | CHROME / ANGLE Metal **Apple M5 Max** / LIGHT |
| `completion-seal-chrome-dark-desktop-full.png`  | 2880×1800 | 4.41 MB | CHROME / ANGLE Metal **Apple M5 Max** / DARK  |
| `completion-seal-safari-light-desktop-full.png` | 2880×1800 | 2.25 MB | **WEBKIT** / Apple GPU / LIGHT |
| `completion-seal-safari-dark-desktop-full.png`  | 2880×1800 | 3.16 MB | **WEBKIT** / Apple GPU / DARK  |

DOM probe JSON: `completion-seal-chrome-results.json` (per-seal computed reads).
Capture scripts: `scratchpad/seal-chrome-capture.mjs` (Chrome CDP) + `/tmp/wkshot-live`
(the proven WKWebView leg, source `docs/tranches/BG/audit/wkshot-live.m`).

## Computational checks (getComputedStyle / getAnimations — Chrome CDP, both modes)

7 `.completion-seal` nodes enumerated (4 shapes + 2 personal-best-pair discs + 1 re-inked
check — matches the story), all `data-drawn` + `data-play`, `role="status"`, 96×96 rect.

**Draw reached 0→full (all seals, both modes):** `stroke-dashoffset` computes to
`calc(100 - (100% * (1/1%)))` = **0** (dash `100`, offset `0` → 100% drawn, static held
via `both` fill). `getAnimations()` = **0** post-settle (one-shot completed, no loop —
the §6 calm register). `main.children` = 3, `canvases` = 1 (calm; no oversaturation).

**Earned-gold ink (`--seal-ink` resolved, per shape):**

| seal | LIGHT `--seal-ink` | DARK `--seal-ink` | read |
|---|---|---|---|
| disc / check / ring / wordmark (standard) | `oklch(0.751 0.147 84.2)` | `oklch(0.784 0.143 86)` | **gold** (hue ~84–86°, C ~0.14) ✓ |
| disc **personalBest** | `oklch(0.89 0.183 96.1)` | `oklch(0.898 0.182 97.4)` | **brighter+more-saturated gold LIFT** (ΔL +0.14, ΔC +0.036) ✓ |
| check **re-inked** (`--phase-complete-color` → ruby) | `oklch(0.52 0.176 8.4)` | `oklch(0.709 0.142 2.3)` | **ruby** (hue ~2–8°) — token-first lockstep ✓ |

Personal-best is a colour **LIFT within the gold family** (never a new hue — Q2 earned
gold), distinguishable both computationally AND in-pixel (visibly brighter/more-saturated
disc coin). The disc `__disc` face fill resolves translucent gold
(`oklab(0.751 … / α)`) — the whisper-gold glass coin the rim+check read on.

## Visual checks (all 4 PNGs, both engines, both modes)

- **Engine provenance decoded** in-pixel on all 4 (magenta-bordered top-left badge):
  CHROME/ANGLE-Metal-M5-Max and WEBKIT/Apple-GPU — real Metal, not SwiftShader.
- **disc** — the composed earned-coin reads: translucent gold disc FACE + the drawn gold
  rim RING around it + the gold CHECK drawn inside (disc→ring→check, all three layers
  fully drawn). ✓
- **check / ring / wordmark** — each a clean fully-drawn gold mark. ✓
- **Personal best row** — the `personalBest` disc coin is visibly a brighter, more
  saturated yellow-gold beside the warmer standard coin. ✓
- **Re-inked completion register** — the ruby (`--section-color-8`) check reads at the
  page bottom (dock-overlapped), confirming `--phase-complete-color` re-inks in lockstep. ✓
- **Cross-engine parity** — Chrome and Safari render the same gestalt in each mode; the
  warm-dark page (W-DARK-MATERIAL) reads calm, backdrop recessive (no conic, no
  oversaturation), hero heading + blurb fit their envelope. ✓

## Verdict

**PASS** — the disc seal draws 0→full in earned gold with the personalBest garnish, in
BOTH engines and BOTH modes, non-authoring dual-engine; the disc→ring→check sequencing,
the earned-gold LIFT garnish, and the token-first re-ink all read correct in-pixel AND in
computed DOM; every capture PNG resolves on disk. PRM/compositor laws hold at source
(the draw rides `stroke-dashoffset`/`transform`/`filter` under the `no-preference` gate;
`proof:completion-seal` CS5 GREEN). No defects.

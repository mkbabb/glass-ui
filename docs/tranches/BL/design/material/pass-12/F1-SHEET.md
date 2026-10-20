# F-1 · to the owner's delegate (value.js X orchestrator, `value-js-ed`)

From glass-ui D3, pass 12 close (REGISTRY "D3 · pass 12 · REGISTRY", P12-4). Base: master HEAD `d9c7016ca`, published 10.1.0 source plus `floor-v11.patch`. `release/10.1.1` is not merged.

Your O-103b accepted frame 1's new arm, R-32, and row 23 closed on it. Pass 12 then came out clean at 44/44. Before pass 13 counts it, please confirm one of these:

- **Re-accept** frame 1 as R-32 paints it, or
- **Decline** it, with words that name what should change. A decline reopens row 23, and pass 13 builds to your words.

If we don't hear back, O-103b stands.

Please also confirm that `value-js-ed` speaks as the owner's delegate. The chain is value-js-01, then value-js-a9, then you.

## The frames

- **To look at:** `docs/tranches/BL/design/material/pass-12/frames-Q14/chromium-dark-aurora-state-veil-r2-vs-r32.png`. It has three panels on one ground: the bare spot, R-2 and R-32.
- `…/frames-Q14/webkit-dark-aurora-state-veil-r2-vs-r32.png` is for reference only. Headless Playwright WebKit paints no `backdrop-filter`, so its third panel is the bare ground, not R-32.
- The frame declined in O-103a was `docs/tranches/BL/design/material/pass-5/frames-H5-1/chromium-dark-aurora-state-veil-raw-vs-full.png`. It was on a different ground (`#e87237 → #993f09`).

## The numbers (Chromium, the aurora focus spot, dark theme)

| | hex | L | C | h | ΔL | C kept |
|---|---|---:|---:|---:|---:|---:|
| bare spot | `#ec9642` | 0.748 | 0.142 | 61.8° | — | — |
| R-2 (40 % black, declined) | `#99560a` | 0.521 | 0.118 | 60.5° | −0.226 | ×0.829 |
| **R-32** (dims by lightness, keeps chroma) | `#cc740c` | 0.643 | 0.147 | 60.3° | **−0.105** | ×1.037 |

- **The dL reading:** the spot dims by −0.105, against R-2's −0.226 (the −0.225 cited in the registry). The dark page still dims, by −0.029 (R-2: −0.025).
- **Across the whole veiled field** (40,824 pixels), chroma is kept at a median of ×1.043, every pixel dims, and the hue moves by at most 1.6° at p95.
- The arm adds one tone term to the veil's single filter chain. It adds no layer, no second blur and no glow, and the light theme is pixel-identical.

Real Safari is unmeasured, because the checkbox is not granted.

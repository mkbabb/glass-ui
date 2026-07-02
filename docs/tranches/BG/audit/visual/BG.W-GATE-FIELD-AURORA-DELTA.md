# BG.W-GATE-FIELD-AURORA — NON-AUTHORING dual-engine paint verdict

**Verdict: PASS (flip PAINT-PENDING → DONE).** Judged (non-authoring — did not build it)
against the row-12.5 pass condition:
_"the light-arm eyebrow caption clears AA over the recessive aurora field (mirroring the
shipped dark-arm lift), verified by a NON-AUTHORING dual-engine capture, BOTH modes."_

This wave is the **polish that closes the sibling `BG.W-FIELD-AURORA` mustFix #3** — the light
mono-caption eyebrow `.section-label` over the recessive warm shell field measured a borderline
**4.15:1** (Chrome) there. The F1 source (`56b9b97b`, `src/styles/typography/utilities.css`)
warm-mixes the eyebrow ink toward `--foreground` (`color-mix(in oklab, var(--neutral-5),
var(--foreground) 22%)`), scoped `:root:not(.dark) [data-paper-field] .section-label:not(.section-label--tinted)`.
The painted result now clears AA **5.74–6.42:1** in light across BOTH engines, while dark stays
byte-untouched at **6.5–7.18:1**.

---

## Capture provenance (PROVEN C18 `?capture=` pipeline, BUILT bytes on :5200)

- **Build:** `npm run demo:dist:build` (vite, exit 0) → `npm run demo:dist:serve` (vite preview
  `:5200`). Every `?capture=…` route probed `== 200` before capture.
- **Chrome leg:** real Chrome.app (149.0.7827.201) over CDP `:9456`; in-pixel badge decode =
  **ENGINE CHROME · GPU `ANGLE (Apple, ANGLE Metal Renderer: Apple M5 Max, Unspecified Version)`**
  (hardware Metal, NOT SwiftShader). 1440×900 @2x → 2880×1800. Probe + shot via
  `BG.W-GATE-FIELD-AURORA-chrome-capture.mjs`; probe JSON `…-paint/chrome-results.json`.
- **Safari leg:** off-screen `wkshot-live` WKWebView (system WebKit.framework / Metal); badge
  decode = **ENGINE WEBKIT · GPU `Apple GPU`**. 1440×900 @2x → 2880×1800.
- **12 PNGs on disk** under `docs/tranches/BG/audit/visual/BG.W-GATE-FIELD-AURORA-paint/`
  (`{chrome,safari}-<route>-<mode>.png`, 3 routes × 2 modes × 2 engines). All RESOLVE, all
  **2880×1800** (`sips`-verified), all content-real (1.7–4.2 MB), all badge-decoded.

| route | chrome-light | chrome-dark | safari-light | safari-dark |
|---|---|---|---|---|
| /foundations/intro | ✓ | ✓ | ✓ | ✓ |
| /foundations/colors | ✓ | ✓ | ✓ | ✓ |
| /foundations/typography | ✓ | ✓ | ✓ | ✓ |

---

## 1 · The binding subject — light-arm eyebrow AA over the recessive `[data-paper-field]` shell field (PASS)

The eyebrow **INK** is CSS-deterministic (read once via Chrome `getComputedStyle`,
engine-independent); the **FIELD** is sampled PER-ENGINE PER-MODE from the captured PNGs (median
of text-free patches around/right-of the short eyebrow text; worst-case = min contrast). WCAG
contrast = `(ink, field)`.

Light-mode ink resolves `oklab(0.45765 0.0141554 0.0321254)` → sRGB `[101,84,67]`, **OKLab L 0.458,
H 66.8° (warm amber — no gray/green)** — a clean darken off the raw `--muted-foreground`
(`#7c6650`, L≈0.50), confirming the `+22%-toward-foreground` mix FIRED.

| route | mode | engine | eyebrow ink (L / H) | min contrast | median | AA 4.5 |
|---|---|---|---|---|---|---|
| /foundations/colors | light | chrome | 0.458 / 66.8° | **5.78** | 5.81 | ✓ |
| /foundations/colors | light | safari | 0.458 / 66.8° | **6.42** | 6.43 | ✓ |
| /foundations/typography | light | chrome | 0.458 / 66.8° | **5.74** | 5.81 | ✓ |
| /foundations/typography | light | safari | 0.458 / 66.8° | **6.42** | 6.43 | ✓ |
| /foundations/colors | dark | chrome | 0.712 / 73.5° | **6.50** | 6.69 | ✓ |
| /foundations/colors | dark | safari | 0.712 / 73.5° | **7.18** | 7.32 | ✓ |
| /foundations/typography | dark | chrome | 0.712 / 73.5° | **6.50** | 6.64 | ✓ |
| /foundations/typography | dark | safari | 0.712 / 73.5° | **7.18** | 7.32 | ✓ |

- **Light lift confirmed** — every light eyebrow clears 4.5 comfortably (5.74–6.42), a decisive lift
  off the sibling's borderline 4.15. Cross-engine: Safari's field is a hair lighter → higher ratio.
- **Dark byte-untouched** — dark eyebrow ink = raw `#aca091` (`rgb(172,160,145)`), the rule scoped
  `:root:not(.dark)` so `.dark` never applies; the dark register still clears its ~6.5–7.18 (the
  shipped `b3d65eec` dark lift). No regression.
- **`--tinted` accent eyebrow + non-field + page-muted contexts** are out of the rule's scope
  (`:not(.section-label--tinted)` + `[data-paper-field]` gate) — byte-untouched by construction.

## 2 · Visual gestalt (PASS, both engines both modes)

- **Recessive warm field** — the `/foundations/colors` + `/typography` shell field reads as a calm
  warm-cream plane: **NO conic banding, NO oversaturation, grain calm**, the eyebrow the dimmest
  legible secondary element. Consistent Chrome↔Safari.
- **Hero fits its envelope** — the `Colors` / `Typography` / `Aa` heroes sit cleanly in the header
  band; the eyebrow → h1 → blurb cluster reads top-to-bottom; the dock reads over the field.
- **`/foundations/intro` is a FOCAL section-landing hero** (`shellFieldActive=false` → NO
  `[data-paper-field]`); the light-arm lift rule INTENTIONALLY does not apply there (its eyebrow
  sits over its own focal hero field, the sibling `BG.W-FIELD-AURORA` wave's concern). Captured
  content-real both modes both engines for completeness; not a subject of this wave's AA lift.

---

## Gate-arm note (record-only — outside the paint judge's scope)

The row-12.5 gate arm lists the value.js `^1.1.1` gate-LITERAL pin
(`proof-peer-conformance.mjs:41/46` `1.2.0→1.1.1`) + a `field-aurora-aa` (`wcagContrastRatio`)
gate. At HEAD `proof-peer-conformance.mjs` still pins `@mkbabb/value.js: "1.2.0"` and no
`field-aurora-aa`/`wcagContrastRatio` gate script exists — **consistent with the row's own AMEND**
("gate-authoring PRUNED into landed 2.2; the WS7→WS12 peer born-RED window closes at
BH.B2-export-reshape"). The gate-authoring is deferred; the PAINT subject (the `utilities.css`
eyebrow rule, `56b9b97b`) IS landed and is what this non-authoring capture binds. `proof:peer-conformance`
is GREEN at HEAD (1.2.0 == PINNED_LATEST), matching the F1 commit claim.

## Artefacts

- PNGs (12): `docs/tranches/BG/audit/visual/BG.W-GATE-FIELD-AURORA-paint/{chrome,safari}-<route>-<mode>.png`
- Chrome probe JSON: `…-paint/chrome-results.json` (eyebrow rects/ink/tokens + GL_RENDERER).
- Pixel analysis (OKLab + WCAG): `…-paint/pixel-analysis.json`
  (`BG.W-GATE-FIELD-AURORA-pixel-analysis.mjs`).
- Capture harness: `BG.W-GATE-FIELD-AURORA-chrome-capture.mjs` (Chrome CDP leg).

**Both engines · both modes · every PNG resolves on disk · AA lift painted-verified → PASS.**

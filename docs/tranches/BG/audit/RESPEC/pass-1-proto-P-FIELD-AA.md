# P-FIELD-AA — `proof:field-aurora` composited-AA arm: SOUND 2nd consumer + correct born-RED anchor + the Safari-arm decision

**Prototype-augmented spec · PASS 1 · 2026-06-30 · branch `tranche/BG` · HEAD `tranche/BG` tip**
**Fence:** READ-MOSTLY audit. This doc RECORDS the buildable spec; ZERO src/demo/styles/scripts edits made — every file path below is a BUILD instruction, not a landed change. `verify-siblings-intact --quiet` exits 0 before + after; only untracked write is this file under `RESPEC/`.

**Feasibility verdict: FEASIBLE — the three defects are real, each fix is grounded in a verified on-disk fact, and each is a small correction to the P6 prototype (NOT a re-architecture).** P6 (`pass-1-proto-P6.md`) is the load-bearing spec for the AA-over-composite arm and HOLDS in its skeleton (the CI-proves-armed / local-proves-pixels split, the value.js one-color-math, the median-reject sampler, the standing roster). This doc is the **three-defect repair layer ON P6** that G6 (`pass-1-spec.md §3`) names: replace the unsound consumer #2, fix the born-RED anchor, decide the Safari arm. P6 is otherwise inherited verbatim.

---

## 0. The three defects, re-verified live on disk (not on report faith)

The re-spec G6 names three faults in P6's AA-over-composite arm. I re-ran each on disk:

| # | P6 claim | Verified on disk | Verdict |
|---|---|---|---|
| **D1** | Consumer #2 = `/dock/overview`, register `{ id: "dock-label", selector: ".glass-dock .dock-label" }` | `.dock-label` is rendered by **NO** SFC. `grep -rn 'class="dock-label"' src demo` ⇒ 0 element matches; the ONLY hits are CSS styling hooks (`density.css:441/446`, `typography.css` `--dock-label-size`) + the README. `DockIconButton.vue` renders a **bare SVG glyph** (a `vSpecular` `::before` material icon button, no text node). `DockTabButton.vue` is `<Primitive><slot/></Primitive>` (the consumer slots short text, no `.dock-label`). | **CONFIRMED UNSOUND** — fictional selector; and even the real dock glyph is a **graphical object (WCAG 1.4.11 → 3:1)**, not text (4.5:1). |
| **D1b** | The sampler `sampleFieldBehindText` probes `textRect.x + textRect.w + 24` (a +24px adjacent patch). | The dock control plate is `--dock-control-size` ≈ `2.5rem` (40px). A +24px patch from a glyph centred in a 40px plate lands **OUTSIDE the plate**, onto the raw field. The pixel read then measures `text-vs-raw-field`, but the glyph composites over `glyph-vs-plate-over-field-over-page` — a **confidently-wrong ratio**. The luck-catch (`BG.W-FIELD-AURORA-pixel-analysis.mjs`) only ever probed `/foundations/colors` hero/eyebrow over the **raw field** (no plate) — the dock through-plate case was **never pixel-validated**, it was a spec assertion. | **CONFIRMED UNSOUND** — the +24px sampler is correct ONLY for the raw-field topology (large, low-frequency, no plate); it is wrong for any small-plate through-plate surface. |
| **D2** | Born-RED anchor: "the broken field commit (`cb8ecdfc` range, before `b3d65eec`) re-shootable for the anchor." | `git merge-base --is-ancestor`: **`cb8ecdfc` is 2 commits AFTER `b3d65eec`** (the fix), not before. Lineage: `ebf6e45b` (HERO-FIT) → **`b3d65eec` (the dark-field FIX)** → `9e13965d` → `cb8ecdfc`. Re-shooting `cb8ecdfc` captures the **FIXED (GREEN, 13.87:1) field** — a born-GREEN anchor, the exact circular-fixture trap the gate must avoid. | **CONFIRMED WRONG** — P6's anchor instruction is internally contradictory. Correct anchor = **`b3d65eec~1` = `ebf6e45b`** (the immediately-pre-fix BROKEN state). |
| **D3** | P6 captures `field-aurora.spec.ts` on Playwright (implicitly chromium); the Node `F-AA-LIVE` reads `<surface>-<mode>-<vp>.png` (engine-agnostic, no `safari-` leg). | The 2.2 collapse was **dual-engine and DIVERGED per engine** (`PAINT-PASS-LOG.md:106-108`): the broken dark composite read **L0.70 / muted 1.04:1 on Chrome** but **L0.55 / muted 1.91:1 on Safari** — same config, DIFFERENT engine composite (per-engine WebGL2/WebGPU saturate·brightness·tone-map·DPR divergence). A Chrome-only read has a **per-engine blind spot**: a future field collapse can cross 4.5:1 on one engine and not the other. | **CONFIRMED UNCOVERED** — the gate must read BOTH engine composites; P6's single-PNG arm sees only Chrome. |

**The lineage proof (D2), verbatim:**
```
$ git log --oneline -1 b3d65eec
b3d65eec BG WS1 (BG.W-FIELD-AURORA): dark-aware shell field — luminous-ember dark palette (composite L~0.13), dark-mode hero AA cleared [paint-pending]
$ git log --oneline -1 b3d65eec~1
ebf6e45b BG paint (BG.W-HERO-FIT): dual-engine PASS Chrome+Safari both modes -> DONE
$ git merge-base --is-ancestor b3d65eec cb8ecdfc; echo $?   # 0 ⇒ b3d65eec IS an ancestor of cb8ecdfc (cb8ecdfc is LATER)
0
$ git log --oneline b3d65eec~1..cb8ecdfc
cb8ecdfc … re-paint-fix note …
9e13965d … CATEGORY-CARD-WARM …
b3d65eec … dark-aware shell field [THE FIX] …
```

**The per-engine divergence proof (D3), verbatim** (`PAINT-PASS-LOG.md:106-108`):
> the recessive shell aurora uses a light-L palette (L 0.90-0.94) at a hardcoded `opacityCeiling 0.5` for BOTH modes, so over the near-black W-DARK-MATERIAL page it composites to a mid-light warm-brown wash (**L 0.70 Chrome / 0.55 Safari**). Measured `/foundations/colors` dark: hero h1 "Colors" 2.14:1 (Chrome) … hero eyebrow/blurb muted **1.04:1 Chrome / 1.91:1 Safari** (catastrophic vs AA 4.5 — effectively invisible)

**Critical on-disk state (the anchor cannot be re-derived from current captures):** the live PNGs at `docs/tranches/BG/audit/visual/BG.W-FIELD-AURORA-paint/{chrome,safari}-*.png` are the **POST-FIX re-paint set** (dark field L0.16-0.22, GREEN) — the re-paint batch wrote into the SAME dir, overwriting the broken-state PNGs. So the born-RED anchor **must be re-shot** from `b3d65eec~1`; it is not recoverable from disk.

---

## 1. Defect D1 fix — replace consumer #2 with a SOUND through-plate surface + a within-plate sampler + a WCAG-register-honest bar

The fix is THREE coupled corrections (the roster register, the sampler, the bar). All three are needed: a sound surface read by an off-plate sampler is still wrong; a sound sampler against a graphical-object measured at 4.5 is still wrong.

### 1.1 — The sound consumer #2: a large glass Card with a muted CardDescription over the shell field (`/display/card`)

The two DISTINCT, SOUND composite topologies the ≥2-consumer bar wants:

- **Topology A (raw-field) — consumer #1, UNCHANGED from P6.** Text directly over the field, **no plate** (`opacityCeiling 0.5`, the field IS the fill). `/foundations/colors` hero `h1` (large 3.0) + eyebrow `.section-label` (4.5 — the literal 2.2 victim) + blurb body (4.5). The field is large + low-frequency, so an adjacent patch == the composite behind the text. The luck-catch already PROVED this surface (1.04→13.87 over the real field).
- **Topology B (through-plate) — consumer #2, REPLACES dock-overview.** A muted **`CardDescription`** over a **large glass `<Card>`** over the recessive shell field — the `plate-over-field-over-page` composite. This is the case the W55/W-DARK-MATERIAL glass-tint seam is SUPPOSED to lift (the muted register on a translucent plate over the field); if it doesn't, the caption collapses exactly as the 2.2 hero muted did. **Distinct topology** from #1 (a plate is interposed) — it proves the PIXEL read is layer-agnostic where a token composite would have to model N layers.

**Concrete route: `/display/card`** (the literal Card showcase). Verified sound on three axes:
1. **The shell field paints behind it.** `demo/router.ts:107` sets `shellFieldActive = !to.meta?.focal`; `focal.ts:67` `isFocalRoute = (kind ∈ GL_BG_KINDS) || (routeId ∈ SELF_STAGES_GL)`. `/display/card` carries a non-GL `background.kind` (display category) and is NOT a `SELF_STAGES_GL` dock route ⇒ **NOT focal ⇒ `shellFieldActive = true` ⇒ the shell `<Aurora>` field paints.**
2. **The register is GENUINE text.** `CardDescription.vue` renders `<p data-slot="card-description" class="text-sm text-muted-foreground-strong">` — a real muted body caption at `text-sm` (≈14px regular) ⇒ governed by the **4.5:1 text rule** (no graphical-object ambiguity). `data-slot="card-description"` is a STABLE library selector (not a fictional class).
3. **The plate is LARGE.** A `<Card>` is a full content plate (≫ 40px), so a within-plate patch clears the text and stays on the plate composite.

> **Selector-resolution discipline (the `[ROUTE-RESOLVES]` floor, the `proof:ba-gestalt` precedent applied to selectors).** The building agent confirms at build time that on `/display/card`: (a) `[data-slot="card"]` (or `.glass-card`) resolves to a glass plate, (b) a descendant `[data-slot="card-description"]` resolves to a muted `<p>`, (c) the shell `<Aurora>` canvas paints behind the card (non-degenerate field sample). If `/display/card` ever loses the shell field (a future focal re-class), the **FALLBACK consumer #2 is a SECOND register on `/foundations/colors`** — its body card section (the color-tour cards carry CardDescription-class captions) over the SAME confirmed field. Either way the in-test `expect(missing).toBeFalsy()` reds a stale selector loudly (never silent-passes).

**The dock case is NOT deleted from the universe — it is RE-CLASSED.** If a dock-glyph AA read is ever wanted, it enrolls as a **`kind: "graphical"` register (3.0 bar) with a within-plate sampler** (§1.3), NEVER as a 4.5 text register over an off-plate patch. The roster comment records this so a future agent does not re-mint the fictional `.dock-label`.

### 1.2 — The corrected roster schema (textSelector + surfaceSelector + kind)

`scripts/lib/field-aurora-aa-roster.mjs` — each register now declares the TEXT element AND the SURFACE (plate) it composites over AND its WCAG kind. The `surfaceSelector` is what makes the within-plate sampler possible.

```js
// scripts/lib/field-aurora-aa-roster.mjs
// The standing field-composited-AA roster. Every glass-over-field PAINT-PENDING wave
// ADDS its surface here before flipping its row (the recurring-class fix — turn the 2.2
// luck-catch into a STANDING net). Each register declares: the TEXT element (the legibility
// subject), the SURFACE element it composites OVER (the plate the within-plate sampler reads
// — for a raw-field surface this is the field container/viewport; for a through-plate surface
// it is the card/plate), and the WCAG kind (text → 4.5 / large-text DERIVED → 3.0 / graphical
// → 3.0, the 1.4.11 non-text rule). The bar is NEVER hand-pinned; it is DERIVED (§1.4).
export const FIELD_AA_ROSTER = [
  {
    // CONSUMER #1 — Topology A (RAW-FIELD). Hero text DIRECTLY over the shell aurora field
    // (no plate; opacityCeiling 0.5). The literal 2.2 surface (muted 1.04 dark, caught by
    // re-paint). surfaceSelector is the field CONTAINER (the StoryHero root over the field) —
    // huge + low-frequency, so the within-plate sampler degrades to the proven adjacent-patch.
    id: "foundations-colors", route: "/foundations/colors",
    fieldSurface: ".story-hero",            // the field-bearing container (raw-field plate == the field band)
    registers: [
      { id: "hero-h1",      textSelector: ".story-hero h1",            kind: "text" }, // large DERIVED ⇒ 3.0
      { id: "hero-eyebrow", textSelector: ".story-hero .section-label", kind: "text" }, // small ⇒ 4.5 (the 2.2 victim)
      { id: "hero-blurb",   textSelector: ".story-hero p",             kind: "text" }, // small ⇒ 4.5
    ],
  },
  {
    // CONSUMER #2 — Topology B (THROUGH-PLATE). A muted CardDescription over a LARGE glass
    // Card over the recessive shell field (plate-over-field-over-page). REPLACES the unsound
    // dock-overview/.dock-label (fictional class + off-plate +24px sampler). /display/card is
    // NON-FOCAL (shellFieldActive=true ⇒ the shell aurora paints) and CardDescription is genuine
    // 14px muted body text (4.5:1). The within-plate sampler reads the CARD plate composite.
    id: "display-card", route: "/display/card",
    // surfaceSelector is per-register (each caption's OWN card); the sampler clamps to it.
    registers: [
      { id: "card-desc", textSelector: "[data-slot='card-description']",
        surfaceSelector: "[data-slot='card']", kind: "text" }, // 14px ⇒ 4.5 over the card-over-field
    ],
  },
  // STANDING-ENROLLMENT: WS2 dock (as a kind:"graphical" 3.0 register WITH surfaceSelector =
  // the dock control plate + a within-plate sampler — NEVER the fictional .dock-label/4.5),
  // WS5 viz panels, WS6 siri, WS8 glass-deep, WS11/WS12 storybook — each adds its glass-over-
  // field surface row HERE at its PAINT-PENDING flip. The roster grows; the net is standing.
];
```

> **Selectors are placeholders to confirm at build time** (the `[ROUTE-RESOLVES]` discipline §1.1). `.story-hero` / `.section-label` are inferred from `StoryHero.vue`; `[data-slot='card*']` are verified library-canonical (`Card.vue` / `CardDescription.vue` `data-slot` attrs). The `fieldSurface` (consumer #1) vs per-register `surfaceSelector` (consumer #2) split: a raw-field surface declares ONE field container for all registers; a through-plate surface declares the plate PER register (each caption's own card).

### 1.3 — The within-plate sampler (replaces the blind +24px adjacent-patch)

`scripts/reflect-capture-verify.mjs` — `sampleFieldBehindText` is REPLACED by `sampleCompositeBehindText`, which clamps the patch to the SURFACE rect the text sits on (the plate for through-plate; the field container for raw-field). The smoothness validity gate + the median-reject decode are UNCHANGED from P6 (the no-second-IDAT-inflate fence holds — it reuses `decodePngRgba`).

```js
/**
 * Sample the COMPOSITED fill behind a glyph (the layer-agnostic read), CLAMPED to the
 * SURFACE the text composites over. Fixes P6's blind +24px adjacent-patch: a +24px offset
 * from a glyph in a 40px dock plate lands on the RAW FIELD beyond the plate edge (the
 * confidently-wrong ratio). Here every candidate patch must lie INSIDE `surfaceRectCss` —
 * the plate (through-plate) or the field container (raw-field). The text-free candidates are
 * the four interior gutters of the surface AROUND the text rect, each offset INWARD; the
 * first whose stddev < smoothCeil AND whose box stays inside the surface is the valid read.
 * null ⇒ no smooth in-surface patch (the measurement-validity FAIL — the caller reds LOUD,
 * never silent-passes). A surface too small to yield a clean patch is not a valid AA-over-
 * field consumer (resize or de-enroll); it is NOT a green.
 *
 * @param absPath           the captured PNG
 * @param textRectCss       the glyph rect (CSS-px, the probe.json shape)
 * @param surfaceRectCss    the plate/field-container rect the text composites OVER (CSS-px)
 * @param viewportCss       {w,h} CSS viewport (→ fractional region, resolution-independent @1x/@2x)
 * @returns {{rgb:[number,number,number], stddev:number} | null}
 */
export function sampleCompositeBehindText(absPath, textRectCss, surfaceRectCss, viewportCss, opts = {}) {
  const smoothCeil = opts.smoothCeil ?? 9;   // pixel-analysis.mjs sd<9 smooth-field filter (kept)
  const rCss = opts.patchR ?? 10;            // patch half-size
  const pad = rCss + 4;                      // keep the whole patch off the plate edge / inside the surface
  const T = textRectCss, S = surfaceRectCss;
  // Candidate centres: the four in-surface gutters around the text, each pulled INWARD so the
  // patch box stays within S. Ordered: right-of-text, below-text, left-of-text, above-text.
  const cand = [
    { x: T.x + T.w + pad,        y: T.y + T.h / 2 },          // right gutter, in-plate
    { x: T.x + T.w / 2,          y: T.y + T.h + pad },        // bottom gutter, in-plate
    { x: T.x - pad,              y: T.y + T.h / 2 },          // left gutter, in-plate
    { x: T.x + T.w / 2,          y: T.y - pad },              // top gutter, in-plate
  ];
  const insideS = (cx, cy) =>
    cx - rCss >= S.x + 1 && cx + rCss <= S.x + S.w - 1 &&
    cy - rCss >= S.y + 1 && cy + rCss <= S.y + S.h - 1;
  for (const c of cand) {
    if (!insideS(c.x, c.y)) continue;        // a candidate that would read off-plate is REJECTED, not used
    const region = {
      x: (c.x - rCss) / viewportCss.w, y: (c.y - rCss) / viewportCss.h,
      w: (2 * rCss) / viewportCss.w,  h: (2 * rCss) / viewportCss.h,
    };
    const s = pngMedianRgbStddev(absPath, region);  // median RGB + luma stddev over decodePngRgba (P6 §2.1)
    if (s && s.stddev < smoothCeil) return s;
  }
  return null;  // measurement-validity FAIL: no smooth in-surface patch → the AA read is unmeasurable, RED
}
```

**The raw-field degenerate case is preserved.** For consumer #1 the `surfaceRect` = the `.story-hero` container (the full field band, ≫ the text), so the right/below gutters are in-surface and the sampler behaves exactly as the proven luck-catch +offset read. The fix is purely ADDITIVE (a clamp); it never makes the raw-field read worse.

### 1.4 — The WCAG-register-honest bar (text 4.5 / large-text 3.0 DERIVED / graphical 3.0)

`auroraCompositeAaVerdict` (in `reflect-capture-verify.mjs`) gains a `kind` input so a graphical object is honestly 3.0 (WCAG 1.4.11), not falsely 4.5. Large-text is DERIVED from font metrics (never hand-pinned).

```js
import { RGBColor, wcagContrastRatio } from "@mkbabb/value.js"; // the ONE color-math source (§P6 2.1)

export function wcagRatio8(rgbA, rgbB) {
  return wcagContrastRatio(new RGBColor(rgbA[0], rgbA[1], rgbA[2]), new RGBColor(rgbB[0], rgbB[1], rgbB[2]));
}

/**
 * The PURE composited-AA verdict (no PNG, no browser — the self-test exercises it
 * deterministically). `fieldRgb` is the COMPOSITED fill the within-plate sampler returns;
 * `textRgb` is the glyph's computed colour. The register bar:
 *   - kind === "graphical"               → 3.0   (WCAG 1.4.11 non-text contrast — a bare SVG glyph)
 *   - large text (≥24px OR ≥18.66px+700) → 3.0   (WCAG 1.4.3 large-text — DERIVED, never hand-pinned)
 *   - otherwise                          → 4.5   (WCAG 1.4.3 body text)
 * The kind fix is the D1 closure: a dock glyph enrolled as "graphical" is measured at 3.0,
 * never the 4.5 P6 would have applied to the fictional ".dock-label" text register.
 */
export function auroraCompositeAaVerdict({ textRgb, fieldRgb, fontPx, fontWeight, kind = "text" }) {
  const large = fontPx >= 24 || (fontPx >= 18.66 && fontWeight >= 700);
  const bar = kind === "graphical" ? 3.0 : large ? 3.0 : 4.5;
  const ratio = wcagRatio8(textRgb, fieldRgb);
  return { ratio, bar, large, kind, pass: ratio >= bar };
}
```

---

## 2. Defect D2 fix — the born-RED anchor is `b3d65eec~1` (`ebf6e45b`), re-shot DUAL-ENGINE

P6's `cb8ecdfc`-range anchor is POST-fix (re-shoots GREEN). The correct anchor is the **immediately-pre-fix broken commit `b3d65eec~1` = `ebf6e45b`** — the state with the shell aurora mounted (`274a2a6e`) carrying the SINGLE light palette, so the dark composite is the broken brown wash (Chrome 1.04 / Safari 1.91 muted).

**The anchor re-shoot ceremony (the building agent runs ONCE; the artifact is committed, the gate never re-runs it):**

1. In a **FRESH throwaway worktree** (`git worktree add .claude/worktrees/field-aa-anchor b3d65eec~1` — NEVER `~/Programming`, NEVER `/tmp` move of a sibling; the foreign-tree fence), build the demo dist (`npm run demo:dist:build`) and serve `:5200`.
2. Capture `/foundations/colors` **dark** mode, **BOTH engines** (the C18 `?capture=` harness: Chrome CDP real-Metal + the `wkshot-live` WKWebView), at the desktop viewport.
3. Probe the muted `.section-label` register's computed colour + rect; sample the composited field behind it with `sampleCompositeBehindText`; assert the verdict REDs (Chrome ≈1.04 < 4.5, Safari ≈1.91 < 4.5 — both fail, matching the recorded `PAINT-PASS-LOG.md:108`).
4. Commit the anchor captures + probes UNDER glass-ui (the no-`/tmp`, no-foreign-tree fence) at:
   ```
   docs/tranches/BG/audit/visual/field-aurora-aa/_anchor/
     ├── chrome-foundations-colors-dark.png   + .probe.json   (Chrome 1.04 broken composite)
     └── safari-foundations-colors-dark.png   + .probe.json   (Safari 1.91 broken composite)
   ```
   The `_anchor/` dir is `_`-prefixed so the `--run pi` capture glob (`!/^_/`) EXCLUDES it from the live capture set — it is a born-RED FIXTURE, not a live surface.
5. Remove the throwaway worktree (`git worktree remove`); `verify-siblings-intact --quiet` exits 0.

**Why dual-engine at the anchor:** the broken state DIVERGED per engine (1.04 vs 1.91). A Chrome-only anchor would let a future Safari-only collapse ship green against a Chrome-passing fixture. The anchor must carry BOTH engine composites so `F-AA-LIVE`'s Safari sub-clause (§3) has a real Safari born-RED to flip.

**The device-free self-test uses the RECORDED numbers (non-circular, no GPU).** `F-AA-SELFTEST` exercises `auroraCompositeAaVerdict` over the historically-MEASURED 2.2 pairs (the DELTA / PAINT-PASS-LOG numbers, NOT agent-invented fixtures): the broken Chrome pair MUST return `pass:false` (≈1.04), the broken Safari pair MUST return `pass:false` (≈1.91), the fixed pair MUST return `pass:true` (≈6.7), and the bar MUST resolve 4.5/3.0/3.0 for text/large/graphical. This is the armed-detector witness that runs on CI (no Metal needed). The LIVE pixel anchor (`_anchor/*.png`) is the local `--run ship` born-RED; the recorded-number self-test is the CI born-RED.

---

## 3. Defect D3 decision — the Safari arm: cover BOTH engines, via the Mac-only `--run ship` wkshot ceremony (NOT Playwright-webkit, NOT CI)

### 3.1 — The decision

**DECIDED: the field-composited-AA arm covers Safari per-engine — the born-RED anchor AND the `F-AA-LIVE` arm both read `chrome-*` AND `safari-*` captures and assert AA on each — but the Safari LIVE leg rides the existing Mac-only `--run ship` C-SAFARI ceremony (`proof:ship-attestation` / `wkshot-live`), is `["local"]`-reported-only (never a CI red), and is safaridriver-or-DROP-WITH-TRIGGER honest.**

This is NOT "add Safari coverage as a new mechanism" — it is "wire the field-AA arm into the C-SAFARI ceremony the tranche ALREADY builds." Three load-bearing reasons it must be this shape, not Playwright-webkit-on-CI:

1. **The per-engine composite divergence is REAL (the reason to cover Safari at all).** Same config, Chrome L0.70/1.04 vs Safari L0.55/1.91. The WebGL2/WebGPU saturate·brightness·tone-map·DPR pipeline differs per engine, so a Chrome-only read has a genuine blind spot — a future field whose dark composite crosses 4.5 on one engine but not the other ships green under a single-engine gate. The arm MUST read both.
2. **Playwright's bundled `webkit` is GL-UNFAITHFUL — it cannot be the capture path.** `playwright.config.ts:111` scopes the `webkit` project OUT of the GL-pixel π corpus precisely because Playwright-WebKit on macOS uses an ANGLE-less software GL path that does NOT reproduce real Safari.app Metal. A field-composite captured on Playwright-WebKit would measure the WRONG composite (different rasterizer) — worse than no Safari read. The faithful capture is the **C18 `wkshot-live` off-screen WKWebView** (system `WebKit.framework` / `Apple GPU` / no `Version/` token = C-SAFARI Tier-1), which is exactly what captured the real 16-PNG re-paint batch.
3. **CI cannot paint Safari (by physics) — so the Safari leg CANNOT be a CI red.** `release.yml` is `ubuntu-latest` SwiftShader; there is no Metal, no Safari. This is the IDENTICAL constraint `proof:ship-attestation` Arm A and `proof:safari-parity` already record (WS7 §L.0/§L.6: "the Mac-only ship-block does NOT close C-PAINT"; "this gate is the SOURCE-arm floor ONLY"). The field-AA Safari leg inherits the SAME tagging: the device-free `F-AA-SELFTEST` (recorded-number, incl. the Safari 1.91 pair) is `["ci","release"]` (the armed witness CI runs); the live Chrome pixel arm is `["local"]` under `--run pi` (real Metal on the Mac dev box); the live Safari pixel arm is `["local"]` under `--run ship` (the Mac-only wkshot ceremony).

### 3.2 — The mechanism (what changes vs P6)

- **The capture spec emits per-ENGINE captures.** `tests-visual/field-aurora.spec.ts` (the Chrome `--run pi` leg) writes `field-aurora-aa/chrome-<surface>-<mode>-<vp>.png` + `.probe.json`. The C-SAFARI `--run ship` ceremony (the `release.sh` ship-block / `wkshot-live` harness — the SAME path that captured the 2.2 re-paint Safari PNGs) writes `field-aurora-aa/safari-<surface>-<mode>-<vp>.png` + `.probe.json` into the SAME dir. (The per-engine `.probe.json` is required: the COMPUTED text colour is usually identical CSS, but the COMPOSITED field differs per engine, and the within-plate sample is per-PNG.)
- **`F-AA-LIVE` reads whichever engine captures exist, asserts per-engine, and is HONEST about a missing Safari leg.**
  - `chrome-*` is REQUIRED under `--run pi` (real Metal always available on the Mac dev box) → a missing Chrome capture is a RED ("capture not run / `--run pi` owed").
  - `safari-*` is asserted IF present (the `--run ship` ceremony ran) → a sub-AA Safari composite REDs; a MISSING Safari capture is a **DROP-WITH-TRIGGER NOTE** (`["local"]`-reported, never a CI/`--run pi` red), exactly as `proof:safari-parity` records the Safari PAINT verdict as DROP-WITH-TRIGGER when safaridriver cannot be enabled non-interactively. The NOTE names the trigger ("Safari field-AA leg owed at the next `--run ship` ceremony / safaridriver-or-DROP").
- **The born-RED anchor is dual-engine (§2).** `F-AA-LIVE` over `_anchor/chrome-*` REDs (1.04) AND over `_anchor/safari-*` REDs (1.91); over the fixed HEAD captures both GREEN.

This keeps the gate HONEST on three axes: it never silent-passes a Safari blind spot (the anchor + the live arm both read both engines), it never false-REDs CI for a GPU CI does not have (the Safari live leg is `["local"]`/ship-only), and it never self-certifies a Safari capture the harness could not produce (DROP-WITH-TRIGGER, not a fabricated green).

---

## 4. The assembled gate (P6 + the three fixes) — exact files, arms, registration

`proof:field-aurora` stays ONE registered gate with the WS7 SOURCE arm + corner-variance π + the P6 AA-over-composite block, now carrying the three fixes:

```
proof:field-aurora  (ONE gate)
├── SOURCE arm           device-free  ["ci","release"]   WS7 §L.2 — count simultaneous field painters (3-stack born-RED)
├── corner-variance π    Metal-only   ["local"] --run pi  WS7 §J.3 — field-structure symptom
└── AA-over-composite (P6 + P-FIELD-AA)
    ├── F-AA-SELFTEST     device-free  ["ci","release"]   armed witness: the RECORDED 2.2 pairs (Chrome 1.04 +
    │                                                      Safari 1.91 broken, fixed 6.7) + the kind/large bar
    └── F-AA-LIVE         pixel        ["local"]           reads field-aurora-aa/{chrome,safari}-* ; born-RED on
                                                           _anchor/{chrome,safari}-foundations-colors-dark ;
                                                           Chrome required (--run pi) · Safari asserted-if-present
                                                           (--run ship, DROP-WITH-TRIGGER on absent)
```

### 4.1 — The Node arm body (the corrected `F-AA-LIVE` + `F-AA-SELFTEST`)

```js
// scripts/proof-field-aurora.mjs — the AA-OVER-COMPOSITE block (P6 + P-FIELD-AA fixes).
import { auroraCompositeAaVerdict, sampleCompositeBehindText } from "./reflect-capture-verify.mjs";
import { FIELD_AA_ROSTER } from "./lib/field-aurora-aa-roster.mjs";

const ENGINES = ["chrome", "safari"];           // D3: read BOTH engine composites
const MODES = ["light", "dark"];
const VIEWPORTS = ["desktop", "mobile"];
const AA_DIR = "docs/tranches/BG/audit/visual/field-aurora-aa";

// F-AA-SELFTEST — device-free born-RED→GREEN, the armed-detector witness (ci/release).
// Uses the RECORDED 2.2 numbers (DELTA / PAINT-PASS-LOG:106-108) — NOT invented fixtures.
function selfTestAaVerdict() {
  const fails = [];
  const ink = [150, 132, 110];                  // a dark-mode muted warm ink (the 2.2 victim register)
  // The broken state DIVERGED per engine — anchor BOTH (D3):
  const brokenChrome = auroraCompositeAaVerdict({ textRgb: ink, fieldRgb: [150, 122, 98],  fontPx: 14, fontWeight: 400 }); // L~0.70 ⇒ ~1.04
  const brokenSafari = auroraCompositeAaVerdict({ textRgb: ink, fieldRgb: [128, 104, 84],  fontPx: 14, fontWeight: 400 }); // L~0.55 ⇒ ~1.91
  if (brokenChrome.pass) fails.push(`F-AA-SELFTEST: 2.2 broken CHROME pair scored ${brokenChrome.ratio.toFixed(2)} PASS — detector NOT armed`);
  if (brokenSafari.pass) fails.push(`F-AA-SELFTEST: 2.2 broken SAFARI pair scored ${brokenSafari.ratio.toFixed(2)} PASS — Safari blind spot UNARMED`);
  const fixed = auroraCompositeAaVerdict({ textRgb: [228, 212, 190], fieldRgb: [44, 36, 30], fontPx: 14, fontWeight: 400 });  // luminous-ember L0.16 ⇒ ~6.7
  if (!fixed.pass) fails.push(`F-AA-SELFTEST: fixed luminous-ember pair scored ${fixed.ratio.toFixed(2)} FAIL — detector over-reds`);
  // the register-honest bar (D1.4): text 4.5 / large 3.0 / graphical 3.0
  if (auroraCompositeAaVerdict({ textRgb: [0,0,0], fieldRgb: [0,0,0], fontPx: 14, fontWeight: 400, kind: "text" }).bar !== 4.5)      fails.push("body text bar ≠ 4.5 @ 14px");
  if (auroraCompositeAaVerdict({ textRgb: [0,0,0], fieldRgb: [0,0,0], fontPx: 28, fontWeight: 400, kind: "text" }).bar !== 3.0)      fails.push("large text bar ≠ 3.0 @ 28px");
  if (auroraCompositeAaVerdict({ textRgb: [0,0,0], fieldRgb: [0,0,0], fontPx: 14, fontWeight: 400, kind: "graphical" }).bar !== 3.0) fails.push("graphical-object bar ≠ 3.0 (WCAG 1.4.11) — the D1 dock-glyph fix");
  return fails;
}

// F-AA-LIVE — reads the per-engine captures (local). Chrome required under --run pi; Safari
// asserted-if-present under --run ship (DROP-WITH-TRIGGER on absent). Born-RED on _anchor/.
function liveAaArm({ requireChrome = true } = {}) {
  const fails = [], notes = [];
  for (const surface of FIELD_AA_ROSTER) for (const mode of MODES) for (const vp of VIEWPORTS) {
    for (const engine of ENGINES) {
      const base = `${AA_DIR}/${engine}-${surface.id}-${mode}-${vp}`;
      const probe = readJsonOrNull(`${base}.probe.json`);
      if (!probe) {
        if (engine === "chrome" && requireChrome) fails.push(`F-AA-LIVE: ${base}.probe.json ABSENT (--run pi capture owed)`);
        else if (engine === "safari") notes.push(`F-AA-LIVE: ${surface.id}/${mode}/${vp} SAFARI leg ABSENT — DROP-WITH-TRIGGER (owed at the next --run ship wkshot ceremony / safaridriver-or-DROP)`);
        continue;
      }
      for (const p of probe.probes) {
        const reg = surface.registers.find((r) => r.id === p.id);
        // surfaceRect: the per-register plate (through-plate) OR the field container (raw-field).
        const surfaceRect = p.surfaceRect /* emitted from surfaceSelector|fieldSurface */;
        const sample = sampleCompositeBehindText(`${base}.png`, p.rect, surfaceRect, probe.viewport);
        if (!sample) { fails.push(`F-AA-LIVE: ${engine} ${surface.id}/${p.id} ${mode}@${vp} — no smooth in-surface patch (measurement-validity FAIL)`); continue; }
        const v = auroraCompositeAaVerdict({ textRgb: parseCssRgb(p.color), fieldRgb: sample.rgb, fontPx: p.fontPx, fontWeight: p.fontWeight, kind: reg.kind });
        if (!v.pass) fails.push(`F-AA-LIVE: ${engine} ${surface.id}/${p.id} ${mode}@${vp} ${v.ratio.toFixed(2)}:1 < ${v.bar}:1 over the composited field`);
      }
    }
  }
  return { fails, notes };  // notes are ["local"]-reported, never a CI/--run-pi red
}
```

### 4.2 — The capture spec (per-engine emission)

`tests-visual/field-aurora.spec.ts` is the P6 capture+assert spec with TWO changes: (a) it probes `surfaceSelector || fieldSurface` and emits the surface rect into `probe.json` (so the Node arm can clamp the sampler); (b) it writes `chrome-<surface>-<mode>-<vp>.png` (engine-prefixed) so the Safari `--run ship` leg lands beside it without collision. The in-test contrast uses the SAME `auroraCompositeAaVerdict({ ..., kind })` (one verdict source). Auto-`--run pi`-enrolled (the `pi-runner-manifest.mjs` INCLUDE default; `proof:visual-runner` W2 covers it — no manifest edit).

```ts
// (delta vs P6 §2.2) — probe the surface rect + emit engine-prefixed captures:
const probes = await page.evaluate((regs) => regs.map((r) => {
  const el = document.querySelector(r.textSelector) as HTMLElement | null;
  if (!el) return { id: r.id, missing: true };
  const cs = getComputedStyle(el); const b = el.getBoundingClientRect();
  const surfEl = (r.surfaceSelector
    ? el.closest(r.surfaceSelector)                 // through-plate: the text's OWN card
    : document.querySelector(r.fieldSurface)) as HTMLElement | null;  // raw-field: the field container
  const sb = surfEl?.getBoundingClientRect();
  return { id: r.id, color: cs.color, fontPx: parseFloat(cs.fontSize), fontWeight: +cs.fontWeight,
           rect: { x: b.x, y: b.y, w: b.width, h: b.height },
           surfaceRect: sb ? { x: sb.x, y: sb.y, w: sb.width, h: sb.height } : null };
}, surface.registers.map((r) => ({ ...r, fieldSurface: surface.fieldSurface })));
// ... screenshot → `${OUT}/chrome-${surface.id}-${mode}-${vp.name}.png` (engine prefix)
```

### 4.3 — Registration (`gates.mjs` + `package.json`)

UNCHANGED from P6 §2.6 in shape: `proof:field-aurora` is `["local","ci","release"]` — the device-free `SOURCE` + `F-AA-SELFTEST` carry the ci/release teeth; `F-AA-LIVE` is `["local"]`-reported (Chrome under `--run pi`, Safari under `--run ship`, both born-RED-by-design until the captures run, EXACTLY as `proof:visual-runner` W4 reports the local paint as a fact). The `note:` is updated to name the SOUND consumer #2 (`/display/card` through-plate), the `b3d65eec~1` dual-engine anchor, and the Safari `--run ship` DROP-WITH-TRIGGER leg.

---

## 5. The ≥2-consumer bar + the verifying π (re-stated post-fix)

- **≥2 consumers (J inv-10), both SOUND:** `/foundations/colors` hero (Topology A raw-field, the literal 2.2 surface — PROVEN by the luck-catch) + **`/display/card` CardDescription (Topology B through-plate — a DISTINCT composite, genuine 14px muted text at 4.5, a LARGE plate the within-plate sampler reads correctly).** The roster is the standing register every subsequent glass-over-field wave appends to (the dock glyph, if ever, as a `graphical` 3.0 register).
- **The verifying π:** `F-AA-SELFTEST` (device-free) — the RECORDED 2.2 broken pairs (Chrome 1.04 AND Safari 1.91) MUST FAIL, the fixed ember pair MUST PASS, the bars MUST resolve 4.5/3.0/3.0 (text/large/graphical); a detector mutation (drop the kind branch, swap a bar, return `pass:true`) reds. `F-AA-LIVE` over the dual-engine `_anchor/` (Chrome 1.04 + Safari 1.91) REDs; over the fixed HEAD captures GREENs. The binding LIVE paint is `tests-visual/field-aurora.spec.ts` GREEN under `--run pi` (Chrome real Metal) + the `--run ship` Safari wkshot leg. Together: **the field-composite AA-collapse class — including the per-engine-divergent Safari case — becomes impossible to ship green.**

---

## 6. Feasibility — does the approach hold up

**Yes — each of the three fixes is grounded in a verified on-disk fact, and each is a small, mechanically-clear correction to P6 (not a re-architecture).**

| Fix | Status | Evidence (verified this pass) |
|---|---|---|
| D1 sound consumer #2 = `/display/card` | FEASIBLE | `/display/card` is NON-FOCAL (`router.ts:107` + `focal.ts:67` ⇒ `shellFieldActive=true` ⇒ shell aurora paints); `CardDescription.vue` renders genuine `<p data-slot="card-description" text-sm text-muted-foreground-strong>` (4.5 text, stable selector); the Card is a large plate. |
| D1 within-plate sampler | FEASIBLE | A clamp on the existing median-reject sampler (reuses `decodePngRgba`, no second decoder); the raw-field case degrades to the proven +offset read (surfaceRect = the huge field container). |
| D1 register-honest bar | FEASIBLE | A `kind` param + a one-line `bar` ternary; the WCAG rules (1.4.3 text/large, 1.4.11 graphical) are settled. |
| D2 anchor = `b3d65eec~1` | FEASIBLE | Lineage verified by `git merge-base` (cb8ecdfc is 2 commits AFTER the fix; `b3d65eec~1 = ebf6e45b` is pre-fix broken). Re-shootable in a throwaway worktree; the broken numbers (Chrome 1.04 / Safari 1.91) are recorded (`PAINT-PASS-LOG:108`). |
| D3 Safari arm (dual-engine, Mac-only ship leg) | FEASIBLE | The `wkshot-live` WKWebView path PROVABLY captured the real 2.2 Safari field (16-PNG re-paint batch, `safari-*.png` on disk now); the per-engine divergence is recorded; the `["local"]`/ship-only + DROP-WITH-TRIGGER tagging matches `proof:ship-attestation` / `proof:safari-parity` exactly. |
| value.js WCAG one-color-math | EXISTS at pinned `^1.0.0` | `wcagContrastRatio`/`wcagRelativeLuminance`/`contrastColor`/`RGBColor` all root-barrel exports (`dist/index.d.ts:10,18`), RGB [0,255] domain (matches the sampler output). |

**Open / build-time confirmations (low risk, none architecture-threatening):**

1. **Selector resolution on `/display/card`** — confirm `[data-slot='card']` + `[data-slot='card-description']` resolve and the shell field paints (the `[ROUTE-RESOLVES]` floor; the in-test `missing` red is the backstop). FALLBACK: a second register on `/foundations/colors` (field confirmed).
2. **The within-plate patch can be found on the smallest enrolled card** — if a card is too small for a clean interior patch, the sampler returns null ⇒ measurement-validity FAIL (reds loud); the `/display/card` showcase cards are large, so this is a future-roster concern, not a #2 concern.
3. **The `--run ship` Safari capture writes into `field-aurora-aa/`** — the wkshot ceremony must emit `safari-<surface>-<mode>-<vp>.png`+`.probe.json` into the gate's dir (a one-line output-path in the ship-block, beside the SHIP-ATTESTATION capture). If the ship-block is built before the field-AA roster lands, sequence the field-AA capture into it (both are WS7 phase-12).
4. **`surfaceRect` emission** — the capture spec must emit the surface rect into `probe.json` (the Node arm clamps on it); a probe.json without `surfaceRect` falls back to the viewport (raw-field behaviour) — confirm the through-plate registers carry it.

**The one genuine judgement call (recorded, unchanged from P6 §4):** the AA arm asserts over a field-ADJACENT / in-plate SMOOTH patch, not the sub-glyph pixels (unreadable under opaque ink). Valid where the composite is low-frequency near the text (the recessive calm field + a calm glass plate both are). A HIGH-frequency focal vivid hero (`/substrates/aurora` studio) is OUT of this arm's roster — it is the page's SUBJECT (vivid is correct) and is gestalt-judged by `proof:ba-gestalt`, not this band. The roster is the recessive-field + calm-plate surfaces (the legibility-floor case); the smoothness validity gate + the within-plate clamp keep every read honest.

---

## 7. Sequencing — build with the WS7 phase-12 field-gate band (pull EARLY)

P-FIELD-AA is field-INDEPENDENT of WS2-WS12 (needs only the WS1 field, landed). It ships in the SAME `proof-field-aurora.mjs` the WS7 converge spec schedules (SOURCE + corner-variance + this AA block), but that slot is pullable EARLIER (nothing downstream blocks it). Build the AA arm alongside the WS3 spine (M4) or at the head of the WS7 phase-12 band (M8), so every subsequent glass-over-field PAINT-PENDING wave runs it as the standing net. Couple to the P-SWEEP standing per-band sweep: each band ADDS "run `proof:field-aurora` `--run pi` over the band's new glass-over-field surfaces + the `--run ship` Safari leg before the PAINT-PENDING flip."

**This converts the 2.2 luck-catch into a standing, registered, born-RED, DUAL-ENGINE automated net with a SOUND ≥2-consumer roster and a correct pre-fix anchor — the field-AURORA AA-collapse class (including the per-engine-divergent Safari case) becomes impossible-to-ship-green.**

---

## Appendix — exact on-disk anchors (for the building agent)

- **The three-defect repair targets (this doc):** the roster `surfaceSelector`/`kind` schema (`scripts/lib/field-aurora-aa-roster.mjs`), the within-plate sampler (`scripts/reflect-capture-verify.mjs` `sampleCompositeBehindText` replacing P6's `sampleFieldBehindText`), the register-honest bar (`auroraCompositeAaVerdict` + `kind`), the dual-engine anchor (`field-aurora-aa/_anchor/{chrome,safari}-foundations-colors-dark.*`), the Safari `--run ship` leg (`F-AA-LIVE` + the wkshot ceremony output path).
- **Inherit verbatim from P6 (`pass-1-proto-P6.md`):** the CI-armed/local-pixel split, the `proof:visual-runner` precedent, the `pngMedianRgbStddev` decoder sibling, the registration shape (§2.6), the standing-enrollment discipline.
- **Anchor commit:** `b3d65eec~1` = `ebf6e45b` (NOT `cb8ecdfc` — that is 2 commits POST-fix). Re-shoot DUAL-ENGINE in a throwaway worktree under `.claude/worktrees/` (NEVER `~/Programming`/`/tmp`-move).
- **Recorded broken/fixed numbers (non-circular fixtures):** Chrome 1.04 / Safari 1.91 (broken, `PAINT-PASS-LOG.md:108`); fixed 6.7+/13.87 (`BG.W-FIELD-AURORA-DELTA.md` / `pixel-analysis.json`).
- **The proven Safari capture path:** the C18 `wkshot-live` WKWebView harness (system WebKit.framework / Apple GPU), the SAME path that captured the 16-PNG re-paint batch (`field-aurora-aa` will mirror `BG.W-FIELD-AURORA-paint/safari-*.png`). NOT Playwright-webkit (GL-unfaithful, scoped out at `playwright.config.ts:111`).
- **The unsound P6 artifacts NOT to carry forward:** consumer #2 `{ id: "dock-overview", registers: [{ id: "dock-label", selector: ".glass-dock .dock-label" }] }` (fictional class), the blind `+24` adjacent-patch in `sampleFieldBehindText`, the `cb8ecdfc`-range anchor (post-fix).

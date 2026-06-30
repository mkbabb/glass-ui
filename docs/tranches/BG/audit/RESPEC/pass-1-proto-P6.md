# P6 — `proof:field-aurora` AA-over-composite arm (the net 2.2 lacked)

**Prototype-augmented spec · PASS 1 · 2026-06-30 · branch `tranche/BG` · HEAD `9dfe285c`**
**Fence:** read-mostly audit; this doc RECORDS the buildable spec. Zero src/demo/styles/scripts edits made — every file path below is a BUILD instruction, not a landed change. `verify-siblings-intact --quiet` exits 0.

**Feasibility verdict: FEASIBLE — buildable NOW, low residual uncertainty.** Every mechanism the gate needs already exists on disk (the PNG-decode + OKLab leaf, the value.js WCAG one-color-math source, the `--run pi` runner, the `proof:visual-runner` CI-enrollment precedent, the C18 `?capture=` capture pipeline, a recoverable broken-field commit for the born-RED). The one-off luck-catch (`BG.W-FIELD-AURORA-pixel-analysis.mjs`) is the working proof-of-mechanism; P6 is its promotion to a registered, re-runnable, ≥2-consumer standing gate. No spike required to prove the approach — the spike already ran as the 2.2 re-paint.

---

## 0. The problem, stated precisely (why this class is invisible today)

Row 2.2 `BG.W-FIELD-AURORA` shipped **device-free GREEN** while dark-mode `/foundations/colors` was catastrophically broken — **muted body 1.04:1 / hero h1 2.14:1 over the composited field**. It was caught ONLY by re-paint luck (`b3d65eec` → 13.87:1), recorded honestly in `PAINT-PASS-LOG.md` as a FAIL→fix→PASS cycle. This is the standing proof that **device-free GREEN ≠ visually correct for a field-composited surface**, and it sets the bar: every PENDING glass-over-field surface (WS2/WS5/WS6/WS4/WS8/WS9/WS11/WS12 — the bulk) carries the SAME latent AA-collapse class with **no automated net** until W-REFLECT3 the capstone.

Three reasons NO existing gate catches it:

1. **`getComputedStyle` token gates are blind to the field.** `proof:no-gray`, `proof:dark-material`, `proof:adaptive-glass` read TOKEN values (`oklab(...)` resolved colors). The aurora field is a **WebGL/WebGPU canvas** — its painted pixels exist in NO computed style. A token gate literally cannot see what the field painted behind the text.

2. **`adaptive-glass-live.spec.ts` composites over *synthetic white*, not the field.** It is the closest analog (in-situ glass AA), but its own header says it "composites it over a SYNTHETIC-WHITE worst-case plate" (`adaptive-glass-live.spec.ts:16-22`, `effectiveOverWhite()` at :154). That arm is **monotonic in the darken direction** — a darker fill always scores BETTER. The 2.2 collapse was a **mid-luminance ink over a mid-light brown field** (both ~L0.55) → 1.04; over white the same ink reads fine. The synthetic-white bound is conservative and structurally cannot reproduce the specific field-composite collapse.

3. **The converge-spec'd `proof:field-aurora` arms measure FIELD COHERENCE, not TEXT LEGIBILITY.** The WS7-converge SPEC (`converge/BG-WS7-quality-coverage-close/SPEC-pass4-converged.md §L.2`) specs two arms: (a) the device-free **SOURCE arm** — count simultaneous field-painting layers, RED when >1 (the 3-stack); (b) the Metal-only **corner-field-variance π** — read the live-GL corner structure. **Neither sees text contrast.** A single coherent warm field with correct corner variance can STILL produce muted 1.04:1. The AA-over-composite arm is the genuinely-missing third arm — and it is the one P6 names.

**The thesis (one sentence):** read the **actual composited pixel** behind the text from a real-GPU capture, and assert `wcagContrastRatio(text-computed-color, composited-field-pixel) ≥ register-bar` — a PIXEL read is layer-agnostic (it sees plate-over-field-over-page as the eye does, with zero modeling), so it catches the collapse a token composite never can.

---

## 1. Architecture — the cardinal-lesson split (CI proves the net is ARMED; local proves the PAINT)

P6 follows the EXACT `proof:visual-runner` / `proof:live-verified-ledger` precedent the tranche already runs: a GPU-less CI runner cannot paint WebGL, so the gate splits into a **device-free CI arm that proves the detector is correct + armed** and a **device-capable local arm that proves the pixels**. This makes the gate a real `gates.mjs --run full` member (CI-blocking on the armed-ness) AND a binding `--run pi`/`--run ship` paint (local-blocking on the truth) — not a paint claim resting on author capture.

```
proof:field-aurora  (ONE gate, THREE arms — P6 adds the third)
├── SOURCE arm        device-free  ["ci","release"]   (WS7-converge §L.2 — count field painters, 3-stack born-RED)
├── corner-variance π  Metal-only  ["local"] --run pi  (WS7-converge §J.3 — field-structure symptom)
└── AA-over-composite  ┬ F-AA-SELFTEST  device-free  ["ci","release"]   ← P6: the verdict-math + armed witness
                       └ F-AA-LIVE      Metal pixel   ["local"] --run pi ← P6: the binding composited-AA truth
```

`tests-visual/field-aurora.spec.ts` is the device-capable **capture+assert** half (the in-test live π, auto-enrolled in `--run pi` by the `proof:visual-runner` manifest); it also EMITS the PNGs + `probe.json` the Node `F-AA-LIVE` arm re-reads (so the same captured truth is both an in-test assertion AND a `gates.mjs`-registered, born-RED-able Node gate). The split mirrors `proof:visual-runner` (CI = enrollment; local = paint) exactly.

---

## 2. The mechanism — exact files, functions, tokens

### 2.1 — The shared leaf addition (the ONE WCAG-contrast source, the one-color-math discipline)

`scripts/reflect-capture-verify.mjs` already exports `pngRegionStats(absPath, region∈[0,1]) → {meanL, meanChroma, meanAlpha, meanA, meanB, samples}` and `oklabFromRgb`. It has **no WCAG-contrast helper** — the one-off `pixel-analysis.mjs` hand-rolled its own `wcagLum`/`contrast`. P6 mints the WCAG arm ONCE here, **consuming value.js** (NOT a hand-roll):

> **Discovery (corrects the SEED note):** value.js `^1.0.0` — the version pinned at HEAD — **already exports** `wcagRelativeLuminance(Color)`, `wcagContrastRatio(a,b)`, `contrastColor(Color)` (`node_modules/@mkbabb/value.js/dist/units/color/contrast.d.ts`, the canonical CSS-Color-5 luminance). The SEED's "value.js 1.2.0 ships them / repoint the stale 0.13.0 marker" is satisfied at the pinned version — **no CONSUME-deferral, no hand-roll**. The gate imports the math, honoring the one-color-math discipline at birth.

Add to `reflect-capture-verify.mjs` (the gate's pixel decode already lives here — keep the contrast math beside it):

```js
import { RGBColor, wcagContrastRatio } from "@mkbabb/value.js";

/**
 * The ONE WCAG-contrast source in the gate tree — value.js's CSS-Color-5
 * wcagContrastRatio (NOT a hand-rolled rec709 sum; the one-color-math discipline
 * the no-gray/dark-material/pixel-analysis lineage is repeatedly bitten by re-rolling).
 * Inputs are 0-255 sRGB triples (what pngRegionStats / a probe.json colour produce).
 */
export function wcagRatio8(rgbA, rgbB) {
    return wcagContrastRatio(
        new RGBColor(rgbA[0], rgbA[1], rgbA[2]),
        new RGBColor(rgbB[0], rgbB[1], rgbB[2]),
    );
}

/**
 * The PURE composited-AA verdict (no PNG, no browser) — the self-test exercises it
 * deterministically with zero on-disk fixture. `fieldRgb` is the COMPOSITED fill the
 * pixel read returns (plate-over-field-over-page, layer-agnostic); `textRgb` is the
 * glyph's computed colour. The register bar is the WCAG large-text rule: ≥24px OR
 * ≥18.66px-bold → 3.0, else 4.5.
 *
 * @param {{textRgb:[number,number,number], fieldRgb:[number,number,number], fontPx:number, fontWeight:number}} p
 * @returns {{ratio:number, bar:number, large:boolean, pass:boolean}}
 */
export function auroraCompositeAaVerdict({ textRgb, fieldRgb, fontPx, fontWeight }) {
    const large = fontPx >= 24 || (fontPx >= 18.66 && fontWeight >= 700);
    const bar = large ? 3.0 : 4.5;
    const ratio = wcagRatio8(textRgb, fieldRgb);
    return { ratio, bar, large, pass: ratio >= bar };
}
```

**The field-behind-text sampler (the median-reject patch — generalized from `pixel-analysis.mjs:34-51`).** The composited fill behind a glyph cannot be read under the opaque ink, so sample a **text-free patch immediately adjacent to the glyph** on the SAME surface; the field/plate is low-frequency near the text, so the adjacent patch == the fill behind it. Median-of-region rejects stray text/edge pixels; a **smoothness gate** (`stddev` ceiling) is the measurement-validity bite — a high-frequency patch (more text, a card edge) is NOT a valid field read and the gate WIDENS/RELOCATES or FAILS-LOUD, never silent-passes a bad sample.

```js
/**
 * Sample the COMPOSITED fill adjacent to a text rect (the layer-agnostic "behind the
 * glyph" read). Returns the median RGB + the patch luma stddev (the speckle/validity
 * tell). The text rect + viewport are CSS-px (the probe.json shape); the region is
 * converted to a fractional box so it is resolution-independent (@1x or @2x capture).
 *
 * Probe order: a patch just to the RIGHT of the text end, then BELOW, then the same-row
 * gutter — the first whose stddev < smoothCeil is the valid field read. null ⇒ no
 * smooth adjacent patch (the measurement-validity FAIL — the caller reds, never passes).
 *
 * @returns {{rgb:[number,number,number], stddev:number} | null}
 */
export function sampleFieldBehindText(absPath, textRectCss, viewportCss, opts = {}) {
    const smoothCeil = opts.smoothCeil ?? 9; // pixel-analysis.mjs sd<9 smooth-field filter
    const candidates = [
        { x: textRectCss.x + textRectCss.w + 24, y: textRectCss.y + textRectCss.h / 2 },
        { x: textRectCss.x + textRectCss.w / 2, y: textRectCss.y + textRectCss.h + 24 },
        { x: textRectCss.x - 24, y: textRectCss.y + textRectCss.h / 2 },
    ];
    const rCss = 12;
    for (const c of candidates) {
        const region = {
            x: (c.x - rCss) / viewportCss.w, y: (c.y - rCss) / viewportCss.h,
            w: (2 * rCss) / viewportCss.w,  h: (2 * rCss) / viewportCss.h,
        };
        const s = pngMedianRgbStddev(absPath, region); // a median variant of pngRegionStats; see §2.2
        if (s && s.stddev < smoothCeil) return s;
    }
    return null; // measurement-validity FAIL
}
```

> `pngMedianRgbStddev` is a thin sibling of the existing `pngRegionStats` decode (reuse `decodePngRgba`; report **median** RGB + luma-stddev instead of OKLab means). One decoder in the tree — no second IDAT inflate. It lands in `reflect-capture-verify.mjs` beside `pngRegionStats`.

### 2.2 — The capture+assert spec (`tests-visual/field-aurora.spec.ts`) — the device-capable binding π

Navigates each enrolled surface over the BUILT demo (the C18 `:5200` dist or the `:5199` dev origin the config defaults), settles the aurora past its lazy-arm + a paint beat, probes each register's computed colour + CSS rect, **screenshots the surface to a PNG**, samples the composited field behind each register, and **asserts AA in-test** (the binding live π) while writing PNGs + `probe.json` to disk for the Node arm.

```ts
// BG.W-GATE-FIELD-AURORA (P6) — the composited-over-field AA live π. The net 2.2 lacked:
// row 2.2 shipped device-free GREEN at muted 1.04:1 over the field, caught only by re-paint.
// This reads the ACTUAL composited pixel behind each text register (NOT a token over synthetic
// white — adaptive-glass-live.spec.ts's conservative bound) and asserts AA. Auto-enrolled in
// `--run pi`. Both modes × ≥2 viewports. Fail-CLOSED: a sub-AA composited read reds, exit ≠ 0.
import { test, expect } from "@playwright/test";
import { mkdirSync, writeFileSync } from "node:fs";
import {
    auroraCompositeAaVerdict, sampleFieldBehindText,
} from "../scripts/reflect-capture-verify.mjs";
import { FIELD_AA_ROSTER } from "../scripts/lib/field-aurora-aa-roster.mjs"; // §2.4

const OUT = "docs/tranches/BG/audit/visual/field-aurora-aa";
const VIEWPORTS = [{ name: "desktop", w: 1440, h: 900 }, { name: "mobile", w: 390, h: 844 }] as const;

for (const surface of FIELD_AA_ROSTER) {
  for (const vp of VIEWPORTS) {
    for (const mode of ["light", "dark"] as const) {
      test(`${surface.id} — composited AA over field @ ${vp.name} ${mode}`, async ({ page }) => {
        await page.setViewportSize({ width: vp.w, height: vp.h });
        if (mode === "dark") await page.emulateMedia({ colorScheme: "dark" });
        await page.goto(surface.route, { waitUntil: "networkidle" });
        await page.evaluate((d) => document.documentElement.classList.toggle("dark", d), mode === "dark");
        // Settle the field: the aurora lazy-arms on first intersection; give it the arm + a paint beat.
        await page.waitForTimeout(900);

        // Probe each register's computed colour + CSS rect (the text the field must clear).
        const probes = await page.evaluate((regs) => regs.map((r) => {
          const el = document.querySelector(r.selector) as HTMLElement | null;
          if (!el) return { id: r.id, missing: true };
          const cs = getComputedStyle(el); const b = el.getBoundingClientRect();
          return { id: r.id, color: cs.color, fontPx: parseFloat(cs.fontSize), fontWeight: +cs.fontWeight,
                   rect: { x: b.x, y: b.y, w: b.width, h: b.height } };
        }, surface.registers);

        mkdirSync(OUT, { recursive: true });
        const png = `${OUT}/${surface.id}-${mode}-${vp.name}.png`;
        await page.screenshot({ path: png, fullPage: false });
        writeFileSync(`${OUT}/${surface.id}-${mode}-${vp.name}.probe.json`,
          JSON.stringify({ viewport: { w: vp.w, h: vp.h }, probes }, null, 2));

        for (const p of probes) {
          const reg = surface.registers.find((r) => r.id === p.id)!;
          expect(p.missing, `${surface.id}: register "${p.id}" (${reg.selector}) not found`).toBeFalsy();
          const sample = sampleFieldBehindText(png, p.rect, { w: vp.w, h: vp.h });
          expect(sample, `${surface.id}/${p.id}: no smooth field patch adjacent to the text (measurement-validity FAIL — the adjacent region is high-frequency; the AA read is unmeasurable, NOT a silent pass)`).not.toBeNull();
          const textRgb = parseCssRgb(p.color); // a small oklab/rgb/srgb parser (reuse adaptive-glass's parseColor)
          const v = auroraCompositeAaVerdict({ textRgb, fieldRgb: sample!.rgb, fontPx: p.fontPx, fontWeight: p.fontWeight });
          expect(v.pass,
            `${surface.id}/${p.id} ${mode}: ${v.ratio.toFixed(2)}:1 over the COMPOSITED field (text ${p.color}, field rgb[${sample!.rgb}]) — under ${v.bar}:1. The field-composite AA collapse 2.2 shipped (muted 1.04 dark) is reproduced; the token gates are blind to it.`
          ).toBe(true);
        }
      });
    }
  }
});
```

The in-test contrast is computed via the SAME `auroraCompositeAaVerdict` the Node arm runs (one verdict source). The spec is `--run pi`-enrolled the moment it lands (the manifest default is INCLUDE), so `proof:visual-runner` W2 covers it automatically — no manifest edit.

### 2.3 — The Node gate arm (`proof-field-aurora.mjs`, the AA-over-composite block)

When WS7 builds `proof-field-aurora.mjs` (it carries the SOURCE + corner-variance arms), P6 adds the **F-AA block**. Two clauses:

- **`F-AA-SELFTEST` (device-free, `["ci","release"]` — the armed witness, the CI net).** Runs `auroraCompositeAaVerdict` over the historically-MEASURED 2.2 pairs (not invented fixtures — the numbers are on the record in the DELTA/PAINT-PASS-LOG): the broken pair `{ textRgb: <dark muted ink>, fieldRgb: <mid-light brown wash>, fontPx: 15 }` MUST return `pass:false` (≈1.04), the fixed pair `{ same ink, fieldRgb: <luminous-ember L0.16> }` MUST return `pass:true` (≈6.7); the large-text rule MUST resolve 3.0 at 24px/700 and 4.5 at 15px. A mutation (drop the large-text branch, swap the bar, return `pass:true` always) reds. This proves the detector MATH is correct + armed WITHOUT a GPU — the genuine CI-blocking arm.
- **`F-AA-LIVE` (Metal pixel, `["local"]`, runs under `--run pi`/`--run ship`).** Reads the capture's emitted `field-aurora-aa/<surface>-<mode>-<vp>.png` + `.probe.json`, re-runs `sampleFieldBehindText` + `auroraCompositeAaVerdict`, asserts AA per register. Born-RED against the **retained broken-field anchor** (§2.5). This is the `gates.mjs`-registered, re-runnable Node mirror of the in-test π — so the truth is a gate fact, not only a Playwright assertion. (Mirrors `proof:ba-gestalt`'s "reads the captured PNGs" pattern; `--run pi` GREEN is the binding paint, the local close leg, exactly as `proof:visual-runner` W4.)

```js
// proof-field-aurora.mjs — the AA-OVER-COMPOSITE block (P6). Beside the SOURCE arm
// (count field painters, WS7 §L.2) and the corner-variance π (WS7 §J.3).
import { auroraCompositeAaVerdict, sampleFieldBehindText } from "./reflect-capture-verify.mjs";
import { FIELD_AA_ROSTER } from "./lib/field-aurora-aa-roster.mjs";

// F-AA-SELFTEST — device-free born-RED→GREEN, the armed-detector witness (ci/release).
function selfTestAaVerdict() {
  const fails = [];
  // The HISTORICALLY-MEASURED 2.2 collapse (DELTA §3 / PAINT-PASS-LOG): a dark muted ink
  // over the mid-light brown wash reads ~1.04; the same ink over the fixed luminous-ember
  // field reads ~6.7. These are the recorded broken/fixed numbers, NOT agent-invented fixtures.
  const ink = [150, 132, 110];               // a dark-mode muted warm ink (L~0.55 range)
  const broken = auroraCompositeAaVerdict({ textRgb: ink, fieldRgb: [148, 120, 96], fontPx: 15, fontWeight: 400 });
  if (broken.pass) fails.push(`F-AA-SELFTEST: the 2.2 broken pair scored ${broken.ratio.toFixed(2)} PASS — the detector is NOT armed`);
  const fixed = auroraCompositeAaVerdict({ textRgb: [228, 212, 190], fieldRgb: [44, 36, 30], fontPx: 15, fontWeight: 400 });
  if (!fixed.pass) fails.push(`F-AA-SELFTEST: the fixed dark-ember pair scored ${fixed.ratio.toFixed(2)} FAIL — the detector over-reds`);
  // the large-text register bar
  if (auroraCompositeAaVerdict({ textRgb: [0,0,0], fieldRgb: [0,0,0], fontPx: 24, fontWeight: 400 }).bar !== 3.0) fails.push("large-text bar ≠ 3.0 @ 24px");
  if (auroraCompositeAaVerdict({ textRgb: [0,0,0], fieldRgb: [0,0,0], fontPx: 15, fontWeight: 400 }).bar !== 4.5) fails.push("body bar ≠ 4.5 @ 15px");
  return fails;
}

// F-AA-LIVE — reads the emitted captures (local; --run pi/--run ship). Born-RED on the anchor.
function liveAaArm() {
  const fails = [];
  for (const surface of FIELD_AA_ROSTER) for (const mode of ["light", "dark"]) for (const vp of ["desktop", "mobile"]) {
    const base = `docs/tranches/BG/audit/visual/field-aurora-aa/${surface.id}-${mode}-${vp}`;
    const probe = readJsonOrNull(`${base}.probe.json`);
    if (!probe) { fails.push(`F-AA-LIVE: ${base}.probe.json ABSENT (capture not run / --run pi owed)`); continue; }
    for (const p of probe.probes) {
      const reg = surface.registers.find((r) => r.id === p.id);
      const sample = sampleFieldBehindText(`${base}.png`, p.rect, probe.viewport);
      if (!sample) { fails.push(`F-AA-LIVE: ${surface.id}/${p.id} ${mode} — unmeasurable field patch`); continue; }
      const v = auroraCompositeAaVerdict({ textRgb: parseCssRgb(p.color), fieldRgb: sample.rgb, fontPx: p.fontPx, fontWeight: p.fontWeight });
      if (!v.pass) fails.push(`F-AA-LIVE: ${surface.id}/${p.id} ${mode}@${vp} ${v.ratio.toFixed(2)}:1 < ${v.bar}:1 over the composited field`);
    }
  }
  return fails;
}
```

### 2.4 — The roster (the ≥2 enrolled surfaces + the STANDING-enrollment discipline)

`scripts/lib/field-aurora-aa-roster.mjs` — the single source of WHICH surfaces + WHICH registers carry the AA bar. **Born with ≥2 consumers; STANDING — every glass-over-field PAINT-PENDING wave ADDS its surface here before flipping its row** (the recurring-class fix the SEED demands: turn the luck-catch into a standing net).

```js
export const FIELD_AA_ROSTER = [
  {
    // CONSUMER #1 — the EXACT 2.2 surface. Hero text over the SHELL aurora field DIRECTLY
    // (raw-field composite, opacityCeiling 0.5) — the case a token gate cannot model at all
    // (there is no glass plate behind the hero text; the fill IS the field).
    id: "foundations-colors", route: "/foundations/colors",
    registers: [
      { id: "hero-h1", selector: ".story-hero h1" },              // large register (3.0 bar)
      { id: "hero-eyebrow", selector: ".story-hero .section-label" }, // mono caption (4.5 bar) — the 2.2 victim
      { id: "body", selector: ".story-page-article p" },           // body ink (4.5 bar)
    ],
  },
  {
    // CONSUMER #2 — the THROUGH-PLATE composite. Dock glyphs over the glass plate over the
    // DockStage field (plate-over-field-over-page) — proves the PIXEL read is layer-agnostic
    // where a token composite would have to model N layers. Distinct composite topology from #1.
    id: "dock-overview", route: "/dock/overview",
    registers: [
      { id: "dock-label", selector: ".glass-dock .dock-label" },   // dock glyph/label register
      { id: "heading", selector: ".story-page-article h2, .story-hero h1" },
    ],
  },
  // STANDING-ENROLLMENT: WS2 dock convergence, WS5 viz panels, WS6 siri, WS8 glass-deep,
  // WS11/WS12 storybook — each adds its glass-over-field surface row HERE at its PAINT-PENDING
  // flip. The roster grows; the net is standing, not one-shot.
];
```

> Selectors above are **placeholders to confirm against the live DOM** at build time (the `.story-hero h1` / `.section-label` / `.dock-label` shapes are inferred from `StoryHero.vue` + the dock-label canon; the building agent verifies each resolves on the route before pinning — the `proof:ba-gestalt` `[ROUTE-RESOLVES]` discipline applied to selectors).

### 2.5 — The born-RED anchor (NON-self-authored — avoids the converge SPEC's "circular fixture" trap)

The WS7 converge SPEC flags the prototype's prior born-RED as **circular** ("agent-authored cream/grey fixtures"). P6 defends the born-RED two ways, neither circular:

1. **`F-AA-SELFTEST` uses the RECORDED 2.2 numbers** (DELTA §3 / PAINT-PASS-LOG: "muted 1.04:1 over the composited field"), not invented values — the broken state is documented history.
2. **`F-AA-LIVE` born-REDs against a REAL re-shot broken-field capture.** The broken commit is **recoverable in git**: the fix is `b3d65eec` ("dark-aware shell field — luminous-ember"); the field-aurora-initial range before it (the device-free-GREEN-but-1.04-dark state, build commit `cb8ecdfc`) is checked out, ONE `/foundations/colors` dark Metal capture is shot, and committed as `docs/tranches/BG/audit/visual/field-aurora-aa/_anchor/broken-foundations-colors-dark.png` + its `probe.json`. `F-AA-LIVE` run over the anchor REDs (1.04 < 4.5); over the fixed HEAD capture it GREENs. A genuine non-self-authored born-RED — a real GPU capture of the real broken commit, the defensible anchor the converge SPEC demands. (The anchor is `_`-prefixed so the `--run pi` glob excludes it from the capture set; it is a born-RED fixture, not a live surface.)

### 2.6 — Registration (`gates.mjs` + `package.json`)

`proof:field-aurora` is ONE registered gate (P6 ships its AA block inside it). Per the `proof:visual-runner` cardinal-lesson split, the registration is **`["local","ci","release"]`** — the device-free `SOURCE` + `F-AA-SELFTEST` clauses carry the ci/release teeth; the `F-AA-LIVE` clause is a `local`-reported NOTE when no capture exists (born-RED-by-design until `--run pi` runs, EXACTLY as `proof:visual-runner` W4 reports the local paint as a fact, not a ci-failing violation — so CI is not blocked on a GPU it does not have).

```js
// scripts/gates.mjs — beside proof:visual-runner / proof:ba-gestalt
{
  id: "proof:field-aurora",
  cmd: "proof:field-aurora",
  tags: ["local", "ci", "release"],
  note: "BG.W-GATE-FIELD-AURORA — the field-composite legibility net (the class 2.2 shipped device-free-GREEN at muted 1.04:1 over the field, caught only by re-paint b3d65eec). THREE arms: SOURCE (device-free, count simultaneous field painters, 3-stack born-RED — the WS7 §L.2 tag-blocker); corner-variance π (Metal-only --run pi field-structure symptom); AA-OVER-COMPOSITE (P6) — F-AA-SELFTEST device-free born-RED→GREEN over the RECORDED 2.2 broken/fixed pairs (the armed-detector witness, ci/release) + F-AA-LIVE Metal pixel arm reading the field-aurora.spec.ts captures, asserting wcagContrastRatio(text, COMPOSITED-field-pixel) ≥ register-bar (3.0 large / 4.5 body) via value.js's one-color-math wcagContrastRatio + the shared pngRegionStats decoder + the median-reject adjacent-patch sampler with the smoothness measurement-validity bite. Born-RED on the re-shot broken-field anchor (the cb8ecdfc range checked out, NOT a self-authored fixture). CI proves the net is ARMED; the local --run pi proves the PIXELS (the proof:visual-runner split). The token gates (no-gray/dark-material/adaptive-glass) + adaptive-glass-live's composite-over-synthetic-white are BLIND to the field-composite collapse — this is the only arm that sees it.",
},
```

```jsonc
// package.json
"proof:field-aurora": "node scripts/proof-field-aurora.mjs",
```

`tests-visual/field-aurora.spec.ts` needs NO manifest edit (the `pi-runner-manifest.mjs` default is INCLUDE; `proof:visual-runner` auto-enrolls it).

---

## 3. The ≥2-consumer bar + the verifying π

- **≥2 consumers (J inv-10):** `/foundations/colors` (raw-field hero composite — the literal 2.2 surface) + `/dock/overview` (through-plate dock-glyph composite — a DISTINCT composite topology). The roster is the standing-enrollment register every subsequent glass-over-field wave appends to.
- **The verifying π (what the gate's own self-test proves):** `F-AA-SELFTEST` is the device-free witness — the recorded 2.2 broken pair MUST FAIL, the fixed pair MUST PASS, the register bars MUST resolve 3.0/4.5; a detector mutation reds (the anti-de-fang floor). `F-AA-LIVE` over the re-shot anchor REDs; over the fixed HEAD capture GREENs. The binding LIVE paint is `tests-visual/field-aurora.spec.ts` GREEN under `--run pi` on real Metal (the close leg). Together: **the field-composite AA-collapse class becomes impossible to ship green** — a wave whose dark-mode field collapses the muted register cannot flip DONE, because the in-test π reds on the captured pixel AND the Node `F-AA-LIVE` arm reds on the emitted probe.

---

## 4. Feasibility — does the approach hold up

**Yes — every dependency is on-disk and proven; this is a promotion of a working mechanism, not a research bet.**

| Dependency | Status | Evidence |
|---|---|---|
| PNG decode + region pixel read | EXISTS | `reflect-capture-verify.mjs` `pngRegionStats`/`decodePngRgba`/`oklabFromRgb` (the ONE decoder) |
| WCAG one-color-math source | EXISTS at pinned `^1.0.0` | value.js `wcagContrastRatio`/`wcagRelativeLuminance`/`contrastColor` (`dist/units/color/contrast.d.ts`) — SEED's "1.2.0" note is stale, satisfied today |
| The luck-catch mechanism | PROVEN | `BG.W-FIELD-AURORA-pixel-analysis.mjs` already does the median-reject field sample + WCAG-over-composite; P6 generalizes + registers it |
| `--run pi` runner + auto-enrollment | EXISTS | `gates.mjs --run pi` + `pi-runner-manifest.mjs` (INCLUDE default) + `proof:visual-runner` |
| The CI/local split precedent | EXISTS | `proof:visual-runner` (CI=enrollment / local=paint) — P6 copies the shape exactly |
| Capture pipeline | EXISTS | C18 `?capture=` / `:5200` dist + the field-aurora DELTA captured 16 PNGs this way |
| Non-circular born-RED | RECOVERABLE | broken field commit (`cb8ecdfc` range, parent-of-`b3d65eec` lineage) re-shootable for the anchor |

**What is PROVEN by construction (no spike needed):** the 2.2 re-paint WAS the spike — `pixel-analysis.mjs` measured 1.04→13.87 over the real composited field, exactly the readback P6 registers. The approach is validated by the very failure it would have caught.

**Open / build-time confirmations (low risk, none architecture-threatening):**

1. **Selector resolution.** The roster selectors (`.story-hero h1`, `.section-label`, `.dock-label`) are inferred — the building agent confirms each resolves on its route (the `[ROUTE-RESOLVES]` discipline). Mitigated by the in-test `expect(missing).toBeFalsy()` (a stale selector reds loudly, never silent-passes).
2. **The aurora settle window.** The field lazy-arms on first intersection; `waitForTimeout(900)` + `networkidle` is the DELTA's proven settle, but under `?capture=` mode the demo neutralizes some animation — confirm the field PAINTS (non-degenerate sample) before asserting; a degenerate all-equal patch is the measurement-validity FAIL (reds, not passes). The corner-variance π's "measurement-validity bite" is the sibling discipline.
3. **`@2x` capture scaling.** Handled by the fractional-region API (CSS-rect ÷ CSS-viewport → `[0,1]` box, resolution-independent) — no `SCALE=2` constant to drift (the `pixel-analysis.mjs:9` `SCALE` hard-code is the thing the fractional API retires).
4. **The median sampler sibling.** `pngMedianRgbStddev` is a small addition (median + stddev over `decodePngRgba`), not a second decoder — confirm it reuses `decodePngRgba` (the no-second-IDAT-inflate fence).
5. **value.js import in a Node gate.** value.js is a dep already imported by sibling scripts; confirm `RGBColor`/`wcagContrastRatio` are root-barrel exports (the `.d.ts` re-exports from `'.'` — verify the JS barrel matches).

**The one genuine judgement call (recorded, not blocking):** the AA arm asserts contrast over the field-ADJACENT smooth patch, not the literal sub-glyph pixels (unreadable under opaque ink). This is the `pixel-analysis.mjs` discipline and is correct where the field is low-frequency near text (the recessive calm field is — C≤0.046, smooth by the DELTA's own measurement). On a HIGH-frequency field behind text (a focal vivid hero, the `/substrates/aurora` studio case) the adjacent patch is a weaker proxy — the DELTA itself notes the focal-hero pixel ratios are "offset-patch artifacts over a spatially-varying vivid field." So the AA arm's roster is the RECESSIVE-field surfaces (the legibility floor case, where the field is calm-by-design); the focal vivid heroes are gestalt-judged by `proof:ba-gestalt`, NOT this arm (the field there is the page's SUBJECT, vivid is correct, and the contrast is a placement judgement not a band). Recording this scope keeps the arm honest — it asserts where the measurement is valid, and defers the spatially-varying case to the human gestalt verdict.

---

## 5. Sequencing — buildable NOW as the early standing net

P6 is **field-INDEPENDENT of WS2-WS12** — it needs only the WS1 field (landed at HEAD) + ≥1 glass-over-field surface (every route has one). It can land alongside the WS3 spine (M4), BEFORE the ~50-wave WS5/WS6/WS4 investment, so every subsequent glass-over-field PAINT-PENDING wave runs it as the standing net (the SEED's "buildable early, not deferred to the capstone"). Recommended placement:

- **Land the AA arm in M4 (WS3) or early M8 (WS7 phase-12 band)** — the converge SPEC schedules `proof-field-aurora.mjs` in WS7; P6's AA block ships in the SAME script, so build the whole gate (SOURCE + corner-variance + AA) at the WS7 phase-12 slot, but **pull that slot EARLIER** (it is field-independent; nothing downstream blocks it). The standing-enrollment roster then accretes surfaces as WS2/WS5/WS6/WS8/WS11/WS12 land — each wave's glass-over-field row cannot flip DONE without an AA-arm GREEN over its captured composite.
- **Couple to the P3 standing per-band sweep** (the sibling re-spec prototype): the per-band close-battery sweep ADDS "run `proof:field-aurora` `--run pi` over the band's new glass-over-field surfaces before the PAINT-PENDING flip" — so the net is enforced per-band, not only at the capstone.

**This converts the 2.2 luck-catch into a standing, registered, born-RED automated net — the field-AURORA AA-collapse class becomes impossible-to-ship-green.**

---

## Appendix — exact on-disk anchors (for the building agent)

- Leaf to extend: `scripts/reflect-capture-verify.mjs` (add `wcagRatio8`, `auroraCompositeAaVerdict`, `sampleFieldBehindText`, `pngMedianRgbStddev`).
- New capture spec: `tests-visual/field-aurora.spec.ts` (auto-`--run pi`-enrolled).
- New roster: `scripts/lib/field-aurora-aa-roster.mjs`.
- Gate body (WS7): `scripts/proof-field-aurora.mjs` (SOURCE + corner-variance + the P6 AA block).
- Registration: `scripts/gates.mjs` (the `proof:field-aurora` row) + `package.json` (`"proof:field-aurora"`).
- Born-RED anchor: re-shoot from the broken field commit (`cb8ecdfc` range, before `b3d65eec`) → `docs/tranches/BG/audit/visual/field-aurora-aa/_anchor/broken-foundations-colors-dark.{png,probe.json}`.
- Working proof-of-mechanism to harvest: `docs/tranches/BG/audit/visual/BG.W-FIELD-AURORA-pixel-analysis.mjs` (the one-off luck-catch — its median-reject sampler + WCAG-over-composite is the P6 mechanism, pre-validated).
- The conservative-bound analog NOT to duplicate: `tests-visual/adaptive-glass-live.spec.ts` (composite-over-synthetic-white — the thing P6 transcends; keep it, it is the structural floor, P6 is the field-truth ceiling).

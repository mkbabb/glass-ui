// proof:progress-gradient — BA.W-PROGRESS-GRADIENT: the sectioned Progress
// rebuilt on a SINGLE-FILL gradient paint model (born-RED; R8-14 "totally
// broken … should be a proper blended gradient with distinct segments"). The
// device-free SOURCE arm; the BINDING painted truth is the π arm
// (tests-visual/progress-gradient.spec.ts) + the proof:ba-gestalt whole-page
// verdict — a source-green/visually-broken close is the exact AZ P-1 class this
// tranche exists to fix, so the implementer must NOT treat a green source arm as
// done.
//
// The four stacked root causes the wave re-architects (each confirmed at HEAD
// pre-edit):
//   RC-1 — the fill is per-cell with a pill cap on EVERY trailing edge → hard
//          internal steps (N pills end-to-end, no continuous fill).
//   RC-2 — the seam overlay is a `mix-blend-mode:screen` band → bright stripes +
//          the dead notch.
//   RC-3 — the pending cell is a flat 12%-wash of a neutral tint → the 4th
//          segment reads dead before the notch.
//   RC-4 — cells are absolutely-positioned siblings; no element spans the filled
//          extent → nothing to draw ONE gradient across.
//
// The four falsifiable SOURCE witnesses (the comment-strip + pure-detector house
// pattern, mirroring proof-suffuse.mjs / proof-dock-rail-hairline.mjs), each RED
// at HEAD pre-wave:
//   W1 — ONE fill, not N per-cell pills: the template renders a SINGLE fill
//        element spanning the cumulative filled extent (the v-for cell stack
//        GONE), and NO internal segment-boundary selector carries a
//        --radius-pill corner (one fill, one cap).
//   W2 — NO screen-seam band: no `mix-blend-mode: screen` and no
//        `.progress-sectioned-seam` selector/render anywhere; the boundary blend
//        lives in a multi-stop `linear-gradient` on the single fill.
//   W3 — the glass meter track: the rail routes through `--glass-bg-quiet`
//        (+ `--glass-blur-quiet` backdrop) AND the recessed-channel inner-shadow
//        box-shadow chrome is PRESERVED.
//   W4 — pending keeps its hue: the pending recipe references the segment's own
//        `--cell-color` as a low-alpha ghost (no flat `--surface-tint-40` neutral
//        in the demo segment data, no flat 12%-wash-of-neutral as the only
//        pending paint).

import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { ROOT } from "./constellation.mjs";
import { gateArtifactPath, snapshotStamp, writeGateArtifact } from "./gate-output.mjs";

const COMMAND = "npm run proof:progress-gradient";

const read = (rel) => {
    const p = resolve(ROOT, rel);
    return existsSync(p) ? readFileSync(p, "utf8") : "";
};

// Strip HTML/Vue/JS/CSS comments so a prose mention in a comment is NOT a false
// hit — the whole gate is comment-blind. Preserve newlines for line geometry.
const strip = (s) =>
    s
        .replace(/<!--[\s\S]*?-->/g, (m) => m.replace(/[^\n]/g, " "))
        .replace(/\/\*[\s\S]*?\*\//g, (m) => m.replace(/[^\n]/g, " "))
        .replace(/\/\/[^\n]*/g, "");

const checks = []; // {id, pass, detail}
const add = (id, pass, detail) => checks.push({ id, pass: Boolean(pass), detail });

const SFC = "src/components/ui/progress/ProgressSectioned.vue";
const DEMO = "demo/stories/feedback/progress.vue";

const sfcRaw = read(SFC);
const sfc = strip(sfcRaw);
const demo = strip(read(DEMO));

// Split the SFC into <template> and <style> halves for selector-scoped asserts.
const templateBlock = (sfc.match(/<template>[\s\S]*?<\/template>/) || [""])[0];
const styleBlock = (sfc.match(/<style[^>]*>[\s\S]*?<\/style>/) || [""])[0];

// ═══════════════════════════════════════════════════════════════════════════
// W1 — ONE fill, not N per-cell pills (RC-1 + RC-4)
// ═══════════════════════════════════════════════════════════════════════════
// (1a) the per-cell `v-for` rectangle stack is GONE: no `v-for` that emits a
//      `.progress-sectioned-cell` (the absolutely-positioned sibling stack), and
//      no `.progress-sectioned-fill` per-cell fill span. The single fill element
//      is a dedicated class (e.g. `.progress-sectioned-flow`).
const hasCellVfor =
    /v-for=["'][^"']*\bin\s+cells\b[^"']*["'][^>]*\n?[\s\S]{0,200}?progress-sectioned-cell/.test(
        templateBlock,
    ) || /class="progress-sectioned-cell"/.test(templateBlock);
const hasPerCellFillSpan = /class="progress-sectioned-fill"/.test(templateBlock);
// (1b) a SINGLE fill-paint element spanning the cumulative filled extent exists
//      (the derived filledExtentPct width on one element). The positive: a single
//      flow-fill class is present and the style sets its width off a derived
//      extent.
const hasSingleFlowFill = /class="[^"]*\bprogress-sectioned-flow\b/.test(templateBlock);
// (1c) NO internal-boundary --radius-pill corner: no selector carries a
//      `border-start-end-radius`/`border-end-end-radius: var(--radius-pill)` on a
//      per-cell internal fill. The ONE cap belongs at the single front; we assert
//      the deprecated per-cell trailing-corner pill is GONE from the style block.
const hasInternalPillCap =
    /border-(start|end)-end-radius:\s*var\(--radius-pill\)/.test(styleBlock) &&
    /progress-sectioned-fill\b/.test(styleBlock);
add(
    "w1-one-fill-not-n-cells",
    hasSingleFlowFill && !hasCellVfor && !hasPerCellFillSpan && !hasInternalPillCap,
    hasSingleFlowFill && !hasCellVfor && !hasPerCellFillSpan && !hasInternalPillCap
        ? "ONE fill element spans the cumulative filled extent (the .progress-sectioned-flow single fill present), the per-cell `v-for` .progress-sectioned-cell stack + the .progress-sectioned-fill per-cell span are GONE, and NO internal segment-boundary fill carries a --radius-pill corner — one fill, one cap (RC-1 + RC-4)"
        : `RC-1/RC-4 NOT closed: singleFlowFill=${hasSingleFlowFill}, cellVfor=${hasCellVfor}, perCellFillSpan=${hasPerCellFillSpan}, internalPillCap=${hasInternalPillCap}`,
);

// ONE leading-edge cap only (RC-1, the positive): exactly the single fill front
// rounds its trailing corner (a `--radius-pill`/border-radius on the flow fill is
// allowed), and the cap is NOT replicated per internal cell (asserted above).
const flowFillRule =
    (styleBlock.match(/\.progress-sectioned-flow\b[^{]*\{[\s\S]*?\}/) || [""])[0];
const flowHasFrontCap =
    /border-(start|end)-end-radius:\s*var\(--radius-pill\)/.test(flowFillRule) ||
    /border-radius:\s*[^;]*var\(--radius-pill\)/.test(flowFillRule);
add(
    "w1b-single-front-cap",
    flowHasFrontCap,
    flowHasFrontCap
        ? "the single .progress-sectioned-flow fill rounds ONLY its trailing (front) corner with --radius-pill — the one leading-edge cap (RC-1)"
        : "the single flow fill does NOT carry a single front --radius-pill cap (RC-1 — the one-cap intent unmet)",
);

// ═══════════════════════════════════════════════════════════════════════════
// W2 — NO screen-seam band (RC-2)
// ═══════════════════════════════════════════════════════════════════════════
const hasScreenBlend = /mix-blend-mode:\s*screen/.test(sfc);
const hasSeamSelector = /\.progress-sectioned-seam\b/.test(styleBlock);
const hasSeamRender = /class="progress-sectioned-seam"/.test(templateBlock);
// The boundary blend lives in a multi-stop linear-gradient referencing the
// segment colors on the single fill (the POSITIVE — a gradient is built from the
// cells data). We assert a `linear-gradient(` is present in the SFC paint (the
// flow fill is a gradient) AND the cells colours feed it (a computed
// gradient/fillGradient string is built in <script>).
const scriptBlock = (sfc.match(/<script[^>]*>[\s\S]*?<\/script>/) || [""])[0];
const buildsGradientFromCells =
    /(?:fillGradient|gradientStops|flowGradient|sectionedGradient)/.test(scriptBlock) ||
    /linear-gradient\([^)]*var\(--cell|cells\.value[\s\S]{0,400}?(?:linear-gradient|%,)/.test(
        sfc,
    );
add(
    "w2-no-screen-seam-band",
    !hasScreenBlend && !hasSeamSelector && !hasSeamRender && buildsGradientFromCells,
    !hasScreenBlend && !hasSeamSelector && !hasSeamRender && buildsGradientFromCells
        ? "NO `mix-blend-mode: screen`, NO `.progress-sectioned-seam` selector, NO seam render — the boundary blend lives in a multi-stop linear-gradient built from the cells colours on the single fill (RC-2)"
        : `RC-2 NOT closed: screenBlend=${hasScreenBlend}, seamSelector=${hasSeamSelector}, seamRender=${hasSeamRender}, gradientFromCells=${buildsGradientFromCells}`,
);

// ═══════════════════════════════════════════════════════════════════════════
// W3 — the glass meter track (IG-C1)
// ═══════════════════════════════════════════════════════════════════════════
const railRule =
    (styleBlock.match(/\.progress-sectioned-rail\b[^{]*\{[\s\S]*?\n\}/) || [""])[0];
const railRoutesGlass = /var\(--glass-bg-quiet\)/.test(railRule);
const railHasBlur = /backdrop-filter:\s*[^;]*var\(--glass-blur-quiet\)/.test(railRule);
// The recessed-channel inner-shadow groove chrome is PRESERVED (an inset
// box-shadow remains on the rail).
const railKeepsGroove = /box-shadow:[\s\S]*?inset[\s\S]*?;/.test(railRule);
add(
    "w3-glass-meter-track",
    railRoutesGlass && railHasBlur && railKeepsGroove,
    railRoutesGlass && railHasBlur && railKeepsGroove
        ? "the .progress-sectioned-rail routes through --glass-bg-quiet + a --glass-blur-quiet backdrop-filter (the frosted glass meter register) AND the recessed-channel inner-shadow box-shadow groove is PRESERVED (IG-C1)"
        : `IG-C1 NOT closed: glassBg=${railRoutesGlass}, blur=${railHasBlur}, grooveKept=${railKeepsGroove}`,
);

// ═══════════════════════════════════════════════════════════════════════════
// W4 — pending keeps its hue, no neutral wash (RC-3)
// ═══════════════════════════════════════════════════════════════════════════
// (4a) the demo segment data no longer passes a flat --surface-tint-40 neutral
//      for a phase color — every segment color is a real phase hue (--viz-*/
//      --chart-*).
const demoUsesNeutralTint = /color:\s*["']var\(--surface-tint-40\)["']/.test(demo);
// (4b) the component pending recipe references the segment's own --cell-color as a
//      low-alpha ghost (NOT a hardcoded neutral, NOT the sole flat 12% wash). The
//      ghost reads --cell-color in the pending/track paint.
const pendingReadsCellColor =
    /(?:ghost|pending)[\s\S]{0,120}?var\(--cell-color\)/i.test(styleBlock) ||
    /var\(--cell-color\)[\s\S]{0,80}?(?:ghost|pending|low-?alpha|8%|10%|12%|14%|16%)/i.test(
        styleBlock,
    ) ||
    /(?:ghostGradient|pendingGradient|trackGhost)/.test(scriptBlock);
add(
    "w4-pending-keeps-hue",
    !demoUsesNeutralTint && pendingReadsCellColor,
    !demoUsesNeutralTint && pendingReadsCellColor
        ? "pending keeps its real hue: the demo `upload` segment is a --viz-*/--chart-* phase hue (no flat --surface-tint-40 neutral), and the component pending/ghost recipe references the segment's own --cell-color as a low-alpha ghost on the track (RC-3)"
        : `RC-3 NOT closed: demoNeutralTint=${demoUsesNeutralTint}, pendingReadsCellColor=${pendingReadsCellColor}`,
);

// ── (z) the π readback spec is wired (the BINDING close) ─────────────────────
add(
    "pi-readback-spec-exists",
    existsSync(resolve(ROOT, "tests-visual/progress-gradient.spec.ts")),
    "tests-visual/progress-gradient.spec.ts exists (the π /feedback/progress readback: one continuous fill, no bright seam stripe, no dead notch, distinct-yet-blended segments, the frosted glass track — the BINDING visual truth)",
);

// ── Report ──────────────────────────────────────────────────────────────────
const failed = checks.filter((c) => !c.pass);

console.log(
    "proof:progress-gradient — the sectioned Progress rebuilt on a single-fill gradient (no per-cell pills, no screen seam, glass meter track, pending ghost) (BA.W-PROGRESS-GRADIENT)",
);
console.log(`  ${checks.filter((c) => c.pass).length}/${checks.length} pass`);
for (const c of checks) console.log(`    ${c.pass ? "✓" : "✗"} ${c.id} — ${c.detail}`);

const pass = failed.length === 0;
const ARTIFACT = gateArtifactPath("GATE_PROGRESS_GRADIENT_OUT", "BA-progress-gradient");
writeGateArtifact(ARTIFACT, {
    generatedAt: snapshotStamp(),
    status: pass ? "pass" : "fail",
    gate: "proof:progress-gradient",
    command: COMMAND,
    note: "DEVICE-FREE SOURCE arm — the RESOLVED one-continuous-fill / no-seam-stripe / no-dead-notch / distinct-yet-blended-segments / frosted-glass-track truth is proven by tests-visual/progress-gradient.spec.ts (the π readback) + the proof:ba-gestalt whole-page verdict (the binding close), never this gate alone.",
    checks: checks.map((c) => ({ id: c.id, pass: c.pass, detail: c.detail })),
});

if (!pass) {
    console.error(`\n[proof:progress-gradient] ${failed.length} check(s) FAILED:`);
    for (const c of failed) console.error(`  ✗ ${c.id} — ${c.detail}`);
    process.exit(1);
}
console.log(
    "\n[proof:progress-gradient] the sectioned phase-bus is ONE continuous blended liquid filling a frosted recessed channel — distinct segments hold their hue across their span and blend over short boundary zones, the single front carries the one pill cap, pending phases keep their real hue as a faint ghost, and the glass meter track reads over the dark register. No per-cell pills, no screen seam, no dead notch. The π arm + the ba-gestalt verdict bind the painted render.",
);

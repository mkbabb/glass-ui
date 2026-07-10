// BA.W-DOCK-GEOMETRY / BG.W-DOCK-CAP-SCROLL-FADE — proof:dock-plate-clearance,
// the control-plate clearance + scroll-port cross-axis un-clip gate (born-RED at
// HEAD, driven GREEN by the wave).
//
// BG.W-DOCK-CAP-SCROLL-FADE re-points W2 off the impossible cross-axis-`visible`
// assertion onto the mechanically-honest `clip` + `overflow-clip-margin` un-clip.
// The prior `overflow-x/y: visible` pin was a LATENT NO-OP: CSS Overflow §3 forces
// a `visible` SIBLING of an `auto` axis to COMPUTE to `auto`, so the cross axis
// clipped the inset plate anyway (the geometric inset was the SOLE guard). The
// port's cross axis is now `overflow-*: clip` (NOT a scroll value, so §3 leaves it
// alone) + `overflow-clip-margin: var(--dock-control-safe-inset)` (the clip region
// extends outward by the inset budget). The `overflow="scroll"` opt-in + the
// `.dock-scroll-y` class are RETIRED (a capped axis is intrinsically a scroll
// axis): the vertical block-axis scroll folds into the unconditional cap-derived
// shell.css rule, and W2 asserts NO `.dock-scroll-y` rule survives.
//
// THE DEFECT (DC-1 / DC-2 / WVR-6, three stacked clip mechanisms). A dock
// control's hover/active/press round plate reads as a FLAT-TOPPED LOZENGE, not a
// clean circle, because:
//   (1) the control plate EXACTLY fills its track cell — `--dock-control-size` ==
//       `--dock-layer-height` (both the SAME density base, e.g. comfortable
//       2.5rem) — so the plate has 0px slack and the 1.1× hover / full active
//       circle slices on the clip edge (DC-2);
//   (2) the scroll port arms the cross-axis clip UNCONDITIONALLY on the
//       fit-content shells: a single-axis `overflow-x:auto` / `overflow-y:auto`
//       makes the OTHER (cross) axis compute from `visible` to `auto` (the MDN
//       single-axis-clip-degrades caveat), so the cross axis clips the plate; both
//       shell docks pass `overflow="scroll"` on rows that never overflow (DC-1);
//   (3) the root `.glass-dock { contain: paint }` is a SECOND clip box that
//       re-bites once the inner cross axis frees (WVR-6 / BA-RAILSEAT-3).
//
// THE FIX (this wave): (1) mint `--dock-control-safe-inset` in the density cascade
// and route it through the control plate as a padding + `background-clip:
// content-box` inset, so the painted plate is INSET within a full-size hit cell
// (the WCAG 2.5.5 floor stays on the box; the painted plate shrinks below the cell
// by the inset → the maximal hover/active silhouette clears the clip edge with
// margin). (2) PIN the scroll-port cross axis explicitly `visible` (not left to
// the companion `auto`), and flip both shell docks off `overflow="scroll"`. (3)
// record the contain:paint audit verdict.
//
// WHAT THIS GATE PROVES — THREE SOURCE WITNESSES (device-free) + a π DELTA:
//   W1 (source) — `--dock-control-safe-inset` is declared in the density cascade
//      AND consumed so the resolved painted-plate diameter × `--scale-hover-dock`
//      is STRICTLY LESS than `--dock-layer-height` on EVERY density rung (a
//      POSITIVE inset budget). Anti-evasion: the inequality is asserted per rung
//      with the actual resolved numbers — a `0px` inset (the dead-knob evasion)
//      reds because the plate would still equal the cell. RED at HEAD: no
//      `--dock-control-safe-inset` exists (grep 0); the control plate ==
//      layer-height (both the same density base) → zero slack.
//   W2 (source) — the scroll-port CROSS axis is `overflow-*: clip` +
//      `overflow-clip-margin: var(--dock-control-safe-inset)` (the honest un-clip),
//      NOT the latent-no-op `visible` pin: the horizontal port
//      (`.dock-scroll-x .dock-layer--full`, overflow.css) pins `overflow-y: clip`
//      + the clip-margin, and the vertical port (the unconditional cap-derived
//      `.glass-dock.vertical…:not([data-morphing])` rule, shell.css) pins
//      `overflow-x: clip` + the clip-margin. The `.dock-scroll-y` opt-in class is
//      DEFINITION-ABSENT (retired — a capped vertical axis is intrinsically a
//      scroll axis). AND both shell docks pass NO `overflow="scroll"`. RED at HEAD:
//      the cross axis is `overflow-*: visible` (the no-op) with no clip-margin.
//   W3 (source) — the contain:paint audit verdict is a RECORDED gate fact: either
//      (a) `shell.css` `contain: paint` is unedited (the plate stays inside the
//      dock padding box) with the recorded verdict marker, OR (b) the containment
//      is lifted on the control-plate band on the morph-settled axis,
//      `[data-morphing]`-guarded so the W2 clip-reveal aperture is intact. RED at
//      HEAD: no verdict marker recorded.
//
// The π binding readback (the cardinal-lesson DELTA) lives in the tests-visual
// workspace (tests-visual/dock-plate-clearance.spec.ts) + the captured DELTA at
// docs/tranches/BA/audit/visual/W-DOCK-GEOMETRY-DELTA.md — a live capture of BOTH
// shell docks (bottom horizontal + sidebar vertical), hover + active + press,
// both modes, proving the plate slack ≥1px on every axis, the cross-axis clip
// ancestor `overflow:visible`, and the painted silhouette a full circle. The
// device-free W1+W2+W3 source arm runs on EVERY runner; the π readback is the
// binding visual truth (a source-green/visually-broken render does NOT close).

import { resolve } from "node:path";
import { existsSync, readFileSync } from "node:fs";
import { fileURLToPath, pathToFileURL } from "node:url";
import { gateArtifactPath, snapshotStamp, writeGateArtifact } from "./gate-output.mjs";
import { readDockCss } from "./read-dock-css.mjs";
import { readMonolith } from "./read-css-monoliths.mjs";

const COMMAND = "npm run proof:dock-plate-clearance";

// The hover scale the maximal painted silhouette grows by (tokens/scale-paper.css
// `--scale-hover-dock: 1.1`). The W1 inequality is `plate × HOVER_SCALE < cell`.
const HOVER_SCALE = 1.1;
// The π-equivalent source floor: the plate-vs-cell slack PER SIDE at hover must be
// ≥ this many px on every density rung (the lozenge dies with margin, not on the
// edge). The painted plate is CENTERED in the cell (flex `align-items: center`), so
// slack/side = (cell − plate×HOVER_SCALE) / 2.
const MIN_SLACK_PX = 1;
const PX_PER_REM = 16;

// ── Strip CSS block comments (false-witness discipline) ─────────────────────────
function blankRange(text, start, end) {
    let out = "";
    for (let i = start; i < end; i++) out += text[i] === "\n" ? "\n" : " ";
    return out;
}
function stripBlockComments(text) {
    let result = "";
    let i = 0;
    while (i < text.length) {
        if (text[i] === "/" && text[i + 1] === "*") {
            const end = text.indexOf("*/", i + 2);
            const stop = end === -1 ? text.length : end + 2;
            result += blankRange(text, i, stop);
            i = stop;
        } else {
            result += text[i];
            i++;
        }
    }
    return result;
}

// Strip BOTH block (`/* */`) and line (`//`) comments — the Vue SFC `<script>`
// blocks carry `//` doc-comments that mention `overflow="scroll"` describing the
// PRIOR shape; a raw grep over them false-flags the consumer half. (CSS partials
// have no `//` comments so this is a no-op there; the `://` in a URL is not a
// concern in these sources.)
function stripAllComments(text) {
    const noBlock = stripBlockComments(text);
    let result = "";
    let i = 0;
    while (i < noBlock.length) {
        if (noBlock[i] === "/" && noBlock[i + 1] === "/") {
            const end = noBlock.indexOf("\n", i + 2);
            const stop = end === -1 ? noBlock.length : end;
            result += blankRange(noBlock, i, stop);
            i = stop;
        } else {
            result += noBlock[i];
            i++;
        }
    }
    return result;
}

// Parse a `<n>rem` / `<n>px` length to px. Returns NaN for anything else.
function lenToPx(raw) {
    if (raw == null) return NaN;
    const s = String(raw).trim();
    let m = s.match(/^([\d.]+)rem$/);
    if (m) return Number.parseFloat(m[1]) * PX_PER_REM;
    m = s.match(/^([\d.]+)px$/);
    if (m) return Number.parseFloat(m[1]);
    return NaN;
}

// The four density rungs + their control-size base literal (the `2rem`/`2.5rem`/
// `2.75rem`/`4rem` defaults in density.css). The gate resolves the cell
// (`--dock-layer-height`, SAME base) and the painted plate per rung. Fine-pointer
// `--dock-scale` = 1 (the worst case for the lozenge: the smallest absolute slack).
const DENSITY_RUNGS = ["compact", "comfortable", "spacious", "audacious"];

// ── W1 — the plate clears the cell on every density rung (source, device-free) ──
// PURE over the comment-stripped density + control-family CSS. We:
//   (a) confirm `--dock-control-safe-inset` is DECLARED in the density cascade,
//   (b) extract the inset FRACTION it resolves to (the inset is a per-side padding
//       expressed as `calc(var(--dock-control-size) * FRACTION)` so it scales with
//       every rung), then the painted plate diameter = control-size × (1 − 2×F),
//   (c) confirm a control family CONSUMES the inset (padding + `background-clip:
//       content-box` so the painted plate is inset within the full hit box),
//   (d) assert per rung: plate × HOVER_SCALE < cell AND slack/side ≥ MIN_SLACK_PX.
export function detectPlateClearance(densityCss, controlsCss) {
    const violations = [];
    const facts = {};
    const density = stripBlockComments(densityCss);
    const controls = stripBlockComments(controlsCss);

    // (a) the token is declared in the density cascade.
    const insetDeclared = /--dock-control-safe-inset\s*:/.test(density);
    facts.insetDeclaredInDensity = insetDeclared;
    if (!insetDeclared) {
        violations.push(
            "W1: `--dock-control-safe-inset` is not declared in the density cascade (dock/density.css) — the plate has no inset budget; it exactly fills the track cell (DC-2 zero-slack)",
        );
    }

    // (b) the inset FRACTION (per-side padding fraction of the control size). The
    // canonical form is `calc(var(--dock-control-size) * <F>)`. Extract <F>.
    let fraction = NaN;
    const fm = density.match(
        /--dock-control-safe-inset\s*:\s*calc\(\s*var\(\s*--dock-control-size\s*\)\s*\*\s*([\d.]+)\s*\)/,
    );
    if (fm) fraction = Number.parseFloat(fm[1]);
    facts.insetFraction = Number.isNaN(fraction) ? null : fraction;
    if (insetDeclared && Number.isNaN(fraction)) {
        violations.push(
            "W1: `--dock-control-safe-inset` is declared but not in the canonical `calc(var(--dock-control-size) * <fraction>)` form — the gate cannot resolve a per-rung budget (a literal/dead form evades the per-rung inequality bite)",
        );
    }
    if (!Number.isNaN(fraction) && fraction <= 0) {
        violations.push(
            `W1: the inset fraction resolves to ${fraction} (≤ 0) — a 0/negative inset is the dead-knob evasion (the plate still equals the cell; AX.W55 substitution class)`,
        );
    }

    // (c) a control family CONSUMES the inset as a painted-plate inset (padding +
    // background-clip content-box keeps the hit box full while the painted plate
    // insets). The icon-button is the canonical consumer; the bite requires BOTH
    // the inset on padding AND `background-clip: content-box` (a padding-only edit
    // would shrink the glyph gutter without insetting the painted plate). The token
    // may sit as a `var()` FALLBACK (`padding: var(--dock-icon-padding,
    // var(--dock-control-safe-inset, 0))`), so we match a `padding`/`padding-block`
    // declaration whose value mentions the inset token anywhere.
    const insetOnPadding =
        /padding(-block|-inline)?\s*:[^;}]*--dock-control-safe-inset/.test(controls);
    const bgClipContent = /background-clip\s*:\s*content-box/.test(controls);
    facts.insetConsumedOnPadding = insetOnPadding;
    facts.backgroundClipContentBox = bgClipContent;
    if (!insetOnPadding) {
        violations.push(
            "W1: no control family consumes `--dock-control-safe-inset` on `padding` (dock-controls/*.css) — the inset token is declared but unconsumed (the plate still paints to the box edge)",
        );
    }
    if (!bgClipContent) {
        violations.push(
            "W1: no control family sets `background-clip: content-box` — without it the inset padding does not inset the PAINTED plate (the hover/active fill still paints the full box edge, slicing on the clip)",
        );
    }

    // (d) the per-rung inequality. control-size base == layer-height base (the SAME
    // density literal); plate = base × (1 − 2×F). At fine pointer --dock-scale = 1.
    const rungBases = {
        compact: 2,
        comfortable: 2.5,
        spacious: 2.75,
        audacious: 4,
    };
    const rungs = {};
    let allClear = true;
    for (const rung of DENSITY_RUNGS) {
        const baseRem = rungBases[rung];
        const cellPx = baseRem * PX_PER_REM;
        const f = Number.isNaN(fraction) ? 0 : fraction;
        const platePx = cellPx * (1 - 2 * f);
        const hoverPlatePx = platePx * HOVER_SCALE;
        const slackPerSide = (cellPx - hoverPlatePx) / 2;
        const clears = hoverPlatePx < cellPx && slackPerSide >= MIN_SLACK_PX;
        rungs[rung] = {
            cellPx: round(cellPx),
            platePx: round(platePx),
            hoverPlatePx: round(hoverPlatePx),
            slackPerSidePx: round(slackPerSide),
            clears,
        };
        if (!clears) {
            allClear = false;
            violations.push(
                `W1: density rung "${rung}" — the painted plate ${round(platePx)}px × ${HOVER_SCALE} hover = ${round(hoverPlatePx)}px does NOT clear the ${round(cellPx)}px cell with ≥${MIN_SLACK_PX}px slack/side (got ${round(slackPerSide)}px) — the lozenge still slices on this rung`,
            );
        }
    }
    facts.rungs = rungs;
    facts.allRungsClear = allClear;

    return { facts, violations };
}

function round(n) {
    return Math.round(n * 100) / 100;
}

// ── W2 — the scroll-port cross axis is `clip` + margin (source, device-free) ────
// PURE over the comment-stripped dock CSS + the two shell-dock SFCs. Each scroll
// port's CROSS axis must be `overflow-*: clip` (NOT the latent-no-op `visible`,
// which CSS Overflow §3 computes to `auto` beside a scroll sibling; NOT `hidden`)
// PLUS `overflow-clip-margin: var(--dock-control-safe-inset)` (the clip region
// extended outward by the inset budget so the 1.1× hover plate paints past the
// track). The `.dock-scroll-y` opt-in class is RETIRED (a capped vertical axis
// intrinsically scrolls via the unconditional shell rule). And neither shell dock
// passes `overflow="scroll"` (the value is retired).
const CLIP_MARGIN_RE = /overflow-clip-margin\s*:\s*[^;}]*--dock-control-safe-inset/;

export function detectScrollPortCrossAxis(dockCss, bottomDockSrc, sidebarDockSrc) {
    const violations = [];
    const facts = {};
    const css = stripBlockComments(dockCss).replace(/\s+/g, " ");

    // The scroll-port rule blocks. We isolate the rule whose selector matches each
    // port and inspect its declared overflow axes. (The `@supports (animation-
    // timeline: scroll())` mask arm shares the port selector but carries no
    // `overflow-*: auto`, so the `.find`s below pick the main rule.)
    const blocks = [...css.matchAll(/([^{}]+)\{([^{}]*)\}/g)].map((b) => ({
        selector: b[1].trim(),
        body: b[2],
    }));

    // Horizontal port: `.glass-dock.dock-scroll-x .dock-layer--full` declares
    // `overflow-x: auto`; the CROSS axis is `overflow-y` — must be `clip` + margin.
    const xPort = blocks.find(
        (b) =>
            /\.glass-dock\.dock-scroll-x\s+\.dock-layer--full\b/.test(b.selector) &&
            /overflow-x\s*:\s*auto/.test(b.body),
    );
    facts.xPortFound = Boolean(xPort);
    if (!xPort) {
        violations.push(
            "W2: the horizontal scroll port `.glass-dock.dock-scroll-x .dock-layer--full { overflow-x:auto }` rule was not found (overflow.css drift?) — cannot confirm the cross-y clip",
        );
    } else {
        const yClip = /overflow-y\s*:\s*clip/.test(xPort.body);
        const yMargin = CLIP_MARGIN_RE.test(xPort.body);
        facts.xPortCrossYClip = yClip;
        facts.xPortCrossYClipMargin = yMargin;
        if (!yClip) {
            violations.push(
                "W2: the horizontal scroll port `.dock-scroll-x .dock-layer--full` cross axis is not `overflow-y: clip` — a `visible`/absent sibling of `overflow-x: auto` computes to `auto` (CSS Overflow §3) and clips the plate top/bottom (the latent no-op the BG re-point kills)",
            );
        }
        if (!yMargin) {
            violations.push(
                "W2: the horizontal scroll port `.dock-scroll-x .dock-layer--full` lacks `overflow-clip-margin: var(--dock-control-safe-inset)` — the clip region does not extend by the inset budget, so the 1.1× hover plate slices on the clip edge",
            );
        }
    }

    // Vertical port: the UNCONDITIONAL cap-derived shell rule
    // `.glass-dock.vertical…:not([data-morphing]) { overflow-y: auto }`; the CROSS
    // axis is `overflow-x` — must be `clip` + margin.
    const yPort = blocks.find(
        (b) =>
            /\.glass-dock\.vertical\b/.test(b.selector) &&
            /:not\(\[data-morphing\]\)/.test(b.selector) &&
            !/::-webkit-scrollbar/.test(b.selector) &&
            /overflow-y\s*:\s*auto/.test(b.body),
    );
    facts.yPortFound = Boolean(yPort);
    if (!yPort) {
        violations.push(
            "W2: the vertical cap-derived scroll port `.glass-dock.vertical…:not([data-morphing]) { overflow-y:auto }` rule was not found (shell.css drift?) — cannot confirm the cross-x clip",
        );
    } else {
        const xClip = /overflow-x\s*:\s*clip/.test(yPort.body);
        const xMargin = CLIP_MARGIN_RE.test(yPort.body);
        facts.yPortCrossXClip = xClip;
        facts.yPortCrossXClipMargin = xMargin;
        if (!xClip) {
            violations.push(
                "W2: the vertical scroll port `.glass-dock.vertical…:not([data-morphing])` cross axis is not `overflow-x: clip` — a `visible`/absent sibling of `overflow-y: auto` computes to `auto` (CSS Overflow §3) and clips the plate left/right (the latent no-op)",
            );
        }
        if (!xMargin) {
            violations.push(
                "W2: the vertical scroll port lacks `overflow-clip-margin: var(--dock-control-safe-inset)` — the clip region does not extend by the inset budget, so the 1.1× hover plate slices on the clip edge",
            );
        }
    }

    // The `.dock-scroll-y` opt-in class is RETIRED — any surviving rule selector
    // mentioning it is a dual-path regression (the capped vertical axis scrolls via
    // the unconditional shell rule above, not a second opt-in port).
    const dockScrollYSurvivors = blocks.filter((b) => /\.dock-scroll-y\b/.test(b.selector));
    facts.dockScrollYRetired = dockScrollYSurvivors.length === 0;
    if (dockScrollYSurvivors.length) {
        violations.push(
            `W2: the retired .dock-scroll-y opt-in class still has ${dockScrollYSurvivors.length} live rule(s) (e.g. "${dockScrollYSurvivors[0].selector}") — a capped vertical axis scrolls via the unconditional shell rule, not a second opt-in port (dual-path regression)`,
        );
    }

    // The shell docks must pass NO `overflow="scroll"` (the value is retired — a
    // capped axis scrolls intrinsically; there is no `"scroll"` union member).
    const bottomScroll = /overflow\s*=\s*"scroll"/.test(stripAllComments(bottomDockSrc));
    const sidebarScroll = /overflow\s*=\s*"scroll"/.test(stripAllComments(sidebarDockSrc));
    facts.bottomDockOverflowScroll = bottomScroll;
    facts.sidebarDockOverflowScroll = sidebarScroll;
    if (bottomScroll) {
        violations.push(
            'W2: demo/shell/BottomDock.vue still passes `overflow="scroll"` — the value is RETIRED (a capped axis scrolls intrinsically; there is no `"scroll"` union member)',
        );
    }
    if (sidebarScroll) {
        violations.push(
            'W2: demo/shell/SidebarDock.vue still passes `overflow="scroll"` — the value is RETIRED (a capped axis scrolls intrinsically; there is no `"scroll"` union member)',
        );
    }

    return { facts, violations };
}

// ── W3 — the contain:paint audit is a RECORDED gate fact (source, device-free) ──
// The scope-4 verdict is recorded as a machine-readable marker comment in
// shell.css: either `/* BA.W-DOCK-GEOMETRY contain:paint AUDIT verdict (a) … */`
// (the plate stays inside the dock padding box → contain:paint UNEDITED) or
// verdict (b) (the containment lifted on the control-plate band, [data-morphing]-
// guarded). The marker names the verdict + the live measurement so a future agent
// cannot silently regress the box.
export function detectContainPaintAudit(shellCssRaw) {
    const violations = [];
    const facts = {};

    const verdictA = /BA\.W-DOCK-GEOMETRY[^*]*contain:paint AUDIT verdict \(a\)/i.test(shellCssRaw);
    const verdictB = /BA\.W-DOCK-GEOMETRY[^*]*contain:paint AUDIT verdict \(b\)/i.test(shellCssRaw);
    facts.verdictARecorded = verdictA;
    facts.verdictBRecorded = verdictB;

    if (!verdictA && !verdictB) {
        violations.push(
            "W3: no contain:paint AUDIT verdict marker recorded in shell.css (scope-4) — the proximate-box ownership must be a gate FACT, not prose (a `/* BA.W-DOCK-GEOMETRY … contain:paint AUDIT verdict (a|b) … */` marker)",
        );
        return { facts, violations };
    }

    // verdict (a): the `paint` clip axis is RETAINED on the `.glass-dock` base (the
    // plate stays inside the dock padding box). BB.W-PERF-PRODUCER A′-4 widened the
    // value to `contain: layout style paint` (the restyle-scope axes alongside the
    // paint clip box — NOT a containment LIFT off the control-plate band), so the
    // probe matches `paint` ANYWHERE in the contain value union, not the bare form.
    const containPaintPresent = /contain\s*:\s*[^;}]*\bpaint\b/.test(stripBlockComments(shellCssRaw));
    facts.containPaintPresent = containPaintPresent;
    if (verdictA && !containPaintPresent) {
        violations.push(
            "W3: verdict (a) recorded (contain:paint unedited) but `contain: paint` is no longer present on `.glass-dock` — the verdict marker contradicts the source",
        );
    }

    // verdict (b): the lift must be [data-morphing]-guarded so the W2 clip-reveal
    // aperture is intact (a bare `contain: none` / `overflow: visible` on the morph
    // axis would break the clip-reveal). We require a [data-morphing] guard near a
    // contain lift if verdict (b) is claimed.
    if (verdictB) {
        const guardedLift =
            /:not\(\[data-morphing\]\)/.test(shellCssRaw) &&
            /contain\s*:\s*(none|layout|size|layout\s+size|style|layout\s+style)/.test(
                stripBlockComments(shellCssRaw),
            );
        facts.verdictBGuarded = guardedLift;
        if (!guardedLift) {
            violations.push(
                "W3: verdict (b) recorded (containment lifted) but the lift is not [data-morphing]-guarded — an unguarded contain-lift on the morph axis breaks the W2 clip-reveal aperture",
            );
        }
    }

    return { facts, violations };
}

async function run() {
    const ROOT = resolve(fileURLToPath(new URL("../", import.meta.url)));
    const ARTIFACT = gateArtifactPath(
        "GLASS_UI_DOCK_PLATE_CLEARANCE_ARTIFACT",
        "BA-dock-plate-clearance",
    );

    const dockCss = readDockCss(ROOT); // shell + morph + density + layers + layer-group + overflow
    const densityCss = readFileSync(resolve(ROOT, "src/styles/dock/density.css"), "utf8");
    const shellCss = readFileSync(resolve(ROOT, "src/styles/dock/shell.css"), "utf8");
    const controlsCss = readMonolith(ROOT, "dock-controls"); // the five control-family partials
    const bottomDock = readFileSync(resolve(ROOT, "demo/shell/BottomDock.vue"), "utf8");
    const sidebarDock = readFileSync(resolve(ROOT, "demo/shell/SidebarDock.vue"), "utf8");

    const w1 = detectPlateClearance(densityCss, controlsCss);
    const w2 = detectScrollPortCrossAxis(dockCss, bottomDock, sidebarDock);
    const w3 = detectContainPaintAudit(shellCss);

    const violations = [...w1.violations, ...w2.violations, ...w3.violations];
    const status = violations.length === 0 ? "pass" : "fail";

    writeGateArtifact(ARTIFACT, {
        generatedAt: snapshotStamp(),
        status,
        command: COMMAND,
        facts: { w1: w1.facts, w2: w2.facts, w3: w3.facts },
        violations,
    });

    printSummary({ status, w1, w2, w3 });
    process.exit(status === "pass" ? 0 : 1);
}

function printSummary({ status, w1, w2, w3 }) {
    console.log(
        "proof:dock-plate-clearance — the control-plate clearance + scroll-port cross-axis un-clip gate (BA.W-DOCK-GEOMETRY)",
    );
    const r = w1.facts.rungs ?? {};
    console.log(
        `  W1 plate clears cell  : insetFraction=${w1.facts.insetFraction ?? "n/a"} consumed(padding/bg-clip)=${w1.facts.insetConsumedOnPadding}/${w1.facts.backgroundClipContentBox} allRungsClear=${w1.facts.allRungsClear} ${w1.violations.length === 0 ? "OK" : "RED"}`,
    );
    for (const rung of DENSITY_RUNGS) {
        if (r[rung])
            console.log(
                `      ${rung.padEnd(12)}: cell=${r[rung].cellPx}px plate=${r[rung].platePx}px hover=${r[rung].hoverPlatePx}px slack/side=${r[rung].slackPerSidePx}px ${r[rung].clears ? "clears" : "SLICES"}`,
            );
    }
    console.log(
        `  W2 cross-axis clip    : x-port(cross-y clip/margin)=${w2.facts.xPortCrossYClip}/${w2.facts.xPortCrossYClipMargin} y-port(cross-x clip/margin)=${w2.facts.yPortCrossXClip}/${w2.facts.yPortCrossXClipMargin} scroll-y-retired=${w2.facts.dockScrollYRetired} shellScroll(bottom/side)=${w2.facts.bottomDockOverflowScroll}/${w2.facts.sidebarDockOverflowScroll} ${w2.violations.length === 0 ? "OK" : "RED"}`,
    );
    console.log(
        `  W3 contain:paint audit: verdict(a)=${w3.facts.verdictARecorded} verdict(b)=${w3.facts.verdictBRecorded} ${w3.violations.length === 0 ? "OK" : "RED"}`,
    );
    const allV = [...w1.violations, ...w2.violations, ...w3.violations];
    if (allV.length) {
        console.log("\nVIOLATIONS:");
        for (const v of allV) console.log(`  x ${v}`);
    }
    console.log(`\n  status: ${status.toUpperCase()}`);
}

// ── Self-test (BG.W-DOCK-CAP-SCROLL-FADE) — the W2 re-point bites ───────────────
// Each planted defect MUST flag; the correct clip+clip-margin form MUST pass. Run
// with `--self-test`. This is the born-RED witness: the pre-BG `overflow-*:visible`
// no-op re-reds here, so a regression that reverts the honest un-clip cannot ship.
const GOOD_W2_CSS = `
@layer components {
  .glass-dock.dock-scroll-x .dock-layer--full {
    overflow-x: auto;
    overflow-y: clip;
    overflow-clip-margin: var(--dock-control-safe-inset);
  }
  .glass-dock.vertical.always-expanded:not([data-morphing]),
  .glass-dock.vertical.expanded:not([data-morphing]) {
    overflow-x: clip;
    overflow-clip-margin: var(--dock-control-safe-inset);
    overflow-y: auto;
  }
}`;

function runSelfTest() {
    const bites = [];
    const record = (name, ok, detail) => bites.push({ name, ok, detail });

    // bite D — the correct clip+clip-margin form passes clean.
    {
        const { violations } = detectScrollPortCrossAxis(GOOD_W2_CSS, "", "");
        record("correct-clip+margin-passes", violations.length === 0, violations.join(" | "));
    }
    // bite A — the pre-BG `overflow-y: visible` no-op on the x-port RE-REDS.
    {
        const css = GOOD_W2_CSS.replace("overflow-y: clip;", "overflow-y: visible;");
        const { violations } = detectScrollPortCrossAxis(css, "", "");
        record(
            "visible-no-op-x-port-flags",
            violations.some((v) => /overflow-y: clip/.test(v)),
            violations.join(" | "),
        );
    }
    // bite B — a clip axis WITHOUT the clip-margin flags (the inset budget bite).
    {
        const css = GOOD_W2_CSS.replace(
            "    overflow-y: clip;\n    overflow-clip-margin: var(--dock-control-safe-inset);",
            "    overflow-y: clip;",
        );
        const { violations } = detectScrollPortCrossAxis(css, "", "");
        record(
            "missing-clip-margin-x-port-flags",
            violations.some((v) => /overflow-clip-margin/.test(v)),
            violations.join(" | "),
        );
    }
    // bite C — a SURVIVING `.dock-scroll-y` opt-in rule flags the dual-path.
    {
        const css =
            GOOD_W2_CSS +
            `\n.glass-dock.vertical.dock-scroll-y { overflow-y: auto; overflow-x: clip; overflow-clip-margin: var(--dock-control-safe-inset); }`;
        const { violations } = detectScrollPortCrossAxis(css, "", "");
        record(
            "surviving-dock-scroll-y-flags",
            violations.some((v) => /\.dock-scroll-y/.test(v)),
            violations.join(" | "),
        );
    }
    // bite E — a shell dock passing `overflow="scroll"` flags (the retired value).
    {
        const { violations } = detectScrollPortCrossAxis(
            GOOD_W2_CSS,
            '<GlassDock overflow="scroll" />',
            "",
        );
        record(
            "shell-overflow-scroll-flags",
            violations.some((v) => /overflow="scroll"/.test(v)),
            violations.join(" | "),
        );
    }

    console.log("proof:dock-plate-clearance — SELF-TEST (BG.W-DOCK-CAP-SCROLL-FADE W2 bites)");
    let allOk = true;
    for (const b of bites) {
        console.log(`  ${b.ok ? "OK " : "RED"} ${b.name}${b.ok ? "" : ` :: ${b.detail}`}`);
        if (!b.ok) allOk = false;
    }
    console.log(`\n  self-test: ${allOk ? "PASS" : "FAIL"}`);
    process.exit(allOk ? 0 : 1);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
    if (process.argv.includes("--self-test")) runSelfTest();
    else run();
}

// proof:no-layout-animation — BB.W-CARD-COMPOSITE: the compositor-safe-keyframes
// architectural lock (the A'-3 layout-animation CLS class made structurally
// impossible to re-ship).
//
// THE RULE: a CSS @keyframes step may animate ONLY compositor-safe channels —
// `transform`/`translate`/`scale`/`rotate`/`perspective`, `opacity`,
// `filter`/`backdrop-filter`, `clip-path`, paint props (`color`/`background*`/
// `box-shadow`/`border-color`/`fill`/`stroke`/`outline-color`), and `--*` custom
// properties (which resolve onto the above; the W-FADING-SCROLL `--fade-start`
// length-custom-drives-a-mask precedent). It may NEVER animate a layout-TRIGGERING
// property — `padding*`, `margin*`, `font-size`, `width`/`height`/`inline-size`/
// `block-size` (+ `min-`/`max-` axes), `top`/`left`/`right`/`bottom`/`inset*`,
// `grid-template-*`/`grid-auto-*`, `flex-basis`, `line-height`, `border-*-width`,
// `gap`/`row-gap`/`column-gap` — because the browser must re-layout on EVERY
// timeline frame (the per-frame reflow storm → CLS).
//
// THE DEFECT IT LOCKS: `CardHeader.vue` (the A'-3 worst-cluster, CLS 1.03 at
// 4.0.0) migrated value.js's `PaneHeader.vue` choreography VERBATIM, animating
// `padding`/`font-size`/`grid-template-rows`/`margin` on the `--card-scroll`
// scroll-timeline — a per-frame relayout storm. The donor pattern carried the
// architectural error forward; this gate makes the lineage error impossible to
// re-ship. Born-RED on the unrewritten CardHeader (four reflow-set hits); GREEN
// after the compositor-safe rewrite (transform/scale + opacity lanes).
//
// THE NARROW ALLOWLIST (a register-design reveal, not a license to keep a reflow
// storm): a GENUINE layout RECLAIM — a discrete open/close toggle where the body
// content below MUST reflow up into freed space (the reka-ui collapsible/accordion
// content-height reveal) — cannot be faked by a transform without leaving a visual
// gap. Such a keyframe is a DIFFERENT primitive than a compositor-safe shrink: a
// one-shot discrete transition (not a continuous scroll-timeline) whose CLS is
// bounded + intentional. Each allowlisted keyframe is NAMED here with its
// reflow property + the load-bearing rationale; a NEW layout-animation off the
// list reds (the anti-gameability floor — the allowlist is an explicit, audited,
// CLS-bounded exception, never a silent escape).
//
// Device-free SOURCE arm (tagged `["ci"]`) — the architectural lock runs on every
// headless runner. The binding CLS measure (1.03 → ≤ 0.1 on the live scroll-shrink
// demo) is the π/DELTA arm (W-CARD-COMPOSITE-DELTA + tests-visual/card-composite),
// never this gate alone.

import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative, resolve } from "node:path";
import { ROOT } from "./constellation.mjs";
import { gateArtifactPath, snapshotStamp, writeGateArtifact } from "./gate-output.mjs";

const COMMAND = "npm run proof:no-layout-animation";

// ── The reflow set (layout-triggering — FORBIDDEN in a keyframe step). The
//    matcher is exact-or-prefix on the property NAME (longhand + shorthand). ──
const REFLOW_PROPS = [
    "padding",
    "margin",
    "font-size",
    "width",
    "min-width",
    "max-width",
    "inline-size",
    "min-inline-size",
    "max-inline-size",
    "height",
    "min-height",
    "max-height",
    "block-size",
    "min-block-size",
    "max-block-size",
    "top",
    "left",
    "right",
    "bottom",
    "inset",
    "grid-template",
    "grid-auto",
    "flex-basis",
    "line-height",
    "border-width",
    "border-top-width",
    "border-right-width",
    "border-bottom-width",
    "border-left-width",
    "border-block-width",
    "border-inline-width",
    "gap",
    "row-gap",
    "column-gap",
];

// A property name is a reflow trigger when it equals a reflow prop OR is a
// longhand under one (`padding-top` under `padding`, `margin-block-start` under
// `margin`, `grid-template-rows` under `grid-template`, `inset-block` under
// `inset`). The compositor-safe + paint props are NOT in this set (so a `color`/
// `background`/`box-shadow`/`transform`/`opacity`/`filter`/`clip-path`/`--*` step
// passes by construction — the partition is reflow-vs-everything-else).
const isReflowProp = (prop) => {
    const p = prop.toLowerCase();
    // `border-color` / `border-top-color` etc. are PAINT, never width — guard so
    // the `border-` prefix does not over-match the color/style longhands.
    if (/^border(-(top|right|bottom|left|block|inline))?-color$/.test(p)) return false;
    if (/^border(-(top|right|bottom|left|block|inline))?-style$/.test(p)) return false;
    return REFLOW_PROPS.some((r) => p === r || p.startsWith(`${r}-`));
};

// ── The narrow, named, CLS-bounded allowlist (the register-design reveal). A
//    genuine layout RECLAIM (a discrete toggle whose body MUST reflow) is a
//    different primitive than a compositor-safe shrink. Each entry is the exact
//    `@keyframes` name + the reflow property it animates + the rationale. ──
const ALLOWLIST = [
    {
        keyframe: "collapsible-open",
        props: ["height"],
        reason:
            "reka-ui Collapsible/Accordion content-height reveal — a DISCRETE one-shot open toggle (not a continuous scroll-timeline) whose body content below genuinely reflows up into the freed space; the height:0 → var(--reka-collapsible-content-height) reveal cannot be a transform without leaving a visual gap. CLS is bounded + intentional (a user-initiated open, not a per-scroll-frame storm).",
    },
    {
        keyframe: "collapsible-close",
        props: ["height"],
        reason:
            "the close twin of collapsible-open — content-height collapse on a discrete user-initiated close. Same layout-reclaim register; same bounded/intentional CLS.",
    },
];
const allowed = (keyframe, prop) =>
    ALLOWLIST.some(
        (a) =>
            a.keyframe === keyframe &&
            a.props.some((ap) => prop.toLowerCase() === ap || prop.toLowerCase().startsWith(`${ap}-`)),
    );

// ── Strip CSS / JS-line / HTML-Vue comments (preserve newlines for line nums)
//    so a prose mention of a retired property is never a false hit. ──
const strip = (s) =>
    s
        .replace(/<!--[\s\S]*?-->/g, (m) => m.replace(/[^\n]/g, " "))
        .replace(/\/\*[\s\S]*?\*\//g, (m) => m.replace(/[^\n]/g, " "))
        .replace(/\/\/[^\n]*/g, "");

// ── The keyframe corpus: every src/styles/*.css sheet + every SFC <style> block
//    under src/components/. Inventory-complete (W3) — a SECOND layout-animation
//    anywhere reds, not only CardHeader. ──
const walk = (dir, exts) => {
    const out = [];
    if (!existsSync(dir)) return out;
    for (const entry of readdirSync(dir)) {
        const full = join(dir, entry);
        const st = statSync(full);
        if (st.isDirectory()) out.push(...walk(full, exts));
        else if (exts.some((e) => entry.endsWith(e))) out.push(full);
    }
    return out;
};

const corpusFiles = [
    ...walk(resolve(ROOT, "src/styles"), [".css"]),
    ...walk(resolve(ROOT, "src/components"), [".vue", ".css"]),
];

// Mask everything OUTSIDE the <style> region(s) of a .vue (preserving newlines so
// the line numbers stay ABSOLUTE to the SFC) so a template/script string carrying
// the literal `@keyframes` (none today, but a future component might) cannot trip
// the scan. A .css file is its own body, untouched.
const styleBodyOf = (file, raw) => {
    if (!file.endsWith(".vue")) return raw;
    const styleRanges = [];
    const re = /<style\b[^>]*>([\s\S]*?)<\/style>/gi;
    let m;
    while ((m = re.exec(raw)) !== null) {
        // the inner-body range (between the > and the </style>)
        const innerStart = m.index + m[0].indexOf(">") + 1;
        styleRanges.push([innerStart, innerStart + m[1].length]);
    }
    let out = "";
    for (let i = 0; i < raw.length; i++) {
        const inStyle = styleRanges.some(([a, b]) => i >= a && i < b);
        const ch = raw[i];
        out += inStyle || ch === "\n" ? ch : " ";
    }
    return out;
};

// Parse every @keyframes block, returning { keyframe, props:[{prop,line}] }.
// We track the absolute line within the (stripped) source for the file:line cite.
const parseKeyframes = (file, source) => {
    const found = [];
    const re = /@keyframes\s+([\w-]+)\s*\{/g;
    let m;
    while ((m = re.exec(source)) !== null) {
        const name = m[1];
        let i = re.lastIndex;
        let depth = 1;
        const start = i;
        while (depth > 0 && i < source.length) {
            const ch = source[i];
            if (ch === "{") depth++;
            else if (ch === "}") depth--;
            i++;
        }
        const body = source.slice(start, i - 1);
        const bodyStartLine = source.slice(0, start).split("\n").length;
        const propRe = /(^|[;{])\s*([a-zA-Z-]+)\s*:/g;
        let pm;
        const props = [];
        while ((pm = propRe.exec(body)) !== null) {
            const prop = pm[2];
            const lineInBody = body.slice(0, pm.index).split("\n").length - 1;
            props.push({ prop, line: bodyStartLine + lineInBody });
        }
        found.push({ keyframe: name, props });
        re.lastIndex = i;
    }
    return found;
};

const violations = [];
const allowedHits = [];
let keyframesScanned = 0;

for (const file of corpusFiles) {
    const raw = readFileSync(file, "utf8");
    const source = strip(styleBodyOf(file, raw));
    if (!source.includes("@keyframes")) continue;
    const rel = relative(ROOT, file);
    for (const kf of parseKeyframes(file, source)) {
        keyframesScanned++;
        for (const { prop, line } of kf.props) {
            if (!isReflowProp(prop)) continue;
            if (allowed(kf.keyframe, prop)) {
                allowedHits.push({ keyframe: kf.keyframe, property: prop, file: `${rel}:${line}` });
                continue;
            }
            violations.push({ keyframe: kf.keyframe, property: prop, file: `${rel}:${line}` });
        }
    }
}

// ── Self-proving synthetic bite (W2 anti-evasion): a fabricated @keyframes
//    animating `padding` MUST be flagged by the very same detector — proving the
//    reflow-set partition bites every run, independent of the live corpus. ──
const SELF_TEST_SOURCE = `
@keyframes __self_test_padding_anim__ {
  from { padding-top: 1rem; transform: scale(1); }
  to   { padding-top: 0;    transform: scale(0.9); }
}
@keyframes __self_test_safe_anim__ {
  from { transform: scale(1); opacity: 1; background: red; box-shadow: 0 0 0 red; }
  to   { transform: scale(0.5); opacity: 0; background: blue; box-shadow: 0 1px 2px blue; }
}`;
const selfHits = new Set();
for (const kf of parseKeyframes("self-test", SELF_TEST_SOURCE)) {
    for (const { prop } of kf.props) {
        if (isReflowProp(prop) && !allowed(kf.keyframe, prop))
            selfHits.add(`${kf.keyframe}/${prop.toLowerCase()}`);
    }
}
// The bite: the synthetic padding keyframe IS flagged (regardless of how many
// steps repeat the property) AND the paint/transform/opacity keyframe is NOT —
// the reflow-vs-compositor partition is exact (no transform/opacity/background/
// box-shadow false hit, no padding miss).
const selfTestBites =
    selfHits.size === 1 && selfHits.has("__self_test_padding_anim__/padding-top");

const checks = [];
const add = (id, pass, detail) => checks.push({ id, pass: Boolean(pass), detail });

add(
    "W1-no-layout-animation",
    violations.length === 0,
    violations.length === 0
        ? `no keyframe animates a reflow property (${keyframesScanned} keyframes scanned across ${corpusFiles.length} files)`
        : `${violations.length} reflow-set violation(s): ${violations
              .map((v) => `${v.keyframe} animates ${v.property} (${v.file})`)
              .join("; ")}`,
);
add(
    "W2-self-test-bite",
    selfTestBites,
    selfTestBites
        ? "the synthetic padding-animating keyframe is flagged AND the paint/transform/opacity keyframe is NOT — the reflow-vs-compositor partition bites"
        : `self-test partition broke: ${JSON.stringify([...selfHits])}`,
);
add(
    "W3-inventory-complete",
    keyframesScanned > 0 && corpusFiles.length > 0,
    `inventory-complete: ${keyframesScanned} keyframes across the full corpus (src/styles/*.css + every SFC <style>); allowlisted reclaims: ${allowedHits
        .map((a) => `${a.keyframe}/${a.property}`)
        .join(", ") || "none"}`,
);

const failed = checks.filter((c) => !c.pass);
const pass = failed.length === 0;

const ARTIFACT = gateArtifactPath("GATE_NO_LAYOUT_ANIMATION_OUT", "BB-no-layout-animation");
writeGateArtifact(ARTIFACT, {
    generatedAt: snapshotStamp(),
    status: pass ? "pass" : "fail",
    gate: "proof:no-layout-animation",
    command: COMMAND,
    note: "Device-free SOURCE arm — the compositor-safe-keyframes architectural lock (BB.W-CARD-COMPOSITE). The binding CLS measure (1.03 → ≤ 0.1 on the live scroll-shrink demo) is the π/DELTA arm, never this gate alone.",
    keyframesScanned,
    filesScanned: corpusFiles.length,
    violations,
    allowlisted: allowedHits,
    checks: checks.map((c) => ({ id: c.id, pass: c.pass, detail: c.detail })),
});

if (!pass) {
    console.error(`\n[proof:no-layout-animation] ${failed.length} check(s) FAILED:`);
    for (const c of failed) console.error(`  ✗ ${c.id} — ${c.detail}`);
    process.exit(1);
}
console.log(
    `\n[proof:no-layout-animation] LOCKED — ${keyframesScanned} keyframes scanned, 0 layout-property animations (the reflow set is forbidden; ${allowedHits.length} named CLS-bounded reclaim(s) allowlisted). The compositor-safe-keyframes architecture cannot regress.`,
);

#!/usr/bin/env node
// BI.W-SCROLL-PROGRESS-RIM — the dock-rim scroll progress: rainbow, thinner, rounded
// (proof:dock-progress-rim, UF-D1).
//
// The born-RED→GREEN device-free SOURCE arm for the dock's scroll-progress RIM. UF-D1
// (verbatim): "The scrolling progressbar needs a great deal of refinement, should be
// rainbow, thinner, and rounded." ss-02: the current read is a chunky flat GRAY band on
// the vertical dock rim (the warm-ink two-stop ramp at 11px). This wave re-expresses it
// on the BorderProgress masked-band mechanism — the ONE radius-following band register
// (never border-image, per geometry Law 3) — bound to the greenfield dock PLATE:
//
//   R1 — THE BAND IS THE MASKED-BAND MECHANISM (no border-image, no floating bar). The
//        rim rides the `.border-progress__ring` mask-composite cut-out (padding-box
//        EXCLUDED from border-box → the radius-following band), and SidebarDock mounts
//        the <BorderProgress> masked band — NOT a standalone floating `.demo-scroll-
//        progress` bar. A `border-image` (the corner-squaring path) reds.
//   R2 — THE WIDTH IS THE THIN RUNG (~3-4px, ≤ the 10-14px card envelope's FLOOR — a RIM
//        indicator, not card chrome). `.demo-dock-scroll-ring`'s `--border-progress-
//        width` sits in the thin rung AND strictly below the card-envelope floor
//        (`BORDER_PROGRESS_WIDTH_MIN`, 10). The chunky 11px read reds.
//   R3 — THE FILL RESOLVES ≥4 DISTINCT RAMP HUES ACROSS 0→100% (the RAINBOW walk). The
//        SidebarDock rim stops walk the brand `--section-color-*` ramp with ≥4 distinct
//        hues — "rainbow" = the section-color ramp, staying in the warm identity. The
//        warm-ink two-stop GRAY ramp (2 hues) reds.
//   R4 — RADIUS-FOLLOWING AT THE DOCK CORNERS (the Law-3 corner probe). The band inherits
//        the dock PLATE's radius by construction on the masked band — `.demo-dock-scroll-
//        ring` rides `--border-progress-radius: var(--radius-pill)` (the plate is
//        `border-radius: inherit` from the pill `.glass-dock`, so the sibling-overlay ring
//        hugs the SAME stadium) AND the mask cut-out follows `border-radius`.
//   R5 — THE PER-ITEM [0,1] STEPPER SEAM (atlas C1/#185 — the successor-contract half of
//        ask #23). <BorderProgress> exposes a `segments` per-item [0,1] scalar contract
//        (N items → N band segments), each item's scalar clamped [0,1], so the atlas
//        dock-progress consume binds per-item, not only the aggregate.
//   R6 — THE /color PROMOTION (R5-C-03 + §Inbound U-F30). The value.js-bearing OKLCH/
//        shorter walk is PROMOTED from border-progress to the shared `/color` leaf (its
//        natural home beside `cssToOklch`), preserving the dynamic-import boundary;
//        border-progress re-points its internal import to /color (BOTH stay green until
//        the retire wave). The promoted home KEEPS the raw value.js `mixColors`/
//        `sampleColorRamp` channel read SINGULAR (the old border-progress-local walk is
//        DEFINITION-ABSENT) + carries the U-F30 coupling marker comment (the hue-in-turns
//        convention attestation moves WITH the code so the U-F77 co-land re-enumeration
//        finds it).
//
// The BINDING painted truth is the π readback (the scrolled-route capture pair 0%/50%/
// 100% on the vertical dock, both modes, both engines — the thin rounded rainbow rim
// reads against ss-02's gray band as the ground) + the proof:ba-gestalt dock verdict.
// This gate is the no-device CI half.
//
// House style mirrors proof-border-progress.mjs: ESM .mjs, comment-strip first (the
// false-witness discipline), a pure exported detector, a byte-stable JSON artefact via
// gate-output, a human summary, process.exit(1) on any violation. The self-test bites
// prove the PURE detector flags a synthetic border-image / chunky width / gray-2-stop /
// squared corner / missing per-item seam / un-promoted walk.

import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import {
    gateArtifactPath,
    snapshotStamp,
    writeGateArtifact,
} from "./gate-output.mjs";

const ROOT = resolve(fileURLToPath(new URL("../", import.meta.url)));

let _cliPaths = null;
function cliPaths() {
    if (_cliPaths) return _cliPaths;
    _cliPaths = {
        ROOT,
        BP_CSS: resolve(ROOT, "src/styles/border-progress.css"),
        BP_VUE: resolve(
            ROOT,
            "src/components/custom/border-progress/BorderProgress.vue",
        ),
        BP_CONSTANTS: resolve(
            ROOT,
            "src/components/custom/border-progress/constants.ts",
        ),
        BP_HELPER: resolve(
            ROOT,
            "src/components/custom/border-progress/composables/useBorderSpectrum.ts",
        ),
        // R6 — the value.js-bearing walk PROMOTED to the /color leaf (its natural home
        // beside cssToOklch); the old border-progress-local copy must be DEFINITION-ABSENT.
        COLOR_WALK: resolve(ROOT, "src/composables/color/spectrum-walk.ts"),
        OLD_WALK: resolve(
            ROOT,
            "src/components/custom/border-progress/composables/spectrum-walk.ts",
        ),
        SIDEBAR_DOCK: resolve(ROOT, "demo/shell/SidebarDock.vue"),
        DOCK_NAV: resolve(ROOT, "demo/shell/dock-nav.css"),
        ARTIFACT: gateArtifactPath(
            "GLASS_UI_DOCK_PROGRESS_RIM_ARTIFACT",
            "BI-dock-progress-rim",
        ),
    };
    return _cliPaths;
}

// ── comment-strip (the false-witness discipline) ────────────────────────────
function stripBlockComments(t) {
    return t.replace(/\/\*[\s\S]*?\*\//g, " ");
}
function stripLineComments(t) {
    return t
        .split("\n")
        .map((l) => {
            const m = l.match(/(^|[^:])\/\//); // keep `://` URLs (the house idiom)
            if (!m) return l;
            return l.slice(0, l.indexOf("//", m.index));
        })
        .join("\n");
}
function stripTs(t) {
    return stripLineComments(stripBlockComments(t));
}
function stripCss(t) {
    return stripBlockComments(t);
}
function stripHtml(t) {
    return t.replace(/<!--[\s\S]*?-->/g, " ");
}

const read = (p) => (existsSync(p) ? readFileSync(p, "utf8") : "");

// The thin-rim rung (px) — "~3-4px, ≤ the card-envelope floor". A RIM indicator, not
// card chrome; strictly below `BORDER_PROGRESS_WIDTH_MIN` (the 10-14px card envelope).
const THIN_RUNG_MIN = 2;
const THIN_RUNG_MAX = 6;

/**
 * THE PURE DETECTOR — takes file CONTENTS (so the self-test can plant synthetic inputs)
 * and returns { facts, violations }. No disk read inside (the caller reads).
 */
export function detectDockProgressRim(inputs) {
    const {
        bpCss = "",
        bpVue = "",
        bpConstants = "",
        bpHelper = "",
        colorWalk = "",
        colorWalkRaw = "",
        colorWalkExists = false,
        oldWalkExists = false,
        sidebar = "",
        dockNav = "",
    } = inputs;

    const violations = [];
    const facts = { r1: {}, r2: {}, r3: {}, r4: {}, r5: {}, r6: {} };

    // ── R1 — the band is the masked-band mechanism (no border-image, no floating bar) ─
    const hasMaskComposite =
        /mask-composite\s*:\s*(exclude|intersect)/.test(bpCss) &&
        /-webkit-mask-composite\s*:\s*(xor|source-in)/.test(bpCss);
    const hasPaddingBorderBoxPair =
        /padding-box/.test(bpCss) && /border-box/.test(bpCss);
    const hasBorderImage =
        /\bborder-image\b/.test(bpCss) || /\bborder-image\b/.test(sidebar);
    // SidebarDock wears the masked band, NOT a standalone floating bar.
    const dockMountsBand = /<BorderProgress\b/.test(sidebar);
    const floatingBarSurvives =
        /\.demo-scroll-progress[^{}]*\{/.test(dockNav) ||
        /class="[^"]*demo-scroll-progress/.test(sidebar);
    facts.r1 = {
        hasMaskComposite,
        hasPaddingBorderBoxPair,
        hasBorderImage,
        dockMountsBand,
        floatingBarSurvives,
    };
    if (!(hasMaskComposite && hasPaddingBorderBoxPair))
        violations.push(
            "R1: the rim is not the masked-band mechanism — border-progress.css must carry the padding-box/border-box mask-composite cut-out (the radius-following band, never a floating bar)",
        );
    if (hasBorderImage)
        violations.push(
            "R1: `border-image` present — the corner-squaring path is MEASURED INFERIOR and forbidden (geometry Law 3: the band follows border-radius via mask-composite)",
        );
    if (!dockMountsBand)
        violations.push(
            "R1: SidebarDock does not mount the <BorderProgress> masked band (the rim IS the dock's border, not a floating bar)",
        );
    if (floatingBarSurvives)
        violations.push(
            "R1: a standalone floating `.demo-scroll-progress` bar SURVIVES — the rim is the dock's masked border (clean break, no alias)",
        );

    // ── R2 — the width is the THIN rung (≤ the card-envelope floor) ───────────
    const cardFloor = Number(
        bpConstants.match(/BORDER_PROGRESS_WIDTH_MIN\s*=\s*(\d+(?:\.\d+)?)/)?.[1],
    );
    const ringBlock =
        /\.demo-dock-scroll-ring[^{]*\{([\s\S]*?)\}/.exec(dockNav)?.[1] ?? "";
    const ringWidth = Number(
        ringBlock.match(/--border-progress-width\s*:\s*(\d+(?:\.\d+)?)px/)?.[1],
    );
    const widthIsThin =
        Number.isFinite(ringWidth) &&
        ringWidth >= THIN_RUNG_MIN &&
        ringWidth <= THIN_RUNG_MAX &&
        Number.isFinite(cardFloor) &&
        ringWidth < cardFloor;
    facts.r2 = { cardFloor, ringWidth, widthIsThin, THIN_RUNG_MIN, THIN_RUNG_MAX };
    if (!widthIsThin)
        violations.push(
            `R2: the rim width is not the thin rung (${ringWidth}px) — it must sit in [${THIN_RUNG_MIN},${THIN_RUNG_MAX}]px AND strictly below the card-envelope floor (BORDER_PROGRESS_WIDTH_MIN=${cardFloor}); a RIM indicator, not card chrome (the chunky 11px read reds)`,
        );

    // ── R3 — the fill resolves ≥4 distinct ramp hues (the RAINBOW walk) ───────
    // The SidebarDock rim stops walk the brand section-color ramp. "rainbow" = the
    // section-color ramp, ≥4 distinct hues, staying in the warm identity.
    const stopsBlock =
        /SCROLL_RING_STOPS[^=]*=\s*\[([\s\S]*?)\]/.exec(sidebar)?.[1] ?? "";
    const rampHues = new Set(
        [...stopsBlock.matchAll(/--section-color-(\d+)/g)].map((m) => m[1]),
    );
    // Concrete anchors (a consumer passing #hex / oklch()) count as distinct hues too.
    const concreteAnchors = [
        ...stopsBlock.matchAll(/["'](#[0-9a-fA-F]{3,8}|oklch\([^"']*)["']/g),
    ].length;
    const distinctHues = rampHues.size + concreteAnchors;
    const isRainbow = distinctHues >= 4 && rampHues.size >= 4;
    facts.r3 = { distinctHues, sectionHues: rampHues.size, isRainbow };
    if (!isRainbow)
        violations.push(
            `R3: the rim fill does not walk ≥4 distinct brand-ramp hues (${rampHues.size} section-color hues) — the RAINBOW walk is the section-color ramp (the warm-ink two-stop GRAY ramp reds)`,
        );

    // ── R4 — radius-following at the dock corners (the Law-3 corner probe) ────
    // The band inherits the dock PLATE's radius: the sibling-overlay ring rides
    // `--border-progress-radius: var(--radius-pill)` (the plate is border-radius:inherit
    // from the pill .glass-dock — same stadium) AND the mask cut-out follows border-radius.
    const ringRadiusToken = /--border-progress-radius\s*:\s*var\(--radius-pill/.test(
        ringBlock,
    );
    const radiusFollowingMask =
        /linear-gradient\(#fff 0 0\)\s*padding-box/.test(bpCss) &&
        /linear-gradient\(#fff 0 0\)\s*border-box/.test(bpCss);
    const rootReadsRadius = /border-radius\s*:\s*var\(--border-progress-radius/.test(
        bpCss,
    );
    facts.r4 = { ringRadiusToken, radiusFollowingMask, rootReadsRadius };
    if (!ringRadiusToken)
        violations.push(
            "R4: the rim does not ride `--border-progress-radius: var(--radius-pill)` on `.demo-dock-scroll-ring` — the band must inherit the dock plate's pill radius by construction",
        );
    if (!(radiusFollowingMask && rootReadsRadius))
        violations.push(
            "R4: the masked band does not follow border-radius (the padding-box/border-box cut-out over the `--border-progress-radius` root) — the Law-3 corner probe",
        );

    // ── R5 — the per-item [0,1] stepper seam (atlas C1/#185) ──────────────────
    const segmentsProp = /segments\??\s*:\s*readonly\s+number\[\]/.test(bpVue);
    const readsSegments = /props\.segments/.test(bpVue);
    const clampsSegments =
        /clamp01\s*\(\s*(seg|item|v\b|s\b)/.test(bpVue) ||
        /Math\.(min|max)\([^)]*\bseg/.test(bpVue) ||
        /segments[\s\S]{0,200}clamp01/.test(bpVue);
    facts.r5 = { segmentsProp, readsSegments, clampsSegments };
    if (!(segmentsProp && readsSegments))
        violations.push(
            "R5: the per-item [0,1] stepper seam is not exposed — <BorderProgress> must declare a `segments?: readonly number[]` prop AND read it (N items → N band segments; the atlas C1/#185 successor-contract)",
        );
    if (!clampsSegments)
        violations.push(
            "R5: the per-item segment scalars are not clamped to [0,1] — each item's contract is a [0,1] scalar (a stepper, not an unbounded fill)",
        );

    // ── R6 — the /color promotion (R5-C-03) + the §Inbound U-F30 coupling ─────
    const colorWalkPromoted = colorWalkExists;
    const oldWalkAbsent = !oldWalkExists;
    // The raw value.js channel read is SINGULAR — it lives in the promoted /color walk.
    const rawReadInColor =
        /\bmixColors\b/.test(colorWalk) && /\bsampleColorRamp\b/.test(colorWalk);
    // The U-F30 coupling marker moves WITH the code (the hue-in-turns convention
    // attestation, so the U-F77 co-land re-enumeration finds it).
    const ufMarker =
        /U-F30/.test(colorWalkRaw) &&
        /\bturns?\b/i.test(colorWalkRaw);
    // border-progress re-points its internal dynamic import to the /color leaf (it stays
    // a consumer of the moved leaf — BOTH green until the retire wave).
    const bpRepointsColor =
        /import\(\s*["'][^"']*composables\/color\/spectrum-walk["']\s*\)/.test(
            bpHelper,
        );
    facts.r6 = {
        colorWalkPromoted,
        oldWalkAbsent,
        rawReadInColor,
        ufMarker,
        bpRepointsColor,
    };
    if (!colorWalkPromoted)
        violations.push(
            "R6: the spectrum walk is not promoted to `/color` — src/composables/color/spectrum-walk.ts (the value.js-bearing OKLCH/shorter walk's natural home beside cssToOklch) is absent",
        );
    if (!oldWalkAbsent)
        violations.push(
            "R6: the border-progress-local spectrum-walk.ts SURVIVES — the raw value.js channel read must be SINGULAR (the walk MOVED to /color, not duplicated)",
        );
    if (!rawReadInColor)
        violations.push(
            "R6: the promoted /color walk does not carry the raw value.js `mixColors`/`sampleColorRamp` channel read (the singular raw-read site must move WITH the code)",
        );
    if (!ufMarker)
        violations.push(
            "R6: the U-F30 coupling marker comment is absent from the promoted /color walk — the hue-in-turns convention attestation must move WITH the code so the U-F77 co-land re-enumeration finds it",
        );
    if (!bpRepointsColor)
        violations.push(
            "R6: border-progress does not re-point its dynamic import to `composables/color/spectrum-walk` — it must stay a consumer of the moved /color leaf (BOTH green until the retire wave)",
        );

    return { facts, violations };
}

// ── the live-disk read ───────────────────────────────────────────────────────
function readInputs(P) {
    const colorWalkRaw = read(P.COLOR_WALK);
    return {
        bpCss: stripCss(read(P.BP_CSS)),
        bpVue: stripTs(read(P.BP_VUE)),
        bpConstants: stripTs(read(P.BP_CONSTANTS)),
        bpHelper: stripTs(read(P.BP_HELPER)),
        colorWalk: stripTs(colorWalkRaw),
        colorWalkRaw,
        colorWalkExists: existsSync(P.COLOR_WALK),
        oldWalkExists: existsSync(P.OLD_WALK),
        sidebar: stripHtml(stripTs(read(P.SIDEBAR_DOCK))),
        dockNav: stripCss(read(P.DOCK_NAV)),
    };
}

// ── the self-test bites (each planted defect must RED) ────────────────────────
function selfTest() {
    const good = {
        bpCss: `.border-progress { border-radius: var(--border-progress-radius, 16px); }
            .border-progress__ring {
                -webkit-mask: linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0) border-box;
                -webkit-mask-composite: xor;
                mask: linear-gradient(#fff 0 0) padding-box, linear-gradient(#fff 0 0) border-box;
                mask-composite: exclude;
            }`,
        bpVue: `segments?: readonly number[]
            const list = props.segments;
            const seg = clamp01(item);`,
        bpConstants: `export const BORDER_PROGRESS_WIDTH_MIN = 10;`,
        bpHelper: `void import("../../../../composables/color/spectrum-walk").then(m => m.walkConcreteSpectrum());`,
        colorWalk: `import { mixColors, sampleColorRamp } from "@mkbabb/value.js";
            import { cssToOklch } from "./index";
            mixColors(a, b); sampleColorRamp(a, b, n, { hueMethod: "shorter" });`,
        colorWalkRaw: `// U-F30 COUPLING: raw OKLCHColor channel read, hue in turns`,
        colorWalkExists: true,
        oldWalkExists: false,
        sidebar: `<BorderProgress class="demo-dock-scroll-ring" :segments="steps" />
            const SCROLL_RING_STOPS = [
                "var(--section-color-0)", "var(--section-color-5)",
                "var(--section-color-4)", "var(--section-color-3)",
                "var(--section-color-2)", "var(--section-color-7)",
            ];`,
        dockNav: `.demo-dock-progress-host > .demo-dock-scroll-ring {
                --border-progress-radius: var(--radius-pill, 9999px);
                --border-progress-width: 4px;
            }`,
    };
    const baseGreen = detectDockProgressRim(good).violations.length === 0;

    const bites = [];
    const red = (patch, tag) =>
        detectDockProgressRim({ ...good, ...patch }).violations.some((v) =>
            tag ? v.startsWith(tag) : true,
        );
    // A — a border-image (corner-squaring) reds R1.
    bites.push({
        name: "border-image",
        red: red({ bpCss: good.bpCss + "\n.x { border-image: linear-gradient(red,blue) 1; }" }, "R1"),
    });
    // B — a chunky 11px width reds R2.
    bites.push({
        name: "chunky-width",
        red: red({ dockNav: good.dockNav.replace("4px", "11px") }, "R2"),
    });
    // C — the warm-ink two-stop GRAY ramp (< 4 hues) reds R3.
    bites.push({
        name: "gray-two-stop",
        red: red(
            {
                sidebar: `<BorderProgress class="demo-dock-scroll-ring" :segments="s" />
                    const SCROLL_RING_STOPS = ["color-mix(in srgb, var(--foreground) 45%, transparent)", "var(--foreground)"];`,
            },
            "R3",
        ),
    });
    // D — dropping the pill radius token (squared corners) reds R4.
    bites.push({
        name: "no-radius-token",
        red: red({ dockNav: good.dockNav.replace(/--border-progress-radius[^;]*;/, "") }, "R4"),
    });
    // E — dropping the per-item stepper seam reds R5.
    bites.push({
        name: "no-per-item-seam",
        red: red({ bpVue: `const x = 1;` }, "R5"),
    });
    // F — the un-promoted walk (the /color file absent) reds R6.
    bites.push({
        name: "walk-not-promoted",
        red: red({ colorWalkExists: false }, "R6"),
    });
    // G — a surviving border-progress-local walk (raw read DUPLICATED) reds R6.
    bites.push({
        name: "old-walk-survives",
        red: red({ oldWalkExists: true }, "R6"),
    });
    // H — the U-F30 marker dropped from the promoted walk reds R6.
    bites.push({
        name: "no-uf30-marker",
        red: red({ colorWalkRaw: `// just a walk, no coupling note` }, "R6"),
    });
    // I — a standalone floating bar re-appearing reds R1.
    bites.push({
        name: "floating-bar-revives",
        red: red({ dockNav: good.dockNav + "\n.demo-scroll-progress { position: sticky; }" }, "R1"),
    });

    return { baseGreen, bites };
}

function run() {
    const P = cliPaths();
    const inputs = readInputs(P);
    const { facts, violations } = detectDockProgressRim(inputs);

    const st = selfTest();
    const biteFailures = st.bites.filter((b) => !b.red).map((b) => b.name);
    if (!st.baseGreen)
        violations.push(
            "self-test: the GOOD corpus did not green (detector over-strict)",
        );
    if (biteFailures.length > 0)
        violations.push(`self-test bite(s) did not RED: ${biteFailures.join(", ")}`);
    facts.selfTest = { baseGreen: st.baseGreen, allBite: biteFailures.length === 0, bites: st.bites };

    const status = violations.length === 0 ? "pass" : "fail";
    writeGateArtifact(P.ARTIFACT, {
        gate: "proof:dock-progress-rim",
        stamp: snapshotStamp(),
        status,
        facts,
        violations,
    });

    const yn = (b) => (b ? "✓" : "✗");
    console.log(
        "proof:dock-progress-rim — the dock-rim scroll progress: rainbow, thinner, rounded (BI.W-SCROLL-PROGRESS-RIM)",
    );
    console.log(
        `  R1 masked-band (no border-image/floating bar): ${yn(
            facts.r1.hasMaskComposite &&
                facts.r1.hasPaddingBorderBoxPair &&
                !facts.r1.hasBorderImage &&
                facts.r1.dockMountsBand &&
                !facts.r1.floatingBarSurvives,
        )}`,
    );
    console.log(
        `  R2 thin rung width (≤ card floor)   : ${yn(facts.r2.widthIsThin)}  (${facts.r2.ringWidth}px < ${facts.r2.cardFloor})`,
    );
    console.log(
        `  R3 rainbow ≥4 distinct ramp hues    : ${yn(facts.r3.isRainbow)}  (${facts.r3.sectionHues} section hues)`,
    );
    console.log(
        `  R4 radius-following (plate pill)    : ${yn(
            facts.r4.ringRadiusToken && facts.r4.radiusFollowingMask && facts.r4.rootReadsRadius,
        )}`,
    );
    console.log(
        `  R5 per-item [0,1] stepper seam      : ${yn(
            facts.r5.segmentsProp && facts.r5.readsSegments && facts.r5.clampsSegments,
        )}`,
    );
    console.log(
        `  R6 /color promotion + U-F30 marker  : ${yn(
            facts.r6.colorWalkPromoted &&
                facts.r6.oldWalkAbsent &&
                facts.r6.rawReadInColor &&
                facts.r6.ufMarker &&
                facts.r6.bpRepointsColor,
        )}`,
    );
    console.log(
        `  self-test bites RED                 : ${yn(facts.selfTest.allBite && facts.selfTest.baseGreen)}`,
    );

    if (violations.length > 0) {
        console.log("\nVIOLATIONS:");
        for (const v of violations) console.log(`  x ${v}`);
    }
    console.log(
        `\n  status: ${status.toUpperCase()}   artefact: ${P.ARTIFACT.slice(
            P.ROOT.length + 1,
        )}`,
    );
    process.exit(status === "pass" ? 0 : 1);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
    run();
}

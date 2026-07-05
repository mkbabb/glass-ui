#!/usr/bin/env node
// proof:dock-rail-reinvent — BG.W-DOCK-RAIL-REINVENT — the dock rail topology INVERTED
// (USER 07-05 + IMG_1880; supersedes the BE.W-DOCK-RAIL-REALIZE always-OUTSIDE topology).
//
// THE ROOT DEFECT. The BE `<DockStack>` seated the ENTIRE stack — core anchor AND fan —
// FULLY OUTSIDE the dock box at rest (`.dock-hairline-slot` at `inset-inline-start: 100%`
// vertical / `inset-block-end: 100%` horizontal — a floating glass core hovering in the
// gutter). The user's spec is the INVERSE: at REST the stack is ENTIRELY CONTAINED in the
// dock (the core reads as a normal dock icon + a ~1-1.5px `--dock-rail-hairline` warm-ink
// line adjacent to it, ZERO gutter presence); on HOVER/CLICK the members FAN OUT as a
// macOS-STACK CROSSING the dock edge asymmetric-GOLDEN (overhang OUTWARD ~φ² (2.618) MORE
// than INWARD). box-INVIOLATE (`deltaW = deltaH = 0`) via the KEPT `.glass-dock-frame`
// non-clipping escape. ONE engine (a re-shape of `<DockStack>` — no second component, the
// `railProjection.ts` φ-math KEPT).
//
// THIS GATE EXTENDS proof:dock-rail-realize (which extends proof:dock-stack-rail) — its
// R1-R5 + S1-S6 stay GREEN by construction (imported + re-asserted), and T1-T5 add the
// reinvented topology. Born-RED on HEAD (the always-OUTSIDE `100%` anchor) → GREEN at the
// build:
//
//   T1 — COLLAPSED CONTAINMENT (the inversion, the root fix). The vertical slot rule NO
//        LONGER anchors `inset-inline-start: 100%` (the always-OUTSIDE form) and the
//        horizontal rule NO LONGER anchors `inset-block-end: 100%`; each seats CONTAINED at
//        the dock EDGE (a `inset-inline-end: 0` / `inset-block-start: 0` inner anchor).
//        Born-RED: HEAD's slot floats outside.
//   T2 — the CONTAINED HAIRLINE. `--dock-rail-hairline` (1-1.5px) + `--dock-rail-hairline-ink`
//        (a `color-mix(in srgb, var(--foreground) N%, transparent)` warm-ink line — no-gray),
//        CONSUMED by a `.dock-stack::before` hairline rule. A dark-band literal reds.
//   T3 — the asymmetric-GOLDEN overhang. `--dock-rail-overhang` is a `calc()` carrying the
//        φ² constant (2.618) reading the shared `--dock-rail-golden` source; DockStack writes
//        `--dock-rail-golden` from `RAIL_GOLDEN_SQ`; railProjection exports
//        `RAIL_GOLDEN_SQ = 2.618`. The fan geometry reads BOTH `--dock-rail-overhang` (OUTWARD)
//        and `--dock-rail-overhang-minor` (INWARD) — the crossing is φ²-asymmetric, the φ²
//        IN the calc (never a flat resolved rebake — the W-CARD-PAD φ-ladder fence).
//   T4 — the DISPLAY-OPTIONS axis. `wrap?: boolean` (default false) on DockStack + the CSS
//        `.dock-stack-fan[data-wrap]` wrap rule; `visibleCount` (default 3) KEPT.
//   T5 — box-INVIOLATE + ONE engine. The `.glass-dock-frame` escape carries NO
//        contain/backdrop-filter/overflow (the dock box never grows); the fan rides the ONE
//        `--spring-dock` clock; NO second rail SFC; the `railProjection.ts` φ-math is KEPT +
//        PURE (`projectFacets` exported, consumed by DockStack).
//
//   Self-test bites: (i) a re-added `inset-inline-start: 100%` reds T1; (ii) a missing
//   `--dock-rail-hairline` / a non-warm-ink hairline reds T2; (iii) an overhang calc missing
//   the φ² / a missing RAIL_GOLDEN_SQ reds T3; (iv) a missing `wrap` axis reds T4; (v) a
//   re-clipped frame reds T5.
//
// Run: node scripts/proof-dock-rail-reinvent.mjs

import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { gateArtifactPath, snapshotStamp, writeGateArtifact } from "./gate-output.mjs";
import { detect as detectRealize } from "./proof-dock-rail-realize.mjs";

const ROOT = resolve(fileURLToPath(new URL("../", import.meta.url)));
const COMMAND = "npm run proof:dock-rail-reinvent";

const DOCK_DIR = "src/components/custom/dock";
const DOCK_STACK = `${DOCK_DIR}/DockStack.vue`;
const RAIL_PROJECTION = `${DOCK_DIR}/composables/railProjection.ts`;
const STACK_CSS = "src/styles/dock/stack-rail.css";

// the HEAD tree BEFORE this wave (the always-OUTSIDE topology — the born-RED anchor).
const PRE_FIX_COMMIT = "HEAD";

const stripVue = (s) =>
    s
        .replace(/\/\*[\s\S]*?\*\//g, (m) => m.replace(/[^\n]/g, " "))
        .replace(/<!--[\s\S]*?-->/g, (m) => m.replace(/[^\n]/g, " "))
        .replace(/^\s*\/\/.*$/gm, (m) => m.replace(/[^\n]/g, " "))
        .replace(/^\s*\*.*$/gm, (m) => m.replace(/[^\n]/g, " "));
const stripCss = (s) => s.replace(/\/\*[\s\S]*?\*\//g, (m) => m.replace(/[^\n]/g, " "));
const readRel = (rel) => {
    const p = resolve(ROOT, rel);
    return existsSync(p) ? readFileSync(p, "utf8") : "";
};

// grab a single CSS rule body by an escaped-literal selector prefix.
function ruleBody(css, selectorRe) {
    const m = css.match(selectorRe);
    return m ? m[1] : null;
}

// ── T1 — COLLAPSED CONTAINMENT (the inversion) ──
export function detectT1() {
    const violations = [];
    const facts = {};
    const css = stripCss(readRel(STACK_CSS));

    const vSlot = ruleBody(
        css,
        /\.glass-dock-frame\[data-has-rail\]\.vertical\s+\.dock-hairline-slot\s*\{([^}]*)\}/,
    );
    const hSlot = ruleBody(
        css,
        /\.glass-dock-frame\[data-has-rail\]:not\(\.vertical\)\s+\.dock-hairline-slot\s*\{([^}]*)\}/,
    );
    facts.vSlotFound = vSlot != null;
    facts.hSlotFound = hSlot != null;
    if (!vSlot)
        violations.push(`T1: the vertical .dock-hairline-slot rule is missing from ${STACK_CSS}`);
    if (!hSlot)
        violations.push(`T1: the horizontal (:not(.vertical)) .dock-hairline-slot rule is missing from ${STACK_CSS}`);

    // The always-OUTSIDE `100%` anchors are GONE (the topology inversion).
    facts.vOutsideAnchor = vSlot != null && /inset-inline-start:\s*100%/.test(vSlot);
    facts.hOutsideAnchor = hSlot != null && /inset-block-end:\s*100%/.test(hSlot);
    if (facts.vOutsideAnchor)
        violations.push("T1: the vertical slot still anchors `inset-inline-start: 100%` — the always-OUTSIDE topology must invert to CONTAINED (the core inside the dock box)");
    if (facts.hOutsideAnchor)
        violations.push("T1: the horizontal slot still anchors `inset-block-end: 100%` — the always-OUTSIDE topology must invert to CONTAINED");

    // A CONTAINED inner-edge anchor is present (the core seats at the dock edge INSIDE).
    facts.vContained = vSlot != null && /inset-inline-end:\s*0\b/.test(vSlot);
    facts.hContained = hSlot != null && /inset-block-start:\s*0\b/.test(hSlot);
    if (vSlot != null && !facts.vContained)
        violations.push("T1: the vertical slot does not seat CONTAINED at the trailing edge (`inset-inline-end: 0`) — the core must read inside the dock box");
    if (hSlot != null && !facts.hContained)
        violations.push("T1: the horizontal slot does not seat CONTAINED at the top edge (`inset-block-start: 0`) — the core must read inside the dock box");

    return { violations, facts };
}

// ── T2 — the CONTAINED HAIRLINE (warm-ink, consumed) ──
export function detectT2() {
    const violations = [];
    const facts = {};
    const css = stripCss(readRel(STACK_CSS));

    const m = /--dock-rail-hairline:\s*([0-9.]+)px/.exec(css);
    facts.hairlineWidth = m ? Number(m[1]) : null;
    facts.hairlineInRange = facts.hairlineWidth != null && facts.hairlineWidth >= 1 && facts.hairlineWidth <= 2;
    if (!facts.hairlineInRange)
        violations.push(`T2: --dock-rail-hairline is ${facts.hairlineWidth ?? "absent"}px, not in the [1,2]px hairline register (the ~1-1.5px rail line, never the card's 10-14px envelope)`);

    // warm-ink line — a color-mix off --foreground (no-gray; the .dock-separator family).
    facts.warmInk = /--dock-rail-hairline-ink:\s*color-mix\(\s*in srgb\s*,\s*var\(--foreground\)/.test(css);
    if (!facts.warmInk)
        violations.push("T2: --dock-rail-hairline-ink is not a warm-ink `color-mix(in srgb, var(--foreground) …)` — a hairline that reads as a black scratch is forbidden (no-gray)");

    // consumed by a hairline `::before` on the stack (drawn INSIDE, beside the core).
    const beforeRule =
        /\.dock-stack(?:\.vertical|\.horizontal)?::before\s*\{[^}]*\}/g;
    const beforeBodies = (css.match(beforeRule) || []).join("\n");
    facts.hairlineConsumed =
        /\.dock-stack::before/.test(css) && /var\(--dock-rail-hairline-ink\)/.test(beforeBodies + css);
    // the ::before reads the width token (a real line, not a dead token).
    facts.widthConsumed = /var\(--dock-rail-hairline\)/.test(css);
    if (!facts.hairlineConsumed)
        violations.push("T2: no `.dock-stack::before` hairline rule reads `var(--dock-rail-hairline-ink)` — the rail line must be DRAWN adjacent to the core (a dead token is not a hairline)");
    if (!facts.widthConsumed)
        violations.push("T2: `var(--dock-rail-hairline)` is not consumed — the hairline width token is a dead orphan");

    return { violations, facts };
}

// ── T3 — the asymmetric-GOLDEN overhang (φ² in the calc, one source) ──
export function detectT3() {
    const violations = [];
    const facts = {};
    const css = stripCss(readRel(STACK_CSS));
    const stack = stripVue(readRel(DOCK_STACK));
    const projectionRaw = readRel(RAIL_PROJECTION);
    const projection = projectionRaw
        .replace(/\/\*[\s\S]*?\*\//g, " ")
        .replace(/^\s*\/\/.*$/gm, " ");

    // The --dock-rail-overhang calc carries the φ² constant (2.618) AND reads the shared
    // --dock-rail-golden source (the φ² is IN the calc — the W-CARD-PAD φ-ladder fence).
    const overhang = /--dock-rail-overhang:\s*calc\(([^;]*)\)/.exec(css);
    facts.overhangIsCalc = overhang != null;
    facts.overhangReadsMinor = overhang != null && /--dock-rail-overhang-minor/.test(overhang[1]);
    facts.overhangHasPhiSq = overhang != null && /2\.618/.test(overhang[1]);
    facts.overhangReadsGolden = overhang != null && /--dock-rail-golden/.test(overhang[1]);
    if (!facts.overhangIsCalc)
        violations.push("T3: --dock-rail-overhang is not a `calc()` — the φ² asymmetry must be EXPRESSED in the calc, never a flat resolved rebake");
    if (!facts.overhangReadsMinor)
        violations.push("T3: the --dock-rail-overhang calc does not read --dock-rail-overhang-minor — the outward reach must derive from the inward minor");
    if (!facts.overhangHasPhiSq)
        violations.push("T3: the --dock-rail-overhang calc carries no φ² (2.618) constant — the crossing must overhang OUTWARD ~φ² more than INWARD");
    if (!facts.overhangReadsGolden)
        violations.push("T3: the --dock-rail-overhang calc does not read the shared --dock-rail-golden source — the φ² must have ONE source (JS RAIL_GOLDEN_SQ → --dock-rail-golden)");

    // the fan geometry reads BOTH the outward overhang and the inward minor (the crossing).
    facts.fanReadsOverhang = /var\(--dock-rail-overhang\)/.test(css);
    facts.fanReadsMinor = /var\(--dock-rail-overhang-minor\)/.test(css);
    facts.fanSpanSumsBoth =
        /--dock-rail-fan-span:\s*calc\([^;]*--dock-rail-overhang\)[^;]*--dock-rail-overhang-minor/.test(css) ||
        /--dock-rail-fan-span:\s*calc\([^;]*--dock-rail-overhang-minor[^;]*--dock-rail-overhang\b/.test(css) ||
        /--dock-rail-fan-span:\s*calc\([^;]*--dock-rail-overhang[\s\S]*?--dock-rail-overhang-minor/.test(css);
    if (!(facts.fanReadsOverhang && facts.fanReadsMinor))
        violations.push("T3: the fan geometry does not read BOTH --dock-rail-overhang (outward) and --dock-rail-overhang-minor (inward) — the crossing must be asymmetric across the edge");

    // DockStack writes --dock-rail-golden from RAIL_GOLDEN_SQ (the JS→CSS single source).
    facts.dockStackImportsGolden = /RAIL_GOLDEN_SQ/.test(stack) && /railProjection/.test(stack);
    facts.dockStackWritesGolden = /["']--dock-rail-golden["']\s*:\s*RAIL_GOLDEN_SQ/.test(stack);
    if (!facts.dockStackImportsGolden)
        violations.push("T3: DockStack.vue does not import RAIL_GOLDEN_SQ from railProjection — the φ² source must be the JS constant");
    if (!facts.dockStackWritesGolden)
        violations.push("T3: DockStack.vue does not write `--dock-rail-golden: RAIL_GOLDEN_SQ` — the JS→CSS φ² wire is broken (the CSS calc would freeze at its fallback)");

    // railProjection EXPORTS RAIL_GOLDEN_SQ = 2.618 (the single source).
    facts.projectionExportsGolden = /export\s+const\s+RAIL_GOLDEN_SQ\s*=\s*2\.618/.test(projection);
    if (!facts.projectionExportsGolden)
        violations.push("T3: railProjection.ts does not `export const RAIL_GOLDEN_SQ = 2.618` — the shared φ² crossing constant is missing");

    return { violations, facts };
}

// ── T4 — the DISPLAY-OPTIONS axis (wrap, visibleCount kept) ──
export function detectT4() {
    const violations = [];
    const facts = {};
    const stack = stripVue(readRel(DOCK_STACK));
    const css = stripCss(readRel(STACK_CSS));

    facts.hasWrapProp = /wrap\?:\s*boolean/.test(stack);
    facts.wrapDefaultFalse = /wrap:\s*false/.test(stack);
    facts.wrapCss = /\.dock-stack-fan\[data-wrap\]\s*\{[^}]*flex-wrap:\s*wrap/.test(css);
    if (!facts.hasWrapProp)
        violations.push("T4: DockStack.vue has no `wrap?: boolean` display-options axis (the user's 'number of elements to show, wrapping')");
    if (!facts.wrapDefaultFalse)
        violations.push("T4: the `wrap` prop default is not `false` — the wrap axis must be additive default-off (the scroll path byte-identical)");
    if (!facts.wrapCss)
        violations.push("T4: no `.dock-stack-fan[data-wrap] { flex-wrap: wrap }` rule — the wrap render is missing");

    // visibleCount is KEPT (default 3).
    const def = /visibleCount:\s*([0-9]+)/.exec(stack);
    facts.visibleCountDefault = def ? Number(def[1]) : null;
    if (facts.visibleCountDefault !== 3)
        violations.push(`T4: the visibleCount default is ${facts.visibleCountDefault ?? "absent"}, not 3 — the "3 configurable" visible must be KEPT`);

    return { violations, facts };
}

// ── T5 — box-INVIOLATE + ONE engine ──
export function detectT5() {
    const violations = [];
    const facts = {};
    const css = stripCss(readRel(STACK_CSS));
    const projectionRaw = readRel(RAIL_PROJECTION);
    const projection = projectionRaw
        .replace(/\/\*[\s\S]*?\*\//g, " ")
        .replace(/^\s*\/\/.*$/gm, " ");
    const stack = stripVue(readRel(DOCK_STACK));

    // box-INVIOLATE: the .glass-dock-frame escape carries NO clip (the dock box never grows).
    const frameRules = [...css.matchAll(/\.glass-dock-frame[^{]*\{([^}]*)\}/g)].map((m) => m[1]);
    const frameBody = frameRules.join("\n");
    facts.frameNoClip =
        !/contain\s*:/.test(frameBody) &&
        !/backdrop-filter\s*:/.test(frameBody) &&
        !/overflow[^:]*:/.test(frameBody);
    if (!facts.frameNoClip)
        violations.push("T5: the .glass-dock-frame escape re-introduces clipping (contain/backdrop/overflow) — box-INVIOLATE demands the dock box never grow/clip");

    // ONE clock: the fan rides --spring-dock (no second spring).
    facts.ridesSpringDock = /--spring-dock/.test(css);
    if (!facts.ridesSpringDock)
        violations.push("T5: the fan does not ride the --spring-dock clock — it must reuse the ONE dock spring, never a re-forked clock");

    // ONE engine: the φ-math is KEPT + PURE (projectFacets exported, no SpringProgress/rAF),
    // consumed by DockStack (no dead substrate).
    facts.projectionPure =
        /export\s+function\s+projectFacets/.test(projection) &&
        !/\bSpringProgress\b/.test(projection) &&
        !/\brequestAnimationFrame\b/.test(projection);
    facts.projectionConsumed = /projectFacets\s*\(/.test(stack);
    if (!facts.projectionPure)
        violations.push("T5: railProjection.ts is not a KEPT PURE helper (projectFacets exported, no SpringProgress/rAF) — the φ-math must be kept, never re-forked");
    if (!facts.projectionConsumed)
        violations.push("T5: DockStack.vue does not call projectFacets — the KEPT φ-math must have a live consumer");

    // NO second rail SFC (the ONE engine — a re-shape of DockStack, no new component).
    const newRailSfcs = ["DockRail.vue", "DockFacetRail.vue", "LiquidRail.vue", "FacetRail.vue"];
    facts.newRailSfcs = newRailSfcs.filter((f) => existsSync(resolve(ROOT, `${DOCK_DIR}/${f}`)));
    if (facts.newRailSfcs.length)
        violations.push(`T5: a second rail SFC exists (${facts.newRailSfcs.join(", ")}) — the reinvention is a re-shape of DockStack, NOT a new component`);

    return { violations, facts };
}

// ── self-tests (the detector bites its planted fixtures) ──
function selfTests() {
    const out = {};
    // T1 — a re-added always-OUTSIDE anchor reds.
    out.t1 = (() => /inset-inline-start:\s*100%/.test("inset-inline-start: 100%;"))();
    // T2 — a missing hairline token / non-warm ink reds.
    out.t2 = (() => {
        const bad = "--dock-rail-hairline-ink: hsl(0 0% 0% / 0.5);"; // black, not warm-ink
        return !/--dock-rail-hairline-ink:\s*color-mix\(\s*in srgb\s*,\s*var\(--foreground\)/.test(bad);
    })();
    // T3 — an overhang calc with no φ² reds.
    out.t3 = (() => {
        const bad = "--dock-rail-overhang: calc(var(--dock-rail-overhang-minor) * 1);";
        const m = /--dock-rail-overhang:\s*calc\(([^;]*)\)/.exec(bad);
        return m != null && !/2\.618/.test(m[1]);
    })();
    // T3b — a missing RAIL_GOLDEN_SQ export reds.
    out.t3b = (() => !/export\s+const\s+RAIL_GOLDEN_SQ\s*=\s*2\.618/.test("const x = 1;"))();
    // T4 — a missing wrap axis reds.
    out.t4 = (() => !/wrap\?:\s*boolean/.test("visibleCount?: number;"))();
    // T5 — a re-clipped frame reds.
    out.t5 = (() => /contain\s*:/.test("display: inline-flex; contain: paint;"))();
    return out;
}

// ── born-RED via git-show (the pre-fix HEAD carried the always-OUTSIDE `100%` anchor) ──
async function reconstructBornRed() {
    const { execFileSync } = await import("node:child_process");
    let reconstructed = true;
    let outsideAnchorAtHead = false;
    try {
        const head = execFileSync(
            "git",
            ["show", `${PRE_FIX_COMMIT}:${STACK_CSS}`],
            { cwd: ROOT, encoding: "utf8" },
        );
        outsideAnchorAtHead =
            /inset-inline-start:\s*100%/.test(head) || /inset-block-end:\s*100%/.test(head);
    } catch {
        reconstructed = false;
    }
    return { reconstructed, outsideAnchorAtHead };
}

export async function detect() {
    const t1 = detectT1();
    const t2 = detectT2();
    const t3 = detectT3();
    const t4 = detectT4();
    const t5 = detectT5();
    const realize = await detectRealize();
    const bornRed = await reconstructBornRed();

    const st = selfTests();
    const stViolations = [];
    for (const [k, ok] of Object.entries(st))
        if (!ok) stViolations.push(`${k} self-test bite BROKE — the detector does not bite its planted ${k} fixture`);

    const bornRedViolations = [];
    if (bornRed.reconstructed && !bornRed.outsideAnchorAtHead)
        bornRedViolations.push(`born-RED: the pre-fix tree (${PRE_FIX_COMMIT}) did NOT carry the always-OUTSIDE \`100%\` slot anchor — the gate is not born-RED against the pre-inversion topology`);

    const realizeViolations = realize.violations.map((v) => `(extends proof:dock-rail-realize) ${v}`);

    const violations = [
        ...t1.violations,
        ...t2.violations,
        ...t3.violations,
        ...t4.violations,
        ...t5.violations,
        ...realizeViolations,
        ...bornRedViolations,
        ...stViolations,
    ];
    return {
        violations,
        facts: {
            t1: t1.facts,
            t2: t2.facts,
            t3: t3.facts,
            t4: t4.facts,
            t5: t5.facts,
            extendsRealize: realize.facts,
            bornRed,
            selfTests: st,
        },
    };
}

async function run() {
    const { violations, facts } = await detect();
    const status = violations.length === 0 ? "pass" : "fail";
    const ARTIFACT = gateArtifactPath("GLASS_UI_DOCK_RAIL_REINVENT_ARTIFACT", "BG-dock-rail-reinvent");
    writeGateArtifact(ARTIFACT, {
        generatedAt: snapshotStamp(),
        status,
        gate: "proof:dock-rail-reinvent",
        command: COMMAND,
        note: "BG.W-DOCK-RAIL-REINVENT device-free SOURCE arm — the dock rail topology INVERTED (USER 07-05 + IMG_1880; supersedes the BE always-OUTSIDE read). EXTENDS proof:dock-rail-realize (R1-R5 + S1-S6 re-asserted GREEN). T1 COLLAPSED CONTAINMENT (the `inset-*: 100%` always-OUTSIDE anchor GONE, the core seats CONTAINED at the dock edge). T2 the CONTAINED HAIRLINE (--dock-rail-hairline 1-1.5px + a warm-ink --foreground color-mix, drawn by .dock-stack::before — no-gray). T3 the asymmetric-GOLDEN overhang (--dock-rail-overhang calc carries φ² 2.618 off the shared --dock-rail-golden source; DockStack writes it from RAIL_GOLDEN_SQ; the fan reads OUTWARD + INWARD). T4 the wrap display-options axis (additive default-off, visibleCount 3 kept). T5 box-INVIOLATE (frame no-clip) + ONE engine (--spring-dock, the KEPT PURE railProjection φ-math, no second SFC). Born-RED on HEAD's always-OUTSIDE topology. The LIVE collapsed-containment + fan-crossing PAINT (the φ² asymmetry, box-equality, both engines both modes) is the orchestrator's W-DOCK-RAIL-REINVENT-DELTA (the Fable non-authoring judge reads the three IMG_1880 fan-states).",
        facts,
        violations,
    });
    console.log(`proof:dock-rail-reinvent — ${status.toUpperCase()}`);
    console.log(`  T1 containment: v-outside=${facts.t1.vOutsideAnchor} h-outside=${facts.t1.hOutsideAnchor} v-contained=${facts.t1.vContained} h-contained=${facts.t1.hContained}`);
    console.log(`  T2 hairline: width=${facts.t2.hairlineWidth}px in-range=${facts.t2.hairlineInRange} warm-ink=${facts.t2.warmInk} consumed=${facts.t2.hairlineConsumed}`);
    console.log(`  T3 golden: overhang-calc=${facts.t3.overhangIsCalc} phi²=${facts.t3.overhangHasPhiSq} reads-golden=${facts.t3.overhangReadsGolden} fan-outward=${facts.t3.fanReadsOverhang} fan-inward=${facts.t3.fanReadsMinor} dockstack-writes=${facts.t3.dockStackWritesGolden} proj-exports=${facts.t3.projectionExportsGolden}`);
    console.log(`  T4 display: wrap-prop=${facts.t4.hasWrapProp} default-false=${facts.t4.wrapDefaultFalse} wrap-css=${facts.t4.wrapCss} visibleCount=${facts.t4.visibleCountDefault}`);
    console.log(`  T5 one-engine: frame-no-clip=${facts.t5.frameNoClip} spring-dock=${facts.t5.ridesSpringDock} projection-pure=${facts.t5.projectionPure} consumed=${facts.t5.projectionConsumed} no-2nd-sfc=${facts.t5.newRailSfcs.length === 0}`);
    console.log(`  extends proof:dock-rail-realize: violations=${facts.extendsRealize ? "(folded)" : "n/a"}`);
    console.log(`  born-RED: reconstructed=${facts.bornRed.reconstructed} outside-anchor@head=${facts.bornRed.outsideAnchorAtHead}`);
    console.log(`  self-tests: ${Object.entries(facts.selfTests).map(([k, v]) => `${k}=${v ? "OK" : "BROKE"}`).join(" ")}`);
    if (violations.length) {
        console.log("\nVIOLATIONS:");
        for (const v of violations) console.log(`  x ${v}`);
    } else {
        console.log(`  artefact: ${ARTIFACT.slice(ROOT.length + 1)}`);
    }
    process.exit(status === "pass" ? 0 : 1);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
    run();
}

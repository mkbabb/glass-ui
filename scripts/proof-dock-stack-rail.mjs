#!/usr/bin/env node
// proof:dock-stack-rail — BC.W-DOCK-STACK-RAIL — the macOS hover-expand stack rail (the
// chronic AZ→BA→BB divider-carousel rail, finally to spec; the clean-break rebuild).
//
// THE RETIRE. BB built a DIVIDER-CAROUSEL — a floating strip of detached glass chips on a
// connective hairline at a named separator seam — which CONTRADICTS the verbatim macOS-stack
// ask (rail-spec-contradicted-divider-carousel). This wave RETIRES it clean (no alias):
// `DockRail.vue` → `DockStack.vue`; the `.dock-hairline-strip`/`.dock-hairline-extend-chip`
// chip CSS + the `measureSeam`/`--dock-rail-seam-offset` seam-locator DELETE; `DockRailItem`
// → `DockStackItem`. The `.glass-dock-frame` non-clipping escape STAYS (the kept chassis).
//
// THE BUILD. The macOS hover-expand stack: a CORE anchor item whose N members FAN OUT next
// to the rail on hover/focus (compositor-only scale/translate/opacity/filter on the ONE
// spring clock, staggered), 3 configurable visible + scrollable n-stack (via FadingScroll),
// extending BEYOND the dock edge into its gutter so it clears <main>/the <h1>/a form field
// BY TOPOLOGY (the chip-graze that revoked the BA dock/shell PASS cannot recur).
//
// THE CARDINAL SPLIT this gate validates born-RED→GREEN itself (the device-free SOURCE arm
// ["local","ci","release"]). The LIVE fan-out PAINT + the headline no-graze assert are the
// orchestrator's (the W-DOCK-STACK-RAIL-DELTA capture on /dock/rail + the shell + /forms/inputs).
//
//   S1 — the divider-carousel is RETIRED (clean break). DockRail.vue + the
//        `.dock-hairline-strip`/`.dock-hairline-extend-chip` rules + the `measureSeam`/
//        `--dock-rail-seam-offset` seam-locator + the `DockRailItem` descriptor are
//        DEFINITION-ABSENT (no alias). Self-test bite: a surviving DockRail export or a
//        re-added seam-offset write reds.
//   S2 — the stack rail exists ONCE on the KEPT escape. DockStack.vue exists, renders in
//        the #rail slot over the `.glass-dock-frame` escape; the frame carries NO contain/
//        backdrop-filter/overflow (the chassis kept, not re-clipped). Self-test bite: a
//        `contain: paint` re-added to the frame reds.
//   S3 — hover-expand on the iOS clock, compositor-only. The fan-out animates ONLY
//        transform/opacity/filter (NO animated width/height/inline-size/inset — the
//        proof:no-layout-animation floor), rides the ONE spring (`--spring-dock`/DOCK_SPRING,
//        no new clock), staggered by `--dock-stack-stagger`, PRM-carved. Self-test bite: an
//        animated `inline-size`/`inset` on a member reds.
//   S4 — 3-visible default + scrollable n-stack. `visibleCount` defaults 3; an >visibleCount
//        stack routes through `<FadingScroll>` (the one port, not a bespoke scroll); no
//        displayed member resolves a ghost/dimmed alpha (every member reads
//        `--glass-bg-floating`, not a low-alpha shadow). Self-test bite: a default ≠ 3 reds.
//   S5 — clears content by topology. The stack rail seats in the gutter (the demo
//        `.demo-sidebar-rail` off-canvas seat); no rail re-seats over <main>. Self-test
//        bite: a content-band overlay seat reds.
//   S6 — the ≥2-consumer bar + one-registry. `<DockStack>` is bound on ≥2 shell consumers
//        (SidebarDock + BottomDock) + the /dock/rail story; the members write the
//        consumer-owned model (no internal ref()/reactive() shadow of the active member).
//        Self-test bite: an internal selection shadow reds.
//
// Run: node scripts/proof-dock-stack-rail.mjs

import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { gateArtifactPath, snapshotStamp, writeGateArtifact } from "./gate-output.mjs";

const ROOT = resolve(fileURLToPath(new URL("../", import.meta.url)));
const COMMAND = "npm run proof:dock-stack-rail";

const DOCK_DIR = "src/components/custom/dock";
const DOCK_RAIL = `${DOCK_DIR}/DockRail.vue`;
const DOCK_STACK = `${DOCK_DIR}/DockStack.vue`;
const CONSTANTS = `${DOCK_DIR}/constants.ts`;
const INDEX = `${DOCK_DIR}/index.ts`;
const GLASS_DOCK = `${DOCK_DIR}/GlassDock.vue`;
const STACK_CSS = "src/styles/dock/stack-rail.css";
const RAIL_EXTEND_CSS = "src/styles/dock/rail-extend.css";
const DOCK_CSS = "src/styles/dock.css";
const SIDEBAR = "demo/layout/SidebarDock.vue";
const BOTTOM = "demo/layout/BottomDock.vue";
const RAIL_STORY = "demo/stories/dock/rail.vue";

const PRE_FIX_COMMIT = "452846c4"; // the BC.W-DOCK-ENGINE tree (the divider-carousel live)

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

// ── S1 — the divider-carousel is RETIRED (clean break, DEFINITION-ABSENT) ──
export function detectS1() {
    const violations = [];
    const facts = {};
    // The SFC + the renamed CSS partial are absent on disk.
    facts.dockRailAbsent = !existsSync(resolve(ROOT, DOCK_RAIL));
    facts.railExtendCssAbsent = !existsSync(resolve(ROOT, RAIL_EXTEND_CSS));
    if (!facts.dockRailAbsent)
        violations.push(`S1: ${DOCK_RAIL} still exists — the divider-carousel SFC must be REPLACED by DockStack.vue (clean break, no alias)`);
    if (!facts.railExtendCssAbsent)
        violations.push(`S1: ${RAIL_EXTEND_CSS} still exists — the chip-strip CSS partial must be renamed to stack-rail.css (the chip rules deleted, the frame escape kept)`);

    // No `DockRail` export in the barrel (the name retires onto DockStack, no re-export).
    const index = stripVue(readRel(INDEX));
    facts.indexExportsDockRail = /export\s*\{[^}]*\bDockRail\b/.test(index) || /as\s+DockRail\b/.test(index);
    facts.indexExportsDockRailItem = /\bDockRailItem\b/.test(index);
    if (facts.indexExportsDockRail)
        violations.push("S1: the dock barrel still exports `DockRail` — no `DockRail` re-export (clean break)");
    if (facts.indexExportsDockRailItem)
        violations.push("S1: the dock barrel still exports `DockRailItem` — it must be re-conceived as `DockStackItem` (no alias)");

    // The `DockRailItem` descriptor is gone from constants.ts (re-conceived as DockStackItem).
    const constants = stripVue(readRel(CONSTANTS));
    facts.constantsHasDockRailItem = /\binterface\s+DockRailItem\b/.test(constants);
    facts.constantsHasDockStackItem = /\binterface\s+DockStackItem\b/.test(constants);
    if (facts.constantsHasDockRailItem)
        violations.push("S1: constants.ts still declares `interface DockRailItem` — re-conceive it as `DockStackItem` (clean break)");
    if (!facts.constantsHasDockStackItem)
        violations.push("S1: constants.ts does not declare `interface DockStackItem` — the stack member descriptor is missing");

    // The seam-locator (`measureSeam` + the `--dock-rail-seam-offset` WRITE) is gone from
    // GlassDock (the stack seats at the dock edge, not a divider seam).
    const dock = stripVue(readRel(GLASS_DOCK));
    facts.glassDockHasMeasureSeam = /function\s+measureSeam\b/.test(dock);
    facts.glassDockWritesSeamOffset = /setProperty\(\s*["']--dock-rail-seam-offset/.test(dock);
    if (facts.glassDockHasMeasureSeam)
        violations.push("S1: GlassDock.vue still defines `measureSeam()` — the divider-seam locator must be deleted (the stack seats at the dock edge)");
    if (facts.glassDockWritesSeamOffset)
        violations.push("S1: GlassDock.vue still writes `--dock-rail-seam-offset` — the seam-offset mechanism is retired with the chip-strip");

    // The chip-strip CSS classes are gone (no live `.dock-hairline-strip` / `-extend-chip` rule).
    const stackCss = stripCss(readRel(STACK_CSS));
    facts.stackCssHasChipStrip =
        /\.dock-hairline-strip\b/.test(stackCss) || /\.dock-hairline-extend-chip\b/.test(stackCss) || /\.dock-hairline-extend\b/.test(stackCss);
    if (facts.stackCssHasChipStrip)
        violations.push("S1: stack-rail.css still carries the `.dock-hairline-strip`/`.dock-hairline-extend-chip` chip rules — the divider-carousel CSS must be deleted (the frame escape kept)");

    // The dock.css @import points at stack-rail.css (not rail-extend.css).
    const dockCss = readRel(DOCK_CSS);
    facts.importsStackRail = /@import\s+["']\.\/dock\/stack-rail\.css["']/.test(dockCss);
    facts.importsRailExtend = /@import\s+["']\.\/dock\/rail-extend\.css["']/.test(dockCss);
    if (!facts.importsStackRail)
        violations.push("S1: dock.css does not @import ./dock/stack-rail.css — the renamed partial is not wired");
    if (facts.importsRailExtend)
        violations.push("S1: dock.css still @imports ./dock/rail-extend.css — the retired partial is still wired");

    return { violations, facts };
}

// ── S2 — the stack rail exists ONCE on the KEPT escape ──
export function detectS2() {
    const violations = [];
    const facts = {};
    facts.dockStackExists = existsSync(resolve(ROOT, DOCK_STACK));
    if (!facts.dockStackExists) {
        violations.push("S2: DockStack.vue does not exist — the stack rail primitive is missing");
        return { violations, facts };
    }
    const stack = stripVue(readRel(DOCK_STACK));
    // It renders FadingScroll (the fan port) + a core + members fan.
    facts.usesFadingScroll = /FadingScroll/.test(stack);
    facts.hasCore = /dock-stack-core/.test(stack);
    facts.hasMember = /dock-stack-member/.test(stack);
    if (!(facts.usesFadingScroll && facts.hasCore && facts.hasMember))
        violations.push("S2: DockStack.vue is not the macOS stack shape (a core anchor + a FadingScroll-ported member fan)");

    // The KEPT escape: the frame carries NO contain/backdrop-filter/overflow (re-clipping
    // the rail would be the R4-1 "black blob" regression). Scan the stack-rail.css frame rules.
    const css = stripCss(readRel(STACK_CSS));
    // Isolate the `.glass-dock-frame[data-has-rail]` rule bodies.
    const frameRules = [...css.matchAll(/\.glass-dock-frame[^{]*\{([^}]*)\}/g)].map((m) => m[1]);
    const frameBody = frameRules.join("\n");
    facts.frameContains = /contain\s*:/.test(frameBody);
    facts.frameBackdrop = /backdrop-filter\s*:/.test(frameBody);
    facts.frameOverflow = /overflow[^:]*:/.test(frameBody);
    if (facts.frameContains || facts.frameBackdrop || facts.frameOverflow)
        violations.push(`S2: the .glass-dock-frame escape re-introduces clipping (contain=${facts.frameContains} backdrop=${facts.frameBackdrop} overflow=${facts.frameOverflow}) — the kept chassis must NOT re-clip the rail (the R4-1 black-blob regression)`);

    // The slot renders in the #rail slot (GlassDock keeps the #rail escape).
    const dock = stripVue(readRel(GLASS_DOCK));
    facts.railSlotPresent = /<slot\s+name="rail"/.test(dock) && /dock-hairline-slot/.test(dock);
    if (!facts.railSlotPresent)
        violations.push("S2: GlassDock.vue no longer renders the #rail slot over the .dock-hairline-slot escape — the kept chassis is gone");
    return { violations, facts };
}

// ── S3 — hover-expand on the iOS clock, compositor-only ──
export function detectS3() {
    const violations = [];
    const facts = {};
    const css = stripCss(readRel(STACK_CSS));
    // The member transition animates ONLY transform/opacity/filter (the compositor +
    // paint axes), NEVER a layout axis (width/height/inline-size/block-size/inset/top/left).
    const memberRules = [...css.matchAll(/\.dock-stack-member[^{]*\{([^}]*)\}/g)].map((m) => m[1]);
    const layoutAxisRe = /transition:[^;]*(inline-size|block-size|\bwidth\b|\bheight\b|\binset\b|\btop\b|\bleft\b|\bright\b|\bbottom\b)/;
    facts.animatesLayoutAxis = memberRules.some((b) => layoutAxisRe.test(b));
    if (facts.animatesLayoutAxis)
        violations.push("S3: a `.dock-stack-member` transition animates a LAYOUT axis (width/height/inline-size/inset) — the fan-out must be compositor-only (transform/opacity/filter), the proof:no-layout-animation floor");

    // Rides the ONE spring clock (`--spring-dock`), NOT a new bespoke @keyframes spring.
    facts.usesSpringDock = /--spring-dock/.test(css);
    if (!facts.usesSpringDock)
        violations.push("S3: the fan-out does not ride the `--spring-dock` clock — it must use the ONE engine spring, never a second hand-rolled clock");

    // Staggered by --dock-stack-stagger.
    facts.staggered = /--dock-stack-stagger/.test(css);
    if (!facts.staggered)
        violations.push("S3: the fan-out is not staggered by `--dock-stack-stagger` — the macOS fan reads each member in turn");

    // PRM-carved: a @media (prefers-reduced-motion: reduce) block snaps the fan to terminal.
    facts.prmCarved = /@media[^{]*prefers-reduced-motion[^{]*\{[\s\S]*?dock-stack-member/.test(css);
    if (!facts.prmCarved)
        violations.push("S3: no PRM carve for the fan-out — under reduce the transform must snap to terminal (fade survives), the P6 floor");

    return { violations, facts };
}

// ── S4 — 3-visible default + scrollable n-stack + NOT shadowed ──
export function detectS4() {
    const violations = [];
    const facts = {};
    const stack = stripVue(readRel(DOCK_STACK));
    // visibleCount defaults 3.
    const def = /visibleCount:\s*([0-9]+)/.exec(stack);
    facts.visibleCountDefault = def ? Number(def[1]) : null;
    if (facts.visibleCountDefault !== 3)
        violations.push(`S4: the \`visibleCount\` default is ${facts.visibleCountDefault ?? "absent"}, not 3 — the verbatim "3 configurable items visible"`);

    // Routes the n-stack through FadingScroll (the one scroll-fade port, not a bespoke scroll).
    facts.usesFadingScroll = /FadingScroll/.test(stack);
    if (!facts.usesFadingScroll)
        violations.push("S4: the overflow does not route through `<FadingScroll>` — the scrollable n-stack must reuse the one scroll-fade port");

    // NOT shadowed: every displayed member reads `--glass-bg-floating` (a clear glass icon),
    // not a low-alpha/ghost fill. The stack-rail.css member rule must set --glass-bg-floating.
    const css = stripCss(readRel(STACK_CSS));
    const memberRule = /\.dock-stack-member[^{]*\{([^}]*)\}/.exec(css);
    facts.memberReadsFloating = memberRule != null && /background:\s*var\(--glass-bg-floating\)/.test(memberRule[1]);
    if (!facts.memberReadsFloating)
        violations.push("S4: the `.dock-stack-member` does not read `--glass-bg-floating` — every displayed member must be a clear glass icon (NOT a shadowed half-tucked chip — the verbatim ask)");

    return { violations, facts };
}

// ── S5 — clears content by topology ──
export function detectS5() {
    const violations = [];
    const facts = {};
    // The stack seats in the gutter, NOT a content-band overlay. The demo .demo-sidebar-rail
    // re-seats the stack slot into the lower gutter (chipOverMain: false). The library
    // stack-rail.css seats the vertical stack off the trailing edge (its own gutter, never
    // over <main> which is inline-start of the dock).
    const navCss = stripCss(readRel("demo/layout/dock-nav.css"));
    facts.demoGutterSeat = /\.demo-sidebar-rail[^{]*\.dock-(stack|hairline-slot)/.test(navCss);
    if (!facts.demoGutterSeat)
        violations.push("S5: the demo `.demo-sidebar-rail` does not re-seat the stack into its gutter — the off-canvas chipOverMain:false topology is missing (the headline graze-clearance)");

    // The library slot seats at the dock EDGE (inset-inline-start: 100% on the vertical
    // trailing gutter), not a content-band overlay.
    const css = stripCss(readRel(STACK_CSS));
    facts.slotSeatsAtEdge = /\.dock-hairline-slot\s*\{[\s\S]*?position:\s*absolute/.test(css);
    if (!facts.slotSeatsAtEdge)
        violations.push("S5: the `.dock-hairline-slot` is not an absolute gutter sibling — the stack must seat beyond the dock edge, never over a content band");

    return { violations, facts };
}

// ── S6 — the ≥2-consumer bar + one-registry ──
export function detectS6() {
    const violations = [];
    const facts = {};
    const sidebar = stripVue(readRel(SIDEBAR));
    const bottom = stripVue(readRel(BOTTOM));
    const story = stripVue(readRel(RAIL_STORY));
    const mountsStack = (s) => /<DockStack\b/.test(s);
    facts.sidebarMounts = mountsStack(sidebar);
    facts.bottomMounts = mountsStack(bottom);
    facts.storyMounts = mountsStack(story);
    const consumerCount = [facts.sidebarMounts, facts.bottomMounts, facts.storyMounts].filter(Boolean).length;
    facts.consumerCount = consumerCount;
    if (consumerCount < 2)
        violations.push(`S6: <DockStack> is bound on ${consumerCount} consumer(s) — the ≥2-consumer bar (SidebarDock + BottomDock + the /dock/rail story) is unmet`);

    // One-registry: DockStack owns NO internal ref()/reactive() shadow of the active member.
    // The selection is a defineModel (consumer-owned), never an internal store.
    const stack = stripVue(readRel(DOCK_STACK));
    facts.selectedIsModel = /defineModel<[^>]*>\(\s*["']selected["']/.test(stack);
    // An internal ref/reactive holding a SELECTION is the shadow (the hover `expanded` is a
    // transient UI model, not a selection — allowed). We flag a `ref(` that names a selection.
    facts.hasSelectionShadow = /\b(selected|active|context)\s*=\s*ref\(/.test(stack) || /\breactive\(\s*\{[^}]*selected/.test(stack);
    if (!facts.selectedIsModel)
        violations.push("S6: the selected member is not a `defineModel('selected')` consumer-owned ref — the members must write the consumer model (one registry)");
    if (facts.hasSelectionShadow)
        violations.push("S6: DockStack owns an internal ref()/reactive() SHADOW of the active member — the one-registry discipline (R2) is broken");

    return { violations, facts };
}

// ── born-RED via git-show (the pre-fix tree carried the divider-carousel) ──
async function reconstructBornRed() {
    const { execFileSync } = await import("node:child_process");
    const exists = (path) => {
        try {
            execFileSync("git", ["cat-file", "-e", `${PRE_FIX_COMMIT}:${path}`], {
                cwd: ROOT,
                stdio: ["ignore", "ignore", "ignore"],
            });
            return true;
        } catch {
            return false;
        }
    };
    let reconstructed = true;
    let dockRailAtHead = false;
    let railExtendAtHead = false;
    try {
        dockRailAtHead = exists(DOCK_RAIL);
        railExtendAtHead = exists(RAIL_EXTEND_CSS);
    } catch {
        reconstructed = false;
    }
    return { reconstructed, dockRailAtHead, railExtendAtHead };
}

// ── self-tests ──
function selfTests() {
    const out = {};
    // S1 — a surviving DockRail export reds.
    out.s1 = (() => {
        const v = /export\s*\{[^}]*\bDockRail\b/.test("export { default as DockRail } from './DockRail.vue';");
        return v === true;
    })();
    // S2 — a contain on the frame reds (mimic the detector body scan).
    out.s2 = (() => {
        const body = "display: inline-flex; contain: paint;";
        return /contain\s*:/.test(body);
    })();
    // S3 — an animated inline-size on a member reds.
    out.s3 = (() => {
        const body = "transition: inline-size var(--duration-normal) var(--spring-dock);";
        return /transition:[^;]*(inline-size|inset)/.test(body);
    })();
    // S4 — a visibleCount default ≠ 3 reds.
    out.s4 = (() => {
        const def = /visibleCount:\s*([0-9]+)/.exec("{ visibleCount: 5 }");
        return def != null && Number(def[1]) !== 3;
    })();
    // S5 — a content-band overlay seat (no absolute gutter sibling) reds.
    out.s5 = (() => {
        const css = ".dock-hairline-slot { position: static; }";
        return !/\.dock-hairline-slot\s*\{[\s\S]*?position:\s*absolute/.test(css);
    })();
    // S6 — an internal selection shadow reds.
    out.s6 = (() => /\b(selected|active|context)\s*=\s*ref\(/.test("const selected = ref('a');"))();
    return out;
}

export async function detect() {
    const s1 = detectS1();
    const s2 = detectS2();
    const s3 = detectS3();
    const s4 = detectS4();
    const s5 = detectS5();
    const s6 = detectS6();
    const bornRed = await reconstructBornRed();

    const st = selfTests();
    const stViolations = [];
    for (const [k, ok] of Object.entries(st))
        if (!ok) stViolations.push(`${k} self-test bite BROKE — the detector does not bite its planted ${k} fixture`);

    const bornRedViolations = [];
    if (bornRed.reconstructed && !bornRed.dockRailAtHead)
        bornRedViolations.push(`born-RED: the pre-fix tree (${PRE_FIX_COMMIT}) did NOT carry DockRail.vue — the gate is not born-RED against the divider-carousel tree`);

    const violations = [
        ...s1.violations,
        ...s2.violations,
        ...s3.violations,
        ...s4.violations,
        ...s5.violations,
        ...s6.violations,
        ...bornRedViolations,
        ...stViolations,
    ];
    return {
        violations,
        facts: { s1: s1.facts, s2: s2.facts, s3: s3.facts, s4: s4.facts, s5: s5.facts, s6: s6.facts, bornRed, selfTests: st },
    };
}

async function run() {
    const { violations, facts } = await detect();
    const status = violations.length === 0 ? "pass" : "fail";
    const ARTIFACT = gateArtifactPath("GLASS_UI_DOCK_STACK_RAIL_ARTIFACT", "BC-dock-stack-rail");
    writeGateArtifact(ARTIFACT, {
        generatedAt: snapshotStamp(),
        status,
        gate: "proof:dock-stack-rail",
        command: COMMAND,
        note: "BC.W-DOCK-STACK-RAIL device-free SOURCE arm (S1 the divider-carousel RETIRED clean — DockRail/DockRailItem/the chip CSS/the measureSeam seam-locator DEFINITION-ABSENT, no alias · S2 DockStack exists ONCE on the kept .glass-dock-frame escape, no re-clip · S3 hover-expand compositor-only on the --spring-dock clock, staggered, PRM-carved · S4 visibleCount default 3 + FadingScroll n-stack + every member reads --glass-bg-floating, NOT shadowed · S5 clears content by topology — the gutter seat, no content-band overlay · S6 the ≥2-consumer bar + the consumer-owned model, no selection shadow). The LIVE fan-out PAINT + the headline no-graze-on-/forms/inputs assert are the orchestrator's W-DOCK-STACK-RAIL-DELTA.",
        facts,
        violations,
    });
    console.log(`proof:dock-stack-rail — ${status.toUpperCase()}`);
    console.log(`  S1 retired: DockRail-absent=${facts.s1.dockRailAbsent} railExtend-absent=${facts.s1.railExtendCssAbsent} no-chip-css=${!facts.s1.stackCssHasChipStrip} no-measureSeam=${!facts.s1.glassDockHasMeasureSeam} no-seam-write=${!facts.s1.glassDockWritesSeamOffset} imports-stack-rail=${facts.s1.importsStackRail}`);
    console.log(`  S2 stack-once: exists=${facts.s2.dockStackExists} frame-no-clip(contain/backdrop/overflow)=${facts.s2.frameContains}/${facts.s2.frameBackdrop}/${facts.s2.frameOverflow} rail-slot=${facts.s2.railSlotPresent}`);
    console.log(`  S3 compositor: animates-layout=${facts.s3.animatesLayoutAxis} spring-dock=${facts.s3.usesSpringDock} staggered=${facts.s3.staggered} prm=${facts.s3.prmCarved}`);
    console.log(`  S4 stack: visibleCount=${facts.s4.visibleCountDefault} fading-scroll=${facts.s4.usesFadingScroll} member-floating=${facts.s4.memberReadsFloating}`);
    console.log(`  S5 topology: demo-gutter=${facts.s5.demoGutterSeat} slot-at-edge=${facts.s5.slotSeatsAtEdge}`);
    console.log(`  S6 consumers=${facts.s6.consumerCount} selected-is-model=${facts.s6.selectedIsModel} no-shadow=${!facts.s6.hasSelectionShadow}`);
    console.log(`  born-RED: reconstructed=${facts.bornRed.reconstructed} dockRail@head=${facts.bornRed.dockRailAtHead}`);
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

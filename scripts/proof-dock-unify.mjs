#!/usr/bin/env node
// AX.W61 — the dock-unify-root gate (proof:dock-unify).
//
// The born-RED -> GREEN device-free SOURCE/STRUCTURE arm for the unified dock
// nav-pattern contract + the Q1 collapsed-floor scale-thread + the glass-first
// selected-control re-point. The CSS string / SFC composition / CLAUDE.md record
// is the artefact (NOT a grep-for-runtime-behaviour); the PAINTED truth (the
// tight collapsed pill measurably smaller than expanded, the selected control
// reading glass, the docks reading as ONE bar) is proven by the W00 pi live arm
// captured in docs/tranches/AX/audit/W61-DELTA.md — this gate is the no-device
// CI half.
//
// Five falsifiable witnesses (each born-RED at HEAD pre-wave, driven GREEN by the
// wave):
//
//   F1 — the collapsed-floor tokens are MINTED, --dock-scale-threaded, and BELOW
//        their expanded counterparts (the Q1 tight pill). RED at HEAD: both
//        tokens undefined (the pill falls to full-control width + expanded pad);
//        at W45-TUNE the pad was minted but as a flat 0.25rem literal OFF the
//        --dock-scale thread (so the collapsed pad alone stays desktop-sized at
//        the 1.5x mobile scale). W61 threads it.
//   F2 — the collapsed summary carries a SYMMETRIC size contract (min-block-size,
//        not min-width alone). RED at HEAD: a width-only stub.
//   F3 — the glass-first SELECTED control: --dock-control-active-bg is a --glass-bg-*
//        register (NOT var(--surface-tint-N)) AND active != hover (the DK2
//        ladder-step). RED at HEAD: active = surface-tint-12, a flat ink wash.
//   F4 — the unified nav-pattern census: every W61-owned showcase dock composes a
//        <GlassDock> root with <DockSeparator> dividers and ZERO raw-class
//        separators; the nav-rail docks carry a home-left #persistent anchor. RED
//        at HEAD: the showcase rail diverges (raw active class, no #persistent).
//        The shell-dock rows (BottomDock/SidebarDock) are the contract W40
//        satisfies — tracked as pendingW40 facts, NOT gate-failing here (the gate
//        asserts the law; W40's rebuild flips the pending rows GREEN).
//   F5 — the contract is recorded canon: CLAUDE.md records the dock nav-pattern
//        contract (home-left #persistent + nav + <DockSeparator>, ONE GlassDock
//        root) + the collapsed-floor tokens + the glass-first selected register.
//        RED at HEAD: grep CLAUDE.md -> none.
//
// House style mirrors proof-dock-perfection.mjs: ESM .mjs, comment-strip first
// (false-witness discipline), a pure exported detector, a byte-stable JSON
// artefact via gate-output, a human summary, process.exit(1) on any violation.

import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { gateArtifactPath, snapshotStamp, writeGateArtifact } from "./gate-output.mjs";
import { readDockCss } from "./read-dock-css.mjs";

// The W61-owned docks the gate asserts STRICTLY (must be GREEN at this wave's
// close). dock.vue + rail.vue are nav-pattern rails -> require a home-left
// #persistent anchor; dock-layers.vue + dock-with-slider.vue are mechanic
// showcases (layer-group drill-in / slider contract) -> require <DockSeparator>
// dividers + zero raw-class separators, but a home anchor is not befitting (they
// demonstrate a mechanic, not a nav rail).
const SHOWCASE_DOCKS = [
    { path: "demo/stories/navigation/dock.vue", requireHome: true },
    { path: "demo/stories/navigation/rail.vue", requireHome: true },
    { path: "demo/stories/navigation/dock-layers.vue", requireHome: false },
    { path: "demo/stories/compositions/dock-with-slider.vue", requireHome: false },
];

// The shell docks W40 rebuilds onto the contract. The gate TRACKS their status
// (the census law W40 clears) but does NOT fail on them at W61 close — they are
// pendingW40 rows, flipped GREEN by W40's rebuild.
const SHELL_DOCKS = [
    { path: "demo/layout/BottomDock.vue", requireHome: true },
    { path: "demo/layout/SidebarDock.vue", requireHome: true },
];

let _cliPaths = null;
function cliPaths() {
    if (_cliPaths) return _cliPaths;
    const ROOT = resolve(fileURLToPath(new URL("../", import.meta.url)));
    _cliPaths = {
        ROOT,
        TOKENS_CSS: resolve(ROOT, "src/styles/tokens.css"),
        DOCK_CSS: resolve(ROOT, "src/styles/dock.css"),
        CLAUDE_MD: resolve(ROOT, "CLAUDE.md"),
        SHOWCASE_DOCKS: SHOWCASE_DOCKS.map((d) => ({
            ...d,
            abs: resolve(ROOT, d.path),
        })),
        SHELL_DOCKS: SHELL_DOCKS.map((d) => ({ ...d, abs: resolve(ROOT, d.path) })),
        ARTIFACT: gateArtifactPath("GLASS_UI_DOCK_UNIFY_ARTIFACT", "AX-dock-unify"),
    };
    return _cliPaths;
}

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

// Strip Vue SFC `<!-- … -->` HTML comments (a commented separator/persistent
// example must not satisfy or trip a witness).
function stripHtmlComments(text) {
    let result = "";
    let i = 0;
    while (i < text.length) {
        if (text.startsWith("<!--", i)) {
            const end = text.indexOf("-->", i + 4);
            const stop = end === -1 ? text.length : end + 3;
            result += blankRange(text, i, stop);
            i = stop;
        } else {
            result += text[i];
            i++;
        }
    }
    return result;
}

/** A `--name:` assignment at a property position (NOT a `var(--name,` consumer). */
function isDefined(css, name) {
    const re = new RegExp(`(^|[{;\\s])${name}\\s*:`, "m");
    return re.test(css);
}

/** The value of the FIRST `--name:` assignment (comment-stripped css). */
function tokenValue(css, name) {
    const m = new RegExp(`${name}\\s*:\\s*([^;]*);`).exec(css);
    return m ? m[1].replace(/\s+/g, " ").trim() : "";
}

// The raw-class separator vocabularies the nav-pattern retires (the divergent
// hand-rolled dividers — a `demo-bottom-dock__sep` span, a `bg-border/N` hairline,
// or a bare `class="… dock-separator …"` div that bypasses the <DockSeparator>
// primitive). Any of these in a dock SFC is a divergent divider.
const RAW_SEP_PATTERNS = [
    { name: "demo-bottom-dock__sep", re: /demo-[a-z-]*dock__sep/ },
    { name: "bg-border/N hairline", re: /\bbg-border\/\d/ },
    { name: "raw class=dock-separator", re: /class="[^"]*\bdock-separator\b/ },
];

function auditDock({ text, requireHome }) {
    const usesGlassDock = /<GlassDock\b/.test(text);
    const usesDockSeparator = /<DockSeparator\b/.test(text);
    const rawSeps = RAW_SEP_PATTERNS.filter((p) => p.re.test(text)).map((p) => p.name);
    // A home-left anchor = a #persistent slot (v-slot:persistent or template
    // #persistent or name="persistent").
    const hasPersistent =
        /#persistent\b/.test(text) ||
        /v-slot:persistent\b/.test(text) ||
        /name="persistent"/.test(text) ||
        /slot="persistent"/.test(text);
    const issues = [];
    if (!usesGlassDock) issues.push("no <GlassDock> root");
    if (!usesDockSeparator) issues.push("no <DockSeparator> divider");
    if (rawSeps.length > 0)
        issues.push(`raw-class separator(s): ${rawSeps.join(", ")}`);
    if (requireHome && !hasPersistent)
        issues.push("no home-left #persistent anchor");
    return {
        usesGlassDock,
        usesDockSeparator,
        rawSeps,
        hasPersistent,
        clean: issues.length === 0,
        issues,
    };
}

export function detectDockUnify(sources) {
    const { tokensCss, dockCss, claudeMd, showcaseDocks, shellDocks } = sources;
    const violations = [];

    // ── F1 — the collapsed-floor tokens MINTED + --dock-scale-threaded + BELOW ──
    const summaryMinDefined = isDefined(tokensCss, "--dock-collapsed-summary-min-size");
    const paddingDefined = isDefined(tokensCss, "--dock-collapsed-padding");
    const summaryMinVal = tokenValue(tokensCss, "--dock-collapsed-summary-min-size");
    const paddingVal = tokenValue(tokensCss, "--dock-collapsed-padding");
    if (!summaryMinDefined) {
        violations.push(
            "F1: --dock-collapsed-summary-min-size is not DEFINED in tokens.css (the collapsed pill falls to full-control width).",
        );
    }
    if (!paddingDefined) {
        violations.push(
            "F1: --dock-collapsed-padding is not DEFINED in tokens.css (the collapsed chrome holds the expanded padding).",
        );
    }
    // The summary min-size threads --dock-scale TRANSITIVELY through --dock-layer-height
    // (itself calc(* --dock-scale)); the collapsed padding must thread it DIRECTLY (it
    // has no scaled ancestor — a flat literal stays desktop-sized at the 1.5x scale).
    const summaryThreadsScale =
        /var\(--dock-layer-height/.test(summaryMinVal) || /var\(--dock-scale\)/.test(summaryMinVal);
    const paddingThreadsScale = /var\(--dock-scale\)/.test(paddingVal);
    if (!summaryThreadsScale) {
        violations.push(
            `F1: --dock-collapsed-summary-min-size ("${summaryMinVal}") does not ride the --dock-scale thread (neither directly nor via --dock-layer-height) — the collapsed pill ignores the coarse-pointer scale.`,
        );
    }
    if (!paddingThreadsScale) {
        violations.push(
            `F1: --dock-collapsed-padding ("${paddingVal}") is OFF the --dock-scale thread (a flat literal) — the collapsed pad stays desktop-sized at the 1.5x mobile scale while the rest of the pill grows (the W61 thread fix).`,
        );
    }
    // BELOW the expanded counterparts: the summary min-size is a *0.7 (or smaller)
    // fraction of --dock-layer-height; the collapsed pad's base literal is < the
    // expanded --dock-padding-block default (0.375rem).
    const summaryBelow =
        /var\(--dock-layer-height[^)]*\)\s*\*\s*0?\.\d+/.test(summaryMinVal) ||
        // an explicit sub-2.5rem diameter
        /^calc\(\s*[01]?\.\d+rem/.test(summaryMinVal);
    const padBaseMatch = /([0-9]*\.?[0-9]+)rem/.exec(paddingVal);
    const padBase = padBaseMatch ? parseFloat(padBaseMatch[1]) : NaN;
    const paddingBelow = Number.isFinite(padBase) && padBase < 0.375;
    if (!summaryBelow) {
        violations.push(
            `F1: --dock-collapsed-summary-min-size ("${summaryMinVal}") is not measurably BELOW --dock-layer-height (the collapsed pill must be smaller than the full control — the Q1 fix).`,
        );
    }
    if (!paddingBelow) {
        violations.push(
            `F1: --dock-collapsed-padding base ("${paddingVal}") is not BELOW the expanded --dock-padding-block (0.375rem) — the collapse is not a visible tighten.`,
        );
    }

    // ── F2 — the collapsed summary carries a SYMMETRIC size contract ──
    const summaryRule =
        /\.glass-dock\.collapsed\s+\.dock-layer--summary\s*\{([^}]*)\}/.exec(dockCss);
    const symmetricFloor = !!summaryRule && /min-block-size\s*:/.test(summaryRule[1]);
    if (!symmetricFloor) {
        violations.push(
            "F2: .glass-dock.collapsed .dock-layer--summary carries no min-block-size (a width-only stub, not a proportioned pill).",
        );
    }

    // ── F3 — the glass-first SELECTED control (active glass, active != hover) ──
    const activeBgVal = tokenValue(tokensCss, "--dock-control-active-bg");
    const hoverBgVal = tokenValue(tokensCss, "--dock-control-hover-bg");
    const activeIsSurfaceTint = /var\(--surface-tint-\d+\)/.test(activeBgVal);
    const activeIsGlass = /var\(--glass-bg-/.test(activeBgVal);
    if (activeIsSurfaceTint || !activeIsGlass) {
        violations.push(
            `F3: --dock-control-active-bg ("${activeBgVal}") is not a glass register; the selected/active fill must point at a --glass-bg-* tier (the keyframes-dock model), not a flat var(--surface-tint-N) ink wash.`,
        );
    }
    if (activeBgVal && hoverBgVal && activeBgVal === hoverBgVal) {
        violations.push(
            `F3: --dock-control-active-bg == --dock-control-hover-bg ("${activeBgVal}") — active is not a tier ABOVE hover (the DK2 ladder-step collapsed).`,
        );
    }

    // ── F4 — the unified nav-pattern census ──
    // A dock SFC absent from the working tree (an empty read) is NOT a violation
    // — the gate asserts the law over the docks that EXIST; a removed/renamed
    // showcase falls out of the census rather than false-REDing it.
    const showcaseAudit = showcaseDocks
        .filter((d) => (d.text ?? "").trim().length > 0)
        .map((d) => ({ path: d.path, ...auditDock(d) }));
    const absentShowcase = showcaseDocks
        .filter((d) => (d.text ?? "").trim().length === 0)
        .map((d) => d.path);
    for (const a of showcaseAudit) {
        if (!a.clean) {
            violations.push(
                `F4: ${a.path} diverges from the nav-pattern [${a.issues.join("; ")}].`,
            );
        }
    }
    // The shell docks are tracked but NOT gate-failing (the contract W40 clears).
    const shellAudit = shellDocks
        .filter((d) => (d.text ?? "").trim().length > 0)
        .map((d) => ({ path: d.path, ...auditDock(d) }));
    const pendingW40 = shellAudit
        .filter((a) => !a.clean)
        .map((a) => ({ path: a.path, issues: a.issues }));

    // ── F5 — the contract is recorded canon in CLAUDE.md ──
    const claudeHasNavPattern =
        /nav-pattern\b/i.test(claudeMd) ||
        (/home-left/i.test(claudeMd) && /<DockSeparator>/.test(claudeMd) && /#persistent/.test(claudeMd));
    const claudeHasCollapsedTokens =
        /--dock-collapsed-summary-min-size/.test(claudeMd) &&
        /--dock-collapsed-padding/.test(claudeMd);
    const claudeHasGlassSelected =
        /--dock-control-active-bg/.test(claudeMd) &&
        /glass/i.test(claudeMd);
    if (!claudeHasNavPattern) {
        violations.push(
            "F5: CLAUDE.md does not record the dock nav-pattern contract (home-left #persistent + nav + <DockSeparator>, ONE GlassDock root).",
        );
    }
    if (!claudeHasCollapsedTokens) {
        violations.push(
            "F5: CLAUDE.md does not record the collapsed-floor tokens (--dock-collapsed-summary-min-size + --dock-collapsed-padding).",
        );
    }
    if (!claudeHasGlassSelected) {
        violations.push(
            "F5: CLAUDE.md does not record the glass-first selected-control register (--dock-control-active-bg as a glass tier).",
        );
    }

    const facts = {
        f1: {
            summaryMinDefined,
            paddingDefined,
            summaryMinVal,
            paddingVal,
            summaryThreadsScale,
            paddingThreadsScale,
            summaryBelow,
            paddingBelow,
        },
        f2: { symmetricFloor },
        f3: { activeBgVal, hoverBgVal, activeIsGlass, activeNeqHover: activeBgVal !== hoverBgVal },
        f4: {
            showcase: showcaseAudit.map((a) => ({
                path: a.path,
                clean: a.clean,
                rawSeps: a.rawSeps,
                hasPersistent: a.hasPersistent,
                usesDockSeparator: a.usesDockSeparator,
            })),
            absentShowcase,
            pendingW40,
        },
        f5: {
            claudeHasNavPattern,
            claudeHasCollapsedTokens,
            claudeHasGlassSelected,
        },
    };

    return { facts, violations };
}

export function detectSource(sources) {
    return detectDockUnify({
        tokensCss: stripBlockComments(sources.tokensCss ?? ""),
        dockCss: stripBlockComments(sources.dockCss ?? ""),
        claudeMd: sources.claudeMd ?? "",
        showcaseDocks: (sources.showcaseDocks ?? []).map((d) => ({
            ...d,
            text: stripHtmlComments(d.text ?? ""),
        })),
        shellDocks: (sources.shellDocks ?? []).map((d) => ({
            ...d,
            text: stripHtmlComments(d.text ?? ""),
        })),
    });
}

function safeRead(path) {
    try {
        return readFileSync(path, "utf8");
    } catch {
        return "";
    }
}

function run() {
    const {
        ROOT,
        TOKENS_CSS,
        DOCK_CSS,
        CLAUDE_MD,
        SHOWCASE_DOCKS: showcase,
        SHELL_DOCKS: shell,
        ARTIFACT,
    } = cliPaths();

    const { facts, violations } = detectSource({
        tokensCss: readFileSync(TOKENS_CSS, "utf8"),
        dockCss: readDockCss(ROOT),
        claudeMd: safeRead(CLAUDE_MD),
        showcaseDocks: showcase.map((d) => ({
            path: d.path,
            requireHome: d.requireHome,
            text: safeRead(d.abs),
        })),
        shellDocks: shell.map((d) => ({
            path: d.path,
            requireHome: d.requireHome,
            text: safeRead(d.abs),
        })),
    });

    const status = violations.length === 0 ? "pass" : "fail";

    writeGateArtifact(ARTIFACT, {
        generatedAt: snapshotStamp(),
        status,
        severity: "blocker",
        command: "npm run proof:dock-unify",
        facts,
        violations,
    });

    console.log(
        "proof:dock-unify — the unified dock nav-pattern contract + the Q1 collapsed-floor scale-thread + the glass-first selected control (AX.W61)",
    );
    console.log(
        `  F1 collapsed-floor minted + scaled + below : ${
            facts.f1.summaryThreadsScale &&
            facts.f1.paddingThreadsScale &&
            facts.f1.summaryBelow &&
            facts.f1.paddingBelow
                ? "YES"
                : "NO"
        }  (pad=${facts.f1.paddingVal})`,
    );
    console.log(
        `  F2 symmetric collapsed-summary floor       : ${facts.f2.symmetricFloor ? "YES" : "NO"}`,
    );
    console.log(
        `  F3 glass-first active (!= hover)           : ${
            facts.f3.activeIsGlass && facts.f3.activeNeqHover ? "YES" : "NO"
        }  (${facts.f3.activeBgVal})`,
    );
    console.log(
        `  F4 showcase docks unified                  : ${
            facts.f4.showcase.every((s) => s.clean) ? "YES" : "NO"
        }  (${facts.f4.showcase.filter((s) => s.clean).length}/${facts.f4.showcase.length})`,
    );
    console.log(
        `  F4 shell docks pending W40 (tracked, not failing) : ${facts.f4.pendingW40.length}`,
    );
    console.log(
        `  F5 CLAUDE.md records the contract          : ${
            facts.f5.claudeHasNavPattern &&
            facts.f5.claudeHasCollapsedTokens &&
            facts.f5.claudeHasGlassSelected
                ? "YES"
                : "NO"
        }`,
    );

    if (violations.length > 0) {
        console.log("\nVIOLATIONS:");
        for (const v of violations) console.log(`  x ${v}`);
    }
    console.log(
        `\n  status: ${status.toUpperCase()}   artefact: ${ARTIFACT.slice(ROOT.length + 1)}`,
    );
    process.exit(status === "pass" ? 0 : 1);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
    run();
}

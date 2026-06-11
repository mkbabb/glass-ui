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
//   F4 — the unified nav-pattern census: every showcase dock composes a
//        <GlassDock> root with <DockSeparator> dividers and ZERO raw-class
//        separators; the nav-rail docks carry a home-left #persistent anchor. RED
//        at HEAD: the showcase rail diverges (raw active class, no #persistent).
//        AZ.W-DOCK-NORMALIZE extends F4 with the FULL C3 census matrix:
//          (a) the SHELL_DOCKS (BottomDock/SidebarDock) are PROMOTED from
//              pendingW40 to STRICT — at AZ HEAD they already carry the contract
//              (the post-taxonomy #persistent home-left), so the gate asserts them
//              strictly. A shell dock that diverges is now a VIOLATION (was a
//              tracked-not-failing pending row at W61). The pendingW40 channel is
//              retained ONLY for a shell dock that genuinely fails at HEAD (a named
//              successor row, never a silent pending).
//          (b) a NEW FEATURE_EXEMPT_DOCKS declared list (each path + the facility
//              it demonstrates) is RECORDED as a POSITIVE contract ("these teaching
//              docks must NOT carry a home"). RED at HEAD pre-AZ: no feature-exempt
//              declaration existed (the gate only audited the showcase/shell lists).
//          (c) the W5 census-CLOSURE: the gate ENUMERATES every demo
//              <GlassDock>-bearing SFC (a glob over demo/**/*.vue, HTML-comment-
//              stripped) and asserts each appears on EXACTLY ONE census list
//              (SHOWCASE / SHELL / FEATURE_EXEMPT) — zero unaccounted dock file.
//              Without it the three hardcoded lists are a SNAPSHOT; the closure makes
//              them a CLOSURE (a new off-list nav dock cannot smuggle in unaudited).
//              RED at HEAD pre-AZ: no enumeration/closure existed.
//        The human-readable matrix the gate mirrors is
//        docs/tranches/AZ/audit/W-DOCK-NORMALIZE-census.md.
//   F5 — the contract is recorded canon: CLAUDE.md records the dock nav-pattern
//        contract (home-left #persistent + nav + <DockSeparator>, ONE GlassDock
//        root) + the collapsed-floor tokens + the glass-first selected register.
//        RED at HEAD: grep CLAUDE.md -> none.
//
// House style mirrors proof-dock-perfection.mjs: ESM .mjs, comment-strip first
// (false-witness discipline), a pure exported detector, a byte-stable JSON
// artefact via gate-output, a human summary, process.exit(1) on any violation.

import { readFileSync, readdirSync, statSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { gateArtifactPath, snapshotStamp, writeGateArtifact } from "./gate-output.mjs";
import { readDockCss } from "./read-dock-css.mjs";
// AY.W-CSS1: tokens.css is a thin @import root over tokens/*.css partials; the token
// DEFINITIONS live in the partials, so read the concatenated monolith, not the root.
import { readMonolith } from "./read-css-monoliths.mjs";

// The W61-owned docks the gate asserts STRICTLY (must be GREEN at this wave's
// close). dock.vue + rail.vue are nav-pattern rails -> require a home-left
// #persistent anchor; dock-layers.vue + dock-with-slider.vue are mechanic
// showcases (layer-group drill-in / slider contract) -> require <DockSeparator>
// dividers + zero raw-class separators, but a home anchor is not befitting (they
// demonstrate a mechanic, not a nav rail).
// The W18 IA reinvention lifted the dock showcases into a first-class `dock`
// category: navigation/dock -> dock/overview, navigation/rail -> dock/rail,
// navigation/dock-layers -> dock/layers (the dock-with-slider composite folded
// into dock/overview's "Slider in dock" section).
const SHOWCASE_DOCKS = [
    { path: "demo/stories/dock/overview.vue", requireHome: true },
    { path: "demo/stories/dock/rail.vue", requireHome: true },
    { path: "demo/stories/dock/layers.vue", requireHome: false },
];

// The shell docks. At W61 they were tracked as pendingW40 rows (the W40 rebuild
// was the named successor). AZ.W-DOCK-NORMALIZE PROMOTES them to STRICT: at AZ HEAD
// both already carry the contract (the post-taxonomy #persistent home-left + the
// <DockSeparator>-grouped nav), so the gate asserts them strictly. A shell dock that
// diverges at HEAD is a VIOLATION; the pendingW40 channel is retained only for a
// shell dock that genuinely still fails (a named-successor record, not a silent pass).
const SHELL_DOCKS = [
    { path: "demo/layout/BottomDock.vue", requireHome: true },
    { path: "demo/layout/SidebarDock.vue", requireHome: true },
];

// AZ.W-DOCK-NORMALIZE — the FEATURE-EXEMPT positive contract. These docks
// demonstrate a SPECIFIC dock facility (a sizing host, a container-query host) — NOT
// navigation; forcing a home control onto them would pollute the teaching surface
// (the C3-NORMALIZATION-SCOPE verdict). The gate RECORDS this list in its artefact as
// an asserted "exempt by design" fact (the positive half of the contract — these must
// NOT carry a home), and the W5 closure forces every new feature dock onto it with a
// rationale. The `facility` string is the recorded reason the dock is nav-exempt.
const FEATURE_EXEMPT_DOCKS = [
    {
        path: "demo/stories/display/dark-mode-toggle.vue",
        facility:
            "the `dock` size rung — a sizing host that resolves DarkModeToggle size=\"dock\" only inside a real <GlassDock>, rendered across density rungs by v-for",
    },
    {
        path: "demo/stories/display/metric-pill.vue",
        facility:
            "the containerName container-query host — the dock is the container-type SUBJECT for a MetricPill cluster, not a nav bar",
    },
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
        DEMO_DIR: resolve(ROOT, "demo"),
        CENSUS_DOC: resolve(
            ROOT,
            "docs/tranches/AZ/audit/W-DOCK-NORMALIZE-census.md",
        ),
        SHOWCASE_DOCKS: SHOWCASE_DOCKS.map((d) => ({
            ...d,
            abs: resolve(ROOT, d.path),
        })),
        SHELL_DOCKS: SHELL_DOCKS.map((d) => ({ ...d, abs: resolve(ROOT, d.path) })),
        FEATURE_EXEMPT_DOCKS: FEATURE_EXEMPT_DOCKS.map((d) => ({
            ...d,
            abs: resolve(ROOT, d.path),
        })),
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

// AZ.W-DOCK-NORMALIZE W5 census-closure — recursively collect every repo-relative
// demo .vue path that bears a real <GlassDock> tag (HTML-comment-stripped, so a
// `<GlassDock>` mentioned in a CODE COMMENT does not count as a dock-bearing file —
// e.g. dark-mode-toggle.vue:4 is a comment, :49 is the real tag). PURE given fs +
// root; the walk mirrors proof-demo-dock-nav.mjs collectSources.
export function collectDockBearingFiles(demoDir, root, fs) {
    const files = [];
    const walk = (d) => {
        for (const entry of fs.readdirSync(d)) {
            const full = resolve(d, entry);
            const st = fs.statSync(full);
            if (st.isDirectory()) walk(full);
            else if (entry.endsWith(".vue")) {
                const stripped = stripHtmlComments(fs.readFileSync(full, "utf8"));
                if (/<GlassDock\b/.test(stripped)) {
                    files.push(full.slice(root.length + 1));
                }
            }
        }
    };
    walk(demoDir);
    return files.sort();
}

export function detectDockUnify(sources) {
    const {
        tokensCss,
        dockCss,
        claudeMd,
        showcaseDocks,
        shellDocks,
        featureExemptDocks = [],
        dockBearingFiles = null,
        censusDoc = "",
    } = sources;
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
    // AZ.W-DOCK-NORMALIZE — the SHELL docks are PROMOTED to STRICT. At AZ HEAD both
    // carry the contract; a divergent shell dock is now a VIOLATION (was a
    // tracked-not-failing pendingW40 row at W61). A shell dock that genuinely still
    // fails at HEAD is recorded as a named-successor pending row (NOT a silent pass) —
    // but it ALSO violates, so the gate goes RED until a successor wave clears it (no
    // silent pending tolerated post-promotion).
    const shellAudit = shellDocks
        .filter((d) => (d.text ?? "").trim().length > 0)
        .map((d) => ({ path: d.path, ...auditDock(d) }));
    for (const a of shellAudit) {
        if (!a.clean) {
            violations.push(
                `F4: ${a.path} (SHELL, promoted to strict) diverges from the nav-pattern [${a.issues.join("; ")}] — record a named successor wave; the row no longer sits silently pendingW40.`,
            );
        }
    }
    // Retained channel: a shell dock that fails AND has a named successor. Empty at
    // AZ HEAD (both shell docks are clean) — present so a future un-compliant shell
    // dock is recorded with its successor, never silently passed.
    const pendingW40 = shellAudit
        .filter((a) => !a.clean)
        .map((a) => ({ path: a.path, issues: a.issues, successor: "W40-class rebuild (W-SHELL-CONFIG / W-DOCK-CONTEXT own shell edits)" }));

    // AZ.W-DOCK-NORMALIZE (b) — the FEATURE-EXEMPT positive contract. The declared
    // exempt docks are RECORDED as asserted facts (the positive "these teaching docks
    // must NOT carry a home" half). We also assert each exempt path EXISTS (a stale
    // exempt entry pointing at a deleted file is a census drift) AND, defensively,
    // that an exempt dock does NOT carry a #persistent home anchor (the positive
    // contract bites if a future edit pollutes a teaching dock with a home).
    const featureExemptAudit = featureExemptDocks.map((d) => {
        const present = (d.text ?? "").trim().length > 0;
        const audit = present ? auditDock({ text: d.text, requireHome: false }) : null;
        const carriesHome = !!audit && audit.hasPersistent;
        return { path: d.path, facility: d.facility, present, carriesHome };
    });
    for (const e of featureExemptAudit) {
        if (!e.present) {
            violations.push(
                `F4: FEATURE_EXEMPT dock ${e.path} does not exist (a stale exempt declaration — re-ground the census).`,
            );
        }
        if (e.carriesHome) {
            violations.push(
                `F4: FEATURE_EXEMPT dock ${e.path} carries a #persistent home anchor — a teaching dock must NOT carry a home (the C3-NORMALIZATION-SCOPE positive contract). Either it is a nav dock (move it to a nav-strict list) or the home is pollution (remove it).`,
            );
        }
    }

    // AZ.W-DOCK-NORMALIZE (c) — the W5 census CLOSURE. Every enumerated demo
    // <GlassDock>-bearing SFC must appear on EXACTLY ONE census list. An UNACCOUNTED
    // file (on no list) is the anti-gameability RED — a future agent cannot smuggle an
    // un-normalized nav dock into a new off-list story file. A DOUBLE-listed file
    // (on >1 list) is a census-authoring error.
    const censusListByPath = new Map();
    const addToList = (paths, list) => {
        for (const p of paths) {
            const prior = censusListByPath.get(p);
            censusListByPath.set(p, prior ? [...prior, list] : [list]);
        }
    };
    addToList(showcaseDocks.map((d) => d.path), "SHOWCASE");
    addToList(shellDocks.map((d) => d.path), "SHELL");
    addToList(featureExemptDocks.map((d) => d.path), "FEATURE_EXEMPT");
    let closure = null;
    if (dockBearingFiles) {
        const enumerated = new Set(dockBearingFiles);
        const unaccounted = [];
        const doubleListed = [];
        for (const f of dockBearingFiles) {
            const lists = censusListByPath.get(f);
            if (!lists) unaccounted.push(f);
            else if (lists.length > 1) doubleListed.push(`${f} (${lists.join(" + ")})`);
        }
        // A declared list path that is NOT in the enumeration (deleted/renamed dock
        // file still on a list) — a stale list entry.
        const staleListEntries = [...censusListByPath.keys()].filter(
            (p) => !enumerated.has(p),
        );
        for (const f of unaccounted) {
            violations.push(
                `F4-closure: ${f} bears a <GlassDock> but is on NO census list (SHOWCASE/SHELL/FEATURE_EXEMPT) — every dock-bearing demo SFC must be accounted for (nav → audited strict; feature → declared exempt with a rationale). This is the anti-gameability floor for the otherwise-open hardcoded lists.`,
            );
        }
        for (const f of doubleListed) {
            violations.push(
                `F4-closure: ${f} appears on MORE THAN ONE census list — each dock-bearing SFC must be on exactly one list.`,
            );
        }
        for (const p of staleListEntries) {
            violations.push(
                `F4-closure: census list path ${p} no longer bears a <GlassDock> (deleted/renamed since the census was authored) — re-ground the list.`,
            );
        }
        closure = {
            enumeratedCount: dockBearingFiles.length,
            enumerated: dockBearingFiles,
            unaccounted,
            doubleListed,
            staleListEntries,
            accountedFor:
                unaccounted.length === 0 &&
                doubleListed.length === 0 &&
                staleListEntries.length === 0,
        };
    }

    // AZ.W-DOCK-NORMALIZE — the census doc artefact must EXIST + carry the matrix
    // (path + nav|feature + home-status + verdict columns) the gate mirrors.
    const censusDocPresent = (censusDoc ?? "").trim().length > 0;
    const censusDocHasMatrix =
        censusDocPresent &&
        /home-status/i.test(censusDoc) &&
        /verdict/i.test(censusDoc) &&
        /FEATURE_EXEMPT/i.test(censusDoc) &&
        /closure/i.test(censusDoc);
    if (!censusDocPresent) {
        violations.push(
            "F4-doc: docs/tranches/AZ/audit/W-DOCK-NORMALIZE-census.md is missing — the human-readable census matrix the gate mirrors.",
        );
    } else if (!censusDocHasMatrix) {
        violations.push(
            "F4-doc: the census doc is present but lacks the matrix columns (home-status, verdict), the FEATURE_EXEMPT record, or the W5 closure section — it must mirror the gate facts.",
        );
    }

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
            // AZ.W-DOCK-NORMALIZE — the SHELL docks now audited strict.
            shell: shellAudit.map((a) => ({
                path: a.path,
                clean: a.clean,
                rawSeps: a.rawSeps,
                hasPersistent: a.hasPersistent,
                usesDockSeparator: a.usesDockSeparator,
            })),
            shellStrict: true,
            pendingW40,
            // (b) the FEATURE-EXEMPT positive contract, recorded.
            featureExempt: featureExemptAudit,
            // (c) the W5 census closure.
            closure,
            censusDoc: { present: censusDocPresent, hasMatrix: censusDocHasMatrix },
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
        featureExemptDocks: (sources.featureExemptDocks ?? []).map((d) => ({
            ...d,
            text: stripHtmlComments(d.text ?? ""),
        })),
        dockBearingFiles: sources.dockBearingFiles ?? null,
        censusDoc: sources.censusDoc ?? "",
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
        DEMO_DIR,
        CENSUS_DOC,
        SHOWCASE_DOCKS: showcase,
        SHELL_DOCKS: shell,
        FEATURE_EXEMPT_DOCKS: featureExempt,
        ARTIFACT,
    } = cliPaths();

    const fs = { readdirSync, statSync, readFileSync };
    const dockBearingFiles = collectDockBearingFiles(DEMO_DIR, ROOT, fs);

    const { facts, violations } = detectSource({
        tokensCss: readMonolith(ROOT, "tokens"),
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
        featureExemptDocks: featureExempt.map((d) => ({
            path: d.path,
            facility: d.facility,
            text: safeRead(d.abs),
        })),
        dockBearingFiles,
        censusDoc: safeRead(CENSUS_DOC),
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
        `  F4 shell docks STRICT (promoted)           : ${
            facts.f4.shell.every((s) => s.clean) ? "YES" : "NO"
        }  (${facts.f4.shell.filter((s) => s.clean).length}/${facts.f4.shell.length}; pendingW40=${facts.f4.pendingW40.length})`,
    );
    console.log(
        `  F4 feature-exempt docks recorded           : ${facts.f4.featureExempt.length}  (${facts.f4.featureExempt
            .map((e) => e.path.split("/").pop())
            .join(", ")})`,
    );
    console.log(
        `  F4 W5 census closure (all accounted)       : ${
            facts.f4.closure?.accountedFor ? "YES" : "NO"
        }  (${facts.f4.closure?.enumeratedCount ?? "?"} dock-bearing SFCs; unaccounted=${
            facts.f4.closure?.unaccounted.length ?? "?"
        })`,
    );
    console.log(
        `  F4 census doc artefact                     : ${
            facts.f4.censusDoc.present && facts.f4.censusDoc.hasMatrix ? "YES" : "NO"
        }`,
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

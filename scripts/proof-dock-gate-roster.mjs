#!/usr/bin/env node
// proof:dock-gate-roster — BI.W-DOCK-GATE-CULL — the dock META-ROSTER gate (FAM-11 cure).
//
// The dock gate fleet accreted to 46 `proof-dock-*.mjs` scripts + the 2,356-line
// `proof-dock.mjs` monolith across three tranches of per-mechanism greens that never
// held the gestalt (FAM-3). The stale-gate-green disease (FAM-11): each wave re-ran only
// its OWN family gate while later waves regressed earlier greens, so no single close set
// ever verified the whole dock band at once.
//
// The greenfield (BI B3 dock rebuild on the three-z-layer clip-path plate SPINE) retires
// ~37 of those mechanisms (fission, siri, orientation-morph, the scalar zoo, the
// rail-projection variants, the clip-era shell), so the ~44 gates locking them cannot
// survive their subject's retirement. This wave DELETES the accreted set and establishes
// the ONE dock close set: the EXACTLY-10 survivor roster (the a11y contract + the 7
// greenfield mechanism gates + the FOLD migration guard + THIS meta-gate).
//
// This gate is the FAM-11 lock: the dock gate SCRIPT set is EXACTLY the enumerated roster
// (a new unenrolled `proof-dock-*.mjs` REDs; a deleted roster member REDs), the monolith
// is DEFINITION-ABSENT, and the manifest wires the roster as the ONE dock close set with
// close tags (so `gates.mjs --run full` runs the whole roster siblings-absent — never a
// per-family re-run).
//
// PURE device-free static scan (a `scripts/` readdir + a `gates.manifest.mjs` import + a
// `package.json` read; no browser, no GPU). Tags ["local","ci","release"].
//
// CLAUSES:
//   GC1 roster-is-exactly-N (FILE SET, BORN-RED) — the `scripts/proof-dock*.mjs` universe
//       (excluding the monolith `proof-dock.mjs`, owned by GC3) == the 10-file ROSTER.
//       An EXTRA (unenrolled) script OR a MISSING roster member REDs. GREEN once the ~44
//       accreted scripts are deleted.
//   GC2 no-orphan-gate — every RETIRED-mechanism gate on the blocklist is DEFINITION-ABSENT
//       (each names the mechanism it locked). A surviving fission/morph/rail-projection
//       gate REDs. (The complement of GC1's "extra file" check, framed per retired mechanism.)
//   GC3 proof-dock-mjs-shrunk (BORN-RED) — the `proof-dock.mjs` monolith is DEFINITION-ABSENT
//       OR shrunk to <=300L (a11y + clip + single-engine). Deleted here (clauses redistributed:
//       a11y -> proof-dock-a11y, clip -> proof-dock-spine, single-engine -> proof-dock-single-engine,
//       morph-era clauses -> proof-dock-retire-terminal).
//   GC4 close-runs-full-roster — the manifest wires the roster as the ONE dock close set:
//       every ROSTER script gate has a manifest row carrying the close tags (local+ci+release)
//       so `--run full` runs it, and NO accreted dock-script row survives. Reads GATES +
//       package.json. (Registrar-gated: RED until the reported manifest+package.json deltas
//       land — the builder authors the born-RED gate SCRIPT, the registrar wires the rows.)
//
// Self-test bites (each planted drift MUST flag; a clean roster must NOT):
//   - a synthetic unenrolled `proof-dock-foo.mjs` REDs GC1;
//   - a synthetic missing roster member REDs GC1;
//   - a synthetic surviving `proof-dock-fission.mjs` REDs GC2;
//   - a synthetic present 2356L monolith REDs GC3;
//   - a synthetic surviving accreted manifest row REDs GC4;
//   - a synthetic roster row lacking a close tag REDs GC4;
//   - the clean roster fixture flags NOTHING (the no-false-positive fence).
//
// Run: node scripts/proof-dock-gate-roster.mjs

import { readdirSync, existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { gateArtifactPath, snapshotStamp, writeGateArtifact } from "./gate-output.mjs";

const HERE = fileURLToPath(import.meta.url);
const SCRIPTS_DIR = resolve(HERE, "..");
const ROOT = resolve(SCRIPTS_DIR, "..");
const ARTIFACT = gateArtifactPath("GLASS_UI_DOCK_GATE_ROSTER_ARTIFACT", "dock-gate-roster");
const MONOLITH = "proof-dock.mjs";
const MONOLITH_MAX_LINES = 300;

// ── The EXACTLY-10 greenfield dock-gate roster (the ONE dock close set — FAM-11). ──
// Each survivor traces to a LIVE greenfield mechanism (authoring wave in the comment).
const ROSTER = [
    "proof-dock-a11y.mjs", // the a11y contract: presentational root, roving tabindex, 44px cells, inert, keepOpen
    "proof-dock-spine.mjs", // W-DOCK-SPINE — clip-by-construction + one-plate-scalar + transform-free centering
    "proof-dock-controls.mjs", // W-DOCK-CONTROLS — one-selection-engine + one-indicator-writer + face-token + 44px cell
    "proof-dock-escape.mjs", // W-DOCK-ESCAPE — top-layer popover fan + single-placement-path + SAF-1 fence
    "proof-dock-crossfade.mjs", // W-DOCK-CROSSFADE — one-crossfade-slot + no-VT + thin-core + peak-reserve + G12
    "proof-dock-overflow.mjs", // W-DOCK-OVERFLOW — scroll-into-view + native-scroll + fisheye-iff-fits + indicator-is-scroll-child
    "proof-dock-single-engine.mjs", // W-DOCK-SPRING-UNIFY — one-spring-engine + scalar-zoo-absent + G8-retune
    "proof-dock-retire-terminal.mjs", // W-DOCK-RETIRES — fission/siri/orientation-goo/band-aids absent + decided-terminal register
    "proof-dock-fold.mjs", // W-DOCK-FOLD — the consumer-migration guard (KEPT through the 5.0.0 cut)
    "proof-dock-gate-roster.mjs", // THIS meta-roster gate
];

// ── The retired-mechanism gate blocklist — each names the mechanism it locked. ──
// (44 accreted gate scripts; all DEFINITION-ABSENT at close. Enumerated for the census
// machine-check + the GC2 born-RED signal.)
const RETIRED_GATES = {
    "proof-dock-fission.mjs": "the goo filter:url()×backdrop-filter fission island (UF-C3 Safari cause; RETIRES R1)",
    "proof-dock-morph-family.mjs": "the compositor-transform box-size morph family (SPINE clip-path plate replaces it)",
    "proof-dock-morph-insitu.mjs": "the in-situ shell V↔H morph + layering (CROSSFADE replaces the V↔H swap)",
    "proof-dock-no-scale-pop.mjs": "the collapse-onset scale-pop + hysteresis band-aid (RETIRES R4; SPINE stationary hit frame)",
    "proof-dock-rail-hairline.mjs": "the hairline switcher-rail register (ESCAPE top-layer facet fan replaces it)",
    "proof-dock-rail-realize.mjs": "the DockStack facet-carousel rail-as-hairline (ESCAPE popover fan replaces it)",
    "proof-dock-rail-reinvent.mjs": "the inverted rail topology + φ-overhang (ESCAPE popover fan replaces it)",
    "proof-dock-stack-rail.mjs": "the macOS hover-expand stack rail via .glass-dock-frame escape (ESCAPE replaces it)",
    "proof-dock-orchestrator-single.mjs": "the single dock-morph orchestrator (SPRING-UNIFY one-spring-engine subsumes it)",
    "proof-dock-engine.mjs": "the dock morph engine family (SPINE plate + SPRING-UNIFY replace it)",
    "proof-dock-engine-unify.mjs": "the engine-unify reconcile (SPRING-UNIFY SU1 one-spring-engine subsumes it)",
    "proof-dock-opacity-lockstep.mjs": "the fade-opacity SAME-TOKEN lockstep (crossfade slot replaces the two-pane fade)",
    "proof-dock-lockstep-bornred.mjs": "the born-RED lockstep unit for the retired animation-live lead/lag gate",
    "proof-dock-items-lag-capture.mjs": "the box-vs-child lead/lag live capture (morph-era; SPINE Layout-flat plate)",
    "proof-dock-plate-clearance.mjs": "the control-plate safe-inset clearance (CONTROLS folds safe-inset into the face token)",
    "proof-dock-shrink-blur.mjs": "the collapse shrink-blur register (SPINE clip-path plate, no shrink-blur)",
    "proof-dock-clip-reveal.mjs": "the content-rigid clip-path reveal aperture (SPINE clip-by-construction subsumes it)",
    "proof-dock-cockpit.mjs": "the [data-preset=cockpit] geometry preset gate (CONTROLS owns density/label-ratio)",
    "proof-dock-collapsed-both.mjs": "the vertical+bottom collapsed-state demo gate (SPINE plate morph both orientations)",
    "proof-dock-vertical-clickable.mjs": "the vertical-dock-clickable fix (SPINE reserved-footprint passthrough subsumes it)",
    "proof-dock-region-model.mjs": "the three-region morph + proportion parity (SPINE/CONTROLS replace the region model)",
    "proof-dock-sections.mjs": "the declarative tripartite <DockSection> chassis gate (CONTROLS/FOLD fold it)",
    "proof-dock-taxonomy.mjs": "the orientation-only dock taxonomy gate (SPINE prop-shaped orientation subsumes it)",
    "proof-dock-decompose.mjs": "the dock decompose census (SPINE/CONTROLS/FOLD supersede the decomposition)",
    "proof-dock-persistent-cut.mjs": "the ℱ brand-wordmark egg cut gate (retired demo-shell egg; not a greenfield invariant)",
    "proof-dock-contextual-layers.mjs": "the route→facet contextual-layers resolver gate (CROSSFADE/ESCAPE replace it)",
    "proof-dock-layering-polish.mjs": "the layering-polish register (CROSSFADE one-crossfade-slot subsumes it)",
    "proof-dock-wrap-content-driven.mjs": "the overflow=wrap content-driven reflow gate (OVERFLOW native scroll replaces it)",
    "proof-dock-vocabulary.mjs": "the <Role>Dock README role-name convention gate (FOLD collapses the role zoo)",
    "proof-dock-perfection.mjs": "the W45-TUNE hover/specular perfection gate (CONTROLS/SPINE own the greenfield register)",
    "proof-dock-unify.mjs": "the nav-pattern + NAV-vs-FEATURE census gate (CONTROLS/FOLD supersede the census)",
    "proof-dock-gallery.mjs": "the iOS-27 dock example gallery gate (retired demo gallery; RETIRES rebuild)",
    "proof-dock-search.mjs": "the dock-search facility gate (ESCAPE re-hosts useDockSearch on the L2 popover)",
    "proof-dock-tap-integrity.mjs": "the tap-integrity guard-cull gate (a11y contract owns 44px hit cells)",
    "proof-dock-arbitrary.mjs": "the arbitrary-utility precompile gate (not a greenfield dock invariant)",
    "proof-dock-big-dock.mjs": "the big-dock composition gate (SPINE plate morph subsumes it)",
    "proof-dock-consumer-fence.mjs": "the consumer-namespace-leak fence gate (SPINE L0/L1/L2 scoping subsumes it)",
    "proof-dock-css-carve.mjs": "the dock.css monolith-carve gate (SPINE mints dock.css fresh; carve moot)",
    "proof-dock-controls-split.mjs": "the dock-controls.css carve gate (CONTROLS folds the control families)",
    "proof-dock-hold-contract.mjs": "the dock keepOpen/hold contract gate (a11y contract owns keepOpen awareness)",
    "proof-dock-rail-cohesion.mjs": "the rail-cohesion register (ESCAPE popover fan replaces the rail)",
    "proof-dock-story-modularize.mjs": "the dock-story protection/cleanup gate (RETIRES rebuilds the stories)",
    "proof-dock-animation-live.mjs": "the box-vs-child lead/lag live-rAF gate (morph-era; SPINE Layout-flat plate)",
    "proof-dockmorph-cta.mjs": "the useDockCtaReceive dedicated gate (mechanism PRESERVED by FOLD F3; π folds into the roster)",
};

// The dock gate SCRIPT universe: any `proof-dock*.mjs` EXCEPT the monolith (owned by GC3).
const isDockGateScript = (f) => /^proof-dock.*\.mjs$/.test(f) && f !== MONOLITH;

// A pkg-script value that runs a `scripts/proof-dock*.mjs` file → the dock-script gate class.
const dockScriptOf = (pkgCmd) => {
    if (typeof pkgCmd !== "string") return null;
    const m = pkgCmd.match(/scripts\/(proof-dock[\w.-]*\.mjs)/);
    return m ? m[1] : null;
};

const CLOSE_TAGS = ["local", "ci", "release"];

// ── GC1 — the FILE-SET roster is EXACTLY the enumerated ROSTER ──
function checkGC1(files) {
    const universe = files.filter(isDockGateScript).sort();
    const rosterSet = new Set(ROSTER);
    const universeSet = new Set(universe);
    const extra = universe.filter((f) => !rosterSet.has(f)); // unenrolled survivors
    const missing = ROSTER.filter((f) => !universeSet.has(f)); // deleted roster members
    const violations = [];
    for (const f of extra)
        violations.push(`GC1 unenrolled dock gate script survives (not in the ~10 roster): ${f}`);
    for (const f of missing)
        violations.push(`GC1 roster member DEFINITION-ABSENT (must survive): ${f}`);
    return { violations, facts: { gc1UniverseCount: universe.length, gc1RosterCount: ROSTER.length, gc1Extra: extra, gc1Missing: missing } };
}

// ── GC2 — every retired-mechanism gate on the blocklist is DEFINITION-ABSENT ──
function checkGC2(files) {
    const fileSet = new Set(files);
    const survivors = Object.keys(RETIRED_GATES).filter((f) => fileSet.has(f));
    const violations = survivors.map(
        (f) => `GC2 retired-mechanism gate survives (locks: ${RETIRED_GATES[f]}): ${f}`,
    );
    return { violations, facts: { gc2BlocklistCount: Object.keys(RETIRED_GATES).length, gc2Survivors: survivors } };
}

// ── GC3 — the monolith is DEFINITION-ABSENT OR shrunk <=300L ──
function checkGC3(files, lineCountOf) {
    const present = files.includes(MONOLITH);
    const violations = [];
    let lines = null;
    if (present) {
        lines = lineCountOf(MONOLITH);
        if (lines > MONOLITH_MAX_LINES)
            violations.push(
                `GC3 ${MONOLITH} present at ${lines}L (> ${MONOLITH_MAX_LINES}L) — DELETE it (clauses redistributed) OR shrink to a11y+clip+single-engine`,
            );
    }
    return { violations, facts: { gc3MonolithPresent: present, gc3MonolithLines: lines } };
}

// ── GC4 — the manifest wires the roster as the ONE dock close set ──
function checkGC4(gates, pkgScripts) {
    const violations = [];
    // dock-script gate rows: a manifest row whose cmd's pkg script runs scripts/proof-dock*.mjs
    const rows = [];
    for (const g of gates) {
        const pkg = pkgScripts[g.cmd];
        const file = dockScriptOf(pkg);
        if (file) rows.push({ id: g.id, cmd: g.cmd, file, tags: g.tags ?? [] });
    }
    const rosterSet = new Set(ROSTER);
    const referenced = new Set(rows.map((r) => r.file));
    // (a) no accreted dock-script row survives (incl. the proof-dock.mjs monolith row)
    for (const r of rows) {
        if (!rosterSet.has(r.file))
            violations.push(`GC4 accreted dock-script manifest row survives (cmd ${r.cmd} -> ${r.file}); delete the row`);
    }
    // (b) every roster script gate is wired
    for (const f of ROSTER) {
        if (!referenced.has(f))
            violations.push(`GC4 roster script gate not wired in the manifest (register cmd -> ${f})`);
    }
    // (c) every roster row carries the close tags so --run full runs the ONE dock close set
    for (const r of rows) {
        if (!rosterSet.has(r.file)) continue;
        const missingTags = CLOSE_TAGS.filter((t) => !r.tags.includes(t));
        if (missingTags.length)
            violations.push(`GC4 roster row ${r.cmd} missing close tag(s) [${missingTags.join(",")}] — won't run in --run full`);
    }
    return {
        violations,
        facts: {
            gc4DockScriptRows: rows.length,
            gc4Accreted: rows.filter((r) => !rosterSet.has(r.file)).map((r) => r.cmd),
            gc4Wired: [...referenced].filter((f) => rosterSet.has(f)),
            gc4Unwired: ROSTER.filter((f) => !referenced.has(f)),
        },
    };
}

// ── self-test: each planted drift MUST flag; the clean fixture must NOT ──
function selfTest() {
    const errors = [];
    const must = (cond, msg) => { if (!cond) errors.push(`self-test: ${msg}`); };

    // clean fixtures
    const cleanRows = ROSTER.map((f) => ({ id: `proof:${f.replace(/\.mjs$/, "")}`, cmd: `proof:${f.replace(/^proof-/, "").replace(/\.mjs$/, "")}`, tags: [...CLOSE_TAGS] }));
    const cleanPkg = Object.fromEntries(cleanRows.map((r) => [r.cmd, `node scripts/proof-dock-${r.cmd.replace(/^proof:/, "").replace(/^dock-?/, "")}.mjs`]));
    // build a clean pkg mapping cmd -> its roster file explicitly (robust, no regex guessing)
    const cleanPkgMap = {};
    const cleanGates = [];
    for (const f of ROSTER) {
        const cmd = `proof:${f.replace(/^proof-/, "").replace(/\.mjs$/, "")}`;
        cleanPkgMap[cmd] = `node scripts/${f}`;
        cleanGates.push({ id: cmd, cmd, tags: [...CLOSE_TAGS] });
    }

    // GC1 clean must be silent
    must(checkGC1([...ROSTER]).violations.length === 0, "clean roster file-set falsely flagged GC1");
    // GC1 extra unenrolled
    must(checkGC1([...ROSTER, "proof-dock-foo.mjs"]).violations.length > 0, "an unenrolled proof-dock-foo.mjs did NOT red GC1");
    // GC1 missing member
    must(checkGC1(ROSTER.filter((f) => f !== "proof-dock-spine.mjs")).violations.length > 0, "a missing roster member did NOT red GC1");

    // GC2 clean must be silent
    must(checkGC2([...ROSTER]).violations.length === 0, "clean roster falsely flagged GC2");
    // GC2 surviving fission gate
    must(checkGC2([...ROSTER, "proof-dock-fission.mjs"]).violations.length > 0, "a surviving proof-dock-fission.mjs did NOT red GC2");

    // GC3 clean (monolith absent) must be silent
    must(checkGC3([...ROSTER], () => 0).violations.length === 0, "absent monolith falsely flagged GC3");
    // GC3 present 2356L monolith
    must(checkGC3([...ROSTER, MONOLITH], () => 2356).violations.length > 0, "a present 2356L monolith did NOT red GC3");
    // GC3 shrunk monolith (<=300) must be silent
    must(checkGC3([...ROSTER, MONOLITH], () => 280).violations.length === 0, "a shrunk <=300L monolith falsely flagged GC3");

    // GC4 clean must be silent
    must(checkGC4(cleanGates, cleanPkgMap).violations.length === 0, "clean roster manifest falsely flagged GC4");
    // GC4 surviving accreted row
    const accretedGates = [...cleanGates, { id: "proof:dock-fission", cmd: "proof:dock-fission", tags: [...CLOSE_TAGS] }];
    const accretedPkg = { ...cleanPkgMap, "proof:dock-fission": "node scripts/proof-dock-fission.mjs" };
    must(checkGC4(accretedGates, accretedPkg).violations.length > 0, "a surviving accreted manifest row did NOT red GC4");
    // GC4 roster row missing a close tag
    const untaggedGates = cleanGates.map((g) => (g.cmd === "proof:dock-spine" ? { ...g, tags: ["local", "ci"] } : g));
    must(checkGC4(untaggedGates, cleanPkgMap).violations.length > 0, "a roster row missing a close tag did NOT red GC4");

    return { ok: errors.length === 0, errors };
}

function realLineCountOf(file) {
    try {
        return readFileSync(resolve(SCRIPTS_DIR, file), "utf8").split("\n").length;
    } catch {
        return 0;
    }
}

async function loadGates() {
    try {
        const mod = await import(pathToFileURL(resolve(SCRIPTS_DIR, "gates.manifest.mjs")).href);
        return Array.isArray(mod.GATES) ? mod.GATES : null;
    } catch (e) {
        return null;
    }
}

function loadPkgScripts() {
    try {
        return JSON.parse(readFileSync(resolve(ROOT, "package.json"), "utf8")).scripts ?? {};
    } catch {
        return {};
    }
}

async function run() {
    const files = readdirSync(SCRIPTS_DIR).filter((f) => f.endsWith(".mjs"));
    const gates = await loadGates();
    const pkgScripts = loadPkgScripts();

    const gc1 = checkGC1(files);
    const gc2 = checkGC2(files);
    const gc3 = checkGC3(files, realLineCountOf);
    const gc4 = gates
        ? checkGC4(gates, pkgScripts)
        : { violations: ["GC4 could not import scripts/gates.manifest.mjs (GATES array)"], facts: {} };
    const self = selfTest();

    const violations = [
        ...gc1.violations,
        ...gc2.violations,
        ...gc3.violations,
        ...gc4.violations,
        ...self.errors,
    ];
    const facts = { ...gc1.facts, ...gc2.facts, ...gc3.facts, ...gc4.facts, selfTest: self.ok };
    const status = violations.length === 0 ? "pass" : "fail";

    writeGateArtifact(ARTIFACT, {
        generatedAt: snapshotStamp(),
        status,
        command: "npm run proof:dock-gate-roster",
        note: "BI.W-DOCK-GATE-CULL — the dock META-ROSTER gate (FAM-11 cure). The dock gate SCRIPT set is EXACTLY the 10-file roster (a11y + 7 greenfield mechanism gates + fold + this meta-gate); the 2,356L proof-dock.mjs monolith + ~44 accreted gates are DEFINITION-ABSENT; the manifest wires the roster as the ONE dock close set with close tags. GC1 roster-is-exactly-N (file set) · GC2 no-orphan-gate (retired-mechanism blocklist absent) · GC3 monolith-shrunk-or-absent · GC4 close-runs-full-roster (registrar-gated) + 7 self-test bites.",
        facts,
        violations,
    });

    const ok = (b) => (b ? "OK" : "RED");
    console.log("proof:dock-gate-roster — the dock META-ROSTER gate (BI.W-DOCK-GATE-CULL; FAM-11 stale-gate-green cure)");
    console.log(
        `  GC1 roster-is-exactly-N   : universe=${facts.gc1UniverseCount} roster=${facts.gc1RosterCount} extra=${facts.gc1Extra?.length ?? "?"} missing=${facts.gc1Missing?.length ?? "?"} ${ok(gc1.violations.length === 0)}`,
    );
    console.log(
        `  GC2 no-orphan-gate        : blocklist=${facts.gc2BlocklistCount} survivors=${facts.gc2Survivors?.length ?? "?"} ${ok(gc2.violations.length === 0)}`,
    );
    console.log(
        `  GC3 monolith-shrunk       : present=${facts.gc3MonolithPresent} lines=${facts.gc3MonolithLines ?? "-"} ${ok(gc3.violations.length === 0)}`,
    );
    console.log(
        `  GC4 close-runs-full-roster: dock-rows=${facts.gc4DockScriptRows ?? "?"} accreted=${facts.gc4Accreted?.length ?? "?"} unwired=${facts.gc4Unwired?.length ?? "?"} ${ok(gc4.violations.length === 0)} ${gc4.violations.length ? "(registrar-gated — awaits the manifest+package.json deltas)" : ""}`,
    );
    console.log(`  self-test (bite proof)    : ${ok(self.ok)}`);
    if (violations.length) {
        console.log("\nVIOLATIONS:");
        for (const v of violations) console.log(`  x ${v}`);
    }
    console.log(`\n  status: ${status.toUpperCase()}   artefact: .cache/gates/dock-gate-roster.json`);
    process.exit(status === "pass" ? 0 : 1);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
    run();
}

export { checkGC1, checkGC2, checkGC3, checkGC4, selfTest, ROSTER, RETIRED_GATES, MONOLITH };

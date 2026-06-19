#!/usr/bin/env node
// BC.W-VISUAL-RECONCILE — the cross-band visual reconcile gate (proof:visual-reconcile).
//
// The BB DISEASE this band cures: BB shipped headless-GREEN but visually-BROKEN — the
// liquid-glass band's source landed (BUILT ≈ 33/33) but the binding paint NEVER ran
// (PAINTED ≈ 0/33), every wave deferring its π/verdict to a terminal W-REFLECT3 the
// execution stop cut. This wave is the band's RE-WALK home: over the FIXED Band-1 warm-
// cream floor, every BB-paper-done glass-band primitive is re-verified live + its
// proof:ba-gestalt roster verdict flips on a fresh capture (the orchestrator owns the
// live :5199 capture on real Metal). This gate is the SOURCE arm — the device-free
// reconcile contract; the binding paint is the proof:ba-gestalt roster pixel-read +
// the --run pi per-primitive specs (the cardinal split — this gate proves the WIRING +
// the artifacts are present, NOT the pixels).
//
// FOUR SOURCE clauses, each born-RED on the pre-reconcile tree, GREEN at close:
//
//   (a) CONSOLIDATED-NAMES-WIRED. The glass-band primitives are wired to the
//       CONSOLIDATED names the BC Band-1/Band-7 fixes landed — NO stale dead-class
//       reference survives a reconcile (the §0-DRIFT class):
//         a1 — the button consumes `.glass-lens` (BC.W-GLASS-PRUNE's single refraction
//              source), NOT the dead `.glass-refract` CLASS (the AW.W23 name W-LENSING
//              renamed; the `--glass-refract` MAGNITUDE-token name is KEPT — only the
//              CLASS renamed). A live `class="glass-refract"`/`'glass-refract'` decoration
//              string REDs.
//         a2 — `useSpecularPointer` WRAPS the ONE `createSpecularWriter` core (the
//              W-LIQUIDHOVER single position-write source); the gleam reads it, NO forked
//              `--mouse-x`/`getBoundingClientRect` in the leaf.
//         a3 — the press composes the ONE SPRING_PRESETS `press` preset
//              (`springPreset("press")` in useSpringPress), NO button-local spring
//              (Button stays consumer #1 of `useSpringPress` direct-composition).
//         a4 — the Atlas A-2/A-3 seams the I5-card composes are PRESENT: the
//              `--glass-accent` accent channel (the per-instance chromatic rim seam) +
//              the `.metal-{gold,silver,bronze}` family on the SHARED `metal-shimmer-sweep`
//              engine, the `.metal-rainbow-rim` COMPOSING `--glass-accent` (binds the
//              channel, never re-authors the rim).
//         a5 — the unit-6 binding fix LANDED: TypewriterText's interactive-char hover
//              plate reads the WARM hover-bg rung (`color-mix(in srgb, var(--foreground)
//              N%, transparent)`), NOT the literal mid-NEUTRAL `rgba(128,128,128,…)` gray
//              (the merged A7 finding; NON-isomorphic gray→warm, the BA.W-NO-GRAY floor).
//
//   (b) ROSTER-ENROLLS. The bc-gestalt-roster (BC.W-GESTALT-FIRST owns the file; this
//       wave is a CONSUMER) ENROLLS every glass-band PAINT surface this wave re-walks
//       (the materialize / lens+gleam / press / scroll-shrink / metal+accent / marks
//       surfaces map onto the canonical roster surface names). A re-walked PAINT surface
//       the roster omits REDs (the BB roster-never-grew gap, the band slice).
//
//   (c) DELTA-PRESENT. This wave's OWN band-re-walk DELTA
//       (W-VISUAL-RECONCILE-DELTA.md) is present + carries a re-walk-unit row per unit
//       (materialize · lens+gleam · press ABSORB · scroll-shrink CLS · metal+glass-accent ·
//       HandMark marks), each tied to its roster verdict + a citable capture. Clause (c)
//       asserts ONLY what THIS wave produces — it does NOT re-assert the /display/buttons
//       interaction verdict (BC.W-BUTTON-GLASS-IOS's BG-IOS-5) NOR the I5 selection-card's
//       whole-card gestalt (BC.W-SELECTION-CARD's) — the registry single-owner rule + the
//       "Card is the only new component" fence (PM-SYNTHESIS req #10).
//
//   (d) NO-TERMINAL-REFLECT (the BC.W-GESTALT-FIRST G8 discipline). This wave's own spec
//       + DELTA carry ZERO un-quoted/un-RETIRE "rides W-REFLECT\d" deferral — this wave
//       IS the re-walk the terminal wave used to defer; the verdicts flip HERE.
//
// + a self-test bite per clause (the RED-witness inverse, proven every run): a synthetic
//   dead `.glass-refract` class reference REDs a1; a roster missing a re-walked PAINT
//   surface REDs (b); a missing re-walk-unit DELTA row REDs (c); a "rides W-REFLECT3"
//   phrase REDs (d); a synthetic clause re-asserting the I5-card's whole gestalt REDs
//   (the cannot-green-off-another-wave's-work fence).

import { existsSync, readFileSync } from "node:fs";
import { resolve, relative } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { gateArtifactPath, snapshotStamp, writeGateArtifact } from "./gate-output.mjs";

const ROOT = resolve(fileURLToPath(new URL("../", import.meta.url)));
const COMMAND = "npm run proof:visual-reconcile";

const ROSTER = "docs/tranches/BC/audit/reflect/bc-gestalt-roster.md";
const DELTA = "docs/tranches/BC/audit/visual/W-VISUAL-RECONCILE-DELTA.md";
const SPEC = "docs/tranches/BC/waves/BC.W-VISUAL-RECONCILE.md";

function read(rel) {
    const p = resolve(ROOT, rel);
    return existsSync(p) ? readFileSync(p, "utf8") : "";
}
function stripCss(src) {
    return src.replace(/\/\*[\s\S]*?\*\//g, "");
}
// Strip BOTH block + line comments; the URL-safe `//`-strip leaves `://` untouched.
function stripAllComments(src) {
    return src
        .replace(/\/\*[\s\S]*?\*\//g, "")
        .replace(/<!--[\s\S]*?-->/g, "")
        .replace(/(^|[^:'"`])\/\/[^\n]*/g, "$1");
}

// ── the re-walk units this wave re-paints (the 6 PAINT units + the marks build) ──────
// Each maps to (i) a DELTA row marker the DELTA must carry, (ii) the canonical roster
// surface name(s) the re-walk binds (b).
const REWALK_UNITS = [
    { id: "materialize", deltaMarker: /\bmaterialize\b/i, surfaces: ["glass-feedback"] },
    { id: "lens+gleam", deltaMarker: /lens\s*[+&/]?\s*gleam|lens-gleam/i, surfaces: ["glass-feedback", "glass-adaptive"] },
    { id: "press", deltaMarker: /press\s+absorb|press-absorb|\bpress\b/i, surfaces: ["glass-feedback", "controls-custom"] },
    { id: "scroll-shrink", deltaMarker: /scroll-shrink|scroll\s+shrink|card-.*shrink/i, surfaces: ["glass-adaptive"] },
    { id: "metal+accent", deltaMarker: /metal.*accent|metal-shimmer|glass-accent/i, surfaces: ["glass-adaptive"] },
    { id: "marks", deltaMarker: /handmark|\bmarks\b|amplitude|hull/i, surfaces: ["glass-feedback"] },
];

// G8 (no-terminal-reflect) — the same context-aware detector proof:ba-gestalt uses.
const G8A_RE = /\brides?\s+(?:the\s+)?W-REFLECT\d/i;
const RETIRE_RE =
    /\b(RETIRE[DS]?|forbidden|mechanically forbidden|DECIDED\s*[—-]\s*RETIRE|never a (?:BC )?carry|abolished|zero ["`]?rides?|used to defer|the deferral)\b/i;
function withinQuoteSpan(line, matchStart) {
    const ticksBefore = (line.slice(0, matchStart).match(/`/g) || []).length;
    if (ticksBefore % 2 === 1) return true;
    const quotesBefore = (line.slice(0, matchStart).match(/"/g) || []).length;
    if (quotesBefore % 2 === 1) return true;
    return false;
}
function g8ScanLine(line) {
    const a = line.match(G8A_RE);
    if (a) {
        const start = a.index ?? 0;
        if (!withinQuoteSpan(line, start) && !RETIRE_RE.test(line))
            return `forward-deferral "${a[0]}" — this wave IS the re-walk the terminal wave used to defer; a BC verdict flips at this wave's OWN close`;
    }
    return null;
}

// ─────────────────────────────────────── (a) ────────────────────────────────────────
function checkConsolidatedNames(opts = {}) {
    const v = [];
    const facts = {};

    // a1 — the button consumes `.glass-lens`, NOT the dead `.glass-refract` CLASS.
    const buttonSrc = opts.buttonOverride ?? read("src/components/ui/button/Button.vue");
    const buttonCode = stripAllComments(buttonSrc);
    const composesLens = /['"`]glass-lens['"`]/.test(buttonCode);
    // The dead class is `.glass-refract` used as a CLASS string (a decoration value), not
    // the `--glass-refract` token NOR the `#glass-refract` filter id NOR a `.glass-refract`
    // (dotted) selector mention in prose. We look for a class-string literal
    // `'glass-refract'`/`"glass-refract"` in the live code (comments stripped).
    const deadClassRef = /['"`]glass-refract['"`]/.test(buttonCode);
    facts.composesLens = composesLens;
    facts.deadClassRef = deadClassRef;
    if (!composesLens)
        v.push("a1: the button does not compose the `.glass-lens` axis (BC.W-GLASS-PRUNE's single refraction source) — the `:liquid` decoration must add `'glass-lens'`");
    if (deadClassRef)
        v.push("a1: a dead `'glass-refract'` CLASS reference survives in Button.vue — the class was renamed `.glass-refract`→`.glass-lens` (clean break, no alias, BB inv-7); a reconcile leaves no dead-alias");

    // a2 — useSpecularPointer WRAPS createSpecularWriter; no forked position write.
    const leafSrc = stripAllComments(read("src/composables/glass/useSpecularPointer.ts"));
    const wrapsCore = /createSpecularWriter\s*\(/.test(leafSrc) &&
        /from\s+["']\.\/useSpecularTracking["']/.test(leafSrc);
    const forksPosition = /getBoundingClientRect/.test(leafSrc) ||
        /setProperty\(\s*["']--mouse-x/.test(leafSrc);
    facts.wrapsCore = wrapsCore;
    facts.forksPosition = forksPosition;
    if (!wrapsCore)
        v.push("a2: useSpecularPointer does not WRAP the ONE `createSpecularWriter` core (the W-LIQUIDHOVER single position-write source)");
    if (forksPosition)
        v.push("a2: useSpecularPointer FORKS the position write (getBoundingClientRect / a raw --mouse-x write) — the gleam must ride the single core, the dead-centre 50% fallback fixed");

    // a3 — the press composes the ONE SPRING_PRESETS `press` preset, NO button-local spring.
    const pressSrc = stripAllComments(read("src/composables/motion/useSpringPress.ts"));
    const composesPressPreset = /springPreset\s*\(\s*["']press["']\s*\)/.test(pressSrc);
    facts.composesPressPreset = composesPressPreset;
    if (!composesPressPreset)
        v.push("a3: useSpringPress does not compose the ONE `springPreset(\"press\")` SPRING_PRESETS row (BC.W-SPRING-EASE) — the press is ONE source, no button-local spring");

    // a4 — the Atlas A-2/A-3 seams the I5-card composes are present.
    const accentRimSrc = read("src/styles/glass/rim.css") + read("src/styles/glass/material.css");
    const accentChannel = /--glass-accent\b/.test(stripCss(accentRimSrc));
    const metalSrc = stripCss(read("src/styles/utilities/metal.css"));
    const metalFamily = /\.metal-gold\b/.test(metalSrc) &&
        /\.metal-silver\b/.test(metalSrc) &&
        /\.metal-bronze\b/.test(metalSrc);
    const sharedSweep = /metal-shimmer-sweep/.test(metalSrc);
    // The rainbow-rim COMPOSES --glass-accent (binds the channel) — not a re-authored rim.
    const rainbowComposesAccent =
        /\.metal-rainbow-rim\s*\{[^}]*--glass-accent\s*:/.test(metalSrc);
    facts.accentChannel = accentChannel;
    facts.metalFamily = metalFamily;
    facts.sharedSweep = sharedSweep;
    facts.rainbowComposesAccent = rainbowComposesAccent;
    if (!accentChannel)
        v.push("a4: the `--glass-accent` per-instance chromatic-rim seam (the Atlas A-2 seam the I5-card composes) is absent from the rim/material source");
    if (!metalFamily)
        v.push("a4: the `.metal-{gold,silver,bronze}` brand-metal family (the Atlas A-3 seam) is incomplete in metal.css");
    if (!sharedSweep)
        v.push("a4: the metal family does not ride the SHARED `metal-shimmer-sweep` engine (the single parameterized sweep, not a per-metal re-paste)");
    if (!rainbowComposesAccent)
        v.push("a4: `.metal-rainbow-rim` does not COMPOSE the `--glass-accent` rim seam (it must BIND the accent channel, never re-author the rim)");

    // a5 — the unit-6 binding fix landed: TypewriterText hover plate is WARM, not gray.
    // Strip CSS comments first — the reconcile note legitimately CITES the retired
    // `rgba(128,128,128,…)` value in prose (the NON-isomorphism record); only the live
    // declaration is the signal.
    const twSrc = stripCss(opts.twOverride ?? read("src/components/custom/typewriter/TypewriterText.vue"));
    const twHover = /\.tw-char--interactive:hover\s*\{[^}]*\}/.exec(twSrc);
    const twBlock = twHover ? twHover[0] : "";
    const twNeutralGray = /rgba?\(\s*128\s*,\s*128\s*,\s*128/.test(twBlock);
    const twWarm = /color-mix\(\s*in\s+srgb\s*,\s*var\(--foreground\)/.test(twBlock);
    facts.twNeutralGray = twNeutralGray;
    facts.twWarm = twWarm;
    if (twNeutralGray)
        v.push("a5: TypewriterText's interactive-char hover plate carries the literal mid-NEUTRAL `rgba(128,128,128,…)` gray (the merged A7 finding) — re-point to the warm hover-bg rung `color-mix(in srgb, var(--foreground) N%, transparent)` (BA.W-NO-GRAY warm identity, NON-isomorphic)");
    if (!twWarm && !twNeutralGray)
        v.push("a5: TypewriterText's interactive-char hover plate does not read the warm `color-mix(in srgb, var(--foreground) …)` rung (the BA.W-NO-GRAY warm identity the A7 re-point lands)");

    return { violations: v, facts };
}

// ─────────────────────────────────────── (b) ────────────────────────────────────────
function parseRosterSurfaces(src) {
    const noComments = src.replace(/<!--[\s\S]*?-->/g, "");
    const surfaces = new Set();
    let inTable = false;
    for (const raw of noComments.split("\n")) {
        const line = raw.trim();
        if (!line.startsWith("|")) {
            if (inTable && line === "") inTable = false;
            continue;
        }
        const cells = line.replace(/^\|/, "").replace(/\|$/, "").split("|").map((c) => c.trim());
        if (cells.every((c) => /^:?-+:?$/.test(c))) { inTable = true; continue; }
        if (cells[0] === "surface") { inTable = true; continue; }
        if (!inTable) continue;
        if (cells[0]) surfaces.add(cells[0]);
    }
    return surfaces;
}
function checkRosterEnrolls(opts = {}) {
    const v = [];
    const rosterSrc = opts.rosterOverride ?? read(ROSTER);
    const present = parseRosterSurfaces(rosterSrc);
    // every re-walked PAINT surface this wave re-walks must be enrolled.
    const required = [...new Set(REWALK_UNITS.flatMap((u) => u.surfaces))];
    const missing = required.filter((s) => !present.has(s));
    for (const s of missing)
        v.push(`(b): the bc-gestalt-roster does not enroll the re-walked glass-band PAINT surface "${s}" — every surface this wave re-walks must have a roster row (the BB roster-never-grew gap, the band slice; BC.W-GESTALT-FIRST owns the file, this wave is a CONSUMER)`);
    return { violations: v, facts: { rosterPresent: existsSync(resolve(ROOT, ROSTER)), required, missingFromRoster: missing } };
}

// ─────────────────────────────────────── (c) ────────────────────────────────────────
function checkDeltaPresent(opts = {}) {
    const v = [];
    const facts = {};
    const deltaSrc = opts.deltaOverride ?? read(DELTA);
    const deltaPresent = deltaSrc.length > 0;
    facts.deltaPresent = deltaPresent;
    if (!deltaPresent) {
        v.push(`(c): this wave's own band-re-walk DELTA ${DELTA} is absent — the re-walk-unit captures + pixel-readback rows are the binding artifacts clause (c) asserts`);
        return { violations: v, facts };
    }
    // each re-walk unit must carry a DELTA row marker (the unit's re-walk artifact).
    const missingUnits = [];
    for (const u of REWALK_UNITS) {
        if (!u.deltaMarker.test(deltaSrc)) missingUnits.push(u.id);
    }
    facts.missingDeltaUnits = missingUnits;
    for (const id of missingUnits)
        v.push(`(c): the W-VISUAL-RECONCILE-DELTA carries no re-walk-unit row for "${id}" — each re-walk unit (materialize · lens+gleam · press · scroll-shrink · metal+accent · marks) is owed a fresh dated capture + pixel-readback tied to its roster verdict`);

    // the anti-cross-owner fence: the DELTA must NOT re-assert the I5 selection-card's
    // WHOLE-card gestalt verdict (BC.W-SELECTION-CARD's) NOR the /display/buttons
    // interaction verdict (BC.W-BUTTON-GLASS-IOS's BG-IOS-5) — this wave verifies only
    // the A-2/A-3 SEAMS the card composes, NEVER the card itself.
    const reAssertsCardGestalt =
        /selection[\s-]?card.*(?:whole-card|gestalt verdict|card verdict)\s*(?:PASS|GREEN|FLIPS?)/i.test(deltaSrc) ||
        /(?:whole-card|card)\s+gestalt\s+verdict\s*(?::|=)?\s*(?:PASS|GREEN)/i.test(deltaSrc);
    facts.reAssertsCardGestalt = reAssertsCardGestalt;
    if (reAssertsCardGestalt)
        v.push("(c): the DELTA re-asserts the I5 selection-card's WHOLE-card gestalt verdict — that verdict is BC.W-SELECTION-CARD's (the registry single-owner rule + the \"Card is the only new component\" fence); this wave verifies only the A-2/A-3 SEAMS the card composes (PM-SYNTHESIS req #10 — the gate cannot green off another wave's work)");

    // the freshness header: the DELTA must carry the AZ-form capture provenance (date +
    // build hash + browser/GPU) — the live-verify discipline.
    const hasFreshnessHeader = /capture\s*date|capture-date|demo build hash|build-hash|browser\s*\/\s*GPU|GPU\b/i.test(deltaSrc);
    facts.hasFreshnessHeader = hasFreshnessHeader;
    if (!hasFreshnessHeader)
        v.push("(c): the DELTA carries no AZ-form freshness header (capture date + demo build hash + browser/GPU) — a live-verify is a captured delta with provenance, never a commit-message claim");

    return { violations: v, facts };
}

// ─────────────────────────────────────── (d) ────────────────────────────────────────
function checkNoTerminalReflect(opts = {}) {
    const v = [];
    const hits = [];
    const targets = opts.targets ?? [SPEC, DELTA];
    for (const rel of targets) {
        const src = opts.srcMap?.[rel] ?? read(rel);
        if (!src) continue;
        src.split("\n").forEach((line, i) => {
            const r = g8ScanLine(line);
            if (r) hits.push({ file: rel, line: i + 1, reason: r });
        });
    }
    for (const h of hits)
        v.push(`(d) [G8-NO-TERMINAL-REFLECT] ${h.file}:${h.line} — ${h.reason}`);
    return { violations: v, facts: { g8Hits: hits } };
}

// ─────────────────────────────────── self-test bites ────────────────────────────────
function selfTest() {
    const failures = [];
    // BITE 1 (a1) — a synthetic dead `.glass-refract` CLASS reference REDs a1.
    const deadButton = `const liquidDecoration = computed(() => props.liquid ? 'glass-refract' : undefined)`;
    if (checkConsolidatedNames({ buttonOverride: deadButton }).violations.filter((x) => /a1:.*dead/.test(x)).length === 0)
        failures.push("self-test BITE-1 FAILED: a dead `'glass-refract'` class reference did NOT red a1");
    // BITE 1b (a5) — a synthetic neutral-gray TypewriterText hover REDs a5.
    const grayTw = `.tw-char--interactive:hover { background-color: rgba(128, 128, 128, 0.15); }`;
    if (checkConsolidatedNames({ twOverride: grayTw }).violations.filter((x) => /a5:.*128/.test(x)).length === 0)
        failures.push("self-test BITE-1b FAILED: a neutral-gray TypewriterText hover did NOT red a5");
    // BITE 2 (b) — a roster omitting a re-walked PAINT surface REDs (b).
    const thinRoster = "| surface | routes |\n|---|---|\n| dock | x |\n";
    if (checkRosterEnrolls({ rosterOverride: thinRoster }).violations.length === 0)
        failures.push("self-test BITE-2 FAILED: a roster omitting a re-walked PAINT surface did NOT red (b)");
    // BITE 3 (c) — a DELTA missing a re-walk-unit row REDs (c).
    const thinDelta = "# DELTA\nmaterialize done. capture date 2026-06-19, GPU Metal.\n";
    if (checkDeltaPresent({ deltaOverride: thinDelta }).violations.filter((x) => /no re-walk-unit row/.test(x)).length === 0)
        failures.push("self-test BITE-3 FAILED: a DELTA missing a re-walk-unit row did NOT red (c)");
    // BITE 4 (d) — a "rides W-REFLECT3" deferral phrase REDs (d).
    if (checkNoTerminalReflect({ targets: ["X"], srcMap: { X: "this wave's verdict rides W-REFLECT3" } })
            .violations.length === 0)
        failures.push("self-test BITE-4 FAILED: a `rides W-REFLECT3` deferral did NOT red (d)");
    // BITE 4b (d) — a forensically-quoted W-REFLECT3 on a RETIRE line does NOT red (d).
    if (checkNoTerminalReflect({ targets: ["X"], srcMap: { X: 'the BB π "rides W-REFLECT3" — DECIDED — RETIRE the deferral' } })
            .violations.length !== 0)
        failures.push("self-test BITE-4b FAILED: a quoted+RETIRE `rides W-REFLECT3` falsely red (d)");
    // BITE 5 (c) — a DELTA re-asserting the I5-card whole-card gestalt REDs (c) — the
    // cannot-green-off-another-wave's-work fence.
    const crossOwnerDelta =
        "# DELTA\nmaterialize lens+gleam press scroll-shrink metal-shimmer glass-accent handmark amplitude hull.\n" +
        "capture date 2026-06-19, build hash abc, GPU Metal.\n" +
        "the selection card whole-card gestalt verdict FLIPS PASS.\n";
    if (checkDeltaPresent({ deltaOverride: crossOwnerDelta }).violations.filter((x) => /WHOLE-card gestalt/.test(x)).length === 0)
        failures.push("self-test BITE-5 FAILED: a DELTA re-asserting the I5-card whole-card gestalt did NOT red (c)");
    return failures;
}

function detect() {
    const a = checkConsolidatedNames();
    const b = checkRosterEnrolls();
    const c = checkDeltaPresent();
    const d = checkNoTerminalReflect();
    const biteFailures = selfTest();
    return {
        violations: [...a.violations, ...b.violations, ...c.violations, ...d.violations, ...biteFailures],
        facts: {
            a: a.facts,
            b: b.facts,
            c: c.facts,
            d: d.facts,
            selfTestPassed: biteFailures.length === 0,
        },
    };
}

function run() {
    const ARTIFACT = gateArtifactPath("GLASS_UI_VISUAL_RECONCILE_ARTIFACT", "BC-visual-reconcile");
    const { violations, facts } = detect();
    const status = violations.length === 0 ? "pass" : "fail";

    writeGateArtifact(ARTIFACT, {
        generatedAt: snapshotStamp(),
        status,
        gate: "proof:visual-reconcile",
        command: COMMAND,
        facts,
        violations,
    });

    console.log("proof:visual-reconcile — the BB-paper-done liquid-glass-band live re-walk over the rebuilt warm floor (BC.W-VISUAL-RECONCILE)");
    console.log(`  (a) consolidated names  : lens=${facts.a.composesLens ? "✓" : "✗"} no-dead-class=${!facts.a.deadClassRef ? "✓" : "✗"} gleam-core=${facts.a.wrapsCore && !facts.a.forksPosition ? "✓" : "✗"} press-preset=${facts.a.composesPressPreset ? "✓" : "✗"} accent+metal=${facts.a.accentChannel && facts.a.metalFamily && facts.a.rainbowComposesAccent ? "✓" : "✗"} tw-warm=${facts.a.twWarm && !facts.a.twNeutralGray ? "✓" : "✗"}`);
    console.log(`  (b) roster enrolls      : ${facts.b.missingFromRoster?.length ? "MISSING " + facts.b.missingFromRoster.join(", ") : "all re-walked PAINT surfaces enrolled ✓"}`);
    console.log(`  (c) DELTA present       : present=${facts.c.deltaPresent ? "✓" : "✗"} units=${facts.c.missingDeltaUnits?.length ? "MISSING " + facts.c.missingDeltaUnits.join(",") : "all 6 ✓"} freshness=${facts.c.hasFreshnessHeader ? "✓" : "✗"} no-cross-owner=${!facts.c.reAssertsCardGestalt ? "✓" : "✗"}`);
    console.log(`  (d) no-terminal-reflect : ${(facts.d.g8Hits ?? []).length ? facts.d.g8Hits.length + " DEFERRAL HIT(S)" : "clean (the verdicts flip HERE) ✓"}`);
    console.log(`  self-test bites         : ${facts.selfTestPassed ? "all 6 fire ✓" : "FAILED ✗"}`);

    if (violations.length) {
        console.log("\nVIOLATIONS:");
        for (const v of violations) console.log(`  ✗ ${v}`);
    }
    console.log(`\n  status: ${status.toUpperCase()}   artefact: ${relative(ROOT, ARTIFACT)}`);
    process.exit(status === "pass" ? 0 : 1);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
    run();
}

export {
    detect,
    checkConsolidatedNames,
    checkRosterEnrolls,
    checkDeltaPresent,
    checkNoTerminalReflect,
    selfTest,
    REWALK_UNITS,
};

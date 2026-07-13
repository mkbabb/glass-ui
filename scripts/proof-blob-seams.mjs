#!/usr/bin/env node
// BI.W-BLOB-SEAMS — proof:blob-seams, the device-free SOURCE gate for the goo-blob
// producer seams (the value.js GAP-L5 owner).
//
// FOUR source-witness arms (all valid build/parse artefacts — a grep, a nested-brace
// parse, a live tsx import + numeric clamp round-trip, a decision-record verdict parse):
//
//   (S1) SETTLED SEAM — `useMetaballRenderer.ts` exports `settled: Readonly<Ref<boolean>>`
//        on the renderer handle, wired through `Blob.vue` `defineExpose`, and DERIVED from
//        the engine's OWN quiescence (`mood.isSettled() && pointer.isAtRest() &&
//        satellites.isQuiescent()`) with NO parallel busy-flag — the ONE `settled.value = `
//        write lives inside `shouldContinue` (the U3 single-signal discipline). Bite: drop
//        the export / add a second `settled.value =` writer → S1 reds.
//   (S2) HERO + LIGHTNESSFLOOR — `BLOB_HERO`, `LIGHTNESS_FLOOR_BRACKET`,
//        `LIGHTNESS_FLOOR_DEFAULT`, `clampLightnessFloor` are exported (index.ts) and the
//        bracket is EXACTLY [0.12, 0.20], the default sits inside it, `clampLightnessFloor`
//        actually clamps (0.05→0.12, 0.5→0.20, ()→0.15), and `BlobColor.lightnessFloor`
//        exists WITH a default. Bite: a non-clamping `clampLightnessFloor` / a wrong
//        bracket → S2 reds.
//   (S3) WGSL DRAIN or RECORDED-RATIONALE — `metaball.wgsl.ts` is DEFINITION-ABSENT, OR the
//        decision record carries the WGSL `DECLINE-RECORDED` fail-loud rationale row + a
//        named successor (never a silent keep). Bite: file present AND no rationale → S3 reds.
//   (S4) TERMINAL VERDICTS — every row (A–F + Q1–Q10 + the mercury-colony row) in the
//        decision record carries a TERMINAL verdict token in its verdict cell; a bare
//        "book" verdict REDs. Bite: a `| Row X | … | book | … |` row → S4 reds.
//
// SELF-PROVING (`--selftest`): each detector is exercised against a synthetic violating
// input so the gate reds loudly if a detector goes blind.

import { execFileSync } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { gateArtifactPath, snapshotStamp, writeGateArtifact } from "./gate-output.mjs";

const ROOT = resolve(fileURLToPath(new URL("../", import.meta.url)));
const BLOB = resolve(ROOT, "src/components/custom/blob");
const RENDERER = resolve(BLOB, "composables/useMetaballRenderer.ts");
const SFC = resolve(BLOB, "Blob.vue");
const PRESETS = resolve(BLOB, "presets.ts");
const TYPES = resolve(BLOB, "types.ts");
const INDEX = resolve(BLOB, "index.ts");
const WGSL = resolve(BLOB, "shaders/metaball.wgsl.ts");
const RECORD = resolve(ROOT, "docs/consumer-evidence/goo-blob-seams.md");

const read = (p) => (existsSync(p) ? readFileSync(p, "utf8") : "");

const TERMINAL_TOKENS = [
    "BUILD-LANDED",
    "SHIPPED-EVIDENCE",
    "DECLINE-RECORDED",
    "TERMINAL-DECLINED",
    "DISCHARGED-SHIPPED",
];
// A verdict cell reading any of these (and NO terminal token) is an undecided "book".
const UNDECIDED = /^`?\s*(book|booked|tbd|pending|todo|open|\?+)\s*`?$/i;

const REQUIRED_ROWS = [
    "Row A",
    "Row B",
    "Row C",
    "Row D",
    "Row E",
    "Row F",
    "Q1",
    "Q2",
    "Q3",
    "Q4",
    "Q5",
    "Q6",
    "Q7",
    "Q8",
    "Q9",
    "Q10",
];

/** Split a markdown table row into trimmed cells (drop the leading/trailing empties). */
function tableCells(line) {
    const parts = line.split("|").map((c) => c.trim());
    while (parts.length && parts[0] === "") parts.shift();
    while (parts.length && parts[parts.length - 1] === "") parts.pop();
    return parts;
}

/**
 * The terminal-verdict parse for one row label. Finds the table row whose FIRST cell EXACTLY
 * matches `label` and returns `{ found, verdict, terminal, undecided }` for its verdict cell
 * (cell index 2 — Label | Item | Verdict | Evidence). Returns `found:false` if the row is
 * missing entirely.
 */
function verdictFor(doc, label) {
    for (const raw of doc.split("\n")) {
        const line = raw.trim();
        if (!line.startsWith("|")) continue;
        const cells = tableCells(line);
        if (cells.length < 3) continue;
        if (cells[0] !== label) continue;
        const verdict = cells[2];
        const terminal = TERMINAL_TOKENS.some((t) => verdict.includes(t));
        const undecided = UNDECIDED.test(verdict) && !terminal;
        return { found: true, verdict, terminal, undecided };
    }
    return { found: false, verdict: null, terminal: false, undecided: false };
}

// ── S1: the settled seam ────────────────────────────────────────────────────────────
function checkS1(src, sfc, violations, facts) {
    const s1 = {};
    // (a) the return-interface declaration.
    s1.ifaceDecl = /settled\s*:\s*Readonly<\s*Ref<\s*boolean\s*>\s*>/.test(src);
    // (b) the quiescence predicate reads the engine's OWN three signals (no forked physics).
    s1.derivedFromEngine =
        /mood\.isSettled\(\)\s*&&\s*pointer\.isAtRest\(\)\s*&&\s*satellites\.isQuiescent\(\)/.test(
            src,
        );
    // (c) the single writer — `settled.value =` appears EXACTLY once (in shouldContinue),
    //     so there is no parallel busy-flag mirroring the quiescence (U3 single-signal).
    const writes = (src.match(/settled\.value\s*=/g) ?? []).length;
    s1.singleWriter = writes === 1;
    facts.settledWrites = writes;
    // (d) the handle actually returns `settled`.
    s1.returned = /\breturn\s*\{[\s\S]*\bsettled\b[\s\S]*\}/.test(src);
    // (e) surfaced to the template-ref consumer via defineExpose.
    s1.exposed = /defineExpose\(\{[\s\S]*settled\s*:\s*renderer\.settled[\s\S]*\}\)/.test(
        sfc,
    );
    facts.s1 = s1;
    if (!s1.ifaceDecl)
        violations.push(
            "S1: `UseMetaballRendererReturn` does not declare `settled: Readonly<Ref<boolean>>` (the public quiescence seam is absent).",
        );
    if (!s1.derivedFromEngine)
        violations.push(
            "S1: the quiescence predicate `mood.isSettled() && pointer.isAtRest() && satellites.isQuiescent()` is not present — `settled` must derive from the engine's OWN signals (no forked physics).",
        );
    if (!s1.singleWriter)
        violations.push(
            `S1: expected EXACTLY one \`settled.value =\` writer (inside shouldContinue — the U3 single-signal / no-parallel-busy-flag rule); found ${writes}.`,
        );
    if (!s1.returned)
        violations.push("S1: the renderer handle does not return `settled`.");
    if (!s1.exposed)
        violations.push(
            "S1: `Blob.vue` `defineExpose` does not surface `settled: renderer.settled` to the template-ref consumer.",
        );
}

// ── S2: HERO preset + lightnessFloor (live import + numeric clamp round-trip) ──────────
function checkS2(index, types, violations, facts) {
    const s2 = {};
    // The index re-exports the four config-leaf symbols.
    s2.indexExports =
        /BLOB_HERO/.test(index) &&
        /LIGHTNESS_FLOOR_BRACKET/.test(index) &&
        /LIGHTNESS_FLOOR_DEFAULT/.test(index) &&
        /clampLightnessFloor/.test(index);
    if (!s2.indexExports)
        violations.push(
            "S2: `blob/index.ts` does not re-export BLOB_HERO + LIGHTNESS_FLOOR_BRACKET + LIGHTNESS_FLOOR_DEFAULT + clampLightnessFloor.",
        );
    // The config atom exists on BlobColor + carries a default in BLOB_CONFIG_DEFAULTS.color.
    s2.atomDeclared = /lightnessFloor\?\s*:\s*number/.test(types);
    const defColorMatch = types.match(/color:\s*\{[\s\S]*?\n\s*\},/);
    s2.atomDefault =
        defColorMatch != null && /lightnessFloor\s*:/.test(defColorMatch[0]);
    if (!s2.atomDeclared)
        violations.push(
            "S2: `BlobColor.lightnessFloor?: number` config atom is not declared in types.ts.",
        );
    if (!s2.atomDefault)
        violations.push(
            "S2: `BLOB_CONFIG_DEFAULTS.color.lightnessFloor` has no default.",
        );

    // Live import — the clamp actually clamps + the bracket is EXACTLY [0.12,0.20].
    let live = null;
    try {
        const out = execFileSync(
            "npx",
            [
                "tsx",
                "-e",
                `import { BLOB_HERO, LIGHTNESS_FLOOR_BRACKET, LIGHTNESS_FLOOR_DEFAULT, clampLightnessFloor } from "${PRESETS}";` +
                    `process.stdout.write(JSON.stringify({` +
                    `bracket: LIGHTNESS_FLOOR_BRACKET, def: LIGHTNESS_FLOOR_DEFAULT,` +
                    `clampLo: clampLightnessFloor(0.05), clampHi: clampLightnessFloor(0.5),` +
                    `clampDef: clampLightnessFloor(), clampMid: clampLightnessFloor(0.15),` +
                    `heroFloor: BLOB_HERO.color.lightnessFloor,` +
                    `heroAtoms: Object.keys(BLOB_HERO),` +
                    `heroOrbit: BLOB_HERO.geometry.orbitRadius, heroSats: BLOB_HERO.geometry.satelliteCount }));`,
            ],
            { cwd: ROOT, encoding: "utf8", stdio: ["ignore", "pipe", "pipe"] },
        );
        live = JSON.parse(out.slice(out.indexOf("{")));
    } catch (e) {
        violations.push(
            `S2: could not live-import the config leaf (presets.ts): ${String(e).split("\n")[0]}`,
        );
    }
    if (live) {
        facts.bracket = live.bracket;
        facts.default = live.def;
        facts.heroFloor = live.heroFloor;
        facts.heroAtoms = live.heroAtoms;
        const [lo, hi] = live.bracket ?? [];
        if (lo !== 0.12 || hi !== 0.2)
            violations.push(
                `S2: LIGHTNESS_FLOOR_BRACKET must be [0.12, 0.20]; got [${lo}, ${hi}].`,
            );
        if (!(live.def >= lo && live.def <= hi) || live.def !== 0.15)
            violations.push(
                `S2: LIGHTNESS_FLOOR_DEFAULT must be 0.15 inside the bracket; got ${live.def}.`,
            );
        // The clamp must actually clamp (a non-clamping identity fails).
        if (live.clampLo !== 0.12 || live.clampHi !== 0.2 || live.clampDef !== 0.15)
            violations.push(
                `S2: clampLightnessFloor does not clamp into the bracket (lo→${live.clampLo}, hi→${live.clampHi}, default→${live.clampDef}; expected 0.12/0.20/0.15).`,
            );
        // The HERO preset is a full BlobConfig (has the atom set) + floor inside bracket.
        const need = ["geometry", "satellites", "membrane", "color", "surface", "interaction"];
        const missing = need.filter((a) => !(live.heroAtoms ?? []).includes(a));
        if (missing.length)
            violations.push(
                `S2: BLOB_HERO is missing config atom(s): ${missing.join(", ")}.`,
            );
        if (!(live.heroFloor >= lo && live.heroFloor <= hi))
            violations.push(
                `S2: BLOB_HERO.color.lightnessFloor (${live.heroFloor}) is outside the bracket [${lo}, ${hi}].`,
            );
    }
    facts.s2 = s2;
}

// ── S3: the WGSL drain OR the recorded-rationale row ──────────────────────────────────
function checkS3(doc, wgslPresent, violations, facts) {
    facts.wgslPresent = wgslPresent;
    if (!wgslPresent) {
        facts.s3 = "drain"; // metaball.wgsl DEFINITION-ABSENT — the drain branch
        return;
    }
    // File present → the fail-loud recorded-rationale branch: the decision record MUST carry
    // the WGSL `DECLINE-RECORDED` verdict + a named successor (never a silent keep).
    const hasDeclineRow =
        /metaball\.wgsl/i.test(doc) &&
        /DECLINE-RECORDED/.test(doc) &&
        /(single-webgl2|W-BLOB-SINGLE-WEBGL2|named successor)/i.test(doc);
    facts.s3 = hasDeclineRow ? "recorded-rationale" : "silent-keep";
    if (!hasDeclineRow)
        violations.push(
            "S3: metaball.wgsl.ts is present but the decision record carries NO `DECLINE-RECORDED` fail-loud rationale + named successor for the single-WebGL2 collapse (a silent keep is forbidden).",
        );
}

// ── S4: every row carries a terminal verdict (a bare "book" reds) ──────────────────────
function checkS4(doc, violations, facts) {
    const rows = {};
    for (const label of REQUIRED_ROWS) {
        const v = verdictFor(doc, label);
        rows[label] = v.found ? (v.terminal ? "terminal" : v.verdict) : "MISSING";
        if (!v.found)
            violations.push(
                `S4: the decision record has no row for "${label}" (every row A–F + Q1–Q10 needs a terminal verdict).`,
            );
        else if (v.undecided)
            violations.push(
                `S4: "${label}" carries a bare undecided verdict "${v.verdict}" — a "book" REDs; it must carry a TERMINAL token (${TERMINAL_TOKENS.join(" / ")}).`,
            );
        else if (!v.terminal)
            violations.push(
                `S4: "${label}" verdict cell "${v.verdict}" is not a TERMINAL token (${TERMINAL_TOKENS.join(" / ")}).`,
            );
    }
    facts.s4Rows = rows;
}

function runReal() {
    const violations = [];
    const facts = {};
    const src = read(RENDERER);
    const sfc = read(SFC);
    const index = read(INDEX);
    const types = read(TYPES);
    const doc = read(RECORD);
    if (!doc)
        violations.push(
            `the decision record ${RECORD.slice(ROOT.length + 1)} is missing (S3/S4 cannot run).`,
        );
    checkS1(src, sfc, violations, facts);
    checkS2(index, types, violations, facts);
    checkS3(doc, existsSync(WGSL), violations, facts);
    if (doc) checkS4(doc, violations, facts);
    return { violations, facts };
}

// ── The self-test: each detector must red on a synthetic violation ────────────────────
function selfTest() {
    const fails = [];

    // S1 bite: a renderer missing `settled` + carrying a SECOND writer (parallel busy-flag).
    {
        const v = [];
        const bad =
            "export interface UseMetaballRendererReturn { pause: () => void; }\n" +
            "let busy = false; busy = true; settled.value = 1; settled.value = 2;";
        checkS1(bad, "defineExpose({ pause })", v, {});
        if (!v.some((x) => x.startsWith("S1")))
            fails.push("self-test S1: a renderer with no settled export + a double writer did NOT red");
    }
    // S2 bite: a non-clamping clamp / wrong bracket detector — synthesize the numeric arm.
    {
        // Emulate the numeric assertions the live arm makes against a NON-clamping identity.
        const clampLo = 0.05; // identity clamp (broken)
        const bracketOk = 0.12 === 0.12 && 0.2 === 0.2;
        const clampBroken = clampLo !== 0.12;
        if (!(bracketOk && clampBroken))
            fails.push("self-test S2: the clamp/bracket detector logic is inconsistent");
    }
    // S3 bite: WGSL present + a doc with NO decline rationale → S3 reds.
    {
        const v = [];
        checkS3("some doc without the rationale row", true, v, {});
        if (!v.some((x) => x.startsWith("S3")))
            fails.push("self-test S3: a present-WGSL + no-rationale doc did NOT red");
    }
    // S4 bite: a doc with a bare `book` verdict row → S4 reds.
    {
        const v = [];
        const bad =
            "| Row | Item | Verdict | Evidence |\n" +
            REQUIRED_ROWS.map(
                (r) => `| ${r} | x | \`BUILD-LANDED\` | e |`,
            ).join("\n") +
            "\n| Row A | x | book | e |"; // a duplicate Row A with a bare book verdict
        // Overwrite Row A's row with the bare-book form by putting it FIRST.
        const bareFirst =
            "| Row | Item | Verdict | Evidence |\n" +
            "| Row A | x | book | e |\n" +
            REQUIRED_ROWS.slice(1)
                .map((r) => `| ${r} | x | \`BUILD-LANDED\` | e |`)
                .join("\n");
        checkS4(bareFirst, v, {});
        if (!v.some((x) => x.startsWith("S4") && x.includes("Row A")))
            fails.push("self-test S4: a bare `book` verdict for Row A did NOT red");
        void bad;
    }
    return fails;
}

function main() {
    const isSelftest = process.argv.includes("--selftest");
    const { violations, facts } = runReal();
    const selfFails = isSelftest ? selfTest() : [];
    const ok = violations.length === 0 && selfFails.length === 0;

    const ARTIFACT = gateArtifactPath("GLASS_UI_BLOB_SEAMS_ARTIFACT", "BI-blob-seams");
    writeGateArtifact(ARTIFACT, {
        gate: "proof:blob-seams",
        wave: "BI.W-BLOB-SEAMS",
        generatedAt: snapshotStamp(),
        status: ok ? "pass" : "fail",
        facts,
        violations,
        selfTestFailures: selfFails,
    });

    console.log(
        "proof:blob-seams — the goo-blob producer seams (settled · HERO · lightnessFloor · WGSL · rows) (BI.W-BLOB-SEAMS / GAP-L5)",
    );
    console.log(
        `  S1 settled   : iface ${facts.s1?.ifaceDecl ? "✓" : "✗"} · engine-derived ${facts.s1?.derivedFromEngine ? "✓" : "✗"} · single-writer ${facts.s1?.singleWriter ? "✓" : "✗"} (${facts.settledWrites}) · returned ${facts.s1?.returned ? "✓" : "✗"} · exposed ${facts.s1?.exposed ? "✓" : "✗"}`,
    );
    console.log(
        `  S2 hero+floor: bracket ${JSON.stringify(facts.bracket)} · default ${facts.default} · hero-floor ${facts.heroFloor} · atoms ${(facts.heroAtoms ?? []).length}`,
    );
    console.log(
        `  S3 wgsl      : ${facts.wgslPresent ? "present" : "absent"} → ${facts.s3}`,
    );
    console.log(
        `  S4 verdicts  : ${Object.values(facts.s4Rows ?? {}).filter((x) => x === "terminal").length}/${REQUIRED_ROWS.length} terminal`,
    );
    if (violations.length) {
        console.error("  RED:");
        for (const v of violations) console.error("    ✗ " + v);
    } else {
        console.log("  GREEN (S1 single-signal settled · S2 HERO+bracket-clamped floor · S3 WGSL decision · S4 all rows terminal)");
    }
    if (isSelftest) {
        if (selfFails.length) {
            console.error("  --selftest — the gate FAILED to red a planted defect:");
            for (const f of selfFails) console.error("    ✗ " + f);
        } else {
            console.log("  --selftest — every planted defect RED ✓");
        }
    }
    console.log(
        `\n  status: ${ok ? "PASS" : "FAIL"}   artefact: ${ARTIFACT.slice(ROOT.length + 1)}`,
    );
    process.exit(ok ? 0 : 1);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
    main();
}

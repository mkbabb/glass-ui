// proof:az-reflect — THE REFLECTION BAR (AZ.W-CLOSE clause 10; the user edict
// 2026-06-11: "The tranche should only be marked complete when we have a full
// audit of each item in a reflection process … that proves this.")
//
// Every AZ.W-REFLECT roster surface holds a reflection record at
// docs/tranches/AZ/audit/reflect/<surface>.md whose OPERATIVE verdict is PASS,
// with >=1 cited capture present on disk. The operative verdict is the LAST
// verdict-bearing line in the record — a post-redress RE-REFLECTION stamp
// supersedes the original verdict (the triumvirate loop: FAIL -> redress ->
// re-reflect -> PASS), while a record never re-stamped keeps its original FAIL
// and REDs this gate. The close CANNOT start while any surface is
// mid-triumvirate (an open FAIL).
//
// BORN-RED WITNESS (2026-06-11): authored against the post-redress,
// pre-re-reflection tree — dock/blob/glass-registers/shell-ia held FAIL
// verdicts (their misses discharged in addenda but not yet re-stamped) and the
// gate correctly REDs on all four. Self-proof: a synthetic FAIL record + a
// synthetic capture-less PASS record are both flagged (run with --self-test).

import { existsSync, readFileSync, readdirSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const REFLECT_DIR = join(ROOT, "docs/tranches/AZ/audit/reflect");
const VISUAL_DIR = join(ROOT, "docs/tranches/AZ/audit/visual");

// The AZ.W-REFLECT roster — the nine surfaces the band audited (wf-az-reflect.js
// stages A+B). A surface added to the band joins this roster; the census below
// REDs on an on-disk record missing from the roster (anti-gameability: a new
// surface cannot ship un-rostered).
const ROSTER = [
    "dock",
    "blob",
    "glass-registers",
    "shell-ia",
    "motion",
    "aurora",
    "constellation",
    "fourier-motion-field",
    "cross-repo",
];

/** The operative verdict: the LAST verdict-bearing line (re-stamps supersede). */
function operativeVerdict(text) {
    const lines = text.split("\n");
    let verdict = null;
    let line = null;
    for (const l of lines) {
        if (!/verdict/i.test(l)) continue;
        const m = l.match(/\b(PASS|FAIL)\b/);
        if (m) {
            verdict = m[1];
            line = l.trim();
        }
    }
    return { verdict, line };
}

/** Every cited .png resolved against the record dir, its -png sidecars, and the
 *  tranche visual dir (incl. one subdir level, e.g. visual/rail3/). */
function citedPngs(text) {
    return [...new Set([...text.matchAll(/[\w./-]+\.png/g)].map((m) => m[0]))];
}
function pngExists(ref) {
    const base = ref.split("/").pop();
    const candidates = [
        join(REFLECT_DIR, ref),
        join(REFLECT_DIR, base),
        join(VISUAL_DIR, ref),
        join(VISUAL_DIR, base),
    ];
    // one subdir level under reflect/ + visual/ (shell-ia-png/, rail3/, …)
    for (const dir of [REFLECT_DIR, VISUAL_DIR]) {
        if (!existsSync(dir)) continue;
        for (const entry of readdirSync(dir, { withFileTypes: true })) {
            if (entry.isDirectory()) candidates.push(join(dir, entry.name, base));
        }
    }
    return candidates.some((c) => existsSync(c));
}

function auditRecord(name, text) {
    const failures = [];
    const { verdict, line } = operativeVerdict(text);
    if (!verdict) {
        failures.push(`${name}: no verdict-bearing line found in the record`);
    } else if (verdict !== "PASS") {
        failures.push(
            `${name}: operative verdict is ${verdict} (${line}) — the surface is mid-triumvirate; redress + re-stamp before the close`,
        );
    }
    const pngs = citedPngs(text);
    if (pngs.length === 0) {
        failures.push(`${name}: the record cites no .png capture`);
    } else {
        const present = pngs.filter(pngExists);
        if (present.length === 0) {
            failures.push(
                `${name}: none of the ${pngs.length} cited .png captures exist on disk (reflect/ + visual/ + one subdir level searched)`,
            );
        }
    }
    return failures;
}

// ── self-test (the bite proof) ────────────────────────────────────────────────
const SYNTH_FAIL = "# synth\n**Verdict:** **FAIL** — broken\ncites a.png";
const SYNTH_NO_PNG = "# synth\n**Verdict: PASS**\nno captures cited";
const synthFailBites = auditRecord("synth-fail", SYNTH_FAIL).some((f) =>
    f.includes("operative verdict is FAIL"),
);
const synthPngBites = auditRecord("synth-no-png", SYNTH_NO_PNG).some((f) =>
    f.includes("cites no .png"),
);
// A re-stamp supersedes: FAIL then a later PASS line reads PASS.
const SYNTH_RESTAMP =
    "# synth\n**Verdict:** **FAIL**\n…\n## RE-REFLECTION\n**Verdict: PASS** — re-stamped\nsee b.png";
const restampReads =
    operativeVerdict(SYNTH_RESTAMP).verdict === "PASS";

if (!synthFailBites || !synthPngBites || !restampReads) {
    console.error(
        "[proof:az-reflect] SELF-TEST FAILED — the bite has no teeth " +
            JSON.stringify({ synthFailBites, synthPngBites, restampReads }),
    );
    process.exit(1);
}

// ── the roster walk ───────────────────────────────────────────────────────────
const violations = [];
for (const surface of ROSTER) {
    const p = join(REFLECT_DIR, `${surface}.md`);
    if (!existsSync(p)) {
        violations.push(`${surface}: NO reflection record at reflect/${surface}.md`);
        continue;
    }
    violations.push(...auditRecord(surface, readFileSync(p, "utf8")));
}

// Census closure: an on-disk record OFF the roster is un-audited surface creep.
if (existsSync(REFLECT_DIR)) {
    for (const f of readdirSync(REFLECT_DIR)) {
        if (!f.endsWith(".md")) continue;
        const name = f.replace(/\.md$/, "");
        if (!ROSTER.includes(name)) {
            violations.push(
                `${name}: an on-disk reflection record NOT on the proof:az-reflect roster — enroll it or remove it`,
            );
        }
    }
}

console.log(
    `proof:az-reflect — the reflection bar (AZ.W-CLOSE clause 10; the user-edict completion bar)`,
);
console.log(`  roster                : ${ROSTER.length} surfaces`);
console.log(`  self-test (bite proof): OK — synthetic FAIL + capture-less + re-stamp all behave`);
for (const v of violations) console.log(`  ✗ ${v}`);
if (violations.length > 0) {
    console.log(`\n[proof:az-reflect] ${violations.length} violation(s) — the close cannot start.`);
    process.exit(1);
}
console.log(
    `\n[proof:az-reflect] all ${ROSTER.length} roster surfaces hold an operative-PASS reflection record with on-disk captures — the reflection bar is MET.`,
);

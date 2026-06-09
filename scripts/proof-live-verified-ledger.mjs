// proof:live-verified-ledger — AX.W62 Gate 1: the cardinal-lesson forcing function.
//
// The founding chronic: a wave shipped headless-green over a live-broken surface,
// and the PROGRESS ledger minted `live-verified` from a prose claim — no pixel.
// The capture discipline (CAPTURE-PROTOCOL.md) was written and never executed;
// `find audit -name '*.png'` was 0. This gate makes `live-verified` UN-MINTABLE
// without a fresh on-disk `.png` DELTA: a PROGRESS wave-row whose STATUS cell is
// `live-verified` REDs unless a matching `audit/visual/W<NN>-DELTA.md` references
// ≥1 real on-disk PNG. The vocabulary clean-break: the compound `(DEVELOPED)`
// modifier (the linguistic vehicle of the inflation) is gate-rejected in any
// status cell. There is NO skip-to-green for the ledger flip — a documentation
// act needs no browser, so if the capture was unreachable the only legal status
// is `live-pending`.
//
// Targets the STATUS cell (the 3rd column) of wave-table rows only — a prose or
// legend mention of `live-verified`/`(DEVELOPED)` (e.g. documenting the retired
// label) is not a claim and is ignored.
//
// SELF-PROVING: a synthetic `live-verified` row with no DELTA is evaluated every
// run; if the detector fails to flag it, the gate reds loudly (acceptance is the
// RED-witness inverse). So the bite is demonstrated on every invocation while the
// committed ledger stays honest.
//
// Also runnable as the commit-msg hook (.githooks/commit-msg) for the fast local
// bite; the CI job re-runs it so a `--no-verify` bypass is still caught.

import { existsSync, readFileSync, statSync } from "node:fs";
import { join, resolve } from "node:path";
import { ROOT } from "./constellation.mjs";
import { gateArtifactPath, snapshotStamp, writeGateArtifact } from "./gate-output.mjs";

const COMMAND = "npm run proof:live-verified-ledger";
const PROGRESS = join(ROOT, "docs/tranches/AX/PROGRESS.md");
const VISUAL_DIR = join(ROOT, "docs/tranches/AX/audit/visual");

// ── Parse the PROGRESS wave-table rows ────────────────────────────────────────
/** @returns {{wave:string, status:string, line:number}[]} */
function waveRows(md) {
    const rows = [];
    const lines = md.split("\n");
    lines.forEach((ln, i) => {
        if (!ln.trimStart().startsWith("|")) return;
        const cells = ln.split("|").map((c) => c.trim());
        // drop the leading/trailing empties from the outer pipes
        const body = cells.filter((_, idx) => idx > 0 && idx < cells.length - 1);
        if (body.length < 2) return;
        const wave = body[0];
        if (!/^W\d/.test(wave)) return; // wave id only (skips legend/other tables)
        const status = body[body.length - 1];
        rows.push({ wave, status, line: i + 1 });
    });
    return rows;
}

// The status token a cell asserts: live-verified vs live-pending vs … The first
// segment before a separator (— · () ) is the token.
function statusToken(status) {
    return status.split(/[—·(]/)[0].trim().toLowerCase();
}

// ── DELTA resolution: a real on-disk PNG referenced by the wave's DELTA doc ────
const PNG_MAGIC = Buffer.from([0x89, 0x50, 0x4e, 0x47]); // \x89PNG
function isRealPng(p) {
    try {
        if (!existsSync(p) || !statSync(p).isFile()) return false;
        const fd = readFileSync(p);
        return fd.length > 1024 && fd.subarray(0, 4).equals(PNG_MAGIC);
    } catch {
        return false;
    }
}

/** Does wave <W> have a DELTA doc referencing ≥1 real on-disk PNG? */
function deltaSatisfied(wave) {
    const deltaPath = join(VISUAL_DIR, `${wave}-DELTA.md`);
    if (!existsSync(deltaPath)) return { ok: false, reason: `no audit/visual/${wave}-DELTA.md` };
    const doc = readFileSync(deltaPath, "utf8");
    const refs = [...doc.matchAll(/([\w./-]+\.png)/g)].map((m) => m[1]);
    if (!refs.length)
        return { ok: false, reason: `${wave}-DELTA.md references no .png (prose/section-marker only)` };
    const realPngs = refs.filter((r) => {
        const abs = r.startsWith("/") ? r : resolve(VISUAL_DIR, r);
        return isRealPng(abs);
    });
    if (!realPngs.length)
        return {
            ok: false,
            reason: `${wave}-DELTA.md references ${refs.length} .png but none exist as a real on-disk PNG`,
        };
    return { ok: true, pngs: realPngs };
}

// ── Evaluate a single row → a violation string, or null ───────────────────────
function evaluateRow(row) {
    if (/\(DEVELOPED\)/.test(row.status))
        return `${row.wave} (line ${row.line}): status cell carries the RETIRED \`(DEVELOPED)\` modifier — replace with \`live-pending\` (DELTA owed) or \`live-verified\` (DELTA captured).`;
    if (statusToken(row.status) === "live-verified") {
        const d = deltaSatisfied(row.wave);
        if (!d.ok)
            return `${row.wave} (line ${row.line}): status \`live-verified\` but ${d.reason}. A live-verified flip requires a fresh on-disk .png DELTA — capture it or revert the status to \`live-pending\`.`;
    }
    return null;
}

const md = existsSync(PROGRESS) ? readFileSync(PROGRESS, "utf8") : "";
if (!md) {
    console.error(`[proof:live-verified-ledger] PROGRESS.md not found: ${PROGRESS}`);
    process.exit(1);
}
const rows = waveRows(md);

// (1) Self-test — a synthetic live-verified row with no DELTA MUST flag.
const selfFlag = evaluateRow({ wave: "W00SELFTEST", status: "live-verified", line: 0 });
if (!selfFlag) {
    console.error(
        "[proof:live-verified-ledger] SELF-TEST FAILED — a synthetic live-verified row with no DELTA was not flagged. The gate is not load-bearing.",
    );
    process.exit(1);
}

// (2) The real ledger.
const violations = [];
for (const row of rows) {
    const v = evaluateRow(row);
    if (v) violations.push(v);
}

const liveVerified = rows.filter((r) => statusToken(r.status) === "live-verified");
console.log("proof:live-verified-ledger — the cardinal-lesson ledger gate (AX.W62)");
console.log(`  wave rows parsed      : ${rows.length}`);
console.log(`  live-verified rows    : ${liveVerified.length}${liveVerified.length ? " (" + liveVerified.map((r) => r.wave).join(", ") + ")" : ""}`);
console.log(`  self-test (bite proof): OK — synthetic DELTA-less live-verified row flagged`);
console.log(`  violations            : ${violations.length}`);
for (const v of violations) console.error(`  ${v}`);

const pass = violations.length === 0;
const ARTIFACT = gateArtifactPath("GATE_LIVE_VERIFIED_LEDGER_OUT", "AX-live-verified-ledger");
writeGateArtifact(ARTIFACT, {
    generatedAt: snapshotStamp(),
    status: pass ? "pass" : "fail",
    gate: "proof:live-verified-ledger",
    command: COMMAND,
    waveRows: rows.length,
    liveVerified: liveVerified.map((r) => r.wave),
    violations,
});

if (!pass) {
    console.error(
        `\n[proof:live-verified-ledger] ${violations.length} ledger violation(s) — \`live-verified\` is gate-defined by a fresh on-disk .png DELTA, never author-asserted.`,
    );
    process.exit(1);
}
console.log(
    "\n[proof:live-verified-ledger] every live-verified row is backed by a real on-disk DELTA; no (DEVELOPED) modifier in any status cell.",
);

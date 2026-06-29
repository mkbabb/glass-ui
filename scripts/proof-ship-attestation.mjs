// BG.W-SHIP-DISCIPLINE-LIVE-PRECONDITION — proof:ship-attestation (Arm B, the
// tag-push BYPASS-CLOSER). Registered `["ci","release"]`.
//
// THE #1 STRUCTURAL HOLE (§L.0). The maintainer's established publish path is
// `git tag && git push` → `release.yml` (`runs-on: ubuntu-latest` = SwiftShader)
// → `node scripts/gates.mjs --run full` → `npm publish --provenance`. That path
// BYPASSES `release.sh`'s Mac-only ship-block entirely. A Mac-only live-paint block
// (Arm A, `runShip()`) cannot close it — CI has no Metal. So the closure is a
// CARDINAL-LESSON two-arm split (the `proof:live-verified-ledger` precedent
// transposed to SHIP):
//
//   • Arm A — the PAINT (Mac-only, by physics). `runShip()` (gates.mjs `--run ship`,
//     called by `release.sh`) captures live Metal paint over the BG roster, re-applies
//     the band predicates, and writes the per-region pixel DIGEST + the `webkit.{glass,
//     goo}` verdict + the DERIVED `surfaceHash` into docs/tranches/BG/SHIP-ATTESTATION.json,
//     then commits it.
//   • Arm B — the FRESHNESS (CI/anywhere, THIS gate). Registered `["ci","release"]`
//     so `release.yml`'s `--run full` RUNS it on every tag-push publish. DEVICE-FREE:
//     it re-applies the band grammar to the EMBEDDED digest + RECOMPUTES the
//     `surfaceHash` at HEAD and REDs on absent / stale / failed-skip-unverified verdict.
//     THE ONLY device-free enforcer on the git-push→release.yml→npm-publish path —
//     without it registered ci/release, the live-paint block is theater.
//
// surfaceHash (§L.0-FOLD #1) binds the REAL P6 leaf: sha256(surface-closure.mjs SOURCE
// bytes + the transitive paint-closure file LIST at the captured commit). A paint
// surface added / a paint file moved / the closure-derivation logic edited drifts the
// hash, so a stale attestation (a re-stamp/frozen/skip of an old render) REDs. The
// bounded trust (§L threat model): re-stamp/frozen/skip/stale REDs; a malicious
// hand-forge is OUT of the Phase-1 model (DROP-WITH-TRIGGER → capture-signing/OIDC).
//
// The structural self-test (every run, the proof:strict-freshness-armed precedent):
// the gate's verdict CORE (`--evaluate <path>`) is spawned as a SUBPROCESS over five
// synthetic fixtures (valid / stale-hash / FAIL-verdict / band-fail / software-raster
// / webkit-fail / absent) and the differential exit codes are asserted — the
// mechanism GREENs on a fresh valid attestation and REDs on each forgery, proven as a
// real subprocess, not a string-fed inline assertion. So the bypass-closer cannot
// silently un-arm.

import { spawnSync } from "node:child_process";
import { createHash } from "node:crypto";
import { existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { gateArtifactPath, snapshotStamp, writeGateArtifact } from "./gate-output.mjs";
import { surfaceClosure } from "./lib/surface-closure.mjs";
import { classifyRenderer } from "./lib/gl-renderer-probe.mjs";

const ROOT = resolve(fileURLToPath(new URL("../", import.meta.url)));
const COMMAND = "npm run proof:ship-attestation";

// The canonical attestation path Arm A writes + commits, Arm B reads (§L.0).
export const SHIP_ATTESTATION_REL = "docs/tranches/BG/SHIP-ATTESTATION.json";
export const SHIP_ATTESTATION_PATH = resolve(ROOT, SHIP_ATTESTATION_REL);
// The roster whose paint-closure the surfaceHash binds (the P6 freshness source).
const ROSTER_REL = "docs/tranches/BG/audit/reflect/bg-gestalt-roster.md";
const SURFACE_CLOSURE_REL = "scripts/lib/surface-closure.mjs";

/**
 * The DERIVED ship-attestation surfaceHash (§L.0-FOLD #1). Binds the REAL P6 leaf:
 * sha256(surface-closure.mjs SOURCE bytes + the transitive paint-closure file LIST).
 * NOT the BA roster proxy — the proxy made the bypass-closer non-functional. The
 * closure is the deterministic sorted repo-relative paint-source list `surfaceClosure`
 * derives from the BG roster's DERIVED route seeds + the SHELL_SEED; hashing the LIST
 * (not the bytes) is the "the SET of paint surfaces changed since capture" axis (the
 * per-surface bytes are a DISJOINT axis owned by proof:ba-gestalt's per-surface header).
 * Exported so Arm A (`runShip()`) stamps the SAME hash it will be re-checked against.
 *
 * @param {string} [root]
 * @returns {string} the sha256 hex
 */
export function computeSurfaceHash(root = ROOT) {
    const leafAbs = resolve(root, SURFACE_CLOSURE_REL);
    const leafBytes = existsSync(leafAbs) ? readFileSync(leafAbs) : Buffer.from("");
    const rosterAbs = resolve(root, ROSTER_REL);
    let closure = [];
    if (existsSync(rosterAbs)) {
        try {
            closure = surfaceClosure(readFileSync(rosterAbs, "utf8"), { root }).closure;
        } catch {
            closure = [];
        }
    }
    return createHash("sha256")
        .update(leafBytes)
        .update("\n--closure--\n")
        .update(closure.join("\n"))
        .digest("hex");
}

// ── The band grammar (MIRRORS scripts/proof-ba-gestalt.mjs's parseExpect/evalBand) ──
// The roster expect-cell grammar: `meanL=lo..hi`, `meanChroma>=v`, `meanChroma<=v`,
// `meanAlpha<v`/`>v`, `topDelta<=v` (the OKLab pixel axes). Arm B re-applies the SAME
// grammar to the EMBEDDED per-region digest — a frozen/re-stamped digest whose stats
// drift the band REDs. Re-stated here (not imported) because the gate is device-free
// and the embedded digest is its own shape; the grammar is a pure ~20-line core.
function parseExpect(cell) {
    const preds = [];
    for (const part of String(cell ?? "").split(/[;,]/)) {
        const t = part.trim();
        if (!t) continue;
        let mm;
        if ((mm = t.match(/^(\w+)\s*=\s*([0-9.]+)\.\.([0-9.]+)$/)))
            preds.push({ key: mm[1], lo: parseFloat(mm[2]), hi: parseFloat(mm[3]) });
        else if ((mm = t.match(/^(\w+)\s*(>=|<=|>|<)\s*([0-9.]+)$/)))
            preds.push({ key: mm[1], op: mm[2], val: parseFloat(mm[3]) });
    }
    return preds;
}
function evalBand(stats, preds) {
    const fails = [];
    for (const p of preds) {
        const v = stats?.[p.key];
        if (!Number.isFinite(v)) {
            fails.push(`${p.key} unread`);
            continue;
        }
        if (p.lo !== undefined) {
            if (v < p.lo || v > p.hi) fails.push(`${p.key} ${v.toFixed(3)} ∉ [${p.lo},${p.hi}]`);
        } else {
            const ok =
                p.op === ">=" ? v >= p.val :
                p.op === "<=" ? v <= p.val :
                p.op === ">" ? v > p.val :
                v < p.val;
            if (!ok) fails.push(`${p.key} ${v.toFixed(3)} not ${p.op} ${p.val}`);
        }
    }
    return { ok: fails.length === 0, fails };
}

// webkit.{glass,goo} accepts "pass" (live safaridriver paint) OR "drop" (the
// safaridriver-or-DROP documented path — AllowRemoteAutomation unset, DROP-WITH-TRIGGER,
// the SOURCE arm certifies it). "fail"/missing/anything-else REDs.
const WEBKIT_OK = new Set(["pass", "drop"]);

/**
 * The PURE verdict over a parsed attestation object. Re-applies the freshness
 * recompute + the band grammar + the renderer/verdict/webkit guards. PURE over
 * (attestation, root) so `--evaluate` and the self-test exercise it deterministically.
 *
 * @param {any} att the parsed SHIP-ATTESTATION.json (or null = absent)
 * @param {{root?:string}} [opts]
 * @returns {{ok:boolean, violations:string[], facts:object}}
 */
export function evaluateAttestation(att, { root = ROOT } = {}) {
    const violations = [];
    const facts = { present: att != null };
    if (att == null) {
        violations.push("[absent] docs/tranches/BG/SHIP-ATTESTATION.json is absent — no live ship-ceremony has run (born-RED ground state; the tag is BLOCKED until `release.sh` runs `--run ship` on Metal)");
        return { ok: false, violations, facts };
    }

    // (1) verdict — a skeleton / FAIL / unverified attestation REDs (a green skeleton
    // re-creates the source-green/visually-broken trap at the META level).
    facts.verdict = att.verdict ?? null;
    if (att.verdict !== "pass")
        violations.push(`[verdict] attestation verdict is "${att.verdict ?? "MISSING"}" (expect "pass") — a FAIL/unverified/skeleton ship-block leaves the path unverified`);

    // (2) renderer — a software-rasterizer shoot certifies the WRONG ground (anti-
    // SwiftShader; the §K.1 UNMASKED_RENDERER falsifier). Unknown/unprovable also REDs.
    const rc = classifyRenderer(att.renderer?.unmaskedRenderer ?? att.renderer ?? null);
    facts.renderer = { verdict: rc.verdict, renderer: rc.renderer };
    if (rc.isSoftware !== false)
        violations.push(`[renderer] the ship render was captured on a ${rc.verdict} renderer ("${rc.renderer ?? "unknown"}") — a software-rasterizer (SwiftShader/llvmpipe/Basic-Render) shoot certifies the WRONG ground; the ship-attestation MUST be a real-GPU capture`);

    // (3) freshness — recompute the surfaceHash at HEAD; a stale digest (a re-stamp /
    // frozen / skip of an old render) REDs. THE bypass-closer mechanism.
    const recomputed = computeSurfaceHash(root);
    facts.surfaceHash = { embedded: att.surfaceHash ?? null, recomputed };
    if (typeof att.surfaceHash !== "string" || !att.surfaceHash)
        violations.push("[stale] attestation carries no surfaceHash — the freshness binding is absent (a render that cannot be proven current)");
    else if (att.surfaceHash !== recomputed)
        violations.push(`[stale] embedded surfaceHash ${att.surfaceHash.slice(0, 12)}… ≠ HEAD-recomputed ${recomputed.slice(0, 12)}… — the paint-closure (surface-closure.mjs SOURCE + the transitive paint-source LIST) DRIFTED since capture; re-run "release.sh --run ship" before the tag`);

    // (4) the per-region pixel DIGEST — re-apply the band grammar (re-stamp/frozen/skip
    // whose stats drift the band REDs; the paint-teeth, not just presence).
    const surfaces = Array.isArray(att.surfaces) ? att.surfaces : [];
    facts.surfaceCount = surfaces.length;
    if (!surfaces.length) {
        violations.push("[digest] attestation embeds no per-region surfaces[] digest — the paint-teeth cannot be re-applied");
    } else {
        const bandFails = [];
        for (const s of surfaces) {
            const preds = parseExpect(s.expect);
            if (!preds.length) {
                bandFails.push(`${s.surface}/${s.mode}: no expect band declared`);
                continue;
            }
            const band = evalBand(s.stats ?? {}, preds);
            if (!band.ok) bandFails.push(`${s.surface}/${s.mode}: ${band.fails.join(", ")} [${s.expect}]`);
        }
        facts.bandFails = bandFails.length;
        if (bandFails.length)
            violations.push(`[digest] ${bandFails.length} surface(s) read OUTSIDE the warm-translucent expect band: ${bandFails.slice(0, 4).join(" · ")}${bandFails.length > 4 ? " …" : ""}`);
    }

    // (5) webkit.{glass,goo} — pass OR the documented safaridriver-or-DROP; fail/absent REDs.
    const wk = att.webkit ?? {};
    facts.webkit = { glass: wk.glass ?? null, goo: wk.goo ?? null };
    for (const k of ["glass", "goo"]) {
        if (!WEBKIT_OK.has(wk[k]))
            violations.push(`[webkit] webkit.${k} is "${wk[k] ?? "MISSING"}" (expect "pass", or "drop" for the documented safaridriver-or-DROP path) — the Safari paint verdict is absent/failed`);
    }

    return { ok: violations.length === 0, violations, facts };
}

/** Read + parse the attestation file at `path`, or null if absent/unparseable. */
function readAttestation(path) {
    if (!existsSync(path)) return null;
    try {
        return JSON.parse(readFileSync(path, "utf8"));
    } catch {
        return { verdict: "unparseable" }; // a corrupt file is a FAIL, not "absent"
    }
}

// ── The `--evaluate <path>` verdict CORE (the self-test subprocess target) ──────────
// Evaluate ONE attestation file and exit 0 (clean) / 1 (any violation). The
// self-test spawns this over synthetic fixtures; `runShip()` (Arm A) may also call it
// to self-verify the attestation it just wrote.
function runEvaluate(path) {
    const att = readAttestation(path);
    const { ok, violations } = evaluateAttestation(att, { root: ROOT });
    if (!ok) {
        console.error(`[proof:ship-attestation --evaluate] FAIL (${violations.length}):`);
        for (const v of violations) console.error(`  x ${v}`);
    } else {
        console.log("[proof:ship-attestation --evaluate] PASS — the attestation is fresh, real-GPU, in-band, webkit-OK.");
    }
    process.exit(ok ? 0 : 1);
}

// ── The structural self-test (subprocess differential; born-RED → GREEN) ────────────
// Build synthetic attestation fixtures, spawn `--evaluate` over each, assert the
// exit-code differential. The valid fixture carries the REAL HEAD surfaceHash (so the
// freshness recompute MATCHES) and an in-band per-region digest → GREEN (exit 0); each
// forgery → RED (exit 1). The differential proves the gate is load-bearing.
const SELFTEST_DIR = resolve(ROOT, ".cache/ship-attestation-selftest");
const SELF = fileURLToPath(import.meta.url);

function inBandSurfaces() {
    // Two surfaces with hand-set IN-BAND stats (warm-translucent: L mid, chroma in
    // [0.02,0.22], topDelta small). These satisfy the band so ONLY the mutated axis
    // distinguishes the GREEN fixture from each RED one.
    return [
        { surface: "dock", mode: "light", expect: "meanL=0.40..0.99;meanChroma>=0.020;meanChroma<=0.22;topDelta<=0.12", stats: { meanL: 0.91, meanChroma: 0.045, meanAlpha: 0.55, topDelta: 0.03 } },
        { surface: "aurora", mode: "dark", expect: "meanL=0.30..0.99;meanChroma>=0.020;meanChroma<=0.30", stats: { meanL: 0.62, meanChroma: 0.08, meanAlpha: 0.6 } },
    ];
}

function baseAttestation(realHash) {
    return {
        schema: "bg-ship-attestation/v1",
        tranche: "BG",
        verdict: "pass",
        capturedAt: new Date(0).toISOString(),
        capturedCommit: "selftest",
        surfaceHash: realHash,
        renderer: { unmaskedRenderer: "ANGLE (Apple, Apple M3 Pro, OpenGL 4.1 Metal - 89.3)", verdict: "hardware-metal", isSoftware: false },
        surfaces: inBandSurfaces(),
        webkit: { glass: "pass", goo: "pass", version: "Safari 26.0 / WebKit 620.1.16", lens: "degraded" },
    };
}

function spawnEvaluate(path) {
    const res = spawnSync(process.execPath, [SELF, "--evaluate", path], {
        cwd: ROOT,
        encoding: "utf8",
        env: { ...process.env },
    });
    return { status: res.status ?? 1, out: `${res.stdout ?? ""}\n${res.stderr ?? ""}` };
}

function runSelfTest() {
    const realHash = computeSurfaceHash(ROOT);
    rmSync(SELFTEST_DIR, { recursive: true, force: true });
    mkdirSync(SELFTEST_DIR, { recursive: true });
    const checks = [];
    try {
        // Each fixture: a name, the attestation object (or null), the expected exit,
        // and the violation TAG the RED legs must name (proving the right clause bit).
        const valid = baseAttestation(realHash);
        const stale = { ...baseAttestation(realHash), surfaceHash: "0".repeat(64) };
        const failVerdict = { ...baseAttestation(realHash), verdict: "unverified" };
        const swraster = { ...baseAttestation(realHash), renderer: { unmaskedRenderer: "Google SwiftShader", verdict: "software", isSoftware: true } };
        const bandFail = { ...baseAttestation(realHash), surfaces: [{ surface: "dock", mode: "light", expect: "meanChroma>=0.020;meanChroma<=0.22", stats: { meanL: 0.695, meanChroma: 0.001, meanAlpha: 0.9 } }] };
        const webkitFail = { ...baseAttestation(realHash), webkit: { glass: "fail", goo: "pass" } };

        const fixtures = [
            { id: "valid-fresh-green", att: valid, expect: 0, tag: null },
            { id: "stale-hash-red", att: stale, expect: 1, tag: "stale" },
            { id: "fail-verdict-red", att: failVerdict, expect: 1, tag: "verdict" },
            { id: "software-raster-red", att: swraster, expect: 1, tag: "renderer" },
            { id: "band-fail-red", att: bandFail, expect: 1, tag: "digest" },
            { id: "webkit-fail-red", att: webkitFail, expect: 1, tag: "webkit" },
        ];
        for (const fx of fixtures) {
            const p = join(SELFTEST_DIR, `${fx.id}.json`);
            writeFileSync(p, JSON.stringify(fx.att, null, 2));
            const { status, out } = spawnEvaluate(p);
            const exitOk = status === fx.expect;
            const tagOk = fx.tag == null ? true : new RegExp(`\\[${fx.tag}\\]`).test(out);
            checks.push({ id: fx.id, ok: exitOk && tagOk, detail: `exit ${status} (expect ${fx.expect})${fx.tag ? `, names [${fx.tag}]: ${tagOk}` : ""}` });
        }
        // The ABSENT leg — a non-existent path must RED (the born-RED ground state).
        const absent = join(SELFTEST_DIR, "does-not-exist.json");
        const { status: aStatus, out: aOut } = spawnEvaluate(absent);
        checks.push({ id: "absent-red", ok: aStatus === 1 && /\[absent\]/.test(aOut), detail: `exit ${aStatus} (expect 1), names [absent]` });
    } finally {
        rmSync(SELFTEST_DIR, { recursive: true, force: true });
    }
    return checks;
}

function run() {
    const ARTIFACT = gateArtifactPath("GLASS_UI_SHIP_ATTESTATION_ARTIFACT", "BG-ship-attestation");
    const violations = [];
    const facts = {};

    // ── The structural self-test FIRST (the mechanism MUST be sound) ────────────────
    const selfChecks = runSelfTest();
    const selfFailed = selfChecks.filter((c) => !c.ok);
    facts.selfTest = {
        total: selfChecks.length,
        passing: selfChecks.length - selfFailed.length,
        validGreen: selfChecks.find((c) => c.id === "valid-fresh-green")?.ok ?? false,
        legs: selfChecks.map((c) => `${c.id}:${c.ok ? "✓" : "✗"}`),
    };
    for (const c of selfFailed)
        violations.push(`[self-test] ${c.id} — ${c.detail} (the bypass-closer mechanism is BROKEN: the subprocess differential failed)`);

    // ── The REAL attestation check (born-RED on HEAD: absent → RED, the tag-blocker) ─
    const att = readAttestation(SHIP_ATTESTATION_PATH);
    const real = evaluateAttestation(att, { root: ROOT });
    facts.attestation = { path: SHIP_ATTESTATION_REL, present: real.facts.present, ...real.facts };
    for (const v of real.violations) violations.push(v);

    const status = violations.length === 0 ? "pass" : "fail";
    writeGateArtifact(ARTIFACT, { generatedAt: snapshotStamp(), status, command: COMMAND, facts, violations });

    console.log("proof:ship-attestation — Arm B, the tag-push BYPASS-CLOSER (BG.W-SHIP-DISCIPLINE-LIVE-PRECONDITION; [\"ci\",\"release\"])");
    console.log(`  attestation          : ${SHIP_ATTESTATION_REL} — ${real.facts.present ? `present (verdict ${facts.attestation.verdict})` : "ABSENT (born-RED ground state — the live ship-ceremony has not run)"}`);
    console.log(`  surfaceHash (HEAD)   : ${computeSurfaceHash(ROOT).slice(0, 16)}… (surface-closure.mjs SOURCE + ${(facts.attestation.surfaceCount ?? 0)} ? embedded surfaces)`);
    console.log(`  self-test (subproc)  : ${facts.selfTest.passing}/${facts.selfTest.total} legs — ${facts.selfTest.legs.join(" ")}`);
    if (violations.length) {
        console.log("\nVIOLATIONS:");
        for (const v of violations) console.log(`  x ${v}`);
    }
    console.log(`\n  status: ${status.toUpperCase()}`);
    console.log("  NOTE: a ship-attestation is written ONLY by `release.sh --run ship` on a real Mac/Metal GPU (Arm A).");
    console.log("        Arm B (this gate) is the device-free freshness enforcer registered [\"ci\",\"release\"] — it REDs the");
    console.log("        git-push→release.yml→npm-publish path until that ceremony commits a fresh, in-band, real-GPU attestation.");
    process.exit(status === "pass" ? 0 : 1);
}

// CLI dispatch (guarded so importing the leaf — runShip(), the self-test subprocess —
// never runs the gate). `--evaluate <path>` is the verdict CORE the self-test spawns.
if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
    const arg = process.argv[2];
    if (arg === "--evaluate") {
        const p = process.argv[3];
        if (!p) {
            console.error("usage: proof-ship-attestation.mjs --evaluate <attestation.json>");
            process.exit(2);
        }
        runEvaluate(resolve(p));
    } else {
        run();
    }
}

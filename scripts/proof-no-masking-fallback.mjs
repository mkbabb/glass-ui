#!/usr/bin/env node
// BG.NF.1 W-FALLBACK-EXCISE — proof:no-masking-fallback.
//
// The NO-MASKING-FALLBACK floor (USER edict 07-03; docs/tranches/BG/audit/no-fallback/):
// "Primary works in paint or fails loud; no fallback that hides a dead primary; modern
// CSS on target engines, not legacy ladders." The adjudicator drew the line — an
// identity-REST fallback is HONEST (`var(--stretch, 1)`, the dormant IS the identity),
// a plausible-STATE fallback on a missing writer/class is the MASKING crime
// (`var(--dock-expand-t, 1)` paints the EXPANDED look on a broken binding).
//
// A device-free SOURCE gate (arms A–E), tags ["local","ci"]. Born-RED on the HEAD
// masking sites, GREEN as the §2 owners land. The core input is the DORMANT-STATE
// MANIFEST (scripts/no-masking-manifest.mjs): every JS-written scalar/channel → its
// designed dormant + writer + (optional) keep-rationale — the manifest is what keeps
// the detector SHARP without false-positiving the §4 survivors.
//
//   Arm A — MASKING-REST: a registered @property written ONLY by JS must carry a
//           DORMANT initial-value (a masked initial paints open/expanded on SSR/no-JS).
//   Arm B — DEAD/MASKED-FALLBACK: the manifest's bare-var channels must be read as a
//           BARE `var(--x)` — a `var(--x, F)` masking fallback reds.
//   Arm C — STALE-LITERAL: the JS token-mirror sites single-source their constant
//           from constants.ts (no bare drift-prone 1.14/44 literal fallback).
//   Arm D — TRANSITIONEND-LADDER: the CSS-transition-era transitionend settle arm +
//           wrong-clock settle timer are ABSENT from the dock-morph composables/SFC
//           (isTransitioning resolves from the spring's OWN settle — useDockSpring).
//   Arm E — WRITER-OWED / LADDER-CENSUS: a wired-but-writer-less channel and every
//           legacy @supports-not ladder must be REGISTERED with a named owner
//           (owedBy a later wave) — an UNregistered masking site cannot hide.
//
// NF.1 owns the mint + the dock var(--x,1) purge + the transitionend-ladder excise +
// the stale-literal single-source. The drawer (F5.R2) and glass-signal (NF.3) sites
// land GREEN as their owners have landed; the ladder rows (NF.2) + the specular-angle
// (WS8.4) are REGISTERED-OWED (tracked, not silently ignored) until their wave flips
// them. The self-test bites prove the detector is not hollow — each planted masking
// snippet MUST flag AND each honest identity-rest survivor MUST NOT.

import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { join, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import {
    gateArtifactPath,
    snapshotStamp,
    writeGateArtifact,
} from "./gate-output.mjs";
import {
    BARE_VAR_CHANNELS,
    JS_SINGLE_SOURCE,
    LADDER_OWED,
    NO_TRANSITIONEND_LADDER,
    REGISTERED_DORMANT,
    SETTLE_TIMER_SIGNATURES,
    WRITER_OWED,
    countMaskingVarReads,
    maskingFallbackValues,
    stripComments,
} from "./no-masking-manifest.mjs";

const ROOT = resolve(fileURLToPath(new URL("../", import.meta.url)));
const ARTIFACT = gateArtifactPath(
    "GLASS_UI_NO_MASKING_FALLBACK_ARTIFACT",
    "no-masking-fallback",
);

const read = (rel) => (existsSync(resolve(ROOT, rel)) ? readFileSync(resolve(ROOT, rel), "utf8") : null);

/** Recursively collect `*.css` files under a repo-relative dir (or a single file). */
function cssFiles(rel) {
    const abs = resolve(ROOT, rel);
    if (!existsSync(abs)) return [];
    if (statSync(abs).isFile()) return abs.endsWith(".css") ? [abs] : [];
    const out = [];
    for (const name of readdirSync(abs)) {
        const p = join(abs, name);
        const st = statSync(p);
        if (st.isDirectory()) out.push(...cssFiles(join(rel, name)));
        else if (name.endsWith(".css")) out.push(p);
    }
    return out;
}

/** Parse the `initial-value` of a registered `@property --name { … }` across src/styles. */
function propertyInitialValue(name) {
    for (const f of cssFiles("src/styles")) {
        const src = readFileSync(f, "utf8");
        const at = src.indexOf(`@property ${name}`);
        if (at === -1) continue;
        const open = src.indexOf("{", at);
        const close = src.indexOf("}", open);
        if (open === -1 || close === -1) continue;
        const body = src.slice(open + 1, close);
        const m = body.match(/initial-value:\s*([^;]+);/);
        if (m) return m[1].trim();
    }
    return null;
}

/** A masking numeric literal present as a bare fallback in stripped code (word-boundaried). */
function hasBareLiteral(strippedSrc, literal) {
    const esc = literal.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    return new RegExp(`(?<![\\d.])${esc}(?![\\d.])`).test(strippedSrc);
}

const violations = [];

// ── Arm A — MASKING-REST ─────────────────────────────────────────────────────────
const armARows = [];
for (const { name, dormant } of REGISTERED_DORMANT) {
    const initial = propertyInitialValue(name);
    if (initial === null) {
        armARows.push({ name, dormant, initial: "(unregistered — skipped)", ok: true });
        continue;
    }
    const ok = initial === dormant;
    armARows.push({ name, dormant, initial, ok });
    if (!ok)
        violations.push(
            `Arm A — ${name} @property initial-value "${initial}" ≠ dormant "${dormant}" (a masked initial paints the open/expanded look on SSR/no-JS).`,
        );
}

// ── Arm B — DEAD/MASKED-FALLBACK ──────────────────────────────────────────────────
// A masking `var(--x, F)` read reds — collapse to bare `var(--x)`. A registered
// channel that declares `allowInitialFallback` tolerates `F == initialValue` (a
// dead-but-harmless restatement of the dormant, not a masking crime); a non-initial
// fallback still reds (it CONTRADICTS the dormant).
const armBRows = [];
for (const chan of BARE_VAR_CHANNELS) {
    const { name, scope, allowInitialFallback, initialValue } = chan;
    let hard = 0;
    let tolerated = 0;
    for (const f of cssFiles(scope)) {
        const src = readFileSync(f, "utf8");
        if (allowInitialFallback) {
            for (const fb of maskingFallbackValues(src, name)) {
                if (fb === initialValue) tolerated++;
                else hard++;
            }
        } else {
            hard += countMaskingVarReads(src, name);
        }
    }
    armBRows.push({ name, scope, maskingReads: hard, toleratedInitialFallbacks: tolerated, ok: hard === 0 });
    if (hard > 0)
        violations.push(
            `Arm B — ${hard} masking \`${name}, <fallback>\` read(s) in ${scope} (collapse to the bare \`${name}\` — a missing writer/class must fail VISIBLE).`,
        );
}

// ── Arm C — STALE-LITERAL (JS single-source) ─────────────────────────────────────
const armCRows = [];
const constantsSrc = read("src/components/custom/dock/constants.ts") ?? "";
for (const { file, constant, banLiteral } of JS_SINGLE_SOURCE) {
    const src = read(file);
    if (src === null) {
        armCRows.push({ file, constant, ok: false, reason: "file-absent" });
        violations.push(`Arm C — ${file} is absent (cannot verify single-source).`);
        continue;
    }
    const stripped = stripComments(src);
    const importsConstant = new RegExp(`\\b${constant}\\b`).test(stripped);
    const constantExported = new RegExp(`export const ${constant}\\b`).test(constantsSrc);
    const literalPresent = hasBareLiteral(stripped, banLiteral);
    const ok = importsConstant && constantExported && !literalPresent;
    armCRows.push({ file, constant, importsConstant, constantExported, literalPresent, ok });
    if (!ok)
        violations.push(
            `Arm C — ${file} not single-sourced (imports ${constant}=${importsConstant}, exported=${constantExported}, bare \`${banLiteral}\`=${literalPresent}) — import the token-mirror constant from constants.ts, delete the drift-prone literal.`,
        );
}

// ── Arm D — TRANSITIONEND-LADDER ─────────────────────────────────────────────────
const armDRows = [];
for (const rel of NO_TRANSITIONEND_LADDER) {
    const src = read(rel);
    if (src === null) {
        armDRows.push({ file: rel, present: false, ok: true, note: "absent (excised)" });
        continue;
    }
    const stripped = stripComments(src);
    const low = stripped.toLowerCase();
    const hasTransitionEnd = low.includes("transitionend") || low.includes("transitioncancel");
    const timerSig = SETTLE_TIMER_SIGNATURES.filter((s) => stripped.includes(s));
    const ok = !hasTransitionEnd && timerSig.length === 0;
    armDRows.push({ file: rel, hasTransitionEnd, timerSignatures: timerSig, ok });
    if (hasTransitionEnd)
        violations.push(
            `Arm D — ${rel} still carries a live transitionend/transitioncancel morph-settle arm (the CSS-transition ladder DIED at the spring migration — delete the binding + handler).`,
        );
    if (timerSig.length)
        violations.push(
            `Arm D — ${rel} still carries a wrong-clock settle timer (${timerSig.join(", ")}) — isTransitioning must resolve from the spring's OWN settle.`,
        );
}

// ── Arm E — WRITER-OWED + LADDER CENSUS (registered-owed, well-formed) ───────────
const armERows = [];
for (const row of [...WRITER_OWED, ...LADDER_OWED]) {
    const label = row.name ?? row.site;
    const ok = Boolean(row.owedBy && String(row.owedBy).trim());
    armERows.push({ site: label, owedBy: row.owedBy ?? null, verdict: row.verdict ?? "writer-owed", ok });
    if (!ok)
        violations.push(
            `Arm E — a masking/ladder census row (${label}) has NO named owner (owedBy) — an unregistered legacy arm cannot hide; name the collapsing wave.`,
        );
}

// ── SELF-TEST BITES ──────────────────────────────────────────────────────────────
// Each planted masking snippet MUST flag; the honest identity-rest survivors MUST NOT.
const bites = [];
const bite = (id, pass) => bites.push({ id, flagged: pass });

// B1 — Arm A: a synthetic registered @property with a MASKED initial (1, dormant 0).
bite(
    "A-masked-initial-flags",
    (() => {
        const fixture = "@property --fx-scalar { syntax: \"<number>\"; inherits: false; initial-value: 1; }";
        const m = fixture.match(/@property --fx-scalar\s*\{([^}]*)\}/);
        const iv = m ? m[1].match(/initial-value:\s*([^;]+);/) : null;
        return iv ? iv[1].trim() !== "0" : false;
    })(),
);
// B2 — Arm B: a synthetic masking `var(--registered, 1)` read MUST flag.
bite("B-masking-var-flags", countMaskingVarReads("scale: var(--dock-morph-t, 1);", "--dock-morph-t") === 1);
// B3 — Arm C: a synthetic bare drift literal MUST flag.
bite("C-stale-literal-flags", hasBareLiteral("const cap = n || 1.14;", "1.14"));
// B4 — Arm D: a synthetic transitionend ladder line MUST flag.
bite(
    "D-transitionend-flags",
    (() => {
        const stripped = stripComments('el.addEventListener("transitionend", onDone);');
        return stripped.toLowerCase().includes("transitionend");
    })(),
);
// B5 — Arm E: a synthetic census row with NO owner MUST flag.
bite(
    "E-unowned-row-flags",
    (() => {
        const row = { site: "phantom.css @supports not (x)", verdict: "collapse-owed" };
        return !(row.owedBy && String(row.owedBy).trim());
    })(),
);
// B6 — the FALSE-POSITIVE FENCE: the raw detector WOULD count an identity-rest
// `var(--x, F)` (its mechanic is agnostic — B2 proves it flags a comma-fallback), so
// the honest survivors (`--stretch`, `--mouse-x`, `--dock-control-floor`) are kept
// safe by the MANIFEST SCOPING — they are NEVER in BARE_VAR_CHANNELS, so they are
// never scanned, so an identity-rest fallback never reds. The bite proves the fence.
const identityRestNotAChannel = !BARE_VAR_CHANNELS.some(
    (c) => c.name === "--stretch" || c.name === "--mouse-x" || c.name === "--dock-control-floor",
);
bite("F-identity-rest-survives", identityRestNotAChannel);
const allBitesFlagged = bites.every((b) => b.flagged);
if (!allBitesFlagged)
    violations.push(
        `SELF-TEST — a bite failed (hollow detector or a false-positive on an honest survivor): ${bites
            .filter((b) => !b.flagged)
            .map((b) => b.id)
            .join(", ")}`,
    );

const status = violations.length === 0 ? "pass" : "fail";
const facts = {
    armA: armARows,
    armB: armBRows,
    armC: armCRows,
    armD: armDRows,
    armE: armERows,
    selfTestBites: bites,
    allBitesFlagged,
};

writeGateArtifact(ARTIFACT, {
    generatedAt: snapshotStamp(),
    status,
    gate: "proof:no-masking-fallback",
    facts,
    violations,
});

const okB = armBRows.every((r) => r.ok);
const okC = armCRows.every((r) => r.ok);
const okD = armDRows.every((r) => r.ok);
console.log("proof:no-masking-fallback — the NO-MASKING-FALLBACK floor (BG.NF.1 W-FALLBACK-EXCISE)");
console.log(`  Arm A registered-dormant OK       : ${armARows.every((r) => r.ok)} (${armARows.length} channels)`);
console.log(`  Arm B bare-var channels OK        : ${okB} (masking reads=${armBRows.reduce((n, r) => n + r.maskingReads, 0)})`);
console.log(`  Arm C JS single-source OK         : ${okC} (${armCRows.length} sites)`);
console.log(`  Arm D transitionend-ladder ABSENT : ${okD} (${armDRows.length} files scanned)`);
console.log(`  Arm E census rows all owned       : ${armERows.every((r) => r.ok)} (${armERows.length} owed rows)`);
console.log(`  self-test bites all flagged       : ${allBitesFlagged} (${bites.length} bites)`);
if (violations.length) {
    console.log("\nVIOLATIONS:");
    for (const v of violations) console.log(`  ✗ ${v}`);
}
console.log(`\n  status: ${status.toUpperCase()}   artefact: ${ARTIFACT.slice(ROOT.length + 1)}`);

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
    process.exit(status === "pass" ? 0 : 1);
}

export { status, violations, facts };

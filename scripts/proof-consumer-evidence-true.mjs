#!/usr/bin/env node
// BI.W-VIRTUAL-TRUTH — proof:consumer-evidence-true, the consumer-truth gate.
//
// THE CLASS THIS KILLS — the fabricated-liveness consumer-evidence lie (FAM-16
// DOC-4 + the border-progress class, killed GENERICALLY, not per-doc). A
// consumer-evidence note earns a library surface its keep by pointing at a REAL
// consumer. Two lies rot that record:
//
//   • DOC-4 (the /virtual lie) — a doc asserts the surface is PUBLISHED via a
//     `@mkbabb/glass-ui/<sub>` subpath and names an external consumer to justify
//     it, but the named consumer imports a LOCAL FORK (or nothing) — ZERO
//     resolving external importers of the claimed published subpath. The grep
//     that "proved" it only proved the consumer uses *a* symbol of that name,
//     never that it consumes the glass-ui subpath.
//   • the border-progress class — a doc names a sibling-repo consumer file that
//     has since been DELETED. The evidence dangles onto a path that is gone.
//
// The cure is disk-following, not hand-maintained. For every consumer-evidence
// doc the gate:
//
//   CE1 — sibling-existence. Every sibling-repo consumer path a doc cites
//         (`../<repo>/…​.{vue,ts,tsx,js,mjs}`) must EXIST on disk. A doc citing a
//         deleted consumer REDs. (Ellipsis shorthands `…/.../…` are skipped; a
//         sibling whose repo ROOT is absent from the checkout is SKIPPED — the
//         CI monorepo-layout-cascade fence: you cannot verify what is not
//         checked out.)
//   CE-PUB — published-liveness truth. A doc that PRESENT-TENSE asserts the
//         surface ships/is published via `@mkbabb/glass-ui/<sub>` AND cites ≥1
//         sibling consumer must have ≥1 of those present siblings actually
//         IMPORT `@mkbabb/glass-ui/<sub>` (`from "@mkbabb/glass-ui/<sub>"` /
//         `import("@mkbabb/glass-ui/<sub>")`). A local-fork import (`@/…`) or no
//         import at all does NOT resolve — the published-liveness is fabricated,
//         RED. (All cited siblings' repos absent → SKIP, unverifiable.)
//
// The false-positive floor is load-bearing: a doc that HONESTLY records a
// consumer as forked-away / retired — no present-tense publish claim — must
// PASS. Recording a fork honestly is the point of the correction, not a new lie.
//
// BORN-RED at HEAD: `use-virtual-section-window.md` asserts publication via
// `@mkbabb/glass-ui/virtual` (its BC un-retire justification) yet its sole cited
// external consumer (words `DefinitionContentView`) imports the words-LOCAL fork
// `@/composables/virtual` — 0 resolving external importers. GREEN when
// BI.W-VIRTUAL-TRUTH corrects the doc to the retire terminal state (the subpath
// retires, the mechanism is internal-only, words is recorded forked).
//
// STRUCTURAL / doc-truth wave — NO π (zero pixels). Device-free static disk read
// (the source-read house pattern, so it can never itself go stale). Each clause
// carries a self-test bite (the gate-coherence discipline): a regressed shape
// REDs the clause, run inline every invocation. Tagged ["local","ci"] by the
// registrar.

import { existsSync, readFileSync, readdirSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { gateArtifactPath, snapshotStamp, writeGateArtifact } from "./gate-output.mjs";

const ROOT = resolve(fileURLToPath(new URL("../", import.meta.url)));
const COMMAND = "npm run proof:consumer-evidence-true";
const EVIDENCE_DIR = "docs/consumer-evidence";

// ── Extraction primitives (pure; shared by the live run and the self-tests) ────

// A sibling-repo consumer path token: `../<repo>/<…>.{ext}`. Line/col suffixes
// (`:162`) and trailing punctuation are excluded by ending the match at the ext.
const SIBLING_PATH = /\.\.\/[\w.-]+\/[\w./-]*\.(?:vue|ts|tsx|js|mjs)/g;
// A subpath token `@mkbabb/glass-ui/<sub>` — the published surface reference.
const SUBPATH_TOKEN = /@mkbabb\/glass-ui\/([\w-]+)/g;
// A PRESENT-TENSE publish assertion co-located (same sentence) with a subpath
// token: `published … via @mkbabb/glass-ui/<sub>`, `ships on …/<sub>`, etc. The
// verb set is deliberately narrow — "imports"/"consumes"/"NOT from"/"RETIRED"
// are NOT publish assertions, so an honest fork/retire record never matches.
const PUBLISH_CLAIM =
    /\b(?:published|publishes|publication|ships?|available)\b[^.\n]{0,90}@mkbabb\/glass-ui\/([\w-]+)/gi;

const matchAll = (re, s) => {
    const out = [];
    for (const m of s.matchAll(re)) out.push(m);
    return out;
};

// The `../<repo>` root prefix of a sibling path (`../words`, `../speedtest`, …).
const siblingRepoRoot = (relPath) => {
    const m = relPath.match(/^(\.\.\/[\w.-]+)\//);
    return m ? m[1] : null;
};

const isEllipsis = (p) => p.includes("...");

const importsSubpath = (fileText, sub) =>
    new RegExp(
        `(?:from|import\\s*\\()\\s*["']@mkbabb/glass-ui/${sub}["']`,
    ).test(fileText);

/**
 * Evaluate ONE consumer-evidence doc. Pure over an injected resolver so the
 * self-tests drive it with synthetic docs + a synthetic checkout.
 *   resolve.repoPresent(repoRoot) → boolean (is the sibling repo checked out)
 *   resolve.fileExists(relPath)   → boolean
 *   resolve.readFile(relPath)     → string ("" if absent)
 * Returns { ce1: {pass, skipped, detail}, cePub: {pass, fired, skipped, detail} }.
 */
export function evaluateDoc(name, text, resolver) {
    // ── CE1 — every cited, present-repo sibling path exists ──
    const sibPaths = [...new Set(matchAll(SIBLING_PATH, text).map((m) => m[0]))]
        .filter((p) => !isEllipsis(p));
    const ce1Missing = [];
    let ce1Skipped = 0;
    for (const p of sibPaths) {
        const root = siblingRepoRoot(p);
        if (!root || !resolver.repoPresent(root)) {
            ce1Skipped += 1;
            continue; // repo not checked out — unverifiable, do not fail
        }
        if (!resolver.fileExists(p)) ce1Missing.push(p);
    }
    const ce1 = {
        pass: ce1Missing.length === 0,
        skipped: ce1Skipped,
        detail:
            ce1Missing.length === 0
                ? `${sibPaths.length - ce1Skipped} cited sibling consumer path(s) resolve on disk (${ce1Skipped} skipped: repo absent)`
                : `cited sibling consumer path(s) DELETED / absent: ${ce1Missing.join(" | ")}`,
    };

    // ── CE-PUB — a present-tense publish claim needs a resolving external importer ──
    const claims = matchAll(PUBLISH_CLAIM, text);
    let cePub = { pass: true, fired: false, skipped: false, detail: "no present-tense publish claim — CE-PUB inert" };
    if (claims.length > 0) {
        cePub.fired = true;
        const badClaims = [];
        let anySkipped = false;
        for (const c of claims) {
            const sub = c[1];
            // Present-repo siblings this doc cites.
            const presentSibs = sibPaths.filter((p) => {
                const root = siblingRepoRoot(p);
                return root && resolver.repoPresent(root);
            });
            if (presentSibs.length === 0) {
                anySkipped = true; // all cited siblings' repos absent — cannot verify
                continue;
            }
            const resolvingImporter = presentSibs.some(
                (p) => resolver.fileExists(p) && importsSubpath(resolver.readFile(p), sub),
            );
            if (!resolvingImporter) badClaims.push(`@mkbabb/glass-ui/${sub}`);
        }
        cePub.skipped = anySkipped;
        cePub.pass = badClaims.length === 0;
        cePub.detail = cePub.pass
            ? anySkipped
                ? `publish claim(s) present; external-importer check SKIPPED (cited siblings' repos absent)`
                : `every published subpath a consumer-evidence doc claims has ≥1 resolving external importer`
            : `published subpath claimed with ZERO resolving external importer (named consumer imports a local fork / not the subpath): ${badClaims.join(", ")}`;
    }

    return { ce1, cePub };
}

// ── Live resolver (real checkout) ──────────────────────────────────────────────
const liveResolver = {
    repoPresent: (repoRoot) => existsSync(resolve(ROOT, repoRoot)),
    fileExists: (relPath) => existsSync(resolve(ROOT, relPath)),
    readFile: (relPath) => {
        const p = resolve(ROOT, relPath);
        return existsSync(p) ? readFileSync(p, "utf8") : "";
    },
};

// ── Self-test bites (synthetic docs over a synthetic checkout) ─────────────────
// A fake checkout: `../ghost` is PRESENT with exactly one file that imports a
// local fork; every other path is absent.
const SELF_FILES = {
    "../ghost/frontend/src/Consumer.vue": `import { x } from '@/composables/x';\n`,
    "../ghost/frontend/src/Adopter.vue": `import { y } from '@mkbabb/glass-ui/realsub';\n`,
};
const selfResolver = {
    repoPresent: (repoRoot) => repoRoot === "../ghost",
    fileExists: (relPath) => relPath in SELF_FILES,
    readFile: (relPath) => SELF_FILES[relPath] ?? "",
};

function selfTest() {
    const bites = [];
    const bite = (id, pass, detail) => bites.push({ id, pass, detail });

    // BITE-1 — phantom: cites a DELETED sibling in a present repo → CE1 REDs.
    {
        const r = evaluateDoc(
            "phantom",
            "consumer at `../ghost/frontend/src/Deleted.vue`",
            selfResolver,
        );
        bite("bite-phantom-deleted-sibling-reds-ce1", r.ce1.pass === false, r.ce1.detail);
    }
    // BITE-2 — fabricated publish: claims publication + cites a present sibling
    // that imports a LOCAL FORK (not the subpath) → CE-PUB REDs.
    {
        const r = evaluateDoc(
            "fabricated",
            "published via `@mkbabb/glass-ui/ghostsub`. consumer `../ghost/frontend/src/Consumer.vue` uses it.",
            selfResolver,
        );
        bite("bite-fabricated-publish-reds-cepub", r.cePub.fired && r.cePub.pass === false, r.cePub.detail);
    }
    // BITE-3 — false-positive floor: an INTERNAL surface honestly records a
    // forked-away consumer (NO present-tense publish claim) → PASSES.
    {
        const r = evaluateDoc(
            "forked-honest",
            "The mechanism is internal-only. words forked away: `../ghost/frontend/src/Consumer.vue` imports `@/composables/x`, NOT `@mkbabb/glass-ui/ghostsub`.",
            selfResolver,
        );
        bite(
            "bite-honest-fork-record-passes",
            r.ce1.pass === true && r.cePub.fired === false && r.cePub.pass === true,
            `ce1=${r.ce1.pass} cePubFired=${r.cePub.fired} cePub=${r.cePub.pass}`,
        );
    }
    // BITE-4 — positive floor: publication claim + a present sibling that DOES
    // import the subpath → CE-PUB PASSES.
    {
        const r = evaluateDoc(
            "adopted",
            "published via `@mkbabb/glass-ui/realsub`. consumer `../ghost/frontend/src/Adopter.vue`.",
            selfResolver,
        );
        bite("bite-real-importer-passes-cepub", r.cePub.fired && r.cePub.pass === true, r.cePub.detail);
    }
    return bites;
}

// ── Run ────────────────────────────────────────────────────────────────────────
function run() {
    const dirAbs = resolve(ROOT, EVIDENCE_DIR);
    const docs = readdirSync(dirAbs)
        .filter((f) => f.endsWith(".md") && f !== "README.md")
        .sort();

    const checks = [];
    const facts = { evidenceDocs: docs.length, ce1Failures: [], cePubFailures: [], cePubFired: [] };

    for (const f of docs) {
        const text = readFileSync(resolve(dirAbs, f), "utf8");
        const { ce1, cePub } = evaluateDoc(f, text, liveResolver);
        if (!ce1.pass) facts.ce1Failures.push({ doc: f, detail: ce1.detail });
        if (cePub.fired) facts.cePubFired.push(f);
        if (cePub.fired && !cePub.pass) facts.cePubFailures.push({ doc: f, detail: cePub.detail });
    }

    checks.push({
        id: "ce1-sibling-consumer-existence",
        pass: facts.ce1Failures.length === 0,
        detail:
            facts.ce1Failures.length === 0
                ? `every cited sibling-repo consumer path resolves on disk across ${docs.length} consumer-evidence doc(s) (repo-absent paths skipped)`
                : facts.ce1Failures.map((e) => `${e.doc}: ${e.detail}`).join("  ||  "),
    });
    checks.push({
        id: "cepub-published-liveness-resolves",
        pass: facts.cePubFailures.length === 0,
        detail:
            facts.cePubFailures.length === 0
                ? `every doc that claims a published @mkbabb/glass-ui/<sub> subpath (${facts.cePubFired.length} fired) has ≥1 resolving external importer`
                : facts.cePubFailures.map((e) => `${e.doc}: ${e.detail}`).join("  ||  "),
    });

    const bites = selfTest();
    facts.selfTest = bites;
    checks.push({
        id: "self-test-bites",
        pass: bites.every((b) => b.pass),
        detail: bites.every((b) => b.pass)
            ? `${bites.length}/${bites.length} coherence bites GREEN (phantom-deleted · fabricated-publish · honest-fork-floor · real-importer)`
            : bites.filter((b) => !b.pass).map((b) => `${b.id}: ${b.detail}`).join("  ||  "),
    });

    const failed = checks.filter((c) => !c.pass);
    const pass = failed.length === 0;

    console.log("proof:consumer-evidence-true — the consumer-truth gate (BI.W-VIRTUAL-TRUTH)");
    console.log(`  ${checks.filter((c) => c.pass).length}/${checks.length} pass`);
    for (const c of checks) console.log(`    ${c.pass ? "✓" : "✗"} ${c.id} — ${c.detail}`);

    const ARTIFACT = gateArtifactPath("GATE_CONSUMER_EVIDENCE_TRUE_OUT", "BI-consumer-evidence-true");
    writeGateArtifact(ARTIFACT, {
        generatedAt: snapshotStamp(),
        status: pass ? "pass" : "fail",
        gate: "proof:consumer-evidence-true",
        command: COMMAND,
        note: "CE1 every cited sibling-repo consumer path resolves on disk (border-progress dangling-consumer class; repo-absent paths skipped — the CI monorepo-layout fence). CE-PUB a doc that present-tense claims publication via @mkbabb/glass-ui/<sub> + cites a sibling consumer must have ≥1 resolving external importer (DOC-4 fabricated-liveness class). Device-free; born-RED on the /virtual doc at HEAD → GREEN by the retire terminal state; 4-bite self-test. The B8 retire waves EXTEND this gate (SPEEDTEST-ONLY-PAIR / BORDER-PROGRESS-RETIRE / METRICS-DEMO KEEP-guard).",
        facts,
        checks: checks.map((c) => ({ id: c.id, pass: c.pass, detail: c.detail })),
    });

    if (!pass) {
        console.error(`\n[proof:consumer-evidence-true] ${failed.length} check(s) FAILED:`);
        for (const c of failed) console.error(`  ✗ ${c.id} — ${c.detail}`);
        process.exit(1);
    }
    console.log(
        "\n[proof:consumer-evidence-true] every consumer-evidence doc is disk-true — no dangling sibling consumer, no fabricated published-liveness (a claimed subpath with zero resolving external importer). The DOC-4 + border-progress class is killed generically.",
    );
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
    run();
}

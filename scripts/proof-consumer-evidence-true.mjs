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

// ── The metrics KEEP-guard arm (BI.W-METRICS-DEMO) ─────────────────────────────
// THE CLASS THIS KILLS — the FAM-10 "speedtest-only sextet" premise (XR-3): the
// metric family (metric-cell/metric-stack/metric-badge/instrument-chassis/pulse,
// metric-badge spanning all three) is a THREE-repo public surface (speedtest +
// muster + sci-report), NOT a speedtest-transfer candidate. A relocate/retire on
// the false premise silently breaks muster + sci-report. Two arms, both device-free:
//   M1 — KEEP-guard. The five metric subpaths stay PUBLISHED (package.json exports
//        + the src/subpaths barrel). A silent drop of any one REDs (the break-guard).
//        (metric-pill was RETIRED at BI.W-S-METRIC-PILL-DELETE — the sole clean
//        in-repo overfit-delete; the cell/stack/badge SHARED-KEEP arms stay.)
//   M2 — doc-truth. docs/consumer-evidence/metrics.md records the 3-repo
//        consumption (≥3 of muster/sci-report/speedtest cited), AND no
//        consumer-evidence doc asserts the metric family is speedtest-only /
//        overfit-to-move (a corrected-away lie re-surfacing REDs).
const REQUIRED_METRIC_SUBPATHS = [
    "metric-cell",
    "metric-stack",
    "metric-badge",
    "instrument-chassis",
    "pulse",
];
const METRICS_DOC = "metrics.md"; // read at docs/consumer-evidence/metrics.md
const METRIC_TARGET_REPOS = ["../muster", "../sci-report", "../speedtest"];
// A metric-FAMILY token in prose. Deliberately NOT the bare demo path `/data/metrics`
// (needs the hyphen/space + a family leaf), so a demo-page mention never trips M2.
const METRIC_TOKEN =
    /metrics?[- ](?:family|cell|stack|badge|pill|row)|instrument-chassis|\bpulse\b/i;
// The overfit / relocate lie shape.
const METRIC_OVERFIT_LIE =
    /speedtest[- ]only|speedtest[- ]transfer|overfit|move(?:d|s)?\s+to\s+speedtest|relocate\s+to\s+speedtest|metrics?[- ]relocate/i;
// A refutation / correction marker on the SAME line rescues an honest correction
// (the false-positive floor — recording the corrected truth is the point, not a lie).
const METRIC_REFUTATION =
    /\b(?:not|never|false|corrected?|stays?|stay|three[- ]repo|3[- ]repo|refut\w*|no longer|isn'?t|is not|premise|wrong)\b/i;

/** M1 — the metric-family KEEP-guard. Pure over injected package/tree facts. */
export function evaluateMetricKeep({ exportsKeys, subpathFiles }) {
    const missing = [];
    for (const sub of REQUIRED_METRIC_SUBPATHS) {
        if (!exportsKeys.has(`./${sub}`)) missing.push(`exports["./${sub}"]`);
        if (!subpathFiles.has(sub)) missing.push(`src/subpaths/${sub}.ts`);
    }
    return {
        pass: missing.length === 0,
        detail:
            missing.length === 0
                ? `the metric family stays published — ${REQUIRED_METRIC_SUBPATHS.length} subpaths (exports + src barrel) all present (the muster/sci-report break-guard)`
                : `metric-family surface DROPPED (a metrics move on the false speedtest-only premise silently breaks muster + sci-report): ${missing.join(", ")}`,
    };
}

/** M2 — metric consumer-truth. Pure over the consumer-evidence docs array
 * ([{ name, text }, …]). POSITIVE: metrics.md records the 3-repo surface.
 * NEGATIVE: no doc line asserts speedtest-only/overfit for the family. */
export function evaluateMetricConsumerTruth({ docs }) {
    const metricsDoc = docs.find((d) => d.name === METRICS_DOC);
    let positive;
    if (!metricsDoc) {
        positive = {
            pass: false,
            detail: `the metric family's 3-repo consumption is NOT recorded — docs/consumer-evidence/${METRICS_DOC} is absent`,
        };
    } else {
        const repos = new Set(
            matchAll(SIBLING_PATH, metricsDoc.text)
                .map((m) => siblingRepoRoot(m[0]))
                .filter((r) => r && METRIC_TARGET_REPOS.includes(r)),
        );
        positive = {
            pass: repos.size >= 3,
            detail:
                repos.size >= 3
                    ? `${METRICS_DOC} records the 3-repo public surface (${[...repos].sort().join(", ")})`
                    : `${METRICS_DOC} records only ${repos.size}/3 target repos (${[...repos].sort().join(", ") || "none"}); the metric family is a speedtest + muster + sci-report surface`,
        };
    }
    const lies = [];
    for (const d of docs) {
        const lines = d.text.split("\n");
        for (let i = 0; i < lines.length; i++) {
            const ln = lines[i];
            if (
                METRIC_TOKEN.test(ln) &&
                METRIC_OVERFIT_LIE.test(ln) &&
                !METRIC_REFUTATION.test(ln)
            ) {
                lies.push(`${d.name}:${i + 1}`);
            }
        }
    }
    const negative = {
        pass: lies.length === 0,
        detail:
            lies.length === 0
                ? "no consumer-evidence doc claims the metric family / instrument-chassis / pulse is speedtest-only or overfit-to-move"
                : `metric-family speedtest-only / overfit claim survives (the corrected-away lie re-surfaced): ${lies.join(", ")}`,
    };
    return { positive, negative, pass: positive.pass && negative.pass };
}

// ── The border-progress retire arm (BI.W-BORDER-PROGRESS-RETIRE) ───────────────
// THE CLASS THIS KILLS — the "born ≥2 by construction" published-subpath lie: a
// subpath minted on a cross-repo-adopt justification that never landed (0 binary
// consumers — the sibling hand-rolls its own mechanism), then kept published on a
// FALSE "born ≥2" claim. Three SOURCE-anchored arms, device-free + regen-independent
// (the package.json export removal is the DERIVED regen owned by
// proof:subpath-classify's EXACT_REPRODUCTION + proof:subpath-enumeration's
// BATCH-EQUIV; this arm follows the SOURCE-of-truth artefacts the wave itself lands):
//   BP1 — subpath source RETIRED. `src/subpaths/border-progress.ts` ABSENT + the
//         `src/api/index.ts` BorderProgress re-export ABSENT + the component barrel
//         `src/components/custom/border-progress/index.ts` PRESENT (banked dormant,
//         demo-only — retire is NOT a delete). A re-published mirror / re-added /api
//         re-export REDs; a deleted banked component ALSO REDs.
//   BP2 — doc-truth. NO consumer-evidence doc carries an UNREFUTED "born ≥2 by
//         construction" claim, AND `border-progress.md` records the honest demo-only
//         status + the named speedtest re-entry.
//   BP3 — completion-seal WATCHLIST. completion-seal STAYS published (a `./completion-seal`
//         export key) + `completion-seal.md` carries the WATCHLIST annotation (the
//         milder OFIT-3 case: 1 honest own-demo consumer, present evidence doc).
const BP_MIRROR = "src/subpaths/border-progress.ts";
const BP_API = "src/api/index.ts";
const BP_COMPONENT = "src/components/custom/border-progress/index.ts";
// An `export … from "../components/custom/border-progress"` re-export (the /api
// publication surface). Word-anchored on `export … from` so a plain prose mention
// of the path in a retire-note comment never trips it.
const BP_API_REEXPORT = /export\s[^;]*from\s*["']\.\.\/components\/custom\/border-progress["']/;
const BP_DOC = "border-progress.md";
const CS_DOC = "completion-seal.md";
// The "born ≥2" published-subpath lie shape.
const BORN_TWO_LIE = /born\s*(?:≥|>=|>)\s*2\b/i;
// A refutation / correction marker on the SAME line rescues an honest record (the
// false-positive floor — the phrase exists in these docs ONLY to be struck).
const BORN_TWO_REFUTATION =
    /\b(?:false|not|never|no longer|no surviving|retired?|wrong|refut\w*|hand-roll|struck|strike|absent|gone|zero|was\s+false|did\s*n['’o]t|0\s+binary)\b/i;
// border-progress.md honesty markers.
const BP_DEMO_ONLY = /demo-only|0 binary consumer|zero binary consumer|banked dormant/i;
const BP_REENTRY = /speedtest/i;
const CS_WATCHLIST = /watchlist/i;

/** BP1 — the subpath-source retire check. Pure over injected source facts. */
export function evaluateBorderProgressSubpath({ mirrorAbsent, apiReexportAbsent, componentPresent }) {
    const problems = [];
    if (!mirrorAbsent) problems.push(`${BP_MIRROR} PRESENT — the retired subpath mirror is re-published`);
    if (!apiReexportAbsent) problems.push(`${BP_API} still re-exports BorderProgress* from ../components/custom/border-progress — the retired subpath's /api surface survives`);
    if (!componentPresent) problems.push(`${BP_COMPONENT} ABSENT — the component must STAY banked dormant (the retire is a subpath un-publish, NOT a delete)`);
    return {
        pass: problems.length === 0,
        detail:
            problems.length === 0
                ? "the /border-progress subpath source is RETIRED — mirror gone + /api re-export gone + the component barrel BANKED present (demo-only). The package.json export removal is the derived regen (subpath-policy PUBLISH→INTERNAL → regen-exports --write), machine-locked by proof:subpath-classify + proof:subpath-enumeration."
                : problems.join("  ||  "),
    };
}

/** BP2 — doc-truth. Pure over the consumer-evidence docs array. NEGATIVE: no
 * unrefuted "born ≥2 by construction" claim survives. POSITIVE: border-progress.md
 * records the honest demo-only status + the named speedtest re-entry. */
export function evaluateBorderProgressDocTruth({ docs }) {
    const lies = [];
    for (const d of docs) {
        const lines = d.text.split("\n");
        for (let i = 0; i < lines.length; i++) {
            if (BORN_TWO_LIE.test(lines[i]) && !BORN_TWO_REFUTATION.test(lines[i])) lies.push(`${d.name}:${i + 1}`);
        }
    }
    const negative = {
        pass: lies.length === 0,
        detail:
            lies.length === 0
                ? 'no consumer-evidence doc carries an unrefuted "born ≥2 by construction" published-subpath claim'
                : `an unrefuted "born ≥2 by construction" claim survives (the corrected-away lie re-surfaced): ${lies.join(", ")}`,
    };
    const bpDoc = docs.find((d) => d.name === BP_DOC);
    let positive;
    if (!bpDoc) {
        positive = { pass: false, detail: `docs/consumer-evidence/${BP_DOC} ABSENT — the honest demo-only retire record is required` };
    } else {
        const demoOnly = BP_DEMO_ONLY.test(bpDoc.text);
        const reentry = BP_REENTRY.test(bpDoc.text);
        positive = {
            pass: demoOnly && reentry,
            detail:
                demoOnly && reentry
                    ? `${BP_DOC} records the honest demo-only / 0-binary-consumer status + the named speedtest re-entry`
                    : `${BP_DOC} is missing the ${!demoOnly ? "demo-only/0-binary-consumer status" : "named speedtest re-entry"}`,
        };
    }
    return { positive, negative, pass: positive.pass && negative.pass };
}

/** BP3 — completion-seal WATCHLIST. Pure over the docs array + the published fact. */
export function evaluateCompletionSealWatchlist({ docs, completionSealPublished }) {
    const problems = [];
    if (!completionSealPublished) problems.push("completion-seal is NOT a live export key — the milder WATCHLIST case must STAY published (not retired)");
    const csDoc = docs.find((d) => d.name === CS_DOC);
    if (!csDoc) problems.push(`docs/consumer-evidence/${CS_DOC} ABSENT`);
    else if (!CS_WATCHLIST.test(csDoc.text)) problems.push(`${CS_DOC} carries NO WATCHLIST annotation (demo-only, ≥2-binary unmet)`);
    return {
        pass: problems.length === 0,
        detail:
            problems.length === 0
                ? "completion-seal STAYS published + completion-seal.md carries the WATCHLIST annotation (demo-only, ≥2-binary unmet — the milder OFIT-3 case, not retired)"
                : problems.join("  ||  "),
    };
}

// ── The speedtest-only-pair arm (BI.W-SPEEDTEST-ONLY-PAIR) ─────────────────────
// THE CLASS THIS KILLS — the speedtest-only overfit remainder (XR-3 / UF-K1): a
// library surface whose ONLY binary consumer is speedtest (the ≥2-repo bar UNMET),
// kept published (scrolling-text) or kept as its own overlay root (icon-tooltip)
// instead of relocating to the sole consumer's repo / folding onto the survivor
// mechanism. Two SOURCE-anchored arms, device-free + regen-independent (the
// package.json export removal is the DERIVED regen owned by proof:subpath-classify's
// EXACT_REPRODUCTION + proof:subpath-enumeration's BATCH-EQUIV; this arm follows the
// SOURCE-of-truth artefacts the wave lands + the crossrepo-asks:bi roster):
//   SP1 — scrolling-text RETIRE-RELOCATE. The component barrel, the subpath mirror,
//         the root-barrel re-export, AND the demo story are ALL DEFINITION-ABSENT (a
//         FULL delete — relocate to speedtest, NOT a bank), AND the speedtest ADOPT ask
//         is recorded on the crossrepo-asks:bi roster. A re-added mirror / component /
//         barrel re-export / demo story REDs; a missing ADOPT ask REDs.
//   SP2 — icon-tooltip FOLD-onto-Tooltip. IconTooltip is a Tooltip PRESET (it composes
//         the ui/tooltip family — the BI.W-OVERLAY-UNION mechanism fold), NOT its own
//         overlay root, AND the speedtest ADOPT ask is recorded. A bespoke IconTooltip
//         that does NOT compose Tooltip REDs; a deleted preset REDs; a missing ADOPT ask REDs.
const ST_COMPONENT = "src/components/custom/scrolling-text/index.ts";
const ST_MIRROR = "src/subpaths/scrolling-text.ts";
const ST_DEMO = "demo/stories/data/scrolling-text.vue";
const ST_SRC_INDEX = "src/index.ts";
// A root-barrel `export … from "./components/custom/scrolling-text"` re-export (the
// root publication surface). Word-anchored on `export … from` so a plain prose mention
// of the path in a retire-note comment never trips it.
const ST_BARREL_REEXPORT = /export\s[^;]*from\s*["']\.\/components\/custom\/scrolling-text["']/;
const IT_COMPONENT = "src/components/custom/icon-tooltip/IconTooltip.vue";
// IconTooltip composes the ui/tooltip family (the preset shape) rather than a bespoke root.
const IT_TOOLTIP_IMPORT = /from\s*["']\.\.\/\.\.\/ui\/tooltip["']/;
// The crossrepo-asks:bi roster + the ADOPT ask id tokens the wave files there.
const ASKS_ROSTER = "docs/tranches/BI/coordination/asks-and-consumes.md";
const ST_ADOPT_ASK = "speedtest-scrolling-text-relocate";
const IT_ADOPT_ASK = "speedtest-icon-tooltip-to-tooltip-preset";

/** SP1 — scrolling-text RETIRE-RELOCATE. Pure over injected source facts + roster fact. */
export function evaluateScrollingTextRetire({ componentAbsent, mirrorAbsent, barrelReexportAbsent, demoAbsent, adoptAskRecorded }) {
    const problems = [];
    if (!componentAbsent) problems.push(`${ST_COMPONENT} PRESENT — the relocated component is re-published (the retire is a FULL delete, relocate to speedtest — NOT a bank)`);
    if (!mirrorAbsent) problems.push(`${ST_MIRROR} PRESENT — the retired subpath mirror survives`);
    if (!barrelReexportAbsent) problems.push(`${ST_SRC_INDEX} still re-exports ScrollingText from ./components/custom/scrolling-text — the root-barrel surface survives`);
    if (!demoAbsent) problems.push(`${ST_DEMO} PRESENT — the retired demo story survives`);
    if (!adoptAskRecorded) problems.push(`the "${ST_ADOPT_ASK}" speedtest ADOPT ask is NOT recorded on ${ASKS_ROSTER} (the inv-11 relocate ask unfiled)`);
    return {
        pass: problems.length === 0,
        detail:
            problems.length === 0
                ? `the /scrolling-text subpath + component are RETIRE-RELOCATED (component barrel + mirror + root-barrel re-export + demo story DEFINITION-ABSENT) + the speedtest ADOPT ask recorded. The package.json export removal is the derived regen (subpath-policy drop → regen-exports --write), machine-locked by proof:subpath-classify + proof:subpath-enumeration.`
                : problems.join("  ||  "),
    };
}

/** SP2 — icon-tooltip FOLD-onto-Tooltip. Pure over injected source facts + roster fact. */
export function evaluateIconTooltipFold({ componentPresent, composesTooltip, adoptAskRecorded }) {
    const problems = [];
    if (!componentPresent) problems.push(`${IT_COMPONENT} ABSENT — the Tooltip preset must STAY (the fold re-expresses IconTooltip as a Tooltip preset, it is NOT a delete)`);
    else if (!composesTooltip) problems.push(`${IT_COMPONENT} does NOT compose the ui/tooltip family — IconTooltip is still a bespoke overlay root, not the Tooltip preset (the BI.W-OVERLAY-UNION fold regressed)`);
    if (!adoptAskRecorded) problems.push(`the "${IT_ADOPT_ASK}" speedtest ADOPT ask is NOT recorded on ${ASKS_ROSTER} (the Dock.vue + AddressAutocomplete.vue migrate ask unfiled)`);
    return {
        pass: problems.length === 0,
        detail:
            problems.length === 0
                ? "IconTooltip is a Tooltip PRESET (composes the ui/tooltip family — the BI.W-OVERLAY-UNION mechanism fold) + the speedtest ADOPT ask recorded"
                : problems.join("  ||  "),
    };
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
    // BITE-5 — M1 KEEP-guard: a synthetic metric-subpath drop REDs M1.
    {
        const r = evaluateMetricKeep({
            exportsKeys: new Set(["./metric-stack", "./metric-badge", "./instrument-chassis", "./pulse"]), // ./metric-cell dropped
            subpathFiles: new Set(REQUIRED_METRIC_SUBPATHS),
        });
        bite("bite-metric-subpath-drop-reds-m1", r.pass === false, r.detail);
    }
    // BITE-6 — M1 positive floor: the full metric family present → M1 PASSES.
    {
        const r = evaluateMetricKeep({
            exportsKeys: new Set(REQUIRED_METRIC_SUBPATHS.map((s) => `./${s}`)),
            subpathFiles: new Set(REQUIRED_METRIC_SUBPATHS),
        });
        bite("bite-metric-keep-passes-m1", r.pass === true, r.detail);
    }
    // A synthetic honest metrics.md — cites all three target repos + a refutation
    // line that co-locates a metric token, the lie phrase, AND a correction marker
    // (the false-positive floor: an honest correction must PASS).
    const honestMetricsDoc = {
        name: METRICS_DOC,
        text: [
            "muster `../muster/frontend/src/A.vue`; sci-report `../sci-report/x/B.vue`; speedtest `../speedtest/src/C.vue`.",
            "The metric family is NOT speedtest-only — a three-repo surface; the move-to-speedtest premise is FALSE.",
        ].join("\n"),
    };
    // BITE-7 — M2 positive floor: metrics.md ABSENT → M2 REDs.
    {
        const r = evaluateMetricConsumerTruth({ docs: [{ name: "other.md", text: "nothing to see." }] });
        bite("bite-metric-doc-absent-reds-m2", r.positive.pass === false && r.pass === false, r.positive.detail);
    }
    // BITE-8 — M2 negative guard: a re-added speedtest-only metric claim → M2 REDs.
    {
        const r = evaluateMetricConsumerTruth({
            docs: [
                honestMetricsDoc,
                { name: "stale.md", text: "the metric family is speedtest-only and must move to speedtest's repo." },
            ],
        });
        bite("bite-metric-overfit-claim-reds-m2", r.negative.pass === false && r.pass === false, r.negative.detail);
    }
    // BITE-9 — M2 positive floor: an honest metrics.md (3 repos, refutation ok) → M2 PASSES.
    {
        const r = evaluateMetricConsumerTruth({ docs: [honestMetricsDoc] });
        bite("bite-honest-metrics-passes-m2", r.pass === true, `positive=${r.positive.pass} negative=${r.negative.pass}`);
    }

    // ── BP arm bites (BI.W-BORDER-PROGRESS-RETIRE) ─────────────────────────────
    // BITE-BP1a — a re-published subpath mirror REDs BP1 (the liveness teeth).
    {
        const r = evaluateBorderProgressSubpath({ mirrorAbsent: false, apiReexportAbsent: true, componentPresent: true });
        bite("bite-bp-republished-mirror-reds-bp1", r.pass === false, r.detail);
    }
    // BITE-BP1b — a DELETED banked component REDs BP1 (retire is a subpath un-publish, NOT a delete).
    {
        const r = evaluateBorderProgressSubpath({ mirrorAbsent: true, apiReexportAbsent: true, componentPresent: false });
        bite("bite-bp-deleted-component-reds-bp1", r.pass === false, r.detail);
    }
    // BITE-BP1c — the honest retired state (mirror+api gone, component banked) PASSES.
    {
        const r = evaluateBorderProgressSubpath({ mirrorAbsent: true, apiReexportAbsent: true, componentPresent: true });
        bite("bite-bp-retired-banked-passes-bp1", r.pass === true, r.detail);
    }
    const honestBpDoc = { name: "border-progress.md", text: "retire-subpath — banked dormant, demo-only; 0 binary consumers. Re-entry = the speedtest adopt ASK." };
    // BITE-BP2a — a re-added unrefuted "born ≥2 by construction" claim REDs BP2 (negative teeth).
    {
        const r = evaluateBorderProgressDocTruth({ docs: [honestBpDoc, { name: "stale.md", text: "border-progress is born ≥2 by construction." }] });
        bite("bite-bp-born-two-lie-reds-bp2", r.negative.pass === false && r.pass === false, r.negative.detail);
    }
    // BITE-BP2b — border-progress.md ABSENT REDs BP2 (positive floor).
    {
        const r = evaluateBorderProgressDocTruth({ docs: [{ name: "other.md", text: "nothing here." }] });
        bite("bite-bp-doc-absent-reds-bp2", r.positive.pass === false && r.pass === false, r.positive.detail);
    }
    // BITE-BP2c — the honest demo-only record (a REFUTED 'born ≥2' mention) PASSES BP2.
    {
        const r = evaluateBorderProgressDocTruth({ docs: [{ name: "border-progress.md", text: 'the "born ≥2 by construction" claim was FALSE; demo-only, banked dormant; re-entry = the speedtest adopt.' }] });
        bite("bite-bp-honest-record-passes-bp2", r.pass === true, `positive=${r.positive.pass} negative=${r.negative.pass}`);
    }
    // BITE-BP3a — completion-seal UNPUBLISHED REDs BP3 (the milder case must STAY published).
    {
        const r = evaluateCompletionSealWatchlist({ docs: [{ name: "completion-seal.md", text: "WATCHLIST — demo-only, ≥2 unmet." }], completionSealPublished: false });
        bite("bite-cs-unpublished-reds-bp3", r.pass === false, r.detail);
    }
    // BITE-BP3b — published but NO WATCHLIST annotation REDs BP3.
    {
        const r = evaluateCompletionSealWatchlist({ docs: [{ name: "completion-seal.md", text: "keep-current, no annotation." }], completionSealPublished: true });
        bite("bite-cs-no-watchlist-reds-bp3", r.pass === false, r.detail);
    }
    // BITE-BP3c — published + WATCHLIST annotation PASSES BP3 (the floor).
    {
        const r = evaluateCompletionSealWatchlist({ docs: [{ name: "completion-seal.md", text: "WATCHLIST — demo-only, ≥2 unmet." }], completionSealPublished: true });
        bite("bite-cs-watchlist-passes-bp3", r.pass === true, r.detail);
    }

    // ── SP arm bites (BI.W-SPEEDTEST-ONLY-PAIR) ────────────────────────────────
    // BITE-SP1a — a re-added scrolling-text component REDs SP1 (the liveness teeth).
    {
        const r = evaluateScrollingTextRetire({ componentAbsent: false, mirrorAbsent: true, barrelReexportAbsent: true, demoAbsent: true, adoptAskRecorded: true });
        bite("bite-st-republished-component-reds-sp1", r.pass === false, r.detail);
    }
    // BITE-SP1b — a retired scrolling-text with the ADOPT ask MISSING REDs SP1 (the ask teeth).
    {
        const r = evaluateScrollingTextRetire({ componentAbsent: true, mirrorAbsent: true, barrelReexportAbsent: true, demoAbsent: true, adoptAskRecorded: false });
        bite("bite-st-missing-adopt-ask-reds-sp1", r.pass === false, r.detail);
    }
    // BITE-SP1c — the honest retire-relocate (all source absent + ask recorded) PASSES SP1.
    {
        const r = evaluateScrollingTextRetire({ componentAbsent: true, mirrorAbsent: true, barrelReexportAbsent: true, demoAbsent: true, adoptAskRecorded: true });
        bite("bite-st-retire-relocate-passes-sp1", r.pass === true, r.detail);
    }
    // BITE-SP2a — a bespoke IconTooltip (does NOT compose Tooltip) REDs SP2 (the fold teeth).
    {
        const r = evaluateIconTooltipFold({ componentPresent: true, composesTooltip: false, adoptAskRecorded: true });
        bite("bite-it-bespoke-root-reds-sp2", r.pass === false, r.detail);
    }
    // BITE-SP2b — a DELETED preset REDs SP2 (the fold re-expresses, it is NOT a delete).
    {
        const r = evaluateIconTooltipFold({ componentPresent: false, composesTooltip: false, adoptAskRecorded: true });
        bite("bite-it-deleted-preset-reds-sp2", r.pass === false, r.detail);
    }
    // BITE-SP2c — the Tooltip preset (composes ui/tooltip) + ADOPT ask recorded PASSES SP2.
    {
        const r = evaluateIconTooltipFold({ componentPresent: true, composesTooltip: true, adoptAskRecorded: true });
        bite("bite-it-tooltip-preset-passes-sp2", r.pass === true, r.detail);
    }
    // BITE-SP2d — a folded IconTooltip with the ADOPT ask MISSING REDs SP2 (the ask teeth).
    {
        const r = evaluateIconTooltipFold({ componentPresent: true, composesTooltip: true, adoptAskRecorded: false });
        bite("bite-it-missing-adopt-ask-reds-sp2", r.pass === false, r.detail);
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

    const docTexts = [];
    for (const f of docs) {
        const text = readFileSync(resolve(dirAbs, f), "utf8");
        docTexts.push({ name: f, text });
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

    // ── M1 — the metric-family KEEP-guard (docs/consumer-evidence/metrics.md is the
    //         evidence record; the subpaths + src barrels stay live) ──
    const pkg = JSON.parse(readFileSync(resolve(ROOT, "package.json"), "utf8"));
    const exportsKeys = new Set(Object.keys(pkg.exports ?? {}));
    const subpathsDir = resolve(ROOT, "src/subpaths");
    const subpathFiles = new Set(
        (existsSync(subpathsDir) ? readdirSync(subpathsDir) : [])
            .filter((f) => f.endsWith(".ts"))
            .map((f) => f.replace(/\.ts$/, "")),
    );
    const m1 = evaluateMetricKeep({ exportsKeys, subpathFiles });
    facts.metricKeep = m1;
    checks.push({ id: "metric-keep-guard", pass: m1.pass, detail: m1.detail });

    // ── M2 — metric consumer-truth (metrics.md records the 3-repo surface; no
    //         doc re-asserts the corrected-away speedtest-only / overfit claim) ──
    const m2 = evaluateMetricConsumerTruth({ docs: docTexts });
    facts.metricConsumerTruth = m2;
    checks.push({
        id: "metric-consumer-truth",
        pass: m2.pass,
        detail: m2.pass
            ? `${m2.positive.detail}; ${m2.negative.detail}`
            : [m2.positive, m2.negative].filter((x) => !x.pass).map((x) => x.detail).join("  ||  "),
    });

    // ── BP1 — the /border-progress subpath source is RETIRED (mirror + /api re-export
    //         gone, component barrel BANKED present). Source-anchored, regen-independent. ──
    const apiText = existsSync(resolve(ROOT, BP_API)) ? readFileSync(resolve(ROOT, BP_API), "utf8") : "";
    const bp1 = evaluateBorderProgressSubpath({
        mirrorAbsent: !existsSync(resolve(ROOT, BP_MIRROR)),
        apiReexportAbsent: !BP_API_REEXPORT.test(apiText),
        componentPresent: existsSync(resolve(ROOT, BP_COMPONENT)),
    });
    facts.borderProgressSubpath = bp1;
    checks.push({ id: "border-progress-subpath-retired", pass: bp1.pass, detail: bp1.detail });

    // ── BP2 — doc-truth: no unrefuted "born ≥2" claim + border-progress.md honest record ──
    const bp2 = evaluateBorderProgressDocTruth({ docs: docTexts });
    facts.borderProgressDocTruth = bp2;
    checks.push({
        id: "border-progress-doc-truth",
        pass: bp2.pass,
        detail: bp2.pass ? `${bp2.positive.detail}; ${bp2.negative.detail}` : [bp2.positive, bp2.negative].filter((x) => !x.pass).map((x) => x.detail).join("  ||  "),
    });

    // ── BP3 — completion-seal WATCHLIST (stays published + carries the annotation) ──
    const bp3 = evaluateCompletionSealWatchlist({ docs: docTexts, completionSealPublished: exportsKeys.has("./completion-seal") });
    facts.completionSealWatchlist = bp3;
    checks.push({ id: "completion-seal-watchlist", pass: bp3.pass, detail: bp3.detail });

    // ── SP1 — scrolling-text RETIRE-RELOCATE (component + mirror + root-barrel re-export
    //         + demo story DEFINITION-ABSENT) + the speedtest ADOPT ask recorded. ──
    const srcIndexText = liveResolver.readFile(ST_SRC_INDEX);
    const asksRosterText = liveResolver.readFile(ASKS_ROSTER);
    const sp1 = evaluateScrollingTextRetire({
        componentAbsent: !existsSync(resolve(ROOT, ST_COMPONENT)),
        mirrorAbsent: !existsSync(resolve(ROOT, ST_MIRROR)),
        barrelReexportAbsent: !ST_BARREL_REEXPORT.test(srcIndexText),
        demoAbsent: !existsSync(resolve(ROOT, ST_DEMO)),
        adoptAskRecorded: asksRosterText.includes(ST_ADOPT_ASK),
    });
    facts.scrollingTextRetire = sp1;
    checks.push({ id: "scrolling-text-retire-relocate", pass: sp1.pass, detail: sp1.detail });

    // ── SP2 — icon-tooltip FOLD-onto-Tooltip (IconTooltip composes ui/tooltip) + ask recorded. ──
    const itText = liveResolver.readFile(IT_COMPONENT);
    const sp2 = evaluateIconTooltipFold({
        componentPresent: existsSync(resolve(ROOT, IT_COMPONENT)),
        composesTooltip: IT_TOOLTIP_IMPORT.test(itText),
        adoptAskRecorded: asksRosterText.includes(IT_ADOPT_ASK),
    });
    facts.iconTooltipFold = sp2;
    checks.push({ id: "icon-tooltip-fold-onto-tooltip", pass: sp2.pass, detail: sp2.detail });

    const bites = selfTest();
    facts.selfTest = bites;
    checks.push({
        id: "self-test-bites",
        pass: bites.every((b) => b.pass),
        detail: bites.every((b) => b.pass)
            ? `${bites.length}/${bites.length} coherence bites GREEN (CE/CE-PUB: phantom-deleted · fabricated-publish · honest-fork-floor · real-importer | metrics M1/M2: drop-reds · keep-passes · doc-absent-reds · overfit-reds · honest-passes | border-progress BP1/BP2/BP3: republished-mirror-reds · deleted-component-reds · retired-banked-passes · born-two-lie-reds · doc-absent-reds · honest-record-passes · cs-unpublished-reds · cs-no-watchlist-reds · cs-watchlist-passes | speedtest-pair SP1/SP2: st-republished-component-reds · st-missing-ask-reds · st-retire-relocate-passes · it-bespoke-root-reds · it-deleted-preset-reds · it-tooltip-preset-passes · it-missing-ask-reds)`
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
        note: "CE1 every cited sibling-repo consumer path resolves on disk (border-progress dangling-consumer class; repo-absent paths skipped — the CI monorepo-layout fence). CE-PUB a doc that present-tense claims publication via @mkbabb/glass-ui/<sub> + cites a sibling consumer must have ≥1 resolving external importer (DOC-4 fabricated-liveness class). M1 (BI.W-METRICS-DEMO) the metric family (metric-cell/metric-stack/metric-badge/instrument-chassis/pulse) stays PUBLISHED — a silent drop reds (the muster/sci-report break-guard, refuting FAM-10's speedtest-only-sextet premise). M2 docs/consumer-evidence/metrics.md records the 3-repo surface (speedtest + muster + sci-report) and no doc re-asserts speedtest-only/overfit for the family. BP1 (BI.W-BORDER-PROGRESS-RETIRE) the /border-progress subpath source is RETIRED (mirror + /api re-export gone, component barrel BANKED present — source-anchored, the package.json export removal is the derived regen owned by proof:subpath-classify/enumeration). BP2 no unrefuted 'born ≥2 by construction' claim survives + border-progress.md records the honest demo-only status + the named speedtest re-entry. BP3 completion-seal STAYS published + carries the WATCHLIST annotation (the milder OFIT-3 case). SP1 (BI.W-SPEEDTEST-ONLY-PAIR) the /scrolling-text subpath + component are RETIRE-RELOCATED to speedtest (component barrel + subpath mirror + root-barrel re-export + demo story DEFINITION-ABSENT — speedtest-only, the ≥2-repo binary bar unmet) + the speedtest ADOPT ask recorded on the crossrepo-asks:bi roster. SP2 icon-tooltip is a Tooltip PRESET (composes ui/tooltip — the BI.W-OVERLAY-UNION mechanism fold, NOT its own overlay root) + the speedtest ADOPT ask recorded. Device-free; 25-bite self-test. The B8 retire waves EXTEND this gate (SPEEDTEST-ONLY-PAIR / BORDER-PROGRESS-RETIRE / METRICS-DEMO KEEP-guard).",
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

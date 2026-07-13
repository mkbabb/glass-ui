// proof:bg-deferred-ledger — BG.W-DEFERRED-LEDGER: the no-silent-drop machine, BUILT this time.
//
// The BE.W-FOLD-LEDGER / BF.W-FOLD-LEDGER disposition machine was itself the deferred item (the
// D11 chronic — `proof:be-fold-ledger` ABSENT, the 32 BF census deferrals + the 70 BE/BF wave
// specs riding UN-DECIDED a third tranche). This gate is the literal cure: it DERIVES the 135-item
// deferred corpus from disk (AX DISPOSITION-REGISTER 31 + BF DEFERRED-CENSUS 32 + BE waves 39 +
// BF waves 31 + in-`src` CONSUME/BOOKED markers 2) and REDs the close on any dropped / undecided /
// blanket-routed / templated / over-concentrated row.
//
// (BH.B1-W3 reconcile: the in-`src` marker count fell 3->2 when the useDragMorph.ts
// `CONSUME(kf snap)` marker was consumed-and-deleted onto kf 5.1.0 native `DragOptions.snap`,
// so the corpus is 135, not 136 — EXPECTED_COUNT tracks the disk.)
//
// It COMPOSES `scripts/lib/fold-ledger-core.mjs` (the DRY leaf proof:bc-fold-ledger also imports —
// the no-clone contract) and adds the THREE BG teeth the §L.11 producer-evasion class demands:
//
//   F2 (a) charter-match           — a BUILD/MET/COORDINATED row's destination is NEVER a
//                                     RETIRE/SWEEP wave (the 23-rows→BG.W-DEAD-GATE-SWEEP evasion);
//                                     a RETIRE lands in a sweep/decide wave; the dest resolves in
//                                     the build-map roster.
//   F4 (b) templated-evidence      — N rows sharing an identical evidence SKELETON (id/wave/path/
//                                     digit-stripped) reds, AND the placeholder phrase is banned —
//                                     a structural skeleton-match, not an evadeable literal list.
//   F5 (c) concentration-ceiling   — ≥24 rows routed to ONE destination reds (no catch-all home).
//
// SELF-TEST (born-RED→GREEN): `node scripts/proof-bg-deferred-ledger.mjs --self-test` runs 9
// synthetic-fixture bites — AX-31-vs-32, de-shadcn-not-a-false-orphan, no-clone, disjoint-namespace,
// F0-scoped no-orphan, charter-match, templated-evidence, concentration, the count assert.
//
// ── §G — the BI liveness/enrollment hardening (BI.W-LEDGER-DETECTOR-HARDEN) ───────────
// The BG detector matched only the `BOOKED:` colon-label form + scanned only `.ts|.vue`, so 8
// bare-word BOOKED markers (2 of them in `.css`) rode INVISIBLE to the no-silent-drop machine
// (DETECTOR-1), and the census verified STRUCTURE never LIVENESS — a LANDED adopt (D27 kf-snap)
// and a terminally-RETIRED idea (deep-glass 20px) both still read DEFER (FAM-12). §G closes both,
// reading the BI ledger bodies (docs/tranches/BI/ledgers/{CHRONIC-DISPOSITIONS,PROMPT-RECAP}.md):
//   Ga bare-word BOOKED enrollment — every in-`src` bare-word `BOOKED` marker's FILE is enrolled
//                                    in the CHRONIC §3 detector-blind marker table (else RED).
//   Gb `.css` marker arm           — the src-marker walk (SRC_MARKER_EXT) covers `.css`.
//   Gc §3 enrollment completeness  — ≥8 dispositioned §3 rows, each with a parseable marker path
//                                    + a terminal disposition verb.
//   Gd fired-trigger DEFER         — an observable-FIRED DEFER-with-trigger (kf-snap republished /
//                                    deep-glass terminally-decided) still-DEFER in FOLD-LEDGER must
//                                    be flipped in CHRONIC §5 with evidence (the D27/deep-glass class).
//   Ge ledger TRUE-UP              — every CHRONIC §5 flip row carries a flip-to + on-disk evidence.
//   Gf re-stamp-discharge          — a re-stamped-chronic (`N+ ⚠`) row without a terminal decide REDs.
//   Gg LEDGER-COLUMN-RESOLVE       — every FORWARD `BI.W-*` disposition-target in the ledger BODIES
//                                    resolves to a real `waves/BI.W-<id>.md` or an ADDENDA mapping.
//                                    (round-12 scope pin: FORWARD targets ONLY — historical
//                                    non-BI `W-*` evidence refs + cross-tranche `BG.`/`BH.` flip-tos
//                                    + ADDENDA left-columns are EVIDENCE, out of scope.)
// §G self-test bites: planted bare-word BOOKED → Ga; `.css` arm absent → Gb; planted fired-trigger
// DEFER → Gd; planted empty §5 flip → Ge; planted un-decided re-stamp → Gf; planted unresolved
// FORWARD target → Gg; a historical evidence ref does NOT false-positive Gg.

import { existsSync, readFileSync, readdirSync } from "node:fs";
import { dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";
import { clausesHit } from "./lib/fold-ledger-core.mjs";

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = join(HERE, "..");

const LEDGER_JSON = join(ROOT, "docs/tranches/BG/FOLD-LEDGER.json");
const LEDGER_DOC = join(ROOT, "docs/tranches/BG/FOLD-LEDGER.md");
const AX_REGISTER = join(ROOT, "docs/tranches/AX/audit/DISPOSITION-REGISTER.json");
const BF_CENSUS = join(ROOT, "docs/tranches/BF/audit/DEFERRED-CENSUS.md");
const BE_WAVES_DIR = join(ROOT, "docs/tranches/BE/waves");
const BF_WAVES_DIR = join(ROOT, "docs/tranches/BF/waves");
const SRC_DIR = join(ROOT, "src");
const BUILD_MAP = join(ROOT, "docs/tranches/BG/execution/bg-build-map.md");
const BC_GATE = join(ROOT, "scripts/proof-bc-fold-ledger.mjs");
const BG_GATE = join(ROOT, "scripts/proof-bg-deferred-ledger.mjs");

const EXPECTED_COUNT = 135;
const AX_EXPECTED = 31; // the AX register is 31 rows, NOT 32 (the chronic mis-count) — bite #1.
const CONCENTRATION_CEILING = 24; // ≥24 rows → one home REDs (tooth c).
const SKELETON_SHARE_THRESHOLD = 4; // ≥4 rows sharing one evidence skeleton REDs (tooth b).
const PLACEHOLDER_PHRASE = "per-ws-coordinated destination is the band-0 build's refinement";

const DISPOSITIONS = new Set([
    "BUILD",
    "MET",
    "COORDINATED",
    "RETIRE",
    "SUPERSEDED",
    "DEFER-with-trigger",
]);
const BUILD_CLASS = new Set(["BUILD", "MET", "COORDINATED"]);

// The build-map charter classes (auditable named constants, like BC's OPEN_DESTS). A SWEEP wave is
// an unconditional dead-code cut (only RETIRE/SUPERSEDED route here — BG.W-DEAD-GATE-SWEEP's own
// build-map line: "a RETIRE/SWEEP charter (no BUILD row routes here)"). A DECIDE wave is a
// build-or-retire / coordinated-decision / ledger wave (accepts BUILD..RETIRE). Every other wave in
// the build-map roster is a BUILD/coordination charter.
const SWEEP_CHARTER = new Set([
    "BG.W-DEAD-GATE-SWEEP",
    "BG.W-DEAD-TOKEN-SWEEP",
    "BG.W-DEAD-COMPOSABLE-CUT",
    "BG.W-CHIP-ALIAS-KILL",
    "BG.W-VIZ-SUBSTRATE-DELETE",
    "BG.W-VIZ-SUBSTRATE-DELETE2",
    "BG.W-DOCK-CAST-RETIRE",
    "BG.W-DOCK-PERSISTENT-CUT",
    "BG.W-SPIKE-DELETE",
    "BG.W-CUT",
]);
const DECIDE_CHARTER = new Set([
    "BG.W-DOCK-CUT",
    "BG.W-JUBILANCE-DECIDE",
    "BG.W-DISPOSITION-RESTAMP",
    "BG.W-BE-BF-LEDGER",
    "BG.W-DEFERRED-LEDGER",
    "BG.W-DS-COMPLETE",
    // F8.7 — the GA-6 RETIRE-in-place charter: the 7 speculative registers flip
    // DEFER-with-trigger → RETIRE here (a ledger-flip DECIDE wave, zero pixels).
    "BG.W-DEFERRAL-DISPOSITIONS",
]);

// ── corpus derivation (the SAME derivation the producer ran) ─────────────────────
function deriveAxIds() {
    return JSON.parse(readFileSync(AX_REGISTER, "utf8")).items.map((r) => r.id);
}
function deriveCensusIds() {
    const ids = [];
    for (const line of readFileSync(BF_CENSUS, "utf8").split("\n")) {
        const m = line.match(/^\|\s*(D\d+)\s*\|/);
        if (m) ids.push(m[1]);
    }
    return ids;
}
function deriveWaveIds(dir) {
    return readdirSync(dir)
        .filter((f) => f.endsWith(".md"))
        .map((f) => f.slice(0, -3));
}
function slugify(s) {
    return s
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");
}
// the src-marker file extensions — `.css` is the Gb arm (a booking may live in a comment in any
// of them). Named so proof:bg-deferred-ledger's own Gb self-test can assert `.css` is covered.
const SRC_MARKER_EXT = /\.(ts|vue|css)$/;
function walkSrc(dir, acc) {
    for (const e of readdirSync(dir, { withFileTypes: true })) {
        const p = join(dir, e.name);
        if (e.isDirectory()) walkSrc(p, acc);
        else if (SRC_MARKER_EXT.test(e.name)) acc.push(p);
    }
    return acc;
}
// in-`src` CONSUME(...)/BOOKED: markers — scoped to .ts/.vue (a README.md marker is EXCLUDED).
// id = `<relpath>#<KIND>#<slug>`; a 2nd marker that would collide in one file gets an index suffix.
function deriveInSrcMarkers() {
    const out = [];
    const seen = new Set();
    for (const file of walkSrc(SRC_DIR, []).sort()) {
        const rel = relative(ROOT, file).split("\\").join("/");
        for (const line of readFileSync(file, "utf8").split("\n")) {
            let kind = null;
            let slug = null;
            const c = line.match(/\bCONSUME\(([^)]+)\)/);
            if (c) {
                kind = "CONSUME";
                slug = slugify(c[1]).split("-").slice(0, 3).join("-");
            } else {
                const b = line.match(/\bBOOKED:\s*(\S+)/);
                if (b) {
                    kind = "BOOKED";
                    slug = slugify(b[1]);
                }
            }
            if (!kind) continue;
            let id = `${rel}#${kind}#${slug}`;
            let n = 2;
            while (seen.has(id)) id = `${rel}#${kind}#${slug}-${n++}`;
            seen.add(id);
            out.push(id);
        }
    }
    return out;
}

// the BG wave roster — every bold `**BG.W-*` introduced in the build map (the single authority).
function deriveBgWaves() {
    if (!existsSync(BUILD_MAP)) return null; // fail-LOUD (never vacuous-green) — see runReal.
    const text = readFileSync(BUILD_MAP, "utf8");
    const set = new Set();
    for (const m of text.matchAll(/\*\*(BG\.W-[A-Z0-9-]+)/g)) set.add(m[1]);
    return set;
}

function buildDerived() {
    const axIds = deriveAxIds();
    const dIds = deriveCensusIds();
    const beIds = deriveWaveIds(BE_WAVES_DIR);
    const bfIds = deriveWaveIds(BF_WAVES_DIR);
    const inSrcIds = deriveInSrcMarkers();
    return {
        sets: {
            "ax-register": new Set(axIds),
            "bf-census": new Set(dIds),
            "be-wave": new Set(beIds),
            "bf-wave": new Set(bfIds),
            "in-src": new Set(inSrcIds),
        },
        counts: {
            "ax-register": axIds.length,
            "bf-census": dIds.length,
            "be-wave": beIds.length,
            "bf-wave": bfIds.length,
            "in-src": inSrcIds.length,
        },
    };
}

// ═══════════════════════════════════════════════════════════════════════════════════
// §G — BI liveness/enrollment hardening (BI.W-LEDGER-DETECTOR-HARDEN). See header block.
// ═══════════════════════════════════════════════════════════════════════════════════

const BI_CHRONIC = join(ROOT, "docs/tranches/BI/ledgers/CHRONIC-DISPOSITIONS.md");
const BI_RECAP = join(ROOT, "docs/tranches/BI/ledgers/PROMPT-RECAP.md");
const BI_WAVES_DIR = join(ROOT, "docs/tranches/BI/waves");
const PKG_JSON = join(ROOT, "package.json");
const GLASS_DEEP = join(ROOT, "src/styles/tokens/glass-deep.css");

const G3_MIN_ROWS = 8; // the detector-blind census is ≥8 markers.
const G5_MIN_ROWS = 10; // the round-1 MET/LANDED true-up correction set.
// a terminal disposition VERB (Gc — a §3 row's disposition cell).
const G_TERMINAL_VERB = /\b(BUILD|FOLD|RETIRE|RETIRED|MET|SUPERSEDED|COORDINATED|RESOLVED|ARCHIVED|open_question)\b/;
// a re-stamped chronic row carries a `N+ ⚠` / `~N ⚠` re-stamp COUNT (NOT the bare `⚠ DISEASE`
// legend). Gf scopes to these.
const G_RESTAMP = /(?:\d+\+|~\d+)\s*⚠/;
// a DECIDE — a bolded terminal disposition OR a bolded BI.W-* owner (a named BUILD wave IS a decide).
const G_DECIDED = /\*\*\s*(?:BUILD|FOLD|RETIRE|RETIRED|MET|SUPERSEDED|COORDINATED|RESOLVED|ARCHIVED|BI\.W-|open_question)/;

// Ga input — every in-`src` BARE-WORD `BOOKED` (an uppercase standalone BOOKED NOT in the
// machine-readable `BOOKED:` label). DEFER is EXCLUDED: it carries a pervasive runtime "defer to X"
// verb sense in src prose; a booking-DEFER is caught by the FOLD-LEDGER DEFER-with-trigger enum + Gd.
function deriveBareWordBookings(files) {
    const out = [];
    for (const file of files) {
        const rel = relative(ROOT, file).split("\\").join("/");
        let n = 0;
        for (const line of readFileSync(file, "utf8").split("\n")) {
            n++;
            // remove label occurrences first so `BOOKED: X` never counts as a bare word.
            const stripped = line.replace(/\bBOOKED:/g, " ");
            if (/\bBOOKED\b/.test(stripped)) out.push({ file: rel, line: n, text: line.trim() });
        }
    }
    return out;
}

// collect the `|`-table DATA rows under a `## <heading>` (skips the header + `|---|` separator).
function tableRowsUnder(text, headingRe) {
    const lines = text.split("\n");
    let i = lines.findIndex((l) => headingRe.test(l));
    if (i < 0) return [];
    const rows = [];
    for (i++; i < lines.length; i++) {
        const l = lines[i];
        if (/^##\s/.test(l)) break; // next section
        if (!/^\s*\|/.test(l)) continue; // non-table line
        if (/^\s*\|[\s|:-]+\|\s*$/.test(l)) continue; // |---| separator
        rows.push(l.split("|").slice(1, -1).map((c) => c.trim()));
    }
    return rows;
}

// §3 — the detector-blind bare-word marker table. id = `src:*`; marker cell carries `<file>:<line>`.
function parseChronic3(chronicText) {
    const out = [];
    for (const cells of tableRowsUnder(chronicText, /^##\s+§3\b/)) {
        if (!cells[0] || !cells[0].startsWith("src:")) continue;
        const fm = (cells[1] || "").match(/([\w./-]+\.(?:ts|vue|css|md))/);
        out.push({ srcId: cells[0], filePath: fm ? fm[1] : "", row: cells.join(" | ") });
    }
    return out;
}

// §5 — the MET/LANDED flip-with-evidence true-up. cols: id | item | stale | evidence | flip-to | probe.
function parseChronic5(chronicText) {
    const out = [];
    for (const cells of tableRowsUnder(chronicText, /^##\s+§5\b/)) {
        if (!cells[0] || cells[0].toLowerCase() === "id") continue;
        out.push({ id: cells[0], evidence: cells[3] || "", flipTo: cells[4] || "" });
    }
    return out;
}

// re-stamped chronic table rows (Gf scope).
function restampedRows(text, doc) {
    const out = [];
    text.split("\n").forEach((line, i) => {
        if (!/^\s*\|/.test(line)) return;
        if (!G_RESTAMP.test(line)) return;
        out.push({ doc, n: i + 1, line });
    });
    return out;
}

// FORWARD `BI.W-*` targets in a ledger BODY (everything before the first `## ADDENDUM` — the
// audit-trail ADDENDA left-columns are the round-12 exempt class). Historical non-BI `W-*` +
// cross-tranche `BG.`/`BH.` refs never match `BI\.W-`, so they cannot false-positive.
function bodyForwardTargets(text) {
    const cut = text.search(/^##\s+ADDENDUM/m);
    const body = cut >= 0 ? text.slice(0, cut) : text;
    const set = new Set();
    for (const m of body.matchAll(/\bBI\.W-[A-Z0-9]+(?:-[A-Z0-9]+)*/g)) set.add(m[0]);
    return [...set];
}

// the ADDENDA mapping resolution: a body target resolves if it appears in either doc's ADDENDA
// section on a line where at least one OTHER `BI.W-*` token resolves to a real wave (the mapped
// owner) — so a phantom mapped to a real owner resolves; a phantom mapped to a phantom does not.
function buildAddendaMap(texts, biWaves) {
    const mapped = new Set();
    for (const text of texts) {
        const cut = text.search(/^##\s+ADDENDUM/m);
        if (cut < 0) continue;
        for (const line of text.slice(cut).split("\n")) {
            const toks = [...line.matchAll(/\bBI\.W-[A-Z0-9]+(?:-[A-Z0-9]+)*/g)].map((m) => m[0]);
            if (toks.length && toks.some((t) => biWaves.has(t))) for (const t of toks) mapped.add(t);
        }
    }
    return mapped;
}

// the observable fired-trigger probes (Gd). Auditable named constants, like BC's OPEN_DESTS.
function computeFiredProbes() {
    let kfSpec = "";
    try {
        const pkg = JSON.parse(readFileSync(PKG_JSON, "utf8"));
        kfSpec = pkg.peerDependencies?.["@mkbabb/keyframes.js"] ?? pkg.devDependencies?.["@mkbabb/keyframes.js"] ?? "";
    } catch {
        /* pkg unreadable → treat as un-fired (never a false-green flip) */
    }
    const kfMajor = parseInt((kfSpec.match(/(\d+)/) || [])[1] || "0", 10);
    const glassDeep = existsSync(GLASS_DEEP) ? readFileSync(GLASS_DEEP, "utf8") : "";
    return [
        // D27: kf republished `DragOptions.snap` past 4.3.0 (the native adopt LANDED at kf 5.x).
        { ledgerIds: ["D27"], name: `kf-snap-republished (kf ${kfSpec || "?"})`, fired: kfMajor >= 5 },
        // deep-glass 20px: terminally DECIDED (retired-at-16px "IDENTITY, not debt") in glass-deep.css.
        {
            ledgerIds: ["BE.W-DEEP-CEILING", "BF.W-DEEP-GLASS-WIRE"],
            name: "deep-glass-terminally-decided (glass-deep.css 16px IS IDENTITY)",
            fired: /IDENTITY,?\s*not\s*debt|16px IS\b/i.test(glassDeep),
        },
    ];
}

// ── §G core check (operates on already-loaded objects so the self-test can feed fixtures) ──
function runGHardening(g) {
    const failures = [];
    const fail = (clause, msg) => failures.push({ clause, msg });
    const { bareWords, chronic3, chronic5, defers, firedProbes, biWaves, addendaMap, bodyTargets, restamped, cssArmPresent } = g;

    // Ga — every in-src bare-word BOOKED marker's file is enrolled in CHRONIC §3.
    const enrolledPaths = chronic3.map((r) => r.filePath).filter(Boolean);
    for (const b of bareWords) {
        if (!enrolledPaths.some((ef) => b.file.endsWith(ef)))
            fail(
                "Ga",
                `in-src bare-word \`BOOKED\` at ${b.file}:${b.line} is not enrolled in CHRONIC §3 — a booking must carry the machine-readable \`BOOKED:\` label OR be dispositioned in the §3 detector-blind marker table (enroll a §3 row whose marker file matches, or strike the marker). — "${b.text.slice(0, 70)}"`,
            );
    }

    // Gb — the `.css` marker arm is present in the src walk.
    if (!cssArmPresent)
        fail("Gb", `the src-marker walk (SRC_MARKER_EXT) does not cover \`.css\` — the segmented-tabs-drag.css bare-word markers ride invisible (the DETECTOR-1 blind spot).`);

    // Gc — §3 enrollment completeness.
    if (chronic3.length < G3_MIN_ROWS)
        fail("Gc", `CHRONIC §3 enrolls ${chronic3.length} bare-word marker rows, expected ≥${G3_MIN_ROWS} (the detector-blind census).`);
    for (const r of chronic3) {
        if (!r.filePath) fail("Gc", `CHRONIC §3 row "${r.srcId}" has no parseable marker file:line.`);
        if (!G_TERMINAL_VERB.test(r.row)) fail("Gc", `CHRONIC §3 row "${r.srcId}" carries no terminal disposition verb (FOLD/RETIRE/MET/…).`);
    }

    // Gd — fired-trigger DEFER liveness (a landed adopt / terminally-retired idea still-DEFER REDs).
    for (const probe of firedProbes) {
        if (!probe.fired) continue;
        for (const lid of probe.ledgerIds) {
            if (!defers.has(lid)) continue; // already flipped OFF DEFER in FOLD-LEDGER
            if (!chronic5.some((r) => r.id === lid && r.flipTo && r.flipTo.trim()))
                fail(
                    "Gd",
                    `FOLD-LEDGER row "${lid}" is still DEFER-with-trigger but its trigger FIRED (${probe.name}) — a fired-trigger DEFER must be flipped in CHRONIC §5 with evidence (the D27/deep-glass liveness class).`,
                );
        }
    }

    // Ge — the ledger TRUE-UP (every §5 flip row carries a flip-to + on-disk evidence).
    if (chronic5.length < G5_MIN_ROWS)
        fail("Ge", `CHRONIC §5 (the MET/LANDED true-up) carries ${chronic5.length} rows, expected ≥${G5_MIN_ROWS} (the round-1 correction set).`);
    for (const r of chronic5) {
        if (!r.flipTo || !r.flipTo.trim()) fail("Ge", `CHRONIC §5 row "${r.id}" has an empty flip-to — every stale row is flipped WITH a terminal disposition.`);
        if (!r.evidence || !r.evidence.trim()) fail("Ge", `CHRONIC §5 row "${r.id}" has no on-disk-truth evidence cell.`);
    }

    // Gf — re-stamp-discharge (a re-stamped `N+ ⚠` row without a decide REDs).
    for (const rr of restamped) {
        if (!G_DECIDED.test(rr.line))
            fail("Gf", `${rr.doc}:${rr.n} carries a re-stamp marker (\`N+ ⚠\`) but no terminal decide — a re-stamped-without-decide row REDs (RE-STAMP-DISCHARGE).`);
    }

    // Gg — LEDGER-COLUMN-RESOLVE (every FORWARD disposition-target resolves).
    for (const { doc, target } of bodyTargets) {
        if (!biWaves.has(target) && !addendaMap.has(target))
            fail(
                "Gg",
                `${doc} names FORWARD disposition-target "${target}" but it resolves to no docs/tranches/BI/waves/${target}.md and no ADDENDA mapping — every forward disposition-target must resolve (LEDGER-COLUMN-RESOLVE).`,
            );
    }

    return failures;
}

// build the real §G inputs from disk.
function loadGInputs() {
    const chronicText = existsSync(BI_CHRONIC) ? readFileSync(BI_CHRONIC, "utf8") : "";
    const recapText = existsSync(BI_RECAP) ? readFileSync(BI_RECAP, "utf8") : "";
    if (!chronicText || !recapText) {
        console.error(`[proof:bg-deferred-ledger] §G: a BI ledger body is missing (${BI_CHRONIC} / ${BI_RECAP}) — the liveness clauses cannot run (fail-LOUD).`);
        process.exit(1);
    }
    const biWaves = new Set(
        (existsSync(BI_WAVES_DIR) ? readdirSync(BI_WAVES_DIR) : [])
            .filter((f) => f.endsWith(".md"))
            .map((f) => f.slice(0, -3)),
    );
    const bareWords = deriveBareWordBookings(walkSrc(SRC_DIR, []).sort());
    const chronic3 = parseChronic3(chronicText);
    const chronic5 = parseChronic5(chronicText);
    const ledger = JSON.parse(readFileSync(LEDGER_JSON, "utf8"));
    const defers = new Set(ledger.items.filter((r) => r.disposition === "DEFER-with-trigger").map((r) => r.id));
    const firedProbes = computeFiredProbes();
    const addendaMap = buildAddendaMap([chronicText, recapText], biWaves);
    const bodyTargets = [
        ...bodyForwardTargets(chronicText).map((target) => ({ doc: "CHRONIC-DISPOSITIONS.md", target })),
        ...bodyForwardTargets(recapText).map((target) => ({ doc: "PROMPT-RECAP.md", target })),
    ];
    const restamped = [...restampedRows(chronicText, "CHRONIC-DISPOSITIONS.md"), ...restampedRows(recapText, "PROMPT-RECAP.md")];
    return { bareWords, chronic3, chronic5, defers, firedProbes, biWaves, addendaMap, bodyTargets, restamped, cssArmPresent: SRC_MARKER_EXT.test("x.css") };
}

// ── evidence skeleton (tooth b) ──────────────────────────────────────────────────
// Strip the row-specific tokens (own id, wave id, any wave/id token, file paths, digits, backticks,
// punctuation) to leave the STRUCTURAL skeleton. N rows sharing a skeleton are templated.
function evidenceSkeleton(evidence, row) {
    let s = ` ${(evidence || "").toLowerCase()} `;
    if (row?.id) s = s.split(row.id.toLowerCase()).join(" ");
    if (row?.wave) s = s.split(row.wave.toLowerCase()).join(" ");
    s = s
        .replace(/\b(bg|be|bf|ay|az|ba|bb|bc|bd)\.w-[a-z0-9-]+/g, " ") // wave ids
        .replace(/\bd\d+\b/g, " ") // census ids
        .replace(/[a-z0-9_./-]+\.(ts|vue|css|mjs|md|json|glsl|wgsl)\b/g, " ") // file paths
        .replace(/[`#]/g, " ")
        .replace(/\d+/g, " ")
        .replace(/[^a-z]+/g, " ")
        .replace(/\s+/g, " ")
        .trim();
    return s;
}

// ── md id extraction (doc⟷JSON parity) ───────────────────────────────────────────
// The generated `.md` wraps each id in backticks in the table first cell: `| \`<id>\` | … |`.
function extractMdIds(mdText) {
    const ids = new Set();
    for (const line of mdText.split("\n")) {
        const m = line.match(/^\|\s*`([^`]+)`\s*\|/);
        if (m) ids.add(m[1]);
    }
    return ids;
}

// ── core check (operates on already-loaded objects so the self-test can feed fixtures) ──
function runChecks({ ledger, mdIds, derived, bgWaves }) {
    const failures = [];
    const fail = (clause, msg) => failures.push({ clause, msg });

    const rows = Array.isArray(ledger?.items) ? ledger.items : [];
    const jsonIds = new Set(rows.map((r) => r.id));

    // F1.count — the DERIVED corpus is exactly EXPECTED_COUNT (135).
    const sumCounts = Object.values(derived.counts).reduce((a, b) => a + b, 0);
    if (sumCounts !== EXPECTED_COUNT) {
        fail("F1", `the DERIVED corpus is ${sumCounts} (AX ${derived.counts["ax-register"]} + BF-census ${derived.counts["bf-census"]} + BE ${derived.counts["be-wave"]} + BF ${derived.counts["bf-wave"]} + in-src ${derived.counts["in-src"]}), expected ${EXPECTED_COUNT} — a corpus drift REDs.`);
    }
    if (derived.counts["ax-register"] !== AX_EXPECTED) {
        fail("F1", `the AX DISPOSITION-REGISTER derived ${derived.counts["ax-register"]} rows, expected ${AX_EXPECTED} (NOT 32 — the chronic mis-count).`);
    }
    if (rows.length !== EXPECTED_COUNT) {
        fail("F1", `FOLD-LEDGER.json carries ${rows.length} rows, expected ${EXPECTED_COUNT}.`);
    }

    // F1.disjoint — the 5 namespaces are pairwise disjoint AND Σ === union.
    const union = new Set();
    let overlap = 0;
    for (const [src, set] of Object.entries(derived.sets)) {
        for (const id of set) {
            if (union.has(id)) {
                overlap++;
                fail("F1", `id "${id}" (source ${src}) collides across corpus namespaces — the disjoint-namespace assert requires AX/census/BE/BF/in-src id-sets to be pairwise disjoint.`);
            }
            union.add(id);
        }
    }
    if (overlap === 0 && union.size !== sumCounts) {
        fail("F1", `the derived union is ${union.size} but Σ counts is ${sumCounts} — a namespace overlap leaked.`);
    }

    // F1.completeness — every derived id has a JSON row (no silent drop).
    for (const id of union) {
        if (!jsonIds.has(id))
            fail("F1", `derived corpus id "${id}" has no FOLD-LEDGER.json row (a deferred item silently dropped from the machine source).`);
    }
    // F1.no-orphan (F0-scoped) — every JSON row id is a DERIVED corpus id (no phantom row). The
    // derivation reads ONLY the 4 corpus docs + the src markers, so an unrelated committed file
    // (e.g. scripts/proof-de-shadcn.mjs) never becomes a derived id — it cannot false-orphan.
    for (const id of jsonIds) {
        if (!union.has(id))
            fail("F1", `FOLD-LEDGER.json row "${id}" is not in the DERIVED corpus (a phantom/orphan row — every row must trace to AX/census/BE/BF/in-src).`);
    }

    // F1.parity — doc⟷JSON.
    if (mdIds) {
        for (const id of jsonIds)
            if (!mdIds.has(id)) fail("F1", `id "${id}" is in FOLD-LEDGER.json but absent from FOLD-LEDGER.md (the doc⟷JSON parity broke).`);
        for (const id of mdIds)
            if (!jsonIds.has(id)) fail("F1", `id "${id}" is in FOLD-LEDGER.md but absent from FOLD-LEDGER.json.`);
    }

    // per-row clauses.
    const concentration = {};
    const skeletonGroups = {};
    for (const row of rows) {
        const id = row.id ?? "<no-id>";
        const disp = row.disposition;
        const wave = row.wave ?? "";

        // F3 — every row DECIDED with a known disposition.
        if (!DISPOSITIONS.has(disp)) {
            fail("F3", `id "${id}" disposition "${disp}" ∉ {BUILD,MET,COORDINATED,RETIRE,SUPERSEDED,DEFER-with-trigger} — every item is DECIDED (no book/empty/re-stamped).`);
            continue;
        }

        if (disp === "DEFER-with-trigger") {
            // F3 — a DEFER carries a trigger; its dest is empty (foreign-tree/Baseline/republish)
            // or a DECIDE book-keeper wave; NEVER a build/sweep dest.
            if (!row.trigger || !String(row.trigger).trim())
                fail("F3", `id "${id}" is DEFER-with-trigger but names no trigger (the Baseline/republish/≥2-consumer condition that re-enters it).`);
            if (wave && !DECIDE_CHARTER.has(wave))
                fail("F2", `id "${id}" is DEFER-with-trigger but routes to "${wave}" — a deferred item carries NO build/sweep destination (empty, or a DECIDE book-keeper).`);
            // a DEFER with a (book-keeper) dest still counts toward concentration.
            if (wave) concentration[wave] = (concentration[wave] || 0) + 1;
            continue;
        }

        // F6 — non-DEFER rows carry real evidence + a destination.
        if (!row.evidence || !String(row.evidence).trim())
            fail("F6", `id "${id}" (${disp}) carries no evidence — every DECIDED row needs ROW-SPECIFIC evidence (a file/symbol/(-call-site), not a blank cell).`);
        if (!wave || !String(wave).trim()) {
            fail("F2", `id "${id}" is ${disp} but carries an EMPTY wave — a non-deferred disposition MUST resolve to a BG.W-* destination.`);
            continue;
        }

        // F2 — destination soundness + charter-match (tooth a).
        if (bgWaves && !bgWaves.has(wave)) {
            fail("F2", `id "${id}" is ${disp} but its wave "${wave}" is not in the BG build-map roster (a phantom destination).`);
        } else {
            if (BUILD_CLASS.has(disp) && SWEEP_CHARTER.has(wave)) {
                fail("F2", `id "${id}" is ${disp} but routes to "${wave}", a RETIRE/SWEEP-charter wave — a BUILD/MET/COORDINATED row NEVER routes to a sweep/cut wave (the blanket-route evasion §L.11).`);
            }
            if (disp === "RETIRE" && !(SWEEP_CHARTER.has(wave) || DECIDE_CHARTER.has(wave))) {
                fail("F2", `id "${id}" is RETIRE but routes to "${wave}", a BUILD-charter wave — a RETIRE lands in a sweep/cut or a decide wave, never a build wave.`);
            }
        }

        // F5 — destination-concentration (tooth c).
        concentration[wave] = (concentration[wave] || 0) + 1;

        // F4 — evidence skeleton (tooth b).
        const skel = evidenceSkeleton(row.evidence, row);
        if (skel.length >= 24) (skeletonGroups[skel] ||= []).push(id);
        if (String(row.evidence).toLowerCase().includes(PLACEHOLDER_PHRASE))
            fail("F4", `id "${id}" evidence carries the templated placeholder phrase — every row needs row-specific evidence, never the catch-all skeleton.`);
    }

    // F4 — N rows sharing an identical evidence skeleton are templated.
    for (const [skel, ids] of Object.entries(skeletonGroups)) {
        if (ids.length >= SKELETON_SHARE_THRESHOLD)
            fail("F4", `${ids.length} rows share one evidence skeleton ("${skel.slice(0, 60)}…": ${ids.slice(0, 5).join(", ")}…) — templated evidence; each row needs a row-specific shape.`);
    }

    // F5 — concentration ceiling.
    for (const [wave, n] of Object.entries(concentration)) {
        if (n >= CONCENTRATION_CEILING)
            fail("F5", `destination "${wave}" receives ${n} rows (ceiling ${CONCENTRATION_CEILING}) — a catch-all home is the blanket-route evasion; distribute to charter-matched destinations.`);
    }

    return { failures, count: rows.length, concentration, sumCounts };
}

// ── no-clone (G6): both fold-ledger gates IMPORT the core, never re-define its bodies ──
function checkNoClone(fail, { bcSrc, bgSrc } = {}) {
    const bc = bcSrc ?? (existsSync(BC_GATE) ? readFileSync(BC_GATE, "utf8") : "");
    const bg = bgSrc ?? readFileSync(BG_GATE, "utf8");
    const importRe = /from\s+["'][^"']*lib\/fold-ledger-core\.mjs["']/;
    if (!importRe.test(bc))
        fail("G6", `proof-bc-fold-ledger.mjs does not import scripts/lib/fold-ledger-core.mjs — the fold-ledger primitive must be the ONE shared leaf, never re-cloned.`);
    if (!importRe.test(bg))
        fail("G6", `proof-bg-deferred-ledger.mjs does not import scripts/lib/fold-ledger-core.mjs — the no-clone contract requires both gates compose the leaf.`);
}

// ── real load + entry ─────────────────────────────────────────────────────────────
function loadReal() {
    for (const [label, p] of [
        ["FOLD-LEDGER.json", LEDGER_JSON],
        ["FOLD-LEDGER.md", LEDGER_DOC],
        ["DISPOSITION-REGISTER.json", AX_REGISTER],
        ["DEFERRED-CENSUS.md", BF_CENSUS],
        ["BE/waves", BE_WAVES_DIR],
        ["BF/waves", BF_WAVES_DIR],
    ]) {
        if (!existsSync(p)) {
            console.error(`[proof:bg-deferred-ledger] missing input: ${label} (${p})`);
            process.exit(1);
        }
    }
    const bgWaves = deriveBgWaves();
    if (!bgWaves || bgWaves.size === 0) {
        console.error(`[proof:bg-deferred-ledger] the BG build-map roster (docs/tranches/BG/execution/bg-build-map.md) is absent or empty — the charter-match clause cannot run (fail-LOUD, never vacuous-green).`);
        process.exit(1);
    }
    return {
        ledger: JSON.parse(readFileSync(LEDGER_JSON, "utf8")),
        mdIds: extractMdIds(readFileSync(LEDGER_DOC, "utf8")),
        derived: buildDerived(),
        bgWaves,
    };
}

function runReal() {
    const real = loadReal();
    const { failures, count, concentration, sumCounts } = runChecks(real);
    const extra = [];
    checkNoClone((c, m) => extra.push({ clause: c, msg: m }));
    const gInputs = loadGInputs();
    const gFailures = runGHardening(gInputs);
    const all = [...failures, ...extra, ...gFailures];
    const maxConc = Math.max(0, ...Object.values(concentration));
    console.log("proof:bg-deferred-ledger — the no-silent-drop machine (BG.W-DEFERRED-LEDGER) + §G liveness (BI.W-LEDGER-DETECTOR-HARDEN)");
    console.log(`  DERIVED corpus         : ${sumCounts} (expected ${EXPECTED_COUNT})`);
    console.log(`  ledger rows            : ${count}`);
    console.log(`  max dest concentration : ${maxConc} (ceiling ${CONCENTRATION_CEILING})`);
    console.log(`  §G in-src bare BOOKED  : ${gInputs.bareWords.length} (all enrolled in CHRONIC §3)`);
    console.log(`  §G §3 / §5 rows        : ${gInputs.chronic3.length} / ${gInputs.chronic5.length}`);
    console.log(`  §G fired-trigger DEFER : ${gInputs.firedProbes.filter((p) => p.fired).length} probe(s) fired (flipped in §5)`);
    console.log(`  §G forward targets     : ${gInputs.bodyTargets.length} (all resolve to a wave-spec or ADDENDA)`);
    console.log(`  failures               : ${all.length}`);
    for (const f of all) console.error(`  [${f.clause}] ${f.msg}`);
    if (all.length > 0) {
        console.error(`\n[proof:bg-deferred-ledger] ${all.length} fold-ledger / §G violation(s) — a deferred item was dropped, left undecided, blanket-routed, templated, over-concentrated, or a booking/DEFER/disposition-target rode invisible or stale. The close cannot proceed.`);
        process.exit(1);
    }
    console.log(`\n[proof:bg-deferred-ledger] every one of the ${EXPECTED_COUNT} DERIVED deferred items is present + DECIDED + charter-matched, and the §G liveness floor holds (no bare-word booking, no fired-trigger DEFER, every forward target resolves).`);
    process.exit(0);
}

// ── self-test ─────────────────────────────────────────────────────────────────────
function selfTest() {
    const real = loadReal();
    const bites = [];
    const clone = (o) => JSON.parse(JSON.stringify(o));
    const run = (over) => {
        const r = runChecks({ ...real, ...over });
        return clausesHit(r.failures);
    };

    // bite 1 — AX-31-vs-32 (FIRST): a corpus that treats AX as 32 → F1 count REDs (Sets are not
    // JSON-cloneable, so override only the counts, keep the live Sets).
    {
        const derived = {
            sets: real.derived.sets,
            counts: { ...real.derived.counts, "ax-register": 32 },
        };
        bites.push(["ax-31-vs-32 → F1", run({ derived }).has("F1")]);
    }
    // bite 2 — de-shadcn-not-a-false-orphan: the REAL ledger is clean even though a committed
    // gate file (scripts/proof-de-shadcn.mjs) exists — the derivation never picks it up as an id.
    {
        const realRun = runChecks(real);
        const noScriptOrphan = !realRun.failures.some((f) => /proof-de-shadcn|\.mjs/.test(f.msg));
        const cleanReal = realRun.failures.length === 0;
        bites.push(["de-shadcn-not-a-false-orphan (real clean, no script id)", noScriptOrphan && cleanReal]);
    }
    // bite 3 — no-clone: a gate source lacking the core import REDs G6.
    {
        const extra = [];
        checkNoClone((c, m) => extra.push({ clause: c, msg: m }), {
            bcSrc: "// a clone that re-defines extractDocIds inline, no import",
            bgSrc: real ? "import { clausesHit } from './lib/fold-ledger-core.mjs'" : "",
        });
        bites.push(["no-clone-on-planted-clone → G6", new Set(extra.map((f) => f.clause)).has("G6")]);
    }
    // bite 4 — disjoint-namespace: a planted id-collision (D5 also in the AX set) → F1 REDs.
    {
        const d2 = {
            sets: {
                "ax-register": new Set([...real.derived.sets["ax-register"], "D5"]),
                "bf-census": real.derived.sets["bf-census"],
                "be-wave": real.derived.sets["be-wave"],
                "bf-wave": real.derived.sets["bf-wave"],
                "in-src": real.derived.sets["in-src"],
            },
            counts: { ...real.derived.counts, "ax-register": real.derived.counts["ax-register"] + 1 },
        };
        bites.push(["disjoint-namespace (planted D5 collision) → F1", run({ derived: d2 }).has("F1")]);
    }
    // bite 5 — F0-scoped no-orphan: a JSON row not in the derived set → F1 REDs.
    {
        const led = clone(real.ledger);
        led.items.push({ id: "phantom-orphan-row", source: "ax-register", disposition: "MET", wave: "BG.W-DISPOSITION-RESTAMP", evidence: "synthetic orphan", trigger: "" });
        bites.push(["F0-scoped no-orphan → F1", run({ ledger: led }).has("F1")]);
    }
    // bite 6 — charter-match (tooth a): a BUILD row routed to a SWEEP wave → F2 REDs.
    {
        const led = clone(real.ledger);
        const r = led.items.find((x) => BUILD_CLASS.has(x.disposition) && x.wave && !SWEEP_CHARTER.has(x.wave));
        r.disposition = "BUILD";
        r.wave = "BG.W-DEAD-GATE-SWEEP";
        bites.push(["charter-match (BUILD→SWEEP) → F2", run({ ledger: led }).has("F2")]);
    }
    // bite 7 — templated-evidence (tooth b): N identical-skeleton rows + the placeholder → F4 REDs.
    {
        const led = clone(real.ledger);
        for (let i = 0; i < SKELETON_SHARE_THRESHOLD; i++) {
            const r = led.items.find((x) => x.id === led.items[i].id);
            r.evidence = "the per-WS-coordinated destination is the Band-0 build's refinement";
        }
        bites.push(["templated-evidence → F4", run({ ledger: led }).has("F4")]);
    }
    // bite 8 — concentration (tooth c): ≥24 rows → one home → F5 REDs.
    {
        const led = clone(real.ledger);
        let n = 0;
        for (const r of led.items) {
            if (n >= CONCENTRATION_CEILING) break;
            if (r.disposition !== "DEFER-with-trigger") {
                r.disposition = "COORDINATED";
                r.wave = "BG.W-12-LAWS-UNIVERSAL";
                n++;
            }
        }
        bites.push(["concentration (24→one home) → F5", run({ ledger: led }).has("F5")]);
    }
    // bite 9 — count assert: a corpus ≠ EXPECTED_COUNT → F1 REDs (drop one census id from the derived set).
    {
        const trimmed = new Set([...real.derived.sets["bf-census"]]);
        trimmed.delete("D32");
        const d2 = {
            sets: { ...real.derived.sets, "bf-census": trimmed },
            counts: { ...real.derived.counts, "bf-census": real.derived.counts["bf-census"] - 1 },
        };
        bites.push(["count-assert (≠EXPECTED) → F1", run({ derived: d2 }).has("F1")]);
    }

    // ── §G bites (BI.W-LEDGER-DETECTOR-HARDEN) ──────────────────────────────────────
    const gReal = loadGInputs();
    const runG = (over) => clausesHit(runGHardening({ ...gReal, ...over }));

    // bite 10 — Ga: a planted bare-word BOOKED in a NON-enrolled file → Ga REDs.
    {
        const bareWords = [{ file: "src/zzz/phantom-booking.ts", line: 1, text: "the X is BOOKED to a future wave" }];
        bites.push(["Ga planted bare-word BOOKED (non-enrolled file) → Ga", runG({ bareWords }).has("Ga")]);
    }
    // bite 11 — Gb: the `.css` marker arm dropped → Gb REDs.
    bites.push(["Gb `.css` arm absent → Gb", runG({ cssArmPresent: false }).has("Gb")]);
    // bite 12 — Gc: an under-populated §3 census → Gc REDs.
    bites.push(["Gc §3 under-populated (<8 rows) → Gc", runG({ chronic3: gReal.chronic3.slice(0, 3) }).has("Gc")]);
    // bite 13 — Gd: a FIRED-trigger DEFER (D27) with NO §5 flip → Gd REDs.
    {
        const firedProbes = [{ ledgerIds: ["D27"], name: "synthetic-fired", fired: true }];
        const chronic5 = gReal.chronic5.filter((r) => r.id !== "D27"); // the §5 flip row removed
        bites.push(["Gd fired-trigger DEFER, no §5 flip → Gd", runG({ firedProbes, chronic5 }).has("Gd")]);
    }
    // bite 14 — Ge: a §5 row with an EMPTY flip-to → Ge REDs.
    {
        const chronic5 = gReal.chronic5.map((r) => (r.id === "D27" ? { ...r, flipTo: "" } : r));
        bites.push(["Ge §5 row empty flip-to → Ge", runG({ chronic5 }).has("Ge")]);
    }
    // bite 15 — Gf: a re-stamped `N+ ⚠` row with NO terminal decide → Gf REDs.
    {
        const restamped = [{ doc: "SYNTH", n: 1, line: "| dis:x | some chronic item | BF | 3+ ⚠ | evidence-cell | (no disposition) |" }];
        bites.push(["Gf re-stamped-without-decide → Gf", runG({ restamped }).has("Gf")]);
    }
    // bite 16 — Gg: a planted UNRESOLVED forward BI.W-* target → Gg REDs.
    {
        const bodyTargets = [{ doc: "SYNTH", target: "BI.W-PHANTOM-DOES-NOT-EXIST" }];
        bites.push(["Gg unresolved FORWARD target → Gg", runG({ bodyTargets }).has("Gg")]);
    }
    // bite 17 — Gg no-false-positive: historical non-BI `W-*` evidence + cross-tranche `BG.`/`BH.`
    // flip-tos yield ZERO forward targets (the round-12 scope pin — evidence, not targets).
    {
        const hist = bodyForwardTargets("evidence: W-DESHADCN + W-LENSING + W-COLOCATE; resolvedBy BG.W-DEEP-GLASS-DECIDE + BH.B1-W3");
        bites.push(["Gg historical evidence ref (no false-positive)", hist.length === 0]);
    }

    console.log("proof:bg-deferred-ledger — SELF-TEST (born-RED→GREEN, 17 bites: 9 F-clause + 8 §G)");
    let allFlag = true;
    for (const [name, flagged] of bites) {
        console.log(`  ${flagged ? "FLAGGED" : "MISSED "}  ${name}`);
        if (!flagged) allFlag = false;
    }
    const realRun = runChecks(real);
    const cloneExtra = [];
    checkNoClone((c, m) => cloneExtra.push({ clause: c, msg: m }));
    const realFails = [...realRun.failures, ...cloneExtra, ...runGHardening(gReal)];
    console.log(`  real ledger failures   : ${realFails.length}`);
    for (const f of realFails.slice(0, 20)) console.log(`    [${f.clause}] ${f.msg}`);
    if (!allFlag) {
        console.error("\n[proof:bg-deferred-ledger] SELF-TEST FAILED — a synthetic-broken fixture did not flag its clause; the detector is not load-bearing.");
        process.exit(1);
    }
    if (realFails.length > 0) {
        console.error("\n[proof:bg-deferred-ledger] SELF-TEST FAILED — the REAL ledger is not clean (the GREEN-after state must pass every clause).");
        process.exit(1);
    }
    console.log(`\n[proof:bg-deferred-ledger] SELF-TEST GREEN — all 17 bites flag born-RED, the real ${EXPECTED_COUNT}-item ledger + the §G liveness floor pass every clause.`);
    process.exit(0);
}

if (process.argv.includes("--self-test")) {
    selfTest();
} else {
    runReal();
}

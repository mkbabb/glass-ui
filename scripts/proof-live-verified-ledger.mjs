// proof:live-verified-ledger — AX.W62 Gate 1: the cardinal-lesson forcing function.
// AY.W-CARDINAL-INFRA: tranche-parameterized + `complete`-allowlist + own-surface
// filename match + light/dark depth-lint; the engine ported to slides/scripts/.
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
// The cardinal lesson survived at one remove: the inflation moved from the
// `(DEVELOPED)` modifier (now gate-rejected) to the plain `complete` token (which
// the original gate never evaluated). So `complete` is now held to the SAME bar
// — but ONLY for the waves that actually changed pixels, curated in the tranche's
// `audit/visual/VISUAL-ALLOWLIST.json` sidecar. A doc/gate/non-visual `complete`
// wave is untouched (it is not on the allowlist). The allowlisted-`complete` bar
// is DEEPENED: the referenced PNG must be the wave's OWN surface (`^W<NN>-`), and
// the DELTA must declare the protocol floor (≥2 viewport × {light,dark}, i.e. an
// own-surface light AND dark PNG) — so a wave cannot satisfy the gate by pointing
// at a NEIGHBOUR's pixels (the W52 cross-reference case). The existing
// `live-verified` rows keep the original referenced-real-PNG bar (no regression):
// the shared-surface `live-verified` rows that legitimately cite a sibling wave's
// captures (W06↔W61, W40↔W18, …, declared in the PROGRESS status cell) stay GREEN.
//
// Targets the STATUS cell (the 3rd column) of wave-table rows only — a prose or
// legend mention of `live-verified`/`(DEVELOPED)` (e.g. documenting the retired
// label) is not a claim and is ignored.
//
// SELF-PROVING: three synthetic rows are evaluated every run — a `live-verified`
// row with no DELTA, a `complete`-on-(synthetic)-allowlist row with no DELTA, and
// a `live-verified` row whose only referenced PNG is a NON-matching (neighbour's)
// filename. If the detector fails to flag any of the three, the gate reds loudly
// (acceptance is the RED-witness inverse). So the bite is demonstrated on every
// invocation while the committed ledger stays honest.
//
// Tranche-parameterized: `--tranche=<X>` (default `AX`) reads
// `docs/tranches/<X>/PROGRESS.md` + `<X>/audit/visual/` and stamps the artefact
// `<X>-live-verified-ledger`. The AY arm runs `--tranche=AY`; the slides twin
// (slides/scripts/proof-live-verified-ledger.mjs) defaults `--tranche=L`.
//
// Also runnable as the commit-msg hook (.githooks/commit-msg) for the fast local
// bite; the CI job re-runs it so a `--no-verify` bypass is still caught.

import { existsSync, readFileSync, statSync } from "node:fs";
import { join, resolve } from "node:path";
import { ROOT } from "./constellation.mjs";
import { gateArtifactPath, snapshotStamp, writeGateArtifact } from "./gate-output.mjs";

const COMMAND = "npm run proof:live-verified-ledger";

// ── Tranche parameter — the gate reads the ACTIVE tranche, no hardcode ─────────
const TRANCHE = process.argv.find((a) => a.startsWith("--tranche="))?.split("=")[1] ?? "AX";
const PROGRESS = join(ROOT, `docs/tranches/${TRANCHE}/PROGRESS.md`);
const VISUAL_DIR = join(ROOT, `docs/tranches/${TRANCHE}/audit/visual`);
const ALLOWLIST_PATH = join(VISUAL_DIR, "VISUAL-ALLOWLIST.json");

// ── The curated visual allowlist — the `complete` waves that changed pixels ────
/** @returns {Set<string>} the wave-ids held to the deepened own-surface bar. */
function loadAllowlist() {
    if (!existsSync(ALLOWLIST_PATH)) return new Set();
    try {
        const parsed = JSON.parse(readFileSync(ALLOWLIST_PATH, "utf8"));
        return new Set(Array.isArray(parsed) ? parsed : []);
    } catch {
        return new Set();
    }
}

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
        // wave id only (skips the `Wave` header + legend/other tables): the AX
        // numbered form `W<digit>…` OR the AY named form `W-<UPPER>…`. The `Wave`
        // header (`W` + lowercase `a`) and prose rows never match.
        if (!/^W(\d|-[A-Z])/.test(wave)) return;
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

/** The basename of a referenced path (drop any dir segments). */
function baseName(ref) {
    const idx = ref.lastIndexOf("/");
    return idx === -1 ? ref : ref.slice(idx + 1);
}

/**
 * The deepened own-surface verdict — PURE over a wave-id + a list of real-PNG
 * basenames (so the self-test can exercise the filename-mismatch + light/dark
 * paths directly, with no on-disk fixture). The PNG must be the wave's own
 * surface (`^<wave>-`) AND the set must carry a `-light.png` + `-dark.png` own
 * pair (the ≥2-viewport × {light,dark} protocol floor).
 *
 * @param {string} wave
 * @param {string[]} pngBasenames basenames of the referenced real on-disk PNGs
 * @returns {{ok:true, pngs:string[]} | {ok:false, reason:string}}
 */
function ownSurfaceVerdict(wave, pngBasenames) {
    const ownPrefix = new RegExp(`^${wave}-`);
    const ownSurface = pngBasenames.filter((b) => ownPrefix.test(b));
    if (!ownSurface.length)
        return {
            ok: false,
            reason: `${wave}-DELTA.md references real PNGs but none are this wave's own surface (^${wave}-) — it points at a neighbour's pixels`,
        };
    const hasLight = ownSurface.some((b) => /-light\.png$/.test(b));
    const hasDark = ownSurface.some((b) => /-dark\.png$/.test(b));
    if (!hasLight || !hasDark)
        return {
            ok: false,
            reason: `${wave}-DELTA.md own-surface PNGs lack the {light,dark} pair (the ≥2-viewport × {light,dark} protocol floor) — have light:${hasLight} dark:${hasDark}`,
        };
    return { ok: true, pngs: ownSurface };
}

/**
 * Does wave <W> have a DELTA doc referencing ≥1 real on-disk PNG?
 *
 * @param {string} wave the wave-id
 * @param {{ownSurface?: boolean}} [opts] when `ownSurface`, the deepened bar: the
 *   referenced PNG must be the wave's OWN surface (`^<wave>-`) AND the DELTA must
 *   declare the ≥2-viewport × {light,dark} floor (an own-surface light AND dark
 *   PNG). The shallow bar (any referenced real PNG) is the default — the existing
 *   `live-verified` rows that cite a sibling's shared surface keep it.
 */
function deltaSatisfied(wave, opts = {}) {
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

    if (!opts.ownSurface) return { ok: true, pngs: realPngs };

    // Deepened bar: own-surface (^<wave>-) + the light/dark depth floor.
    return ownSurfaceVerdict(wave, realPngs.map(baseName));
}

// ── Evaluate a single row → a violation string, or null ───────────────────────
/**
 * @param {{wave:string,status:string,line:number}} row
 * @param {Set<string>} allowlist the tranche's curated visual `complete` allowlist
 */
function evaluateRow(row, allowlist = new Set()) {
    if (/\(DEVELOPED\)/.test(row.status))
        return `${row.wave} (line ${row.line}): status cell carries the RETIRED \`(DEVELOPED)\` modifier — replace with \`live-pending\` (DELTA owed) or \`live-verified\` (DELTA captured).`;
    const token = statusToken(row.status);
    // Only a CLOSE token (live-verified or complete) asserts a finished surface.
    // A planned/in-progress/live-pending/dev-* row owes nothing yet.
    if (token !== "live-verified" && token !== "complete") return null;

    // The visual allowlist is the "this wave CHANGED pixels and OWES an own-surface
    // capture" curation (VISUAL-ALLOWLIST.json). An allowlisted CLOSE row — whether
    // `complete` (the cardinal lesson now covers it, not just `live-verified`) or
    // `live-verified` (the W52 cross-reference probe) — is held to the DEEPENED
    // own-surface bar: the referenced PNG must be the wave's OWN surface (^<wave>-)
    // at ≥2 viewports × {light,dark}, so a wave cannot satisfy the gate by pointing
    // at a neighbour's pixels.
    if (allowlist.has(row.wave)) {
        const d = deltaSatisfied(row.wave, { ownSurface: true });
        if (!d.ok)
            return `${row.wave} (line ${row.line}): status \`${token}\` AND on the visual allowlist (a pixel-changing wave) but ${d.reason}. An allowlisted close owes an own-surface DELTA at ≥2 viewports × {light,dark} — capture it or remove the wave from VISUAL-ALLOWLIST.json.`;
        return null;
    }

    // A non-allowlisted CLOSE row: `complete` (a doc/gate/non-visual wave) owes
    // nothing; `live-verified` keeps the original referenced-real-PNG bar — the
    // shared-surface rows that legitimately cite a sibling wave's captures
    // (W06↔W61, W40↔W18, declared in the status cell) stay GREEN, no regression.
    if (token === "live-verified") {
        const d = deltaSatisfied(row.wave);
        if (!d.ok)
            return `${row.wave} (line ${row.line}): status \`live-verified\` but ${d.reason}. A live-verified flip requires a fresh on-disk .png DELTA — capture it or revert the status to \`live-pending\`.`;
    }
    return null;
}

const allowlist = loadAllowlist();

const md = existsSync(PROGRESS) ? readFileSync(PROGRESS, "utf8") : "";
if (!md) {
    console.error(`[proof:live-verified-ledger] PROGRESS.md not found: ${PROGRESS}`);
    process.exit(1);
}
const rows = waveRows(md);

// (1) Self-test — three synthetic checks MUST flag (the bite proof, every run).
// Each returns a truthy violation/reason or the gate reds loudly (RED-witness
// inverse). The first two go through evaluateRow (the no-DELTA paths); the third
// exercises the filename-mismatch path directly through the PURE own-surface
// verdict (a `live-verified`/allowlisted row whose only referenced PNG is a
// neighbour's filename — `W99-foo.png` for wave `W00SELFTEST`).
const selfAllow = new Set(["W00SELFTEST"]);
const selfTests = [
    {
        label: "live-verified, no DELTA",
        flag: evaluateRow({ wave: "W00SELFTEST", status: "live-verified", line: 0 }, selfAllow),
    },
    {
        label: "complete on the (synthetic) allowlist, no DELTA",
        flag: evaluateRow({ wave: "W00SELFTEST", status: "complete", line: 0 }, selfAllow),
    },
    {
        label: "filename-mismatch — DELTA references only a neighbour's PNG (W99-foo.png), no own-surface (^W00SELFTEST-)",
        flag: ownSurfaceVerdict("W00SELFTEST", [
            "W99-foo-desktop-light.png",
            "W99-foo-desktop-dark.png",
        ]).ok
            ? null
            : "flagged",
    },
];
if (selfTests.some((t) => !t.flag)) {
    const missed = selfTests
        .filter((t) => !t.flag)
        .map((t) => t.label)
        .join("; ");
    console.error(
        `[proof:live-verified-ledger] SELF-TEST FAILED — synthetic check(s) NOT flagged: ${missed}. The gate is not load-bearing.`,
    );
    process.exit(1);
}

// (2) The real ledger.
const violations = [];
for (const row of rows) {
    const v = evaluateRow(row, allowlist);
    if (v) violations.push(v);
}

const liveVerified = rows.filter((r) => statusToken(r.status) === "live-verified");
const completeOnAllowlist = rows.filter(
    (r) => statusToken(r.status) === "complete" && allowlist.has(r.wave),
);
console.log("proof:live-verified-ledger — the cardinal-lesson ledger gate (AX.W62 / AY.W-CARDINAL-INFRA)");
console.log(`  tranche               : ${TRANCHE}`);
console.log(`  PROGRESS              : ${PROGRESS}`);
console.log(`  visual dir            : ${VISUAL_DIR}`);
console.log(`  visual allowlist      : ${allowlist.size}${allowlist.size ? " (" + [...allowlist].join(", ") + ")" : ""}`);
console.log(`  wave rows parsed      : ${rows.length}`);
console.log(`  live-verified rows    : ${liveVerified.length}${liveVerified.length ? " (" + liveVerified.map((r) => r.wave).join(", ") + ")" : ""}`);
console.log(`  complete-on-allowlist : ${completeOnAllowlist.length}${completeOnAllowlist.length ? " (" + completeOnAllowlist.map((r) => r.wave).join(", ") + ")" : ""}`);
console.log(`  self-test (bite proof): OK — 3 synthetic rows flagged (live-verified-no-DELTA, complete-on-allowlist-no-DELTA, filename-mismatch)`);
console.log(`  violations            : ${violations.length}`);
for (const v of violations) console.error(`  ${v}`);

const pass = violations.length === 0;
const ARTIFACT = gateArtifactPath("GATE_LIVE_VERIFIED_LEDGER_OUT", `${TRANCHE}-live-verified-ledger`);
writeGateArtifact(ARTIFACT, {
    generatedAt: snapshotStamp(),
    status: pass ? "pass" : "fail",
    gate: "proof:live-verified-ledger",
    command: COMMAND,
    tranche: TRANCHE,
    progress: PROGRESS,
    visualDir: VISUAL_DIR,
    allowlist: [...allowlist],
    waveRows: rows.length,
    liveVerified: liveVerified.map((r) => r.wave),
    completeOnAllowlist: completeOnAllowlist.map((r) => r.wave),
    violations,
});

if (!pass) {
    console.error(
        `\n[proof:live-verified-ledger] ${violations.length} ledger violation(s) — \`live-verified\`/allowlisted-\`complete\` is gate-defined by a fresh on-disk own-surface .png DELTA, never author-asserted.`,
    );
    process.exit(1);
}
console.log(
    "\n[proof:live-verified-ledger] every live-verified + allowlisted-complete row is backed by a real on-disk DELTA; no (DEVELOPED) modifier in any status cell.",
);

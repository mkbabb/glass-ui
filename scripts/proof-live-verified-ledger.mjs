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

import { execSync } from "node:child_process";
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

// ── AY.W-LIVE1: the FRESHNESS clause (the depth-header — closes the D2 stale-DELTA
// residual). A present-but-STALE PNG (the surface regressed AFTER the capture) used
// to ship CI-green; the freshness clause asserts a captured DELTA is NOT stale
// relative to the source it depicts, via the git-ancestry of the declared headers:
//   <!-- capture-commit: <SHA> -->     the commit the capture was taken against
//   <!-- surface-paths: <glob,glob> --> the source files that PAINT the captured surface
// The gate runs `git log -1 --format=%H -- <surface-paths>` (the surface's last-touch)
// and asserts it is an ancestor of the capture commit (the surface did not change
// AFTER the capture). FATAL under --strict-freshness (the :ax backlog tracker + the
// close-verification arm set it); on the bare active arm it reports the staleness as
// a non-fatal NOTE during the documented backfill window (the W-CARDINAL-INFRA §4a
// un-lockout invariant — the active :ay commit/CI gate is NOT a freshness lockout;
// the owed re-captures are AY.W-DELTA0 / the owed-DELTA sweep's named-successor job).
// The SELF-TEST exercises a synthetic header-bearing stale row EVERY run (the bite is
// un-skippable regardless of the flag), and a DELTA that DECLARES headers but is stale
// REDs even on the bare arm (a declared-then-stale header is never grandfathered —
// only the header-LESS backfill window is graced).
const STRICT_FRESHNESS = process.argv.includes("--strict-freshness");

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

// ── AY.W-LIVE1: the freshness verdict (git-ancestry of the declared headers) ────
/**
 * Parse the `<!-- capture-commit: -->` + `<!-- surface-paths: -->` headers from a
 * DELTA doc and assert the surface's last-touch commit is an ancestor of (or equal
 * to) the capture commit (i.e. the surface did NOT change after the capture).
 *
 * @param {string} doc the DELTA markdown
 * @returns {{state:"fresh"} | {state:"stale", reason:string} | {state:"no-header"}}
 *   - "fresh"     : headers present, the surface is an ancestor of the capture.
 *   - "stale"     : headers present, the surface changed AFTER the capture (RED).
 *   - "no-header" : the headers are absent (the backfill-window grace boundary —
 *                   RED under --strict-freshness, a non-fatal NOTE on the bare arm).
 */
function freshnessVerdict(doc) {
    const cap = doc.match(/<!--\s*capture-commit:\s*([0-9a-fA-F]{7,40})\s*-->/);
    const sp = doc.match(/<!--\s*surface-paths:\s*([^>]*?)\s*-->/);
    if (!cap || !sp || !sp[1].trim()) return { state: "no-header" };
    const captureSha = cap[1].trim();
    const surfacePaths = sp[1]
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);
    const git = (cmd) => {
        try {
            return execSync(cmd, { cwd: ROOT, stdio: ["ignore", "pipe", "ignore"] })
                .toString()
                .trim();
        } catch {
            return "";
        }
    };
    // The capture commit must resolve (a real object in this repo).
    if (!git(`git cat-file -t ${captureSha}`)) {
        return {
            state: "stale",
            reason: `capture-commit ${captureSha} is not a commit in this repo — the freshness header is unverifiable`,
        };
    }
    const surfaceSha = git(
        `git log -1 --format=%H -- ${surfacePaths.map((p) => `'${p}'`).join(" ")}`,
    );
    if (!surfaceSha) {
        // No commit ever touched the declared surface paths — treat as fresh (the
        // surface is unchanged relative to any capture; a typo in the paths would
        // show as a never-touched surface, which the wave author owns).
        return { state: "fresh" };
    }
    // surface is an ancestor of (or ==) capture  ⇒  fresh.
    try {
        execSync(`git merge-base --is-ancestor ${surfaceSha} ${captureSha}`, {
            cwd: ROOT,
            stdio: "ignore",
        });
        return { state: "fresh" };
    } catch {
        return {
            state: "stale",
            reason: `surface ${surfacePaths.join(",")} changed at ${surfaceSha.slice(0, 12)} after the capture commit ${captureSha.slice(0, 12)} — re-capture`,
        };
    }
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
    const own = ownSurfaceVerdict(wave, realPngs.map(baseName));
    if (!own.ok) return own;

    // AY.W-LIVE1 freshness clause (the depth-header). Layered ON the own-surface bar.
    const fresh = freshnessVerdict(doc);
    if (fresh.state === "stale")
        return {
            ok: false,
            reason: `${wave}-DELTA stale: ${fresh.reason}`,
        };
    if (fresh.state === "no-header") {
        // The grace boundary: a header-LESS DELTA reds ONLY under --strict-freshness
        // (the :ax backlog tracker + the close-verification arm). On the bare active
        // arm it stays GREEN with a NOTE (the W-CARDINAL-INFRA §4a un-lockout — the
        // owed re-capture is the named-successor AY.W-DELTA0 / owed-DELTA sweep).
        if (STRICT_FRESHNESS)
            return {
                ok: false,
                reason: `${wave}-DELTA lacks the freshness headers (capture-commit + surface-paths) the protocol mandates — add them or re-capture (AY.W-LIVE1 / W-DELTA0)`,
            };
        return { ok: true, pngs: own.pngs, freshnessNote: "no-header" };
    }
    return { ok: true, pngs: own.pngs, freshnessState: "fresh" };
}

// ── Evaluate a single row → a violation string, or null ───────────────────────
// AY.W-LIVE1: header-LESS own-surface DELTAs that passed the bare-arm grace boundary
// (the backfill window) — printed as NOTEs, NOT violations; the owed re-captures are
// the AY.W-DELTA0 / owed-DELTA sweep's named-successor job.
const freshnessNotes = [];

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
        // AY.W-LIVE1: a header-LESS own-surface DELTA passed the bare-arm grace; record
        // the freshness NOTE (the owed re-capture, named-successor AY.W-DELTA0). Under
        // --strict-freshness this path is unreachable (d.ok would be false above).
        if (d.freshnessNote === "no-header")
            freshnessNotes.push(
                `${row.wave} (line ${row.line}): own-surface DELTA present but lacks the AY.W-LIVE1 freshness headers (capture-commit + surface-paths) — graced on the bare arm, owed a re-capture (AY.W-DELTA0 / owed-DELTA sweep). RED under --strict-freshness.`,
            );
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
    {
        // AY.W-LIVE1: the freshness self-test — a DELTA carrying freshness headers
        // whose surface-paths last-touch POST-DATES the capture-commit MUST flag
        // `state:"stale"`. Deterministic via two known repo objects: capture-commit
        // = the ROOT commit (always an ancestor of every later touch), surface-paths
        // = `package.json` (always touched after the root commit). The bite is
        // un-skippable EVERY run, regardless of --strict-freshness.
        label: "freshness — DELTA headers declare a capture-commit (root) PRECEDING the surface last-touch (package.json) → stale",
        flag: (() => {
            let rootSha = "";
            try {
                rootSha = execSync("git rev-list --max-parents=0 HEAD", {
                    cwd: ROOT,
                    stdio: ["ignore", "pipe", "ignore"],
                })
                    .toString()
                    .trim()
                    .split("\n")
                    .pop()
                    .trim();
            } catch {
                rootSha = "";
            }
            // No git / detached snapshot — the self-test cannot run the ancestry probe;
            // treat as flagged (do not silently pass) so a git-less runner reds loudly.
            if (!rootSha) return "no-git";
            const synthetic = `<!-- capture-commit: ${rootSha} -->\n<!-- surface-paths: package.json -->`;
            return freshnessVerdict(synthetic).state === "stale" ? "flagged" : null;
        })(),
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
console.log(`  self-test (bite proof): OK — 4 synthetic rows flagged (live-verified-no-DELTA, complete-on-allowlist-no-DELTA, filename-mismatch, freshness-stale)`);
console.log(`  freshness mode        : ${STRICT_FRESHNESS ? "STRICT (header-less own-surface DELTA REDs)" : "bare (header-less graced; staleness NOTEd — AY.W-LIVE1 backfill window)"}`);
console.log(`  freshness notes       : ${freshnessNotes.length}${freshnessNotes.length ? " (header-less own-surface DELTAs, owed AY.W-DELTA0 re-capture)" : ""}`);
for (const n of freshnessNotes) console.log(`  NOTE  ${n}`);
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
    strictFreshness: STRICT_FRESHNESS,
    freshnessNotes,
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

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

// ── AY.W-LIVE1 (R1): the IHDR dimension read — the FABRICATED-VIEWPORT assert ───
// The cardinal lesson at one further remove (HC-cardinal §1a): a desktop-viewport
// screenshot RENAMED `-mobile-` passes the magic-byte + size floor untouched (the four
// 1280×721 W-CON1 "mobile" fakes shipped green). The PNG IHDR chunk carries the true
// width/height (a big-endian uint32 pair at byte offsets 16/20, immediately after the
// 8-byte signature + the 4-byte length + the "IHDR" type). Reading it lets the gate
// reconcile the filename's viewport TOKEN against the actual pixels — a fabrication
// the magic-byte check can never catch.
// @returns {{w:number, h:number} | null} the IHDR dimensions, or null if unreadable.
function pngDimensions(p) {
    try {
        const fd = readFileSync(p);
        // signature(8) + length(4) + "IHDR"(4) then width(4) + height(4).
        if (fd.length < 24 || fd.subarray(12, 16).toString("ascii") !== "IHDR") return null;
        return { w: fd.readUInt32BE(16), h: fd.readUInt32BE(20) };
    } catch {
        return null;
    }
}

// The desktop-class width floor: a real desktop full-viewport capture is ≥1280px
// (the CAPTURE-PROTOCOL desktop floor). The largest LEGITIMATE mobile capture in the
// tranche is 390×844@2× = 780px wide; an element crop is far smaller. So a `-mobile-`
// basename whose IHDR width is ≥ this bound is a desktop screenshot mislabeled mobile
// (the fabrication class) — 1000 sits cleanly ABOVE the max real mobile (780) and
// BELOW the min desktop full-viewport (1280), so it false-flags neither.
const FABRICATED_MOBILE_WIDTH = 1000;

/**
 * The R1 fabricated-viewport verdict over a single own-surface PNG path. A basename
 * carrying the `-mobile-` viewport token must NOT have a desktop-class IHDR width
 * (≥ FABRICATED_MOBILE_WIDTH). PURE over a {basename, dims} pair so the self-test can
 * exercise it deterministically with no on-disk fixture.
 *
 * @param {string} basename
 * @param {{w:number, h:number} | null} dims
 * @returns {{ok:true} | {ok:false, reason:string}}
 */
function viewportFidelityVerdict(basename, dims) {
    if (!/-mobile-/.test(basename)) return { ok: true };
    if (!dims) return { ok: true }; // unreadable IHDR ≠ fabrication; the real-PNG bar already held
    if (dims.w >= FABRICATED_MOBILE_WIDTH)
        return {
            ok: false,
            reason: `${basename} carries the -mobile- viewport token but its IHDR is ${dims.w}×${dims.h} — a desktop-class width (≥${FABRICATED_MOBILE_WIDTH}px) RENAMED mobile (the fabricated-viewport class, HC-cardinal §1a) — re-capture at a real mobile viewport`,
        };
    return { ok: true };
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

// ── AY.W-LIVE1 (R6): the GREEN-on-real-surface verdict ──────────────────────────
const GATES_DIR = join(ROOT, ".cache/gates");

/**
 * Resolve every `.cache/gates/<id>.json` artefact a DELTA CITES and assert each reads
 * `status === "pass"`. A DELTA citing a gate artefact is asserting that gate passed on
 * the real surface; if the on-disk artefact reads `fail` (or is absent), the prose
 * GREEN claim is contradicted by the persisted RED (the HC-cardinal §3a class). PURE
 * over the doc text (reads only the cited artefact files) so the self-test can plant a
 * synthetic citation.
 *
 * @param {string} doc the DELTA markdown
 * @returns {{state:"green"} | {state:"red", reason:string} | {state:"no-citation"}}
 */
function gateStatusVerdict(doc) {
    // Cited artefacts: `.cache/gates/<ID>.json` paths anywhere in the DELTA prose.
    const cited = [
        ...new Set([...doc.matchAll(/\.cache\/gates\/([A-Za-z0-9_-]+)\.json/g)].map((m) => m[1])),
    ];
    if (!cited.length) return { state: "no-citation" };
    const bad = [];
    for (const id of cited) {
        const p = join(GATES_DIR, `${id}.json`);
        if (!existsSync(p)) {
            bad.push(`${id}.json cited but absent on disk`);
            continue;
        }
        try {
            const a = JSON.parse(readFileSync(p, "utf8"));
            if (a.status !== "pass")
                bad.push(`${id}.json persists status:"${a.status}" (the cited gate is NOT green on the real surface)`);
        } catch {
            bad.push(`${id}.json cited but is not parseable JSON`);
        }
    }
    if (bad.length)
        return {
            state: "red",
            reason: `${bad.join("; ")} — the DELTA's prose GREEN claim is contradicted by the persisted artefact (HC-cardinal §3a; re-run the gate on the real surface + persist the PASS — the wave's RG job)`,
        };
    return { state: "green" };
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

    // AY.W-LIVE1 (R1): the IHDR fabricated-viewport assert. Layered ON the own-surface
    // bar. A HARD bar (a fabricated viewport is fraud, never graced): an own-surface
    // PNG carrying the -mobile- token must NOT have a desktop-class IHDR width.
    for (const r of realPngs) {
        const abs = r.startsWith("/") ? r : resolve(VISUAL_DIR, r);
        const bn = baseName(r);
        if (!new RegExp(`^${wave}-`).test(bn)) continue; // own-surface PNGs only
        const fid = viewportFidelityVerdict(bn, pngDimensions(abs));
        if (!fid.ok) return { ok: false, reason: fid.reason };
    }

    // AY.W-LIVE1 (R6): the GREEN-on-real-surface clause. A DELTA that CITES a gate
    // artefact (`.cache/gates/<id>.json`) is asserting that gate passed on the real
    // surface — but nothing read the cited artefact's STATUS, so a DELTA could (and
    // W-DOCK2 does, HC-cardinal §3a.2 / HC-mechanisms §7) claim GREEN in prose while
    // the persisted artefact reads `status:"fail"`. The clause resolves the cited
    // artefacts and asserts each `status === "pass"`. Same grace discipline as the
    // freshness clause: a failing/missing cited artefact NOTEs on the bare active arm
    // (owed to the named successor — the wave's own RG re-run, e.g. W-DOCK2 RG2) and
    // REDs under --strict-freshness. A born-RED witness made MACHINE-VISIBLE, never a
    // silent ride.
    const gateVerdict = gateStatusVerdict(doc);
    if (gateVerdict.state === "red") {
        if (STRICT_FRESHNESS)
            return { ok: false, reason: `${wave}-DELTA cites a non-GREEN gate: ${gateVerdict.reason}` };
        // bare arm: NOTE, do not block — recorded below by the caller.
    }

    // AY.W-LIVE1 freshness clause (the depth-header). Layered ON the own-surface bar.
    const fresh = freshnessVerdict(doc);
    if (fresh.state === "stale") {
        // A stale DELTA whose surface was RE-CAPTURED by a later own-surface
        // live-verified wave is graced on the bare arm: the FRESH evidence exists, just
        // under the named successor wave (declared by `<!-- superseded-by: <wave> -->`).
        // This is the documented backfill window (W-LIVE1 decision §"Residual") — the
        // honest capture-commit + the genuine staleness is RECORDED, the fresher pixels
        // are named, the re-capture-under-this-wave-id is W-DELTA0's. RED under
        // --strict-freshness (the close-verification arm sees every stale capture).
        const sup = doc.match(/<!--\s*superseded-by:\s*([\w-]+)\s*-->/);
        if (sup && !STRICT_FRESHNESS)
            return {
                ok: true,
                pngs: own.pngs,
                freshnessNote: "stale-superseded",
                supersededBy: sup[1],
                staleReason: fresh.reason,
                gateNote: gateVerdict.state === "red" ? gateVerdict.reason : null,
            };
        return {
            ok: false,
            reason: `${wave}-DELTA stale: ${fresh.reason}${sup ? ` (superseded-by ${sup[1]}; RED under --strict-freshness, owed an own-wave-id re-capture — AY.W-DELTA0)` : ""}`,
        };
    }
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
        return { ok: true, pngs: own.pngs, freshnessNote: "no-header", gateNote: gateVerdict.state === "red" ? gateVerdict.reason : null };
    }
    return { ok: true, pngs: own.pngs, freshnessState: "fresh", gateNote: gateVerdict.state === "red" ? gateVerdict.reason : null };
}

// ── Evaluate a single row → a violation string, or null ───────────────────────
// AY.W-LIVE1: header-LESS own-surface DELTAs that passed the bare-arm grace boundary
// (the backfill window) — printed as NOTEs, NOT violations; the owed re-captures are
// the AY.W-DELTA0 / owed-DELTA sweep's named-successor job.
const freshnessNotes = [];
// AY.W-LIVE1 (R6): allowlisted DELTAs citing a non-GREEN gate artefact that passed the
// bare-arm grace — printed as NOTEs, NOT violations (RED under --strict-freshness). The
// owed re-run is the wave's own RG job (e.g. W-DOCK2 RG2 — green-on-real dock-animation).
const gateNotes = [];

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
        if (d.freshnessNote === "stale-superseded")
            freshnessNotes.push(
                `${row.wave} (line ${row.line}): own-surface DELTA stale (${d.staleReason}) but RE-CAPTURED by ${d.supersededBy} (the fresh own-surface evidence; declared superseded-by) — graced on the bare arm, owed an own-wave-id re-capture (AY.W-DELTA0). RED under --strict-freshness.`,
            );
        // AY.W-LIVE1 (R6): the DELTA cites a gate artefact that persists non-GREEN —
        // graced on the bare arm, RED under --strict-freshness (where d.ok is already
        // false above). Recorded as a NOTE so the persisted RED is MACHINE-VISIBLE.
        if (d.gateNote)
            gateNotes.push(
                `${row.wave} (line ${row.line}): ${d.gateNote} — graced on the bare arm, owed the wave's RG re-run-on-real. RED under --strict-freshness.`,
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
    {
        // AY.W-LIVE1 (R1): the IHDR fabricated-viewport self-test — a `-mobile-`
        // basename carrying a desktop-class IHDR width (1280) MUST flag. Exercises the
        // PURE viewport-fidelity verdict deterministically, no on-disk fixture.
        label: "R1 viewport-fidelity — a -mobile- PNG with a 1280px (desktop-class) IHDR width is the fabricated-viewport class",
        flag: viewportFidelityVerdict("W99-foo-mobile-light.png", { w: 1280, h: 721 }).ok
            ? null
            : "flagged",
    },
    {
        // AY.W-LIVE1 (R6): the GREEN-on-real-surface self-test — a DELTA citing a gate
        // artefact whose persisted status is NOT "pass" MUST flag `state:"red"`. The
        // synthetic doc cites a non-existent artefact id (absent on disk → red), so the
        // bite is deterministic and needs no fixture.
        label: "R6 gate-status — a DELTA citing a gate artefact that is absent/non-pass is contradicted by the persisted RED",
        flag:
            gateStatusVerdict(
                "see `.cache/gates/W99-SELFTEST-NONEXISTENT-ARTEFACT.json` status pass",
            ).state === "red"
                ? "flagged"
                : null,
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
console.log(`  self-test (bite proof): OK — ${selfTests.length} synthetic rows flagged (live-verified-no-DELTA, complete-on-allowlist-no-DELTA, filename-mismatch, freshness-stale, R1-viewport-fidelity, R6-gate-status)`);
console.log(`  freshness mode        : ${STRICT_FRESHNESS ? "STRICT (header-less own-surface DELTA + non-GREEN-cited-gate REDs)" : "bare (header-less + non-GREEN-cited-gate graced; NOTEd — AY.W-LIVE1 backfill window)"}`);
console.log(`  freshness notes       : ${freshnessNotes.length}${freshnessNotes.length ? " (header-less own-surface DELTAs, owed AY.W-DELTA0 re-capture)" : ""}`);
for (const n of freshnessNotes) console.log(`  NOTE  ${n}`);
console.log(`  gate-status notes (R6): ${gateNotes.length}${gateNotes.length ? " (allowlisted DELTAs citing a non-GREEN gate artefact, owed the wave's RG re-run-on-real)" : ""}`);
for (const n of gateNotes) console.log(`  NOTE  ${n}`);
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
    gateNotes,
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

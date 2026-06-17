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
// Targets the STATUS cell of wave-table rows only — located by HEADER NAME, not by
// a hardcoded column ordinal (BB.W-LEDGER-REPAIR: the parser was positionally
// coupled to the AX `| Wave | Title | Status |` shape — wave=col0, status=last —
// and went SILENTLY INERT the moment BA re-ordered to `| batch | wave | status |
// notes |` and BB to `| wave | status | gate | note |`, the cardinal-lesson class
// recurring inside the gate built to catch it). The parser reads the table's OWN
// header row and finds the `wave` + `status` columns by name, so column order is
// FREE — a future tranche orders its columns however it likes. A prose or legend
// mention of `live-verified`/`(DEVELOPED)` (e.g. documenting the retired label) is
// not a claim and is ignored (the wave-id regex still gates the row).
//
// SELF-PROVING: seven synthetic checks are evaluated every run — a `live-verified`
// row with no DELTA, a `complete`-on-(synthetic)-allowlist row with no DELTA, a
// `live-verified` row whose only referenced PNG is a NON-matching (neighbour's)
// filename, a freshness-stale header, an R1 fabricated-viewport PNG, an R6
// non-GREEN cited-gate artefact, and (BB.W-LEDGER-REPAIR) a COLUMN-ORDER bite — a
// `batch`-first / `status`-mid table the OLD positional parser mis-read to 0 rows,
// which the header-named parser must parse to exactly one `W-TEST` live-verified
// row. If the detector fails to flag any of the seven, the gate reds loudly
// (acceptance is the RED-witness inverse). And a PROGRESS table with NO header row
// naming both `wave` and `status` fails LOUD (a named diagnostic + non-zero exit)
// — a silent 0-row green is the precise failure this gate kills.
//
// Tranche-parameterized: `--tranche=<X>` (default `AX`) reads
// `docs/tranches/<X>/PROGRESS.md` + `<X>/audit/visual/` and stamps the artefact
// `<X>-live-verified-ledger`. The bare arm + the commit-msg hook run the ACTIVE
// tranche `--tranche=BB`; the per-tranche tracker arms `:ax`/`:ay`/`:az`/`:ba`
// gate the closed tranches. The slides twin
// (slides/scripts/proof-live-verified-ledger.mjs) defaults `--tranche=L` and
// carries the SAME latent positional fragility — it re-syncs to this column-by-
// header parser on the slides repo's next adopt (W-SLIDES-HANDOFF coordination).
//
// Also runnable as the commit-msg hook (.githooks/commit-msg) for the fast local
// bite; the CI job re-runs it so a `--no-verify` bypass is still caught.

import { createHash } from "node:crypto";
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

// ── The FRESHNESS clause (the depth-header — closes the stale-DELTA residual). A
// present-but-STALE PNG (the surface regressed AFTER the capture) used to ship
// CI-green; the freshness clause asserts a captured DELTA is NOT stale relative to
// the source it depicts. AZ.W-GATES (D6) migrated the model OFF the git-ancestry
// TREADMILL (a frozen capture-commit vs the surface's moving last-touch — every
// unrelated commit re-staled it) ONTO a CONTENT HASH of the declared surface bytes:
//   <!-- surface-paths: <path,path> --> the source files that PAINT the captured surface
//   <!-- surface-hash: <sha256 hex> --> the hash of those files' bytes AT capture time
// The gate recomputes the hash of the CURRENT surface-paths bytes and asserts it is
// byte-identical to the declared value (the relevant pixels are unchanged since
// capture) — fresh IFF byte-identical, regardless of how many unrelated commits
// touched the file. FATAL under --strict-freshness (the close-verification arm sets
// it); on the bare active arm staleness is a non-fatal NOTE during the documented
// backfill window (the un-lockout invariant — the owed re-captures are the
// owned-wave DELTA / W-DELTA0 named-successor job). The SELF-TEST exercises a
// synthetic header-bearing stale row EVERY run (the bite is un-skippable regardless
// of the flag), and a DELTA that DECLARES headers but is stale REDs even on the bare
// arm (a declared-then-stale header is never grandfathered — only the header-LESS
// backfill window is graced).
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

// ── Parse the PROGRESS wave-table rows — by HEADER NAME, not position ──────────
// BB.W-LEDGER-REPAIR: the parser was positionally coupled to the AX `| Wave |
// Title | Status |` shape (wave=col0, status=last). BA re-ordered to `| batch |
// wave | status | notes |` (wave=col1, status=col2) and BB to `| wave | status |
// gate | note |` (status=col1) — so `body[0]`/`body[last]` silently read the wrong
// cells and the gate went INERT (the cardinal-lesson class recurring inside the
// gate built to catch it). The fix reads the table's OWN header row: scan for the
// first pipe-row whose lowercased cells carry BOTH `wave` and `status`, record those
// column INDICES, then read `cells[waveIdx]`/`cells[statusIdx]` for the data rows.
// A file may carry MULTIPLE wave tables (BB's per-batch sections each open a fresh
// `| wave | status | gate | note |` header); the most-recent header in source order
// governs the rows beneath it, so a column re-order between sections is honoured.
// Column order is now FREE — a future tranche orders its columns however it likes.

/**
 * Split a pipe-row into trimmed inner cells (drop the outer-pipe empties). A
 * markdown `\|` is a LITERAL pipe inside a cell, NOT a column delimiter (AZ's
 * W-METRIC-UNIFY row carries `amount \|\| placeholder` in its grounding cell) —
 * splitting naively on every `|` would shift the column indices and the
 * header-named parser would read the wrong cell. Split on UN-escaped pipes only
 * (a `|` not preceded by `\`), then unescape `\|` → `|` in each cell.
 */
function rowCells(ln) {
    const cells = ln
        .split(/(?<!\\)\|/)
        .map((c) => c.replace(/\\\|/g, "|").trim());
    return cells.filter((_, idx) => idx > 0 && idx < cells.length - 1);
}

/** A markdown separator row (`|---|---|`) carries only dashes/colons. */
function isSeparatorRow(cells) {
    return cells.length > 0 && cells.every((c) => /^:?-+:?$/.test(c));
}

/**
 * Locate the wave + status column indices from a header row's cells. The match is
 * by NAME (lowercased exact-cell): the first cell that is `wave` and the first that
 * is `status`. Returns null when the row does not carry BOTH.
 * @param {string[]} cells
 * @returns {{waveIdx:number, statusIdx:number} | null}
 */
function headerIndices(cells) {
    const lower = cells.map((c) => c.toLowerCase());
    const waveIdx = lower.indexOf("wave");
    const statusIdx = lower.indexOf("status");
    if (waveIdx === -1 || statusIdx === -1) return null;
    return { waveIdx, statusIdx };
}

/**
 * Parse the PROGRESS wave-table rows by header name.
 * @returns {{wave:string, status:string, line:number}[]}
 */
function waveRows(md) {
    const rows = [];
    const lines = md.split("\n");
    /** @type {{waveIdx:number, statusIdx:number} | null} */
    let cols = null;
    let sawHeader = false;
    lines.forEach((ln, i) => {
        if (!ln.trimStart().startsWith("|")) return;
        const cells = rowCells(ln);
        if (cells.length < 2) return;
        if (isSeparatorRow(cells)) return; // the `|---|---|` rule under a header
        // A header row re-anchors the column map (a file may carry many tables).
        const found = headerIndices(cells);
        if (found) {
            cols = found;
            sawHeader = true;
            return; // the header itself is not a data row
        }
        if (!cols) return; // a pipe-row before any wave/status header — not a wave table
        const wave = cells[cols.waveIdx] ?? "";
        // wave id only (skips legend/other tables): the AX numbered form `W<digit>…`
        // OR the AY/BA/BB named form `W-<UPPER>…`. Prose + batch-digit cells never match.
        if (!/^W(\d|-[A-Z])/.test(wave)) return;
        const status = cells[cols.statusIdx] ?? "";
        rows.push({ wave, status, line: i + 1 });
    });
    if (!sawHeader) {
        // Fail-loud: no header row named both `wave` and `status`. A silent 0-row
        // green is the precise failure BB.W-LEDGER-REPAIR kills.
        console.error(
            `[proof:live-verified-ledger] could not locate the wave/status columns by header — the table must carry a header row naming both \`wave\` and \`status\` (${PROGRESS}).`,
        );
        process.exit(1);
    }
    return rows;
}

// The status token a cell asserts: live-verified vs live-pending vs … The first
// segment before a separator (— · () ) is the token. Strip the `**bold**` markers
// some tables wrap the close-token in (BA's `**complete**`/`**live-verified**`
// idiom) so the token reads through the markdown.
function statusToken(status) {
    return status
        .replace(/\*\*/g, "")
        .split(/[—·(]/)[0]
        .trim()
        .toLowerCase();
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

// ── AZ.W-GATES (D6): the freshness verdict — CONTENT-HASH, not git-ancestry ──────
// The git-ancestry model (a FROZEN capture-commit SHA compared to the surface's
// MOVING last-touch via `git merge-base --is-ancestor`) was a TREADMILL: the
// capture-commit never advances on its own, so EVERY unrelated commit touching any
// declared surface-path re-staled the DELTA — it tracked commit-churn, not pixels.
// The content-hash model binds freshness to the CONTENT of the declared surface
// files: fresh IFF the declared surface bytes are byte-identical to capture time,
// regardless of how many unrelated commits touched the file. NO git involved.
//
// The header (computed ONCE at capture time, the read-blob-shaders/read-dock-css
// concat idiom):
//   <!-- surface-paths: <comma-separated repo-relative paths> -->
//   <!-- surface-hash: <sha256 hex of the concatenated surface-paths' bytes> -->

/**
 * The PURE surface-hash: read each path's bytes in the declared order, join with a
 * single "\n" separator (the read-dock-css.mjs concat idiom), sha256 the buffer,
 * return the hex. Exported for the W-DELTA0 capture step that stamps the header.
 *
 * @param {string} root the repo root
 * @param {string[]} surfacePaths repo-relative paths in declared order
 * @returns {string} the sha256 hex (or "" if any path is unreadable)
 */
export function surfaceHash(root, surfacePaths) {
    const bufs = [];
    for (const p of surfacePaths) {
        const abs = join(root, p);
        if (!existsSync(abs)) return "";
        bufs.push(readFileSync(abs));
    }
    return createHash("sha256").update(bufs.join("\n")).digest("hex");
}

/**
 * Parse the `<!-- surface-paths: -->` + `<!-- surface-hash: -->` headers from a
 * DELTA doc and assert the CURRENT surface bytes hash to the declared value (the
 * relevant pixels are byte-identical to capture time). PURE over the doc + a root.
 *
 * @param {string} doc the DELTA markdown
 * @param {string} root the repo root
 * @returns {{state:"fresh"} | {state:"stale", reason:string} | {state:"no-header"}}
 *   - "fresh"     : headers present, the surface hashes to the declared value.
 *   - "stale"     : headers present, a declared surface drifted since capture (RED).
 *   - "no-header" : the headers are absent (the backfill-window grace boundary —
 *                   RED under --strict-freshness, a non-fatal NOTE on the bare arm).
 */
function freshnessVerdict(doc, root = ROOT) {
    const sp = doc.match(/<!--\s*surface-paths:\s*([^>]*?)\s*-->/);
    const sh = doc.match(/<!--\s*surface-hash:\s*([0-9a-fA-F]{64})\s*-->/);
    if (!sp || !sp[1].trim() || !sh) return { state: "no-header" };
    const surfacePaths = sp[1]
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);
    const declared = sh[1].trim().toLowerCase();
    // A declared path that no longer exists is a real drift (the surface moved/
    // deleted since capture) → stale, re-capture.
    for (const p of surfacePaths) {
        if (!existsSync(join(root, p)))
            return {
                state: "stale",
                reason: `surface path ${p} no longer exists — the captured surface moved/deleted since capture; re-capture`,
            };
    }
    const current = surfaceHash(root, surfacePaths);
    if (current === declared) return { state: "fresh" };
    return {
        state: "stale",
        reason: `surface ${surfacePaths.join(",")} changed since capture (hash ${declared.slice(0, 12)} → ${current.slice(0, 12)}) — re-capture`,
    };
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

    // The freshness clause (the content-hash depth-header). Layered ON the
    // own-surface bar. AZ.W-GATES (D6): the `superseded-by` grace is RETIRED with the
    // git-ancestry model — under the content hash a DELTA whose surface is
    // byte-identical to capture is already `fresh` (no marker needed), and a DELTA
    // whose surface DRIFTED is `stale` (the marker no longer hides a real change; the
    // superseded successor wave re-captures under its OWN id with its own fresh hash).
    const fresh = freshnessVerdict(doc);
    if (fresh.state === "stale") {
        // A real content drift since capture. Graced on the bare arm as a NOTE (the
        // owed re-capture is the owning-wave DELTA / W-DELTA0 named-successor job);
        // RED under --strict-freshness (the close-verification arm).
        if (STRICT_FRESHNESS)
            return { ok: false, reason: `${wave}-DELTA stale: ${fresh.reason}` };
        return {
            ok: true,
            pngs: own.pngs,
            freshnessNote: "stale",
            staleReason: fresh.reason,
            gateNote: gateVerdict.state === "red" ? gateVerdict.reason : null,
        };
    }
    if (fresh.state === "no-header") {
        // The grace boundary: a header-LESS DELTA reds ONLY under --strict-freshness
        // (the close-verification arm). On the bare active arm it stays GREEN with a
        // NOTE (the un-lockout — the owed re-capture is the named-successor W-DELTA0 /
        // owed-DELTA sweep).
        if (STRICT_FRESHNESS)
            return {
                ok: false,
                reason: `${wave}-DELTA lacks the freshness headers (surface-paths + surface-hash) the protocol mandates — add them or re-capture (AZ.W-GATES D6 / W-DELTA0)`,
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
        // A header-LESS own-surface DELTA passed the bare-arm grace; record the
        // freshness NOTE (the owed re-capture, named-successor W-DELTA0). Under
        // --strict-freshness this path is unreachable (d.ok would be false above).
        if (d.freshnessNote === "no-header")
            freshnessNotes.push(
                `${row.wave} (line ${row.line}): own-surface DELTA present but lacks the AZ.W-GATES freshness headers (surface-paths + surface-hash) — graced on the bare arm, owed a re-capture (W-DELTA0 / owed-DELTA sweep). RED under --strict-freshness.`,
            );
        // AZ.W-GATES (D6): the content-hash recomputed STALE — a declared surface
        // drifted since capture. Graced on the bare arm as a NOTE (owed an own-wave-id
        // re-capture that re-stamps the surface-hash); RED under --strict-freshness.
        if (d.freshnessNote === "stale")
            freshnessNotes.push(
                `${row.wave} (line ${row.line}): own-surface DELTA STALE — ${d.staleReason} — graced on the bare arm, owed an own-wave-id re-capture that re-stamps the surface-hash (W-DELTA0). RED under --strict-freshness.`,
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
        // AZ.W-GATES (D6): the content-hash freshness self-test — a DELTA declaring
        // freshness headers whose surface-hash does NOT match the CURRENT surface
        // bytes MUST flag `state:"stale"`. Deterministic: surface-paths = a real
        // repo file (package.json), surface-hash = an all-zero hex that can never
        // equal a real content hash. The bite is un-skippable EVERY run, no git.
        label: "freshness — DELTA declares surface-paths (package.json) with a WRONG surface-hash (all-zero) → stale",
        flag:
            freshnessVerdict(
                `<!-- surface-paths: package.json -->\n<!-- surface-hash: ${"0".repeat(64)} -->`,
            ).state === "stale"
                ? "flagged"
                : null,
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
    {
        // BB.W-LEDGER-REPAIR: the COLUMN-ORDER self-test — the born-RED witness that
        // makes the positional-coupling regression structurally impossible to re-
        // introduce. The fixture is a `batch`-first / `status`-mid table (BA's exact
        // shape, where the OLD positional parser read `body[0]` = the batch digit → 0
        // rows, mis-reading the whole ledger to green). The repaired column-by-header
        // parser must locate `wave` (col 1) + `status` (col 2) by NAME and return
        // EXACTLY ONE row with `wave === "W-TEST"` and status token `live-verified`.
        // The `**bold**` wrap mirrors BA's idiom (the marker must strip through). PURE
        // over the fixture string (no on-disk file), deterministic every run. If
        // `waveRows` regresses to positional, the W-TEST row mis-parses → the parsed
        // set is not the expected single live-verified row → this flag goes falsy →
        // the gate reds loudly (the RED-witness inverse).
        label: "column-order — a batch-first / status-mid table parses W-TEST as live-verified by HEADER NAME, not position",
        flag: (() => {
            const fixture =
                "| batch | wave | status | notes |\n" +
                "|---|---|---|---|\n" +
                "| 0 | W-TEST | **live-verified** | x |\n" +
                "| 0 | W-OTHER | live-pending | y |";
            const parsed = waveRows(fixture);
            const lv = parsed.filter((r) => statusToken(r.status) === "live-verified");
            return parsed.length === 2 &&
                lv.length === 1 &&
                lv[0].wave === "W-TEST"
                ? "flagged"
                : null;
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
console.log(`  self-test (bite proof): OK — ${selfTests.length} synthetic rows flagged (live-verified-no-DELTA, complete-on-allowlist-no-DELTA, filename-mismatch, freshness-stale, R1-viewport-fidelity, R6-gate-status, column-order)`);
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

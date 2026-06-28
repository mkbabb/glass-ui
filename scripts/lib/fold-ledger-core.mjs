// fold-ledger-core.mjs - the DRY core shared by the fold-ledger gates (BG.W-DEFERRED-LEDGER).
//
// The no-silent-drop fold-ledger pattern recurs once per tranche (BC.W-FOLD-LEDGER ->
// BG.W-DEFERRED-LEDGER). The four primitives that pattern needs are declared ONCE here so a
// per-tranche gate composes them via thin closures rather than re-cloning the body (the
// proof:bc-fold-ledger GREEN @213 refactor proved this is byte-equivalent; a future tranche
// transposes the same four):
//
//   extractDocIds(docText, opts)  - the markdown-table first-cell id extractor.
//   deriveBand(waveId, opts)      - the SINGLE band authority: a wave-spec's `**Band:**` header.
//   waveSpecExists(waveId, opts)  - a wave id resolves to a real wave-spec `.md` on disk.
//   clausesHit(failures)          - the {clause} Set helper the self-test reads.
//
// Each primitive is parameterized (no hardcoded tranche path / wave-id pattern) so the same
// function serves BC's `docs/tranches/BC/waves/BC.W-*` AND any later tranche's roster.

import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

// -- doc id extraction -----------------------------------------------------------
// A markdown ledger table carries `| id | ... |` rows whose first cell is the machine id. Extract
// every first-cell token that looks like a fold id; skip header cells (`id`/`ask`/`source`) and
// any caller-supplied genealogy/cross-ref ids (the no-double-count rule).
export function extractDocIds(docText, { exclude = new Set(), headerCells = new Set(["id", "ask", "source"]) } = {}) {
    const ids = new Set();
    for (const line of docText.split("\n")) {
        const m = line.match(/^\|\s*([a-z][a-z0-9-]+)\s*\|/);
        if (!m) continue;
        const id = m[1];
        if (headerCells.has(id)) continue;
        if (exclude.has(id)) continue;
        ids.add(id);
    }
    return ids;
}

// -- on-disk band derivation -----------------------------------------------------
// The SINGLE band authority: the named wave's `**Band:**` header. Parse the LEADING band token
// (a number, or the FORENSICS letter F) - the parenthetical and any "/ N" co-band suffix are
// advisory. Cache keyed by (wavesDir, waveId) so repeated lookups are free.
const _bandCache = new Map();
export function deriveBand(waveId, { wavesDir, bandRe = /\*\*Band:\*\*\s*([0-9]+|F)\b/ } = {}) {
    const cacheKey = `${wavesDir}::${waveId}`;
    if (_bandCache.has(cacheKey)) return _bandCache.get(cacheKey);
    const file = join(wavesDir, `${waveId}.md`);
    let band = null;
    if (existsSync(file)) {
        const text = readFileSync(file, "utf8");
        const m = text.match(bandRe);
        if (m) band = m[1] === "F" ? "F" : Number(m[1]);
    }
    _bandCache.set(cacheKey, band);
    return band;
}

// -- wave-spec existence ----------------------------------------------------------
// A wave id is real IFF it matches the tranche's id pattern AND resolves to a `.md` on disk.
export function waveSpecExists(waveId, { wavesDir, wavePattern } = {}) {
    return (
        typeof waveId === "string" &&
        wavePattern.test(waveId) &&
        existsSync(join(wavesDir, `${waveId}.md`))
    );
}

// -- self-test helper -------------------------------------------------------------
export function clausesHit(failures) {
    return new Set(failures.map((f) => f.clause));
}

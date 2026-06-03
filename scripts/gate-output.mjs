// gate-output.mjs — pure-function gate output (AS.W2, inv-θ / the F2 fix).
//
// A proof/profile gate is a pure function of source + tooling, but historically
// each wrote its JSON artefact into a git-TRACKED `docs/tranches/<T>/audit/*.json`
// path carrying `generatedAt: new Date().toISOString()` + live measurements
// (gzip bytes, durationMs). So every gate run — including CI's — mutated
// committed history-artefacts parked under CLOSED tranches, dirtying the tree
// and forcing a hand-restore. inv-θ: gate output is byte-stable and lands in a
// gitignored cache by default; a deliberate snapshot is opt-in.
//
// Default → `.cache/gates/<name>.json` (gitignored). Override → the gate's
// existing env var (e.g. `GLASS_UI_PACKAGE_ARTIFACT`) still points the artefact
// at a committed path for a DELIBERATE snapshot. `generatedAt` is omitted unless
// `GATE_SNAPSHOT=1`, so the cache artefact is byte-stable across runs (only a
// real source/measurement delta changes it).

import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { ROOT } from "./constellation.mjs";

const CACHE_DIR = resolve(ROOT, ".cache/gates");

/** Whether the caller asked for a deliberate, timestamped snapshot. */
export const isSnapshot = process.env.GATE_SNAPSHOT === "1";

/**
 * Resolve a gate's artefact path. If `envVar` is set in the environment, that
 * wins (a deliberate snapshot to a committed path); otherwise the byte-stable
 * cache path `.cache/gates/<cacheName>.json`.
 */
export function gateArtifactPath(envVar, cacheName) {
    const override = envVar ? process.env[envVar] : undefined;
    if (override) return resolve(ROOT, override);
    return resolve(CACHE_DIR, `${cacheName}.json`);
}

/**
 * Write a gate artefact as pure output. `generatedAt` (and any field listed in
 * `volatile`) is dropped unless `GATE_SNAPSHOT=1`, so the default cache artefact
 * is byte-stable — `git status` stays clean after a gate run.
 *
 * @param {string} path absolute artefact path (from gateArtifactPath)
 * @param {object} data the report object
 * @param {{volatile?: string[]}} [opts] extra top-level keys to drop unless snapshot
 */
export function writeGateArtifact(path, data, opts = {}) {
    const volatile = new Set(["generatedAt", ...(opts.volatile ?? [])]);
    let payload = data;
    if (!isSnapshot) {
        payload = Object.fromEntries(
            Object.entries(data).filter(([k]) => !volatile.has(k)),
        );
    }
    mkdirSync(dirname(path), { recursive: true });
    writeFileSync(path, `${JSON.stringify(payload, null, 2)}\n`);
    return path;
}

/** An ISO timestamp ONLY when snapshotting; otherwise undefined (omitted). */
export function snapshotStamp() {
    return isSnapshot ? new Date().toISOString() : undefined;
}

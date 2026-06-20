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

/**
 * Whether a `["local"]`-tagged LIVE-π gate should grace-SKIP its real-browser arm
 * because the runner is a CI environment.
 *
 * The cardinal-lesson split (the `proof:dock-no-scale-pop` / `proof:dock-animation-
 * live` / `proof:dock-tap-integrity` `!process.env.CI` precedent, generalized to a
 * single source): a live-π gate proves the PIXELS on a real local GPU + cursor; in
 * a CI environment the binding proof is the device-free union + the captured DELTA
 * backstopped by `proof:live-verified-ledger` (+ the holistic `proof:ba-gestalt`
 * verdict). The real `release.yml` CI runner does `npm ci` WITHOUT installing the
 * tests-visual Playwright browser, so a live-π gate's own `workspacePresent()`
 * probe already returns false there and it grace-SKIPs. This helper closes the ONE
 * gap that probe cannot see: `gates.mjs --run full` executed LOCALLY with `CI=true`
 * (the release.yml-accurate emulation) on a dev box that DOES carry the browser —
 * the live arm would otherwise run against a non-CI-faithful condition (a headless
 * route-transition DOM-detach, an oversized-canvas element-screenshot compositing
 * page chrome at its edges, a born-RED library-default register the shipped surface
 * does not paint) and read a harness/born-RED artifact as a release RED. With CI
 * set, the live arm SKIPs (matching the real CI runner's grace-skip + the gate's
 * own `["local"]` tag); with CI UNSET the local hard-CLOSED path is UNTOUCHED — the
 * gate still REDs a real break on the dev box, and via the ledger + ba-gestalt.
 *
 * NOTE: this never weakens the device-free or `ci`/`release`-tagged gates (they do
 * not call it); it only governs the live real-browser arm of a `["local"]` gate.
 */
export function liveArmCiGraceSkip() {
    return Boolean(process.env.CI);
}

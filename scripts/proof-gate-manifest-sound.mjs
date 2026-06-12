#!/usr/bin/env node
// AZ.W-GATES — proof:gate-manifest-sound, the gate-manifest-soundness meta-gate.
//
// `proof:all` was CRASHABLE at HEAD: a malformed `{ tags: ["local"] }` row (no id,
// no cmd) made `runMode("local")` run `npm run undefined` → exit 1 → the LOCAL
// aggregate died. The two parity meta-gates were BLIND to it (the cmd-literal parse
// + the scriptFor() continue both silently skip a cmd-less row). And four live-gate
// scripts + the playwright config still DEFAULTED to the foreign-app `:5173` port;
// one gate navigated a dead route; two blob gates were dangling-by-disuse + read a
// stale post-split shader path; the freshness model was a git-ancestry TREADMILL;
// and a ci-tagged font gate read a moved token file (false RED on every runner).
//
// This DEVICE-FREE meta-gate makes the manifest structurally sound + self-defending.
// Every clause is a manifest-array structural assertion, a subprocess gate run
// (gates.mjs --run local / proof:gate-script-parity / proof:tag-parity /
// proof:font-cascade-live), a grep over the live-gate script set, or a READ of a
// persisted .cache/gates/*.json artefact — NOT a browser spawn. It runs on EVERY
// runner; it is a `local`-only META-gate by the JUSTIFIED_LOCAL_ONLY precedent
// (an active-tranche meta-gate, promoted to ci by its own wave at AZ close).
//
// BORN-RED at open: the malformed row exists (clause 1) AND the content-hash
// freshness model is unimplemented (clause 7). GREEN only at the discharged
// terminal state.
//
// BA.W-GESTALT-GATE — clause 4 WIDENED off the `:5173`-only `DEFAULT_5173` regex
// to a GENERIC NON-:5199 default detector. The AZ sweep + the original regex
// missed the THREE surviving `:5175` dock-gate defaults (CHR-1, the chronic): the
// clause already walked the full live-gate set, only the regex matched `:5173`
// alone. The clause now extracts the port from any `??`-nullish default and flags
// it unless it is :5199 — catching `:5175`, `:5173`, and any future stray, the
// recurrence-proofing the chronic demands.

import { execFileSync } from "node:child_process";
import { createHash } from "node:crypto";
import { existsSync, readFileSync, readdirSync } from "node:fs";
import { resolve, relative } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { gatesFor } from "./gates.mjs";
import { gateArtifactPath, snapshotStamp, writeGateArtifact } from "./gate-output.mjs";

const ROOT = resolve(fileURLToPath(new URL("../", import.meta.url)));
const SCRIPTS = resolve(ROOT, "scripts");
const COMMAND = "npm run proof:gate-manifest-sound";

// The standing user-domain dirt the clean-tree guard allowlists (the docs/precepts
// submodule pointer the user owns). Any OTHER dirty tracked entry means a gate
// mutated source during the run (inv-θ) → RED.
const CLEAN_TREE_ALLOWLIST = new Set(["docs/precepts"]);

/** Run an npm script as a subprocess; return { ok, out }. */
function runNpm(script) {
    try {
        const out = execFileSync("npm", ["run", script], {
            cwd: ROOT,
            encoding: "utf8",
            stdio: ["ignore", "pipe", "pipe"],
        });
        return { ok: true, out };
    } catch (e) {
        return { ok: false, out: `${e.stdout ?? ""}${e.stderr ?? ""}` };
    }
}

/** Run a node script as a subprocess; return { ok, out }. */
function runNode(args) {
    try {
        const out = execFileSync("node", args, {
            cwd: ROOT,
            encoding: "utf8",
            stdio: ["ignore", "pipe", "pipe"],
        });
        return { ok: true, out };
    } catch (e) {
        return { ok: false, out: `${e.stdout ?? ""}${e.stderr ?? ""}` };
    }
}

/** The live-gate script set + the playwright config (the NO-5173 sweep targets). */
function liveGateScripts() {
    const set = readdirSync(SCRIPTS)
        .filter((f) => /^proof-.*\.mjs$/.test(f))
        .map((f) => resolve(SCRIPTS, f));
    set.push(resolve(ROOT, "tests-visual/playwright.config.ts"));
    return set;
}

function detectSound() {
    const violations = [];
    const facts = {};

    // ── Clause 1: MANIFEST-WELL-FORMED ──────────────────────────────────────
    // Every row in the union of the three aggregate sets carries a non-empty id
    // AND cmd. A cmd-less row can no longer exist (it would crash proof:all).
    const aggregateRows = new Set([
        ...gatesFor("local"),
        ...gatesFor("ci"),
        ...gatesFor("release"),
    ]);
    const malformed = [...aggregateRows].filter((g) => {
        const hasId = typeof g.id === "string" && g.id.trim().length > 0;
        const hasCmd = typeof g.cmd === "string" && g.cmd.trim().length > 0;
        return !hasId || !hasCmd;
    });
    facts.malformedRows = malformed.length;
    for (const g of malformed)
        violations.push(
            `[MANIFEST-WELL-FORMED] manifest row ${JSON.stringify(g)} has no id/cmd — every gatesFor() row must carry both (a cmd-less row crashes proof:all)`,
        );

    // ── Clause 2: PARITY-HARDENED ───────────────────────────────────────────
    // Both parity gates exit 0 (their structural pre-pass is in place). The
    // SELF-TEST inside each gate already injects a synthetic cmd-less row and
    // asserts BOTH detectors flag it — so a green subprocess here IS the
    // blind-spot-closed proof (a reverted pre-pass reds the gate's own self-test).
    const gsp = runNpm("proof:gate-script-parity");
    const tp = runNpm("proof:tag-parity");
    facts.gateScriptParity = gsp.ok;
    facts.tagParity = tp.ok;
    if (!gsp.ok)
        violations.push("[PARITY-HARDENED] proof:gate-script-parity did not exit 0 (the D2 structural well-formed pre-pass is not load-bearing)");
    if (!tp.ok)
        violations.push("[PARITY-HARDENED] proof:tag-parity did not exit 0 (the D2 well-formed presence assert is not load-bearing)");

    // ── Clause 3: PROOF-ALL-RUNS ────────────────────────────────────────────
    // The load-bearing end-to-end: `node scripts/gates.mjs --run local` completes
    // (the crash is gone). This actually RUNS proof:all.
    const proofAll = runNode([resolve(SCRIPTS, "gates.mjs"), "--run", "local"]);
    facts.proofAllRuns = proofAll.ok;
    if (!proofAll.ok)
        violations.push(
            `[PROOF-ALL-RUNS] node scripts/gates.mjs --run local did not exit 0 — the local aggregate did not complete${/Missing script: "undefined"/.test(proofAll.out) ? " (the malformed-row crash survives)" : ""}`,
        );

    // ── Clause 4: NON-:5199 DEFAULT ─────────────────────────────────────────
    // ZERO live-demo-URL nullish-default sites resolving a port OTHER than :5199 in
    // the live-gate script set + the config. The chronic the AZ sweep + the original
    // `DEFAULT_5173` regex missed (CHR-1): the THREE `:5175` dock-gate defaults sailed
    // past a regex that matched `:5173` alone. BA.W-GESTALT-GATE widens the detector to
    // flag ANY non-:5199 port in a live-demo-URL `??`-default — catching `:5175`,
    // `:5173`, and any future stray — the recurrence-proofing the chronic demands.
    //
    // SCOPE — the detector matches the live-demo-URL DEFAULT form `?? "scheme://host:<port>…"`
    // ONLY, never a bare-port `?? <number>`. The W-GESTALT-GATE census surfaced a
    // LEGITIMATE non-:5199 bare-port default in the set — `proof-runtime.mjs:24`
    // `GLASS_UI_CHROME_DEBUG_PORT ?? 9337` (a Chrome DevTools remote-debug port, NOT a
    // live-demo target; `profile-aurora.mjs`'s `?? 9347` twin is outside the proof-*.mjs
    // glob). The census proved EVERY live-demo default in the set is the URL-STRING form
    // (`GLASS_UI_DEMO_URL`/`GLASS_UI_*_BASE_URL ?? "http://…:5199"`) and NO demo target is
    // ever a bare-port `??` — so scoping the detector to the URL-string form catches the
    // entire chronic (the `:5175`/`:5173` residue was always the URL form) while leaving
    // the correct-by-design service-port default GREEN (it is NOT unilaterally :5199-
    // stamping a correct port). The env-var OVERRIDE (the `??` LHS) is never matched; the
    // surviving comments naming a foreign port stay GREEN (line comments stripped first).
    const CANONICAL_LIVE_PORT = "5199";
    // Capture the port from a live-demo-URL nullish-default `?? "scheme://host:<port>…"`.
    const NULLISH_DEFAULT_PORT = /\?\?\s*["']https?:\/\/[^"']*:(\d{4,5})["']/g;
    const nonCanonicalDefaults = [];
    for (const f of liveGateScripts()) {
        if (!existsSync(f)) continue;
        const src = readFileSync(f, "utf8");
        src.split("\n").forEach((line, i) => {
            // Drop the trailing line comment, but NOT the `//` in a `scheme://` URL
            // (the `(^|[^:])` guard preserves `://` — the clause-7 house idiom). The
            // inherited naive `/\/\/.*$/` strip ATE the URL's `//`, so the AZ NO-5173
            // URL-arm was a latent no-op; this URL-safe strip restores the detection.
            const code = line.replace(/(^|[^:])\/\/.*$/, "$1");
            for (const m of code.matchAll(NULLISH_DEFAULT_PORT)) {
                const port = m[1];
                if (port && port !== CANONICAL_LIVE_PORT)
                    nonCanonicalDefaults.push(`${relative(ROOT, f)}:${i + 1} (:${port})`);
            }
        });
    }
    facts.nonCanonicalPortDefaults = nonCanonicalDefaults;
    for (const o of nonCanonicalDefaults)
        violations.push(`[NON-:5199 DEFAULT] a non-:5199 live-demo-URL DEFAULT survives at ${o} — the BA.W-GESTALT-GATE scope fence forbids any live-demo default but :5199`);

    // ── Clause 5: DOCK-ROUTE-LIVE ───────────────────────────────────────────
    // proof-dock-orchestrator-single.mjs carries DOCK_ROUTE = "/dock/layers" (a
    // real route — the demo manifest produces /dock/layers) AND the gates.mjs:665
    // NOTE no longer contains /navigation/dock-layers.
    const orchSrc = readFileSync(resolve(SCRIPTS, "proof-dock-orchestrator-single.mjs"), "utf8");
    const dockRouteLive = /DOCK_ROUTE\s*=\s*"\/dock\/layers"/.test(orchSrc);
    const deadRouteSurvives = /\/navigation\/dock-layers/.test(orchSrc);
    const manifestSrc = readFileSync(resolve(ROOT, "demo/stories/manifest.ts"), "utf8");
    const dockLayersStory = /s\("dock",\s*"layers"/.test(manifestSrc);
    const gatesSrc = readFileSync(resolve(SCRIPTS, "gates.mjs"), "utf8");
    const noteHasDeadRoute = /\/navigation\/dock-layers/.test(gatesSrc);
    facts.dockRouteLive = dockRouteLive;
    facts.dockLayersStoryPresent = dockLayersStory;
    facts.gatesNoteHasDeadRoute = noteHasDeadRoute;
    if (!dockRouteLive || deadRouteSurvives)
        violations.push("[DOCK-ROUTE-LIVE] proof-dock-orchestrator-single.mjs does not carry DOCK_ROUTE = \"/dock/layers\" (the dead /navigation/dock-layers route survives)");
    if (!dockLayersStory)
        violations.push("[DOCK-ROUTE-LIVE] the demo manifest does not produce the /dock/layers story — the re-pointed route is not real");
    if (noteHasDeadRoute)
        violations.push("[DOCK-ROUTE-LIVE] the gates.mjs NOTE still names the dead /navigation/dock-layers route");

    // ── Clause 6: BLOB-GATES-WIRED ──────────────────────────────────────────
    // proof:blob-interaction-prm + proof:blob-tempo-suppression are BOTH gates.mjs
    // rows (present in gatesFor("local")) AND proof-blob-interaction-prm.mjs reads
    // metaball-uniforms.glsl.ts (via readBlobShaders) AND its :213 message names
    // blob.vue not the retired blob-interaction.vue.
    const localIds = new Set(gatesFor("local").map((g) => g.id));
    const interactionWired = localIds.has("proof:blob-interaction-prm");
    const tempoWired = localIds.has("proof:blob-tempo-suppression");
    const interSrc = readFileSync(resolve(SCRIPTS, "proof-blob-interaction-prm.mjs"), "utf8");
    const readsUniforms = /readBlobShaders/.test(interSrc);
    const messageFixed = !/blob-interaction\.vue is absent/.test(interSrc) && /substrates\/blob\.vue is absent/.test(interSrc);
    facts.blobInteractionWired = interactionWired;
    facts.blobTempoWired = tempoWired;
    facts.blobInteractionReadsUniforms = readsUniforms;
    facts.blobMessageFixed = messageFixed;
    if (!interactionWired)
        violations.push("[BLOB-GATES-WIRED] proof:blob-interaction-prm is not a gatesFor(\"local\") row (still dangling-by-disuse)");
    if (!tempoWired)
        violations.push("[BLOB-GATES-WIRED] proof:blob-tempo-suppression is not a gatesFor(\"local\") row (still dangling-by-disuse)");
    if (!readsUniforms)
        violations.push("[BLOB-GATES-WIRED] proof-blob-interaction-prm.mjs does not read the shader-split authority (readBlobShaders over metaball-uniforms.glsl.ts) — the trail asserts read the frag alone");
    if (!messageFixed)
        violations.push("[BLOB-GATES-WIRED] proof-blob-interaction-prm.mjs still names the retired blob-interaction.vue (the :213 message must name demo/stories/substrates/blob.vue)");

    // ── Clause 7: FRESHNESS-CONTENT-HASH ────────────────────────────────────
    // proof-live-verified-ledger.mjs carries the surface-hash parse + recompute
    // path AND no longer carries the git-ancestry freshness arm (the clean break,
    // asserted by absence of the `git merge-base --is-ancestor` execSync CALL). The
    // 3 AZ DELTA docs each carry a surface-hash header that recomputes FRESH.
    const ledgerSrc = readFileSync(resolve(SCRIPTS, "proof-live-verified-ledger.mjs"), "utf8");
    const hasContentHash = /surface-hash/.test(ledgerSrc) && /createHash\("sha256"\)/.test(ledgerSrc);
    // The git-ancestry ARM is a CALL to `git merge-base --is-ancestor` inside an
    // execSync/execFileSync (a comment naming it is fine — match only an executed call).
    const codeNoComments = ledgerSrc
        .replace(/\/\*[\s\S]*?\*\//g, "")
        .replace(/(^|[^:])\/\/[^\n]*/g, "$1");
    const gitAncestryArmSurvives = /merge-base\s+--is-ancestor/.test(codeNoComments);
    facts.ledgerContentHash = hasContentHash;
    facts.ledgerGitAncestryArmSurvives = gitAncestryArmSurvives;
    if (!hasContentHash)
        violations.push("[FRESHNESS-CONTENT-HASH] proof-live-verified-ledger.mjs lacks the surface-hash parse + sha256 recompute path (the content-hash model is unimplemented)");
    if (gitAncestryArmSurvives)
        violations.push("[FRESHNESS-CONTENT-HASH] the git-ancestry freshness arm (git merge-base --is-ancestor) survives in code — the D6 clean break is incomplete");

    // The 3 AZ DELTA docs recompute FRESH against current surface bytes.
    const deltaFresh = checkDeltaHashes();
    facts.azDeltaFreshness = deltaFresh.map((d) => ({ wave: d.wave, state: d.state }));
    for (const d of deltaFresh)
        if (d.state !== "fresh" && d.state !== "retired")
            violations.push(`[FRESHNESS-CONTENT-HASH] ${d.wave}-DELTA.md ${d.reason}`);

    // ── Clause 8: R6-PERSISTED ──────────────────────────────────────────────
    // The persisted dock-animation-live PASS artefact (the quiet-server re-run,
    // §2c) reads status:"pass".
    const r6 = readGateArtifactStatus("AX-dock-animation-live");
    facts.r6DockAnimationStatus = r6;
    if (r6 !== "pass")
        violations.push(`[R6-PERSISTED] .cache/gates/AX-dock-animation-live.json reads status:"${r6}" (expected "pass" from a quiet-server run)`);

    // ── Clause 9: FONT-PATH-LIVE ────────────────────────────────────────────
    // proof:font-cascade-live exits 0 (it reads the carved tokens/scheme-motion.css
    // font-token partial, not the stale tokens.css path — D7).
    const font = runNpm("proof:font-cascade-live");
    facts.fontCascadeLive = font.ok;
    if (!font.ok)
        violations.push("[FONT-PATH-LIVE] proof:font-cascade-live did not exit 0 — the gate still reads the stale src/styles/tokens.css for --font-stack-* (the D7 moved-file false RED)");

    // ── The clean-tree allowlist guard (the proof-au-final idiom) ───────────
    const dirt = unallowedDirt();
    facts.unallowedDirt = dirt;
    if (dirt.length)
        violations.push(
            `[CLEAN-TREE] unexpected dirty tracked entries (a gate may have mutated source — inv-θ): ${dirt.join(", ")}`,
        );

    return { facts, violations };
}

/** Recompute the surface-hash of each AZ DELTA doc against current bytes. */
function checkDeltaHashes() {
    const docs = [
        ["W-DOCK1", "docs/tranches/AY/audit/visual/W-DOCK1-DELTA.md"],
        ["W-DOCK2", "docs/tranches/AY/audit/visual/W-DOCK2-DELTA.md"],
        ["W-CON1", "docs/tranches/AY/audit/visual/W-CON1-DELTA.md"],
    ];
    const out = [];
    for (const [wave, rel] of docs) {
        const abs = resolve(ROOT, rel);
        if (!existsSync(abs)) {
            out.push({ wave, state: "absent", reason: "DELTA doc is absent" });
            continue;
        }
        const doc = readFileSync(abs, "utf8");
        // BA.W-HYGIENE DC-REC-9: a RETIRED-SUPERSEDED DELTA legitimately carries NO
        // freshness header (the captured AY-form surface no longer exists; the banner
        // names the superseding AZ wave). The exemption requires the banner, not mere
        // header absence — a header-less doc WITHOUT the banner still reds.
        if (/RETIRED-SUPERSEDED/.test(doc)) {
            out.push({ wave, state: "retired", reason: "RETIRED-SUPERSEDED banner present — freshness exempt (DC-REC-9)" });
            continue;
        }
        const sp = doc.match(/<!--\s*surface-paths:\s*([^>]*?)\s*-->/);
        const sh = doc.match(/<!--\s*surface-hash:\s*([0-9a-fA-F]{64})\s*-->/);
        if (!sp || !sh) {
            out.push({ wave, state: "no-header", reason: "lacks the surface-paths + surface-hash header" });
            continue;
        }
        const paths = sp[1].split(",").map((s) => s.trim()).filter(Boolean);
        const declared = sh[1].trim().toLowerCase();
        const current = surfaceHashOf(paths);
        if (current === declared) out.push({ wave, state: "fresh" });
        else
            out.push({
                wave,
                state: "stale",
                reason: `surface-hash recomputes stale (declared ${declared.slice(0, 12)} → current ${current.slice(0, 12)}) — re-capture`,
            });
    }
    return out;
}

/** The same concat+sha256 the ledger's surfaceHash uses (kept local to avoid
 *  importing the ledger module, which runs its CLI body at import). */
function surfaceHashOf(paths) {
    const bufs = [];
    for (const p of paths) {
        const abs = resolve(ROOT, p);
        if (!existsSync(abs)) return "";
        bufs.push(readFileSync(abs));
    }
    return createHash("sha256").update(bufs.join("\n")).digest("hex");
}

/** Read a persisted gate artefact's status (or "absent"). */
function readGateArtifactStatus(id) {
    const p = resolve(ROOT, ".cache/gates", `${id}.json`);
    if (!existsSync(p)) return "absent";
    try {
        return JSON.parse(readFileSync(p, "utf8")).status ?? "absent";
    } catch {
        return "absent";
    }
}

/** `git status --porcelain`, minus the documented user-domain allowlist. */
function unallowedDirt() {
    let out = "";
    try {
        out = execFileSync("git", ["status", "--porcelain"], { cwd: ROOT, encoding: "utf8" });
    } catch {
        return [];
    }
    return out
        .split("\n")
        .filter((l) => l.trim() !== "")
        .map((l) => {
            const path = l.slice(3).trim();
            const arrow = path.indexOf(" -> ");
            return arrow === -1 ? path : path.slice(arrow + 4);
        })
        .filter((p) => !CLEAN_TREE_ALLOWLIST.has(p));
}

function run() {
    const ARTIFACT = gateArtifactPath(
        "GLASS_UI_GATE_MANIFEST_SOUND_ARTIFACT",
        "AZ-gate-manifest-sound",
    );
    const { facts, violations } = detectSound();
    const status = violations.length === 0 ? "pass" : "fail";

    writeGateArtifact(ARTIFACT, {
        generatedAt: snapshotStamp(),
        status,
        gate: "proof:gate-manifest-sound",
        command: COMMAND,
        facts,
        violations,
    });

    console.log("proof:gate-manifest-sound — the gate-manifest-soundness meta-gate (AZ.W-GATES)");
    console.log(`  1 MANIFEST-WELL-FORMED : ${facts.malformedRows === 0 ? "OK" : facts.malformedRows + " malformed"}`);
    console.log(`  2 PARITY-HARDENED      : gate-script-parity ${facts.gateScriptParity ? "✓" : "✗"} | tag-parity ${facts.tagParity ? "✓" : "✗"}`);
    console.log(`  3 PROOF-ALL-RUNS       : ${facts.proofAllRuns ? "✓ (local aggregate completes)" : "✗ (did not complete)"}`);
    console.log(`  4 NON-:5199 DEFAULT     : ${facts.nonCanonicalPortDefaults.length === 0 ? "OK (zero non-:5199 defaults)" : facts.nonCanonicalPortDefaults.join(", ")}`);
    console.log(`  5 DOCK-ROUTE-LIVE      : route ${facts.dockRouteLive ? "✓" : "✗"} | manifest-story ${facts.dockLayersStoryPresent ? "✓" : "✗"} | note-clean ${!facts.gatesNoteHasDeadRoute ? "✓" : "✗"}`);
    console.log(`  6 BLOB-GATES-WIRED     : interaction ${facts.blobInteractionWired ? "✓" : "✗"} | tempo ${facts.blobTempoWired ? "✓" : "✗"} | reads-uniforms ${facts.blobInteractionReadsUniforms ? "✓" : "✗"} | msg ${facts.blobMessageFixed ? "✓" : "✗"}`);
    console.log(`  7 FRESHNESS-HASH       : content-hash ${facts.ledgerContentHash ? "✓" : "✗"} | git-arm-gone ${!facts.ledgerGitAncestryArmSurvives ? "✓" : "✗"} | AZ deltas ${facts.azDeltaFreshness.map((d) => `${d.wave}:${d.state}`).join(" ")}`);
    console.log(`  8 R6-PERSISTED         : dock-animation-live status "${facts.r6DockAnimationStatus}"`);
    console.log(`  9 FONT-PATH-LIVE       : ${facts.fontCascadeLive ? "✓ (reads the carved partial)" : "✗ (stale tokens.css path)"}`);
    console.log(`  clean tree             : ${facts.unallowedDirt.length === 0 ? "YES" : "NO — " + facts.unallowedDirt.join(", ")}`);
    if (violations.length) {
        console.log("\nVIOLATIONS:");
        for (const v of violations) console.log(`  x ${v}`);
    }
    console.log(`\n  status: ${status.toUpperCase()}   artefact: ${relative(ROOT, ARTIFACT)}`);
    process.exit(status === "pass" ? 0 : 1);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
    run();
}

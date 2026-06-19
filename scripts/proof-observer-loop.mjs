// proof:observer-loop — BC.W-PAINT-GATE req #7: the observer luma token is READ, not
// just written (the dead-knob killed).
//
// THE DISEASE (postmortem/az.md §3, deferral/bb.md GREY-SLAB-HOLD): the sampled-backdrop
// observer (useGlassBackdropLuminance.ts) WRITES `--glass-backdrop-luma` on its target,
// glass-fx.css DECLARES it, yet ZERO CSS rule READS it into the tint-compose chain — a
// knob nothing turns. proof:adaptive-observer asserts the WRITE + the throttle + the
// evidence-doc, NEVER a paint-driving READ. So the observer can never move the plate; the
// loop is open.
//
// THIS GATE asserts the loop is CLOSED: the observer's luma token appears on the RIGHT-
// HAND SIDE of a `var()` inside the tint-compose chain — i.e. some rule consumes
// `var(--glass-backdrop-luma …)` to drive `--glass-tint-strength` / `--glass-bg-*` (the
// color-mix(in oklab, …) seam). Born-RED on HEAD (the token is write-only); GREEN only
// when BC.W-ADAPTIVE-RECONCILE (Band 1) closes the loop. This gate's GREEN is the
// structural witness that the loop reads — the paint clause it gates lives in the live π.
//
// Device-free SOURCE gate (the cardinal split — it scans CSS source, runs in CI). The
// live π that the READ moves the plate over a real aurora is the local paint arm.
//
// Self-test bites (born-RED→GREEN over the PURE detector):
//   (i)  a write-only token (declared `--glass-backdrop-luma: ;`, never on a var() RHS)
//        → RED on the read clause;
//   (ii) the SAME token consumed on a var() RHS inside a `--glass-tint-strength:
//        calc(… * var(--glass-backdrop-luma …))` compose → GREEN;
//   (iii) a var() READ of an UNRELATED token (not the luma token) → RED (the read must be
//        the OBSERVER token, not any var() — an evasion floor).

import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { gateArtifactPath, snapshotStamp, writeGateArtifact } from "./gate-output.mjs";
import { readMonolith } from "./read-css-monoliths.mjs";

const COMMAND = "npm run proof:observer-loop";
const ROOT = resolve(fileURLToPath(new URL("../", import.meta.url)));

// The observer token the loop must READ (the sampled-backdrop relative-luminance the
// useGlassBackdropLuminance observer writes; postmortem/az.md §3).
const LUMA_TOKEN = "--glass-backdrop-luma";

/** Strip CSS comments so a prose mention (a comment naming the token) is not a false
 *  hit — the exact strip proof-adaptive-glass.mjs uses. */
function strip(s) {
    return s
        .replace(/\/\*[\s\S]*?\*\//g, (m) => m.replace(/[^\n]/g, " "))
        .replace(/\/\/[^\n]*/g, "");
}

/**
 * Pure detector — given the de-commented CSS of the tint-compose chain (the `tokens` +
 * `glass` monoliths concatenated), decide whether the luma token is READ on a var() RHS
 * inside the compose chain. Exported so the self-test feeds synthetic CSS.
 *
 * A READ = the token name appears INSIDE a `var(` call: `var(--glass-backdrop-luma …)`
 * (the token on the RHS of a custom-property reference). A WRITE = `--glass-backdrop-luma:
 * <value>;` (the LHS of a declaration). HEAD has only the WRITE (the empty declaration);
 * the loop is open. The read must additionally sit in the TINT-COMPOSE neighbourhood —
 * the var() read must co-occur with a `--glass-tint-*`/`--glass-bg-*`/`color-mix(in oklab`
 * compose token so a stray, non-compositing var() read cannot green it.
 *
 * @param {string} rawCss the de-commented tint-compose chain CSS
 * @returns {{ readsToken:boolean, readInComposeChain:boolean, ok:boolean, reads:number }}
 */
export function detectObserverLoopRead(rawCss) {
    const css = strip(rawCss);
    // Every `var(--glass-backdrop-luma …)` read site (the token on a var() RHS). The
    // optional fallback tail `(?:[^)]*)?` lets `var(--glass-backdrop-luma, 0.5)` match.
    const readRe = new RegExp(`var\\(\\s*${LUMA_TOKEN}\\b`, "g");
    const reads = (css.match(readRe) ?? []).length;
    const readsToken = reads > 0;

    // The read must sit in the tint-compose chain — the same line/declaration neighbourhood
    // as a compose token. We scan each `var(--glass-backdrop-luma …)`-bearing declaration
    // (the `…: …;` run that contains the read) for a compose marker. This bars a stray
    // decorative var() read from greening the loop.
    let readInComposeChain = false;
    if (readsToken) {
        // Split into declaration runs on `;` and `{`/`}` boundaries; a run that contains the
        // luma var() read AND a compose marker closes the loop.
        const runs = css.split(/[;{}]/);
        const composeRe = /--glass-tint-(?:source|strength)\b|--glass-bg-\w+\b|color-mix\(\s*in oklab/;
        for (const run of runs) {
            if (readRe.test(run)) {
                readRe.lastIndex = 0; // reset the /g regex between tests
                if (composeRe.test(run)) {
                    readInComposeChain = true;
                    break;
                }
            }
            readRe.lastIndex = 0;
        }
    }
    return { readsToken, readInComposeChain, ok: readsToken && readInComposeChain, reads };
}

function selfTest() {
    const bites = [];

    // Bite (i) — the HEAD write-only shape: the token is DECLARED (empty) but never on a
    // var() RHS. RED on the read clause.
    {
        const writeOnly = `:root { ${LUMA_TOKEN}: ; --glass-tint-strength: 0%; }`;
        const det = detectObserverLoopRead(writeOnly);
        bites.push({ name: "write-only token reds", reds: !det.ok && !det.readsToken });
    }
    // Bite (ii) — the loop CLOSED: the luma token is consumed on a var() RHS inside a
    // tint-strength compose. GREEN.
    {
        const closed = `
          :root { ${LUMA_TOKEN}: ; }
          .glass-card {
            --glass-tint-strength: calc(var(--glass-tint-strength-aa) * (1 - var(${LUMA_TOKEN}, 0.5)));
            background: color-mix(in oklab, var(--glass-bg-card), var(--glass-tint-source) var(--glass-tint-strength));
          }`;
        const det = detectObserverLoopRead(closed);
        bites.push({ name: "loop-closed (luma on var() RHS in compose) greens", reds: det.ok });
    }
    // Bite (iii) — a var() READ of an UNRELATED token (not the luma token) must NOT green
    // the loop (the read must be the OBSERVER token — an evasion floor).
    {
        const wrongToken = `
          .glass-card {
            --glass-tint-strength: calc(var(--glass-tint-strength-aa) * var(--some-other-knob, 1));
            background: color-mix(in oklab, var(--glass-bg-card), var(--glass-tint-source) var(--glass-tint-strength));
          }`;
        const det = detectObserverLoopRead(wrongToken);
        bites.push({ name: "unrelated-token read reds (must be the observer token)", reds: !det.ok });
    }

    return bites;
}

function run() {
    // The tint-compose chain = the `tokens` monolith (glass-fx.css declares the token +
    // the tint scalars) + the `glass` monolith (ladder.css composes the color-mix seam).
    const tokens = strip(readMonolith(ROOT, "tokens"));
    const glass = strip(readMonolith(ROOT, "glass"));
    const composeChain = `${tokens}\n${glass}`;

    const det = detectObserverLoopRead(composeChain);

    const bites = selfTest();
    const biteFailures = bites.filter((b) => !b.reds);
    const selfTestOk = biteFailures.length === 0;

    const checks = [
        {
            id: "luma-token-read-into-tint",
            pass: det.ok,
            detail: `${LUMA_TOKEN} appears on a var() RHS inside the tint-compose chain (a paint-driving READ, not just a write) — ${det.reads} read site(s), in-compose:${det.readInComposeChain}. Born-RED on HEAD write-only; GREEN when BC.W-ADAPTIVE-RECONCILE closes the loop.`,
        },
        {
            id: "self-test-bites-red",
            pass: selfTestOk,
            detail: selfTestOk
                ? "the write-only / loop-closed / unrelated-token bites all behave (RED→GREEN over the pure detector)"
                : `self-test bite(s) misbehaved: ${biteFailures.map((b) => b.name).join(", ")}`,
        },
    ];

    const failed = checks.filter((c) => !c.pass);
    const pass = failed.length === 0;

    const ARTIFACT = gateArtifactPath("GATE_OBSERVER_LOOP_OUT", "BC-observer-loop");
    writeGateArtifact(ARTIFACT, {
        generatedAt: snapshotStamp(),
        status: pass ? "pass" : "fail",
        gate: "proof:observer-loop",
        command: COMMAND,
        note: "SOURCE arm — asserts the observer luma token is READ into the tint-compose chain (the dead-knob closed). Born-RED on HEAD (write-only). The live π that the READ moves the plate is the local paint arm.",
        facts: det,
        checks: checks.map((c) => ({ id: c.id, pass: c.pass, detail: c.detail })),
    });

    console.log("proof:observer-loop — the observer luma token READ clause (BC.W-PAINT-GATE req #7)");
    for (const c of checks) console.log(`    ${c.pass ? "✓" : "✗"} ${c.id} — ${c.detail}`);

    if (!pass) {
        console.error(`\n[proof:observer-loop] ${failed.length} check(s) FAILED:`);
        for (const c of failed) console.error(`  ✗ ${c.id} — ${c.detail}`);
        process.exit(1);
    }
    console.log(
        `\n[proof:observer-loop] the loop READS — ${LUMA_TOKEN} drives the tint-compose chain (the dead-knob closed).`,
    );
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
    run();
}

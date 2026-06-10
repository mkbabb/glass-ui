#!/usr/bin/env node
// E1.2d — proof:gold-seal-roundtrip, the gold ONE-SHOT to-AND-fro ENVELOPE gate.
//
// E7c verbatim: the gold seal "eases IN but SNAPS OUT — the to-and-fro is half-
// built." The root: `.text-gilt` set `color: transparent` PERMANENTLY and ran the
// infinite `gold-shimmer-slide` `1 forwards`, holding its gilt terminal frame
// forever; the consumer then RIPPED the class off on a `setTimeout`. But the gold
// gradient lives in `background-image`, which no transition covers — so the gilt
// SNAPPED off in one frame. The recede was never authored at the library; it lived
// as a JS class-yank in the atlas (the broken envelope the ROOT-REPO LAW pulls home).
//
// The fix (library-rooted, utilities.css + animations.css + tokens.css): the
// `.text-gilt` one-shot is a FULL ease-IN-AND-OUT round trip that RESOLVES TO THE
// RESTING INK — nothing is left to yank. This SOURCE gate asserts the contract so a
// future minor cannot regress to the snap:
//
//   (1) THE RESTING STATE IS THE FIGURE'S OWN INK. `.text-gilt` must NOT set
//       `color: transparent` in the resting rule (the permanent-gilt bug). The
//       gradient is revealed by the ANIMATION nulling the color, never by the rule
//       holding it transparent — so when the animation ends the figure paints its
//       own ink and the gilt is gone, by construction.
//
//   (2) THE ANIMATION IS THE SEAL ENVELOPE, NOT THE LOOP SLIDE. `.text-gilt`'s
//       animation references `gold-shimmer-pulse` (the round-trip keyframe) over
//       `var(--duration-seal)` (≈1.5s — a pressed gesture), NOT the infinite
//       `gold-shimmer-slide` over `--duration-shimmer` (5s) with `forwards` (the
//       held-terminal bug). The seal duration token is distinct from the loop token.
//
//   (3) THE KEYFRAME IS A TRUE ROUND TRIP RESOLVING TO REST. `gold-shimmer-pulse`'s
//       0% AND 100% keyframes restore the resting ink (`-webkit-text-fill-color`/
//       `color: currentColor`) while a MID keyframe nulls it (`transparent`) to
//       reveal the gradient. So the gilt FADES UP and FADES DOWN; the final frame IS
//       rest, so no `forwards` and no class-yank are needed — the snap is impossible.
//
// born-RED on the unfixed HEAD (permanent `color: transparent` + `gold-shimmer-slide
// … forwards`); GREEN after the envelope lands. A device-free SOURCE gate (the same
// shape as proof:glass-gilt / proof:no-disco-star) — happy-dom does not resolve the
// animation timeline, so the round-trip is proven at the source level; the runtime
// recede curve is the atlas-side temporal probe's arm (proof:recede-envelope, E0).
//
// SELF-TEST (the planted-fixture discipline, mirrors proof-no-disco-star): `node
// proof-gold-seal-roundtrip.mjs --selftest` plants (a) a permanent `color:
// transparent` resting rule, (b) the infinite `gold-shimmer-slide … forwards`
// animation, and (c) a one-way keyframe whose 100% leaves the color transparent —
// and asserts the detector REDDENS on each, proving the gate bites.

import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { gateArtifactPath, snapshotStamp, writeGateArtifact } from "./gate-output.mjs";

const ROOT = resolve(fileURLToPath(new URL("../", import.meta.url)));
const UTILITIES = resolve(ROOT, "src/styles/utilities.css");
const ANIMATIONS = resolve(ROOT, "src/styles/animations.css");
const TOKENS = resolve(ROOT, "src/styles/tokens.css");
const COMMAND = "npm run proof:gold-seal-roundtrip";

/** Strip CSS comments so a documentary mention of the OLD recipe is not scanned. */
function stripComments(css) {
    return css.replace(/\/\*[\s\S]*?\*\//g, "");
}

/** Body of the FIRST rule whose selector list EQUALS (trimmed) `selector`, or null. */
function exactRule(src, selector) {
    const ruleRe = /([^{}]+)\{([^{}]*)\}/g;
    let m;
    while ((m = ruleRe.exec(src))) {
        if (m[1].trim() === selector) return m[2];
    }
    return null;
}

/** Body of the `@keyframes <name>` at-rule (the inner keyframe list), or null. */
function keyframesBody(src, name) {
    const re = new RegExp(`@keyframes\\s+${name}\\s*\\{`, "g");
    const m = re.exec(src);
    if (!m) return null;
    // brace-match from the opening { (keyframes nest one level of {…} per stop).
    let depth = 0;
    let i = m.index + m[0].length - 1; // at the opening brace
    const start = i + 1;
    for (; i < src.length; i++) {
        if (src[i] === "{") depth++;
        else if (src[i] === "}") {
            depth--;
            if (depth === 0) return src.slice(start, i);
        }
    }
    return null;
}

/**
 * The SOURCE detector. Pure over the three stylesheets' text so the self-test can
 * drive it over in-memory fixtures: `detect({ utilities, animations, tokens })`.
 */
export function detectSeal({ utilities, animations, tokens }) {
    const violations = [];
    const facts = {};
    const util = stripComments(utilities);
    const anim = stripComments(animations);
    const tok = stripComments(tokens);

    // ── 1. The `.text-gilt` resting rule does NOT permanently null the color. ──
    const giltBody = exactRule(util, ".text-gilt");
    facts.giltRuleFound = Boolean(giltBody);
    if (!giltBody) {
        violations.push(
            "utilities.css: no bare `.text-gilt` rule — the gilt one-shot is absent",
        );
        return { facts, violations };
    }
    // a `color: transparent` (or -webkit-text-fill-color: transparent) in the
    // RESTING rule = the permanent-gilt bug (the figure can never show its own ink).
    facts.restingColorTransparent =
        /(?:^|[;{])\s*(?:-webkit-text-fill-)?color\s*:\s*transparent/.test(giltBody);
    if (facts.restingColorTransparent) {
        violations.push(
            "utilities.css: `.text-gilt` sets `color: transparent` in its RESTING rule — the gilt is permanent (the figure can never recede to its own ink). The animation, not the rule, must null the color.",
        );
    }

    // ── 2. The animation is the SEAL envelope, not the infinite loop slide. ──
    // find the `.text-gilt { animation: … }` declaration (inside the PRM bracket).
    const giltAnimRe = /\.text-gilt\s*\{[^}]*animation\s*:\s*([^;}]+)/g;
    let animDecl = null;
    let mm;
    while ((mm = giltAnimRe.exec(util))) animDecl = mm[1].trim();
    facts.giltAnimation = animDecl;
    if (!animDecl) {
        violations.push(
            "utilities.css: `.text-gilt` declares no `animation:` under the no-preference bracket — there is no seal to press",
        );
    } else {
        facts.usesPulseKeyframe = /gold-shimmer-pulse/.test(animDecl);
        facts.usesSealDuration = /var\(\s*--duration-seal/.test(animDecl);
        facts.usesLoopSlide = /gold-shimmer-slide/.test(animDecl);
        facts.usesForwards = /\bforwards\b/.test(animDecl);
        if (!facts.usesPulseKeyframe) {
            violations.push(
                "utilities.css: `.text-gilt` does not animate `gold-shimmer-pulse` — the to-AND-fro round-trip keyframe is not bound",
            );
        }
        if (!facts.usesSealDuration) {
            violations.push(
                "utilities.css: `.text-gilt` does not read `var(--duration-seal)` — the seal must be a ≈1.5s gesture, not the 5s `--duration-shimmer` loop token",
            );
        }
        if (facts.usesLoopSlide) {
            violations.push(
                "utilities.css: `.text-gilt` still references the infinite `gold-shimmer-slide` — the held-terminal-frame bug (it eases in then holds gilt forever)",
            );
        }
        if (facts.usesForwards) {
            violations.push(
                "utilities.css: `.text-gilt` uses `forwards` — the seal must RESOLVE to rest in its final keyframe, never hold a gilt terminal frame to be yanked",
            );
        }
    }

    // ── 3. The `--duration-seal` token exists and is distinct from the loop token. ──
    facts.sealTokenDefined = /--duration-seal\s*:/.test(tok);
    if (!facts.sealTokenDefined) {
        violations.push(
            "tokens.css: `--duration-seal` is not defined — the seal envelope has no duration token of its own",
        );
    }

    // ── 4. `gold-shimmer-pulse` is a TRUE round trip resolving to rest. ──
    const kf = keyframesBody(anim, "gold-shimmer-pulse");
    facts.pulseKeyframeFound = Boolean(kf);
    if (!kf) {
        violations.push(
            "animations.css: no `@keyframes gold-shimmer-pulse` — the round-trip envelope keyframe is missing",
        );
    } else {
        // the 0% and 100% stops must restore the resting ink (currentColor); a MID
        // stop must null it (transparent) — that is the fade-UP-and-DOWN signature.
        const stopRe = /(\d+)%\s*\{([^}]*)\}/g;
        const stops = {};
        let sm;
        while ((sm = stopRe.exec(kf))) stops[Number(sm[1])] = sm[2];
        const restoresRest = (body) =>
            body != null && /(?:-webkit-text-fill-)?color\s*:\s*currentColor/i.test(body);
        const nullsInk = (body) =>
            body != null && /(?:-webkit-text-fill-)?color\s*:\s*transparent/i.test(body);
        facts.startResolvesRest = restoresRest(stops[0]);
        facts.endResolvesRest = restoresRest(stops[100]);
        facts.midRevealsGilt = Object.entries(stops).some(
            ([k, v]) => Number(k) > 0 && Number(k) < 100 && nullsInk(v),
        );
        if (!facts.startResolvesRest || !facts.endResolvesRest) {
            violations.push(
                "animations.css: `gold-shimmer-pulse` does not restore the resting ink (`color: currentColor`) at BOTH 0% and 100% — the final frame is not rest, so the gilt would hold/snap (it is a one-way trip)",
            );
        }
        if (!facts.midRevealsGilt) {
            violations.push(
                "animations.css: `gold-shimmer-pulse` never nulls the color to `transparent` mid-pass — the gradient is never revealed, the seal does not catch the light",
            );
        }
    }

    return { facts, violations };
}

function readAll() {
    for (const [name, p] of [
        ["utilities.css", UTILITIES],
        ["animations.css", ANIMATIONS],
        ["tokens.css", TOKENS],
    ]) {
        if (!existsSync(p)) {
            console.error(`proof:gold-seal-roundtrip — missing ${name} at ${p}`);
            process.exit(1);
        }
    }
    return {
        utilities: readFileSync(UTILITIES, "utf8"),
        animations: readFileSync(ANIMATIONS, "utf8"),
        tokens: readFileSync(TOKENS, "utf8"),
    };
}

function selftest() {
    console.log("proof:gold-seal-roundtrip --selftest (the gate must BITE)\n");
    const good = readAll();
    // sanity: the real tree is GREEN.
    const live = detectSeal(good);
    let ok = live.violations.length === 0;
    console.log(
        `  selftest [live tree] → ${ok ? "GREEN ✓" : "RED ✗ (the fix is not in)"}`,
    );
    if (!ok) for (const v of live.violations) console.log(`      ✗ ${v}`);

    const cases = [
        {
            name: "permanent color:transparent resting rule (the held-gilt bug)",
            mut: (f) => ({
                ...f,
                utilities: f.utilities.replace(
                    /(\.text-gilt\s*\{[^}]*)(background-clip: text;)/,
                    "$1$2\n        color: transparent;",
                ),
            }),
        },
        {
            name: "infinite gold-shimmer-slide … forwards (the loop + held terminal)",
            mut: (f) => ({
                ...f,
                utilities: f.utilities.replace(
                    /animation:\s*gold-shimmer-pulse[^;]+;/,
                    "animation: gold-shimmer-slide var(--duration-shimmer) var(--ease-out-expo) 1 forwards;",
                ),
            }),
        },
        {
            name: "one-way keyframe (pulse 100% leaves the color transparent — the snap)",
            mut: (f) => ({
                ...f,
                // target the pulse keyframe's 100% specifically (NOT the slide loop's,
                // which appears first) — null its closing color so it no longer rests.
                animations: f.animations.replace(
                    /(@keyframes\s+gold-shimmer-pulse\s*\{[\s\S]*?)100%\s*\{[^}]*\}/,
                    "$1100% {\n        background-position: -150% 0;\n        color: transparent;\n        -webkit-text-fill-color: transparent;\n    }",
                ),
            }),
        },
        {
            name: "missing --duration-seal token",
            mut: (f) => ({
                ...f,
                tokens: f.tokens.replace(/--duration-seal\s*:[^;]+;/, ""),
            }),
        },
    ];
    for (const c of cases) {
        const v = detectSeal(c.mut(good)).violations;
        const bit = v.length > 0;
        console.log(`  selftest [${c.name}] → ${bit ? "REDDENS ✓" : "MISSED ✗"}`);
        if (!bit) ok = false;
    }
    console.log(`\n  selftest: ${ok ? "PASS (the gate bites)" : "FAIL (the gate is vacuous)"}`);
    process.exit(ok ? 0 : 1);
}

function run() {
    if (process.argv.includes("--selftest")) return selftest();

    const ARTIFACT = gateArtifactPath(
        "GLASS_UI_GOLD_SEAL_ROUNDTRIP_ARTIFACT",
        "E1-gold-seal-roundtrip",
    );
    const { facts, violations } = detectSeal(readAll());
    const status = violations.length === 0 ? "pass" : "fail";

    writeGateArtifact(ARTIFACT, {
        generatedAt: snapshotStamp(),
        status,
        gate: "proof:gold-seal-roundtrip",
        facts,
        violations,
    });

    console.log(
        "proof:gold-seal-roundtrip — the gold one-shot is a full ease-IN-AND-OUT round trip (E7c)",
    );
    console.log(`  resting ink (not gilt-held): ${facts.restingColorTransparent ? "NO ✗" : "yes ✓"}`);
    console.log(`  animates gold-shimmer-pulse: ${facts.usesPulseKeyframe ? "yes ✓" : "NO ✗"}`);
    console.log(`  reads --duration-seal      : ${facts.usesSealDuration ? "yes ✓" : "NO ✗"}`);
    console.log(`  no forwards / no loop slide : ${!facts.usesForwards && !facts.usesLoopSlide ? "yes ✓" : "NO ✗"}`);
    console.log(`  keyframe resolves to rest   : ${facts.startResolvesRest && facts.endResolvesRest ? "yes ✓" : "NO ✗"}`);
    if (violations.length) {
        console.log("\nVIOLATIONS:");
        for (const v of violations) console.log(`  ✗ ${v}`);
    }
    console.log(`\n  status: ${status.toUpperCase()}   artefact: ${ARTIFACT.slice(ROOT.length + 1)}`);
    console.log(`  (run: ${COMMAND})`);
    process.exit(status === "pass" ? 0 : 1);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
    run();
}

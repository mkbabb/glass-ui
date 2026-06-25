#!/usr/bin/env node
// proof:spring-crisp — BB.B9 (spring-crisp, CONDITIONAL → NO-OP-DECIDED).
//
// THE DECISION GATE. B9 was a CONDITIONAL mint: `--spring-crisp` is minted IFF
// the ≥2-genuine-consumer bar is MET (the relay named "5+ speedtest sites"). The
// HEAD survey (2026-06-17, speedtest tree read-only) found the bar UNMET — exactly
// ONE live consumer surface (the `.survey-step-pane` pane-slide), which already
// SELF-HOSTS a LOCAL `--spring-crisp` scoped override (NOT a `:root` token, NOT a
// library read). The audit "5+ sites" figure (AS-7/§8-H5/B0/B1/B3/B5/N5) was a
// SPECULATIVE easter-egg roadmap — NONE landed; the AW.W7 consume-brief itself
// marked the ask "(optional)". So the no-backwards-compat + visual-load-bearing
// discipline (J-inv-10) FORBIDS the mint — a library `--spring-crisp` would be
// shelf-ware (one self-hosting consumer + an un-landed roadmap).
//
// This gate LOCKS the no-op HONESTLY: the library spring register MUST carry
// EXACTLY the five canonical SPRING_PRESETS rows (no surreptitious `crisp` row)
// AND `--spring-crisp`/`--spring-crisp-duration` MUST be ABSENT from the emitted
// CSS — so a future agent cannot slip the token in unaudited. IF the easter-egg
// roadmap ever lands ≥2 REAL surfaces, a future wave FLIPS this gate (mints the
// row via regen-spring-tokens.mjs + the settle clock + the ≥2-consumer evidence)
// — born-RED→GREEN at THAT wave. The DELTA records the survey evidence.
//
// Device-free. Run: node scripts/proof-spring-crisp.mjs

import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = resolve(fileURLToPath(new URL("../", import.meta.url)));

const SCHEME_MOTION = resolve(root, "src/styles/tokens/scheme-motion.css");
// BD.W-CUT carved scheme-motion's §2 EASING block (every `--spring-*` curve +
// duration clock) into the adjacent scheme-spring.css partial to hold the 500-
// line bound. The spring-register CSS assertions below read the SPRING partial
// where the tokens genuinely live now (the no-gray/glass-fx carve precedent);
// the negative `--spring-crisp` assertion holds over either since the token is
// absent from both.
const SCHEME_SPRING = resolve(root, "src/styles/tokens/scheme-spring.css");
const SPRING_PRESETS_TS = resolve(root, "src/composables/motion/springPresets.ts");
const DELTA = resolve(root, "docs/tranches/BB/audit/visual/W-SPRING-CRISP-DELTA.md");

/**
 * The canonical glass-ui spring registers. `crisp` is NOT among them (the B9 no-op
 * this gate LOCKS). `press` joined at BC.W-SPRING-EASE — the minted iOS interactive
 * register (response 0.15 / ζ 0.86, the Apple `interactiveSpring`) with REAL
 * consumers (useSpringPress → Button/Card via the --glass-btn-press-t drive; the
 * --ease-spring-press @theme alias publishes it). That is exactly the "≥2 real
 * surfaces → a wave mints the row + the consumer evidence" path this gate's header
 * names — the roster is widened to it. `crisp` stays out (one self-hosting consumer,
 * an un-landed roadmap).
 */
const CANONICAL_SPRINGS = ["smooth", "snappy", "bouncy", "gentle", "dock", "press"];

const failures = [];
function check(name, ok, detail) {
    if (!ok) failures.push(`${name}: ${detail}`);
}

function read(path) {
    try {
        return readFileSync(path, "utf8");
    } catch (e) {
        return null;
    }
}

export function runChecks({ schemeMotion, presetsTs, delta } = {}) {
    const local = arguments.length === 0;
    // Read BOTH partials concatenated: scheme-motion (color-scheme/font/weight/
    // ease-cartoon) + scheme-spring (the carved §2 EASING spring register). The
    // `--spring-*` curve/clock assertions live in the spring partial post-carve.
    const schemeSrc =
        schemeMotion ?? [read(SCHEME_MOTION), read(SCHEME_SPRING)].filter(Boolean).join("\n");
    const presetsSrc = presetsTs ?? read(SPRING_PRESETS_TS);
    const deltaSrc = delta ?? read(DELTA);
    const fails = [];
    const ck = (name, ok, detail) => {
        if (!ok) fails.push(`${name}: ${detail}`);
    };

    // D1 — the SPRING_PRESETS table carries EXACTLY the five canonical rows, no `crisp`.
    if (presetsSrc == null) {
        ck("D1-presets-readable", false, `cannot read ${SPRING_PRESETS_TS}`);
    } else {
        const nameMatches = [...presetsSrc.matchAll(/name:\s*"([a-z]+)"/g)].map((m) => m[1]);
        const set = [...new Set(nameMatches)].sort();
        ck(
            "D1-five-canonical-presets",
            JSON.stringify(set) === JSON.stringify([...CANONICAL_SPRINGS].sort()),
            `SPRING_PRESETS names = ${JSON.stringify(set)}, expected the 5 canonical (no 'crisp')`,
        );
        ck(
            "D1-no-crisp-preset-row",
            !/name:\s*"crisp"/.test(presetsSrc),
            "a `name: \"crisp\"` SPRING_PRESETS row is present — the B9 no-op was reversed WITHOUT this gate being flipped",
        );
        // The SpringPresetName union must not silently admit "crisp" either.
        ck(
            "D1-union-no-crisp",
            !/SpringPresetName\s*=\s*[^;]*"crisp"/.test(presetsSrc),
            "the SpringPresetName union admits \"crisp\" — un-audited token-name leak",
        );
    }

    // D2 — the emitted spring register CSS carries NO `--spring-crisp` token (curve or clock).
    if (schemeSrc == null) {
        ck("D2-scheme-readable", false, `cannot read ${SCHEME_MOTION}`);
    } else {
        ck(
            "D2-no-spring-crisp-token",
            !/--spring-crisp\b/.test(schemeSrc),
            "`--spring-crisp` is declared in scheme-motion.css — shelf-ware mint without the ≥2-consumer bar",
        );
        // Positive: the five canonical curve tokens ARE present (the register is intact).
        for (const s of CANONICAL_SPRINGS) {
            ck(
                `D2-canonical-${s}-present`,
                new RegExp(`--spring-${s}:\\s*linear\\(`).test(schemeSrc),
                `--spring-${s} curve token missing from scheme-motion.css`,
            );
            ck(
                `D2-canonical-${s}-duration-present`,
                new RegExp(`--spring-${s}-duration:\\s*[\\d.]+s`).test(schemeSrc),
                `--spring-${s}-duration clock missing from scheme-motion.css`,
            );
        }
    }

    // D3 — the DECISION is recorded in the DELTA (the conditional verdict + evidence).
    if (deltaSrc == null) {
        ck("D3-delta-present", false, `the decision DELTA is missing at ${DELTA}`);
    } else {
        ck(
            "D3-delta-records-unmet",
            /UNMET/i.test(deltaSrc) && /no-op/i.test(deltaSrc),
            "the DELTA does not record the UNMET / no-op verdict",
        );
        ck(
            "D3-delta-names-consumer-evidence",
            /survey-step-pane/.test(deltaSrc),
            "the DELTA does not name the single live consumer surface (survey-step-pane)",
        );
    }

    // SELF-TEST BITE — a synthetic scheme-motion carrying `--spring-crisp` MUST flag.
    // (Proves the detector reds the shelf-ware mint; runs only in the local arm.)
    if (local) {
        const synthetic = runChecks({
            schemeMotion:
                schemeSrc +
                "\n:root { --spring-crisp: linear(0, 1); --spring-crisp-duration: 0.2s; }\n",
            presetsTs: presetsSrc,
            delta: deltaSrc,
        });
        if (synthetic.ok) {
            fails.push(
                "SELF-TEST: a synthetic --spring-crisp mint did NOT red the gate — the detector is broken",
            );
        }
        // The synthetic preset-row bite.
        const syntheticPreset = runChecks({
            schemeMotion: schemeSrc,
            presetsTs:
                presetsSrc +
                '\nconst _bite = { name: "crisp", response: 0.3, dampingFraction: 0.8 };\n',
            delta: deltaSrc,
        });
        if (syntheticPreset.ok) {
            fails.push(
                "SELF-TEST: a synthetic `name: \"crisp\"` preset row did NOT red the gate — the preset detector is broken",
            );
        }
    }

    return { ok: fails.length === 0, failures: fails };
}

function main() {
    const { ok, failures: fails } = runChecks();
    if (!ok) {
        console.error("proof:spring-crisp FAILED:");
        for (const f of fails) console.error(`  ✗ ${f}`);
        process.exit(1);
    }
    console.log(
        "proof:spring-crisp PASSED — B9 NO-OP HONORED: --spring-crisp ABSENT from the library spring register",
    );
    console.log(
        "  the bar is UNMET (1 live speedtest consumer, self-hosting a LOCAL override); consumers ride --spring-snappy / the local token",
    );
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
    main();
}

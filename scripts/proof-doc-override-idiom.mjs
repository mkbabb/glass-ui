#!/usr/bin/env node
// BB.W-DOC-FRESHEN — proof:doc-override-idiom.
// RE-HOMED off CLAUDE.md onto docs/canon/consumer-wiring.md (BH.B5c). The
// Consumer-wiring CSS example ships in BOTH the canon home (`docs/canon/consumer-
// wiring.md`, the redistributed `## Consumer wiring` section) and the public
// `README.md`. Until this gate the example taught consumers to FIGHT the
// W-GLASS-CAL machinery:
//
//   :root {
//       --glass-opacity-resting: 0.82;
//       --glass-blur-resting: blur(12px);   ← the anti-idiom (TWICE wrong)
//   }
//
// `--glass-blur-resting` is a GENERATED composite — `blur(calc(var(--glass-blur-
// resting-radius) * var(--glass-level))) saturate(1.05)` (`glass.css`) — that
// threads the `--glass-level` opacity axis (AX.W54) AND the `saturate(1.05)`
// luminosity companion. A consumer who overrides the composite directly DESTROYS
// both AND the cited `12px` is the PRE-cal value the library dialed back. The
// CONSUMER-tunable knob is the `--glass-blur-resting-radius` PRIMITIVE.
//
// Four falsifiable witnesses (the source-read house pattern — the gate re-reads
// `glass.css` LIVE so it can never itself go stale):
//
//   W1 — the example overrides the PRIMITIVE, not the composite. Both example
//        blocks declare `--glass-blur-resting-radius:` AND carry NO bare
//        `--glass-blur-resting:` direct-override line (the anti-idiom guard).
//   W2 — the cited radius value EQUALS the SHIPPED `--glass-blur-resting-radius`
//        read live from `src/styles/tokens/glass.css` (never a hardcoded number).
//   W3 — the two copies (consumer-wiring.md + README.md) are byte-identical on the
//        override lines (the parity guard — a fix to one copy that leaves the other
//        stale REDS).
//   W4 — the override-the-primitive consumer canon sentence is recorded in the
//        consumer-wiring canon home (so the rule is stated, not just corrected).
//
// House style: ESM, a pure exported detector, a byte-stable JSON artefact, a human
// summary, exit(1) on any violation. Tagged ["local","ci"] — a static doc read.

import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { gateArtifactPath, snapshotStamp, writeGateArtifact } from "./gate-output.mjs";
import { readCanon, canonDocRel } from "./lib/canon-doc.mjs";

const ROOT = resolve(fileURLToPath(new URL("../", import.meta.url)));

const WIRING_KEY = "consumer-wiring";
const WIRING_REL = canonDocRel(WIRING_KEY); // docs/canon/consumer-wiring.md
const README = "README.md";
const GLASS_CSS = "src/styles/tokens/glass.css";

function read(rel) {
    try {
        return readFileSync(resolve(ROOT, rel), "utf8");
    } catch {
        return null;
    }
}

// Read the redistributed Consumer-wiring canon home (soft → "" if absent; the
// null-check below treats "" as missing).
function readWiring() {
    const s = readCanon(WIRING_KEY, "soft");
    return s ? s : null;
}

// The Consumer-wiring CSS example block: the fenced ```css block whose body
// declares the `:root { --glass-opacity-resting … }` override demonstration.
// We locate it by the `override tokens` comment signature that BOTH copies carry
// and capture the `:root { … }` body that follows.
export function extractOverrideBlock(md) {
    if (md == null) return null;
    const lines = md.split("\n");
    let i = lines.findIndex((l) => /override tokens locally/.test(l));
    if (i < 0) return null;
    while (i < lines.length && !/:root\s*\{/.test(lines[i])) i++;
    if (i >= lines.length) return null;
    const body = [];
    i++; // skip the `:root {` line
    for (; i < lines.length; i++) {
        if (/^\s*\}/.test(lines[i])) break;
        body.push(lines[i]);
    }
    return body;
}

// Normalize an override line to its bare `--token: value;` form so byte-parity
// compares the DECLARATIONS, not the indentation/comment register.
function normalizeDecls(bodyLines) {
    return bodyLines
        .map((l) => l.replace(/\/\*.*?\*\//g, "")) // strip inline comments
        .map((l) => l.trim())
        .filter((l) => /^--[\w-]+\s*:/.test(l)) // declaration lines only
        .map((l) => l.replace(/\s+/g, " ").replace(/\s*;\s*$/, ";"));
}

// Read the SHIPPED `--glass-blur-resting-radius` PRIMITIVE value live from glass.css.
export function readShippedRadius(css) {
    if (css == null) return null;
    const m = css.match(/--glass-blur-resting-radius:\s*([\d.]+px)\s*;/);
    return m ? m[1] : null;
}

// The consumer canon sentence signature — names "override the radius primitive,
// never the composed --glass-blur-* directly".
const CANON_SIG =
    /overrid(?:e|es|ing|den)\s+the\s+`?--glass-blur-[\w*-]*radius`?\s+primitive[\s\S]{0,200}?never\s+the\s+composed\s+`?--glass-blur/i;

export function detect() {
    const violations = [];
    const facts = {};

    const wiringMd = readWiring();
    const readmeMd = read(README);
    const glassCss = read(GLASS_CSS);

    if (wiringMd == null) violations.push(`${WIRING_REL} — canon home is absent/empty (re-home the Consumer wiring section there)`);
    if (readmeMd == null) violations.push(`${README} is missing`);
    if (glassCss == null) violations.push(`${GLASS_CSS} is missing`);

    const shippedRadius = readShippedRadius(glassCss);
    facts.shippedRadius = shippedRadius;
    if (!shippedRadius) {
        violations.push(`${GLASS_CSS} — could not read the --glass-blur-resting-radius primitive value`);
    }

    const wiringBody = extractOverrideBlock(wiringMd);
    const readmeBody = extractOverrideBlock(readmeMd);
    if (!wiringBody) violations.push(`${WIRING_REL} — Consumer-wiring override block not found`);
    if (!readmeBody) violations.push(`${README} — Consumer-wiring override block not found`);

    const wiringDecls = wiringBody ? normalizeDecls(wiringBody) : [];
    const readmeDecls = readmeBody ? normalizeDecls(readmeBody) : [];
    const wiringRaw = (wiringBody ?? []).join("\n");
    const readmeRaw = (readmeBody ?? []).join("\n");

    // ── W1 — the example overrides the PRIMITIVE, not the composite ──────────
    const BARE_COMPOSITE = /^--glass-blur-resting\s*:/;
    const RADIUS_PRIM = /^--glass-blur-resting-radius\s*:/;
    for (const [name, decls] of [
        [WIRING_REL, wiringDecls],
        [README, readmeDecls],
    ]) {
        const hasComposite = decls.some((d) => BARE_COMPOSITE.test(d));
        const hasPrimitive = decls.some((d) => RADIUS_PRIM.test(d));
        if (hasComposite) {
            violations.push(
                `W1 ${name} — the example overrides the COMPOSED token (--glass-blur-resting:); ` +
                    `override the --glass-blur-resting-radius PRIMITIVE instead (it threads --glass-level + saturate)`,
            );
        }
        if (!hasPrimitive) {
            violations.push(
                `W1 ${name} — the example does not override the --glass-blur-resting-radius primitive`,
            );
        }
    }
    facts.w1WiringDecls = wiringDecls;
    facts.w1ReadmeDecls = readmeDecls;

    // ── W2 — the cited value matches the SHIPPED source, live-read ───────────
    if (shippedRadius) {
        for (const [name, decls] of [
            [WIRING_REL, wiringDecls],
            [README, readmeDecls],
        ]) {
            const line = decls.find((d) => RADIUS_PRIM.test(d));
            if (line) {
                const m = line.match(/--glass-blur-resting-radius\s*:\s*([\d.]+px)/);
                const cited = m ? m[1] : null;
                facts[`w2Cited_${name}`] = cited;
                if (cited !== shippedRadius) {
                    violations.push(
                        `W2 ${name} — the example cites --glass-blur-resting-radius: ${cited ?? "?"} ` +
                            `but the shipped glass.css value is ${shippedRadius} (the gate follows the source, never a hardcoded number)`,
                    );
                }
            }
        }
    }

    // ── W3 — the two copies are byte-identical on the override lines ─────────
    const wiringSet = JSON.stringify(wiringDecls);
    const readmeSet = JSON.stringify(readmeDecls);
    facts.w3Parity = wiringSet === readmeSet;
    if (wiringBody && readmeBody && wiringSet !== readmeSet) {
        violations.push(
            `W3 — the ${WIRING_REL} and README.md override examples diverge: ` +
                `wiring=${wiringSet} README=${readmeSet}`,
        );
    }

    // ── W4 — the consumer canon line is recorded in the canon home ───────────
    const hasCanon = wiringMd != null && CANON_SIG.test(wiringMd);
    facts.w4Canon = hasCanon;
    if (!hasCanon) {
        violations.push(
            `W4 — ${WIRING_REL} does not record the override-the-primitive consumer canon ` +
                `("override the --glass-blur-*-radius primitive, never the composed --glass-blur-*")`,
        );
    }

    return { violations, facts, wiringRaw, readmeRaw };
}

function run() {
    const { violations, facts } = detect();
    const pass = violations.length === 0;
    const ARTIFACT = gateArtifactPath("GLASS_UI_DOC_OVERRIDE_ARTIFACT", "BB-doc-override-idiom");
    const report = {
        gate: "proof:doc-override-idiom",
        generatedAt: snapshotStamp(),
        pass,
        violations,
        facts,
    };
    writeGateArtifact(ARTIFACT, report);

    console.log(
        "proof:doc-override-idiom — the consumer-wiring example overrides the -radius PRIMITIVE (not the composite), byte-parity, value live-read from source (BH.B5c re-home)",
    );
    console.log(`  shipped --glass-blur-resting-radius : ${facts.shippedRadius ?? "?"}`);
    console.log(`  ${WIRING_REL} override decls : ${(facts.w1WiringDecls ?? []).join(" · ") || "(none)"}`);
    console.log(`  README.md override decls            : ${(facts.w1ReadmeDecls ?? []).join(" · ") || "(none)"}`);
    console.log(`  byte-parity (W3)                    : ${facts.w3Parity ? "✓" : "✗"}`);
    console.log(`  consumer canon recorded (W4)        : ${facts.w4Canon ? "✓" : "✗"}`);
    if (!pass) {
        console.log("");
        for (const v of violations) console.log(`  ✗ ${v}`);
    }
    console.log("");
    console.log(`  status: ${pass ? "PASS" : "FAIL"}   artefact: ${ARTIFACT}`);
    if (!pass) process.exit(1);
}

if (import.meta.url === pathToFileURL(process.argv[1]).href) {
    run();
}

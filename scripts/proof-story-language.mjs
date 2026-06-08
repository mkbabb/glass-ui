#!/usr/bin/env node
// AX.W58 — proof:story-language, the storybook meta-language strip gate
// (pure FS — device-free).
//
// A demo VISITOR reads the story-page prose to learn WHAT a component does and
// WHEN to reach for it. They do NOT read it to learn the library's internal
// development history. Per the greenfield-no-meta + writing-style precepts, the
// story bodies under `demo/stories/**` must carry zero INTERNAL META-LANGUAGE —
// in prose OR in code-comments (the comments ship in the SFC the demo loads).
//
// What is FORBIDDEN anywhere in a demo/stories/** SFC:
//   - a tranche/wave/defect code: `\b[A-Z]{1,2}\.W\d` (K.W6, AW.W3, AX.W17, …)
//     incl. the §-suffixed forms (AQ.W1.2 §W4.7);
//   - the bare word `tranche`;
//   - a `proof:*` gate name (proof:dock-layering-polish, …);
//   - the "muster <Letter>" engagement code (muster J, …);
//   - a WCAG citation in PROSE — `WCAG 2.2.2`, `WCAG-AA`, `WCAG 1.4.11` (a
//     consumer wants the affordance described, not a spec clause cited);
//   - the named impl-note signatures the pass-2 audit flagged: `ref-counted`,
//     `provide-inject` / `provide/inject`, `inheritAttrs`, `binary-consumer`,
//     `overfitting`, `#collapsed slot`, `named #collapsed`.
//
// The scan is the WHOLE file (the `<!-- … -->` / `// …` comments ship in the
// loaded SFC). A live FORWARD reference to a real public name — a token
// `--spring-dock`, a component `<DockIconButton>`, a subpath
// `@mkbabb/glass-ui/dock` — is NOT meta-language and stays green.
//
// Bite (the §HardGate RED witness): re-inject a single `AX.W17` ref or a
// `WCAG 2.2.2` citation or a `proof:foo` name into any demo/stories SFC → RED.

import { readFileSync, readdirSync } from "node:fs";
import { resolve, relative, join } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { gateArtifactPath, snapshotStamp, writeGateArtifact } from "./gate-output.mjs";

const ROOT = resolve(fileURLToPath(new URL("../", import.meta.url)));
const STORIES_DIR = resolve(ROOT, "demo/stories");

// Forbidden meta-language patterns (named so each violation is actionable).
const PATTERNS = [
    { name: "tranche-code", re: /\b[A-Z]{1,2}\.W\d/ },
    { name: "tranche-word", re: /\btranche\b/i },
    { name: "proof-gate-name", re: /\bproof:[a-z][a-z0-9-]+/ },
    { name: "muster-code", re: /\bmuster\s+[A-Z]\b/ },
    { name: "wcag-citation", re: /\bWCAG[\s-]?[\d.]/i },
    {
        name: "impl-note",
        re: /\bref-counted\b|\bprovide[-/]inject\b|\binheritAttrs\b|\bbinary-consumer\b|\boverfitting\b|#collapsed\s+slot|named\s+#collapsed/i,
    },
];

/** Recursively collect every demo/stories `*.vue` file. */
function storyFiles(dir) {
    const out = [];
    for (const ent of readdirSync(dir, { withFileTypes: true })) {
        const p = join(dir, ent.name);
        if (ent.isDirectory()) out.push(...storyFiles(p));
        else if (ent.name.endsWith(".vue")) out.push(p);
    }
    return out.sort();
}

function scanFile(absPath, relPath) {
    const src = readFileSync(absPath, "utf8");
    const lines = src.split("\n");
    const hits = [];
    for (let i = 0; i < lines.length; i++) {
        for (const { name, re } of PATTERNS) {
            const m = lines[i].match(re);
            if (m) {
                hits.push({
                    file: relPath,
                    line: i + 1,
                    pattern: name,
                    match: m[0],
                    text: lines[i].trim().slice(0, 160),
                });
            }
        }
    }
    return hits;
}

export function detect() {
    const violations = [];
    const facts = { storyFiles: 0, hits: [] };

    const files = storyFiles(STORIES_DIR);
    facts.storyFiles = files.length;

    for (const abs of files) {
        const rel = relative(ROOT, abs);
        const hits = scanFile(abs, rel);
        facts.hits.push(...hits);
        for (const h of hits) {
            violations.push(
                `${h.file}:${h.line} — ${h.pattern} "${h.match}" :: ${h.text}`,
            );
        }
    }

    return { facts, violations };
}

function run() {
    const ARTIFACT = gateArtifactPath(
        "GLASS_UI_STORY_LANGUAGE_ARTIFACT",
        "AX-story-language",
    );
    const { facts, violations } = detect();
    const status = violations.length === 0 ? "pass" : "fail";

    writeGateArtifact(ARTIFACT, {
        generatedAt: snapshotStamp(),
        status,
        gate: "proof:story-language",
        facts: { storyFiles: facts.storyFiles, hitCount: facts.hits.length },
        violations,
    });

    console.log(
        "proof:story-language — demo/stories/** carry zero internal meta-language (AX.W58)",
    );
    console.log(`  story SFCs scanned : ${facts.storyFiles}`);
    console.log(`  meta-language hits : ${facts.hits.length}`);
    if (violations.length) {
        console.log("\nVIOLATIONS:");
        for (const v of violations) console.log(`  x ${v}`);
    }
    console.log(
        `\n  status: ${status.toUpperCase()}   artefact: ${relative(ROOT, ARTIFACT)}`,
    );
    process.exit(status === "pass" ? 0 : 1);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
    run();
}

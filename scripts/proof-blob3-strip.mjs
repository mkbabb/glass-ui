// AY.W-BLOB3 — proof:blob3-strip, the speculative-ColorResolver-DI deletion witness.
//
// The blob shipped a deliberately-elaborate dependency-injection seam — a REQUIRED
// `colorResolver` prop, a loud throw on a missing injection, and a re-validating
// renderer option — built for an AX-named consumer #2 (a value.js goo-blob
// repatriation) that NEVER landed. The only real consumer is the demo, which always
// passed the ONE default. W-BLOB3 STRIPS the seam (a clean break, inv-4): the renderer
// resolves color INTERNALLY through the `/color` leaf (`cssToOklch → oklchToGammaRgb`),
// the EXACT body the deleted resolver delegated to, so the render is byte-identical
// (the `proof:blob-color-equivalence` witness ratifies the unchanged triple).
//
// This gate is the DELETION WITNESS (the legitimate ABSENCE-kind) + the RE-POINT
// witness + the SURVIVING-CONSUMER witness, in one fail-closed source-arm check:
//
//   (A) DELETION — `colorResolver`/`ColorResolver` is GONE from every goo-blob CODE
//       file (`.ts`/`.vue`): no prop, no option, no throw, no import. (The goo-blob
//       RESEARCH.md narrates the stripped seam as the finding history — markdown is
//       out of scope; the witness is over executable code.)
//   (B) RE-POINT — `useMetaballRenderer.ts` imports `{ cssToOklch, oklchToGammaRgb }`
//       from the `/color` leaf and `resolveColor` resolves through them (no parallel
//       color math, inv J-10; the same leaf the default resolver delegated to).
//   (C) SURVIVING CONSUMER — `defaultBlobColorResolver` + the `ColorResolver` type
//       STAY on the `/color` surface because `<FourierField>` consumes the type as a
//       REQUIRED prop and its demos pass the default (a real ≥2-consumer; the §0
//       re-grep found it, so the spec's conditional RETIRE-clause does NOT fire — the
//       clean break is the goo-blob DI strip only, NOT a dead-export removal).
//
// SELF-PROVING (the bite): a synthetic re-add of the seam token to a CODE-string copy
// MUST flag, and a synthetic removal of the `/color` re-point MUST flag — the gate
// reds loudly if either detector misses (acceptance is the RED-witness inverse). So
// the bite is demonstrated every run while the committed source stays stripped.

import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import { join, resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { gateArtifactPath, snapshotStamp, writeGateArtifact } from "./gate-output.mjs";

const ROOT = resolve(fileURLToPath(new URL("../", import.meta.url)));
const BLOB_DIR = resolve(ROOT, "src/components/custom/blob");
const RENDERER = resolve(BLOB_DIR, "composables/useMetaballRenderer.ts");
const COLOR_LEAF = resolve(ROOT, "src/composables/color/index.ts");
const FOURIER_INDEX = resolve(ROOT, "src/components/custom/fourier-field/index.ts");

const SEAM_RE = /colorResolver|ColorResolver/;

/** Recursively collect goo-blob CODE files (.ts/.vue) — markdown is out of scope. */
function codeFiles(dir, acc = []) {
    if (!existsSync(dir)) return acc;
    for (const name of readdirSync(dir)) {
        if (name === "node_modules" || name === "__tests__") continue;
        const p = join(dir, name);
        if (statSync(p).isDirectory()) codeFiles(p, acc);
        else if (/\.(ts|tsx|vue)$/.test(name)) acc.push(p);
    }
    return acc;
}

function run() {
    const violations = [];
    const facts = {};

    // (A) DELETION witness — the seam token is GONE from every goo-blob code file.
    const hits = [];
    for (const f of codeFiles(BLOB_DIR)) {
        const src = readFileSync(f, "utf8");
        src.split("\n").forEach((ln, i) => {
            if (SEAM_RE.test(ln)) hits.push(`${f.slice(ROOT.length + 1)}:${i + 1}`);
        });
    }
    facts.seamHits = hits;
    if (hits.length)
        violations.push(
            `the stripped ColorResolver seam still appears in goo-blob code: ${hits.join(", ")} — the prop/option/throw/import must be GONE (inv-4 clean break)`,
        );

    // (B) RE-POINT witness — the renderer resolves color through the /color leaf.
    const renderer = existsSync(RENDERER) ? readFileSync(RENDERER, "utf8") : "";
    if (!renderer) {
        violations.push(`renderer absent: ${RENDERER.slice(ROOT.length + 1)}`);
    } else {
        facts.importsColorLeaf =
            /import\s*\{[^}]*\bcssToOklch\b[^}]*\boklchToGammaRgb\b[^}]*\}\s*from\s*["'][^"']*composables\/color["']/.test(
                renderer,
            ) ||
            (/\bcssToOklch\b/.test(renderer) &&
                /\boklchToGammaRgb\b/.test(renderer) &&
                /from\s*["'][^"']*composables\/color["']/.test(renderer));
        facts.resolveColorRePointed = /const\s+rgb\s*=\s*oklchToGammaRgb\(\s*cssToOklch\(\s*css\s*\)\s*\)/.test(
            renderer,
        );
        if (!facts.importsColorLeaf)
            violations.push(
                "useMetaballRenderer.ts does not import { cssToOklch, oklchToGammaRgb } from the /color leaf — the re-point is missing (the renderer must resolve through the shared color core, not re-throw a parallel path)",
            );
        if (!facts.resolveColorRePointed)
            violations.push(
                "useMetaballRenderer.ts `resolveColor` does not resolve through `oklchToGammaRgb(cssToOklch(css))` — the inlined body must match the deleted resolver byte-for-byte (proof:blob-color-equivalence ratifies the triple)",
            );
    }

    // (C) SURVIVING-CONSUMER witness — the type + default STAY for FourierField.
    const colorLeaf = existsSync(COLOR_LEAF) ? readFileSync(COLOR_LEAF, "utf8") : "";
    const fourier = existsSync(FOURIER_INDEX) ? readFileSync(FOURIER_INDEX, "utf8") : "";
    facts.typeSurvives = /export type ColorResolver\b/.test(colorLeaf);
    facts.defaultSurvives = /export const defaultBlobColorResolver\b/.test(colorLeaf);
    facts.fourierConsumesType = /\bColorResolver\b/.test(fourier);
    if (!facts.typeSurvives)
        violations.push(
            "`ColorResolver` was retired from /color — but <FourierField> consumes it as a REQUIRED prop type (a real ≥2-consumer; the conditional RETIRE-clause must NOT fire)",
        );
    if (!facts.defaultSurvives)
        violations.push(
            "`defaultBlobColorResolver` was retired from /color — but the FourierField demos pass it (a real consumer survives the strip)",
        );
    if (!facts.fourierConsumesType)
        violations.push(
            "fourier-field/index.ts no longer references ColorResolver — the surviving-consumer premise is stale; re-confirm the §0 re-grep before retiring the type",
        );

    // SELF-TEST — the bite. Re-adding the seam to a CODE-string copy MUST flag; the
    // re-point removal MUST flag. If a detector misses, the gate is not load-bearing.
    const seamReAddFlagged = SEAM_RE.test("    colorResolver: ColorResolver;");
    const rePointRemovedFlagged = !/const\s+rgb\s*=\s*oklchToGammaRgb\(\s*cssToOklch\(\s*css\s*\)\s*\)/.test(
        "const rgb = colorResolver(css);",
    );
    if (!seamReAddFlagged || !rePointRemovedFlagged) {
        console.error(
            `[proof:blob3-strip] SELF-TEST FAILED — seam-readd flagged:${seamReAddFlagged} repoint-removal flagged:${rePointRemovedFlagged}. The gate is not load-bearing.`,
        );
        process.exit(1);
    }

    const status = violations.length === 0 ? "pass" : "fail";
    const ARTIFACT = gateArtifactPath("GLASS_UI_BLOB3_STRIP_ARTIFACT", "AY-blob3-strip");
    writeGateArtifact(ARTIFACT, {
        generatedAt: snapshotStamp(),
        status,
        gate: "proof:blob3-strip",
        facts,
        violations,
    });

    console.log("proof:blob3-strip — the speculative ColorResolver DI deletion witness (AY.W-BLOB3)");
    console.log(`  (A) seam GONE from goo-blob code : ${hits.length ? "NO — " + hits.join(", ") : "yes ✓ (0 code hits)"}`);
    console.log(`  (B) renderer re-points to /color : import ${facts.importsColorLeaf ? "✓" : "✗"} · resolveColor ${facts.resolveColorRePointed ? "✓" : "✗"}`);
    console.log(`  (C) type/default survive (FF cons): type ${facts.typeSurvives ? "✓" : "✗"} · default ${facts.defaultSurvives ? "✓" : "✗"} · FourierField ${facts.fourierConsumesType ? "✓" : "✗"}`);
    console.log("  self-test (bite proof)           : OK — seam-readd + repoint-removal both flag");
    if (violations.length) {
        console.log("\nVIOLATIONS:");
        for (const v of violations) console.log(`  ✗ ${v}`);
    }
    console.log(`\n  status: ${status.toUpperCase()}   artefact: ${ARTIFACT.slice(ROOT.length + 1)}`);
    process.exit(status === "pass" ? 0 : 1);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
    run();
}

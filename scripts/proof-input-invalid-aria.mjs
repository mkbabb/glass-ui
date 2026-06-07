#!/usr/bin/env node
// AW.W18 — proof:input-invalid-aria.
//
// The slides `DeckGate` drives validity imperatively (a custom key match, not a
// native `required`/`pattern`), so it sets `aria-invalid="true"` — but the
// shipped `.input-pill` invalid ring keyed ONLY off `:user-invalid` +
// `.user-invalid-fallback` (the browser-constraint path), so the gate had to
// re-paint the ring with a `:deep(input[aria-invalid])`. W18 widens the library
// ring to honor `[aria-invalid="true"]` so any app-driven form gets the
// destructive ring with NO consumer `:deep()`.
//
// The gate parses `src/styles/glass.css`, finds the `.input-pill` invalid-ring
// rule, and asserts the selector group contains ALL THREE members AND the ring
// recipe still resolves `var(--destructive)` (the recipe is widened, not
// replaced). Born RED on HEAD (the rule keys off two of three). Bite: drop the
// `[aria-invalid="true"]` arm → RED; replace the `var(--destructive)` recipe → RED.

import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { gateArtifactPath, snapshotStamp, writeGateArtifact } from "./gate-output.mjs";

/** Strip CSS block comments so a clause cannot be satisfied by a comment. */
function stripComments(src) {
    return src.replace(/\/\*[\s\S]*?\*\//g, "");
}

function cliPaths() {
    const ROOT = resolve(fileURLToPath(new URL("../", import.meta.url)));
    return {
        ROOT,
        GLASS: resolve(ROOT, "src/styles/glass.css"),
        ARTIFACT: gateArtifactPath(
            "GLASS_UI_INPUT_INVALID_ARIA_ARTIFACT",
            "AW-input-invalid-aria",
        ),
    };
}

function run() {
    const { ROOT, GLASS, ARTIFACT } = cliPaths();
    const violations = [];
    const facts = {};

    if (!existsSync(GLASS)) {
        violations.push("src/styles/glass.css is absent");
    } else {
        const css = stripComments(readFileSync(GLASS, "utf8"));

        // Match the base invalid-ring rule: `.input-pill:where(...) { ... }`
        // where the selector group is the validity surface (it carries
        // `:user-invalid`). There may be two such rules (the base tint + the
        // focus-visible ring); both must carry the widened group.
        const ruleRe =
            /\.input-pill:where\(([^)]*:user-invalid[^)]*)\)([^{]*)\{([^}]*)\}/g;
        const rules = [...css.matchAll(ruleRe)];
        facts.invalidRuleCount = rules.length;
        if (rules.length === 0) {
            violations.push(
                "no `.input-pill:where(:user-invalid, …)` invalid-ring rule found",
            );
        }

        const REQUIRED = [":user-invalid", ".user-invalid-fallback", '[aria-invalid="true"]'];
        let allHaveThreeMembers = rules.length > 0;
        let destructiveIntact = false;
        for (const m of rules) {
            const group = m[1];
            for (const member of REQUIRED) {
                if (!group.includes(member)) {
                    allHaveThreeMembers = false;
                    violations.push(
                        `the invalid-ring selector group is missing \`${member}\` (group: \`${group.trim()}\`)`,
                    );
                }
            }
            // At least one of the invalid rules must resolve var(--destructive)
            // (the recipe is intact, not replaced).
            if (/var\(--destructive\)/.test(m[3])) destructiveIntact = true;
        }
        facts.allHaveThreeMembers = allHaveThreeMembers;
        facts.destructiveRecipeIntact = destructiveIntact;
        if (!destructiveIntact) {
            violations.push(
                "no `.input-pill` invalid-ring rule resolves `var(--destructive)` — the destructive recipe was replaced, not widened",
            );
        }
    }

    const status = violations.length === 0 ? "pass" : "fail";
    writeGateArtifact(ARTIFACT, {
        generatedAt: snapshotStamp(),
        status,
        gate: "proof:input-invalid-aria",
        facts,
        violations,
    });

    console.log(
        "proof:input-invalid-aria — the .input-pill invalid ring honors [aria-invalid=\"true\"] (AW.W18)",
    );
    console.log(
        `  THREE-MEMBER selector group: ${facts.allHaveThreeMembers ? "yes ✓" : "NO ✗"}   (rules: ${facts.invalidRuleCount ?? 0})`,
    );
    console.log(
        `  --destructive recipe intact: ${facts.destructiveRecipeIntact ? "yes ✓" : "NO ✗"}`,
    );
    if (violations.length) {
        console.log("\nVIOLATIONS:");
        for (const v of violations) console.log(`  ✗ ${v}`);
    }
    console.log(
        `\n  status: ${status.toUpperCase()}   artefact: ${ARTIFACT.slice(ROOT.length + 1)}`,
    );
    process.exit(status === "pass" ? 0 : 1);
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
    run();
}

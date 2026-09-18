// O-20 cure · lane T2 · HK-audit.
//
// THE INVARIANT: every sibling path the overfitting-audit prompt hands a sweep as
// `{CONSUMER_PATHS}` resolves on disk.
//
// A grep over a directory that does not exist returns zero, and zero reads as "no
// consumers". That is the failure this arm catches: `docs/audits/overfitting-audit.md`
// listed `../muster/src/` for two majors while muster's Vue tree has lived at
// `../muster/frontend/src/`, so every sweep that ran the canonical list silently skipped a
// real `^3.1.0` consumer and reported it as unused.
//
// SCOPE, stated rather than implied: this arm checks EXISTENCE of the listed stems, not
// that each stem is where a given repo's glass-ui edges actually are. The latter is the
// sweep's own job; existence is the part a machine can hold between runs.
//
// Not a gate seat — an ordinary vitest file. `node scripts/gate-register.mjs` is unmoved
// at `seats:60 … violations:0`; nothing here mints a G-id.

import { existsSync, readFileSync } from "node:fs";
import { resolve } from "node:path";

import { describe, expect, it } from "vitest";

const repoRoot = process.cwd();
const auditPath = resolve(repoRoot, "docs/audits/overfitting-audit.md");
const auditSource = readFileSync(auditPath, "utf8");

// Every `../<repo>/<dir>` stem in the file — the `{CONSUMER_PATHS}` substitution list and
// the standard fan-out table are the only places the prompt writes one.
const stems = [
    ...new Set(
        auditSource.match(/\.\.\/[A-Za-z0-9._-]+(?:\/[A-Za-z0-9._-]+)*\/?/g) ?? [],
    ),
].sort();

// A sibling repo that is not cloned on this machine is a machine fact, not a defect in the
// prompt — the checkout is skipped with its reason. A repo that IS present and whose listed
// subdirectory is absent is the muster class, and fails.
const siblingRoot = (stem: string) => stem.split("/").slice(0, 2).join("/");

describe("docs/audits/overfitting-audit.md — {CONSUMER_PATHS} resolve on disk", () => {
    it("lists at least one sibling consumer path", () => {
        expect(stems.length).toBeGreaterThan(0);
    });

    it("every listed sibling path exists (absent repos skipped with their reason)", (ctx) => {
        const missing: string[] = [];
        const skipped: string[] = [];

        for (const stem of stems) {
            const root = siblingRoot(stem);
            if (!existsSync(resolve(repoRoot, root))) {
                skipped.push(
                    `${stem} — sibling repo ${root} is not cloned on this machine`,
                );
                continue;
            }
            if (!existsSync(resolve(repoRoot, stem))) missing.push(stem);
        }

        if (skipped.length > 0) console.info(`skipped:\n  ${skipped.join("\n  ")}`);

        // The default reporter drops console output from a passing test, so a run that checked
        // nothing must read `skipped`, never `passed`.
        if (skipped.length === stems.length) {
            ctx.skip(
                `no sibling repo is cloned on this machine:\n  ${skipped.join("\n  ")}`,
            );
        }

        expect(
            missing,
            `consumer paths that do not resolve (a sweep over these greps zero and reads it as "no consumers"): ${missing.join(", ")}${skipped.length > 0 ? `\nskipped (sibling not cloned): ${skipped.join(", ")}` : ""}`,
        ).toEqual([]);
    });
});

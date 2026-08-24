// GF-BLOB W0 — THE GL-ARM EXCISE REGISTER (BK #50, lane γ unit 3).
//
// The excise itself is one wave away; this file is the CONDITION it has to satisfy,
// wired so it can bite. The condition was declared born-RED and live from day one
// (`docs/tranches/BK/gates/ROSTER.md` — "the blob W0 excise (#50)") and had no live
// executable, and an unwired gate cannot fail. This is that executable.
//
// IT MINTS NO SEAT. The blob register rides the existing G-NO-ENGINE-BRANCH seat as an
// arm — the register stays at 60, `violations:0`, and the receipt is byte-identical
// across this commit.
//
// THE DETECTOR IS THE SPEC'S, VERBATIM. `webgl2 | .glsl | setupGL | buildMetaballProgram`,
// case-insensitive, counted in matching LINES over `src/components/blob`. The GREEN
// condition is 0 — prose included, deliberately: a component that no longer has a WebGL2
// arm may not go on describing one, and the excise wave owns the README and the comment
// corpus alongside the code.
//
// THE FIGURE, MEASURED RATHER THAN INHERITED. The spec's §5 row reads "72 register hits /
// 11 files". The file count is exact. The hit count is not reproducible with the spec's
// own detector at any tree: 53 matching lines / 56 occurrences / 11 files, identical at
// the tree the spec was written against and at HEAD. 72 is not a drift — it never was 53's
// value — so this file asserts NO frozen figure at all. Freezing one would mint a second
// authority that the excise wave then has to keep in sync; the census reads the tree.
//
// WHAT THE SCRATCH-COPY RUN FOUND, and why the gate is worth wiring before the wave: the
// spec's W1 delete list (the six `.glsl.ts`/`.frag`/`.vert` shaders + `buildMetaballProgram`
// + `uploadBlobUniforms`) takes the register 53 → 41, not 53 → 0. The residue is 8 files,
// and 38 of its 41 lines are PROSE. The three lines of live code are all in one file
// (`composables/useMetaballRenderer.ts` — the import, the `setupGL:` callback key, and its
// body). A wave that deletes the file list and stops is 77% short of its own gate, and
// this is the instrument that says so out loud instead of at the close.

import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

const BLOB = join(process.cwd(), "src/components/blob");

/**
 * The four-token alphabet of the WebGL2 arm. `\.glsl` carries its dot on purpose: the
 * roster's mutation-that-bites is "restore one `.glsl.ts` import", and the dot is what
 * makes that import — rather than the word "glsl" loose in a sentence about shading
 * languages — the thing being counted.
 */
const REGISTER = /webgl2|\.glsl|setupGL|buildMetaballProgram/i;

function walk(dir: string, out: string[] = []): string[] {
    for (const entry of readdirSync(dir)) {
        const abs = join(dir, entry);
        if (statSync(abs).isDirectory()) walk(abs, out);
        else out.push(abs);
    }
    return out;
}

/**
 * A missing component directory is a missing LAW, not an empty census. Reading it as
 * zero files would report the seat GREEN on the day someone moved the folder, which is
 * the one direction a register gate may never be wrong in.
 */
const FILES = (() => {
    try {
        return walk(BLOB).map((abs) => abs.slice(process.cwd().length + 1));
    } catch {
        return [];
    }
})();

const hits = (rel: string): number =>
    readFileSync(join(process.cwd(), rel), "utf8")
        .split("\n")
        .filter((line) => REGISTER.test(line)).length;

const census = FILES.map((rel) => ({ rel, n: hits(rel) })).filter((row) => row.n > 0);

/**
 * PROSE vs LIVE CODE — and the reason it needs a real classifier rather than a one-line
 * filter. "Starts with `//` or `*`" is adequate for a single hand-picked source file and
 * WRONG at component scope: `README.md` carries ten register lines, not one of which
 * starts with a comment marker, so a whole-directory census taken that way reports the
 * README as live WebGL2 code. Markdown is prose entire, and block-comment interiors count
 * as prose even when their continuation lines carry no leading `*`.
 */
const codeHits = (rel: string): string[] => {
    const out: string[] = [];
    const markdown = rel.endsWith(".md");
    let inBlock = false;

    for (const line of readFileSync(join(process.cwd(), rel), "utf8").split("\n")) {
        const t = line.trim();
        const wasBlock = inBlock;
        if (t.includes("/*") && !t.includes("*/")) inBlock = true;
        else if (t.includes("*/")) inBlock = false;

        if (!REGISTER.test(line)) continue;
        const marker =
            t.startsWith("//") || t.startsWith("*") || t.startsWith("/*") || t.startsWith("<!--");
        if (markdown || marker || wasBlock) continue;
        out.push(t);
    }
    return out;
};

const codeCensus = FILES.map((rel) => ({ rel, lines: codeHits(rel) })).filter(
    (row) => row.lines.length > 0,
);

describe("GF-BLOB W0 — the blob carries no WebGL2 arm", () => {
    // BORN-RED AND STILL RED, on purpose. This is the excise wave's acceptance
    // condition, and it self-flips the moment that wave lands — the `.fails` comes off
    // in the same commit, because a residue list that cannot shrink is a permission slip.
    it.fails("the WebGL2 register over `src/components/blob` reads 0", () => {
        expect(census).toEqual([]);
    });

    it("the census is measurable, and its scope is the component directory", () => {
        // Discrimination is asserted on the DETECTOR and the SCOPE, never on the census
        // total: a `census.length > 0` assertion would forbid this row's own goal state
        // and turn the win into a suite failure.
        expect(FILES.length).toBeGreaterThan(0);
        expect(FILES.some((rel) => rel.endsWith("src/components/blob/Blob.vue"))).toBe(true);
    });

    it("the detector discriminates — it scores the arm and not the WebGPU primary", () => {
        expect(REGISTER.test('import { buildMetaballProgram } from "./buildMetaballProgram";')).toBe(
            true,
        );
        expect(REGISTER.test('import { METABALL_UNIFORMS } from "../shaders/metaball-uniforms.glsl";')).toBe(
            true,
        );
        expect(REGISTER.test("            setupGL: (gl) => {")).toBe(true);
        expect(REGISTER.test('const ctx = canvas.getContext("webgl2");')).toBe(true);

        // The WGSL primary, the WebGPU seam and the physics are NOT the arm.
        expect(REGISTER.test('import { METABALL_WGSL } from "./shaders/metaball.wgsl";')).toBe(false);
        expect(REGISTER.test("const device = await adapter.requestDevice();")).toBe(false);
        expect(REGISTER.test("            setupWGPU: (device) => {")).toBe(false);
    });

    it("every live-code register line sits in the arm's own files or the one seam", () => {
        // The residue finding made executable, and TRUE IN BOTH WORLDS. Today the live-code
        // surface is exactly these four files; the day W1 lands it is the empty set, and
        // this row reads that as a PASS rather than as a regression. Emptiness is case 1's
        // business — the one place an `it.fails` latch belongs — so no hand-edit is owed
        // here at the win, and the row still bites TODAY if a fifth file grows a GL branch.
        //
        // Vacuity at the win is guarded, not ignored: the case above proves the directory
        // is present and non-empty, and the case below proves the detector still scores the
        // arm, so this set cannot go quietly empty for any reason except the excise itself.
        const ALLOWED = new Set([
            "src/components/blob/composables/buildMetaballProgram.ts", // dies in W1
            "src/components/blob/composables/uploadBlobUniforms.ts", // dies in W1
            "src/components/blob/shaders/metaball.frag.ts", // dies in W1
            "src/components/blob/composables/useMetaballRenderer.ts", // the SEAM — W1 rewrites it
        ]);

        expect(codeCensus.filter((row) => !ALLOWED.has(row.rel)).map((row) => row.rel)).toEqual([]);
    });

    it("the seam's live-code entanglement is the program build and the setup key, nothing else", () => {
        // The seam is the one file W1 rewrites rather than deletes, so it is the one place
        // a NEW kind of GL entanglement could hide behind an old count. A raw
        // `getContext("webgl2")` grown here would score the register, name neither symbol,
        // and land in this list. Empty when the seam is clean — including after W1.
        const SEAM = "src/components/blob/composables/useMetaballRenderer.ts";
        const seam = codeCensus.find((row) => row.rel === SEAM);

        expect(
            (seam?.lines ?? []).filter((line) => !/buildMetaballProgram|setupGL/i.test(line)),
        ).toEqual([]);
    });
});

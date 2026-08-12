// The ONE comment counter is plain ESM under scripts/, outside the typed src graph,
// exactly like the other instrument scripts the gates drive.
import { census, classifyText } from "../../scripts/comment-census.mjs";
import { describe, expect, it } from "vitest";

// ─────────────────────────────────────────────────────────────────────────────
// BJ TERMINAL-ROSTER row #17 — W-COMMENT-DIET.
//
// SEATS +0. `G-COMMENT-RATIO` is an ALREADY-SEATED STRUCTURE name (TR §B.5) and
// `G-DETECTOR-BLIND` is an already-declared ARM of the HYGIENE seat
// `G-MUTATION-BITE`. These cases file as close-battery rows under those names, the
// way #23's `G-RADIUS-ROLE` executable, #28's dot-ring battery and #29's 27
// route-grammar arms did: no seat is minted, no `SEAT-BINDING.json` row moves, and
// `node scripts/gate-register.mjs` is byte-identical pre and post.
//
// ROUTED, NOT TAKEN. `SEAT-BINDING.json` still declares `G-COMMENT-RATIO`
// `binding: "none"`. Promoting it to `seat-detector` would move `bound` and re-pin
// `gate-register.test.ts`; that is #65's act (§B.5's own law is that no seat is
// bound on the scan alone), and this row does not spend another row's act.
//
// THE FIGURES ARE THE COMMAND'S, NEVER THIS FILE'S (J-10). Nothing below hard-codes
// a ratio. A test carrying its own copy of the number is the third-regex disease
// J-10 was ruled against: the counter is the one detector, and the gate reads it.
// ─────────────────────────────────────────────────────────────────────────────

const RATIO_CEILING = 0.2;

describe("G-COMMENT-RATIO — source is not a tranche document (BK #17)", () => {
    // ── The detector itself, driven against known inputs ────────────────────
    //
    // "The numerator names its detector" is only worth something if the detector
    // can be run against text whose answer is known in advance. Each fixture is a
    // trap that a line-local regex gets wrong.

    it("a line-local `//` regex is defeated — `https://…` is CODE", () => {
        // WHAT THIS ARM DOES AND DOES NOT BITE, stated because an arm whose named
        // mechanism cannot fail is itself the DETECTOR-BLIND class. It kills the naive
        // "the line contains `//`" matcher, which is the detector this repo would
        // otherwise have gotten. It does NOT exercise the lexer's string branch: both
        // lines carry code before the quote, so they score CODE with the branch deleted
        // too. The branch's own biting arm is the phantom-block case below.
        const { comment, code } = classifyText(
            'const u = "https://example.com/x";\nconst v = 1; // real\n',
            ".ts",
        );
        expect(code).toBe(2);
        expect(comment).toBe(0);
    });

    it("a `/*` inside a string does NOT open a block over the lines beneath it", () => {
        // THE STRING BRANCH'S BITING ARM. Delete the `"…"`/`'…'` handling in `scanLine`
        // and this fails: the `/*` inside the literal opens a phantom block, the live
        // line under it is scored COMMENT, and every line to the next `*/` — or to the
        // end of the file — goes with it. That is the failure mode with real reach,
        // because it inflates the numerator with LIVE CODE.
        const { comment, code } = classifyText(
            'const s = "/* not a block opener";\nconst a = 1;\n',
            ".ts",
        );
        expect(comment).toBe(0);
        expect(code).toBe(2);
    });

    it("the interior of a multi-line template literal is CODE, `//` lines and all", () => {
        // THE ARM THAT BITES THE CROSS-LINE CARRY, and the reason the carry exists:
        // this repo keeps its GLSL and WGSL shaders in template literals, and those
        // shaders are full of `//`. Such a line is inside a STRING, not inside a
        // comment, so the detector's own printed rule scores it CODE — and only
        // state carried ACROSS the newline can see that. A line-local quote flag
        // reads the same bytes as prose and flatters the ratio by the full span of
        // every shader in the corpus.
        const { comment, code } = classifyText(
            [
                "const frag = `",
                "// GLSL, not prose: shader text inside a JS template literal",
                "  vec3 c = vec3(0.0); // trailing, still shader text",
                "/* a block-shaped line, also shader text */",
                "`;",
                "// this one is a real comment",
            ].join("\n"),
            ".ts",
        );
        expect(code).toBe(5);
        expect(comment).toBe(1);
    });

    it("a `\"` string does NOT carry across a newline — only a template can", () => {
        // The carry is bounded by the grammar it models. An unterminated `"…"` is a
        // syntax error, so carrying one would let a typo silently reclassify the
        // rest of a file instead of confining the damage to its line.
        const { comment, code } = classifyText(
            'const broken = "oops;\n// a real comment on the next line\n',
            ".ts",
        );
        expect(code).toBe(1);
        expect(comment).toBe(1);
    });

    it("block continuation lines are counted, and the closer with them", () => {
        const { comment, code } = classifyText(
            "/* one\n   two\n   three */\nconst a = 1;\n",
            ".ts",
        );
        expect(comment).toBe(3);
        expect(code).toBe(1);
    });

    it("a line carrying code AND a trailing comment scores as CODE", () => {
        // Scoring it as prose would flatter the ratio in the direction the wave is
        // cutting — the line is load-bearing whatever else rides on it.
        expect(classifyText("--space-atom: 0.5rem; /* 8px */\n", ".css")).toMatchObject({
            comment: 0,
            code: 1,
        });
    });

    it("CSS has no `//` comment form — a bare `url(//host/x)` is CODE", () => {
        expect(classifyText(".a { background: url(//h/x); }\n", ".css")).toMatchObject({
            comment: 0,
            code: 1,
        });
    });

    it("an SFC is lexed per block — HTML in template, JS in script, CSS in style", () => {
        const sfc = [
            "<script setup lang=\"ts\">",
            "// a script comment",
            "const a = 1;",
            "</script>",
            "",
            "<template>",
            "    <!-- a template comment -->",
            "    <div />",
            "</template>",
            "",
            "<style>",
            "/* a style comment */",
            ".a { color: red; }",
            "</style>",
        ].join("\n");
        const { comment, code } = classifyText(sfc, ".vue");
        expect(comment).toBe(3);
        // Six tag lines + three real lines of content.
        expect(code).toBe(9);
    });

    // ── The PROSE classes, driven against known inputs ──────────────────────
    //
    // `G-COMMENT-RATIO`'s second clause rides the same instrument, and both of these
    // classes read ZERO on the corpus today. A pattern that convicts nothing is
    // indistinguishable from a pattern that cannot fire unless a fixture separates
    // them, which is exactly how `\bΦ\d` sat dead inside the batch-close clause.

    it("a phase id in a comment convicts — the class that had a hole", () => {
        // `Φ` is not a word character, so the `\b`-anchored form could never fire:
        // `/\bΦ\d/.test("Φ4")` is `false`. Corpus movement from the fix is 0 at
        // `4a86570b`; this fixture is the only thing that shows it works at all.
        const { prose } = classifyText("/* Φ4 owns this rung */\n.a { color: red; }\n", ".css");
        expect(prose.map((p: { class: string }) => p.class)).toEqual(["wave-id"]);
    });

    it("a TOKEN obituary convicts in either order, and a live contract does not", () => {
        // The form the file-obituary pattern could not reach: a custom property named
        // in the same breath as its own removal. The negative case is the fence — a
        // sentence that says what a token IS must survive, or the class would convict
        // the contracts the diet is protecting.
        const dead = classifyText(
            "/* `--duration-sparkle` (600ms) DELETED with the disco recipe */\n.a { color: red; }\n",
            ".css",
        );
        const deadReversed = classifyText(
            "/* DELETED with the disco recipe: `--duration-sparkle` */\n.a { color: red; }\n",
            ".css",
        );
        const live = classifyText(
            "/* `--duration-fast` is the tap-feedback clock. */\n.a { color: red; }\n",
            ".css",
        );
        expect(dead.prose.map((p: { class: string }) => p.class)).toEqual(["obituary"]);
        expect(deadReversed.prose.map((p: { class: string }) => p.class)).toEqual(["obituary"]);
        expect(live.prose).toEqual([]);
    });

    // ── The corpus figures ──────────────────────────────────────────────────

    it("the census is internally consistent — comment + code = non-blank", () => {
        const result = census("src");
        expect(result.comment + result.code).toBe(result.nonBlank);
        expect(result.nonBlank).toBeGreaterThan(0);
        // Every classified line is one of exactly three things; a raw count below
        // the non-blank count would mean the lexer invented lines.
        expect(result.raw).toBeGreaterThanOrEqual(result.nonBlank);
    });

    it("the COMMITTED figure is derivable at a named revision, free of lane dirt", () => {
        // ⊕⁷⁴'s L-1: a figure measured on a four-lane shared working tree belongs to
        // whichever lane last saved. Two reads of the same commit must agree exactly,
        // or the number in any record is unreproducible by construction.
        const a = census("src", "HEAD");
        const b = census("src", "HEAD");
        expect(a.comment).toBe(b.comment);
        expect(a.nonBlank).toBe(b.nonBlank);
        expect(a.files).toBe(b.files);
        // A revision read is complete by construction: a blob in the tree listing is
        // a blob in the tree.
        expect(a.missing).toEqual([]);
    });

    it.fails(
        "REPO-WIDE ≤20% AND zero tranche/wave/round names — OWED AT BATCH CLOSE",
        () => {
            // ROUTED RESIDUE, RED ON PURPOSE, with its owner named. `G-COMMENT-RATIO`
            // asserts two clauses and both are read over the WHOLE corpus, so neither
            // can go green inside one lane: the fenced bands (dock/search per lane α,
            // aurora/blob/handmark per γ, configurator per δ) reach the ceiling through
            // their own lanes' re-authors, and this reading is taken at BATCH CLOSE.
            // When it lands the `.fails` comes off in the same commit — a residue list
            // that cannot shrink is a permission slip.
            const result = census("src");
            expect({
                share: result.share <= RATIO_CEILING,
                proseHits: result.prose.length,
            }).toEqual({ share: true, proseHits: 0 });
        },
    );
});

describe("G-MUTATION-BITE · DETECTOR-BLIND arm — prose cannot defeat a detector", () => {
    // The arm's assertion is "no source-scanning gate counts a commented-out
    // declaration as live". Sixty-five gate files read product source and each rolls
    // its own matcher; auditing all sixty-five is an apparatus, and this wave owns a
    // cheaper and stronger move — remove the FUEL. A commented-out declaration that
    // does not exist cannot be scored live by any matcher, stripping or not.

    it("the convicting detector actually fires — a dead declaration is FOUND", () => {
        // The kill-check. Without it, the zero below could mean a broken detector
        // just as easily as a clean corpus, and those are not the same result.
        const found = classifyText(
            ".a {\n  color: red;\n  /* --dead-token: 3px; */\n  /* prose about a trap */\n}\n",
            ".css",
        );
        expect(found.dead.map((d: { text: string }) => d.text)).toEqual([
            "--dead-token: 3px;",
        ]);
    });

    it("src carries ZERO commented-out declarations", () => {
        // NOT BORN-RED, and saying otherwise would be the inflation this tranche keeps
        // striking: the class already read 0 at HEAD. `WAVES.md:847` convicted `G-3`
        // and `G-4` on the 2026-07-28 tree, and the bytes that convicted them are gone
        // — landed out by the rows between. This is a KEEP-DEAD regression lock on a
        // corpus property, exactly the class #28 declared for its ripple/splash lock.
        const result = census("src");
        expect(
            result.dead.map((d: { file: string; line: number }) => `${d.file}:${d.line}`),
        ).toEqual([]);
    });
});

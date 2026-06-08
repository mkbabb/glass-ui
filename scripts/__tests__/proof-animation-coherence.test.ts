// proof:animation-coherence — the gate that makes ONE iOS-spring vocabulary
// structural (AX.W05). The library carried two competing spring authorities (the
// regen --spring-* linear() cohort + the legacy --ease-apple-spring cubic-bezier);
// the bezier is EXCISED and this gate proves no second authority survives, every
// emitted preset reaches a consumer, and every preset names a surface-class
// register. This spec drives the FS-free pure detectors so a regression that
// re-tolerates the bezier, mints a dead token, or drops a register fails
// `npm test`.

import { describe, expect, it } from "vitest";

import {
    coverageReport,
    definedSpringTokens,
    findRetiredSurvivors,
    presetRationaleReport,
    springAliasMap,
    stripComments,
    RETIRED_SPRING_TOKENS,
} from "../proof-animation-coherence.mjs";

describe("proof:animation-coherence — (A) survivor sweep", () => {
    it("flags a live var(--ease-apple-spring) consumer", () => {
        const css = `.x { transition: inset 0.3s var(--ease-apple-spring); }`;
        const hits = findRetiredSurvivors("x.css", css);
        expect(hits).toHaveLength(1);
        expect(hits[0].token).toBe("--ease-apple-spring");
    });

    it("flags the token DEFINITION line", () => {
        const css = `:root { --motion-ease-apple-spring: cubic-bezier(0.175, 0.885, 0.32, 1.275); }`;
        const hits = findRetiredSurvivors("tokens.css", css);
        expect(hits).toHaveLength(1);
        expect(hits[0].token).toBe("--motion-ease-apple-spring");
    });

    it("counts --ease-apple-spring inside --motion-ease-apple-spring ONCE (as the longer name)", () => {
        // The alias line carries BOTH names; the longer name claims the offset so
        // the shorter substring is not double-counted at that position.
        const css = `:root { --ease-apple-spring: var(--motion-ease-apple-spring); }`;
        const hits = findRetiredSurvivors("tokens.css", css);
        // LHS --ease-apple-spring (1) + RHS --motion-ease-apple-spring (1) = 2;
        // the --ease-apple-spring substring inside the RHS is NOT a third hit.
        expect(hits).toHaveLength(2);
        expect(hits.filter((h) => h.token === "--motion-ease-apple-spring")).toHaveLength(1);
        expect(hits.filter((h) => h.token === "--ease-apple-spring")).toHaveLength(1);
    });

    it("does NOT flag a comment-only reference (the retired token in a doc block)", () => {
        const css = `/* the --ease-apple-spring bezier was excised at AX.W05 */\n.x { transition: inset 0.3s var(--spring-snappy); }`;
        expect(findRetiredSurvivors("x.css", css)).toHaveLength(0);
    });

    it("does NOT flag a JS // line-comment reference", () => {
        const ts = `// readToken("--ease-apple-spring") is gone\nconst e = readToken("--spring-bouncy", "ease-out");`;
        expect(findRetiredSurvivors("x.ts", ts)).toHaveLength(0);
    });

    it("the re-pointed corpus has ZERO survivors (the GREEN state)", () => {
        const css = `.a { transition: inset 0.3s var(--spring-snappy); }\n.b { animation: pop 0.3s var(--spring-bouncy, ease-out); }`;
        expect(findRetiredSurvivors("x.css", css)).toHaveLength(0);
    });

    it("pins the retired-token name set", () => {
        expect(RETIRED_SPRING_TOKENS).toEqual([
            "--motion-ease-apple-spring",
            "--ease-apple-spring",
        ]);
    });
});

describe("proof:animation-coherence — (B) consumer-coverage", () => {
    const tokens = `:root {
        --spring-smooth: linear(0, 1);
        --spring-snappy: linear(0, 1);
        --spring-bouncy: linear(0, 1);
        --spring-gentle: linear(0, 1);
    }`;
    const theme = `@theme {
        --ease-spring-gentle: var(--spring-gentle);
    }`;

    function files(corpus: Record<string, string>) {
        return Object.entries(corpus).map(([rel, raw]) => ({ rel, raw }));
    }

    it("a direct var(--spring-X) read counts as a consumer", () => {
        const rows = coverageReport(tokens, theme, files({
            "a.css": `.x { transition: inset 0.3s var(--spring-snappy); }`,
            "b.css": `.y { transition: t 0.3s var(--spring-smooth); }`,
            "c.css": `.z { animation: pop 0.3s var(--spring-bouncy); }`,
        }));
        const snappy = rows.find((r) => r.spring === "--spring-snappy")!;
        expect(snappy.direct).toBe(1);
        expect(snappy.dead).toBe(false);
    });

    it("an --ease-spring-X alias reach counts as a consumer (the @theme public register)", () => {
        // --spring-gentle has no direct var() read but the --ease-spring-gentle
        // alias is consumed — the alias-only reach is a valid consumer.
        const rows = coverageReport(tokens, theme, files({
            "a.css": `.x { transition: inset 0.3s var(--spring-snappy); }`,
            "b.css": `.y { transition: t 0.3s var(--spring-smooth); }`,
            "c.css": `.z { animation: pop 0.3s var(--spring-bouncy); }`,
            "d.css": `.w { transition: t 0.3s var(--ease-spring-gentle); }`,
        }));
        const gentle = rows.find((r) => r.spring === "--spring-gentle")!;
        expect(gentle.direct).toBe(0);
        expect(gentle.alias).toBe(1);
        expect(gentle.dead).toBe(false);
    });

    it("a preset with ZERO direct + ZERO alias reach is DEAD (fail-closed) — the dead-token bite", () => {
        // --spring-bouncy here has no consumer and no alias → the generator
        // minted a dead token, which the coverage arm must catch.
        const rows = coverageReport(tokens, theme, files({
            "a.css": `.x { transition: inset 0.3s var(--spring-snappy); }`,
            "b.css": `.y { transition: t 0.3s var(--spring-smooth); }`,
            "d.css": `.w { transition: t 0.3s var(--ease-spring-gentle); }`,
        }));
        const bouncy = rows.find((r) => r.spring === "--spring-bouncy")!;
        expect(bouncy.total).toBe(0);
        expect(bouncy.dead).toBe(true);
    });

    it("definedSpringTokens reads the LHS token set, ignoring comments", () => {
        const set = definedSpringTokens(`/* --spring-ghost is retired */\n:root { --spring-real: linear(0,1); }`);
        expect(set.has("--spring-real")).toBe(true);
        expect(set.has("--spring-ghost")).toBe(false);
    });

    it("springAliasMap maps --ease-spring-X → --spring-X", () => {
        const map = springAliasMap(`@theme { --ease-spring-bouncy: var(--spring-bouncy); }`);
        expect(map.get("--ease-spring-bouncy")).toBe("--spring-bouncy");
    });
});

describe("proof:animation-coherence — (C) governed rationale", () => {
    it("passes a PRESET whose comment names a register", () => {
        const regen = `const PRESETS = [{ name: "snappy", comment: "register: control — quick crisp" }];`;
        const rows = presetRationaleReport(regen);
        expect(rows).toHaveLength(1);
        expect(rows[0].governed).toBe(true);
    });

    it("FAILS a PRESET with a bare physics-only comment (no register: segment) — the bite", () => {
        const regen = `const PRESETS = [{ name: "snappy", comment: "quick crisp, overshoot ~+6.8%" }];`;
        const rows = presetRationaleReport(regen);
        expect(rows[0].governed).toBe(false);
    });
});

describe("proof:animation-coherence — stripComments", () => {
    it("blanks block, html, and JS-line comments but preserves newlines", () => {
        const out = stripComments(`a\n/* b */\nc\n// d\ne\n<!-- f -->\ng`);
        // line count preserved (7 lines)
        expect(out.split("\n")).toHaveLength(7);
        expect(out).not.toContain("b");
        expect(out).not.toContain("d");
        expect(out).not.toContain("f");
        expect(out).toContain("a");
        expect(out).toContain("c");
        expect(out).toContain("g");
    });
});

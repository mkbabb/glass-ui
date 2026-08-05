import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { describe, expect, it } from "vitest";

// The generator IS the gate's other half: the mirror block on disk must be the
// generator's output byte-for-byte, so no human-typed figure can survive in the
// EASING header. (The header carries no `§2` ordinal — borrowing one from the file
// this partial was carved out of is the drift the marker guard exists to catch.)
// (IOS27-MICRO W-1 · SPEC-SPINE-CONDUCTOR §9 row 2 · CHARTER R-4.)
import {
    BLOCK_START_MARKER,
    MIRROR_LINES_RE,
    generateMirrorBlock,
    mirrorRow,
    regenerate,
    PRESETS,
} from "../../../scripts/regen-spring-tokens.mjs";

const tokens = readFileSync(
    resolve(process.cwd(), "src/styles/tokens/scheme-spring.css"),
    "utf8",
);

/** The header mirror as it exists on disk, trailing newline included. */
function onDiskMirror(): string {
    const match = MIRROR_LINES_RE.exec(tokens);
    if (!match) throw new Error("no mirror block found in scheme-spring.css");
    return match[0];
}

describe("spring token regen", () => {
    // The committed file must be a FIXED POINT of the generator: every guard passes,
    // every anchor matches, every emitted block already equals what is on disk. This
    // is the gate the marker drift needed — `BLOCK_START_MARKER` kept a `§2` the CSS
    // header had dropped, so the script threw before its first replacement and no
    // regen had run since. Nothing exercised the guards, so nothing noticed.
    it("is a fixed point on the committed scheme-spring.css", () => {
        expect(regenerate(tokens)).toBe(tokens);
    });

    it("throws rather than silently skipping when an anchor stops matching", () => {
        // The mutation bite: break each anchor in turn and require a LOUD failure.
        // A regen that no-ops on a moved block is how a mirror goes stale unnoticed.
        expect(() => regenerate(tokens.replace(BLOCK_START_MARKER, "/* moved */"))).toThrow(
            /EASING block header/,
        );
        expect(() =>
            regenerate(tokens.replace(/    --spring-[a-z-]+: linear\(/g, "    --x: l(")),
        ).toThrow(/--spring-\* lines/);
        expect(() =>
            regenerate(
                tokens.replace(/    --spring-[a-z-]+-(?:settle|duration): /g, "    --x: "),
            ),
        ).toThrow(/--spring-\*-duration lines/);
        expect(() =>
            regenerate(
                tokens.replace(/    --spring-[a-z-]+-exit-duration: /g, "    --x: "),
            ),
        ).toThrow(/EXIT-duration/);
        expect(() =>
            regenerate(tokens.replace(MIRROR_LINES_RE, "         (moved)\n")),
        ).toThrow(/mirror rows/);
        expect(() =>
            regenerate(tokens.replace("--transition-liquid-spatial: var(--spring-", "--x: var(--y-")),
        ).toThrow(/--transition-liquid-spatial/);
    });
});

describe("spring token header mirror", () => {
    it("is generated from SPRING_PRESETS, never hand-written", () => {
        expect(onDiskMirror()).toBe(generateMirrorBlock() + "\n");
    });

    it("carries one row per preset and no orphan rows", () => {
        const rows = onDiskMirror().trimEnd().split("\n");
        expect(rows).toHaveLength(PRESETS.length);
        for (const [index, preset] of PRESETS.entries()) {
            expect(rows[index].trimStart().startsWith(`${preset.name}:`)).toBe(true);
        }
    });

    it("holds the [0%,10%] overshoot fence on the curve the token ships", () => {
        for (const preset of PRESETS) {
            const { overshootPercent } = mirrorRow(preset);
            expect(overshootPercent).toBeGreaterThanOrEqual(0);
            expect(overshootPercent).toBeLessThanOrEqual(10);
        }
    });

    // BK #26 — the ROSTERED TITLE IS HELD BYTE-IDENTICAL ON PURPOSE. This case is
    // `spring.mirror.gentle-critical` in the sha-PINNED C19 register, whose title,
    // id and eight-name `requiredCaseIdentity` all still spell the retired roster.
    // Rebinding the pin is the ONE batched byte reserved to band close (#65, C-9;
    // `gates/ROSTER.md:53`), so re-titling here would raise a SECOND register drift
    // and move a receipt this row is required to leave byte-identical. The BODY is
    // re-pointed to the row that actually holds the invariant — `world`, the
    // critically-damped substrate register — and the title's own words ("a calm
    // arrival must not overshoot") remain exactly what is asserted. ROUTED: #65.
    it("holds gentle's ζ exactly critical — a calm arrival must not overshoot", () => {
        const world = PRESETS.find((preset) => preset.name === "world");
        expect(world?.dampingFraction).toBe(1);
        expect(mirrorRow(world).overshootPercent).toBeLessThan(0.05);
    });
});

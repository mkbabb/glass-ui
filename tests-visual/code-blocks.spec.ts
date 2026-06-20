// BC.W-CODE-BLOCKS — code-blocks.spec.ts, the π getComputedStyle readback of the
// ONE Fira-Code code register (the BINDING close criterion; the cardinal split —
// the device-free proof:code-blocks arm proves the SOURCE shape, this spec proves
// the RESOLVED paint).
//
// The user's bar (USER-DEFECTS §C): component names + technical values must be
// proper CODE BLOCKS + Fira Code. THE DEVICE-FREE SOURCE GATE proves the dialect
// collapse (no font-mono/raw-fira-code <code> in the enrolled set, the primitives
// compose the register). THIS SPEC PROVES THE RENDER, the bite the source arm
// cannot give: the inline <Code> chip resolves the Fira-Code font stack + a
// non-transparent tinted backplate + the warm `--foreground` ink; the <CodeBlock>
// plate resolves the fira-code font + a TRANSLUCENT glass background (α<0.92 — the
// toast-glass §E floor, the W55 seam, NOT a flat grey slab) + the golden
// `--card-pad-inline` padding; the copy button is reachable.
//
// It asserts (both modes, LOCAL real-render against :5199):
//   CB-π-1 — every inline `.story-code` chip resolves a mono/Fira-Code font-family
//            + a non-transparent backplate (the literal pops out of prose).
//   CB-π-2 — the `.story-code-block` plate resolves a TRANSLUCENT glass background
//            (computed alpha < 0.92 over the page) — the W55 seam, not a grey slab.
//   CB-π-3 — the code-block <pre> resolves a mono/Fira-Code font-family, and the
//            plate's resolved padding-inline matches its `--card-pad-inline` (the
//            golden ladder, NOT a hand-rolled p-N).
//   CB-π-4 — the copy button is present + reachable (a `[aria-label]` button in the
//            code-block plate).

import { test, expect } from "@playwright/test";
import { mkdirSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";

const VISUAL_DIR = fileURLToPath(
    new URL("../docs/tranches/BC/audit/visual/", import.meta.url),
);

const ROUTE = "/display/card";

const paired: Record<string, unknown> = {};

// A computed background is translucent when its resolved alpha is < the threshold.
function backgroundAlpha(c: string): number {
    if (!c || c === "transparent" || c === "rgba(0, 0, 0, 0)") return 0;
    const rgba = c.match(/rgba?\(([^)]+)\)/);
    if (rgba) {
        const parts = rgba[1].split(",").map((s) => s.trim());
        return parts.length === 4 ? parseFloat(parts[3]) : 1;
    }
    // oklab/oklch with a trailing `/ a` alpha.
    const oka = c.match(/\/\s*([\d.]+)\s*\)?$/);
    if (oka) return parseFloat(oka[1]);
    return 1; // an opaque named/hex color
}

function isPaintingColor(c: string): boolean {
    return backgroundAlpha(c) > 0;
}

function isMono(family: string): boolean {
    return /mono|fira|consolas|menlo|courier|ui-monospace/i.test(family);
}

test.describe("BC.W-CODE-BLOCKS — the ONE Fira-Code code register (π)", () => {
    for (const dark of [false, true]) {
        const mode = dark ? "dark" : "light";

        test(`CB-π-1..4 — inline chip + glass code-block plate + golden pad + copy (${mode})`, async ({
            page,
        }) => {
            await page.goto(ROUTE, { waitUntil: "domcontentloaded" });
            await page.evaluate(
                (on) => document.documentElement.classList.toggle("dark", on),
                dark,
            );
            await page.waitForSelector("article", { timeout: 8000 }).catch(() => {});
            await page.waitForTimeout(500);

            const readback = await page.evaluate(() => {
                const px = (v: string) => Math.round(parseFloat(v) * 100) / 100;

                // The inline chips.
                const chips = [...document.querySelectorAll("code.story-code")].map(
                    (el) => {
                        const cs = getComputedStyle(el);
                        return {
                            family: cs.fontFamily,
                            bg: cs.backgroundColor,
                            color: cs.color,
                        };
                    },
                );

                // The code-block plates.
                const blocks = [...document.querySelectorAll(".story-code-block")].map(
                    (el) => {
                        const cs = getComputedStyle(el);
                        const pre = el.querySelector(".story-code-block-pre");
                        const preCs = pre ? getComputedStyle(pre) : null;
                        const padInlineToken = cs
                            .getPropertyValue("--card-pad-inline")
                            .trim();
                        const copyBtn = el.querySelector("button[aria-label]");
                        return {
                            bg: cs.backgroundColor,
                            padInline: px(cs.paddingInlineStart),
                            padInlineToken,
                            preFamily: preCs ? preCs.fontFamily : "",
                            hasCopy: Boolean(copyBtn),
                            copyLabel: copyBtn
                                ? copyBtn.getAttribute("aria-label")
                                : null,
                        };
                    },
                );

                return { chips, blocks };
            });

            paired[mode] = readback;

            const chips = readback.chips as {
                family: string;
                bg: string;
                color: string;
            }[];
            const blocks = readback.blocks as {
                bg: string;
                padInline: number;
                padInlineToken: string;
                preFamily: string;
                hasCopy: boolean;
                copyLabel: string | null;
            }[];

            // CB-π-1 — the inline chips render + resolve a mono/Fira-Code font +
            // a non-transparent backplate.
            expect(
                chips.length,
                `${mode}: /display/card renders inline <Code> chips`,
            ).toBeGreaterThan(0);
            for (const c of chips.slice(0, 12)) {
                expect(
                    isMono(c.family),
                    `${mode}: inline chip resolves a mono/Fira-Code font (got "${c.family}")`,
                ).toBe(true);
                expect(
                    isPaintingColor(c.bg),
                    `${mode}: inline chip resolves a non-transparent backplate (got "${c.bg}")`,
                ).toBe(true);
            }

            // CB-π-2..4 — the code-block plates render glass + golden pad + copy.
            expect(
                blocks.length,
                `${mode}: /display/card renders <CodeBlock> plates`,
            ).toBeGreaterThanOrEqual(2);
            for (const b of blocks) {
                // CB-π-2 — translucent glass background (W55 seam, not a grey slab).
                const alpha = backgroundAlpha(b.bg);
                expect(
                    alpha,
                    `${mode}: code-block plate resolves a TRANSLUCENT glass background (α<0.92, got ${alpha} from "${b.bg}")`,
                ).toBeLessThan(0.92);
                // CB-π-3 — the <pre> resolves a mono/Fira-Code font; the plate's
                // resolved padding-inline matches its --card-pad-inline token.
                expect(
                    isMono(b.preFamily),
                    `${mode}: code-block <pre> resolves a mono/Fira-Code font (got "${b.preFamily}")`,
                ).toBe(true);
                expect(
                    b.padInline,
                    `${mode}: code-block plate carries a golden padding-inline (>0; got ${b.padInline}, token "${b.padInlineToken}")`,
                ).toBeGreaterThan(0);
                // CB-π-4 — the copy button is present + reachable.
                expect(
                    b.hasCopy,
                    `${mode}: code-block plate carries a reachable copy button (aria-label "${b.copyLabel}")`,
                ).toBe(true);
            }
        });
    }

    test.afterAll(() => {
        mkdirSync(VISUAL_DIR, { recursive: true });
        writeFileSync(
            `${VISUAL_DIR}/W-CODE-BLOCKS-readback.json`,
            `${JSON.stringify(paired, null, 2)}\n`,
        );
    });
});

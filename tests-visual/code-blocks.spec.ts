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

// ── BI.W-CODEBLOCK — the highlighted register π (hljs swap + warm crayons) ──────
// The BC arm above bound the plate/font/pad/copy. THIS arm binds what the
// BI.W-CODEBLOCK highlight lands: the lazy highlight.js chunk resolves into
// `.hljs-*` crayon spans, the raw text stays present across the swap (CLS-0 content
// invariant — highlighting is deferred COLOR, never deferred content), and the
// warm crayons resolve to distinct non-transparent colors off the `--code-*`
// tokens. The route is /containers/configurator (its <CodeBlock> snippet carries
// keyword + comment + string runs, so every crayon class is present to read).
//
// The full G3 AA≥4.5 / APCA≥60 crayon-contrast over the composited `.glass-quiet`
// plate rides the paint-arm OKLab batch (#92) — this spec proves the crayons
// APPLY + are DISTINCT; the paint-arm proves they CLEAR.
const paintedBI: Record<string, unknown> = {};

test.describe("BI.W-CODEBLOCK — the highlighted code register (π)", () => {
    for (const dark of [false, true]) {
        const mode = dark ? "dark" : "light";

        test(`CB-π-5..6 — hljs swap + warm crayons resolve distinct (${mode})`, async ({
            page,
        }) => {
            await page.goto("/containers/configurator", {
                waitUntil: "domcontentloaded",
            });
            await page.evaluate(
                (on) => document.documentElement.classList.toggle("dark", on),
                dark,
            );
            await page.waitForSelector(".story-code-block-pre", { timeout: 8000 });
            // Give the lazy `import("highlight.js/lib/core")` chunk time to resolve
            // + swap the innerHTML.
            await page
                .waitForSelector(".story-code-block-pre[data-hljs-highlighted]", {
                    timeout: 8000,
                })
                .catch(() => {});
            await page.waitForTimeout(400);

            const readback = await page.evaluate(() => {
                const pre = document.querySelector(".story-code-block-pre");
                if (!pre) return null;
                const rawText = (pre.textContent ?? "").trim();
                const highlighted = pre.hasAttribute("data-hljs-highlighted");
                const hljsSpans = pre.querySelectorAll('[class^="hljs-"]').length;
                const colorOf = (sel: string) => {
                    const el = pre.querySelector(sel);
                    return el ? getComputedStyle(el).color : null;
                };
                const base = getComputedStyle(pre).color;
                return {
                    rawTextLen: rawText.length,
                    highlighted,
                    hljsSpans,
                    keyword: colorOf(".hljs-keyword"),
                    string: colorOf(".hljs-string"),
                    comment: colorOf(".hljs-comment"),
                    base,
                };
            });

            paintedBI[mode] = readback;
            expect(readback, `${mode}: /containers/configurator renders a CodeBlock`).not.toBeNull();
            const r = readback as NonNullable<typeof readback>;

            // CB-π-5 — the raw text is present from frame 0 (CLS-0 content invariant)
            // AND the lazy chunk resolved into `.hljs-*` spans (highlighting landed).
            expect(
                r.rawTextLen,
                `${mode}: the raw code text is present (deferred COLOR, never content)`,
            ).toBeGreaterThan(0);
            expect(
                r.highlighted && r.hljsSpans > 0,
                `${mode}: the lazy highlight.js chunk resolved into .hljs-* crayon spans (${r.hljsSpans} spans, marker=${r.highlighted})`,
            ).toBe(true);

            // CB-π-6 — the warm crayons resolve to real, distinct, non-transparent
            // colors (the theme APPLIED; keyword ≠ string ≠ comment ≠ base ink). The
            // AA/APCA contrast-over-plate is the paint-arm π batch.
            const isColor = (c: string | null) =>
                Boolean(c) && c !== "rgba(0, 0, 0, 0)" && c !== "transparent";
            for (const [name, c] of [
                ["keyword", r.keyword],
                ["string", r.string],
                ["comment", r.comment],
            ] as const) {
                expect(
                    isColor(c),
                    `${mode}: the ${name} crayon resolves a real color (got "${c}")`,
                ).toBe(true);
            }
            expect(
                new Set([r.keyword, r.string, r.comment]).size,
                `${mode}: the crayons are distinct hues (keyword/string/comment must differ — got ${r.keyword} / ${r.string} / ${r.comment})`,
            ).toBeGreaterThanOrEqual(2);
        });
    }

    test.afterAll(() => {
        mkdirSync(VISUAL_DIR, { recursive: true });
        writeFileSync(
            `${VISUAL_DIR}/W-CODEBLOCK-highlight-readback.json`,
            `${JSON.stringify(paintedBI, null, 2)}\n`,
        );
    });
});

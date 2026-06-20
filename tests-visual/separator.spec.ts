// BC.W-SEPARATOR-FIX — separator.spec.ts, the BINDING π readback (the captured painted
// truth). proof:separator-fix proves the SOURCE (the split-rule flexbox arm + the warm
// --separator-ink + the no-occlusion-trick + the page-on-<Card>); THIS spec proves the
// RENDER — the live getComputedStyle / bounding-box readback, never the source diff alone
// (the AZ source-green/visually-broken close-class this bar exists to kill).
//
// THE BINDING ARMS (both modes; the spec reads the live /display/separator cascade):
//
//   (a) TEXT CENTERED — the labelled separator's label is vertically + horizontally
//       centered on the rule: the label's bounding-box center coincides with the
//       separator's center-line (within tolerance — the binding "text not centered" truth).
//   (b) SPLIT RULE — the rule reads as TWO visible segments split around the label: a rule
//       segment exists on BOTH sides of the label, none THROUGH it (the textbook
//       ─── or ─── divider, not a label floating on an unbroken line).
//   (c) WARM RULE — the rule color resolves WARM (OKLab chroma > 0 — not a grey
//       --border line; the BA.W-NO-GRAY hairline floor).
//   (d) GLASS PAGE — the page's cards paint translucent-glass (bg α < 0.92 over the
//       backdrop — the rebuilt BC.W-GLASS-IDENTITY material, NOT a grey opaque slab).
//
// At ≥2 viewports, chromium + WebKit. Fail-CLOSED: an off-center label, a missing rule
// segment, a grey rule (chroma 0), or an opaque card (α≥0.92) reds the readback.

import { test, expect } from "@playwright/test";
import type { Page } from "@playwright/test";
import { fileURLToPath } from "node:url";
import { mkdirSync } from "node:fs";

const VISUAL_DIR = fileURLToPath(
    new URL("../docs/tranches/BC/audit/visual/", import.meta.url),
);

const HOST_ROUTE = "/display/separator";

const VIEWPORTS = [
    { name: "mobile", width: 390, height: 844 },
    { name: "desktop", width: 1280, height: 800 },
] as const;

// ── OKLab plumbing (sRGB → OKLab chroma; the perceptual chroma the eye reads) ─────────────
function parseRgbA(str: string): { r: number; g: number; b: number; a: number } | null {
    const m = str.match(/rgba?\(([^)]+)\)/);
    if (m) {
        const p = m[1].split(/[,\s/]+/).filter(Boolean).map(Number);
        return { r: p[0], g: p[1], b: p[2], a: p[3] === undefined ? 1 : p[3] };
    }
    return null;
}
function rgbChroma(r: number, g: number, b: number): number {
    const lin = (c: number) => {
        c /= 255;
        return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
    };
    const lr = lin(r);
    const lg = lin(g);
    const lb = lin(b);
    const l = Math.cbrt(0.4122214708 * lr + 0.5363325363 * lg + 0.0514459929 * lb);
    const mm = Math.cbrt(0.2119034982 * lr + 0.6806995451 * lg + 0.1073969566 * lb);
    const s = Math.cbrt(0.0883024619 * lr + 0.2817188376 * lg + 0.6299787005 * lb);
    const a = 1.9779984951 * l - 2.428592205 * mm + 0.4505937099 * s;
    const bb = 0.0259040371 * l + 0.7827717662 * mm - 0.808675766 * s;
    return Math.hypot(a, bb);
}

async function setDark(page: Page, dark: boolean): Promise<void> {
    await page.evaluate((on) => document.documentElement.classList.toggle("dark", on), dark);
    await page.waitForTimeout(120);
}

/**
 * Read the labelled separator: the wrapper rect, the label rect (the "or" span), and the
 * left + right rule-segment rects + the rule's painted color. The labelled separator is the
 * split-rule wrapper carrying role="separator" + aria-label="or".
 */
async function readLabelled(page: Page): Promise<{
    wrapper: DOMRect;
    label: DOMRect;
    leftRule: DOMRect | null;
    rightRule: DOMRect | null;
    ruleColor: string;
} | null> {
    return page.evaluate(() => {
        const sep = document.querySelector<HTMLElement>(
            '[data-slot="separator"][role="separator"][aria-label="or"]',
        );
        if (!sep) return null;
        const spans = Array.from(sep.querySelectorAll<HTMLElement>(":scope > span"));
        // The label span is the one carrying the text; the rule segments are the others.
        const labelSpan = spans.find((s) => (s.textContent || "").trim() === "or") || null;
        const ruleSpans = spans.filter((s) => s !== labelSpan);
        if (!labelSpan || ruleSpans.length < 2) return null;
        const r = (el: HTMLElement) => {
            const b = el.getBoundingClientRect();
            return {
                x: b.x,
                y: b.y,
                width: b.width,
                height: b.height,
                top: b.top,
                left: b.left,
                right: b.right,
                bottom: b.bottom,
            } as DOMRect;
        };
        // Order rules left→right by x.
        ruleSpans.sort((a, b) => a.getBoundingClientRect().x - b.getBoundingClientRect().x);
        const ruleColor = getComputedStyle(ruleSpans[0]).backgroundColor;
        return {
            wrapper: r(sep),
            label: r(labelSpan),
            leftRule: r(ruleSpans[0]),
            rightRule: r(ruleSpans[ruleSpans.length - 1]),
            ruleColor,
        };
    });
}

/** Read the first <Card> plate's painted background on the page. */
async function readCardBg(page: Page): Promise<string | null> {
    return page.evaluate(() => {
        const card = document.querySelector<HTMLElement>('[data-slot="card"]');
        if (!card) return null;
        return getComputedStyle(card).backgroundColor;
    });
}

test.describe("separator (π — split-rule centering + warm hairline + glass page, fail-CLOSED)", () => {
    test.beforeEach(async ({ page }) => {
        mkdirSync(VISUAL_DIR, { recursive: true });
        await page.goto(HOST_ROUTE, { waitUntil: "networkidle" });
    });

    for (const vp of VIEWPORTS) {
        for (const mode of [false, true] as const) {
            const modeLabel = mode ? "dark" : "light";

            test(`(a)+(b)+(c) the labelled rule is centered, split, and warm [${modeLabel}] @ ${vp.name}`, async ({
                page,
            }) => {
                await page.setViewportSize({ width: vp.width, height: vp.height });
                await setDark(page, mode);

                const m = await readLabelled(page);
                expect(m, "the labelled split-rule separator must mount").not.toBeNull();
                if (!m) return;

                // (a) TEXT CENTERED — the label's center coincides with the wrapper's
                //     center on BOTH axes.
                const labelCx = m.label.left + m.label.width / 2;
                const labelCy = m.label.top + m.label.height / 2;
                const wrapCx = m.wrapper.left + m.wrapper.width / 2;
                const wrapCy = m.wrapper.top + m.wrapper.height / 2;
                expect(
                    Math.abs(labelCx - wrapCx),
                    `label horizontal center ${labelCx.toFixed(1)} must coincide with rule center ${wrapCx.toFixed(1)}`,
                ).toBeLessThanOrEqual(3);
                expect(
                    Math.abs(labelCy - wrapCy),
                    `label vertical center ${labelCy.toFixed(1)} must coincide with rule center ${wrapCy.toFixed(1)}`,
                ).toBeLessThanOrEqual(3);

                // (a2) the label is NOT squished to a 1px sliver — it reads at its normal
                //      text height (a ~12px caption clears a real height floor).
                expect(
                    m.label.height,
                    `label must read at normal size, got ${m.label.height}px (a 1px-pinned overflow REDs)`,
                ).toBeGreaterThan(6);

                // (b) SPLIT RULE — a rule segment sits to the LEFT of the label and one to
                //     the RIGHT (two visible segments split around the label, none through).
                expect(m.leftRule, "left rule segment").not.toBeNull();
                expect(m.rightRule, "right rule segment").not.toBeNull();
                if (m.leftRule && m.rightRule) {
                    expect(
                        m.leftRule.right,
                        `left rule (ends ${m.leftRule.right.toFixed(1)}) must end at/before the label left ${m.label.left.toFixed(1)}`,
                    ).toBeLessThanOrEqual(m.label.left + 2);
                    expect(
                        m.rightRule.left,
                        `right rule (starts ${m.rightRule.left.toFixed(1)}) must start at/after the label right ${m.label.right.toFixed(1)}`,
                    ).toBeGreaterThanOrEqual(m.label.right - 2);
                    // Both segments are non-trivially wide (the rule visibly reads).
                    expect(m.leftRule.width, "left rule width").toBeGreaterThan(8);
                    expect(m.rightRule.width, "right rule width").toBeGreaterThan(8);
                }

                // (c) WARM RULE — the rule color resolves WARM (OKLab chroma > 0, not grey).
                const rc = parseRgbA(m.ruleColor);
                expect(rc, `could not parse rule color "${m.ruleColor}"`).not.toBeNull();
                if (rc) {
                    const chroma = rgbChroma(rc.r, rc.g, rc.b);
                    expect(
                        chroma,
                        `the rule must read WARM (chroma>0), got ${chroma.toFixed(4)} (${m.ruleColor})`,
                    ).toBeGreaterThan(0.001);
                }
            });

            test(`(d) the page's cards paint translucent-glass [${modeLabel}] @ ${vp.name}`, async ({
                page,
            }) => {
                await page.setViewportSize({ width: vp.width, height: vp.height });
                await setDark(page, mode);

                const bg = await readCardBg(page);
                expect(bg, "a <Card> plate must mount on the page").not.toBeNull();
                if (!bg) return;
                const c = parseRgbA(bg);
                expect(c, `could not parse card bg "${bg}"`).not.toBeNull();
                if (c) {
                    expect(
                        c.a,
                        `the page card must be translucent glass (α<0.92), got α=${c.a} (${bg}) — the rebuilt material, NOT a grey opaque slab`,
                    ).toBeLessThan(0.92);
                }
            });
        }
    }
});

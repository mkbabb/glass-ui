// AZ.W-METRIC-UNIFY — live capture: the zero-value bug-fix DELTA.
//
// The metric-badge story renders a `<MetricBadge :value="0" unit="/min" />` (the
// "errors" cell). Pre-fix it painted the em-dash "—", muted, color-stripped (the
// truthy `amount || placeholder` bug). Post-fix it reads "0", un-muted. This
// one-shot generator captures the metric-badge + metric-pill showcases and reads
// back the rendered text of every `.metric-badge__amount` so the fix is a
// captured DELTA artefact (screenshot + π readback), not a commit claim.
//
// Driven against the running demo on :5199 (GLASS_UI_DEMO_URL). Evidence is the
// .png + the readback JSON in the AZ visual audit dir.

import { fileURLToPath } from "node:url";
import { writeFileSync } from "node:fs";
import { test, expect } from "@playwright/test";

const ROOT = fileURLToPath(new URL("..", import.meta.url));
const OUT = `${ROOT}docs/tranches/AZ/audit/visual`;
const BASE = process.env.GLASS_UI_DEMO_URL ?? "http://localhost:5199";

type Page = import("@playwright/test").Page;

async function goto(page: Page, route: string) {
    await page.goto(BASE + route, { waitUntil: "networkidle" });
    await page.waitForTimeout(450);
}

/** Read every rendered metric amount + whether it carries the muted class. */
async function readAmounts(page: Page) {
    return page.evaluate(() => {
        const out: { text: string; muted: boolean; hasColor: boolean }[] = [];
        for (const el of Array.from(document.querySelectorAll(".metric-badge__amount"))) {
            const cls = el.getAttribute("class") || "";
            const style = el.getAttribute("style") || "";
            out.push({
                text: (el.textContent || "").trim(),
                muted: cls.includes("text-muted-foreground/40"),
                hasColor: /color\s*:/.test(style),
            });
        }
        return out;
    });
}

test("metric-badge zero-value reads '0', un-muted (the bug-fix DELTA)", async ({ page }) => {
    await goto(page, "/display/metric-badge");
    await page.screenshot({ path: `${OUT}/metric-badge-zero-value.png`, fullPage: true });
    const amounts = await readAmounts(page);

    // The "errors" cell is the binding 0 case: text "0", NOT muted.
    const zeroCells = amounts.filter((a) => a.text === "0");
    expect(zeroCells.length).toBeGreaterThan(0);
    for (const z of zeroCells) {
        expect(z.text).toBe("0");
        expect(z.muted).toBe(false);
    }
    // NO 0-cell should have rendered as the em-dash.
    const emDashCount = amounts.filter((a) => a.text === "—").length;
    writeFileSync(
        `${OUT}/metric-badge-zero-readback.json`,
        JSON.stringify({ route: "/display/metric-badge", amounts, zeroCells, emDashCount }, null, 2),
    );
});

test("metric-pill showcase capture", async ({ page }) => {
    await goto(page, "/display/metric-pill");
    await page.screenshot({ path: `${OUT}/metric-pill-showcase.png`, fullPage: true });
    const amounts = await readAmounts(page);
    writeFileSync(
        `${OUT}/metric-pill-readback.json`,
        JSON.stringify({ route: "/display/metric-pill", amounts }, null, 2),
    );
});

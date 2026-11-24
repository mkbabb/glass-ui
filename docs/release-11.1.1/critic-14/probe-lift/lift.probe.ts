// Critic 13 (copied by critic 14), readings only: does the controls harness's `scale-on-hover` tile carry the
// utility's rule? Counts the stylesheet rules on the page whose selector names the class,
// and reads the tile's computed scale at rest, under a mouse hover (1440) and after a tap
// (390). With the rule, a hover lifts the tile; without it, the scale stays `none`.
import { expect, test } from "@playwright/test";
import { gotoReady, isPhone, pressOn } from "../release-11-1-1/film";

test("lift · the scale-on-hover tile carries the utility's rule", async ({ page }, info) => {
    await gotoReady(page, "/tests-visual/release-11-1-1/controls-harness.html");
    const tile = page.locator('[data-testid="c-lift"]');
    await tile.waitFor();
    await page.waitForTimeout(800);
    const rules = await page.evaluate(() => {
        const out: string[] = [];
        const walk = (list: CSSRuleList) => {
            for (const r of Array.from(list)) {
                if ("cssRules" in r && (r as CSSGroupingRule).cssRules) walk((r as CSSGroupingRule).cssRules);
                const sel = (r as CSSStyleRule).selectorText;
                if (sel && sel.includes("scale-on-hover")) out.push(`${sel} { ${(r as CSSStyleRule).style.cssText} }`);
            }
        };
        for (const s of Array.from(document.styleSheets)) {
            try { walk(s.cssRules); } catch { /* cross-origin */ }
        }
        return out;
    });
    const rest = await tile.evaluate((el) => getComputedStyle(el).scale);
    let after: string;
    if (isPhone(info.project.name)) {
        await pressOn(page, info.project.name, '[data-testid="c-lift"]');
        await page.waitForTimeout(800);
        after = await tile.evaluate((el) => getComputedStyle(el).scale);
    } else {
        await tile.hover();
        await page.waitForTimeout(800);
        after = await tile.evaluate((el) => getComputedStyle(el).scale);
    }
    const cls = await tile.getAttribute("class");
    const reading = { project: info.project.name, cls, rules, rest, after };
    console.log("READING", JSON.stringify(reading));
    await info.attach("reading", { body: JSON.stringify(reading), contentType: "application/json" });
    expect(rules.length, `the page carries a rule for .scale-on-hover ${JSON.stringify(reading)}`).toBeGreaterThan(0);
});

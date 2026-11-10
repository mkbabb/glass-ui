// Inspect one scene's dock boxes (exploration aid, not a witness).
//   node inspect.mjs <base> <query> <js-expression-file>
import { chromium } from "playwright";
import { readFileSync } from "node:fs";
const [base, query, exprFile] = process.argv.slice(2);
const browser = await chromium.launch({ headless: true });
try {
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 800 } });
    const page = await ctx.newPage();
    await page.goto(`${base}/docs/release-11.1.0/lane-L6/harness/index.html?${query}`);
    await page.waitForFunction(() => window.__ready === true);
    await page.waitForTimeout(900);
    console.log(JSON.stringify(await page.evaluate(readFileSync(exprFile, "utf8")), null, 1));
} finally {
    await browser.close();
}

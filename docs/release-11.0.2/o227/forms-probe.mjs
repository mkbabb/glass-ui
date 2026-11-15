// Which border-color forms crash Playwright WebKit 2311 (the build Playwright 1.61.1
// resolves). One browser, a fresh context per form, each page loads about:blank and
// sets the form on a div inside a transition-free style rule.
//   node forms-probe.mjs
import { webkit } from "playwright";
const forms = {
    "one translucent arm": "color-mix(in srgb, #1c1917 6.5%, transparent)",
    "two literal translucent arms": "color-mix(in srgb, rgb(28 25 23 / 0.08) 50%, rgb(28 25 23 / 0.05))",
    "two nested translucent arms": "color-mix(in srgb, color-mix(in srgb, #1c1917 8%, transparent) 50%, color-mix(in srgb, #1c1917 5%, transparent))",
    "nested arm over an opaque arm": "color-mix(in srgb, color-mix(in srgb, #1c1917 8%, transparent) 50%, #ffffff)",
    "nested arms via var at t=0.5": "VAR",
    "registered <color> vars at t=0.5": "REG",
    "relative-colour arms": "color-mix(in srgb, rgb(from color-mix(in srgb, #1c1917 8%, transparent) r g b / alpha) 50%, rgb(from color-mix(in srgb, #1c1917 5%, transparent) r g b / alpha))",
    "one nested arm over transparent": "color-mix(in srgb, color-mix(in srgb, #1c1917 8%, transparent) 50%, transparent)",
    "two nested arms in oklab": "color-mix(in oklab, color-mix(in srgb, #1c1917 8%, transparent) 50%, color-mix(in srgb, #1c1917 5%, transparent))",
};
const browser = await webkit.launch();
const out = {};
try {
    for (const [name, value] of Object.entries(forms)) {
        const context = await browser.newContext();
        try {
            const page = await context.newPage();
            let crashed = false;
            page.on("crash", () => (crashed = true));
            await page.setContent("<div id=d style='width:100px;height:40px'></div>");
            try {
                const css = value === "REG"
                    ? "@property --ra{syntax:'<color>';inherits:true;initial-value:transparent}@property --rb{syntax:'<color>';inherits:true;initial-value:transparent}#d{border:1.5px solid;--ra:color-mix(in srgb,#1c1917 8%,transparent);--rb:color-mix(in srgb,#1c1917 5%,transparent);--t:0.5;border-color:color-mix(in srgb,var(--ra) calc(var(--t)*100%),var(--rb))}"
                    : value === "VAR"
                    ? "#d{border:1.5px solid;--a:color-mix(in srgb,#1c1917 8%,transparent);--b:color-mix(in srgb,#1c1917 5%,transparent);--t:0.5;border-color:color-mix(in srgb,var(--a) calc(var(--t)*100%),var(--b))}"
                    : `#d{border:1.5px solid ${value}}`;
                await page.addStyleTag({ content: css });
                await page.waitForTimeout(300);
                const c = await page.evaluate(() => getComputedStyle(document.getElementById("d")).borderTopColor);
                out[name] = { crashed, color: c };
            } catch (e) {
                out[name] = { crashed: true, error: String(e).slice(0, 120) };
            }
        } finally {
            await context.close().catch(() => {});
        }
    }
} finally {
    await browser.close();
}
console.log(browser.version?.() ?? "", JSON.stringify(out, null, 1));

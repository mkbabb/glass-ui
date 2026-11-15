// Which ways of reading --glass-border-floating as a relative colour survive Playwright
// WebKit, and what each computes. One browser, a fresh context per form; each form sets a
// border colour on a plain div and reads it back.
//   node forms-probe.mjs <chromium|webkit> [executablePath]
import { chromium, webkit } from "playwright";
const FG = "#1c1917";
const MIX = (p) => `color-mix(in srgb,${FG} ${p},transparent)`;
const REL = (c) => `rgb(from ${c} r g b / alpha)`;
const forms = {
    // O-227's crash, kept as the control.
    "two nested translucent arms": `#d{border-color:color-mix(in srgb,${MIX("8%")} 50%,${MIX("5%")})}`,
    // The relative colour of the token alone: it should be the token's own colour.
    "relative of a token mix": `#d{border-color:${REL(MIX("5%"))}}`,
    // The live dock: the dock token's mix over the floating token read as a relative colour.
    "token mix over a relative of a token mix": `#d{border-color:color-mix(in srgb,${MIX("8%")} 50%,${REL(MIX("5%"))})}`,
    // A held or static dock: both ends the floating token read as a relative colour.
    "two relatives of a token mix": `#d{border-color:color-mix(in srgb,${REL(MIX("5%"))} 50%,${REL(MIX("5%"))})}`,
    // The same through var(), as the dock writes it, with a host's preset-style token.
    "via var: host mix in both tokens": `#d{--fg:${FG};--dock:color-mix(in srgb,var(--fg) 55%,transparent);--float:color-mix(in srgb,var(--fg) 30%,transparent);--t:0.5;border-color:color-mix(in srgb,var(--dock) calc(var(--t)*100%),rgb(from var(--float) r g b / alpha))}`,
    "via var: host mix, held": `#d{--fg:${FG};--float:color-mix(in srgb,var(--fg) 30%,transparent);--t:0.5;border-color:color-mix(in srgb,rgb(from var(--float) r g b / alpha) calc(var(--t)*100%),rgb(from var(--float) r g b / alpha))}`,
    "via var: host literal": `#d{--float:rgb(200 0 0 / 0.5);--dock:color-mix(in srgb,${FG} 8%,transparent);--t:0;border-color:color-mix(in srgb,var(--dock) calc(var(--t)*100%),rgb(from var(--float) r g b / alpha))}`,
};
const [engine, exe] = process.argv.slice(2);
const type = engine === "webkit" ? webkit : chromium;
const browser = await type.launch(exe ? { executablePath: exe } : {});
const out = {};
try {
    for (const [name, css] of Object.entries(forms)) {
        const context = await browser.newContext();
        try {
            const page = await context.newPage();
            let crashed = false;
            page.on("crash", () => (crashed = true));
            await page.setContent("<style>#d{width:100px;height:40px;border:1.5px solid red}</style><div id=d></div>");
            try {
                await page.addStyleTag({ content: css });
                await page.waitForTimeout(300);
                const c = await page.evaluate(() => getComputedStyle(document.getElementById("d")).borderTopColor);
                out[name] = { crashed, color: c };
            } catch (e) {
                out[name] = { crashed: true, error: String(e).slice(0, 100) };
            }
        } finally {
            await context.close().catch(() => {});
        }
    }
} finally {
    await browser.close();
}
console.log(engine, exe ?? "", JSON.stringify(out, null, 1));

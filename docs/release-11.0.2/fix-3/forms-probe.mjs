// Which ways of reading --glass-border-dock as the dock edge's expanded end survive
// Playwright WebKit. One browser, a fresh context per form; each form sets a border
// colour on a plain div and reads it back.
//   node forms-probe.mjs <chromium|webkit> [executablePath]
import { chromium, webkit } from "playwright";
const FG = "#1c1917";
const forms = {
    // O-227's crash, kept as the control.
    "two nested translucent arms": `#d{border-color:color-mix(in srgb,color-mix(in srgb,${FG} 8%,transparent) 50%,color-mix(in srgb,${FG} 5%,transparent))}`,
    // The token as one arm, the collapsed end as a relative colour of the opaque ink.
    "nested arm over a relative-colour arm": `#d{border-color:color-mix(in srgb,color-mix(in srgb,${FG} 8%,transparent) 50%,rgb(from ${FG} r g b / 5%))}`,
    "two relative-colour arms of an opaque ink": `#d{border-color:color-mix(in srgb,rgb(from ${FG} r g b / 8%) 50%,rgb(from ${FG} r g b / 5%))}`,
    // The same through var(), as the dock writes it.
    "via var: token mix over relative ink": `#d{--fg:${FG};--tok:color-mix(in srgb,var(--fg) 8%,transparent);--c:5%;--t:0.5;border-color:color-mix(in srgb,var(--tok) calc(var(--t)*100%),rgb(from var(--fg) r g b / var(--c)))}`,
    "via var: relative token over relative ink": `#d{--fg:${FG};--tok:rgb(from var(--fg) r g b / 8%);--c:5%;--t:0.5;border-color:color-mix(in srgb,var(--tok) calc(var(--t)*100%),rgb(from var(--fg) r g b / var(--c)))}`,
    // One arm only: the token scaled toward transparent by a typed ratio.
    "token over transparent, typed ratio": `#d{--fg:${FG};--tok:color-mix(in srgb,var(--fg) 8%,transparent);--s:6.5%;--g:8%;border-color:color-mix(in srgb,var(--tok) calc(var(--s) / var(--g) * 100%),transparent)}`,
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

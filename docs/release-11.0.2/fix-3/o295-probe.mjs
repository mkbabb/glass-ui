// Fix seat 3, O-295: the pager's neck through hops of 1, 3 and 7 on eight dots, with the
// library's rem token and with a host's px size on the component. For each hop, the
// widest painted neck against the hop's distance plus one dot. One browser, a context per
// size, closed in finally.
//   node o295-probe.mjs <base-url> <chromium|webkit>
import { chromium, webkit } from "playwright";

const [base, engine = "chromium"] = process.argv.slice(2);
const browser = await (engine === "webkit" ? webkit : chromium).launch();
const out = {};
try {
    for (const size of ["", "10px", "16px"]) {
        const context = await browser.newContext({ viewport: { width: 900, height: 400 } });
        try {
            const page = await context.newPage();
            await page.goto(`${base}/tests-visual/release-11-0-2/pager-harness.html?count=8${size ? `&size=${size}` : ""}`);
            await page.locator("body[data-ready='1'] [data-witness='pager'] .goo-body").first().waitFor();
            await page.waitForTimeout(400);
            const geo = await page.evaluate(() => {
                const dots = [...document.querySelectorAll("[data-witness='pager'] .goo-dot")];
                const body = document.querySelector("[data-witness='pager'] .goo-body");
                return {
                    pitch: dots[1].getBoundingClientRect().left - dots[0].getBoundingClientRect().left,
                    dot: body.offsetWidth,
                    token: getComputedStyle(body).getPropertyValue("--pager-dot-size").trim(),
                };
            });
            const hops = [];
            let from = 0;
            for (const to of [1, 4, 7, 0]) {
                const widths = await page.evaluate(
                    (to) =>
                        new Promise((resolve) => {
                            const neck = document.querySelector("[data-witness='pager'] .goo-neck");
                            const w = [];
                            const t0 = performance.now();
                            const tick = () => {
                                if (getComputedStyle(neck).opacity !== "0") w.push(neck.getBoundingClientRect().width);
                                if (performance.now() - t0 < 900) requestAnimationFrame(tick);
                                else resolve(w);
                            };
                            window.__go(to);
                            requestAnimationFrame(tick);
                        }),
                    to,
                );
                const widest = widths.length ? Math.max(...widths) : 0;
                const bound = Math.abs(to - from) * geo.pitch + geo.dot;
                hops.push({ hop: Math.abs(to - from), from, to, frames: widths.length, widest: +widest.toFixed(1), bound: +bound.toFixed(1), over: +(widest - bound).toFixed(1) });
                from = to;
            }
            out[size || "library token"] = { geo, hops };
        } finally {
            await context.close();
        }
    }
} finally {
    await browser.close();
}
console.log(engine, JSON.stringify(out, null, 1));

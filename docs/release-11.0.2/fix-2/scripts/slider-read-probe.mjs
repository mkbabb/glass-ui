// Fix seat 2: reads the scrubber thumb's luminance against the fill and the track beside
// it (Rec. 709 luma, 0 to 255) on the geometry harness, for candidate paints injected as a
// style tag. One browser, one context per theme and candidate, closed in finally.
//   node slider-read-probe.mjs <base-url> <chromium|webkit>
import { chromium, webkit } from "playwright";

const [base, engine = "chromium"] = process.argv.slice(2);
const candidates = {
    branch: "",
    "thumb-background": ".slider-thumb{background:var(--slider-thumb-bg,var(--background))}",
    "thumb-foreground": ".slider-thumb{background:var(--slider-thumb-bg,var(--foreground))}",
    "thumb-bg+track-ink":
        ".slider-thumb{background:var(--slider-thumb-bg,var(--background))} .glass-slider:not([data-variant=spectrum]) .slider-track{background:var(--glass-slider-track-background,color-mix(in oklab,currentColor 16%,oklch(0 0 0/0)))}",
    "thumb-fg+track-ink":
        ".slider-thumb{background:var(--slider-thumb-bg,var(--foreground))} .glass-slider:not([data-variant=spectrum]) .slider-track{background:var(--glass-slider-track-background,color-mix(in oklab,currentColor 16%,oklch(0 0 0/0)))}",
};
const only = process.env.ONLY?.split(",");
const browser = await (engine === "webkit" ? webkit : chromium).launch();
try {
    for (const [name, css] of Object.entries(candidates)) {
        if (only && !only.includes(name)) continue;
        for (const theme of ["light", "dark"]) {
            for (const ink of ["default", "violet"]) {
                const context = await browser.newContext({ viewport: { width: 1280, height: 900 }, deviceScaleFactor: 1 });
                try {
                    const page = await context.newPage();
                    const rows = [];
                    for (const value of [0, 50, 100]) {
                        await page.goto(`${base}/tests-visual/release-11-0-2/geometry-harness.html?value=${value}&theme=${theme}`);
                        await page.locator("body[data-ready='1'] [data-cell] .slider-thumb").first().waitFor();
                        if (css) await page.addStyleTag({ content: css });
                        if (ink === "violet")
                            await page.addStyleTag({ content: ".glass-slider{--slider-range-bg:oklch(0.55 0.22 300)}" });
                        await page.waitForTimeout(250);
                        for (const size of ["sm", "md", "lg"]) {
                            const root = page.locator(`[data-cell="scrubber-${size}-horizontal"]`);
                            const g = await root.evaluate((r) => {
                                const t = r.querySelector(".slider-track").getBoundingClientRect();
                                const b = r.querySelector(".slider-thumb").getBoundingClientRect();
                                return { t: { x: t.x, y: t.y, w: t.width, h: t.height }, b: { x: b.x, w: b.width } };
                            });
                            const png = await page.screenshot({ clip: { x: g.t.x, y: g.t.y, width: g.t.w, height: g.t.h }, animations: "disabled" });
                            const lum = await page.evaluate(
                                async ([b64, g]) => {
                                    const bmp = await createImageBitmap(await (await fetch(`data:image/png;base64,${b64}`)).blob());
                                    const c = new OffscreenCanvas(bmp.width, bmp.height);
                                    const x = c.getContext("2d");
                                    x.drawImage(bmp, 0, 0);
                                    const d = x.getImageData(0, 0, bmp.width, bmp.height).data;
                                    const s = bmp.width / g.t.w;
                                    const H = g.t.h;
                                    const box = (cx, half) => {
                                        let sum = 0, n = 0;
                                        for (let yy = Math.round((H / 2 - half) * s); yy < Math.round((H / 2 + half) * s); yy++)
                                            for (let xx = Math.round((cx - half) * s); xx < Math.round((cx + half) * s); xx++) {
                                                const i = (yy * bmp.width + xx) * 4;
                                                sum += 0.2126 * d[i] + 0.7152 * d[i + 1] + 0.0722 * d[i + 2];
                                                n++;
                                            }
                                        return n ? sum / n : null;
                                    };
                                    const half = Math.max(1, H / 5);
                                    const bl = g.b.x - g.t.x, br = bl + g.b.w;
                                    return {
                                        thumb: box(bl + g.b.w / 2, half),
                                        fill: bl > H ? box(bl / 2, half) : null,
                                        track: g.t.w - br > H ? box((br + g.t.w) / 2, half) : null,
                                    };
                                },
                                [png.toString("base64"), g],
                            );
                            const r = (v) => (v == null ? null : Math.round(v * 10) / 10);
                            rows.push({
                                value, size,
                                thumb: r(lum.thumb), fill: r(lum.fill), track: r(lum.track),
                                dFill: lum.fill == null ? null : r(Math.abs(lum.thumb - lum.fill)),
                                dTrack: lum.track == null ? null : r(Math.abs(lum.thumb - lum.track)),
                            });
                        }
                    }
                    const minFill = Math.min(...rows.filter((x) => x.dFill != null).map((x) => x.dFill));
                    const minTrack = Math.min(...rows.filter((x) => x.dTrack != null).map((x) => x.dTrack));
                    console.log(JSON.stringify({ engine, name, theme, ink, minFill, minTrack, pass: minFill >= 60 && minTrack >= 30, rows }));
                } finally {
                    await context.close();
                }
            }
        }
    }
} finally {
    await browser.close();
}

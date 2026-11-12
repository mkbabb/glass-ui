// glass-ui 10.1.5 fix round 7: reads only, to locate M4 (a layered run's mount snap) and O-167 (2) (the
// thumb's drag lag) before the cure. Harness `release-10-1-5/critic-7.html`. Rows print to stdout.
import { test } from "@playwright/test";

async function open(page: import("@playwright/test").Page, q: string): Promise<void> {
    await page.goto(`/tests-visual/release-10-1-5/critic-7.html?${q}`);
    await page.waitForFunction(() => (window as unknown as { __ready?: boolean }).__ready);
    await page.evaluate(() => document.fonts.ready);
}

test("p-m4 layered mount", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 800 });
    await page.addInitScript(() => {
        const desc = Object.getOwnPropertyDescriptor(Element.prototype, "scrollLeft")!;
        const log: string[] = [];
        (window as unknown as { __sl: string[] }).__sl = log;
        Object.defineProperty(Element.prototype, "scrollLeft", {
            get() {
                return desc.get!.call(this);
            },
            set(v: number) {
                if ((this as Element).classList?.contains("dock-run")) log.push(`set ${v} ${new Error().stack?.split("\n").slice(2, 5).join(" | ")}`);
                desc.set!.call(this, v);
            },
        });
        const st = Element.prototype.scrollTo;
        Element.prototype.scrollTo = function (...a: unknown[]) {
            if (this.classList?.contains("dock-run")) log.push(`scrollTo ${JSON.stringify(a)} ${new Error().stack?.split("\n").slice(2, 5).join(" | ")}`);
            return (st as (...x: unknown[]) => void).apply(this, a);
        };
    });
    await open(page, "scene=layers&maxw=260");
    const rows = await page.evaluate(
        () =>
            new Promise<unknown[]>((res) => {
                const out: unknown[] = [];
                let n = 0;
                const step = () => {
                    const run = document.querySelector<HTMLElement>(".dock-run")!;
                    const s1 = document.querySelector<HTMLElement>('[data-witness="S1"]')!;
                    const g = run.firstElementChild as HTMLElement;
                    out.push({ n, sl: run.scrollLeft, sw: run.scrollWidth, cw: run.clientWidth, s1: s1.offsetLeft, gx: g.offsetLeft, gsnap: getComputedStyle(g).scrollSnapAlign, sp: getComputedStyle(run).scrollPaddingInlineStart, fits: run.closest(".glass-dock")!.hasAttribute("data-run-fits") });
                    if (++n < 40) requestAnimationFrame(step);
                    else res(out);
                };
                step();
            }),
    );
    console.log("M4", JSON.stringify(rows.filter((r, i) => i < 3 || i % 8 === 0 || i === rows.length - 1)));
    console.log("M4 writes", JSON.stringify(await page.evaluate(() => (window as unknown as { __sl: string[] }).__sl)));
    const snapKids = await page.evaluate(() => {
        const run = document.querySelector<HTMLElement>(".dock-run")!;
        return [...run.querySelectorAll<HTMLElement>("*")]
            .filter((e) => getComputedStyle(e).scrollSnapAlign !== "none")
            .map((e) => `${String(e.className).slice(0, 50)} ${getComputedStyle(e).scrollSnapAlign} x=${e.getBoundingClientRect().left - run.getBoundingClientRect().left}`);
    });
    console.log("M4 snap areas", JSON.stringify(snapKids));
});

test("p-o167 drag lag", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 800 });
    await open(page, "scene=dock&backdrop=static&collapse=false&step=1&kinds=" + encodeURIComponent("tab:Home,sep,slider,icon,dmt"));
    await page.mouse.move(2, 790);
    await page.waitForTimeout(600);
    const th = (await page.locator(".slider-thumb").boundingBox())!;
    let x = th.x + th.width / 2;
    const y = th.y + th.height / 2;
    await page.mouse.move(x, y);
    await page.mouse.down();
    const rows: unknown[] = [];
    for (let i = 0; i < 8; i += 1) {
        x += 4;
        await page.mouse.move(x, y);
        const r = await page.evaluate(() => {
            const t = document.querySelector<HTMLElement>(".slider-thumb")!.getBoundingClientRect();
            return { c: t.left + t.width / 2, w: t.width, v: document.querySelector(".slider-thumb")!.getAttribute("aria-valuenow") };
        });
        rows.push({ x, ...r, d: +(x - r.c).toFixed(2) });
    }
    await page.mouse.up();
    console.log("O167", JSON.stringify(rows));
});

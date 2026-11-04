// glass-ui 10.1.5 — critic round 1, probe b: a keyboard-focused seat under a resting
// pointer (the ring and the hover scale at once), against the run's clip box; and a
// seat at each end of the run. Reads the painted ring from the computed box-shadow.
import { test, type Page } from "@playwright/test";
import { mkdirSync, writeFileSync } from "node:fs";

const OUT = new URL("../docs/release-10.1.5/critic-1/", import.meta.url).pathname;

function bank(name: string, rows: unknown): void {
    const dir = `${OUT}${test.info().project.name}/`;
    mkdirSync(dir, { recursive: true });
    writeFileSync(`${dir}${name}.json`, JSON.stringify(rows, null, 1));
}

async function settle(page: Page, ms = 500): Promise<void> {
    await page.evaluate(() => new Promise<void>((r) => requestAnimationFrame(() => requestAnimationFrame(() => r()))));
    await page.waitForTimeout(ms);
}

function readRing(page: Page, label: string, tag: string) {
    return page.evaluate(
        ([label, tag]) => {
            const el = document.querySelector<HTMLElement>(`.glass-dock [aria-label="${label}"]`)!;
            const run = el.closest<HTMLElement>(".dock-run")!;
            const s = getComputedStyle(el);
            // the outermost spread in the computed box-shadow list
            const spreads = [...s.boxShadow.matchAll(/(-?[\d.]+)px (-?[\d.]+)px (-?[\d.]+)px (-?[\d.]+)px/g)].map((m) => Number(m[4]));
            const spread = Math.max(0, ...spreads);
            const sc = s.scale === "none" ? 1 : Number.parseFloat(s.scale);
            const r = el.getBoundingClientRect();
            const rr = run.getBoundingClientRect();
            const ink = spread * sc;
            return {
                tag,
                label,
                focusVisible: el.matches(":focus-visible"),
                hover: el.matches(":hover"),
                scale: s.scale,
                boxShadow: s.boxShadow,
                spread,
                clear: {
                    l: +(r.left - ink - rr.left).toFixed(2),
                    r: +(rr.right - r.right - ink).toFixed(2),
                    t: +(r.top - ink - rr.top).toFixed(2),
                    b: +(rr.bottom - r.bottom - ink).toFixed(2),
                },
                run: { sw: run.scrollWidth, cw: run.clientWidth, sh: run.scrollHeight, ch: run.clientHeight },
            };
        },
        [label, tag] as const,
    );
}

test("focused seat under the pointer: the ring against the run's clip", async ({ page }) => {
    const rows: unknown[] = [];
    for (const width of [390, 1280]) {
        await page.setViewportSize({ width, height: 800 });
        await page.goto("/tests-visual/release-10-1-5/critic-1.html?scene=dock");
        await page.waitForFunction(() => (window as unknown as { __ready?: boolean }).__ready);
        await settle(page, 700);
        for (const label of ["Seat 1", "Seat 3"]) {
            // keyboard focus: a key press then focus() keeps :focus-visible
            await page.keyboard.press("Shift");
            await page.locator(`.glass-dock [aria-label="${label}"]`).focus();
            await page.mouse.move(2, 2);
            await settle(page);
            rows.push({ width, ...(await readRing(page, label, "focus, pointer off")) });
            await page.locator(`.glass-dock [aria-label="${label}"]`).hover();
            await settle(page);
            rows.push({ width, ...(await readRing(page, label, "focus + pointer on it")) });
            await page.mouse.move(2, 2);
        }
    }
    bank("ring-focus-hover", rows);
});

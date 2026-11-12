// glass-ui 10.1.5 — critic round 1, probe c: the Slider's value marks against the new
// inscribed thumb and the lane-offset fill. Reads the painted dot (the mark's ::before).
import { test } from "@playwright/test";
import { mkdirSync, writeFileSync } from "node:fs";

const OUT = new URL("../docs/release-10.1.5/critic-1/", import.meta.url).pathname;

test("slider marks vs the thumb and the fill end", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await page.goto("/tests-visual/release-10-1-5/critic-1.html?scene=marks");
    await page.waitForFunction(() => (window as unknown as { __ready?: boolean }).__ready);
    await page.waitForTimeout(700);
    const rows = await page.evaluate(() =>
        [...document.querySelectorAll<HTMLElement>("[data-witness]")].map((row) => {
            const t = row.querySelector(".slider-thumb")!.getBoundingClientRect();
            const f = row.querySelector(".slider-range")!.getBoundingClientRect();
            const k = row.querySelector(".slider-track")!.getBoundingClientRect();
            const marks = [...row.querySelectorAll<HTMLElement>(".glass-value-mark")].map((m) => {
                const r = m.getBoundingClientRect();
                const b = getComputedStyle(m, "::before");
                return { lineX: +r.left.toFixed(2), dotW: b.width, pos: m.style.getPropertyValue("--value-mark-position") };
            });
            return {
                id: row.dataset.witness,
                value: row.querySelector(".slider-thumb")!.getAttribute("aria-valuenow"),
                track: [k.left, k.right],
                thumbCenter: +((t.left + t.right) / 2).toFixed(2),
                fillEnd: +f.right.toFixed(2),
                marks,
            };
        }),
    );
    const dir = `${OUT}${test.info().project.name}/`;
    mkdirSync(dir, { recursive: true });
    writeFileSync(`${dir}slider-marks.json`, JSON.stringify(rows, null, 1));
});

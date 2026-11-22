// Fix seat 11, the witness for row A's tap rule at the boundary it failed on.
// The sheet harness opens its detented Sheet to the 0.9 rung by touch and lets it rest. Taps
// then land at the close button's centre and at small distances outside its box, below and
// to the right, at its own height and width. Each press is recorded as the cell records it
// (its target and the element at its point, on the button or not, and its point's distance
// from the button's box) and judged by both forms of the cell's rule:
//   before (aed2570f8): on time = hit || !down || Math.round(off) === 0
//   branch (72e14afe8): on time = hit || !down || !(off > 0)
// A press the rule calls on time that misses the button fails the cell ("the tap hits the
// button, twenty in twenty"); a press it calls late is taken again. At rest nothing moves, so
// the boundary is placed by hand rather than met by chance, as it was at open plus 126 ms.
import { expect, test, type Page } from "@playwright/test";

const SHEET_HARNESS = "/tests-visual/release-11-1-1/sheet-harness.html";
const SHEET = '[data-testid="s-content"]';
const CLOSE = `${SHEET} [data-slot="dialog-close"]`;
const OFFSETS = [0, 0.1, 0.2, 0.3, 0.4, 0.45, 0.7, 1, 3];

type Heard = { type: string; target: boolean; point: boolean; off: number };
type Press = { side: string; d: number; x: number; y: number; heard: Heard[]; closed: boolean };

async function openRested(page: Page): Promise<void> {
    await page.goto(SHEET_HARNESS);
    await page.locator("body[data-ready='1']").waitFor({ state: "attached" });
    await page.waitForTimeout(300);
    const t = (await page.locator('[data-testid="s-open"]').boundingBox())!;
    await page.touchscreen.tap(t.x + t.width / 2, t.y + t.height / 2);
    await page.locator(`${SHEET}[data-state="open"]`).waitFor();
    await page.waitForTimeout(1500);
}

async function readPresses(page: Page): Promise<Press[]> {
    await page.setViewportSize({ width: 430, height: 932 });
    await openRested(page);
    const presses: Press[] = [];
    for (const side of ["below", "right"])
        for (const d of OFFSETS) {
            if (d === 0 && side === "right") continue;
            const b = (await page.locator(CLOSE).boundingBox())!;
            const x = side === "right" && d ? b.x + b.width + d : b.x + b.width / 2;
            const y = side === "below" && d ? b.y + b.height + d : b.y + b.height / 2;
            await page.evaluate((close) => {
                const w = window as unknown as { __heard: Heard[]; __off: () => void };
                w.__heard = [];
                const onButton = (n: unknown) => n instanceof Element && !!n.closest(close);
                const on = (e: Event) => {
                    const { clientX, clientY } = e as MouseEvent;
                    const r = document.querySelector(close)!.getBoundingClientRect();
                    const off = Math.hypot(
                        Math.max(0, r.left - clientX, clientX - r.right),
                        Math.max(0, r.top - clientY, clientY - r.bottom),
                    );
                    w.__heard.push({
                        type: e.type,
                        target: onButton(e.target),
                        point: onButton(document.elementFromPoint(clientX, clientY)),
                        off,
                    });
                };
                for (const type of ["pointerdown", "click"]) addEventListener(type, on, { capture: true });
                w.__off = () => {
                    for (const type of ["pointerdown", "click"]) removeEventListener(type, on, { capture: true });
                };
            }, CLOSE);
            await page.touchscreen.tap(x, y);
            await page.waitForTimeout(500);
            const heard = await page.evaluate(() => {
                const w = window as unknown as { __heard: Heard[]; __off: () => void };
                w.__off();
                return w.__heard;
            });
            const closed = (await page.locator(`${SHEET}[data-state="open"]`).count()) === 0;
            presses.push({ side, d, x, y, heard, closed });
            if (closed) await openRested(page);
        }
    return presses;
}

function judge(presses: Press[], onTimeBy: (off: number) => boolean) {
    return presses.map((p) => {
        const hit = p.heard.some((e) => e.type === "click") && p.heard.every((e) => e.target);
        const down = p.heard.find((e) => e.type === "pointerdown");
        const onTime = hit || !down || onTimeBy(down.off);
        return {
            side: p.side,
            d: p.d,
            off: down ? +down.off.toFixed(4) : null,
            events: p.heard.map((e) => `${e.type}:${+e.target}${+e.point}:${Math.round(e.off)}px`).join(" "),
            hit,
            closed: p.closed,
            onTime,
            aimedMiss: onTime && !hit,
        };
    });
}

for (const [name, onTimeBy] of [
    ["before (aed2570f8): Math.round(off) === 0", (off: number) => Math.round(off) === 0],
    ["branch (72e14afe8): !(off > 0)", (off: number) => !(off > 0)],
] as const)
    test(`boundary · the rule ${name} takes a press outside the button as late`, async ({ page }, info) => {
        test.skip(!info.project.name.endsWith("-phone"), "the phone form's, by touch");
        test.setTimeout(120_000);
        const read = judge(await readPresses(page), onTimeBy);
        await info.attach("presses", { body: JSON.stringify(read), contentType: "application/json" });
        const at = JSON.stringify(read);
        const centre = read.find((r) => r.d === 0)!;
        expect(centre.hit && centre.closed && centre.onTime, `a press at the centre hits and closes ${at}`).toBe(true);
        expect(
            read.filter((r) => r.off !== null && r.off > 0 && r.off < 0.5).length,
            `some press lands outside the box by less than half a pixel ${at}`,
        ).toBeGreaterThan(0);
        expect(
            read.filter((r) => r.aimedMiss).length,
            `no press the rule calls on time misses the button ${at}`,
        ).toBe(0);
    });

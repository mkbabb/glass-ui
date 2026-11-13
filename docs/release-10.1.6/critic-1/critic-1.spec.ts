// 10.1.6 critic 1. Three passes over the harness, each recorded to CRITIC_OUT:
//   forced · <slider row>   forced colors on, one Tab onto the thumb; the row's pixels with
//                           and without focus are diffed, and the changed pixels OUTSIDE the
//                           marked box (the track, or the spectrum thumb) are the ring.
//   plain · <slider row>    forced colors off, the same focus; every computed property of
//                           the root, track, range and thumbs, and the row's pixels, are
//                           written out for an offline compare between trees.
//   forced · control · <id> the other keyboard controls, the same diff, recorded only.
// The slider assertions are the GREEN criteria, so the v10.1.5 tree is expected RED.
import { createHash } from "node:crypto";
import { existsSync, readFileSync, writeFileSync } from "node:fs";

import { expect, test, type Page } from "@playwright/test";
import { PNG } from "pngjs";

const SLIDERS = [
    { id: "scrubber-h", target: ".slider-track" },
    { id: "invalid-h", target: ".slider-track" },
    { id: "spectrum-h", target: ".slider-thumb" },
    { id: "scrubber-v", target: ".slider-track" },
    { id: "invalid-v", target: ".slider-track" },
    { id: "spectrum-v", target: ".slider-thumb" },
    { id: "range-h", target: ".slider-track" },
] as const;
const CONTROLS = [
    "accordion-trigger",
    "tabs-pill",
    "tabs-underline",
    "dark-mode-toggle",
    "input",
    "button",
    "switch",
    "checkbox",
] as const;

// Each record is merged into CRITIC_OUT as it is made: a failed test restarts the worker,
// so module state does not survive to an afterAll.
function save(key: string, value: unknown): void {
    const f = process.env.CRITIC_OUT;
    if (!f) return;
    const all = existsSync(f) ? JSON.parse(readFileSync(f, "utf8")) : {};
    all[key] = value;
    writeFileSync(f, JSON.stringify(all, null, 1));
}

async function open(page: Page, forced: boolean): Promise<void> {
    page.on("pageerror", (e) => save(`pageerror:${Date.now()}`, String(e).slice(0, 400)));
    await page.emulateMedia({ forcedColors: forced ? "active" : "none" });
    await page.goto("/docs/release-10.1.6/critic-1/harness.html");
    await page.locator("body[data-ready='1']").waitFor({ state: "attached" });
    await page.locator('[data-row="scrubber-h"] .slider-thumb').waitFor({ state: "attached" });
    await page.locator('[data-row="checkbox"]').waitFor();
    await page.mouse.move(1, 1);
    await page.waitForTimeout(400);
}
async function clip(page: Page, row: string) {
    const loc = page.locator(`[data-row="${row}"]`);
    await loc.scrollIntoViewIfNeeded();
    const box = (await loc.boundingBox())!;
    const shot = await page.screenshot({ clip: box, animations: "disabled" });
    return { box, shot };
}
/** One Tab from the row's sentinel: a keyboard focus on the row's first stop. */
async function tabInto(page: Page, row: string, key = "Tab"): Promise<void> {
    await page.locator(`[data-pre="${row}"]`).focus();
    await page.keyboard.press(key);
    await page.waitForTimeout(400);
}
/** Changed pixels between two same-size PNGs, split by a target box in row coordinates. */
function diff(a: Buffer, b: Buffer, rowBox: { x: number; y: number }, target: { x: number; y: number; width: number; height: number } | null) {
    const A = PNG.sync.read(a), B = PNG.sync.read(b);
    let changed = 0, outside = 0;
    const ink = new Map<string, number>(), under = new Map<string, number>();
    const bump = (m: Map<string, number>, d: Buffer, i: number) => {
        const k = `${d[i]},${d[i + 1]},${d[i + 2]}`;
        m.set(k, (m.get(k) ?? 0) + 1);
    };
    const top = (m: Map<string, number>) => [...m.entries()].sort((p, q) => q[1] - p[1]).slice(0, 3);
    let x0 = A.width, y0 = A.height, x1 = -1, y1 = -1;
    if (A.width !== B.width || A.height !== B.height) return { changed: -1, outside: -1, bbox: null, w: A.width, h: A.height };
    for (let y = 0; y < A.height; y++)
        for (let x = 0; x < A.width; x++) {
            const i = (y * A.width + x) * 4;
            const d = Math.abs(A.data[i] - B.data[i]) + Math.abs(A.data[i + 1] - B.data[i + 1]) + Math.abs(A.data[i + 2] - B.data[i + 2]);
            if (d <= 24) continue;
            changed++;
            x0 = Math.min(x0, x); y0 = Math.min(y0, y); x1 = Math.max(x1, x); y1 = Math.max(y1, y);
            if (target) {
                const tx = target.x - rowBox.x, ty = target.y - rowBox.y;
                if (x < tx - 0.5 || x > tx + target.width + 0.5 || y < ty - 0.5 || y > ty + target.height + 0.5) {
                    outside++;
                    bump(under, A.data, i);
                    bump(ink, B.data, i);
                }
            }
        }
    // `ink` is the focused frame's colour at the changed pixels outside the box, `under` the
    // unfocused frame's colour at the same pixels: the ring against what it is drawn on.
    return { changed, outside, bbox: changed ? [x0, y0, x1, y1] : null, w: A.width, h: A.height, ink: top(ink), under: top(under) };
}

test.describe("10.1.6 critic 1", () => {
    for (const arm of SLIDERS) {
        test(`forced · ${arm.id} · a keyboard-focused Slider paints a mark outside its box`, async ({ page }) => {
            await open(page, true);
            const before = await clip(page, arm.id);
            await tabInto(page, arm.id);
            const after = await clip(page, arm.id);
            const r = await page.evaluate(
                ({ row, target }) => {
                    const q = (s: string) => document.querySelector(`[data-row="${row}"] ${s}`)!;
                    const thumb = q(".slider-thumb");
                    const o = (el: Element) => {
                        const cs = getComputedStyle(el);
                        return { style: cs.outlineStyle, width: cs.outlineWidth, offset: cs.outlineOffset, color: cs.outlineColor, shadow: cs.boxShadow };
                    };
                    const b = q(target).getBoundingClientRect();
                    return {
                        forced: matchMedia("(forced-colors: active)").matches,
                        activeIsThumb: document.activeElement === thumb,
                        focusVisible: thumb.matches(":focus-visible"),
                        orientation: q(".glass-slider").getAttribute("data-orientation"),
                        track: o(q(".slider-track")),
                        thumb: o(thumb),
                        target: { x: b.x, y: b.y, width: b.width, height: b.height },
                    };
                },
                { row: arm.id, target: arm.target },
            );
            const scale = PNG.sync.read(after.shot).width / after.box.width;
            const t = { x: r.target.x * scale, y: r.target.y * scale, width: r.target.width * scale, height: r.target.height * scale };
            const d = diff(before.shot, after.shot, { x: after.box.x * scale, y: after.box.y * scale }, t);
            save(`forced:${arm.id}`, { ...r, diff: d, scale });
            test.info().annotations.push({ type: "critic", description: JSON.stringify({ ...r, diff: d }) });
            expect(r.forced).toBe(true);
            expect(r.activeIsThumb).toBe(true);
            expect(r.focusVisible).toBe(true);
            // The ring: changed pixels outside the marked box.
            expect(d.outside).toBeGreaterThanOrEqual(40);
        });
    }

    for (const arm of SLIDERS) {
        test(`plain · ${arm.id} · the focused computed styles and pixels, recorded`, async ({ page }) => {
            await open(page, false);
            await tabInto(page, arm.id);
            const after = await clip(page, arm.id);
            const r = await page.evaluate((row) => {
                const root = document.querySelector(`[data-row="${row}"]`)!;
                const dump = (el: Element) => {
                    const cs = getComputedStyle(el);
                    const m: Record<string, string> = {};
                    for (let i = 0; i < cs.length; i++) m[cs[i]] = cs.getPropertyValue(cs[i]);
                    return m;
                };
                const els: Record<string, Record<string, string>> = {};
                root.querySelectorAll(".glass-slider, .slider-track, .slider-range, .slider-thumb").forEach((el, i) => {
                    els[`${i}:${(el.getAttribute("class") ?? "").split(" ")[0]}`] = dump(el);
                });
                return {
                    forced: matchMedia("(forced-colors: active)").matches,
                    focusVisible: root.querySelector(".slider-thumb")!.matches(":focus-visible"),
                    els,
                };
            }, arm.id);
            save(`plain:${arm.id}`, { ...r, png: createHash("sha256").update(after.shot).digest("hex") });
            expect(r.forced).toBe(false);
            expect(r.focusVisible).toBe(true);
        });
    }

    for (const id of CONTROLS) {
        test(`forced · control · ${id} · the focused diff, recorded`, async ({ page, browserName }) => {
            await open(page, true);
            const before = await clip(page, id);
            // WebKit's plain Tab skips buttons (the macOS keyboard-navigation default);
            // Option+Tab is its key for every control.
            await tabInto(page, id, browserName === "webkit" ? "Alt+Tab" : "Tab");
            const after = await clip(page, id);
            const r = await page.evaluate((row) => {
                const root = document.querySelector(`[data-row="${row}"]`)!;
                const a = document.activeElement!;
                const cs = getComputedStyle(a);
                return {
                    inRow: root.contains(a),
                    tag: a.tagName,
                    cls: (a.getAttribute("class") ?? "").slice(0, 80),
                    focusVisible: a.matches(":focus-visible"),
                    outline: { style: cs.outlineStyle, width: cs.outlineWidth, offset: cs.outlineOffset, color: cs.outlineColor },
                    shadow: cs.boxShadow,
                };
            }, id);
            const d = diff(before.shot, after.shot, { x: 0, y: 0 }, null);
            save(`control:${id}`, { ...r, diff: d });
            test.info().annotations.push({ type: "critic", description: JSON.stringify({ ...r, diff: d }) });
            expect(r.inRow).toBe(true);
        });
    }
});

// glass-ui 10.1.2 — the engine witnesses for the declared seat marker (atlas G-4, arm
// b-ii; INBOUND O-102d). Each drives `release-10-1-2/harness.html?scene=<name>` (the real
// components from `src/` under the demo's own cascade) and reads focus and attributes,
// never pixels, at 1440 and 390. Engines: the `chromium-headless-new` project, and the
// `webkit` project on Playwright WebKit 2287 (`webkit-2287.config.ts`, under
// `guarded --exclusive webkit`). RED on a 10.1.1 tree carrying this spec and harness
// except where a test says it is a regression arm, GREEN on 10.1.2.
import { expect, test, type Page } from "@playwright/test";

async function open(page: Page, scene: string): Promise<void> {
    await page.goto(`/tests-visual/release-10-1-2/harness.html?scene=${scene}`);
    await page.waitForFunction(() => (window as unknown as { __ready?: boolean }).__ready);
    await page.locator('[data-witness="seat-0"]').waitFor();
}

const active = (page: Page) =>
    page.evaluate(
        () =>
            document.activeElement?.getAttribute("data-witness") ??
            document.activeElement?.getAttribute("data-item") ??
            null,
    );

/**
 * Tab from the `before` stop to the `after` stop, recording each stop on the way. WebKit's
 * plain Tab skips buttons by default (Safari's "Press Tab to highlight each item" is off),
 * so there the walk presses Option-Tab, which is Safari's full sequential focus order.
 */
async function tabWalk(page: Page, browserName: string): Promise<(string | null)[]> {
    const key = browserName === "webkit" ? "Alt+Tab" : "Tab";
    await page.locator('[data-witness="before"]').focus();
    const walk: (string | null)[] = [];
    for (let i = 0; i < 16; i++) {
        await page.keyboard.press(key);
        const at = await active(page);
        walk.push(at);
        if (at === "after") break;
    }
    return walk;
}

const run = (page: Page) => page.locator(".dock-run");

for (const [label, viewport] of [
    ["1440", { width: 1440, height: 900 }],
    ["390", { width: 390, height: 844 }],
] as const) {
    test.describe(`10.1.2 · ${label}`, () => {
        test.use({ viewport });

        test("G-4 · the atlas shapes seated in a run are all Tab-reachable", async ({
            page,
            browserName,
        }) => {
            await open(page, "atlas");
            expect(await tabWalk(page, browserName)).toEqual([
                "seat-0",
                "filter",
                "gear",
                "handle",
                "year-from",
                "year-to",
                "dark",
                "after",
            ]);
        });

        test("G-4 · arrows rove only the declared seats; an undeclared control keeps its keys", async ({
            page,
        }) => {
            await open(page, "atlas");
            await page.locator('[data-witness="seat-0"]').focus();
            await page.keyboard.press("ArrowRight");
            expect(await active(page)).toBe("seat-9");
            await page.keyboard.press("ArrowLeft");
            expect(await active(page)).toBe("seat-0");
            for (const name of ["gear", "handle", "dark"]) {
                await page.locator(`[data-witness="${name}"]`).focus();
                await page.keyboard.press("ArrowRight");
                expect(await active(page), name).toBe(name);
            }
        });

        test("G-4 · a run with an undeclared child claims no toolbar role", async ({ page }) => {
            await open(page, "atlas");
            expect(await run(page).getAttribute("role")).toBeNull();
            expect(await run(page).getAttribute("aria-orientation")).toBeNull();
        });

        // RED on 10.1.1 (the splitter inferred a seat, -1, under a toolbar claim) and on
        // the first 10.1.2 cuts (any role=separator waived from the claim).
        test("G-4 · a focusable splitter is undeclared: its own stop, no toolbar role", async ({
            page,
            browserName,
        }) => {
            await open(page, "splitter");
            expect(await run(page).getAttribute("role")).toBeNull();
            expect(await tabWalk(page, browserName)).toEqual(["seat-0", "splitter", "after"]);
        });

        // Regression arm: green on 10.1.1 too, which claimed the role over every run.
        test("G-4 · an all-declared run is one toolbar stop with arrows across it", async ({
            page,
            browserName,
        }) => {
            await open(page, "declared");
            expect(await run(page).getAttribute("role")).toBe("toolbar");
            expect(await tabWalk(page, browserName)).toEqual(["seat-0", "after"]);
            await page.locator('[data-witness="seat-0"]').focus();
            await page.keyboard.press("ArrowRight");
            expect(await active(page)).toBe("seat-1");
            await page.keyboard.press("ArrowRight");
            expect(await active(page)).toBe("seat-2");
        });

        // RED on 10.1.1, which roved ArrowRight from seat-1 onto reka's hidden native
        // `<select>` (an inferred seat), and on the first three 10.1.2 cuts, which counted
        // that `<select>` as an undeclared child and claimed no role.
        test("G-4 · a DockTrigger for=select in a form keeps an all-declared run's toolbar", async ({
            page,
            browserName,
        }) => {
            await open(page, "form-select");
            expect(await page.locator('.dock-run > select[aria-hidden="true"]').count()).toBe(1);
            expect(await run(page).getAttribute("role")).toBe("toolbar");
            expect(await tabWalk(page, browserName)).toEqual(["seat-0", "after"]);
            await page.locator('[data-witness="seat-0"]').focus();
            await page.keyboard.press("ArrowRight");
            expect(await active(page)).toBe("seat-1");
            await page.keyboard.press("ArrowRight");
            expect(await active(page)).toBe("seat-3");
        });

        // The claim follows the form select's `aria-hidden` and `tabindex` changed in
        // place, both ways. RED on 10.1.1 (the role over every run) and on the fourth
        // 10.1.2 cut, which observed neither (critique-4 D-2).
        test("G-4 · the toolbar claim follows a child's aria-hidden and tabindex in place", async ({
            page,
        }) => {
            await open(page, "form-select");
            const native = page.locator('.dock-run > select[aria-hidden="true"]');
            const handle = await native.elementHandle();
            expect(await run(page).getAttribute("role")).toBe("toolbar");
            await handle!.evaluate((el) => {
                el.removeAttribute("aria-hidden");
                el.removeAttribute("tabindex");
            });
            await expect(run(page)).not.toHaveAttribute("role", "toolbar");
            await handle!.evaluate((el) => {
                el.setAttribute("aria-hidden", "true");
                el.setAttribute("tabindex", "-1");
            });
            await expect(run(page)).toHaveAttribute("role", "toolbar");
        });

        // RED on 10.1.1 (the role over every run) and on the fourth 10.1.2 cut, which
        // waived any `aria-hidden` child with a negative `tabIndex`, a wrapper included.
        test("G-4 · an aria-hidden wrapper around a Tab stop voids the toolbar claim", async ({
            page,
            browserName,
        }) => {
            await open(page, "hidden-wrapper");
            expect(await run(page).getAttribute("role")).toBeNull();
            expect(await tabWalk(page, browserName)).toEqual(["seat-0", "hid", "after"]);
        });

        // A seat that drops its marker while mounted gets back the tab stop the run took.
        // RED on 10.1.1 (an inferred seat, held at -1) and on the first 10.1.2 cut.
        test("G-4 · a child that drops its declaration is Tab-reachable again", async ({
            page,
            browserName,
        }) => {
            await open(page, "reactive");
            expect(await run(page).getAttribute("role")).toBe("toolbar");
            expect(await tabWalk(page, browserName)).toEqual(["seat-0", "after"]);
            await page.evaluate(() => (window as unknown as { __undeclare: () => void }).__undeclare());
            await expect(run(page)).not.toHaveAttribute("role", "toolbar");
            expect(await page.locator('[data-witness="middle"]').getAttribute("tabindex")).toBeNull();
            expect(await tabWalk(page, browserName)).toEqual(["seat-0", "middle", "after"]);
        });

        // Regression arm: green on 10.1.1 too (its held-control clause), kept because the
        // (b-ii) contract must hold it without that clause.
        test("G-4 · a RadioGroup and a ToggleGroup seated directly keep their arrows", async ({
            page,
        }) => {
            await open(page, "composites");
            for (const group of ["radio", "toggle"]) {
                await page.locator(`[data-item="${group}-x"]`).focus();
                await page.keyboard.press("ArrowRight");
                expect(await active(page), group).toBe(`${group}-y`);
            }
            await page.locator('[data-witness="seat-0"]').focus();
            await page.keyboard.press("ArrowRight");
            expect(await active(page)).toBe("seat-9");
        });
    });
}

// O-101 · DOCK-STALE-EXPANDED-ENDPOINT (value.js letter 2026-10-19; INBOUND O-101,
// O-101a). The scene's full pane is a breakpoint's (12 seats at >= 768px, 3 below), so a
// resize across 768px changes it. Every frame is sampled from just before the change.
// RED on 10.1.1, which latched the expanded endpoint only while expanded, so a morph
// reserved the old pane's span.
//
// Three sequences, each at 1440->390 and 390->1440:
// - `collapsed`: expand and collapse at the first width, change the pane while collapsed,
//   expand (`pin` expands it in the same render as the breakpoint, value.js's shape;
//   otherwise `__expand()` after the collapsed dock re-lays out). Witness:
//   `--dock-expanded-px` on the first morphing frame equals the settled size (+-1 px).
// - `reversal`: expand and collapse at the first width, then 60 ms into a collapse change
//   the pane and expand again.
// - `mid-expand`: collapsed at the first width, expand, and 60 ms in change the pane.
//   Witness for both: every morphing frame after the change reserves the settled size
//   (+-1 px), so the pane retargets the reserved box rather than leaving it.
// All three: no frame has the document scrolling on the morph axis.
//
// The horizontal dock reserves `inline-size`; the vertical one (`?axis=vertical`)
// reserves `block-size`. The vertical dock is capped at `--dock-max-block-size`, so a
// stale reservation there shows as the reserved size, not as document scroll.
interface Frame {
    morphing: boolean;
    changed: boolean;
    reserved: number;
    size: number;
    scroll: number;
    client: number;
}

type Axis = "horizontal" | "vertical";
type Sequence = "collapsed" | "pinned" | "reversal" | "mid-expand";

const viewport = (width: number) => ({ width, height: 844 });

async function driveStaleEndpoint(page: Page, axis: Axis, from: number, to: number, sequence: Sequence) {
    await page.setViewportSize(viewport(from));
    const pin = sequence === "pinned" ? (to < 768 ? "narrow" : "wide") : "";
    await page.goto(`/tests-visual/release-10-1-2/harness.html?scene=stale-endpoint&pin=${pin}&axis=${axis}`);
    await page.waitForFunction(() => (window as unknown as { __ready?: boolean }).__ready);
    const settled = (posture: "expanded" | "collapsed") =>
        page.waitForFunction(
            (p) => {
                const el = document.querySelector(".glass-dock");
                return !!el && el.classList.contains(p) && !el.hasAttribute("data-morphing");
            },
            posture,
        );
    const call = (name: string) =>
        page.evaluate((n) => (window as unknown as Record<string, () => void>)[n](), name);

    await settled("collapsed");
    if (sequence !== "mid-expand") {
        // Expand and collapse at the first width, so the endpoints are the first pane's.
        await call("__expand");
        await settled("expanded");
        await page.waitForTimeout(150);
        if (sequence !== "reversal") {
            await call("__collapse");
            await settled("collapsed");
            await page.waitForTimeout(150);
        }
    }

    await page.evaluate(
        ({ vertical, to }) => {
            const w = window as unknown as { __frames: Frame[]; __stop: boolean };
            w.__frames = [];
            w.__stop = false;
            const tick = () => {
                const el = document.querySelector<HTMLElement>(".glass-dock")!;
                const root = document.documentElement;
                w.__frames.push({
                    morphing: el.hasAttribute("data-morphing"),
                    changed: innerWidth === to,
                    reserved: Number.parseFloat(el.style.getPropertyValue("--dock-expanded-px")),
                    size: vertical ? el.offsetHeight : el.offsetWidth,
                    scroll: vertical ? root.scrollHeight : root.scrollWidth,
                    client: vertical ? root.clientHeight : root.clientWidth,
                });
                if (!w.__stop) requestAnimationFrame(tick);
            };
            requestAnimationFrame(tick);
        },
        { vertical: axis === "vertical", to },
    );

    if (sequence === "reversal") {
        await call("__collapse");
        await page.waitForTimeout(60);
        await page.setViewportSize(viewport(to));
        await call("__expand");
    } else if (sequence === "mid-expand") {
        await call("__expand");
        await page.waitForTimeout(60);
        await page.setViewportSize(viewport(to));
    } else {
        await page.setViewportSize(viewport(to));
        if (sequence === "collapsed") {
            await page.waitForTimeout(250);
            await expect(page.locator(".glass-dock")).toHaveClass(/collapsed/);
            await call("__expand");
        }
    }
    await page.waitForFunction(() =>
        (window as unknown as { __frames: Frame[] }).__frames.some((f) => f.morphing),
    );
    await settled("expanded");
    await page.waitForTimeout(200);
    await page.evaluate(() => ((window as unknown as { __stop: boolean }).__stop = true));
    return page.evaluate(() => (window as unknown as { __frames: Frame[] }).__frames);
}

for (const axis of ["horizontal", "vertical"] as const) {
    for (const [from, to] of [
        [1440, 390],
        [390, 1440],
    ] as const) {
        for (const sequence of ["pinned", "collapsed", "reversal", "mid-expand"] as const) {
            test(`O-101 · ${axis} · ${sequence} · the expanded endpoint follows the pane (${from}->${to})`, async ({
                page,
            }) => {
                const seq = await driveStaleEndpoint(page, axis, from, to, sequence);
                const rest = seq[seq.length - 1];
                expect(rest.morphing).toBe(false);
                if (sequence === "pinned" || sequence === "collapsed") {
                    const start = seq.find((f) => f.morphing)!;
                    expect.soft(
                        Math.abs(start.reserved - rest.size),
                        `reserved ${start.reserved}px at morph start, settled at ${rest.size}px`,
                    ).toBeLessThanOrEqual(1);
                } else {
                    expect(
                        seq.some((f) => f.morphing && f.changed),
                        "the pane changed while the morph ran",
                    ).toBe(true);
                    const stale = seq.filter(
                        (f) => f.morphing && f.changed && Math.abs(f.reserved - rest.size) > 1,
                    );
                    expect.soft(
                        stale.length,
                        `morphing frames after the change reserving other than the settled ${rest.size}px (${[...new Set(stale.map((f) => f.reserved))].join(", ")})`,
                    ).toBe(0);
                }
                const over = seq.filter((f) => f.scroll > f.client);
                expect
                    .soft(
                        over.length,
                        `frames with the document scrolling on the ${axis} axis, of ${seq.length} (max ${Math.max(0, ...over.map((f) => f.scroll))}, client ${rest.client})`,
                    )
                    .toBe(0);
            });
        }
    }
}

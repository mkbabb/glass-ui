// glass-ui 10.1.5 — the engine witnesses for value.js's served-app review of 10.1.4
// (INBOUND O-129 rows 1, 2, 5, 6 and 7). Each drives `release-10-1-5/harness.html?scene=…`
// (the real components from `src/` under the demo's own cascade) and reads layout and
// computed style, never pixels. Engines: the `chromium-headless-new` project, and the
// `webkit` project on Playwright WebKit 2287 (`webkit-2287.config.ts`, under `guarded
// --exclusive webkit`). The coarse cells emulate a touch phone (`hasTouch`, `isMobile`)
// in both engines and assert `(pointer: coarse)` matches before reading anything. RED on
// a v10.1.4 tree carrying this spec and harness, GREEN on 10.1.5.
//
//   g1  rest dock: one uniform corner = half the block extent; run scrollWidth = clientWidth,
//       pointer off and resting on the trailing seat (390, 844 coarse; desktop)
//   g2  collapsed plate: a circle; expanded (collapsible), each layer and input mode hold g1
//   g3  Slider thumb visible and one size at min, mid and max, inside the fill
//   g4  390 coarse: field type ≤ 16px, field ÷ pane subtitle ≤ 1.25
//   g5  DropdownMenuItem icon-to-label gap = `--icon-label-gap` = the dock trigger's gap
//
// Critique round 1 (docs/release-10.1.5/critique-1.md), RED on the round-0 branch
// (0162d71cf) and GREEN after the fix round:
//   c1  (D1) a value mark is the thumb's centre at that value; the loupe's value point too
//   c2  (D2) coarse: the `-sm` rung stays below the default for every non-field reader;
//       an sm field still floors at 16px
//   c3  (D3) the disabled scrubber dims its thumb with its fill
//   c4  (D4) a keyboard-focused seat under the pointer: its whole ring inside every clip
//
// Critique round 2 (critique-2.md), RED on the round-1 tip (65fdbd228), GREEN after:
//   e1  (E1) a label-wide tab under the pointer: no reach, the rest corner holds
//   e2  (E2) a focused, hovered tab seat, leading and trailing, horizontal and vertical:
//       its whole ring inside every clip
//   e3  (E3) beside both persistent regions: the run's clip and hit stop at their seats,
//       at rest and scrolled; the edge seats keep their ring
//   E4 is the vitest arm tests/styles/typed-track-seam.test.ts, read after a build
//
// Fix round 3 (the fix-2 WebKit e3 cell at coarse 390), RED on 3d811caba, GREEN after:
//   e4  a focused, hovered end seat: the run's end padding holds its whole ink plus the
//       1px whole-pixel scroll step, horizontal and vertical
import { expect, test, type Page } from "@playwright/test";

async function open(page: Page, query: string): Promise<void> {
    await page.goto(`/tests-visual/release-10-1-5/harness.html?${query}`);
    await page.waitForFunction(() => (window as unknown as { __ready?: boolean }).__ready);
    await page.evaluate(() => document.fonts.ready);
    await settle(page);
}

/** Let the mount, its first ResizeObserver deliveries and any spring settle. */
async function settle(page: Page, ms = 700): Promise<void> {
    await page.evaluate(
        () =>
            new Promise<void>((r) =>
                requestAnimationFrame(() => requestAnimationFrame(() => r())),
            ),
    );
    await page.waitForTimeout(ms);
}

interface PlateRead {
    cls: string;
    w: number;
    h: number;
    radii: string[];
    runs: { sw: number; cw: number; sh: number; ch: number; active: boolean }[];
}

function readPlate(page: Page): Promise<PlateRead> {
    return page.evaluate(() => {
        const dock = document.querySelector(".glass-dock")!;
        const plate = dock.querySelector<HTMLElement>(":scope > .dock-plate")!;
        const cs = getComputedStyle(plate);
        return {
            cls: dock.className,
            // Layout border box: the morph's `scale` never reaches it.
            w: plate.getBoundingClientRect().width,
            h: plate.getBoundingClientRect().height,
            radii: [
                cs.borderTopLeftRadius,
                cs.borderTopRightRadius,
                cs.borderBottomRightRadius,
                cs.borderBottomLeftRadius,
            ],
            runs: [...dock.querySelectorAll<HTMLElement>(".dock-run")].map((run) => ({
                sw: run.scrollWidth,
                cw: run.clientWidth,
                sh: run.scrollHeight,
                ch: run.clientHeight,
                active: run.classList.contains("is-active"),
            })),
        };
    });
}

/**
 * Every corner is ONE length (a single `<length>`, never a percentage or an elliptical
 * pair) equal to half the plate's block extent: a circle of the plate's own height.
 */
function expectRestCorner(read: PlateRead, cell: string): void {
    const half = read.h / 2;
    for (const r of read.radii) {
        expect(r, `${cell}: corner ${r} is one length (${JSON.stringify(read)})`).toMatch(
            /^-?[\d.]+px$/,
        );
        expect(
            Math.abs(Number.parseFloat(r) - half),
            `${cell}: corner ${r} = half the block extent ${half} (${JSON.stringify(read)})`,
        ).toBeLessThanOrEqual(0.5);
    }
}

/** The run that paints hides nothing: nothing to scroll on either axis. */
function expectNoReach(read: PlateRead, cell: string): void {
    const run = read.runs.find((r) => r.active)!;
    expect(run, `${cell}: an active run`).toBeTruthy();
    expect(run.sw, `${cell}: run scrollWidth = clientWidth (${JSON.stringify(run)})`).toBe(
        run.cw,
    );
    expect(run.sh, `${cell}: run scrollHeight = clientHeight (${JSON.stringify(run)})`).toBe(
        run.ch,
    );
}

async function pointerOff(page: Page): Promise<void> {
    await page.mouse.move(2, 2);
}

async function expectCoarse(page: Page): Promise<void> {
    expect(
        await page.evaluate(() => matchMedia("(pointer: coarse)").matches),
        "the engine emulates a coarse pointer",
    ).toBe(true);
}

/* ── g1 · the rest corner and the 2 px reach ─────────────────────────────────── */

function g1(width: number): void {
    test(`g1 rest dock at ${width}: one corner = half its height, nothing to scroll, pointer off and on the trailing seat`, async ({
        page,
    }) => {
        await page.setViewportSize({ width, height: 844 });
        await open(page, "scene=dock");
        if (test.info().project.use.isMobile) await expectCoarse(page);
        await pointerOff(page);
        await settle(page, 200);
        const rest = await readPlate(page);

        await page.locator('[data-witness="Seat 3"]').hover();
        await settle(page, 600);
        const hovered = await readPlate(page);
        // Reach first: the 2 px of hover ink is the trigger, the corner its symptom.
        expectNoReach(rest, `${width} rest`);
        expectNoReach(hovered, `${width} hover on the trailing seat`);
        expectRestCorner(rest, `${width} rest`);
        expect(
            await page
                .locator('[data-witness="Seat 3"]')
                .evaluate((el) => getComputedStyle(el).scale),
            "the trailing seat is hover-scaled",
        ).not.toBe("1");
        expectRestCorner(hovered, `${width} hover on the trailing seat`);
    });
}

test.describe("coarse phone", () => {
    test.use({ hasTouch: true, isMobile: true, viewport: { width: 390, height: 844 } });
    g1(390);
    g1(844);

    /* ── g4 · the coarse field type ──────────────────────────────────────────── */
    test("g4 at 390 coarse the field type is at most 16px and at most 1.25x the pane subtitle", async ({
        page,
    }) => {
        await open(page, "scene=type");
        await expectCoarse(page);
        const read = await page.evaluate(() => {
            const px = (sel: string) =>
                Number.parseFloat(getComputedStyle(document.querySelector(sel)!).fontSize);
            return {
                subtitle: px('[data-witness="subtitle"]'),
                bar: px('[data-witness="bar"] input'),
                pill: px('input[data-witness="pill"]'),
                // The picker family's row and trigger rung (Select, DropdownMenu).
                picker: (() => {
                    const el = document.createElement("span");
                    el.style.fontSize = "var(--dropdown-text)";
                    document.body.append(el);
                    const v = Number.parseFloat(getComputedStyle(el).fontSize);
                    el.remove();
                    return v;
                })(),
                barH: document.querySelector('[data-witness="bar"]')!.getBoundingClientRect()
                    .height,
            };
        });
        // The `.input-bar` seat and the picker rung keep the 16px no-zoom floor.
        expect(read.bar, `bar keeps the no-zoom floor (${JSON.stringify(read)})`).toBeGreaterThanOrEqual(16);
        expect(read.picker, `picker keeps the no-zoom floor (${JSON.stringify(read)})`).toBeGreaterThanOrEqual(16);
        for (const field of ["bar", "pill", "picker"] as const) {
            expect(read[field], `${field} type (${JSON.stringify(read)})`).toBeLessThanOrEqual(16);
            expect(
                read[field] / read.subtitle,
                `${field} ÷ subtitle (${JSON.stringify(read)})`,
            ).toBeLessThanOrEqual(1.25);
        }
        // The touch BOX keeps its comfort height: the floor moves type, not targets.
        expect(read.barH, "the bar keeps its coarse height").toBeGreaterThanOrEqual(44);
    });
});

g1(1280);

test("g1 an overflowing run at scroll 0: the leading cap rests at half the block extent, a length; the trailing cap is cut", async ({
    page,
}) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await open(page, "scene=dock&seats=12");
    await pointerOff(page);
    await settle(page, 200);
    const read = await readPlate(page);
    const run = read.runs.find((r) => r.active)!;
    expect(run.sw, `the run overflows (${JSON.stringify(read)})`).toBeGreaterThan(run.cw);
    const [tl, tr, br, bl] = read.radii;
    for (const r of [tl, bl]) {
        expect(r, `leading corner ${r} is one length (${JSON.stringify(read)})`).toMatch(/^[\d.]+px$/);
        expect(Math.abs(Number.parseFloat(r) - read.h / 2), `leading ${r} = h/2`).toBeLessThanOrEqual(0.5);
    }
    for (const r of [tr, br]) {
        expect(Number.parseFloat(r), `trailing corner ${r} is cut below h/2`).toBeLessThan(read.h / 2 - 4);
    }
});

/* ── g2 · the collapsed seal, and every other posture ────────────────────────── */

test("g2 collapsed: the plate is a circle, half its extent on both axes", async ({ page }) => {
    await open(page, "scene=dock&collapse=closed");
    await pointerOff(page);
    await settle(page, 400);
    const read = await readPlate(page);
    expect(read.cls, "collapsed").toContain("collapsed");
    expect(Math.abs(read.w - read.h), `a square box (${JSON.stringify(read)})`).toBeLessThanOrEqual(
        0.5,
    );
    expectRestCorner(read, "collapsed");
    for (const r of read.radii) {
        expect(
            Math.abs(Number.parseFloat(r) - read.w / 2),
            `collapsed: corner ${r} = half the inline extent ${read.w / 2}`,
        ).toBeLessThanOrEqual(0.5);
    }
});

test("g2 expanded (collapsible), each layer and input mode hold g1", async ({ page }) => {
    await open(page, "scene=dock&collapse=open");
    await pointerOff(page);
    const expanded = await readPlate(page);
    expect(expanded.cls, "expanded").toContain("expanded");
    expectRestCorner(expanded, "expanded");
    expectNoReach(expanded, "expanded");

    for (const layer of ["actions", "input"]) {
        await open(page, `scene=layers&layer=${layer}`);
        await pointerOff(page);
        await settle(page, 200);
        const read = await readPlate(page);
        expectRestCorner(read, `layer ${layer}`);
        expectNoReach(read, `layer ${layer}`);
    }
    // Input mode with the field focused and the caret in it.
    await page.locator('input[aria-label="Colour"]').focus();
    await settle(page, 400);
    const input = await readPlate(page);
    expectRestCorner(input, "input mode, field focused");
    expectNoReach(input, "input mode, field focused");
});

/* ── g3 · the Slider thumb at the extremes ───────────────────────────────────── */

test("g3 the Slider thumb is visible and one size at min, mid and max, inside the fill", async ({
    page,
}) => {
    await open(page, "scene=slider");
    const rows = await page.evaluate(() =>
        ["min", "mid", "max", "inv-min", "inv-max"].map((id) => {
            const row = document.querySelector(`[data-witness="${id}"]`)!;
            const box = (sel: string) => {
                const r = row.querySelector(sel)!.getBoundingClientRect();
                return { l: r.left, r: r.right, t: r.top, b: r.bottom, w: r.width, h: r.height };
            };
            const thumb = row.querySelector(".slider-thumb")!;
            const cs = getComputedStyle(thumb);
            return {
                id,
                thumb: box(".slider-thumb"),
                range: box(".slider-range"),
                track: box(".slider-track"),
                opacity: Number(cs.opacity),
                visibility: cs.visibility,
                paint: cs.backgroundColor,
            };
        }),
    );
    const [first] = rows;
    for (const row of rows) {
        const cell = `${row.id} (${JSON.stringify(row)})`;
        expect(row.thumb.w, `${cell}: thumb has a box`).toBeGreaterThan(4);
        expect(row.opacity, `${cell}: thumb opaque`).toBe(1);
        expect(row.visibility, `${cell}: thumb visible`).toBe("visible");
        expect(row.paint, `${cell}: thumb painted`).not.toMatch(/rgba\(0, 0, 0, 0\)|transparent/);
        expect(Math.abs(row.thumb.w - first.thumb.w), `${cell}: same width`).toBeLessThanOrEqual(0.5);
        expect(Math.abs(row.thumb.h - first.thumb.h), `${cell}: same height`).toBeLessThanOrEqual(0.5);
        // Inscribed: inside the track on both axes, and inside the fill.
        expect(row.thumb.l, `${cell}: inside the track`).toBeGreaterThanOrEqual(row.track.l - 0.5);
        expect(row.thumb.r, `${cell}: inside the track`).toBeLessThanOrEqual(row.track.r + 0.5);
        expect(row.thumb.h, `${cell}: thumb ≤ track`).toBeLessThanOrEqual(row.track.h + 0.5);
        expect(row.range.w, `${cell}: the fill is at least one thumb`).toBeGreaterThanOrEqual(
            row.thumb.w - 0.5,
        );
        expect(row.thumb.l, `${cell}: inside the fill`).toBeGreaterThanOrEqual(row.range.l - 0.5);
        expect(row.thumb.r, `${cell}: inside the fill`).toBeLessThanOrEqual(row.range.r + 0.5);
    }
});

/* ── g5 · the menu item's icon slot ──────────────────────────────────────────── */

test("g5 the DropdownMenuItem icon-to-label gap is the icon-slot token, the dock trigger's own", async ({
    page,
}) => {
    await open(page, "scene=menu");
    const menu = await page.evaluate(() => {
        const probe = document.createElement("div");
        probe.style.cssText = "position:absolute;inline-size:var(--icon-label-gap, 0px)";
        document.body.append(probe);
        const token = probe.getBoundingClientRect().width;
        probe.remove();
        const icon = document.querySelector('[data-witness="icon"]')!.getBoundingClientRect();
        const label = document.querySelector('[data-witness="label"]')!.getBoundingClientRect();
        return { token, gap: label.left - icon.right };
    });
    expect(menu.token, `the token resolves (${JSON.stringify(menu)})`).toBeGreaterThan(0);
    expect(Math.abs(menu.gap - menu.token), `menu gap = token (${JSON.stringify(menu)})`).toBeLessThanOrEqual(0.5);

    await open(page, "scene=dock");
    const trigger = await page.evaluate(() => {
        const t = document.querySelector('.glass-dock [aria-label="Menu"]')!;
        const [icon, label] = [t.querySelector("svg")!, t.querySelector("span")!].map((e) =>
            e.getBoundingClientRect(),
        );
        return label.left - icon.right;
    });
    expect(Math.abs(trigger - menu.gap), `dock trigger gap ${trigger} = menu gap`).toBeLessThanOrEqual(0.5);
});

/* ── critique round 1 ───────────────────────────────────────────────────────── */

test("c1 a value mark is the thumb's centre at that value, on every axis; the loupe's value point is the thumb's centre", async ({
    page,
}) => {
    await open(page, "scene=marks");
    const rows = await page.evaluate(() =>
        [...document.querySelectorAll<HTMLElement>("[data-witness]")].map((row) => {
            const vertical = !!row.querySelector('[data-orientation="vertical"]');
            const mid = (r: DOMRect) => (vertical ? (r.top + r.bottom) / 2 : (r.left + r.right) / 2);
            const thumb = row.querySelector(".slider-thumb")!.getBoundingClientRect();
            const fill = row.querySelector(".slider-range")!.getBoundingClientRect();
            const marks = [...row.querySelectorAll<HTMLElement>(".glass-value-mark")].map((m) => {
                const b = m.getBoundingClientRect();
                return { pos: m.style.getPropertyValue("--value-mark-position"), at: vertical ? b.top : b.left };
            });
            return {
                id: row.dataset.witness!,
                value: Number(row.querySelector(".slider-thumb")!.getAttribute("aria-valuenow")),
                vertical,
                thumbCentre: mid(thumb),
                fill: { l: fill.left, r: fill.right, t: fill.top, b: fill.bottom },
                marks,
            };
        }),
    );
    for (const row of rows) {
        const cell = `${row.id} (${JSON.stringify(row)})`;
        if (row.id === "below-5") {
            // At min the fill ends at the thumb's trailing edge; a mark at 5 lies beyond it.
            expect(row.marks[0]!.at, `${cell}: the 5 mark is past the fill at min`).toBeGreaterThan(row.fill.r + 0.5);
            continue;
        }
        const on = row.marks.find((m) => Math.abs(Number.parseFloat(m.pos) - row.value) < 0.01)!;
        expect(on, `${cell}: a mark at the value`).toBeTruthy();
        expect(Math.abs(on.at - row.thumbCentre), `${cell}: mark = thumb centre`).toBeLessThanOrEqual(0.5);
    }

    // The loupe: grasp the on-25 thumb and read the lens's value point against it.
    const thumb = page.locator('[data-witness="on-25"] .slider-thumb');
    const box = (await thumb.boundingBox())!;
    await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
    await page.mouse.down();
    await settle(page, 400);
    const loupe = await page.evaluate(() => {
        const lens = document.querySelector<HTMLElement>(".glass-loupe");
        const row = document.querySelector('[data-witness="on-25"]')!;
        const track = row.querySelector<HTMLElement>(".slider-track")!;
        const thumb = row.querySelector<HTMLElement>(".slider-thumb")!;
        // Layout, not the held squish: the lane's centre law from the live value.
        const p = Number(thumb.getAttribute("aria-valuenow")) / 100;
        const d = thumb.offsetWidth;
        const centre = d / 2 + p * (track.offsetWidth - d);
        return {
            mounted: !!lens,
            p,
            x: lens ? Number.parseFloat(lens.style.getPropertyValue("--loupe-x")) : NaN,
            fillW: lens ? Number.parseFloat(lens.style.getPropertyValue("--loupe-fill-w")) : NaN,
            centre,
            fillEnd: centre + d / 2,
        };
    });
    await page.mouse.up();
    expect(loupe.mounted, `the loupe mounts on the grasp (${JSON.stringify(loupe)})`).toBe(true);
    expect(Math.abs(loupe.x - loupe.centre), `loupe value point = thumb centre (${JSON.stringify(loupe)})`).toBeLessThanOrEqual(1);
    expect(Math.abs(loupe.fillW / 3 - loupe.fillEnd), `loupe fill = the fill (${JSON.stringify(loupe)})`).toBeLessThanOrEqual(1);
});

test.describe("coarse phone, round 1", () => {
    test.use({ hasTouch: true, isMobile: true, viewport: { width: 390, height: 844 } });
    test("c2 coarse: the -sm rung stays the quieter rung for every non-field reader; an sm field floors at 16px", async ({
        page,
    }) => {
        await open(page, "scene=type");
        await expectCoarse(page);
        const read = await page.evaluate(() => {
            const px = (sel: string) =>
                Number.parseFloat(getComputedStyle(document.querySelector(sel)!).fontSize);
            return {
                item: px('[data-witness="mitem"]'),
                label: px('[data-witness="mlabel"]'),
                shortcut: px('[data-witness="mshort"]'),
                btnMd: px('[data-witness="btn-md"]'),
                btnSm: px('[data-witness="btn-sm"]'),
                barSm: px('[data-witness="bar-sm"] input'),
                bar: px('[data-witness="bar"] input'),
            };
        });
        const cell = JSON.stringify(read);
        for (const [quiet, loud] of [["label", "item"], ["shortcut", "item"], ["btnSm", "btnMd"]] as const) {
            const ratio = read[quiet] / read[loud];
            expect(ratio, `${quiet} ÷ ${loud} is the quieter rung (${cell})`).toBeLessThanOrEqual(0.92);
            expect(ratio, `${quiet} ÷ ${loud} keeps the desktop ratio (${cell})`).toBeGreaterThanOrEqual(0.82);
        }
        // The no-zoom law binds fields: the sm field and the default field paint 16px.
        expect(read.barSm, `sm field floors at 16px (${cell})`).toBe(16);
        expect(read.bar, `default field is 16px (${cell})`).toBe(16);
    });

    test("c4 coarse 390: a keyboard-focused seat under the pointer keeps its whole ring", async ({ page }) => {
        await c4(page);
    });
});

/* ── c3 · the disabled thumb ─────────────────────────────────────────────────── */

test("c3 the disabled scrubber dims its thumb with its fill", async ({ page }) => {
    await open(page, "scene=slider");
    const rows = await page.evaluate(() =>
        ["dis-min", "dis-max"].map((id) => {
            const row = document.querySelector(`[data-witness="${id}"]`)!;
            const op = (sel: string) => Number(getComputedStyle(row.querySelector(sel)!).opacity);
            return { id, thumb: op(".slider-thumb"), range: op(".slider-range") };
        }),
    );
    for (const row of rows) {
        expect(row.range, `${row.id}: the fill dims (${JSON.stringify(row)})`).toBeLessThan(1);
        expect(row.thumb, `${row.id}: the thumb dims with it (${JSON.stringify(row)})`).toBe(row.range);
    }
});

/* ── c4 · the focused seat under the pointer ─────────────────────────────────── */

/**
 * A keyboard-focused seat under the pointer: its ring (the transformed box grown by
 * `(outline-width + outline-offset) × scale`) lies inside every clipping box between it
 * and the dock root, the run first.
 */
async function expectFocusedRingWhole(page: Page, witness: string): Promise<void> {
    const seat = page.locator(`[data-witness="${witness}"]`);
    // A key press arms :focus-visible; focus() then keeps it.
    await page.keyboard.press("Shift");
    await seat.focus();
    await seat.hover();
    await settle(page, 600);
    const read = await seat.evaluate((el) => {
        const cs = getComputedStyle(el);
        const s = cs.scale === "none" ? 1 : Number.parseFloat(cs.scale);
        const ink = (Number.parseFloat(cs.outlineWidth) + Number.parseFloat(cs.outlineOffset)) * s;
        const r = el.getBoundingClientRect();
        const ring = { l: r.left - ink, r: r.right + ink, t: r.top - ink, b: r.bottom + ink };
        const clips: { cls: string; l: number; r: number; t: number; b: number }[] = [];
        for (let a = el.parentElement; a; a = a.parentElement) {
            const o = getComputedStyle(a);
            if (o.overflowX !== "visible" || o.overflowY !== "visible") {
                const b = a.getBoundingClientRect();
                clips.push({ cls: a.className, l: b.left, r: b.right, t: b.top, b: b.bottom });
            }
            if (a.classList.contains("glass-dock")) break;
        }
        return {
            focusVisible: el.matches(":focus-visible"),
            hover: el.matches(":hover"),
            scale: s,
            width: r.width,
            outline: cs.outlineStyle,
            ink,
            ring,
            clips,
        };
    });
    const cell = `${witness} (${JSON.stringify(read)})`;
    expect(read.focusVisible && read.hover, `${cell}: focused and hovered`).toBe(true);
    expect(read.scale, `${cell}: hover-scaled`).toBeGreaterThan(1);
    expect(read.outline, `${cell}: the ring paints`).not.toBe("none");
    expect(read.clips.length, `${cell}: the run clips`).toBeGreaterThan(0);
    for (const c of read.clips) {
        expect(read.ring.l, `${cell}: ring inside ${c.cls} (left)`).toBeGreaterThanOrEqual(c.l - 0.5);
        expect(read.ring.r, `${cell}: ring inside ${c.cls} (right)`).toBeLessThanOrEqual(c.r + 0.5);
        expect(read.ring.t, `${cell}: ring inside ${c.cls} (top)`).toBeGreaterThanOrEqual(c.t - 0.5);
        expect(read.ring.b, `${cell}: ring inside ${c.cls} (bottom)`).toBeLessThanOrEqual(c.b + 0.5);
    }
    await pointerOff(page);
}

async function c4(page: Page): Promise<void> {
    await open(page, "scene=dock");
    for (const label of ["Seat 1", "Seat 3"]) await expectFocusedRingWhole(page, label);
    // And the run still hides nothing under the reserve.
    expectNoReach(await readPlate(page), "c4 after the focused hover");
}

test("c4 desktop: a keyboard-focused seat under the pointer keeps its whole ring", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 844 });
    await c4(page);
});

/* ── e1-e3 · critique round 2: the largest seat and the room beside the run ──────
   (docs/release-10.1.5/critique-2.md). RED on the round-1 tip 65fdbd228, GREEN after. */

async function openSeats(page: Page, query: string): Promise<void> {
    await open(page, `scene=seats&${query}`);
    if (test.info().project.use.isMobile) await expectCoarse(page);
    await pointerOff(page);
    await settle(page, 200);
}

const LONG_TAB = "kinds=icon,tab:A much longer label";

/** E1: a seat wider than 3 icon cells, hovered, is still not reach. */
function e1(width: number): void {
    test(`e1 at ${width}: a label-wide tab under the pointer gives the run no reach and cuts no corner`, async ({
        page,
    }) => {
        await page.setViewportSize({ width, height: 844 });
        await openSeats(page, LONG_TAB);
        const tab = page.locator('[data-witness="S2"]');
        expect(
            await tab.evaluate((el) => (el as HTMLElement).offsetWidth),
            "the trailing tab is wider than the 132 px the icon-cell reserve covered",
        ).toBeGreaterThan(132);
        const rest = await readPlate(page);
        await tab.hover();
        await settle(page, 600);
        const hovered = await readPlate(page);
        expect(
            await tab.evaluate((el) => getComputedStyle(el).scale),
            "the tab is hover-scaled",
        ).not.toBe("1");
        expectNoReach(rest, `${width} rest`);
        expectNoReach(hovered, `${width} hover on the wide tab`);
        expectRestCorner(rest, `${width} rest`);
        expectRestCorner(hovered, `${width} hover on the wide tab`);
    });
}

/** E2: a focused, hovered tab seat keeps its whole ring, leading and trailing, both docks. */
function e2(width: number): void {
    test(`e2 at ${width}: focused, hovered tab seats keep their whole ring on every edge`, async ({ page }) => {
        await page.setViewportSize({ width, height: 844 });
        await openSeats(page, "kinds=tab:Home,icon,icon,tab:Settings");
        for (const seat of ["S1", "S4"]) await expectFocusedRingWhole(page, seat);
        expectNoReach(await readPlate(page), `${width} after the focused hovers`);
        await openSeats(page, "kinds=tab:Home,icon,tab:Settings&orientation=vertical");
        for (const seat of ["S1", "S3"]) await expectFocusedRingWhole(page, seat);
    });
}

/** E3: the run's scroll clip stays off the persistent regions beside it. */
function e3(width: number): void {
    test(`e3 at ${width}: the run's clip and hit stop at the persistent seats, at rest and scrolled`, async ({
        page,
    }) => {
        await page.setViewportSize({ width, height: 844 });
        await openSeats(page, `fit=0&maxw=360&persistent=1&kinds=${Array(12).fill("icon").join(",")}`);
        for (const at of ["start", "mid", "end"] as const) {
            const read = await page.evaluate(async (at) => {
                const run = document.querySelector<HTMLElement>(".dock-run")!;
                const range = run.scrollWidth - run.clientWidth;
                run.scrollLeft = at === "start" ? 0 : at === "mid" ? range / 2 : range;
                await new Promise((r) => setTimeout(r, 500));
                const box = (sel: string) => document.querySelector(sel)!.getBoundingClientRect();
                const runBox = run.getBoundingClientRect();
                const lead = box('[data-witness="lead"]');
                const tail = box('[data-witness="tail"]');
                const hit = (x: number, y: number) => document.elementFromPoint(x, y)?.closest("[data-witness]")?.getAttribute("data-witness") ?? null;
                return {
                    range,
                    scroll: run.scrollLeft,
                    run: [runBox.left, runBox.right],
                    lead: [lead.left, lead.right],
                    tail: [tail.left, tail.right],
                    leadHit: hit(lead.right - 0.5, (lead.top + lead.bottom) / 2),
                    tailHit: hit(tail.left + 0.5, (tail.top + tail.bottom) / 2),
                };
            }, at);
            const cell = `${width} ${at} (${JSON.stringify(read)})`;
            expect(read.range, `${cell}: the run overflows`).toBeGreaterThan(0);
            expect(read.run[0], `${cell}: the clip starts at or after the lead seat`).toBeGreaterThanOrEqual(read.lead[1]);
            expect(read.run[1], `${cell}: the clip ends at or before the tail seat`).toBeLessThanOrEqual(read.tail[0]);
            expect(read.leadHit, `${cell}: the lead seat owns its own edge`).toBe("lead");
            expect(read.tailHit, `${cell}: the tail seat owns its own edge`).toBe("tail");
        }
        // The run's edge seats beside the persistent regions still keep their whole ring.
        await openSeats(page, "persistent=1&kinds=tab:Home,icon,tab:Settings");
        for (const seat of ["S1", "S3"]) await expectFocusedRingWhole(page, seat);
        expectNoReach(await readPlate(page), `${width} persistent, after the focused hovers`);
    });
}

/**
 * E4: the run's end padding past its last seat holds that seat's whole ink (hover
 * overhang + scaled ring) plus one whole pixel, the step a whole-pixel scroll offset
 * (WebKit) can fall short of a fractional end by. Read from the focused, hovered seat's
 * own transformed box, so it binds in an engine whose scroll offset is fractional too.
 */
function e4(width: number): void {
    test(`e4 at ${width}: the run's end padding holds a focused, hovered end seat's ink and the scroll step`, async ({
        page,
    }) => {
        await page.setViewportSize({ width, height: 844 });
        for (const [query, seat, vertical] of [
            ["persistent=1&kinds=tab:Home,icon,tab:Settings", "S3", false],
            ["kinds=tab:Home,icon,tab:Settings&orientation=vertical", "S3", true],
        ] as const) {
            await openSeats(page, query);
            const el = page.locator(`[data-witness="${seat}"]`);
            await page.keyboard.press("Shift");
            await el.focus();
            await el.hover();
            await settle(page, 600);
            const read = await el.evaluate((node, vertical) => {
                const cs = getComputedStyle(node);
                const s = cs.scale === "none" ? 1 : Number.parseFloat(cs.scale);
                const ring = (Number.parseFloat(cs.outlineWidth) + Number.parseFloat(cs.outlineOffset)) * s;
                const r = node.getBoundingClientRect();
                const extent = vertical ? r.height : r.width;
                const overhang = (extent - extent / s) / 2;
                const run = node.closest<HTMLElement>(".dock-run")!;
                const pad = Number.parseFloat(
                    getComputedStyle(run)[vertical ? "paddingBottom" : "paddingRight"],
                );
                return { s, ring, overhang, ink: overhang + ring, pad };
            }, vertical);
            const cell = `${width} ${query} (${JSON.stringify(read)})`;
            expect(read.s, `${cell}: hover-scaled`).toBeGreaterThan(1);
            expect(read.pad - read.ink, `${cell}: end padding past the ink`).toBeGreaterThanOrEqual(1 - 0.01);
            await pointerOff(page);
        }
    });
}

test.describe("critique 2, coarse phone", () => {
    test.use({ hasTouch: true, isMobile: true, viewport: { width: 390, height: 844 } });
    e1(390);
    e1(844);
    e2(390);
    e3(390);
    e4(390);
});

e1(390);
e1(1440);
e2(390);
e2(1440);
e3(390);
e4(1440);

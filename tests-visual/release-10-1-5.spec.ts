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
// Fix round 3 (the fix-2 WebKit e3 cell at coarse 390), restated by fix round 5 (K3, r1
// holds at every width):
//   e4  a run whose seats all show but overrun its port less the reserve (the dock capped
//       4 px under its content) scrolls nothing, rests round, and keeps its focused end
//       seat's whole ring
//
// Critique round 4 (critique-4.md), RED on the round-4 tip 463b0e42a (f1 and f2 on
// v10.1.4 as well), GREEN after:
//   f1  (O-133) a SegmentedTabs under a fixed z:1 header: the header paints over it,
//       both variants; inside, the labels paint over the indicator at rest and mid-glide
//   f2  (O-150 R-t-1) Table row and header rules paint in `--border`, light and dark
//   h1  (H1) an overflowing run at mid-scroll, a hovered seat cut by its trailing clip:
//       no point past the plate's corner arc hits a seat, house and cockpit
//   h2  (H2) a labelled DockTrigger adds no reserve: the run's room is the icon dock's
//   h3  (H3) a ticking seat label constructs no ResizeObserver
//   h4  (H4) with no ResizeObserver the plate still rests at half its block extent
//
// Critique round 5 (critique-5.md), RED on the round-5 tip 5836adb5f, GREEN after:
//   k1  (K1) the house run at 320: End, focus() and hover-then-focus land the end seat
//       flush at the run's end with its ring whole; Home lands the first seat at 0
//   k2  (K2) a vertical run that overflows clips square at a flush edge: a wide end seat
//       focused and hovered there keeps its whole ring; mid-run the clip rounds
//   k3  (K3) a viewport-capped dock at 320 whose seats all show has nothing to scroll,
//       rests at four corners of half its extent, and keeps its focused end seats' rings
//
// Critique round 6 (critique-6.md), RED on the round-6 tip 4c9c15008 (and v10.1.4), GREEN
// after:
//   l1  (L1) a run whose overflow vanishes while it is scrolled (to its end, or mid) rests
//       round: a lifted cap, a viewport resize 390 → 844, and a vertical run's stage grown
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

/**
 * The run scrolls exactly what it hides. A run whose seats' span fits its port reads no
 * reach (the reserve yields to the room left); one whose seats do not fit in an engine's
 * font metrics reads the seats' overrun plus both reserves, never 0 (WebKit's dropped
 * end padding hid it) and never more (a seat's engagement scale is not reach). Read with
 * the pointer off and the run at its leading rest.
 */
async function expectHonestReach(page: Page, cell: string): Promise<void> {
    await pointerOff(page);
    await settle(page, 400);
    const read = await page.evaluate(() => {
        const run = document.querySelector<HTMLElement>(".dock-run.is-active")!;
        run.scrollTo({ left: 0, top: 0, behavior: "instant" });
        const reserve = Number.parseFloat(getComputedStyle(run).paddingInlineStart);
        const seats = [...run.children] as HTMLElement[];
        const span = seats.at(-1)!.offsetLeft + seats.at(-1)!.offsetWidth - seats[0]!.offsetLeft;
        return {
            reach: run.scrollWidth - run.clientWidth,
            overrun: span <= run.clientWidth ? 0 : span + 2 * reserve - run.clientWidth,
            span,
            port: run.clientWidth,
            reserve,
        };
    });
    const at = `${cell} (${JSON.stringify(read)})`;
    expect(Math.abs(read.reach - read.overrun), `${at}: reach = the seats' overrun`).toBeLessThanOrEqual(1);
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
        // [fix round 3] At coarse 390 WebKit lays these labels out ~1 px past the 390 px
        // dock, so the run honestly overflows there: it must scroll what it hides.
        await expectHonestReach(page, `${width} persistent, after the focused hovers`);
    });
}

/**
 * E4: a run whose seats show but overrun its port less the reserve (the dock capped 4 px
 * under its own content width) has nothing to scroll: the reserve yields to the room the
 * seats leave (critique round 5, K3), the plate rests round, and the keyboard-focused end
 * seat keeps its whole ring.
 */
function e4(width: number): void {
    test(`e4 at ${width}: a run whose seats all show, capped under its reserve, scrolls nothing and keeps the end seat's ring`, async ({
        page,
    }) => {
        await page.setViewportSize({ width, height: 844 });
        const kinds = "persistent=1&kinds=icon,icon,tab:Settings";
        await openSeats(page, kinds);
        const natural = await page.evaluate(
            () => document.querySelector<HTMLElement>(".glass-dock")!.getBoundingClientRect().width,
        );
        await openSeats(page, `${kinds}&maxw=${Math.floor(natural) - 4}`);
        const rest = await readPlate(page);
        expectNoReach(rest, `${width} capped 4 px under ${natural}`);
        expectRestCorner(rest, `${width} capped 4 px under ${natural}`);
        await page.keyboard.press("Shift");
        await page.locator('[data-witness="S3"]').focus();
        await settle(page, 400);
        await expectRingInsideRun(page, "S3", `${width} capped`);
        expectNoReach(await readPlate(page), `${width} capped, S3 focused`);
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

/* ── f1-f2, h1-h4 · critique round 4 (docs/release-10.1.5/critique-4.md) ─────────── */

/** f1 (O-133): the strip's tab rung ranks inside the strip, never in the host's context. */
test("f1 a SegmentedTabs under a fixed z:1 header paints beneath it; its labels paint over the indicator", async ({
    page,
}) => {
    await page.setViewportSize({ width: 390, height: 800 });
    for (const variant of ["pill", "underline"]) {
        await open(page, `scene=segtabs&variant=${variant}`);
        const read = await page.evaluate(async () => {
            const raf2 = () => new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));
            const tabs = [...document.querySelectorAll<HTMLElement>(".segmented-tab")];
            const indicator = document.querySelector<HTMLElement>(".segmented-indicator");
            // Inside the strip: each label's rung over the indicator's, read at rest and
            // two frames into a glide to the third tab.
            const order = () => ({
                tab: tabs.map((t) => getComputedStyle(t).zIndex),
                indicator: indicator ? getComputedStyle(indicator).zIndex : null,
            });
            const rest = order();
            tabs[2]!.click();
            await raf2();
            const glide = order();
            await new Promise((r) => setTimeout(r, 600));
            // Under the header: scroll the strip beneath it and hit-test a tab.
            const b = tabs[1]!.getBoundingClientRect();
            window.scrollTo(0, b.top + window.scrollY - 40);
            await raf2();
            const c = tabs[1]!.getBoundingClientRect();
            const under = document.elementFromPoint(c.left + c.width / 2, c.top + c.height / 2) as HTMLElement;
            return { rest, glide, underTop: under.dataset.witness ?? under.className.toString(), tabTop: c.top };
        });
        const cell = `${variant} (${JSON.stringify(read)})`;
        expect(read.tabTop, `${cell}: the tab lies under the header`).toBeLessThan(80);
        expect(read.underTop, `${cell}: the fixed header paints over the strip`).toBe("header");
        for (const at of [read.rest, read.glide]) {
            expect(at.indicator, `${cell}: an indicator`).not.toBeNull();
            for (const z of at.tab) {
                expect(Number(z), `${cell}: the label's rung is over the indicator's`).toBeGreaterThan(Number(at.indicator));
            }
        }
    }
});

/** f2 (O-150 R-t-1): the table's rules are the glass hairline, never the text colour. */
test("f2 Table row and header rules paint in --border, light and dark", async ({ page }) => {
    await open(page, "scene=table");
    for (const dark of [false, true]) {
        const read = await page.evaluate((dark) => {
            document.documentElement.classList.toggle("dark", dark);
            const border = getComputedStyle(document.querySelector('[data-witness="probe-border"]')!).borderTopColor;
            return {
                border,
                rules: [...document.querySelectorAll<HTMLElement>("tr[data-witness], thead tr")].map((el) => {
                    const cs = getComputedStyle(el);
                    return { id: el.dataset.witness, width: cs.borderBottomWidth, colour: cs.borderBottomColor, text: cs.color };
                }),
            };
        }, dark);
        expect(read.border, "the probe resolves --border").not.toBe("");
        expect(read.rules.filter((r) => r.width === "1px").length, "the header and body rows rule").toBeGreaterThan(2);
        for (const rule of read.rules) {
            const cell = `${dark ? "dark" : "light"} ${rule.id} (${JSON.stringify(read)})`;
            expect(rule.colour, `${cell}: the rule is --border`).toBe(read.border);
        }
    }
});

/**
 * h1 (H1): the run's clip follows the plate's cut corner. An overflowing run is scrolled
 * so a seat straddles its trailing clip at mid-run (every corner cut), and the seat is
 * hovered. Paint is read twice at 2x, with the run's seats shown and hidden: every device
 * pixel in a plate corner's square lying more than 0.75 px past the corner's arc must
 * paint the same in both, so no seat ink lies outside the plate. (Hit testing is no
 * witness here: Chromium hit-tests a scroller's descendants against its rectangle, not
 * its rounded clip.)
 */
test.describe("h1 at 2x", () => {
    test.use({ deviceScaleFactor: 2 });
    for (const preset of ["house", "cockpit"] as const) {
        test(`h1 ${preset} at 390: a seat cut by the trailing clip paints nothing past the plate's corner arc`, async ({
            page,
        }) => {
            await page.setViewportSize({ width: 390, height: 400 });
            const kinds = ["tab:Home", ...Array(6).fill("icon"), "tab:Settings", "tab:Library", "icon", "icon", "tab:Profile"];
            await openSeats(page, `maxw=360&kinds=${encodeURIComponent(kinds.join(","))}${preset === "cockpit" ? "&preset=cockpit" : ""}`);
            for (const target of ["S8", "S9"]) {
                await page.evaluate((target) => {
                    const run = document.querySelector<HTMLElement>(".dock-run.is-active")!;
                    run.style.scrollSnapType = "none";
                    const seat = document.querySelector<HTMLElement>(`[data-witness="${target}"]`)!;
                    const r = run.getBoundingClientRect();
                    const b = seat.getBoundingClientRect();
                    run.scrollLeft += b.left + b.width / 2 - r.right;
                }, target);
                await settle(page, 300);
                const b = (await page.locator(`[data-witness="${target}"]`).boundingBox())!;
                const r = (await page.locator(".dock-run.is-active").boundingBox())!;
                await page.mouse.move(Math.min(b.x + 6, r.x + r.width - 6), b.y + b.height / 2);
                await settle(page, 450);
                const geo = await page.evaluate((target) => {
                    const run = document.querySelector<HTMLElement>(".dock-run.is-active")!;
                    const plate = document.querySelector<HTMLElement>(".glass-dock > .dock-plate")!;
                    const p = plate.getBoundingClientRect();
                    const cs = getComputedStyle(plate);
                    return {
                        hovered: document.querySelector(`[data-witness="${target}"]`)!.matches(":hover"),
                        scroll: run.scrollLeft,
                        range: run.scrollWidth - run.clientWidth,
                        plate: [p.left, p.top, p.right, p.bottom],
                        radii: [cs.borderTopLeftRadius, cs.borderTopRightRadius, cs.borderBottomRightRadius, cs.borderBottomLeftRadius].map(Number.parseFloat),
                        run: getComputedStyle(run).borderTopRightRadius,
                    };
                }, target);
                const cell = `${preset} ${target} (${JSON.stringify(geo)})`;
                expect(geo.hovered, `${cell}: the seat is hovered`).toBe(true);
                expect(geo.scroll, `${cell}: scrolled mid-run`).toBeGreaterThan(0);
                expect(geo.scroll, `${cell}: scrolled mid-run`).toBeLessThan(geo.range);
                for (const rad of geo.radii) expect(rad, `${cell}: every corner is cut`).toBeLessThan(20);
                const [l, t, rr, bb] = geo.plate;
                const clip = { x: Math.floor(l) - 2, y: Math.floor(t) - 2, width: Math.ceil(rr - l) + 4, height: Math.ceil(bb - t) + 4 };
                const shown = (await page.screenshot({ clip })).toString("base64");
                await page.evaluate(() => {
                    for (const k of document.querySelector(".dock-run.is-active")!.children) (k as HTMLElement).style.visibility = "hidden";
                });
                await settle(page, 100);
                const hidden = (await page.screenshot({ clip })).toString("base64");
                await page.evaluate(() => {
                    for (const k of document.querySelector(".dock-run.is-active")!.children) (k as HTMLElement).style.visibility = "";
                });
                const read = await page.evaluate(
                    async ({ shown, hidden, clip, geo }) => {
                        const load = async (b64: string) => {
                            const img = new Image();
                            img.src = `data:image/png;base64,${b64}`;
                            await img.decode();
                            const c = document.createElement("canvas");
                            c.width = img.naturalWidth;
                            c.height = img.naturalHeight;
                            const ctx = c.getContext("2d")!;
                            ctx.drawImage(img, 0, 0);
                            return ctx.getImageData(0, 0, c.width, c.height);
                        };
                        const a = await load(shown);
                        const z = await load(hidden);
                        const dpr = a.width / clip.width;
                        const [l, t, r, b] = geo.plate;
                        const corners = [
                            [l, t, 1, 1],
                            [r, t, -1, 1],
                            [r, b, -1, -1],
                            [l, b, 1, -1],
                        ] as const;
                        let probed = 0;
                        const ink: number[][] = [];
                        for (let py = 0; py < a.height; py++) {
                            for (let px = 0; px < a.width; px++) {
                                const x = clip.x + (px + 0.5) / dpr;
                                const y = clip.y + (py + 0.5) / dpr;
                                corners.forEach(([x0, y0, sx, sy], i) => {
                                    const rad = geo.radii[i]!;
                                    const dx = (x - x0) * sx;
                                    const dy = (y - y0) * sy;
                                    if (dx < 0 || dy < 0 || dx > rad || dy > rad) return;
                                    if (Math.hypot(rad - dx, rad - dy) <= rad + 0.75) return;
                                    probed += 1;
                                    const o = (py * a.width + px) * 4;
                                    const d = Math.max(
                                        Math.abs(a.data[o]! - z.data[o]!),
                                        Math.abs(a.data[o + 1]! - z.data[o + 1]!),
                                        Math.abs(a.data[o + 2]! - z.data[o + 2]!),
                                    );
                                    if (d > 6) ink.push([+x.toFixed(2), +y.toFixed(2), d]);
                                });
                            }
                        }
                        return { probed, count: ink.length, ink: ink.slice(0, 6) };
                    },
                    { shown, hidden, clip, geo },
                );
                expect(read.probed, `${cell}: device pixels past the arcs were read`).toBeGreaterThan(0);
                expect(read.count, `${cell}: no seat ink past the plate's arc (${JSON.stringify(read)})`).toBe(0);
            }
        });
    }
});

/** The run's reserve on its scroll axis, as painted: its leading padding. */
function runReserve(page: Page): Promise<number> {
    return page.evaluate(() =>
        Number.parseFloat(getComputedStyle(document.querySelector<HTMLElement>(".dock-run.is-active")!).paddingInlineStart),
    );
}

/** h2 (H2): a seat whose hover scale is off reserves no hover overhang. */
test("h2 at 844: a labelled DockTrigger adds no reserve; the run's room is the icon dock's", async ({ page }) => {
    await page.setViewportSize({ width: 844, height: 800 });
    await openSeats(page, "kinds=icon,icon");
    const icons = await runReserve(page);
    await openSeats(page, "kinds=trigger:A long labelled menu trigger,icon,icon");
    const trigger = page.locator('[data-witness="S1"]');
    expect(
        await trigger.evaluate((el) => (el as HTMLElement).offsetWidth),
        "the trigger is wider than every icon seat",
    ).toBeGreaterThan(132);
    const withTrigger = await runReserve(page);
    expect(withTrigger, `the trigger's dock reserves ${withTrigger}, the icon dock ${icons}`).toBe(icons);
    expect(icons, "the icon dock reserves the ring and the icon's overhang").toBeGreaterThan(0);
});

/** h3 (H3): a seat's label text changing re-observes nothing. */
test("h3 a ticking seat label constructs no ResizeObserver", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 800 });
    await openSeats(page, "kinds=icon,live,icon");
    const read = await page.evaluate(async () => {
        const w = window as unknown as { __roMade: () => number; __tick: { value: number } };
        const before = w.__roMade();
        for (let i = 0; i < 20; i++) {
            w.__tick.value += 1;
            await new Promise((r) => setTimeout(r, 40));
        }
        return { before, after: w.__roMade() };
    });
    expect(read.before, "the dock observes").toBeGreaterThan(0);
    expect(read.after, `20 label ticks (${JSON.stringify(read)})`).toBe(read.before);
    expectNoReach(await readPlate(page), "after the ticks");
});

/** h4 (H4): the rest corner is measured when the dock attaches, observer or not. */
test("h4 with no ResizeObserver the plate rests at half its block extent", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 800 });
    await openSeats(page, "noro=1&kinds=icon,icon,icon");
    expect(await page.evaluate(() => typeof ResizeObserver), "no ResizeObserver").toBe("undefined");
    const read = await readPlate(page);
    expectRestCorner(read, "no ResizeObserver");
    expectNoReach(read, "no ResizeObserver");
});

/* ── k1-k3 · critique round 5 (docs/release-10.1.5/critique-5.md) ────────────────────
   RED on the round-5 tip 5836adb5f, GREEN after. */

const HOUSE_RUN = ["tab:Home", ...Array.from({ length: 10 }, () => "icon"), "tab:Settings"].join(",");

/** The active run's scroll position and its terminal. */
function runAt(page: Page): Promise<{ pos: number; max: number }> {
    return page.evaluate(() => {
        const run = document.querySelector<HTMLElement>(".dock-run.is-active")!;
        const vertical = run.closest(".glass-dock")!.classList.contains("vertical");
        return vertical
            ? { pos: run.scrollTop, max: run.scrollHeight - run.clientHeight }
            : { pos: run.scrollLeft, max: run.scrollWidth - run.clientWidth };
    });
}

/**
 * A focused seat's ring (its transformed box grown by `(outline-width + outline-offset) ×
 * scale`) lies inside the run's padding box, its scroll clip. Where the run's corners
 * round, `expectRunSquare` is asserted first, or the run hides nothing (its timeline is
 * inactive and it clips square).
 */
async function expectRingInsideRun(page: Page, witness: string, cell: string): Promise<void> {
    const read = await page.locator(`[data-witness="${witness}"]`).evaluate((el) => {
        const run = el.closest<HTMLElement>(".dock-run")!;
        const cs = getComputedStyle(el);
        const s = cs.scale === "none" ? 1 : Number.parseFloat(cs.scale);
        const ink = (Number.parseFloat(cs.outlineWidth) + Number.parseFloat(cs.outlineOffset)) * s;
        const r = el.getBoundingClientRect();
        const p = run.getBoundingClientRect();
        return {
            focusVisible: el.matches(":focus-visible"),
            outline: cs.outlineStyle,
            ink: +ink.toFixed(2),
            past: {
                l: +(p.left - (r.left - ink)).toFixed(2),
                r: +(r.right + ink - (p.left + run.clientWidth)).toFixed(2),
                t: +(p.top - (r.top - ink)).toFixed(2),
                b: +(r.bottom + ink - (p.top + run.clientHeight)).toFixed(2),
            },
            seat: [r.left, r.right, r.top, r.bottom].map((v) => +v.toFixed(2)),
        };
    });
    const at = `${cell} ${witness} (${JSON.stringify(read)})`;
    expect(read.focusVisible, `${at}: keyboard focus`).toBe(true);
    expect(read.outline, `${at}: the ring paints`).not.toBe("none");
    for (const [side, past] of Object.entries(read.past)) {
        expect(past, `${at}: ring inside the run (${side})`).toBeLessThanOrEqual(0.5);
    }
}

/**
 * The run's two corners on its `edge` of the scroll axis are square: a radius with a
 * zero component (`0px`, or `0px 50%` beside a persistent region) draws no arc.
 */
async function expectRunSquare(page: Page, edge: "start" | "end", cell: string): Promise<void> {
    const corners = await page.evaluate((edge) => {
        const run = document.querySelector<HTMLElement>(".dock-run.is-active")!;
        const rc = getComputedStyle(run);
        const vertical = run.closest(".glass-dock")!.classList.contains("vertical");
        const pick = vertical
            ? edge === "start"
                ? [rc.borderTopLeftRadius, rc.borderTopRightRadius]
                : [rc.borderBottomLeftRadius, rc.borderBottomRightRadius]
            : edge === "start"
              ? [rc.borderTopLeftRadius, rc.borderBottomLeftRadius]
              : [rc.borderTopRightRadius, rc.borderBottomRightRadius];
        return pick;
    }, edge);
    for (const c of corners) {
        const parts = c.split(" ").map((v) => Number.parseFloat(v));
        expect(Math.min(...parts), `${cell}: the run's ${edge} corner at a flush edge is square (${corners})`).toBe(0);
    }
}

/** Read after a reach's glide settles (the DOCK spring is well under a second). */
async function settleReach(page: Page): Promise<void> {
    await settle(page, 1500);
}

/**
 * k1 (K1): the reach lands an end seat flush at its terminal, and a hovered seat that
 * rests in view is not reach. The house run at 320 (a wide leading tab, ten icons, a
 * wide trailing tab, both persistent regions) overflows; `End`, `focus()` and
 * hover-then-focus on the end seat each settle at the run's end with the seat's ring
 * whole, and `Home` brings the first seat back to 0.
 */
function k1(): void {
    test("k1 at 320: End, focus() and hover+focus land the end seat flush with its ring whole; Home lands the first", async ({
        page,
    }) => {
        await page.setViewportSize({ width: 320, height: 800 });
        const q = `kinds=${HOUSE_RUN}&persistent=1&maxw=290`;

        // End from the first seat.
        await openSeats(page, q);
        await page.keyboard.press("Shift");
        await page.locator('[data-witness="S1"]').focus();
        await settle(page, 300);
        await page.keyboard.press("End");
        await settleReach(page);
        let at = await runAt(page);
        expect(at.max, "the run overflows").toBeGreaterThan(0);
        expect(at.pos, `End lands at the run's end (${JSON.stringify(at)})`).toBeGreaterThanOrEqual(at.max - 1);
        await expectRunSquare(page, "end", "End");
        await expectRingInsideRun(page, "S12", "End");

        // Home back to the first seat.
        await page.keyboard.press("Home");
        await settleReach(page);
        at = await runAt(page);
        expect(at.pos, `Home lands at 0 (${JSON.stringify(at)})`).toBeLessThanOrEqual(1);
        await expectRunSquare(page, "start", "Home");
        await expectRingInsideRun(page, "S1", "Home");

        // focus() from the start.
        await openSeats(page, q);
        await page.keyboard.press("Shift");
        await page.locator('[data-witness="S12"]').focus();
        await settleReach(page);
        at = await runAt(page);
        expect(at.pos, `focus() lands at the run's end (${JSON.stringify(at)})`).toBeGreaterThanOrEqual(at.max - 1);
        await expectRingInsideRun(page, "S12", "focus()");

        // Flush at the end, the pointer on the end seat, then focus: the run holds.
        await openSeats(page, q);
        await page.evaluate(() => {
            const run = document.querySelector<HTMLElement>(".dock-run.is-active")!;
            run.scrollLeft = run.scrollWidth;
        });
        await settle(page, 500);
        const flush = await runAt(page);
        await page.locator('[data-witness="S12"]').hover();
        await settle(page, 400);
        await page.keyboard.press("Shift");
        await page.locator('[data-witness="S12"]').focus();
        await settleReach(page);
        at = await runAt(page);
        expect(
            at.pos,
            `hover then focus holds the run at its end (${JSON.stringify({ flush, at })})`,
        ).toBeGreaterThanOrEqual(at.max - 1);
        await expectRingInsideRun(page, "S12", "hover+focus");
    });
}

/**
 * k2 (K2): a vertical run that overflows clips square at an edge it is flush against, so
 * a wide end seat focused and hovered there keeps its whole ring, as it does on a run
 * that fits; the cut corner still rounds once the run travels (h1).
 */
test("k2 vertical: a wide tab at a flush edge keeps its whole ring, at the start and at the end", async ({ page }) => {
    await page.setViewportSize({ width: 1280, height: 800 });
    await openSeats(page, `kinds=${HOUSE_RUN}&orientation=vertical&stageH=360`);
    expect((await runAt(page)).max, "the vertical run overflows").toBeGreaterThan(0);
    await page.keyboard.press("Shift");
    await page.locator('[data-witness="S1"]').focus();
    await page.locator('[data-witness="S1"]').hover();
    await settle(page, 600);
    expect((await runAt(page)).pos, "the run rests at 0").toBe(0);
    await expectRunSquare(page, "start", "flush at the start");
    await expectRingInsideRun(page, "S1", "flush at the start");

    await page.keyboard.press("End");
    await settleReach(page);
    const at = await runAt(page);
    expect(at.pos, `End lands at the end (${JSON.stringify(at)})`).toBeGreaterThanOrEqual(at.max - 1);
    await page.locator('[data-witness="S12"]').hover();
    await settle(page, 600);
    await expectRunSquare(page, "end", "flush at the end");
    await expectRingInsideRun(page, "S12", "flush at the end");

    // Mid-run, both edges are cut: the clip rounds (the plate's cut corner, h1).
    await pointerOff(page);
    await page.evaluate(() => {
        const run = document.querySelector<HTMLElement>(".dock-run.is-active")!;
        run.style.scrollSnapType = "none";
        run.scrollTop = (run.scrollHeight - run.clientHeight) / 2;
    });
    await settle(page, 300);
    const mid = await page.evaluate(() => getComputedStyle(document.querySelector<HTMLElement>(".dock-run.is-active")!).borderTopLeftRadius);
    expect(mid, "mid-run the clip rounds to the cut").not.toMatch(/^0px( 0px)?$/);
});

/**
 * k3 (K3): a viewport-capped dock whose seats all show scrolls nothing at 320, fine and
 * coarse: the reserve yields to the room the seats leave, the plate rests at four
 * corners of half its block extent, and the keyboard-focused end seats keep their ring.
 */
function k3(): void {
    test("k3 at 320: a capped dock whose seats all show has nothing to scroll and rests round", async ({ page }) => {
        await page.setViewportSize({ width: 320, height: 800 });
        await openSeats(page, "kinds=tab:Home,icon,icon,tab:Settings");
        const read = await readPlate(page);
        expect(read.w, "the dock is capped by the viewport").toBeGreaterThanOrEqual(316);
        const seats = await page.evaluate(() => {
            const run = document.querySelector<HTMLElement>(".dock-run.is-active")!;
            const k = [...run.children] as HTMLElement[];
            return { span: k.at(-1)!.offsetLeft + k.at(-1)!.offsetWidth - k[0]!.offsetLeft, port: run.clientWidth };
        });
        expect(seats.span, `every seat shows (${JSON.stringify(seats)})`).toBeLessThanOrEqual(seats.port);
        expectNoReach(read, "320 rest");
        expectRestCorner(read, "320 rest");
        for (const seat of ["S1", "S4"]) {
            await page.keyboard.press("Shift");
            await page.locator(`[data-witness="${seat}"]`).focus();
            await settle(page, 400);
            await expectRingInsideRun(page, seat, "320 focus");
            const focused = await readPlate(page);
            expectNoReach(focused, `320 focus ${seat}`);
            expectRestCorner(focused, `320 focus ${seat}`);
        }
    });
}

test.describe("critique 5, coarse phone", () => {
    test.use({ hasTouch: true, isMobile: true, viewport: { width: 390, height: 844 } });
    k1();
    k3();
});

k1();
k3();

/* ── l1 · critique round 6: the cap after the overflow vanishes ────────────────────
   (docs/release-10.1.5/critique-6.md L1). RED on the round-6 tip 4c9c15008, GREEN after. */

/** Scroll the active run (snap and smooth scrolling off) to its end or its middle. */
async function scrollRun(page: Page, pos: "end" | "mid"): Promise<void> {
    await page.evaluate((pos) => {
        const run = document.querySelector<HTMLElement>(".dock-run.is-active")!;
        const vertical = run.closest(".glass-dock")!.classList.contains("vertical");
        run.style.scrollSnapType = "none";
        run.style.scrollBehavior = "auto";
        const max = vertical ? run.scrollHeight - run.clientHeight : run.scrollWidth - run.clientWidth;
        const to = pos === "end" ? max : Math.round(max / 2);
        if (vertical) run.scrollTop = to;
        else run.scrollLeft = to;
    }, pos);
    await settle(page, 400);
}

/**
 * The plate rests round: every corner one length, half the plate's cross extent (its
 * block extent horizontally, its inline extent vertically), and the run that paints has
 * nothing to scroll on its scroll axis.
 */
async function expectRoundAtRest(page: Page, cell: string): Promise<void> {
    const read = await readPlate(page);
    const vertical = read.cls.split(/\s+/).includes("vertical");
    const half = (vertical ? read.w : read.h) / 2;
    const at = `${cell} (${JSON.stringify(read)})`;
    for (const r of read.radii) {
        expect(r, `${at}: corner ${r} is one length`).toMatch(/^-?[\d.]+px$/);
        expect(Math.abs(Number.parseFloat(r) - half), `${at}: corner ${r} = half the cross extent ${half}`).toBeLessThanOrEqual(0.5);
    }
    const fit = await page.evaluate(() => {
        const run = document.querySelector<HTMLElement>(".dock-run.is-active")!;
        const vertical = run.closest(".glass-dock")!.classList.contains("vertical");
        const k = [...run.children] as HTMLElement[];
        const span = vertical
            ? k.at(-1)!.offsetTop + k.at(-1)!.offsetHeight - k[0]!.offsetTop
            : k.at(-1)!.offsetLeft + k.at(-1)!.offsetWidth - k[0]!.offsetLeft;
        return { span, port: vertical ? run.clientHeight : run.clientWidth };
    });
    expect(fit.span, `${at}: every seat shows (${JSON.stringify(fit)})`).toBeLessThanOrEqual(fit.port);
    const run = read.runs.find((r) => r.active)!;
    if (!vertical) expect(run.sw, `${at}: run scrollWidth = clientWidth`).toBe(run.cw);
}

function l1(): void {
    for (const kinds of ["tab:Home,icon,icon,icon,tab:Settings", "icon,icon,icon,icon,icon,icon"]) {
        for (const pos of ["end", "mid"] as const) {
            test(`l1 a cap lifted under a run scrolled to its ${pos} rests round (${kinds})`, async ({ page }) => {
                await page.setViewportSize({ width: 390, height: 800 });
                await openSeats(page, `kinds=${kinds}&maxw=200`);
                expect((await runAt(page)).max, "the capped run overflows").toBeGreaterThan(0);
                await scrollRun(page, pos);
                expect((await runAt(page)).pos, `the run is scrolled off 0`).toBeGreaterThan(0);
                await page.evaluate(() => {
                    document.querySelector<HTMLElement>(".glass-dock")!.style.maxInlineSize = "1000px";
                });
                await page.waitForTimeout(300);
                await expectRoundAtRest(page, `${pos}, 300 ms after the lift`);
                await page.waitForTimeout(1200);
                await expectRoundAtRest(page, `${pos}, 1.5 s after the lift`);
            });
        }
    }

    test("l1 a viewport resize 390 → 844 under a run scrolled to its end rests round", async ({ page }) => {
        await page.setViewportSize({ width: 390, height: 800 });
        await openSeats(page, `kinds=tab:Home,${Array.from({ length: 6 }, () => "icon").join(",")},tab:Settings&maxw=360`);
        await page.evaluate(() => {
            document.querySelector<HTMLElement>(".glass-dock")!.style.maxInlineSize = "calc(100vw - 30px)";
        });
        await settle(page, 400);
        expect((await runAt(page)).max, "the run overflows at 390").toBeGreaterThan(0);
        await scrollRun(page, "end");
        await page.setViewportSize({ width: 844, height: 800 });
        await page.waitForTimeout(300);
        await expectRoundAtRest(page, "844, 300 ms after the resize");
        await page.waitForTimeout(1200);
        await expectRoundAtRest(page, "844, 1.5 s after the resize");
    });

    test("l1 a vertical run's stage grown under a run scrolled to its end rests round", async ({ page }) => {
        await page.setViewportSize({ width: 1280, height: 900 });
        await openSeats(page, `kinds=${Array.from({ length: 8 }, () => "icon").join(",")}&orientation=vertical&stageH=240`);
        expect((await runAt(page)).max, "the vertical run overflows").toBeGreaterThan(0);
        await scrollRun(page, "end");
        await page.evaluate(() => {
            document.querySelector<HTMLElement>('[data-witness="stage"]')!.style.blockSize = "860px";
        });
        await page.waitForTimeout(300);
        await expectRoundAtRest(page, "vertical, 300 ms after the stage grows");
        await page.waitForTimeout(1200);
        await expectRoundAtRest(page, "vertical, 1.5 s after the stage grows");
    });
}

test.describe("critique 6, coarse phone", () => {
    test.use({ hasTouch: true, isMobile: true, viewport: { width: 390, height: 844 } });
    l1();
});

l1();

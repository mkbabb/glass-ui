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
//
// Critique round 10 (critique-10.md), RED on the round-10 tip 932823b85, GREEN after:
//   p2  (Q1) a 1-2 px host change across the fit edge mid-expand: no seat steps at the
//       settle, horizontal and vertical
//   r1  (Q2) a nested group holding the current seat: no seat paints over another, every
//       seat's centre hits it, the run scrolls nothing (RED on v10.1.4 as well)
//   g4  (Q3) the coarse field cell also reads the library's Input (`.field-control`):
//       it floors at 16px
//
// Fix round 10 (inbound-O-186.md, Gregg's sci-report dock), RED on v10.1.4, GREEN after:
//   q1  (O-186) a fit-content static dock under hover on every control, flat and with a
//       nested group, 1440 and 390: one rest corner, half the cross extent, no percentage
//   q2  (O-187) a consumer's nested `.dock-run` group keeps each hovered control's ink
//   q3  (O-187) exactly one `--dock-run` scroll timeline in the dock, the active run's
import { expect, test, type Page } from "@playwright/test";
import { PNG } from "pngjs";

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

/**
 * Whether the pointer hovers (`(hover: hover)`). On a touch phone the seats paint no
 * hover lift at all (O-161, critique 7): a cell that hovers a seat to read the worst case
 * reads the seat at rest there, and asserts it is.
 */
function hovers(page: Page): Promise<boolean> {
    return page.evaluate(() => matchMedia("(hover: hover)").matches);
}

/** No seat scales on hover (11.0): a hovered seat reads its rest scale on every pointer. */
async function expectHoverScale(page: Page, scale: string, what: string): Promise<void> {
    const pointer = (await hovers(page)) ? "a hovering pointer" : "a touch pointer";
    expect(["1", "none"], `${what} paints no hover lift on ${pointer}`).toContain(scale);
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
        await expectHoverScale(
            page,
            await page.locator('[data-witness="Seat 3"]').evaluate((el) => getComputedStyle(el).scale),
            "the trailing seat",
        );
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
        // The library's own Input (`.field-control`, as Textarea and NumberField) holds the
        // same floor (critique 10 Q3: it painted 14px, under iOS Safari's zoom line).
        expect(read.pill, `the Input keeps the no-zoom floor (${JSON.stringify(read)})`).toBeGreaterThanOrEqual(16);
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
    await expectHoverScale(page, String(read.scale), cell);
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
        await expectHoverScale(page, await tab.evaluate((el) => getComputedStyle(el).scale), "the tab");
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
 * under its own content width) holds the fit law: it scrolls at most the ring floor's
 * shortfall (the reserve is the ring alone in 11.0, so there is no room to yield past
 * it), the plate rests round, and the keyboard-focused end seat keeps its whole ring.
 */
function e4(width: number): void {
    test(`e4 at ${width}: a run whose seats all show, capped under its reserve, holds the fit law and keeps the end seat's ring`, async ({
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
        await expectFitting(page, `${width} capped 4 px under ${natural}`);
        expectRestCorner(rest, `${width} capped 4 px under ${natural}`);
        await page.keyboard.press("Shift");
        await page.locator('[data-witness="S3"]').focus();
        await settle(page, 400);
        await expectRingInsideRun(page, "S3", `${width} capped`);
        await expectFitting(page, `${width} capped, S3 focused`);
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
 * k3 (K3): a viewport-capped dock whose seats all show holds the fit law at 320, fine
 * and coarse: it scrolls at most the ring floor's shortfall, the plate rests at four
 * corners of half its block extent, and the keyboard-focused end seats keep their ring.
 */
function k3(): void {
    test("k3 at 320: a capped dock whose seats all show holds the fit law and rests round", async ({ page }) => {
        await page.setViewportSize({ width: 320, height: 800 });
        await openSeats(page, "kinds=tab:Home,icon,icon,tab:Settings");
        const read = await readPlate(page);
        expect(read.w, "the dock is capped by the viewport").toBeGreaterThanOrEqual(316);
        const seats = await page.evaluate(() => {
            const run = document.querySelector<HTMLElement>(".dock-run.is-active")!;
            const k = [...run.children] as HTMLElement[];
            return { span: k.at(-1)!.offsetLeft + k.at(-1)!.offsetWidth - k[0]!.offsetLeft, port: run.clientWidth };
        });
        // In 11.0 the run's port is the ring reserve wider than the layers, 3 px less per
        // side than 10.1.5's, and WebKit's label metrics lay these seats 1 px past it: the
        // run then honestly overflows, and it must scroll exactly what it hides.
        if (seats.span > seats.port) {
            await expectHonestReach(page, `320 rest, the seats overrun the port (${JSON.stringify(seats)})`);
            return;
        }
        await expectFitting(page, "320 rest");
        expectRestCorner(read, "320 rest");
        for (const seat of ["S1", "S4"]) {
            await page.keyboard.press("Shift");
            await page.locator(`[data-witness="${seat}"]`).focus();
            await settle(page, 400);
            await expectRingInsideRun(page, seat, "320 focus");
            const focused = await readPlate(page);
            await expectFitting(page, `320 focus ${seat}`);
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

/* ── m · critique round 7 (docs/release-10.1.5/critique-7.md M1 to M4) ──────────────
   RED on the round-7 tip fd1c2443a (and v10.1.4), GREEN after. They drive the round-7
   harness `release-10-1-5/critic-7.html`, which composes the inbound rows' docks
   (`?kinds=` seats, `?collapse=`, `?backdrop=`, `?ink=`, `?dark=`, `window.__clicks`). */

async function open7(page: Page, query: string): Promise<void> {
    await page.goto(`/tests-visual/release-10-1-5/critic-7.html?${query}`);
    await page.waitForFunction(() => (window as unknown as { __ready?: boolean }).__ready);
    await page.evaluate(() => document.fonts.ready);
    if (test.info().project.use.isMobile) await expectCoarse(page);
    await settle(page);
}

type Dock7 = { expand(): void; collapse(): void };

/** The plate's four corners and box, read every frame for `ms` from now. */
function plateFrames(page: Page, ms: number): Promise<{ w: number; h: number; radii: string[] }[]> {
    return page.evaluate(
        (ms) =>
            new Promise((res) => {
                const out: { w: number; h: number; radii: string[] }[] = [];
                const plate = document.querySelector<HTMLElement>(".glass-dock > .dock-plate")!;
                const t0 = performance.now();
                const step = () => {
                    const cs = getComputedStyle(plate);
                    out.push({
                        w: plate.offsetWidth,
                        h: plate.offsetHeight,
                        radii: [cs.borderTopLeftRadius, cs.borderTopRightRadius, cs.borderBottomRightRadius, cs.borderBottomLeftRadius],
                    });
                    if (performance.now() - t0 < ms) requestAnimationFrame(step);
                    else res(out);
                };
                requestAnimationFrame(step);
            }),
        ms,
    );
}

/** A circle's four corners: one length each, half the plate's shorter extent. */
function expectCircleFrame(f: { w: number; h: number; radii: string[] }, at: string): void {
    const half = Math.min(f.w, f.h) / 2;
    for (const r of f.radii) {
        expect(r, `${at}: corner ${r} is one length (${JSON.stringify(f)})`).toMatch(/^[\d.]+px$/);
        expect(Math.abs(Number.parseFloat(r) - half), `${at}: corner ${r} = half the extent ${half} (${JSON.stringify(f)})`).toBeLessThanOrEqual(0.5);
    }
}

function m1(): void {
    for (const [width, pos] of [[390, "mid"], [390, "end"], [1440, "end"]] as const) {
        test(`m1 at ${width}: a collapse from a run scrolled to its ${pos} seals round`, async ({ page }) => {
            await page.setViewportSize({ width, height: 800 });
            await open7(page, "scene=dock&collapse=closed&maxw=220&kinds=" + encodeURIComponent("tab:Home,icon,icon,icon,icon,icon,icon,icon,tab:Settings"));
            await page.mouse.move(2, 2);
            await page.evaluate(() => (window as unknown as { __dock: Dock7 }).__dock.expand());
            await settle(page, 1500);
            expect((await runAt(page)).max, "the capped run overflows").toBeGreaterThan(0);
            await scrollRun(page, pos);
            expect((await runAt(page)).pos, "the run is scrolled off 0").toBeGreaterThan(0);
            const frames = plateFrames(page, 1600);
            await page.evaluate(() => (window as unknown as { __dock: Dock7 }).__dock.collapse());
            const f = await frames;
            for (const [i, fr] of f.slice(Math.floor(f.length * 0.8)).entries()) expectCircleFrame(fr, `last 20% of the collapse, frame ${i}`);
            await settle(page, 1200);
            expect(await page.evaluate(() => document.querySelector(".glass-dock")!.classList.contains("collapsed"))).toBe(true);
            expectCircleFrame((await plateFrames(page, 0))[0]!, "collapsed, +1.2 s");
            // Expanded again, the run's honest cap returns.
            await page.evaluate(() => (window as unknown as { __dock: Dock7 }).__dock.expand());
            await settle(page, 1500);
            const read = await readPlate(page);
            const sl = (await runAt(page)).pos;
            if (sl > 0) expect(read.radii.some((r) => Math.abs(Number.parseFloat(r) - read.h / 2) > 0.5), `re-expanded at ${sl}: the cut returns (${JSON.stringify(read)})`).toBe(true);
        });
    }
}

/** M2: a vertical run whose seats fit has nothing to scroll; the flag says so too. */
function m2(): void {
    test("m2 a vertical run whose seats fit scrolls at most the ring floor's shortfall, across the fit edge", async ({ page }) => {
        test.setTimeout(240_000);
        await page.setViewportSize({ width: 600, height: 900 });
        const bad: unknown[] = [];
        let fitted = 0;
        for (let stageH = 300; stageH <= 372; stageH += 4) {
            await open7(page, `scene=dock&orientation=vertical&stageH=${stageH}&kinds=icon,icon,icon,icon,icon,icon`);
            await page.mouse.move(590, 890);
            const r = await fitRead(page);
            if (r.span <= r.port) fitted += 1;
            const law = fitLaw(r);
            if (law.length) bad.push({ stageH, law, ...r });
        }
        expect(fitted, "the sweep crosses the fit edge").toBeGreaterThan(2);
        expect(bad, "no row whose seats fit scrolls past the ring floor, and the flag is the span").toEqual([]);
    });
}

/** M4: a run whose one child is a layer group wider than the port rests at 0. */
function m4(): void {
    for (const width of [390, 1440]) {
        test(`m4 at ${width}: a layered overflowing run rests at its start, the leading corner round`, async ({ page }) => {
            await page.setViewportSize({ width, height: 800 });
            await open7(page, "scene=layers&maxw=260");
            await page.mouse.move(2, 2);
            await settle(page, 600);
            const r = await page.evaluate(() => {
                const run = document.querySelector<HTMLElement>(".dock-run")!;
                const plate = document.querySelector<HTMLElement>(".glass-dock > .dock-plate")!;
                const cs = getComputedStyle(plate);
                return { sl: run.scrollLeft, sw: run.scrollWidth, cw: run.clientWidth, h: plate.offsetHeight, lead: [cs.borderTopLeftRadius, cs.borderBottomLeftRadius] };
            });
            expect(r.sw, "the layered run overflows").toBeGreaterThan(r.cw);
            expect(r.sl, `rests at 0 (${JSON.stringify(r)})`).toBe(0);
            for (const c of r.lead) expect(Math.abs(Number.parseFloat(c) - r.h / 2), `leading corner ${c} at rest (${JSON.stringify(r)})`).toBeLessThanOrEqual(0.5);
        });
    }
}

/** M3 · O-157: a static plate paints from the ancestor's veil ink, both themes. */
function m3StaticInk(): void {
    test("m3 O-157 a static-backdrop plate follows --glass-veil-ink, light and dark", async ({ page }) => {
        await page.setViewportSize({ width: 1440, height: 600 });
        for (const dark of ["0", "1"]) {
            const bg: Record<string, string> = {};
            for (const ink of ["", "oklch(55% 0.2 145)", "oklch(55% 0.2 25)"]) {
                await open7(page, `scene=dock&collapse=false&backdrop=static&dark=${dark}&kinds=icon,icon,icon${ink ? "&ink=" + encodeURIComponent(ink) : ""}`);
                bg[ink || "none"] = await page.evaluate(() => {
                    const plate = document.querySelector<HTMLElement>(".glass-dock > .dock-plate")!;
                    const c = document.createElement("canvas");
                    c.width = c.height = 1;
                    const g = c.getContext("2d")!;
                    const cs = getComputedStyle(plate);
                    // The plate's painted ink: its image layer (the veil) over its colour.
                    g.fillStyle = cs.backgroundColor;
                    g.fillRect(0, 0, 1, 1);
                    const m = cs.backgroundImage.match(/linear-gradient\((.+?\)), /);
                    if (m) {
                        g.fillStyle = m[1]!;
                        g.fillRect(0, 0, 1, 1);
                    }
                    return [...g.getImageData(0, 0, 1, 1).data].join(",");
                });
            }
            const [none, green, red] = [bg.none!, bg["oklch(55% 0.2 145)"]!, bg["oklch(55% 0.2 25)"]!];
            expect(new Set([none, green, red]).size, `dark ${dark}: the three inks paint three plates (${JSON.stringify(bg)})`).toBe(3);
            const [gr, gg] = green.split(",").map(Number);
            const [rr, rg] = red.split(",").map(Number);
            expect(gg! - gr!, `dark ${dark}: the green ink greens the plate (${green})`).toBeGreaterThan(rg! - rr!);
            expect(green.endsWith(",255") && red.endsWith(",255"), "the static plate is opaque").toBe(true);
        }
    });
}

/** M3 · O-161: a tap on a coarse pointer leaves no hover paint on a dock seat or the toggle. */
function m3TouchHover(): void {
    test("m3 O-161 a tap leaves no hover paint on the DarkModeToggle or a DockControl", async ({ page }) => {
        await page.setViewportSize({ width: 390, height: 844 });
        await open7(page, "scene=dock&collapse=false&kinds=icon,icon,dmt");
        const look = (id: string) =>
            page.evaluate((id) => {
                const el = document.querySelector<HTMLElement>(`[data-witness="${id}"]`)!;
                const s = getComputedStyle(el);
                return `${s.backgroundColor} ${s.opacity} ${s.scale}`;
            }, id);
        for (const id of ["S3", "S1"]) {
            const before = await look(id);
            await page.locator(`[data-witness="${id}"]`).tap();
            await settle(page, 800);
            expect(await look(id), `${id}: after the tap it paints as at rest`).toBe(before);
        }
    });
}

/** M3 · O-162 and O-177 (Tab): the folded face's ring and its keyboard reopen. */
function m3Summary(): void {
    test("m3 O-162 the folded summary's ring follows the pill after Escape", async ({ page }) => {
        await page.setViewportSize({ width: 1440, height: 800 });
        await open7(page, "scene=dock&collapse=closed&kinds=icon,icon,icon");
        await page.mouse.move(2, 790);
        await page.evaluate(() => (window as unknown as { __dock: Dock7 }).__dock.expand());
        await settle(page, 1300);
        await page.locator('[data-witness="S1"]').focus();
        await page.keyboard.press("Escape");
        await settle(page, 1600);
        const r = await page.evaluate(() => {
            const el = document.activeElement as HTMLElement;
            const s = getComputedStyle(el);
            const plate = document.querySelector<HTMLElement>(".glass-dock > .dock-plate")!;
            return {
                summary: el.classList.contains("dock-layer--summary"),
                fv: el.matches(":focus-visible"),
                collapsed: document.querySelector(".glass-dock")!.classList.contains("collapsed"),
                outline: s.outlineStyle,
                radius: [s.borderTopLeftRadius, s.borderTopRightRadius, s.borderBottomRightRadius, s.borderBottomLeftRadius],
                plate: getComputedStyle(plate).borderTopLeftRadius,
            };
        });
        expect(r.summary && r.fv && r.collapsed, `Escape folds and focus stands on the summary (${JSON.stringify(r)})`).toBe(true);
        expect(r.outline, "the dock's ring, not the UA's").toBe("solid");
        for (const c of r.radius) expect(c, `the ring's corner is the plate's (${JSON.stringify(r)})`).toBe(r.plate);
    });

    test("m3 O-177 Tab onto the folded face expands the dock and lands on a seat", async ({ page }) => {
        await page.setViewportSize({ width: 1440, height: 800 });
        await open7(page, "scene=dock&collapse=closed&kinds=icon,icon,icon");
        await page.mouse.move(2, 790);
        await page.locator("body").focus();
        for (let i = 0; i < 4; i += 1) {
            await page.keyboard.press("Tab");
            if (await page.evaluate(() => !!document.activeElement?.closest(".glass-dock"))) break;
        }
        await settle(page, 1500);
        const r = await page.evaluate(() => ({
            expanded: document.querySelector(".glass-dock")!.classList.contains("expanded"),
            onSeat: !!document.activeElement?.closest(".dock-run [data-witness]"),
            active: (document.activeElement as HTMLElement | null)?.dataset.witness ?? document.activeElement?.className,
        }));
        expect(r.expanded, `Tab expands (${JSON.stringify(r)})`).toBe(true);
        expect(r.onSeat, `focus lands on a seat (${JSON.stringify(r)})`).toBe(true);
    });
}

/** M3 · O-176: a dock mounted open idles shut; again after a remount. */
function m3OpenIdle(): void {
    test("m3 O-176 a collapse=open dock left untouched idles shut, and after a remount", async ({ page }) => {
        test.setTimeout(90_000);
        await page.setViewportSize({ width: 1440, height: 800 });
        await page.mouse.move(2, 790);
        await open7(page, "scene=dock&collapse=open&kinds=tab:Home,icon,icon");
        const collapsed = () => page.evaluate(() => document.querySelector(".glass-dock")!.classList.contains("collapsed"));
        expect(await collapsed(), "mounts open").toBe(false);
        await page.waitForTimeout(6000);
        expect(await collapsed(), "idles shut after DOCK_COLLAPSE_DELAY_MS and the settle").toBe(true);
        await page.evaluate(() => ((window as unknown as { __key: { value: number } }).__key.value += 1));
        await settle(page, 300);
        expect(await collapsed(), "remounts open").toBe(false);
        await page.waitForTimeout(6000);
        expect(await collapsed(), "the remount idles shut").toBe(true);
    });
}

/** M3 · O-177: a press on a seat during the expand activates it exactly once. */
function m3PressMidExpand(): void {
    test("m3 O-177 a press during the expand activates its seat once", async ({ page }) => {
        test.setTimeout(120_000);
        await page.setViewportSize({ width: 1440, height: 800 });
        const coarse = !!test.info().project.use.isMobile;
        const rows: unknown[] = [];
        for (const delay of [0, 100, 240, 480]) {
            await open7(page, "scene=dock&collapse=closed&kinds=tab:Home,icon,icon,icon");
            if (!coarse) await page.mouse.move(2, 790);
            const sum = (await page.locator(".dock-layer--summary").boundingBox())!;
            if (coarse) await page.touchscreen.tap(sum.x + sum.width / 2, sum.y + sum.height / 2);
            else await page.mouse.click(sum.x + sum.width / 2, sum.y + sum.height / 2);
            await page.waitForTimeout(delay);
            const at = await page.evaluate(() => {
                const r = document.querySelector<HTMLElement>('[data-witness="S2"]')!.getBoundingClientRect();
                return { x: r.left + r.width / 2, y: r.top + r.height / 2, morphing: document.querySelector(".glass-dock")!.hasAttribute("data-morphing") };
            });
            if (coarse) await page.touchscreen.tap(at.x, at.y);
            else await page.mouse.click(at.x, at.y);
            await page.waitForTimeout(1500);
            rows.push({ delay, morphing: at.morphing, clicks: await page.evaluate(() => (window as unknown as { __clicks: Record<string, number> }).__clicks.S2 ?? 0) });
        }
        expect(rows.some((r) => (r as { morphing: boolean }).morphing), `a press lands mid-morph (${JSON.stringify(rows)})`).toBe(true);
        for (const r of rows) expect((r as { clicks: number }).clicks, `exactly once (${JSON.stringify(rows)})`).toBe(1);
    });
}

/** M3 · O-167: the dock Slider's dark fill is a calm ink; a drag tracks the pointer. */
function m3DockSlider(): void {
    test("m3 O-167 the dock Slider's fill is a calm ink in dark and its thumb tracks the drag", async ({ page }) => {
        await page.setViewportSize({ width: 1440, height: 800 });
        const kinds = encodeURIComponent("tab:Home,sep,slider,icon,dmt");
        const fill = () =>
            page.evaluate(() => {
                const c = document.createElement("canvas");
                c.width = c.height = 1;
                const g = c.getContext("2d")!;
                g.fillStyle = getComputedStyle(document.querySelector(".slider-range")!).backgroundColor;
                g.fillRect(0, 0, 1, 1);
                return [...g.getImageData(0, 0, 1, 1).data];
            });
        await open7(page, `scene=dock&backdrop=static&collapse=false&dark=1&kinds=${kinds}`);
        const [r, g, b, a] = await fill();
        // No warm stain: a near-neutral ink (channel spread) at a quiet alpha.
        expect(Math.max(r!, g!, b!) - Math.min(r!, g!, b!), `dark fill ${[r, g, b, a]} is neutral`).toBeLessThanOrEqual(16);
        expect(a!, `dark fill ${[r, g, b, a]} is quiet`).toBeLessThanOrEqual(80);
        await open7(page, `scene=dock&backdrop=static&collapse=false&dark=0&step=1&kinds=${kinds}`);
        await page.mouse.move(2, 790);
        if (test.info().project.use.isMobile) return;
        const th = (await page.locator(".slider-thumb").boundingBox())!;
        let x = th.x + th.width / 2;
        const y = th.y + th.height / 2;
        await page.mouse.move(x, y);
        await page.mouse.down();
        const lag: number[] = [];
        for (let i = 0; i < 12; i += 1) {
            x += 4;
            await page.mouse.move(x, y);
            const c = await page.evaluate(() => {
                const t = document.querySelector<HTMLElement>(".slider-thumb")!.getBoundingClientRect();
                return t.left + t.width / 2;
            });
            lag.push(+(x - c).toFixed(2));
        }
        await page.mouse.up();
        // Within the step's rounding (120 steps over the lane): no trailing input step.
        for (const d of lag) expect(Math.abs(d), `thumb centre vs pointer, per move (${lag})`).toBeLessThanOrEqual(1);
    });
}

/** M5 · O-182: in dark no dock casts light past its plate; the shadow is a dark. */
function m5(): void {
    for (const [name, q] of [
        ["horizontal", "collapse=false&kinds=tab:Home,icon,icon,icon"],
        ["vertical", "collapse=false&orientation=vertical&stageH=420&kinds=icon,icon,icon,icon"],
        ["collapsed", "collapse=closed&kinds=icon,icon,icon"],
    ] as const) {
        test(`m5 O-182 ${name}: in dark nothing past the plate is lighter than the ground`, async ({ page }) => {
            for (const width of [390, 1440]) {
                await page.setViewportSize({ width, height: 800 });
                await open7(page, `scene=dock&${q}&dark=1&bg=${encodeURIComponent("var(--background)")}`);
                await page.mouse.move(2, 790);
                // Room for the whole 24 px band inside the page, on the flat ground.
                await page.evaluate(() => {
                    const stage = document.querySelector<HTMLElement>(".glass-dock")!.parentElement!;
                    stage.style.padding = "40px";
                    stage.style.background = "var(--background)";
                });
                await settle(page, 500);
                const pb = await page.evaluate(() => {
                    const r = document.querySelector<HTMLElement>(".glass-dock > .dock-plate")!.getBoundingClientRect();
                    return { x: r.left, y: r.top, w: r.width, h: r.height };
                });
                const B = 24;
                const clip = { x: pb.x - B, y: pb.y - B, width: pb.w + 2 * B, height: pb.h + 2 * B };
                const png = PNG.sync.read(await page.screenshot({ clip, scale: "css" }));
                const lum = (i: number) => 0.2126 * png.data[i]! + 0.7152 * png.data[i + 1]! + 0.0722 * png.data[i + 2]!;
                const ground = lum(0);
                // The plate's own antialiased edge is not the band. The clip's origin is
                // fractional (the plate sits at x 66.59 at 390), and WebKit rounds it where
                // Chromium does not, so that edge pixel lands up to 2 px past the box in
                // the capture: E excludes it by distance, and a halo is anything further out.
                const E = 2;
                let lighter = 0;
                let worst = 0;
                for (let y = 0; y < png.height; y += 1)
                    for (let x = 0; x < png.width; x += 1) {
                        if (x >= B - E && x < png.width - B + E && y >= B - E && y < png.height - B + E) continue;
                        const d = lum((y * png.width + x) * 4) - ground;
                        if (d > 1.5) lighter += 1;
                        worst = Math.max(worst, d);
                    }
                if (process.env.M5_DUMP) (await import("node:fs")).writeFileSync(`${process.env.M5_DUMP}/m5-${name}-${width}-${test.info().project.name}.png`, PNG.sync.write(png));
                expect(lighter, `${name} ${width}: band pixels lighter than the ground ${ground.toFixed(1)} (worst +${worst.toFixed(1)})`).toBe(0);
                const L = await page.evaluate(() => {
                    const read = (bg: string) => {
                        const el = document.createElement("span");
                        el.style.background = bg;
                        document.body.append(el);
                        const c = getComputedStyle(el).backgroundColor;
                        el.remove();
                        const cv = document.createElement("canvas");
                        cv.width = cv.height = 1;
                        const g = cv.getContext("2d")!;
                        g.fillStyle = c;
                        g.fillRect(0, 0, 1, 1);
                        const [r, gg, b] = g.getImageData(0, 0, 1, 1).data;
                        return 0.2126 * r! + 0.7152 * gg! + 0.0722 * b!;
                    };
                    return { shadow: read("var(--shadow-color)"), ground: read("var(--background)") };
                });
                expect(L.shadow, `${name} ${width}: the shadow is no lighter than the ground (${JSON.stringify(L)})`).toBeLessThanOrEqual(L.ground);
            }
        });
    }

    test("m5 O-182 light: the shadow is still the foreground", async ({ page }) => {
        await open7(page, "scene=dock&collapse=false&kinds=icon,icon");
        const same = await page.evaluate(() => {
            const read = (bg: string) => {
                const el = document.createElement("span");
                el.style.background = bg;
                document.body.append(el);
                const c = getComputedStyle(el).backgroundColor;
                el.remove();
                return c;
            };
            return [read("var(--shadow-color)"), read("var(--foreground)")];
        });
        expect(same[0]).toBe(same[1]);
    });
}

function m(): void {
    m1();
    m5();
    m2();
    m4();
    m3StaticInk();
    m3Summary();
    m3OpenIdle();
    m3PressMidExpand();
    m3DockSlider();
}

test.describe("critique 7, coarse phone", () => {
    test.use({ hasTouch: true, isMobile: true, viewport: { width: 390, height: 844 } });
    m();
    m3TouchHover();
});

m();

/* ── n · critique round 8 (docs/release-10.1.5/critique-8.md N1) ─────────────────────
   RED on the round-8 tip 3592aeb0d, GREEN after. */

type SeatFrame = { morphing: boolean; s1: number; s6: number };

/** S1's top and S6's bottom, painted, every frame for `ms` from now. */
function seatFrames(page: Page, ms: number): Promise<SeatFrame[]> {
    return page.evaluate(
        (ms) =>
            new Promise<SeatFrame[]>((res) => {
                const out: SeatFrame[] = [];
                const dock = document.querySelector<HTMLElement>(".glass-dock")!;
                const s1 = document.querySelector<HTMLElement>('[data-witness="S1"]')!;
                const s6 = document.querySelector<HTMLElement>('[data-witness="S6"]')!;
                const t0 = performance.now();
                const step = () => {
                    out.push({
                        morphing: dock.hasAttribute("data-morphing"),
                        s1: s1.getBoundingClientRect().top,
                        s6: s6.getBoundingClientRect().bottom,
                    });
                    if (performance.now() - t0 < ms) requestAnimationFrame(step);
                    else res(out);
                };
                requestAnimationFrame(step);
            }),
        ms,
    );
}

/** N1: the seats of a fitting vertical run hold still where a morph starts and settles. */
function n1(): void {
    test("n1 a fitting vertical dock's seats do not step at the expand's settle or the collapse's start, across the fit edge", async ({
        page,
    }) => {
        test.setTimeout(240_000);
        await page.setViewportSize({ width: 1440, height: 800 });
        const bad: unknown[] = [];
        let yielded = 0;
        for (let stageH = 316; stageH <= 348; stageH += 8) {
            await open7(page, `scene=dock&collapse=closed&orientation=vertical&stageH=${stageH}&kinds=icon,icon,icon,icon,icon,icon`);
            await page.mouse.move(1430, 790);
            const expand = seatFrames(page, 1600);
            await page.evaluate(() => (window as unknown as { __dock: Dock7 }).__dock.expand());
            const e = await expand;
            const pad = await page.evaluate(() => getComputedStyle(document.querySelector(".glass-dock .dock-run")!).paddingTop);
            if (Number.parseFloat(pad) < 6.5) yielded += 1;
            const last = e.findLastIndex((f) => f.morphing);
            expect(last, `${stageH}: the expand morphed and settled`).toBeGreaterThan(0);
            expect(last, `${stageH}: the expand settled`).toBeLessThan(e.length - 1);
            const [a, b] = [e[last]!, e[last + 1]!];
            const settleStep = Math.max(Math.abs(b.s1 - a.s1), Math.abs(b.s6 - a.s6));
            if (settleStep > 0.5) bad.push({ stageH, edge: "expand settle", pad, a, b });

            const collapse = seatFrames(page, 700);
            // The rest frames before the collapse are the baseline its first frame is read against.
            await page.waitForTimeout(100);
            await page.evaluate(() => (window as unknown as { __dock: Dock7 }).__dock.collapse());
            const c = await collapse;
            const firstM = c.findIndex((f) => f.morphing);
            expect(firstM, `${stageH}: the collapse morphed`).toBeGreaterThan(0);
            const [p, q] = [c[firstM - 1]!, c[firstM]!];
            const startStep = Math.max(Math.abs(q.s1 - p.s1), Math.abs(q.s6 - p.s6));
            if (startStep > 0.5) bad.push({ stageH, edge: "collapse start", pad, p, q });
        }
        expect(yielded, "the sweep reaches docks whose reserve yields").toBeGreaterThan(0);
        expect(bad, "seat steps over 0.5 px at a morph's edge").toEqual([]);
    });
}

test.describe("critique 8, coarse phone", () => {
    test.use({ hasTouch: true, isMobile: true, viewport: { width: 390, height: 844 } });
    n1();
});

n1();

/* ── p · critique round 9 (docs/release-10.1.5/critique-9.md P1, P2) ──────────────────
   RED on the round-9 tip 51af0f9b5, GREEN after. The host resizes the dock while it
   expands: the dock's own max inline size (horizontal) or its stage's block size
   (vertical, into the band where the reserve yields), scheduled inside the page at
   110 ms and at 300 ms after the expand. Every seat must hold still where the morph
   settles. A seat's step is read net of the run's scroll, so WebKit's re-snap of a
   shrunk snapport (critique 9 P3, v10.1.4's own) does not enter it. */

/** `over`: the seats' span is longer than the port, the fact `data-run-fits` negates. */
type HostFrame = { morphing: boolean; s1: number; fits: boolean; over: boolean };

function hostResizeFrames(page: Page, at: number, action: string, ms: number): Promise<HostFrame[]> {
    return page.evaluate(
        ({ at, action, ms }) =>
            new Promise<HostFrame[]>((res) => {
                const out: HostFrame[] = [];
                const dock = document.querySelector<HTMLElement>(".glass-dock")!;
                const run = dock.querySelector<HTMLElement>(".dock-run")!;
                const s1 = document.querySelector<HTMLElement>('[data-witness="S1"]')!;
                const v = dock.classList.contains("vertical");
                const t0 = performance.now();
                let done = false;
                (window as unknown as { __dock: Dock7 }).__dock.expand();
                const step = () => {
                    const t = performance.now() - t0;
                    if (!done && t >= at) {
                        done = true;
                        const [kind, px] = action.split(":");
                        const stage = document.querySelector<HTMLElement>('[data-witness="stage"]')!;
                        if (kind === "maxw") dock.style.maxInlineSize = `${px}px`;
                        else if (kind === "pad") stage.style.paddingBlock = `${px}px`;
                        else stage.style.blockSize = `${px}px`;
                    }
                    const r = s1.getBoundingClientRect();
                    out.push({
                        morphing: dock.hasAttribute("data-morphing"),
                        s1: (v ? r.top + run.scrollTop : r.left + run.scrollLeft),
                        fits: dock.hasAttribute("data-run-fits"),
                        over: (() => {
                            // The seats' span against the port: the flag's one fact.
                            const k = [...run.children] as HTMLElement[];
                            const at = (el: HTMLElement) => (v ? el.offsetTop : el.offsetLeft);
                            const end = (el: HTMLElement) => at(el) + (v ? el.offsetHeight : el.offsetWidth);
                            return Math.max(...k.map(end)) - Math.min(...k.map(at)) > (v ? run.clientHeight : run.clientWidth);
                        })(),
                    });
                    if (t < ms) requestAnimationFrame(step);
                    else res(out);
                };
                requestAnimationFrame(step);
            }),
        { at, action, ms },
    );
}

function p1(): void {
    test("p1 a dock its host resizes mid-expand holds every seat at the settle (horizontal clamp, vertical yield band)", async ({
        page,
    }) => {
        test.setTimeout(240_000);
        const coarse = !!test.info().project.use.isMobile;
        if (!coarse) await page.setViewportSize({ width: 1440, height: 800 });
        const wide = encodeURIComponent("tab:Home,icon,icon,icon,icon,icon,icon,tab:Settings");
        const four = encodeURIComponent("tab:Home,icon,icon,icon");
        const cells: [string, string, string][] = [
            ["h-to-220", `scene=dock&collapse=closed&kinds=${wide}`, "maxw:220"],
            ["h4-to-200", `scene=dock&collapse=closed&kinds=${four}`, "maxw:200"],
            [`v-to-${coarse ? 344 : 320}`, "scene=dock&collapse=closed&orientation=vertical&stageH=600&kinds=icon,icon,icon,icon,icon,icon", `stage:${coarse ? 344 : 320}`],
        ];
        const bad: unknown[] = [];
        for (const [cell, query, action] of cells) {
            for (const at of [110, 300]) {
                await open7(page, query);
                if (!coarse) await page.mouse.move(2, 790);
                const fr = await hostResizeFrames(page, at, action, 1800);
                const last = fr.findLastIndex((f) => f.morphing);
                expect(last, `${cell}@${at}: the expand morphed`).toBeGreaterThan(0);
                expect(last, `${cell}@${at}: the expand settled`).toBeLessThan(fr.length - 1);
                const [a, b] = [fr[last]!, fr[last + 1]!];
                const step = Math.abs(b.s1 - a.s1);
                if (step > 0.5) bad.push({ cell, at, edge: "settle", step: +step.toFixed(2), a, b });
                const end = fr.at(-1)!;
                if (end.fits === end.over) bad.push({ cell, at, edge: "rest", flag: end.fits, overflows: end.over });
            }
        }
        expect(bad, "seat steps over 0.5 px at the settle, or a rest flag that is not the layout's truth").toEqual([]);
    });
}

test.describe("critique 9, coarse phone", () => {
    test.use({ hasTouch: true, isMobile: true, viewport: { width: 390, height: 844 } });
    p1();
});

p1();

/* critique round 10 (critique-10.md Q1): a host change of 1 or 2 px across the fit edge,
   mid-expand. Fix 9's 2 px endpoint band held it, so the flag and the reserve moved at
   the settle and every seat stepped 9-11 px there. RED on the round-10 tip 932823b85,
   GREEN after. The fit edge is found at rest by a 1 px sweep: the dock's own max inline
   size (horizontal), its stage's block size (vertical). */
function p2(): void {
    test("p2 a 1-2 px host change across the fit edge mid-expand holds every seat at the settle", async ({ page }) => {
        test.setTimeout(480_000);
        const coarse = !!test.info().project.use.isMobile;
        if (!coarse) await page.setViewportSize({ width: 1440, height: 800 });
        const park = async () => {
            if (!coarse) await page.mouse.move(2, 790);
        };
        const sweep = (vertical: boolean, from: number, to: number) =>
            page.evaluate(
                async ({ vertical, from, to }) => {
                    const dock = document.querySelector<HTMLElement>(".glass-dock")!;
                    const stage = document.querySelector<HTMLElement>('[data-witness="stage"]')!;
                    let edge = Number.NaN;
                    for (let m = from; m >= to; m -= 1) {
                        if (vertical) stage.style.blockSize = `${m}px`;
                        else dock.style.maxInlineSize = `${m}px`;
                        await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));
                        await new Promise((r) => setTimeout(r, 60));
                        if (!dock.hasAttribute("data-run-fits")) break;
                        edge = m;
                    }
                    return edge;
                },
                { vertical, from, to },
            );
        const H = `scene=dock&collapse=closed&kinds=${encodeURIComponent("tab:Home,icon,icon,icon")}`;
        await open7(page, H);
        await park();
        await page.evaluate(() => (window as unknown as { __dock: Dock7 }).__dock.expand());
        await page.waitForTimeout(1300);
        const W = await page.evaluate(() => document.querySelector<HTMLElement>(".glass-dock > .dock-plate")!.offsetWidth);
        const E = await sweep(false, W, W - 60);
        const V = (h: number) => `scene=dock&collapse=closed&orientation=vertical&stageH=${h}&kinds=icon,icon,icon,icon,icon,icon`;
        await open7(page, V(600));
        await park();
        await page.evaluate(() => (window as unknown as { __dock: Dock7 }).__dock.expand());
        await page.waitForTimeout(1300);
        const Ev = await sweep(true, 400, 280);
        expect(Number.isFinite(E) && Number.isFinite(Ev), `fit edges found (E ${E}, Ev ${Ev})`).toBe(true);
        const cells: [string, string, number, number][] = [
            ...([[E, E - 1], [E, E - 2], [E - 1, E + 1], [E - 2, E]] as const).map(
                ([from, to]) => [`h ${from}->${to}`, H, to, from] as [string, string, number, number],
            ),
            ...([[Ev, Ev - 1], [Ev - 1, Ev + 1], [Ev + 6, Ev + 4]] as const).map(
                ([from, to]) => [`v ${from}->${to}`, V(from), to, 0] as [string, string, number, number],
            ),
        ];
        const bad: unknown[] = [];
        // A horizontal cell's starting clamp is written by the page, not the harness's
        // `?maxw=`: the harness binds that as the dock's style, which its re-render on the
        // expand would write back over the host's change.
        for (const [cell, query, to, from] of cells) {
            const vertical = cell.startsWith("v");
            for (const at of [110, 300]) {
                await open7(page, query);
                await park();
                if (from) {
                    await page.evaluate((m) => {
                        document.querySelector<HTMLElement>(".glass-dock")!.style.maxInlineSize = `${m}px`;
                    }, from);
                    await settle(page, 300);
                }
                const fr = await hostResizeFrames(page, at, `${vertical ? "stage" : "maxw"}:${to}`, 1800);
                const last = fr.findLastIndex((f) => f.morphing);
                expect(last, `${cell}@${at}: the expand morphed and settled`).toBeGreaterThan(0);
                expect(last).toBeLessThan(fr.length - 1);
                const [a, b] = [fr[last]!, fr[last + 1]!];
                const step = Math.abs(b.s1 - a.s1);
                if (step > 0.5) bad.push({ cell, at, edge: "settle", step: +step.toFixed(2), a, b });
                const end = fr.at(-1)!;
                if (end.fits === end.over) bad.push({ cell, at, edge: "rest", flag: end.fits, overflows: end.over });
            }
        }
        expect(bad, "seat steps over 0.5 px at the settle, or a rest flag that is not the layout's truth").toEqual([]);
    });
}

test.describe("critique 10, coarse phone", () => {
    test.use({ hasTouch: true, isMobile: true, viewport: { width: 390, height: 844 } });
    p2();
});

p2();

/* ── q · O-186 and O-187 (Gregg, sci-report): a fit-content static dock under hover,
   and a consumer's nested `.dock-run` group ─────────────────────────────────────── */

/** The fit-content static dock at each width: four labelled tabs and two icons at 1440,
 * two and two at 390 (both fit). Flat, the first tab is current (the open seat); `nest`
 * puts the tabs in a consumer's `<div class="dock-run">` with no current tab, as Gregg's
 * group is (its tabs keep their own width there, so the group is not an open seat). */
function gregg(width: number, nest: boolean): string {
    const kinds = width >= 1024
        ? "tab:Overview,tab:Methods,tab:Results,tab:Figures,icon,icon"
        : "tab:Data,tab:Notes,icon,icon";
    return `scene=seats&backdrop=static&current=${nest ? 0 : 1}&nest=${nest ? 1 : 0}&kinds=${encodeURIComponent(kinds)}`;
}

async function hoverSeat(page: Page, i: number): Promise<void> {
    const box = (await page.locator(`[data-witness="S${i}"]`).boundingBox())!;
    await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
}

for (const width of [1440, 390]) {
    test(`q1 O-186 at ${width}: a fit-content static dock under hover on every control keeps one rest corner, half its cross extent, no percentage`, async ({
        page,
    }) => {
        await page.setViewportSize({ width, height: 800 });
        // Every read is banked and judged at the end, so a RED names each path that fails
        // (the rest corner, and each hovered control's lens), not only the first.
        const bad: unknown[] = [];
        const judge = (read: PlateRead, cell: string) => {
            const half = read.h / 2;
            const run = read.runs.find((r) => r.active)!;
            const round = read.radii.every((r) => /^[\d.]+px$/.test(r) && Math.abs(Number.parseFloat(r) - half) <= 0.5);
            if (!round || run.sw !== run.cw) bad.push({ cell, radii: read.radii, half, sw: run.sw, cw: run.cw });
        };
        for (const nest of [false, true]) {
            await open(page, gregg(width, nest));
            await pointerOff(page);
            await settle(page, 200);
            judge(await readPlate(page), `${width} nest=${nest} rest`);
            const n = await page.locator('[data-witness^="S"]').count();
            for (let i = 1; i <= n; i++) {
                await hoverSeat(page, i);
                for (const ms of [150, 700]) {
                    await page.waitForTimeout(ms);
                    judge(await readPlate(page), `${width} nest=${nest} hover S${i} +${ms} ms`);
                }
            }
        }
        expect(bad, "reads whose corner is not one length of half the cross extent, or whose run scrolls").toEqual([]);
    });

    test(`q2 O-187 at ${width}: a nested .dock-run group keeps each hovered control's whole ink`, async ({ page }) => {
        await page.setViewportSize({ width, height: 800 });
        await open(page, gregg(width, true));
        const tabs = await page.locator('[data-witness="nest"] > [data-witness^="S"]').count();
        expect(tabs, "the nested group holds the tabs").toBeGreaterThan(1);
        for (let i = 1; i <= tabs; i++) {
            await hoverSeat(page, i);
            await settle(page, 600);
            const read = await page.evaluate((w) => {
                const seat = document.querySelector<HTMLElement>(`[data-witness="${w}"]`)!;
                const ink = seat.getBoundingClientRect();
                const cut: unknown[] = [];
                for (let el = seat.parentElement; el && !el.classList.contains("glass-dock"); el = el.parentElement) {
                    const cs = getComputedStyle(el);
                    if (cs.overflowX === "visible" && cs.overflowY === "visible") continue;
                    const r = el.getBoundingClientRect();
                    const box = {
                        l: r.left + el.clientLeft,
                        r: r.left + el.clientLeft + el.clientWidth,
                        t: r.top + el.clientTop,
                        b: r.top + el.clientTop + el.clientHeight,
                    };
                    if (ink.left < box.l - 0.5 || ink.right > box.r + 0.5 || ink.top < box.t - 0.5 || ink.bottom > box.b + 0.5)
                        cut.push({ clip: el.className, box, ink: [ink.left, ink.right, ink.top, ink.bottom] });
                }
                return { scale: getComputedStyle(seat).scale, cut };
            }, `S${i}`);
            await expectHoverScale(page, read.scale, `nested S${i}`);
            expect(read.cut, `${width}: nested S${i}'s hover ink inside every clip`).toEqual([]);
        }
    });

    test(`q3 O-187 at ${width}: the plate has exactly one scroll timeline in scope, the visible run's`, async ({ page }) => {
        await page.setViewportSize({ width, height: 800 });
        await open(page, gregg(width, true));
        const named = await page.evaluate(() =>
            [...document.querySelectorAll<HTMLElement>(".glass-dock *")]
                .filter((el) => /--dock-run\b/.test(getComputedStyle(el).scrollTimelineName))
                .map((el) => el.className),
        );
        expect(named.length, `one --dock-run timeline (${JSON.stringify(named)})`).toBe(1);
        expect(named[0], "it is the dock's active run").toMatch(/\bdock-layer--full\b.*\bis-active\b|\bis-active\b.*\bdock-layer--full\b/);
    });
}

/* ── r · critique round 10 (critique-10.md Q2): a consumer's nested group that holds the
   current seat is plain markup, not the run's open seat ─────────────────────────────
   RED on the round-10 tip 932823b85 (the group is sized as one open seat and, no longer
   a scroll container, paints its tabs over the dock's seats) and on v10.1.4 (the group
   scrolls its tabs inside one open seat, so a tab's centre hits nothing). */
function r1(width: number): void {
    test(`r1 Q2 at ${width}: a nested group holding the current seat paints every seat clear of the others, and the run's flag is its layout`, async ({
        page,
    }) => {
        await page.setViewportSize({ width, height: 800 });
        const kinds = width >= 1024
            ? "tab:Overview,tab:Methods,tab:Results,icon,icon"
            : "tab:Data,tab:Notes,icon,icon";
        const bad: unknown[] = [];
        for (const current of [1, 2]) {
            await open(page, `scene=seats&nest=1&current=${current}&kinds=${encodeURIComponent(kinds)}`);
            await pointerOff(page);
            await settle(page, 300);
            const read = await page.evaluate(() => {
                const dock = document.querySelector<HTMLElement>(".glass-dock")!;
                const run = dock.querySelector<HTMLElement>(".dock-layers > .dock-run.is-active")!;
                const seats = [...dock.querySelectorAll<HTMLElement>('[data-witness^="S"]')];
                const boxes = seats.map((s) => s.getBoundingClientRect());
                const overlaps: string[] = [];
                for (let i = 0; i < seats.length; i += 1)
                    for (let j = i + 1; j < seats.length; j += 1) {
                        const a = boxes[i]!, b = boxes[j]!;
                        const main = Math.min(a.right, b.right) - Math.max(a.left, b.left);
                        const cross = Math.min(a.bottom, b.bottom) - Math.max(a.top, b.top);
                        if (main > 1 && cross > 1) overlaps.push(`${seats[i]!.dataset.witness}/${seats[j]!.dataset.witness} ${main.toFixed(1)}`);
                    }
                const misses = seats.flatMap((s, i) => {
                    const b = boxes[i]!;
                    const hit = document.elementFromPoint(b.left + b.width / 2, b.top + b.height / 2);
                    return hit && s.contains(hit) ? [] : [`${s.dataset.witness} hits ${hit?.className ?? "nothing"}`];
                });
                return { overlaps, misses, fits: dock.hasAttribute("data-run-fits"), sw: run.scrollWidth, cw: run.clientWidth };
            });
            const cell = `${width} current=${current}`;
            if (read.overlaps.length || read.misses.length) bad.push({ cell, overlaps: read.overlaps, misses: read.misses });
            if (read.fits !== read.sw <= read.cw) bad.push({ cell, flag: read.fits, sw: read.sw, cw: read.cw });
            if (read.sw > read.cw) bad.push({ cell, scrolls: [read.sw, read.cw] });
        }
        expect(bad, "seats that paint over each other or whose centre misses them, or a run that scrolls or whose flag is not its layout").toEqual([]);
    });
}

r1(1440);

test.describe("fix 10, coarse phone", () => {
    test.use({ hasTouch: true, isMobile: true, viewport: { width: 390, height: 844 } });
    r1(390);
});

/* ── s · critique round 11 (critique-11.md R1-R4) ────────────────────────────────────
   RED on the round-11 tip 1e0f9d879's src, GREEN after. The scenes are critic 11's own
   (`release-10-1-5/critic-11.html`, `o205`, `o201`, `focus`) and critic 7's vertical dock. */
async function open11(page: Page, query: string, ms = 900): Promise<void> {
    await page.goto(`/tests-visual/release-10-1-5/critic-11.html?${query}`);
    await page.waitForFunction(() => (window as unknown as { __ready?: boolean }).__ready);
    await page.evaluate(() => document.fonts.ready);
    if (test.info().project.use.isMobile) await expectCoarse(page);
    await settle(page, ms);
}

/** Keyboard focus on a witness: a key press first, so the engine marks it focus-visible. */
async function keyFocus(page: Page, witness: string): Promise<void> {
    await page.keyboard.press("Shift");
    await page.locator(`[data-witness="${witness}"]`).focus();
    await settle(page, 250);
}

/** How far a focused witness's ring lies past each clipping ancestor's padding box, up to the dock. */
function ringPast(page: Page, witness: string) {
    return page.locator(`[data-witness="${witness}"]`).evaluate((el) => {
        const cs = getComputedStyle(el);
        const s = cs.scale === "none" ? 1 : Number.parseFloat(cs.scale);
        const ink = (Number.parseFloat(cs.outlineWidth) + Number.parseFloat(cs.outlineOffset)) * s;
        const r = el.getBoundingClientRect();
        let worst = 0;
        const cuts: string[] = [];
        for (let a = el.parentElement; a && !a.classList.contains("glass-dock"); a = a.parentElement) {
            const acs = getComputedStyle(a);
            if (acs.overflowX === "visible" && acs.overflowY === "visible") continue;
            const b = a.getBoundingClientRect();
            const l = b.left + a.clientLeft, t = b.top + a.clientTop;
            const past = Math.max(l - (r.left - ink), r.right + ink - (l + a.clientWidth), t - (r.top - ink), r.bottom + ink - (t + a.clientHeight));
            if (past > worst) worst = past;
            if (past > 0.5) cuts.push(`${a.className.split(" ")[0]} ${past.toFixed(2)}`);
        }
        return { focusVisible: el.matches(":focus-visible"), outline: cs.outlineStyle, ink: +ink.toFixed(2), worst: +worst.toFixed(2), cuts };
    });
}

/** The active run's scroll extent against its port, the flag, and the plate's corners. */
function runRead(page: Page) {
    return page.evaluate(() => {
        const dock = document.querySelector<HTMLElement>(".glass-dock")!;
        const plate = dock.querySelector<HTMLElement>(":scope > .dock-plate")!;
        const cs = getComputedStyle(plate);
        const half = Math.min(plate.offsetWidth, plate.offsetHeight) / 2;
        const radii = [cs.borderTopLeftRadius, cs.borderTopRightRadius, cs.borderBottomRightRadius, cs.borderBottomLeftRadius];
        return {
            collapsed: dock.classList.contains("collapsed"),
            fits: dock.hasAttribute("data-run-fits"),
            half,
            radii,
            round: radii.every((x) => /^[\d.]+px$/.test(x) && Math.abs(Number.parseFloat(x) - half) <= 0.5),
            runs: [...dock.querySelectorAll<HTMLElement>(".dock-run")].map((run) => ({
                active: run.classList.contains("is-active"),
                sw: run.scrollWidth, cw: run.clientWidth, sh: run.scrollHeight, ch: run.clientHeight,
                sl: Math.round(run.scrollLeft),
            })),
        };
    });
}

/** s1 (R1, O-205): a run's scrollable overflow is exactly the active face's content. */
function s1(width: number): void {
    test(`s1 O-205 at ${width}: no collapsed dock has a scrolling run, and a hidden wider face adds nothing to a fitting run`, async ({ page }) => {
        await page.setViewportSize({ width, height: 844 });
        const bad: unknown[] = [];
        for (const layers of [1, 0]) {
            await open11(page, `scene=o205&collapse=closed&layers=${layers}`, 1500);
            const read = await runRead(page);
            // The idle run's scroll RANGE: a write to its offset lands nowhere. (Its
            // scrollWidth is its content's extent, as on any box that does not scroll.)
            const range = await page.evaluate(() =>
                [...document.querySelectorAll<HTMLElement>(".glass-dock .dock-run")].map((run) => {
                    run.scrollLeft = 60;
                    run.scrollTop = 60;
                    const cs = getComputedStyle(run);
                    return { overflow: `${cs.overflowX} ${cs.overflowY}`, sl: run.scrollLeft, st: run.scrollTop, timeline: cs.scrollTimelineName };
                }),
            );
            const scrolls = range.filter((r) => r.sl !== 0 || r.st !== 0 || r.timeline !== "none");
            if (!read.collapsed || !read.round || scrolls.length) bad.push({ cell: `collapsed layers=${layers}`, ...read, range });
        }
        await open11(page, "scene=o205&collapse=false&layers=1&active=read", 1200);
        await pointerOff(page);
        const rest = await runRead(page);
        const run = rest.runs.find((r) => r.active)!;
        if (!rest.fits || run.sw !== run.cw || !rest.round) bad.push({ cell: "open, narrow face", ...rest });
        // A wheel where the pointer hovers (mobile WebKit has none), and a scroll write in every engine.
        if (await hovers(page)) {
            const box = (await page.locator(".dock-layers > .dock-run.is-active").boundingBox())!;
            await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
            await page.mouse.wheel(240, 0);
            await settle(page, 600);
        }
        await page.evaluate(() => {
            document.querySelector<HTMLElement>(".dock-layers > .dock-run.is-active")!.scrollLeft = 200;
        });
        await settle(page, 300);
        const wheeled = await runRead(page);
        if (wheeled.runs.find((r) => r.active)!.sl !== 0) bad.push({ cell: "open, narrow face, after a wheel", ...wheeled });
        expect(bad, "a collapsed dock whose plate is not round or whose run scrolls, or a fitting run that scrolls a hidden face").toEqual([]);
    });
}

/**
 * The run's fit reading: the flag, the seats' span (layout boxes, through a layer group
 * to its active face), the scroll range, the ring floor of a yielded reserve box, the
 * plate's corners and how many seats lie outside the port.
 */
function fitRead(page: Page) {
    return page.evaluate(() => {
        const dock = document.querySelector<HTMLElement>(".glass-dock")!;
        const vertical = dock.classList.contains("vertical");
        const run = dock.querySelector<HTMLElement>(":where(.dock-layers) > .dock-run.is-active")!;
        const plate = dock.querySelector<HTMLElement>(":scope > .dock-plate")!;
        const cs = getComputedStyle(plate);
        const half = Math.min(plate.offsetWidth, plate.offsetHeight) / 2;
        const radii = [cs.borderTopLeftRadius, cs.borderTopRightRadius, cs.borderBottomRightRadius, cs.borderBottomLeftRadius];
        const kids = [...run.children] as HTMLElement[];
        const at = (el: HTMLElement) => (vertical ? el.offsetTop : el.offsetLeft);
        const ext = (el: HTMLElement) => (vertical ? el.offsetHeight : el.offsetWidth);
        const span = Math.max(...kids.map((k) => at(k) + ext(k))) - Math.min(...kids.map(at));
        const port = vertical ? run.clientHeight : run.clientWidth;
        const range = vertical ? run.scrollHeight - run.clientHeight : run.scrollWidth - run.clientWidth;
        const after = getComputedStyle(run, "::after");
        const ring = Number.parseFloat(vertical ? after.minHeight : after.minWidth) || 0;
        const seats = [...run.querySelectorAll<HTMLElement>("[data-glass-dock-seat]")].filter((x) => !x.closest(".dock-face:not(.is-active)"));
        // How far the seats' layout boxes lie past the port at the run's offset (0 when every seat shows whole).
        const pos = vertical ? run.scrollTop : run.scrollLeft;
        const over = Math.max(0, ...seats.map((x) => {
            let a = 0;
            for (let el: HTMLElement | null = x; el && el !== run; el = el.offsetParent as HTMLElement | null) a += vertical ? el.offsetTop : el.offsetLeft;
            const b = a + (vertical ? x.offsetHeight : x.offsetWidth);
            return Math.max(pos - a, b - (pos + port));
        }));
        return {
            fits: dock.hasAttribute("data-run-fits"), span, port, range, ring, over: +over.toFixed(2), radii,
            round: radii.every((x) => /^[\d.]+px$/.test(x) && Math.abs(Number.parseFloat(x) - half) <= 0.5),
        };
    });
}

/** The fit law a sweep checks at each cap: the flag is the span, and a fitting run scrolls at most the ring floor's shortfall and rests round. */
function fitLaw(r: Awaited<ReturnType<typeof fitRead>>): string[] {
    const bad: string[] = [];
    if (r.fits !== r.span <= r.port) bad.push("flag is not the span");
    if (r.fits && r.range > Math.max(0, r.span + 2 * r.ring - r.port) + 1) bad.push("a fitting run scrolls past the ring floor");
    if (r.fits && !r.round) bad.push("a fitting run's plate is not round");
    // With less than one ring's reach of room the leading box's ring floor leaves the end
    // seat that much short of the port at rest: the bound, exactly, and nothing past it.
    if (r.fits && r.over > Math.max(0, r.ring - (r.port - r.span)) + 0.5) bad.push("a fitting run cuts a seat past the ring floor's shortfall");
    return bad;
}

/**
 * A run whose seats all show (11.0: the reserve is the ring alone, so there is no yield
 * room past the ring floor): the flag is set and the fit law holds, so it scrolls at most
 * the ring floor's shortfall, rests round, and cuts no seat past that bound.
 */
async function expectFitting(page: Page, cell: string): Promise<void> {
    const r = await fitRead(page);
    expect(r.fits, `${cell}: every seat shows (${JSON.stringify(r)})`).toBe(true);
    expect(fitLaw(r), `${cell}: the fit law (${JSON.stringify(r)})`).toEqual([]);
}

/**
 * s2 (O-201): at every cap from natural width to 40 px under it, the first seat's and
 * the end seat's keyboard rings lie inside every clipping ancestor once focus reaches
 * them (value's Home trigger at a layer group face's end, so reach measures the seat
 * inside the group), and the fit law holds.
 */
function s2(width: number): void {
    test(`s2 O-201 at ${width}: at every cap through the fit edge the first and end seats keep their whole ring, and a run that hides nothing rests round`, async ({ page }) => {
        test.setTimeout(420_000);
        await page.setViewportSize({ width, height: 844 });
        await open11(page, "scene=o201&at=end", 1000);
        await pointerOff(page);
        const natural = Math.ceil(await page.evaluate(() => document.querySelector<HTMLElement>(".glass-dock")!.getBoundingClientRect().width));
        const bad: unknown[] = [];
        let unfit = 0;
        for (let cap = natural; cap >= natural - 40; cap -= cap > natural - 20 ? 1 : 4) {
            await page.evaluate((cap) => {
                (document.activeElement as HTMLElement | null)?.blur();
                document.querySelector<HTMLElement>(".glass-dock")!.style.maxInlineSize = `${cap}px`;
            }, cap);
            await settle(page, 150);
            const read = await fitRead(page);
            if (!read.fits) unfit += 1;
            const law = fitLaw(read);
            if (law.length) bad.push({ cap, law, ...read });
            // The end seat, then back to the first from the end's scroll: both reaches.
            for (const seat of ["home", "S1"]) {
                await keyFocus(page, seat);
                await settle(page, 450);
                const ring = await ringPast(page, seat);
                if (!ring.focusVisible || ring.outline === "none" || ring.cuts.length) bad.push({ cap, seat, ...ring });
            }
        }
        expect(unfit, `the sweep under ${natural} crosses the fit edge`).toBeGreaterThan(2);
        expect(bad, "a cap that cuts a focused seat's ring, a flag that is not the span, or a run that hides nothing and does not rest round").toEqual([]);
    });
}

/**
 * t1 (O-201, vertical): critique 10's six-seat vertical dock, its stage swept through the
 * fit edge. At every stage the first seat (focused from the last stage's end scroll) and
 * the last (reached by End) keep their whole ring, except in the vertical yield band: a
 * vertical run yields its block padding to half the room its seats leave, so there a
 * focused end seat's ring may be cut by the ring's reach less that half, and no more
 * (the bound the vertical run keeps in 10.1.5). The fit law holds at every stage.
 */
function t1(): void {
    test("t1 O-201 vertical: through the fit edge the end seats keep their whole ring, bounded in the yield band", async ({ page }) => {
        test.setTimeout(420_000);
        await page.goto("/tests-visual/release-10-1-5/critic-10.html?scene=seats&collapse=false&orientation=vertical&stageH=420&kinds=icon,icon,icon,icon,icon,icon");
        await page.waitForFunction(() => (window as unknown as { __ready?: boolean }).__ready);
        await page.evaluate(() => document.fonts.ready);
        if (test.info().project.use.isMobile) await expectCoarse(page);
        await settle(page, 1000);
        await page.mouse.move(page.viewportSize()!.width - 5, 5);
        const bad: unknown[] = [];
        let unfit = 0;
        for (let stage = 360; stage >= 296; stage -= 2) {
            await page.evaluate((s) => {
                (document.activeElement as HTMLElement | null)?.blur();
                document.querySelector<HTMLElement>('[data-witness="stage"]')!.style.blockSize = `${s}px`;
            }, stage);
            await settle(page, 150);
            const read = await fitRead(page);
            if (!read.fits) unfit += 1;
            const law = fitLaw(read);
            if (law.length) bad.push({ stage, law, ...read });
            const allowed = (ink: number) => (read.fits ? Math.max(0, ink - (read.port - read.span) / 2) : 0) + 0.5;
            // From the last stage's End scroll: the reach back to the first seat, read at rest.
            await keyFocus(page, "S1");
            await settle(page, 450);
            const first = await ringPast(page, "S1");
            if (!first.focusVisible || first.outline === "none" || first.worst > allowed(first.ink)) bad.push({ stage, seat: "S1", ...first });
            await page.keyboard.press("End");
            await settle(page, 400);
            const last = await ringPast(page, "S6");
            if (!last.focusVisible || last.outline === "none" || last.worst > allowed(last.ink)) bad.push({ stage, seat: "S6", ...last });
        }
        expect(unfit, "the sweep crosses the fit edge").toBeGreaterThan(2);
        expect(bad, "a stage that cuts a focused end seat's ring past the yield band's bound, or a run that breaks the fit law").toEqual([]);
    });
}

s1(1440);
s2(1440);

test.describe("fix 11, coarse phone", () => {
    test.use({ hasTouch: true, isMobile: true, viewport: { width: 390, height: 844 } });
    s1(390);
    s2(390);
});

test.describe("fix 12, desktop", () => {
    test.use({ viewport: { width: 1440, height: 900 } });
    t1();
});

test.describe("fix 12, coarse phone", () => {
    test.use({ hasTouch: true, isMobile: true, viewport: { width: 390, height: 844 } });
    t1();
});

test("s3 O-207 G3 a disclosure trigger's keyboard ring is the house outline, whatever it composes", async ({ page }) => {
    const bad: unknown[] = [];
    for (const dark of [0, 1]) {
        await open11(page, `scene=focus&dark=${dark}`, 500);
        for (const witness of ["card-trigger", "plain-trigger", "accordion"]) {
            await keyFocus(page, witness);
            const read = await page.locator(`[data-witness="${witness}"]`).evaluate((el) => {
                const cs = getComputedStyle(el);
                const alpha = /\/\s*([\d.]+)\s*\)$/.exec(cs.outlineColor);
                return { fv: el.matches(":focus-visible"), style: cs.outlineStyle, width: cs.outlineWidth, alpha: alpha ? Number(alpha[1]) : 1 };
            });
            if (!read.fv || read.style !== "solid" || read.width !== "2px" || read.alpha < 0.45) bad.push({ dark, witness, ...read });
        }
    }
    expect(bad, "a disclosure trigger whose focus ring is not the house outline (2px, the perimeter ink)").toEqual([]);
});

/** s4 (R4): a host that moves only its padding across the fit edge mid-expand moves the endpoint where the morph carries it. */
test("s4 a host padding change across the fit edge mid-expand holds every seat at the settle (vertical)", async ({ page }) => {
    test.setTimeout(300_000);
    await page.setViewportSize({ width: 1440, height: 800 });
    const V = (h: number) => `scene=dock&collapse=closed&orientation=vertical&stageH=${h}&kinds=icon,icon,icon,icon,icon,icon`;
    const park = () => page.mouse.move(1430, 790);
    await open7(page, V(600));
    await park();
    await page.evaluate(() => (window as unknown as { __dock: Dock7 }).__dock.expand());
    await page.waitForTimeout(1300);
    const Ev = await page.evaluate(async () => {
        const dock = document.querySelector<HTMLElement>(".glass-dock")!;
        const stage = document.querySelector<HTMLElement>('[data-witness="stage"]')!;
        let edge = Number.NaN;
        for (let m = 400; m >= 280; m -= 1) {
            stage.style.blockSize = `${m}px`;
            await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));
            await new Promise((r) => setTimeout(r, 60));
            if (!dock.hasAttribute("data-run-fits")) break;
            edge = m;
        }
        return edge;
    });
    expect(Number.isFinite(Ev), `the fit edge is found (${Ev})`).toBe(true);
    const bad: unknown[] = [];
    for (const [stageH, pad] of [[Ev, 16.5], [Ev, 17], [Ev - 1, 15], [Ev - 2, 15]] as const)
        for (const at of [110, 300]) {
            await open7(page, V(stageH));
            await park();
            const fr = await hostResizeFrames(page, at, `pad:${pad}`, 1800);
            const last = fr.findLastIndex((f) => f.morphing);
            expect(last, `${stageH} pad ${pad} @${at}: the expand morphed and settled`).toBeGreaterThan(0);
            expect(last).toBeLessThan(fr.length - 1);
            const step = Math.abs(fr[last + 1]!.s1 - fr[last]!.s1);
            if (step > 0.5) bad.push({ stageH, pad, at, step: +step.toFixed(2) });
            const end = fr.at(-1)!;
            if (end.fits === end.over) bad.push({ stageH, pad, at, flag: end.fits, overflows: end.over });
        }
    expect(bad, "seat steps over 0.5 px at the settle, or a rest flag that is not the layout's truth").toEqual([]);
});

/* ── u · fix round 13 (docs/release-10.1.5/fix-13.md, critique 13 T1) ─────────────────
   A collapsing run keeps the scroll it painted. n1's 332 px stage on a coarse pointer (a
   vertical run 20 px short of fitting, at rest at 0): between the swap and the arm the root
   lays out once unreserved, the leaving run's port grows and shrinks back, and WebKit
   re-snapped it to its end on the first morph frame in about 1 collapse in 5 (every seat
   20 px). Read as n1 reads it, many times over, with the run's own scroll beside it. */
test.describe("fix 13, coarse phone", () => {
    test.use({ hasTouch: true, isMobile: true, viewport: { width: 390, height: 844 } });
    test("u1 a collapsing vertical run that does not fit keeps its scroll on the first morph frame", async ({ page }) => {
        test.setTimeout(240_000);
        await page.setViewportSize({ width: 1440, height: 800 });
        const bad: unknown[] = [];
        const N = Number(process.env.U1_N ?? 16);
        for (let i = 0; i < N; i += 1) {
            await open7(page, "scene=dock&collapse=closed&orientation=vertical&stageH=332&kinds=icon,icon,icon,icon,icon,icon");
            await page.mouse.move(1430, 790);
            await page.evaluate(() => (window as unknown as { __dock: Dock7 }).__dock.expand());
            await page.waitForTimeout(1600);
            const range = await page.evaluate(() => {
                const run = document.querySelector<HTMLElement>(".glass-dock .dock-run")!;
                return run.scrollHeight - run.clientHeight;
            });
            expect(range, "the run does not fit, so it has a scroll range").toBeGreaterThan(8);
            const frames = page.evaluate(
                () =>
                    new Promise<{ morphing: boolean; s1: number; st: number }[]>((res) => {
                        const out: { morphing: boolean; s1: number; st: number }[] = [];
                        const dock = document.querySelector<HTMLElement>(".glass-dock")!;
                        const run = dock.querySelector<HTMLElement>(".dock-run")!;
                        const s1 = document.querySelector<HTMLElement>('[data-witness="S1"]')!;
                        const t0 = performance.now();
                        const step = () => {
                            out.push({ morphing: dock.hasAttribute("data-morphing"), s1: s1.getBoundingClientRect().top, st: run.scrollTop });
                            if (performance.now() - t0 < 400) requestAnimationFrame(step);
                            else res(out);
                        };
                        requestAnimationFrame(step);
                    }),
            );
            await page.waitForTimeout(100);
            await page.evaluate(() => (window as unknown as { __dock: Dock7 }).__dock.collapse());
            const c = await frames;
            const m = c.findIndex((f) => f.morphing);
            expect(m, "the collapse morphed").toBeGreaterThan(0);
            const [p, q] = [c[m - 1]!, c[m]!];
            if (q.st !== p.st || Math.abs(q.s1 - p.s1) > 0.5) bad.push({ i, p, q });
        }
        expect(bad, "collapse starts whose run scrolled or whose first seat stepped").toEqual([]);
    });
});

/* M3 · O-159 and O-160, read from the source (no browser state). */
test("m3 O-159 the dock README names every DockProps member and no other", async () => {
    const { readFileSync } = await import("node:fs");
    const root = new URL("../src/components/dock/", import.meta.url);
    const props = readFileSync(new URL("composables/useDockShellProps.ts", root), "utf8");
    const body = props.slice(props.indexOf("export interface DockProps {"), props.indexOf("/** The resolved shell-prop"));
    const members = [...body.matchAll(/^ {4}(\w+)\?:/gm)].map((m) => m[1]).sort();
    const readme = readFileSync(new URL("README.md", root), "utf8");
    const table = readme.slice(readme.indexOf("## GlassDock props"), readme.indexOf("## Slots"));
    const named = [...table.matchAll(/^\| `(\w+)` \|/gm)].map((m) => m[1]).sort();
    expect(named).toEqual(members);
    const delay = readFileSync(new URL("constants.ts", root), "utf8").match(/DOCK_COLLAPSE_DELAY_MS = (\d+)/)![1];
    expect(readme, "the idle window is the constant's").toContain(`(${delay} ms)`);
});

test("m3 O-160 no cut-cap or clip keyframe carries a percentage radius", async () => {
    const { readFileSync } = await import("node:fs");
    const css = readFileSync(new URL("../src/components/dock/styles/run.css", import.meta.url), "utf8");
    const frames = [...css.matchAll(/@keyframes (gl-dock-(?:cap|clip)-[\w-]+) \{([\s\S]*?)\n\}/g)];
    expect(frames.length).toBe(8);
    for (const [, name, body] of frames) {
        for (const decl of body!.matchAll(/radius:\s*([^;]+);/g)) expect(decl[1], `${name}`).not.toMatch(/%/);
    }
});

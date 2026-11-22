// glass-ui 11.0.2 witnesses. Engines: `chromium-headless-new`, `coarse-touch`, and
// `webkit` on Playwright WebKit 2287 (`release-11-0-2.config.ts`, under `guarded
// --exclusive webkit`).
//
//   dark   `useGlobalDark({ storageKey })` reads and writes the key the `<head>` script
//          reads, and with an `initialValue` a toggle stores the concrete mode
//   press  under `prefers-reduced-motion: reduce`, a quick press on a seat of an open
//          dock's active layer lands its click on that seat, by mouse and by touch
//          (daraksha's glass-only repro `dock-press-scroll`, ported to `src/`)
//   edge   a GlassDock page opens and stays alive in unshimmed Playwright WebKit (the
//          `webkit-2311` project, the build Playwright resolves), in Chromium the
//          plate edge computes 11.0.0's colour at t = 0, 0.5 and 1, and a host's
//          `--dock-plate-expanded-border` and `--dock-plate-collapsed-border` still
//          colour the two ends of the edge, and a host's `--glass-border-dock` colours
//          the expanded end
//   static every control inside a `backdrop-mode="static"` dock, and everything it
//          draws, computes no backdrop-filter at rest, hover, press and active
//   fold   the idle fold of an untouched `collapse="open"` dock on a scrolling page lays
//          out once per frame of its morph (Chromium, which counts layouts)
//   fill   in dark a hovered, pressed or selected dock seat paints lighter than the
//          plate, on a static and a live dock; the light scheme's fills are the plate
//          rungs
//   blob   from 100 ms after a sweep and release over the hero blob the body stays a
//          bead: in every sampled frame its centre is painted and the canvas box's four
//          corners show the page ground; through a sweep, a drag and a release, every
//          WebGL2 draw keeps the body's reach inside the wrapper's half-width
//   cutcap an open dock whose active layer is narrower than an inactive one, with a
//          #persistent-end seat and `--radius-dock: 1.875rem`, paints four equal plate
//          corners (daraksha's glass-only repro `dock-cutcap`, ported to `src/`)
//   slider a scrubber's thumb reads on the track it sits in and the fill it ends, at 0,
//          50 and 100, light and dark, default and violet ink (luma at least 60 from the
//          fill and 30 from the track); the thumb paints `--foreground` with
//          `--slider-thumb-bg` unset, and the token when it is set
//   lens   a slow held drag on a default Slider, on a card with a backdrop-filter,
//          mounts no lens and no frost, leaves the row's opacity at 1 and paints the
//          track's unfilled end as it was at rest
//   pager  a PagerDots neighbour hop paints a neck no wider than the pitch plus one dot;
//          on eight dots and the library's rem token, a hop of 1, 3 or 7 paints a neck no
//          wider than the hop plus one dot
//   wheel  a vertical wheel over a horizontal dock's overflowing run scrolls the page; each
//          run contains overscroll on its own scroll axis only
//   rail   a start-anchored vertical dock whose consumer yields its open content on the
//          collapsed face: the close holds its top edge and crest and ends on the disc;
//          the open holds the crest from its first frame and keeps the foot in the plate
//   radius every dock seat (dropdown trigger, tab, labelled and icon control) rounds its
//          hover, open and active plate with a corner of half the seat's block size: in a
//          screenshot each corner of the plate leaves the area that corner leaves
//   geometry  a Slider's thumb is a circle of the band's height, on the line between the
//          end caps' centres, concentric with the fill's end cap; the fill is the band's
//          height (every size, both orientations, inverted, RTL, the spectrum's ring, at
//          0, 1, 5, 25, 50, 95, 99 and 100)
//   hover  every seat type, both orientations, every shape, expanded and collapsed: the
//          dock's box is unchanged to 0 px in every frame of each seat's hover in and out
//   transition  a control slotted into a dock's run keeps the transition it declares
//          and its hover tween runs; the dock's icon control keeps its hover legs
//   hold   a click Popover with `keep-dock-open` in the dock's own slot content holds the
//          dock open past the idle window after the pointer leaves, and closes when the
//          dock is collapsed
//   fold   (fold-content) through every frame of an unfold and a fold, a dock's content
//          stays inside the plate's painted box and no item's opacity moves faster
//          than the morph's own progress allows, both orientations, 390 and 1440,
//          light and dark
import { expect, test, type Page } from "@playwright/test";

// W-I.8 RU-104: the coarse projects, Chromium's and WebKit 2287's (webkit-2287.config.ts).
const COARSE = new Set(["coarse-touch", "webkit-touch"]);

type DarkHandle = { stamped: boolean; isDark: () => boolean; toggle: () => void };

async function openDark(page: Page, query: string): Promise<void> {
    await page.goto(`/tests-visual/release-11-0-2/dark-harness.html?${query}`);
    await page.locator("body[data-ready='1']").waitFor({ state: "attached" });
}

const dark = (page: Page) =>
    page.evaluate(() => {
        const d = (window as unknown as { __dark: DarkHandle }).__dark;
        return {
            stamped: d.stamped,
            isDark: d.isDark(),
            htmlDark: document.documentElement.classList.contains("dark"),
            site: localStorage.getItem("site-theme"),
            fallback: localStorage.getItem("vueuse-color-scheme"),
        };
    });

test.describe("dark · useGlobalDark", () => {
    test("dark · a fresh key opens on initialValue while the default key holds auto", async ({ page }) => {
        await page.emulateMedia({ colorScheme: "light" });
        await page.goto("/tests-visual/release-11-0-2/dark-harness.html");
        await page.evaluate(() => {
            localStorage.clear();
            localStorage.setItem("vueuse-color-scheme", "auto");
        });
        await openDark(page, "key=site-theme&initial=dark");
        await page.waitForTimeout(50);
        const r = await dark(page);
        expect(r.stamped).toBe(true);
        expect(r.isDark).toBe(true);
        expect(r.htmlDark).toBe(true);
        expect(r.site).toBe("dark");
        expect(r.fallback).toBe("auto");
    });

    test("dark · night chosen twice on a dark system stays night when the system turns light", async ({ page }) => {
        await page.emulateMedia({ colorScheme: "dark" });
        await page.goto("/tests-visual/release-11-0-2/dark-harness.html");
        await page.evaluate(() => localStorage.clear());
        await openDark(page, "initial=dark");
        await page.evaluate(() => (window as unknown as { __dark: DarkHandle }).__dark.toggle());
        await page.waitForTimeout(50);
        expect((await dark(page)).htmlDark).toBe(false);
        await page.evaluate(() => (window as unknown as { __dark: DarkHandle }).__dark.toggle());
        await page.waitForTimeout(50);
        expect((await dark(page)).fallback).toBe("dark");
        await page.emulateMedia({ colorScheme: "light" });
        await openDark(page, "initial=dark");
        await page.waitForTimeout(50);
        const r = await dark(page);
        expect(r.stamped).toBe(true);
        expect(r.isDark).toBe(true);
        expect(r.htmlDark).toBe(true);
    });
});

type PressHandle = {
    presses: () => Record<string, number>;
    scroller: () => { scrollLeft: number; scrollWidth: number; clientWidth: number } | null;
};

async function openPressDock(page: Page, width: number, touch: boolean): Promise<void> {
    await page.setViewportSize({ width, height: 900 });
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/tests-visual/release-11-0-2/press-harness.html");
    await page.locator(".press-dock").waitFor();
    await page.evaluate(() => document.fonts.ready);
    await page.waitForTimeout(800);
    const summary = page.locator('[aria-label$="open the dock"]').first();
    if (touch) await summary.tap();
    else await summary.hover();
    await page.waitForTimeout(900);
    await page.evaluate(() => {
        const log: string[] = [];
        const scrolls: number[] = [];
        Object.assign(window, { __ev: log, __scrolls: scrolls });
        for (const t of ["pointerdown", "pointerup", "click"]) {
            document.addEventListener(
                t,
                (e) => {
                    const el = e.target as Element;
                    log.push(`${t}:${el.closest("[aria-label]")?.getAttribute("aria-label") ?? el.className}`);
                    scrolls.push(document.querySelector<HTMLElement>(".press-dock .dock-layer--full")?.scrollLeft ?? 0);
                },
                true,
            );
        }
    });
}

for (const width of [1440, 390]) {
    test(`press · a quick press on Again lands under reduced motion at ${width}`, async ({ page }, info) => {
        const touch = COARSE.has(info.project.name);
        await openPressDock(page, width, touch);
        const rest = await page.evaluate(() => (window as unknown as { __press: PressHandle }).__press.scroller());
        const seat = page.locator('[aria-label="Again"]');
        if (touch) await seat.tap();
        else await seat.click();
        await page.waitForTimeout(300);
        const after = await page.evaluate(() => {
            const w = window as unknown as { __press: PressHandle; __ev: string[]; __scrolls: number[] };
            return { presses: w.__press.presses(), events: w.__ev, scrolls: w.__scrolls };
        });
        info.annotations.push({ type: "press", description: JSON.stringify({ rest, ...after }) });
        // The seat receives the whole press and its click.
        expect(after.events).toEqual(["pointerdown:Again", "pointerup:Again", "click:Again"]);
        expect(after.presses.Again ?? 0).toBe(1);
        // The active layer fits, so it has no scroll range, rests at 0 and nothing
        // scrolls it during the press.
        expect(rest).not.toBeNull();
        expect(rest!.scrollWidth - rest!.clientWidth).toBeLessThanOrEqual(0);
        expect(rest!.scrollLeft).toBe(0);
        expect(after.scrolls).toEqual([0, 0, 0]);
    });
}

// The Rec. 709 luma (0 to 255) of the scrubber's thumb, and of the fill and the track
// where each shows beside it, read from a screenshot of the track: a square of a fifth of
// the band's height either side of the thumb's centre, of the middle of the fill before
// it and of the middle of the track after it.
async function thumbRead(page: Page, cell: string) {
    const g = await page.locator(`[data-cell="${cell}"]`).evaluate((r) => {
        const t = r.querySelector(".slider-track")!.getBoundingClientRect();
        const b = r.querySelector(".slider-thumb")!.getBoundingClientRect();
        return { t: { x: t.x, y: t.y, w: t.width, h: t.height }, b: { x: b.x, w: b.width } };
    });
    const png = await page.screenshot({ clip: { x: g.t.x, y: g.t.y, width: g.t.w, height: g.t.h }, animations: "disabled" });
    return page.evaluate(
        async ([b64, g]) => {
            const bmp = await createImageBitmap(await (await fetch(`data:image/png;base64,${b64}`)).blob());
            const c = new OffscreenCanvas(bmp.width, bmp.height);
            const x = c.getContext("2d")!;
            x.drawImage(bmp, 0, 0);
            const d = x.getImageData(0, 0, bmp.width, bmp.height).data;
            const s = bmp.width / g.t.w;
            const H = g.t.h;
            const half = Math.max(1, H / 5);
            const box = (cx: number) => {
                let sum = 0;
                let n = 0;
                for (let yy = Math.round((H / 2 - half) * s); yy < Math.round((H / 2 + half) * s); yy++)
                    for (let xx = Math.round((cx - half) * s); xx < Math.round((cx + half) * s); xx++) {
                        const i = (yy * bmp.width + xx) * 4;
                        sum += 0.2126 * d[i]! + 0.7152 * d[i + 1]! + 0.0722 * d[i + 2]!;
                        n++;
                    }
                return sum / n;
            };
            const start = g.b.x - g.t.x;
            const end = start + g.b.w;
            return {
                thumb: box(start + g.b.w / 2),
                fill: start > H ? box(start / 2) : null,
                track: g.t.w - end > H ? box((end + g.t.w) / 2) : null,
            };
        },
        [png.toString("base64"), g] as const,
    );
}

// The thumb fills the band, so at the minimum it covers the fill whole: the value's mark
// at the minimum is the thumb itself. It must read on the track it sits in and on the
// fill it ends, at the floor the Slider's design names: at least 60 of luma from the fill
// and 30 from the track, in both schemes, with the default ink and a violet one.
for (const size of ["sm", "md", "lg"]) {
    test(`slider · a scrubber's thumb reads on its track and its fill at 0, 50 and 100 (${size})`, async ({ page }, info) => {
        const rows: Record<string, unknown>[] = [];
        const fails: string[] = [];
        for (const theme of ["light", "dark"])
            for (const ink of ["default", "violet"])
                for (const value of [0, 50, 100]) {
                    await page.goto(`/tests-visual/release-11-0-2/geometry-harness.html?value=${value}&theme=${theme}`);
                    await page.locator("body[data-ready='1'] [data-cell] .slider-thumb").first().waitFor();
                    if (ink === "violet") await page.addStyleTag({ content: ".glass-slider{--slider-range-bg:oklch(0.55 0.22 300)}" });
                    await page.waitForTimeout(250);
                    const r = await thumbRead(page, `scrubber-${size}-horizontal`);
                    const where = `${theme} ${ink} @${value}`;
                    rows.push({ where, ...r });
                    if (r.fill != null && Math.abs(r.thumb - r.fill) < 60) fails.push(`${where}: thumb ${r.thumb.toFixed(1)} on fill ${r.fill.toFixed(1)}`);
                    if (r.track != null && Math.abs(r.thumb - r.track) < 30) fails.push(`${where}: thumb ${r.thumb.toFixed(1)} on track ${r.track.toFixed(1)}`);
                }
        info.annotations.push({ type: "slider", description: JSON.stringify(rows) });
        expect(fails).toEqual([]);
    });
}

test("slider · the thumb paints --foreground by default and --slider-thumb-bg when set", async ({ page }, info) => {
    await page.goto("/tests-visual/release-11-0-2/slider-harness.html");
    await page.locator("body[data-ready='1']").waitFor({ state: "attached" });
    await page.waitForTimeout(300);
    const r = await page.evaluate(() => {
        const row = document.querySelector<HTMLElement>('[data-row="md"]')!;
        const thumb = row.querySelector(".slider-thumb")!;
        // `--foreground` as this row resolves it, the thumb's paint without the hook.
        const ref = document.createElement("span");
        ref.style.background = "var(--foreground)";
        row.append(ref);
        const ink = getComputedStyle(ref).backgroundColor;
        ref.remove();
        const unset = getComputedStyle(thumb).backgroundColor;
        row.style.setProperty("--slider-thumb-bg", "rgb(200, 30, 60)");
        const set = getComputedStyle(thumb).backgroundColor;
        return { ink, unset, set };
    });
    info.annotations.push({ type: "slider", description: JSON.stringify(r) });
    expect(r.unset).toBe(r.ink);
    expect(r.set).toBe("rgb(200, 30, 60)");
});

test("lens · a slow held drag on a default Slider mounts no lens, keeps the row at opacity 1 and the track painted", async ({ page }, info) => {
    await page.goto("/tests-visual/release-11-0-2/slider-harness.html?plate");
    await page.locator("body[data-ready='1']").waitFor({ state: "attached" });
    await page.waitForTimeout(300);
    const row = page.locator('[data-row="md"]');
    const track = (await row.locator(".slider-track").boundingBox())!;
    const thumb = (await row.locator(".slider-thumb").boundingBox())!;
    // The track's unfilled end, clear of the thumb's travel below.
    const end = { x: Math.round(track.x + track.width - 64), y: Math.round(track.y + 2), width: 48, height: Math.max(2, Math.round(track.height - 4)) };
    const rest = await meanLum(page, await page.screenshot({ clip: end, animations: "disabled" }));
    const x0 = thumb.x + thumb.width / 2;
    const y0 = thumb.y + thumb.height / 2;
    await page.mouse.move(x0, y0);
    await page.mouse.down();
    for (let i = 1; i <= 12; i++) {
        await page.mouse.move(x0 + i * 5, y0);
        await page.waitForTimeout(50);
    }
    await page.waitForTimeout(500);
    const r = await page.evaluate(() => {
        const host = document.querySelector<HTMLElement>('[data-row="md"]')!;
        let opacity = 1;
        for (let el: HTMLElement | null = host.querySelector(".slider-track"); el; el = el.parentElement)
            opacity *= Number(getComputedStyle(el).opacity);
        return {
            held: host.querySelector("[data-held]") !== null,
            lens: document.querySelectorAll(".glass-loupe").length,
            veil: document.querySelectorAll(".glass-focus-veil").length,
            opacity,
        };
    });
    const grasped = await meanLum(page, await page.screenshot({ clip: end, animations: "disabled" }));
    await page.mouse.up();
    const read = { ...r, rest, grasped, change: Math.abs(grasped - rest) / rest };
    info.annotations.push({ type: "lens", description: JSON.stringify(read) });
    expect(r.held, `the drag holds the slider (${JSON.stringify(read)})`).toBe(true);
    expect(r.lens, `no lens on a default Slider (${JSON.stringify(read)})`).toBe(0);
    expect(r.veil, `no frost on a default Slider (${JSON.stringify(read)})`).toBe(0);
    expect(r.opacity, `the row's opacity (${JSON.stringify(read)})`).toBe(1);
    expect(read.change, `the track's unfilled end paints as at rest (${JSON.stringify(read)})`).toBeLessThanOrEqual(0.02);
});

test("edge · a GlassDock page opens and stays alive", async ({ page }, info) => {
    let crashed = false;
    page.on("crash", () => (crashed = true));
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/tests-visual/release-11-0-2/press-harness.html");
    await page.locator(".press-dock .dock-plate").waitFor();
    await page.waitForTimeout(600);
    const summary = page.locator('[aria-label$="open the dock"]').first();
    if (COARSE.has(info.project.name)) await summary.tap();
    else await summary.hover();
    await page.waitForTimeout(1200);
    const border = await page.evaluate(
        () => getComputedStyle(document.querySelector(".press-dock .dock-plate")!).borderTopColor,
    );
    info.annotations.push({ type: "edge", description: JSON.stringify({ crashed, border }) });
    expect(crashed).toBe(false);
    expect(border).toMatch(/\/ 0\.0[5-8]/);
});

test("edge · the plate edge computes 11.0.0's colour at t = 0, 0.5 and 1", async ({ page }, info) => {
    test.skip(info.project.name.startsWith("webkit"), "the 11.0.0 reference form is the one WebKit cannot compute");
    await page.goto("/tests-visual/release-11-0-2/press-harness.html");
    await page.locator(".press-dock .dock-plate").waitFor();
    await page.waitForTimeout(400);
    const rows = await page.evaluate(() => {
        const plate = document.querySelector<HTMLElement>(".press-dock .dock-plate")!;
        // 11.0.0's edge: the dock hairline mixed into the floating one by t, each a
        // translucent mix of the plate's own foreground.
        const ref = document.createElement("span");
        ref.style.cssText =
            "position:absolute;border:1.5px solid color-mix(in srgb, color-mix(in srgb, var(--foreground) 8%, transparent) calc(var(--dock-expand-t) * 100%), color-mix(in srgb, var(--foreground) 5%, transparent))";
        plate.append(ref);
        const nums = (c: string) => (c.match(/[\d.]+/g) ?? []).map(Number);
        const out = [];
        for (const t of [0, 0.5, 1]) {
            plate.style.setProperty("--dock-expand-t", String(t));
            out.push({ t, plate: getComputedStyle(plate).borderTopColor, ref: getComputedStyle(ref).borderTopColor });
        }
        ref.remove();
        plate.style.removeProperty("--dock-expand-t");
        return out.map((r) => ({ ...r, delta: Math.max(...nums(r.plate).map((v, i) => Math.abs(v - (nums(r.ref)[i] ?? NaN)))) }));
    });
    info.annotations.push({ type: "edge", description: JSON.stringify(rows) });
    for (const r of rows) expect(r.delta, `t = ${r.t}: ${r.plate} against ${r.ref}`).toBeLessThan(0.002);
});

// A host that set `--dock-plate-expanded-border` or `--dock-plate-collapsed-border` in
// 11.0.1 still colours that end of the plate's edge: at t = 1 the edge is the expanded
// colour, at t = 0 the collapsed one, and an endpoint the host leaves unset keeps the
// library's edge. Literal colours, so the reading needs no nested mix in any engine.
test("edge · a host's --dock-plate-expanded-border and --dock-plate-collapsed-border still colour the plate edge", async ({ page }, info) => {
    await page.goto("/tests-visual/release-11-0-2/press-harness.html");
    await page.locator(".press-dock .dock-plate").waitFor();
    await page.waitForTimeout(400);
    const r = await page.evaluate(() => {
        const host = document.querySelector<HTMLElement>(".press-dock")!;
        const plate = host.querySelector<HTMLElement>(".dock-plate")!;
        const at = (t: number) => {
            plate.style.setProperty("--dock-expand-t", String(t));
            return getComputedStyle(plate).borderTopColor;
        };
        const reference = (c: string) => {
            const ref = document.createElement("span");
            ref.style.borderTopColor = c;
            document.body.append(ref);
            const v = getComputedStyle(ref).borderTopColor;
            ref.remove();
            return v;
        };
        const library = { collapsed: at(0), expanded: at(1) };
        const red = "rgb(200 0 0 / 0.5)";
        const blue = "rgb(0 0 200 / 0.5)";
        host.style.setProperty("--dock-plate-expanded-border", red);
        host.style.setProperty("--dock-plate-collapsed-border", blue);
        const both = { collapsed: at(0), expanded: at(1) };
        host.style.removeProperty("--dock-plate-collapsed-border");
        const expandedOnly = { collapsed: at(0), expanded: at(1) };
        host.style.removeProperty("--dock-plate-expanded-border");
        host.style.setProperty("--dock-plate-collapsed-border", blue);
        const collapsedOnly = { collapsed: at(0), expanded: at(1) };
        host.style.removeProperty("--dock-plate-collapsed-border");
        plate.style.removeProperty("--dock-expand-t");
        return { library, both, expandedOnly, collapsedOnly, red: reference(red), blue: reference(blue) };
    });
    info.annotations.push({ type: "edge", description: JSON.stringify(r) });
    // rgb() and color(srgb) to 0-255 channels and an alpha, so the two serialisations
    // compare.
    const rgba = (c: string) => {
        const n = (c.match(/-?[\d.]+(e-?\d+)?/g) ?? []).map(Number);
        const k = c.startsWith("color(") ? 255 : 1;
        return [n[0]! * k, n[1]! * k, n[2]! * k, n[3] ?? 1];
    };
    const near = (a: string, b: string, what: string) => {
        const [x, y] = [rgba(a), rgba(b)];
        const d = Math.max(...x.slice(0, 3).map((v, i) => Math.abs(v - y[i]!)), Math.abs(x[3]! - y[3]!) * 255);
        expect(d, `${what}: ${a} against ${b}`).toBeLessThan(1.5);
    };
    near(r.both.expanded, r.red, "both set, t = 1");
    near(r.both.collapsed, r.blue, "both set, t = 0");
    near(r.expandedOnly.expanded, r.red, "expanded set, t = 1");
    near(r.expandedOnly.collapsed, r.library.collapsed, "expanded set, t = 0");
    near(r.collapsedOnly.collapsed, r.blue, "collapsed set, t = 0");
    near(r.collapsedOnly.expanded, r.library.expanded, "collapsed set, t = 1");
});

// A host that sets `--glass-border-dock` colours the expanded end of the plate's edge,
// as in 11.0.1: at t = 1 the edge is the host's colour, at t = 0 the library's collapsed
// edge, and at t = 0.5 their even mix. A translucent `color-mix()` value (the form a
// preset writes) colours the expanded end too, and the page stays alive while the edge
// mixes it at t = 0.5.
test("edge · a host's --glass-border-dock colours the expanded edge", async ({ page }, info) => {
    let crashed = false;
    page.on("crash", () => (crashed = true));
    await page.goto("/tests-visual/release-11-0-2/press-harness.html");
    await page.locator(".press-dock .dock-plate").waitFor();
    await page.waitForTimeout(400);
    const r = await page.evaluate(() => {
        const host = document.querySelector<HTMLElement>(".press-dock")!;
        const plate = host.querySelector<HTMLElement>(".dock-plate")!;
        const at = (t: number) => {
            plate.style.setProperty("--dock-expand-t", String(t));
            return getComputedStyle(plate).borderTopColor;
        };
        const reference = (c: string) => {
            const ref = document.createElement("span");
            ref.style.borderTopColor = c;
            host.append(ref);
            const v = getComputedStyle(ref).borderTopColor;
            ref.remove();
            return v;
        };
        const library = at(0);
        const green = "rgb(0 160 0 / 0.5)";
        host.style.setProperty("--glass-border-dock", green);
        const literal = { collapsed: at(0), half: at(0.5), expanded: at(1) };
        const mix = "color-mix(in srgb, var(--foreground) 55%, transparent)";
        host.style.setProperty("--glass-border-dock", mix);
        const mixed = { expanded: at(1), half: at(0.5), ref: reference(mix) };
        host.style.removeProperty("--glass-border-dock");
        plate.style.removeProperty("--dock-expand-t");
        return { library, literal, mixed, green: reference(green) };
    });
    await page.waitForTimeout(300);
    info.annotations.push({ type: "edge", description: JSON.stringify({ crashed, ...r }) });
    expect(crashed).toBe(false);
    const rgba = (c: string) => {
        const n = (c.match(/-?[\d.]+(e-?\d+)?/g) ?? []).map(Number);
        const k = c.startsWith("color(") ? 255 : 1;
        return [n[0]! * k, n[1]! * k, n[2]! * k, n[3] ?? 1];
    };
    const near = (a: number[], b: number[], what: string) => {
        const d = Math.max(...a.slice(0, 3).map((v, i) => Math.abs(v - b[i]!)), Math.abs(a[3]! - b[3]!) * 255);
        expect(d, `${what}: ${a} against ${b}`).toBeLessThan(1.5);
    };
    // The even mix of two colours in srgb, interpolated premultiplied.
    const half = (x: number[], y: number[]) => {
        const a = (x[3]! + y[3]!) / 2;
        return [...[0, 1, 2].map((i) => (x[i]! * x[3]! + y[i]! * y[3]!) / 2 / a), a];
    };
    near(rgba(r.literal.expanded), rgba(r.green), "literal, t = 1");
    near(rgba(r.literal.collapsed), rgba(r.library), "literal, t = 0");
    near(rgba(r.literal.half), half(rgba(r.green), rgba(r.library)), "literal, t = 0.5");
    near(rgba(r.mixed.expanded), rgba(r.mixed.ref), "mix, t = 1");
    near(rgba(r.mixed.half), half(rgba(r.mixed.ref), rgba(r.library)), "mix, t = 0.5");
});

// A host that sets `--glass-border-floating` colours the folded end of the plate's edge,
// and both ends of a held or a static dock's edge, as in 11.0.1: a live dock's edge is
// the host's colour at t = 0, the library's dock edge at t = 1 and their even mix at
// t = 0.5; a held or a static dock's edge is the host's colour at t = 0 and t = 1. A
// translucent `color-mix()` value (the form a preset writes) colours them too, and the
// page stays alive while the edge mixes it.
test("edge · a host's --glass-border-floating colours the folded edge and a held or static dock's edge", async ({ page }, info) => {
    let crashed = false;
    page.on("crash", () => (crashed = true));
    await page.goto("/tests-visual/release-11-0-2/press-harness.html");
    await page.locator(".press-dock .dock-plate").waitFor();
    await page.waitForTimeout(400);
    const r = await page.evaluate(() => {
        const host = document.querySelector<HTMLElement>(".press-dock")!;
        const plate = host.querySelector<HTMLElement>(".dock-plate")!;
        const at = (t: number) => {
            plate.style.setProperty("--dock-expand-t", String(t));
            return getComputedStyle(plate).borderTopColor;
        };
        const reference = (c: string) => {
            const ref = document.createElement("span");
            ref.style.borderTopColor = c;
            host.append(ref);
            const v = getComputedStyle(ref).borderTopColor;
            ref.remove();
            return v;
        };
        // A held plate eases its border colour; the reads want the computed value.
        plate.style.setProperty("transition", "none");
        // Both ends of a held or a static dock, the attribute set on the root as the
        // dock sets it.
        const pinned = (attr: string, value: string) => {
            host.setAttribute(attr, value);
            const ends = { collapsed: at(0), expanded: at(1) };
            host.removeAttribute(attr);
            return ends;
        };
        const library = at(1);
        const read = (value: string) => {
            host.style.setProperty("--glass-border-floating", value);
            const live = { collapsed: at(0), half: at(0.5) };
            const held = pinned("data-held", "");
            const statik = pinned("data-backdrop-mode", "static");
            host.style.removeProperty("--glass-border-floating");
            return { live, held, statik, ref: reference(value) };
        };
        const literal = read("rgb(200 0 0 / 0.5)");
        const mixed = read("color-mix(in srgb, var(--foreground) 55%, transparent)");
        plate.style.removeProperty("--dock-expand-t");
        plate.style.removeProperty("transition");
        return { library, literal, mixed };
    });
    await page.waitForTimeout(300);
    info.annotations.push({ type: "edge", description: JSON.stringify({ crashed, ...r }) });
    expect(crashed).toBe(false);
    const rgba = (c: string) => {
        const n = (c.match(/-?[\d.]+(e-?\d+)?/g) ?? []).map(Number);
        const k = c.startsWith("color(") ? 255 : 1;
        return [n[0]! * k, n[1]! * k, n[2]! * k, n[3] ?? 1];
    };
    const near = (a: number[], b: number[], what: string) => {
        const d = Math.max(...a.slice(0, 3).map((v, i) => Math.abs(v - b[i]!)), Math.abs(a[3]! - b[3]!) * 255);
        expect(d, `${what}: ${a} against ${b}`).toBeLessThan(1.5);
    };
    // The even mix of two colours in srgb, interpolated premultiplied.
    const half = (x: number[], y: number[]) => {
        const a = (x[3]! + y[3]!) / 2;
        return [...[0, 1, 2].map((i) => (x[i]! * x[3]! + y[i]! * y[3]!) / 2 / a), a];
    };
    for (const [form, v] of [["literal", r.literal], ["mix", r.mixed]] as const) {
        const host = rgba(v.ref);
        near(rgba(v.live.collapsed), host, `${form}, live dock, t = 0`);
        near(rgba(v.live.half), half(rgba(r.library), host), `${form}, live dock, t = 0.5`);
        near(rgba(v.held.collapsed), host, `${form}, held dock, t = 0`);
        near(rgba(v.held.expanded), host, `${form}, held dock, t = 1`);
        near(rgba(v.statik.collapsed), host, `${form}, static dock, t = 0`);
        near(rgba(v.statik.expanded), host, `${form}, static dock, t = 1`);
    }
});

// Every box a static dock's control paints (the control, its descendants and their
// pseudo-elements) with a backdrop-filter other than `none`.
const filtered = (page: Page, label: string) =>
    page.evaluate((label) => {
        const control = document.querySelector(`.static-dock [aria-label="${label}"]`)!;
        const hits: string[] = [];
        for (const el of [control, ...control.querySelectorAll("*")]) {
            for (const pseudo of [null, "::before", "::after"]) {
                const cs = getComputedStyle(el, pseudo);
                const f = cs.backdropFilter || (cs as unknown as { webkitBackdropFilter?: string }).webkitBackdropFilter || "none";
                if (f !== "none") hits.push(`${el.className || el.tagName}${pseudo ?? ""}: ${f}`);
            }
        }
        return hits;
    }, label);

for (const theme of ["light", "dark"]) {
    test(`static · a static dock's controls draw no backdrop-filter (${theme})`, async ({ page }, info) => {
        const touch = COARSE.has(info.project.name);
        await page.goto(`/tests-visual/release-11-0-2/static-harness.html?theme=${theme}`);
        await page.locator("body[data-ready='1'] .static-dock").waitFor();
        await page.waitForTimeout(900);
        const read: Record<string, string[]> = {};
        for (const label of ["Home", "Search", "Motion", "Day", "Week"]) {
            const control = page.locator(`.static-dock [aria-label="${label}"]`);
            read[`${label} rest`] = await filtered(page, label);
            const b = (await control.boundingBox())!;
            if (!touch) {
                await page.mouse.move(b.x + b.width / 2, b.y + b.height / 2);
                await page.waitForTimeout(250);
                read[`${label} hover`] = await filtered(page, label);
            }
            await page.mouse.move(b.x + b.width / 2, b.y + b.height / 2);
            await page.mouse.down();
            await page.waitForTimeout(150);
            read[`${label} press`] = await filtered(page, label);
            await page.mouse.up();
            await page.mouse.move(2, 2);
            await page.waitForTimeout(250);
        }
        const mode = await page.evaluate(() => document.querySelector(".static-dock")!.getAttribute("data-backdrop-mode"));
        const hits = Object.entries(read).filter(([, v]) => v.length);
        info.annotations.push({ type: "static", description: JSON.stringify({ mode, hits }) });
        expect(mode).toBe("static");
        expect(hits).toEqual([]);
    });
}

// The mean relative luminance of a PNG crop, decoded in the page.
async function meanLum(page: Page, png: Buffer): Promise<number> {
    return page.evaluate(async (b64) => {
        const bmp = await createImageBitmap(await (await fetch(`data:image/png;base64,${b64}`)).blob());
        const c = new OffscreenCanvas(bmp.width, bmp.height);
        const g = c.getContext("2d")!;
        g.drawImage(bmp, 0, 0);
        const d = g.getImageData(0, 0, bmp.width, bmp.height).data;
        const lin = (v: number) => ((v /= 255) <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4);
        let sum = 0;
        for (let i = 0; i < d.length; i += 4) sum += 0.2126 * lin(d[i]) + 0.7152 * lin(d[i + 1]) + 0.0722 * lin(d[i + 2]);
        return sum / (d.length / 4);
    }, png.toString("base64"));
}

// A seat's state fill against the plate it sits on, over one flat ground so the live
// plate is the same everywhere. Each read is a band across the middle of the seat just
// under its top edge, clear of the glyph; the plate is the same band of Search at rest.
for (const mode of ["static", "live"]) {
    test(`fill · in dark a hovered, pressed or selected seat lifts the plate (${mode})`, async ({ page }, info) => {
        const touch = COARSE.has(info.project.name);
        await page.goto(`/tests-visual/release-11-0-2/static-harness.html?theme=dark&mode=${mode}&ground=plain`);
        await page.locator("body[data-ready='1'] .static-dock").waitFor();
        await page.mouse.move(2, 2);
        await page.waitForTimeout(900);
        const band = async (label: string) => {
            const b = (await page.locator(`.static-dock [aria-label="${label}"]`).boundingBox())!;
            const clip = { x: b.x + b.width * 0.3, y: b.y + 4, width: b.width * 0.4, height: 4 };
            return meanLum(page, await page.screenshot({ clip, animations: "disabled" }));
        };
        const r: Record<string, number> = {
            plate: await band("Search"),
            selected: await band("Home"),
            selectedTab: await band("Day"),
            restingTab: await band("Week"),
        };
        const b = (await page.locator('.static-dock [aria-label="Search"]').boundingBox())!;
        await page.mouse.move(b.x + b.width / 2, b.y + b.height / 2);
        await page.waitForTimeout(400);
        if (!touch) r.hover = await band("Search");
        await page.mouse.down();
        await page.waitForTimeout(400);
        r.press = await band("Search");
        await page.mouse.up();
        info.annotations.push({ type: "fill", description: JSON.stringify(r) });
        // A lift of at least 0.006 in relative luminance, a quarter of the dark plate's own.
        const lift = 0.006;
        expect(Math.abs(r.restingTab - r.plate), "a resting tab is the plate").toBeLessThan(0.002);
        if (!touch) expect(r.hover - r.plate, "hover").toBeGreaterThan(lift);
        expect(r.press - r.plate, "press").toBeGreaterThan(lift);
        expect(r.selected - r.plate, "selected").toBeGreaterThan(lift);
        expect(r.selectedTab - r.plate, "selected tab").toBeGreaterThan(lift);
    });
}

// W-I.8 RU-92 (RU-94): the guard that O-269's dark change left 11.0.2's light fills alone,
// restated to the ruled light fills. RU-56 and RU-68 made a seat's fills the dock's own ink:
// the hovered seat's computed fill is the dock's computed ink at the hover step, and the
// selected tab's at the current step, each mixed here from the literal ink (6.5 % and 10 % in
// light, S4's steps by RU-94 as folded). Any drift from the ruled steps fails it, the force it had.
const LIGHT_HOVER_STEP = 6.5;
const LIGHT_CURRENT_STEP = 10;
test("fill · the light scheme's seat fills are the dock's ink at the ruled steps", async ({ page }, info) => {
    test.skip(COARSE.has(info.project.name), "hover is a fine-pointer read");
    await page.goto("/tests-visual/release-11-0-2/static-harness.html?theme=light");
    await page.locator("body[data-ready='1'] .static-dock").waitFor();
    await page.waitForTimeout(900);
    const b = (await page.locator('.static-dock [aria-label="Search"]').boundingBox())!;
    await page.mouse.move(b.x + b.width / 2, b.y + b.height / 2);
    await page.waitForTimeout(600);
    const r = await page.evaluate(
        ({ hover, current }) => {
            const dock = document.querySelector<HTMLElement>(".static-dock")!;
            const seat = (label: string) => dock.querySelector<HTMLElement>(`[aria-label="${label}"]`)!;
            // The ink as the seat inherits it, a literal colour, mixed in a span inside the dock.
            const ink = (el: HTMLElement) => {
                const cs = getComputedStyle(el);
                return cs.getPropertyValue("--dock-fg-on-aurora").trim() || cs.getPropertyValue("--foreground").trim();
            };
            const mixed = (el: HTMLElement, pct: number) => {
                const span = document.createElement("span");
                span.style.background = `color-mix(in oklab, ${ink(el)} ${pct}%, transparent)`;
                el.parentElement!.append(span);
                const c = getComputedStyle(span).backgroundColor;
                span.remove();
                return c;
            };
            return {
                ink: ink(seat("Search")),
                hover: getComputedStyle(seat("Search")).backgroundColor,
                hoverRuled: mixed(seat("Search"), hover),
                selectedTab: getComputedStyle(seat("Day")).backgroundColor,
                currentRuled: mixed(seat("Day"), current),
            };
        },
        { hover: LIGHT_HOVER_STEP, current: LIGHT_CURRENT_STEP },
    );
    info.annotations.push({ type: "fill", description: JSON.stringify(r) });
    // Each channel and the alpha within 0.005 of the ruled mix (a colour string's rounding).
    const near = (a: string, b: string) => {
        const n = (c: string) => (c.match(/-?[\d.]+(e-?\d+)?/g) ?? []).map(Number);
        const [x, y] = [n(a), n(b)];
        return x.length === y.length && x.every((v, i) => Math.abs(v - y[i]!) <= 0.005);
    };
    expect(near(r.hover, r.hoverRuled), `hover ${r.hover}, the ink at ${LIGHT_HOVER_STEP} % ${r.hoverRuled}`).toBe(true);
    expect(near(r.selectedTab, r.currentRuled), `selected tab ${r.selectedTab}, the ink at ${LIGHT_CURRENT_STEP} % ${r.currentRuled}`).toBe(true);
});

// The layouts the page runs from 5.4 s to 7.9 s after mount, across the idle fold of an
// untouched `collapse="open"` dock (it folds 6 s after mount) while the page scrolls
// every frame, and the frames in which the fold's morph scalar moved. Chromium counts
// layouts (CDP `LayoutCount`); WebKit has no counter.
test("fold · an idle fold lays out once per morph frame on a scrolling page", async ({ page }, info) => {
    test.skip(info.project.name.startsWith("webkit"), "layouts are counted over CDP");
    await page.setViewportSize({ width: 1440, height: 900 });
    const cdp = await page.context().newCDPSession(page);
    await cdp.send("Performance.enable");
    const layouts = async () =>
        (await cdp.send("Performance.getMetrics")).metrics.find((m) => m.name === "LayoutCount")!.value;
    await page.goto("/tests-visual/release-11-0-2/fold-harness.html");
    await page.locator("body[data-ready='1'] .fold-dock").waitFor();
    await page.waitForTimeout(5400);
    const before = await layouts();
    const r = await page.evaluate(async () => {
        const root = document.querySelector<HTMLElement>(".glass-dock")!;
        let frames = 0;
        let morphFrames = 0;
        let last = root.style.getPropertyValue("--dock-morph-t");
        const end = performance.now() + 2500;
        await new Promise<void>((done) => {
            const tick = () => {
                frames++;
                scrollBy(0, 3);
                const t = root.style.getPropertyValue("--dock-morph-t");
                if (t !== last) morphFrames++;
                last = t;
                if (performance.now() < end) requestAnimationFrame(tick);
                else done();
            };
            requestAnimationFrame(tick);
        });
        return { frames, morphFrames, collapsed: root.classList.contains("collapsed") };
    });
    const count = (await layouts()) - before;
    info.annotations.push({ type: "fold", description: JSON.stringify({ ...r, layouts: count }) });
    expect(r.collapsed).toBe(true);
    expect(r.morphFrames).toBeGreaterThan(10);
    // One layout per morph frame, and a few for the fold's arm and settle.
    expect(count).toBeLessThanOrEqual(r.morphFrames + 12);
});

// A click Popover with `keep-dock-open`, rendered in the dock's own slot content: opened
// from its seat, it holds the dock open past the idle window after the pointer leaves
// both, and it closes when the dock is collapsed.
test("hold · a keep-dock-open Popover in the dock's slot holds it past the idle window and closes with it", async ({ page }, info) => {
    test.setTimeout(60_000);
    const touch = COARSE.has(info.project.name);
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/tests-visual/release-11-0-2/popover-harness.html");
    await page.locator("body[data-ready='1'] .pop-dock .dock-plate").waitFor();
    await page.waitForTimeout(400);
    const state = () =>
        page.evaluate(() => ({
            expanded: document.querySelector(".pop-dock")!.classList.contains("expanded"),
            open: !!document.querySelector(".pop-content"),
        }));
    const summary = page.locator(".pop-dock .dock-layer--summary");
    if (touch) await summary.tap();
    else await summary.hover();
    await page.waitForTimeout(900);
    const share = page.locator('.pop-dock [aria-label="Share"]');
    if (touch) await share.tap();
    else await share.click();
    await page.waitForTimeout(400);
    const opened = await state();
    if (!touch) await page.mouse.move(4, 4);
    await page.waitForTimeout(7500);
    const held = await state();
    await page.evaluate(() => (window as unknown as { __dock: () => { collapse: () => void } }).__dock().collapse());
    await page.waitForTimeout(900);
    const folded = await state();
    info.annotations.push({ type: "hold", description: JSON.stringify({ opened, held, folded }) });
    expect(opened).toEqual({ expanded: true, open: true });
    expect(held, "7.5 s after the pointer left").toEqual({ expanded: true, open: true });
    expect(folded, "after collapse()").toEqual({ expanded: false, open: false });
});

test("static · a live dock's active control keeps its capsule lens", async ({ page }) => {
    await page.goto("/tests-visual/release-11-0-2/static-harness.html?mode=live");
    await page.locator("body[data-ready='1'] .static-dock").waitFor();
    await page.waitForTimeout(600);
    expect(await filtered(page, "Home")).toHaveLength(1);
});

// The body's reach as the GPU draws it: every WebGL2 draw's `uBodyRadius + |uPulseAmp| +
// uNoiseAmp` (canvas UV), read from the uniforms the page uploads, through a 600 ms
// sweep paced one move a frame, a three-stroke drag and its release. The body must stay
// inside the wrapper's half-width, 0.3125 UV; past it the body is cut square by the
// canvas box. WebGPU is hidden so every engine draws on the WebGL2 leg, which reads the
// same breath as the WebGPU one.
test("blob · through a sweep, a drag and a release the body's drawn reach stays inside its box", async ({ page }, info) => {
    await page.addInitScript(() => {
        Object.defineProperty(Navigator.prototype, "gpu", { get: () => undefined, configurable: true });
        const names = new WeakMap<WebGLUniformLocation, string>();
        const live: Record<string, number> = {};
        const w = window as unknown as { __reach: { peak: number; draws: number } };
        w.__reach = { peak: 0, draws: 0 };
        const P = WebGL2RenderingContext.prototype;
        const getLoc = P.getUniformLocation;
        P.getUniformLocation = function (this: WebGL2RenderingContext, prog: WebGLProgram, name: string) {
            const loc = getLoc.call(this, prog, name);
            if (loc) names.set(loc, name);
            return loc;
        };
        const u1f = P.uniform1f;
        P.uniform1f = function (this: WebGL2RenderingContext, loc: WebGLUniformLocation | null, v: number) {
            const n = loc && names.get(loc);
            if (n) live[n] = v;
            return u1f.call(this, loc, v);
        };
        const draw = P.drawArrays;
        P.drawArrays = function (this: WebGL2RenderingContext, ...a: Parameters<WebGL2RenderingContext["drawArrays"]>) {
            if ("uBodyRadius" in live && "uPulseAmp" in live && "uNoiseAmp" in live) {
                w.__reach.peak = Math.max(w.__reach.peak, live.uBodyRadius! + Math.abs(live.uPulseAmp!) + live.uNoiseAmp!);
                w.__reach.draws++;
            }
            return draw.apply(this, a);
        };
    });
    await page.setViewportSize({ width: 800, height: 700 });
    await page.goto("/tests-visual/release-11-0-2/blob-harness.html");
    await page.locator("body[data-ready='1'] .goo-blob-hit").waitFor();
    await page.waitForTimeout(1200);
    const box = (await page.locator(".goo-blob-canvas").boundingBox())!;
    const host = (await page.locator(".blob-host").boundingBox())!;
    const at = (x: number, y: number) => page.mouse.move(host.x + ((x + 1) / 2) * host.width, host.y + ((y + 1) / 2) * host.height);
    const frame = () => page.evaluate(() => new Promise((r) => requestAnimationFrame(() => r(null))));
    const ease = (u: number) => (1 - Math.cos(Math.PI * u)) / 2;
    const rest = await page.evaluate(() => (window as unknown as { __reach: { peak: number; draws: number } }).__reach);
    await at(-0.9, 0.1);
    for (let i = 0; i <= 36; i++) {
        await at(-0.9 + 1.8 * ease(i / 36), 0.1);
        await frame();
    }
    await page.waitForTimeout(400);
    await at(-0.6, -0.2);
    await page.mouse.down();
    for (const [a, b] of [[-0.6, 0.6], [0.6, -0.6], [-0.6, 0.6]] as const) {
        for (let i = 0; i <= 12; i++) {
            await at(a + (b - a) * ease(i / 12), -0.2);
            await frame();
        }
    }
    await page.mouse.up();
    await page.waitForTimeout(600);
    const r = await page.evaluate(() => (window as unknown as { __reach: { peak: number; draws: number } }).__reach);
    info.annotations.push({ type: "blob", description: JSON.stringify({ box, rest, ...r }) });
    expect(r.draws).toBeGreaterThan(rest.draws + 30);
    expect(r.peak).toBeLessThanOrEqual(0.3125 + 1e-4);
});

test("blob · from 100 ms after a sweep and release the body stays a bead, not a filled box", async ({ page }, info) => {
    test.skip(info.project.name !== "chromium-headless-new", "one Chromium cell, as the row asks");
    await page.setViewportSize({ width: 800, height: 700 });
    await page.goto("/tests-visual/release-11-0-2/blob-harness.html");
    await page.locator("body[data-ready='1'] .goo-blob-hit").waitFor();
    await page.waitForTimeout(1500);
    const box = (await page.locator(".goo-blob-canvas").boundingBox())!;
    const cx = box.x + box.width / 2;
    const cy = box.y + box.height / 2;
    // A sweep across the canvas box, as fast as the pointer moves, then a press and
    // release on the body.
    await page.mouse.move(cx - box.width, cy);
    await page.waitForTimeout(800);
    for (let i = 0; i <= 12; i++) {
        await page.mouse.move(cx - box.width * 0.7 + i * box.width * 0.12, cy + Math.sin(i / 2) * box.height * 0.15);
    }
    await page.mouse.move(cx, cy);
    await page.mouse.down();
    await page.mouse.up();
    await page.waitForTimeout(100);
    // Painted share of the centre square and of each corner square (a fifth of the
    // side) against the page ground, in frames from 100 ms to about 500 ms.
    const frames = [];
    for (let i = 0; i < 8; i++) {
        const png = await page.screenshot({ clip: box });
        frames.push(
            await page.evaluate(async (b64) => {
                const bmp = await createImageBitmap(await (await fetch(`data:image/png;base64,${b64}`)).blob());
                const c = new OffscreenCanvas(bmp.width, bmp.height);
                const g = c.getContext("2d")!;
                g.drawImage(bmp, 0, 0);
                const d = g.getImageData(0, 0, bmp.width, bmp.height).data;
                const ground = [d[0]!, d[1]!, d[2]!];
                const k = Math.round(bmp.width / 5);
                const share = (x0: number, y0: number) => {
                    let n = 0;
                    for (let y = y0; y < y0 + k; y++)
                        for (let x = x0; x < x0 + k; x++) {
                            const i = (y * bmp.width + x) * 4;
                            if (Math.abs(d[i]! - ground[0]) + Math.abs(d[i + 1]! - ground[1]) + Math.abs(d[i + 2]! - ground[2]) > 45) n++;
                        }
                    return +(n / (k * k)).toFixed(3);
                };
                const mid = Math.round(bmp.width / 2 - k / 2);
                const far = bmp.width - k - 1;
                return { centre: share(mid, mid), corners: [share(1, 1), share(far, 1), share(1, far), share(far, far)] };
            }, png.toString("base64")),
        );
        await page.waitForTimeout(30);
    }
    info.annotations.push({ type: "blob", description: JSON.stringify(frames) });
    for (const f of frames) {
        expect(f.centre).toBeGreaterThan(0.5);
        for (const c of f.corners) expect(c).toBeLessThan(0.05);
    }
});

for (const width of [1440, 390]) {
    test(`cutcap · the open narrow face with an end seat has four equal plate corners at ${width}`, async ({ page }, info) => {
        const touch = COARSE.has(info.project.name);
        await page.setViewportSize({ width, height: 900 });
        await page.goto("/tests-visual/release-11-0-2/cutcap-harness.html?radius-dock=1.875rem&active=page&end=1");
        await page.locator(".repro-dock .dock-plate").waitFor();
        await page.evaluate(() => document.fonts.ready);
        await page.waitForTimeout(800);
        const summary = page.locator('[aria-label$="open the dock"]').first();
        if (touch) await summary.tap();
        else await summary.hover();
        await page.waitForTimeout(1200);
        const r = await page.evaluate(() => {
            const dock = document.querySelector<HTMLElement>(".repro-dock")!;
            const plate = dock.querySelector<HTMLElement>(".dock-plate")!;
            const cs = getComputedStyle(plate);
            const run = dock.querySelector<HTMLElement>(".dock-run");
            return {
                collapsed: dock.classList.contains("collapsed"),
                corners: [cs.borderTopLeftRadius, cs.borderTopRightRadius, cs.borderBottomRightRadius, cs.borderBottomLeftRadius].map((v) => parseFloat(v)),
                clip: cs.clipPath,
                box: [plate.offsetWidth, plate.offsetHeight],
                runOverflow: run ? run.scrollWidth - run.clientWidth : null,
            };
        });
        info.annotations.push({ type: "cutcap", description: JSON.stringify(r) });
        expect(r.collapsed).toBe(false);
        expect(Math.min(...r.corners)).toBeGreaterThan(0);
        expect(Math.max(...r.corners) - Math.min(...r.corners)).toBeLessThanOrEqual(0.5);
        // A cut cap is drawn by the clip: its rounded inset, if any, is equal on all four.
        const round = /round\s+([^)]*)/.exec(r.clip)?.[1]?.split(/\s+/).map(parseFloat) ?? [];
        if (round.length) expect(Math.max(...round) - Math.min(...round)).toBeLessThanOrEqual(0.5);
    });
}

test("pager · a neighbour hop paints a neck no wider than the pitch plus a dot", async ({ page }, info) => {
    await page.goto("/tests-visual/release-11-0-2/pager-harness.html");
    await page.locator("body[data-ready='1'] [data-witness='pager'] .goo-body").first().waitFor();
    await page.waitForTimeout(400);
    const geo = await page.evaluate(() => {
        const dots = [...document.querySelectorAll<HTMLElement>("[data-witness='pager'] .goo-dot")];
        const body = document.querySelector<HTMLElement>("[data-witness='pager'] .goo-body")!;
        const a = dots[0]!.getBoundingClientRect();
        const b = dots[1]!.getBoundingClientRect();
        return { pitch: b.left - a.left, dot: body.offsetWidth, token: getComputedStyle(body).getPropertyValue("--pager-dot-size").trim() };
    });
    expect(geo.dot).toBeGreaterThan(4);
    const hops: { to: number; frames: number; widest: number }[] = [];
    for (const to of [1, 2, 1, 0]) {
        const widths = await page.evaluate(
            (to) =>
                new Promise<number[]>((resolve) => {
                    const neck = document.querySelector<HTMLElement>("[data-witness='pager'] .goo-neck")!;
                    const out: number[] = [];
                    const t0 = performance.now();
                    const tick = () => {
                        if (getComputedStyle(neck).opacity !== "0") out.push(neck.getBoundingClientRect().width);
                        if (performance.now() - t0 < 700) requestAnimationFrame(tick);
                        else resolve(out);
                    };
                    (window as unknown as { __go: (i: number) => void }).__go(to);
                    requestAnimationFrame(tick);
                }),
            to,
        );
        hops.push({ to, frames: widths.length, widest: widths.length ? Math.max(...widths) : 0 });
    }
    info.annotations.push({ type: "pager", description: JSON.stringify({ geo, hops }) });
    for (const hop of hops) {
        expect(hop.frames, `the neck bridged the hop to ${hop.to}`).toBeGreaterThan(0);
        expect(hop.widest, `token ${geo.token}`).toBeLessThanOrEqual(geo.pitch + geo.dot + 0.5);
    }
});

// Eight dots on the library's rem token (`.75rem`, `.5rem` on a coarse pointer), hops of 1, 3, 3 and 7: in every frame the
// neck paints no wider than the hop's own distance plus one dot.
test("pager · on the default token a hop of 1, 3 or 7 paints a neck no wider than the hop plus a dot", async ({ page }, info) => {
    await page.goto("/tests-visual/release-11-0-2/pager-harness.html?count=8");
    await page.locator("body[data-ready='1'] [data-witness='pager'] .goo-body").first().waitFor();
    await page.waitForTimeout(400);
    const geo = await page.evaluate(() => {
        const dots = [...document.querySelectorAll<HTMLElement>("[data-witness='pager'] .goo-dot")];
        const body = document.querySelector<HTMLElement>("[data-witness='pager'] .goo-body")!;
        const a = dots[0]!.getBoundingClientRect();
        const b = dots[1]!.getBoundingClientRect();
        return { count: dots.length, pitch: b.left - a.left, dot: body.offsetWidth, token: getComputedStyle(body).getPropertyValue("--pager-dot-size").trim() };
    });
    expect(geo.count).toBe(8);
    expect(geo.token, "the library's rem token").toMatch(/rem$/);
    const hops: { from: number; to: number; frames: number; widest: number }[] = [];
    let from = 0;
    for (const to of [1, 4, 7, 0]) {
        const widths = await page.evaluate(
            (to) =>
                new Promise<number[]>((resolve) => {
                    const neck = document.querySelector<HTMLElement>("[data-witness='pager'] .goo-neck")!;
                    const out: number[] = [];
                    const t0 = performance.now();
                    const tick = () => {
                        if (getComputedStyle(neck).opacity !== "0") out.push(neck.getBoundingClientRect().width);
                        if (performance.now() - t0 < 900) requestAnimationFrame(tick);
                        else resolve(out);
                    };
                    (window as unknown as { __go: (i: number) => void }).__go(to);
                    requestAnimationFrame(tick);
                }),
            to,
        );
        hops.push({ from, to, frames: widths.length, widest: widths.length ? Math.max(...widths) : 0 });
        from = to;
    }
    info.annotations.push({ type: "pager", description: JSON.stringify({ geo, hops }) });
    for (const hop of hops) {
        const span = Math.abs(hop.to - hop.from) * geo.pitch;
        expect(hop.frames, `the neck bridged ${hop.from} to ${hop.to}`).toBeGreaterThan(0);
        expect(hop.widest, `${hop.from} to ${hop.to}`).toBeLessThanOrEqual(span + geo.dot + 0.5);
    }
});

test("wheel · a vertical wheel over a horizontal dock's run scrolls the page", async ({ page }, info) => {
    test.skip(COARSE.has(info.project.name), "a wheel is a fine-pointer gesture");
    await page.goto("/tests-visual/release-11-0-2/wheel-harness.html");
    const run = page.locator("body[data-ready='1'] [data-witness='dock'] .dock-run");
    await run.waitFor();
    await page.waitForTimeout(400);
    const css = await run.evaluate((e) => {
        const cs = getComputedStyle(e);
        return { overflow: e.scrollWidth - e.clientWidth, x: cs.overscrollBehaviorX, y: cs.overscrollBehaviorY };
    });
    await run.scrollIntoViewIfNeeded();
    const box = (await run.boundingBox())!;
    await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
    const y0 = await page.evaluate(() => scrollY);
    for (let i = 0; i < 3; i++) {
        await page.mouse.wheel(0, 100);
        await page.waitForTimeout(80);
    }
    await page.waitForTimeout(250);
    const moved = (await page.evaluate(() => scrollY)) - y0;
    info.annotations.push({ type: "wheel", description: JSON.stringify({ css, moved }) });
    expect(css.overflow, "the run is a real scroller").toBeGreaterThan(0);
    expect(moved, "the page moved under the dock").toBeGreaterThan(150);
    expect(css).toMatchObject({ x: "contain", y: "auto" });
});

test("wheel · a vertical dock's run contains its own axis and passes the other", async ({ page }, info) => {
    await page.goto("/tests-visual/release-11-0-2/wheel-harness.html?orientation=vertical");
    const run = page.locator("body[data-ready='1'] [data-witness='dock'] .dock-run");
    await run.waitFor();
    const css = await run.evaluate((e) => {
        const cs = getComputedStyle(e);
        return { x: cs.overscrollBehaviorX, y: cs.overscrollBehaviorY };
    });
    info.annotations.push({ type: "wheel", description: JSON.stringify(css) });
    expect(css).toEqual({ x: "auto", y: "contain" });
});

type Box = [number, number, number, number];
type RailFrame = { morphing: boolean; root: Box; crest: Box; foot: Box | null };

async function openRail(page: Page): Promise<void> {
    await page.goto("/tests-visual/release-11-0-2/rail-harness.html?theme=dark");
    await page.locator("body[data-ready='1'] [data-witness='rail']").waitFor();
    await page.waitForTimeout(400);
}

/** One record per rAF for `ms` after `act` runs. */
function railFrames(page: Page, act: "__expand" | "__collapse", ms: number): Promise<RailFrame[]> {
    return page.evaluate(
        ({ act, ms }) =>
            new Promise<RailFrame[]>((resolve) => {
                const q = (s: string) => document.querySelector<HTMLElement>(`[data-witness="${s}"]`);
                const box = (e: HTMLElement | null): Box | null => {
                    if (!e || !e.getClientRects().length) return null;
                    const r = e.getBoundingClientRect();
                    return [r.left, r.top, r.width, r.height];
                };
                const out: RailFrame[] = [];
                const t0 = performance.now();
                const tick = () => {
                    const root = q("rail")!;
                    out.push({ morphing: root.hasAttribute("data-morphing"), root: box(root)!, crest: box(q("crest"))!, foot: box(q("foot")) });
                    if (performance.now() - t0 < ms) requestAnimationFrame(tick);
                    else resolve(out);
                };
                (window as unknown as Record<string, () => void>)[act]!();
                requestAnimationFrame(tick);
            }),
        { act, ms },
    );
}

test("rail · a start-anchored rail's close holds its top edge and crest, and ends on the disc", async ({ page }, info) => {
    // W-I.8 RU-104: under a coarse pointer the rail rests open (hover: none and no folded face), so it has no close or
    // open to read (MEASURE-9 H4, the rail harness read under coarse touch in both engines).
    test.skip(COARSE.has(info.project.name), "a coarse pointer's rail rests open");
    await openRail(page);
    await page.evaluate(() => (window as unknown as Record<string, () => void>).__expand());
    await page.waitForTimeout(900);
    const rest = await page.evaluate(() => {
        const r = document.querySelector('[data-witness="rail"]')!.getBoundingClientRect();
        return [r.left, r.top, r.width, r.height];
    });
    const frames = await railFrames(page, "__collapse", 900);
    const moving = frames.filter((f) => f.morphing);
    info.annotations.push({ type: "rail", description: JSON.stringify({ rest, frames: frames.map((f) => [f.morphing ? 1 : 0, ...f.root.map(Math.round), Math.round(f.crest[1])]) }) });
    expect(moving.length, "the close is a morph").toBeGreaterThan(6);
    for (const f of frames) {
        expect(Math.abs(f.root[1] - rest[1]!), `root top ${f.root[1]}`).toBeLessThan(1.5);
        expect(f.crest[1] - f.root[1], `crest offset ${f.crest[1]}`).toBeLessThan(20);
        expect(f.crest[1]).toBeGreaterThanOrEqual(f.root[1] - 1.5);
    }
    const bottoms = moving.map((f) => f.root[1] + f.root[3]);
    for (let i = 1; i < bottoms.length; i++) expect(bottoms[i]!).toBeLessThanOrEqual(bottoms[i - 1]! + 1);
    const last = moving.at(-1)!;
    const settled = frames.at(-1)!;
    expect(settled.morphing).toBe(false);
    expect(Math.abs(last.root[3] - settled.root[3])).toBeLessThan(2);
    expect(Math.abs(last.root[1] - settled.root[1])).toBeLessThan(1.5);
});

test("rail · a start-anchored rail's open holds the crest from its first frame, the foot inside the plate", async ({ page }, info) => {
    // W-I.8 RU-104: under a coarse pointer the rail rests open (hover: none and no folded face), so it has no close or
    // open to read (MEASURE-9 H4, the rail harness read under coarse touch in both engines).
    test.skip(COARSE.has(info.project.name), "a coarse pointer's rail rests open");
    await openRail(page);
    const disc = await page.evaluate(() => {
        const r = document.querySelector('[data-witness="crest"]')!.getBoundingClientRect();
        return [r.left, r.top];
    });
    const frames = await railFrames(page, "__expand", 900);
    const moving = frames.filter((f) => f.morphing);
    info.annotations.push({ type: "rail", description: JSON.stringify({ disc, frames: moving.map((f) => [...f.root.map(Math.round), Math.round(f.crest[1]), f.foot ? f.foot.map(Math.round) : null]) }) });
    expect(moving.length, "the open is a morph").toBeGreaterThan(6);
    expect(Math.abs(moving[0]!.crest[1] - disc[1]!)).toBeLessThan(2);
    for (const f of moving) {
        expect(f.crest[1], "crest never above the plate").toBeGreaterThanOrEqual(f.root[1] - 1.5);
        if (f.foot) {
            expect(f.foot[0], "foot never left of the plate").toBeGreaterThanOrEqual(f.root[0] - 1.5);
            expect(f.foot[1], "foot never above the plate").toBeGreaterThanOrEqual(f.root[1] - 1.5);
        }
    }
});

/** Counts "ResizeObserver loop" error events on the page from before it loads. */
async function countRoLoops(page: Page): Promise<void> {
    await page.addInitScript(() => {
        const w = window as unknown as { __roLoops: number };
        w.__roLoops = 0;
        addEventListener("error", (e) => {
            if (/ResizeObserver loop/.test(e.message)) w.__roLoops++;
        });
    });
}
const roLoops = (page: Page) => page.evaluate(() => (window as unknown as { __roLoops: number }).__roLoops);

/** Hovers every visible seat in turn and samples each dock root's box every frame. */
async function hoverHolds(page: Page, info: { annotations: { type: string; description?: string }[] }, query: string): Promise<void> {
    await page.setViewportSize({ width: 1440, height: 900 });
    await countRoLoops(page);
    await page.goto(`/tests-visual/release-11-0-2/hover-harness.html?${query}`);
    await page.locator("body[data-ready='1'] [data-witness='dock'] .dock-plate").first().waitFor();
    await page.evaluate(() => document.fonts.ready);
    await page.mouse.move(8, 8);
    await page.waitForTimeout(1200);
    const kinds = await page.evaluate(() =>
        [...document.querySelectorAll<HTMLElement>("[data-witness^='dock'] [data-seat]")]
            .filter((e) => {
                const r = e.getBoundingClientRect();
                return r.width > 0 && r.height > 0 && !e.closest("[inert]") && getComputedStyle(e).visibility !== "hidden";
            })
            .map((e) => e.dataset.seat!),
    );
    expect(kinds.length).toBeGreaterThan(0);
    const shifts: { seat: string; frames: number; moved: string[] }[] = [];
    for (const kind of kinds) {
        await page.evaluate(() => {
            const roots = [...document.querySelectorAll<HTMLElement>("[data-witness^='dock']")];
            const read = () =>
                roots
                    .map((root) => {
                        const r = root.getBoundingClientRect();
                        return [r.left, r.top, r.width, r.height].map((v) => Math.round(v * 1000) / 1000).join(",");
                    })
                    .join(" ");
            const w = window as unknown as { __frames: string[]; __stop: boolean; __gen: number };
            const gen = (w.__gen = (w.__gen ?? 0) + 1);
            const frames = (w.__frames = [read()]);
            w.__stop = false;
            const tick = () => {
                if (gen !== w.__gen) return;
                frames.push(read());
                if (!w.__stop) requestAnimationFrame(tick);
            };
            requestAnimationFrame(tick);
        });
        const box = (await page.locator(`[data-witness^='dock'] [data-seat='${kind}']`).first().boundingBox())!;
        await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2, { steps: 6 });
        // Past the tooltip's 700 ms open delay, so an opening tooltip is sampled.
        await page.waitForTimeout(1000);
        await page.mouse.move(8, 8, { steps: 6 });
        await page.waitForTimeout(600);
        const frames = await page.evaluate(() => {
            const w = window as unknown as { __frames: string[]; __stop: boolean };
            w.__stop = true;
            return w.__frames;
        });
        const moved = [...new Set(frames.filter((f) => f !== frames[0]))];
        shifts.push({ seat: kind, frames: frames.length, moved: moved.length ? [frames[0]!, ...moved.slice(0, 4)] : [] });
    }
    info.annotations.push({ type: "hover", description: JSON.stringify({ shifts, roLoops: await roLoops(page) }) });
    expect(shifts.filter((s) => s.moved.length), "no seat's hover moves the dock's box").toEqual([]);
    for (const s of shifts) expect(s.frames).toBeGreaterThan(20);
}

for (const orientation of ["horizontal", "vertical"]) {
    for (const shape of ["pill", "rounded", "card"]) {
        for (const posture of ["expanded", "collapsed"]) {
            test(`hover · a ${orientation} ${shape} dock, ${posture}, keeps its box to 0 px through every seat's hover`, async ({ page }, info) => {
                test.skip(COARSE.has(info.project.name), "hover is a fine-pointer state");
                await hoverHolds(page, info, `orientation=${orientation}&shape=${shape}&posture=${posture}`);
            });
        }
    }
}

test("hover · daraksha's pair of fit-content docks keep their boxes to 0 px through every seat's hover", async ({ page }, info) => {
    test.skip(COARSE.has(info.project.name), "hover is a fine-pointer state");
    await hoverHolds(page, info, "site=daraksha");
});

/**
 * The painted corner of a seat's plate, from a screenshot of the seat. The plate is the
 * seat's content box (`background-clip: content-box`) or, with no padding, its border
 * box. In each of its four corners, a square of half the plate's height, the unpainted
 * area is summed from each pixel's coverage between the ground and the plate's fill (its
 * centre row's middle). A corner of radius r on the seat leaves (r − pi)(r − pb)(1 − π/4)
 * there, with pi and pb the inline and block padding; `expected` is that area for r half
 * the seat's block size, and `flat` for the radius the seat computes, which the engine
 * clamps to half the shorter side.
 */
async function plateCorners(page: Page, seat: ReturnType<Page["locator"]>, ground: number[]) {
    const geo = await seat.evaluate((e) => {
        const r = e.getBoundingClientRect();
        const cs = getComputedStyle(e);
        return {
            x: r.left, y: r.top, w: r.width, h: r.height,
            pi: parseFloat(cs.paddingLeft), pb: parseFloat(cs.paddingTop),
            clip: cs.backgroundClip, radius: parseFloat(cs.borderTopLeftRadius),
        };
    });
    const png = await page.screenshot({ clip: { x: geo.x, y: geo.y, width: geo.w, height: geo.h }, scale: "css" });
    return page.evaluate(
        async ({ b64, ground, geo }) => {
            const img = new Image();
            img.src = `data:image/png;base64,${b64}`;
            await img.decode();
            const c = document.createElement("canvas");
            c.width = img.width;
            c.height = img.height;
            const g = c.getContext("2d")!;
            g.drawImage(img, 0, 0);
            const d = g.getImageData(0, 0, c.width, c.height).data;
            const inset = geo.clip === "content-box";
            const pi = inset ? Math.round(geo.pi) : 0;
            const pb = inset ? Math.round(geo.pb) : 0;
            const L = pi, T = pb, W = c.width - 2 * pi, H = c.height - 2 * pb;
            const px = (x: number, y: number) => {
                const i = (y * c.width + x) * 4;
                return [d[i]!, d[i + 1]!, d[i + 2]!];
            };
            const fill = px(L + Math.floor(W / 2), T + Math.floor(H / 2));
            const span = fill.reduce((a, v, k) => a + Math.abs(v - ground[k]!), 0);
            const cover = (x: number, y: number) =>
                Math.min(1, px(x, y).reduce((a, v, k) => a + Math.abs(v - ground[k]!), 0) / Math.max(span, 1));
            const q = Math.floor(H / 2);
            const corner = (x0: number, y0: number, dx: number, dy: number) => {
                let open = 0;
                for (let j = 0; j < q; j++) for (let i = 0; i < q; i++) open += 1 - cover(x0 + dx * i, y0 + dy * j);
                return open;
            };
            const areas = [
                corner(L, T, 1, 1),
                corner(L + W - 1, T, -1, 1),
                corner(L, T + H - 1, 1, -1),
                corner(L + W - 1, T + H - 1, -1, -1),
            ];
            const k = 1 - Math.PI / 4;
            const used = (r: number) => Math.max(0, Math.min(r, geo.h / 2, geo.w / 2) - pi) * Math.max(0, Math.min(r, geo.h / 2, geo.w / 2) - pb) * k;
            return { geo, span, areas, measured: areas.reduce((a, b) => a + b, 0) / 4, expected: used(geo.h / 2), flat: used(geo.radius) };
        },
        { b64: png.toString("base64"), ground, geo },
    );
}

for (const width of [1440, 390]) {
    test(`radius · every dock seat's corner is half its block size, at ${width}`, async ({ page }, info) => {
        const touch = COARSE.has(info.project.name);
        await page.setViewportSize({ width, height: 800 });
        await page.goto("/tests-visual/release-11-0-2/radius-harness.html");
        await page.locator("body[data-ready='1'] .radius-dock .dock-plate").waitFor();
        await page.evaluate(() => document.fonts.ready);
        await page.mouse.move(4, 4);
        await page.waitForTimeout(900);
        // The plate's own fill beside the seats, the ground a seat's plate is read against.
        const p = (await page.locator(".radius-dock .dock-plate").boundingBox())!;
        const groundPng = await page.screenshot({ clip: { x: Math.round(p.x + p.width / 2), y: Math.round(p.y + 2), width: 1, height: 1 }, scale: "css" });
        const ground = await page.evaluate(async (b64) => {
            const img = new Image();
            img.src = `data:image/png;base64,${b64}`;
            await img.decode();
            const c = document.createElement("canvas");
            c.width = c.height = 1;
            const g = c.getContext("2d")!;
            g.drawImage(img, 0, 0);
            return [...g.getImageData(0, 0, 1, 1).data.slice(0, 3)];
        }, groundPng.toString("base64"));
        const cells: Record<string, Awaited<ReturnType<typeof plateCorners>> & { state: string }> = {};
        const seats = touch
            ? ["trigger-active", "tab-active", "label-active", "icon-active", "trigger"]
            : ["trigger", "tab", "label", "trigger-active", "tab-active", "label-active", "icon-active"];
        for (const kind of seats) {
            const seat = page.locator(`.radius-dock [data-seat='${kind}']`);
            const state = kind.endsWith("-active") ? "active" : touch ? "open" : "hover";
            await seat.evaluate((e) => e.scrollIntoView({ block: "nearest", inline: "nearest", behavior: "instant" }));
            await page.waitForTimeout(300);
            if (state === "hover") await seat.hover();
            if (state === "open") await seat.tap();
            await page.waitForTimeout(400);
            cells[kind] = { state, ...(await plateCorners(page, seat, ground)) };
            if (state === "hover") await page.mouse.move(4, 4);
            if (state === "open") await page.keyboard.press("Escape");
            await page.waitForTimeout(300);
        }
        info.annotations.push({ type: "radius", description: JSON.stringify({ ground, cells }) });
        for (const [kind, cell] of Object.entries(cells)) {
            expect(cell.span, `${kind} paints a plate`).toBeGreaterThan(12);
            expect(cell.measured, `${kind}: the unpainted corner area`).toBeGreaterThanOrEqual(cell.expected * 0.8);
        }
    });
}

for (const theme of ["light", "dark"]) {
    test(`geometry · the Slider's thumb fills the band and its ends are concentric (${theme})`, async ({ page }, info) => {
        const fails: string[] = [];
        const worst: Record<string, number> = {};
        for (const value of [0, 1, 5, 25, 50, 95, 99, 100]) {
            await page.goto(`/tests-visual/release-11-0-2/geometry-harness.html?value=${value}&theme=${theme}`);
            await page.locator("body[data-ready='1'] [data-cell] .slider-thumb").first().waitFor();
            await page.waitForTimeout(300);
            const cells = await page.evaluate((value) => {
                const p = value / 100;
                return [...document.querySelectorAll<HTMLElement>("[data-cell]")].map((root) => {
                    const cell = root.dataset.cell!;
                    const vertical = cell.includes("-vertical");
                    const spectrum = cell.startsWith("spectrum");
                    const forward = !(cell.endsWith("-inverted") !== cell.endsWith("-rtl"));
                    const t = root.querySelector(".slider-track")!.getBoundingClientRect();
                    const f = root.querySelector(".slider-range")!.getBoundingClientRect();
                    const b = root.querySelector(".slider-thumb")!.getBoundingClientRect();
                    // Main-axis position from the edge the fill grows from.
                    const m = (v: number) =>
                        vertical ? (forward ? t.bottom - v : v - t.top) : forward ? v - t.left : t.right - v;
                    const H = vertical ? t.width : t.height;
                    const W = vertical ? t.height : t.width;
                    const centre = m(vertical ? b.top + b.height / 2 : b.left + b.width / 2);
                    const cross = vertical ? b.left + b.width / 2 - (t.left + t.width / 2) : b.top + b.height / 2 - (t.top + t.height / 2);
                    const fillFar = Math.max(m(vertical ? f.top : f.left), m(vertical ? f.bottom : f.right));
                    const r = {
                        cell,
                        H,
                        thumb: [b.width, b.height].map((v) => Math.round(v * 100) / 100),
                        line: centre - (H / 2 + p * (W - H)),
                        cross,
                        cap: spectrum ? 0 : centre - (fillFar - H / 2),
                        fillCross: spectrum ? H : vertical ? f.width : f.height,
                    };
                    return r;
                });
            }, value);
            for (const c of cells) {
                const checks: [string, number][] = [
                    ["diameter-inline", c.thumb[0]! - c.H],
                    ["diameter-block", c.thumb[1]! - c.H],
                    ["on the line between the end centres", c.line],
                    ["cross centre", c.cross],
                    ["concentric with the fill's cap", c.cap],
                    ["fill height", c.fillCross - c.H],
                ];
                for (const [what, d] of checks) {
                    worst[what] = Math.max(worst[what] ?? 0, Math.abs(d));
                    if (Math.abs(d) > 0.5) fails.push(`${c.cell} @${value}: ${what} off by ${d.toFixed(2)}`);
                }
            }
        }
        info.annotations.push({ type: "geometry", description: JSON.stringify({ worst, fails: fails.slice(0, 40), count: fails.length }) });
        expect(fails).toEqual([]);
    });
}

// A control slotted directly into a dock's run keeps the transition it declares: the run's
// seat rule is a default under it, not an override. The same button inside the open dock
// and outside it computes the same transition, and a hover tween is part-way through
// 120 ms into its 400 ms. The dock's own icon control keeps its hover legs too.
// W-I.8 RU-90: restated. The extent leg was for the seat exchange (the widened current seat)
// that RU-28 deleted; the icon control's list holds its fill and needs no extent leg.
test("transition · a control slotted into a dock's run keeps its own transition", async ({ page }, info) => {
    test.skip(COARSE.has(info.project.name), "hover is a fine-pointer state");
    await page.goto("/tests-visual/release-11-0-2/fold-content-harness.html");
    await page.locator(".fc-dock .dock-plate").waitFor();
    await page.evaluate(() => (window as unknown as { __expand: () => void }).__expand());
    await page.waitForTimeout(1500);
    const read = () =>
        page.evaluate(() => {
            const t = (sel: string) => {
                const cs = getComputedStyle(document.querySelector(sel)!);
                return { property: cs.transitionProperty, duration: cs.transitionDuration };
            };
            return { inside: t(".fc-inside"), outside: t(".fc-outside"), icon: t('.fc-dock [aria-label="Search"]') };
        });
    const r = await read();
    const mid = async (sel: string) => {
        await page.mouse.move(4, 400);
        await page.waitForTimeout(600);
        const box = (await page.locator(sel).boundingBox())!;
        await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
        await page.waitForTimeout(120);
        return page.evaluate((sel) => getComputedStyle(document.querySelector(sel)!).backgroundColor, sel);
    };
    const tween = { inside: await mid(".fc-inside"), outside: await mid(".fc-outside") };
    info.annotations.push({ type: "transition", description: JSON.stringify({ ...r, tween }) });
    expect(r.inside).toEqual(r.outside);
    expect(r.icon.property).toContain("background-color");
    // Part-way between rest rgb(40, 120, 220) and hover rgb(220, 60, 40).
    for (const c of [tween.inside, tween.outside]) {
        expect(c).not.toBe("rgb(40, 120, 220)");
        expect(c).not.toBe("rgb(220, 60, 40)");
    }
});

// Every frame of an unfold and a fold of a dock that holds a 240 px Slider and a row of
// seats: each content item's box, cut by the dock's own clip and the run's scroll port
// where those clip, and (W-I.8 RU-90) by the `clip-path` inset of the item and of every
// ancestor up to the dock, the extent that paints (the redesign's regions paint through
// their lane clips, RU-25), against the plate's painted box; and each item's effective opacity
// (the product of its own and its ancestors'). No visible item stands outside the plate,
// and between two frames no item's opacity moves faster than the morph itself: by more
// than the reveal ramp's slope (one over the dock's `--dock-stagger-window-size`) times
// the change in `--dock-expand-t`, plus 0.05. A frame the engine drops moves t further and allows a larger step; a drop from
// 1 to 0 while t barely moves does not pass.
async function foldFrames(page: Page, dir: "expand" | "collapse") {
    await page.evaluate(() => {
        type F = { morphing: boolean; t: number; window: number; items: { id: string; o: number; out: number }[] };
        const w = window as unknown as { __frames: F[] };
        w.__frames = [];
        const items = [...document.querySelectorAll<HTMLElement>(
            ".fc-dock .dock-layer--full :is([aria-label='Home'],[aria-label='Search'],[aria-label='Settings'],.fc-slider,.fc-inside)",
        )];
        const dock = document.querySelector<HTMLElement>(".fc-dock")!;
        const plate = dock.querySelector(".dock-plate")!;
        const tick = () => {
            const p = plate.getBoundingClientRect();
            const cs = getComputedStyle(dock);
            const d = dock.getBoundingClientRect();
            const raw = cs.getPropertyValue("--dock-expand-t").trim();
            const n = parseFloat(raw.replace(/^calc\(1 - /, ""));
            const ramp = parseFloat(cs.getPropertyValue("--dock-stagger-window-size")) || 0.55;
            const f: F = { morphing: dock.hasAttribute("data-morphing"), t: raw.startsWith("calc(1 - ") ? 1 - n : n, window: ramp, items: [] };
            for (const el of items) {
                let o = getComputedStyle(el).visibility === "hidden" ? 0 : 1;
                for (let e: HTMLElement | null = el; e && e !== document.body; e = e.parentElement) o *= +getComputedStyle(e).opacity;
                const r = el.getBoundingClientRect();
                let [l, t, rr, b] = [r.left, r.top, r.right, r.bottom];
                if (cs.overflowX !== "visible") [l, rr] = [Math.max(l, d.left), Math.min(rr, d.right)];
                if (cs.overflowY !== "visible") [t, b] = [Math.max(t, d.top), Math.min(b, d.bottom)];
                const run = el.closest(".dock-run");
                if (run) {
                    const rs = getComputedStyle(run);
                    const rb = run.getBoundingClientRect();
                    if (rs.overflowX !== "visible") [l, rr] = [Math.max(l, rb.left), Math.min(rr, rb.right)];
                    if (rs.overflowY !== "visible") [t, b] = [Math.max(t, rb.top), Math.min(b, rb.bottom)];
                }
                // W-I.8 RU-90: each `inset()` clip from the item up to the dock cuts the box
                // (its rounded corners ignored, so the cut is never tighter than the paint).
                for (let e: HTMLElement | null = el; e; e = e === dock ? null : e.parentElement) {
                    const m = getComputedStyle(e).clipPath.match(/^inset\(([^)]*?)(?:\s+round\s[^)]*)?\)$/);
                    if (!m) continue;
                    const eb = e.getBoundingClientRect();
                    const v = m[1]!.trim().split(/\s+/);
                    const side = [v[0]!, v[1] ?? v[0]!, v[2] ?? v[0]!, v[3] ?? v[1] ?? v[0]!];
                    const at = (k: number, along: number) =>
                        side[k]!.endsWith("%") ? (parseFloat(side[k]!) / 100) * along : parseFloat(side[k]!);
                    const [ct, cr, cb, cl] = [at(0, eb.height), at(1, eb.width), at(2, eb.height), at(3, eb.width)];
                    [l, rr] = [Math.max(l, eb.left + cl), Math.min(rr, eb.right - cr)];
                    [t, b] = [Math.max(t, eb.top + ct), Math.min(b, eb.bottom - cb)];
                }
                const out = rr > l && b > t ? Math.max(p.left - l, rr - p.right, p.top - t, b - p.bottom, 0) : 0;
                f.items.push({ id: el.getAttribute("aria-label") ?? el.className, o, out });
            }
            w.__frames.push(f);
            if (w.__frames.length < 120) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
    });
    await page.evaluate((dir) => (window as unknown as Record<string, () => void>)[`__${dir}`]!(), dir);
    await page.waitForTimeout(2400);
    return page.evaluate(
        () =>
            (window as unknown as { __frames: { morphing: boolean; t: number; window: number; items: { id: string; o: number; out: number }[] }[] })
                .__frames,
    );
}

for (const orientation of ["horizontal", "vertical"])
    for (const width of [1440, 390]) {
        test(`fold · a ${orientation} dock's content stays inside the plate and fades by steps through the fold and unfold at ${width}`, async ({ page }, info) => {
            await page.setViewportSize({ width, height: 900 });
            const fails: string[] = [];
            const worst = { out: 0, step: -1 };
            for (const theme of ["light", "dark"]) {
                await page.goto(`/tests-visual/release-11-0-2/fold-content-harness.html?orientation=${orientation}&theme=${theme}`);
                await page.locator(".fc-dock .dock-plate").waitFor();
                await page.waitForTimeout(600);
                for (const dir of ["expand", "collapse"] as const) {
                    const frames = await foldFrames(page, dir);
                    expect(frames.some((f) => f.morphing), `${theme} ${dir} morphs`).toBe(true);
                    frames.forEach((f, i) =>
                        f.items.forEach((it, k) => {
                            const step = i > 0 ? Math.abs(it.o - frames[i - 1]!.items[k]!.o) : 0;
                            const dt = i > 0 ? Math.abs(f.t - frames[i - 1]!.t) : 0;
                            const allowed = i > 0 ? dt / Math.min(1, f.window) + 0.05 : 1;
                            worst.out = Math.max(worst.out, it.o > 0.02 ? it.out : 0);
                            worst.step = Math.max(worst.step, step - allowed);
                            if (it.o > 0.02 && it.out > 0.5) fails.push(`${theme} ${dir} frame ${i}: ${it.id} ${it.out.toFixed(1)} px outside at opacity ${it.o.toFixed(2)}`);
                            if (step > allowed) fails.push(`${theme} ${dir} frame ${i}: ${it.id} opacity moved ${step.toFixed(2)} while t moved ${dt.toFixed(2)}`);
                        }),
                    );
                }
            }
            info.annotations.push({ type: "fold", description: JSON.stringify({ worst, fails: fails.slice(0, 20) }) });
            expect(fails).toEqual([]);
        });
    }

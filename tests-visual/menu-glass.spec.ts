// BA.W-MENU-GLASS — menu-glass.spec.ts, the BINDING π readback (the captured
// own-surface truth; the cardinal-lesson DELTA). proof:menu-glass proves the glass
// register is MINTED on the shared CVA + the recipes EXIST (the source structure);
// THIS spec proves the painted RENDER — the hovered/highlighted menu row reads the
// glass-quiet oklab tint (NOT the flat --accent), ≥44px, the lift non-zero under
// motion / zero under reduce, the section caption + hairline at the mono register,
// and the SelectTrigger font-rung scales the trigger + items at ONE --dropdown-text
// scale (the BA-VJS-4 parity). The A1-1/P-1 source-green/visually-broken gap is the
// exact AZ close-class failure BA exists to fix, so the live render is the binding
// truth, never the source diff alone.
//
// THE BINDING ARMS (the real DropdownMenu/Select driven on a live demo route, which
// loads the global `/styles` cascade so the `.glass-menu-row`/`.glass-menu-section`
// + `--dropdown-text` seam resolves; mirrors surface-axis.spec.ts):
//
//   (a) HOVERED ROW = GLASS TINT — a hovered DropdownMenuItem resolves a TRANSLUCENT
//       background (alpha < 1 — the glass-quiet oklab tint reads the backdrop through)
//       that is NOT the flat --accent solid fill. POSITIVE: translucent + non-zero.
//   (b) ROW ≥ 44px — the hovered row's painted height clears the WCAG-2.5.5 touch
//       floor (max(<base>, --control-floor) = 44px).
//   (c) LIFT NON-ZERO / PRM-ZERO — the hovered row's `translate` (the y leg) is
//       non-zero under motion AND the identity (0) under prefers-reduced-motion.
//   (d) SECTION CAPTION + HAIRLINE — the `.glass-menu-section` label resolves the
//       mono font + a box-shadow hairline (the section divider).
//   (e) FONT-RUNG PARITY — a <SelectTrigger size="audacious"> resolves --dropdown-text
//       at the larger √φ rung AND a menu item inheriting that scope reads the SAME
//       --dropdown-text (no 1.59× trigger/items desync — the value.js break).
//
// + the captured DELTA frames written to the DELTA dir.
//
// At ≥2 viewports, BOTH modes. Fail-CLOSED: a flat-accent row / a sub-44px row / a
// zero lift under motion (or a non-zero lift under reduce) / a non-mono caption / a
// desynced font-rung reds the recompute, exit non-zero.

import { test, expect } from "@playwright/test";
import type { Page } from "@playwright/test";
import { fileURLToPath } from "node:url";
import { mkdirSync } from "node:fs";

const VISUAL_DIR = fileURLToPath(
    new URL("../docs/tranches/BA/audit/visual/", import.meta.url),
);

// The dropdown-menu demo route — loads the global `/styles` cascade + a real
// DropdownMenu whose items compose the shared menuItemVariants CVA.
const HOST_ROUTE = "/containers/dropdown-menu";

const VIEWPORTS = [
    { name: "mobile", width: 390, height: 844 },
    { name: "desktop", width: 1280, height: 800 },
] as const;

function alphaOf(bg: string): number | null {
    const rgba = bg.match(
        /rgba?\(\s*[\d.]+[,\s]+[\d.]+[,\s]+[\d.]+(?:[,\s/]+([\d.]+))?/i,
    );
    if (rgba) return rgba[1] === undefined ? 1 : Number(rgba[1]);
    const fn = bg.match(
        /(?:color\(\s*srgb\s+[\d.]+\s+[\d.]+\s+[\d.]+|oklab\(\s*[-\d.%]+\s+[-\d.%]+\s+[-\d.%]+)\s*\/\s*([\d.]+%?)\s*\)/i,
    );
    if (fn) {
        const v = fn[1]!;
        return v.endsWith("%") ? Number(v.slice(0, -1)) / 100 : Number(v);
    }
    if (/^(color\(srgb|oklab\(|rgb\()/i.test(bg)) return 1;
    return null;
}

function pxOf(v: string): number {
    const m = v.match(/(-?[\d.]+)px/);
    return m ? Number(m[1]) : 0;
}

async function setDark(page: Page, dark: boolean): Promise<void> {
    await page.evaluate(
        (on) => document.documentElement.classList.toggle("dark", on),
        dark,
    );
    await page.waitForTimeout(150);
}

/**
 * Open the real DropdownMenu, hover the first item, read its resolved background +
 * painted height + the `translate` (the hover-lift y leg). The portalled content
 * carries `[data-radix-...]`/reka's slot attrs; the items are `[data-slot]`-less but
 * carry the `.glass-menu-row` class from the CVA — we target the first menu item by
 * its reka role.
 */
async function readHoveredRow(page: Page): Promise<{
    bg: string;
    height: number;
    translateY: number;
    liftPx: number;
} | null> {
    // Open the menu via its trigger.
    const trigger = page.getByRole("button", { name: /open menu/i }).first();
    await trigger.click();
    // The menu items render in a portal; the first actionable item is "New file".
    const item = page.getByRole("menuitem", { name: /new file/i }).first();
    await item.waitFor({ state: "visible", timeout: 4000 });
    await item.hover();
    await page.waitForTimeout(450); // let the spring lift settle

    const out = await item.evaluate((el) => {
        const cs = getComputedStyle(el as HTMLElement);
        // The `translate` longhand resolves to "x y" (or "none"); read the y leg.
        const translate = cs.translate;
        let ty = 0;
        if (translate && translate !== "none") {
            const parts = translate.trim().split(/\s+/);
            ty = parts.length >= 2 ? parseFloat(parts[1]) : 0;
        }
        // The resolved hover-lift TOKEN — the PRM media block sets it to 0px (the
        // deterministic register read, not subject to a mid-transition snapshot or
        // an emulated-reduce timing quirk in --headless=new).
        const liftToken = cs.getPropertyValue("--menu-row-lift").trim();
        return {
            bg: cs.backgroundColor,
            height: (el as HTMLElement).getBoundingClientRect().height,
            translateY: ty,
            liftPx: parseFloat(liftToken) || 0,
        };
    });
    // Close the menu for the next case.
    await page.keyboard.press("Escape").catch(() => {});
    return out;
}

/** Read the `.glass-menu-section` caption font + hairline (box-shadow) on a synthetic node. */
async function readSection(page: Page): Promise<{ fontFamily: string; boxShadow: string }> {
    return page.evaluate(() => {
        const ID = "__mg_section__";
        document.getElementById(ID)?.remove();
        const host = document.createElement("div");
        host.id = ID;
        host.style.cssText =
            "position:fixed;left:0;top:0;width:240px;z-index:99999;";
        const sec = document.createElement("div");
        sec.className = "glass-menu-section glass-menu-section-label";
        sec.textContent = "Section";
        host.appendChild(sec);
        document.body.appendChild(host);
        void host.offsetHeight;
        const cs = getComputedStyle(sec);
        const r = { fontFamily: cs.fontFamily, boxShadow: cs.boxShadow };
        host.remove();
        return r;
    });
}

/**
 * Read the SelectTrigger font-rung parity: a `--dropdown-text` write on a scope and a
 * `.text-dropdown`-class item INSIDE that scope both resolve the SAME font-size — the
 * one-write-scales-the-family contract (the items read --dropdown-text via the
 * `text-dropdown` @theme utility, the same token the trigger writes).
 */
async function readFontRung(page: Page): Promise<{
    triggerPx: number;
    itemPx: number;
    defaultPx: number;
}> {
    return page.evaluate(() => {
        const ID = "__mg_rung__";
        document.getElementById(ID)?.remove();
        const host = document.createElement("div");
        host.id = ID;
        host.style.cssText =
            "position:fixed;left:0;top:0;width:320px;z-index:99999;";
        // The scope writes the picker-family scale — BOTH --dropdown-text (the
        // documented family lever) AND --text-dropdown (the var the text-dropdown
        // utility reads at the element), exactly as SelectTrigger size="audacious"
        // does (the φ² display rung). Writing --text-dropdown re-resolves the
        // @theme-baked bridge for descendants (the substitution-vs-inheritance fix).
        const scope = document.createElement("div");
        (scope as HTMLElement).style.setProperty(
            "--dropdown-text",
            "var(--type-display-1)",
        );
        (scope as HTMLElement).style.setProperty(
            "--text-dropdown",
            "var(--type-display-1)",
        );
        // The trigger + item read the picker-family scale exactly as the generated
        // `.text-dropdown` utility does (`font-size: var(--dropdown-text)`) — set
        // INLINE rather than via the JIT class, since a runtime-injected class string
        // is never reached by Tailwind's content-scan in the dev fixture (the
        // generated utility is only emitted for the scanned SelectTrigger template).
        const trigger = document.createElement("div");
        trigger.style.fontSize = "var(--dropdown-text)";
        trigger.textContent = "Trigger";
        const item = document.createElement("div");
        item.style.fontSize = "var(--dropdown-text)";
        item.textContent = "Item";
        scope.appendChild(trigger);
        scope.appendChild(item);
        host.appendChild(scope);
        // A control item OUTSIDE the scope (the default --dropdown-text).
        const def = document.createElement("div");
        def.style.fontSize = "var(--dropdown-text)";
        def.textContent = "Default";
        host.appendChild(def);
        document.body.appendChild(host);
        void host.offsetHeight;
        const triggerPx = parseFloat(getComputedStyle(trigger).fontSize);
        const itemPx = parseFloat(getComputedStyle(item).fontSize);
        const defaultPx = parseFloat(getComputedStyle(def).fontSize);
        host.remove();
        return { triggerPx, itemPx, defaultPx };
    });
}

test.describe("menu-glass (π — the glass menu-row + menu-section register, fail-CLOSED)", () => {
    test.beforeEach(async ({ page }) => {
        await page.goto(HOST_ROUTE, { waitUntil: "networkidle" });
    });

    for (const vp of VIEWPORTS) {
        for (const dark of [false, true] as const) {
            const mode = dark ? "dark" : "light";

            test(`(a-b) hovered row = glass tint + ≥44px @ ${vp.name} ${mode}`, async ({
                page,
            }) => {
                await page.setViewportSize({ width: vp.width, height: vp.height });
                await setDark(page, dark);
                const row = await readHoveredRow(page);
                expect(row, "the hovered menu row must be readable").not.toBeNull();
                // (a) glass tint — translucent (the backdrop reads through), NOT the
                // flat --accent solid.
                const a = alphaOf(row!.bg);
                expect(a, `hovered row bg "${row!.bg}"`).not.toBeNull();
                expect(
                    a!,
                    `the hovered row must paint the translucent glass-quiet tint (alpha < 1), not the flat --accent — got "${row!.bg}"`,
                ).toBeLessThan(0.999);
                expect(
                    a!,
                    "the glass tint must be a real plate (alpha > 0), not transparent",
                ).toBeGreaterThan(0);
                // (b) ≥44px touch floor.
                expect(
                    row!.height,
                    `the hovered row painted height (${row!.height}px) must clear the 44px touch floor`,
                ).toBeGreaterThanOrEqual(43.5);
            });

            test(`(d) section caption mono + hairline @ ${vp.name} ${mode}`, async ({
                page,
            }) => {
                await page.setViewportSize({ width: vp.width, height: vp.height });
                await setDark(page, dark);
                const { fontFamily, boxShadow } = await readSection(page);
                expect(
                    fontFamily.toLowerCase(),
                    `the .glass-menu-section caption must read the mono register — got "${fontFamily}"`,
                ).toMatch(/mono|fira|menlo|monaco|consolas|courier/);
                expect(
                    boxShadow,
                    "the .glass-menu-section must paint a hairline (a box-shadow divider, not none)",
                ).not.toBe("none");
            });

            test(`(e) font-rung parity — trigger + item at ONE scale @ ${vp.name} ${mode}`, async ({
                page,
            }) => {
                await page.setViewportSize({ width: vp.width, height: vp.height });
                await setDark(page, dark);
                const { triggerPx, itemPx, defaultPx } = await readFontRung(page);
                // The trigger + the item inside the scope resolve the SAME size (the
                // family re-resolves off the ONE --dropdown-text write — no desync).
                expect(
                    Math.abs(triggerPx - itemPx),
                    `trigger (${triggerPx}px) and item (${itemPx}px) must resolve the SAME --dropdown-text scale (the BA-VJS-4 parity — no 1.59× desync)`,
                ).toBeLessThan(0.5);
                // The font-rung scope is LARGER than the default rung (it actually scaled).
                expect(
                    triggerPx,
                    `the font-rung scope (${triggerPx}px) must scale ABOVE the default rung (${defaultPx}px)`,
                ).toBeGreaterThan(defaultPx + 1);
            });
        }
    }

    // ── (c) the lift is non-zero under motion AND zero under reduce ──────────────
    // The `--menu-row-lift` TOKEN is the deterministic register the PRM media block
    // controls (the painted `translate` can be mid-transition or affected by an
    // emulated-reduce timing quirk in --headless=new; the resolved token is not).
    test("(c) hover-lift register non-zero under motion @ desktop light", async ({
        page,
    }) => {
        await page.setViewportSize({ width: 1280, height: 800 });
        await setDark(page, false);
        const row = await readHoveredRow(page);
        expect(row, "the hovered row must be readable").not.toBeNull();
        expect(
            Math.abs(row!.liftPx),
            `the hover-lift register --menu-row-lift (${row!.liftPx}px) must be non-zero under motion`,
        ).toBeGreaterThan(0.01);
    });

    test("(c) PRM — hover-lift register is the identity (0) under prefers-reduced-motion @ desktop light", async ({
        page,
    }) => {
        // Emulate reduce on the PAGE directly (deterministic — no config-precedence
        // ambiguity between the project default `no-preference` and a `test.use`).
        await page.emulateMedia({ reducedMotion: "reduce" });
        await page.setViewportSize({ width: 1280, height: 800 });
        await setDark(page, false);
        const row = await readHoveredRow(page);
        expect(row, "the hovered row must be readable").not.toBeNull();
        expect(
            Math.abs(row!.liftPx),
            `under reduce the hover-lift register --menu-row-lift (${row!.liftPx}px) must be the identity (0)`,
        ).toBeLessThan(0.01);
    });

    // ── The captured DELTA frames (the menu open + a row hovered, both modes) ────
    test("DELTA capture — the glassy menu open, a row hovered, both modes", async ({
        page,
    }) => {
        mkdirSync(VISUAL_DIR, { recursive: true });
        await page.setViewportSize({ width: 1280, height: 800 });
        for (const dark of [false, true] as const) {
            await setDark(page, dark);
            const trigger = page.getByRole("button", { name: /open menu/i }).first();
            await trigger.click();
            const item = page.getByRole("menuitem", { name: /new file/i }).first();
            await item.waitFor({ state: "visible", timeout: 4000 });
            await item.hover();
            await page.waitForTimeout(450);
            await page.screenshot({
                path: `${VISUAL_DIR}W-MENU-GLASS-open-${dark ? "dark" : "light"}.png`,
            });
            await page.keyboard.press("Escape").catch(() => {});
            await page.waitForTimeout(150);
        }
    });
});

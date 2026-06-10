/* FDR2-glassui-panes interaction-state harness — read-only audit, writes PNGs only.
 * Real-GPU chrome channel (the corpus cure for the headless-shell WebGL wedge). */
const { chromium } = require("playwright");
const path = require("path");
const fs = require("fs");

const BASE = "http://localhost:5199";
const OUT = __dirname;

(async () => {
    const browser = await chromium.launch({
        channel: "chrome",
        headless: true,
        args: ["--use-gl=angle", "--use-angle=metal"],
    });
    const ctx = await browser.newContext({
        viewport: { width: 1440, height: 900 },
        deviceScaleFactor: 1.5,
    });
    const page = await ctx.newPage();
    const shot = async (name) => {
        await page.screenshot({ path: path.join(OUT, `${name}.png`) });
        console.log(`OK ${name}`);
    };
    const go = async (route, settle) => {
        await page.goto(`${BASE}/${route}`, { waitUntil: "load", timeout: 20000 });
        await page.waitForTimeout(settle);
    };
    const tryStep = async (label, fn) => {
        try {
            await fn();
        } catch (e) {
            console.log(`FAIL ${label}: ${e.message.split("\n")[0]}`);
        }
    };

    // 1. aurora — Van Gogh preset (the rebuilt medium)
    await tryStep("aurora-vangogh", async () => {
        await go("substrates/aurora", 3000);
        await page.getByText("Van Gogh", { exact: false }).first().click();
        await page.waitForTimeout(4000);
        await shot("X-aurora-vangogh");
    });

    // 2. dock overview — expand the first collapsible specimen
    await tryStep("dock-expanded", async () => {
        await go("dock/overview", 2500);
        const dock = page.locator(".glass-dock").first();
        await dock.scrollIntoViewIfNeeded();
        await page.waitForTimeout(400);
        await dock.click();
        await page.waitForTimeout(1400);
        await shot("X-dock-overview-expanded");
    });

    // 3. dock rail — hover an item (hover register + tooltip)
    await tryStep("dock-rail-hover", async () => {
        await go("dock/rail", 2000);
        const btn = page.locator(".dock-icon-button").nth(2);
        await btn.scrollIntoViewIfNeeded();
        await btn.hover();
        await page.waitForTimeout(900);
        await shot("X-dock-rail-hover");
    });

    // 4. blob — pointer over the hero creature
    await tryStep("blob-pointer", async () => {
        await go("substrates/blob", 3000);
        const canvas = page.locator("canvas").first();
        const box = await canvas.boundingBox();
        if (box) {
            for (let i = 0; i <= 8; i++) {
                await page.mouse.move(
                    box.x + box.width * (0.2 + 0.06 * i),
                    box.y + box.height * 0.5,
                );
                await page.waitForTimeout(70);
            }
            await page.waitForTimeout(800);
        }
        await shot("X-blob-pointer");
    });

    // 5. dialog open (glass variant over the page)
    await tryStep("dialog-open", async () => {
        await go("containers/dialog", 900);
        await page.getByRole("button", { name: /open glass dialog/i }).click();
        await page.waitForTimeout(900);
        await shot("X-dialog-open");
    });

    // 6. drawer live-behind at half detent
    await tryStep("drawer-live-half", async () => {
        await go("compositions/drawer-live-behind", 1200);
        const half = page.getByRole("button", { name: /half|0\.5/i }).first();
        await half.click();
        await page.waitForTimeout(1200);
        await shot("X-drawer-live-half");
    });

    // 7. shell ⌘K palette
    await tryStep("shell-cmdk", async () => {
        await go("foundations/colors", 900);
        await page.keyboard.press("Meta+k");
        await page.waitForTimeout(800);
        await shot("X-shell-cmdk");
    });

    // 8. 404 egg
    await tryStep("notfound", async () => {
        await go("lost-in-the-lattice", 3000);
        await shot("X-notfound-egg");
    });

    // 9-10. dark-mode auth-shell + configurator (missing from the G-* dark set)
    await tryStep("dark-pair", async () => {
        await ctx.addInitScript(() => {
            localStorage.setItem("vueuse-color-scheme", "dark");
        });
        await page.emulateMedia({ colorScheme: "dark" });
        await go("compositions/auth-shell", 3200);
        await shot("X-auth-shell-dark");
        await go("compositions/configurator", 1800);
        await shot("X-configurator-dark");
    });

    // 11. glass-material — mid-page SOTA folds at viewport sharpness
    await tryStep("glass-material-folds", async () => {
        await page.emulateMedia({ colorScheme: "light" });
        await ctx.addInitScript(() => {
            localStorage.setItem("vueuse-color-scheme", "light");
        });
        await go("substrates/glass-material", 2800);
        await page.evaluate(() => {
            const el = [...document.querySelectorAll("h2, h3")].find((h) =>
                /refract|lens|squircle|dispersion/i.test(h.textContent || ""),
            );
            el?.scrollIntoView({ block: "start" });
        });
        await page.waitForTimeout(1600);
        await shot("X-glass-material-folds");
    });

    // 12. fourier — the freeze/capture section at the page bottom
    await tryStep("fourier-freeze", async () => {
        await go("substrates/fourier-field", 3000);
        await page.evaluate(() =>
            window.scrollTo(0, document.documentElement.scrollHeight),
        );
        await page.waitForTimeout(2500);
        await shot("X-fourier-freeze-tail");
    });

    await browser.close();
})();

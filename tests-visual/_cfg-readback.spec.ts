import { test, expect } from "@playwright/test";

test("configurator dark bloom token + auth-shell ink readback", async ({ page }) => {
    // configurator dark
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/containers/configurator", { waitUntil: "networkidle" });
    await page.emulateMedia({ colorScheme: "dark" });
    await page.evaluate(() => document.documentElement.classList.add("dark"));
    await page.waitForSelector(".configurator-specimen", { timeout: 8000 });
    await page.waitForTimeout(1000);
    const cfg = await page.evaluate(() => {
        const spec = document.querySelector(".configurator-specimen")!;
        const grad = spec.querySelector("div[aria-hidden]")!;
        return {
            specBg: getComputedStyle(spec).backgroundColor,
            bloomBlue: getComputedStyle(spec as HTMLElement).getPropertyValue("--bloom-blue").trim(),
            bloomViolet: getComputedStyle(spec as HTMLElement).getPropertyValue("--bloom-violet").trim(),
            rainbowBlue: getComputedStyle(document.documentElement).getPropertyValue("--rainbow-blue").trim(),
            gradient: getComputedStyle(grad).background.slice(0, 120),
        };
    });
    console.log("CONFIG_DARK", JSON.stringify(cfg));

    // auth-shell dark ink
    await page.goto("/compositions/auth-shell", { waitUntil: "networkidle" });
    await page.emulateMedia({ colorScheme: "dark" });
    await page.evaluate(() => document.documentElement.classList.add("dark"));
    await page.waitForSelector(".auth-brand-panel", { timeout: 8000 });
    await page.waitForTimeout(800);
    const auth = await page.evaluate(() => {
        const panel = document.querySelector(".auth-brand-panel")!;
        const bodyP = [...panel.querySelectorAll("p")].find((p) => /Paper textures/.test(p.textContent || ""))!;
        const heading = panel.querySelector("h2")!;
        const r = bodyP.getBoundingClientRect();
        return {
            bodyColor: getComputedStyle(bodyP).color,
            headingColor: getComputedStyle(heading).color,
            mutedFg: getComputedStyle(panel as HTMLElement).getPropertyValue("--muted-foreground").trim(),
            fg: getComputedStyle(panel as HTMLElement).getPropertyValue("--foreground").trim(),
            bodyCenter: { x: Math.round(r.left + r.width / 2), y: Math.round(r.top + r.height / 2) },
        };
    });
    console.log("AUTH_DARK", JSON.stringify(auth));
    expect(true).toBe(true);
});

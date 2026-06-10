/* FDR2-glassui-panes capture harness — read-only audit, writes PNGs only. */
const { chromium } = require("playwright");
const path = require("path");

const BASE = "http://localhost:5199";
const OUT = __dirname;

// route, settleMs, fullPage
const PAGES = [
    // foundations
    ["foundations/intro", 3000, true],
    ["foundations/colors", 800, true],
    ["foundations/typography", 800, true],
    ["foundations/radii", 800, true],
    ["foundations/shadows", 800, true],
    ["foundations/motion", 2000, true],
    ["foundations/paper-glass", 1500, true],
    ["foundations/icons", 800, true],
    ["foundations/surface-tints", 800, true],
    ["foundations/overlays-scrims", 800, true],
    ["foundations/chart-chassis-palette", 800, true],
    ["foundations/paper-backdrop-texture-system", 800, true],
    ["foundations/paper-backdrop", 800, true],
    ["foundations/css-utilities", 800, true],
    // substrates
    ["substrates/aurora", 3500, true],
    ["substrates/blob", 3500, true],
    ["substrates/constellation", 3000, true],
    ["substrates/fourier-field", 3500, true],
    ["substrates/glass-material", 3000, true],
    // forms
    ["forms/inputs", 800, true],
    ["forms/textarea", 800, true],
    ["forms/checks", 800, true],
    ["forms/slider", 800, true],
    ["forms/number-field", 800, true],
    ["forms/select", 800, true],
    ["forms/combobox", 800, true],
    ["forms/multi-select", 800, true],
    ["forms/toggle", 800, true],
    ["forms/toggle-chip", 800, true],
    ["forms/label", 800, true],
    // display
    ["display/buttons", 1000, true],
    ["display/card", 1000, true],
    ["display/badge", 800, true],
    ["display/separator", 800, true],
    ["display/section", 800, true],
    ["display/metric-badge", 800, true],
    ["display/metric-pill", 800, true],
    ["display/status-dot", 800, true],
    ["display/pulse", 1500, true],
    ["display/stacked-icons", 800, true],
    ["display/dark-mode-toggle", 800, true],
    // containers
    ["containers/dialog", 800, true],
    ["containers/sheet", 800, true],
    ["containers/drawer", 800, true],
    ["containers/popover", 800, true],
    ["containers/dropdown-menu", 800, true],
    ["containers/context-menu", 800, true],
    ["containers/hover-card", 800, true],
    ["containers/tooltip", 800, true],
    ["containers/accordion", 800, true],
    ["containers/collapsible", 800, true],
    ["containers/hover-popover", 800, true],
    ["containers/expandable-container", 800, true],
    ["containers/command", 800, true],
    // navigation
    ["navigation/tabs", 1500, true],
    ["navigation/carousel", 2500, true],
    // dock
    ["dock/overview", 2500, true],
    ["dock/layers", 2000, true],
    ["dock/rail", 2000, true],
    // data
    ["data/table", 800, true],
    ["data/data-table", 800, true],
    ["data/tags-input", 800, true],
    ["data/avatar", 800, true],
    ["data/sortable-list", 800, true],
    ["data/infinite-scroll", 800, true],
    ["data/timeline", 1200, true],
    ["data/timeline-segmented", 1200, true],
    ["data/timeline-continuous", 1200, true],
    ["data/search", 800, true],
    ["data/scrolling-text", 1500, true],
    ["data/metric-cell", 1500, true],
    ["data/metric-stack", 1500, true],
    // feedback
    ["feedback/alert", 800, true],
    ["feedback/toast", 800, true],
    ["feedback/toaster", 800, true],
    ["feedback/notification", 800, true],
    ["feedback/progress", 1200, true],
    ["feedback/skeleton", 1200, true],
    ["feedback/confirm-dialog", 800, true],
    // motion
    ["motion/springs", 2000, true],
    ["motion/curve-gallery", 1500, true],
    ["motion/countup", 1500, true],
    ["motion/reveal", 1500, true],
    ["motion/typewriter", 2000, true],
    ["motion/underline", 1500, true],
    ["motion/animated-digit", 1500, true],
    // compositions
    ["compositions/hero", 2500, true],
    ["compositions/math-paper", 1500, true],
    ["compositions/auth-shell", 3000, true],
    ["compositions/settings", 1000, true],
    ["compositions/empty-states", 2500, true],
    ["compositions/drawer-live-behind", 1000, true],
    ["compositions/configurator", 1500, true],
    ["compositions/instrument-chassis", 1500, true],
    ["compositions/form-validation", 800, true],
    ["compositions/gate-pattern", 800, true],
    ["compositions/labeled-field", 800, true],
    ["compositions/icon-tooltip", 800, true],
    // composables (reference band — sample)
    ["composables/use-token-color", 800, true],
    ["composables/use-glass-renderer", 800, true],
    ["composables/use-spring-orchestrator", 800, true],
    ["composables/use-sortable", 800, true],
    ["composables/use-animated-number", 800, true],
];

const fs = require("fs");

(async () => {
    const browser = await chromium.launch({ channel: "chromium" });
    const ctx = await browser.newContext({
        viewport: { width: 1440, height: 900 },
        deviceScaleFactor: 1.5,
    });
    const page = await ctx.newPage();
    const cdp = await ctx.newCDPSession(page);
    const shoot = async (file, beyond) => {
        try {
            const { data } = await cdp.send("Page.captureScreenshot", {
                format: "png",
                ...(beyond ? { captureBeyondViewport: true } : {}),
            });
            fs.writeFileSync(path.join(OUT, file), Buffer.from(data, "base64"));
            return true;
        } catch (e) {
            console.log(`FAIL shot ${file}: ${e.message.split("\n")[0]}`);
            return false;
        }
    };
    const only = process.argv[2]; // optional filter substring
    for (const [route, settle, fullPage] of PAGES) {
        if (only && !route.includes(only)) continue;
        const slug = route.replace(/\//g, "--");
        try {
            await page.goto(`${BASE}/${route}`, { waitUntil: "load", timeout: 20000 });
        } catch (e) {
            console.log(`FAIL nav ${route}: ${e.message.split("\n")[0]}`);
            continue;
        }
        await page.waitForTimeout(settle);
        await shoot(`${slug}.png`, false);
        if (fullPage) {
            const h = await page.evaluate(() => document.documentElement.scrollHeight);
            if (h > 950) await shoot(`${slug}--full.png`, true);
        }
        console.log(`OK ${route}`);
    }
    await browser.close();
})();

// Bisect: which property stops the cluster plate's backdrop blur. node bisect.mjs <engine>
import { chromium, webkit } from "/Users/mkbabb/Programming/glass-ui/node_modules/playwright/index.mjs";
const WT = "/Users/mkbabb/Programming/glass-ui/.claude/worktrees/bl/cluster/proposal-B";
const { createServer } = await import(WT + "/node_modules/vite/dist/node/index.js");
process.chdir(WT);
const server = await createServer({ root: WT, configFile: WT + "/vite.config.ts", server: { port: 5472, strictPort: true, host: "localhost" }, logLevel: "warn" });
await server.listen();
const engine = process.argv[2] === "webkit" ? webkit : chromium;
const browser = await engine.launch({ headless: true });
const out = [];
try {
    for (const exp of ["", "noafter", "noclip", "noz", "nobg", "noafter noclip", "noz noafter"]) {
        const ctx = await browser.newContext({ viewport: { width: 1440, height: 400 } });
        try {
            const page = await ctx.newPage();
            await page.goto(`http://localhost:5472/demo/fixtures/dock-cluster.html?n=3&exp=${encodeURIComponent(exp)}`);
            await page.waitForFunction(() => window.__ready === true, null, { timeout: 30000 });
            // Sample a row in the bridge-free middle of the controls plate gap between icons.
            const r = await page.evaluate(() => {
                const d = document.querySelectorAll(".dock-cluster > .glass-dock")[0].getBoundingClientRect();
                return { x: d.left + 6, y: d.top + 3, w: 40 };
            });
            const buf = await page.screenshot({ clip: { x: r.x + 20, y: r.y, width: r.w, height: 1 } });
            const std = await page.evaluate(async (b64) => {
                const img = new Image(); img.src = "data:image/png;base64," + b64; await img.decode();
                const c = document.createElement("canvas"); c.width = img.width; c.height = img.height;
                const g = c.getContext("2d"); g.drawImage(img, 0, 0);
                const d = g.getImageData(0, 0, c.width, 1).data; const ls = [];
                for (let i = 0; i < d.length; i += 4) ls.push(0.2126 * d[i] + 0.7152 * d[i + 1] + 0.0722 * d[i + 2]);
                const m = ls.reduce((a, b) => a + b, 0) / ls.length;
                return Math.sqrt(ls.reduce((a, b) => a + (b - m) ** 2, 0) / ls.length);
            }, buf.toString("base64"));
            out.push({ exp: exp || "(as built)", rowStd: Number(std.toFixed(1)) });
        } finally { await ctx.close(); }
    }
} finally { await browser.close(); await server.close(); }
console.log(JSON.stringify(out));

// census.mjs <tree>: loads every audit page (?c=<name>) and every demo route, and records
// whether it mounts, its test ids and console errors. The denominator for INVENTORY.md.
import { withBrowser, cell, gotoComp, TREES, save, sleep } from "./lib.mjs";
const tree = process.argv[2] || "11.1.0";
const names = process.argv.slice(3);
const out = { tree, pages: [], routes: [] };
await withBrowser("chromium", async (b) => {
    const regNames = await cell(b, "chromium", { w: 1440, h: 900 }, async (P) => {
        await gotoComp(P, tree, "dock");
        const routes = await P.page.evaluate(() => null);
        return routes;
    });
    const list = names.length
        ? names
        : "accordion alert aurora avatar badge blob button card carousel checkbox chip collapsible command configurator constellation context-menu countup dark-mode-toggle data-table deck dialog dock easing expandable-container fading-scroll fourier-field handmark hover-popover infinite-scroll input label labeled-field menu metric music-staff number-field pager-dots popover progress radio-group scroll-progress-rim select separator sheet skeleton slider sortable-list springs status-dot surface switch table tabs textarea timeline toast toaster toggle-group tooltip typewriter".split(" ");
    await cell(b, "chromium", { w: 1440, h: 900 }, async (P) => {
        for (const n of list) {
            const r = { name: n };
            try {
                await gotoComp(P, tree, n);
                r.info = await P.page.evaluate(() => ({ ids: (window.__animInfo && window.__animInfo.testids) || window.__animInfo, n: document.querySelectorAll("[data-testid]").length }));
                r.ok = true;
            } catch (e) {
                r.ok = false;
                r.err = String(e.message).slice(0, 200);
            }
            r.errors = P.errors.splice(0);
            out.pages.push(r);
        }
    });
    // demo routes: read the router's list from the shell, then visit each
    await cell(b, "chromium", { w: 1440, h: 900 }, async (P) => {
        await P.page.goto(`http://127.0.0.1:${TREES[tree].port}/`, { waitUntil: "load" });
        await sleep(2500);
        const shell = await P.page.evaluate(() => ({
            dock: !!document.querySelector(".glass-dock"),
            aurora: !!document.querySelector(".aurora-root, canvas"),
            links: [...new Set([...document.querySelectorAll("a[href^='/']")].map((a) => a.getAttribute("href")))],
            appKids: document.querySelector("#app")?.children.length || 0,
        }));
        out.shell = shell;
        out.shellErrors = P.errors.splice(0);
    });
});
save(`logs/census-${tree}.json`, out);
const bad = out.pages.filter((p) => !p.ok);
console.log(JSON.stringify({ tree, pages: out.pages.length, failed: bad.map((p) => p.name + ": " + p.err), shell: { ...out.shell, links: out.shell.links.length }, shellErrors: out.shellErrors.length }));

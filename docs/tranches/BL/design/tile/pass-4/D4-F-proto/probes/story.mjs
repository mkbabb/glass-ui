#!/usr/bin/env node
// D4-F pass-4 prototype · probes/story.mjs (pass 3's probe; pass 4 adds --engines and closes every browser in a finally)
// D4-F pass-3 prototype · probes/story.mjs · the "Tiles" section of demo/stories/forms/toggle.vue, in paint.
// Serves the worktree's own demo (vite dev, cache pinned inside the worktree), opens /forms/toggle in Chromium and
// Playwright WebKit, light and dark, and reads the section the prototype added: every item's corner and tile fact,
// the selected items' perimeter and mark, and the pills of the sections around it (they must stay pills). Shots land
// in --shots. Takes the harness lock.
//   node story.mjs <worktree> --shots <dir> [--engines chromium,webkit] [--json f]
import fs from "node:fs";
import path from "node:path";
import { acquireLock, load, parseArgs } from "../../../harness/lib.mjs";

const wt = path.resolve(process.argv[2]);
const args = parseArgs(process.argv.slice(3));
const shots = String(args.shots);
fs.mkdirSync(shots, { recursive: true });
const lock = await acquireLock("d4f-p4-proto-story");
console.log(`D4-F p4 proto story · ${wt} · lock waited ${lock.waitedS}s · load ${load()} at start`);
process.chdir(wt);
const { createServer } = await import(path.join(wt, "node_modules/vite/dist/node/index.js"));
const server = await createServer({ configFile: path.join(wt, "vite.config.ts"), root: wt, cacheDir: path.join(wt, ".vite-cache/story-p4"), logLevel: "error", server: { host: "127.0.0.1", port: 5477, strictPort: false } });
await server.listen();
const base = server.resolvedUrls.local[0].replace(/\/$/, "");
const pw = await import("/Users/mkbabb/Programming/glass-ui/node_modules/playwright/index.mjs");
const out = { cells: [] };
let pass = 0, n = 0;
try {
  for (const engine of String(args.engines ?? "chromium,webkit").split(",")) {
    const b = await pw[engine].launch({ headless: true });
    try {
    const label = engine === "webkit" ? "Playwright WebKit" : "Chromium";
    for (const mode of ["light", "dark"]) {
      const ctx = await b.newContext({ viewport: { width: 1100, height: 1000 }, deviceScaleFactor: 2, colorScheme: mode });
      const page = await ctx.newPage();
      const errs = [];
      page.on("pageerror", (e) => errs.push(String(e)));
      page.on("console", (m) => { if (m.type() === "error") errs.push(m.text()); });
      await page.goto(`${base}/forms/toggle`, { waitUntil: "load", timeout: 120000 });
      await page.waitForSelector(".toggle-group", { timeout: 120000 });
      await page.evaluate((dark) => document.documentElement.classList.toggle("dark", dark), mode === "dark");
      await page.evaluate(() => document.fonts.ready.then(() => true));
      await page.waitForTimeout(1200);
      const r = await page.evaluate(() => {
        const probe = document.createElement("div"); probe.style.borderRadius = "var(--radius-field)"; document.body.append(probe);
        const field = parseFloat(getComputedStyle(probe).borderTopLeftRadius); probe.remove();
        return [...document.querySelectorAll(".toggle-group")].map((g) => {
          const items = [...g.querySelectorAll(".toggle-group__item")];
          return { name: g.getAttribute("aria-label"), size: g.getAttribute("data-size"), role: g.getAttribute("role"), field,
            fact: getComputedStyle(g).getPropertyValue("--selection-tile").trim(),
            items: items.map((el) => { const cs = getComputedStyle(el), q = el.getBoundingClientRect(), a = getComputedStyle(el, "::after"), bf = getComputedStyle(el, "::before");
              const used = Math.min(parseFloat(cs.borderTopLeftRadius), q.width / 2, q.height / 2);
              return { on: el.getAttribute("data-state") === "on", w: +q.width.toFixed(2), h: +q.height.toFixed(2), used: +used.toFixed(2), dir: cs.flexDirection,
                perimeter: +bf.opacity, mark: a.content === "none" ? null : { size: parseFloat(a.width), opacity: +a.opacity } }; }) };
        });
      });
      for (const g of r) {
        const tile = g.fact !== "none";
        const wantTile = g.name === "Spring preset" || g.name === "Mix sources";
        const corner = g.items.every((i) => Math.abs(i.used - (tile ? g.field : i.h / 2)) < 0.5);
        const heights = [...new Set(g.items.map((i) => i.h))];
        const sel = g.items.filter((i) => i.on);
        const carried = !tile || sel.every((i) => i.perimeter === 1 && i.mark && i.mark.opacity === 1 && i.mark.size > 0);
        const ok = tile === wantTile && corner && carried;
        n++; if (ok) pass++;
        const line = `${ok ? "PASS" : "FAIL"} ${label} ${mode} · "${g.name}" (${g.role}${g.size ? `, ${g.size}` : ""}) · fact ${g.fact} · ${g.items.length} items ${g.items[0].w}×${heights.join("/")} · corner ${[...new Set(g.items.map((i) => i.used))].join("/")} px (${tile ? `field ${g.field}` : "h/2"}) · ${tile ? `selected ${sel.length}: perimeter ${sel.map((i) => i.perimeter).join("/")}, mark ${sel.map((i) => `${i.mark?.size}px@${i.mark?.opacity}`).join("/")}` : "pills"}`;
        console.log("  " + line); out.cells.push(line);
      }
      const h = page.locator("text=Tiles").first();
      await h.scrollIntoViewIfNeeded().catch(() => {});
      const sec = page.locator('.toggle-group[aria-label="Spring preset"]');
      const bx = await sec.boundingBox(); const bx2 = await page.locator('.toggle-group[aria-label="Mix sources"]').boundingBox();
      if (bx && bx2) await page.screenshot({ path: path.join(shots, `story-tiles-${engine}-${mode}.png`), clip: { x: Math.max(0, bx.x - 24), y: Math.max(0, bx.y - 24), width: Math.max(bx.width, bx2.width) + 48, height: bx2.y + bx2.height - bx.y + 48 } });
      // focused-selected: Tab into the spring group lands on its checked tile
      await page.locator('.toggle-group[aria-label="Spring preset"] .toggle-group__item[data-state="on"]').focus();
      await page.keyboard.press("ArrowRight"); await page.waitForTimeout(700);
      if (bx && bx2) await page.screenshot({ path: path.join(shots, `story-tiles-${engine}-${mode}-arrowed.png`), clip: { x: Math.max(0, bx.x - 24), y: Math.max(0, bx.y - 24), width: Math.max(bx.width, bx2.width) + 48, height: bx2.y + bx2.height - bx.y + 48 } });
      const ours = errs.filter((e) => /ToggleGroup/.test(e));
      console.log(`  INFO ${label} ${mode} · console errors naming ToggleGroup: ${ours.length}${ours[0] ? ` «${ours[0].slice(0, 120)}»` : ""} (of ${errs.length} page errors) · load ${load()}`);
      out.cells.push(`${label} ${mode} ToggleGroup errors ${ours.length} of ${errs.length}`);
      await ctx.close();
    }
    } finally { await b.close(); }
  }
} finally { await server.close(); lock.release?.(); }
console.log(`D4-F p4 proto story · gating ${pass}/${n} · load ${load()} at end`);
if (args.json) fs.writeFileSync(String(args.json), JSON.stringify({ ...out, pass, n }, null, 2));
process.exit(0);

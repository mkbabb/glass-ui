#!/usr/bin/env node
// console.mjs <url>: loads one URL headless (Chromium) and prints its console errors,
// page errors and whether <main> mounted. One browser, closed in finally.
import { createRequire } from "node:module";
import { resolve, dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
const HERE = dirname(fileURLToPath(import.meta.url));
const require = createRequire(join(resolve(HERE, "../trees/v11.1.1"), "package.json"));
const { chromium } = require("playwright");
const browser = await chromium.launch({ headless: true });
try {
    const page = await browser.newPage();
    page.on("console", (m) => m.type() === "error" && console.log("console:", m.text().slice(0, 300)));
    page.on("pageerror", (e) => console.log("pageerror:", String(e).slice(0, 300)));
    page.on("requestfailed", (r) => console.log("requestfailed:", r.url(), r.failure()?.errorText));
    await page.goto(process.argv[2], { waitUntil: "load" });
    await page.waitForTimeout(3000);
    console.log("main:", await page.$$eval("main", (m) => m.length), "app html:", (await page.$eval("#app", (e) => e.innerHTML.length).catch(() => -1)));
} finally {
    await browser.close();
}

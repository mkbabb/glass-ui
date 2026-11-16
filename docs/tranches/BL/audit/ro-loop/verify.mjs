#!/usr/bin/env node
// The adversarial verifier's one reading (claude-fable-5-2, 2026-11-16). Live site, WebKit,
// the same stylesheet hold as hold.sh. Three rows, interleaved per rep, one browser, one
// context per cell:
//   bare      no ResizeObserver wrapper at all, only a window `error` listener
//             (is the error there without the finder's instrumentation?)
//   rafForce  no wrapper; a rAF loop reads documentElement.getBoundingClientRect() every
//             frame, so layout is forced BEFORE the frame's deliveries and no observer is
//             changed. The finding's cause predicts 0 errors here: nothing is left 0x0 for
//             a callback's read to box inside the delivery.
//   cure      the cure set, written independently of probe.mjs: useBarShape's test from
//             entry.borderBoxSize (style reads only); the card fit observer and the
//             selection indicator run at the next frame.
//   ~/.claude/guard/guarded --exclusive webkit --timeout 20 -- node verify.mjs [--reps 3]
import { writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
const { webkit } = await import(process.env.PW ?? "playwright");

const here = dirname(fileURLToPath(import.meta.url));
const argv = process.argv.slice(2);
const reps = Number(argv.includes("--reps") ? argv[argv.indexOf("--reps") + 1] : 3);
const BASE = "https://glass.babb.dev/";
const HOLD_RE = /PresetEditor/;
const HOLD_MS = 1500;
const CELLS = [
    { width: 1440, scheme: "light" },
    { width: 390, scheme: "dark" },
];
const ROWS = ["bare", "rafForce", "cure"];

function init(row) {
    const R = (window.__v = { errs: [], zeroFirst: 0, wrapped: {}, frame: 0 });
    (function tick() {
        R.frame++;
        if (row === "rafForce") document.documentElement.getBoundingClientRect();
        requestAnimationFrame(tick);
    })();
    addEventListener("error", (e) => {
        if (/ResizeObserver/.test(e.message ?? "")) R.errs.push({ frame: R.frame, t: +performance.now().toFixed(0) });
    }, true);
    if (row !== "cure") return;
    const Orig = window.ResizeObserver;
    window.ResizeObserver = class extends Orig {
        constructor(cb) {
            const stack = new Error().stack ?? "";
            const kind = /useBarShape/.test(stack) ? "bar" : /storyTile|useSelectionGroup/.test(stack) ? "defer" : "plain";
            R.wrapped[kind] = (R.wrapped[kind] ?? 0) + 1;
            super(function (entries, obs) {
                if (kind === "bar") {
                    for (const e of entries) {
                        const box = e.borderBoxSize?.[0];
                        if (!box) continue;
                        if (box.inlineSize === 0 && box.blockSize === 0) R.zeroFirst++;
                        const rem = parseFloat(getComputedStyle(document.documentElement).fontSize) || 16;
                        const rung = parseFloat(getComputedStyle(e.target).minBlockSize);
                        void (box.inlineSize > 20 * rem + 0.5 || (rung > 0 && box.blockSize > rung + 0.5));
                    }
                    return;
                }
                if (kind === "defer") return void requestAnimationFrame(() => cb.call(this, entries, obs));
                return cb.call(this, entries, obs);
            });
        }
    };
}

const results = [];
const browser = await webkit.launch();
try {
    console.log(`WebKit ${browser.version()}`);
    for (let rep = 1; rep <= reps; rep++) {
        for (const row of ROWS) {
            for (const { width, scheme } of CELLS) {
                const cell = `${row} ${width} ${scheme} rep${rep}`;
                const context = await browser.newContext({ colorScheme: scheme, viewport: { width, height: 900 } });
                try {
                    await context.addInitScript(init, row);
                    await context.route(
                        (u) => /\.css$/.test(u.pathname) && HOLD_RE.test(u.pathname),
                        async (r) => {
                            await new Promise((done) => setTimeout(done, HOLD_MS));
                            await r.continue().catch(() => {});
                        },
                    );
                    const page = await context.newPage();
                    const pageerrors = [];
                    page.on("pageerror", (e) => pageerrors.push(String(e).slice(0, 160)));
                    const nav = await page.goto(BASE, { waitUntil: "load", timeout: 60000 }).catch((e) => e);
                    if (nav instanceof Error) {
                        console.log(`${cell}: NO READING (${nav.message.split("\n")[0]})`);
                        results.push({ cell, row, noReading: true });
                        continue;
                    }
                    await page.waitForTimeout(6000);
                    const R = await page.evaluate(() => window.__v);
                    const cards = await page.locator("[data-story-card]").count();
                    const ro = pageerrors.filter((e) => /ResizeObserver/.test(e)).length;
                    const other = pageerrors.filter((e) => !/ResizeObserver/.test(e));
                    results.push({ cell, row, cards, roPageErrors: ro, windowErrs: R.errs, wrapped: R.wrapped, zeroFirst: R.zeroFirst, other });
                    console.log(`${cell}: cards ${cards}, RO loop pageerrors ${ro}, window errors ${R.errs.length}${R.errs.length ? ` at ${R.errs.map((e) => `f${e.frame} t=${e.t}`).join(", ")}` : ""}${row === "cure" ? `, wrapped ${JSON.stringify(R.wrapped)}, 0x0 bar deliveries ${R.zeroFirst}` : ""}${other.length ? `, other errors ${JSON.stringify(other)}` : ""}`);
                } finally {
                    await context.unrouteAll({ behavior: "ignoreErrors" }).catch(() => {});
                    await context.close().catch(() => {});
                }
            }
        }
    }
} finally {
    await browser.close();
}
console.log("\n== tally (red cells / cells with a reading)");
for (const row of ROWS) {
    const got = results.filter((r) => r.row === row && !r.noReading);
    console.log(`  ${row}: ${got.filter((r) => r.windowErrs.length > 0).length}/${got.length}`);
}
const outDir = join(here, "out", "verify-fable");
mkdirSync(outDir, { recursive: true });
writeFileSync(join(outDir, "verify.json"), JSON.stringify(results, null, 1));

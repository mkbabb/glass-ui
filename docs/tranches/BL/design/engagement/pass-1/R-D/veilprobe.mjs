#!/usr/bin/env node
// veilprobe.mjs · R-D: after the E-7 split, does the modal's scrim veil still paint? Computed opacity of
// .glass-focus-veil 600 ms after the dialog opens, and the attributes it keys on.  node veilprobe.mjs <build> [engine]
const H = new URL("../../harness/", import.meta.url).pathname;
const L = await import(`${H}lib.mjs`);
const [build, engine = "chromium"] = process.argv.slice(2);
await L.acquireLock();
const T = await L.serveTarget({ build }); const E = new L.Engine(engine); await E.browser();
const P = await L.openPage(E, T, "modal", {}); await P.page.waitForTimeout(600);
console.log(`veilprobe ${engine} · ` + await P.page.evaluate(() => [...document.querySelectorAll(".glass-focus-veil")].map((v) => `opacity ${getComputedStyle(v).opacity} · data-engaged ${v.hasAttribute("data-engaged")} · parent data-state ${v.parentElement?.getAttribute("data-state")}`).join(" | ")) + ` · load ${L.load()}`);
await P.close(); await E.close(); process.exit(0);

#!/usr/bin/env node
// R-E · (reads the stage veil element when one exists, else the host; the first runs read the host's ::backdrop) · every-frame film of the promoted slider's ::backdrop opacity for 1 s after a pointer hold, with the host's
// attribute and child mutations timestamped, to locate WebKit's mid-hold veil drop. node stage-flicker-film.mjs --build <glance>
const L = "/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/engagement/harness/lib.mjs";
const { serveTarget, Engine, openPage, center, load, parseArgs, acquireLock } = await import(L);
const a = parseArgs(); await acquireLock();
const T = await serveTarget({ build: a.build });
for (const name of (a.engines ?? "chromium,webkit").split(",")) {
  const E = new Engine(name); await E.browser();
  const P = await openPage(E, T, "glance", { vp: { width: 900, height: 640 } });
  await P.page.evaluate(() => { const e = document.querySelector('[data-g="slider-a"]'); window.__m = []; const t0 = { v: 0 }; window.__t0 = t0;
    new MutationObserver((ms) => { for (const m of ms) window.__m.push(`${(performance.now() - t0.v).toFixed(0)}ms ${m.type}${m.attributeName ? " " + m.attributeName : ""}${m.addedNodes?.length ? " +" + [...m.addedNodes].map((n) => n.className || n.nodeName).join(",") : ""}`); }).observe(e, { attributes: true, childList: true, subtree: true }); });
  const c = await center(P.page, '[data-g="slider-a"] [role=slider]');
  await P.page.mouse.move(c.x, c.y);
  const film = P.page.evaluate(async () => { const e = document.querySelector('[data-g="slider-a"]'); while (!e.matches(":popover-open")) await new Promise((r) => requestAnimationFrame(r)); window.__t0.v = performance.now(); window.__m.length = 0;
    const s = []; while (performance.now() - window.__t0.v < 1000) { s.push(`${(performance.now() - window.__t0.v).toFixed(0)}:${(+getComputedStyle(document.querySelector(".glass-focus-veil") ?? e).opacity).toFixed(2)}`); await new Promise((r) => requestAnimationFrame(r)); }
    return { s, m: window.__m.slice(0, 30) }; });
  await P.page.mouse.down(); const r = await film; await P.page.mouse.up();
  const drops = r.s.filter((x, i, A) => i > 0 && +x.split(":")[1] < +A[i - 1].split(":")[1] - 0.05);
  console.log(`${name} frames ${r.s.length} · drops ${drops.join(" ") || "none"} · load ${load()}`);
  console.log(`${name} film ${r.s.join(" ")}`);
  console.log(`${name} mutations ${r.m.join(" | ")}`);
  await E.close();
}
T.close();

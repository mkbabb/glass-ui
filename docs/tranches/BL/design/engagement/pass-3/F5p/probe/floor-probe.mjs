// F5' probe: the floor's three mechanisms that no HEAD scene exercises by itself, read in the browser on a build.
//   F-7  the mount frame: a state member's door host (the Switch) carries data-engage-arming (and transition-property
//        none) in the mount's own task and has lifted it by the second frame; the button and slider never arm
//   F-8  the commit's loud read: a stateless commit with an unreadable envelope clock speaks on the commit edge; a door
//        host stamped with a committing class (--rung-class: chosen, as A's recipe would stamp it) speaks for
//        --rung-light when the token is absent (it is A's, absent at HEAD+F5'); each beside its quiet control
//   F-9  AUTH-4: under reduce, the commit seat's computed transition-duration is the envelope's (60ms/180ms legs),
//        against the instant fallback (0s) on an unauthorized ::after; without reduce, the seat's own value
//   node floor-probe.mjs --build <dir> [--engine chromium|webkit]
// One browser per run, a fresh context per cell, everything closed in finally.
import { Engine, serveTarget, openPage, parseArgs, load } from "../../../harness/lib.mjs";
const a = parseArgs(); const E = new Engine(a.engine ?? "chromium"); const T = await serveTarget(a);
const out = (cell, verdict, line) => console.log(`${verdict.padEnd(5)} ${cell} · ${line} · load ${load()}`);
const raf = `new Promise((ok) => requestAnimationFrame(() => ok()))`;
try {
  console.log(`# floor-probe ${E.name} build ${a.build} · load at start ${load()}`);
  // ── F-7 ──
  for (const [scene, sel, arms] of [["switch", '[data-e~="target"]', true], ["button", '[data-e~="target"]', false], ["slider", '[data-e~="root"]', false]]) {
    const P = await openPage(E, T, scene, { q: { defer: "1" } });
    try {
      const r = await P.page.evaluate(async ([sel, raf]) => {
        const next = () => eval(raf);
        await window.__e.mount();
        const pick = () => { const t = document.querySelector(sel); return t?.closest("[data-engage-arming]") ?? t?.querySelector("[data-engage-arming]") ?? t; };
        const h = pick(); const read = (el) => ({ arming: el.hasAttribute("data-engage-arming"), tp: getComputedStyle(el).transitionProperty, tag: el.tagName.toLowerCase() + (el.className ? "." + String(el.className).split(" ")[0] : "") });
        const t0 = read(h); await next(); const t1 = read(h); await next(); const t2 = read(h);
        return { t0, t1, t2 };
      }, [sel, raf]);
      const ok = arms ? r.t0.arming && r.t0.tp === "none" && !r.t2.arming && r.t2.tp !== "none" : !r.t0.arming && r.t0.tp !== "none";
      out(`F-7 ${scene} mount frame (${arms ? "a state member: armed" : "not a state member: never armed"})`, ok ? "PASS" : "FAIL", `host ${r.t0.tag} · mount task: arming ${r.t0.arming}, transition-property ${r.t0.tp} · frame 1: arming ${r.t1.arming}, ${r.t1.tp.slice(0, 40)} · frame 2: arming ${r.t2.arming}, ${r.t2.tp.slice(0, 40)}`);
    } finally { await P.close(); }
  }
  // ── F-8 ──
  for (const plant of [false, true]) {
    const P = await openPage(E, T, "button");
    try {
      await P.page.waitForTimeout(150); const e0 = P.errors.length;
      await P.page.evaluate((plant) => { const b = document.querySelector('[data-e~="target"]'); if (plant) b.style.setProperty("--engage-control-engage-attack", "nonsense"); b.click(); }, plant);
      await P.page.waitForTimeout(100); const errs = P.errors.slice(e0);
      const said = errs.some((e) => e.includes("--engage-control-engage-attack"));
      out(`F-8 button commit ${plant ? "plant --engage-control-engage-attack: nonsense" : "clean"}`, said === plant ? "PASS" : "FAIL", `console.error on the commit edge: ${errs.length} (${errs.map((e) => e.slice(0, 90)).join(" | ") || "none"})`);
    } finally { await P.close(); }
  }
  for (const stamp of [false, true]) {
    const P = await openPage(E, T, "switch", { q: { defer: "1" } });
    try {
      const e0 = P.errors.length;
      await P.page.evaluate(async ([stamp, raf]) => { const next = () => eval(raf); await window.__e.mount(); if (stamp) document.querySelector('[data-e~="target"]').style.setProperty("--rung-class", "chosen"); await next(); await next(); }, [stamp, raf]);
      await P.page.waitForTimeout(100); const errs = P.errors.slice(e0);
      const said = errs.some((e) => e.includes("--rung-light"));
      out(`F-8 switch (commit: state) ${stamp ? "stamped --rung-class: chosen (a committing class), --rung-light absent at this build" : "unstamped (no class recipe yet: envelope read only)"}`, said === stamp ? "PASS" : "FAIL", `console.error at the mount frame: ${errs.length} (${errs.map((e) => e.slice(0, 90)).join(" | ") || "none"})`);
    } finally { await P.close(); }
  }
  // ── F-4 ── the pager rail's press, through the door's mark, on the pip under the pressed dot
  {
    const P = await openPage(E, T, "gallery");
    try {
      const dot = P.page.locator('[data-slot="pager-dot"]').nth(1); await dot.scrollIntoViewIfNeeded();
      const bb = await dot.boundingBox();
      const pips = () => P.page.evaluate(() => [...document.querySelectorAll(".pager-bed-layer .goo-dot")].map((e, i) => (e.hasAttribute("data-press") ? i : -1)).filter((i) => i >= 0));
      await P.page.mouse.move(bb.x + bb.width / 2, bb.y + bb.height / 2); await P.page.mouse.down(); await P.page.waitForTimeout(60);
      const down = await pips(); const scale = await P.page.evaluate(() => { const p = document.querySelector(".pager-bed-layer .goo-dot[data-press]"); return p ? getComputedStyle(p, "::before").scale : null; });
      await P.page.mouse.up(); await P.page.waitForTimeout(60); const up = await pips();
      await P.page.focus('[data-slot="pager-dot"][tabindex="0"]'); await P.page.keyboard.down("Enter"); await P.page.waitForTimeout(40); const key = await pips(); await P.page.keyboard.up("Enter"); await P.page.waitForTimeout(40); const keyUp = await pips();
      const ok = down.length === 1 && down[0] === 1 && up.length === 0 && key.length === 1 && keyUp.length === 0;
      out("F-4 pager press mark", ok ? "PASS" : "FAIL", `pointer down on dot 2: pips marked [${down}] (pip ::before scale ${scale}) · up: [${up}] · Enter held on the tab stop: [${key}] · Enter up: [${keyUp}]`);
    } finally { await P.close(); }
  }
  // ── F-9 ──
  for (const prm of [true, false]) {
    const P = await openPage(E, T, "passive", { prm });
    try {
      const r = await P.page.evaluate(() => {
        const host = document.createElement("div"); host.style.cssText = "position:fixed;left:0;top:0;width:40px;height:20px";
        host.innerHTML = `<div class="engage-chosen" data-state="unchecked"><span data-engage-face><span data-engage-light></span></span></div>`
          + `<div class="engage-chosen" data-state="checked"><span data-engage-face><span data-engage-light></span></span></div>`
          + `<div class="engage-disclosed" data-state="open"></div><button class="engage-pressed" data-commit="b"></button><button class="engage-pressed" data-commit="a"></button><div class="plain"></div>`;
        document.body.appendChild(host);
        const td = (el, p) => getComputedStyle(el, p).transitionDuration;
        const [rest, checked] = host.querySelectorAll("[data-engage-light]");
        return { rest: td(rest), checked: td(checked), open: td(host.querySelector(".engage-disclosed"), "::after"), parityB: td(host.querySelector('[data-commit="b"]'), "::after"), parityA: td(host.querySelector('[data-commit="a"]'), "::after"), plainAfter: td(host.querySelector(".plain"), "::after"), prm: matchMedia("(prefers-reduced-motion: reduce)").matches };
      });
      const env = (v, order) => v.replace(/\s/g, "") === order;
      const ok = prm
        ? r.prm && env(r.rest, "0.18s,0.06s") && env(r.parityA, "0.18s,0.06s") && env(r.checked, "0.06s,0.18s") && env(r.open, "0.06s,0.18s") && env(r.parityB, "0.06s,0.18s") && r.plainAfter === "0s"
        : !r.prm && r.plainAfter === "0s";
      out(`F-9 AUTH-4 ${prm ? "reduce" : "no-preference"}`, ok ? "PASS" : "FAIL", `seat transition-duration: rest [data-engage-light] ${r.rest}, checked ${r.checked}, disclosed open ::after ${r.open}, pressed parity b ::after ${r.parityB}, parity a ${r.parityA} · unauthorized plain ::after ${r.plainAfter}`);
    } finally { await P.close(); }
  }
} finally { await E.close(); T.close(); }

// P-A3 probe (D5 pass 3): the route-A cells the H3 battery carries no witness for.
//   node a3-probe.mjs --build <dir> [--engine chromium|webkit] [--only ck21,ck14,ck13,ck20] [--label <l>]
// One browser per run, a fresh context per cell, every page and context closed in a finally, the browser at the end.
// Every cell prints PASS / FAIL / UNMEASURED / REPORT with its numbers and the 1/5/15-minute load at its end.
//   ck21  the commit's light clocks and light read loudly: `--engage-control-engage-{attack,release}: nonsense` and
//         `--rung-light: nonsense` planted on the root, then a commit; PASS when ≥ 1 console.error names the token
//         (C-A2 §0 item 3 read 0 errors). A clean commit on the same scene must raise 0 errors.
//   ck14  the coarse dock trigger's 44 px hit-slop (C-A2 §0 item 4): an element with the class list DockTrigger
//         for="dropdown" renders, under (pointer: coarse), opened; its ::after must be centred on the face (left/top
//         = (face − slop)/2 within 0.5 px) and paint nothing (background alpha 0) at 60 ms after the open.
//   ck13  FL-3 arms read under emulation: forced colours (the seat removed, the disclosed press outlined in
//         Highlight, the held grow kept, the pager pip press kept) and reduced transparency (the seat kept).
//   ck20  the transition lists the members keep: the computed transition-property of each member host, printed for
//         the build; the geom build is read against the light build by the report (C-A2 §0 item 6).
import { parseArgs, serveTarget, Engine, openPage, load } from "../../../harness/lib.mjs";

const a = parseArgs();
const E = new Engine(a.engine ?? "chromium");
const T = await serveTarget({ build: a.build });
const only = typeof a.only === "string" ? new Set(a.only.split(",")) : null;
const want = (k) => !only || only.has(k);
const out = [];
const cell = (verdict, name, line) => { const l = `  ${verdict.padEnd(10)} ${name} · ${line} · load ${load()}`; out.push(l); console.log(l); };
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function withPage(scene, o, fn) {
  const P = await openPage(E, T, scene, o);
  try { return await fn(P); } finally { await P.close(); }
}

console.log(`# a3-probe ${a.label ?? ""} engine ${E.name} build ${a.build} load ${load()} at start`);
try {
  // ── CK-21 ─────────────────────────────────────────────────────────────────────────────────────────
  if (want("ck21")) {
    const scenes = ["switch", "checkbox", "radio", "chip", "chipaction", "button", "accordion", "toggle", "tabs"];
    const plants = [
      ["clean", null],
      ["--engage-control-engage-attack", "nonsense"],
      ["--engage-control-engage-release", "nonsense"],
      ["--rung-light", "nonsense"],
    ];
    // the tabs commit is the indicator's travel: its clock is `--tab-indicator-duration`, not the envelope's
    const plantsOf = (sc) => (sc === "tabs" ? [["clean", null], ["--tab-indicator-duration", "nonsense"]] : plants);
    for (const sc of scenes) for (const [tok, val] of plantsOf(sc)) {
      await withPage(sc, { theme: "light" }, async (P) => {
        const r = await P.page.evaluate(async ([tok, val]) => {
          const raf = () => new Promise((ok) => requestAnimationFrame(ok));
          await raf(); await raf();
          if (val) document.documentElement.style.setProperty(tok, val);
          const s0 = JSON.stringify(window.__e.state?.() ?? null);
          const tgt = document.querySelector('[data-e~="target"]');
          if (window.__e.index[window.__e.scene]?.stateless) tgt.click(); else window.__e.commit();
          for (let k = 0; k < 20; k++) await raf();
          return { s0, s1: JSON.stringify(window.__e.state?.() ?? null) };
        }, [tok, val]);
        await sleep(100);
        const errs = P.errors.filter((e) => !/pageerror/.test(e));
        const named = val ? errs.filter((e) => e.includes(tok)) : errs;
        const driven = r.s0 !== r.s1;
        const name = `CK-21 ${sc} ${val ? `${tok}: ${val}` : "clean commit"}`;
        if (!driven) cell("FAIL", name, `NOT DRIVEN: state ${r.s0} → ${r.s1}`);
        else if (!val) cell(errs.length === 0 ? "PASS" : "FAIL", name, `${errs.length} console.error on a clean commit${errs.length ? `: ${errs[0]}` : ""}`);
        else cell(named.length >= 1 ? "PASS" : "FAIL", name, `${named.length} console.error naming the token (${errs.length} in all)${named[0] ? `: "${named[0].slice(0, 110)}"` : ""}`);
      });
    }
  }

  // ── CK-14 ─────────────────────────────────────────────────────────────────────────────────────────
  if (want("ck14")) {
    for (const theme of ["light", "dark"]) {
      await withPage("button", { theme, coarse: true }, async (P) => {
        if (!P.modeOk) { cell("UNMEASURED", `CK-14 dock trigger slop ${theme}`, `MODE NOT APPLIED ${P.modeLine}`); return; }
        const r = await P.page.evaluate(async () => {
          const raf = () => new Promise((ok) => requestAnimationFrame(ok));
          const main = document.querySelector("main") ?? document.body;
          const b = document.createElement("button");
          // DockTrigger for="dropdown" → DropdownMenuTrigger: `menu__trigger engage-disclosed` plus the dock's trigger classes
          b.className = "menu__trigger engage-disclosed dock-trigger dock-dropdown-trigger";
          b.type = "button"; b.textContent = "⋯"; b.setAttribute("data-state", "closed");
          b.style.cssText = "inline-size: 32px; block-size: 24px; padding: 0; margin: 40px;";
          main.appendChild(b);
          await raf(); await raf();
          const read = () => {
            const box = b.getBoundingClientRect(); const cs = getComputedStyle(b, "::after");
            const w = parseFloat(cs.width), h = parseFloat(cs.height);
            const m = new DOMMatrixReadOnly(cs.transform === "none" ? undefined : cs.transform);
            const left = parseFloat(cs.left) + m.m41, top = parseFloat(cs.top) + m.m42;
            return { face: [box.width, box.height], slop: [w, h], left, top, bg: cs.backgroundColor, op: cs.opacity, content: cs.content, inset: [cs.top, cs.left, cs.bottom, cs.right].join(" ") };
          };
          const rest = read();
          b.setAttribute("data-state", "open");
          const t0 = performance.now(); let mid = null;
          while (performance.now() - t0 < 60) await raf();
          mid = read();
          return { rest, mid };
        });
        const ok = (x) => Math.abs(x.left - (x.face[0] - x.slop[0]) / 2) <= 0.5 && Math.abs(x.top - (x.face[1] - x.slop[1]) / 2) <= 0.5;
        const alpha = (c) => { const m = /rgba?\(([^)]+)\)/.exec(c); if (!m) return c === "transparent" ? 0 : NaN; const p = m[1].split(/[ ,/]+/).filter(Boolean); return p.length > 3 ? parseFloat(p[3]) : 1; };
        const paint = alpha(r.mid.bg);
        const pass = ok(r.rest) && ok(r.mid) && (paint === 0 || Number(r.mid.op) === 0);
        cell(pass ? "PASS" : "FAIL", `CK-14 dock trigger slop coarse ${theme}`, `face ${r.mid.face.map((v) => v.toFixed(1)).join("×")} px, slop ${r.mid.slop.map((v) => v.toFixed(1)).join("×")} px at ${r.mid.left.toFixed(2)}, ${r.mid.top.toFixed(2)} (centred: ${((r.mid.face[0] - r.mid.slop[0]) / 2).toFixed(2)}, ${((r.mid.face[1] - r.mid.slop[1]) / 2).toFixed(2)}); at rest ${r.rest.left.toFixed(2)}, ${r.rest.top.toFixed(2)}; 60 ms after open: background ${r.mid.bg}, opacity ${r.mid.op}`);
      });
    }
  }

  // ── CK-13 ─────────────────────────────────────────────────────────────────────────────────────────
  if (want("ck13")) {
    const emulate = async (P, kind) => {
      if (kind === "forced") { await P.page.emulateMedia({ forcedColors: "active" }); }
      else if (E.name === "chromium") { const s = await P.ctx.newCDPSession(P.page); await s.send("Emulation.setEmulatedMedia", { features: [{ name: "prefers-reduced-transparency", value: "reduce" }] }); }
      return P.page.evaluate((k) => matchMedia(k === "forced" ? "(forced-colors: active)" : "(prefers-reduced-transparency: reduce)").matches, kind);
    };
    for (const kind of ["forced", "transparency"]) {
      // the seat on each light-committing member, 60 ms into a commit
      for (const sc of ["switch", "checkbox", "radio", "chip", "chipaction", "button", "accordion", "toggle"]) {
        await withPage(sc, { theme: "light" }, async (P) => {
          const on = await emulate(P, kind);
          if (!on) { cell("UNMEASURED", `CK-13 ${kind} seat ${sc}`, `the engine does not apply ${kind === "forced" ? "(forced-colors: active)" : "(prefers-reduced-transparency: reduce)"} (engine limit)`); return; }
          const r = await P.page.evaluate(async () => {
            const raf = () => new Promise((ok) => requestAnimationFrame(ok));
            await raf(); await raf();
            const tgt = document.querySelector('[data-e~="target"]');
            const seatOf = () => { const face = document.querySelector('[data-e~="face"]') ?? tgt; const l = face.querySelector?.("[data-engage-light]"); return l ? [l, null] : [tgt, "::after"]; };
            if (window.__e.index[window.__e.scene]?.stateless) tgt.click(); else window.__e.commit();
            const t0 = performance.now(); while (performance.now() - t0 < 60) await raf();
            const [el, pseudo] = seatOf(); const cs = getComputedStyle(el, pseudo);
            return { display: cs.display, op: cs.opacity, bg: cs.backgroundColor, content: cs.content, where: pseudo ? "::after" : "[data-engage-light]" };
          });
          const pass = kind === "forced" ? r.display === "none" : r.display !== "none";
          cell(pass ? "PASS" : "FAIL", `CK-13 ${kind} seat ${sc}`, `${r.where} display ${r.display}, opacity ${r.op}, background ${r.bg} at 60 ms into the commit (arm: ${kind === "forced" ? "removed" : "kept"})`);
        });
      }
      // the disclosed press: the accordion trigger held by the pointer
      await withPage("accordion", { theme: "light" }, async (P) => {
        const on = await emulate(P, kind);
        if (!on) { cell("UNMEASURED", `CK-13 ${kind} disclosed press`, "engine limit"); return; }
        const t = await P.page.$('[data-e~="target"]'); const bb = await t.boundingBox();
        await P.page.mouse.move(bb.x + bb.width / 2, bb.y + bb.height / 2); await P.page.mouse.down(); await sleep(150);
        const r = await t.evaluate((e) => { const cs = getComputedStyle(e); return { active: e.matches(":active"), outline: `${cs.outlineStyle} ${cs.outlineWidth} ${cs.outlineColor}`, bg: cs.backgroundColor }; });
        await P.page.mouse.up();
        const pass = r.active && (kind === "forced" ? r.outline.startsWith("solid 2px") : true);
        cell(pass ? "PASS" : "FAIL", `CK-13 ${kind} disclosed press`, `:active ${r.active}, outline ${r.outline}, background ${r.bg} (arm: ${kind === "forced" ? "the Highlight ring" : "the wash kept"})`);
      });
      // the held grow: the slider engaged from the keyboard
      await withPage("slider", { theme: "light" }, async (P) => {
        const on = await emulate(P, kind);
        if (!on) { cell("UNMEASURED", `CK-13 ${kind} held grow`, "engine limit"); return; }
        await P.page.focus('[data-sentinel="before"]'); await P.page.keyboard.press(E.name === "webkit" ? "Alt+Tab" : "Tab"); await sleep(500);
        const r = await P.page.evaluate(() => { const e = document.querySelector('[data-e~="root"]'); const cs = getComputedStyle(e); return { engaged: e.hasAttribute("data-engaged"), scale: cs.scale, w: e.getBoundingClientRect().width, ow: e.offsetWidth }; });
        const k = r.w / r.ow;
        cell(r.engaged && k > 1.03 ? "PASS" : "FAIL", `CK-13 ${kind} held grow`, `engaged ${r.engaged}, scale ${r.scale}, box ×${k.toFixed(3)} (arm: the grow kept, geometry)`);
      });
      // the [data-press] mark: the pager pip under a pressed dot
      await withPage("gallery", { theme: "light" }, async (P) => {
        const on = await emulate(P, kind);
        if (!on) { cell("UNMEASURED", `CK-13 ${kind} pager press mark`, "engine limit"); return; }
        const dots = await P.page.$$("button.pager-dot"); const dot = dots[1] ?? dots[0];
        if (!dot) { cell("UNMEASURED", `CK-13 ${kind} pager press mark`, "no pager dot rendered"); return; }
        await dot.scrollIntoViewIfNeeded(); await sleep(100); const bb = await dot.boundingBox(); await P.page.mouse.move(bb.x + bb.width / 2, bb.y + bb.height / 2); await P.page.mouse.down(); await sleep(120);
        const r = await P.page.evaluate(() => { const p = document.querySelector(".goo-dot[data-press]"); if (!p) return null; const cs = getComputedStyle(p, "::before"); return { scale: cs.scale, bg: cs.backgroundColor }; });
        await P.page.mouse.up();
        cell(r && r.scale !== "none" && parseFloat(r.scale) < 1 ? "PASS" : "FAIL", `CK-13 ${kind} pager press mark`, r ? `pip ::before scale ${r.scale}, background ${r.bg} (arm: the press kept, geometry)` : "no [data-press] pip while pressed");
      });
    }
  }

  // ── CK-20 ─────────────────────────────────────────────────────────────────────────────────────────
  if (want("ck20")) {
    const hosts = [
      ["gallery", ".card[role=option]", "selectable card"], ["tabs", ".segmented-tabs", "tabs strip"], ["switch", '[data-slot="switch"]', "switch host"],
      ["switch", ".control-bit__face", "switch face"], ["chip", '[data-e~="target"]', "chip"], ["chipaction", '[data-e~="target"]', "action chip"],
      ["button", '[data-e~="target"]', "button"], ["toggle", '[data-e~="target"]', "toggle item"], ["accordion", '[data-e~="target"]', "accordion trigger"],
    ];
    for (const [sc, sel, name] of hosts) {
      await withPage(sc, { theme: "light" }, async (P) => {
        const r = await P.page.evaluate((sel) => { const e = document.querySelector(sel); e?.scrollIntoView?.(); if (!e) return null; const cs = getComputedStyle(e); return { p: cs.transitionProperty, d: cs.transitionDuration, t: cs.transform }; }, sel);
        cell(r ? "REPORT" : "UNMEASURED", `CK-20 transition list ${name}`, r ? `property [${r.p}] duration [${r.d}] transform ${r.t}` : `no ${sel}`);
      });
    }
  }
} finally {
  await E.close(); T.close();
}
const n = (v) => out.filter((l) => l.trim().startsWith(v)).length;
console.log(`a3-probe ${a.label ?? ""} ${E.name} · ${n("PASS")} pass, ${n("FAIL")} fail, ${n("UNMEASURED")} unmeasured, ${n("REPORT")} report · load ${load()} at end`);

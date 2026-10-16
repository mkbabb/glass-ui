// C-A2 probe: what the engagement utilities do to the elements they land on beyond the eight scored members.
//   node collide.mjs <build> <engine>      closes every browser it opens (finally)
// 1. ExpandableContainer composes engage-disclosed on its whole root: a press inside its content (`:active` matches
//    every ancestor) — read the root's background-color at rest and while a mouse button is down on the panel.
// 2. The coarse dock trigger (DockTrigger for="dropdown" renders DropdownMenuTrigger → `menu__trigger engage-disclosed`
//    plus `dock-trigger dock-dropdown-trigger`, src/components/dock/DockTrigger.vue:43-47,68-76): its `::after` is the
//    touch-floor hit-slop (dock/styles/controls/touch-floor.css:44-52) AND the engage light seat. A synthetic element with
//    that exact class list, data-state open, under (pointer: coarse): read the ::after box and paint.
// 3. Held members the door never reaches: NumberField and Timeline compose engage-held; hold a pointer on them and
//    read data-engaged and scale.
// 4. Per chosen/disclosed member root: computed transform and transition-property (the geometric arm writes both from
//    the utilities layer).
import { serveTarget, load, Engine, openPage } from "../../../harness/lib.mjs";
const [build, engine = "chromium"] = process.argv.slice(2);
const T = await serveTarget({ build });
const E = new Engine(engine);
const out = { build, engine, loadStart: load() };
try {
  // 1 + 3 + 4 on the gallery, fine pointer
  for (const theme of ["light", "dark"]) {
    const Q = await openPage(E, T, "gallery", { theme });
    try {
      await Q.page.waitForTimeout(600);
      const p = Q.page;
      const ex = await p.evaluate(() => { const r = document.querySelector(".expandable-container"); if (!r) return null; const pn = r.querySelector('[data-part="panel"]'); const b = pn.getBoundingClientRect(); return { bg: getComputedStyle(r).backgroundColor, box: [r.offsetWidth, r.offsetHeight], x: b.x + b.width / 2, y: b.y + b.height / 2, cls: r.className }; });
      if (ex) {
        await p.mouse.move(ex.x, ex.y); await p.mouse.down(); await p.waitForTimeout(250);
        const pressed = await p.evaluate(() => { const r = document.querySelector(".expandable-container"); return { bg: getComputedStyle(r).backgroundColor, active: r.matches(":active") }; });
        await p.mouse.up(); await p.waitForTimeout(500);
        const after = await p.evaluate(() => getComputedStyle(document.querySelector(".expandable-container")).backgroundColor);
        out[`expandable-${theme}`] = { rest: ex.bg, pressed250: pressed.bg, rootActive: pressed.active, released500: after, box: ex.box, cls: ex.cls };
      }
      // 3: held members
      for (const sel of [".number-field", ".tl"]) {
        const h = await p.evaluate((s) => { const r = document.querySelector(s); if (!r) return null; const b = r.getBoundingClientRect(); return { x: b.x + Math.min(20, b.width / 2), y: b.y + b.height / 2, rc: getComputedStyle(r).getPropertyValue("--rung-class"), w: b.width }; }, sel);
        if (!h) { out[`held${sel}-${theme}`] = "not rendered"; continue; }
        await p.mouse.move(h.x, h.y); await p.mouse.down(); await p.waitForTimeout(450);
        const held = await p.evaluate((s) => { const r = document.querySelector(s); return { engaged: r.hasAttribute("data-engaged"), held: r.hasAttribute("data-held"), scale: getComputedStyle(r).scale, w: r.getBoundingClientRect().width }; }, sel);
        await p.mouse.up(); await p.keyboard.press("Escape"); await p.waitForTimeout(300);
        out[`held${sel}-${theme}`] = { rungClass: h.rc.trim(), restW: h.w, ...held };
      }
      // 4: transform/transition on class roots
      out[`roots-${theme}`] = await p.evaluate(() => [...document.querySelectorAll(".engage-chosen, .engage-disclosed, .engage-pressed")].map((r) => { const c = getComputedStyle(r); return { el: r.tagName.toLowerCase() + "." + [...r.classList].slice(0, 3).join("."), state: r.getAttribute("data-state"), transform: c.transform, tprops: c.transitionProperty.split(",").length + ":" + c.transitionProperty.slice(0, 90), w: Math.round(r.getBoundingClientRect().width) }; }));
    } finally { await Q.close(); }
  }
  // 2: the coarse dock dropdown trigger, synthetic, both themes
  for (const theme of ["light", "dark"]) {
    const Q = await openPage(E, T, "gallery", { theme, coarse: true });
    try {
      out[`docktrigger-coarse-${theme}`] = await Q.page.evaluate(async () => {
        const host = document.createElement("div"); host.style.cssText = "position:fixed;left:40px;top:40px;z-index:99";
        const b = document.createElement("button"); b.className = "dock-trigger dock-dropdown-trigger menu__trigger engage-disclosed"; b.textContent = "Aa"; b.setAttribute("data-state", "closed");
        host.append(b); document.body.append(host);
        await new Promise((r) => setTimeout(r, 300));
        const read = () => { const a = getComputedStyle(b, "::after"); const f = b.getBoundingClientRect(); return { face: [Math.round(f.width), Math.round(f.height)], afterW: a.width, afterH: a.height, afterBg: a.backgroundColor, afterOpacity: a.opacity, afterInset: [a.top, a.left], afterTransform: a.transform, afterZ: a.zIndex, coarse: matchMedia("(pointer: coarse)").matches }; };
        const closed = read();
        b.setAttribute("data-state", "open");
        await new Promise((r) => setTimeout(r, 60)); const open60 = read();
        await new Promise((r) => setTimeout(r, 1200)); const open1200 = read();
        host.remove();
        return { closed, open60, open1200 };
      });
    } finally { await Q.close(); }
  }

  // 5: CK-21 on the light commit's clocks: an unreadable --engage-control-engage-{attack,release} (CSS-only reads)
  for (const planted of [false, true]) {
    const Q = await openPage(E, T, "switch", { theme: "dark" });
    try {
      const p = Q.page;
      if (planted) await p.addStyleTag({ content: ":root,.dark{--engage-control-engage-attack:nonsense!important;--engage-control-engage-release:nonsense!important}" });
      await p.waitForTimeout(300);
      const t = await p.evaluate(() => { const r = document.querySelector('[data-e~="target"]').getBoundingClientRect(); return { x: r.x + r.width / 2, y: r.y + r.height / 2 }; });
      await p.mouse.click(t.x, t.y);
      const film = await p.evaluate(async () => { const L = document.querySelector('[data-e~="target"] [data-engage-light]') ?? document.querySelector("[data-engage-light]"); const o = []; const t0 = performance.now(); while (performance.now() - t0 < 700) { await new Promise((r) => requestAnimationFrame(r)); const c = getComputedStyle(L); o.push([Math.round(performance.now() - t0), +(+c.opacity).toFixed(3), c.backgroundColor]); } return { tr: getComputedStyle(L).transition.slice(0, 160), film: o.filter((_, i) => i % 4 === 0) }; });
      out[`ck21-lightclock-${planted ? "planted" : "clean"}`] = { ...film, consoleErrors: Q.errors.length, errs: Q.errors.slice(0, 3) };
    } finally { await Q.close(); }
  }
} catch (e) { out.error = String(e?.message ?? e); }
finally { await E.close().catch(() => {}); T.close?.(); }
out.loadEnd = load();
console.log(JSON.stringify(out, null, 1));
process.exit(0);

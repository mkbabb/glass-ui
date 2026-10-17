#!/usr/bin/env node
// ATTACK · H4-1 · F's critic attacks, route-neutral (REGISTRY §P3-6.2; rows E-3, R-2, R-9). Promoted from
// `../pass-3/D4-F-crit/probes/attack.mjs` (`Fc` §2.2-2.4) onto the shared attack compositions (`attack-route/`).
// Its nesting cell moved to FACT (`tile-in-pill`), which reads it as R-10/R-2's other nesting case.
//   empty  `c1-migrated`: no declaration, and every item's optional `#media` / `#meta` content is a false `v-if`.
//          Want pills: no tile fact and a used corner of h/2 (±0.5), light and dark. F's MIGRATION claim, "a group
//          whose items fill neither slot is pills", is the claim read; on a route without slots it reads the same
//   attrs  `preset-migrated`: a consumer class, style, data-*, aria-label, role="option", tabindex="0" and @click on
//          every item. A pointer click on item 0: the consumer handler ran once, the item is checked, the class, style,
//          data-* and aria-label landed, the role is the engine's `radio`, and the group keeps one tab stop
//   sup    `strip-migrated`: pills labelled "m<sup>2</sup> …", one row of text. On a development flavour (where a route
//          names a stacked pill) want 0 console errors or page errors; on a production flavour it is reported only
//   x5     H5-4 · `matrix-migrated`: the tile group's third option and the pill group's third option each hold a nested
//          group. On a development flavour want each named as holding an interactive descendant (X-5), counted from
//          NAVIGATION: the name fires at mount, before `__tile.ready`, and the pass-4 probes that counted from load
//          missed it (`Fc` §5). The line prints how many of the names arrived before ready. On a production flavour the
//          count is reported only
// A build that is not an attack build reads UNMEASURED.
//   node attack.mjs --build <out>/builds/<label>-atk | --fixture --family atk [--fault atk-empty] [--flavor src-dev]
// H4-5 · `crit.mjs --part tworow` (the pass-2/3 critics' copies) is retired: H3-3's one-row cells and H4-2's late cells
// in T-2 supersede it, and no part of this witness reproduces it.
import { cli, openPage, engineVersion, engineOf, f2 } from "./lib.mjs";
import { isAttack, noFact } from "./fact-split.mjs";

if (import.meta.url === `file://${process.argv[1]}`) {
  await cli("ATTACK", async (args, target) => {
    const engine = engineOf(args);
    const cells = [];
    const P0 = await openPage(target, engine, "__index");
    const migration = await P0.page.evaluate(() => window.__tile.migration ?? null);
    await P0.close();
    if (!isAttack(migration)) {
      for (const k of ["empty", "attrs", "sup", "x5"]) cells.push({ gating: true, pass: null, line: `${k} · UNMEASURED: not an attack build (migration ${migration?.label ?? "none"}); build with --route <harness>/attack-route` });
    } else {
      for (const mode of ["light", "dark"]) { // empty anatomy
        const P = await openPage(target, engine, "c1-migrated", { mode, query: { sel: 1 } });
        const r = await P.page.evaluate(async () => {
          await window.__th.frame();
          const g = document.querySelector("[data-scene] [data-group]"), items = [...g.querySelectorAll("[data-item]")];
          const c = window.__th.corner(items[0]);
          return { tile: getComputedStyle(g).getPropertyValue("--selection-tile").trim(), item: getComputedStyle(items[0]).getPropertyValue("--selection-tile").trim(),
            w: c.w, h: c.h, computed: c.computed, used: c.used, dir: getComputedStyle(items[0]).flexDirection,
            rows: items[0].querySelectorAll(".toggle-group__media, .toggle-group__meta, .media, .meta").length,
            empty: [...items[0].querySelectorAll(".toggle-group__media, .toggle-group__meta, .media, .meta")].filter((m) => !m.textContent.trim()).length };
        });
        await P.close();
        const pass = noFact(r.item) && Math.abs(r.used - r.h / 2) <= 0.5;
        cells.push({ gating: true, pass, line: `empty · c1-migrated ${mode} · group fact ${r.tile || "(unset)"}, item fact ${r.item || "(unset)"} · item 0 ${f2(r.w)}×${f2(r.h)} ${r.computed} → used ${f2(r.used)} (h/2 ${f2(r.h / 2)}), ${r.dir} · anatomy rows rendered ${r.rows}, empty ${r.empty} · want a pill (no tile fact, h/2)` });
      }
      { // consumer attributes
        const P = await openPage(target, engine, "preset-migrated", { mode: "light", query: { sel: "none" } });
        const box = await P.page.evaluate(() => { const r = document.querySelector("[data-scene] [data-item]").getBoundingClientRect(); return { x: r.x + r.width / 2, y: r.y + r.height / 2 }; });
        if (engine === "webkit") { // PF-1: hovering a ToggleGroupItem hangs Playwright WebKit's renderer; the click is dispatched without a hover
          await P.page.evaluate(() => document.querySelector("[data-scene] [data-item]").click());
        } else await P.page.mouse.click(box.x, box.y);
        await P.page.waitForTimeout(300);
        const r = await P.page.evaluate(() => {
          const items = [...document.querySelectorAll("[data-scene] [data-item]")], it = items[0];
          return { clicks: it.dataset.clicks ?? "0", checked: it.getAttribute("aria-checked"), role: it.getAttribute("role"), cls: it.classList.contains("atk-consumer"),
            style: it.style.getPropertyValue("--atk-style").trim(), consumer: it.dataset.consumer ?? null, label: it.getAttribute("aria-label"), stops: items.filter((x) => x.tabIndex >= 0).length };
        });
        await P.close();
        const pass = r.clicks === "1" && r.checked === "true" && r.role === "radio" && r.cls && r.style === "7" && r.consumer === "yes" && !!r.label?.startsWith("preset ") && r.stops === 1;
        cells.push({ gating: true, pass, line: `attrs · preset-migrated · ${engine === "webkit" ? "element.click() (PF-1)" : "pointer click"} on item 0: consumer @click ran ${r.clicks}× (want 1), aria-checked ${r.checked}, role ${r.role} (want radio), class ${r.cls}, style --atk-style "${r.style}", data-consumer ${r.consumer}, aria-label "${r.label}", tab stops ${r.stops} (want 1)` });
      }
      { // superscript
        const P = await openPage(target, engine, "strip-migrated", { mode: "light", query: { sel: 1 } });
        await P.page.waitForTimeout(1200);
        const r = await P.page.evaluate(() => { const it = document.querySelector("[data-scene] [data-item]"); const c = window.__th.corner(it); return { h: c.h, used: c.used, n: document.querySelectorAll("[data-scene] [data-item]").length }; });
        const errs = P.logs.filter((l) => l.type === "error" || l.type === "pageerror");
        await P.close();
        const dev = !!target.meta.dev;
        cells.push({ gating: dev, pass: errs.length === 0, line: `sup · strip-migrated [${target.meta.flavor}${dev ? "" : ": a production flavour, reported"}] · pill ${f2(r.h)} px, used ${f2(r.used)} · console errors ${errs.length} over ${r.n} one-row pills (want 0)${errs[0] ? ` «${errs[0].text.slice(0, 100)}»` : ""}` });
      }
      { // H5-4 · X-5's mount-time name on an option that holds a nested group, counted from navigation
        const P = await openPage(target, engine, "matrix-migrated", { mode: "light" });
        await P.page.waitForTimeout(300);
        const hosts = ["tc", "pc"];
        const named = hosts.map((id) => { const hit = P.logs.filter((l) => (l.type === "error" || l.type === "pageerror") && l.text.includes(`value="${id}" holds an interactive descendant`)); return { id, n: hit.length, atMount: hit.filter((l) => l.phase === "nav").length }; });
        const total = P.logs.filter((l) => l.type === "error" || l.type === "pageerror").length;
        await P.close();
        const dev = !!target.meta.dev;
        cells.push({ gating: dev, pass: named.every((x) => x.n >= 1), line: `x5 · matrix-migrated [${target.meta.flavor}${dev ? "" : ": a production flavour, reported"}] · console errors counted from navigation (${total} in all${process.env.TILE_HARNESS_LOGS_FROM === "ready" ? "; PLANTED: entries before ready dropped" : ""}) · ${named.map((x) => `option ${x.id} (holds a nested group) named ${x.n}× as holding an interactive descendant, ${x.atMount} before ready`).join("; ")} (want each ≥ 1)` });
      }
    }
    return { id: "ATTACK", title: "empty anatomy is pills, consumer attributes land under the engine, a superscript is not a second row, a nested group is named at mount (H4-1, H5-4; E-3, R-2, R-9, X-5)", engine, engineLabel: await engineVersion(engine), target: target.label, dev: target.meta.dev, cells };
  });
}

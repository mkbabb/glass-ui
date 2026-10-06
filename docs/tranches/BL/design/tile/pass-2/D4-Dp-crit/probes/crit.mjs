#!/usr/bin/env node
// D4-D′ critic probe · the census rows the H2 battery does not read on the migrated arms, plus the PRT hover.
//   --part tone   X-7: a per-item/per-group tone reaches the selected EDGE, TINT and INK. The group takes
//                 --selection-tone (a red and a pale pink); the selected tile's computed fill, perimeter and ink are
//                 read against the untoned tile, and the painted interior (ink hidden, scale pinned) is sampled.
//                 A row passes only when the edge, the tint and the ink each change with the tone.
//   --part desc   X-5: an interactive descendant (preset-input) is refused LOUDLY in DEV: console errors on src-dev,
//                 and on dist (production) the structural walk (Q-5 (b)) is the only answer.
//   --part x3     X-3: the commit never rewrites the slot. K2 migrated: content-visibility on the tile; a direct
//                 write into a tile's readout survives a programmatic commit and a pointer commit; mutations under
//                 the slot during the commit (childList / characterData) are counted.
//   --part x6     X-6: the deselectable single on the migrated K1 (sel=none): nothing checked, no perimeter, Tab
//                 lands on item 0; then a programmatic commit checks exactly one.
//   --part clip   the K2 tile's perimeter under its consumer `content-visibility: auto` (paint containment):
//                 the painted width of the selected edge on preset-migrated against specimen-migrated.
//   node crit.mjs --build <out>/builds/<label> --part tone|desc|x3|x6|clip [--engines chromium,webkit]
import { parseArgs, openTarget, openPage, closeBrowsers, acquireLock, load, engineVersion, shot, contrast } from "../../../harness/lib.mjs";

const args = parseArgs();
const part = String(args.part ?? "tone");
const engines = String(args.engines ?? "chromium,webkit").split(",");
const lock = await acquireLock(`dp-crit-${part}`);
const target = await openTarget(args);
console.log(`D4-D′ critic probe · part ${part} · ${target.label} (flavor ${target.meta.flavor}) · load ${load()} at start`);
let pass = 0, n = 0;
const errors = (P) => P.logs.filter((l) => l.type === "error" || l.type === "pageerror").map((l) => l.text);
const rgbIn = `(v) => { const c = document.createElement("canvas").getContext("2d"); c.fillStyle = "#000"; c.fillStyle = v; c.fillRect(0,0,1,1); return [...c.getImageData(0,0,1,1).data]; }`;
for (const engine of engines) {
  console.log(`engine ${await engineVersion(engine)}`);
  if (part === "tone") for (const scene of ["preset-migrated", "specimen-migrated", "strip-migrated"]) for (const mode of ["light", "dark"]) {
    const read = async (tone) => {
      const P = await openPage(target, engine, scene, { mode });
      const r = await P.page.evaluate(async ({ tone, rgbSrc }) => {
        const rgb = (0, eval)(rgbSrc);
        const g = document.querySelector("[data-group]"); if (tone) g.style.setProperty("--selection-tone", tone);
        const th = window.__th; const its = th.items(); const s = its.findIndex((e) => th.on(e)); const el = its[s];
        th.hideInk(true); th.pin(el, true);
        await new Promise((res) => setTimeout(res, 500));
        const cs = getComputedStyle(el), b = getComputedStyle(el, "::before");
        const r = el.getBoundingClientRect();
        return { fill: cs.backgroundColor, fillRgb: rgb(cs.backgroundColor), edge: b.borderTopColor, edgeRgb: rgb(b.borderTopColor), ink: cs.color, inkRgb: rgb(cs.color), rect: { x: r.x, y: r.y, w: r.width, h: r.height } };
      }, { tone, rgbSrc: rgbIn });
      const c = { x: Math.round(r.rect.x + r.rect.w / 2 - 6), y: Math.round(r.rect.y + r.rect.h / 2 - 6), width: 12, height: 12 };
      const S = await shot(P.page, c);
      const d = S.png.data; let acc = [0, 0, 0]; const N = d.length / 4;
      for (let i = 0; i < N; i++) for (let k = 0; k < 3; k++) acc[k] += d[i * 4 + k] / N;
      await P.close();
      return { ...r, painted: acc };
    };
    const base = await read(null);
    for (const tone of ["rgb(210 30 30)", "rgb(255 190 205)"]) {
      const t = await read(tone);
      const dEdge = contrast(base.edgeRgb.slice(0, 3), t.edgeRgb.slice(0, 3)), dInk = contrast(base.inkRgb.slice(0, 3), t.inkRgb.slice(0, 3));
      const dTint = Math.max(...base.painted.map((v, k) => Math.abs(v - t.painted[k])));
      const edgeOk = base.edge !== t.edge, inkOk = base.ink !== t.ink, tintOk = dTint >= 2;
      const ok = edgeOk && inkOk && tintOk; n++; if (ok) pass++;
      console.log(`  ${ok ? "PASS" : "FAIL"} ${engine} ${scene} ${mode} tone ${tone} · edge ${base.edge} → ${t.edge} (${edgeOk ? "moves" : "STILL"}, ${dEdge.toFixed(2)}:1) · ink ${base.ink} → ${t.ink} (${inkOk ? "moves" : "STILL"}, ${dInk.toFixed(2)}:1) · tint computed ${base.fill} → ${t.fill}; painted interior ${base.painted.map((v) => v.toFixed(1)).join(",")} → ${t.painted.map((v) => v.toFixed(1)).join(",")} (max Δ ${dTint.toFixed(2)} levels, ${tintOk ? "moves" : "STILL"}) · load ${load()}`);
    }
  }
  if (part === "desc") for (const scene of ["preset-input"]) {
    const P = await openPage(target, engine, scene, { mode: "light" });
    await P.page.waitForTimeout(600);
    const errs = errors(P);
    const r = await P.page.evaluate(() => { const i = document.querySelector("[data-descendant]"); const it = i?.closest("[data-item]"); return { has: !!i, tag: i?.tagName, inItem: !!it, itemTag: it?.tagName, shape: it?.closest("[data-shape]")?.getAttribute("data-shape") ?? "none" }; });
    const named = errs.filter((t) => /interactive|descendant|input/i.test(t));
    const ok = target.meta.dev ? named.length > 0 : true; n++; if (ok) pass++;
    console.log(`  ${target.meta.dev ? (ok ? "PASS" : "FAIL") : "INFO"} ${engine} ${scene} · descendant ${r.tag} inside ${r.itemTag} (shape ${r.shape}) · console errors ${errs.length}, naming the descendant ${named.length}${errs.length ? `: ${errs[0].slice(0, 160)}` : ""} · load ${load()}`);
    await P.close();
  }
  if (part === "x3") for (const how of ["programmatic", "pointer"]) {
    const P = await openPage(target, engine, "specimen-migrated", { mode: "light" });
    const r0 = await P.page.evaluate(() => {
      const its = window.__th.items(); const el = its[1]; const cs = getComputedStyle(el);
      const ro = el.querySelector(".tile-name"); ro.textContent = "DIRECT-WRITE-42";
      window.__mut = 0; window.__mutKinds = [];
      const mo = new MutationObserver((recs) => { for (const m of recs) { if (m.type === "attributes" && m.target === el) continue; if (m.type === "attributes" && m.target.matches?.("[data-item]")) continue; window.__mut++; window.__mutKinds.push(`${m.type}:${m.target.nodeName}${m.attributeName ? "@" + m.attributeName : ""}`); } });
      mo.observe(document.querySelector("[data-group]"), { subtree: true, childList: true, characterData: true, attributes: true });
      window.__mo = mo;
      const r = el.getBoundingClientRect();
      return { cv: cs.contentVisibility, contain: cs.contain, x: r.x + r.width / 2, y: r.y + r.height / 2 };
    });
    if (how === "programmatic") await P.page.evaluate(() => window.__tile.select(1));
    else await P.page.mouse.click(r0.x, r0.y);
    await P.page.waitForTimeout(700);
    const r1 = await P.page.evaluate(() => { const el = window.__th.items()[1]; window.__mo.disconnect(); return { text: el.querySelector(".tile-name").textContent, on: window.__th.on(el), mut: window.__mut, kinds: [...new Set(window.__mutKinds)].slice(0, 6) }; });
    const ok = r0.cv === "auto" && r1.text === "DIRECT-WRITE-42" && r1.on && r1.mut === 0; n++; if (ok) pass++;
    console.log(`  ${ok ? "PASS" : "FAIL"} ${engine} specimen-migrated ${how} commit · content-visibility ${r0.cv} (contain ${r0.contain}) · readout after commit "${r1.text}" · item on ${r1.on} · slot mutations ${r1.mut}${r1.kinds.length ? ` (${r1.kinds.join(", ")})` : ""} · load ${load()}`);
    await P.close();
  }
  if (part === "x6") {
    const P = await openPage(target, engine, "preset-migrated", { mode: "light", query: { sel: "none" } });
    const r = await P.page.evaluate(() => { const its = window.__th.items(); return { n: its.length, checked: its.filter((e) => e.getAttribute("aria-checked") === "true").length, roles: [...new Set(its.map((e) => e.getAttribute("role")))], perim: its.map((e) => getComputedStyle(e, "::before").opacity) }; });
    await P.page.focus('[data-sentinel="before"]'); await P.page.keyboard.press("Tab");
    const f = await P.page.evaluate(() => window.__th.items().indexOf(document.activeElement));
    await P.page.evaluate(() => window.__tile.select(2)); await P.page.waitForTimeout(500);
    const r2 = await P.page.evaluate(() => { const its = window.__th.items(); return { checked: its.map((e) => e.getAttribute("aria-checked")), perim: its.map((e) => getComputedStyle(e, "::before").opacity) }; });
    await P.page.evaluate(() => window.__tile.select(null)); await P.page.waitForTimeout(500);
    const r3 = await P.page.evaluate(() => { const its = window.__th.items(); return { checked: its.filter((e) => e.getAttribute("aria-checked") === "true").length, perim: its.map((e) => getComputedStyle(e, "::before").opacity) }; });
    const ok = r.checked === 0 && r.perim.every((o) => o === "0") && f === 0 && r2.checked.filter((c) => c === "true").length === 1 && r3.checked === 0 && r3.perim.every((o) => o === "0"); n++; if (ok) pass++;
    console.log(`  ${ok ? "PASS" : "FAIL"} ${engine} preset-migrated sel=none · roles ${r.roles.join(",")} · checked ${r.checked}/${r.n}, perimeter ${r.perim.join(",")} · Tab lands on item ${f} · select(2) → checked ${r2.checked.join(",")} perimeter ${r2.perim.join(",")} · back to none → checked ${r3.checked}, perimeter ${r3.perim.join(",")} · load ${load()}`);
    await P.close();
  }
  if (part === "capture") for (const scene of ["preset-migrated", "specimen-migrated", "strip-migrated", "f1-migrated"]) for (const mode of ["light", "dark"]) for (const coarse of [false, true]) for (const focus of [false, true]) {
    // the gestalt inputs the prototype did not capture: the coarse pointer, and the selected tile holding focus
    // (Tab from the sentinel lands on the checked radio), so the perimeter and the ring are seen together
    const P = await openPage(target, engine, scene, { mode, coarse });
    await P.page.mouse.move(1, 1);
    if (focus) { await P.page.focus('[data-sentinel="before"]'); await P.page.keyboard.press("Tab"); await P.page.waitForTimeout(300); }
    const box = await P.page.evaluate(() => { const its = window.__th.items(); const r = its[0].getBoundingClientRect(); const f = document.activeElement; return { w: r.width, h: r.height, corner: getComputedStyle(its[0]).borderTopLeftRadius, focusedOn: f?.matches?.("[data-item]") ? f.getAttribute("aria-checked") : "n/a" }; });
    const el = await P.page.$("[data-group]");
    const file = `${String(args.dir)}/${scene}-${mode}-${coarse ? "coarse" : "fine"}${focus ? "-focus" : ""}-${engine}.png`;
    await el.screenshot({ path: file, scale: "css" });
    console.log(`  ${file.split("/").pop()} · item 0 ${box.w.toFixed(2)}×${box.h.toFixed(2)} corner ${box.corner} · focused item checked ${box.focusedOn} · load ${load()}`);
    await P.close();
  }
  if (part === "clip") for (const scene of ["preset-migrated", "specimen-migrated"]) for (const mode of ["light", "dark"]) {
    const P = await openPage(target, engine, scene, { mode });
    const r = await P.page.evaluate(async () => {
      const th = window.__th, its = th.items(); const s = its.findIndex((e) => th.on(e)); const el = its[s];
      th.hideInk(true); th.pin(el, true); await new Promise((res) => setTimeout(res, 500));
      const cs = getComputedStyle(el); const r = el.getBoundingClientRect();
      return { cv: cs.contentVisibility, contain: cs.contain, x: r.x, y: r.y, w: r.width, h: r.height, edge: getComputedStyle(el, "::before").borderTopColor };
    });
    // a horizontal scan through the left edge at mid-height, 4 px outside to 6 px inside, at DSF 2
    const S = await shot(P.page, { x: Math.round(r.x) - 4, y: Math.round(r.y + r.h / 2), width: 10, height: 1 });
    const row = []; for (let i = 0; i < S.png.width; i++) row.push(S.png.data.slice(i * 4, i * 4 + 3));
    const L = row.map((c) => (0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2]).toFixed(0));
    console.log(`  INFO ${engine} ${scene} ${mode} · content-visibility ${r.cv} · contain ${r.contain} · box x ${r.x.toFixed(2)} · edge ${r.edge} · luma across the left edge (device px from box.x−4 css px): ${L.join(" ")} · load ${load()}`);
    await P.close();
  }
}
if (["tone", "desc", "x3", "x6"].includes(part)) console.log(`${pass}/${n} cells pass · load ${load()} at end`);
await closeBrowsers(); await target.close(); lock.release(); process.exit(0);

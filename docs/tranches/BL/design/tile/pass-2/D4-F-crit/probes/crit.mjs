#!/usr/bin/env node
// D4-F critic probe (copied from ../../D4-Dp-crit/probes/crit.mjs, the D′ critic's; parts tone, desc, x3, x6, capture,
// tworow and clip unchanged; added: plants, br, late, a11yvalid). The census rows the H2 battery does not read on
// the migrated arms, the vacuity plants on F's own carriers, and the refusal's holes.
//   --part plants  vacuity: inject a plant into the page and read the harness's own measure (commitBar, judgeT3,
//                  judgeT1) on preset-migrated / specimen-migrated. kick0: the commit kick removed. perim0: the
//                  perimeter ::before off. perim0mark0: perimeter and mark off. pill: the tile corner as a stadium.
//                  Each plant must FAIL the cell it aims at; the clean read beside it must PASS.
//   --part br      a pill label that holds a <br> (two rows inside one label element, fits the rung): cut or named?
//   --part late    the DEV name reads once, at mount: a second row added after mount (a #meta-less readout that
//                  arrives late) is it named?
//   --part a11yvalid  the contrast-more arm still applies to non-tile selected elements in both engines (the
//                  route's :not(:has()) exemption did not invalidate the selector list)
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
import { selectedSeparation, judgeT3, cornerStory, judgeT1, stepLine, tagItems, sampleOver, commitBar, medianInterval, unselectedIdx } from "../../../harness/measure.mjs";

const args = parseArgs();
const part = String(args.part ?? "tone");
const engines = String(args.engines ?? "chromium,webkit").split(",");
const lock = await acquireLock(`d4f-crit-${part}`);
const target = await openTarget(args);
console.log(`D4-F critic probe · part ${part} · ${target.label} (flavor ${target.meta.flavor}) · load ${load()} at start`);
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
  if (part === "f1hover") for (const scene of ["f1-migrated", "preset-migrated"]) {
    // R-5's cause: does the hovered F1 tile match :hover, and does its plate layer change?
    const P = await openPage(target, engine, scene, { mode: "light" });
    const pick = await P.page.evaluate(() => { const its = window.__th.items(); const u = its.findIndex((e) => !window.__th.on(e)); const r = its[u].getBoundingClientRect(); return { u, x: r.x + r.width / 2, y: r.y + r.height / 2 }; });
    const read = () => P.page.evaluate((u) => { const el = window.__th.items()[u]; const cs = getComputedStyle(el); const top = document.elementFromPoint(el.getBoundingClientRect().x + 6, el.getBoundingClientRect().y + 6); return { hover: el.matches(":hover"), bg: cs.backgroundColor, img: cs.backgroundImage.slice(0, 220), plate: cs.getPropertyValue("--glass-defined-plate").trim().slice(0, 120), top: top === el ? "item" : `${top?.tagName}.${top?.className?.baseVal ?? top?.className}` }; }, pick.u);
    await P.page.mouse.move(2, 2); await P.page.waitForTimeout(300);
    const a = await read();
    await P.page.mouse.move(pick.x, pick.y); await P.page.waitForTimeout(700);
    const b = await read();
    console.log(`  INFO ${engine} ${scene} item ${pick.u} · rest: hover ${a.hover}, bg ${a.bg}, image ${a.img} · hovered: hover ${b.hover}, bg ${b.bg}, image ${b.img} · image changed ${a.img !== b.img} · corner hit-test ${b.top} · load ${load()}`);
    await P.close();
  }
  if (part === "tworow") for (const scene of ["family-d-undeclared", "single", "vertical", "pill-badge"]) {
    // §7.3 item 9 / M-3 "the pill holds one row, structurally": a second row that FITS inside the rung (two lines
    // at the pill's line-height 1) — is it cut, and does DEV name it? Appended as refusal.mjs and W-E append it.
    const P = await openPage(target, engine, scene, { mode: "light" });
    await P.page.waitForTimeout(400);
    const r = await P.page.evaluate(async () => {
      const it = document.querySelector("[data-item]"); const slot = it.querySelector("[data-line-slot]") ?? it;
      const rung = parseFloat(getComputedStyle(it).minBlockSize);
      const extra = document.createElement("div"); extra.textContent = "one more line"; slot.append(extra);
      await new Promise((res) => setTimeout(res, 700));
      const ir = it.getBoundingClientRect(), er = extra.getBoundingClientRect();
      const hit = document.elementFromPoint(Math.min(er.x + 8, ir.right - 4), er.y + er.height / 2);
      const range = document.createRange(); range.selectNodeContents(slot);
      const tops = [...new Set([...range.getClientRects()].filter((q) => q.width > 1 && q.height > 1).map((q) => Math.round(q.top)))];
      return { rung, h: ir.height, extraTop: er.top - ir.top, extraBottom: er.bottom - ir.top, inside: er.top >= ir.top - 0.5 && er.bottom <= ir.bottom + 0.5, hitInside: !!hit && it.contains(hit), textRows: tops.length, corner: getComputedStyle(it).borderTopLeftRadius, clip: { x: ir.x - 4, y: ir.y - 4, width: ir.width + 8, height: ir.height + 8 } };
    });
    const errs = errors(P).filter((t) => t.includes("[ToggleGroupItem]"));
    if (args.dir) await P.page.screenshot({ path: `${String(args.dir)}/tworow-${scene}-${engine}.png`, clip: r.clip });
    const refused = !r.inside; const named = errs.length > 0;
    const ok = refused && (target.meta.dev ? named : true); n++; if (ok) pass++;
    console.log(`  ${ok ? "PASS" : "FAIL"} ${engine} ${scene} · rung ${r.rung.toFixed(2)} · item block ${r.h.toFixed(2)} · the appended row sits at ${r.extraTop.toFixed(2)}–${r.extraBottom.toFixed(2)} px of the item (${r.inside ? "INSIDE the plate: painted, not cut" : "past the plate: cut"}; hit-test inside ${r.hitInside}; text rows in the label ${r.textRows}) · corner ${r.corner} · [ToggleGroupItem] errors ${errs.length} · load ${load()}`);
    await P.close();
  }

  if (part === "plants") {
    const PL = {
      clean: "",
      kick0: ".toggle-group__item[data-commit]{animation:none !important}",
      perim0: ".toggle-group__item::before{opacity:0 !important}",
      perim0mark0: ".toggle-group__item::before,.toggle-group__item::after{opacity:0 !important}",
      pill: ".toggle-group__item{border-radius:9999px !important}",
    };
    const add = async (P, k) => { if (PL[k]) { await P.page.addStyleTag({ content: PL[k] }); await P.page.waitForTimeout(200); } };
    for (const scene of ["preset-migrated", "specimen-migrated"]) {
      for (const k of ["clean", "kick0"]) for (const how of ["keyboard", "programmatic", "pointer"]) {
        let r, tries = 0;
        do {
          const P = await openPage(target, engine, scene, { mode: "light" }); await add(P, k); await tagItems(P);
          const u = await unselectedIdx(P); let f;
          if (how === "programmatic") { await P.page.evaluate(() => document.querySelector('[data-sentinel="after"]').focus()); f = await sampleOver(P, () => P.page.evaluate((i) => window.__tile.select(i), u)); }
          else if (how === "keyboard") { const s = await P.page.evaluate(() => window.__th.items().findIndex((e) => window.__th.on(e))); await P.page.evaluate((i) => window.__th.items()[i].focus(), s); await P.page.waitForTimeout(300);
            const before = await P.page.evaluate(() => window.__th.items().map((e) => window.__th.on(e))); f = await sampleOver(P, () => P.page.keyboard.press("ArrowRight"));
            const after = await P.page.evaluate(() => window.__th.items().map((e) => window.__th.on(e))); r = { i: after.findIndex((v, j) => v && !before[j]) }; }
          else { const rr = await P.page.evaluate((i) => window.__th.rect(document.querySelector(`[data-th-idx="${i}"]`)), u); await P.page.mouse.move(rr.x + rr.w / 2, rr.y + rr.h / 2); await P.page.waitForTimeout(500); await P.page.mouse.down(); await P.page.waitForTimeout(120); f = await sampleOver(P, () => P.page.mouse.up()); }
          const idx = how === "keyboard" ? r.i : u;
          r = { ...commitBar(f, idx), med: medianInterval(f) }; tries++; await P.close();
        } while (k === "clean" && !r.pass && r.med > 20 && tries < 3);
        const want = k === "clean" ? true : false; const ok = r.pass === want; n++; if (ok) pass++;
        console.log(`  ${ok ? "PASS" : "FAIL"} ${engine} plant ${k} ${scene} ${how} commit · witness ${r.pass ? "PASS" : "FAIL"} (want ${want ? "PASS" : "FAIL"}) · ${r.line} · median frame ${r.med.toFixed(1)} ms · load ${load()}`);
      }
      for (const k of ["clean", "perim0", "perim0mark0"]) for (const mode of ["light", "dark", "prt"]) {
        const P = await openPage(target, engine, scene, { mode }); await add(P, k);
        const j = judgeT3(await selectedSeparation(P)); await P.close();
        const want = k === "clean"; const ok = P.modeOk !== false && j.pass === want; n++; if (ok) pass++;
        console.log(`  ${ok ? "PASS" : "FAIL"} ${engine} plant ${k} ${scene} ${mode} T-3 · witness ${j.pass ? "PASS" : "FAIL"} (want ${want ? "PASS" : "FAIL"}) · ${j.line} · load ${load()}`);
      }
      for (const k of ["clean", "pill"]) for (const [name, o] of [["fine", {}], ["coarse", { coarse: true }]]) {
        const P = await openPage(target, engine, scene, { mode: "light", ...o }); await add(P, k); await tagItems(P);
        const st = await cornerStory(P, 0), j = judgeT1(st, "tile"); await P.close();
        const want = k === "clean"; const ok = j.pass === want; n++; if (ok) pass++;
        console.log(`  ${ok ? "PASS" : "FAIL"} ${engine} plant ${k} ${scene} ${name} T-1 · witness ${j.pass ? "PASS" : "FAIL"} (want ${want ? "PASS" : "FAIL"}) · ${stepLine(st)} · load ${load()}`);
      }
    }
  }
  if (part === "br" || part === "late") for (const scene of part === "br" ? ["single", "pill-badge", "family-d-undeclared", "vertical"] : ["single", "pill-badge", "preset-migrated"]) {
    const P = await openPage(target, engine, scene, { mode: "light" });
    await P.page.waitForTimeout(500);
    const r = await P.page.evaluate(async (part) => {
      const it = document.querySelector("[data-item]"); const label = it.querySelector("[data-line-slot]") ?? it.querySelector("span") ?? it;
      const rung = parseFloat(getComputedStyle(it).minBlockSize);
      if (part === "br") { label.innerHTML = "Smooth<br>0.5 s"; }
      else { const d = document.createElement("span"); d.textContent = "0.35 s · ζ 0.6"; d.style.display = "block"; label.append(d); }
      await new Promise((res) => setTimeout(res, 800));
      const ir = it.getBoundingClientRect();
      const range = document.createRange(); range.selectNodeContents(label);
      const rects = [...range.getClientRects()].filter((q) => q.width > 1 && q.height > 1);
      const tops = [...new Set(rects.map((q) => Math.round(q.top)))];
      const lr = label.getBoundingClientRect();
      const visible = rects.filter((q) => q.bottom <= Math.min(ir.bottom, lr.bottom) + 0.5 && q.top >= Math.max(ir.top, lr.top) - 0.5);
      const visTops = [...new Set(visible.map((q) => Math.round(q.top)))];
      return { rung, h: ir.height, w: ir.width, corner: getComputedStyle(it).borderTopLeftRadius, dir: getComputedStyle(it).flexDirection, rows: tops.length, visibleRows: visTops.length, labelH: lr.height, clip: { x: ir.x - 4, y: ir.y - 4, width: ir.width + 8, height: ir.height + 8 } };
    }, part);
    const errs = errors(P).filter((t) => t.includes("[ToggleGroupItem]"));
    if (args.dir) await P.page.screenshot({ path: `${String(args.dir)}/${part}-${scene}-${engine}.png`, clip: r.clip });
    const refused = r.visibleRows <= 1; const named = errs.length > 0;
    const ok = /migrated/.test(scene) ? true : refused && (target.meta.dev ? named : true); n++; if (ok) pass++;
    console.log(`  ${/migrated/.test(scene) ? "INFO" : ok ? "PASS" : "FAIL"} ${engine} ${part} ${scene} [${target.meta.flavor}] · rung ${r.rung.toFixed(2)} · item ${r.w.toFixed(2)}×${r.h.toFixed(2)} ${r.corner} ${r.dir} · label ${r.labelH.toFixed(2)} px tall, text rows ${r.rows}, rows painted inside the plate ${r.visibleRows} (${refused ? "refused: one row shows" : "NOT refused: two rows paint inside the pill"}) · [ToggleGroupItem] errors ${errs.length}${errs[0] ? ` («${errs[0].slice(0, 90)}»)` : ""} · load ${load()}`);
    await P.close();
  }
  if (part === "a11yvalid") for (const [scene, sel] of [["single", "[data-item][data-state=on]"], ["tabs", "[aria-checked=true]"], ["preset-migrated", "[data-item][data-state=on]"]]) {
    const P = await openPage(target, engine, scene, { mode: "light" });
    if (engine === "chromium") await P.cdp.send("Emulation.setEmulatedMedia", { features: [{ name: "prefers-contrast", value: "more" }] }); else await P.page.emulateMedia({ contrast: "more" }).catch(() => {});
    await P.page.waitForTimeout(300);
    const r = await P.page.evaluate((sel) => { const e = document.querySelector(sel); const cs = e ? getComputedStyle(e) : null; return { m: matchMedia("(prefers-contrast: more)").matches, found: !!e, bw: cs?.borderTopWidth, bs: cs?.borderTopStyle,
      rules: [...document.styleSheets].flatMap((s) => { try { return [...s.cssRules]; } catch { return []; } }).flatMap(function f(x) { return x.cssRules && !x.selectorText ? [...x.cssRules].flatMap(f) : [x]; }).filter((x) => x.selectorText && /aria-checked="true"/.test(x.selectorText) && /toggle-group__item:has/.test(x.selectorText)).length }; }, sel);
    const tile = /migrated/.test(scene); const ok = r.m && r.found && (tile ? r.bw !== "2px" : r.bw === "2px"); n++; if (ok) pass++;
    console.log(`  ${ok ? "PASS" : "FAIL"} ${engine} a11yvalid ${scene} ${sel} under contrast-more (${r.m ? "applied" : "NOT APPLIED"}) · border ${r.bw} ${r.bs} (want ${tile ? "not 2px: the tile is exempt" : "2px: the arm still applies"}) · exempting rules parsed into the CSSOM ${r.rules} · load ${load()}`);
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
if (["tone", "desc", "x3", "x6", "tworow", "plants", "br", "late", "a11yvalid"].includes(part)) console.log(`${pass}/${n} cells pass · load ${load()} at end`);
await closeBrowsers(); await target.close(); lock.release(); process.exit(0);

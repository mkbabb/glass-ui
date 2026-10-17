#!/usr/bin/env node
// REPORT · H4-6 · reported, not gating (REGISTRY §P3-6.2 H4-6). Two cells no checklist row gates on; each still has a
// fixture PASS and a planted FAIL, so its reading is not vacuous. run.mjs prints REPORT's exit and leaves it out of
// the battery's exit. It reads the build's own arms (a route's migrated arm when it has one, else the library arm).
//   kick   the commit on wide tiles (`D′c` §5, "by arithmetic, unmeasured: at 2.8 % a tile wider than about 286 px
//          overlaps a 4 px neighbour gap"). The preset group is forced to two 300 px columns at a 4 px gap; a
//          programmatic commit on item 1 is sampled every frame for 800 ms; the cell is the deepest push of the
//          committed tile's painted box into a neighbour's (want ≤ 0.05 px), with the peak scale. The same read at the
//          scene's own geometry is printed as info
//   mark   the selection mark over light media (`Fc` §2.4; FV3-6, built only if Q-3 rules (b)). On V2's selected
//          tile the item is shot with its `::after` shown and hidden; the pixels that change are the mark. Its mean
//          colour against the mean of what lies under it, WCAG contrast, want ≥ 3:1; dark is the cell, light is info.
//          No changed pixels reads UNMEASURED ("no mark painted")
//   name-ink  H5-5 · whether the selected K2 name takes the selection ink, now that neither route's transcription paints
//          it (`k2.mjs`, XSCRIPT): on the route's `specimen-migrated`, the selected tile's name (`[data-line-slot]`) against
//          its own item's ink. PASS when the name's computed colour is the item's (it inherits the library's
//          `--selection-ink`); the selected and unselected name inks and their contrast are printed. Light and dark.
//          A build that does not migrate K2 reads UNMEASURED
// H5-6 · REPORT READS A ROUTE BUILD. Pass 4's F spec ran it on the attack build in Playwright WebKit, whose V2 has no
// tile, and banked "no mark painted" as a reading (`Fs` §6). An attack build (`migration.attack`, label H4-attack) is
// now refused: exit 2, naming the build to pass instead. run.mjs hands REPORT `--build`, never `--attack`.
//   node report-h46.mjs --build <out>/builds/<label> | --fixture --family h46 [--fault h46-kick|h46-mark|h46-nameink|h46-attack] [--engine webkit]
import { cli, openPage, engineVersion, engineOf, f2, shot, clipAround, contrast, hex } from "./lib.mjs";
import { tagItems } from "./measure.mjs";
import { isAttack } from "./fact-split.mjs";

const FORCE = { display: "grid", gridTemplateColumns: "300px 300px", gap: "4px", width: "604px", maxWidth: "none" };
async function kick(target, engine, scene, force) {
  const P = await openPage(target, engine, scene, { mode: "light", query: { sel: 0 } });
  await tagItems(P);
  const r = await P.page.evaluate(async (force) => {
    const th = window.__th, g = th.group(), its = th.items();
    if (force) Object.assign(g.style, force);
    await th.frame();
    const rest = its.map((e) => e.getBoundingClientRect());
    const u = 1, frames = [];
    const t0 = performance.now();
    await new Promise((done) => {
      const tick = () => { frames.push(its.map((e) => e.getBoundingClientRect())); if (performance.now() - t0 < 800) requestAnimationFrame(tick); else done(); };
      requestAnimationFrame(tick);
      window.__tile.select(u);
    });
    let push = 0, peak = 1;
    for (const f of frames) {
      peak = Math.max(peak, f[u].width / rest[u].width);
      f.forEach((b, k) => {
        if (k === u) return;
        const ox = Math.min(f[u].right, b.right) - Math.max(f[u].left, b.left), oy = Math.min(f[u].bottom, b.bottom) - Math.max(f[u].top, b.top);
        if (ox > 0 && oy > 0) push = Math.max(push, Math.min(ox, oy));
      });
    }
    const gaps = rest.map((b, k) => (k === u ? Infinity : Math.max(b.left - rest[u].right, rest[u].left - b.right, b.top - rest[u].bottom, rest[u].top - b.bottom))).filter((x) => x >= 0);
    return { w: rest[u].width, h: rest[u].height, gap: Math.min(...gaps), push, peak, frames: frames.length, on: th.on(its[u]) };
  }, force ? FORCE : null);
  await P.close();
  return r;
}
async function mark(target, engine, scene, mode) {
  const P = await openPage(target, engine, scene, { mode });
  await tagItems(P);
  const box = await P.page.evaluate(() => { const th = window.__th, el = th.items().find((e) => th.on(e)); if (!el) return null; el.setAttribute("data-th-mark", ""); return th.rect(el); });
  if (!box) { await P.close(); return null; }
  const clip = clipAround(box, 2);
  const A = await shot(P.page, clip);
  await P.page.evaluate(async () => { const s = document.createElement("style"); s.textContent = "[data-th-mark]::after { visibility: hidden !important; }"; document.head.append(s); await window.__th.frame(); });
  const B = await shot(P.page, clip);
  await P.close();
  let n = 0; const a = [0, 0, 0], b = [0, 0, 0];
  for (let i = 0; i < A.png.data.length; i += 4) {
    const d = Math.max(...[0, 1, 2].map((k) => Math.abs(A.png.data[i + k] - B.png.data[i + k])));
    if (d <= 40) continue;
    n++; for (const k of [0, 1, 2]) { a[k] += A.png.data[i + k]; b[k] += B.png.data[i + k]; }
  }
  if (n < 12) return { n };
  const ma = a.map((v) => v / n), mb = b.map((v) => v / n);
  return { n, mark: ma, under: mb, ratio: contrast(ma, mb) };
}

/** H5-5 · the selected name's ink against its item's, on the selected tile of a scene, and the unselected name beside it. */
async function nameInk(target, engine, scene, mode) {
  const P = await openPage(target, engine, scene, { mode });
  await tagItems(P);
  const r = await P.page.evaluate(async () => {
    const th = window.__th; await th.frame();
    const its = th.items(), on = its.find((e) => th.on(e)), off = its.find((e) => !th.on(e));
    if (!on || !off) return null;
    const nm = (el) => el.querySelector("[data-line-slot]");
    if (!nm(on) || !nm(off)) return { noName: true };
    // sRGB through a 1 px canvas: a computed colour can print as oklab()/oklch() (the live-π trap), which no regex reads
    const cv = document.createElement("canvas"); cv.width = cv.height = 1; const g = cv.getContext("2d", { willReadFrequently: true });
    const rgb = (c) => { g.clearRect(0, 0, 1, 1); g.fillStyle = "#000"; g.fillStyle = c; g.fillRect(0, 0, 1, 1); return [...g.getImageData(0, 0, 1, 1).data.slice(0, 3)]; };
    const col = (el) => getComputedStyle(el).color;
    return { nameOn: col(nm(on)), itemOn: col(on), nameOff: col(nm(off)), itemOff: col(off), ink: getComputedStyle(on).getPropertyValue("--selection-ink").trim() || "(unset)", rgbOn: rgb(col(nm(on))), rgbOff: rgb(col(nm(off))), rgbItem: rgb(col(on)) };
  });
  await P.close();
  return r;
}

if (import.meta.url === `file://${process.argv[1]}`) {
  await cli("REPORT", async (args, target) => {
    const engine = engineOf(args);
    const cells = [];
    const P0 = await openPage(target, engine, "__index");
    const migration = await P0.page.evaluate(() => window.__tile.migration ?? null);
    await P0.close();
    if (isAttack(migration)) throw new Error(`REPORT reads a route build, and ${target.label} is an attack build (migration ${migration.label}): its V2 and K2 carry no route tile, so the mark and the name read nothing. Pass the route build (build.mjs --route <route dir>), as run.mjs does (H5-6)`);
    const own = (site) => (migration && !isAttack(migration) && (migration.sites ?? []).includes(site)) || target.kind === "fixture" ? `${site}-migrated` : site;
    const kp = own("preset");
    const k = await kick(target, engine, kp, true);
    cells.push({ gating: true, pass: k.push <= 0.05, line: `kick · ${kp} forced to two 300 px columns at a 4 px gap · item 1 ${f2(k.w)}×${f2(k.h)}, rest gap ${f2(k.gap)} px · programmatic commit (checked ${k.on}), ${k.frames} frames · peak scale ${k.peak.toFixed(4)} · deepest push into a neighbour ${f2(k.push)} px (want ≤ 0.05)` });
    const k0 = await kick(target, engine, kp, false);
    cells.push({ gating: false, pass: k0.push <= 0.05, line: `kick · ${kp} at the scene's own geometry · item 1 ${f2(k0.w)}×${f2(k0.h)}, rest gap ${f2(k0.gap)} px · peak scale ${k0.peak.toFixed(4)} · deepest push ${f2(k0.push)} px` });
    const mp = own("v2");
    for (const mode of ["dark", "light"]) {
      const m = await mark(target, engine, mp, mode);
      const gating = mode === "dark";
      if (!m) cells.push({ gating, pass: null, line: `mark · ${mp} ${mode} · UNMEASURED: no selected item` });
      else if (!m.mark) cells.push({ gating, pass: null, line: `mark · ${mp} ${mode} · UNMEASURED: no mark painted (${m.n} device px change with ::after hidden; FV3-6 is built only if Q-3 rules (b))` });
      else cells.push({ gating, pass: m.ratio >= 3, line: `mark · ${mp} ${mode} · the mark ${hex(m.mark)} over ${hex(m.under)} beneath it, ${m.n} device px · ${m.ratio.toFixed(2)}:1 (want ≥ 3:1)` });
    }
    const sp = own("specimen");
    for (const mode of ["light", "dark"]) {
      const n = sp.endsWith("-migrated") ? await nameInk(target, engine, sp, mode) : null;
      if (!sp.endsWith("-migrated")) cells.push({ gating: true, pass: null, line: `name-ink · ${mode} · UNMEASURED: this build does not migrate K2 (route ${migration?.label ?? "none"})` });
      else if (!n || n.noName) cells.push({ gating: true, pass: null, line: `name-ink · ${sp} ${mode} · UNMEASURED: ${!n ? "no selected and unselected tile" : "no [data-line-slot] name"}` });
      else {
        const same = n.nameOn === n.itemOn;
        cells.push({ gating: true, pass: same, line: `name-ink · ${sp} ${mode} · the selected name ${n.nameOn} ${same ? "is" : "is NOT"} its item's ink ${n.itemOn} (sRGB ${n.rgbItem.join(", ")}; --selection-ink ${n.ink}) · unselected name ${n.nameOff}, item ${n.itemOff} · the name's ink selected against unselected ${contrast(n.rgbOn, n.rgbOff).toFixed(2)}:1` });
      }
    }
    return { id: "REPORT", title: "H4-6, H5-5, H5-6, reported: the commit on wide tiles against a 4 px gap; the selection mark over light media; the selected K2 name's ink; on a route build only", engine, engineLabel: await engineVersion(engine), target: target.label, dev: target.meta.dev, cells };
  });
}

#!/usr/bin/env node
// D4-F pass-3 spec · probes/f3.mjs · the route's own questions on HEAD + floor v2 + the route sketch, read where the
// H3 battery does not read them. One process under the harness lock; the load is printed beside every section.
//   node f3.mjs --build <out>/builds/f3-src [--engines chromium,webkit] [--only flip,mark,nest,unmig,ring,occlude,rest] [--json f] [--shots dir] [--inject <css>]
// Sections:
//   flip   the live flip: a `.toggle-group__meta` row appended to item 0 of `single`, then removed. Every item's corner,
//          direction, `--selection-tile`, the selected item's `::before` (perimeter) and `::after` (mark) opacity, read
//          700 ms after each mutation (one frame read the perimeter mid-fade: 0.24 / 0.80, logs/superseded-check-mark/). Tests that `:has()` invalidation reaches the item, its style queries and its
//          pseudo-elements in both engines (the floor found a WebKit pseudo-element style-query miss).
//   mark   the selected tile's mark on every migrated site at md and sm: computed size, opacity, and whether its box
//          overlaps a media or label content box; screenshots of the selected and the focused-selected tile.
//   nest   a tile group nested inside a pill group's consumer wrapper: does the outer group read as tiles?
//   unmig  the unmigrated K1 and K2 (library and verbatim arms): item 0's box, rows, content cut past the plate, and
//          every `[ToggleGroupItem]` console line, per flavour (run once per build).
//   ring   focus vs selection on the selected tile: the ring's outline offset and the perimeter's inset, measured.
import fs from "node:fs";
import path from "node:path";
import { parseArgs, openTarget, openPage, closeBrowsers, acquireLock, load, engineVersion, shot, savePng, px, oklab, meanRect, contrast } from "../../../harness/lib.mjs";

const args = parseArgs();
const engines = String(args.engines ?? "chromium,webkit").split(",");
const only = args.only ? String(args.only).split(",") : null;
const want = (k) => !only || only.includes(k);
const lock = await acquireLock("d4f-p3-spec-probe");
const target = await openTarget(args);
const shots = args.shots ? String(args.shots) : null;
const out = { build: target.label, meta: target.meta, engines: {} };
const say = (s) => console.log(s);
say(`D4-F p3 spec probe · ${target.label} (${target.meta.sha}, flavor ${target.meta.flavor}) · lock waited ${lock.waitedS}s · load ${load()} at start`);
let pass = 0, n = 0;
const cell = (E, sec, ok, line, gating = true) => { if (gating) { n++; if (ok) pass++; } say(`  ${gating ? (ok ? "PASS" : "FAIL") : "INFO"} ${sec} · ${line}`); (E[sec] ??= []).push({ ok, gating, line }); };
const FRAME = `new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)))`;
// --inject <css>: a candidate rule added to every page (a spec-time what-if; the log names it)
const inject = typeof args.inject === "string" ? args.inject : null;
if (inject) say(`inject: ${inject}`);
async function open(engine, scene, o) { let e; for (let k = 0; k < 3; k++) { try { const P = await openPage(target, engine, scene, o); if (inject) await P.page.addStyleTag({ content: inject }); return P; } catch (x) { e = x; say(`  retry ${scene} after: ${String(x.message).split("\n")[0]} · load ${load()}`); } } throw e; }

function readGroup() {
  const probe = document.createElement("div"); probe.style.borderRadius = "var(--radius-field)"; document.body.append(probe);
  const field = parseFloat(getComputedStyle(probe).borderTopLeftRadius); probe.remove();
  return [...document.querySelectorAll("[data-scene] [data-item]")].map((el) => {
    const cs = getComputedStyle(el), r = el.getBoundingClientRect();
    const used = Math.min(parseFloat(cs.borderTopLeftRadius), r.width / 2, r.height / 2);
    const b = getComputedStyle(el, "::before"), a = getComputedStyle(el, "::after");
    return { on: el.getAttribute("data-state") === "on", w: +r.width.toFixed(2), h: +r.height.toFixed(2), used: +used.toFixed(2), field,
      cls: Math.abs(used - field) < 0.5 && cs.flexDirection === "column" ? "tile" : Math.abs(used - r.height / 2) < 0.5 ? "pill" : "other",
      tile: cs.getPropertyValue("--selection-tile").trim(), perim: cs.getPropertyValue("--selection-perimeter").trim(),
      before: +b.opacity, after: a.content === "none" ? null : +a.opacity, plate: cs.backgroundImage === "none" ? "none" : "image" };
  });
}
const sum = (xs) => { const c = {}; for (const x of xs) c[x.cls] = (c[x.cls] ?? 0) + 1; return Object.entries(c).map(([k, v]) => `${k} ${v}/${xs.length}`).join(", "); };
const selLine = (xs) => { const s = xs.find((x) => x.on); return s ? `selected ${s.w}×${s.h} ${s.used}px tile=${s.tile} perim=${s.perim} ::before ${s.before} ::after ${s.after}` : "no selection"; };

for (const engine of engines) {
  const E = out.engines[engine] = { version: await engineVersion(engine), loadStart: load() };
  say(`\n${E.version} · load ${E.loadStart}`);
  const section = async (k, fn) => { if (!want(k)) return; say(` [${k}] load ${load()}`); try { await fn(); } catch (e) { cell(E, k, false, `HARNESS ERROR ${String(e.message).split("\n")[0]} · load ${load()}`); } };

  // ── the live flip ──
  await section("flip", async () => {
    const P = await open(engine, "single", { query: { sel: 1 } });
    const before = await P.page.evaluate(readGroup);
    await P.page.evaluate(() => { const m = document.createElement("span"); m.className = "toggle-group__meta"; m.textContent = "0.5 s"; m.setAttribute("data-flip", ""); document.querySelector("[data-item]").append(m); });
    await P.page.evaluate(FRAME);
    await P.page.waitForTimeout(700); // the perimeter's and the mark's transitions settle
    const on = await P.page.evaluate(readGroup);
    await P.page.evaluate(() => document.querySelector("[data-flip]").remove());
    await P.page.evaluate(FRAME);
    await P.page.waitForTimeout(700);
    const back = await P.page.evaluate(readGroup);
    const sOn = on.find((x) => x.on), sBack = back.find((x) => x.on);
    cell(E, "flip", before.every((x) => x.cls === "pill" && x.tile === "none"), `rest: ${sum(before)} · ${selLine(before)}`);
    cell(E, "flip", on.every((x) => x.cls === "tile" && x.tile === "flush") && sOn && sOn.before === 1 && sOn.after === 1 && on.every((x) => x.plate === "none" || x.on || true),
      `row appended: ${sum(on)}, heights ${[...new Set(on.map((x) => x.h))].join("/")} · ${selLine(on)}`);
    cell(E, "flip", back.every((x) => x.cls === "pill" && x.tile === "none") && sBack && sBack.before === 0 && sBack.after === null,
      `row removed: ${sum(back)} · ${selLine(back)}`);
    await P.close();
  });

  // ── the mark at md and sm ──
  await section("mark", async () => {
    for (const scene of ["preset-migrated", "specimen-migrated", "strip-migrated", "f1-migrated", "v2-migrated"]) for (const mode of ["light", "dark"]) {
      const P = await open(engine, scene, { mode, query: { sel: 1 } });
      const m = await P.page.evaluate(() => {
        const el = document.querySelectorAll("[data-item]")[1];
        const a = getComputedStyle(el, "::after"), r = el.getBoundingClientRect(), dir = getComputedStyle(el).direction;
        const size = parseFloat(a.inlineSize), top = parseFloat(a.insetBlockStart), end = parseFloat(a.insetInlineEnd);
        const box = { left: dir === "rtl" ? r.left + end : r.right - end - size, top: r.top + top, size };
        const hit = (q) => !(q.right <= box.left || q.left >= box.left + size || q.bottom <= box.top || q.top >= box.top + size);
        const contents = [...el.querySelectorAll("svg, img, [data-ink]")].filter((c) => !c.classList.contains("sr-only"));
        const over = contents.filter((c) => { const q = c.getBoundingClientRect(); return q.width > 0 && hit(q); }).map((c) => c.tagName.toLowerCase() + (c.className?.baseVal ?? c.className ? "." + String(c.className?.baseVal ?? c.className).split(" ")[0] : ""));
        const nominal = parseFloat(getComputedStyle(el).getPropertyValue("--selection-mark")) * parseFloat(getComputedStyle(document.documentElement).fontSize);
        return { size, nominal, room: el.clientWidth, opacity: +a.opacity, scale: a.scale, w: +r.width.toFixed(2), h: +r.height.toFixed(2), size_attr: el.closest("[data-group]").getAttribute("data-size"), over };
      });
      // THE MARK NEEDS ROOM (revision 2): the nominal mark where the tile's padding box is at least 3.5 marks wide, 0 below
      const want = m.room >= 3.5 * m.nominal ? m.nominal : 0;
      cell(E, "mark", m.opacity === 1 && Math.abs(m.size - want) < 0.5, `${scene} ${P.modeLabel} · ${m.size_attr ?? "md"} tile ${m.w}×${m.h} · padding box ${m.room}px vs 3.5 marks ${(3.5 * m.nominal).toFixed(1)}px · mark ${m.size}px (expected ${want}px) opacity ${m.opacity} scale ${m.scale} · overlaps ${m.size ? (m.over.length ? m.over.join(", ") : "nothing") : "n/a (no mark)"}`);
      if (shots) {
        const clip = await P.page.evaluate(() => { const r = document.querySelector("[data-group]").getBoundingClientRect(); return { x: Math.max(0, r.x - 8), y: Math.max(0, r.y - 8), width: Math.min(r.width + 16, 990), height: Math.min(r.height + 16, 880) }; });
        savePng(await shot(P.page, clip), path.join(shots, `${engine}-${scene}-${mode}-selected.png`));
        // focus the selected item by keyboard: Tab from the sentinel
        await P.page.focus("[data-sentinel='before']");
        await P.page.keyboard.press(P.keys?.tab ?? "Tab");
        await P.page.evaluate(FRAME);
        savePng(await shot(P.page, clip), path.join(shots, `${engine}-${scene}-${mode}-focused-selected.png`));
      }
      await P.close();
    }
  });

  // ── a tile group nested in a pill group's consumer wrapper ──
  await section("nest", async () => {
    const P = await open(engine, "single");
    const r = await P.page.evaluate(() => {
      const g = document.querySelector("[data-group]");
      const wrap = document.createElement("div");
      wrap.innerHTML = `<div class="toggle-group" data-slot="toggle-group" role="radiogroup"><button type="button" class="toggle-group__item pill-row control-surface" role="radio"><span>Inner</span><span class="toggle-group__meta">row</span></button></div>`;
      g.append(wrap);
      return null;
    });
    await P.page.evaluate(FRAME);
    const items = await P.page.evaluate(readGroup);
    cell(E, "nest", items.every((x) => x.cls === "pill"), `outer pill group with a tile group inside a wrapper: outer items ${sum(items)} (tile fact ${[...new Set(items.map((x) => x.tile))].join("/")})`, false);
    await P.close();
  });

  // ── the unmigrated consumer ──
  await section("unmig", async () => {
    for (const scene of ["preset", "preset-verbatim", "specimen", "specimen-verbatim"]) {
      const P = await open(engine, scene);
      await P.page.evaluate(FRAME);
      await P.page.waitForTimeout(400);
      const r = await P.page.evaluate(() => {
        const items = [...document.querySelectorAll("[data-item]")];
        return items.map((el) => {
          const b = el.getBoundingClientRect();
          const boxes = [...el.querySelectorAll("*")].filter((c) => !c.classList.contains("sr-only")).map((c) => c.getBoundingClientRect()).filter((q) => q.height > 0 && q.width > 0);
          const cut = boxes.filter((q) => q.bottom > b.bottom + 1 || q.top < b.top - 1).map((q) => Math.max(q.bottom - b.bottom, b.top - q.top));
          return { w: +b.width.toFixed(2), h: +b.height.toFixed(2), tile: getComputedStyle(el).getPropertyValue("--selection-tile").trim(), cut: cut.length, by: cut.length ? +Math.max(...cut).toFixed(2) : 0,
            ell: [...el.querySelectorAll("*")].some((c) => !c.classList.contains("sr-only") && c.scrollWidth > c.clientWidth + 1 && getComputedStyle(c).textOverflow === "ellipsis") || el.scrollWidth > el.clientWidth + 1 };
        });
      });
      const named = P.logs.filter((l) => /\[ToggleGroupItem\]/.test(l.text));
      const cutItems = r.filter((x) => x.cut).length;
      cell(E, "unmig", true, `${scene} · item 0 ${r[0].w}×${r[0].h} tile=${r[0].tile} · items with content past the plate ${cutItems}/${r.length}${cutItems ? ` (up to ${Math.max(...r.map((x) => x.by))} px)` : ""} · items whose row is clipped or ellipsized inline ${r.filter((x) => x.ell).length}/${r.length} · [ToggleGroupItem] lines ${named.length}${named.length ? ": " + named[0].text.slice(0, 110) : ""}`, false);
      await P.close();
    }
  });

  // ── the ring against the selected edge ──
  await section("ring", async () => {
    for (const scene of ["preset-migrated", "specimen-migrated"]) {
      const P = await open(engine, scene, { query: { sel: 1 } });
      await P.page.focus("[data-sentinel='before']");
      await P.page.keyboard.press(P.keys?.tab ?? "Tab");
      await P.page.evaluate(FRAME);
      const m = await P.page.evaluate(() => {
        const el = document.activeElement, cs = getComputedStyle(el), b = getComputedStyle(el, "::before");
        return { focused: el.matches(":focus-visible"), on: el.getAttribute("data-state"), outline: `${cs.outlineStyle} ${cs.outlineWidth} offset ${cs.outlineOffset}`, perim: `${b.borderTopWidth} at inset ${b.top}`, edge: b.borderTopColor, ring: cs.outlineColor };
      });
      cell(E, "ring", m.focused && m.on === "on", `${scene} · focused-selected: ring ${m.outline} ${m.ring}; perimeter ${m.perim} ${m.edge}`, false);
      await P.close();
    }
  });
  // ── what the mark covers, per corner (sitting 2) ──
  // The mark is hidden, the selected tile is shot, and the pixels inside the disc a mark WOULD cover are read: a pixel
  // is content ink when its OKLab distance from the tile's own plate (the median of the disc's ring of pixels is not
  // used: the plate is sampled in the tile's padding, 3 px inside the edge, mid block-start) exceeds 0.08. Read for
  // the built corner (block-start / inline-end) and for the block-end / inline-end corner.
  await section("occlude", async () => {
    for (const scene of ["preset-migrated", "specimen-migrated", "strip-migrated", "f1-migrated", "v2-migrated"]) for (const mode of ["light", "dark"]) {
      const P = await open(engine, scene, { mode, query: { sel: 1 } });
      await P.page.addStyleTag({ content: `[data-item]::after { opacity: 0 !important; }` });
      await P.page.evaluate(FRAME);
      const g = await P.page.evaluate(() => {
        const el = document.querySelectorAll("[data-item]")[1]; el.scrollIntoView({ block: "center" });
        const a = getComputedStyle(el, "::after"), r = el.getBoundingClientRect();
        return { x: r.x, y: r.y, w: r.width, h: r.height, size: parseFloat(a.inlineSize), inset: parseFloat(a.insetInlineEnd) };
      });
      const clip = { x: Math.floor(g.x), y: Math.floor(g.y), width: Math.ceil(g.w) + 1, height: Math.ceil(g.h) + 1 };
      const s = await shot(P.page, clip);
      const at = (cx, cy) => { const X = Math.round((cx - clip.x) * s.dsf), Y = Math.round((cy - clip.y) * s.dsf); return oklab(px(s, Y * s.png.width + X)); };
      const plate = at(g.x + g.w / 2, g.y + 5);
      const cover = (cx, cy) => { let ink = 0, n = 0; const R = g.size / 2;
        for (let dy = -R; dy <= R; dy += 0.5) for (let dx = -R; dx <= R; dx += 0.5) { if (dx * dx + dy * dy > R * R) continue; n++; const p = at(cx + dx, cy + dy); if (Math.hypot(p[0] - plate[0], p[1] - plate[1], p[2] - plate[2]) > 0.08) ink++; }
        return (100 * ink) / n; };
      const R = g.size / 2, ex = g.x + g.w - g.inset - R;
      const top = cover(ex, g.y + g.inset + R), bottom = cover(ex, g.y + g.h - g.inset - R);
      if (g.size > 0) cell(E, "occlude", true, `${scene} ${P.modeLabel} · tile ${g.w.toFixed(0)}×${g.h.toFixed(2)} · a ${g.size}px disc at ${g.inset}px covers content ink: block-start/inline-end ${top.toFixed(1)} % · block-end/inline-end ${bottom.toFixed(1)} %`, false);
      await P.close();
    }
  });

  // ── what the rest plate paints (run on the flush build and on the plated build) ──
  await section("rest", async () => {
    for (const scene of ["preset-migrated", "specimen-migrated"]) for (const mode of ["light", "dark"]) {
      const P = await open(engine, scene, { mode, query: { sel: 1 } });
      await P.page.mouse.move(2, 2);
      await P.page.evaluate(FRAME);
      const g = await P.page.evaluate(() => {
        const items = [...document.querySelectorAll("[data-item]")]; items[0].scrollIntoView({ block: "center" });
        const box = (el) => { const r = el.getBoundingClientRect(); return { x: r.x, y: r.y, w: r.width, h: r.height }; };
        const cs = getComputedStyle(items[0]);
        return { off: box(items[0]), on: box(items[1]), tile: cs.getPropertyValue("--selection-tile").trim(), blur: cs.backdropFilter || cs.webkitBackdropFilter || "none", border: `${cs.borderTopWidth} ${cs.borderTopColor}` };
      });
      const clip = { x: Math.floor(g.off.x) - 8, y: Math.floor(g.off.y) - 8, width: Math.ceil(g.on.x + g.on.w - g.off.x) + 16, height: Math.ceil(g.off.h) + 16 };
      const s = await shot(P.page, clip);
      const strip = (b) => meanRect(s, { x: b.x + 16, y: b.y + 3, w: Math.max(4, b.w - 60), h: 4 }); // the block-start pad, inside the edge
      const host = meanRect(s, { x: g.off.x + 16, y: g.off.y - 6, w: Math.max(4, g.off.w - 32), h: 3 }); // just outside the tile
      const off = strip(g.off), on = strip(g.on);
      const dE = (p, q) => { const a = oklab(p), b = oklab(q); return Math.hypot(a[0] - b[0], a[1] - b[1], a[2] - b[2]); };
      const rgb = (c) => c.map((v) => v.toFixed(0)).join(",");
      cell(E, "rest", true, `${scene} ${P.modeLabel} · tile=${g.tile} · blur ${g.blur} · border ${g.border} · host ${rgb(host)} · unselected plate ${rgb(off)} (ΔE vs host ${dE(off, host).toFixed(4)}, ${contrast(off, host).toFixed(2)}:1) · selected plate ${rgb(on)} (ΔE vs host ${dE(on, host).toFixed(4)}, vs unselected ${dE(on, off).toFixed(4)}, ${contrast(on, off).toFixed(2)}:1)`, false);
      await P.close();
    }
  });
  E.loadEnd = load();
}
await closeBrowsers();
lock.release?.();
say(`\nD4-F p3 spec probe · gating ${pass}/${n} · load ${load()} at end`);
if (args.json) fs.writeFileSync(String(args.json), JSON.stringify({ ...out, pass, n, loadEnd: load() }, null, 2));
process.exit(0);

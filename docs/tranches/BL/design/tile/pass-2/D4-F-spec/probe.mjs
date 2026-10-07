#!/usr/bin/env node
// D4-F-spec/probe.mjs · the route's open questions (REGISTRY §6.1 questions 2-5, §7.3 D′ items 3, 4, 6, 9) read on
// HEAD+floor+the F sketch. One process, the harness lock held, the load printed beside every section.
//   node probe.mjs --build <out>/builds/f-src [--engines chromium,webkit] [--only q2,q3,q4,q5,commit,hover,ink,cost,guard] [--json <file>]
// Reads: computed style and geometry, painted pixels (measure.mjs selectedSeparation + judgeT3, lib compare), real
// keys and pointer moves, the console. Surgeries touch slot content, a library row wrapper, or an attribute the
// library itself stamps; each is named where it is used.
import fs from "node:fs";
import { parseArgs, openTarget, openPage, closeBrowsers, acquireLock, load, engineVersion, shot, compare } from "../../harness/lib.mjs";
import { selectedSeparation, judgeT3, cornerStory, judgeT1, stepLine, tagItems, sampleOver, commitBar, quietEntry, medianInterval, hoverLight, unselectedIdx } from "../../harness/measure.mjs";

const args = parseArgs();
const engines = String(args.engines ?? "chromium,webkit").split(",");
const only = args.only ? String(args.only).split(",") : null;
const want = (k) => !only || only.includes(k);
const lock = await acquireLock("d4f-spec-probe");
const target = await openTarget(args);
const out = { build: target.label, meta: target.meta, engines: {} };
const say = (s) => console.log(s);
say(`D4-F spec probe · ${target.label} (${target.meta.sha}, flavor ${target.meta.flavor}) · lock waited ${lock.waitedS}s · load ${load()} at start`);
let pass = 0, n = 0;
const cell = (E, sec, ok, line, gating = true) => { if (gating) { n++; if (ok) pass++; } say(`  ${gating ? (ok ? "PASS" : "FAIL") : "INFO"} ${sec} · ${line}`); (E[sec] ??= []).push({ ok, gating, line }); };
const frame = () => new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));
const FRAME = `(${frame.toString()})()`;

// every item's box, corner and class: cell (the root's --radius-field, a column), pill (h/2 at its rung), lozenge (h/2 off its rung)
function readItems() {
  const probe = document.createElement("div"); probe.style.borderRadius = "var(--radius-field)"; document.body.append(probe);
  const field = parseFloat(getComputedStyle(probe).borderTopLeftRadius); probe.remove();
  return [...document.querySelectorAll("[data-scene] [data-item]")].map((el) => {
    const cs = getComputedStyle(el), r = el.getBoundingClientRect();
    const used = Math.min(parseFloat(cs.borderTopLeftRadius), r.width / 2, r.height / 2), rung = parseFloat(cs.minBlockSize);
    const cls = Math.abs(used - field) < 0.5 && cs.flexDirection === "column" ? "cell" : Math.abs(used - r.height / 2) < 0.5 && r.height <= rung + 0.75 ? "pill" : Math.abs(used - r.height / 2) < 0.5 ? "lozenge" : "other";
    return { w: +r.width.toFixed(2), h: +r.height.toFixed(2), y: +r.y.toFixed(1), rung, computed: cs.borderTopLeftRadius, used: +used.toFixed(2), dir: cs.flexDirection, perim: cs.getPropertyValue("--selection-perimeter").trim(), cls,
      clipped: [...el.children].some((c) => { if (c.classList.contains("sr-only")) return false; const q = c.getBoundingClientRect(); return q.height > 0 && (q.bottom > r.bottom + 1 || q.top < r.top - 1); }),
      rows: new Set([...el.children].filter((c) => !c.classList.contains("sr-only") && c.getBoundingClientRect().height > 0).map((c) => Math.round(c.getBoundingClientRect().top))).size };
  });
}
const tally = (items) => { const c = {}; for (const x of items) c[x.cls] = (c[x.cls] ?? 0) + 1; return Object.entries(c).map(([k, v]) => `${k} ${v}/${items.length}`).join(", "); };
const i0 = (x) => `${x.w}×${x.h} rung ${x.rung} ${x.computed}→${x.used} ${x.dir} perim ${x.perim}`;
const attrs = () => [document.querySelector("[data-group]"), ...document.querySelectorAll("[data-item]")].map((e) => [...e.attributes].filter((a) => !/^(tabindex|data-th-idx)$/.test(a.name)).map((a) => `${a.name}=${a.value}`).sort().join("|"));
async function open(engine, scene, o) { let e; for (let k = 0; k < 3; k++) { try { return await openPage(target, engine, scene, o); } catch (x) { e = x; say(`  retry ${scene} after: ${String(x.message).split("\n")[0]} · load ${load()}`); } } throw e; }
async function t3(E, sec, engine, scene, mode, surgery, label, gating = true) {
  for (let k = 0; ; k++) {
    let P;
    try {
      P = await open(engine, scene, { mode });
      if (surgery) { await P.page.evaluate(surgery); await P.page.evaluate(FRAME); }
      const j = judgeT3(await selectedSeparation(P));
      cell(E, sec, P.modeOk && j.pass, `${label ?? scene} ${P.modeLabel}${P.modeOk ? "" : " (MODE NOT APPLIED)"} · ${j.line}`, gating);
      await P.close(); return;
    } catch (e) {
      await P?.close().catch(() => {});
      if (k >= 2) { cell(E, sec, false, `${label ?? scene} ${mode} · HARNESS ERROR after 3 tries: ${String(e.message).split("\n")[0]} · load ${load()}`, gating); return; }
      say(`  retry ${label ?? scene} ${mode} after: ${String(e.message).split("\n")[0]} · load ${load()}`);
    }
  }
}

const SUR = {
  mixed: `[...document.querySelectorAll("[data-item]")].forEach((it, i) => { if (i % 2) it.querySelector(":scope > .toggle-group__meta")?.remove(); })`,
  rowsRemoved: `document.querySelectorAll("[data-item] > .toggle-group__meta, [data-item] > .toggle-group__media").forEach((r) => r.remove())`,
  invalid: `(() => { const g = document.querySelector("[data-group]"); g.setAttribute("data-invalid", "true"); g.setAttribute("aria-invalid", "true"); })()`,
  sibling: `(() => { const s = document.createElement("style"); s.textContent = "[data-item].is-bound{border-color:var(--foreground)}"; document.head.append(s); document.querySelectorAll("[data-item]").forEach((e) => e.classList.add("is-bound")); })()`,
  toneTranslucent: `document.querySelector("[data-group]").style.setProperty("--selection-tone", "rgb(120 80 200 / 0.35)")`,
  toneUnresolvable: `document.querySelector("[data-group]").style.setProperty("--selection-tone", "var(--th-undefined-tone)")`,
  tone: `document.querySelector("[data-group]").style.setProperty("--selection-tone", "oklch(0.62 0.2 300)")`,
};

for (const engine of engines) {
  const E = out.engines[engine] = { version: await engineVersion(engine), loadStart: load() };
  say(`\n${E.version} · load ${E.loadStart}`);
  const section = async (k, fn) => { if (!want(k)) return; say(` [${k}] load ${load()}`); try { await fn(); } catch (e) { cell(E, k, false, `HARNESS ERROR ${String(e.message).split("\n")[0]}`); } };

  // ── question 2 · the mixed grid ──
  await section("q2", async () => {
    let P = await open(engine, "preset-migrated");
    await P.page.evaluate(SUR.mixed); await P.page.evaluate(FRAME);
    let items = await P.page.evaluate(readItems);
    cell(E, "q2", items.every((x) => x.cls === "cell") && new Set(items.map((x) => x.h)).size === 1, `K1 migrated, #meta removed from items 1 and 3 (a one-row item beside a two-row one) → ${tally(items)}; heights [${items.map((x) => x.h).join(", ")}]; #0 ${i0(items[0])} | #1 ${i0(items[1])}`);
    await P.close();
    const walks = [];
    for (let from = 0; from < 4; from++) for (const key of ["ArrowRight", "ArrowLeft", "ArrowDown", "ArrowUp"]) {
      P = await open(engine, "preset-migrated");
      await P.page.evaluate(SUR.mixed); await P.page.evaluate(FRAME);
      await P.page.evaluate((i) => document.querySelectorAll("[data-item]")[i].focus(), from);
      await P.page.keyboard.press(key);
      walks.push(`${from}${key[5]}→${await P.page.evaluate(() => [...document.querySelectorAll("[data-item]")].indexOf(document.activeElement))}`);
      await P.close();
    }
    const expect = "0R→1 0L→3 0D→2 0U→3 1R→2 1L→0 1D→3 1U→0 2R→3 2L→1 2D→3 2U→0 3R→0 3L→2 3D→0 3U→1";
    cell(E, "q2", walks.join(" ") === expect, `mixed 2×2 walk (Q-4 b) ${walks.join(" ")}${walks.join(" ") === expect ? "" : ` · expected ${expect}`}`);
    // the same mixed row with the row's alignment forced to centre (a consumer's items-center): unequal heights, centred
    const w2 = [];
    for (const [from, key] of [[1, "ArrowDown"], [3, "ArrowUp"], [0, "ArrowDown"], [2, "ArrowUp"]]) {
      P = await open(engine, "preset-migrated");
      await P.page.evaluate(SUR.mixed); await P.page.evaluate(`document.querySelector("[data-group]").style.alignItems = "center"`); await P.page.evaluate(FRAME);
      const hs = await P.page.evaluate(() => [...document.querySelectorAll("[data-item]")].map((e) => e.getBoundingClientRect().height.toFixed(1)).join(","));
      await P.page.evaluate((i) => document.querySelectorAll("[data-item]")[i].focus(), from);
      await P.page.keyboard.press(key);
      w2.push(`${from}${key[5]}→${await P.page.evaluate(() => [...document.querySelectorAll("[data-item]")].indexOf(document.activeElement))} (h ${hs})`);
      await P.close();
    }
    cell(E, "q2", w2.map((s) => s.split(" ")[0]).join(" ") === "1D→3 3U→1 0D→2 2U→0", `the same row centred by the consumer (unequal heights): ${w2.join(" ")}`);
    for (const scene of ["single", "vertical", "pill-icon", "pill-badge", "family-d-undeclared"]) {
      P = await open(engine, scene);
      items = await P.page.evaluate(readItems);
      const g = await P.page.evaluate(() => getComputedStyle(document.querySelector("[data-group]")).alignItems);
      cell(E, "q2", items.every((x) => x.cls === "pill"), `${scene} (no anatomy) → ${tally(items)}; group align-items ${g}; #0 ${i0(items[0])}${items.some((x) => x.clipped) ? ` · content clipped on ${items.filter((x) => x.clipped).length}` : ""}`);
      await P.close();
    }
    P = await open(engine, "single");
    const flip = await P.page.evaluate(async () => {
      const frame = () => new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));
      const its = [...document.querySelectorAll("[data-item]")];
      const read = () => its.map((e) => { const cs = getComputedStyle(e), r = e.getBoundingClientRect(); return `${r.width.toFixed(0)}×${r.height.toFixed(1)} ${cs.borderTopLeftRadius}`; }).join(" | ");
      const before = read(); const row = document.createElement("span"); row.className = "toggle-group__meta"; row.textContent = "0.35 s";
      its[0].append(row); await frame(); const added = read(); row.remove(); await frame(); return { before, added, removed: read() };
    });
    cell(E, "q2", flip.before === flip.removed && !/9999px/.test(flip.added), `live flip, a #meta row appended to item 0 of 'single' then removed · before ${flip.before} · added ${flip.added} · removed ${flip.removed}`);
    await P.close();
  });

  // ── question 3 · the paired witness ──
  await section("q3", async () => {
    for (const scene of ["preset-migrated", "specimen-migrated", "strip-migrated", "f1-migrated", "v2-migrated"]) {
      const P = await open(engine, scene);
      const a0 = await P.page.evaluate(attrs), added = await P.page.evaluate(readItems);
      await P.page.evaluate(SUR.rowsRemoved); await P.page.evaluate(FRAME);
      const a1 = await P.page.evaluate(attrs), removed = await P.page.evaluate(readItems);
      const same = JSON.stringify(a0) === JSON.stringify(a1);
      cell(E, "q3", added.every((x) => x.cls === "cell") && removed.every((x) => x.cls === "pill") && same,
        `${scene} · rows present → ${tally(added)} (#0 ${i0(added[0])}) · rows removed → ${tally(removed)} (#0 ${i0(removed[0])}) · attributes of the group and ${added.length} items ${same ? "identical" : "DIFFER"}`);
      await P.close();
    }
  });

  // ── question 4 · the unmigrated consumer, beside the migrated one ──
  await section("q4", async () => {
    for (const scene of ["preset", "preset-verbatim", "specimen", "specimen-verbatim", "preset-migrated", "specimen-migrated", "strip-migrated", "f1-migrated", "v2-migrated", "c1-migrated"]) {
      const P = await open(engine, scene);
      const items = await P.page.evaluate(readItems);
      const errs = P.logs.filter((l) => l.type === "error" || l.type === "pageerror");
      cell(E, "q4", true, `corner ${scene} → ${tally(items)}; #0 ${i0(items[0])}; content rows ${items[0].rows}, a row cut by the plate on ${items.filter((x) => x.clipped).length}/${items.length}; console errors ${errs.length}${errs[0] ? ` («${errs[0].text.slice(0, 110)}»)` : ""}`, false);
      await P.close();
    }
    for (const mode of ["light", "dark", "prt"]) {
      for (const scene of ["preset", "preset-verbatim", "specimen", "specimen-verbatim"]) await t3(E, "q4", engine, scene, mode, null, `T-3 unmigrated ${scene}`, false);
      for (const scene of ["preset-migrated", "specimen-migrated", "strip-migrated", "f1-migrated", "v2-migrated"]) await t3(E, "q4", engine, scene, mode, null, `T-3 migrated ${scene}`);
      await t3(E, "q4", engine, "c1-migrated", mode, null, "T-3 migrated c1-migrated (one-row pills, Q-10 b: reported)", false);
      for (const k of ["invalid", "sibling", "toneTranslucent", "toneUnresolvable"]) await t3(E, "q4", engine, "preset-migrated", mode, SUR[k], `T-3 H-3 ${k} on preset-migrated`);
    }
  });

  // ── question 5 · the comfort axis (T-1's own story and verdict) ──
  await section("q5", async () => {
    for (const [name, o] of [["fine", {}], ["coarse", { coarse: true }], ["ui-scale 1.25", { uiScale: 1.25 }]]) for (const scene of ["preset-migrated", "specimen-migrated", "strip-migrated", "f1-migrated", "v2-migrated"]) {
      const P = await open(engine, scene, o);
      await tagItems(P);
      const st = await cornerStory(P, 0), j = judgeT1(st, "tile");
      cell(E, "q5", P.modeOk && j.pass === true, `T-1 ${scene} ${name}${P.modeOk ? "" : " (MODE NOT APPLIED)"} · rung ${st.rung} · ${stepLine(st)} · bound ${j.bound ?? j.why}`);
      await P.close();
    }
    for (const [name, o] of [["coarse", { coarse: true }], ["ui-scale 1.25", { uiScale: 1.25 }]]) for (const scene of ["single", "pill-icon", "pill-badge", "c1-migrated"]) {
      const P = await open(engine, scene, o);
      const items = await P.page.evaluate(readItems);
      cell(E, "q5", items.every((x) => x.cls === "pill"), `pill ${scene} ${name} → ${tally(items)}; #0 ${i0(items[0])}`);
      await P.close();
    }
  });

  // ── D′ item 3 · the commit bar (H-4's own sampler and verdict) ──
  await section("commit", async () => {
    const committed = (frames) => { const a = frames[0].on ?? [], z = frames[frames.length - 1].on ?? []; return z.findIndex((v, i) => v && !a[i]); };
    const run = async (name, scene, fn) => {
      let r, tries = 0;
      do { r = await fn(); tries++; } while (!r.pass && r.med > 20 && tries < 3);
      cell(E, "commit", r.pass, `${scene} ${name} · ${r.line} · median frame ${r.med.toFixed(1)} ms · load ${load()}${tries > 1 ? ` · ${tries} runs (janky frames re-run)` : ""}`);
    };
    for (const scene of ["preset-migrated", "specimen-migrated", "single"]) {
      const tabInto = async (P) => { await P.page.evaluate(() => document.querySelector('[data-sentinel="before"]').focus());
        return sampleOver(P, async () => { for (let k = 0; k < 4; k++) { await P.page.keyboard.press(P.keys.tab); const a = await P.page.evaluate(() => window.__th.active()); if (typeof a === "number" || a === "after") break; } }, 700); };
      await run("Tab entry", scene, async () => { const P = await open(engine, scene); await tagItems(P); const f = await tabInto(P); await P.close(); return { ...quietEntry(f), med: medianInterval(f) }; });
      await run("keyboard commit (ArrowRight)", scene, async () => { const P = await open(engine, scene); await tagItems(P); await tabInto(P); await P.page.waitForTimeout(300);
        const before = await P.page.evaluate(() => window.__th.items().map((e) => window.__th.on(e)));
        const f = await sampleOver(P, () => P.page.keyboard.press("ArrowRight"));
        const after = await P.page.evaluate(() => window.__th.items().map((e) => window.__th.on(e))); await P.close();
        return { ...commitBar(f, after.findIndex((v, i) => v && !before[i])), med: medianInterval(f) }; });
      await run("programmatic commit (focus on the sentinel)", scene, async () => { const P = await open(engine, scene); const u = await unselectedIdx(P);
        await P.page.evaluate(() => document.querySelector('[data-sentinel="after"]').focus());
        const f = await sampleOver(P, () => P.page.evaluate((i) => window.__tile.select(i), u)); await P.close(); return { ...commitBar(f, u), med: medianInterval(f) }; });
      await run("pointer commit (click)", scene, async () => { const P = await open(engine, scene); const u = await unselectedIdx(P);
        const r = await P.page.evaluate((i) => window.__th.rect(document.querySelector(`[data-th-idx="${i}"]`)), u);
        await P.page.mouse.move(r.x + r.w / 2, r.y + r.h / 2); await P.page.waitForTimeout(500); await P.page.mouse.down();  await P.page.waitForTimeout(120);
        const f = await sampleOver(P, () => P.page.mouse.up()); await P.close(); return { ...commitBar(f, u), med: medianInterval(f) }; });
    }
    // reduced motion: the kick's amplitude is zero and the perimeter still arrives
    const P = await open(engine, "preset-migrated", { prm: true }); const u = await unselectedIdx(P);
    const f = await sampleOver(P, () => P.page.evaluate((i) => window.__tile.select(i), u)); await P.close();
    const s = f.map((x) => x.s[u]);
    cell(E, "commit", Math.max(...s) - Math.min(...s) < 0.002, `preset-migrated programmatic commit under reduced motion · scale range ${(Math.max(...s) - Math.min(...s)).toFixed(4)} (no pop; the perimeter and the mark carry it)`);
  });

  // ── D′ item 4 · hover on the plate layer, against the selected state ──
  await section("hover", async () => {
    for (const mode of ["light", "dark"]) for (const scene of ["preset-migrated", "specimen-migrated"]) {
      let P = await open(engine, scene, { mode });
      const u = await unselectedIdx(P);
      const hl = await hoverLight(P, u);
      cell(E, "hover", hl.changedPct >= 2, `${scene} ${mode} hover light on unselected #${u} · ${hl.changedPct.toFixed(2)} % of pixels move (scale pinned)`);
      await P.close();
      // the selected tile against a HOVERED unselected sibling: T-3's measurement with the pointer left on the sibling
      P = await open(engine, scene, { mode });
      await tagItems(P);
      const info = await P.page.evaluate(() => { const th = window.__th, its = th.items(); const s = its.findIndex((e) => th.on(e)); const u = its.findIndex((e, i) => i !== s); return { s, u, rs: th.rect(its[s]), ru: th.rect(its[u]) }; });
      await P.page.evaluate(({ s, u }) => { const th = window.__th; th.hideInk(true); for (const i of [s, u]) th.pin(document.querySelector(`[data-th-idx="${i}"]`), true); }, info);
      await P.page.mouse.move(info.ru.x + info.ru.w / 2, info.ru.y + info.ru.h / 2); await P.page.waitForTimeout(700);
      const hovered = await P.page.evaluate((u) => document.querySelector(`[data-th-idx="${u}"]`).matches(":hover"), info.u);
      const clip = (r) => ({ x: Math.round(r.x), y: Math.round(r.y), width: Math.floor(Math.min(info.rs.w, info.ru.w)), height: Math.floor(Math.min(info.rs.h, info.ru.h)) });
      const A = await shot(P.page, clip(info.rs)), B = await shot(P.page, clip(info.ru));
      const c = compare(A, B, null, Math.round(4 * A.dsf)), bar = clip(info.rs).width + clip(info.rs).height;
      cell(E, "hover", hovered && c.c3 / (A.dsf * A.dsf) >= bar, `${scene} ${mode} selected #${info.s} vs HOVERED unselected #${info.u} (:hover ${hovered}) · ≥3:1 area ${(c.c3 / (A.dsf * A.dsf)).toFixed(2)} px² (band ${(c.c3Edge / (A.dsf * A.dsf)).toFixed(2)}, interior ${(c.c3Inner / (A.dsf * A.dsf)).toFixed(2)}) vs the bar ${bar} px²`);
      await P.close();
    }
  });

  // ── D′ item 6 · X-2 and X-7: the state ink reaches the media, the tone reaches edge, tint and ink ──
  await section("ink", async () => {
    for (const [scene, sel] of [["specimen-migrated", ".tile-sparkline path"], ["strip-migrated", ".tile-glyph path"], ["f1-migrated", ".grid-svg path"]]) for (const tone of [false, true]) {
      const P = await open(engine, scene);
      if (tone) { await P.page.evaluate(SUR.tone); await P.page.evaluate(FRAME); }
      await P.page.waitForTimeout(400);
      const r = await P.page.evaluate((sel) => { const its = [...document.querySelectorAll("[data-item]")], on = its.find((e) => e.dataset.state === "on"), off = its.find((e) => e.dataset.state !== "on");
        const g = (e) => getComputedStyle(e.querySelector(sel)).stroke;
        return { on: g(on), off: g(off), tint: getComputedStyle(on).backgroundColor, tintOff: getComputedStyle(off).backgroundColor, edge: getComputedStyle(on, "::before").borderTopColor, meta: on.querySelector(".toggle-group__meta") ? getComputedStyle(on.querySelector(".toggle-group__meta")).color : null,
          rules: [...document.styleSheets].flatMap((s) => { try { return [...s.cssRules]; } catch { return []; } }).filter((x) => x.selectorText && /data-arm="migrated"/.test(x.selectorText) && /data-state/.test(x.selectorText)).length }; }, sel);
      cell(E, "ink", r.on !== r.off && r.rules === 0 && (!tone || r.on === r.edge), `${scene}${tone ? " with --selection-tone: oklch(0.62 0.2 300) on the group" : ""} · media stroke on ${r.on} / off ${r.off} · edge ${r.edge} · tint ${r.tint} (off ${r.tintOff}) · consumer [data-state] rules in the migrated arm ${r.rules}`);
      await P.close();
    }
  });

  // ── selector reach (F1-6): style recalculation with and without the :has() rules ──
  await section("cost", async () => {
    const P = await open(engine, "specimen-migrated");
    const r = await P.page.evaluate(async () => {
      const grid = document.querySelector(".specimen-grid"), proto = grid.querySelector("[data-item]");
      for (let k = 0; k < 192; k++) grid.append(proto.cloneNode(true));
      const items = [...document.querySelectorAll("[data-item]")];
      const time = () => { const t0 = performance.now(); for (let k = 0; k < 40; k++) { items[(k * 7) % items.length].toggleAttribute("data-probe"); document.documentElement.classList.toggle("th-x"); void items[0].offsetHeight; getComputedStyle(items[items.length - 1]).borderTopLeftRadius; } return performance.now() - t0; };
      const rounds = (m) => Array.from({ length: m }, time).sort((a, b) => a - b);
      const withHas = rounds(9);
      // the control: the same tile body keyed on a class, no :has() anywhere in the item's rules
      let rewritten = 0;
      for (const s of document.styleSheets) { let rules; try { rules = s.cssRules; } catch { continue; } const walk = (list, owner) => { for (let i = list.length - 1; i >= 0; i--) { const x = list[i]; if (x.cssRules && !x.selectorText) walk(x.cssRules, x); else if (x.selectorText && x.selectorText.includes(":has(") && x.selectorText.includes("toggle-group__me")) { const text = x.cssText.replace(x.selectorText, x.selectorText.replace(/\.toggle-group:has\([^)]*\)/g, ".toggle-group.th-tiles").replace(/\.toggle-group__item:has\([^)]*\)/g, ".toggle-group__item.th-tile")); owner.deleteRule(i); owner.insertRule(text, i); rewritten++; } } }; walk(rules, s); }
      document.querySelector("[data-group]").classList.add("th-tiles");
      const withClass = rounds(9);
      return { n: items.length, rewritten, withHas, withClass, radius: getComputedStyle(items[0]).borderTopLeftRadius };
    });
    const med = (a) => a[Math.floor(a.length / 2)];
    cell(E, "cost", true, `${r.n} tiles, 40 forced style+layout passes per round, 9 rounds · :has() rules min ${r.withHas[0].toFixed(1)} ms, median ${med(r.withHas).toFixed(1)} ms · the same ${r.rewritten} rules keyed on a class min ${r.withClass[0].toFixed(1)} ms, median ${med(r.withClass).toFixed(1)} ms (tile corner still ${r.radius}) · ratio of minima ${(r.withHas[0] / r.withClass[0]).toFixed(2)} · load ${load()}`, false);
    await P.close();
  });

  // ── D′ item 9 · the refusal: what the build names (DEV) and what it does structurally (every flavour) ──
  await section("guard", async () => {
    for (const [scene, wantNames] of [["preset", 4], ["specimen", 8], ["preset-input", 5], ["preset-migrated", 0], ["specimen-migrated", 0], ["strip-migrated", 0], ["v2-migrated", 0], ["single", 0], ["pill-icon", 0], ["pill-badge", 0], ["c1-migrated", 0]]) {
      const P = await open(engine, scene);
      await P.page.waitForTimeout(300);
      const items = await P.page.evaluate(readItems);
      const names = P.logs.filter((l) => l.type === "error" && /\[ToggleGroupItem\]/.test(l.text));
      const dev = target.meta.flavor.endsWith("-dev");
      const rows = names.filter((l) => /second row/.test(l.text)).length, inter = names.filter((l) => /interactive descendant/.test(l.text)).length;
      const structural = /migrated/.test(scene) || items.every((x) => x.cls === "pill");
      cell(E, "guard", structural && (dev ? rows + inter === wantNames : names.length === 0), `${scene} [${target.meta.flavor}] · ${tally(items)} (#0 ${items[0].w}×${items[0].h} at rung ${items[0].rung}) · named: ${rows} second-row, ${inter} interactive-descendant${dev ? ` (expected ${wantNames} in all)` : " (a production build names nothing)"}`);
      await P.close();
    }
  });

  E.loadEnd = load(); say(`  load ${E.loadEnd} at end`);
}
say(`\n${pass}/${n} gating cells pass · load ${load()} at end`);
out.pass = pass; out.n = n;
if (typeof args.json === "string") fs.writeFileSync(args.json, JSON.stringify(out, null, 1));
await closeBrowsers(); await target.close(); lock.release(); process.exit(0);

#!/usr/bin/env node
// T-6 · Engagement: hover answers in a light channel as well as scale, and keeps the light channel under PRM
// (R3-02-12); press squishes; a commit clears the COMMIT BAR (H-4); coarse taps do not latch hover (F-77).
//   light channel  scale pinned to 1, rest vs hover: ≥ 2 % of the item's device pixels move by more than 10
//   hover scale    the hovered item's computed scale > 1.001 (no PRM)
//   press          mouse down 180 ms: scale < 0.999
//   (hover scale and press are sampled per frame; a janky failing read is re-read twice, as the commits are)
//   commit bar     sampled every animation frame for 800 ms on the committed item (measure.commitBar): a pop that
//                  peaks ≥ 0.015 above its settle (the last sampled scale) and bounces ≥ 0.002 below it, or a selection body that travels ≥ 4 px and overshoots
//                  ≥ 0.5 px. Three commits, each gating: a keyboard commit (an arrow, the pointer never moved), a
//                  programmatic commit (__tile.select with focus on the sentinel after the group), a pointer commit
//                  (release of a press). A colour change or a linear fade fails it.
//   Tab entry      Tab into the group whose choice is made: no item scales and no body moves (C-crit C-1)
//   coarse         touch context (hover:none, pointer:coarse): tap u then v; u's scale is 1 and its paint moves
//                  on < 1 % of pixels against its pre-tap rest
//   (reported)     the pass-1 commit cell: running non-scale motions on the item at release
// Timings are wall-clock frames, so every commit line carries the load average; a failing commit whose frames
// were janky (median interval > 20 ms) is re-run twice, and a failure that does not reproduce is labelled
// NOT-REPRODUCED (seen only under load) and does not fail the cell.
// The keyboard, programmatic and Tab cells run on a page the pointer never enters, so an engine that hangs under
// the pointer (PF-1: ToggleGroupItem in Playwright WebKit) still yields them; the pointer segment then fails loud.
//   node t6-engagement.mjs --build <dir> | --fixture [--fault t6-fade] [--engine chromium|webkit]
import { cli, openPage, sceneList, scenesFor, engineVersion, engineOf, f2, within, load, engineClosed } from "./lib.mjs";
import { unselectedIdx, hoverLight, hoverScale, pressScale, coarseLatch, tagItems, sampleOver, commitBar, quietEntry } from "./measure.mjs";

const JANK_MS = 20;
const committed = (frames) => {
  const a = frames[0].on, z = frames[frames.length - 1].on;
  return z.findIndex((v, k) => v && !a[k]); // -1: the key committed nothing
};
const medianDt = (frames) => { const d = frames.slice(1).map((f, k) => f.t - frames[k].t).sort((x, y) => x - y); return d.length ? d[Math.floor(d.length / 2)] : 0; };

/** Keyboard traversal into the group; the Tab-entry frames. */
async function tabInto(P) {
  await P.page.evaluate(() => document.querySelector('[data-sentinel="before"]').focus());
  return sampleOver(P, async () => {
    for (let k = 0; k < 4; k++) {
      await P.page.keyboard.press(P.keys.tab);
      const a = await P.page.evaluate(() => window.__th.active());
      if (typeof a === "number" || a === "after") break;
    }
  }, 700);
}
const MEASURES = {
  async keyboard(target, engine, sc) {
    const P = await openPage(target, engine, sc.id);
    await tagItems(P);
    await tabInto(P);
    await P.page.waitForTimeout(300);
    const a = await P.page.evaluate(() => window.__th.active());
    if (typeof a !== "number") { await P.close(); return { pass: false, line: `keyboard traversal landed on ${a}, not an item` }; }
    const frames = await sampleOver(P, () => P.page.keyboard.press("ArrowRight"));
    await P.close();
    const i = committed(frames);
    return { ...commitBar(frames, i), i, med: medianDt(frames) };
  },
  async programmatic(target, engine, sc) {
    const P = await openPage(target, engine, sc.id);
    const u = await unselectedIdx(P);
    await P.page.evaluate(() => document.querySelector('[data-sentinel="after"]').focus());
    const frames = await sampleOver(P, () => P.page.evaluate((i) => window.__tile.select(i), u));
    await P.close();
    return { ...commitBar(frames, u), i: u, med: medianDt(frames) };
  },
  async tabEntry(target, engine, sc) {
    const P = await openPage(target, engine, sc.id);
    await tagItems(P);
    const frames = await tabInto(P);
    await P.close();
    return { ...quietEntry(frames), med: medianDt(frames) };
  },
};
/** Run one measure; on a janky failure re-run twice and label a non-reproducing failure. */
async function measured(name, target, engine, sc) {
  const L0 = load();
  const r = await MEASURES[name](target, engine, sc);
  if (r.pass || !(r.med > JANK_MS)) return { ...r, load: L0, note: "" };
  const reruns = [];
  for (let k = 0; k < 2; k++) reruns.push({ ...(await MEASURES[name](target, engine, sc)), load: load() });
  const ok = reruns.filter((x) => x.pass).length;
  return ok ? { ...r, pass: true, load: L0, note: ` · NOT-REPRODUCED: janky first run (median ${f2(r.med)} ms) failed, ${ok}/2 re-runs pass (${reruns.map((x) => `median ${f2(x.med)} ms, load ${x.load}`).join("; ")})` }
    : { ...r, load: L0, note: ` · reproduced in 2/2 re-runs (${reruns.map((x) => `median ${f2(x.med)} ms, load ${x.load}`).join("; ")})` };
}

/**
 * The same rule for the pass-1 hover-scale and press reads, which wait a fixed time for a transition: a failing
 * read whose frames were janky (median interval > 20 ms) is re-read twice; a failure that does not reproduce is
 * NOT-REPRODUCED and passes, one that reproduces in 2/2 fails. A failure on smooth frames is never re-read.
 */
async function reread(read, ok, show) {
  const L0 = load();
  const r = await read(false);
  if (ok(r) || !(r.med > JANK_MS)) return { r, pass: ok(r), load: L0, note: "" };
  const again = [];
  for (let k = 0; k < 2; k++) { const x = await read(true); again.push({ x, load: load() }); }
  const n = again.filter((a) => ok(a.x)).length;
  const detail = again.map((a) => `${show(a.x)} at median ${f2(a.x.med)} ms, load ${a.load}`).join("; ");
  return { r, pass: n > 0, load: L0, note: n > 0 ? ` · NOT-REPRODUCED: janky first read failed, ${n}/2 re-reads pass (${detail})` : ` · reproduced in 2/2 re-reads (${detail})` };
}

if (import.meta.url === `file://${process.argv[1]}`) {
  await cli("T-6", async (args, target) => {
    const engine = engineOf(args);
    const cells = [];
    const c = (sc, pass, line, gating = sc.gating) => cells.push({ gating, pass, scene: sc.id, arm: sc.arm, line: `${sc.id} ${line}` });
    for (const sc of scenesFor(await sceneList(target, engine), "T-6")) {
      // Each segment writes its cells into its own list and they are kept only when the segment finishes, so a
      // segment abandoned on a hang cannot write late cells. A segment whose engine died (the browser process
      // closed) is re-run once on a relaunched browser: if the re-run finishes, its cells stand and the crash is
      // labelled NOT-REPRODUCED; if it dies again, the cells it wrote stand and the segment FAILS loud.
      const segment = async (name, run) => {
        let seg = [], P = { cur: null };
        const push = (pass, line, gating = sc.gating) => seg.push({ gating, pass, scene: sc.id, arm: sc.arm, line: `${sc.id} ${line}` });
        let r = await within(120000, () => run(push, P));
        let note = "";
        if (!r.ok && engineClosed(r.error)) {
          const first = r.error, L = load();
          if (P.cur) await within(5000, () => P.cur.close());
          seg = []; P = { cur: null };
          r = await within(120000, () => run(push, P));
          note = r.ok ? `NOT-REPRODUCED: the engine closed during the ${name} segment (${first}; load ${L}); the re-run on a relaunched browser finished` : "";
          if (r.ok) seg.push({ gating: false, pass: true, scene: sc.id, arm: sc.arm, line: `${sc.id} ${note}` });
        }
        cells.push(...seg);
        if (!r.ok) { c(sc, false, `engine failure during the ${name} segment · ${r.error}`); if (P.cur) await within(5000, () => P.cur.close()); }
      };
      // the keyboard-only segment: the pointer never enters the page
      await segment("keyboard", async (push) => {
        const te = await measured("tabEntry", target, engine, sc);
        push(te.pass, `Tab entry${engine === "webkit" ? " (Option+Tab)" : ""} · ${te.line} · load ${te.load}${te.note}`);
        const kb = await measured("keyboard", target, engine, sc);
        push(kb.pass, `commit bar, keyboard commit (ArrowRight, pointer never moved) on #${kb.i} · ${kb.line} · load ${kb.load}${kb.note}`);
        const pg = await measured("programmatic", target, engine, sc);
        push(pg.pass, `commit bar, programmatic commit (focus on the sentinel after the group) on #${pg.i} · ${pg.line} · load ${pg.load}${pg.note}`);
      });
      // the pointer segment; an engine that hangs or crashes under the pointer is a FAIL in that engine, not a stalled run
      await segment("pointer", async (push, H) => {
        let P = H.cur = await openPage(target, engine, sc.id);
        let u = await unselectedIdx(P);
        const hl = await hoverLight(P, u);
        push(hl.changedPct >= 2, `hover light channel (scale pinned) · ${f2(hl.changedPct)} % of pixels moved, p95 ${f2(hl.p95)}:1`);
        const hs = await reread(() => hoverScale(P, u), (x) => x.sx > 1.001, (x) => f2(x.sx));
        push(hs.pass, `hover scale · ${f2(hs.r.sx)} (${hs.r.scale}); median frame ${f2(hs.r.med)} ms, load ${hs.load}${hs.note}`);
        // a press re-read releases off the item (no click, so nothing commits) and presses again; the last read
        // leaves the press held for the pointer commit below
        const pr = await reread(async (again) => { if (again) { await P.page.mouse.move(1, 1); await P.page.mouse.up(); } return pressScale(P, u); },
          (x) => x.s.sx < 0.999, (x) => f2(x.s.sx));
        push(pr.pass, `press · scale ${f2(pr.r.s.sx)}×${f2(pr.r.s.sy)}; median frame ${f2(pr.r.med)} ms, load ${pr.load}${pr.note}`);
        let anims = [];
        const L0 = load();
        const frames = await sampleOver(P, async () => {
          await P.page.mouse.up();
          anims = await P.page.evaluate((q) => window.__th.anims(document.querySelector(q)), `[data-th-idx="${u}"]`);
        });
        const cb = commitBar(frames, u);
        push(cb.pass, `commit bar, pointer commit (release of the press) on #${u} · ${cb.line} · load ${L0}`);
        const nonScale = anims.filter((x) => !/^(scale|transform|translate|rotate)$/.test(x.prop) && x.state === "running");
        push(nonScale.length > 0, `commit motions at release (reported, the pass-1 cell) · ${nonScale.length} non-scale [${nonScale.map((a) => `${a.kind}:${a.prop}@${a.target} ${Math.round(a.duration)}ms`).join(", ")}] (all ${anims.length})`, false);
        await P.close();
        P = H.cur = await openPage(target, engine, sc.id, { prm: true });
        u = await unselectedIdx(P);
        const hp = await hoverLight(P, u);
        push(P.modeOk && hp.changedPct >= 2, `PRM hover light channel · ${f2(hp.changedPct)} % of pixels moved`);
        await P.close();
        P = H.cur = await openPage(target, engine, sc.id, { coarse: true });
        u = await unselectedIdx(P);
        const v = await P.page.evaluate((x) => { const th = window.__th, its = th.items(); return its.findIndex((e, i) => i !== x && !th.on(e)); }, u);
        const cl = await coarseLatch(P, u, v);
        push(P.modeOk && Math.abs(cl.scale.sx - 1) < 0.001 && cl.changedPct < 1, `coarse · after tapping #${u} then #${v}: #${u} scale ${f2(cl.scale.sx)}, :hover ${cl.scale.hover}, paint moved ${f2(cl.changedPct)} %`);
        await P.close(); H.cur = null;
      });
    }
    return { id: "T-6", title: "engagement: hover light + scale, press, the commit bar (keyboard, programmatic, pointer), no pop on Tab entry, no coarse latch", engine, engineLabel: await engineVersion(engine), target: target.label, dev: target.meta.dev, cells };
  });
}

#!/usr/bin/env node
// T-6 · Engagement: hover answers in a light channel as well as scale, and keeps the light channel under PRM
// (R3-02-12); press squishes; a commit transitions; coarse taps do not latch hover (F-77).
//   light channel  scale pinned to 1, rest vs hover: ≥ 2 % of the item's device pixels move by more than 10
//   hover scale    the hovered item's computed scale > 1.001 (no PRM)
//   press          mouse down 180 ms: scale < 0.999
//   commit         on release of a press on an unselected item, it runs at least one transition or animation
//                  on a property other than scale/transform (the commit is a motion, not a repaint)
//   coarse         touch context (hover:none, pointer:coarse): tap u then v; u's scale is 1 and its paint moves
//                  on < 1 % of pixels against its pre-tap rest
//   node t6-engagement.mjs --build <dir> | --fixture [--fault t6] [--engine chromium|webkit]
import { cli, openPage, sceneList, scenesFor, engineVersion, f2, within } from "./lib.mjs";
import { unselectedIdx, hoverLight, hoverScale, pressScale, commitAnims, coarseLatch, park } from "./measure.mjs";

if (import.meta.url === `file://${process.argv[1]}`) {
  await cli("T-6", async (args, target) => {
    const engine = args.engine ?? "chromium";
    const cells = [];
    const c = (sc, pass, line) => cells.push({ gating: sc.gating, pass, scene: sc.id, line: `${sc.id} ${line}` });
    for (const sc of scenesFor(await sceneList(target, engine), "T-6")) {
      let P = null;
      const r = await within(120000, async () => {
      P = await openPage(target, engine, sc.id);
      let u = await unselectedIdx(P);
      const hl = await hoverLight(P, u);
      c(sc, hl.changedPct >= 2, `hover light channel (scale pinned) · ${f2(hl.changedPct)} % of pixels moved, p95 ${f2(hl.p95)}:1`);
      const hs = await hoverScale(P, u);
      c(sc, hs.sx > 1.001, `hover scale · ${f2(hs.sx)} (${hs.scale})`);
      const pr = await pressScale(P, u);
      c(sc, pr.s.sx < 0.999, `press · scale ${f2(pr.s.sx)}×${f2(pr.s.sy)}`);
      const cm = await commitAnims(P, u);
      c(sc, cm.on && cm.nonScale.length > 0, `commit · item on ${cm.on} · running non-scale motions ${cm.nonScale.length} [${cm.nonScale.map((a) => `${a.kind}:${a.prop}@${a.target} ${Math.round(a.duration)}ms`).join(", ")}] (all ${cm.all.length})`);
      await P.close();
      P = await openPage(target, engine, sc.id, { prm: true });
      u = await unselectedIdx(P);
      const hp = await hoverLight(P, u);
      c(sc, P.modeOk && hp.changedPct >= 2, `PRM hover light channel · ${f2(hp.changedPct)} % of pixels moved`);
      await P.close();
      P = await openPage(target, engine, sc.id, { coarse: true });
      u = await unselectedIdx(P);
      const v = await P.page.evaluate((x) => { const th = window.__th, its = th.items(); return its.findIndex((e, i) => i !== x && !th.on(e)); }, u);
      const cl = await coarseLatch(P, u, v);
      c(sc, P.modeOk && Math.abs(cl.scale.sx - 1) < 0.001 && cl.changedPct < 1, `coarse · after tapping #${u} then #${v}: #${u} scale ${f2(cl.scale.sx)}, :hover ${cl.scale.hover}, paint moved ${f2(cl.changedPct)} %`);
      await P.close();
      });
      // an engine that hangs or crashes under the pointer is a FAIL in that engine, not a stalled run
      if (!r.ok) { c(sc, false, `engine failure during the engagement script · ${r.error}`); if (P) await within(5000, () => P.close()); }
    }
    return { id: "T-6", title: "engagement: hover light + scale, press, commit motion, no coarse latch", engine, engineLabel: await engineVersion(engine), target: target.label, dev: target.meta.dev, cells };
  });
}

#!/usr/bin/env node
// T-7 · No consumer paint: no consumer site sets the tile's radius, selection paint or focus outline (H-7). Per
// consumer site, each consumer arm is read against its stripped twin (the same markup with the arm's consumer CSS
// off and the class attributes of every item and group removed): the item's computed radius, outline, background,
// border colour, shadow and colour in four states (rest, selected, focused by keyboard traversal, hovered). Any
// difference is consumer paint on the tile. The unmigrated arm (the consumer's HEAD composition) is reported; the
// migrated arm (a route's migration) gates. A build with no migration for a site has no migrated arm: its gating
// cell is UNMEASURED, never a self-paired pass (E-crit CX-8, D-crit). Content-ink differences are reported.
//   node t7-no-consumer-paint.mjs --build <dir> | --fixture [--fault t7] [--engine chromium|webkit]
import { cli, openPage, sceneList, scenesFor, engineVersion, engineOf, within, engineClosed } from "./lib.mjs";
import { paintStates, PAINT_PROPS } from "./measure.mjs";

const short = (v) => (v.length > 60 ? v.slice(0, 57) + "..." : v);
if (import.meta.url === `file://${process.argv[1]}`) {
  await cli("T-7", async (args, target) => {
    const engine = engineOf(args);
    const cells = [];
    const list = await sceneList(target, engine);
    const migrated = new Set(list.migration?.sites ?? []);
    // one read of the four states; a read whose engine died (the browser process closed) is re-run once on a
    // relaunched browser, and a crash that does not reproduce is noted, never silent
    const read = async (id, retry = true) => {
      let P = null;
      const r = await within(90000, async () => { P = await openPage(target, engine, id); const s = await paintStates(P); await P.close(); P = null; return s; });
      if (!r.ok && P) await within(5000, () => P.close());
      if (!r.ok && retry && engineClosed(r.error)) {
        const again = await read(id, false);
        if (again.ok) cells.push({ gating: false, pass: true, line: `${id} · NOT-REPRODUCED: the engine closed during the read (${r.error}); the re-run on a relaunched browser finished` });
        return again;
      }
      return r;
    };
    for (const sc of scenesFor(list, "T-7", { arms: false })) {
      if (!sc.arms) continue;
      for (const [arm, gating] of [["verbatim", false], ["migrated", sc.gating]]) {
        const armName = arm === "verbatim" ? "unmigrated" : "migrated";
        if (arm === "migrated" && !migrated.has(sc.id)) {
          cells.push({ gating, pass: null, scene: sc.id, arm: armName, line: `${sc.id}-migrated · no migration at this build (the null migration is the library arm; a self-paired read is not a measurement)` });
          continue;
        }
        const id = `${sc.id}-${arm}`;
        const V = await read(id), B = await read(`${id}-stripped`);
        if (!V.ok || !B.ok) { cells.push({ gating, pass: false, scene: sc.id, arm: armName, line: `${id} · engine failure while reading the four states · ${V.error ?? B.error}` }); continue; }
        for (const st of ["rest", "on", "focus", "hover"]) {
          const diffs = PAINT_PROPS.filter((p) => V.value[st]?.[p] !== B.value[st]?.[p]);
          cells.push({ gating, pass: diffs.length === 0, scene: sc.id, arm: armName,
            line: `${id} vs its stripped twin · ${st} · ${diffs.length ? diffs.map((p) => `${p}: ${short(B.value[st]?.[p] ?? "—")} → ${short(V.value[st]?.[p] ?? "—")}`).join("; ") : "no consumer paint"}` });
          if (V.value[st]?.__ink !== B.value[st]?.__ink) cells.push({ gating: false, pass: false, scene: sc.id, arm: armName, line: `${id} ${st} content ink · ${B.value[st]?.__ink} → ${V.value[st]?.__ink}` });
        }
      }
    }
    return { id: "T-7", title: "no consumer paint on the tile (each consumer arm against its stripped twin)", engine, engineLabel: await engineVersion(engine), target: target.label, dev: target.meta.dev, cells };
  });
}

#!/usr/bin/env node
// T-7 · No consumer paint: no consumer site sets the tile's radius, selection paint or focus outline. Each
// verbatim scene (the consumer's markup with all its paint) is read against its bare pair (the same markup,
// consumer paint dropped): the item's computed radius, outline, background, border colour, shadow and colour
// in four states (rest, selected, hovered, focused by Tab). Any difference is consumer paint on the tile.
// Content-ink differences are reported, not gated.
//   node t7-no-consumer-paint.mjs --build <dir> | --fixture [--fault t7]
import { cli, openPage, sceneList, scenesFor, engineVersion } from "./lib.mjs";
import { paintStates, PAINT_PROPS } from "./measure.mjs";

const short = (v) => (v.length > 60 ? v.slice(0, 57) + "..." : v);
if (import.meta.url === `file://${process.argv[1]}`) {
  await cli("T-7", async (args, target) => {
    const engine = args.engine ?? "chromium";
    const cells = [];
    for (const sc of scenesFor(await sceneList(target, engine), "T-7")) {
      if (!sc.pair) continue;
      const read = async (id) => { const P = await openPage(target, engine, id); const s = await paintStates(P); await P.close(); return s; };
      const V = await read(sc.id), B = await read(sc.pair);
      for (const st of ["rest", "on", "hover", "focus"]) {
        const diffs = PAINT_PROPS.filter((p) => V[st]?.[p] !== B[st]?.[p]);
        cells.push({ gating: sc.gating, pass: diffs.length === 0, scene: sc.id,
          line: `${sc.id} vs ${sc.pair} · ${st} · ${diffs.length ? diffs.map((p) => `${p}: ${short(B[st][p])} → ${short(V[st][p])}`).join("; ") : "no consumer paint"}` });
        if (V[st]?.__ink !== B[st]?.__ink) cells.push({ gating: false, pass: false, scene: sc.id, line: `${sc.id} ${st} content ink · ${B[st]?.__ink} → ${V[st]?.__ink}` });
      }
    }
    return { id: "T-7", title: "no consumer paint on the tile", engine, engineLabel: await engineVersion(engine), target: target.label, dev: target.meta.dev, cells };
  });
}

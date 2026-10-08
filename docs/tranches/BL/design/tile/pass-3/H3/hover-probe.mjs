#!/usr/bin/env node
// hover-probe.mjs · H3-5 on real builds: T-6's hover light read (measure.hoverLight, the shared instrument) on named
// scenes at rest and under PRT, in Chromium and Playwright WebKit, printing H3's mean OKLab ΔE beside H2's
// "% of pixels moved > 10 levels". Not a witness: it re-reads the one cell pass 2 found engine-split (F1's hover
// on the floor rung: 0.52-0.70 % in Chromium against 73-75 % in Playwright WebKit on identical computed values).
//   node hover-probe.mjs --build <dir> --scenes f1,f1-migrated
import { cli, openPage, engineVersion, ENGINE_LABEL } from "../../harness/lib.mjs";
import { unselectedIdx, hoverLight, HOVER_DE } from "../../harness/measure.mjs";

await cli("HOVER-PROBE", async (args, target) => {
  const scenes = String(args.scenes ?? "f1").split(",");
  const cells = [];
  for (const engine of ["chromium", "webkit"]) for (const scene of scenes) for (const mode of ["light", "prt"]) {
    const P = await openPage(target, engine, scene, { mode });
    const u = await unselectedIdx(P);
    const h = await hoverLight(P, u);
    await P.close();
    cells.push({ gating: false, pass: h.pass, scene, arm: /-migrated$/.test(scene) ? "migrated" : "library",
      line: `${ENGINE_LABEL[engine]} ${scene} ${P.modeLabel} #${u} · H3 mean ΔE(OKLab) ${h.de.toFixed(4)} vs ${HOVER_DE} → ${h.pass ? "clears" : "under"} · H2 ${h.changedPct.toFixed(2)} % of pixels > 10 levels (${h.changedPct >= 2 ? "cleared" : "under"} H2's 2 %)` });
  }
  return { id: "HOVER-PROBE", title: "H3-5 hover light, ΔE beside H2's count, both engines", engine: "both", engineLabel: `${await engineVersion("chromium")} + ${await engineVersion("webkit")}`, target: target.label, dev: target.meta.dev, cells };
});

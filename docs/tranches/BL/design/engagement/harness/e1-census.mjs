#!/usr/bin/env node
// E-1 · the census over a declared denominator (W-J.2 §3.2 item 1; H-6: a declaration plus a runtime result, never
// a byte detector). It reads what the BUILT page carries, not source text:
//   window.__e.dirs  the component directories (build.mjs lists <worktree>/src/components, `_shared` excluded)
//   window.__e.decl  the register's declaration, imported from the built library by name (build.mjs --decl;
//                    default composables/motion#ENGAGE_DECLARATION). Contract (HARNESS.md §2 E-1):
//                    { members: { <dir>: <class> }, classes: { <class>: { rung: <ENGAGE_LADDER rung> | null,
//                      reason?: string, exemplar?: <dir> } } }. A route whose own shape differs adapts it at its
//                    export; the harness reads one shape
//   window.__e.rungs the ENGAGE_LADDER rung names, from the built library
// Cells (gating):
//   declaration present         the export exists and has the shape
//   denominator declared        every directory is a key of members, exactly once (the object form makes "once" structural)
//   no stray member             every member key is a directory, every member's class is a declared class
//   class carries a rung        every class names a ladder rung, or names none with a non-empty reason (a static class)
//   runtime <class> (<dir>)     for every class with a rung: its exemplar directory has a harness scene, and on it a
//                               press (pointer down 250 ms; 450 ms for the engaged rung) moves the target's scale
//                               ≥ 0.01 or changes a paint property hover alone does not change
// Light only; fine pointer (E-5 owns the coarse press, E-9 the PRM arm).
//   node e1-census.mjs --build <dir> | --fixture [--fault e1-undeclared] [--engine webkit]
import { witness, openPage, center, paintDiff, f } from "./lib.mjs";

await witness("E-1", "the census over a declared denominator", async ({ E, T, cell, guard }) => {
  const P = await openPage(E, T, "__index");
  const R = await P.page.evaluate(() => ({ dirs: window.__e.dirs ?? null, decl: window.__e.decl ?? null, rungs: window.__e.rungs ?? [], sceneOfDir: window.__e.sceneOfDir ?? {} }));
  await P.close();
  const d = R.decl;
  const shaped = d && typeof d === "object" && d.members && typeof d.members === "object" && d.classes && typeof d.classes === "object";
  cell("E-1 declaration present", shaped ? "PASS" : "FAIL", shaped ? `${Object.keys(d.members).length} members, ${Object.keys(d.classes).length} classes (${Object.keys(d.classes).join(", ")})` : `no declaration in the build (${d === null ? "the export does not exist" : "wrong shape"}); ${R.dirs?.length ?? "?"} directories to declare`);
  if (!shaped) {
    cell("E-1 denominator declared", "FAIL", `0 of ${R.dirs?.length ?? "?"} directories declared: ${(R.dirs ?? []).join(" ")}`);
    cell("E-1 class carries a rung", "FAIL", "no classes declared");
    return;
  }
  const missing = R.dirs.filter((x) => !(x in d.members));
  cell("E-1 denominator declared", missing.length ? "FAIL" : "PASS", `${R.dirs.length - missing.length} of ${R.dirs.length} directories declared${missing.length ? `; undeclared: ${missing.join(" ")}` : ""}`);
  const stray = Object.entries(d.members).filter(([k, c]) => !R.dirs.includes(k) || !(c in d.classes)).map(([k, c]) => `${k}→${c}`);
  cell("E-1 no stray member", stray.length ? "FAIL" : "PASS", stray.length ? `members naming no directory or no class: ${stray.join(", ")}` : "every member is a directory of a declared class");
  const bad = Object.entries(d.classes).filter(([, c]) => (c.rung == null ? !(typeof c.reason === "string" && c.reason.trim()) : !R.rungs.includes(c.rung))).map(([k, c]) => `${k} (rung ${c.rung ?? "none"}${c.rung == null ? ", no reason" : ", not a ladder rung"})`);
  const counts = Object.keys(d.classes).map((k) => `${k} ${Object.values(d.members).filter((c) => c === k).length}`).join(", ");
  cell("E-1 class carries a rung", bad.length ? "FAIL" : "PASS", `${bad.length ? `failing: ${bad.join("; ")} · ` : ""}members per class: ${counts} · ladder rungs ${R.rungs.join("/")}`);
  for (const [k, c] of Object.entries(d.classes)) {
    if (c.rung == null) continue;
    const ex = c.exemplar; const sc = ex ? R.sceneOfDir[ex] : null;
    if (!sc) { cell(`E-1 runtime ${k} (${ex ?? "no exemplar"})`, "FAIL", `no harness scene exemplifies ${ex ?? "the class (no exemplar named)"} (H-2: add one to the scene app)`); continue; }
    const r = await guard(`runtime ${k}`, async () => {
      const Q = await openPage(E, T, sc);
      try {
        const at = (await Q.page.$('[data-e~="thumb"]')) ? '[data-e~="thumb"]' : '[data-e~="target"]';
        const snap = () => Q.page.evaluate(() => ({ p: window.__paint('[data-e~="target"]'), s: window.__eff(document.querySelector('[data-e~="target"]')).s }));
        const p0 = await snap(); const cc = await center(Q.page, at);
        await Q.page.mouse.move(cc.x, cc.y); await Q.page.waitForTimeout(300); const h = await snap();
        await Q.page.mouse.down(); await Q.page.waitForTimeout(c.rung === "engaged" ? 450 : 250); const p = await snap(); await Q.page.mouse.up();
        return { hov: paintDiff(p0.p, h.p), press: paintDiff(h.p, p.p), ds: p.s - h.s };
      } finally { await Q.close(); }
    });
    if (r.crashed) { cell(`E-1 runtime ${k} (${ex})`, "FAIL", r.line); continue; }
    const pass = Math.abs(r.ds) >= 0.01 || r.press.length > 0;
    cell(`E-1 runtime ${k} (${ex})`, pass ? "PASS" : "FAIL", `scene ${sc}, rung ${c.rung}: Δscale ${f(r.ds)} · press-only paint [${r.press.join(", ").slice(0, 160)}] (bound |Δscale| ≥ 0.01 or ≥ 1 property)`);
  }
});

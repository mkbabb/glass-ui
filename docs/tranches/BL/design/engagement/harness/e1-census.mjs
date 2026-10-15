#!/usr/bin/env node
// E-1 · CK-01: the census reads adoption (W-J.2 §3.2 item 1; H-6: a declaration plus a runtime result, never a byte
// detector; pass 2 restates it: a census green over work not done is the failure pass 1 found, C-A r24, r26, C-B r26).
// It reads what the BUILT page carries, not source text:
//   window.__e.dirs     the component directories (build.mjs lists <worktree>/src/components, `_shared` excluded)
//   window.__e.decl     the register's declaration, imported from the built library by name (build.mjs --decl;
//                       default composables/motion#ENGAGE_DECLARATION). Contract (HARNESS.md §2 E-1):
//                       { members: { <dir>: <class> }, classes: { <class>: { rung: <ENGAGE_LADDER rung> | null,
//                         reason?: string, exemplar?: <dir> } }, modes?: { <dir>: [<class>, …] } }
//   window.__e.rungs    the ENGAGE_LADDER rung names, from the built library
//   window.__e.members  the rendered member instances of a scene (lib.mjs __census: the scene app walks its component
//                       tree and attributes every element to the innermost component a directory exports)
// Cells (gating):
//   declaration present       the export exists and has the shape
//   denominator declared      every directory is a key of members, exactly once
//   no stray member           every member key is a directory, every member's class is a declared class
//   class carries a rung      every class names a ladder rung, or names none with a non-empty reason (a static class)
//   adoption <dir>            CK-01, every directory rendered in ANY scene (C-A's drift-all.mjs generalized from 13 rows
//                             to every scene's every member): in each instance, the classes its own elements compute
//                             as `--rung-class` are non-empty and all among the member's declared classes (members[dir],
//                             or modes[dir])
//   single                    no element anywhere composes more than one engage-* class (a computed read sees only
//                             the later utility)
//   static-inert <dir>        a static member's root is not focusable, has no interactive role and no handler, and no
//                             element stamping `static` is live (Card.vue:66-67's role="option" tabindex="0")
//   adoption latch            RED until every declared member is SEEN adopting its recipe in some scene: a member no
//                             scene renders is unproven, not green (the unit census's latch, read at runtime)
//   runtime <class> (<dir>)   per class with a rung, on its exemplar's scene, by the rung's own input (CK-19):
//                               press, engaged, modal  pointer down 250 ms (450 ms engaged): |Δscale| ≥ 0.01 or a
//                                                      paint property hover alone does not change
//                               hover                  the pointer over the target: ≥ 1 paint property changes
//                               rest (ambient)         the pointer moved across the target: the pixels change by
//                                                      ≥ 0.5 levels mean and ≥ 2× the drift of the same interval at rest
//                             An absent target FAILS the cell ("no target"); the witness never throws on it
//   runtime … PRM press-light H-9: the same probe under reduced motion still changes paint (the rung's light leg)
// Light only; fine pointer (E-5 owns the coarse press).
//   node e1-census.mjs --build <dir> | --fixture [--fault e1-undeclared] [--engine webkit]
import { witness, openPage, center, paintDiff, f } from "./lib.mjs";

const MOVE_MIN = 0.5;
await witness("E-1", "CK-01 the census reads adoption", async ({ E, T, cell, guard, idx }) => {
  const P = await openPage(E, T, "__index");
  const R = await P.page.evaluate(() => ({ dirs: window.__e.dirs ?? null, decl: window.__e.decl ?? null, rungs: window.__e.rungs ?? [], sceneOfDir: window.__e.sceneOfDir ?? {} }));
  await P.close();
  const d = R.decl;
  const shaped = d && typeof d === "object" && d.members && typeof d.members === "object" && d.classes && typeof d.classes === "object";
  cell("E-1 declaration present", shaped ? "PASS" : "FAIL", shaped ? `${Object.keys(d.members).length} members, ${Object.keys(d.classes).length} classes (${Object.keys(d.classes).join(", ")})` : `no declaration in the build (${d === null ? "the export does not exist" : "wrong shape"}); ${R.dirs?.length ?? "?"} directories to declare`);
  if (!shaped) {
    cell("E-1 denominator declared", "FAIL", `0 of ${R.dirs?.length ?? "?"} directories declared: ${(R.dirs ?? []).join(" ")}`);
    cell("E-1 class carries a rung", "FAIL", "no classes declared");
    cell("E-1 adoption latch", "FAIL", "no declaration: no member can be seen adopting");
    return;
  }
  const missing = R.dirs.filter((x) => !(x in d.members));
  cell("E-1 denominator declared", missing.length ? "FAIL" : "PASS", `${R.dirs.length - missing.length} of ${R.dirs.length} directories declared${missing.length ? `; undeclared: ${missing.join(" ")}` : ""}`);
  const stray = Object.entries(d.members).filter(([k, c]) => !R.dirs.includes(k) || !(c in d.classes)).map(([k, c]) => `${k}→${c}`);
  cell("E-1 no stray member", stray.length ? "FAIL" : "PASS", stray.length ? `members naming no directory or no class: ${stray.join(", ")}` : "every member is a directory of a declared class");
  const bad = Object.entries(d.classes).filter(([, c]) => (c.rung == null ? !(typeof c.reason === "string" && c.reason.trim()) : !R.rungs.includes(c.rung))).map(([k, c]) => `${k} (rung ${c.rung ?? "none"}${c.rung == null ? ", no reason" : ", not a ladder rung"})`);
  const counts = Object.keys(d.classes).map((k) => `${k} ${Object.values(d.members).filter((c) => c === k).length}`).join(", ");
  cell("E-1 class carries a rung", bad.length ? "FAIL" : "PASS", `${bad.length ? `failing: ${bad.join("; ")} · ` : ""}members per class: ${counts} · ladder rungs ${R.rungs.join("/")}`);

  // ── CK-01 adoption: every member instance rendered in any scene ──
  const allowed = (dir) => d.modes?.[dir] ?? (d.members[dir] ? [d.members[dir]] : []);
  const seen = {}; const multi = []; const statics = {}; let unread = [];
  for (const sc of Object.keys(idx)) {
    const r = await guard(`census ${sc}`, async () => {
      const Q = await openPage(E, T, sc);
      try { await Q.page.waitForTimeout(200); return { c: await Q.page.evaluate(() => window.__census()) }; } finally { await Q.close(); }
    }, 60000);
    if (r.crashed || !r.c) { unread.push(`${sc}${r.crashed ? ` (${r.line.slice(0, 80)})` : " (no members())"}`); continue; }
    for (const g of r.c.groups) {
      (seen[g.dir] ??= []).push({ sc, ...g });
      if (allowed(g.dir).length && allowed(g.dir).every((c) => c === "static") || g.classes.includes("static")) {
        const live = [...(allowed(g.dir).every((c) => c === "static") && g.rootLive.length ? [`root ${g.root} (${g.rootLive.join(", ")})`] : []), ...g.statics];
        (statics[g.dir] ??= []).push(...live.map((x) => `${sc}: ${x}`));
      }
    }
    multi.push(...r.c.multi.map((x) => `${sc}: ${x}`));
  }
  if (unread.length) cell("E-1 census scenes read", "FAIL", `scenes whose members could not be read: ${unread.join("; ")}`);
  const adopted = new Set();
  for (const dir of Object.keys(seen).sort()) {
    const al = allowed(dir); const inst = seen[dir];
    const bad = inst.filter((g) => !g.classes.length || !g.classes.every((c) => al.includes(c)));
    if (!al.length) { cell(`E-1 adoption ${dir}`, "FAIL", `rendered in ${inst.length} instance(s) (${[...new Set(inst.map((g) => g.sc))].join(", ")}) but undeclared`); continue; }
    if (!bad.length) adopted.add(dir);
    const show = (g) => `${g.sc}: ${g.root} computes [${g.classes.join(", ") || "unclassed"}]${g.stamped.length ? ` (${g.stamped.slice(0, 2).join("; ")})` : ""}`;
    cell(`E-1 adoption ${dir}`, bad.length ? "FAIL" : "PASS", `declared ${al.join("|")} · ${inst.length} instance(s) in ${[...new Set(inst.map((g) => g.sc))].length} scene(s) · ${bad.length ? `NOT ADOPTED: ${bad.slice(0, 4).map(show).join(" · ")}` : show(inst[0])}`.slice(0, 600));
  }
  cell("E-1 single", multi.length ? "FAIL" : "PASS", multi.length ? `elements composing more than one engage-* class: ${[...new Set(multi)].slice(0, 6).join(" · ")}` : `no element composes more than one engage-* class (${Object.keys(idx).length} scenes)`);
  for (const dir of Object.keys(d.members).filter((k) => allowed(k).includes("static")).sort()) {
    if (!seen[dir]) continue;
    const live = statics[dir] ?? [];
    cell(`E-1 static-inert ${dir}`, live.length ? "FAIL" : "PASS", live.length ? `live static elements: ${[...new Set(live)].slice(0, 4).join(" · ")}` : `${seen[dir].length} instance(s): the root is not focusable, has no interactive role and no handler`);
  }
  const unproven = Object.keys(d.members).filter((k) => !adopted.has(k)).sort();
  cell("E-1 adoption latch", unproven.length ? "FAIL" : "PASS", `${Object.keys(d.members).length - unproven.length} of ${Object.keys(d.members).length} declared members seen adopting their recipe${unproven.length ? `; unproven (not rendered by any scene, or not adopted): ${unproven.join(" ")}` : ""}`);

  // ── the runtime probe per class, by its rung's input (CK-19) ──
  for (const [k, c] of Object.entries(d.classes)) {
    if (c.rung == null) continue;
    const ex = c.exemplar; const sc = ex ? R.sceneOfDir[ex] : null;
    if (!sc) { cell(`E-1 runtime ${k} (${ex ?? "no exemplar"})`, "FAIL", `no harness scene exemplifies ${ex ?? "the class (no exemplar named)"} (CK-19: add one to the scene app)`); continue; }
    const kind = c.rung === "rest" ? "move" : c.rung === "hover" ? "hover" : "press";
    const probe = (prm) => guard(`runtime ${k}${prm ? " PRM" : ""}`, async () => {
      const Q = await openPage(E, T, sc, { prm });
      try {
        if (prm && !Q.modeOk) return { mode: Q.modeLine };
        if (!(await Q.page.$('[data-e~="target"]'))) return { absent: true };
        const at = (await Q.page.$('[data-e~="thumb"]')) ? '[data-e~="thumb"]' : '[data-e~="target"]';
        // null when the target is gone: an exemplar whose target leaves mid-probe FAILs its cell, it never throws (CK-01)
        const snap = () => Q.page.evaluate(() => { const t = document.querySelector('[data-e~="target"]'); return t ? { p: window.__paint('[data-e~="target"]'), s: window.__eff(t).s } : null; });
        const cc = await center(Q.page, at);
        if (kind === "move") {
          const bx = cc.bx; const clip = { x: Math.max(0, bx.x), y: Math.max(0, bx.y), width: Math.max(1, bx.width), height: Math.max(1, bx.height) };
          await Q.page.mouse.move(bx.x + bx.width * 0.2, bx.y + bx.height * 0.3); await Q.page.waitForTimeout(250);
          const A = await Q.page.screenshot({ clip }); await Q.page.waitForTimeout(300); const B = await Q.page.screenshot({ clip });
          for (let i = 1; i <= 6; i++) { await Q.page.mouse.move(bx.x + bx.width * (0.2 + 0.1 * i), bx.y + bx.height * (0.3 + 0.07 * i)); await Q.page.waitForTimeout(25); }
          await Q.page.waitForTimeout(150); const C = await Q.page.screenshot({ clip });
          const diff = await Q.page.evaluate(async (bufs) => {
            const img = async (b64) => { const i = new Image(); i.src = `data:image/png;base64,${b64}`; await i.decode(); const cv = document.createElement("canvas"); cv.width = i.width; cv.height = i.height; const x = cv.getContext("2d"); x.drawImage(i, 0, 0); return x.getImageData(0, 0, i.width, i.height).data; };
            const [a, b, c] = await Promise.all(bufs.map(img)); const md = (p, q) => { let s = 0; for (let j = 0; j < p.length; j++) if (j % 4 !== 3) s += Math.abs(p[j] - q[j]); return s / (p.length * 0.75); };
            return { drift: md(a, b), move: md(b, c) };
          }, [A, B, C].map((x) => x.toString("base64")));
          return { kind, ...diff };
        }
        const p0 = await snap(); if (!p0) return { absent: true, when: "at rest" };
        await Q.page.mouse.move(cc.x, cc.y); await Q.page.waitForTimeout(300); const h = await snap();
        if (!h) return { absent: true, when: "under hover" };
        if (kind === "hover") return { kind, hov: paintDiff(p0.p, h.p), ds: h.s - p0.s };
        await Q.page.mouse.down(); await Q.page.waitForTimeout(c.rung === "engaged" ? 450 : 250); const p = await snap(); await Q.page.mouse.up();
        if (!p) return { absent: true, when: "while pressed" };
        return { kind, hov: paintDiff(p0.p, h.p), press: paintDiff(h.p, p.p), ds: p.s - h.s };
      } finally { await Q.close(); }
    });
    const judge = (r) => (r.kind === "move" ? r.move >= MOVE_MIN && r.move >= 2 * r.drift : r.kind === "hover" ? r.hov.length > 0 || Math.abs(r.ds) >= 0.01 : Math.abs(r.ds) >= 0.01 || r.press.length > 0);
    const judgeLight = (r) => (r.kind === "move" ? judge(r) : r.kind === "hover" ? r.hov.length > 0 : r.press.length > 0);
    const say = (r) => (r.kind === "move" ? `pointer moved across: mean pixel change ${f(r.move, 2)} levels against ${f(r.drift, 2)} at rest over the same interval (bound ≥ ${MOVE_MIN} and ≥ 2× drift)` : r.kind === "hover" ? `hover: Δscale ${f(r.ds)} · paint [${r.hov.join(", ").slice(0, 160)}] (bound ≥ 1 property or |Δscale| ≥ 0.01)` : `press: Δscale ${f(r.ds)} · press-only paint [${r.press.join(", ").slice(0, 160)}] (bound |Δscale| ≥ 0.01 or ≥ 1 property)`);
    const r = await probe(false);
    const nm = `E-1 runtime ${k} (${ex})`;
    if (r.crashed) cell(nm, "FAIL", r.line);
    else if (r.absent) cell(nm, "FAIL", `scene ${sc}, rung ${c.rung}: no target ([data-e~="target"] absent${r.when ? ` ${r.when}` : ""}): the exemplar renders nothing to probe`);
    else cell(nm, judge(r) ? "PASS" : "FAIL", `scene ${sc}, rung ${c.rung} · ${say(r)}`);
    // H-9: under reduced motion the class's rung keeps its light leg (its spatial leg is E-9's to retire)
    const q = await probe(true);
    if (q.crashed || q.mode) cell(`${nm} PRM press-light`, "FAIL", q.line ?? `MODE NOT APPLIED ${q.mode}`);
    else if (q.absent) cell(`${nm} PRM press-light`, "FAIL", `scene ${sc}: no target${q.when ? ` ${q.when}` : ""}`);
    else cell(`${nm} PRM press-light`, judgeLight(q) ? "PASS" : "FAIL", `scene ${sc}, reduce · ${say(q)}`);
  }
});

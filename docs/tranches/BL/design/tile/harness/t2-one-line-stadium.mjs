#!/usr/bin/env node
// T-2 · A one-line item stays a stadium: every item of a gating scene is at its rung (±0.5 px) and uses a corner
// of exactly half its height (±0.5 px). H-2: a gated item that has left its rung FAILS ("left its rung"); it is
// never skipped, so a library that turns a pill into a cell cannot pass by making the pill taller.
// H3-3 · the one-row law inside a held pill (HF-5): per gating scene, item 0 takes one second row in three cases, each
// on its own fresh page: a <br> inside its label, a block child (a `div`) inside its label, a `div` of consumer
// content (`data-ink`) appended to the item beside its label. Each read is framed and settled; it FAILS when content
// is CUT (past the plate or a clipping box inside it) or STACKED (two rows by the midpoint test) and unnamed (no console error or page error after the
// mutation). The three are pass 2's CX-1 class: F's `<br>` and block child inside a label (`Fc` CX-1) and D′'s
// appended row (`D′c` CX-1). A stacked pill that is named passes: the name is the Q-5 signal. H3-6 · the mutations land after mount
// (≥ 1 s after the scene reported ready), so a guard that reads only at mount does not name them.
// H4-2 · two late cells (REGISTRY §P3-6.2; pass 3's FV-2 residue, `Fc` §2.1): a `span` inside the label that sets its
// own `display: block`, once by inline style and once by a utility class. The utility is written the way Tailwind v4
// writes it, `@layer utilities { .block { display: block } }`, appended to the page so it joins the page's own
// `utilities` layer where one exists. H3-3's block case is a UA `div`, which a zero-specificity one-row law makes
// inline; a child that sets its own display outranks such a law, and these two cells read that. Each line prints the
// added child's computed display, so the reader sees whether the law or the child won.
//   node t2-one-line-stadium.mjs --build <dir> | --fixture [--fault t2] [--engine chromium|webkit]
import { cli, openPage, sceneList, scenesFor, engineVersion, engineOf, f2 } from "./lib.mjs";
import { tagItems } from "./measure.mjs";

export const ROW_CASES = [
  ["<br> inside the label", "br"],
  ["a block child (div) inside the label", "block"],
  ["a div appended to the item, beside the label", "div"],
  ["a span inside the label that sets its own display: block by inline style", "inline"], // H4-2
  ["a span inside the label that sets its own display: block by a utility class (@layer utilities)", "utility"], // H4-2
];
const UTILITY_CSS = "@layer utilities { .block { display: block; } }";
const LATE_MS = 400; // on top of openPage's settle (700 ms after ready): the mutation lands ≥ 1.1 s after mount
export async function oneRowCells(target, engine, sc) {
  const cells = [];
  // each case on its own fresh page, on item 0: a stretched grid row would otherwise carry one case's height into the next
  for (let k = 0; k < ROW_CASES.length; k++) {
    const [what, kind] = ROW_CASES[k];
    const P = await openPage(target, engine, sc.id);
    await tagItems(P);
    await P.page.waitForTimeout(LATE_MS);
    const before = P.logs.filter((l) => l.type === "error" || l.type === "pageerror").length;
    const r = await P.page.evaluate(async ({ i, kind, utility }) => {
      const th = window.__th, el = document.querySelector(`[data-th-idx="${i}"]`);
      const label = el.querySelector("[data-line-slot]") ?? [...el.querySelectorAll("span")].find((e) => e.textContent.trim() && !e.children.length) ?? el;
      const rung = parseFloat(getComputedStyle(el).minBlockSize) || 0;
      const add = (tag) => { const x = document.createElement(tag); x.setAttribute("data-th-added", ""); x.textContent = "1"; return x; };
      if (kind === "br") { const b = document.createElement("br"); b.setAttribute("data-th-added", ""); label.append(b, add("span")); }
      else if (kind === "block") label.append(add("div")); // a UA block inside the label (F's CX-1)
      else if (kind === "inline") { const x = add("span"); x.style.display = "block"; label.append(x); } // H4-2: inline style
      else if (kind === "utility") { // H4-2: a utility class, in the utilities layer as Tailwind v4 writes it
        const st = document.createElement("style"); st.setAttribute("data-th-added", ""); st.textContent = utility; document.head.append(st);
        const x = add("span"); x.className = "block"; label.append(x);
      }
      else { const d = add("div"); d.setAttribute("data-ink", ""); el.append(d); } // consumer content beside the label (D′'s CX-1)
      await th.frame(); await new Promise((res) => setTimeout(res, 600)); await th.frame();
      const box = el.getBoundingClientRect();
      const child = kind === "inline" || kind === "utility" ? label.querySelector("span[data-th-added]") : null;
      return { rows: th.rows(el), cut: th.cut(el), h: box.height, rung, self: child ? getComputedStyle(child).display : null };
    }, { i: 0, kind, utility: UTILITY_CSS });
    await P.close();
    const named = P.logs.filter((l) => l.type === "error" || l.type === "pageerror").slice(before);
    const stacked = r.rows > 1, cut = r.cut.n > 0;
    const pass = !cut && (!stacked || named.length > 0);
    const verdict = [cut ? `CUT: ${r.cut.n} content box(es) past the plate, up to ${f2(r.cut.worst)} px` : "nothing cut",
      stacked ? (named.length ? `stacked (${r.rows} rows) and named: «${named[0].text.slice(0, 90)}»` : `STACKED: ${r.rows} rows, unnamed`) : "one row"].join("; ");
    cells.push({ gating: sc.gating, pass, scene: sc.id, arm: sc.arm,
      line: `${sc.id} #0 one-row law · ${what}, after mount · ${f2(r.h)} px at rung ${f2(r.rung)}${r.self ? ` · the child computes display: ${r.self}` : ""} · ${verdict}` });
  }
  return cells;
}

if (import.meta.url === `file://${process.argv[1]}`) {
  await cli("T-2", async (args, target) => {
    const engine = engineOf(args);
    const cells = [];
    for (const sc of scenesFor(await sceneList(target, engine), "T-2")) {
      const P = await openPage(target, engine, sc.id);
      await tagItems(P);
      const rows = await P.page.evaluate(() => window.__th.items().map((el) => {
        const th = window.__th, c = th.corner(el), minB = parseFloat(getComputedStyle(el).minBlockSize) || 0;
        return { w: c.w, h: c.h, used: c.used, computed: c.computed, rung: minB > 0 ? minB : th.rung(el), rows: th.rows(el) };
      }));
      rows.forEach((r, i) => {
        const atRung = r.h <= r.rung + 0.5;
        const stadium = Math.abs(r.used - r.h / 2) <= 0.5;
        cells.push({ gating: sc.gating, pass: atRung && stadium, scene: sc.id, arm: sc.arm,
          line: `${sc.id} #${i} ${f2(r.w)}×${f2(r.h)} rung ${f2(r.rung)} ${r.computed}→${f2(r.used)} (÷h/2 ${f2(r.used / (r.h / 2))}), ${r.rows} row(s)${atRung ? "" : ` · left its rung (${f2(r.h / r.rung)} rungs)`}` });
      });
      await P.close();
      cells.push(...(await oneRowCells(target, engine, sc)));
    }
    return { id: "T-2", title: "a one-line item stays a stadium, and a gated pill never leaves its rung", engine, engineLabel: await engineVersion(engine), target: target.label, dev: target.meta.dev, cells };
  });
}

#!/usr/bin/env node
// E-7 · one writer of `data-engaged`, and it means held (W-J.2 §3.2 item 2, G2).
//   writers (static)  the source files of <worktree>/src that WRITE the attribute, comments stripped: a `.vue`
//                     template attribute (bare or bound), or a script `dataset.engaged` / `setAttribute`,
//                     `toggleAttribute` or `removeAttribute("data-engaged")`. CSS readers and `<style>` blocks are not
//                     writers. PASS when there is at most one, and it lives in the register's owner,
//                     src/composables/motion/engage/. (G2's own command counts `.vue` files only; this reads `.ts` too,
//                     so a second writer cannot hide in a composable.) The worktree is --wt, or the build's
//                     source; under --fixture it is fixtures/e7/clean, or fixtures/e7/two-writers for the fault e7-two.
//   modal (runtime)   a modal open with nothing held ([data-e=modal] present): 0 [data-engaged] nodes. The veil
//                     keys on the overlay's own open state.
//   held (runtime)    the slider pointer-held 450 ms: ≥ 1 [data-engaged] node (the held meaning survives the split).
//   held PRM          H-9: the same under reduced motion. Held is a state, not a motion: reduce does not retire it.
// Light only: the reads are attributes, not paint.
//   node e7-one-writer.mjs --build <dir> --wt <worktree> | --fixture [--fault e7-veil|e7-two] [--engine webkit]
import fs from "node:fs";
import path from "node:path";
import { witness, openPage, scenesFor, center, HERE } from "./lib.mjs";

const OWNER = "src/composables/motion/engage/";
export function writers(wt) {
  const out = [];
  const walk = (d) => { for (const e of fs.readdirSync(d)) { const p = path.join(d, e); const st = fs.statSync(p); if (st.isDirectory()) walk(p); else if (/\.(vue|ts|tsx|js|mjs)$/.test(e)) out.push(p); } };
  walk(path.join(wt, "src"));
  const found = [];
  for (const p of out) {
    let t = fs.readFileSync(p, "utf8");
    let hit = false;
    if (p.endsWith(".vue")) {
      const s = t.indexOf("<template"), z = t.lastIndexOf("</template>");
      const tpl = s >= 0 && z > s ? t.slice(s, z).replace(/<!--[\s\S]*?-->/g, "") : "";
      if (/[\s:]data-engaged(?=[\s=/>])/.test(tpl)) hit = true;
      t = t.replace(/<template[\s\S]*<\/template>/, "").replace(/<style[\s\S]*?<\/style>/g, "");
    }
    const code = t.replace(/\/\*[\s\S]*?\*\//g, "").replace(/(^|[^:"'`\\])\/\/.*$/gm, "$1");
    if (/dataset\.engaged\b|dataset\[\s*["']engaged["']\s*\]|(?:set|toggle|remove)Attribute\(\s*["']data-engaged["']/.test(code)) hit = true;
    if (hit) found.push(path.relative(wt, p));
  }
  return found;
}

await witness("E-7", "one writer of data-engaged, meaning held", async ({ a, E, T, cell, guard, idx }) => {
  const wt = a.fixture ? path.join(HERE, "fixtures", "e7", a.fault === "e7-two" ? "two-writers" : "clean") : typeof a.wt === "string" ? path.resolve(a.wt) : null;
  if (!wt) cell("E-7 writers (static)", "UNMEASURED", "no --wt given: the static arm reads a source tree");
  else {
    const W = writers(wt);
    const ok = W.length <= 1 && W.every((p) => p.startsWith(OWNER));
    cell("E-7 writers (static)", ok ? "PASS" : "FAIL", `${W.length} writer file(s): ${W.join(", ") || "none"} · bound ≤ 1, under ${OWNER} · tree ${a.fixture ? path.relative(HERE, wt) : wt}`);
  }
  for (const [sc] of scenesFor(idx, "E-7")) {
    if (sc === "modal") {
      const r = await guard("modal", async () => {
        const P = await openPage(E, T, sc);
        try { await P.page.waitForTimeout(400); return await P.page.evaluate(() => ({ open: !!document.querySelector('[data-e~="modal"]'), veil: document.querySelectorAll('[data-e~="veil"]').length, eng: [...document.querySelectorAll("[data-engaged]")].map((e) => e.className || e.tagName) })); } finally { await P.close(); }
      });
      if (r.crashed) { cell("E-7 modal open, nothing held", "FAIL", r.line); continue; }
      cell("E-7 modal open, nothing held", r.open && r.eng.length === 0 ? "PASS" : "FAIL", `dialog open ${r.open} · veil nodes ${r.veil} · [data-engaged] nodes ${r.eng.length}${r.eng.length ? ` (${r.eng.join(" | ").slice(0, 120)})` : ""} · bound 0`);
    } else {
      for (const prm of [false, true]) {
        const nm = `E-7 ${sc} held${prm ? " PRM" : ""}`;
        const r = await guard(nm, async () => {
          const P = await openPage(E, T, sc, { prm });
          try {
            if (prm && !P.modeOk) return { mode: P.modeLine };
            const c = await center(P.page, '[data-e~="thumb"]'); await P.page.mouse.move(c.x, c.y); await P.page.mouse.down(); await P.page.waitForTimeout(450);
            const n = await P.page.evaluate(() => document.querySelectorAll("[data-engaged]").length); await P.page.mouse.up(); return { n };
          } finally { await P.close(); }
        });
        if (r.crashed || r.mode) { cell(nm, "FAIL", r.line ?? `MODE NOT APPLIED ${r.mode}`); continue; }
        cell(nm, r.n >= 1 ? "PASS" : "FAIL", `${prm ? "reduce · " : ""}[data-engaged] nodes while pointer-held ${r.n} · bound ≥ 1`);
      }
    }
  }
});

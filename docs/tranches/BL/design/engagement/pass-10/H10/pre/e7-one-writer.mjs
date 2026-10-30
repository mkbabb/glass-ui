#!/usr/bin/env node
// E-7 · CK-08: one writer per engagement attribute (W-J.2 §3.2 item 2, G2; pass 2 restates it per attribute).
//   writers <attr> (static)  per attribute (data-engaged, data-held, data-press, data-commit), the source files of
//                     <worktree>/src that WRITE it, comments stripped: a `.vue` template attribute (bare or bound),
//                     a script assignment `dataset.<name> =` / `dataset["<name>"] =` / `delete …dataset.<name>`, a
//                     `setAttribute`, `toggleAttribute` or `removeAttribute("data-<name>")`, and (X-6) an object key
//                     `"data-<name>":` (the bag a `v-bind="obj"` spread or a render function writes through). Reads are
//                     not writes: a selector string, `dataset.held !== undefined`, a `<style>` block. PASS when there
//                     is at most one writer file, under src/composables/motion/engage/. A route whose charter names an
//                     attribute it does not own passes `--unowned data-press,…`: that attribute's cell prints REPORT.
//                     The worktree is --wt; under --fixture it is fixtures/e7/clean, or the tree a fault names.
//   modal (runtime)   a modal open with nothing held ([data-e=modal] present): 0 [data-engaged] nodes. The veil
//                     keys on the overlay's own open state.
//   held (runtime)    the slider pointer-held 450 ms: ≥ 1 [data-engaged] node (the held meaning survives the split).
//   held PRM          H-9: the same under reduced motion. Held is a state, not a motion: reduce does not retire it.
// Light only: the reads are attributes, not paint.
//   node e7-one-writer.mjs --build <dir> --wt <worktree> [--unowned data-press] | --fixture [--fault e7-veil|e7-two|e7-spread|e7-held] [--engine webkit]
import fs from "node:fs";
import path from "node:path";
import { witness, openPage, scenesFor, center, HERE } from "./lib.mjs";

const OWNER = "src/composables/motion/engage/";
export const ATTRS = ["engaged", "held", "press", "commit"];
const TREES = { "e7-two": "two-writers", "e7-spread": "spread", "e7-held": "held-two" };
/** { attr: [files that write data-<attr>] } over <wt>/src */
export function writers(wt) {
  const files = [];
  const walk = (d) => { for (const e of fs.readdirSync(d)) { const p = path.join(d, e); const st = fs.statSync(p); if (st.isDirectory()) walk(p); else if (/\.(vue|ts|tsx|js|mjs)$/.test(e)) files.push(p); } };
  walk(path.join(wt, "src"));
  const found = Object.fromEntries(ATTRS.map((x) => [x, []]));
  for (const p of files) {
    let t = fs.readFileSync(p, "utf8"); let tpl = "";
    if (p.endsWith(".vue")) {
      const s = t.indexOf("<template"), z = t.lastIndexOf("</template>");
      tpl = s >= 0 && z > s ? t.slice(s, z).replace(/<!--[\s\S]*?-->/g, "") : "";
      t = t.replace(/<template[\s\S]*<\/template>/, "").replace(/<style[\s\S]*?<\/style>/g, "");
    }
    const code = t.replace(/\/\*[\s\S]*?\*\//g, "").replace(/(^|[^:"'`\\])\/\/.*$/gm, "$1");
    for (const x of ATTRS) {
      const A = `data-${x}`;
      const hit = new RegExp(`(^|[\\s:])(v-bind:)?${A}(?=[\\s=/>])`).test(tpl)
        || new RegExp(`dataset\\.${x}\\s*=(?!=)|delete\\s+[\\w$.?]*dataset\\.${x}\\b|dataset\\[\\s*["'\`]${x}["'\`]\\s*\\]\\s*=(?!=)|(?:set|toggle|remove)Attribute\\(\\s*["'\`]${A}["'\`]|["'\`]${A}["'\`]\\s*:`).test(code + "\n" + tpl.match(/v-bind="[^"]*\{[^"]*\}"/g)?.join("\n"));
      if (hit) found[x].push(path.relative(wt, p));
    }
  }
  return found;
}

await witness("E-7", "one writer of data-engaged, meaning held", async ({ a, E, T, cell, guard, idx }) => {
  const wt = a.fixture ? path.join(HERE, "fixtures", "e7", TREES[a.fault] ?? "clean") : typeof a.wt === "string" ? path.resolve(a.wt) : null;
  const unowned = new Set(typeof a.unowned === "string" ? a.unowned.split(",") : []);
  if (!wt) for (const x of ATTRS) cell(`E-7 writers data-${x} (static)`, "UNMEASURED", "no --wt given: the static arm reads a source tree");
  else {
    const W = writers(wt);
    for (const x of ATTRS) {
      const files = W[x]; const ok = files.length <= 1 && files.every((p) => p.startsWith(OWNER));
      const line = `${files.length} writer file(s): ${files.join(", ") || "none"} · bound ≤ 1, under ${OWNER} · tree ${a.fixture ? path.relative(HERE, wt) : wt}`;
      if (unowned.has(`data-${x}`)) cell(`E-7 writers data-${x} (static)`, "REPORT", `not owned by this route (--unowned, its charter's words) · ${line}`);
      else cell(`E-7 writers data-${x} (static)`, ok ? "PASS" : "FAIL", line);
    }
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

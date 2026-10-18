#!/usr/bin/env node
// crit-name-trace.mjs · D4-D′ pass-5 CRITIC probe (sitting 2). REPORT `name-ink` (H5-5, X-2) fails 1.00:1 on both
// routes. crit-ink.mjs shows the selected ITEM's color does take the selection ink (rgb 28,25,23 light) and the
// sparkline follows it, so the rule that holds the NAME at the rest ink is on the name or between it and the item.
// This traces, in Chromium (CDP CSS.getMatchedStylesForNode), every matched rule declaring `color` on the selected
// tile's name and on each element between the name and the item, with its layer and selector, plus each element's
// computed color. Reported, not gating.
//   node crit-name-trace.mjs --build <route build> [--out <dir>]
import { cli, openPage, engineVersion } from "../../../harness/lib.mjs";
import { tagItems } from "../../../harness/measure.mjs";

if (import.meta.url === `file://${process.argv[1]}`) {
  await cli("CRIT-NAME-TRACE", async (args, target) => {
    const engine = "chromium";
    const cells = [];
    for (const mode of ["light", "dark"]) {
      const P = await openPage(target, engine, "specimen-migrated", { mode });
      try {
        await tagItems(P);
        const chain = await P.page.evaluate(async () => {
          const th = window.__th; await th.frame();
          const on = th.items().find((e) => th.on(e));
          const name = on?.querySelector("[data-line-slot]");
          if (!name) return null;
          const out = []; let i = 0;
          for (let el = name; el && el !== on.parentElement; el = el.parentElement) {
            el.setAttribute("data-crit-trace", String(i));
            out.push({ i, tag: el.tagName.toLowerCase(), cls: el.className?.baseVal ?? el.className, attrs: [...el.attributes].map((a) => a.name).filter((n) => n.startsWith("data-") && n !== "data-crit-trace").join(","), color: getComputedStyle(el).color });
            i++;
          }
          return out;
        });
        if (!chain) { cells.push({ gating: false, pass: null, line: `${mode} · UNMEASURED: no selected name` }); continue; }
        const cdp = await P.page.context().newCDPSession(P.page);
        await cdp.send("DOM.enable"); await cdp.send("CSS.enable");
        const { root } = await cdp.send("DOM.getDocument", { depth: 0 });
        for (const c of chain) {
          const { nodeId } = await cdp.send("DOM.querySelector", { nodeId: root.nodeId, selector: `[data-crit-trace="${c.i}"]` });
          const m = await cdp.send("CSS.getMatchedStylesForNode", { nodeId });
          const hits = [];
          for (const rm of m.matchedCSSRules ?? []) {
            const decl = (rm.rule.style.cssProperties ?? []).filter((p) => p.name === "color" && !p.disabled && p.text);
            if (!decl.length) continue;
            const layers = (rm.rule.layers ?? []).map((l) => l.text).join(" > ") || "unlayered";
            hits.push(`«${rm.rule.selectorList.text}» [${rm.rule.origin}; ${layers}] ${decl.map((p) => `color: ${p.value}${p.important ? " !important" : ""}`).join("; ")}`);
          }
          cells.push({ gating: false, pass: null, line: `${mode} · [${c.i}] <${c.tag} class="${c.cls}"${c.attrs ? ` ${c.attrs}` : ""}> computed ${c.color} · ${hits.length} matched color rule(s), cascade order: ${hits.map((h, k) => `(${k + 1}) ${h}`).join(" · ") || "none (inherits)"}` });
        }
        await cdp.detach();
      } finally { await P.close(); }
    }
    return { id: "CRIT-NAME-TRACE", title: "X-2: which rule holds the selected K2 name at the rest ink (reported)", engine, engineLabel: await engineVersion(engine), target: target.label, dev: target.meta.dev, cells };
  });
}

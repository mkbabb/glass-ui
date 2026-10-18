#!/usr/bin/env node
// crit-ink.mjs · D4-D′ pass-5 CRITIC probe. X-2 (the selected state reaches the tile's media) and REPORT `name-ink`
// (H5-5) on the route's K2 (`specimen-migrated`), now that the one K2 transcription paints nothing. FLOOR-V4 §3.3 left
// the cause untraced: the selected item's `--selection-ink` turns to the edge while its `color` stays the rest ink.
// Per mode (light, dark), on the selected tile and an unselected one:
//   ink     the item's color, its --selection-ink, the name's color, the sparkline path's stroke (sRGB through a 1 px
//           canvas), and stroke and name contrast selected against unselected (the X-2 media cell)
//   trace   Chromium only (CDP CSS.getMatchedStylesForNode): every matched rule on the selected item that declares
//           `color` or `--selection-ink`, with its selector, layers and source, in cascade order, and the computed
//           value the engine reports for each
//   probe   the same reads with the item's `color: var(--selection-ink)` written inline (does the variable resolve
//           to the edge when nothing outranks the declaration?)
//   node crit-ink.mjs --build <route build> [--engine chromium|webkit] [--out <dir>]
import { cli, openPage, engineVersion, engineOf, contrast } from "../../../harness/lib.mjs";
import { tagItems } from "../../../harness/measure.mjs";

const READ = async (inline) => {
  const th = window.__th; await th.frame();
  const its = th.items(), on = its.find((e) => th.on(e)), off = its.find((e) => !th.on(e));
  if (!on || !off) return null;
  if (inline) { for (const e of [on, off]) e.style.setProperty("color", "var(--selection-ink)"); await th.frame(); }
  on.setAttribute("data-crit-on", ""); off.setAttribute("data-crit-off", "");
  const cv = document.createElement("canvas"); cv.width = cv.height = 1; const g = cv.getContext("2d", { willReadFrequently: true });
  const rgb = (c) => { g.clearRect(0, 0, 1, 1); g.fillStyle = "#000"; g.fillStyle = c; g.fillRect(0, 0, 1, 1); return [...g.getImageData(0, 0, 1, 1).data.slice(0, 3)]; };
  const one = (it) => {
    const cs = getComputedStyle(it), name = it.querySelector("[data-line-slot]"), path = it.querySelector(".tile-sparkline path");
    return { color: rgb(cs.color), ink: rgb(cs.getPropertyValue("--selection-ink").trim()), inkRaw: cs.getPropertyValue("--selection-ink").trim(), name: name ? rgb(getComputedStyle(name).color) : null, stroke: path ? rgb(getComputedStyle(path).stroke) : null, strokeRaw: path ? getComputedStyle(path).stroke : null };
  };
  return { on: one(on), off: one(off) };
};
const fmt = (c) => (c ? `rgb(${c.join(", ")})` : "—");

if (import.meta.url === `file://${process.argv[1]}`) {
  await cli("CRIT-INK", async (args, target) => {
    const engine = engineOf(args);
    const cells = [];
    for (const mode of ["light", "dark"]) for (const inline of [false, true]) {
      const P = await openPage(target, engine, "specimen-migrated", { mode });
      try {
        await tagItems(P);
        const r = await P.page.evaluate(READ, inline);
        if (!r) { cells.push({ gating: true, pass: null, line: `${mode} · UNMEASURED: no selected and unselected tile` }); continue; }
        const stroke = r.on.stroke && r.off.stroke ? contrast(r.on.stroke, r.off.stroke) : null;
        const name = r.on.name && r.off.name ? contrast(r.on.name, r.off.name) : null;
        const takes = (x) => x && x.join() === r.on.ink.join();
        const tag = inline ? "probe (color: var(--selection-ink) inline)" : "ink";
        cells.push({ gating: !inline, pass: !!(takes(r.on.stroke) && takes(r.on.name)),
          line: `${tag} · ${mode} · selected: item color ${fmt(r.on.color)}, --selection-ink ${fmt(r.on.ink)} (${r.on.inkRaw}), name ${fmt(r.on.name)}, stroke ${fmt(r.on.stroke)} (${r.on.strokeRaw}) · unselected: item ${fmt(r.off.color)}, ink ${fmt(r.off.ink)}, name ${fmt(r.off.name)}, stroke ${fmt(r.off.stroke)} · stroke selected:unselected ${stroke ? stroke.toFixed(2) : "—"}:1, name ${name ? name.toFixed(2) : "—"}:1 · the selected media ${takes(r.on.stroke) ? "TAKES" : "does NOT take"} the selection ink` });
        if (engine === "chromium" && !inline) {
          const cdp = await P.page.context().newCDPSession(P.page);
          await cdp.send("DOM.enable"); await cdp.send("CSS.enable");
          const { root } = await cdp.send("DOM.getDocument", { depth: 0 });
          const { nodeId } = await cdp.send("DOM.querySelector", { nodeId: root.nodeId, selector: "[data-crit-on]" });
          const m = await cdp.send("CSS.getMatchedStylesForNode", { nodeId });
          const hits = [];
          for (const rm of m.matchedCSSRules ?? []) {
            const decl = (rm.rule.style.cssProperties ?? []).filter((p) => (p.name === "color" || p.name === "--selection-ink") && !p.disabled && p.value !== undefined && (p.text || p.implicit === false));
            if (!decl.length) continue;
            const layers = (rm.rule.layers ?? []).map((l) => l.text).join(" > ") || "unlayered";
            const cq = (rm.rule.containerQueries ?? []).map((c) => c.text).join(" & ");
            hits.push(`«${rm.rule.selectorList.text}» [${rm.rule.origin}; ${layers}${cq ? `; @container ${cq}` : ""}${rm.rule.scopes?.length ? `; @scope ${rm.rule.scopes.map((s) => s.text).join(" & ")}` : ""}] ${decl.map((p) => `${p.name}: ${p.value}${p.important ? " !important" : ""}`).join("; ")}`);
          }
          const inl = (m.inlineStyle?.cssProperties ?? []).filter((p) => p.name === "color" && p.text).map((p) => p.value);
          const { computedStyle } = await cdp.send("CSS.getComputedStyleForNode", { nodeId });
          const comp = Object.fromEntries(computedStyle.filter((p) => p.name === "color" || p.name === "--selection-ink").map((p) => [p.name, p.value]));
          cells.push({ gating: false, pass: null, line: `trace · ${mode} · selected item: ${hits.length} matched rule(s) declaring color/--selection-ink, in cascade order (last wins within its layer and importance): ${hits.map((h, i) => `(${i + 1}) ${h}`).join(" · ")}${inl.length ? ` · inline color ${inl.join(", ")}` : ""} · computed color ${comp.color}, --selection-ink ${comp["--selection-ink"]}` });
          await cdp.detach();
        }
      } finally { await P.close(); }
    }
    return { id: "CRIT-INK", title: "X-2: the selected K2 tile's media and name take the selection ink, with the cascade trace", engine, engineLabel: await engineVersion(engine), target: target.label, dev: target.meta.dev, cells };
  });
}

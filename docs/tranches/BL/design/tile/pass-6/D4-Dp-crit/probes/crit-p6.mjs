// D4-D′ pass-6 critic · CRIT-P6: FV5-2's strip reset and the pin's widened limit, on strips H6-3 does not build.
// H6-3 reads one horizontal pill strip in a tile option. This probe reads the other strip shapes in a tile option of a
// declared group (`shape="cell"`), each against the same strip outside any group, light and dark, in the scene
// `critp6-migrated` of a build made with `--route ../crit-route`:
//   vt  a vertical pill strip          gating: every tab one row, nothing cut, each tab's height the reference's ±0.5
//   ut  an underline strip (tabs)      gating: the same
//   ct  a strip whose first tab holds a `shape="cell"` group            info: the inner options' fact and corner
//   sw  a pill strip, with a consumer write ON the strip, unlayered     info: FLOOR-V5 §1.2's measured split, re-read
// The tab reader is FACT's (`READ_ST`'s row count and cut count), applied to every tab of a strip.
//   node crit-p6.mjs --build <critic route build> [--engine chromium|webkit] [--out <dir>]
import { cli, openPage, engineVersion, engineOf, f2 } from "../../../harness/lib.mjs";
import { READ_ITEM } from "../../../harness/fact-split.mjs";

const READ_TABS = async (id) => {
  await window.__th.frame();
  const strip = document.querySelector(`[data-c-st="${id}"]`);
  if (!strip) return null;
  const sb = strip.getBoundingClientRect();
  const tabs = [...strip.querySelectorAll(":scope > .segmented-tab")].map((tab) => {
    const boxes = [], rg = document.createRange(), tw = document.createTreeWalker(tab, NodeFilter.SHOW_TEXT);
    for (let n = tw.nextNode(); n; n = tw.nextNode()) { if (!n.textContent.trim()) continue; rg.selectNodeContents(n); for (const r of rg.getClientRects()) if (r.width > 1 && r.height > 1) boxes.push(r); }
    boxes.sort((p, q) => p.bottom - q.bottom); let rows = 0, bottom = -Infinity;
    for (const r of boxes) if ((r.top + r.bottom) / 2 > bottom) { rows++; bottom = r.bottom; }
    const tb = tab.getBoundingClientRect();
    const past = [...tab.querySelectorAll("*")].filter((k) => { const r = k.getBoundingClientRect(); return r.height > 0 && (r.bottom > tb.bottom + 1 || r.top < tb.top - 1); }).length;
    return { rows, w: tb.width, h: tb.height, past, fact: getComputedStyle(tab).getPropertyValue("--selection-tile").trim() };
  });
  return { w: sb.width, h: sb.height, fact: getComputedStyle(strip).getPropertyValue("--selection-tile").trim(), tabs };
};
const sdesc = (s) => s ? `strip ${f2(s.w)}×${f2(s.h)} fact ${s.fact || "(unset)"} · tabs ${s.tabs.map((t) => `${f2(t.h)}px ${t.rows}r${t.past ? ` ${t.past}cut` : ""} ${t.fact}`).join(", ")}` : "no strip";
const judgeTabs = (r, ref) => {
  if (!r || !ref) return { pass: false, why: !ref ? "no reference strip" : "no strip in the option" };
  if (ref.tabs.some((t) => t.rows !== 1)) return { pass: false, why: "the REFERENCE strip stacks: the composition is broken" };
  const bad = r.tabs.filter((t, i) => t.rows !== 1 || t.past || Math.abs(t.h - (ref.tabs[i]?.h ?? -99)) > 0.5);
  return { pass: !bad.length && r.tabs.length === ref.tabs.length, why: bad.length ? `${bad.length} tab(s) off the one-row law or off the reference height` : "every tab one row, nothing cut, at the reference height" };
};
const SW_CSS = `.c-group [data-c-st="sw"] { --selection-tile: flush; }`;

if (import.meta.url === `file://${process.argv[1]}`) {
  await cli("CRIT-P6", async (args, target) => {
    const engine = engineOf(args);
    const cells = [];
    for (const mode of ["light", "dark"]) {
      const P = await openPage(target, engine, "critp6-migrated", { mode });
      try {
        const read = async (id) => P.page.evaluate(READ_TABS, id);
        const refV = await read("ref-v"), refU = await read("ref-u"), refP = await read("ref-p");
        for (const [id, ref] of [["vt", refV], ["ut", refU]]) {
          const r = await read(id), j = judgeTabs(r, ref);
          cells.push({ gating: true, pass: j.pass, scene: "critp6-migrated", arm: "migrated", line: `${id} ${mode} · ${j.why} · ${sdesc(r)} · reference ${sdesc(ref)}` });
        }
        const inner = [];
        for (const v of ["i0", "i1"]) inner.push(await P.page.evaluate(READ_ITEM, `[data-c-inner-item="${v}"]`));
        const tile = inner.every((r) => r && r.fact === "flush" && Math.abs(r.used - 16) <= 0.5 && r.dir === "column");
        const grp = await P.page.evaluate(() => { const g = document.querySelector("[data-c-inner]"); return g ? `${getComputedStyle(g).display} fact ${getComputedStyle(g).getPropertyValue("--selection-tile").trim()}` : "none"; });
        cells.push({ gating: false, pass: tile, scene: "critp6-migrated", arm: "migrated", line: `ct ${mode} (info) · the inner shape="cell" options ${tile ? "ARE tiles" : "are NOT tiles"} · group ${grp} · ${inner.map((r) => r ? `fact ${r.fact} ${f2(r.w)}×${f2(r.h)} used ${f2(r.used)} ${r.rows}r ${r.dir}` : "missing").join(" | ")} · tab-strip ${sdesc(await read("ct"))}` });
        const sw0 = await read("sw");
        await P.page.addStyleTag({ content: SW_CSS });
        const sw1 = await read("sw"), j0 = judgeTabs(sw0, refP), j1 = judgeTabs(sw1, refP);
        cells.push({ gating: true, pass: j0.pass, scene: "critp6-migrated", arm: "migrated", line: `sw ${mode} (no write: H6-3's strip, a 4-tab twin) · ${j0.why} · ${sdesc(sw0)}` });
        cells.push({ gating: false, pass: j1.pass, scene: "critp6-migrated", arm: "migrated", line: `sw ${mode} (info: unlayered consumer \`--selection-tile: flush\` ON the strip) · ${j1.why} · ${sdesc(sw1)}` });
      } finally { await P.close(); }
    }
    return { id: "CRIT-P6", title: "FV5-2 on the strips H6-3 does not build: vertical, underline, a declared group in a tab, a write on the strip (R-2, FV-2 class)", engine, engineLabel: await engineVersion(engine), target: target.label, dev: target.meta.dev, cells };
  });
}

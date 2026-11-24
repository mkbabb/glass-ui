// BM pass 10 (DESIGN §11): the byte ledger closed against each site's bound, by release. Every row is a figure an earlier
// pass measured (its source named) or this pass measured; every figure is a standalone gzip -9, an upper bound on both
// sides inside a site's bundle, so a net is indicative and the per-entry closure from built bundles is owed (one row per
// site below says which entry it needs). BL's own removals (W-B.18, W-R.1, D3) are listed apart and credited to BL.
// Amended by the final fold (B10-11, A10-10): gaggle joins the overlay rows (it mounts Dialog, SheetContent and
// DropdownMenu, pass-8/fold/hosts.json); the touch slide's own chunk is priced (<= 377 B, choice 14); the
// useSelectionIndicator credit is held out of the sums until BM-4 shows it leaving each entry's import graph
// (SegmentedTabs and ToggleGroup reach it through useSelectionGroup); the goo rides the seat's own component, eager at
// the three seat sites; Home Assistant's every-script bound (0.8 kB) is checked beside its entry. A net of standalone
// upper bounds bounds neither side, so every verdict is indicative; gate G-4 closes each per entry.
// Run: ~/.claude/guard/guarded --light --timeout 5 -- node docs/tranches/BM/study/pass-10/ledger/ledger.mjs
import { writeFileSync } from "node:fs";
import path from "node:path";
const HERE = path.dirname(new URL(import.meta.url).pathname);
const SITES = ["atlas", "value.js", "daraksha", "fourier", "keyframes", "gaggle", "Home Assistant", "slides", "dns-analysis"];
const DOCK = ["atlas", "value.js", "daraksha", "fourier", "keyframes", "gaggle", "Home Assistant", "slides"];
const SLIDER = ["atlas", "value.js", "daraksha", "fourier", "keyframes", "Home Assistant"];
const TABS = ["atlas", "value.js", "fourier", "keyframes"];
const DIALOG = ["atlas", "value.js", "daraksha", "fourier", "keyframes", "gaggle", "Home Assistant", "slides"];
const RIM = ["atlas", "fourier", "gaggle"];
const TOGGLE = ["value.js", "keyframes", "slides", "atlas", "gaggle"];
// The goo mounts only on a dock with a seat beside it: daraksha's and value.js's theme seats, and Home Assistant's faces seat ([IN HA 2]).
const GOO = ["daraksha", "value.js", "Home Assistant"];
// [release, part, kind, bytes (+ adds, − removes), reaches, source, onIntent]
const ROWS = [
  ["11.2.0", "the toggle's glyph (O-428), as amended by the final fold", "css+markup", +226, TOGGLE, "pass-10/toggle/toggle.json"],
  ["11.2.0", "the plate at the recommended ladder (choice 5)", "css", 0, DOCK, "token values only, on W-B.17's plate"],
  ["11.3.0", "six single-curve spring tokens", "css", +150, SITES.slice(0, 8), "pass-2/delivery/ledger.json"],
  ["11.3.0", "six linear() spring tokens", "css", -1637, SITES.slice(0, 8), "pass-2/delivery/ledger.json"],
  ["11.3.0", "the settle player, playSpring", "js", +655, DOCK, "pass-2/delivery/ledger.json", true],
  ["11.3.0", "the rim's window", "css", +273, RIM, "pass-2/delivery/ledger.json"],
  ["11.3.0", "the rim's clip legs", "css", -319, RIM, "pass-2/delivery/ledger.json"],
  ["11.3.0", "the mark's stylesheet", "css", +585, [...new Set([...TABS, ...DOCK])], "pass-6/fold/ledger.json"],
  ["11.3.0", "the mark's writer (eager: every strip and run)", "js", +914, [...new Set([...TABS, ...DOCK])], "pass-6/fold/ledger.json"],
  ["11.3.0", "useDockRunMark", "js", -1349, DOCK, "pass-5/mark/ledger.json"],
  ["11.3.0", "the run mark's rules in run.css", "css", -494, DOCK, "pass-5/mark/ledger.json"],
  ["11.3.0", "presence on its own finite legs", "js", +345, DIALOG, "pass-9/fold/fold.json"],
  ["11.3.0", "the presence hold", "css", -110, DIALOG, "pass-8/bud/bud.json"],
  ["11.3.0", "Dialog and side Sheet stop calling useSpringMount", "js", -791, DIALOG, "pass-8/bud/bud.json"],
  ["11.3.0", "the panel rule, the exit token, the context seed", "css", +163, DIALOG, "pass-9/fold/fold.json"],
  ["11.3.0", "the touch slide's loader in the entry", "js", +60, DIALOG, "pass-9/fold/fold.json (estimate)"],
  ["11.3.0", "the touch slide itself, loaded on a menu's first touch", "js", +377, DIALOG, "choice 14; record :1571 (upper bound)", true],
  ["11.3.0", "the veil as the one blur", "css", +112, DIALOG, "pass-9/fold/fold.json"],
  ["11.3.0", "the slider's expanded view, C over BL's A, as amended by the final fold", "css", +43, SLIDER, "pass-10/slider/slider.json"],
  ["12.0.0", "FadingScroll's fixed ramps", "css", +201, ["atlas", "value.js", "fourier", "keyframes", "gaggle"], "pass-2/delivery/ledger.json"],
  ["12.0.0", "FadingScroll's fallback script", "js", -904, ["atlas", "value.js", "fourier", "keyframes", "gaggle"], "pass-2/delivery/ledger.json"],
  ["12.0.0", "scroll-chrome as a state (sheet)", "css", +330 - 417, ["Home Assistant"], "pass-2/delivery/ledger.json"],
  ["12.0.0", "sheets as native scroll", "css", +246, DIALOG, "pass-9/fold/fold.json"],
  ["12.0.0", "sheets as native scroll", "js", +977 - 1546, DIALOG, "pass-9/fold/fold.json"],
  ["12.0.0", "the fold: the glass's edge cuts each seat", "css", +393, DOCK, "pass-8 §9.8"],
  ["12.0.0", "wi8's plate path (the fold's integrator)", "js", -1356, DOCK, "pass-5/fold/measure-integrator.json"],
  ["12.0.0", "cta-seat.css", "css", -278, DOCK, "pass-7 §9.8"],
  ["12.0.0", "the goo: its rules and the filter's markup, in the seat's own component", "css+markup", +267 + 201, GOO, "pass-8 §9.8"],
  ["12.0.0", "daraksha's own neck", "css", -2024, ["daraksha"], "pass-7 §9.8"],
  ["12.0.0", "useTabDragMorph", "js", -449, TABS, "pass-6/hosts/bytes.json"],
];
// Held out of the sums until the wave proves it (B10-11).
const HELD = [
  ["11.3.0", "useSelectionIndicator leaving the entry (credited only when BM-4 shows it out of the import graph)", "js", -534, TABS, "pass-6/fold/ledger.json"],
];
const BL = [
  ["W-B.18 (11.3.0 by G1)", "the slider's loupe, veil mount, grasp carriers and velocity bridge", -1525 - 776, SLIDER],
  ["W-R.1, D3 (12.0.0)", "the luminance clamp, script and sheet", -2860 - 187, DOCK],
];
const BOUNDS = {
  "Home Assistant": { bound: 200, what: "entry margin, 71.6 of 71.8 kB gz; its CSS rides the entry script, so CSS and JS add", unit: "css+js", allScripts: 800 },
  daraksha: { bound: 45, what: "the reader route's eager JS, 125.3 of 126 KB (check-budget.mjs:2-4, :33-35)", unit: "js" },
  gaggle: { bound: 11282, what: "first-load margin", unit: "css+js" },
  atlas: { bound: null, what: "no new mount cost, no box that moves (a qualitative bound)", unit: "—" },
  "value.js": { bound: null, what: "load on intent where eager loading would not fit", unit: "—" },
  fourier: { bound: null, what: "none stated", unit: "—" }, keyframes: { bound: null, what: "none stated", unit: "—" },
  slides: { bound: null, what: "none stated; on 10.1.4", unit: "—" },
  "dns-analysis": { bound: null, what: "no glass-ui on master; its spike measured +41 KB gz per route at 4.2.0", unit: "—" },
};
const out = { method: "standalone gzip -9 rows from passes 1 to 10, summed per site per release; upper bounds on each side, so every verdict is indicative and G-4 closes it per entry", rows: ROWS.map(([release, part, kind, bytes, reaches, source, onIntent]) => ({ release, part, kind, bytes, reaches, source, onIntent: !!onIntent })), held: HELD, bl: BL, sites: {} };
for (const site of SITES) {
  const per = {};
  for (const rel of ["11.2.0", "11.3.0", "12.0.0"]) {
    const rs = ROWS.filter((r) => r[0] === rel && r[4].includes(site));
    const css = rs.filter((r) => r[2] !== "js").reduce((a, r) => a + r[3], 0), js = rs.filter((r) => r[2] === "js").reduce((a, r) => a + r[3], 0);
    const eagerJs = rs.filter((r) => r[2] === "js" && !r[6]).reduce((a, r) => a + r[3], 0);
    per[rel] = { css, js, eagerJs, total: css + js };
  }
  const b = BOUNDS[site];
  const check = (rel) => {
    if (b.bound == null) return "qualitative";
    const entry = (b.unit === "js" ? per[rel].eagerJs : per[rel].css + per[rel].eagerJs) <= b.bound;
    const all = b.allScripts == null || per[rel].js <= b.allScripts;
    return entry && all ? "within (indicative)" : "over (indicative)";
  };
  out.sites[site] = { ...per, bound: b, verdict: { "11.2.0": check("11.2.0"), "11.3.0": check("11.3.0"), "12.0.0": check("12.0.0") },
    blCredits: BL.filter((r) => r[3].includes(site)).map((r) => `${r[0]}: ${r[1]} ${r[2]}`) };
}
writeFileSync(path.join(HERE, "ledger.json"), JSON.stringify(out, null, 1));
for (const [s, v] of Object.entries(out.sites)) console.log(`${s.padEnd(15)} 11.2.0 ${String(v["11.2.0"].total).padStart(6)}  11.3.0 css ${String(v["11.3.0"].css).padStart(6)} js ${String(v["11.3.0"].js).padStart(6)} (eager ${v["11.3.0"].eagerJs})  12.0.0 css ${String(v["12.0.0"].css).padStart(6)} js ${String(v["12.0.0"].js).padStart(6)}  ${JSON.stringify(v.verdict)}`);

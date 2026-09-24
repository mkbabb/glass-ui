// crit-gate.mjs — the CRITIC's reconstruction of SPECS-v2 §4.5 (E0..E7) on the floor libs.
// NOT the prototype's eponym.mjs (lost with the /tmp wipe). Written from the spec text only.
//   node crit-gate.mjs <root>   → prints JSON {counts, items}
import { posix } from "node:path";
const root = process.argv[2];
const L = `${root}/docs/tranches/BL/design/structure/floor/lib`;
const { buildGraph } = await import(`${L}/graph.mjs`);
const { makeOrigins } = await import(`${L}/symbols.mjs`);
const { placeAll, dirUnits, GLOBAL_ZONES } = await import(`${L}/placement.mjs`);
const g = buildGraph(root);
const O = makeOrigins(g);
const files = g.tree.files;
const dirname = posix.dirname, basename = posix.basename;
const SLOTS = new Set(["composables", "__tests__", "styles"]);
const CODE = /\.(ts|mts|js|mjs|vue|css)$/;
const items = { E0: [], E1: [], E2: [], E3: [], E3p: [], E4: [], E5: [], E6: [], E7: [] };
const HOLDS = new Set(["src/components/_shared/overlay/isTeleportedTarget.ts"]); // the proto's one ledgered FD-8 hold

// E0 — F-1 violations + package self-name import inside src
for (const v of g.violations) items.E0.push(`violation ${JSON.stringify(v).slice(0, 200)}`);
for (const f of g.tree.parsed) if (f.startsWith("src/") && /\.(ts|vue)$/.test(f) && /from\s+["']@mkbabb\/glass-ui(\/|["'])/.test(g.tree.read(f))) items.E0.push(`self-name import ${f}`);

// E1 — F-7 with the FD-1 anchor (SPECS §6.3 code), plus relays
const anchor = new Map();
for (const d of files.filter((f) => /(^|\/)index\.ts$/.test(f) && f.startsWith("src/") && !["src", "src/components", "src/composables"].includes(dirname(f))).sort((a, b) => a.length - b.length)) {
  const u = dirname(d); if (GLOBAL_ZONES.some((z) => u === z || u.startsWith(z + "/"))) continue;
  for (const [, os] of O.exportsOf(d)) for (const o of os) if (o.file.startsWith(u + "/") && o.file !== d) anchor.set(o.file, u);
}
const pa = placeAll(g, dirUnits(), { zones: ["src"] });
for (const r of pa.rows) if ((r.class === "move" || r.class === "global") && !anchor.has(r.file) && !HOLDS.has(r.file)) items.E1.push(`${r.class} ${r.file} readers=${r.readerUnits.join(",")}`);
const entrySources = new Set([...g.record.js.map(([, s]) => s), ...g.record.css.map(([, t]) => t.source).filter(Boolean)]);
for (const d of g.record.doors) {
  const u = dirname(d); if (["src", "src/components", "src/composables"].includes(u)) continue;
  for (const [n, os] of O.exportsOf(d)) for (const o of os) if (!o.file.startsWith(u + "/")) items.E1.push(`relay ${d} publishes ${n} from ${o.file}`);
}

// shared helpers for E2/E3
const kebab = (s) => s.replace(/([a-z0-9])([A-Z])/g, "$1-$2").toLowerCase();
const norm = (s) => s.toLowerCase().replace(/[-_]/g, "");
const unitOfComp = (f) => { const m = f.match(/^src\/components\/([^/]+)\//); return m && m[1] !== "_shared" ? `src/components/${m[1]}` : null; };
function rootName(f, unit) {
  const b = basename(f);
  if (/^index\./.test(b)) return basename(dirname(f));
  let s = b.replace(/\.(vue|ts|mts|mjs|js|css)$/, "");
  s = kebab(s).replace(/\./g, "-").replace(/^use-/, "");
  const un = unit ? basename(unit) : null;
  if (un && s.startsWith(un + "-") && s.length > un.length + 1 && !/^(frag|vert|wgsl|glsl|comp)$/.test(s.slice(un.length + 1))) s = s.slice(un.length + 1);
  return s;
}
const slotStrip = (d) => { while (SLOTS.has(basename(d))) d = dirname(d); return d; };

// E2 — dominator ownership inside each component unit
const unitList = [...new Set(files.map(unitOfComp).filter(Boolean))];
const rootsByUnit = new Map();
for (const U of unitList) {
  const door = `${U}/index.ts`;
  const F = files.filter((f) => f.startsWith(U + "/") && CODE.test(f) && !/\.css$/.test(f) && !/\.d\.ts$/.test(f) && !f.includes("/__tests__/") && f !== door && !/\.(test|spec|visual)\./.test(f));
  const inU = new Set(F);
  const succ = new Map(F.map((f) => [f, new Set()])); const pred = new Map(F.map((f) => [f, new Set()]));
  const TOP = "⊤"; succ.set(TOP, new Set()); pred.set(TOP, new Set());
  const add = (a, b) => { if (a === b) return; succ.get(a).add(b); pred.get(b).add(a); };
  for (const r of F) for (const f of O.readsOf(r)) if (inU.has(f)) add(r, f);
  const published = new Set(); if (files.includes(door)) for (const os of O.exportsOf(door).values()) for (const f of O.files(os)) if (inU.has(f)) published.add(f);
  const extRead = new Set(); for (const [f, rs] of pa.readers) if (inU.has(f)) for (const r of rs) if (!r.startsWith(U + "/")) extRead.add(f);
  for (const f of F) if (extRead.has(f) || !pred.get(f).size || /\.vue$/.test(f) && rootName(f, U) === basename(U)) add(TOP, f);
  // reverse postorder
  const order = []; const seen = new Set();
  const dfs = (n) => { seen.add(n); for (const s of succ.get(n)) if (!seen.has(s)) dfs(s); order.push(n); };
  dfs(TOP); for (const f of F) if (!seen.has(f)) { add(TOP, f); dfs(f); }
  const rpo = order.reverse(); const idx = new Map(rpo.map((n, i) => [n, i]));
  const idom = new Map([[TOP, TOP]]);
  const inter = (a, b) => { while (a !== b) { while (idx.get(a) > idx.get(b)) a = idom.get(a); while (idx.get(b) > idx.get(a)) b = idom.get(b); } return a; };
  for (let ch = true; ch;) { ch = false; for (const n of rpo) { if (n === TOP) continue; let nd; for (const p of pred.get(n)) if (idom.has(p)) nd = nd === undefined ? p : inter(p, nd); if (nd !== undefined && idom.get(n) !== nd) { idom.set(n, nd); ch = true; } } }
  const kids = new Map(); for (const f of F) { const d = idom.get(f); kids.set(d, (kids.get(d) ?? 0) + 1); }
  const isRoot = (f) => f === TOP || /\.vue$/.test(f) || (!/\.css$/.test(f) && (kids.get(f) ?? 0) >= 2);
  const owner = (f) => { let a = idom.get(f); while (!isRoot(a)) a = idom.get(a); return a; };
  const closure = new Map(); for (const f of F) { const o = owner(f); if (!closure.has(o)) closure.set(o, []); closure.get(o).push(f); }
  const roots = F.filter(isRoot); rootsByUnit.set(U, { roots, closure, owner });
  const eponDir = (R) => { const d = slotStrip(dirname(R)); return norm(basename(d)) === norm(rootName(R, U)) ? d : null; };
  const home = (R) => {
    if (R === TOP) return U;
    if (rootName(R, U) === basename(U) && /\.vue$/.test(R)) return U; // eponymy pin
    return eponDir(R) ?? home(owner(R));
  };
  for (const R of roots) {
    const c = (closure.get(R) ?? []).length;
    const pinned = /\.vue$/.test(R) && dirname(R) === U && published.has(R); const inSlot = SLOTS.has(basename(dirname(R)));
    if (R !== TOP && c >= 2 && !eponDir(R) && !pinned && !inSlot && !(rootName(R, U) === basename(U))) items.E2.push(`root heads no dir ${R} closure=${c}`);
  }
  for (const f of F) {
    const o = owner(f); const want = home(o); const have = slotStrip(dirname(f));
    if (isRoot(f) && eponDir(f)) { if (dirname(eponDir(f)) !== home(owner(f)) && eponDir(f) !== home(owner(f))) items.E2.push(`root dir misplaced ${f} want-under ${home(owner(f))}`); continue; }
    if (have !== want) items.E2.push(`${f} owner=${o === TOP ? "door" : o} want=${want}`);
  }
}

// E3 — eponymy of every non-slot dir under a component unit; empty-closure root dirs
const dirs = [...new Set(files.filter((f) => unitOfComp(f)).map((f) => dirname(f)))].filter((d) => d.split("/").length > 3 && !SLOTS.has(basename(d)));
for (const d of dirs) {
  const U = unitOfComp(d + "/x");
  const own = files.filter((f) => dirname(f) === d && CODE.test(f));
  const epo = own.find((f) => norm(rootName(f, U)) === norm(basename(d)) || /^index\./.test(basename(f)));
  if (!epo) { items.E3.push(`no eponymous root: ${d}`); continue; }
  const info = rootsByUnit.get(U);
  if (info && !/^index\./.test(basename(epo))) {
    const c = (info.closure.get(epo) ?? []).length; if (c === 0) items.E3.push(`root dir with empty closure: ${d}`);
  }
  if (/(^|-)(utils?|helpers?|misc|common|lib|stuff|part-?\d+|legacy|compat|old|new|tmp)$/.test(basename(d))) items.E3p.push(`placeholder name: ${d}`);
}

// E4 — R-5 strict (slots bounded themselves)
const ZONES = ["src", "demo", "scripts", "tests", "tests-visual"];
const direct = new Map();
for (const f of files) { if (!ZONES.includes(f.split("/")[0])) continue; const d = dirname(f); direct.set(d, (direct.get(d) ?? 0) + 1); }
for (const [d, n] of direct) if (n > 12) items.E4.push(`dir ${d} ${n}`);
for (const f of files) { if (!ZONES.includes(f.split("/")[0]) || !CODE.test(f)) continue; const t = g.tree.read(f); const n = t.split("\n").length - (t.endsWith("\n") ? 1 : 0); if (n > 500) items.E4.push(`file ${f} ${n}`); }

// E5 — one symbol, one door (non-root entries)
const seenO = new Map();
for (const [name, src] of g.record.js) { if (name === "index") continue; for (const [n, os] of O.exportsOf(src)) for (const o of os) { const k = `${o.file}#${o.name ?? n}`; if (!seenO.has(k)) seenO.set(k, new Set()); seenO.get(k).add(name); } }
for (const [k, s] of seenO) if (s.size > 1) items.E5.push(`${k} on ${[...s].join(",")}`);

// E6 — demo reads src through entry sources only
for (const e of g.edges) if (e.from.startsWith("demo/") && e.to && e.to.startsWith("src/") && !["css-source", "scan", "glob", "glob-literal"].includes(e.kind) && !entrySources.has(e.to)) items.E6.push(`${e.from}:${e.line} ${e.kind} → ${e.to}`);

// E7 — a single-subject test lives in <unit>/__tests__/
const testRe = /\.(test|spec)\.(ts|tsx)$|\.test-d\.ts$/;
for (const t of files.filter((f) => testRe.test(f) && (f.startsWith("tests/") || f.includes("/__tests__/")))) {
  const subj = new Set();
  for (const e of g.edges) if (e.from === t && e.to && e.to.startsWith("src/") && ["import", "import-type", "dynamic", "vi-mock", "reexport", "import-type-node"].includes(e.kind)) { const u = unitOfComp(e.to); subj.add(u ?? "global"); }
  if (subj.size !== 1 || subj.has("global")) { if (t.includes("/__tests__/")) items.E7.push(`not single-subject but in a unit slot: ${t}`); continue; }
  const u = [...subj][0];
  if (!t.startsWith(u + "/") || !t.includes("/__tests__/")) items.E7.push(`${t} subject=${u}`);
}

const counts = Object.fromEntries(Object.entries(items).map(([k, v]) => [k, v.length]));
console.log(JSON.stringify({ counts, items }));

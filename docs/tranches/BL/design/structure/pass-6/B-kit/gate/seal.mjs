// seal.mjs — the D1-B gate, pass 6 (B-kit/LAW.md): sealed modules, one door each, over the
// floor's F-1 graph (one graph, fail-closed), F-7 with B's anchor (LAW §1), FD-3's one slot
// predicate and symbol origins. Every clause judges the RESOLVED file, never the specifier.
// No comment opt-out and no off switch: the pin is always read, from its one path (B-11).
// Lands at scripts/structure/seal/seal.mjs, a module of the floor runtime (FD-11, S19).
//
//   node scripts/structure/seal/seal.mjs [--root R] [--verbose] [--json out] [--overlay plants.json]
//                                   [--write-pin pin.json]
// --write-pin writes the pin the gate measures now (a reviewed diff when it lands); the gate
// itself reads only records/seal-pin.json.
import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { posix, resolve } from "node:path";
import { createRequire } from "node:module";
import { buildGraph, CONTAINERS as FLOOR_CONTAINERS, isSlot as floorIsSlot, makeOrigins, placeAll, playwrightProgram, proposedPath, sccGrowth, VALUE_KINDS } from "../lib/index.mjs";
// the route's law, stated once (B-kit/lib/law.mjs, landed beside the gate as law.mjs)
import { bAnchor as lawAnchor, doorModule, placementGraph, placementViolations } from "./law.mjs";
import { maskingFallbacks } from "./fallbacks.mjs";
import { directoryWalks } from "./walks.mjs";

// ---------------------------------------------------------------- declarations (one place)
export const SEALED = ["src", "scripts"];
export const ZONES5 = ["src", "demo", "scripts", "tests", "tests-visual"]; // R-5 zones
export const CONTAINERS = new Set(["src", "src/components", "src/composables", "src/components/_shared", "scripts"]);
export const KIND_SLOTS = new Set(["composables", "styles", "__tests__"]); // R-4, R-5, R-3
const DOOR_BASENAMES = ["index.ts", "index.mjs", "index.css"];
const HARNESS = /^tests\/harness\//; // R-3: the one module that walks or reads the tree
const PLAYWRIGHT_PROGRAM = /(^|\/)playwright[^/]*\.config\.(ts|mts|js|mjs)$/; // F-1's test-program holder (P4-F5)
const AGGREGATES = new Set(["src/index.ts", "src/styles/index.css"]); // the root door and ./styles (R-7)
export const KERNEL_ROOTS = ["src/composables", "src/styles", "src/components/_shared", "src/fonts"];
const KERNEL = (f) => KERNEL_ROOTS.some((k) => f.startsWith(`${k}/`));
const UNIT_FILE = (f) => f.startsWith("src/components/") && !f.startsWith("src/components/_shared/") && f.split("/").length > 3;
const CODE = /\.(ts|tsx|mts|cts|js|mjs|cjs|vue|css|glsl|wgsl|sh|py)$/;
const COMPUTED = new Set(["fs-read", "path-helper", "computed-read"]); // F-1 census kinds that are computed-path reads (P3-F4)
export const zoneOf = (f) => { const t = f.split("/")[0]; return ZONES5.includes(t) ? t : !f.includes("/") ? "root" : "other"; };
const TEST_FILE = /\.(test|spec|test-d)\.(ts|tsx|mts)$|\.visual\.ts$/; // R-3: a one-unit visual spec is `*.visual.ts` in its unit's slot
export const isTest = (f) => /(^|\/)__tests__\//.test(f) || /\.(test|spec|test-d)\.(ts|tsx|mts)$/.test(f) || /\.visual\.ts$/.test(f);
const under = (f, d) => f === d || f.startsWith(`${d}/`);
const dirOf = (f) => posix.dirname(f);
// LAW §1/§9 (pass 6): the kernel container `_shared` holds files of its own (axes, interaction,
// primitive, selection, useMotionAxis …) beside its modules. Their tests live in its
// `__tests__/` slot, the one slot a container has; every other child of a container is a module.
export const KERNEL_FILES = "src/components/_shared";
const KERNEL_TEST_SLOT = `${KERNEL_FILES}/__tests__`;
/** FD-3, the floor's one predicate (P3-R3: a slot is bounded like any dir). */
export const isSlot = (d) => d === KERNEL_TEST_SLOT || (d.includes("/") && floorIsSlot(d) && !CONTAINERS.has(dirOf(d)));
const inSlot = (d) => { const a = d.split("/"); for (let i = 2; i <= a.length; i++) if (isSlot(a.slice(0, i).join("/"))) return true; return false; };
export const units = { name: "dir (FD-3 slots)", unitOf(file) { let d = dirOf(file); while (isSlot(d)) d = dirOf(d); return d; } };

/** The floor namespace the law reads (lib/law.mjs takes it as `F`). */
const F = { makeOrigins, CONTAINERS: FLOOR_CONTAINERS, isSlot: floorIsSlot, proposedPath, sccGrowth };
export { doorModule };

/** The reviewed pin (B11, B15): modules, door names, reviewed file names. One path (B-11). */
export const PIN_PATH = "scripts/structure/records/seal-pin.json";
export const readPin = (root) => {
    const p = posix.join(root, PIN_PATH);
    if (!existsSync(p)) throw new Error(`seal: the pin ${p} is missing; the gate has no off switch`);
    return JSON.parse(readFileSync(p, "utf8"));
};

// B15 name floor (LAW §11). A placeholder stem names no role. A stem or directory that ends in
// a number numbers a copy or a slice, with or without a separator (`helpers2`, `utils-3`,
// `motion2`, `GlassDock-2`, `part-1`, a wave id `bs11`), and one that ends in `Part` or
// `Split` (optionally numbered) names a slice of another file, not a concept (pass 6, B-07).
// A test stem is judged without its kind suffix (`suffuse2.spec.ts` → `suffuse2`). A name the
// pin reviews (`names`, each with its reason) is exempt.
const PLACEHOLDER_STEM = "utils?|helpers?|misc|common|stuff|tmp|temp|new|old|legacy|compat";
const PROVENANCE = "\\d+|(^|[-_])(part|split)[-_]?\\d*|(Part|Split)\\d*";
const PLACEHOLDER_DIR = new RegExp(`^(${PLACEHOLDER_STEM})[-_]?\\d*$|^(v\\d+|part-?\\d+|[wp]\\d+)$|(${PROVENANCE})$`);
const PLACEHOLDER_FILE = new RegExp(`^(use|index\\d+|(${PLACEHOLDER_STEM})[-_]?\\d*)$|(${PROVENANCE})$`);
const stemOf = (f) => posix.basename(f).replace(/\.(d\.ts|ts|tsx|mts|mjs|js|vue|css)$/, "").replace(/\.(glsl|wgsl|vert|frag)$/, "").replace(/\.(test|spec|test-d|visual)$/, "");
const headToken = (stem) => { const s = stem.replace(/^use(?=[A-Z])/, ""); const m = /^[A-Z]?[a-z0-9]+/.exec(s); return m ? m[0].toLowerCase() : ""; };

export function seal(root, { overlay = {} } = {}) {
    const pin = readPin(root);
    const g = buildGraph(root, { overlay });
    const T = g.tree;
    const ts = createRequire(`${T.root}/package.json`)("typescript");
    const postcss = createRequire(`${T.root}/package.json`)("postcss");

    // ---------------------------------------------------------------- the published set (F-3)
    const PUB_JS = new Set(g.record.js.map(([, s]) => s));
    const PUB_CSS = new Set(g.record.css.map(([, t]) => t.source).filter(Boolean));
    const PUB_ASSETS = g.record.css.map(([, t]) => t.assets).filter(Boolean);
    const PUB = new Set([...PUB_JS, ...PUB_CSS, ...T.files.filter((f) => PUB_ASSETS.some((a) => f.startsWith(a)))]);

    // ---------------------------------------------------------------- the module tree
    const filesIn = new Map();
    for (const f of T.files) { const d = dirOf(f); if (!filesIn.has(d)) filesIn.set(d, []); filesIn.get(d).push(f); }
    const allDirs = [...T.dirs].filter((d) => ZONES5.includes(zoneOf(`${d}/x`)));
    const subtreeHasCode = new Map();
    for (const f of T.files) if (CODE.test(f) && !isTest(f)) { let d = dirOf(f); while (d !== "." && !subtreeHasCode.has(d)) { subtreeHasCode.set(d, true); d = dirOf(d); } }
    const doorFilesOf = (d) => DOOR_BASENAMES.map((b) => `${d}/${b}`).filter((p) => T.isFile(p));
    const sealedCodeDirs = allDirs.filter((d) => SEALED.includes(zoneOf(`${d}/x`)) && subtreeHasCode.get(d) && !CONTAINERS.has(d) && !isSlot(d) && !inSlot(d));
    const modules = sealedCodeDirs.filter((d) => doorFilesOf(d).length).sort((a, b) => a.length - b.length);
    const modSet = new Set(modules);
    // LAW §1: a src module's JS door is index.ts; a scripts module's is index.mjs, or index.ts
    // when its own code is TypeScript ("befitting their languages")
    const tsScripts = (m) => { const own = (filesIn.get(m) ?? []).filter((f) => /\.(ts|mts|mjs|js)$/.test(f) && !isTest(f) && !/\.d\.m?ts$/.test(f) && !DOOR_BASENAMES.includes(posix.basename(f))); return own.length > 0 && own.every((f) => /\.m?ts$/.test(f)); };
    const jsDoor = (m) => (m.startsWith("scripts") ? `${m}/index.${tsScripts(m) ? "ts" : "mjs"}` : `${m}/index.ts`);
    const cssDoor = (m) => `${m}/index.css`;
    const isDoorOf = (m, f) => f === jsDoor(m) || f === cssDoor(m);
    const isDoorFile = (f) => DOOR_BASENAMES.includes(posix.basename(f)) && (modSet.has(dirOf(f)) || CONTAINERS.has(dirOf(f)));
    const chain = (f) => modules.filter((m) => under(f, m));
    const outerM = (from, to) => modules.find((m) => under(to, m) && !under(from, m));
    const innerM = (f) => chain(f).pop();
    // LAW §5 · a module whose door is a published entry is the surface. A name that entry does
    // not publish is reached through the door of the sub-module that holds it: the crossing
    // may target the JS door of any module S on the file's chain below M when every door
    // from M down to S's parent is a published entry (the surface does not grow, and no
    // reader reaches past a door).
    const subDoorOfEntry = (M, to) => {
        if (!to.endsWith("/index.ts")) return false;
        const S = dirOf(to);
        if (!modSet.has(S) || !under(S, M) || S === M) return false;
        for (let m = dirOf(S); ; m = dirOf(m)) { if (!PUB_JS.has(jsDoor(m)) && modSet.has(m)) return false; if (m === M) return true; if (!under(m, M)) return false; }
    };

    // ---------------------------------------------------------------- edge classes
    const MODULE_KINDS = new Set(["import", "import-type", "import-type-node", "import-side-effect", "reexport", "reexport-star", "reexport-ns", "dynamic", "dynamic-template", "require", "vi-mock", "sfc-style-src", "sfc-template-src", "sfc-script-src", "css-import", "sfc-inline-css-import", "css-url", "css-reference", "template-asset", "glob"]);
    const READ_KINDS = new Set(["path-literal", "path-helper", "new-url", "ts-reference"]);
    const WALK_KINDS = new Set(["scan", "glob-literal"]);
    const CSS_KINDS = new Set(["css-import", "sfc-style-src", "sfc-inline-css-import"]);
    const reach = (e) => e.to && !e.dir && (MODULE_KINDS.has(e.kind) || READ_KINDS.has(e.kind)) && zoneOf(e.from) !== "other" && zoneOf(e.to) !== "other";
    const isCss = (e) => CSS_KINDS.has(e.kind) && e.to.endsWith(".css");

    const V = {}; const put = (k, s) => V[k].push(s);
    const CLAUSES = ["B0", "B1", "B2", "B3", "B4", "B5", "B6", "B7", "B8", "B9", "B10", "B11", "B12", "B13", "B14", "B15", "B16", "B17"];
    for (const k of CLAUSES) V[k] = [];
    const b0 = { f1: 0, walks: 0, computed: 0 };

    // ---- B0 · resolution (every F-1 violation, self-name-in-src included), walks, computed reads
    for (const v of g.violations) b0.f1++, put("B0", `${v.from}:${v.line ?? ""} ${v.kind} [${v.edgeKind ?? ""}] ${v.spec ?? ""}`);
    // B0's walk arm (pass 5, B-S12): a directory listing, read from the syntax (walks.mjs),
    // and F-1's scanner edges into a sealed zone (a static directory head with a run-time
    // tail, a glob literal). A directory named by a string is not a walk: only a listing is.
    const walkers = new Set();
    const exempt = (f) => HARNESS.test(f) || under(f, "scripts/structure") || PLAYWRIGHT_PROGRAM.test(f); // the harness and the floor runtime ARE the tree's readers (R-3, FD-11); a Playwright config's patterns are its runner's collection
    for (const w of directoryWalks(ts, T, { zones: ZONES5, zoneOf, exempt })) {
        const k = `${w.file}:${w.line}`; if (walkers.has(k)) continue; walkers.add(k);
        b0.walks++; put("B0", `${w.file}:${w.line} walk: ${w.call} [listing]`);
    }
    for (const e of g.edges) {
        if (!WALK_KINDS.has(e.kind) || !e.to || exempt(e.from) || !ZONES5.includes(zoneOf(e.from))) continue;
        const tz = zoneOf(e.dir ? `${e.to}/x` : e.to);
        if (!SEALED.includes(tz)) continue;
        const k = `${e.from}:${e.line}`; if (walkers.has(k)) continue; walkers.add(k);
        b0.walks++; put("B0", `${e.from}:${e.line} walk of ${e.dir ? `${e.to}/` : e.glob ?? e.to} [${e.kind}]`);
    }
    for (const c of g.census) if (["tests", "tests-visual", "scripts"].includes(zoneOf(c.from)) && !HARNESS.test(c.from) && !under(c.from, "scripts/structure") && COMPUTED.has(c.kind)) b0.computed++, put("B0", `${c.from}:${c.line} computed-path read ${String(c.spec).slice(0, 60)} [${c.kind}]`);

    // ---- B1 door (recursive) + own door · B2 consumer (R-10, R-3) · B3 CSS door · B8b library → consumer zone
    for (const e of g.edges) {
        if (!reach(e) || e.from === e.to) continue;
        const zf = zoneOf(e.from), zt = zoneOf(e.to);
        // LAW §9 (B8's test arm): a colocated test is not library code; it may read the test
        // harness (the tests zone: helpers, setup) and the repo root, never a consumer zone
        if (zf === "src" && zt !== "src" && !(isTest(e.from) && (zt === "tests" || zt === "root"))) { put("B8", `${e.from}:${e.line} -> ${e.to} [${e.kind}] (the library reads the ${zt} zone)`); continue; }
        if (zf === "src" && zt !== "src") continue;
        if (!SEALED.includes(zt)) continue;
        // LAW §5 (the test seam): a test's text read (READ_KINDS) and its vi.mock target are not
        // consumption. A read is a scan (R-3 keeps the library-wide ones in tests/, B0 keeps them
        // visible, B16 homes a single-subject reader); a mock names the file its subject loads,
        // which a door cannot stand in for (mocking the door replaces every name it carries)
        const seam = isTest(e.from) && (READ_KINDS.has(e.kind) || e.kind === "vi-mock");
        // B2 (R-10, LAW §5): a consumer module reference into src targets an entry source
        if (zt === "src" && zf !== "src") { if (!HARNESS.test(e.from) && !PUB.has(e.to) && MODULE_KINDS.has(e.kind) && !seam) put("B2", `${e.from}:${e.line} -> ${e.to} [${e.kind}]`); continue; }
        const own = innerM(e.from);
        if (own && isDoorOf(own, e.to) && !isTest(e.from) && !e.kind.startsWith("reexport") && !isCss(e)) { put("B1", `${e.from}:${e.line} -> ${e.to} (own door)`); continue; }
        const M = outerM(e.from, e.to);
        if (!M) continue;
        // LAW §5 · a colocated test reads its home's subtree at any depth (R-3: its subject is
        // the module's inside); it still crosses every other module through the door
        { const home = /^(.*)\/__tests__\//.exec(e.from)?.[1]; if (home && isTest(e.from) && under(e.to, home)) continue; }
        if (seam) continue;
        if (isCss(e)) { if (e.to !== cssDoor(M) && !PUB_CSS.has(e.to)) put("B3", `${e.from}:${e.line} -> ${e.to} (css door ${cssDoor(M)})`); continue; }
        if (isDoorOf(M, e.to) || PUB.has(e.to) || subDoorOfEntry(M, e.to)) continue;
        put("B1", `${e.from}:${e.line} -> ${e.to}${e.typeOnly ? " [type]" : ""} [${e.kind}] (door ${jsDoor(M)})`);
    }

    // ---- B4 acyclic: value and type edges among sibling nodes at every depth
    const adjBy = new Map(); const typeOnlyPair = new Map();
    for (const e of g.edges) {
        if (!e.to || e.dir || isTest(e.from) || isTest(e.to)) continue;
        const isVal = VALUE_KINDS.has(e.kind) && !e.typeOnly;
        const isType = /^import-type/.test(e.kind) || (e.typeOnly && (VALUE_KINDS.has(e.kind) || e.kind.startsWith("reexport")));
        if (!isVal && !isType) continue;
        const zf = zoneOf(e.from); if (zf !== zoneOf(e.to) || !SEALED.includes(zf)) continue;
        const ca = chain(e.from), cb = chain(e.to); const common = ca.filter((m) => cb.includes(m)).pop() ?? zf;
        const node = (f, c) => c.find((m) => m !== common && under(m, common) && (chain(m).filter((y) => y !== m).pop() ?? zf) === common) ?? f;
        const a = node(e.from, ca), b = node(e.to, cb); if (a === b) continue;
        if (!adjBy.has(common)) adjBy.set(common, new Map()); const A = adjBy.get(common);
        if (!A.has(a)) A.set(a, new Map()); if (!A.has(b)) A.set(b, new Map());
        if (!A.get(a).has(b)) A.get(a).set(b, `${e.from} -> ${e.to}${isVal ? "" : " [type]"}`);
        const k = `${a}|${b}`; typeOnlyPair.set(k, (typeOnlyPair.get(k) ?? true) && !isVal);
    }
    const tarjan = (adj) => { let i = 0; const I = new Map(), L = new Map(), st = [], on = new Set(), out = [];
        const sc = (x) => { I.set(x, i); L.set(x, i++); st.push(x); on.add(x); for (const w of adj.get(x).keys()) { if (!I.has(w)) { sc(w); L.set(x, Math.min(L.get(x), L.get(w))); } else if (on.has(w)) L.set(x, Math.min(L.get(x), I.get(w))); }
            if (L.get(x) === I.get(x)) { const c = []; let w; do { w = st.pop(); on.delete(w); c.push(w); } while (w !== x); if (c.length > 1) out.push(c); } };
        for (const x of adj.keys()) if (!I.has(x)) sc(x); return out; };
    // LAW §8: every sibling cycle counts, files in one directory included (cB O-1)
    for (const [lvl, adj] of adjBy) for (const c of tarjan(adj)) {
        const S = new Set(c); const why = c.flatMap((a) => [...adj.get(a)].filter(([b]) => S.has(b)).map(([, w]) => w));
        const typeOnly = c.every((a) => [...adj.get(a).keys()].filter((b) => S.has(b)).every((b) => typeOnlyPair.get(`${a}|${b}`)));
        put("B4", `cycle @${lvl} [${c.map((x) => x.replace(`${lvl}/`, "")).join(" ")}]${typeOnly ? " (type-only)" : ""} via ${why.slice(0, 3).join(" ; ")}`);
    }

    // ---- B5 kind slot: no door, no sub-dir
    for (const d of allDirs) {
        if (!SEALED.includes(zoneOf(`${d}/x`))) continue;
        if (isSlot(d) && doorFilesOf(d).length) put("B5", `${doorFilesOf(d).join(",")} (door in a kind slot)`);
        if (isSlot(dirOf(d))) put("B5", `${d} (dir inside kind slot ${dirOf(d)})`);
    }

    // ---- B6 bounds (R-5, P3-R3 strict): every zone, tests counted, every dir bounded (slots too);
    //      a hand-written root config is bounded by lines only (P5-R4: the root dir is not counted)
    for (const d of allDirs) {
        const n = (filesIn.get(d) ?? []).length;
        if (n > 12) put("B6", `${d}/: ${n} direct files > 12`);
    }
    for (const f of T.files) {
        if (!(ZONES5.includes(zoneOf(f)) || zoneOf(f) === "root") || !CODE.test(f)) continue;
        const text = T.read(f);
        if (text === null || text === undefined) throw new Error(`seal B6: ${f} is unreadable`);
        const n = text.split("\n").length - (text.endsWith("\n") ? 1 : 0);
        if (n > 500) put("B6", `${f}: ${n} lines > 500`);
    }

    // ---- B7 mandatory seal: every code dir in a sealed zone is a module, a kind slot or a container
    for (const d of sealedCodeDirs) {
        const own = filesIn.get(d) ?? [];
        const hasScript = own.some((f) => /\.(ts|vue|mjs)$/.test(f) && !isTest(f) && !/\.d\.m?ts$/.test(f));
        if (!doorFilesOf(d).length) put("B7", `${d}/ (${own.length} direct files, no door)`);
        else if (hasScript && !T.isFile(jsDoor(d))) put("B7", `${d}/ (script code behind a CSS-only door: ${jsDoor(d)} missing)`);
        else if (d.startsWith("src/") && T.isFile(jsDoor(d)) && !g.record.doors.includes(jsDoor(d)) && !PUB_JS.has(jsDoor(d))) put("B7", `${jsDoor(d)} (not in record.doors)`);
    }

    // ---- B8a rank: the kernel reads no unit (type-only and re-exports included; aggregates are doors)
    for (const e of g.edges) {
        if (!reach(e) || isTest(e.from) || AGGREGATES.has(e.from)) continue;
        if (KERNEL(e.from) && UNIT_FILE(e.to)) put("B8", `${e.from}:${e.line} -> ${e.to}${e.typeOnly ? " [type]" : ""} [${e.kind}] (kernel reads a unit)`);
    }

    // ---- B9 one symbol, one door (R-6, P3-R4): a door re-exports only its module's subtree (LAW §1)
    const O = makeOrigins(g);
    const doorLike = (f) => isDoorFile(f) || PUB_JS.has(f);
    for (const e of g.edges) {
        if (!e.to || !e.kind.startsWith("reexport") || !doorLike(e.from) || AGGREGATES.has(e.from)) continue;
        const scope = PUB_JS.has(e.from) ? doorModule(e.from) : dirOf(e.from);
        if (!under(e.to, scope)) put("B9", `${e.from}:${e.line} re-exports ${e.to} (outside ${scope})`);
    }
    const onEntries = new Map();
    for (const [name, src] of g.record.js) {
        if (name === "index") continue;
        for (const [n, os] of O.exportsOf(src)) for (const o of os) { const k = `${o.file}#${o.name === "*" ? n : o.name}`; if (!onEntries.has(k)) onEntries.set(k, new Set()); onEntries.get(k).add(name); }
    }
    const multi = [...onEntries].filter(([, s]) => s.size > 1);
    for (const [k, s] of multi) put("B9", `${k} on ${[...s].map((x) => `./${x}`).join(" + ")}`);

    // ---- B10 placement: F-7 over R-2 units (FD-3), B's anchor (LAW §2), src and scripts (B-05),
    //      at the depth FD-2 permits (LAW §4); a hold is named in the pin with its floor reason
    const anchor = lawAnchor(F, g, O);
    const P = placeAll(placementGraph(g), units, { zones: SEALED, anchor }); // LAW §4: a test is not a reader
    const law = placementViolations(F, g, P.rows, { holds: pin.holds ?? {} });
    const anchored = P.rows.filter((r) => r.class === "anchored").length;
    for (const r of law.violations) put("B10", `${r.file} -> ${r.home} [${r.class}] readers: ${r.readerUnits.join(", ")}`);
    for (const f of Object.keys(pin.holds ?? {})) if (!law.held.some((h) => h.file === f)) put("B10", `${f} (a pinned hold the law no longer needs)`);

    // ---- B11 surface: internal-door names with no outside reader; empty doors; the pin (names + module set)
    const readersOfKey = new Map();
    for (const e of g.edges) {
        if (!e.to || !e.names?.length || e.kind.startsWith("reexport") || doorLike(e.from)) continue;
        for (const n of e.names) for (const o of O.originOf(e.to, n.imported)) { const k = `${o.file}#${o.name}`; if (!readersOfKey.has(k)) readersOfKey.set(k, new Set()); readersOfKey.get(k).add(e.from); }
    }
    const publishedKeys = new Set();
    for (const [, src] of g.record.js) for (const [, os] of O.exportsOf(src)) for (const o of os) publishedKeys.add(`${o.file}#${o.name}`);
    const pinNow = { modules: [...modules].sort(), doors: {}, names: pin?.names ?? {}, holds: pin?.holds ?? {} };
    for (const m of modules) {
        const d = jsDoor(m); if (!T.isFile(d)) continue;
        const ex = O.exportsOf(d); pinNow.doors[d] = [...ex.keys()].sort();
        if (!ex.size) { put("B11", `${d} exports nothing`); continue; }
        if (PUB.has(d) || AGGREGATES.has(d)) continue;
        for (const [n, os] of ex) {
            if (os.some((o) => publishedKeys.has(`${o.file}#${o.name}`))) continue;
            const outside = os.some((o) => [...(readersOfKey.get(`${o.file}#${o.name}`) ?? [])].some((r) => !under(r, m)));
            if (!outside) put("B11", `${d} exports ${n} (no reader outside ${m})`);
        }
    }
    {
        const a = new Set(pin.modules ?? []), b = new Set(pinNow.modules);
        for (const m of b) if (!a.has(m)) put("B11", `module ${m} (not in the pin)`);
        for (const m of a) if (!b.has(m)) put("B11", `module ${m} (pinned, now gone)`);
        for (const d of new Set([...Object.keys(pin.doors ?? {}), ...Object.keys(pinNow.doors)])) {
            const x = new Set(pin.doors?.[d] ?? []), y = new Set(pinNow.doors[d] ?? []);
            for (const n of y) if (!x.has(n)) put("B11", `${d} +${n} (not in the pin)`);
            for (const n of x) if (!y.has(n)) put("B11", `${d} -${n} (pinned, now gone)`);
        }
    }

    // ---- B12 relays: only a door re-exports; no declaration mirror
    for (const e of g.edges) {
        if (!e.to || !e.kind.startsWith("reexport") || !SEALED.includes(zoneOf(e.from)) || doorLike(e.from) || isTest(e.from)) continue;
        put("B12", `${e.from}:${e.line} re-exports ${e.to} (relay)`);
    }
    for (const f of T.files) { const m = /^(.*)\.d\.(m?ts)$/.exec(f); if (m && SEALED.includes(zoneOf(f)) && [".mjs", ".ts", ".js", ".vue"].some((x) => T.isFile(m[1] + x))) put("B12", `${f} (declaration mirror of ${m[1]})`); }

    // ---- B13 bins: a package.json script token or a CI token (FD-10) names a bin; a bin is imported by nothing but the harness
    // LAW §7: a bin is an executable, named by a package.json script token or a CI run token
    // (FD-10). A root config that imports a scripts module reads a library module; that does
    // not make it a bin (the build's entry-record reader is imported by the config and the floor).
    const BIN_KINDS = new Set(["json-command", "yaml-command"]);
    const bins = new Set(g.edges.filter((e) => e.to && zoneOf(e.to) === "scripts" && BIN_KINDS.has(e.kind)).map((e) => e.to));
    for (const e of g.edges) if (bins.has(e.to) && MODULE_KINDS.has(e.kind) && zoneOf(e.from) !== "root" && !HARNESS.test(e.from) && !isTest(e.from)) put("B13", `${e.from}:${e.line} imports the bin ${e.to} [${e.kind}]`);

    // ---- B14 door purity: a JS door holds only `export … from`; a CSS door only @import, @layer
    //      statements and an @source over its own subtree (P3-R8)
    const doorsToJudge = new Set([...modules.flatMap((m) => doorFilesOf(m)), ...g.record.doors.filter((d) => T.isFile(d))]);
    for (const d of doorsToJudge) {
        const text = T.read(d) ?? "";
        if (d.endsWith(".css")) {
            let r; try { r = postcss.parse(text); } catch { put("B14", `${d} (unparseable)`); continue; }
            const bad = r.nodes.filter((n) => {
                if (n.type === "comment") return false;
                if (n.type === "atrule" && (n.name === "import" || (n.name === "layer" && !n.nodes))) return false;
                if (n.type === "atrule" && n.name === "source") {
                    const glob = n.params.replace(/^not\s+/, "").replace(/^["']|["']$/g, "");
                    const target = posix.normalize(posix.join(dirOf(d), glob));
                    return !under(target, dirOf(d)) && !target.startsWith(`${dirOf(d)}/`);
                }
                return true;
            });
            if (bad.length) put("B14", `${d}:${bad[0].source?.start?.line} holds ${bad.length} non-door node(s), first ${bad[0].type === "rule" ? `rule ${bad[0].selector}` : `@${bad[0].name ?? bad[0].type} ${bad[0].params ?? ""}`}`);
        } else {
            const sf = ts.createSourceFile(d, text, ts.ScriptTarget.Latest, true);
            const bad = sf.statements.filter((s) => !(ts.isExportDeclaration(s) && s.moduleSpecifier));
            if (bad.length) put("B14", `${d}:${sf.getLineAndCharacterOfPosition(bad[0].getStart()).line + 1} holds ${bad.length} statement(s) that are not \`export … from\`, first ${ts.SyntaxKind[bad[0].kind]}`);
        }
    }

    // ---- B15 names (B-07): dir segments and file stems, in all five zones (R-5's zones; the
    //      module-shape arms judge only the sealed zones, where modules are declared)
    const anyCode = new Set();
    for (const f of T.files) if (CODE.test(f) && ZONES5.includes(zoneOf(f))) { let d = dirOf(f); while (d !== "." && !anyCode.has(d)) { anyCode.add(d); d = dirOf(d); } }
    const componentUnits = new Set(T.files.filter((f) => /^src\/components\/[^/_][^/]*\//.test(f)).map((f) => f.split("/")[2]));
    const reviewed = new Map(Object.entries(pin.names ?? {}));
    for (const d of allDirs) {
        if (!anyCode.has(d) || CONTAINERS.has(d) || ZONES5.includes(d)) continue;
        const seg = posix.basename(d), parent = posix.basename(dirOf(d));
        if (PLACEHOLDER_DIR.test(seg)) put("B15", `${d} (placeholder name)`);
        if (seg === parent && !CONTAINERS.has(dirOf(d))) put("B15", `${d} (repeats its parent)`);
        if (!SEALED.includes(zoneOf(`${d}/x`))) continue;
        if (KIND_SLOTS.has(seg) && !isSlot(d) && !CONTAINERS.has(dirOf(d))) put("B15", `${d} (a module named as a kind slot)`);
    }
    for (const f of T.files) {
        if (!ZONES5.includes(zoneOf(f)) || !CODE.test(f) || DOOR_BASENAMES.includes(posix.basename(f))) continue;
        const stem = stemOf(f);
        if (PLACEHOLDER_FILE.test(stem) && !reviewed.has(f)) { put("B15", `${f} (placeholder file name)`); continue; }
        const m = /^src\/components\/([^/_][^/]*)\//.exec(f);
        if (!m) continue;
        const tok = headToken(stem);
        if (tok && tok !== m[1] && componentUnits.has(tok) && !f.split("/").includes(tok) && !reviewed.has(f)) put("B15", `${f} (named for the unit ${tok}, lives in ${m[1]}; not in the pin's reviewed names)`);
    }
    for (const [f] of reviewed) if (!T.isFile(f)) put("B15", `${f} (a reviewed name the tree no longer holds)`);

    // ---- B16 R-3: a test lives with its subject. Subject: the sealed files its reads resolve
    //      to (by symbol through doors; path reads counted), less the kernel when it reads a
    //      unit: a unit test uses the kernel as a unit file does, a rank below it (B8), so the
    //      kernel is its subject only when it reads nothing else. Home: the deepest module or
    //      unit holding every subject; none when the subject spans a container, a zone or a dir.
    //      A test is a `*.test.ts`, `*.test-d.ts` or `*.spec.ts`; any other file in a slot is a
    //      helper, read only by the tests of that slot.
    const moduleOrUnit = (d) => modSet.has(d) || (/^src\/components\/[^/]+$/.test(d) && d !== "src/components/_shared");
    const homeOf = (subj) => {
        if (!subj.length) return null;
        // LAW §9 (pass 6): a subject made only of the kernel container's own files is homed in
        // that container's test slot (a subject that reaches into one of its modules is not)
        if (subj.every((f) => dirOf(f) === KERNEL_FILES)) return KERNEL_FILES;
        let d = subj.map(dirOf).reduce((a, b) => { const x = a.split("/"), y = b.split("/"); const o = []; for (let i = 0; i < x.length && x[i] === y[i]; i++) o.push(x[i]); return o.join("/"); });
        while (d && d !== "." && !moduleOrUnit(d)) { if (CONTAINERS.has(d) || ZONES5.includes(d)) return null; d = dirOf(d); }
        return d && d !== "." ? d : null;
    };
    // P5-R5 · the subject of a page-driving visual spec is the unit whose story it drives. A
    // spec opens a story by a route literal in its own text (`"/display/buttons"`), and the
    // story manifest's key rule names the story's file: the one `demo/stories/<category>/**/<id>.vue`
    // (manifest/lazy.ts `storyKey`). A story's units are the component units its own files reach
    // through their entries (the story file and the files of its category it reads, at any depth).
    // A spec's subject is the sealed files it reads; a spec that reads none takes its stories' units.
    const pw = playwrightProgram(g, ts);
    const inProgram = new Set(pw.specs);
    const STORY_ROOT = "demo/stories/";
    const storyFiles = T.files.filter((f) => f.startsWith(STORY_ROOT) && f.endsWith(".vue") && !f.endsWith(".tile.vue"));
    const ROUTE = /^\/([a-z0-9][a-z0-9-]*)\/([a-z0-9][a-z0-9-]*)\/?(?:[?#].*)?$/;
    const storyOf = (route) => { const m = ROUTE.exec(route); if (!m) return null; const hits = storyFiles.filter((f) => f.startsWith(`${STORY_ROOT}${m[1]}/`) && f.endsWith(`/${m[2]}.vue`)); return hits.length === 1 ? hits[0] : null; };
    const outOf = new Map(); for (const e of g.edges) if (e.to && !e.dir && MODULE_KINDS.has(e.kind)) { if (!outOf.has(e.from)) outOf.set(e.from, []); outOf.get(e.from).push(e.to); }
    const unitOfSrc = (f) => { const m = /^src\/components\/([^/_][^/]*)\//.exec(f); return m ? `src/components/${m[1]}` : KERNEL(f) ? "kernel" : "src"; };
    const storyUnits = (story) => {
        const cat = story.split("/").slice(0, 3).join("/");
        const seen = new Set([story]), units = new Set(), todo = [story];
        while (todo.length) for (const to of outOf.get(todo.pop()) ?? []) {
            if (zoneOf(to) === "src") units.add(unitOfSrc(to));
            else if (under(to, cat) && !seen.has(to)) { seen.add(to); todo.push(to); }
        }
        const above = [...units].filter((u) => u !== "kernel");
        return above.length ? above : [...units];
    };
    const routesOf = (t) => { const out = new Set(); const sf = ts.createSourceFile(t, T.read(t), ts.ScriptTarget.Latest, true); const v = (n) => { if ((ts.isStringLiteral(n) || ts.isNoSubstitutionTemplateLiteral(n)) && ROUTE.test(n.text)) out.add(n.text); ts.forEachChild(n, v); }; v(sf); return [...out]; };
    const PW_TEST = /\.(spec|test)\.(ts|tsx|mts)$|\.visual\.ts$/;
    for (const t of T.files) {
        if (!TEST_FILE.test(t) || HARNESS.test(t)) continue;
        const visual = zoneOf(t) === "tests-visual" || /\.visual\.ts$/.test(t);
        if (visual && !inProgram.has(t)) continue; // membership is judged below
        if (!visual && zoneOf(t) !== "tests" && !/(^|\/)__tests__\//.test(t)) continue;
        const reads = new Set(O.readsOf(t));
        let spans = false;
        for (const e of g.edges) if (e.from === t && e.to && READ_KINDS.has(e.kind)) { if (e.dir) spans = true; else reads.add(e.to); }
        const sealedReads = [...reads].filter((f) => SEALED.includes(zoneOf(f)) && !isTest(f) && !under(f, "scripts/structure"));
        const above = sealedReads.filter((f) => !KERNEL(f));
        let subj = above.length ? above : sealedReads;
        let foreign = [...reads].some((f) => ["demo", "tests-visual"].includes(zoneOf(f)));
        // P5-R5: a visual spec that reads no sealed file is subject to the stories it opens
        let viaStory = null;
        if (visual && !subj.length) {
            const stories = routesOf(t).map(storyOf).filter(Boolean);
            const us = [...new Set(stories.flatMap(storyUnits))];
            viaStory = stories.length;
            subj = us.length === 1 && us[0].startsWith("src/components/") ? [`${us[0]}/index.ts`] : [];
            foreign = false;
        }
        const home = spans || foreign ? null : homeOf(subj);
        const slot = /^(.*)\/__tests__\//.exec(t)?.[1] ?? null;
        const named = viaStory !== null ? ` (by the ${viaStory} stor${viaStory === 1 ? "y" : "ies"} it opens)` : "";
        if (slot === null && home) put("B16", `${t} (subject in ${home}${named}: belongs in ${home}/__tests__/${visual ? " as *.visual.ts" : ""})`);
        else if (slot !== null && home !== slot) put("B16", `${t} (colocated in ${slot}; its subject's home is ${home ?? "the harness (several units)"}${named})`);
    }
    // R-3 · the Playwright program holds every Playwright test file in the five zones: a file
    // that declares Playwright tests (a top-level `test(…)`/`test.describe(…)` call on a `test`
    // imported from anything but vitest) and that the program does not collect silently never runs
    for (const t of T.files) {
        if (!ZONES5.includes(zoneOf(t)) || !/\.(ts|tsx|mts)$/.test(t) || /\.d\.ts$/.test(t) || inProgram.has(t)) continue;
        const text = T.read(t);
        if (!/\btest\b/.test(text) || !/@playwright\/test|\btest\b[^;]*from/.test(text)) continue;
        const sf = ts.createSourceFile(t, text, ts.ScriptTarget.Latest, true);
        let testFrom = null;
        for (const st of sf.statements) if (ts.isImportDeclaration(st) && st.importClause?.namedBindings && ts.isNamedImports(st.importClause.namedBindings) && st.importClause.namedBindings.elements.some((el) => el.name.text === "test" && !el.isTypeOnly)) testFrom = st.moduleSpecifier.text;
        if (!testFrom || /^vitest(\/|$)/.test(testFrom)) continue;
        const declares = sf.statements.some((st) => { if (!ts.isExpressionStatement(st)) return false; let x = st.expression; while (ts.isAwaitExpression(x)) x = x.expression; if (!ts.isCallExpression(x)) return false; let c = x.expression; while (ts.isPropertyAccessExpression(c)) c = c.expression; return ts.isIdentifier(c) && c.text === "test"; });
        if (declares) put("B16", `${t} (declares Playwright tests outside the program ${pw.config}: it never runs)`);
    }
    for (const h of T.files) {
        const slot = /^(.*\/__tests__)\/[^/]+$/.exec(h)?.[1];
        if (!slot || TEST_FILE.test(h) || !SEALED.includes(zoneOf(h))) continue;
        const readers = [...new Set(g.edges.filter((e) => e.to === h && e.from !== h).map((e) => e.from))];
        if (!readers.length || readers.some((r) => dirOf(r) !== slot || !TEST_FILE.test(r))) put("B16", `${h} (a helper in ${slot}/ read by ${readers.filter((r) => dirOf(r) !== slot || !TEST_FILE.test(r)).join(", ") || "nothing"})`);
    }

    // ---- B17 no masking fallback (LAW §10; the reader is fallbacks.mjs)
    for (const line of maskingFallbacks(ts, T, zoneOf, ZONES5)) put("B17", line);

    const counts = Object.fromEntries(Object.entries(V).map(([k, l]) => [k, l.length]));
    const total = Object.values(counts).reduce((a, b) => a + b, 0);
    const meta = { b0, files: T.files.length, edges: g.edges.length, modules: modules.length, required: sealedCodeDirs.length, b10: { anchored, bound: law.bound.map((r) => r.file), held: law.held.map((r) => r.file), counted: V.B10.length }, multiDoorSymbols: multi.length, pin: { modules: pinNow.modules.length, doors: Object.keys(pinNow.doors).length, names: Object.values(pinNow.doors).reduce((a, b) => a + b.length, 0), reviewed: reviewed.size } };
    return { total, counts, V, meta, pinNow, clauses: CLAUSES };
}

const isMain = process.argv[1] && resolve(process.argv[1]) === resolve(import.meta.dirname, "seal.mjs");
if (isMain) {
    const args = process.argv.slice(2);
    // B-11: the CLI takes exactly these options; any other (a `--pin`, a `--no-pin`) is refused,
    // never ignored, so no caller can believe it judged against another pin
    const FLAGS = new Set(["--verbose"]), VALUED = new Set(["--root", "--json", "--overlay", "--write-pin"]);
    for (let i = 0; i < args.length; i++) { if (VALUED.has(args[i])) { i++; continue; } if (!FLAGS.has(args[i])) throw new Error(`seal: unknown option ${args[i]} (the pin has one path, ${PIN_PATH})`); }
    const opt = (k, d = null) => (args.includes(k) ? args[args.indexOf(k) + 1] : d);
    const root = resolve(opt("--root", resolve(import.meta.dirname, "../../..")));
    const r = seal(root, {
        overlay: opt("--overlay") ? JSON.parse(readFileSync(opt("--overlay"), "utf8")) : {},
    });
    for (const [k, list] of Object.entries(r.V)) {
        console.log(`${list.length ? "FAIL" : "PASS"} ${k} ${list.length}`);
        for (const s of args.includes("--verbose") ? list : list.slice(0, 3)) console.log(`   ${s}`);
        if (!args.includes("--verbose") && list.length > 3) console.log(`   … ${list.length - 3} more`);
    }
    console.log(`seal ${JSON.stringify(r.meta)}: ${r.total ? `FAIL (${r.total})` : "PASS"}`);
    if (opt("--write-pin")) writeFileSync(opt("--write-pin"), `${JSON.stringify(r.pinNow, null, 1)}\n`);
    if (opt("--json")) writeFileSync(opt("--json"), JSON.stringify({ counts: r.counts, meta: r.meta, V: r.V }, null, 1));
    process.exitCode = r.total ? 1 : 0;
}

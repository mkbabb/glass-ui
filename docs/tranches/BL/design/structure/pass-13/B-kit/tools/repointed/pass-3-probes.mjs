// probes.mjs --wt <replayed tree> --repo <checkout> --base <sha> [--only S-02,B-08]
// Measurement probes, one per checklist item that is not a plant. Prints `ITEM <id> PASS|FAIL|INFO <evidence>`.
// Reads the tree's landed floor (scripts/structure/lib) — never the docs copy.
import { readFileSync, existsSync, readdirSync, statSync } from "node:fs";
import { join, resolve, dirname, basename } from "node:path";
import { execSync } from "node:child_process";
import { pathToFileURL } from "node:url";

const arg = (k, d) => { const i = process.argv.indexOf(k); return i > 0 ? process.argv[i + 1] : d; };
const WT = resolve(arg("--wt")), REPO = resolve(arg("--repo")), BASE = arg("--base");
const only = arg("--only") ? new Set(arg("--only").split(",")) : null;
const sh = (c, cwd = WT) => { try { return execSync(c, { cwd, encoding: "utf8", stdio: ["ignore", "pipe", "pipe"], maxBuffer: 1 << 28 }); } catch (e) { return `EXIT ${e.status}\n${e.stdout ?? ""}${e.stderr ?? ""}`; } };
const out = (id, ok, ev) => console.log(`ITEM ${id} ${ok === null ? "INFO" : ok ? "PASS" : "FAIL"} ${ev}`);
const run = (id, fn) => { if (only && !only.has(id)) return; try { fn(); } catch (e) { out(id, false, `probe threw: ${String(e.message).split("\n")[0]}`); } };
const rd = (p) => readFileSync(join(WT, p), "utf8");
const ex = (p) => existsSync(join(WT, p));
const FL = join(WT, "scripts/structure/lib");
const imp = async (m) => import(pathToFileURL(join(FL, m)));
const SKIP = new Set(["node_modules", ".git", "dist", "dist-demo", "test-results", "playwright-report", ".cache"]);
const walk = (d, acc = []) => { for (const e of readdirSync(join(WT, d), { withFileTypes: true })) {
    if (SKIP.has(e.name) || e.isSymbolicLink()) continue; const p = `${d}/${e.name}`;
    if (e.isDirectory()) walk(p, acc); else acc.push(p); } return acc; };
const dirs = (d, acc = []) => { for (const e of readdirSync(join(WT, d), { withFileTypes: true })) {
    if (SKIP.has(e.name) || !e.isDirectory() || e.isSymbolicLink()) continue; const p = `${d}/${e.name}`; acc.push(p); dirs(p, acc); } return acc; };
const P3 = "docs/tranches/BL/design/structure/pass-3";

let G = null, O = null;
const graph = async () => { if (!G) { const { buildGraph } = await imp("graph.mjs"); G = buildGraph(WT); const { makeOrigins } = await imp("tree/symbols.mjs"); O = makeOrigins(G); } return G; };
const GLOBAL = (f) => /^src\/(composables|styles|fonts)\//.test(f) || f.startsWith("src/components/_shared/");
const record = () => JSON.parse(rd("scripts/structure/records/entry-record.json"));

run("S-01", () => {
    const tracked = sh(`git ls-files ${P3}/B-kit ${P3}/B-proto.md | wc -l`, REPO).trim();
    const onDisk = sh(`find ${P3}/B-kit ${P3}/B-proto.md -type f | wc -l`, REPO).trim();
    const dirty = sh(`git status --porcelain -- ${P3}/B-kit ${P3}/B-proto.md | wc -l`, REPO).trim();
    const scratch = sh(`grep -rlE "/private/tmp|/tmp/|scratchpad" ${P3}/B-kit --include=*.mjs --include=*.json --include=*.sh | wc -l`, REPO).trim();
    const banked = sh(`git ls-files docs/tranches/BL/design/structure/pass-2 | wc -l`, REPO).trim();
    out("S-01", tracked === onDisk && dirty === "0" && scratch === "0", `B-kit tracked ${tracked}/${onDisk} on disk, dirty ${dirty}, kit files naming scratch paths ${scratch}, pass-2 tracked ${banked}`);
});

await (async () => { if (only && !only.has("S-02")) return; try {
    await graph();
    const rec = record(); const bad = [];
    for (const [name, src] of rec.js) {
        if (!GLOBAL(src)) continue;
        for (const [n, origins] of O.exportsOf(src)) for (const o of origins) if (!GLOBAL(o.file)) bad.push(`${name}:${n}←${o.file}`);
    }
    const hooks = ["useClipboard", "useDragVelocity", "useRAFLoop", "useYieldToMain", "useScrollChrome", "useScrollProgress", "useRoutePointer"];
    const where = hooks.map((h) => G.files?.find?.((f) => basename(f).startsWith(`${h}.`)) ?? walk("src").find((f) => basename(f).startsWith(`${h}.`)));
    const home = where.filter((f) => f && f.startsWith("src/composables/")).length;
    out("S-02", bad.length === 0 && home === 7, `global-zone entries re-exporting outside the global zone: ${bad.length}${bad.length ? ` e.g. ${bad.slice(0, 4).join(", ")}` : ""}; kernel hooks home ${home}/7 (${where.join(" ")})`);
} catch (e) { out("S-02", false, `probe threw: ${e.message}`); } })();

run("S-03", () => {
    const pkg = JSON.parse(rd("package.json"));
    const r5 = !!pkg.exports?.["./aurora-config"];
    const rec = record();
    const src = Object.fromEntries(rec.js);
    let r4 = "n/a";
    if (src.blob && src["blob-config"] && O) {
        const a = new Set(O.exportsOf(src.blob).keys()), b = [...O.exportsOf(src["blob-config"]).keys()];
        r4 = b.filter((n) => a.has(n)).length;
    }
    const sources = walk("src").concat(walk("demo")).filter((f) => f.endsWith(".css") || f.endsWith(".vue"))
        .filter((f) => /@source\s+"[^"]*src/.test(rd(f)));
    const r6 = sources.filter((f) => !/@source\s+not\s+"[^"]*__tests__/.test(rd(f)));
    const slots = dirs("src").filter((d) => /\/(composables|__tests__|styles)$/.test(d) && !/^src\/(composables|styles)$/.test(d));
    const over = slots.filter((d) => readdirSync(join(WT, d)).filter((f) => statSync(join(WT, d, f)).isFile()).length > 12);
    const ratchetNow = ex(".bundle-ratchet") ? rd(".bundle-ratchet") : "";
    const ratchetBase = sh(`git show ${BASE}:.bundle-ratchet`, REPO);
    const nums = (t) => (t.match(/\d{4,}/g) ?? []).join(",");
    out("S-03", r5 && (r4 === 0 || r4 === "n/a") && r6.length === 0 && over.length === 0,
        `R5 ./aurora-config ${r5}; R4 names on both blob doors ${r4}; R6 @source-over-src sites without __tests__ negation ${r6.length} ${r6.join(" ")}; R3 slots over 12: ${over.length} ${over.join(" ")}; R9 ratchet numbers equal to base: ${nums(ratchetNow) === nums(ratchetBase)}`);
});

run("S-04", () => {
    const n = sh("grep -c anchor scripts/structure/lib/tree/placement.mjs").trim();
    const p = sh("node scripts/structure/placement.mjs --root . --anchor publication");
    const sk = p.split("\n").filter((l) => /Skeleton\.vue/.test(l) && !/SkeletonLoader|Skeleton[A-Z]/.test(l.replace(/Skeleton\.vue/, "")));
    out("S-04", Number(n) > 0 && !sk.some((l) => /\bmove\b/.test(l)), `anchor lines ${n}; Skeleton.vue rows: ${sk.slice(0, 2).join(" | ") || "none (not proposed)"}`);
});

await (async () => { if (only && !only.has("S-05")) return; try {
    await graph();
    const { runMoves } = await imp("move.mjs");
    const val = G.edges.filter((e) => e.to && /^(import|import-side-effect|reexport|reexport-star|require)$/.test(e.kind));
    // K: a kernel file (src/composables/<m>/...) that reads its own kernel module and is read by one unit U
    // AND by a kernel file in another kernel module; moving K into U makes U ↔ kernel co-cyclic.
    const kmod = (f) => f.split("/").slice(0, 3).join("/");
    let pick = null;
    for (const f of new Set(val.map((e) => e.to))) {
        if (!/^src\/composables\/[^/]+\/.+\.ts$/.test(f) || basename(f) === "index.ts") continue;
        const readers = val.filter((e) => e.to === f).map((e) => e.from);
        const unitR = readers.filter((r) => r.startsWith("src/components/") && !r.startsWith("src/components/_shared/"));
        const kernR = readers.filter((r) => r.startsWith("src/composables/") && kmod(r) !== kmod(f));
        const reads = val.filter((e) => e.from === f && e.to.startsWith("src/composables/"));
        if (unitR.length && kernR.length && reads.length) { pick = { f, to: `${dirname(unitR[0])}/${basename(f)}` }; break; }
    }
    if (!pick) { out("S-05", null, "no candidate kernel file found for a cycle plant"); return; }
    const before = sh("git status --porcelain | wc -l").trim();
    let refused = false, msg = "";
    try { const r = runMoves(WT, [{ from: pick.f, to: pick.to }], { dry: true }); msg = JSON.stringify(r).slice(0, 200); refused = /FD-2|refus|CO-CYCLIC/i.test(msg) || r?.ok === false; }
    catch (e) { refused = /FD-2|CO-CYCLIC|refus/i.test(String(e.message)); msg = String(e.message).split("\n").slice(0, 2).join(" "); }
    const after = sh("git status --porcelain | wc -l").trim();
    out("S-05", refused && before === after, `move ${pick.f} → ${pick.to}: ${refused ? "REFUSED" : "ACCEPTED"} (${msg}); tree changed files ${before}→${after}`);
} catch (e) { out("S-05", false, `probe threw: ${e.message}`); } })();

run("S-08", () => {
    const gone = !ex("src/styles/glass.css") && !ex("src/styles/theme.css");
    const doors = ex("src/styles/glass/index.css") && ex("src/styles/theme/index.css");
    const rec = record();
    const css = rec.css ?? [];
    const noDist = css.filter((c) => !(Array.isArray(c) ? c.length > 2 || typeof c[1] === "object" : c.dist));
    const empty = dirs("src").filter((d) => readdirSync(join(WT, d)).length === 0);
    out("S-08", gone && doors && noDist.length === 0 && empty.length === 0, `top glass.css/theme.css gone ${gone}; glass/ theme/ doors ${doors}; CSS entries without dist ${noDist.length}/${css.length}; empty src dirs ${empty.length}`);
});

run("S-10", () => {
    const slotUse = sh("grep -l 'isSlot' scripts/structure/lib/tree/placement.mjs scripts/structure/bounds.mjs | wc -l").trim();
    const kf = sh("grep -c scopedKeyframes scripts/structure/cascade.mjs").trim();
    const cls = ex("scripts/structure/classify.mjs");
    const used = sh(`grep -rl "classify" ${P3}/B-kit | wc -l`, REPO).trim();
    out("S-10", slotUse === "2" && Number(kf) > 0 && cls && Number(used) > 0, `isSlot in placement+bounds ${slotUse}/2; scopedKeyframes ${kf}; classify.mjs ${cls}; B-kit files naming classify ${used}`);
});

run("S-11", () => {
    const harness = ex("tests/harness/source.ts");
    const tsb = ex("tsconfig.build.json");
    const landed = ex("scripts/structure/graph.mjs");
    const docsImp = sh(`grep -rlE "docs/tranches" tests scripts vite.config.ts vitest.config.ts package.json 2>/dev/null | grep -v '^scripts/structure/records' | wc -l`).trim();
    const yaml = G ? G.edges.filter((e) => /^yaml-/.test(e.kind)).length : "n/a";
    out("S-11", harness && !tsb && landed && docsImp === "0", `harness ${harness}; tsconfig.build.json present ${tsb}; floor landed ${landed}; files outside docs naming docs/tranches ${docsImp}; yaml edges ${yaml}`);
});

run("S-13", () => {
    const a = existsSync(join(REPO, P3, "xj-GonB.md")), b = existsSync(join(REPO, P3, "xj-BonG.md"));
    out("S-13", a && b, `xj-GonB.md ${a}; xj-BonG.md ${b} (clause tables read by hand in the report)`);
});

run("B-08", () => {
    const at = walk("src").filter((f) => basename(f) === "accent-tone.css");
    const readers = G ? G.edges.filter((e) => e.to && at.includes(e.to)).map((e) => `${e.from}(${e.kind})`) : [];
    out("B-08", null, `accent-tone.css at ${at.join(" ")}; readers ${readers.join(" ")}`);
});

run("B-09", () => {
    const sd = dirs("src/styles");
    const noDoor = sd.filter((d) => readdirSync(join(WT, d)).some((f) => f.endsWith(".css")) && !ex(`${d}/index.css`) && !/\/(composables|__tests__|styles)$/.test(d));
    const over = ["src/styles", ...sd].filter((d) => readdirSync(join(WT, d)).filter((f) => statSync(join(WT, d, f)).isFile()).length > 12);
    out("B-09", noDoor.length === 0 && over.length === 0, `styles dirs without index.css ${noDoor.length} ${noDoor.join(" ")}; styles dirs over 12 ${over.length} ${over.join(" ")}`);
});

run("B-10", () => {
    const sv = walk("src").filter((f) => /SelectionValue/.test(basename(f)) || /export (type|interface) SelectionValue\b/.test(f.endsWith(".ts") ? rd(f) : ""));
    const pkg = JSON.parse(rd("package.json"));
    const big = walk("src").filter((f) => /\.(ts|vue|css|mts)$/.test(f) && !f.includes("__tests__") && f !== "src/index.ts")
        .filter((f) => rd(f).split("\n").length > 500);
    const coloc = walk("src").filter((f) => /\/__tests__\/.*\.test\.ts$/.test(f)).length;
    const slib = ex("scripts/lib/index.mjs");
    const tv = readdirSync(join(WT, "tests-visual")).filter((f) => statSync(join(WT, "tests-visual", f)).isFile()).length;
    const manifest = ex("demo/stories/manifest.ts") ? rd("demo/stories/manifest.ts").split("\n").length : 0;
    out("B-10", sv.some((f) => /motion\/.*morph/.test(f)) && !!pkg.exports?.["./aurora-config"] && big.length === 0 && slib && tv <= 12 && manifest <= 500,
        `S7 SelectionValue at ${sv.join(" ")}; S10 ./aurora-config ${!!pkg.exports?.["./aurora-config"]}; S11 src files >500 lines ${big.length} ${big.slice(0, 6).join(" ")}; S13 colocated tests ${coloc}; S14 manifest.ts lines ${manifest}; S15 scripts/lib/index.mjs ${slib}; S16 tests-visual direct files ${tv}`);
});

run("B-11", () => {
    const pkg = JSON.parse(rd("package.json"));
    const t = pkg.scripts?.test ?? "";
    const r1 = sh("npx vitest run tests/gates -- --no-pin 2>&1 | tail -3");
    const gateCli = walk("scripts").find((f) => /seal/.test(basename(f)) && f.endsWith(".mjs"));
    const r2 = gateCli ? sh(`node ${gateCli} --no-pin; echo EXIT=$?`).split("\n").slice(-3).join(" ") : "no seal cli";
    const noPinMentions = sh("grep -rn 'no-pin' scripts tests package.json | head -5");
    out("B-11", null, `npm test = "${t}"; seal cli ${gateCli}; seal --no-pin → ${r2}; no-pin mentions: ${noPinMentions.replace(/\n/g, " | ")}; vitest gates tail: ${r1.replace(/\n/g, " | ")}`);
});

// selftest.mjs: proves every check CAN pass and CAN fail (H2, extended by H3: pass-3/H3.md).
//
//   node selftest.mjs [--only W1,W3] [--engine chromium|webkit|all] [--out <dir>] [--faults a,b]
//
// For each witness: the hand-made fixture must exit 0 with every cell PASS (UNMEASURED and
// RECORD cells aside), each PASS variant (a different carrier, same property) likewise, and
// each planted fault must exit non-zero with the named sub-check failing in a matching cell
// in EVERY engine run. A fault run executes only the blocks its pattern names (--cells).
// Also: the adapter law (adapter-law.mjs) passes adapter-head.mjs and fails the planted
// adapter, and the safaridriver target reports its status. Exits non-zero on any violation.
// H3-11: an expectation whose check is "OWNER-BLOCKED" requires a matching cell reported
// OWNER-BLOCKED (not PASS, not FAIL) in every engine run: the reading that waits on an owner
// ruling is itself proven, and the plants beside it (late, slowclock, cardspread) still FAIL.
// H4 (pass-4/H4.md) adds R5 (r5-hit.mjs), CF (c-facility.mjs), L1 (l1-light.mjs) and PR (prose.mjs,
// engine "source"), their plants, the W3/W1/ST plants of H4-1..H4-7, the L-6 adapter plant, and theme
// variants: a fixture written "pass@dark" runs the pass fixture with DOCK_HARNESS_THEME=dark.
import { spawnSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { HERE, parseArgs, outDir, loadAvg } from "./lib.mjs";

const args = parseArgs();
const only = args.only ? String(args.only).split(",") : null;
const onlyFaults = args.faults ? String(args.faults).split(",") : null;
const outRoot = args.out ?? process.env.DOCK_HARNESS_OUT;
const want = args.engine && args.engine !== "all" ? String(args.engine).split(",") : ["chromium", "webkit"];

// [witness, fault, cell pattern that must FAIL, sub-check(s) that must be in `failed` (null: the cell fails)]
const OB = "OWNER-BLOCKED";
const EXPECT = [
    ["W1", "lens", /fit·rest|morph·expanded-rest|rail·rest/, ["corner"]],
    ["W1", "squash", /morph·first-expand|morph·warm-collapse|morph·collapsed-rest/, ["corner"]],
    ["W1", "cssbend", /morph·warm-expand|morph·warm-collapse/, ["corner"]],
    ["W1", "deadmorph", /morph·warm-expand|morph·warm-collapse/, ["agree", "moves"]],
    ["W1", "dot", /fit·rest/, ["cover"]],
    ["W1", "cardlens", /card·/, ["corner"]],
    ["W1", "endlens", /rail·scrolled-end|rail·focus-end/, ["corner"]],
    ["W1", "endout", /rail·scrolled-end|rail·focus-end/, ["end"]],
    ["W1", "cardspread", /card·warm-expand|card·warm-collapse|card·first-expand/, ["card"]],
    ["W1", "cardlerp", /card·warm-expand|card·warm-collapse|card·first-expand/, [OB]],   // H3-11 · Q-12
    ["W1", "cardstep", /card·warm-expand|card·warm-collapse|card·first-expand/, [OB]],   // H4-7 · one step between the rests: Q-12's, in both engines
    ["W1", "hitpairunnamed", /morph·warm-expand|morph·warm-collapse/, ["ran"]],           // H4-9 · a hit layer the adapter does not name
    ["W2", "scroller", /route2|route3|route4/, ["scroller"]],
    ["W2", "ringclip", /route1/, ["ring"]],
    ["W2", "noring", /route1|route4/, ["paint"]],
    ["W2", "foldtail", /route1/, ["pointer", "keyboard", "at"]],
    ["W2", "notab", /route1|route5|route6|route7/, ["keyboard"]],
    ["W2", "noname", /route1|route5|route6|route7/, ["at"]],
    ["W2", "cwidth", /route5/, ["plateOut"]],
    ["W2", "depthscroll", /route6/, ["scroller"]],
    ["W2", "nestgrow", /route7/, ["fits", "faces", "pointer"]],   // the grown strip pushes Next and Layers past the cap: unreachable, clipped
    ["W3", "jump", /^first-expand/, ["continuity"]],
    ["W3", "subpx", /^warm-expand|^content-add/, ["landing"]],
    ["W3", "late", /^warm-expand/, ["window"]],
    ["W3", "owners", /^warm-expand/, ["owners"]],
    ["W3", "overhang", /^warm-expand/, ["faces"]],
    ["W3", "content", /^content-add|^content-remove/, ["window"]],
    ["W3", "content", /^ticking/, null],
    ["W3", "linear", /^warm-expand/, ["trajectory"]],
    ["W3", "ease", /^warm-expand/, ["trajectory"]],
    ["W3", "snap", /^warm-expand/, ["terminal"]],
    ["W3", "wall", /^reversal/, ["trajectory"]],
    ["W3", "slowclock", /^warm-expand/, ["window"]],
    ["W3", "seatjump", /^lead-add/, ["seatStep"]],
    ["W3", "doublex", /^lead-add/, ["seatOverlap"]],
    ["W3", "hiddengrow", /^hidden-shown/, null],
    ["W3", "resizemorph", /^viewport-resize/, ["window"]],
    ["W3", "resizenorest", /^viewport-resize/, ["rest"]],            // H3-10
    ["W3", "blankswap", /^swap-long|^swap-short/, ["blank"]],          // H3-1
    ["W3", "pop", /^content-remove|^lead-remove/, ["leaving"]],        // H3-3
    ["W3", "slipfade", /^content-remove|^lead-remove/, ["leaving"]],   // H3-3 (B′ V-3's path)
    ["W3", "latsnap", /^lattice/, ["seatWidth"]],                      // H3-2
    ["W3", "infhold", /^infanim/, ["window"]],                         // H3-2
    ["W3", "infthrow", /^infanim/, ["errors"]],                        // H3-2
    ["W3", "deadmorph", /^vagree·/, ["vagree"]],                       // H3-5
    ["W3", "nostretch", /^stretch·lead-add/, ["seatStep"]],            // H3-6
    ["W3", "nbjump", /^neighbour·/, ["neighbour"]],                    // H3-7
    ["W3", "nboverlap", /^neighbour·warm-expand/, ["overlap"]],       // H3-7
    ["W3", "bandclose", /^warm-expand|^warm-collapse/, [OB]],          // H3-11 · Q-4
    ["W3", "anchordrift", /^anchor-end/, ["anchor"]],
    ["W3", "wideout", /^wide·collapsed-rest/, null],
    ["W3", "twoowners", /^seat-transition/, ["owners"]],
    ["W3", "adapterclip", /^warm-expand/, ["faces"]],
    ["W3", "wrongrung", /^warm-expand/, ["rung"]],
    ["W3", "splice", /^swap-/, ["splice"]],                            // H4-1
    ["W3", "sliver", /^swap-|^lead-remove/, ["splice"]],               // H4-1
    ["W3", "lanesnap", /^swap-long/, ["lanes"]],                       // H4-2
    ["W3", "lanecancel", /^swap-long/, ["lanes"]],                     // H4-2 (cancelled to identity)
    ["W3", "retargetpop", /^retarget·(40|80|120)/, ["leaving", "vanish"]],   // H4-5
    ["W3", "ctxloss", /^retarget·context/, ["context"]],               // H4-5
    ["W4", "nohyst", /no-threshold-bounce/, null],
    ["W4", "latch", /no-hover-latch/, null],
    ["W4", "menucollapse", /menu-holds/, null],
    ["W4", "noprm", /prm·posture-morph|prm·compact/, null],
    ["W4", "tapthrough", /tap-pins/, null],
    ["W4", "ungatedafter", /no-hover-latch/, null],
    ["W4", "pressgate", /press-then-scroll/, null],
    ["W4", "lategetter", /late-getter/, null],
    ["W4", "norefcount", /shared-scroller/, null],
    ["W4", "seatshrink", /seat-scale/, null],
    ["W4", "prmscrub", /prm·compact/, null],
    ["W4", "compactjump", /non-first-current/, null],
    ["W4", "nocompact", /compact·compacts/, null],
    ["W4", "noengage", /engagement-expands/, null],
    ["W5", "rimout", /expanded|collapsed/, ["inside"]],
    ["W5", "deadfill", /h·expanded|v·expanded/, ["fill"]],
    ["W5", "rimshift", /expanded|collapsed/, ["whole"]],
    ["W5", "winonly", /el-source/, ["fill"]],
    ["W6", "formout", /form·collapsed-rest/, ["wraps"]],
    ["W6", "dismissout", /form·collapsed-rest/, ["wraps"]],
    ["W6", "twoplates", /form·collapsed-rest/, ["onePlate"]],
    ["W6", "formgone", /form·collapsed-rest/, ["present"]],
    ["W6", "dismissspan", /form·collapsed-rest/, ["dismissSeat"]],
    ["W6", "plateswap", /form·expanded-rest/, ["samePlate"]],
    ["W6", "jump", /form·expand/, ["continuity"]],
    ["W7", "edgecut", /^(top|side|canvas)·/, ["whole"]],
    ["W7", "sideedge", /^side·/, ["same"]],
    ["W7", "gutterless", /^(side|canvas)·/, ["gutter"]],
    ["W7", "badgeover", /^side·/, ["badge"]],
    ["W7", "lens", /^(top|side)·/, ["radius"]],
    ["W7", "nocaps", /^(top|side|canvas)·dark·dpr2/, ["whole"]],      // H3-9: the dark DPR-2 escape is closed
    ["W8", "squash", /^expand|^collapse/, ["sharp"]],
    ["W8", "jank", /^expand|^collapse/, ["pacing"]],
    ["R6", "backdropmotion", /ring·static/, null],
    ["ST", "leap", /^stall·/, ["leap"]],                               // H3-4
    ["ST", "nbjump", /^stall·nb·/, ["neighbour"]],                     // H4-3
    ["ST", "nboverlap", /^stall·nb·/, ["overlap"]],                    // H4-3
    ["FM", "deadhooks", /^film·/, ["tiles"]],                          // H3-8
    ["R5", "nohit", /^hit·/, ["corner"]],                              // H4-4
    ["R5", "seatmiss", /^hit·warm-/, ["seat"]],                        // H4-4
    ["R5", "ghosthit", /^hit·warm-/, ["ghost"]],                       // H4-4
    ["CF", "tilesq", /^c1·shape·h/, ["square", "summary"]],            // H4-10 · C1
    ["CF", "morphsnap", /^c2·morph·/, ["continuous"]],                 // C2
    ["CF", "nofocus", /^c3·focus/, ["opens"]],                         // C3
    ["CF", "noscroll", /^c3·scroll/, ["collapses"]],                   // C3
    ["CF", "persistentinert", /^c4·persistent/, ["live"]],             // C4
    ["CF", "focuslost", /^c5·keyboard/, ["escape"]],                   // C5
    ["CF", "menucollapse", /^c6·menu/, ["holds"]],                     // C6
    ["CF", "narrowover", /^c7·narrow/, ["inside", "noscroll"]],        // C7
    ["CF", "tapthrough", /^c7·coarse-tap/, ["opens", "swallowed"]],     // C3 + C7 (coarse)
    ["L1", "glowhalo", /^l1·/, ["added"]],                             // H4-11
    ["L1", "gleam", /^l1·/, ["added"]],                                // H4-11
    ["L1", "shimmer", /^l1·(light|dark)·(collapsed|expanded)/, ["idle"]],   // H4-11
    ["PR", "noreader", /^prose·readers/, ["readers"]],                 // H4-8
    ["PR", "count", /^prose·count/, ["count"]],                        // H4-8
    ["PR", "duprow", /^prose·rows/, ["rows"]],                         // H4-8
];
const PASS_VARIANTS = [["W1", "csscarrier"], ["W7", "splitcaps"], ["W1", "hitpair"], ["ST", "pass@dark"], ["FM", "pass@dark"], ["W1", "pass@dark"]];
const SCRIPT = { W1: "w1-corner.mjs", W2: "w2-run.mjs", W3: "w3-morph.mjs", W4: "w4-state.mjs", W5: "w5-rim.mjs", W6: "w6-collapsed-form.mjs", W7: "w7-edge.mjs", W8: "w8-motion.mjs", R6: "r6-probe.mjs", ST: "stall.mjs", FM: "film.mjs", R5: "r5-hit.mjs", CF: "c-facility.mjs", L1: "l1-light.mjs", PR: "prose.mjs" };

const rows = [];
function run(w, fixtureArg, cells = null) {
    const [fixture, theme] = fixtureArg.split("@");
    const argv = [path.join(HERE, SCRIPT[w]), "--fixture", fixture, "--engine", want.join(",")];
    if (outRoot) argv.push("--out", outRoot);
    if (cells) argv.push("--cells", cells);
    const t0 = Date.now(), load = loadAvg();
    const r = spawnSync(process.execPath, argv, { encoding: "utf8", maxBuffer: 1 << 26, env: theme ? { ...process.env, DOCK_HARNESS_THEME: theme } : process.env });
    const dir = outDir({ out: outRoot, fixture }, w);
    let cellsOut = [];
    try { cellsOut = JSON.parse(fs.readFileSync(path.join(dir, `${w}.json`), "utf8")).cells; } catch { }
    return { code: r.status, cells: cellsOut, ms: Date.now() - t0, load, err: (r.stderr || "").trim().split("\n").slice(-2).join(" ") };
}
const counted = (cs) => cs.filter((c) => !c.unmeasured && !c.record);
let bad = 0;
const log = (row) => { rows.push(row); console.log(`${row.ok ? "OK  " : "BAD "} ${row.witness}  ${row.fixture.padEnd(14)}  expect: ${row.expect}  ·  got: ${row.got}  [${Math.round(row.ms / 1000)} s, load ${row.load}]`); if (!row.ok) bad++; };

for (const w of Object.keys(SCRIPT)) {
    if (only && !only.includes(w)) continue;
    for (const fx of ["pass", ...PASS_VARIANTS.filter(([pw]) => pw === w).map(([, f]) => f)]) {
        if (onlyFaults && !onlyFaults.includes(fx)) continue;
        const p = run(w, fx);
        const cs = counted(p.cells);
        const engs = new Set(cs.map((c) => c.engine));
        const ok = p.code === 0 && cs.length > 0 && cs.every((c) => c.pass) && (w === "PR" ? ["source"] : want).every((e) => engs.has(e));
        log({ witness: w, fixture: fx, expect: "exit 0, all cells PASS", got: `exit ${p.code}, ${cs.filter((c) => c.pass).length}/${cs.length} PASS${ok ? "" : "; failing: " + cs.filter((c) => !c.pass).map((c) => `${c.engine}:${c.cell}${c.failed ? "[" + c.failed.join(",") + "]" : ""}`).slice(0, 6).join(" ")}${p.err && !cs.length ? " · " + p.err : ""}`, ok, ms: p.ms, load: p.load });
    }
    for (const [ew, fault, pat, check] of EXPECT) {
        if (ew !== w) continue;
        if (onlyFaults && !onlyFaults.includes(fault)) continue;
        const f = run(w, fault, pat.source);
        const ob = check?.includes(OB);
        const hit = ob ? f.cells.filter((c) => pat.test(c.cell) && !c.pass && c.ownerBlocked)
            : f.cells.filter((c) => pat.test(c.cell) && !c.pass && !c.unmeasured && !c.record && !c.ownerBlocked && (!check || check.some((k) => (c.failed ?? []).includes(k))));
        const engs = new Set(hit.map((c) => c.engine));
        const ok = (ob || f.code !== 0) && (w === "PR" ? ["source"] : want).every((e) => engs.has(e));
        log({ witness: w, fixture: fault, expect: ob ? `an OWNER-BLOCKED cell in ${pat.source}` : `exit ≠ 0; ${check ? check.join("|") + " fails in " : ""}${pat.source}`, got: `exit ${f.code}, ${f.cells.filter((c) => !c.pass).length}/${f.cells.length} FAIL; matching ${hit.length} (${[...engs].join("+") || "none"})${ok ? "" : f.err ? " · " + f.err : ""}`, ok, ms: f.ms, load: f.load });
    }
}
if (!only || only.includes("H6")) {
    const t0 = Date.now();
    const a = spawnSync(process.execPath, [path.join(HERE, "adapter-law.mjs"), path.join(HERE, "adapter-head.mjs")], { encoding: "utf8" });
    log({ witness: "H6", fixture: "adapter-head", expect: "the law holds (exit 0)", got: `exit ${a.status}: ${a.stdout.trim().split("\n")[0]}`, ok: a.status === 0, ms: Date.now() - t0, load: loadAvg() });
    const b = spawnSync(process.execPath, [path.join(HERE, "adapter-law.mjs"), path.join(HERE, "plants", "adapter-preclip.mjs")], { encoding: "utf8" });
    log({ witness: "H6", fixture: "adapter-preclip", expect: "L-1, L-2 and L-3 fail (exit ≠ 0)", got: `exit ${b.status}: ${b.stdout.trim().split("\n")[0]}`, ok: b.status !== 0 && /L-1/.test(b.stdout) && /L-2/.test(b.stdout) && /L-3/.test(b.stdout), ms: Date.now() - t0, load: loadAvg() });
    // H4-9 · L-6 on hit()/edge(): the G adapter (which names both) passes; the plant fails
    const g = spawnSync(process.execPath, [path.join(HERE, "adapter-law.mjs"), path.join(HERE, "..", "pass-3", "adapter-G-p3.mjs")], { encoding: "utf8" });
    log({ witness: "H6", fixture: "adapter-G-p3", expect: "L-1..L-6 hold (exit 0)", got: `exit ${g.status}: ${g.stdout.trim().split("\n")[0]}`, ok: g.status === 0 && /L-6/.test(g.stdout), ms: Date.now() - t0, load: loadAvg() });
    const h = spawnSync(process.execPath, [path.join(HERE, "adapter-law.mjs"), path.join(HERE, "..", "pass-4", "H4-records", "adapter-plant-l6.mjs")], { encoding: "utf8" });
    log({ witness: "H6", fixture: "adapter-plant-l6", expect: "L-6 fails for hit() and edge() (exit ≠ 0)", got: `exit ${h.status}: ${h.stdout.trim().split("\n")[0]}`, ok: h.status !== 0 && /L-6 hit/.test(h.stdout) && /L-6 edge/.test(h.stdout), ms: Date.now() - t0, load: loadAvg() });
}
if (!only || only.includes("H8")) {
    const t0 = Date.now();
    const s = spawnSync(process.execPath, [path.join(HERE, "safari.mjs")], { encoding: "utf8" });
    const line = s.stdout.trim();
    log({ witness: "H8", fixture: "safaridriver", expect: "reports ENABLED, or UNMEASURED (owner's safaridriver checkbox) with safaridriver's reason", got: line, ok: /^ENABLED|^UNMEASURED \(owner's safaridriver checkbox\)/.test(line), ms: Date.now() - t0, load: loadAvg() });
}
console.log(`${bad ? "SELFTEST FAIL" : "SELFTEST PASS"}  ${rows.length - bad}/${rows.length} expectations hold`);
if (outRoot) fs.writeFileSync(path.join(outRoot, `selftest-${want.join("+")}${only ? "-" + only.join("+") : ""}.json`), JSON.stringify({ when: new Date().toISOString(), engines: want, rows }, null, 1));
process.exitCode = bad ? 1 : 0;

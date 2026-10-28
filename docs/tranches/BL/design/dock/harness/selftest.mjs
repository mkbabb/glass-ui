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
// H5 (pass-5/H5.md) adds F7 (f7.mjs, engine "source", synthetic suite results), the H5-1..H5-13 plants, and two
// fixture suffixes: "ctxgc!nohold" runs the ctxgc fixture with DOCK_HARNESS_CTX_NOHOLD=1 (the context cell does not
// hold its promise), and any ctxgc run sets DOCK_HARNESS_EXPOSE_GC=1 (Chromium gets --expose-gc, the plant's gc()).
// An expectation's 5th element narrows the engines it is judged in (the forced-GC plant: Chromium only, WebKit
// exposes no gc() to a page; the ctxloss plant covers the context promise in both engines). The runner's own
// re-run rule (reds.mjs) has its plants in `node reds.mjs --selftest` (witness RUN).
// H6 (pass-6/H6.md) adds the H6-1..H6-11 plants; three fixture flags ("!unbounded": DOCK_HARNESS_INK_UNBOUNDED=1, the
// pass-5 ink reading; "!rescale": DOCK_HARNESS_ST_RESCALE=0.98, a cast painted at 0.98; "!nomarker":
// DOCK_HARNESS_ST_NOMARKER=1, no block-end marker); an expectation's 6th element (options) that also requires every
// matching cell's summary to match `summary`, no matching cell to fail a check in `notFailed`, and the witness's stdout
// to hold a line matching `line` per engine (ENGINE stands for the engine's label); and witness SYN (engine-independent:
// plants/w8-time.mjs for H6-5's time bound on synthetic strips, `node cells.mjs --selftest` for H6-7's digest rule).
// H7 (pass-7/H7.md): H7-1 strikes W3's DOM `hole` plant (FM's fixture `hole` stays, now read from paint) and adds witness
// FMB, today's B′ as the hole's build plant (`--bp <build> --bp-adapter <file>`: first-expand and warm-collapse FAIL `hole`
// in every engine and theme, swap-short and swap-long hold it); H7-2 moves `pass!rescale` to a PASS variant (a 0.98 cast
// whose divided rests agree is measured) and adds `pass!skew` (DOCK_HARNESS_ST_SKEW=1.02: UNMEASURED); H7-3's plants are in
// RUN (reds.mjs) and SYN (cells.mjs).
// H8 (pass-8/H8.md; witness H8 below stays the Safari status, an older row of that name): H8-1's column rule has three
// witnesses. COLR (source, records): pass 7's B′ on the pass-7 critic's records (W·l and W·d FAIL `hole`, C·l and C·d PASS;
// the tile differences equal tilediff.txt; the per-cell rule H8-1 replaces, the plant's control, read W·l and W·d PASS),
// pass 6's B′ on H7's records (FAIL in four columns). COLS (source, synthetic): one isolated 2-frame read is
// NOT-REPRODUCED; two reads at one slot FAIL; two reads at two slots are NOT-REPRODUCED; two unreadable strips FAIL. COL
// (browser, per engine): the fixture's `pass` and `pass@dark` columns PASS and its `hole` column FAILs, each a three-run
// column through battery.sh stage `fmlow` (NOGUARD: the self-test's own slot holds the engine). H8-2's witness LOW (browser,
// per engine; NOT inside a guarded slot, the stage queues its own): a slot admitted above its bound reads "deferred" and
// enters no column; a slot admitted at or under 15 is read.
import { spawnSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
import { HERE, parseArgs, outDir, loadAvg, ENGINE_LABEL } from "./lib.mjs";
import { readRecords, holeColumn, rerunRule, verdict, B2_FM } from "./cells.mjs";

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
    ["W1", "cardspread", /card·warm-expand|card·warm-collapse|card·first-expand/, ["card"], null, { summary: /Q-12 \(b\) band \[[^\]]*\] px fails/ }],   // H6-11 · a radius outside the band
    ["W1", "cardlerp", /card·warm-expand|card·warm-collapse|card·first-expand/, [OB], null, { summary: /Q-12 \(b\) band \[[^\]]*\] px holds/ }],   // H3-11 · Q-12; H6-11 · the band reading
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
    ["W3", "slowclock", /^warm-expand/, ["window"], null, { summary: /Q-4 \(a\) flag at the 2 % band fails .*Q-4 \(c\) 270 ms dock clock fails/ }],   // H6-11 · both branches fail a late morph
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
    ["W3", "bandclose", /^warm-expand|^warm-collapse/, [OB], null, { summary: /Q-4 \(a\) flag at the 2 % band holds .*Q-4 \(c\) 270 ms dock clock fails/ }],   // H3-11 · Q-4; H6-11 · (a) holds, (c) fails
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
    ["W2", "arrowclamp", /route1/, ["keyboard"]],                      // H5-1 · Seat 1 by a key, not by focus()
    ["W3", "ctxgc!nohold", /^retarget·context/, ["context"], ["chromium"]],   // H5-2 · the collected promise
    ["W3", "stub", /^swap-/, ["stub"]],                                // H5-3 · glyph stub
    ["W3", "vanishstep", /^content-remove|^lead-remove/, ["vanish"]],  // H5-4 · vanish on every leaver
    ["W3", "seatsettle", /^warm-expand|^warm-collapse/, ["lanes"]],    // H5-7 · seat position after the flag
    ["FM", "stub", /^film·swap-/, ["stub"]],                           // H5-3 · the film read, gated
    ["W1", "cardblip", /card·warm-expand|card·warm-collapse|card·first-expand/, ["card"]],   // H5-12 · enough samples
    ["W6", "bandclose", /form·expand|form·collapse/, [OB], null, { summary: /Q-4 \(a\) flag at the 2 % band holds .*Q-4 \(c\) 270 ms dock clock fails/ }],   // H5-5 · Q-4 lenient window; H6-11
    ["W6", "slowclock", /form·expand|form·collapse/, ["window"]],       // H5-5 · a late morph still FAILS
    ["CF", "platesq", /^c1·shape·/, ["ownshape", "corner"]],            // H5-6 · C1 per painter + pixels
    ["CF", "prmfade", /^c2·prm/, ["content", "flag"]],                  // H5-6 · C2 per Q-18 (a)
    ["CF", "pressdrop", /^c8·/, ["collapses"]],                         // H5-11 · C8 (O-91)
    ["CF", "shorttall", /^c9·/, ["block"]],                             // H5-11 · C9 (O-74e)
    ["CF", "shortseat", /^c9·/, ["seats"]],                             // H5-11 · C9
    ["PR", "partials", /^prose·partials/, ["partials"]],                // H5-8
    ["PR", "passcite", /^prose·citations/, ["citations"]],              // H5-8
    ["F7", "unitred", /^f7·units/, ["units"]],                          // H5-10
    ["F7", "gatered", /^f7·gate·boot-graph/, ["gate"]],                 // H5-10
    ["F7", "tscred", /^f7·typecheck/, ["typecheck"]],                   // H5-10
    ["F7", "gateskip", /^f7·gate·boot-graph/, ["UNMEASURED"]],          // H5-10 · a skipped build arm is never PASS
    // H6 (pass-6/H6.md)
    ["W3", "stubhalf", /^swap-/, ["stub"]],                             // H6-1 · a hard cut at opacity 0.5 (the routes' CUT_OPACITY)
    ["FM", "stubhalf", /^film·swap-/, ["stub"]],                        // H6-1
    ["FM", "hole", /^film·(first|warm)-expand/, ["hole"]],              // H6-2 plant, read from paint by H7-1 (W3's DOM hole is struck)
    ["W3", "platewide!unbounded", /^content-remove/, ["ink"]],          // H6-3 · the pass-5 reading under a plate-wide clip: ink > 1
    ["W3", "flag50", /^warm-expand|^warm-collapse/, ["window"]],        // H6-5 · the flag 50 ms after landing (3+ entries)
    ["ST", "pass!skew", /^stall·(?!nb·)/, ["UNMEASURED"], null, { summary: /residual scale .* outside 1 ± 0\.01/ }],   // H7-2 · rests 2 % off after division: UNMEASURED
    ["ST", "pass!nomarker", /^stall·/, ["UNMEASURED"], null, { summary: /missing marker|no block-end marker/ }],   // H6-4 · no marker: UNMEASURED
    ["CF", "hoverdead", /^c8·/, ["opens"]],                             // H6-6 · a hover on a collapsed dock that does not open it
    ["CF", "pressstick", /^c8·/, ["collapses"], null, { notFailed: ["opens"] }],   // H6-6 · reps that started expanded are not judged for opens
    ["W3", "late", /^warm-expand/, ["window"], null, { line: /^PASS {2}W3 {2}\(faces merged\) {2}ENGINE {2}warm-expand/ }],   // H6-8 · faces at 0 px print PASS on a red cell
    ["W3", "overhang", /^warm-expand/, ["faces"], null, { line: /^FAIL {2}W3 {2}\(faces merged\) {2}ENGINE {2}warm-expand/ }],   // H6-8 · a faces red prints FAIL
    ["PR", "harnesscite", /^prose·harness/, ["harness"]],               // H6-9
];
// [witness, fixture, cells pattern (optional: the variant runs only those blocks)]
const PASS_VARIANTS = [["W1", "csscarrier"], ["W7", "splitcaps"], ["W1", "hitpair"], ["ST", "pass@dark"], ["FM", "pass@dark"], ["W1", "pass@dark"],
    ["W2", "roving"], ["W3", "ctxgc", "^retarget·context"], ["W3", "platewide", "^content-remove"],   // H6-3 · bounded, the plate-wide clip passes
    ["ST", "pass!rescale", "^stall·(same-task|1raf|2raf|100ms|mid-flight)$"]];   // H7-2 · a 0.98 cast whose divided rests agree is measured (and passes)
const SOURCE = new Set(["PR", "F7"]);
const SCRIPT = { W1: "w1-corner.mjs", W2: "w2-run.mjs", W3: "w3-morph.mjs", W4: "w4-state.mjs", W5: "w5-rim.mjs", W6: "w6-collapsed-form.mjs", W7: "w7-edge.mjs", W8: "w8-motion.mjs", R6: "r6-probe.mjs", ST: "stall.mjs", FM: "film.mjs", R5: "r5-hit.mjs", CF: "c-facility.mjs", L1: "l1-light.mjs", PR: "prose.mjs", F7: "f7.mjs" };

const rows = [];
function run(w, fixtureArg, cells = null) {
    const [fx0, theme] = fixtureArg.split("@");
    const [fixture, flag] = fx0.split("!");
    const env = { ...process.env };
    if (theme) env.DOCK_HARNESS_THEME = theme;
    if (flag === "nohold") env.DOCK_HARNESS_CTX_NOHOLD = "1";
    if (flag === "unbounded") env.DOCK_HARNESS_INK_UNBOUNDED = "1";
    if (flag === "rescale") env.DOCK_HARNESS_ST_RESCALE = "0.98";
    if (flag === "skew") env.DOCK_HARNESS_ST_SKEW = "1.02";
    if (flag === "nomarker") env.DOCK_HARNESS_ST_NOMARKER = "1";
    if (fixture === "ctxgc") env.DOCK_HARNESS_EXPOSE_GC = "1";
    const argv = [path.join(HERE, SCRIPT[w]), "--fixture", fixture, "--engine", want.join(",")];
    if (outRoot) argv.push("--out", outRoot);
    if (cells) argv.push("--cells", cells);
    const t0 = Date.now(), load = loadAvg();
    const r = spawnSync(process.execPath, argv, { encoding: "utf8", maxBuffer: 1 << 26, env });
    const dir = outDir({ out: outRoot, fixture }, w);
    let cellsOut = [];
    try { cellsOut = JSON.parse(fs.readFileSync(path.join(dir, `${w}.json`), "utf8")).cells; } catch { }
    return { code: r.status, cells: cellsOut, out: r.stdout || "", ms: Date.now() - t0, load, err: (r.stderr || "").trim().split("\n").slice(-2).join(" ") };
}
const counted = (cs) => cs.filter((c) => !c.unmeasured && !c.record);
let bad = 0;
const log = (row) => { rows.push(row); console.log(`${row.ok ? "OK  " : "BAD "} ${row.witness}  ${row.fixture.padEnd(14)}  expect: ${row.expect}  ·  got: ${row.got}  [${Math.round(row.ms / 1000)} s, load ${row.load}]`); if (!row.ok) bad++; };

for (const w of Object.keys(SCRIPT)) {
    if (only && !only.includes(w)) continue;
    for (const [, fx, vcells] of [[w, "pass"], ...PASS_VARIANTS.filter(([pw]) => pw === w)]) {
        if (onlyFaults && !onlyFaults.includes(fx)) continue;
        const p = run(w, fx, vcells ?? null);
        const cs = counted(p.cells);
        const engs = new Set(cs.map((c) => c.engine));
        const ok = p.code === 0 && cs.length > 0 && cs.every((c) => c.pass) && (SOURCE.has(w) ? ["source"] : want).every((e) => engs.has(e));
        log({ witness: w, fixture: fx + (vcells ? ` (${vcells})` : ""), expect: "exit 0, all cells PASS", got: `exit ${p.code}, ${cs.filter((c) => c.pass).length}/${cs.length} PASS${ok ? "" : "; failing: " + cs.filter((c) => !c.pass).map((c) => `${c.engine}:${c.cell}${c.failed ? "[" + c.failed.join(",") + "]" : ""}`).slice(0, 6).join(" ")}${p.err && !cs.length ? " · " + p.err : ""}`, ok, ms: p.ms, load: p.load });
    }
    for (const [ew, fault, pat, check, only1, opts = {}] of EXPECT) {
        if (ew !== w) continue;
        if (onlyFaults && !onlyFaults.includes(fault) && !onlyFaults.includes(fault.split("!")[0])) continue;
        const f = run(w, fault, pat.source);
        const ob = check?.includes(OB), um = check?.includes("UNMEASURED");
        const judged = SOURCE.has(w) ? ["source"] : want.filter((e) => !only1 || only1.includes(e));
        if (!judged.length) continue;
        const hit = ob ? f.cells.filter((c) => pat.test(c.cell) && !c.pass && c.ownerBlocked)
            : um ? f.cells.filter((c) => pat.test(c.cell) && !c.pass && c.unmeasured)
            : f.cells.filter((c) => pat.test(c.cell) && !c.pass && !c.unmeasured && !c.record && !c.ownerBlocked && (!check || check.some((k) => (c.failed ?? []).includes(k))));
        const engs = new Set(hit.map((c) => c.engine));
        // H6 options: every matching cell's summary, no matching cell failing a named check, a stdout line per engine
        const sumBad = opts.summary ? hit.filter((c) => !opts.summary.test(c.summary ?? "")) : [];
        const nfBad = opts.notFailed ? f.cells.filter((c) => pat.test(c.cell) && opts.notFailed.some((k) => (c.failed ?? []).includes(k))) : [];
        const lineBad = opts.line ? judged.filter((e) => !f.out.split("\n").some((l) => new RegExp(opts.line.source.replace("ENGINE", (ENGINE_LABEL[e] ?? e).replace(/[()]/g, "\\$&"))).test(l))) : [];
        const ok = (ob || um || f.code !== 0) && judged.every((e) => engs.has(e)) && !sumBad.length && !nfBad.length && !lineBad.length;
        const extra = [opts.summary ? `summary ${sumBad.length ? "MISSES in " + sumBad.length : "matches"}` : "", opts.notFailed ? `${opts.notFailed.join(",")} ${nfBad.length ? "FAILS in " + nfBad.length : "holds"}` : "", opts.line ? `line ${lineBad.length ? "MISSING in " + lineBad.join(",") : "printed"}` : ""].filter(Boolean).join("; ");
        log({ witness: w, fixture: fault + (only1 ? ` [${only1.join(",")}]` : ""), expect: (ob ? `an OWNER-BLOCKED cell in ${pat.source}` : um ? `an UNMEASURED (never PASS) cell in ${pat.source}` : `exit ≠ 0; ${check ? check.join("|") + " fails in " : ""}${pat.source}`) + (opts.summary ? `; summary ~ ${opts.summary.source}` : "") + (opts.notFailed ? `; ${opts.notFailed.join(",")} not failed` : "") + (opts.line ? `; stdout ~ ${opts.line.source}` : ""), got: `exit ${f.code}, ${f.cells.filter((c) => !c.pass).length}/${f.cells.length} FAIL; matching ${hit.length} (${[...engs].join("+") || "none"})${extra ? "; " + extra : ""}${ok ? "" : f.err ? " · " + f.err : ""}`, ok, ms: f.ms, load: f.load });
    }
}
// H7-1 (pass-7/H7.md) · today's B′ is the hole's build plant: FM on --bp <build> (HEAD + pass-6/floor-v5.patch +
// pass-6/D2-Bp-proto.patch, adapter --bp-adapter), light and dark. first-expand and warm-collapse must FAIL `hole` in every
// engine and theme; swap-short and swap-long must not fail `hole` (pass 6's critic read 0 hole frames there in every run).
if ((!only || only.includes("FMB")) && args.bp) {
    for (const theme of ["light", "dark"]) {
        const env = { ...process.env, DOCK_HARNESS_THEME: theme };
        const o = path.join(outRoot ?? ".", `fmb-${theme}`);
        const argv = [path.join(HERE, "film.mjs"), "--build", String(args.bp), "--engine", want.join(","), "--out", o];
        if (args["bp-adapter"]) argv.push("--adapter", String(args["bp-adapter"]));
        const t0 = Date.now(), load = loadAvg();
        const r = spawnSync(process.execPath, argv, { encoding: "utf8", maxBuffer: 1 << 26, env });
        let cs = []; try { const d = fs.readdirSync(path.join(o, "runs")).find((x) => x.startsWith("FM-")); cs = JSON.parse(fs.readFileSync(path.join(o, "runs", d, "FM.json"), "utf8")).cells; } catch { }
        const of = (re) => cs.filter((c) => re.test(c.cell));
        const red = of(/^film·(first-expand|warm-collapse)/).filter((c) => !c.pass && (c.failed ?? []).includes("hole"));
        const fe = want.every((e) => ["first-expand", "warm-collapse"].every((n) => red.some((c) => c.engine === e && c.cell.startsWith("film·" + n))));
        log({ witness: "FMB", fixture: `bp@${theme}`, expect: "first-expand and warm-collapse FAIL hole in every engine", got: `exit ${r.status}; ${red.map((c) => `${c.engine}:${c.cell}[${c.hole?.worst ? c.hole.worst.frames + " frames" : "-"}]`).join(" ")}`, ok: fe, ms: Date.now() - t0, load });
        const sw = of(/^film·swap-(short|long)/);
        const swOk = want.every((e) => sw.filter((c) => c.engine === e).length === 2) && sw.every((c) => c.hole && c.hole.ok);
        log({ witness: "FMB", fixture: `bp@${theme}`, expect: "swap-short and swap-long do not fail hole", got: sw.map((c) => `${c.engine}:${c.cell} hole ${c.hole ? (c.hole.ok ? "holds" : "FAILS") + " (" + c.hole.holeFrames + " frame(s))" : "not read"}`).join(" "), ok: swOk, ms: Date.now() - t0, load });
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
if (!only || only.includes("RUN")) {
    const t0 = Date.now();
    const r = spawnSync(process.execPath, [path.join(HERE, "reds.mjs"), "--selftest"], { encoding: "utf8" });
    const last = r.stdout.trim().split("\n").pop();
    log({ witness: "RUN", fixture: "reds+faces", expect: "merged reds and controls re-run; main W3 runs faces (exit 0)", got: `exit ${r.status}: ${last}`, ok: r.status === 0, ms: Date.now() - t0, load: loadAvg() });
}
// H6 (pass-6/H6.md) · witness SYN, engine-independent: H6-5's time-counted W-8 on synthetic strips (plants/w8-time.mjs)
// and H6-7's digest rule (cells.mjs --selftest)
if (!only || only.includes("SYN")) {
    for (const [name, argv, expect] of [["w8-time", [path.join(HERE, "plants", "w8-time.mjs")], "3 entries in 21.4 ms pass, 3 in 50 ms fail; the pass-5 entry count reads the first FAIL (exit 0)"], ["digest", [path.join(HERE, "cells.mjs"), "--selftest"], "a re-run that reads the cell OB without the failing check counts it NOT-REPRODUCED (exit 0)"]]) {
        const t0 = Date.now();
        const r = spawnSync(process.execPath, argv, { encoding: "utf8" });
        log({ witness: "SYN", fixture: name, expect, got: `exit ${r.status}: ${r.stdout.trim().split("\n").pop()}`, ok: r.status === 0, ms: Date.now() - t0, load: loadAvg() });
    }
}
// H8-1 · witness COLR: the column rule on recorded batteries (no browser)
const DOCK = path.resolve(HERE, "..");
const colOf = (cols, e, t) => cols.find((c) => c.engine === e && c.theme === t) ?? { v: "absent", summary: "no reads", hits: [] };
if (only && only.includes("COLR")) {
    const t0 = Date.now(), CR = path.join(DOCK, "pass-7", "D2-Bp-crit-records"), st = path.join(outRoot ?? ".", "col-crit");
    // stage the critic's records in the battery layout: its battery stages as they are; its fmlow runs r1-r3 as stage
    // fmlow-<theme> (runs, rerun1, rerun2) with admit.json from its own log's "admitted" line (H8-2 reads that line)
    fs.rmSync(st, { recursive: true, force: true });
    for (const e of ["chromium", "webkit"]) for (const sg of ["main", "rest", "dark", "darkrest"]) { const d = path.join(st, "battery", "json", `bp-${e}`); fs.mkdirSync(d, { recursive: true }); const src = path.join(CR, "battery", "json", `bp-${e}`, sg); if (fs.existsSync(src)) fs.symlinkSync(src, path.join(d, sg)); }
    for (const t of ["light", "dark"]) {
        const d = path.join(st, "battery", "json", "bp-webkit", `fmlow-${t}`);
        ["runs", "rerun1/runs", "rerun2/runs"].forEach((r, i) => { const x = path.join(d, r, "FM-bp"); fs.mkdirSync(x, { recursive: true }); fs.symlinkSync(path.join(CR, "fmlow", `${t}-r${i + 1}`, "FM.json"), path.join(x, "FM.json")); });
        const lg = fs.readFileSync(path.join(CR, "fmlow", `fmlow-webkit-${t}.log`), "utf8"), m = /^admitted (.*?) \d+:\d+ +up .*load averages: ([\d.]+)/m.exec(lg), l = m ? +m[2] : null;
        fs.writeFileSync(path.join(d, "admit.json"), JSON.stringify({ stage: `fmlow-${t}`, max: 15, deferred: !(l != null && l <= 15), load: l, attempts: [{ try: 1, at: m?.[1] ?? null, load: l, deferred: !(l != null && l <= 15) }], from: `pass-7/D2-Bp-crit-records/fmlow/fmlow-webkit-${t}.log` }));
    }
    const stripOf = (r) => { const sub = r.stage === "fmlow" ? path.join("fmlow", `${r.theme}-${r.run}`) : path.join("filmstrips", `${r.engine}-${r.theme === "dark" ? "dark" : "main"}`, r.run); const f = path.join(CR, sub, `strip-${r.engine}-${r.cell.replace(/^film·/, "").replace(/(\+shim|-unshimmed)$/, "")}.png`); return fs.existsSync(f) ? f : null; };
    const { cells: cc, columns: c7 } = readRecords(st, "bp", { stripOf });
    const nReads = (col, n) => new Set(col.hits.map((h) => `${h.cell}|${h.stage}|${h.run}`)).size === n;
    for (const [e, t, want_, n] of [["webkit", "light", "FAIL", 2], ["webkit", "dark", "FAIL", 4], ["chromium", "light", "PASS", 0], ["chromium", "dark", "PASS", 0]]) {
        const col = colOf(c7, e, t);
        log({ witness: "COLR", fixture: `bp7 ${e === "webkit" ? "W" : "C"}·${t[0]}`, expect: `column ${want_}, ${n} read(s) over 1 frame`, got: `${col.v}: ${col.summary.slice(0, 700)}`, ok: col.v === want_ && nReads(col, n), ms: Date.now() - t0, load: loadAvg() });
    }
    const low = cc.filter((c) => c.cell === "film·low-slot");
    log({ witness: "COLR", fixture: "bp7 fmlow light", expect: "the critic's light low-load slot (admitted at 35.94) reads deferred and enters no column", got: low.map((c) => `${c.theme}: ${c.summary}`).join(" | ") || "none", ok: low.length === 1 && low[0].theme === "light" && /deferred/.test(low[0].summary) && !colOf(c7, "webkit", "light").hits.some((h) => h.stage === "fmlow"), ms: Date.now() - t0, load: loadAvg() });
    const td = colOf(c7, "webkit", "dark").hits.concat(colOf(c7, "webkit", "light").hits).filter((h) => h.slot === 2).map((h) => `${h.theme[0]}:${h.cell.replace(/^film·/, "")}:${h.stage === "fmlow" ? "low-" : ""}${h.run}=${h.diffs.join("/")}(${h.kind})`).sort();
    const want = ["d:first-expand:main=8.01(distinct)", "d:warm-collapse:low-r3=0.04(held)", "d:warm-collapse:rerun2=0.03(held)", "d:warm-expand:low-r2=0.07(held)", "l:warm-collapse:main=0.05(held)", "l:warm-expand:rerun2=0.09(held)"];
    log({ witness: "COLR", fixture: "bp7 tile diff", expect: "each 2-frame run's tile difference equals tilediff.txt (8.01 two distinct frames; 0.03-0.09 held)", got: td.join(" "), ok: td.join() === want.join(), ms: Date.now() - t0, load: loadAvg() });
    // the plant's control: H7-3 + H6-7 per cell (the rule H8-1 replaces) forgives every one of those reads
    const perCell = [];
    for (const e of ["webkit"]) for (const [sg, t] of [["main", "light"], ["dark", "dark"]]) {
        const j = (k) => { try { return JSON.parse(fs.readFileSync(path.join(CR, "battery", "json", `bp-${e}`, sg, ...(k ? [`rerun${k}`] : []), "runs", "FM-bp", "FM.json"), "utf8")).cells; } catch { return []; } };
        const [m0, r1, r2] = [j(0), j(1), j(2)];
        for (const c of m0.filter((x) => B2_FM.test(x.cell))) { const rr = rerunRule(c, [r1, r2].map((r) => r.find((y) => y.cell === c.cell) ?? null), { always: true }); perCell.push(`${t[0]}:${c.cell.replace(/^film·/, "")}=${rr.v}`); }
    }
    log({ witness: "COLR", fixture: "bp7 per-cell (control)", expect: "the replaced per-cell rule reads no B2 cell FAIL in W·l or W·d (the forgiveness H8-1 removes)", got: perCell.join(" "), ok: perCell.length === 12 && perCell.every((x) => !/=FAIL$/.test(x)), ms: Date.now() - t0, load: loadAvg() });
    const { columns: c6 } = readRecords(path.join(DOCK, "pass-7", "H7-records"), "bp");
    const four = [["chromium", "light"], ["chromium", "dark"], ["webkit", "light"], ["webkit", "dark"]].map(([e, t]) => `${e === "webkit" ? "W" : "C"}·${t[0]} ${colOf(c6, e, t).v} (${new Set(colOf(c6, e, t).hits.map((h) => h.cell + h.run)).size} reads)`);
    log({ witness: "COLR", fixture: "bp6 (H7 records)", expect: "pass 6's B′ FAILs hole in four columns", got: four.join("; "), ok: four.every((x) => / FAIL /.test(x)), ms: Date.now() - t0, load: loadAvg() });
}
// H8-1 · witness COLS: synthetic columns (no browser)
if (only && only.includes("COLS")) {
    const t0 = Date.now();
    const fr = (slots) => [[0, 0, 200, [[1, 1], [2, 1], [3, 1]], 1], ...slots.map((s, i) => [40 * (i + 1), 0, 200, [[1, 1], [2, s], [3, 1]], 0.05]), [40 * (slots.length + 1), 0, 200, [[1, 1], [2, 1], [3, 1]], 3]];
    const rd = (cell, run, slots) => ({ cell: "film·" + cell, run, stage: "main", load: 9, c: { cell: "film·" + cell, hole: { frames: fr(slots) }, failed: slots.filter((x) => x < 0.1).length > 1 ? ["hole"] : [] } });
    const quiet = ["first-expand", "warm-expand", "warm-collapse", "content-add", "swap-short", "swap-long"].flatMap((c) => ["main", "rerun1", "rerun2"].map((r) => rd(c, r, [1, 0.05, 1])));
    const one = quiet.map((r) => (r.cell === "film·warm-expand" && r.run === "rerun2" ? rd("warm-expand", "rerun2", [0.02, 0.03, 1]) : r));
    const a = holeColumn(one);
    log({ witness: "COLS", fixture: "isolated", expect: "18 reads, one isolated 2-frame read: NOT-REPRODUCED", got: `${a.v}: ${a.summary}`, ok: a.v === "NOT-REPRODUCED" && a.hits.length === 1, ms: Date.now() - t0, load: loadAvg() });
    const two = one.map((r) => (r.cell === "film·first-expand" && r.run === "main" ? rd("first-expand", "main", [0.01, 0.02, 0.5]) : r));
    const b = holeColumn(two);
    log({ witness: "COLS", fixture: "two-same-slot", expect: "two reads (two cells) at one slot: FAIL", got: `${b.v}: ${b.summary}`, ok: b.v === "FAIL", ms: Date.now() - t0, load: loadAvg() });
    const other = (r) => ({ ...r, c: { ...r.c, hole: { frames: r.c.hole.frames.map((f) => [f[0], f[1], f[2], [f[3][0], [2, 1], [4, f[3][1][1]], f[3][2]], f[4]]) } } });
    const c2 = holeColumn(two.map((r) => (r.cell === "film·first-expand" && r.run === "main" ? other(r) : r)));
    log({ witness: "COLS", fixture: "two-slots", expect: "two reads at two different slots: NOT-REPRODUCED", got: `${c2.v}: ${c2.summary}`, ok: c2.v === "NOT-REPRODUCED" && c2.hits.length === 2, ms: Date.now() - t0, load: loadAvg() });
    const un = quiet.map((r, i) => (i < 2 ? { ...r, c: { cell: r.cell, hole: null, failed: ["hole"] } } : r));
    const d = holeColumn(un);
    log({ witness: "COLS", fixture: "unread×2", expect: "two strips that cannot be read: FAIL (never a silent green)", got: `${d.v}: ${d.summary}`, ok: d.v === "FAIL", ms: Date.now() - t0, load: loadAvg() });
    const q = holeColumn(quiet);
    log({ witness: "COLS", fixture: "quiet", expect: "18 reads with one-frame holes only: PASS", got: `${q.v}: ${q.summary}`, ok: q.v === "PASS", ms: Date.now() - t0, load: loadAvg() });
}
// H8-1 · witness COL (browser): fixture columns through the low-load stage's runner, three runs of the six B2 cells
// H8-2 · witness LOW (browser): the admission gate
const lowStage = (e, fixture, theme, env, guard) => {
    const lab = `fixture-${fixture}`, rec = path.join(outRoot ?? ".", `low-${e}-${fixture}-${theme}-${env.FMLOW_MAX}`);
    fs.rmSync(rec, { recursive: true, force: true });
    const t0 = Date.now(), load = loadAvg();
    const r = spawnSync("bash", [path.join(HERE, "battery.sh"), path.join(rec, "out"), "fmlow"], { encoding: "utf8", maxBuffer: 1 << 26, env: { ...process.env, ...(guard ? {} : { NOGUARD: "1" }), BUILD: lab, FIXTURE: fixture, ENG: e, THEME: theme, REC: path.join(rec, "battery"), ...env } });
    const { cells, columns } = readRecords(rec, lab, { engines: [e] });
    let adm = null; try { adm = JSON.parse(fs.readFileSync(path.join(rec, "battery", "json", `${lab}-${e}`, `fmlow-${theme}`, "admit.json"), "utf8")); } catch { }
    return { code: r.status, cells, col: colOf(columns, e, theme), adm, ms: Date.now() - t0, load };
};
if (only && only.includes("COL")) for (const e of want) {
    for (const [fx, theme, wantV] of [["pass", "light", "PASS"], ["pass", "dark", "PASS"], ["hole", "light", "FAIL"]]) {
        const x = lowStage(e, fx, theme, { FMLOW_MAX: "1000", FMLOW_QUEUE_MIN: "0", FMLOW_TRIES: "1" }, false);
        log({ witness: "COL", fixture: `${fx}${theme === "dark" ? "@dark" : ""} ${ENGINE_LABEL[e]}`, expect: `column ${wantV} over 18 reads`, got: `${x.col.v}: ${x.col.summary.slice(0, 600)}`, ok: x.col.v === wantV && x.col.reads === 18, ms: x.ms, load: x.load });
    }
}
if (only && only.includes("LOW")) for (const e of want) {
    const p = lowStage(e, "pass", "light", { FMLOW_MAX: "0", FMLOW_QUEUE_MIN: "0", FMLOW_TRIES: "1" }, true);
    const sl = p.cells.find((c) => c.cell === "film·low-slot");
    log({ witness: "LOW", fixture: `admitted-above ${ENGINE_LABEL[e]}`, expect: "a slot admitted above its bound (0) reads deferred, runs no cell and enters no column", got: `admit ${JSON.stringify(p.adm)}; ${sl ? sl.summary : "no low-slot record"}; column ${p.col.v} (${p.col.reads ?? 0} reads)`, ok: !!p.adm && p.adm.deferred === true && !!sl && /deferred/.test(sl.summary) && !(p.col.reads > 0), ms: p.ms, load: p.load });
    const g = lowStage(e, "pass", "light", { FMLOW_MAX: "15", FMLOW_QUEUE_MIN: "60", FMLOW_TRIES: "3" }, true);
    const loads = g.cells.filter((c) => /^film·/.test(c.cell) && c.cell !== "film·hole·column" && c.cell !== "film·low-slot").map((c) => c.load);
    log({ witness: "LOW", fixture: `admitted-under ${ENGINE_LABEL[e]}`, expect: "a slot admitted at load ≤ 15 is read: 18 reads, every cell with its load, column PASS", got: `admit ${JSON.stringify(g.adm)}; column ${g.col.v} (${g.col.reads ?? 0} reads); cell loads ${loads.length ? Math.min(...loads) + "-" + Math.max(...loads) : "none"}`, ok: !!g.adm && g.adm.deferred === false && g.adm.load <= 15 && g.col.v === "PASS" && g.col.reads === 18 && loads.every((v) => typeof v === "number"), ms: g.ms, load: g.load });
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

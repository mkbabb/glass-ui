// cells.mjs · the D2 digest (H6-7, pass-6/H6.md): one verdict per cell, the 38-row map of REGISTRY §P5-7.5, per build,
// theme and engine. After pass-5's per-seat copies (FV4-cells.mjs, the critics' cells.mjs), now one tool in the harness.
//
//   node cells.mjs --build <label>=<records dir>[,<label>=<dir>…] --out <dir> [--tag <name>]
//                  [--f7 <label>=<F7.json>,…] [--pr <label>=<PR.json>,…]
//                  [--ruled]                          OWNER-BLOCKED cells read on O-103's branches (Q-4 (c), Q-12 (b))
//   node cells.mjs --selftest                          the digest rule's plants (no browser)
//
// A records dir holds battery/json/<label>-<engine>/<stage>/{runs,rerun1/runs,rerun2/runs}/<W>-<label>/<W>.json (battery.sh)
// and, unless --f7/--pr name another file, F7-<label>/F7.json and PR-<label>/PR.json. Writes <out>/cells-<tag>.json,
// rows-<tag>.md (every row per build, theme and engine), table-<tag>.md (one line per row) and counts-<tag>.md.
//
// A cell's verdict: PASS, FAIL, UNMEASURED, OWNER-BLOCKED or RECORD, from the main run, then the re-run rule:
//   · a FAIL whose two re-runs both read PASS is NOT-REPRODUCED (red only under load);
//   · H6-7: per failing CHECK, a re-run that reads PASS, or reads the cell OWNER-BLOCKED with that check absent from its
//     failures, does not reproduce the check. A check neither re-run reproduces is NOT-REPRODUCED and leaves the cell's
//     failures; a cell left with no failing check is NOT-REPRODUCED; one whose remaining checks both re-runs read
//     OWNER-BLOCKED is OWNER-BLOCKED. Pass 5 kept such a FAIL standing on a check no re-run showed (G-crit §6).
// H6-4: UNMEASURED cells (ST's missing marker or off-scale video among them) are named in the row lines, never counted
// as PASS or FAIL.
// H6-11 + O-103 (audit/INBOUND.md, 2026-10-19: the owner's delegate ruled Q-4 (c) and Q-12 (b)): `--ruled` reads every
// OWNER-BLOCKED cell, in the main run and in each re-run, on the ruled branch the witness printed beside it (`window.q4c`,
// `q12.b`), so the ruling turns cells without a re-run (REGISTRY §P5-6). Without `--ruled` the digest reads the witnesses'
// own verdicts (OWNER-BLOCKED stands).
import fs from "node:fs";
import path from "node:path";
import { parseArgs } from "./lib.mjs";

export const verdict = (c) => (c.record ? "RECORD" : c.pass ? "PASS" : c.unmeasured ? "UNMEASURED" : c.ownerBlocked ? "OWNER-BLOCKED" : "FAIL");
const strip = (n) => n.replace(/(\+shim|-unshimmed)$/, "");

/** O-103 · a cell OWNER-BLOCKED on Q-4 or Q-12 read on the ruled branch: Q-4 (c), the 270 ms dock clock + 2F + stall
 *  with W-8 as written, and, where the cell was blocked on a seat still moving after the flag (lib.mjs q4Blocked), that
 *  seat's last move inside the (c) allowance; Q-12 (b), every frame between the two rest radii. Any other cell is as read. */
export function ruled(c) {
    if (!c || c.pass || c.unmeasured || c.record) return c;
    // H6 entry 3 · a FAIL cell whose `window` check failed beside another check (so the witness could not read it
    // OWNER-BLOCKED) is read on the ruled branch too: Q-4 (c) holding strikes `window` from its failures, and the cell
    // stands or falls on the rest. Pass 6's B′ cells fail [window, stub] with (c) holding (H6.md §3)
    if (!c.ownerBlocked) {
        if (!(c.failed ?? []).includes("window") || c.window?.q4c?.ok !== true) return c;
        const failed = c.failed.filter((k) => k !== "window");
        return { ...c, pass: !failed.length, failed, ruled: "Q-4 (c) window" };
    }
    let failed;
    if (c.ownerBlocked === "Q-4") {
        const q = c.window?.q4c, l = c.lanes, rest = (c.failed ?? []).filter((k) => k !== "window");
        const seatOk = !rest.length || (q?.allowMs != null && l?.seatAfterFlag && c.window.open != null && l.seatAfterFlag.lastMs - c.window.open <= q.allowMs);
        failed = [q?.ok === true ? null : "window", seatOk ? null : "lanes"].filter(Boolean);
    } else if (c.ownerBlocked === "Q-12") failed = c.q12?.b?.ok === true ? [] : ["card"];
    else return c;
    return { ...c, pass: !failed.length, ownerBlocked: undefined, failed, ruled: `${c.ownerBlocked} ${c.ownerBlocked === "Q-4" ? "(c)" : "(b)"}` };
}

/** H6-7 · the re-run rule. main: the main run's cell; re: the two re-runs' cells (null when absent). */
export function rerunRule(main, re) {
    let v = verdict(main); const failed = [...(main.failed ?? [])];
    const rr = re.map((x) => (x ? verdict(x) : null));
    if (v !== "FAIL") return { v, failed, nrChecks: [] };
    if (rr.every((x) => x === "PASS")) return { v: "NOT-REPRODUCED", failed: [], nrChecks: failed };
    if (!failed.length || re.some((x) => !x)) return { v, failed, nrChecks: [] };
    const absent = (x, k) => verdict(x) === "PASS" || (verdict(x) === "OWNER-BLOCKED" && !(x.failed ?? []).includes(k));
    const nrChecks = failed.filter((k) => re.every((x) => absent(x, k)));
    const stand = failed.filter((k) => !nrChecks.includes(k));
    if (!stand.length) return { v: "NOT-REPRODUCED", failed: [], nrChecks };
    if (nrChecks.length && re.every((x) => verdict(x) === "OWNER-BLOCKED")) return { v: "OWNER-BLOCKED", failed: stand, nrChecks };
    return { v, failed: stand, nrChecks };
}

// the 38 rows (REGISTRY §P5-7.5; H6 re-cuts the witnesses, no row is added): [row, witness, predicate, checks]
// checks: null (any failure bears), "CRASH", a list, or a function of the cell giving one of those
const W3R1 = ["continuity", "landing", "seatStep", "seatOverlap", "blank", "faces", "terminal", "trajectory", "rest", "seatWidth", "errors", "vagree", "owners", "rung"];
export const ROWS = [
    ["P1", "W1 (card per H5-12, Q-12 band H6-11) + W7", (c) => c.w === "W1" || c.w === "W7", null],
    ["P2", "W2 (reach by key, H5-1)", (c) => c.w === "W2", null],
    ["P3", "W3 every check (W-8 in time, H6-5; Q-4 readings, H6-11), W6 (H5-5), W8", (c) => (c.w === "W3" && !/^retarget·context/.test(c.cell)) || c.w === "W6" || c.w === "W8", null],
    ["P4", "W4", (c) => c.w === "W4", null],
    ["P5", "W5 + R6", (c) => c.w === "W5" || c.w === "R6", null],
    ["F1", "W1 rests + W2", (c) => (c.w === "W1" && /rest/.test(c.cell)) || (c.w === "W2" && !/long-run-v/.test(c.cell)), null],
    ["F2", "W5", (c) => c.w === "W5", null],
    ["F3", "W4 coarse, hover gate", (c) => c.w === "W4" && /coarse|tap|hover|press/.test(c.cell), null],
    ["F4", "W4 compact", (c) => c.w === "W4" && /compact/.test(c.cell), null],
    ["F5", "W3 first-expand (faces read in main, H5-9)", (c) => c.w === "W3" && /^first-expand/.test(c.cell), ["continuity", "owners", "faces"]],
    ["F6", "crash-free (every browser cell)", (c) => c.engine !== "source", "CRASH"],
    ["F7", "F7 whole suite + gates (H5-10)", (c) => c.w === "F7", null],
    ["N1", "W3 anchor-end", (c) => c.w === "W3" && /^anchor-end/.test(c.cell), ["anchor"]],
    ["N2", "W3 stretch·lead-add", (c) => c.w === "W3" && /^stretch·lead-add/.test(c.cell), ["seatStep"]],
    ["N3", "W3 lattice, infanim, seat-transition", (c) => c.w === "W3" && /^lattice|^infanim|^seat-transition/.test(c.cell), ["seatWidth", "seatStep", "errors", "owners", "trajectory"]],
    ["N4", "W7 gutter, badge, whole, same", (c) => c.w === "W7", ["gutter", "badge", "whole", "same"]],
    ["N5", "PR count, readers, partials (H5-8), harness (H6-9) + W2 long-run-v + CF", (c) => (c.w === "PR" && /count|readers|partials|harness/.test(c.cell)) || (c.w === "W2" && /long-run-v/.test(c.cell)), null],
    ["R1", "W3 continuity, seats, paint floor + CASES capped", (c) => (c.w === "W3" && !/^retarget·context|^neighbour·/.test(c.cell)) || (c.w === "CASES" && /^case·capped/.test(c.cell)), W3R1.concat(["continuity"])],
    ["R2", "W3 leaving + vanish on every leaver (H5-4), ink ≤ 1 (H6-3)", (c) => c.w === "W3", ["leaving", "vanish", "ink"]],
    ["R3", "W3 reversal", (c) => c.w === "W3" && /^reversal/.test(c.cell), ["trajectory"]],
    ["R4", "ST five timings", (c) => c.w === "ST" && /^stall·(?!nb·)/.test(c.cell), null],
    ["R5", "R5 hit sampler", (c) => c.w === "R5", null],
    ["R6", "W3 splice + stub (edge, H6-1), FM stub", (c) => c.w === "W3" || c.w === "FM", ["splice", "stub"]],
    ["R7", "W3 lanes + seat positions (H5-7) + CASES rotated", (c) => c.w === "W3" || (c.w === "CASES" && /^case·rotated/.test(c.cell)), ["lanes"]],
    ["R8", "W3 neighbour + ST nb (markers found, H6-4) + CASES consumer-margin", (c) => (c.w === "W3" && /^neighbour·/.test(c.cell)) || (c.w === "ST" && /^stall·nb·/.test(c.cell)) || (c.w === "CASES" && /^case·consumer-margin/.test(c.cell)), null],
    ["B1", "W3 retarget·context (H5-2)", (c) => c.w === "W3" && /^retarget·context/.test(c.cell), null],
    ["B2", "FM strips (tiles, stub, hole) + W3 stub, hole (H6-1, H6-2)", (c) => c.w === "FM" || c.w === "W3", (c) => (c.w === "FM" ? null : ["stub", "hole"])],
    ["B3", "PR count, rows, partials, citations, harness (H6-9)", (c) => c.w === "PR" && /count|rows|partials|citations|harness/.test(c.cell), null],
    ["C1", "CF c1·shape·h (ownshape, corner: H5-6)", (c) => c.w === "CF" && /^c1·shape·h/.test(c.cell), null],
    ["C2", "CF c2 (prm per Q-18 (a): H5-6)", (c) => c.w === "CF" && /^c2·(morph·h|prm|rapid)/.test(c.cell), null],
    ["C3", "CF c3 + coarse tap", (c) => c.w === "CF" && /^c3·|^c7·coarse-tap/.test(c.cell), null],
    ["C4", "CF c4", (c) => c.w === "CF" && /^c4·/.test(c.cell), null],
    ["C5", "CF c5", (c) => c.w === "CF" && /^c5·/.test(c.cell), null],
    ["C6", "CF c6", (c) => c.w === "CF" && /^c6·/.test(c.cell), null],
    ["C7", "CF vertical + narrow", (c) => c.w === "CF" && /^c1·shape·v|^c2·morph·v|^c7·/.test(c.cell), null],
    ["C8", "CF c8·outside-press (H5-11; opens on collapsed starts, H6-6)", (c) => c.w === "CF" && /^c8·/.test(c.cell), null],
    ["C9", "CF c9·short-coarse (H5-11)", (c) => c.w === "CF" && /^c9·/.test(c.cell), null],
    ["L1", "L1 census", (c) => c.w === "L1", null],
];
const R38 = ROWS.map((r) => r[0]), R36 = R38.filter((r) => r !== "C8" && r !== "C9");
const R24 = ["P1", "P2", "P3", "P4", "P5", "F1", "F2", "F3", "F4", "F5", "F6", "F7", "N1", "N2", "N3", "N4", "R1", "R2", "R3", "R4", "R5", "B1", "B2", "B3"];

if (process.argv[2] === "--selftest") {
    const rows = [];
    const ok = (name, cond, got) => { rows.push(cond); console.log(`${cond ? "OK  " : "BAD "} SYN  ${name}  ${got}`); };
    const F = (failed) => ({ pass: false, failed }), OBc = (failed) => ({ pass: false, ownerBlocked: "Q-4", failed }), P = { pass: true, failed: [] };
    const a = rerunRule(F(["window", "lanes"]), [OBc(["window"]), OBc(["window"])]);
    ok("ob-rerun", a.v === "OWNER-BLOCKED" && a.nrChecks.join() === "lanes", `main FAIL [window, lanes], re-runs OB [window] ×2 → ${a.v}, NOT-REPRODUCED checks [${a.nrChecks}]`);
    const old = (m, re) => (verdict(m) === "FAIL" && re.every((x) => verdict(x) === "PASS") ? "NOT-REPRODUCED" : verdict(m));
    ok("ob-rerun-plant", old(F(["window", "lanes"]), [OBc(["window"]), OBc(["window"])]) === "FAIL", "the pass-5 rule (plant) keeps that cell FAIL on lanes, which no re-run showed");
    const b = rerunRule(F(["window", "stub"]), [OBc(["window"]), F(["window", "stub"])]);
    ok("reproduced", b.v === "FAIL" && b.failed.includes("stub") && !b.nrChecks.includes("stub"), `main FAIL [window, stub], re-runs OB [window] and FAIL [window, stub] → ${b.v} [${b.failed}]`);
    const c = rerunRule(F(["stub"]), [P, OBc(["window"])]);
    ok("absent-in-ob", c.v === "NOT-REPRODUCED", `main FAIL [stub], re-runs PASS and OB [window] → ${c.v}`);
    const d = rerunRule(F(["stub"]), [P, P]);
    ok("both-pass", d.v === "NOT-REPRODUCED", `main FAIL [stub], re-runs PASS ×2 → ${d.v}`);
    const e = rerunRule(F(["stub"]), [P, null]);
    ok("one-rerun", e.v === "FAIL", `main FAIL [stub], one re-run absent → ${e.v} (no re-run, no ruling)`);
    // O-103 · the ruled branch (--ruled)
    const OB4 = (q4c, extra = {}) => ({ pass: false, ownerBlocked: "Q-4", failed: ["window"], window: { q4c, open: 0 }, ...extra });
    const r1 = ruled(OB4({ ok: true, allowMs: 303 }));
    ok("ruled-q4c-holds", verdict(r1) === "PASS", `OB (Q-4), (c) holds → ${verdict(r1)}`);
    const r2 = ruled(OB4({ ok: false, allowMs: 303 }));
    ok("ruled-q4c-fails", verdict(r2) === "FAIL" && r2.failed.join() === "window", `OB (Q-4), (c) fails → ${verdict(r2)} [${r2.failed}]`);
    const r3 = ruled(OB4({ ok: true, allowMs: 303 }, { failed: ["window", "lanes"], lanes: { seatAfterFlag: { lastMs: 340 } } }));
    ok("ruled-q4c-seat", verdict(r3) === "FAIL" && r3.failed.join() === "lanes", `OB (Q-4) on a seat moving 340 ms after the flag, (c) allow 303 → ${verdict(r3)} [${r3.failed}]`);
    const r6 = ruled({ pass: false, failed: ["window", "stub"], window: { q4c: { ok: true, allowMs: 313.4 } } });
    ok("ruled-fail-q4c", verdict(r6) === "FAIL" && r6.failed.join() === "stub", `FAIL [window, stub], (c) holds → ${verdict(r6)} [${r6.failed}]`);
    const r7 = ruled({ pass: false, failed: ["window", "stub"], window: { q4c: { ok: false, allowMs: 313.4 } } });
    ok("ruled-fail-q4c-fails", r7.failed.join() === "window,stub", `FAIL [window, stub], (c) fails → ${verdict(r7)} [${r7.failed}] (plant: the window stands)`);
    const r4 = ruled({ pass: false, ownerBlocked: "Q-12", failed: ["card"], q12: { b: { ok: true } } });
    ok("ruled-q12b", verdict(r4) === "PASS", `OB (Q-12), band holds → ${verdict(r4)}`);
    const r5 = ruled({ pass: false, ownerBlocked: "Q-12", failed: ["card"], q12: { b: { ok: false } } });
    ok("ruled-q12b-fails", verdict(r5) === "FAIL", `OB (Q-12), band fails → ${verdict(r5)}`);
    ok("unruled-plant", verdict(OB4({ ok: true })) === "OWNER-BLOCKED", "without --ruled the same cell reads OWNER-BLOCKED (the witness's verdict, unchanged)");
    console.log(`${rows.every(Boolean) ? "SYN DIGEST PASS" : "SYN DIGEST FAIL"}  ${rows.filter(Boolean).length}/${rows.length}`);
    process.exitCode = rows.every(Boolean) ? 0 : 1;
} else {
    const args = parseArgs();
    const list = (v) => (v == null || v === true ? [] : String(v).split(","));
    const pairs = (k) => Object.fromEntries(list(args[k]).map((s) => { const i = String(s).indexOf("="); return [String(s).slice(0, i), String(s).slice(i + 1)]; }));
    const SRC = pairs("build"), F7 = pairs("f7"), PR = pairs("pr");
    const BUILDS = Object.keys(SRC);
    if (!BUILDS.length || !args.out) { console.error("usage: node cells.mjs --build <label>=<records dir>[,…] --out <dir> [--tag t] | --selftest"); process.exit(2); }
    const RULED = !!args.ruled, rule = (c) => (RULED ? ruled(c) : c);
    const OUTD = path.resolve(String(args.out)), TAG = (args.tag ?? BUILDS.join("-")) + (RULED ? "-ruled" : "");
    fs.mkdirSync(OUTD, { recursive: true });
    const ENGS = ["chromium", "webkit"];
    const STAGES = [["main", "light"], ["rest", "light"], ["dark", "dark"], ["darkrest", "dark"]];
    const read = (f) => { try { return JSON.parse(fs.readFileSync(f, "utf8")); } catch { return null; } };
    const cells = [];
    for (const b of BUILDS) for (const e of ENGS) for (const [st, theme] of STAGES) {
        const base = path.join(SRC[b], "battery", "json", `${b}-${e}`, st);
        let ws = []; try { ws = fs.readdirSync(path.join(base, "runs")); } catch { continue; }
        for (const dir of ws) {
            const w = dir.slice(0, dir.lastIndexOf(`-${b}`));
            const main = read(path.join(base, "runs", dir, `${w}.json`));
            if (!main) continue;
            const re = [1, 2].map((k) => read(path.join(base, `rerun${k}`, "runs", dir, `${w}.json`)));
            for (const c0 of main.cells) {
                if (/^__/.test(c0.cell)) continue;
                const c = rule(c0);
                const reC = re.map((r) => rule(r?.cells.find((y) => y.engine === c.engine && strip(y.cell) === strip(c.cell)) ?? null));
                const rr = rerunRule(c, reC);
                cells.push({ w, stage: st, theme, build: b, engine: c.engine, cell: c.cell, verdict: rr.v, mainVerdict: verdict(c), reruns: reC.map((x) => (x ? verdict(x) : null)), reLoads: reC.map((x) => x?.load ?? null), failed: rr.failed, mainFailed: c.failed ?? [], nrChecks: rr.nrChecks, ownerBlocked: c.ownerBlocked, ruled: c.ruled, crashed: /not measured: .*(crash|closed)|Page crashed|Target closed/i.test(c.summary ?? ""), load: c.load, summary: (c.summary ?? "").slice(0, 900) });
            }
        }
    }
    for (const b of BUILDS) {
        for (const [w, f] of [["F7", F7[b] ?? path.join(SRC[b], `F7-${b}`, "F7.json")], ["PR", PR[b] ?? path.join(SRC[b], `PR-${b}`, "PR.json")]]) {
            const j = read(f); if (!j) continue;
            for (const c of j.cells) cells.push({ w, stage: "tree", theme: "-", build: b, engine: "source", cell: c.cell, verdict: verdict(c), reruns: [], failed: c.failed ?? [], crashed: false, load: c.load, from: path.relative(OUTD, f), summary: (c.summary ?? "").slice(0, 900) });
        }
    }
    fs.writeFileSync(path.join(OUTD, `cells-${TAG}.json`), JSON.stringify({ when: new Date().toISOString(), cells }, null, 1));

    const checksOf = (checks, c) => (typeof checks === "function" ? checks(c) : checks);
    const bears = (c, checks) => { const k = checksOf(checks, c); return k === "CRASH" ? c.crashed : c.crashed || !k || k.some((x) => c.failed.includes(x)); };
    const cellName = (c, checks) => { const k = checksOf(checks, c); return strip(c.cell) + (c.crashed && !c.failed.length ? "[not measured]" : Array.isArray(k) ? "[" + c.failed.filter((x) => k.includes(x)).join(",") + "]" : c.failed.length ? "[" + c.failed.join(",") + "]" : ""); };
    function judge(cs, checks) {
        if (!cs.length) return { st: "—" };
        const red = cs.filter((c) => c.verdict === "FAIL" && bears(c, checks));
        const nr = cs.filter((c) => (c.verdict === "NOT-REPRODUCED" && bears({ ...c, failed: c.mainFailed ?? c.failed }, checks)) || (c.nrChecks?.length && bears({ ...c, failed: c.nrChecks }, checks)));
        const ob = typeof checks === "function" || Array.isArray(checks) || checks === "CRASH" ? [] : cs.filter((c) => c.verdict === "OWNER-BLOCKED");
        const um = cs.filter((c) => c.verdict === "UNMEASURED");
        const st = red.length ? "FAIL" : ob.length ? "OWNER-BLOCKED" : um.length === cs.length ? "UNMEASURED" : "PASS";
        return { st, n: cs.length, red, nr, ob, um };
    }
    const fmt = (r, checks) => r.st === "—" ? "—" : `${r.st} ${r.n - r.red.length}/${r.n}${r.red.length ? "; red: " + r.red.slice(0, 4).map((c) => cellName(c, checks)).join(", ") + (r.red.length > 4 ? ` +${r.red.length - 4}` : "") : ""}${r.nr.length ? `; NR ${r.nr.length}` : ""}${r.ob.length ? `; OB ${r.ob.length}` : ""}${r.um.length ? `; UM ${r.um.length} (${r.um.slice(0, 3).map((c) => strip(c.cell)).join(", ")}${r.um.length > 3 ? " …" : ""})` : ""}`;
    const loadsOf = (cs) => { const l = cs.flatMap((c) => [c.load, ...(c.reLoads ?? [])]).filter((v) => typeof v === "number"); return l.length ? `${Math.min(...l)}-${Math.max(...l)}` : "-"; };
    const lines = ["| row | witness | build | theme | Chromium | Playwright WebKit | source | load (cells) |", "|---|---|---|---|---|---|---|---|"];
    const verdictOf = {};
    for (const [row, what, on, checks] of ROWS) for (const b of BUILDS) {
        const all = cells.filter((c) => c.build === b && on(c));
        const tot = judge(all, checks);
        verdictOf[row + "|" + b] = { st: tot.st, red: tot.red ?? [], nr: (tot.nr ?? []).length, ob: (tot.ob ?? []).length, um: (tot.um ?? []).length, n: tot.n ?? 0 };
        for (const th of ["light", "dark", "-"]) {
            const per = [...ENGS, "source"].map((e) => fmt(judge(all.filter((c) => c.engine === e && c.theme === th), checks), checks));
            if (per.every((x) => x === "—")) continue;
            lines.push(`| ${row} | ${what} | ${b} | ${th} | ${per.join(" | ")} | ${loadsOf(all.filter((c) => c.theme === th))} |`);
        }
    }
    fs.writeFileSync(path.join(OUTD, `rows-${TAG}.md`), lines.join("\n") + "\n");
    const tl = ["| row | witness | " + BUILDS.join(" | ") + " |", "|---|---|" + BUILDS.map(() => "---").join("|") + "|"];
    for (const [row, what, , checks] of ROWS) tl.push(`| ${row} | ${what} | ${BUILDS.map((b) => { const v = verdictOf[row + "|" + b]; return v.st === "—" ? "—" : `${v.st}${v.red.length ? " (" + [...new Set(v.red.map((c) => cellName(c, checks) + (c.engine === "webkit" ? " W" : c.engine === "chromium" ? " C" : "") + (c.theme === "dark" ? "·d" : "")))].slice(0, 3).join(", ") + (v.red.length > 3 ? ` +${v.red.length - 3}` : "") + ")" : ""}${v.ob ? ` OB ${v.ob}` : ""}${v.nr ? ` NR ${v.nr}` : ""}${v.um ? ` UM ${v.um}` : ""}`; }).join(" | ")} |`);
    const score = (b, rows) => rows.filter((r) => verdictOf[r + "|" + b].st === "PASS").length;
    tl.push("", "| build | 38 rows PASS | first 36 | first 24 | OWNER-BLOCKED rows | UNMEASURED rows |", "|---|---:|---:|---:|---:|---:|");
    for (const b of BUILDS) tl.push(`| ${b} | ${score(b, R38)}/38 | ${score(b, R36)}/36 | ${score(b, R24)}/24 | ${R38.filter((r) => verdictOf[r + "|" + b].st === "OWNER-BLOCKED").join(", ") || "-"} | ${R38.filter((r) => verdictOf[r + "|" + b].st === "UNMEASURED" || verdictOf[r + "|" + b].st === "—").join(", ") || "-"} |`);
    fs.writeFileSync(path.join(OUTD, `table-${TAG}.md`), tl.join("\n") + "\n");
    const cl = ["| witness | build | theme | engine | PASS | FAIL | NOT-REPRODUCED | OWNER-BLOCKED | UNMEASURED | RECORD | crashed | load (cells + re-runs) |", "|---|---|---|---|---:|---:|---:|---:|---:|---:|---:|---|"];
    for (const k of [...new Set(cells.map((c) => [c.w, c.build, c.theme, c.engine].join("|")))]) {
        const [w, b, th, e] = k.split("|");
        const cs = cells.filter((c) => c.w === w && c.build === b && c.theme === th && c.engine === e);
        const n = (v) => cs.filter((c) => c.verdict === v).length;
        cl.push(`| ${w} | ${b} | ${th} | ${e === "webkit" ? "Playwright WebKit" : e} | ${n("PASS")} | ${n("FAIL")} | ${n("NOT-REPRODUCED")} | ${n("OWNER-BLOCKED")} | ${n("UNMEASURED")} | ${n("RECORD")} | ${cs.filter((c) => c.crashed).length} | ${loadsOf(cs)} |`);
    }
    fs.writeFileSync(path.join(OUTD, `counts-${TAG}.md`), cl.join("\n") + "\n");
    console.log(tl.join("\n"));
    if (RULED) console.log(`\nO-103 ruled branches: ${cells.filter((c) => c.ruled).length} OWNER-BLOCKED cell(s) read on Q-4 (c) / Q-12 (b): ${cells.filter((c) => c.ruled && c.verdict === "PASS").length} PASS, ${cells.filter((c) => c.ruled && c.verdict !== "PASS").length} not`);
    console.log(`\n${cells.length} cells; ${cells.filter((c) => c.verdict === "NOT-REPRODUCED").length} NOT-REPRODUCED; ${cells.filter((c) => c.nrChecks?.length && c.verdict !== "NOT-REPRODUCED").length} with a check NOT-REPRODUCED (H6-7); written cells-${TAG}.json, rows-${TAG}.md, table-${TAG}.md, counts-${TAG}.md in ${OUTD}`);
}

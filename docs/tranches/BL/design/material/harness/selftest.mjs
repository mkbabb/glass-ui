#!/usr/bin/env node
// selftest.mjs · proves every check can go GREEN and can go RED. For each check: capture a hand-made fixture built to
// satisfy it (fixtures.mjs) and expect exit 0, then capture the same fixture with one planted violation and expect
// exit 1. The violation targets the check's own invariant, and the FAIL rows it prints are kept in the summary so a
// reader can see the check failed for that reason and no other.
// H2: every check runs in BOTH engines, once gated on Chromium (--gate chromium) and once gated on Playwright WebKit
// (--gate webkit), on the same captures. H3 (pass 3) adds M-1x, M-2h, O-66, STACK and W-S, changes M-2 (the -strong
// run, the declared-graspable held rungs, the claim cell), M-2m (the 100 s drift leg), M-4 (signed), M-9 (the dark veil),
// W-C (band [4.5, ∞), three colour retunes) and GLANCE (--story-claim); each ships a fixture PASS and a planted FAIL.
// H4 (pass 4) changes four checks, each with a fixture PASS and a planted FAIL in both engines: GLANCE reads paint apart
// from layout (H4-1), M-1x gains its hue term and reads cream as the plate's own paper reading under Q-11's text (H4-2),
// M-6 reads every variant (H4-3), W-C's loud arm counts only messages naming a glass token (H4-4).
// H5 (pass 5) adds, each with a fixture PASS and a planted FAIL: M-9's upper bound over every state ground, REPORTED and
// gated only under --dim-max (H5-1); LIT, the lighting-literals witness, static and frame arms, REPORTED and gated only
// under --strict (H5-2); HOV, no :hover paints a value built on --fill-selected (H5-3); W-A's leg 4 under Q-11's text
// (H5-4). H6 (pass 6) adds LAW (H6-0, the launch law) and DEL (H6-1, the deleted-mechanism check), static. The static arms (LIT static, HOV) read a tree, not a capture, so they run once and print engine "static". The four pass-1 family witnesses that H2 left alone (W-B, W-C, W-E, W-F) and
// W-D keep their pass-1 Chromium test. A planted capture holds only the cells its plant touches, and its witness run
// is restricted to them with --cells (the fixture PASS runs read every cell unrestricted).
//   node selftest.mjs [--fields <HEAD capdir>] [--only M-1,W-B,LIT,HOV] [--skip-capture] [--reuse-green] [--tree <floor v4 worktree>]
// --tree: DEL's (H6-1) planted FAIL on a real tree carrying the deleted mechanism's prose (floor v4's six comments).
// H7 (pass 7) adds, each with a fixture PASS and a planted FAIL: H7-1, M-3's round-ring reader (R-14), on one-cell
// captures laid out from banked pixels (no browser); H7-2, DEL's word forms and its patch-built declaration (R-15);
// H7-3, the minor split's own declaration (R-16). --h7-trees <dir> holds the real trees (fv5, fv5fix, minor4,
// minor5: src/ and demo/ each) and --h7-decl the declaration declare-removed.mjs built from floor-v5.patch. The H7-3
// rows on the real trees run when minor4 and minor5 are present; the H7-2 rows when fv5 and --h7-decl are.
// H7-3 grew in pass 8 for R-18 (the minor v6, pass-8/MINOR-SPLIT-v6.md): the declaration holds 39 names; the minor v5
// is now a plant (A-3's sentences), and the minor v6 the fixture when --h7-trees holds minor6.
// H8 (pass 8) adds, each with a fixture PASS and a planted FAIL: H8-1, DEL's scope arm (src/, demo/, tests/, every
// path the patch touches), changed-value arm and REPORTED arm, with site entries in the exact list (R-17); H8-2,
// declare-removed.mjs's module stems and module-level consts. --h8-trees (fv6, fv6fix), --h8-patch, --h8-exact.
// H9 (pass 9) adds, each with a fixture PASS and a planted FAIL: H9-1, homonym phrases declared with site entries for
// their live homonyms; H9-2, the tuple arm (and the rung reading it prints for R-21 (b)); H9-3, the arm-aware value arm;
// H9-4, the variant a witness reads (--variant) and its loud exit on a capture with no cell of it (expect LOUD, exit 2);
// H9-5, --engines on the plant scripts and lib.mjs's frozen ENGINES; H9-6, R-21's frozen list and its printer.
// --h9-trees (fv7, fv8, minor6: src/ demo/ tests/ docs/canon/ and the root *.md), --h9-patch (floor-v7.patch),
// --h9-exact (the floor's exact list with H9's site), --h9-minor-patch (minor-split-v6.patch). With H9, the H8-1 rows
// on floor v6 read H9's reds beside H8's (pass-9/H9.md §7).
// The minor v7 (pass 9, R-23; pass-9/MINOR-SPLIT-v7.md) grows H7-3 and H9-3 in place: the declaration holds 42 names and
// R-23's three site entries; the minor v6 is now a plant and the minor v7 the fixture (--h7-trees minor7; --h9-trees
// minor7 with --h9-minor7-patch, minor-split-v7.patch). A value-arm site reads `not read` without --patch (H7-3's read).
// H10 (pass 10, REGISTRY P9-5) adds, each with a fixture PASS and a planted FAIL: H10-1, DEL (and SWEEP) refuse a tree
// with 0 text files in scope (expect LOUD, exit 2), the real floor v8 and minor v7 reading as before; H10-2, each
// --rulings entry's verdict ("true" | "reported"), a reported line in its own tally, gating nothing and going stale like
// any ruling, and a malformed rulings file refused (LOUD). The H10 real rows read --h9-trees (fv7, fv8 = the real floor
// v8, minor7, minor7p) with the banked pass-9 patches, declarations and rulings files, which H10 migrated in place.
// The H9-6 tiny rulings carry verdict "true" since H10-2.
// --reuse-green: keep an existing green capture (the plants are captured fresh).
// --fields: a HEAD run's capture (its Chromium empty-scene aurora frames become the fixtures' field pixels).
import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { OUT, HERE, CHECKOUT, RETUNES, FIELD_CLAIM_SCENES, cli, list, lin, oklchLin, PNG } from "./lib.mjs";
import { writeFixture, writeStoryFixture } from "./fixtures.mjs";
import { capture } from "./capture.mjs";

const a = cli({ fields: { type: "string" }, only: { type: "string" }, "skip-capture": { type: "boolean" }, "reuse-green": { type: "boolean" }, tree: { type: "string" },
  "h7-trees": { type: "string" }, "h7-decl": { type: "string" },
  "h8-trees": { type: "string" }, "h8-patch": { type: "string" }, "h8-exact": { type: "string" },
  "h9-trees": { type: "string" }, "h9-patch": { type: "string" }, "h9-exact": { type: "string" }, "h9-minor-patch": { type: "string" }, "h9-minor7-patch": { type: "string" } });
const FIELDS = path.resolve(a.fields || path.join(OUT, "caps", "head"));
const ROOT = path.join(OUT, "selftest");
const only = list(a.only, null);
const want = (id) => !only || only.includes(id);
const results = [];
const BOTH = ["chromium", "webkit"];
fs.mkdirSync(ROOT, { recursive: true });

const FAST = { waitField: 900, waitFlat: 600, quiet: true, liveMs: 3000, motionMs: 3000, stepMs: 1500 };
async function cap(name, fixtureDir, opts) {
  const out = path.join(ROOT, "caps", name);
  if (name === "green" && a["reuse-green"] && fs.existsSync(path.join(out, "cells.json"))) return out;
  if (!a["skip-capture"]) {
    fs.rmSync(out, { recursive: true, force: true });
    let inject = opts.injectCss;
    if (inject != null) { const f = path.join(ROOT, `${name}.inject.css`); fs.writeFileSync(f, inject); inject = f; }
    const t0 = Date.now();
    await capture(fixtureDir, { ...FAST, engines: BOTH.join(","), ...opts, out, inject, label: name });
    // H4-3: opts.retuneCss is planted in the retuned cells only (the base cells keep the fixture as built).
    if (opts.retune) for (const [variant, css] of Object.entries(RETUNES)) {
      const f = path.join(ROOT, `${name}.${variant}.css`); fs.writeFileSync(f, css + "\n" + (opts.injectCss || "") + "\n" + (opts.retuneCss || ""));
      await capture(fixtureDir, { ...FAST, engines: opts.engines || BOTH.join(","), themes: opts.themes, out, grounds: "paper", scenes: "ladder,dialog", variant, inject: f, label: name });
    }
    // H3-7: the field-claim scenes' unclaimed reference.
    if (opts.noclaim) await capture(fixtureDir, { ...FAST, engines: opts.engines || BOTH.join(","), themes: opts.themes, out, grounds: "aurora", scenes: FIELD_CLAIM_SCENES.join(","), variant: "noclaim", query: "claim=none", inject, label: name });
    console.log(`     captured ${name} in ${((Date.now() - t0) / 1000).toFixed(0)} s (load ${(await import("node:os")).loadavg().map((v) => v.toFixed(1)).join(" ")})`);
  }
  return out;
}
// One witness run. `engines` lists the gate engines to run it under, one run each.
function witness(id, script, capdir, expect, extra = [], note = "", engines = BOTH) {
  for (const engine of engines) {
    const args = [path.join(HERE, `${script}.mjs`), capdir, ...extra, "--gate", engine];
    const r = spawnSync(process.execPath, args, { encoding: "utf8", maxBuffer: 256 << 20 });
    const out = (r.stdout || "") + (r.stderr || "");
    const verdict = out.trim().split("\n").pop();
    const fails = out.split("\n").filter((l) => l.includes("✗") && !l.includes("[info]")).slice(0, 4).map((l) => l.trim());
    const ok = expect === "PASS" ? r.status === 0 : r.status === 1;
    results.push({ id, engine, expect, exit: r.status, ok, verdict, capdir, note, fails });
    fs.writeFileSync(path.join(capdir, `selftest-${id}-${expect}-${engine}.log`), out);
    console.log(`${ok ? "ok  " : "BAD "} ${id.padEnd(4)} ${engine.padEnd(8)} expect ${expect.padEnd(4)} exit ${r.status} · ${verdict}${note ? " · " + note : ""}`);
    if (expect === "FAIL" || !ok) for (const l of fails) console.log("        " + l.slice(0, 220));
    if (id === "M-2" && expect === "FAIL") { const x = out.split("\n").find((l) => l.startsWith("rows:")); if (x) console.log("        " + x); }
  }
}
const cells = (re) => ["--cells", re];
// A static check (H5-2's static arm, H5-3): it reads a tree, so it runs once, engine "static".
function staticWitness(id, script, args, expect, note) {
  const r = spawnSync(process.execPath, [path.join(HERE, `${script}.mjs`), ...args], { encoding: "utf8", maxBuffer: 64 << 20 });
  const out = (r.stdout || "") + (r.stderr || ""), verdict = out.trim().split("\n").pop();
  const fails = out.split("\n").filter((l) => l.includes("✗")).slice(0, 4).map((l) => l.trim());
  // H9-4: LOUD is a witness that refuses to read (exit 2), as against a measured FAIL (exit 1).
  const ok = expect === "PASS" ? r.status === 0 : expect === "LOUD" ? r.status === 2 : r.status === 1;
  results.push({ id, engine: "static", expect, exit: r.status, ok, verdict, capdir: args.join(" "), note, fails });
  console.log(`${ok ? "ok  " : "BAD "} ${id.padEnd(4)} static   expect ${expect.padEnd(4)} exit ${r.status} · ${verdict} · ${note}`);
  if (expect === "FAIL" || !ok) for (const l of fails) console.log("        " + l.slice(0, 220));
  return out;
}
// A tiny tree for the static checks: { "src/<file>": css }.
function tree(name, filesIn) {
  const d = path.join(ROOT, "fx", name); fs.rmSync(d, { recursive: true, force: true });
  for (const [f, body] of Object.entries(filesIn)) { fs.mkdirSync(path.dirname(path.join(d, f)), { recursive: true }); fs.writeFileSync(path.join(d, f), body); }
  return d;
}

const ALLG = "paper,aurora,aurora50,black,white,checker,stripes";
const HELD = { grounds: "black,white,aurora", scenes: "held,ladder" };   // M-2h's halo leg reads the resting dock in the ladder

// ── the green battery fixture: RAW, M-1..M-9 and M-2m PASS, gated in each engine ──────────────────────────────
// Written only when a check that captures it is wanted (H7: the static and banked-pixel checks need no HEAD capture).
// [id, script, plant capture selection, --cells restriction, plant css, note]
const M = [
  ["RAW", "raw-clean", [[{ grounds: "black,white", scenes: "ladder,dialog" }, null, `html[data-cap="raw"] [data-spec] .fx-tab { visibility: visible !important; }`, "a dock tab paints through its hidden surface in raw (S-10)"]]],
  ["M-1", "m1-no-grey", [[{ themes: "light", grounds: "paper", scenes: "ladder,dialog" }, null, `html:not(.dark) [data-spec="floating"] { background: #d7d4ce !important; }`, "floating painted HEAD's grey composite #d7d4ce"]]],
  // H3-1: gated under Q-11 (b) for the self-test; REPORTED (exit 0) without a ruling is its own expectation below.
  ["M-1x", "m1x-off-paper", [[{ themes: "light", grounds: "paper,black,checker,deep", scenes: "ladder,dialog" }, null, `html:not(.dark) [data-spec="floating"] { background: color-mix(in srgb, #fef7f2 89.1%, transparent) !important; }`, "H3-1: floating at the floor's light bound (#fef7f2 at α 0.891): #e2dcd7 over black"]], ["--q11", "b"]],
  ["M-2", "m2-text-contrast", [
    [{ grounds: "paper", scenes: "ladder,dialog" }, " paper (ladder|dialog)$", `.fx-muted, .fx-muted *, .fx-mutedtab, .fx-mutedtab * { color: #a39a91 !important; } html.dark .fx-muted, html.dark .fx-muted *, html.dark .fx-mutedtab, html.dark .fx-mutedtab * { color: #6e665e !important; }`, "muted ink moved toward the plate"],
    [{ themes: "light", grounds: "black", scenes: "ladder" }, "light black ladder$", `html:not(.dark) [data-spec] { background: transparent !important; } html:not(.dark) [data-spec] [data-ink] { -webkit-text-stroke: 5px var(--card); paint-order: stroke fill; }`, "H-8: no plate, a 5 px card stroke under every glyph (E's sticker geometry, sized to the R 1 ring): R 1 reads the stroke, R 3 the black ground"],
    [{ grounds: "black,white,aurora", scenes: "held" }, "held$", `[data-held] { background: transparent !important; }`, "H-5: the held register sheds the whole plate"],
    [{ grounds: "aurora,aurora50", scenes: "hostile" }, "hostile$", `html[data-scene="hostile"] [data-spec] { background: rgb(255 255 255 / 0.25) !important; } html.dark[data-scene="hostile"] [data-spec] { background: rgb(0 0 0 / 0.25) !important; }`, "H-10: surfaces thin in the hostile cells (a thin arm that misses the interposed band)"],
    [{ grounds: "paper", scenes: "ladder" }, " paper ladder$", `[data-ink="muted-strong"], [data-spec="capsule"] [data-ink="muted"] { color: #c9c0b6 !important; } html.dark [data-ink="muted-strong"], html.dark [data-spec="capsule"] [data-ink="muted"] { color: #4a423b !important; }`, "H3-2: the -strong run and the capsule's muted run moved toward the plate"],
    [{ themes: "light", grounds: "paper", scenes: "claim" }, "light paper claim$", `html[data-scene="claim"] [data-spec] { background: rgb(255 255 255 / 0.25) !important; }`, "H3-6: the page claim thins every plate over the --secondary tray and inside the opaque card"]]],
  ["M-2m", "m2-motion", [
    [{ grounds: "aurora,aurora50", scenes: "ladder", motion: true }, "ladder$", `:root { --fx-motion-thin: 1; }`, "H-11: every surface goes transparent for 300 ms of every 600 ms while the field moves"],
    [{ grounds: "aurora,aurora50", scenes: "ladder", motion: true }, "ladder$", `:root { --fx-step-dip: 1; }`, "H-11: every surface dips transparent for 400 ms on the ceiling step (a symmetric spring)"],
    [{ themes: "light", grounds: "aurora", scenes: "ladder", motion: true, drift: true }, "light aurora ladder$", `:root { --fx-drift-thin: 70000; }`, "H3-12: every surface goes transparent 70 s after load (an erosion a 60 s window misses)"]]],
  ["M-2h", "m2-held-window", [
    [HELD, "(held|ladder)$", `:root { --fx-release-dip: 1; }`, "H3-5: the held dock goes transparent for 600 ms on the release"],
    [HELD, "(held|ladder)$", `[data-spec="dock-held"] { -webkit-mask-image: linear-gradient(90deg, #000 45%, rgb(0 0 0 / 0.55)); mask-image: linear-gradient(90deg, #000 45%, rgb(0 0 0 / 0.55)); }`, "H3-5: the held dock's right half lets the ground through (a halo)"]]],
  ["M-3", "m3-non-text", [
    [{ grounds: "paper", scenes: "ladder,dialog" }, " paper (ladder|dialog)$", `.fx-well { border-color: #d9d3cc !important; } html.dark .fx-well { border-color: #4a423b !important; }`, "well perimeter faded to 1.3-1.6:1"],
    [{ grounds: "black,white,aurora", scenes: "held" }, "held$", `[data-held] .fx-well { border-color: transparent !important; }`, "H-5: the held rungs' well perimeter vanishes"]]],
  ["M-4", "m4-dock-register", [
    [{ grounds: "paper", scenes: "ladder,dialog" }, " paper (ladder|dialog)$", `[data-spec="dock"] .fx-muted, [data-spec="dock"] .fx-muted * { color: #000 !important; } html.dark [data-spec="dock"] .fx-muted, html.dark [data-spec="dock"] .fx-muted * { color: #fff !important; }`, "dock muted ink pinned to the pole (#000 / #fff)"],
    [{ grounds: "paper", scenes: "ladder,dialog" }, " paper (ladder|dialog)$", `.fx-muted, .fx-muted * { color: var(--fg) !important; }`, "H-7: a dead solve, every plate's muted falls back to the fg ink"],
    [{ grounds: "paper", scenes: "ladder" }, " paper ladder$", `[data-spec="dock"] .fx-active { color: var(--muted) !important; font-weight: 400 !important; }`, "H-2: the dock's active tab painted in the muted register"],
    [{ themes: "light", grounds: "paper", scenes: "ladder,dialog" }, "light paper (ladder|dialog)$", `.fx-muted, .fx-muted * { color: #050302 !important; }`, "H3-3: light muted darker than fg (|ΔL| ≥ 0.08: green unsigned, inverted signed)"]]],
  ["M-5", "m5-live-dock", [
    [{ grounds: "aurora,aurora50", scenes: "ladder", live: true }, null, `:root { --fx-readback: 1; }`, "the page reads back a canvas every frame"],
    [{ grounds: "aurora,aurora50", scenes: "ladder", live: true }, null, `:root { --fx-writer: rename; }`, "H-3: a per-frame writer under a new name (--x-field-y, setProperty)"],
    [{ grounds: "aurora,aurora50", scenes: "ladder", live: true }, null, `:root { --fx-writer: attr; }`, "H-3: a per-frame writer by style-attribute rewrite (--x-tone)"]]],
  ["M-6", "m6-separable-ladder", [
    [{ grounds: "paper", scenes: "ladder,dialog" }, null, `html.dark [data-spec] { background: #0e0b09 !important; }`, "every dark plate painted HEAD's page-coloured composite"],
    [{ grounds: "paper", scenes: "ladder,dialog" }, null, (() => { const P = { wash: "#000000", quiet: "#060000", resting: "#00000a", floating: "#000600", overlay: "#030006", card: "#060008", "dialog-rung": "#00000a", opaque: "#030006", dock: "#060000", popover: "#060008", dialog: "#000000" };
      return Object.entries(P).map(([id, c]) => `html.dark [data-spec="${id}"] { background: ${c} !important; }`).join("\n"); })(), "H-9: every dark plate sinks below the page (L 0.000-0.106 against 0.147), adjacent ΔE 0.063-0.083 and ΔE from the page ≥ 0.053: green unsigned"]]],
  ["M-7", "m7-halos-whole", [[{ grounds: "paper", scenes: "halo" }, null, `[data-halo-host] { contain: paint; }`, "contain: paint on the content hosts (O-61)"]]],
  ["M-8", "m8-chrome-calm", [[{ grounds: "stripes", scenes: "ladder,dialog" }, null, `[data-spec="floating"], [data-spec="dialog"] { background: rgb(255 255 255 / 0.2) !important; }`, "floating and the Dialog at a thin white veil"]]],
  ["M-9", "m9-state-registers", [
    [{ grounds: "paper,aurora", scenes: "state" }, null, `[data-fill], [data-fill]:hover, .fx-tabpill[data-fill] { background: transparent !important; }`, "H-6: every state fill paints nothing (a same-hue no-op under a card pole)"],
    [{ grounds: "paper,aurora", scenes: "state" }, null, `.fx-veil { background: rgb(255 255 255 / 0.3) !important; }`, "H-6: the focus veil brightens instead of dimming"],
    [{ themes: "dark", grounds: "paper,aurora", scenes: "state" }, "dark", `html.dark .fx-veil { background: rgb(255 255 255 / 0.06) !important; }`, "H3-4: the dark focus veil brightens"]]],
  ["O-66", "o66-field-row", [
    [{ grounds: "paper", scenes: "o66field,o66menu" }, null, `[data-probe^="trigger-"] { background: #e7e4df !important; } html.dark [data-probe^="trigger-"] { background: #2b2723 !important; }`, "H3-9 G2: the trigger paints a grey plate beside the cream Input (W-0.1 §2: #e7e4df)"],
    [{ themes: "light", grounds: "paper", scenes: "o66field,o66menu" }, "light", `.fx-row[data-highlighted] { background: #e3ddd8 !important; } .fx-menu { background: #f3eee8 !important; }`, "H3-9 G3: the highlighted row darkens the plate with no tint (ΔL about −0.02, C under 0.02)"]]],
  ["STACK", "stack-host", [[{ grounds: "black,white,aurora", scenes: "held" }, null, `[data-held] { position: static !important; z-index: 1 !important; }`, "H3-11: the grasp hosts carry a z-index digit on a non-positioned, non-flex box (no stacking context)"]]],
];
let greenCap = null;
if (M.some(([id]) => want(id)) || want("W-D") || want("LIT")) {
  // The windows are captured only when a wanted check reads them (M-5 and W-A's leg 1 the live windows, M-2m the motion
  // and drift windows, W-D the whole battery); the retune variants ride the green capture for M-6 (H4-3).
  const win = (...ids) => ids.some(want) || want("W-D");
  const green = writeFixture("green", { out: path.join(ROOT, "fx", "green"), fields: FIELDS });
  greenCap = await cap("green", green, { grounds: ALLG + ",red,deep", live: win("M-5"), motion: win("M-2m"), drift: win("M-2m"), probeUnshimmed: true, retune: true });
  for (const [id, script, , args = []] of M) if (want(id)) witness(id, script, greenCap, "PASS", args, "green fixture" + (args.length ? " (" + args.join(" ") + ")" : ""));
  for (const [id, script, plants, args = []] of M) if (want(id)) for (const [k, [sel, re, css, note]] of plants.entries()) {
    const c = await cap(`green-${id}-${k}`, green, { ...sel, injectCss: css });
    witness(id, script, c, "FAIL", [...args, ...(re ? cells(re) : [])], note);
  }
  // H3-1: REPORTED until Q-11 is ruled: the same grey plant exits 0 with no ruling and under ruling (a).
  if (want("M-1x")) for (const r of [[], ["--q11", "a"]]) witness("M-1x", "m1x-off-paper", path.join(ROOT, "caps", "green-M-1x-0"), "PASS", r, `H3-1: REPORTED (${r.length ? "Q-11 ruled (a)" : "Q-11 unruled"}): the bound's grey over black prints and does not gate`);
  // H3-5: a held rung the library does not declare graspable (a backdrop-root former standing) is not read, even shed.
  // H4-2 (I-2): the hue term. Floating at 15% over the deep canvas reads the canvas's blue (C ≥ 0.02 at the ground's
  // hue), which H3's colour clause passed; gated under (b) (floating is chrome), read on the deep cells only.
  if (want("M-1x")) {
    const sel = { themes: "light", grounds: "paper,deep", scenes: "ladder,dialog" };
    witness("M-1x", "m1x-off-paper", await cap("green-M-1x-hue", green, { ...sel, injectCss: `html:not(.dark) [data-spec="floating"] { background: color-mix(in srgb, #fef7f2 15%, transparent) !important; }` }), "FAIL", ["--q11", "b", ...cells("light deep")], "H4-2: floating transmits the deep canvas (its hue, not the plate's): no longer passes the colour clause");
    // The cream clause: the opaque escape at HEAD's #fdf5ec, 0.0014 under M-1's L floor against paper, paints the same
    // over every ground. H3 redded it here as well as in M-1; H4 reads it as its own paper reading, and M-1 keeps the row.
    const crm = await cap("green-M-1x-cream", green, { themes: "light", grounds: "paper,black,checker,deep", scenes: "ladder,dialog", injectCss: `html:not(.dark) [data-spec="opaque"] { background: #fdf5ec !important; }` });
    witness("M-1x", "m1x-off-paper", crm, "PASS", ["--q11", "b"], "H4-2: the opaque escape at #fdf5ec holds its paper reading off paper (H3 read it grey by 0.0014 in L)");
    witness("M-1", "m1-no-grey", crm, "FAIL", [], "H4-2's counterpart: the same #fdf5ec escape stays M-1's row over paper (P-3)");
    // (b)'s text gates chrome and the escape; a grey content rung is reported and named, not gated.
    const cg = await cap("green-M-1x-content", green, { themes: "light", grounds: "paper,black,checker,deep", scenes: "ladder,dialog", injectCss: `html:not(.dark) [data-spec="wash"] { background: color-mix(in srgb, #fef7f2 89.1%, transparent) !important; }` });
    witness("M-1x", "m1x-off-paper", cg, "PASS", ["--q11", "b"], "H4-2: under (b)'s text a grey content rung (wash at the bound) is reported and named, not gated");
  }
  // H4-3 (I-3): every dark plate falls to the page colour in the retuned cells only; the base cells keep the lift.
  if (want("M-6")) witness("M-6", "m6-separable-ladder", await cap("green-M-6-retune", green, { grounds: "paper", scenes: "ladder,dialog", retune: true, retuneCss: `html.dark [data-spec] { background: var(--page) !important; }` }), "FAIL", [], "H4-3: under each colour retune every dark plate paints the page (base cells untouched): H3 read base only");
  // H5-1: the veil's depth over every state ground. REPORTED with no owner bound; --dim-max gates it (0.40 here, a
  // self-test bound: the green veil reads at most about −0.2 over the dark aurora, the plant crushes every ground).
  if (want("M-9")) {
    witness("M-9", "m9-state-registers", greenCap, "PASS", ["--dim-max", "0.40"], "H5-1: every veil depth within the self-test bound |ΔL| ≤ 0.40 (green fixture)");
    const deep = await cap("green-M-9-deep", green, { grounds: "paper,aurora", scenes: "state", injectCss: `.fx-veil, html.dark .fx-veil { background: rgb(0 0 0 / 0.97) !important; }` });
    witness("M-9", "m9-state-registers", deep, "FAIL", ["--dim-max", "0.40"], "H5-1: the veil at 97% black crushes every ground (still dims ≥ 0.02, so the lower bound passes)");
    witness("M-9", "m9-state-registers", deep, "PASS", [], "H5-1: the same crushing veil with no owner bound: REPORTED, not gated");
  }
  // H5-2's frame arm: the dock's luma ring. No shadow and a downward cast read no halo; a zero-offset glow reads one.
  if (want("LIT")) {
    const sel = { grounds: "paper,aurora,black,white", scenes: "state,held" };
    witness("LIT", "lighting-literals", greenCap, "PASS", ["--strict", ...cells("(state|held)$")], "H5-2 frames: the fixture docks carry no shadow");
    const D = `[data-spec="dock"], [data-spec="dock-collapsed"]`, Dd = `html.dark [data-spec="dock"], html.dark [data-spec="dock-collapsed"]`;
    const glow = await cap("green-LIT-glow", green, { ...sel, injectCss: `${D} { box-shadow: 0 0 20px rgb(0 0 0 / 0.35) !important; } ${Dd} { box-shadow: 0 0 20px rgb(255 255 255 / 0.3) !important; }` });
    witness("LIT", "lighting-literals", glow, "FAIL", ["--strict", ...cells("(state|held)$")], "H5-2 frames: a zero-offset 20 px glow on both docks (HEAD's --shadow-dock shape)");
    witness("LIT", "lighting-literals", glow, "PASS", cells("(state|held)$"), "H5-2 frames: the same glow with no --strict: REPORTED, not gated");
    const cast = await cap("green-LIT-cast", green, { ...sel, injectCss: `${D} { box-shadow: 0 14px 12px rgb(0 0 0 / 0.35) !important; } ${Dd} { box-shadow: 0 14px 12px rgb(255 255 255 / 0.3) !important; }` });
    witness("LIT", "lighting-literals", cast, "PASS", ["--strict", ...cells("(state|held)$")], "H5-2 frames: a downward one-layer cast (0 14px 12px) is a cast, not a halo");
  }
  if (want("M-2")) witness("M-2", "m2-text-contrast", await cap("green-M-2-undeclared", green, { grounds: "black,white,aurora", scenes: "held", injectCss: `[data-spec="wash-held"] { contain: paint !important; background: transparent !important; }` }), "PASS", cells("held$"), "H3-5: wash-held sheds its plate under contain: paint (not declared graspable): not read");
}

// ── W-A (A′) and T: the card pole at the band's bound, calibrated against the witness's own analytic bound ──────
if (want("W-A") || want("T")) {
  const full = { grounds: "paper,aurora,aurora50,black,white", scenes: "ladder,dialog" };
  const probe = await cap("A-probe", writeFixture("A", { out: path.join(ROOT, "fx", "A-probe"), fields: FIELDS }), full);
  const out = spawnSync(process.execPath, [path.join(HERE, "wa-no-signal.mjs"), probe, "--gate", "chromium"], { encoding: "utf8", maxBuffer: 256 << 20 }).stdout || "";
  const CH = ["floating", "overlay", "dialog-rung", "dock", "popover", "dialog"], CO = ["wash", "quiet", "resting", "card"];
  const bounds = { light: { content: 0, chrome: 0 }, dark: { content: 0, chrome: 0 } };
  for (const line of out.split("\n").filter((l) => /^\s*analytic α (chromium|webkit) (light|dark) /.test(l))) {
    const theme = line.includes(" dark ") ? "dark" : "light";
    for (const m of line.matchAll(/(\S+) α [\d.]+ pole \S+ bound ([\d.]+|none)/g)) {
      const band = CH.includes(m[1]) ? "chrome" : CO.includes(m[1]) ? "content" : null; if (!band) continue;
      bounds[theme][band] = Math.max(bounds[theme][band], m[2] === "none" ? 1 : +m[2]);
    }
  }
  const alphas = { light: {}, dark: {} };
  for (const theme of ["light", "dark"]) for (const id of [...CH, ...CO]) alphas[theme][id] = Math.min(1, bounds[theme][CH.includes(id) ? "chrome" : "content"] + 0.012);
  fs.writeFileSync(path.join(ROOT, "A-alphas.json"), JSON.stringify(alphas, null, 1)); fs.writeFileSync(path.join(ROOT, "A-bounds.json"), JSON.stringify(bounds, null, 1));
  console.log(`     W-A calibrated bounds (max over both engines' analytic bounds): ${JSON.stringify(bounds)}; every rung at bound + 0.012`);
  const good = await cap("A", writeFixture("A", { out: path.join(ROOT, "fx", "A"), fields: FIELDS, alphas, bounds }), { ...full, live: true });
  const thin = JSON.parse(JSON.stringify(alphas)); thin.light.floating -= 0.1; thin.dark.floating -= 0.1;
  const bw = { grounds: "black,white", scenes: "ladder,dialog" }, BW = cells("(black|white) (ladder|dialog)$");
  const aThin = await cap("A-thin", writeFixture("A", { out: path.join(ROOT, "fx", "A-thin"), fields: FIELDS, alphas: thin, bounds }), bw);
  if (want("W-A")) {
    witness("W-A", "wa-no-signal", good, "PASS", [], "every rung at the band's bound + 0.012; --glass-bound = the bound; no readback or writer");
    const fxA = path.join(ROOT, "fx", "A");
    witness("W-A", "wa-no-signal", await cap("A-rename", fxA, { grounds: "aurora", scenes: "ladder", live: true, injectCss: ":root { --fx-writer: rename; }" }), "FAIL", cells("aurora ladder$"), "H-3: a per-frame writer under a new name");
    witness("W-A", "wa-no-signal", await cap("A-attr", fxA, { grounds: "aurora", scenes: "ladder", live: true, injectCss: ":root { --fx-writer: attr; }" }), "FAIL", cells("aurora ladder$"), "H-3: a per-frame writer by style-attribute rewrite");
    witness("W-A", "wa-no-signal", aThin, "FAIL", BW, "floating α 0.10 under its band's bound");
    const moved = { light: { content: bounds.light.content - 0.06, chrome: bounds.light.chrome - 0.06 }, dark: { content: bounds.dark.content - 0.06, chrome: bounds.dark.chrome - 0.06 } };
    witness("W-A", "wa-no-signal", await cap("A-bound", writeFixture("A", { out: path.join(ROOT, "fx", "A-bound"), fields: FIELDS, alphas, bounds: moved }), bw), "FAIL", BW,
      "H-4: the computed bound moved 0.06 (an ink retune) while the paint kept the old α (a literal left behind)");
    // H5-4: leg 4 follows Q-11's text. Under (b) the light chrome must paint α = 1; under (a) it stays on the bound.
    const opq = JSON.parse(JSON.stringify(alphas)); for (const id of CH) opq.light[id] = 1;
    const aOpq = await cap("A-q11b", writeFixture("A", { out: path.join(ROOT, "fx", "A-q11b"), fields: FIELDS, alphas: opq, bounds }), bw);
    witness("W-A", "wa-no-signal", aOpq, "PASS", ["--q11", "b", ...BW], "H5-4: Q-11 (b): the light chrome opaque (α 1), content and dark on the bound");
    witness("W-A", "wa-no-signal", good, "FAIL", ["--q11", "b", ...BW], "H5-4: Q-11 (b): the light chrome left on the bound (α bound + 0.012), not opaque");
    witness("W-A", "wa-no-signal", aOpq, "FAIL", BW, "H5-4: unruled, the default (a): the opaque light chrome sits off the bound by construction (FV3 §4.2)");
  }
  if (want("T")) {
    const exp = path.join(ROOT, "A-alphas.json");
    witness("T", "t-transmission", good, "PASS", ["--expect", exp], "T reads back the fixture's authored α within 0.01");
    witness("T", "t-transmission", aThin, "FAIL", ["--expect", exp, ...BW], "the painted floating α is 0.10 under what the report is told");
  }
}

// ── W-G: a luminosity pole under the content rungs and the dock; stamped flat inside an isolated group ─────────
if (want("W-G")) {
  const fx = writeFixture("G", { out: path.join(ROOT, "fx", "G"), fields: FIELDS });
  const sel = { grounds: "aurora,red", scenes: "ladder,isolated" };
  witness("W-G", "wg-hue-through", await cap("G", fx, sel), "PASS", [], "luminosity pole #c9c3bd / #342c26; isolated group stamped data-glass-flat");
  witness("W-G", "wg-hue-through", await cap("G-silent", fx, { grounds: "aurora,red", scenes: "isolated", injectCss: ":root { --fx-g-nostamp: 1; }" }), "FAIL", cells("isolated$"), "the isolated group goes flat with no stamp (silent flat)");
  witness("W-G", "wg-hue-through", await cap("G-noblend", fx, { grounds: "aurora,red", scenes: "ladder", injectCss: ".fx-pole { mix-blend-mode: normal !important; }" }), "FAIL", cells("ladder$"), "mechanism removed: the pole paints normally (no luminosity blend)");
}

// ── W-S (H3-7): a field claim that acts is stamped, truthfully ────────────────────────────────────────────────────
if (want("W-S")) {
  const sel = { grounds: "aurora", scenes: FIELD_CLAIM_SCENES.join(","), noclaim: true };
  witness("W-S", "ws-claim-stamp", await cap("S", green, sel), "PASS", [], "the claim thins the content plates to 85% and stamps unpublished / ambiguous");
  witness("W-S", "ws-claim-stamp", await cap("S-silent", green, { ...sel, injectCss: ":root { --fx-stamp: none; }" }), "FAIL", [], "the claim acts with no stamp (the silent dead arm)");
  witness("W-S", "ws-claim-stamp", await cap("S-lies", green, { ...sel, injectCss: ":root { --fx-stamp: published; }" }), "FAIL", cells("(fieldout|fieldgone)$"), "the claim acts under a live stamp (published)");
}

// ── the owner-glance pair (H-13): a real pair shows a delta; the same build twice shows none ──────────────────
if (want("GLANCE")) {
  const dir = path.join(ROOT, "glance"), overlay = path.join(ROOT, "glance-route.css");
  fs.writeFileSync(overlay, `[data-spec] { background: color-mix(in oklab, var(--card) 70%, #7c3aed) !important; }`);
  for (const engine of BOTH) for (const [expect, extra, note] of [["PASS", ["--overlay", overlay], "base against a route that repaints every plate"], ["FAIL", ["--route", green], "base against itself (no delta)"]]) {
    const r = spawnSync(process.execPath, [path.join(HERE, "glance.mjs"), "--base", green, ...extra, "--out", path.join(dir, `${engine}-${expect}`), "--name", expect === "PASS" ? "route" : "self", "--engine", engine, "--require-delta"], { encoding: "utf8", maxBuffer: 64 << 20 });
    const out = (r.stdout || "") + (r.stderr || ""), verdict = out.trim().split("\n").pop(), ok = expect === "PASS" ? r.status === 0 : r.status === 1;
    fs.mkdirSync(path.join(dir, `${engine}-${expect}`), { recursive: true }); fs.writeFileSync(path.join(dir, `${engine}-${expect}`, "selftest.log"), out);
    results.push({ id: "GLANCE", engine, expect, exit: r.status, ok, verdict, capdir: path.join(dir, `${engine}-${expect}`), note, fails: [] });
    console.log(`${ok ? "ok  " : "BAD "} GLANCE ${engine.padEnd(8)} expect ${expect.padEnd(4)} exit ${r.status} · ${verdict} · ${note}`);
  }
  // H4-1 (I-1): a route that only MOVES the dock, the floating plate and the Dialog 70 px down (no paint change). H3 read
  // the union crop and passed it on the layout alone.
  const movedCss = path.join(ROOT, "glance-moved.css");
  fs.writeFileSync(movedCss, `[data-spec="dock"], [data-spec="floating"], [data-spec="dialog"] { margin-top: 70px !important; }`);
  for (const engine of BOTH) {
    const o = path.join(dir, `${engine}-moved-FAIL`);
    const r = spawnSync(process.execPath, [path.join(HERE, "glance.mjs"), "--base", green, "--overlay", movedCss, "--out", o, "--name", "moved", "--engine", engine, "--require-delta"], { encoding: "utf8", maxBuffer: 64 << 20 });
    const out = (r.stdout || "") + (r.stderr || ""), verdict = out.trim().split("\n").pop(), ok = r.status === 1;
    fs.mkdirSync(o, { recursive: true }); fs.writeFileSync(path.join(o, "selftest.log"), out);
    results.push({ id: "GLANCE", engine, expect: "FAIL", exit: r.status, ok, verdict, capdir: o, note: "H4-1: the route moves the plates 70 px and repaints nothing", fails: [] });
    console.log(`${ok ? "ok  " : "BAD "} GLANCE ${engine.padEnd(8)} expect FAIL exit ${r.status} · ${verdict} · H4-1: plates moved 70 px, no paint change`);
  }
  // H4-1 on the story pair (C-8's case): three caption lines push the card 72 px down. Copy alone: FAIL; copy and a
  // repainted card: PASS, with the move reported as layout.
  const sPlain = writeStoryFixture(path.join(ROOT, "fx", "story-plain"), { claim: false }), sCopy = writeStoryFixture(path.join(ROOT, "fx", "story-copy"), { claim: false, copy: 3 });
  const sTint = writeStoryFixture(path.join(ROOT, "fx", "story-copy-tint"), { claim: false, copy: 3, tint: true });
  for (const engine of BOTH) for (const [expect, route, note] of [["FAIL", sCopy, "H4-1: story copy moves the card 72 px, no paint change"], ["PASS", sTint, "H4-1: story copy moves the card and the card is repainted"]]) {
    const o = path.join(dir, `${engine}-storycopy-${expect}`);
    const r = spawnSync(process.execPath, [path.join(HERE, "glance.mjs"), "--base", green, "--route", green, "--ids", "none", "--story-base", sPlain, "--story-route", route, "--require-delta", "--out", o, "--name", "copy", "--engine", engine], { encoding: "utf8", maxBuffer: 64 << 20 });
    const out = (r.stdout || "") + (r.stderr || ""), verdict = out.trim().split("\n").pop(), ok = expect === "PASS" ? r.status === 0 : r.status === 1;
    fs.mkdirSync(o, { recursive: true }); fs.writeFileSync(path.join(o, "selftest.log"), out);
    results.push({ id: "GLANCE", engine, expect, exit: r.status, ok, verdict, capdir: o, note, fails: [] });
    console.log(`${ok ? "ok  " : "BAD "} GLANCE ${engine.padEnd(8)} expect ${expect.padEnd(4)} exit ${r.status} · ${verdict} · ${note}`);
  }
  // H3-10: --story-claim reds a route story that claims no region.
  const sBase = writeStoryFixture(path.join(ROOT, "fx", "story-base"), { claim: false }), sClaim = writeStoryFixture(path.join(ROOT, "fx", "story-claim"), { claim: true });
  for (const engine of BOTH) for (const [expect, route, note] of [["PASS", sClaim, "H3-10: the route story claims one region"], ["FAIL", sBase, "H3-10: the route story claims nothing"]]) {
    const o = path.join(dir, `${engine}-story-${expect}`);
    const r = spawnSync(process.execPath, [path.join(HERE, "glance.mjs"), "--base", green, "--route", green, "--ids", "none", "--story-base", sBase, "--story-route", route, "--story-claim", "--out", o, "--name", "claim", "--engine", engine], { encoding: "utf8", maxBuffer: 64 << 20 });
    const out = (r.stdout || "") + (r.stderr || ""), verdict = out.trim().split("\n").pop(), ok = expect === "PASS" ? r.status === 0 : r.status === 1;
    fs.mkdirSync(o, { recursive: true }); fs.writeFileSync(path.join(o, "selftest.log"), out);
    results.push({ id: "GLANCE", engine, expect, exit: r.status, ok, verdict, capdir: o, note, fails: [] });
    console.log(`${ok ? "ok  " : "BAD "} GLANCE ${engine.padEnd(8)} expect ${expect.padEnd(4)} exit ${r.status} · ${verdict} · ${note}`);
  }
}

// ── the static checks (H5-2's static arm, H5-3): a tree each, run once ──────────────────────────────────────────
if (want("LIT")) {
  const clean = tree("lit-clean", { "src/a.css": `.plate { box-shadow: 0 12px 32px rgb(0 0 0 / 0.12); }\n.ring:focus-visible { box-shadow: 0 0 0 2px var(--ring); outline: none; }\n:root { --shadow-dock: 0 8px 24px rgb(0 0 0 / 0.2); --card-cast: 0 6px 18px rgb(0 0 0 / 0.1); }\n.bevel { box-shadow: inset 0 1px 0 rgb(255 255 255 / 0.4), 0 4px 12px rgb(0 0 0 / 0.1); }\n` });
  staticWitness("LIT", "lighting-literals", ["--root", clean, "--strict"], "PASS", "H5-2 static: one cast per plate, a 0-blur ring, an inset bevel beside one cast, tokens with real offsets");
  const plants = {
    halo: [`.card:focus-visible { box-shadow: var(--card-cast), 0 0 8px rgb(0 0 0 / 0.15); }`, "a literal zero-offset focus glow beside the cast (card/styles.css:161's shape): HALO and STACKED"],
    near: [`:root { --shadow-dock: 0 2px 30px rgb(0 0 0 / 0.2); }`, "a --shadow-* token with a 2 px offset under a 30 px blur (W-0.11's own fixture shape): NEAR"],
    chain: [`.blob { filter: drop-shadow(var(--a)) drop-shadow(var(--b)); }`, "two chained drop-shadow() (Blob.vue:355's shape): CHAIN"],
    vue: [`<template><i/></template>\n<style>\n.x { text-shadow: 0 0 6px rgb(255 255 255 / 0.5); }\n</style>\n`, "a .vue <style> block with a zero-offset text glow: HALO"],
  };
  for (const [k, [css, note]] of Object.entries(plants)) {
    const t = tree(`lit-${k}`, { [k === "vue" ? "src/X.vue" : "src/a.css"]: css });
    staticWitness("LIT", "lighting-literals", ["--root", t, "--strict"], "FAIL", "H5-2 static: " + note);
    if (k === "halo") staticWitness("LIT", "lighting-literals", ["--root", t], "PASS", "H5-2 static: the same glow with no --strict: REPORTED, not gated");
  }
}
if (want("HOV")) {
  const base = `:root { --fill-hover: 0.05; --fill-selected: 0.12; }\n.row { --row-bg: oklch(from var(--accent) l c h / var(--fill-selected)); }\n.row[data-highlighted], .row:focus { background: var(--row-bg); }\n.card[data-selected="true"] { --card-fill: oklch(from var(--fg) l c h / var(--fill-selected)); }\n@media (hover: hover) { .card[data-selected="true"]:hover { --card-fill: oklch(from var(--fg) l c h / calc(var(--fill-hover) + var(--fill-selected))); } .card:hover:not([data-disabled]) { --card-fill: oklch(from var(--fg) l c h / var(--fill-hover)); } }\n`;
  staticWitness("HOV", "hover-fill-selected", ["--root", tree("hov-r6", { "src/menu.css": base + `@media (hover: hover) { .row:hover:not([data-disabled]) { translate: 0 -1px; } }\n` })], "PASS",
    "H5-3: R-6's shape: the row's --fill-selected fill reaches paint only through [data-highlighted]; :hover keeps its lift; hover on a selected card is the register's derivation");
  staticWitness("HOV", "hover-fill-selected", ["--root", tree("hov-r4", { "src/menu.css": base + `@media (hover: hover) { .row:hover:not([data-disabled]) { background: var(--row-bg); translate: 0 -1px; } }\n` })], "FAIL",
    "H5-3: R-4 as built: a bare :hover paints the row fill built on --fill-selected");
  staticWitness("HOV", "hover-fill-selected", ["--root", tree("hov-nested", { "src/a.css": base, "src/B.vue": `<style>\n.b { --b1: var(--fill-selected); --b2: color-mix(in oklab, var(--accent) calc(var(--b1) * 100%), transparent); &:hover { box-shadow: 0 0 0 1px var(--b2); } }\n</style>\n` })], "FAIL",
    "H5-3: two levels of indirection inside a .vue block, reached by a nested &:hover");
}
// ── H6 (pass 6): the launch law (H6-0) and the deleted-mechanism check (H6-1), static, run once ────────────────
if (want("LAW")) {
  staticWitness("LAW", "launch-law", [], "PASS", "H6-0: the harness itself (and pass-6/ when present): headless shell, no GPU arguments");
  const pass5Lib = spawnSync("git", ["-C", CHECKOUT, "show", "f9267e35a:docs/tranches/BL/design/material/harness/lib.mjs"], { encoding: "utf8", maxBuffer: 64 << 20 }).stdout;
  staticWitness("LAW", "launch-law", ["--root", tree("law-pass5", { "h/lib.mjs": pass5Lib })], "FAIL", "H6-0: pass 5's lib.mjs (CHROMIUM_ARGS with WebGPU, blocklist override and ANGLE Metal), uncited");
  // The planted launch lines are assembled here, so this file's own source names no launch flag (LAW reads it too).
  const [flag, chan, head] = [["--enable", "unsafe", "webgpu"].join("-"), ["channel", ' "chromium"'].join(":"), ["headless", " false"].join(":")];
  const probe = `const b = await chromium.launch({ args: ["${flag}"] });\n`;
  staticWitness("LAW", "launch-law", ["--root", tree("law-cited", { "h/gpu.mjs": `// GPU-WITNESS: W-X · ev/proof.md\n${probe}`, "h/ev/proof.md": "the named witness's proof\n" })], "PASS", "H6-0: a GPU launch under a GPU-WITNESS line whose evidence file exists");
  staticWitness("LAW", "launch-law", ["--root", tree("law-badcite", { "h/gpu.mjs": `// GPU-WITNESS: W-X · ev/missing.md\n${probe}` })], "FAIL", "H6-0: a GPU-WITNESS line citing evidence that does not exist");
  staticWitness("LAW", "launch-law", ["--root", tree("law-channel", { "h/p.mjs": `const b = await chromium.launch({ ${chan}, ${head} });\n` })], "FAIL", "H6-0: full Chrome for Testing, headed, uncited");
}
if (want("DEL")) {
  const decl = path.join(HERE, "deletes-floor.json");
  const ok = `/* The plate paints the theme's own ground at the bound. No luma term and no clamp — nothing samples. */\n.p { background: var(--card); }\n`;
  staticWitness("DEL", "deleted-mechanisms", ["--root", tree("del-clean", { "src/a.css": ok, "demo/b.vue": "<template><p>cream at the bound</p></template>\n" }), "--declare", decl], "PASS", "H6-1: the floor's names absent; the deletion stated as such");
  staticWitness("DEL", "deleted-mechanisms", ["--root", tree("del-split", { "src/a.css": `/* the veil already carries the earned\n   * darken of the clamp */\n.p { color: red; }\n` }), "--declare", decl], "FAIL", "H6-1: a phrase broken over two comment lines (overlay-plate.css:272-273's shape)");
  staticWitness("DEL", "deleted-mechanisms", ["--root", tree("del-demo", { "src/a.css": ok, "demo/x.ts": `const m = props.backdropMode;\n` }), "--declare", decl], "FAIL", "H6-1: an identifier in an untouched demo file");
  if (a.tree) staticWitness("DEL", "deleted-mechanisms", ["--root", path.resolve(a.tree), "--declare", decl], "FAIL", `H6-1: floor v4's tree (${path.basename(path.dirname(path.resolve(a.tree)))}): the six earned-darken comments`);
}

// ── H7 (pass 7): M-3's round-ring reader (H7-1), DEL's word forms and patch-built declaration (H7-2), the minor's
// declaration (H7-3) ─────────────────────────────────────────────────────────────────────────────────────────────
// An expectation on a witness's printed rows, beside its exit code: every pattern in `must` appears in the output.
// H9: an entry { not: pattern } must be absent.
function rowsHold(id, engine, out, must, note) {
  const has = (m) => (m instanceof RegExp ? m.test(out) : out.includes(m));
  const miss = must.filter((m) => (m && m.not !== undefined ? has(m.not) : !has(m))).map((m) => (m && m.not !== undefined ? `present: ${m.not}` : m));
  const ok = miss.length === 0;
  results.push({ id, engine, expect: "ROWS", exit: ok ? 0 : 1, ok, verdict: ok ? `rows hold (${must.length})` : `missing: ${miss.join(" | ")}`, capdir: "", note, fails: [] });
  console.log(`${ok ? "ok  " : "BAD "} ${id.padEnd(4)} ${engine.padEnd(8)} expect ROWS exit ${ok ? 0 : 1} · ${ok ? `rows hold (${must.length})` : "missing: " + miss.join(" | ")} · ${note}`);
}
if (want("H7-1") || want("H9-4")) {
  // The pixels the pass-6 critic read off floor v5's light Close ring, from the battery's own ring PNG (Chromium, the
  // headless shell): columns 852-854, rows 283-292, the paper cell (every light ground reads the same, the ring sits on
  // the opaque Dialog). One source: the banked log, parsed here.
  const LOG = path.join(HERE, "..", "pass-6", "crit-records", "ringread-fv5-light-chromium.log");
  const txt = fs.readFileSync(LOG, "utf8").split("\n"), at0 = txt.findIndex((l) => l.startsWith("RINGREAD chromium light dialog·paper dialog:close"));
  const prof = {};
  for (const l of txt.slice(at0 + 1, at0 + 4)) { const x = +l.match(/x (\d+):/)[1]; prof[x] = Object.fromEntries([...l.matchAll(/(\d+):#([0-9a-f]{6})/g)].map(([, y, h]) => [+y, [0, 2, 4].map((k) => parseInt(h.slice(k, k + 2), 16))])); }
  const PLATE = prof[852][283], SOLID = prof[852][287];
  // The ring's ink, the library's --ink-perimeter colour (oklab(0.216114 0.00343135 0.00508514), H6's ring probe), as sRGB.
  const enc = (v) => 255 * (v <= 0.0031308 ? 12.92 * v : 1.055 * v ** (1 / 2.4) - 0.055);
  const INK = oklchLin(0.216114, Math.hypot(0.00343135, 0.00508514), (Math.atan2(0.00508514, 0.00343135) * 180) / Math.PI).map((v) => enc(Math.max(0, v)));
  const over = (al, plate = PLATE) => INK.map((c, k) => c * al + plate[k] * (1 - al));
  const cov = (px) => [0, 1, 2].reduce((sum, k) => sum + (PLATE[k] - px[k]) / (PLATE[k] - SOLID[k]), 0) / 3;
  // A ring at another alpha, over another plate, with the SAME geometry: each banked pixel's coverage applied to the
  // new solid composite.
  const scaled = (al, plate = PLATE) => { const S = over(al, plate); return Object.fromEntries(Object.entries(prof).map(([x, col]) => [x, Object.fromEntries(Object.entries(col).map(([y, p]) => [y, S.map((c, k) => plate[k] + cov(p) * (c - plate[k]))]))])); };
  // HEAD's own plate beside its light Close ring, as the critic's ring probe read it (crit-records/phase-ringprobe.log,
  // "RING chromium light paper head": the rows around the band read #746e66; the band #4a4642, the ink at 0.48 over it).
  const HEAD_PLATE = [0x74, 0x6e, 0x66];
  function ringCap(name, { rows, cols = [852, 853, 854], ow = 2, edge = false, plate = PLATE, variant = "base" }) {
    const W = 860, H = 300, png = new PNG({ width: W, height: H });
    for (let i = 0; i < W * H; i++) png.data.set([...plate, 255], i * 4);
    for (const [x, col] of Object.entries(rows)) for (const [y, rgb] of Object.entries(col)) png.data.set([...rgb.map((v) => Math.round(Math.max(0, Math.min(255, v)))), 255], (+y * W + +x) * 4);
    const dir = path.join(ROOT, "caps", name); fs.rmSync(dir, { recursive: true, force: true }); fs.mkdirSync(path.join(dir, "png"), { recursive: true });
    fs.writeFileSync(path.join(dir, "png", "full.png"), PNG.sync.write(png));
    const band = [...Array(ow).keys()].map((j) => 287 + j), probeCols = cols.map((x) => ({ x, band, in: 287 + ow, out: 286 }));
    const spec = { id: "dialog", edges: edge ? [{ id: "well", painted: true, kind: "border", width: ow, cols: probeCols }] : [], inks: [], rings: edge ? [] : ["close"] };
    const rings = edge ? [] : [{ id: "close", painted: true, kind: "outline", width: ow, offset: 2, spec: "dialog", focusVisible: true, cols: probeCols, file: "png/full.png", dx: 0, dy: 0 }];
    fs.writeFileSync(path.join(dir, "cells.json"), JSON.stringify({ meta: { target: `H7-1 ${name} (from ${path.relative(HERE, LOG)})` }, cells: [{ engine: "chromium", theme: "light", ground: "paper", scene: "dialog", variant, files: { full: "png/full.png" }, specs: [spec], rings }] }, null, 1));
    return dir;
  }
  if (want("H7-1")) {
  const m3 = (name, opts, expect, must, note) => {
    const out = staticWitness("H7-1", "m3-non-text", [ringCap(name, opts), "--gate", "chromium", "--verbose", "--cells", "^chromium light paper dialog$"], expect, note);
    rowsHold("H7-1", "pixels", out, must, note);
  };
  console.log(`     H7-1 pixels: plate ${PLATE} · banked solid ${SOLID} · ink ${INK.map((v) => v.toFixed(1))} → at α 0.52 ${over(0.52).map((v) => v.toFixed(1))}`);
  m3("h7-fv5-ring", { rows: prof }, "PASS", [/dialog·ring:close p05 3\.52 min 2\.66 cols 3 \(full-coverage column 852\)/],
    "R-14 fixture: floor v5's light Close ring, its banked pixels: the full-coverage column 852 reads 3.52 (the worst of three, 2.66, is the antialiasing)");
  m3("h7-head-ring", { rows: scaled(0.48, HEAD_PLATE), plate: HEAD_PLATE }, "FAIL", [/dialog·ring:close p05 1\.\d\d min .* \(full-coverage column 852\)/],
    "R-14 plant: HEAD's ring (--ink-perimeter 0.48 over HEAD's plate #746e66) with the same geometry: reds at its full-coverage column");
  m3("h7-alpha40-ring", { rows: scaled(0.40) }, "FAIL", [/dialog·ring:close p05 [12]\.\d\d min .* \(full-coverage column 852\)/],
    "R-14 plant: the same ring at α 0.40: reds at its full-coverage column");
  // A 1 px outline: one band row cannot show full coverage. Column 852 is the solid composite (3.52 by itself), 853 and
  // 854 fall off the curve; the reading stays the worst of three. A reader that took the best column would pass it.
  const P = PLATE, S = SOLID, mix = (t) => S.map((c, k) => P[k] + t * (c - P[k]));
  m3("h7-1px-ring", { ow: 1, rows: { 852: { 287: S }, 853: { 287: mix(0.8) }, 854: { 287: mix(0.55) } } }, "FAIL", [/dialog·ring:close p05 [12]\.\d\d min .* cols 3 \(worst of three: no full-coverage column\)/],
    "R-14 plant: a 1 px outline with no provable full-coverage column keeps the worst of three (its column 852 alone would read 3.52)");
  // Bite: a straight run (8 columns) with one full-coverage column at 3.52 and seven antialiased ones reads as before.
  const run = [852, 853, 854, 855, 856, 857, 858, 859];
  m3("h7-straight-ring", { cols: run, rows: Object.fromEntries(run.map((x, i) => [x, i === 0 ? prof[852] : prof[854]])) }, "FAIL", [/dialog·ring:close p05 2\.66 min 2\.66 cols 8\n/],
    "R-14 bite: a straight-run ring is untouched (p05 over its columns; one full column does not lift it)");
  m3("h7-perimeter", { edge: true, rows: prof }, "FAIL", [/dialog·perimeter:well p05 2\.66 min 2\.66 cols 3\n/],
    "R-14 bite: a perimeter on the three-column fallback is untouched (R-14 reads rings only)");
  }
  // ── H9-4 (pass 9, F-1): a witness reads the variant it is told (--variant, `base` by default) and refuses loud, exit 2,
  // on a capture with no cell of it. The plant is pass-7's shape: the α 0.40 ring captured under its own label `ring040`
  // and never relabelled, which M-3 used to print as 14 MISSING rows and a gated FAIL (pass-7 crit-records
  // verbose/m3-fv6-ring040-chromium.txt).
  if (want("H9-4")) {
    const R = ["--gate", "chromium", "--verbose", "--cells", "^chromium light paper dialog$"];
    const c040 = ringCap("h9-ring040", { rows: scaled(0.40), variant: "ring040" }), cgood = ringCap("h9-ring-good", { rows: prof, variant: "ring040" });
    const o1 = staticWitness("H9-4", "m3-non-text", [c040, ...R], "LOUD", "H9-4 plant: M-3 on the unrelabelled ring040 capture, no --variant: nothing read, exit 2 (was 14 MISSING rows, a vacuous FAIL)");
    rowsHold("H9-4", "pixels", o1, ["0 cells of variant base: nothing read", "holds ring040", { not: /MISSING/ }], "H9-4: the refusal names the variant and what the capture holds; no MISSING row is printed");
    const o2 = staticWitness("H9-4", "m3-non-text", [c040, ...R, "--variant", "ring040"], "FAIL", "H9-4: the same capture read as --variant ring040: a measured red (the α 0.40 ring)");
    rowsHold("H9-4", "pixels", o2, [/dialog·ring:close p05 [12]\.\d\d min .* \(full-coverage column 852\)/, /FAIL \(1 of 1 gated rows\)/], "H9-4: one gated row, the ring, read at its full-coverage column");
    staticWitness("H9-4", "m3-non-text", [cgood, ...R, "--variant", "ring040"], "PASS", "H9-4 fixture: floor v5's ring pixels labelled ring040, read as --variant ring040: 3.52");
    staticWitness("H9-4", "m2-text-contrast", [c040, ...R], "LOUD", "H9-4: every rows.mjs reader refuses the same way (M-2 on the ring040 capture, no --variant)");
  }
}
if (want("H7-2")) {
  const decl = path.join(HERE, "deletes-floor.json");
  const ok = `/* The listbox plate: two flat layers. There is no second tint layer: the veil paints the overlay rung at the bound. */\n.p { background: var(--card); }\n`;
  staticWitness("H7-2", "deleted-mechanisms", ["--root", tree("h72-clean", { "src/a.css": ok, "src/README.md": "- `GlassDock` owns the plate, orientation, collapse state, and overflow.\n" }), "--declare", decl], "PASS", "H7-2 fixture: each deletion stated with no name of what it deleted");
  const plants = {
    "backdrop-mode": [{ "src/README.md": "- `GlassDock` owns the plate, orientation, collapse state, overflow, and backdrop mode.\n" }, "`backdropMode`'s word form, \"backdrop mode\" (dock/README.md:20's shape)"],
    "tinting": [{ "demo/s.vue": "<template>\n  <!-- The aperture rides the morph; adaptive tinting\n       keeps its text contrast at or above 4.5:1. -->\n</template>\n" }, "\"adaptive tint\" inflected and split over an HTML comment's lines (dock-search.vue:197-198's shape)"],
    "kebab": [{ "src/a.css": "/* There is no adaptive-tint layer and no knob. */\n" }, "\"adaptive tint\" in kebab case"],
    "attr": [{ "demo/x.vue": `<template><GlassDock :data-backdrop-mode="m" /></template>\n` }, "`backdropMode` as a kebab data- attribute in an untouched demo file"],
  };
  for (const [k, [files, note]] of Object.entries(plants)) staticWitness("H7-2", "deleted-mechanisms", ["--root", tree(`h72-${k}`, files), "--declare", decl], "FAIL", "H7-2 plant: " + note);
  // The declaration built from a patch's removed lines (R-15 (iii)): a prop, a token and a data- attribute on removed
  // lines of src/ files are declared; a test file's removed line is not read; a name the tree still uses is listed, not declared.
  const pt = tree("h72-patch", {
    "p.patch": ["diff --git a/src/D.vue b/src/D.vue", "--- a/src/D.vue", "+++ b/src/D.vue", "@@ -1,3 +1,1 @@", "-    backdropMode?: DockBackdropMode;", "-  --glass-backdrop-luma: 0.5;", '-  <div :data-backdrop-sample-state="s" :class="cn(x)" />', " keep",
      "diff --git a/tests/D.test.ts b/tests/D.test.ts", "--- a/tests/D.test.ts", "+++ b/tests/D.test.ts", "@@ -1,1 +0,0 @@", "-    expect(x).toBeCloseTo(1); const sampleBackdrop = 1;", ""].join("\n"),
    "src/live.ts": "export const cn = (x: string) => x;\nexport type DockBackdropMode = 'live';\n",
    "src/readme.md": "The dock picks a backdrop sample state each frame.\n" });
  const dj = path.join(pt, "decl.json");
  const r = spawnSync(process.execPath, [path.join(HERE, "declare-removed.mjs"), "--patch", path.join(pt, "p.patch"), "--root", pt, "--out", dj], { encoding: "utf8" });
  const d = JSON.parse(fs.readFileSync(dj, "utf8"));
  const want3 = ["--glass-backdrop-luma", "backdropMode", "data-backdrop-sample-state"].every((n) => d.names.includes(n)) && !d.names.includes("toBeCloseTo") && !d.names.includes("sampleBackdrop") && d.present.some((p) => p.id === "DockBackdropMode") && !d.names.includes("DockBackdropMode");
  results.push({ id: "H7-2", engine: "static", expect: "DECL", exit: r.status, ok: r.status === 0 && want3, verdict: `declared ${d.names.join(", ")} · present ${d.present.map((p) => p.id).join(", ")}`, capdir: pt, note: "H7-2: declare-removed.mjs over a three-line patch", fails: [] });
  console.log(`${r.status === 0 && want3 ? "ok  " : "BAD "} H7-2 static   expect DECL · declared ${d.names.join(", ")} · present ${d.present.map((p) => p.id).join(", ")} · the test file's names not read`);
  staticWitness("H7-2", "deleted-mechanisms", ["--root", pt, "--declare", dj], "FAIL", "H7-2 plant: the built declaration reads \"backdrop sample state\" in an untouched readme");
  if (a["h7-trees"] && a["h7-decl"]) {
    const T = path.resolve(a["h7-trees"]), D = path.resolve(a["h7-decl"]);
    const out = staticWitness("H7-2", "deleted-mechanisms", ["--root", path.join(T, "fv5"), "--declare", D], "FAIL", "H7-2 plant: floor v5 under its patch-built declaration");
    rowsHold("H7-2", "static", out, ['src/components/dock/README.md:20 "backdrop mode"', 'demo/stories/dock/dock-search.vue:197 "adaptive tinting"', 'demo/stories/substrates/glass-material.vue:5 "adaptive tint"'], "H7-2 plant: floor v5 reds at the three sentences P6-1.1 names");
    staticWitness("H7-2", "deleted-mechanisms", ["--root", path.join(T, "fv5fix"), "--declare", D], "PASS", "H7-2 fixture: floor v5 with its stale sentences rewritten name-free (fv5fix)");
  }
}
if (want("H7-3")) {
  const decl = path.join(HERE, "deletes-minor.json");
  staticWitness("H7-3", "deleted-mechanisms", ["--root", tree("h73-clean", { "src/a.css": "/* the veil already carries the earned\n   ink (darker in dark, a thicker cream pole in light), and a second layer is the double-writer. */\n" }), "--declare", decl], "PASS", "H7-3 fixture: R-13's register, \"earned ink\"");
  staticWitness("H7-3", "deleted-mechanisms", ["--root", tree("h73-split", { "src/a.css": "/* The PLATE half — the earned\n * darken off the measured backdrop luminance — is composed at the element. */\n" }), "--declare", decl], "FAIL", "H7-3 plant: \"earned darken\" split over two comment lines (adaptive-legibility.css:7-8's shape)");
  // R-16 (iii): a sentence the minor v5 seat ruled false in light, kebab-spelt as the minor v4 carries it
  staticWitness("H7-3", "deleted-mechanisms", ["--root", tree("h73-iii", { "src/a.css": "/* additively — the plate still darkens-over-light for AA AND carries the data hue. */\n" }), "--declare", decl], "FAIL", "H7-3 plant: an R-16 (iii) sentence (tokens/glass.css:208's shape)");
  // R-18 (ii): a Crit A-3 sentence, the phrase MS5 §2.3 left unguarded (adaptive-legibility.css:70's shape)
  staticWitness("H7-3", "deleted-mechanisms", ["--root", tree("h73-r18", { "src/a.css": "/* progressive enhancement only — the declarative darken is the AA floor. */\n" }), "--declare", decl], "FAIL", "H7-3 plant: an R-18 sentence, \"declarative darken\" (adaptive-legibility.css:70's shape)");
  // R-23: a Crit8 §5.2 sentence (surfaces-pager.css:34-35's shape), one of the three phrases R-23 adds
  staticWitness("H7-3", "deleted-mechanisms", ["--root", tree("h73-r23", { "src/a.css": "/* under `.dark` the\n   tint arm LIFTS it toward luminous warm-dark. */\n" }), "--declare", decl], "FAIL", "H7-3 plant: an R-23 sentence, \"tint arm\" (surfaces-pager.css:34-35's shape)");
  // R-23's value-arm sites without --patch: not read, no row; a site under a declared name is read and goes stale
  const s73 = tree("h73-sites", { "src/a.css": "/* nothing here */\n", "d.json": JSON.stringify({ patch: "H7-3 sites", names: ["x seam"], exact: [{ name: "--t", at: "src/a.css:1", why: "value site" }] }) });
  const o73 = staticWitness("H7-3", "deleted-mechanisms", ["--root", s73, "--declare", path.join(s73, "d.json")], "PASS", "H7-3 fixture: a value-arm site with no --patch is not read and is no row");
  rowsHold("H7-3", "static", o73, ['site src/a.css:1 for "--t" not read: no --patch', "PASS (1 gated rows)"], "H7-3: the value arm did not run, so its site is printed, not gated");
  const s73b = tree("h73-sites-name", { "src/a.css": "/* nothing here */\n", "d.json": JSON.stringify({ patch: "H7-3 sites", names: ["x seam"], exact: [{ name: "x seam", at: "src/a.css:1", why: "name site" }] }) });
  const o73b = staticWitness("H7-3", "deleted-mechanisms", ["--root", s73b, "--declare", path.join(s73b, "d.json")], "FAIL", "H7-3 plant: a site under a declared name is read without --patch, and one that exempts nothing is stale");
  rowsHold("H7-3", "static", o73b, ['exempt site src/a.css:1 for "x seam" exempts no hit: stale'], "H7-3: a name site stays gated with or without a patch");
  const T = a["h7-trees"] && path.resolve(a["h7-trees"]);
  if (T && fs.existsSync(path.join(T, "minor4")) && fs.existsSync(path.join(T, "minor5"))) {
    const out = staticWitness("H7-3", "deleted-mechanisms", ["--root", path.join(T, "minor4"), "--declare", decl], "FAIL", "H7-3 plant: the minor v4 under the minor's declaration");
    rowsHold("H7-3", "static", out, ["src/components/dock/styles/adaptive-legibility.css:7", "src/styles/glass/overlay-plate.css:272", "src/styles/glass/ladder.css:164", "src/composables/glass/useGlassBackdropLuminance.ts:45", "hits=50 files=15"], "H7-3 plant: the minor v4 reds at A-3's two sentences, the R-16 (iii) sentences, the R-18 sentences and the R-23 sentences");
    const out5 = staticWitness("H7-3", "deleted-mechanisms", ["--root", path.join(T, "minor5"), "--declare", decl], "FAIL", "H7-3 plant: the minor v5 under the R-18 declaration");
    rowsHold("H7-3", "static", out5, ["src/components/dock/styles/adaptive-legibility.css:70", "src/components/dock/styles/search.css:58", "src/components/dock/styles/index.css:21", "src/styles/glass/surface-axis.css:79", "src/styles/glass/surfaces-pager.css:29", "hits=20 files=7", "FAIL (17 of 42"], "H7-3 plant: the minor v5 reds at Crit A-3's sentences, one row per R-18 name, and at R-23's two src/ phrases");
    if (fs.existsSync(path.join(T, "minor6"))) {
      const o6 = staticWitness("H7-3", "deleted-mechanisms", ["--root", path.join(T, "minor6"), "--declare", decl], "FAIL", "H7-3 plant: the minor v6 under the minor v7's declaration (R-23 unbuilt)");
      rowsHold("H7-3", "static", o6, ["src/styles/glass/surfaces-pager.css:35", "src/styles/tokens/property-regs.css:154", "FAIL (2 of 42"], "H7-3 plant: the minor v6 reds at R-23's two declarable src/ sentences (the third phrase is in tests/, outside H7's scope)");
    }
    if (fs.existsSync(path.join(T, "minor7"))) {
      const o7 = staticWitness("H7-3", "deleted-mechanisms", ["--root", path.join(T, "minor7"), "--declare", decl], "PASS", "H7-3 fixture: the minor v7 (R-23 built)");
      rowsHold("H7-3", "static", o7, ['site src/styles/glass/overlay-plate.css:173 for "--ink-perimeter" not read', 'site tests/components/ui/surface/Surface.test.ts:164 for "--glass-blur-*-radius" not read', "PASS (42 gated rows)"], "H7-3: R-23's sites are the value arm's, unread without the patch");
    }
  }
}

// ── the pass-1 family witnesses H2 left alone (Chromium, as pass 1 ran them) ──────────────────────────────────
// ── H8 (pass 8): DEL's scope, changed-value and REPORTED arms (H8-1, R-17) and declare-removed.mjs's module stems and
// module-level consts (H8-2), static, run once. --h8-trees <dir> holds fv6 (floor v6 as banked) and fv6fix (floor v6
// with R-17 (i)'s rewrites and liquid-fill.css:74's), each with src/ demo/ tests/ docs/canon/ and the root *.md;
// --h8-patch is floor-v6.patch and --h8-exact the exact list the real declaration is built with.
if (want("H8-1") || want("H8-2")) {
  // A one-file patch for the tiny trees: --ink-perimeter 0.48 → 0.52 in src/, a comment quoting it (not a declaration),
  // the deleted token --glass-veil-ink, and a touched doc outside the roots.
  const PATCH = ["diff --git a/src/t.css b/src/t.css", "--- a/src/t.css", "+++ b/src/t.css", "@@ -1,4 +1,3 @@",
    "-    --ink-perimeter: 0.48; /* a control's own edge */", "+    --ink-perimeter: 0.52; /* a control's own edge */",
    "-    /* `--glass-blur-quiet-radius: 14px` was the quiet rung */", "+    /* the quiet rung */", "-    --glass-veil-ink: 0.9;",
    "diff --git a/docs/notes.md b/docs/notes.md", "--- a/docs/notes.md", "+++ b/docs/notes.md", "@@ -1 +1 @@", "-old", "+new", ""].join("\n");
  const h8 = (name, files, extra = {}) => {
    const d = tree(name, { "p.patch": PATCH, "src/t.css": ":root {\n    --ink-perimeter: 0.52; /* a control's own edge */\n    /* the quiet rung */\n}\n", ...files });
    const decl = path.join(d, "decl.json");
    fs.writeFileSync(decl, JSON.stringify({ patch: "H8-1 fixture", names: ["--glass-veil-ink"], exact: extra.exact || [] }));
    return ["--root", d, "--declare", decl, "--patch", path.join(d, "p.patch")];
  };
  const T8 = a["h8-trees"] && path.resolve(a["h8-trees"]), P8 = a["h8-patch"] && path.resolve(a["h8-patch"]);
  let realDecl = null;
  if (T8 && P8 && a["h8-exact"]) {
    realDecl = path.join(ROOT, "h8-declare-floor-v6.json");
    const r = spawnSync(process.execPath, [path.join(HERE, "declare-removed.mjs"), "--patch", P8, "--root", path.join(T8, "fv6"), "--concepts", path.join(HERE, "deletes-floor.json"), "--exact", path.resolve(a["h8-exact"]), "--out", realDecl], { encoding: "utf8" });
    console.log(`     H8 real declaration: ${(r.stdout || r.stderr).split("\n")[0]}`);
    fs.writeFileSync(path.join(ROOT, "h8-declare-floor-v6.log"), (r.stdout || "") + (r.stderr || ""));
  }
  if (want("H8-1")) {
    const TITLE_OK = `it("G-F2 · the perimeter rides the \`--ink-perimeter\` rung", () => {});\n`;
    const out = staticWitness("H8-1", "deleted-mechanisms", h8("h81-clean", { "tests/f.test.ts": TITLE_OK, "DESIGN.md": "The veil reads `--glass-veil-ink` (stale; the docs pass owns it).\n", "docs/canon/g.md": "the perimeter rides the 0.48 ink rung\n", "docs/notes.md": "the quiet rung\n" }), "PASS",
      "H8-1 fixture: tests/ and the touched doc name nothing deleted or changed; the repo-root and docs/canon/ prose is printed, not gated");
    rowsHold("H8-1", "static", out, ['[reported] "--glass-veil-ink" · DESIGN.md:1', "[reported] --ink-perimeter: 0.48 → 0.52 (literal 0.48; src/t.css) · docs/canon/g.md:1", "changed values: 1 declarations", "2 paths · 2 exist in the tree and are read"],
      "H8-1 REPORTED arm: DESIGN.md and docs/canon/ print their hits; the quoted `--x: v` in a comment is not a declaration (one changed value, not two)");
    const plants = {
      "scope": [{ "tests/f.test.ts": TITLE_OK + "/* both resolve `--glass-veil-ink`, which is #22 W-FROST's token */\n" }, "scope arm: a deleted token named live in a tests/ comment (forms-seam.test.ts:23-26's shape); H7's DEL never read tests/"],
      "touched": [{ "tests/f.test.ts": TITLE_OK, "docs/notes.md": "the glass veil ink paints the pole\n" }, "scope arm: the deleted token's word form in a touched file outside src/ demo/ tests/ (the patch's docs/notes.md)"],
      "value": [{ "tests/f.test.ts": `it("G-F2 · PERIMETER — the perimeter rides the 0.48 ink rung", () => {});\n` }, "value arm: a test title carrying the old literal with the rung's words (forms-seam.test.ts:91's shape)"],
      "value-comment": [{ "src/u.css": "/* The control edge rides the ink perimeter, 0.48 over the plate. */\n" }, "value arm: a src/ comment quoting the old rung value by its words"],
    };
    for (const [k, [files, note]] of Object.entries(plants)) staticWitness("H8-1", "deleted-mechanisms", h8(`h81-${k}`, files), "FAIL", "H8-1 plant: " + note);
    staticWitness("H8-1", "deleted-mechanisms", h8("h81-untouched-doc", { "docs/other.md": "the glass veil ink paints the pole\n" }), "PASS",
      "H8-1 bite: the same sentence in a docs/ file the patch does not touch and outside the roots is not read");
    staticWitness("H8-1", "deleted-mechanisms", h8("h81-oneword", { "tests/f.test.ts": `it("each ink at 0.48 alpha composites", () => {});\nconst x = 0.48; // perimeter\n` }), "PASS",
      "H8-1 bite: one word of the name beside the literal is not the rung (the value arm needs every word); a code literal is not prose");
    staticWitness("H8-1", "deleted-mechanisms", h8("h81-site", { "tests/f.test.ts": TITLE_OK + "expect(map.has(\"--glass-veil-ink\")).toBe(false);\n" }, { exact: [{ name: "--glass-veil-ink", at: "tests/f.test.ts:2", why: "asserts the deletion" }] }), "PASS",
      "H8-1 site entry: a test line that asserts the deletion, read in context, is exempt");
    staticWitness("H8-1", "deleted-mechanisms", h8("h81-stale", { "tests/f.test.ts": TITLE_OK }, { exact: [{ name: "--glass-veil-ink", at: "tests/f.test.ts:9", why: "a line that moved" }] }), "FAIL",
      "H8-1 plant: a site entry that exempts no hit is stale and FAILs");
    if (realDecl) {
      const o6 = staticWitness("H8-1", "deleted-mechanisms", ["--root", path.join(T8, "fv6"), "--declare", realDecl, "--patch", P8], "FAIL", "H8-1 plant: floor v6 as banked, under its patch-built declaration and patch");
      // H9 (pass 9): deletes-floor.json now declares H9-1's phrases and DEL reads H9-2's tuple, so floor v6 also reds at
      // A-1's sentences (8 rows: H8's 3, H9-1's 4, H9-2's 1), and fv6fix, the floor v7 stand-in, now reds at A-1's sentences
      // only. Both keep H8's own reading: the three H8 sites red on fv6 and are gone from fv6fix.
      const A1 = [/src\/styles\/glass\/surfaces-pager\.css:29 "TINT seam"/, /src\/styles\/glass\/surfaces-pager\.css:34 "tint arm"/, /src\/components\/dock\/GlassDock\.vue:467 "tint seam"/, /src\/components\/dock\/styles\/index\.css:80 "tint legibility seam"/, /src\/components\/dock\/styles\/index\.css:83 "tint seam"/, /src\/styles\/tokens\/glass-deep\.css:12 "10\/14\/16\/20\/22px"/, /src\/styles\/tokens\/glass-deep\.css:54 "10\/14\/16\/20\/22px"/];
      rowsHold("H8-1", "static", o6, ['tests/components/field/forms-seam.test.ts:24 "--input-on-glass"', /tests\/components\/field\/forms-seam\.test\.ts:91 "0\.48 · ink perimeter"/i, /src\/styles\/glass\/liquid-fill\.css:74 "14px/, ...A1, /FAIL \(8 of \d+ gated rows\)/],
        "H8-1 plant: floor v6 reds at forms-seam.test.ts:24 (deleted-name arm) and :91 (value arm) and liquid-fill.css:74 (value arm); with H9, at A-1's sentences too");
      const o7 = staticWitness("H8-1", "deleted-mechanisms", ["--root", path.join(T8, "fv6fix"), "--declare", realDecl, "--patch", P8], "FAIL", "H8-1 on fv6fix (the floor v7 stand-in): H8's three sites gone; with H9 it reds at A-1's sentences, as floor v7 does");
      rowsHold("H8-1", "static", o7, [/\[reported\] .*DESIGN\.md:521/, /\[reported\] .*docs\/canon\/glass-system\.md:(4[4-9]|5\d|60)/, ...A1, { not: /✗.*forms-seam\.test\.ts/ }, { not: /✗.*liquid-fill\.css/ }], "H8-1 REPORTED arm: DESIGN.md:521 and docs/canon/glass-system.md:44-60 printed, not gated; H8's sites absent, A-1's present");
    }
  }
  if (want("H8-2")) {
    const pt = tree("h82-patch", {
      "p.patch": ["diff --git a/src/g/backdropSampleMath.ts b/src/g/backdropSampleMath.ts", "deleted file mode 100644", "--- a/src/g/backdropSampleMath.ts", "+++ /dev/null", "@@ -1,2 +0,0 @@",
        "-const CSS_INITIAL_UNDERLAY = [255, 255, 255];", "-    const downCtx = c.getImageData(0, 0, 1, 1);",
        "diff --git a/demo/s.vue b/demo/s.vue", "--- a/demo/s.vue", "+++ b/demo/s.vue", "@@ -1,3 +1,1 @@", "-const liveCardEl = useTemplateRef(\"liveCardEl\");", "-const { sample: backdropSample, stop } = useX(liveCardEl);", " keep", ""].join("\n"),
      "demo/s.vue": "keep\nconst stop = 1;\n",
      "src/readme.md": "The sampler's backdrop sample math rounds each channel.\n" });
    const dj = path.join(pt, "decl.json");
    const r = spawnSync(process.execPath, [path.join(HERE, "declare-removed.mjs"), "--patch", path.join(pt, "p.patch"), "--root", pt, "--out", dj], { encoding: "utf8" });
    const d = JSON.parse(fs.readFileSync(dj, "utf8"));
    const ok = r.status === 0 && ["backdropSampleMath", "CSS_INITIAL_UNDERLAY", "liveCardEl", "backdropSample"].every((n) => d.names.includes(n)) && !["downCtx", "getImageData", "stop"].some((n) => d.names.includes(n)) && d.present.some((p) => p.id === "stop");
    results.push({ id: "H8-2", engine: "static", expect: "DECL", exit: r.status, ok, verdict: `declared ${d.names.join(", ")} · present ${d.present.map((p) => p.id).join(", ")}`, capdir: pt, note: "H8-2: a deleted module's stem and the module-level consts (destructured too) are declared; an indented local and a browser API are not; a const still named is listed", fails: [] });
    console.log(`${ok ? "ok  " : "BAD "} H8-2 static   expect DECL · declared ${d.names.join(", ")} · present ${d.present.map((p) => p.id).join(", ")}`);
    staticWitness("H8-2", "deleted-mechanisms", ["--root", pt, "--declare", dj], "FAIL", "H8-2 plant: the deleted module's stem in its word form, \"backdrop sample math\", in a readme");
    if (realDecl) {
      const rd = JSON.parse(fs.readFileSync(realDecl, "utf8")), banked = JSON.parse(fs.readFileSync(path.join(HERE, "..", "pass-7", "FV6-records", "declare-floor-v6.json"), "utf8"));
      const added = rd.names.filter((n) => !banked.names.includes(n)).sort(), lost = banked.names.filter((n) => !rd.names.includes(n));
      // The pass-7 critic's 28 absent-undeclared tokens (crit-records/declcheck.log), split by H8-2's kinds.
      const IN = ["CSS_INITIAL_UNDERLAY", "backdropLuminanceSample", "backdropSample", "backdropSampleMath", "liveCardEl", "sampleAge", "stageEl"];
      const OUT28 = ["--glass", "--glass-plate", "alphaSum", "auroraCanvas", "bc", "bgRaw", "bodyBg", "downCanvas", "downCtx", "drawImage", "elementsFromPoint", "getImageData", "glassSample", "isShared", "lastSampleAt", "prefersReduced", "sampledAt", "sampleIntervalMs", "srcRect", "stopMotionWatch", "willReadFrequently"];
      // H9-1 (pass 9): deletes-floor.json's new phrases are hand-declared concepts, added beside H8-2's seven.
      const H9C = JSON.parse(fs.readFileSync(path.join(HERE, "deletes-floor.json"), "utf8")).names.filter((n) => !banked.names.includes(n));
      const ok2 = JSON.stringify(added) === JSON.stringify([...IN, ...H9C].sort()) && !lost.length && !OUT28.some((n) => rd.names.includes(n));
      results.push({ id: "H8-2", engine: "static", expect: "DECL", exit: ok2 ? 0 : 1, ok: ok2, verdict: `floor v6: ${rd.names.length} names (pass 7: ${banked.names.length}) · added ${added.join(", ")} · lost ${lost.join(", ") || "none"}`, capdir: realDecl, note: "H8-2 on floor-v6.patch: the 7 of the critic's 28 that are module stems or module-level consts are declared; the 21 locals, browser APIs, template prefixes, a comment word and a dataset key are not", fails: [] });
      console.log(`${ok2 ? "ok  " : "BAD "} H8-2 static   expect DECL · floor v6 ${rd.names.length} names (pass 7 ${banked.names.length}) · added ${added.join(", ")} · lost ${lost.join(", ") || "none"}`);
    }
  }
}

// ── H9 (pass 9): homonyms (H9-1), the tuple arm and rung reading (H9-2), the arm-aware value arm (H9-3), --engines and
// the frozen ENGINES (H9-5), R-21's frozen list and printer (H9-6). Static, run once. H9-4 runs with H7-1's ring pixels.
const T9 = a["h9-trees"] && path.resolve(a["h9-trees"]), P9 = a["h9-patch"] && path.resolve(a["h9-patch"]);
let decl9 = null;
if ((want("H9-1") || want("H9-2") || want("H9-6")) && T9 && P9 && a["h9-exact"]) {
  decl9 = path.join(ROOT, "h9-declare-floor-v7.json");
  const r = spawnSync(process.execPath, [path.join(HERE, "declare-removed.mjs"), "--patch", P9, "--root", path.join(T9, "fv7"), "--concepts", path.join(HERE, "deletes-floor.json"), "--exact", path.resolve(a["h9-exact"]), "--out", decl9], { encoding: "utf8" });
  console.log(`     H9 real declaration: ${(r.stdout || r.stderr).split("\n")[0]}`);
  fs.writeFileSync(path.join(ROOT, "h9-declare-floor-v7.log"), (r.stdout || "") + (r.stderr || ""));
}
if (want("H9-1")) {
  // A concepts file with one homonym phrase and its live site, through declare-removed.mjs, as the floor's is built.
  const h91 = (name, files, homonyms) => {
    const d = tree(name, { "p.patch": "diff --git a/src/a.css b/src/a.css\n--- a/src/a.css\n+++ b/src/a.css\n@@ -1 +1 @@\n-x\n+y\n", ...files });
    fs.writeFileSync(path.join(d, "concepts.json"), JSON.stringify({ patch: "H9-1 fixture", names: ["tint seam"], homonyms }));
    const r = spawnSync(process.execPath, [path.join(HERE, "declare-removed.mjs"), "--patch", path.join(d, "p.patch"), "--root", d, "--concepts", path.join(d, "concepts.json"), "--out", path.join(d, "decl.json")], { encoding: "utf8" });
    return { r, args: ["--root", d, "--declare", path.join(d, "decl.json"), "--patch", path.join(d, "p.patch")] };
  };
  const LIVE = "/* held by `G-FEEDBACK-TINT-SEAM` arm (b). */\n", SITE = [{ name: "tint seam", at: "src/fb.css:1", why: "the live gate name" }];
  staticWitness("H9-1", "deleted-mechanisms", h91("h91-clean", { "src/fb.css": LIVE, "src/a.css": "/* the pill composes the bound at the element. */\n" }, SITE).args, "PASS", "H9-1 fixture: the live homonym at its site entry, the deleted seam named nowhere");
  staticWitness("H9-1", "deleted-mechanisms", h91("h91-dead", { "src/fb.css": LIVE, "src/a.css": "/* the field reads the tint seam (dock/search.css) at ≥4.5:1. */\n" }, SITE).args, "FAIL", "H9-1 plant: the deleted seam named live beside its homonym (GlassDock.vue:467's shape)");
  staticWitness("H9-1", "deleted-mechanisms", h91("h91-retint", { "src/fb.css": LIVE, "src/a.css": "/* the dots ride the retint seam of the pager. */\n" }, SITE).args, "PASS", "H9-1 bite: \"retint seam\" is another word (PagerDots.vue:426's shape)");
  staticWitness("H9-1", "deleted-mechanisms", h91("h91-moved", { "src/fb.css": "\n" + LIVE }, SITE).args, "FAIL", "H9-1 plant: the homonym moved a line: its site is stale, and the line it moved to reds");
  const bad = h91("h91-undeclared", { "src/fb.css": LIVE }, [{ name: "tint arm", at: "src/fb.css:1", why: "a phrase not declared" }]);
  const okRefuse = bad.r.status === 2 && /needs an `at` site and a declared phrase/.test(bad.r.stdout);
  results.push({ id: "H9-1", engine: "static", expect: "REFUSE", exit: bad.r.status, ok: okRefuse, verdict: bad.r.stdout.trim().split("\n").pop(), capdir: "", note: "H9-1: a homonym entry for a phrase the concepts file does not declare is refused", fails: [] });
  console.log(`${okRefuse ? "ok  " : "BAD "} H9-1 static   expect REFUSE exit ${bad.r.status} · ${bad.r.stdout.trim().split("\n").pop()}`);
  if (decl9) {
    const o = staticWitness("H9-1", "deleted-mechanisms", ["--root", path.join(T9, "fv7"), "--declare", decl9, "--patch", P9], "FAIL", "H9-1/H9-2 plant: floor v7 as banked, at the four P8 sentences (Crit A-1)");
    rowsHold("H9-1", "static", o, [/✗ "tint seam": 3 · src\/components\/dock\/GlassDock\.vue:467 "tint seam" src\/components\/dock\/styles\/index\.css:83 "tint seam" src\/styles\/glass\/surfaces-pager\.css:29 "TINT seam"\n/,
      /✗ "tint arm": 1 · src\/styles\/glass\/surfaces-pager\.css:34 "tint arm"\n/, /✗ "oklab tint": 1 · src\/styles\/glass\/surfaces-pager\.css:29 "oklab TINT"\n/, /✗ "tint legibility seam": 1 · src\/components\/dock\/styles\/index\.css:80 "tint legibility seam"\n/,
      /✗ --glass-blur-\*-radius tuple 10\/14\/16\/20\/22px → 6\/10\/12\/18\/20px \(src\/styles\/tokens\/glass\.css\): 2 · src\/styles\/tokens\/glass-deep\.css:12 "10\/14\/16\/20\/22px" src\/styles\/tokens\/glass-deep\.css:54 "10\/14\/16\/20\/22px"\n/,
      /DELETED-MECHANISMS names=72 hits=8 files=4 .* sites=19 /, /FAIL \(5 of 100 gated rows\)/, { not: /exempt site .* stale/ }],
      "H9-1/H9-2 plant: floor v7 reds at surfaces-pager.css:29, :34, GlassDock.vue:467, index.css:80, :83 (H9-1) and glass-deep.css:12, :54 (H9-2), and nowhere else; every homonym site exempts a live hit");
    const o8 = staticWitness("H9-1", "deleted-mechanisms", ["--root", path.join(T9, "fv8"), "--declare", decl9, "--patch", P9], "PASS", "H9-1/H9-2 fixture: the floor v8 stand-in (R-20's four rewrites, scratch wording) at 0");
    rowsHold("H9-1", "static", o8, [/exempt src\/components\/metric\/styles\.css:86 "tint seam"/, /exempt src\/styles\/tokens\/property-regs\.css:115 "OKLab-tints"/, /exempt tests\/components\/ui\/surface\/Surface\.test\.ts:164 "10 \/ 14 \/ 16 \/ 20 \/ 22"/, /PASS \(100 gated rows\)/],
      "H9-1/H9-2 fixture: the homonym sites and the tuple's history site each exempt their hit on floor v8");
  }
}
if (want("H9-2") || want("H9-3")) {
  // A three-rung ladder in src/t.css (--x-{a,b,c}-r: 10/14/16px → 6/10/12px) and --x-step 0.04 → 0.05 in :root, whose
  // .dark arm in src/dark.css still declares 0.04.
  const PATCH9 = ["diff --git a/src/t.css b/src/t.css", "--- a/src/t.css", "+++ b/src/t.css", "@@ -1,6 +1,6 @@", " :root {",
    "-    --x-a-r: 10px;", "-    --x-b-r: 14px;", "-    --x-c-r: 16px;", "-    --x-step: 0.04;", "+    --x-a-r: 6px;", "+    --x-b-r: 10px;", "+    --x-c-r: 12px;", "+    --x-step: 0.05;", " }", ""].join("\n");
  const T = ":root {\n    --x-a-r: 6px;\n    --x-b-r: 10px;\n    --x-c-r: 12px;\n    --x-step: 0.05;\n}\n", DARK = "/* the dark arm */\n.dark {\n    --x-step: 0.04;\n}\n";
  const h9 = (name, files, exact = []) => {
    const d = tree(name, { "p.patch": PATCH9, "src/t.css": T, "src/dark.css": DARK, ...files });
    fs.writeFileSync(path.join(d, "decl.json"), JSON.stringify({ patch: "H9 fixture", names: [], exact }));
    return ["--root", d, "--declare", path.join(d, "decl.json"), "--patch", path.join(d, "p.patch")];
  };
  if (want("H9-2")) {
    const o = staticWitness("H9-2", "deleted-mechanisms", h9("h92-clean", { "src/n.css": "/* the ladder is 6/10/12px today (the --x-*-r rungs). */\n" }), "PASS", "H9-2 fixture: the new tuple, and the ladder named by its tokens");
    rowsHold("H9-2", "static", o, ["changed values: 4 declarations in src/ · 4 tokens · 1 families", "--x-*-r tuple 10/14/16px → 6/10/12px (src/t.css): 0"], "H9-2: three changed rungs of one file differing in one segment are one family, its old tuple in declaration order");
    const plants = {
      "slash": [{ "src/n.css": "/* the ladder has since moved to 10/14/16px. */\n" }, "the old tuple, `/` separated, unit once (glass-deep.css:54's shape)"],
      "spaced": [{ "tests/n.test.ts": "/* against plain 10 / 14 / 16 — thinner */\n" }, "the old tuple with spaces and no unit, in a tests/ comment (Surface.test.ts:164's shape)"],
      "dot": [{ "demo/n.md": "rungs 10px · 14px · 16px\n" }, "the old tuple, `·` separated, a unit on each"],
    };
    for (const [k, [files, note]] of Object.entries(plants)) staticWitness("H9-2", "deleted-mechanisms", h9(`h92-${k}`, files), "FAIL", "H9-2 plant: " + note);
    staticWitness("H9-2", "deleted-mechanisms", h9("h92-site", { "src/n.css": "/* the first cut LERPed against plain 10/14/16. */\n" }, [{ name: "--x-*-r", at: "src/n.css:1", why: "history" }]), "PASS", "H9-2 site entry: a history line exempt by the family's name");
    staticWitness("H9-2", "deleted-mechanisms", h9("h92-partial", { "src/n.css": "/* the steps 14/16 and 10/14 read as one. */\n" }), "PASS", "H9-2 bite: part of the tuple is not the tuple");
    const ob = staticWitness("H9-2", "deleted-mechanisms", h9("h92-bare", { "src/n.css": "/* a deep c painted 12px where the plain c paints 16, and a paints 6. */\n" }), "PASS", "H9-2 rung reading: a rung's word then its old number is printed for R-21 (b), not gated");
    rowsHold("H9-2", "static", ob, ['[R-21 b] --x-c-r: src/n.css:1 "c paints 16"', "rung=1", { not: /\[R-21 b\] --x-a-r/ }], "H9-2 rung reading: \"c paints 16\" printed (the old c); \"c painted 12px\" and \"a paints 6\" (new values) not");
    if (decl9) {
      const o7 = staticWitness("H9-2", "deleted-mechanisms", ["--root", path.join(T9, "fv7"), "--declare", decl9, "--patch", P9], "FAIL", "H9-2 plant: floor v7's tuple rows and rung reading");
      rowsHold("H9-2", "static", o7, [/exempt tests\/components\/ui\/surface\/Surface\.test\.ts:164 "10 \/ 14 \/ 16 \/ 20 \/ 22"/, '[R-21 b] --glass-blur-overlay-radius: src/styles/tokens/glass-deep.css:13 "overlay paints 22"', '[R-21 b] --glass-blur-overlay-radius: src/styles/tokens/glass-deep.css:55 "overlay painted 22"', "rung=5"],
        "H9-2: floor v7's tuple in a dated test comment is a site; \"paints 22\" (:13) and \"painted 22\" (:55) are printed for R-21 (b), whose reader rules tense");
    }
  }
  if (want("H9-3")) {
    const o = staticWitness("H9-3", "deleted-mechanisms", h9("h93-dark-file", { "src/s.css": "/* DARK: two x steps of the ink (`--x-step` 0.04, dark.css). */\n" }), "PASS", "H9-3 fixture: the old value cited with the arm file that still declares it (sheet/styles.css:197's shape)");
    rowsHold("H9-3", "static", o, ['arm-true src/s.css:1 "0.04 · x steps" (cites src/dark.css:3 (.dark) declares 0.04)', "1 arms still at an old value"], "H9-3: the arm is keyed by file, line and selector");
    staticWitness("H9-3", "deleted-mechanisms", h9("h93-dark-sel", { "src/s.css": "/* under .dark the x step stays 0.04. */\n" }), "PASS", "H9-3 fixture: the arm cited by its selector");
    staticWitness("H9-3", "deleted-mechanisms", h9("h93-root-file", { "src/s.css": "/* the x step is 0.04 (t.css). */\n" }), "FAIL", "H9-3 plant: the old value cited with the arm that changed");
    staticWitness("H9-3", "deleted-mechanisms", h9("h93-uncited", { "src/s.css": "/* the x step is 0.04. */\n" }), "FAIL", "H9-3 plant: the old value citing no arm reads as the changed one");
    if (T9 && a["h9-minor-patch"]) {
      const om = staticWitness("H9-3", "deleted-mechanisms", ["--root", path.join(T9, "minor6"), "--declare", path.join(HERE, "deletes-minor.json"), "--patch", path.resolve(a["h9-minor-patch"])], "FAIL", "H9-3 on the minor v6 under the minor v7's declaration (R-23's plant): sheet/styles.css:197 is arm-true; the rest red at R-23's sites");
      rowsHold("H9-3", "static", om, ['arm-true src/components/sheet/styles.css:197 "0.04 · glass veil steps" (cites src/styles/tokens/dark-arm.css:277 (.dark) declares 0.04)', { not: /✗ --glass-veil-step/ }, "src/styles/tokens/glass-deep.css:12", "DESIGN.md:1805", /FAIL \(8 of 54 gated rows\)/],
        "H9-3 fixture: the minor v6's sheet/styles.css:197 needs no site entry (MS6 §7); the minor v6 is R-23's plant");
    }
    if (T9 && a["h9-minor7-patch"] && fs.existsSync(path.join(T9, "minor7"))) {
      const o7 = staticWitness("H9-3", "deleted-mechanisms", ["--root", path.join(T9, "minor7"), "--declare", path.join(HERE, "deletes-minor.json"), "--patch", path.resolve(a["h9-minor7-patch"])], "PASS", "H9-3 fixture: the minor v7 over its own patch at 0 (R-23)");
      rowsHold("H9-3", "static", o7, ['arm-true src/components/sheet/styles.css:197', 'exempt src/styles/glass/overlay-plate.css:173', 'exempt src/styles/glass/deep.css:73', 'exempt tests/components/ui/surface/Surface.test.ts:164', "PASS (54 gated rows)"], "H9-3: every R-23 site exempts a hit; none is stale");
    }
  }
}
if (want("H9-5")) {
  // --engines on the plant scripts: each variant keeps its own engines, narrowed by the flag; importing a plant script
  // runs nothing (its CLI is guarded), so the variant tables are read here without a capture.
  const fv2 = await import(path.join(HERE, "..", "pass-3", "FV2-plants.mjs")), fv3 = await import(path.join(HERE, "..", "pass-4", "FV3-plants.mjs"));
  const plan = (mod, flag) => Object.fromEntries(Object.entries(mod.VARIANTS).map(([id, v]) => [id, fv2.enginesFor(v, flag).join(",")]));
  const w3 = plan(fv3, "webkit"), w2 = plan(fv2, "webkit"), all2 = plan(fv2, undefined);
  const ok = Object.values(w3).every((e) => e === "webkit") && w2["diag-held-sliderpaint"] === "" && w2["diag-held-noveil"] === "" && w2["plant-bound"] === "webkit" && all2["plant-bound"] === "chromium,webkit" && all2["diag-held-noveil"] === "chromium";
  const verdict = `FV3 --engines webkit: ${Object.keys(w3).length} variants all webkit · FV2: plant-bound ${w2["plant-bound"]}, diag-held-noveil "${w2["diag-held-noveil"]}" (not captured) · no flag: plant-bound ${all2["plant-bound"]}, diag-held-noveil ${all2["diag-held-noveil"]}`;
  results.push({ id: "H9-5", engine: "static", expect: "PLAN", exit: ok ? 0 : 1, ok, verdict, capdir: "", note: "H9-5 fixture: --engines narrows each variant; a Chromium-only diagnostic under --engines webkit is not captured", fails: [] });
  console.log(`${ok ? "ok  " : "BAD "} H9-5 static   expect PLAN · ${verdict}`);
  const r = spawnSync(process.execPath, ["--input-type=module", "-e", `import { ENGINES } from ${JSON.stringify(path.join(HERE, "lib.mjs"))}; ENGINES.splice(0, ENGINES.length, "webkit"); console.log("mutated", ENGINES);`], { encoding: "utf8" });
  const out = (r.stdout || "") + (r.stderr || ""), loud = r.status !== 0 && /TypeError/.test(r.stderr || "") && !/mutated/.test(r.stdout || "");
  results.push({ id: "H9-5", engine: "static", expect: "THROW", exit: r.status, ok: loud, verdict: (out.match(/TypeError[^\n]*/) || ["no TypeError"])[0], capdir: "", note: "H9-5 plant: pass-8 wk-plants.mjs's narrowing (ENGINES.splice) throws on the frozen array", fails: [] });
  console.log(`${loud ? "ok  " : "BAD "} H9-5 static   expect THROW exit ${r.status} · ${(out.match(/TypeError[^\n]*/) || ["no TypeError"])[0]}`);
  const gone = !fs.existsSync(path.join(HERE, "..", "pass-8", "wk-plants.mjs"));
  results.push({ id: "H9-5", engine: "static", expect: "RETIRED", exit: gone ? 0 : 1, ok: gone, verdict: gone ? "pass-8/wk-plants.mjs retired" : "pass-8/wk-plants.mjs still present", capdir: "", note: "H9-5: the wrapper that mutated ENGINES is retired (P8-5)", fails: [] });
  console.log(`${gone ? "ok  " : "BAD "} H9-5 static   expect RETIRED · ${gone ? "pass-8/wk-plants.mjs retired" : "still present"}`);
}
if (want("H9-6")) {
  const PATCH6 = "diff --git a/src/a.css b/src/a.css\n--- a/src/a.css\n+++ b/src/a.css\n@@ -1 +1 @@\n-x\n+y\n";
  const A = "/* the pill composes the bound. */\n.p { color: red; }\n/* the clamp darkens the plate over light. */\n/* a retint of the dots. */\n";
  const t6 = (name, rulings) => {
    const d = tree(name, { "p.patch": PATCH6, "src/a.css": A, "src/b.css": "/* the clamp darkens, untouched. */\n" });
    const args = ["--root", d, "--patch", path.join(d, "p.patch")];
    if (rulings) { fs.writeFileSync(path.join(d, "rulings.json"), JSON.stringify(rulings)); args.push("--rulings", path.join(d, "rulings.json")); }
    return args;
  };
  const o = staticWitness("H9-6", "prose-sweep", t6("h96-list"), "PASS", "H9-6: the printer lists every frozen-word prose line of every touched file (exit 0, LIST)");
  rowsHold("H9-6", "static", o, [/· src\/a\.css:3 \[word "darken"; word "clamp"\]|· src\/a\.css:3 \[word "clamp"; word "darken"\]/, "SWEEP lines=1 files=1", { not: "src/b.css" }, { not: "src/a.css:4" }], "H9-6: the touched file's clamp-and-darken line prints with its context; an untouched file and \"retint\" do not");
  staticWitness("H9-6", "prose-sweep", t6("h96-ruled", [{ at: "src/a.css:3", says: "the clamp darkens the plate", verdict: "true", why: "read: true of the fixture" }]), "PASS", "H9-6 fixture: every printed line ruled true");
  staticWitness("H9-6", "prose-sweep", t6("h96-unread", []), "FAIL", "H9-6 plant: a printed line no ruling covers is unread");
  staticWitness("H9-6", "prose-sweep", t6("h96-stale", [{ at: "src/a.css:3", says: "the clamp darkens the plate", verdict: "true", why: "true" }, { at: "src/a.css:1", says: "the tint seam", verdict: "true", why: "a line rewritten since" }]), "FAIL", "H9-6 plant: a ruling whose line no longer says it is stale");
  if (decl9) {
    const o7 = staticWitness("H9-6", "prose-sweep", ["--root", path.join(T9, "fv7"), "--patch", P9, "--declare", decl9], "PASS", "H9-6: R-21 (b)'s list over floor v7 (88 touched paths)");
    rowsHold("H9-6", "static", o7, ["src/styles/glass/surfaces-pager.css:29 [", "src/styles/glass/surfaces-pager.css:34 [", "src/components/dock/GlassDock.vue:467 [", "src/components/dock/styles/index.css:80 [", "src/components/dock/styles/index.css:83 [",
      "src/styles/tokens/glass-deep.css:12 [tuple", "src/styles/tokens/glass-deep.css:13 [rung", "src/styles/tokens/glass-deep.css:54 [tuple"], "H9-6: floor v7's list prints A-1's four sentences, the tuple lines and the bare \"paints 22\"");
    staticWitness("H9-6", "prose-sweep", ["--root", path.join(T9, "fv8"), "--patch", P9, "--declare", decl9], "PASS", "H9-6: R-21 (b)'s list over the floor v8 stand-in, for the floor v8 seat to read");
  }
}

// ── H10 (pass 10, REGISTRY P9-5): DEL refuses to read nothing (H10-1); a ruling's verdict, true or reported (H10-2).
// Static, run once. The real rows read the banked pass-9 records in place.
const P9D = path.join(HERE, "..", "pass-9");
const REAL = T9 && ["fv7", "fv8", "minor7", "minor7p"].every((t) => fs.existsSync(path.join(T9, t, "src")));
if (want("H10-1")) {
  const absent = path.join(ROOT, "fx", "h101-absent"); fs.rmSync(absent, { recursive: true, force: true });
  const o1 = staticWitness("H10-1", "deleted-mechanisms", ["--root", absent, "--declare", path.join(HERE, "deletes-minor.json")], "LOUD", "H10-1 plant: DEL on an absent --root (pass-9 crit-records/del-absent.log's shape: was PASS (42 gated rows), exit 0)");
  rowsHold("H10-1", "static", o1, ["0 text files in scope", "FAIL (nothing read: the tree does not exist)", { not: /gated rows/ }], "H10-1: the refusal says nothing was read, and prints no gated row");
  const empty = tree("h101-empty", { "notes/README.txt": "the clamp darkens the plate\n" });
  staticWitness("H10-1", "deleted-mechanisms", ["--root", empty, "--declare", path.join(HERE, "deletes-minor.json")], "LOUD", "H10-1 plant: a tree with no src/, demo/ or tests/ and no touched path: 0 text files in scope");
  const os = staticWitness("H10-1", "prose-sweep", ["--root", absent, "--patch", path.join(P9D, "minor-split-v7.patch"), "--declare", path.join(HERE, "deletes-minor.json")], "LOUD", "H10-1 (SWEEP): the frozen list on an absent tree refuses too (was LIST (0 lines), exit 0)");
  rowsHold("H10-1", "static", os, ["0 touched files read", "FAIL (nothing read: the tree does not exist)"], "H10-1 (SWEEP): the refusal names the absent tree");
  staticWitness("H10-1", "deleted-mechanisms", ["--root", tree("h101-one", { "src/a.css": "/* the pill composes the bound. */\n" }), "--declare", path.join(HERE, "deletes-minor.json")], "PASS", "H10-1 fixture: one text file in scope is read, and reads clean");
  if (REAL) {
    const o8 = staticWitness("H10-1", "deleted-mechanisms", ["--root", path.join(T9, "fv8"), "--declare", path.join(P9D, "FV8-records", "declare-floor-v8.json"), "--patch", path.join(P9D, "floor-v8.patch")], "PASS", "H10-1 fixture: floor v8 under its own declaration and patch, as FV8 §2 read it");
    rowsHold("H10-1", "static", o8, [/· 1089 text files in scope/, "DELETED-MECHANISMS names=73 hits=0", "PASS (101 gated rows)"], "H10-1 fixture: floor v8 reads PASS 101 over 1,089 text files, as banked (FV8-records/del-H9-fv8.log)");
    const o7 = staticWitness("H10-1", "deleted-mechanisms", ["--root", path.join(T9, "minor7"), "--declare", path.join(HERE, "deletes-minor.json"), "--patch", path.join(P9D, "minor-split-v7.patch")], "PASS", "H10-1 fixture: the minor v7 over its own patch, as MS7 read it");
    rowsHold("H10-1", "static", o7, [/· 1095 text files in scope/, "DELETED-MECHANISMS names=42 hits=0", "PASS (54 gated rows)"], "H10-1 fixture: the minor v7 reads PASS 54 over 1,095 text files, as banked (MS7-records/del-H9-minor7.log)");
  }
}
if (want("H10-2")) {
  const PATCH = "diff --git a/src/a.css b/src/a.css\n--- a/src/a.css\n+++ b/src/a.css\n@@ -1 +1 @@\n-x\n+y\n";
  const SHELL = "   * one chromatic writer, no second tint layer. The shell + legibility partials re-point the veil */\n";
  const A = "/* the pill composes the bound. */\n.p { color: red; }\n/* the clamp darkens the plate over light. */\n/*\n" + SHELL + ".q { color: blue; }\n";
  const t = (name, rulings, body = A) => {
    const d = tree(name, { "p.patch": PATCH, "src/a.css": body });
    fs.writeFileSync(path.join(d, "rulings.json"), JSON.stringify(rulings));
    return ["--root", d, "--patch", path.join(d, "p.patch"), "--rulings", path.join(d, "rulings.json")];
  };
  const TRUE3 = { at: "src/a.css:3", says: "the clamp darkens the plate", verdict: "true", why: "the fixture's clamp darkens its plate" };
  const REP5 = { at: "src/a.css:5", says: "The shell + legibility partials re-point", verdict: "reported", why: "the first clause is true; the attribution was false before the patch, which did not write it" };
  const o = staticWitness("H10-2", "prose-sweep", t("h102-fix", [TRUE3, REP5]), "PASS", "H10-2 fixture: one line ruled true, one reported: the reported line prints in its own tally and gates nothing");
  rowsHold("H10-2", "static", o, ["✓ true src/a.css:3", "◦ reported src/a.css:5", "REPORTED (not gated; a false clause the patch did not write, for the landing docs pass): 1", "  [reported] src/a.css:5", "ruled=2 true=1 reported=1 unread=0 stale=0", "PASS (2 lines: 1 ruled true, 1 reported)"],
    "H10-2: the tally separates true from reported; the verdict line never calls the reported line true");
  const changed = A.replace("The shell + legibility partials re-point", "The shell partial re-points");
  const os = staticWitness("H10-2", "prose-sweep", t("h102-stale", [TRUE3, REP5], changed), "FAIL", "H10-2 plant: a reported ruling on a line that changed (R-24 (iii)'s shape) is stale, and the changed line is unread");
  rowsHold("H10-2", "static", os, ["✗ stale reported ruling src/a.css:5", "✗ unread src/a.css:5", "FAIL (1 unread, 1 stale of 2 lines)"], "H10-2: a reported ruling goes stale like any ruling");
  const refuse = {
    "none": [[TRUE3, { ...REP5, verdict: undefined }], /ruling 1 \(src\/a\.css:5\): verdict undefined is not one of "true", "reported"/, "a ruling with no verdict (the pass-9 shape)"],
    "other": [[TRUE3, { ...REP5, verdict: "false" }], /verdict "false" is not one of/, "a ruling with a verdict other than true or reported (a false line is rewritten, not ruled)"],
    "workaround": [[TRUE3, { ...REP5, verdict: "true", why: "REPORTED, HEAD-stale (true as to the patch): the attribution" }], /verdict "true" with a `why` that reports a clause \(REPORTED\)/, "verdict true over a REPORTED why (the pass-9 workaround)"],
    "nowhy": [[TRUE3, { ...REP5, why: "" }], /ruling 1 \(src\/a\.css:5\): no `why`/, "a ruling with no why"],
  };
  for (const [k, [rs, re, note]] of Object.entries(refuse)) {
    const r = staticWitness("H10-2", "prose-sweep", t(`h102-${k}`, rs), "LOUD", "H10-2 plant: refused, " + note);
    rowsHold("H10-2", "static", r, [re, /FAIL \(rulings refused: 1 malformed of 2; nothing read\)/, { not: /✓ true/ }], "H10-2: the refusal names the entry and reads nothing");
  }
  if (REAL) {
    const D8 = path.join(P9D, "FV8-records", "declare-floor-v8.json"), FV8 = path.join(P9D, "floor-v8.patch"), MS7 = path.join(P9D, "minor-split-v7.patch"), DM = path.join(HERE, "deletes-minor.json");
    const r8 = staticWitness("H10-2", "prose-sweep", ["--root", path.join(T9, "fv8"), "--patch", FV8, "--declare", D8, "--rulings", path.join(P9D, "FV8-rulings.json")], "PASS", "H10-2 fixture: floor v8 under the migrated FV8-rulings.json");
    rowsHold("H10-2", "static", r8, ["◦ reported src/components/dock/styles/dock.css:15", "  [reported] src/components/dock/styles/dock.css:15", "ruled=214 true=213 reported=1 unread=0 stale=0", "PASS (214 lines: 213 ruled true, 1 reported)"],
      "H10-2: the floor seat's dock.css:15 reading ('true as to the patch', its clause reported in words) is verdict reported; the other 213 read true, as banked (FV8-records/sweep-fv8-ruled.log)");
    const r7 = staticWitness("H10-2", "prose-sweep", ["--root", path.join(T9, "fv7"), "--patch", FV8, "--declare", D8, "--rulings", path.join(P9D, "FV8-rulings.json")], "FAIL", "H10-2 plant: floor v7 under the migrated FV8-rulings.json, as FV8 §3 read it");
    rowsHold("H10-2", "static", r7, ["FAIL (13 unread, 3 stale of 224 lines)"], "H10-2: floor v7 reads 13 unread, 3 stale of 224, as banked (FV8-records/sweep-fv7-plant.log)");
    const m7 = staticWitness("H10-2", "prose-sweep", ["--root", path.join(T9, "minor7"), "--patch", MS7, "--declare", DM, "--rulings", path.join(P9D, "MS7-rulings.json")], "FAIL", "H10-2 plant: the minor v7 under the migrated MS7-rulings.json (R-25's plant)");
    rowsHold("H10-2", "static", m7, ["✗ unread DESIGN.md:34", "✗ unread src/styles/glass/surface-axis.css:21", "ruled=369 true=359 reported=10 unread=2 stale=0", "FAIL (2 unread, 0 stale of 371 lines)"], "H10-2: the minor v7 reads 2 unread of 371 as banked, its ten REPORTED lines now the reported tally");
    const mp = staticWitness("H10-2", "prose-sweep", ["--root", path.join(T9, "minor7p"), "--patch", MS7, "--declare", DM, "--rulings", path.join(P9D, "MS7-rulings-proposed.json")], "PASS", "H10-2 fixture: the minor v7 + MS7-r21b-proposed.diff under the migrated MS7-rulings-proposed.json");
    rowsHold("H10-2", "static", mp, ["ruled=371 true=361 reported=10 unread=0 stale=0", "PASS (371 lines: 361 ruled true, 10 reported)"], "H10-2: 371 lines read, 361 true and 10 reported, as banked (MS7-records/sweep-minor7p-ruled.log read 371 'each ruled true')");
    // The real line: floor v8's dock.css with R-24 (iii) written, read under the floor seat's dock.css rulings.
    const dock = "src/components/dock/styles/dock.css", body = fs.readFileSync(path.join(T9, "fv8", dock), "utf8");
    const rs = JSON.parse(fs.readFileSync(path.join(P9D, "FV8-rulings.json"), "utf8")).filter((x) => x.at.startsWith(dock + ":"));
    const dt = (name, text) => { const d = tree(name, { [dock]: text, "p.patch": `diff --git a/${dock} b/${dock}\n` }); fs.writeFileSync(path.join(d, "r.json"), JSON.stringify(rs)); return ["--root", d, "--patch", path.join(d, "p.patch"), "--declare", D8, "--rulings", path.join(d, "r.json")]; };
    const od = staticWitness("H10-2", "prose-sweep", dt("h102-dock", body), "PASS", "H10-2 fixture: floor v8's dock.css under its own rulings");
    rowsHold("H10-2", "static", od, ["◦ reported src/components/dock/styles/dock.css:15", "reported=1 unread=0 stale=0"], "H10-2: dock.css:15 reported on floor v8's text");
    const r24 = body.replace("The shell + adaptive-legibility partials re-point", "The shell partial re-points");
    if (r24 === body) throw new Error("H10-2: floor v8's dock.css:15 no longer carries R-24 (iii)'s words");
    const op = staticWitness("H10-2", "prose-sweep", dt("h102-dock-r24", r24), "FAIL", "H10-2 plant: R-24 (iii) written on dock.css:15: the reported ruling is stale and the rewritten line unread, for the floor v9 seat to read");
    rowsHold("H10-2", "static", op, ["✗ stale reported ruling src/components/dock/styles/dock.css:15", "✗ unread src/components/dock/styles/dock.css:15", /FAIL \(1 unread, 1 stale of \d+ lines\)/], "H10-2: the reported ruling does not outlive its line");
  }
}

if (want("W-B")) {
  const fx = writeFixture("B", { out: path.join(ROOT, "fx", "B") });
  const sel = { engines: "chromium", grounds: "aurora,aurora50", scenes: "ladder", live: true };
  witness("W-B", "wb-substrate-publishes", await cap("B", fx, sel), "PASS", [], "flat field; the dock publishes the Y it painted", ["chromium"]);
  witness("W-B", "wb-substrate-publishes", await cap("B-late", fx, { ...sel, injectCss: ":root { --fx-publish-delay: 12; }" }), "FAIL", [], "publication lands 12 frames after the step", ["chromium"]);
}
if (want("W-C")) {
  // H3-8: band [4.5, ∞) and three colour retunes (followed, refused loud, or a silent desync), both engines.
  const fx = writeFixture("C", { out: path.join(ROOT, "fx", "C"), fields: FIELDS });
  const sel = { grounds: ALLG, scenes: "ladder,dialog", retune: true };
  witness("W-C", "wc-ink-follows", await cap("C", fx, sel), "PASS", [], "RCS solve at 5.0:1 against each plate, fg read from --foreground: every retune followed");
  const frozen = `[data-spec] .fx-muted, [data-spec] .fx-muted *, [data-spec] .fx-mutedtab, [data-spec] .fx-mutedtab *, [data-spec] .fx-well::placeholder { color: #3a3a3a !important; }
html.dark [data-spec] .fx-muted, html.dark [data-spec] .fx-muted *, html.dark [data-spec] .fx-mutedtab, html.dark [data-spec] .fx-mutedtab *, html.dark [data-spec] .fx-well::placeholder { color: #b0b0b0 !important; }`;
  const rsel = { themes: "light", grounds: "paper", scenes: "ladder,dialog", retune: true };
  witness("W-C", "wc-ink-follows", await cap("C-frozen", fx, { ...rsel, injectCss: frozen }), "FAIL", cells("light paper"), "muted frozen at #3a3a3a: under --foreground oklch(0.42) the hierarchy inverts with no word (a silent desync)");
  witness("W-C", "wc-ink-follows", await cap("C-loud", fx, { ...rsel, injectCss: frozen + "\n:root { --fx-warn-retune: 1; }" }), "PASS", cells("light paper"), "the same frozen ink, but the page refuses the --foreground retune loud (console.warn naming --foreground)");
  witness("W-C", "wc-ink-follows", await cap("C-unrelated", fx, { ...rsel, injectCss: frozen + "\n:root { --fx-warn-retune: unrelated; }" }), "FAIL", cells("light paper"), "H4-4: the same frozen ink, and an unrelated console.warn in the retuned cell (names no glass token): a silent desync");
}
if (want("W-D")) {
  const mk = (name, committed) => {
    const wt = path.join(ROOT, "fx", name), tok = path.join(wt, "src", "styles", "tokens");
    fs.rmSync(wt, { recursive: true, force: true }); fs.mkdirSync(tok, { recursive: true });
    const body = "/* solver: node solve.mjs */\n:root { --glass-veil-floating: 0.760; --glass-veil-overlay: 0.880; }\n";
    fs.writeFileSync(path.join(wt, "solve.mjs"), `import fs from "node:fs";\nfs.writeFileSync(process.env.D3_SOLVE_OUT, ${JSON.stringify(body)});\n`);
    fs.writeFileSync(path.join(tok, "glass.solved.css"), committed ?? body);
    return wt;
  };
  const gc = greenCap || path.join(ROOT, "caps", "green");
  witness("W-D", "wd-solved-tokens", gc, "PASS", ["--worktree", mk("D-wt"), "--battery", gc], "solver reproduces the file; battery green in both engines", ["chromium"]);
  witness("W-D", "wd-solved-tokens", gc, "FAIL", ["--worktree", mk("D-wt-hand", "/* solver: node solve.mjs */\n:root { --glass-veil-floating: 0.700; --glass-veil-overlay: 0.880; }\n"), "--battery", gc], "a hand edit to the solved file", ["chromium"]);
}
if (want("W-E")) {
  const fx = writeFixture("E", { out: path.join(ROOT, "fx", "E"), fields: FIELDS });
  const sel = { engines: "chromium", grounds: "black,white,checker,aurora,aurora50", scenes: "ladder,dialog" };
  witness("W-E", "we-ink-ground", await cap("E", fx, sel), "PASS", [], "α 0.20 frost; 6 px card stroke; two-tone indicators", ["chromium"]);
  witness("W-E", "we-ink-ground", await cap("E-bare", fx, { ...sel, injectCss: "[data-spec] [data-ink] { -webkit-text-stroke-width: 0 !important; }" }), "FAIL", [], "the glyph stroke removed", ["chromium"]);
}
if (want("W-F")) {
  const fx = writeFixture("F", { out: path.join(ROOT, "fx", "F"), fields: FIELDS });
  const sel = { engines: "chromium", grounds: "aurora,aurora50", scenes: "ladder,empty" };
  witness("W-F", "wf-field-yields", await cap("F", fx, sel), "PASS", [], "the pole at 82% under each rect, nothing outside", ["chromium"]);
  witness("W-F", "wf-field-yields", await cap("F-spill", fx, { ...sel, injectCss: ":root { --fx-well-spill: 30px; }" }), "FAIL", [], "the well spills 30 px past each rect", ["chromium"]);
}

const prev = fs.existsSync(path.join(ROOT, "summary.json")) ? JSON.parse(fs.readFileSync(path.join(ROOT, "summary.json"), "utf8")) : [];
const key = (r) => `${r.id}|${r.engine}|${r.expect}|${r.note}`;
const merged = [...prev.filter((p) => !results.some((r) => key(r) === key(p))), ...results];
fs.writeFileSync(path.join(ROOT, "summary.json"), JSON.stringify(merged, null, 1));
const bad = results.filter((r) => !r.ok);
console.log(bad.length ? `SELFTEST FAIL: ${bad.length} of ${results.length} expectations missed` : `SELFTEST PASS: ${results.length} expectations met`);
process.exitCode = bad.length ? 1 : 0;

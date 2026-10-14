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
// M-6 reads every variant (H4-3), W-C's loud arm counts only messages naming a glass token (H4-4). The four pass-1 family witnesses that H2 left alone (W-B, W-C, W-E, W-F) and
// W-D keep their pass-1 Chromium test. A planted capture holds only the cells its plant touches, and its witness run
// is restricted to them with --cells (the fixture PASS runs read every cell unrestricted).
//   node selftest.mjs [--fields <HEAD capdir>] [--only M-1,W-B] [--skip-capture] [--reuse-green]
// --reuse-green: keep an existing green capture (the plants are captured fresh).
// --fields: a HEAD run's capture (its Chromium empty-scene aurora frames become the fixtures' field pixels).
import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { OUT, HERE, RETUNES, FIELD_CLAIM_SCENES, cli, list, lin } from "./lib.mjs";
import { writeFixture, writeStoryFixture } from "./fixtures.mjs";
import { capture } from "./capture.mjs";

const a = cli({ fields: { type: "string" }, only: { type: "string" }, "skip-capture": { type: "boolean" }, "reuse-green": { type: "boolean" } });
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

const ALLG = "paper,aurora,aurora50,black,white,checker,stripes";
const HELD = { grounds: "black,white,aurora", scenes: "held,ladder" };   // M-2h's halo leg reads the resting dock in the ladder

// ── the green battery fixture: RAW, M-1..M-9 and M-2m PASS, gated in each engine ──────────────────────────────
const green = writeFixture("green", { out: path.join(ROOT, "fx", "green"), fields: FIELDS });
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
if (M.some(([id]) => want(id)) || want("W-D")) {
  // The windows are captured only when a wanted check reads them (M-5 and W-A's leg 1 the live windows, M-2m the motion
  // and drift windows, W-D the whole battery); the retune variants ride the green capture for M-6 (H4-3).
  const win = (...ids) => ids.some(want) || want("W-D");
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

// ── the pass-1 family witnesses H2 left alone (Chromium, as pass 1 ran them) ──────────────────────────────────
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

#!/usr/bin/env node
// selftest.mjs · proves every witness can go GREEN and can go RED. For each of M-1..M-8 and W-A..W-F: capture a
// hand-made fixture built to satisfy it (fixtures.mjs) and expect exit 0, then capture the same fixture with one
// planted violation and expect exit 1. The violation targets the witness's own invariant, and the FAIL rows it
// prints are kept in the summary so a reader can see the witness failed for that reason and no other.
//   node selftest.mjs [--fields <HEAD capdir>] [--only M-1,W-B] [--skip-capture]
// --fields: the HEAD run's capture (its Chromium empty-scene aurora frames become the fixtures' field pixels).
import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { OUT, HERE, RETUNE_CSS, cli, list, lin } from "./lib.mjs";
import { writeFixture } from "./fixtures.mjs";
import { capture } from "./capture.mjs";

const a = cli({ fields: { type: "string" }, only: { type: "string" }, "skip-capture": { type: "boolean" } });
const FIELDS = path.resolve(a.fields || path.join(OUT, "caps", "head"));
const ROOT = path.join(OUT, "selftest");
const only = list(a.only, null);
const want = (id) => !only || only.includes(id);
const results = [];
fs.mkdirSync(ROOT, { recursive: true });

const FAST = { waitField: 900, waitFlat: 600, quiet: true };
async function cap(name, fixtureDir, opts) {
  const out = path.join(ROOT, "caps", name);
  if (!a["skip-capture"]) {
    fs.rmSync(out, { recursive: true, force: true });
    let inject = opts.injectCss;
    if (inject != null) { const f = path.join(ROOT, `${name}.inject.css`); fs.writeFileSync(f, inject); inject = f; }
    await capture(fixtureDir, { ...FAST, ...opts, out, inject, label: name });
    if (opts.retune) {
      const f = path.join(ROOT, `${name}.retune.css`); fs.writeFileSync(f, RETUNE_CSS + "\n" + (opts.injectCss || ""));
      await capture(fixtureDir, { ...FAST, engines: opts.engines, out, grounds: "paper", scenes: "ladder,dialog", variant: "retune", inject: f, label: name });
    }
  }
  return out;
}
function witness(id, script, capdir, expect, extra = [], note = "") {
  const r = spawnSync(process.execPath, [path.join(HERE, `${script}.mjs`), capdir, ...extra], { encoding: "utf8", maxBuffer: 64 << 20 });
  const out = (r.stdout || "") + (r.stderr || "");
  const verdict = out.trim().split("\n").pop();
  const fails = out.split("\n").filter((l) => l.includes("✗")).slice(0, 4).map((l) => l.trim());
  const ok = expect === "PASS" ? r.status === 0 : r.status === 1;
  results.push({ id, expect, exit: r.status, ok, verdict, capdir, note, fails });
  fs.writeFileSync(path.join(capdir, `selftest-${id}-${expect}.log`), out);
  console.log(`${ok ? "ok  " : "BAD "} ${id.padEnd(4)} expect ${expect.padEnd(4)} exit ${r.status} · ${verdict}${note ? " · " + note : ""}`);
  if (expect === "FAIL") for (const l of fails) console.log("        " + l.slice(0, 200));
  return out;
}

const ALLG = "paper,aurora,aurora50,black,white,checker,stripes";

// ── the green battery fixture: M-1..M-8 PASS in both engines ────────────────────────────────────────────────
const green = writeFixture("green", { out: path.join(ROOT, "fx", "green"), fields: FIELDS });
const M = [
  ["M-1", "m1-no-grey", { themes: "light", grounds: "paper", scenes: "ladder,dialog" }, `html:not(.dark) [data-spec="floating"] { background: #d7d4ce !important; }`, "floating painted HEAD's grey composite #d7d4ce"],
  ["M-2", "m2-text-contrast", { grounds: ALLG, scenes: "ladder,dialog" }, `.fx-muted, .fx-muted * { color: #a39a91 !important; } html.dark .fx-muted, html.dark .fx-muted * { color: #6e665e !important; }`, "muted ink moved toward the plate"],
  ["M-3", "m3-non-text", { grounds: ALLG, scenes: "ladder,dialog" }, `.fx-well { border-color: #d9d3cc !important; } html.dark .fx-well { border-color: #4a423b !important; }`, "well perimeter faded to 1.3-1.6:1"],
  ["M-4", "m4-dock-register", { grounds: ALLG, scenes: "ladder" }, `[data-spec="dock"] .fx-muted, [data-spec="dock"] .fx-muted * { color: #000 !important; } html.dark [data-spec="dock"] .fx-muted, html.dark [data-spec="dock"] .fx-muted * { color: #fff !important; }`, "dock muted ink pinned to the pole (#000 / #fff)"],
  ["M-5", "m5-live-dock", { grounds: "aurora,aurora50", scenes: "ladder", live: true, liveMs: 3000 }, `:root { --fx-readback: 1; }`, "the page reads back a canvas every frame"],
  ["M-6", "m6-separable-ladder", { grounds: "paper", scenes: "ladder,dialog" }, `html.dark [data-spec] { background: #0e0b09 !important; }`, "every dark plate painted HEAD's page-coloured composite"],
  ["M-7", "m7-halos-whole", { grounds: "paper", scenes: "halo" }, `[data-halo-host] { contain: paint; }`, "contain: paint on the content hosts (O-61)"],
  ["M-8", "m8-chrome-calm", { grounds: "stripes", scenes: "ladder,dialog" }, `[data-spec="floating"], [data-spec="dialog"] { background: rgb(255 255 255 / 0.2) !important; }`, "floating and the Dialog at a thin white veil"],
];
let greenCap = null;
if (M.some(([id]) => want(id)) || want("W-D")) {
  // The full green capture when W-D (which re-runs the whole battery on it) or every M witness is wanted; otherwise
  // only the grounds and scenes the chosen witnesses read (the empty scene rides along only when a field is wanted).
  const chosen = M.filter(([id]) => want(id)).map(([, , sel]) => sel);
  const full = want("W-D") || chosen.length === M.length;
  const union = (k) => [...new Set(chosen.flatMap((s) => String(s[k] || "").split(",").filter(Boolean)))].join(",");
  const gsel = full ? { grounds: ALLG, live: true, liveMs: 3000 }
    : { grounds: union("grounds"), scenes: union("scenes"), live: chosen.some((s) => s.live), liveMs: 3000 };
  greenCap = await cap("green", green, { engines: "chromium,webkit", ...gsel });
  for (const [id, script] of M) if (want(id)) witness(id, script, greenCap, "PASS", [], "green fixture, Chromium gate; Playwright WebKit informational");
  for (const [id, script, sel, css, note] of M) if (want(id)) {
    const c = await cap(`green-${id}`, green, { engines: "chromium", ...sel, injectCss: css });
    witness(id, script, c, "FAIL", [], note);
  }
}

// ── W-A: the card pole at the bound's α, calibrated against the witness's own bound ─────────────────────────────
const fakeSrc = (name, body) => { const wt = path.join(ROOT, "fx", name); fs.rmSync(wt, { recursive: true, force: true }); fs.mkdirSync(path.join(wt, "src"), { recursive: true }); fs.writeFileSync(path.join(wt, "src", "surface.ts"), body); return wt; };
if (want("W-A")) {
  const sel = { engines: "chromium", grounds: "paper,aurora,aurora50,black,white", scenes: "ladder,dialog" };
  const clean = fakeSrc("A-src-clean", "export const surface = (el: HTMLElement) => el.classList.add(\"glass-floating\");\n");
  const probe = await cap("A-probe", writeFixture("A", { out: path.join(ROOT, "fx", "A-probe"), fields: FIELDS }), sel);
  const out = witness("W-A", "wa-no-signal", probe, "FAIL", ["--worktree", clean], "calibration probe at α 0.90 (reads the bound)");
  const alphas = { light: {}, dark: {} };
  for (const line of out.split("\n").filter((l) => /^\s*α chromium (light|dark) /.test(l))) {
    const theme = line.includes(" dark ") ? "dark" : "light";
    for (const m of line.matchAll(/(\S+) α [\d.]+ pole \S+ bound ([\d.]+|none)/g)) alphas[theme][m[1]] = Math.max(alphas[theme][m[1]] ?? 0, m[2] === "none" ? 1 : Math.min(1, +m[2] + 0.012));
  }
  fs.writeFileSync(path.join(ROOT, "A-alphas.json"), JSON.stringify(alphas, null, 1));
  console.log(`     W-A calibrated α: ${JSON.stringify(alphas)}`);
  const good = await cap("A", writeFixture("A", { out: path.join(ROOT, "fx", "A"), fields: FIELDS, alphas }), sel);
  witness("W-A", "wa-no-signal", good, "PASS", ["--worktree", clean], "card pole at bound + 0.012; no luma writer in src");
  const writer = fakeSrc("A-src-writer", "export const surface = (el: HTMLElement, y: number) => el.style.setProperty(\"--glass-backdrop-luma\", String(y));\n");
  witness("W-A", "wa-no-signal", good, "FAIL", ["--worktree", writer], "a --glass-backdrop-luma writer planted in src");
  const thin = JSON.parse(JSON.stringify(alphas)); thin.light.floating -= 0.1; thin.dark.floating -= 0.1;
  const bad = await cap("A-thin", writeFixture("A", { out: path.join(ROOT, "fx", "A-thin"), fields: FIELDS, alphas: thin }), sel);
  witness("W-A", "wa-no-signal", bad, "FAIL", ["--worktree", clean], "floating α 0.10 under its bound");
}

// ── W-B: the page publishes the luma it painted, the frame the field changes ──────────────────────────────────
if (want("W-B")) {
  const fx = writeFixture("B", { out: path.join(ROOT, "fx", "B") });
  const sel = { engines: "chromium", grounds: "aurora,aurora50", scenes: "ladder", live: true, liveMs: 3000 };
  witness("W-B", "wb-substrate-publishes", await cap("B", fx, sel), "PASS", [], "flat field; the dock publishes the Y it painted");
  witness("W-B", "wb-substrate-publishes", await cap("B-late", fx, { ...sel, injectCss: ":root { --fx-publish-delay: 12; }" }), "FAIL", [], "publication lands 12 frames after the step");
}

// ── W-C: the muted ink is a relative-colour solve against the plate; it follows a consumer retune ────────────
if (want("W-C")) {
  const fx = writeFixture("C", { out: path.join(ROOT, "fx", "C"), fields: FIELDS });
  const sel = { engines: "chromium", grounds: ALLG, scenes: "ladder,dialog", retune: true };
  witness("W-C", "wc-ink-follows", await cap("C", fx, sel), "PASS", [], "RCS solve at 5.0:1 against each plate");
  // The planted violation: the ink frozen at the solve for the default card (a static token), per theme.
  const Yc = (hexs) => { const v = [1, 3, 5].map((i) => parseInt(hexs.slice(i, i + 2), 16)); return 0.2126 * lin(v[0]) + 0.7152 * lin(v[1]) + 0.0722 * lin(v[2]); };
  const grey = (Yt) => { const e = Yt <= 0.0031308 ? 12.92 * Yt : 1.055 * Yt ** (1 / 2.4) - 0.055; const h = Math.round(e * 255).toString(16).padStart(2, "0"); return "#" + h + h + h; };
  const lightInk = grey((Yc("#fdf5ec") + 0.05) / 5 - 0.05), darkInk = grey(5 * (Yc("#352a22") + 0.05) - 0.05);
  const css = `[data-spec] .fx-muted, [data-spec] .fx-muted *, [data-spec] .fx-well::placeholder { color: ${lightInk} !important; }
html.dark [data-spec] .fx-muted, html.dark [data-spec] .fx-muted *, html.dark [data-spec] .fx-well::placeholder { color: ${darkInk} !important; }`;
  witness("W-C", "wc-ink-follows", await cap("C-static", fx, { ...sel, injectCss: css }), "FAIL", [], `muted frozen at the default-card solve (${lightInk} / ${darkInk})`);
}

// ── W-D: a fixture worktree whose solved token file its named solver reproduces; battery = the green capture ──
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
  witness("W-D", "wd-solved-tokens", gc, "PASS", ["--worktree", mk("D-wt"), "--battery", gc], "solver reproduces the file; battery green in both engines");
  witness("W-D", "wd-solved-tokens", gc, "FAIL", ["--worktree", mk("D-wt-hand", "/* solver: node solve.mjs */\n:root { --glass-veil-floating: 0.700; --glass-veil-overlay: 0.880; }\n"), "--battery", gc], "a hand edit to the solved file");
}

// ── W-E: a thin frost with a card stroke under every glyph and a card band around every indicator ────────────
if (want("W-E")) {
  const fx = writeFixture("E", { out: path.join(ROOT, "fx", "E"), fields: FIELDS });
  const sel = { engines: "chromium", grounds: "black,white,checker,aurora,aurora50", scenes: "ladder,dialog" };
  witness("W-E", "we-ink-ground", await cap("E", fx, sel), "PASS", [], "α 0.20 frost; 6 px card stroke; two-tone indicators");
  witness("W-E", "we-ink-ground", await cap("E-bare", fx, { ...sel, injectCss: "[data-spec] [data-ink] { -webkit-text-stroke-width: 0 !important; }" }), "FAIL", [], "the glyph stroke removed");
}

// ── W-F: the field layer carves a well under each surface rect ─────────────────────────────────────────────────
if (want("W-F")) {
  const fx = writeFixture("F", { out: path.join(ROOT, "fx", "F"), fields: FIELDS });
  const sel = { engines: "chromium", grounds: "aurora,aurora50", scenes: "ladder,empty" };
  witness("W-F", "wf-field-yields", await cap("F", fx, sel), "PASS", [], "the pole at 82% under each rect, nothing outside");
  witness("W-F", "wf-field-yields", await cap("F-spill", fx, { ...sel, injectCss: ":root { --fx-well-spill: 30px; }" }), "FAIL", [], "the well spills 30 px past each rect");
}

const prev = fs.existsSync(path.join(ROOT, "summary.json")) ? JSON.parse(fs.readFileSync(path.join(ROOT, "summary.json"), "utf8")) : [];
const key = (r) => `${r.id}|${r.expect}|${r.note}`;
const merged = [...prev.filter((p) => !results.some((r) => key(r) === key(p))), ...results];
fs.writeFileSync(path.join(ROOT, "summary.json"), JSON.stringify(merged, null, 1));
const bad = results.filter((r) => !r.ok);
console.log(bad.length ? `SELFTEST FAIL: ${bad.length} of ${results.length} expectations missed` : `SELFTEST PASS: ${results.length} expectations met`);
process.exitCode = bad.length ? 1 : 0;

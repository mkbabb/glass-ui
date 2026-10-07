#!/usr/bin/env node
// D3-G-gate-probe.mjs · REGISTRY §6 D3-G questions 1 (isolation census) and 2 (light under M-1), on a specimen build
// of HEAD + material floor.patch (harness/build.mjs). Writes JSON records; D3-G-gate.md reads them.
//
//   node D3-G-gate-probe.mjs <specimen dist> <records dir> <arm> [--engines chromium,webkit] [--png <dir>] [--tag x]
//   arms: census  every element with a backdrop-filter (and every [data-spec]) in the specimen scenes: its own
//                 stacking-context causes, every stacking-context ancestor up to <html>, and which of those do NOT
//                 contain the field (an isolated group between plate and field)
//         lib     the real library surfaces in the ladder scene: raw, A′ as built, G (pole as a sibling over a
//                 backdrop-filter sibling: content rungs and the popover get a blur child + a pole child, the dock
//                 gets a pole as the next sibling of .dock-plate), and the plant P-noblur (pole with no blur sibling)
//         tiles   an 10×8 grid of tiles over the bare field (empty scene; aurora, aurora50, red, paper, root-red):
//                 raw, A′ wash and resting tiles, and G in five placements (open, isolation, transform, fixed+z,
//                 pole as a child of the backdrop-filter element) plus three plants (no blur open, no blur isolated,
//                 pole mix-blend normal). Light runs three poles (L 0.975 neutral, the --card pole, L 0.99 neutral)
//         video   Playwright WebKit only: the tile variants recorded to video (its screencast paints backdrop-filter,
//                 page.screenshot() does not), frames decoded with ffmpeg
// Pixels only: every colour comes from a screenshot or a decoded video frame. No canvas context is requested.
import fs from "node:fs";
import path from "node:path";
import os from "node:os";
import { execFileSync } from "node:child_process";
import { PNG, playwright, serve, oklab, lch, gamutMaxC, hueDiff, hex, VIEW, CHROMIUM_ARGS, WEBKIT_SHIM, cli, list } from "../harness/lib.mjs";

const a = cli({ engines: { type: "string" }, png: { type: "string" }, tag: { type: "string" } });
const [dist, recDir, arm] = a._;
if (!dist || !recDir || !arm) { console.error("usage: node D3-G-gate-probe.mjs <dist> <records> census|lib|tiles|video|extra"); process.exit(2); }
fs.mkdirSync(recDir, { recursive: true });
const pngDir = a.png || null; if (pngDir) fs.mkdirSync(pngDir, { recursive: true });
const engines = list(a.engines, ["chromium"]);
const load = () => +os.loadavg()[0].toFixed(1);
const pw = await playwright();
const server = await serve(path.resolve(dist));

// Poles. Light: OKLab L 0.975 and 0.99 neutral, and FL-3's --card (#fef7f1, L 0.980). Dark: FL-3's dark --card (#352a22).
const POLES = { light: { "n975": "oklch(0.975 0 0)", card: "#fef7f1", "n990": "oklch(0.99 0 0)" }, dark: { dcard: "#352a22" } };

// ── stacking-context causes (Compositing 1: an element that establishes a stacking context is an isolated group) ──
const CAUSES = `(el) => {
  if (el === document.documentElement) return ["root"];
  const cs = getComputedStyle(el), p = el.parentElement, pcs = p ? getComputedStyle(p) : null, out = [];
  if (cs.display === "contents") return out;
  const pos = cs.position, z = cs.zIndex;
  if (pos === "fixed" || pos === "sticky") out.push("position:" + pos);
  if (z !== "auto" && (pos !== "static" || (pcs && /flex|grid/.test(pcs.display)))) out.push("z-index:" + z);
  if (parseFloat(cs.opacity) < 1) out.push("opacity:" + cs.opacity);
  for (const k of ["transform", "translate", "rotate", "scale", "filter", "backdropFilter", "clipPath", "perspective", "maskImage"]) {
    const v = cs[k]; if (v && v !== "none") out.push(k + ":" + String(v).slice(0, 48)); }
  if (cs.mixBlendMode !== "normal") out.push("mix-blend-mode:" + cs.mixBlendMode);
  if (cs.isolation === "isolate") out.push("isolation:isolate");
  if (/transform|opacity|filter|backdrop|clip|mask|perspective|isolation|mix-blend|z-index|translate|rotate|scale/.test(cs.willChange)) out.push("will-change:" + cs.willChange);
  if (/layout|paint|strict|content/.test(cs.contain)) out.push("contain:" + cs.contain);
  if (cs.containerType && cs.containerType !== "normal") out.push("container-type:" + cs.containerType);
  if (cs.viewTransitionName && cs.viewTransitionName !== "none") out.push("view-transition-name");
  try { if (el.matches(":modal")) out.push("top-layer:modal"); } catch {}
  try { if (el.matches(":popover-open")) out.push("top-layer:popover"); } catch {}
  return out;
}`;
const NAME = `(el) => { const c = typeof el.className === "string" ? el.className.trim().split(/\\s+/).filter((x) => x && !x.startsWith("hx-")).slice(0, 4).join(".") : "";
  const ds = el.getAttribute("data-slot"), sp = el.getAttribute("data-spec");
  return el.tagName.toLowerCase() + (c ? "." + c : "") + (ds ? "[slot=" + ds + "]" : "") + (sp ? "[spec=" + sp + "]" : ""); }`;
const CENSUS = `(() => { const causes = ${CAUSES}, name = ${NAME};
  const field = document.querySelector(".hx-stand") || [...document.querySelectorAll("body *")].find((e) => /aurora/i.test(String(e.className)) && getComputedStyle(e).position === "fixed") || null;
  const app = document.getElementById("app");
  const els = [...document.querySelectorAll("body *")].filter((e) => getComputedStyle(e).backdropFilter !== "none" || e.hasAttribute("data-spec") || e.classList.contains("dock-plate"));
  return { field: field ? name(field) : "root background", rows: els.map((el) => {
    const r = el.getBoundingClientRect();
    const chain = []; for (let p = el.parentElement; p; p = p.parentElement) { const c = causes(p); if (c.length) chain.push({ el: name(p), causes: c, holdsField: field ? p.contains(field) : true }); }
    const between = chain.filter((c) => !c.holdsField && c.causes[0] !== "root");
    return { el: name(el), own: causes(el), bf: getComputedStyle(el).backdropFilter, portal: !app.contains(el), rect: [r.left, r.top, r.width, r.height].map(Math.round),
      visible: r.width > 0 && r.height > 0, chain, between: between.map((c) => c.el + " {" + c.causes.join(", ") + "}") };
  }) }; })()`;

const PNGread = (buf) => PNG.sync.read(buf);
const meanRect = (png, [x, y, w, h]) => { const s = [0, 0, 0]; let n = 0;
  for (let j = Math.round(y); j < Math.round(y + h); j++) for (let i = Math.round(x); i < Math.round(x + w); i++) {
    if (i < 0 || j < 0 || i >= png.width || j >= png.height) continue; const k = (png.width * j + i) * 4; s[0] += png.data[k]; s[1] += png.data[k + 1]; s[2] += png.data[k + 2]; n++; }
  return s.map((v) => v / Math.max(1, n)); };
const desc = (rgb, raw) => { const [L, C, h] = lch(rgb), [Lr, Cr, hr] = raw ? lch(raw) : [];
  return { hex: hex(rgb), L: +L.toFixed(4), C: +C.toFixed(4), h: +h.toFixed(1), Cmax: +gamutMaxC(L, h).toFixed(4),
    ...(raw ? { rawHex: hex(raw), rawL: +Lr.toFixed(4), rawC: +Cr.toFixed(4), rawH: +hr.toFixed(1), dh: Cr > 0.02 && C > 0.004 ? +hueDiff(h, hr).toFixed(1) : null } : {}) }; };

async function open(browser, engine, theme, scene, ground, extra = {}) {
  const ctx = await browser.newContext({ viewport: VIEW, deviceScaleFactor: 1, colorScheme: theme, reducedMotion: "reduce", ...extra });
  // H-14: the harness's own shim injection (capture.mjs shimScript), applied before any script runs
  if (engine === "webkit") await ctx.addInitScript(`(() => { const add = () => { if (document.getElementById("hx-wk-shim")) return; const s = document.createElement("style"); s.id = "hx-wk-shim"; s.textContent = ${JSON.stringify(WEBKIT_SHIM)}; (document.head || document.documentElement).appendChild(s); };
  if (document.documentElement) add(); document.addEventListener("readystatechange", add); })();`);
  const page = await ctx.newPage(); const errs = []; page.on("pageerror", (e) => errs.push(String(e).slice(0, 160)));
  await page.goto(`${server.url}index.html?scene=${scene}&ground=${ground}&theme=${theme}`, { waitUntil: "load", timeout: 180000 });
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(/aurora/.test(ground) ? 4000 : 1200);
  await page.mouse.move(VIEW.width - 1, VIEW.height - 1);
  return { ctx, page, errs };
}
// 120 s: at load 290+ a Playwright WebKit screenshot exceeded the 30 s default (gate run 2026-10-07, extra popover leg)
const shot = async (page, name) => { const buf = await page.screenshot({ type: "png", timeout: 120000 }); if (pngDir) fs.writeFileSync(path.join(pngDir, name + ".png"), buf); return PNGread(buf); };

// ── arm: census ──
async function census() {
  const out = [];
  for (const engine of engines) { const browser = await pw[engine].launch({ headless: true, args: engine === "chromium" ? CHROMIUM_ARGS : [] });
    for (const theme of ["light", "dark"]) for (const [scene, ground] of [["ladder", "aurora"], ["dialog", "aurora"], ["held", "aurora"], ["state", "aurora"], ["hostile", "aurora"], ["halo", "paper"]]) {
      let o; try { o = await open(browser, engine, theme, scene, ground); } catch (e) { out.push({ engine, theme, scene, ground, load: load(), crashed: String(e).split("\n")[0] }); console.log(`census ${engine} ${theme} ${scene}: CRASH`); continue; }
      const { ctx, page, errs } = o;
      if (scene === "held") { const at = await page.evaluate(() => { const r = document.querySelector("[data-press]")?.getBoundingClientRect(); return r ? [r.left + r.width / 2, r.top + r.height / 2] : null; });
        if (at) { await page.mouse.move(...at); await page.mouse.down(); await page.waitForTimeout(700); } }
      const c = await page.evaluate(CENSUS);
      out.push({ engine, theme, scene, ground, load: load(), errs, ...c });
      console.log(`census ${engine} ${theme} ${scene}: ${c.rows.length} rows, load ${load()}`);
      await ctx.close(); }
    await browser.close(); }
  fs.writeFileSync(path.join(recDir, `census${a.tag ? "-" + a.tag : ""}.json`), JSON.stringify(out, null, 1));
}

// ── arm: lib (real library surfaces, ladder scene) ──
const LIB_APPLY = `(([mode, pole]) => {
  document.querySelectorAll(".gx").forEach((e) => e.remove());
  document.querySelectorAll("[data-gx]").forEach((e) => { e.style.removeProperty("background"); e.style.removeProperty("backdrop-filter"); e.style.removeProperty("-webkit-backdrop-filter"); e.style.removeProperty("box-shadow"); e.removeAttribute("data-gx"); });
  document.documentElement.toggleAttribute("data-gx-raw", mode === "raw");
  if (mode === "raw" || mode === "A") return [];
  const mk = (cls, css) => { const d = document.createElement("div"); d.className = "gx " + cls; d.style.cssText = css; return d; };
  const base = "position:absolute;inset:0;border-radius:inherit;pointer-events:none;";
  const done = [];
  for (const el of document.querySelectorAll("[data-spec]")) {
    const id = el.getAttribute("data-spec");
    if (id === "dock") { const plate = el.querySelector(".dock-plate"); if (!plate) continue;
      const bf = getComputedStyle(plate).backdropFilter; plate.setAttribute("data-gx", "");
      plate.style.setProperty("background", "transparent", "important"); plate.style.setProperty("box-shadow", "none", "important");
      if (mode === "Pnoblur") plate.style.setProperty("backdrop-filter", "none", "important");
      plate.after(mk("gx-pole", base + "z-index:-1;background:" + pole + ";mix-blend-mode:" + (mode === "Pnormal" ? "normal" : "luminosity")));
      done.push({ id, bf, placement: "pole = next sibling of .dock-plate (z-index -1)" }); continue; }
    if (id === "opaque" || id === "dialog-rung") continue;
    const host = el; const bf = getComputedStyle(host).backdropFilter; host.setAttribute("data-gx", "");
    host.style.setProperty("background", "transparent", "important"); host.style.setProperty("backdrop-filter", "none", "important"); host.style.setProperty("-webkit-backdrop-filter", "none", "important"); host.style.setProperty("box-shadow", "none", "important");
    const pl = mk("gx-pole", base + "background:" + pole + ";mix-blend-mode:" + (mode === "Pnormal" ? "normal" : "luminosity"));
    if (mode !== "Pnoblur") host.prepend(mk("gx-blur", base + "backdrop-filter:" + bf + ";-webkit-backdrop-filter:" + bf));
    (host.querySelector(".gx-blur") || null) ? host.querySelector(".gx-blur").after(pl) : host.prepend(pl);
    done.push({ id, bf, placement: "blur child + pole child (siblings) inside the surface" });
  }
  return done; })`;
const LIB_CSS = `html[data-gx-raw] [data-spec], html[data-gx-raw] [data-spec] *, html[data-gx-raw] [data-raw-hide] { visibility: hidden !important; }`;
async function lib() {
  const out = [];
  for (const engine of engines) { const browser = await pw[engine].launch({ headless: true, args: engine === "chromium" ? CHROMIUM_ARGS : [] });
    for (const theme of ["light", "dark"]) for (const ground of ["aurora", "aurora50", "red"]) {
      const { ctx, page, errs } = await open(browser, engine, theme, "ladder", ground);
      await page.addStyleTag({ content: LIB_CSS });
      const pole = theme === "light" ? POLES.light.card : POLES.dark.dcard;
      const samples = await page.evaluate(() => [...document.querySelectorAll("[data-spec]")].map((s) => { const d = s.querySelector("[data-sample]"); const r = (d || s).getBoundingClientRect();
        return { id: s.getAttribute("data-spec"), rect: [r.left + 4, r.top + 4, r.width - 8, r.height - 8] }; }));
      const caps = {};
      for (const mode of ["raw", "A", "G", "Pnoblur", "Pnormal", "raw2"]) {
        const applied = await page.evaluate(`${LIB_APPLY}(${JSON.stringify([mode === "raw2" ? "raw" : mode, pole])})`);
        await page.waitForTimeout(350);
        const png = await shot(page, `lib-${engine}-${theme}-${ground}-${mode}`);
        caps[mode] = { applied, means: Object.fromEntries(samples.map((s) => [s.id, meanRect(png, s.rect)])) };
      }
      const rows = samples.map((s) => { const raw = caps.raw.means[s.id];
        return { id: s.id, rawDrift: +Math.hypot(...oklab(raw).map((v, i) => v - oklab(caps.raw2.means[s.id])[i])).toFixed(4),
          raw: desc(raw), A: desc(caps.A.means[s.id], raw), G: desc(caps.G.means[s.id], raw), Pnoblur: desc(caps.Pnoblur.means[s.id], raw), Pnormal: desc(caps.Pnormal.means[s.id], raw) }; });
      out.push({ engine, theme, ground, pole, load: load(), errs, applied: caps.G.applied, rows });
      console.log(`lib ${engine} ${theme} ${ground}: load ${load()}`);
      await ctx.close(); }
    await browser.close(); }
  fs.writeFileSync(path.join(recDir, `lib${a.tag ? "-" + a.tag : ""}.json`), JSON.stringify(out, null, 1));
}

// ── arm: tiles (bare field, empty scene) ──
const COLS = 10, ROWS = 8, TW = 96, TH = 72, SX = 128, SY = 112, OX = 16, OY = 16;
const TILE_RECTS = []; for (let j = 0; j < ROWS; j++) for (let i = 0; i < COLS; i++) TILE_RECTS.push([OX + i * SX, OY + j * SY, TW, TH]);
const SAMPLE = ([x, y, w, h]) => [x + 22, y + 18, w - 44, h - 36];
const VARIANTS = ["raw", "A-wash", "A-resting", "G-open", "G-iso", "G-xf", "G-fixedz", "G-child", "P-open-noblur", "P-iso-noblur", "P-normal", "raw2"];
const TILE_APPLY = `(([v, pole, rects, bf]) => {
  document.querySelectorAll(".gt").forEach((e) => e.remove());
  if (v === "raw" || v === "raw2") return null;
  const base = "position:absolute;inset:0;border-radius:inherit;pointer-events:none;";
  for (const [x, y, w, h] of rects) {
    const t = document.createElement("div"); t.className = "gt";
    t.style.cssText = "position:absolute;left:" + x + "px;top:" + y + "px;width:" + w + "px;height:" + h + "px;border-radius:16px;";
    if (v === "A-wash" || v === "A-resting") { t.classList.add(v === "A-wash" ? "glass-wash" : "glass-resting"); t.style.position = "absolute"; document.body.append(t); continue; }
    if (v === "G-iso" || v === "P-iso-noblur") t.style.isolation = "isolate";
    if (v === "G-xf") t.style.transform = "translate(0px, 0px)";
    if (v === "G-fixedz") { t.style.position = "fixed"; t.style.zIndex = "50"; }
    const pe = document.createElement("div"); pe.style.cssText = base + "background:" + pole + ";mix-blend-mode:" + (v === "P-normal" ? "normal" : "luminosity");
    if (v === "G-child") { t.style.backdropFilter = bf; t.style.webkitBackdropFilter = bf; t.append(pe); }
    else { if (!v.includes("noblur")) { const b = document.createElement("div"); b.style.cssText = base + "backdrop-filter:" + bf + ";-webkit-backdrop-filter:" + bf; t.append(b); } t.append(pe); }
    document.body.append(t);
  }
  return null; })`;
const TILE_GROUNDS = { light: ["aurora", "aurora50", "red", "paper", "rootred"], dark: ["aurora", "aurora50", "red", "rootred"] };
async function setupTiles(page, ground) {
  if (ground === "rootred") await page.evaluate(() => { document.body.style.background = "#761617"; });  // the root-propagated ground (value.js's case)
  // the blur every G tile uses: the floor's wash plate's own computed backdrop-filter (A′ and G blur alike)
  return page.evaluate(() => { const d = document.createElement("div"); d.className = "glass-wash"; document.body.append(d); const v = getComputedStyle(d).backdropFilter; d.remove(); return v; });
}
async function tiles() {
  const out = [];
  for (const engine of engines) { const browser = await pw[engine].launch({ headless: true, args: engine === "chromium" ? CHROMIUM_ARGS : [] });
    for (const theme of ["light", "dark"]) for (const ground of TILE_GROUNDS[theme]) {
      const { ctx, page, errs } = await open(browser, engine, theme, "empty", ground === "rootred" ? "paper" : ground);
      const bf = await setupTiles(page, ground);
      const poles = POLES[theme]; const caps = {};
      for (const [pk, pole] of Object.entries(poles)) for (const v of VARIANTS) {
        if (pk !== Object.keys(poles)[0] && /^(raw|A-)/.test(v)) continue;  // raw and A′ do not depend on the pole
        await page.evaluate(`${TILE_APPLY}(${JSON.stringify([v, pole, TILE_RECTS, bf])})`);
        await page.waitForTimeout(300);
        const png = await shot(page, `tiles-${engine}-${theme}-${ground}-${pk}-${v}`);
        caps[/^(raw|A-)/.test(v) ? v : pk + ":" + v] = TILE_RECTS.map((r) => meanRect(png, SAMPLE(r)));
      }
      const rows = TILE_RECTS.map((r, k) => { const raw = caps.raw[k]; const o = { k, rect: r, rawDrift: +Math.hypot(...oklab(raw).map((x, i) => x - oklab(caps.raw2[k])[i])).toFixed(4), raw: desc(raw) };
        for (const key of Object.keys(caps)) if (!/^raw/.test(key)) o[key] = desc(caps[key][k], raw); return o; });
      out.push({ engine, theme, ground, bf, poles, load: load(), errs, rows });
      fs.writeFileSync(path.join(recDir, `tiles${a.tag ? "-" + a.tag : ""}.json`), JSON.stringify(out, null, 1));  // per cell: a later timeout keeps what ran
      console.log(`tiles ${engine} ${theme} ${ground}: load ${load()}`);
      await ctx.close(); }
    await browser.close(); }
  fs.writeFileSync(path.join(recDir, `tiles${a.tag ? "-" + a.tag : ""}.json`), JSON.stringify(out, null, 1));
}

// ── arm: video (Playwright WebKit's screencast paints backdrop-filter; page.screenshot() does not) ──
async function video() {
  const out = []; const tmp = fs.mkdtempSync(path.join(os.tmpdir(), "d3g-vid-"));
  const browser = await pw.webkit.launch({ headless: true });
  const VV = ["raw", "A-wash", "G-open", "G-iso", "G-xf", "G-fixedz", "G-child", "P-open-noblur", "P-iso-noblur", "P-normal"];
  for (const theme of ["light", "dark"]) for (const ground of ["aurora", "red"]) {
    const vdir = path.join(tmp, `${theme}-${ground}`);
    const { ctx, page, errs } = await open(browser, "webkit", theme, "empty", ground, { recordVideo: { dir: vdir, size: VIEW } });
    const bf = await setupTiles(page, ground); const pole = theme === "light" ? POLES.light.card : POLES.dark.dcard;
    const t0 = await page.evaluate(() => performance.timeOrigin + performance.now()); const marks = [];
    for (const v of VV) { await page.evaluate(`${TILE_APPLY}(${JSON.stringify([v, pole, TILE_RECTS, bf])})`); const s = Date.now(); await page.waitForTimeout(1500); marks.push([v, s, Date.now()]); }
    const vid = page.video(); await ctx.close(); const file = await vid.path();
    // the recording starts at page creation; locate each hold by its wall-clock offset from the first frame's time
    const start = fs.statSync(file).birthtimeMs; const rows = {};
    const dur = +execFileSync("ffprobe", ["-v", "error", "-show_entries", "format=duration", "-of", "csv=p=0", file], { encoding: "utf8" }).trim();
    const end = marks[marks.length - 1][2]; const offset = dur - (end - marks[0][1]) / 1000 - 0.15;  // video ends at ctx.close()
    for (const [v, s, e] of marks) { const t = Math.max(0, offset + ((s + e) / 2 - marks[0][1]) / 1000);
      const fpng = path.join(vdir, `${v}.png`); execFileSync("ffmpeg", ["-v", "error", "-y", "-ss", String(t), "-i", file, "-frames:v", "1", fpng]);
      const png = PNGread(fs.readFileSync(fpng)); const sx = png.width / VIEW.width, sy = png.height / VIEW.height;
      rows[v] = TILE_RECTS.map((r) => { const [x, y, w, h] = SAMPLE(r); return meanRect(png, [x * sx, y * sy, w * sx, h * sy]); });
      if (pngDir) fs.copyFileSync(fpng, path.join(pngDir, `video-${theme}-${ground}-${v}.png`)); }
    const tilesRows = TILE_RECTS.map((r, k) => { const raw = rows.raw[k]; const o = { k, raw: desc(raw) }; for (const v of VV.slice(1)) o[v] = desc(rows[v][k], raw); return o; });
    out.push({ engine: "webkit", via: "recordVideo + ffmpeg frame (VP8, lossy)", theme, ground, bf, pole, duration: dur, load: load(), errs, rows: tilesRows });
    console.log(`video webkit ${theme} ${ground}: load ${load()} dur ${dur}`);
  }
  await browser.close();
  fs.writeFileSync(path.join(recDir, `video${a.tag ? "-" + a.tag : ""}.json`), JSON.stringify(out, null, 1));
}

// ── arm: extra · the placements D2's advancing routes and the consumers bring (read-only from their pass-2 files) ──
//   G-doors     D2-G's sliding aperture (D2-G-block.md §1): two nested overflow:clip, radius-28 doors on translateX,
//               each with its counter; the blur and the pole are siblings inside the inner counter (the plate's slot)
//   G-doors-nb  the same with no blur sibling (plant)
//   G-anc       an ancestor scale(1.03) rotate(0.4deg) above an otherwise open tile (value.js K-15, D2-B′ P-8)
//   G-anc-nb    the same with no blur sibling (plant)
// lib arm addition: the popover's pole as a SIBLING of the popover content inside its floating wrapper (the content
// carries filter: blur(0px), a backdrop root, so a blur child inside it samples only the popover's own paint).
const EXTRA_APPLY = `(([v, pole, rects, bf]) => {
  document.querySelectorAll(".gt").forEach((e) => e.remove());
  if (v === "raw" || v === "raw2") return null;
  const base = "position:absolute;inset:0;border-radius:inherit;pointer-events:none;";
  const layer = (t, nb) => { if (!nb) { const b = document.createElement("div"); b.style.cssText = base + "backdrop-filter:" + bf + ";-webkit-backdrop-filter:" + bf; t.append(b); }
    const pe = document.createElement("div"); pe.style.cssText = base + "background:" + pole + ";mix-blend-mode:luminosity"; t.append(pe); };
  const nb = v.endsWith("-nb");
  for (const [x, y, w, h] of rects) {
    const t = document.createElement("div"); t.className = "gt";
    t.style.cssText = "position:absolute;left:" + x + "px;top:" + y + "px;width:" + w + "px;height:" + h + "px;border-radius:16px;";
    if (v.startsWith("G-doors")) { const dL = 7, dR = 5;
      const door = (tx) => { const d = document.createElement("div"); d.style.cssText = "position:absolute;inset:0;overflow:clip;border-radius:28px;transform:translateX(" + tx + "px);"; return d; };
      const ctr = (tx) => { const d = document.createElement("div"); d.style.cssText = "position:absolute;inset:0;transform:translateX(" + tx + "px);border-radius:16px;"; return d; };
      const a = door(dL), b = ctr(-dL), c = door(-dR), e = ctr(dR); t.append(a); a.append(b); b.append(c); c.append(e); layer(e, nb); }
    else if (v.startsWith("G-anc")) { const w0 = document.createElement("div"); w0.className = "gt"; w0.style.cssText = "position:absolute;left:0;top:0;width:0;height:0;transform:scale(1.03) rotate(0.4deg);transform-origin:" + (x + w / 2) + "px " + (y + h / 2) + "px;";
      layer(t, nb); w0.append(t); document.body.append(w0); continue; }
    document.body.append(t);
  }
  return null; })`;
async function extra() {
  const out = [];
  for (const engine of engines) { const browser = await pw[engine].launch({ headless: true, args: engine === "chromium" ? CHROMIUM_ARGS : [] });
    for (const theme of ["light", "dark"]) for (const ground of ["aurora", "red"]) {
      const { ctx, page, errs } = await open(browser, engine, theme, "empty", ground);
      const bf = await setupTiles(page, ground); const pole = theme === "light" ? POLES.light.card : POLES.dark.dcard; const caps = {};
      for (const v of ["raw", "G-doors", "G-doors-nb", "G-anc", "G-anc-nb", "raw2"]) {
        await page.evaluate(`${EXTRA_APPLY}(${JSON.stringify([v, pole, TILE_RECTS, bf])})`); await page.waitForTimeout(300);
        const png = await shot(page, `extra-${engine}-${theme}-${ground}-${v}`); caps[v] = TILE_RECTS.map((r) => meanRect(png, SAMPLE(r))); }
      const rows = TILE_RECTS.map((r, k) => { const raw = caps.raw[k]; const o = { k, rawDrift: +Math.hypot(...oklab(raw).map((x, i) => x - oklab(caps.raw2[k])[i])).toFixed(4), raw: desc(raw) };
        for (const key of Object.keys(caps)) if (!/^raw/.test(key)) o[key] = desc(caps[key][k], raw); return o; });
      out.push({ engine, theme, ground, bf, pole, load: load(), errs, rows });
      fs.writeFileSync(path.join(recDir, `extra${a.tag ? "-" + a.tag : ""}.json`), JSON.stringify(out, null, 1));
      // the popover's pole as a sibling inside its floating wrapper (ladder scene)
      console.log(`extra ${engine} ${theme} ${ground}: load ${load()}`); await ctx.close(); }
    for (const theme of ["light", "dark"]) for (const ground of ["aurora", "red"]) {
      const { ctx, page, errs } = await open(browser, engine, theme, "ladder", ground); await page.addStyleTag({ content: LIB_CSS });
      const pole = theme === "light" ? POLES.light.card : POLES.dark.dcard;
      const rect = await page.evaluate(() => { const s = document.querySelector('[data-spec="popover"]'); const d = s.querySelector("[data-sample]"); const r = d.getBoundingClientRect(); return [r.left + 4, r.top + 4, r.width - 8, r.height - 8]; });
      const m = {};
      for (const mode of ["raw", "A", "sib", "sib-nb"]) {
        await page.evaluate(([mode, pole]) => {
          document.querySelectorAll(".gx").forEach((e) => e.remove());
          const c = document.querySelector('[data-spec="popover"]'); c.style.removeProperty("background"); c.style.removeProperty("backdrop-filter"); c.style.removeProperty("box-shadow");
          document.documentElement.toggleAttribute("data-gx-raw", mode === "raw"); if (mode === "raw" || mode === "A") return;
          c.style.setProperty("background", "transparent", "important"); c.style.setProperty("backdrop-filter", "none", "important"); c.style.setProperty("box-shadow", "none", "important");
          const css = "position:absolute;left:" + c.offsetLeft + "px;top:" + c.offsetTop + "px;width:" + c.offsetWidth + "px;height:" + c.offsetHeight + "px;border-radius:" + getComputedStyle(c).borderRadius + ";pointer-events:none;";
          const bfv = "blur(16px) saturate(1.5)";
          if (mode === "sib") { const b = document.createElement("div"); b.className = "gx"; b.style.cssText = css + "backdrop-filter:" + bfv; c.before(b); }
          const pe = document.createElement("div"); pe.className = "gx"; pe.style.cssText = css + "background:" + pole + ";mix-blend-mode:luminosity"; c.before(pe);
        }, [mode, pole]);
        await page.waitForTimeout(350); const png = await shot(page, `popsib-${engine}-${theme}-${ground}-${mode}`); m[mode] = meanRect(png, rect); }
      out.push({ engine, theme, ground, scene: "ladder", probe: "popover pole as sibling in its floating wrapper", pole, load: load(), errs,
        row: { raw: desc(m.raw), A: desc(m.A, m.raw), sib: desc(m.sib, m.raw), "sib-nb": desc(m["sib-nb"], m.raw) } });
      fs.writeFileSync(path.join(recDir, `extra${a.tag ? "-" + a.tag : ""}.json`), JSON.stringify(out, null, 1));
      console.log(`extra popover ${engine} ${theme} ${ground}: load ${load()}`); await ctx.close(); }
    await browser.close(); }
  fs.writeFileSync(path.join(recDir, `extra${a.tag ? "-" + a.tag : ""}.json`), JSON.stringify(out, null, 1));
}

const t0 = Date.now(), l0 = load();
for (const x of arm.split(",")) await ({ census, lib, tiles, video, extra })[x]();
server.close();
console.log(`done ${arm} in ${((Date.now() - t0) / 1000).toFixed(0)} s, load ${l0} → ${load()}`);

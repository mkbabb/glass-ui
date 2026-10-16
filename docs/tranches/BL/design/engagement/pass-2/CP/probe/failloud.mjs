#!/usr/bin/env node
// failloud.mjs · CK-21 on the commit path (D5 pass 2, seat CP): each token the commit light reads, set unreadable on
// the member's root, then one commit. Read: the console errors the page raised, and whether the light still rose
// (lib.mjs's light read, the face's layers over its committed fill). A degraded light with no error is SILENT.
//   node failloud.mjs --build <dir> --label css|waapi --engine chromium|webkit [--out <dir>]
import fs from "node:fs";
import path from "node:path";
import { Engine, serveTarget, openPage, acquireLock, browserCensus, load, f, parseArgs } from "../../../harness/lib.mjs";

const a = parseArgs();
const engine = a.engine === "webkit" ? "webkit" : "chromium";
const TOKENS = ["--engage-control-engage-attack", "--engage-control-engage-release", "--ease-standard", "--rung-light", "--fill-selected"];
const SCENES = { switch: { target: '[role="switch"]', face: '[role="switch"] .control-bit__face' }, button: { target: ".button", face: ".button" } };
const linN = (u) => (u <= 0.04045 ? u / 12.92 : ((u + 0.055) / 1.055) ** 2.4);
const lumN = (c) => 0.2126 * linN(c[0]) + 0.7152 * linN(c[1]) + 0.0722 * linN(c[2]);
const overN = (dst, src) => { const k = src[3]; return [0, 1, 2].map((i) => src[i] * k + dst[i] * (1 - k)).concat([1]); };
function rise(fr) {
  const F = fr.filter((x) => x.Lx); if (F.length < 3) return NaN;
  const fin = F.at(-1).Lx; const base = overN(fin.base, fin.fill);
  let lo = Infinity, best = 0; for (const x of F) { const L = lumN(overN(base, x.Lx.layers)) * x.Lx.br; lo = Math.min(lo, L); best = Math.max(best, L - lo); }
  return best;
}
const results = [];
const waited = await acquireLock();
console.log(`# fail-loud ${a.label} · engine ${engine} · lock wait ${waited.toFixed(1)} s · ${browserCensus()} · load ${load()} at start`);
const T = await serveTarget({ build: a.build }); const E = new Engine(engine); await E.browser();
for (const [scene, sc] of Object.entries(SCENES)) for (const tok of [null, ...TOKENS]) {
  const P = await openPage(E, T, scene, { theme: "dark" });
  try {
    await P.page.waitForTimeout(300);
    if (tok) await P.page.evaluate(({ sc, tok }) => { const r = document.querySelector(sc.target); r.style.setProperty(tok, "nonsense"); const l = r.querySelector("[data-engage-light]"); l?.style.setProperty(tok, "nonsense"); }, { sc, tok });
    await P.page.waitForTimeout(200);
    const n0 = P.errors.length;
    const r = await P.page.evaluate(({ sc }) => { const p = window.__film({ target: sc.target, face: sc.face, ms: 700 }); requestAnimationFrame(() => document.querySelector(sc.target).click()); return p; }, { sc });
    const errs = P.errors.slice(n0); const rs = rise(r.fr);
    const status = !tok ? "CLEAN" : errs.length ? "LOUD" : rs < 0.01 ? "SILENT" : "NOT READ";
    const line = `  ${status.padEnd(8)} ${scene} ${tok ?? "(clean)"} · light rise ${f(rs, 4)} · ${errs.length} console error(s)${errs.length ? `: ${errs[0].slice(0, 110)}` : ""} · load ${load()}`;
    console.log(line); results.push({ scene, tok, status, rise: rs, errors: errs, load: load() });
  } finally { await P.close(); }
}
await E.close(); T.close();
if (a.out) { fs.mkdirSync(a.out, { recursive: true }); fs.writeFileSync(path.join(a.out, `failloud-${a.label}-${engine}.json`), JSON.stringify(results, null, 1)); }
process.exit(0);

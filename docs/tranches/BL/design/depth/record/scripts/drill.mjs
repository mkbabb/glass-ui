// Drill one case: the layer tree of a section, named layers sampled through a scroll,
// coverage of named text by whatever paints over it, frames for a strip, and (Chromium)
// a short devtools.timeline trace counting Layout / Paint / style events in the scroll.
// One browser; one context per mode; everything closed in finally.
//
// usage: node drill.mjs <chromium|webkit> <spec.json> <out.json> <frameDir>
// spec: { name, url, root: css (the section whose tree to dump), layers: [{label, sel, text?:bool}],
//         startY: px | startSel: css (scroll so it is at top), steps, step, frames: [stepIdx...],
//         modes: ["wide","prm","narrow"], wait, clip: [x,y,w,h] | null, pre: "js run after load" }
import { chromium, webkit } from 'playwright';
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';

const [engine, specPath, out, FR] = process.argv.slice(2);
const spec = JSON.parse(readFileSync(specPath, 'utf8'));
mkdirSync(FR, { recursive: true });
const R = { engine, spec, at: new Date().toISOString(), modes: {} };
const browser = await (engine === 'webkit' ? webkit : chromium).launch({ headless: true });

const LIB = () => {
  const key = (n) => { if (!n || !n.tagName) return String(n); const c = String(n.className?.baseVal ?? n.className ?? '').trim().split(/\s+/).filter(Boolean).slice(0, 3).join('.'); return n.tagName.toLowerCase() + (n.id ? '#' + n.id : '') + (c ? '.' + c : ''); };
  const facts = (el) => {
    const cs = getComputedStyle(el); const f = {};
    if (cs.position !== 'static') f.pos = cs.position + (cs.position === 'sticky' ? ' top:' + cs.top : '');
    if (cs.zIndex !== 'auto') f.z = cs.zIndex;
    if (cs.isolation !== 'auto') f.iso = 1;
    if (cs.transform !== 'none') f.tf = cs.transform.slice(0, 80);
    for (const p of ['translate', 'scale', 'rotate']) if (cs[p] && cs[p] !== 'none') f[p] = cs[p];
    if (+cs.opacity < 1) f.op = +(+cs.opacity).toFixed(3);
    if (cs.mixBlendMode !== 'normal') f.blend = cs.mixBlendMode;
    const mi = cs.maskImage || cs.webkitMaskImage; if (mi && mi !== 'none') f.mask = mi.slice(0, 120);
    if (cs.clipPath !== 'none') f.clip = cs.clipPath.slice(0, 120);
    if (cs.willChange !== 'auto') f.wc = cs.willChange;
    if (cs.filter !== 'none') f.filter = cs.filter.slice(0, 60);
    const bf = cs.backdropFilter || cs.webkitBackdropFilter; if (bf && bf !== 'none') f.bdf = bf;
    if (cs.backgroundImage !== 'none') f.bgi = cs.backgroundImage.slice(0, 100);
    if (cs.backgroundColor !== 'rgba(0, 0, 0, 0)') f.bg = cs.backgroundColor;
    if (cs.animationName !== 'none') f.anim = cs.animationName + ' ' + cs.animationDuration + (cs.animationTimeline && cs.animationTimeline !== 'auto' ? ' tl:' + cs.animationTimeline + ' ' + (cs.animationRange || '') : '');
    if (cs.transitionProperty !== 'all' || cs.transitionDuration !== '0s') if (cs.transitionDuration !== '0s') f.tr = cs.transitionProperty.slice(0, 60) + ' ' + cs.transitionDuration;
    if (el.getAttribute('aria-hidden') === 'true') f.ariaHidden = 1;
    if (cs.visibility === 'hidden') f.hidden = 1;
    if (cs.overflow !== 'visible') f.ov = cs.overflow;
    if (cs.contain !== 'none') f.contain = cs.contain;
    return f;
  };
  const tree = (el, depth, maxD, acc) => {
    if (acc.length > 160) return acc;
    const r = el.getBoundingClientRect();
    const own = [...el.childNodes].filter(n => n.nodeType === 3).map(n => n.textContent).join('').replace(/\s+/g, ' ').trim();
    acc.push('  '.repeat(depth) + key(el) + ` [${Math.round(r.left)},${Math.round(r.top + scrollY)} ${Math.round(r.width)}x${Math.round(r.height)}] ` + JSON.stringify(facts(el)) + (own ? ' "' + own.slice(0, 50) + '"' : '') + (el.tagName === 'IMG' ? ' src=' + (el.currentSrc || el.src).split('/').pop().slice(0, 60) : ''));
    if (depth < maxD) for (const c of el.children) tree(c, depth + 1, maxD, acc);
    return acc;
  };
  const cover = (el) => {
    const rg = document.createRange(); rg.selectNodeContents(el); const rects = [...rg.getClientRects()].filter(r => r.width > 4 && r.height > 4);
    let n = 0, c = 0; const by = {};
    for (const r of rects.slice(0, 8)) for (let i = 1; i <= 9; i++) for (let j = 1; j <= 3; j++) {
      const x = r.left + r.width * i / 10, y = r.top + r.height * j / 4;
      if (x < 0 || y < 0 || x >= innerWidth || y >= innerHeight) continue;
      n++; const t = document.elementFromPoint(x, y);
      if (t && !(t === el || el.contains(t) || t.contains(el))) { c++; const k = key(t); by[k] = (by[k] || 0) + 1; }
    }
    return [n, c, by];
  };
  window.__X = { key, facts, tree, cover };
};

async function runMode(mode) {
  const narrow = mode === 'narrow';
  const vw = narrow ? 390 : 1440, vh = narrow ? 844 : 900;
  const ctx = await browser.newContext({ viewport: { width: vw, height: vh }, deviceScaleFactor: 1, reducedMotion: mode === 'prm' ? 'reduce' : 'no-preference', locale: 'en-US' });
  const M = {};
  try {
    const page = await ctx.newPage();
    await page.goto(spec.url, { waitUntil: 'domcontentloaded', timeout: 60000 });
    await page.waitForTimeout(spec.wait ?? 5000);
    if (spec.gate) { M.gate = await page.evaluate(readFileSync(new URL('./gate.js', import.meta.url), 'utf8')).catch(e => 'gate-err ' + e.message); await page.waitForTimeout(1500); }
    for (const t of spec.clickText ?? []) { await page.getByText(t, { exact: false }).first().click({ timeout: 6000 }).then(() => (M.clicked = (M.clicked || []).concat(t))).catch(() => {}); await page.waitForTimeout(2500); }
    if (spec.pre) await page.evaluate(spec.pre).catch(() => {});
    await page.mouse.move(vw / 2, vh / 2);
    await page.evaluate(LIB);
    // arrive at the start: wheel down so scroll-linked scripts see real scroll events
    let target = spec.startY ?? 0;
    if (spec.startSel) target = await page.evaluate(([s, off]) => { const e = document.querySelector(s); return e ? Math.max(0, Math.round(e.getBoundingClientRect().top + scrollY - off)) : 0; }, [spec.startSel, spec.startOff ?? 0]);
    if (narrow && spec.narrowStartY != null) target = spec.narrowStartY;
    while (true) { const y = await page.evaluate(() => scrollY); if (y >= target - 60) break; await page.mouse.wheel(0, Math.min(400, target - y)); await page.waitForTimeout(70); const y2 = await page.evaluate(() => scrollY); if (y2 === y) break; }
    await page.waitForTimeout(900);
    M.startY = await page.evaluate(() => scrollY);
    if (spec.root) M.tree = await page.evaluate(([s, d]) => { const e = document.querySelector(s); return e ? window.__X.tree(e, 0, d, []) : ['no root ' + s]; }, [spec.root, spec.depth ?? 5]);
    const cdp = engine === 'chromium' && mode === 'wide' ? await ctx.newCDPSession(page) : null;
    const events = [];
    if (cdp) { cdp.on('Tracing.dataCollected', (d) => events.push(...d.value)); await cdp.send('Tracing.start', { categories: 'devtools.timeline,disabled-by-default-devtools.timeline', transferMode: 'ReportEvents' }); }
    const steps = narrow ? (spec.narrowSteps ?? spec.steps ?? 20) : (spec.steps ?? 20), step = spec.step ?? 100;
    const frames = new Set(mode === 'prm' ? (spec.prmFrames ?? [0, Math.round(steps / 2)]) : narrow ? (spec.narrowFrames ?? [0, Math.round(steps / 3), Math.round(2 * steps / 3), steps]) : (spec.frames ?? [0, 3, 6, 9, 12, 15, 18]));
    const S = [];
    await page.evaluate(() => { window.__WR = new Map(); new MutationObserver(ms => { for (const m of ms) if (m.attributeName === 'style') { const k = window.__X.key(m.target); window.__WR.set(k, (window.__WR.get(k) || 0) + 1); } }).observe(document.documentElement, { subtree: true, attributes: true, attributeFilter: ['style'] }); });
    for (let s = 0; s <= steps; s++) {
      if (s > 0) { await page.mouse.wheel(0, step); await page.waitForTimeout(110); }
      const row = await page.evaluate((layers) => [Math.round(scrollY), layers.map(L => { const all = [...document.querySelectorAll(L.sel)]; const e = L.contains ? all.find(x => x.textContent.includes(L.contains)) : all[L.nth || 0]; if (!e) return null; const r = e.getBoundingClientRect(); const f = window.__X.facts(e); const o = { top: Math.round(r.top * 10) / 10, left: Math.round(r.left), w: Math.round(r.width), h: Math.round(r.height), tf: f.tf || f.translate || f.scale || 0, op: f.op ?? 1, clip: f.clip || 0, mask: f.mask ? 1 : 0, filter: f.filter || 0, bg: f.bg || 0, bgi: f.bgi ? f.bgi.slice(0, 70) : 0, bdf: f.bdf || 0, z: f.z || 0 }; if (L.text) o.cover = window.__X.cover(e); return o; })], spec.layers);
      S.push(row);
      if (frames.has(s)) { await page.waitForTimeout(300); const c = spec.clip && !narrow ? { x: spec.clip[0], y: spec.clip[1], width: spec.clip[2], height: spec.clip[3] } : { x: 0, y: 0, width: vw, height: vh }; await page.screenshot({ path: `${FR}/${spec.name}-${engine}-${mode}-${String(s).padStart(2, '0')}.jpg`, type: 'jpeg', quality: 75, clip: c }).catch(() => {}); }
    }
    if (cdp) {
      await new Promise(async (res) => { cdp.once('Tracing.tracingComplete', res); await cdp.send('Tracing.end'); });
      const count = {}; let dur = {};
      for (const e of events) if (/^(Layout|UpdateLayoutTree|RecalculateStyles|Paint|PrePaint|Layerize|UpdateLayer|CompositeLayers|FunctionCall|EventDispatch|FireAnimationFrame|ScrollLayer|HitTest|Commit)$/.test(e.name)) { count[e.name] = (count[e.name] || 0) + 1; if (e.dur) dur[e.name] = (dur[e.name] || 0) + e.dur; }
      const ev = events.filter(e => e.name === 'EventDispatch').map(e => e.args?.data?.type).reduce((a, t) => (a[t] = (a[t] || 0) + 1, a), {});
      M.trace = { counts: count, ms: Object.fromEntries(Object.entries(dur).map(([k, v]) => [k, Math.round(v / 100) / 10])), events: ev };
    }
    M.writes = await page.evaluate(() => [...window.__WR.entries()].sort((a, b) => b[1] - a[1]).slice(0, 15));
    M.samples = S;
    M.rates = spec.layers.map((L, i) => { const seg = []; for (let k = 1; k < S.length; k++) { const a = S[k - 1][1][i], b = S[k][1][i]; const dy = S[k][0] - S[k - 1][0]; if (!a || !b || dy <= 0) { seg.push(null); continue; } seg.push(Math.round(-(b.top - a.top) / dy * 1000) / 10); } return { label: L.label, per100: seg }; });
    if (spec.after) M.after = await page.evaluate(spec.after).catch(e => 'after-err ' + e.message);
  } catch (e) { M.error = e.message; }
  finally { await ctx.close().catch(() => {}); }
  R.modes[mode] = M;
}

try { for (const m of (process.env.DRILL_MODES ? process.env.DRILL_MODES.split(',') : spec.modes ?? ['wide', 'prm', 'narrow'])) await runMode(m); }
catch (e) { R.error = e.message; }
finally { await browser.close().catch(() => {}); writeFileSync(out, JSON.stringify(R, null, 1)); }
console.log('ok', engine, spec.name, Object.entries(R.modes).map(([k, m]) => k + ':' + (m.error || 'y0=' + m.startY + ' ' + (m.trace ? JSON.stringify(m.trace.counts) : ''))).join(' | '));

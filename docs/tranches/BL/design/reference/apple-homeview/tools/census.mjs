// census.mjs: inventory of animated / interactive elements on apple.com/apple-homeview
// plus the network list of script, style and media assets (url, type, bytes, sha256).
// usage: node census.mjs <outDir>
// Variants: 1440x900 and 390x844, reduced motion off and on. The page has no
// prefers-color-scheme rules (light/dark is per-section .theme-dark/.theme-light),
// so one colour scheme is loaded, plus a dark-scheme load to confirm no change.
import { chromium } from 'playwright';
import fs from 'node:fs';
import os from 'node:os';
import crypto from 'node:crypto';

const URL_ = 'https://www.apple.com/apple-homeview/';
const OUT = process.argv[2] ?? './samples';
fs.mkdirSync(OUT, { recursive: true });
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const INVENTORY = () => {
  const R = (e) => { const r = e.getBoundingClientRect(); return [Math.round(r.x), Math.round(r.y + scrollY), Math.round(r.width), Math.round(r.height)]; };
  const sel = (e) => (e.id ? '#' + e.id : e.tagName.toLowerCase() + (typeof e.className === 'string' && e.className.trim() ? '.' + e.className.trim().split(/\s+/).slice(0, 3).join('.') : ''));
  const all = [...document.querySelectorAll('body *')];
  const trans = [], anims = [], timelines = [], sticky = [], backdrop = [];
  for (const e of all) {
    const c = getComputedStyle(e);
    if (c.transitionDuration.split(',').some((d) => parseFloat(d) > 0) && c.transitionProperty !== 'all' || (c.transitionProperty === 'all' && parseFloat(c.transitionDuration) > 0))
      trans.push({ s: sel(e), prop: c.transitionProperty, dur: c.transitionDuration, ease: c.transitionTimingFunction, delay: c.transitionDelay });
    if (c.animationName && c.animationName !== 'none') anims.push({ s: sel(e), name: c.animationName, dur: c.animationDuration, ease: c.animationTimingFunction, state: c.animationPlayState });
    for (const p of ['::before', '::after']) { const k = getComputedStyle(e, p); if (k.animationName && k.animationName !== 'none') anims.push({ s: sel(e) + p, name: k.animationName, dur: k.animationDuration, ease: k.animationTimingFunction, state: k.animationPlayState }); }
    const tl = c.animationTimeline || c.getPropertyValue('animation-timeline');
    if (tl && tl !== 'auto' && tl !== 'none') timelines.push({ s: sel(e), tl });
    if (c.position === 'sticky' || c.position === 'fixed') sticky.push({ s: sel(e), pos: c.position, r: R(e) });
    if (c.backdropFilter && c.backdropFilter !== 'none') backdrop.push({ s: sel(e), bf: c.backdropFilter, bc: c.backgroundColor, r: R(e) });
  }
  const compList = [...document.querySelectorAll('[data-component-list]')].map((e) => ({ s: sel(e), comps: e.dataset.componentList, r: R(e) }));
  const kf = [...document.querySelectorAll('[data-anim-keyframe],[data-anim-classname],[data-aap-kf],[data-anim-scroll-group]')].map((e) => ({ s: sel(e), kf: e.dataset.animKeyframe || e.dataset.aapKf || null, cls: e.dataset.animClassname || null, group: e.dataset.animScrollGroup || null }));
  const videos = [...document.querySelectorAll('video')].map((v) => ({ s: sel(v), src: v.currentSrc || v.src || [...v.querySelectorAll('source')].map((s) => s.src).join(' '), autoplay: v.autoplay, loop: v.loop, muted: v.muted, inline: v.dataset.inlineMedia ?? null, r: R(v) }));
  const canvases = [...document.querySelectorAll('canvas')].map((c) => ({ s: sel(c), r: R(c) }));
  const buttons = [...document.querySelectorAll('button, [role=button], [role=tab], a.dotnav-link, .paddlenav-arrow')].map((b) => ({ s: sel(b), label: b.getAttribute('aria-label') || b.textContent.trim().slice(0, 40), r: R(b) }));
  const galleries = [...document.querySelectorAll('.scroll-container, [data-component-list*=Gallery]')].map((g) => ({ s: sel(g), snap: getComputedStyle(g).scrollSnapType, ox: getComputedStyle(g).overflowX, items: g.querySelectorAll('.gallery-item').length, r: R(g) }));
  return { htmlClass: document.documentElement.className, docH: document.documentElement.scrollHeight, waapi: document.getAnimations().map((a) => ({ type: a.constructor.name, name: a.animationName || a.transitionProperty || a.id || '', target: a.effect?.target ? sel(a.effect.target) : null, pseudo: a.effect?.pseudoElement ?? null, state: a.playState, tl: a.timeline?.constructor?.name })), trans, anims, timelines, sticky, backdrop, compList, kf, videos, canvases, buttons, galleries };
};

async function run(browser, tag, opts) {
  const ctx = await browser.newContext({ viewport: opts.vp, deviceScaleFactor: 1, reducedMotion: opts.rm, colorScheme: opts.cs ?? 'light', hasTouch: !!opts.touch, isMobile: !!opts.touch });
  const page = await ctx.newPage();
  const net = [];
  page.on('response', async (r) => {
    const url = r.url(); const ct = r.headers()['content-type'] || '';
    if (!/javascript|css|image|video|audio|font|mpegurl|mp2t|octet|json/.test(ct) && !/\.(mp4|m3u8|ts|webm|jpg|png|webp|avif|js|css|woff2?)(\?|$)/.test(url)) return;
    let bytes = null, sha = null, note = '';
    try { const b = await r.body(); bytes = b.length; sha = crypto.createHash('sha256').update(b).digest('hex'); } catch (e) { note = 'body unavailable'; }
    net.push({ url, status: r.status(), type: ct.split(';')[0], bytes, contentLength: r.headers()['content-length'] ?? null, range: r.headers()['content-range'] ?? null, sha256: sha, note });
  });
  try {
    await page.goto(URL_, { waitUntil: 'load', timeout: 90000 });
    await sleep(2500);
    const h = await page.evaluate(() => document.documentElement.scrollHeight);
    for (let y = 0; y < h; y += Math.round(opts.vp.height * 0.6)) { await page.evaluate((y) => scrollTo(0, y), y); await sleep(350); }
    // park at the highlights gallery so its dock is activated and autoplaying while inventoried
    await page.evaluate(() => { const g = document.querySelector('#highlights-gallery'); g.scrollIntoView({ block: 'center' }); });
    await sleep(2500);
    const inv = await page.evaluate(INVENTORY);
    fs.writeFileSync(`${OUT}/census-${tag}.json`, JSON.stringify({ tag, opts, load: os.loadavg(), inv }, null, 1));
    if (tag === '1440-motion') fs.writeFileSync(`${OUT}/network-1440.json`, JSON.stringify(net, null, 1));
    console.log(tag, 'trans', inv.trans.length, 'anims', inv.anims.length, 'waapi', inv.waapi.length, 'timelines', inv.timelines.length, 'videos', inv.videos.length, 'canvas', inv.canvases.length, 'net', net.length);
  } finally { await page.close(); await ctx.close(); }
}

const browser = await chromium.launch({ headless: true });
try {
  console.log('chromium', browser.version(), 'load', os.loadavg().map((x) => x.toFixed(2)).join(' '));
  await run(browser, '1440-motion', { vp: { width: 1440, height: 900 }, rm: 'no-preference' });
  await run(browser, '1440-reduced', { vp: { width: 1440, height: 900 }, rm: 'reduce' });
  await run(browser, '1440-dark', { vp: { width: 1440, height: 900 }, rm: 'no-preference', cs: 'dark' });
  await run(browser, '390-motion', { vp: { width: 390, height: 844 }, rm: 'no-preference', touch: true });
  await run(browser, '390-reduced', { vp: { width: 390, height: 844 }, rm: 'reduce', touch: true });
} finally { await browser.close(); }

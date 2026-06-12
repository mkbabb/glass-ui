import { chromium } from "playwright";

const ROUTES = ["/foundations/intro","/foundations/colors","/foundations/typography","/foundations/radii","/foundations/shadows","/foundations/motion","/foundations/paper-glass","/foundations/icons","/foundations/surface-tints","/foundations/overlays-scrims","/foundations/chart-chassis-palette","/foundations/paper-backdrop-texture-system","/foundations/css-utilities","/substrates/aurora","/substrates/blob","/substrates/constellation","/substrates/fourier-field","/substrates/glass-material","/substrates/glass-panel","/forms/inputs","/forms/textarea","/forms/checks","/forms/slider","/forms/number-field","/forms/select","/forms/combobox","/forms/multi-select","/forms/toggle","/forms/toggle-chip","/forms/label","/display/buttons","/display/card","/display/badge","/display/separator","/display/section","/display/metric-badge","/display/metric-pill","/display/status-dot","/display/pulse","/display/stacked-icons","/display/dark-mode-toggle","/containers/accordion","/containers/collapsible","/containers/hover-popover","/containers/expandable-container","/containers/command","/navigation/tabs","/navigation/carousel","/navigation/header-ribbon","/data/table","/data/data-table","/data/tags-input","/data/avatar","/data/sortable-list","/data/timeline","/data/timeline-segmented","/data/timeline-continuous","/data/search","/data/scrolling-text","/data/metric-cell","/data/metric-stack","/feedback/alert","/feedback/notification","/feedback/progress","/feedback/skeleton","/feedback/confirm-dialog","/motion/springs","/motion/curve-gallery","/motion/scroll-vt","/motion/countup","/motion/reveal","/motion/typewriter","/motion/underline","/motion/animated-digit","/compositions/hero","/compositions/math-paper","/compositions/auth-shell","/compositions/settings","/compositions/empty-states","/compositions/configurator","/compositions/instrument-chassis","/compositions/form-validation","/compositions/gate-pattern","/compositions/labeled-field","/compositions/icon-tooltip"];

const measureFn = () => {
  const results = [];
  const frames = [...document.querySelectorAll('.shadow-cartoon, .story-hero-card, .story-hero-bleed-content')];
  for (const f of frames) {
    const cs = getComputedStyle(f);
    const padB = parseFloat(cs.paddingBottom) || 0;
    const fr = f.getBoundingClientRect();
    if (fr.height < 30) continue;
    let lowestTextBottom = -Infinity, lowestText = '';
    const texts = [...f.querySelectorAll('figcaption, p, span, h1, h2, h3, h4, label, code, li, button, dt, dd, td, th')];
    for (const t of texts) {
      if (!t.textContent || !t.textContent.trim()) continue;
      const r = t.getBoundingClientRect();
      if (r.height === 0 || r.width === 0) continue;
      const tcs = getComputedStyle(t);
      if (tcs.position === 'absolute' || tcs.position === 'fixed') continue;
      if (r.bottom > lowestTextBottom) { lowestTextBottom = r.bottom; lowestText = t.textContent.trim().slice(0,30); }
    }
    if (lowestTextBottom === -Infinity) continue;
    const borderB = parseFloat(cs.borderBottomWidth) || 0;
    const innerBottom = fr.bottom - borderB - padB;
    const gap = Math.round(innerBottom - lowestTextBottom);
    if (gap < 12) {
      // classify frame
      const cls = (typeof f.className === 'string' ? f.className : '');
      let kind = 'other';
      if (/story-hero-card/.test(cls)) kind = 'StoryHero-card';
      else if (/story-hero-bleed-content/.test(cls)) kind = 'StoryHero-bleed';
      else if (/shadow-cartoon/.test(cls)) {
        kind = /p-0\b/.test(cls) ? 'ShowcaseFrame(pad=none)' : 'ShowcaseFrame';
      }
      results.push({ gap, padB: Math.round(padB), lastText: lowestText, kind });
    }
  }
  return results;
};

async function run(mode) {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });
  const findings = {};
  for (const route of ROUTES) {
    await page.goto(`http://localhost:5199${route}`, { waitUntil: "domcontentloaded", timeout: 12000 }).catch(()=>{});
    if (mode === 'dark') {
      await page.evaluate(() => { document.documentElement.classList.add('dark'); });
    } else {
      await page.evaluate(() => { document.documentElement.classList.remove('dark'); });
    }
    await page.waitForTimeout(500);
    const m = await page.evaluate(measureFn).catch(()=>[]);
    if (m.length) findings[route] = m;
    process.stderr.write(`done ${route} (${m.length})\n`);
  }
  await browser.close();
  return findings;
}

const mode = process.argv[2] || 'dark';
const f = await run(mode);
console.log(JSON.stringify({ mode, findings: f }, null, 2));

// Anatomy: dump the AAP subtree with computed styles (incl ::before/::after), before and after it activates.
import { chromium } from '/Users/mkbabb/Programming/glass-ui/node_modules/playwright/index.mjs';
const W = +(process.argv[2]||1440), H = +(process.argv[3]||900);
const browser = await chromium.launch({ headless: true });
try {
  const ctx = await browser.newContext({ viewport: { width: W, height: H } });
  const page = await ctx.newPage();
  await page.goto('https://www.apple.com/apple-homeview/', { waitUntil: 'domcontentloaded', timeout: 60000 });
  await page.waitForTimeout(3000);
  const dump = () => page.evaluate(() => {
    const P = ['position','top','bottom','left','transform','opacity','width','height','border-radius','background-color','background-image','backdrop-filter','-webkit-backdrop-filter','box-shadow','filter','clip-path','mask-image','transition','animation','will-change','mix-blend-mode','color','z-index','scale','translate','inset'];
    const root = document.querySelector('#aap-highlights');
    const out = [];
    const walk = (el, d) => {
      const b = el.getBoundingClientRect();
      for (const pseudo of [null, '::before', '::after']) {
        const cs = getComputedStyle(el, pseudo);
        if (pseudo && (cs.content === 'none' || cs.content === 'normal')) continue;
        const s = {};
        for (const p of P) { const v = cs.getPropertyValue(p); if (v && !['none','auto','normal','0s','all 0s ease 0s','none 0s ease 0s 1 normal none running','static','rgba(0, 0, 0, 0)'].includes(v)) s[p] = v; }
        out.push({ d, tag: el.tagName + (pseudo||''), cls: (el.getAttribute('class')||'').slice(0,120), rect: pseudo?null:[+b.left.toFixed(1), +b.top.toFixed(1), +b.width.toFixed(1), +b.height.toFixed(1)], s });
      }
      for (const c of el.children) walk(c, d+1);
    };
    walk(root, 0);
    const p = root.parentElement; const pcs = getComputedStyle(p);
    return { parent: [p.tagName, p.className, pcs.position, pcs.height], anims: document.getAnimations().filter(a=>root.contains(a.effect?.target)).map(a=>({name:a.animationName||a.transitionProperty, t:a.effect.target.className})), out };
  });
  const before = await dump();
  // scroll so the gallery sits in view
  await page.evaluate(() => { const g = document.querySelector('#highlights-gallery'); window.scrollTo(0, g.getBoundingClientRect().top + scrollY - 100); });
  await page.waitForTimeout(3500);
  const after = await dump();
  console.log(JSON.stringify({ before, after }, null, 0));
} finally { await browser.close(); }

#!/usr/bin/env node
// ce9-probe · C-E9's own cells (D5 pass 9 critic), on the harness's own app and lib (nothing in ../../../harness is edited).
// Every cell here is REPORT unless named: they read paths the pass-9 battery does not (a critic's counterexample search).
//   stack · keyboard|fine        (§P8-8.3: "the stacking difference in a frame") the `slider` scene, a later absolutely
//                                positioned sibling (opaque red, pointer-events none) over the track's right part; the red
//                                fraction of the overlap region at rest and engaged; frames kept. In place, the sibling
//                                paints over the engaged body (as at rest); promoted, the body paints over the sibling.
//   lens <kind> · fine|coarse     the clipstale scroller under an ancestor kind H9 does not drive: `zoom: 0.8`, nested
//                                `scale: 0.9` on the scroller and on its parent, `scale: 1.25`, `rotate: 6deg`, and
//                                `scale: 0.8` with the scroller at the viewport's top. CK-25's pass rule (§P8-8.1): band over
//                                painted track k = --loupe-k-max ± 5 %, the lens's pinned edge within 2 px of the track's
//                                painted edge (bottom on top, or top on bottom when hung below), the lens's rows inside
//                                the viewport. Graded with that rule on zoom, nested, up, viewport+scale; rotate REPORT
//                                (C-9 states the lens is level). Frames kept.
//   lens scroll · none|scale     a fine hold, then twelve 8 px wheel ticks over the thumb (the scroller scrolls): per frame,
//                                read in a task posted from requestAnimationFrame (after that frame's paint), the lens's
//                                pinned edge centre minus the track's painted top centre, against its pre-scroll value.
//                                A MAIN-THREAD read (§P8-7 item 9), REPORT, not a paint instrument.
//   anc <kind> · keyboard        H9's anc method (visibility engaged over released, over the same with nothing set) on
//                                kinds H9 does not drive: skewX(10deg), a mask-image gradient, zoom 0.8, perspective
//                                rotateY(25deg), mix-blend-mode difference. REPORT with the 0.90..1.10 band printed.
//   dom · keyboard|fine|touch    the engaged host's attributes, inline style properties, :popover-open, parent unchanged,
//                                and the lens (present, popover-open) per modality: C-2 and C-9's words read on the bytes.
//   lens dialog · fine           the presented Dialog's slider (&slider=1) held: k, the pinned edge, the lens on top.
//   narrow · keyboard            the clipstale slider with its row padding 0 (the slider as wide as the scroller's content
//                                box): the engaged body's painted ends against the scroller's clip, px cut each side; frames.
// Real Safari: UNMEASURED (owner's safaridriver checkbox).
//   node ce9-probe.mjs --build <dir> --label <l> [--engine webkit] [--out <dir>] [--frames <dir>] [--only a,b]
import fs from "node:fs";
import path from "node:path";
const H = "/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/engagement/harness";
const { witness, openPage, openTouchPage, center, f, tabKey, GLASS } = await import(`${H}/lib.mjs`);
const { PNG } = (await import(`${GLASS}/node_modules/pngjs/lib/png.js`)).default;
const rgba = (buf) => PNG.sync.read(buf);
const lumaOf = (buf) => { const p = rgba(buf); const o = new Float32Array(p.width * p.height); for (let i = 0, j = 0; i < p.data.length; i += 4, j++) o[j] = 0.2126 * p.data[i] + 0.7152 * p.data[i + 1] + 0.0722 * p.data[i + 2]; return { w: p.width, h: p.height, o }; };
const KTOL = 0.05, PIN = 2, ANC_K = 0.1;
const BOX = '[data-t="box"]', REST = '[data-t="slider-a"]', CROOT = '[data-t="slider-a"] .glass-slider', CTHUMB = '[data-t="slider-a"] [role="slider"]';
const L = { lens: ".glass-loupe", clone: ".glass-loupe-clone", track: ".slider-track" };

await witness("CE9-probe", "C-E9's cells: stacking, the lens under unread kinds and on scroll, unread ancestor kinds, the DOM's words", async ({ a, E, T, cell, guard, engine }) => {
  const label = typeof a.label === "string" ? a.label : "build";
  const frames = typeof a.frames === "string" ? a.frames : null; if (frames) fs.mkdirSync(frames, { recursive: true });
  const only = typeof a.only === "string" ? new Set(a.only.split(",")) : null; const want = (k) => !only || only.has(k);
  const save = (name, buf) => { if (frames && buf) fs.writeFileSync(path.join(frames, `${label}-${engine}-${name}.png`), buf); };
  const shot = (P, clip) => (P.shot ? P.shot(clip) : P.page.screenshot({ clip, animations: "allow" }));
  const kbdEngage = async (page) => { await page.focus('[data-sentinel="before"]'); await page.keyboard.press(tabKey(engine)); await page.waitForTimeout(700); };

  // ── stack ──
  if (want("stack")) for (const mode of ["keyboard", "fine"]) {
    const name = `CE9 stack · ${mode}`;
    const r = await guard(name, async () => {
      const P = await openPage(E, T, "slider");
      try {
        const { page } = P;
        const g = await page.evaluate(() => {
          const root = document.querySelector(".glass-slider"); const host = root.parentElement; host.style.position = "relative";
          const s = document.createElement("div"); s.dataset.t = "later";
          s.style.cssText = "position:absolute;left:62%;top:-8px;width:26%;height:calc(100% + 16px);background:rgb(220,40,40);pointer-events:none";
          host.appendChild(s);
          const q = s.getBoundingClientRect(), rr = root.getBoundingClientRect();
          return { red: { x: q.left, y: q.top, w: q.width, h: q.height }, root: { x: rr.left, y: rr.top, w: rr.width, h: rr.height } };
        });
        await page.waitForTimeout(200);
        const clip = { x: Math.floor(g.root.x) - 30, y: Math.floor(g.root.y) - 40, width: Math.ceil(g.root.w) + 60, height: Math.ceil(g.root.h) + 80 };
        const inner = { x: Math.floor(g.red.x) + 2, y: Math.floor(g.red.y) + 2, width: Math.floor(g.red.w) - 4, height: Math.floor(g.red.h) - 4 };
        const redFrac = (buf) => { const p = rgba(buf); let n = 0, t = 0; for (let i = 0; i < p.data.length; i += 4) { t++; if (p.data[i] > 180 && p.data[i + 1] < 90 && p.data[i + 2] < 90) n++; } return n / t; };
        const restBuf = await shot(P, clip); const restRed = redFrac(await shot(P, inner));
        let engBuf, engRed, st;
        const during = async () => { engBuf = await shot(P, clip); engRed = redFrac(await shot(P, inner)); st = await page.evaluate(() => { const h = document.querySelector(".glass-slider"); return { eng: h.matches("[data-engaged]"), promoted: h.matches(":popover-open"), lens: !!document.querySelector(".glass-loupe:popover-open") }; }); };
        if (mode === "keyboard") { await kbdEngage(page); await during(); await page.keyboard.press("Escape"); }
        else { const c = await center(page, '[role="slider"]'); await page.mouse.move(c.x, c.y); await page.mouse.down(); try { await page.waitForTimeout(900); await during(); } finally { await page.mouse.up(); } }
        return { restBuf, engBuf, restRed, engRed, st };
      } finally { await P.close(); }
    });
    if (r.crashed) { cell(name, "REPORT", r.line); continue; }
    save(`stack-${mode}-rest`, r.restBuf); save(`stack-${mode}-engaged`, r.engBuf);
    cell(name, "REPORT", `engaged ${r.st.eng}, promoted ${r.st.promoted}, lens shown ${r.st.lens} · a later positioned red sibling over the track's right part: its inner region red ${f(r.restRed * 100, 1)} % at rest, ${f(r.engRed * 100, 1)} % engaged (${r.engRed > 0.97 ? "the sibling paints OVER the engaged body" : "the engaged body paints over part of the sibling"}) · frames ${label}-${engine}-stack-${mode}-{rest,engaged}.png`);
  }

  // ── the lens under ancestor kinds H9 does not drive ──
  const lensRead = (sel) => {
    const l = document.querySelector(sel.lens), c = l?.querySelector(sel.clone), t = document.querySelector(`${sel.root} ${sel.track}`) ?? document.querySelector(sel.track);
    if (!l || !c || !t) return null; const a1 = l.getBoundingClientRect(), b1 = c.getBoundingClientRect(), d = t.getBoundingClientRect(); if (!(a1.width > 0)) return null;
    return { below: l.hasAttribute("data-engage-lens-below"), open: l.matches(":popover-open"), lx: a1.left + a1.width / 2, lt: a1.top, lb: a1.bottom, lh: a1.height, band: b1.height, tx: d.left + d.width / 2, tt: d.top, tb: d.bottom, th: d.height, tw: d.width, kmax: Number.parseFloat(getComputedStyle(l).getPropertyValue("--loupe-k-max")), op: +getComputedStyle(l).opacity, vh: innerHeight, sx: l.style.getPropertyValue("--lens-sx"), sy: l.style.getPropertyValue("--lens-sy") };
  };
  const KINDS = [
    ["zoom", "fine", { zoom: "0.8" }, null, true],
    ["zoom", "coarse", { zoom: "0.8" }, null, true],
    ["nested", "fine", { scale: "0.9", transformOrigin: "0 0" }, { scale: "0.9", transformOrigin: "0 0" }, true],
    ["up", "fine", { scale: "1.25", transformOrigin: "0 0" }, null, true],
    ["viewport+scale", "fine", { scale: "0.8", transformOrigin: "0 0" }, null, true],
    ["rotate", "fine", { rotate: "6deg" }, null, false],
  ];
  if (want("lens")) for (const [kind, pointer, css, parentCss, graded] of KINDS) {
    const name = `CE9 lens ${kind} · ${pointer}`;
    const r = await guard(name, async () => {
      const P = pointer === "fine" ? await openPage(E, T, "clipstale") : await openTouchPage(E, T, "clipstale");
      try {
        if (pointer === "coarse" && !P.modeOk) return { mode: P.modeLine };
        const { page } = P;
        await page.evaluate(([B, Q, css, pcss, top]) => {
          const b = document.querySelector(B); Object.assign(b.style, css); if (pcss) Object.assign(b.parentElement.style, pcss);
          if (top) { const y = b.getBoundingClientRect().top; b.style.position = "relative"; b.style.top = `${2 - y}px`; }
          const q = document.querySelector(Q); const br = b.getBoundingClientRect(), k = br.height / b.offsetHeight, rr = q.getBoundingClientRect();
          b.scrollTop += (rr.top - (br.top + b.clientTop * k + (top ? 4 : 50))) / k;
        }, [BOX, REST, css, parentCss, kind === "viewport+scale"]);
        await page.waitForTimeout(250);
        const c = await center(page, CTHUMB);
        let g = null, buf = null;
        const read = async () => {
          g = await page.evaluate(lensRead, { ...L, root: CROOT });
          if (g) buf = await shot(P, { x: Math.max(0, Math.floor(Math.min(g.lx - 100, g.tx - g.tw / 2)) - 6), y: Math.max(0, Math.floor(Math.min(g.lt, g.tt)) - 10), width: Math.min(640, Math.ceil(Math.max(g.tw, 200)) + 40), height: Math.min(420, Math.ceil(Math.max(g.lb, g.tb) - Math.min(g.lt, g.tt)) + 40) });
        };
        if (pointer === "fine") { await page.mouse.move(c.x, c.y); await page.mouse.down(); try { await page.waitForTimeout(1200); await read(); } finally { await page.mouse.up(); } }
        else await P.holdAt(c.x, c.y, [1200], read);
        return { g, buf };
      } finally { await P.close(); }
    });
    if (r.crashed) { cell(name, graded ? "FAIL" : "REPORT", r.line); continue; }
    if (r.mode) { cell(name, "FAIL", `MODE NOT APPLIED ${r.mode}`); continue; }
    if (!r.g) { cell(name, graded ? "FAIL" : "REPORT", "NO LOUPE shown on the held slider"); continue; }
    save(`lens-${kind}-${pointer}`, r.buf);
    const g = r.g; const k = g.band / g.th; const pin = g.below ? g.lt - g.tb : g.lb - g.tt; const dx = g.lx - g.tx;
    const inVp = Math.max(0, Math.min(g.lb, g.vh) - Math.max(g.lt, 0)) / g.lh;
    const ok = Math.abs(k / g.kmax - 1) <= KTOL && Math.abs(pin) <= PIN && inVp >= 0.95 && g.op > 0.9;
    cell(name, graded ? (ok ? "PASS" : "FAIL") : "REPORT", `the scroller ${Object.entries(css).map(([p, v]) => `${p} ${v}`).join(" ")}${parentCss ? ` and its parent ${Object.entries(parentCss).map(([p, v]) => `${p} ${v}`).join(" ")}` : ""}${kind === "viewport+scale" ? ", its top 2 px below the viewport's" : ""} · band over painted track ×${f(k, 3)} (k max ${g.kmax}, ±5 %) · lens ${g.below ? "below (top on the track's bottom)" : "above (bottom on the track's top)"}: pinned edge Δ ${f(pin, 1)} px (≤ ${PIN}), centre Δx ${f(dx, 1)} px · ${f(inVp * 100, 1)} % of its rows inside the viewport · popover-open ${g.open} · --lens-sx/-sy ${g.sx}/${g.sy} · opacity ${f(g.op, 2)}`);
  }

  // ── the lens on a scroll while held (main-thread read) ──
  if (want("lensscroll")) for (const tf of ["none", "scale"]) {
    const name = `CE9 lens scroll · ${tf}`;
    const r = await guard(name, async () => {
      const P = await openPage(E, T, "clipstale");
      try {
        const { page } = P;
        await page.evaluate(([B, Q, sc]) => { const b = document.querySelector(B); if (sc) Object.assign(b.style, { scale: "0.8", transformOrigin: "0 0" }); const q = document.querySelector(Q); const br = b.getBoundingClientRect(), k = br.height / b.offsetHeight, rr = q.getBoundingClientRect(); b.scrollTop += (rr.top - (br.top + b.clientTop * k + 60)) / k; }, [BOX, REST, tf === "scale"]);
        await page.waitForTimeout(250);
        const c = await center(page, CTHUMB);
        await page.mouse.move(c.x, c.y); await page.mouse.down();
        try {
          await page.waitForTimeout(900);
          await page.evaluate(([sel, B]) => { window.__ls = []; const ch = new MessageChannel(); const t0 = performance.now(); let on = true; window.__lsStop = () => { on = false; };
            ch.port1.onmessage = () => { const l = document.querySelector(sel.lens), t = document.querySelector(`${sel.root} ${sel.track}`), b = document.querySelector(B); if (l && t) { const a1 = l.getBoundingClientRect(), d = t.getBoundingClientRect(); window.__ls.push({ t: performance.now() - t0, dx: a1.left + a1.width / 2 - (d.left + d.width / 2), dy: a1.bottom - d.top, st: b.scrollTop, ty: d.top }); } };
            const tick = () => { if (!on) return; ch.port2.postMessage(0); requestAnimationFrame(tick); }; requestAnimationFrame(tick); }, [{ ...L, root: CROOT }, BOX]);
          await page.waitForTimeout(200);
          for (let i = 0; i < 12; i++) { await page.mouse.wheel(0, 8); await page.waitForTimeout(16); }
          await page.waitForTimeout(500);
          return await page.evaluate(() => { window.__lsStop(); return window.__ls; });
        } finally { await page.mouse.up(); }
      } finally { await P.close(); }
    });
    if (r.crashed) { cell(name, "REPORT", r.line); continue; }
    const s = Array.isArray(r) ? r : []; if (s.length < 5) { cell(name, "REPORT", `NOT READ (${s.length} samples)`); continue; }
    const base = s.slice(0, 5); const bdy = base.reduce((p, x) => p + x.dy, 0) / base.length, bdx = base.reduce((p, x) => p + x.dx, 0) / base.length;
    const dev = s.map((x) => Math.hypot(x.dy - bdy, x.dx - bdx)); const worst = Math.max(...dev); const over = dev.filter((d) => d > 1).length;
    const moved = s[s.length - 1].st - s[0].st; const trackMoved = s[s.length - 1].ty - s[0].ty;
    cell(name, "REPORT", `fine hold, twelve 8 px wheel ticks over the thumb · the scroller scrolled ${f(moved, 0)} px (track moved ${f(trackMoved, 1)} px on screen) · ${s.length} post-frame samples · the lens's bottom centre to the track's top centre against its pre-scroll value: worst ${f(worst, 2)} px, ${over} samples over 1 px (main-thread read, not paint; §P8-7 item 9)`);
  }

  // ── the lens's side flip at the viewport's top, during a hold: the scroller carried up 2 px per frame (a layout move,
  // `top`) until the lens's top would leave the viewport; per frame (post-paint task) the lens's centre relative to the
  // track's centre, its pinned edge's Δ, and the largest one-frame step of the lens against its track. REPORT ──
  if (want("lensflip")) for (const tf of ["none", "scale"]) {
    const name = `CE9 lens flip · ${tf}`;
    const r = await guard(name, async () => {
      const P = await openPage(E, T, "clipstale");
      try {
        const { page } = P;
        const startTop = await page.evaluate(([B, Q, sc]) => { const b = document.querySelector(B); if (sc) Object.assign(b.style, { scale: "0.8", transformOrigin: "0 0" }); b.style.position = "relative"; const q = document.querySelector(Q); const br = b.getBoundingClientRect(), k = br.height / b.offsetHeight, rr = q.getBoundingClientRect(); b.scrollTop += (rr.top - (br.top + b.clientTop * k + 6)) / k; const y = b.getBoundingClientRect().top; b.style.top = `${110 - y}px`; return 110 - y; }, [BOX, REST, tf === "scale"]);
        await page.waitForTimeout(250);
        const c = await center(page, CTHUMB);
        await page.mouse.move(c.x, c.y); await page.mouse.down();
        try {
          await page.waitForTimeout(900);
          return await page.evaluate(([sel, B, top0]) => new Promise((ok) => {
            const b = document.querySelector(B), out = []; const ch = new MessageChannel(); let n = 0; let top = top0;
            ch.port1.onmessage = () => { const l = document.querySelector(sel.lens), t = document.querySelector(`${sel.root} ${sel.track}`); if (l && t) { const a1 = l.getBoundingClientRect(), d = t.getBoundingClientRect(); const below = l.hasAttribute("data-engage-lens-below"); out.push({ n, below, rel: (a1.top + a1.height / 2) - (d.top + d.height / 2), pin: below ? a1.top - d.bottom : a1.bottom - d.top, dx: a1.left + a1.width / 2 - (d.left + d.width / 2), lt: a1.top }); } };
            const tick = () => { n++; if (n <= 60) { top -= 2; b.style.top = `${top}px`; } ch.port2.postMessage(0); if (n < 80) requestAnimationFrame(tick); else setTimeout(() => ok(out), 50); };
            requestAnimationFrame(tick);
          }), [{ ...L, root: CROOT }, BOX, startTop]);
        } finally { await page.mouse.up(); }
      } finally { await P.close(); }
    });
    if (r.crashed) { cell(name, "REPORT", r.line); continue; }
    const s = Array.isArray(r) ? r : []; if (s.length < 10) { cell(name, "REPORT", `NOT READ (${s.length} samples)`); continue; }
    const steps = s.slice(1).map((x, i) => ({ i: i + 1, d: Math.abs(x.rel - s[i].rel), flip: x.below !== s[i].below }));
    const worst = steps.reduce((p, x) => (x.d > p.d ? x : p), { d: 0, i: -1 });
    const flips = steps.filter((x) => x.flip).map((x) => x.i);
    const badPin = s.filter((x) => Math.abs(x.pin) > PIN).map((x) => `${x.n}:${f(x.pin, 1)}`);
    cell(name, "REPORT", `fine hold; the scroller carried up 2 px per frame for 60 frames${tf === "scale" ? " under scale 0.8" : ""} · ${s.length} post-frame samples · the lens flips side at sample ${flips.join(",") || "none"} · the largest one-frame step of the lens's centre against the track's: ${f(worst.d, 1)} px at sample ${worst.i} (steady steps ${f(Math.max(0, ...steps.filter((x) => !x.flip).map((x) => x.d)), 2)} px) · frames whose pinned edge is off by > ${PIN} px: ${badPin.length ? badPin.join(" ") : "none"} · lens top ranges ${f(Math.min(...s.map((x) => x.lt)), 1)}..${f(Math.max(...s.map((x) => x.lt)), 1)} px`);
  }

  // ── C-E9b: the lens on its entry and exit clocks (C-A9 §4 item 2 was unmeasured). The card none, `translate: 0 30px` or
  // `scale: 0.8` (origin 0 0), nothing scrolled. enter: per frame from the press (post-paint task) the lens's opacity and its
  // pinned edge (bottom centre) against the track's painted top centre; exit: the same from the release. Read: the worst
  // |pinned-edge Δ| over the frames the lens shows (opacity > 0.05), and the Δ at the first frame with opacity ≥ 0.5.
  // Stills at about 110 ms into each clock. REPORT (a main-thread read, §P8-7 item 9; the frames are the paint) ──
  const TFS = { none: null, translate: { translate: "0 30px" }, scale: { scale: "0.8", transformOrigin: "0 0" } };
  if (want("lensclock")) for (const phase of ["enter", "exit"]) for (const [tf, css] of Object.entries(TFS)) {
    const name = `CE9b lens ${phase} · ${tf}`;
    const r = await guard(name, async () => {
      const P = await openPage(E, T, "clipstale");
      try {
        const { page } = P;
        await page.evaluate(([B, Q, css]) => { const b = document.querySelector(B); if (css) Object.assign(b.style, css); const q = document.querySelector(Q); const br = b.getBoundingClientRect(), k = br.height / b.offsetHeight, rr = q.getBoundingClientRect(); b.scrollTop += (rr.top - (br.top + b.clientTop * k + 50)) / k; }, [BOX, REST, css]);
        await page.waitForTimeout(250);
        const c = await center(page, CTHUMB);
        const arm = () => page.evaluate((sel) => { window.__lc = []; const ch = new MessageChannel(); let n = 0; window.__lcOn = true;
          ch.port1.onmessage = () => { const l = document.querySelector(sel.lens), t = document.querySelector(`${sel.root} ${sel.track}`); if (l && t) { const a1 = l.getBoundingClientRect(), d = t.getBoundingClientRect(); const below = l.hasAttribute("data-engage-lens-below"); window.__lc.push({ n, sc: getComputedStyle(l).scale, op: +getComputedStyle(l).opacity, pin: below ? a1.top - d.bottom : a1.bottom - d.top, dx: a1.left + a1.width / 2 - (d.left + d.width / 2) }); } };
          const tick = () => { n++; ch.port2.postMessage(0); if (n < 45 && window.__lcOn) requestAnimationFrame(tick); }; requestAnimationFrame(tick); }, { ...L, root: CROOT });
        const clipOf = () => page.evaluate((sel) => { const t = document.querySelector(`${sel.root} ${sel.track}`).getBoundingClientRect(); return { x: Math.max(0, Math.floor(t.left + t.width / 2 - 130)), y: Math.max(0, Math.floor(t.top - 140)), width: 260, height: 180 }; }, { ...L, root: CROOT });
        let buf = null;
        await page.mouse.move(c.x, c.y);
        if (phase === "enter") {
          await arm(); await page.mouse.down();
          try { await page.waitForTimeout(110); buf = await shot(P, await clipOf()); await page.waitForTimeout(700); } finally { await page.mouse.up(); }
        } else {
          await page.mouse.down(); try { await page.waitForTimeout(1200); } finally { await arm(); await page.mouse.up(); }
          await page.waitForTimeout(110); buf = await shot(P, await clipOf()); await page.waitForTimeout(700);
        }
        const s2 = await page.evaluate(() => { window.__lcOn = false; return window.__lc; });
        return { s: s2, buf };
      } finally { await P.close(); }
    });
    if (r.crashed) { cell(name, "REPORT", r.line); continue; }
    save(`lens-${phase}-${tf}-110ms`, r.buf);
    const s = (r.s ?? []).filter((x) => x.op > 0.05);
    if (!s.length) { cell(name, "REPORT", "the lens shows on no frame"); continue; }
    const worst = s.reduce((p, x) => (Math.abs(x.pin) > Math.abs(p.pin) ? x : p), s[0]);
    const half = s.find((x) => x.op >= 0.5) ?? s[0];
    cell(name, "REPORT", `fine hold, the card ${css ? Object.entries(css).map(([k2, v]) => `${k2} ${v}`).join(" ") : "untransformed"}, nothing scrolled · ${phase === "enter" ? "from the press" : "from the release"} the lens shows (opacity > 0.05) on ${s.length} post-frame samples · worst pinned-edge Δ ${f(worst.pin, 1)} px at sample ${worst.n} (opacity ${f(worst.op, 2)}, its scale ${worst.sc}) · at the first sample with opacity ≥ 0.5 (sample ${half.n}): Δ ${f(half.pin, 1)} px, Δx ${f(half.dx, 1)} px · samples ${s.slice(0, 8).map((x) => `${x.n}:${f(x.pin, 1)}@${f(x.op, 2)}`).join(" ")} · still ${label}-${engine}-lens-${phase}-${tf}-110ms.png`);
  }

  // ── C-E9b: the lens's exit frozen part-way (a paint witness for the clock read above). Fine hold 1200 ms, release; in the
  // next animation frame every animation on the lens is paused at currentTime = <t> ms (its own CSS transitions: scale and
  // opacity), then its rect is read and the frame screenshotted. none | scale card. REPORT ──
  if (want("lensfreeze")) for (const [tf, css] of Object.entries({ none: null, scale: { scale: "0.8", transformOrigin: "0 0" } })) for (const t of [60, 120]) {
    const name = `CE9b lens exit frozen · ${tf} · +${t} ms`;
    const r = await guard(name, async () => {
      const P = await openPage(E, T, "clipstale");
      try {
        const { page } = P;
        await page.evaluate(([B, Q, css]) => { const b = document.querySelector(B); if (css) Object.assign(b.style, css); const q = document.querySelector(Q); const br = b.getBoundingClientRect(), k = br.height / b.offsetHeight, rr = q.getBoundingClientRect(); b.scrollTop += (rr.top - (br.top + b.clientTop * k + 50)) / k; }, [BOX, REST, css]);
        await page.waitForTimeout(250);
        const c = await center(page, CTHUMB);
        await page.mouse.move(c.x, c.y); await page.mouse.down();
        try { await page.waitForTimeout(1200); } finally { await page.mouse.up(); }
        const g = await page.evaluate(([sel, t]) => new Promise((ok) => requestAnimationFrame(() => {
          const l = document.querySelector(sel.lens), tr = document.querySelector(`${sel.root} ${sel.track}`);
          const an = l.getAnimations(); for (const a of an) { a.pause(); a.currentTime = t; }
          const a1 = l.getBoundingClientRect(), d = tr.getBoundingClientRect(); const below = l.hasAttribute("data-engage-lens-below");
          ok({ n: an.length, props: an.map((a) => a.transitionProperty ?? a.animationName ?? "?").join(","), op: +getComputedStyle(l).opacity, sc: getComputedStyle(l).scale, pin: below ? a1.top - d.bottom : a1.bottom - d.top, lb: a1.bottom, lt: a1.top, tt: d.top, tx: d.left + d.width / 2 });
        })), [{ ...L, root: CROOT }, t]);
        await page.waitForTimeout(80);
        const buf = await shot(P, { x: Math.max(0, Math.floor(g.tx - 130)), y: Math.max(0, Math.floor(Math.min(g.lt, g.tt) - 30)), width: 260, height: Math.ceil(Math.max(g.tt + 40, g.lb + 10) - Math.min(g.lt, g.tt)) + 40 });
        return { g, buf };
      } finally { await P.close(); }
    });
    if (r.crashed) { cell(name, "REPORT", r.line); continue; }
    save(`lens-exit-frozen-${tf}-${t}ms`, r.buf);
    const g = r.g;
    cell(name, "REPORT", `release, then the lens's ${g.n} animation(s) [${g.props}] paused at +${t} ms · opacity ${f(g.op, 2)}, its scale ${g.sc} · the lens's pinned edge ${f(g.pin, 1)} px from the track's painted top (negative: above it) · frame ${label}-${engine}-lens-exit-frozen-${tf}-${t}ms.png`);
  }

  // ── ancestor kinds H9 does not drive (H9's anc method, keyboard) ──
  if (want("anc")) {
    const KX = { none: {}, skew: { transform: "skewX(10deg)" }, mask: { "mask-image": "linear-gradient(to right, black 40%, transparent 95%)", "-webkit-mask-image": "linear-gradient(to right, black 40%, transparent 95%)" }, zoom: { zoom: "0.8" }, persp: { transform: "perspective(500px) rotateY(25deg)" }, blend: { "mix-blend-mode": "difference" } };
    let ref = null;
    for (const [kind, css] of Object.entries(KX)) {
      const name = `CE9 anc ${kind} · keyboard`;
      const r = await guard(name, async () => {
        const P = await openPage(E, T, "clipstale");
        try {
          const { page } = P;
          await page.evaluate(([B, Q, css]) => { const b = document.querySelector(B); for (const [p, v] of Object.entries(css)) b.style.setProperty(p, v); const q = document.querySelector(Q); const br = b.getBoundingClientRect(), k = br.height / b.offsetHeight, rr = q.getBoundingClientRect(); b.scrollTop += (rr.top - (br.top + b.clientTop * k + 40)) / k; }, [BOX, REST, css]);
          await page.waitForTimeout(250);
          const reg = await page.evaluate((b) => { const q = document.querySelector(b).getBoundingClientRect(); return { x: q.left, y: q.top, w: q.width, h: q.height }; }, BOX);
          const clip = { x: Math.max(0, Math.floor(reg.x) - 8), y: Math.max(0, Math.floor(reg.y) - 8), width: Math.ceil(reg.w) + 16, height: Math.ceil(reg.h) + 16 };
          await page.evaluate((q) => { document.querySelector(q).style.visibility = "hidden"; }, REST); await page.waitForTimeout(100);
          const empty = lumaOf(await shot(P, clip));
          await page.evaluate((q) => { document.querySelector(q).style.visibility = ""; }, REST); await page.waitForTimeout(150);
          await kbdEngage(page);
          const engBuf = await shot(P, clip); const eng = lumaOf(engBuf);
          const st = await page.evaluate((s) => { const h = document.querySelector(s); return { eng: h.matches("[data-engaged]"), promoted: h.matches(":popover-open") }; }, CROOT);
          await page.keyboard.press("Escape"); await page.waitForTimeout(900);
          const relBuf = await shot(P, clip); const rel = lumaOf(relBuf);
          const z = await page.evaluate((s) => document.querySelector(s).matches("[data-engaged]"), CROOT);
          return { empty, eng, rel, st, z, engBuf, relBuf };
        } finally { await P.close(); }
      }, 120000);
      if (r.crashed) { cell(name, "REPORT", r.line); continue; }
      save(`anc-${kind}-engaged`, r.engBuf); save(`anc-${kind}-released`, r.relBuf);
      const vis = (x) => { let s2 = 0; for (let i = 0; i < x.o.length; i++) s2 += Math.abs(x.o[i] - r.empty.o[i]); return s2; };
      const k = vis(r.eng) / Math.max(1, vis(r.rel)); const driven = r.st.eng && !r.z;
      if (kind === "none") { ref = driven ? k : null; cell(name, "REPORT", `${driven ? "" : "NOT DRIVEN · "}reference ×${f(k, 3)} (promoted ${r.st.promoted})`); continue; }
      const rr = ref ? k / ref : NaN;
      cell(name, "REPORT", `${driven ? "" : "NOT DRIVEN · "}promoted ${r.st.promoted} · the scroller ${Object.entries(css).map(([p, v]) => `${p}: ${v}`).join("; ")} · engaged over released ×${f(k, 3)} against ×${f(ref, 3)} · ratio of ratios ${f(rr, 3)} (${Math.abs(rr - 1) <= ANC_K ? "inside" : "OUTSIDE"} 0.90..1.10)`);
    }
  }

  // ── the DOM's words (C-2, C-9) ──
  if (want("dom")) for (const mode of ["keyboard", "fine", "touch"]) {
    const name = `CE9 dom · ${mode}`;
    const r = await guard(name, async () => {
      const P = mode === "touch" ? await openTouchPage(E, T, "clipstale") : await openPage(E, T, "clipstale");
      try {
        const { page } = P;
        await page.evaluate(([B, Q]) => { const b = document.querySelector(B); const q = document.querySelector(Q); const br = b.getBoundingClientRect(), rr = q.getBoundingClientRect(); b.scrollTop += rr.top - (br.top + 50); }, [BOX, REST]);
        await page.waitForTimeout(200);
        const parent0 = await page.evaluate((s) => { const h = document.querySelector(s); window.__p0 = h.parentElement; return h.parentElement.tagName; }, CROOT);
        const read = () => page.evaluate((s) => { const h = document.querySelector(s); const st = []; for (let i = 0; i < h.style.length; i++) st.push(h.style[i]); const l = h.querySelector(":scope > .glass-loupe"); const ls = []; if (l) for (let i = 0; i < l.style.length; i++) ls.push(l.style[i]);
          return { attrs: [...h.attributes].map((x) => x.name).filter((n) => n.startsWith("data-") || n === "popover" || n === "style").join(" "), style: st.join(" "), promoted: h.matches(":popover-open"), sameParent: h.parentElement === window.__p0, foot: document.querySelectorAll(".engage-footprint").length, lens: !!l, lensOpen: !!l && l.matches(":popover-open"), lensStyle: ls.join(" "), anims: h.getAnimations().map((a) => Object.keys(a.effect?.getKeyframes?.()[0] ?? {}).filter((k) => !["offset", "easing", "composite", "computedOffset"].includes(k)).join("+")).join(",") }; }, CROOT);
        let x;
        if (mode === "keyboard") { await kbdEngage(page); x = await read(); await page.keyboard.press("Escape"); }
        else { const c = await center(page, CTHUMB); if (mode === "fine") { await page.mouse.move(c.x, c.y); await page.mouse.down(); try { await page.waitForTimeout(900); x = await read(); } finally { await page.mouse.up(); } } else { await P.holdAt(c.x, c.y, [900], async () => { x = await read(); }); } }
        await page.waitForTimeout(1200); const after = await read();
        return { parent0, x, after };
      } finally { await P.close(); }
    });
    if (r.crashed) { cell(name, "REPORT", r.line); continue; }
    const { x, after } = r;
    cell(name, "REPORT", `engaged: attributes [${x.attrs}] · inline style [${x.style}] · :popover-open ${x.promoted} · same parent ${x.sameParent} · .engage-footprint ${x.foot} · lens ${x.lens} (popover-open ${x.lensOpen}; inline [${x.lensStyle}]) · host animations [${x.anims}] · 1.2 s after release: attributes [${after.attrs}] style [${after.style}] lens ${after.lens}`);
  }

  // ── the lens over the presented Dialog ──
  if (want("lensdlg")) {
    const name = "CE9 lens dialog · fine";
    const r = await guard(name, async () => {
      const P = await openPage(E, T, "presented", { q: { slider: "1" } });
      try {
        const { page } = P; await page.waitForTimeout(700);
        const c = await center(page, '[data-t="dlg-slider"] [role="slider"]');
        await page.mouse.move(c.x, c.y); await page.mouse.down();
        try {
          await page.waitForTimeout(1200);
          const g = await page.evaluate(lensRead, { ...L, root: '[data-t="dlg-slider"]' });
          // the loupe is `pointer-events: none`, which elementFromPoint skips: lifted for this one read and restored
          // (C-E9b's fix: the first form read every loupe as "not topmost", an instrument defect)
          const top = g ? await page.evaluate(([x, y]) => { const l = document.querySelector(".glass-loupe"); const pe = l.style.pointerEvents; l.style.pointerEvents = "auto"; const e = document.elementFromPoint(x, y); l.style.pointerEvents = pe; return e ? !!e.closest(".glass-loupe") : false; }, [g.lx, g.lt + g.lh / 2]) : null;
          const buf = g ? await shot(P, { x: Math.max(0, Math.floor(g.tx - g.tw / 2) - 20), y: Math.max(0, Math.floor(g.lt) - 10), width: Math.ceil(g.tw) + 40, height: Math.ceil(g.tb - g.lt) + 30 }) : null;
          return { g, top, buf };
        } finally { await page.mouse.up(); }
      } finally { await P.close(); }
    });
    if (r.crashed) cell(name, "FAIL", r.line);
    else if (!r.g) cell(name, "FAIL", "NO LOUPE on the Dialog's held slider");
    else { save("lens-dialog-fine", r.buf); const g = r.g; const k = g.band / g.th; const pin = g.below ? g.lt - g.tb : g.lb - g.tt; const ok = Math.abs(k / g.kmax - 1) <= KTOL && Math.abs(pin) <= PIN && r.top;
      cell(name, ok ? "PASS" : "FAIL", `the Dialog's slider held · band ×${f(k, 3)} (k max ${g.kmax}) · pinned edge Δ ${f(pin, 1)} px · the lens is the topmost element at its centre ${r.top} · popover-open ${g.open}`); }
  }

  // ── narrow: the engaged body against a scroller whose content box it fills ──
  if (want("narrow")) {
    const name = "CE9 narrow · keyboard";
    const r = await guard(name, async () => {
      const P = await openPage(E, T, "clipstale");
      try {
        const { page } = P;
        await page.evaluate(([B, Q]) => { const q = document.querySelector(Q); q.style.padding = "0"; const b = document.querySelector(B); const br = b.getBoundingClientRect(), rr = q.getBoundingClientRect(); b.scrollTop += rr.top - (br.top + 50); }, [BOX, REST]);
        await page.waitForTimeout(250);
        const geo = () => page.evaluate(([B, R]) => { const b = document.querySelector(B), h = document.querySelector(R); const br = b.getBoundingClientRect(); const cl = br.left + b.clientLeft, cr = cl + b.clientWidth; const hr = h.getBoundingClientRect(); return { cl, cr, hl: hr.left, hr: hr.right, hw: hr.width, eng: h.matches("[data-engaged]"), promoted: h.matches(":popover-open"), y: hr.top, h: hr.height, bx: br.left, bw: br.width }; }, [BOX, CROOT]);
        const g0 = await geo(); const clip = { x: Math.max(0, Math.floor(g0.bx) - 10), y: Math.max(0, Math.floor(g0.y) - 20), width: Math.ceil(g0.bw) + 20, height: Math.ceil(g0.h) + 40 };
        const restBuf = await shot(P, clip);
        await kbdEngage(page); const g1 = await geo(); const engBuf = await shot(P, clip); await page.keyboard.press("Escape");
        return { g0, g1, restBuf, engBuf };
      } finally { await P.close(); }
    });
    if (r.crashed) { cell(name, "REPORT", r.line); }
    else { save("narrow-keyboard-rest", r.restBuf); save("narrow-keyboard-engaged", r.engBuf); const { g0, g1 } = r;
      const cut = (g) => [Math.max(0, g.cl - g.hl), Math.max(0, g.hr - g.cr)];
      cell(name, "REPORT", `the slider row unpadded: rest ${f(g0.hw, 1)} px wide, cut ${cut(g0).map((v) => f(v, 1)).join(" / ")} px (left / right) by the scroller's clip · engaged ${g1.eng} (promoted ${g1.promoted}) ${f(g1.hw, 1)} px wide (×${f(g1.hw / g0.hw, 3)}), cut ${cut(g1).map((v) => f(v, 1)).join(" / ")} px · frames ${label}-${engine}-narrow-keyboard-{rest,engaged}.png`); }
  }
});

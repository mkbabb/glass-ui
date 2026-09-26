// measure.mjs · the measurements the witnesses share. Each function takes an open page (lib.openPage) and
// returns plain numbers; the witness files turn them into PASS/FAIL cells. Every read is painted pixels,
// computed style and geometry, the accessibility tree (CDP in Chromium; Playwright's aria snapshot plus DOM
// states in Playwright WebKit), or a real key press or pointer event.
import { shot, clipAround, meanRect, compare, contrast, hex, savePng, backendIds, axOf, f2 } from "./lib.mjs";

const TOL = 0.5; // px, geometry tolerance
const wait = (P, ms) => P.page.waitForTimeout(ms);
/** Named radius tokens that are primitive scale steps, not roles (reported, but a role is preferred). */
const SCALE = /^--radius-(none|xs|sm|md|lg|xl|[2-9]xl|full)?$/;

export async function tagItems(P) { return P.page.evaluate(() => window.__th.tag()); }
export async function park(P) { await P.page.mouse.move(2, 2); }

// ── corners (T-1, T-2, W-A) ──────────────────────────────────────────────────
/**
 * One item's corner story: at mount, then with one and two added lines. Each added-line reading is taken twice
 * (H-1): synchronously after the mutation (what a script reading layout in the same task sees) and framed, after
 * the mutation's frame has painted (what the user sees). The gate reads the framed value; the synchronous one is
 * reported beside it.
 */
export const CORNER_STORY = async (i) => {
    const th = window.__th, el = document.querySelector(`[data-th-idx="${i}"]`);
    const cs = getComputedStyle(el);
    const minB = parseFloat(cs.minBlockSize) || 0;
    const rung = minB > 0 ? minB : th.rung(el);
    const read = () => { const c = th.corner(el); return { w: c.w, h: c.h, used: c.used, computed: c.computed, rows: th.rows(el) }; };
    const s0 = read();
    th.addLine(el); const s1sync = read(); await th.frame(); const s1 = read();
    th.addLine(el); const s2sync = read(); await th.frame(); const s2 = read();
    th.removeLines(el); await th.frame();
    const field = parseFloat(th.resolve(document.body, "--radius-field"));
    return { idx: i, holder: el.getAttribute("data-holder") ?? el.getAttribute("data-slot") ?? el.tagName.toLowerCase(), rung, field, rungs: th.rungs(), steps: [s0, s1, s2], sync: [s0, s1sync, s2sync] };
};
export async function cornerStory(P, idx) { return P.page.evaluate(CORNER_STORY, idx); }
export function nameOf(used, rungs) {
  const hits = rungs.filter((r) => Math.abs(r.px - used) <= TOL);
  const roles = hits.filter((r) => !SCALE.test(r.name)).map((r) => r.name);
  return roles.length ? roles.join("|") : hits[0] ? `${hits[0].name} (scale step, no role)` : null;
}
/**
 * T-1 under H-1 and the Q-1 default (a). Past its rung (framed reads):
 *   a tile (a multi-line selectable holder) uses `--radius-field` as the ROOT resolves it (the card rung), at every
 *     rung, fine, coarse and on the comfort axis;
 *   a control whose label wraps (the `wrap` scene) keeps its one-line curvature, rung/2 (the A1 bound).
 * The bound is the ruled number, never a role the item itself declares, so a per-element restatement cannot name
 * its own corner (A-crit CX-2). The root names that match the corner are reported.
 */
export function judgeT1(story, holder = "tile") {
  const { rung, steps, sync, field } = story;
  const past = steps.map((s, k) => ({ ...s, k })).filter((s) => s.h > rung + TOL);
  if (!past.length) return { pass: null, why: "never past its rung" };
  const want = holder === "control" ? rung / 2 : field;
  const bound = holder === "control" ? `rung/2 = ${f2(want)}` : `root --radius-field = ${f2(want)}`;
  const ok = past.every((s) => Math.abs(s.used - want) <= TOL);
  const syncOk = past.every((s) => Math.abs(sync[s.k].used - want) <= TOL);
  return { pass: ok, want, bound, syncOk, named: nameOf(past[0].used, story.rungs) };
}
export const stepLine = (st) => st.steps.map((s, k) => {
  const y = st.sync?.[k];
  const syncTxt = k > 0 && y && Math.abs(y.used - s.used) > TOL ? ` [sync ${y.computed}→${f2(y.used)}]` : "";
  return `${f2(s.w)}×${f2(s.h)} ${s.computed}→${f2(s.used)} (÷h/2 ${f2(s.used / (s.h / 2))})${syncTxt}`;
}).join(" | ");

// ── the selected state (T-3, T-8) ─────────────────────────────────────────────
/** Paint of the selected item vs an unselected sibling of the same size, with [data-ink] hidden and scale pinned. */
export async function selectedSeparation(P, { save } = {}) {
  await park(P);
  const n = await tagItems(P);
  const info = await P.page.evaluate(() => {
    const th = window.__th;
    const its = th.items();
    const s = its.findIndex((e) => th.on(e));
    const sr = s >= 0 ? th.size(its[s]) : null;
    // the unselected sibling nearest in size (equal in every tile grid; a pill row's labels differ in width)
    let u = -1, best = Infinity;
    its.forEach((e, i) => { if (i === s || th.on(e) || !sr) return; const z = th.size(e), d = Math.abs(z.w - sr.w) + Math.abs(z.h - sr.h); if (d < best) { best = d; u = i; } });
    return { s, u, sizeDelta: best, corner: s >= 0 ? th.corner(its[s]).used : 0 };
  });
  if (info.s < 0 || info.u < 0) return { error: `no selected/unselected pair among ${n} items (sel ${info.s}, unsel ${info.u})` };
  await P.page.evaluate(({ s, u }) => { const th = window.__th; th.hideInk(true); for (const i of [s, u]) th.pin(document.querySelector(`[data-th-idx="${i}"]`), true); }, info);
  await wait(P, 350);
  const rects = await P.page.evaluate(({ s, u }) => [s, u].map((i) => window.__th.rect(document.querySelector(`[data-th-idx="${i}"]`))), info);
  const clip = (r) => ({ x: Math.round(r.x), y: Math.round(r.y), width: Math.floor(r.w), height: Math.floor(r.h) });
  const cs = clip(rects[0]), cu = clip(rects[1]);
  cs.width = cu.width = Math.min(cs.width, cu.width); cs.height = cu.height = Math.min(cs.height, cu.height);
  const A = await shot(P.page, cs), B = await shot(P.page, cu);
  await P.page.evaluate(({ s, u }) => { const th = window.__th; th.hideInk(false); for (const i of [s, u]) th.pin(document.querySelector(`[data-th-idx="${i}"]`), false); }, info);
  if (save) { savePng(A, `${save}-sel.png`); savePng(B, `${save}-unsel.png`); }
  // the fill: the inner region, inset past the corner so the ground never enters it
  const inset = Math.min(Math.max(info.corner * 0.3, 6), cs.width / 3, cs.height / 3);
  const inner = (c) => ({ x: c.x + inset, y: c.y + inset, w: c.width - 2 * inset, h: c.height - 2 * inset });
  const ms = meanRect(A, inner(cs)), mu = meanRect(B, inner(cu));
  const cmp = compare(A, B, null, Math.round(4 * A.dsf));
  const dsf2 = A.dsf * A.dsf;
  const perim = 2 * (cs.width + cs.height);
  return {
    sel: info.s, unsel: info.u, size: `${cs.width}×${cs.height}${info.sizeDelta >= 1 ? ` (sizes differ by ${info.sizeDelta.toFixed(1)} px; cropped to the smaller)` : ""}`,
    fill: contrast(ms, mu), fillSel: hex(ms), fillUnsel: hex(mu),
    c3Area: cmp.c3 / dsf2, c3Edge: cmp.c3Edge / dsf2, c3Inner: cmp.c3Inner / dsf2, perimeter: perim, p95: cmp.p95, changedPct: (100 * cmp.changed) / cmp.total,
  };
}
/**
 * T-3's rule: mean fill ≥ 3:1, or a second carrier: ≥ 3:1 pixels covering at least a 1 px band along half the
 * perimeter (an edge, a mark or a flood). H-3: the fill is read and reported apart from the edge: `fillLine` is its
 * own reported cell, and the gating line splits the ≥ 3:1 area into the 4 px perimeter band (an edge) and the
 * interior (a mark, a flood).
 */
export function judgeT3(m) {
  if (m.error) return { pass: false, line: m.error, fillLine: m.error };
  const carrier = m.c3Area >= 0.5 * m.perimeter;
  return {
    pass: m.fill >= 3 || carrier,
    line: `carrier ≥3:1 area ${f2(m.c3Area)} px² (perimeter band ${f2(m.c3Edge)}, interior ${f2(m.c3Inner)}) vs the bar ${f2(0.5 * m.perimeter)} px²; fill ${f2(m.fill)}:1; p95 ${f2(m.p95)}; items ${m.sel}/${m.unsel} ${m.size}`,
    fillLine: `fill alone ${f2(m.fill)}:1 (${m.fillSel} vs ${m.fillUnsel}) — decoration, reported apart from the edge`,
    fillPass: m.fill >= 3,
  };
}

// ── the focus ring (T-4) ──────────────────────────────────────────────────────
/** Tab into the group from the "before" sentinel with real key presses; return the focused item index. */
export async function tabIn(P) {
  await P.page.evaluate(() => document.querySelector('[data-sentinel="before"]').focus());
  let a = "before";
  for (let k = 0; k < 4 && typeof a !== "number" && a !== "after"; k++) { // a focusable scroll port may take the first stop
    await P.page.keyboard.press(P.keys.tab);
    await wait(P, 200);
    a = await P.page.evaluate(() => window.__th.active());
  }
  return a;
}
/** The ring per side: focused vs unfocused, the painted thickness outside the curved edge, middle 60 % of each side. */
export async function ringCoverage(P, { save } = {}) {
  await park(P);
  await tagItems(P);
  const idx = await tabIn(P);
  if (typeof idx !== "number") return { error: `${P.keys.tab} landed on ${idx}, not an item` };
  const r = await P.page.evaluate((i) => { const el = document.querySelector(`[data-th-idx="${i}"]`); return { ...window.__th.rect(el), rad: window.__th.corner(el).used }; }, idx);
  const on = await P.page.evaluate((i) => window.__th.on(document.querySelector(`[data-th-idx="${i}"]`)), idx);
  const ol = await P.page.evaluate((i) => { const cs = getComputedStyle(document.querySelector(`[data-th-idx="${i}"]`)); return { style: cs.outlineStyle, text: `${cs.outlineStyle} ${cs.outlineWidth} offset ${cs.outlineOffset}` }; }, idx);
  const clip = clipAround(r, 8);
  const F = await shot(P.page, clip);
  await P.page.keyboard.press(P.keys.back);
  await wait(P, 250);
  const U = await shot(P.page, clip);
  if (save) { savePng(F, `${save}-focus.png`); savePng(U, `${save}-rest.png`); }
  const d = F.dsf, W = F.png.width;
  const moved = (x, y) => {
    const i = y * W + x, a = F.png.data, b = U.png.data;
    return Math.max(Math.abs(a[i * 4] - b[i * 4]), Math.abs(a[i * 4 + 1] - b[i * 4 + 1]), Math.abs(a[i * 4 + 2] - b[i * 4 + 2])) > 24;
  };
  const X = (css) => Math.round((css - clip.x) * d), Y = (css) => Math.round((css - clip.y) * d);
  // the edge follows the used corner: at a position t along a side, a corner of radius R insets the edge by
  // R − √(R² − (R − dist)²) where dist is the distance from the side's end, so the band rides the curve
  const R = r.rad;
  const inset = (pos, lo, len) => { const dist = Math.min(pos - lo, lo + len - pos); return dist >= R ? 0 : R - Math.sqrt(Math.max(0, R * R - (R - dist) ** 2)); };
  // per position along the middle 60 % of a side: the painted ring thickness (device pixels that moved, across
  // the band 0-6 px outside the curved edge, in CSS px). A side's reading is its 10th-percentile thickness.
  const side = (name) => {
    const th = [];
    const horiz = name === "top" || name === "bottom";
    const along = horiz ? [r.x + 0.2 * r.w, r.x + 0.8 * r.w] : [r.y + 0.2 * r.h, r.y + 0.8 * r.h];
    for (let t = Math.round(along[0] * d); t < Math.round(along[1] * d); t++) {
      let cnt = 0;
      const e = Math.round((horiz ? inset(t / d, r.x, r.w) : inset(t / d, r.y, r.h)) * d);
      for (let k = 1; k <= 6 * d; k++) {
        let x, y;
        if (name === "top") { x = t - Math.round(clip.x * d); y = Y(r.y) + e - k; }
        if (name === "bottom") { x = t - Math.round(clip.x * d); y = Y(r.y + r.h) - e + k - 1; }
        if (name === "left") { y = t - Math.round(clip.y * d); x = X(r.x) + e - k; }
        if (name === "right") { y = t - Math.round(clip.y * d); x = X(r.x + r.w) - e + k - 1; }
        if (x >= 0 && y >= 0 && x < W && y < F.png.height && moved(x, y)) cnt++;
      }
      th.push(cnt / d);
    }
    th.sort((a, b) => a - b);
    return th.length ? th[Math.floor(th.length * 0.1)] : 0;
  };
  const cov = Object.fromEntries(["top", "right", "bottom", "left"].map((s) => [s, side(s)]));
  return { idx, on, outline: ol.text, outlineStyle: ol.style, cov };
}
/**
 * T-4: whole (≥ 1.5 px of painted ring on every side) AND the library's ring, not the UA's (H-6): a focused item
 * whose computed `outline-style` is `auto` is painting the user agent's default focus indicator, which the pixel
 * read alone cannot tell from the ring in light (E `pl/t4`).
 */
export function judgeT4(m) {
  if (m.error) return { pass: false, line: m.error };
  const min = Math.min(...Object.values(m.cov));
  const ua = m.outlineStyle === "auto";
  return {
    pass: min >= 1.5 && !ua,
    line: `item ${m.idx} (${m.on ? "selected" : "unselected"}); outline ${m.outline}${ua ? " — the UA's focus outline, not the ring" : ""}; painted ring px top ${f2(m.cov.top)} right ${f2(m.cov.right)} bottom ${f2(m.cov.bottom)} left ${f2(m.cov.left)} (whole: ≥ 1.50 of the 2 px ring on every side, 10th percentile)`,
  };
}

// ── ARIA and keys (T-5, W-B, W-C) ─────────────────────────────────────────────
const snapLine = (yaml) => {
  const first = (yaml ?? "").split("\n")[0] ?? "";
  const m = first.match(/^- (\w[\w-]*)/);
  return { role: m ? m[1] : null, checked: /\[checked(?:=true)?\]/.test(first) ? "true" : undefined, pressed: /\[pressed(?:=true)?\]/.test(first) ? "true" : undefined };
};
/**
 * Group and item roles and states. Chromium: the CDP accessibility tree. Playwright WebKit has no CDP: roles
 * come from Playwright's aria snapshot (its own ARIA computation over the WebKit DOM, not WebKit's AX tree), and
 * whether an item carries a checked or pressed state at all from its `aria-checked` / `aria-pressed` attribute.
 */
export async function axRoles(P) {
  await tagItems(P);
  if (P.cdp) {
    const [g] = await backendIds(P.cdp, "[data-th-group]");
    const items = await backendIds(P.cdp, "[data-th-idx]");
    const group = g ? await axOf(P.cdp, g.backendNodeId) : { role: null };
    const its = [];
    for (const it of items) its.push(await axOf(P.cdp, it.backendNodeId));
    return { group, items: its, via: "CDP AX tree" };
  }
  const group = snapLine(await P.page.locator("[data-th-group]").first().ariaSnapshot().catch(() => ""));
  const n = await P.page.locator("[data-th-idx]").count();
  const its = [];
  for (let i = 0; i < n; i++) {
    const loc = P.page.locator(`[data-th-idx="${i}"]`);
    const s = snapLine(await loc.ariaSnapshot().catch(() => ""));
    const dom = await loc.evaluate((e) => ({ c: e.getAttribute("aria-checked"), p: e.getAttribute("aria-pressed") }));
    its.push({ role: s.role, checked: dom.c ?? s.checked, pressed: dom.p ?? s.pressed });
  }
  return { group, items: its, via: "Playwright aria snapshot + DOM states" };
}
/**
 * Every tab stop between the sentinels (H-5): items, focusable descendants and any other focusable (a scroll
 * port with its own tabindex). An exclusive set has exactly one.
 */
export async function tabStops(P) {
  await tagItems(P);
  await P.page.evaluate(() => document.querySelector('[data-sentinel="before"]').focus());
  const stops = [];
  let bodies = 0;
  for (let k = 0; k < 40; k++) {
    await P.page.keyboard.press(P.keys.tab);
    const a = await P.page.evaluate(() => window.__th.active());
    if (a === "after") break;
    if (a === "body" && ++bodies > 1) break;
    stops.push(a);
  }
  return stops;
}
/** Layout of the items: rows and columns by rect centre. */
export async function layout(P) {
  return P.page.evaluate(() => [...document.querySelectorAll("[data-th-idx]")].sort((a, b) => a.dataset.thIdx - b.dataset.thIdx).map((e) => { const r = e.getBoundingClientRect(); return { i: +e.dataset.thIdx, cx: r.x + r.width / 2, cy: r.y + r.height / 2, w: r.width, h: r.height }; }));
}
/**
 * Starts per arrow. `start[key]`: an item with a geometric neighbour that way. Where no item has one (the cross
 * axis of a one-line row or column), Q-4's default (b) asks for a linear step: `linear[key]` is the first item for
 * Down/Right and the last for Up/Left, and the arrow must still move and check.
 */
export function neighbours(L) {
  const rowOf = (a, b) => Math.abs(a.cy - b.cy) < Math.min(a.h, b.h) / 2;
  const colOf = (a, b) => Math.abs(a.cx - b.cx) < Math.min(a.w, b.w) / 2;
  const rows = new Set(L.map((a) => Math.round(a.cy))).size, cols = new Set(L.map((a) => Math.round(a.cx))).size;
  const find = (pred) => L.find((a) => L.some((b) => b !== a && pred(a, b)));
  const findNo = (pred) => L.find((a) => !L.some((b) => b !== a && pred(a, b)) && L.some((b) => b !== a));
  return {
    grid: rows > 1 && cols > 1,
    vertical: rows > 1 && cols === 1,
    start: {
      ArrowRight: find((a, b) => rowOf(a, b) && b.cx > a.cx),
      ArrowLeft: find((a, b) => rowOf(a, b) && b.cx < a.cx),
      ArrowDown: find((a, b) => colOf(a, b) && b.cy > a.cy),
      ArrowUp: find((a, b) => colOf(a, b) && b.cy < a.cy),
    },
    linear: { ArrowRight: L[0], ArrowDown: L[0], ArrowLeft: L[L.length - 1], ArrowUp: L[L.length - 1] },
    // grid edges (reported): an item with no neighbour that way that is not the set's last/first item
    edge: {
      ArrowDown: findNo((a, b) => colOf(a, b) && b.cy > a.cy),
      ArrowUp: findNo((a, b) => colOf(a, b) && b.cy < a.cy),
    },
  };
}
/**
 * Place focus on the start item, press the arrow (a real key), read focus and the checked state. Chromium starts
 * with a real pointer click. Playwright WebKit starts with focus plus Space (a real key), because hovering a
 * ToggleGroupItem hangs its renderer (PF-1 / SF-8); the cell says so.
 */
export async function arrow(P, start, key) {
  let scripted = false;
  if (P.engine === "webkit") {
    await P.page.evaluate((i) => document.querySelector(`[data-th-idx="${i}"]`).focus(), start.i);
    await P.page.keyboard.press("Space"); scripted = true;
  } else {
    await P.page.mouse.click(start.cx, start.cy);
  }
  await wait(P, 150);
  let before = await P.page.evaluate(() => window.__th.active());
  if (before !== start.i) { // a click that does not focus (a pointer-captured strip): place focus, then press the real key
    await P.page.evaluate((i) => document.querySelector(`[data-th-idx="${i}"]`).focus(), start.i);
    before = await P.page.evaluate(() => window.__th.active()); scripted = true;
  }
  await P.page.keyboard.press(key);
  await wait(P, 200);
  return P.page.evaluate(({ b, s }) => {
    const th = window.__th, a = th.active();
    const el = typeof a === "number" ? document.querySelector(`[data-th-idx="${a}"]`) : null;
    return { before: b, after: a, moved: typeof a === "number" && a !== b, checked: el ? th.on(el) : false, scripted: s };
  }, { b: before, s: scripted });
}
const startNote = (P, r) => (r.scripted ? (P.engine === "webkit" ? " (started by focus + Space: PF-1)" : " (the click did not focus; focus placed by script)") : "");
/**
 * The arrow cells every one-of-N witness shares (T-5, W-B, W-C; H-5). All four arrows gate, per Q-4 (b): in a
 * grid each arrow from an item with a neighbour that way; in a one-line row or column the axis arrows the same
 * way and the cross arrows as a linear step from the first or last item. Grid edges are reported.
 */
export async function arrowCells(P, sc, { gating = true, label = sc.id } = {}) {
  const cells = [];
  await tagItems(P);
  const nb = neighbours(await layout(P));
  const shape = nb.grid ? "grid" : nb.vertical ? "column" : "row";
  for (const key of ["ArrowRight", "ArrowLeft", "ArrowDown", "ArrowUp"]) {
    const geo = nb.start[key];
    const start = geo ?? nb.linear[key];
    if (!start) { cells.push({ gating, pass: false, line: `${label} ${key} · no items` }); continue; }
    const r = await arrow(P, start, key);
    cells.push({ gating, pass: r.moved && r.checked,
      line: `${label} ${shape} ${key} from #${start.i}${geo ? "" : " (linear step, Q-4 b)"} · focus ${r.before} → ${r.after} · moved ${r.moved} · checked ${r.checked}${startNote(P, r)}` });
  }
  if (nb.grid) for (const key of ["ArrowDown", "ArrowUp"]) {
    const start = nb.edge[key];
    if (!start) continue;
    const r = await arrow(P, start, key);
    cells.push({ gating: false, pass: r.moved && r.checked, line: `${label} grid edge ${key} from #${start.i} (no item that way; reported) · focus ${r.before} → ${r.after} · moved ${r.moved} · checked ${r.checked}${startNote(P, r)}` });
  }
  return cells;
}

// ── engagement (T-6) ──────────────────────────────────────────────────────────
export async function unselectedIdx(P) {
  await tagItems(P);
  return P.page.evaluate(() => { const th = window.__th, its = th.items(); const u = its.findIndex((e) => !th.on(e)); return u; });
}
const itemSel = (i) => `[data-th-idx="${i}"]`;
async function center(P, i) { const r = await P.page.evaluate((s) => window.__th.rect(document.querySelector(s)), itemSel(i)); return { r, x: r.x + r.w / 2, y: r.y + r.h / 2 }; }
/** Hover light channel with scale pinned: the fraction of the item's pixels that change between rest and hover. */
export async function hoverLight(P, i) {
  await park(P); await wait(P, 400);
  const { r, x, y } = await center(P, i);
  const clip = clipAround(r, 2);
  await P.page.evaluate((s) => window.__th.pin(document.querySelector(s), true), itemSel(i));
  await wait(P, 150);
  const A = await shot(P.page, clip);
  await P.page.mouse.move(x, y); await wait(P, 600);
  const B = await shot(P.page, clip);
  await P.page.evaluate((s) => window.__th.pin(document.querySelector(s), false), itemSel(i));
  await park(P); await wait(P, 300);
  const c = compare(A, B);
  return { changedPct: (100 * c.changed) / c.total, p95: c.p95 };
}
export async function hoverScale(P, i) {
  await park(P); await wait(P, 400);
  const { x, y } = await center(P, i);
  const frames = await sampleOver(P, () => P.page.mouse.move(x, y), 600);
  const s = await P.page.evaluate((q) => window.__th.scale(document.querySelector(q)), itemSel(i));
  await park(P); await wait(P, 300);
  return { ...s, med: medianInterval(frames) };
}
export async function pressScale(P, i) {
  const { x, y } = await center(P, i);
  await P.page.mouse.move(x, y); await wait(P, 500);
  const frames = await sampleOver(P, () => P.page.mouse.down(), 180);
  const s = await P.page.evaluate((q) => window.__th.scale(document.querySelector(q)), itemSel(i));
  return { s, x, y, med: medianInterval(frames) };
}
/** Release the press (the commit) and read the item's running animations in the same frame, scale excluded. */
export async function commitAnims(P, i) {
  await P.page.mouse.up();
  const a = await P.page.evaluate((q) => window.__th.anims(document.querySelector(q)), itemSel(i));
  const on = await P.page.evaluate((q) => window.__th.on(document.querySelector(q)), itemSel(i));
  const nonScale = a.filter((x) => !/^(scale|transform|translate|rotate)$/.test(x.prop) && x.state === "running");
  return { on, all: a, nonScale };
}
/** Coarse pointer: tap u, then tap v; u must not keep a hover (scale 1, paint equal to its pre-tap rest). */
export async function coarseLatch(P, u, v) {
  const cu = await center(P, u), cv = await center(P, v);
  const clip = clipAround(cu.r, 2);
  await wait(P, 300);
  const A = await shot(P.page, clip);
  await P.page.touchscreen.tap(cu.x, cu.y); await wait(P, 500);
  await P.page.touchscreen.tap(cv.x, cv.y); await wait(P, 700);
  const B = await shot(P.page, clip);
  const s = await P.page.evaluate((q) => ({ ...window.__th.scale(document.querySelector(q)), hover: document.querySelector(q).matches(":hover"), on: window.__th.on(document.querySelector(q)) }), itemSel(u));
  const c = compare(A, B);
  return { scale: s, changedPct: (100 * c.changed) / c.total };
}

// ── the commit bar (T-6, H-4) ─────────────────────────────────────────────────
/** Run the in-page sampler over `trigger` and return its frames (every animation frame for `ms`). */
export async function sampleOver(P, trigger, ms = 800) {
  await P.page.evaluate((m) => window.__th.startSample(m), ms);
  await trigger();
  await P.page.waitForFunction(() => window.__th_sample && window.__th_sample.done, null, { timeout: 20000 });
  return P.page.evaluate(() => window.__th_sample.frames);
}
/** The median interval between sampled animation frames (ms): a janky read shows here. */
export const medianInterval = (frames) => { const d = frames.slice(1).map((f, k) => f.t - frames[k].t).sort((x, y) => x - y); return d.length ? d[Math.floor(d.length / 2)] : 0; };
export const POP = 0.015, BOUNCE = 0.002, TRAVEL = 4, OVERSHOOT = 0.5;
/**
 * The commit bar on one item (the item the commit selected). A commit clears it with weight and bounce (D-1,
 * D-2) in one of two forms:
 *   a pop: the item's scale peaks ≥ 0.015 above where it settles (the last sampled frame) and then bounces
 *     ≥ 0.002 below the settle before it lands. The settle, not 1, is the reference: a selected item that rests
 *     scaled (the selectable Chip rests at 1.074) does not pop by resting, and its motion is judged against its
 *     own landing;
 *   travel: a selection body (`[data-selection-body]`) moves ≥ 4 px and overshoots its landing by ≥ 0.5 px.
 * A colour change, a linear fade or a flood alone does not clear it. Reported beside the verdict: the peak and
 * its time, the trough, the flood's arrival (the last frame in which the item's paint signature changed), the frame
 * count and the median frame interval (a janky run shows here).
 */
export function commitBar(frames, i) {
  if (!frames.length) return { pass: false, line: "no frames sampled" };
  if (i < 0) return { pass: false, line: "the input committed nothing (no item became selected)" };
  const s = frames.map((f) => f.s[i]), t = frames.map((f) => f.t);
  let pk = 0; s.forEach((v, k) => { if (v > s[pk]) pk = k; });
  const peak = s[pk], settle = s[s.length - 1];
  const trough = Math.min(...s.slice(pk));
  const pop = peak - settle >= POP, bounce = trough <= settle - BOUNCE;
  let travel = 0, over = 0;
  const bodies = frames.map((f) => f.body).filter(Boolean);
  if (bodies.length > 1) {
    const c = (r) => [r.x + r.w / 2, r.y + r.h / 2];
    const a = c(bodies[0]), z = c(bodies[bodies.length - 1]);
    const d = [z[0] - a[0], z[1] - a[1]], L = Math.hypot(...d);
    travel = L;
    if (L > 0) for (const r of bodies) { const p = c(r); over = Math.max(over, ((p[0] - a[0]) * d[0] + (p[1] - a[1]) * d[1]) / L - L); }
  }
  let flood = null, firstPaint = null;
  for (let k = 1; k < frames.length; k++) if (frames[k].sig[i] !== frames[k - 1].sig[i]) { flood = t[k]; firstPaint ??= t[k]; }
  const dts = t.slice(1).map((v, k) => v - t[k]).sort((a, b) => a - b);
  const med = dts.length ? dts[Math.floor(dts.length / 2)] : 0;
  const pass = (pop && bounce) || (travel >= TRAVEL && over >= OVERSHOOT);
  return {
    pass, peak, trough, travel, over,
    line: `pop peak ${f2(peak)} at ${Math.round(t[pk])} ms, trough after it ${f2(trough)}, settle ${f2(settle)} (${pop ? "amplitude ok" : `amplitude < ${POP}`}, ${bounce ? "bounce" : "no bounce"}); body travel ${f2(travel)} px, overshoot ${f2(over)} px; paint moved ${firstPaint === null ? "never" : `${Math.round(firstPaint)}-${Math.round(flood)} ms`}; ${frames.length} frames, median ${f2(med)} ms`,
  };
}
/**
 * No pop on Tab entry (C-crit C-1): while focus enters a group whose choice is made, no item's scale moves and no
 * body moves. Motion is each item's scale range across the sampled frames, so an item that rests scaled (a
 * selected Chip at 1.074) is still, and one that pops on focus is not.
 */
export function quietEntry(frames) {
  let dev = 0, idx = -1;
  const n = frames[0]?.s.length ?? 0;
  for (let k = 0; k < n; k++) { const v = frames.map((f) => f.s[k]); const d = Math.max(...v) - Math.min(...v); if (d > dev) { dev = d; idx = k; } }
  const bodies = frames.map((f) => f.body).filter(Boolean);
  const moved = bodies.length > 1 ? Math.hypot(bodies[bodies.length - 1].x - bodies[0].x, bodies[bodies.length - 1].y - bodies[0].y) : 0;
  return { pass: dev < BOUNCE && moved < 1, line: `largest scale motion ${f2(dev)}${idx >= 0 ? ` on #${idx}` : ""}, body moved ${f2(moved)} px (a Tab entry commits nothing)` };
}

// ── consumer paint (T-7) ──────────────────────────────────────────────────────
export const PAINT_PROPS = ["border-top-left-radius", "border-top-right-radius", "border-bottom-right-radius", "border-bottom-left-radius",
  "outline-style", "outline-width", "outline-color", "outline-offset", "background-color", "background-image", "box-shadow",
  "border-top-color", "border-right-color", "border-bottom-color", "border-left-color", "color"];
/** Computed paint of the item in four states: rest (unselected), on (selected), hover (unselected, hovered), focus (Tab). */
export async function paintStates(P) {
  await park(P); await tagItems(P);
  const read = (i) => P.page.evaluate(({ i, props }) => {
    const el = document.querySelector(`[data-th-idx="${i}"]`), cs = getComputedStyle(el);
    const ink = [...el.querySelectorAll("[data-ink]")].map((e) => { const c = getComputedStyle(e); return `${c.color} ${c.fontWeight}`; }).join(" / ");
    return { ...Object.fromEntries(props.map((p) => [p, cs.getPropertyValue(p)])), __ink: ink };
  }, { i, props: PAINT_PROPS });
  const idx = await P.page.evaluate(() => { const th = window.__th, its = th.items(); return { s: its.findIndex((e) => th.on(e)), u: its.findIndex((e) => !th.on(e)) }; });
  await wait(P, 400);
  const out = { rest: await read(idx.u), on: await read(idx.s) };
  const f = await tabIn(P); await wait(P, 300);
  out.focus = typeof f === "number" ? await read(f) : null;
  await P.page.evaluate(() => document.activeElement && document.activeElement.blur());
  const { x, y } = await center(P, idx.u);
  await P.page.mouse.move(x, y); await wait(P, 700);
  out.hover = await read(idx.u);
  return out;
}

#!/usr/bin/env node
// D4 pass 8 · CRITIC probe: L-3 (O-94/O-94a R-2, `--selection-paint: bare` on the group) attacked past the BUILD
// seat's l3-bare read, on the same compositions (`../../routes/L3/compose.mjs`). The BUILD probe reads the inner fill
// and the corner, light and dark. The task's three questions are read here instead:
//   (1) the opt-out removes ONLY the selected fill and the pill radius. `only-fill-radius-{pill,tile}`: every
//       computed property of the rest option `a`, the selected option `b` and each one's `::before` (the perimeter
//       layer) in the bare group against the same option in the reference group. Allowed to differ: the four corner
//       longhands (pill only) and background-color (`b` only); `--selection-paint` itself is excluded. Anything else
//       that differs FAILs and is named. Then the same diff with the pointer on `b` (`hover-selected`): the selected
//       hover tint goes, nothing else; and with the pointer on `a` (`hover-rest`): nothing differs but the corner.
//       `focus`: keyboard focus on `b` (focus-visible by an arrow); the ring's outline and box-shadow are the
//       reference's.
//   (2) the 3:1 selection carrier stays somewhere real, or the loss is visible. `carrier-{pill,tile}`: T-3's own
//       read (measure.compare, ≥ 3:1 pixels against the bar of half the perimeter, the 4 px band split out) on
//       `b` against `a`, content hidden, in the bare group and in the reference group. The tile must keep its
//       carrier under `bare`; for each kind, `bare` must pass wherever the reference passes (the opt-out removes no
//       3:1 carrier the library painted).
//   (3) modes: light, dark, PRT, prefers-contrast: more, forced colours (forced: reported per engine as the run
//       verifies it).
//   node crit-l3.mjs --build <L3 route build> [--engine webkit] [--out <dir>]
import { cli, openPage, engineVersion, engineOf, f2, shot, compare, meanRect, contrast, hex } from "../../../harness/lib.mjs";

const NEVER = /^(--selection-paint|transition.*|animation.*)$/;
const SNAP = (cases) => {
  const props = (cs) => { const o = {}; for (let i = 0; i < cs.length; i++) o[cs[i]] = cs.getPropertyValue(cs[i]).trim(); return o; };
  return Object.fromEntries(cases.map((k) => {
    const its = [...document.querySelectorAll(`[data-l3-case="${k}"] [data-item]`)];
    return [k, its.slice(0, 2).map((el) => ({ self: props(getComputedStyle(el)), before: props(getComputedStyle(el, "::before")), rect: (({ x, y, width, height }) => ({ x, y, w: width, h: height }))(el.getBoundingClientRect()), radius: getComputedStyle(el).borderTopLeftRadius, bg: getComputedStyle(el).backgroundColor, outline: `${getComputedStyle(el).outlineStyle} ${getComputedStyle(el).outlineWidth} ${getComputedStyle(el).outlineColor} off ${getComputedStyle(el).outlineOffset}`, shadow: getComputedStyle(el).boxShadow, fv: el.matches(":focus-visible") }))];
  }));
};
/** the properties of `x` that differ from `y`, but those `allow` lets differ */
const diff = (x, y, allow) => Object.keys({ ...x, ...y }).filter((p) => !NEVER.test(p) && !allow(p) && x[p] !== y[p]);

await cli("CRIT-L3", async (args, target) => {
  const engine = engineOf(args), cells = [];
  for (const mode of ["light", "dark", "prt", "contrast", "forced"]) {
    const P = await openPage(target, engine, "l3-migrated", { mode: mode === "contrast" ? "light" : mode });
    let rest, hovB, hovA, foc, carriers = {}, modeOk = P.modeOk, label = P.modeLabel;
    try {
      const { page } = P;
      if (mode === "contrast") { await page.emulateMedia({ contrast: "more" }); modeOk = modeOk && (await page.evaluate(() => matchMedia("(prefers-contrast: more)").matches)); label = "prefers-contrast: more"; }
      await page.locator('[data-l3-case="ref-pill"] [data-item]').nth(1).click();
      await page.mouse.move(2, 2); await page.waitForTimeout(900);
      const C = ["ref-pill", "bare-pill", "ref-tile", "bare-tile"];
      rest = await page.evaluate(SNAP, C);
      const hover = async (kase, k) => { const b = await page.locator(`[data-l3-case="${kase}"] [data-item]`).nth(k).boundingBox(); await page.mouse.move(b.x + b.width / 2, b.y + b.height / 2); await page.waitForTimeout(500); return (await page.evaluate(SNAP, [kase]))[kase][k]; };
      hovB = {}; hovA = {};
      for (const k of C) { hovB[k] = await hover(k, 1); hovA[k] = await hover(k, 0); }
      await page.mouse.move(2, 2); await page.waitForTimeout(400);
      foc = {};
      for (const k of C) {
        const loc = page.locator(`[data-l3-case="${k}"] [data-item]`);
        await loc.nth(1).focus(); await page.keyboard.press("ArrowLeft"); await page.keyboard.press("ArrowRight"); await page.waitForTimeout(700);
        foc[k] = (await page.evaluate(SNAP, [k]))[k][1];
      }
      await page.evaluate(() => document.activeElement?.blur?.());
      await page.mouse.move(2, 2); await page.waitForTimeout(900);
      // T-3's read on each group, content hidden
      await page.addStyleTag({ content: "[data-l3] [data-item] * { visibility: hidden !important; }" });
      await page.waitForTimeout(300);
      const now = await page.evaluate(SNAP, C);
      for (const k of C) {
        const [a, b] = now[k];
        const cl = (o) => ({ x: Math.round(o.rect.x), y: Math.round(o.rect.y), width: Math.floor(Math.min(a.rect.w, b.rect.w)), height: Math.floor(Math.min(a.rect.h, b.rect.h)) });
        const A = await shot(page, cl(b)), B = await shot(page, cl(a));
        const cmp = compare(A, B, null, Math.round(4 * A.dsf)), d2 = A.dsf * A.dsf, c = cl(b);
        const inset = Math.min(6, c.width / 3, c.height / 3), inner = (q) => ({ x: q.x + inset, y: q.y + inset, w: q.width - 2 * inset, h: q.height - 2 * inset });
        const fill = contrast(meanRect(A, inner(cl(b))), meanRect(B, inner(cl(a))));
        const bar = 0.5 * 2 * (c.width + c.height);
        carriers[k] = { area: cmp.c3 / d2, edge: cmp.c3Edge / d2, bar, fill, pass: fill >= 3 || cmp.c3 / d2 >= bar, size: `${c.width}×${c.height}` };
      }
    } finally { await P.close(); }
    const tag = `${label}${modeOk ? "" : " (MODE NOT VERIFIED)"}`;
    if (!modeOk) { cells.push({ gating: mode !== "forced", pass: mode === "forced" ? null : false, line: `${tag} · the mode did not apply in ${engine}: ${mode === "forced" ? "UNMEASURED" : "FAIL"}` }); continue; }
    for (const kind of ["pill", "tile"]) {
      const R = `ref-${kind}`, Bk = `bare-${kind}`;
      const allowA = (p) => kind === "pill" && /radius/.test(p);
      const allowB = (p) => (kind === "pill" && /radius/.test(p)) || p === "background-color";
      const dd = (x, y, allow) => [...diff(x.self, y.self, allow).map((p) => `${p} ${y.self[p]} → ${x.self[p]}`), ...diff(x.before, y.before, (p) => kind === "pill" && /radius/.test(p)).map((p) => `::before ${p} ${y.before[p]} → ${x.before[p]}`)];
      const d = [...dd(rest[Bk][0], rest[R][0], allowA).map((s) => `a: ${s}`), ...dd(rest[Bk][1], rest[R][1], allowB).map((s) => `b: ${s}`)];
      cells.push({ gating: mode !== "forced", pass: d.length === 0 && (mode === "forced" || rest[Bk][1].bg === rest[Bk][0].bg), what: `only-fill-radius-${kind}`, line: `${tag} · only-fill-radius-${kind} · bare vs ref, rest a and selected b and their ::before, every computed property: ${d.length ? `${d.length} OTHER difference(s): ${d.slice(0, 6).join("; ")}` : "only the corner (pill) and b's fill differ"} · bare b fill = bare a fill: ${rest[Bk][1].bg === rest[Bk][0].bg} · b fill ref ${rest[R][1].bg} → bare ${rest[Bk][1].bg} · corners ref ${rest[R][1].radius} → bare ${rest[Bk][1].radius}` });
      const hd = dd(hovB[Bk], hovB[R], allowB), ha = dd(hovA[Bk], hovA[R], allowA);
      const hovBareSame = hovB[Bk].bg === hovA[Bk].bg;
      cells.push({ gating: mode !== "forced", pass: hd.length === 0 && ha.length === 0 && (mode === "forced" || hovBareSame || kind === "tile"), what: `hover-${kind}`, line: `${tag} · hover-${kind} · pointer on b (selected): bare ${hovB[Bk].bg} vs ref ${hovB[R].bg}; pointer on a (rest): bare ${hovA[Bk].bg} vs ref ${hovA[R].bg} · other differences selected ${hd.length ? hd.slice(0, 4).join("; ") : "none"}, rest ${ha.length ? ha.slice(0, 4).join("; ") : "none"}${kind === "pill" ? ` · bare selected-hover = bare rest-hover: ${hovBareSame}` : ""}` });
      const fr = (o) => `${o.outline} · shadow ${o.shadow === "none" ? "none" : o.shadow.slice(0, 60)}`;
      const ringSame = foc[Bk].outline === foc[R].outline && foc[Bk].shadow === foc[R].shadow;
      cells.push({ gating: mode !== "forced", pass: foc[Bk].fv && foc[R].fv && ringSame, what: `focus-${kind}`, line: `${tag} · focus-${kind} · focus-visible bare ${foc[Bk].fv} ref ${foc[R].fv} · bare ring ${fr(foc[Bk])} · ref ring ${fr(foc[R])} · ${ringSame ? "the same ring" : "RING DIFFERS"}` });
      const cr = carriers[R], cb = carriers[Bk];
      const keep = kind === "tile" ? cb.pass : cb.pass || !cr.pass;
      cells.push({ gating: mode !== "forced", pass: keep, what: `carrier-${kind}`, line: `${tag} · carrier-${kind} (T-3's read, b vs a, content hidden) · ref ${f2(cr.area)} px² (band ${f2(cr.edge)}) fill ${f2(cr.fill)}:1 ${cr.pass ? "PASS" : "fail"} · bare ${f2(cb.area)} px² (band ${f2(cb.edge)}) fill ${f2(cb.fill)}:1 ${cb.pass ? "PASS" : "fail"} · bar ${f2(cb.bar)} px² on ${cb.size} · want ${kind === "tile" ? "bare PASS (a tile keeps its carrier)" : "bare PASS wherever ref PASSES (no library carrier removed)"}` });
    }
  }
  return { id: "CRIT-L3", title: "L-3: bare removes only the selected fill and the pill corner; the 3:1 carrier stays where the library painted one (pass-8 CRITIC probe)", engine, engineLabel: await engineVersion(engine), target: target.label, dev: target.meta.dev, cells };
});

#!/usr/bin/env node
// H11: the engine's zoom facts the fixture's cured lens rests on (REPORT only). On the fixture's clipstale scene: the box under
// `zoom: z`; its offsetWidth against its painted width; currentCSSZoom on the box and on a child; `top` and `scrollTop` in which
// px; an anchored fixed element carrying the same zoom, hung by `bottom: anchor(top)` from a zoomed anchor: where its edge lands.
//   node zoomfacts.mjs --fixture [--engine webkit]
const H = "/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/engagement/harness";
const { witness, openPage, f } = await import(`${H}/lib.mjs`);
await witness("H11 zoomfacts", "the engine's zoom facts under the fixture's lens", async ({ E, T, cell, guard }) => {
  for (const z of [0.8, 1.25, 2]) {
    const name = `zoomfacts · ${z}`;
    const r = await guard(name, async () => {
      const P = await openPage(E, T, "clipstale");
      try {
        return await P.page.evaluate((z) => {
          const b = document.querySelector('[data-t="box"]'); const q = document.querySelector('[data-t="slider-a"]'); const root = q.querySelector(".fx-slider") ?? q;
          const r0 = b.getBoundingClientRect(); const top0 = r0.top; b.style.position = "relative"; b.style.zoom = String(z);
          const r1 = b.getBoundingClientRect(); b.style.top = "10px"; const r2 = b.getBoundingClientRect(); b.style.top = "0px";
          const st0 = b.scrollTop; b.scrollTop = 10; const rq0 = q.getBoundingClientRect().top; b.scrollTop = 20; const rq1 = q.getBoundingClientRect().top;
          root.style.anchorName = "--zf"; const L = document.createElement("div"); L.style.cssText = `position:fixed;position-anchor:--zf;bottom:anchor(top);left:anchor(center);width:100px;height:40px;margin-left:-50px;background:red;zoom:${z}`;
          document.body.appendChild(L); const lr = L.getBoundingClientRect(), rr = root.getBoundingClientRect();
          const P2 = document.createElement("span"); P2.style.cssText = "position:fixed;width:0;height:0;position-anchor:--zf;top:anchor(top);left:anchor(center)"; document.body.appendChild(P2); const pr = P2.getBoundingClientRect();
          const tr = document.createElement("div"); tr.style.cssText = `position:fixed;left:0;top:0;width:10px;height:10px;zoom:${z};translate:0 10px`; document.body.appendChild(tr); const trr = tr.getBoundingClientRect();
          return { cz: b.currentCSSZoom, czChild: root.currentCSSZoom, czL: L.currentCSSZoom, csZoom: getComputedStyle(b).zoom, csZoomChild: getComputedStyle(root).zoom, offW: b.offsetWidth, gW: r1.width, w0: r0.width, topMove: r2.top - r1.top, scroll10: rq0 - rq1, st0,
            lensBottomMinusAnchorTop: lr.bottom - rr.top, lensH: lr.height, lensCxMinusAnchorCx: lr.left + lr.width / 2 - (rr.left + rr.width / 2), probeTopMinusAnchorTop: pr.top - rr.top, translate10painted: trr.top, rootOffH: root.offsetHeight, rootGH: rr.height };
        }, z);
      } finally { await P.close(); }
    }, 60000);
    cell(name, "REPORT", r.crashed ? r.line : JSON.stringify(r));
  }
});

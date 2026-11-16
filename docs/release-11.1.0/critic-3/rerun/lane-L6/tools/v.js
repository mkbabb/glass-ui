(() => ["open-v","col-v","open-h","col-square","col-persist"].map(k => {
  const d = document.querySelector(`[data-probe="${k}"] .glass-dock`);
  const cs = getComputedStyle(d);
  const kids = [...d.querySelector(".dock-controls").children].map(c => { const r = c.getBoundingClientRect(); const s = getComputedStyle(c); return [c.className.slice(0,40), r.width, r.height, s.position, s.marginTop, s.marginBottom]; });
  const sum = d.querySelector(".dock-layer--summary"); const sr = sum.getBoundingClientRect();
  return { k, w: d.offsetWidth, h: d.offsetHeight, pad: [cs.paddingTop, cs.paddingRight, cs.paddingBottom, cs.paddingLeft], gap: cs.rowGap,
    lh: cs.getPropertyValue("--dock-layer-height"), pb: cs.getPropertyValue("--dock-padding-block"), pi: cs.getPropertyValue("--dock-padding-inline"), vp: cs.getPropertyValue("--dock-vertical-padding"),
    summary: [sr.width, sr.height], kids,
    seats: [...d.querySelectorAll("button")].slice(0,2).map(b => { const r = b.getBoundingClientRect(); return [r.width, r.height]; }) };
}))()

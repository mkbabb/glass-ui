const BASE = "http://localhost:4599";
const SID = process.argv[2];
const routes = [
    "/display/card","/display/buttons","/forms/inputs","/forms/number-field",
    "/forms/labeled-field","/forms/checks","/forms/toggle","/motion/curve-gallery",
    "/display/surface","/display/atoms","/display/badge","/feedback/progress",
];
async function post(p, body) {
    const r = await fetch(BASE + p, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) });
    return r.json();
}
const PROBE = `
const main = document.querySelector("main") || document.body;
const els = [...main.querySelectorAll("*")];
const vis = els.filter(e => { const r = e.getBoundingClientRect(); return r.width>0 && r.height>0; });
const cn = e => (typeof e.className === "string" ? e.className : (e.className && e.className.baseVal) || "");
// The groove register dropped its \`glass-\` prefix at BK #86+#88 (it declares no
// material), so the census matches it by its own name or the census under-counts.
const G = /(?:glass-(wash|quiet|resting|floating|overlay|card|dock|capsule|chip|defined|pager-ring|deep|control-edge)|\\btrack-well\\b)/;
const glass = vis.filter(e => G.test(cn(e)));
const gs = {};
for (const e of glass) { const s = getComputedStyle(e); const k = cn(e).split(/\\s+/).filter(c=>G.test(c)).join(" ") + " | bf=" + (s.backdropFilter||s.webkitBackdropFilter) + " | r=" + s.borderRadius; gs[k]=(gs[k]||0)+1; }
const t = a => { const m={}; for(const v of a) m[v]=(m[v]||0)+1; return Object.entries(m).sort((x,y)=>y[1]-x[1]); };
return JSON.stringify({
  url: location.pathname, nodes: document.querySelectorAll("*").length,
  scrollW: document.documentElement.scrollWidth, clientW: document.documentElement.clientWidth,
  vw: innerWidth, vh: innerHeight,
  glassCount: glass.length,
  glassNone: glass.filter(e=>{const s=getComputedStyle(e);return (s.backdropFilter||s.webkitBackdropFilter)==="none";}).length,
  glassSummary: Object.entries(gs).sort((a,b)=>b[1]-a[1]).slice(0,10),
  radii: t(vis.map(e=>getComputedStyle(e).borderRadius).filter(v=>v&&v!=="0px")).slice(0,10),
  fonts: t(vis.map(e=>getComputedStyle(e).fontSize)).slice(0,8),
  squircle: CSS.supports("corner-shape: squircle"),
});
`;
await post(`/session/${SID}/window/rect`, { width: 1440, height: 1000, x: 0, y: 0 });
const out = {};
for (const r of routes) {
    await post(`/session/${SID}/url`, { url: "http://localhost:5400" + r });
    await new Promise((z) => setTimeout(z, 2200));
    const res = await post(`/session/${SID}/execute/sync`, { script: PROBE, args: [] });
    try { out[r] = JSON.parse(res.value); } catch { out[r] = { error: JSON.stringify(res).slice(0, 200) }; }
}
console.log(JSON.stringify(out, null, 1));

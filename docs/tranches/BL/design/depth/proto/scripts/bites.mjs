// The bites of W-B.19's gates: each one breaks the thing its gate guards, so the gate
// must read RED on it. Each setup runs in the page after load.
const style = (css) => { const s = document.createElement("style"); s.textContent = css; document.head.append(s); };
export const BITES = {
    // G-COVER: a transform on the heading traps both runs on one side of the figure.
    "transform-heading": () => { document.querySelector(".hero-title").style.transform = "translate(0)"; },
    // G-COVER: the Blob at twice its size.
    "blob-2x": () => { const s = document.createElement("style"); s.textContent = ".hero-blob{inline-size:68cqi !important}"; document.head.append(s); },
    // G-READ: the caption taken off its plate.
    "caption-off-plate": () => { const s = document.createElement("style"); s.textContent = ".caption,.caption::before,.caption::after{background:none !important;backdrop-filter:none !important;-webkit-backdrop-filter:none !important;border-color:transparent !important;box-shadow:none !important}"; document.head.append(s); },
    // G-RATE: the travel set by hand.
    "travel-20lvb": () => { const s = document.createElement("style"); s.textContent = ".depth{--depth-travel:20lvb}"; document.head.append(s); },
    // G-COST: the lag written as top.
    "lag-as-top": () => { const s = document.createElement("style"); s.textContent = "@keyframes depth-lag-top{from{top:calc(-1 * var(--depth-travel))}to{top:var(--depth-travel)}} .depth [data-depth-lag]{animation-name:depth-lag-top !important}"; document.head.append(s); },
    // G-ENDS: the travel squeezed into the part of the pass where the scene is wholly in view.
    "range-contain": () => { const s = document.createElement("style"); s.textContent = ".depth [data-depth-lag]{animation-range:contain !important}"; document.head.append(s); },
    // G-STILL: the animation declared outside the media gate.
    "outside-gate": () => { const s = document.createElement("style"); s.textContent = ".depth [data-depth-lag]{animation:depth-lag linear both;animation-timeline:--depth;animation-range:cover}"; document.head.append(s); },
    // G-NAME, G-SELECT: a second copy of the heading.
    "second-copy": () => { const h = document.querySelector(".hero-title"); const c = h.cloneNode(true); c.setAttribute("aria-hidden", "true"); c.classList.add("copy"); h.after(c); },
    // G-FLOW: a scene with a lagging layer as the last element of the document.
    "last-scene": () => { const p = document.querySelectorAll(".prose"); p[p.length - 1].remove(); document.querySelector(".page").style.paddingBlockEnd = "0"; document.querySelector(".dial").setAttribute("data-depth-lag", ""); },
    // G-RESTRAINT: a second lagging element in one scene.
    "second-lag": () => { document.querySelector(".plate-figure .frame").setAttribute("data-depth-lag", ""); },
};
export const _style = style;

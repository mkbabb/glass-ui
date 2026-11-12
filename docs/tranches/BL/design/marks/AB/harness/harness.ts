// The AB harness page. One page for every candidate; the worktree's `adapter.ts` picks it.
//   ?scene=sheet&shape=underline|highlight&theme=light|dark[&pass=glyph|mark][&hold=1]
//   ?scene=one&shape=...&row=h85|atlas42[&fold=1][&defer=1]   (stall and in-view)
const w = window as unknown as Record<string, any>;

// ── Layout reads, counted at the platform, tagged with the task they ran in ──────────
const reads: { api: string; t: number; phase: string }[] = [];
w.__reads = reads;
w.__phase = "load";
const count = (api: string) => reads.push({ api, t: performance.now(), phase: w.__phase });
function wrapFn(proto: any, name: string, label: string) {
    const orig = proto[name];
    proto[name] = function (...args: unknown[]) {
        count(label);
        return orig.apply(this, args);
    };
}
function wrapGet(proto: any, name: string, label: string) {
    const d = Object.getOwnPropertyDescriptor(proto, name);
    if (!d?.get) return;
    Object.defineProperty(proto, name, { ...d, get() { count(label); return d.get!.call(this); } });
}
wrapFn(Element.prototype, "getBoundingClientRect", "Element.getBoundingClientRect");
wrapFn(Element.prototype, "getClientRects", "Element.getClientRects");
wrapFn(Range.prototype, "getBoundingClientRect", "Range.getBoundingClientRect");
wrapFn(Range.prototype, "getClientRects", "Range.getClientRects");
wrapFn(window, "getComputedStyle", "getComputedStyle");
wrapFn(CanvasRenderingContext2D.prototype, "measureText", "canvas.measureText");
wrapFn(CanvasRenderingContext2D.prototype, "getImageData", "canvas.getImageData");
for (const k of ["offsetWidth", "offsetHeight", "offsetTop", "offsetLeft", "offsetParent"]) wrapGet(HTMLElement.prototype, k, k);
for (const k of ["clientWidth", "clientHeight", "clientTop", "clientLeft", "scrollTop", "scrollLeft", "scrollWidth", "scrollHeight"]) wrapGet(Element.prototype, k, k);

// Task tagging: a callback's reads carry its source, whatever phase was current.
function tagged<T extends (...a: any[]) => any>(fn: T, phase: string): T {
    return function (this: unknown, ...a: any[]) {
        const was = w.__phase;
        w.__phase = w.__phase === "probe" ? "probe" : phase;
        try { return fn.apply(this, a); } finally { w.__phase = was; }
    } as T;
}
const IO = window.IntersectionObserver;
w.IntersectionObserver = class extends IO { constructor(cb: IntersectionObserverCallback, o?: IntersectionObserverInit) { super(tagged(cb, "io-callback"), o); } };
const RO = window.ResizeObserver;
w.ResizeObserver = class extends RO { constructor(cb: ResizeObserverCallback) { super(tagged(cb, "ro-callback")); } };
const rAF = window.requestAnimationFrame.bind(window);
w.requestAnimationFrame = (cb: FrameRequestCallback) => rAF(tagged(cb, "raf"));
const sT = window.setTimeout.bind(window);
w.setTimeout = (cb: any, ms?: number, ...a: any[]) => sT(typeof cb === "function" ? tagged(cb, "timer") : cb, ms, ...a);

// ── The draw's window, on the page clock and in the trace ─────────────────────────────
const draw = { start: null as number | null, drawn: [] as number[], starts: 0, ends: 0, names: new Set<string>() };
w.__draw = draw;
document.addEventListener("animationstart", (e) => {
    if (!(e.target as Element).closest?.("[data-probe]")) return;
    draw.starts++;
    draw.names.add(e.animationName);
    if (draw.start === null) { draw.start = performance.now(); performance.mark("ab-draw-start"); }
}, true);
document.addEventListener("animationend", (e) => {
    if (!(e.target as Element).closest?.("[data-probe]")) return;
    draw.ends++;
}, true);

const params = new URLSearchParams(location.search);
const scene = params.get("scene") ?? "sheet";
const shape = (params.get("shape") ?? "underline") as "underline" | "highlight";
document.documentElement.classList.toggle("dark", params.get("theme") === "dark");
if (params.get("pass")) document.documentElement.dataset.pass = params.get("pass")!;

const pm = document.createElement("div");
pm.id = "pm";
document.body.appendChild(pm);
w.__marker = (c: string) => (pm.style.background = c);

async function main() {
    await import("./harness.css");
    const A = await import("./adapter");
    w.__candidate = A.name;
    const extra = document.createElement("style");
    extra.textContent =
        (params.get("pass") === "glyph" ? A.hideCSS : "") +
        (params.get("hold") === "1" ? `${A.animSel}{animation-play-state:paused!important}` : "");
    document.head.appendChild(extra);
    w.__animSel = A.animSel;
    await Promise.all([
        document.fonts.load('800 85px "PJS AB"', "4,485"),
        document.fonts.load('700 21px "PJS AB"', "Library"),
        document.fonts.load('500 22px "PJS AB"', "Attendance"),
        document.fonts.load('400 16px "PJS AB"', "Wake County Google"),
    ]);
    w.__face = document.fonts.check('800 85px "PJS AB"') && document.fonts.check('400 16px "PJS AB"');
    const { createApp, h, ref } = await import("vue");
    const { Rows, One } = await import("./rows");
    const onDrawn = () => {
        draw.drawn.push(performance.now());
        performance.mark("ab-drawn");
        if (scene === "one") pm.style.background = "rgb(0, 200, 0)";
    };
    const mounted = ref(params.get("defer") !== "1");
    w.__mount = () => {
        w.__phase = "mount";
        performance.mark("ab-mount");
        mounted.value = true;
        // Vue patches in a microtask; the mount task ends when the next task starts.
        sT(() => { if (w.__phase === "mount") w.__phase = "idle"; }, 0);
    };
    if (scene === "one") {
        const ctl = document.createElement("div");
        ctl.id = "ctl";
        document.body.appendChild(ctl);
    }
    const App =
        scene === "one"
            ? () => h(One, { shape, row: params.get("row") ?? "h85", fold: params.get("fold") === "1", mounted: mounted.value, onDrawn })
            : () => h(Rows, { shape, onDrawn });
    w.__phase = "mount";
    performance.mark("ab-mount");
    createApp(App).mount("#app");
    sT(() => { if (w.__phase === "mount") w.__phase = "idle"; }, 0);
    rAF(() => rAF(() => (w.__ready = true)));
}
void main();

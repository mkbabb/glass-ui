// G-API's render half and G-EXPORT's planted series, without a browser.
import { createServer } from "vite";
const server = await createServer({ configFile: false, server: { middlewareMode: true, hmr: false, ws: false }, appType: "custom", logLevel: "error", root: new URL("../../..", import.meta.url).pathname });
const out = {};
try {
    const vue = await import("vue");
    const { renderToString } = await import("vue/server-renderer");
    const { Presence } = await server.ssrLoadModule("/src/composables/motion/presence/index.ts");
    const { h } = vue;
    const forms = {
        plain: () => h(Presence, null, { default: () => h("p", { id: "x" }, "a") }),
        swap: () => h(Presence, { swap: true }, { default: () => h("p", { id: "x" }, "a") }),
        plainBite_tag: () => h(vue.TransitionGroup, { tag: "div", name: "presence" }, { default: () => [h("p", { id: "x", key: 1 }, "a")] }),
    };
    for (const [k, f] of Object.entries(forms)) out[k] = await renderToString(vue.createSSRApp({ render: f }));
    const ns = await server.ssrLoadModule("/src/testing/no-snap/index.ts");
    const mk = (vals, opts = {}) => {
        const n = vals.length;
        const frames = vals.map((v, k) => ({ t: k * 16.7, phase: 0, progress: [opts.progress ? opts.progress[k] : k / (n - 1)], read: { "#a": { present: opts.goneAt == null || k < opts.goneAt, values: { opacity: String(v) } } } }));
        return { rest: { "#a": { present: true, values: { opacity: String(opts.rest ?? vals[0]) } } }, end: { "#a": { present: opts.endPresent ?? true, values: { opacity: String(opts.end ?? vals[n - 1]) } } },
            frames: opts.noAnim ? [] : frames, animations: opts.noAnim ? [] : [{ target: "p", matches: ["#a"], properties: ["opacity"], duration: 200, delay: 0, easing: "linear", kind: "CSSTransition", phase: 0, infinite: false }], stillRects: {}, properties: ["opacity"], step: 16.7 };
    };
    const lin = [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1];
    out.plants = {
        control: ns.judgeChange(mk(lin)).pass,
        cut: ns.judgeChange(mk([], { noAnim: true, rest: 0, end: 1 })).pass,
        firstOffRest: ns.judgeChange(mk([0.75, 0.8, 0.85, 0.9, 1], { rest: 0 })).pass,
        halfStep: ns.judgeChange(mk([0, 0.05, 0.1, 0.6, 0.7, 0.8, 0.9, 1], { progress: [0, 1 / 7, 2 / 7, 3 / 7, 4 / 7, 5 / 7, 6 / 7, 1] })).pass,
        removedEarly: ns.judgeChange(mk([1, 0.8, 0.6, 0.4, 0.2, 0], { goneAt: 2, endPresent: false })).pass,
    };
} finally {
    await server.close();
}
console.log(JSON.stringify(out, null, 1));

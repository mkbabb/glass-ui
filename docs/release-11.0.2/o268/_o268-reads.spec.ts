// O-268: inside the fold's morph frames, the order of style writes and layout reads, with
// the calling source location of each, for three consecutive frames mid-morph.
import { test } from "@playwright/test";
test("probe · reads and writes per morph frame", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.addInitScript(() => {
        const w = window as any;
        w.__log = [];
        w.__on = false;
        const site = () => {
            const s = (new Error().stack ?? "").split("\n").slice(3, 6).map((l) => l.replace(/^\s*at\s*/, "").replace(/https?:\/\/[^/]+\//, "").replace(/\?[^:)]*/, "")).join(" < ");
            return s;
        };
        const wrapGetter = (proto: any, key: string) => {
            const d = Object.getOwnPropertyDescriptor(proto, key)!;
            Object.defineProperty(proto, key, { ...d, get() { if (w.__on) w.__log.push(`R ${key} ${site()}`); return d.get!.call(this); } });
        };
        for (const k of ["offsetWidth", "offsetHeight", "offsetLeft", "offsetTop"]) wrapGetter(HTMLElement.prototype, k);
        for (const k of ["scrollWidth", "scrollHeight", "clientWidth", "clientHeight", "scrollLeft"]) wrapGetter(Element.prototype, k);
        const gbcr = Element.prototype.getBoundingClientRect;
        Element.prototype.getBoundingClientRect = function () { if (w.__on) w.__log.push(`R gBCR ${site()}`); return gbcr.call(this); };
        const sp = CSSStyleDeclaration.prototype.setProperty;
        CSSStyleDeclaration.prototype.setProperty = function (p: string, v: string, pr?: string) { if (w.__on) w.__log.push(`W ${p}=${String(v).slice(0, 12)} ${site()}`); return sp.call(this, p, v, pr ?? ""); };
        const gcs = window.getComputedStyle;
        window.getComputedStyle = function (e: Element, p?: string | null) { if (w.__on) w.__log.push(`R gCS ${site()}`); return gcs.call(window, e, p); } as any;
        const raf = window.requestAnimationFrame.bind(window);
        const ro = window.ResizeObserver;
        window.ResizeObserver = class extends ro { constructor(cb: ResizeObserverCallback) { super((e, o) => { if (w.__on) w.__log.push(`-- RO ${e.map((x) => `${(x.target.className || x.target.tagName).toString().slice(0, 60)} ${Math.round(x.contentRect.width * 10) / 10}x${Math.round(x.contentRect.height * 10) / 10}`).join(" | ")}`); cb(e, o); }); } } as any;
        const frame = () => { if (w.__on) w.__log.push("== frame"); raf(frame); };
        raf(frame);
    });
    await page.goto("/tests-visual/release-11-0-2/fold-harness.html");
    await page.locator("body[data-ready='1'] .fold-dock").waitFor();
    await page.waitForFunction(() => document.querySelector(".glass-dock")!.hasAttribute("data-morphing"), null, { timeout: 8000, polling: "raf" });
    await page.waitForTimeout(120);
    await page.evaluate(() => ((window as any).__on = true));
    await page.waitForTimeout(40);
    const log: string[] = await page.evaluate(() => { (window as any).__on = false; return (window as any).__log; });
    const first = log.indexOf("== frame");
    const frames = log.slice(first).join("\n").split("== frame").slice(1, 4);
    frames.forEach((f, i) => console.log(`FRAME ${i}\n${f.trim()}`));
});

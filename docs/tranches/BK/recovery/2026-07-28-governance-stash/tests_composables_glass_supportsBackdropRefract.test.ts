// Direct bounded lifecycle tests for the `.glass-lens` refraction latch
// (BJ.W-REFRACT-LATCH / I-2 + I-3). Two reproduced defects are pinned born-RED:
//
//   (a) a stale root `data-glass-refract="on"` SURVIVES an honest rejection, a
//       functional negative, and every exception — the installer was not fail-closed;
//   (b) a throwing `CSS.supports` ESCAPED `armGlassRefract`, marked the module
//       `armed=true` (suppressing the next call), and left the stale `on` behind.
//
// The cure makes the installer TOTAL / FAIL-CLOSED (every terminal state strips a stale
// latch; a throw never latches `armed`) and gives the probe a COLLISION-PROOF
// per-invocation SVG-filter id (a preseeded old-fixed-id element cannot steer the
// verdict; the probe leaves no node behind).
//
// happy-dom is the "always-true shim" engine class (`CSS.supports` returns true for
// every value, `getImageData` is absent), so each path is driven by an explicit
// `CSS.supports` stub + a fake canvas context. `armed` is module-scoped, so tests that
// exercise it re-import the module fresh (`vi.resetModules()`).

import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const REFRACT_ATTR = "data-glass-refract";
const OLD_FIXED_ID = "gl-refract-probe";
const SVG_NS = "http://www.w3.org/2000/svg";

type Mod = typeof import("@glass/composables/glass/supportsBackdropRefract");

/** Fresh module instance with `armed` reset to false. */
async function loadFresh(): Promise<Mod> {
    vi.resetModules();
    return import("@glass/composables/glass/supportsBackdropRefract");
}

// --- CSS.supports drivers -------------------------------------------------------
const REJECT = () => false; // honest rejection: the engine denies url() support
const ALWAYS_TRUE = () => true; // happy-dom/jsdom shim: true for every value
const REAL = (_prop: string, value: string) => value.includes("glass-refract"); // url ✓, garbage ✗
const THROWS = (): boolean => {
    throw new Error("CSS.supports boom");
};

function setSupports(fn: (prop: string, value: string) => boolean): void {
    (CSS as unknown as { supports: unknown }).supports = fn;
}

// --- Fake canvas context --------------------------------------------------------
type Pixel = [number, number, number, number];
const RED: Pixel = [255, 0, 0, 255]; // Chromium ran the url() filter
const BLUE: Pixel = [0, 0, 255, 255]; // WebKit dropped it (accept-and-drop)

interface CanvasOpts {
    pixel?: Pixel;
    getImageDataThrows?: boolean;
    filters?: string[]; // capture sink for every `ctx.filter =` assignment
    calls?: { n: number }; // getContext invocation counter
}

function installCanvas(opts: CanvasOpts): void {
    HTMLCanvasElement.prototype.getContext = vi.fn(() => {
        if (opts.calls) opts.calls.n++;
        let filter = "none";
        return {
            fillStyle: "",
            fillRect: () => {},
            get filter() {
                return filter;
            },
            set filter(value: string) {
                filter = value;
                opts.filters?.push(value);
            },
            getImageData: () => {
                if (opts.getImageDataThrows) throw new Error("getImageData boom");
                const [r, g, b, a] = opts.pixel ?? [0, 0, 0, 0];
                return { data: new Uint8ClampedArray([r, g, b, a]) };
            },
        } as unknown as CanvasRenderingContext2D;
    }) as unknown as typeof HTMLCanvasElement.prototype.getContext;
}

let origGetContext: typeof HTMLCanvasElement.prototype.getContext;
let origSupports: unknown;

beforeEach(() => {
    origGetContext = HTMLCanvasElement.prototype.getContext;
    origSupports = (CSS as unknown as { supports: unknown }).supports;
    document.documentElement.removeAttribute(REFRACT_ATTR);
    document.body.innerHTML = "";
});

afterEach(() => {
    HTMLCanvasElement.prototype.getContext = origGetContext;
    (CSS as unknown as { supports: unknown }).supports = origSupports;
    document.documentElement.removeAttribute(REFRACT_ATTR);
    document.body.innerHTML = "";
    vi.unstubAllGlobals();
});

describe("supportsBackdropRefract — detector honesty ordering", () => {
    it("SSR / no document → false + no mutation", async () => {
        // Stale latch preseeded on the real root; an SSR install must not touch it.
        document.documentElement.setAttribute(REFRACT_ATTR, "on");
        const realDoc = document;
        vi.stubGlobal("document", undefined);

        const mod = await loadFresh();
        expect(mod.supportsBackdropRefract()).toBe(false);
        expect(() => mod.armGlassRefract()).not.toThrow();

        vi.unstubAllGlobals();
        // document was undefined → the installer returned early, mutating nothing.
        expect(realDoc.documentElement.getAttribute(REFRACT_ATTR)).toBe("on");
    });

    it("honest CSS rejection → false, without touching the probe", async () => {
        setSupports(REJECT);
        const calls = { n: 0 };
        installCanvas({ pixel: RED, calls });
        const mod = await loadFresh();

        expect(mod.supportsBackdropRefract()).toBe(false);
        expect(calls.n).toBe(0); // short-circuited before the raster probe
    });

    it("always-true shim (happy-dom/jsdom class) → false, without touching the probe", async () => {
        setSupports(ALWAYS_TRUE);
        const calls = { n: 0 };
        installCanvas({ pixel: RED, calls });
        const mod = await loadFresh();

        expect(mod.supportsBackdropRefract()).toBe(false);
        expect(calls.n).toBe(0); // the invalid-value guard rejects the shim
    });

    it("functional positive (raster ran the url() filter) → true", async () => {
        setSupports(REAL);
        installCanvas({ pixel: RED });
        const mod = await loadFresh();

        expect(mod.supportsBackdropRefract()).toBe(true);
    });

    it("functional negative (accept-and-drop) → false", async () => {
        setSupports(REAL);
        installCanvas({ pixel: BLUE });
        const mod = await loadFresh();

        expect(mod.supportsBackdropRefract()).toBe(false);
    });

    it("probe exception (getImageData throws) → false, no throw escapes", async () => {
        setSupports(REAL);
        installCanvas({ getImageDataThrows: true });
        const mod = await loadFresh();

        expect(() => mod.supportsBackdropRefract()).not.toThrow();
        expect(mod.supportsBackdropRefract()).toBe(false);
    });
});

describe("armGlassRefract — total / fail-closed installer", () => {
    it("functional positive → sets the root latch on", async () => {
        setSupports(REAL);
        installCanvas({ pixel: RED });
        const mod = await loadFresh();

        mod.armGlassRefract();
        expect(document.documentElement.getAttribute(REFRACT_ATTR)).toBe("on");
    });

    it("born-RED (a): functional negative STRIPS a stale root `on`", async () => {
        document.documentElement.setAttribute(REFRACT_ATTR, "on"); // stale
        setSupports(REAL);
        installCanvas({ pixel: BLUE });
        const mod = await loadFresh();

        mod.armGlassRefract();
        // Old installer left the stale `on` (no removeAttribute on the negative arm).
        expect(document.documentElement.hasAttribute(REFRACT_ATTR)).toBe(false);
    });

    it("honest rejection STRIPS a stale root `on`", async () => {
        document.documentElement.setAttribute(REFRACT_ATTR, "on");
        setSupports(REJECT);
        installCanvas({ pixel: RED });
        const mod = await loadFresh();

        mod.armGlassRefract();
        expect(document.documentElement.hasAttribute(REFRACT_ATTR)).toBe(false);
    });

    it("born-RED (b): throwing CSS.supports → no throw, latch off, module NOT armed (retryable)", async () => {
        document.documentElement.setAttribute(REFRACT_ATTR, "on"); // stale
        setSupports(THROWS);
        installCanvas({ pixel: RED });
        const mod = await loadFresh();

        // Old installer let the throw escape (armed was set BEFORE the throwing probe).
        expect(() => mod.armGlassRefract()).not.toThrow();
        expect(document.documentElement.hasAttribute(REFRACT_ATTR)).toBe(false);

        // Not suppressed by a half-armed module: once the engine stops throwing, a
        // later call arms honestly (the old `armed=true`-before-throw blocked this).
        setSupports(REAL);
        mod.armGlassRefract();
        expect(document.documentElement.getAttribute(REFRACT_ATTR)).toBe("on");
    });

    it("stale `on` is stripped on the FIRST and every REPEATED exception call", async () => {
        setSupports(THROWS);
        installCanvas({ pixel: RED });
        const mod = await loadFresh();

        document.documentElement.setAttribute(REFRACT_ATTR, "on");
        expect(() => mod.armGlassRefract()).not.toThrow();
        expect(document.documentElement.hasAttribute(REFRACT_ATTR)).toBe(false);

        // Re-seed and call again: the throw path never latches `armed`, so the repeat
        // re-runs and strips again rather than being suppressed.
        document.documentElement.setAttribute(REFRACT_ATTR, "on");
        expect(() => mod.armGlassRefract()).not.toThrow();
        expect(document.documentElement.hasAttribute(REFRACT_ATTR)).toBe(false);
    });

    it("one effective install: repeated ready calls probe + mount exactly once, no node leak", async () => {
        setSupports(REAL);
        const calls = { n: 0 };
        installCanvas({ pixel: RED, calls });
        const mod = await loadFresh();

        const svgBefore = document.body.querySelectorAll("svg").length;
        mod.armGlassRefract();
        mod.armGlassRefract();
        mod.armGlassRefract();

        expect(calls.n).toBe(1); // idempotent: one probe despite three calls
        expect(document.documentElement.getAttribute(REFRACT_ATTR)).toBe("on");
        expect(document.body.querySelectorAll("svg").length).toBe(svgBefore); // probe left nothing
    });

    it("DOM-ready deferral: two pre-body calls → one effective probe after DOMContentLoaded", async () => {
        setSupports(REAL);
        const calls = { n: 0 };
        installCanvas({ pixel: RED, calls });
        const mod = await loadFresh();

        const bodySpy = vi.spyOn(document, "body", "get").mockReturnValue(null as never);
        mod.armGlassRefract();
        mod.armGlassRefract();
        expect(calls.n).toBe(0); // deferred — nothing probed before readiness
        expect(document.documentElement.hasAttribute(REFRACT_ATTR)).toBe(false);

        bodySpy.mockRestore();
        document.dispatchEvent(new Event("DOMContentLoaded"));

        expect(calls.n).toBe(1); // one effective probe despite two once-listeners
        expect(document.documentElement.getAttribute(REFRACT_ATTR)).toBe("on");

        mod.armGlassRefract(); // post-readiness repeat is a no-op
        expect(calls.n).toBe(1);
    });
});

describe("collision-proof per-invocation probe id", () => {
    it("preseeded old-fixed-id cannot steer; ids are unique per call; probe leaves no node", async () => {
        setSupports(REAL);
        const filters: string[] = [];
        installCanvas({ pixel: RED, filters });

        // Preseed a filter under the OLD fixed id — the steering hazard the fix closes.
        const seededSvg = document.createElementNS(SVG_NS, "svg");
        const seededFilter = document.createElementNS(SVG_NS, "filter");
        seededFilter.setAttribute("id", OLD_FIXED_ID);
        seededSvg.appendChild(seededFilter);
        document.body.appendChild(seededSvg);
        const svgBefore = document.body.querySelectorAll("svg").length; // 1 (the seed)

        const mod = await loadFresh();
        mod.supportsBackdropRefract();
        mod.supportsBackdropRefract();

        // Two invocations → two DISTINCT ids, neither the steerable fixed string.
        expect(filters).toHaveLength(2);
        expect(filters[0]).not.toBe(filters[1]);
        for (const f of filters) {
            expect(f).not.toBe(`url("#${OLD_FIXED_ID}")`);
            expect(f).toMatch(/^url\("#gl-refract-probe-/);
        }

        // The preseeded fixed-id node is untouched; the probe left nothing behind.
        expect(document.body.contains(seededSvg)).toBe(true);
        expect(seededFilter.getAttribute("id")).toBe(OLD_FIXED_ID);
        expect(document.body.querySelectorAll("svg").length).toBe(svgBefore);
    });
});

describe("exported API / side-effect shape survives the package build", () => {
    it("root barrel exports both, with the void/boolean side-effect shape", async () => {
        vi.resetModules();
        const Glass = await import("@glass/index");

        expect(typeof Glass.armGlassRefract).toBe("function");
        expect(typeof Glass.supportsBackdropRefract).toBe("function");
        expect(Glass.armGlassRefract.length).toBe(0);
        expect(Glass.supportsBackdropRefract.length).toBe(0);

        setSupports(REAL);
        installCanvas({ pixel: RED });
        expect(Glass.supportsBackdropRefract()).toBe(true); // boolean
        expect(Glass.armGlassRefract()).toBeUndefined(); // void
    });

    it("emitted package declaration still carries both signatures", () => {
        const dts = readFileSync(
            resolve(
                process.cwd(),
                "dist/composables/glass/supportsBackdropRefract.d.ts",
            ),
            "utf8",
        );
        expect(dts).toMatch(/export declare function supportsBackdropRefract\(\): boolean/);
        expect(dts).toMatch(/export declare function armGlassRefract\(\): void/);
    });
});

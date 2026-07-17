// Proof:resolve-canvas-color.
//
// The runtime/readback contract for `resolveCanvasColor`, the shared
// `light-dark()`→`rgb()` probe-span resolver for a Canvas2D `strokeStyle`/
// `fillStyle` write. The DEFECT it solves: Canvas2D SILENTLY REJECTS a
// `light-dark()`/`color-mix()`/`var()` color handed to a `ctx` setter (the
// channel keeps its prior value — black/transparent at init), so a raw
// `getComputedStyle(host).getPropertyValue("--foreground")` read of such a token
// paints BLACK, not the resolved hue. The resolver forces the browser to
// evaluate the chain on a transient inert probe appended INTO the cascade at
// `el`, reads `getComputedStyle(probe).color` (the concrete `rgb()`), removes the
// probe, and returns the canvas-valid string.
//
// happy-dom provides a real DOM but does NOT run a full CSS cascade engine
// (`getComputedStyle` does not resolve `light-dark()`/`var()` to a concrete
// `rgb()`), so this test MOCKS `getComputedStyle` to simulate the browser's
// resolution while exercising the resolver's REAL probe lifecycle (createElement
// → appendChild → read `.color` → removeChild) against happy-dom's live DOM. The
// TRUE light/dark `rgb()` paint readback is the π-lane VISUAL-TRUTH audit.

import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { resolveCanvasColor } from "@glass/composables/glass/canvas2d/resolveCanvasColor";

// The browser's resolution of a candidate `color:` value → a concrete `rgb()`.
// A `light-dark()` token flips with the simulated scheme; `var()` tokens map to
// a fixed table; a literal color passes through. This is what a REAL
// `getComputedStyle(probe).color` returns after the cascade evaluates.
let scheme: "light" | "dark";
function simulateBrowserResolution(candidate: string): string {
    if (candidate === "var(--foreground)" || candidate.includes("light-dark(")) {
        return scheme === "dark" ? "rgb(250, 250, 249)" : "rgb(28, 25, 23)";
    }
    if (candidate === "var(--primary)") return "rgb(41, 37, 36)";
    if (candidate.includes("color-mix(")) return "rgba(28, 25, 23, 0.4)";
    if (/^rgb/.test(candidate) || /^#/.test(candidate)) return candidate;
    // An unresolvable candidate (typo'd token, unsupported fn) → the engine
    // leaves `color` at its initial value (the rejection the helper guards).
    return "";
}

// The candidate value the resolver last wrote onto a probe's `style.color`. We
// record it at the SETTER because happy-dom's CSSOM (stricter than a real
// browser) DROPS a value it cannot parse (`light-dark()`/`color-mix()`), so a
// post-write read of `probe.style.color` would be `""` even though a real
// browser would hold + resolve it. Recording the candidate the resolver
// ATTEMPTED to set is the faithful simulation of the browser cascade.
const probeCandidate = new WeakMap<HTMLElement, string>();

let realGetComputedStyle: typeof window.getComputedStyle;
let realCreateElement: typeof document.createElement;

beforeEach(() => {
    scheme = "light";
    realGetComputedStyle = window.getComputedStyle;
    realCreateElement = document.createElement.bind(document);

    // Wrap createElement so a probe `<span>`'s `style.color` setter records the
    // RAW candidate (the value a real browser would hold), regardless of whether
    // happy-dom's CSSOM keeps it.
    vi.spyOn(document, "createElement").mockImplementation(((
        tag: string,
        ...rest: unknown[]
    ) => {
        const el = realCreateElement(tag, ...(rest as []));
        if (tag === "span") {
            const realStyle = el.style;
            const colorSetter = (v: string) => probeCandidate.set(el, v);
            Object.defineProperty(el.style, "color", {
                configurable: true,
                get: () => probeCandidate.get(el) ?? "",
                set: colorSetter,
            });
            void realStyle;
        }
        return el;
    }) as typeof document.createElement);

    // getComputedStyle resolves the recorded candidate through the simulated
    // cascade — exactly what a real `getComputedStyle(probe).color` returns.
    vi.spyOn(window, "getComputedStyle").mockImplementation(
        (el: Element) =>
            ({
                color: simulateBrowserResolution(
                    probeCandidate.get(el as HTMLElement) ?? "",
                ),
            }) as unknown as CSSStyleDeclaration,
    );
});

afterEach(() => {
    vi.restoreAllMocks();
    window.getComputedStyle = realGetComputedStyle;
});

describe("resolveCanvasColor — the light-dark()→rgb() probe-span resolver", () => {
    it("resolves a bare --token to a canvas-valid rgb() (the actual defect)", () => {
        const host = document.createElement("div");
        document.body.appendChild(host);

        // The raw read a buggy consumer would do: a `light-dark()` --foreground
        // token handed straight to ctx → rejected → black. The resolver fixes it.
        const resolved = resolveCanvasColor("--foreground", host);
        expect(resolved).toBe("rgb(28, 25, 23)");
        // It is NOT the raw, Canvas2D-rejected token.
        expect(resolved).not.toContain("--foreground");
        expect(resolved).not.toContain("light-dark");

        document.body.removeChild(host);
    });

    it("flips with the color-scheme — light vs dark resolve to different rgb()", () => {
        const host = document.createElement("div");
        document.body.appendChild(host);

        scheme = "light";
        const light = resolveCanvasColor("--foreground", host);
        scheme = "dark";
        const dark = resolveCanvasColor("--foreground", host);

        expect(light).toBe("rgb(28, 25, 23)");
        expect(dark).toBe("rgb(250, 250, 249)");
        expect(light).not.toBe(dark);

        document.body.removeChild(host);
    });

    it("resolves a raw light-dark() value (not just a --token name)", () => {
        const host = document.createElement("div");
        document.body.appendChild(host);
        const resolved = resolveCanvasColor(
            "light-dark(rgb(28,25,23), rgb(250,250,249))",
            host,
        );
        expect(resolved).toBe("rgb(28, 25, 23)");
        document.body.removeChild(host);
    });

    it("resolves a color-mix() to an rgba() string", () => {
        const host = document.createElement("div");
        document.body.appendChild(host);
        const resolved = resolveCanvasColor(
            "color-mix(in srgb, var(--foreground) 40%, transparent)",
            host,
        );
        expect(resolved).toBe("rgba(28, 25, 23, 0.4)");
        document.body.removeChild(host);
    });

    it("appends a transient inert probe and removes it (no live-element mutation)", () => {
        const host = document.createElement("div");
        document.body.appendChild(host);
        const before = host.childElementCount;
        const appendSpy = vi.spyOn(host, "appendChild");
        const removeSpy = vi.spyOn(host, "removeChild");

        resolveCanvasColor("--primary", host);

        // The probe was appended INTO `el` (so it inherits el's cascade) and
        // removed — host is left at its prior child count, never mutated.
        expect(appendSpy).toHaveBeenCalledTimes(1);
        expect(removeSpy).toHaveBeenCalledTimes(1);
        expect(host.childElementCount).toBe(before);
        // The host's own inline color is untouched (the slice-28 boundary —
        // a token READER, never a writer on the live element).
        expect(host.style.color).toBe("");

        document.body.removeChild(host);
    });

    it("passes a literal color straight through", () => {
        const host = document.createElement("div");
        document.body.appendChild(host);
        expect(resolveCanvasColor("rgb(10, 20, 30)", host)).toBe("rgb(10, 20, 30)");
        document.body.removeChild(host);
    });

    it("falls back befitting-silent on an unresolvable candidate", () => {
        const host = document.createElement("div");
        document.body.appendChild(host);
        // The simulated cascade returns "" (the rejection) → the resolver returns
        // the input unchanged, so the consumer is no worse off than the raw read.
        const resolved = resolveCanvasColor("--does-not-exist", host);
        expect(resolved).toBe("--does-not-exist");
        document.body.removeChild(host);
    });

    it("is SSR-safe — no document → returns the input unchanged (befitting-silent)", () => {
        const realDoc = globalThis.document;
        // Simulate SSR: no document. The resolver must NOT throw; it returns the
        // input (the documented no-DOM fallback), never a library-internal throw.
        vi.stubGlobal("document", undefined);
        expect(() =>
            resolveCanvasColor("--foreground", null as unknown as HTMLElement),
        ).not.toThrow();
        expect(resolveCanvasColor("--foreground", null as unknown as HTMLElement)).toBe(
            "--foreground",
        );
        vi.stubGlobal("document", realDoc);
    });
});

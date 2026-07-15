import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { useTextHighlight } from "@glass/composables/motion/useTextHighlight";
import { mountComposable } from "../../utils/mountComposable";

// Minimal stand-ins for the CSS Custom Highlight API. The global `CSS` stub in
// tests/setup.ts only carries `supports`, so the unsupported path is the default;
// the supported tests install these and tear them down afterward.
class StubHighlight {
    ranges = new Set<Range>();
    add(range: Range) { this.ranges.add(range); }
    clear() { this.ranges.clear(); }
    get size() { return this.ranges.size; }
}

function installHighlightApi(): Map<string, StubHighlight> {
    const registry = new Map<string, StubHighlight>();
    (CSS as unknown as { highlights: Map<string, StubHighlight> }).highlights = registry;
    (globalThis as unknown as { Highlight: typeof StubHighlight }).Highlight = StubHighlight;
    return registry;
}

function uninstallHighlightApi(): void {
    delete (CSS as unknown as { highlights?: unknown }).highlights;
    delete (globalThis as unknown as { Highlight?: unknown }).Highlight;
}

describe("useTextHighlight", () => {
    describe("feature detection", () => {
        afterEach(uninstallHighlightApi);

        it("reports unsupported and no-ops when CSS.highlights is absent", () => {
            const { result, unmount } = mountComposable(() => useTextHighlight("t"));

            expect(result.supported).toBe(false);
            // Every op is safe to call and registers nothing.
            expect(() => {
                result.set([document.createRange()]);
                result.clear();
            }).not.toThrow();

            unmount();
        });

        it("reports supported once the API is installed", () => {
            installHighlightApi();
            const { result, unmount } = mountComposable(() => useTextHighlight("t"));
            expect(result.supported).toBe(true);
            unmount();
        });

        it("leaves paint CSS to the caller", () => {
            installHighlightApi();
            const before = document.head.children.length;
            const { unmount } = mountComposable(() => useTextHighlight("custom"));
            expect(document.head.children).toHaveLength(before);
            unmount();
        });
    });

    describe("set / clear (supported)", () => {
        let registry: Map<string, StubHighlight>;

        beforeEach(() => { registry = installHighlightApi(); });
        afterEach(uninstallHighlightApi);

        it("registers a named Highlight and replaces its range set on set()", () => {
            const { result, unmount } = mountComposable(() => useTextHighlight("search"));

            // Lazy: no registry entry until the first set().
            expect(registry.has("search")).toBe(false);

            result.set([document.createRange(), document.createRange()]);
            expect(registry.get("search")?.size).toBe(2);

            // A second set() replaces, not appends.
            result.set([document.createRange()]);
            expect(registry.get("search")?.size).toBe(1);

            unmount();
        });

        it("clear() empties the range set but keeps the registry entry", () => {
            const { result, unmount } = mountComposable(() => useTextHighlight("search"));

            result.set([document.createRange()]);
            result.clear();
            expect(registry.get("search")?.size).toBe(0);

            unmount();
        });

        it("setFromMatches() highlights each matched substring span", () => {
            const host = document.createElement("div");
            host.textContent = "alpha beta alpha";
            document.body.appendChild(host);

            const { result, unmount } = mountComposable(() => useTextHighlight("search"));
            result.setFromMatches(host, "alpha");

            // Two occurrences of "alpha" → two ranges.
            expect(registry.get("search")?.size).toBe(2);

            host.remove();
            unmount();
        });

        it("drops the registry entry on scope dispose", () => {
            const { result, unmount } = mountComposable(() => useTextHighlight("search"));
            result.set([document.createRange()]);
            expect(registry.has("search")).toBe(true);

            unmount();
            expect(registry.has("search")).toBe(false);
        });
    });

    // A name IS a paint identity (one `::highlight(<name>)` rule, no wildcard),
    // so two surfaces sharing a name must MULTIPLEX their ranges under one
    // shared Highlight rather than clobber each other.
    describe("multi-instance (shared name multiplexing)", () => {
        let registry: Map<string, StubHighlight>;

        beforeEach(() => { registry = installHighlightApi(); });
        afterEach(uninstallHighlightApi);

        it("unions both instances' ranges under one shared Highlight", () => {
            const a = mountComposable(() => useTextHighlight("shared"));
            const b = mountComposable(() => useTextHighlight("shared"));

            a.result.set([document.createRange(), document.createRange()]);
            b.result.set([document.createRange()]);

            // The shared paint carries the union: 2 (from a) + 1 (from b).
            expect(registry.get("shared")?.size).toBe(3);

            a.unmount();
            b.unmount();
        });

        it("does not erase the other instance's ranges on clear()", () => {
            const a = mountComposable(() => useTextHighlight("shared"));
            const b = mountComposable(() => useTextHighlight("shared"));

            a.result.set([document.createRange(), document.createRange()]);
            b.result.set([document.createRange()]);

            // a clears its own contribution; b's single range survives.
            a.result.clear();
            expect(registry.get("shared")?.size).toBe(1);

            a.unmount();
            b.unmount();
        });

        it("does not erase the other instance's ranges on dispose()", () => {
            const a = mountComposable(() => useTextHighlight("shared"));
            const b = mountComposable(() => useTextHighlight("shared"));

            a.result.set([document.createRange()]);
            b.result.set([document.createRange(), document.createRange()]);

            // Disposing a leaves b's two ranges painting under the shared name.
            a.unmount();
            expect(registry.has("shared")).toBe(true);
            expect(registry.get("shared")?.size).toBe(2);

            b.unmount();
        });

        it("deletes the registry entry only when the last instance disposes", () => {
            const a = mountComposable(() => useTextHighlight("shared"));
            const b = mountComposable(() => useTextHighlight("shared"));

            a.result.set([document.createRange()]);
            b.result.set([document.createRange()]);
            expect(registry.has("shared")).toBe(true);

            a.unmount();
            // One contributor still live — the shared paint persists.
            expect(registry.has("shared")).toBe(true);

            b.unmount();
            // Last contributor gone — the registry entry drops.
            expect(registry.has("shared")).toBe(false);
        });
    });
});

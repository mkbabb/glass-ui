import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { useTextHighlight } from "../dom/useTextHighlight";
import { mountComposable } from "../../../tests/utils/mountComposable";

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
});

// AX.W37 — proof:text-highlight.
//
// VERIFIES (does not re-ship — §4 note 12) the `useTextHighlight` re-home onto
// `/motion-core` + the already-landed FuzzySearch `CSS.highlights` retirement:
//
//   HOME — `useTextHighlight` is reachable from the `/motion-core` barrel
//     (`src/composables/motion/core`), NOT `/dom`. The clean MOVE (no `/dom`
//     re-export survives).
//   ZERO-MARK — `setFromMatches` paints match spans via `CSS.highlights` Range
//     registration with ZERO `<mark>` DOM mutation: the container's text node is
//     left UNSPLIT, no element child is created.
//   FALLBACK — when `CSS.highlights` is absent the composable no-ops
//     befitting-silent: every op is safe to call and the container is untouched.
//
// The full FuzzySearch mount + no-<mark> render is covered by
// tests/components/custom/search/search-contracts.test.ts (the retirement landed
// at HEAD); this gate adds the publication-HOME assertion the re-home introduces.

import { afterEach, beforeEach, describe, expect, it } from "vitest";
// The HOME assertion: import via the `/motion-core` barrel, NOT `/dom`. A stale
// `/dom` home would red this import (the barrel no longer re-exports it).
import { useTextHighlight } from "../../../src/composables/motion/core";
import { mountComposable } from "../../utils/mountComposable";

class StubHighlight {
    ranges = new Set<Range>();
    add(range: Range) {
        this.ranges.add(range);
    }
    clear() {
        this.ranges.clear();
    }
    get size() {
        return this.ranges.size;
    }
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

describe("proof:text-highlight — /motion-core home + zero-<mark> CSS.highlights paint (AX.W37)", () => {
    it("HOME — useTextHighlight is reachable from the /motion-core barrel", () => {
        // The import above resolved from `composables/motion/core` — if the
        // re-home left it on `/dom` this module would not have loaded.
        expect(typeof useTextHighlight).toBe("function");
    });

    describe("ZERO-MARK — match spans paint via Range registration, no DOM split", () => {
        let registry: Map<string, StubHighlight>;
        beforeEach(() => {
            registry = installHighlightApi();
        });
        afterEach(uninstallHighlightApi);

        it("registers Ranges and leaves the text node UNSPLIT (no <mark>)", () => {
            const container = document.createElement("div");
            container.textContent = "alpha beta alpha gamma";
            document.body.appendChild(container);

            const { result, unmount } = mountComposable(() =>
                useTextHighlight("glass-search-mark"),
            );
            result.setFromMatches(container, "alpha");

            // Two "alpha" occurrences → two Ranges under the shared Highlight.
            expect(registry.get("glass-search-mark")?.size).toBe(2);
            // CRITICAL — the paint is via CSS.highlights, NOT a <mark> wrapper:
            // the container has ZERO element children and ZERO <mark> nodes; the
            // single text node is untouched (the retirement contract).
            expect(container.querySelector("mark")).toBeNull();
            expect(container.children.length).toBe(0);
            expect(container.childNodes.length).toBe(1);
            expect(container.childNodes[0].nodeType).toBe(Node.TEXT_NODE);
            expect(container.textContent).toBe("alpha beta alpha gamma");

            container.remove();
            unmount();
        });
    });

    describe("FALLBACK — no CSS.highlights → befitting-silent no-op", () => {
        afterEach(uninstallHighlightApi);

        it("reports unsupported and leaves the container untouched", () => {
            // The default test env has no CSS.highlights → the unsupported path.
            const container = document.createElement("div");
            container.textContent = "alpha beta";
            document.body.appendChild(container);

            const { result, unmount } = mountComposable(() =>
                useTextHighlight("glass-search-mark"),
            );
            expect(result.supported).toBe(false);
            expect(() => result.setFromMatches(container, "alpha")).not.toThrow();
            // No paint, no mutation — the list still reads, just unmarked.
            expect(container.querySelector("mark")).toBeNull();
            expect(container.textContent).toBe("alpha beta");

            container.remove();
            unmount();
        });
    });
});

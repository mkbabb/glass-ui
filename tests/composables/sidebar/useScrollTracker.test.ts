import { nextTick, ref } from "vue";
import { afterEach, describe, expect, it, vi } from "vitest";
import { TestIntersectionObserver } from "../../setup";
import { useScrollTracker } from "../../../src/composables/sidebar/useScrollTracker";
import { useTreeIndex } from "../../../src/composables/sidebar/useTreeIndex";
import { mountComposable } from "../../utils/mountComposable";
import type { SidebarSection } from "../../../src/composables/sidebar/types";

// ── Fixture — a 2-root tree, each root with 2 children ───────────────────────
//   root-a → [child-a1, child-a2]
//   root-b → [child-b1, child-b2]
const TREE: SidebarSection[] = [
    {
        id: "root-a",
        title: "A",
        children: [
            { id: "child-a1", title: "A1" },
            { id: "child-a2", title: "A2" },
        ],
    },
    {
        id: "root-b",
        title: "B",
        children: [
            { id: "child-b1", title: "B1" },
            { id: "child-b2", title: "B2" },
        ],
    },
];

function mountAllSections(): void {
    for (const root of TREE) {
        const el = document.createElement("div");
        el.id = root.id;
        document.body.appendChild(el);
        for (const child of root.children ?? []) {
            const cel = document.createElement("div");
            cel.id = child.id;
            document.body.appendChild(cel);
        }
    }
}

describe("useScrollTracker (reactive-roots canon)", () => {
    afterEach(() => {
        document.body.innerHTML = "";
        vi.restoreAllMocks();
    });

    it("picks the DEEPEST visible node when a child + its root both intersect", async () => {
        mountAllSections();
        const roots = ref(TREE);
        const { index } = useTreeIndex(TREE);

        const { result, unmount } = mountComposable(() =>
            useScrollTracker(
                () => roots.value,
                () => index,
            ),
        );
        await nextTick();

        const observer = TestIntersectionObserver.instances.at(-1)!;
        // Both root-a and its child-a2 intersect — the deepest (child-a2) wins.
        observer.trigger(document.getElementById("root-a")!, true);
        observer.trigger(document.getElementById("child-a2")!, true);

        expect(result.activeId.value).toBe("child-a2");
        unmount();
    });

    it("the scroll-fallback resolves the section closest above the active zone", async () => {
        mountAllSections();
        const roots = ref(TREE);
        const { index } = useTreeIndex(TREE);

        // Position the sections: root-b's top is just above the active-zone line
        // (the closest-above), child-b2 is further down (below the zone).
        const tops: Record<string, number> = {
            "root-a": -500,
            "child-a1": -480,
            "child-a2": -460,
            "root-b": 100,
            "child-b1": 300,
            "child-b2": 600,
        };
        for (const id of Object.keys(tops)) {
            const el = document.getElementById(id)!;
            el.getBoundingClientRect = () =>
                ({ top: tops[id], bottom: tops[id] + 20 }) as DOMRect;
        }
        // window.innerHeight=1000 → active zone = 20% * 1000 = 200px.
        Object.defineProperty(window, "innerHeight", {
            configurable: true,
            value: 1000,
        });

        const { result, unmount } = mountComposable(() =>
            useScrollTracker(
                () => roots.value,
                () => index,
            ),
        );
        await nextTick();

        document.dispatchEvent(new Event("scroll"));
        await new Promise((r) => setTimeout(r, 5));

        // root-b (top=100) is at dist = 100 - 0 - 200 = -100 (above the zone,
        // closest); the deeper child-b1 (top=300, dist=+100) is below — so the
        // closest-above wins: root-b.
        expect(result.activeId.value).toBe("root-b");
        unmount();
    });
});

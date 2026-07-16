import { nextTick, ref } from "vue";
import { afterEach, describe, expect, it, vi } from "vitest";
import { TestIntersectionObserver } from "../../setup";
import { useScrollTracker } from "@glass/composables/sidebar/useScrollTracker";
import { useTreeIndex } from "@glass/composables/sidebar/useTreeIndex";
import { mountComposable } from "../../utils/mountComposable";
import type { SidebarSection } from "@glass/composables/sidebar/types";

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

    it("gives exact-max scroll ownership to the last connected node", async () => {
        const scroller = document.createElement("div");
        document.body.appendChild(scroller);
        Object.defineProperties(scroller, {
            clientHeight: { configurable: true, value: 480 },
            scrollHeight: { configurable: true, value: 960 },
            scrollTop: { configurable: true, value: 478, writable: true },
        });
        scroller.getBoundingClientRect = () => ({ top: 0 }) as DOMRect;

        const tops: Record<string, number> = {
            "root-a": -300,
            "child-a1": -200,
            "child-a2": -100,
            "root-b": 160,
            "child-b1": 95,
            "child-b2": 360,
        };
        for (const root of TREE) {
            for (const node of [root, ...(root.children ?? [])]) {
                const el = document.createElement("div");
                el.id = node.id;
                el.getBoundingClientRect = () =>
                    ({ top: tops[node.id], bottom: tops[node.id] + 20 }) as DOMRect;
                scroller.appendChild(el);
            }
        }

        const { index } = useTreeIndex(TREE);
        const { result, unmount } = mountComposable(() =>
            useScrollTracker(
                () => TREE,
                () => index,
                { scrollContainer: ref(scroller) },
            ),
        );
        await nextTick();

        // Two pixels before max is the counter-arm: ordinary active-zone
        // geometry keeps the penultimate node nearest above the 96px line.
        scroller.dispatchEvent(new Event("scroll"));
        await new Promise((resolve) => setTimeout(resolve, 5));
        expect(result.activeId.value).toBe("child-b1");

        // At max, the document-order terminal node owns active state even
        // though it remains below the active line.
        scroller.scrollTop = 480;
        scroller.dispatchEvent(new Event("scroll"));
        await new Promise((resolve) => setTimeout(resolve, 5));
        expect(result.activeId.value).toBe("child-b2");
        expect(result.activeRootId.value).toBe("root-b");

        // A late penultimate IO delivery cannot steal terminal ownership.
        const observer = TestIntersectionObserver.instances.at(-1)!;
        observer.trigger(document.getElementById("child-b1")!, true);
        expect(result.activeId.value).toBe("child-b2");
        unmount();
    });

    it("rebinds late roots without letting the retired observer overwrite active state", async () => {
        const rootA = TREE[0];
        const rootB = TREE[1];
        const mountedRoots = ref([rootA]);
        const { index } = useTreeIndex(TREE);

        for (const node of [rootA, ...(rootA.children ?? [])]) {
            const el = document.createElement("div");
            el.id = node.id;
            document.body.appendChild(el);
        }

        const { result, unmount } = mountComposable(() =>
            useScrollTracker(
                () => mountedRoots.value,
                () => index,
            ),
        );
        await nextTick();

        const observerA = TestIntersectionObserver.instances.at(-1)!;
        observerA.trigger(document.getElementById("child-a2")!, true);
        expect(result.activeId.value).toBe("child-a2");

        for (const node of [rootB, ...(rootB.children ?? [])]) {
            const el = document.createElement("div");
            el.id = node.id;
            document.body.appendChild(el);
        }
        mountedRoots.value = [...mountedRoots.value, rootB];
        await nextTick();
        await nextTick();

        const observerB = TestIntersectionObserver.instances.at(-1)!;
        expect(observerB).not.toBe(observerA);
        expect(observerA.disconnect).toHaveBeenCalledOnce();
        expect(result.activeId.value).toBe("child-a2");

        observerB.trigger(document.getElementById("child-b1")!, true);
        expect(result.activeId.value).toBe("child-b1");

        observerA.trigger(document.getElementById("child-a1")!, true);
        expect(result.activeId.value).toBe("child-b1");
        unmount();
    });
});

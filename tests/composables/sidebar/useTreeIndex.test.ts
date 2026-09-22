import { describe, expect, it } from "vitest";

import {
    buildTreeIndex,
    isActive,
    isInActiveChain,
    useTreeIndex,
} from "@glass/composables/sidebar";

const tree = [
    {
        id: "root",
        title: "Root",
        children: [{ id: "child", title: "Child" }],
    },
];

describe("sidebar tree index", () => {
    it("indexes descendants and resolves the active chain", () => {
        const treeIndex = useTreeIndex(tree);
        const index = buildTreeIndex(tree);

        expect(treeIndex.index.has("child")).toBe(true);
        expect(treeIndex.isDescendant("child", "root")).toBe(true);
        expect(isActive("child", "child")).toBe(true);
        expect(isInActiveChain("root", "child", index, tree)).toBe(true);
    });
});

// O-32 §3.4—parentId is the DIRECT parent and null for roots; rootId names the
// root-level ancestor. A three-level fixture tells the two apart: under the old shape
// every entry's parentId equalled its rootId.
describe("sidebar tree index — parentId is the direct parent", () => {
    const deep = [
        {
            id: "root",
            title: "Root",
            children: [
                {
                    id: "child",
                    title: "Child",
                    children: [
                        {
                            id: "grandchild",
                            title: "Grandchild",
                            children: [{ id: "great", title: "Great" }],
                        },
                    ],
                },
                { id: "sibling", title: "Sibling" },
            ],
        },
        { id: "other", title: "Other" },
    ];

    it("names each entry's direct parent, null at the roots", () => {
        const index = buildTreeIndex(deep);
        expect(index.get("root")!.parentId).toBeNull();
        expect(index.get("other")!.parentId).toBeNull();
        expect(index.get("child")!.parentId).toBe("root");
        expect(index.get("sibling")!.parentId).toBe("root");
        expect(index.get("grandchild")!.parentId).toBe("child");
        expect(index.get("great")!.parentId).toBe("grandchild");
    });

    it("keeps rootId on the root-level ancestor (self at depth 0)", () => {
        const { index } = useTreeIndex(deep);
        expect(index.get("root")!.rootId).toBe("root");
        expect(index.get("other")!.rootId).toBe("other");
        expect(index.get("grandchild")!.rootId).toBe("root");
        expect(index.get("great")!.rootId).toBe("root");
    });

    it("answers the active chain the same way at every depth", () => {
        const index = buildTreeIndex(deep);
        const chain = ["root", "child", "grandchild", "great", "sibling", "other"].filter(
            (id) => isInActiveChain(id, "great", index, deep),
        );
        expect(chain).toEqual(["root", "child", "grandchild", "great"]);
        expect(
            ["root", "child", "other"].filter((id) => isInActiveChain(id, "root", index, deep)),
        ).toEqual(["root"]);
    });
});

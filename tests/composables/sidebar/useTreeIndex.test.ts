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

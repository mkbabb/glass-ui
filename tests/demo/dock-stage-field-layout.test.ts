import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const dockStageSource = readFileSync(
    "demo/stories/dock/_frame/DockStage.vue",
    "utf8",
);
const auroraSource = readFileSync(
    "src/components/aurora/Aurora.vue",
    "utf8",
);

function declarations(source: string, selector: string): string {
    const escaped = selector.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const match = source.match(new RegExp(`${escaped}\\s*\\{([^}]*)\\}`));
    expect(match, `missing ${selector} rule`).not.toBeNull();
    return match![1]!;
}

describe("DockStage field layout", () => {
    it("preserves Aurora's single-cell grid stack", () => {
        expect(declarations(auroraSource, ".aurora-root")).toMatch(
            /display:\s*grid/,
        );
        expect(
            declarations(dockStageSource, ".dock-stage .dock-stage-field"),
        ).not.toMatch(/display\s*:/);
    });
});

// proof:doc-consistency — the AT.W7-dock-c ι doc-rot gate, exercised through its
// FS-free entry `detectSource(...)` over in-memory CLAUDE.md + package.json
// fixtures. A regression that re-introduces a dangling `custom/<dir>` Structure-
// tree citation or a stale Dependencies-table package name now fails `npm test`,
// not just the standalone gate.
//
// Invariant (recap): every `custom/<dir>` the CLAUDE.md Structure TREE cites
// resolves to a real directory at HEAD, and every package the "## Dependencies"
// table names is a real declared dependency/peerDependency. The classic rot the
// gate caught: `custom/dock-group/` + `custom/sidebar/` (removed dirs still in
// the tree) and `lucide-vue-next` (the pre-v1 package name; the real peer is
// `@lucide/vue`).

import { describe, expect, it } from "vitest";

import {
    citedCustomDirs,
    citedDeps,
    detectSource,
} from "../proof-doc-consistency.mjs";

// A minimal good CLAUDE.md: a `custom/` Structure tree + a Dependencies table.
const GOOD_MD = `
## Structure

\`\`\`
src/
├── components/
│   ├── custom/                     # N custom package dirs
│   │   ├── aurora/                 # Aurora WebGL background
│   │   ├── dock/
│   │   │   ├── GlassDock.vue       # the dock chassis (NOT a package dir)
│   │   │   └── index.ts
│   │   ├── tabs/                   # BouncyTabs, UnderlineTabs
│   │   └── index.ts
│   └── index.ts
\`\`\`

## Dependencies

| Package | Role |
|---------|------|
| \`vue\` ^3.5 | Framework |
| \`@lucide/vue\` ^1.16.0 | Icon set |
\`\`\`
`;

const GOOD_PKG = JSON.stringify({
    peerDependencies: { vue: "^3.5", "@lucide/vue": "^1.16.0" },
    exports: { ".": {}, "./dock": {} },
});

const EXISTING = ["aurora", "dock", "tabs"];

describe("proof:doc-consistency — CLAUDE.md citation detector (AT.W7-dock-c)", () => {
    it("parses only DIRECT custom/ tree children as package dirs (not nested *.vue leaves)", () => {
        const dirs = [...citedCustomDirs(GOOD_MD)].sort();
        expect(dirs).toEqual(["aurora", "dock", "tabs"]);
        // The nested GlassDock.vue / index.ts under dock/ are NOT package dirs.
        expect(dirs).not.toContain("GlassDock.vue");
        expect(dirs).not.toContain("index.ts");
    });

    it("parses the Dependencies-table package names from the backtick cells", () => {
        const deps = [...citedDeps(GOOD_MD)].sort();
        expect(deps).toEqual(["@lucide/vue", "vue"]);
    });

    it("passes the good substrate (every cited dir + dep resolves)", () => {
        const { violations } = detectSource({
            claudeMd: GOOD_MD,
            packageJson: GOOD_PKG,
            existingDirs: EXISTING,
        });
        expect(violations).toEqual([]);
    });

    it("FAILS on a dangling custom/<dir> tree citation (the dock-group rot)", () => {
        const md = GOOD_MD.replace(
            "│   │   ├── tabs/                   # BouncyTabs, UnderlineTabs",
            "│   │   ├── tabs/                   # BouncyTabs, UnderlineTabs\n│   │   ├── dock-group/             # removed primitive",
        );
        const { violations } = detectSource({
            claudeMd: md,
            packageJson: GOOD_PKG,
            existingDirs: EXISTING, // dock-group NOT present
        });
        expect(violations.join("\n")).toMatch(/dock-group/);
    });

    it("FAILS on a stale Dependencies-table package name (the lucide-vue-next rot)", () => {
        const md = GOOD_MD.replace("@lucide/vue", "lucide-vue-next");
        const { violations } = detectSource({
            claudeMd: md,
            packageJson: GOOD_PKG, // declares @lucide/vue, NOT lucide-vue-next
            existingDirs: EXISTING,
        });
        expect(violations.join("\n")).toMatch(/lucide-vue-next/);
    });

    it("does NOT flag a retirement note that merely NAMES a retired path (no false witness)", () => {
        const md =
            GOOD_MD +
            "\n(The `@mkbabb/glass-ui/dock-group` wrapper was retired with its `custom/dock-group/` dir.)\n";
        const { violations } = detectSource({
            claudeMd: md,
            packageJson: GOOD_PKG,
            existingDirs: EXISTING,
        });
        // The retirement prose names custom/dock-group/ but does NOT add a tree
        // citation, so it is not a dangling-directory violation.
        expect(violations).toEqual([]);
    });
});

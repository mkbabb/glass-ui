// Category-rail landmark (W1-A11Y-STATE, W1-A).
//
// The primary category rail was wrapped in a nameless <aside> (complementary — the
// wrong landmark), while the intended name sat as `aria-label` on the GlassDock host,
// whose root is a role-less generic where name-from-author is dropped. The region
// becomes a NAMED <nav>; the inert GlassDock aria-label is removed.
//
// A vitest-fs source assert (the band's demo-surface idiom, mirroring
// tests/demo/shortcut-kbd-a11y.test.ts): the shell rail lives in the routed AppShell
// and is not isolable for a rendered-attr mount, so the contract is asserted against
// the SFC source. RED at HEAD: the rail is an <aside> and GlassDock carries the label.

import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const appShell = readFileSync("demo/shell/AppShell.vue", "utf8");
const sidebar = readFileSync("demo/shell/SidebarDock.vue", "utf8");

// The desktop rail's opening tag (identified by its `demo-sidebar-rail` class).
const railTag = appShell.match(/<(aside|nav)\b[^>]*demo-sidebar-rail[^>]*>/);
// The SidebarDock GlassDock host opening tag.
const glassDockTag = sidebar.match(/<GlassDock\b[\s\S]*?>/);

describe("category-rail landmark (W1-A)", () => {
    it("locates the rail tag and the GlassDock host", () => {
        expect(railTag, "the demo-sidebar-rail element is present").not.toBeNull();
        expect(glassDockTag, "the GlassDock host is present").not.toBeNull();
    });

    it("wraps the category rail in a NAMED <nav> landmark, not a nameless <aside>", () => {
        expect(railTag![1]).toBe("nav");
        expect(railTag![0]).toMatch(/aria-label="Category navigation"/);
    });

    it("drops the inert aria-label from the role-less GlassDock host", () => {
        expect(glassDockTag![0]).not.toMatch(/aria-label/);
    });
});

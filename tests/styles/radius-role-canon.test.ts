import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

// ─────────────────────────────────────────────────────────────────────────────
// BJ MATERIAL W1 — the ordinary (non-`it.fails`) radius-role gate.
//
// Enforces the six requirements of the C2 adjudication's "Ordinary gate and born-RED
// mutation contract" against SOURCE, DOCS, and the token manifest (happy-dom runs no
// cascade, so geometry OUTCOME is read from source — the radius-dialog-bind idiom):
//   1. VOCABULARY   — every declared radius/corner rung is classified in the executable
//                     inventory; the inventory is a bijection with radius.css.
//   2. CLEAN BREAK  — dead names (`--radius-input`, `--corner-k-soft/-sharp`) are absent
//                     from source/manifest/live docs; the 8.0 ledger names every delta.
//   3. W1 BINDINGS  — the exact per-seam bindings this wave owns.
//   4. CANON TRUTH  — the executable inventory and the DESIGN.md human table agree.
//   5. RESIDUE FLIP — the two segmented literals are gone (token-hygiene's radius arm is
//                     then an ordinary GREEN assertion; that flip lives in its own gate).
//   6. PACKAGE TRUTH — ROUTED to the value.js/package owner; not asserted here.
//
// The package/install fixture, the value.js consumer migration, and the Chromium+Safari
// paint matrix are ROUTED to their owners — this producer gate proves source/doc/manifest.
// ─────────────────────────────────────────────────────────────────────────────

const read = (rel: string): string => readFileSync(join(process.cwd(), rel), "utf8");
const strip = (css: string): string => css.replace(/\/\*[\s\S]*?\*\//g, "");
/** Value of a `--token: …;` declaration (comments stripped). */
const decl = (css: string, token: string): string | undefined => {
    const m = strip(css).match(new RegExp(`${token}\\s*:\\s*([^;]+);`));
    return m ? m[1].replace(/\s+/g, " ").trim() : undefined;
};
/** Body of the FIRST `selector { … }` rule (single-level; no nested braces). */
const rule = (css: string, selector: string): string | undefined => {
    const m = strip(css).match(new RegExp(`${selector}\\s*\\{([^}]*)\\}`));
    return m ? m[1] : undefined;
};
/** Word-boundary token presence (so `--radius` does not match `--radius-media`). */
const hasToken = (text: string, token: string): boolean =>
    new RegExp(`${token}(?![\\w-])`).test(text);

const radius = read("src/styles/theme/radius.css");
const design = read("DESIGN.md");
const manifest = read("src/styles/tokens/manifest.ts");

const DEAD_NAMES = ["--radius-input", "--corner-k-soft", "--corner-k-sharp"] as const;

// ── The executable role inventory (the "small explicit contract map" the C2 ruling
// permits). Every live radius/corner rung, classified. A bijection with radius.css. ──
type RadiusClass =
    | "primitive"
    | "semantic-role"
    | "context-relay"
    | "shape-axis"
    | "public-override";

const RADIUS_ROLE_INVENTORY: Readonly<Record<string, RadiusClass>> = Object.freeze({
    // primitive — the numeric ladder
    "--radius": "primitive",
    "--radius-xs": "primitive",
    "--radius-sm": "primitive",
    "--radius-md": "primitive",
    "--radius-lg": "primitive",
    "--radius-xl": "primitive",
    "--radius-2xl": "primitive",
    "--radius-3xl": "primitive",
    "--radius-pill": "primitive",
    // semantic-role — what the surface IS
    "--radius-media": "semantic-role",
    "--radius-control": "semantic-role",
    "--radius-field": "semantic-role",
    "--radius-card": "semantic-role",
    "--radius-dialog": "semantic-role",
    "--radius-panel": "semantic-role",
    "--radius-strip": "semantic-role",
    "--radius-tab": "semantic-role",
    "--radius-badge": "semantic-role",
    "--radius-dock": "semantic-role",
    "--radius-dock-card": "semantic-role",
    "--radius-tooltip": "semantic-role",
    // context-relay — the concentric-nesting channel (law 1)
    "--radius-ctx": "context-relay",
    "--radius-inset": "context-relay",
    "--radius-floor": "context-relay",
    // shape-axis — the corner-shape superellipse
    "--corner-k-squircle": "shape-axis",
    "--corner-shape-bigdock": "shape-axis",
    "--corner-shape-sheet": "shape-axis",
    "--corner-shape-panel": "shape-axis",
    "--corner-shape-thumb": "shape-axis",
    // public-override — the explicit consumer override seam (Atlas)
    "--radius-button": "public-override",
});

/** Every `--radius-*` / `--corner-*` DECLARATION (LHS) in radius.css. */
const declaredRungs = (): string[] => {
    const set = new Set<string>();
    const re = /(?:^|[{;\s])(--(?:radius|corner)[\w-]*)\s*:/g;
    let m: RegExpExecArray | null;
    while ((m = re.exec(strip(radius))) !== null) set.add(m[1]!);
    return [...set].sort();
};

describe("1. vocabulary — every rung is classified (executable inventory ⟺ radius.css)", () => {
    const declared = declaredRungs();

    it("classifies every declared radius/corner rung — an unclassified rung fails", () => {
        const unclassified = declared.filter((t) => !(t in RADIUS_ROLE_INVENTORY));
        expect(unclassified).toEqual([]);
    });

    it("declares every inventoried role — deleting a live role from the inventory fails", () => {
        const orphaned = Object.keys(RADIUS_ROLE_INVENTORY).filter(
            (t) => !declared.includes(t),
        );
        expect(orphaned).toEqual([]);
    });

    it("keeps exactly one squircle-exponent shape vocab", () => {
        const shape = Object.entries(RADIUS_ROLE_INVENTORY)
            .filter(([, c]) => c === "shape-axis")
            .map(([t]) => t);
        expect(shape).toContain("--corner-k-squircle");
        expect(decl(radius, "--corner-k-squircle")).toBe("2");
    });

    it("keeps --radius-button classified as the explicit public override seam", () => {
        expect(RADIUS_ROLE_INVENTORY["--radius-button"]).toBe("public-override");
    });
});

describe("2. clean break — dead names absent from source/manifest/live docs; ledger names the delta", () => {
    it("purges --radius-input and both dead k-tokens from radius.css (no alias)", () => {
        const bare = strip(radius);
        expect(decl(radius, "--radius-media")).toBe("var(--radius)");
        for (const dead of DEAD_NAMES) expect(bare).not.toContain(dead);
    });

    it("carries --radius-media (not --radius-input) in the token manifest", () => {
        expect(manifest).toContain("--radius-media");
        expect(manifest).not.toContain("--radius-input");
    });

    it("purges dead names from every named W1 component + the squircle sheet", () => {
        for (const rel of [
            "src/components/skeleton/Skeleton.vue",
            "src/components/avatar/styles.css",
            "src/components/command/styles.css",
            "src/components/sortable-list/SortableList.vue",
            "src/styles/glass/squircle.css",
        ]) {
            const bare = strip(read(rel));
            for (const dead of DEAD_NAMES) expect(bare).not.toContain(dead);
        }
    });

    it("names every 8.0 removal/addition in the DESIGN.md ledger — and nowhere else in the docs", () => {
        const marker = "8.0 CSS-token ledger";
        const at = design.indexOf(marker);
        expect(at).toBeGreaterThan(0);
        const live = design.slice(0, at); // the live role tables
        const ledger = design.slice(at); // the migration ledger
        // dead names live ONLY in the ledger (as removals), never in the live tables
        for (const dead of DEAD_NAMES) {
            expect(live).not.toContain(dead);
            expect(ledger).toContain(dead);
        }
        // the addition + retained rung are named too
        expect(ledger).toContain("--radius-media");
        expect(ledger).toContain("--corner-k-squircle");
    });
});

describe("3. exact W1 bindings", () => {
    it("Avatar square → --radius-media (not a different semantic radius)", () => {
        const css = read("src/components/avatar/styles.css");
        expect(css).toMatch(
            /\[data-shape="square"\][^{]*\{\s*border-radius:\s*var\(--radius-media\)/,
        );
    });

    it("Skeleton default → LAYERED --radius-media so caller shape utilities win", () => {
        const sk = strip(read("src/components/skeleton/Skeleton.vue"));
        const layerAt = sk.indexOf("@layer components");
        expect(layerAt).toBeGreaterThan(0);
        // the LAYERED block owns the default radius
        expect(sk.slice(layerAt)).toMatch(
            /@layer components\s*\{[^}]*\.skeleton\s*\{[^}]*border-radius:\s*var\(--radius-media\)/,
        );
        // the UNLAYERED .skeleton rule must NOT own a radius (no hard owner)
        expect(sk.slice(0, layerAt)).not.toContain("border-radius");
    });

    it("Command input → NO radius (paint-dead, panel owns the corner)", () => {
        const body = rule(read("src/components/command/styles.css"), "\\.command__input");
        expect(body).toBeDefined();
        expect(body).not.toContain("border-radius");
    });

    it("Sortable drop indicator → --radius-pill, never 999px or another token", () => {
        const s = read("src/components/sortable-list/SortableList.vue");
        expect(s).toContain("border-radius: var(--radius-pill)");
        expect(s).not.toContain("999px");
    });

    it("Segmented tab buttons → the orientation-aware contextual seam, no raw literals", () => {
        const seg = strip(read("src/components/tabs/styles/segmented.css"));
        // both tab-button rules read the seam
        expect(rule(seg, "\\.segmented-tab")).toContain(
            "border-radius: var(--bouncy-slider-radius)",
        );
        expect(seg).toMatch(
            /\.segmented-tabs--underline \.segmented-tab\s*\{[^}]*border-radius:\s*var\(--bouncy-slider-radius\)/,
        );
        // the raw literals are gone
        expect(seg).not.toContain("border-radius: 0.3125rem");
        expect(seg).not.toContain("border-radius: 0.25rem");
        // the seam resolves orientation-aware: horizontal → tab stadium, vertical → strip
        expect(rule(seg, "\\.segmented-tabs")).toContain(
            "--bouncy-slider-radius: var(--radius-tab)",
        );
        expect(seg).toMatch(
            /\.segmented-tabs--vertical\s*\{[^}]*--bouncy-slider-radius:\s*var\(--radius-strip\)/,
        );
    });

    it("Search input-bar → --radius-control, floating retains chrome, only bare is chromeless", () => {
        const bar = rule(read("src/styles/utilities/components.css"), "\\.input-bar");
        expect(bar).toContain("border-radius: var(--radius-control)");
        expect(bar).not.toContain("--radius-2xl");
        const variants = read("src/components/search/searchVariants.ts");
        expect(variants).toMatch(/floating:\s*""/); // floating keeps the component plate
        expect(variants).toMatch(/bare:\s*"[^"]*rounded-none/); // bare is the sole chromeless
        // floating must NOT strip the plate
        expect(variants).not.toMatch(/floating:\s*"[^"]*rounded-none/);
    });

    it("InfiniteScroll Reset → the public Button, not a raw <button>", () => {
        const demo = read("demo/stories/data/infinite-scroll.vue");
        expect(demo).toContain("import { Button }");
        expect(demo).toMatch(/<Button[^>]*@click="reset"/);
        expect(demo).not.toContain("<button");
    });

    it("F12 → field container + public Chip child (boundary-sharing, not a pill)", () => {
        const tags = rule(read("src/components/tags-input/styles.css"), "\\.tags-input");
        expect(tags).toBeDefined();
        // the CONTAINER is a near-rect field, never a pill/control stadium
        expect(tags).toContain("border-radius: var(--radius-field)");
        expect(tags).not.toContain("--radius-pill");
        expect(tags).not.toContain("--radius-control");
        // the child inset is present (gap + padding) and no overflow clips the child
        expect(tags).toMatch(/gap:/);
        expect(tags).toMatch(/padding:/);
        expect(tags).not.toContain("overflow: hidden");
        // the pill silhouette comes from <Chip>, not a hand-rolled radius on the container
        const item = read("src/components/tags-input/TagsInputItem.vue");
        expect(item).toContain("import { Chip }");
        expect(item).toContain("<Chip");
    });

    it("keeps the real Input on the stadium pill, never on the tile rung", () => {
        const field = strip(read("src/components/_shared/field/field-control.css"));
        expect(field).toMatch(
            /\.field-control\[data-kind="input"\]\s*\{[^}]*border-radius:\s*var\(--radius-pill\)/,
        );
        expect(field).not.toContain("--radius-media");
    });
});

describe("4. canon truth — the executable inventory and the DESIGN.md human table agree", () => {
    const live = design.slice(0, design.indexOf("8.0 CSS-token ledger"));

    it("lists every inventoried rung in the DESIGN.md role tables", () => {
        const missing = Object.keys(RADIUS_ROLE_INVENTORY).filter(
            (t) => !hasToken(live, t),
        );
        expect(missing).toEqual([]);
    });

    it("explicitly carries the seven rungs the C2 ruling names", () => {
        for (const t of [
            "--radius-button",
            "--radius-strip",
            "--radius-badge",
            "--radius-dock",
            "--radius-tab",
            "--radius-dock-card",
            "--radius-tooltip",
        ]) {
            expect(hasToken(live, t)).toBe(true);
        }
    });
});

describe("5. residue flip — the two segmented raw radii are gone", () => {
    it("leaves no off-ladder radius literal in segmented.css", () => {
        const seg = strip(read("src/components/tabs/styles/segmented.css"));
        expect(seg).not.toMatch(/border-radius:\s*0\.3125rem/);
        expect(seg).not.toMatch(/border-radius:\s*0\.25rem/);
    });
});

import { readdirSync, readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { cn } from "@glass/components/_shared/class-names";

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

describe("G-RADIUS-ROLE 1. vocabulary — every rung is classified (executable inventory ⟺ radius.css)", () => {
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
            "src/components/sortable-list/styles.css",
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

    // [2026-08-05 · BK #41 W-SORTABLE] ~~Sortable drop indicator → --radius-pill~~ —
    // STRUCK WITH ITS SUBJECT. The drop indicator was a gold shimmer BAR drawn as a
    // pseudo-element on a row, and the wave deleted it: the vacancy is the indicator
    // now, so there is no insertion mark to give a corner to. What survives of the case
    // is the role binding it was really testing — the GRIP is a stadium (§4 binds the
    // "grip" role to the pill) and the plate is the card rung — so the assertion moves
    // to the two live corners rather than being deleted outright.
    it("Sortable grip → --radius-pill and the list plate → --radius-card, no literals", () => {
        const s = strip(read("src/components/sortable-list/styles.css"));
        expect(rule(s, "\\.sortable-handle")).toContain(
            "border-radius: var(--radius-pill)",
        );
        expect(rule(s, "\\.sortable-list")).toContain(
            "border-radius: var(--radius-card)",
        );
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

    // [2026-08-25 · BK #42 W-SEARCH] The variant half is STRUCK WITH ITS SUBJECT —
    // ~~`searchVariants.ts` `floating` keeps the plate / `bare` is the sole
    // chromeless~~. `SearchBar` went DELETE-with-relay and the CVA died with it, so
    // there is no `floating`/`bare` rung left to hold a radius role. The RECIPE half is
    // KEPT and is not a leftover: `.input-bar` outlives the component that used to be
    // its main mount (live readers — `demo/stories/dock/dock-search.vue:201`,
    // `src/components/dock/styles/search.css:46`, plus four value.js selector sites),
    // so its role radius still needs pinning. Same disposition, and for the same
    // reason, as the tags-input strike below.
    it("Search input-bar → --radius-control (the recipe outlives its component)", () => {
        const bar = rule(read("src/styles/utilities/components.css"), "\\.input-bar");
        expect(bar).toContain("border-radius: var(--radius-control)");
        expect(bar).not.toContain("--radius-2xl");
    });

    it("InfiniteScroll Reset → the public Button, not a raw <button>", () => {
        const demo = read("demo/stories/data/infinite-scroll.vue");
        expect(demo).toContain("import { Button }");
        expect(demo).toMatch(/<Button[^>]*@click="reset"/);
        expect(demo).not.toContain("<button");
    });

    // [2026-08-09 · BK #66 CLOSE · RT-18A] ~~F12 → field container + public Chip
    // child (boundary-sharing, not a pill)~~ — STRUCK WITH ITS SUBJECT. The case read
    // `src/components/tags-input/styles.css` and `TagsInputItem.vue` and nothing else;
    // the component is deleted, so there is no field container left to assert a role
    // radius on. Not a rostered seat (C20 carries no row for this file), so seats +0.

    it("keeps the real Input on the stadium pill, never on the tile rung", () => {
        const field = strip(read("src/components/_shared/field/control.css"));
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

// ═════════════════════════════════════════════════════════════════════════════
// W-RADIUS-ROLE — the ROLE SPINE and this wave's bindings.
//
// The proportion settlement's terminal table collapses the radius vocabulary to
// SEVEN roles (cell 0 · floor 4 · tick 6 · control 10 · card 16 · room 24 · pill
// h/2) plus TWO relay channels. This suite enforces the collapse's INVARIANT —
// every live rung belongs to exactly one role, and every member of a role
// resolves to that role's ONE value — WITHOUT performing the rename, which is a
// joint act of five roster rows and is refused here with grounds (see §7).
// A rung that drifts off its role's value fails; a new rung with no role fails.
// ═════════════════════════════════════════════════════════════════════════════

/** Every `--token: value;` in a sheet, comments stripped. */
const declMap = (css: string): Map<string, string> => {
    const map = new Map<string, string>();
    for (const m of strip(css).matchAll(/(--[\w-]+)\s*:\s*([^;{}]+);/g)) {
        map.set(m[1]!, m[2]!.replace(/\s+/g, " ").trim());
    }
    return map;
};

/** Follow a `var(--x)` alias chain to its terminal (non-`var`) value. */
const resolveAlias = (map: Map<string, string>, token: string): string => {
    let cur = token;
    const seen = new Set<string>();
    while (map.has(cur) && !seen.has(cur)) {
        seen.add(cur);
        const value = map.get(cur)!;
        const alias = value.match(/^var\(\s*(--[\w-]+)\s*\)$/);
        if (!alias) return value;
        cur = alias[1]!;
    }
    return map.get(cur) ?? cur;
};

/** `12px` / `0.75rem` → px number (root font-size 16). Spelling-independent, so
 *  two names at one value can never hide behind two different units. */
const px = (value: string): number => {
    const m = value.match(/^(-?[\d.]+)(px|rem)$/);
    if (!m) return Number.NaN;
    return m[2] === "rem" ? Number(m[1]) * 16 : Number(m[1]);
};

const RADIUS_DECLS = declMap(radius);

type RadiusRole = "floor" | "tick" | "control" | "card" | "room" | "pill" | "relay";

/** §4's role spine, keyed to the names that carry each role ON DISK. `cell` (0)
 *  has no token by construction — it is the absence of a silhouette. */
const ROLE_OF: Readonly<Record<string, RadiusRole>> = Object.freeze({
    "--radius-xs": "floor",
    "--radius-sm": "floor",
    "--radius-floor": "floor",
    "--radius-md": "tick",
    "--radius": "control",
    "--radius-lg": "control",
    "--radius-media": "control",
    "--radius-button": "control",
    "--radius-2xl": "card",
    "--radius-card": "card",
    "--radius-dialog": "card",
    "--radius-field": "card",
    "--radius-3xl": "room",
    "--radius-dock-card": "room",
    "--radius-pill": "pill",
    "--radius-control": "pill",
    "--radius-badge": "pill",
    "--radius-dock": "pill",
    "--radius-tab": "pill",
    "--radius-ctx": "relay",
    "--radius-inset": "relay",
});

/** The role values, verbatim from the settlement's terminal table. */
const ROLE_PX: Readonly<Record<Exclude<RadiusRole, "relay">, number>> = Object.freeze({
    floor: 4,
    tick: 6,
    control: 10,
    card: 16,
    room: 24,
    pill: 9999,
});

/** The 12px rung the role spine has no seat for. Named, not hidden. */
const OFF_ROLE_12 = ["--radius-xl", "--radius-panel", "--radius-strip"] as const;

/** Every paintable source file under `src/`, repo-relative. A census, not a list —
 *  a fourth squircle fork added anywhere is found without editing this suite. */
const srcFiles = (dir = "src", out: string[] = []): string[] => {
    for (const entry of readdirSync(join(process.cwd(), dir), { withFileTypes: true })) {
        const rel = `${dir}/${entry.name}`;
        if (entry.isDirectory()) srcFiles(rel, out);
        else if (/\.(css|vue|ts)$/.test(entry.name)) out.push(rel);
    }
    return out;
};

/** `[start, end]` character ranges of every `@supports (corner-shape: superellipse(2))`
 *  block body, by brace matching. Comments must already be stripped. */
const supportsRanges = (src: string): Array<[number, number]> => {
    const ranges: Array<[number, number]> = [];
    const opener = /@supports\s*\(\s*corner-shape:\s*superellipse\(2\)\s*\)\s*\{/g;
    let m: RegExpExecArray | null;
    while ((m = opener.exec(src)) !== null) {
        let depth = 1;
        let i = m.index + m[0].length;
        for (; i < src.length && depth > 0; i += 1) {
            if (src[i] === "{") depth += 1;
            else if (src[i] === "}") depth -= 1;
        }
        ranges.push([m.index, i]);
    }
    return ranges;
};

describe("6. the role spine — 7 roles, and every member of a role is ONE value", () => {
    const radiusRungs = declaredRungs().filter((t) => t.startsWith("--radius"));

    it("assigns every live radius rung to a role (a new rung with no role fails)", () => {
        const roleless = radiusRungs.filter(
            (t) => !(t in ROLE_OF) && !OFF_ROLE_12.includes(t as never),
        );
        expect(roleless).toEqual([]);
    });

    it("declares every rung the role spine names (deleting one silently fails)", () => {
        const missing = Object.keys(ROLE_OF).filter((t) => !radiusRungs.includes(t));
        expect(missing).toEqual([]);
    });

    for (const [role, value] of Object.entries(ROLE_PX)) {
        it(`collapses the ${role} role onto exactly ${value}px`, () => {
            const members = Object.entries(ROLE_OF)
                .filter(([, r]) => r === role)
                .map(([t]) => t);
            expect(members.length).toBeGreaterThan(0);
            const measured = members.map((t) => [t, px(resolveAlias(RADIUS_DECLS, t))]);
            expect(measured).toEqual(members.map((t) => [t, value]));
        });
    }

    it("keeps the relay channels at their identity defaults (ctx = card, inset = 0)", () => {
        expect(px(resolveAlias(RADIUS_DECLS, "--radius-ctx"))).toBe(ROLE_PX.card);
        expect(px(resolveAlias(RADIUS_DECLS, "--radius-inset"))).toBe(0);
    });

    // BORN-RED. The role spine has no 12px rung: the settlement rules `--radius-strip`
    // and annotation-`--radius-panel` down to control 10 and plate-`--radius-panel` up
    // to card 16 — one name, two values, so it cannot land at the token. The rename is
    // the joint act refused at §7; this latch is the residual, and it flips to an
    // ordinary `it` when the last 12px rung is re-seated by its owning row.
    it.fails("has no off-role 12px rung left (OWED — the panel/strip re-seat)", () => {
        const live = OFF_ROLE_12.filter((t) => RADIUS_DECLS.has(t));
        expect(live).toEqual([]);
    });
});

describe("7. this wave's role bindings", () => {
    it("Alert wears the card role, not shadcn's rounded-lg", () => {
        const alert = read("src/components/alert/index.ts");
        expect(alert).toContain("rounded-card");
        expect(alert).not.toMatch(/["' ]rounded-lg[ "']/);
    });

    it("Toast wears the card role — never less rounded than what it floats over", () => {
        // [2026-08-05 · BK #30 W-DISSOLVE] The anchor was `overflow-hidden rounded-card`.
        // `overflow-hidden` was STRUCK from Toast at that cut — the close mark now
        // straddles the corner (IOS27-ARCHIVE §3) and a clipping parent paints half a
        // disc — so the prefix was an incidental neighbour, never this arm's claim. The
        // claim is the RADIUS ROLE and it is unchanged: card, never panel, in either
        // direction. Anchored on the utility itself so the next neighbour edit does not
        // masquerade as a radius regression.
        const toast = read("src/components/toast/Toast.vue");
        expect(toast).toMatch(/[\s'"]rounded-card[\s'"]/);
        expect(toast).not.toMatch(/[\s'"]rounded-panel[\s'"]/);
    });

    it("Dialog close ✕ wears the pill role (the settlement's pill row names it)", () => {
        // The bind is unchanged; only its ADDRESS moved. W-DIALOG folded the dialog's
        // five CSS lanes into one partial, so the ✕'s corner is a declaration in
        // `dialog/styles.css` rather than a utility on the SFC's class string. The role
        // claim — pill, never the 4px floor — is what this pins, and it still bites.
        const close = strip(read("src/components/dialog/styles.css")).match(
            /:where\(\[data-slot="dialog-close"\]\)\s*\{([^}]*)\}/,
        );
        expect(close, "the ✕ rule exists").not.toBeNull();
        expect(close![1]).toMatch(/border-radius:\s*var\(--radius-pill\);/);
        expect(close![1]).not.toMatch(/--radius-(?:xs|sm)\b/);
    });

    it("Dialog plate wears the ROOM role, and the pad leaves the 4px residue", () => {
        // PROPORTION:233 binds room to "dialog, sheet, drawer" BY NAME; the pairing law
        // is `pad(role) = r(role) − 4`, so room 24 pads 20 — which is `--space-family`,
        // exactly. Both surfaces read the rung, not the `--radius-dialog` alias, whose
        // re-point is the batched roster cut's byte.
        const plate = strip(read("src/components/dialog/styles.css")).match(
            /:where\(\[data-slot="dialog-content"\]\)\s*\{([^}]*)\}/,
        );
        expect(plate, "the plate rule exists").not.toBeNull();
        expect(plate![1]).toMatch(/border-radius:\s*var\(--radius-3xl\);/);
        expect(plate![1]).toMatch(/padding-inline:\s*var\(--space-family\);/);
        expect(plate![1]).toMatch(/padding-block:\s*var\(--space-family\);/);
        expect(px(resolveAlias(RADIUS_DECLS, "--radius-3xl"))).toBe(ROLE_PX.room);
    });

    it("dock shape=rounded is the CARD role, never the off-series 12px rung", () => {
        const shell = strip(read("src/components/dock/styles/shell.css"));
        for (const sel of [
            "\\.glass-dock\\.vertical\\.shape-rounded",
            "\\.glass-dock:not\\(\\.vertical\\)\\.shape-rounded",
        ]) {
            const body = rule(shell, sel);
            expect(body).toBeDefined();
            expect(body).toContain("border-radius: var(--radius-card)");
            expect(body).not.toContain("--radius-xl");
        }
        // the prop doc moves with the paint — a doc that still says 12 is a lie
        const props = read("src/components/dock/composables/useDockShellProps.ts");
        expect(props).toContain("--radius-card");
        expect(props).not.toContain("`--radius-xl`");
    });

    it("Button resolves its stadium against the control rung, and refuses min()", () => {
        const body = rule(read("src/components/button/styles.css"), "\\.button");
        expect(body).toBeDefined();
        // half the CONTROL rung, not half the box
        expect(body).toContain("border-radius: calc(var(--button-size) / 2)");
        expect(body).not.toContain("border-radius: var(--radius-pill)");
        // --button-size IS the control cohort, so the bound tracks the size arms
        expect(body).toContain("--button-size: var(--control-h-md)");
        // the refused mechanism, kept refused
        expect(strip(read("src/components/button/styles.css"))).not.toMatch(
            /border-radius:\s*min\(/,
        );
    });

    /* ~~ToggleGroup derives its concentric pair from ONE published inset~~
       [2026-08-08 · BK #84 W-TOGGLE-ROW: AMENDED, not deleted. #23 landed the
       relay-derived concentric pair on `.toggle-group[data-type="single"]`; #84
       DELETED that surface entirely — the group paints nothing in either
       cardinality, so there is no concentric pair here left to derive and no
       assertion left to make about one. The case is re-pointed at what the
       subtraction has to keep true, which is the same law read from the other side:
       the segment's own PILL role rung survives, and the relay channels are gone
       rather than orphaned on a dead selector. This also discharges the ⊕⁷ atlas A-6
       rider by subtraction: `--radius-concentric` was never minted, so there is
       nothing to retire. The relay form itself is unharmed — it is asserted at its
       live consumers elsewhere in this suite.] */
    it("ToggleGroup keeps ONE stadium spelling and no concentric relay on a dead surface", () => {
        const sheet = read("src/components/toggle-group/styles.css");
        const strippedSheet = strip(sheet);
        // The track that carried the pair is gone, both spellings with it.
        expect(strippedSheet).not.toContain('.toggle-group[data-type="single"]');
        expect(strippedSheet).not.toContain("--radius-ctx");
        expect(strippedSheet).not.toContain("--radius-inset");
        // …and the sentinel-producing calc goes with it, in EITHER spelling: the
        // literal D-5 recorded and the relay #23 re-expressed it as.
        expect(strippedSheet).not.toMatch(/var\(--radius-pill\)\s*\+/);
        // The segment keeps its own role rung (law B) — one stadium, one spelling.
        const item = rule(sheet, "\\.toggle-group__item");
        expect(item).toContain("border-radius: var(--radius-pill)");
    });

    it("mints no radius token to do any of it", () => {
        // the inventory is the bijection with radius.css (suite 1); the role spine
        // adds no name of its own, so these two sets stay identical.
        const inventoried = Object.keys(RADIUS_ROLE_INVENTORY).filter((t) =>
            t.startsWith("--radius"),
        );
        const spined = [...Object.keys(ROLE_OF), ...OFF_ROLE_12];
        expect([...spined].sort()).toEqual([...inventoried].sort());
    });
});

describe("8. O-7 — a role utility that cannot conflict is a silent no-op", () => {
    it("dedupes ROLE radius utilities, not just the shadcn size ladder", () => {
        // Before the bucket widening these BOTH survived and stylesheet order —
        // not call order — decided the corner. That is the O-7 defect.
        expect(cn("rounded-panel", "rounded-card")).toBe("rounded-card");
        expect(cn("rounded-card", "rounded-pill")).toBe("rounded-pill");
        expect(cn("rounded-dock-card", "rounded-none")).toBe("rounded-none");
        expect(cn("rounded-card", "rounded-[6px]")).toBe("rounded-[6px]");
        expect(cn("rounded-card", "rounded-(--radius-panel)")).toBe(
            "rounded-(--radius-panel)",
        );
    });

    it("keeps the shadcn ladder behaviour it always had", () => {
        expect(cn("rounded-md", "rounded-lg")).toBe("rounded-lg");
        expect(cn("rounded", "rounded-full")).toBe("rounded-full");
    });

    it("keeps per-corner longhands DISJOINT from the shorthand", () => {
        // a side/corner utility writes different longhands — collapsing them into
        // one bucket would eat the shorthand and square three corners
        expect(cn("rounded-card", "rounded-t-none")).toBe("rounded-card rounded-t-none");
        expect(cn("rounded-t-card", "rounded-t-none")).toBe("rounded-t-none");
        expect(cn("rounded-tl-card", "rounded-t-none")).toBe(
            "rounded-tl-card rounded-t-none",
        );
        expect(cn("rounded-b-dialog", "rounded-b-card")).toBe("rounded-b-card");
    });

    it("does not mistake a role name for a side (tab/tooltip/badge/lg/sm)", () => {
        // `rounded-t` must not swallow `rounded-tab`; if it did, a tab radius and a
        // top-corner radius would fight and one would vanish.
        expect(cn("rounded-tab", "rounded-t-none")).toBe("rounded-tab rounded-t-none");
        expect(cn("rounded-tooltip", "rounded-t-none")).toBe(
            "rounded-tooltip rounded-t-none",
        );
        expect(cn("rounded-badge", "rounded-b-none")).toBe("rounded-badge rounded-b-none");
        expect(cn("rounded-lg", "rounded-l-none")).toBe("rounded-lg rounded-l-none");
        expect(cn("rounded-sm", "rounded-s-none")).toBe("rounded-sm rounded-s-none");
    });

    it("scopes by variant prefix like every other bucket", () => {
        expect(cn("rounded-card", "md:rounded-pill")).toBe("rounded-card md:rounded-pill");
        expect(cn("md:rounded-card", "md:rounded-pill")).toBe("md:rounded-pill");
    });
});

describe("9. U-29 — the squircle fork register (the Safari floor, accepted)", () => {
    // ACCEPTANCE, recorded executably: the superellipse is a PROGRESSIVE tier over a
    // `border-radius` round CONTRACT, it exists at exactly three registered sites, and
    // every one states its round fallback. Safari/Firefox paint the round contract —
    // that IS the sanctioned floor, not a masked failure. A FOURTH unregistered fork,
    // or a fork without a round arm underneath it, fails here.
    const FORKS = [
        "src/styles/glass/squircle.css",
        "src/components/slider/styles.css",
        "src/components/dock/styles/shell.css",
    ] as const;

    it("registers exactly three corner-shape forks across the whole of src", () => {
        const found = srcFiles().filter((rel) =>
            /@supports\s*\(\s*corner-shape:\s*superellipse\(2\)\s*\)/.test(strip(read(rel))),
        );
        expect(found.sort()).toEqual([...FORKS].sort());
    });

    it("gates every corner-shape declaration behind @supports — never as the contract", () => {
        for (const rel of srcFiles()) {
            const src = strip(read(rel));
            const gated = supportsRanges(src);
            // exclude the `@supports (corner-shape: …)` condition text itself
            const declarations = [...src.matchAll(/(?<!@supports\s?\()\bcorner-shape\s*:/g)]
                .map((m) => m.index!)
                .filter((i) => !/@supports\s*\($/.test(src.slice(Math.max(0, i - 12), i)));
            const ungated = declarations.filter(
                (i) => !gated.some(([a, b]) => i > a && i < b),
            );
            expect([rel, ungated.length]).toEqual([rel, 0]);
        }
    });

    it("keeps ONE squircle exponent vocabulary across all three", () => {
        for (const rel of FORKS) {
            const src = read(rel);
            if (!/corner-shape:\s*var\(/.test(src)) continue;
            expect(src).toMatch(/corner-shape:\s*var\(--corner-shape-[\w-]+\)/);
        }
        expect(decl(radius, "--corner-k-squircle")).toBe("2");
    });
});

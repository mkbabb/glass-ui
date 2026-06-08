import { describe, expect, it } from "vitest";

import {
    detectLiveWrap,
    detectWrapSource,
    sliceRule,
    stripCssComments,
} from "../../scripts/proof-dock-wrap-content-driven.mjs";

/**
 * AX.W04 — the pure-detector units for proof:dock-wrap-content-driven.
 *
 * The gate's SOURCE arm is the born-RED→GREEN canary the orchestrator verifies
 * device-free. These units lock the detector logic so its failure paths cannot
 * regress to false-GREEN: a GREEN fixture (the patched wave shape) passes; a RED
 * fixture (the HEAD magic-640 chain) trips every finding; the comment-strip + the
 * sliceRule brace-balancer have their own edge units.
 */

// The patched (GREEN) source shape — the content-driven wrap recipe.
const DOCK_CSS_GREEN = `
@layer components {
    .glass-dock.dock-overflow-wrap {
        white-space: normal;
        max-inline-size: var(--dock-max-inline-size);
        border-radius: calc(
            var(--radius-pill) +
                (var(--dock-card-radius) - var(--radius-pill)) *
                var(--dock-expand-t, 1)
        );
        --dock-wrap-elev: calc(var(--dock-expand-t, 1) * 100%);
        box-shadow:
            var(--glass-edge-light),
            var(--shadow-dock-override, var(--shadow-dock)),
            0 8px 24px color-mix(in srgb, var(--shadow-color) calc(0.14 * var(--dock-wrap-elev)), transparent);
    }
    .glass-dock.dock-overflow-wrap .dock-layer--full {
        flex-wrap: wrap;
        /* AX.W04 — NO transition: min-height JS-morph (the false claim is STRUCK). */
    }
    /* AX.W04 F0 — the @media (min-width: 640px) snap-back + the --dock-overflow-bp
       token are DELETED. */
}
`;
const TOKENS_CSS_GREEN = `
:root {
    /* AX.W04 — the prior --dock-overflow-bp: 640px token is DELETED. */
    --dock-max-inline-size: min(80vw, 64rem);
    --glass-material-rim: 0 0 0 0.5px color-mix(in srgb, var(--shadow-color) 5%, transparent);
    --shadow-dock-wrap: var(--shadow-xl), var(--glass-material-rim), var(--glass-under-shadow-vivid);
}
`;
const GLASSDOCK_VUE_GREEN = `
:class="[{ 'dock-overflow-wrap': overflow === 'wrap' && orientation !== 'vertical' }]"
`;
const README_GREEN = `
overflow="wrap" reflows by intrinsic flex.
| proof:dock-layering-polish | asymmetry, a spring-keyed item cascade, and a hover-scale. |
`;

// The HEAD (RED) source shape — the magic-640 viewport chain.
const DOCK_CSS_RED = `
@layer components {
    .glass-dock.dock-overflow-wrap {
        white-space: normal;
        border-radius: var(--radius-2xl);
        max-width: var(--dock-wrap-max-width);
    }
    .glass-dock.dock-overflow-wrap .dock-layer--full {
        flex-wrap: wrap;
        transition: min-height var(--dock-motion-resize);
    }
    @media (min-width: 640px /* = var(--dock-overflow-bp) */) {
        .glass-dock.dock-overflow-wrap .dock-layer--full {
            flex-wrap: nowrap;
        }
    }
}
`;
const TOKENS_CSS_RED = `
:root {
    --dock-overflow-bp: 640px;
    --dock-max-inline-size: min(80vw, 64rem);
}
`;
const GLASSDOCK_VUE_RED = `
:class="[{ 'dock-overflow-wrap': overflow === 'wrap' }]"
`;
const README_RED = `
| proof:dock-layering-polish | ... and a morphing (not snapping) wrap reflow. |
`;

function greenSrc() {
    return {
        dockCss: DOCK_CSS_GREEN,
        tokensCss: TOKENS_CSS_GREEN,
        glassDockVue: GLASSDOCK_VUE_GREEN,
        readme: README_GREEN,
    };
}
function redSrc() {
    return {
        dockCss: DOCK_CSS_RED,
        tokensCss: TOKENS_CSS_RED,
        glassDockVue: GLASSDOCK_VUE_RED,
        readme: README_RED,
    };
}

describe("detectWrapSource()", () => {
    it("is GREEN on the patched content-driven wrap shape (zero violations)", () => {
        const { facts, violations } = detectWrapSource(greenSrc());
        expect(violations).toEqual([]);
        expect(facts.media640GovernsWrap).toBe(false);
        expect(facts.overflowBpDefined).toBe(false);
        expect(facts.wrapFullHasFlexWrap).toBe(true);
        expect(facts.wrapRootHasMaxContentCap).toBe(true);
        expect(facts.wrapRadiusOnCardRadiusScalar).toBe(true);
        expect(facts.wrapRootUsesRadius2xl).toBe(false);
        expect(facts.shadowDockWrapTokenDefined).toBe(true);
        expect(facts.wrapShadowOnScalar).toBe(true);
        expect(facts.wrapGuardHorizontalOnly).toBe(true);
        expect(facts.falseWrapClaimInDockCss).toBe(false);
        expect(facts.falseWrapClaimInReadme).toBe(false);
    });

    it("is born-RED on the HEAD magic-640 chain (every finding trips)", () => {
        const { facts, violations } = detectWrapSource(redSrc());
        expect(violations.length).toBeGreaterThanOrEqual(8);
        expect(facts.media640GovernsWrap).toBe(true);
        expect(facts.overflowBpDefined).toBe(true);
        expect(facts.wrapRootHasMaxContentCap).toBe(false);
        expect(facts.wrapRootUsesRadius2xl).toBe(true);
        expect(facts.shadowDockWrapTokenDefined).toBe(false);
        expect(facts.wrapLayerHasMinHeightTransition).toBe(true);
        expect(facts.wrapGuardHorizontalOnly).toBe(false);
        expect(facts.falseWrapClaimInReadme).toBe(true);
    });

    it("BITES on the INVALID min(max-content, cap) cap regression (the integration bug)", () => {
        // The lane first shipped `max-inline-size: min(max-content, var(--dock-max-inline-size))`,
        // which is INVALID CSS — math functions reject the `max-content` intrinsic
        // keyword, so the property computes to its initial `none` and the cap silently
        // drops (live rowCount stays 1). The detector must NOT treat that as a valid cap.
        const src = greenSrc();
        src.dockCss = DOCK_CSS_GREEN.replace(
            "max-inline-size: var(--dock-max-inline-size);",
            "max-inline-size: min(max-content, var(--dock-max-inline-size));",
        );
        const { facts, violations } = detectWrapSource(src);
        expect(facts.wrapRootHasMaxContentCap).toBe(false);
        expect(violations.some((v) => v.includes("INVALID") && v.includes("min(max-content"))).toBe(
            true,
        );
    });

    it("does NOT false-RED on a deletion-doc comment (the comment-strip seam)", () => {
        // A dock.css that ONLY mentions the deleted token in a comment must be GREEN
        // on the overflow-bp deletion proof.
        const src = greenSrc();
        src.dockCss = `${DOCK_CSS_GREEN}\n/* the --dock-overflow-bp: 640px token is gone */`;
        const { facts } = detectWrapSource(src);
        expect(facts.overflowBpDefined).toBe(false);
    });
});

describe("stripCssComments()", () => {
    it("removes block comments but keeps active rules", () => {
        const out = stripCssComments("a{x:1} /* --dock-overflow-bp: 9px */ b{y:2}");
        expect(out).not.toContain("--dock-overflow-bp");
        expect(out).toContain("x:1");
        expect(out).toContain("y:2");
    });
});

describe("sliceRule()", () => {
    it("slices the FIRST root rule body, brace-balanced", () => {
        const css = ".a{p:1} .b{q:2; .nested{r:3}}";
        expect(sliceRule(css, ".a{")).toContain("p:1");
    });
    it("does not match a descendant selector that merely CONTAINS the key", () => {
        // `.dock-overflow-wrap {` (root) must not resolve to the descendant rule.
        const css = ".glass-dock.dock-overflow-wrap .dock-layer--full{z:9}";
        // No `.dock-overflow-wrap {` root rule here → null.
        expect(sliceRule(css, ".glass-dock.dock-overflow-wrap {")).toBeNull();
    });
});

describe("detectLiveWrap()", () => {
    it("passes a wrapped 2-row dock inside the viewport with a card radius", () => {
        const { violations } = detectLiveWrap({
            flexWrap: "wrap",
            rowCount: 2,
            dockRight: 900,
            innerWidth: 1280,
            borderRadius: "24px",
            verticalWrapDocks: 0,
        });
        expect(violations).toEqual([]);
    });
    it("RED on a nowrap single-row dock that bleeds the viewport (the HEAD defect)", () => {
        const { violations } = detectLiveWrap({
            flexWrap: "nowrap",
            rowCount: 1,
            dockRight: 1861,
            innerWidth: 800,
            borderRadius: "9999px",
            verticalWrapDocks: 0,
        });
        expect(violations.length).toBeGreaterThanOrEqual(3);
    });
    it("RED when a vertical dock carries .dock-overflow-wrap (F5)", () => {
        const { violations } = detectLiveWrap({
            flexWrap: "wrap",
            rowCount: 2,
            dockRight: 900,
            innerWidth: 1280,
            borderRadius: "24px",
            verticalWrapDocks: 1,
        });
        expect(violations.some((v) => /horizontal-only/.test(v))).toBe(true);
    });
});

import { readFileSync } from "node:fs";
import { resolve } from "node:path";

import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";

import { Surface } from "@glass/components/surface";
import { SURFACE_TIERS } from "@glass/components/_shared/axes";
import { surfaceClass } from "@glass/components/_shared/surface/resolve";

const ROOT = process.cwd();
const src = (rel: string) => readFileSync(resolve(ROOT, "src", rel), "utf8");
const stripComments = (body: string) =>
    body.replace(/\/\*[\s\S]*?\*\//g, "").replace(/^\s*\/\/.*$/gm, "");

/* BK #86 W-SURFACE-MATERIAL — the close battery. Five gates, each born-RED at
   the pre-cut bytes with the mutation that bites stated beside it. */

describe("Surface — the ONE prominence axis", () => {
    it.each([...SURFACE_TIERS])("mounts the %s rung and nothing else", (tier) => {
        const wrapper = mount(Surface, { props: { tier } });
        expect(wrapper.classes()).toContain(`glass-${tier}`);
        expect(wrapper.attributes("data-tier")).toBeUndefined();
    });

    it("defaults to the resting rung", () => {
        expect(mount(Surface).classes()).toContain("glass-resting");
    });
});

describe("G-SM1 ONE-AXIS — one axis, four emitted attributes", () => {
    /* RED at HEAD: `Surface.vue:19` minted `SurfaceMaterial` (a 4-member bijection
       onto four of five tiers, `wash` unreachable through it) and the primitive
       emitted EIGHT attributes to ~1.5 readers, one of which (`data-tier`) collided
       with the dock's incompatible `data-tier` axis. Mutation: re-adding `material`
       as a type ALIAS still reds — the gate reads the EMITTED SET, not names. */
    it("emits exactly {class, style, data-slot, data-surface}", () => {
        const wrapper = mount(Surface, {
            props: { tier: "floating", surface: "veil", deep: true },
        });
        const emitted = Object.keys(wrapper.attributes()).sort();
        expect(emitted).toEqual(["class", "data-slot", "data-surface"]);
        for (const dead of ["data-material", "data-tier", "data-deep", "data-grain", "data-specular"]) {
            expect(wrapper.attributes(dead)).toBeUndefined();
        }
    });

    it("mints no second surface-tier union anywhere under src/", () => {
        const surface = stripComments(src("components/surface/Surface.vue"));
        for (const dead of ["SurfaceMaterial", "SurfaceSpecular", "MATERIAL_TIERS"]) {
            expect(surface).not.toContain(dead);
        }
        // and no alias, no deprecation window: the names leave the public surface
        const barrel = src("components/surface/index.ts");
        expect(barrel).not.toMatch(/SurfaceMaterial|SurfaceSpecular/);
    });

    it("the three silent gates are gone with the props they no-opped", () => {
        // RED at HEAD: `shadow`/`grain`/`specular` each no-opped on a FOURTH prop's
        // value in JS, where the cascade already ruled (an opaque plate's
        // element-level `backdrop-filter: none` wins on its own).
        const surface = stripComments(src("components/surface/Surface.vue"));
        expect(surface).not.toMatch(/specularArmed|shadowArmed|specularStyle/);
    });
});

describe("G-SM2 CLIP-HAS-CORNER — nothing clips without a corner", () => {
    /* RED at HEAD: `grep -c border-radius src/styles/glass/ladder.css` → 0 while
       four rungs sat under `contain: paint`, so every clipped plate cut a sharp
       rectangle. Mutation: narrowing the clip to `.glass-card` alone still reds —
       the rungs stay cornerless; only the radius ON the rung clears both arms. */
    it("every ladder rung declares a resolvable radius", () => {
        const ladder = stripComments(src("styles/glass/ladder.css"));
        for (const tier of SURFACE_TIERS) {
            const rule = ladder.slice(ladder.indexOf(`.glass-${tier} {`));
            const body = rule.slice(0, rule.indexOf("}"));
            expect(body).toMatch(/border-radius:\s*var\(--radius-ctx\)/);
        }
        // the relay channel is DECLARED, so the read resolves
        expect(src("styles/theme/radius.css")).toMatch(/--radius-ctx:\s*var\(/);
    });

    it("no rung is clipped by a register whose members have no radius", () => {
        const material = stripComments(src("styles/glass/material.css"));
        const clip = material.slice(0, material.indexOf("contain: paint"));
        const group = clip.slice(clip.lastIndexOf("}") + 1);
        for (const selector of group.match(/\.glass-[\w-]+/g) ?? []) {
            const tier = selector.replace(".glass-", "");
            if (!SURFACE_TIERS.includes(tier as never)) continue;
            expect(stripComments(src("styles/glass/ladder.css"))).toContain(
                `.glass-${tier} {`,
            );
        }
    });
});

describe("G-SM3 NAMESPACE-HONEST — the prefix promises a material", () => {
    /* RED at HEAD: `.glass-track-well` declared position/overflow/radius/background
       and NOT ONE filter across 39 census rows, while `.glass-material` held 18
       selector positions with ZERO applications. Mutation: `backdrop-filter: none`
       on the groove still reds — `none` is not a material — which is why the cure
       is the RENAME, not a declaration. */
    it("the groove left the glass namespace, and its file left the directory", () => {
        expect(() => src("styles/glass/track-well.css")).toThrow();
        const well = stripComments(src("styles/track-well.css"));
        expect(well).toContain(".track-well {");
        expect(well).not.toContain(".glass-track-well");
        expect(well).not.toMatch(/backdrop-filter/);
    });

    it("no dead `.glass-material` selector position survives", () => {
        for (const rel of [
            "styles/glass/material.css",
            "styles/glass/ladder.css",
            "styles/glass/rim.css",
            "styles/glass/a11y-fallback.css",
            "styles/glass-specular-track.css",
        ]) {
            expect(stripComments(src(rel))).not.toMatch(/\.glass-material\b/);
        }
    });

    it("the light-channel carve-out is the FLOW band, and it declares no material", () => {
        const flow = stripComments(src("styles/glass/track-flow.css"));
        expect(flow).toContain(".track-flow");
        expect(flow).not.toMatch(/\.glass-/);
        expect(flow).toMatch(/mix-blend-mode:\s*plus-lighter/);
    });
});

describe("G-SM4 TIER-ORTHOGONAL — depth thickens, it never jumps", () => {
    /* RED at HEAD: the resolver returned the LITERAL "glass-floating glass-deep"
       for every deep surface and `Surface.vue:57` rewrote an explicit `tier`, so
       two of three shipped depth grades were unreachable. Mutation: restore the
       ternary and overlay-deep collapses to floating → RED. */
    it("surfaceClass keeps the tier under deep", () => {
        expect(surfaceClass("overlay", true)).toBe("glass-overlay glass-deep");
        expect(surfaceClass("quiet", true)).toBe("glass-quiet glass-deep");
        expect(surfaceClass("resting")).toBe("glass-resting");
    });

    it("no source path rewrites an explicit tier", () => {
        const surface = stripComments(src("components/surface/Surface.vue"));
        expect(surface).not.toMatch(/glass-floating glass-deep/);
        expect(surface).not.toMatch(/\?\s*"floating"/);
        expect(mount(Surface, { props: { tier: "overlay", deep: true } }).classes()).toEqual(
            expect.arrayContaining(["glass-overlay", "glass-deep"]),
        );
    });

    it("the deep BRIDGE reaches all five rungs, not just floating", () => {
        // RED at HEAD: `deep.css` bridged `--glass-blur-floating` ALONE, so a graded
        // overlay-deep resolved its depth and then painted a blur that never read the
        // composite. Mutation: delete any one of the five re-points.
        const deep = stripComments(src("styles/glass/deep.css"));
        for (const tier of SURFACE_TIERS) {
            expect(deep).toContain(`--glass-blur-${tier}: var(--glass-blur-deep);`);
        }
    });

    it("deep THICKENS every rung and grades WITH prominence — numerically", () => {
        /* RED at the first cut's bytes: the recipe LERPed the FLOATING radius (20px)
           toward an absolute `--glass-blur-deep-radius` (16px), so deep resolved
           18.6 / 18.6 / 18.6 / 17.2 / 16.0px against plain 10 / 14 / 16 / 20 / 22 —
           THINNER than plain on floating and overlay, and DECREASING with prominence.
           This case resolves the shipped tokens and does the arithmetic, so any
           endpoint/boost retune that re-inverts it reds. Mutation: put the absolute
           endpoint back, or drop a rung's `--glass-blur-tier-radius`. */
        const px = (body: string, name: string) => {
            const hit = new RegExp(`${name}:\\s*([\\d.]+)px`).exec(body);
            if (!hit) throw new Error(`${name} is not declared`);
            return Number(hit[1]);
        };
        const ladder = stripComments(src("styles/tokens/glass.css"));
        const deepTokens = stripComments(src("styles/tokens/glass-deep.css"));
        const deepCss = stripComments(src("styles/glass/deep.css"));

        const boost = px(deepTokens, "--glass-blur-deep-boost");
        const grade = (name: string) =>
            Number(
                new RegExp(`--glass-depth-${name}:\\s*([\\d.]+)`).exec(deepTokens)![1],
            );
        // the rung → grade map, read off the tier map's own rules
        const gradeOf: Record<string, number> = {
            wash: grade("content"),
            quiet: grade("content"),
            resting: grade("content"),
            floating: grade("popover"),
            overlay: grade("menu"),
        };

        const resolved = SURFACE_TIERS.map((tier) => {
            // the rung publishes its OWN radius to the deep recipe
            expect(deepCss).toMatch(
                new RegExp(
                    `:where\\(\\.glass-${tier}\\)\\s*\\{[^}]*--glass-blur-tier-radius:\\s*var\\(--glass-blur-${tier}-radius\\)`,
                ),
            );
            const plain = px(ladder, `--glass-blur-${tier}-radius`);
            return { tier, plain, deep: plain + boost * gradeOf[tier] };
        });

        for (const { tier, plain, deep } of resolved) {
            expect(deep, `deep(${tier}) must not thin the rung`).toBeGreaterThan(plain);
        }
        const deeps = resolved.map((r) => r.deep);
        expect(deeps).toEqual([...deeps].sort((a, b) => a - b));
        expect(deeps).toEqual([11.75, 15.75, 17.75, 23.5, 27]);
    });

    it("veil and opaque withhold the depth IN PAINT, not in script", () => {
        /* The `deep && surface === "glass"` arming gate is DELETED — it was the
           fourth silent JS gate no-opping a prop on another prop's value where the
           cascade had already ruled. The withholding is asserted at its real site:
           opaque zeroes the ONE level scalar (so the deep composition resolves
           blur(0)) and kills the filter at the element; veil paints its own
           `--veil-clarity` off the quiet radius and never reads a bridged rung
           token. Mutation: drop `--glass-level: 0` from the opaque rung, or point
           `--veil-clarity` at `var(--glass-blur-quiet)`, and the withholding stops
           being true. */
        const axis = stripComments(src("styles/glass/surface-axis.css"));
        expect(axis).toMatch(
            /\[data-surface="opaque"\]\s*\{[^}]*--glass-level:\s*0[^}]*backdrop-filter:\s*none/,
        );
        expect(axis).toMatch(
            /--veil-clarity:\s*blur\(\s*calc\(var\(--glass-blur-quiet-radius\)/,
        );
        for (const surface of ["veil", "opaque"] as const) {
            const wrapper = mount(Surface, { props: { surface, deep: true } });
            expect(wrapper.attributes("data-surface")).toBe(surface);
        }
        expect(stripComments(src("components/surface/Surface.vue"))).not.toMatch(
            /deepArmed/,
        );
    });
});

describe("G-SM5 TOKEN-SCOPE-REACHABLE — a declaration a reader can never see", () => {
    /* RED at HEAD: the dark deep arm declared `--glass-blur-deep` on the bare
       `.dark` root while its only input (`--glass-blur-deep-active-radius`) is
       declared ONLY on `.glass-deep` — guaranteed-invalid off a deep surface, and
       beaten by the element declaration on one. It had never painted, in either
       direction. Mutation: move the arm back to bare `.dark` and the gate reds. */
    it("the dark deep arm is declared where its inputs live", () => {
        const arm = stripComments(src("styles/tokens/dark-arm-glass.css"));
        expect(arm).toMatch(/\.dark \.glass-deep\s*\{/);
        expect(arm).not.toMatch(/^\.dark\s*\{/m);
        // a plain `.dark` ANCESTOR, never `:global()`, never inside `light-dark()`
        expect(arm).not.toMatch(/:global\(|light-dark\(/);
    });

    it("the LERP intermediates stay on .glass-deep, where --glass-depth is live", () => {
        const deep = stripComments(src("styles/glass/deep.css"));
        expect(deep).toMatch(/\.glass-deep\s*\{[\s\S]*?--glass-blur-deep-active-radius/);
        expect(stripComments(src("styles/tokens/glass-deep.css"))).not.toMatch(
            /--glass-blur-deep-active-radius\s*:/,
        );
    });
});

describe("the deleted registers are deleted, not orphaned", () => {
    it("material-roles.css and grain-overlay.css are gone with their imports", () => {
        // C-2 + K1. Mutation: leave either @import behind and the build fails
        // fail-closed; leave either FILE behind and it ships unreferenced.
        expect(() => src("styles/glass/material-roles.css")).toThrow();
        expect(() => src("styles/glass/grain-overlay.css")).toThrow();
        const root = src("styles/glass.css");
        expect(root).not.toMatch(/@import\s+"\.\/glass\/(material-roles|grain-overlay)\.css"/);
    });

    it("the unscoped [data-grain] kill is gone with the attribute nobody stamps", () => {
        expect(stripComments(src("styles/glass/surface-axis.css"))).not.toMatch(
            /\[data-grain/,
        );
        expect(stripComments(src("components/surface/Surface.vue"))).not.toMatch(
            /data-grain/,
        );
    });

    it("one resolver, at one path, with one name", () => {
        expect(() => src("components/_shared/resolveSurfaceClass.ts")).toThrow();
        expect(src("components/_shared/surface/resolve.ts")).toMatch(
            /export function surfaceClass\(/,
        );
    });
});

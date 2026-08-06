import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";

// happy-dom runs no CSS cascade engine — `getComputedStyle` does not resolve
// `var()`/`calc()` to a concrete value — so the composed blur is resolved from
// source: substitute the `--glass-blur-*-radius` primitive + `--glass-level: 1`
// into the composed recipe and read the effective blur radius the token paints.
// That asserts the composition OUTCOME, not a bare primitive literal: a recipe
// that stopped threading its primitive would resolve wrong here.

const read = (rel: string): string => readFileSync(join(process.cwd(), rel), "utf8");
const stripCss = (css: string): string => css.replace(/\/\*[\s\S]*?\*\//g, "");

// Every `.css`/`.vue` source file in the library — the census surface for the arms
// whose property is a property of the LIBRARY, not of one token file.
const styleFiles = (): string[] => {
    const walk = (dir: string): string[] =>
        readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
            const path = join(dir, entry.name);
            return entry.isDirectory()
                ? walk(path)
                : /\.(?:css|vue)$/.test(path)
                  ? [path]
                  : [];
        });
    return walk(join(process.cwd(), "src"));
};
const stripComments = (css: string): string =>
    css.replace(/\/\*[\s\S]*?\*\//g, "").replace(/^\s*\/\/.*$/gm, "");

const declMap = (css: string): Map<string, string> => {
    const stripped = css.replace(/\/\*[\s\S]*?\*\//g, "");
    const map = new Map<string, string>();
    for (const m of stripped.matchAll(/(--[\w-]+)\s*:\s*([^;{}]+);/g)) {
        map.set(m[1], m[2].replace(/\s+/g, " ").trim());
    }
    return map;
};

// Substitute every `var(--x)` until the value is var-free; `--glass-level`
// resolves to 1 (the byte-identical rest state).
const flatten = (map: Map<string, string>, value: string): string => {
    let out = value;
    for (let i = 0; i < 32 && /var\(/.test(out); i += 1) {
        out = out.replace(
            /var\(\s*(--[\w-]+)\s*(?:,\s*([^()]*?))?\)/g,
            (_full, name: string, fallback?: string) => {
                if (name === "--glass-level") return "1";
                const v = map.get(name);
                if (v !== undefined) return v;
                return fallback ?? "0";
            },
        );
    }
    return out;
};

// The effective blur radius (px) the composed token paints at --glass-level: 1.
const blurRadius = (map: Map<string, string>, token: string): number => {
    const raw = map.get(token);
    if (raw === undefined) throw new Error(`no declaration for ${token}`);
    const flat = flatten(map, raw);
    const calc = flat.match(/blur\(\s*calc\(\s*([\d.]+)px\s*\*\s*([\d.]+)\s*\)\s*\)/);
    if (calc) return Number.parseFloat(calc[1]) * Number.parseFloat(calc[2]);
    const plain = flat.match(/blur\(\s*([\d.]+)px\s*\)/);
    if (plain) return Number.parseFloat(plain[1]);
    throw new Error(`no blur radius in ${token}: ${flat}`);
};

const light = declMap(read("src/styles/tokens/glass.css"));
// The dark arm moves the ink and the base; every rung is derived from them, so the
// dark map is the light primitives under the dark overrides. Two files carry `.dark`
// glass declarations — the ink/base pair (dark-arm.css) and the deep tier
// (dark-arm-glass.css) — and both are read, so a rung re-declared in EITHER is visible
// to the no-second-ladder assertions below.
const darkArm =
    read("src/styles/tokens/dark-arm-glass.css") + "\n" + read("src/styles/tokens/dark-arm.css");
const dark = new Map(light);
for (const [k, v] of declMap(darkArm)) dark.set(k, v);
const deep = declMap(read("src/styles/tokens/glass-deep.css"));
// The INK half of the same five-rung ladder — its ORDERING invariant, and the
// arithmetic that makes the ordering a property rather than a coincidence. Five hand
// alphas can be re-typed out of order; `base ± n·step` cannot. (`tests-visual/
// glass-prune.spec.ts` used to read the band back off the painted DOM; that spec sat
// in no runner and is struck as apparatus — the assertion it carried lives here, on
// the source bytes.)
describe("glass ink ladder — the veil climbs wash → overlay", () => {
    const RUNGS = ["wash", "quiet", "resting", "floating", "overlay"] as const;

    // Resolve `calc(base ± n * step)` off the declared base/step: happy-dom runs no
    // cascade, so the arithmetic is done here the way the engine would do it.
    const ink = (map: Map<string, string>, rung: string): number => {
        const raw = map.get(`--glass-veil-${rung}`);
        if (raw === undefined) throw new Error(`no declaration for --glass-veil-${rung}`);
        const flat = flatten(map, raw);
        if (!/calc\(/.test(flat)) {
            const bare = Number.parseFloat(flat);
            if (!Number.isFinite(bare)) throw new Error(`--glass-veil-${rung}: ${flat}`);
            return bare;
        }
        const m = flat.match(/calc\(\s*([\d.]+)\s*([+-])\s*(\d+)\s*\*\s*([\d.]+)\s*\)/);
        if (!m) throw new Error(`unparsed veil calc for ${rung}: ${flat}`);
        return (
            Number.parseFloat(m[1]) +
            (m[2] === "-" ? -1 : 1) * Number(m[3]) * Number.parseFloat(m[4])
        );
    };

    const inkL = (map: Map<string, string>): number =>
        Number.parseFloat(map.get("--glass-veil-ink")!.match(/oklch\(\s*([\d.]+)/)![1]);

    it("declares a STRICTLY increasing ink register in BOTH modes", () => {
        for (const [mode, map] of [["light", light], ["dark", dark]] as const) {
            const band = RUNGS.map((rung) => ink(map, rung));
            for (let i = 1; i < band.length; i += 1) {
                expect(
                    band[i],
                    `${mode}: ${RUNGS[i]} (${band[i]}) must sit ABOVE ${RUNGS[i - 1]} (${band[i - 1]})`,
                ).toBeGreaterThan(band[i - 1]);
            }
        }
    });

    it("keeps the CONTENT band under the transmission ceiling in both modes", () => {
        // Occlusion is bought with radius, legibility with ink — never with alpha. The
        // content band must leave the backdrop's structure legible through it, which
        // caps its ink at 0.20. The chrome band may sit above: it claims occlusion, and
        // buys it one rung further up the RADIUS axis.
        for (const [mode, map] of [["light", light], ["dark", dark]] as const) {
            for (const rung of ["wash", "quiet", "resting"] as const) {
                expect(ink(map, rung), `${mode} ${rung}`).toBeLessThanOrEqual(0.2);
            }
            expect(ink(map, "wash"), `${mode} wash`).toBeGreaterThan(0);
            expect(ink(map, "overlay"), `${mode} overlay`).toBeLessThan(1);
        }
    });

    it("derives EVERY rung from the one base and the one step — no hand alphas", () => {
        // A rung typed as a literal would green the ordering check above while making
        // the register un-retunable: moving the base would move four rungs and strand
        // the fifth.
        for (const rung of RUNGS) {
            const raw = light.get(`--glass-veil-${rung}`);
            expect(raw, `no declaration for --glass-veil-${rung}`).toBeDefined();
            expect(raw).toContain("var(--glass-veil-base)");
            if (rung !== "resting") expect(raw).toContain("var(--glass-veil-step)");
        }
    });

    it("moves the DARK arm by the base alone — one line, the whole ladder", () => {
        // The dark register is not a second ladder. A dark re-declaration of any RUNG
        // would fork the ordering into two sources that can drift apart.
        expect(darkArm).not.toMatch(
            /--glass-veil-(?:wash|quiet|resting|floating|overlay)\s*:/,
        );
        const step = Number.parseFloat(light.get("--glass-veil-step")!);
        const delta =
            Number.parseFloat(dark.get("--glass-veil-base")!) -
            Number.parseFloat(light.get("--glass-veil-base")!);
        expect(delta).toBeCloseTo(step, 6);
    });

    it("DIMS in both modes — the ink never inverts to a lightener", () => {
        // The sign law: a rung darkens what is behind it, in light AND in dark. A dark
        // arm that lifts toward cream flattens its own silhouette into the page, and
        // the ladder stops being one ladder. Dark goes DEEPER, not lighter.
        for (const [mode, map] of [["light", light], ["dark", dark]] as const) {
            expect(map.get("--glass-veil-ink"), `${mode}: no --glass-veil-ink`).toBeDefined();
            expect(inkL(map), `${mode} ink lightness`).toBeLessThan(0.5);
        }
        expect(inkL(dark)).toBeLessThan(inkL(light));
    });
});

describe("glass blur ladder — five in-band radii, one calibration anchor", () => {
    const RUNGS = ["wash", "quiet", "resting", "floating", "overlay"] as const;

    it("resolves the light-arm composed rungs to the ladder radii", () => {
        expect(blurRadius(light, "--glass-blur-wash")).toBe(10);
        expect(blurRadius(light, "--glass-blur-quiet")).toBe(14);
        expect(blurRadius(light, "--glass-blur-resting")).toBe(16);
        expect(blurRadius(light, "--glass-blur-floating")).toBe(20);
        expect(blurRadius(light, "--glass-blur-overlay")).toBe(22);
    });

    it("climbs STRICTLY and stays inside the calm band at every rung", () => {
        // The thickness axis is the one that buys occlusion, so it may never plateau:
        // two rungs at one radius are two names for one material. 10px is the least
        // radius that reads as a lens; 22px is where cost climbs faster than the read.
        const band = RUNGS.map((rung) => blurRadius(light, `--glass-blur-${rung}`));
        for (let i = 1; i < band.length; i += 1) {
            expect(band[i], `${RUNGS[i]} must exceed ${RUNGS[i - 1]}`).toBeGreaterThan(
                band[i - 1],
            );
        }
        for (const radius of band) {
            expect(radius).toBeGreaterThanOrEqual(10);
            expect(radius).toBeLessThanOrEqual(22);
        }
    });

    it("mints NO dark radius arm — the dark ladder is the light ladder", () => {
        // Radius is thickness, and thickness does not change with the room's lighting.
        expect(darkArm).not.toMatch(
            /--glass-blur-(?:wash|quiet|resting|floating|overlay)\s*:/,
        );
    });

    it("carries ONE mode-invariant saturate and NO brightness leg", () => {
        // Two writers on the L axis is how a monotone ladder stops being monotone: the
        // ink is the only one. Saturation is a property of the medium, not of the rung
        // and not of the mode.
        for (const rung of RUNGS) {
            const decl = light.get(`--glass-blur-${rung}`)!;
            expect(decl, `${rung} must read the one saturate`).toContain(
                "saturate(var(--glass-saturate))",
            );
            expect(decl, `${rung} must carry no brightness leg`).not.toContain("brightness");
        }
        expect(darkArm).not.toMatch(
            /--glass-saturate-(?:wash|quiet|resting|floating|overlay)\s*:/,
        );
    });

    it("HOLDS the deep ceiling as a SEPARATE opt-in continuum", () => {
        expect(deep.get("--glass-blur-deep-radius")).toBe("16px");
    });

    it("has NO device-conditional overlay-radius writer (the 2dppx arm is KILLED)", () => {
        // Comments carry the kill rationale (which names the retired 17px arm); strip
        // them, then prove no LIVE rule re-pins the overlay radius by device density.
        const raw = read("src/styles/tokens/light-dark.css").replace(/\/\*[\s\S]*?\*\//g, "");
        expect(raw).not.toMatch(/min-resolution/);
        expect(raw).not.toMatch(/--glass-blur-overlay-radius/);
        expect(blurRadius(light, "--glass-blur-overlay")).toBe(22);
    });

    it("keeps the content and overlay tiers distinct after the pull", () => {
        expect(blurRadius(light, "--glass-blur-floating"))
            .toBeGreaterThan(blurRadius(light, "--glass-blur-quiet"));
    });

    it("PAIRS the two axes at every surface — one radius per ink", () => {
        // A rung is a thickness of the same glass. The two axes were censused
        // independently, so the monotone-dilution law was provable of the TABLE and
        // false of the SURFACES: six rules paired one rung's ink with another's kernel,
        // two of them re-pointed by the wave that wrote the table. The pairing is by
        // ALPHA, not by name — the off-ladder footprints sit at the same alphas as the
        // ladder rungs they neighbour (dock ≡ quiet's .10, sheet ≡ overlay's .22), so a
        // footprint pairs with the radius of the rung it shares an alpha with.
        //
        // ITS SCOPE, HONESTLY: it sees a surface only where ONE flat rule body spells
        // BOTH names literally — the ink as `--glass-veil-tier: var(--glass-veil-X)` and
        // the radius as `--glass-blur-Y`. A SPLIT-DECLARATION surface is invisible to
        // it, and the dock is exactly that on both legs: its ink is a `calc()` lerp of
        // two consumer tokens declared in another file (dock/styles/shell.css) and
        // resolved on the plate (dock/styles/dock.css), and its radius is an
        // indirection (`--dock-surface-blur`). So F-7 row 6's RULED exemption is carried
        // by the footprint table and the surface's own comment, NOT by this arm — the
        // arm cannot green or red on it either way. Row 5 (the button's floating ink
        // under the deep kernel) IS visible here and is exempted BY NAME below; that is
        // the difference between the two dispositions, and it is stated rather than
        // implied. Widening the ink leg to follow indirections would mean resolving the
        // cascade, which is π's job, not a source scan's.
        const inkAlpha = (name: string): number => {
            const raw = light.get(`--glass-veil-${name}`);
            if (raw === undefined) throw new Error(`no --glass-veil-${name}`);
            const m = flatten(light, raw).match(
                /calc\(\s*([\d.]+)\s*([+-])\s*(\d+)\s*\*\s*([\d.]+)\s*\)/,
            );
            return m
                ? Number.parseFloat(m[1]) +
                      (m[2] === "-" ? -1 : 1) * Number(m[3]) * Number.parseFloat(m[4])
                : Number.parseFloat(flatten(light, raw));
        };
        const radiusAtAlpha = new Map(
            RUNGS.map((rung) => [inkAlpha(rung), blurRadius(light, `--glass-blur-${rung}`)]),
        );

        // The RULED exemptions (recorded with their ground in the row's cure record).
        // Each is a rule, not a drift: it names why the pairing does not apply to it.
        const EXEMPT = new Map([
            // The deep tier is a SEPARATE continuum anchored ON the floating endpoint at
            // depth 0, so a floating ink under `--glass-blur-deep` IS the diagonal with
            // the depth axis engaged.
            ["deep", "the deep continuum anchors on floating at depth 0"],
        ]);
        const offenders: string[] = [];
        for (const file of styleFiles()) {
            const rel = file.replace(`${process.cwd()}/`, "");
            const css = stripComments(readFileSync(file, "utf8"));
            for (const [, , body] of css.matchAll(/([^{}@]*)\{([^{}]*)\}/g)) {
                // A PAINTED pairing only: the ink is what the rule puts on the plate
                // (its tier, or a composed rung colour in a background), the radius is
                // what it hands to `backdrop-filter`. A `:root` block that happens to
                // declare both names is a token bridge, not a surface.
                const ink = (
                    /--glass-veil-tier:\s*var\(--glass-veil-([a-z]+)\)/.exec(body) ??
                    /background(?:-color|-image)?:[^;]*--glass-plate-([a-z]+)\b/.exec(body)
                )?.[1];
                const blur = /backdrop-filter:[^;]*--glass-blur-([a-z]+)\b/.exec(body)?.[1];
                if (!ink || !blur || EXEMPT.has(blur)) continue;
                let alpha: number;
                try {
                    alpha = inkAlpha(ink);
                } catch {
                    continue; // not a rung/footprint ink (tint, fill, escape…)
                }
                const paired = radiusAtAlpha.get(alpha);
                if (paired === undefined) continue;
                const painted = blurRadius(light, `--glass-blur-${blur}`);
                if (painted !== paired) {
                    offenders.push(
                        `${rel}: ${ink} ink (α ${alpha}) under the ${blur} kernel (${painted}px, pairs at ${paired}px)`,
                    );
                }
            }
        }
        expect(offenders, `off-diagonal ink/radius pairings:\n${offenders.join("\n")}`)
            .toEqual([]);
    });
});

// The immersive stage scrim is GONE, and its describe block with it. It was the last
// `backdrop-filter` on any scrim in the library, and it died with `drawer/styles.css`:
// the family that opted into it retired, and the measurement W-DIALOG took on the other
// two scrim blurs — a wash pulls bright neighbours into every sampled pixel, so the
// "backdrop" BRIGHTENED what it was meant to recede — applies to a fixed 14px sample
// exactly as it applied to the resting ones. A test whose subject file no longer exists
// is ABSENT, not green, so it leaves rather than being re-pointed at something else.

// ── The material's structural invariants ──────────────────────────────────────────
// These are the claims the medium rests on. Each one had a live counter-example in the
// tree before this wave, and each is the kind of defect that greens every gate while
// the surface paints wrong — a property whose only value kills the primary, five white
// legs on one plate, two declarations of one rim, an engine sniff wearing a capability
// query. They are asserted on source bytes because that is where they were true.
describe("glass material — the structural invariants", () => {
    const glassCss = (rel: string): string => read(rel);

    it("frosts every rung — no property exists whose only value is `none`", () => {
        // `--glass-cell-backdrop-filter: none`, forced onto every direct child of a
        // plate, made the rungs unreachable inside any plate: a cell recipe resolved
        // `none` and the frost died exactly where glass was composed. The successor is
        // a DEPTH bound, not a blanket suppression.
        for (const file of styleFiles()) {
            expect(
                stripComments(readFileSync(file, "utf8")),
                `${file} resurrects the nested-cell blanket`,
            ).not.toContain("--glass-cell-backdrop-filter");
        }
        for (const rung of ["wash", "quiet", "resting", "floating", "overlay"]) {
            const rule = new RegExp(
                `\\.glass-${rung}\\s*\\{[^}]*backdrop-filter:\\s*var\\(--glass-blur-${rung}\\)`,
            );
            expect(
                stripComments(glassCss("src/styles/glass/ladder.css")),
                `.glass-${rung} must resolve its own rung filter directly`,
            ).toMatch(rule);
        }
    });

    it("declares --glass-material-rim exactly ONCE in the whole tree", () => {
        // Two declarations shipped: a non-inset dark ring in tokens/shadow.css and the
        // directional inset catch-light in glass/rim.css. Which rim a surface got
        // depended on whether it happened to be in the material group — twenty-two
        // files outside it silently took the wrong one.
        const declarations = styleFiles().flatMap((file) => {
            const hits = stripComments(readFileSync(file, "utf8")).match(
                /--glass-material-rim\s*:/g,
            );
            return hits ? hits.map(() => file) : [];
        });
        expect(declarations, `declared in: ${declarations.join(", ")}`).toHaveLength(1);
        expect(declarations[0]).toContain("rim.css");
    });

    it("carries ONE static white leg per plate, and dark sits at or below light", () => {
        // Five sources of white on one surface is not a catch-light, it is a wash. The
        // dark arm inverts the shipped doctrine deliberately: a 0.40 white ring over a
        // near-black page is the brightest thing on the screen, not a silhouette.
        // The alpha is `calc(<literal> * var(--glass-level))`: the level term is what
        // makes the a11y brackets reach the rim through the ONE clarity knob, so the
        // literal is read out of the calc rather than off a bare number.
        const alphaOf = (css: string): number[] =>
            Array.from(
                stripComments(css).matchAll(
                    /--glass-rim-top:[^;]*hsl\(0 0% 100% \/ calc\(([\d.]+) \* var\(--glass-level\)\)\)/g,
                ),
                (m) => Number.parseFloat(m[1]),
            );
        const lightLegs = alphaOf(read("src/styles/tokens/glass-fx.css"));
        const darkLegs = alphaOf(read("src/styles/tokens/dark-arm.css"));
        expect(lightLegs, "light rim declares exactly one level-scaled lit leg").toHaveLength(1);
        expect(darkLegs, "dark rim declares exactly one level-scaled lit leg").toHaveLength(1);
        expect(lightLegs[0]).toBeLessThanOrEqual(0.12);
        expect(darkLegs[0]).toBeLessThanOrEqual(lightLegs[0]);

        // The struck legs stay struck. Each was a separate white source on the same box.
        for (const dead of [
            "--glass-highlight",
            "--glass-specular:",
            "--glass-specular-dark",
            "--glass-edge-dispersion",
            "--glass-fringe-warm",
            "--glass-fringe-cool",
        ]) {
            for (const file of styleFiles()) {
                expect(
                    stripComments(readFileSync(file, "utf8")),
                    `${file} resurrects ${dead}`,
                ).not.toContain(dead);
            }
        }
    });

    // Every white alpha spelled in a value, in ANY way this codebase spells white,
    // including the `calc(a * var(--glass-level))` form the rim uses. A leg that spells
    // its white as `white 26%` inside a `color-mix()` paints exactly the same ring as
    // one that spells it `hsl(0 0% 100% / 0.26)`; a census that reads only the second
    // one is how the first survives.
    const whiteAlphas = (value: string): number[] => [
        // The modern slash-alpha spellings.
        ...Array.from(
            value.matchAll(
                /(?:hsl\(0 0% 100%|rgb\(255 255 255|oklch\(1 0 0)\s*\/\s*(?:calc\(\s*)?([\d.]+)/g,
            ),
            (m) => Number.parseFloat(m[1]),
        ),
        // The `color-mix()` percentage spellings. The `\b` that used to lead this
        // alternation could NEVER match a `#`: a word boundary before `#` needs a word
        // character to its LEFT, and every way this value can be written puts a space
        // or a comma there — so the two hex arms were decoration and only `white N%`
        // was ever censused. The boundary belongs to the keyword alone.
        ...Array.from(
            value.matchAll(/(?:\bwhite|#fff(?:fff)?)\s+([\d.]+)%/gi),
            (m) => Number.parseFloat(m[1]) / 100,
        ),
        // The legacy comma form. No live occurrence in the tree today — it is here so
        // the census stays a census of WHITE rather than of the spellings this tree
        // happens to use this week.
        ...Array.from(
            value.matchAll(/rgba?\(\s*255\s*,\s*255\s*,\s*255\s*,\s*([\d.]+)\s*\)/g),
            (m) => Number.parseFloat(m[1]),
        ),
    ];

    it("censuses white in EVERY spelling — the detector, checked against itself", () => {
        // An arm whose matcher cannot match is a green gate over an unread surface, and
        // this one shipped with exactly that: two unreachable hex alternations. The
        // detector is asserted here on synthetic values so a spelling that no file uses
        // TODAY is still covered the day one does.
        expect(whiteAlphas("inset 0 1px 0 hsl(0 0% 100% / 0.26)")).toEqual([0.26]);
        expect(whiteAlphas("inset 0 1px 0 hsl(0 0% 100% / calc(0.1 * var(--glass-level)))"))
            .toEqual([0.1]);
        expect(whiteAlphas("color-mix(in srgb, white 26%, transparent)")).toEqual([0.26]);
        expect(whiteAlphas("color-mix(in srgb, #fff 26%, transparent)")).toEqual([0.26]);
        expect(whiteAlphas("color-mix(in srgb, #FFFFFF 22%, transparent)")).toEqual([0.22]);
        expect(whiteAlphas("inset 0 1px 0 rgba(255, 255, 255, 0.3)")).toEqual([0.3]);
        // …and it does not invent white where there is none.
        expect(whiteAlphas("inset 0 1px 0 color-mix(in srgb, var(--foreground) 6%, transparent)"))
            .toEqual([]);
        expect(whiteAlphas("color-mix(in srgb, #fefefe 30%, transparent)")).toEqual([]);
    });

    it("bounds EVERY white inset in the glass token tree, not just the named leg", () => {
        // Naming one token and asserting on it is how a second white ring survives a
        // green gate: the lit leg came to 0.10/0.08 while a 0.75px full-perimeter ring
        // sat beside it at 0.18 light / 0.22 dark — above the ceiling, and dark ABOVE
        // light, which is the exact doctrine the collapse inverts. The census is the
        // assertion: every white inset any glass token paints, whatever it is called.
        const whiteInsets = (rel: string): Map<string, number> => {
            const found = new Map<string, number>();
            for (const [, name, value] of stripComments(read(rel)).matchAll(
                /(--glass-[\w-]+)\s*:\s*([^;{}]*inset[^;{}]*);/g,
            )) {
                const alpha = whiteAlphas(value);
                if (alpha.length > 0) found.set(name, Math.max(...alpha));
            }
            return found;
        };
        const light = whiteInsets("src/styles/tokens/glass-fx.css");
        const dark = whiteInsets("src/styles/tokens/dark-arm.css");

        for (const [name, alpha] of light) {
            expect(alpha, `${name} paints white at ${alpha} — over the 0.12 ceiling`)
                .toBeLessThanOrEqual(0.12);
        }
        // A dark-mode white leg may not out-paint its light peer. A near-black page
        // separates a plate by the page being dark, not by a brighter ring.
        for (const [name, alpha] of dark) {
            const peer = light.get(name);
            expect(peer, `${name} declares a dark arm with no light peer`).toBeDefined();
            expect(alpha, `${name} is BRIGHTER in dark (${alpha}) than light (${peer})`)
                .toBeLessThanOrEqual(peer as number);
        }
    });

    it("bounds every white inset the SURFACES paint, in css AND in .vue blocks", () => {
        // The token-tree census above cannot see a component that spells its own white
        // in its own scoped block: two did, at 0.26 and 0.22, while the register they
        // sat beside held 0.10/0.08 — and the gate was green, because the arm only ever
        // read two token files. The ceiling is a property of the LIBRARY's white, so
        // the census is the library: every `inset` box-shadow leg in every source file.
        const offenders: string[] = [];
        for (const file of styleFiles()) {
            const css = stripComments(readFileSync(file, "utf8"));
            for (const [, value] of css.matchAll(
                /(?:box-shadow|--[\w-]+)\s*:\s*([^;{}]*\binset\b[^;{}]*);/g,
            )) {
                for (const alpha of whiteAlphas(value)) {
                    if (alpha > 0.12) {
                        offenders.push(
                            `${file.replace(`${process.cwd()}/`, "")} — white ${alpha}`,
                        );
                    }
                }
            }
        }
        expect(offenders, `white insets over the 0.12 ceiling:\n${offenders.join("\n")}`)
            .toEqual([]);
    });

    it("reads NO undeclared --glass-* knob — no literal wearing a token name", () => {
        // Four knobs were read with a fallback and declared nowhere: the fallback WAS
        // the value, and the name was decoration. A reader can retune a token; nobody
        // can retune a fallback.
        const css = styleFiles()
            .filter((f) => f.endsWith(".css"))
            .map((f) => stripComments(readFileSync(f, "utf8")))
            .join("\n");
        const declared = new Set(
            Array.from(css.matchAll(/(--glass-[\w-]+)\s*:/g), (m) => m[1]),
        );
        // `@property` registrations declare too.
        for (const m of css.matchAll(/@property\s+(--glass-[\w-]+)/g)) declared.add(m[1]);
        const undeclared = new Set(
            Array.from(css.matchAll(/var\(\s*(--glass-[\w-]+)/g), (m) => m[1]).filter(
                (name) => !declared.has(name),
            ),
        );
        expect(Array.from(undeclared).sort()).toEqual([]);
    });

    it("gates material on NO engine-class proxy", () => {
        // `@supports (backdrop-filter: blur(1px))` around an SVG filter tests one
        // feature to decide about an unrelated one — a browser-class sniff wearing a
        // capability query. The primary works in paint or it fails loud.
        expect(stripComments(read("src/styles/paper.css"))).not.toContain("@supports");
    });

    it("keeps nested filtering plates to a depth of TWO — in the TEMPLATES", () => {
        // The blanket's successor discipline. Nesting composes in quadrature
        // (√(r₁²+r₂²)), so a legal nesting is a bounded optical cost — but a plate
        // inside a plate inside a plate is a cost nobody reasoned about. The grasp
        // register is the one sanctioned two-layer stack, and it is transient.
        //
        // THE HABITAT IS THE DOM, NOT THE SELECTOR TEXT. Plate-in-plate is a
        // composition fact: `<CommandDialog>` puts a `glass-floating` root inside a
        // `DialogContent` that resolves to another, and neither component's stylesheet
        // mentions the other, so a selector scan reads depth 1 and can never fail. This
        // walks the class nesting of the templates, which is where the property lives.
        const rungClass = /\bglass-(?:wash|quiet|resting|floating|overlay|card)\b/;
        const VOID = new Set([
            "area", "base", "br", "col", "embed", "hr", "img", "input",
            "link", "meta", "param", "source", "track", "wbr",
        ]);
        const vueFiles = styleFiles().filter((f) => f.endsWith(".vue"));

        // ONE HOP of component-name → does that component PAINT a plate. A template
        // that writes `<DialogContent>` writes a `glass-floating` box into the DOM, and
        // a scan reading only the literal `class` attributes on the tags in front of it
        // sees a bare component name and counts nothing — which is how the arm read a
        // max depth of 1 against a bound of 2 and could never fail. A component counts
        // if its own comment-stripped source names a rung class OR calls the library's
        // one surface resolver (`resolveSurfaceClass`, which returns `glass-${tier}` by
        // construction) — that is where a computed class like `DialogContent`'s
        // `contentClass` actually resolves its rung, and no render is needed to read it.
        //
        // THE SCOPE, HONESTLY, both ways. It is ONE hop: a plate contributed two
        // components deep (a component whose only plate comes from a component IT
        // writes) is still invisible, so the claim is "no over-deep nest through one
        // hop", not "no over-deep nest" — π counts filtering ancestors at runtime for
        // the rest. And it reads a component as ONE plate wherever the plate sits in
        // that component's own template, so a slot that does not actually land inside
        // that plate is over-counted. Over-counting can only make this arm RED, never
        // green, which is the correct direction for a bound.
        const stripSfc = (source: string): string =>
            source
                .replace(/<!--[\s\S]*?-->/g, "")
                .replace(/\/\*[\s\S]*?\*\//g, "")
                .replace(/^\s*\/\/.*$/gm, "");
        const componentPlate = new Map<string, boolean>();
        for (const file of vueFiles) {
            const source = stripSfc(readFileSync(file, "utf8"));
            componentPlate.set(
                file.replace(/^.*\//, "").replace(/\.vue$/, ""),
                rungClass.test(source) || /resolveSurfaceClass\(/.test(source),
            );
        }
        // The hop is load-bearing, and this is the assertion that it stayed wired: the
        // named habitat (`<Command>` inside `<DialogContent>`, neither stylesheet
        // mentioning the other) resolves to a real depth-2 nest. Without the hop both
        // tags read as depth 0 and the whole walk is decorative.
        expect(componentPlate.get("DialogContent"), "DialogContent no longer resolves as a plate")
            .toBe(true);
        expect(componentPlate.get("Command"), "Command no longer resolves as a plate").toBe(true);

        const offenders: string[] = [];
        for (const file of vueFiles) {
            const template = /<template>([\s\S]*)<\/template>/.exec(
                readFileSync(file, "utf8"),
            );
            if (!template) continue;
            // One pass over the tags: an open tag pushes whether it is a plate, its
            // close pops. Self-closing and void tags nest nothing.
            const stack: boolean[] = [];
            let deepest = 0;
            for (const [, closing, name, attrs, selfClose] of template[1].matchAll(
                /<(\/?)([A-Za-z][\w.-]*)([^>]*?)(\/?)>/g,
            )) {
                if (closing) {
                    stack.pop();
                    continue;
                }
                if (selfClose || VOID.has(name.toLowerCase())) continue;
                // The literal classes on the tag, OR the resolved root of the component
                // the tag names — a plate written as `<CommandDialog>` counts.
                const isPlate = rungClass.test(attrs) || componentPlate.get(name) === true;
                stack.push(isPlate);
                if (isPlate) {
                    deepest = Math.max(deepest, stack.filter(Boolean).length);
                }
            }
            if (deepest > 2) {
                offenders.push(
                    `${file.replace(`${process.cwd()}/`, "")} nests ${deepest} plates`,
                );
            }
        }
        expect(offenders, offenders.join("\n")).toEqual([]);
    });
});

describe("grasp register — the material answers the hand", () => {
    const grasp = read("src/styles/glass/grasp.css");
    const graspCss = stripCss(grasp);
    // The carrier gate every rule in the register hangs off. Every assertion below
    // reads it out of the file rather than re-spelling it, so a register that changed
    // its opt-in cannot leave the arms asserting the old one.
    const CARRIER_GATE = ':has(> .glass-grasp-carrier[data-grasp="grasp"])';
    // The ONE derived ratio, PARSED from the register — not re-typed here. An arm that
    // computes the bound from its own local const is true in any repository state,
    // including one where the file says something else.
    const phi = Number.parseFloat(
        /\*\s*([\d.]+)\s*\*\s*\n?\s*var\(--glass-level\)/.exec(graspCss)?.[1] ?? "NaN",
    );

    it("engages as a TRUE 0ms discrete step", () => {
        // Inertia on the response to a finger reads as lag: the surface must already be
        // open when the finger arrives. The weight lives in the release.
        const engage = new RegExp(
            `\\[data-held\\]${CARRIER_GATE.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\s*\\{([^}]*)\\}`,
        ).exec(graspCss);
        expect(engage, "no [data-held] engage rule gated on the carriers").not.toBeNull();
        expect(engage![1]).not.toContain("transition");
        expect(engage![1]).not.toContain("animation");
    });

    it("DERIVES the held optic from the host rung, never a pinned radius", () => {
        // A pinned 26px over a 20/22px chrome host peaks at 1.262×/1.31× mid-release,
        // past the 1.25× bound. At the ratio the peak is √(1+φ²)/φ = 1.174 at EVERY
        // rung — the breach is unconstructible rather than merely absent. φ is read out
        // of the file, so this fails if the register is re-tuned past the bound.
        expect(grasp).toContain("var(--glass-grasp-radius");
        expect(grasp).not.toMatch(/blur\(\s*26px/);
        expect(phi, "no derived dilation ratio in the register").toBeGreaterThan(1);
        expect(Math.sqrt(1 + phi * phi) / phi).toBeLessThanOrEqual(1.25);
    });

    it("sheds ink toward 0.6× the CLAMPED rest rung, not the raw tier", () => {
        // The band A-11 arms is [0.6·α_rest, α_rest] "at any sampled f", and α_rest is
        // the rung AFTER the backdrop clamp. Shed from the raw tier instead and a held
        // plate over a bright backdrop lands BELOW its own floor — a falsifier that
        // fails by construction, which π would have misread as a mount defect.
        expect(graspCss.replace(/\s+/g, " ")).toContain(
            "--glass-veil-rung: calc(var(--glass-veil-rest) * 0.6);",
        );
        // …and the release lands on exactly that same token, so the carrier unmount is
        // value-identical and the ink does not step at the end of the fade.
        expect(graspCss.replace(/\s+/g, " ")).toContain(
            "--glass-veil-rung: var(--glass-veil-rest);",
        );
        // The token it reads is composed by the plate utility, at the element.
        expect(read("src/styles/glass/veil.css")).toMatch(
            /--glass-veil-rest:\s*clamp\(/,
        );
        // brightness(0.96) is the STATE's measured leg; the calm ladder has none.
        expect(grasp).toContain("brightness(0.96)");
    });

    it("CROSS-COVERS the release — the rest carrier lands before the grasp one leaves", () => {
        // If the grasp filter faded out over a carrier still at opacity 0, the leak
        // (1−o_grasp)(1−o_rest) would be non-zero and the surface would flash to sharp.
        // Anchored on the SUBJECT (the trailing child compound), not on any occurrence
        // of the name: the carrier gate itself spells `data-grasp="grasp"`, so a scan
        // that matched anywhere in the selector read the rest rule as the grasp one.
        const restRule = /> \.glass-grasp-carrier\[data-grasp="rest"\]\s*\{([^}]*)\}/.exec(graspCss);
        const graspRule = /> \.glass-grasp-carrier\[data-grasp="grasp"\]\s*\{([^}]*)\}/.exec(graspCss);
        expect(restRule, "no release rule for the rest carrier").not.toBeNull();
        expect(graspRule, "no release rule for the grasp carrier").not.toBeNull();
        expect(restRule![1]).toContain("opacity: 1");
        expect(restRule![1], "the rest carrier lands in the SAME frame").not.toContain(
            "transition",
        );
        expect(graspRule![1]).toContain("opacity: 0");
        expect(graspRule![1]).toContain("transition");
    });

    it("rides the register table's clock — no minted literal", () => {
        // The prototype measured 177.9ms; a raw literal here would mint a clock beside
        // the register table instead of reading it.
        expect(grasp).toContain("var(--spring-dock-duration)");
        expect(grasp).toContain("var(--ease-standard)");
        expect(graspCss).not.toMatch(/transition:[^;]*\d+ms/);
    });

    it("costs exactly ZERO at rest, and names NO grouping property anywhere", () => {
        // `will-change: backdrop-filter` on the host names a GROUPING property on the
        // direct ancestor of two backdrop-filter boxes, which forms a Backdrop Root:
        // the carriers would sample the host's own veil instead of the page and the
        // register would blur nothing. It also cost something at rest on the one rung
        // whose rest rule it was the only survivor of.
        expect(Array.from(graspCss.matchAll(/will-change/g))).toHaveLength(0);
    });

    it("gates EVERY rule on the carriers — the register cannot flatten a bare host", () => {
        // A `[data-held]` that suppressed the host filter with no carrier mounted is a
        // silent flatten: the first naive binding gets a sharp plate and no error. The
        // carriers ARE the opt-in, so host suppression and ink shed both hang off their
        // presence, and a consumer that has not mounted them sees an inert register.
        const rules = Array.from(graspCss.matchAll(/([^{}]+)\{([^{}]*)\}/g)).filter(
            ([, selector, body]) =>
                /backdrop-filter|--glass-veil-rung|opacity/.test(body) &&
                // The carriers' OWN recipes are not host rules — they only exist when
                // mounted, so they are the gate rather than gated by it.
                !selector.trim().startsWith(".glass-grasp-carrier"),
        );
        expect(rules.length, "no host state rules found").toBeGreaterThan(0);
        for (const [, selector] of rules) {
            expect(
                selector.replace(/\s+/g, " "),
                `a state rule is not gated on the carriers: ${selector.trim()}`,
            ).toContain(CARRIER_GATE);
        }
    });

    it("OUTRANKS the rest register by specificity, in any import order", () => {
        // The §5 ruling greened while the register was a complete no-op on `.glass-card`:
        // `:where(...)[data-held]` ties a plain rung class at (0,1,0) and lost on source
        // order. Import order cannot be the fix — the register's real consumers are
        // component partials imported AFTER it — so the fix is in the selector, and this
        // is the assertion that it stayed there.
        for (const [, selector] of graspCss.matchAll(/([^{}]+)\{[^{}]*\}/g)) {
            if (!selector.includes(CARRIER_GATE)) continue;
            // `:has(> .glass-grasp-carrier[data-grasp="grasp"])` alone is (0,2,0): one
            // class + one attribute. Nothing may zero it.
            expect(
                selector,
                `the carrier gate is inside a :where(), which zeroes it: ${selector.trim()}`,
            ).not.toMatch(/:where\([^)]*:has\(/);
        }
        // …and it still sits after the rim group it reads, which is a cohesion fact
        // rather than a correctness one.
        const imports = read("src/styles/glass.css");
        expect(imports.indexOf("glass/grasp.css")).toBeGreaterThan(
            imports.indexOf("glass/rim.css"),
        );
    });

    it("is MOUNTED by both named consumers, on the plate that carries the hold", () => {
        // §5.1's E-3 naming duty, checked instead of asserted. Both consumers put
        // `data-held` on a ROOT that carries no plate while the glass sat on a
        // descendant, so the register was structurally unmatchable and the gate could
        // not see it: the arms only ever read grasp.css.
        const consumers = [
            ["src/components/dock/GlassDock.vue", "dock-plate"],
            ["src/components/slider/Slider.vue", "slider-range"],
        ] as const;
        for (const [file, plateClass] of consumers) {
            const source = read(file);
            // The element carrying the plate class also carries the hold…
            const plateTag = new RegExp(`<[^>]*${plateClass}[^>]*>`).exec(source);
            expect(plateTag, `${file}: no ${plateClass} element`).not.toBeNull();
            expect(
                plateTag![0],
                `${file}: ${plateClass} does not carry the hold — the register cannot match it`,
            ).toContain("data-held");
            // …and both carriers mount inside it, unmounting on the release's own
            // transitionend rather than on a timer.
            expect(source, `${file}: no rest carrier`).toContain(
                'class="glass-grasp-carrier" data-grasp="rest"',
            );
            expect(source, `${file}: no grasp carrier`).toMatch(
                /class="glass-grasp-carrier"\s+data-grasp="grasp"/,
            );
            expect(source, `${file}: carriers unmount on a timer`).toContain(
                "@transitionend",
            );
            expect(source).not.toMatch(/setTimeout\([^)]*grasp/i);
        }
    });

    // ── The register's hosts, DISCOVERED from the mounts ──────────────────────────
    // Not a hard-coded pair. A third consumer inherits every arm below by MOUNTING the
    // carriers, not by someone remembering to add it to a list here — which is the only
    // version of "the law is generic" that is actually true of the checker.
    //
    // The host is the element the carriers are DIRECT CHILDREN of and which carries
    // `data-held` — walked off the template's own tag stack, because both consumers also
    // put `data-held` on an outer box (the dock root carries it for the public API
    // contract) and a scan that took the first match would check the wrong element.
    const graspHosts = ((): { file: string; classes: string[] }[] => {
        const VOID = new Set(["br", "hr", "img", "input", "source", "track", "wbr"]);
        const found: { file: string; classes: string[] }[] = [];
        for (const file of styleFiles().filter((f) => f.endsWith(".vue"))) {
            const source = readFileSync(file, "utf8");
            if (!source.includes("glass-grasp-carrier")) continue;
            const template = /<template>([\s\S]*)<\/template>/.exec(source);
            if (!template) continue;
            const stack: string[] = [];
            for (const [, closing, name, attrs, selfClose] of template[1]
                .replace(/<!--[\s\S]*?-->/g, "")
                .matchAll(/<(\/?)([A-Za-z][\w.-]*)([^>]*?)(\/?)>/g)) {
                if (attrs.includes("glass-grasp-carrier")) {
                    // The nearest enclosing element that carries the hold. `<template
                    // v-if>` wrappers render nothing, so they are stepped over.
                    for (let i = stack.length - 1; i >= 0; i -= 1) {
                        if (!/\bdata-held\b/.test(stack[i])) continue;
                        const classes = /\bclass="([^"]*)"/.exec(stack[i])?.[1] ?? "";
                        found.push({
                            file: file.replace(`${process.cwd()}/`, ""),
                            classes: classes.split(/\s+/).filter(Boolean),
                        });
                        break;
                    }
                    // NO `continue` — a carrier is an element like any other: its open
                    // tag must push (and its close tag pops below) or the stack desyncs
                    // and a multi-host template attributes a later carrier to the wrong
                    // ancestor.
                }
                if (closing) {
                    stack.pop();
                    continue;
                }
                if (selfClose || VOID.has(name.toLowerCase())) continue;
                stack.push(attrs);
            }
        }
        return found;
    })();

    // Every rule in the library whose SUBJECT is one of a host's classes. Parenthesised
    // groups are masked first so a combinator inside `:has(> …)` is never read as the
    // selector's own structure, and the SUBJECT is the trailing compound — so a rule
    // written `.dark .dock-plate::after` or `.glass-slider[data-held] .slider-range` is
    // seen, which "starts with the class" could not do.
    const maskParens = (selector: string): string => {
        let depth = 0;
        return Array.from(selector, (ch) => {
            if (ch === "(") {
                depth += 1;
                return ch;
            }
            if (ch === ")") {
                depth -= 1;
                return ch;
            }
            return depth > 0 ? "_" : ch;
        }).join("");
    };
    const selectorList = (selector: string): string[] => {
        const masked = maskParens(selector);
        const parts: string[] = [];
        let start = 0;
        for (let i = 0; i < masked.length; i += 1) {
            if (masked[i] !== ",") continue;
            parts.push(selector.slice(start, i));
            start = i + 1;
        }
        parts.push(selector.slice(start));
        return parts.map((p) => p.trim()).filter(Boolean);
    };
    const subjectOf = (selector: string): string => {
        const trimmed = selector.trim();
        const masked = maskParens(trimmed);
        let cut = -1;
        for (const combinator of [" ", ">", "+", "~", "\n", "\t"]) {
            cut = Math.max(cut, masked.lastIndexOf(combinator));
        }
        return trimmed.slice(cut + 1);
    };
    const hostRules = (classes: string[]): { selector: string; body: string }[] => {
        const hit = new RegExp(`\\.(?:${classes.join("|")})(?![\\w-])`);
        const rules: { selector: string; body: string }[] = [];
        for (const file of styleFiles()) {
            const css = stripComments(readFileSync(file, "utf8"));
            for (const [, selector, body] of css.matchAll(/([^{}]+)\{([^{}]*)\}/g)) {
                for (const part of selectorList(selector)) {
                    if (hit.test(subjectOf(part))) rules.push({ selector: part, body });
                }
            }
        }
        return rules;
    };

    it("DISCOVERS its hosts from the mounts — no hard-coded pair", () => {
        // The list this replaces named two files. An arm that names its subjects can
        // only ever certify the subjects someone remembered, which is the same defect
        // as a register that enumerates rung classes.
        expect(graspHosts.length, "no grasp mounts found — the discovery is broken")
            .toBeGreaterThanOrEqual(2);
        for (const host of graspHosts) {
            expect(host.classes, `${host.file}: the grasp host carries no class`)
                .not.toEqual([]);
            expect(
                hostRules(host.classes).length,
                `${host.file}: no rule in the library has ${host.classes.join("/")} as its subject`,
            ).toBeGreaterThan(0);
        }
    });

    it("keeps the engage ink a 0ms step — no host rule transitions the background channel", () => {
        // The ink rides `--glass-veil-rung` alone: engage is the register's true 0ms
        // step and release lerps the RUNG on the register's clock (grasp.css), with
        // `background` recomputing from it each frame. A `transition: background …` on
        // a host makes the engage shed EASE in the `[data-held]`-without-`:active`
        // window (the passive touchstart acquire suppresses activation) — the exact
        // two-clock defect the release-window arm below cannot see.
        for (const host of graspHosts) {
            for (const { selector, body } of hostRules(host.classes)) {
                expect(
                    /transition[^;]*background/.test(body),
                    `${host.file}: \`${selector.trim()}\` transitions the background channel — engage ink must step, never ease`,
                ).toBe(false);
            }
        }
    });

    it("stands DOWN every backdrop root on every mounted host, under the same gate", () => {
        // The register's one precondition, and the one that fails silently. A
        // `backdrop-filter` samples only as far back as its BACKDROP ROOT, so a host
        // that forms one hands its carriers a backdrop of nothing: the hold blurs
        // NOTHING, at full opacity, looking exactly like a mount defect. Captured on
        // Chrome 148 — a `clip-path` host and a `mix-blend-mode`-pseudo host each kill
        // it outright, and each alone is enough. Suppressing the host's own filter is
        // the register's half; the surface's own formers are the surface's, and this is
        // the assertion that a host declaring one also stands it down.
        //
        // `contain` is in the list because `paint`/`strict`/`content` each form one BY
        // SPEC — that is what keeps the five ladder rungs and the card out of the
        // register today (glass/material.css) — while `contain: layout style`, which
        // the dock box carries, measured CLEAN in the same capture and is deliberately
        // not matched. The list is the probe matrix, not a guess. Each former is
        // neutralised BY KEY: a gated body must carry the specific counter-declaration
        // for the former the ungated rule declares (or remove the box outright with
        // `display: none`) — a substring like `pointer-events: none` stands nothing
        // down.
        const FORMERS = [
            { key: "clip-path", forms: /clip-path\s*:\s*(?!none)/, neutral: /clip-path\s*:\s*none/ },
            { key: "mix-blend-mode", forms: /mix-blend-mode\s*:\s*(?!normal)/, neutral: /mix-blend-mode\s*:\s*normal/ },
            { key: "isolation", forms: /isolation\s*:\s*isolate/, neutral: /isolation\s*:\s*auto/ },
            { key: "filter", forms: /(?:^|[;{\s])filter\s*:\s*(?!none)/, neutral: /(?:^|[;{\s])filter\s*:\s*none/ },
            { key: "mask-image", forms: /mask-image\s*:\s*(?!none)/, neutral: /mask-image\s*:\s*none/ },
            { key: "contain", forms: /contain\s*:[^;]*\b(?:paint|strict|content)\b/, neutral: /contain\s*:\s*(?![^;]*\b(?:paint|strict|content)\b)[^;]+/ },
        ] as const;
        const REMOVES_BOX = /display\s*:\s*none/;
        for (const host of graspHosts) {
            const gatedBodies = new Map<string, string[]>();
            const forming: { pseudo: string; selector: string; body: string }[] = [];
            for (const { selector, body } of hostRules(host.classes)) {
                const pseudo = /::([\w-]+)/.exec(subjectOf(selector))?.[1] ?? "";
                if (selector.includes(CARRIER_GATE)) {
                    gatedBodies.set(pseudo, [...(gatedBodies.get(pseudo) ?? []), body]);
                    continue;
                }
                if (FORMERS.some((f) => f.forms.test(body)))
                    forming.push({ pseudo, selector: selector.trim(), body });
            }
            for (const form of forming) {
                const gated = gatedBodies.get(form.pseudo) ?? [];
                for (const former of FORMERS) {
                    if (!former.forms.test(form.body)) continue;
                    expect(
                        gated.some((b) => former.neutral.test(b) || REMOVES_BOX.test(b)),
                        `${host.file}: \`${form.selector}\` forms a backdrop root (${former.key}) and no carrier-gated rule on the same box neutralises that former — the carriers would blur nothing`,
                    ).toBe(true);
                }
            }
        }
    });

    it("moves REAL INK on every mounted host — §5.4's band is falsifiable on BOTH", () => {
        // The band `[0.6·α_rest, α_rest]` was written for a plate, and on the slider it
        // was a structural no-op: the fill never read `--glass-veil-rung`, so "sheds 40%
        // of its ink" moved nothing in paint and the falsifier could not fail on the
        // host it was written for. A host now has to earn the claim one of two ways —
        // compose the plate utility (whose veil resolves the rung, glass/veil.css), or
        // declare the rest endpoint itself AND scale a painted value by the rung.
        expect(read("src/styles/glass/veil.css")).toMatch(
            /--glass-veil:[\s\S]*?var\(--glass-veil-rung\)/,
        );
        for (const host of graspHosts) {
            const bodies = hostRules(host.classes).map((r) => r.body);
            const composesPlate = bodies.some((b) => /@apply[^;]*\bglass-plate\b/.test(b));
            const declaresRest = bodies.some((b) => /--glass-veil-rest\s*:/.test(b));
            const paintsRung = bodies.some((b) =>
                /(?:background|background-color|background-image)\s*:[^;]*var\(\s*--glass-veil-rung\s*\)/.test(
                    b,
                ),
            );
            expect(
                composesPlate || (declaresRest && paintsRung),
                `${host.file}: ${host.classes.join("/")} mounts the carriers but its ink never reads --glass-veil-rung — the held shed is prose there`,
            ).toBe(true);
        }
    });

    it("keeps the ONE unlayered scoped exception COMPOSING the register's ink", () => {
        // An SFC-scoped block is unlayered, and unlayered author declarations beat every
        // `@layer` rule at any specificity — the one hole in the outrank-by-specificity
        // doctrine, stated in grasp.css. The Slider's release-window rule is exactly
        // that case: it declares `transition` on the very element the register releases
        // on, so the register's own `--glass-veil-rung` transition loses there. It must
        // therefore carry the channel itself, off the REGISTER's clock — a shorthand
        // that dropped it would step the ink 0.6 → 1 in one frame under a blur still
        // fading over the dock spring's settle.
        const slider = stripComments(read("src/components/slider/Slider.vue"));
        const rule =
            /\.glass-slider:not\(:active\):not\(\[data-held\]\)\s+\.slider-range\s*\{([^}]*)\}/.exec(
                slider,
            );
        expect(rule, "the Slider's release-window rule is gone or renamed").not.toBeNull();
        expect(rule![1], "the scoped shorthand drops the register's ink channel").toContain(
            "--glass-veil-rung",
        );
        expect(rule![1], "the exception re-types a clock instead of reading one").toContain(
            "var(--spring-dock-duration)",
        );
        expect(rule![1]).toContain("var(--ease-standard)");
        expect(rule![1], "a literal duration would mint a second clock").not.toMatch(/\d+ms/);
        // …and it does NOT also transition the dependent `background`: the fill's
        // background is a function of the rung, so animating both chases one change down
        // two clocks and lands the ink behind its own blur.
        expect(rule![1], "the dependent background channel is back on a second clock")
            .not.toContain("background");
        // The exception is STATED where the doctrine is, not only where it is used.
        expect(grasp).toContain("UNLAYERED");
        expect(grasp).toContain("Slider.vue");
    });
});


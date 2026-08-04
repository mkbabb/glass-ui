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
});

// The private immersive stage scrim is a scene-SEPARATION effect, not a calm/deep
// glass rung: fixed 14px at --glass-level:1, MULTIPLIED by the shared clarity scalar
// (so the a11y brackets flatten it), radius INDEPENDENT of the per-frame --stage-t,
// and blur-only (no saturation term). Source-substituted the same way the ladder is.
describe("immersive stage scrim — private stage effect, 14px × --glass-level", () => {
    const drawer = read("src/components/drawer/styles.css");
    const scrimMap = declMap(drawer);

    it("declares the private radius token at a fixed 14px", () => {
        expect(scrimMap.get("--stage-immersive-blur-radius")).toBe("14px");
    });

    it("multiplies the radius by the shared --glass-level clarity axis", () => {
        // 14px at level 1, 4.2px at level 0.3, 0px at level 0 — resolved from source.
        expect(blurRadius(scrimMap, "--stage-immersive-blur")).toBe(14);
        const flatLvl = flatten(scrimMap, scrimMap.get("--stage-immersive-blur")!);
        expect(scrimMap.get("--stage-immersive-blur")).toContain("var(--glass-level)");
        expect(flatLvl).toMatch(/blur\(\s*calc\(\s*14px\s*\*\s*1\s*\)\s*\)/);
    });

    it("keeps the radius OFF the per-frame --stage-t clock and free of saturation", () => {
        const decl = scrimMap.get("--stage-immersive-blur")!;
        expect(decl).not.toContain("--stage-t");
        expect(decl).not.toContain("saturate");
        expect(decl).not.toContain("brightness");
    });

    it("consumes NO calm/deep rung — it is not the deep endpoint", () => {
        // The immersive backdrop-filter reads the private token, never --glass-blur-deep-*.
        const rule = /\[data-stage-scrim\]\[data-stage-immersive\][^{]*\{[^}]*\}/.exec(drawer);
        expect(rule).not.toBeNull();
        expect(rule![0]).toContain("var(--stage-immersive-blur)");
        expect(rule![0]).not.toContain("--glass-blur-deep-radius");
    });
});

// ── The material's structural invariants ──────────────────────────────────────────
// These are the claims the medium rests on. Each one had a live counter-example in the
// tree before this wave, and each is the kind of defect that greens every gate while
// the surface paints wrong — a property whose only value kills the primary, five white
// legs on one plate, two declarations of one rim, an engine sniff wearing a capability
// query. They are asserted on source bytes because that is where they were true.
describe("glass material — the structural invariants", () => {
    const glassCss = (rel: string): string => read(rel);
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
        const alphaOf = (css: string): number[] =>
            Array.from(
                stripComments(css).matchAll(
                    /--glass-rim-top:[^;]*hsl\(0 0% 100% \/ ([\d.]+)\)/g,
                ),
                (m) => Number.parseFloat(m[1]),
            );
        const lightLegs = alphaOf(read("src/styles/tokens/glass-fx.css"));
        const darkLegs = alphaOf(read("src/styles/tokens/dark-arm.css"));
        expect(lightLegs, "light rim declares exactly one lit leg").toHaveLength(1);
        expect(darkLegs, "dark rim declares exactly one lit leg").toHaveLength(1);
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
                const alpha = Array.from(
                    value.matchAll(
                        /(?:hsl\(0 0% 100%|rgb\(255 255 255)\s*\/\s*([\d.]+)\)/g,
                    ),
                    (m) => Number.parseFloat(m[1]),
                );
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

    it("keeps nested filtering plates to a depth of TWO", () => {
        // The blanket's successor discipline. Nesting composes in quadrature
        // (√(r₁²+r₂²)), so a legal nesting is a bounded optical cost — but a plate
        // inside a plate inside a plate is a cost nobody reasoned about. The grasp
        // register is the one sanctioned two-layer stack, and it is transient.
        const rungClass = /\.glass-(?:wash|quiet|resting|floating|overlay|card)\b/;
        for (const file of styleFiles().filter((f) => f.endsWith(".css"))) {
            const css = stripComments(readFileSync(file, "utf8"));
            for (const block of css.matchAll(/([^@{}]*?)\{/g)) {
                // A comma splits ALTERNATIVES, not descendants: `.glass-wash, .glass-quiet`
                // is two selectors of depth one.
                for (const selector of block[1].split(",")) {
                    const depth = selector
                        .split(/\s+|>/)
                        .filter((part) => rungClass.test(part)).length;
                    expect(
                        depth,
                        `${file}: selector nests ${depth} filtering plates — ${selector.trim()}`,
                    ).toBeLessThanOrEqual(2);
                }
            }
        }
    });
});

describe("grasp register — the material answers the hand", () => {
    const grasp = read("src/styles/glass/grasp.css");

    it("engages as a TRUE 0ms discrete step", () => {
        // Inertia on the response to a finger reads as lag: the surface must already be
        // open when the finger arrives. The weight lives in the release.
        const engage = /\[data-held\]\s*\{([^}]*)\}/.exec(grasp);
        expect(engage, "no [data-held] engage rule").not.toBeNull();
        expect(engage![1]).not.toContain("transition");
        expect(engage![1]).not.toContain("animation");
    });

    it("DERIVES the held optic from the host rung, never a pinned radius", () => {
        // A pinned 26px over a 20/22px chrome host peaks at 1.262×/1.31× mid-release,
        // past the 1.25× bound. At the ratio the peak is √(1+1.625²)/1.625 = 1.174 at
        // EVERY rung — the breach is unconstructible rather than merely absent.
        expect(grasp).toContain("var(--glass-grasp-radius");
        expect(grasp).toContain("1.625");
        expect(grasp).not.toMatch(/blur\(\s*26px/);
        const phi = 1.625;
        expect(Math.sqrt(1 + phi * phi) / phi).toBeLessThanOrEqual(1.25);
    });

    it("sheds ink toward 0.6× the rung — the held plate opens, never brightens", () => {
        expect(grasp.replace(/\s+/g, " ")).toMatch(
            /--glass-veil-rung: calc\([^;]*\* 0\.6 \)/,
        );
        // brightness(0.96) is the STATE's measured leg; the calm ladder has none.
        expect(grasp).toContain("brightness(0.96)");
    });

    it("CROSS-COVERS the release — the rest carrier lands before the grasp one leaves", () => {
        // If the grasp filter faded out over a carrier still at opacity 0, the leak
        // (1−o_grasp)(1−o_rest) would be non-zero and the surface would flash to sharp.
        const restRule = /\[data-releasing\][^{]*data-grasp="rest"\][^{]*\{([^}]*)\}/.exec(grasp);
        const graspRule = /\[data-releasing\][^{]*data-grasp="grasp"\][^{]*\{([^}]*)\}/.exec(grasp);
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
        expect(stripCss(grasp)).not.toMatch(/transition:[^;]*\d+ms/);
    });

    it("costs exactly ZERO at rest — will-change is engage-only", () => {
        const willChange = Array.from(grasp.matchAll(/will-change:/g));
        expect(willChange).toHaveLength(1);
        const engage = /\[data-held\]\s*\{([^}]*)\}/.exec(grasp);
        expect(engage![1]).toContain("will-change");
    });
});

const stripCss = (css: string): string => css.replace(/\/\*[\s\S]*?\*\//g, "");

// BK TERMINAL-ROSTER row #31 (W-A11Y) — the A11Y family's `G-CONTRAST-COMPUTED` seat.
//
// THE INVARIANT: every authored token pair that ships as ink-on-a-surface computes
// its WCAG ratio, by an actual contrast computation, against the floor its role owes.
//
// WHY IT HAD TO BE A COMPUTATION. The register this file replaces
// (`placeholder-contrast.test.ts`, W1-D) asserted that four placeholder selectors
// resolved onto `var(--muted-foreground)` — a token-IDENTITY check. That is a real
// assertion and it is re-homed below in full, but it cannot see the thing it exists
// to prevent: it passes for any value the token happens to hold. ECOUTE §3 booked the
// seat RED on exactly that ground — "`placeholder-contrast.test.ts` computes no
// contrast" — and the three defects that were live behind it were all invisible to
// identity checks:
//   · the unchecked Checkbox/RadioGroupItem boundary at 1.28:1 against a 3.0 floor;
//   · five of eight button tone/ink pairs under 4.5, two of them under 2.4;
//   · dark-mode error text at 3.67:1 under a token comment asserting 4.60:1.
// The last one is why §5 exists. A figure written into a token comment is a CLAIM,
// and the 4.60 claim was the reciprocal pair (the ink over the red, not the red over
// the card) — a transposition no reader would catch and no identity check could. So
// the claims are held here too, by name, against the same engine.
//
// ONE gate, five tables (the gates-abrogation budget: this is a single seat and the
// W1-D scan folds INTO it, per BAND-A11Y §Gate posture — "ONE invariant gate (W3-C,
// absorbing the W1-D source scan)"). Seats +0: `G-CONTRAST-COMPUTED` is an existing
// §B.5 A11Y seat; this file binds it and the SEAT-BINDING re-bind routes to #65.
//
// COMPOSITED-OVER-GLASS pairs stay OUT, in the band's LIVE-DEFER register: a ratio
// against a backdrop-filtered plate is a paint measurement (the oklab paint-arm
// lesson), not an arithmetic one, and asserting it from authored bytes would be a
// figure with no detector behind it. Everything below is an OPAQUE pair.

import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

// ── the token scopes ──────────────────────────────────────────────────────────────
//
// Three files declare the values under test, in the cascade order the browser sees:
//   `scale-paper.css`  — the derived control registers (`--control-ring`)
//   `color-radius.css` — the light arm / the `.dark`-fallback base
//   `dark-arm.css`     — the `.dark` class arm, which overrides only what it redeclares
// `light-dark.css` is the enhancement arm. Its VALUES are checked against these for
// LOCKSTEP (§4) rather than folded into the scopes — two paths that must paint the
// same colour are only interesting if they are compared — while its CLAIMS are held
// like every other file's (§5): a figure that lives only in the arm a @supports-split
// engine actually paints is still a figure, and it was held by nothing.

const SCALE_PAPER = "src/styles/tokens/scale-paper.css";
const LIGHT_TOKENS = "src/styles/tokens/color-radius.css";
const DARK_TOKENS = "src/styles/tokens/dark-arm.css";
const LIGHT_DARK = "src/styles/tokens/light-dark.css";

const read = (path: string): string => readFileSync(path, "utf8");

type Scope = Record<string, string>;

function declarations(source: string): Scope {
    const out: Scope = {};
    const re = /(--[\w-]+)\s*:\s*([^;]+);/g;
    let match: RegExpExecArray | null;
    while ((match = re.exec(source))) out[match[1]] = match[2].trim();
    return out;
}

const lightScope: Scope = {
    ...declarations(read(SCALE_PAPER)),
    ...declarations(read(LIGHT_TOKENS)),
};
const darkScope: Scope = { ...lightScope, ...declarations(read(DARK_TOKENS)) };

// ── the colour engine ─────────────────────────────────────────────────────────────
//
// Deliberately NOT a dependency: the pairs under test are authored in three syntaxes
// (`hsl()`, `oklch()`, `color-mix()`) behind arbitrary `var()` depth, and a detector
// that cannot resolve the actual authored bytes would silently skip the rows that
// matter. ~90 lines, every one of them exercised by the tables below.

interface Colour {
    rgb: [number, number, number];
    a: number;
}

const srgbToLinear = (c: number): number =>
    c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
const linearToSrgb = (c: number): number =>
    c <= 0.0031308 ? c * 12.92 : 1.055 * c ** (1 / 2.4) - 0.055;
const clamp01 = (v: number): number => Math.min(1, Math.max(0, v));

function hslToRgb(h: number, s: number, l: number): [number, number, number] {
    const hue = ((h % 360) + 360) % 360;
    const sat = s / 100;
    const lum = l / 100;
    const c = (1 - Math.abs(2 * lum - 1)) * sat;
    const x = c * (1 - Math.abs(((hue / 60) % 2) - 1));
    const m = lum - c / 2;
    const [r, g, b] =
        hue < 60
            ? [c, x, 0]
            : hue < 120
              ? [x, c, 0]
              : hue < 180
                ? [0, c, x]
                : hue < 240
                  ? [0, x, c]
                  : hue < 300
                    ? [x, 0, c]
                    : [c, 0, x];
    return [r + m, g + m, b + m];
}

function oklchToRgb(L: number, C: number, hDeg: number): [number, number, number] {
    const h = (hDeg * Math.PI) / 180;
    const a = C * Math.cos(h);
    const b2 = C * Math.sin(h);
    const l = (L + 0.3963377774 * a + 0.2158037573 * b2) ** 3;
    const m = (L - 0.1055613458 * a - 0.0638541728 * b2) ** 3;
    const s = (L - 0.0894841775 * a - 1.291485548 * b2) ** 3;
    return [
        clamp01(linearToSrgb(4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s)),
        clamp01(linearToSrgb(-1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s)),
        clamp01(linearToSrgb(-0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s)),
    ];
}

/** Split on top-level commas only — `color-mix()` arguments nest function calls. */
function splitTopLevel(text: string): string[] {
    const parts: string[] = [];
    let depth = 0;
    let current = "";
    for (const ch of text) {
        if (ch === "(") depth += 1;
        if (ch === ")") depth -= 1;
        if (ch === "," && depth === 0) {
            parts.push(current.trim());
            current = "";
            continue;
        }
        current += ch;
    }
    parts.push(current.trim());
    return parts;
}

const alphaOf = (raw: string | undefined): number =>
    raw === undefined
        ? 1
        : raw.endsWith("%")
          ? Number.parseFloat(raw) / 100
          : Number.parseFloat(raw);

/* THE ONE-INK IDIOM, taught to the resolver rather than worked around.
 * `tokens/color-radius.css` §1.2 declares the ink register as BARE α SCALARS and
 * names the composition its readers must use, verbatim:
 *   `color-mix(in oklab, var(--foreground) calc(var(--ink-edge) * 100%), transparent)`
 * A resolver that only understands a literal `48%` cannot measure anything painted
 * that way — and everything the register governs is painted that way. So the mix
 * weight is read as EITHER a literal percentage OR that scalar-times-100% form, with
 * the scalar pulled from the same scope as every other token. The gate reads the
 * shipped alpha; it never restates it. */
const percentOf = (arg: string, scope: Scope): number | undefined => {
    const literal = arg.match(/\s([\d.]+)%$/);
    if (literal) return Number(literal[1]) / 100;
    const scaled = arg.match(/\scalc\(\s*var\(\s*(--[\w-]+)\s*\)\s*\*\s*100%\s*\)$/);
    if (!scaled) return undefined;
    const declared = scope[scaled[1]];
    if (declared === undefined) throw new Error(`unresolved scalar: ${scaled[1]}`);
    return Number.parseFloat(declared);
};
const stripPercent = (arg: string): string =>
    arg
        .replace(/\s[\d.]+%$/, "")
        .replace(/\scalc\(\s*var\(\s*--[\w-]+\s*\)\s*\*\s*100%\s*\)$/, "");

export function resolveColour(expression: string, scope: Scope, depth = 0): Colour {
    if (depth > 16) throw new Error(`var() cycle resolving: ${expression}`);
    const expr = expression
        .trim()
        .replace(/\/\*[\s\S]*?\*\//g, "")
        .trim();

    const varMatch = expr.match(/^var\(\s*(--[\w-]+)\s*(?:,\s*([\s\S]+))?\)$/);
    if (varMatch) {
        const declared = scope[varMatch[1]];
        if (declared !== undefined) return resolveColour(declared, scope, depth + 1);
        if (varMatch[2]) return resolveColour(varMatch[2], scope, depth + 1);
        throw new Error(`unresolved token: ${varMatch[1]}`);
    }

    const hsl = expr.match(
        /^hsl\(\s*([\d.]+)\s+([\d.]+)%\s+([\d.]+)%\s*(?:\/\s*([\d.%]+)\s*)?\)$/,
    );
    if (hsl) {
        return {
            rgb: hslToRgb(Number(hsl[1]), Number(hsl[2]), Number(hsl[3])),
            a: alphaOf(hsl[4]),
        };
    }

    const oklch = expr.match(
        /^oklch\(\s*([\d.]+)\s+([\d.]+)\s+([\d.]+)\s*(?:\/\s*([\d.%]+)\s*)?\)$/,
    );
    if (oklch) {
        return {
            rgb: oklchToRgb(Number(oklch[1]), Number(oklch[2]), Number(oklch[3])),
            a: alphaOf(oklch[4]),
        };
    }

    if (/^transparent$/i.test(expr)) return { rgb: [0, 0, 0], a: 0 };

    const mix = expr.match(/^color-mix\(\s*in\s+[\w-]+\s*,\s*([\s\S]+)\)$/);
    if (mix) {
        const [first, second] = splitTopLevel(mix[1]);
        const firstPct = percentOf(first, scope);
        const secondPct = percentOf(second, scope);
        const a = resolveColour(stripPercent(first), scope, depth + 1);
        const b = resolveColour(stripPercent(second), scope, depth + 1);
        const wa =
            firstPct !== undefined
                ? firstPct
                : secondPct !== undefined
                  ? 1 - secondPct
                  : 0.5;
        const wb = 1 - wa;
        // CSS `color-mix()` interpolates PREMULTIPLIED, which is why a mix toward
        // `transparent` darkens nothing — it only thins.
        const alpha = a.a * wa + b.a * wb;
        const channel = (i: 0 | 1 | 2): number =>
            alpha === 0 ? 0 : (a.rgb[i] * a.a * wa + b.rgb[i] * b.a * wb) / alpha;
        return { rgb: [channel(0), channel(1), channel(2)], a: alpha };
    }

    throw new Error(`unparsed colour: ${expr}`);
}

/** Composite a (possibly translucent) colour over an opaque surface. */
const composite = (fg: Colour, bg: Colour): Colour => ({
    rgb: [0, 1, 2].map((i) => fg.rgb[i] * fg.a + bg.rgb[i] * (1 - fg.a)) as Colour["rgb"],
    a: 1,
});

const relativeLuminance = ({ rgb }: Colour): number =>
    0.2126 * srgbToLinear(rgb[0]) +
    0.7152 * srgbToLinear(rgb[1]) +
    0.0722 * srgbToLinear(rgb[2]);

export function contrast(fg: Colour, bg: Colour): number {
    const [hi, lo] = [relativeLuminance(fg), relativeLuminance(bg)].sort((x, y) => y - x);
    return (hi + 0.05) / (lo + 0.05);
}

/** The measured ratio of `ink` painted over the opaque `surface`, in one arm. */
function ratio(ink: string, surface: string, scope: Scope): number {
    const bg = resolveColour(surface, scope);
    return contrast(composite(resolveColour(ink, scope), bg), bg);
}

const round = (value: number): number => Math.round(value * 100) / 100;

const ARMS: Array<[string, Scope]> = [
    ["light", lightScope],
    ["dark", darkScope],
];

const TEXT_FLOOR = 4.5;
const NON_TEXT_FLOOR = 3.0;

// The two ink polarities the library speaks — the warm ink every solid tone now
// wears, and the pale off-white it replaced. Named once: §1 DERIVES the law from the
// pair, §5 holds the losing column that derivation produces.
const WARM_INK = "hsl(24 10% 10%)";
const PALE_INK = "hsl(48 10% 96%)";

// ══════════════════════════════════════════════════════════════════════════════════

describe("G-CONTRAST-COMPUTED — authored token pairs clear their floors, by computation", () => {
    // §1 · the tone/ink table. Every `--button-tone` / `--button-tone-ink` pair
    // `button/styles.css:92-115` can bind, on a SOLID fill — no glass, no alpha, so
    // the arithmetic is the whole truth. Five of these eight were RED before W3-A.
    describe("§1 tone/ink — solid status plates carry legible ink", () => {
        const TONES = ["success", "warning", "info", "destructive"] as const;
        for (const tone of TONES) {
            for (const [arm, scope] of ARMS) {
                it(`--${tone} / --${tone}-foreground clears ${TEXT_FLOOR}:1 [${arm}]`, () => {
                    const measured = ratio(
                        `var(--${tone}-foreground)`,
                        `var(--${tone})`,
                        scope,
                    );
                    expect(
                        measured,
                        `${tone} [${arm}] computed ${round(measured)}:1`,
                    ).toBeGreaterThanOrEqual(TEXT_FLOOR);
                });
            }
        }

        it("ink polarity is DERIVED — each tone wears the polarity that measures higher", () => {
            // The law W3-A landed: the ink is not a preference, it is whichever of the
            // two candidate polarities computes the larger ratio against that tone's
            // own authored value. A shipped `-foreground` that loses to the opposite
            // polarity is a pair that was chosen rather than derived — which is
            // exactly how success/info shipped white ink at 2.21 and 3.49.
            for (const tone of TONES) {
                for (const [arm, scope] of ARMS) {
                    const shipped = ratio(
                        `var(--${tone}-foreground)`,
                        `var(--${tone})`,
                        scope,
                    );
                    const alternatives = [WARM_INK, PALE_INK].map((ink) =>
                        ratio(ink, `var(--${tone})`, scope),
                    );
                    expect(
                        shipped,
                        `${tone} [${arm}]: shipped ink ${round(shipped)}:1 loses to the opposite polarity (${alternatives.map(round).join(" / ")})`,
                    ).toBeGreaterThanOrEqual(Math.max(...alternatives) - 0.01);
                }
            }
        });
    });

    // §2 · the placeholder table — W1-D's register, ABSORBED. Both halves survive:
    // the source-identity half (the four page-opaque registers resolve onto the ONE
    // bare token, no alpha / no opacity / no mix) and the half it could never do
    // (that token, composited over the surfaces a field sits on, clears the floor).
    describe("§2 placeholder registers — one token, and that token computes", () => {
        const REGISTERS: Array<[string, string]> = [
            [".input-pill::placeholder", "src/styles/glass/control-surfaces.css"],
            [
                ".field-control::placeholder",
                "src/components/_shared/field/control.css",
            ],
            [".input-bar-field::placeholder", "src/styles/utilities/components.css"],
            // [2026-08-09 · BK #66 CLOSE · RT-18A] the `.tags-input__input::placeholder`
            // register left with its component. Three registers remain; the token law is
            // unchanged and still proved on every register that exists.
        ];

        function ruleBlock(source: string, selector: string): string | null {
            const at = source.indexOf(selector);
            if (at < 0) return null;
            const open = source.indexOf("{", at);
            const close = source.indexOf("}", open);
            if (open < 0 || close < 0) return null;
            return source.slice(open + 1, close);
        }

        for (const [selector, file] of REGISTERS) {
            it(`${selector} resolves onto bare var(--muted-foreground)`, () => {
                const block = ruleBlock(read(file), selector);
                expect(block, `${selector} present in ${file}`).not.toBeNull();
                expect(block!).toMatch(/color:\s*var\(--muted-foreground\)\s*;/);
                // No sub-floor mechanism may re-enter the block: each of these three
                // is how one of the four registers used to fail.
                expect(block!).not.toMatch(/surface-tint/);
                expect(block!).not.toMatch(/opacity/);
                expect(block!).not.toMatch(/color-mix/);
            });
        }

        for (const [arm, scope] of ARMS) {
            it(`--muted-foreground clears ${TEXT_FLOOR}:1 on every field surface [${arm}]`, () => {
                for (const surface of ["--background", "--card", "--muted"]) {
                    const measured = ratio(
                        "var(--muted-foreground)",
                        `var(${surface})`,
                        scope,
                    );
                    expect(
                        measured,
                        `placeholder over ${surface} [${arm}] computed ${round(measured)}:1`,
                    ).toBeGreaterThanOrEqual(TEXT_FLOOR);
                }
            });
        }

        it("the orphaned --surface-tint-35 register stays deleted (def + dark arm + bridge)", () => {
            expect(read(LIGHT_TOKENS)).not.toMatch(/--surface-tint-35\s*:/);
            expect(read(DARK_TOKENS)).not.toMatch(/--surface-tint-35\s*:/);
            expect(read("src/styles/theme/bridges.css")).not.toMatch(
                /--color-surface-tint-35\s*:/,
            );
        });
    });

    // §3 · the NON-TEXT table. WCAG 1.4.11's 3.0 floor for the visual boundary that
    // identifies a control — and for an UNCHECKED checkbox or radio that boundary is
    // the whole control, since there is nothing inside it to see.
    describe("§3 control boundaries — the unchecked state is visible at all", () => {
        const CHECK_SURFACES = [
            "--background",
            "--card",
            "--popover",
            "--secondary",
            "--muted",
        ];
        /* ~~`--control-ring`~~ [2026-08-08 · BK #83 W-CONTROL-BIT: the SUBJECT MOVED,
         * the floor did not. The token is deleted — it was a colour-valued ink at a
         * hand-set alpha sitting beside the bare-scalar one-ink register, i.e. the fork
         * `color-radius.css` §1.2 exists to forbid — and its only two readers are now
         * the ONE `.control-bit` register, which composes the PERIMETER rung. These
         * three cases follow the thing they measure rather than being deleted with the
         * name: the boundary that identifies an unchecked control still owes 3:1, and
         * it is still measured on every surface a checks atom sits on, in both arms.
         * The composition below is READ OFF THE REGISTER, not restated here, so the
         * gate cannot drift from what paints.] */
        const REGISTER = "src/styles/glass/control-bit.css";
        const perimeterEdge = (): string => {
            const source = read(REGISTER);
            const match = source.match(
                /--control-bit-ink:\s*(color-mix\([\s\S]*?\n {8}\));/,
            );
            if (!match) throw new Error("control-bit.css declares no --control-bit-ink");
            return match[1].replace(/\s+/g, " ");
        };

        for (const [arm, scope] of ARMS) {
            it(`the control-bit perimeter clears ${NON_TEXT_FLOOR}:1 on every surface a checks atom sits on [${arm}]`, () => {
                for (const surface of CHECK_SURFACES) {
                    const measured = ratio(perimeterEdge(), `var(${surface})`, scope);
                    expect(
                        measured,
                        `--control-bit-ink over ${surface} [${arm}] computed ${round(measured)}:1`,
                    ).toBeGreaterThanOrEqual(NON_TEXT_FLOOR);
                }
            });
        }

        it("the perimeter is declared ONCE and read by all three bits (one register, not three literals)", () => {
            // the retired fork is gone from its declaration site and from every reader
            expect(read(SCALE_PAPER)).not.toMatch(/^\s*--control-ring\s*:/m);
            for (const file of [
                "src/components/checkbox/styles.css",
                "src/components/switch/styles.css",
                "src/components/radio-group/styles.css",
            ]) {
                /* Comments stripped: this lane's sheets carry their derivations in
                 * prose, including the arithmetic of the very border the register
                 * owns, and a gate that reads the record of a cure as the defect
                 * convicts the explanation instead of the code. */
                const css = read(file).replace(/\/\*[\s\S]*?\*\//g, "");
                expect(css).not.toMatch(/var\(--control-ring\)/);
                // no shell re-declares an edge: the register owns the only one
                expect(css).not.toMatch(/border:\s*1px solid/);
            }
            expect(read(REGISTER)).toMatch(/border:\s*1px solid var\(--control-bit-edge\)/);
            expect(read(REGISTER)).toMatch(/--control-bit-edge:\s*var\(--control-bit-ink\)/);
        });
    });

    // §4 · the DOUBLE-JOB table. `--destructive` is the only token that ships as ink
    // AND as a plate, so it owes BOTH floors — and the arm where those two pull
    // hardest against each other (dark) is the arm that had been failing.
    describe("§4 --destructive carries both of its jobs", () => {
        for (const [arm, scope] of ARMS) {
            it(`reads as error INK over the surfaces it lands on [${arm}]`, () => {
                for (const surface of ["--card", "--popover", "--background"]) {
                    const measured = ratio("var(--destructive)", `var(${surface})`, scope);
                    expect(
                        measured,
                        `--destructive as ink over ${surface} [${arm}] computed ${round(measured)}:1`,
                    ).toBeGreaterThanOrEqual(TEXT_FLOOR);
                }
            });
        }

        it("the error-ink consumers really do read the token this table measures", () => {
            // [2026-08-08 · BK #87 W-MARKS · D13] `Label.vue` LEAVES this list. It
            // never carried an error; it painted a PRISTINE required field's
            // asterisk in the exact error red, so a form that nobody had touched
            // yet read as a form full of errors — and the requirement was
            // simultaneously invisible to AT, because the glyph was `aria-hidden`
            // and Label cannot set `aria-required` on a control it does not own.
            // The annotation is `--muted-foreground` on both arms now.
            // `LabeledField.vue:113` is the real error-ink consumer and still
            // holds this table's floor; it stays.
            for (const file of ["src/components/labeled-field/LabeledField.vue"]) {
                expect(read(file)).toMatch(/color:\s*var\(--destructive\)/);
            }
        });

        it("LOCKSTEP — the light-dark() arm and the .dark class arm declare the SAME red", () => {
            // Two paints of one colour: a @supports-split engine takes the
            // `light-dark()` arm, a class-toggle engine takes `dark-arm.css`. They are
            // maintained by hand in two files, so drift is silent until someone views
            // the app in the other engine.
            const enhancement = read(LIGHT_DARK).match(
                /--destructive:\s*light-dark\(([^,]+),\s*([^)]+\))\s*\)/,
            );
            expect(enhancement, "light-dark.css declares --destructive").not.toBeNull();
            const fallback = declarations(read(DARK_TOKENS))["--destructive"];
            expect(enhancement![2].trim()).toBe(fallback);
            expect(enhancement![1].trim()).toBe(
                declarations(read(LIGHT_TOKENS))["--destructive"] ??
                    enhancement![1].trim(),
            );
        });
    });

    // §5 · THE CLAIMS. A contrast figure written into a token comment is an assertion
    // about these same bytes, and it is the assertion no reader can check by eye —
    // which is how `hsl(0 80% 60%)` carried "4.60:1 as text over --card" for the whole
    // interval its real figure was 3.67. Each row names the file, the exact string the
    // comment must still contain, and the pair it claims; the row REDs if the comment
    // and the computation disagree in either direction (a stale claim OR a silent
    // re-tune that leaves the claim behind).
    //
    // THE HARVESTER TAKES ANY PRECISION AND THEN DEMANDS TWO DECIMALS. A one-decimal
    // claim would otherwise be structurally un-holdable: a `\d+\.\d\d` harvester
    // cannot see `2.5`, so the figure with the least precision — the one likeliest to
    // be eyeballed rather than computed — was the one figure this table could not
    // hold. Precision is therefore an assertion of its own: the engine rounds to two,
    // so a claim states two, and a row that states fewer REDs on its own text.
    //
    // ALL FOUR gate-read token files are enrolled, `light-dark.css` included: it is
    // the enhancement arm that a @supports-split engine actually paints, and figures
    // that live only there are figures no table holds. STRUCK claims (the dated
    // `~~…~~` brackets) are enrolled too, against the literal they name — a strike is
    // a claim about bytes that still exist, and an unheld strike is how a correction
    // rots back into a false figure.
    describe("§5 every contrast figure a token comment claims is TRUE of the bytes", () => {
        const CLAIMS: Array<{
            file: string;
            claim: string;
            ink: string;
            surface: string;
            arm: "light" | "dark";
        }> = [
            {
                file: DARK_TOKENS,
                claim: "as ink over --card / --popover  4.85",
                ink: "var(--destructive)",
                surface: "var(--card)",
                arm: "dark",
            },
            {
                file: DARK_TOKENS,
                claim: "as ink over the page            6.88",
                ink: "var(--destructive)",
                surface: "var(--background)",
                arm: "dark",
            },
            {
                file: DARK_TOKENS,
                claim: "as a plate under the warm ink   6.08",
                ink: "var(--destructive-foreground)",
                surface: "var(--destructive)",
                arm: "dark",
            },
            {
                file: DARK_TOKENS,
                claim: "7.70:1 vs page",
                ink: "var(--neutral-5)",
                surface: "var(--background)",
                arm: "dark",
            },
            {
                file: DARK_TOKENS,
                claim: "10.25:1 vs L4 page",
                ink: "var(--neutral-6)",
                surface: "var(--background)",
                arm: "dark",
            },
            {
                file: LIGHT_TOKENS,
                claim: "5.21:1 vs page",
                ink: "var(--neutral-5)",
                surface: "var(--background)",
                arm: "light",
            },
            {
                file: LIGHT_TOKENS,
                claim: "4.89:1 vs muted",
                ink: "var(--neutral-5)",
                surface: "var(--muted)",
                arm: "light",
            },
            {
                file: LIGHT_TOKENS,
                claim: "success  dark ink 7.60",
                ink: "var(--success-foreground)",
                surface: "var(--success)",
                arm: "light",
            },
            {
                file: LIGHT_TOKENS,
                claim: "info     dark ink 4.82",
                ink: "var(--info-foreground)",
                surface: "var(--info)",
                arm: "light",
            },
            {
                file: DARK_TOKENS,
                claim: "success  dark ink 10.21",
                ink: "var(--success-foreground)",
                surface: "var(--success)",
                arm: "dark",
            },
            {
                file: DARK_TOKENS,
                claim: "info     dark ink  6.82",
                ink: "var(--info-foreground)",
                surface: "var(--info)",
                arm: "dark",
            },
            {
                file: DARK_TOKENS,
                claim: "warning  dark ink  9.47",
                ink: "var(--warning-foreground)",
                surface: "var(--warning)",
                arm: "dark",
            },
            {
                file: LIGHT_TOKENS,
                claim: "warning  dark ink 8.19",
                ink: "var(--warning-foreground)",
                surface: "var(--warning)",
                arm: "light",
            },
            // The LOSING polarity of each pair is a claim too — and it is the column
            // the derived-polarity law is derived FROM, so an unheld one lets the law
            // be re-argued from a figure nobody checked. (`off-white 2.5` was minted
            // here, one decimal, and slipped the harvester on precision alone.)
            {
                file: DARK_TOKENS,
                claim: "off-white 1.58",
                ink: PALE_INK,
                surface: "var(--success)",
                arm: "dark",
            },
            {
                file: DARK_TOKENS,
                claim: "off-white 1.70",
                ink: PALE_INK,
                surface: "var(--warning)",
                arm: "dark",
            },
            {
                file: DARK_TOKENS,
                claim: "off-white 2.36",
                ink: PALE_INK,
                surface: "var(--info)",
                arm: "dark",
            },
            {
                file: DARK_TOKENS,
                claim: "off-white 2.65",
                ink: PALE_INK,
                surface: "var(--destructive)",
                arm: "dark",
            },
            // The light arm's own losing column. "white ink" names `--neutral-0`, the
            // cream page token — not `hsl(0 0% 100%)`, which computes differently.
            {
                file: LIGHT_TOKENS,
                claim: "white ink 2.21",
                ink: "var(--neutral-0)",
                surface: "var(--success)",
                arm: "light",
            },
            {
                file: LIGHT_TOKENS,
                claim: "white ink 2.05",
                ink: "var(--neutral-0)",
                surface: "var(--warning)",
                arm: "light",
            },
            {
                file: LIGHT_TOKENS,
                claim: "white ink 3.49",
                ink: "var(--neutral-0)",
                surface: "var(--info)",
                arm: "light",
            },
            // Destructive is the one tone that KEEPS the pale polarity in the light
            // arm; both halves of that comparison are held so the exception cannot
            // outlive its arithmetic.
            {
                file: LIGHT_TOKENS,
                claim: "white ink 4.70",
                ink: "var(--destructive-foreground)",
                surface: "var(--destructive)",
                arm: "light",
            },
            {
                file: LIGHT_TOKENS,
                claim: "beats dark ink 3.58",
                ink: WARM_INK,
                surface: "var(--destructive)",
                arm: "light",
            },
            // CURE-4's strike, held: the neutral-6 rung's two figures sit eight lines
            // from the 4.89 strike above and were re-derived with it.
            {
                file: LIGHT_TOKENS,
                claim: "7.89:1 vs L98 page",
                ink: "var(--neutral-6)",
                surface: "var(--neutral-0)",
                arm: "light",
            },
            {
                file: LIGHT_TOKENS,
                claim: "7.41:1 vs L95",
                ink: "var(--neutral-6)",
                surface: "var(--muted)",
                arm: "light",
            },
            // `light-dark.css` — the enhancement arm. Its figures were true and held
            // by nothing; the STRUCK ones are held against the literals they name.
            {
                file: LIGHT_DARK,
                claim: "**1.39:1** over card",
                ink: "hsl(0 62.8% 30.6%)",
                surface: "var(--card)",
                arm: "dark",
            },
            {
                file: LIGHT_DARK,
                claim: "computes **3.67:1** over",
                ink: "hsl(0 80% 60%)",
                surface: "var(--card)",
                arm: "dark",
            },
            {
                file: LIGHT_DARK,
                claim: "**5.20:1** vs the page",
                ink: "hsl(0 80% 60%)",
                surface: "var(--background)",
                arm: "dark",
            },
            {
                file: LIGHT_DARK,
                claim: "**4.85:1** as ink over",
                ink: "var(--destructive)",
                surface: "var(--card)",
                arm: "dark",
            },
            {
                file: LIGHT_DARK,
                claim: "**6.88:1** as ink over the page",
                ink: "var(--destructive)",
                surface: "var(--background)",
                arm: "dark",
            },
            {
                file: LIGHT_DARK,
                claim: "**6.08:1** as a plate",
                ink: "var(--destructive-foreground)",
                surface: "var(--destructive)",
                arm: "dark",
            },
            {
                file: LIGHT_DARK,
                claim: "cream ink 4.70:1 on the plate",
                ink: "var(--destructive-foreground)",
                surface: "var(--destructive)",
                arm: "light",
            },
            {
                file: LIGHT_DARK,
                claim: "that pair would read 4.89",
                ink: "hsl(0 0% 100%)",
                surface: "var(--destructive)",
                arm: "light",
            },
            {
                file: LIGHT_DARK,
                claim: "4.70 is the PAGE figure",
                ink: "var(--destructive)",
                surface: "var(--background)",
                arm: "light",
            },
            {
                file: LIGHT_DARK,
                claim: "4.53 over `--card`",
                ink: "var(--destructive)",
                surface: "var(--card)",
                arm: "light",
            },
        ];

        for (const { file, claim, ink, surface, arm } of CLAIMS) {
            it(`"${claim}" (${file.split("/").pop()}, ${arm})`, () => {
                const source = read(file);
                expect(source, `the claim string is still in ${file}`).toContain(claim);
                const stated = claim.match(/(\d+\.\d+)/);
                expect(stated, `"${claim}" states a figure`).not.toBeNull();
                // Two decimals, always: the engine rounds to two, so a claim that
                // states one is a claim rounded by hand — and a harvester that only
                // reads two would not have seen it at all.
                expect(
                    stated![1],
                    `"${claim}" must state TWO decimals (the precision the engine reports)`,
                ).toMatch(/^\d+\.\d\d$/);
                const figure = Number(stated![1]);
                const measured = ratio(
                    ink,
                    surface,
                    arm === "light" ? lightScope : darkScope,
                );
                expect(
                    round(measured),
                    `comment claims ${figure}:1, the bytes compute ${round(measured)}:1`,
                ).toBe(figure);
            });
        }
    });

    // §6 · the engine's own bite. Every table above is only as good as the resolver;
    // these hold it to values computable by hand or by an independent tool.
    describe("§6 the engine itself", () => {
        it("computes the two WCAG anchors exactly", () => {
            const white = { rgb: [1, 1, 1], a: 1 } as Colour;
            const black = { rgb: [0, 0, 0], a: 1 } as Colour;
            expect(round(contrast(white, black))).toBe(21);
            expect(round(contrast(white, white))).toBe(1);
        });

        it("resolves all three authored syntaxes plus var() indirection", () => {
            expect(resolveColour("hsl(0 0% 100%)", {}).rgb).toEqual([1, 1, 1]);
            // oklch L=1 C=0 is white; the round-trip through OKLab must land there.
            expect(resolveColour("oklch(1 0 0)", {}).rgb.map(round)).toEqual([1, 1, 1]);
            expect(
                resolveColour("color-mix(in srgb, hsl(0 0% 0%) 50%, transparent)", {}).a,
            ).toBeCloseTo(0.5, 6);
            expect(
                resolveColour("var(--a)", { "--a": "var(--b)", "--b": "hsl(0 0% 0%)" })
                    .rgb,
            ).toEqual([0, 0, 0]);
        });

        it("composites translucent ink over its surface rather than reading it neat", () => {
            // The defect this models: `--control-ring` is an ALPHA of the foreground,
            // so reading it neat reports the foreground's own ratio (21:1 over white)
            // instead of the ~1.3:1 the eye actually gets. A resolver that skips the
            // composite would have called the 1.28:1 boundary a pass.
            const surface = resolveColour("hsl(0 0% 100%)", {});
            const neat = resolveColour("hsl(0 0% 0%)", {});
            const thin = resolveColour(
                "color-mix(in srgb, hsl(0 0% 0%) 12%, transparent)",
                {},
            );
            expect(round(contrast(neat, surface))).toBe(21);
            expect(contrast(composite(thin, surface), surface)).toBeLessThan(1.5);
        });

        it("refuses a colour it cannot parse instead of scoring it", () => {
            // Fail LOUD: a silently-skipped pair is a floor that stopped being held.
            expect(() => resolveColour("chartreuse", {})).toThrow(/unparsed colour/);
            expect(() => resolveColour("var(--nope)", {})).toThrow(/unresolved token/);
        });
    });
});

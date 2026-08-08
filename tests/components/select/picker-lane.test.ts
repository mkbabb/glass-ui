/* W-PICKER — the select · combobox lane's own battery.
 *
 * Six checks, each the node-readable half of a lane gate (G1 UTILITY-REACH ·
 * G3 PROSE-TRUTH + SELECTOR-REACH · G4 ONE-REGISTER + SERIES · G6 REKA-SURFACE).
 * G2 GUTTER and G5 PAINT-FLOOR are geometry and colour: they are execution-time
 * probes at a browser seat, owed to the π row, and are deliberately NOT faked here
 * with a jsdom measurement that cannot see a computed pixel.
 *
 * SEATS +0. Nothing here claims a §B.5 seat name; these ride the tier-3 lane's
 * acceptance class exactly as the card and button lanes' batteries do.
 */
import { readdirSync, readFileSync } from "node:fs";
import { relative, resolve } from "node:path";
import { describe, expect, it } from "vitest";

const ROOT = process.cwd();
const read = (p: string) => readFileSync(resolve(ROOT, p), "utf8");

/* The file set is WALKED, never listed and never asked of git. A `git ls-files`
 * answer is wrong in both directions on a working tree: it names files that have
 * been deleted and misses files that have been added, so a gate reading it passes
 * or fails on staging state rather than on the code. */
function walk(dir: string, match: RegExp): string[] {
    const out: string[] = [];
    for (const entry of readdirSync(resolve(ROOT, dir), { withFileTypes: true })) {
        const rel = `${dir}/${entry.name}`;
        if (entry.isDirectory()) {
            if (entry.name === "node_modules" || entry.name.startsWith(".")) continue;
            out.push(...walk(rel, match));
        } else if (match.test(entry.name)) {
            out.push(rel);
        }
    }
    return out;
}

const SRC_VUE = walk("src", /\.vue$/);
const SRC_TS = walk("src", /\.ts$/);
const SRC_CSS = walk("src", /\.css$/);
/* Source stylesheets, plus the two BUILD OUTPUTS a source comment may legitimately
 * name. `dist/` is not walked because it need not exist (a clean checkout has no
 * build), and a gate that silently passes when its subject is absent is worse than
 * one that names its two exceptions out loud. */
const BUILD_OUTPUTS = ["glass-ui.css", "components.css"];
const CSS_BASENAMES = new Set([
    ...[...SRC_CSS, ...walk("demo", /\.css$/)].map((p) => p.replace(/^.*\//, "")),
    ...BUILD_OUTPUTS,
]);
void relative;

/* THE LANE, stated once. Every gate below is scoped to it — a lane gate that
 * ranges over the whole library convicts seven other rows' files and can only be
 * made green by editing them, which is the fence violation the roster forbids. The
 * library-wide arms of the same two checks are #61 W-DOC-TRUTH's and #65's. */
const LANE = [
    ...SRC_VUE.filter(
        (f) =>
            f.startsWith("src/components/select/") ||
            f.startsWith("src/components/command/"),
    ),
    ...SRC_TS.filter(
        (f) =>
            f.startsWith("src/components/select/") ||
            f.startsWith("src/components/command/") ||
            f.startsWith("src/components/_shared/menu/"),
    ),
    "src/components/command/styles.css",
    "src/components/_shared/menu/menu.css",
    "src/components/_shared/field/field-surfaces.css",
    "src/styles/glass/overlay-plate.css",
];

const stripComments = (source: string): string =>
    source
        .replace(/<!--[\s\S]*?-->/g, "")
        .replace(/\/\*[\s\S]*?\*\//g, "")
        .replace(/^\s*\/\/.*$/gm, "");

describe("W-PICKER lane battery", () => {
    /* ── G1 UTILITY-REACH ────────────────────────────────────────────────────
       Every class token authored anywhere under `src/components/**` must be a
       PLAIN literal, at any depth — because a token inside an interpolation is
       invisible to both scanners that have to see it (the demo's Tailwind content
       scan and the library's own emitter, whose tokenizer desynchronizes across a
       template literal). This is the class-level form of the defect: it does not
       check that `ps-7` came back, it checks that the shape which lost it cannot
       recur. */
    it("G1 — no spacing token is authored inside a template literal", () => {
        /* THE DEFECT'S REAL SHAPE, and the reason this reads the WHOLE literal
         * rather than the text after the hole: the token that never painted was
         * spelled `${indicator === "start" ? "pl-7 pr-2" : "px-2"}` — INSIDE the
         * interpolation. The emitter's candidate tokenizer walks quoted runs with
         * one character class for `"`, `'` and backtick, so the opening backtick
         * pairs with the first `"` it meets and every pair after that is offset by
         * one; whichever tokens land in the gaps are never emitted, and which ones
         * those are depends on how many quotes precede them. A template literal
         * containing class tokens ANYWHERE is therefore the unit of the defect. */
        const spacingToken = /\b(p[sxytrbel]?|m[sxytrbel]?)-\d/;
        const offenders: string[] = [];
        for (const file of [...SRC_TS, ...SRC_VUE]) {
            if (!file.startsWith("src/components/")) continue;
            if (/\.(glsl|wgsl)\.ts$/.test(file)) continue; // shaders are not classes
            const code = stripComments(read(file));
            for (const [, body] of code.matchAll(/`([^`]*)`/g)) {
                if (!body.includes("${")) continue;
                if (spacingToken.test(body)) {
                    offenders.push(`${file} :: \`${body.slice(0, 90)}\``);
                }
            }
        }
        expect(
            offenders,
            "a class token in an interpolated literal is unreachable by the emitter's tokenizer",
        ).toEqual([]);
    });

    it("G1 — the demo's _shared source glob is recursive", () => {
        // The one character that lost the gutter: `_shared/*.ts` never reached
        // `_shared/menu/rowClass.ts`. Blanket-widening to `components/**/*.ts` is
        // the OTHER failure (it trips the extractor on a shader template literal),
        // so both halves are asserted.
        const demoCss = read("demo/demo.css");
        expect(demoCss).toContain('@source "../src/components/_shared/**/*.ts"');
        expect(demoCss).not.toMatch(/@source\s+"\.\.\/src\/components\/\*\*\/\*\.ts"/);
        // …and the ground for the narrow scope stays true on disk.
        expect(
            SRC_TS.filter(
                (f) =>
                    f.startsWith("src/components/_shared/") &&
                    /\.(glsl|wgsl)\.ts$/.test(f),
            ),
        ).toEqual([]);
        expect(SRC_TS.filter((f) => /\.wgsl\.ts$/.test(f)).length).toBeGreaterThan(0);
    });

    /* ── G3 PROSE-TRUTH + SELECTOR-REACH ─────────────────────────────────────
       No comment in the lane may name a file that does not exist, and no
       `[data-slot]` selector in the library's CSS may address a slot nothing
       emits. Both are "the record disagrees with the disk" defects, and both were
       live: `select.css` was cited seven times and has never existed, and
       `[data-slot="combobox-list"]` styled a slot no component writes. */
    it("G3 — no lane comment cites a stylesheet that does not exist", () => {
        const offenders: string[] = [];
        for (const file of LANE) {
            for (const [, cited] of read(file).matchAll(/\b([a-z][\w-]*\.css)\b/g)) {
                if (!CSS_BASENAMES.has(cited)) offenders.push(`${file} cites ${cited}`);
            }
        }
        expect(offenders, "a comment naming an absent stylesheet is a false record").toEqual(
            [],
        );
    });

    it("G3 — every [data-slot] selector in src CSS has at least one emitter", () => {
        const emitted = new Set<string>();
        for (const file of [...SRC_VUE, ...SRC_TS]) {
            for (const [, slot] of read(file).matchAll(
                /data-slot\s*=\s*["']([\w-]+)["']/g,
            )) {
                emitted.add(slot);
            }
        }
        const orphans: string[] = [];
        for (const file of LANE.filter((f) => f.endsWith(".css"))) {
            for (const [, slot] of stripComments(read(file)).matchAll(
                /\[data-slot=["']([\w-]+)["']\]/g,
            )) {
                if (!emitted.has(slot)) orphans.push(`${file} :: [data-slot="${slot}"]`);
            }
        }
        expect(orphans, "a selector addressing a slot nothing emits is dead paint").toEqual(
            [],
        );
    });

    /* ── G4 ONE-REGISTER + SERIES ────────────────────────────────────────────
       One row register with at least two consumers; one bound; one pad axis; and
       no φ multiplier or `vh` left in the lane. */
    it("G4 — the row register has ≥2 consumers and no lane recipe re-declares it", () => {
        const consumers = SRC_VUE.filter((f) => /\browClass\s*\(/.test(read(f)));
        expect(consumers.length, `rowClass consumers: ${consumers.join(", ")}`)
            .toBeGreaterThanOrEqual(2);

        // The nine declarations that used to sit beside it, on the same rows.
        const commandCss = stripComments(read("src/components/command/styles.css"));
        const itemRecipe = /\.command__item\s*\{([^}]*)\}/.exec(commandCss)?.[1] ?? "";
        for (const property of [
            "display",
            "padding",
            "cursor",
            "user-select",
            "outline",
            "font-size",
            "align-items",
            "width",
        ]) {
            expect(itemRecipe, `.command__item re-declares ${property}`).not.toContain(
                property,
            );
        }
    });

    it("G4 — one divider ink, one plate bound, no φ multiplier or vh in the lane", () => {
        const laneCss = [
            "src/components/command/styles.css",
            "src/components/_shared/menu/menu.css",
            "src/styles/glass/overlay-plate.css",
        ].map(read);
        const laneVue = SRC_VUE.filter(
            (f) =>
                f.startsWith("src/components/select/") ||
                f.startsWith("src/components/command/"),
        ).map(read);
        const lane = [...laneCss, ...laneVue].join("\n");

        expect(lane, "the φ block multiplier is retired in this lane").not.toContain(
            "1.272",
        );
        expect(stripComments(lane), "`vh` measures the largest viewport; use `dvh`")
            .not.toMatch(/\b\d+vh\b/);
        // `var(--border)` was the second divider authority.
        expect(stripComments(lane)).not.toContain("var(--border)");
        // The bound is the family's one token, and it is the honest unit.
        expect(read("src/styles/tokens/offsets.css")).toContain(
            "--overlay-max-block: min(24rem, 60dvh)",
        );
        expect(read("src/styles/tokens/offsets.css")).toContain("--overlay-pad: 12px");
    });

    it("G4 — the option radius is the LAW, not a literal", () => {
        // outer = inner + inset. Written as the subtraction, so retuning either end
        // keeps the corners concentric instead of silently breaking them.
        const plate = read("src/styles/glass/overlay-plate.css");
        expect(plate).toMatch(
            /--overlay-option-radius:\s*calc\(\s*var\(--radius-card\)\s*-\s*var\(--overlay-viewport-inset\)\s*\)/,
        );
        expect(plate).toContain("--overlay-viewport-inset: 4px");
    });

    /* ── G6 REKA-SURFACE ─────────────────────────────────────────────────────
       Every reka root prop is declared, attrs-reachable, or withheld on purpose —
       and no Boolean prop may carry the absent-casts-to-false trap. */
    /* The gate's SUBJECTS: the two wrappers that forward a disclosure axis into a
       reka root. Scoped there, and the scope is a ground rather than a
       convenience — `Dialog.vue` declares the same four bare booleans and is NOT
       a defect, because reka's `useForwardProps` forwards only the keys ASSIGNED
       on the vnode plus non-undefined defaults, so an absent prop never leaves
       that component. The fault needs a wrapper that SPREADS its own props
       object, which cannot tell an absent prop from a false one. Both wrappers
       here do exactly that. */
    const DISCLOSURE_WRAPPERS = [
        { file: "src/components/command/Command.vue", props: "CommandProps" },
        { file: "src/components/command/CommandDialog.vue", props: "CommandDialogProps" },
    ];
    /* Where a props interface may be declared. Read, not assumed — the lane's own
       `types.ts` plus the SFC that declares `DialogProps`, which
       `CommandDialogProps` extends. */
    const INTERFACE_SOURCES = [
        "src/components/command/types.ts",
        "src/components/dialog/Dialog.vue",
    ];

    /** The interface body + its `extends` list, brace-balanced rather than regexed
     *  to the first `}` (a nested object type would truncate the body and quietly
     *  shrink the gate's subject set). */
    function findInterface(name: string): { body: string; bases: string[] } | null {
        for (const source of INTERFACE_SOURCES) {
            const src = stripComments(read(source));
            const head = new RegExp(`interface\\s+${name}\\s*(?:extends\\s+([^{]+?))?\\s*\\{`);
            const match = head.exec(src);
            if (!match) continue;
            let depth = 1;
            let i = match.index + match[0].length;
            for (; i < src.length && depth > 0; i++) {
                if (src[i] === "{") depth++;
                else if (src[i] === "}") depth--;
            }
            return {
                body: src.slice(match.index + match[0].length, i - 1),
                bases: (match[1] ?? "")
                    .split(",")
                    .map((s) => s.trim())
                    .filter(Boolean),
            };
        }
        return null;
    }

    /** Every optional boolean the interface declares, inherited members included. */
    function optionalBooleans(name: string, seen = new Set<string>()): string[] {
        if (seen.has(name)) return [];
        seen.add(name);
        const found = findInterface(name);
        if (!found) return [];
        const own = [...found.body.matchAll(/^\s*(\w+)\?:\s*boolean\s*;/gm)].map((m) => m[1]!);
        return [...own, ...found.bases.flatMap((base) => optionalBooleans(base, seen))];
    }

    /** The defaults object of `withDefaults(defineProps<X>(), { … })`, balanced. */
    function withDefaultsBody(source: string): string {
        const open = source.indexOf("withDefaults(");
        if (open < 0) return "";
        const brace = source.indexOf("{", source.indexOf("(),", open));
        if (brace < 0) return "";
        let depth = 1;
        let i = brace + 1;
        for (; i < source.length && depth > 0; i++) {
            if (source[i] === "{") depth++;
            else if (source[i] === "}") depth--;
        }
        return source.slice(brace + 1, i - 1);
    }

    it("G6 — no wrapper declares a bare optional boolean without an undefined default", () => {
        // `boolean` with no default compiles to `{ type: Boolean }`, and Vue casts
        // an ABSENT Boolean prop to `false` — which silently converts an
        // uncontrolled axis into a controlled one pinned shut. What suppresses the
        // cast is the OWN `default` key, whatever its value: `defaultOpen: true` is
        // a legal starting value, `open: undefined` is "nobody is controlling this".
        const offenders: string[] = [];
        for (const { file, props } of DISCLOSURE_WRAPPERS) {
            const source = stripComments(read(file));
            const defaults = withDefaultsBody(source);
            const booleans = optionalBooleans(props);
            expect(booleans.length, `${props} declares no optional boolean — resolver broke`)
                .toBeGreaterThan(0);
            for (const name of booleans) {
                if (!new RegExp(`^\\s*${name}\\s*:`, "m").test(defaults)) {
                    offenders.push(`${file} :: ${name} has no declared default`);
                }
            }
            // `open` is the axis itself: its default must be `undefined`
            // specifically, because any boolean default IS the latch.
            if (booleans.includes("open") && !/^\s*open\s*:\s*undefined/m.test(defaults)) {
                offenders.push(`${file} :: open's default is not \`undefined\``);
            }
        }
        expect(
            offenders,
            "an absent Boolean prop casts to `false` and reaches reka as *controlled and shut*",
        ).toEqual([]);
    });

    it("G6 — the lane's roots omit an unset axis rather than binding it false", () => {
        const command = stripComments(read("src/components/command/Command.vue"));
        expect(command).toContain("inheritAttrs: false");
        // The attrs forward exists…
        expect(command).toMatch(/\.\.\.attrs/);
        // …and `open` is omitted when unset rather than bound to `undefined`.
        expect(command).toMatch(
            /props\.open === undefined \? \{\} : \{ open: props\.open \}/,
        );

        /* The same shape one level up. `CommandDialog` spreads its props into
         * `<Dialog>`, so every axis it does not own has to LEAVE the spread —
         * `open` most of all, since a forwarded `false` pins the plate shut and
         * a forwarded `modal: false` / `unmountOnHide: false` silently inverts
         * two reka defaults that are `true`. */
        const dialog = stripComments(read("src/components/command/CommandDialog.vue"));
        for (const axis of ["open", "defaultOpen", "modal", "unmountOnHide"]) {
            expect(
                dialog,
                `CommandDialog forwards ${axis} unconditionally`,
            ).toMatch(new RegExp(`${axis} === undefined \\? \\{\\} : \\{ ${axis} \\}`));
        }
        // …and the palette below it takes the axis the same way.
        expect(dialog).toMatch(
            /props\.open === undefined \? \{\} : \{ open: props\.open \}/,
        );
        expect(dialog, "the bare `:open` bind is the latch itself").not.toMatch(
            /:open="props\.open"/,
        );
    });

    it("G6 — every public type the lane's components declare ships on its subpath", () => {
        const commandBarrel = read("src/components/command/index.ts");
        for (const type of [
            "ComboboxItemProps",
            "ComboboxInputProps",
            "ComboboxGroupProps",
            "ComboboxEmptyProps",
            "ComboboxSeparatorProps",
        ]) {
            expect(commandBarrel, `${type} is used by a public component but unexported`)
                .toContain(type);
        }
        const selectBarrel = read("src/components/select/index.ts");
        expect(selectBarrel).toContain("SelectScrollButton");
        // The two axes are gone with no alias, so their prop types cannot linger.
        expect(
            /^\s*variant\??:/m.test(read("src/components/select/SelectTrigger.vue")),
            "SelectTrigger still declares a `variant` prop",
        ).toBe(false);
        expect(
            /^\s*size\??:/m.test(read("src/components/select/SelectTrigger.vue")),
            "SelectTrigger still declares a `size` prop",
        ).toBe(false);
        expect(
            /^\s*fieldHue\??:/m.test(read("src/components/select/SelectContent.vue")),
            "SelectContent still declares a `fieldHue` prop",
        ).toBe(false);
    });
});

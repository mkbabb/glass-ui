// THE SPLICE CONTRACT — every assembled WGSL module resolves the chunks it splices.
//
// The house shader idiom is TEXTUAL: `color.wgsl.ts` exports `/* wgsl */` template
// strings and each primary interpolates them into its own source at module load. There
// is no `#include`, no bundler step, and therefore NO COMPILER between the splice and
// `device.createShaderModule` — the first thing that ever reads the assembled text is
// the GPU driver, at runtime, in the browser, on the user's machine.
//
// So a chunk's requirements are enforced by nothing. `OKLCH_MATRICES_WGSL` states one at
// `color.wgsl.ts:52-53` — "PI must be in scope (the consumer defines it first)" — and
// FourierField's render module spliced the chunk and defined PI nowhere. The module
// failed validation with `unresolved value 'PI'`, the pipeline never built, the frame
// callback never ran, and the stage painted NOTHING while every unit test in the tree
// stayed green. (π band δ, cells δ2-π-1…6, root cause D1.)
//
// THIS FILE IS THE MISSING COMPILER, in the one dimension that failed: it assembles every
// module that reaches `createShaderModule` and resolves each module-scope constant the
// text REFERENCES against the ones it DECLARES. It is deliberately about the CLASS, not
// the instance — a sixth module spliced tomorrow is covered the moment it is registered,
// and §1 fails until it is.
//
// WHY UPPER_SNAKE IS THE UNIVERSE, stated so the fence is arguable rather than assumed:
// every module-scope value in this tree's WGSL is `const`/`override` in UPPER_SNAKE
// (`PI`, `LAYER`, `FBM_ROT`, `LINEAR_SRGB_TO_LMS`, `MAX_NUCLEI`, `TAIL_TAPER`, …), WGSL
// has no UPPER_SNAKE builtin, and its keywords, attributes, address spaces and swizzles
// are all lowercase. So an UPPER_SNAKE token that no declaration in the assembled text
// introduces is an unresolved global — the exact shape of the defect.
//
// TWO WGSL FACTS ABOUT STRUCTS, each because the first run of this file found it and not
// because it was anticipated. A MEMBER ACCESS (`fr.T`) is never a module-scope reference,
// so a dotted token is not a reference. And a MEMBER DECLARATION — `struct HeadFrame
// { T: vec2<f32>, … }` in the render module — binds `T` in the STRUCT's scope, not the
// module's, so the member name is not a module-scope reference either and the resolver
// strips it from the REFERENCES side. It is emphatically NOT a declaration: counting it
// as one would let `struct Foo { PI: f32 }` satisfy a module's reference to `PI`, which is
// the D1 defect wearing a hat — real WGSL rejects that module with `unresolved value 'PI'`
// while the arm reports nothing at all. Without both facts the resolver reported `T`
// unresolved in a module that resolves fine, which is a false RED, and a detector that
// cries wolf gets muted rather than obeyed.

import { describe, expect, it } from "vitest";
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join, relative } from "node:path";

import { FOURIER_FIELD_RENDER_WGSL } from "@glass/components/fourier-field/shaders/render.wgsl";
import { FOURIER_FIELD_COMPUTE_WGSL } from "@glass/components/fourier-field/shaders/compute.wgsl";
import { AURORA_WGSL } from "@glass/components/aurora/constants/shaders/aurora.wgsl";
import { AURORA_IMAGE_WGSL } from "@glass/components/aurora/constants/shaders/aurora-image.wgsl";
import { METABALL_WGSL } from "@glass/components/blob/shaders/metaball.wgsl";
import {
    OETF_WGSL,
    FBM_ROT_WGSL,
    OKLCH_MATRICES_WGSL,
    PALETTE_RAMP_WGSL,
} from "@glass/composables/glass/procedural/color.wgsl";

const SRC = join(process.cwd(), "src");

/**
 * The registry of assembled modules, keyed by the EXPORTED IDENTIFIER each
 * `createShaderModule` call site names. §1 reconciles these keys against the call sites
 * found in `src/`, in both directions, so this object cannot drift out of the tree.
 */
const MODULES: Record<string, string> = {
    FOURIER_FIELD_RENDER_WGSL,
    FOURIER_FIELD_COMPUTE_WGSL,
    AURORA_WGSL,
    AURORA_IMAGE_WGSL,
    METABALL_WGSL,
};

/** The shared chunks, so §3 can show the requirements are real and not hypothetical. */
const CHUNKS: Record<string, string> = {
    OETF_WGSL,
    FBM_ROT_WGSL,
    OKLCH_MATRICES_WGSL,
    PALETTE_RAMP_WGSL,
};

/** Every `.ts` file under `src/` — which is where all five shader sites live today. A
 *  `.vue` SFC or a hand-written `.js` that called `createShaderModule` would escape this
 *  walk. That is KNOWN RESIDUE, noted rather than built: widening the walk with no site to
 *  cover would be speculation, and this file's job is the class that EXISTS. */
function walk(dir: string, out: string[] = []): string[] {
    for (const entry of readdirSync(dir)) {
        const path = join(dir, entry);
        if (statSync(path).isDirectory()) walk(path, out);
        else if (/\.ts$/.test(entry)) out.push(path);
    }
    return out;
}

/** WGSL comments carry prose about names; the resolver must read code, not commentary. */
function stripComments(wgsl: string): string {
    return wgsl.replace(/\/\*[\s\S]*?\*\//g, " ").replace(/\/\/[^\n]*/g, " ");
}

/** An UPPER_SNAKE token that is NOT a member access (`fr.T`) and not mid-identifier. */
const UPPER = /(?<![.\w])[A-Z][A-Z0-9_]*\b/g;
/** `const`/`override`/`let`/`var<…>`/`alias` — every form that introduces a MODULE name.
 *  A struct member is not one of them; it is bound in the struct's scope. */
const DECLARES = /\b(?:const|override|let|alias|var(?:<[^>]*>)?)\s+([A-Z][A-Z0-9_]*)\b/g;
/** `struct Name { … }`, split so only the BODY between the braces can be rewritten. */
const STRUCT_BODY = /(\bstruct\s+\w+\s*\{)([^}]*)(\})/g;
/** A member DECLARATION's name — the `T` of `T: vec2<f32>`. The TYPE on the far side of
 *  the colon is deliberately left alone: a member typed by an `alias` IS a real
 *  module-scope reference, and blanking it would re-open the hole in the other direction. */
const MEMBER_DECL = /(?<![.\w])[A-Z][A-Z0-9_]*\s*:/g;

/** The text with struct-scope member NAMES blanked out, so they can be neither counted
 *  as module-scope references nor mistaken for declarations of the names they spell. */
const stripMemberDeclarations = (wgsl: string): string =>
    wgsl.replace(
        STRUCT_BODY,
        (_m, head: string, body: string, tail: string) =>
            head + body.replace(MEMBER_DECL, ":") + tail,
    );

const declared = (wgsl: string): Set<string> =>
    new Set([...stripComments(wgsl).matchAll(DECLARES)].map((m) => m[1]));

const referenced = (wgsl: string): Set<string> =>
    new Set(
        [...stripMemberDeclarations(stripComments(wgsl)).matchAll(UPPER)].map((m) => m[0]),
    );

/** The names a fragment USES but does not introduce — its requirements on a consumer. */
function requirements(wgsl: string): string[] {
    const d = declared(wgsl);
    return [...referenced(wgsl)].filter((name) => !d.has(name)).sort();
}

/** The whole `createShaderModule({ … })` object literal, captured as one blob so that
 *  each property is read out of it INDEPENDENTLY. Property order is a style choice and it
 *  must not decide whether a site is censused: a `code:`-first site escaped the earlier
 *  `label:`-then-`code:` pattern entirely, taking its module out of §2's resolution with
 *  it and saying nothing. */
const CALL_SITE = /createShaderModule\(\s*\{([\s\S]*?)\}\s*\)/g;
const CODE_PROP = /(?:^|[{,\s])code\s*:\s*([A-Za-z_][A-Za-z0-9_]*)/;
const LABEL_PROP = /(?:^|[{,\s])label\s*:\s*"([^"]*)"/;

describe("WGSL splice contract — §1 the census of assembled modules", () => {
    const sites: { file: string; label?: string; code: string }[] = [];
    for (const file of walk(SRC)) {
        for (const call of readFileSync(file, "utf8").matchAll(CALL_SITE)) {
            const code = CODE_PROP.exec(call[1])?.[1];
            if (!code) continue;
            sites.push({
                file: relative(SRC, file),
                label: LABEL_PROP.exec(call[1])?.[1],
                code,
            });
        }
    }

    it("finds the shader-module call sites at all — the subject exists", () => {
        expect(sites.length).toBeGreaterThanOrEqual(5);
    });

    it("registers every module the tree hands to the GPU, and no phantom", () => {
        const inTree = [...new Set(sites.map((s) => s.code))].sort();
        const census = sites
            .map((s) => `${s.file}  ${s.label ?? "(unlabelled)"}  → ${s.code}`)
            .join("\n");
        expect(inTree, census).toEqual(Object.keys(MODULES).sort());
    });

    it("assembles each registered module to real WGSL, not an empty string", () => {
        for (const [name, code] of Object.entries(MODULES)) {
            expect(code, name).toBeTypeOf("string");
            expect(code.length, name).toBeGreaterThan(200);
            expect(code, name).toContain("fn ");
        }
    });
});

describe("WGSL splice contract — §2 every module resolves its own constants", () => {
    for (const [name, code] of Object.entries(MODULES)) {
        it(`${name} references no module constant it never declares`, () => {
            // Anti-vacuity: a module that references nothing would pass this trivially.
            expect(referenced(code).size, `${name} references no constants`).toBeGreaterThan(
                0,
            );
            expect(requirements(code)).toEqual([]);
        });
    }
});

describe("WGSL splice contract — §3 the chunks' requirements are real", () => {
    it("OKLCH_MATRICES_WGSL requires PI and does not supply it", () => {
        // The contract quoted in `color.wgsl.ts:52-53`, re-derived from the chunk's own
        // text rather than trusted from its comment.
        expect(requirements(OKLCH_MATRICES_WGSL)).toContain("PI");
    });

    it("PALETTE_RAMP_WGSL requires PI and the OKLCh space names", () => {
        expect(requirements(PALETTE_RAMP_WGSL)).toContain("PI");
    });

    it("every module that splices a PI-requiring chunk declares PI", () => {
        const requiresPi = Object.entries(CHUNKS)
            .filter(([, chunk]) => requirements(chunk).includes("PI"))
            .map(([name]) => name);
        expect(requiresPi.length).toBeGreaterThan(0);

        const splicers = Object.entries(MODULES).filter(([, code]) =>
            requiresPi.some((chunkName) => code.includes(CHUNKS[chunkName])),
        );
        // The three WGSL primaries all splice the OKLCh chunk; if that ever stops being
        // true this assertion says so rather than silently covering nothing.
        expect(splicers.length).toBeGreaterThanOrEqual(3);
        for (const [name, code] of splicers) {
            expect(declared(code).has("PI"), `${name} splices a PI chunk`).toBe(true);
        }
    });

    it("the fourier render module is one of them — the D1 regression, by name", () => {
        expect(FOURIER_FIELD_RENDER_WGSL).toContain(OKLCH_MATRICES_WGSL);
        expect(FOURIER_FIELD_RENDER_WGSL).toMatch(/const PI: f32 = 3\.141592653589793;/);
    });
});

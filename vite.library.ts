import { readdirSync } from "node:fs";
import { resolve } from "node:path";

/**
 * The library entry map. Two tiers:
 *
 *  1. The 12 MULTI-LINE CURATED barrels — hand-listed below. These carry real
 *     curation logic, not a single mirror line: `index` (the vueuse-FREE root
 *     barrel — L.W1 Lane A SCC closure), `api` (the types/constants discovery
 *     layer), `tokens`, `forms`/`dark`/`keyboard`/`carousel` (the vueuse-bearing
 *     flat subpaths — L.W1 Lane C), `motion`/`motion-core` (the keyframes-engine
 *     split — AP.W3 R0G-7), `sidebar` (the AI.W5-δ composables-of-record
 *     relocation), `infinite-scroll` (the component + composables pair). They
 *     STAY at `src/` top level — moving them would obscure the curation.
 *
 *  2. The TRIVIAL single-line subpath barrels — each `export * from
 *     "../components/<…>"` or `"../composables/<…>"`. These live in
 *     `src/subpaths/` (AV.W5 Lane A) and are BATCH-RESOLVED below: the dir is
 *     globbed and mapped programmatically so a new per-family subpath barrel
 *     never has to be hand-added here. Zero runtime delta — the emitted
 *     `dist/<name>.js` chunk set is name-for-name identical to the prior
 *     hand-list (proven by `proof:subpath-enumeration`'s BATCH-EQUIV assert).
 *
 * `package.json` exports are byte-unchanged by the source move: each `import`
 * key points at `dist/<name>.js` (the BUILT chunk keyed by entry NAME), which is
 * unaffected by where the source barrel lives.
 */
export function libraryEntries(rootDir: string) {
    // Tier 1 — the curated multi-line barrels (explicit; STAY at src/ top level).
    const curated: Record<string, string> = {
        index: resolve(rootDir, "src/index.ts"),
        api: resolve(rootDir, "src/api/index.ts"),
        tokens: resolve(rootDir, "src/tokens.ts"),
        forms: resolve(rootDir, "src/forms.ts"),
        dark: resolve(rootDir, "src/dark.ts"),
        keyboard: resolve(rootDir, "src/keyboard.ts"),
        carousel: resolve(rootDir, "src/carousel.ts"),
        motion: resolve(rootDir, "src/motion.ts"),
        "motion-core": resolve(rootDir, "src/motion-core.ts"),
        sidebar: resolve(rootDir, "src/sidebar.ts"),
        "infinite-scroll": resolve(rootDir, "src/infinite-scroll.ts"),
        // BH.W-AXIS-GRAMMAR — the types-only `/axes` discovery subpath.
        axes: resolve(rootDir, "src/axes.ts"),
    };

    // Tier 2 — batch-resolve every `src/subpaths/*.ts` trivial mirror barrel.
    const subpathsDir = resolve(rootDir, "src/subpaths");
    const batched: Record<string, string> = {};
    for (const file of readdirSync(subpathsDir)) {
        if (!file.endsWith(".ts")) continue;
        const name = file.slice(0, -3);
        batched[name] = resolve(subpathsDir, file);
    }

    return { ...curated, ...batched };
}

export function libraryFileName(_format: string, entryName: string) {
    return entryName === "index" ? "glass-ui.js" : `${entryName}.js`;
}

// Every JS-bundleable runtime peer is `external` — never bundled into `dist`
// (vite.config.ts §"every peer is external"). A peer the source imports yet
// OMITS here gets BUNDLED, so a consumer double-loads it (BH.B1-W1: the live
// `@lucide/vue` icon peer — 39 src imports — was missing, so lucide shipped
// inside dist/createLucideIcon-*.js + the vendor chunk). The dead pre-v1.0
// strings `lucide-vue-next` (renamed → `@lucide/vue` at v1.0) and `vaul-vue`
// (abrogated at BB.W-DRAWER-ABROGATE — the house reka substrate owns the snap
// math now) externalized packages no longer in the graph — removed (no alias).
// Machine-locked by `proof:external-payload` (every peer src JS-imports is here;
// every entry here is a declared peer — no dead string). `perfect-freehand` is
// VENDORED into handmark/freehand.ts (zero `from "perfect-freehand"`), so it
// does NOT leak and is correctly absent.
export const libraryExternal = [
    "vue",
    "reka-ui",
    "@vueuse/core",
    "@mkbabb/keyframes.js",
    "@mkbabb/value.js",
    // BA.W-HANDMARK — the hand-mark family's L1 geometry peer (optional). Externalized
    // so the /handmark chunk imports it rather than bundling the optional peer.
    "@mkbabb/pencil-boil",
    "class-variance-authority",
    "clsx",
    "embla-carousel-vue",
    "@lucide/vue",
];

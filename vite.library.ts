import { libraryEntryMap } from "./scripts/lib/subpath-policy.mjs";

/**
 * Resolve Vite's inputs from the same fail-closed semantic entry graph that
 * generates package exports and flat declarations. Public entry names remain
 * stable while their sources live only at their component/composable owners.
 */
export function libraryEntries(rootDir: string) {
    return libraryEntryMap(rootDir);
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

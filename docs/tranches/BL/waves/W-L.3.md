# W-L.3 · W-PEER-TRUTH: the consumer matrix replaces `verify:package`, and the artefact does what the source claims · 11.0.0

| field | value |
|---|---|
| seat | band-L wave-spec seat, formation |
| model | `claude-opus-5-5`, asserted from own system identity |
| HEAD | `78922b26` in a scratch worktree; `src` identical to v10.1.0; `dist/` built there (`npm run build`, exit 0). Probes: `@tailwindcss/node` 4.3.3 compiles (appendix A), a dist import-closure walker (appendix B), `vue/server-renderer` under a node-only `vitest` config and hydration under happy-dom (appendix C) |
| ships in | 11.0.0 |
| families | F-67 whole (`audit/REGISTRY.md:1428-1448`): L09-03, L06-03, L06-04, L06-05, R2-07-01, R2-07-03, R2-07-04, R2-07-05, R2-07-07, R2-07-12 (the re-scope), R2-09-08, R5-02-02, R5-02-03 |
| depends on | PLAN §5, the one record of edges |
| dependants | PLAN §5 (its inverse) |
| roster | G-02 PACK-INSTALL turns `bound` here (`waves/W-A.2.md:136`) |

## 1 · What it closes

| id | defect |
|---|---|
| R2-07-01, L06-03 | `--text-sm: initial; --text-xs: initial` in the shipped theme bridge deletes a consumer's `text-sm` and `text-xs` |
| R2-07-03 | `tw-animate-css` is an optional peer, and `./styles` requires it |
| R2-07-05, L06-05 | `@vueuse/core` is an optional peer, and the root entry imports it statically |
| R2-07-07, L06-04 | every `import.meta.env.DEV` guard is resolved at the library build, so none reaches a consumer's dev build |
| R2-09-08, R5-02-03 | under SSR, `useGlobalDark`'s immediate watcher writes `document`: a DarkModeToggle render throws |
| R5-02-02 | SSR hydration diverges on coarse-pointer and reduced-motion clients (setup-time `matchMedia` reads) |
| R2-07-04, L09-03 | `verify:package`, the only pack-and-install gate, installs every optional peer, checks CSS by existence, and runs only in `release.yml` |
| #8 (census) | W-PKG-TRUTH's reseal never ran; G-THEME-BLEED had no executable (`ledger/census-register-a.md:29`) |
| UIA-F-57 (F-67 mechanism row) | DESIGN names `text-sm` and `text-xs`, which the bridge deletes: closes on G-L3-1 (the consumer's `text-sm` survives) |
| #26c (RT-26G) | `DESIGN.md:277` tells readers to use Tailwind `ease-spring-*`, a family deleted from `theme/bridges.css` (the note at `:360-361`) |
| #81d | the utility emitter's string scanner pairs any quote with any other (`vite.utility-emit.ts:105`, `strRe = /["'\`]([^"'\`\n]*?)["'\`]/g`) |

## 2 · The defect at HEAD

| reading | command | value |
|---|---|---|
| the theme reset | `sed -n 28,29p src/styles/theme/bridges.css` and the built `dist/styles/theme/bridges.css` | `--text-sm: initial; --text-xs: initial;` in both |
| the reset in a consumer compile | appendix A, `probe-text-sm.mjs` | **exit 1**: `{"text-sm":false,"text-xs":false,"text-lg (control)":true}` |
| the README recipe without the optional peer | appendix A, `probe-peer-absent.mjs` (`@import "tailwindcss"` + `dist/styles/index.css` + `dist/styles/fonts.css`) | **exit 1**: `Cannot apply unknown utility class 'data-[state=open]:fade-in'` (from `sheet-animate`, `styles/utilities/btn.css:95-100`) |
| optional peers the static closure reaches | appendix B | **exit 1**: `@vueuse/core` from 13 entries (`.`, `./dark`, `./keyboard`, `./command`, `./configurator`, `./dark-mode-toggle`, `./dialog`, `./dock`, `./expandable-container`, `./fourier-field`, `./menu`, `./popover`, `./sheet`); `@mkbabb/value.js` from 5 (`./color`, `./aurora`, `./blob`, `./easing`, `./fourier-field`), not the root; `tw-animate-css` from 0 (it is CSS-only) |
| DEV guards in the artefact | `grep -rlF "<message>" dist` for each guard's message | Button "which no longer exists" 0; Slider "no accessible name" 0; Timeline "non-monotone" 0; MusicStaff's message string 1 file, its `throw` compiled out. Sources: `button/Button.vue:131`, `slider/Slider.vue:243`, `timeline/geometry.ts:75`, `music-staff/MusicStaff.vue:58` |
| a cold SSR render | appendix C, `ssr-render.test.ts` | **fail**: `ReferenceError: document is not defined` at `composables/dark/useGlobalDark.ts:171` |
| hydration on a coarse-pointer client | appendix C, server render then `createSSRApp(...).mount` with `matchMedia("(pointer: coarse)")` true | **fail**: 3 `[Vue warn]: Hydration node mismatch`; the fine-pointer control passes with 0 |
| where the pack gate runs | `grep -n "verify:package" .github/workflows/*.yml` | `release.yml:52` only; `ci.yml` has none |

Sources behind the SSR readings: `useGlobalDark.ts:168-174` (an immediate `watch` writing `document.documentElement.style.colorScheme`), `popover/Popover.vue:81-85` (`isCoarsePointer` from `window.matchMedia` at setup, picking the HoverCard or Popover root), `motion/core/useReducedMotion.ts:72` (`reduced.value = media?.matches` at setup). `tabs/composables/useTabResponsive.ts:93-115` binds its query in `onMounted` behind an SSR default and does not diverge.

## 3 · The cure

1. **The theme bridge stops editing the consumer's theme.** `bridges.css:28-29` go. The library's own rule (no static `text-sm`/`text-xs` in its sources) becomes an arm of `tests/gates/token-hygiene.test.ts`: `rg -n --pcre2 '(?<![\w-])text-(sm|xs)(?![\w-])' src demo --glob '*.vue' --glob '*.ts'` → 0 lines (the templates and class strings; CSS comments that name the rung are not uses). The rule governs the library's sources, where it belongs, and a consumer's `text-sm` is Tailwind's again.
2. **`tw-animate-css` leaves the package.** Its one reader is `sheet-animate` (`btn.css:95-100`). The utility is re-expressed on the library's own keyframes (`@keyframes fade-in`, `styles/animations.css:19`, and its `fade-out` twin) with the same two duration bindings. The peer and its `peerDependenciesMeta` entry are deleted from `package.json`, the README recipe loses `@import "tw-animate-css"`, and `docs/canon/dependencies.md` loses the row.
3. **Peers say what the graph does.** `@vueuse/core` loses `optional: true`: the root reaches it. `@mkbabb/value.js` stays optional, since the root does not reach it; the README's peer table names the five subpaths that need it. The matrix's closure leg keeps both statements true.
4. **Guards reach the consumer.** The four `import.meta.env.DEV` guards become `process.env.NODE_ENV !== "production"`. Vite's library mode replaces `import.meta.env.*` at the library build and leaves `process.env.*` for the consumer's bundler, which is how Vue ships its own warnings. The Slider guard is W-K.6's nameless-thumb check in this form.
5. **SSR: reads behind mount, writes on the client.**
   - `useGlobalDark` registers the `colorScheme` mirror only on the client (`isClient` from `@vueuse/core`, now a required peer). On the server the singleton computes `isDark` from its seed and writes nothing. `darkModeSyncScript.ts` stays the head script that sets the class before first paint.
   - `Popover` reads `(pointer: coarse)` through `useMediaQuery`, which is `false` on the server and in the first client render, and updates after mount. The hover-root choice follows it, so hydration matches and the coarse client switches roots after mount.
   - `useReducedMotion` seeds `false` at setup and reads the query in `onMounted`; `data-motion` and SegmentedTabs' drag arming follow the ref. This is the `useTabResponsive` pattern.
6. **DESIGN names what ships.** `DESIGN.md:277` drops the `ease-spring-*` clause; the line names `var(--spring-*)` only.
7. **The scanner pairs like quotes.** `strRe` becomes a backreference form, `/(["'`])((?:(?!\1)[^\n])*)\1/g`, so a string opened by one quote closes only on the same quote.
8. **The consumer matrix replaces `verify:package`.** `scripts/consumer-matrix.mjs` packs the committed tree once and runs each leg in a scratch consumer outside the repo. The legs:

   | leg | what it installs and runs | fails when |
   |---|---|---|
   | install | `npm install <tgz>` and `pnpm add <tgz>`, required peers at their declared floors (vue 3.5.0, reka-ui 2.0.0, @vueuse/core 14.0.0, tailwindcss 4.0.0, @lucide/vue 1.16.0) and at `latest`, optional peers absent | a peer warning or an install error |
   | closure | appendix B over the installed `dist` | the root reaches an optional peer, or any entry reaches an undeclared package |
   | css | a Vite app compiling the README recipe with `@tailwindcss/vite`; a second app importing `./styles.css` alone | a compile error; `.text-sm` absent from a page that uses it; a README-documented utility absent |
   | types | W-L.2's `tests/consumer/strict/` against the installed package | any `vue-tsc` error |
   | ssr | a Vite SSR server and a Nuxt 4 app, each on a cold process, rendering a page with DarkModeToggle, Popover (`trigger="hover"`), SegmentedTabs and Slider; hydrated in Chromium under {fine, coarse} × {no-preference, reduce} | a non-200 first response; any hydration warning; an `aria-labelledby` or `aria-controls` in the hydrated page that resolves to no element |
   | dev | the Vite app in dev with `<Button variant="outline">`; the same app's production build | the dev console lacks the Button warning; the production bundle contains any guard message |

   `ci.yml` runs the matrix as its own job on every push (npm and pnpm as a job matrix). `release.yml` runs it before `publish`. `verify:package` and `scripts/verify-export-types.mjs` are deleted; the declaration checks it carried are the types leg, and its ratchet went in W-A.5.

## 4 · Files it touches

- New: `scripts/consumer-matrix.mjs`, `tests/consumer/app/` (the Vite consumer), `tests/consumer/ssr/` (the SSR server and the Nuxt app).
- Deleted: `scripts/verify-export-types.mjs`, the `verify:package` script.
- Edited: `src/styles/theme/bridges.css`, `src/styles/utilities/btn.css`, `src/composables/dark/useGlobalDark.ts`, `src/components/popover/Popover.vue`, `src/composables/motion/core/useReducedMotion.ts`, `src/components/tabs/SegmentedTabs.vue` (drag arming reads the mounted ref), `button/Button.vue`, `slider/Slider.vue`, `timeline/geometry.ts`, `music-staff/MusicStaff.vue` (the guard form), `package.json` (peers, meta, scripts), `README.md` (recipe, peer table), `docs/canon/dependencies.md`, `tests/gates/token-hygiene.test.ts`, `.github/workflows/ci.yml`, `.github/workflows/release.yml`, `tests/gates/roster.json` (G-02 `bound`), `MIGRATION.md`.

## 5 · Acceptance gates

| id | gate | passes when | HEAD reading (ran here) |
|---|---|---|---|
| G-L3-1 · consumer `text-sm` survives | appendix A `probe-text-sm.mjs` (the matrix's css leg) | exit 0 | **exit 1**: `text-sm` false, `text-xs` false, control `text-lg` true |
| G-L3-2 · the recipe compiles without optional peers | appendix A `probe-peer-absent.mjs` | exit 0 | **exit 1**: `Cannot apply unknown utility class 'data-[state=open]:fade-in'` |
| G-L3-3 · the root reaches no optional peer | appendix B `closure.mjs` | exit 0 | **exit 1**: `@vueuse/core` from 13 entries including `.` |
| G-L3-4 · guards ship | `for m in "which no longer exists" "no accessible name" "non-monotone"; do grep -rlqF "$m" dist \|\| exit 1; done; grep -q "process.env.NODE_ENV" dist/button-*.js` | exit 0 | **exit 1**: 0 files carry the first message |
| G-L3-5 · guards leave production | the matrix's dev leg, production arm | 0 guard messages in the consumer's production bundle | not runnable at HEAD (no guard ships, so the arm would pass vacuously); counted only with G-L3-4 green |
| G-L3-6 · a cold SSR render | appendix C `ssr-render.test.ts` | exit 0 | **fail**: `ReferenceError: document is not defined` (`useGlobalDark.ts:171`) |
| G-L3-7 · hydration on coarse and reduce | appendix C `hydrate-client.test.ts` with `PTR=coarse`, and the matrix's ssr leg over the four cells | 0 hydration warnings | **fail**: 3 mismatches on coarse; fine passes with 0 |
| G-L3-8 · the matrix is the gate | `grep -q "consumer-matrix" .github/workflows/ci.yml && ! grep -q "verify:package" package.json .github/workflows/release.yml` | exit 0 | **exit 1** |
| G-L3-9 · the library keeps its own rule | `! rg -n --pcre2 '(?<![\w-])text-(sm\|xs)(?![\w-])' src demo --glob '*.vue' --glob '*.ts'` | exit 0 | hold line: 0 matches at HEAD (a plain `\btext-sm\b` matches `--control-text-sm` 17 times, so the lookarounds are required); it bites when the reset goes and a static rung slips back in |
| G-L3-10 · DESIGN names no deleted utility (static; #26c) | `! grep -q 'ease-spring-' DESIGN.md` | exit 0 | **exit 1** (`DESIGN.md:277`) |
| G-L3-11 · the scanner pairs like quotes (#81d) | appendix D `strre.mjs`: the emitter's `strRe`, applied to `"px-2 'p-4"`, yields the one string `px-2 'p-4` | exit 0 | **exit 1**: yields `["px-2 "]` (fix-2, `183e021a`) |

## 6 · π and DELTA obligations

| surface | themes | engines | paired capture | π |
|---|---|---|---|---|
| a consumer page with `class="text-sm"` body copy | light | Chromium | before: the paragraph at the inherited size (the utility compiled to nothing); after: 0.875rem | computed `font-size` of the paragraph |
| the hydrated SSR page on the coarse cell (a hover Popover trigger and a DropdownMenu) | light | Chromium, coarse emulation | before: the menu opens with `menu ""`, the trigger lacks `aria-haspopup`; after: named, attributes present | the matrix's hydration warning count and the resolved `aria-*` census |

Captures under `.cache/evidence/W-L.3/`, sha256 in the wave record. Real-Safari cells UNMEASURED until OW-3.

## 7 · MIGRATION rows (11.0.0)

| changed | what a consumer does |
|---|---|
| the theme no longer clears `--text-sm` / `--text-xs` | nothing; `text-sm` and `text-xs` are Tailwind's again (a consumer that relied on them compiling to nothing removes them) |
| `tw-animate-css` is no longer a peer | drop `@import "tw-animate-css"` unless the app uses it itself |
| `@vueuse/core` is a required peer | install it (a pnpm consumer without it now gets a peer error, not a hoisted wrong major) |
| dev warnings ship behind `process.env.NODE_ENV` | nothing under Vite, webpack or Rollup; a bundler that does not define it must |
| `verify:package` removed | none (a repo script) |

## 8 · Ledger rows

Closes F-67 (all members), #8 W-PKG-TRUTH's remainder (the theme bleed's executable is G-L3-1; `ledger/census-register-a.md:29`), roster G-02, UIA-F-57 (G-L3-1), #26c (G-L3-10) and #81d (G-L3-11). The README recipe O-57 R-2's answer rests on (`waves/W-B.2.md:131`) is compiled by the css leg.

## Appendix A · the CSS probes as run at HEAD

```js
// probe-text-sm.mjs
import { compile } from "@tailwindcss/node";
const css = `@import "tailwindcss";\n@import "${root}/dist/styles/theme/bridges.css";`;
const out = (await compile(css, { base: root, onDependency() {} })).build(["text-sm", "text-xs", "text-lg"]);
// {"text-sm":false,"text-xs":false,"text-lg (control)":true} → exit 1

// probe-peer-absent.mjs
const css = `@import "tailwindcss";\n@import "${root}/dist/styles/index.css";\n@import "${root}/dist/styles/fonts.css";`;
await compile(css, { base: root, onDependency() {} });
// COMPILE-ERROR: Cannot apply unknown utility class `data-[state=open]:fade-in` → exit 1
```

## Appendix B · the closure walker

For each JS entry of `package.json` `exports`, follow every `from "…"` and `import "…"` specifier recursively through relative chunks (a fresh regex per file), collect bare package names, and report which `peerDependenciesMeta` optional peers each entry reaches. Exit 1 if any optional peer is reached. (A first draft shared one global regex across the recursion and under-counted; the per-file regex gives the 13 entries above, matching R2-07-05's "root and 12 subpaths".)

## Appendix C · the SSR probes

`vitest.ssr.config.ts`: `environment: "node"`, no setup file, the `@glass` alias. `ssr-render.test.ts` renders `createSSRApp({ render: () => h(DarkModeToggle) })` with `renderToString`. `ssr-hydrate-server.test.ts` renders a fixture (`<Popover trigger="hover">` with a `PopoverTrigger as-child` Button and content) to HTML; `hydrate-client.test.ts` (happy-dom) stubs `matchMedia` from `PTR`, sets the HTML into a host, spies `console.warn`/`console.error`, and mounts `createSSRApp` on it. Readings: `PTR=fine` 0 warnings (pass); `PTR=coarse` 3 `Hydration node mismatch` warnings (fail).

## Appendix D · the quote-pairing probe (fix-2)

```sh
node -e 'const s=require("fs").readFileSync("vite.utility-emit.ts","utf8");const m=s.match(/const strRe = (\/.*\/g);/);const re=eval(m[1]);const r=[..."\"px-2 '"'"'p-4\"".matchAll(re)].map(x=>x[x.length-1]);console.log(JSON.stringify(r));process.exit(r[0]==="px-2 '"'"'p-4"?0:1)'
```

At `183e021a`: prints `["px-2 "]`, exit 1. The probe reads each match's last group, so it holds for the cure's backreference form (content in group 2) as for HEAD's (group 1).

# P4 — DEMO @glass ALIAS CODEMOD + MANIFEST GLOB CONTRACT + MANIFEST CARVE

Read-only research. Prototype + dry-run artifacts under this dir. Repo @ `tranche/BG`, 4.2.0.

---

## PART 1 — @glass alias codemod (unblocks B2.0)

### 1.1 Exact counts (RAN: `proto/codemod-glass-alias.mjs` → `codemod-dryrun-report.json`)

| metric | value |
|---|---|
| **total import-specifier rewrites** | **492** |
| — depth `../../src/` (2) | 68 |
| — depth `../../../src/` (3) | 384 |
| — depth `../../../../src/` (4) | 40 |
| **files touched** | **166** |
| CSS refs (SEPARATE class, NOT rewritten) | 10 |
| comment/prose false-positives | **0** |
| **REVIEW / regex-unsafe hits** | **0 → SAFE** |

> NB on the naive `rg` count: `../../src/` is a *substring* of `../../../src/`, so a flat `rg -c '../../src/'` reports 492 (it double-counts depth-3 lines). The prototype disambiguates by anchored match: **68 + 384 + 40 = 492** true specifiers. The crude task-prompt patterns (`icon-chip`/`button`/`cn`) are all just specific module bodies inside these 492.

### 1.2 Safety verdict: **SAFE — a mechanical regex codemod is sufficient.**

The prototype audits **every** `(../)+src/` occurrence in `demo/` and buckets any not covered by a specifier rewrite. Result: **zero REVIEW hits**. Concretely, the safety holds because:

- **No string-built / dynamic paths.** `rg 'src/${ | src/" + | + "..src/' demo/` → none. No template-literal or concatenation builds a `src/` path.
- **No query-suffixed imports** (`?raw`/`?url`/`?worker`) referencing src → none.
- **No code-comment false-positives.** Every backtick/prose hit of `src/...` in `.ts`/`.vue` is bare `src/styles/...` with NO `../` prefix (e.g. `store.ts:11`, `aurora.vue:173`), so `(../)+src/` never matches them. The one prose `../speedtest/src/` (`aurora/presets.ts:394`) has `speedtest/` between `../` and `src/` → not matched.
- **The codemod rewrites ONLY the specifier string position** (`from "…"`, `import("…")`, side-effect `import "…"`, `export * from "…"`) — it does not blind-replace, so even a hypothetical comment match would be skipped.
- **`@/` old-alias usages: 0** (fully retired — confirms relative-import regime). **1** `@mkbabb/glass-ui` self-import in demo (published-surface test) — left untouched.

### 1.3 The rewrite rule

```
(../)+src/<X>   →   @glass/<X>      // strip the (../)+src/ prefix, prepend @glass/
```
e.g. `../../src/components/ui/sheet` → `@glass/components/ui/sheet`;
`../../../src/composables/dark` → `@glass/composables/dark`.

### 1.4 Config the alias requires (NONE exists today — must be ADDED)

`vite.config.ts` has **no `resolve.alias`**; `tsconfig.json` has **no `paths`**. So B2.0 adds BOTH (two-line patch each), then runs the codemod:

```jsonc
// tsconfig.json → compilerOptions
"paths": { "@glass/*": ["./src/*"] }
```
```ts
// vite.config.ts → defineConfig({ resolve: { alias: { "@glass": resolve(__dirname, "src") } } })
```
(`moduleResolution: "bundler"` already set — `paths` resolves. The demo dev server is plain `vite` = `vite.config.ts`, so that one alias covers HMR + build.)

### 1.5 The CSS class (10 refs — NOT @glass targets, handle separately)

All 10 are in `demo/demo.css` (the stable demo root, single `../src/`): `@font-face url("../src/fonts/…")` ×6, `@import "../src/styles/…"` ×2, `@source "../src/components/**"` ×3 (one is a JSDoc). A JS `resolve.alias` does **not** rewrite Tailwind `@source` globs or `@font-face url()` reliably — leave these relative. They are at the demo root (does not move) and only break if **`src/` itself** moves (out of BH scope: framing keeps `src/`). **Do NOT include `.css` in the codemod glob.**

---

## PART 2 — manifest glob contract (B3 gotcha)

### 2.1 The exact current pattern (`demo/stories/manifest.ts`)

- **L118** `const modules = import.meta.glob<{ default: Component }>("./*/*.vue");`
- **L121** `const key = \`./${category}/${id}.vue\`;`  (the ONLY keyer; `modules[key]` → loader)
- L127 `MissingStory:${category}/${id}` (cosmetic fallback name)
- L382 `SUBPATHS[\`${cat}/${id}\`]` — a **data-map key (no `.vue`)**, **unaffected** by the glob change.

`./*/*.vue` = exactly 2 levels (`<cat>/<id>.vue`). Deeper support files (`aurora/config/*.vue`, `dock/examples/*.vue`, future `parts/*.vue`) are 3+ levels → never globbed today. This is the only `import.meta.glob` in `demo/` (the L5 hit is a doc comment).

### 2.2 The migration contract (MANDATORY same-wave as the first story move)

```
OLD  L118: import.meta.glob("./*/*.vue")          OLD L121 key: `./${category}/${id}.vue`
NEW  L118: import.meta.glob("./*/*/index.vue")    NEW L121 key: `./${category}/${id}/index.vue`
```

If the dirs move (`<cat>/<id>.vue` → `<cat>/<id>/index.vue`) WITHOUT the glob+key change, **every** `modules[key]` misses → `lazy()` returns the `MissingStory` `render:()=>null` stub → **every story renders blank silently** (no error). Evidence requirement: a **runtime route-walk** (load each manifest route, assert non-null component) — `grep` is insufficient.

Bonus: `./*/*/index.vue` keeps support files out (`parts/X.vue` = 4 levels), so the clean 2-level discipline is preserved.

### 2.3 Gate path-literal breakage list (the move-breakers)

**Class A — concrete `demo/stories/<cat>/<id>.vue` literals → need `/index.vue` appended.**
- **82 scripts**, **292 distinct path literals**. (Full unique-script list in `proto/gate-path-literals.txt`.) High-traffic: `proof-storybook-complete`, `proof-no-orphan-demo-route`, `proof-stage`, `proof-config-right`, `proof-page-hierarchy`, `proof-hierarchy`, `proof-demo-design`, `proof-demo-affordances`, `proof-dock-*` (gallery/unify/perfection/stack-rail/rail-realize/search/a11y/css-carve), `proof-glass-material-{demo,sota,unified}`, `proof-flow-field`, `proof-progress-gradient`, `proof-drawer-abrogate`, `proof-easing-primitive`, `proof-surface-axis`, … plus 4 historical `wf-*.js` agent prompts (literals in prose — low-risk but rg-stale).

**Class B — `demo/stories/manifest.ts` direct readers → re-point to the SPLIT path `demo/chassis/manifest/index.ts`.**
- **10 scripts**: `proof-gate-manifest-sound`, `proof-gate-detrap`, `proof-stage`, `proof-hero-audacious`, `proof-substrate-staging`, `proof-page-prune`, `proof-dock-css-carve`, `proof-demo-copy-prune`, `proof-no-orphan-demo-route`, `wf-ba-fleet.js`. (Independent of the glob change; triggered by the manifest SPLIT/MOVE.)

**Class C — recursive `demo/stories/**` walkers → structurally SURVIVE, re-validate semantics.**
- e.g. `proof-storybook-complete` (walks `**`, collects `…/src/…` imports), `proof-page-hierarchy`, `proof-page-prune`, `proof-story-language`, `proof-storybook-meta`, `proof-demo-copy-prune`. `**` still reaches `<cat>/<id>/index.vue` + `parts/*.vue`. **Watch:** newly-globbed `parts/*.vue` may shift story counts / import-graph maps — re-baseline these after the move.
- **`proof-no-orphan-demo-route`** is the canonical break: it reads `STORIES_DIR` expecting `<cat>/<id>.vue` files with a PascalCase=helper / kebab=story heuristic. The per-story-DIR move (`<cat>/<id>/index.vue`, helpers in `parts/`) **fully inverts its enumeration** — it must be rewritten in the same wave (now: dir-per-story = story; `index.vue` is the row; `parts/` = helpers).

---

## PART 3 — manifest.ts (1236L) carve → `chassis/manifest/`

Structure (verified PATH:LINE):

| segment | lines | →home |
|---|---|---|
| header doc + lucide icon imports | 1–33 | (icons move to the rows that use the Category icon) |
| `HeroScale`,`StoryDepth`,`Story`,`Category`,`SectionLanding` + re-export `StoryBackground` | 35–116 | **`types.ts`** |
| `modules` glob + `lazy()` | 118–131 | **`lazy.ts`** ← THE glob-change site |
| `StoryOptions` | 133–147 | `types.ts` (internal) |
| `CATEGORY_DEFAULT_BG` | 149–194 | **`backgrounds.ts`** |
| `SUBPATHS` (~130L) | 195–335 | **`subpaths.ts`** |
| `LANDING_SUBPATHS`, `LANDING_BLURBS` | 336–365 | `subpaths.ts` |
| `s()` row factory | 366–396 | **`factory.ts`** (deps: lazy, subpaths, backgrounds, types) |
| `sectionLanding()`, `assignDepths()` | 397–461 | **`landing.ts`** |
| **`CATEGORIES` array (11 category blocks)** | **462–1210** | **`rows/<category>.ts` × 11** |
| `assignDepths(CATEGORIES)` call | 1211–1214 | **`categories.ts`** |
| `findCategory`,`findStory`,`firstStoryPath` | 1216–1236 | **`index.ts`** (or `queries.ts`) |

The 11 category blocks (id @ line): foundations(464) · substrates(541) · forms(713) · display(747) · containers(801) · navigation(847) · dock(875) · data(948) · feedback(1015) · motion(1045) · compositions(1131). Each is `{ id, title, icon, stories:[ s(cat,id,…) ] }` → each `rows/<cat>.ts` exports a self-contained `Category` (its own lucide icon import + `s` calls). Mirrors the story dirs 1:1.

### Concrete carve (the DAG)

```
chassis/manifest/
├── types.ts        HeroScale·StoryDepth·Story·Category·SectionLanding·StoryOptions·StoryBackground re-export   (deps: vue, lucide types, aurora-hero)
├── lazy.ts         modules glob + lazy()      ← GLOB CHANGE: "./*/*/index.vue", key `./${cat}/${id}/index.vue`  (deps: types)
├── backgrounds.ts  CATEGORY_DEFAULT_BG        (deps: types)
├── subpaths.ts     SUBPATHS·LANDING_SUBPATHS·LANDING_BLURBS   (deps: types)
├── factory.ts      s()                        (deps: types, lazy, subpaths, backgrounds)
├── landing.ts      sectionLanding()·assignDepths()   (deps: types)
├── rows/
│   ├── foundations.ts  …  → export const foundations: Category   (deps: types, factory, lucide icon)
│   ├── substrates.ts   forms.ts  display.ts  containers.ts  navigation.ts
│   ├── dock.ts  data.ts  feedback.ts  motion.ts  compositions.ts        (11 files)
├── categories.ts   CATEGORIES = [foundations,…,compositions]; assignDepths(CATEGORIES); export   (deps: rows/*, landing)
└── index.ts        re-export * types + CATEGORIES + findCategory/findStory/firstStoryPath          (deps: types, categories)
```

DAG (no cycles): `types` → `{lazy,backgrounds,subpaths,landing}` → `factory` → `rows/*` → `categories` → `index`. Every public symbol the current `manifest.ts` exports is re-surfaced from `index.ts`, so `router.ts` / docks / `useStoryNavigation` change ONE import path (`./stories/manifest` → `./chassis/manifest`) — the Class-B gate re-point above.

---

## SEQUENCING (binding)

The story-dir move + glob change + manifest split MUST land in ONE wave with the Class-A/B gate-literal edits — else silent blank stories OR red gates. Per Lane δ this sequences **after BG WS4 closes** (WS4 already does demo chassis consolidate + >500 splits). Concurrent-safe NOW: the codemod + alias add (B2.0) and this spec — they touch no story file content beyond import specifiers.

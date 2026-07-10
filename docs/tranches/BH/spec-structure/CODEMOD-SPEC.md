# The Flatten Codemod — executable spec + proof-of-execution

**Status:** ROUND-2 executable spec for STRUCTURE-SPEC §7 (the enforcement-corpus migration). This is the
CODEMOD that atomically flattens `src/components/{ui,custom}/*` → flat `src/components/*` peers, migrates the
229-script / 838-literal enforcement corpus in lockstep, and lands the `proof:no-tier-literal` meta-gate.
**Every claim below was executed in an isolated worktree (detached HEAD `3e2387ff`, BG F8) and is evidence-cited.**

The round-1 verdict SETTLED the flatten decision (proto2 typechecked green over 93 families; reka-78-flat/Ark/
PrimeVue/BaseUI is the owned-library SOTA; ui/ is ~100% forked, so the tier is dead signal). This doc is the
*how* — the executable instrument + its proven correctness — not a re-litigation of *whether*.

---

## §1 The core insight: ONE elision, not three ad-hoc rewrites

The move is not "rename N dirs." It is the removal of a single path SEGMENT — `ui` or `custom` — wherever it
immediately follows `components`. Every downstream rewrite is a corollary of that one operation applied to
absolute paths:

```
elide("src/components/custom/dock/GlassDock.vue")  →  "src/components/dock/GlassDock.vue"
elide("src/components/ui/button")                  →  "src/components/button"
elide("src/components/ui/tabs/TabsIndicator.vue")  →  "src/components/tabs/reka/TabsIndicator.vue"   ← the SOLE override
```

**The tabs collision is the only non-uniform case** (evidence: `comm -12` over the ui/custom dir-name sets
returns exactly `tabs`). Reka `ui/tabs` (1 internal importer — `DockLayerGroup`) vs SegmentedTabs `custom/tabs`
(12 importers) cannot both become `components/tabs`. Round-1 ruled *fold reka INTO components/tabs/ as
sub-components*; the executable form is `ui/tabs → components/tabs/reka` (reka nested as a named sub-component
group). The codemod carries this as a one-entry override applied BEFORE the uniform segment-drop.

### Why src is resolve-and-recompute but demo is segment-drop — proven, not asserted

The round-1 digest's "HYBRID: resolve-and-recompute src, segment-drop demo" is CORRECT, and the reason is the
alias axis:

- **src imports are all-relative.** Moving a file UP one level (`components/custom/dock/X` → `components/dock/X`)
  changes its relative depth to every NON-moved target. Evidence: 255 escaping imports (`2+ ../`) inside
  `components/custom`, 24 inside `components/ui`. Example: `GlassDock.vue`'s `../../../composables/motion` must
  become `../../composables/motion` (one fewer `../`); `DockLayerGroup.vue`'s `../../ui/button` must become
  `../button` (BOTH a depth change AND a segment drop). A naive segment-drop would emit `../../button` →
  `src/button` (nonexistent). **Only resolve-and-recompute is correct for relative imports.**
- **demo/tests imports are `@glass/*` (absolute alias → `src/*`).** `@glass/components/custom/dock` →
  drop `custom/` → `@glass/components/dock` resolves correctly with ZERO depth arithmetic, because the alias is
  absolute. Evidence: 225 `@glass/components/custom/*` + 173 `@glass/components/ui/*` occurrences in demo; the
  `@glass` alias is defined `@glass/* → src/*` in `vite.config.ts:22`, `tsconfig.json:18`, `vitest.config.ts:22`,
  `demo/vite.demo-dist.config.ts:35`. **Flattening does not touch the alias itself — no config change needed.**

### The recompute needs NO module resolver — elide preserves the tail automatically

Because `elide` removes only a MIDDLE segment, the specifier tail after the escape is byte-identical between the
old and new relative path. So:

```
newSpecifier = normalize( relative( elide(dirname(F)), elide(resolve(dirname(F), S)) ) )
```

reproduces the exact extension/index style with no on-disk resolution (extensionless imports stay extensionless,
`.vue` stays `.vue`, `/index` collapses stay collapsed). Proven by 358 src files + 210 demo/tests files
rewritten → **typecheck exit 0, zero TS2307** (§4).

---

## §2 The three instruments (the executable codemod)

Two scripts, run in a worktree only. Full source is committed at `codemod-flatten.mjs` + `codemod-scripts.mjs`
in the proof worktree; the load-bearing bodies:

### §2.1 `elide()` — the anchor is the whole correctness argument

```js
function elide(abs) {
    const parts = abs.split("/");
    for (let i = 0; i < parts.length - 1; i++) {
        if (parts[i] === "components" && (parts[i + 1] === "ui" || parts[i + 1] === "custom")) {
            if (parts[i + 1] === "ui" && parts[i + 2] === "tabs") parts.splice(i + 1, 2, "tabs", "reka");
            else parts.splice(i + 1, 1);
            return parts.join("/");
        }
    }
    return abs;
}
```

**CRITICAL ANCHOR BUG (found + fixed in execution — see §5).** `elide` must fire only on paths under a
PHYSICALLY-MOVED subtree. The `tests/` tree MIRRORS `src/` (`tests/components/custom/dock/...`), so it contains
identical `components/custom` segments. Running `elide` on a test file that ISN'T being moved corrupts its
intra-test relative depth. **The resolution: the tests mirror ALSO flattens** (the src↔tests mirror invariant,
CLAUDE.md "tests MIRROR src"), so both trees move consistently and the bare-`components` anchor is safe. A
codemod that flattens src but not the tests mirror is a broken half-migration.

### §2.2 src relative rewrite (Phase 1) + physical move (Phase 2)

```js
function reSpecify(S, Fabs) {                 // S = a relative specifier in file Fabs (OLD location)
    if (!S.startsWith(".")) return null;
    const newSourceDir = elide(dirname(Fabs));
    const newTarget    = elide(resolve(dirname(Fabs), S));
    let rel = relative(newSourceDir, newTarget);
    if (!rel.startsWith(".")) rel = "./" + rel;
    return rel === S ? null : rel;
}
```

Rewrite content FIRST (files still at old paths, so `dirname(F)` resolves specifiers correctly), THEN move the
dirs (`custom/*` first so `components/tabs` exists, then `ui/tabs → components/tabs/reka` nests inside it).

### §2.3 demo/tests `@glass` segment-drop (Phase 1, same pass)

```js
function dropGlass(spec) {
    let out = spec.replace(/@glass\/components\/ui\/tabs(\b)/g, "@glass/components/tabs/reka$1");
    return out.replace(/@glass\/components\/(ui|custom)\//g, "@glass/components/");
}
```

The demo pass ALSO recomputes any stray relative import via the same `reSpecify` (a few tests use
`../../../src/components/...` — the target moved, the test source didn't, so the relative recomputes).

### §2.4 scripts drop-segment (Phase 3) — the enforcement corpus

```js
function dropSegment(src) {
    return src
        .replaceAll("components/ui/tabs", "components/tabs/reka")   // override FIRST
        .replaceAll("components/custom/", "components/")
        .replaceAll("components/ui/", "components/")
        .replace(/components\/custom(?=["'`)\s]|$)/g, "components")  // bare segment-terminal
        .replace(/components\/ui(?=["'`)\s]|$)/g, "components");
}
```

Applied uniformly to every `scripts/*.mjs` — code, comments, wave-history prose, AND self-test fixtures. This
ONE transform performs all three named sub-tasks with NO per-gate special-casing:
- **re-roots proof-colocation**: `const CUSTOM = resolve(SRC, "components/custom")` → `resolve(SRC, "components")`;
  the README `.map((e) => `components/custom/${e.name}`)` → `components/${e.name}`; the `ADOPTION_LEAF_VERIFY`
  literals (`components/ui/carousel/...` → `components/carousel/...`, `components/custom/pager-dots/...` →
  `components/pager-dots/...`). Verified: proof-colocation PASS on the flat tree (§4).
- **rewrites the RATCHET key**: `"components/custom/aurora/composables/runtime.ts": 502` →
  `"components/aurora/composables/runtime.ts": 502`. Verified live-correct: `runtime.ts` (502 > 500) does NOT
  appear in the violation list → it is still grandfathered → the key matches its new physical path (§4). A stale
  key would surface it as a NEW un-grandfathered violation.
- **drops the 838 literals**: 218 files rewritten (§4). Self-test synthetic fixtures (`components/custom/x/...`)
  drop to `components/x/...` and stay synthetic (never on disk), so the gate logic is unchanged.

**No gate branches SEMANTICALLY on ui-vs-custom** (verified: every match is a path literal or descriptive prose,
none a `tier === "custom"` code branch) — so the uniform textual drop is complete and safe.

### §2.5 Barrel disposition (no-legacy)

- `components/ui/index.ts` — the aggregate ui barrel — has ZERO real importers (only two `src/index.ts` COMMENT
  mentions). Dropped (clean break, no-legacy). `src/index.ts` re-exports each package explicitly, never through
  this barrel, so the drop is inert.
- `components/custom/` has no aggregate barrel (only `PROCEDURAL-SUITE.md`, moved to `components/`).
- No `components/index.ts` exists pre- or post-flatten. Flat navigation is the machine-locked `components/README`
  domain-map (round-1 verdict item 13), NOT an aggregate re-export barrel.

---

## §3 The `proof:no-tier-literal` meta-gate

The atomic-migration guarantee: after the flatten, NO gate may carry a dead-tier literal (a dangling reference
into a tier that no longer exists on disk). Full source at `scripts/proof-no-tier-literal.mjs` in the worktree.
Load-bearing detector:

```js
const TIER_RE = /(?:@glass\/)?components\/(ui|custom)(?=[/"'`)\s]|$)/g;   // slash, bare, AND @glass alias forms
```

Three proven behaviors:
- **born-RED**: 838 literals across 219 files on the pre-flatten main tree (`exit 1`).
- **GREEN after flatten**: 0 survivors, `exit 0`.
- **anti-evasion bite**: injecting `// components/custom/dock` into any gate → RED (1 survivor); removing it → GREEN.
- **self-test PASS** (7 fixtures: slash/bare/alias forms flag; flat peer + merged reka + unrelated `custom-hook`
  do NOT flag).
- **skip-self**: the gate excludes its own file (a detector legitimately names what it forbids in its docstring +
  fixtures — the standard house exemption). It exempts exactly ONE file by name; a future gate cannot hide a
  literal by renaming.

Register it `["local","ci"]` (device-free, pure FS) beside `proof:no-god-module`/`proof:colocation`. It is the
STANDING witness that the enforcement corpus can never silently re-couple to the dead tier.

---

## §4 Proof-of-execution — the close battery, measured

Executed in worktree `/tmp/flatten-proof` (detached `3e2387ff`), `node_modules` + `dist` symlinked read-only
from the main repo (typecheck READS dist for published-subpath type resolution; never writes it).

| Gate | Result | Evidence |
|---|---|---|
| **typecheck** (`vue-tsc --noEmit` src+demo + `-p tsconfig.test.json`) | **exit 0, 0 errors** | 358 src + 210 demo/tests import rewrites all resolve; root tsconfig `include:["src/","demo/"]` covers the demo @glass segment-drops |
| **proof:colocation** | **PASS (exit 0)** | re-rooted `CUSTOM = resolve(SRC,"components")`; 21 README-bearing feature-dirs (0 ui dirs have READMEs) → identical target set on the flat tree; both leaf-verify clauses green, `readme-map=true` |
| **proof:no-god-module** | FAIL (exit 1) — **flatten delta = 0** | The 7 over-500 files (`useGlassBackdropLuminance 554`, `dock/DockLayerGroup 524`, `styles/dock/shell 524`, `dock/GlassDock 515`, `glass/ladder 510`, `glass/surfaces 508`, `tokens/dark-arm 507`) are BYTE-IDENTICAL to the pristine main-tree baseline (same files, same counts, `delta=0`) — live-engine WIP being carved before BG.W-CUT, ORTHOGONAL to the flatten. `component-file over-500 introduced BY flatten = 0`. The RATCHET key rewrite verified: `aurora/runtime.ts:502` correctly grandfathered (absent from violations). |
| **proof:no-tier-literal** (new) | **PASS (exit 0)** | 0 survivors; self-test PASS; born-RED 838 pre-flatten; anti-evasion bite reddens |

**Holistic soundness** — path-literal-heavy structural gates run post-drop-segment with ZERO resolution errors:
`proof:colocation` PASS, `proof:dock-morph-family` PASS, `proof:webgl-substrate-single` PASS,
`proof:constellation-substrate-single` PASS, `proof:no-god-module` (FAIL for the WIP reason, 0 resolution
errors). The gates find their targets at the new flat paths — no dangling reference survives.

Final structure: **91 flat peers** (43 ui + 49 custom − 1 tabs merge − 1 dead ui barrel), `tabs/` holding
SegmentedTabs at root + reka nested at `tabs/reka/`, `_shared` flat, `PROCEDURAL-SUITE.md` at `components/`.

---

## §5 Instructive findings (the three bugs the execution surfaced)

1. **The elide anchor / tests-mirror.** `elide` fires on any `components/(ui|custom)` segment; the `tests/` mirror
   contains those segments without being moved by the src pass, so the first run corrupted 3 test files
   (`../../utils/mountComposable`, `../../../src/composables/color`). **Fix: flatten the tests mirror too** (the
   mirror invariant), after which the already-computed rewrites are correct. LESSON for the spec: the codemod's
   move-map is `{src, tests}` — both mirror-trees flatten atomically; `demo` uses the absolute alias and needs no
   depth arithmetic. This is a sharper statement of the round-1 "HYBRID instrument."
2. **The no-dist artifact.** 2 residual TS2307 on `@mkbabb/glass-ui/fourier-math` were NOT flatten-induced — that
   subpath maps to `dist/fourier-math.d.ts` (`package.json` typesVersions), absent in a fresh worktree. Symlinking
   the built dist read-only → 0 errors. LESSON: a flatten proof must isolate no-dist noise (symlink dist, or
   scope the pass/fail to TS2307 on `components/*`/relative paths). The codemod never touched that line
   (`@mkbabb/glass-ui/…` ≠ `@glass/…`).
3. **The meta-gate self-reference.** A detector for `components/(ui|custom)` contains the pattern in its own
   docstring + fixtures. Skip-self (exempt exactly the gate's own filename) is the house idiom; the fixtures also
   read fine once skipped.

---

## §6 Round-2 resolutions this execution delivers

- **The "861 literals" figure is measured precisely**: 865 raw `components/(custom|ui)` occurrences; 838
  segment-terminal tier-literals (the meta-gate's stricter boundary count); 218 scripts rewritten, 219 containing
  ≥1. The corpus migrates ATOMICALLY in one `dropSegment` pass — no per-gate hand-editing.
- **§7 "zero churn" is corrected concretely**: zero PUBLIC-EXPORT churn (the `@mkbabb/glass-ui/*` subpath surface
  is untouched — subpaths are `src/*.ts` entry files, not `components/*` paths); ~568 INTERNAL files rewritten
  (358 src + 210 demo/tests) + 218 scripts + ~91 dir moves. The migration is large but MECHANICAL and
  gate-verified.
- **The move-map is `{src/components, tests/components}`** — both mirror-trees; demo rides the alias. This is the
  executable refinement of the round-1 HYBRID instrument.
- **CONTESTED §2.6 (CSS colocation) is untouched here** — no `.css` file crosses the component tiers
  (`grep @import ... components/(custom|ui)` in src = 0), so the flatten does not force the CSS-move question; it
  stays the conservative documented-ownership default per round-1.

**Open (not blocking the flatten):** the 7 live-engine WIP over-500 files must drain (BG.W-CUT owns them, not
this migration); the tests-mirror flatten should be a NAMED step in the migration runbook so it is never skipped.

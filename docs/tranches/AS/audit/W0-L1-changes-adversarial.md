# AS.W0 L1 — adversarial audit of the AR.W2 cut + CI-green cascade

Lens 1, READ-ONLY. Range `84a6cc1..HEAD` (6 commits): `707f346` (proof:consumers
false-witness), `779fed7` (the AR.W2 body — GlassDock `useId()` + `proof:vt-names`
gate + ConfiguratorLayer inert + P5 + lockfile + node 24), `ed2add9` (3.1.1
version bump), `8515034` (proof:package CI-portability), `53a0fb3` (proof:resolution
CI-portability), `36fb348` (PROGRESS doc). Every claim below is reproduced from
code + a live probe; the gate runs were executed, not asserted.

Verdict up front: **the cut is correct and the gate matrix is genuinely green** —
543 tests, typecheck, build, all six CI proofs pass; the lockfile fix is DURABLE
(proven below); the P5 geometry correction is right; `:inert` closes the axe
violation. BUT the headline `proof:vt-names` gate is materially **over-claimed** —
it closes ONE mint shape and four real evasion vectors slip through silently, so
its "structurally impossible" framing is false. Plus three smaller debts.

---

## 1. GlassDock `useId()` fix — CORRECT, SSR-safe, an improvement

`GlassDock.vue:111` `const dockId = \`glass-dock-${useId()}\``; mint at `:184`
`dockId.replace(/[^a-zA-Z0-9_-]/g, "-")`. Adversarial checks:

- **Stability across re-render: HOLDS.** `dockId` is a `<script setup>` top-level
  `const` — evaluated once per instance setup, never re-run on re-render. Stable.
- **SSR/hydration: SAFE, strictly better than the counter.** `useId()` is
  SSR-deterministic by design (`runtime-core.cjs.js:1696` derives it from the app
  instance's `ids` array). The mint is additionally gated on `supportsVT`
  (`:179` `typeof document !== "undefined"`) so the name is NEVER emitted
  server-side — server renders `.dock-layers` with no VT style, client patches it
  in post-hydration. This SSR style-attr mismatch is a PRE-EXISTING AQ.W6 property
  (the useId change altered only the name VALUE, not whether it is emitted), so the
  fix introduces NO new hydration edge. Were the name ever emitted on both sides,
  `useId()` would mint the SAME id server+client — the old counter could not
  guarantee that. Net improvement.
- **Sanitize still holds.** `useId()` yields `v-N` / `<prefix>-N`; the `.replace`
  keeps `[a-zA-Z0-9_-]`. Valid `<custom-ident>`. Fine.

### 1a. Latent: `useId()` returns `""` not `undefined` — the guards/test miss the real degenerate
`runtime-core.cjs.js:1696`: `useId()` is typed `(): string` but returns the empty
string `""` (with a `warn`) when no active instance. Consequences:
- `DockLayerGroup.vue:73` guards `(vtId ?? "0")` — **dead code**: `"" ?? "0"` is
  `""`, not `"0"` (nullish coalescing does not catch empty string). The guard does
  not protect the case it appears to. GlassDock omits the guard entirely (also
  fine, since top-level setup always has an instance). The two files are
  inconsistent and BOTH mis-target the degenerate.
- The unit test (`GlassDock.vt-names.test.ts`) asserts `not.toBe("glass-dock-undefined")`
  — but the degenerate would be `"glass-dock-"` (empty `useId()`), which the test
  does NOT assert against. The pairwise-distinct assertion is the real teeth;
  the `undefined` guard is cosmetic and aimed at the wrong value.
Not a live bug (setup scope guarantees a real id) — flag as a consistency/clarity
debt: drop the dead `?? "0"`, or assert on `""` not `undefined`.

---

## 2. `proof:vt-names` gate — RUNS GREEN, but the closure claim is OVERSTATED

Live run: `526 files, 4 mints, 0 violation`, exit 0. The four mints classify
correctly (2 js-dynamic via `useId()`, 2 css-static allowlisted). The
counter-feeds-mint transitive trace (`counterFeedsExpr`) **does** catch the exact
original bug shape (`let dockInstanceId = 0` → `dockId` → mint). Verified by probe.

But the gate's audit-doc framing ("makes the collision structurally impossible…
the dual of AQ's `color-mix` closure") is **false**. AQ's `color-mix` closure is a
SUBSTRATE change — the failing form cannot be written. This gate is a regex SCAN of
ONE syntactic shape; I constructed and ran probes for the others. Four real mint
forms escape SILENTLY (probe `/tmp` harnesses, now removed; each replicated the
script's exact regexes):

| Evasion vector | Why it escapes | Detected? |
|---|---|---|
| `style.setProperty("view-transition-name", "vt-"+(n++))` | 2-arg call, not a `key:value` object property; `jsPropRe` needs `:`, `cssDeclRe` needs no quote-prefix | **MISS** |
| `el.setAttribute("style", "view-transition-name: x-"+n)` | `view-transition-name` preceded by `"` inside the string; `cssDeclRe`'s `(^\|[^"'\w-])` guard rejects a quote-prefixed prop | **MISS** |
| `el.style.viewTransitionName = "vt-"+(++c)` | camelCase DOM IDL form; gate only matches kebab `view-transition-name`. The gate's OWN test file (`GlassDock.vt-names.test.ts` JSDoc) acknowledges happy-dom uses this very camelCase IDL | **MISS** |
| inline `style="view-transition-name: foo"` in a `.vue` `<template>` | template regions are carved but **never mint-scanned** — `proof-vt-names.mjs:340/383` act only on `isScriptLike`/`isCssLike`; `template` falls through | **MISS** |

None of these forms exist in `src/` today (`grep` confirmed: the corpus uses only
the object-property kebab form, all caught), so the gate is CORRECT for HEAD. The
problem is the over-claim — a future mint via `setProperty`/`setAttribute`/camelCase
IDL/template-inline slips past a gate sold as a structural closure. Either narrow
the prose ("guards the object-property kebab mint form") or widen the scan
(add `\.style\.viewTransitionName`/`\.style\.anchorName` IDL matching, scan template
regions, and match `setProperty(`/`setAttribute("style"` string args).

### 2a. Counter-trace sub-escapes (narrower)
Probe confirmed `counterFeedsExpr` escapes on `var n = 0` (only `\blet\b` is
matched), on a counter reached through a FUNCTION body (`mk()` — only module-level
`const/let` bindings are traced, not fn bodies), and on non-`let` non-unique
sources (`reg.length`, `Date.now()`). Each is SAVED only by the `!fileHasUseId`
backstop — i.e. it escapes whenever the file ALSO calls `useId()` for any unrelated
reason. `fileHasUseId` (`:821`) is a file-level `/\buseId\s*\(/` boolean, NOT a
per-mint dataflow check: the gate passes any dynamic mint as long as the file
MENTIONS `useId(` somewhere and no `let`-counter feeds it. GlassDock passes via
this file-level branch, not because the gate proved `dockId → useId()`. A file with
a `useId()` aria id (exactly like `ConfiguratorLayer.vue:85`) plus a `var`-counter
VT mint would pass. Real teeth-gap.

### 2b. `.vue` block carver is shallow (masked, not active)
`fileRegions` carves blocks via `/<(script|style|template)\b[^>]*>([\s\S]*?)<\/\1>/`
— non-greedy, so a root `<template>` containing nested `<template v-if/v-for>`
(GlassDock has 3 `<template` tokens) matches only to the FIRST `</template>`,
truncating the carved region. Harmless TODAY because template regions aren't
mint-scanned anyway — both defects point to the same shallow `.vue` handling.

### 2c. Allowlist hygiene + comment-strip: CLEAN
`STATIC_ALLOWLIST = {--gl-tab-active, --gl-toggle-active}` — both are genuine
page-singletons (one `aria-selected`/`aria-pressed` per group), each with an inline
rationale; a NEW static name fails closed until a conscious entry. Good. The
comment-strip (block/line/HTML, line-aligned) is the AP.W4 discipline and is
correct for the corpus.

---

## 3. P5 correction (remove per-section `rounded-panel`) — CORRECT from code; one visual check REQUIRED

Reversing `b6d6cf4`. DOM nesting (`Configurator.vue` + `ConfiguratorLayer.vue`):

```
section.configurator.glass-floating.rounded-panel.overflow-hidden   ← clip, 12px, paints --glass-bg-floating
└─ aside.configurator-aside  (border-t / lg:border-l, NO bg)
   ├─ div.configurator-presets  (border-b, NO bg)
   ├─ div.configurator-controls.overflow-y-auto   ← scroll container, NO bg
   │  └─ div.flex.flex-col
   │     └─ ConfiguratorLayer × N  (border-b, last:border-b-0, **transparent, no bg**)
   └─ div.configurator-footer  (border-t, NO bg)
```

Established facts (grep-verified): `--radius-panel = --radius-xl = 12px`
(`theme.css:217/223`); there are **NO CSS rules for `.configurator-layer*`** — they
are bare transparent class hooks; the ONLY opaque fill is `--glass-bg-floating`
painted by `.glass-floating` on the **section root**, which carries
`rounded-panel overflow-hidden` and therefore clips its own background to the 12px
corners.

Therefore:
- **`rounded-panel` on a transparent, `border-b`-only `.configurator-layer` was net
  harmful**, exactly as the P5 audit claims: `border-radius` on an element whose
  only paint is a bottom hairline curls the two ends of that hairline up ~12px,
  notching the divider; on the `:last` section `last:border-b-0` left nothing to
  round (inert). It never produced a visible rounded CORNER (no bg to clip).
  **Removal is correct.**
- **Removing it does NOT regress the first/last outer corners.** Those corners are
  owned by the section's `overflow-hidden` clip + the `.glass-floating` background
  on the section root. The layer sections never painted into those corners (no bg),
  so the corner rounding is entirely the container's. Sound.

**Visual render check REQUIRED for the one residual code cannot settle:**
`.configurator-controls` is `overflow-y-auto` (scrollMode `auto`/`always` default).
When the layer stack overflows and a scrollbar appears, the scrollbar is painted
inside the UN-rounded `.configurator-controls` box. Verify, at a viewport where the
controls column scrolls:
1. **Bottom-right rounded corner of the panel** — the scrollbar gutter must not
   show a squared edge poking outside the 12px radius (the `aside` is the right
   column; the controls box sits against the panel's right edge). If a square gutter
   peeks past the curve, the section needs `overflow-y-auto` to ALSO clip rounded —
   but it is not the rounded element, so a fix would move the scroll/round to a
   single element.
2. **Flush inner seams** — confirm the `border-b` dividers between sections now run
   STRAIGHT edge-to-edge (the deformation is gone), and the FIRST section's top edge
   and LAST section's bottom edge are clean against the rounded panel top/bottom.
3. Mobile single-column (`grid-cols-1`) — the layer stack spans full width, so its
   top corners reach the panel's top-right AND top-left; confirm both round cleanly.
`demo/stories/primitives/configurator-mobile.vue` is the render fixture.

---

## 4. ConfiguratorLayer `:inert` — CORRECT, no focus-trap; one style divergence

`ConfiguratorLayer.vue:144` `:inert="!internalOpen"` on the `role="region"` body
(which also keeps `:aria-hidden="!internalOpen"`). Compiled chunk
`dist/useConfiguratorState-CtRBE0m_.js` carries BOTH `inert` (×2) and `aria-hidden`
(×4) — defense-in-depth survives into the bundle.

- **Closes the axe `aria-hidden-focus` violation correctly.** The body is a
  `grid-template-rows: 0fr` collapse where children stay in the DOM (clipped by the
  inner `overflow-hidden`); pre-fix they remained tabbable under an `aria-hidden`
  ancestor — the serious violation. `inert` removes the subtree from tab order AND
  the AX tree → structurally impossible. Correct.
- **No focus trap.** `inert` RELEASES focus (does not trap). On collapse, if focus
  is inside the region, the browser moves it out (to `<body>`) — never a lockup.
  The trigger is a SIBLING (not inside the inert subtree) so it stays interactive;
  focus is not auto-returned to it (acceptable: the user collapses via the trigger,
  so focus is already there). Only edge: programmatic/controlled collapse while
  focus is inside drops focus to body — benign.
- **Grid-rows interaction is clean.** `inert` toggles instantly with `internalOpen`
  while the rows transition runs 200ms; on collapse the subtree is inert immediately
  (no window where a visible-but-inert control reads interactive); on expand inert
  clears at animation start (controls live as they reveal). Correct ordering.
- **Style divergence (minor):** the dock family uses `:inert="cond || undefined"` /
  `:inert="x ? undefined : true"` (GlassDock:332/338, DockLayer:49) to never emit
  `inert="false"`; ConfiguratorLayer uses bare `:inert="!internalOpen"`. For a
  boolean attr Vue omits it when falsy, so it is functionally identical — but it
  breaks the house idiom in the SAME component family.

---

## 5. Lockfile surgery — CORRECT and **DURABLE** (proven, not asserted)

The repair stripped the 4 `@mkbabb` `file:`-link entries and registry-resolved
keyframes 2.2.0 / value 0.10.0 / parse-that 0.8.2. The audit's recurring-chore
worry is the right question — I tested it live:

- **`npm install --package-lock-only`** → **no @mkbabb drift** (registry entries
  stable).
- **A real `npm install`** (touches `node_modules`) → **lockfile stayed git-clean
  AND `node_modules/@mkbabb/*` was reconciled from symlinks to real registry dirs**
  (`keyframes.js` went symlink → directory; `parse-that` appeared). The registry
  lockfile is **self-healing**: install reconciles `node_modules` TO the lockfile
  rather than re-adopting siblings.
- Root cause of the symlinks I found at session start: a PRIOR manual
  `npm install ../keyframes.js`/`npm link`, not anything the lockfile recreates.
  There is no `overrides`, no `workspaces`, no `.npmrc` (root or parent) forcing the
  link. So the fix is **durable** — it re-drifts ONLY if someone again runs
  `npm install ../keyframes.js` or `npm link`. The standing dev workflow (sibling
  `build:watch` + registry `dist/` resolution per contract-v2) does not.
- glass-ui peer is now `@mkbabb/keyframes.js: ^2.2.0` and the local sibling is at
  2.2.0, so the proof-package `file:` dev path also satisfies the range. Consistent.

Durable. The standing residue is a one-time hazard (don't re-link), not a recurring
chore. A `preinstall` guard or an `.npmrc` `install-links=true` could harden it, but
is not required.

---

## 6. The three proof:* CI-portability fixes + the consumers:static fix — CORRECT, teeth RETAINED

- **`proof:package` (`8515034`)** — `existsSync(keyframes) ? file:… : dependencyVersion(...)`.
  `existsSync` import present (`:2`); `dependencyVersion` falls through dev→dep→peer
  →"latest". On a clean runner the sibling is absent → registry range
  (now `^2.2.0`), which resolves (all three @mkbabb published). Dev keeps the
  in-tree `file:` sibling. Correct; the packed-surface assertion is unchanged.
- **`proof:resolution` (`53a0fb3`)** — absent SIBLING publisher is a logged skip;
  glass-ui (`dir === ROOT`) stays REQUIRED. Verified glass-ui's own manifest
  satisfies the always-checked path (3-key exports, `build:watch`, no `development`
  condition), so the gate still proves glass-ui's contract-v2 shape on CI. Teeth
  retained for the one repo that is always present. One nit: the comment says it
  "mirrors the consumer-config skip below" — the consumer skip (`:309`) is SILENT
  (no log), the new publisher skip LOGS; the comment is slightly inaccurate, not a
  bug. (Sibling contract-v2 compliance is now unverified on glass-ui's CI — but each
  sibling owns its own CI; acceptable.)
- **`proof:consumers:static` false-witness (`707f346`)** — `stripComments` now runs
  in `collectExports` BEFORE the `export *` scan, so `src/index.ts:174`'s commented
  `// NOT \`export * from "./composables/motion/core"\`` is no longer followed. The
  fix also (a) explicitly allows the AQ.W5 VT trio and (b) subtracts the 4
  vueuse-bearing ui families. Live verified: gate PASS (0 unexpected / 0 missing);
  a phantom surface-creep symbol IS still flagged unexpected (teeth retained);
  `Input/Textarea/Combobox/Carousel/useCarousel` are confirmed ABSENT from the
  actual curated root (the subtraction mirrors reality). **Latent fragility:** the
  subtraction is a NAME-based blanket `rootAllowed.delete(name)` over 24 symbols. No
  collision today (probed: none of the 24 names also appears in any other allowed
  package), but if a future shared symbol NAME lived in both a subpath-only ui
  package and an allowed package, the blanket delete would silently weaken the gate.
  Prefer a per-source-aware exclusion over a name-set subtract.

### 6a. Other proof:* with the same latent monorepo assumption?
Swept all `scripts/proof-*.mjs` for unguarded `resolve(PARENT,…)` sibling reads:
- `proof-phantom-classes.mjs` — guarded (`:317 if (!existsSync(root)) continue;`);
  the fourier PENDING handoff is intentional, runs green on CI (no sibling). OK.
- `proof-consumers-static.mjs` — guarded (`:169 if (!existsSync(dir)) return [];`). OK.
- `proof-runtime` / `proof:consumers:build` are NOT in the CI subset (per ci.yml
  comment — sibling-dependent, run locally only). OK.
No other proof:* carries an unguarded sibling assumption waiting to fire.

---

## 7. Cleanliness gaps (low severity, fold-worthy)

- **Stale committed evidence artifact.** `docs/tranches/F/audit/W1-consumers-static.json`
  (committed) still lists `Carousel*`/`Combobox*` — it was generated by a PRE-FIX
  run and not regenerated in the fixing commit. Output-only (never read as gate
  input — `:436` write, no read), so it does NOT affect pass/fail, but the committed
  evidence does not reflect the corrected gate. Regenerate at AS close.
- **Node 20→24 vs `engines: >=22`.** Correct (24 ≥ 22; Actions forces 24 from
  2026-06-16). No issue.
- **`NPM_TOKEN` not seeded** → 3.1.1 published locally, CI-publish path unproven.
  USER-DOMAIN, already noted in the audit.

---

## Fold roster (suggested for AS)

1. **`proof:vt-names` coverage hardening** (W3-class) — close the four evasion
   vectors (camelCase IDL, `setProperty` 2-arg, `setAttribute("style")`, template
   inline) OR narrow the prose to "object-property kebab mint form." Make
   `fileHasUseId` a per-mint dataflow trace, not a file-level boolean. CHRONIC risk
   if shipped as-is under the "structurally impossible" banner.
2. **P5 visual render check** (W2/W5) — the `overflow-y-auto` scrollbar-vs-rounded-
   corner verification (§3); the only thing code cannot settle.
3. **useId guard/test consistency** (§1a) — drop dead `?? "0"` in DockLayerGroup;
   assert `""` not `undefined` in the test; align `:inert` idiom in ConfiguratorLayer
   to the dock family's `|| undefined` form.
4. **consumers:static subtraction robustness** (§6) — replace the name-set blanket
   subtract with a source-aware exclusion; regenerate the stale artifact.
5. **Lockfile re-drift hardening** (optional, §5) — `.npmrc install-links` or a
   `preinstall` guard so a stray `npm install ../keyframes.js` cannot re-link.

# Q.W6 — Consumer re-audit: value.js / keyframes.js / fourier-analysis

**Lane**: W6 consumer re-audit (3 of the 6 consumer lanes; W6.md lines 22-31).
**Posture**: READ-ONLY for git across all repos. Build/typecheck/gh-pages smoke checks only.
**Date**: 2026-05-18.

## Charter

Re-audit three consumers post-Q. Per consumer, verify it builds and the Q remediation
is present:

- **value.js** — verify the `W1-Lane-I-valuejs.patch` content (picker 0×0 fix + `default`
  exports key) matches the current working tree; verify `npm run build` GREEN; confirm the
  `.pane-main` flex-stretch fix is in `demo/@/styles/style.css`.
- **keyframes.js** — verify the W1 `exports` 4-key keystone + the W5 demo restoration
  (commits `84f1659`/`5861d18`/`e073dac`/`b721a0c`). Run `build` + `check` + `gh-pages`.
  Confirm `<Suspense>`, `<StatusDot>`, `.rainbow-pastel`, dead-code purge, `dist/` untracked,
  and zero `glass-subtle` / `.status-dot--` / `text-2xs` in `demo/` source.
- **fourier-analysis** — verify the W1 resolver sweep (`926ca6a`) landed; verify `web`
  builds GREEN; confirm the `.cartoon-card` + `.glass-{subtle,medium}` phantom sites still
  exist (W4-Lane-F patch un-applied) and the patch is well-formed. Do NOT apply the patch.

---

## value.js — VERDICT: GREEN / Q-remediation PRESENT

**Repo**: `/Users/mkbabb/Programming/value.js` — master `baf9a9d`, 58-file dirty tree
(the value.js team's in-flight Tranche-B work; expected per Q.W1 PROGRESS).

| Check | Result |
|---|---|
| `npm run build` | **GREEN** — `vite build --mode production`, 33 modules, dist emitted, exit 0 |
| `W1-Lane-I` patch — `package.json` `default` key | **PRESENT** — `exports["."]` carries `"default": "./dist/value.js"`; diff matches the patch byte-for-byte |
| `W1-Lane-I` patch — `.pane-main` flex-stretch in `demo/@/styles/style.css` | **PRESENT** — `.pane-main { grid-row:2; align-self:stretch; display:flex; flex-direction:column; min-height:0; min-width:0 }` + `.app-layout > nav { grid-row:1 }` + `.pane-container { min-height:0 }`. `git diff` of `style.css` matches the patch hunks exactly |
| `W1-Lane-I` patch — `color-picker/App.vue` `<nav>`/`<main class="pane-main">` landmarks | **PRESENT** — both a11y landmarks in the working tree as the patch specifies |

The `W1-Lane-I-valuejs.patch` content is **fully applied in value.js's current working
tree** (handed-over-not-committed per Q.W1's value.js-team risk-7 carve-out; the patch
edits are now live, entangled with the team's own 58-file Tranche-B tree). value.js is in
a **buildable state**. The picker 0×0 fix — `.pane-main` re-establishing the definite-height
context — is in `demo/@/styles/style.css`. No residual.

---

## keyframes.js — VERDICT: GREEN / Q-remediation PRESENT — with ONE Q-RESIDUAL (gh-pages clobbers library dist)

**Repo**: `/Users/mkbabb/Programming/keyframes.js` — master `b721a0c` (v2.1.1), clean tree.

| Check | Result |
|---|---|
| W1 `exports` 4-key keystone | **PRESENT** — `exports["."]` = `{ development: ./src/animation/index.ts, types: ./dist/keyframes.d.ts, import: ./dist/keyframes.js, default: ./dist/keyframes.js }` |
| `npm run build` | **GREEN** — library build, `dist/keyframes.js` 50.19 kB + `dist/keyframes.d.ts`, exit 0 |
| `npm run check` (typecheck) | **GREEN** — `tsc --noEmit`, 0 errors (see residual note below — a stale-dist false-fail surfaced on the first run) |
| `npm run gh-pages` | **GREEN** — demo build, exit 0 (chunk-size advisory only, non-blocking) |
| W5 commits `84f1659`/`5861d18`/`e073dac`/`b721a0c` | **ALL on master** |
| `<Suspense>` in App.vue | **PRESENT** — `demo/app/App.vue:115` — canonical `Transition > KeepAlive > Suspense > async` chain |
| `<StatusDot>` adoption | **PRESENT** — `AnimationMenuBar.vue` + `dock/TopDock.vue` |
| `.rainbow-pastel` on play button | **PRESENT** — `AnimationMenuBar.vue:99,133` — `isPlaying ? 'rainbow-vivid' : 'rainbow-pastel'` |
| Dead code purged | **CONFIRMED** — `demo/{boxes,balls,simple,bench}` gone; `demo/{amiga,cube,square}` retain only live scene assets/composables (no standalone `App.vue` dupes); `SceneNav`/`SimpleScene` gone |
| `dist/` untracked | **CONFIRMED** — `dist/` + `demo/app/dist/` both gitignored; `git ls-files dist/` empty; `git status` shows neither |
| grep `glass-subtle` in `demo/` source | **0** (hits only in untracked `demo/app/dist/` bundle) |
| grep `.status-dot--` in `demo/` source | **0** (hits only in untracked `demo/app/dist/` bundle) |
| grep `text-2xs` in `demo/` source | **0** (hits only in untracked `demo/app/dist/` bundle) |

All W5 demo-restoration markers verified. The three phantom greps are **0 in source** —
the non-zero raw counts were entirely inside untracked, gitignored `demo/app/dist/*.js`
build artefacts, which is contract-correct.

### Q-RESIDUAL — keyframes.js `gh-pages` mode clobbers the library `dist/` (MEDIUM)

`keyframes.js/vite.config.ts` defines BOTH the `production` (library) and `gh-pages`
(demo) build modes with the **same `outDir: ./dist/`**, and the `gh-pages` mode sets
`emptyOutDir: true`. Running `npm run gh-pages` therefore **wipes the library build**
(`dist/keyframes.js` + `dist/keyframes.d.ts`) and replaces `dist/` with the demo gh-pages
site (`dist/assets/` + `dist/index.html`). Whichever of the two builds ran last wins.

This was observed live during this audit: after `npm run gh-pages`, `dist/` held only the
demo site, and fourier-analysis (which symlinks `node_modules/@mkbabb/keyframes.js` →
the live keyframes.js repo) then failed `npm run build` with
`Cannot find module '@mkbabb/keyframes.js'` — because `exports["."].import` →
`./dist/keyframes.js` no longer existed. Re-running `npm run build` in keyframes.js
restored the library `dist/` and unblocked fourier.

This is **the same defect class** Q.W0/W1 was chartered to sweep — the AD.W4
dev-resolution desync, whose value.js manifestation was *"vite config demo-build clobbers
its own library dist/"* (Qα round-1 finding (1)). keyframes.js's gh-pages build carries
the identical hazard and W5 did not address it. It is masked in normal operation only
because `exports["."].development` → `src/` lets dev-mode consumers bypass `dist/`
entirely; it bites any consumer or tool that resolves the `import`/`types` condition
(production builds, `tsc` typecheck) whenever `dist/` was last written by `gh-pages`.

Also surfaced: the first `npm run check` run in this audit failed with
`Could not find a declaration file for '@mkbabb/glass-ui/dock'` — a stale-`dist/`
false-fail of the same family (glass-ui's `dist/` is gitignored; `tsc` resolved the
`types` condition to a `dist/dock.d.ts` that was momentarily absent/stale). A fresh
glass-ui `dist/` makes `check` pass cleanly; `--traceResolution` confirms the resolution
is correct once `dist/` is current.

**Recommendation (handoff, not a W6 write)**: keyframes.js's `gh-pages` mode should write
to a distinct `outDir` (e.g. `./dist-demo/` or `./gh-pages/`), divorced from the library
`./dist/`. This is a one-line consumer-side fix and is a clean fit for invariant 30's
cross-repo dev-resolution contract — file as a Q-residual / W6 referral. **keyframes.js
itself builds + typechecks + gh-pages-builds GREEN**; the residual is a build-output
collision, not a source defect.

---

## fourier-analysis — VERDICT: GREEN / Q-remediation PRESENT — patch un-applied (expected, pending handoff)

**Repo**: `/Users/mkbabb/Programming/fourier-analysis` — master `926ca6a`, 109-file dirty
tree (fourier team's in-flight WIP; expected per Q.W4 PROGRESS).

| Check | Result |
|---|---|
| W1 resolver sweep `926ca6a` | **PRESENT** — `fix(resolution): adopt cross-repo dev-resolution contract consumer half (glass-ui Q.W1 Lane D)` on master |
| `cd web && npm run build` | **GREEN** — `vue-tsc -b && vite build`, exit 0, all chunks emitted (**prerequisite**: keyframes.js's library `dist/` must be present — see the keyframes.js residual above; the first build attempt failed solely because `gh-pages` had clobbered keyframes.js's `dist/`) |
| `.cartoon-card` phantom sites | **STILL EXIST** — 15 files reference `class="cartoon-card"`; no defining `.cartoon-card` CSS recipe anywhere in `web/src/` (genuinely phantom — inert class) |
| `.glass-subtle` phantom sites | **STILL EXIST** — 5 files; no defining recipe |
| `.glass-medium` phantom sites | **STILL EXIST** — 2 files; no defining recipe |
| `W4-Lane-F-fourier.patch` well-formed | **CONFIRMED** — `git apply --check --recount` exits 0 against fourier's current working tree |

The W4 phantom-class migration is **delivered as `W4-Lane-F-fourier.patch` and remains
un-applied**, exactly as the W6 charter specifies (fourier carries ~100 files of its own
in-flight work; the patch is a handoff for the fourier team to apply after committing
their WIP). The patch is well-formed and applies cleanly. The `.cartoon-card` /
`.glass-{subtle,medium}` phantom sites are present and inert; fourier builds GREEN despite
them (they are dead class names with no recipe — cosmetic, not a build blocker).

**Pending handoff**: `W4-Lane-F-fourier.patch` — 29 sites / 22 files. The fourier team
applies it post-WIP-commit via `git apply --recount --3way`. The `proof:phantom-classes`
gate (invariant 32) will go non-zero on fourier until then; this is a known, tracked
W6 carry-forward, not a W6-introduced regression.

---

## Overall verdict

| Consumer | Build | Q-remediation | Residual |
|---|---|---|---|
| value.js | GREEN | PRESENT (`W1-Lane-I` patch fully live in working tree) | none |
| keyframes.js | GREEN (build + check + gh-pages) | PRESENT (W1 keystone + full W5 restoration) | **1 — `gh-pages` mode clobbers library `dist/` (MEDIUM; consumer-side; handoff)** |
| fourier-analysis | GREEN (`web`) | PRESENT (W1 sweep `926ca6a`; W4 patch un-applied by design) | phantom-class patch pending handoff (expected, tracked) |

**All three consumers build GREEN.** No W6-introduced regression. ZERO consumer-side
BLOCKER. The Q remediation is present in each: value.js's `W1-Lane-I` patch is fully
applied in its working tree; keyframes.js's W1 `exports` keystone + the complete W5 demo
restoration are on master and verified; fourier's W1 resolver sweep is committed and its
W4 phantom-class patch is well-formed and correctly held for handoff.

**One genuine Q-residual** surfaced: keyframes.js's `gh-pages` build mode shares
`outDir: ./dist/` with the library `production` mode and runs `emptyOutDir: true`, so a
demo build silently destroys the library `dist/` the package's `exports` resolve to. This
is the same demo-clobbers-library-dist defect class Q.W0/W1 chartered against the fleet;
W5 did not sweep it for keyframes.js. It does not break keyframes.js's own gates, but it
breaks any downstream consumer's production build / typecheck whenever `gh-pages` ran
last. **Recommend filing as a Q-residual / W6 cross-repo referral** — a one-line
`outDir` split on the keyframes.js side, squarely within the invariant-30 dev-resolution
contract's remit.

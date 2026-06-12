# BA fleet — register D: the lineage map + cut mechanics

Lane: the LINEAGE MAP + CUT MECHANICS. Read-only audit. Anchor: ATLAS-LETTER-2026-06-12.md register D — "semver honesty on the A-list breaks (major-grade); after this cut the d6 lineage retires and the fork closes; the lineage map from 636adeae ships in the notes."

The headline: **the fork is a parallel publish line that the AZ prune declared "stale" while its largest consumer (the Connectivity Atlas) lived on it.** The cut owes the registry-version-to-mainline map BY NAME in the 4.0.0 notes, the fork-close protocol, and ONE binding precept so a fork-lineage consumer is never invisible to a prune gate again. The registry verifies the diagnosis: 3.11.0/3.11.1/3.11.2/3.12.0 all EXIST on npm (published 2026-06-10..06-11), `latest` resolved to 3.13.0 only at the AZ cut (06-12 02:11Z), and 3.10.0 sits deprecated below the AY close.

---

## 1. THE FULL LINEAGE MAP (publishable cut-notes section)

### The bifurcation point

```
merge-base 87c2d384  ·  2026-06-10 00:45:24 -0400  ·  package.json @ 3.9.0
  "AY: the user live-audit corpus (00:16-00:37) — 22 surface defects + 4 cross-cutting asks, ALL routed"
```

This is an **AY-tranche pre-close commit** — the AY user-audit bank, the tree at v3.9.0 still carrying the four soon-to-be-pruned subpaths (`/deck-progress`, `/header-ribbon`, `/glass-panel`, `/instrument-rail`) and NO `/handmark`, NO `/underline`. Both arcs fork from here.

### Arc 1 — the d6 fork (`feat/d6-library-3.10`, 9 commits, tip `2755ebbd`)

The fork graph is LINEAR (no merges); the `chore(release)` commits are the changeset version bumps, the publishes rode `release.yml` from the bump tips. The pencil-boil dep swap (`3b10db81`) is the SECOND commit — a publish-prep dep swap between the 3.10.0 base and the 3.11 work, NOT a separate publish.

| # | fork SHA | author date | package.json | registry publish | what it carried |
|---|----------|-------------|--------------|------------------|-----------------|
| 1 | `91b8c2f2` | 06-10 01:36 | 3.10.0 | (not published from fork; mainline 3.10.x is the AY cut) | D6 LIBRARY base: `./handmark` minted, disco star excised, gold family, liquid glass, morph recipes |
| 2 | `3b10db81` | 06-10 10:13 | 3.10.0 | — | pencil-boil `file:` devDep → `^0.4.0` (publish-prep) |
| 3 | `9467bd16` | 06-10 16:57 | 3.10.0 | — | **E-arc wave**: measured baseline · no-boil statics · ring brush · gold round-trip · single-surface re-parent · rail collapse opt-in · **useGlobalDark settle (`onFlipSettled`)** · control-glass carves · popover spring · **`PAPER_WASH_GROUND`** |
| 4 | `52ea40ae` | 06-10 ~20:58 | 3.11.0 | **3.11.0 @ 2026-06-10T20:58:06Z** | E-arc E1 publish bump |
| 5 | `749d45ad` | 06-10 17:10 | 3.11.0→3.11.1 | — | **HandMark measure anchors** on slotted CONTENT (empty-slot Range zeroing → legacy y=32 strike) |
| 6 | `6eebf846` | 06-10 ~21:10 | 3.11.1 | **3.11.1 @ 2026-06-10T21:10:44Z** | measure-anchor patch bump |
| 7 | `fee5e3cd` | 06-10 18:41 | 3.11.1→3.11.2 | — | **toggleDark forced-reflow deletion** (~40ms/flip whole-doc layout flush; atlas E9b.1 profile) |
| 8 | `336a9e00` | 06-10 ~22:41 | 3.11.2 | **3.11.2 @ 2026-06-10T22:41:52Z** | toggle-reflow patch bump |
| 9 | `2755ebbd` | 06-11 07:48 | 3.12.0 | **3.12.0 @ 2026-06-11T11:48:40Z** | **DarkModeToggle icon-morph survives flip suppression** (`data-allow-motion` carve + 251-line born-RED test `DarkModeToggle.icon-morph.test.ts`) |

(The author-date / publish-date inversions — e.g. #5 authored 17:10 but published after #4's 20:58 bump — are normal cherry-style reorder on the changeset line; the publish order is the registry truth.)

**Net new on the fork vs `87c2d384` (the A/B homes, git-verified):** `src/components/custom/handmark/` (full dir: `HandMark.vue` 329L, `brush.ts`, `freehand.ts`, `geometry.ts`, `ink.ts`, `texture.ts`, `types.ts`, `useHandMark.ts`, `index.ts`), `src/subpaths/handmark.ts`, `src/composables/motion/useRouteTransition.ts` (174L), `DarkModeToggle.vue` (+23L the carve), `MetricBadge.vue` (+10L the value rename), plus the test corpus (`HandMark.test.ts`, `baseline/brush/geometry/no-boil/texture` handmark tests, `useRouteTransition.test.ts`, `DarkModeToggle.icon-morph.test.ts` 251L, `MetricBadge.record.test.ts`) + two gate scripts (`proof-handmark-export.mjs`, `proof-gold-ink-contrast.mjs`).

### Arc 2 — mainline (`87c2d384`..master, 98 commits, the AY+AZ close)

| version | mainline commit | registry | what |
|---------|-----------------|----------|------|
| 3.10.0 | `a8cfd644` (AY CLOSE staged) | **3.10.0 @ 06-10T14:13:54Z** | **STALE pre-close artifact** — published outside `release.yml`, still ships the four pruned subpaths, lacks `/underline`; DEPRECATED on npm with a CHANGELOG pointer |
| 3.10.1 | `86591cea` (W-PUB1 recovery) `afdddf10` (the cut) | **3.10.1 @ 06-10T20:18:27Z** | **the TRUE AY close** — the prune + `/underline` + colocation/god-module carve; pin this on the 3.10 line |
| 3.13.0 | `60bd4f33` (AZ cut), tag `v3.13.0` @ `a63ee10e` | **3.13.0 @ 06-12T02:11:45Z** | the AZ reflection-bar close (dock rebuild, floating-carousel rail, adaptive auto-darken, de-red iOS register, blob page/studio, motion suite, prune-2 restores); **cut number moved ABOVE 3.11.x/3.12.0 so `latest` resolves the true close** |

The AZ close authored the lineage ruling at **`636adeae`** ("THE LINEAGE DISCOVERY: the registry 3.11.x/3.12.0 are stale-lineage publishes (pre-prune, no underline) — the cut moves to 3.13.0 with the full lineage map flagged at the cut") and `58c4265a` / `60bd4f33` recorded it in the CHANGELOG ("stale-lineage out-of-band publishes from a pre-prune tree"). **That ruling read mainline consumer-truth only — the atlas was the live consumer on the OTHER line.** This map is the correction the cut notes ship.

### The two-line picture (consumer orientation)

```
                              87c2d384 (3.9.0, AY pre-close)
                             /                              \
         mainline (AY+AZ close)                    d6 fork feat/d6-library-3.10
         3.10.0 (STALE/deprecated)                 3.11.0 ── 3.11.1 ── 3.11.2 ── 3.12.0
         3.10.1 (true AY close)                    (handmark, onFlipSettled, paperWash,
              │                                      useRouteTransition, reflow-fix, icon-morph)
         3.13.0 (AZ close, latest)  ◄── the atlas migrates here, holding ^3.12.0 until BA cut
              │
         4.0.0 (BA — the reconciliation; the fork folds, the lineage retires)
```

---

## 2. THE REGISTRY TRUTH (where a consumer on ANY version stands)

`npm view @mkbabb/glass-ui` at audit time — `dist-tags.latest = 3.13.0`; 23 versions live, full publish ledger:

| version | published (UTC) | line | a consumer here should… |
|---------|-----------------|------|--------------------------|
| 3.9.0 | 06-09 10:15 | mainline | the fork base; → 3.10.1 then 4.0.0 |
| **3.10.0** | 06-10 14:13 | mainline | **DEPRECATED stale artifact** — move OFF; the four pruned subpaths still ship here |
| **3.10.1** | 06-10 20:18 | mainline | the true AY close; → 4.0.0 |
| **3.11.0** | 06-10 20:58 | **d6 fork** | has handmark+onFlipSettled+paperWash; → 4.0.0 reconciliation (the A-list returns by new shape) |
| **3.11.1** | 06-10 21:10 | **d6 fork** | + HandMark measure-anchor fix |
| **3.11.2** | 06-10 22:41 | **d6 fork** | + toggleDark reflow deletion |
| **3.12.0** | 06-11 11:48 | **d6 fork** | + icon-morph carve; **the atlas holds ^3.12.0 here** |
| **3.13.0** | 06-12 02:11 | mainline (latest) | the AZ close; has NONE of the fork A-list (verified 0 files) — the BREAK the atlas hit |

**The two-line trap a consumer must understand:** semver makes 3.13.0 > 3.12.0, so an `npm update` or `^3.x` resolve silently moved a fork consumer from 3.12.0 ONTO 3.13.0 — across the bifurcation, LOSING `onFlipSettled`/`HandMark`/`/handmark`/`PAPER_WASH_GROUND`/`useRouteTransition`/the reflow-fix/the icon-morph carve with no removal in any 3.13.0 CHANGELOG line (they were never on the 3.13.0 line to remove). A consumer on 3.11.x/3.12.0 is NOT on a strict ancestor of 3.13.0. The 4.0.0 notes must say this in one sentence.

---

## 3. THE FORK-CLOSE MECHANICS

### The d6 retirement protocol (after the BA fold)

1. **The fold commits cite the fork SHAs by name.** Each BA wave that lands a fork capability (the A-list new-shape, the B-list folds) names the originating fork SHA in its commit body — `9467bd16` (onFlipSettled/paperWash/E-arc), `749d45ad` (HandMark anchors → 3.11.1), `fee5e3cd` (reflow deletion → 3.11.2), `2755ebbd` (icon-morph carve + the 251-line test → 3.12.0), `91b8c2f2` (the `/handmark` dir base). This is the provenance trail that makes the fork content reachable from mainline history after the branch is gone.
2. **Archive-tag, don't just delete.** Stamp `git tag d6-lineage-archive feat/d6-library-3.10` (annotated, pointing at `2755ebbd`) BEFORE the branch retires, so the 9-commit lineage + its registry-publish correspondence survives as a permanent ref even after the branch ref is deleted. The orchestrator owns the tag write (the agent git clause forbids it here).
3. **Delete the branch ref** (`feat/d6-library-3.10` local + `origin/feat/d6-library-3.10`) once the archive tag lands and the BA fold commits are pushed.
4. **The cut notes NAME the retirement** — the 4.0.0 CHANGELOG records "the d6 lineage (`feat/d6-library-3.10`, archived as `d6-lineage-archive`) retires; its capabilities return at 4.0.0 by new shape (see the A-list table); the 3.11.x/3.12.0 registry publishes stay live but are superseded — pin 4.0.0."
5. **Deprecate the dead-end fork versions on npm** — `npm deprecate "@mkbabb/glass-ui@>=3.11.0 <=3.12.0" "d6 fork lineage; superseded by 4.0.0 which folds these capabilities — see CHANGELOG 4.0.0"` (mirrors the existing 3.10.0 deprecation; orchestrator/publish-CI owns the write). Closes the silent-cross-the-bifurcation `npm update` trap.

### Other unmerged lineage branches — risk class triage

`git branch --no-merged master` lists ~45 refs, but the load-bearing distinction is **out-of-band REGISTRY PUBLISH with a live consumer** — only `feat/d6-library-3.10` carries that. Verified sample:

| branch | ahead/behind master | last commit | published out-of-band? | verdict |
|--------|---------------------|-------------|------------------------|---------|
| `feat/d6-library-3.10` | 9 / — | 06-11 | **YES — 3.11.x/3.12.0, live atlas consumer** | **the at-risk lineage; close per above** |
| `af-w1-glass-ui` | 544 / 0 | 2026-05-18 | no | **content-landed via squash** (rounded progress on master); harmless tip-divergence |
| `ak-w3-sub-barrel-publishing` | — / — | 2026-05-21 | no | content-landed (61 subpaths on master); harmless |
| `al-w10/w11-*` | 494 / 0 | 2026-05-26 | no | content-landed (design-idioms in the `docs/precepts` submodule; subpaths on master); harmless |
| `at-dock-convergence` | 117 / 0 | 2026-06-09 | no | content-landed (dock convergence shipped AX/AY); harmless |
| `aw-glass-atoms-band`, `ax-w13-vangogh-*` | (recent) | 06-07/06-08 | no | AX-era, content-landed; harmless |

The `544/0`·`499/0`·`494/0` ahead/behind shape is the squash-merge signature — the branch TIPS never merged but their CONTENT did (verified: af-w1's rounded progress, ak-w3's subpaths, al-w11's design-md are all on master). They are NOT consumer-visible-at-risk: nothing published out-of-band off them, so no `npm update` can strand a consumer on them. **`feat/d6-library-3.10` is the sole at-risk branch.** Recommendation: a low-priority orphan-branch GC sweep of the squashed af/ak/al/at refs is housekeeping, NOT a BA deliverable; only the d6 close is binding here. (The ~80 `worktree-*` refs are transient agent worktrees — orchestrator GC, ignore.)

---

## 4. SEMVER + H4 — does register D settle H4 to 4.0.0 outright?

**YES. Register D settles H4 arm (a) to 4.0.0 outright, on TWO independent grounds — either alone forces a major:**

1. **The A-list is a MAJOR-grade restoration-after-removal for a 3.12.0 consumer.** From a 3.12.0 (fork) consumer's vantage, `onFlipSettled`, `/handmark` (InkMark/HandMark/BRUSHES), `PAPER_WASH_GROUND`, `useRouteTransition`, and the icon-morph carve were REMOVED at 3.13.0 (the break they hit). Re-introducing them — even by a BETTER new shape — is a public-surface change that, combined with the deliberate shape changes (the letter's "tell us the new shape and we migrate"), is a breaking surface delta. The letter itself frames them as "capabilities we cannot lose … any natural shape works" — i.e. NOT a byte-identical re-export, which is a major by the no-backwards-compat / no-legacy-shim house rule (a clean break IS a major).

2. **BA carries its OWN independent breaks** (already on the roster, H4-bound before this letter): the disco-star/audacious excision, the W-TABS overhaul (`ui/Tabs` off the public surface, the default-ON indicator plate dies, segmented→pill fold, multi-select→ToggleGroup), W-PAGER (the carousel-dots/counter re-home), and `MetricBadge` `amount`→`value` (the atlas acknowledges this one as intentional and "just migrates"). Any one is a major under the no-alias rule.

Register D doesn't introduce the major — it **REINFORCES** it (per the letter's routing line "register D REINFORCES hinge H4 arm (a), 4.0.0") and removes any ambiguity: there is no honest 3.14.0 framing, because a fork consumer experiences a REMOVAL+RE-ADDITION across the cut, not a pure addition.

### What the 4.0.0 CHANGELOG owes the atlas BY NAME

**B-list — fold-or-provably-subsume, each line BY NAME (the letter: "never silently"):**
- HandMark content-node measure anchors (fork `749d45ad`, was 3.11.1) — folded as `<the new home>` / subsumed by `<X>`.
- toggleDark forced-reflow deletion (~40ms/flip, fork `fee5e3cd`, was 3.11.2) — folded into the settle-seam path / subsumed.
- icon-morph `data-allow-motion` carve (fork `2755ebbd`, was 3.12.0) — folded; **the 6-assert born-RED test (`DarkModeToggle.icon-morph.test.ts`) ported** (the letter mandates porting the TEST even if the mechanism is solved structurally better).

**A-list — the new-shape MIGRATION TABLE (the atlas's G2b ~30-call-site migration runs off this; old name → new shape → one-line migration):**

| was (3.12.0 fork) | A-need | 4.0.0 new shape | migrate |
|-------------------|--------|-----------------|---------|
| `onFlipSettled` | post-flip post-paint SETTLE seam (palette memo + chart retint + aurora re-derive subscribe to ONE moment) | `<the chosen shape: promise off toggle / event / VT-finished hook>` | `<call-site rename>` |
| `/handmark` (InkMark/HandMark/BRUSHES) | the platform's hand voice — a stable home | `<the new subpath/home>` | `<import path>` |
| flip suppression w/ live toggle | storm dies AND DarkModeToggle icon morph runs | `<data-allow-motion or structural successor>` + the ported test | `<markup/prop>` |
| `PAPER_WASH_GROUND` | a NAMED aurora ground profile | `<new constant/preset name>` | `<rename>` |
| `useRouteTransition` | the route-transition idiom | `<new composable, likely on useViewTransition substrate>` | `<rename>` |
| `MetricBadge.amount` | (atlas acks intentional) | `MetricBadge.value` | `amount=` → `value=` |

**The lineage map (§1 above) ships verbatim as a cut-notes section** (the letter: "the lineage map from 636adeae ships in the notes"), plus the fork-retirement line (§3) and the registry-orientation paragraph (§2 — "where you stand on any version").

---

## 5. THE PROCESS LESSON (one paragraph for the tranche doc)

> **The substrate-without-consumer prune reads consumer-truth from MAINLINE only; a fork-lineage consumer is invisible to it.** The AZ prune (`636adeae`) declared the registry 3.11.x/3.12.0 "stale-lineage out-of-band publishes from a pre-prune tree" and cut 3.13.0 above them — a correct read of the GIT tree, but the REGISTRY had a live consumer (the Connectivity Atlas) pinned to that line, so the "no consumer" finding was true on master and false in the world. The visual-load-bearing invariant (≥2 consumers or formal retire) and the prune gates (`proof:no-retired-survivor`, the disposition register) all query the local checkout's import graph; none probes `npm view … dependents` or the registry dist-tag history, so an out-of-band publish line can carry consumer-binding surface that the prune cannot see.

**The structural fix — recommend BOTH, but ONE is the binding rule:**

- **(a) The publish protocol forbids out-of-band lineage publishes** — every `@mkbabb/glass-ui` publish goes through `release.sh`/`release.yml` from a commit that is an ANCESTOR of `master`'s next cut; a publish from a fork branch that is NOT on the mainline DAG is forbidden. This kills the bifurcation at the SOURCE (the d6 versions could never have existed as a divergent registry line). This is the root cause and the higher-leverage rule.
- **(b) The disposition/prune gates gain a registry-consumer probe** — before a subpath/symbol RETIRE, the gate runs `npm view @mkbabb/glass-ui versions/time` and asserts no LIVE registry version within the supported range exports the symbol-to-prune without it being on the mainline ancestor line; a published-but-off-mainline export forces a NAMED disposition (fold/subsume/retire-with-migration), never a silent prune. This is the defense-in-depth backstop for when (a) is bypassed.

**ONE binding rule for CLAUDE.md / the precepts (recommended):**

> **No out-of-band lineage publish (BA invariant).** Every `@mkbabb/*` registry publish MUST originate from a commit that is an ancestor of the package's mainline default-branch cut, through the gated `release.sh`/`release.yml` path. A publish from a divergent fork/feature branch is FORBIDDEN — it creates a parallel registry line that `npm update`/`^x` silently traverses across the bifurcation, stranding consumers (the d6 `feat/d6-library-3.10` → 3.11.x/3.12.0 class, reconciled at BA/4.0.0). Corollary: the prune/disposition gates probe the registry (`npm view … time/versions`) before retiring any public symbol, so a published-but-off-mainline export forces a NAMED fold/subsume/migration line in the cut notes, never a silent prune. (The fork-lineage consumer is invisible to a mainline-only import-graph census; the registry is the second consumer-truth source.)

Recommend (a)+the corollary as the single CLAUDE.md invariant under §"Design Axes"/the publish-protocol clause, with (b) as its gate implementation in the disposition register.

---

## Provenance (audit commands, read-only)

`git merge-base master feat/d6-library-3.10` → `87c2d384`; `git log 87c2d384..feat/d6-library-3.10 --oneline` (9 commits); `git log 87c2d384..master --oneline` (98 commits); `git show <sha>:package.json` per fork tip (version ladder verified); `npm view @mkbabb/glass-ui versions/time/dist-tags --json` (registry truth); `git grep -l '<symbol>' {master,feat/d6-library-3.10} -- 'src/**'` (A-list: 0 on master, present on fork); `git rev-list --left-right --count master...<branch>` + content-existence spot-checks (af/ak/al/at squash-landed, not at-risk); `git show master:CHANGELOG.md` (the 3.13.0/3.10.1/3.10.0 lineage entries); ruling source `636adeae`, recorded `58c4265a`/`60bd4f33`, tag `v3.13.0` @ `a63ee10e`.

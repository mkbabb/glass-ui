# BG+BH joint 5.0.0 — cut · publish · consumer-update cadence

**Status:** execution protocol (tranche-DEV — authored, not run). The cut fires after BG closes (WS12) and BH lands the restructure + reshape; the whole thing publishes once as **5.0.0** (BH `PLAN.md §2-#4`).
**Owner of record:** the BG/BH joint close. Foreign-tree fence is ABSOLUTE — every cross-repo edit is a by-name ask; glass-ui edits ZERO sibling files.
**Authority read:** CLAUDE.md §Build "Gate hygiene" (`proof:full` · `--run full` siblings-absent · `proof:close-battery-parity` · `verify-siblings-intact` · `proof:lineage-probe` · inv-11 no-out-of-band-lineage), BH `PLAN.md §7` + §2-#4, BG `FINAL.md §6` (publish cadence), `GU-1-glass-key-fill.md`, `GU-3-TRIAGE.md`, MEMORY "the close must run `--run release` not just `--run local`" (the 4.0.0 lesson).

---

## §0 The lineage spine (inv-11 — read FIRST; it dominates the ordering)

Invariant 11 (no out-of-band lineage publish): every `@mkbabb/glass-ui` publish MUST originate from a commit that is an ANCESTOR of master's next cut, through the gated `release.sh`/`release.yml` path. A publish from a divergent branch creates a parallel registry line `npm update`/`^x` silently traverses, STRANDING consumers (the d6 4.0.0 post-mortem). **Consequence for this cut: the registry line is STRICTLY LINEAR on master** — `4.2.0 → 4.3.0 → 4.4.0 → 5.0.0`, each tag an ancestor of the next, each carrying everything below it. 5.0.0 is a DESCENDANT of 4.4.0, never a parallel branch.

**The divergence finding (load-bearing).** `release/4.3.0` (`28cf1cd1` — the K-I-ROOT-AUTHOR Δ1+Δ2+Δ3 set; Δ4 deferred) is **NOT an ancestor of `tranche/BG`** — both branch off `998136bb` (the 4.2.0 ship) independently. So Δ1-Δ3 are NOT in the BG tree. If 4.3.0 publishes from its divergent branch AND 5.0.0 cuts off the 4.2.0/BG line without folding it, a consumer that took 4.3.0 LOSES Δ1-Δ3 on the `^4`→`^5` bump — the exact inv-11 stranding class. **The protocol closes the edge: `release/4.3.0` reconciles onto master BEFORE its own tag, and the BG/BH cut line descends from it.** No tag is ever pushed from `release/4.3.0` directly.

`proof:lineage-probe` is the machine witness — it probes the live registry (`npm view @mkbabb/glass-ui versions/dist-tags`) + the consumer constellation at each cut; a published-but-off-mainline line forces a NAMED fold/migration row, never a silent break.

---

## §1 PRE-TAG close-battery (the irreversible-tag precondition)

Run BEFORE every tag in this cut (4.3.0, 4.4.0, 5.0.0 alike). The 4.0.0 lesson is binding: BA's `FINAL.md §3` claimed "`--run local` green" while `ci ⊂ local` carried 18 reds AND never ran the union siblings-absent — the close-class lie this kills.

**1.1 — siblings-intact tripwire BEFORE.** `node scripts/verify-siblings-intact.mjs` (exit 0 required). REDs if any real repo sits in a `/tmp/sibling-park`/`-stash` (a park-not-restored) or a constellation sibling is missing from `~/Programming`. This is the standing fence against the 2026-06-20 orphan incident.

**1.2 — the siblings-absent clean checkout (IN-REPO worktree, NEVER /tmp).** The CI runner is siblings-absent BY CONSTRUCTION (a fresh checkout with no siblings linked). Reproduce it LOCALLY in an **in-repo worktree under `.claude/worktrees/`** — the repo's own workflow-worktree home — NEVER `/tmp`, NEVER by moving a sibling:

```
git worktree add .claude/worktrees/cut-5.0.0-verify <the-cut-commit>
```

The siblings-absent property comes from the FRESH checkout not having the sibling repos linked into it — identical to the CI runner — NOT from touching `~/Programming`. (This SUPERSEDES the legacy `verify-siblings-intact` docstring's `/tmp` form for this cut: the in-repo `.claude/worktrees/` path honors the NEVER-/tmp constraint while preserving the same fresh-checkout absence. The foreign-tree fence holds — the worktree is INSIDE glass-ui.) It is ABSOLUTELY FORBIDDEN to `mv`/`rm`/move ANY path under `~/Programming` except glass-ui itself.

**1.3 — the FULL battery.** In the verify worktree:

```
npm ci
node scripts/gates.mjs --run full        # == npm run proof:full
```

`--run full` is the DEDUPED union of the `local`, `ci`, and `release` tag sets — NOT `--run local` or `--run release` alone. On the clean runner the sibling + detected-Playwright gates (`proof:resolution`, `proof:phantom-classes`, `proof:consumers:static`, `proof:substrate-cohesion`, `proof:touch-target`) skip-by-policy, so the clean-runner union IS the CI-accurate battery. `proof:close-battery-parity` (device-free meta-gate) locks that this path runs `--run full`; `release.sh`/`release.yml` invoke it by construction (§3).

**1.4 — the gestalt OR (5.0.0 only — the paint precondition).** `proof:ba-gestalt` is the ci-BLOCKING pixel oracle: operative-PASS IFF every roster verdict is PASS AND every declared capture path RESOLVES on disk AND the per-surface `surface-hash` matches its `surface-paths`' current bytes (G7 auto-revoke — ANY wave editing a painting source reverts that surface's PASS until re-captured). The 5.0.0 close demands a GREEN gestalt verdict over the LANDED post-WS12 surface; a stale hash is a FAIL, not a warning. The 480-capture WS12 dual-engine verdict is its binding paint.

**1.5 — siblings-intact tripwire AFTER.** Re-run `verify-siblings-intact.mjs` (exit 0). Run it again any time a sibling "looks missing." Then remove the verify worktree: `git worktree remove .claude/worktrees/cut-5.0.0-verify`.

A RED at any step ABORTS the cut — fix on the tranche line, never green-wash the tag.

---

## §2 The 5.0.0 bump + MIGRATION reshape + CHANGELOG

Land these on the cut line (master, descending from 4.4.0) as the LAST commits before the tag, after WS12 + the BH restructure (B2.1-swap, B2.2 /api fold, B4e doc-slim) have landed.

**2.1 — version bump.** `package.json` `4.2.0`→`5.0.0`. (`release.sh`/`release.yml` both hard-assert `tag == package.json.version` — a mismatch aborts.) De-straddle the value.js peer in the SAME commit if BH-B1-W2 has not already: `^0.13.0 || ^1.0.0` → `^1.2.0` (keyframes 5.1.0 transitively deps value `^1.2.0`); `proof:peer-conformance`/`proof:constellation-spine` must be non-vacuously GREEN.

**2.2 — MIGRATION.md reshape (the by-name-ask map, BH B4e).** The 5.0.0 break is, EXACTLY: drop the `./api` key + re-home its 203 symbols onto their owning subpaths (200 pure import-path swaps; 3 orphans add an export — `Surface`→/card, `MenuItemVariants`→/command, `ControlSize`→/forms). Reshape MIGRATION.md to the by-name-ask MAP form (`docs/tranches/BH/coordination/asks-and-consumes.md` is the source roster):
  - the 203-row /api re-home table (the input contract for the `public-surface.spec` map arm);
  - the **`--ring → --focus-ring-color` rename row** (GU-3 ASK B) — a MAJOR-sanctioned break, NO 4.x alias, with the pinned landing COMMIT and the atlas's 12-bare-site re-point;
  - the flat-barrel relocations (B2.3) + `src/subpaths/` delete (B2.1) recorded as KEY-PRESERVING (no consumer break);
  - per-row: the pinned 5.0.0 landing COMMIT (not a version string), fallback-first guidance, consume-and-delete cadence.

**2.3 — CHANGELOG.** Append the 5.0.0 entry: the export reshape, the `--ring` rename, the BG visual convergence summary, the lucide payload fix (BH-B1-W1), the value de-straddle. Slim per B4e (CHANGELOG is 267KB) but keep the 5.0.0 section complete — `proof:ay/az/ba-final` CHANGELOG-section targets follow the archive split, coordinate their two moves together.

---

## §3 The gated provenance publish (push the tag — CI publishes)

The publish is CI-gated provenance, NOT a local `npm publish`. The 3.2.0/4.0.0 precedent: push the `v*` tag, `release.yml` runs the gated provenance publish.

**3.1 — local pre-flight (optional, on the cut line).** `bash scripts/release.sh v5.0.0` — asserts `tag form` + `package.json == 5.0.0` + clean tree, runs `node scripts/gates.mjs --run full`, smoke-checks `dist/index.d.ts`, creates the annotated tag. (This is the local mirror of CI; the binding run is CI's.)

**3.2 — push the tag.** `git push origin master && git push origin v5.0.0`. The `v*.*.*` tag push triggers `.github/workflows/release.yml`:
  - `fetch-depth: 0` (the cardinal-ledger sub-gates resolve capture/surface commits via `git log` — a shallow clone false-REDs);
  - `npm ci`;
  - asserts `GITHUB_REF_NAME == package.json.version`;
  - **`node scripts/gates.mjs --run full`** — the union re-runs on the clean CI runner (siblings + Playwright gates skip-by-policy);
  - `npm publish --access public --provenance` — OIDC id-token attests the build to this repo/workflow; `NODE_AUTH_TOKEN` = the `NPM_TOKEN` automation secret. The publish step runs ONLY on tag refs.

**3.3 — post-publish lineage witness.** `proof:lineage-probe` (next close) confirms the live `5.0.0` line is on `latest` + the fork-lineage `3.11.x/3.12.0` snapshot is unchanged — no parallel line minted. Verify `npm view @mkbabb/glass-ui dist-tags` shows `latest: 5.0.0`.

---

## §4 The consumer-update cadence (AFTER 5.0.0 is live)

Per the asks-and-consumes relay (`docs/tranches/BH/coordination/asks-and-consumes.md`). The break touches exactly **3 by-name asks** (NOT the whole constellation): muster, speedtest, atlas. Every other live consumer (bbnf-buddy, slides-K) keeps every key — no ask owed. glass-ui issues the ASK; the sibling owns its OWN edit (foreign-tree fence).

Per-consumer cadence — the SAME five steps each:

1. **Bump** the sibling's `@mkbabb/glass-ui` dep to `^5.0.0` (its own repo, its own commit).
2. **Fallback-first** — the consumer adopts the new surface with the fallback present (e.g. `var(--focus-ring-color, var(--ring))` until the rename lands, then drop the fallback) so its tree is never red mid-migration.
3. **Pin the exact landing COMMIT** — the consume references the precise 5.0.0 master COMMIT (not a version string); nothing is published on `tranche/BG`/the cut line until the tag, so the consumer pins the immutable commit at consume-time.
4. **The by-name ask green-handshake** — the ask names the consumer, the import site, the symbols, and the new home; the sibling responds when its re-point is green. `proof:crossrepo-asks` asserts every ask names a consumer wave + a disposition + the green-handshake (no silent drop).
5. **Consume-and-delete** — the consumer deletes its interim shim in the SAME edit (the dead `optimizeDeps` string, the `:deep` override, the floating `PhaseTimeline`). The interim never lingers.

The 3 asks:

| # | Sibling | Site | Symbols | New home | Ask + consume-and-delete |
|---|---|---|---|---|---|
| 1 | **muster** | `frontend/src/composables/useAuroraConfig.ts:47` | `DEFAULT_AURORA_CONFIG`, `AuroraConfig` | `/aurora` | `migrate-api-to-aurora` — one-line re-point |
| 2 | **speedtest** | `src/features/speedtest/ui/PhaseTimeline.vue:52` | `TimelineSegment` | `/timeline` | `migrate-api-to-timeline` — re-point **+** drop the dead `vite.config.mjs:1033` optimizeDeps `/api` string |
| 3 | **atlas** | 12 bare `var(--ring)` sites across 11 files (GU-3 ASK B) | `--ring` → `--focus-ring-color` | (token rename) | `migrate-ring-to-focus-ring-color` — re-point all 12 ATOMIC with the 5.0.0 cut, fallback-first off the pinned commit; retire the `Dock.vue` `:deep` override |

**Unowned-seam cross-reference:** BG-WS5 OWNS the viz-subpath migration (`/constellation`, `/fourier-field`) with SLIDES as the named consumer — confirm WS5 carries it; the post-WS12 export-delta surfaces any key drop. `words/frontend/glass-ui/` is a vendored d6 fork (inv-11 lineage), NOT a registry consumer — owes no ask. The B1c kf/value CONSUME interims are met at the pinned keyframes 5.1.0 / value.js 1.2.0 — ZERO upstream asks.

---

## §5 Sequencing the parked 4.3.0 + GU-1 4.4.0 vs the 5.0.0 major

**Recommendation: publish 4.3.0 FIRST, then 4.4.0 (GU-1 + GU-3 ASK A), THEN 5.0.0 — three monotone tags on master, do NOT fold the 4.x tail into the major.**

The reasoning (each grounded in a binding constraint):

- **GU-1 is a `^4`-reachable additive delta — folding it into 5.0.0 strands its consumer.** GU-1 (`glass-key-fill` — 3 value-only edits) ships on the 4.4.0-line so the atlas consumes it **fallback-first off `^4.1.0` WITHOUT taking the major break** (the `/api` drop + `--ring` rename). That is the entire design of GU-1 being a minor. Fold it into 5.0.0 and the atlas can only reach it by swallowing the restructure — defeating the additive intent. GU-1's own doc + BG `FINAL.md §6` both mandate "4.4.0-line AFTER 4.3.0 publishes." GU-3 ASK A (StatusDot forced-colors opt-in) rides the SAME 4.4.0 minor, behind GU-1.
- **4.3.0 is parked + finished — publish it, do NOT re-open it.** `release/4.3.0` (Δ1+Δ2+Δ3; Δ4 deferred) is a complete parked cut. GU-1 explicitly "does NOT re-open the parked 4.3.0." So 4.3.0 ships AS-IS; 4.4.0 is the NEW additive minor on top.
- **The major is reserved for the ONE real break.** The export reshape (`./api` drop) + the `--ring` rename are the only consumer-facing breaks — one major, one migration event (BH §2-#4). The 4.x tail carries zero breaks.
- **inv-11 linearity is non-negotiable (the divergence edge from §0).** Because `release/4.3.0` diverged from the BG line, the cut line MUST be reconciled so each tag descends from the last. The ordering:

```
4.2.0  (current latest)
  └─ merge release/4.3.0 → master   (close the §0 divergence — Δ1-Δ3 now on the line)
       └─ tag v4.3.0 → publish        (gated; from master, never the divergent branch)
            └─ merge tranche/BG → master (BG converges through WS12)
                 └─ land GU-1 + GU-3-A as additive value/a11y commits
                      └─ tag v4.4.0 → publish   (the atlas reaches glass-key-fill on ^4)
                           └─ land the BH restructure + reshape + --ring rename
                                └─ tag v5.0.0 → publish   (the joint major; descends from 4.4.0)
```

Each tag is an ancestor of the next; 5.0.0 carries Δ1-Δ3 + GU-1 + GU-3-A by descent — no `^4`→`^5` consumer loses anything. `proof:lineage-probe` is GREEN at each step (one linear line, `latest` advancing 4.3.0→4.4.0→5.0.0).

**The one timing caveat:** GU-1's glass-fx.css edits + GU-3-A's a11y-fallback.css edit are `src/` writes, and BG owns the entire `src/` write-set — so 4.4.0 lands AFTER the BG glass/a11y waves settle those files (GU-1's own "ideally after the BG convergence lands"). That places the 4.4.0 cut between BG-converged-master and the BH-restructure commit — a clean window, since the BH restructure (what makes it 5.0.0) lands strictly after. If operational pressure collapses the 4.3.0 and 4.4.0 windows, they MAY combine into one 4.3.0-carrying-GU-1 minor — but only by EXPLICIT decision to re-open 4.3.0, which GU-1 currently forbids; the default is two separate minors.

---

## §6 The cut ledger (one row per tag)

| Tag | Carries | Cut from | Pre-tag battery | Publish | Consumer reach |
|---|---|---|---|---|---|
| **v4.3.0** | parked Δ1+Δ2+Δ3 (K-I-ROOT-AUTHOR; Δ4 deferred) | master ← `release/4.3.0` merged | §1 (no gestalt OR — additive) | §3 gated provenance | atlas `^4` fallback-first |
| **v4.4.0** | GU-1 `glass-key-fill` (3 value edits) + GU-3 ASK A (StatusDot opt-in) | master ← BG-converged + GU commits | §1 + re-approve 7 under-shadow baselines | §3 | atlas reaches glass-key-fill on `^4` |
| **v5.0.0** | joint BG+BH — `./api` drop + 203 re-home + `--ring` rename + restructure | master ← 4.4.0 ← BH restructure | §1 FULL (incl. §1.4 gestalt OR over WS12 surface) | §3 | §4 cadence — 3 by-name asks (muster/speedtest/atlas) |

Every consume pins the exact landing COMMIT, not a version — the BG-build-fenced discipline (nothing is published on `tranche/BG` until its content reaches a master tag).

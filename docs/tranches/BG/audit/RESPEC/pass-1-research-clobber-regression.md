# PASS-1 RESEARCH — LENS: CLOBBER / REGRESSION (BROAD TRIAGE)

**Date:** 2026-06-30 · **Branch:** `tranche/BG` · **HEAD:** `b716b5be` · **Base:** `master` (126 commits ahead)
· **pkg:** `4.2.0` → cut 5.0.0 · siblings-intact exit 0 (verified before + after). **READ-ONLY.**

> This OVERWRITES the prior `pass-1-research-clobber-regression.md` (it was dated to HEAD `9dfe285c` / 121-ahead;
> HEAD has since advanced to `b716b5be` / 126-ahead with the D1/D2/D3 live-fix landings). Everything below is
> re-verified on disk at the CURRENT HEAD, not carried forward on report faith. Where this pass corrects the prior
> clobber doc or the synthesized `RESPEC.md`, it is called out explicitly (the dock-saturate contradiction is the big one).

**Method:** ran every close-battery red individually (not via the harness alone); traced each to file:line + the
originating commit via `git log -S`; resolved the dock-blur regression contradiction (prior clobber doc said
"saturate 1.4→resting LOST"; RESPEC said "byte-identical phantom, only ±2% brightness" — I read the actual token
values in both modes); audited the @glass codemod for broken imports (typecheck + alias-wiring + 0-leakage, not
just the codemod gate); swept the glass token cascade for dup/orphan-chain definitions; diffed every BG-touched
`proof-*.mjs` for net-negative (clause-removal) deltas.

---

## TL;DR (load-bearing conclusions)

1. **FOUR live close-battery reds at HEAD, independently re-confirmed on disk** (R1–R4). The 4-vs-the-cured-12 story
   in RESPEC.md is correct: the SYNTH wave `ea4682c0` cured the stale 12; WS3/WS4 re-seeded 4 NEW of the same disease.
   The 4 reds are: `proof:no-god-module`, `proof:no-dead-token`, `proof:gen-ci-fresh`, `proof:tag-parity`.

2. **The dock-blur "regression" — I RESOLVED the contradiction between the two prior docs. Both were partly wrong.**
   - The prior clobber doc claimed the dock "lost its bespoke saturate identity (1.4 → resting's value)." **FALSE** —
     `--glass-saturate-dock` and `--glass-saturate-resting` are BYTE-IDENTICAL in BOTH modes (light `1.4`/`1.4`,
     dark `1.30`/`1.30`). No saturate change.
   - The RESPEC re-scoped it to "the ONLY real delta is BRIGHTNESS ±2%." **UNDERSTATES it** — there are TWO real
     deltas: (a) brightness ±2% (light `1.02`→`1.0` un-gated; dark `1.12`→`1.14` un-gated), AND (b) a **-1px blur
     radius** (dock `9px` → resting `8px`). The radius drop IS the deliberately peer-locked leg (the whole point of
     GLASS-BLUR-PEER, gate-asserted), so it's intended; the brightness ±2% is the un-gated phantom. Net: the dock
     plate is 1px crisper + ±2% brighter/dimmer — a real but small material shift, owed a dual-engine dock sign-off,
     NOT an identity-loss fix.

3. **`--glass-blur-dock` is the tip of a confirmed 3-DEEP orphan chain → an atomic delete is a 6-GATE cascade.**
   I verified on disk that the R2 delete reds `proof:glass-cal` (it asserts the exact dark-arm dock composite string
   at line 306) and `proof:glass-depth` (it reads `glass-blur-dock-radius: 9` at line 79). The close-red sweep is
   6 gates (R1–R4 + glass-cal-B3 + glass-depth-D3), confirming the RESPEC P2 finding.

4. **The @glass-alias codemod (BH B2.0) did NOT break imports — KEEP-VERIFIED.** 3-plane alias wired (tsconfig +
   vite + vitest + demo-dist), 0 `@glass` leakage into `src/`, 0 deep-relative `../src` survivors in demo/tests,
   278 `@glass` imports across demo+tests, `proof:alias-codemod` PASS, **typecheck exit 0** (the binding proof that
   the imports RESOLVE, not just that the alias string exists).

5. **NO gate was weakened to pass.** Every one of the ~45 BG-touched `proof-*.mjs` has a net-POSITIVE or near-zero
   line delta (smallest +2); zero net-negative (clause-removal) gates. The re-points (glass-cal peer-lock, hero-fit,
   compositions-hero, hero-audacious, the SYNTH re-points) are clean-break re-points with self-test bites that have
   teeth, all GREEN at HEAD. The ONE structural blind spot: `proof:glass-cal` peer-lock is scoped radius-only and
   EXPLICITLY excludes the saturate/brightness companions (lines 98-99) — so it is GREEN while not checking the leg
   that changed (§2). That is a documented scoping decision, not a weakening, but it is why the brightness phantom
   ships under green gates.

6. **No source-revert clobbers in any hot file.** `package.json` (4.2.0, value `^1.0.0`, keyframes `^5.0.0`,
   vaul-vue absent, lucide-vue-next absent), `src/index.ts` (292L barrel, 0 `@glass` leak), `glass.css` (0 dup token
   decls). The 4 reds are all ADDITIVE collateral (1 orphan chain + 2 over-500 growths + 2 gate mis-registrations),
   not later-wave-overwrites-earlier-intent.

---

## §1 — THE FOUR CLOSE-BATTERY REDS (re-verified on disk, each → file:line + commit)

| # | Gate | Verified evidence (this pass) | Origin commit | Skipped step |
|---|------|-------------------------------|---------------|--------------|
| R1 | `proof:no-god-module` | `ladder.css`=**527L** (master 489→HEAD 527), `shell.css`=**510L** (master 498→HEAD 510); both >500, NEITHER in the 16 RATCHET_BASELINES (verified the 16 keys; ladder/shell absent). status FAIL. | ladder: `6ec81deb` (GLASS-IDIOM-FACTOR); shell: `cd9ce46c` (GLASS-BLUR-PEER) | carve OR ratchet re-point |
| R2 | `proof:no-dead-token` | `--glass-blur-dock` = **0 `var()` readers** (grep confirmed); declared glass.css:166 + dark-arm.css:286. status FAIL. | `cd9ce46c` (re-pointed shell.css:29 `--dock-surface-blur` → `var(--glass-blur-resting)`) | delete whole orphan chain |
| R3 | `proof:gen-ci-fresh` | `ci.yml`=660L vs `--emit-ci` expects 662; first diff line 436 — `proof:glass-idiom-factor` in `gates.mjs` (×2) but `ci.yml` (×0). DRIFT. | `6ec81deb` (GLASS-IDIOM-FACTOR) | `npm run gates:emit-ci` + commit |
| R4 | `proof:tag-parity` | `proof:category-card-warm` registered `tags:["local"]` (gates.mjs:741-742) — a static src-scan gate missing `ci`, not in `JUSTIFIED_LOCAL_ONLY`. 1 violation. | `9e13965d` (CATEGORY-CARD-WARM) | promote to `ci` OR add `JUSTIFIED_LOCAL_ONLY` reason |

**The disease (CLOBBER lens):** R3 + R4 are the SAME class — "a wave touches the gate-registry hot file
(`gates.mjs`) and skips the downstream sync (emit-ci / tag promotion)." It recurred TWICE in the WS3/WS4 batch
(6ec81deb, 9e13965d). It will recur on EVERY gate-minting wave in the PENDING bulk unless a standing per-wave guard
catches it — the RESPEC's `closeDisease`-manifest sweep (P3) is the right answer.

> **Exit-code footgun (re-confirmed):** standalone `proof-*.mjs` scripts print `status: FAIL` but **exit 0** (the
> `gates.mjs` harness reads the JSON artefact, not `$?`). A fix-agent/CI checking `$?` on a standalone proof reads a
> FALSE GREEN. Trust only `gates.mjs --run full`.

---

## §2 — DOCK-BLUR UNIFICATION: the orphan chain + the resolved material-shift contradiction

### The 3-deep orphan chain (verified, each level dead or alive-only-via-dead)
1. `--glass-blur-dock` (composite `blur(9px·level) saturate(1.4) brightness(1.02)` light / `…saturate(1.30) brightness(1.12)` dark) — glass.css:166 + dark-arm.css:286. **DEAD** (0 `var()` readers; R2 flags it). Former sole reader `shell.css:29 --dock-surface-blur` re-pointed → `var(--glass-blur-resting)`.
2. `--glass-saturate-dock` (`1.4` glass.css:135 / `1.30` dark-arm.css:285) — read ONLY by the dead composite in (1). **Orphaned-via-dead-reader.** A fix deleting only `--glass-blur-dock` makes this DEAD next sweep.
3. `--glass-blur-dock-radius` (`9px`, glass.css:103) — read by the dead composite (1) AND `bridges.css:334 --blur-dock` (a Tailwind `@theme` bridge). **The `blur-dock` utility appears in ZERO templates** (grep empty) → the bridge var is itself unused → the 9px radius is effectively orphaned too.

**Atomic-delete cascade (verified on disk):**
- `proof:glass-cal` line 306 asserts the EXACT dark-arm string `--glass-blur-dock: …saturate(var(--glass-saturate-dock)) brightness(1.12)` → deleting `--glass-blur-dock` REDS glass-cal-B3.
- `proof:glass-depth` line 79 reads `"glass-blur-dock-radius": 9` → deleting the radius REDS glass-depth-D3.
- ⟹ **the R2 close fix is a 6-gate diff** (R1–R4 + glass-cal-B3 + glass-depth-D3), all retired atomically. A one-token delete is wrong (cascade-reveals level 2 + reds two more gates).

### The material-shift contradiction — RESOLVED (the prior two docs disagreed; both partly wrong)

| Channel | OLD dock (`--glass-blur-dock`) | NEW peer (`--glass-blur-resting`) | Delta | Gated? |
|---------|--------------------------------|-----------------------------------|-------|--------|
| Light radius | 9px | 8px | **-1px** | YES (peer-lock, intended) |
| Light saturate | 1.4 | 1.4 | **none** | n/a |
| Light brightness | 1.02 | (absent=1.0) | **-2%** | **NO (phantom)** |
| Dark radius | 9px | 8px | **-1px** | YES (peer-lock, intended) |
| Dark saturate | 1.30 | 1.30 | **none** | n/a |
| Dark brightness | 1.12 | 1.14 | **+2%** | **NO (phantom)** |

- **Prior clobber doc was WRONG:** it claimed "the dock lost its bespoke saturate identity (1.4 → resting's value)."
  The resting value IS 1.4 (light) / 1.30 (dark) — byte-identical. No saturate change.
- **RESPEC.md UNDERSTATES:** "the ONLY real delta is BRIGHTNESS ±2%" omits the -1px radius. The radius IS the
  intended peer-locked leg, so the omission is benign for the fix decision, but the accurate statement is "two
  deltas: the intended -1px radius + the un-gated ±2% brightness."
- **Disposition:** the dock plate is 1px crisper + ±2% brighter(light)/dimmer→brighter(dark). Small. Owed a dual-engine
  dock-plate paint sign-off at W-REFLECT3 (the brightness ±2% rides under green gates because glass-cal is radius-only).
  This is NOT an identity-loss fix; it is a sign-off.

---

## §3 — @GLASS CODEMOD (BH B2.0) INTEGRITY — KEEP-VERIFIED

| Check | Result |
|-------|--------|
| 3-plane alias wired | tsconfig.json:18 `"@glass/*":["./src/*"]` · vite.config.ts:22 · vitest.config.ts:22 · demo/vite.demo-dist.config.ts:35 |
| `@glass` leakage into `src/` | **0** (codemod scope held) |
| deep-relative `../src` survivors (demo+tests) | **0** |
| `@glass` imports live (demo / tests) | 167 / 111 = 278 total |
| `@glass` in `src/index.ts` | **0** (barrel intact, 292L) |
| `proof:alias-codemod` | **PASS** |
| **typecheck** (binding: imports RESOLVE) | **exit 0** |

The single largest mechanical change in the [C] band is sound. No broken imports.

---

## §4 — GATE-WEAKENING AUDIT — NONE FOUND (corroborated by net-line analysis)

I computed `(added − deleted)` for every BG-touched `proof-*.mjs`. **ZERO are net-negative** (smallest delta +2;
the apparent-deletions like liquid-tab `26-` are accompanied by larger additions — net +). No clause was removed and
no threshold lowered. Spot-checks:
- `proof:glass-cal` peer-lock = NEW clause, `PEER_RADIUS=8`, born-RED, self-test bite at line 173 (synthetic
  pre-wave regression). Teeth. **Caveat (not a weakening):** explicitly EXCLUDES saturate/brightness (lines 98-99) →
  the brightness phantom (§2) ships under its green.
- `proof:hero-fit` / `proof:compositions-hero` / `proof:hero-audacious` — all PASS at HEAD; clean-break re-points off
  the retired `frontDoorMega`/bare-display onto the chassis-`<h1>` mechanism, full self-test bite arrays.
- SYNTH wave `ea4682c0` re-points (storybook-complete, storybook-meta, liquid-tab, motion-one-clock, bc-fold-ledger,
  bg-deferred-ledger) — all GREEN with teeth; this is the wave that CURED the stale 12 reds.

---

## §5 — RATCHET BASELINE DOC-DRIFT (not a BG clobber, but a BH migration trap)

`RATCHET_BASELINES` = **16 active entries** (verified key-extract): liquid-morph.css, GlassDock.vue,
createCanvasLifecycle.ts, useWebGPUCanvas.ts, useDockFission.ts, property-regs.css, fission-bridge.css,
useDockContextSilhouette.ts, useGlassBackdropLuminance.ts, useBlobSatellites.ts, metaball.wgsl.ts,
flow-field.glsl.ts, SegmentedTabs.vue, metaball.frag.ts, useGooDotMatrix.ts, api/index.ts.

- CLAUDE.md (BB.W-CARVE4 line 32 + BB.W-CARVE5 line 41) asserts `RATCHET_BASELINES == {}` — **STALE**. BD.W-CUT
  re-populated the 16. `ladder.css`/`shell.css` are NOT among them (verified), so R1 is a genuine NEW violation, not
  a ratcheted grandfather.
- **Correction to the prior clobber doc:** it reported "`ladder.css`=true, `shell:false`" from a regex — the
  `ladder: true` was a FALSE positive matching a CODE COMMENT in proof-no-god-module.mjs (lines 72/75 reference a
  past ladder carve). Neither ladder.css nor shell.css is a RATCHET KEY. Both are genuine new over-500 violations.
- **BH migration trap:** BH plans to DELETE CLAUDE.md (19.2) + migrate canon homes (B4). If the migration copies the
  `=={}` assertion forward, the new canon doc inherits a false claim. The migration MUST read the LIVE 16-entry state
  (ACCEPTED-residual doctrine: status keys on `violations.length`, the 16 ship GREEN at 4.2.0; `==∅` is doctrine, not
  a live gate).

---

## §6 — FORWARD-CLOBBER WATCH (for PASS-2 / the build resume)

1. **The glass token cascade is the recurring clobber hot-file.** Every WS3-remaining / WS8 / WS9 / WS10 / WS12 wave
   touches `glass.css`/`ladder.css`/`shell.css`/`dark-arm.css`. ladder.css (527) + shell.css (510) are already over;
   each future wave is one growth or one orphan away from re-reddening no-god-module/no-dead-token. The carve discipline
   (WS4 rows 10.11/10.20) is currently scheduled AFTER WS8 grows these further — **order risk**. Carve ladder/shell
   BEFORE WS8 (RESPEC amendment 4 agrees).
2. **WS3 3.6 demoted default `<Button>`/dock OFF `glass-deep` onto the 8px peer; WS8 (glass-deep apotheosis) reads the
   deep refractive tier.** Confirm `glass-deep` SURVIVES the 3.6 demotion (RESPEC says it does → WS8 edge is a sign-off,
   not a re-open). The one cross-band semantic dependency where a landed wave constrains an unbuilt one.
3. **The two `gates.mjs` registration steps (emit-ci + tag-parity) have NO standing per-wave guard.** Recurred twice in
   4 commits; it will recur on every gate-minting wave in the PENDING bulk. The standing `closeDisease`-manifest sweep
   (RESPEC P3) is the structural fix.

---

## §7 — TRIAGE TABLE (clobber/regression lens)

| Item | Disposition | Why |
|------|-------------|-----|
| @glass codemod (BH B2.0) | **keep-verified** | 3-plane wired, 0 leak, 0 survivors, typecheck 0. No broken imports. |
| SYNTH fix-wave `ea4682c0` | **keep-verified** | Cured the stale 12; re-points carry teeth, all GREEN. |
| Hot files (pkg.json / index.ts / glass.css) | **keep-verified** | No source-revert, no dup token decls, deps clean. |
| WS3 3.6 GLASS-BLUR-PEER | **half-baked** | Paint still PENDING (no DELTA dir on disk). Material shifted -1px radius (intended) + ±2% brightness (un-gated phantom). Owed dual-engine dock sign-off + the R2 6-gate atomic delete. |
| WS3 3.7 GLASS-IDIOM-FACTOR | **amend** | Core landed GREEN, but grew ladder.css over 500 (R1) + skipped emit-ci (R3). Carve + regen. |
| WS4 10.25 CATEGORY-CARD-WARM | **amend** | Landed + painted, but gate `["local"]`-only (R4). Promote to ci. |
| `--glass-blur-dock` orphan chain | **amend** | R2: delete the WHOLE chain atomically (token + saturate-dock + radius + bridge), retire glass-cal-B3 + glass-depth-D3 in the same diff. |
| no-god-module ladder/shell (R1) | **amend** | Genuine new over-500. Carve BEFORE WS8 grows them further. |
| CLAUDE.md `RATCHET == {}` | **amend** | Stale; BH migration must read the LIVE 16, never copy `=={}`. |

---

## §8 — RISKS AT THE 5.0.0 CUT (clobber/regression lens)

1. **`--run full` is RED on 4 gates → a 6-gate atomic close-fix** (R1–R4 + glass-cal-B3 + glass-depth-D3). The cut
   cannot go green until the fix-wave addresses all six in ONE diff; a partial (one-token delete, one-red fix) re-opens.
2. **The dock brightness ±2% ships under green gates** (glass-cal is radius-only). No device-free gate catches it →
   needs a paint sign-off at W-REFLECT3 on the dock surface against the pre-unify look. Low severity (±2%), but the
   honest record is "two deltas: -1px radius (intended) + ±2% brightness (phantom)," not "byte-identical phantom."
3. **The glass cascade clobber hot-file** (§6.1): ladder/shell over-500 already; WS8/WS9/WS10/WS12 each grow them.
   Carve order is the standing risk.
4. **The emit-ci / tag-parity disease has no per-wave guard** (§6.3): recurred twice in 4 commits; will recur across the
   ~110 PENDING waves. Without the standing manifest sweep, the close re-reds on every gate-minting wave.
5. **Exit-code footgun** (§1): any fix-agent checking `$?` on a standalone proof reads a false green. Trust only
   `gates.mjs --run full` siblings-absent.

---

## APPENDIX — commands run (all read-only; siblings exit 0 before + after)

- `verify-siblings-intact --quiet` → exit 0 (×2).
- `proof-no-god-module` → FAIL (ladder 527, shell 510, neither ratcheted); `proof-no-dead-token` → FAIL
  (`--glass-blur-dock`, 0 readers); `proof-gen-ci-fresh` → DRIFT (660 vs 662, line 436); `proof-tag-parity` → 1
  violation (category-card-warm local-only).
- Token values: `--glass-saturate-dock`=`1.4`/`1.30` ≡ `--glass-saturate-resting`=`1.4`/`1.30` (IDENTICAL both modes);
  brightness dock `1.02`/`1.12` vs resting `(none)`/`1.14`; radius dock 9px vs resting 8px.
- Orphan chain: `var(--glass-blur-dock)`=0 readers; `--glass-saturate-dock`/`--glass-blur-dock-radius` read only by dead
  composite + `--blur-dock` bridge (0 template util uses).
- glass-cal:306 asserts dark dock string; glass-depth:79 reads `glass-blur-dock-radius:9` → 6-gate cascade.
- @glass: alias 3-plane wired, 0 src leak, 0 deep-relative survivors, 278 imports, `proof:alias-codemod` PASS, typecheck 0.
- Net-line analysis on ~45 BG-touched `proof-*.mjs` → zero net-negative.
- RATCHET key count = 16 (ladder/shell absent — the prior doc's `ladder:true` was a comment false-positive).
- pkg: version 4.2.0, value `^1.0.0`, keyframes `^5.0.0`, vaul-vue absent, lucide-vue-next absent; src/index.ts 292L 0-leak.
- D1/D2/D3 live-fixes landed source (`07c6e6ec` constants.ts `DEFAULT_PARALLAX=0`; `e40e5095` demo; `8947288a`
  dock/layers.css) + DELTA dirs on disk. 3.1/3.6 paint-pending have NO DELTA dir (genuinely un-painted).

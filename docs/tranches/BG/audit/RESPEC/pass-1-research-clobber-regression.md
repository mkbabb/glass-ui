# PASS-1 RESEARCH — LENS: CLOBBER / REGRESSION

**Date:** 2026-06-29 · **Branch:** `tranche/BG` · **HEAD:** `9dfe285c` · **Base:** `master` (121 commits ahead)
· **pkg version:** `4.2.0` (cut target 5.0.0) · siblings-intact exit 0 (verified before + after).
**Method:** ran the live close-battery reds individually; traced each to file:line + the originating commit;
audited the @glass codemod (B2.0) for broken imports — actually resolved every unique target, not just trusted
the gate; swept the glass token cascade for dual/orphan-chain definitions; diffed every BG-touched `proof-*.mjs`
for weakened clauses; sanity-checked the hot files (`gates.mjs`, `package.json`, `src/index.ts`, glass cascade,
CLAUDE.md). READ-ONLY.

---

## TL;DR (load-bearing conclusions)

1. **There are FOUR live close-battery reds at HEAD, not three.** The two sibling reports each caught only ONE of
   the two gate-registration reds — gate-reality named `proof:gen-ci-fresh`, cursor-truth named `proof:tag-parity`.
   **Both are red simultaneously**, and they are TWO DISTINCT `gates.mjs` clobbers from TWO DISTINCT commits. Full
   live-red set at HEAD: `proof:no-god-module`, `proof:no-dead-token`, `proof:gen-ci-fresh`, `proof:tag-parity`.

2. **The `--glass-blur-dock` dead token is the visible tip of a 3-DEEP ORPHAN CHAIN + a silent SEMANTIC dock
   regression** — not a lone dead token. A naive "delete the flagged token" fix cascade-reveals a second dead token
   next sweep, and the dock's backdrop-filter saturate identity already changed under green gates. See §2.

3. **The @glass-alias codemod (BH B2.0) is CLEAN — KEEP-VERIFIED.** All 250 unique `@glass/*` import targets resolve
   to real files; the 3-plane alias is wired (tsconfig + vite + vitest) + the demo-dist mirror; 0 deep-relative
   survivors; 0 `@glass` leakage into `src/`; typecheck exit 0. The codemod did NOT break imports. See §3.

4. **NO gate was weakened to pass.** The BG re-pointed gates (`glass-cal` peer-lock, `compositions-hero`,
   `hero-audacious`, `motion-one-clock`) are legitimate clean-break re-points carrying self-test bites with teeth, not
   lowered bars. The ONE borderline (`glass-cal` scoping the peer-lock to radius-only, deliberately excluding the
   saturate leg) is a scoping decision that MASKS the dock-saturate regression in §2 — flagged, not a weakening. See §4.

5. **`RATCHET_BASELINES` = 16 active entries vs CLAUDE.md's `== {}` (BB.W-CARVE5) claim — a doc-vs-code drift.**
   BD.W-CUT re-populated it with documented rationale, so it is not a BG clobber, but CLAUDE.md is stale on it, and
   `ladder.css` (527) / `shell.css` (510) are NOT among the 16 → genuine new violations. See §5.

6. **No source-revert clobbers in any hot file.** `package.json`, `src/index.ts`, the glass cascade show no
   cross-wave overwrite of intent. The 4 reds are all additive collateral (orphan + over-500 + 2 mis-registrations).

---

## §1 — THE TWO `gates.mjs` REGISTRATION CLOBBERS (two commits, two reds, each sibling caught one)

Both reds live in the SAME hot file (`scripts/gates.mjs`) but originate in two different waves; neither did the
companion regeneration/tagging step. This is the "a wave touches the gate-registry hot file and skips the
downstream sync" disease, recurring TWICE in the WS3/WS4 batch:

| Red gate | Cause | Origin commit | The skipped step |
|----------|-------|---------------|------------------|
| `proof:gen-ci-fresh` | `ci.yml` = 660 L vs `--emit-ci` expects 662; first diff line 436 — `proof:glass-idiom-factor` is in `gates.mjs` (×2 refs) but ABSENT from `ci.yml` (×0) | `6ec81deb` (GLASS-IDIOM-FACTOR) | `npm run gates:emit-ci` then commit ci.yml |
| `proof:tag-parity` | `proof:category-card-warm` registered `tags: ["local"]` (`gates.mjs:741-743`) — a static src-scan gate missing `ci`, not in `JUSTIFIED_LOCAL_ONLY` | `9e13965d` (CATEGORY-CARD-WARM) | promote to `ci` OR record a local-only reason |

**Why this matters for the CLOBBER lens:** the siblings treated "the third red" as a single item and disagreed on
its name. They are TWO independent incidents that compound — fixing one leaves the other. Any "fix the 3 reds" sweep
that names only one of them re-opens the close. The remediation is trivial (regen ci.yml + promote/justify the tag)
but BOTH must be in the fix-wave's checklist.

> Footgun observed: the standalone `proof-*.mjs` scripts print `status: FAIL` but **exit 0** (the `gates.mjs`
> harness reads the JSON artefact, not `$?`). A CI step or fix-agent that naively checks the exit code of a
> standalone proof script reads a FALSE GREEN. Confirmed on `proof-no-god-module`/`proof-no-dead-token`
> (`status: FAIL` … `EXIT:0`). Only `gates.mjs --run` interprets the verdict correctly.

---

## §2 — THE DOCK-BLUR UNIFICATION: A 3-DEEP ORPHAN CHAIN + A SILENT SATURATE REGRESSION

`proof:no-dead-token` flags ONE token (`--glass-blur-dock`). But GLASS-BLUR-PEER (`cd9ce46c`) re-pointed the dock's
last consumer and stranded the dock-blur token sub-cascade THREE levels deep, AND silently changed the dock's
composited material:

**The chain** (each level dead-or-alive-only-via-a-dead-reader):
1. `--glass-blur-dock` (the composite `blur(...) saturate(--glass-saturate-dock) brightness(1.12)`) —
   `glass.css:166` + `dark-arm.css:286`. **DEAD** (0 `var(--glass-blur-dock)` readers; the gate flags it). Its
   former sole reader `shell.css:29 --dock-surface-blur` was re-pointed to `var(--glass-blur-resting)`.
2. `--glass-saturate-dock` (`1.4` light `glass.css:135` / `1.30` dark `dark-arm.css:285`) — read ONLY by the dead
   composite in §2.1. **Orphaned-via-dead-reader.** `proof:no-dead-token` currently sees it as "alive" (a declared
   token reads it), so a fix that deletes only `--glass-blur-dock` makes `--glass-saturate-dock` dead NEXT sweep.
3. `--glass-blur-dock-radius` (`9px`, `glass.css:103`) — read by (a) the dead composite §2.1 and (b)
   `bridges.css:334 --blur-dock` (a Tailwind `@theme` bridge). Grep for a `blur-dock` utility in any template returns
   EMPTY → the bridge var is itself unused. So the 9px radius is effectively orphaned too.

**The silent semantic regression:** before the unify, the dock's `backdrop-filter` was 9px radius + `saturate(1.4)` +
`brightness(1.12)`. After, `--dock-surface-blur: var(--glass-blur-resting)` → 8px radius + `saturate(--glass-saturate-resting)`
+ (dark) `brightness(1.14)`. **The dock lost its bespoke saturate identity (1.4 → resting's value).** Whether this is
the intended "one-material peer" or an over-reach (only the BLUR RADIUS was meant to unify, not the saturate/brightness
companion) is unsigned-off. `proof:glass-cal`'s peer-lock comment confirms the gate author KNEW: *"the saturate-revert
is … EXCLUDED from the lock — only the radius leg is peer-locked"* (`proof-glass-cal.mjs:99`). So the gate is GREEN by
deliberately not checking the leg that changed.

**Fix guidance for the eventual sweep:** delete the WHOLE dock-blur sub-cascade atomically (`--glass-blur-dock` +
`--glass-saturate-dock` + `--glass-blur-dock-radius` + the unused `--blur-dock` bridge), OR confirm-and-document that the
dock intentionally now reads the resting-tier saturate. A one-token delete is wrong (cascade-reveals §2.2).

---

## §3 — @GLASS CODEMOD (B2.0) INTEGRITY — KEEP-VERIFIED

The `proof:alias-codemod` gate proves the codemod was APPLIED (719 rewrites, 0 survivors); it does NOT prove imports
RESOLVE. I verified resolution directly:

- **3-plane alias wired:** `tsconfig.json:18 "@glass/*": ["./src/*"]` · `vite.config.ts:22 "@glass": resolve(__dirname,"src")`
  · `vitest.config.ts:22 "@glass": fileURLToPath(.../src)` · `demo/vite.demo-dist.config.ts:35 "@glass": resolve(repoRoot,"src")`.
- **All 250 unique `@glass/*` import targets resolve** to a real `src/<path>{,.ts,.vue,.css,/index.ts}` — 0 MISSING.
- **0 deep-relative `(../)+src/` survivors** in `demo`+`tests`; **0 `@glass` leakage into `src/`** (codemod scope held);
  **0 `@glass` in `src/index.ts`** (barrel intact, 292 L).
- **typecheck exit 0** (re-confirmed at HEAD).

The codemod did not break imports. This is the single largest mechanical change in the [C] band and it is sound.

---

## §4 — GATE-WEAKENING AUDIT — NONE FOUND

39 `proof-*.mjs` were touched in the BG range. The high-deletion / re-point candidates (the ones a wave could have
softened to make itself pass) were examined:

- **`proof:glass-cal`** (touched by GLASS-BLUR-PEER, the wave it guards) — the 8px `PEER_RADIUS` lock is a NEW clause
  born-RED on HEAD (`button → floating 13px`, `dock → dock 9px` both flagged) with a self-test bite that has teeth.
  Not a weakening. **Caveat:** it scopes to the radius leg only (excludes saturate) — see §2, this is what masks the
  dock-saturate regression.
- **`proof:compositions-hero` / `proof:hero-audacious`** (re-pointed by HERO-FIT) — clean-break re-points off the
  retired `frontDoorMega`/bare-display mechanism onto `frontDoorRoutesChassis`/chassis-`<h1>`; both carry their full
  self-test bite arrays (10 / 12 bites). The mechanism changed; the gate correctly followed. Not a weakening.
- **`proof:motion-one-clock`, `proof:storybook-complete`, `proof:storybook-meta`, `proof:liquid-tab`** — SYNTH-wave
  (`ea4682c0`) re-points; all GREEN at HEAD with teeth intact (verified by the gate-reality sibling).
- **`proof:no-god-module`** — the 16-line diff is the BD ratchet-baseline re-population (§5), not a teeth change.

No clause was removed and no threshold lowered to green a wave. The re-points are legitimate.

---

## §5 — RATCHET BASELINE DRIFT (doc-vs-code, not a BG clobber)

`RATCHET_BASELINES` has **16 active entries** (liquid-morph.css, GlassDock.vue, createCanvasLifecycle.ts,
useWebGPUCanvas.ts, useDockFission.ts, property-regs.css, fission-bridge.css, useDockContextSilhouette.ts,
useGlassBackdropLuminance.ts, useBlobSatellites.ts, metaball.wgsl.ts, flow-field.glsl.ts, SegmentedTabs.vue,
metaball.frag.ts, useGooDotMatrix.ts, api/index.ts). CLAUDE.md (BB.W-CARVE5) asserts `RATCHET_BASELINES == {}`.
The 16 were re-populated at **BD.W-CUT** with documented rationale (the comment block at `proof-no-god-module.mjs:116`
explains the 19-file greenfield re-growth, split into "genuinely irreducible" + "sibling-lane deferred carve").

- This is NOT a BG clobber — it predates the BG branch. But CLAUDE.md is stale, and BH plans to DELETE CLAUDE.md
  (19.2), so the stale claim self-resolves — provided the canon-home migration (BH B4) carries the corrected ratchet
  state, not the `=={}` assertion.
- **`ladder.css` (527) + `shell.css` (510) are NOT among the 16** → genuine new no-god-module violations from WS3
  (`6ec81deb` grew ladder 489→527, `cd9ce46c` grew shell 498→510). The fix is a ratchet re-point WITH a carve-pending
  note, OR a carve. Either is fine; a silent re-pin is not (the gate's own close-state asserts `violations == []`).

---

## §6 — FORWARD-CLOBBER WATCH (for PASS-2 / the build resume)

1. **WS3 3.6 demoted default `<Button>` OFF `glass-deep` onto the 8px peer; WS8 (glass-deep apotheosis, phase 13)
   reads the deep refractive tier.** Confirm 3.6's demotion and WS8's deep-tier assumptions are compatible BEFORE
   WS8 builds, or WS8 re-opens 3.6. (cursor-truth flagged this too; reinforced here — it is the one cross-band
   semantic dependency where a landed wave constrains an unbuilt one.)
2. **The glass token cascade is the recurring clobber hot-file.** Every WS3-remaining / WS8 / WS9 / WS10 / WS12 wave
   touches `glass.css`/`ladder.css`/`shell.css`/`dark-arm.css`. Each is one over-500 growth or one orphan-chain away
   from re-reddening `no-god-module`/`no-dead-token`. The carve/dead-token discipline (WS4 rows 10.11/10.20) is
   currently scheduled AFTER WS8 grows these files further — order risk.
3. **The two `gates.mjs` registration steps (emit-ci + tag-parity) have no standing per-wave guard.** Every wave that
   mints/registers a gate must run `gates:emit-ci` + carry a `ci` tag (or a `JUSTIFIED_LOCAL_ONLY` reason). This
   recurred twice in 4 commits; it will recur on every gate-minting wave in the PENDING bulk (the vast majority).

---

## §7 — RISKS AT THE 5.0.0 CUT (clobber/regression lens)

1. **`--run full` is RED on 4 gates at HEAD** (`no-god-module`, `no-dead-token`, `gen-ci-fresh`, `tag-parity`). The
   cut cannot go green until a fix-wave addresses all four — and the `no-dead-token` fix must delete the WHOLE dock-blur
   orphan chain (§2), not just the flagged token.
2. **The dock saturate identity changed under green gates** (§2). If the dock's resting-tier saturate is NOT the
   intended look, this is a live visual regression that no device-free gate will catch — it needs a paint sign-off at
   W-REFLECT3, on the dock surface specifically, against the pre-unify 9px/saturate-1.4 look.
3. **CLAUDE.md `RATCHET_BASELINES == {}` is stale** and feeds the BH canon-home migration; if the migration copies the
   `=={}` assertion forward, the new canon doc inherits a false claim. The migration must read the LIVE 16-entry state.
4. **The exit-code footgun** (§1 footnote): any fix-agent or CI that checks `$?` on a standalone proof script reads a
   false green. Trust only `gates.mjs --run full` siblings-absent.

---

## APPENDIX — commands run (all read-only)

- `node scripts/verify-siblings-intact.mjs --quiet` → exit 0 (before + after).
- `node scripts/proof-no-god-module.mjs` → FAIL (ladder 527, shell 510); `proof-no-dead-token` → FAIL (`--glass-blur-dock`);
  `proof-gen-ci-fresh` → DRIFT (660 vs 662, line 436); `proof:tag-parity` → 1 violation (category-card-warm local-only).
- `grep -rn '--glass-blur-dock'` + `var(--glass-blur-dock)` + `--glass-saturate-dock` + `--glass-blur-dock-radius` + `blur-dock`
  → the 3-deep orphan chain.
- @glass: 250 unique targets resolved (0 missing), 0 deep-relative survivors, 0 src leakage, 3-plane alias confirmed.
- `git log -S` on `gates.mjs` for `proof:glass-idiom-factor` → `6ec81deb`; for `category-card-warm` → `9e13965d`.
- `git show cd9ce46c -- scripts/proof-glass-cal.mjs` (peer-lock = new clause w/ teeth, radius-only scoping).
- RATCHET_BASELINES key count = 16; typecheck exit 0; package.json version 4.2.0, value `^1.0.0`, lucide-vue-next/vaul-vue absent.

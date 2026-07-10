# Build & gates (canon home)

## The build pipeline

```
npm run build              # library → dist/glass-ui.js + glass-ui.css + index.d.ts + per-subpath chunks
npm run typecheck          # vue-tsc --noEmit
npm run profile:budget     # bundle-budget gate; --enforce mode in CI
npm run verify-export-types # subpath dts publication probe
```

`build` runs two sequential arms — `vite build` emits the JS bundle + per-subpath chunks +
the `/styles` CSS, then `emit-types` (`vue-tsc --project tsconfig.build.json`) emits the flat
per-entry `.d.ts` set into `dist/` out-of-band. Declarations are NOT emitted by an in-Vite
plugin: `tsconfig.build.json` runs the repo-native `vue-tsc` in `emitDeclarationOnly` mode
against `src/`, decoupling the dts emit from any plugin-bundled TypeScript pin. CI and
`release.sh` invoke `npm run build` directly.

## Gate hygiene

- **`proof:ba-gestalt`** is the holistic per-surface acceptance gate (the P-1 close-class
  fix). A per-mechanism π verifies the LOCAL mechanism (a pixel ΔL) but cannot verify the
  GESTALT the user reads; the gate is a roster of named acceptance surfaces, each owed a
  whole-page capture in BOTH modes over its real backdrop + a recorded VERDICT — operative-
  PASS IFF every verdict is PASS AND every declared capture path RESOLVES ON DISK.
- **The live-gate fleet defaults `:5199`.** Every live-gate + profile default resolves the
  demo vite server `:5199` (the `?? "http://…:5199"` form; the env override preserved).
  `proof:gate-manifest-sound` clause 4 flags any non-:5199 port in a live-demo-URL default.
- **The close runs the FULL battery siblings-absent (BB.W-CLOSE-BATTERY).** The close/release
  path runs `gates.mjs --run full` — the DEDUPED union of the `local`, `ci`, and `release`
  tag sets — in a siblings-absent clean checkout BEFORE the irreversible tag, NOT `--run
  local` alone. `release.sh` + `release.yml` invoke `--run full`; `proof:full` is the entry.
- **SIBLING SAFETY — the foreign-tree fence (inv-26).** To reproduce the CI siblings-absent
  runner LOCALLY, use a FRESH throwaway glass-ui worktree in `/tmp` — the absence comes from
  the fresh checkout, NEVER from touching `~/Programming`. It is ABSOLUTELY FORBIDDEN for any
  process to `mv`/`rm`/move/delete ANY path under `~/Programming` except the glass-ui repo
  itself + `/tmp` worktrees. `scripts/verify-siblings-intact.mjs` is the standing tripwire.
- **The cardinal-ledger parser reads PROGRESS columns BY HEADER NAME.** `proof:live-verified-
  ledger` locates the `wave` + `status` columns by scanning the table header, not by position,
  so a tranche may order its columns freely.
- **The disposition register is the chronic-fold machine arm.** The register is re-evaluated in
  place each tranche (`reStampedAt` advanced), and `proof:disposition-live` REDs a stale
  re-stamped-without-decide pending — a pending must be DISCHARGED or re-homed to a current
  wave.

## The close-battery — the standing closeDisease sweep (BG.W-CLOSE-SWEEP)

The close disease is: **a wave greens its OWN gate while leaving a SHARED close
gate RED.** It re-mints with DIFFERENT artifacts every batch (12 reds at `ff0933a3`
→ a SYNTH cured all 12 → WS3/WS4 re-seeded 4 NEW, R1–R4 → subsequent live-fix commits
landed WITHOUT re-checking the close). A hand-picked red-list is STRUCTURALLY brittle
(the 12→4→? re-mint proves it), so the cure is a STANDING per-band sweep enrolling the
whole CLASS via a manifest flag, not the current instances.

- **`SWEEP_SET` is DERIVED, not a hand-list.** `SWEEP_SET = GATES.filter(g => g.closeDisease === true)` — a future close-disease gate is a member the moment it registers `closeDisease: true`, not when a human remembers a list. `SWEEP_SET_FAST` excludes the sole 112s close-only member (`gate-manifest-sound`, `closeDiseaseSlow: true`); the FAST arm is 7 sub-second gates the commit-hook can run.
- **`--run sweep` / `--run sweep-fast` is a spawn-ALL dispatch** (names EVERY red, NOT `runMode`'s fail-fast-at-the-first) delegating to `proof-close-sweep.mjs`'s `--sweep`/`--sweep-fast` mode — ONE sweep implementation, no fork. `gates:sweep-fast` is what the commit-hook + the per-wave discipline run; `gates:sweep` (the full 8, incl. the 112s `gate-manifest-sound`) is a HUMAN T2/close discipline command (no false "automated" claim — the per-member coverage in `--run full` runs each member individually; `gate-manifest-sound` also rides `proof:full`).
- **The dual-signal verdict.** A member is RED iff exit≠0 OR (a `.cache/gates/<cache>.json` exists AND its `status` ≠ "pass"). BOTH legs are empirically necessary: the EXIT leg catches `gen-ci-fresh` (writes NO JSON, signals only via `process.exit(1)`); the JSON leg catches a future exit-0-on-fail. Each member's artifact is UNLINKED before its spawn and read ONLY after — the DEFECT-A/B stale-JSON fix (the exact R6-PERSISTED staleness that false-reds `gate-manifest-sound`); absent JSON ⇒ exit-leg-only + a `jsonMissing` note, never a silent single-signal degrade.
- **The completeness floor is honest half-structural.** 5 tight `BOOKKEEPING_SIGNATURES` (executed reads of shared registration/cascade bookkeeping — the gate manifest `gates.mjs` import · the CI/release workflow render · the god-module `RATCHET_BASELINES` line budget · the token dead-set `KEEP_ALLOWLIST` · the public export-surface↔story loop) net the class. Every gate matching ≥1 signature MUST carry an EXPLICIT `closeDisease` decision — `true` (member) or `false` + `closeDiseaseReason` (opt-out) — a signature-match with the field UNSET reds (the forgot-the-flag catch, the visible hand-audit). The residual — a bookkeeping gate matching NONE of the 5 — is SURFACED as a `completenessResidual` fact, never silently claimed complete: this is a HAND-AUDITED registry MADE VISIBLE (CRIT-1 resolve-(b)), the value is the inverse-bite + the self-test, not elimination of the hand-list.
- **The manifest row fields** (additive, schema-safe — the `note:` optional-field precedent): `closeDisease` (bool decision) · `closeDiseaseReason` (opt-out rationale) · `closeDiseaseArtifact` (cacheName, JSON-writer members) · `closeDiseaseArtifactEnv` (the paired env, incl. `tag-parity`'s odd `GATE_TAG_PARITY_OUT` with no `GLASS_UI_` prefix) · `closeDiseaseSlow` (the 112s member excluded from FAST). C5 PATH-MATCHes each member's declared `(env, cache)` against its source's actual `gateArtifactPath()` call (a rename/carve drift reds).
- **`proof:close-sweep` is the THIRD born-RED-by-design gate** beside `proof:ba-gestalt` + `proof:ship-attestation` — DO NOT "fix" it mid-tranche. It is `["local"]` (a `ci` tag would re-seed R3 — a ci-tagged gate needs ci.yml re-emission, a circular re-seed) and rides `--run full` (local ∈ the union). Its born-RED anchor is the FAST sweep run (any member RED reds the gate); it GREENs at the close when R1–R4 clear AND the gates.mjs dispatch/flags + this canon + the commit-hook arm all land. HARD ordering: land AT-OR-AFTER `BG.W-CLOSEFIX-9SITE` clears R1–R4 (else `--run full` carries a new red). The 9-bite hermetic `--selftest` (synthetic fixtures, manifest-independent) proves the mechanism even while the live run is born-RED.
- **The commit-hook** (`.githooks/commit-msg`) runs `gates:sweep-fast` under the SAME `GLASS_UI_ACTIVE_TRANCHE` env-gate as the BH.B0 live-verified-ledger arm — env-gated, NOT hot-file-fires (the env IS set during execution by the commit-per-wave cadence; a hot-file-fires hook would block the integrator's own P-CLOSE carves while R1–R4 are dirty). The sweep arm APPENDS to the B0 hook; both arms survive (C4 asserts it).

The canon home is PARENT-TRACKED here (NOT the `docs/precepts` submodule): a fresh `/tmp` siblings-absent worktree does not recurse submodules, so a submodule home would be ABSENT and `proof:close-sweep`'s C3 would red at the exact close it locks. SHARED with the CLAUDE-delete canon home — APPEND, do not clobber.

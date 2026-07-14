# BI.W-MS4-FLATTEN-MOVE — the terminal atomic flatten + the d.ts generator flip

Band B9 MOVE-STAGE, wave MS4. Realizes ADDENDA §2 `BI.W-S-FLATTEN-MOVE` 1:1. **AMENDED (P3T2)** — the
codemod scope is now explicitly enumerated. Device-free (`H`), paint-neutral (zero pixels —
STRUCT-RESEQUENCE §π).

## §Provenance

- STRUCTURE-ADDENDA §2 MOVE-STAGE `MS4 · BI.W-S-FLATTEN-MOVE` (PD-4: the atomic move + the mandatory
  MOVER→GENERATOR flip; M1: the ui/custom split is DEAD).
- Pass-3 convergence: registry-v3 §4.A (the MS4 enumeration amendment — the ONE medium execution
  precondition) + §4.B (line-refs + the `85 → 82` key baseline) + §1 (P3T2 FAILED its manifest-
  completeness lens by surfacing this gap; fail-loud-backstopped by MS4's own vite-build + vue-tsc + gate
  acceptance — not a silent strand, not open design). Born-carried into this wave-file per the mint.

## §Scope

The terminal atomic flatten `components/{ui,custom}/<name>/ → components/<name>/` over the ~79-family
set (dropSegment, elide both sides for moves), plus the d.ts generator flip:
- Flatten the entry-map SOURCE FIRST — `subpath-policy.mjs` TIERS relBase + CURATED/name≠leaf:
  `components/ui|custom → components`. **Line-refs @f89e3a9d: `libraryEntryMap`:280, `CURATED`:135**
  (were :273 / :129-150 — re-locate by symbol, line numbers drift).
- **Flip `flatten-subpath-types.mjs` MOVER→GENERATOR** (~35 LOC; `probes/dts/generate-flat-dts.mjs`) so
  one `libraryEntryMap()` feeds vite JS + d.ts.
- name≠leaf bare-file targets: `blob-config → components/blob/config`,
  `fourier-math → components/fourier-field/math`.
- `tsconfig.build.json` NO change (rootDir:src covers flat dirs — PD-4 Part B).
- REJECT F2 root-hoist (dist self-references at the dist layer — PD-4).
- composables do NOT flatten into shared/ (PD-2 keeps `composables/`); `./color` etc. source stays
  `composables/<x>` — the generator's `emittedRel` is byte-identical regardless.

Reads the POST-B8-prune tree (glass-panel / hover-popover / selectable-chip / toggle-chip / multi-select
already `D`; pill via AD4; scrolling-text via SPEEDTEST-ONLY-PAIR). MOVES survivors only — never
double-owns a B8 delete.

## §Repair manifest

Each MOVE carries its class-① dropSegment slice. **★AMENDMENT (P3T2 MS4 enumeration)** — beyond the
generic dropSegment slice, the codemod MUST explicitly enumerate:

1. **The 62 `src/subpaths/*` mirror-barrel internal repoints** — each mirror barrel's
   `../components/ui|custom/<name>` import. They are LIVE vite entries via `libraryEntries()` until MS6,
   so the flatten breaks them AT MS4 (not MS6). Repoint all 62 to the flat `../components/<name>`.
2. **The 4 `_shared` gate paths + 1 variant-residual** that hardcode `resolve(SRC, "components/ui/
   _shared/*")` → `components/_shared/*`:
   - `proof-encapsulation` AXES (`:644`),
   - `proof-encapsulation` SURFACE_AXIS (`:645`),
   - `proof-encapsulation` CONTROL_SIZE (`:1076`),
   - `proof-encapsulation` MOTION_AXIS_LEAF (`:1276`),
   - `proof-variant-residual` (`:45`).
   Line numbers are @f89e3a9d references and DRIFT — re-locate by symbol at codemod time.

**MANDATORY generator guard:** `flatten-subpath-types.mjs:29-33 if(!existsSync(dist/subpaths)) exit 0` —
if the flip is forgotten this guard silently emits ZERO flat d.ts (every `./<name>` `types` 404s, no
build error). The flip is not optional.

## §Acceptance

Durable invariants:
- EXACT_REPRODUCTION — exports + typesVersions unchanged, **baseline 82 keys** (was 85).
- flat `dist/<name>.d.ts` emits per entry (the GENERATOR flip is REAL); `dist/components/**` +
  `dist/composables/**` + `dist/shared/**` covered by the existing `dist/**` glob.
- vue-tsc + consumer-typecheck exit 0.
- `proof:no-tier-literal` green.
- NOTE: `dist/subpaths/*.js` legitimately PERSISTS through MS4 — the vite `libraryEntries` swap is MS6.
  "No `dist/subpaths/`" is NOT an MS4 assertion.

## §Edges

- `← W-WORKTREE-GC completion` (MS0, user-gated) — the on-disk worktree lanes pin pre-move `ui/custom`
  paths this flatten orphans (PD-8 HIT-6), so GC MUST complete first.
- MS1, MS2, MS3.
- QUIESCE-TREE.

## §π

None (device-free, zero pixels — STRUCT-RESEQUENCE §π).

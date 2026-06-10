# AZ.W-GATES — the gate-manifest repair: the malformed-row crash + the parity blind-spot + the live-gate route/port sweep + the content-hash freshness model + the W-DELTA0 re-captures

**Track** AZ · Band Z (hygiene + close) · **Type** infra-repair (mutates `scripts/gates.mjs`, two parity gates, the shader-split blob gates, the freshness reader, ≤7 live-gate scripts, the dock-orchestrator route, the AZ DELTA docs) · **Depends on** nothing — runs FIRST in the DAG (Batch 0), because `proof:all` is crashable at HEAD and no other wave's `proof:all` can green until this lands · **Blocks** every wave that runs `proof:all` locally · **Status** SPEC

> bbnf wave spec. TRANCHE-DEVELOPMENT artefact — this file is the deliverable; NO implementation
> until the user's greenlight (AZ invariant 2). The implementer authors the §3 file-bound edits +
> the born-RED hard gate; the orchestrator owns the index (the hardened agent git clause — agents
> NEVER stage/commit/stash/checkout/reset/restore). The gate is a SPECIFICATION here, not a `.mjs`.

---

## §0 — RE-GROUND (mandatory step-0; re-grep every cite at HEAD before editing)

This wave is grounded in the fleet's **B5-gates-health** lane (`audit/FLEET-DIGEST.md:407-422`,
evidence `audit/ground/B5-gates-health-evidence.md`) and **F3-completeness** (`FLEET-DIGEST.md:888-899`,
the F3-M4 live-gate sweep row). Re-opened ≠ rebuilt-blind (AZ invariant 3): the mechanisms below
are the fleet's root-causes — re-grep each, do not re-diagnose from scratch.

Step-0 re-grep checklist (run before the first edit; a cite that no longer matches is a
scope-reveal trigger — halt and re-ground):

1. `sed -n '688,692p' scripts/gates.mjs` — the malformed row `{ tags: ["local"] }` (no `id`, no
   `cmd`) MUST still sit between `proof:carousel-glass-atoms` (ends ~688) and `proof:squircle-language`
   (~692). If it is already deleted, B5-1 discharged — skip clause A.
2. `grep -n 'cmd:\s*"' scripts/proof-gate-script-parity.mjs` — line 188 parses `cmd:"…"` literals
   (the blind spot: a cmd-LESS row is never matched).
3. `grep -n 'scriptFor' scripts/proof-tag-parity.mjs` — line 147-148 `scriptFor(g, pkg)` falsy →
   `continue` (the second blind spot).
4. `grep -rn 'GLASS_UI_DEMO_URL' scripts/*.mjs tests-visual/playwright.config.ts` — the 7 `:5173`
   defaults (B5-3 enumerated below) + the config root cause at `playwright.config.ts:22`.
5. `grep -n 'navigation/dock-layers' scripts/proof-dock-orchestrator-single.mjs scripts/gates.mjs`
   — the dead route at `proof-dock-orchestrator-single.mjs:51,490` + the NOTE at `gates.mjs:665`.
6. `grep -n 'TRAIL_N\|uTrailPos\|uTrailCount' src/components/custom/goo-blob/shaders/*.ts
   scripts/proof-blob-interaction-prm.mjs` — confirm the uniform DECLARATIONS relocated to
   `metaball-uniforms.glsl.ts:92-95` while the loop BODY stayed in `metaball.frag.ts:161-163`, and
   the gate (`:134-138`) reads only `metaball.frag.ts`.
7. `head -8 docs/tranches/AY/audit/visual/W-DOCK1-DELTA.md` (+ W-DOCK2, W-CON1) — confirm
   `capture-commit: 83e1e3b2` is still the frozen SHA + the `superseded-by` markers.
8. `git log -1 --format=%H -- src/styles/dock/layers.css src/styles/dock/shell.css
   src/components/custom/dock/composables/dockMorphContext.ts` — the dock surface last-touch (B5-4
   measured `a8cfd644`, after `83e1e3b2`, so `merge-base --is-ancestor a8cfd644 83e1e3b2` is FALSE
   ⇒ STALE on the git-ancestry model — the treadmill the content-hash model retires).

---

## §1 — Goal criterion + completion criterion (paired)

**Goal criterion.** The gate manifest is structurally sound and self-defending: `proof:all` no longer
crashes on a malformed row; the two parity meta-gates can no longer be blind to a row missing `id`
or `cmd`; no live gate defaults to a foreign-app port; no gate navigates a dead route; the blob
shader-split gates read the relocated uniforms; the freshness model is decoupled from commit-churn
(a content hash of the declared surface bytes, not git-ancestry of a frozen SHA) so an unrelated
commit stops re-staling every dock DELTA; the W-DELTA0 own-wave-id re-captures are paid under AZ
wave-ids on a quiet server.

**Completion criterion.** A single born-RED hard gate, `proof:gate-manifest-sound` (§4), exits
NON-ZERO at this wave's open (the malformed row present ⇒ the parity-hardening clause reds; the
content-hash freshness model unimplemented ⇒ that clause reds) and exits ZERO only when ALL of:
the malformed row is gone AND both parity gates flag any future cmd-less/id-less row; `proof:all`
(`gates.mjs --run local`) runs to completion green; the 7 live-gate scripts + `playwright.config.ts`
default `:5199`; `proof:dock-orchestrator-single` reaches `/dock/layers`; `proof:blob-interaction-prm`
+ `proof:blob-tempo-suppression` are gate rows that read the relocated uniforms; the freshness
reader hashes declared surface bytes; the 3 AZ DELTA docs carry a fresh `surface-hash` header and a
re-shot capture on the AZ tree. Born-RED is the correct open signal; the gate greens only at the
discharged terminal state.

---

## §2 — The verified defects (file:line — quoted from B5/F3, re-grep at HEAD per §0)

### D1 (HEADLINE — `proof:all` CRASHES) — the malformed gate row. [B5-1, S2]

`scripts/gates.mjs:689-691` is `{ tags: ["local"] }` with NO `id` and NO `cmd`. `gatesFor("local")`
INCLUDES it (index 107 of 142). `runMode("local")` (`gates.mjs:913-932`) reaches it and runs
`execSync("npm run " + g.cmd)` with `g.cmd === undefined` → `npm run undefined` → `npm error Missing
script: "undefined"` → exit 1 → the `catch` fires → `[gates] FAIL at 'undefined'` → `process.exit(1)`.
So the LOCAL `proof:all` aggregate DIES at this row. `ci`/`release` are unaffected (`tags=["local"]`
only). **GREEN after:** the row is deleted AND clause B (below) makes the parity gates fail on any
future id-less/cmd-less manifest row, so this class can never silently recur.

### D2 (the parity meta-gates are BLIND to a cmd-less row) — the blind spot. [B5-1, S2]

`proof:gate-script-parity.mjs:188` regex-parses `cmd:\s*"([^"]+)"` literals — a row with no `cmd`
key produces no match, so it reports "0 ghost cmds" while the malformed row sits in the set.
`proof:tag-parity.mjs:147-148` calls `scriptFor(g, pkg)`; on a row with no `id`/`cmd` it returns
falsy → `continue`, so the malformed row is skipped there too. NEITHER parity gate catches a row
missing `id` or `cmd`. **GREEN after:** both gates gain a STRUCTURAL pre-pass that asserts every
`gatesFor("*")` row carries a non-empty `id` AND a non-empty `cmd` (a `{ id, cmd }`-shape assertion
over the manifest array, BEFORE the cmd-literal parse) — born-RED on a synthetic cmd-less fixture
row, GREEN on the repaired manifest.

### D3 (7 live-gate scripts default to a FOREIGN port) — the `:5173`→`:5199` sweep. [B5-3, F3-M4, S3]

Seven `proof-*.mjs` default `GLASS_UI_DEMO_URL` to `:5173` (the foreign-app port; the AY convention
is `:5199`). Enumerated (re-grep per §0.4):
`proof-dock-animation-live.mjs:598` (ci row) · `proof-nested-backdrop-budget.mjs:22` (ci row) ·
`proof-touch-target.mjs:24` (ci row) · `proof-dock-orchestrator-single.mjs:425` (local row) ·
`proof-tabs-unified.mjs:293` (local row) · `proof-demo-dock-nav-runtime.mjs:176` (helper, not a
gate row) · `proof-dock-items-lag-capture.mjs:424` (helper, not a gate row). The config root cause
is `tests-visual/playwright.config.ts:22` (`DEMO_PORT ?? 5173`). Already correct on `:5199`:
`proof-dock-wrap-content-driven.mjs:396`, `proof-squircle-language.mjs:395`. Harmless in CI (the
CI-tagged ones grace-SKIP via the playwright-presence probe before reaching the URL); the bite is
LOCAL — a dev on `:5199` who forgets the env override hits the foreign app on `:5173` → false RED /
mis-captured surface. AZ scope fence: `:5173` is never a default anywhere after this wave
(`AZ.md` scope fence). **GREEN after:** all 7 scripts + the config default `:5199`; a grep-clause
asserts ZERO `5173` literals remain in the live-gate script set + the config.

### D4 (a gate navigates a DEAD route) — the dock-orchestrator route re-point. [B5-2, S2]

`proof-dock-orchestrator-single.mjs:51` sets `DOCK_ROUTE = "/navigation/dock-layers"`, which does
NOT exist. The demo router builds `/<category>/<story>` (`demo/router.ts:6-8`); the dock category
produces `/dock/{overview,layers,rail}` (`demo/stories/manifest.ts:237-239`) and the `navigation`
category carries only tabs+carousel (`manifest.ts:222-227`). The π-runtime arm fails to reach a
dock → "could not reach the demo dock-layers route" (`:490`). The gate NOTE at `gates.mjs:665` also
names the dead `/navigation/dock-layers nested showcase`. R3 (constraint line 47) BOOKED this
re-point → `/dock/layers`. **GREEN after:** `proof-dock-orchestrator-single.mjs:51` reads
`/dock/layers`; the NOTE at `gates.mjs:665` is corrected; the local run reaches a real dock.

### D5 (two blob gates are dangling-by-disuse + read a stale shader path) — the shader-split re-point. [B5-5, F3-M4, S3]

`proof:blob-interaction-prm` + `proof:blob-tempo-suppression` have `package.json` keys (`:605,607`)
and their `.mjs` files exist, but NEITHER is a `gates.mjs` gate row, NOR in `KNOWN_ORPHANS`, NOR
referenced elsewhere — they run in NO aggregate (the parity gate's file↔key bijection cannot see a
key↔gate-row usage gap). SEPARATELY, the shader split landed: `proof-blob-interaction-prm.mjs:134-138`
expects `#define TRAIL_N`, `uniform vec2 uTrailPos[TRAIL_N]`, and the `for (int i = 0; i < TRAIL_N;
…)` loop — but the uniform DECLARATIONS relocated to `metaball-uniforms.glsl.ts:92-95` while only
the loop BODY stayed in `metaball.frag.ts:161-163`. The gate reads ONLY `metaball.frag.ts` (`:47,79`),
so the TRAIL_N-define + uTrailPos-uniform asserts now match the WRONG file (they would RED on the
split tree). NOTE — `proof:blob-tempo-suppression` reads the RENDERER
(`composables/useMetaballRenderer.ts:43,70`), NOT the frag, so it is NOT itself a shader-split
victim; its only defect is the dangling-by-disuse (no gate row). The third stale text:
`proof-blob-interaction-prm.mjs:213` still says "blob-interaction.vue is absent" though `:54`
correctly points at the consolidated `demo/stories/substrates/blob.vue`. **GREEN after:** both
scripts become real gate rows (tagged `local`, the blob render arms are demo-live); the interaction
gate reads BOTH `metaball.frag.ts` (the loop) AND `metaball-uniforms.glsl.ts` (the TRAIL_N define +
uTrailPos uniform) via a small `readBlobShaders()` concat helper, mirroring the `read-dock-css.mjs`
authority-reader precedent; the `:213` stale message is corrected to the consolidated path.

### D6 (the freshness model is a TREADMILL) — content-hash over git-ancestry. [B5-4, S3 → DESIGN]

`freshnessVerdict()` (`proof-live-verified-ledger.mjs:203-250`) compares a FROZEN `capture-commit`
SHA against the surface's MOVING last-touch via `git merge-base --is-ancestor`. The capture-commit
never advances on its own, so EVERY new commit touching any declared surface-path re-stales the
DELTA. VERIFIED STALE NOW (B5-4): the 3 graced NOTEs (W-DOCK1/W-CON1/W-DOCK2) declare
`capture-commit: 83e1e3b2`; the dock surface last-touched at `a8cfd644` (the AY close, after
`83e1e3b2`) ⇒ `merge-base --is-ancestor a8cfd644 83e1e3b2` is FALSE ⇒ STALE ⇒ the `superseded-by`
grace branch (`:395-404`) is the only thing keeping it from a hard RED. The escapes are all manual
treadmill steps (re-capture+bump the SHA, or stack `superseded-by` markers). This is AZ invariant 4
("the freshness model migrates off the treadmill"). **GREEN after:** the model is the content-hash
below (§2a) — fresh IFF the declared surface bytes are byte-identical to capture time, regardless of
how many unrelated commits touched the file.

### §2a — The content-hash freshness model (the full PROPOSAL — spec it, the implementer builds it)

The defect: freshness binds to git ANCESTRY of a frozen commit, so it tracks commit-churn, not
pixels. The fix binds freshness to the CONTENT of the declared surface files at capture time.

**The header.** A DELTA doc declares, alongside (or replacing) `capture-commit`, a new header:

```
<!-- surface-paths: <comma-separated repo-relative paths> -->
<!-- surface-hash: <sha256 hex of the concatenated surface-paths' bytes AT capture time> -->
```

The `surface-hash` is computed ONCE at capture time over the SAME `surface-paths` the doc already
declares: read each path's bytes in the declared order, concatenate with a single `\n` separator
(the `read-dock-css.mjs` join idiom), `sha256` the buffer, write the hex. This is a pure function
of the files' content — no git involved.

**The verdict (replacing `freshnessVerdict`'s git-ancestry arm).** `freshnessVerdict(doc, root)`:

1. Parse `surface-paths` + `surface-hash`. If either is absent → state `"no-header"` (the existing
   backfill-window grace boundary — RED under `--strict-freshness`, a non-fatal NOTE on the bare
   arm). This preserves the current grace semantics exactly.
2. Recompute the hash of the CURRENT `surface-paths` bytes (the same concat+sha256).
3. `current === declared` ⇒ state `"fresh"`. The RELEVANT pixels are byte-identical to capture time;
   a no-op formatting commit elsewhere, or an unrelated edit to a different file, NO LONGER re-stales
   the capture.
4. `current !== declared` ⇒ state `"stale"` with reason `"surface <paths> changed since capture
   (hash <declared-12> → <current-12>) — re-capture"`. A REAL content change to a declared surface
   re-stales (correct), and the re-capture refreshes BOTH the stills AND the `surface-hash`.

**Migration (clean break, no dual model).** The `capture-commit` + `git merge-base` machinery
(`:204-250`) is REMOVED — replaced, not aliased (AZ invariant 5, no-legacy). The `superseded-by`
grace branch (`:385-409`) is RE-EXAMINED: with the content-hash model, a `superseded-by` marker on
a DELTA whose surface is byte-identical to capture is `"fresh"` (no grace needed); a `superseded-by`
on a CHANGED surface is `"stale"` (the marker no longer hides a real drift). So the 3 graced NOTEs
either go `"fresh"` (if W-DELTA0's re-capture re-points their hash to the current bytes — §2b) or
the superseded successor wave re-captures under its own id. The treadmill is gone: the hash advances
only when the content advances.

**A tighter variant (NOT this wave's scope).** A future refinement scopes the hash to a
function/selector RANGE rather than the whole file (so an unrelated edit ELSEWHERE in the same file
does not re-stale). File-level is the cheap correct first step (B5-4); the range variant is a named
successor (`AZ.W-CLOSE` records it as a BOOK if it does not land here).

### §2b — The W-DELTA0 own-wave-id re-captures (R3 constraint line 49). [F3-M10, S3]

The 3 freshness NOTEs (W-DOCK1/W-CON1/W-DOCK2 DELTA docs under `docs/tranches/AY/audit/visual/`)
ride the treadmill AND carry `superseded-by` markers pointing at AZ successor waves (W-DOCK-NAV,
W-SB-REVERIFY — names from the AY era; the AZ roster renames them, see §6). The R3 constraint
mandates own-wave-id re-captures: the stills are re-shot fresh on the AZ tree under the AZ
successor wave-id, and the new `surface-hash` header (§2a) is stamped at that capture. This pays the
chronic "live-verified without a fresh captured DELTA" inflation (MEMORY: live-verify capture). The
re-capture target paths:
- `W-DOCK1` (dock items-lag) → re-shot via `npm run proof:dock-items-lag-capture` against
  `/dock/overview` on `:5199`; surface-paths `dock/layers.css, dock/shell.css, dockMorphContext.ts`.
- `W-DOCK2` (entering-child lockstep + rail cohesion) → re-shot via the dock2 capture path;
  surface-paths `dock/layers.css, dock/shell.css, dock/morph.css, DockLayerGroup.vue`.
- `W-CON1` (constellation resize re-fit) → re-shot; surface-paths `constellation*`.

These re-captures land under the AZ DELTA wave-id (the band-D / band-S waves that own these surfaces
in AZ — the orchestrator threads the exact successor id at execution). W-GATES OWNS the freshness
MACHINE (§2a) + the R6 re-persist (§2c); the actual re-shoots are the owning AZ visual wave's DELTA
unless they are unowned, in which case W-GATES re-shoots them as the freshness-machine's own
self-proving capture. The §4 gate asserts the 3 DELTA docs carry a `surface-hash` header that
recomputes FRESH against the current bytes.

### §2c (the R6 dock-animation-live re-persist on a quiet server). [B5/A1 line 49]

`proof:dock-animation-live` correctly targets `/dock/overview` + `data-testid=dock-capture` (both
present, `demo/stories/dock/overview.vue:305`); B5-6 verified it healthy. The R3 constraint carries
a re-persist of its R6 PASS artefact on a quiet server (no concurrent demo traffic skewing the frame
series). This is a re-run, not an edit — the `.cache/gates/*.json` PASS artefact is re-persisted on
a quiet `:5199`. The §4 gate clause reads the persisted PASS.

---

## §3 — File bounds (edit-sites)

| File | Edit |
|---|---|
| `scripts/gates.mjs:689-691` | DELETE the malformed `{ tags: ["local"] }` row (D1). |
| `scripts/gates.mjs:665` | Correct the `proof:dock-orchestrator-single` NOTE: `/navigation/dock-layers nested showcase` → `/dock/layers nested showcase` (D4). |
| `scripts/gates.mjs` (GATES array) | ADD two gate rows: `proof:blob-interaction-prm` + `proof:blob-tempo-suppression`, `tags:["local"]` (the blob render arms are demo-live; not CI). Each carries a NOTE per the house format (D5). |
| `scripts/proof-gate-script-parity.mjs` | ADD a STRUCTURAL pre-pass over `gatesFor("local"|"ci"|"release")`: assert every row has a non-empty `id` AND `cmd` (BEFORE the `cmd:"…"` literal parse at `:188`). A row missing either is a violation `"manifest row N has no id/cmd"`. Self-test against a synthetic cmd-less fixture (D2). |
| `scripts/proof-tag-parity.mjs:145-148` | ADD the same id/cmd presence assertion BEFORE the `scriptFor()` `continue` — a cmd-less/id-less row is a violation, not a silent skip (D2). |
| `scripts/proof-dock-animation-live.mjs:598`, `proof-nested-backdrop-budget.mjs:22`, `proof-touch-target.mjs:24`, `proof-dock-orchestrator-single.mjs:425`, `proof-tabs-unified.mjs:293`, `proof-demo-dock-nav-runtime.mjs:176`, `proof-dock-items-lag-capture.mjs:424` | `?? "http://localhost:5173"` → `?? "http://localhost:5199"` (D3). |
| `tests-visual/playwright.config.ts:22` | `DEMO_PORT ?? 5173` → `DEMO_PORT ?? 5199` (D3 root cause). |
| `scripts/proof-dock-orchestrator-single.mjs:51` | `DOCK_ROUTE = "/navigation/dock-layers"` → `"/dock/layers"` (D4). |
| `scripts/proof-blob-interaction-prm.mjs:47,134-138,213` | Read BOTH `metaball.frag.ts` AND `metaball-uniforms.glsl.ts` (a `readBlobShaders()` concat helper, the `read-dock-css.mjs` precedent): the TRAIL_N define + uTrailPos uniform asserts run over the concat; the loop assert runs over the frag. Correct the `:213` message: `"blob-interaction.vue is absent"` → `"demo/stories/substrates/blob.vue is absent"` (D5). |
| `scripts/read-blob-shaders.mjs` (**NEW**, optional) | The blob-shader authority reader — concat `metaball.frag.ts` + `metaball-uniforms.glsl.ts` + the other `goo-blob/shaders/*.glsl.ts` in source order, mirroring `read-dock-css.mjs`. Consumed by `proof-blob-interaction-prm.mjs` (and any future blob gate that scans the split). |
| `scripts/proof-live-verified-ledger.mjs:203-250,385-409` | REPLACE `freshnessVerdict`'s git-ancestry arm with the content-hash model (§2a): parse `surface-hash`, recompute over `surface-paths` bytes, fresh IFF byte-identical. REMOVE the `capture-commit` + `git merge-base` machinery (clean break). Re-examine the `superseded-by` branch under the new model. |
| `docs/tranches/AY/audit/visual/W-DOCK1-DELTA.md`, `W-DOCK2-DELTA.md`, `W-CON1-DELTA.md` | ADD the `surface-hash` header at the re-capture; re-shoot the stills on the AZ tree under the AZ successor wave-id (§2b). The own-surface re-captures pay the freshness debt. |
| `scripts/proof-gate-manifest-sound.mjs` (**NEW**) | The born-RED meta-gate of §4. |
| `package.json` | ADD `"proof:gate-manifest-sound": "node scripts/proof-gate-manifest-sound.mjs"`; tag it `local` in the `gates.mjs` manifest. |

---

## §4 — `proof:gate-manifest-sound` — the gate definition (born-RED → GREEN)

A meta-gate in the `proof-*.mjs` house shape (lazy-memoized `cliPaths()`, a pure `detectSound(inputs)`
returning `{facts, violations}`, `violations.length === 0 ⇒ pass`, a byte-stable JSON artefact via
`writeGateArtifact`, a human summary, `process.exit(1)` on any violation, the
`import.meta.url === pathToFileURL(process.argv[1]).href` run-guard). Clauses (each
artefact-verifiable, no grep-only-on-a-comment):

1. **MANIFEST-WELL-FORMED.** Every row in `gatesFor("local")` ∪ `gatesFor("ci")` ∪
   `gatesFor("release")` carries a non-empty `id` AND a non-empty `cmd`. Bite: re-add a
   `{ tags:[…] }` row with no id/cmd → RED. (This is the D1/D2 fix asserted machine-side; it
   subsumes the malformed-row crash because a malformed row can no longer exist in the manifest.)
2. **PARITY-HARDENED.** A subprocess `npm run proof:gate-script-parity` exits 0 AND `npm run
   proof:tag-parity` exits 0, AND a self-test injects a synthetic cmd-less row into a manifest
   FIXTURE and asserts BOTH parity detectors now FLAG it (the blind-spot is closed). Bite: revert
   either parity gate's structural pre-pass → the fixture passes silently → RED.
3. **PROOF-ALL-RUNS.** A subprocess `node scripts/gates.mjs --run local` exits 0 (the local
   aggregate completes — the crash is gone). Bite: any malformed row crashes the run → RED. (This
   is the load-bearing end-to-end check: it actually RUNS `proof:all`.)
4. **NO-5173.** A grep over the live-gate script set (the 7 of D3) + `tests-visual/playwright.config.ts`
   finds ZERO `5173` literals; every `GLASS_UI_DEMO_URL`/`DEMO_PORT` default resolves `5199`. Bite:
   a surviving `:5173` default → RED. (Enforces the AZ scope fence.)
5. **DOCK-ROUTE-LIVE.** `proof-dock-orchestrator-single.mjs` carries `DOCK_ROUTE = "/dock/layers"`
   (a real route, asserted against `demo/stories/manifest.ts` producing `/dock/layers`) AND the
   `gates.mjs:665` NOTE no longer contains `/navigation/dock-layers`. Bite: the dead route survives
   → RED.
6. **BLOB-GATES-WIRED.** `proof:blob-interaction-prm` + `proof:blob-tempo-suppression` are BOTH
   `gates.mjs` rows (present in `gatesFor("local")`) AND `proof-blob-interaction-prm.mjs` reads
   `metaball-uniforms.glsl.ts` (the TRAIL_N define + uTrailPos uniform resolve there) AND the
   `:213` message names `blob.vue` not the retired `blob-interaction.vue`. Bite: either gate
   dangling, or the interaction gate reads only the frag → RED.
7. **FRESHNESS-CONTENT-HASH.** `proof-live-verified-ledger.mjs` carries the `surface-hash` parse +
   recompute path AND no longer carries the `git merge-base --is-ancestor` freshness arm (asserted
   by absence — the clean break). The 3 AZ DELTA docs (W-DOCK1/W-DOCK2/W-CON1, at their AZ
   successor wave-ids) each carry a `surface-hash` header that recomputes FRESH against the current
   surface bytes. Bite: the git-ancestry arm survives → RED; a DELTA's `surface-hash` recomputes
   stale (the surface drifted post-capture without a re-shoot) → RED.
8. **R6-PERSISTED.** `.cache/gates/AW-dock-animation-live.json` (or the canonical artefact id)
   reads `status:"pass"` from a quiet-server run (§2c). Bite: the artefact absent or `fail` → RED.

Plus the clean-tree allowlist guard (the `proof-au-final.mjs` idiom): `git status --porcelain`
carries only the documented USER-DOMAIN dirt (the `docs/precepts` submodule pointer); any other
dirty tracked entry means a gate mutated source (inv-θ) → RED.

**Born-RED at open:** the malformed row exists (clause 1 reds) AND the content-hash model is
unimplemented (clause 7 reds) — the gate is RED at this wave's open and greens only at the
discharged terminal state.

---

## §5 — HARD GATE (evidence-backed)

**`proof:gate-manifest-sound` is AUTHORED, born-RED at this wave's open, and driven GREEN aggregating
all 8 clauses of §4.** The evidence is the gate-artefact pair: the RED
`.cache/gates/AZ-gate-manifest-sound.json` (`status:fail`, clause-1 + clause-7 violations) at open,
and the GREEN one at close. Verification commands the close ceremony runs:

```
npm run proof:gate-manifest-sound        # RED at open, GREEN at close
node scripts/gates.mjs --run local       # the end-to-end: proof:all completes (clause 3)
npm run proof:gate-script-parity         # parity hardened (clause 2)
npm run proof:tag-parity                 # parity hardened (clause 2)
npm run proof:blob-interaction-prm       # now a gate row, reads the split (clause 6)
npm run proof:dock-orchestrator-single   # reaches /dock/layers (clause 5)
npm run proof:live-verified-ledger:ay    # content-hash freshness (clause 7)
```

---

## §6 — Out of scope (named successors, not silently dropped)

- **The function/selector-RANGE freshness variant** (§2a tighter variant) — file-level is this
  wave's scope; the range scope is a named successor (W-CLOSE records it as a BOOK if unbuilt).
- **The AZ DELTA wave-id RENAMES** — `superseded-by: W-DOCK-NAV` / `W-SB-REVERIFY` are AY-era names;
  the AZ roster's owning visual waves (band D / band S) carry the actual successor ids. W-GATES owns
  the freshness MACHINE + the re-shoot if the surface is unowned; the owning wave owns the DELTA
  otherwise. The orchestrator threads the exact id at execution.
- **The blob render itself** — the GL renderer is refuted-crisp (AZ scope fence); W-GATES only wires
  the blob GATES, it does not touch `metaball.frag.ts` content.
- **The full `:5173` config consolidation** beyond the live-gate set — `playwright.config.ts:22` is
  the root cause this wave fixes; any other `5173` reference in non-gate tooling is a follow-up only
  if it surfaces (none found in the B5 inventory).

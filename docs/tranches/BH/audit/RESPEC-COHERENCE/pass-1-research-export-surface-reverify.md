# BH Coherence PASS 1 — Research lens: EXPORT-SURFACE CLEAN-BREAK RE-VERIFICATION

**Date:** 2026-06-30 · **Branch:** `tranche/BG` · **HEAD:** `e550f1b0` (BG coherence audit fully folded).
**Lens:** Re-derive BH PLAN §2-#2 / §7's export-break count against the CURRENT `src/` (post BG's landed waves +
the AMENDED BG state). Verify "exactly ONE dropped key (`./api`) + 3 orphan re-homes; 200 of 203 /api symbols are
pure import-path swaps."

**Verdict:** the **`200 of 203` figure is STILL ACCURATE at HEAD** — re-derived from live disk, gate-GREEN with
`EXACT_REPRODUCTION=true`. BG's WS5/WS8 work has NOT landed and (per the amended BG) does **not** touch the `/api`
203-symbol set. **ONE coherence DRIFT found:** the BH PLAN's standing constant **"WS6's +2 siri subpaths"
(PLAN.md L68 + L116) contradicts the amended BG**, which made `siri-waveform` INTERNAL (no subpath) → the real
WS6 delta is **+1 published subpath (`/siri-island`) and an additive `/api` bump** (siri-island lands symbols into
`api/index.ts`), pushing the post-WS6 `/api` count **above 203**. This is captured-as-residual by PLAN §5-#1 but the
"+2 siri" literal is stale and should be corrected to "+1 siri subpath" in BOTH L68 and L116.

---

## 1. METHOD + the critical disk-state fact

### 1a. No export-surface src change since the BG audit anchor

`git diff --stat 4c761b64..e550f1b0 -- src/ package.json vite.library.ts vite.config.ts` = **EMPTY**. Every commit
between the BG audit anchor (`4c761b64`) and current HEAD (`e550f1b0`) is a **doc/audit fold**:

| Commit | Nature |
|---|---|
| `fab5b7a1` → `e550f1b0` (5 commits) | BG re-spec + coherence FOLD — `docs/tranches/**` only |

The 3 BG live-fixes (`07c6e6ec`/`e40e5095`/`8947288a`) ARE src-touching (Constellation.vue, constants.ts,
dock/layers.css, demo) but they are **ANCESTORS of `4c761b64`** (already in the audit baseline) AND touch **zero
export-surface files** (no barrel / no `package.json` exports / no `src/api/` / no `src/subpaths/` / no `src/index.ts`).

**Consequence:** the export surface on disk at HEAD is **byte-identical to the state when "200 of 203" was computed.**
The "200 of 203" figure was computed against the 4.2.0/HEAD snapshot; that snapshot has not moved. BG's WS5/WS8/WS6
work is **PLANNED in the tranche specs, NOT LANDED** — so re-deriving "against the current src" yields the SAME
numbers, and the question of whether BG's landed waves changed the set answers cleanly: **they did not.**

### 1b. The BH.B2.1-mech gate already landed (and is GREEN against live disk)

A landed BH commit `c98ac8c8` ("BH B2 (BH.B2.1-mech): export-surface regen mechanism") — itself an ancestor of
`4c761b64` — shipped `scripts/lib/subpath-policy.mjs`, `scripts/regen-exports.mjs`, `scripts/proof-subpath-classify.mjs`
and the `proof:subpath-classify` gate row (`gates.mjs:377`). **Running it live now:**

```
proof:subpath-classify — PASS
  policy module exports     : 21 (10 required)
  C1 real (--json)          : exit 0  EXACT_REPRODUCTION=true  failClosed=true  fidelityFailed=0
  C2 --inject-unclassified  : exit 1  (fail-closed teeth)
  C3 --break-fidelity       : exit 1  (fidelity teeth)
```

`EXACT_REPRODUCTION=true` is the **binding machine proof** that the entry-NAME set and the `package.json` export-key
set reproduce exactly from the single-source policy classification — i.e. the published surface is at the expected
baseline, with the regen-as-gate already a real CI artefact (not a 4.2.0 snapshot).

---

## 2. THE `200 of 203` FIGURE — RE-DERIVED, ACCURATE

Re-ran `docs/tranches/BH/research/proto/regen-api-migration.mjs` (which `readFileSync`s the LIVE `src/api/index.ts`
+ `src/api/types-extra.ts` and parses the re-export lines at runtime — verified it reads disk, not a snapshot):

```
total /api symbols (rows): 203
unique symbols           : 203
byKind                   : 199 type + 4 const
orphans                  : 3 → Surface, MenuItemVariants, ControlSize
every row resolved-or-orphan : true
every symbol exactly once     : true
duplicates                    : 0
resolved                      : 200 / 203
```

**Independent cross-check** (my own regex extractor over the live api files, distinct from the proto script):
`src/api/index.ts` = 81 symbols · `src/api/types-extra.ts` = 118 symbols · union **199 type symbols** + the 4 value
consts (`DEFAULT_AURORA_CONFIG`, `MAX_NUCLEI`, `MAX_STOPS`, `PAPER_WASH_GROUND`, exported via `export { … }` value form)
= **203 total.** Two independent derivations agree.

### 2a. The 3 orphans verified

The 3 orphans are **real `/api` exports being dropped** and **genuinely homeless** (no current subpath carries them):

| Orphan | Current export site (live) | Re-home target | Subpath-grep |
|---|---|---|---|
| `Surface` | `src/api/index.ts:71` `export type { Surface } from "../components/ui/_shared"` | → `/card` | absent from `src/subpaths/` (orphan confirmed) |
| `MenuItemVariants` | `src/api/index.ts:109` `from "../components/ui/_shared"` | → `/command` | absent from `src/subpaths/` |
| `ControlSize` | `src/api/index.ts:115` `from "../components/ui/_shared"` | → `/forms` | absent from `src/subpaths/` |

All 3 export from `../components/ui/_shared` — which has **NO published subpath of its own** (hence orphan status; each
re-home ADDS one export to its target barrel). `/card`, `/command`, `/forms` all confirmed real published keys in
`package.json` exports. This is exactly the "3 orphans add an export, the only 3 of 203" claim — **accurate.**

### 2b. The 200 path-swaps verified reachable

Spot-checked 5 "pure path-swap" symbols resolve to a real subpath/component home today (the migration target exists):

| Symbol | → subpath | Current home |
|---|---|---|
| `AuroraConfig` | `/aurora` | `src/components/custom/aurora/index.ts` (via `subpaths/aurora.ts` `export *`) |
| `CardTier` | `/card` | `src/components/ui/card/index.ts` |
| `HandShape` | `/handmark` | `src/components/custom/handmark/index.ts` |
| `SearchResult` | `/search` | `src/components/custom/search/index.ts` |
| `ButtonVariants` | `/button` | `src/components/ui/button/index.ts` (via `subpaths/button.ts`) |

The path-swap mechanism (every symbol already reaches its subpath via `export *` re-export barrels) is intact, so the
200-symbol re-home is genuinely a pure import-PATH swap with zero symbol loss.

### 2c. The "ONE dropped key" verified

`package.json` exports currently carries `./api` (`has ./api: true`). The B2.2 fold drops exactly this one key. Every
OTHER published key is preserved by the regen — `proof:subpath-classify`'s C1 EXACT_REPRODUCTION proves the regen
reproduces the full key set with zero add/drop/mismatch (`./api` being the only INTENTIONAL drop the B2.2 wave removes
from the policy). **The "exactly ONE dropped key" claim is accurate.**

---

## 3. DID BG's WS5 / WS8 / WS6 CHANGE THE EXPORTED SYMBOL SET? (the SEED-CONTEXT crux)

The SEED-CONTEXT (§ Known friction history, last bullet) flags "BG's WS5 viz-subpath work + WS8's glass-refract
retirement may have changed the exported symbol set." Cross-referenced against the **amended BG**
(`BG/FINAL.md` + `BG/execution/bg-build-map.md` + `RESPEC-COHERENCE/COHERENCE.md`):

### 3a. WS5 (viz-subpath) — ZERO key/symbol change [NO DRIFT]

`BG/FINAL.md:502` (G7 cluster resolution, verbatim): **"WS5 drops/renames ZERO consumed viz keys (DEMIGRATE is an
internal WGSL→`useCanvas2D` swap; SUBSTRATE-DELETE keeps the GLSL fallback + dir + `index.ts`)."** WS5 owns a VISUAL
re-baseline (slides `/fourier-field`×4 + `/constellation`×2; atlas `/constellation`×1 + `/dot-flow-field`×1) — a
consumer re-paint, **not** an export change; no by-name ask owed. Disk-confirmed: all 8 viz dirs
(`constellation`/`fourier-field`/`concentric`/`dot-flow-field`/`paper-grid`/`goo-dot-matrix`/`dot-matrix`/`goo-blob`)
keep their `index.ts` barrels. **WS5 does NOT touch the `/api` 203 set nor the published subpath keys.**

### 3b. WS8 (glass-refract retirement) — CSS-only, ZERO /api change [NO DRIFT]

`BG/FINAL.md:178` (BG.W-GLASS-SOTA-LADDER): the WS8 retirement deletes **`.glass-lens`** (a CSS class),
**`glass-refract.css`** (a CSS file), and **`detectTier`** (an internal helper) — **none is a `/api` exported type.**
The WS8 `.glass-lens` fan-out is a **GATE-READER** problem (cluster G2/G3 — `proof:button-glass`/`proof:visual-reconcile`
read Button.vue source for the class), NOT an export-surface problem. **WS8 does NOT touch the `/api` 203 set.**

### 3c. WS6 (siri) — +1 PUBLISHED SUBPATH + an additive /api BUMP [⚠ DRIFT vs the BH "+2 siri" constant]

`BG/execution/bg-build-map.md:395-396` (BG.W-SIRI-ISLAND, *Files*):
`src/components/custom/siri-island/{…,index.ts}`, **`src/subpaths/siri-island.ts`**, **`api/index.ts`**.
`bg-build-map.md:402` (BG.W-SIRI-WAVEFORM, *Files*): `src/components/custom/siri-waveform/{…}` — **NO subpath file.**
`bg-build-map.md:1173-1174`: pre-derived **siri-island = PUBLISH** (`subpaths/siri-island.ts` listed);
**siri-waveform = INTERNAL** (no subpath file — a WebGL2 leaf composed by SiriIsland; the one human PUBLISH-vs-INTERNAL
confirm at landed WS6).

So when WS6 lands, the real export delta is:
- **+1 published subpath** (`/siri-island`), NOT +2 (siri-waveform stays INTERNAL).
- **+N /api symbols** (siri-island's *Files* explicitly includes `api/index.ts`) → the `/api` count rises **above 203**
  post-WS6. The exact N (SiriIsland public types — likely `SiriIslandProps` + a form/state union) is not enumerated in
  the build-map, but the build-map confirms ≥1 type lands in `/api`.

**This is the one coherence drift.** The BH PLAN says "+2 siri subpaths" in two load-bearing places:
- **PLAN.md L68** (B2.1-swap): "captures **WS6's +2 siri subpaths** + WS5's viz deletes/renames"
- **PLAN.md L116** (§5 residual-1): "derived post-WS12 against the landed surface (**WS6 +2 siri**, WS5 viz
  deletes/renames)"

Both contradict the amended BG (which froze siri-waveform INTERNAL during its own coherence pass). The fix is a
two-word literal correction: **"+2 siri subpaths" → "+1 siri subpath (`/siri-island`; siri-waveform INTERNAL)".**
The PLAN also says "WS5 viz deletes/renames" as if WS5 changes the export surface — but the amended BG (3a) confirms
WS5 changes ZERO keys; the PLAN should soften that to "WS5 viz internal-substrate swaps (zero key change)" to avoid
mis-priming the post-WS12 re-baseline reviewer.

### 3d. The `/api` 203-count is a HEAD snapshot that WILL drift UP post-WS6 — already captured as residual

The PLAN §5-#1 already names this correctly: "The 203-row /api map + … are **4.2.0 snapshots**. The binding 5.0.0
versions can only be derived post-WS12 against the landed surface." So the `200 of 203` is honestly framed as a
re-baseline-forced moving target, NOT a frozen fact. **The figure is accurate AT HEAD; the residual is sound; the only
defect is the stale "+2 siri" literal that the re-baseline reviewer would carry into the post-WS12 classification.**

---

## 4. THE PUBLISHED-SUBPATH COUNT (a distinct axis from the /api 203)

The `/api` 203 is the symbol-fold count. The published **subpath KEY** count is a separate `proof:subpath-enumeration`
baseline. At HEAD: **89 JS subpath keys** (`package.json` exports, excl. styles/fonts/root). This baseline is ALSO a
4.2.0 snapshot — WS6 adds `/siri-island` (+1), and the B2.1-swap deletes `src/subpaths/` (79 files) but **preserves the
keys** (the regen re-derives the same key set from the colocated barrels). `proof:subpath-classify` C1
EXACT_REPRODUCTION currently proves 89 keys reproduce; post-WS6 it must be re-pinned to 90 (+`/siri-island`). This is
the "re-pin `proof:subpath-enumeration`" obligation already in PLAN.md L68 — sound, but the reviewer should expect
**+1 key (siri-island), not +2**, when re-pinning.

---

## 5. COHERENCE FRICTION-CLASS MATCH

| BG/BH friction class | This lens' finding |
|---|---|
| **C — clean-break rename misses a consumer** (recurs) | The `/api` drop's 2 by-name asks (muster→/aurora, speedtest→/timeline) are the consumer roster; the 3 orphan re-homes are the in-repo "rename" — all 3 verified homeless, none missed. NO miss in the /api fold itself. |
| **D — budget/baseline-rebaseline ratchet** (recurs) | The `200 of 203` + the 89-key baseline are 4.2.0 snapshots that drift up post-WS6 — the BH plan's §5-#1 gate-FORCED re-baseline is the correct mitigation; the stale "+2 siri" literal is a latent ratchet-miscount (would over-classify by one INTERNAL leaf at re-baseline). |
| **L10 (LOW, BG COHERENCE.md)** "BH B7 frozen symbol/key count vs SiriIsland" | DIRECT HIT — this lens confirms L10: the frozen 203/89 counts vs the un-landed SiriIsland subpath. The amended BG already flagged this as LOW; this lens upgrades the specific "+2 siri" literal to a should-fix prose drift (not a feasibility blocker). |

---

## 6. RECOMMENDED PLAN AMENDMENTS (record-only — the fold agent applies)

1. **PLAN.md L68 + L116:** change "WS6's +2 siri subpaths" → **"WS6's +1 siri subpath (`/siri-island`;
   siri-waveform is INTERNAL — no subpath file per `bg-build-map.md:1173-1174`)."** Soften "WS5 viz deletes/renames"
   → "WS5 viz internal-substrate swaps (zero published-key change per BG FINAL:502)."
2. **PLAN.md L68 / §5-#1:** add a one-line note that siri-island ALSO lands symbols in `api/index.ts`, so the
   post-WS6 `/api` count is **>203** (203 + the SiriIsland public types) — the 203 is a HEAD snapshot; the re-baseline
   must re-derive (the regen-api-migration script does this mechanically). The B2.2 `/api` fold then re-homes
   `203 + N` symbols, not 203 — but still exactly ONE dropped key + the SiriIsland symbols flow to `/siri-island`.
3. **No change to the core claim:** "exactly ONE dropped key (`./api`) + 3 orphan re-homes" stays accurate; only the
   symbol COUNT (203 vs 203+N) and the siri subpath COUNT (+1 vs +2) need the re-baseline note.

---

## 7. FENCE COMPLIANCE

- Operated only under `/Users/mkbabb/Programming/glass-ui`. Wrote only this one file under
  `docs/tranches/BH/audit/RESPEC-COHERENCE/`.
- `node scripts/verify-siblings-intact.mjs --quiet` → **exit 0 (INTACT)**, run twice (mid + end).
- Read-only on src/scripts/package.json; the proto regen scripts were RUN (read disk, write only to their own
  `docs/tranches/BH/research/proto/*.json` artefacts — within the BH tranche tree, not src). No sibling repo touched;
  the 2-consumer `/api` roster (muster, speedtest) is recorded from the BH plan's read-only P3.3 sibling sweep, NOT
  re-grepped.

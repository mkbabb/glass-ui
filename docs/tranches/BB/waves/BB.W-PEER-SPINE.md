# BB.W-PEER-SPINE — widen the value.js peer spine to admit ^0.12.0 + ^0.13.0, reconcile the dual-instance intersection against the REAL keyframes-4 value cap, and machine-lock both with a spine-range assert on proof:peer-optional

**Name**: W-PEER-SPINE - the value.js peer range no longer strands the 0.12.x/0.13.x consumer
**Opens after**: Batch 5 open (runs ‖ W-ADOPT-RECONCILE ‖ W-CROSSREPO-ASKS ‖ W-LINEAGE-PROBE ‖ W-EASING-PRIMITIVE — the cross-repo band; the registry single-owner rule: this wave OWNS `package.json`'s peer/dev/meta blocks + the `proof-peer-optional.mjs` extension for Batch 5, the siblings emit rows). Sequenced after the library work stabilizes (DAG critical-path: the adopt targets are final). Reads the AW.W27 `proof:peer-conformance` mechanism as authority but does NOT manifest it (W-DEAD-SWEEP's bound — see coordination).
**Agents**: 1 (the peer-range edit + the gate extension are one tight unit on `package.json` + one gate script — no parallel surface)
**Hard gate**: `proof:peer-optional` (EXTENDED, born-RED on the new spine-range arm) — the value.js peer range ADMITS the cross-repo target majors (0.12.0 + 0.13.0), the keyframes.js range still admits the `^4` floor (the floor holds across the value bump), AND the dual-instance intersection holds against the REAL published keyframes-4 value cap (NOT the stale AW.W27 hardcoded `^0.10.0`) so a consumer with glass-ui + keyframes-4 + value-0.12 resolves a SINGLE value.js. The existing four optionality witnesses stay GREEN (the widen is range-only — value.js is still absent from the root bundle, still optional). `proof:gate-script-parity` + `proof:gate-manifest-sound` + `proof:peer-conformance` stay GREEN after the edit.
**Status**: SPEC

## The defect (file:line — re-grounded at HEAD `83913151`)

Shipped 4.0.0 ships the value.js peer at `"@mkbabb/value.js": "^0.10.0 || ^0.11.0"` (`package.json:821`) — which EXCLUDES `0.12.0`. value.js's sibling is already at **0.12.0** (`../value.js/package.json:3`) and heading to 0.13.0/v1.0.0 (the BB-AMENDMENT §A3 cadence: value.js N ships the OKLCH/shorter-hue spectrum helper at 0.13.0, which glass-ui's **W-BORDER-PROGRESS** consumes). So EVERY consumer on value.js 0.12.x today gets a spurious npm peer WARN against glass-ui — the F-2 finding (`BB.md:69`, value.js letter Register-F). The same exclusion blocks the W-BORDER-PROGRESS consume path: until the peer admits ≥0.13.0, the cross-repo OKLCH-helper consume cannot resolve through the registry.

This is the SAME class AW.W27 already fixed once (`proof-peer-conformance.mjs:6-9`: "the 3.3.0 ranges excluded both current majors … so every consumer on the current majors got a spurious peer WARN") — re-recurring because value.js minted a new minor (0.12.0) past the range's `^0.11.0` ceiling. The range is a ratchet that has to be re-widened each upstream minor that crosses a caret boundary; this wave widens it AND machine-locks the widen so the recurrence is caught by a gate, not a downstream peer-warn.

Two coupled facts the §0 re-ground surfaced (load-bearing — the naive "just admit 0.12.0" is INCOMPLETE):

1. **The devDep lags the peer.** `package.json:860` pins the value.js devDep at `^0.10.0` while the peer is to admit 0.12/0.13 — so glass-ui's OWN typecheck/build never exercises the version range it asks consumers to accept. The charge bumps the devDep `^0.10.0 → ^0.12.0` so the lib builds against the version a 0.12.x consumer holds (the install at HEAD already resolved value.js `0.10.0` in `node_modules` — the devDep is the lower bound the lockfile honors).

2. **The dual-instance intersection partner MOVED, and the conformance gate's hardcoded constant is STALE.** `proof-peer-conformance.mjs:37` declares `const KEYFRAMES4_VALUE_DEP = "^0.10.0"` and asserts glass-ui's value peer must INTERSECT it (so a consumer holding glass-ui + keyframes-4 resolves ONE value.js — the color-singleton). But the published keyframes-4 has since moved its value dep: the installed `node_modules/@mkbabb/keyframes.js` (4.2.0) deps value `^0.11.2`, and the keyframes.js sibling at HEAD (4.2.0 dev) deps value `^0.12.0` (`../keyframes.js/package.json:182`). So:
   - the AW.W27 hardcoded `^0.10.0` constant is a STALE pin (it describes keyframes-4.0.0, not the live 4.x line);
   - the dual-instance safety now hinges on glass-ui's value peer intersecting the REAL keyframes-4 value cap (`^0.11.2`/`^0.12.0`), and the OLD `^0.10.0 || ^0.11.0` range BARELY intersected `^0.11.2` (at 0.11.2) but does NOT intersect `^0.12.0` — so a consumer on the keyframes.js HEAD line would already dual-install. **Widening glass-ui's value peer to admit 0.12.0 is what RESTORES the single-instance intersection against the live keyframes-4 line** — the widen is not merely a peer-warn cosmetic, it is the dual-instance correctness fix for the keyframes-4-deps-value-0.12 reality.

So the wave is THREE coupled edits (peer widen + devDep bump + the kf-floor-holds assert) plus the gate extension that locks all three — and a recorded reconcile note that `proof:peer-conformance`'s stale `KEYFRAMES4_VALUE_DEP` constant is a SEPARATE staleness booked to W-ADOPT-RECONCILE (the cross-repo adopt-loop wave), NOT silently re-pinned here.

## §0 — RE-GROUND (mandatory step-0; re-grep every cite at HEAD before any edit)

This wave starts from the captured F-2 finding (`BB.md:69`, `BB-AMENDMENT §A3:43`) re-verified at BB HEAD — NOT a blind re-diagnose. Before touching a byte, the impl agent re-greps each anchor below at HEAD and confirms the peer-range state + the dual-instance partner version still hold; if a cite has drifted (value.js minted 0.13.0, keyframes-4 moved its value cap again, the gate constant was already reconciled by a sibling wave), the agent records the drift in PROGRESS and re-locates the mechanism — the range widen tracks the LIVE upstream versions, never a stale audit number.

```
# 0. The glass-ui peer/dev/meta state (the three edits land here)
sed -n '817,861p' package.json            # peerDependencies value.js ^0.10.0 || ^0.11.0 (821); kf ^2.2.0||^3.0.0||^4.0.0 (819); devDep value.js ^0.10.0 (860)
grep -nE '@mkbabb/value\.js|@mkbabb/keyframes\.js' package.json

# 1. The LIVE upstream versions (the widen targets — read at HEAD, never trust the audit number)
node -e "import('npm:_ignore').catch(()=>0)"  # (illustrative)
cat ../value.js/package.json | grep -E '"version"'        # the sibling minor (0.12.0 at this authoring; may be 0.13.0)
npm view @mkbabb/value.js version 2>/dev/null || echo "offline → use the sibling/pinned"
npm view @mkbabb/value.js versions --json 2>/dev/null      # the full published spine (admit-range target)

# 2. The dual-instance partner — the REAL keyframes-4 value dep (NOT the gate's stale constant)
cat ../keyframes.js/package.json | grep -E '"@mkbabb/value\.js"'              # the sibling kf value dep (^0.12.0 at HEAD)
grep -E '"@mkbabb/value\.js"' node_modules/@mkbabb/keyframes.js/package.json  # the INSTALLED kf value dep (^0.11.2 at HEAD)
npm view @mkbabb/keyframes.js@4 dependencies.@mkbabb/value.js 2>/dev/null     # the published kf-4 value cap (the live intersection partner)

# 3. The gate to extend (the manifested one) + the stale constant (the booked-elsewhere one)
sed -n '47,97p' scripts/proof-peer-optional.mjs    # the optionality derived-fact gate — the EXTENSION home (manifested, gates.mjs:378)
sed -n '30,93p' scripts/proof-peer-conformance.mjs # AW.W27 — the admit + dual-instance mechanism; KEYFRAMES4_VALUE_DEP="^0.10.0" (37) is STALE (book to W-ADOPT-RECONCILE)
grep -nE 'proof:peer-conformance' scripts/gates.mjs # CONFIRM: NOT in the gates.mjs registry (registered script, unmanifested — W-DEAD-SWEEP's bound; do NOT manifest here)
grep -nE 'proof:peer-conformance|proof:peer-optional' package.json  # both are package.json scripts (588, 654)

# 4. value.js is OUT of the root bundle (the optionality fact the widen must NOT disturb)
grep -c '@mkbabb/value' dist/glass-ui.js   # 0 → value.js is a feature peer (optional); the range widen keeps it optional
node scripts/proof-peer-optional.mjs       # PASSES at HEAD (optionality only — the spine is NOT yet asserted → the born-RED arm is net-new)

# 5. semver is resolvable (the gate extension uses it, as proof-peer-conformance already does)
node -e "import('semver').then(s=>console.log('semver ok', typeof s.satisfies, typeof s.intersects))"

# 6. CLAUDE.md / MIGRATION peer claims (the prose to reconcile)
grep -nE '@mkbabb/value\.js|@mkbabb/keyframes\.js' CLAUDE.md   # the dep table row (283); value.js ^0.10.0 listed (the doc lags too)
```

Grounding findings confirmed at this authoring (`83913151`):
- `package.json:821` value.js peer `"^0.10.0 || ^0.11.0"` — EXCLUDES 0.12.0 (the F-2 defect).
- `package.json:860` value.js devDep `^0.10.0` — lags the peer (edit 2).
- `package.json:819` keyframes.js peer `"^2.2.0 || ^3.0.0 || ^4.0.0"` — the `^4` floor that must HOLD (assert 3).
- value.js sibling = **0.12.0**; heading to 0.13.0 (BB-AMENDMENT §A3 — the W-BORDER-PROGRESS consume target).
- keyframes-4 value dep MOVED: installed 4.2.0 → value `^0.11.2`; sibling HEAD → value `^0.12.0`. The AW.W27 `KEYFRAMES4_VALUE_DEP="^0.10.0"` is STALE (book, do not re-pin here).
- value.js literal count in `dist/glass-ui.js` = **0** → optional feature peer; the widen is range-only, the optionality witnesses stay green.
- `proof:peer-optional` PASSES at HEAD (no spine assert yet) → the extension's spine arm is BORN-RED net-new (the value range does not admit 0.12.0).
- `proof:peer-conformance` is a `package.json` script (588) but is NOT in the `gates.mjs` registry — a registered-but-unmanifested gate (W-DEAD-SWEEP's bound). NOT manifested here.

Captures / authority cross-references:
- `BB.md:69` (the F-2 charge — "Widen the spine + assert the kf ^4 floor holds across bumps. A 4.0.1 candidate").
- `BB-AMENDMENT-crossrepo.md §A3:43` ("glass-ui's W-PEER-SPINE (Batch 5) admits value.js `^0.12.0 || ^0.13.0` (closes F-2)") + §A4 the dep graph (the W-BORDER-PROGRESS ← value.js OKLCH consume; the cadence: value.js ships the helper at 0.13.0).
- `scripts/proof-peer-conformance.mjs` (AW.W27 — the admit + dual-instance mechanism this wave's spine-range assert mirrors INTO `proof:peer-optional`).
- `docs/tranches/BB/PROGRESS.md:49` (the W-PEER-SPINE row → `proof:peer-optional (extend)`).

## Scope

The fix is a peer-spine widen with a machine-lock — gestalt (the range tracks the live upstream spine + the dual-instance correctness), NOT a one-off "bump 0.11 to 0.12" patch. No backwards-compat shims (the peer range IS the compatibility surface; there is no alias to keep). The cross-repo foreign-tree fence HOLDS — this wave edits ONLY glass-ui's `package.json` + one glass-ui gate script; it reads the value.js/keyframes.js siblings as version AUTHORITY (the live upstream numbers) but edits NEITHER tree.

1. **Widen the value.js peer to admit the cross-repo target majors (the F-2 close).** `package.json:821` `"@mkbabb/value.js": "^0.10.0 || ^0.11.0"` → `"^0.10.0 || ^0.11.0 || ^0.12.0 || ^0.13.0"` (the BB-AMENDMENT §A3 spelled range — admit 0.12.x AND 0.13.x so the W-BORDER-PROGRESS OKLCH-helper consume resolves the moment value.js ships it at 0.13.0). The `^0.10.0 || ^0.11.0` legs STAY (a 0.10.x/0.11.x consumer must not be stranded by the widen — the range only GROWS). Re-ground the exact upper target at HEAD: if value.js has already published 0.13.0, the `^0.13.0` leg is live; if value.js is heading to v1.0.0 and a `1.0.0` is published by the close, the range adds the `^1.0.0` leg too (track the LIVE spine, not a stale ceiling — the recurrence the gate then catches).

2. **Bump the value.js devDep to match the spine's working floor.** `package.json:860` `"@mkbabb/value.js": "^0.10.0"` → `"^0.12.0"` so glass-ui's own `npm run typecheck` + `npm run build` exercise the version a 0.12.x consumer holds (the lib must build against the range it asks consumers to accept — the devDep-lags-peer trap closed). Re-resolve the lockfile after the bump (the orchestrator owns the index/install; the agent edits the manifest, the install is the orchestrator's leg). Confirm the build + typecheck stay GREEN against the bumped devDep (value.js is an optional feature peer — the aurora/blob color seams consume it; a 0.12.x API drift that breaks the build is a scope-reveal → triumvirate, not a silent pin-back).

3. **Assert the keyframes.js `^4` floor HOLDS across the value bump (the charge's "assert the kf ^4 floor holds").** `package.json:819` keyframes.js peer `"^2.2.0 || ^3.0.0 || ^4.0.0"` is UNCHANGED by this wave — but the gate's NEW spine arm asserts the keyframes range still ADMITS the `^4` floor (the published keyframes-4 line, installed 4.2.0) after the value bump. This is the cross-bump safety: the value widen must not perturb the keyframes resolution, and the gate proves the keyframes `^4` floor stays admitted (a future agent narrowing the keyframes range below `^4.0.0` — or value.js + keyframes co-evolving into a non-resolvable combo — reds the arm). The keyframes range itself is not edited (the `^4` floor is already present); the wave LOCKS that it stays present.

4. **Reconcile the dual-instance intersection against the REAL keyframes-4 value cap (the load-bearing correctness fix).** The widened value peer must INTERSECT the published keyframes-4 value dep so a consumer holding glass-ui + keyframes-4 + value-0.12 resolves a SINGLE value.js (the color-singleton — the AW.W27 dual-instance safety). The wave's gate arm reads the LIVE keyframes-4 value dep (`npm view @mkbabb/keyframes.js@4 dependencies.@mkbabb/value.js`, offline-fallback to the installed `node_modules/@mkbabb/keyframes.js` value dep) — NOT the stale AW.W27 `^0.10.0` constant — and asserts glass-ui's widened value range intersects it non-emptily. With the widen (`… || ^0.12.0 || ^0.13.0`) the intersection against keyframes-4's `^0.11.2`/`^0.12.0` is RESTORED (the old range did NOT intersect `^0.12.0` — the dual-install latent break the widen fixes). This is the half the naive "admit 0.12.0 for the peer-warn" misses: the widen is the dual-instance correctness fix, not a cosmetic.

5. **Extend `proof:peer-optional` with the spine-range assert (the machine-lock).** Per the charge ("Extend proof:peer-optional with the spine-range assert"), the EXISTING optionality gate gains a NEW arm — the four existing optionality witnesses are UNTOUCHED (the widen does not disturb them: value.js is still out of the root bundle → still optional). The new arm (mirroring `proof-peer-conformance.mjs`'s admit + dual-instance mechanism, importing `semver` exactly as that gate does) asserts THREE spine facts: (a) the value.js peer ADMITS the live target majors (`semver.satisfies("0.12.0", range)` AND `semver.satisfies("0.13.0", range)` — re-grounded to the live published majors); (b) the keyframes.js peer ADMITS the `^4` floor (`semver.satisfies("4.0.0", kfRange)` — the floor holds); (c) the value peer INTERSECTS the LIVE keyframes-4 value dep (`semver.intersects(valueRange, kf4ValueDep)` — the dual-instance singleton). The arm is born-RED at HEAD (the value range does not admit 0.12.0). Offline-safe: the live-version lookups go through `npm view` with the AW.W27 pinned-fallback idiom (a network-less CI runner enforces the range against the pinned audited spine, never false-GREENs). The extension stays INSIDE `proof-peer-optional.mjs` (one gate, one extension); `proof:peer-conformance` is read as the authority pattern but NOT edited/manifested here.

6. **Reconcile the prose + book the stale conformance constant.** Update the CLAUDE.md dependency-table row (`CLAUDE.md:283`-region — the `@mkbabb/value.js ^0.10.0` row → the widened spine) so the doc tracks the shipped peer (the doc-lags-source class). RECORD in PROGRESS that `proof-peer-conformance.mjs:37`'s `KEYFRAMES4_VALUE_DEP="^0.10.0"` is a STALE pin (the live keyframes-4 value dep is `^0.11.2`/`^0.12.0`) — a SEPARATE reconcile owed to **W-ADOPT-RECONCILE** (the cross-repo adopt-loop wave, Batch 5 sibling), NOT silently re-pinned here (this wave's gate arm reads the LIVE dep, so it is correct even while the conformance constant is stale; the conformance gate stays GREEN at HEAD because `^0.10.0 || ^0.11.0` still intersects its own stale `^0.10.0` — the staleness is latent until value.js minors past, which is exactly the W-ADOPT-RECONCILE concern).

## Goal

The value.js peer range no longer strands the 0.12.x/0.13.x consumer (the F-2 peer-warn dead), the W-BORDER-PROGRESS OKLCH-helper consume resolves through the registry the moment value.js ships 0.13.0, the keyframes `^4` floor provably holds across the value bump, and the dual-instance singleton is restored against the LIVE keyframes-4 value cap (not a stale 2026-06-07 constant) — all three machine-locked by a born-RED spine-range arm on `proof:peer-optional` so the next upstream-minor recurrence is caught by a gate, not a downstream peer-warn.

## Completion criteria

- `package.json:821` value.js peer admits 0.12.x + 0.13.x (the live spine; the existing legs retained — the range only grows).
- `package.json:860` value.js devDep bumped `^0.10.0 → ^0.12.0`; `npm run typecheck` + `npm run build` GREEN against it.
- `package.json:819` keyframes.js peer unchanged; the gate's spine arm proves the `^4` floor stays admitted.
- `proof:peer-optional` EXTENDED with the born-RED→GREEN spine arm (admit-value-majors + kf-^4-floor-holds + dual-instance-intersection-against-live-kf4); the four existing optionality witnesses stay GREEN.
- `proof:gate-script-parity` + `proof:gate-manifest-sound` + `proof:peer-conformance` stay GREEN after the edit.
- CLAUDE.md dep-table row reconciled to the widened spine; the stale `KEYFRAMES4_VALUE_DEP` constant BOOKED to W-ADOPT-RECONCILE in PROGRESS (not re-pinned here).

## Hard Gate

`proof:peer-optional` (EXTENDED, born-RED on the new spine arm) — the four existing optionality witnesses (the AU.W3 derived-fact: optional IFF absent-from-dist & not-core-substrate) stay GREEN, and the NEW spine-range arm is born-RED at HEAD, driven GREEN by the wave. Three falsifiable spine witnesses + the harness-soundness regression guard:

1. **S1 — the value spine admits the cross-repo majors.** The value.js peer range satisfies the LIVE target majors: `semver.satisfies("0.12.0", valueRange)` AND `semver.satisfies("0.13.0", valueRange)` both TRUE. RED at HEAD: `^0.10.0 || ^0.11.0` satisfies neither 0.12.0 nor 0.13.0 (the F-2 defect). **Self-test bite (anti-evasion):** the arm re-grounds the target majors against `npm view @mkbabb/value.js versions` (the live published spine, offline-fallback to the pinned audited majors) — a hand-frozen "0.12.0" literal that goes stale when value.js ships 0.14.0 is itself caught (the arm asserts the range admits the live MAX published major, so a future minor crossing the caret reds the arm until the range is re-widened — the recurrence the gate exists to catch).
2. **S2 — the keyframes `^4` floor holds across the bump.** The keyframes.js peer range satisfies `4.0.0` (`semver.satisfies("4.0.0", kfRange)` TRUE) — the `^4` floor admitted after the value widen. RED-equivalent at HEAD: vacuously GREEN (the floor is present); S2 is the REGRESSION guard — it reds if a later edit narrows the keyframes range below `^4.0.0` OR if the value/keyframes co-evolution produces a range that no longer admits the published keyframes-4 line. Assert shape: the kf range admits 4.0.0 AND the installed keyframes-4 (4.2.0) major.
3. **S3 — the dual-instance singleton holds against the LIVE keyframes-4 value cap.** The widened value range INTERSECTS the LIVE published keyframes-4 value dep (`semver.intersects(valueRange, kf4ValueDep)` TRUE, where `kf4ValueDep` is read from `npm view @mkbabb/keyframes.js@4 dependencies.@mkbabb/value.js`, offline-fallback to the installed `node_modules/@mkbabb/keyframes.js` value dep — NOT the stale AW.W27 `^0.10.0` constant). RED at HEAD: the un-widened `^0.10.0 || ^0.11.0` does NOT intersect keyframes-4's `^0.12.0` (the latent dual-install the widen fixes). **Bite:** the arm reads the LIVE kf-4 value dep, so a green here is the genuine single-instance intersection against the shipping keyframes line — a gate that hardcoded `^0.10.0` (the conformance constant's stale value) would false-GREEN against a keyframes line that has moved; S3 is the distinguishing test (it would RED if glass-ui's range failed to intersect the REAL `^0.12.0` kf dep).
4. **S4 — the harness stays sound (no fake-pass evasion).** `proof:gate-script-parity` (file↔key bijection — the extended gate keeps its single key), `proof:gate-manifest-sound` (tags↔aggregate — `proof:peer-optional` keeps its `["local","ci","release"]` tags), AND `proof:peer-conformance` (the AW.W27 admit gate — the value widen must not red the OTHER peer gate) all stay GREEN after the edit. RED-equivalent at HEAD: vacuously GREEN (no edit); S4 is the regression guard — it reds if the extension breaks the parity bijection, perturbs the manifest soundness, or the value widen reds the conformance gate's own admit/intersect asserts.

**This is a STRUCTURAL/manifest wave, not a visual one** — there is NO `proof:ba-gestalt` requirement and NO π/DELTA (this wave paints ZERO pixels; the peer range is a manifest fact, the gate's exit-0 is the binding truth). The binding evidence is the born-RED→GREEN log for the spine arm + the four-optionality-witnesses-stay-green log + the harness-soundness logs, captured to the verification artefact with an AZ-form freshness header (capture date, HEAD sha) per the cardinal lesson — the lesson here is a manifest DELTA (the peer-range diff + the gate log), not a visual one.

## File Bounds

| File | Access |
|---|---|
| `package.json` | modify (the value.js peer widen `:821`; the value.js devDep bump `:860`; the keyframes peer `:819` UNCHANGED — read-only confirm the `^4` floor present) |
| `scripts/proof-peer-optional.mjs` | modify (extend with the spine-range arm — `semver` import + the admit/floor/intersect asserts, mirroring `proof-peer-conformance.mjs`'s mechanism; the four optionality witnesses untouched) |
| `CLAUDE.md` | modify (the dependency-table row `:283`-region — the value.js range → the widened spine) |
| `docs/tranches/BB/audit/visual/W-PEER-SPINE-DELTA.md` | create (the peer-range diff + the born-RED→GREEN spine-arm log + the optionality-stay-green log + the dual-instance-against-live-kf4 record; the freshness header) |
| `docs/tranches/BB/PROGRESS.md` | modify (the discharge row + the BOOK of the stale `KEYFRAMES4_VALUE_DEP` constant to W-ADOPT-RECONCILE) |

Do NOT touch:
- **`scripts/proof-peer-conformance.mjs`** — its stale `KEYFRAMES4_VALUE_DEP="^0.10.0"` constant (`:37`) is BOOKED to W-ADOPT-RECONCILE (the cross-repo adopt-loop wave). This wave reads the conformance gate's mechanism as the authority PATTERN (the admit + dual-instance idiom it mirrors INTO `proof:peer-optional`) but edits NEITHER the conformance script NOR its constant. Re-pinning the constant here would be a unilateral widen into the adopt-loop wave's bound (the constant's staleness is part of the consumer-staleness/resolution close-loop W-ADOPT-RECONCILE owns).
- **The `gates.mjs` registry rows** — `proof:peer-optional` is already manifested (`gates.mjs:378`); the extension keeps the same key/tags, so no registry edit. `proof:peer-conformance` is a registered-but-unmanifested gate (a `package.json` script with no `gates.mjs` row) — that is W-DEAD-SWEEP's bound (the 24 registered-but-unmanifested gates); do NOT manifest it here (folding an unmanifested gate is a clean-up that belongs in the dead-sweep, not this peer wave).
- **The value.js / keyframes.js / slides / speedtest sibling trees** — the cross-repo foreign-tree fence (DAG §7). This wave READS the siblings as version authority (the live `package.json` version + value-dep numbers) but edits NEITHER tree. The value.js OKLCH-helper itself ships in value.js's tree at 0.13.0 (the W-BORDER-PROGRESS consume target, NOT this wave's work — this wave only ensures the peer range ADMITS the version that ships it).
- **The aurora/blob color seams that CONSUME value.js** — the devDep bump exercises them at build time, but this wave does not edit a consumer (a 0.12.x API drift that breaks the build is a scope-reveal → triumvirate, never a source patch here).
- The standing fences: GL shader internals (untouched — value.js is a JS color leaf, not a shader); ppmycota purple (no token gains a hue); the `--run release` battery (W-CLOSE-BATTERY's bound — this wave keeps `proof:peer-optional` green in that battery, never extends the battery rule).

## Dependencies

- **Depends on**: the Batch-0 integrity floor (the repaired gate harness — `proof:gate-script-parity`/`proof:gate-manifest-sound` must be sound before this wave extends a gate) + the library work stabilizing (DAG critical-path — Batch 5 is sequenced after Batches 2-4 so the adopt targets are final). It reads the value.js/keyframes.js sibling versions at HEAD (the live spine) — no structural dep on a sibling EDIT.
- **Blocks**: **W-BORDER-PROGRESS** (the PRIMITIVES band — its value.js OKLCH/shorter-hue spectrum-helper consume cannot resolve through the registry until the peer admits the version that ships it; the glass-ui-local interim spectrum is the consume-and-delete until value.js 0.13.0 + this widen both land — BB-AMENDMENT §A4 cadence). The **4.1.0 cut** (W-CLOSE) — the widened peer spine ships at the single 4.1.0 cut (§4 fold-all: NO interim 4.0.1; the F-2 fix lands INSIDE BB and ships at 4.1.0 with the full release battery). speedtest's `^4.1.0` bump (AW.W7) inherits the widened value spine.

## Named successors

- **W-ADOPT-RECONCILE (Batch 5 sibling)** — owns the reconcile of the stale `proof-peer-conformance.mjs` `KEYFRAMES4_VALUE_DEP="^0.10.0"` constant against the live keyframes-4 value dep (`^0.11.2`/`^0.12.0`), as part of its consumer-staleness + resolution close-loop. This wave RECORDS the staleness + books it; it does not re-pin the conformance constant (the cross-repo adopt-loop owns that surface).
- **W-BORDER-PROGRESS (PRIMITIVES band)** — the consumer of the value.js OKLCH/shorter-hue spectrum helper this widen unblocks; it resolves the helper through the registry once value.js ships 0.13.0 AND this peer admits it (the cross-repo consume cadence — BB-AMENDMENT §A4).
- **W-DEAD-SWEEP (Batch 2)** — owns manifesting-or-retiring the 24 registered-but-unmanifested gates incl. `proof:peer-conformance` (this wave leaves it as-is; the manifest disposition is the dead-sweep's, coordinated so the two peer gates do not double-cover the spine assert — `proof:peer-optional` carries the spine arm, `proof:peer-conformance` carries the upstream-latest admit; the dead-sweep decides whether the latter manifests or folds onto the former).

## Archaeology

Prior attempt: AW.W27 (`proof:peer-conformance`) already fixed this class ONCE — it widened the 3.3.0 ranges that excluded the then-current majors (keyframes `^2.2.0 || ^3.0.0` vs latest 4.0.0; value `^0.10.0` vs latest 0.11.1) and minted the admit + dual-instance gate. The recurrence: value.js minted 0.12.0 PAST the `^0.11.0` ceiling, re-stranding the consumer — the peer range is a ratchet that re-narrows relative to the moving upstream spine each minor that crosses a caret boundary. The new guardrail this wave adds over AW.W27: the spine arm re-grounds the target majors against the LIVE published spine (not a frozen literal) AND reads the LIVE keyframes-4 value dep for the dual-instance intersection (not the AW.W27 hardcoded `^0.10.0`, now stale) — so the next recurrence reds a GATE before a consumer sees a peer-warn, and the dual-instance correctness tracks the real keyframes line rather than a 2026-06-07 snapshot. The cardinal lesson holds in manifest form: the binding evidence is the captured peer-range diff + the born-RED→GREEN spine-arm log with a freshness header, not a "widened the range" close-message claim.

# BD.W-KF-OSCILLATOR-CONSUME

## (1) Band + goal

**Band 8 — Cross-repo asks + republish-gated consumes (foreign-tree fenced). BOOKED — kf republish-gated.**

On a keyframes.js republish past `4.3.0` that publishes the LIGHT `Oscillator`/`waveformValue` in its DIST (not just the local sibling), consume it for the viz loop-clock + the `<EasingPicker>` `loop` playback seam — the ONE-source+ONE-clock completion (the idle-breath periodic phase the picker's travelling dot loops off, replacing the de-synced sine/`uTime` interim). Until that republish fires, this STAYS BOOKED — authoring against a not-in-dist export is the contrivance the apply-the-bar discipline forbids; the interim is KEEP-until-republish, non-blocking. glass-ui edits ZERO kf tree (the foreign-tree fence, inv-26); the in-repo half is this glass-ui wave, the kf republish is kf's own.

## (2) Starting state — the exact on-disk reality

- **The `Oscillator` is ABSENT from the consumed kf dist (machine-verified, this read).** `grep -c 'Oscillator' node_modules/@mkbabb/keyframes.js/dist/keyframes.d.ts` → **0**. The kf installed version is `4.3.0` (`node -e "require('./node_modules/@mkbabb/keyframes.js/package.json').version"` → `4.3.0`). The `Oscillator` is LOCAL-ONLY in the keyframes.js sibling (present in its src past v4.3.0), NOT in the published dist — so importing it today is forbidden.
- **The picker's `loop` seam is the named-successor consumer (VERIFIED).** `src/components/custom/easing/README.md:62-67` — "## The `loop` playback seam (named successor) … The travelling dot's default playback is a one-shot rAF travel. The keyframes.js LIGHT `Oscillator` (BOOKED at `KF-TO-GLASSUI-BB-ASKS.md:47`) slots into the `playTravel`/`progress` loop seam when kf ships it — the idle-breath periodic phase the dot loops off, a named-successor consume, NOT a blocking dependency." The picker's default playback today is the one-shot rAF travel.
- **The viz loop-clock interim is the de-synced sine/`uTime` (the BC home).** The BC asks-and-consumes ledger (`docs/tranches/BC/coordination/asks-and-consumes.md:18`) records the `Oscillator`/`waveformValue` row 🟡 **BOOKED (republish-gated)** — "INTERIM = the existing de-synced sine / `uTime` (KEEP — do NOT block). The actual consume lands in `BC.W-VIZ-CHOREOGRAPHY` (the viz loop — its C6 reds importing the not-in-dist export, its §F books the republish) + the `EasingPicker` `loop` playback seam." `BC.W-VIZ-CHOREOGRAPHY` C6 is the existing machine-block on importing the not-in-dist export.
- **The BB-era relay names the ask BOOKED kf-owned (VERIFIED).** `docs/tranches/BB/coordination/asks-and-consumes.md:40` (§1 ASK #6 KF-OSCILLATOR) — 🟡 **BOOKED (kf-owned)**, "kf delivers when consumed; the picker's default rAF ships at 4.1.0; the `loop` seam is the named-successor consume (trigger: 'kf ships the Oscillator')". The peer spine is `keyframes.js: ^4.0.0` (`package.json` peerDependencies, VERIFIED) — NO peer-spine widen is owed for the consume.
- **The kf-side authority is its INFORM (VERIFIED).** `docs/tranches/BC/inbound/KF-INBOUND.md:20` ("INFORM-1 — KF-OSCILLATOR is READY (published LIGHT)") carries the CRITICAL CAVEAT (grep-verified): "the `Oscillator` is **LOCAL-ONLY in keyframes.js, ABSENT from the published 4.3.0 dist** … so the 'consumable NOW' claim is **half-true** … the `Oscillator` itself is **republish-gated** (importing the not-in-dist export is forbidden — `BC.W-VIZ-CHOREOGRAPHY` C6 reds it)."

**The trigger has NOT fired.** The `Oscillator` is still absent from the consumed dist at the BD authoring. The disposition is BOOKED-with-trigger, NOT a build.

## (3) The build — BOOKED, no build this tranche (the republish-gate fence)

**This wave builds NOTHING until kf republishes the LIGHT `Oscillator` in its DIST.** Authoring a consume against a not-in-dist export is a contrivance (`BC.W-VIZ-CHOREOGRAPHY` C6 already reds importing it). The wave's BD-authoring product is the re-stamped BOOKED disposition + the carried-forward trigger; the actual consume is the kf-republish-gated successor.

**IF the trigger fires (kf republishes the LIGHT `Oscillator`/`waveformValue` in its `4.x` dist):**

1. **Verify the dist-presence first.** Re-grep the consumed dist (`grep 'Oscillator' node_modules/@mkbabb/keyframes.js/dist/keyframes.d.ts` → ≥1) so the consume is against a REAL published export, not the local sibling. NO peer-spine widen — the consume rides the existing `^4.0.0` caret (the `Oscillator` ships in a `4.x` minor, caret-compatible).
2. **Consume in the `<EasingPicker>` `loop` seam.** `useEasingPicker`'s `playTravel`/`progress` loop reads the kf `Oscillator` periodic phase ∈[0,1) for the looping playback register (the named-successor seam README.md:62-67 reserves). The one-shot rAF travel STAYS the default playback; `loop` is the new opt-in register the Oscillator drives.
3. **Consume in the viz loop-clock (the de-synced interim DELETE).** The viz that runs a free `uTime`/sine idle-breath re-points onto the shared `Oscillator` periodic phase so the one source + one clock close (the `BC.W-VIZ-CHOREOGRAPHY` §F book). DELETE the de-synced sine/`uTime` interim (the consume-and-delete cadence).
4. **Reconcile the relay row.** Flip the BD asks-and-consumes KF-OSCILLATOR row from BOOKED → SATISFIED + the shipping kf version; reconcile the BB/BC relay rows in lockstep (the no-silent-drop law — the ask never loses its disposition).

**Fences honored:** NO kf tree edit (inv-26 — the kf republish is kf's own; the by-name ask is the only channel). NO peer-spine widen (the spine is `^4.0.0`; the `Oscillator` ships in a caret-compatible `4.x` minor). The keyframes.js-is-the-ONE-source-and-clock invariant is what the consume COMPLETES (the loop seam was the one un-closed register). One-GL-per-route preserved (the viz already owns its frame loop; the `Oscillator` is a phase reader, not a second rAF).

## (4) The gate — born-RED → GREEN (the republish-gate machine-lock)

**The BOOKED disposition is the standing fact; the gate fires only on the consume.**

- **`BC.W-VIZ-CHOREOGRAPHY` C6 is the standing republish-gate (VERIFIED, stays the floor).** It reds importing the not-in-dist `Oscillator` — so the republish-gate is machine-enforced TODAY: a premature consume (importing the local-only export) reds C6. This is the born-RED that protects the contrivance.
- **The BD no-silent-drop gate (`proof:bd-crossrepo-asks`, the BD relay mirror of `proof:crossrepo-asks`) carries the row.** The relay must name the KF-OSCILLATOR ask + its BOOKED disposition + its trigger + the consumer seam (`<EasingPicker>` `loop` / the viz loop-clock) — a dropped row reds the no-silent-drop completeness arm (the `proof-crossrepo-asks.mjs` shape: `EXPECTED_ASKS` covers `kf-oscillator`, the relay carries the disposition). Born-RED if the BD relay omits the row.
- **IF the consume lands (post-republish):** a new born-RED clause asserts (a) the consumed dist carries `Oscillator` (the dist-presence floor — never against the local sibling), (b) the `<EasingPicker>` `loop` seam imports it, (c) the de-synced sine/`uTime` interim is GONE at the viz site (the consume-and-delete) — born-RED on the pre-consume tree (interim present, no Oscillator import), GREEN at the consume. **The self-test bite:** a synthetic consume that imports the not-in-dist `Oscillator` (or that keeps the de-synced interim alongside the new import — the dual-path) MUST red.

## (5) Paint verification

**Device-free UNTIL the trigger fires.** The BD-authoring product is the re-stamped BOOKED disposition + the carried trigger + the relay row — zero pixels, no `proof:ba-gestalt`.

**IF the consume lands (post-republish):** the `loop`-clock visual IS the paint — the picker's travelling dot loops continuously off the `Oscillator` periodic phase (the idle-breath register), captured both modes at `/motion/curve-gallery` (or the picker's demo route); the one-shot default unchanged. The viz idle-breath reads on the shared clock. `proof:ba-gestalt` motion-band verdict on the fresh capture (the BC anti-disease law — no source-green close; the loop paint is the binding truth). NO terminal-reflect funnel.

## (6) Fences + risks

- **REPUBLISH-GATE (the cardinal fence).** Authoring against a not-in-dist export is the contrivance the apply-the-bar discipline forbids; `BC.W-VIZ-CHOREOGRAPHY` C6 reds it. STAYS BOOKED until the consumed dist carries the `Oscillator` — the trigger has NOT fired at BD.
- **FOREIGN-TREE FENCE (inv-26, absolute).** glass-ui edits ZERO kf tree — the `Oscillator` republish is kf's own; the by-name ask is the only channel. A consume wave's File Bounds touch ZERO `../keyframes.js` path.
- **NO peer-spine widen.** The spine is `keyframes.js: ^4.0.0`; the `Oscillator` ships in a caret-compatible `4.x` minor. Widening the peer to chase the republish is forbidden (`proof:constellation-spine` owns the spine; the consume does not move it).
- **NO dual-path on consume.** The consume DELETES the de-synced sine/`uTime` interim (the consume-and-delete cadence — no legacy alias, no dual register). A consume that keeps the interim alongside the new import is the dual-path the self-test bite reds.
- **The dist-presence floor.** The consume verifies the export is in the CONSUMED dist (`node_modules/.../dist`), never the local sibling — the half-true "READY" claim (INFORM-1) is what the floor catches.
- **No-silent-drop.** The BOOKED row carries forward on the BD relay with its trigger; it is never silently dropped or re-booked without a re-stamp.

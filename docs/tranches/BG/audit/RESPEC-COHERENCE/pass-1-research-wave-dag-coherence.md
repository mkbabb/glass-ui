# PASS 1 — RESEARCH — LENS: WAVE-DAG COHERENCE

**Agent:** DAG-COHERENCE researcher · **Pass:** 1 (baseline) · **Date:** 2026-06-30
**Branch:** `tranche/BG` · **HEAD:** `4c761b64` · **Siblings:** intact (verify exit 0, before + after)
**Scope:** the 152 wave rows in `EXECUTION-PROGRESS.md` + `bg-build-map.md` (1021L) + the live engine
`bg-bh-execute.wf.js` + `bg-paint.wf.js`, cross-checked against the on-disk tree + `git log`.

---

## 0. METHOD + THE STRUCTURAL FACT THAT FRAMES EVERYTHING

There is **no static, machine-checkable DAG.** `bg-bh-execute.wf.js` does NOT encode edges; it spawns a
**DAG LOADER agent** (line 134) that READS `bg-build-map.md` + `bh-interleave-map.md` + `EXECUTION-PROGRESS.md`
and RETURNS a `preconds:[]` array per wave inferred from the PROSE. The frontier then fires on two rules only:

- `ready(w)` = `status==='PENDING'` ∧ `preconds.every(p ⇒ map[p].status==='DONE')` ∧ `interleaveReady(w)`.
- `interleaveReady` for **every BG wave returns `true` unconditionally** (line 90: `if (w.tranche === 'BG') return true`).
  → **BG order is enforced ENTIRELY by the per-wave `preconds` array** — never by `ws`, never by `seq`.
- `composeBatch` only uses `seq` as a **tiebreaker** (line 106 `sort((x,y)=>x.seq-y.seq)`, "prefer LOWER seq").

**Consequence:** the DAG's correctness is exactly the correctness of the prose preconds the loader parses, and the
only ordering nudge beyond preconds is "lower seq fires first." This makes the DAG a *hand-authored map* (the seed's
named friction class) — and the seed's own warning ("hand-authored maps that drift") **applies to the DAG itself.**

I verified: **acyclic (no cycles).** The deepest cross-WS edges (WS2↔WS6, WS4←WS5, WS10←WS4, WS11←WS1/WS4,
WS12←all) all resolve to forward chains; the one bidirectional-looking pair (WS2 `4.1`→WS6 `8.x`; WS6→WS2 `4.3`)
is a chain through DISTINCT WS2 nodes (`4.1 ≠ 4.3`), not a cycle.

---

## 1. THE HEADLINE: G4 "LANDS FIRST" IS UNENFORCED AND ALREADY VIOLATED (CONFIRMED)

`BG.W-CLOSEFIX-9SITE` (G4) is the AMENDED plan's **amendment 1 — "LANDS FIRST … post-STAGE-0, BEFORE WS1"**
(AMENDED-WAVE-PLAN §1.3.1, EXECUTION-PROGRESS 12.0, build-map §WS3/§WS7). Its binding rationale: it carves
`ladder.css` 527→470 + `dock/shell.css` 510→459 — **"the EXACT files WS3 re-edits — so the carve lands BEFORE WS3
builds on the carved leaves."** Three independent facts show this is broken:

**(a) The seq ordinal orders it LAST, not first.** G4 is homed at `seq 12.0` (organizationally in WS7). Every
WS1 wave is `2.x`, every WS3 wave `3.x`. `composeBatch` prefers LOWER seq → among ready waves the engine fires
`2.1` before `12.0`. The seq mechanism actively orders G4 **opposite** to its requirement. The EXECUTION-PROGRESS
note at 12.0 admits the seq is organizational ("homed here in its WS7 phase for organizational clarity") and
claims "the DAG … encodes it as a predecessor of WS1" — but that edge exists ONLY if the DAG LOADER agent
*infers* it from prose.

**(b) No WS1/WS3 wave names G4 as a precond.** `BG.W-ROUTE-TRANSITION`'s precond is *"Stage-0 ground-freeze"*
(build-map WS1 #1; EXEC 2.1). `BG.W-GLASS-BLUR-PEER`'s precond is *"token-collapse Phase-1-adjacent; saturate
paint WS1-FIELD-GATED"* (build-map WS3). Neither names `BG.W-CLOSEFIX-9SITE`. So `ready()` will fire them with
G4 still PENDING — which is exactly what happened.

**(c) The live cursor + git log prove the violation already occurred.** On disk RIGHT NOW:
- `ladder.css` = **527L**, `dock/shell.css` = **510L** (R1/R2 close-reds still LIVE); `--glass-blur-dock` still
  present in `glass.css`/`dark-arm.css`/`bridges.css`; the carve targets `glass/grain-overlay.css` +
  `dock/shell-regions.css` **do not exist**. → G4 has never run.
- `git log`: `CLOSEFIX-9SITE`/`grain-overlay`/`shell-regions` appear in **zero** commits, while WS1 (2.1–2.7 all
  DONE), WS3 `3.1`/`3.6`/`3.7`, WS4 `10.25`, and the 3 live-fixes have ALL landed.

**The declared binding order `STAGE-0 → CLOSEFIX-9SITE → WS1 → WS3` was executed as `WS1 → partial-WS3 → … (G4
still pending)`.** This is not a hypothetical — it is the realized state.

---

## 2. CONCRETE DOWNSTREAM BREAK: WS3 `3.6` PRE-EMPTED G4's OWN DELIVERABLE (CONFIRMED)

G4's spec frames the dock-blur re-point as ITS work: *"the dock still paints blur via
`--dock-surface-blur: var(--glass-blur-resting)` (8px peer, **verified 0 orphan readers**)"* (build-map §WS7,
AMENDED §G4). But `BG.W-GLASS-BLUR-PEER` (`3.6`, committed `cd9ce46`, PAINT-PENDING) **already shipped it:**

```
src/styles/dock/shell.css:29   --dock-surface-blur: var(--glass-blur-resting);
src/styles/dock/shell.css:159  backdrop-filter: var(--dock-surface-blur);
```

(the `--glass-blur-dock` mentions remaining in `shell.css:18–26` are the migration DOC-COMMENT, not live reads.)

So when G4 eventually builds it will find a **moved baseline**: its "FULL RETIREMENT … 0 orphan readers" census,
its enumeration of *"9 sites"* (sites 5–8: `dock-shrink-blur` S3 · `theme-style` `.blur-dock` probe ·
`InstrumentChassis.spine-variant` unit · `glass-cal` EXPECT_RADII), and especially its **"dist `glass-ui.css`
BYTE-IDENTICAL to the HEAD baseline"** invariant were all computed against the 4.2.0 HEAD. The tree has since moved
(`3.1` cartoon-ink, `3.6` glass-blur-peer, `3.7` idiom-factor, WS1, WS4 10.25 all changed compiled CSS). "Byte-
identical to HEAD" is now ambiguous (HEAD ≠ the tree G4 will diff against), and the "9-red" landscape may differ
because `3.6` already removed the dock consumer of `--glass-blur-dock`. **G4's atomic-diff spec is stale and owes a
re-derivation against the current frontier, not 4.2.0.**

---

## 3. PAINT-PENDING ≠ DONE — THE DECOUPLED-PAINT PRECOND STALL (CONFIRMED, structural)

Paint is decoupled: `bg-bh-execute.wf.js:204` sets `paintWaves = []` (the in-cycle judge is dead code); [P] waves
land `[paint-pending]` and a SEPARATE workflow (`bg-paint.wf.js`) flips them DONE out-of-band (W-REFLECT3 / late
sweep). The DAG-LOADER instruction (line 136) says a PAINT-PENDING row "is DONE-building and MUST NOT re-enter the
build frontier." **But `ready()` (line 100) requires each precond `status==='DONE'`, and `PAINT-PENDING ≠ DONE`.**
So any wave whose precond is a [P] wave that is still PAINT-PENDING is **NOT ready** — it stalls until the
out-of-band paint workflow flips the precond to DONE. The intent ("done-building") and the gate ("DONE only")
contradict. In the live cursor `3.1` and `3.6` sit PAINT-PENDING; any successor encoded with `3.6` as a precond
(e.g. the WS3 chromatic band, WS2 `4.1` "WS3 blur peer", WS4 leaf-carves) cannot fire until paint catches up. The
frontier therefore depends on the paint workflow keeping lockstep, or it escalates to the human gate (line 159–162
"No ready waves — stuck"). This is the cardinal headless/paint decoupling re-expressed as a DAG hazard.

---

## 4. CROSS-PHASE / BACKWARD EDGES (the WS-phase prose under-describes the real fire order)

- **WS2 `4.3 BG.W-DOCK-CUT` depends on WS6 (built LATER).** Build-map WS2 #3 + EXEC 4.3: delete
  `useDockContextSilhouette` *"AFTER WS6 confirms unwanted (R7) · Precond: WS6 coordination."* WS2 is phase 4, WS6
  phase 8. So `4.3` **cannot close in its WS2 slot** — `ready()` blocks it until a WS6 node is DONE; it sits
  PENDING through WS2/WS5 and only fires in/after WS6. The "WS2 11-wave order" prose implies `4.3` lands within
  WS2; it can't. (Not a cycle — WS6 SIRI does not depend on `4.3`.) MEDIUM.
- **WS7 close-gates depend on WS8 (built later) — acknowledged.** `12.8 BG.W-SAFARI-PARITY-GATE` (WS7) precond is
  *"WS8 `BG.W-GLASS-REFRACT-WEBGL`"* (`13.2`). WS7=phase 12, WS8=phase 13. The gate is homed in the WS7 close
  machine but closes after WS8; resolved by preconds + the fact the cut (`19.1`) is the last core wave. This is the
  same "homed for organizational clarity" pattern as G4 — the difference is it's *acknowledged* and (unlike G4) its
  precond IS in the prose. LOW–MEDIUM, but it confirms the WS-phase headers are NOT the fire order.
- **`BH.B4f` (rm CLAUDE.md) is NOT gated on `BG.W-CUT`.** The engine instruction (line 137) requires B4f's preconds
  to include "every WS12 wave id + B5c + B2.6 + B4e + B4b-content" — **`BG.W-CUT` is absent.** The "rm is the
  absolute-last act AFTER the tag" guarantee rests instead on: (i) `interleaveClass==='WS12-LAST'` →
  `interleaveReady` returns `false` UNCONDITIONALLY (line 93), so B4f never auto-fires; (ii) the `cutReady` read
  (line 243) + the user-gated halt. The engine comment at line 93 promises "released only by the explicit precond
  gate below" — **there is no such gate; B4f is intentionally human-only.** Net: safe by the manual-gate design,
  but the ordering is enforced by code-shape + a halt, NOT by an encoded `CUT→B4f` edge, and the comment is
  misleading. LOW (record so a future refactor that auto-fires WS12-LAST doesn't delete CLAUDE.md pre-tag).

---

## 5. POSITIVELY VERIFIED (the plan is right here)

- **No cycles.** Acyclic across all 12 WS + BH tail.
- **The G2 fence-widen is real + correctly identified.** `bg-paint.wf.js:22` FENCE admits ONLY
  `EXECUTION-PROGRESS.md` + `docs/tranches/BG/audit/visual/` — it does NOT admit `audit/reflect/`. G2's keystone
  needs to write `audit/reflect/` (roster verdict cells), so the planned widen is a genuine, necessary, still-
  PENDING edit. Correct.
- **G3/G2/G6/G7 relative positions are coherent.** `12.4b CLOSE-SWEEP` precond `12.0` (the HARD P-CLOSE→P-SWEEP
  edge is in the prose); `12.4a GESTALT-CURSOR-PARITY` precond STAGE-0 roster + WS1 routeSeeds; `3.12
  EYEBROW-LIGHT-POLISH` (WS3) precedes its `resolvedBy` consumer `12.5` (WS7); G7 `6.3`/`6.7` (WS5) + `18.11` B7.
  All correctly ordered. Only **G4** is mis-seq'd.
- **The live-fix DONE rows (LX.1–3 / D-1/D-2/D-3) are real commits** (`07c6e6ec`/`e40e5095`/`8947288a`), git-
  confirmed, and were genuinely outside the wave DAG (direct-to-branch), consistent with the seed.

---

## 6. OPEN ITEMS FOR PASS 2 (cross-read, not yet resolved)

- **Possible double-ownership of `liquid-morph.css` (850L) rehome:** `3.11 BG.W-DEMO-STYLE-REHOME`
  ("WHOLE-rehome … SEQUENCE LAST" in WS3) vs `12.1 BG.W-SPIKE-DELETE` ("`liquid-morph.css` (850L) demo-rehome").
  If `3.11` rehomes it, `12.1`'s rehome is stale. PLAUSIBLE — verify which wave actually owns the move.
- **`useGlassBackdropLuminance.ts` triple-touch chain** (`2.4` WS1 DONE → `3.5` WS3 `:448` → `10.13` WS4 carve):
  the precond `3.5 AFTER WS1`, `10.13 AFTER WS3-M5` is in the prose; confirm the DAG LOADER will encode the
  `2.4 → 3.5 → 10.13` order and that `3.5` is not blocked by `2.4`'s PAINT-PENDING-vs-DONE state.
- Whether the DAG LOADER reliably parses "WS6 coordination" / "after WS5" prose into the correct specific wave-id
  preconds (the meta-risk of §0).

---

## 7. VERDICT

The DAG is **acyclic and mostly coherent in its declared edges**, but it is **not statically enforced** — it is
re-derived each boot by an LLM from prose, with `seq` as the only tiebreaker. The single load-bearing defect is
**G4 `BG.W-CLOSEFIX-9SITE`: declared "LANDS FIRST" but seq-ordered LAST, precond-unbound on its WS1/WS3 successors,
and already violated in the live cursor** — WS3 `3.6` has even pre-empted G4's own dock-blur deliverable, leaving
G4's "9-site atomic, byte-identical-to-HEAD" spec stale against a moved baseline. Secondary: PAINT-PENDING does not
satisfy a precond (decoupled-paint stall), WS2 `4.3` inverts against WS6, and B4f's "after-the-tag" guarantee rests
on code-shape not an encoded `CUT→B4f` edge. None breaks acyclicity; all are ordering/enforcement gaps the amended
plan should encode (G4 as an explicit precond of every ladder/shell-touching WS3 wave + a re-derivation note) or
explicitly accept.

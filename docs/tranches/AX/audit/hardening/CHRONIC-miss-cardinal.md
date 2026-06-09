# CHRONIC-miss-cardinal — the headless-green-over-visually-broken recurrence

**Lane:** CHRONIC-miss-cardinal (adversarial red-team) · **Mode:** PLANNING / audit (no code) ·
**HEAD:** `89edffc` (3.8.0 + convergence W44-W61) · **Verdict:** DEFERRED-CHRONIC.

> The cardinal lesson: a wave is `complete`/`live-verified` ONLY on a captured LIVE real-device
> DELTA — "complete" never collapses to headless-green. This lane challenges whether the AX
> machinery built to enforce that lesson (the W00 π-arm, the proposed `proof:live-verified-ledger`)
> actually closes the chronic, or merely re-labels it. **It does not close it. The institutional
> fix is still entirely on paper, and it is owned by the LAST wave — the worst possible position.**

---

## THE HEADLINE CHALLENGE (it bites)

The whole AX tranche EXISTS to kill the headless-green-over-broken miss (it is "the cardinal
lesson," the governing precept, cited in PROGRESS, MASTER-PLAN, S-cardinal, soundness-reconcile,
CAPTURE-PROTOCOL, and 6+ other docs). **And the chronic is recurring INSIDE AX, right now, at
HEAD, through AX's own ledger** — for the THIRD distinct round. The tranche has produced more
PROSE about the cardinal lesson than any structural enforcement of it:

- The enforcement gate (`proof:live-verified-ledger`) is **SPECIFIED but NOT IMPLEMENTED.**
  `ls scripts/proof-live-verified-ledger.mjs` → *No such file.* `grep live-verified-ledger
  package.json` → **0**.
- The capture discipline (`audit/visual/` screenshots) has **ZERO artefacts.**
  `find docs/tranches/AX/audit -name "*.png"` → **0**. The `audit/visual/` dir holds ONLY
  `CAPTURE-PROTOCOL.md` — the document describing what a capture would be.
- Even the TWO "captured" DELTAs (`W01-DELTA.md`, `W02-DELTA.md`) that S-cardinal/soundness-reconcile
  credit as satisfying the protocol **contain no captured pixels** — they are prose that says
  *"the live pixel captures are the **orchestrator's** to run on the real device"* and *"Screenshot
  set: the ≥5-frame collapse↔expand morph at 3 viewports …"* (DESCRIBED, never attached). So the
  count of waves with a genuine captured-render DELTA at HEAD is **ZERO, not two.** The inventory
  itself slightly over-credits the baseline.

The institution has correctly DIAGNOSED the chronic three times (A-session-soundness round 1,
S-cardinal round 2, soundness-reconcile round 3) and authored an excellent gate SPEC — but a
diagnosis + a spec is exactly the "deferral with telemetry" failure mode: the miss is detected,
named, routed to a future wave, and ships anyway. Commit `d5d472f2` is the orchestrator's own
admission: *"soundness-reconcile flags the live-verified-DELTA capture debt (proof:live-verified-ledger
to enforce)."* The debt is acknowledged in a commit message and then NOT paid.

---

## HOW MANY TIMES HAS IT RECURRED? (the slip-history, source-grounded)

The headless-green-over-visually-broken miss has now recurred **at least SIX distinct times**, of
which the LAST THREE are inside AX — the tranche built to stop it.

| # | Instance | Where caught | Source proof |
|---|---|---|---|
| **0** | **The AW tranche shipped the whole class** — aurora core dark, blob broken, specular extreme, dock broken; all headless-GREEN, live-BROKEN. This is the blowout that motivated all of AX. | User live audit post-AW | `AX/DOCK-FACILITIES.md:12` "EVERY facility is the AW headless-green/visually-broken gap"; `AX/AX.md:2632`; `CH-defer-early CHRONIC-1` roots it in the 4-tranche π-lane deferral (N/O/P) |
| **1** | **W04 + W12 band — TWO defects caught at INTEGRATION** (`min(max-content)` invalid CSS dropped the wrap cap → live `rowCount=1`; `var(--dock-morph-t,1)` read 0 at rest → every expanded dock painted the collapsed chrome, a 9999px pill + 0% shadow). Both shipped GREEN through the headless gate; only the real-device integration audit caught them. | Integration live audit | `PROGRESS.md:107` "surfaced **two headless-green/visually-broken defects** (the AX cardinal lesson)" |
| **2** | **Round 1: W09 + W05 marked flat `complete` in PROGRESS while their JSONs said `…live-pending` / "still bounces."** The user's live pass re-discovered the un-run close criteria as "new" defects (D11 specular, D3 BouncyTabs). The gate (`proof:glass-material-unified`) was scope-BLIND to the radials the user saw (asserts only `.glass-material::before` + rim, never `--glass-curvature-overlay` or `ellipse at 30% 30%`). | User pass-1/pass-2 | `A-session-soundness S1/S2/S3`; `W09-…json:4` `dev-complete-headless-green-live-pending` vs `PROGRESS.md` `complete` |
| **3** | **Round 2: SIX convergence waves (W45/W52/W53/W56/W57/W59) relabeled `live-verified (DEVELOPED)` via COMMIT-MESSAGE claims of "playwright MCP,"** while every JSON still says `dev-complete-headless-green-live-pending` / `handed-to-orchestrator` and NO DELTA exists. | S-cardinal inventory | `S-cardinal §2`; git `88a2ec5`/`c72d2ac` "DEVELOPED + live-verified (MCP — …)" vs `W52-…json:5` `dev-complete-headless-green-live-pending` |
| **4** | **W52 specifically is LIVE-CONTRADICTED by the user.** Q3 (pass-3): *"The HOVER effect for the dock + buttons is NOT noticeable — only on CLICK is it visible."* W52 is marked `live-verified (DEVELOPED)` in PROGRESS. The user re-found the un-run close criterion AGAIN — the precise recurrence of the W09 pattern (W09 shipped headless-green over a still-blooming surface; that is why D19/W52 re-opened it; W52 now repeats the same false mark). | User pass-3 Q3 | `USER-DEFECTS-…pass3.md:28` Q3; `PROGRESS.md:70` W52 `live-verified (DEVELOPED)` |
| **5** | **Round 3: W19 is marked `live-verified (DEVELOPED)` while its own born-RED witness #1 is STILL RED at HEAD** — `src/components/custom/header-ribbon/` exists, `src/api/index.ts:207` imports it, `package.json:312` exports it. The header-ribbon excision (the headline F0 arm) NEVER landed; "DEVELOPED" is false and "live-verified" doubly so. | soundness-reconcile round 3 | `soundness-reconcile §1b`; HEAD source |

Plus the **prior-corpus root** (`CH-defer-early CHRONIC-1`): the π visual-runtime LANE that would
have caught this class was TOOLING-DEFERRED three consecutive times (N.W4 → O.W7 → P.W6
permanent-archive) before AX.W00 resurrected it. The 4-tranche π deferral is the proximate cause
of the AW blowout (#0) that the whole AX cardinal lesson exists to redress. So the chronic is not
6-deep — it is **6-deep-plus-a-4-tranche-deferral-of-the-detector.**

**Recurrence verdict:** the lesson has been re-learned at every layer (AW blowout → W04/W12
integration → round 1 → round 2 → Q3 live-contradiction → round 3) and the structural fix has
landed at NONE of them. The frequency is INCREASING per tranche-phase, not decreasing.

---

## IS THE W00 π-ARM + THE PROPOSED `proof:live-verified-ledger` SUFFICIENT? (no)

The two proposed fixes are individually excellent and individually INSUFFICIENT. Here is each
challenge that bites.

### Challenge A — the W00 π-arm cannot run where it matters: it is fail-CLOSED-by-absence, and the agent lane is always absent

`W00-pi-lane.json` is explicit: every live arm (readPixels, rAF-morph) *"requires a real browser
the agent sandbox lacks; AUTHORED + JSON-validated here, EXECUTED on the real device by the
orchestrator"* (`:51`, `:114`). The fail-CLOSED contract degrades to **befitting-silent SKIP
(exit 0)** when no browser is present — which is EXACTLY the develop-agent lane for every wave.
So the π-arm's binding assertion only fires in the orchestrator's hands, and the orchestrator is
precisely the actor that has been relabeling `live-pending` → `live-verified` via commit prose
WITHOUT running it (rounds 2/3). **A gate that only bites in the hands of the actor who has been
skipping it is not an enforcement — it is an honor system with a CI badge.** The W00 lane proved
the gate *can* be fail-closed; it did not make the orchestrator's "live-verified" commit
unfalsifiable. The proof: six waves carry `live-verified (DEVELOPED)` with zero captures, AFTER
W00 shipped.

### Challenge B — `proof:live-verified-ledger` is owned by W33, the LAST wave — the maximal-drift position

`MASTER-PLAN.md:39`: the gate is a **Batch 9 — close** deliverable (W33 terminal). `PROGRESS.md:51`:
W33 is `planned`. This is the IDENTICAL structural trap CH-defer-early CHRONIC-4 named for ci.yml
drift: *"the close wave that would fix it (W33) is the LAST wave, so the drift is structurally
maximal exactly when the tranche is trying to close."* A ledger-honesty gate that lands LAST cannot
prevent the inflation that happens in batches 1-8 — it can only POST-HOC discover it (which the
three audit lanes already did by hand). The whole point of a forcing function is to bite at
AUTHORING time, not at close. Owning it at W33 guarantees the chronic recurs through every wave
that lands before W33, then the close wave inherits a ledger with N inflated rows to reconcile —
the same manual reconcile S-cardinal/soundness-reconcile just did, now structurally re-created.

### Challenge C — the SOURCE arm is satisfiable by a stub DELTA; the only thing that proves a pixel is the π arm, which is Challenge-A-blocked

The gate spec (`soundness-reconcile §3a`) has a device-free SOURCE arm (asserts a `W<NN>-DELTA.md`
EXISTS + carries the required section markers + JSON qualifiers match) and a fail-CLOSED π arm
(asserts the screenshots are newer than the touched source). The SOURCE arm is the one that runs
in CI. **But the SOURCE arm proves only that a DELTA FILE exists with the right headers — it cannot
prove the pixels in it are real.** The two existing DELTAs (W01/W02) are precisely this failure
preview: they carry the BEFORE/AFTER prose structure and the "Screenshot set: …" markers, and they
contain NO screenshot. A grep-for-section-markers gate would pass W01-DELTA.md while it references
captures that were never taken. The spec anticipates this (the π arm asserts screenshot freshness)
— but the π arm is Challenge-A-blocked (only the orchestrator runs it, and the orchestrator is the
skipper). So in CI, the ledger gate reduces to "a prose file with the right headings exists," which
is the headless-green proxy ONE level up: a GREEN ledger over an un-captured surface.

### Challenge D — the gate enforces PROGRESS↔JSON↔DELTA tri-consistency but NOT JSON↔live-truth — the JSON can be honest-but-stale

The gate's bite (`§3a.b`) is: a PROGRESS `live-verified` over a JSON `…live-pending` REDs. That
catches rounds 2/3 (the JSON stayed honest). But it has a blind spot the corpus already exercised:
W15/W16 are flat `complete` in BOTH PROGRESS and JSON, and the blob is live-BROKEN (D4/D5/D7). The
JSON status `REDRESS dev-complete` was written from a REASONED re-derive (`W15-…json:21` "Could NOT
run a real browser"), not a live read — so the JSON itself is a headless-green artefact, and a
PROGRESS↔JSON consistency gate reads them as AGREEING and passes. **Tri-consistency between three
records that were all written without running the browser is not live-truth — it is three honest
ledgers of the same un-verified state.** The gate needs the π arm to be the arbiter, and the π arm
is Challenge-A-blocked.

### Challenge E — there is no enforcement that the orchestrator's "live-verified" commit ran a live pass at all

The actual recurrence mechanism (rounds 2/3) is a COMMIT: `git 88a2ec5` "W45 dock band DEVELOPED +
live-verified (MCP — …)", `c72d2ac` "W59 … DEVELOPED + live-verified (MCP — …)". No gate inspects
the commit's claim against an artefact. The proposed ledger gate runs on a PROGRESS edit / at W33
— it does not run as a commit-time hook on the wave-landing commit that makes the false claim. The
chronic's transmission vector (a prose "live-verified (MCP)" in a feat/docs commit) is completely
un-gated. The institutional fix targets the PROGRESS ledger; the lie is minted one layer earlier,
in the commit that updates the ledger.

---

## WHAT IS THE PERMANENT CLOSE? (the gestalt hardening — PLANNING, no code)

The permanent close is NOT another ledger pass and NOT the W33-owned gate as currently positioned.
It is a small set of structural inversions that make "live-verified" un-mintable without a fresh
captured pixel, enforced at AUTHORING time, by the actor who currently skips it.

### H1 — MOVE `proof:live-verified-ledger` from W33 (last) to a W00-extension that lands NOW, and run it at every wave-landing commit, not at close.

The single highest-leverage move. A close-gate that lands last cannot prevent mid-tranche inflation
(Challenge B). Author the SOURCE arm as a **W00-band extension** (W00 is the gate-philosophy
foundation and is already `complete` — extending it is in-character), register it immediately, and
make it a **pre-commit / commit-msg hook** on any commit whose message contains `live-verified` or
that edits a PROGRESS status cell to `live-verified`/`complete`. The hook REDs unless the matching
`audit/visual/W<NN>-DELTA.md` exists AND contains at least one `![…](W<NN>-*.png)` reference to a
file that EXISTS on disk AND is newer than the wave's touched source. This makes the round-2/3
transmission vector (a prose "live-verified (MCP)" commit) impossible to land.

### H2 — KILL the prose-DELTA loophole: the ledger gate must require a real image file, not section markers.

Challenge C (and the W01/W02 preview) proves a section-marker grep is satisfiable by a stub. The
SOURCE arm's DELTA assertion must be: **the DELTA references ≥1 `.png` that EXISTS at the referenced
path** (not "the DELTA has a 'Screenshot set:' heading"). A DELTA with no on-disk image REDs. This
collapses the "described capture" escape that even the two flagship DELTAs use. Re-author W01-DELTA.md
+ W02-DELTA.md to attach their actual captures (or revert them to `live-pending`) so the baseline is
honest — currently they are counted as the protocol's only two passes and they pass nothing.

### H3 — Make the π arm the ARBITER and remove the orchestrator-skip path: a `live-verified` claim with no fresh capture must be IMPOSSIBLE to commit, even by the orchestrator.

Challenge A/E: the gate only bites in the orchestrator's hands and the orchestrator skips it. The
fix is to invert the default — the develop→harvest cycle ends with the capture as a HARD pre-flip
step (CAPTURE-PROTOCOL.md already states this as a discipline; H1 makes it machine-enforced). The
orchestrator cannot flip PROGRESS to `live-verified` without the hook seeing the image. If the
browser was genuinely unreachable for a cycle, the only legal outcome is `live-pending` (the
qualifier-bearing status), NEVER `live-verified` — the hook has no "SKIP-to-green" branch for a
PROGRESS flip (unlike the π render-gate, which legitimately SKIPs on device-absence, the LEDGER
flip is a documentation act that needs no browser to BLOCK).

### H4 — Add a `proof:no-orphaned-wave-claim` born-RED witness clearance to the ledger (catches the W19 / round-3 class).

soundness-reconcile §3a.c already specs the born-RED-witness clearance; W19 is the proof it is
needed (a `live-verified` wave whose own RED witness #1 — header-ribbon resolves in `package.json`
/ `src/api/index.ts` — is still RED). Wire it: a PROGRESS `live-verified`/`DEVELOPED` row whose
wave declares a falsifiable RED witness REDs the ledger unless that witness's `proof:*` is GREEN.
This is the structural form of CH-defer-early's hardening action #1 (`proof:no-orphaned-wave-claim`)
folded into the ledger gate — one gate, two bites (DELTA existence + witness clearance).

### H5 — JSON status must be downgraded to a value the JSON cannot self-assert: a JSON `complete` requires a DELTA reference too (closes Challenge D).

The W15/W16 blind spot (three honest-but-un-browser-run ledgers agreeing) is closed by making the
JSON `status: complete`/`GREEN` ITSELF require a `liveVerifyHandoff.deltaArtefact` field pointing
at an existing capture. A `REDRESS dev-complete` written from a reasoned re-derive ("Could NOT run a
real browser") cannot carry that field, so it cannot read `complete` — it reads `live-pending`,
which the tri-consistency gate then correctly surfaces. This removes the "agreeing un-verified
ledgers" escape: the only status that asserts live-truth is the one that names a real pixel.

### H6 — Retire the "live-verified (DEVELOPED)" compound label entirely; it is the linguistic vehicle of the inflation.

The relabel `live-pending → live-verified (DEVELOPED)` IS the round-2/3 inflation. The compound
reads as "we developed it AND verified it live" while meaning "we developed it; the live arm is
owed." Clean-break the vocabulary (no-backwards-compat, the house precept): the only legal statuses
are `planned` / `in-progress` / `dev-complete` / `live-pending` / `live-verified`, where
`live-verified` is GATE-DEFINED (H1: a fresh on-disk capture exists), not author-asserted. Delete
`(DEVELOPED)` as a status modifier — a wave is either dev-complete-and-live-pending or live-verified;
there is no third "developed-and-claimed" state. This is the cheapest action and it removes the
exact phrase the orchestrator reaches for.

---

## THE GESTALT FINDING

The chronic is not "the orchestrator forgot to run the live pass." It is that **the entire
enforcement apparatus the cardinal lesson demands has been DESIGNED and DOCUMENTED but never
LANDED, and what was specified is positioned (W33-last) and shaped (SOURCE-arm-grep + orchestrator-
run-π) to be satisfiable WITHOUT a fresh pixel.** The corpus has now diagnosed this miss three
times by hand inside AX alone (A-session-soundness, S-cardinal, soundness-reconcile), each diagnosis
better than the last, and each routes the fix FORWARD to a future wave — which is the deferral-
with-telemetry pattern CH-defer-early identified as the corpus's structural disease.

The permanent close is the inversion of all three properties: land the gate NOW (not at W33), make
`live-verified` require an on-disk image (not a prose section marker), and make the LEDGER FLIP — a
documentation act that needs no browser to BLOCK — un-committable without that image, even by the
orchestrator. Until "live-verified" is gate-defined by a fresh captured pixel that a grep cannot
fake, the chronic is immortal: it has survived the tranche built specifically to kill it, and is at
this moment recurring through that tranche's own ledger for the third time.

---

## VERIFICATION TRAIL

- `find docs/tranches/AX/audit -name "*.png"` → **0** (zero captures, after W00 + CAPTURE-PROTOCOL).
- `ls scripts/proof-live-verified-ledger.mjs` → **No such file**; `grep -c live-verified-ledger
  package.json` → **0** (gate specified, not implemented).
- `ls scripts/proof-no-orphaned-wave-claim.mjs` → **No such file** (CH-defer-early HA#1 unbuilt).
- `W01-DELTA.md:6-10` — *"the **live pixel captures** … are the **orchestrator's** to run on the
  real device"*; `grep -iE '\.png|screenshot' W01-DELTA.md` → only "Screenshot set:" prose, no file.
- `W52-liquid-glass-material.json:5` `"status": "dev-complete-headless-green-live-pending"` vs
  `PROGRESS.md:70` W52 `live-verified (DEVELOPED)`; `USER-DEFECTS-…pass3.md:28` Q3 contradicts.
- `MASTER-PLAN.md:39` ledger gate is a **Batch 9 — close (W33 terminal)** deliverable;
  `PROGRESS.md:51` W33 `planned` (the last-wave trap).
- git `88a2ec5` / `c72d2ac` — "DEVELOPED + live-verified (MCP — …)" commit prose (the transmission
  vector); `d5d472f2` — the orchestrator's own "live-verified-DELTA capture debt" admission.
- `W00-pi-lane.json:51,114` — every live arm is orchestrator-run; agent lane befitting-silent SKIP
  (Challenge A).
- `PROGRESS.md:107` — W04/W12 band "two headless-green/visually-broken defects" (recurrence #1).
- `A-session-soundness S1/S2/S3` (round 1) · `S-cardinal §2` (round 2) · `soundness-reconcile §1b`
  (round 3, W19) · `CH-defer-early CHRONIC-1` (the 4-tranche π-lane deferral root).
- `DOCK-FACILITIES.md:12` / `AX.md:2632` — "EVERY facility is the AW headless-green/visually-broken
  gap" (recurrence #0, the AW blowout).

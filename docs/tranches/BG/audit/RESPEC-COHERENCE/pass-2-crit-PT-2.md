# PT-2 — ADVERSARIAL CRITIQUE (Pass 1) — "rides W-REFLECT3" re-home + G8 re-green + decoupled-paint adjudication

**Subject artifact:** `pass-1-proto-PT-2-reflect3-rehome.md` (worktree `wf_222d5cb1-a77-11`).
**Stance:** READ-ONLY hardening. Independently reproduced; siblings-intact exit 0 before+after.
**Bottom line:** the gate-clear is REAL and the KEEP-DECOUPLED verdict is sound engineering — but the spike proves feasibility on ONE file while the *coherence* issue lives in THREE places the spike leaves open, and a single-file application of the re-home actively INTRODUCES a new cross-file contradiction (the very friction class it cures). FEASIBLE, NOT yet develop-ready.

---

## What independently CHECKS OUT (the resolver is right here)

- **Born-RED reproduced at HEAD `6c1f5386` (main repo, not trusted from prose).** `node scripts/proof-ba-gestalt.mjs` → `G8 no-terminal-reflect: 2 files scanned — 2 DEFERRAL HIT(S)` at `EXECUTION-PROGRESS.md:38` and `:113`. The G8a detector is `/\brides?\s+(?:the\s+)?W-REFLECT\d/i` (`proof-ba-gestalt.mjs:358`); scope is `waves/*.md` (absent) + `**/PROGRESS*.md` (`g8ScopedFiles`, :414).
- **Scope is exactly one live file.** `find … -iname '*PROGRESS*.md'` → only `EXECUTION-PROGRESS.md` carries a `rides W-REFLECT\d` form; `BG.W-SCROLL-PROGRESS-RAIL-DELTA.md` + `D5-scroll-progress-bar-confirmed.md` are in scope but carry none.
- **The mechanism is sound.** The re-home noun-phrase avoids `rides`/`W-REFLECT\d` AND `gestalt verdict staged|deferred`, so it clears G8a without re-tripping G8b. Corpus G8b grep is clean (zero `gestalt verdict (staged|deferred)`). No gate edit, no quote-dodge — the re-home alone clears it.
- **The adjudication is correct in KIND.** `bg-paint.wf.js` IS a per-wave non-authoring verdict engine (fresh dual-engine captures, per-wave DELTA, per-wave cursor-flip), structurally different from BB's single terminal W-REFLECT3 wave. KEEP-DECOUPLED-WITH-GUARDS is the right call — re-coupling would serialize the device-free frontier behind GPU+Safari capture.

---

## HARDENING Q1 — "resolve across ALL waves it touches, not just the one named?" → **NO, not as built.**

### H-1 (HIGH) — the single-file re-home INTRODUCES a new cross-file contradiction
`EXECUTION-PROGRESS.md:38` at HEAD reads:
> "…the NON-AUTHORING dual-engine paint verdict **rides W-REFLECT3 / the WS12 late capture sweep**, NOT the build frontier."

The spike re-homes it to "…resolves at the wave's OWN decoupled-paint close (… NOT a terminal reflect wave) …" — which strips BOTH deferral targets, including **the WS12 late capture sweep**. But `bg-build-map.md` STILL ships that deferral verbatim, un-re-homed:
- `:952` D-G2 deferral table: "**the WS12 late capture sweep (all 10 roster surfaces, Model-B)** … Proven by **WS12 `BG.W-PAGE-COMPONENT-AUDIT`** + the close"
- `:544` "*Build-phase deferral:* the WS12 late capture sweep (Model-B — captures all 10 roster surfaces once …)"

So applying the re-home to EXECUTION-PROGRESS **alone** flips that file to "per-wave self-close" while the build-map's D-G2 still says the 10 roster verdicts are produced at the terminal WS12 sweep. Before the edit the two files AGREED (both deferred). After a one-file edit they DISAGREE. **The fix, applied as the spike applies it, manufactures a fresh instance of the exact multi-source-disagreement friction class PT-2 exists to kill.** The re-home is only coherent if EXECUTION-PROGRESS **and** bg-build-map (D-G2 :952, :544, + the 7 W-REFLECT3 refs) are re-homed in LOCKSTEP.

### H-2 (HIGH) — the build-map SOURCE (the actual blast-radius-61 lever) is untouched and under-framed
`bg-build-map.md` carries **7** `W-REFLECT3` references: two live `rides` forms (`:198`, `:655`) PLUS five proving-wave references (`:468`, `:575`, `:675`, and the D-G4/D-G6 deferral-table rows `:951`/`:953`). The spike's §3a fixture proves a `waves/*.md` row transcribed from a `rides W-REFLECT3` source WOULD red G8a — so re-homing the build-map is the structural fix. The resolver lists this as "owed to PASS-2" but frames it as *phrasing*. It is more than phrasing: the build-map names **W-REFLECT3 as the proving wave** for D-G4/D-G6, yet **no `W-REFLECT3` node exists in the BG DAG** (`WS1→…→WS12`, the closest is WS12 `BG.W-PAGE-COMPONENT-AUDIT`). So "W-REFLECT3" in the build-map is a STALE/phantom inheritance from BB, not a real BG wave — re-homing it is a *semantic reconcile* (what wave actually proves D-G4/D-G6?), not a find-replace.

### H-3 (MEDIUM) — the §4 guard(b) cadence CONTRADICTS the build-map's own DAG
The verdict's safety rests on guard **(b): "fire `bg-paint.wf.js` INTERLEAVED per-band (never one terminal end-sweep over an accrued backlog)."** But WS12 `BG.W-PAGE-COMPONENT-AUDIT` [P] (`bg-build-map.md:808`) is precisely a terminal end-sweep: "**the 480-capture dual-engine both-modes verdict POST-INTEGRATION** … *Precond:* **WS1–WS11 ALL LANDED**," and D-G2 routes the 10 roster surfaces' capture INTO it. The artifact never disambiguates **WS12-as-final-congruence-audit** (legitimate; arguably P5-mandated — auditing the assembled WHOLE) from **WS12-as-roster-paint-backlog-drain** (the BB disease guard(b) forbids). As written, guard(b) and the build-map's WS12 are in open tension; the KEEP-DECOUPLED verdict leans on a guard the DAG currently violates. PASS-2 must decide which WS12 is, and reconcile D-G2 accordingly.

---

## HARDENING Q2 — "introduce a NEW friction-class repeat?" → **YES (latent), via orphaned canon + variant sprawl.**

### H-4 (MEDIUM) — the canonical phrase is ORPHANED; the hand-off defers to a superseded table
The artifact (`:55`, §5.1) defers canonical authority to "PT-1's pass-1-proto-PT-1.md Bucket A/B/C/D table … the authoritative replacement table." But PT-1's CURRENT proto opens (`pass-1-proto-PT-1.md:7`) by **superseding** the prior PT-1 file that "carried PT-2's 'W-REFLECT3 re-home' content (§2.G1)" and states "§2.G1 is PT-2." Grep of the current PT-1 proto finds **no Bucket A/B/C/D table and no re-home canon**. So PT-2 defers its canonical phrase to a table that no longer exists — and PT-1 has explicitly handed re-home ownership BACK to PT-2. Net: **no authoritative phrase exists on disk.** Meanwhile the corpus already floats ≥3 benign variants of the concept — "the wave's own paint-close" (`PIPELINE-VALIDATION-DELTA.md:89`), "the wave's OWN close," and now the spike's "decoupled-paint close." G8a does not red the benign variants (no `W-REFLECT\d`), so they pass the gate while remaining conceptual incoherence — the SAME multi-phrasing drift, just below the gate's teeth. Unless PASS-2 mints ONE phrase **under PT-2 ownership** (not by deferring to the vanished PT-1 table), the re-home swaps a gate-RED idiom for a gate-GREEN but un-unified idiom.

---

## VERDICT
The resolver's three load-bearing claims hold: G8 born-RED→GREEN is real, transcription-safety is demonstrated, KEEP-DECOUPLED-WITH-GUARDS is the right engineering. What the resolver UNDER-weights is that "feasible on the one in-scope file" is not "resolves the coherence issue": the re-home must land **atomically across EXECUTION-PROGRESS + bg-build-map (D-G2 + the 7 refs + the WS12-sweep semantics) + AMENDED + FINAL**, it must **disambiguate WS12** (final-audit vs backlog-drain) so guard(b) stops contradicting the DAG, and it must **mint one canonical phrase under PT-2** rather than cite a superseded PT-1 table. These are bounded, concrete PASS-2 reconciles — not feasibility blockers — which is why this lands FEASIBLE-but-not-develop-ready.

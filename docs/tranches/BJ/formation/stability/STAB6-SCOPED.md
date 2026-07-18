# STAB6-SCOPED — the post-chain amendment confirm (fresh Fable seat, wrote none of it)

Scope: NOT a fresh full stability pass. The consecutive-clean chain already closed
(STAB3 AMEND(2) → cure → STAB4 CLEAN → STAB5 CLEAN). One user-ordered amendment landed AFTER the
chain (`ee20675c`, one commit past STAB5's `99d1d966`), touching exactly two files — `PLAN.md` §4
and `waves/BAND-MATERIAL.md`. My charter is narrow: confirm THAT amendment introduced no
incoherence, nothing wider. I assumed the edit broke something and hunted for it.
TRANCHE-DEVELOPMENT: this is the only file written; no source, no commits.

Method: (1) read PLAN §4 in full against §2 roster + §3 laws — the phased model rule and the hallmark
lane; every cited wave ID walked to its source. (2) BAND-MATERIAL in-scope summary + W7 header vs the
intro table (W1–W7) and the W7 section body. (3) one grep — `STAB1 MAJOR-1 cure` — to confirm zero
hits outside the stability reports.

---

## VERDICT: CLEAN — 0 BLOCKER · 0 MAJOR · 0 MINOR

The amendment is internally coherent, contradicts neither §3's laws nor §2's roster, and every wave
it names is real and accurately characterized. The two MATERIAL NOTE-tidies close the one open
STAB-chain NOTE (the W7 header/body phrasing mismatch that STAB2c/STAB3/STAB4/STAB5 each carried) and
fill the one gap they didn't (the in-scope summary now reaches W7). The chain stays honest.

---

## 1. PLAN §4 — the phased model rule + the hallmark lane

**The phased rule (`PLAN.md:299-303`).** "From the formation close until EXECUTION begins: ALL
workflows/seats run FABLE, mechanical included. At execution the standing split returns: Fable for
design/judgment/audit/critique + paint-taste; Opus for mechanical fanout + workflow implementation."
Internally coherent — a bounded window (formation-close → execution-start) with an explicit
return-to-baseline. No contradiction with §3 (§3's six laws are the completion model — born-RED,
liquid-weight, breath-of-life, live-π, pipe-trap, A08/J11 challenge-pass — none names a model
assignment; the challenge-pass "two fresh critics" simply run Fable under the phased window). No
contradiction with §2 — §2 GF-HANDMARK already reads "All handmark design waves run Fable"
(`:242`); the phased rule generalizes rather than fights it.

**The hallmark lane (`PLAN.md:304-309`).** Every cited surface exists and is named correctly:

| §4 citation | roster truth | verdict |
|-------------|--------------|---------|
| the FOUR greenfields (dock, handmark, aurora, blob) | §2 `:231-252` GF-DOCK / GF-HANDMARK / GF-AURORA / GF-BLOB — all four present, all π OWED (design/paint work outstanding) | real |
| landing/catalog hallmark pages (STORY W4/W5) | §2 `:161-166` W4 `BJ.W-WIDTH-HIERARCHY-TRUTH` (the section-landing + CatalogLanding hero/width hierarchy) + W5 `BJ.W-PREVIEW-CARD` (the catalog-home masonry preview cards); BAND-STORY `:33,:373,:400` corroborate landing + catalog surfaces | real + accurate |
| material identity waves (MATERIAL W2/W3, subtlety re-tune + graded-backdrop) | §2 `:189-195` W2 `BJ.W-BLUR-LADDER` (the "subtler" re-tune — BAND-MATERIAL band-framing + the W2 speedtest inbound both call it the subtler re-tune) + W3 `BJ.W-GRADED-BACKDROP-JUDGE` | real + accurate |

The lane is a complement to the phased rule, not a collision: at execution the general split hands
mechanical work to Opus, but "Mechanical fanout never substitutes for this lane on a hallmark
surface" carves the hallmark surfaces back to Fable-via-DesignSync. Coherent.

## 2. BAND-MATERIAL — the in-scope summary + the W7 header

**In-scope summary (`:685-691`).** Now enumerates W1–W7. Each clause maps 1:1 to the intro table
(`:35-47`): W1 radius role-table + reconciles + repoints; W2 blur ruling + DPI-arm + repoint; W3
graded-backdrop adopt/decline (F49/F50 π); W4 track fold; W5 A10 proportion roster; W6 251-site type
codemod + default-ramp reset + π; **W7 the chip + glass-atom @import closure restore + live
accent-paint re-verify.** Before this amendment the summary stopped at W6 while the table already
carried W7 (STAB3's cure) — the amendment closes that gap. Consistent.

**W7 header (`:702`).** Now reads "minted at the STAB1-COMPLETENESS orphan-cure: the gate existed
with no owning wave," which matches the section body's opener "Minted at STAB1-COMPLETENESS: the one
LIVE-CONFIRMED shipped defect of 7.0.0 had a gate ... but no owning wave" (`:704-707`). The prior
stale "(STAB1 MAJOR-1 cure)" — the exact string every earlier STAB pass flagged as a non-blocking
NOTE — is gone. No stale text remains in the header/body/summary triad.

## 3. The grep

`grep -rn 'STAB1 MAJOR-1 cure' docs/tranches/BJ/` → 4 hits, ALL inside
`formation/stability/` (STAB2-COHERENCE, STAB3, STAB4, STAB5 — the reports that recorded the old
mismatch as a NOTE). Zero hits outside the stability reports; zero in any wave/plan artifact. Clean.

---

## Closing

The amendment did exactly what its commit message claims and nothing more. No BLOCKER/MAJOR/MINOR,
and no NOTE worth carrying — the one NOTE the chain had been carrying is now cured. Formation stays
two-consecutive-clean with this amendment folded in.

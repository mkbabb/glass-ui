# Row #9 round-3 — DRIVER ADJUDICATION (2026-08-04, ~03:15 ET)

**Basis for the driver seat:** the fresh-Fable adjudicator seat stalled out TWICE — six 180-second
progress-window kills per attempt, the second attempt *after* a cadence-patched prompt (59 tool
calls made, still killed between them). The row-91 precedent applies: the driver (Fable, per the
model law) takes the stalled seat's remit, rules on its own on-disk battery, and says so here.
The cure seat and the assume-wrong verify seat both completed and are cached in the run journal
(`wf_c8776281-7df`); this record consumes them.

## The driver's own battery (run at this seat, not quoted)

- `node scripts/gate-register.mjs` → exit 0, receipt byte-identical:
  `seats:60 active:48 reserved:5 worstCase:53 remaining:7 external:11 bound:7 armOnly:2
  unbound:51 drift:1 rosterSha256:dc05df91 violations:0` + the ⊕²⁵ vocabulary line + the one
  routed drift (reka.tags-input, → #65).
- `npx vitest run tests/gates/gate-register.test.ts tests/gates/trap-gates.test.ts` → **26/26**.
- **Item 10 defect CONFIRMED against the cure seat and CURED here:** the guarded §1.1 detector
  run verbatim gives `it(` → **1,252** (the seat's 1,278 was the unguarded form; 27 substring
  hits), `it.each(` → 37, `it.fails(` → 1 → **call sites 1,290**; collected **1,450**, files
  **209**; gap **+160**. Concordant with the verify seat's independent run. Struck ON the text
  at `REGISTER.md:73` and `:77` with ⊕²⁹ brackets.
- Spot-verified ON the text: item 4 (the five-files provenance strike with the per-path
  `git cat-file -e` detector), item 6 (the `custom/dock/` path fix with the `find` detector),
  item 12 (the Z-1 hand-off re-worded OFFERED-pending-#10 with the receiving record named).
  18 round-3 brackets present in the register.
- **The three matcher holes:** cure seat and verify seat ran INDEPENDENT probe harnesses with
  concordant PRE→POST outputs (describe.skip/.todo/.skipIf → drift:3 violations:1; it.only →
  sibling drifts; block-scalar `#`-comment → badAnchors names the ci.yml anchor; the
  G-RUNG-ONLY embedding rename → nameIsLive false, violations:1) plus eight extent cases
  (skipped block never condemns a live sibling; modifier words in titles stay prose). Two
  independent harnesses agreeing on planted mutations is the strongest evidence this row admits.

## Ruling

Items 1–9, 11–13: **DISCHARGED** (verify-confirmed, driver spot-checked). Item 10: **DISCHARGED
at this seat** (the defect the verify seat caught, cured above with the honest derivation).

**ROW #9: SEAL — the driver seals in the cursor citing this record.** Terminal dispositions
carried, all admissible under §11's own law: **E-6** LIVE-with-named-owner (§12 act 4, pre-Φ7
trigger); **E-8** narrowed to the honest note (`public-surface.spec.ts:539` alone unguarded —
the artifact edge otherwise bound at `:698-731`); **Z-1** OFFERED-pending-#10-consumption (the
receiving record named). Neither register figure moved without its detector; the budget is 60
with zero minting.

**Φ3 CONSEQUENCE:** #9 was the last open leg of the ⊕²⁵ close definition (sextet #11–#16 SEALED
+ #77-mechanism SEALED + #9 SEALED). **Φ3 CLOSES with this seal.** #10's capture half rides the
evidence spine (blocks #66 only). #68 W-TOKEN-CANON (Φ4-FIRST) OPENS.

**Stall-class note for the record:** two consecutive Fable adjudicator seats died to 180-second
progress windows despite active tool use — the kill window is hostile to long-thinking
adjudication seats. Future heavy adjudications: bank the work order to disk and split the seat's
remit, or take the remit driver-side as here.

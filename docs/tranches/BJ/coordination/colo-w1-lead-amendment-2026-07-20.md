# COLOCATION W-COLO-1 → lead amendment channel (2026-07-20)

From the COLOCATION-W1 closer. Two `BAND-COLOCATION.md` truth-ups are routed here **as
proposals for the lead amendment pass** — never applied as a silent band-file re-edit
(SUPERSESSION LAW: counts/rosters/gate rows live only in their owning band file; one owner
per file per cut). Both are verified on disk this run; the evidence backing them lives in
`../evidence/W-COLO-1/`.

## Amendment 1 — G-CSS-BYTE-IDENTITY gate posture (`waves/BAND-COLOCATION.md:234`)

**Why.** The W-COLO-1 gate row charters `G-CSS-BYTE-IDENTITY` as *"`dist/glass-ui.css`
byte-identical for 1d/1e"*. That is RED as literally written and can never flip GREEN on this
diff: 1c/1d rewrite `import` statements **inside scoped SFCs**, which re-hashes those SFCs'
Vue scope-ids (`data-v-*`) and their scoped-keyframe name hashes. Any GREEN report of literal
byte-identity would therefore be a false evidence figure. Measured this run (evidence:
`css-identity.txt` + `machine-report-css-byte-identity.txt` + the four banked dist artifacts):

- raw builds differ from char 30681 — **141 differing spans, ALL** either a `data-v-*` scope-id
  or a scoped-keyframe hash, across exactly **4** re-hashed SFCs (Slider, Progress, FeedbackMark,
  StatusDot); the other 23 scope-ids are byte-identical.
- with those hashes masked **by pattern**, the two builds are **byte-identical**: both 68,091
  bytes, sha256 `58ed7db7ebd05b06411a544c23f01f0e1dabb088db78c6badb45ff83ea3117a9`.
- 1c's accent-tone register moved under the **exact-rung fallback** (the `@import` position is
  byte-unchanged); no `.accent-tone` / `--accent-*` selector appears in any differing span, so
  the move is proven cascade-inert with no live probe owed.

The move is PROVEN paint-inert; the *charter wording* is the defect.

**Proposed gate-row text** for the W-COLO-1 `G-CSS-BYTE-IDENTITY` row (posture column stays
`inert-move proof`; the probe column becomes):

> hash-normalized identity (data-v-* + scoped keyframe hashes masked); literal byte-identity
> only for rows touching no SFC. 1c/1d re-hash 4 SFCs' scope-ids — masked compare is IDENTICAL
> (68,091 B, both sides); artifacts in `evidence/W-COLO-1/`.

## Amendment 2 — Precept F line-cite (`waves/BAND-COLOCATION.md:187`)

**Why.** The Precept-F prose reads *"~15 feature-dir styles already do this at
`index.css:181-247`"*. That cross-file line-range is an ANCHOR-LAW violation — it seeded the
identical drift-prone cite in the doc of record (`docs/design/design-idioms.md`), which the
COLOCATION-W1 close has now corrected to a stable-anchor form. The band-text should follow, so
the two homes agree and neither drifts when `BJ.W-CSS-CLOSURE-RESTORE` (MATERIAL W7) re-wires
the component-band `@import`s.

**Proposed replacement** for the phrase `at \`index.css:181-247\`` on that line:

> in `index.css`'s component band (ledger rungs 7-17, `card/styles.css` → `dialog/placement.css`)

(the design-idioms.md doc of record now carries exactly this phrasing).

## Status

Both are doc-truth / gate-wording only — no verdict moves, no source behavior changes. They do
not block the W-COLO-1 close (the wave's substance is landed and evidenced); they land when the
lead amendment batch next runs against `BAND-COLOCATION.md`.

---

## LEAD DISPOSITION (2026-07-20 ~12:5x): BOTH ADOPTED

Amendment 1 adopted verbatim-faithful at the W-COLO-1 gate row — the measured proof is exactly the
honest-null-DELTA posture the completion model demands; literal byte-identity on an SFC-touching
diff was an unsatisfiable charter that would have forced a false evidence figure. The masked-compare
basis (all 141 spans hash-shaped, count pinned, sha256 matched) is preserved in the row so the mask
can never quietly widen. Amendment 2 adopted — the band now matches the design-idioms doc of
record's stable-anchor form (the anchor law). Applied by the lead, one owner per file (the W-COLO-1
cut is closed; no seat held the band file). Routing channel honored — this is how band truth-ups
travel; never a silent re-edit.

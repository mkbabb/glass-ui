# HC-L-deck — grading the BUILT til-briefing deck vs the binding refinement decisions

**Lane** HC-L-deck (CloseOut) · **Date** 2026-06-09 · **Graded tree** `/Users/mkbabb/Programming/slides`
branch `tranche/til-briefing-L`, HEAD `ca5f9ca` (the lane named ~`9e10dff`; two later commits exist —
`e681730` S1 headline + S2 NC-dedup, `ca5f9ca` round-4 bank). **Graded from SOURCE** — the dev server
at `127.0.0.1:5273` was DOWN (curl 000). The decision file now carries **18** decisions, not 17:
round 4 (#18, "the register decides — no cap") was banked at `ca5f9ca`, past the lane's named HEAD.

Binding bar: `slides/docs/tranches/L/audit/restructure/REFINEMENT-DECISIONS.md` (#1–#18); round-2
grading bar per the lane = #15 (poster register) + #16 (15-min pacing) + #17 (both modes + mobile
first-class). The poster pass itself is a LATER greenlit build — #12/#14/#15 defects below are
recorded as KNOWN-OPEN-BOUND, not as regressions.

---

## §0 — headline verdicts

1. **The deck's own binding copy gate is RED at HEAD.** `proof:deck-copy-conformance` FAILS:
   `src/decks/til-briefing/slides/SlideSovereignty.vue:113` — "Extreme confidentiality is the
   default, not a setting someone has to remember to switch on." trips the negative-parallelism
   (no-antithesis) rule, which the round-1 cross-cutting clause (REFINEMENT-DECISIONS:19-21) makes
   binding on every edit. One-clause copy fix; until it lands the deck is gate-RED.
2. **Decisions #1–#11 are LANDED and PASS in source** (matrix §1). The round-1 application
   (`65098f4` + `e681730`) is faithful, including the aria-lockstep clause (deck.ts:48-56).
3. **#12/#14/#15 are the open poster-pass debt, exactly as the decisions file binds them** —
   S2 stays a co-equal 3×2 grid (no ONE-BIG-$350M lockup), and S2–S6 + S8 are text-dense
   (~160–230 visible words/slide) against the "big animal pictures" register.
4. **#17 is substrate-built, verification-OWED**: the dark arm exists at the chassis
   (`src/styles/deck.css:778-801` — light-dark()-keyed tokens + `.dark` suffuse + the soft-light
   veil) and ALL 9 SFCs carry portrait `@container` collapses; but `docs/tranches/L/audit/visual/`
   contains ZERO captures (only CAPTURE-PROTOCOL.md + an EMPTY VISUAL-ALLOWLIST.json), so neither
   mode nor any 390×844 arm is live-verified. `proof:live-verified-ledger --tranche=L` is GREEN only
   VACUOUSLY (0 live-verified rows, 0 allowlisted — nothing claims, so nothing is checked).
5. **The L wave-set is majority-STALE at HEAD**: 8 of 13 specs contradict the built deck or the
   banked decisions (§3). PROGRESS.md is doubly stale — it still lists the PRE-restructure wave set
   ("W1 | the 5/6/7 close-arc rebuild") AND every row reads `planned` while the deck is built through
   round-4. This is the chronic-deferral Class-G ledger-staleness signature, slides side; the R7
   finisher-restamp is owed here too.

---

## §1 — per-slide × per-decision matrix

Slides: S1 Intro · S2 Success · S3 Ex1 · S4 Ex2 · S5 Ex3 · S6 Sovereignty · S7 Xray · S8 Pipeline ·
S9 Closer. "—" = decision does not land on that slide.

| # | Decision (short) | S1 | S2 | S3 | S4 | S5 | S6 | S7 | S8 | S9 |
|---|---|---|---|---|---|---|---|---|---|---|
| 1 | thesis on the spine | **PASS** (standfirst, SlideIntro.vue:68) | — | — | — | **PASS** (callback "Who audits the auditor?", SlideExamples3.vue:100) | — | — | — | **PASS** ("the auditor's auditor…", SlideCloser.vue:49) |
| 2 | all six illustrative | — | — | **PASS** ("we can build", :35; aria "kinds of…we can build") | **PASS** (generic present-tense, nothing claimed delivered) | **PASS** | — | — | — | — |
| 3 | anchor the numbers | — | **PASS** ($350M leads :87-90; $7B/yr second beat + aggregate demoted :91-94; aria lockstep deck.ts:49) — rider: the value-prop verbatim check is repo-internal only (s2-success-stories.md:221 still carries "Confirm $350M attribution") | — | — | — | — | — | — | — |
| 4 | soft close | — | — | — | — | — | — | — | — | **PASS** ("Start small." callout :59-63; no meeting/venue named) |
| 5 | cut student fleet | — | — | — | — | — | **PASS** (faculty + "panoply of expertise", SlideSovereignty.vue:128-131; zero student copy) | — | — | — |
| 6 | actual WOPR | — | — | — | — | — | — | — | **PASS** (`/assets/wopr.jpg` committed, 1920×1038/231,480 B verified on disk; source URL + sizes recorded SlidePipeline.vue:164-168; license noted) | — |
| 7 | label LEFT / live iframe RIGHT | — | — | — | — | — | — | **PASS** (38%/1fr grid :201; label col 1, stage col 2 rows 1/3 :285-289; live chrome-bar = launch `<a>` new-tab :141-148) — visual capture owed | — | — |
| 8 | receipt generic | — | — | **PASS** ("a few dollars" :51; total redacted `$▮.▮▮` :69-70; aria de-concretized deck.ts:50; brief updated SLIDES-RESTRUCTURE-BRIEF.md:36-37) | — | — | — | — | — | — |
| 9 | ask unspecified | — | — | — | — | — | — | — | — | **PASS** (no named dataset/venue; "Pick one program you already worry about") |
| 10 | cover headline stays | **PASS** (e681730; "Finding errors, / waste, and / fraud" + red draw on fraud :54-57) — residue in §2.D3/D4 | — | — | — | — | — | — | — | — |
| 11 | arc order | — | — | — | — | — | — | — | — | **PASS** (deck.ts:47-57 = 1..9 as decided) |
| 12 | S2 ONE BIG FIGURE | — | **DEFECT-OPEN-BOUND** (built = co-equal 3×2 `.grid` :241-247; the $350M tile `fig__v` caps 66px, same rank as siblings; the decisions file itself binds the recompose to the poster pass, :44-46) | — | — | — | — | — | — | — |
| 13 | solutions read REASONABLE | — | — | PARTIAL | PARTIAL | PARTIAL | (carrier) | — | — | — |
| 14 | speaking-driven backdrop | BORDERLINE-PASS | DEFECT | DEFECT | DEFECT | DEFECT | DEFECT | PASS-w-tension | DEFECT | BORDERLINE |
| 15 | poster register | **PASS** (hero ≤100px, sparse) | **DEFECT** | **DEFECT** (3-beat ×2 cards + receipt) | **DEFECT** (+standfirst+keyline) | **DEFECT** | **DEFECT** (5 stacked zones) | PASS-w-tension (label = sanctioned readable artifact per #7) | **DEFECT** (BIG headline conforms; stages+console+callout+cadence do not) | BORDERLINE (3-sentence body prunes) |
| 16 | 15-min pacing | PASS-as-built (9 × ~100 s); only READS after the poster pass; #18 allows growth on split | | | | | | | | |
| 17 | both modes + mobile first-class | SUBSTRATE-PASS / **VERIFY-OWED** deck-wide (dark arm deck.css:778-801; portrait blocks in all 9 SFCs; ZERO captures on disk, either mode, any viewport) | | | | | | | | |
| 18 | no slide-count cap (post-HEAD) | noted; no grading surface until the poster pass | | | | | | | | |

**#13 detail (the round-2 conformance pass is UN-RUN):** human-in-the-loop = PASS on all six cards
(HUMAN / A PERSON DECIDES on every card); classical+modern named = PASS (SlideExamples3.vue:39
"answered three different ways"); bias-abrogation = explicit on C ("Fraud isn't only the poor.",
SlideExamples2.vue:37) + F ("The math has no stake in the answer", SlideExamples3.vue:149) but NOT
per-card; sovereignty/privacy/security emphasis rides S6 only — no per-card line. Card D (voter file
× county rolls, SlideExamples2.vue:88-138) is the conservative-audience risk site and has never been
graded by the decided conformance pass. The pass is owed before the poster rebuild rewrites the copy.

---

## §2 — defects (file:line)

- **D1 (gate-RED, binding).** `SlideSovereignty.vue:113` negative-parallelism — `proof:deck-copy-
  conformance` exits 1 at HEAD. The same run flags a non-binding docs hit (`K.W1-redesign-567.md`
  spaced em-dash). Fix the clause ("…is the default; no one has to remember to switch it on." or
  equivalent), rerun green.
- **D2 (the S2 bottom-row clip — KNOWN-OPEN, bound to #12).** Mechanism from source: `.grid`
  (`SlideSuccess.vue:241-247`) is `flex:1 1 auto; min-height:0; grid-auto-rows:1fr`, but the three
  map tiles each carry a 16/9 `aspect-ratio` window body (`:358-362`) whose min-content height
  (~bar + 16/9 of ≈368px column ≈ 230px+) exceeds the ~200px/row budget left on a 720p canvas after
  header+lede+footer — the bottom row paints past the slide edge. `e681730`'s 2-line lockup freed one
  lede line only; the structural fix IS the #12 recompose (fewer/larger supports), correctly deferred
  to the poster pass. Until then the slide needs either a `min-height:0`-safe `max-height` clamp on
  `.window__body` or acceptance of the clip in landscape capture.
- **D3 (meta carries the banned frame).** `src/decks/til-briefing/meta.ts:5` title =
  "Modernizing State Government with AI" — the frame #10's rationale names as banned for this room
  (SlideIntro.vue:50-52 comment); it is the homepage card + document title. Summary `:7` also reads
  "waste, fraud, and abuse" (vocabulary drift vs the cover's "errors, waste, and fraud") and
  `updated: "2026-06-02"` predates the entire L build.
- **D4 (naming rot).** `SlideIntro.vue:57,120-130` — the red-underlined word is now "fraud" but the
  class/keyframe family is still `.hero__ai`/`s1-draw` "AI wordmark". Cosmetic, but L.W1-INTRO's gate
  readback (".hero__ai wraps AI") is now wrong-by-name (§3).
- **D5 (capture debt, #17).** Zero `.png` under `slides/docs/tranches/L/audit/visual/`; no light/dark
  pair, no 390×844 set, no S2-clip evidence frame. Every content wave's hard gate (PAIRED 1280×720 +
  390×844 DELTA) is unmet; the ledger gate is green only because PROGRESS claims nothing (§0.4).
- **D6 (gate coverage gaps vs L.W-GATE).** `scripts/proof-deck-copy-conformance.mjs` carries NO
  no-naming check (grep DIT/DPI/Pitt/county = absent from the script) and NO manifest↔position gate;
  `tests/unit/conformance-gate.spec.ts` does not exist (tests/unit = deckKeys/pagerWindow/useDeck
  only). The ledger port DID land (`scripts/proof-live-verified-ledger.mjs`, `--tranche=L`,
  package.json:18, self-test OK).
- **D7 (underline root-fix unowned, slides side).** The round-3 ROOT-FIX directive
  (REFINEMENT-DECISIONS:48-55) makes SlideIntro `s1-draw` (:127-131) + SlideCloser `cta-draw`
  (:124-128) future consumers of glass-ui `AY.W-UNDERLINE` — correct-as-built today (the component is
  unbuilt), but NO L wave owns the slides-side adoption; L.W-ADOPT names only the constellation.
  Corroborated: SlideSovereignty.vue:160-162 is deliberately bare (red em, no glyph) — the
  NECESSITY-MATRIX's "×2 not ×3 consumer count" amendment for W-UNDERLINE is confirmed at the tree.

---

## §3 — L wave-set currency (the 13 specs vs the built state)

| Wave spec | Verdict | Evidence |
|---|---|---|
| L.W0-REGROUND | **GATE-UNSATISFIED at HEAD** | its own gate ("the three documents agree on the wave SET") is violated by PROGRESS.md:40-52 (pre-restructure wave names, "W1 = the 5/6/7 close-arc rebuild"; all rows `planned` post-build) |
| L.W1-INTRO | **STALE ×3** | L.W1-INTRO.md:11,59,68 — red `AI` wordmark + `.hero__ai`-wraps-AI readback (now "fraud" per #10/e681730); mechanism eyebrow "AN EXECUTIVE BRIEFING" (built: "A STATE GOVERNMENT BRIEFING", SlideIntro.vue:40) |
| L.W2-SUCCESS | **STALE ×4** | :37 aggregate-led headline (superseded by #3 anchored $350M); :58 four insets + `<MapInset>` subcomponent + `/public/success-*-poster.png` (built: THREE inline insets at `/assets/*.png`, ncbroadband.png deliberately unused — SlideSuccess.vue:30-36); `.lk` red-underline links (built: faux-window `<a>`s); #12 recompose pending makes the layout section doubly stale |
| L.W3-EX | **STALE** | `$3.50` literal at :6,:19,:68,:69,:71 incl. the GATE clause ("the receipt $3.50 resolves --foreground") — superseded by #8 (generic + redacted `$▮.▮▮`); spec headline "Two places the math already pays for itself." vs built "Two analyses we can build…" |
| L.W4-SOV | **STALE** | :23 "CS/statistics-student resourcing copy verbatim" — superseded by #5 (built drops students, panoply register) |
| L.W5-XRAY | **STALE (composition superseded)** | :13,:19-25 describe the rail-headline composition ("Nothing hidden. Inspect it yourself." + `.xray__head`/`.xray__close` beats) — #7 replaced it with the nutrition-label-LEFT / near-fullscreen-iframe-RIGHT build (SlideXray.vue:91-182) |
| L.W6-PIPE | MOSTLY CURRENT | the licensing-decision gate arm is now RESOLVED by #6 (asset + source + size recorded in-SFC); levity line names no film (alt text naming WarGames is sanctioned by #6); captures owed |
| L.W7-CLOSE | CURRENT-ish | built matches (cta-draw rings "proven team", same-boat, Start small, bookend `resolved`=1 verified); spec does not carry the #1 thesis-echo line the build added (SlideCloser.vue:49) — harmless additive drift; captures owed |
| L.W-GATE | **PARTIAL** | ledger port LANDED + bites (self-test 3 synthetic rows flagged); conformance gate exists and correctly FAILS at HEAD (D1 — it bites); MISSING: no-naming check, manifest↔position gate, `conformance-gate.spec.ts` fixture (D6) |
| L.W-MOB | **HARD-STALE** | L.W-MOB.md:100-160 targets the RETIRED 7-slide deck — SlideProblem `.delta__svg`, SlideMonitoring EKG, SlideLoop, "ALL 7 live slides"; needs full re-author onto the 9 SFCs + the #17 elevation (light+dark arms) + sequencing AFTER the poster pass (which recomposes the very slides the occlusion gate measures) |
| L.W-CHR | **HARD-STALE / PARTIALLY MOOT** | title = "the 11→7 stale-count sweep" (deck is 9); :3 depends-on text describes the OLD W1 ("edits SlideHandoff/Xray/Ask"); the locked-blur inversion now applies to NO live deck (til-briefing `softGated:false`, meta.ts:9-16 — DeckGate retired for this deck); pager total is prop-driven (DeckPager.vue:16), so the count-rot scope needs re-verify, likely shrunk to the HomeView facility fix only |
| L.W-ADOPT | CURRENT + **WIDEN** | constellation scope unchanged (AY-publish-gated); fold the D7 underline adoption into its "audit every befitting component" clause or mint a sibling row — currently unowned |
| L.W-DEPLOY | CURRENT | the user-domain hinge, unchanged; note it now also waits on the poster pass + gate-green (D1) |

**PROGRESS.md** (`docs/tranches/L/PROGRESS.md:40-52`): restamp REQUIRED — adopt the L.md §2 wave-name
set; flip the built content waves to `live-pending` (code landed, DELTA owed) per its own legend
(:26-29); the current all-`planned` table plus the empty allowlist is what lets the ledger gate pass
vacuously over a fully-built deck.

---

## §4 — what the round-2 (poster) builder inherits

1. Fix D1 FIRST (gate-RED blocks every later close).
2. The #12 S2 recompose carries D2 (the clip) for free; keep the three real insets + the gauge as the
   "fewer/larger supports".
3. The #13 conformance pass should run BEFORE the poster prune (grade the copy that exists, then
   prune) — card D is the priority grade.
4. The #17 capture protocol is already written (`audit/visual/CAPTURE-PROTOCOL.md`) — the poster pass
   should close each slide with the light+dark 1280×720 + 390×844 quad, flipping PROGRESS rows to
   `live-verified` and making the ledger gate non-vacuous.
5. Re-author L.W-MOB + L.W-CHR before dispatching them (both currently aim agents at retired slides).
6. meta.ts (D3) is a two-line fix ridable on any next commit.

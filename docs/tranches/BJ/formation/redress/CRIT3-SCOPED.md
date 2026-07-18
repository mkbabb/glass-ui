# CRIT3-SCOPED — pass-3 scoped verifier, BJ redress fix-closure (Fable seat)

**Mode:** TRANCHE DEVELOPMENT. This file is the only artifact — no `src/`/`demo/` touch, no commit.
**Charge:** verify on disk the three lead fixes that answered CRIT2-A's two residual MINORs, and scan
ONLY the touched regions (F03 item, F23 item, BAND-MATERIAL W4 census) for any new fault the fixes
introduced. Every claim below re-read at HEAD.

**Verdict: AMEND(1).** Fixes 1 and 2 are CLEAN. Fix 3's specific claims are all disk-true, but the
fix left one residual contradiction inside the touched W4 region (finding A3-1 below).

---

## Fix 1 — DOSSIER-F01-F10 F03 / G-COPY-2 scope — CLEAN

- **REDRESS residue text** (`DOSSIER-F01-F10.md:149-153`): now reads "`G-COPY-2`, `BAND-STORY.md:195`
  greps handmark/search only — NOT `layers.vue`". Correct.
- **D-F03 delta** (`DOSSIER-F01-F10.md:469-476`): now reads "alongside handmark/search (`G-COPY-2`,
  `BAND-STORY.md:195` — the gate greps those two only; manifest sits in no G-COPY gate either)". Correct.
- **Gate cross-check (on disk).** `BAND-STORY.md:195` — `G-COPY-2` probe is
  `grep -nE '…' demo/stories/motion/handmark.vue demo/stories/data/search.vue` — **handmark + search
  only**, exactly as the fix now states. The prior over-statement (that G-COPY-2's scope reached
  wider) is gone.
- **"manifest in no G-COPY gate" verified.** All four G-COPY gates read on disk
  (`BAND-STORY.md:194-197`): G-COPY-1 = generic `demo/stories/` eyebrow grep; G-COPY-2 = handmark +
  search; G-COPY-3 = auth-shell; G-COPY-4 = handmark. **None cites `manifest.ts`.** The delta's
  "manifest sits in no G-COPY gate either" is true — and `manifest.ts:932` is a copy site the F03
  TARGET flags (`:134`), so the claim is load-bearing, not incidental.
- **Internal consistency intact.** Verdict still **PARTIAL** (`:149`); the two-part residue (site not
  pinned + no "Mechanics narration PATTERN" ban clause) survives; STATUS CHECK still "AGREE it lands,
  with the one enumerated residue" (`:155-156`); coverage table still `F03 · PARTIAL · delta 1`
  (`:456`). No drift.

## Fix 2 — DOSSIER-F21-F30 F23 fold-target — CLEAN

The fold-target bullet (`DOSSIER-F21-F30.md:145-150`) now reads: "a new
`src/components/_shared/track.css` recessed-well utility + `--track-*` token family … **NOT named
`glass-track`**: that class is LIVE on `ScrubberTimeline.vue:209` — the wave takes a non-colliding
name (per **SUPERFLUITY F23's** 'rename off the colliding glass-track')."

- **No longer proposes `glass-track`.** The bullet now names `--track-*` and explicitly excludes the
  colliding class. Correct.
- **ScrubberTimeline.vue:209 live class verified on disk.** Line 209 is
  `class="glass-track timeline-rail"` (`src/components/timeline/ScrubberTimeline.vue:209`). The
  citation is exact.
- **SUPERFLUITY F23 rename ruling verified on disk.** `SUPERFLUITY.md:23` — "…**rename off the
  colliding glass-track**." (Corroborated at `:170-173,489,566-567` recommending `glass-track-well`.)
  The citation is accurate.
- The F23 REDRESS (`:157-167`) refers to "one `_shared/track.css` partial" without naming
  `glass-track`, so the corrected bullet is consistent with the rest of the F23 section.

## Fix 3 — BAND-MATERIAL W4 census correction — claims true, but ONE residual contradiction

**The three verified-true parts of the fix:**
- **Row relabeled.** The census row is now `| ContinuousRail (timeline) | … |`
  (`BAND-MATERIAL.md:393`), no longer "Scrubber". Correct.
- **Correction note present** (`BAND-MATERIAL.md:395-398`), and both of its factual claims hold on
  disk: (1) "`ScrubberTimeline.vue:209` carries a LIVE `class="glass-track"`" — verified (line 209
  above); (2) "SUPERFLUITY F16 collapses it (a Slider in disguise)" — verified at `SUPERFLUITY.md:26`
  ("Scrubber is a Slider in disguise") and `:278`.
- **Sequencing coherent with SUPERFLUITY F23.** The note's "W4 sequences after the timeline
  consolidation or scopes it out explicitly" is coherent with `SUPERFLUITY.md:23` ("keep the timeline
  out of W4 (W5 owns it)") and the C-C sequencing ruling (`SUPERFLUITY.md:492-499`). Scoping the
  timeline out of W4 = keeping it out; no contradiction.

### FINDING A3-1 (MINOR) — W4 still mints the colliding name it just banned

The correction note (`BAND-MATERIAL.md:397-398`) rules that **"W4's shared utility MUST take a
non-colliding name (SUPERFLUITY F23: 'rename off the colliding glass-track')."** But two adjacent
lines in the SAME W4 §Design still literally name the banned class as the fold's utility:

- `BAND-MATERIAL.md:410` — "**The fold:** one shared track partial (a `_shared/track.css`
  **`@utility glass-track`** / `--track-*` token family …)". Stated declaratively, not as an OPEN.
- `BAND-MATERIAL.md:453` — "`OPEN-4a` — the API shape … a CSS **`@utility glass-track`** /
  `_shared/track.css`".

This is an internal contradiction introduced by the fix: the note (dated CRIT2-A) forbids the name,
the fold paragraph immediately below still prescribes it. A builder reading `:410` would mint
`@utility glass-track` and hit the exact build-time collision SUPERFLUITY names "a build-time naming
defect, not a taste call" (`SUPERFLUITY.md:488`). The sibling dossier fix (Fix 2) correctly de-collided
its fold-target to `--track-*`/"NOT named glass-track"; the BAND-MATERIAL fold text was not swept to
match its own new note.

**Redress (one edit, no scope change):** in `BAND-MATERIAL.md:410` and `:453`, replace
`@utility glass-track` with the non-colliding name the note already mandates (SUPERFLUITY's
`glass-track-well`, or leave the exact token to `OPEN-4a` but stop illustrating the banned name).
Precedence note: the correction note is binding and dated, so a precedence-aware reader resolves it
correctly — which is why this is MINOR, not blocking — but the doc self-contradicts as written and a
consecutive-clean close should not carry a live "mint the class we just banned" line.

---

## Disposition

| fix | region | result |
|-----|--------|--------|
| 1 | `DOSSIER-F01-F10.md` F03 REDRESS + D-F03 (`:149-153`, `:469-476`) | CLEAN |
| 2 | `DOSSIER-F21-F30.md` F23 fold-target (`:145-150`) | CLEAN |
| 3 | `BAND-MATERIAL.md` W4 census (`:393-398`) | claims TRUE; **A3-1** residual contradiction at `:410`, `:453` |

No other fault found in the three touched regions (cross-refs, line numbers, and adjacent verdicts
all check out). One more consecutive-clean pass is warranted after A3-1 is swept.

*End — CRIT3-SCOPED, one file, no `src/`/`demo/` edits, no commit.*

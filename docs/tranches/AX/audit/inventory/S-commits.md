# S-commits — AX session-commit soundness ledger (inventory lane)

**Lane** S-commits · **Verdict** read-only soundness inventory (routes findings to covering
waves; mints no net-new wave) · **Named base** `c72d2ac` · **Actual working HEAD** `88a2ec5`
(`at-dock-convergence`) · **Date** 2026-06-08

Scope: inventory the AX session commits — the W00–W59 work — for what landed, what is
live-verified vs headless-only, and any wave the live product or its own gate contradicts (the
cardinal-lesson re-verify list). This is the meta-audit of whether "complete" means complete.
It does NOT re-derive fixes (the D-files + the convergence plans own those); it audits the
SESSION's completion semantics. It EXTENDS the prior `convergence/A-session-soundness.md` (which
ended at the 3.8.0 cut `f2fc614`) forward through the convergence-1 + convergence-2 bands.

---

## 0 — Commit-topology reconciliation (load-bearing — read first)

The task names HEAD `c72d2ac`. The ACTUAL working HEAD is **`88a2ec5`**, three commits past
`c72d2ac`:

```
88a2ec5 docs(AX): W45 dock band DEVELOPED + live-verified (MCP …)        ← W45 doc
56db9e0 feat(dock): three-region morph + H/V parity + --dock-scale + … (AX.W45)  ← W45 CODE
b03246c docs(AX): deep-inventory scaffold — the step-back audit index
c72d2ac docs(AX): W19 prunes + W58 story-language + W59 slider DEVELOPED … ← named base
```

So **W45 (the dock region-model) IS in the session** — it landed as `56db9e0` on top of the
named base. An inventory anchored only on `c72d2ac` would have wrongly reported W45 as
not-shipped (the merge-base check `56db9e0 is-ancestor c72d2ac` returns NO precisely because W45
post-dates the named base). The full AX session is `abe33d9~1 .. 88a2ec5` — ≈83 AX commits.
Working tree is clean except the parallel inventory lanes' `W-*.md` scaffolds + the
`docs/precepts` submodule pointer (read-only-safe; not session debt).

---

## 1 — What landed, by band (DONE / PARTIAL / DOC-ONLY)

### 1a — The 3.8.0 cut (W00–W24, the published band) — LANDED + tagged v3.8.0

All audited GREEN on real device with two cardinal-lesson fixes folded mid-band (the prior
`A-session-soundness.md` clears this band mechanically; its inflation findings S1/S3 below):

- **W00** π visual-runtime lane, **W01–W05** dock band, **W07–W08** graphics blockers,
  **W09** specular, **W10–W13** aurora, **W15–W16** blob, **W17** constellation, **W22** fonts,
  **W23** carousel, **W24** deck-progress, **W37** Canvas2D — all carry wave JSONs + commits.
- Two headless-green/visually-broken defects were caught + fixed live in `8a99689` (W04 invalid
  `min(max-content)` cap; the universal expand-t-at-rest dead-fallback). Sound.
- The publish-unblock `f2fc614` exemptions are surgical (S6 prior-audit: clean bill).

### 1b — Convergence-1 net-new waves (W44–W51) — **DOC-ONLY (NOT STARTED in code)**

Authored in the doc commit `b9d0a7f` ("convergence wave set authored — W44-W50 net-new") +
the `convergence/CONVERGENCE-PLAN.md` ledger. **NO feature commit references W44/W46/W47/W48/
W49/W50/W51.** Verified: the only commit subject mentioning these is the authoring-doc commit.
PROGRESS.md marks every one `planned`. So:

| Wave | Defect | Status | Note |
|---|---|---|---|
| W44 dark `--destructive` AA floor | D10 | NOT-STARTED | doc-only; born-RED-ready |
| W46 blob live-truth tune (floors→bands) | D4/D5/D7 | NOT-STARTED | discharges the deferred W15/W16 live π — the loudest blob defects |
| W47 aurora preset roster (name van-Gogh) | D2 | NOT-STARTED | "where are the van-Gogh items?" still unaddressed |
| W48 glass-material demo reauthor | D8 | NOT-STARTED | `/substrates/glass-material` "totally broken" still unaddressed |
| W49 math-paper × latex-paper | D16 | NOT-STARTED | doc-only |
| W50 uniform dropdown type-scale | D17 | NOT-STARTED | doc-only |
| W51 library-wide `--ui-scale` (D18 umbrella) | D18 | NOT-STARTED | the umbrella W45/W50 specialize; doc-only |

**W45 is the ONE convergence-1 wave that LANDED** (`56db9e0`) — region-model + H/V parity +
`--dock-scale` + glyph ownership + `<DockSeparator>` + the DK1/2/4/5/7/8 folds.

### 1c — Convergence-2 waves (W52–W59) — MIXED (5 landed code, 2 doc-only, 1 prune)

| Wave | Commit(s) | Status | JSON status |
|---|---|---|---|
| **W52** liquid-glass material | `31d716e` + `97551ca` | LANDED | `dev-complete-headless-green-live-pending` |
| **W53** tabs-unify (SegmentedTabs) | `d4c2910` + `7c4d6c9` | LANDED | gates `pass`; π arm `ran (glided/squished true)` |
| **W56** squircle token axis | `8e17346` | LANDED | `dev-complete-headless-green-live-pending` |
| **W57** demo radial + pulse calm | `bea6a47` | LANDED | `handed-to-orchestrator` |
| **W58** storybook-language strip | `5ff9098` | LANDED (49 SFCs) | `dev-complete-source-green-no-live-arm` |
| **W59** slider redesign | `a730782` + `d21babb` | LANDED | `dev-complete-headless-green-live-pending` |
| **W19** primitive prune A | `509aed8` | LANDED | excised glass-carousel/disco-glyph/glyph-face; kept useTokenColor |
| **W54** glass-first-class (`--glass-level`) | — | **DOC-ONLY** | NOT-STARTED |
| **W55** adaptive-glass-legibility | — | **DOC-ONLY** | NOT-STARTED |

W19 prune verified at source: `disco-glyph/`, `glyph-face/`, `glass-carousel/` dirs removed;
`useTokenColor.ts` kept (constellation consumer #2). Clean break, no aliases.

---

## 2 — The cardinal-lesson re-verify list (suspect "complete" — the soundness crux)

**The session is mechanically honest but its PROGRESS completion semantics are AGAIN inflated** —
the exact pattern the prior `A-session-soundness.md` flagged for W09/W05, now recurring across
the convergence-2 band at a HIGHER claim level (the doc commits assert MCP live-verification).

### S-A — PROGRESS says "live-verified (DEVELOPED)"; the wave JSONs say "live-pending" (BLOCKER soundness)

PROGRESS.md marks **W52, W56, W59 "live-verified (DEVELOPED)"** and **W45 "live-verified
(DEVELOPED)", W53/W57 "live-verified (DEVELOPED)"** — yet their own JSON ledgers record:

- `W52-liquid-glass-material.json` → `"dev-complete-headless-green-live-pending"`; its
  `liveArmHandoff` explicitly says *"NOT this SOURCE gate alone (the cardinal lesson: W09 shipped
  headless-green over a still-blooming surface, which is why D19 re-opened it)"* — i.e. W52 itself
  records that its painted-pixel truth is orchestrator-owned and PENDING.
- `W56-squircle-language.json` → `"dev-complete-headless-green-live-pending"`; `liveVerdict:
  "pending-re-probe — the orchestrator drives the cornerShape readback on a real Chrome-139"`.
- `W59-slider-redesign.json` → `"dev-complete-headless-green-live-pending"`; `liveVerdict:
  "pending-re-probe — the orchestrator drives the drag/render readback (the binding close)"`.
- `W57-demo-radial-calm.json` → `"handed-to-orchestrator"`.
- `W45-dock-region-model.json` → `"DEV-COMPLETE (headless self-gated; live π-lane visual-truth +
  timing TUNE owned by the orchestrator — DK1 collapse-icon delay + DK7 layer-switch lag are the
  headline live checks)"`.

This is **S1 redux** (prior audit: "complete" inflated for W09). The convergence-2 band carries
the same gap one rung HIGHER: the doc commits (`9d306e4`, `88a2ec5`, `5cf2980`) assert
*"live-verified (MCP — …)"* with specifics, but the orchestrator's own live-pass log is
INCOMPLETE (next finding). PROGRESS's `(DEVELOPED)` qualifier is the honest hedge — but it is
written next to "live-verified", and a reader scanning the status column sees the loud
"live-verified" not the parenthetical. **Discipline (same as S1):** a wave whose JSON is
`live-pending` / `handed-to-orchestrator` MUST NOT read "live-verified" in PROGRESS. Use
`live-pending` until the orchestrator's MCP pass is RECORDED for that specific wave.

### S-B — The orchestrator live-MCP pass-2 log is INCOMPLETE; the doc-commit claims out-run it (major)

`convergence2/orchestrator-mcp-live-pass2.md` captures ONLY **P6 (pulse aura)** and then states
verbatim: *"(more to come post-workflow — dock-layers lag DK7, rail DK8, tabs T1, use-token-color
P1, glass-material P9 — captured when the research agents' browser usage settles)"*. So the live
MCP arm for **DK7 (W45 layer lag), tabs (W53 T1), glass-material (W48/P9)** is recorded as NOT YET
CAPTURED — yet:

- `88a2ec5` (W45 doc) claims *"Live-verified via playwright MCP: … DK7 layer lag frame-verified by
  proof:dock-animation-live"* — but DK7 in the orchestrator log is "more to come".
- `9d306e4` claims W53 *"SegmentedTabs spring glide"* live-verified — T1 is "more to come".

The W53 JSON is the one honest exception — it records the π arm "ran (glided=true, squished=true)"
inside `proof:tabs-unified` (a real workspace π arm, not the orchestrator pass). For W45's DK7 the
claim leans on `proof:dock-animation-live` (a frame-count gate), NOT a visual-truth read of the
layer-crossfade smoothness the user flagged (DK7 "far too laggy"). **The DK7/T1/P9 live truths the
pass-2 user defects raised are NOT yet GREEN on the live product** — they are headless-/frame-gate
green with a live arm the orchestrator log shows as pending. This is the cardinal lesson live.

### S-C — W58's own gate is RED at HEAD: W45 re-introduced a meta-language violation W58 had swept (major)

`proof:story-language` (W58's born-RED→GREEN gate) **exits 1 (RED) at HEAD `88a2ec5`**:

```
x demo/stories/navigation/dock.vue:86 — tranche-code "AX.W45" ::
  <!-- AX.W45 — Home is a PERSISTENT control: authored ONCE in …
```

W58 (`5ff9098`) swept 49 SFCs clean of internal meta-language. W45 (`56db9e0`) landed AFTER and
re-introduced an `AX.W45` tranche-code comment into `dock.vue`. So a gate the session marked
GREEN (PROGRESS W58 "dev-complete … 49 SFCs swept") is now RED, and PROGRESS W45 reads
"live-verified" over a tree that fails a sibling gate. This is a **commit-ordering regression** —
the classic "later wave re-dirties an earlier wave's cleaned surface" class. The fix is one-line
(rewrite the comment user-facing or delete it), routed to **W45 finalize / W58 re-green**. It
proves the band did NOT re-run the full gate fleet after the last commit.

### S-D — Prior-audit re-opens (W09 D11, W05 D3) — status carried but NOT yet discharged

The prior `A-session-soundness.md` flagged W09 (de-mark complete→live-pending, D11 radials) and
W05 (carry-row, D3 BouncyTabs double-spring). Status at HEAD:

- **W05 D3 BouncyTabs** is DISCHARGED-BY-CLEAN-BREAK: W53 (`d4c2910`) DELETED `BouncyToggle.vue`
  (495 lines) + `BouncyTabs.vue` + `UnderlineTabs.vue` entirely → `SegmentedTabs.vue` on one
  `--spring-snappy` elastic indicator with a PRM-gated capped squish. The double-spring is gone by
  excision, not patch. Sound. The W53 JSON π arm confirms `glided/squished`.
- **W09 D11 specular radials** is ABSORBED-BY-W52 per `5cf2980` ("W09 D11 radials absorbed by
  W52"). W52 (`31d716e`) deletes the central screen-disc + re-tunes the fixed-anchor radials.
  `proof:liquid-glass-material` passes. BUT W52 is itself `live-pending` (S-A) — so D11's live
  truth ("specular egregious — thought fixed by W09") inherits W52's pending live arm. The radial
  *count* the prior audit enumerated (`--glass-curvature-overlay` triple-def + dead `-dark`
  orphan, `dock-controls.css` 30%30% corners) should be re-verified swept under W52's tune — NOT
  confirmed at source in this lane (route to the W-glass-material inventory lane + W52 live close).

### S-E — Bundle-budget re-baselines (process-hygiene smell, carried) (minor)

`693bf3b` lifted CSS gzip 134k→140k for the 3.8.0 cut (the prior audit's S5: forward-sized for
unwritten W06/W38/D17). `d21babb` re-baselines AGAIN for "W53 tabs + W19 prunes". Two re-baselines
in the convergence band without a single RE-TIGHTEN, even though W19 NET-REMOVED three demo+src
families (disco-glyph/glyph-face/glass-carousel CSS+SFC). The honest move (per S5) sizes to the
ACTUAL post-prune measured draw; route the re-tighten to **W33 close**. Minor.

---

## 3 — DEFERRED items that must FOLD INTO this tranche

1. **The convergence-1 net-new band W44/W46/W47/W48/W49/W50/W51 is DOC-ONLY** — seven authored-
   but-unbuilt waves, several owning the LOUDEST user defects (W46 blob D4/D5/D7 "totally broken
   moods + broken hover"; W48 glass-material D8/P9 "totally broken"; W47 van-Gogh D2 "where are
   they?"; W44 dark-red D10 unreadable; W51 the `--ui-scale` D18 umbrella). These are the bulk of
   the remaining tranche and MUST be executed before any AX close.
2. **W54 + W55 (glass-first-class + adaptive-glass) are DOC-ONLY** — the G1/G2 pass-2 headline
   ("why is the default not glass?" + iOS27 adaptive darkening). Foundational token axes other
   waves consume.
3. **The live-MCP close for W45(DK7)/W52(D19)/W53(T1)/W56/W57/W59** — every one is `live-pending`
   or `handed-to-orchestrator` with an INCOMPLETE orchestrator log (S-B). The binding live audits
   are owed; "live-verified (DEVELOPED)" must not stand until they run + record.
4. **The W58 re-green** (S-C) — W45's `dock.vue:86` AX.W45 comment fails `proof:story-language`.
5. **The structural close band W25–W29/W33–W35/W41** — all still `planned`/born-RED at HEAD
   (god-module REDs on useMetaballRenderer/GlassDock/constellationField owed to W26; legacy-
   commentary owed to W27; speedtest native-first W28; ci.yml drift owed to W33). Unchanged from
   the prior bands' carry-forwards.

---

## 4 — GAPS (plan divergences / unaddressed prompts)

- **PROGRESS-ledger discipline is STILL violated** (S-A) — the exact gestalt fix the prior
  `A-session-soundness.md` prescribed ("a wave whose JSON status is not unconditionally complete
  MUST carry its qualifier into PROGRESS") was NOT institutionalized: the convergence-2 band
  repeated it with `live-verified (DEVELOPED)` over `live-pending` JSONs. The fix is a PROGRESS
  status vocabulary that does not let a doc commit's "live-verified (MCP)" claim outrun a recorded
  orchestrator pass. Route to W33 (it owns the final ledger reconciliation).
- **Doc-commit claims out-run the evidence** (S-B) — `88a2ec5`/`9d306e4` claim MCP live-
  verification for DK7/T1 that the orchestrator log marks "more to come". This is a greenfield-no-
  meta / runtime-truth-beats-source-claims violation at the COMMIT-MESSAGE level. No fix needed in
  code; the gap is the live arm those commits cite must actually be RUN + recorded before close.
- **No full-fleet gate re-run after the last commit** (S-C proves it) — `proof:story-language`
  RED at HEAD means the band shipped its final commits without re-running the fleet. A
  `npm run proof:all` (or the CI aggregate) at every band-close would have bitten.
- **The convergence-1 sequencing (CONVERGENCE-PLAN §Sequencing) was NOT followed** — the plan
  ordered "live-truth re-opens FIRST: W09(D11), W46(D4/5/7), W44(D10), W05(D3)". In practice the
  band executed convergence-2 (W52/W53/W56-W59 + W45 + W19) and left the convergence-1 live-truth
  re-opens (W44/W46/W47/W48) entirely unbuilt. The loudest blob/glass-material/dark-contrast
  defects are still open while squircle tokens + slider redesign shipped — a priority inversion vs
  the user's own ranked defect list.

---

## 5 — The gestalt PATH FORWARD (planning only)

1. **Stop the inflation at the ledger, structurally.** W33 (close) institutionalizes a PROGRESS
   status enum where `live-verified` is reachable ONLY from a recorded orchestrator-MCP pass for
   that wave (cite the pass-log line). De-mark W45/W52/W53/W56/W57/W59 PROGRESS rows from
   "live-verified (DEVELOPED)" to `live-pending` until the orchestrator log records each. This is
   not new policy — it is enforcing the fix the prior audit already prescribed.

2. **Run the owed live-MCP close pass as ONE orchestrator session** over the convergence-2 surfaces
   (DK7 layer-lag, T1 segmented glide, W52 D19 bloom-gone + radial sweep, W56 cornerShape readback,
   W57 pulse calm, W59 slider drag) at localhost:5173 via chrome-devtools-mcp, recording each in
   the pass-2 log. Only then do the doc-commit "live-verified" claims earn themselves.

3. **Execute the doc-only convergence-1 band in the user's RANKED order** — W46 blob (D4/D5/D7,
   the loudest "totally broken"), W48 glass-material (D8/P9), W44 dark-red (D10), W47 van-Gogh
   (D2) FIRST; then W49/W50/W51 + W54/W55. Each closes on a recorded live audit, never headless.

4. **Re-green the fleet + re-tighten the budget at close** — fix the `dock.vue:86` AX.W45 comment
   (W58 re-green), run the full proof fleet, re-tighten the CSS budget to the post-W19-prune
   measured draw (W33). Make a full-fleet `proof:all` a band-close GATE so a later commit can never
   silently re-RED an earlier gate again (the S-C class).

5. **Keep the clean-break discipline that worked** — W53's BouncyToggle deletion + W19's three-
   family excision are the model: no aliases, no shims, the defect gone by removal. Apply the same
   to the blob/glass-material reauthors (W46/W48 are demo-reauthor + library-retune, no compat
   bridge).

---

## Verification trail

- Topology: `git merge-base --is-ancestor 56db9e0 c72d2ac` → NO (W45 post-dates named base);
  `… 56db9e0 88a2ec5` → YES; `git log c72d2ac..88a2ec5` = b03246c/56db9e0/88a2ec5.
- Doc-only convergence-1: `git log abe33d9~1..88a2ec5 --grep` shows W44/W46-W51 only in the
  authoring doc `b9d0a7f`; no feat/fix commit. W45 = `56db9e0` (feat).
- Convergence-2 code: `31d716e`/`97551ca` (W52), `d4c2910`/`7c4d6c9` (W53), `8e17346` (W56),
  `bea6a47` (W57), `5ff9098` (W58), `a730782`/`d21babb` (W59), `509aed8` (W19).
- JSON statuses: W52/W56/W59 `dev-complete-headless-green-live-pending`; W57 `handed-to-
  orchestrator`; W45 `DEV-COMPLETE (… live π owned by orchestrator)`; W58 `dev-complete-source-
  green-no-live-arm`; W53 gates `pass` + π `ran`.
- Incomplete live log: `convergence2/orchestrator-mcp-live-pass2.md` captures only P6; DK7/DK8/
  T1/P1/P9 "more to come".
- Gates at HEAD: `typecheck` EXIT 0; `proof:gate-script-parity` PASS (0 new orphan/dangling/ghost;
  5+2 AW-owner baseline); `proof:tabs-unified` PASS (π ran); `proof:liquid-glass-material` PASS;
  **`proof:story-language` EXIT 1 (RED)** — `dock.vue:86` AX.W45 comment.
- W19 prune: `disco-glyph/` `glyph-face/` `glass-carousel/` dirs removed; `useTokenColor.ts` kept.
- Cross-ref: prior `convergence/A-session-soundness.md` (S1–S7, ends at f2fc614/3.8.0) — this
  lane extends it forward through W45/W52/W53/W56-W59 and finds S1/S3 recurred as S-A/S-D.

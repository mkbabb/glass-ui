# AZ.W-PRUNE2 — the round-2 prune: the E4 verdicts executed, the books re-dispositioned, the census model fixed

**Track:** Z (hygiene) · **Type:** prune + evidence · **Repo:** glass-ui (+ the census reads the constellation read-only)
**Depends on:** AZ.W-GATES (Batch 0 — the gate manifest is sound first) · runs Batch 5.
**STATUS: SPEC**

The AY prune (W-PRUNE/W-SB1) took the headline retires; the 32-lane fleet's E4 census found the
next tier — CSS orphans the component retires left behind, self-justifying composable clusters, and
a census-model gap (three constellation repos no longer consume glass-ui at all, so their PRUNE-LEDGER
counts are stale). Every verdict below is the fleet's, re-verified at execution HEAD per §0.

## §0 — RE-GROUND (step-0, mandatory)

```
grep -rn "instrument-rail" src/styles/ src/ demo/ | grep -v retired
grep -rn "rainbow-vivid\|rainbow-pastel\|rainbow-text" src/ demo/ ../slides/src ../speedtest/src ../words/frontend/src 2>/dev/null
grep -rn "useGlassRenderer\|createGlassFilter" src/ demo/ ../slides/src ../speedtest/src 2>/dev/null
grep -rln "GlassUnderline\|glass-ui/underline" ../slides/src ../sci-report 2>/dev/null   # E4-4 the slides re-point status (0 at authoring HEAD — the underline KEEP is FALSE if still 0)
grep -in "underline" docs/tranches/AZ/waves/AZ.W-ADOPT.md                                 # E4-4 confirm W-ADOPT is NOT the underline trigger (0 hits — it is constellation-only)
grep -rln "useGlassRenderer\|composables/glass" src/index.ts demo/stories/manifest.ts     # E4-3 confirm the cluster is ON the root barrel + has a registered demo story BEFORE any "off the public surface" retire
npm run -s proof:component-orphan   # the live census (siblings present)
```

Re-run the FLEET-DIGEST E4 lane's counts — the constellation moves under us (E4-7: sci-report is
now a Python project; value.js declares-but-never-imports; keyframes.js is mid-re-pin per
AZ.W-KF-CONSUMER). A verdict taken on a stale count is the lie this wave exists to kill.

## §1 — The verdict table (each re-verified, then executed)

| id | artifact | fleet verdict | the execution |
|---|---|---|---|
| E4-1 | `src/styles/instrument-rail.css` | PURE CSS ORPHAN — its sole consumer (InstrumentRail) retired at PRUNE-LEDGER R5; the sheet was left behind | DELETE the file + its `index.css` import + add `.instrument-rail*` to `.retired-classes.txt` (the phantom-class guard) |
| E4-2 | `@utility rainbow-vivid` + `rainbow-pastel` (`utilities/btn.css:303,316`) | CSS-class orphans, zero consumers anywhere | DELETE both utilities; retired-classes entries |
| E4-10 | the CLAUDE.md `rainbow-text` line | doc drift — the utility no longer exists | scrub the line (doc-truth, with E4-2's edit) |
| E4-3 | the `useGlassRenderer`/`createGlassFilter` cluster (`composables/glass/index.ts`) | self-justifying orphan candidate — its BINARY consumer (GlassPanel) retired | **Re-ground FIRST, the framing is stale on two counts:** (1) the cluster is ON the root barrel (`src/index.ts:143` `export * from "./composables/glass"`), NOT only api seats — and there is NO `/glass` subpath nor any `Glass{Tier,FilterState}`/`UseGlassRendererReturn` api seat (grep at HEAD: the api seats the prior verdict named do NOT exist), so "retire off barrel + api seats" mis-states the surface (it is barrel-only). (2) it has a LIVE registered demo story — `demo/stories/composables/use-glass-renderer.vue` (imports it via relative `../../../src/composables/glass/useGlassRenderer`, exercising all four tiers) + `demo/stories/manifest.ts:338`. So the retire is CONDITIONAL on the evidence bar the project actually uses: a demo-private story is NOT a ≥2-binary-consumer (a story is not binary, per `proof-component-orphan`'s own own-story exclusion), so the cluster is demo-justified-only. The execution: EITHER (a) retire the `useGlassRenderer`/`createGlassFilter` cluster from the root barrel (`src/index.ts`) AND drop the demo story + its `manifest.ts:338` row in the SAME change (a barrel retire that strands its only exerciser is incoherent — MIGRATION.md notes the barrel-export removal, clean break, no alias); OR (b) KEEP it as a demo-evidenced detection-cascade probe with a `docs/consumer-evidence/use-glass-renderer.md` doc naming the demo story + a re-audit trigger ("a 2nd binary consumer, or the demo retires"). The recommendation is (a) IF the cluster is barrel-public-without-a-binary-consumer (the barrel surface must earn its weight); (b) only if the detection-cascade probe is a deliberate demo-private keep. The `useWebGLCanvas`/`useCanvas2D`/`useSpecularTracking` substrate is NOT touched (live: aurora/blob/constellation). **CROSS-BATCH COORDINATION — W-ADAPTIVE-AUTO (Batch 1) adds `useGlassBackdropLuminance` to `composables/glass/index.ts` (its File Bounds: "barrel export, if public").** If W-ADAPTIVE-AUTO published that observer through the SAME `composables/glass` subtree the root barrel re-exports (`src/index.ts:143-144` `export * from "./composables/glass"`), arm (a) — retiring the whole `export *` line — would STRAND the new public observer off the root barrel. RE-GREP at THIS wave's HEAD (Batch 5, after W-ADAPTIVE-AUTO landed at Batch 1): if `useGlassBackdropLuminance` is a live public export on the glass barrel, arm (a) does NOT blanket-remove `export * from "./composables/glass"` — it retires ONLY the `useGlassRenderer`/`createGlassFilter` cluster (a named re-export carve, not the whole subtree) and PRESERVES the observer's public reach (or W-ADAPTIVE-AUTO's choice to keep the observer internal moots the conflict). The chosen arm + the re-grepped barrel/story state + the observer-export reconcile is recorded in the close. |
| E4-4 | `/underline` (0 external consumers) | **RE-GRADE — the prior KEEP rationale rests on a PHANTOM trigger.** The FLEET-DIGEST E4-4 finding (this row's own basis) flags `/underline` a PRUNE-CANDIDATE: "slides STILL ships its own local hand-underline (til-briefing SlideCloser/SlideIntro) and has NOT re-pointed … retire if the slides re-point hasn't landed." Re-grep at HEAD CONFIRMS: `grep -rln 'GlassUnderline\|glass-ui/underline' ~/Programming/slides/src` → ZERO; `slides/src/decks/til-briefing/slides/{SlideIntro,SlideCloser}.vue` still carry the LOCAL hand-underline. And **AZ.W-ADOPT does NOT re-point the underline** — `grep -in underline AZ.W-ADOPT.md` → 0; W-ADOPT is a CONSTELLATION wave (it migrates the `data-constellation` canvas, never the hand-underline), so "AZ.W-ADOPT's sibling deck work is the trigger" is FALSE. | The verdict is the FLEET's, executed honestly: re-grep the slides re-point at THIS wave's HEAD. (a) If slides has re-pointed `/underline` → KEEP, evidence doc gains the real consumer + re-audit date. (b) If NOT (the HEAD reality) → either NAME the real future re-point wave as the trigger in `docs/consumer-evidence/underline.md` (a slides-side wave that actually swaps `SlideIntro`/`SlideCloser` hand-underline → `@mkbabb/glass-ui/underline`, NOT W-ADOPT), with the re-grade-or-retire date, OR record the keep-justification as a single-demo-story (`motion/underline.vue`) hold ONLY if that clears the evidence bar — otherwise it RETIRES per FLEET E4-4 (churned out-and-back-in within one band, no consumer). NO phantom "W-ADOPT is the trigger" survives. The chosen disposition is recorded in the close with the re-grepped slides state as evidence. |
| E4-5 | `foundations/paper-backdrop.vue` vs `paper-backdrop-texture-system.vue` | near-duplicate showcases | MERGE into one story (the texture-system page absorbs the 63-line twin); the route + nav entry drop |
| E4-6 | watercolor-dot | KEEP-EVIDENCED HOLDS (honest, re-tested) | no action; the evidence doc gains the re-test date |
| E4-9 | `constellation` + `sortable-list` (0 external consumers, no evidence docs) | free-riding the census | WRITE `docs/consumer-evidence/{constellation,sortable-list}.md` — constellation's trigger is AZ.W-ADOPT (the slides adoption IS the second consumer, in-flight); sortable-list gets a keep-or-retire verdict on the re-ground count |
| (orchestrator) | `status-dot` (1 non-self consumer: slides SlideXray) | banked at the AY close | evidence doc with the slides consumer named, or retire if the re-ground shows the slides usage also gone |
| B1 | `W-AUR-T5` (anisotropic Kuwahara) | carried book | re-disposition: stays BOOK'd with the explicit trigger ("the painterly band re-opens OR the user names the medium") — or executes if AZ's blob/aurora batch surfaces the need |
| B1 | `W-LIGHTHOUSE` | carried book | re-disposition with trigger ("the perf budget regresses past the profile:budget ceiling" or user ask) |
| E4-7 | the PRUNE-LEDGER stale counts | census-model gap | the ledger gains a `census-as-of: <commit>` header + the consumer-roots table names which repos COUNT (a Python sci-report does not); `proof:component-orphan`'s `CONSUMER_ROOTS` re-audited against it |
| E4-8 | the corrected census (stacked-icons=2 via words, etc.) | facts | fold the corrected counts into the ledger (no retires from this row — it CLEARS candidates) |

## §2 — Goal criterion

Zero unexcused orphans: every published `src/` artifact has ≥2 real call-sites, OR a
consumer-evidence doc with an explicit re-audit trigger, OR is deleted this wave. The census model
is dated and repo-scoped so the next prune starts from truth.

## §3 — Completion criterion + the hard gate

`proof:component-orphan` GREEN on the full local constellation (no new evidence-doc-less 0/1-rows);
`proof:phantom-classes` GREEN (the deleted classes joined retired-classes.txt); `npm run build` +
`verify-export-types` green (the cluster retire is a public-surface change — MIGRATION.md notes it,
clean break, no aliases); the budget rebaseline reflects the deletions.

**Gate:** the existing `proof:component-orphan` + `proof:no-retired-survivor` ARE the gates — this
wave drains them. The MIGRATION claims for any retired export join `RETIRED_CLAIMS`
(machine-checked). Bite: re-export a retired symbol → no-retired-survivor RED; add a 0-consumer
export without an evidence doc → component-orphan RED.

## §4 — Scope fence

No component REDESIGN — pure retire/evidence/doc-truth. The Metric* convergence is
AZ.W-METRIC-UNIFY's; the demo-route IA beyond the one merge (E4-5) is W-SHELL-CONFIG's. The
`useWebGLCanvas` substrate and every ≥2-consumer surface are untouchable here.

## §5 — Named successor

The census-as-of model (E4-7) hands `proof:component-orphan` hardening to AZ.W-GATES if not
absorbed there first; any retire this wave defers on a discovered live consumer becomes a BOOK row
with that consumer named as the trigger.

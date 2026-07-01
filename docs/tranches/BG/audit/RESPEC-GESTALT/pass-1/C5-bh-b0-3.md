# C5 — BH plan critique, bands B0–B3 (hygiene · legacy excision · export reshape · demo restructure)

Lens C5 of the RESPEC-GESTALT 32-lens audit. Scope: `docs/tranches/BH/PLAN.md` §4 bands **B0/B1/B2/B3** +
the folded `docs/tranches/BH/audit/RESPEC-COHERENCE/AMENDED-BH-COHERENCE-PLAN.md`. Verified on disk
`tranche/BG` HEAD `976dc890`, 2026-07-01. Five-axis judgment (missed-obvious / gestalt / over-contrivance /
encapsulation / elegance) + KEEP/AMEND/MERGE/PRUNE per wave.

## Verdict

The BH B0–B3 half is **sound in direction, but its own PLAN.md is not synced to disk** — the single most
telling defect for a tranche whose thesis is "the repo is disciplined, not dirty" (`PLAN.md:12`). **All of B1
(3 waves) and B2.4a (3 carves) have LANDED on disk, yet the plan still narrates them as pending work and
grounds its §1 binding question on a payload bug that was fixed at `7813a695` three days before the coherence
audit ran** (`PLAN.md:17` still reads "@lucide/vue is bundled into dist because libraryExternal lists the dead
lucide-vue-next + vaul-vue"; `vite.library.ts:73-85` already externalizes `@lucide/vue` and the dead strings
survive only in a comment). The 92%-converged coherence audit marked B1-W2/W3 landed but MISSED that B1-W1
also landed — the exact "missing obvious issues" recursion the mandate names, occurring *inside the cleanup
tranche*. Beyond staleness, B0–B3 carry two real structural problems: **B3 fragments the demo restructure
across BG and BH with an unresolved manifest-direction conflict** (BG consolidates INTO `manifest.ts`, B3
splits it OUT — the reconcile is DEFERRED to execution), and **B3's glob-to-`index.vue` migration is
over-contrivance that lens B8's F8 depth-fix already supersedes**. B2 (the export reshape) is the genuinely
elegant de-indirection of the tranche, but it is almost entirely post-WS12-serialized and carries three
verify-only "waves" that are wave-granularity-as-disease. The band delivers a disciplined *export surface*; it
does not yet deliver a disciplined *plan*.

---

## FINDINGS (ranked by severity)

### F1 — [MAJOR · missed-obvious/elegance] The plan narrates landed work as pending; §1 rests on a fixed bug

The whole of B1 and B2.4a is DONE on disk, yet PLAN.md describes them as work-to-do:

- **B1-W1-external-payload LANDED `7813a695` (2026-06-28 23:44)** — `git log -S '"@lucide/vue"' -- vite.library.ts`
  returns exactly that commit; `vite.library.ts:85` has `"@lucide/vue"` in `libraryExternal`; the dead
  `lucide-vue-next`/`vaul-vue` strings exist only in the explanatory comment at `:65`; `scripts/proof-external-payload.mjs`
  exists and is registered (`gates.mjs:1273`). **Yet `PLAN.md:17` (§1-#4) states the bug in present tense** —
  "@lucide/vue **is** bundled into dist … every consumer double-loads lucide" — and `PLAN.md:61` lists
  `W1-external-payload [C]` as a wave to author ("drop dead … add @lucide/vue").
- **B1-W2-value-destraddle LANDED** — `package.json:1080` is a single `^1.0.0` (the `^0.13.0 || ^1.0.0` straddle
  is gone). The plan half-acknowledges this (`PLAN.md:62`) but still lists W2 as a wave.
- **B1-W3-dragmorph-snap-excise LANDED `ba23c086`** (plan acknowledges, `PLAN.md:63`).
- **B2.4a's 3 carves LANDED** — `useCarouselWorm.ts`, `usePagerWorm.ts` present on disk;
  `RATCHET_BASELINES == {}` (`proof-no-god-module.mjs:20`). Plan marks it "LANDED" (`PLAN.md:71`) — the ONE
  correctly-synced row.

So **B1 has nothing left to build** (3/3 landed) and B2.4a is done — but the plan presents them as ~4 pending
waves and anchors its central thesis ("one real payload bug", `PLAN.md:12-17`) on a fixed defect. The coherence
audit (`AMENDED-BH-COHERENCE-PLAN.md`, HEAD `eaf2c172`, AFTER `7813a695`) caught W2/W3 but never re-verified W1
or the §1-#4 claim. This is not cosmetic: a develop-ready plan whose binding-question evidence is stale will
mislead the execution agent into re-doing landed work or, worse, "fixing" an already-correct `libraryExternal`.

### F2 — [MAJOR · encapsulation/gestalt] B3 fragments the demo restructure across two owners with an unresolved manifest-direction conflict

`PLAN.md:5` and `:42` (§3) both declare **"BG owns the entire `src/` + `demo/` + `scripts/gates.mjs` write-set;
BH dodges it."** Yet **B3 (δ2–δ6) writes `demo/` directly** — dissolve `demo/composables/`, colocate the flat
`stories/` chassis into `chassis/{…}`, split `manifest.ts`, change the glob, re-home `layout/`→`shell/`
(`PLAN.md:80-84`). The plan "resolves" this by sequencing B3 after WS4, but sequencing is timing, not ownership:
the demo restructure is now split across **BG-WS4** (`BG.W-DEMO-CHASSIS-CONSOLIDATE` + `BG.W-MANIFEST-COLOCATE`,
`bg-build-map.md:492-496`), the **BG B8-derived content merges** (`BG.W-DEMO-DUP-MERGE`, Timeline×3/Scroll×3),
AND **BH B3** — three loci for one coherent restructure. That is the "poor encapsulation / lacking elegance"
the user's meta-critique names, reproduced at the plan level.

The conflict is concrete and **DEFERRED, not resolved**: `BG.W-MANIFEST-COLOCATE` folds the 4 string-keyed maps
*onto* the `s()` rows, **keeping `manifest.ts` as the single source** (`bg-build-map.md:495`). B3 δ5/δ6 then
**splits `manifest.ts` out** into `chassis/manifest/{rows/<category>,…}` (`PLAN.md:82`). Opposite directions on
the same file. The plan's own text concedes it is undecided: *"Reconcile `BG.W-MANIFEST-COLOCATE` … decide
row-split vs accept on the post-WS4 line count"* (`PLAN.md:82`). A "develop-ready" band cannot leave its central
file-shape decision to a post-WS4 coin-flip. The elegant end-state is ONE manifest decision by ONE owner —
consolidate-and-stop, not consolidate-then-re-fragment.

### F3 — [MAJOR · over-contrivance/elegance] B3 δ6's glob-to-`index.vue` migration is contrivance that lens B8's F8 already supersedes

Disk today: **120 flat `<cat>/<id>.vue` stories, ZERO `index.vue` dir-form** (`find demo/stories -name index.vue`
= 0). B3 δ6 changes the glob `./*/*.vue → ./*/*/index.vue` and migrates stories into per-story dirs, guarded by a
"KISS: trivial stories stay FLAT … mixed glob (dir-form winning)" note (`PLAN.md:82`). A **mixed glob** (two
patterns to support a partial migration) to convert ~40 stories-with-parts while leaving ~80 flat is precisely
the over-engineering the mandate condemns — and it is unnecessary.

Lens B8 (`pass-1/B8-demo-architecture.md:177-193`, F8) found the *actual* problem — the `demo/stories/aurora/`
sub-component dir sits at 2-glob-segments-deep and leaks into the manifest namespace — and prescribes the KISS
fix: **`git mv demo/stories/aurora/ → demo/stories/substrates/aurora/`** (nest one level deeper, matching
`dock/examples/`'s 3-segment shape), which removes it from the `./*/*.vue` glob "for free … a single git mv +
import-path update" (B8 F8, `:277`). That fix keeps ALL 120 stories flat, needs NO glob change, and colocates
parts under a sibling `<cat>/<id>/` dir reached by relative import (the pattern `aurora/` already uses, just at
the wrong depth). The lens's own suspicion — "does the demo restructure critique from lens B8's math change B3's
shape?" — is **borne out: yes.** B8's depth-nest is the idiomatic transposition; B3 δ6's per-story-dir migration
is a rearrangement that adds a mixed-glob code smell for zero payoff on 80 trivial pages.

### F4 — [MAJOR · over-contrivance] B2's verify-only "waves" are wave-granularity-as-disease

B2 is 10 waves (`PLAN.md:65-75`). **Three of them build nothing** — they are "consume/verify BG's landed leaf
shape, ZERO BH carve":
- B2.4b (`[WS4]`) — "verify `createCanvasLifecycle`/`useWebGPUCanvas`/`SegmentedTabs` match BG's leaf" (`PLAN.md:72`).
- B2.4c (`[WS5]`) — "verify `useBlobSatellites`/`useGooDotMatrix`" (`PLAN.md:73`).
- B2.5 (`[WS2]`) — "verify `GlassDock`/`useDockFission` + reconcile a stale comment" (`PLAN.md:74`).

A "confirm the upstream wave landed the shape I expect" step is a **checklist precondition, not a wave**. The
RESPEC-GESTALT mandate names this exact class (over-contrivance axis 3: "wave-granularity-as-disease, 151 rows").
BH replicates the disease at ~30 waves, of which ~7 (B1×3 landed + B2.4a landed + B2.4b/c + B2.5) are landed or
verify-only. The three verify steps are gated on *different* BG waves (WS2/WS4/WS5), so they cannot merge into
one time-slot, but they SHOULD collapse into a single row `B2-leaf-verify` with three preconditions and one gate
("all BH reader-gate expectations re-point if BG diverged"), or fold into B2.1-swap as its precondition list —
not three standalone plan rows implying three build efforts.

### F5 — [MEDIUM · missed-obvious/gestalt] B1 "Legacy excision" is misnamed; the real dead-code sweep is DEFERRED

The band title is "Legacy excision + payload fix" (`PLAN.md:60`) and §1's "disciplined, not dirty" premise rests
on **`TODO`/`FIXME`/`@deprecated` in src = 0** (`PLAN.md:12`), which I verified = 0. But a **comment-marker grep
is not a legacy-mechanism census.** Real legacy is dead exports, retired-but-referenced mechanisms, orphan
tokens, dual paths — none of which a TODO grep sees. B1's three waves are all *specific bug-fixes* (payload,
dep-floor, snap-excise), all landed; the band **excises no legacy at all**. The genuine systematic sweep is
explicitly **DEFERRED**: `PLAN.md:34` "DEFER the 164-script detector-kit refactor past BH" and `PLAN.md:100`
"B5d-detector-kit — DEFER past BH." So the band that promises legacy excision does the shallow marker check,
fixes 3 bugs, and pushes the mechanism-level sweep out of the tranche.

This matters because the lens's framing question — "does B1's legacy excision have a complete census, or will it
miss legacy the way prior prunes did?" — has a clear answer: **the census is shallow and the deep sweep is
deferred, so B1 will miss any latent legacy exactly the way prior prunes did.** The B2 reshape is where latent
dead exports would actually surface (200 `/api` symbols re-homed — a dead one carries forward silently); B1 does
not gate on that. Honest fix: rename B1 to what it is ("payload + dep-floor fixes, LANDED") and either add a real
dead-export/orphan-token sweep to the tranche or state plainly that legacy-mechanism excision is deferred with a
named trigger — do not title a band "legacy excision" while deferring the only tool that finds legacy.

### F6 — [MEDIUM · elegance] B2's fail-closed generator + 3 policy maps: de-indirection, or machinery-for-machinery?

B2's headline is real de-indirection: three stacked redundancy layers — `src/subpaths/` (79 mirror files) +
`src/api/` (854L aggregator, verified `wc -l`) + 7 flat `src/*.ts` barrels — collapse to ONE generated
entry-set (`PLAN.md:14`, `:65-70`). Collapsing 3 export dialects to 1 source is the correct architectural
transposition. **But the replacement is not obviously simpler.** The 79 files die; in their place arrive:
`regen-exports.mjs` + **3 policy maps** (CURATED 11 + COMPOSABLE_SUBPATHS 7 + an exhaustive
PUBLISH/INTERNAL/CURATED per-dir classification) + a shared map module + a symbol-fidelity check + a **new
fail-closed gate** `proof:subpath-classify` + a re-authored `flatten-subpath-types.mjs` (`PLAN.md:67`, §6:129).
The 79 files were dumb but **greppable** (one line each, `export * from …`); the generator is DRY but its
correctness lives in a classification policy that needs a fail-closed gate to stay safe — and a mechanism that
requires a fail-closed gate to be trustworthy is itself non-trivial machinery. This is worth a hard look at
execution: the elegance claim is "3 layers → 1 source," but the *simplicity* claim ("disciplined not dirty")
should be measured, not asserted — does net indirection actually drop, or does it move from explicit-files to
opaque-policy? Recommend the B2.1-mech wave carry a concrete acceptance measure (LOC/indirection-depth before vs
after) rather than the count of files deleted.

### F7 — [MEDIUM · gestalt] BH's headline deliverable is fully hostage to BG completion

B2.1-swap/B2.2/B2.3/B2.6 — the entire export reshape *execution* — is `[WS12]` (`PLAN.md:68-75`): it cannot start
until BG's full close (WS1→…→WS12, ~110 waves). The central artifact, the 203-row `/api` migration map, is a
**4.2.0 snapshot that must be re-derived post-WS12** against the landed surface (`PLAN.md:116` §5-1, "the
dominant residual"). So the tranche's marquee value (the 5.0.0 clean-break export surface) is (a) entirely
serialized behind BG and (b) built on a provisional map. This is risk-accepted and honestly flagged, but it
should be stated plainly in §1 as a gestalt fact: **BH's disciplined-repo payoff is not independently
deliverable — it is the tail of BG.** That reframes the "joint 5.0.0" from a convenience into a hard
dependency, and argues for keeping BH's truly-concurrent value (B0, the doc bands, prompts) crisp and NOT
letting the plan's weight sit on the post-WS12 reshape.

### F8 — [MINOR · missed-obvious] B0's scratch census is stale (same class as F1)

`PLAN.md:57` cites "the 99 root scratch images (28MB, gitignored)." Disk today: `git clean -ndX` shows **79 loose
root `.png`/`.webp`** + a much larger **1275 gitignored files under `docs/`** (the tranche visual-capture
archives, which must NOT be swept). B0's gate is `git status` scratch-clean scoped to root images + `.playwright`
/`.tmp`/`test-results` (`PLAN.md:58`) — correctly scoped, so no catastrophe risk — but the "99" figure is drift,
the same plan-vs-disk staleness as F1. Harmless to execution; symptomatic of the plan-hygiene gap. (`test-results/`
and `.browserslistrc` are already un-tracked — `git ls-files` returns 0 — so those B0 sub-items may also be
partially landed; verify at execution.)

---

## FOLD CANDIDATES (for AMENDED-GESTALT-PLAN)

1. **plan-doc-edit — Re-sync B1 + §1 to disk (F1, F8).** Mark B1-W1/W2/W3 **LANDED** with their commit SHAs
   (`7813a695`/`—`/`ba23c086`); delete the present-tense payload-bug claim at `PLAN.md:17` (§1-#4) and replace
   with "LANDED at `7813a695`, `proof:external-payload` GREEN"; refresh the B0 "99 images" figure to the disk
   count. **Gestalt:** the cleanup tranche's plan must itself pass the discipline bar it enforces — a plan
   describing fixed bugs as open is the "missing obvious issues" defect at the meta level. Add a one-line
   develop-rule: *every BH band re-verifies landed-vs-pending against disk before fold* (the coherence audit's
   miss of W1 is the proof this is needed).

2. **merge-waves — Fold B3 into BG-WS4 under ONE demo-restructure owner (F2).** The demo restructure is split
   across `BG.W-DEMO-CHASSIS-CONSOLIDATE`, `BG.W-MANIFEST-COLOCATE`, `BG.W-DEMO-DUP-MERGE`, and BH-B3 — collapse
   the BH-B3 δ2–δ6 demo/ writes INTO the BG-WS4 demo cluster (BG already owns `demo/` per §3). **Resolve the
   manifest direction ONCE, at develop, not post-WS4:** decide consolidate-and-stop (keep `manifest.ts`, per
   `BG.W-MANIFEST-COLOCATE`) vs carve-to-`rows/<category>` — do not consolidate then re-fragment. **Gestalt:** one
   restructure, one owner, one manifest shape; the interleave DAG loses an entire post-WS12 band.

3. **amend-wave — B3 δ6: drop the glob-to-`index.vue` migration; adopt B8's F8 depth-nest (F3).** Replace the
   `./*/*.vue → ./*/*/index.vue` mixed-glob migration with the KISS end-state: keep all 120 stories FLAT
   `<cat>/<id>.vue`, and colocate sub-component dirs one level deeper (`git mv demo/stories/aurora/ →
   demo/stories/substrates/aurora/`, matching `dock/examples/`'s 3-segment shape). **Gestalt:** the idiomatic
   transposition B8 already found — solve the namespace leak by depth, not by migrating 80 trivial pages into
   dirs behind a two-pattern glob. Cross-reference B8 F8 explicitly in the wave so the two lenses agree.

4. **merge-waves — Collapse B2.4b/B2.4c/B2.5 into one `B2-leaf-verify` checkpoint (F4).** Three verify-only rows
   (zero BH carve) become one row with three preconditions (WS2/WS4/WS5) and one gate ("re-point BH reader-gate
   expectations if BG's landed leaf diverged"). **Gestalt:** a checklist precondition is not a wave; drop the
   ceremony the mandate condemns. Nets B2 from 10 → 8 rows.

5. **amend-wave — Rename B1 and make its legacy claim honest (F5).** Retitle B1 "Payload + dep-floor fixes
   (LANDED)". Either (a) ADD a real dead-export/orphan-token sweep gated on the B2 reshape (where dead `/api`
   symbols surface), or (b) state plainly that legacy-MECHANISM excision is deferred to the B5d detector-kit with
   a named post-BH trigger. **Gestalt:** do not title a band "legacy excision" while deferring the only tool
   (detector-kit) that finds legacy; the "disciplined not dirty" premise must rest on a mechanism census, not a
   TODO grep.

6. **plan-doc-edit — B2.1-mech: add a net-indirection acceptance measure (F6).** The regen mechanism wave's gate
   should assert the DE-INDIRECTION is real (indirection-depth / total export-wiring LOC before vs after),
   not merely "79 files deleted + fidelity 96/96." **Gestalt:** prove the generator+policy is simpler than the
   files it replaces; a fail-closed gate is machinery, and the mandate values measured simplicity over asserted
   DRY.

7. **defer-honest — Accept B2's post-WS12 serialization as inherent, state it in §1 (F7).** No wave change — but
   add to `PLAN.md:12` §1 the plain fact: *BH's export-reshape payoff is the tail of BG (all swap waves `[WS12]`,
   the 203-row map provisional until post-WS12 re-derive).* **Gestalt:** the "joint 5.0.0" is a hard dependency,
   not a convenience; keep BH's independently-deliverable value (B0 + docs + prompts) crisp so the tranche is not
   all-or-nothing on BG.

## Cross-refs

- Builds on `pass-1/B8-demo-architecture.md` (F3 adopts its F8 depth-nest; F2 references its `BG.W-DEMO-DUP-MERGE`
  content merges — note B3's manifest carve must consume the post-B8 −4-page set, a coherence edge B3 does not
  currently cross-reference).
- `AMENDED-BH-COHERENCE-PLAN.md` (HEAD `eaf2c172`) resolved C1–C6 but did NOT re-verify B1-W1's landing or the
  §1-#4 payload claim (F1) — this lens adds that miss.
- Does not re-litigate the C4/C5 peer-floor + CLAUDE-delete machinery (out of B0–B3 scope; owned by the coherence
  fold).

# BB.W-SURFACE-AXIS-COMPLETE — thread the shared {glass·veil·opaque} axis onto Toast + Button; make the CLAUDE.md doc honest

**Name**: W-SURFACE-AXIS-COMPLETE - the R8-12 enrollment finished + the doc-lie killed
**Opens after**: Batch 0 closed (W-CI-GREEN green master CI + W-CLOSE-BATTERY rule landed); runs ‖ Batch 2 (W-SCROLL-FADE-RETIRE ‖ W-DEAD-SWEEP ‖ W-DOCK-RAIL-SEAT-FINAL — component-family-disjoint bounds per EXECUTION-DAG §5). The shared seam (`useSurfaceAxis.ts` + `surface-axis.css`) is ALREADY landed (BA.W-SURFACE-AXIS, 4.0.0) — this wave EXTENDS the enrollment onto two surfaces the BA wave named-but-skipped; it does NOT re-mint the seam.
**Agents**: 2 — `.1` threads the axis onto Toast + Button (the SFC adoptions + the api publication of the new variant); `.2` extends `proof:surface-axis` W3 to the completed enrollment + makes the doc honest (CLAUDE.md + MIGRATION row). `.2` reads the W3 enrollment list `.1`'s edits must satisfy, so they sequence within the wave.
**Hard gate**: `proof:surface-axis` (extend-in-place — the W3 `ENROLLED` roster grows by Toast + Button, and a NEW W7 witness asserts the doc claim is HONEST: CLAUDE.md's `<Toast surface=…>` example must reference a prop that EXISTS) + the binding π (Toast/Button paint translucent-where-glass, solid-where-opaque, frosted-where-veil over a busy backdrop, BOTH modes) + the `proof:ba-gestalt` glass-feedback verdict (the band already covers `/feedback/toast` + `/display/buttons` — the roster row holds).
**Status**: SPEC

## Goal criterion

The R8-12 census is FINISHED. The user's verbatim mandate — "ALL of our components should be glassy by default and be consistent in their variants. Audit for all instances... across ALL components, **buttons**, dropdowns, popovers, **toasts**, etc... They should have **glass, veil, etc variants**" (`USER-AUDIT-2026-06-11-R8.md:24`) — named buttons and toasts by name. BA.W-SURFACE-AXIS enrolled NINE surfaces (Card/GlassPanel/Dialog/Sheet/Drawer/Popover/Command/ExpandableContainer/Skeleton) and CLOSED, but **Toast and Button — both named verbatim — never gained the `surface` axis**, and CLAUDE.md went on to DOCUMENT a `<Toast surface="veil">` usage that does not compile (the doc lie). At close: Toast and Button each expose the SAME `surface="glass" | "veil" | "opaque"` prop threaded through the ONE `_shared/useSurfaceAxis.surfaceClass` resolver (NO second axis fork), `proof:surface-axis`'s W3 roster grows to ELEVEN surfaces, the doc claim is true (the example references the now-real prop), and a fresh whole-page gestalt read of the glass-feedback band confirms the toast/button surfaces read as ONE coherent material grammar.

## §0 — RE-GROUND (mandatory step-0; re-grep every cite at HEAD before any edit)

This wave starts from the BA close's OWN admission — R8-12 is recorded PARTIAL (`FINAL.md:83` routes it to the census family; `prompts-recap-1.md:72` flags "R8-12 BINDING census... is the open gap... PARTIAL") — not a blind re-diagnose (BA invariant 3 — re-opened ≠ rebuilt-blind). The seam is LANDED and GREEN; the miss is the two un-enrolled surfaces + the doc lie. Before touching a byte the impl agent re-greps each anchor below at HEAD and confirms the state holds; if a sibling Batch-2 edit has moved a line or W-DEAD-SWEEP has touched a token, the agent records the drift in PROGRESS and re-locates — it does NOT re-invent the census.

The ONE root cause (confirmed at HEAD this authoring): **the shared seam exists and is correct, but its ENROLLMENT roster stopped at nine, and the canon doc was written AHEAD of the enrollment.** `proof-surface-axis.mjs:283-293` lists exactly nine `ENROLLED` surfaces — Toast and Button are absent. `Toast.vue:21-30` declares only `variant?: ToastVariant`, never a `surface` prop, yet `CLAUDE.md:395` reads "`<Sheet surface="opaque">` / `<Popover surface="veil">` / `<Toast surface="veil">` all mean the SAME thing" — a documented prop that does not exist on the component (a doc lie, the P-5 doc-drift class the BB tranche is named to kill). Button (`button/index.ts:28-101`) has a button-LOCAL CVA `variant` axis whose `glass`/`glass-wash`/`solid` members are a DIFFERENT concept from the shared `{glass·veil·opaque}` surface decoration — it owns the maximal-glass DEFAULT (`variant="default"` paints `glass-wash btn-glass`, AX.W54) but cannot express "give me a veil button" the way the shared axis would.

RE-GROUND command set (run all; confirm each mechanism):

```
# the gate's enrollment roster — Toast + Button absent at HEAD
sed -n '283,322p' scripts/proof-surface-axis.mjs            # ENROLLED = nine surfaces; W3 thread-the-axis
node scripts/proof-surface-axis.mjs                         # PASS at HEAD (nine surfaces) — the partial close
# Toast: variant only, NO surface prop
sed -n '10,46p'  src/components/ui/toast/Toast.vue          # interface ToastProps — variant?: ToastVariant, no surface
sed -n '11,16p'  src/components/ui/toast/use-toast.ts       # ToastVariant: default|destructive|success|warning|info
cat src/components/ui/toast/index.ts                        # the barrel — re-exports ToastVariant type
# Button: button-local CVA variant axis (glass/glass-wash/solid) — NOT the shared {glass·veil·opaque} surface axis
sed -n '28,108p' src/components/ui/button/index.ts          # buttonVariants CVA — variant members
sed -n '1,40p'   src/components/ui/button/Button.vue        # the SFC — :data-variant, no :data-surface
# the DOC LIE — CLAUDE.md documents <Toast surface=…> that does not exist
grep -n 'Toast surface\|<Toast surface' CLAUDE.md           # :395 the false example
# the shared seam (LANDED — read, do NOT re-mint)
cat src/components/ui/_shared/useSurfaceAxis.ts             # Surface union + surfaceClass resolver
sed -n '1,40p'   src/styles/glass/surface-axis.css          # the [data-surface] decoration rules
grep -n 'Surface' src/api/index.ts                          # Surface published at :110; ToastVariant at :118
# the gestalt roster row already covers the routes
grep -n 'glass-feedback' docs/tranches/BA/audit/reflect/ba-gestalt-roster.md   # /feedback/toast; /display/buttons
# the glass-cohesion allowlist (Button is on it for STATE-contrast — read, do NOT widen)
sed -n '60,140p' scripts/proof-glass-cohesion.mjs
```

## Defect table (file:line — RE-GREP at HEAD)

| # | finding | file:line | the mechanism |
|---|---|---|---|
| 1 | Toast never gained the `surface` axis (R8-12 named "toasts" verbatim) | `Toast.vue:21-30` (`interface ToastProps` — `variant?: ToastVariant` only, no `surface`); `proof-surface-axis.mjs:283-293` (`ENROLLED` — Toast absent) | the floating-feedback surface rides `glass-floating` + the `feedback-tone` tone arm but has no `{glass·veil·opaque}` decoration axis — `<Toast surface="veil">` is impossible |
| 2 | Button never gained the `surface` axis (R8-12 named "buttons" verbatim) | `button/index.ts:28-101` (the CVA `variant` axis); `Button.vue:30-39` (`:data-variant`, no `:data-surface`); `proof-surface-axis.mjs:283-293` (Button absent) | Button's button-LOCAL `glass`/`glass-wash`/`solid` CVA variants are a DIFFERENT concept; the shared `surface` decoration is unthreaded |
| 3 | **THE DOC LIE** — CLAUDE.md documents a `Toast.surface` prop that does not exist | `CLAUDE.md:395` (`<Toast surface="veil">` ... "all mean the SAME thing") vs `Toast.vue:21` (no `surface` prop) | the canon was written AHEAD of the enrollment; a consumer copying the documented example gets a silently-ignored prop (the P-5 doc-drift class BB kills) |
| 4 | the gate's enrollment is frozen at nine | `proof-surface-axis.mjs:283-293` (`ENROLLED` array, nine entries) | W3 verifies the nine threaded the axis but cannot catch the two named-but-skipped surfaces — the gate green-washed the partial close |

## Scope

The candidate direction is a gestalt completion, not a workaround: the seam is ALREADY the right shape (the `--glass-level` playbook, BA.W-SURFACE-AXIS), so the work is THREADING the existing resolver onto the two remaining surfaces + closing the doc loop + tightening the gate so the partial-close cannot recur. NO second axis (the W1 anti-fork bite is the law); NO new tokens beyond what the shared seam already declares; NO legacy alias.

1. **Thread the axis onto Toast.** Add a `surface?: Surface` prop (default `glass`) to `ToastProps` (`Toast.vue`), imported from `_shared/useSurfaceAxis`. The base plate `glass-floating` is replaced by `surfaceClass(props.surface, "floating")` (the floating-chrome rung — Toast's home register), so `<Toast surface="veil">` strips the rim into a borderless legibility plate and `<Toast surface="opaque">` rides the `--glass-level:0` escape. **The `surface` axis is ORTHOGONAL to, and composes WITH, the W-FEEDBACK-TONE `variant` tone arm** — the tone tint (`feedback-tone` + `feedback-tone-<name>`) rides ON the resolved glass surface exactly as it does today (the tone register mixes the rung token at the element, unchanged); the `surface` prop only chooses the {glass·veil·opaque} DECORATION of that rung. The default `glass` is byte-identical to today's `glass-floating` plate (the resolver emits the bare `glass-floating` for the glass rung — no visual change for the un-set prop). The `Surface` type threads through `Toaster.vue` (the per-toast `v-bind="toast"`) so a consumer can pass `surface` on a queued toast (`use-toast.ts` `Toast` interface gains the optional `surface?: Surface` field, forwarded the same way `variant` is).

2. **Thread the axis onto Button.** Add a `surface?: Surface` prop (default UNSET — Button's existing `variant` axis owns its default register) to `Button.vue`'s `Props`, imported from `_shared/useSurfaceAxis`. When `surface` is set, the resolved `[data-surface]` decoration applies ON TOP of the variant's base glass register (`:data-surface="surface"` binding so the `surface-axis.css` rules reach it — the same attr path Card uses). The intent: `<Button surface="veil">` is a borderless-plate glass button (the legibility register over a busy backdrop), `<Button surface="opaque">` is the solid escape (which the existing `solid` variant ALSO expresses — record the relationship in the canon: `solid` is the variant-axis opaque, `surface="opaque"` is the decoration-axis opaque, both ride `--glass-level:0`; they are NOT duplicated recipes — the shared decoration is the cross-cutting axis the variant cannot reach). Button STAYS on the `proof:glass-cohesion` STATE-contrast allowlist (its active/aria-pressed states want maximal contrast — DO NOT widen the cohesion allowlist); the `surface` axis is additive and default-OFF, so the allowlist relationship is unchanged. The `surface`-resolved class composes through `cn()` alongside `buttonVariants({ variant, size })` (the bind site at `Button.vue:34-37`).

3. **Publish the completed surface to the api discovery layer.** `Surface` is ALREADY published (`api/index.ts:110`); no new type. The Toast surface field and the Button surface prop both consume the SAME published `Surface` union — confirm `verify-export-types` stays green (the api surface gains no new symbol; the existing `Surface` reaches two new consumers). NO new api entry is owed.

4. **Make the doc HONEST + extend the canon (the doc-lie kill).** The CLAUDE.md surface-axis section (`:393-397`) is updated so the enrolled-surface enumeration names Toast AND Button (eleven surfaces, not nine), and the `<Toast surface="veil">` example references a prop that now EXISTS. The canon records (a) that Toast's `surface` axis is orthogonal to its `variant` tone arm (the two compose — surface chooses the {glass·veil·opaque} decoration, variant chooses the tone), and (b) the Button `solid`-variant vs `surface="opaque"` relationship (both ride `--glass-level:0`; the decoration axis is the cross-cutting one, NOT a duplicate). NO new MIGRATION row is strictly owed (the prop is ADDITIVE default-glass/default-unset — no clean break, nothing retired), but the MIGRATION "ADDITIVE" register (`MIGRATION.md:109-113`, the Card-`surface`-gains-`veil` precedent) gains a one-line additive note that Toast/Button join the shared axis at 4.1.0.

5. **Tighten the gate so the partial-close cannot recur (`proof:surface-axis` extend-in-place — NO new gate).** The W3 `ENROLLED` roster (`proof-surface-axis.mjs:283-293`) grows by two entries (Toast → `toast`, Button → `button`), each asserted to thread the axis (a `surfaceClass(` call OR a `data-surface` binding in the SFC). A NEW **W7 witness — the doc claim is HONEST**: the gate reads CLAUDE.md and asserts that every `<Toast surface=…>`/`<Button surface=…>` example in the doc references a prop that the corresponding SFC actually DECLARES (a `surface` prop in `Toast.vue`/`Button.vue`) — a documented prop with no backing declaration REDS the witness. This is the structural anti-doc-lie bite: a future doc claim ahead of the source fails the gate. The roster count fact (`facts.w3` gains the eleven-surface enumeration) is the anti-evasion floor — a re-freeze at nine (dropping Toast/Button to dodge the work) reds W3.

## Triumvirate Dispatch

- **The seam's shape blocks the Button thread** (the EXECUTION-DAG §5 second-axis prohibition). If Button's existing CVA `variant` axis cannot carry the `[data-surface]` decoration cleanly — e.g. a variant's `bg-primary` solid fill clobbers the `[data-surface="veil"]` decoration at the cascade — that is a SCOPE-REVEAL, not a license to fork a second axis: research the cascade interaction (the `@layer components` vs unlayered-utility precedence, the AZ.W-DOCK-RAIL class), plan-augment the resolver or the `surface-axis.css` specificity, redress. The seam stays ONE; a second {glass·veil·opaque} dialect is forbidden by construction (W1).
- **The tone-vs-surface composition fights** — if threading `surface` onto Toast breaks the W-FEEDBACK-TONE tinted-glass register (the tone tint no longer reads ON the resolved surface, e.g. `surface="opaque"` zeroes the tint axis and the destructive tone vanishes), that is a register-design seam owed back to the feedback-tone arm, NOT a token-α loop here: triumvirate to locate the interaction (the expected resolution: a toned toast with `surface="opaque"` is a SOLID tinted plate — the tone rides the opaque `--card` rung — which is a defensible register; record the verdict, do not loop on the tint %).
- **Hard-gate failure not local-edit-recoverable** — if the π readback shows Toast's or Button's `veil`/`glass` rung still paints opaque over the busy backdrop AFTER the thread (the material does not transmit), that is a register-design miss owed to W-DARK-MATERIAL's transmissive arm (frozen for this batch), not a value loop here; triumvirate to locate the seam.
- **Diagnostic loop halt** — if a surface still does not paint the resolved `[data-surface]` decoration after the thread and three iterations have not isolated which cascade layer wins, halt and triumvirate (the cascade-win is the suspect, exactly as on the rail indicator).

## File Bounds

| File | Access |
|---|---|
| `src/components/ui/toast/Toast.vue` | modify (add `surface?: Surface` prop → `surfaceClass(surface, "floating")` base; compose WITH the tone arm) |
| `src/components/ui/toast/use-toast.ts` | modify (the `Toast` queued-item interface gains optional `surface?: Surface`, forwarded like `variant`) |
| `src/components/ui/toast/Toaster.vue` | read-IF (the `v-bind="toast"` already forwards an optional field; confirm the `surface` rides through — edit only if the spread does not reach it) |
| `src/components/ui/button/Button.vue` | modify (add `surface?: Surface` prop → `:data-surface` binding + the resolved decoration class through `cn()`) |
| `src/components/ui/button/index.ts` | read-IF (the CVA `variant` axis is UNCHANGED; touch only if the `surface` prop type must co-export — it imports `Surface` from `_shared`, no new export owed) |
| `scripts/proof-surface-axis.mjs` | modify (grow the W3 `ENROLLED` roster by Toast + Button; add the W7 doc-honesty witness) |
| `CLAUDE.md` | modify (the enrolled-surface enumeration → eleven; the `<Toast surface=…>` example now references a real prop; the tone-vs-surface + `solid`-vs-`opaque` canon notes) |
| `MIGRATION.md` | modify (one-line additive note: Toast/Button join the shared axis at 4.1.0 — additive, no clean break) |
| `docs/tranches/BB/audit/visual/W-SURFACE-AXIS-COMPLETE-DELTA.md` | create (the π readback per rung for Toast + Button, both modes, over the busy backdrop) |
| `docs/tranches/BB/PROGRESS.md` | modify (the discharge row) |

Do NOT touch:

- **`src/components/ui/_shared/useSurfaceAxis.ts` · `src/styles/glass/surface-axis.css`** — the shared seam is LANDED and FROZEN (BA.W-SURFACE-AXIS, 4.0.0). This wave THREADS the existing resolver onto two new surfaces; it never re-mints the seam, adds a fourth rung, or edits a decoration rule. A change here is the W1 anti-fork trigger — triumvirate.
- **`src/styles/feedback-tone.css` · `proof-feedback-tone.mjs`** — **W-FEEDBACK-TONE (BA, landed) owns the tone register.** This wave COMPOSES the `surface` axis WITH the existing tone arm on Toast; it never re-authors the tone tint. The Toast `variant`→tone map is unchanged.
- **`button/index.ts`'s `buttonVariants` CVA `variant` members** — the button-local variant axis (`glass`/`glass-wash`/`solid`/`default`/...) is UNCHANGED. The `surface` prop is the orthogonal cross-cutting decoration; it does NOT add or rename a CVA variant.
- **`scripts/proof-glass-cohesion.mjs`'s `ALLOWLIST`** — Button stays on the STATE-contrast allowlist; the `surface` axis is additive default-OFF, so the cohesion relationship is unchanged. Do NOT widen or narrow the allowlist.
- **The `--glass-level` / `--glass-tint-*` seam + the dark-material token files** — W-DARK-MATERIAL (BA, landed) owns them. The veil/glass rungs READ `--glass-bg-*` + `--glass-tint-*` but never re-declare them.
- **The standing fences** — GL shader internals (aurora.frag/metaball.frag — not named here); ppmycota purple never enters library tokens; the slides `docs/tranches/{M,N}/` docs are foreign (coordination-only).

### Disjointness

Two agent units within the wave, file-bound-disjoint by construction:
- **`.1` (the surface thread)** writes `Toast.vue` + `use-toast.ts` + `Button.vue` (+ `Toaster.vue` only if the spread test fails) + the DELTA doc.
- **`.2` (the gate + doc honesty)** writes `proof-surface-axis.mjs` (the W3 roster grow + the W7 witness) + `CLAUDE.md` + `MIGRATION.md` + the PROGRESS row. `.2` reads the `surface`-prop shape `.1` lands (the W7 witness asserts the doc example matches the real prop) so they SEQUENCE — `.2` after `.1`.

Across Batch 2: W-SCROLL-FADE-RETIRE (the `.scroll-fade-*`/`--mask-fade-width` retire), W-DEAD-SWEEP (the ~32 dead tokens + orphan gate scripts), W-DOCK-RAIL-SEAT-FINAL (the dock-rail seat) — all component-family-disjoint from Toast/Button/the surface-axis gate. The ONE coordination seam: W-DEAD-SWEEP retires the 24 registered-but-unmanifested gates + dead tokens; it does NOT touch `proof-surface-axis.mjs` or the surface-axis seam (confirmed against its bound). No file written by both.

## Hard Gate

`proof:surface-axis` (extend-in-place — NO new gate file; the W3 roster grows + a W7 witness is added). The existing W1-W6 witnesses STAY GREEN (the seam is unchanged); the new asserts are born-RED at HEAD pre-wave:

1. **W3 — the enrollment is COMPLETE (eleven surfaces).** The `ENROLLED` roster (`proof-surface-axis.mjs`) grows by Toast (`toast`) + Button (`button`), each asserted to thread the axis (`surfaceClass(` call OR `data-surface` binding in the SFC). RED at HEAD: the roster is nine; `Toast.vue`/`Button.vue` carry no `surface` thread. Assert shape: `facts.w3.toast === true` AND `facts.w3.button === true`, AND the roster-count fact reads `11` (the anti-evasion floor — a re-freeze at nine reds the count). Bite: the POSITIVE thread-the-axis assert (not a literal-prop-name check — a renamed/defaulted prop must still resolve the shared decoration), mirroring the existing nine.
2. **W7 — the doc claim is HONEST (the doc-lie kill).** The gate reads CLAUDE.md and asserts every `<Toast surface=…>` / `<Button surface=…>` example references a prop the corresponding SFC actually DECLARES (a `surface` prop present in `Toast.vue` / `Button.vue`). RED at HEAD: `CLAUDE.md:395` documents `<Toast surface="veil">` while `Toast.vue` declares no `surface` prop — the example is a doc lie. Assert shape: `facts.w7.toastDocHonest === true` AND `facts.w7.buttonDocHonest === true` (each: the doc example for the surface exists AND the SFC declares the prop). Bite: a future doc claim AHEAD of the source (an example for a prop a component does not declare) reds — the structural anti-P-5 bite.
3. **The π binding readback** (the cardinal-lesson DELTA, captured own-surface, BOTH modes, with AZ-form freshness headers): a live `:5199` capture of Toast (`/feedback/toast`) and Button (`/display/buttons`) over a busy backdrop with a paired π `getComputedStyle` readback proving (a) `surface="glass"` and `surface="veil"` paint TRANSLUCENT (resolved `background` α < 1 / the backdrop-filter blurs visible content behind); (b) `surface="opaque"` paints SOLID (`--glass-level:0` → `--card` + `blur(0)`); (c) a TONED toast (`variant="destructive"` + `surface="glass"`) reads as colored GLASS — the tone tint composes ON the resolved translucent surface (the W-FEEDBACK-TONE register intact under the new axis). Captured to `docs/tranches/BB/audit/visual/W-SURFACE-AXIS-COMPLETE-DELTA.md` with before/after frames, BOTH modes, the surface-hash freshness header (the W-GESTALT-GATE2-hardened form).
4. **The `proof:ba-gestalt` glass-feedback verdict** (BA inv-4 — the P-1 close-class fix). Per-mechanism W3/W7 greens do NOT close this visual wave. The glass-feedback roster row (`ba-gestalt-roster.md:63`) already covers `/feedback/toast` + `/display/buttons` — it is captured WHOLE-PAGE, BOTH modes, over the real backdrop, and judged as a gestalt ("does the band read as ONE coherent surface grammar — do Toast and Button now speak the same {glass·veil·opaque} material as the other nine?"). The verdict is recorded with the capture; a FAIL deploys the research→wave-spec→redress triumvirate (W-REFLECT3, Batch 7). A source-green/visually-broken gap (the exact AZ/BA-partial failure class) does NOT close.

W3 + W7 are the device-free CI half (`proof:surface-axis`); the π readback + the gestalt verdict are the binding visual truth. All must hold for a clean close.

## Format And Lint Cadence

`npm run typecheck` (vue-tsc) after the `surface`-prop thread on Toast/Button + the `use-toast.ts` interface field (the `Surface` union must thread cleanly through the toast queue + the button props); `npm run build` to confirm the `/styles` bundle + the per-subpath chunks emit unchanged (no CSS edit, but the SFC class strings change); `node scripts/proof-surface-axis.mjs` (PASS at HEAD with nine surfaces — record the BORN-RED of the NEW W3-toast/W3-button/W7 asserts by running the modified gate against the pre-thread tree, then GREEN at close at eleven); `npm run verify-export-types` (confirm the api `Surface` reaches the two new consumers, no new symbol owed); `npm run proof:gate-script-parity` after the gate edit (the registry must stay sound — the gate is extend-in-place, no new row); `git diff --check` before close.

## Verification Artefacts

- `docs/tranches/BB/audit/visual/W-SURFACE-AXIS-COMPLETE-DELTA.md` — before/after frames for Toast + Button per rung (glass/veil/opaque over the busy backdrop) + the toned-toast-over-glass frame + the paired π readback (resolved `background` α per rung, both modes), the AZ-form freshness headers.
- The `proof:surface-axis` JSON artefact (the born-RED log of the NEW W3-toast/W3-button/W7 asserts against the pre-thread tree + the GREEN-at-close eleven-surface log).
- The `gate-script-parity` output post-edit (extend-in-place, no new gate row).
- `npm run verify-export-types` output (the api `Surface` surface unchanged; two new internal consumers).
- The `proof:ba-gestalt` glass-feedback-band capture + recorded verdict (the W-REFLECT3 binding evidence; the roster row is unchanged — Toast/Button are already in its routes).

## Commit Plan

- thread commit (`.1`): `feat(surfaces): thread the shared {glass·veil·opaque} surface axis onto Toast + Button (BB.W-SURFACE-AXIS-COMPLETE)` — body names the Toast surface-prop composing WITH the feedback-tone arm + the Button `:data-surface` decoration + the use-toast queue field; the R8-12 "buttons + toasts" verbatim close.
- gate/doc commit (`.2`): `test(surfaces): proof:surface-axis W3 roster → eleven + the W7 doc-honesty witness; make the CLAUDE.md Toast.surface doc honest (BB.W-SURFACE-AXIS-COMPLETE)` — body cites the doc-lie at `CLAUDE.md:395` + the W7 anti-P-5 bite + the additive MIGRATION note.
- doc/status commit: the DELTA + the BB PROGRESS row + the gestalt verdict record.

## Dependencies

- **Depends on**: Batch 0 (W-CI-GREEN green master CI + W-CLOSE-BATTERY — the trustworthy gate floor every later wave inherits). Structurally it depends on BA.W-SURFACE-AXIS (the shared seam — LANDED in 4.0.0); it reads `_shared/useSurfaceAxis.ts` + `surface-axis.css` but never edits them. It depends on W-DARK-MATERIAL (BA, landed) for the transmissive register the veil/glass rungs read.
- **Blocks**: nothing hard. It PAYS DOWN the R8-12 partial the BA close left open — finishing the named-but-skipped enrollment so the W-REFLECT3 close (Batch 7) does not inherit a partial census. The hardened `proof:ba-gestalt` (W-GESTALT-GATE2, Batch 1) judges the glass-feedback band including the now-enrolled Toast/Button — this wave's visual close re-validates at W-REFLECT3 under the hardened gate.

## Archaeology

Prior attempt: BA.W-SURFACE-AXIS enrolled nine surfaces and CLOSED `complete`, but R8-12 named "buttons... toasts" verbatim and the wave left both unthreaded — the partial-close the audit lane caught (`prompts-recap-1.md:72` "R8-12 BINDING census... PARTIAL"; `FINAL.md:83`). The doc was written ahead of the enrollment, minting the `CLAUDE.md:395` doc lie. The new guardrail: this wave's W3 roster-count fact (eleven, not nine) + the W7 doc-honesty witness make the partial-close STRUCTURALLY impossible — a re-freeze at nine reds W3, and a documented prop with no backing declaration reds W7. The BA failure class (a gate green-washing the named-but-skipped surfaces + a canon written ahead of the source) cannot recur.

## Named successors

None foreseen — the enrollment is a complete discharge (Toast + Button were the only two surfaces R8-12 named verbatim that BA skipped). The ONE conditional: if the Button thread hits the Triumvirate Dispatch second-axis trigger (a CVA-variant fill clobbers the `[data-surface]` decoration that no specificity fix resolves without forking), the recorded outcome is a NAMED scope-reveal back to the seam's specificity (a one-line `surface-axis.css` `@layer` adjustment authored as a triumvirate plan-augment, NOT a Button-local fork) — which would make the wave close `complete_with_misses` with a named BB-close re-evaluation, NOT a silent fork. The recommendation and the expected outcome is the full eleven-surface enrollment with the doc honest.

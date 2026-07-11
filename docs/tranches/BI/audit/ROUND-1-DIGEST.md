# ROUND-1 AUDIT DIGEST (machine-extracted from wf_85ba3cb7-5a8)

## gate-soundness

**Verdict:** The gate corpus is unusually rigorous: of 15+ sampled gates, the load-bearing ones (ba-gestalt, disposition-live, ship-attestation, no-dual-path, glass-cohesion, focal-complete) carry real predicates + hermetic self-test bites and CAN fail. I confirmed the gestalt-roster oracle genuinely hash-checks fresh captures (surfaceScopedHash + G7 auto-revoke fires — all 10 surfaces read `freshness:stale`, NOT a stale-PNG existence proxy) and is correctly born-RED (exit 1, 10/10 FAIL) with an 18-bite load-bearing self-test. The dominant WEAKNESS is not vacuous gates but a two-tier paint-verification split whose lower tier is unenforced at the cut: the 147-spec binding-π suite runs via a `--run pi` runner-mode that is NOT a gate tag, so `--run full` never spawns it, and visual-runner's W4 ("did the paint actually run green") is deliberately born-RED with its DELTA absent — so the 5.0.0 cut has NO machine artifact proving the per-mechanism painted truth passes; enforcement rests on ba-gestalt's 10-surface roster alone. warm-identity, labeled "the PRIMARY paint gate," passes GREEN while its own output reports 6/6 ground captures NOT warm and 0/11 rows converged, because its teeth only fire on a fabricated PASS (disclosed, load-bearing at the flip, but the label overstates). Two smaller soundness gaps: no-masking-fallback Arm E accepts any non-empty `owedBy` string with no wave-spec resolution (unlike disposition-live's waveSpecExists), letting `--specular-angle` ship "owed" to WS8.4 which has no spec on disk; and Arm B enforces the universal no-masking edict only over 5 hand-enumerated channels. A stale manifest note on ba-gestalt claims "release-only, NOT ci" while the code tags it `ci` and ci.yml runs it — so CI is perpetually RED on the tranche branch, contradicting the note's own rationale. None of these is a green-over-broken lie that lets a wrong cut fire — the born-RED ba-gestalt + ship-attestation correctly block the tag — but the painted-truth enforcement is narrower than the docs claim.

### GATE-1 [P1] (deferred-paint-unenforced)
The 147-spec binding-π suite (the 'BINDING painted truth' for dock-animation/glass-cohesion/eyeglass-tabs/etc.) runs in neither CI nor the `--run full` release battery, and its green-witness (visual-runner W4) is born-RED with the DELTA absent — so the 5.0.0 cut has no machine proof the per-mechanism paint passes.
- evidence: `grep -c '"pi"' scripts/gates.manifest.mjs` = 0 (pi is a runner-mode, not a tag; gatesFor('full') at scripts/gates.mjs:33-42 filters by local/ci/release only, never spawns runPi). scripts/proof-visual-runner.mjs:250-272 sets w4BornRed and explicitly does NOT push it to `violations` ('which would ci-fail the gate'); `ls docs/tranches/BB/audit/visual/W-VISUAL-RUNNER-DELTA.md` = ABSENT, so w4_localGreenRecorded=false. `ls tests-visual/*.spec.ts | grep -v /_ | wc -l` = 147. proof:visual-runner exits 0 (enrollment sound) but proves only ENROLLMENT, never a pixel.
- disposition: build W-PI-IN-CLOSE — make `--run pi` GREEN (or the W4 verdict-ledger DELTA) a release-tagged blocker in the close ceremony, so the binding-π suite is machine-enforced at the cut rather than a manual `npm run gates:pi`.

### GATE-5 [P2] (green-over-broken-disclosed)
proof:warm-identity — labeled 'the PRIMARY paint gate in the --run full release union' — passes GREEN while its own facts report the paint is broken (6/6 ground captures not-warm, 0/11 cross-page rows converged), because its anti-evasion teeth only fire on a fabricated PASS row and there are currently zero PASS rows.
- evidence: `node scripts/proof-warm-identity.mjs; echo $?` = 0 while its stdout reads '4.2.0 ground evidence: 6/6 4.2.0 Metal-ground captures read NOT warm' and 'cross-page baseline: 0/11 cross-page rows CONVERGED (born-RED)'. The operative baseline is a REPORTED born-RED (manifest note: 'Device-free GREEN on-edit ... the operative all-warm is a REPORTED born-RED baseline'). The actual paint blocker is ba-gestalt (exit 1), not this gate.
- disposition: fold W-PAINT-GATE-LABEL — relabel warm-identity as the anti-evasion/composited-hue gate (not the 'PRIMARY paint gate'); the binding paint blocker is proof:ba-gestalt. No code change needed if the label is corrected.

### GATE-2 [P2] (tag-audit-note-drift)
proof:ba-gestalt's manifest note asserts 'release-only, NOT ci, so it gates ... without breaking per-push CI mid-tranche' but the code tags it ['local','ci','release'] and ci.yml runs it born-RED — so CI is perpetually RED on tranche/BG, directly contradicting the note's stated rationale and defeating per-push regression signal.
- evidence: scripts/gates.manifest.mjs:1757 `tags: ["local", "ci", "release"]`; :1758 note contains verbatim 'release-only, NOT ci' (grep confirmed). .github/workflows/ci.yml:492-493 runs `npm run proof:ba-gestalt`. `node scripts/proof-ba-gestalt.mjs >/dev/null; echo $?` = 1 (10/10 FAIL). BG intentionally made it ci-blocking (header: 'ci-blocking gestalt close oracle'), so the note text is stale BA-era drift.
- disposition: fold W-GESTALT-CI-TAG-RECONCILE — strike the false 'release-only, NOT ci' clause from the note (BG made it ci-blocking on purpose), or move it off `ci` to restore usable per-push CI. Either way the note must stop lying about the gate's own tagging.

### GATE-3 [P2] (vacuous-owner-gate)
proof:no-masking-fallback Arm E passes any 'owed' masking/ladder site on a non-empty `owedBy` STRING with no verification the named wave exists — unlike disposition-live's waveSpecExists check — so 2 sites ship into 5.0.0 still un-excised, including one owed to a wave with no spec on disk.
- evidence: scripts/proof-no-masking-fallback.mjs:224-229 (writer-owed/escalated rows: `const ok = hasOwner` — only checks owedBy is a non-empty string). scripts/no-masking-manifest.mjs:116-123 `--specular-angle` owedBy 'WS8.4 W-GLASS-SOTA-LADDER'; `grep -rn specular-angle src/` finds only a `--neck-specular-angle` writer (the real property has none), and no WS8.4 wave spec exists (`find docs/tranches -iname '*SOTA-LADDER*'` = empty). The escalated dark-arm row (:208-224) carries no `file`/`absent`, so Arm E never disk-checks it; `grep -c light-dark src/styles/tokens/dark-arm.css` = 16 (uncollapsed). Wave …[trunc]
- disposition: build W-MASKING-OWNER-RESOLVE — add a phantom-owner check to Arm E (owedBy must resolve to a real docs/tranches/<L>/waves/<id>.md, mirroring proof-disposition-live.mjs:202-211 waveSpecExists), and land WS8.4/F2.2 or convert those rows to `collapsed` before the cut.

### GATE-4 [P3] (hand-listed-roster)
proof:no-masking-fallback Arm B enforces the universal user edict ('no fallback that hides a dead primary') only over 5 hand-enumerated channels — a new masking `var(--x, plausible-state)` on any un-listed state channel is invisible to the gate, so the 'machine-locked floor' is a manifest-scoped subset.
- evidence: scripts/proof-no-masking-fallback.mjs:126-147 (Arm B loops only `BARE_VAR_CHANNELS`, calling countMaskingVarReads per listed name). scripts/no-masking-manifest.mjs:22-60 lists exactly 5 channels. The B6 self-test bite (:280-288) documents the survivors are 'kept safe by the MANIFEST SCOPING — never scanned' — the same scoping means an un-enumerated masking site is never scanned.
- disposition: build W-MASKING-BROAD-SWEEP — add a triage arm flagging any `var(--<state-ish>, <non-identity>)` outside the manifest for adjudication, so a new masking site surfaces rather than silently escaping; or accept the manifest-scope limit explicitly (fold into GATE-3).


## plan-vs-landed diff (BG tranche, HEAD dfaa2510)

**Verdict:** The BG paint/build machinery is largely real: dual-engine captures are non-blank (EYEGLASS-TABS full routes 1440×1200/2880×1800, SIRI/CHASSIS/PRESET-RIBBON 2–2.8MB PNGs), 17.6 W-PAGE-COMPONENT-AUDIT is a legitimate fail→fix→repass (the suppressesShellField hero-gating landed in demo/chassis/hero/focal.ts + 44 rejudge PNGs + focal-complete C4 GREEN), and the BH axis-grammar (Size/Motion/Orientation in axes.ts) and DOTFLOW rebuild (flow-field.wgsl/glsl + sampleStreamField) landed as specced. The dominant defect is NOT fabricated captures — it is stale-gate-green-at-HEAD: three ci-tagged close-battery gates are RED right now (proof:encapsulation, proof:demo, proof:no-god-module), each regressed by a LATER BG wave after an earlier wave stamped that gate DONE-green, because each wave only re-ran its OWN family gate, never the full battery. So the "CUT-READY tree" framing is false: `--run full` would RED and BG.W-CUT cannot honestly fire until three redrains land. Nothing has shipped wrong (the cut is correctly still PAINT-PENDING, human-gated), so these are pre-cut owed fixes, not shipped defects. Secondary: F1's declared family gate proof:route was never minted (8/9 family gates exist), and proof:warm-identity passes structurally while measuring 0/11 cross-page warm convergence (paint truth lives only in hand-written DELTAs). The non-DONE inventory is honest: BH.B4f PENDING (absolute-last claude-delete), BG.W-CUT PAINT-PENDING, row 2.7 DEFERRED, 6 KEEP-BOOKED.

### GATE-1 [P1] (ratchet-regrowth)
proof:encapsulation (ci) is RED at HEAD: useGlassBackdropLuminance.ts is 554 lines (>500) with no ratchet row — a regression by W-GLASS-SIGNAL-TRUTH after W-COLOCATE (DONE, 'proof:encapsulation GREEN') genuinely carved it down.
- evidence: `npm run proof:encapsulation` exit=1; violation: 'x C1 [useGlassBackdropLuminance] host is 554 lines (≤500 required) AND its ratchet row must be drained (rowPresent=false)'. wc -l src/composables/glass/useGlassBackdropLuminance.ts = 554. Timeline: `git show 6f6aecfd:...useGlassBackdropLuminance.ts | wc -l` = 438 (right after W-COLOCATE carve), `git show 9db65db7:...` = 554 (W-GLASS-SIGNAL-TRUTH regrowth, +116). EXECUTION-PROGRESS.md:402 W-COLOCATE row DONE claims 'useGlassBackdropLuminance 534→438 {ambientHueHistogram}; the 4 ratchet rows drained'. EXECUTION-PROGRESS.md:400 (GOO-BARBELL) MIS-d …[trunc]
- disposition: build BG.W-ENCAP-REDRAIN — carve the SIGNAL-TRUTH observer/ambient logic out of useGlassBackdropLuminance.ts back under 500 (or add a drained ratchet row), re-green proof:encapsulation BEFORE the cut; correct the GOO-BARBELL misattribution in the cursor.

### GATE-2 [P1] (demo-collision)
proof:demo (ci) is RED at HEAD: E1 demo-earns-page collision — display/card and containers/card-pressable both consume @mkbabb/glass-ui/card, which is not a DECLARED_FAMILY_SUBPATH; introduced by BG.W-ANIMATION-CONGRUENCE and unacknowledged anywhere.
- evidence: `npm run proof:demo` exit=1; 'x E1 — demo-earns-page ... undeclared collisions: ["@mkbabb/glass-ui/card ← display/card, containers/card-pressable"]'. demo/stories/manifest.ts:298 maps `"containers/card-pressable": "@mkbabb/glass-ui/card"`; the route was added by commit 5fbb8a3b (BG.W-ANIMATION-CONGRUENCE, gated only on proof:motion-one-clock — proof:demo never re-run). DECLARED_FAMILY_SUBPATHS (manifest.ts:465) contains only dock + motion-core, not card. grep of docs/tranches/BG/ for the collision returns nothing (unacknowledged). Multiple demo rows (BG.W-DEMO-DUP-MERGE, the BH.B3 δ rows) are  …[trunc]
- disposition: build BG.W-DEMO-CARD-DECLARE — either add card to DECLARED_FAMILY_SUBPATHS (if the pair is an intentional family) or fold card-pressable under display/card; re-green proof:demo BEFORE the cut.

### GATE-3 [P1] (ratchet-regrowth)
proof:no-god-module (ci) is RED at HEAD: surfaces.css (508) and dark-arm.css (507) both exceed the 500-line bound with no ratchet rows — grown by BG's own glass/dark waves, violating the CLAUDE.md canon RATCHET_BASELINES == {} that BG.W-CUT itself lists as a cut precondition.
- evidence: `npm run proof:no-god-module` exit=1; '✗ src/styles/glass/surfaces.css is 508 lines (>500)  ✗ src/styles/tokens/dark-arm.css is 507 lines (>500)'. wc -l = 508/507. `git log -4` on each: surfaces.css last grown by 20b09bc7 (W-BACKDROP-BLUR-ENGAGE)/d437cf52 (W-GLASS-BASIS-CONSOLIDATE)/4e60a6c7 (W-GLASS-REGISTER-UNIFY); dark-arm.css by 112c3e08/3ea6b051 (W-DARK-READABILITY-REPAIR)/0078e508 (W-DESHADCN). EXECUTION-PROGRESS.md:469 BG.W-CUT precond names 'RATCHET_BASELINES == {} (the VISIBLE drain chain)'.
- disposition: build BG.W-STYLE-REDRAIN — carve surfaces.css and dark-arm.css back ≤500 (byte-isomorphic split per the W-CARVE discipline); re-green proof:no-god-module BEFORE the cut.

### GATE-4 [P2] (cut-not-ready)
The tree is NOT `--run full`-clean at HEAD — three ci gates RED — so the 'CUT-READY' framing is false; BG.W-CUT (correctly still PAINT-PENDING) cannot honestly fire until GATE-1/2/3 are drained, and proof:gate-manifest-sound's PROOF-ALL-RUNS clause fails as a cascade.
- evidence: proof:encapsulation, proof:demo, proof:no-god-module all tags:['local','ci'] (scripts/gates.manifest.mjs), all exit=1. proof:close-battery-parity GREEN asserts release.sh/release.yml run the deduped `--run full` union (= local∪ci∪release), so all three RED gates are in the cut battery. `npm run proof:gate-manifest-sound` exit=1: '3 PROOF-ALL-RUNS ✗ (did not complete)'. BG.W-CUT is PAINT-PENDING (EXECUTION-PROGRESS.md:469), so no false tag was fired.
- disposition: fold into the cut precondition — GATE-1/2/3 redrains are hard blockers on the 5.0.0 tag; the cut checklist must run `npm run proof:full` at HEAD and observe GREEN, not per-wave family-gate greens.

### GATE-5 [P3] (absent-family-gate)
F1's declared family gate `proof:route` was never minted: §0 and the DONE row 12.5 (GATE-FIELD-AURORA) name `proof:route` as F1's close gate, but no such script/package entry exists — only proof:route-{confounder,single-root,enter-visible}. The '9 family gates' claim is 8/9.
- evidence: grep -c '"proof:route"' package.json = 0; ls scripts/proof-route.mjs = No such file. The other 8 family gates all resolve (proof:glass/dock/paper/motion/encapsulation/demo/viz + F8's build/meta/warm-identity). EXECUTION-PROGRESS.md:354 row 12.5 gate arm = '`proof:route` · the value.js pin + `field-aurora-aa`'; ls scripts/proof-field-aurora-aa.mjs also absent. F1 is not ungated (route-enter-visible etc. exist), but the named close gate is not runnable.
- disposition: fold BG.W-F1-GATE-RECONCILE — either mint proof:route as the F1 aggregator or correct §0 + row 12.5 to name the real F1 gates (route-single-root/route-confounder/route-enter-visible + the field-aurora-aa clause's host).

### GATE-6 [P3] (vacuous-paint-instrument)
proof:warm-identity (F8's 'composited-WHOLE paint close' gate) exits PASS while reporting 0/11 cross-page rows CONVERGED and 0/0 operative composites warm — it can only fail on structural sabotage, never on paint content; the operative warm verdict lives solely in hand-written DELTAs a future regression won't re-check.
- evidence: `npm run proof:warm-identity` exit=0 (status: PASS) with body: 'operative baseline: 0/0 readable composites warm — born-RED', 'cross-page baseline: 0/11 cross-page rows CONVERGED — born-RED', and the only concrete numbers are '4.2.0 ground evidence: 6/6 ... read NOT warm'. The 11/11 convergence that closes 17.6 lives in docs/tranches/BG/audit/visual/BG.W-PAGE-COMPONENT-AUDIT-DELTA.md (§NON-AUTHORING RE-JUDGE), not in the gate; the gate explicitly does not edit the roster ('its born-RED rows are the device-free instrument's'). This is the declared ba-gestalt paint-deferred pattern, so arguably  …[trunc]
- disposition: fold/note — acceptable-by-design but record the machine-PASS-vs-paint-truth divergence; a reader running proof:warm-identity and seeing PASS over-trusts the composited-whole warm claim that only the DELTA carries.


## user-findings root-cause mapping (docs/tranches/BI/audit/USER-FINDINGS-2026-07-11.md)

**Verdict:** I mapped every diagnosable DEFECT/REFINE/PRUNE row in the 2026-07-11 registry to responsible code (file:line) with source traces plus live probes on the running :5200 demo (Chromium/Metal). Two of the most severe are close-class defects hiding behind green gates: UF-H2 (the flagship "liquid tab" drag is DEAD — confirmed live: the indicator paints a false grab affordance but the pointerdown listener never attaches because useDragMorph.reattach() runs once in setup before the element mounts and nothing re-runs it), and UF-A7 (metal rims use border-image, the EXACT corner-squaring anti-pattern CLAUDE.md documents BorderProgress avoiding). Several user "does nothing / awful" reports are real: UF-J2 grain switch is a dead ref, UF-J5 Escape only closes the first-registered of 4 containers (single-winner dispatch), UF-G7/G9 drawer writes --stage-t on documentElement every frame driving per-frame nested oklab color-mix + live backdrop-filter re-blur, UF-E7 fourier-field measured ~39fps from TWO simultaneous WebGPU canvases. The dock-clip family (UF-C6/C7) is the third-tranche re-opening: contain:paint on .glass-dock clips the hover plate and the BA safe-inset "fix" is itself the sizing hack the user rejected. UF-C5 dock morph is FUNCTIONAL on Chromium (I drove it: 91×806↔640×91), so its "does not work at all" is Safari-specific (per UF-C3) or the slow bouncy settle — needs the user's engine. The dominant mechanism family is missing idiomatic grammar (concentric radius, one drag re-attach, one glass taxonomy) papered over by per-mechanism greens.

### UF-H2 [P1] (drag-reattach)
The tabs :draggable 'liquid tab' is dead: useDragMorph never attaches its pointerdown listener because reattach() runs once in setup (indicator ref still null) and no watch(el)/onMounted ever re-runs it; the consumer refresh watch is non-immediate with stable deps.
- evidence: src/composables/motion/useDragMorph.ts:311 reattach() early-returns `if(!node)return` at setup line 375 when params.el.value is null; no onMounted/watch(params.el) exists (grep: only reattach() at 375 + refresh()). Consumer src/components/custom/tabs/composables/useTabDragMorph.ts:146 watch is NOT immediate; deps [stripOptions.length,isVertical,dragEnabled] are stable at mount (motionAxis.armed=full default → dragEnabled true from first computed, never changes) → refresh() never fires. SegmentedTabs.vue has no onMounted refresh. LIVE (chrome-devtools :5200 /navigation/tabs): indicator has clas …[trunc]
- disposition: build BI.W-DRAG-REATTACH — add watch(params.el,{immediate:true}) (or onMounted) inside useDragMorph so the Draggable binds when the element mounts; delete the fragile consumer-refresh dependency-toggle path.

### UF-A7 [P1] (border-image-square)
Metal-rim cards (gold/silver/bronze) square their corners on rounded cards because .metal-*-border paints via border-image, the exact anti-pattern CLAUDE.md says BorderProgress's masked-conic was built to avoid.
- evidence: src/styles/utilities/metal.css:115-143 `.metal-gold-border,.metal-silver-border,.metal-bronze-border { border: var(--metal-border-width,2px) solid transparent; border-image: linear-gradient(90deg,...) 1; }` — border-image does not honor border-radius (per CSS spec), squaring corners. CLAUDE.md BorderProgress note: 'a border-image SQUARES the corners (measured inferior, FORBIDDEN)'. ss-07 shows square rims on rounded metal cards.
- disposition: build BI.W-METAL-RIM-CONIC — re-express the swept metal rim as the masked-conic (mask-composite:exclude) border BorderProgress already ships, retiring the border-image slice (clean break).

### UF-A8 [P1] (cartoon-cast)
The bottom-left 'shadow slab' artifact on hero CTAs is the .cartoon-cast child's hard blur-0 triple-offset ink stamp, visible AT REST (not only on press) on primary-audacious/gold-audacious buttons.
- evidence: Button.vue:252 renders `<span v-if='punchActive' class='cartoon-cast'>` for LOUD_VARIANTS (primary-audacious/gold-audacious). cards.css:381-388 .cartoon-cast carries `box-shadow: var(--shadow-cartoon-md)`; at rest --cartoon-press-t:0 so translate=0 but the token's own offsets project: shadow.css:135 `--shadow-cartoon-md: -3px 3px 0 ..., -5px 5px 0 ..., -7px 7px 0 ...` (down-LEFT, blur 0). compositions/chassis.vue:74 + gate-pattern.vue:100,155 mount variant='primary-audacious' over colored backdrops (ss-08). The hard-edged dark offset stamp reads as a corner artifact over blue.
- disposition: refine BI.W-CARTOON-CAST-CALM — gate the cartoon cast to the press window only (or drop it on glass CTAs over live backdrops); the resting hard offset stamp is the defect.

### UF-J2 [P1] (dead-demo-control)
The grain Switch (and grain slider) in the settings config demo do nothing: the refs are declared and bound to controls but never consumed anywhere in the template — no :style/:class/CSS-var write.
- evidence: demo/stories/compositions/settings.vue:31 `const grain=ref(3.5)` (slider L176), :37 `const paperGrain=ref(true)` (LabeledSwitch L189-193 @update:checked writes it back). grep for grain/paperGrain in the file shows ZERO downstream consumer (no :style, no --glass-grain-opacity/--paper-grain write). Flipping the switch mutates a ref nothing reads → ss-11 'this seems to do nothing'.
- disposition: build BI.W-DEMO-CONTROL-WIRE — bind grain/paperGrain to the real --glass-grain-opacity / .paper-grain-overlay on the demo surface; audit all story controls for dead refs.

### UF-J5 [P1] (shortcut-single-winner)
Escape closes only the first-registered ExpandableContainer: dispatchShortcut fires the first matching handler then returns, and all 4 demo containers register an unconditional Escape on mount, so expanding container #2-4 and pressing Escape hits #1's (closed) no-op handler and stops.
- evidence: src/composables/keyboard/useKeyboardShortcuts.ts:209 `shortcut.handler(e); return;` — first combo match wins, iteration stops. ExpandableContainer.vue:187 registerShortcut('Escape',()=>{ if(open.value) open.value=false }) on mount for EVERY instance. demo/stories/containers/expandable-container.vue mounts 4 `<ExpandableContainer>` (grep -c = 4). Expand #2 → Escape → #1's handler runs (open=false, no-op) → return → #2 stays open ('esc doesn't globally work').
- disposition: build BI.W-ESC-STACK — make the Escape handler stack-aware (top-open-overlay wins) or have ExpandableContainer register Escape only while open; the single-winner return needs an open-guard fan-through.

### UF-C6 [P1] (dock-paint-clip)
Dock end/edge control hover plates clip flat because .glass-dock carries contain: layout style paint (the paint clip box) plus the scroll-port overflow; the BA --dock-control-safe-inset 10% mitigation is the sizing hack the user rejected and still fails for end controls.
- evidence: src/styles/dock/shell.css:151 `contain: layout style paint` on .glass-dock — the paint axis clips any child painting past the border-box (a 1.1× hover plate on the inline-end control exceeds the dock inline edge → flattened). shell.css:119-149 comments concede paint is the 'NON-proximate second clip box' and rely on --dock-control-safe-inset (10% inset). ss-17 (end tab clipped flat) + ss-21 (top+bottom flattened). Third consecutive tranche re-opening dock clip (registry family C). User: 'No workarounds or sizing hacks.'
- disposition: build BI.W-DOCK-HOVER-ESCAPE (part of UF-C1 greenfield) — render hover plates outside the clip via the existing .glass-dock-frame non-clipping escape (the DockStack rail precedent), not by shrinking the plate inside contain:paint.

### UF-G7 [P1] (drawer-per-frame)
Drawer is laggy because useDrawerSnap writes --stage-t on document.documentElement every frame, and .glass-drawer recomputes a chain of nested color-mix(in oklab) plus a live per-frame backdrop-filter blur re-sample off that scalar.
- evidence: src/components/ui/drawer/composables/useDrawerSnap.ts:107 `document.documentElement.style.setProperty('--stage-t',t)` every frame (invalidates whole-tree inherited-custom-prop propagation). drawer.css:200-236 .glass-drawer reads --stage-t into --sheet-descent/--sheet-freeze then background: color-mix(in oklab, color-mix(in oklab,...), ...) (2-level nested oklab) AND (L237+) 'the sheet's own backdrop blur ENGAGES off the LIVE gesture scalar ... tracks the finger 1:1 during the drag (the scalar is written per-frame)' — per-frame backdrop re-sample. UF-G9 (live-behind) compounds it with a live pa …[trunc]
- disposition: build BI.W-DRAWER-CHEAP-DRAG — drive the drag translate compositor-only, quantize/knee the backdrop-filter engage instead of per-frame re-blur, and scope --stage-t to the sheet element not documentElement.

### UF-E7 [P1] (viz-gpu-budget)
fourier-field runs at ~39fps because two simultaneous WebGPU FourierField canvases paint at once (the page background substrate + the story demo), violating the one-GPU-context-per-route budget.
- evidence: LIVE (:5200 /substrates/fourier-field): evaluate_script found canvasCount:2 both ctx:webgpu (2268×1209 background + 1334×1043 story). rAF cadence probe over 115 frames: meanMs 25.38, medianMs 22.4, p95 32.1, maxMs 32.6, approxFps 39.4 (below the 16.7ms/60fps budget). CPU perf trace shows no long main-thread tasks (CLS 0.00) → GPU-bound by the two concurrent compute+render passes.
- disposition: retire/rework BI.W-FOURIER-REBUILD — per UF-E6/E7 rework from first principles; at minimum enforce a single GPU context per route (one fourier canvas, not two).

### UF-A2 [P1] (radius-grammar)
The vertical SegmentedTabs track balloons into a capsule because .segmented-tabs applies border-radius: --bouncy-track-radius (= --radius-pill 9999px) uniformly; on a tall vertical track 9999px clamps to half-width producing full semicircle end-caps unrelated to the stacked content.
- evidence: src/styles/segmented-tabs.css:56 `border-radius: var(--bouncy-track-radius)` where L40 documents --radius-tab = --radius-pill = 9999px; the .segmented-tabs--vertical block (L66-75) does NOT override the radius, so the tall column inherits the stadium clamp → ss-19 'the vertical track's capsule wrap balloons around the stack; radius unrelated to content'. No concentric-radius (inner = outer − inset) grammar exists.
- disposition: build BI.W-RADIUS-GRAMMAR — a card-radius on vertical tracks + a concentric-radius rule; closes UF-A1/A2 (capsule-vs-card decision).

### UF-A3 [P1] (radius-grammar)
The gear Configurator 'drawer' (a right-side Sheet) is square-cornered because sheetVariants.side.right declares no border-radius, so the panel meets the viewport edge with no rounded inner corners.
- evidence: src/components/ui/sheet/index.ts:41 side.right = 'border-l data-[state=...]:slide-*' with NO rounded-* class (grep for rounded/radius in sheet index/css = none). PresetEditor.vue:160 SheetContent side='right'. ss-23 'square-cornered panel at screen edge'.
- disposition: build BI.W-SHEET-ROUND — round the inner (viewport-facing) corners of edge sheets; folds into the radius-grammar wave.

### UF-A4 [P1] (radius-grammar)
Configurator 'Appearance' section renders as a square hairline block because section rounding is owned only by the Configurator root's rounded-panel+overflow-hidden clip, which PresetEditor bypasses by using a bare `<div class='configurator glass-floating'>` instead of the `<Configurator>` chassis.
- evidence: ConfiguratorLayer.vue:92 comment 'No per-section radius: rounding is owned at the container root clip (Configurator.vue rounded-panel + overflow-hidden)'. PresetEditor.vue:200 wraps ConfiguratorLayers in `<div class='configurator glass-floating flex-1 overflow-y-auto'>` — NOT the `<Configurator>` component, so no rounded-panel clip → square hairline sections (ss-24). UF-A5 'why indented' (ss-25): ConfiguratorLayer body/header px-3 (L118,179) vs SheetHeader px-6 (PresetEditor.vue:165) mismatch.
- disposition: build BI.W-CONFIG-IN-SHEET — either compose the real `<Configurator>` rounded chassis inside the Sheet or give ConfiguratorLayer a self-rounding mode; align section inset to the sheet content inset (fixes A4+A5).

### UF-D1 [P2] (scroll-ring-config)
The dock scroll progressbar reads as a chunky flat gray band (not rainbow, not thin) because the demo passes a 2-stop --foreground ramp as the spectrum and an 11px width, and the vertical dock uses the inline-end-edge coverage that paints a straight band.
- evidence: demo/shell/SidebarDock.vue:168 SCROLL_RING_STOPS = ['color-mix(in srgb,var(--foreground) 45%,transparent)','var(--foreground)'] (monochrome warm-ink, not brand rainbow). demo/shell/dock-nav.css:204 --border-progress-width:11px (chunky). SidebarDock.vue:175 ringCoverage → 'inline-end-edge' for the vertical dock (flat band). ss-02 'chunky flat gray band on the vertical dock rim'.
- disposition: refine BI.W-SCROLL-RING — feed the brand --section-color/--viz rainbow stops (BorderProgress already walks OKLCH shorter-hue), drop width to ~4-6px, confirm the edge coverage rounds.

### UF-C5 [P2] (dock-morph)
Dock morph MECHANISM is functional on Chromium (I drove it), so the user's 'does not work at all' is engine-specific (Safari, per UF-C3) or the slow ~2-3s bouncy settle reading as broken — not a wiring break.
- evidence: LIVE (:5200): window.__shellDockMorph.toggle() reshapes `<aside>` 91×806 → 640×91 and back via the real 'glass-ui-demo:toggle-dock-morph' window event; --dock-morph-t advances 0→0.11→0.74→1.07(overshoot)→~1.0; data-dock-morphing clears by ~3s; both 40×40 morph buttons found visible with correct aria-label. Screenshot at pinned t=0.5 shows a clean horizontal top bar (no broken blink). So the button→event→driver→box-reshape path all work on Chromium. UF-C3 explicitly reports the dock band 'broken in safari'; the built demo the user audited may be Safari.
- disposition: build BI.W-DOCK-MORPH-SAFARI (part of UF-C1 greenfield) — reproduce on Safari/WebKit; if Chromium-only, the settle (~2-3s bouncy) also needs tightening per UF-C4.

### UF-E8 [P2] (viz-prune)
dot-flow-field, concentric, and dot-matrix (components + stories + gates) are all present and condemned by the user after 30+ attempts — clean prune candidates.
- evidence: Present on disk: src/components/custom/{dot-flow-field,concentric,dot-matrix}, demo/stories/substrates/{dot-flow-field,concentric,dot-matrix}.vue, scripts/proof-{viz-dotflow,flow-field}.mjs. Registry UF-E8 'all to be deleted.'
- disposition: retire BI.W-VIZ-PRUNE — delete the three viz components + stories + their gates + subpaths + manifest rows (no legacy alias); record the retire rationale in the disposition register.

### UF-B2 [P2] (glass-taxonomy)
GlassPanel duplicates the Card glass-tier system (same tier: SurfaceTier wash/quiet/resting/floating/overlay + surface axis) with no unique capability and only demo consumers — the supersession the user flags.
- evidence: GlassPanel.vue:11-25 uses `tier: SurfaceTier` mapping to glass-wash/quiet/... exactly like Card; grep for GlassPanel consumers (excluding its own dir) returns only demo (glass-panel.vue story, vizPreviewStill, manifest) + barrel/subpath/api exports — no ≥2 binary src consumers. CLAUDE.md claims 'restored at AZ.W-PRUNE2 — live keyframes.js consumer' but the census shows demo-only.
- disposition: retire/fold BI.W-GLASSPANEL-FOLD — fold GlassPanel onto `<Card tier>` (or retire); part of the UF-B1/B5/B6 glass-taxonomy consolidation.

### UF-B1 [P2] (glass-taxonomy)
The glass surface layer sprawls across ~19 CSS files and ~12+ overlapping glass-* surface families (capsule/chip/atom/material/panel/lens/opaque/veil/deep + the 5-rung ladder + card tiers), the multi-name duplication disease the user calls out.
- evidence: src/styles/glass/ = 19 files (a11y-fallback, accent-tone, control-surfaces, deep, defined, glass-atom, glass-capsule, glass-chip, grain-overlay, ladder, liquid-enter, liquid-fill, material, progress-rail, reveal, rim, squircle, surface-axis, surfaces). Overlapping surface classes: glass-{wash,quiet,resting,floating,overlay,card,pill,panel,deep,capsule,material,lens,opaque,chip,atom} + veil. UF-B1/B5/B6 demand a grand DRY simplification.
- disposition: build BI.W-GLASS-CENSUS — a multi-dimensional glass-surface census (which are load-bearing vs duplicative vs unused) → consolidation plan; DESIGN-loop row per UF-P3.

### UF-F1 [P2] (static-preview)
Landing category tiles render static pre-rasterized viz stills (or a lone icon fallback for non-viz categories), not live curated components — the 'empty brown tile with a lone compass icon' the user rejects.
- evidence: demo/chassis/landing/vizPreviewStill.ts:376 render(spec) returns a 2D-canvas raster string (a 'still'); vizPreviewStill(route) L392 returns null for non-viz routes → SectionLanding falls back to an icon (Foundations → compass, ss-01). UF-E9 'preview images stunningly low quality' matches the low-res 2D-canvas raster vs a real WebGPU/component render.
- disposition: build BI.W-LANDING-LIVE — replace stills with live, curated mini-component previews (respecting the one-GL-per-route budget).

### UF-F2 [P2] (meta-chassis)
Title-shrink-on-scroll is asked as a 'standard facility' — the library DOES ship the extant ScrollCard/ScrollCardHeader shrink engine, but the demo StoryHeader/StoryPage chassis never composes it, so titles only fade, never shrink.
- evidence: grep for ScrollCard/card-scroll/scroll-shrink in demo StoryHeader.vue/StoryPage.vue/StoryHero.vue = no matches; the shrink facility (BB.W-SCROLL-CARD `<ScrollCard>`) exists in src but is unwired to story titles. User: 'is this not extant?' — it is, just not used.
- disposition: build BI.W-STORY-CHASSIS — a codified StoryPage meta-component composing the extant ScrollCard shrink for the title (UF-F2/F4/F6 story-chassis consolidation).

### UF-F3 [P2] (meta-chassis)
Story code blocks are unhighlighted, unsized raw mono because there is no syntax-highlighting dependency and no standardized CodeBlock component in the demo.
- evidence: package.json has no highlight.js/hljs/shiki/prism dep (grep = none). No CodeBlock/hljs component in demo (grep). ss-10 'unhighlighted mono block, full-width, cramped'. value.js/keyframes.js (the user's cited references) use highlight.js.
- disposition: build BI.W-CODEBLOCK — a standardized, sized, highlight.js-themed CodeBlock used on every story (part of the story-chassis wave).

### UF-G5 [P2] (accordion-press)
The accordion trigger 'indents on click' because it carries .tap-squish (active:scale-(--scale-press-btn)), so the whole header row scales down on press, reading as an inward indent.
- evidence: src/components/ui/accordion/AccordionTrigger.vue:27 class includes 'tap-squish ... active:scale-(--scale-press-btn) ... hover:underline'; the active scale-down on a full-width row reads as an indent. Registry UF-G5 'I don't like how these indent on click.' (Live confirmation of the exact visual would pin whether it's the scale or the hover:underline.)
- disposition: refine BI.W-ACCORDION-PRESS — drop tap-squish on the full-width disclosure header (a header row is not a button-press surface).

### UF-A6 [P2] (badge-baseline)
Badge glyph baseline sits low (optical centering off) — most likely a leading/py mismatch in the badge size rungs where line-height exceeds the glyph cap height under items-center.
- evidence: src/components/ui/badge/index.ts size rungs: sm leading-4 py-0.5, md leading-5 py-1, lg leading-6 py-1.5 with base 'inline-flex items-center'; a leading larger than the cap height plus asymmetric py can drop the optical baseline. ss-12 'glyph baseline sits low in the pill'. PROBE NEEDED: getComputedStyle baseline/line-box measure on the specific rose badge to confirm the exact rung.
- disposition: refine BI.W-BADGE-OPTICAL — measure and re-center the badge leading/py per rung; live baseline probe to pinpoint.

### UF-G8 [P3] (command-jitter)
Command palette 'jitters back and forth' — the menu-row hover-lift is compositor-safe (not the cause); the likely mechanism is the CommandList scroll-into-view on arrow-nav interacting with a scrollbar appearing/disappearing (no scrollbar-gutter reserve) causing horizontal reflow. Needs live repro.
- evidence: menu.css:71 translate:0 var(--menu-row-lift) (-1px on highlight) is compositor-only → not layout jitter. CommandList.vue:7 max-h-[300px] overflow-auto (a scrollable port); cmdk scroll-into-view on arrow-nav + a scrollbar toggling width with no scrollbar-gutter:stable would produce horizontal 'back and forth'. PROBE NEEDED: open /containers/command, type + arrow-navigate, watch for horizontal reflow / scrollbar toggle.
- disposition: build BI.W-COMMAND-STABLE — apply scrollbar-gutter:stable to the CommandList and audit the scroll-into-view; confirm with a live jitter capture first.


## dead-code + dual-path + duplicate-system census

**Verdict:** The library's surface/plate layering is largely SOUND, not the duplicate-system disease it superficially resembles: the chip triplication (glass-atom/glass-capsule/glass-chip) is a shared BODY + two CONSUME-ONLY role decorations each with ≥2 consumers; reveal/liquid-enter/liquid-fill are three concerns (overlay-open transition, universal mount keyframe, meter fill) on one documented grammar, each really wired; the specular family is single-sourced through one createSpecularWriter core with three wrappers. The real defects are DEAD SUBSTRATE left behind after consumers were retired or never built. The strongest is the surface=\"clear\" variant (BE.W-CLEAR-VARIANT): a full mechanism — the \"clear\" member of SURFACES/Surface/surfaceClass, .glass-clear in material.css, and --glass-bg-clear/--glass-opacity-clear/--glass-clear-scrim-* tokens — whose sole declared consumer (BE.W-DOCK-NOWPLAYING-PILL) was RETIRED \"never built, no library consumer,\" yet the mechanism shipped and slipped past proof:surface-axis, which never asserts an axis member is consumed (vacuous-green; veil=3, opaque=4, clear=0). Two more fully-dead systems ride the shipped bundle: floating-panel.css (whole 49-line file + its keyframe + theme literal + squircle coupling, zero consumers) and .glass-hero (squircle.css, for a \"page-redesign W60\" that never consumed it). The dominant mechanism is substrate-without-consumer surviving because the retirement was recorded for the CONSUMER but not the MECHANISM, and the guarding gate proves threadability not load-bearingness. Demo-side surface chassis (ShowcaseFrame et al.) mildly re-express Card but are demo-private and sanctioned. None of these ship WRONG paint; they ship dead bytes and inflate the public axis surface, precisely the census's target for a 5.0.0 restructure cut.

### CENSUS-1 [P1] (vacuous-gate)
The entire surface="clear" variant (SURFACES/Surface union member + surfaceClass branch + .glass-clear CSS + --glass-bg-clear/--glass-opacity-clear/--glass-clear-scrim-* tokens) is dead substrate: its sole declared consumer was retired, and proof:surface-axis never checks that an axis member is consumed, so it greens vacuously.
- evidence: Zero consumers: grep -rn 'surface="clear"' src demo --include=*.vue -> 0 (veil=3, opaque=4, clear=0). Mechanism present: src/components/ui/_shared/axes.ts:40 SURFACES=[...,"clear"]; useSurfaceAxis.ts:42 Surface union + :88 if(surface==="clear") return `${base} glass-clear`; src/styles/glass/material.css:459-490 (.glass-clear + 10 scrim lines); src/styles/tokens/glass.css:225 --glass-opacity-clear:0.58 + :306 --glass-bg-clear. Sole consumer retired: docs/tranches/BG/BE-BF-LEDGER.md:169 'BE.W-DOCK-NOWPLAYING-PILL | RETIRE | ... never built; ... no library consumer'; wave spec docs/tranches/BE/wa …[trunc]
- disposition: retire -- W-FOLD-CLEAR-VARIANT: delete the clear member from SURFACES/Surface/surfaceClass, the .glass-clear rule in material.css, and the --glass-bg-clear/--glass-opacity-clear/--glass-clear-scrim-* tokens; add a proof:surface-axis clause asserting every axis member has >=1 consumer (kills the vacuous-green).

### CENSUS-2 [P2] (dead-code)
floating-panel.css is a fully dead 49-line file -- .floating-panel/.floating-panel-item have zero consumers anywhere -- yet it is @import-ed into the shipped /styles bundle, along with its dead keyframe, theme literal, and squircle corner-shape coupling; a 'panel' naming fork the live .configurator/.glass-floating panels superseded.
- evidence: grep -rn floating-panel src demo --include=*.vue --include=*.ts -> 0 references (only the def + squircle comment). Def: src/styles/floating-panel.css (49 lines, @import-ed at src/styles/index.css:178). Dead riders: src/styles/animations.css:4 @keyframes floating-panel-in; src/styles/theme/literals.css:16 --animate-floating-panel-in; src/styles/glass/squircle.css:49 .floating-panel{corner-shape} (dead-by-extension). CLAUDE.md still lists floating-panel.css + .floating-panel-item as if live.
- disposition: retire -- W-RETIRE-FLOATING-PANEL: delete floating-panel.css + its index.css @import + the floating-panel-in keyframe + the theme literal + the squircle .floating-panel selector (clean break, no alias).

### CENSUS-3 [P2] (dead-substrate)
The .glass-hero surface (border-radius + @supports corner-shape blocks in squircle.css) has zero consumers anywhere in src/demo/tests -- minted 'the surface the page-redesign hero (W60) reads', but W60 never landed a consumer; a 'hero' surface naming fork left orphaned.
- evidence: grep -rn glass-hero src demo tests tests-visual -> only src/styles/glass/squircle.css:28 (comment), :52 (corner-shape), :65 (border-radius); no template/class consumer. squircle.css:60-63 self-documents it as 'the surface the page-redesign hero (W60) reads' -- W60 absent from HEAD.
- disposition: retire -- W-RETIRE-GLASS-HERO-ORPHAN: delete both .glass-hero blocks + the --corner-shape-hero token; re-mint with its consumer if a hero-overlay surface is ever built (visual-load-bearing / J-inv-10).

### CENSUS-4 [P3] (dead-export)
The .glass-defined public opt-in decoration class has zero literal consumers; the DEFINED-glass mechanism only ever engages through the cohort selectors (.btn-glass/.input-pill/.control-surface), so the standalone class is a documented-but-unused public opt-in (dead as API, though the shared rule is live).
- evidence: grep -rn 'class="[^"]*glass-defined' src demo --include=*.vue -> 0. The live rule is the shared selector list src/styles/glass/defined.css:42-46 '.glass-defined, .btn-glass, .input-pill, .control-surface { --glass-definition:1 ... }' -- only the three cohort members are ever applied. defined.css header advertises it as a host-dialable opt-in ('a host dials definition on any ancestor').
- disposition: fold -- W-FOLD-GLASS-DEFINED-STANDALONE: either drop the standalone .glass-defined selector head (keep the cohort) or add a demo consumer to make the opt-in load-bearing; do not leave a public class nothing opts into.

### CENSUS-5 [P3] (duplicate-system)
Demo-side bounded-surface chassis proliferation: ShowcaseFrame (self-described 'morally <Card tier=...>') plus DemoStage/DemoSpecimen/DemoComposition/DemoMatrix/DemoInteraction re-express the Card/Stage surface rather than composing library Card -- a mild demo-side echo of panes-vs-cards, but demo-private and sanctioned.
- evidence: demo/chassis/showcase/ShowcaseFrame.vue:32-33 comment 'every showcase frame is morally <Card tier=resting>'; its tierClass (:86-96) hand-rolls 'bg-card border-border' instead of composing <Card>. Sibling demo chassis: find demo/chassis -name '*.vue' -> DemoComposition/DemoInteraction/DemoMatrix/DemoSpecimen/DemoStage + ShowcaseFrame + TokenLadder, several expressing a bounded plate. All demo-private (not exported).
- disposition: fold -- W-DEMO-CHASSIS-AUDIT (optional, demo-only): converge ShowcaseFrame opaque tiers onto <Card tier> composition where caption/field-tier needs allow; no library-surface change, low priority for the 5.0.0 cut.


## prompt-recap completeness (BG/BH era)

**Verdict:** The BG DIRECTIVE-LEDGER's 94-directive recap is genuinely thorough and most recorded directives are dispositioned on disk: built + gate-green (de-shadcn via proof:no-shadcn-default, the no-masking-fallback edict via proof:no-masking-fallback PASS, eyeglass-tabs with a real 144-frame driven-gesture π + proof:eyeglass-tabs, siri-island, dock-decompose), or an explicit recorded DEFER/RETIRE (blurred-image-bg = consumer-asset DEFER-with-trigger, metallic-aurora = BD.W-AUR-METAL-FINISH, dock-drag DEFERRED). The dominant defect mechanism is a single RULED cross-repo ask carried as landed-but-empty: goo-blob→blob is marked DONE in the cursor, its status text claims the "FULL rename" executed, and MIGRATION.md §262 documents it as a clean-break — yet the swap-note admits it was "NOT done here" and disk still has goo-blob everywhere, so any consumer (incl. value.js, whose 5.0.0 walk re-points to /blob) that follows the migration guide breaks at the cut, and no gate catches the drift because the export regen is disk-following. Two close-gate items are also not honestly green at the CUT-READY tree: profile:budget FAILS (goo-blob 129% of gzip ceiling, +725% drift, plus unbaselined liquid-grid/axes chunks) and the 3-axis Fable/aristotelian gestalt-acceptance ledger is entirely PENDING (zero filed verdicts; proof:meta greens only on token-presence). One directive is silently narrowed (Siri waveform → demo-private vs the "glass-ui primitive" ask, with recorded rationale). No fully-silent-dropped directive was found; the accountability spine holds except for the goo-blob rename gap.

### RECAP-1 [P1] (green-over-broken)
The RULED goo-blob→blob rename is marked DONE in the cursor and documented as a landed clean-break in MIGRATION.md, but was never executed on disk — a consumer (incl. value.js) following the 5.0.0 migration guide breaks, and no gate catches the drift.
- evidence: docs/tranches/BG/execution/EXECUTION-PROGRESS.md:462 (BH.B2-export-reshape status='DONE ... goo-blob→blob FULL rename ... the component GooBlob→Blob, the subpath /goo-blob→/blob, the types + CSS seams, NO alias kept') CONTRADICTED BY its own close note docs/tranches/BH/audit/B2-export-reshape-swap-note.md:58 ('goo-blob → blob FULL rename — NOT done here. The subpath /goo-blob STAYS'). MIGRATION.md:262-265 documents it as done ('<GooBlob> renames to <Blob> ... clean break, no alias'). Disk unchanged: `ls src/components/custom/` -> goo-blob; `grep '"\./blob\|"\./goo-blob"' package.json` -> only  …[trunc]
- disposition: build BG.W-BLOB-RENAME-LAND — execute the dir/component(GooBlob→Blob)/subpath(/goo-blob→/blob)/CSS/types rename + re-run regen-exports --write BEFORE the 5.0.0 tag; OR fold BG.W-BLOB-RENAME-DEFER — revert MIGRATION.md §262 + the BH.B2 cursor 'FULL rename' claim and re-book the rename past 5.0.0 so the migration guide stops lying to consumers

### RECAP-2 [P1] (vacuous-gate)
profile:budget FAILS at the CUT-READY HEAD (goo-blob chunk over its ceiling + large drifts + unbaselined new chunks); it is an --enforce CI gate inside the --run full close set the honest 5.0.0 cut must pass.
- evidence: `npm run profile:budget` -> 'Bundle budget exceeded': [FAIL] dist/goo-blob.js raw 103970/85000 (122.3%) gzip 36084/28000 (128.9%); [FAIL] dist/goo-blob.js gzip 36084 vs baseline 4373 (drift +725.2%); [FAIL] dist/concentric.js +19.6%; [FAIL] dist/completion-seal.js +12.7%; [NEW] dist/liquid-grid.js gzip 10214 + dist/axes.js — no baseline. Registered gate: scripts/gates.manifest.mjs:72 (id 'profile:budget'); CLAUDE.md §Build ('--enforce mode in CI'). Cut runs --run full: EXECUTION-PROGRESS.md:462/19.1 row. Known/attributed but unresolved: docs/tranches/BH/spec-structure/STRUCTURE-SPEC.md:535 ('p …[trunc]
- disposition: build BG.W-BUDGET-REBASELINE — resolve the goo-blob chunk ceiling breach (or lift the ceiling with rationale) + re-baseline concentric/completion-seal/liquid-grid/axes before the tag, so --run full is honestly green rather than shipping over a known-RED release gate

### RECAP-3 [P2] (vacuous-gate)
The PE-GESTALT/GA-9 3-axis Fable acceptance ledger (the close-precondition design-review verdict) has zero filed verdicts — all 30 cells PENDING — and proof:meta·edict-verdict-present greens on token-presence, so the actual PASS oracle the directive requires is unmet at HEAD.
- evidence: docs/tranches/BG/audit/reflect/bg-edict-verdict-ledger.md:42-53 — all 10 enrolled surfaces × {proportion,animation,technicolor} = PENDING (dock/configurators-goo/aurora/glass-feedback/shell/motion-fourier/dark-register/tabs-segmented/page-band/cross-repo). The gate only locks COMPLETENESS (header comment lines 22-23: 'edict-verdict-present locks that COMPLETENESS ... it does NOT judge PASS/FAIL') and PENDING is a token, so it greens vacuously. Directive source DIRECTIVE-LEDGER.md:222-223 (PE-FABLE/PE-GESTALT: 'the DesignSync PASS verdict comes from a FABLE instance ... a CLOSE PRECONDITION').  …[trunc]
- disposition: fold into BG.W-CUT — the 19.1 cut ceremony ('asserts every visual wave's filed Fable PASS') must flip the ledger PENDING→PASS/FAIL via a non-authoring Fable instance at the human-gated cut; OR build BG.W-EDICT-VERDICT-FILE to file the interim Fable verdicts now, so the acceptance oracle is real rather than a PENDING-token completeness green

### RECAP-4 [P3] (scope-narrowing)
WS6-02 asked for the Siri waveform as 'a glass-ui primitive in the warm identity'; it shipped as a demo-private component (SiriWaveform.vue) plus a library seam/slot only — a scope narrowing from primitive to demo-private slot-consumer.
- evidence: src/components/custom/dock/composables/useSiriDock.ts:24-26 ('useSiriDock owns NO WebGL — the waveform is demo-private (the capability ships the seam, not the GL)'); the actual GL waveform lives at demo/stories/dock/SiriWaveform.vue (header: 'DEMO-PRIVATE'), consumed only by demo/stories/dock/siri-island.vue:128-129. Directive DIRECTIVE-LEDGER.md:189 (WS6-02: 'a glass-ui primitive in the warm identity, COMPOSING shipped substrates'). Recorded rationale exists (BG.W-SIRI-DOCK-CAPABILITY-DELTA.md:34-35 'Arm W — the demo-private WebGL2 ... waveform'), consistent with the ≥2-consumer visual-load-b …[trunc]
- disposition: fold BG.W-SIRI-WAVEFORM-DEMO-PRIVATE (recorded) — the demo-private + seam disposition is defensible under the ≥2-consumer invariant; promote to a /siri-waveform primitive only if a second binary consumer lands (a promotion-trigger row, not a silent narrow)


## chronic + disposition ledgers

**Verdict:** The honest deferred census is mostly sound: the machine FOLD-LEDGER.json (135 rows) + AX register (31 rows) both pass their gates, the 7 speculative "wants-it-someday" registers flipped DEFER→RETIRE as the audit prescribed, the founding native-drawer chronic is decided-terminal, the 5-composable DELETE cluster was actually cut, and the two named target chronics (dock-third-press consumer, completion-seal) genuinely LANDED — dock press is wired at DockIconButton.vue:12,135, completion-seal graduated to /completion-seal. The dominant defect mechanism is bookkeeping-drift-behind-the-live-tree: the gates verify STRUCTURE (row present / decided / routed / disposition assigned) but never LIVENESS (has the DEFER trigger fired? is the ratcheted file still over 500?), so re-growth and landed-adopts ride green. The single material defect is the no-god-module ratchet: it is hard-RED at the CUT-READY HEAD with 8 violations + 2 grandfathered, violating 19.1 BG.W-CUT's own stated `RATCHET_BASELINES == {}` precondition — the files were drained at 0.7/F6.5/W-COLOCATE then re-grown past 500 by later glass/dock/eyeglass-tabs waves (the GF5 "ratchet normalizes regrowth" disease the audit named), and no carve wave sits between the 17.1 census (DONE) and the 19.1 tag-fire to re-drain them. proof:close-sweep is FAIL with four born-RED closeDisease members. Two FOLD-LEDGER rows carry landed work as still-DEFER (kf-snap D27; the deep-glass 20px pair that BG.W-DEEP-GLASS-DECIDE terminally retired), and the audit's own §G detector-hardening (forbid bare-word BOOKED, add the .css arm) was prescribed but never applied, so 8 bare-word bookings (incl. the chromatic-aberration rim successor) ride invisible to the no-silent-drop machine. Net: the tree is not cut-ready by its own preconditions, but the gaps are contained, ownerable, and none ship a wrong pixel yet (the cut has not fired).

### GATE-1 [P1] (vacuous-gate)
proof:no-god-module is hard-RED at the CUT-READY HEAD (8 violations + 2 grandfathered), violating 19.1 BG.W-CUT's own stated `RATCHET_BASELINES == {}` cut precondition; the ratchet was drained then re-grew, and no carve wave owns the re-drain.
- evidence: `node scripts/proof-no-god-module.mjs` → status: FAIL, VIOLATIONS: segmented-tabs.css 572, useGlassBackdropLuminance.ts 554, DockLayerGroup.vue 524, dock/shell.css 524, GlassDock.vue 515, glass/ladder.css 510, glass/surfaces.css 508, tokens/dark-arm.css 507; +2 GRANDFATHERED (property-regs.css 563, runtime.ts 502). F6.5 BG.W-GOD-MODULE-STRUCTURAL is DONE `a2532145` claiming GlassDock/ladder/shell <500; `git show a2532145` confirms it was TRUE then (segmented-tabs 445, ladder 473, shell 484, GlassDock 498) — later waves re-grew all four (segmented-tabs last by b4c1998c BG.W-EYEGLASS-TABS 07-10) …[trunc]
- disposition: build — BH.W-RATCHET-REDRAIN: carve the 8 violations to <500 + drain the 2 grandfathered to ∅ BEFORE the cut, and harden the ratchet contract so a growth past 500 in a non-baselined file REDs the growing wave (not a phantom future drain).

### GATE-2 [P2] (phantom-successor)
The 2 grandfathered no-god-module rows name carve-successor BG.W-COHERENCE-CENSUS (=17.1), a wave marked DONE that never carved them — a grandfather pointing at an already-closed drain wave.
- evidence: `node scripts/proof-no-god-module.mjs` → GRANDFATHERED: property-regs.css 563 → carve-successor BG.W-COHERENCE-CENSUS; runtime.ts 502 → carve-successor BG.W-COHERENCE-CENSUS. EXECUTION-PROGRESS.md:455 shows 17.1 BG.W-COHERENCE-CENSUS+GATE 'DONE (this-commit)' (an audit/census wave, no src change). `wc -l` at HEAD: property-regs.css 563, runtime.ts 502 — both still over. The named drain wave closed without draining.
- disposition: fold — into BH.W-RATCHET-REDRAIN: re-point each grandfather's carve-successor to the real drain wave, or discharge by carving; a grandfather whose successor is a DONE wave must RED.

### LEDGER-1 [P2] (stale-ledger)
FOLD-LEDGER.json D27 (kf snap-option) is still DEFER-with-trigger 'native snap republish-gated' while useDragMorph.ts already wires the landed native `snap:` on kf ^5.2.0; the census gate passes vacuously because it never re-checks a DEFER trigger against a landed adopt.
- evidence: FOLD-LEDGER.json D27: disposition 'DEFER-with-trigger', evidence 'the native snap republish-gated. By-name only (foreign-tree)'. But src/composables/motion/useDragMorph.ts:322-324 constructs `new Draggable({ spring, axis, snap: targetsOf().map(t=>t.center) })`; package.json pins `@mkbabb/keyframes.js: ^5.2.0`. proof-bg-deferred-ledger.mjs header itself: 'the useDragMorph.ts CONSUME(kf snap) marker was consumed-and-deleted at BH.B1-W3 — re-pointed onto kf 5.1.0 native DragOptions.snap'. `node scripts/proof-bg-deferred-ledger.mjs` → failures: 0 (it verifies present+decided+charter-matched, never …[trunc]
- disposition: fold — BH.W-LEDGER-DISCHARGE: flip D27 DEFER-with-trigger → MET/RESOLVED (resolvedBy BH.B1-W3), and add a proof:bg-deferred-ledger tooth that REDs a DEFER-with-trigger whose trigger now re-evaluates fired.

### LEDGER-2 [P2] (dual-book)
BE.W-DEEP-CEILING + BF.W-DEEP-GLASS-WIRE remain DEFER-with-trigger '20px budget clears' while BG.W-DEEP-GLASS-DECIDE terminally retired the 20px push ('16px IS the ceiling — IDENTITY, not debt') — the same idea simultaneously retired-terminal and deferred-re-enters.
- evidence: FOLD-LEDGER.json: BE.W-DEEP-CEILING disposition 'DEFER-with-trigger' trigger 'the deep-glass perf budget clears the full Apple blur'; BF.W-DEEP-GLASS-WIRE 'DEFER-with-trigger' trigger 'the deep-glass 20px perf budget clears'. Contradicted by src/styles/tokens/glass-deep.css:4 'DEEP-GLASS-DECIDED: retired-at-16px-cost-0B' and :57-60 '16px IS this substrate's blur ceiling — IDENTITY, not debt. The 20px push is RETIRED'; EXECUTION-PROGRESS.md:372 F2.3 BG.W-DEEP-GLASS-DECIDE DONE `95d47e84` verdict 'retired-at-16px'. The register offers SUPERSEDED (3 rows already use it) — the honest disposition f …[trunc]
- disposition: fold — BH.W-LEDGER-DISCHARGE: flip BE.W-DEEP-CEILING + BF.W-DEEP-GLASS-WIRE DEFER-with-trigger → SUPERSEDED (resolvedBy BG.W-DEEP-GLASS-DECIDE), killing the now-dead 20px re-enter trigger.

### DETECTOR-1 [P2] (detector-blind-spot)
The audit's §G detector-hardening (forbid bare-word BOOKED, add a .css marker arm) was prescribed but never applied; 8 bare-word bookings — including the chromatic-aberration rim successor — ride invisible to the no-silent-drop census machine, so it is not 'complete-by-construction'.
- evidence: proof-bg-deferred-ledger.mjs:141 matches only `/\bBOOKED:\s*(\S+)/` (colon-label) and walkSrc scans only `.ts|.vue` (:121). `grep -rn BOOKED src --include=*.ts --include=*.vue --include=*.css | grep -v 'BOOKED:'` → 8 hits: segmented-tabs.css:494-495 ('BOOKED successors: the T1 cross-engine clone-loupe, the chromatic-aberration RGB-split rim'), Button.vue:97, constellation/constants.ts:114, constellationField.ts:259, DockLayerGroup.vue:360, useDockOrientationMorph.ts:196, useLayerTransition.ts:40. DEFERRAL-LEDGER.md §G names exactly this ('a bare grep finds 8 markers, the detector sees 2', 'dee …[trunc]
- disposition: build — BH.W-CENSUS-DETECTOR-HARDEN: forbid bare-word BOOKED in src (require the BOOKED: label), add the .css marker arm to deriveInSrcMarkers, + a self-test bite; enroll the chromatic-aberration rim successor as an explicit census row.

### DRIFT-1 [P3] (doc-drift)
The F5.1 W-MOTION-SPINE cursor row lists 'useScrollPin ... DEFINITION-ABSENT' but useScrollPin.ts (141L) + useScrollScene.ts (225L) are present and demo-wired; proof:motion's DEAD list correctly excludes them, so the gate is fine but the cursor claim is false.
- evidence: EXECUTION-PROGRESS.md:391 F5.1 gate text: '`useSpringPress`/`useScrollPin`/`useGooMorph` DEFINITION-ABSENT'. But `ls` src/composables/motion/useScrollPin.ts (141L) + useScrollScene.ts (225L) present; demo/stories/motion/ScrollChoreographyBody.vue:18,44 imports+calls useScrollPin (a legitimate private demo helper). scripts/proof-motion.mjs:91-99 DEAD list omits both (correctly). The same row also lists useSpringPress DEFINITION-ABSENT while proof-motion.mjs:342 REQUIRES Button.vue compose useSpringPress — internally contradictory.
- disposition: fold — doc reconcile: strike the false DEFINITION-ABSENT claims for useScrollPin/useSpringPress from the F5.1 row (or relocate useScrollPin/useScrollScene under demo/ since their only consumer is a demo story).

### DRIFT-2 [P3] (stale-comment)
useLiquidPress.ts still calls the dock control 'the booked third' consumer though that booking discharged at F5.2 (DockIconButton wires useLiquidPress with --dock-press-t).
- evidence: src/composables/motion/useLiquidPress.ts:38 'press wrapper Card consumes + the dock control is the booked third'. Landed: src/components/custom/dock/DockIconButton.vue:12 imports useLiquidPress, :135-139 calls it with pressVar '--dock-press-t'; EXECUTION-PROGRESS.md:394 F5.2 BG.W-LIQUID-WEIGHT-DEFAULT DONE 2026-07-05 '(B) dock-hover-press WIRED + MATCHES'. The audit docs (IOS27-MOTION-TRUTH.md:324, PAINT-PASS-LOG.md:1379) that say 'never landed' are pre-fix and acceptably frozen; the src comment is live and stale.
- disposition: fold — strike the 'booked third' clause in useLiquidPress.ts:38 (the ≥2-consumer bar is met: Card + DockIconButton).


## performance

**Verdict:** Every named route is GPU/compositor-bound, not JS-bound (main-thread rAF held ~98fps on all of them while the user reads them as "god awful/miserable/laggy"). The dominant mechanism is over-provisioned GPU fill: (1) the Fourier field is a fullscreen SDF that loops all 384 curve segments + 2×64 chain arms PER PIXEL, unconditionally, at dpr 2 — an O(pixels×segments) architecture wrong for drawing a curve; (2) that same heaviest-in-library shader is mounted as a 4.87-megapixel full-bleed PAGE BACKGROUND on auth-shell (plus a second aurora); (3) DockStage's aurora field is sized to the full ~2365px scroll column, not the viewport, yielding a 9.6-megapixel per-pixel-FBM surface of which ~800px is ever visible; (4) the detented Drawer sheet re-rasterizes its full-viewport backdrop-filter blur EVERY frame because the blur radius is driven off the per-frame --glass-drawer-t scalar (the exact "cardinal sin" the same file warns against for the scrim). Compounding: 2-3 live WebGL contexts per route (the stated one-GL-per-route budget is not held), 10 per-dock getImageData luminance readbacks off a preserveDrawingBuffer aurora on dock/overview, fourier at the max dpr-2 tier, and loop/sample counts pinned at MAX regardless of preset complexity. What is sound: the CPU/JS side is clean (single rAF per substrate via the shared lifecycle leaf, offscreen-park, PRM freeze, compositor-only translate scalars) — the defects are all fill-rate/architecture, fixable at the shader-architecture, canvas-sizing, background-choice, and backdrop-engage layers.

### PERF-1 [P0] (fullscreen-sdf-over-n)
FourierField renders as a fullscreen SDF that loops all 384 curve segments (+2×64 chain + 64 scaffold) PER PIXEL, unconditionally, at dpr 2 — O(pixels×segments), the wrong architecture for drawing a curve.
- evidence: src/components/custom/fourier-field/shaders/fourier-field.render.wgsl.ts:247 (`for i<MAX_CURVE_SAMPLES(384)` main curve, no early break), :195 (cel pass, another 384), :207/:221 (`for k<MAX_PHASORS(64)` chain ×2); GL twin fourierFieldGLSetup.ts:152 `sampleCount=GL_MAX_CURVE_SAMPLES(256)` hardcoded + shader loop fourier-field.glsl.ts:202. Live: fourier studio canvas 1334×1043 (dpr2, 1.39 MP) → ~1.39M×~450-830 segDist ≈ 0.6-1.1B segDist/frame. Main-thread rAF 98fps confirms it is GPU-bound (evaluate_script on /substrates/fourier-field).
- disposition: build W-VIZ-FOURIER-PERF — rasterize the curve as line geometry (instanced quads / triangle-strip, O(segments) fragments) instead of a fullscreen per-pixel SDF; the fullscreen pass keeps only the head halo.

### PERF-2 [P0] (heavy-viz-as-page-bg)
auth-shell mounts the heaviest shader in the library — a full-bleed 4.87-megapixel Fourier SDF — as decorative page background behind an auth form, plus a brand-panel aurora (2-3 live GL contexts).
- evidence: manifest.ts:1277 `s("compositions","auth-shell",…,{ background:{ kind:"fourier" } })`; StoryHero.vue:319-323 mounts `<FourierField>` full-bleed (position:fixed inset:0) for kind==='fourier'; auth-shell.vue:58 adds a second `<Aurora>` in the brand panel. Live on /compositions/auth-shell: canvasCount 3 — fourier-field-canvas 3024×1612 (4.87 MP) + aurora 793×1079 + a stray aurora 2268×1209 (total ~8.5M canvas px across 3 contexts).
- disposition: retire W-FOURIER-PAGE-BG-RETIRE — drop `{kind:"fourier"}` from auth-shell's manifest row (use paper/grid or a single frozen frame); a teaching SDF must never be an ambient page wash. Fold the `fourier` background kind out of StoryHero, or gate it to `freeze`/one-shot only.

### PERF-3 [P0] (oversized-canvas)
DockStage's aurora field backing store is sized to the full ~2365px scroll column (inset:0 over the whole column), producing a 9.6-megapixel per-pixel-FBM surface where only ~800px is ever visible — the /dock/overview 'sluggish' root.
- evidence: DockStage.vue:104-108 `.dock-stage-field{position:absolute;inset:0}` inside the full-column `.dock-stage`; backingSize.ts:54 `sizeBacking` = `getBoundingClientRect × dpr` with NO viewport/max clamp (only a min floor + DPR clamp). Live on /dock/overview: aurora-canvas 2036×4731 = 9,632,316 px (measured via evaluate_script), vs a ~800px-tall visible band.
- disposition: build W-DOCKSTAGE-FIELD-VIEWPORT-CLAMP — make the shared field host viewport-sized (position:fixed/sticky, or a max-block-size clamp) so the backing store never exceeds the viewport; the field only needs to paint what is on screen.

### PERF-4 [P1] (per-frame-backdrop-reblur)
The detented Drawer sheet (full-viewport, height:100%) re-rasterizes its backdrop-filter blur EVERY frame because the blur radius is driven off the per-frame --glass-drawer-t scalar — the 'laggy/awful/weak' drawer root, and the exact cardinal sin the same file warns against for the scrim.
- evidence: drawer.css:249-258 `--glass-blur-engage-t = f(--glass-drawer-t)` then `backdrop-filter: blur(calc(--glass-blur-overlay-radius(13-20px) * --glass-blur-engage-t))`; the scalar is written per-frame by the spring (useDrawerSnap.ts:104-108 writeScalar via spring.play) AND per pointermove (useDrawerSnap.ts:229). Sheet is full-viewport for detents (drawer.css:173-177 height:100%). The same file at :404-406 explicitly calls a per-frame full-viewport re-blur 'the cardinal sin'. /containers/drawer default is detented (drawer.vue:24 snap=0.4).
- disposition: build W-DRAWER-BLUR-DE-ANIMATE — engage the sheet blur ONCE (one-shot on the open flip, or a fixed rest radius); the translate scalar is compositor-only and carries the motion. Do not tie a backdrop-filter radius to a per-frame scalar.

### PERF-5 [P1] (multi-gl-context)
Viz-studio + composition routes run 2-3 live WebGL contexts at once (page-hero field + the route's own viz), violating the stated one-GL-per-route budget; each is an independent rAF + GPU surface competing for fill.
- evidence: Live: /substrates/fourier-field canvasCount 2 (aurora hero 2268×1209 + fourier studio 1334×1043); /compositions/auth-shell canvasCount 3. Mechanism: StoryHero.vue:303-323 always mounts the manifest background field even when the route body hosts its own studio field; dock/overview.vue:626 adds a 2nd aurora beside the DockStage aurora.
- disposition: build W-VIZ-ROUTE-ONE-GL — on a route whose body hosts a live viz studio, StoryHero must render a cheap wash (grid/paper) not a second live field; the studio IS the field.

### PERF-6 [P1] (gpu-readback-stall)
dock/overview runs 10 per-dock useGlassBackdropLuminance observers, each doing drawImage+getImageData off the shared aurora (a GPU→CPU sync readback) on a preserveDrawingBuffer:true field that disables the discard-after-composite fast path.
- evidence: overview.vue binds `:background-canvas="backgroundCanvas"` on 10 GlassDocks (grep -c = 10); useGlassBackdropLuminance.ts:342 `getImageData(0,0,32,32)` per sample (≤4Hz, but ×10 = 10 readbacks/250ms); DockStage.vue:78 `runtime-options:{ preserveDrawingBuffer:true }` on the always-running field. Live: 12 `.glass-dock` on the route over the 9.6MP aurora.
- disposition: build W-DOCK-LUMA-SHARE — sample the shared field ONCE per stage and fan the result to every staged dock, instead of one getImageData per dock; drop preserveDrawingBuffer if the single-sampler no longer needs it.

### PERF-7 [P2] (dpr-over-provision)
FourierField renders at the max dpr-2 budget tier (resolveBudgetDpr) — the highest fill tier applied to the single most expensive shader; aurora's soft wash already sub-caps to 1.5.
- evidence: useFourierField.ts:334 `dprPolicy: resolveBudgetDpr`; budget.ts `resolveBudgetDpr` = min(dpr, AV_DPR_MAX=2), while `resolveAuroraWashDpr` = 1.5 exists for soft washes. A glowing SDF field needs no 2× detail. Live: fourier canvas backing 1334×1043 at dpr2.
- disposition: build (fold into PERF-1) — route fourier through a ≤1.5 DPR cap; quarters fragment fill for no perceptible loss on a soft field.

### PERF-8 [P2] (static-loop-bound-no-lod)
Fourier's per-pixel/compute loop bound is pinned at MAX (256 GL / 384 WGSL) regardless of preset — the 2-harmonic 'flower' preset pays the same 384-segment-per-pixel loop as the 24-harmonic brand mark.
- evidence: fourierFieldGLSetup.ts:152 `const sampleCount = GL_MAX_CURVE_SAMPLES;` (always 256); render loops `for i<384` unconditionally (fourier-field.render.wgsl.ts:247); compute dispatches ceil(MAX_CURVE_SAMPLES/WG) (fourierFieldWGPUSetup.ts:299). Preset 'flower' harmonics:2, trailArc:0.72 (fourier-field.vue:99-108) still pays full loop.
- disposition: build (fold into PERF-1) — size the compute dispatch + render loop bound to ceil(trailArc × needed-resolution) / active-N; low-detail presets should cost proportionally less.

### PERF-9 [P2] (gl-context-leak)
A live aurora WebGL context appears on grid-default routes that declare no live field (/containers/drawer, /compositions/auth-shell carried a stray aurora) — a possible undisposed hero-field context surviving route swaps.
- evidence: Live: /containers/drawer + /compositions/drawer-live-behind each showed 1 live aurora-canvas 2268×1209 (2.74 MP) despite their category default background being 'grid' (manifest.ts:211/217); auth-shell showed a 3rd unexplained aurora. CAVEAT: measured under synthetic history.pushState+popstate navigation, which may not trigger real component teardown — needs confirmation via real link navigation + a canvas census after several hops.
- disposition: P2 verify → build W-VIZ-DISPOSE-ON-ROUTE-LEAVE — confirm with real router navigation; if real, ensure the hero field disposes its GL context on route leave (a running 2.7MP aurora on every grid route is a leak).

### PERF-10 [P2] (layout-read-in-gesture)
useDrawerSnap.onPointerMove calls getBoundingClientRect() on every pointermove (dragSpan), a forced synchronous layout read in the drag hot path.
- evidence: useDrawerSnap.ts:216-224 onPointerMove → :224 `(coord-startCoord)/dragSpan()` → :192-199 dragSpan `contentEl().getBoundingClientRect()`. Fires each move during a drag; the sheet box does not change mid-drag.
- disposition: build (rider on PERF-4) — cache dragSpan() at pointerdown; the sheet's box is fixed for the gesture duration.


## demo storybook census

**Verdict:** The demo storybook is structurally sound where the lens feared most: chassis adoption is strong (128/150 story files compose StoryPage/StorySection/Demo* directly; the 21 without are legitimate sub-components), interactive specimens render at natural width (the buttons/forms/select pages show no oversized full-width specimens — the 25 w-full uses are canvases, skeletons, auth CTAs, comboboxes), the landing bento renders distinct per-story Canvas2D stills (the D6 "11-identical-frozen-aurora" cure works), and no raw config/state debug dumps are rendered. The dominant defect mechanism is META-LANGUAGE LEAK VIA LIBRARY DATA: a grep of demo/stories reads clean of tranche/wave IDs in rendered text, yet the springs page RENDERS "BD.W-ANIM-IOS27-TUNE" verbatim because all six SPRING_PRESETS comment: fields (src/composables/motion/springPresets.ts) carry the wave name + engine jargon and springs.vue:191 binds {{ presetRow.comment }} — and those strings SHIP in the published dist bundle. Beyond that, ~10-15 motion/dock/substrate blurbs are written in engineering voice (keyframes.js internals ElementMorph/springTimingFunction/springLinearStops named, sibling libs named, "PRM" unglossed shorthand) directly against the "no meta on any demo page" mandate. Code blocks are standardized onto ONE CodeBlock primitive but have ZERO syntax highlighting (both sibling repos use highlight.js ^11.11.1 with a house .hljs theme) and CodeBlock is adopted on only 1 page while 2 pages hand-roll raw <pre>. Source-comment meta pollution is pervasive (~179 tranche.W- refs; nearly every demo file carries one) — source-only, but a repo-cleanliness miss for a 5.0.0 "disciplined not dirty" cut. Worst pages: springs, curve-gallery, glass-material, cta-receive, constellation, reveal, card-pressable.

### META-1 [P1] (library-data-render-leak)
The wave name 'BD.W-ANIM-IOS27-TUNE' is rendered verbatim on the public springs demo page (and ships in the published dist bundle) because all six SPRING_PRESETS comment: fields carry it plus engine jargon.
- evidence: src/composables/motion/springPresets.ts:77,83,89,95,101,107 each `comment:` string ends 'BD.W-ANIM-IOS27-TUNE' and names SETTLE/CONTROL/PLAYFUL/GENTLE/DOCK/PRESS 'register', --ease-convergence alias, useSpringPress, 'V↔H + fission', 'VT default'. demo/stories/motion/springs.vue:191 renders `{{ presetRow.comment }}` (presetRow = springPreset(preset.value), springPresets.ts:62). Browser (http://localhost:5200/motion/springs, fullPage screenshot) shows the visible right-column text: 'SETTLE register — the inertial settle ... never a dead stop. BD.W-ANIM-IOS27-TUNE'. `grep -c 'BD.W-ANIM-IOS27-TUNE …[trunc]
- disposition: build — BG.W-SPRING-DEMETA: rewrite the six preset comments as product-voice register descriptions with the wave name + engine internals stripped, OR render a demo-local description map in springs.vue instead of the library `comment` field; extend the same strip to curves.ts:143 note ('...BD.W-CARTOON-PUNCH', ships in dist/motion-curves.js).

### META-2 [P1] (rendered-meta-leak)
~10-15 motion/dock/substrate blurbs and <code> chips are written in engineering voice — naming keyframes.js internals, sibling libraries, and internal composables in user-facing copy against the no-meta mandate.
- evidence: StorySection renders blurb as a visible <p class="text-prose"> (StorySection.vue:7). Rendered offenders: springs.vue:169 (blurb 'single-source SPRING_PRESETS table ... springTimingFunction twin springLinearStops'), springs.vue:236 (same); curve-gallery.vue:84 ('the real CSSCubicBezier twin from value.js'), :209 (blurb '1:1 with the keyframes easing inventory: ... value.js analytic ease* families'); ScrollChoreographyBody.vue:136 (<p> '...the keyframes.js scroll spine writes off the real scroll port'); cta-receive.vue:92,94,148 (<code>useDockCtaReceive</code>, <code>ElementMorph</code> — a keyf …[trunc]
- disposition: build — BG.W-DEMO-COPY-DEMETA: rewrite these blurbs/code-chips in product voice (describe the BEHAVIOUR, not the engine class); keep public token/prop names, drop keyframes.js/value.js internal identifiers and the 'slides aliases' consumer leak.

### META-3 [P2] (rendered-meta-leak)
'PRM' appears as unglossed internal shorthand in rendered blurbs where a reader needs 'reduced motion'.
- evidence: grep '(blurb|description|title)="[^"]*\bPRM\b'' over demo/stories: demo/stories/motion/reveal.vue:83 ('PRM snaps to a fade only'), demo/stories/substrates/glass-material.vue:123 ('PRM-gated'), demo/stories/containers/card-pressable.vue:48 ('Compositor-only + PRM-instant'). All three render via StorySection blurb -> visible <p>.
- disposition: build — fold into BG.W-DEMO-COPY-DEMETA: replace 'PRM' with 'reduced motion' (and 'Compositor-only' with plain phrasing) in rendered copy.

### CODE-1 [P2] (code-block-highlight)
Code blocks are standardized onto ONE CodeBlock primitive but have ZERO syntax highlighting, while both sibling repos ship highlight.js with a house .hljs theme — failing the 'code blocks standardized + syntax highlighted' mandate.
- evidence: demo/chassis/code/CodeBlock.vue renders a plain `<pre ref="preRef" class="story-code-block-pre fira-code">` with `color: var(--foreground)` and no tokenizer; Code.vue is a plain `<code class="fira-code">` chip. No highlight/shiki/prism import anywhere in demo/ (grep). Siblings DO: ~/Programming/keyframes.js/demo/@/components/custom/instrument/keyframes/composables/useHighlightCSS.ts:3 `import hljs from 'highlight.js'` + github-dark/light theme; ~/Programming/value.js/demo/@/components/custom/gradient/GradientVisualizer/GradientCodeEditor.vue:5 `import hljs from 'highlight.js/lib/core'` + house …[trunc]
- disposition: build — BG.W-CODE-SYNTAX-HIGHLIGHT: adopt highlight.js in CodeBlock (register ts/css/bash langs, mirror the sibling house `.hljs` warm-cream token theme, dark via .dark), keep the existing copy affordance + glass-quiet plate.

### CODE-2 [P2] (code-block-adoption)
CodeBlock is adopted on only 1 of 150 story pages while 2 pages hand-roll raw <pre> blocks — inconsistent code-block presentation.
- evidence: `grep -rIl '<CodeBlock' demo/stories` = 1 file (demo/stories/display/card.vue:129). Hand-rolled bypasses: demo/stories/compositions/configurator.vue:318 `<pre v-pre class="fira-code text-sm overflow-x-auto"><code>const cfg = useConfiguratorState...` and demo/stories/feedback/toaster.vue:53 `<pre v-pre class="fira-code text-sm overflow-x-auto"><code>// App.vue`. Three presentation dialects for code (CodeBlock ×1, raw <pre> ×2).
- disposition: build — fold into BG.W-CODE-SYNTAX-HIGHLIGHT: route configurator.vue + toaster.vue code through <CodeBlock lang="ts">; audit whether more pages that show code as prose should adopt it.

### META-4 [P2] (source-comment-meta)
Pervasive tranche/wave comment pollution across the demo source — nearly every story file carries a wave-name attribution — a repo-cleanliness miss for the 5.0.0 'disciplined not dirty' cut (source-only, not rendered).
- evidence: `grep -rInE '(BA|BB|BC|BD|BG|AZ|...)\.W-[A-Z0-9-]+' demo/stories` = 262 hits; 179 are // JS comments, the rest HTML <!-- --> comments (all verified source-only, e.g. split-chars.vue:34, progress.vue:158 are comment-block continuations). Per-family files carrying a meta token: foundations 12/13, forms 12/12, feedback 8/8, motion 14/14, navigation 4/4, containers 14/15, compositions 9/13, dock 15/20, substrates 15/24, data 8/15, display 3/12. Example: forms/*.vue all carry '// BC.W-SUFFUSE-reconcile — the forms band's ONE coherent --section-color-3 teal'.
- disposition: fold — BH.W-DEMO-COMMENT-SCRUB: strip wave-name/tranche attributions and gate/proof references from demo comments, keeping only product-voice design rationale (aligns with BH hard-delete-CLAUDE.md 'disciplined not dirty').

### META-5 [P3] (stale-comment)
vizPreviewStill's comments repeatedly claim 'eleven' cards/stills while there are 10 substrate stories and 10 registry entries — stale off-by-one prose (functionally complete).
- evidence: demo/chassis/landing/vizPreviewStill.ts header comment says 'eleven IDENTICAL stills', 'the 11 substrates viz cards', 'Eleven entries'. Actual: `ls demo/stories/substrates/*.vue` = 11 files but one is VizStudio.vue (chassis, not a story) -> 10 stories; VIZ_PREVIEW_STILLS has 10 entries (`grep -c '"/substrates/' vizPreviewStill.ts` = 10); manifest lists 10 substrate routes. Registry IS complete (10=10); only the 'eleven' prose is wrong.
- disposition: retire — fold into BH.W-DEMO-COMMENT-SCRUB: correct the count in the comment (or delete the narrative comment).

### SIZE-CLEAN [P3] (oversizing-verified-clean)
No oversized full-width specimen defect found — interactive triggers render at natural width; the 25 w-full uses are legitimate (canvases, skeletons, auth CTAs, comboboxes).
- evidence: `grep w-full demo/stories` top files: constellation.vue:9, skeleton.vue:6, blob.vue:4 (all canvas/loader), gate-pattern.vue:3 + auth-shell.vue:2 (full-width auth CTAs — the real usage pattern), combobox.vue:2 (comboboxes are naturally full-width). Browser confirm: http://localhost:5200/display/buttons renders 'Launch sequence'/'Next →'/'glass'/'glass-wash'/'Toggle' all natural-width, no stretched specimen. No Select/Dropdown trigger specimen is w-full stretched.
- disposition: retire — no action; census axis verified clean. (Minor P3 aside: the buttons CTA is staged over a saturated cyan-blue field band that clashes tonally with the warm-cream identity — likely an intentional glass-legibility stress backdrop; confirm intent.)

### CHASSIS-CLEAN [P3] (chassis-adoption-verified-clean)
Chassis adoption is strong — 128/150 story files compose StoryPage/StorySection/Demo* directly; the 21 without are legitimate child sub-components, not hand-rolled pages.
- evidence: `grep -rIl '<StoryPage'` = 128 files. The 21 files with no Story*/Demo* chassis are all sub-components composed into a parent: demo/stories/dock/examples/* (AppleMusic/Spotlight/DynamicIslandCall/TabBar/VolumeHUD — iOS dock capability demos rendered inside a parent) and demo/stories/substrates/aurora/{config,sections}/* + AuroraStage/AuroraConfigDock (configurator sub-panels). None is a top-level route hand-rolling the page chassis.
- disposition: retire — no action; census axis verified clean.

### BENTO-INFO [P3] (landing-bento-verified)
The landing bento preview tiles render distinct per-story Canvas2D raster stills off characteristic generators (the 'all-same-frozen-aurora' cure works); non-viz categories fall back to a component-specimen #preview slot.
- evidence: demo/chassis/landing/SectionPreviewCard.vue is the bento card; demo/chassis/landing/vizPreviewStill.ts defines 10 distinct (pattern,hue,seed) triples -> data: URIs via 10 generators (drawNuclei/drawMetaball/drawGraph/drawEpicycle/drawGlassPlate/drawGlassLadder/drawFlow/drawRings/drawWarpGrid/drawPhyllotaxis), module-memoized, device-free (zero live GL context). Browser confirm: http://localhost:5200/substrates shows the Aurora tile (warm nuclei still) and GooBlob tile (brown metaball body + satellite + specular dot) as DISTINCT stills. Minor: the aurora still reads somewhat flat/washed vs the  …[trunc]
- disposition: retire — no action; census axis answered. (Optional refinement BG.W-BENTO-STILL-RICHEN: raise the still contrast/recognizability if the flat-preview read is judged too muted.)


## motion-language census

**Verdict:** The overlay enter/exit language has actually CONVERGED at HEAD — Dialog, Popover, Dropdown, Context-menu, Hover-card, Tooltip, Select, Combobox and Command all ride the ONE `.glass-reveal` recipe (`--spring-snappy` @ 0.4s enter, `@keyframes glass-reveal-out` ease-out @ 0.2s exit), so "popover enters like dropdown" is genuinely met; the surviving dialects are Sheet/Drawer (slide), Toast (tw-animate), and the NATIVE `.glass-top-layer` path (`--spring-bouncy` @ 0.62s — a second enter register that makes a native dialog bounce more than the identical reka dialog). But the convergence went one clock too coarse: transient fast-affordance surfaces (tooltip, context-menu, hover-card) share the SAME 0.4s modal clock, so the user's "tighten these / more-responsive everywhere" is unmet. The marquee draggable "liquid tab" is DEAD in the live product — the `.segmented-indicator` (z-index 0) is fully occluded by the `.segmented-tab` buttons (z-index 10), so a real pointerdown at the grab target lands on a button and `useDragMorph` never arms (confirmed live via `elementFromPoint`); `proof:drag-morph` is device-free and never checks reachability, and the binding π is local-only, so it is green-over-broken. The accordion "indents on click" because AccordionTrigger carries `tap-squish` (scale 0.96, origin-center) on a 1357px full-width row (~27px inward shift), and `transition-control` clobbers the scale transition so the shift snaps instantly — the same clobber degrades the "one spring-press" to an instant snap on SelectTrigger too. The "codified" `<Transition>` registers (`dialog-scale`/`dropdown`/`pop`/`fade-slide`) are orphaned specimens with zero production consumers, kept alive only by the motion showcase whose blurbs still claim they drive dialogs/menus/popovers. The one animated draw-in divider (`chrome-rule-strike`) rides `--ease-cartoon-punch` (+22% scaleX rubber-band) instead of the codified no-overshoot `--ease-out-expo` draw-on register, and its "un-landed today" comment is stale. The dominant defect mechanism is register-grammar drift plus a per-mechanism-green-over-gestalt-broken gate on the dead drag.

### MOTION-1 [P1] (vacuous-gate)
The draggable 'liquid tab' is structurally dead: the drag grab target (.segmented-indicator, z-index 0) is fully occluded by the .segmented-tab buttons (z-index 10), so pointerdown never reaches the indicator and useDragMorph never arms — yet it is now default-ON (motion:full) and proof:drag-morph passes.
- evidence: src/styles/segmented-tabs.css:84-92 (.segmented-indicator {position:absolute; z-index:0}) vs :234-236 (.segmented-tab {position:relative; z-index:10}). Live probe at http://localhost:5200/navigation/tabs: `document.elementFromPoint(indCenterX, indCenterY)` returns `{hitTag:'BUTTON', hitClass:'segmented-tab', hitIsIndicator:false}` for the grabbable indicator (cursor:grab, glass-drag-grabbable=true, z:0). useDragMorph binds pointerdown ONLY on the indicator node (/Users/mkbabb/Programming/glass-ui/src/composables/motion/useDragMorph.ts:327 node.addEventListener('pointerdown',...) + :328 draggab …[trunc]
- disposition: build BG.W-TABS-DRAG-REACHABLE — during a grab, raise the indicator above the buttons (or route pointerdown from the active-tab region to the drag), OR retire the drag axis; the gate must gain a live elementFromPoint reachability assert.

### MOTION-2 [P1] (register-grammar)
Accordion 'indents on click': AccordionTrigger composes tap-squish (scale 0.96, transform-origin center) on a full-width disclosure row, so pressing shifts the content ~27px inward — the wrong press register for a full-width header.
- evidence: src/components/ui/accordion/AccordionTrigger.vue:26 class list carries `tap-squish` on a `flex flex-1 ... px-1 py-4` full-width row. Live probe at http://localhost:5200/containers/accordion: trigger width 1357px, transformOrigin '678.5px 30px' (center), --scale-press '.96' → on :active scale(0.96) origin-center moves each edge inward by (1357*0.04)/2 ≈ 27.1px (computedInwardShiftOnPressPx:27.1). tap-squish:active sets scale:var(--scale-press) at src/styles/utilities/base.css:286-288. A disclosure header's affordance is the chevron rotate + content expand (AccordionTrigger already has `[&[data- …[trunc]
- disposition: fold BG.W-ACCORDION-NO-PRESS-SQUISH — drop `tap-squish` from AccordionTrigger (full-width disclosure rows never press-scale); keep the chevron-rotate disclosure register.

### MOTION-3 [P2] (dual-path)
transition-control (surface-only transition-property) co-composed with tap-squish REPLACES rather than merges the property list, stripping the scale transition — so the 'one interruptible spring-press' snaps instantly on AccordionTrigger and SelectTrigger.
- evidence: @utility transition-control declares `transition-property: background-color, color, box-shadow, border-color` (src/styles/utilities/btn.css:66-70) — no `scale`. Both AccordionTrigger (accordion/AccordionTrigger.vue:26) and SelectTrigger (select/SelectTrigger.vue:127) carry BOTH `tap-squish` AND `transition-control`. tap-squish's `transition` shorthand (base.css:270-284) sets scale on --transition-liquid-spatial, but CSS transition-property is replace-not-merge and transition-control (utilities layer) wins: live computed transition-property on the accordion trigger = 'background-color, color, b …[trunc]
- disposition: build BG.W-CONTROL-PRESS-TRANSITION-MERGE — either add the `scale` leg to transition-control's property list or make tap-squish's transition win, so the press squish springs on control surfaces as documented.

### MOTION-4 [P2] (register-grammar)
The overlay enter language collapsed onto ONE 0.4s snappy clock for every reka surface, so fast-affordance popovers (tooltip/context-menu/hover-card) are as slow to enter as a modal dialog; meanwhile the native .glass-top-layer path uses a SECOND, bouncier 0.62s register — the 'tighter / tighten context-menu+hover-card' ask is unmet and a native dialog enters unlike its reka twin.
- evidence: DIVERGENCE TABLE (HEAD): .glass-reveal (snappy SPATIAL @ --spring-snappy-duration 0.4s enter [reveal.css:67-72], scale 0.88×squish + blur4→0, exit @keyframes glass-reveal-out --ease-out @ --duration-fast 0.2s [animations.css:326]) = Dialog(default) [DialogContent.vue:166], Popover [PopoverContent.vue:58], DropdownMenu(+Sub) [DropdownMenuContent.vue:50], ContextMenu(+Sub) [ContextMenuContent.vue:39], HoverCard [HoverCardContent.vue:40], Tooltip [TooltipContent.vue:37], Select [SelectContent.vue:92], Combobox [ComboboxList.vue:24], Command list [CommandList.vue]. .glass-top-layer native path = - …[trunc]
- disposition: build BG.W-OVERLAY-ENTER-REGISTERS — two named enter clocks (fast/modal) replacing the single 0.4s snappy; unify the native top-layer bouncy path onto the modal register.

### MOTION-5 [P2] (dead-recipe)
The 'codified' Vue <Transition> enter/exit registers dialog-scale/dropdown/pop/fade-slide have ZERO production consumers (every overlay uses .glass-reveal); they survive only as motion-showcase specimens whose blurbs still claim they drive dialogs/menus/popovers, and metric-swap/pane-swap are fully dead.
- evidence: grep across src+demo for `name="dialog-scale|dropdown|pop|fade-slide|metric-swap|pane-swap"` → zero matches; the only references are demo/stories/foundations/motion.vue:38-67 which presents them with blurbs 'pop: popovers, badges', 'dialog-scale: Dialog-appropriate', 'dropdown: menus', 'fade-slide: menus, hints, floaters' — none of which is true at HEAD (Dialog/Popover/Dropdown all use .glass-reveal). metric-swap + pane-swap have zero refs even in the demo. The recipes live in src/styles/transitions.css:70-172. The doctrine legend (motion.vue:18) also says Enter='--spring-bouncy / --spring-sna …[trunc]
- disposition: fold BG.W-MOTION-SHOWCASE-TRUTH — retire the orphaned transitions.css recipes (clean break) and re-point demo/stories/foundations/motion.vue to the LIVE registers (.glass-reveal / .glass-top-layer / sheet-animate / toast) so the codification matches the product.

### MOTION-6 [P2] (register-grammar)
The one animated header→body divider draw-in (chrome-rule-strike) rides --ease-cartoon-punch (+22% scaleX rubber-band past full width) instead of the codified no-overshoot draw-on register --ease-out-expo, and its guard comment falsely claims cartoon-punch is 'un-landed'.
- evidence: demo/chassis/hero/story-hero.css:349-353 animates `.story-hero-cluster.story-hero-shrink::after { transform: scaleX(0); animation: chrome-rule-strike 520ms var(--ease-cartoon-punch, ...) 240ms both }`; --ease-cartoon-punch (scheme-motion.css:206-211) peaks at 1.22 = a hairline rule stretching 22% past the column width then retracting (origin left) — the 'divider draw-in too bouncy' read. The motion canon's own 'reveal draw-on' row (scheme-spring.css:73-74) prescribes --ease-out-expo (cubic-bezier(.16,1,.3,1), NO overshoot) for line/stroke reveals; completion-seal (--seal-draw) and handmark dra …[trunc]
- disposition: build BG.W-DRAWIN-EXPO-REGISTER — route every line/divider/stroke draw-on (chrome-rule-strike and any siblings) onto --ease-out-expo, and correct the stale 'un-landed' guard comment.

### MOTION-7 [P2] (reflow-guard)
Command palette jitter: the CommandList scroll port is overflow-y-auto with scrollbar-gutter:auto (no stable), so on classic-scrollbar platforms filtering that toggles overflow adds/removes the ~15px scrollbar and reflows every row horizontally; and .glass-menu-row's -1px hover-lift re-animates on each reka data-highlighted change as filtered rows shuffle under a stationary cursor.
- evidence: Live probe at http://localhost:5200/containers/command: the scroller `overflow-y-auto overflow-x-hidden [--overlay-pad-*]` reports scrollbarGutter:'auto', overflowing:true, clientW===offsetW===510 (macOS overlay scrollbars — NOT reflowing here, so the horizontal jitter is PLATFORM-GATED). CommandList.vue applies only `max-h-(--overlay-max-block) overflow-y-auto overflow-x-hidden` — no scrollbar-gutter:stable, whereas BC.W-DROPDOWN-FIX added exactly that discipline for app-shell scrollers (utilities/base-misc.css .scroll-gutter-stable) but never to the command port. Secondary: .glass-menu-row s …[trunc]
- disposition: build BG.W-COMMAND-STABLE-GUTTER — add scrollbar-gutter:stable to the CommandList port and suppress/damp the .glass-menu-row hover-lift while the list is actively filtering (mouse-move re-highlight during reflow).


## BH/BI structure plan re-audit against the 2026-07-11 deletion/greenfield mandate

**Verdict:** The 20-wave BI CONSTELLATION structure plan (docs/tranches/BH/spec-structure/) is architecturally SOUND but is baselined on a tree the 2026-07-11 mandate is about to change out from under it. Its whole premise — a paint-neutral, export-neutral, atomic flatten of a STABLE 91-family / 9-viz / 94-subpath tree, sequenced AFTER the 5.0.0 cut as a zero-churn 5.1.0 minor — is falsified by the mandate: deleting dot-flow-field+concentric+dot-matrix, pruning glass-panel, moving the metric families to speedtest, and greenfielding the dock + carousel/pager. Two structural truths dominate: (1) the repairs MUST run BEFORE the structure spine, because BI.W-CENSUS-RECOMPUTE is the first wave and every later wave keys off its snapshot — running census on the pre-repair tree poisons the flatten's counts, and flattening families you are about to delete/greenfield is double-work plus an atomic-merge collision; (2) the deletions REMOVE public subpaths (7 export keys), which is a BREAKING change that contradicts BI's "5.1.0 minor / ZERO export churn" claim and belongs in the MAJOR cut, not the flatten. The gate MECHANISMS mostly survive (census is a recompute, structure-sync was re-homed off the deleted CLAUDE.md onto generated structure.md, viz membership is import-edge-derived) — but the hardcoded ARTIFACT figures, the proportion-pass targets (PROMOTE-CONTEXT/PROMOTE-PRIMITIVES/FOLD/README all name dock/carousel/viz families being greenfielded or deleted), and ~5 deleted-viz gates are invalidated or duplicate the greenfields. The reconciled shape: a paint-bearing REPAIR band (breaking, MAJOR, Fable-driven for the two greenfields) lands first; then BI re-baselines on the repaired ~84-family tree, export-neutral, with PROMOTE-CONTEXT folded into the dock greenfield and README/FOLD/PROMOTE-PRIMITIVES re-scoped.

### STRUCT-1 [P0] (sequencing)
The entire BI spine (census → flatten → proportion → differential) is sequenced AFTER published(5.0.0) on a tree assumed STABLE, but the mandate's deletions/greenfields must land BEFORE census or every downstream wave reads a poisoned snapshot.
- evidence: STRUCTURE-TRANCHE-PLAN.md:37 'precond is published(5.0.0)' + §5:227 'BI.W-CENSUS-RECOMPUTE RE-COMPUTES at the ACTUAL cut HEAD … Every later wave reads THIS snapshot'. BI.W-CENSUS-RECOMPUTE.md:8 'Establishes the snapshot every later BI wave reads.' The mandate (delete 3 viz + prune glass-panel + move metrics + greenfield dock/carousel) changes the family set census freezes; if it lands after census, census is a lie and FLATTEN/PROMOTE/FOLD all key off stale figures.
- disposition: build a paint-bearing REPAIR band (all deletions/prunes/greenfields/substrate-simplify/hover-popover) that lands BEFORE BI's S0 census; re-baseline BI on the repaired tree — wave BI-REPAIR-BAND-BEFORE-SPINE / re-sequence §0

### STRUCT-2 [P0] (semver-breach)
Deleting dot-flow-field/concentric/dot-matrix/glass-panel + moving metric-badge/cell/stack out REMOVES 7 public subpath export keys — a BREAKING change that contradicts BI's '5.1.0 minor, ZERO public-export churn' and the flatten's proven '0 package.json export-key churn'.
- evidence: package.json:482/510/514/534/574/578/582 carry ./concentric ./dot-flow-field ./dot-matrix ./glass-panel ./metric-badge ./metric-cell ./metric-stack. STRUCTURE-TRANCHE-PLAN.md:39 'BI cuts as 5.1.0 (a semver-MINOR: ZERO public-export churn)'; BI.W-FLATTEN-MOVE.md:97 'ZERO PUBLIC-EXPORT churn'. Removing export keys is a MAJOR bump, incompatible with folding into the paint-neutral flatten.
- disposition: route the export deletions into the MAJOR cut (BG/BH 5.0.0 or a fresh major before BI), NOT the flatten; keep BI export-neutral — wave BI-REPAIR / SEMVER-ROUTE-DELETIONS-TO-MAJOR

### STRUCT-3 [P1] (stale-census)
CENSUS-RECOMPUTE + FLATTEN hardcode the pre-mandate counts (91/90 families, 9 viz, 94/94 subpaths, ~568 specifiers, 865 literals, 638 renames, 190 chunks); the mandate drops flat families 91→~84 (verified) and viz 9→6 and subpaths 92→~85.
- evidence: Command: custom=49 ui=43 raw=92 flat(dedup tabs)=91, after DELETE 3 viz+glass-panel+3 metric = 84. BI.W-CENSUS-RECOMPUTE.md:23-27 records '91 top-level / 90 barrel-bearing' and viz 'STABLE at 9 — aurora, concentric, constellation, dot-flow-field, dot-matrix, fourier-field, goo-blob, liquid-grid, goo-filter' (3 of which are deleted). BI.W-FLATTEN-MOVE.md:12 '190 chunks, 94/94 subpaths, 638 git renames'. The GATE (recompute soundness, import-edge-derived viz per C3) self-heals if re-run post-repair; the artifact prose and every derived wave figure are stale.
- disposition: re-scope CENSUS-RECOMPUTE to run post-repair and strip the hardcoded expectation numbers (keep the recompute-soundness mechanism); ripple the recomputed counts into FLATTEN-PREP/MOVE prose — re-scope BI.W-CENSUS-RECOMPUTE

### STRUCT-4 [P1] (greenfield-dupe)
BI.W-PROMOTE-CONTEXT moves dockContext.ts + useDockHold.ts (dock-suite-internal DI) — work the dock GREENFIELD rebuilds from scratch; running it on the old dock is wasted and collides with the greenfield's native DI placement.
- evidence: BI.W-PROMOTE-CONTEXT.md:22-29 'dockContext.ts → composables/context/ … useDockHold.ts → promote WITH dockContext'. The dock suite (37 files, incl composables/dockContext.ts + useDockHold.ts per `find src/components/custom/dock`) is the mandate's greenfield target. A greenfield establishes the correct DI home natively; PROMOTE-CONTEXT on the pre-greenfield dock is throwaway.
- disposition: FOLD PROMOTE-CONTEXT into the dock greenfield (greenfield lands dockContext at composables/context/ + resolves the ui/slider→useDockHold guts reach natively); remove the S3 wave — fold BI.W-PROMOTE-CONTEXT into DOCK-GREENFIELD

### STRUCT-5 [P1] (greenfield-dupe)
README-REMEDIATE's carousel row and FOLD-CENSUS's carousel/dock folds target families the carousel + dock greenfields own — the greenfield writes the README/composable placement natively, so these proportion rows are pre-empted.
- evidence: BI.W-README-REMEDIATE.md:23 'carousel — useCarouselWorm + composables/ machinery; add README, relocate the root composable' (carousel is a greenfield target; useCarouselWorm lives at src/components/ui/carousel/composables/useCarouselWorm.ts). BI.W-FOLD-CENSUS.md:16-18 'useDockCtaReceive → dock/composables/ (1 owning family)' + carousel machinery. Both duplicate greenfield-owned colocation.
- disposition: re-scope README-REMEDIATE target set to {configurator, drawer, progress, timeline} (drop carousel); fold the carousel/dock FOLD-CENSUS rows into the respective greenfields — re-scope BI.W-README-REMEDIATE + BI.W-FOLD-CENSUS

### STRUCT-6 [P1] (stale-census)
PROMOTE-PRIMITIVES's viz-driven edges are falsified: budget.ts's '12 files across 7 viz families' shrinks (3 viz deleted) and the curlFBM promote-driver 'concentric → liquid-grid/index.ts' EVAPORATES because concentric is deleted.
- evidence: BI.W-PROMOTE-PRIMITIVES.md:16-21 'aurora/constants/budget.ts → shared — reached by 12 files across 7 viz families' + 'curlFBM → shared … the real edge is concentric → liquid-grid/index.ts'. Viz families per grep = aurora/concentric/constellation/dot-flow-field/dot-matrix/fourier-field/goo-blob/liquid-grid; deleting dot-flow-field/concentric/dot-matrix removes 3 reachers and the sole cross-viz curlFBM edge.
- disposition: re-scope PROMOTE-PRIMITIVES post-repair; drop the curlFBM promote if concentric was its only foreign reacher (curlFBM folds back to its single owner), recompute budget.ts's reach count — re-scope BI.W-PROMOTE-PRIMITIVES

### STRUCT-7 [P1] (stale-census)
CSS-COLOCATE-B2's headline '~238-site gate re-point (176 the DOCK family)' is computed against the OLD dock CSS partials; the dock greenfield replaces that file set, so the 176-site figure and the dock CSS colocation are invalidated.
- evidence: STRUCTURE-TRANCHE-PLAN.md:252 '~238 path-site gate re-point (176 the DOCK family, one uniform pass; 39 non-dock gates)'. The dock ships as a thin @import root over dock/{shell,morph,density,layers,layer-group,overflow}.css partials (CLAUDE.md dock section); a greenfield rewrites these. Running B2's dock arm before the dock greenfield re-points paths the greenfield then deletes.
- disposition: sequence CSS-COLOCATE-B2's dock arm AFTER the dock greenfield (or let the greenfield establish colocated dock CSS natively and re-scope B2 to the 39 non-dock gates) — re-scope BI.W-CSS-COLOCATE-B2

### STRUCT-8 [P1] (scope-gap)
The mandate's '/data/metrics move to speedtest' transfers three PUBLISHED library families (metric-badge/cell/stack) OUT of glass-ui INTO speedtest, but BI.W-ASK-SPEEDTEST carries no such transfer — it only names survey/admin/dashboard graduations + the server backend.
- evidence: BI.W-ASK-SPEEDTEST.md:20-24 lists graduations/App.vue-drain/backend but NO metric-family adoption. metric-badge/cell/stack are public subpaths (package.json:574-585) with library-side entanglement (metric-pill ui/ composes MetricBadge; MetricCell iconColor reconciled onto IconChip per CLAUDE.md; --metric-row tokens across scale-paper.css). The transfer needs a glass-ui prune line + the inv-11 registry-consumer probe + a speedtest ADOPT ask.
- disposition: add the metrics-transfer carry to ASK-SPEEDTEST (speedtest adopts the 3 families on its consume) + a glass-ui prune/fold line with the registry probe; decide metric-pill (ui/) disposition — build BI.W-ASK-SPEEDTEST-METRICS-ADOPT + prune line

### STRUCT-9 [P2] (orphan-gate)
Five+ gates enumerate the deleted viz by name and are not owned by any BI wave: proof-concentric/proof-flow-field/proof-viz-dotflow/proof-dot-matrix + concentric/flow-field-wgpu-parity-capture, and proof:gpu-substrate-single hardcodes the viz allowlist regex custom/(aurora|goo-blob|dot-flow-field|concentric).
- evidence: `ls scripts` → proof-concentric.mjs, proof-flow-field.mjs, proof-viz-dotflow.mjs, proof-dot-matrix.mjs, concentric-wgpu-parity-capture.mjs, flow-field-wgpu-parity-capture.mjs. scripts/proof-gpu-substrate-single.mjs:355 regex `custom/(aurora|goo-blob|dot-flow-field|concentric)`. Deleting these families orphans the gates and reds the substrate-single parity table.
- disposition: retire the per-viz gates + parity captures in the repair band and shrink the gpu-substrate-single allowlist regex + parity rows; register the retirements (no silent gate delete) — retire in DOCK/VIZ-DELETE band

### STRUCT-10 [P2] (orphan-gate)
The FLATTEN-MOVE migration PRECONDITION (the PROCEDURAL-SUITE.md SSOT reconcile) is already stale and the deletions enlarge it: the suite doc still lists dot-flow-field/concentric/dot-matrix/paper-grid as live members while paper-grid is retired and liquid-grid superseded it.
- evidence: BI.W-FLATTEN-MOVE.md:70-71 'the SSOT reconcile (paper-grid→liquid-grid; watercolor-dot mark) is the MIGRATION PRECONDITION'. src/components/custom/PROCEDURAL-SUITE.md:17-22 still tables dot-flow-field/concentric/dot-matrix as members and :19 lists paper-grid. Deleting 3 more viz means the precondition reconcile must strip them before the flatten's domain-map (90 rows) can be sound.
- disposition: expand the PROCEDURAL-SUITE/structure.md SSOT reconcile in the repair band (strip the 3 deleted viz + paper-grid, confirm liquid-grid keeper) so it is landed before FLATTEN-MOVE reads it — fold into VIZ-DELETE band

### STRUCT-11 [P2] (greenfield-dupe)
The hover-popover triplication adjudication changes what HoverPopover.vue is, but BI.W-GUTS-RESIDUAL enumerates 'ContinuousMarkers → HoverPopover.vue' as a live cross-component guts reach to decide — the adjudication must precede GUTS-RESIDUAL or it decides against a stale target.
- evidence: BI.W-PROMOTE-PRIMITIVES.md:37 + STRUCTURE-TRANCHE-PLAN.md:182 name 'ContinuousMarkers → HoverPopover.vue' for GUTS-RESIDUAL. Verified reach: src/components/custom/timeline/ContinuousMarkers.vue:7 `import HoverPopover from '../hover-popover/HoverPopover.vue'`. Triplication set = ui/hover-card + custom/hover-popover + custom/icon-tooltip (all hover-triggered popovers). Folding any changes the guts-reach target.
- disposition: run the hover-popover adjudication in the repair band; GUTS-RESIDUAL reads the post-adjudication tree — sequence HOVER-POPOVER-ADJUDICATE before BI.W-GUTS-RESIDUAL

### STRUCT-12 [P2] (orphan-gate)
Demo stories + manifest rows for every deleted/pruned family are orphaned, and the census + differential-close re-run G1 over the WHOLE cut HEAD incl demo/ — leaving dead routes for deleted families would RED the differential with no owning wave.
- evidence: `ls demo/stories/substrates` → dot-flow-field.vue, concentric.vue, dot-matrix.vue, glass-panel.vue (+ VizStudio.vue enumerating viz); demo/stories/compositions/{math-paper,hero}.vue; demo/stories/data/metrics.vue. STRUCTURE-TRANCHE-PLAN.md:352 'BI.W-DIFFERENTIAL-CLOSE re-runs G1 born-RED→GREEN over the WHOLE cut HEAD' incl demo/ (§6-G1). ORCHESTRATOR-ADJUDICATION ruling charges CENSUS-RECOMPUTE to verify demo/ G1.
- disposition: prune the demo stories + demo/stories/manifest.ts rows for deleted families in the repair band so census-recompute reads the pruned demo — fold into the REPAIR band per family

### STRUCT-13 [P2] (sequencing)
'Grand-simplify the glass substrate set' touches the exact shader/substrate files PROMOTE-PRIMITIVES moves (procedural-color.wgsl.ts, curlFBM, budget.ts) and the substrate gates — the simplify must precede PROMOTE-PRIMITIVES or the promote targets are re-derived twice.
- evidence: src/composables/glass/ = {canvas2d, webgl, webgpu, wave, useGpuSubstrate, ...}; substrate gates = proof-gpu-substrate-single, proof-webgpu-everywhere, proof-substrate-cohesion, proof-constellation-substrate-single. BI.W-PROMOTE-PRIMITIVES.md:18 moves procedural-color.wgsl.ts + curlFBM (both substrate/shader leaves). Deleting the compute-heavy viz (dot-matrix/dot-flow-field) may collapse the webgpu arm, changing what survives to promote.
- disposition: order the substrate-simplify inside the repair band, before PROMOTE-PRIMITIVES; let PROMOTE-PRIMITIVES read the simplified substrate — sequence SUBSTRATE-SIMPLIFY before BI.W-PROMOTE-PRIMITIVES

### STRUCT-14 [P3] (scope-gap)
The mandate DELETES dot-flow-field, which BG.W-DOTFLOW-REBUILD (F9) just rebuilt WebGPU-first — a reversal of very recent work; and liquid-grid (which superseded paper-grid) is the KEEPER, so the delete set must not accidentally sweep it. Worth an explicit confirm before the irreversible prune.
- evidence: docs/tranches/BG/execution/EXECUTION-PROGRESS.md:221 'BG.W-DOTFLOW-REBUILD wave route → /substrates/dot-flow-field, the WebGPU-first…'. CLAUDE.md DotFlowField section 'BG.W-DOTFLOW-REBUILD, supersedes BB.W-FLOWFIELD'. liquid-grid is on disk (src/components/custom/liquid-grid/) and is the census 'liquid-grid superseded paper-grid' keeper — distinct from the 3 deletes.
- disposition: record the deletion rationale (user-superseded, not stale-mandate) + assert liquid-grid + constellation + fourier-field + aurora + goo-blob SURVIVE as the retained viz set — record in VIZ-DELETE band verdict


## consumer-truth + overfit

**Verdict:** The BG+BH tree is largely sound on standard primitives (button/card/dialog/dock/popover/hover-card/select/toast and the aurora/constellation/deck viz families all have multiple healthy sibling consumers), and glass-panel — flagged by the user as 'likely superseded' — is in fact live in atlas + sci-report chrome, so keep it. The dominant defect mechanism is a vacuous ≥2-consumer gate: proof:component-orphan counts demo stories + internal manifest/api wiring as 'consumers', so demo-only and booked-but-unlanded primitives (border-progress: 0 binary consumers yet 'consumers=2'; completion-seal: 1, its own demo) sail green while their CLAUDE.md 'born with ≥2 consumers by construction' claims are false at the sibling HEADs (speedtest still hand-rolls its own border bar). A real overfit cluster is speedtest-only: metric-cell, metric-stack, instrument-chassis, icon-tooltip, pulse, scrolling-text have no non-speedtest binary consumer and are move-to-speedtest candidates. The compositions band carries genuine scenes (auth-shell/settings/empty-states/form-validation) mixed with overfit: math-paper (a static Fourier document the user wants removed), a re-authored hero that is now a bento landing index, and 4 single-component demos (icon-tooltip/labeled-field/instrument-chassis/configurator) misfiled as 'compositions'. hover-popover is literally reka HoverCard underneath (a real triplication with hover-card/popover) but clears the consumer bar via atlas+fourier-analysis, so it survives with a recorded fold-if-forced path. Finally, the /api drop is a documented clean break, but speedtest still imports TimelineSegment from it — an owed consumer migration to name in the 5.0.0 cut-notes.

### OFIT-1 [P1] (vacuous-gate)
proof:component-orphan counts demo stories + internal manifest/api wiring as 'consumers', so the J-inv-10 ≥2-consumer bar is satisfied vacuously for demo-only components — it structurally cannot catch overfit.
- evidence: .cache/gates/AY-component-orphan.json surveyed row: border-progress {published:true, consumers:2, evidenced:false, ok:true, siblingHits:0} — both counted 'consumers' are in-repo (a demo story + src/api or manifest wiring), ZERO binary consumers, yet ok:true. facts.twoPlusConsumerCount=41 is inflated by demo+internal. `node scripts/proof-component-orphan.mjs` → PASS exit 0 with violations:[]. The gate's 'consumers' field does not separate binary from demo/internal.
- disposition: build BI.W-ORPHAN-BINARY-SPLIT — add a clause that counts BINARY (sibling + registry) consumers distinctly from demo+internal, and reports demo-only published subpaths as a named category (not silently green).

### OFIT-2 [P1] (booked-not-landed)
border-progress ships as a published subpath with ZERO real consumers — its CLAUDE.md 'born with ≥2 consumers by construction (speedtest AW.W7 binds <BorderProgress>)' claim is false at speedtest HEAD, which hand-rolls its own bar.
- evidence: grep speedtest: NO `import ... @mkbabb/glass-ui/border-progress` anywhere. speedtest/src/features/speedtest/ui/PhaseTimeline.vue:352 `transform: scaleX(var(--border-progress-value, 0));` (a hand-rolled ::after bar) with :295 comment 'migrates to the glass-ui BorderProgress primitive — at that time'. No docs/consumer-evidence/border-progress.md exists (cat returns empty). Orphan gate: consumers=2, siblingHits=0.
- disposition: fold BI.W-BORDER-PROGRESS-DECIDE — either author a consumer-evidence doc naming the honest 1-real-consumer status + booked trigger (the completion-seal posture), or retire /border-progress until the speedtest adoption actually lands. Do not re-ship the 'born ≥2 by construction' claim.

### OFIT-3 [P2] (booked-not-landed)
completion-seal ships at exactly 1 consumer (its own demo story) on a booked-but-unlanded speedtest adoption; the evidence-doc escape keeps it green.
- evidence: docs/consumer-evidence/completion-seal.md §'Consumer proof': 'Internal consumers — 1 (real)' + 'External consumers — 0 at HEAD (the booked cross-repo consume)'. Trigger = 'speedtest ... on its ^4.x bump (BC.W-SPEEDTEST-ADOPT)'. grep speedtest for CompletionSeal → only a comment (ResultHeadlineCluster.vue:146), no import. Orphan gate: consumers=1, evidenced=true, ok:true (passes via the evidence-doc allowlist escape).
- disposition: hold BI.W-COMPLETION-SEAL-TRIGGER-WATCH — legitimate user-directed wave, but keep on the evidenced-orphan watchlist; the ≥2 bar is met only when a `grep glass-ui/completion-seal ~/Programming/speedtest/src` hit is recorded. Flag in the cut notes that it ships demo-only.

### OFIT-4 [P2] (overfit-single-consumer)
metric-cell, metric-stack, instrument-chassis, icon-tooltip, pulse, scrolling-text have speedtest as their ONLY binary consumer — move-to-speedtest candidates per the lens.
- evidence: .cache/gates/AY-component-orphan.json surveyed sibling hits: metric-cell → speedtest/src/components/dashboard/ResultDetailSheet.vue + speedtest/.../SharedResultView.vue (speedtest ×2, no other repo); metric-stack → speedtest/.../ResultStack.vue (×1); instrument-chassis → speedtest/src/App.vue + useRouteTransition.ts (×2); icon-tooltip → speedtest Dock.vue + AddressAutocomplete.vue (×2); pulse → 3× speedtest; scrolling-text → 2× speedtest. No non-speedtest binary consumer for any.
- disposition: fold BI.W-METRIC-FAMILY-RELOCATE — the user named metric-cell/metric-stack/instrument-chassis explicitly. Adjudicate per component: metric-cell/metric-stack (bespoke speedtest readouts) are the strongest move-to-speedtest candidates; instrument-chassis/pulse/icon-tooltip/scrolling-text are more generic — keep only with an explicit 'speedtest-primitive, ≥2 bar unmet' evidence doc, else relocate.

### OFIT-5 [P2] (demo-overfit)
The compositions band mixes genuine cross-component scenes with single-component demos and overfit specimens; ~6 of 13 rows are questionable (math-paper, hero, + 4 single-component demos parked as 'compositions').
- evidence: demo/stories/manifest.ts:363-368 — compositions/{configurator,instrument-chassis,labeled-field,icon-tooltip} chip-map to `@mkbabb/glass-ui/<component>` (single-component subpaths), vs the scene rows that use `/compositions/<name>`. compositions/icon-tooltip.vue (45 lines) imports ONLY IconTooltip; compositions/labeled-field.vue imports LabeledField+Input+Button (single-primitive demo). compositions/math-paper.vue is a static Fourier document (paper-grain/grid/ink-mark specimen — user: 'math-paper overfit-remove'). compositions/hero.vue header comment admits it WAS 'a near-verbatim clone of the …[trunc]
- disposition: retire+refile BI.W-COMPOSITIONS-PRUNE — delete math-paper; re-file icon-tooltip/labeled-field/instrument-chassis/configurator to their component categories (they mirror one primitive); reconsider hero (a landing index, not a scene). KEEP the genuine scenes: auth-shell, settings, empty-states, form-validation, gate-pattern, chassis.

### OFIT-6 [P3] (demo-overfit)
The /data/metrics FamilyTabs page folds metric-cell/metric-stack/metric-badge/metric-pill/scrolling-text, yet data/metric-cell + data/metric-stack retain their own subpath-chip registrations — a likely duplicate/dead route pair.
- evidence: demo/stories/data/metrics.vue:11-38 imports metric-cell.vue + metric-stack.vue + ../display/metric-badge.vue + metric-pill.vue + scrolling-text.vue as FamilyTabs members; manifest.ts:324-328 still lists `data/metric-cell`, `data/metric-stack` chip entries alongside `data/metrics`. manifest comment (408/428): 'the metric atoms move OUT to data/metrics ... redundant set onto ONE FAMILY page'.
- disposition: confirm+dedup (folds into BI.W-COMPOSITIONS-PRUNE) — verify data/metric-cell + data/metric-stack are removed from the nav route set (not just left as residual chip entries); the standalone stories should exist only as FamilyTabs members.

### OFIT-7 [P2] (triplication)
hover-popover is literally reka HoverCard underneath — the same primitive hover-card wraps — a genuine semantic triplication with popover/hover-card, though all three clear the ≥2-consumer bar.
- evidence: src/components/custom/hover-popover/HoverPopover.vue:5-10 imports HoverCardContent/Portal/Root/Trigger from 'reka-ui' (its own docstring: 'Composition rests on reka-ui's HoverCard primitives'). Consumer truth: hover-card = words ×14 + speedtest + slides (heavy); popover = words ×6 + atlas + slides-K + speedtest; hover-popover = atlas EasterEgg.vue + fourier-analysis CanvasControlsDock/EditorControlsDock (2 repos). hover-popover's ONLY distinct capability is keepDockOpen (dock-collapse suppression) + a label-tier default.
- disposition: keep-all with recorded axis BI.W-HOVER-SURFACE-ADJUDICATE — consumer truth justifies all three (hover-card=rich hover, popover=click, hover-popover=hover-tooltip+dock-keep). If forced to reduce, fold hover-popover into hover-card as a `variant="label"` carrying keepDockOpen (they share the reka substrate); do NOT retire it outright — it has 2+ real consumers.

### OFIT-8 [P3] (counter-finding)
COUNTER to the user hypothesis: glass-panel is NOT superseded — it has 2 real sibling consumers using <GlassPanel variant="floating"> as production chrome.
- evidence: atlas/src/platform/chrome/background/AuroraVeilStage.vue:32 `import { GlassPanel } from "@mkbabb/glass-ui/glass-panel"` (+ GalleryMasthead.vue:19, useAuroraVeil.ts references); sci-report uses /glass-panel ×5. docs/consumer-evidence/glass-panel.md exists (evidenced=true). It is distinct from the .glass-material CSS register (demo substrates/glass-material.vue) — glass-panel is a rimless GlassPanel COMPONENT, glass-material is the CSS.
- disposition: keep glass-panel — record the atlas/sci-report consumers so the 'superseded?' question is closed by evidence, not re-raised each tranche.

### OFIT-9 [P2] (consumer-migration-owed)
The /api export key is dropped at 5.0.0 (the only dropped key) but the sole live consumer, speedtest, still imports a type from it — a documented clean break whose consumer migration is owed and un-done at speedtest HEAD.
- evidence: package.json exports has NO ./api (node check: 'has ./api export? false'). speedtest/src/features/speedtest/ui/PhaseTimeline.vue:52 `import type { TimelineSegment } from "@mkbabb/glass-ui/api"`. MIGRATION.md:20-28 documents the 203-symbol re-home (TimelineSegment → @mkbabb/glass-ui/timeline, src/components/custom/timeline/types.ts:26). On the 5.0.0 bump speedtest fails to resolve /api until it migrates.
- disposition: coordinate BI.W-SPEEDTEST-API-MIGRATE (cross-repo ask, foreign-tree fence) — the break is documented+legitimate; ensure the 5.0.0 cut-notes name speedtest's /api → /timeline migration as an owed consumer edit so the bump does not silently strand it.


## geometry/rounding/border census

**Verdict:** The radius ladder itself is sound (theme/radius.css: primitives xs/sm 4px → 2xl 16px → 3xl 24px → pill 9999px, with semantic aliases card→2xl, panel→xl, dialog→2xl, tab/control/badge/dock→pill). The rot is at the SEMANTIC-alias level: --radius-tab, --radius-control, --radius-badge and --radius-dock ALL collapse onto --radius-pill (9999px), and NO "pill-iff-the-box-is-short/single-row" guard exists, so any pill token landing on a tall or multi-row box balloons (a 9999px radius clamps to half the SHORTER axis = full semicircle caps). There is NO repo-wide concentric-radius law and no capsule-vs-card decision gate — only per-surface hand-computations (segmented-tabs track=pill+trim) and a synthetic "A7 concentricity" self-test scaffold — so the vertical-track balloon, the card-in-pill mismatch, the unrounded sheet, and the squared metal rim each drift independently and unaudited. Four defects the user named are CONFIRMED (two live-measured): the vertical pill-tabs track balloons (10003px on a 92×132 box), the Sheet renders fully square with a dead squircle rule, the metal-*-border uses border-image (squares rounded-card corners) with a vacuous proof, and BorderProgress bottom-edge kept the conic paint its own sibling inline-end-edge was fixed off. The dominant mechanism is radius-grammar absence: pill-everywhere aliases with no box-shape or concentric guard, compounded by two vacuous gates (metal-shimmer, sheet squircle) that green over the broken geometry.

### GEO-1 [P1] (radius-grammar)
Vertical SegmentedTabs pill track balloons — the vertical arm never re-points the 9999px pill radius, so a tall-narrow track clamps to half-WIDTH = full semicircle top/bottom caps.
- evidence: src/styles/segmented-tabs.css:46 `--bouncy-slider-radius: var(--radius-tab)` (=--radius-pill=9999px); :47 track=pill+trim. `.segmented-tabs--vertical` (segmented-tabs.css:66) sets flex-direction:column but NO radius override. Demo renders it (demo/stories/navigation/tabs.vue:203 orientation="vertical"). LIVE at http://localhost:5200/navigation/tabs — evaluate_script returned vertical pill track w=92 h=132 borderRadius="10003px", halfWidth=46 → clamps to 46px semicircle caps; the horizontal track (h=39, radius 10003px→halfHeight 20) correctly reads a stadium. The 0px second vertical track is th …[trunc]
- disposition: build BG.W-TABS-VERTICAL-RADIUS — the vertical arm re-points --bouncy-slider-radius off --radius-pill onto a card/panel rung (or a min(radius, shorter-axis/2 * cap) clamp) so a tall track reads card-like, not a ballooned capsule.

### GEO-2 [P1] (vacuous-gate)
SheetContent renders fully square (border-radius:0 all corners) — the sheet CVA carries no radius class and the squircle.css rule that targets it is a no-op on a 0-radius box.
- evidence: src/components/ui/sheet/index.ts:33 CVA base = `glass-floating ... sheet-animate` with NO rounded-*/radius; src/styles/sheet.css:41-72 per-side positioning sets no border-radius; .glass-floating carries no radius (src/styles/glass/material.css:82 — each surface owns its own radius). src/styles/glass/squircle.css:45 `.glass-floating.sheet-animate { corner-shape: var(--corner-shape-sheet) }` shapes nothing because border-radius is 0. Contrast DialogContent.vue:177 `cn(surfaceClass(...,'floating'),'rounded-dialog')`. LIVE at /containers/sheet (opened 'Open top') — SheetContent borderRadius/border …[trunc]
- disposition: build BG.W-SHEET-RADIUS — give SheetContent per-side inner-corner radius (a right sheet rounds its left corners, a top sheet its bottom) so corner-shape has a radius to shape; the squircle rule stops being dead.

### GEO-3 [P1] (radius-grammar)
metal-*-border uses border-image, which ignores border-radius and squares the corners of the rounded cards it decorates — and proof:metal-shimmer never checks it (green-over-broken).
- evidence: src/styles/utilities/metal.css:121-130 `border: var(--metal-border-width,2px) solid transparent; border-image: linear-gradient(...) 1;` with zero radius mitigation. Applied to rounded cards at demo/stories/substrates/glass-material.vue:332 (`metal-gold-border ... rounded-card`) and :338 (`metal-bronze-border ... rounded-card`). border-image per CSS spec overrides border-radius → square rim over a 16px-rounded card (the user's condemnation verbatim). scripts/proof-metal-shimmer.mjs has no border-image/border-radius/corner assertion (grep: only --ripple-radius / --metal-glow-blur radius refs) —  …[trunc]
- disposition: build BG.W-METAL-RIM-MASK — re-express the swept rim via the SAME masked linear-gradient + mask-composite:exclude technique BorderProgress uses (radius-following); retire border-image; add a border-image-absent + corner-follows-radius bite to proof:metal-shimmer.

### GEO-4 [P1] (dual-path)
BorderProgress bottom-edge keeps the perimeter CONIC paint while its sibling inline-end-edge was fixed to a linear paint — so the bottom band's fill doesn't progress along the edge and reads as a hollow outlined rounded rect.
- evidence: src/styles/border-progress.css:81-92 the `[data-coverage="bottom-edge"]` rule overrides only -webkit-mask/mask/mask-composite; it does NOT override `background`, so it inherits the base conic (border-progress.css:49-56). The sibling `[data-coverage="inline-end-edge"]` (border-progress.css:102-108) DOES swap `background: linear-gradient(to bottom, spectrum, transparent fill%, ...)` — with the in-file rationale (:97-99) 'the PAINT swaps to a LINEAR gradient so the value maps LINEARLY along the block axis (a conic maps a single edge nonlinearly through the corner angles)'. The identical reasoning …[trunc]
- disposition: build BG.W-BP-BOTTOM-LINEAR — bottom-edge overrides background to `linear-gradient(to right, spectrum, transparent var(--border-progress-fill), transparent)` mirroring inline-end-edge (one shared linear-paint helper for both edge registers).

### GEO-5 [P2] (radius-grammar)
No concentric-radius law or capsule-vs-card decision gate exists repo-wide — nested radii are hand-tuned per surface, which is why each ballooning/mismatch case drifts independently and unaudited.
- evidence: grep 'concentric' across src/styles + scripts/proof-*.mjs finds only per-surface computations (src/styles/segmented-tabs.css:78 track=pill+trim; src/styles/dock/shell.css:468; dock/layers.css:393) and a SYNTHETIC self-test arm 'A7 concentricity' in scripts/proof-coherence-census.mjs:62,278 (arms.A7 = '### A7 — synthetic arm'). `ls scripts/ | grep -iE radius|geometry|concentric|corner` → only proof-concentric.mjs (the Concentric VIZ component, unrelated). No token expresses parent_radius = child_radius + gap; no gate flags capsule-rounding on a multi-row container.
- disposition: build BG.W-RADIUS-GRAMMAR — mint a concentric-radius relation token (child + inset) + a capsule-vs-card decision law (pill iff single-row/short-box, else card/panel rung) + proof:radius-grammar asserting nested surfaces obey it; GEO-1/GEO-6 fall out of this law automatically.

### GEO-6 [P3] (radius-grammar)
ToggleGroup single-select track is rounded-pill (9999px); a variant="card" item (--radius-card 16px) inside it is a nested-radius mismatch — latent because no demo currently pairs them.
- evidence: src/components/ui/toggle-group/ToggleGroup.vue:46-49 `type==='single' ? 'glass-capsule-track rounded-pill p-1' : ''`; card items resolve --radius-card (src/components/ui/toggle/index.ts:57-63). LIVE at /forms/toggle: the single-select (role=radiogroup) track renders 9999px with pill items (9999px) — no mismatch TODAY (pill-in-pill). Becomes a card-in-pill balloon the moment a consumer uses `<ToggleGroup type="single">` with `<ToggleGroupItem variant="card">`.
- disposition: fold into BG.W-RADIUS-GRAMMAR — the concentric law (track radius = item radius + p-1 inset) auto-derives the correct track rung per item variant; the pill track becomes card+4px when items are cards.

### GEO-7 [P2] (shadow-geometry)
The cartoon offset shadow is a stacked multi-layer HARD (0-blur) down-LEFT stamp that reads as a bottom-left slab at the corners on punch buttons / select / active tiles.
- evidence: src/styles/tokens/shadow.css:131-142 `--shadow-cartoon-md: -3px 3px 0 …, -5px 5px 0 …, -7px 7px 0 …` and `-lg: -4/-7/-11px` — negative-X positive-Y (down-left), 0 blur = hard slabs. Rendered via .cartoon-cast (src/styles/cards.css:381-388, `border-radius:inherit; box-shadow: var(--shadow-cartoon-md)`) on .btn-punch buttons (primary-audacious/gold-audacious — Button.vue:46-47 emits the inert cast) and directly on select.css:134 (--shadow-cartoon-lg) + the configurator active tile. This is the user's 'solid-button bottom-left shadow slab artifacts'. NB the documented `solid` Button variant does  …[trunc]
- disposition: refine BG.W-CARTOON-SLAB — soften/collapse the 3-layer hard stamp on interactive controls (a single softer cel offset, or scope the multi-layer cast off buttons); separately reconcile the missing `solid` Button variant vs the docs.

### GEO-8 [P2] (alignment)
Badge sizes hardcode fixed px line-heights (leading-4/5/6) that don't track the --ui-scale-scaled font-size or glyph, so at coarse-pointer scale the content overflows the line-box and the glyph/text misalign.
- evidence: src/components/ui/badge/index.ts:56-58 `sm:leading-4 px-2 py-0.5 / md:leading-5 / lg:leading-6` with `text-[length:var(--control-text-sm|--control-text)]`; those tokens scale (src/styles/tokens/sizing.css:85-86 `--control-text: calc(--type-small * --ui-scale)`). LIVE probe (:root): controlText=16.58px, controlTextSm=14.54px, uiGlyphSm=14px, uiGlyph=16px. md badge = 16.58px font + 14px glyph in a FIXED 20px (leading-5) box; the glyph (14) is smaller than the text (16.58) → slight vertical drift at rest, and at --ui-scale 1.5 (coarse) the font (~21.8px) overflows the fixed 16px sm line-box entir …[trunc]
- disposition: refine BG.W-BADGE-LEADING — replace fixed leading-4/5/6 with a relative/scaled line-height (or leading-none + explicit padding) so the box tracks --ui-scale. Confirming probe: emulate coarse pointer / set --ui-scale:1.5 and measure glyph-center vs text-cap-center delta on a .badge-atom with an svg.

### GEO-9 [P2] (radius-grammar)
Configurator inner sections are deliberately unrounded with inconsistent horizontal indent between the sheet chrome and the section rows — the 'inner sections unrounded + arbitrarily indented' the user rejects.
- evidence: Inner sections carry no radius by design: src/components/custom/configurator/ConfiguratorLayer.vue:92 'No per-section radius: rounding is owned at the container root clip'. Indent mismatch inside the gear sheet: demo/configurator/PresetEditor.vue:165 SheetHeader `px-6 pt-6 pb-4` and :384 footer `px-6 py-4` (24px) vs the ConfiguratorLayer section trigger at px-3 py-2 (ConfiguratorLayer.vue:118, 12px) and ConfiguratorRow `py-2` with no matching px — so the section content indents 12px while the sheet header/footer sit at 24px. The Configurator root itself IS rounded (Configurator.vue:154 rounded …[trunc]
- disposition: build BG.W-CONFIG-SECTION-GEO — reconcile the section-vs-chrome inline padding onto one --configurator-pad-inline anchor, and (if the user wants card-like sections) give inner sections a rounded card rung inside the clip rather than flush border-b dividers.


---
## Severity counts

- P0: 5
- P1: 38
- P2: 48
- P3: 17

## Family index (cross-lens convergence)

- **radius-grammar** (8): ::UF-A2 [P1]; ::UF-A3 [P1]; ::UF-A4 [P1]; ::GEO-1 [P1]; ::GEO-3 [P1]; ::GEO-5 [P2]; ::GEO-6 [P3]; ::GEO-9 [P2]
- **vacuous-gate** (7): ::CENSUS-1 [P1]; ::RECAP-2 [P1]; ::RECAP-3 [P2]; ::GATE-1 [P1]; ::MOTION-1 [P1]; ::OFIT-1 [P1]; ::GEO-2 [P1]
- **register-grammar** (3): ::MOTION-2 [P1]; ::MOTION-4 [P2]; ::MOTION-6 [P2]
- **stale-census** (3): ::STRUCT-3 [P1]; ::STRUCT-6 [P1]; ::STRUCT-7 [P1]
- **greenfield-dupe** (3): ::STRUCT-4 [P1]; ::STRUCT-5 [P1]; ::STRUCT-11 [P2]
- **orphan-gate** (3): ::STRUCT-9 [P2]; ::STRUCT-10 [P2]; ::STRUCT-12 [P2]
- **ratchet-regrowth** (2): ::GATE-1 [P1]; ::GATE-3 [P1]
- **glass-taxonomy** (2): ::UF-B2 [P2]; ::UF-B1 [P2]
- **meta-chassis** (2): ::UF-F2 [P2]; ::UF-F3 [P2]
- **stale-comment** (2): ::DRIFT-2 [P3]; ::META-5 [P3]
- **rendered-meta-leak** (2): ::META-2 [P1]; ::META-3 [P2]
- **dual-path** (2): ::MOTION-3 [P2]; ::GEO-4 [P1]
- **sequencing** (2): ::STRUCT-1 [P0]; ::STRUCT-13 [P2]
- **scope-gap** (2): ::STRUCT-8 [P1]; ::STRUCT-14 [P3]
- **booked-not-landed** (2): ::OFIT-2 [P1]; ::OFIT-3 [P2]
- **demo-overfit** (2): ::OFIT-5 [P2]; ::OFIT-6 [P3]
- **deferred-paint-unenforced** (1): ::GATE-1 [P1]
- **green-over-broken-disclosed** (1): ::GATE-5 [P2]
- **tag-audit-note-drift** (1): ::GATE-2 [P2]
- **vacuous-owner-gate** (1): ::GATE-3 [P2]
- **hand-listed-roster** (1): ::GATE-4 [P3]
- **demo-collision** (1): ::GATE-2 [P1]
- **cut-not-ready** (1): ::GATE-4 [P2]
- **absent-family-gate** (1): ::GATE-5 [P3]
- **vacuous-paint-instrument** (1): ::GATE-6 [P3]
- **drag-reattach** (1): ::UF-H2 [P1]
- **border-image-square** (1): ::UF-A7 [P1]
- **cartoon-cast** (1): ::UF-A8 [P1]
- **dead-demo-control** (1): ::UF-J2 [P1]
- **shortcut-single-winner** (1): ::UF-J5 [P1]
- **dock-paint-clip** (1): ::UF-C6 [P1]
- **drawer-per-frame** (1): ::UF-G7 [P1]
- **viz-gpu-budget** (1): ::UF-E7 [P1]
- **scroll-ring-config** (1): ::UF-D1 [P2]
- **dock-morph** (1): ::UF-C5 [P2]
- **viz-prune** (1): ::UF-E8 [P2]
- **static-preview** (1): ::UF-F1 [P2]
- **accordion-press** (1): ::UF-G5 [P2]
- **badge-baseline** (1): ::UF-A6 [P2]
- **command-jitter** (1): ::UF-G8 [P3]
- **dead-code** (1): ::CENSUS-2 [P2]
- **dead-substrate** (1): ::CENSUS-3 [P2]
- **dead-export** (1): ::CENSUS-4 [P3]
- **duplicate-system** (1): ::CENSUS-5 [P3]
- **green-over-broken** (1): ::RECAP-1 [P1]
- **scope-narrowing** (1): ::RECAP-4 [P3]
- **phantom-successor** (1): ::GATE-2 [P2]
- **stale-ledger** (1): ::LEDGER-1 [P2]
- **dual-book** (1): ::LEDGER-2 [P2]
- **detector-blind-spot** (1): ::DETECTOR-1 [P2]
- **doc-drift** (1): ::DRIFT-1 [P3]
- **fullscreen-sdf-over-n** (1): ::PERF-1 [P0]
- **heavy-viz-as-page-bg** (1): ::PERF-2 [P0]
- **oversized-canvas** (1): ::PERF-3 [P0]
- **per-frame-backdrop-reblur** (1): ::PERF-4 [P1]
- **multi-gl-context** (1): ::PERF-5 [P1]
- **gpu-readback-stall** (1): ::PERF-6 [P1]
- **dpr-over-provision** (1): ::PERF-7 [P2]
- **static-loop-bound-no-lod** (1): ::PERF-8 [P2]
- **gl-context-leak** (1): ::PERF-9 [P2]
- **layout-read-in-gesture** (1): ::PERF-10 [P2]
- **library-data-render-leak** (1): ::META-1 [P1]
- **code-block-highlight** (1): ::CODE-1 [P2]
- **code-block-adoption** (1): ::CODE-2 [P2]
- **source-comment-meta** (1): ::META-4 [P2]
- **oversizing-verified-clean** (1): ::SIZE-CLEAN [P3]
- **chassis-adoption-verified-clean** (1): ::CHASSIS-CLEAN [P3]
- **landing-bento-verified** (1): ::BENTO-INFO [P3]
- **dead-recipe** (1): ::MOTION-5 [P2]
- **reflow-guard** (1): ::MOTION-7 [P2]
- **semver-breach** (1): ::STRUCT-2 [P0]
- **overfit-single-consumer** (1): ::OFIT-4 [P2]
- **triplication** (1): ::OFIT-7 [P2]
- **counter-finding** (1): ::OFIT-8 [P3]
- **consumer-migration-owed** (1): ::OFIT-9 [P2]
- **shadow-geometry** (1): ::GEO-7 [P2]
- **alignment** (1): ::GEO-8 [P2]

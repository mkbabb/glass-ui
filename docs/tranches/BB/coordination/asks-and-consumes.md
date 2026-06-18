# BB — cross-repo asks-and-consumes (the by-name ASK + CONSUME ledger)

The single durable record of every cross-repo ASK glass-ui RECEIVED and every CONSUME glass-ui OWES/BOOKED across the BB tranche, with each ask's disposition (BUILT / BOOKED / NO-OP / SATISFIED), the in-repo wave that landed it, and the consume cadence. This is the FORMALIZATION of the speedtest AW v3 relay triage recorded in `cross-repo-inbound.md §5` plus the BB-AMENDMENT §A3 by-name asks plus the reciprocated keyframes.js/value.js handshakes — factored into ONE coordination surface so a reader of any consuming wave finds the cross-repo contract HERE, and the no-silent-drop law (an ask that loses its disposition or its consumer reds the gate) is machine-locked by `proof:crossrepo-asks`.

The communication is **content-only** (inv-26 — the foreign-tree fence): this doc + the gate are glass-ui-side artefacts ONLY. It reads the value.js/keyframes.js/speedtest/slides siblings at THEIR HEADs as AUTHORITY (versions, published export names, the sibling response docs) but edits NEITHER tree. The fence is bidirectional and already reciprocated — kf authored its mirror response (`../keyframes.js/docs/tranches/K/KF-TO-GLASSUI-BB-ASKS.md`), value.js carries the spectrum-helper + grammar fold (`../value.js/docs/tranches/N/WAVES-2.md`), speedtest authored its ask-brief (`../speedtest/docs/tranches/AW/coordination/glass-ui-BB-ask-brief.md`) + its AW v3 relay; this doc RECONCILES the glass-ui asks against those responses (the green handshake), it does not re-issue them.

## Freshness header (AZ-form — the relay is only as fresh as the sibling state it records)

| field | value |
|---|---|
| capture date | 2026-06-17 |
| glass-ui HEAD sha | `83f2a488` (branch `tranche/BB`); version `4.0.0` (the BB cut targets `4.1.0`) |
| value.js sibling | `0.13.0` (the W-SPINE-LATEST IDENTITY peer; `0.12.0` at the BB-amendment authoring → minted `0.13.0` mid-tranche, the OKLCH/shorter-hue `sampleColorRamp` + the VJ grammar fold land here — re-located per the §0 drift discipline) |
| keyframes.js sibling | `4.2.0`→`4.3.0` (the W-SPINE-LATEST dev pin; `springTimingFunction` published LIGHT value.js-free; the KF-OSCILLATOR BOOKED kf-owned) |
| speedtest sibling | AW v2.1 → hardened to AW v3 (the 2026-06-17 relay, triaged in `cross-repo-inbound.md §5`); bumps `^4.1.0` at AW.W7 |
| slides sibling | Tranche N (driven by W-SLIDES-DRIVE; H-BA cleared, N.W-DEPLOY waits on the user's re-publish greenlight) |
| sibling presence | the siblings are ABSENT in this clean siblings-absent checkout; the sibling state recorded here is the AUTHORITY captured in `cross-repo-inbound.md §1` (read at HEAD 2026-06-16) + the §5 AW v3 triage (2026-06-17), the live sibling state at the last cross-repo read. A re-run with the siblings present re-greps the live HEADs + re-records any drift (the no-silent-drop law). |

### §0 drift recorded (re-grounded at HEAD this authoring)

- The relay doc lands at `docs/tranches/BB/coordination/asks-and-consumes.md` (BESIDE the existing `cross-repo-inbound.md`), NOT the BB.W-CROSSREPO-ASKS.md spec's `audit/crossrepo/` path — the orchestrator directed the coordination dir, which co-locates the relay with its inbound twin (the §5 source). The gate reads the coordination path.
- value.js minted `0.13.0` mid-tranche (the W-SPINE-LATEST keystone hub edit collapsed the value cap to the `^0.13.0 || ^1.0.0` IDENTITY); the BB-AMENDMENT §A3 cited `0.12.0` → re-located to `0.13.0` (the helper + grammar fold ship here, as the amendment predicted).
- W-PEER-SPINE FOLDED into W-SPINE-LATEST (Batch C, pre-Batch-0) — the narrow `^0.12.0 || ^0.13.0` widen is SUPERSEDED by the clean-break `^0.13.0` IDENTITY + the kf union collapse. Ask #4 (the peer widen) re-points its consumer to W-SPINE-LATEST (the keystone that executed it), with W-PEER-SPINE the back-pointer.
- W-EASING-PRIMITIVE landed `complete` (the boundary law made code; the kf `Oscillator` `loop` seam BOOKED). Ask #6's `loop`-seam consumer is built; ask #7's boundary law is mutually affirmed + recorded in the shipped primitive.
- kf is now a 4TH live CONSUMER of glass-ui (it adopted `~4.0.0` for the dock cure, re-pins `4.1.0` at the BB close) — folded into W-LINEAGE-PROBE (the registry-probe sees it) + W-DOCK-MORPH-FAMILY (kf is the named 2nd consumer, ≥2 by construction with speedtest).

## §1 — The ASK ledger (every by-name ask glass-ui RECEIVED / RELAYED)

Each row: the id, the WHAT, the target tree, the sibling DISPOSITION (with the response file:line), the glass-ui CONSUMER wave (exists in `docs/tranches/BB/waves/`), and the cadence. The §A3/§A4 by-name asks + the §5 AW v3 confirms + the green handshakes.

### The §A3 / §A4 core asks (value.js · keyframes.js · speedtest)

| # | ask | target | disposition (sibling response) | consumer wave | cadence |
|---|---|---|---|---|---|
| 1 | the **OKLCH/shorter-hue spectrum helper** (`sampleColorRamp(from,to,n,{space,hueMethod})` — no chroma trough) belongs in the value.js color core | value.js | **SHIPS at 0.13.0** (`WAVES-2.md:43-44`, N.W11.D); the `shorter`-hue substrate (`interpolateHue`/`mix.ts` `hueMethod`) already shipped at 0.12.0 | **W-BORDER-PROGRESS** — the conic-ring fill walks the brand ramp via the glass-ui-LOCAL interim on the `/color` leaf's `deriveHue`→value.js `interpolateHue("shorter")`; the consume-and-delete re-points onto `sampleColorRamp` when 0.13.0 resolves | glass-ui-local interim NOW → re-point at value.js 0.13.0 (consume-and-delete trigger: "value.js publishes 0.13.0", resolved through the W-SPINE-LATEST peer) |
| 2 | **pin glass-ui** `4.0.0` (now) → **`4.1.0`** (the BB cut) | value.js | the pin cadence recorded (BA cut → re-pin 4.1.0 for the BB primitives); value.js's own consume, recorded not built here | value.js's consume (recorded) — glass-ui ships the cut; value.js re-pins | value.js re-pins `4.1.0` at the BB cut |
| 3 | the **VJ grammar** (scroll-timeline + perceptual ramp) lands **0.13.0** | value.js | N.W11′ (scroll) + N.W11.D (ramp) → 0.13.0 (`WAVES-2.md`) | value.js's consume (recorded) — glass-ui does NOT consume the scroll grammar at HEAD (the perceptual-ramp leg is ask #1's substrate, consumed by W-BORDER-PROGRESS) | value.js 0.13.0 |
| 4 | the value.js peer admits **`^0.12.0 \|\| ^0.13.0`** (closes F-2) | glass-ui | EXECUTED at **W-SPINE-LATEST** (Batch C) — the clean-break `^0.13.0 \|\| ^1.0.0` IDENTITY SUPERSEDES the narrow widen; the dual-install FIX (single value@0.13.0 tree) landed; W-PEER-SPINE is the folded back-pointer | **W-SPINE-LATEST** (was W-PEER-SPINE → FOLDED) | shipped at the keystone hub edit (pre-Batch-0); rides the 4.1.0 cut |
| 5 | confirm the **`springTimingFunction`** (W-DECK's `--spring-deck` consumes it) | keyframes.js | **✅ SATISFIED** — a LIGHT value.js-free named export (`../keyframes.js/src/animation/index.ts:42`); `css` is a `linear()` stops string ready for a CSS custom property (`KF-TO-GLASSUI-BB-ASKS.md:13`) | **W-DECK** — `--spring-deck = springTimingFunction(DECK_SPRING).css`; the token half (`--spring-deck = var(--spring-smooth)`) resolves at first paint regardless | consume the SHIPPED export NOW (no kf change) |
| 6 | the **KF-OSCILLATOR** shared-oscillator phase (the speedtest idle-breath) | keyframes.js | **🟡 BOOKED (kf-owned)** — a LIGHT `Oscillator`/phase-clock (periodic phase ∈[0,1) + frequency + optional waveform), value.js-free, timed to the speedtest/W-EASING co-schedule; NOT blocking the 4.1.0 cut (`KF-TO-GLASSUI-BB-ASKS.md:14`) | **W-EASING-PRIMITIVE** (complete) — the picker's `loop` playback seam the kf `Oscillator` slots into; the default playback is the one-shot rAF that ships at 4.1.0 | kf delivers when consumed; the picker's default rAF ships at 4.1.0; the `loop` seam is the named-successor consume (trigger: "kf ships the Oscillator") |
| 7 | the **boundary law** (curve MATH = value.js · playback/spring = kf · the editor COMPONENT = glass-ui) | keyframes.js | **✅ AFFIRMED** (`KF-TO-GLASSUI-BB-ASKS.md:15,47-48`) — kf owns `springTimingFunction`/`springLinearStops`/`SpringProgress`/`RAFPlayback`; does not encroach on the curve-math or editor halves | **W-EASING-PRIMITIVE** (complete) — the recorded fence, made code (curve MATH composed from value.js, spring from kf, the editor is glass-ui) | a standing fence, mutually affirmed + recorded in the shipped primitive |
| 8 | speedtest bumps its `^` pin to **`^4.1.0`** at **AW.W7** (R-CONSUME) | speedtest | the consume model — speedtest builds NONE (inv-16); bumps + typechecks against the PUBLISHED surface; deletes its named-YELLOW consume-and-delete interims as each ask ships (`glass-ui-BB-ask-brief.md:6-9`) | the PRIMITIVES band (every P0/P1 primitive) — recorded; speedtest's consume rides its own tree | speedtest pins `^4.1.0` at AW.W7 (one bump, the "parked-on-BB" posture collapses) |

### The kf inbound confirms (the §1 cross-repo-inbound responses — folded)

| # | item | disposition | consumer wave |
|---|---|---|---|
| 9 | **kf is now a CONSUMER of glass-ui** (joins slides + value.js + speedtest on the cadence) | CONFIRMED — kf adopted glass-ui `~4.0.0` NOW (the 2026-06-16 dock cure; the SAME 3.13.0 dock defects BA 4.0.0 already cured), re-pins `4.1.0` at the BB close | **W-LINEAGE-PROBE** (ADD kf to the consumer constellation — the registry-probe must see it) |
| 10 | **kf consumes W-DOCK-MORPH-FAMILY at 4.1.0** (the further dock repair: compositor-transform, settled-reveal, PRM synchronous seat, DockLayerGroup self-reserve) | CONFIRMED — a SECOND named consumer (with speedtest) → the ≥2 visual-load-bearing bar is by-construction | **W-DOCK-MORPH-FAMILY** (add kf as the named 2nd consumer) |
| 11 | the peer-spine admits kf 4.x | CONFIRMED — kf is at 4.2.0/4.3.0; glass-ui declares `keyframes.js: ^4.0.0` (the W-SPINE-LATEST union collapse `^2\|\|^3\|\|^4`→`^4`); the kf re-pin carries no peer warning | **W-SPINE-LATEST** (the `^4` floor holds across the bump) |

## §2 — The speedtest AW v3 relay intake (the §5 triage, FORMALIZED)

The speedtest AW v3 session (2026-06-17) relayed its hardened 17-item set to the live BB tranche. inv-16: speedtest authored the CONTENT; BB CONSUMES it here (no speedtest/kf/vjs tree edits). Reconciled against BB HEAD — most of the AW thesis-core ALREADY LANDED, so the intake is small. Each item carries a TERMINAL disposition (the no-silent-drop law: an item with no disposition reds the gate).

### Amends / withdrawals (A)

| id | what | disposition | landed at / consumer |
|---|---|---|---|
| A1 | `BorderProgress` thickness envelope **6-8px → 10-14px** | **ACTIONED (P0, time-critical)** — amended in `waves/BB.W-BORDER-PROGRESS.md` (the gate-summary line 6, the §Scope thickness bullet :85 with provenance, the W4 :116, the π :119) BEFORE the SPEC wave runs, so the born-RED gate W4 + π lock the THICKER band; the spectrum + coverage axes UNCHANGED | **W-BORDER-PROGRESS** (the spec amend; the build rides the 4.1.0 cut) |
| A2 | publish a `--ease-expo-out` token | **WITHDRAWN (stale)** — moot: W-MOTION-CANON (complete) deliberately did NOT mint it; the SOTA arrival ease ALREADY ships as `--ease-out-expo` (`scheme-motion.css`, `cubic-bezier(0.16,1,0.3,1)`); a second alias would RED `proof:animation-coherence`'s EASING-TABLE no-alias clause; speedtest CONSUMES the existing name (→ C4) | **NO-OP** (no BB edit; speedtest binds the existing token) |
| A3 | the `sdf-core.wgsl` importable-SDF boundary note | **ACTIONED (P2, Batch-V prep)** — added to the W-GOOBLOB-WGPU entry in `BB-AMENDMENT-viz.md:45`; `metaball.wgsl` imports the SDF from `sdf-core.wgsl` so the later DotBlob (B6) imports it too (the `procedural-color.wgsl.ts` shared-chunk precedent); ΔE parity unchanged | **W-GOOBLOB-WGPU** (the spec note; lands when the wave runs — Batch V) |

### Confirms (C) — resolved against the landed waves

| id | what | disposition | landed at |
|---|---|---|---|
| C1 | `--phase-complete-color` is the celebration seam | **CONFIRMED** — W-PHASE-PALETTE (complete): the InstrumentChassis reads the token (8 references in `instrument-chassis.css`), no baked gold; speedtest's `CompleteHeadline` reads it | **W-PHASE-PALETTE** |
| C2 | `vSpecular` exported on `/glass` + arms non-dock glass tiers | **CONFIRMED** — W-LIQUIDHOVER (complete; 3 references in `composables/glass/index.ts`) arms Button glass variants + gated Card; W-LENSING added `useSpecularPointer` (the angle channel) on the same core; a non-dock glass-tier surface arms by adding `v-specular` | **W-LIQUIDHOVER** / **W-LENSING** |
| C3 | `curlFBM` shared FBM/curl GLSL chunk | **FORWARD (Batch V)** — does NOT exist at HEAD; the shared chunk lands with the procedural waves (W-AURORA-WGPU establishes the WGSL chunk; the `.frag` `curlFBM` home + the ≥3-consumer bar are satisfied when B1 + B5 + the flowfield consume it); recorded as a Batch-V intake, not yet confirmable | **W-AURORA-WGPU** + procedural waves (Batch V) |
| C4 | `--ease-out-expo` is the published name | **CONFIRMED** — W-MOTION-CANON (complete); speedtest binds it; no alias minted (= A2) | **W-MOTION-CANON** |

### New asks (B) — placed at their loci + sequenced

The no-WebGPU B-asks ride the ONE 4.1.0 cut (B1's `.frag` arm, B2, B3, B4-EARLY so the born-WebGPU viz consume it at birth, B7, B8); the procedural tail (B1's WGSL arm, B5, B6 + A3) sequences AFTER the strict WebGPU viz chain (W-GPU-SUBSTRATE → W-AURORA-WGPU → W-GOOBLOB-WGPU → W-FLOWFIELD → W-CONCENTRIC). B9 is conditional. None blocks the cut.

| id | ask | placement / consumer | prio | disposition |
|---|---|---|---|---|
| B1 | aurora-curl-warp (`warpMode:'curl'`, Bridson) | follow-on to W-AURORA-WGPU; `.frag` arm on the 4.1.0 cut, WGSL arm after the viz chain; shared `curlFBM` | P1 | **BOOKED (split-arm)** |
| B2 | dockmorph-cta-receive | W-DOCK-MORPH-FAMILY (complete) — confirm-or-build the external-CTA-morphs-into-dock seam (compositor-flat, PRM-seats) | P1 | **BOOKED (in-repo, 4.1.0)** |
| B3 | desktop-reserve `min-block-size` | NEW in-repo wave — wide-axis chassis reserve, desktop dial, CLS≈0; deletes the speedtest App.vue interim | P1 | **BOOKED (in-repo, 4.1.0)** |
| B4 | viz-pointer-physics `usePointerVelocityField` | NEW in-repo, EARLY (pre-W-GPU-SUBSTRATE so the born-WebGPU viz consume it) — shared composable, no own rAF, PRM `tick(0)`, accel term | P1 | **BOOKED (in-repo, 4.1.0, early)** |
| B5 | paper-grid-breathe (`<Card grid animated>`) | after W-FLOWFIELD — ¼-res compute ≤4ms, PRM-static, `curlFBM`-shared | P2 | **BOOKED (procedural tail)** |
| B6 | DotBlob 6th suite member | after W-FLOWFIELD (W-DOTBLOB) — imports A3's `sdf-core.wgsl`; substrate-single A–G + dot-blob gate | P3 | **BOOKED (procedural tail)** |
| B7 | spaview-cache `<SpaView :max>` | NEW in-repo — caches inactive views, out-in; rewires AdminDashboardLayout | P2 | **BOOKED (in-repo, 4.1.0)** |
| B8 | card-tier-alpha-pin | NEW in-repo — per-tier alpha canonical; speedtest register.css overrides delete on consume | P2 | **BOOKED (in-repo, 4.1.0)** |
| B9 | spring-crisp `--spring-crisp` | NEW in-repo, CONDITIONAL — mint IFF the ≥2-consumer bar is met (5+ speedtest sites named); else consumers ride `--spring-snappy` | P2 | **BOOKED (in-repo, 4.1.0, conditional)** |

## §3 — The dep graph (the §A4 graph, transcribed + reconciled against the live versions)

```
value.js N (0.13.0)  ──OKLCH spectrum helper (sampleColorRamp)──►  glass-ui W-BORDER-PROGRESS  [interim NOW → re-point at 0.13.0]
keyframes.js K (4.3.0) ──springTimingFunction (LIGHT, published)──►  glass-ui W-DECK (--spring-deck)  [✅ SATISFIED, consume NOW]
                       ──KF-OSCILLATOR (LIGHT, booked)──────────►  glass-ui W-EASING-PRIMITIVE (loop seam) / speedtest idle-breath  [🟡 BOOKED kf-owned]
slides N src/deck/   ──donor (lift)──────────────────────────►  glass-ui W-DECK (/deck) ──consume-back──► slides N phase-2
glass-ui 4.0.0 (BA)  ──dock cure / register fixes──────────────►  kf K.W1′ adopt NOW · slides N.W-ADOPT · value.js pin
glass-ui 4.1.0 (BB)  ──the primitives + W-DOCK-MORPH-FAMILY──────►  speedtest AW.W7 (^4.1.0) · kf re-pin · slides re-pin · value.js re-pin
```

Everyone consumes the PUBLISHED predecessor; no cycle (the constellation acyclic-spine discipline). The version cut + the npm re-pins stay USER-DOMAIN (confirm-first) per the constellation publish discipline.

## §4 — The consume cadence (the user's fold-all decision)

glass-ui ships the primitives at the single **4.1.0** cut (the BB close — no interim 4.0.1). The per-ask consume-and-delete TRIGGER (the deletion event for each interim):

- **Ask #1 (the spectrum helper)** — the glass-ui-local `spectrumStops` interim on the `/color` leaf DELETES onto value.js's `sampleColorRamp` when **value.js publishes 0.13.0** (resolved through the W-SPINE-LATEST `^0.13.0` peer; the consume-and-delete is W-BORDER-PROGRESS's, the cadence is recorded here).
- **Ask #5 (springTimingFunction)** — consumable NOW (W-DECK binds the SHIPPED export; no interim, no deletion — the ✅ handshake).
- **Ask #6 (KF-OSCILLATOR)** — the picker's default one-shot rAF ships at 4.1.0; the `loop` seam consumes the kf `Oscillator` when **kf ships it** (the named-successor consume, NOT a blocking dep).
- **Ask #8 (speedtest pin)** — speedtest pins `^4.1.0` at AW.W7 and DELETES its named-YELLOW consume-and-delete interims (the `?aurora=css` interim, the App.vue desktop-reserve interim, the register.css alpha overrides) as each ask ships.
- **The B-asks** — the no-WebGPU set rides the 4.1.0 cut; the procedural tail rides a later `^4.x` after the WebGPU viz chain (Batch V). The "parked-on-BB" posture collapses on the single `^4.1.0` bump at AW.W7.

## §5 — The green-handshake record (the reciprocated fence)

At this authoring all lanes are green-handshake (both sides agree):

- **value.js** — the spectrum helper + the VJ grammar fold land at 0.13.0 (`WAVES-2.md:43-44`); the W-SPINE-LATEST keystone widened the glass-ui peer to the `^0.13.0` IDENTITY, so the helper consume resolves through the registry the moment value.js ships 0.13.0. GREEN.
- **keyframes.js** — kf authored its mirror response (`KF-TO-GLASSUI-BB-ASKS.md`): `springTimingFunction` ✅ SATISFIED (published LIGHT), the KF-OSCILLATOR 🟡 BOOKED (kf-owned, non-blocking), the boundary law ✅ AFFIRMED; kf is now a glass-ui CONSUMER (the dock cure) + the named 2nd W-DOCK-MORPH-FAMILY consumer. GREEN.
- **speedtest** — the AW v2.1 ask-brief + the AW v3 relay (`cross-repo-inbound.md §5`) are triaged: A1 ACTIONED, A2 WITHDRAWN, A3 ACTIONED; C1/C2/C4 CONFIRMED-landed, C3 FORWARD (Batch V); B1-B9 placed/sequenced; the consume model (build NONE, bump `^4.1.0` at AW.W7) is recorded. GREEN.

**The mismatch-flagging discipline (for re-runs):** a handshake is RECORDED where both sides agree (the green case above); a MISMATCH — a glass-ui ask the sibling has not dispositioned, OR a sibling disposition that contradicts a consumer wave's assumption (e.g. value.js ships the helper under a DIFFERENT signature than `sampleColorRamp`, OR kf's `springTimingFunction.css` is not the `linear()` form W-DECK needs) — is FLAGGED here + booked to the owning consumer wave, NEVER silently reconciled (the no-silent-drop law). The relay records the TRUE sibling state; the owning wave fixes its consume path. At this authoring there is no mismatch.

## §6 — The content-only fence (inv-26, proven by construction)

This wave's File Bounds touch ZERO file under `../value.js`/`../keyframes.js`/`../speedtest`/`../slides` — the cross-repo communication is content-only. The asks are a relay DOC (this file) + a glass-ui gate (`scripts/proof-crossrepo-asks.mjs`); the edit a sibling owes is the sibling's OWN (the by-name ask is the only channel). `proof:crossrepo-asks` W4 machine-locks the fence: every path in this wave's declared bound is UNDER the glass-ui tree (no `../` sibling path), so a future cross-repo wave that "just edits the value.js helper directly" would write a `../value.js/...` path the gate reds.

## §7 — Bidirectional cross-reference (the consumer waves point back)

Every consumer wave named here exists in `docs/tranches/BB/waves/` and names its ask + its consume-and-delete marker (the §0 re-grep confirmed): W-BORDER-PROGRESS (the value.js spectrum), W-DECK (the kf spring), W-EASING-PRIMITIVE (the kf oscillator co-schedule + the boundary law), W-SPINE-LATEST (the value peer widen, was W-PEER-SPINE), W-LINEAGE-PROBE (kf-as-consumer), W-DOCK-MORPH-FAMILY (the kf 2nd-consumer). A consumer wave that consumes a cross-repo ask WITHOUT a named consume-contract here is a no-silent-drop violation `proof:crossrepo-asks` catches. This doc is the INDEX; it does not edit a consumer wave's source/spec.

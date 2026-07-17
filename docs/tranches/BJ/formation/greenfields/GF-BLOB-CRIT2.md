# GF-BLOB — CRITIQUE 2 (fresh Fable critic over GF-BLOB-PASS1)

Mode: TRANCHE-DEVELOPMENT. No source touched, no browser. Every claim below is file:line at HEAD
(`codex/bi-p-q-execution`) or in the value.js archaeology (READ-ONLY). Default assumption: the spec
is wrong until the disk agrees. The two load-bearing tests the prompt set —
*(a) did pass-1 actually FIND the old value.js blob, or is the archaeology empty/vague (a BLOCKED
route, not a convergence)?* and *(b) does the emotional-state + interactivity contract carry
concrete mechanics (springs, counts, shader terms) or adjectives?* — are answered first, because
they move the score.

---

## 0. Verdict on the two central tests

**Test (a) — the archaeology is REAL, precise, and byte-exact. This is the strongest fact in the
document.** Unlike the aurora seat (whose central cost-claim cracked on disk), GF-BLOB's foundation
holds under audit:

- `06929a4b` is a genuine commit: *"feat(goo-blob): WebGL2 metaball component with affective state
  FSM."* `e32111c7` is genuine (the glass-ui fork). Both `git cat-file -t` → `commit`.
- The OLD `useBlobMood.ts` (`06929a4b:demo/@/components/custom/goo-blob/composables/useBlobMood.ts`,
  read in full) carries `MOOD_TARGETS` with the EXACT values pass-1 cites: excited
  `orbitSpeedScale 2.2 / wobbleScale 2.0 / pulseAmp 0.05` (verbatim), curious `pointerAttraction
  0.6`, sleepy `pointerAttraction -0.2`. Not paraphrased — identical.
- The OLD `metaball.frag.glsl` (`06929a4b:…/shaders/metaball.frag.glsl`) carries the claimed
  primitives: `rgb2hsv`/`hsv2rgb` HSV perturb (`:82,91,136-149`) and the pointer UV-deform toward/
  away (`:101-106`, `uPointerAttraction`). Verified.
- `blob-genesis.md` (26.6 KB) and `design-blob-atmosphere-vision.md` (17.6 KB) exist; every cited
  claim resolves: "WebGL2 single-pass 2D-SDF is the PERMANENT floor. WebGPU is NOT warranted"
  (`blob-genesis.md:111`), `BG.W-VIZ-SUBSTRATE-DELETE2` WGPU delete order + Safari dual-surface P0
  (`:122-125`), the `<7%` always-on GPU budget (`:330`), era-2/era-3 losses (`:158-159`), and the
  design-vision "register bridge that makes the blob belong to the plate … ~4 px SE, near-black
  ink" (`design-blob-atmosphere-vision.md:157-159`).

The archaeology test PASSES decisively. Do not re-litigate §1-§2's diagnosis; it is disk-accurate.

**Test (b) — the contract is MECHANICS, not adjectives, with ONE load-bearing exception.** The
mood table (§4.3) carries real numbers (valence/arousal points, orbit 2.2, wobble 2.0,
pointerAttraction 0.6/-0.2, `IDLE_SLEEP_MS` 6 s, excited-hold ~0.9 s), the four new primitives are
named and scoped (one GLSL sweep term, `useBlobTopology`, a CSS stamp, a CPU SDF `hitTest(x,y)`),
and each gate names a RED-at-HEAD file:line. This is a genuinely concrete spec. **But its single
sharpest mechanical claim — that the mood amplitude is FLATTENED and must be "restored to the
`06929a4b` bold envelope" — is largely FALSE on disk (Finding 1), and the self-critique's "gates
that cannot fail" audit did not catch it.** Same failure structure as the aurora seat: a
falsifiable, load-bearing claim that the seat's own gap-list missed.

---

## 1. On-disk verification ledger

| doc claim | evidence | verdict |
|---|---|---|
| OLD value.js blob exists at `06929a4b` w/ affective FSM | `git cat-file`; `useBlobMood.ts` @ `06929a4b` read in full | **TRUE** |
| old excited = `orbit 2.2 / wobble 2.0 / pulseAmp 0.05` | `MOOD_TARGETS.excited` @ `06929a4b` | **TRUE (verbatim)** |
| old curious `pointerAttraction 0.6`, sleepy `-0.2` | same file | **TRUE (verbatim)** |
| old shader = HSV perturb + pointer deform | `metaball.frag.glsl:82-149,101-106` @ `06929a4b` | **TRUE** |
| B-SHADOW: gel-dome, offset-stamp reserved for `<Card cartoon>` | `Blob.vue:344-356` ("The Memphis offset-stamp stays the identity of `<Card cartoon>` only") | **TRUE (verbatim rationale)** |
| B-LIGHT: `specStrength 0.16 / iridescence 0.09 / sssScale 0.1 / coreGlow 0.06` | `types.ts:398,403,405,407` | **TRUE** |
| B-EXPRESS: `orbitRadius 0.17 < bodyRadius 0.22`; HERO has `orbit 0.30` | `types.ts:288,300`; `presets.ts:57-58` (`satelliteCount 4, orbitRadius 0.3`) | **TRUE** |
| B-MOOD: pointerAttraction flattened by `(0.7+0.15·arousal)`; irid ceiling `1.8→1.35` | `constants.ts:93,99` (comment says "excited CEILING drops 1.8 → 1.35") | **TRUE of those two terms** |
| B-MOOD/W-MOOD/G-MOOD-AMPLITUDE: excited **orbit/wobble/pulse** are flattened, must be restored | `constants.ts:66-69` `lerp(…,arousal)` × `MOOD_AVA.excited.arousal = 1.0` (`:53`) → **2.2 / 2.0 / 0.05 already** | **FALSE for orbit/wobble/pulse** (Finding 1) |
| morphT is a flat↔dressed SURFACE axis, not a shape machine | `types.ts:270-274` | **TRUE** |
| B-INTERACT: current = "one lean channel", no cursor-avoidance | `types.ts:415-427` has BOTH `pointerAttraction 0.35` AND `pointerStrength 0.1`; comment: "the negative half genuinely shies away" | **PARTLY FALSE** (Finding 5) |
| G-SDF-HITTEST: `clip-path:circle()` eats corner clicks | `Blob.vue:383-394` — clip-path ALREADY makes "a click on the corners / empty margin falls THROUGH" | **PARTLY FALSE** — corner fall-through already works; the real deficit is silhouette precision (Finding 5/6) |
| G-RIM-CAUSTIC: iridescence is uniform fres-weighted, not lower-rim | `metaball.frag.ts:376-396` (`w = fres * uIridescence`, no lower-rim bias) | **TRUE** |
| G-NO-WGPU: WebGPU-first selection | `useMetaballRenderer.ts:92-95` ("WebGPU-first `metaball.wgsl` primary … selected ONCE by `navigator.gpu`") | **TRUE** |
| G-NEVER-FREEZE: rAF parks when settled | `useMetaballRenderer.ts:73-86` (`settled` public seam, single-signal demand gate) | **TRUE — and collides with W-ALIVE** (Finding 3) |
| law 13 = "pill↔orb↔dot-ring on a spring squash" | `IOS27-CODEX.md:58-60` | **TRUE (law text)** |
| MARKS-B Siri morph = pill↔orb↔dot-ring | `MARKS-B.md:101-102,273` say **pill→orb→pill**, dot-ring is "ring of white dots **inside the pill**" | **codex law and raw observation DIVERGE** (Finding 2) |

Net: §1-§2's deficit diagnosis is disk-accurate for five of the six deficits and for the material/
shadow/show/rim/wgpu gates. The one place a load-bearing fact is mis-drawn is the **mood-amplitude**
deficit (B-MOOD generalized into W-MOOD / G-MOOD-AMPLITUDE), and the one place the two authorities
are not reconciled is the **topology** map (β).

---

## 2. Findings (ranked)

### F1 — [load-bearing] The "restore the `06929a4b` bold envelope" mood claim is largely a NON-deficit; G-MOOD-AMPLITUDE is born-GREEN for orbit/wobble/pulse

The deficit ROW itself (`:44`) is precise: it attributes the flattening ONLY to `pointerAttraction
×(0.7+0.15·arousal)` and the `iridescence ceiling 1.8→1.35`. Both true (`constants.ts:93,99`). But
§4.3's excited row and §4.6's gate GENERALIZE that into the motion envelope:

- §4.3 excited: *"restore old bold (`orbit 2.2 / wobble 2.0 / pulseAmp 0.05`)."*
- G-MOOD-AMPLITUDE (`:309-312`): *"the excited mood's **orbit/wobble/pulse** and the curious
  pointer-attraction reach the bold envelope (the `06929a4b` reference targets), **not the flattened
  one**."*

On disk, `MOOD_AVA.excited = {valence 0.7, arousal 1.0}` (`constants.ts:53`), and `paramsFor`
(`:66-69`) is:
```
orbitSpeedScale: lerp(0.4, 2.2, arousal)  → arousal 1.0 → 2.2
wobbleScale:     lerp(0.5, 2.0, arousal)  → 2.0
pulseAmp:        lerp(0.008, 0.05, arousal)→ 0.05
```
The current excited mood ALREADY produces **2.2 / 2.0 / 0.05** — the exact `06929a4b` targets. The
orbit/wobble/pulse clause of G-MOOD-AMPLITUDE **cannot fail at HEAD**; it is born-GREEN. This is the
"gates that cannot fail" trap the self-critique (§6) explicitly claims to have avoided ("each gate
names its RED-at-HEAD condition") — and its gate-audit walks G-NEVER-FREEZE / G-SHOW-VISIBLE /
G-NO-WGPU / G-CHROME and never notices this one.

It is worse than a stray gate, because the framing has a second incoherence: **the OLD value.js blob
had NO lit surface at all.** Its shader (`metaball.frag.glsl @ 06929a4b`) is flat HSV-perturbed goo —
zero specular, Fresnel, iridescence, SSS, or coreGlow. So `iridScale` has NO `06929a4b` referent to
"restore"; the "excited iridescence 1.8→1.35" is a within-glass-ui prior tuning, not a value.js
value. "Restore the bold envelope" therefore conflates two unlike things:
1. **motion params** (orbit/wobble/pulse/pointerAttraction) — have a `06929a4b` referent, and of
   these only `pointerAttraction` (the sign) is genuinely flattened;
2. **lit-surface params** (iridescence/spec/SSS) — are a glass-ui-era ADDITION, law-13-forward, with
   no value.js "bold" to restore.

Consequence: **W-MOOD's real residual work is narrow** — un-flatten / restore the mood-owned
pointer SIGN (curious `+0.6`, sleepy `-0.2` genuine repel) + a taste call on the `iridScale` ceiling
+ the topology target (β). That is a fine wave. But as written it is scoped and gated around a
five-channel "restoration" of which three channels need nothing done. Re-cost it: the deficit is a
POINTER-SIGN + IRID-CEILING re-tune, not a motion-amplitude restoration. Split "restore" (motion
sign) from "author new / raise ceiling" (lit surface, no old referent), and rewrite the gate to
assert only what is actually RED (`pointerAttraction` sign at sleepy; the irid ceiling), so it can
fail.

This does NOT kill α — the pointer-sign flattening IS real (see F5's sleepy math) and the topology
work stands. It kills the "the whole mood punch was flattened" premise and one clause of one gate.

### F2 — [major] law 13 and the raw MARKS-B observation DIVERGE on the topology, and β builds its emotion→topology map on the codex over-reading without reconciling them

The prompt orders judgment against *both* IOS27-CODEX law 13 *and* the MARKS-B Siri observations.
They do not say the same thing:

- **Law 13** (`IOS27-CODEX.md:58-60`): *"morphing **pill↔orb↔dot-ring** on a spring squash."* Three
  topology peers.
- **MARKS-B, the actual frame reading** (`:101-102`): *"V2/f-0019 — Blob **deflating** back toward
  the Dynamic Island, now showing the Siri **listening dot-ring** (ring of white dots) **inside the
  pill**. **pill → orb → pill** morph."* And the synthesis (`:273`): *"morphing **pill ↔ orb ↔
  pill** on a spring squash."*

So in the source, the macro-morph is **pill↔orb↔pill**, and the **dot-ring is a decoration
rendered INSIDE the deflated pill during listening** — not a third macro-topology the blob morphs
INTO. β (§3 Family β, §4.3) instead treats `{pill, orb, dot-ring}` as three co-equal SDF
arrangements and maps **curious → dot-ring (standalone)**, **sleepy → pill (collapse)** — i.e. it
splits into two DIFFERENT macro-states (curious vs sleepy) two things the source shows in the SAME
deflated register (the dot-ring lives *inside* the deflating pill). The codex law is the seat's
warrant, and a seat may follow the codified law over the raw still — but it must SAY it is doing so
and reconcile the divergence, exactly as the aurora seat was faulted for citing round-2b against
round-2b's own remedy.

Pass-1's §6/§7 flags gap 3 as "the emotion→topology map is under-specified … why those pairings" —
but the unresolved thing is not merely *why those pairings*; it is that **the two authorities the
prompt names disagree about whether `dot-ring` is a topology peer at all**, and the map inherits the
more speculative reading. Until reconciled, `π-TOPOLOGY`'s baseline ("prove orb→dot-ring→pill
morphs") is proving fidelity to law 13's letter while diverging from the MARKS-B frame it cites for
authority. Resolve in the DESIGN-ITERATION loop pass-1 already schedules — but name the divergence
as the thing being resolved.

### F3 — [major] W-ALIVE's "never-park while satelliteCount>0" collides with the `settled` public seam and the U3 single-signal discipline it is built on

`useMetaballRenderer.ts:73-86` documents `settled` as a **public, READ-ONLY** seam: `true` IFF mood
settled + pointer at rest + no satellite mid-transition, and — load-bearing — *"Derived from the
SAME predicate the demand gate (`shouldContinue`) reads to decide whether to park — NO parallel
busy-flag (the U3 single-signal discipline)."* A consumer *"parks ITS OWN idle/arming logic only
while `settled` is true, so an armed-but-idle hero never freezes mid-split."*

W-ALIVE (`:284`, §4.4) proposes: *"kill freeze-at-rest for `satelliteCount>0` (never-park)."* This
forces a choice pass-1 does not state, and both horns break something:

- If never-park adds a `satelliteCount>0` condition to the **demand gate** but NOT to `settled`, the
  two signals diverge → the U3 single-signal discipline (the seam's explicit invariant) is broken:
  the gate no longer parks when `settled` is true.
- If it drives BOTH off a new predicate so they stay coupled, then a breathing blob with satellites
  is never `settled` → the consumer arming contract ("park idle logic only while settled") never
  fires → the exact "armed-but-idle hero freezes mid-split" defect the seam was built to close
  re-opens, from the other side.

Pass-1 reckons with the PERF tension (gap 4, π-PERF, the `<7%` budget) and the
offscreen/hidden/PRM park (retained) — but not with this SEAM-SEMANTICS collision. The reconciliation
is not "park invisible, breathe visible"; it is "redefine what `settled` MEANS when a low-energy
breathing rest pose is intentional." That needs a ruling: is a breathing-at-rest blob `settled` or
not, and which predicate owns the answer without splitting into two signals. Add it to W0's
contract-lock, not W-ALIVE's implementation.

### F4 — [moderate] The cartoon-shadow mechanism contradicts the design-vision it cites, and leaves the in-shader `uShadow` unaddressed (two shadow systems)

design-vision §2 (`:157-159`) — pass-1's own cited authority — specifies the cartoon stamp as a
tune of the EXISTING **in-shader** term: *"the `uShadow` procedural shadow exists — tune it to the
cartoon-offset geometry: ~4 px SE, near-black ink."* Pass-1 §4.2-3 / W-SHADOW instead specs a **CSS**
`--blob-shadow-cartoon` `drop-shadow` replacing the gel-dome `drop-shadow` pair. Two consequences:

1. There are TWO shadow systems on disk — the CSS `drop-shadow(ambient) drop-shadow(contact)` pair
   (`Blob.vue:355`) AND the in-shader `uShadow` procedural contact shadow (`constants.ts:241-256`,
   `metaball.frag.ts` contact block). W-SHADOW replaces the CSS one but says nothing about `uShadow`
   — is it left rendering (double shadow), zeroed, or is IT the stamp (per design-vision)? The
   census (§2) lists `uShadow` under SURVIVES but the spec never states its fate.
2. The mechanism choice matters for silhouette-following: the design-vision picked `uShadow` BECAUSE
   an in-shader offset follows the true metaball field including the necking satellites; a CSS
   `drop-shadow` on the canvas alpha also follows the silhouette but the two compose differently at
   the orbit>body geometry W-SHOW promotes. Pick one, cite the reason, and state the other's
   disposition (delete/zero) — no-backwards-compat means one shadow, not a silent pair.

### F5 — [moderate] B-INTERACT's "single lean channel / no avoidance" understates the existing signed mechanism; the genuine hit-test deficit is precision, not corner fall-through

Two mis-locations in the interactivity diagnosis:

- **Cursor-avoidance already has a mechanism.** `interaction` at HEAD carries BOTH `pointerAttraction
  0.35` AND `pointerStrength 0.1` (`types.ts:415-424`), and the comment states *"the negative half
  genuinely shies away (the body shifts away AND the pseudopod retracts, reachFactor 0)."* So the
  signed shy-away channel EXISTS. Why sleepy doesn't repel today is arithmetic, not a missing
  channel: `paramsFor` maps sleepy's valence `-0.1` → `lerp(-0.2, 0.6, -0.1·0.5+0.5=0.45) = 0.16`,
  then `×(0.7+0.15·0.1)=0.715` → `+0.114` — a weak POSITIVE lean. G-CURSOR-AVOID is therefore
  legitimately RED (sleepy leans in, faintly), but it is a valence-mapping RE-TUNE (push sleepy's
  valence below `-0.5` so the map goes negative, or restore the mood-owned sign), NOT the
  "one-channel → two-channel" rebuild B-INTERACT implies.
- **Corner fall-through already works.** `Blob.vue:383-394`: the `clip-path: circle()` hit surface
  is explicitly built so *"a click on the corners / empty margin falls THROUGH to whatever card sits
  beneath."* So π-HITTEST's "corner click falls through" baseline is ALREADY green. The real,
  un-solved deficit (which F6 shows is genuine) is silhouette PRECISION: a disc cannot match a
  multi-satellite silhouette. Re-word G-SDF-HITTEST / π-HITTEST to assert the precision win (a click
  in the disc-but-not-body gap, and a click ON an outboard satellite) — not the corner fall-through,
  which is not RED.

### F6 — [minor, strengthens the spec] The SDF hit-test becomes NECESSARY (not just nicer) the moment W-SHOW promotes orbit 0.30 > body 0.22

Pass-1 treats W-HITTEST as an independent B-INTERACT harvest. It is actually COUPLED to W-SHOW: once
satellites orbit at `0.30` outside `bodyRadius 0.22` (`presets.ts:58` / W-SHOW), a `clip-path:
circle(body)` disc CANNOT cover them — the outboard satellites become un-clickable — while a disc
sized to reach them wrongly eats the empty corners. **No single circle can hit-test an orbit>body
silhouette.** That makes the CPU SDF field-mirror not a nicety but the only correct hit surface for
the promoted geometry. State the W-SHOW→W-HITTEST dependency; it strengthens W-HITTEST's warrant and
should order W-HITTEST at or after W-SHOW.

### F7 — [minor] The `settled`-consuming ecosystem and demo hero are the always-alive blast radius; the "consumer #1" claim needs the seam question answered first

§6 "consumer-less substrate" asserts every primitive has consumer #1. True for the material/shadow
primitives. But the always-alive change's real consumer is the `settled`-reading arming logic (F3)
and any demo/consumer that today relies on the blob quiescing to save the page GPU. Until F3's ruling
lands, "consumer #1 = the demo hero" understates the blast radius — the consumer is *every* reader of
the quiescence seam. Fold into W0.

---

## 3. Route re-scoring

- **α MATERIAL + MOOD REDRESS — LEADING (correct destination, one wave mis-costed).** The
  decomposition (§4.1: material ⊥ shadow ⊥ show-visible ⊥ mood ⊥ alive ⊥ topology) is clean and
  every re-registration is grounded in a landed root verified on disk (surface uniforms
  `types.ts:398-407`; HERO geometry `presets.ts:53-58`; mood surface `constants.ts:64-104`;
  satellite FSM). It stays the leader. The cost surgery: **W-MOOD** is scoped around a motion-
  amplitude restoration that is 3/4 already satisfied (F1) — re-cost it to the pointer-sign +
  irid-ceiling re-tune it actually is; **W-SHADOW** must pick CSS-vs-`uShadow` and state the other's
  fate (F4); **W-HITTEST** must be re-worded to the precision win and ordered after W-SHOW (F5/F6).
  None re-orders α; all are pass-3 repairable.
- **β TOPOLOGY-MORPH FSM — ALIVE, but reconcile the authorities before the map (F2).** Delivering
  law 13's topology half via a provable spring-scalar arrangement-selector over the shipped field is
  the right, codex-headline, BEST-iOS-27 move, and the new primitive (`useBlobTopology`) is honestly
  named/scoped (not equal-difficulty to the problem — passes the elegant-reduction test). The crack
  is the emotion→topology MAP: it adopts law 13's `dot-ring`-as-peer over MARKS-B's `dot-ring`-
  inside-the-deflating-pill, without owning the divergence. β survives; its map is unearned until
  the DESIGN-ITERATION loop reconciles law-13-letter vs MARKS-B-frame.
- **γ WebGPU 3D-RAYMARCH — BLOCKED (correct, holds).** Three independent, disk-verified blocks: the
  permanent-floor ratification (`blob-genesis.md:111`), the mobile fill-rate wall (`:226,287`), and
  the active WGPU-twin delete order (`:122`). Reopens only if α+β provably cannot make 2D read as
  liquid-metal (gap 1). Disposition is honest.
- **δ SVG-GOO RESURRECTION — BLOCKED / BANKED-AS-ANCHOR (correct, holds).** Deleted for cause
  (`88f8f09`, no analytic edge, PRM-degrades-to-nothing, Safari `filter:url()` risk — the last
  matches `blob-genesis.md:40`). Assets (cartoon shadow → B-SHADOW; free hit-test → the CPU SDF
  mirror) harvested into α; substrate not resurrected. Right call.

---

## 4. Convergence re-score

Pass-1 claims **50%**, capped (honestly) on zero-paint: every π is OWED against an un-captured RED
baseline, and the sharpest named gap (does 2D read as liquid-METAL chrome — the α↔γ pivot) is
flagged as unverified. That accounting is genuine and, unlike the aurora seat, sits on an
archaeology that PASSES its central test byte-exact — a materially stronger foundation.

This critique surfaces a class the self-crit MISSED: a load-bearing, disk-falsifiable claim (the
mood amplitude is flattened / must be restored) that IS falsified for 3 of its 5 channels (F1),
plus an unreconciled contradiction between the two authorities the prompt names (F2) and a seam-
semantics collision the always-alive wave never states (F3). A §6 self-critique that explicitly
audits "gates that cannot fail" and still ships a born-GREEN clause in G-MOOD-AMPLITUDE has a blind
spot precisely at test (b)'s center.

**Earned convergence post-critique: 45%.** The number moves DOWN modestly from 50 — not craters —
because the load-bearing FOUNDATION (the archaeology, test a) is verified genuine and precise, the
§4.1 decomposition is sound, five of six deficits and all but one gate are disk-accurate, and every
gap the seat DID name is honest. The deduction is for: (a) the born-GREEN mood-amplitude gate + the
"restore the bold envelope" mis-scoping that a whole wave rests on (F1, the sharpest, −3), (b) the
law-13-vs-MARKS-B reconciliation β's map inherits unresolved (F2, −1.5), (c) the `settled`/U3 seam
collision W-ALIVE doesn't own (F3, −1.5 to +1 depending on the ruling; scored conservatively at −1).
It does not go lower because none of these touches the core thesis (the six deficits are a
default/amplitude/register problem re-tuneable on landed roots, not an engine rewrite), and that
thesis is correct on disk. The cap remains, above all, the total absence of paint.

---

## 5. Pass-3 deliverables (priority order)

1. **Re-cost W-MOOD to its real residual.** Delete "restore old bold (`orbit 2.2 / wobble 2.0 /
   pulseAmp 0.05`)" from §4.3 and the orbit/wobble/pulse clause from G-MOOD-AMPLITUDE — those are
   GREEN at HEAD (`constants.ts:53,66-69`). Re-state the deficit as: (i) restore the mood-OWNED
   pointer SIGN (un-flatten `constants.ts:93`; curious `+0.6`, sleepy a genuine negative via the
   valence map or a sign restore), and (ii) a taste call on the `iridScale` ceiling — noting it has
   NO `06929a4b` referent (the old blob was unlit HSV goo), so it is author-new, not restore. Make
   the gate assert only what is RED so it can fail. (Closes F1.)
2. **Reconcile law 13 vs MARKS-B before the emotion→topology map.** State plainly that
   `IOS27-CODEX.md:58` codifies `dot-ring` as a topology peer while `MARKS-B.md:101-102,273` observe
   `pill→orb→pill` with the dot-ring INSIDE the deflating pill. Decide (with a stated warrant)
   whether β's `dot-ring` is a macro-topology or a within-pill listening decoration, then rebuild
   the curious/sleepy mapping on that decision. Run it through the DESIGN-ITERATION loop
   (brainstorm-3 → golden → challenge-3) pass-1 already schedules. (Closes F2.)
3. **Resolve the `settled`/U3 seam at W0, not W-ALIVE.** Rule whether a low-energy breathing rest
   pose counts as `settled`, and keep the demand gate and the public `settled` seam on ONE predicate
   (the U3 discipline, `useMetaballRenderer.ts:73-86`). Add a born-RED gate on the seam contract
   (an armed-but-idle consumer still parks its idle logic; the visible blob still breathes) so
   G-NEVER-FREEZE and the seam are proven jointly. (Closes F3, F7.)
4. **Pin the shadow mechanism.** Choose CSS `--blob-shadow-cartoon` vs the in-shader `uShadow`
   tune (design-vision's actual proposal, `:157-159`); state the loser's fate (delete/zero); one
   shadow, no silent pair. (Closes F4.)
5. **Re-word W-HITTEST to the precision win and order it after W-SHOW.** π-HITTEST proves a click in
   the disc-gap and a click ON an outboard satellite — NOT corner fall-through (already green,
   `Blob.vue:383-394`). State the W-SHOW→W-HITTEST coupling: no circle can hit-test orbit>body.
   (Closes F5, F6.)
6. **Carry the honest pass-1 gaps:** prototype a 2D matcap/env chrome term (still WebGL2) and
   π-capture it vs the METAL FLOW stills BEFORE conceding γ's substrate (gap 1, the α↔γ pivot);
   measure the always-alive `<7%` budget with aurora co-present on a DPR-3 tile GPU (gap 4);
   surface the WGPU-twin delete as the explicit cross-tranche coordination it is (gap 5); and put
   ONE user question on default-register break vs opt-in `register="liquid-metal"` (gap 6, the
   presets-in-consumers fence). All remain owed.

---

## 6. What holds (so pass-3 does not over-correct)

- **The archaeology is real and precise — do not re-verify it, do not soften §1-§2.** The old
  value.js blob, its FSM values, its shader primitives, and every genesis/design-vision citation
  resolve on disk. This is the document's spine and it holds.
- **α is the right leader and β the right composed headline.** γ is correctly BLOCKED (three
  independent disk-verified blocks); δ correctly BANKED-AS-ANCHOR. No route re-orders.
- **The §4.1 decomposition and the "re-tune landed roots, not rewrite" thesis are correct on disk** —
  the surface uniforms, HERO geometry, mood surface, satellite FSM, pointer spring, and manual/auto
  latch all exist as cited. B-SHADOW, B-LIGHT, B-EXPRESS, B-META, and the pointer-SIGN half of
  B-MOOD are genuine deficits.
- **Most gates are well-formed born-RED** — G-NO-WGPU (presence), G-SHOW-VISIBLE (countable ≥2
  beads), G-RIM-CAUSTIC (lower-rim vs uniform-fres, `metaball.frag.ts:376-396`), G-NEVER-FREEZE
  (behavioral). The four new primitives pass the elegant-reduction test (the traveling-sweep term is
  ~10 lines on the existing Blinn-Phong block `metaball.frag.ts:442-455`; `useBlobTopology` is an
  arrangement-selector, not a renderer). Only G-MOOD-AMPLITUDE (F1) needs its born-GREEN clause cut.
- **The zero-paint cap is honestly the dominant limiter** — keep it front-and-center; the α↔γ
  liquid-metal-2D question (gap 1) is correctly named as the one decision that could re-order the
  routes.

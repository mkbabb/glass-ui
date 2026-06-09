# H-blob — Adversarial hardening: Blob SOTA (AY.W-BLOB1..3)

**Verdict: GAPS-FOUND (trending NOT-COHESIVE on the research-brief + the consumer bar).**

The blob shader/composables are technically excellent — already at the public SOTA per the
AX synthesis. The *plan* (W-BLOB1..3) is the problem: it re-runs a 32-agent sweep that already
concluded "no algorithm changes needed", it carries no convergence/legibility bar that the
current default render would FAIL, it never names a second consumer (the overfitting wall), and
it ignores the one visceral defect the captured DELTA shows: **the canonical default blob paints
a dark coffee-bean, not the "warm-cream living bead" every doc claims.**

---

## F1 — The "32-agent research" (W-BLOB1) has NO new brief; it re-runs a settled sweep (NOT-COHESIVE)

`AY.md:59` — `W-BLOB1 | blob | research(32) | 32-agent SOTA sweep: metaball/SDF, lit-droplet
shading, interaction; → goo-blob/RESEARCH.md + path. | research doc + ranked path`.

But the AX 32-facet sweep ALREADY ran and its synthesis (`docs/tranches/AX/research/blob-synthesis.md:11`)
states verbatim:

> "The glass-ui blob is **already at or beyond the public web frontier**... W08/W15/W16 are
> therefore SCALE-RECONCILIATION + DEFAULT-IDENTITY + HYGIENE waves, **NOT algorithm-replacement
> waves**."

And `blob-synthesis.md:87`: "WebGL2 single-pass 2D-SDF is the correct, permanent floor... WebGPU
is NOT warranted... Document WebGPU + particle-swarm as explicit, research-backed NON-GOALS."

W-BLOB1's brief is byte-identical in scope to the sweep that produced that verdict (metaball/SDF,
lit-droplet shading, interaction). Dispatching 32 fresh agents against an already-answered question
is research-for-research's-sake — it violates the gestalt/KISS edicts and the cardinal lesson (no
captured DELTA will move because nothing in the brief targets a measured defect). The hard gate
"research doc + ranked path" is a process-only gate (a doc EXISTING ≠ a defect closing) and so is
UNDER-SPECCED per TRANCHE-AND-WAVE-SPEC.md:41 ("Grep-only and 'API exists' checks are insufficient
for runtime features").

**The brief must be re-scoped to the OPEN questions the AX sweep deferred or could not answer**, not
re-run the closed ones. The real open items (see F2–F6) are: the default-identity legibility defect,
the 126-knob config-simplification (the aurora "simplify to atoms" mandate was never applied to blob),
the missing consumer #2, and the WebGPU/non-goal documentation that AX recommended but the README
must ratify.

---

## F2 — The DEFAULT blob is a dark coffee-bean, not a "warm-cream living bead" (the visceral defect; CHRONIC)

This is the load-bearing finding and the answer to my lane's question ("calm living bead or
skeuomorphic?"): **the default is neither warm-cream NOR calm — it's a dark, dirty, lopsided blob.**

Evidence — the captured DELTA artefact `docs/tranches/AX/audit/visual/W46/blob-default-AFTER-calm.png`:
the "after-calm" default renders as a **charcoal/brown amorphous mass with a pseudopod jutting off the
right edge** — it reads as an ink stain or coffee bean, not a gel droplet. The colored variants
(`blob-default-AFTER-mobile.png` red, the desktop-light overview's red/blue/green) read beautifully as
lit beads; the DEFAULT (black) does not.

Root cause — `demo/stories/substrates/blob.vue:143,209` mount `color="var(--primary)"` and
`types.ts:291` ships `rimColor: "var(--foreground)"`. Per CLAUDE.md, `--primary: hsl(24 10% 10%)` and
`--foreground` are both near-black warm-ink in light mode. So the canonical default paints a dark body
with a near-black rim — the "warm-cream" identity the README asserts (`README.md:5,45,66`: "lit
warm-cream bead", "the stock lit warm-cream droplet") is FICTION for the as-shipped default. The
warm-cream surfacing is only the SPECULAR/rim sheen (`metaball.frag.ts:435` `warmCream` OKLCh
L0.97/C0.03/h85), which is a thin highlight on a dark body — it does not make a dark body read cream.

Why this is chronic: AX.W46 was the "calm not skeuomorphic" retune (commit `83f8fa1`,
`d472292`) and STILL shipped the dark default. The README↔reality gap (doc says warm-cream, render is
charcoal) is exactly the "headless-green/visually-broken" trap MEMORY flags as the AX-halt cause.

**The fix is a default-identity decision, not more research.** Either (a) ship a genuinely warm-cream
default base color (a light OKLCh stop, e.g. the demo's seed-palette analogous ramp as the DEFAULT
`paletteStops`, not empty) so a bare `<GooBlob :config="BLOB_CONFIG_DEFAULTS">` paints the cream bead
the docs promise; or (b) correct every doc to say "the default tints to your `--primary`; pass a light
`color` for the warm-cream look". Option (a) is the greenfield-correct move (the SOTA look IS the
default — the same edict W15 applied to flip `lit:true`).

---

## F3 — 126-config-line / 46-uniform knob sprawl; the aurora "simplify to atoms" mandate was never applied to blob (GAPS-FOUND)

`types.ts` `BlobConfig` carries 126 field/doc lines and ~50 tunable fields; `metaball.frag.ts` declares
46 uniforms (`grep -c '^uniform'`). PROMPT-CORPUS.md:42 mandates for AURORA "simplify the options set
to atoms (seed/harmony/mood/medium/zones/motion)" and AY.md:56 makes it a hard gate (`options set
reduced`). The blob has the IDENTICAL sprawl problem — `iridescence`, `iridHue`, `iridSpeed`, `sssScale`,
`sssPower`, `coreGlow`, `specStrength`, `specShininess`, `rimPower`, `rimStrength`, `lightDir`,
`warpAmp`, `noiseAmp/Freq/Speed`, `hueRange`, `satShift`, `brightnessShift`, `colorNoiseFreq/Speed`,
`eccentricity`, `orbitSpeedScale`, `wobbleScale`, `mergeRate`, `mergeDuration`, `absorbedDuration`,
`emergeDuration`, `orbitDuration` — most are derive-from-a-higher-atom candidates (the AX synthesis
itself, §8 line 54, complained `orbitSpeedScale`/`wobbleScale` were "derived-but-unread" — a smell of
over-parameterization). W-BLOB2/3 carry NO simplification clause; the blob plan is asymmetric with the
aurora plan for the same defect class. This is a genuine gestalt/KISS gap.

---

## F4 — No second consumer; the AX-named consumer #2 (value.js repatriation) NEVER landed (CHRONIC-MISS / overfitting wall)

The overfitting-audit edict (≥2 sites or exported-with-a-real-consumer or demo-private). GooBlob is
EXPORTED (`@mkbabb/glass-ui/goo-blob`) but I find exactly ONE real consumer — the demo story
`demo/stories/substrates/blob.vue`. No slides consumer, no speedtest consumer (`grep` over
`~/Programming/slides/src` and `~/Programming/speedtest/src` returns nothing).

The AX synthesis named the binding consumer-#2 close-criterion explicitly
(`blob-synthesis.md:79`, item 8): *"value.js DELETES its local goo-blob fork and consumes
@mkbabb/glass-ui/goo-blob, injecting its OWN color through the ColorResolver seam (the seam was
designed for exactly this)."* I checked `~/Programming/value.js/src` — there is NO goo-blob/metaball
reference at all. The entire ColorResolver-injection seam (`useMetaballRenderer.ts:108`, the loud-throw
at `:140`, the whole DI ceremony) was BUILT for a consumer that never arrived. That is substrate-
without-a-second-consumer — the exact bar L invariant 8 freezes.

AY.W-BLOB3's gate is "interaction capture; frame-budget" — it does NOT require/verify a second
consumer. The plan must either (a) make AY.W-BLOB3 land the value.js (or speedtest, or a real slides)
consumer as the binding gate, or (b) formally book the blob as "demo-only showcase primitive, retained
with rationale" and STRIP the speculative DI seam (the throw, the inject ceremony) down to the demo's
actual one-resolver need. Carrying an exported, DI-elaborate, 46-uniform primitive with one demo
consumer indefinitely is the overfitting the audit forbids.

---

## F5 — useMetaballRenderer is a 694-line god-module; W-GOD1 carves it but the boundary is unspecified (GAPS-FOUND)

`AY.md:92` W-GOD1: "Carve the 4 god-modules <500 (useMetaballRenderer 694...), return-shapes
byte-identical." Confirmed: `useMetaballRenderer.ts` is 694 lines and is doing FOUR distinct jobs:
(1) the color-resolve memo (`:176-184`), (2) the wake/quiescence scheduler (`:194-212`,
`:595-644`), (3) the GL setup/program/uniform-cache build (`:247-304`), and (4) the 260-line
per-frame `drawFrame` uniform upload (`:334-593`). The natural carve is obvious (a `useBlobWakeScheduler`
leaf + a `buildMetaballProgram` setup leaf + a `uploadBlobUniforms(gl, U, …)` frame leaf), but W-GOD1's
gate ("`proof:no-god-module` green") is a LINE-COUNT gate only — it does not assert the carve preserves
the byte-identical render (the only thing that matters). The carve must be gated on `proof:blob-render`
+ `proof:blob-color-equivalence` STAYING green across the split (the render is the truth, not the line
count). Also: the carve interacts with W-BLOB2/3 (which edit the same drawFrame) — ordering must put
W-GOD1 BEFORE the impl waves or the carve re-conflicts (a scope-reveal-trigger risk the plan does not
sequence).

---

## F6 — The hard gates are FLOOR-shaped / process-shaped; no ceiling the current state would fail (UNDER-SPECCED)

`AY.md:60-61`: W-BLOB2 gate = "`proof:blob-*` green; live capture"; W-BLOB3 = "interaction capture;
frame-budget". These are the SAME gates that are ALREADY green at HEAD — they cannot drive a perfection
wave (a gate every current state passes proves nothing). The `proof:blob-live-truth.mjs` gate (read in
full) is well-built — it has a floor→BAND structure (`domeLumaStd`/`centroidShift` PAIRED ceilings, the
no-blown-white assertion) — but it is ALREADY GREEN (commit `83f8fa1` "live-verified"), so re-citing it
as the W-BLOB2 gate is a tautology. A perfection wave needs a NEW evidence-backed bar the current dark
default would FAIL — e.g. a default-warmth assertion (the resting body's mean OKLCh L over a transparent
backdrop must read as a light bead, not L<0.3 charcoal — the F2 defect, born-RED at HEAD), or a
config-atom-count ceiling (≤N top-level knobs — the F3 defect, born-RED at 50). Without a born-RED gate,
the two-failed-lifts trigger (the convergence close) can never even arm, and the wave is decorative.

---

## Chronic misses (deferred/missed across ≥2 passes)

1. **The dark-default-vs-warm-cream-doc gap** — AX.W15 flipped lit:true, AX.W46 retuned "calm not
   skeuomorphic", and the default STILL renders charcoal while the README still says "warm-cream bead".
   Two passes, defect persists, doc lies. (F2)
2. **The missing consumer #2** — named as the binding close-criterion in the AX synthesis
   (value.js repatriation), never landed; the DI seam carries a one-consumer primitive across the
   AX→AY boundary. (F4)
3. **Config-simplification asymmetry** — aurora got "simplify to atoms" as a hard gate; blob, with the
   identical 50-field sprawl, never did, across AW + AX. (F3)

---

## Fold-into routing

- **F1, F6** → fold into a re-scoped **W-BLOB1** (rename to a TARGETED audit, not a 32-agent re-sweep:
  consume the AX synthesis, enumerate the OPEN items, author born-RED gates).
- **F2** → fold into **W-BLOB2** (the default-identity decision + the born-RED default-warmth gate).
- **F3** → net-new clause in **W-BLOB2** (config-atom simplification, mirroring aurora's W-AUR2).
- **F4** → fold into **W-BLOB3** (bind a real consumer #2 OR formally book demo-only + strip the
  speculative DI), AND record in the AY overfitting audit (Band E W-CLOSE1).
- **F5** → **W-GOD1** (Band E) — re-gate the carve on `proof:blob-render` + `proof:blob-color-equivalence`
  byte-identity, and sequence W-GOD1 BEFORE W-BLOB2/3.

---

## Convergence criteria (the acceptance bar for "blob perfected")

The blob lane is "perfected" ONLY when ALL hold:
1. A bare `<GooBlob :config="BLOB_CONFIG_DEFAULTS">` over the demo backdrop paints a LIGHT, warm,
   coherent gel bead (captured DELTA shows a cream/light body, not a charcoal mass) — the F2 defect
   measurably closed by a born-RED-at-HEAD default-warmth π readback.
2. The top-level config surface is reduced to atoms (a measured ceiling; the derived params either
   wired-and-read or deleted — no derived-but-unread field survives the overfitting audit).
3. A SECOND real consumer composes GooBlob (value.js fork repatriated, OR speedtest/slides adopts),
   OR the blob is formally booked demo-only with its speculative DI stripped — recorded in W-CLOSE1.
4. `useMetaballRenderer` < 500 lines via a clean leaf-carve, with `proof:blob-render` +
   `proof:blob-color-equivalence` STILL green (byte-identical render across the carve).
5. The README's "warm-cream default" claim is TRUE-of-the-default (or corrected) — no doc↔render lie.
6. WebGPU + particle-swarm are documented as research-backed NON-GOALS (the AX recommendation
   ratified), so a future agent never re-opens the settled raymarch/WebGPU question.

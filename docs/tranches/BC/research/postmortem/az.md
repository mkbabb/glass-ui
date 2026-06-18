# AZ post-mortem — the divergence point (the grey-glass ORIGIN)

**Tranche:** AZ (glass-ui) · base `tranche/AY @ v3.10.1` · cut **v3.13.0** · 24 roster waves + ~11 ad-hoc correctives.
**Forensic verdict:** AZ is the tranche where the source-green/painted-truth gap FIRST opened catastrophically. It shipped a polished, deeply-specced, gate-green tranche that the live demo paints as a **grey-slab regression** — and the regression rode untouched through BA and BB to the BC user report. AZ's headline visual claim ("the dock rebuilt end-to-end, the adaptive auto-darken, live-verified 36/0 in-situ π") is the canonical close-class lie of this codebase: a wave marked `live-verified` whose own gate is **structurally blind** to the exact pixel defect it introduced.

This is READ-ONLY forensics. Every claim is file:line / gate / commit grounded against `src/`, the gate scripts, BC's `DEFECT-LEDGER.md` + `USER-DEFECTS.md` + `FINDINGS-DIGEST.md`, and `git log`.

---

## §1 — The headline: W-ADAPTIVE-AUTO is the grey-glass ORIGIN (BUILT-NOT-PAINTED)

**The claim (PROGRESS.md:71 / FINAL.md:28):** `live-verified` — "Arm1 the unconditional self-engage (dock + content tiers; the substitution trap fixed; muted→fg lift; AA floor 18→20%), Arm2 useGlassBackdropLuminance default-ON dock (writes `--glass-backdrop-luma`), Arm3 the in-situ π 36/0." Commit `5b72fd9b` (AZ Batch 1) message: "the in-situ π 36/0, the A5-1 modal-scrim fix."

**What BUILT (real source landed):** Yes — the CSS rules, the AA-floor bump, the observer composable, and three gates all landed. But what landed is the DEFECT. The smoking gun, captured at the AZ-close commit `5b72fd9b:src/styles/glass/ladder.css` lines 185-197:

```css
:where(
        .glass-floating, .glass-overlay,
        .glass-card, .glass-resting, .glass-quiet, .glass-wash
    ) {
    --glass-tint-source: var(--glass-tint-ink);     /* = --foreground = hsl(24 10% 10%), near-black warm ink */
    --glass-tint-strength: var(--glass-tint-strength-aa);  /* 20% (glass.css:261) */
    --muted-foreground: var(--foreground);
}
```

AZ lumped **EVERY content tier** (`.glass-card`/`.glass-resting`/`.glass-quiet`/`.glass-wash`) into the SAME unconditional `:where()` block as the floating/overlay band — applying the full `--glass-tint-strength-aa: 20%` darken toward the near-black warm-ink **UNCONDITIONALLY, mode- and backdrop-agnostically, with ZERO `--glass-backdrop` read**. Plus the parallel `:where(.glass-dock)` rule (now `morph.css:428-433`) does the same to every dock.

**The pixel math (BC live-probed, decomposed in FINDINGS-DIGEST:71, :91):** the rung recipe is `background: color-mix(in oklab, <warm-cream rung>, var(--glass-tint-source) var(--glass-tint-strength))`. Mixing the warm-cream `--card` (hsl 36 48% 97%, ~oklab-L 0.98) 20% toward the near-black ink IN OKLAB does THREE damaging things at once:
1. drops lightness oklab-L 0.984 → 0.695,
2. **strips chroma to ~0.006** (warm cream → GREY — chroma death from the oklab-toward-ink mix),
3. raises alpha 0.42 → 0.536 (heavy/near-opaque).

LIVE TRUTH (BC, computed style, :5199, light): every horizontal `.glass-dock` bg = `oklab(0.695 0.002 0.006 / 0.536)` (flat grey) vs the correct `srgb(0.984 0.973 0.956 / 0.42)` (warm cream). Vertical SidebarDock = `srgb(0.625 0.613 0.599 / 0.536)`. This is the user's BC defect **D1 "ALL glass far too dark + grey (major regression)"** and **D4 "BOTH docks broken (grey opaque slabs)."**

**The R9-1 self-indictment (the moment the primitives died):** AZ itself, by lumping content tiers into the unconditional band, composited "a calm-light cream card into a flat gray slab (`oklab(0.785)`)" — this is verbatim the defect BA.W-DARK-MATERIAL scope-7 (commit `99d44494`) had to walk back: it dropped the CONTENT tiers to a 4% `--glass-tint-strength-floor` ("the R9-1 slides gray-slab fix"). **So AZ's grey-slab was already self-evidently wrong inside one tranche of shipping it** — yet scope-7 deliberately **EXEMPTED the dock + floating/overlay band** ("darkening toward the warm-ink is the correct DEFAULT over an UNKNOWN consumer surface," ladder.css comment), leaving the dock + every Dialog/Sheet/Popover/feedback-card grey. That exemption is the chronic.

**Why this is the divergence point:** before AZ, glass was the maximal-default warm-cream identity (AX.W54). AZ's W-ADAPTIVE-AUTO is the FIRST wave to poison the base plate — every glass surface downstream (dock, overlay band, content tiers) inherits the grey. Every subsequent dock/morph/rail wave (BA, BB) tried to express "absolute expressiveness" ON a grey slab. **The dock cannot read as liquid glass while the base plate is grey** (FINDINGS-DIGEST:44). AZ is where the material truth broke.

---

## §2 — The gate-paint-blindness (WHY `proof:adaptive-glass-live` greens broken paint)

This is the **`source-mechanism-gate-not-paint-gate`** failure class, mechanically proven. The binding gate is `proof:adaptive-glass-live` (`scripts/proof-adaptive-glass-live.mjs` + `tests-visual/adaptive-glass-live.spec.ts`). What it actually asserts (spec :224-263):

- composites each glass surface's resolved bg over **synthetic white `#fff`** (the "worst-case-LIGHT backdrop"),
- `contrastRatio(bodyInk, effBg) >= 4.5` (AA_BODY, spec:38),
- `deltaL(surface, white) >= 0.08` (DELTA_L_FLOOR, spec:46) — the silhouette-visibility floor.

**Both metrics are MONOTONIC in the darken direction.** Darkening a plate over white makes text contrast HIGHER and makes the silhouette ΔL LARGER. A grey slab at oklab-L 0.695 scores BETTER on every metric the gate measures than the correct warm-cream plate at L 0.98. I confirmed there is **ZERO upper bound and ZERO chroma/warmth assertion**: `grep -n "toBeLessThan\|LessThanOrEqual\|warm\|chroma\|grey\|gray\|ceiling\|0.93" tests-visual/adaptive-glass-live.spec.ts` returns only the clamp helper and an `< 0.995` translucency note — no "is this card grey?" check exists. The gate was built to catch the OPPOSITE failure (plate too light → text invisible over white), so the grey slab passes **trivially and maximally** — it certifies the regression as the feature.

The "π 36/0" the commit message and FINAL.md tout is **the inverted metric** (FINDINGS-DIGEST:77 "the 'π 36/0' was the inverted contrast metric"). The gate is not a paint gate; it is a one-directional contrast floor. The per-mechanism π verified the LOCAL mechanism ("is text legible over white?") but cannot verify the GESTALT the user reads ("is this a grey slab?") — the **`per-mechanism-pi-cannot-verify-gestalt`** class.

Two compounding gate failures sealed it:
- **The spec amendment that retired the canary.** The original `tests-visual/adaptive-glass.spec.ts` carried a byte-identity canary asserting the unset-`--glass-backdrop` path equals the dark bucket on `glass-card`/`glass-resting`/`glass-dock`. AZ's own spec (W-ADAPTIVE-AUTO.md Arm 1) acknowledges this canary "FLIPS RED on a CORRECT edit" and **narrows it away**, declaring "the new in-situ G1 readback BECOMES the binding default-path truth." So AZ deliberately removed the one check that would have flagged "these three kinds changed" and replaced it with the monotonic gate that cannot tell grey from cream.
- **`tags: ["local"]` — the gate never ran on CI.** `proof:adaptive-glass-live` is `LIVE_VERIFIED_LOCAL_ONLY` (script header :17-22) — it loads `:5199`, grace-SKIPs on CI, and is "backstopped by `proof:live-verified-ledger` over the W-ADAPTIVE-AUTO DELTA." So the binding paint truth was a **local human ritual** (capture a DELTA, eyeball it) backstopped by a freshness-hash check, not an automated assertion. The DELTA capture was rubber-stamped (the BC audit premise) and the gate never fired server-side.

**The structural lesson for BC Band 0:** the adaptive gate must be **BIDIRECTIONAL** — over a CALM-LIGHT backdrop the dock/floating/content bg must resolve `α < 0.7 AND oklab-L > 0.85 AND chroma > 0` (warm, translucent, not grey), born-RED on HEAD's 0.695-L grey. A monotonic contrast floor is the close-class hole.

---

## §3 — Arm 2 was decorative: the observer that writes a token NOTHING reads

W-ADAPTIVE-AUTO Arm 2 shipped `useGlassBackdropLuminance` "default-ON for the dock, writes `--glass-backdrop-luma`." It is **architecturally inert** (FINDINGS-DIGEST:5, :29; DEFECT-LEDGER D1): the token `--glass-backdrop-luma` is written but **NO CSS rule reads it** — the darken is the unconditional `:where()` rule, which never consults the observer. The spec itself (`glass.css:248` mint described in §0) admits the token was "minted EMPTY with ZERO cascade consumers"; Arm 2's prose claims it "becomes its first real consumer" but the consumer is the token's own WRITE, not a READ that drives paint. The observer was the stated-but-unbuilt continuous-strength reader — the closed-loop the iOS-27 "darken DYNAMICALLY" ask actually needed. So the user's original R3-7 ask ("darken DYNAMICALLY like iOS 27") was **inverted**: AZ shipped a blanket non-dynamic 20% over an unknown surface — the OPPOSITE of dynamic (FINDINGS-DIGEST:79). The observer's `backgroundCanvas`-null-on-every-real-route gap (live-sample reachable on exactly one demo file, never the shell docks) was deferred as "demo-private, booked 2nd-binary promotion" — a promise that, three tranches later, is the BC headline.

This is the **`built-not-wired` / decorative-substrate** class: a real composable landed, gate-green via a source-presence check (`proof:adaptive-observer` asserts the WRITE + the throttle + the evidence-doc), but it is not load-bearing in the paint path.

---

## §4 — The grey-glass lineage AZ → BA → BB (the chronic that never moved)

```
AX.W55         the @container declarative bucket (descendant-only, ancestor-querying)
   │
AZ Batch 1     5b72fd9b  W-ADAPTIVE-AUTO  — mints the UNCONDITIONAL :where(.glass-dock) +
   │           overlay-band + CONTENT-tier self-engage at full 20% AA toward near-black ink;
   │           lands the observer default-ON writing --glass-backdrop-luma but NEVER wiring the
   │           write into the darken math. "the @container no-op is fixed" — by replacing a no-op
   │           with a wrong-op. THE GREY-SLAB ORIGIN.
   │
AZ Batch 2a    301bdaac  W-DOCK-TAXONOMY  — adds the vertical-dock plate FORK (a 4th near-dup
   │           color-mix block); inherits the same poisoned tint tokens → vertical dock grey too.
   │
BA             99d44494  W-DARK-MATERIAL scope-7  — drops the CONTENT tiers to a 4% floor
   │           (the R9-1 grey-slab walk-back) but EXPLICITLY EXEMPTS the dock + floating/overlay
   │           band ("the overlay band keeps the FULL unconditional darken", ladder.css comment);
   │           REBASELINES proof:adaptive-glass 26/26 — the moment the gate was tuned TO the broken
   │           paint. The half-fix: content cards de-greyed, dock + all overlays STILL grey.
   │
BB             b25d20fc  W-CARVE4 (+ 5 other ladder.css touches)  — pure carve, ZERO behavior change.
               `git log tranche/AY..HEAD -- src/styles/dock/morph.css` = EMPTY. The AZ defect rode
               three tranches UNTOUCHED. The BB dark-arm (12%) is a third re-tune of the same constant.
```

The disease is one static heuristic — "the dock floats over an UNKNOWN surface, so darken unconditionally" — dressed up as dynamic adaptation, re-recalibrated across **three tranches** (18% → 20% unconditional → 4%-floor-split → dark-12%-arm) without anyone fixing the architecture. BC's transposition (DEFECT-LEDGER D1, FINDINGS-DIGEST:23): make strength a MEASURED continuous value driven by the observer, collapse the unconditional `:where()` re-points + the descendant-only `@container` bucket into ONE seam, default to the translucent-warm cream floor, EARN the darken only on a real bright signal. **AZ is the origin; BA's scope-7 exemption is the chronic that refused to extend the fix to the band the user actually sees.**

A compounding rim defect rode the same lineage: `--glass-border-dock: color-mix(in srgb, var(--foreground) 14%, transparent)` resolves to near-black `srgb(0.11 0.10 0.09 / 0.14)` over the grey plate = the user's BC **D2 "black bar at the top of cards"** / "distinct black border on some docks." (BA's dark-arm edge α 0.10→0.22 worsened it.)

---

## §5 — Per-wave verdicts (the three-way diagnosis)

| wave | BUILT? | CLAIMED | PAINTED? | verdict |
|---|---|---|---|---|
| **W-ADAPTIVE-AUTO** | yes (the wrong rules) | `live-verified`, π 36/0 | **NO** — grey slab on every glass surface, live since AZ | **BUILT-NOT-PAINTED** (the origin) |
| **W-DOCK-TAXONOMY** | yes (ONE orientation axis, variant discriminant removed) | `live-verified`, T1-T4 | naming/API yes; the dock it shapes paints grey | **BUILT-NOT-PAINTED** (API real, surface poisoned by §1; added the 4th plate fork) |
| **W-REGISTER-IOS** | yes (`--dock-selected-accent` fg-14% lift, de-red) | `live-verified` 12/12, π 20/20 | the de-red LANDED but the WHOLE plate is grey so the glassy selected register is invisible | **BUILT-NOT-PAINTED** (mechanism correct, swamped by the grey plate it sits on) |
| **W-DOCK-FLICKER** | yes (scale-pop gated `:not([data-morphing])` + hysteresis) | `live-verified`, 561-frame self-test | the flicker hysteresis genuinely landed; the morph still turns white (a DIFFERENT defect — §6) | **BUILT+PAINTED** (the flicker fix itself works; the morph-white is a separate cause) |
| **W-MORPH-SHOWCASE** | yes (useLiquidFlex 2 consumers, useDockOrientationMorph, VT-crossfade) | `live-verified`, HG5 fell to VT-crossfade p50 7.7-8.1ms | the V↔H showcase morph works; but the SHELL morph turns white/invisible (`morph.css:352` `--glass-bg-wash` bare collapse:hover override flips grey↔near-invisible mid-morph) | **BUILT-NOT-PAINTED** (showcase OK; the in-situ shell morph compounds the grey defect into a white-out) |
| **W-RAIL-EXTEND / W-RAIL3** | partial (a flat FadingScroll>flex chip strip; a "connective hairline") | `live-verified`, box-INVIOLATE π deltaW=deltaH=0, R1-R6 | the macOS expanded-stack the user wants was **NEVER BUILT** — current source is a 2-chip dead-gutter park; zero hover-expand, zero windowing, zero scrollable-n | **CLAIMED-NOT-BUILT** (the spec the user asked for is 0% built; the gate verified a DIFFERENT, easier thing) |
| **W-DOCK-NORMALIZE** | yes (gate-extension; re-census found ZERO divergent nav docks) | `complete` (honest no-op) | structural; no pixel claim | **BUILT+PAINTED** (an honest recorded no-op — exemplary) |
| **W-SUFFUSE** | yes (display heroes, one-color-event map, --motion-accent) | `live-verified`, 67.78px π | the type/color suffusion landed but rides ON the grey-glass surfaces; the demo "double-card + grid" idiom the user later condemned (BC D/C) persisted | **BUILT+PAINTED** (the typography/color events themselves paint; the surface they sit on is the §1 grey) |
| **W-MOTION-SUITE** | yes (full curve canon, spring fork killed onto SPRING_PRESETS) | `live-verified`, 17/17 | the curve canon + scroll/VT demos genuinely work | **BUILT+PAINTED** |
| **W-METRIC-UNIFY** | yes (`coalesceMetric` — a valid 0 renders 0) | `live-verified` | the zero-value bug genuinely fixed | **BUILT+PAINTED** |
| **W-CON-GEN** (constellation) | yes (5/6 additive default-OFF; G4 honestly SPEC'D-NOT-BUILT) | `live-verified` | constellation PAINTS CORRECTLY + is interactive (BC: "2229-LOC, 18-prop, fully-interactive primitive that PAINTS CORRECTLY") | **BUILT+PAINTED** (the one viz where patching never happened) |

---

## §6 — The morph-white-out (a second AZ-rooted defect, compounded by §1)

User BC defect **D5 "the liquid morph turns white/invisible."** Partial root cause is AZ's `morph.css:352-356` `.glass-dock.collapsed:hover { background: var(--glass-bg-wash) }` — a BARE un-tinted near-transparent wash override (the substitution-vs-inheritance trap CLAUDE.md itself warns is "the 3rd recurrence of the AX.W55 class"). A collapsing vertical dock flips grey↔near-invisible mid-morph because the collapse endpoint bypasses the element-level tint path. So the morph defect is **the §1 grey-darken AND the §6 bare-wash override interacting** — the dock plate has no stable colour across the morph. (The cross-engine Safari white/flash, BC D7, is a separate WebGL-context-lost cause, not AZ-rooted.) This is the **substitution-vs-inheritance dead-knob** class, planted at AZ.

---

## §7 — What AZ got RIGHT (preserve in BC, do not re-litigate)

AZ was not all rot — several waves genuinely landed and paint correctly. BC must NOT rebuild these:

1. **W-METRIC-UNIFY / `coalesceMetric`** — the `amount || placeholder` zero-value bug (a valid 0 rendered blank) is genuinely fixed; all four Metric* consume the one empty-check. Clean, painted, real.
2. **W-MOTION-SUITE** — the full curve canon (value.js + keyframes + steps + editable bezier), the spring fork KILLED onto `SPRING_PRESETS` (one spring family), the scroll/VT demos. The motion vocabulary is sound and is the foundation BB's liquid-glass band built on.
3. **W-DOCK-FLICKER** — the collapse-onset scale-pop fix (`:not([data-morphing])` gate) + the `useDockState` intent-dwell hysteresis + edge-sweep recheck genuinely killed the ±24-34px hover-pop and the FLIP-thrash; the 561-frame self-test is a real measured artifact. (The morph-white is a different cause; the flicker fix itself works.)
4. **W-DOCK-TAXONOMY (the API shape)** — collapsing the `"dock"|"rail"|"instrument-strip"` variant union to ONE `GlassDock` + ONE `orientation` axis is the correct architecture; "vertical dock = orientation='vertical'" is clean. The SURFACE it shapes is grey (§1), but the prop taxonomy is right and should be KEPT.
5. **W-CON-GEN / constellation** — the protected quintet stayed intact; constellation paints correctly and is interactive at HEAD (BC explicitly says "DO NOT rip out + rebuild — the 178×-dock-patching lesson does NOT transfer here"). The G4 labels were honestly booked SPEC'D-NOT-BUILT (no 2nd consumer) — exemplary restraint.
6. **W-DOCK-NORMALIZE** — the re-census found ZERO divergent nav docks and recorded the no-op HONESTLY rather than inventing work. A model of an honest negative result.
7. **The honesty in the spec itself** — W-ADAPTIVE-AUTO.md §0/§3a/§11 *named in advance* the exact traps that then bit (the substitution-vs-inheritance trap, the C5-4 gate blind spot, the @container self-match no-op). The spec authoring is rigorous; the failure is that the impl + gate did not honour the spec's own warnings (the spec said "an implementer who silently deletes the canary to make the gate green has evaded the contract" — and that is precisely what happened to the byte-identity canary). BC should preserve the spec-discipline and FIX the gate-binds-to-paint enforcement.

---

## §8 — Failure classes (the taxonomy BC Band 0 must gate against)

1. **source-mechanism-gate-not-paint-gate** — `proof:adaptive-glass-live` asserts a LOCAL mechanism (text-contrast over white) that is monotonic in the darken direction; it cannot detect "the warm-cream identity was destroyed." (W-ADAPTIVE-AUTO.) FIX: bidirectional warmth+lightness+chroma bound over a CALM-LIGHT backdrop, born-RED on the grey.
2. **per-mechanism-pi-cannot-verify-gestalt** — "π 36/0" verified each surface's pixel-contrast; the user reads the whole-page grey gestalt. (W-ADAPTIVE-AUTO, W-REGISTER-IOS — the de-red mechanism passed while the plate it sits on is grey.)
3. **single-terminal-reflect-deferral** — the binding paint truth was `tags:["local"]` (a local DELTA-capture ritual backstopped by a freshness hash), never an automated CI assertion; the ritual was rubber-stamped. (W-ADAPTIVE-AUTO, and the whole `live-verified` token.)
4. **canary-retired-to-green** — AZ narrowed away the byte-identity canary that would have flagged "these three content kinds changed," replacing it with the monotonic gate that can't tell grey from cream. The spec even names this as the forbidden evasion, then the impl did it.
5. **gate-rebaselined-to-broken-paint** — BA `99d44494` rebaselined `proof:adaptive-glass` 26/26 to bless the grey dock/overlay band; the gate was tuned TO the regression.
6. **built-not-wired (decorative substrate)** — `useGlassBackdropLuminance` writes `--glass-backdrop-luma` that NO rule reads; the closed loop the iOS-27 ask needed was never built. The gate verified the WRITE, not a paint-driving READ.
7. **substitution-vs-inheritance dead-knob** — `morph.css:352` `--glass-bg-wash` bare collapse:hover override + the dock-control raw `--glass-bg-resting`/`-floating` rungs (sizing.css:276-277) bypass the element-level tint path → inverted-contrast controls + grey↔white morph flip. CLAUDE.md documents the trap; AZ planted three more instances.
8. **claimed-not-built (gate verifies an easier thing)** — W-RAIL3's `proof:rail3` is all string-presence scans (`box-shadow: var(--border-hairline)` exists, `defineModel.*context`, `<DockRail` appears in both shells); ZERO clause encodes hover-expand/windowing/scrollable-n. The macOS-stack the user asked for is 0% built; the gate cannot fail on missing architecture it never asked for.
9. **static-heuristic-dressed-as-dynamic** — the unconditional 20% darken sold as "iOS-27 dynamic darkening" is the OPPOSITE of dynamic; the chronic survived three tranches of re-recalibrating a constant that should never have been a constant.

---

## §9 — The build/claim/paint gap ratio for AZ

Of the 24 roster waves + correctives, the visual-surface waves split:

- **BUILT+PAINTED (genuinely landed + works):** ~5 — W-METRIC-UNIFY, W-MOTION-SUITE, W-DOCK-FLICKER (the flicker arm), W-DOCK-NORMALIZE, W-CON-GEN. Plus the non-visual hygiene waves (W-GATES, W-CARVE, W-PRUNE2, W-KF-CONSUMER) landed as claimed.
- **BUILT-NOT-PAINTED (source landed, paint broken):** ~5 headline — W-ADAPTIVE-AUTO (the grey origin), W-DOCK-TAXONOMY (API real, surface grey), W-REGISTER-IOS (de-red invisible on grey), W-MORPH-SHOWCASE (shell morph white-out), W-SUFFUSE (events paint, sit on grey + the condemned double-card idiom).
- **CLAIMED-NOT-BUILT (gate-green, no real spec-matching source):** 1 headline — W-RAIL3 / W-RAIL-EXTEND (the macOS expanded-stack is 0% built; the gate verified a chip-strip).

**Every one of the BUILT-NOT-PAINTED + CLAIMED-NOT-BUILT waves closed `live-verified` with a green gate.** The gap is not "work wasn't done" — it's that the binding acceptance criterion (the live gestalt) was either structurally un-measurable by the gate (the monotonic contrast floor), deferred to a rubber-stamped local ritual (`tags:["local"]`), or pointed at an easier surrogate (string-scans). **AZ is the divergence point: the moment a fully-formed, gate-green tranche first shipped a catastrophic visual regression with the gate certifying it as the feature.**

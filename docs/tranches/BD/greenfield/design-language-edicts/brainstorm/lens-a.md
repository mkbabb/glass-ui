# design-language-edicts — brainstorm/lens-a (PURE iOS-27 FIDELITY)

> Lens: the most faithful, audacious iOS-27 Liquid-Glass interpretation. Match-or-BETTER
> the reference demos. This is a **precept amendment** to `design.md` (tranche-design,
> not component implementation). KISS: integrate into the extant §L1–L5 structure +
> cross-reference; do NOT bloat. The orchestrator vets + applies.

Live-grounded against `localhost:5173` `/foundations/intro` (φ-ladder display, warm-cream
six-layer glass), `/substrates/aurora` (the colorful transmissive field + defined edge),
the dock (transmissive plate, `--glass-bg-dock` 0.50, `blur(0)` floor). Tokens read live
(dark mode): warm-cream throughout (`hsl 26-30` hues, NEVER neutral-gray), cartoon shadows
already warm-tinted `hsl(30 14% 90%)` color-mix (design.md text is STALE — says `rgba(0,0,0)`),
`--scale-press-dock` live-resolves to **0.96 not 0.92** (a live drift to note, not fix here),
radii are **arbitrary** (8/12/16px — NOT a φ ladder), type ladder IS √φ.

---

## 0. The core idea (one paragraph)

design.md's §L precept block is the right home and the right shape — five canonical
precepts, each "when a primitive ships X it consumes from this vocabulary." The edicts do
NOT need a sixth precept or a parallel system. They need **two surgical moves inside the
existing block**: (1) **re-tier §L4** so the liquid-weight-universal law is first-class —
the medium tier (anticipation, follow-through/overlap, appeal) is promoted to *expected*,
the weak tier (staging, arc, secondary-action) is **demoted in name only** to a single
"scene-composition tier" the library now *enables via substrate* rather than disclaims, and
a new register-line names **Cartoon flow & punch** as the exaggeration ceiling; and (2) add
**ONE new precept `§L6 — Aristotelian Proportion`** (the φ law as a peer to Liquid Glass /
Spring / Tap / Motion / A11y), because proportion is genuinely a *missing* governing axis —
it is not motion, not glass, not a11y, and right now radii/spacing are arbitrary while only
type is √φ. Everything else (cartoon shadows, glass morphism, paper, ios27-canon) is already
*present* in design.md as sections; the amendment **elevates them by cross-reference from the
precept block** rather than re-authoring them. The whole change is ~3 revised §L sub-sections
+ 1 new precept + 1 Philosophy pillar line + 3 small cross-reference stitches.

**The single boldest move:** collapse §L4's three-tier strong/medium/**weak** taxonomy (which
literally ships a paragraph saying "we don't ship anticipation/arc/secondary-action") into a
**two-tier "Universal / Scene-orchestrated" model under one law — *Liquid Weight is
Universal*** — where EVERY principle is now claimed (the library ships substrate for all 12),
and add a fourth canonical register to the spring vocabulary: **`--spring-cartoon`** (the 1940s
technicolor anticipate→overshoot→settle curve, ζ≈0.35 with a pre-dip), making "cartoon flow &
punch" a *named motion preset* a primitive reaches for, exactly as it reaches for `snappy`.
That single curve + the §L4 re-tier converts the user's "liquid-weight universal / cartoon
register" edicts from prose aspiration into a *token a primitive consumes* — the design.md
idiom. No new system; the existing §L2 spring table simply gains a row, and §L4 stops
disclaiming.

---

## 1. The edicts → the precise design.md slot-in points

| Edict | Where it lands in design.md | Move |
|---|---|---|
| (1) 8/12 laws universal + liquid-weight | **§L4 Motion Tiers** (revise lines 107–138) + **§L2 spring table** (add `--spring-cartoon` row) | RE-TIER + add curve |
| (2) Cartoon animation+shadow as a REGISTER | **§L4** (new register-line) + **§Shadows → Cartoon shadows** (revise ~346: tokens→register, add motion) + new **`.cartoon-register`** cross-ref | ELEVATE |
| (3) Aristotelian proportion | **NEW §L6 — Proportion** (peer precept after §L5) + **§Border Radius** (re-author to φ) + Philosophy pillar line | NEW PRECEPT |
| (4) Canonical iOS-27 bar | **Philosophy** (one new pillar line) + **§L1 intro** (one canon sentence) — points at IOS27-REFERENCE.md | NAME THE NORTH STAR |
| (5) Meatballing perfect in Chrome+Safari | **§L1 "Glass cannot sample glass"** sibling note + **§L5 cross-engine row** (the goo-filter fence) | STATE THE MANDATE |

KISS rationale: 4 of 5 edicts touch sections that ALREADY EXIST. Only edict (3) earns net-new
structure (a precept + a re-authored radius table) because proportion is a genuinely absent
governing axis. We do not duplicate the cartoon-shadow token table into §L4 — we cross-ref it.

---

## 2. The amendment text (concrete, drop-in)

### 2a. Philosophy — add a FIFTH pillar (after "Orthogonal variants", ~line 16)

> **iOS-27 canon, or better.** The library is not "iOS-inspired" — it builds reference-grade
> canonical iOS-27 Liquid-Glass demos that **match or better** the guiding references
> (`docs/tranches/BD/viz/video-audit/IOS27-REFERENCE.md`: the analyzed videos + the Maps card).
> Perfected glass morphism (transmissive warm-cream six-layer composite, NEVER gray, §3 = a
> colorful field behind glass + a defined edge), visible paper morphism, audacious √φ
> typography, cartoon flow & punch, golden proportion, and liquid weight on all motion are the
> bar — a primitive that merely *approximates* the reference has not shipped.

*(One pillar line. It names the north star + points at the reference doc. The detail lives in
the §L precepts; this is the "WHY we ship" statement to match the four extant pillars.)*

### 2b. §L1 — add one canon sentence to the intro (after line 23, "Each precept is canonical…")

> The precepts are not aspirational: each names the reference behaviour from IOS27-REFERENCE.md
> it must reach, and a primitive's spec is incomplete until it cites the reference target it
> matches-or-betters (`T1`…`T17`).

### 2c. §L2 — add the FOURTH canonical spring (insert a row in the "Three canonical springs" table, line 72, and rename it "Four canonical springs")

| Preset | ζ (damping) | Bounce | Overshoot | Feels like | When it lands |
|---|---|---|---|---|---|
| `--spring-cartoon` | 0.35 | 0.45 | ~30% + **pre-dip** | "Technicolor punch" | The cartoon register: a celebratory tap-back, a fission snap, a dock-bud arrival, a hero entrance that wants 1940s exaggeration — anticipation (a pre-dip below origin) then overshoot then settle |

> **`--spring-cartoon`** is the exaggeration ceiling. Unlike `bouncy` (a clean overshoot), the
> cartoon curve **anticipates** — it dips ~4% *below* the origin before launching (the §L4
> "anticipation" principle made a curve), then overshoots ~30%, then settles. It is the motion
> half of the **Cartoon register** (see §Shadows → Cartoon, §L4). Reach for it only where the
> 1940s-technicolor punch is wanted (celebration, fission, hero arrival) — it is loud by
> design; the workhorse remains `snappy`. PRM collapses it to `--ease-standard` like every
> spring (§L5). The `linear()` value lands in §Easing → Spring curves.

*(This is THE keystone move: it converts "cartoon flow & punch" + "anticipation" from §L4 prose
the library disclaims into a token a primitive consumes — the design.md idiom. ONE row, ONE
curve, no new system.)*

### 2d. §L4 — RE-TIER (replace lines 107–138 wholesale)

> ### §L4 — Motion Tiers (Liquid Weight is universal)
>
> Disney's 12 principles are the canonical taxonomy for UI motion. **The library now ships
> substrate for all twelve** — the liquid-weight-universal law: every element may stretch,
> morph, anticipate, follow-through, overlap, arc, and squash/stretch with real **weight and
> inertia**. Motion that is tight, springy-without-weight, or linear-without-settle is the
> anti-pattern. The principles split into two tiers by *who orchestrates them*, not by whether
> we ship them:
>
> **Universal tier — every primitive shipping motion honors these.** (Was "strong" + the
> promoted "medium" — anticipation and follow-through are no longer scene-only.)
>
> | # | Principle | iOS-27 embodiment | Glass-ui substrate |
> |---|---|---|---|
> | 1 | **Squash & stretch** | Press → scale 0.96, bounce back; vol-preserving X·Y squish on move | `--scale-press` + `--spring-snappy` (§L3); `useLiquidFlex` |
> | 2 | **Anticipation** | A control dips before it launches; a sheet pulls back ~4px before sliding up | `--spring-cartoon` pre-dip (§L2); the `.liquid-enter` recipe |
> | 5 | **Follow-through / overlap** | Icon settles *after* its parent; a label cross-fades trailing the indicator glide | `--spring-*` per-element stagger via `useSpringOrchestrator` chaining |
> | 6 | **Slow in / slow out** | All non-spring motion decelerates | `--ease-standard` |
> | 9 | **Timing** | Tap < 250ms; transition 400–600ms; modal 500–800ms | `--duration-*` (§Duration) |
> | 10 | **Exaggeration** | Spring overshoot; pull-to-refresh elastic; the cartoon punch | `--spring-bouncy` / `--spring-cartoon` (§L2) |
> | 11 | **Solid drawing** | Glass depth conveys z; cartoon layered-offset shadow gives 2.5D pop | The §L1 seven-tier ladder + §Shadows Cartoon register |
> | 12 | **Appeal** | Distinctive personality — Liquid Glass refraction, blob/meatball morph, technicolor punch | `<Aurora>` + the meatball goo (§L1 cross-engine note) + the Cartoon register |
>
> **Scene-orchestrated tier — the consumer composes these from the universal substrate; the
> library *enables* them, no longer disclaims them.**
>
> | # | Principle | iOS-27 embodiment | How the library enables it |
> |---|---|---|---|
> | 3 | **Staging** | Backdrop dim + non-focal desaturate around a focal surface | `--glass-drawer-t → scrim/page-scale` coupling (the drawer-detent machinery); the consumer stages, the substrate provides the scrim+scale tokens |
> | 4 | **Straight-ahead vs pose-to-pose** | Gestures = spring (straight-ahead); transitions = keyframe | The §L2 spring-vs-ease rule decides per-motion |
> | 7 | **Arc** | A bud peels on a curved path; a morph travels an arc not a straight line | `useLiquidReveal` source-rect FLIP + the fission `--split-dx/dy` two-axis offset (a real arc, not a line) |
> | 8 | **Secondary action** | Icon-morph-while-badge-updates; the accent-flood that trails the indicator | `useSpringOrchestrator` chaining + the one-shot `--*-flood-t` accent-wash precedent |
>
> Every principle now names its substrate. The difference between the tiers is **orchestration
> scope** (one primitive vs a scene), not **whether the library ships it**. A primitive's spec
> names which principles it exercises and which spring register (§L2) carries the weight.

*(This is the re-tier the edict demands. The "weak — we don't ship these" paragraph is DELETED;
its three principles move to a "scene-orchestrated, substrate-enabled" tier each pointing at a
real extant mechanism — fission offsets are a real arc, the drawer scrim is real staging, the
accent-flood is real secondary-action. No prose lies remain.)*

### 2e. §Shadows → "Cartoon shadows (offset, layered)" — ELEVATE to a register (revise ~line 346)

> ### Cartoon shadows (offset, layered) — the Cartoon register
>
> The cartoon shadow is not just an elevation token — it is the visual half of the **Cartoon
> register** (its motion half is `--spring-cartoon`, §L2): the 1940s-technicolor reading where
> a surface pops off the page in bold, warm-tinted, layered offset planes and **punches** when
> it moves. The shadows are warm-tinted (`color-mix` against the warm-cream floor, **NEVER raw
> black** — the BA.W-NO-GRAY law applies to shadows too), three layered offsets per rung:
>
> *(token table stays — but the text below is corrected: it currently lies that these are
> `rgba(0,0,0,…)`; live they are `color-mix(in srgb, hsl(30 14% 90%) …)`. Fix the prose.)*
>
> A surface enters the Cartoon register by composing a cartoon shadow rung **with** the
> `--spring-cartoon` curve on its interactive transitions and the exaggerated `--scale-press` +
> snap-and-settle release — the shadow gives the 2.5D pop, the curve gives the flow & punch.
> `<CartoonCard>` / `.glass-cartoon` is the canonical carrier (§Glass Surfaces). The register is
> opt-in (loud by design); the default glass surface stays the calm six-layer composite.

### 2f. NEW §L6 — Aristotelian Proportion (insert as a peer precept AFTER §L5, before the §L cross-references block ~line 156)

> ### §L6 — Aristotelian Proportion
>
> Proportion is a governing axis, peer to glass and motion. **Nothing is arbitrary**: radii,
> spacing, padding, card width, and the type ladder derive from the golden section (φ ≈ 1.618)
> and its root (√φ ≈ 1.272), the same constant. The type ladder already obeys this (§Typography,
> √φ steps); §L6 extends the law to *all* dimensional tokens.
>
> **The proportion vocabulary.**
>
> - **Type** — the √φ ladder (`--type-*`), unchanged; it is the proven exemplar.
> - **Radius** — a φ/√φ-derived ladder: each radius rung is a √φ step, and **concentric**
>   nested radii subtract the gap (`r_inner = r_outer − gap`) so corners stay parallel (the iOS
>   concentric-radius law). The §Border Radius table is re-authored to the ladder (see below).
> - **Spacing / padding** — the canonical gaps step by √φ from a base (the spacing scale names
>   its φ-derivation in §Spacing); a card's padding and its corner radius share the proportion
>   so a card reads as one proportioned object, not assembled parts.
> - **Card width / measure** — long-form measure targets the golden ratio of its column; hero
>   stages target φ² of the body rung (the "bigger φ² stage" demo law).
>
> **Selection rule.** When a primitive needs a dimension, it reaches for the nearest φ-ladder
> token, never a hand-picked px. A new dimension that has no ladder rung earns a rung (named by
> its √φ index), not a magic number. Concentric surfaces (a chip in a card in a sheet) subtract
> gaps so every corner is parallel.
>
> **A11y carve.** Proportion is geometry, not motion or transparency — it has no PRM / reduced-
> transparency bracket; it holds identically across all a11y states. (This is why it is its own
> precept and not folded into §L1 or §L4.)

*(NEW precept. It is justified as a peer because proportion is orthogonal to glass/motion/a11y —
the four philosophy pillars' "orthogonal axes never collapse" doctrine. It cross-refs the type
ladder it already obeys and names the radius/spacing re-author.)*

### 2g. §Border Radius — re-author to the φ ladder (revise the table ~line 306)

The current ladder is arbitrary (4/6/8/12/16px). Re-derive from a base × √φ:

| Token | φ-derivation | Value (base 6px) | Use |
|---|---|---|---|
| `--radius-sm` | base | 6px | kbd, badge inner |
| `--radius-md` | base·√φ | ~7.6px → **8px** | medium |
| `--radius` / `--radius-lg` | base·φ | ~9.7px → **10px** | default, interactive *(matches live `0.625rem`)* |
| `--radius-xl` | base·φ·√φ | ~12.4px → **12px** | panels *(holds)* |
| `--radius-2xl` | base·φ² | ~15.7px → **16px** | cards, dialogs *(holds)* |
| `--radius-pill` | — | 9999px | pills (unchanged) |

> **Concentric rule.** Nested surfaces compute `--radius-inner = calc(var(--radius-outer) −
> var(--gap))` so corners stay parallel. The base × √φ ladder means most existing values are
> *already on or near the ladder* (the live `--radius` is `0.625rem`=10px=base·φ) — the
> re-author is a derivation re-statement + the concentric rule + the named φ-index, not a
> visual break. NO LEGACY: the arbitrary-px framing is retired.

*(Deft: the live values mostly already sit on a φ ladder — this is a re-derivation that makes
the proportion explicit + adds the concentric rule, not a disruptive renumber. KISS.)*

### 2h. §L1 cross-engine note + §L5 row — the meatball Chrome+Safari mandate (edict 5)

Add a sibling note to §L1's "Glass cannot sample glass" (~line 56):

> **Meatballing is cross-engine-perfect or it does not ship.** The blob↔meatball metaball merge
> (the goo carousel/deck/pager worm, dock fission necks) must read **identically in Chrome and
> Safari** — a hard gate. The mandate: a **static SVG `feGaussianBlur`+`feColorMatrix` goo
> filter** (`filter:url(#goo)` on the element, **never `backdrop-filter:url()`** — WebKit drops
> it), **sRGB color-interpolation** (`color-interpolation-filters="sRGB"` — WebKit's linearRGB
> default greys the necks), **compositor-only channels** (transform/opacity, the surface's OWN
> `filter` blur-settle is safe; a per-frame `backdrop-filter` re-blur is the fragile leg —
> gate it to one-shot windows), and **no naive ellipsoids** — a real metaball waist that thins
> and snaps, not two faded discs. `@supports` + PRM floors degrade to an instant topology swap.
> See IOS27-REFERENCE.md T2/T10 + the §7 Safari watch.

And add one row to the §L5 a11y/cross-engine brackets (it is the engine-bracket peer to the
three user-preference brackets):

| Bracket | Subsystem | Glass-ui behavior |
|---|---|---|
| `@supports not (filter: url())` / WebKit goo | Metaball goo filter | sRGB static SVG goo only; `backdrop-filter:url()` never; degrade to instant topology swap, zero neck frames |

*(Edict 5 is a *mandate statement*, not new machinery — the goo engine ships. design.md just
needs to STATE the cross-engine law as a binding precept-level rule, in §L1 + §L5, so every
viz/dock spec cites it. KISS.)*

---

## 3. The cross-engine + a11y/PRM carve (consolidated)

- **Springs incl. `--spring-cartoon`** → PRM collapses to `--ease-standard` (§L5, existing rule;
  the cartoon pre-dip + overshoot vanish — reduced-motion users get a calm decelerate).
- **Cartoon register shadows** → reduced-transparency leaves them (they are opaque offset
  planes, not glass) but reduced-motion freezes the punch curve.
- **§L6 Proportion** → no a11y bracket (geometry is invariant); stated explicitly so no one
  expects a PRM path.
- **Meatball goo** → the §L5 engine-bracket row above; `@supports`/PRM floors; sRGB; no
  `backdrop-filter:url`; compositor-only.

## 4. Delta-assay seed (proposed edicts vs current design.md text)

| Edict | design.md CURRENT says | Contradiction / gap | The amendment |
|---|---|---|---|
| (1) universal laws | §L4: weak tier "we don't ship anticipation/arc/secondary-action"; medium tier "not primitive-level" | DIRECT contradiction — design.md disclaims exactly what the edict mandates | 2c (cartoon spring) + 2d (re-tier; delete the disclaimer) |
| (2) cartoon register | §Shadows: cartoon shadows are *tokens* only; prose lies they are `rgba(0,0,0)` (live: warm `color-mix`) | under-claimed (token not register) + factual drift | 2c + 2e |
| (3) proportion | only §Typography is √φ; §Border Radius is arbitrary px; no proportion precept | MISSING governing axis | 2f (new §L6) + 2g (φ radius) |
| (4) ios27 canon | §L1 says "iOS-aligned"; no "match-or-better" mandate; no reference-doc citation law | under-stated (inspired vs canonical) | 2a + 2b |
| (5) meatball cross-engine | scattered in IOS27-REFERENCE + memory; NOT a design.md precept-level rule | absent as a binding precept | 2h |

**BD/union waves that ENCODE these (allies):** `BD.W-DOCK-SCROLL-FISSION` (T2 meatball),
`W-LIQUID-ENTRANCE-GENERAL` (T10 universal squish/anticipation), `BD.W-DOCK-TAB-INDICATOR`
(secondary-action accent-flood), `BD.W-DRAWER-DETENT-GLASS` (staging via scrim/scale),
`BD.W-CONCENTRIC-RADIUS` (the §L6 concentric rule), `BB.W-DISPLAY-TRACKING` (√φ type).
**Waves that CONTRADICT (to reconcile):** any wave still citing §L4's "weak tier" framing or
the "we don't ship arc/anticipation" disclaimer must be re-pointed at the new universal/scene
two-tier model; the `--scale-press-dock` live-0.96-vs-spec-0.92 drift (§Interactive States) is
a separate live-fix, flagged not folded here.

## 5. Convergence self-assessment (this lens)

The amendment is **small** (1 Philosophy line, 1 §L1 sentence, 1 §L2 row + curve, a §L4 re-tier,
a §Shadows elevation + factual fix, a NEW §L6, a §Border-Radius re-author, a §L1+§L5 cross-engine
note) and **idiomatic** (lives entirely inside the §L precept structure + cross-refs, zero
duplication, zero new system). The boldest move (`--spring-cartoon` + the §L4 two-tier collapse)
makes the user's two loudest edicts — liquid-weight-universal + cartoon flow&punch — into a
**token a primitive consumes**, which is the only way design.md's "name your precept vocabulary"
contract can carry them. Open question for GOLDEN: whether §L6 Proportion should also absorb a
**Spacing** sub-table re-author (the φ spacing scale) in the same pass, or defer that to the
`story-page-standard`/`page-chrome` Band-C greenfields (lean: name it in §L6, re-author the
table in Band C to avoid bloating design.md here).

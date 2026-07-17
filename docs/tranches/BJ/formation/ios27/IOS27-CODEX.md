# The iOS-27 codex — unified (A02/A03)

Distilled from the two Fable frame-by-frame passes over the full reference corpus (8 recordings,
148 frames @1fps, ~22 stills). Full marks: `MARKS-A.md` (June 20-22 arm) and `MARKS-B.md`
(June 22-24 + July arm). Digests with per-idiom evidence: `../round-2/ios27-codex-A.md` /
`ios27-codex-B.md`. This codex is the design authority the BJ greenfield and material waves cite;
the A03 triumvirate (research → harden → tranche-write, twice critiqued) builds on it.

## The material laws (what makes it read as glass)

1. **Progressive backdrop blur, never a slab** — blur+darken concentrates at the floated surface
   and falls off directionally (Spotlight V3/f-0004) or radially (the OpenAI F49/F50 glow pool);
   sheets grade blur+opacity continuously with height/detent (Maps V1/f-0008→0011, V3/f-0002→0008).
   Blur never appears without a co-applied luminance layer. → the --glass-halo-* adopt decision +
   the subtler-blur retune (families F/G).
2. **Adaptive content tint** — frost samples hue AND luminance from what's behind it, positionally
   (Find My blooms warm exactly under an orange avatar, V4/f-0011; the mini-player re-tints per
   card scrolled behind it, V2/f-0001→0012). The single property that separates glass from a grey
   card; glass-ui lacks it.
3. **Specular edge caustic, not a border** — a lower-weighted bright rim that carries iridescence,
   cycles hue on live surfaces (Siri V2/f-0006→0021), and lights up during motion (V1/f-0005).
   Plus the community spec verbatim (IMG_1881): lighter inner shadows, flatter-than-squircle tops,
   bright top+bottom rims, quiet sides. → asymmetric rim tokens.
4. **Radius as role grammar, concentrically nested** — circle=single tap-target, stadium
   pill=primary action/field/mode, card=content/popover container, squircle-tile=group-of-circles,
   tall capsule=slider; inner radius = outer − padding; a card never nests inside a pill
   (Control Center V1/f-0002-0003 is the Rosetta Stone). → the role-keyed radius table + gate
   that cures F09/F12/F15/F17/F45/F48.

## The motion laws (liquid weight made literal)

5. **Origin-anchored morphing** — panels grow from the source element's frame on one spring, inner
   controls fading up on the same spring (mini-player → Now Playing, V1/f-0022); navigation is a
   scaling card over a progressively-blurring destination, reversible mid-flight (V1/f-0028).
6. **The goo-morph nav layer** — tab-bar/mini-player/island states join by metaball necks, never
   crossfade (Dynamic Island merge, still 15.26.54; the sliding selection pill in Find My's tab
   bar, V4/f-0005→0013). → the dock greenfield's engine.
7. **Detent sheets** — grabber pill, spring-to-detent with overshoot, material opacity graded by
   height, sibling chrome fades by z-handoff (V3/f-0003→0008).
8. **Staggered reactive entry** — density fills top-down, rims glow while translating, morphs
   squash; no bare fades (V1/f-0005). → the discipline the feedback family (F20/F21/F22/F24) is
   held to.
9. **Axis-parametrized morph** — the napkin sketch (IMG_1880): a capsule growing along x, then y,
   then z on one shared spring. → extend useLiquidMorph to named x/y/z scalars.

## The identity laws

10. **The type ladder, no meta captions** — bold hero ≫ semibold row title ≫ grey secondary ≫
    caption, ONE accent color, section headers as bold+chevron; NO mono ALL-CAPS jargon anywhere
    in iOS (feeds the F15/F10 cure + the story copy canon). Light-glass (frosted popover, hairline
    rim, checkmark selection — 2026-06-23 still) is a first-class peer to dark.
11. **The restraint floor** — when nothing is focal, an ambient breathing background is the
    engagement floor (V4's Cowork frames); an editorial serif-display + mono-eyebrow voice is a
    deliberate identity glass-ui can offer beyond SF cloning (the house data-stories).
12. **Discrete progress as fill-pill + dots** — the F49/F50 segmented control: the filled pill
    grows and swallows the next dot; instantly legible, weighty. → the scroll-progress-rim/loop
    replacement model.
13. **The blob is liquid metal** — a 3D chrome metaball with a mobile pearlescent specular sweep,
    morphing pill↔orb↔dot-ring on a spring squash (Siri, V2/f-0004/0017/0019; the METAL FLOW
    stills). → the A12 blob greenfield's material target.

## To BEST iOS 27 (where we go past it)

- A provable radius grammar (table + lint) where iOS is consistent only by convention.
- True gradient blur across a single panel (sharp near-edge → soft far-edge) where iOS stacks
  approximations.
- Backdrop-sampled tint + edge caustics as first-class tokens, not hand-tuned per-surface.
- One goo-morph nav surface (dock ∪ pager ∪ sheet) driven by the single-scalar spring engine we
  already ship — iOS still crossfades between some nav states.
- The editorial serif/mono identity and the breathing restraint floor as shipped modes.

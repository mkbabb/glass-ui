# HC-a11y — W-A11Y-PERF born-RED witness verification (hc2, phase Verify)

**Lane** HC-a11y · **Date** 2026-06-09 · **Inputs** `NECESSITY-MATRIX.md §5`,
`research-necessity/glass-material.md`, `hardening/H-a11y-perf.md`,
`waves/AY.W-A11Y-PERF.md` — all read in full; every witness re-measured live at HEAD
(dist build FRESH: `dist/styles/glass.css` mtime 18:47 today > src 13:24).

**Verdict: GAPS-FOUND.** All three witnesses HOLD (two are WORSE than the spec
states); O-1…O-5 are all still OWED (zero partial landings); and the re-measure
surfaced THREE defects no corpus doc carries — an O-1 mechanism flaw (strict-ancestor
self-set no-op), a FALSE-GREEN pre-existing webkit gate the spec never reconciles, and
a LIVE shipped Firefox regression (the dedup-keep-prefixed trap, self-inflicted by the
library's own build).

---

## §1 — Witness 1: webkit prefix parity — HOLDS, and is WORSE than stated

**The spec's "1 webkit / 15 backdrop-filter" is a mention-count; the declaration truth
is 0 / 9.** `dist/styles/glass.css` ships **NINE** unprefixed `backdrop-filter:`
declarations (`:289,309,320,336,347` the five rungs; `:519` `.glass-card`; `:552`;
`:661` `.glass-btn`; `:690`) and **ZERO** `-webkit-backdrop-filter:` declarations —
the lone "webkit" hit is the `@supports not` CONDITION at `:1079`, not a painted rule.
The wave spec (`AY.W-A11Y-PERF.md:96-99`) does correctly note the lone hit is the
`@supports`; the headline numbers should be restated as declarations (0/9) since G2's
gate is declaration-parity, not substring counts.

**Full cascade declaration census** (decl / webkit-decl, dist at HEAD):
`glass.css 9/0` · `animations.css 1/0` · `floating-panel.css 1/0` ·
`hover-popover.css 1/0` · `instrument-chassis.css 2/0` · `utilities.css 2/0` ·
`drawer.css 2/1` (the W-GLASS hand pair, `src/styles/drawer.css:53` — the ONLY paired
cascade decl) · `glass-refract.css 1/0` (NEW since the spec's line-correction pass;
SAFE — its decl at `:57` sits behind `@supports (backdrop-filter: url("#glass-refract"))`,
gated on the UNPREFIXED form, so a webkit-only engine skips the enhancement rather than
trapping; G2's parity walk will still hit it and should expect/exempt or pair it) ·
`components.css` pairs webkit+plain on one minified Tailwind-emitted line (fine).

**NEW DEFECT (shipped, live) — the dedup-keep-prefixed trap is SELF-INFLICTED in
`dist/glass-ui.css`.** The SFC fold bundle (`@import "../glass-ui.css"` at
`dist/styles/index.css:140` — part of every `/styles` consumer's cascade) carries
8 webkit / 5 plain occurrences, and the Slider's hand-authored pairs
(`src/components/ui/slider/Slider.vue:205-206` and `:295-296` — source authors BOTH
forms) were deduped by the build's CSS minifier to **`-webkit-backdrop-filter`
ONLY**:

```
dist/glass-ui.css:  -webkit-backdrop-filter:var(--slider-range-blur,var(--glass-blur-quiet))   ← no unprefixed sibling
dist/glass-ui.css:  .slider-range[data-v-…]{-webkit-backdrop-filter:none;…}                     ← no unprefixed sibling
```

Firefox does not implement the `-webkit-backdrop-filter` alias → the Slider range
glass blur (and its spectrum-variant `none` reset) is broken on Firefox in the shipped
artefact TODAY. This is the exact failure mode the `glass.css:271-275` policy comment
documents for Tailwind/Lightning ("dedup-and-keep-prefixed") — now reproduced by
glass-ui's OWN vite pipeline against the SFC sources that violate the unprefixed-only
policy. It strengthens O-2a's single-source design (source unprefixed; build injects
pairs LAST, post-minification) and implies the hand-authored SFC pairs
(`Slider.vue:206,296`, `ContinuousRail.vue:89`) should be REMOVED at O-2a landing,
not kept as a parallel channel the minifier corrupts.

**NEW SPEC GAP — G2's walk scope misses the SFC bundle.** `AY.W-A11Y-PERF.md` G2
clause 1 says "Walks every `dist/styles/*.css` (not just glass.css — the
Slider/timeline SFC CSS folds in too)" — WRONG: the SFC CSS folds into
`dist/glass-ui.css`, one directory UP from `dist/styles/`, which the stated
`readdirSync(distStyles)` walk never reaches. Both O-2a (the injection pass) and G2
(the parity gate) must include `dist/glass-ui.css` or the Firefox regression above
survives a GREEN G2.

**NEW SPEC GAP — a pre-existing webkit gate is FALSE-GREEN and unreconciled.**
`proof:liquid-glass-material` clause 5 (`scripts/proof-liquid-glass-material.mjs:375-392`)
ALREADY asserts webkit presence over `dist/styles/glass.css` + `dist/glass-ui.css` —
via a bare substring regex `/-webkit-backdrop-filter/`. It is GREEN today because the
`glass.css` match is the `@supports` CONDITION at `:1079`: the clause passes with ZERO
painted webkit declarations. Its `gates.mjs:587` note claims "strip the dist prefix →
RED" — false; stripping every webkit decl leaves the condition matching, GREEN
forever. The W-A11Y-PERF spec nowhere names this gate; G2 must supersede or tighten
clause 5 (two gates asserting "the Safari prefix ships" with opposite verdicts on the
same artefact is the contradiction the bijection meta-gate cannot see).

## §2 — Witness 2: the W55 bucket is DORMANT — HOLDS exactly as stated

`--glass-backdrop: light` is engaged NOWHERE by default. The only setter anywhere is
the `:root` zero-delta default `--glass-backdrop: dark` (`tokens.css:926`). All 17
`src/` hits are `@container style()` READERS (`glass.css:371`; `dock/morph.css:219,238`)
plus comments; `demo/` → zero; `/Users/mkbabb/Programming/slides/src/` → zero.
`--glass-backdrop-luma` remains mint-only-empty (`tokens.css:927`), zero consumers
(the §4.5 RETIRE-or-RESERVE disposition still open). `proof:adaptive-glass` runs
GREEN (structure arms only — it locks the mechanism, not engagement, consistent with
the dormancy).

## §3 — Witness 3: specular rAF thrash — HOLDS verbatim, per-event not coalesced

`src/composables/glass/useSpecularTracking.ts` (65 lines, unchanged): fresh
`matchMedia("(prefers-reduced-motion: reduce)")` minted PER pointermove (`:42` via the
`:51` call); `target.getBoundingClientRect()` PER event (`:54`); inline
`--mouse-x/--mouse-y` write (`:58-61`); return `:64`; the ":25 'no reflow'" docstring
contradiction intact. NO `requestAnimationFrame` anywhere under `src/composables/glass/`
(grep → 0). Consumers at HEAD: `Card.vue:134` (gated on `specularArmed` =
`surface === "glass" && specular !== "off"`, `Card.vue:92` — armed by default on glass
Cards) + `DockIconButton.vue:70` (unconditional). The W-GLASS rest-intensity-0 opt-in
reduces the PAINT cost at rest but not the per-event layout-read + matchMedia-mint
cost, which fires on every armed hover sweep. O-3's line table is exact at HEAD.

## §4 — O-1…O-5 accurate-and-owed audit

| O | Owed? | Edit-site accuracy at HEAD | Notes |
|---|---|---|---|
| O-1 | OWED — no surface carries the bucket | glass.css `:333/:344/:511`, `shell.css:16`, `morph.css:219,238` ALL EXACT; **STALE** `tokens.css:906` → actual `:926` (and the rejection-rationale cite `:867-868` → actual `:888`; tokens.css shifted +20 lines in Batch-2, mtime 18:09 today) | **MECHANISM DEFECT — see §5** |
| O-2 | OWED — no injection pass, single-guard `@supports` at `:1079` | `vite.style-assets.ts` closeBundle `:294` ✓, cpSync `:302-305` ✓ (spec says :303-305), 380 lines ✓ | must widen scope to `dist/glass-ui.css` + reconcile `proof:liquid-glass-material` clause 5 + strip the SFC hand pairs (§1) |
| O-3 | OWED | `:25/:35-43/:42/:48/:51/:54/:58-61/:64` ALL EXACT | — |
| O-4 | OWED — `.glass-card` `contain: layout style` (no `paint`) at `:523`; `.glass-btn` (`:540`,`:660-661`) and `.glass-dock` shell carry NO `contain`; `tests-visual/{specular-coalesce,nested-backdrop-budget}.spec.ts` + `scripts/proof-webkit-backdrop.mjs` ALL ABSENT | anchors drifted: `proof:adaptive-glass` now `package.json:676` (spec says :664), gates.mjs row `:722` (spec says :704) — "beside" anchors still resolve | the only `contain:*paint` in the repo is `utilities.css:347` (scroll-timeline, unrelated) |
| O-5 | OWED — `proof-dark-semantic-contrast.mjs` still computes `contrastRatio(inkRgb, cardRgb)` vs SOLID `--card` (`:243-249`; floors `:47-49` ✓) | spec's ":242-243" → actual `:243-244`, immaterial | **the live run PASSES at EXACTLY 4.6:1 over solid `--card` (floor 4.6, ZERO headroom)** — any translucent-plate page-bleed compositing drops it below floor, so the re-derived oracle is GUARANTEED born-RED and WILL force the dark-destructive ink lift the spec's G5 successor-clause anticipates. The false-assurance state is not hypothetical; it is floor-exact today. |

Also verified accurate: `adaptive-glass.spec.ts` canary `:327-356` ✓, KINDS `:242`
(3 rungs — wash/quiet still unmeasured, glass-material §4.3 C6) ✓, translucency assert
`:314-321` ✓; `button/index.ts:34-35` glass default ✓; rung decls `:289/309/320/336/347` ✓;
policy comment `:271-275` ✓; bucket `:371-382` ✓; flip `:384+` ✓; hand pairs
`Slider.vue:206,296` (spec says :295 — off by one) + `ContinuousRail.vue:89` +
`drawer.css:53` ✓; `useGlassRenderer.ts:204` JS-side pair ✓.

## §5 — NEW DEFECT: O-1 as specced is a strict-ancestor NO-OP for the surface itself

The W55 bucket is read via `@container style(--glass-backdrop: light)` — a STYLE
query, which evaluates against the element's nearest ANCESTOR query container (its
parent), NEVER the element's own declaration. The corpus itself records this contract
(PROTO-adaptive-glass strict-ancestor; glass-material §4.8 even prescribes the
negative-control arm "bucket set ON the rung itself must no-op"). The dock block's own
prose says it fires "when a consumer marks `--glass-backdrop: light` on the dock's
ANCESTOR" (`morph.css:208`), and its selector targets `.glass-dock` itself
(`morph.css:219-225`), as does the rung block (`glass.css:371-382` → `.glass-material,
…, .glass-card`).

O-1's edit-site table directs the implementer to "set `--glass-backdrop: light` as the
library default ON the overlay-band tiers + `.glass-card`" (`glass.css:333/:344/:511`)
and "on `.glass-dock`" (`shell.css:16`). A self-set:

- does NOT engage the surface's OWN bucket block (its parent still computes `dark`);
- DOES engage every DESCENDANT glass surface (the property inherits, so the card's
  buttons darken while the card does not) — a half-engaged, visually incoherent state.

So the spec's O-1, executed as written, lands a no-op-for-the-named-surface default;
G1 would go RED post-implementation, but the spec aims the edit at the wrong element.
The fix must put the bucket one level UP from the rung element (the Dialog/Sheet
portal-wrapper or overlay host, the dock's positioning wrapper — component-template
edits, not rung-CSS edits) OR add a non-container self-arm to the bucket blocks (e.g.
an attribute-gated duplicate of the tint re-point: `.glass-overlay[data-glass-backdrop="light"]`
beside the `@container` arm). Either way the edit-site table and O-1's mechanism prose
need re-derivation BEFORE a build agent runs — this is a spec-hardening item for the
W-A11Y-PERF spec owner (this lane is Verify; no spec edited).

## §6 — Disposition

- Witnesses 1/2/3: VERIFIED-HOLDING (1 is worse-than-stated; restate as declaration
  counts 0/9).
- O-1…O-5: ALL still owed; zero partial landings at HEAD (no rAF, no `contain: paint`,
  no gates, no bucket setters, oracle unmodified).
- Three NEW items for the spec owner before dispatch: (1) §5 the O-1 strict-ancestor
  no-op — re-derive the edit sites; (2) §1 widen O-2a/G2 to `dist/glass-ui.css` +
  supersede `proof:liquid-glass-material` clause 5 (false-green substring regex) +
  strip the SFC hand pairs; (3) the LIVE Firefox slider-blur regression
  (`dist/glass-ui.css` webkit-only decls) — fixed for free by (2), worth a line in the
  wave's defect ledger since it ships today.
- Two stale spec cites to refresh on the next line-correction pass: `tokens.css:906`
  → `:926`, `:867-868` → `:888` (Batch-2 shifted tokens.css +20; all glass.css cites
  remain exact).

# AT.W0b — C5: cross-tranche + overfitting hardening of the AUGMENTED AT set

**Lens C5.** The integration lens. Where A1–A6 argued the blob/aurora forward and
B1–B6 argued the dock forward — each within its own silo — C5 sits ABOVE both and
asks the one question neither silo can: **with everything the W0b waves added, is
AT still ONE coherent tranche, or has it accreted into two (or three)?** And under
that question: does every NEW artefact the augmented set proposes still clear the
≥2-distinct-consumer bar; are the cross-repo name-forwards (value.js K.W3 blob
consume, the `/color`/ColorResolver supply, the precepts pin) still clean under
inv-16; and is **3.3.0** still the right version with the added scope.

This lens does NOT re-derive the blob design or the dock design — A* and B* own
those. It does NOT relitigate WHETHER to lift (L5/L6/A6 settled it). It takes the
W0b proposals as INPUTS and stress-tests their **aggregate coherence**. Built ON
`AT.md`, `W0-L4` (the ledger), `design/AT.W1`, and the twelve W0b files — every
claim file:line-cited; SOTA flagged knowledge-vs-web.

Severity legend (inherited): **S1** ships-broken/blocks · **S2** ships quietly
wrong on a real path · **S3** hygiene/scope/overfit-risk · **S4** record accuracy.

---

## §0 — Executive: the five cross-tranche verdicts

| # | Question | Verdict | Severity | The move |
|---|---|---|---|---|
| **C5-1** | Is AT now too big / incoherent — should it SPLIT? | **YES, ONE split** — the dock-DESIGN expansion (B1/B2/B3 magnify + rail-indicator + motion-fidelity) is a SECOND blast-radius gestalt with its own ≥2 story; it must NOT ride AT. The dock-CORRECTNESS (B6) stays (it's the W7 silent-no-op fold AT was seeded by). The blob+color+aurora-quality+correctness core stays as AT. | **S2** | open successor **AU** = "dock interaction/design/motion/a11y"; AT keeps ONLY dock CORRECTNESS (strictTemplates + state-machine spec + VT-fork + overflow-collapse + aria/doc-rot) |
| **C5-2** | Does every NEW augmented artefact meet ≥2-distinct-consumer? | **MOSTLY — three fail and must be re-tagged or cut**: the headless-WebGL HARNESS (A6-4, infra not a primitive — exempt but must be SCOPED to one wave); the `/color` leaf (≥2 met — aurora + blob default — but A5 correctly shrinks it); `useDockMagnify` (B1, ≥2 NOT met → BOOK to AU); the rail sliding-indicator (B2, rides existing rail = OK); `oklchToGammaRgb` (new helper, ≥2 by construction). | **S2** | a per-artefact ≥2 ledger (§3) is the W8 overfitting-audit input; magnify + dock-motion-spring tokens BOOK-to-AU unless their ≥2 lands |
| **C5-3** | Are the cross-repo name-forwards still clean under inv-16 with the added scope? | **ONE NEW LEAK RISK** — the A5/A6 `/color` extraction + value.js `defaultBlobColorResolver` consume creates the C3 value.js↔glass-ui dev-symlink CYCLE the ledger never named; the precepts-pin advance is unchanged USER-DOMAIN; the 3.3.0 publish is unchanged. The cycle is the only NEW inv-16 surface and it needs a `proof:*` acyclic gate. | **S2** | `proof:color-acyclic` (A6-3.a) is a BINDING inv-16-hygiene gate, not optional; the value.js K.W3 supply-its-own-resolver name-forward is RE-AFFIRMED as the clean path (value.js need never import `/color`) |
| **C5-4** | Is 3.3.0 vs a bigger version right with the added scope? | **3.3.0 IS RIGHT for the AT-core** (all additive subpaths + correctness = minor; SemVer reflects highest change-type, not feature-count — web-confirmed). BUT the dock-DESIGN a11y break (`aria-pressed`→`aria-selected` on the rail, B2/B4) is a **consumer-visible semantic change** that belongs in AU, and the overflow `wrap`-DELETE is a clean break — both reinforce the C5-1 split. | S3 | AT = **3.3.0** minor; the rail-aria clean-break + magnify ships in **AU** (its own minor/major call made at AU-plan); keep the breaking-ish dock work OUT of the additive-minor AT |
| **C5-5** | Is the wave SEQUENCE coherent post-augment? | **NEEDS RE-SHAPE** — the W0b waves proposed FOUR overlapping new dock waves (W4.5/W6.5/W7.D/W7-dock) + a W2b aurora slice + a WebGL-harness wave, all bolted onto a 9-wave plan. Left as-is, W6/W7 become unbounded grab-bags. The fix is the C5-1 split (dock-design exits) + folding the survivors into NAMED lanes, not new half-numbered waves. | S3 | the §6 re-shaped sequence: AT stays 9 waves, dock-design → AU; W2b folds into W2/W5; the harness is a W2 sub-slice (gates W2 AND W5) |

**The one load-bearing finding:** the augmented set is TWO gestalts wearing one
tranche letter. The **blob/color/aurora-quality/correctness** gestalt (A* + B6) is
coherent, file-disjoint-internally, and is AT. The **dock interaction/design/
motion/a11y** gestalt (B1/B2/B3/B4 — magnification, the rail sliding indicator,
spring-fidelity unification, the APG-tabs a11y rebuild) is a SEPARATE coherent
redesign with its own ≥2 story (the dock is consumed by 4 repos — B6 §5) and its
own clean-break version implication (the rail-aria swap). **AT must keep the dock
CORRECTNESS fold (B6: the verification-fabric debt the W7 silent-no-op exposed) —
that is the AS-residual the user already ruled into AT — and name-forward the dock
DESIGN expansion to a successor AU.** This keeps both gestalts coherent and keeps
AT's blast-radius the one thing the whole plan was built to protect.

---

## §1 — The split analysis: is AT one tranche or two?

### §1.1 — The blast-radius test (the L6/A6-1 lens, applied to the WHOLE set)

L6 §4 and A6-1 fought over whether the WebGL substrate extraction was too much for
one wave. That argument is settled (A6-1.a: extract-now wins on the ≥2-the-moment-
both-consume logic). But the SAME blast-radius discipline, applied to the AUGMENTED
SET, surfaces a bigger fault line. Map every W0b proposal to its **blast surface**:

| W0b proposal | Touches | Blast surface | Gestalt |
|---|---|---|---|
| A1 derivative-AA / smin / fbm (→W5) | `metaball.frag.ts` | new file (lifted) | **BLOB** |
| A2 in-shader OKLab GLSL (→W5) | `metaball.frag.ts` + new shared GLSL | new + the W5 shader | **BLOB** |
| A3 `useWebGLCanvas` perf (→W2) | new substrate + aurora `runtime.ts` | aurora (watched) | **BLOB/aurora** |
| A4 W2b dither/OKLab-LUT/steering | `aurora.frag.ts` + `color.ts` | aurora (watched) | **BLOB/aurora** |
| A5 `/color` re-scope + gamma pin | `color.ts` → `/color` leaf | aurora re-export + new subpath | **BLOB/color** |
| A6-4 headless-WebGL harness | new test infra | CI/test only | **BLOB infra** |
| B6 strictTemplates / state-spec / VT-fork / overflow / aria / doc-rot | `tsconfig`, `GlassDock.vue`, `useDockState.ts`, `useLayerTransition.ts`, `dock.css`, CLAUDE.md | **dock + the whole template-check fabric** | **DOCK-correctness** |
| B1 `useDockMagnify` + glass-affordances + press-scale | new composable + `dock.css` + every `DockIconButton` | **dock visual surface** | **DOCK-design** |
| B2 rail sliding-indicator + APG-tabs aria | `DockLayerGroup.vue` + `dock.css` + rail template | **dock visual + a11y semantics** | **DOCK-design** |
| B3 spring-fidelity + micro-feedback + will-change | `tokens.css` + `dock.css` + `view-transition.css` | **dock motion across all controls** | **DOCK-design** |
| B4 APG-tabs a11y rebuild + reka-ui Tabs adoption | `DockLayerGroup.vue` rebuild + `dock.css` | **dock a11y semantics (breaking-ish)** | **DOCK-design** |

**Two clusters, cleanly separable:** everything above the B6 line is the
**blob/color/aurora** gestalt — a coherent "lift the WebGL primitive + pay down the
shared-WebGL/color debt + nudge aurora quality on the open shader." It is internally
file-disjoint enough to parallelize (the plan's W2∥W3, W6∥blobs structure already
proves this). Everything from B1/B2/B3/B4 is the **dock-design** gestalt — a
coherent "make the dock a SOTA interaction surface (magnify, moving rail indicator,
spring motion, APG-tabs a11y)." It touches the dock's VISUAL + SEMANTIC surface
across nearly every dock component.

B6 (dock-CORRECTNESS) straddles: it touches the same files as B1–B4 but its CONTENT
is verification-fabric (strictTemplates, state-machine coverage, the VT race, the
overflow clean-break) — the AS-residual the user ALREADY ruled into AT
(`AT.md:104,168` book the overflow-collapse + the binding-guard). B6 STAYS in AT.

→ **C5-1 (S2): AT splits along the B6/B1 line.** AT = blob + color + aurora-quality
+ ALL correctness (incl. dock-correctness B6). A successor **AU** = the dock-design
expansion (B1 magnify, B2 rail indicator, B3 motion-fidelity, B4 APG-tabs a11y).
The split is NOT arbitrary — it follows the gestalt boundary AND the version
boundary (C5-4: AU carries the consumer-visible rail-aria break; AT stays purely
additive). **Gate:** `AT.md §Wave sequence` carries ONLY the B6 dock slices in
W6/W7; a new `docs/tranches/AU/` stub records the dock-design fold with its named
≥2 trigger; the AT close audit confirms no B1/B2/B3/B4 design artefact landed in AT.

### §1.2 — Why NOT keep it all in AT (the "9 waves can hold it" counter, refuted)

B2 §7, B3 §7, B4 §10 each argue their dock work "folds into W6/W7" and keeps the
9-wave shape. Individually each is defensible. **In aggregate they are not** — three
independent lenses each proposing "just fold mine into W6/W7" is exactly how a
correctness wave becomes an unbounded grab-bag. Count what W6/W7 would carry if ALL
fold:

- **W6** (correctness) would carry: `proof:vueuse-free-root` + DataTable, peer-dep
  fix, keyframes matrix, supportsPostTask, R4/R6 — PLUS B6's strictTemplates +
  state-machine spec + VT-fork reconcile — PLUS B3's spring-fidelity "lane" — PLUS
  B4's W6.5 a11y wave. That is SIX distinct sub-themes in one wave.
- **W7** (slipped ships) would carry: Fraunces, control-size vocab, π/ι — PLUS the
  overflow-collapse — PLUS B1's `W7.D` magnification design slice — PLUS B2's rail
  indicator — PLUS B4's rail-aria break.

A wave whose gate is "all of these green" is not gateable atomically — a failure
gives no signal about WHICH theme broke (the exact A6-6.b critique of bundling
frost-delete into the parity gate, scaled up). The 9-wave shape is preserved ONLY
by the split: dock-DESIGN exits to AU, and the dock-CORRECTNESS survivors fold into
NAMED LANES within W6/W7 (so each has its own gate line), not as new half-numbered
waves. **The "it fits in 9 waves" claim is true only after the split makes it true.**

### §1.3 — The dock-correctness/dock-design seam is the ONE risk the split introduces

The honest cost of the split: B6's dock-correctness (AT) and B1–B4's dock-design
(AU) touch the SAME files (`GlassDock.vue`, `DockLayerGroup.vue`, `dock.css`). A
naive split creates a double-touch — AT edits `GlassDock.vue` for the overflow
clean-break + strictTemplates fallout, then AU edits it again for magnify + aria.
B4 §10 flagged this ("land W6.5's `GlassDock.vue` template+aria edits and W7's
prop-collapse in one coherent dock pass to avoid a double-touch").

The resolution is **sequencing, not merging:** AT's dock-correctness lands the
STRUCTURAL + VERIFICATION layer (the prop model, the strictTemplates gate, the
state-machine spec, the VT-fork decision) — which is the FOUNDATION AU's design
work builds on. AU then lands the DESIGN layer on a verified, prop-collapsed,
strict-templated dock. This is the right order: you cannot safely add `useDockMagnify`
+ the APG-tabs rebuild to a dock whose template-check is loose and whose state
machine has 0% coverage (B6-1, B6-10). **The split makes AU SAFER, not just AT
smaller** — AU inherits the verification fabric AT installs. → Record in both plans:
AT.W6/W7 dock work is the PREREQUISITE for AU; AU does not re-open what AT verified.

---

## §2 — The per-artefact ≥2-distinct-consumer ledger (the C5-2 audit)

Every NEW artefact the augmented set introduces, tagged against the ≥2-distinct-
consumer-CONTEXT bar (≥2 repos/surfaces, not 2 call-sites in one demo — MEMORY
`feedback_overfitting_audit`). This is the W8 overfitting-audit INPUT, pre-computed.

| Artefact (W0b origin) | Kind | ≥2 status | Disposition |
|---|---|---|---|
| `useWebGLCanvas` (A3/W2) | internal substrate | **MET** — aurora + goo-blob both consume AT THE WAVE IT LANDS (A6-1.a) | **AT-W2** — the ≥2 is by-construction; close audit confirms both consume it |
| headless-WebGL harness (A6-4/W2+W5) | test infra | **EXEMPT** (infra, not a shipped primitive) — but must be SCOPED to one wave or it sprawls | **AT-W2 sub-slice** — gates aurora re-fold (W2) AND D1 shader (W5); not a standalone wave |
| `/color` subpath leaf (A5/W2) | public subpath | **MET** — aurora bake (`oklchToLinear`) + blob default (`oklchToGammaRgb`); A5 §5 shrinks it to the true generic surface | **AT-W2** — ship SHRUNK (no `deriveAurora`/`AuroraHarmony`; those stay on `/aurora`) |
| `oklchToGammaRgb` (A5/W4) | new color helper | **MET by construction** — the seam needs it (gamma triple) + it's the §2 faithful-lift requirement | **AT-W2/W4** — extract from the buried `oklchStopToHex` gamma path |
| `defaultBlobColorResolver` (W1/W4) | opt-in export on `/color` | **MET** — value.js (consume) + glass-ui demo story (supply); the seam IS the ≥2-shaping move | **AT-W4** — gamma-returning (A5 §2), value.js reach opt-in |
| `ColorResolver` type (W1/W4) | public type | **MET** — exported public type clears the export-bar arm | **AT-W4** |
| `/goo-blob` subpath | public subpath | **EXPORT-BAR only** — ONE real consumer (`HeroBlob`) + ONE self-authored demo (A6-5) | **AT-W4** — record as `export + 1 real + 1 demo`, NOT "≥2 met" (A6-5 honesty) |
| `/watercolor-dot` subpath | public subpath | **MET decisively** — 10+ value.js sites (1 ctx) + glass-ui demo (2nd ctx) (A6-5) | **AT-W3** |
| `src/utils/prng.ts` (W1/W3) | private leaf | **MET (internal bar)** — goo-blob satellites + watercolor vertices = 2 internal consumers (A6-6.d) | **AT-W3** — private; internal-≥2 is the correct bar |
| in-shader OKLab GLSL pair (A2/A4/W5) | shared GLSL primitive | **MET by construction** — goo-blob D1 (W5) + aurora LUT (W2b D-2) (A4 §4.3) | **AT-W5** — the ≥2 is the W2b D-2 ride; if W2b D-2 is cut, this is 1-consumer → still OK (goo-blob owns it, aurora-share is the bonus) |
| W2b dither / OKLab-LUT / steering (A4) | aurora-internal quality | **EXEMPT** — improves an EXISTING shipped consumer (aurora); no net-new substrate (A4 §6) | **AT-W2/W5** — fold; NOT a fresh-≥2 candidate |
| **`useDockMagnify` (B1)** | new composable | **NOT MET** — B1 §3.3 itself flags the ≥2-context story as "thin … benefits every dock but no consumer has *asked*" | **BOOK → AU** — ships in AU only if ≥2 dock consumers want magnify; else stays BOOK |
| **rail sliding-indicator (B2)** | dock-internal design | **MET (rides existing)** — the rail is ≥2-consumed (B6 §5: 4 repos); the indicator improves a shipped surface | **AU** (design gestalt) — not AT; ≥2 is fine, the SPLIT is about gestalt not ≥2 |
| **dock spring tokens `--dock-resize-spring` etc (B3)** | new tokens | **MET (rides existing)** — dock motion is ≥2-consumed | **AU** (design) — token additions ride the dock-design wave |
| **APG-tabs rail aria rebuild (B2/B4)** | a11y semantics | **MET (rides existing)** — but it's a consumer-VISIBLE break (C5-4) | **AU** — the break lands in AU, not the additive-minor AT |
| `proof:strict-templates` / `checkUnknownProps` (B6-1) | gate + tsconfig | **EXEMPT** (gate infra) | **AT-W6** — the keystone correctness gate |
| `proof:color-acyclic` (A6-3.a/C5-3) | gate | **EXEMPT** (gate infra) | **AT-W2** — the inv-16 cycle guard |
| `proof:blob-value-free` source-graph (A5-2) | gate | **EXEMPT** (gate infra) | **AT-W4** — two-tier inv-K-3 |
| `proof:doc-consistency` (B6-7) | gate | **EXEMPT** (gate infra) | **AT-W7** — folds into ι sweep |
| dock state-machine spec (B6-10) | test | **EXEMPT** (test) | **AT-W6** — the REAL binding-verification gate |

**The three that FAIL or need re-tag:** (1) `useDockMagnify` — fails ≥2, BOOK to AU
(B1's own admission); (2) `/goo-blob` — export-bar-only, must be RECORDED as such,
not dressed as ≥2 (A6-5); (3) the rail-aria + spring-token + indicator design work
— each MEETS ≥2 (the dock is ≥2-consumed) but belongs in AU by GESTALT + VERSION,
not because ≥2 fails. **The overfitting bar is not the split criterion for the dock
design — the dock is genuinely ≥2-consumed. The split criterion is blast-radius
gestalt + the version-break boundary.** State this precisely so the AU plan doesn't
mis-cite "overfitting" as the reason it's separate.

→ **C5-2 (S2):** the §2 ledger is the binding W8 overfitting-audit input. Two
honesty gates: `/goo-blob` reads `export + 1 real + 1 demo` (NOT ≥2); `useDockMagnify`
does not ship in AT (BOOK). The infra/gate rows are EXEMPT (correctly — a `proof:*`
script is not a consumer-bearing primitive). **Gate:** the W8 overfitting audit
runs the §2 table and FINAL distinguishes export-pass from ≥2-pass per artefact
(the W7-c discipline already owed to `deriveAurora`).

---

## §3 — The cross-repo name-forwards under inv-16 (the C5-3 audit)

AT is glass-ui-internal; every cross-repo item is name-forward (records, does not
absorb). The augmented scope adds ONE new cross-repo surface. Audit all of them:

### §3.1 — value.js K.W3 blob consume (UNCHANGED — clean)

value.js K.W3 deletes its demo blob impls, imports `@mkbabb/glass-ui/goo-blob` +
`/watercolor-dot`, and supplies its OWN `ColorResolver` (its color core). BLOCKED
until AT publishes (W8). The augmented scope does NOT change this — value.js still
supplies its own resolver; it need NEVER import `/color`. **Re-affirmed clean.**
The only augment: value.js's adoption is now the load-bearing test of A6-5's
"book-if-stalls" clause — if K.W3 does not adopt within a bounded window, goo-blob's
real-consumer count stays at 1 and FINAL must name the lift as "moved value.js's
demo primitive to a shared home" (a legitimate motive, named honestly).

### §3.2 — the `/color` extraction + value.js↔glass-ui CYCLE (NEW RISK — the C3 finding)

This is the one NEW inv-16 surface the augmented set introduces, and the ledger
(W0-L4) predates it. A5 §0.3 + A6-3.a name it: hoisting the value.js-backed color
core into a `/color` subpath, where `defaultBlobColorResolver` internally calls
value.js's `parseCSSColor`, creates **value.js → glass-ui/color → value.js**. In the
PUBLISHED dist this is fine (value.js is a Rollup `external` — A5 §4.1 — peers
resolve at the leaf). But in the **symlinked-monorepo dev layout** the cohort uses
(MEMORY `project_publish_ci_broken`, `project_ci_monorepo_layout_cascade`), a
`file:`-linked value.js consuming a `file:`-linked glass-ui that imports value.js is
the exact cycle that has bitten `proof:*` gates TWICE (per the MEMORY note: "fixing
a repo's npm-ci/lockfile unmasks proof:* gates that assume the sibling layout").

The clean inv-16 resolution has THREE parts:
1. **value.js never imports `/color`** (re-affirm §3.1): value.js K.W3 supplies its
   OWN resolver, so the dev-layout cycle does not arise FROM value.js's side. The
   cycle risk is glass-ui-INTERNAL (does `/aurora`'s dev resolution of `/color`,
   which imports value.js, cycle when value.js is `file:`-linked AND consuming
   glass-ui?). This is the C3 concern A6-3.a confirmed.
2. **`proof:color-acyclic`** (A6-3.a) is BINDING, not optional — it asserts
   `@mkbabb/glass-ui/color` introduces no value.js↔glass-ui cycle that breaks
   `file:`-link resolution. This is an inv-16-HYGIENE gate (it protects the
   cross-repo dev contract), so it is AT-internal AND cross-repo-protecting.
3. **The chunk-vs-inline decision** (A6-3.a hazard 3) must be RECORDED — is `/color`
   a real chunk or inlined into `/aurora` + the blob default? The answer changes the
   cycle surface (an inlined `/color` means value.js's literal appears in `/aurora`
   only, which A5 §4.1 verified is already the sole dist site — so inline KEEPS the
   one-door property; a real chunk adds a `/color` door).

→ **C5-3 (S2):** `proof:color-acyclic` is a BINDING AT-W2 gate (the `/color`
extraction's inv-16 cost). The cleanest mitigation A5 §5 + A6-3.a both point at:
keep `/color` SHRUNK (only the 2 seam functions + the resolver) so it's a tiny leaf
that Rollup can inline, preserving the "value.js appears in exactly one dist chunk"
property A5 §4.1 verified. **Gate:** `proof:color-acyclic` green in the dev-symlink
layout; the chunk-vs-inline decision + the `/aurora` gzip delta recorded; value.js
K.W3's "supply own resolver" path re-affirmed in the AT FINAL name-forward.

### §3.3 — the π visual-evidence precept pin (UNCHANGED — USER-DOMAIN)

The augmented set ADDS visual-evidence demand (A6-4's golden harness, A4's dither
visual-confirm, B3's side-by-side morph capture). All of these are glass-ui-INTERNAL
applications of the π protocol (the `baseline|close/` + `DELTA.md` convention AT
adopts W7-side). The shared `docs/precepts` PIN advance stays USER-DOMAIN
(W0-L4 #44) — forbidden to touch while the submodule is dirty (` m docs/precepts`
at HEAD). The augment does not change the perimeter: AT adopts the precept
glass-ui-side; the pin advance is the user's. **Clean.**

### §3.4 — the dock-design AU successor + cross-repo dock consumers (NEW, clean)

The C5-1 split creates AU (dock-design). AU's cross-repo perimeter: the dock is
consumed by bbnf-buddy, speedtest, value.js (B6 §5). The rail-aria break (B2/B4)
is a consumer-visible change — but inv-16 holds: AU writes only glass-ui; the
consumers adopt the new aria on their own arms (the `aria-pressed`→`aria-selected`
swap is a strict a11y improvement they inherit, no action required unless they
asserted on the old role). **Clean — record in the AU stub, do not absorb.**

### §3.5 — the inv-16 verdict

The augmented set adds exactly ONE new cross-repo risk: the `/color` dev-symlink
cycle (§3.2), closed by `proof:color-acyclic` + the shrink-and-inline posture.
Everything else (value.js K.W3, the precepts pin, the dock consumers) is unchanged
or cleanly name-forward. **inv-16 holds for the augmented AT, contingent on the
acyclic gate being BINDING.**

---

## §4 — The 3.3.0-vs-bigger version call (the C5-4 audit)

### §4.1 — For the AT-CORE: 3.3.0 is correct (web-confirmed)

SemVer reflects the HIGHEST change-type, not the feature COUNT — "two big API
changes and ten new features won't bump 1.0.0 to 3.10.0 … your version will simply
jump to 2.0.0" ([semver.org](https://semver.org/);
[AWS DevOps blog](https://aws.amazon.com/blogs/devops/using-semantic-versioning-to-simplify-release-management/)).
The AT-core ships:
- 3 NEW additive subpaths (`/goo-blob`, `/watercolor-dot`, `/color`) — additive.
- aurora-quality nudges (W2b) — additive (the dither/LUT change OUTPUT but not API;
  A4 rebases the byte-parity gate, not the contract).
- correctness gates (`proof:vueuse-free-root`, `proof:peer-optional`, strictTemplates,
  state-machine spec) — internal/additive.
- the `optionalPeerDependencies`→`peerDependenciesMeta` fix — this is a
  packaging-CORRECTNESS change; it does NOT change what's required (the non-standard
  key already made every peer required by being ignored), so it's a fix, not a break.
- the GlassDock `overflow` `wrap`-DELETE (B6-4) — `wrap` has ZERO consumers (B6 §2),
  so deleting it breaks NO ONE. A zero-consumer removal is not a SemVer-major trigger
  (no consumer can observe the break). Clean-break-with-no-consumer = additive-safe.

Every AT-core change is additive or zero-consumer-correctness → **3.3.0 minor is
exactly right.** The feature breadth (blob + color + aurora-quality + correctness)
does NOT push it to a major; SemVer doesn't count features.

### §4.2 — The dock-DESIGN work has a version implication that reinforces the split

The rail-aria rebuild (B2 §2, B4-1: `aria-pressed`→`aria-selected`/`role=tab`) is a
**consumer-OBSERVABLE semantic change**. A consumer that queries/tests the rail by
`aria-pressed` (or styles `[aria-pressed]`) would observe the change. It's a strict
IMPROVEMENT (the old `aria-pressed` was the WRONG vocabulary — B4-1), so it's
arguably a fix — but it's the kind of consumer-visible behavior change that, bundled
into the additive-minor AT, muddies the "AT is purely additive" story. **Shipping it
in AU lets AU make its own version call** (minor if the cohort agrees it's a fix;
major if a consumer asserts on the old role) WITHOUT contaminating AT's clean
additive minor. This is a SECOND independent reason for the split (the first was
blast-radius gestalt, §1).

→ **C5-4 (S3):** AT = **3.3.0** minor (all additive/zero-consumer-correctness). The
dock-design aria-break + magnify ship in AU with AU's own version call. **Gate:** the
AT FINAL records every AT-core change as additive-or-zero-consumer (the `wrap`-delete
proven 0-consumer; the peer-dep fix proven not-required-changing); the rail-aria
break is absent from AT (it's in AU).

---

## §5 — Overfitting guardrails for the augmented set (the §2 ledger, operationalized)

The augmented set's overfitting surface is wider than the original AT. Three
guardrails, each a W8 close-audit line:

1. **The export-bar honesty rule (A6-5, generalized).** Every NEW public subpath
   (`/goo-blob`, `/watercolor-dot`, `/color`) is recorded in the W8 audit with its
   ACTUAL consumer tally split into `export-bar | real-consumer-count | demo-count`.
   `/goo-blob` = `export + 1 + 1`; `/watercolor-dot` = `export + ≥10(1ctx) + 1`;
   `/color` = `export + 2(aurora+blob)`. FINAL distinguishes export-pass from
   ≥2-pass. No subpath is dressed as "≥2 met" when it's export-bar-only.

2. **The prop-accretion guardrail (B6 §5).** The dock proves prop-accretion hides
   under component-legitimacy (`GlassDock` is ≥2-consumed but `wrap`=0, `containerName`=1
   contexts). The W8 audit runs the PROP-level tally, not just the component level,
   for any component AT touches. The `wrap`-delete is the model: a zero-consumer PROP
   on a legitimate component is overfit and gets DELETED. (This guardrail also applies
   to the blob: A6-6.c's 30-field `BLOB_CONFIG` literal is a prop-accretion analog —
   the W8 audit confirms the blob's PRIMARY surface is `--blob-*` tokens + a small
   prop set, with the 30-field config as inject-only escape, not the contract.)

3. **The infra-exemption rule (made explicit).** Gates (`proof:*`), test specs, the
   WebGL harness, and tsconfig flags are NOT consumer-bearing primitives — they are
   EXEMPT from the ≥2 bar (a `proof:color-acyclic` script does not need 2 consumers;
   it needs to fail-closed on its violation). State this in the W8 audit so the
   ~6 new gates the augmented set adds are not flagged as "1-consumer overfit." This
   prevents the inverse error: treating verification infra as if it were substrate.

→ **C5-5 (overfitting, S3):** these three guardrails are the W8 audit's binding
input. The single highest-risk overfit in the augmented set is `useDockMagnify`
(B1) — and the split removes it from AT entirely (BOOK to AU until its ≥2 lands).
The split is itself the primary overfitting guardrail: it keeps the speculative
dock-design substrate (magnify) OUT of the shipped additive minor.

---

## §6 — The re-shaped wave sequence (the C5-1+C5-5 synthesis)

The augmented AT, post-split, keeps the 9-wave shape. The dock-design exits to AU;
the survivors fold into NAMED LANES (each with its own gate line, not a grab-bag).

### §6.1 — AT (the blob/color/aurora-quality/correctness tranche) — **9 waves, 3.3.0**

| Wave | Title (augmented) | Lanes / gates |
|---|---|---|
| **W0** | Deep audit (6-lens + W0b A*/B*/C*) | DONE |
| **W1** | Design slices — END OF DEV | + the §2 ≥2 ledger; + the `/color` shrink (A5 §5); + the gamma-pin (A5 §2); + the demand-gate callback (A6-1.b); + the harness scoping (A6-4) |
| **W2** | Substrate + `/color` + harness | Lane-A `useWebGLCanvas` (+ `needsFrame` callback, A6-1.b); Lane-B `/color` SHRUNK + `proof:color-acyclic` (C5-3) + chunk/inline decision; Lane-C `frostShader` delete (own gate line, A6-6.b); Lane-D headless-WebGL harness (gates W2 parity AND W5, A6-4); **gate:** uniform+GL-state-call-sequence parity (A6-2) + the real-pixel golden (A6-4) |
| **W2b** | Aurora-quality (folds into W2) | D-1 dither (fold; A4); D-2 OKLab-LUT + D-3 steering RIDE W5's GLSL pair (A4 §6 sequencing) — NOT a separate wave |
| **W3** | watercolor-dot + prng + internal filter | ∥ W2; gamma-passthrough (no resolver) |
| **W4** | goo-blob on substrate + ColorResolver seam (gamma, A5) + demo #2 | two-tier inv-K-3 proof (A5-2: source-graph + dist-grep); `/goo-blob` export-bar honesty (A6-5); token-first surface (A6-6.c) |
| **W5** | D1 OKLCh shader (+ A1 AA/smin/fbm, A2 GLSL pair) | CPU-equivalence (A2 §5 hardened) + the GPU golden (A6-4) + the in-shader zero-perturb==base check |
| **W6** | Correctness + gate-fleet fold | Lane-vueuse (`proof:vueuse-free-root` + DataTable); Lane-pkg (`peerDependenciesMeta` + `proof:peer-optional`); Lane-keyframes (CI matrix); Lane-postTask (wire/drop); **Lane-dock-correctness (B6):** strictTemplates/`checkUnknownProps` + `proof:strict-templates` (B6-1, the keystone); the dock state-machine spec (B6-10); the VT-fork reconcile (B6-2/B6-3) |
| **W7** | Slipped ships + contract | Fraunces + `proof:font-axes`; control-size vocab; π/ι sweep; **the dock overflow clean-break (B6-4): DELETE `wrap`, one enum, `containerName` mutual-exclusion warn**; `proof:doc-consistency` (B6-6/B6-7 doc-rot); the GlassDock aria contract on the role-free root (B6-5) |
| **W8** | Close — overfitting (§2+§5 guardrails) + gates matrix + FINAL + 3.3.0 publish + open AU stub | the §2 per-artefact ledger; export-pass vs ≥2-pass split; the AU successor recorded |

**Net AT change vs the original 9-wave plan:** SAME wave count; W2 gains the harness
+ `/color`-acyclic lanes; W2b folds into W2/W5; W6 gains the dock-correctness lane
(B6); W7 gains the doc-rot + aria lanes (B6). NO dock-DESIGN. NO new half-numbered
waves. The 9-wave shape holds because the split removed the dock-design pressure
that would have forced a 10th.

### §6.2 — AU (the dock interaction/design/motion/a11y successor) — recorded, NOT planned here

AU is the dock-design gestalt the W0b B1/B2/B3/B4 lenses argued. C5 does NOT plan AU
(that's an AU-plan job) — it RECORDS the fold so AT's FINAL names the successor:

- **AU headline candidates:** B2 rail sliding-indicator + APG-tabs aria; B4 reka-ui
  Tabs adoption + the full a11y contract; B3 spring-fidelity unification + micro-
  feedback + will-change; B1 glass-affordances + press-scale canon. `useDockMagnify`
  (B1) is an AU candidate ONLY if its ≥2 lands (BOOK within AU).
- **AU prerequisite:** AT's W6/W7 dock-correctness (strictTemplates + state-machine
  spec + prop-collapse + VT-fork) — AU builds on the verified, prop-collapsed dock
  (§1.3). AU does not re-open what AT verified.
- **AU version:** AU's own call (the rail-aria break = minor-fix or major, per the
  cohort) — kept OUT of AT's additive minor (C5-4).
- **AU ≥2:** the dock is ≥2-consumed (4 repos, B6 §5) — the design work rides that;
  magnify alone needs its own ≥2 (BOOK).

→ **C5-1 close:** `docs/tranches/AU/` stub created at AT.W8 with the above fold +
the prerequisite + the named cross-repo dock consumers (inv-16 name-forward).

---

## §7 — The consolidated C5 hardening ledger

| ID | Sev | Binds | Hardening | Gate |
|---|---|---|---|---|
| **C5-1** | S2 | AT.W1 + W8 | SPLIT — dock-DESIGN (B1/B2/B3/B4) exits to successor **AU**; AT keeps blob/color/aurora-quality + ALL correctness (incl. dock-correctness B6) | AT close audit confirms no B1/B2/B3/B4 design artefact landed in AT; `docs/tranches/AU/` stub records the fold + the AT-prerequisite |
| **C5-2** | S2 | W8 (overfitting) | per-artefact ≥2 ledger (§2); `/goo-blob` = export-bar-only (not ≥2); `useDockMagnify` BOOK-to-AU; infra/gates EXEMPT | W8 audit runs §2; FINAL splits export-pass vs ≥2-pass; magnify absent from AT |
| **C5-3** | S2 | AT.W2 | `/color` extraction introduces the value.js↔glass-ui dev-symlink cycle (the C3 concern) — `proof:color-acyclic` BINDING; keep `/color` shrunk+inlineable | `proof:color-acyclic` green in `file:`-link layout; chunk/inline + gzip-delta recorded; value.js K.W3 supplies-own-resolver re-affirmed |
| **C5-4** | S3 | W8 (version) | AT = 3.3.0 (additive + zero-consumer-correctness; SemVer = highest-type not count); the rail-aria break ships in AU, not AT | FINAL records every AT-core change as additive-or-0-consumer; rail-aria absent from AT |
| **C5-5** | S3 | W6/W7 (sequence) | RE-SHAPE — survivors fold into NAMED LANES (each own gate line), no half-numbered waves; W2b → W2/W5; harness = W2 sub-slice | §6.1 sequence adopted; W6/W7 lanes each have a distinct gate line (no grab-bag) |
| **C5-6** | S4 | AT.W1 (record) | the dock split is GESTALT+VERSION-driven, NOT overfitting-driven (the dock IS ≥2-consumed); state precisely so AU doesn't mis-cite the reason | the AU stub states the split rationale = blast-radius gestalt + the additive-minor boundary, not a ≥2 failure |

### The single binding recommendation

**Split the dock-DESIGN out to AU; keep the dock-CORRECTNESS in AT.** The augmented
W0b set is two coherent gestalts: blob/color/aurora-quality+correctness (AT) and
dock interaction/design/motion/a11y (AU). Folding the dock-DESIGN into AT's W6/W7
would turn the correctness/slipped-ship waves into ungateable grab-bags AND
contaminate AT's clean additive-3.3.0 with the consumer-visible rail-aria break. The
split keeps AT's blast-radius the one thing the whole plan protects, makes AU SAFER
(it inherits AT's verification fabric), and preserves the 9-wave/3.3.0 shape. The
dock-CORRECTNESS (B6) MUST stay — it is the AS-residual the W7 silent-no-op exposed
and the user already ruled into AT.

---

## §8 — What the augmented plan got RIGHT (cross-tranche pass found no defect)

- **B6's dock-correctness IS correctly in AT** — it's the verification-fabric debt
  the W7 silent-no-op seeded; `strictTemplates` (B6-1) is the categorical keystone.
- **The A* blob/color/aurora set is internally coherent** — file-disjoint enough to
  parallelize (W2∥W3, the W2b ride, W6∥blobs); one gestalt, one blast surface.
- **3.3.0 for the core is right** — additive subpaths + zero-consumer-correctness;
  SemVer doesn't count features (web-confirmed).
- **inv-16 holds** — the ONLY new cross-repo surface is the `/color` cycle, closed
  by one acyclic gate; value.js K.W3, the precepts pin, the dock consumers are clean.
- **The honest fig-leaf admission (A6-5) is the right posture** — goo-blob is
  export-bar-only and the plan says so; C5 only asks it be RECORDED, not dressed.

---

## §Sources

**Web (SemVer / scope posture, June 2026):**
- [Semantic Versioning 2.0.0 — semver.org](https://semver.org/) (highest change-type, not feature-count, drives the version).
- [AWS DevOps & Developer Productivity Blog — Using Semantic Versioning to Simplify Release Management](https://aws.amazon.com/blogs/devops/using-semantic-versioning-to-simplify-release-management/) ("two big API changes and ten new features won't bump 1.0.0 to 3.10.0").

**Internal (this repo at HEAD, file:line / fact-cited):**
- `docs/tranches/AT/AT.md` (the plan: §DEC-AT, §Wave sequence, §3.3.0 posture).
- `docs/tranches/AT/audit/W0-L4-deferred-chronic-ledger.md` (the 47-item ledger).
- `docs/tranches/AT/design/AT.W1-blob-primitives.md` (the headline design).
- `docs/tranches/AT/audit/W0b-A4-aurora-gradient-sota.md §6` (the W2b slice).
- `docs/tranches/AT/audit/W0b-A5-color-seam-sota.md §2,§4,§5` (the gamma pin, the
  two-tier inv-K-3 proof, the `/color` shrink, the C3 cycle).
- `docs/tranches/AT/audit/W0b-A6-blob-aurora-adversarial.md` (A6-1/A6-3.a/A6-4/A6-5
  — the L5-vs-L6 split, the `/color` cycle, the harness S1, the goo-blob fig-leaf).
- `docs/tranches/AT/audit/W0b-B1..B5-*.md` (the dock-design proposals: magnify,
  rail indicator, motion-fidelity, a11y, overflow).
- `docs/tranches/AT/audit/W0b-B6-dock-state-audit-adversarial.md §2,§5,§7` (the
  dock-correctness set, the ≥2 prop-level tally, the strictTemplates keystone).
- `docs/audits/overfitting-audit.md` (the ≥2-distinct-consumer canon).
- `package.json` HEAD: version `3.2.0`; `optionalPeerDependencies` present
  (the non-standard key the W6 fold targets); 72 `exports` entries; the `proof:*`
  fleet (`proof:resolution`, `proof:consumers:static`, `proof:vt-names`, …).
- MEMORY: `feedback_overfitting_audit` (≥2 distinct CONTEXTS); `feedback_no_backwards_compat`
  (clean breaks); `project_publish_ci_broken` + `project_ci_monorepo_layout_cascade`
  (the `file:`-link cycle that bit `proof:*` twice — the C5-3 risk).

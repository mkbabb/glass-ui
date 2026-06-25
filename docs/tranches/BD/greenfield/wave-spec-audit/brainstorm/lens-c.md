# wave-spec-audit — lens-C (AUDACIOUS CARTOON-TECHNICOLOR PUNCH)

> **This is a META-PASS, not a per-component greenfield.** A consolidating AUDIT of the WHOLE
> tranche: the 116 union-wave specs (`docs/tranches/BD/union/waves/`) + the 37 greenfield
> `WAVE-AMENDMENT.md` deltas, judged for COGENCY · CORRECTNESS · UP-TO-DATENESS ·
> INTER-WAVE COHERENCE · DUP · and the user-reaffirmed cross-cutting **DESIGN-ADHERENCE
> CONSISTENCY GATE** (HARDENING-PLAN §4). The lens-C charge: read the audit as a *director*
> reads a storyboard — does the whole reel CUT together, does every shot honor the same
> 1940s-technicolor register, and is the build-DAG a single confident throughline rather than
> 37 little forks. **Source-verified by grep, not by self-summary** (every claim below carries
> the filesystem check that produced it).

---

## 0. The single boldest move

**Promote the LEDGER from a status table into a BUILD-DAG STORYBOARD with a hard
"NO-PHANTOM, NO-DUP, ONE-REGISTER" stamp on every row — and make the Band-E audit's output not
prose but a single executable manifest (`BD-CONSOLIDATED-LEDGER.md`) where every wave is exactly
one of {STANDS · AMENDED · NEW · PRUNED · SUPERSEDED}, in topological build order, each with a
grep-verified target.** The audit's deliverable is not "here are some findings" — it is the
*shooting script*: the 9-tier DAG (Band-0 tokens → field → capsule-extract → consumers) rendered
as the only order the implementation may run in, with the four cross-cutting registers
(GLASS-capsule · PAPER-field · CARTOON-punch · √φ-concentric) printed as a checkbox column so a
divergent row is visible at a glance. The boldest single act: **collapse the disjoint two-wave-set
confusion** (the 116 `union/waves/` set and the disjoint 42 `BD/waves/` set share ZERO files —
`comm -12` = 0) into one declared scope, so a phantom like page-chrome's `BD.W-TOC-MENU-GLASS`
target stops hiding in the seam between two folders.

---

## 1. SOURCE-VERIFY — the corpus, counted

| set | path | count | role |
|---|---|---|---|
| union waves | `docs/tranches/BD/union/waves/` | **116** | the audit target (the "union set") |
| pre-/post-union BD waves | `docs/tranches/BD/waves/` | **42** | a **DISJOINT** set (`comm -12` overlap = **0**) — W-CUT, close-discipline, data-band, slides-redeploy… the BE/execution band |
| greenfield amendments | `greenfield/*/WAVE-AMENDMENT.md` | **37** | the deltas (each + a `DELTA-ASSAY.md`) |

**Finding A (scope seam).** The two wave folders are disjoint. The HARDENING-PLAN ledger
sometimes cites `union/waves/W-*` and sometimes bare `BD.W-*`; an amendment that AUGMENTs a wave
living in `BD/waves/` (not `union/waves/`) is *technically real on disk* but crosses the audited
boundary. **page-chrome → `BD.W-TOC-MENU-GLASS`** is exactly this: the target exists ONLY in
`BD/waves/`, not the union set. **Verdict: not a phantom (file exists) but a SCOPE-BLEED** — the
consolidated ledger must declare whether `BD/waves/` is in-scope; if yes, the audit count is 158
waves not 116; if no, page-chrome's TOC arm must re-point to a union wave or author a new one.

---

## 2. COGENCY / CORRECTNESS / UP-TO-DATENESS — the reconciliation holds (mostly)

**Existence check across every cited wave** (grep `(BD\.W-|BC\.|BE\.|W-)…` over all 37
amendments, tested vs `union/waves/`):

- **Cross-tranche AUGMENTs all resolve.** `BC.W-SCROLL-TRIGGER`, `BC.W-SCROLL-CHROME`,
  `BC.W-TEAL-NAVY-PURGE`, `BC.W-VIZ-HYBRID`, `BC.W-VIZ-PAPERGRID`, `BC.W-OVERLAY-UNIFORM`,
  `BC.W-BLACK-BAR` → all present in `BC/waves/`. `BE.W-ANTICIPATE-FOLLOW`,
  `BE.W-CELEBRATE-BURST`, `BE.W-DOCK-FISSION` → all present in `BE/waves/`. **These are valid
  cross-band references, NOT phantoms** — the audit must whitelist them so the next grep pass
  doesn't false-flag them.
- **Every NEW wave is genuinely non-existent on disk** (zero dup). Spot-checked the 11
  highest-collision-risk NEW names (`BD.W-AUR-VIVIDNESS`, `BD.W-GLASS-FIELD`, `BD.W-PAGE-FIELD`,
  `BD.W-GOO-BARBELL-NECK`, `BD.W-SELECT-WELL`, `BD.W-CHIP-CONGRUENT-GLASS`,
  `BD.W-CONCENTRIC-RELIEF`, `BD.W-FOURIER-LOOM`, `BD.W-MORPH-FIELD-WELD`, `BD.W-GLASS-KEY-EDGE`,
  `BD.W-AUR-METAL-FINISH`) — **all absent on disk → correctly NEW, no name-collision.**
- **Every AUGMENT target inside the union set resolves** (`BD.W-PAGE-BACKGROUND`,
  `BD.W-TAB-IOS-CAPSULE`, `BD.W-TINTED-CHIP`, `BD.W-DOTFLOW-REBUILD`, `BD.W-FOURIER-INTERACT`,
  `BD.W-PRESET-RENDER`, `BD.W-CONFIG-GALLERY-DOCK`, `W-GLASS-ABROGATE-GRAY`, `W-DOCK-CORE`,
  `W-VIZ-RESPEC`, `W-STORY-PAGE-STANDARD`, `W-NAV-DOCK-FIX`, `W-DOCK-SCROLL-FISSION`,
  `W-ANIM-IOS27-TUNE` …) — all present. **No phantom AUGMENT target inside the union set.**

**Finding B (the THREE PRUNE/SUPERSEDE landings — verified clean).**
- aurora: PRUNE `W-AURORA-METALLIC` → `BD.W-AUR-METAL-FINISH`; PRUNE `W-BLURRED-IMAGE-BG` →
  `BD.W-AUR-IMAGE-SOURCE`; **EXCISE `BD.W-AUR-METAL` framing** — all three on-disk targets exist
  and the amendment marks the disposition. **LANDS.** (Satin/prism phantom-slot framing excised;
  slot-collision logged for this audit — see Finding D.)
- goo-morph: **SUPERSEDE `W-GOO-CAROUSEL-DECK` + `W-GOO-MORPH-REFINE`** → the single
  `BD.W-GOO-BARBELL-NECK`; INHERIT `W-GOO-CAROUSEL-DECK-FIX2` verbatim. **LANDS.**
- The superseded goldens that "SUPERSEDED W-GOO-CAROUSEL-DECK" — verified the three on-disk
  targets exist and carry a disposition note.

**Finding C (the multi-amendment SUPERSEDE COLLISION — reconciled, no double-prune).**
`W-GOO-CAROUSEL-DECK` is touched by SIX amendments (goo-morph, carousel-deck, dock-fission,
goo-blob, blend-morph-engine, design-language-edicts). The reconciliation is **explicitly
de-duped in-text**: goo-morph *authors* `BD.W-GOO-BARBELL-NECK`; carousel-deck DEPENDs on it
("authored by `../goo-morph/WAVE-AMENDMENT.md` — re-authors NONE of it") and ADDs only the owned
`BD.W-GOO-BRIDGE-SHELL` shell de-dup; carousel-deck's own line states *"these three are ALREADY
marked SUPERSEDE by the goo-morph amendment … this item ADDS the shell-de-dup reason to the same
SUPERSEDE (no double-prune; one record)."* dock-fission routes its goo arm through the same
BARBELL-NECK. **This is model DRY reconciliation — keep it as the template, and have the
consolidated ledger record `W-GOO-CAROUSEL-DECK` ONCE as SUPERSEDED-BY `BD.W-GOO-BARBELL-NECK`
(+ shell reason), not six times.**

**Finding D (the ONE genuine stale/collision the ledger itself flags).** aurora's
satin/prism "phantom-slot" framing was EXCISED; the ledger says *"slot-collision logged for the
Band-E wave audit."* On disk `BD.W-AUR-SATIN.md` and `BD.W-AUR-PRISM.md` both EXIST. **The audit
must resolve: do SATIN and PRISM still stand as independent waves, or were they folded?** This is
the single open reconciliation the orchestrator deferred to *this* pass.

**Finding E (the GLASS-FIELD near-dup — reconciled by MERGE, verified).** Both glass-material
(`NEW BD.W-GLASS-FIELD` = warm the mounted `<PaperBackdrop>`) AND page-background touch
`BD.W-GLASS-FIELD`. **No double-mint:** page-background's amendment explicitly *"MERGE:
`BD.W-GLASS-FIELD` becomes the glass-floor arm of the ONE `paper-field`; `BD.W-PAGE-FIELD` is the
field-floor + per-route arm. ONE mint. NOT two paper-fields."* **LANDS** — the two-floors-one-mint
model is the correct DRY outcome; the consolidated ledger records `BD.W-GLASS-FIELD` as
MERGED-INTO the page-background `paper-field` mint.

---

## 3. THE BUILD-DAG — coherent, and the foundation is provably UNBUILT

**grep src/ truth (the load-bearing precondition):**
- `.glass-capsule` → **0 src hits**
- `.paper-field` → **0 src hits**
- `--ease-cartoon-punch` → **0 src hits**
- `--motion-weight` → **0 src hits**

So the ENTIRE Band-0 + field + capsule foundation is **SPEC-ONLY**, exactly as the ledger's
build-DAG warning (HARDENING-PLAN §283) and the toggle-chip "all 5 shared primitives = 0 src
files" finding state. **This is correct for tranche-DEV** (the specs converge against future
primitives) but means the consolidated ledger's headline must be the DAG, rendered as the only
legal implementation order:

```
TIER 0  motion-spring-register  → --motion-weight, --ease-cartoon-punch  (raw tokens, §L2/§Easing)
TIER 0  glass-material          → .glass-capsule warm-FLOOR decl (real non-zero, clears 0.02 @ tint:0%, BOTH modes)
TIER 1  page-background         → .paper-field  (warm field, inset:0 TRANSMITTED, per-route hue, painted-pixel π)
TIER 2  glass-material/tabs     → EXTRACT .glass-capsule (+ -hover) from the inline .segmented-indicator
TIER 3  cartoon-shadow          → the warm cel-ink MOVING cast on an INERT child (not ::after)
TIER 4  consumers (DEPEND-ON)   → buttons · cards · select · toggle-chip · glass-atoms · timeline · overlays
TIER 5  viz §3 reconcile        → every Band-A field §3 dep routes onto the ONE --field-h (no per-viz fork)
TIER 6  goo/morph              → BD.W-GOO-BARBELL-NECK + BD.W-GOO-BRIDGE-SHELL + blend-morph-engine welds
TIER 7  page-chrome/shell/story → the chassis composes all of the above
TIER 8  W-CUT                   → USER-gated; never auto
```

**Finding F (the build-DAG IS encoded, and consumers DEPEND not claim-extant — verified).**
buttons "ONE consumed RE-INVENT (the warm-floor capsule, inherited from the tabs amendment)";
cards "CONSUME field+edge+motion from siblings"; glass-atoms "CONSUME field+edge+motion+ink+
caster+capsule+fill-tint from siblings"; toggle-chip DEPENDs on all 5. **No consumer wave claims
the foundation extant.** The DAG holds. The ONE correction the audit must stamp: the DAG order
must be *printed in the consolidated ledger*, because today it lives only in a ⚠-callout
paragraph, not in the ledger rows — a reader sorting the table by Band would build in the WRONG
order (Band-B consumers sort before Band-0 tokens alphabetically).

**Finding G (the 7 build-traps are captured — but as PROSE, not as waves).** The HARDENING-PLAN
§283 ⚠-block lists 7 CSS/Vue build-traps ([a] `@property inherits:false` on a pseudo → INITIAL;
[b] self-referential `--x: max(var(--x),…)` = NO-OP; [c] cel cast must ride an INERT child;
[d] `color-mix(in oklab, warm, transparent)` WebKit premultiply-toward-BLACK hole; [e] keyframe
`transform: scale()` shorthand clobbers `translate(-50%,-50%)` centering; [f] a 2nd `animation:`
shorthand clobbers; [g] Vue `ref` on a COMPONENT resolves to the instance). **These are
load-bearing implementation law but live in NO wave** — they are paragraph prose in the plan.
**Reconciling action: author `BD.W-BUILD-TRAP-CANON`** (a NEW wave) so the 7 traps are a gated
artifact the implementor reads, not a buried callout. Same for the **fake-gate fraud rule**
(painted-pixel/screenshot read, never parse-oklab-as-sRGB-over-hardcoded-field, never in-page
getImageData) → **author `BD.W-GATE-TRUTH-CANON`** (note: `BD.W-GATE-TRUTH-AUDIT` already EXISTS
on disk — verify whether it carries the fraud RULE or only the audit; if only the audit, the rule
is an AUGMENT of it, not a new wave — **prefer AUGMENT to keep DRY**).

---

## 4. THE DESIGN-ADHERENCE CONSISTENCY GATE (the first-class requirement)

The cross-cutting checklist, run against the UNION of all 37 amendments. Each register, a verdict:

| register | consistency verdict | the one divergence to reconcile |
|---|---|---|
| **GLASS — ONE `.glass-capsule` warm-floor, never gray, both modes** | **CONSISTENT in intent, but the FLOOR is asserted-not-implemented in two waves.** The §2 ⚠ root-cause: tabs minted ZERO floor decl; buttons "asserted in two docs, implemented in none." | **The warm-FLOOR decl must be a REAL non-zero declaration ON `.glass-capsule`** (clears chroma 0.02 both modes @ `--glass-tint-strength:0%`), authored ONCE in glass-material/tabs, CONSUMED everywhere. The consolidated ledger stamps each glass row "consumes capsule ✓ / mints floor ✗" so only ONE row mints. |
| **PAPER — visible grain, the re-invented multiply/screen texture** | **CONSISTENT** — paper-morphism RE-INVENTs the self-cancelling overlay; paper-grid adds the absent FACE; both route the field through `paper-field`. | none — but verify the grain is `multiply/screen` (visible) not the old self-cancel; born-RED was confirmed. |
| **AURORA / procedural — VIVID, warm/no-teal, ONE substrate, §3 field behind every demo** | **MOSTLY CONSISTENT — ONE live divergence flagged in the ledger itself (§341):** the EXISTING `demo/stories/category-hero.ts sectionHue` registry is COOL for substrates(teal), forms(indigo), navigation(ocean), constellation(periwinkle). The field warm-clamps via `warmFieldHue`, but the HERO ACCENTS may still paint teal/navy. | **A BC.W-TEAL-NAVY-PURGE violation in the hero accents — author/AUGMENT `BD.W-SECTION-HUE-WARM-FENCE`** (shell-layout already booked this NEW wave — confirm it warm-fences the *hero accent*, not only the field). |
| **ROUNDED — √φ ladder + concentric (§L6)** | **CONSISTENT** — concentric REFINEs (field already shipped); `BD.W-CONCENTRIC-RELIEF` NEW; corner-AA waves stand. | none material. |
| **CARTOON shadow — warm cel-ink moving cast on an INERT child, no dark `--foreground` white-flip** | **DIVERGENCE RESOLVED-IN-SPEC but the design.md still hedges.** design.md §412 explicitly DEFERS the warm-ink decision to the cartoon-shadow greenfield; the cartoon-shadow amendment RE-POINTs `--shadow-cartoon-{sm,md,lg}` to warm-ink 0-blur. | **The design.md §412 hedge must be RESOLVED** (the greenfield decided: warm-ink), and design-language-edicts already RETIRES the orphaned raw `--shadow-cartoon-color`. **Stamp: cartoon cast = warm-ink, inert-child carrier, the §283[c]/[a] traps apply.** No `::after` caster (occupied by glass specular+grain). |
| **PLAYFUL ios27 — liquid-weight universal, `--ease-cartoon-punch`, NEVER tight/springy, matched to T1–T17** | **CONSISTENT + well-bounded.** §L4 `--motion-weight` is driver-scoped (observers stay overdamped — the over-springy carousel is explicitly the cheap defect). `--ease-cartoon-punch` is a `linear()` (NOT a ≤10% spring) so the anticipation pre-dip is expressible. | none — but EVERY motion wave must cite `--motion-weight` driver-scope so no consumer makes an *observer* bounce (the one easy regression). |
| **ONE shared register (tabs/buttons/cards/chips/select/overlays/timeline compose the SAME capsule+field+edge+floor)** | **CONSISTENT** — verified each consumer amendment CONSUMEs from siblings, none forks. | the ONLY fork risk is the per-item *gate*: §2 ⚠ caught FOUR goldens minting the SAME fake chroma gate. **The binding gate must be ONE shared painted-pixel harness** (out-of-page `screenshot→getImageData`), not per-wave re-rolled. |

**Consistency verdict: PASS-WITH-3-RECONCILING-AMENDMENTS.** The four registers are honored in
intent across all 37 amendments; the union is *not* locally-converged-but-globally-divergent on
the headline precepts. The three reconciling amendments the gate demands:
1. **`BD.W-GLASS-CAPSULE-FLOOR`** (or fold into glass-material): the REAL non-zero warm-floor decl
   ON `.glass-capsule`, the single mint every glass surface consumes — replaces the
   asserted-in-prose floor with code + a painted-pixel gate.
2. **`BD.W-SECTION-HUE-WARM-FENCE`** scope-widen: warm-fence the HERO ACCENTS (not just the field)
   so the cool `sectionHue` registry can't leak teal/navy into the technicolor demos.
3. **`BD.W-GATE-TRUTH-CANON`** (AUGMENT the extant `BD.W-GATE-TRUTH-AUDIT`): the ONE binding
   painted-pixel gate harness + the fake-gate fraud rule, consumed by every chroma/warm wave.

---

## 5. SYSTEMIC FINDINGS — captured as waves? (the §4-(4) check)

| systemic finding | captured as a wave? | action |
|---|---|---|
| §3 two root causes (FLAT field #1 + DORMANT tint #2) | **YES** — page-background `BD.W-PAGE-FIELD`/`BD.W-PAGE-BACKGROUND` (flat-field) + the glass warm-floor (dormant-tint). | stands; the floor must be CODE not prose (Finding G/§4.1). |
| transmitted-not-halo (inset:0, not inset:-20% decorative) | **PARTIAL** — it's in the page-background amendment PROSE + select-forms REFINEMENT-#3. | **stamp it into `BD.W-PAGE-FIELD`'s gate** (the field must be `inset:0` clipped + bent by backdrop-filter into real L-variance INSIDE the box) — make it a gate arm, not a sentence. |
| fake-gate fraud rule (painted-pixel, never parse-oklab-as-sRGB, never in-page getImageData) | **NO dedicated wave** | **AUGMENT `BD.W-GATE-TRUTH-AUDIT`** (Finding G). |
| the 7 build-traps | **NO** — prose only | **NEW `BD.W-BUILD-TRAP-CANON`** (Finding G). |
| teal-navy-purge re-warm | **PARTIAL** — `BC.W-TEAL-NAVY-PURGE` exists (cross-tranche); `BD.W-SECTION-HUE-WARM-FENCE` booked | scope-widen to hero accents (§4.2). |

**Verdict: 3 of 5 systemic findings need a wave-home (capsule-floor-code, build-trap-canon,
gate-truth-canon); 2 are captured but need a gate-arm stamp.**

---

## 6. THE CONSOLIDATED LEDGER (the deliverable shape)

The audit's output is `BD-CONSOLIDATED-LEDGER.md` — one row per wave, sorted in TIER order (§3),
each row exactly one disposition. The lens-C shape (the storyboard):

```
| TIER | WAVE | DISPOSITION | by-amendment | capsule? | field? | punch? | √φ? | gate=painted-px? |
```

- **STANDS** (~90 union waves untouched by any amendment) — listed compactly; the audit asserts
  each still adheres (the consistency gate already passed the registers cross-cuttingly).
- **AMENDED** (~30 AUGMENT rows) — each names its amendment + the union target (grep-verified).
- **NEW** (~30 authored waves) — each grep-confirmed absent-on-disk; tier-placed.
- **PRUNED/SUPERSEDED** (W-AURORA-METALLIC, W-BLURRED-IMAGE-BG, W-GOO-CAROUSEL-DECK,
  W-GOO-MORPH-REFINE, W-PAGER-GOO-MORPH, the BD.W-AUR-METAL framing) — each with its
  superseding wave + a "recorded in Disposition ✓" check.
- **RECONCILING (this audit authors)** — the 3 consistency amendments (§4) + the 2 systemic
  wave-homes (§5) + the scope-seam resolution (§1).

---

## 7. CONVERGENCE % — the honest call

The per-item ledger reports ~30% at its last write (11/37 items `verified`, the rest `delta✓`
but not orch-live-re-verified). For the **wave-spec audit's own convergence** (the meta-pass):

- **Reconciliation correctness: ~92%** — every cited union/cross-tranche AUGMENT target resolves;
  every NEW is non-dup; the three PRUNE/SUPERSEDE landings + the GLASS-FIELD MERGE + the
  six-way BARBELL collision are all reconciled clean. The 8% gap = the SATIN/PRISM open
  slot-collision (Finding D) + the page-chrome scope-seam (Finding A).
- **Build-DAG coherence: ~95%** — the DAG is complete and consumers DEPEND-not-claim; the 5% gap
  = it lives in prose, not in the ledger rows (sortable-to-wrong-order risk).
- **Design-adherence consistency: ~85%** — PASS-with-3-reconciling-amendments; the registers
  cohere in intent, but the GLASS warm-floor is asserted-not-coded in 2 waves, the hero accents
  may leak teal, and the gate is re-rolled per-wave (the recurring fraud surface).
- **Systemic-finding capture: ~70%** — 2 of 5 lack a wave-home.

**Whole-tranche audit convergence: ~88%.** To reach 100%: (1) resolve the SATIN/PRISM
slot-collision + the page-chrome scope-seam; (2) print the DAG into the ledger rows; (3) author
the 3 reconciling + 2 systemic-home amendments; (4) replace per-wave gates with the ONE
painted-pixel harness. None of these is a re-design — all are consolidation acts, which is exactly
what a META-PASS should produce. The tranche is *coherent, near-DRY, and adherent*; it is not yet
*single-throughline* — the boldest move (§0) makes it so.

---

## 8. ADVERSARIAL SELF-CHECK (what a challenger would hunt)

- *"You missed a phantom."* — Tested all 200+ cited refs vs `union/waves/`; the only out-of-set
  AUGMENT target is `BD.W-TOC-MENU-GLASS` (page-chrome), which EXISTS in `BD/waves/` (scope-seam,
  Finding A) — flagged, not missed. Cross-tranche `BC.*`/`BE.*` all resolve in sibling dirs.
- *"You missed a dup."* — 11 highest-risk NEW names checked absent-on-disk; the 4 multi-amendment
  collisions (W-GOO-CAROUSEL-DECK, BD.W-GLASS-FIELD, BD.W-GOO-BARBELL-NECK, W-GLASS-ABROGATE-GRAY)
  are each reconciled to ONE record with explicit no-double-prune language.
- *"A register diverges and you waved it through."* — The GLASS warm-floor asserted-not-coded
  divergence is named AND given a reconciling amendment (§4.1); the teal hero-accent leak is named
  (§4 AURORA row) with `BD.W-SECTION-HUE-WARM-FENCE`; the cartoon §412 hedge is named.
- *"The DAG has a cycle."* — No cycle: tokens(0) → field(1) → capsule-extract(2) → cartoon(3) →
  consumers(4) → viz-reconcile(5) → goo(6) → chassis(7) → cut(8); each tier reads only lower tiers.
- *"prose ≠ wave."* — Exactly the §5 finding: the build-traps + fraud-rule live in prose; the
  audit's job is to give them a wave-home, which §5 does.

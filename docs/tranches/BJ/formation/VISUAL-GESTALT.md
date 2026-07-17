# BJ formation — the lead's visual-gestalt read (Fable, full-corpus)

All 30 feedback screenshots read in full by the team lead, 2026-07-17. This is the SEED of the
finding-family registry — the mechanisms the visual corpus itself proves. Round-1 auditors did NOT
see this document (independence rule); reconciliation happens at synthesis.

## Families the corpus proves on sight

### 1. radius-canon-collapse
Pill-vs-rectangle chaos inside single compositions. Evidence: F12 (pill chips inside a
near-rectangle tags-input container), F15 (near-square Reset button), F17 (two adjacent search
inputs with different radii, one sharp), F45 (rectangle input directly above a full-pill Unlock
button), F48 (dialog radius ≠ card radius; full-pill input inside), F09 (the converse failure —
container over-rounded to an ovoid around a 2×2 segment grid). The radius system is either absent
or unenforced; both over- and under-rounding ship. The cure is one opinionated radius scale with
role-keyed tokens (control / field / card / sheet) and an enforcement gate, not spot fixes.

### 2. meta-caption-jargon-leak
Story copy written for the tranche auditor, not the library user. Two sub-mechanisms:
(a) the mono ALL-CAPS section caption idiom everywhere ("BOIL BRUSH · THE NATURAL MORPHOLOGY",
"BOX-MODE HULL · THE SE-GUARD (NEVER A VANISH)", "SINGLE-LINE, MONOSPACE", "4 SKILLS · ENTER TO
ADD…"); (b) internal implementation prose as user-facing copy ("aria-hidden SVG overlay… grain:0",
"stroke-dashoffset sweep… clip-path wipe", "The rail and overlay share one reactive query, while
one polite atomic status announces…", the F03 DockCrossfade/--dock-t mechanics dump). Plus
fabricated marketing claims in F43 (SOC 2 Type II / end-to-end encrypted / trusted by 12k teams) —
fake credentials in a library demo. The user's verdicts "most of this is worthless" and "remove
all reference to meta text" name this family. Cure: a story-copy canon (what a page may say) inside
the story meta-framework; kill the mono-caption idiom or reserve it for one deliberate role.

### 3. preview-card-vacancy
Category preview cards are blank slabs: F46 shows 6 of 8 inner previews EMPTY (Dialog, Tabs,
Table, Alert, Spring Orchestrator, Auth Shell), F01 shows the Foundations card mostly vacant
beige; the user adds slow-load/partial-then-stutter (A17) and wants expressive, varied-size,
masonry-like cards. The double-card wrap (preview card inside category card, F46/F01) compounds it.
This family joins layout (masonry), liveness (real miniature previews), and perf (eager mount
stutter) — one wave, three gates.

### 4. handmark-total-failure
Every brush fails naturalness on sight: pen = wobbly double-line, boil = fat worm, pencil =
scratch, crayon = orange blob smearing descenders, marker = green slab (F38); ring is torn and
mis-layered (F39); highlighter's multiply slab escapes the card entirely (F36 — broken isolation);
draw-on leaves detached fragments (F37); box/bracket modes render as tiny slivers (F40). Verdict
is GREENFIELD (user's word), pen-like and natural, with pencil-boil as the substrate and all
"SE-guard"-class internals hidden.

### 5. glass-material-heaviness
The dialog backdrop is one uniform heavy blur (F48); the iOS references (F49/F50) show the
target: progressive/gradient blur — strongest near the floated element, falling off with distance
— plus subtler element blur overall. F28 shows sibling controls carrying different materials
(select vs Play/Reset). The user's edict: ALL glass components slightly more subtle; dialog
rounding consistent with cards; experiment with gradient backdrop blur.

### 6. dock-overflow-affordance
The dock clips items mid-glyph with no occlusion affordance (F47 "Overlays &…"), compensates with
a bolted-on cluster of four chevrons (F47: < > « » + layers), lets content vertically scroll
inside the shell (F27 — the pink element poking out), and the rail/pill construction nests
outline-circles inside pills (F04, F05 — the "shape to be abrogated"). Dock-page transitions
flash (F06). Verdict: dock greenfield with edge-fade occlusion signaling + click-to-scroll
auto-advance + no interior scroll + simplified shape grammar.

### 7. configurator-cramp
Configurators are cramped ovoids (F09), flat hierarchies where group header and field labels carry
equal weight (F10), gapped accordion groups that should read as one inset grouped list (F11),
oversized empty regions elsewhere (F31 curve-gallery bottom void). Springs page needs configurator
support entirely (F29). Cure: a configurator standard (larger, card-rounded, grouped-list
anatomy, hierarchy scale) inside the story meta-framework.

### 8. muddy-palette
F43's mustard-olive over dusty rose is the named "putrid" case; the aurora preset set contains
near-duplicates (F08: crayon/oil/etc. nearly identical) diluting the good exemplars (sky, sunset,
dusk, dawn). Cure: dramatic preset reduction + per-mode express definition (A13's van-Gogh /
oil-pastel / crayon as REAL distinct modes or nothing).

### 9. feedback-motion-brokenness
Scroll-progress rim draws broken partial arcs (F21); the loop progress eases wrong/jitters (F22);
skeleton pulses too slow (F24); toast animation "awful" vs the refined dialog (F20). One family:
the feedback components' motion was never held to the motion canon.

### 10. overfit-component-roster
The user has sentenced by name: instrument-chassis REMOVE, metric REMOVE (F18), completion-seal →
speedtest (F26), confirm-dialog vs dialog (F25), deck vs carousel collapse (F33), compositions
section prune (F43/F44/F45), timeline ground-up redesign (F16), tempo "what even is" (F30),
reveal vs scroll vs other scrolling (F32/F42), text-motion npm-install bit (F41). The DAG
reduction (A05) generalizes this to the whole roster.

## Cross-cutting notes for wave-shaping

- Families 1+2+3+7 all land inside the story meta-framework (A06) — the standardization wave is
  the natural owner, with the radius/typography audits (F15) as library-side token waves feeding it.
- Family 5 is a library-wide material re-tune (subtle-blur pass) + one new capability (gradient
  backdrop blur) — separable waves; the capability is experiment-gated per the user ("at least
  judge the effectiveness").
- Families 4, 6, 8 are the three named greenfields (handmark, dock, aurora-modes) — each takes the
  design-loop prompt (PROMPTS/design-loop-prompt.md) as its charter; blob (A12) joins as the fourth.
- Family 10 needs the questions-in-reduction ASK (the user ordered reduction QUESTIONS relayed) —
  the DAG census (Round-1 component-dag lens) supplies the evidence; the ASK document carries the
  per-component kill/keep/merge proposals for user ruling where genuinely ambiguous.

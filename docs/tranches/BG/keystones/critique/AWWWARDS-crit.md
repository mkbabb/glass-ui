# KS-AWWWARDS-DEMO — adversarial critique

**Critic: opus (non-authoring). Date: 2026-07-01. HEAD `f6fa1767` (tranche/BG). Verdict: 90% binding-ready.**
No CRITICAL. Every disk claim in the spec was re-verified on disk and holds (unlike KS-A/KS-B, this
spec carries ZERO disk-false claims). The residue is 3 MODERATE coordination/reconcile gaps (state the
split explicitly, no rework) + 2 LOW clarity nits.

---

## Disk verification ledger (all TRUE — recorded so the fold sees the checks ran)

| spec claim | disk | verdict |
|---|---|---|
| `DockStage.vue:38` default `PRESETS.OPENAI_SKY` cerulean | `{ …, config: () => PRESETS.OPENAI_SKY }` at :38 | **TRUE** |
| DemoFrame on 0 real pages | only `StoryPage.vue:100,147` reference it — both PROSE COMMENTS (`` `<DemoFrame variant>` ``), zero live use | **TRUE** |
| StorySectionHeader 0 consumers | 0 `.vue` importers; file exists | **TRUE** |
| VizStudio 1/11 | consumed only by `substrates/aurora.vue` | **TRUE** |
| `warmFieldHue` importers === 2 (16.3/R2) | AppShell + SectionLanding IMPORT; `aurora-hero.ts:248` + `SectionPreviewCard.vue:167` are a comment + a `--card-field-h` token read, NOT imports | **TRUE** |
| manifest 120 story rows | `grep -cE '^\s*s\('` = **120** exact | **TRUE** |
| `demo/stories/aurora/` dir exists (F7.3 move) | dir present (AuroraConfigDock, config/, sections/…); `substrates/aurora.vue` also present (coexist OK) | **TRUE** |
| `proof-page-hierarchy.mjs:83` StorySectionHeader allowlist | `:83 "StorySectionHeader.vue"` present | **TRUE** |
| `proof-demo-radial-calm.mjs:225` `\b` rejects carved name | `/…StoryHero…\b/` at :226 | **TRUE** |
| F8.6 template == KS-MOTION-DISNEY §3.4 (zero fork) | 3 axes + telos + restraint-check + `edict-verdict-present` on `proof:meta` — byte-shape identical | **TRUE** |
| page-set math 120→88; every category merge reconciles | display 11→5, data 14→8, motion 12→7, forms 12→6, compositions 12→4 all reconcile EXACTLY vs disk; target col sums 88 | **TRUE** |

Wave-binding: all 8 ids (F7.1/F7.2/F7.3/16.1/16.2/16.3/17.6/F8.6) exist in the frozen plan; preconds
cursor-faithful; no self-inserted rows (§7 fold-candidates flagged as notes). RULINGS §CORRECTIONS
(R6′/R1/W-SPRING-TIDY) cited; DOCK_SPRING untouched by this lane (§5 accurate). Sibling READ-ONLY fence
held — the Instrument flagship composes published primitives only; zero sibling edits proposed. Protected
set (`?capture=`, `liquid-playground`, `morph-showcase`, `useSurfaceAxis`, 1-GL-per-route) explicitly
untouched; the compositions 12→4 merge reaches no dock story. Greenfield loop genuine (§3.1–§3.4 each
≥3 directions + GOLDEN + a substantive self-challenge). 17.6 arithmetic (99×2×2=396 → ~480 budget) and
F8.6 roster math (11+1+4+2=18) both correct.

---

## MODERATE findings (state the split; no rework)

### M1 — F7.1's warm-field swap overrides a DOCUMENTED Pass-E lens-staging rationale it never engages
§1 (line 41) + F7.1 deliverable (5) + checklist #4 treat `DockStage.vue:38 PRESETS.OPENAI_SKY` purely as
"cerulean-240 at war with the warm identity" and prescribe "→ a warm identity preset" (chroma
UNSPECIFIED). But `DockStage.vue:30-35` (VERIFIED) documents the cerulean as DELIBERATE: *"Defaults to a
COLORFUL preset (OPENAI_SKY) so the dock's warm-cream glass reads as LIQUID glass over a rich field, NOT
a faint ghost over the calm Dawn wash (the Pass-E dock-staging finding: the §L1 lens needs a colorful
backdrop to bend + concentrate)."* A low-chroma warm-cream swap would regress the very lens read that
finding protected. The spec's own §2.1 #1 rule ("glass over a flat plate is the anti-pattern") cuts the
same way — the field must be RICH, and warm ≠ desaturated.
**Fix:** F7.1 (5) must specify a **warm-but-HIGH-CHROMA** field (warm amber/coral/gold aurora at
saturation matching OPENAI_SKY's vibrancy, hue inside the `[25,95]` clamp) that satisfies BOTH the warm
identity AND the lens-needs-color finding; and it must UPDATE the `DockStage.vue` comment in the same
wave (else the swap lands with a now-false rationale surviving on disk — a doc-truth defect the tranche
elsewhere gates against). The `field-warm-default` bite reads hue only; add a chroma floor to it or the
bite greens a warm-but-DEAD field.

### M2 — F7.2 deliverable (3) forward-references 16.3's StoryPageShell, reading as a circular precond
F7.2 runs BEFORE 16.3 (16.3 preconds F7.1/F7.2). Yet F7.2 (3) delivers the unified header
"(StoryPageShell's chrome slot **post-16.3**; StoryHeader absorbs)". StoryPageShell is CREATED by 16.3 —
so as written, F7.2's deliverable depends on 16.3's output while 16.3 depends on F7.2. An executor
cannot land a header into a shell that does not yet exist.
**Fix:** state explicitly — F7.2 lands the unified header on the WINNING anatomy's chrome (pre-16.3, on
StoryPage/DemoFrame's chrome slot); 16.3 CARRIES it into StoryPageShell at the shell collapse (the header
TRAVELS, it is not re-authored). The `post-16.3` parenthetical is a destination note, not a precond.

### M3 — the StorySectionHeader delete + M9d/:83 re-point is DOUBLE-OWNED by F7.2 and 16.3
F7.2 deliverable (4) claims the StorySectionHeader DELETE + "re-point the `proof-storybook-meta.mjs` M9d
+ `proof-page-hierarchy.mjs:83` allowlists in the same commit — **the WS11 §2C′(e) matrix rows**." But
16.3 inherits the FULL WS11 §2C′(e) matrix VERBATIM, whose SectionLanding-fold rows ALSO carry the
StorySectionHeader allowlist re-points (VERIFIED: `proof-storybook-meta.mjs:96,429,584` — M9d ASSERTS
StorySectionHeader EXISTS + composes IconChip, so the delete forces the re-point; `proof-page-hierarchy.mjs:83`
carries it). Both waves cite the same rows. Executor risk: applied twice (the second re-point hits an
already-removed string — no-op or red) or by neither (each defers to "the WS11 matrix," i.e. the other).
**Fix:** split explicitly — **F7.2 owns the StorySectionHeader delete + its 2 allowlist re-points (M9d,
:83); 16.3's §2C′(e) matrix owns the StoryHERO-reader set + the SectionLanding fold and does NOT
re-touch the StorySectionHeader allowlists** (F7.2 already landed them). Note M9d is a positive
EXISTENCE assert, so its re-point is a RETIRE/repoint, not a filename swap.

---

## LOW findings

### L1 — the 16.x waves inherit an unstated WS1+WS4 §0-HEAD-check hard-precond
The spec binds WS11 §2A/§2B′/§2C′ verbatim; WS11 §0/§8 makes every 16.x wave HARD-gate on the WS1+WS4
integration src edits being GREEN first (`.scroll-build` retired from `StoryPage.vue:72`, `.scroll-cascade`
decoupled at `:220`, StorySection heading no longer a plain `<h2>`). §4 says "16.1/16.2 have no cursor
preconds and may run early" without restating this inherited src-gate. An executor reading KS-AWWWARDS
alone misses it.
**Fix:** one line — 16.1/16.2/16.3 cannot open until the WS11 §0 HEAD-checks are GREEN on the integration
tree; OR confirm those src edits have since landed in the amended F1/F6/F7 families and mark the gate
discharged.

### L2 — display merge-list lists `atoms` as a KEEP when it is a NEW page
F7.1 table, display row: "keep buttons·card·badge·section·**atoms**" — but `display/atoms.vue` does NOT
exist on disk (VERIFIED: display/ = badge, buttons, card, dark-mode-toggle, metric-badge, metric-pill,
pulse, section, separator, stacked-icons, status-dot). `atoms` is the merge TARGET ("→ display/atoms,
one designed atoms wall") built from the 5 strays, not a keep. The 11→5 count reconciles correctly; only
the "keep" phrasing conflates create+keep and could mislead the migrator into hunting a nonexistent page.
**Fix:** "keep buttons·card·badge·section + NEW `atoms` (the designed wall)."

---

## Convergence

**90% — binding-ready modulo 3 MODERATE disambiguations.** The spec is unusually disk-grounded: every
factual claim verified TRUE, the page-set math reconciles category-by-category against disk, the F8.6
shared template is a genuine zero-fork reuse, and the greenfield loop is real. The three moderates are
all "state the ownership/ordering split explicitly" fixes (M1 also owes a chroma floor + a comment
update), not structural rework; the two lows are one-line clarifications. Fold with M1–M3 resolved
inline and L1/L2 as editorial passes → 100.

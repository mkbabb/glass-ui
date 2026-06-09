# CH-foundational — adversarial red-team of the JUST-AUTHORED foundational specs (W54 / W55 / W51 / W60 / W61)

**Lane** CH-foundational · **Verdict** WEAK (the specs are largely SOUND + source-grounded, but carry **three real
incoherences** that will mis-route or double-write work, plus a **stale born-RED baseline** and a **dropped
cohesion fold**). PLANNING/audit only — no code edits.

Read fresh: `AX.W54-glass-first-class.md`, `AX.W55-adaptive-glass-legibility.md`, `AX.W51-comfortable-ui-scale.md`,
`AX.W60-page-redesign-container-layer.md`, `AX.W61-dock-unify-root.md`, `MASTER-PLAN.md`,
`USER-DEFECTS-2026-06-08-pass3.md`, the 89edffc coordination doc, and the live `src/` at HEAD `89edffc`.

---

## A. The born-RED witnesses ARE real + source-grounded (the GOOD news, verified)

Every falsifiable witness I could probe holds at source. This is a genuinely well-grounded spec batch:

| Witness | Claim | Verified at HEAD |
|---|---|---|
| W54-1 | `grep glass-level src/` = ZERO | ✅ 0 hits |
| W54-2 | `button/index.ts` default = opaque `bg-primary` (`:26-27`), `defaultVariants.variant:'default'` (`:81`) | ✅ exact |
| W54-3 | a11y brackets clobber 10/15 rungs (`glass.css:730` reduce, `:749` contrast) | ✅ exact (13 lines in reduce block, 5 in contrast) |
| W54-4 | `grep glass-opaque src/styles/` = ZERO; `CardTier` has no `opaque` (`Card.vue:18`) | ✅ 0 hits; union confirmed |
| W54-5 | `--scale-hover-btn:1.035` Q3 hover; button default carries the W52 comment | ✅ confirmed at `button/index.ts:28-30` |
| W55-1 | `grep glass-backdrop src/` = ZERO; `--glass-tint-strength:0%` (`tokens.css:839`) | ✅ 0 hits; `:838-839` exact |
| W55-2 | dock shell flat `var(--glass-bg-dock)` no oklab tint (`dock.css:146`); 5 rungs DO oklab-tint | ✅ exact — dock flat, rungs `color-mix(in oklab,…)` at `:220,240,251,267,278,380` |
| W55-3 | `--dock-fg-on-aurora:var(--foreground)` (`tokens.css:757`); `grep contrast-color src/`=ZERO | ✅ exact |
| W51-1..5 | `grep --ui-scale src/`=0; `h-9/text-sm/size-4` literals; `--dock-scale` parallel | ✅ all confirmed (button `:72-77`, `--dock-scale:1` at `:1111`) |
| W60-1..6 | `grep StoryHero demo/`=0; 145 SFCs, 128 use StoryPage; 4 heros inline Aurora; no grid bg | ✅ all exact |
| W61-1..4 | BottomDock raw `demo-bottom-dock__sep`+`PanelLeft`; `--dock-collapsed-summary-min-size`/`--dock-collapsed-padding` referenced-only (0 defs); `--dock-active-bg→--surface-tint-12` | ✅ all exact |

The witnesses are NOT inflated — they are line-true. The coherence checks I ran (the `--glass-level:0` opaque
endpoint reaching the painted surface THROUGH the oklab tint wrapper; the dock/chassis rungs existing for the
7-rung thread) hold. This batch passes the source-grounding bar most prior tranches failed.

---

## B. The CHALLENGES that found a real weakness

### CH-1 (BROKEN dispositioning) — the keyframes I.W6 specular-cohesion fold is dropped: routed to W54 but W54's FileBounds EXCLUDE the files that fix it

The 89edffc commit (the CURRENT HEAD, authored AFTER W54/W55/W60 at `6569b7a`) dispositions the live
glass-cohesion defect — **"19 dock/`<Button>` specular tracks still bloom where the Card is clean"** —
explicitly into W54: *"Folds into W54 (glass-first ROOT) — the specular-track default-off becomes part of the
glass-first cohesion."* (`docs/tranches/AX/coordination/from-keyframes-IW6-dock-button-specular.md`).

But W54, authored one commit earlier, does **NOT carry this fold**:
- `grep -ni "specular-track|specular-intensity-rest|19 track|default-off" AX.W54-…md` = **0 hits**.
- W54 §FileBounds + §OUT-of-bounds EXPLICITLY excludes the files needed: *"the `useSpecularTracking` composable;
  the `.glass-material::before` specular recipe (`glass.css:108-141` — W52 owns it)"* and the auto-trigger
  HALTS on *"any need to touch … the dock-control active-surface recipes."*
- The bloom source is `DockIconButton.vue:40` (`"dock-icon-button glass-specular-track"` attached
  unconditionally) + `button/index.ts` glass-variant specular + `dock-controls.css` — none of which appear in
  W54's FileBounds table.

**The break:** the fix has no home. The orchestrator's own disposition says "W54," but W54's text neither
mentions it nor permits the file touches. This is exactly the glass-cohesion miss the prompt flagged (Card
clean / dock+Button bloom = N divergent glass models, not ONE). It is the ROOT wave's headline charter
(*"GLASS FIRST for buttons + items EVERYWHERE … ONE rest-specular discipline"*), and it is currently
unallocated. **W54 must be amended to absorb the specular-default-off cohesion fold** (add `DockIconButton.vue`,
`button/index.ts` specular attach, `dock-controls.css`, and the `--glass-specular-intensity-rest` cohort to
FileBounds; add a born-RED witness "19 dock/Button tracks bloom at rest"; add the gate assertion). Otherwise the
maximal-glass-first default ships with the single most-visible cohesion defect un-fixed.

### CH-2 (INCOHERENT co-ownership) — W54 and W55 BOTH claim to own + REWRITE the same a11y bracket region (`glass.css:730-757`)

- W54 §FileBounds: *"**REWRITE** the `prefers-reduced-transparency: reduce` bracket (`:730-746`) → `:root {
  --glass-level: 0; }` … **REWRITE** the `prefers-contrast: more` bracket (`:749-756`) → a single bounded
  `--glass-level`."*
- W55 §FileBounds: *"**RECONCILE** the `prefers-reduced-transparency: reduce` (`:730`) + `prefers-contrast:
  more` (`:749`) brackets onto W54's `--glass-level`."*

Both edit the SAME two media blocks. W55's "reconcile" and W54's "rewrite" are the SAME edit described twice.
W55 §Disjointness asserts *"W55 owns … the a11y-bracket region"* while W54 §Disjointness asserts *"W54 owns the
a11y-bracket region (`glass.css:730-757`)."* **Two waves cannot both OWN the same line region.** The
dependency order (W54 before W55) papers over it in sequence — W54 rewrites first, W55 finds the brackets
already on `--glass-level` and has nothing to reconcile — but the SPECS contradict on ownership. This is a
double-allocation: W55's a11y-bracket fold is a no-op once W54 lands, yet W55 still lists it as a born-RED
witness (W55-4) and a FileBounds edit. **Resolution: W54 owns the bracket rewrite outright; W55's witness-4 +
its a11y-bracket fold must be DELETED (or demoted to "confirm W54 landed it"), not re-listed as W55 work.**
As written, W55-4 will be marked "born-RED" and "driven GREEN" by an edit W54 already made — a phantom
deliverable that inflates W55's scope and risks a merge clobber if the two run non-serially.

### CH-3 (WEAK implementability) — W55's `@container style(--glass-backdrop: light)` blocks are authored ON the `.glass-*` rung selectors, but `style()` queries the ANCESTOR container, not self

`@container style(--prop: val)` resolves against the **nearest ancestor container's** computed custom property
— NOT the queried element's own. The density precedent W55 cites proves this exactly: at `utilities.css:537`
the block is `@container style(--density: spacious) { .metric-pill… }` — the `--density` is set on an
**ancestor host**, the `.metric-pill` is a **descendant** inside it. W55's FileBounds instead say author the
block *on the five `.glass-*` rungs* and have the consumer set `--glass-backdrop: light` *"on any ancestor."*
For that to paint, EVERY `.glass-*` surface must be a descendant of an element that (a) is a style container
and (b) carries `--glass-backdrop`. The spec's §Gloss says *"set by the consumer on any ancestor"* — correct in
principle — but the FileBounds wording (`@container style()` blocks "on the five rungs") elides that the rung
needs a wrapping container, and there is no fold that establishes the glass surfaces' style-container ancestry
or a default `--glass-backdrop` registration so the query has something to read at every glass site. **W55
needs an explicit fold:** register `--glass-backdrop` as an inherited `@property` with a `dark` default at
`:root` (so the query always resolves) AND confirm the `.glass-*` rungs sit inside a style container (or make
`:root` the container). Without it, the `@container style()` blocks silently never engage and the gate's
SOURCE arm passes (the block exists) while the π arm fails (nothing darkens) — the exact source-green /
render-broken split this tranche exists to kill.

### CH-4 (WEAK — stale baseline) — four of five specs pin born-RED to `6569b7a`; HEAD is `89edffc`

W54/W55/W60 assert *"born-RED at HEAD `6569b7a`"*; W51 says *"HEAD `6569b7a`"*; only W61 (authored last) says
`89edffc` (the true HEAD). The intervening commit `89edffc` is docs-only (`git show --stat` = one
coordination `.md`, no `src/`), so the **source witnesses do not rot** — every grep above still holds. BUT:
(a) the baseline-SHA mismatch means the live-re-diagnosis ritual ("re-confirm against HEAD `6569b7a`") points
at a non-HEAD commit, and (b) `89edffc` materially CHANGES W54's scope (CH-1 — it dispositions a new fold into
W54 that W54's `6569b7a` text predates). This is the **workflow stale-worktree trap** (MEMORY) recurring at the
spec layer: a spec born-RED against a base that HEAD has already moved past. The four specs must be re-pinned to
`89edffc` and W54 re-diagnosed to absorb the 89edffc disposition (CH-1).

### CH-5 (WEAK — W54 witness-6 grep is self-falsifying as written)

W54-6 asserts: *"`grep -rn "glass-first\|glass-level\|two-layer" CLAUDE.md` returns ZERO."* It does NOT —
**it returns 1 hit** (`CLAUDE.md:334`, *"the built-in two-layer grid"* in the dock section). The witness INTENT
(no glass-first *law* / no `--glass-level` *axis* recorded) is sound, but the grep pattern as written is
falsified by an unrelated "two-layer grid" string. A gate that literally asserts `grep …two-layer… = 0` would
be born-GREEN-passing-as-RED-failing incorrectly, OR (worse) the implementer "fixes" it to zero by editing the
unrelated dock prose. **Tighten the witness grep** to `"glass is the default surface register"` / `"--glass-level"` /
`"opaque escape"` (the actual canon strings), not the collision-prone `two-layer`.

### CH-6 (WEAK — W60 "thin" is doing heavy lifting) — the thin-LAYER claim vs the 145-page reach

W60 brands itself *"a THIN container LAYER … not a per-page re-author."* The architecture IS thin (one
`<StoryHero>` wrapper + one manifest field + one grid recipe + the `<StoryPage>`-hosts-it path covering 128/145
pages with zero per-page edit). That is the right gestalt. BUT the §Scope folds 4-6 push past thin:
- fold 4 *"the pages that hand-roll a bare flat well are MIGRATED onto the contract"* — that is a per-page
  re-author for the 17 non-`<StoryPage>` pages (145−128).
- fold 5 re-homes 4 heros + assigns unique substrates + adds glass cards (per-hero authoring).
- fold 6 reaches the speedtest `MetricCell`/`MetricStack` grid into data-dense pages (per-page composition).

**On the SUBSUME question (my charge):** W60 does NOT subsume W18/W40/W57/W58 — verified. It adds a `background`
FIELD to the W18 row (no row move), leaves the W40 shell untouched, re-homes (does not undo) W57's Aurora, and
adds no meta-language past W58. The disjointness is clean and well-argued. The ONLY thin-ness leak is that
fold 5's "unique substrate per hero" silently EXTENDS W57's substrate-choice rule into NEW heros (a system hero
→ constellation, a math hero → fourier) that W57 never adopted — those are NET-NEW hero authorings W60 owns,
not re-homes. That is fine but should be named as "new hero background authoring" not folded under "re-home the
four W57 heros." **Verdict on W60: SOUND on subsume-avoidance; mildly WEAK on the thin-label honesty.**

### CH-7 (note — W60 dependsOn W43 is already satisfied at HEAD)

W60 dependsOn W43 (fourier-field first-class). `FourierField.vue` + `src/subpaths/fourier-field.ts` already
exist at HEAD and `demo/stories/compositions/math-paper.vue` already consumes fourier. So the W43 dependency is
EITHER already met (W60 can consume the shipped FourierField now) OR W43 is a re-author wave whose output W60's
"fourier hero" needs. The spec should clarify which — if FourierField ships, W60's fourier-hero is unblocked
today and the W43 dependsOn is a soft "consume the W43-tuned version," not a hard blocker.

---

## C. CHRONIC deferrals / misses (slip-history)

- **The headless-green-over-broken split (the cardinal class).** W55 CH-3 is the live re-occurrence at the
  spec layer: a SOURCE gate that asserts the `@container style()` block EXISTS will pass while the π render
  shows no darkening (the block never engages without ancestor-container plumbing). This is the EXACT class
  AW shipped (headless-green / visually-broken) — now latent INSIDE the wave the tranche wrote to cure it. The
  Q3 hover (W54-5) is the named prior instance: *"W52 shipped headless-green with a hover the next live pass
  found imperceptible."* W54 correctly folds the live re-verify; W55 must close the same gap on the bucket.
- **Clean-break renames missing siblings (the rename class).** W54 demotes the `default` opaque button variant
  to a named escape (`solid`/`primary`). W54 names the `api/index.ts` `ButtonVariants` re-sync — GOOD. But it
  does NOT name the **demo + test-mirror + consumer** call sites that pass `variant="default"` expecting opaque
  primary-fill. A clean break that renames the default-register WILL silently flip every bare `<Button>` and
  every `variant="default"` consumer to glass — intended for the bare case, possibly NOT intended for explicit
  `variant="default"` callers. The "no-backwards-compat" precept is honored, but the sweep of `variant="default"`
  consumers (demo stories, tests, speedtest/slides) is unscoped. This is the `glass-ui binding verification`
  MEMORY class (stale bindings silently no-op) inverted: a rename that silently RE-paints.
- **Stale-base born-RED (CH-4).** The `6569b7a`-vs-`89edffc` pin drift is the `workflow stale-worktree trap`
  recurring — the specs were authored against a base HEAD has moved past, and the move CHANGED W54's scope.
- **PROGRESS↔spec status.** The four specs say *"Status — SPEC … writes no src."* — correct. No inflation
  found here. But the 89edffc coordination doc's *"folds into W54"* disposition is NOT reflected back into
  W54's PROGRESS/status, so the ledger and the spec disagree on W54's scope (CH-1).

---

## D. The gestalt HARDENING actions (to PERFECT the foundation — PLANNING only)

1. **Amend W54 to ABSORB the specular-cohesion fold (CH-1, the highest-leverage fix).** Add to W54 FileBounds:
   `DockIconButton.vue` (the unconditional `glass-specular-track` attach `:40`), `button/index.ts` (the glass
   variants' specular attach), `dock-controls.css`, and the `--glass-specular-intensity-rest` cohort. Add a
   born-RED witness: *"19 dock/Button specular tracks bloom at rest where Card is clean (`--glass-specular-
   intensity-rest:0` global but dock/button attach the track unconditionally)."* Add the gate assertion: every
   glass interactive surface shares ONE rest-specular discipline (default-off, hover-reads-on-hover per Q3).
   This makes W54 deliver the ONE-glass-model cohesion its charter promises. Re-pin W54 to `89edffc`.

2. **Strip W55's a11y-bracket double-allocation (CH-2).** Delete W55 witness-4 + the a11y-bracket FileBounds
   edit; W54 owns the bracket rewrite outright. W55 §Disjointness should read *"W54 owns the a11y-bracket
   rewrite; W55 confirms it landed on `--glass-level` (no W55 edit)."* The `--glass-clarity` placeholder clause
   (for "if W54 not yet landed") survives only as a sequencing note, not a parallel deliverable.

3. **Add the W55 `@container` ancestry fold (CH-3, the implementability fix).** Add a born-RED witness +
   FileBounds edit: register `@property --glass-backdrop { syntax:"*"; inherits:true; }` (or a keyword
   `@property`) with a `dark`/unset default at `:root`, and confirm the `.glass-*` rungs resolve the query
   against a real style-container ancestor (make `:root` the style container, or document that the consumer's
   `--glass-backdrop`-bearing wrapper IS the container). Prototype: drop a `--glass-backdrop: light` on a
   wrapper around a `.glass-card` over `#fff` and confirm via `getComputedStyle` the bucket block engages BEFORE
   landing the dock thread. Without this the SOURCE gate is a false-GREEN.

4. **Tighten the W54-6 canon grep (CH-5).** Replace the `two-layer` collision-prone pattern with the actual
   canon strings (`"--glass-level"`, `"glass is the default surface register"`, `"opaque escape"`). One-line
   amendment.

5. **Scope the `variant="default"` consumer sweep into W54 (the rename class).** Add a W54 sub-step: grep
   `variant="default"` across `demo/`, `tests/`, and (as a consumer-leg NOTE) speedtest/slides; ratify whether
   explicit `variant="default"` callers want the glass flip or a `solid` re-point. The bare-`<Button>` flip is
   intended; the explicit-`default`-caller flip needs an audited decision (clean break, but a NAMED one).

6. **Re-pin all four specs to `89edffc` + re-run the live re-diagnosis against true HEAD (CH-4).** One-line per
   spec. Confirm the source witnesses still hold (they do — verified above) and that W54 picks up the 89edffc
   disposition.

7. **Name W60 fold-5's NEW hero backgrounds as net-new authoring, not "re-home" (CH-6).** Split fold 5: "(a)
   re-home the 4 W57 Aurora heros onto the descriptor [thin]; (b) author NEW unique-substrate heros
   (constellation/fourier) [net-new]." Keep the thin-LAYER label honest about which folds are thin.

---

## E. Internal-consistency + dependency-order verdict

- **Dependency order is SOUND.** W54 (root) → W55 (legibility floor, dependsOn W54) → W60 (consumer, blocked on
  W54) is correct and matches MASTER-PLAN Batch 1/4. W61 dependsOn W45+W54 (executes the dock-control re-point
  W54 defers) — correct, and W54:197-202 explicitly defers it to the dock band, which W61 picks up. W51 is a
  RETRO-RECONCILE (W45's `--dock-scale` already shipped) — the spec is honest about the inverted sequencing.
- **The one ORDER hazard:** W54 + W51 BOTH edit `button/index.ts` (W54 the variant recipe, W51 the size-rung
  heights) — different CVA keys, but same object/file. Line-region-disjoint IF serialized; the specs should
  cross-name each other in §Disjointness (W54 does not mention W51's button edit; W51 does not mention W54's).
  Low risk, but an un-named shared-file co-edit is the merge-clobber class.
- **The W54/W55 a11y-bracket double-ownership (CH-2) is the one hard internal contradiction.** Everything else
  is amendable wording.

**Bottom line:** the foundational specs are the best-grounded batch in the tranche — witnesses are line-true,
the maximal-glass-first axis is correctly threaded through ONE `--glass-level` scalar with a coherent level-0
opaque endpoint, W55 keeps it legible via a real (if under-plumbed) `@container` probe, and W60 is genuinely
thin-on-the-subsume-axis. But W54 does NOT yet make glass MAXIMAL-cohesive (CH-1: the 19-track dock/Button
bloom is dispositioned into it but absent from its text), W54 and W55 double-own the a11y brackets (CH-2),
W55's adaptive probe is under-plumbed for `@container` ancestry (CH-3), and the batch is pinned to a stale base
(CH-4). Address CH-1 through CH-4 and the foundation is perfected.

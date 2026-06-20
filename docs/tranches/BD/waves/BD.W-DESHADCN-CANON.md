# BD.W-DESHADCN-CANON — add the BC.W-DESHADCN governing-principle canon to CLAUDE.md (reka = BEHAVIOR / glass-ui = 100% MATERIAL)

- **Band:** 7 (CLAUDE.md coherence) · **Source dim:** CMD · Doc-only (machine-locks to an existing shipped gate).
- **One-line goal:** Add the cross-cutting BC.W-DESHADCN governing principle — *"reka = BEHAVIOR / glass-ui = 100% of the MATERIAL; no shadcn-neutral token survives in the visual layer"* — to CLAUDE.md as a Design-Axes / Component-architecture clause, machine-locked by the already-shipped `proof:no-shadcn-default` gate.

---

## 1. Band + goal

BC.W-DESHADCN is the cross-cutting BC headline (the 2026-06-18 user directive *"From first principles, design our components to abrogate ANY styling of shadcn and default reka"*) — it mints a born-RED STRUCTURAL invariant gate (`proof:no-shadcn-default`) + a per-component reskin census, exactly the kind of binding axis CLAUDE.md carries. But CLAUDE.md has ZERO mention of it. A planner reading CLAUDE.md today has no recorded statement of the de-shadcn material-first invariant — the most important cross-cutting styling-DNA principle of the BC tranche is invisible in the structural map. This wave adds the canon.

## 2. Starting state — the exact on-disk reality (VERIFIED by reading)

**CLAUDE.md grep (verified):** `grep -in "shadcn\|de-shadcn\|deshadcn\|no-shadcn" CLAUDE.md` returns ONLY incidental mentions — NO governing canon:
- **:54** — `41 shadcn-vue base component packages` (the structure-ledger one-liner, the pattern reference).
- **:271** — `the shadcn-vue inline focus-visible:ring-2 ring-ring Tailwind chain … Do not swap it to the inline ring chain` (the `.focus-ring` divergence note — a SYMPTOM of the de-shadcn principle, but not the principle itself).
- **:451** — `All ui/ components follow the shadcn-vue pattern:` (the component-architecture intro — the structural pattern, not the de-shadcn material invariant).

There is NO statement of "reka = behavior / glass-ui = 100% material", NO statement of "no shadcn-neutral token survives in the visual layer", and NO mention of the `proof:no-shadcn-default` gate.

**The gate IS shipped (verified):** `package.json:959` → `"proof:no-shadcn-default": "node scripts/proof-no-shadcn-default.mjs"`. The script exists on disk.

**The wave doc `BC.W-DESHADCN.md` (read in full):** carries the full governing principle (§0, line 5), the born-RED gate design (§Mechanism, lines 53-58 + the D1-D4 clauses lines 62-67), the forbidden-token set (lines 35-41: `bg-background`/`border-input`/`ring-ring`/`ring-2`/`ring-offset-*`/bare `rounded-md`/bare `shadow-sm`-utility), the `var(--shadow-sm)` token-vs-utility distinguishing bite (D2, line 64), the legibility allowlist (D3, line 65: `avatar`/`label`/`separator`/`skeleton`/`table`/`data-table` + Badge's loud-pill), the census-closure anti-smuggle floor (D4, line 66), and the `proof:glass-cohesion`-defers-on-bg-opacity overlap clause (line 76). It records the reka-behavior-INVIOLATE fence (line 82). The gate scope is `ui/` ONLY (line 75).

## 3. The build — precisely what changes

**Add ONE governing-canon clause to CLAUDE.md** — placed as a Design-Axes / Component-architecture invariant (the natural home is right after the §"Component architecture" intro at :451, beside the existing axis statements, OR as a new Design-Axis item near the glass-first canon §"Glass-first canon (AX.W54)" at the band-default register — the orchestrator picks the placement; the clause text is the deliverable). The canon names the principle, the forbidden set, the allowlist, the gate, and the reka-inviolate fence:

> **De-shadcn material-first — reka = BEHAVIOR, glass-ui = 100% of the MATERIAL (BC.W-DESHADCN).** Every `ui/` component reads as glass-ui material — warm-cream glass or warm paper, painted from first principles — and NOTHING reads as the generic shadcn-vue neutral chrome (the flat `bg-background` slab, the `border-input` hairline, the cold `ring-ring` focus halo, the squared bare-`rounded-md` default, the bare `shadow-sm` utility lift). reka provides ONLY BEHAVIOR — focus management, ARIA, state machines, portal, roving-tabindex, collision; glass-ui provides 100% of the PAINT from first principles in the paper + glassmorphism aesthetic. **No shadcn-neutral token survives in the visual layer.** This is the de-shadcn companion to the component-over-class + token-first axes: the library ALREADY owns the full material vocabulary (the `--glass-*` ladder, `.input-pill`, `.control-surface`, `.focus-ring`, the geometry-radius tokens, the warm-ink shadow tokens) — the de-shadcn principle RETIRES the residual shadcn vocabulary onto those existing registers, never minting a parallel recipe (KISS). The FORBIDDEN set off the legibility allowlist: `bg-background` / `border-input` / `ring-ring` / `ring-2` / `ring-offset-*` / the bare `rounded-md` default / the bare `shadow-sm` Tailwind UTILITY (DISTINCT from the `var(--shadow-sm)` house TOKEN, which composes the warm-ink `--shadow-color` — the gate flags the utility form, NEVER the token form). The legibility-allowlist survivors (the ONLY sanctioned opaque/neutral surfaces, shared with `proof:glass-cohesion`): `avatar` · `label` · `separator` · `skeleton` · `table` · `data-table` + Badge's loud-saturated-pill register + Button's selected-state maximal-contrast register. The principle is `ui/`-SCOPED (the `custom/` components are glass-ui-authored from birth — no shadcn skin to abrogate); reka's BEHAVIOR is INVIOLATE (the material reskin touches ONLY the paint layer — the `Primitive`/CVA wiring, the ARIA, the state machines are untouched). Machine-locked by `proof:no-shadcn-default` (`["local","ci"]`, born-RED on the HEAD residuals — `button/index.ts` outline/secondary/accent, `toggle/index.ts` outline, `tags-input/TagsInputItem.vue` ring-ring, `switch/Switch.vue` thumb — → GREEN at the band reskins): D1 the forbidden-token sweep, D2 the token-vs-utility distinguishing bite (`var(--shadow-sm)` MUST NOT flag, a bare `shadow-sm` utility MUST flag), D3 the legibility-allowlist is the only sanctioned survivor, D4 the per-component census closure (every `ui/` dir on EXACTLY ONE list — reskin-target | already-glass | allowlist-survivor, the anti-smuggle floor at `docs/tranches/BC/audit/W-DESHADCN-census.md`). The bg-opacity axis is `proof:glass-cohesion`'s (this gate DEFERS where they would double-cover — the two never contradict). The per-component PAINT lands in the owning band waves (`BC.W-BUTTON-GLASS-IOS` / `BC.W-CONTROL-SMOOTH` / `BC.W-DIALOG-GLASS`); this is the cross-cutting INVARIANT.

The clause is faithful to `BC.W-DESHADCN.md` §0 + the D1-D4 gate design + the fences — no invented detail, no embellishment (MEMORY no-grandiloquence).

## 4. The gate — the existing shipped lock (no new gate)

This wave mints NO gate — it CANONIZES an existing one. The canon NAMES `proof:no-shadcn-default` (the real shipped gate, package.json:959) as its machine-lock, so the doc principle is load-bearing (the Q-chron-3 discipline: a codified principle with a gate is sufficient; without one it is necessary-but-not-sufficient — here the gate already exists, so the canon is sufficient on landing).

The optional reinforcement (recommended for the doc-resync band's coherence): a thin `proof:no-shadcn-default` CLAUSE addition that asserts the CLAUDE.md canon clause EXISTS (a grep-presence assert — `de-shadcn` / `reka = BEHAVIOR` / `proof:no-shadcn-default` present in CLAUDE.md), mirroring how `proof:claude-structure-sync` asserts the structure prose. This is OPTIONAL (the canon's primary lock is the shipped material gate); if it ships, it is born-RED on HEAD (no de-shadcn canon in CLAUDE.md) → GREEN after the clause lands. NO new gate-name invention.

## 5. Paint verification — the device-free assertion (no paint)

DOC-only — **zero pixels** (BB inv-4: no `proof:ba-gestalt` verdict; this canonizes an already-shipped invariant, no new paint). The verification:

- **The grep-presence assertion:** after the build, `grep -in "de-shadcn\|reka = BEHAVIOR\|no-shadcn-default\|100% of the MATERIAL" CLAUDE.md` returns the new canon clause (it was empty at HEAD — the born-RED state).
- **The gate-name-resolves assertion:** the cited gate `proof:no-shadcn-default` resolves to a real package.json script (verified — :959) + a real `scripts/proof-no-shadcn-default.mjs` on disk. The canon does NOT invent a gate.
- **The faithfulness check:** the canon clause's forbidden set / allowlist / D1-D4 / overlap-defer all trace verbatim to `BC.W-DESHADCN.md` §0 + §Mechanism + the fences — a reviewer cross-reads the wave doc and the clause and finds no invented or drifted detail.

The BC anti-disease law (no source-green close) is satisfied: a canon wave's "paint" is the principle's discoverability + its machine-lock binding, both checkable device-free — the underlying material reskin (the actual paint) already landed + was paint-verified in its owning BC band waves.

## 6. Fences + risks

- **NO new material register, NO new gate-name.** The canon RECORDS the principle + names the EXISTING `proof:no-shadcn-default` (shipped). It does NOT mint a parallel principle, a new token, or invent a gate name. (The optional grep-presence clause, if it ships, extends the existing gate — not a new one.)
- **FAITHFUL to BC.W-DESHADCN.md.** Every fact (the forbidden set, the token-vs-utility bite, the legibility allowlist, the `ui/`-scope, the reka-inviolate fence, the `proof:glass-cohesion` overlap-defer) traces to the wave doc — no embellishment, no scope-creep (MEMORY no-editorializing).
- **The `var(--shadow-sm)` TOKEN is KEPT (load-bearing distinction).** The canon must state the token-vs-utility split clearly: the warm-ink `var(--shadow-sm)` house token is SANCTIONED (Conventions §shadows compose via `color-mix(in srgb, var(--shadow-color) N%, transparent)`); only the bare `shadow-sm` Tailwind UTILITY is forbidden. Conflating them would mis-state the principle.
- **`ui/`-SCOPED.** The canon states the principle is `ui/`-scoped (the `custom/` components are glass-ui-authored from birth). Do NOT canon a `custom/`-wide de-shadcn (there is no shadcn skin there to abrogate — the TypewriterText gray-literal finding is the cohesion-twin handled by `BC.W-VISUAL-RECONCILE`, NOT a de-shadcn target).
- **reka behavior INVIOLATE.** The canon states the material reskin touches ONLY paint — reka's behavior contract is untouched (`proof:binding-verification` / the e2e sweep stays green by construction). This is the load-bearing fence (the principle is about the SKIN, not the behavior).
- **No-silent-drop (CMD Class H).** This discharges FOLD-LEDGER Class H row 3 ("BC.W-DESHADCN governing-principle canon — zero CLAUDE.md presence").

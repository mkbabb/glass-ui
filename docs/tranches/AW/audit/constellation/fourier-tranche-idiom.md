# fourier-tranche-idiom — fourier's next glass-ui-adoption wave is letter **L**, ordering **ξ′**, charter `docs/tranches/L/L.md`; verified HEAD = master, K-deploy AUTHORED-only (awaits "Begin"), J still OPEN, web still pinned `^3.1.0` and mounts GlassDock 3×

## Findings

### 1. Repo head + state (verified at HEAD today)
- `git log -5` (run today): HEAD `0167268` "chore(run-board): S1 — Tranche E DEV-AUTHORED…", on branch **master**. Tree is light-dirty: one modified file `docs/constellation/tri-tranche-run/RUN-BOARD.md` (the only `git status --short` entry). No fourier `web/` or `docs/tranches/` dirt.
- Tranche dirs at `docs/tranches/`: A–K + `CANONICAL-ORDERING.md` + `INVARIANTS.md`. **K is the latest tranche; there is NO L dir** (`ls docs/tranches/L` → not found).
- **K-deploy (the infra/cross-repo tranche) is AUTHORED-only and awaits "Begin"** — `K/K.md:7` ("Open: NOT YET — K-deploy is AUTHORED only"), `K/PROGRESS.md:13` ("awaits Begin"). No `K/FINAL.md` exists.
- **J (the viz-REMIX/CRUD tranche) STAYS OPEN** — `J/J.md` exists, NO `J/FINAL.md` (`ls` → not found). K.md §0 (`K/K.md:13-19`) is explicit: "J STAYS OPEN… K-deploy is the new successor"; J's own close is *downstream* of K.W1's glass-ui bump.

### 2. The fourier Greek chain — next ordering symbol is **ξ′** (xi-prime)
`CANONICAL-ORDERING.md` numbers each tranche with a Greek-symbol "ordering" in a `§N` section. The verified tail chain (CANONICAL-ORDERING §17–§20): **κ′=H → λ′=I → μ′=J → ν′=K-deploy** (stated verbatim at `CANONICAL-ORDERING.md:705` and `K/K.md:17`). The next clean Greek symbol after ν (nu) is **ξ (xi)** → the next ordering is **`§21 — ordering ξ′`**. `CONSTELLATION.md:28` confirms the lineage rule: "fourier = Greek (`μ′` = J head → `ν′` = K-deploy)".

### 3. The next tranche LETTER is **L** — but it is PRE-BOOKED as "L-webmcp", a HARD collision a writer must resolve
The Latin tranche-letter chain is A…K; the next is **L**. BUT `K/K.md:17,176-180` and `CANONICAL-ORDERING.md:715` already **reserve "L" for L-webmcp** — the WebMCP feature graduation (renamed from a stale "K" booking; hard-gated on Chromium 146 stable). So a fresh glass-ui-adoption tranche CANNOT silently take "L" without conflating two things the chain-honesty rule (`K/K.md:90`) forbids conflating: an infra/feature graduation vs an adoption tranche. **Wave-spec writer's decision (flag explicitly):** either (a) name the adoption tranche **L-adopt / L-glassui** with a disambiguating suffix and keep webmcp as **M-webmcp** (slide the booking one letter, exactly as the K→L rename did at `K/K.md:90`), or (b) fold the 3.4.0 adoption as a NEW THREAD inside an opened K-deploy (since K.W1 is *already* a glass-ui-bump wave) rather than a new letter. The idiomatic precedent is the rename-and-slide (a). A writer must NOT just grab "L".

### 4. fourier is STILL `^3.1.0` at HEAD and the K.W1 bump has NOT executed
- `web/package.json:14` = `"@mkbabb/glass-ui": "^3.1.0"`, `:15` = `"@mkbabb/keyframes.js": "^2.2.0"`. `web/node_modules/@mkbabb/glass-ui/package.json` version = **3.1.0** (installed). The entire K-deploy plan (incl. K.W1's `^3.1.0`→`^3.2.0` bump) is `planned`, un-run.
- This means fourier has NOT yet consumed `asideSide`, `useTextHighlight`, the dock-VT `useId()` fix, or `inert` — all of which shipped 3.1.1/3.2.0. Grep of `web/src` for `useTextHighlight`/`aside-side`/`test.fixme` returns only unrelated "inert" prose in comments. The next adoption wave inherits ALL of K.W1's adoption scope as a precondition (or executes it first).

### 5. fourier mounts GlassDock in THREE+ components — the AW.W1 3.3.0 dock-collapse regression DIRECTLY gates fourier's bump target
`grep "@mkbabb/glass-ui/dock"` in `web/src`:
- `web/src/components/visualization/CanvasControlsDock.vue:7` — `import { GlassDock, DockIconButton }`
- `web/src/components/visualization/EditorControlsDock.vue:6` — `import { GlassDock, DockIconButton }`
- `web/src/components/visualization/AnimationControls.vue:8` — `import { GlassDock, DockDropdownTrigger }`
Plus `web/src/components/equation/convergence/ConvergenceTimeline.vue` references GlassDock. K-era root-caused (`ADOPTION-ASKS.md §8`) that `CanvasControlsDock` + `EditorControlsDock` are **co-mounted** when `isEditing && store.contour && hasData`. **Verdict:** fourier is a GlassDock consumer with co-mounted docks, so per the AW context it MUST NOT bump to `^3.3.0` (the simple two-layer collapse width-morph freezes on first expand in 3.3.0). fourier's clean consume target is **3.4.0** (AW.W1 fix). This is the single load-bearing sequencing edge for any fourier glass-ui-adoption wave authored now: **the bump goes to `^3.4.0`, not `^3.3.0`.** (Note: the K.W1 plan currently still says `^3.2.0`; that target is stale-low relative to npm `latest=3.3.0`, and `^3.3.0` is regressed for dock consumers — so the adoption target must leapfrog to 3.4.0.)

### 6. The per-tranche file layout (the idiomatic skeleton a writer follows)
Verified across H/I/J/K dirs:
- **`<LETTER>/<LETTER>.md`** — the charter (e.g. `K/K.md`, `J/J.md`). The primary spec.
- **`<LETTER>/PROGRESS.md`** — the progress log, "Updated at every wave boundary. Reconciled at close." Carries a **Status board** table (Wave | Disposition | Status | Closed at | Notes) + a **Log** of dated entries. Present in H/I/J/K.
- **`<LETTER>/FINAL.md`** — the close ledger (present in H/I; ABSENT in J/K because both are open/authored). Has `§0 headline`, `§1 threads-by-disposition table`, `§2 hard-gate table`, `§3 commits`, `§4` rationale.
- **`<LETTER>/design/`** (J only) + **`<LETTER>/audit/`** (J only) — optional sub-dirs for design lenses (`J/design/WC-design-*.md`, `J-diff-shape.md`) and audit/screenshot evidence. An adoption tranche that touches visual surfaces would carry a `design/` lens set.

### 7. The charter (`<LETTER>.md`) section vocabulary (the house wave-spec format)
Verified identical across J.md and K.md — a writer reproduces these `## §N` headers IN ORDER:
- **Header block** (no §): bold `**Tranche letter**:` / `**Predecessor**:` (cites the prior `FINAL.md` or `<L>.md` + its ordering symbol) / `**Authored**:` (date + the audit-run provenance dir under `docs/audits/runs/<date>-<name>/`) / `**Mode**:` (`direct` vs `authored-now / executed-on-clean-checkout` under inv-16′) / `**Open**:` ("NOT YET … awaits the user's 'Begin'").
- **`## §0`** — the shape verdict / load-bearing insight (J↔K interleaving lived here; optional but idiomatic when there's a sequencing subtlety).
- **`## §1 — Thesis`**
- **`## §2 — Binding question`** (a single bold `> …?` block-quote question the tranche answers).
- **`## §3 — Goal criterion and completion criterion (paired)`** — bulleted wave list under Goal; **"Completion criterion (the evidence)"** bullets under it; ends "The §7 hard-gate list is the binding ledger."
- **`## §4 — Wave sequence`** — the **wave TABLE**: columns `| Wave | Disposition | Contents | Consumer (inv-15) |`. Disposition vocab = **DEV / SHIP / BOOK / FOLD / BOOK-with-kill-date**. Every wave names an **inv-15 consumer** (mandatory). Then **`### §4.1 — What <L> does NOT do (recorded, not dressed as a refuted wave)`**.
- **`## §5 — Inherited invariants`** — lists the load-bearing inherited inv-N (15/16/16′/26/27/28/29/30) and whether the tranche authors a NEW one.
- **`## §6 — Cross-repo perimeter (inv-16′)`** — "executable spine is fourier-local + …"; what is / is NOT a cross-repo ask.
- **`## §7 — Hard gates (completion criterion)`** — the binding bulleted gate ledger (each gate = one bullet, cites evidence shape).
- **`## §8 — Cross-tranche debt + explicit deferrals (folded)`** — sub-blocks: **Folded (SHIP-as-wave)** / **Named-forward (BOOKED, not built)** / **KILLED (terminal — never re-booked)** / **Disclaimed** / **Declined (recorded, not deferred)**.
- **`## §9 — Brittleness window (provisional)`**
- **`## §10 — Successor`**
- Optional dated **re-ground** appendix at the foot (`## Re-ground (<date> — <reason>)`) when premises shift.

### 8. The gate idiom + dispatch rules (lift these verbatim into the new wave)
- **Disposition words**: DEV (planning/close), SHIP (executes), BOOK / BOOK-with-kill-date (deferred with a NAMED kill-date), FOLD, KILL/KILLED-AS-PHANTOM/KILLED-BEFORE-BIRTH, DECLINED.
- **inv-15 (name-the-consumer)**: every wave row's last column. A substrate with no closed consumer is held (e.g. K's W5 wrapper "held until the spine it wraps lands").
- **inv-27 (green-means-green)**: every "green" claim cites a CI **run id** covering every job; a bump must cite a GREEN run id, "not a blind bump."
- **inv-16 / inv-16′**: fourier writes ONLY `fourier-analysis/**` (+ `deploy/**`); a glass-ui change is the maintainer's — fourier's act is *adoption of a published peer* (a caret bump), which is NOT a cross-repo ask. Each genuine cross-repo ask is a NAMED, ledgered `ADOPTION-ASKS.md §N` row, its own commit, gated on the target repo's own green CI, "authored-now / executed-on-clean-checkout."
- **Agent git clause (glass-ui CLAUDE.md K W0 + fourier inv-16)**: agents are READ-ONLY on git; the orchestrator owns the index. A dispatched wave-agent never stages/commits.
- **New-invariant numbering**: clean fresh-integer (G 25/26, H 27/28, I 29/30 → next is 31). A new fourier inv-31 is **namespace-partitioned** from the glass-ui precept "invariant 31" — resolve by namespace, never bare integer (`INVARIANTS.md §3`). Author a new invariant ONLY if it is load-bearing beyond one wave (the I-tranche test).

### 9. The ADOPTION-ASKS ledger rows touching fourier — verified at HEAD
`ADOPTION-ASKS.md §4` table + §7–§10:
- **`glass-ui-dock-vt-name`** — flipped to **DONE-in-glass-ui-3.1.1 / ADOPT-NOW** (`§10`); the fourier act is the caret bump. (Re-relevant for AW: the dock-VT useId fix is unrelated to the AW.W1 *collapse* regression — both touch GlassDock but are distinct defects.)
- **`glass-ui-a11y` (inert)** — DONE-in-3.1.1, ADOPT-NOW (un-`fixme` the 2 a11y keystones `visualization-crud.spec.ts:630`, `visualization-ux.spec.ts:110`).
- **A-3 `asideSide`** — DONE-in-3.2.0, ADOPT-NOW (consume `aside-side="left"`, delete the 3 grid overrides at `VisualizationView.vue:322/326/329`).
- **`useTextHighlight`** — DONE-in-3.2.0 **on `/dom`** (doc-drift corrected; NOT `/motion-core`).
- **A-1 (Configurator inter-row divider-rule) + A-2 (label/sub→ladder token hook)** — **BOOK-with-kill-date = glass-ui AT/3.3.0** (`§9`/`§10`); glass-ui SELF-BOOKED both to its AT successor (`AS/FINAL.md:146-155`). **STALE-AT-HEAD FINDING: these were booked against "AT/3.3.0"; 3.3.0 has now SHIPPED (the AU+AV cut).** A writer must re-verify whether A-1/A-2 actually landed in 3.3.0 or slipped further (likely toward the AW glass-atoms / Configurator-restyle waves — AW.W28 aurora-configurator restyle, AW.W22-26 glass atoms). Do NOT anchor on the "AT/3.3.0" kill-date prose; re-check the AW plan.
- **`glass-ui-P5-inner-rounding`** — KILLED-AS-PHANTOM, struck, never re-book.
- **`valuejs-J-atomdiff` + `valuejs-J-publish`** — DONE-in-value.js-L; fourier owes only its own `/diff`+publish Python parity probe (K.W6). Not glass-ui-relevant.

### 10. CONSTELLATION.md §4 fourier arm — verified
`CONSTELLATION.md:19` roster row: fourier-analysis = "the paper + viz-server (FastAPI/Vue)", "Cohort lead", boundary `fourier-analysis/** + deploy/**`, "push → webhook". `§4:64` execution arm: "tranche J, W0→W8 … W2 CORE". `§9` re-ground (2026-06-04) confirms every cohort head moved; the "wait for glass-ui" edge dissolved to an ADOPT-NOW bump. The §4 first-move for fourier per §6 sequencing is the bump at the FRONT of the chain. NOTE: CONSTELLATION.md §1/§4 still carry the stale "J authored / g.w5 release wave / 3.2.0" snapshot — read with the §9 correction; for AW it is further stale (glass-ui is now 3.3.0-published, 3.4.0-pending).

## Wave-forming input (for the AW-era fourier-adoption wave-spec writer)

- **Letter/symbol**: next tranche letter is **L** (collision with the booked **L-webmcp** — resolve per Finding 3: idiomatically name the adoption tranche **L-adopt** / **L-glassui** and slide webmcp to **M-webmcp**, OR open it as a new thread inside K-deploy since K.W1 is already the glass-ui bump). Next ordering symbol = **ξ′ (xi-prime)**, written as a new `CANONICAL-ORDERING.md §21 — ordering ξ′` at the tranche's W0.
- **Charter path**: `docs/tranches/L/L.md` (+ `L/PROGRESS.md`; `L/FINAL.md` at close; `L/design/` if visual surfaces). Reproduce the §0–§10 header set from Finding 7.
- **Bump target (load-bearing)**: `^3.1.0`→**`^3.4.0`** (NOT `^3.3.0` — dock-collapse regression; Finding 5), at `web/package.json:14`, + `npm install` + lock regen + single-keyframes-copy check (keyframes 3.0.0 vs glass-ui peer-widen `^2.2.0||^3.0.0`). Cite a GREEN fourier CI run id (inv-27).
- **Adoption scope inherited from un-run K.W1** (these are precondition, since they never executed): un-`test.fixme` the 2 a11y keystones (`visualization-crud.spec.ts:630`, `visualization-ux.spec.ts:110`) consuming `inert`; consume `aside-side="left"` + delete the 3 grid overrides (`VisualizationView.vue:322/326/329`); wire `useTextHighlight` from `@mkbabb/glass-ui/dom`; verify the dock-VT `useId()` fix (two distinct `view-transition-name`s, no duplicate-VT warning under a route VT capture, dock morph surviving).
- **New 3.4.0+ adoption candidates to evaluate** (SHIPPED-vs-PLANNED discipline — none adoptable until the relevant AW publish): the AW dock-collapse fix (W1, the gating reason for 3.4.0); `useViewTransition` / `useCountup` / `vReveal` motion surfaces (SHIPPED in 3.3.0 — fourier already hand-rolls a router `startViewTransition` bracket per I.ε, so `useViewTransition` is a candidate REPLACEMENT, inv-30 platform-over-library); the offscreen-pause WebGL substrate (3.3.0 — fourier runs an epicycle canvas rAF park per I.γ, a candidate consolidation IF fourier moves to a glass-ui WebGL substrate, otherwise honest-negative); `DockBackgroundToggle` (3.3.0 — only if fourier mounts an Aurora/GooBlob background, which it does NOT today → honest negative). A-1/A-2 Configurator divider/ladder asks (re-verify against the AW plan, NOT the stale AT/3.3.0 kill-date).
- **Gate sketch**: bump landed (file:line cited) + single keyframes copy + GREEN CI run id (inv-27); dock co-mount renders without collapse-freeze under 3.4.0 (the AW.W1 fix verified in-consumer); the 2 a11y keystones assert green; `asideSide`/`useTextHighlight` consumed; every wave names its inv-15 consumer.
- **Sequencing edges**: (1) fourier's bump is gated on glass-ui publishing **3.4.0** (AW.W1) — until then fourier holds at `^3.1.0` (or could bump to `^3.2.0` for the non-dock surfaces but that strands the dock fixes; cleaner to wait for 3.4.0 and do it once). (2) J.W6's inv-27 close is downstream of the bump (per K.md §0). (3) A-1/A-2 + any glass-atoms/Configurator-restyle consumption is gated on the AW.W22-28 publishes.
- **Cross-repo perimeter**: fourier writes only `fourier-analysis/**`; A-1/A-2 stay glass-ui-maintainer-owned `ADOPTION-ASKS` rows (inv-16). No new fourier→glass-ui write.

## Anti-findings (verified FINE / already correct)

- **The Greek-chain and letter conventions are internally consistent and well-documented** — `CANONICAL-ORDERING.md §17-§20` + `CONSTELLATION.md:28` + `INVARIANTS.md §3` all agree on κ′→λ′→μ′→ν′ and the namespace-partition rule. A writer has an unambiguous "what's next" answer (modulo the L-webmcp letter collision, which is itself documented as a deliberate slide).
- **The per-tranche file layout is uniform** — H/I/J/K all carry `<L>.md` + `PROGRESS.md`; closed ones add `FINAL.md`. No drift to reconcile.
- **The dock-VT `useId()` ask is correctly resolved** — `ADOPTION-ASKS.md §10` flips it DONE-in-3.1.1, ADOPT-NOW; no stale "wait on 3.2.0" framing survives at HEAD. (Distinct from the AW.W1 *collapse* regression.)
- **inv-16 boundary is clean** — fourier authored only `docs/**` for every cross-repo ask; the K/J charters never write a sibling tree. No boundary violation to flag.
- **`glass-ui-P5-inner-rounding` is correctly dead** — KILLED-AS-PHANTOM and struck; a writer must NOT resurrect it (the "3-tranche I→J→K inertia is the lesson" — `ADOPTION-ASKS.md:124`).
- **The new-invariant numbering is sound** — clean fresh-integer at 31, namespace-partitioned from precepts; documented in `INVARIANTS.md §2/§3`.

## Summary

fourier's next glass-ui-adoption wave is tranche letter **L** (collides with the pre-booked **L-webmcp** at `K/K.md:176` — resolve idiomatically by naming it **L-adopt/L-glassui** and sliding webmcp to **M-webmcp**, the same rename precedent K used), ordering **ξ′ (xi-prime)**, charter `docs/tranches/L/L.md` + `L/PROGRESS.md` (+ `FINAL.md` at close). The charter follows the H/I/J/K idiom: header block (Tranche letter/Predecessor/Authored-with-audit-provenance/Mode/Open) then `## §0`–`## §10` (Thesis, Binding question as a `>` block-quote, paired Goal/Completion criteria, a §4 wave TABLE keyed `| Wave | Disposition | Contents | Consumer (inv-15) |` with DEV/SHIP/BOOK/FOLD dispositions and a `§4.1 What it does NOT do`, Inherited invariants, Cross-repo perimeter inv-16′, Hard gates, §8 folded-debt blocks, Brittleness, Successor). Verified HEAD: branch master, HEAD `0167268`, tree light-dirty (only `RUN-BOARD.md`); **K-deploy is AUTHORED-only and awaits "Begin"; J is still OPEN (no FINAL.md)**; `web/package.json:14` is still `^3.1.0` (K.W1 bump un-run). LOAD-BEARING ADOPTION FINDING: fourier mounts **GlassDock in 3+ co-mounted components** (`CanvasControlsDock.vue:7`, `EditorControlsDock.vue:6`, `AnimationControls.vue:8`), so per the AW.W1 dock-collapse regression in 3.3.0 fourier MUST target **`^3.4.0`, not `^3.3.0`** — that is the single critical sequencing edge for the wave. A-1/A-2 Configurator divider/ladder asks were booked against "AT/3.3.0" which has now shipped; re-verify against the AW plan, do not anchor on the stale kill-date.

Digest path: /Users/mkbabb/Programming/glass-ui/docs/tranches/AW/audit/constellation/fourier-tranche-idiom.md

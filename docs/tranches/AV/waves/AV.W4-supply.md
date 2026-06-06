# AV.W4 — shadow-contract + Drawer-native(gated) + Card-cartoon

## 2. State

**Name**: W4 — shadow-contract + Drawer-native(gated) + Card-cartoon
**Opens after**: AV.W0 (the formalize + doc-currency wave — the `/api` header tally + the CLAUDE.md styles block re-sync land FIRST; W4 inherits a current doc surface). AT-disjoint with AV.W1–W3; opens before the 3.3.0 publish.
**Agents**: 3 parallel — three file-disjoint lanes (§4a): (A) shadow-contract (CSS + the overridable-token gate), (B) Drawer-native (CONDITIONAL — author IFF the ≥2-consumer muster clears, else KEEP-BOOK), (C) Card-cartoon dark-arm lift. No two lanes share a `modify` path.
**Hard gate**: two NEW born-RED gates green (`proof:shadow-contract` + `proof:card-cartoon-consumers`); the existing gate matrix + `typecheck` + `build` stay green with no regression; the Drawer-native lane EITHER lands a third gate (`proof:drawer-native-consumers`) green OR is formally BOOKed with its trigger named in `PROGRESS.md`.
**Status**: planned

**Type:** IMPL + doc-contract (lands after AV.W0; non-publish-blocking — supply-side surface a slides/deck consumer pins against).
**Scope source:** `docs/tranches/AV/audit/AUDIT-DIGEST.md` Stream A (shadow-cartoon-lg directive "it ships", the DEFERRED-FOLD ledger FOLD-AV Card cartoon dark-arm + AV-GATED Drawer `:native`/GlassNativeDrawer). This file is the FULLY-formed, execute-without-re-deriving spec for W4.

**Precepts in force.** No legacy / no back-compat aliases (clean breaks). KISS — document the existing contract, do not re-architect it. Token-first — every visual axis stays a `var(--…)` token; consumers parametrize by OVERRIDE, never re-declaration. Visual-load-bearing-ness (J inv 10) — the Drawer-native fold ships ONLY when ≥2 consumers muster; UNMET → KEEP-BOOK. Presets-in-consumers — the library's `--shadow-cartoon-lg` is its OWN identity token; named themed shadow presets live in consumers.

## 2a. Goal criterion

This wave succeeds if (1) the `--shadow-cartoon-lg` consumer-overridable token contract is DOCUMENTED + machine-enforced (a deck parametrizes the look by overriding the ONE token, not by re-declaring a dead local orphan), satisfying the user's "shadow-cartoon-lg is to ship" directive library-side; (2) the `Card surface="cartoon"` dark-arm is lifted token-adaptive so the cartoon decoration reads correctly under `.dark`; (3) the `GlassNativeDrawer` native-`<dialog>`-backed surface EITHER ships behind a cleared ≥2-consumer gate OR is formally KEEP-BOOKed with its named trigger — never speculatively shipped. The reader's test: a deck that writes `--shadow-cartoon-lg: <its value>` in `:root` re-tints every `.shadow-cartoon-lg` / `cartoon-surface` site with zero library edit; a deck that RE-DECLARES the token name as a dead local orphan still resolves through the `@theme` arm (the gate's bite).

## 3. Scope

1. **Shadow-contract (DOC + GATE).** `--shadow-cartoon-lg` ALREADY ships canonical at HEAD — the chain is `tokens.css:563` (raw value) → `tokens.css:568` (`--cartoon-shadow-lg` alias) → `theme.css:295` (`--shadow-cartoon-lg: var(--cartoon-shadow-lg)`) → `utilities.css:639` (the `.shadow-cartoon-lg` utility) → `cards.css:46` (`cartoon-surface` hover consumes it). The directive is SATISFIED library-side; W4 does NOT re-author the value. W4 (a) documents the consumer-overridable token contract in `CLAUDE.md` (decks override the `:root` token, NOT re-declare a local orphan — closes the f-w6-idiom ambiguity); (b) authors `proof:shadow-contract` proving the canonical chain is intact AND a re-declaring deck still resolves through the `@theme` arm.
2. **Card-cartoon dark-arm lift (FOLD-AV; 7 liftable).** Lift the `Card surface="cartoon"` dark-arm so the cartoon decoration is token-adaptive under `.dark` — the `--shadow-cartoon-color` / `--shadow-cartoon-color-soft` already carry `light-dark()` dark values at `tokens.css:1397-1398` and a dark `--shadow-cartoon-lg` at `tokens.css:1517+`; W4 verifies the `cartoon-surface` utility + the `Card surface="cartoon"` path reads those dark tokens (no hardcoded light shadow) and lifts any residual light-only literal to the token. Author `proof:card-cartoon-consumers` (≥2 consumer contexts for the `surface="cartoon"` path).
3. **GlassNativeDrawer (AV-GATED — CONDITIONAL).** A native-`<dialog>`-backed drawer surface DISTINCT from the existing `mode="live-behind"` prop (which rides vaul-vue). Author `GlassNativeDrawer` (composing `GlassDialogNative`, the native `<dialog>` wrapper at `src/components/custom/dialog-native/`) IFF the ≥2-consumer gate clears — the muster is `mode="live-behind"` FIRM + a 2nd native consumer. At HEAD the 2nd-native muster is UNMET → the spec DESCRIBES the fold conditionally and the lane KEEP-BOOKs it with the named trigger (a 2nd repo/story needing a native-`<dialog>` bottom sheet). Do NOT ship a single-consumer primitive (J inv 10).

## 3a. Triumvirate Dispatch

A triumvirate (research + plan augment + redress) is mandatory — the orchestrator may NOT redispatch the failing unit alone — when:

- **The shadow-contract gate cannot be authored manifest==ci without false-RED-ing the legitimate dark-arm re-declaration.** `tokens.css:1517` LEGITIMATELY re-declares `--shadow-cartoon-lg` inside the `.dark` block (a token re-resolution, not a dead orphan). A gate that reddens the canonical dark-arm re-declaration is a plan defect, not a local fix — halt and triumvirate to encode the dark-arm as an allowlisted re-declaration site.
- **The Drawer-native ≥2-consumer muster is ambiguous** — if the 2nd native consumer is a `_fixture` dev-only story (the FG.W-deck precedent: ≥2 UNMET because `_fixture` is dev-only), the muster does NOT clear and the redress is to BOOK, NOT to force the fold. The redress is a KEEP-BOOK decision, not a local edit.
- **The Card-cartoon dark-arm lift would change the light-arm paint.** If lifting a residual light literal to the `light-dark()` token shifts the light-mode cartoon shadow off its HEAD value (a visual regression the snapshot would catch), halt — the lift must be paint-identical in light mode.
- **Any diagnostic loop reaches its third iteration** on the dark-arm browser verify — halt, do not iterate a fourth time.

## 4. File Bounds

| File | Access | Lane |
|---|---|---|
| `src/styles/cards.css` | modify (Card-cartoon dark-arm verify/lift) | C |
| `src/styles/tokens.css` | modify (dark-arm token verify; likely no-op) | C |
| `src/components/ui/card/Card.vue` | audit (the `surface="cartoon"` class path; likely no-op) | C |
| `src/components/ui/card/__tests__/Card.test.ts` | modify (cartoon dark-arm assertion) | C |
| `src/components/custom/drawer-native/GlassNativeDrawer.vue` | create — CONDITIONAL (IFF muster clears) | B |
| `src/components/custom/drawer-native/index.ts` | create — CONDITIONAL | B |
| `src/drawer-native.ts` | create — CONDITIONAL (the subpath barrel) | B |
| `CLAUDE.md` | modify (shadow-contract doc paragraph + Structure block IF Drawer-native lands) | A |
| `scripts/proof-shadow-contract.mjs` | create | A |
| `scripts/proof-card-cartoon-consumers.mjs` | create | C |
| `scripts/proof-drawer-native-consumers.mjs` | create — CONDITIONAL | B |
| `scripts/gates.mjs` | modify (register, orchestrator-merged) | A/B/C |
| `package.json` | modify (scripts + exports IF Drawer-native lands) | A/B/C |
| `vite.library.ts` | modify (the `drawer-native` entry) — CONDITIONAL | B |
| `docs/tranches/AV/PROGRESS.md` | modify | all |
| `docs/tranches/AV/audit/W4-shadow-contract.json` | create (the gate tally) | A |
| `docs/tranches/AV/audit/W4-cartoon-consumers.json` | create (the consumer tally) | C |

Do NOT touch: `src/styles/theme.css` / `src/styles/utilities.css` (the `--shadow-cartoon-lg` @theme bridge + the `.shadow-cartoon-lg` utility are CANONICAL at HEAD — read-only; the chain is INTACT, W4 documents not re-authors it) · `src/components/ui/drawer/` (the vaul-vue `mode="live-behind"` drawer is UNCHANGED — `GlassNativeDrawer` is a SEPARATE native-`<dialog>` surface, not a Drawer mode) · any runtime JS color path.

## 4a. Disjointness

No two agent units share a `modify` or `create` path:

- **Lane A (shadow-contract)** owns `proof-shadow-contract.mjs` + the `CLAUDE.md` doc paragraph + the `W4-shadow-contract.json` tally. It READS `tokens.css`/`theme.css`/`utilities.css`/`cards.css` but EDITS none (the chain is canonical). Disjoint.
- **Lane B (Drawer-native)** owns the new `drawer-native/` dir + `src/drawer-native.ts` + the `vite.library.ts` entry + `proof-drawer-native-consumers.mjs`. CONDITIONAL — if the muster does not clear, Lane B writes NOTHING but the KEEP-BOOK record in `PROGRESS.md`. Disjoint.
- **Lane C (Card-cartoon)** owns `cards.css` + `Card.test.ts` + `proof-card-cartoon-consumers.mjs` + the `W4-cartoon-consumers.json` tally. Lane A does NOT edit `cards.css` (it reads it). Disjoint.
- `scripts/gates.mjs` + `package.json` are touched by all three for gate/export registration — append-only to disjoint regions (different script rows / manifest entries). The orchestrator integrates at close in one commit to avoid an index race, OR each lane registers in its own worktree and the orchestrator resolves the trivial append-merge. `CLAUDE.md` is Lane-A-owned (the shadow doc paragraph) + Lane-B-conditional (the Structure block line IF Drawer-native lands) — orchestrator-merged.

Net: three parallel lanes — **(A) shadow-contract**, **(B) Drawer-native (conditional)**, **(C) Card-cartoon**. `gates.mjs`/`package.json`/`CLAUDE.md` registration is orchestrator-integrated.

## 4b. Worktree Plan

| Agent unit lane | Sibling worktree absolute path | notes |
|---|---|---|
| Lane A — shadow-contract | `/Users/mkbabb/Programming/glass-ui-w4-a` | owns the gate + the CLAUDE.md doc paragraph; reads the CSS chain |
| Lane B — Drawer-native (conditional) | `/Users/mkbabb/Programming/glass-ui-w4-b` | owns the new `drawer-native/` family — writes nothing if muster fails |
| Lane C — Card-cartoon | `/Users/mkbabb/Programming/glass-ui-w4-c` | owns `cards.css` + `Card.test.ts` + the consumer gate |

No `CARGO_TARGET_DIR` (Node/Vite repo). Each lane runs `npm run typecheck`/`npm run build`/its gates against its own worktree checkout. The orchestrator runs `git worktree add` for the siblings before dispatch and owns the `gates.mjs`/`package.json`/`CLAUDE.md` integration at close. All three lanes branch from the same clean main with AV.W0 committed.

## 5. Agent Units

### AV.W4.A Shadow-contract doc + gate

- Goal: the `--shadow-cartoon-lg` consumer-overridable token contract is DOCUMENTED in CLAUDE.md (override, never re-declare) and machine-enforced — the canonical chain is intact AND a re-declaring deck still resolves through the `@theme` arm.
- Mechanism:
  - **`CLAUDE.md`** — add a "Cartoon-shadow override contract" paragraph under the Conventions block: glass-ui ships `--shadow-cartoon-{sm,md,lg}` as its OWN identity tokens (the canonical chain `tokens.css → theme.css @theme bridge → utilities.css utility → cards.css consumer`). A consumer retints the cartoon shadow by OVERRIDING the `:root` token (`:root { --shadow-cartoon-lg: <value>; }`), which re-resolves every `.shadow-cartoon-lg` utility + `cartoon-surface` site — NOT by re-declaring a dead local orphan that never paints (the f-w6-idiom ambiguity: a deck's `feedback-coder/theme.css:127 --shadow-cartoon-lg: 7px 7px` dead local re-declaration is the anti-pattern; the override must sit on the cascade path glass-ui's utilities read). Document that the `.dark` arm legitimately re-resolves the token (`tokens.css:1517`).
  - **`scripts/proof-shadow-contract.mjs`** — author on the house template (`scripts/proof-dock-opacity-lockstep.mjs`: comment-strip first, a pure exported detector, a byte-stable JSON artefact via `scripts/gate-output.mjs`, `process.exit(1)` on violation). Assertions: (1) CHAIN-INTACT — comment-strip the four files and assert the four chain links exist (`tokens.css` declares the raw `--shadow-cartoon-lg` value + the `--cartoon-shadow-lg` alias; `theme.css` `@theme` bridges `--shadow-cartoon-lg: var(--cartoon-shadow-lg)`; `utilities.css` declares the `.shadow-cartoon-lg` utility reading `var(--shadow-cartoon-lg)`; `cards.css` `cartoon-surface` consumes `var(--shadow-cartoon-lg)`); (2) OVERRIDE-RESOLVES (the bite) — the utility + `cartoon-surface` read the token through `var(--shadow-cartoon-lg)` (NOT a hardcoded literal), so a `:root` override re-resolves them; (3) DARK-ARM-ALLOWED — encode an allowlist of the LEGITIMATE re-declaration sites (`tokens.css:1517` `.dark`; `tokens.css:1397-1398` the `light-dark()` color tokens) so the dark-arm re-resolution does NOT false-RED.
- Files: `CLAUDE.md` (modify), `scripts/proof-shadow-contract.mjs` (create), `docs/tranches/AV/audit/W4-shadow-contract.json` (create — the chain-link tally), `scripts/gates.mjs` + `package.json` (register, orchestrator-merged).
- Sub-gate: `proof:shadow-contract` (NEW, born-GREEN — the chain ships at HEAD, so the gate is a contract-LOCK, not a born-RED fold) green + bite-verified. Bite: hardcode the `.shadow-cartoon-lg` utility's `box-shadow` to a LITERAL (breaking the `var(--shadow-cartoon-lg)` indirection a `:root` override needs) → RED; OR delete the `@theme` bridge → RED. Register `["local","ci","release"]`.

### AV.W4.B GlassNativeDrawer (CONDITIONAL — IFF muster clears)

- Goal: a native-`<dialog>`-backed drawer surface ships IFF ≥2 consumers muster; UNMET → formally KEEP-BOOKed with the named trigger.
- Mechanism:
  - **MUSTER FIRST (gate before write).** Author `scripts/proof-drawer-native-consumers.mjs` (mirrors `proof-au-w9-consumers.mjs`: a `docs/tranches/AV/audit/W4-drawer-native-consumers.json` tally of ≥2 DISTINCT consumer contexts each RESOLVING at HEAD; a cited path that does not exist FAILS). The muster is `mode="live-behind"` FIRM (the existing vaul-vue drawer is a DISTINCT surface — it does NOT count as a native consumer) + a 2nd native consumer. At HEAD the 2nd native is UNMET → the muster does NOT clear.
  - **IF the muster clears** — author `GlassNativeDrawer.vue` composing `GlassDialogNative` (the native `<dialog>` wrapper at `src/components/custom/dialog-native/`), a bottom-sheet variant with the glass-drawer LOOK tokens (`--drawer-*` from `drawer.css`); add `src/components/custom/drawer-native/index.ts` + `src/drawer-native.ts` subpath barrel + the `vite.library.ts` `drawer-native` entry + the `package.json` `./drawer-native` export + the `CLAUDE.md` Structure block line.
  - **IF the muster does NOT clear (HEAD reality)** — write NOTHING but the KEEP-BOOK record in `PROGRESS.md`: "GlassNativeDrawer KEEP-BOOK — trigger: a 2nd repo/story needing a native-`<dialog>` bottom sheet distinct from the vaul-vue `mode='live-behind'` path. At HEAD only the live-behind surface musters; the native surface is substrate-without-consumer (J inv 10)." Do NOT create any file.
- Files (CONDITIONAL): `src/components/custom/drawer-native/GlassNativeDrawer.vue`, `src/components/custom/drawer-native/index.ts`, `src/drawer-native.ts`, `vite.library.ts`, `package.json`, `CLAUDE.md`, `scripts/proof-drawer-native-consumers.mjs`, `docs/tranches/AV/audit/W4-drawer-native-consumers.json`. If BOOKed: only `docs/tranches/AV/PROGRESS.md` + the (RED-asserting) consumer tally.
- Sub-gate: `proof:drawer-native-consumers` (CONDITIONAL) — green IFF the fold lands with ≥2 resolving consumers; if BOOKed, the lane records the BOOK and registers NO gate (a born-RED gate against an un-folded file violates manifest==ci). `npm run typecheck` + `npm run build` stay green either way.

### AV.W4.C Card-cartoon dark-arm lift

- Goal: the `Card surface="cartoon"` decoration reads token-adaptive under `.dark` — no hardcoded light-only shadow leaks into the dark arm.
- Mechanism:
  - **`src/styles/cards.css`** — AUDIT the `cartoon-surface` `@utility` (`:33-48`): it reads `var(--shadow-cartoon-md)` (rest, `:35`) + `var(--shadow-cartoon-lg)` (hover, `:46`). These tokens ALREADY carry the `.dark` re-resolution (`tokens.css:1517+` dark `--shadow-cartoon-lg`; the `--shadow-cartoon-color*` `light-dark()` at `:1397-1398`). Verify the utility reads ONLY tokens (no light literal) → token-adaptive by construction. If a residual light literal exists, lift it to the `light-dark()` token. Light-arm paint MUST be byte-identical to HEAD (triumvirate per §3a if it shifts).
  - **`src/components/ui/card/Card.vue`** — AUDIT the `surface === 'cartoon' && 'cartoon-surface'` class path (`:72`): confirm no light-only inline shadow. Likely no-op; record.
  - **`src/components/ui/card/__tests__/Card.test.ts`** — ADD a `surface="cartoon"` dark-arm assertion: under `.dark`, the rendered card carries the `cartoon-surface` class (the dark shadow re-resolution is CSS-token, not class-conditional — assert the class is present + the token chain resolves).
- Files: `src/styles/cards.css` (modify — verify/lift), `src/styles/tokens.css` (audit; likely no-op), `src/components/ui/card/Card.vue` (audit; likely no-op), `src/components/ui/card/__tests__/Card.test.ts` (modify), `scripts/proof-card-cartoon-consumers.mjs` (create), `docs/tranches/AV/audit/W4-cartoon-consumers.json` (create).
- Sub-gate: `proof:card-cartoon-consumers` (NEW) green — a `W4-cartoon-consumers.json` tally of ≥2 DISTINCT `surface="cartoon"` consumer contexts (a demo story + a consumer repo, each RESOLVING at HEAD; mirrors `proof-au-w9-consumers.mjs`). `Card.test.ts` green (light + dark cartoon arm). Register `["local","ci"]`.

## 6. Hard Gate

W4 closes when every condition below is evidence-backed:

1. **AV.W4.A** — `proof:shadow-contract` GREEN + bite-verified (hardcode the `.shadow-cartoon-lg` utility literal → RED); the `CLAUDE.md` override-contract paragraph names the canonical chain + the override-not-re-declare idiom + the legitimate `.dark` re-resolution; the dark-arm allowlist prevents the false-RED. Registered `["local","ci","release"]`.
2. **AV.W4.B** — EITHER `GlassNativeDrawer` ships with `proof:drawer-native-consumers` GREEN (≥2 resolving consumers) + the subpath/export/Structure-block landed, OR the fold is formally KEEP-BOOKed in `PROGRESS.md` with the named trigger and NO file created + NO gate registered. The vaul-vue `mode="live-behind"` drawer is UNCHANGED in either case.
3. **AV.W4.C** — `proof:card-cartoon-consumers` GREEN (≥2 resolving consumers); the `cartoon-surface` utility is token-adaptive (no light literal); `Card.test.ts` light+dark cartoon assertions green; light-arm paint byte-identical to HEAD. Registered `["local","ci"]`.
4. **No regression.** The existing gate matrix stays GREEN through W4: `proof:theme`, `proof:components-css`, `proof:phantom-classes`, `proof:doc-consistency`, `proof:vueuse-free-root`, `npm run typecheck`, `npm run build`, the component unit suites. `PROGRESS.md` records the wave with a green run id.

**Born gate registration (manifest==ci invariant):**

| gate | script | tags | bite-check |
|---|---|---|---|
| `proof:shadow-contract` | `scripts/proof-shadow-contract.mjs` | `["local","ci","release"]` | hardcode `.shadow-cartoon-lg` utility to a literal → RED |
| `proof:card-cartoon-consumers` | `scripts/proof-card-cartoon-consumers.mjs` | `["local","ci"]` | drop a consumer to <2 → RED |
| `proof:drawer-native-consumers` (CONDITIONAL) | `scripts/proof-drawer-native-consumers.mjs` | `["local","ci"]` | only IF the fold lands; <2 consumers → RED |

All follow the house gate template (`scripts/proof-dock-opacity-lockstep.mjs` / `scripts/proof-au-w9-consumers.mjs` for the consumer-tally form). Register in `package.json` + `gates.mjs` ONLY after the fold is complete (`verifyCi()` enforces manifest==ci).

## 7. Format And Lint Cadence

- `npm run typecheck` (`vue-tsc --noEmit`) — after AV.W4.C (the Card.test.ts change) and at close; and after AV.W4.B IF the Drawer-native fold lands.
- `npm run build` — after AV.W4.C (confirm Lightning CSS emits the token-adaptive cartoon shadow) and at close; and after AV.W4.B IF the fold lands (confirm `dist/drawer-native.js` emits).
- The three NEW gates + the no-regression existing-gate matrix run after their fold completes and at close.
- `git diff --check` (whitespace/conflict-marker) on the DOCS-edited files (`CLAUDE.md`, `PROGRESS.md`) at close.
- The component unit suites (`__tests__/`) run after AV.W4.C.

No formatter is intentionally skipped; the gate fleet is the binding evidence.

## 8. Verification Artefacts

- `proof:shadow-contract` JSON artefact (`docs/tranches/AV/audit/W4-shadow-contract.json` chain-link tally) — byte-stable via `scripts/gate-output.mjs`.
- `proof:card-cartoon-consumers` JSON artefact (`W4-cartoon-consumers.json`) — the ≥2-consumer tally.
- `proof:drawer-native-consumers` JSON artefact (CONDITIONAL) OR the KEEP-BOOK record in `PROGRESS.md` with the named trigger.
- Card cartoon light+dark browser-verify notes — `docs/tranches/AV/PROGRESS.md`.
- The green CI run id for the wave — `PROGRESS.md`.
- The integration commit hashes (per §9).

## 9. Commit Plan

- **Lane A (shadow-contract) commit** — `docs(tranche-AV): W4 — shadow-cartoon-lg override contract + proof:shadow-contract (born-GREEN lock)`. (Body required — names the canonical chain + the override-not-re-declare idiom + the dark-arm allowlist.)
- **Lane C (Card-cartoon) commit** — `fix(tranche-AV): W4 — Card surface=cartoon dark-arm token-adaptive + proof:card-cartoon-consumers`. (Body required — names the dark-arm tokens + the light-arm byte-identity.)
- **Lane B (Drawer-native) commit** — IF landed: `feat(tranche-AV): W4 — GlassNativeDrawer (native <dialog> bottom sheet) + /drawer-native subpath`; IF BOOKed: folded into the close commit's PROGRESS record (no standalone commit). (Body required IF landed — names the muster + the subpath.)
- **Orchestrator gate-registration commit** — `chore(tranche-AV): W4 — register proof:shadow-contract + proof:card-cartoon-consumers (manifest==ci)`. (Body required — names the manifest rows + tags.)
- **Orchestrator integration + docs commit** — `docs(tranche-AV): W4 close — PROGRESS green run id + CLAUDE.md shadow contract + Drawer-native disposition`. (Body required — status/close + the Drawer-native land-or-BOOK disposition.)

## 10. Dependencies

- **Depends on**: AV.W0 (the `/api` header tally + CLAUDE.md styles-block re-sync — W4's CLAUDE.md doc edits land on a current doc surface). The `dialog-native/` family (`GlassDialogNative`) exists at HEAD (the Drawer-native compose target). The vaul-vue `mode="live-behind"` drawer (AN.W3) ships at HEAD (the distinct surface the native muster is measured AGAINST).
- **Blocks**: nothing publish-blocking (W4 is non-publish-blocking supply IMPL). The AV tranche FINAL/close (AV.W6) depends on W4's gate matrix being green.

## 11. Archaeology

Not a re-attempt of a prior failed wave. Three HEAD-grounding corrections fold into the units (NOT prior-failure archaeology — they correct STALE digest claims against HEAD):

1. **`--shadow-cartoon-lg` ships canonical — confirmed against HEAD.** The chain is `tokens.css:563/568 → theme.css:295 → utilities.css:639 → cards.css:46`. The directive "shadow-cartoon-lg is to ship" is SATISFIED library-side; W4 documents the override contract + LOCKS it with a gate, it does NOT re-author the value. The digest's f-w6-idiom ambiguity (a deck re-declaring a dead orphan) is closed by the doc paragraph + the gate's OVERRIDE-RESOLVES assertion.
2. **The dark-arm already carries the dark shadow tokens.** `tokens.css:1397-1398` (`light-dark()` `--shadow-cartoon-color*`) + `tokens.css:1517+` (dark `--shadow-cartoon-lg`) ship at HEAD. The Card-cartoon lift is a VERIFY-and-record-mostly task (confirm `cartoon-surface` reads tokens not literals), not a re-author. The light-arm paint must be byte-identical.
3. **Drawer-native is GATED, not assumed.** The digest's AV-GATED ledger names the 2nd-native muster as UNMET at HEAD. W4 does NOT speculatively ship `GlassNativeDrawer`; it musters FIRST and BOOKs if <2 (J inv 10). The `dialog-native/` family already exists as the compose target if the muster ever clears.

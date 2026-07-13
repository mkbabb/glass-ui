# glass-ui → Atlas — the Decision-0 outbound + answers to asks #21-25 (2026-07-12)

Atlas's §6 reciprocal: "a dated outbound on the Decision-0 ruling (tag number + timing) reaches us within a fold." Here it is, with the answers to the pass-R1/R2 asks #21-25 folded in. Read-only across your tree confirmed the sites cited below; this file lands in OUR coordination dir only (the foreign-tree fence — glass-ui edits ZERO sibling files).

## Decision-0 — RULED

- **The cut is 5.0.0 — ONE major** at the BI close, carrying repairs + greenfields + the structure flatten. **Publish AUTHORIZED** by the owner.
- **Timing**: ~1.5-2 weeks (BI close-gated; the tag stays USER-gated until the BI battery + the π-attestation close ceremony pass).
- Your fire-on-cut consume wave re-keys to `5.0.0` mechanically. Your `no-synthetic-body-dispatch.gate` greps the installed dist for the deletion marker (version-agnostic) — that holds; the synthetic-body-dispatch deletion IS in the 5.0.0 dist (see #22a).

## #21 — the flatten export-map delta

**Answer**: a dated outbound with the old→new subpath table is OWED when `BI.W-STRUCTURE-RESEQUENCE` (B9) stabilizes the export map — that wave is the named owner of the flatten. Until it lands, the map is IN FLUX; a premature table would strand your re-point sweep on a moving target. When B9 stabilizes, this channel carries the old→new table (or a pointer to its ledger) so you land the mechanical re-point sweep same-batch with the re-pin. Named owner: **`BI.W-STRUCTURE-RESEQUENCE`** (B9); timing: its close, within the 5.0.0 window.

## #22 — the dock-greenfield contract note (what is KNOWN now)

- **(a) The synthetic-dispatch deletion SURVIVES the greenfield.** The synthetic body-dispatch (`useDockState` rework, your `00621130` reference) is DELETED at HEAD, and the BI dock spine (`BI.W-DOCK-SPINE`) does NOT reintroduce it — the greenfield is a first-principles rebuild on the compositor-transform morph, not a return to synthetic dispatch. Your primary D2 cure holds through the greenfield. Confirmed KNOWN now.
- **(b) PEEK / tri-state detent + (c) the dismiss model** — OWED when **`BI.W-DOCK-SPINE`** lands (named owner + timing: its close). The greenfield's dock morph "does not work at all" at the audit HEAD is exactly why the contract is not yet stable; a note naming whether PEEK/tri-state is native to the new dock (your #17 self-host bridges to it and retires) and the new dock's residual cross-layer dismiss model reaches you when the spine's contract stabilizes. Re-verify your CD-01/W-L4 against the greenfield, not 4.2.0's dock, at re-pin time.

## #23 — the BorderProgress successor

**Answer**: `BI.W-BORDER-PROGRESS-RETIRE` retires BorderProgress at **0 consumers** (a clean retire, not a fold). The dock scroll-progress affordance (your standing #185 directive) lands as **`BI.W-SCROLL-PROGRESS-RIM`** — a masked-band progress RIM on the dock plate (the progress IS the dock's edge, the masked-conic register, radius-following) — that is the successor primitive your dock-progress single-owner consume targets. Point #185 at `BI.W-SCROLL-PROGRESS-RIM`, never the retiring BorderProgress. Per your R2 ruling: **zero OTHER hallmark primitives owed** — you discharge RM-2 by consumption (animated-digit/completion-seal via the compositor family, `/data-table` for the browser shell); the only owner-gated escalation is the `animated-digit` odometer widening, assumed-nothing-owed until a dated ask lands here.

## #24 — the /deck headless core (VERIFIED on disk)

glass-ui **ALREADY SHIPS `/deck`** — `@mkbabb/glass-ui/deck` (BC.W-DECK; `src/components/custom/deck/`, subpath key present `package.json:502`). It is the headless PRESENTATION core, DISTINCT from `/carousel`'s embla item-scroller. The contract facts, verified at `src/components/custom/deck/composables/useDeck.ts`:

- **`useDeck(total, opts): DeckCore`** — the headless deck-state core. `DeckCore`: `index: Ref<number>` (0-based, clamped `[0, total-1]`), `total: number`, `progress: ComputedRef<number>` (`(index+1)/total*100`), `liveMessage: ComputedRef<string>` (the "Slide N of M" aria-live announcement, `label(index)` override in opts), `go(i)`, `next()`, `prev()`, `first()`, `last()`. `UseDeckOptions`: `initial` (clamped), `onNavigate(to, from)` (fired AFTER a nav commits), `label(index)`.
- **`useDeckKeyboard` / `handleDeckKey`** — the focus-guarded keyboard pager (Space/digit reach a focused control's native activation).
- **`installDeckSpring` / `deckEase` / `DECK_SPRING`** — the LAZY keyframes-dynamic-import spring (the static graph is keyframes-FREE + vueuse-FREE, root-barrel-clean).
- **`DeckPager`** — the windowed dots over the ONE `PagerWindow` oracle.

**The honest render-contract divergence you must know**: the SHIPPED core exposes `index`/`total` and the README demonstrates a BINARY `:data-state="i === deck.index.value ? 'active' : 'inactive'"` (`README.md:56`). It does NOT bake the tri-state `[data-state] = active|prev|next` render contract you + slides annotate — the core is state-only, the per-slide `active|prev|next` mapping is a CONSUMER render choice a consumer derives from `index` (`i === index` → active, `i === index - 1` → prev, `i === index + 1` → next). So: the headless PRIMITIVE you asked to stake (#24 — index/progress/go/next/prev + per-slide `{index,total,active}` context) IS SHIPPED at HEAD; if you (and slides) want the `active|prev|next` tri-state as a first-class core export rather than a consumer-derived mapping, that is a small ADDITIVE ask (a `stateFor(i)` helper on `DeckCore`) — file it and it rides `BI.W-DECK-*` or a 5.x point release. Atlas is now the concrete SECOND consumer (with slides as #1 post-modernization); the shared core stays at OUR root, not forked. Per your R1 split: glass owns the headless primitive; atlas owns deck MOTION only (`W-DECK-DETENT` — scroll-snap detents + the between-deck View Transition).

## #25 — the `@property` registration posture

glass-ui registers typed CSS custom properties via `@property` in **`tokens/property-regs.css`** (+ `tokens/property-regs-specular.css`, the specular/moving-magnitude cohort carved at `BI.W-STYLE-REDRAIN`). The convention, one paragraph: every registration sets `initial-value` = the **dormant / identity state** — the safe resting value a consumer resolves on an engine below the registration floor OR before the first typed write (`--progress-crescendo: 0%`, `--border-progress-fill: 0%`, `--goo-t: 0`, `--tab-blob: 1`, `--glass-level: 1`, `--dock-expand-t` at its identity). This IS the NO-MASKING-FALLBACK edict: an identity-REST fallback is HONEST (the dormant state IS the identity — `var(--x, identity)`), never a plausible-STATE fallback that paints an active look over a dead binding. There are **NO `@supports` guards on the registrations** — the registrations declare unconditionally; the `initial-value` is the graceful degrade (the cross-fade collapses to the identity, then re-paints at the new state) on a pre-floor engine. Browser floor: Chromium 85+ / **Safari 16.4+** / Firefox 128+ (within your Safari 16.4+ ask-#25 floor). Both your banked constructions (the registered motion-dial bank; the skin type-scale on the title-wave registrations) can share this ONE posture — unconditional registration, identity `initial-value`, no `@supports` fork.

## The rhythm

We read your BH + BI coordination dirs each fold. Asks #21 (owed at B9 STRUCTURE-RESEQUENCE), #22b/c (owed at BI.W-DOCK-SPINE), #23 (RULED — successor `BI.W-SCROLL-PROGRESS-RIM`), #24 (VERIFIED shipped + the honest tri-state divergence), #25 (RULED — the posture above). The forthcoming §5 items (skins/atmosphere RM-9, easing double-down, event/hook RM-3) are congruent with our `BI.W-AURORA-VIBRANCY` + token work — flagged, no ask yet actioned.

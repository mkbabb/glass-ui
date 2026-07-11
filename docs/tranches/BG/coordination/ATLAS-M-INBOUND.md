# ATLAS-M INBOUND — dispositions (2026-07-01)

**Source:** `sci-report/atlas/docs/tranches/M/coordination/GLASS-BG-BH.md` (their `9850638`), relayed by
the user. Read READ-ONLY; every disposition below is a glass-ui-side fold or a relay-back. The atlas
gates NOTHING on these (their process law 4); no publish pressure exists.

## Tier 1

**1 · Early 4.3.0 cut — USER-GATED DIRECTED OPTION, recorded in `publish-and-cut.md §0-EARLY`.**
Disk truth: `release/4.3.0` EXISTS with the contents BUILT (`28cf1cd1` — Δ1 bare `DockIconButton`
variant, Δ2 `ExpandableContainer` single-instance reparent + `@settle` (E14), Δ3 `GlassDock` `side`
prop; Δ4 `#persistent-end` deferred on the shell.css ratchet). The choreography is the already-designed
§0 reconcile executed EARLY: merge `release/4.3.0`→master → `--run full` siblings-absent → tag 4.3.0 →
release.yml publish. Leverage (theirs): drains K-A-DOCK, feeds M.W1-B's crest-button, clears K-REPOINT.
The Δ6 handmark asks are NOT on that branch (see item 4-adjacent below). **The trigger is the user's
publish hinge — the option is staged, not fired.** The Drawer attr-fix (item 2) is a natural rider if
fired after it builds.

**2 · Drawer/DialogPortal attribute forwarding — CONFIRMED REAL, folded as a clause on cursor 10.2.**
Verified: `DrawerContent.vue` has no `inheritAttrs`/`v-bind="$attrs"` path to the portal-rooted content
node — `aria-label`/`aria-labelledby`/`data-testid` evaporate (their M30-F5/G23; a11y-load-bearing for
their G-M9). Root-repo law: our fix. Folded into `10.2 W-SHEET-INSET-ROOT` (the overlay-family
encapsulation wave, precond-free) as the PORTAL-ATTRS clause: every portal-rooted overlay Content SFC
(Drawer/Sheet/Dialog family) forwards `$attrs` to the content node + a `proof:encapsulation` bite
asserts it (a planted `aria-label` resolves in the rendered tree).

**3 · Dock seam stability — CONTRACT ACCEPTED, name CORRECTED, folded as a clause on cursor 4.1.**
The seam they name (`useDockCollapse.expand()`) does not exist — the real seam is
**`useDockState.{expand, collapse, expanded}`** (`useDockState.ts:34,54`) + the `SPRING_PRESETS` row
names. Folded into `4.1 W-DOCK-ENGINE-UNIFY`: the public seam is a STABLE CONTRACT through the
engine-unify (and WS3/WS10 touches); any rename/move is a BREAK that must be relayed BEFORE their M.W1
dispatches. RELAY-BACK: correct their crest-button wiring to `useDockState.expand()`. CAP-SCROLLS
(`4.7`) and the ring-alias proceed as planned; their 12-site re-point pre-stages and pins by commit —
noted, no re-litigation.

## Tier 2

**4 · GP8 tab pull-morph-squish — DISCHARGED-BY-EXISTING (no charter).** Shipped at BB.W-DRAG-MORPH:
`<SegmentedTabs :draggable>` (`SegmentedTabs.vue:107-110`) over `useDragMorph` (kf `Draggable` + native
`snap:` since BH B1-W3 `ba23c086`), pill-material, fling-to-nearest, PRM-safe; `DockLayerGroup
:draggable` is consumer #2; the perfected spec is `KS-MOTION-DISNEY`/`KS-DOCK`-adjacent (F5 bindings).
RELAY-BACK the pointer; if P149 wants a delta beyond the shipped axis, they name it as a NEW ask.

**4-adjacent · The Δ6 handmark 5 asks — CONVERGENT with KS-HANDMARK; carried by 14.3.** Three of five
(`Brush.amplitude` public knob · hull se-guard · aspect-correct text viewBox) were INDEPENDENTLY
diagnosed by KS-HANDMARK's corpus lane as the shipped-vs-perfect gap — strong convergence. The other
two (`crayon-wipe` re-ship · per-line band) join 14.3's clause list per this ask (fallback-first on
their side, so never blocking). `KS-HANDMARK.md` is the binding spec; 14.3's builder verifies all five
land.

**5 · Skeleton `variant="breath"` — CONFIRMED EXISTS at 4.2.0, no action.** `Skeleton.vue:26`
`SkeletonVariant = 'pulse' | 'shimmer' | 'breath'` (AI.W4-M.3; PRM retires to the trough); the default
surface is opaque (`bg-muted`, sanctioned). Their `variant="breath" surface="opaque"` works today.
RELAY-BACK the confirm; their M.W9 reduced treatment is unnecessary.

**6 · GU-1 + K-PAPER-P2-UNDER-KEY-FILL (the 4.4.0-line pair) — CONFIRMED ON THE LINE.** GU-1 is a
named reason the 4.4.0 tag exists (`^4`-reachability); the paper under-key fill joins the 4.4.0-line
contents ledger — 14.1's builder (KS-PAPER binding) checks the under-key fill's carrier and, if
uncovered, it is a 14.1 clause (the ask degrades gracefully per atlas; schedule at our convenience).

**7 · The canonical primitives REGISTER — ACCEPTED, folded as a clause on cursor BH.B4-canon.**
Publish a machine-readable canonical-primitives register (GENERATED beside `structure.md`/
`dependencies.md` from the export manifest + canon docs — the derive-not-hand-author discipline), so
atlas G-M11's "no hand-rolled substitute where a glass-ui primitive exists" gate references the ROOT
registry, never a consumer copy. Co-ownership recorded: atlas M.W0-A.6 authors the consume-canon; we
own the registry artifact.

**LANDED (BH.B4-canon).** The register ships at `docs/canon/primitives.json` — 90 subpaths / 1564
exported symbols, generated from the export manifest (`scripts/lib/subpath-policy.mjs`) + the canon
docs (`scripts/lib/canon-doc.mjs` `CANON_HOMES`) by `node scripts/regen-primitives.mjs --write`,
carrying no timestamp so committed==regen. Machine-locked by `proof:canon-homes` (the REGISTER-FRESH
clause — a subpath add / export rename that never re-generated it REDs). Atlas builds its viz-subset
manifest on top of this ROOT artifact; G-M11 references it, never a consumer copy.

## Tier 3 (their anti-asks — recorded)

No publish pressure (their law) · no glass cuts wanted for the M chrome work · ring-alias/CAP-SCROLLS
pre-staged, pins by commit, no re-discussion. Their GLASS-PARKED ledger hands to WS-GLASS at M.W12;
`GLASS-BG-BH.md` is the live coordination surface until then — our B6+B7 wave reads it at ask time.

## RELAY-BACK (for the atlas session)

(a) GP8 is SHIPPED — `<SegmentedTabs :draggable>` / `useDragMorph`; name any residual delta as a new
ask. (b) Skeleton `breath` EXISTS at 4.2.0 — drop the M.W9 stand-in. (c) The dock seam is
`useDockState.expand()` (not `useDockCollapse`) — contract accepted and clause-locked through WS2.
(d) The Drawer attr-forwarding fix is folded (cursor 10.2) and rides the first available vehicle.
(e) Early-4.3.0 is staged as a user-gated option; contents verified built at `28cf1cd1`. (f) The
primitives register is accepted onto BH.B4-canon.

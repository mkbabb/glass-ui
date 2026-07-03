# DNS-REPORTS → glass-ui BG — inbound disposition (2026-07-03)

**Inbound:** two live bugs relayed by the dns-reports agent, verified by them in both dist@4.2.0 and HEAD, with
full reports + runnable repro at `dns-analysis/.claude/worktrees/pass-artifacts/docs/proto-archive/glassui-relay/`
(+ the sibling `glassui-repro/`), read READ-ONLY per the foreign-tree fence. Both claims re-verified on OUR disk
before any fix (the inbound-verification law): every cited file:line was live at HEAD.

## Disposition — BOTH FIXED SAME-DAY (wave `4.12 BG.W-DOCK-CONSUMER-FENCE`, landed `00621130`)

| # | Bug | Verdict | The fix |
|---|-----|---------|---------|
| 1 | Unscoped `.dock-layer`-family selectors (`layers.css:177,182,264` + the layer-group partial) hide/reposition coincidental consumer elements | **CONFIRMED — fixed** | 23 internal-part selectors anchored under the zero-specificity dock-root OR-anchor `:where(.glass-dock, .dock-layer-group)` (`:where()` = 0,0,0 + same source order → the library's own paint is byte-identical; DOM ancestry verified from GlassDock.vue/DockLayerGroup.vue). No class rename (no break this close to the cut). |
| 2 | Synthetic `document.body` pointerdown in `useDockState.ts:215` closes reka dismissable layers whose trigger is a dock child | **CONFIRMED — fixed** | `dismissOpenOverlays()` DELETED entirely (option a). reka's own outside-dismiss covers real click-away; the `keepOpen` token seam covers the held-overlay timer path; no test/gate/demo relied on the synthetic. The fake-global-gesture mechanism was a workaround by construction — excised, not patched. |

**Machine lock:** `proof:dock-consumer-fence` (`[local,ci,release]`) — C1 the leftmost-anchor discipline over the
dock CSS partials (custom-property-only registers exempt) · C2 a grep-fence on synthetic
`PointerEvent`/`MouseEvent`/`TouchEvent` dispatch anywhere in `src/components/custom/dock/**` · C3 the relay's two
regression shapes as fixtures (a bare consumer `.dock-layer` sentinel outside a dock stays visible+static;
`dismissOpenOverlays` definition-absent) + a 7-check self-test. Born-RED on pre-fix HEAD (23 C1 violations +
7 sentinel leakers + the dispatch) → GREEN. The sibling reader `proof:dock-opacity-lockstep` follows the anchor.
Full fix notes: `DNS-REPORTS-FIX-NOTES.md` (beside this file).

## Relay-back → dns-reports

(a) Both bugs CONFIRMED and FIXED at glass-ui `00621130` (tranche/BG) — your repro shapes are now permanent
regression fixtures in `proof:dock-consumer-fence`, tagged `[local,ci,release]`, so the class cannot silently
return. (b) The fixes ride the joint **5.0.0** cut (no earlier line carries them; your interim carries until your
pin bump). (c) One caveat back at you: the anchor fixes the *coincidental `.dock-layer` outside a dock* leak —
your bespoke `.glass-dock` element collides on the COMPONENT IDENTITY class itself, which scoping cannot and
should not fix (a `.glass-dock` element IS claiming to be a glass-ui dock). Rename your consumer-side class; a
library-side identity-class rename is a 5.0.0-line breaking decision we will take only on an explicit ask with a
second colliding consumer. (d) Thank you for the runnable repro — it went straight into the gate.

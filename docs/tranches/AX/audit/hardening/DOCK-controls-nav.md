# Hardening red-team — DOCK-controls-nav

Adversarial pass over the dock CONTROLS + NAV: the four-state (Q3 hover-not-noticeable),
glass-first dock buttons (I.W6 specular), the persistent nav (home-left, separators, all-docks-
same-root W61), select/dropdown triggers. HEAD `89edffc`, 3.8.0 published + convergence.

Verdict: **WEAK**. The dock band SHIPPED real structure (W45 region-model, `#persistent`,
`<DockSeparator>`, `--dock-scale`), but the four-state CONTRACT is incoherent ACROSS the four
control members, Q3 is re-asserted live AFTER DK2 was marked done, and the headline waves that
PERFECT it (W54 glass-first, W61 unify-root) are all `planned (spec authored)` — un-executed.
The cardinal-lesson capture discipline is itself born-RED for this band.

---

## CHALLENGE 1 — the dock-control four-state is INCOHERENT across the four members (falsifiable, file:line)

The DK2 charter (W45) is "ONE glass-aware four-state contract for the dock-control family … the
whole family (icon-button, tab-button, select/dropdown triggers) reads this hover/active pair"
(`tokens.css:1119-1125`). It is NOT one contract — the HOVER LIFT is applied to only TWO of the
four members:

- `dock-icon-button:hover` → `scale: var(--scale-hover-dock)` (1.1) — `dock-controls.css:102-109`
- `dock-dropdown-trigger:hover` → `scale: var(--scale-hover-dock)` (1.1) — `dock-controls.css:451-453` (a SECOND rule appended)
- `dock-select-trigger:hover` → **NO scale** — `dock-controls.css:445-449` (the shared rule sets only `background` + `color`)
- `dock-tab-button:hover` → **NO scale** — `dock-controls.css:267-270` (only `background` + `color`)

So a hovered icon and a hovered dropdown LIFT, but a hovered SELECT and a hovered TAB do not move
at all. The select-trigger is the worst case: it gets NO hover scale (445-449) AND no specular
track (Challenge 2), so its ONLY hover affordance is a `card 55%` → over-glass bg swap that is
near-imperceptible (Challenge 3). This is the literal antithesis of "ONE four-state contract" —
the family speaks two hover vocabularies (lift vs no-lift). The DK2 self-gate
(`proof:dock-region-model`) asserts the bg-token sourcing is unified but does NOT assert the
TRANSFORM channel is unified across members, so the gate passes over a split-brain hover.

**The deeper read:** the family was unified on the COLOR axis (one `--dock-control-hover-bg`/
`-active-bg` pair) but NOT on the MOTION axis. A perfected four-state needs the hover scale +
the specular wake to be ONE comma-group across all four members, exactly as the bg pair is.

## CHALLENGE 2 — the specular track is on 2 of 4 dock controls; the I.W6 "19 tracks bloom" framing inverts the real cohesion gap (falsifiable)

`grep glass-specular-track src/components` → the track attaches to `DockIconButton.vue:40`
(`"dock-icon-button glass-specular-track"`) and `button/index.ts` and `Card.vue` — but NOT to
`DockTabButton.vue`, `DockSelectTrigger.vue`, `DockDropdownTrigger.vue`. And in `glass.css`, the
specular `::before` selector list (`:80-88`, `:172-180`, `:183-192`) names `.dock-icon-button`
but NOT `.dock-tab-button` / `.dock-select-trigger` / `.dock-dropdown-trigger` (grep count = 0).

So WITHIN the dock-control family the catch-light is on the icon button only. The keyframes I.W6
finding ("19 dock/Button specular tracks bloom where Card is clean") is real but frames it as a
"too much" problem (default-OFF discipline). The ground truth at HEAD is BOTH directions of
incoherence at once:

- **rest is already 0** — `--glass-specular-intensity-rest: 0` (`tokens.css:1973`), so the
  "bloom" the keyframes agent saw is on HOVER/ACTIVE (0.1 / 0.16, `tokens.css:1974-1975`), not at
  rest. The default-OFF discipline IS already applied at the token; the bloom is the hover/active
  intensity reading loud on the small dock tile (a 0.1 gleam on a 40px box is proportionally
  larger than on a 200px card — the W52 `--glass-specular-size: 36%` is a PERCENT of the box, so
  a small tile's gleam is a bigger fraction of the visible surface).
- **the family is split** — icon has the gleam, tab/select/dropdown do not. So a perfected
  glass-first dock cannot just "turn the 19 tracks off" (the I.W6 disposition into W54) — it must
  decide the ONE rest/hover/active specular discipline for the WHOLE family and apply it to all
  four members, or the dock reads as a glass tile (icon) sitting next to flat plates (tab/select).

The I.W6 disposition ("folds into W54 — specular-track default-off") is therefore HALF the fix:
default-off at rest is done; the family-coherence (all four members on the SAME specular state
machine, sized for the small tile) is the un-owned remainder, and W54's FileBounds explicitly
EXCLUDE the dock-control recipes ("the dock-control re-point executes in the dock band" —
`W54:197-202`). So the specular family-coherence has NO owning wave: W54 punts it to the dock
band, and W61 (the dock band wave) explicitly says "Do NOT touch the specular-track default-off
(that folds into W54 … a DISTINCT concern)" (`W61:166-167`). It falls in the seam between W54 and
W61 — a chronic un-owned hand-off.

## CHALLENGE 3 — Q3 (hover not noticeable) is RE-ASSERTED live AFTER DK2 + W52 were marked "live-verified" (the cardinal recurrence)

Q3 (`USER-DEFECTS pass3:28`): "The HOVER effect for the dock + buttons is NOT noticeable — only on
CLICK is it visible." This is pass-3, AFTER W45/DK2 (`live-verified (DEVELOPED)`) AND W52
(`live-verified (DEVELOPED)`) both claimed the dock/button hover was fixed. The mechanism is
visible at source:

- the dock icon hover lift is `--scale-hover-dock: 1.1` (`tokens.css:1224`) — a 10% scale, which
  on a 40px tile is a 4px grow, perceptible IF it actually fires; but
- the hover BG is `--dock-control-hover-bg: color-mix(in srgb, var(--card) 55%, transparent)`
  (`tokens.css:1124`) painted over the dock's OWN glass substrate (`--glass-bg-dock`, also a
  `--card`-over-transparent mix). A 55%-card translucent fill over an ~65%-card glass substrate is
  a near-zero ΔL — the bg "swap" is invisible. So the hover affordance leans entirely on the
  scale + the 0.1 specular, and for the TWO members with no scale (select, tab) it leans on
  NOTHING perceptible.
- the active(pressed) state on the icon is `scale: var(--scale-press-dock)` (0.96) only — NO bg
  change in `:active` (`dock-controls.css:111-113`). So on a tap the icon shrinks and the bg does
  not move; the SELECTED state (`tokens.css:1152` `--dock-active-bg: --surface-tint-12`) is a
  DIFFERENT, foreground-tint plate. The four-state read is: rest (transparent) → hover (invisible
  card-mix + maybe scale) → press (shrink) → selected (foreground-tint). The hover rung is the
  weakest of the four — exactly the Q3 complaint.

This is the cardinal lesson recurring INSIDE the band: DK2's live arm was OWED TO THE
ORCHESTRATOR and never captured (W45 JSON `liveArmOwed` lists the DK2 hover check as
orchestrator-owned, status "DEV-COMPLETE headless self-gated"), so the headless gate went green on
the bg-token unification while the live hover stayed imperceptible — and the next user pass (Q3)
caught it. W54's RED-witness-5 names exactly this ("W52 shipped headless-green with a hover that
the next live pass found imperceptible — Q3 — which is exactly the class this wave must not
repeat") yet W54 is `planned`, so the fix is not in the tree.

## CHALLENGE 4 — the dock-control hover-bg has near-zero contrast against the dock's own glass substrate (root-cause of Q3, falsifiable arithmetic)

`--dock-control-hover-bg` = `card 55% over transparent`. The dock shell paints
`--glass-bg-dock` (`dock.css:146`), which is `color-mix(in srgb, var(--card) <opacity-dock>%,
transparent)` (`tokens.css:774`). Both are warm-cream-card-over-transparent. The hover fill is
DESIGNED to read as "glass-translucent so the substrate shows through" (the DK2 comment,
`dock-controls.css:98-101`) — but "shows through" + "same hue as the substrate" = "looks like the
substrate." The hover plate and the rest substrate are the SAME color family at adjacent alphas,
so the hover bg-leg is a sub-1%-ΔL no-op. The ONLY thing that can carry the hover affordance is
the transform + the specular — and those are (a) absent on 2 of 4 members (Challenge 1/2), (b)
restrained to sub-perceptible on the others (Challenge 3).

A perfected dock hover needs the hover plate to read a measurable step ABOVE the substrate — not a
same-hue card-mix but a glass tier lift (a brighter rim, a specular wake, a real ΔL). This is the
"keyframes-dock model" the user names (the selected/hovered tile reads as a glass tier ABOVE the
bar) — and it is exactly what W61 RED-witness-3 calls out for the ACTIVE state but NOT for the
HOVER state. W61 re-points `--dock-control-active-bg` off `--surface-tint-12` onto a glass tier;
it does NOT re-point the HOVER bg off the same-hue `card 55%`. So even after W61 lands, the HOVER
rung stays the weak link.

## CHALLENGE 5 — the persistent nav is a PRIMITIVE, not yet a CONTRACT; three demo docks paint three nav vocabularies (W61, un-executed)

W45 shipped the `#persistent` slot (`GlassDock.vue:497-498`) + `<DockSeparator>`
(`DockSeparator.vue`) — the STRUCTURE. But W61 RED-witness-1 confirms the demo nav-shell docks do
NOT compose them: `BottomDock.vue` uses raw `<span class="demo-bottom-dock__sep">` hairlines and a
`PanelLeft` menu trigger (not a home-left `#persistent`); `SidebarDock.vue` hand-rolls a
`<RouterLink>` wordmark + a `<div class="bg-border/50">` divider. So the THREE dock surfaces a
consumer sees paint three divider vocabularies + two home vocabularies + one missing-home. There
is NO recorded "every dock = ONE root + home-left + nav + dividers" contract and no
`proof:dock-unify` gate. W61 (the wave that fixes this) is `planned (spec authored)` — and it
ROUTES the actual demo-shell adoption to W40 (also `planned`), so the unify is two un-executed
waves deep. The user's pass-3 ask ("ALL should leverage the SAME root … home button on the LEFT,
navs, dividing lines") is entirely un-delivered at HEAD.

## CHALLENGE 6 — no captured DELTA for the entire dock-controls band (cardinal-lesson chronic, born-RED)

`docs/tranches/AX/audit/visual/` contains ONLY `CAPTURE-PROTOCOL.md` — ZERO `.png`, ZERO
`W<NN>-DELTA.md`. The protocol itself (`:25`) lists W45, W52, W53, W56, W57, W59 as
"marked `live-verified` but lack a DELTA.md … OR they revert to `live-pending` until captured."
So every dock-controls "live-verified" claim (W45/DK2 hover, W52 button hover) is a
commit-message claim with no captured artefact — the exact inflation class the protocol was minted
to stop. `proof:live-verified-ledger` (the close gate that would assert each row has a DELTA) is
itself born-RED and owed to W33 (the close wave, `planned`). So the band's "done" marks are
unfalsifiable at HEAD.

---

## CHRONIC (the slip-history)

1. **Q3 hover-imperceptible — slipped across W52 → W45/DK2 → pass-3 → W54.** W52 (AX) marked the
   button hover `live-verified`; DK2 (W45) marked the dock hover `live-verified`; pass-3 Q3 caught
   it STILL imperceptible live; W54 RE-NAMES it as RED-witness-5 and is itself `planned`. The fix
   has been "owned" by three successive waves and landed in none. Each hand-off was a
   headless-green-over-imperceptible-live close (the cardinal lesson) — the DK2 live arm was
   "owed to the orchestrator" and never captured.

2. **Dock-control specular family-coherence — un-owned across W54 ↔ W61.** I.W6 ("19 tracks
   bloom") → disposed into W54 ("specular-track default-off") → W54 FileBounds EXCLUDE the
   dock-control recipes → W61 (dock band) explicitly DEFERS the specular back to W54 ("Do NOT
   touch the specular-track default-off"). The specular-on-2-of-4-members coherence falls in the
   seam between the two waves and is owned by neither.

3. **Live-DELTA capture for the dock band — chronically deferred.** W45 `live-verified
   (DEVELOPED)` with the live arm "owed to orchestrator" (W45 JSON `liveArmOwed`); the CAPTURE-
   PROTOCOL says W45 must backfill a DELTA "OR revert to live-pending"; no DELTA exists. This is
   the same "live-verified = commit-message claim, no artefact" recurrence the protocol names as
   "round 2 of the aggregation inflation."

4. **The four-state TRANSFORM-channel unification — missed by DK2.** DK2 unified the COLOR axis
   (one hover/active bg pair) and the gate asserts it, but the SCALE/specular axis stayed per-
   member (icon+dropdown lift, select+tab do not). A "four-state contract" wave that unifies only
   the color channel is a partial unification that reads as coherent to the gate and incoherent to
   the eye.

---

## HARDENING ACTIONS (to PERFECT the dock controls + nav)

1. **AMEND W61 (or a new W61.5) to unify the four-state MOTION channel, not just the color
   channel.** Make the hover scale + the specular state-machine ONE comma-group across all four
   members (icon + tab + select + dropdown), mirroring the `--dock-control-hover-bg`/`-active-bg`
   pair. Concretely: add `.dock-tab-button` / `.dock-select-trigger` / `.dock-dropdown-trigger` to
   the `glass.css` specular `::before` selector lists (`:80-88`, `:172-180`, `:183-192`) OR attach
   `glass-specular-track` in their `.vue` class bindings (as `DockIconButton.vue:40` does), and
   give the select-trigger hover the same `--scale-hover-dock` the icon/dropdown get. Gate it:
   extend `proof:dock-region-model` to assert all four members carry the SAME hover-scale +
   specular state (RED-witness: remove the select-trigger scale → the gate REDs).

2. **Re-point the dock-control HOVER bg off the same-hue `card 55%` onto a glass-tier lift (the
   Q3 root-cause), paired with W61's active re-point.** W61 already re-points the ACTIVE bg to a
   glass tier; extend the same logic to the HOVER rung so the hover plate reads a measurable ΔL
   above the `--glass-bg-dock` substrate (a brighter rim + the specular wake, not a same-hue card-
   mix). This is the load-bearing Q3 fix the user keeps re-reporting.

3. **Size the specular gleam for the small dock tile (the I.W6 "bloom").** `--glass-specular-size`
   is a percent of the box (36%), so a 40px tile's gleam is proportionally louder than a card's.
   Mint a dock-control-local `--glass-specular-size` override (smaller %, or a px-bounded radius)
   so the hover/active gleam reads as a restrained edge-catch on the small tile, not a bloom —
   then the family can carry the specular on ALL four members without the keyframes I.W6 "bloom."
   This resolves the I.W6 finding the RIGHT way (size + coherence) rather than the wrong way
   (turn it off).

4. **Own the W54↔W61 specular hand-off explicitly.** The specular family-coherence is currently
   owned by neither wave. Assign it to W61 (the dock band wave that already owns the four-state
   re-point) and DELETE the "Do NOT touch the specular-track" exclusion from W61 — the specular IS
   part of the dock four-state. W54 keeps the LIBRARY-WIDE rest-default-off; W61 owns the DOCK
   FAMILY's hover/active specular coherence + sizing.

5. **EXECUTE W61 + W40 (the nav-pattern + the demo-shell adoption) and CAPTURE the DELTA.** The
   unify-root is two un-executed waves deep; the persistent-nav coherence the user named is
   entirely undelivered. Drive W61's nav-pattern contract + the collapsed-pill floor tokens
   (Q1 — `--dock-collapsed-summary-min-size` + `--dock-collapsed-padding`, both UNDEFINED at HEAD),
   then W40's BottomDock/SidebarDock adoption onto the one root, and capture a paired-π DELTA
   (the three docks → one vocabulary; the mis-sized pill → tight pill) under `audit/visual/` per
   the CAPTURE-PROTOCOL. No "live-verified" mark without the artefact.

6. **Prototype the four-member hover side-by-side BEFORE the value retune.** Mount all four dock
   controls in one row over the glass dock substrate, hover each slowly, and capture the
   getComputedStyle scale + specular-intensity + bg ΔL per member. This is the falsifiable Q3
   close — the prototype proves the hover READS on hover for ALL FOUR before the wave flips to
   live-verified (the cardinal lesson: re-prove, do not stamp from source).

---

## dockPerfection (gap-to-PERFECTION for the controls + nav lane)

The dock controls reach perfection ONLY when: (a) all FOUR control members (icon, tab, select,
dropdown) share ONE four-state across COLOR **and** MOTION **and** specular — at HEAD only the
color axis is unified; icon+dropdown lift on hover, select+tab do not, and only icon carries the
specular; (b) the HOVER rung reads a measurable step above the dock's own glass substrate — at
HEAD the hover bg is a same-hue `card 55%` over an ~`card 65%` substrate = a sub-1%-ΔL no-op, the
Q3 root-cause re-reported across W52→DK2→pass-3; (c) the selected/active control reads as a GLASS
TIER above the bar (the keyframes-dock model) — at HEAD it is a flat `--surface-tint-12`
foreground plate (W61 RED-witness-3, un-executed); (d) EVERY dock composes ONE GlassDock root with
a home-left `#persistent` + `<DockSeparator>` dividers — at HEAD three demo docks paint three nav
vocabularies (W61 RED-witness-1, un-executed); (e) the collapsed pill is a tight proportioned pill
— at HEAD its two floor tokens are UNDEFINED so it falls to full-control width + expanded padding
(Q1, W61 RED-witness-2); and (f) each of the above is closed on a CAPTURED live DELTA, not a
commit-message claim — at HEAD `audit/visual/` holds only the protocol, zero captures. The
structure (W45) is sound; the four-state coherence, the Q3 hover legibility, the glass-first
selected register, the nav-pattern contract, and the capture discipline are all un-landed. Verdict
WEAK: real foundation, perfection blocked on un-executed W54/W61/W40 + a four-state motion-channel
unification that no wave currently owns.

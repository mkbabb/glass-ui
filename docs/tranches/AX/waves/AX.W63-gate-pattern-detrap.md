# AX.W63 — Gate-pattern de-trap: the `/compositions/gate-pattern` demo opens a non-dismissable viewport modal ON MOUNT and locks the visitor out; re-author it as a CONTAINED inline preview inside a bounded GLASS CARD

**Band** F · STORYBOOK IA / DEMO · **Severity** blocker (Q8 — the pass-3 BLOCKER: *"/compositions/gate-pattern literally GATES you from the page on click (broken — it locks you out)"* (`USER-DEFECTS-2026-06-08-pass3.md:33`, severity **blocker**)) · the demo route mounts a non-dismissable modal that covers the viewport refusing esc / scrim / close, and the ONLY escape is typing a magic key — the visitor cannot reach the page
· **dependsOn** AX.W00 (the π visual-runtime lane — the live-truth close machinery + the fail-CLOSED workspace), AX.W54 (the glass-first ROOT — the bounded preview frame reads glass-first BECAUSE W54 flipped the default register; the contained dialog renders inside a `.glass-card`), AX.W56 (the squircle where befitting — the preview frame is a large-radius surface)
· **MUST PRECEDE** AX.W60 (the page-redesign container layer) — W60 wraps each story page in a glass card over a background, but W60 wrapping a page whose modal covers the WHOLE viewport on mount does NOTHING about the trap (the modal sits ABOVE the W60 container at the top layer). W60's own scope only says gate-pattern "should leverage glass cards" — it does NOT de-trap the open-on-mount modal. W63 de-traps FIRST; W60 then wraps the de-trapped page. (`MASTER-PLAN.md:48` — Q8 is a live BLOCKER un-owned-shipped; `GOLDEN.md:71` — *"Q8 gate-pattern de-trap (must precede W60)"*; GOLDEN-synthesis §6b — *"Must land BEFORE W60 wraps pages"*.)
· **Charter** the pass-3 Q8 BLOCKER (`USER-DEFECTS-2026-06-08-pass3.md:33`) + the hand-challenge finding that NO wave owns it (CH-demo-ia CH-2 / CHRONIC-4: *"NO wave owns Q8 … the blocker survives the entire named band"*; GLASS-demo-demonstration H2) + the GOLDEN hardened order (Batch 2 — the live BLOCKERS; `GOLDEN.md:71`, GOLDEN-synthesis §7 Batch 2: *"Q8 gate-pattern de-trap (the new owner)"*)
· **Audit** `docs/tranches/AX/audit/hardening/CH-demo-ia.md` CH-2 (the source-true diagnosis — `gate-pattern.vue:23` `open=ref(true)` + the three `@*.prevent` handlers + `:show-close="false"`; *"NO wave owns Q8"*) + GLASS-demo-demonstration H2 + the live good-example pages (`demo/stories/primitives/badge.vue`, `compositions/labeled-field.vue` — the contained-preview shape this wave adopts)

> bbnf wave spec. TRANCHE-DEVELOPMENT artefact only — this doc writes no `src`. The implementer session
> drives the §Cadence from this spec. This wave is DEMO-side ONLY (`demo/stories/compositions/gate-pattern.vue`
> + the manifest blurb + the new gate + its registration) — NO library `src/` edit (Dialog / DialogContent /
> Input / Button / `.glass-card` all ship; W63 RE-COMPOSES them, edits none). Per the AX cardinal precept (§0 /
> AX.W00): this wave does NOT close on a green headless gate; it closes on a LIVE chrome-devtools-mcp DELTA at
> ≥2 viewports × light/dark (the visitor reaches the page; the modal is contained). Per the hardened agent git
> clause (K W0): agents NEVER stage/commit/stash — the orchestrator owns the index.

> *Gloss.* The **trap** is the demo's `const open = ref(true)` (`gate-pattern.vue:23`) — the modal opens the
> INSTANT the route mounts, and the `<DialogContent :show-close="false" @escape-key-down.prevent
> @interact-outside.prevent @pointer-down-outside.prevent>` (`:66-73`) refuses every dismissal channel (no close-X,
> esc swallowed, scrim-click swallowed, outside-pointer swallowed). So a visitor navigating to `/compositions/
> gate-pattern` is held hostage by a full-viewport non-dismissable modal whose only escape is typing the literal
> magic key `"wolfpack"` (`:30`) — a demo page that LITERALLY gates you from itself. The **de-trap** is the
> gestalt re-author: the gate idiom becomes a CONTAINED inline preview — the access-modal demonstrated INSIDE a
> bounded glass-card frame on the page, opened by an explicit on-page button (not on-mount), dismissable within
> the frame — so the visitor SEES the non-dismissable-modal idiom (its `show-close=false` + `@*.prevent` + the
> invalid-ring + shake) without being held hostage by it. The **bounded glass card** is the W54 glass-first
> container the preview renders inside (the Q8 fix leverages a glass card per the user's `MASTER-PLAN.md` note +
> the W54 default) — the page reads as a designed gate DEMONSTRATION, not a viewport trap.

---

## State (born-RED — the gate must fail at HEAD)

The wave is born-RED at HEAD `89edffc` (3.8.0+convergence; the AX integrated band) on **four** falsifiable
witnesses, each a source-true line-probe the new gate inverts. The `gate-pattern.vue` SFC is the
"non-dismissable access-modal idiom" demo (`manifest.ts:239`) — and it demonstrates the idiom by SUBJECTING the
visitor to it on mount, which is the exact pass-3 Q8 BLOCKER. Source-confirmed at HEAD:

- **RED witness 1 (the headline — the modal opens ON MOUNT, `open=ref(true)`, grep-falsifiable).**
  `demo/stories/compositions/gate-pattern.vue:23` is `const open = ref(true);` (the comment `:22` even narrates
  it: *"The gate is always open while locked — it refuses esc / scrim / close"*). So the INSTANT the route
  mounts, the `<Dialog v-model:open="open">` (`:65`) is open and the `<DialogContent>` (`:66`) covers the
  viewport at the top layer. There is no on-page trigger button — the modal IS the page. **The falsifiable RED:**
  *`grep "open = ref(true)" gate-pattern.vue` HITS — the modal opens on mount with no trigger (RED). After the
  wave the gate idiom is a CONTAINED preview: `open` starts `false` (or the preview is a non-modal contained
  render), opened by an explicit on-page `<Button>` INSIDE a bounded glass-card frame, never on-mount — `grep
  "open = ref(true)"` = NONE; the visitor reaches the page (GREEN).*

- **RED witness 2 (every dismissal channel is suppressed — esc / scrim / outside-pointer / close-X all blocked,
  grep-falsifiable).** `gate-pattern.vue:66-73` — the `<DialogContent>` carries `:show-close="false"` (no close-X),
  `@escape-key-down.prevent` (esc swallowed), `@interact-outside.prevent` (scrim/focus-loss swallowed),
  `@pointer-down-outside.prevent` (scrim-click swallowed). With witness 1 (open on mount), this means the modal is
  BOTH always-up AND undismissable — the only escape is the magic key `"wolfpack"` (`:30,:33`). A visitor who does
  not know the key is permanently trapped on the route. **RED:** *the four suppression channels are LIVE while the
  modal is open-on-mount — a non-dismissable full-viewport modal with no exit but a magic string (RED). After the
  wave the suppression channels are DEMONSTRATED inside the contained preview (the idiom is still shown — that IS
  the point of the demo), but the preview itself has a visible, always-reachable EXIT (a "close preview" affordance
  on the frame, or the preview is non-modal so the page chrome stays reachable) — the suppression no longer traps
  the WHOLE viewport (GREEN).*

- **RED witness 3 (the demo is NOT contained — it has no bounded glass-card frame; the dialog renders at the
  top-layer root, structural-falsifiable).** `gate-pattern.vue:54-110` — the `<Dialog>` is a sibling of the
  `<StorySection>` body, rendering its `<DialogContent>` at the document top layer (`<dialog>`/portal), NOT inside
  a bounded preview frame. There is no glass-card container that scopes the preview to a region of the page; the
  modal occupies the viewport. `grep "glass-card\|Card\b\|preview\|bounded\|inline" gate-pattern.vue` = NONE (the
  story composes Dialog / Input / Button raw, no containing card). **RED:** *the dialog renders at the top-layer
  root with no bounded preview frame (RED). After the wave the gate demonstration renders INSIDE a bounded
  glass-card preview frame (the W54 glass-first `.glass-card` / `<Card>` container, the W56 squircle where
  befitting) — the access-modal idiom is previewed within a region of the page, leveraging the glass card per Q8's
  "should leverage glass cards", not the whole viewport (GREEN).*

- **RED witness 4 (the manifest blurb LEAKS a tranche code — `(AW.W18)` ships in the story description visitors
  read, grep-falsifiable; the W58 language strip MISSED it).** `manifest.ts:239` — the gate-pattern story blurb
  ends `…the widened [aria-invalid] ring + shake feedback. A blessed composition, not a component (AW.W18)."` The
  `(AW.W18)` tranche code is the consumer-facing story DESCRIPTION (rendered in the UI on the story page), the exact
  meta-language leak CH-demo-ia CH-1 found the `.vue`-only `proof:story-language` gate misses (it never opens
  `manifest.ts`). **RED:** *the gate-pattern manifest blurb leaks `(AW.W18)` (RED). After the wave the blurb is
  language-clean (no tranche/wave/defect code) AND re-states the de-trapped idiom (a CONTAINED, openable, escapable
  preview of the non-dismissable-modal pattern) — `grep -E '\b[A-Z]{1,2}\.W[0-9]' manifest.ts` over the gate row =
  NONE (GREEN). [COORDINATE with the W58 `.ts`-scope amend (CH-demo-ia H-1) — W63 cleans the gate-pattern blurb as
  part of the de-trap; the W58 amend cleans the remaining ~13 `.ts` blurbs. If the W58 amend lands first, W63
  inherits a clean blurb and re-states it; if W63 lands first, it cleans its own row and the W58 amend sweeps the
  rest. Either order is correct — the gate asserts the gate-pattern row is clean.]*

The wave is RED at HEAD on all four; the HardGate below drives each to GREEN.

**Live re-diagnosis ritual (AX.W00 wave-open obligation).** BEFORE any edit, re-confirm the witnesses on the
live demo at `localhost:5173/compositions/gate-pattern`: navigating to the route mounts a full-viewport
non-dismissable modal (esc does nothing, the scrim-click does nothing, there is no close-X) — the visitor IS
trapped, escapable only by typing `wolfpack`. Capture the BEFORE π render (the trapping modal over the page) as
the born-RED baseline in `audit/W63-gate-detrap.json`. Do NOT proceed on the audit's word — re-prove the trap on
the live route (the cardinal AX lesson; a green SOURCE gate over a still-trapping live page is NOT done).

**Status** — SPEC (this doc). DEV-only; writes no `src` from this session.

---

## Goal

The `/compositions/gate-pattern` story demonstrates the non-dismissable-access-modal idiom WITHOUT subjecting
the visitor to it: the idiom is previewed INSIDE a bounded glass-card frame on the page, opened by an explicit
on-page button (never on-mount), with an always-reachable EXIT from the preview, leveraging the W54 glass-first
card + the W56 squircle where befitting. The page is reachable, designed, and SHOWS the pattern (the
`show-close=false` + `@*.prevent` + the `[aria-invalid]` ring + the shake) as a contained demonstration the
visitor controls — never a viewport trap. The blocker is closed: a visitor lands on the route and reads the page,
the gate preview sits in its frame, opening on demand and closing on command. The manifest blurb is
language-clean and re-states the de-trapped idiom. Demo-side only; no library `src/` edit (Dialog / DialogContent
/ Input / Button / `.glass-card` are CONSUMED, not edited).

---

## Scope (the gestalt re-author — a CONTAINED preview, NOT a viewport trap; demo-side ONLY, NO library edit)

The fix is a gestalt re-author of ONE demo SFC + its manifest blurb, NOT a patch on the trap. Per the
architectural precept (gestalt redesigns over incremental patches): do NOT merely flip `open` to `false` and
add a trigger button while the modal still portals to the top layer over the whole viewport (that would let the
modal re-trap the moment it opens). RE-AUTHOR the demonstration as a contained inline preview. Four folds, all
demo-side:

1. **RE-AUTHOR `gate-pattern.vue` as a CONTAINED inline preview (the headline — Q8).** Replace the
   `open=ref(true)` on-mount portal modal with a CONTAINED demonstration: the gate idiom rendered INSIDE a
   bounded preview frame on the page. Two valid shapes (the implementer picks per the live read; the recommended
   default is shape A):
   - **Shape A (recommended) — a non-modal contained render.** The access-gate form (the Lock glyph + title +
     `<Input>` + the Unlock `<Button>` + the error/shake state) renders DIRECTLY inside a bounded glass-card
     preview frame on the page (no `<Dialog>` portal at all) — a static, always-visible "what the gate looks
     like" preview. A SECOND, explicitly-labelled button ("Open the modal demo") opens the REAL `<Dialog>` modal
     (with all its `show-close=false` + `@*.prevent` suppression INTACT — that is the idiom being demonstrated)
     so the visitor can EXPERIENCE the non-dismissable behaviour ON DEMAND, and the modal's submit/correct-key
     path closes it. This shows BOTH the look (contained) AND the behaviour (on-demand modal) without the on-mount
     trap.
   - **Shape B — an on-page-triggered modal with a guaranteed escape.** `open` starts `false`; an on-page
     `<Button>` opens the modal; the modal keeps `show-close=false` + the three `@*.prevent` (the idiom) BUT the
     preview frame carries a visible "this is a demo — close it" escape the visitor can always reach (a frame-level
     close that bypasses the magic key, or a documented note that any text submitted closes the demo). The risk
     (a visitor who opens it is briefly re-trapped until they find the escape) makes Shape A the safer default.

   Either shape: the modal is NEVER open on mount, the page is ALWAYS reachable, and the suppression channels are
   DEMONSTRATED (not removed — they are the point) inside a controlled, escapable preview. KISS — it RE-COMPOSES
   the shipped Dialog / Input / Button (no new component, no new prop).

2. **WRAP the preview in a BOUNDED GLASS CARD (Q8's "should leverage glass cards" + the W54 glass-first default).**
   The contained preview renders inside a `.glass-card` / `<Card>` frame (the W54 glass-first register — the
   container reads glass BECAUSE W54 flipped the default; the W56 squircle corner where befitting) bounded to a
   region of the page (a `max-w-*` card, not a full-bleed well). The glass card is the preview FRAME — the gate
   demonstration sits inside it. This is the Q8 fix the user named (leverage a glass card) AND a live demonstration
   of W54's glass-first default (a glass-card preview frame on a designed page). COORDINATE with W60 (the
   page-redesign container layer wraps the WHOLE page in a `<StoryHero>` glass container over a background) — W63's
   preview-frame card is the INNER demonstration card; W60's `<StoryHero>` is the OUTER page container. They nest,
   they do not collide (W63 lands first; W60 wraps the de-trapped page).

3. **PRESERVE the idiom's INSTRUCTIVE value — the demonstrated behaviours stay (no feature loss).** The
   re-author KEEPS every behaviour the story exists to teach: `:show-close="false"` (the suppressed close-X),
   `@escape-key-down.prevent` / `@interact-outside.prevent` / `@pointer-down-outside.prevent` (the suppressed
   dismissal channels), the widened library `.input-pill [aria-invalid]` ring (the invalid feedback — NOT a scoped
   re-paint, the shipped selector), the `gate-shake` wrong-key motion cue (PRM-gated, `:114-147`), and the magic-key
   `submit()` flow (`:32-44`). The DE-TRAP is purely STRUCTURAL (contained preview + on-demand open + always-reachable
   exit) — it does NOT strip the idiom's teaching content. A visitor still learns exactly how to build a
   non-dismissable gate; they just are not held hostage to read it.

4. **CLEAN the manifest blurb — strip `(AW.W18)`, re-state the de-trapped idiom (Q8 + the W58 language-strip
   coordination).** Rewrite `manifest.ts:239`'s gate-pattern blurb to remove the `(AW.W18)` tranche code AND
   re-describe the de-trapped shape: a CONTAINED, on-demand preview of the non-dismissable-access-modal idiom
   (the `show-close=false` + `@*.prevent` suppression + the `[aria-invalid]` ring + shake), demonstrated inside a
   glass-card frame — a blessed composition, not a component. Language-clean (no tranche/wave/defect code). This
   coordinates with the W58 `.ts`-scope amend (CH-demo-ia H-1) — W63 cleans its own row; the W58 amend sweeps the
   remaining `.ts` blurbs + extends `proof:story-language` to `.ts`.

### KEEP — the load-bearing demo + library spine (do NOT touch)

UNCHANGED: the library `src/` (W63 is DEMO-side ONLY — no Dialog / DialogContent / Input / Button / `.glass-card`
/ `.input-pill` / squircle edit; W63 CONSUMES all of them); the `.input-pill [aria-invalid]` widened ring (the
shipped library selector — W63 keeps consuming it, does NOT re-paint a scoped ring); the `:show-close="false"`
prop + the `@escape-key-down`/`@interact-outside`/`@pointer-down-outside` reka-ui Dialog seam (the idiom W63
DEMONSTRATES — kept intact inside the contained preview, not removed); the `gate-shake` keyframes + the PRM gate
(`:114-147` — W63 keeps the wrong-key shake cue); the `<StoryPage>` / `<StorySection>` chassis (W63 composes them);
the W18 IA category tree + the gate-pattern row's POSITION (W18 owns the tree — W63 edits the row's BLURB text +
the SFC BODY, it does not move/add/remove the row); the W54 glass-first default + the W56 squircle (W63 consumes
them for the preview frame — it does not author the glass look or the corner shape).

### CONVERGE folds (consumer-grounded design INPUT, NOT executed here)

- **W54 (glass-first ROOT) supplies the preview-frame glass.** The bounded preview card reads glass-first BECAUSE
  W54 flipped the default register — W63 CONSUMES the glass-card default, it does not author it. **dependsOn W54**
  so the preview frame is glass when W63 wraps it. Author the cross-ref; W63 writes no W54 source.
- **W60 (page-redesign container layer) wraps the DE-TRAPPED page.** W63 MUST PRECEDE W60: W60 wraps the page in a
  `<StoryHero>` glass container over a background, but a W60 wrap over a still-trapping modal does nothing (the
  modal sits above the container). W63 de-traps; W60 wraps the reachable page. W63 writes no W60 source — it is
  W60's hard predecessor for this one page. Author the cross-ref.
- **W58 (meta-language strip, `.ts`-scope amend) co-cleans the blurb.** W63 cleans the gate-pattern row's
  `(AW.W18)`; the W58 amend extends `proof:story-language` to `.ts` + sweeps the rest. Either order is correct
  (§RED witness 4). Author the cross-ref; W63 cleans only its own row.

---

## SOTA deepening (the contained-preview idiom, the demonstrate-without-subjecting principle)

**The contained-preview idiom over the on-mount trap (the gestalt the user named).** A storybook demonstration of
a HOSTILE interaction pattern (a non-dismissable modal, a destructive confirm, a focus-trap) must DEMONSTRATE the
pattern without SUBJECTING the visitor to it. The SOTA storybook idiom is exactly this: the hostile pattern is
previewed inside a bounded frame the visitor controls (open-on-demand, escapable, contained to a region), so the
visitor SEES the behaviour without losing control of the page. Storybook / Histoire / the shadcn-vue docs all do
this — a "destructive dialog" demo opens on a button click and is dismissable; it never mounts open-and-trapping.
The gate-pattern demo violated the idiom by making the page ITSELF the hostile interaction (open on mount, no
exit but a magic string) — the de-trap restores the contained-preview idiom.

**Demonstrate-without-subjecting (the principle).** The instructive value of the gate-pattern demo is the IDIOM
(how to suppress every dismissal channel + paint the invalid ring + shake). That value is FULLY preserved by a
contained preview — the visitor reads the `show-close=false` + the `@*.prevent` + the `[aria-invalid]` ring in the
source AND experiences the non-dismissable modal ON DEMAND (Shape A's "open the modal demo" button), then the
modal closes on the correct key or the frame's escape. The de-trap does not weaken the teaching; it makes the
teaching CONSUMABLE. A demo that traps the reader teaches nothing — they leave the page.

**The glass-card preview frame (Q8 + the W54 demonstration).** The user's Q8 note pairs the de-trap with "leverage
glass cards" — the contained preview renders inside a glass-card frame, which is BOTH the bounding container (the
preview is scoped to the card) AND a live demonstration of the W54 glass-first default (a glass card on a designed
page). The frame is the seam where the de-trap (containment) and the page-redesign (glass-first) meet — W63
de-traps INTO the glass card, W60 wraps the page AROUND it.

**Reconciliation note:** W63 RE-AUTHORS `gate-pattern.vue` from an `open=ref(true)` viewport-trapping portal modal
to a CONTAINED, on-demand, escapable preview inside a bounded glass card (demo-side), and cleans the manifest
blurb. It does NOT edit any library `src/` file (it CONSUMES Dialog / Input / Button / `.glass-card` / the
`.input-pill [aria-invalid]` ring / the squircle), does NOT remove the demonstrated idiom (the suppression channels
stay, inside the preview), does NOT move the W18 manifest row (it edits the row's blurb + the SFC body), and does
NOT re-introduce meta-language past W58.

---

## FileBounds (the EXACT files this wave may touch — for parallel-dispatch disjointness)

| File | Edit |
|------|------|
| `demo/stories/compositions/gate-pattern.vue` | **RE-AUTHOR** — replace the `open=ref(true)` on-mount portal modal with a CONTAINED inline preview inside a bounded `.glass-card` / `<Card>` frame (the W54 glass-first default, the W56 squircle where befitting). Shape A (recommended): a non-modal contained render of the gate form + an explicit "open the modal demo" `<Button>` that opens the REAL `<Dialog>` (suppression channels intact) on demand, closing on the correct key. Shape B: on-page-triggered modal with a guaranteed frame-level escape. EITHER: never open on mount, always-reachable page, the demonstrated idiom (`show-close=false` + the three `@*.prevent` + the `[aria-invalid]` ring + the `gate-shake` PRM-gated cue) PRESERVED inside the contained preview. NO library edit (CONSUMES Dialog/Input/Button/`.glass-card`/`.input-pill`). |
| `demo/stories/manifest.ts` | **EDIT the gate-pattern ROW's BLURB ONLY** (`:239`) — strip the `(AW.W18)` tranche code; re-state the de-trapped idiom (a CONTAINED, on-demand, escapable preview of the non-dismissable-access-modal pattern inside a glass-card frame — the `show-close=false` + `@*.prevent` suppression + the `[aria-invalid]` ring + shake; a blessed composition, not a component). Language-clean. NO category/story ROW add/move/remove (W18 owns the tree — W63 edits the blurb TEXT only). |
| `scripts/proof-gate-detrap.mjs` | **NEW** — the born-RED→GREEN gate (the device-free SOURCE arm + the registration + the fail-CLOSED π live arm). Asserts: `gate-pattern.vue` has NO `open = ref(true)` on-mount open (the modal does not open on mount); the gate demonstration renders inside a bounded glass-card preview frame (`.glass-card` / `<Card>` present, not a raw top-layer-only Dialog); an explicit on-page trigger/escape affordance exists (the preview is opened on demand and escapable); the suppression idiom is PRESERVED (`:show-close="false"` + the three `@*.prevent` still present — the demo still teaches the pattern); the gate-pattern manifest blurb is language-clean (no `\b[A-Z]{1,2}\.W[0-9]` code). See §HardGate. |
| `package.json` | Register `proof:gate-detrap` + the W00 meta-gate parity match (`proof:gate-script-parity` bijection). |
| `scripts/gates.mjs` | Add the `proof:gate-detrap` manifest row (`local`, `ci`). |
| `docs/tranches/AX/audit/W63-gate-detrap.json` | **NEW** — the born-RED→GREEN audit artefact + the paired-π BEFORE/AFTER + DELTA reference. |
| `docs/tranches/AX/audit/visual/W63-DELTA.md` | **NEW** — the paired-π BEFORE/AFTER + DELTA capture (the W00 protocol): the BEFORE trapping full-viewport modal → the AFTER reachable page with a contained glass-card gate preview. |

**OUT of bounds:** any library `src/` file (W63 is DEMO-side ONLY — Dialog / DialogContent / Input / Button /
`.glass-card` / `.input-pill [aria-invalid]` / the squircle / the W54 glass-first default are CONSUMED, edited by
NO W63 commit); the `manifest.ts` category/story ROW SET + the gate-pattern row's POSITION (W18 owns the tree —
W63 edits the row's BLURB text only); the `<StoryPage>` / `<StorySection>` chassis internals (W63 composes them);
the `<StoryHero>` page-redesign container (W60 owns it — W63's preview-frame card NESTS inside W60's later page
container, it does not author the page container); the reka-ui Dialog `@escape-key-down`/`@interact-outside`/
`@pointer-down-outside` seam (the idiom W63 demonstrates — kept, not re-engineered); the `gate-shake` keyframes
+ the PRM gate (W63 keeps the cue, does not re-author the animation).

---

## Disjointness (sibling waves it must NOT overlap)

W63 is the gate-pattern DE-TRAP; it is the hard predecessor of W60 for this one page and coordinates with W58:

- **vs AX.W60 (page-redesign container layer) — HARD PREDECESSOR, DISTINCT LAYER.** W60 wraps EVERY page in a
  `<StoryHero>` glass container over a background. W63 de-traps the gate-pattern page's INNER demonstration (the
  contained gate preview). The two NEST: W63's preview-frame glass card is the inner demonstration card; W60's
  `<StoryHero>` is the outer page container. **W63 MUST PRECEDE W60** (`GOLDEN.md:71`) — W60 wrapping a page whose
  modal covers the viewport on mount does nothing (the modal portals ABOVE the W60 container). W63 lands first
  (Batch 2, the live BLOCKERS); W60 (Batch 4) wraps the de-trapped page. Both touch `gate-pattern.vue` — W63
  RE-AUTHORS the body (de-trap + preview frame), W60 WRAPS the body in `<StoryHero>` + adds the page background;
  W63 lands first, W60 wraps the de-trapped body. (No collision: W63 de-traps the modal interaction; W60 adds the
  outer page container + background — different concerns on the same SFC, W63-then-W60 sequenced.)
- **vs AX.W18 (the IA category tree) — DISJOINT seam, BLURB-TEXT only.** W18 owns the `manifest.ts` category tree
  (the category order + the per-category story SET + each row's SFC file + the IA gates). W63 edits the
  gate-pattern row's BLURB TEXT (strips `(AW.W18)`, re-states the de-trapped idiom) — it moves/adds/removes NO
  row, re-orders NO category, touches NO IA gate. (Both touch `manifest.ts` — W18 the row SET, W63 one row's blurb
  string; line-disjoint. **dependsOn-coordination:** W18 may RELOCATE the gate-pattern SFC under a re-IA'd tree —
  if W18 lands first, W63 re-authors the relocated SFC; if W63 lands first, W18 relocates the de-trapped SFC.
  Either order: W18 moves/renames the file, W63 rewrites its body + blurb — they must not race the same file, so
  the orchestrator sequences W63-after-W18 OR confirms the gate-pattern row is settled before W63 drives.)
- **vs AX.W58 (the meta-language strip, `.ts`-scope amend) — DISTINCT CONCERN, CO-CLEANS one blurb.** W58 (its
  `.ts`-scope amend, CH-demo-ia H-1) extends `proof:story-language` to `demo/stories/**/*.ts` + sweeps the ~14
  `.ts` blurb leaks. W63 cleans the gate-pattern row's `(AW.W18)` as part of the de-trap. Either order is correct
  (§RED witness 4): if the W58 amend lands first, W63 inherits a clean blurb + re-states it; if W63 lands first,
  it cleans its own row + the W58 amend sweeps the rest. Both touch `manifest.ts` blurbs — line-disjoint by row
  (W58 the other rows, W63 the gate row). W63's re-stated blurb must be language-clean (the W58 `.ts` gate stays
  GREEN over it).
- **vs AX.W54 (the glass-first ROOT) — DISTINCT SURFACE, CONSUMES the glass default.** W54 flips the library glass
  default (`src/styles/**`). W63 CONSUMES the glass-card default for its preview frame (demo-side). No shared file:
  W54 = the library glass register, W63 = a demo SFC that composes a glass card. **dependsOn W54** so the preview
  frame reads glass-first when W63 wraps it.

### DEDUP (the explicit boundary vs the named waves)

- **vs W60 (page-redesign) — DISTINCT LAYER, W63 PRECEDES.** W60 = the per-page OUTER container (`<StoryHero>`
  glass card over a background, every page). W63 = the gate-pattern page's INNER demonstration de-trap (the
  contained gate preview inside a glass-card frame). W63 de-traps; W60 wraps. **This is the headline dedup: W63 =
  the gate INTERACTION de-trap (the modal no longer traps); W60 = the PAGE container (the outer glass card over a
  background). W63 must precede W60 or W60 wraps a trapped page.**
- **vs W18 (IA tree) — DISTINCT SEAM.** W18 = the category/story ROW SET (the tree). W63 = the gate-pattern row's
  BLURB text + the SFC body de-trap. W18 settles WHICH pages exist + WHERE; W63 fixes WHAT the gate-pattern page
  DOES. The only shared file is `manifest.ts` (row-set vs one blurb string).
- **vs W58 (meta-language strip) — DISTINCT CONCERN, CO-CLEANS.** W58 = the PROSE strip across all `.ts`/`.vue`
  blurbs (the `.ts`-scope amend). W63 = the gate-pattern row's blurb clean + the SFC de-trap. W63 cleans ONE blurb
  as a side-effect of the de-trap; the W58 amend owns the systematic `.ts` sweep + the gate extension. W63 = the
  gate-pattern DE-TRAP that happens to clean its own blurb; W58 = the SURFACE-WIDE language gate.

---

## Triumvirate (implement / adversarially-verify / gate-author split)

Per AX.md §0 agent-ceiling (≤6 implement / ≤7 read-only-audit). W63's split (count 3):

- **Implement (≤1 agent — a single cohesive demo-side SFC re-author + a one-line blurb clean).** Re-authors
  `gate-pattern.vue` (the contained preview inside a bounded glass-card frame — Shape A non-modal-preview +
  on-demand modal, or Shape B triggered-with-escape; the suppression idiom + the `[aria-invalid]` ring + the
  `gate-shake` cue PRESERVED), cleans the `manifest.ts:239` blurb (`(AW.W18)` stripped, the de-trapped idiom
  re-stated), records nothing in `src/` (demo-side only). Lint + typecheck at every interval.
- **Adversarially-verify (≤1 read-only lane).** Re-runs the four RED witnesses against the patched tree: asserts
  NO `open = ref(true)` on-mount open; asserts the gate demonstration renders inside a bounded glass-card preview
  frame; asserts an explicit on-page open/escape affordance exists (the preview is on-demand + escapable); asserts
  the suppression idiom is PRESERVED (`:show-close="false"` + the three `@*.prevent` still present — the demo still
  teaches); asserts the blurb is language-clean. ADVERSARIAL twist: tries to pass the gate with `open=ref(false)`
  but the modal STILL portals full-viewport-modal on the trigger with NO escape (confirms the gate REDs on a
  re-trap — a triggered-but-inescapable modal is still a trap); tries a preview that STRIPPED the suppression
  channels (confirms the gate REDs on idiom-loss — the demo must still teach the non-dismissable pattern); tries a
  blurb that re-introduced a tranche code (confirms the language assertion REDs). DRIVES the VISUAL-TRUTH live
  audit (the binding close — see HardGate): navigates the live route and confirms the visitor is NOT trapped.
- **Gate-author (≤1 agent).** Authors `proof-gate-detrap.mjs` (born-RED on the no-on-mount-open +
  bounded-glass-card-frame + on-demand-trigger/escape + idiom-preserved + blurb-clean assertions + the fail-CLOSED
  π live arm); confirms it FAILS at HEAD `89edffc` (`open=ref(true)` present, no glass-card frame, blurb leaks
  `(AW.W18)`) and PASSES on the patched tree. Registers `proof:gate-detrap` in `package.json` + `gates.mjs` + the
  W00 meta-gate parity. Gate-author is distinct from implementer (the gate must be able to FAIL the implementer's
  work — the AW false-GREEN class). The π live arm (the painted-pixels truth — a reachable page, a contained
  preview, no viewport trap) rides the W00 readback, NOT a CPU text gate alone.

**Autonomous-resilience clause + triumvirate auto-triggers (per WAVE_SPEC §3a; AX REQUIREMENTS §22.4b).** The
wave-agnostic grant lives ONCE in AX.md §6.1 with the 4-class halt-vs-work-around tree in §6.2 — by reference.
This wave's §3a triumvirate AUTO-TRIGGERS:

- **Out-of-FileBounds reveal → triumvirate (Class 2; NEVER absorb in-line).** Any need to edit a library `src/`
  file (the Dialog suppression seam, the `.input-pill [aria-invalid]` ring, the `.glass-card` recipe, the squircle
  axis, the W54 glass-first default), the `manifest.ts` category/story ROW SET (W18), or the `<StoryHero>` page
  container (W60) — HALT + triumvirate (a demo-vs-library or a sibling-wave boundary the FileBounds did not home).
  If the preview-frame card does NOT read glass-first because W54 has NOT landed → HALT (W63 is dependent on W54
  for the glass default; do not author a non-glass fallback frame).
- **Non-local hard-gate failure → triumvirate (Class 2).** If `proof:gate-detrap` cannot simultaneously assert the
  no-on-mount-open + the bounded-glass-card-frame + the on-demand/escapable + the idiom-preserved — OR if the W18
  IA gates / the W58 `.ts` language gate RED after W63's edit (the blurb desyncing a gate W18/W58 owns) — escalate
  the gate design, do NOT relax a ceiling or strip the demonstrated idiom to pass.
- **3rd diagnostic-loop iteration → triumvirate (Class 2).** If the contained preview does NOT read as a clear
  demonstration of the non-dismissable idiom (the visitor cannot tell it is a demo, or the on-demand modal still
  feels like a trap) after three preview-shape tunings, dispatch research→plan→redress rather than re-tuning the
  frame/affordance ad hoc.
- **§Open-questions ratify reached un-ratified → HALT-and-ratify (Class 3).** The Shape-A (non-modal contained
  preview + on-demand modal) vs Shape-B (triggered modal + frame escape) decision is a ratify-before-impl hinge —
  if it reaches impl un-ratified, take the recorded default (Shape A — the safest, no re-trap window) and run the
  live-audit verification, do NOT self-ratify Shape B (the re-trap-risk shape).

---

## HardGate (born-RED→GREEN + the MANDATORY VISUAL-TRUTH live audit)

**Headless / runtime gate — born-RED→GREEN. `proof:gate-detrap` (NEW; the device-free SOURCE + registration arm +
a fail-CLOSED π LIVE arm).**

The **device-free SOURCE arm** (always gates) — a source-parse + FS string-scan gate (the precept-valid artefact
form per SPEC.md §Hard Gates — source-structure for the demo de-trap contract; the PAINTED render / the
not-trapped truth is proven by the π arm, NEVER a text gate alone):

- **No on-mount open.** Assert `demo/stories/compositions/gate-pattern.vue` has NO `open = ref(true)` (the modal
  does not open on mount). **Born-RED at HEAD** (`gate-pattern.vue:23` is `const open = ref(true)`).
- **The demonstration is contained in a bounded glass-card preview frame.** Assert the gate demonstration renders
  inside a `.glass-card` / `<Card>` bounded frame (a `max-w-*` glass card, NOT only a raw top-layer-portal Dialog
  with no containing card). **Born-RED at HEAD** (`grep "glass-card\|Card\b" gate-pattern.vue` = NONE — the Dialog
  portals raw).
- **An on-demand trigger + an always-reachable escape exist.** Assert an explicit on-page `<Button>` opens the
  modal demo (Shape A) OR the preview is non-modal-contained with a frame escape (the visitor controls the
  preview; it is not auto-trapping). **Born-RED at HEAD** (no trigger — the modal IS the page, escapable only by
  the magic key).
- **The suppression idiom is PRESERVED (the demo still teaches).** Assert `:show-close="false"` + the three
  `@escape-key-down.prevent` / `@interact-outside.prevent` / `@pointer-down-outside.prevent` are STILL present
  (inside the contained preview) — the de-trap is structural, not an idiom strip. **(Guards the over-correction:
  a de-trap that DELETED the suppression would no longer demonstrate the pattern — RED.)**
- **The manifest blurb is language-clean.** Assert the gate-pattern row blurb (`manifest.ts:239`) carries NO
  `\b[A-Z]{1,2}\.W[0-9]` tranche code. **Born-RED at HEAD** (the blurb ends `…(AW.W18)."`).
- **No meta-language regression (W58 intact).** Assert `proof:story-language` (incl. its `.ts`-scope amend if
  landed) stays GREEN over W63's re-stated blurb.

The **fail-CLOSED π LIVE arm** (rides the W00 readback; a non-rendering/unreachable page is a hard RED when the
Playwright workspace IS present, NEVER a false-green SKIP): navigates `localhost:5173/compositions/gate-pattern`
and asserts the route is REACHABLE — `evaluate_script` reads the page and asserts NO full-viewport non-dismissable
modal covers it on mount (the page content + the bounded glass-card preview frame are visible; esc / a click
outside the preview does NOT leave the visitor trapped); asserts the contained preview is a GLASS card
(`getComputedStyle().backdropFilter` is a glass blur, the W54 default); on the on-demand trigger asserts the modal
opens AND the correct-key / frame-escape path closes it (the visitor regains the page). With the Playwright
workspace present, a route that mounts a non-dismissable viewport modal is a hard RED.

**VISUAL-TRUTH live audit (NON-NEGOTIABLE per AX.W00 — the wave's close criterion; the cardinal lesson — a green
SOURCE gate over a still-trapping live page is NOT done).** A fail-CLOSED live chrome-devtools-mcp pass the
ORCHESTRATOR runs @ `localhost:5173/compositions/gate-pattern` — `getComputedStyle` reads + screenshots, in light
AND dark at ≥2 viewports:

- **The visitor is NOT trapped — the page is reachable on mount.** Navigate to the route: ASSERT the page content
  reads (the StorySection + the bounded glass-card gate preview), NO full-viewport non-dismissable modal covers it,
  esc + a click outside the preview do NOT hold the visitor hostage. This is the BLOCKER fix — the page is
  reachable.
- **The gate idiom is DEMONSTRATED, contained.** ASSERT the contained preview shows the access-gate form inside a
  glass-card frame; the on-demand "open the modal demo" trigger opens the REAL non-dismissable modal (the idiom —
  `show-close=false`, esc/scrim suppressed); the correct key (`wolfpack`) or the frame escape CLOSES it and returns
  the page. The visitor EXPERIENCES the idiom on demand and ALWAYS regains control.
- **The invalid ring + shake still fire.** ASSERT a wrong key paints the widened `.input-pill [aria-invalid]` ring
  + the `gate-shake` cue (PRM-gated — no deform under reduce) inside the contained preview — the feedback idiom is
  preserved.
- **The preview frame reads glass-first (W54 demonstration).** ASSERT the bounded preview card is a GLASS card
  (translucent, the W54 glass-first default + the W56 squircle where befitting) — a live demonstration of the glass
  default, leveraging the glass card per Q8.
- **W18/W58 UNCHANGED (the layers-on canary).** ASSERT the W18 IA tree (the gate-pattern row's position) + the W58
  language-clean prose are UNAFFECTED — W63 de-trapped the interaction + cleaned one blurb, it moved no row and
  added no meta-language.
- **Affordance / hierarchy / NO visual occlusion / no regression** per the AX cardinal gate, light AND dark, ≥2
  viewports.

**The wave does NOT close on the headless gate alone** — the executed live audit (captured as a paired-π
BEFORE/AFTER + DELTA artefact under `docs/tranches/AX/audit/visual/W63-DELTA.md`, per the W00 protocol) is the
binding close criterion. The BEFORE capture pins the HEAD full-viewport non-dismissable trapping modal the de-trap
must visibly beat (the reachable page with a contained glass-card preview).

---

## Cadence (sub-step order)

1. **Live re-diagnosis ritual (W00 wave-open).** Re-confirm the four RED witnesses against HEAD `89edffc` on the
   live demo: `/compositions/gate-pattern` mounts a full-viewport non-dismissable modal (esc/scrim/close all
   suppressed, escapable only by `wolfpack`); the Dialog portals raw with no glass-card frame; the manifest blurb
   leaks `(AW.W18)`. Capture the BEFORE π render (the trapping modal) as the born-RED baseline in
   `audit/W63-gate-detrap.json`. Confirm W54 (glass-first) is settled (the preview frame will read glass). Do NOT
   proceed on the audit's word — re-prove the trap live.
2. **Author the gate born-RED.** Author `proof-gate-detrap.mjs` (no-on-mount-open + bounded-glass-card-frame +
   on-demand-trigger/escape + idiom-preserved + blurb-clean + story-language-intact); register `proof:gate-detrap`
   in `package.json` + `gates.mjs` + the W00 meta-gate; confirm it FAILS at HEAD.
3. **Re-author `gate-pattern.vue` as a contained preview.** Replace the `open=ref(true)` on-mount portal modal with
   the contained inline preview inside a bounded glass-card frame (Shape A default: a non-modal contained gate-form
   preview + an explicit "open the modal demo" trigger that opens the REAL suppressed modal on demand, closing on
   the correct key); PRESERVE the suppression idiom + the `[aria-invalid]` ring + the `gate-shake` cue. Lint +
   typecheck.
4. **Clean the manifest blurb.** Edit `manifest.ts:239` — strip `(AW.W18)`, re-state the de-trapped idiom
   (contained, on-demand, escapable preview of the non-dismissable-access-modal pattern inside a glass-card frame).
   Lint + typecheck.
5. **Gate GREEN + VISUAL-TRUTH.** Confirm `proof:gate-detrap` passes; re-run `proof:story-language` (the page is
   reachable + the blurb is clean) + the W18 IA gates (the row did not move); run the VISUAL-TRUTH live π audit
   (the visitor reaches the page, the contained glass-card preview shows the idiom on demand, the wrong-key
   ring+shake fire, the frame reads glass-first, W18/W58 unchanged), light + dark, ≥2 viewports; capture the
   paired-π BEFORE/AFTER + DELTA (`visual/W63-DELTA.md`); write `audit/W63-gate-detrap.json` to GREEN.

Lint/format cadence: `npm run typecheck` + the repo's eslint/prettier after each integration batch (steps 3–4)
and before close; `git diff --check` on the doc/status commit.

---

## Artefacts (the audit json + evidence it emits)

- `docs/tranches/AX/audit/W63-gate-detrap.json` — the born-RED→GREEN ledger: the four RED witnesses (open on
  mount, every dismissal channel suppressed, no contained glass-card frame, the `(AW.W18)` blurb leak), the
  per-finding disposition (Q8 the BLOCKER), the W54-settled-confirmation, and the post-wave GREEN structure +
  π-readback (the reachable-page readback, the contained-preview measurement, the glass-frame `backdropFilter`
  read, the not-trapped assertion).
- `docs/tranches/AX/audit/visual/W63-DELTA.md` — the paired-π BEFORE/AFTER + DELTA: the BEFORE full-viewport
  non-dismissable trapping modal → the AFTER reachable page with a contained glass-card gate preview opened on
  demand; over light + dark, ≥2 viewports; the W18/W58-unchanged canary.
- `scripts/proof-gate-detrap.mjs` — the NEW gate (no-on-mount-open + bounded-glass-card-frame +
  on-demand-trigger/escape + idiom-preserved + blurb-clean + the fail-CLOSED π live arm).
- The diff localizing the `gate-pattern.vue` re-author + the `manifest.ts` blurb clean + the gate registration.

---

## CommitPlan (conventional-commit messages, one per sub-step)

1. `test(demo): born-RED proof:gate-detrap — no on-mount open + contained glass-card preview frame + idiom-preserved + blurb-clean (AX.W63 Q8)`
2. `fix(demo): de-trap /compositions/gate-pattern — contained inline preview inside a bounded glass card, on-demand modal demo, never open-on-mount (AX.W63 Q8 BLOCKER)`
3. `docs(demo): clean the gate-pattern manifest blurb — strip (AW.W18), re-state the de-trapped idiom (AX.W63 Q8)`
4. `docs(AX): W63 gate-detrap audit json + W63-DELTA paired-π (the reachable page over the trapping modal) — GREEN`

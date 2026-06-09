# AX.W63 — gate-pattern de-trap · live-capture DELTA

The cardinal-lesson capture for the Q8 BLOCKER: `/compositions/gate-pattern`
opened a full-viewport non-dismissable modal ON MOUNT and locked the visitor out.
The de-trap re-authors the demo as a CONTAINED inline preview inside a bounded
glass card — the idiom is demonstrated on demand, the page is always reachable.

Route under test: `localhost:5173/compositions/gate-pattern` (light + dark, desktop
≥1280 + mobile 375×667).

## BEFORE (HEAD da57287 — the trap)

| Axis | BEFORE state | source |
|------|--------------|--------|
| mount behaviour | the `<Dialog>` opens the INSTANT the route mounts (`const open = ref(true)`) — a full-viewport modal covers the page at the top layer | `gate-pattern.vue:23` |
| dismissal | every channel suppressed — `:show-close="false"` (no X), `@escape-key-down.prevent` (esc swallowed), `@interact-outside.prevent` + `@pointer-down-outside.prevent` (scrim swallowed); the ONLY escape is typing `"wolfpack"` | `gate-pattern.vue:66-73` |
| containment | the Dialog portals RAW to the document top layer — no bounded preview frame (`grep -c 'glass-card\|<Card'` = 0) | `gate-pattern.vue:54-110` |
| blurb | leaks a tranche code — `…not a component (AW.W18)."` (consumer-facing) | `manifest.ts:239` |

The visitor navigating to the route is HELD HOSTAGE by a non-dismissable
viewport modal whose only exit is a magic string. The page is unreachable.

## AFTER (this wave — the de-trap)

| Axis | AFTER state | source |
|------|-------------|--------|
| mount behaviour | the modal starts CLOSED (`const open = ref(false)`); the page mounts to a bounded glass `<Card tier="floating" class="max-w-sm">` preview frame — the visitor reaches the page immediately | `gate-pattern.vue:36`, `:82` |
| on-demand trigger | an explicit on-page `<Button>` "Open the modal demo" sets `open.value = true` (`openDemo()`) — the visitor controls when the modal opens; the page chrome stays reachable | `gate-pattern.vue:46-50`, `:100` |
| idiom preserved | the REAL non-dismissable modal opens on demand with EVERY suppression channel intact (`:show-close="false"` + the three `@*.prevent` — 4 sites), closing on the correct key `"wolfpack"` (`submit()`); the `.input-pill [aria-invalid]` ring + the PRM-gated `gate-shake` wrong-key cue preserved | `gate-pattern.vue:117-123`, `:52-64` |
| containment | the gate demonstration renders INSIDE the bounded glass `<Card>` frame (the W54 glass-first default, `tier="floating"`); the modal is the on-demand demo, never the page | `gate-pattern.vue:82-114` |
| blurb | language-clean — `(AW.W18)` stripped, the de-trapped idiom re-stated (`grep -oE '\b[A-Z]{1,2}\.W[0-9]'` over the row = NONE) | `manifest.ts:239` |

## Source-true readback (the device-free proof — `proof:gate-detrap` GREEN)

```
proof:gate-detrap — the /compositions/gate-pattern de-trap (AX.W63 Q8 BLOCKER)
  A no on-mount open       : ok          (was RED — open=ref(true))
  B contained glass-card   : ok          (was RED — no frame)
  C on-demand trigger      : ok
  D idiom preserved        : ok          (:show-close=false + 3×@*.prevent intact)
  E blurb language-clean   : ok          (was RED — AW.W18)
PASS
```

- `proof:story-language` stays GREEN over the re-stated blurb (145 SFCs, 0 hits) — W58 intact.
- the route serves `HTTP 200`; no typecheck error in `gate-pattern.vue` / `manifest.ts`.

## π live arm — ORCHESTRATOR-OWED (the binding close)

The chrome browser extension was not connected in the implementer session
(`tabs_context` returned "extension not connected"), so the fail-CLOSED live π
audit — the BINDING close criterion per the CAPTURE-PROTOCOL — is owed to the
orchestrator's chrome-devtools-mcp sweep. It must capture (light + dark, ≥2
viewports) and append the paired-π getComputedStyle readbacks + screenshots here:

| Capture | Assertion |
|---------|-----------|
| `W63-gate-pattern-desktop-light.png` / `-dark.png` | the page reads (StorySection + the bounded glass `<Card>` gate preview); NO full-viewport non-dismissable modal covers it on mount — esc + a click outside the preview do NOT trap the visitor (the BLOCKER fix) |
| `W63-gate-pattern-mobile-light.png` / `-dark.png` | same, at 375×667 |
| `getComputedStyle(card).backdropFilter` | a glass blur (the W54 glass-first default) on the preview `<Card>` — translucent background |
| modal-open capture | clicking "Open the modal demo" opens the REAL non-dismissable modal (`show-close=false`, esc/scrim suppressed); a wrong key paints the widened `.input-pill [aria-invalid]` ring + the `gate-shake` cue (PRM-gated); `"wolfpack"` closes it and the page is regained |
| W18/W58 canary | the gate-pattern row position is unmoved; the prose is language-clean |

Verdict (source arm): **PASS** — the de-trap is structurally proven (no on-mount
open, contained glass-card frame, on-demand trigger, idiom preserved, blurb clean).
The painted-pixel truth (the visitor reaches the page, the preview reads glass) is
the orchestrator's live capture above.

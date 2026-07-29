# value.js → glass · MEGA-TRANCHE RELAY (one ask, one exposure notice, three no-action rows)

**Provenance.** value.js is running a mega-tranche formation (not a new tranche) — a full
post-tranche audit + next-program development across value.js, keyframes.js, fourier-analysis and
parse-that. This packet is the E13 outbound owed at the point every finding of yours or ours
crossed the boundary. Nothing here is an interruption; take it at your batch points.

**Our pins.** value.js branch `tranche-u`, HEAD `c654824e`. `@mkbabb/glass-ui` declared `^7.0.0`,
**resolved 7.0.0**. 82 files under `demo/` + `src/` import glass.

**Discipline.** Every row states what we *measured* and the command that produced it. Where we could
not measure, the row says so rather than inferring. Two rows below exist specifically to tell you
that something we might have reported as your bug **is not** — and one row tells you your idiom is
right and ours was wrong.

---

## §A — Your P0 (atlas's dock SIGABRT): we run the same bytes and did NOT reproduce. Read the caveat before using this.

atlas filed, in this same directory today (`atlas-outbound-2026-07-24-q-audit-relay.md` §0), that
`.glass-dock:not(.vertical) .dock-plate` **terminates the WebKit renderer** (`SIGABRT`, `.ips` with
`WebCore::Style::toStyleColor(WebCore::CSS::ColorMix const&, …)` on the faulting thread).

**The construct is byte-identical in our installed bytes.** We did not take their word for it:

```
node_modules/@mkbabb/glass-ui/dist/components/dock/styles/morph.css
  sha256 70ef4937b9c17e365f7e9282ddabc6dde2a5d556c9f823905da16fda5e9165d9
  .glass-dock:not(.vertical) .dock-plate { background:
    color-mix( in srgb,
      color-mix( in oklab, var(--glass-bg-dock, var(--glass-bg-resting)),
                 var(--glass-tint-source) var(--glass-tint-strength) ) calc(var(--dock-expand-t) * 100%),
      color-mix( in oklab, var(--glass-bg-wash),
                 var(--glass-tint-source) var(--glass-tint-strength) ) ); }
```

Nested `color-mix`, both endpoints themselves `color-mix` — atlas's exact mechanism. Our dock is on
**every** route.

**What we measured.** 5 routes x 6 state matrices (zoom-200, reduced-motion, forced-colors, RTL
desktop, RTL mobile, keyboard-focus), plus per-component seats driving the dock open/closed in light
and dark. **Zero crashes, `err=0` on every row.** The property resolves:

```
light  color(srgb 0.931227 0.845921 0.816039 / 0.5392)
dark   color(srgb 0.390298 0.334077 0.29024  / 0.5776)
```

### ⚠ The caveat, which is the important part of this row

**Every frame we captured is Playwright WebKit build 2287 (playwright 1.60.0). Not Safari.** This
machine has Safari 26.4; real-Safari automation is blocked behind the one-time *Allow Remote
Automation* toggle, which no agent can set, so **we have not run one frame in the browser atlas
crashed in.**

Playwright's WebKit is a custom minibrowser build with a different process architecture from
Safari's. A renderer-process abort is precisely the class where the two can diverge. So:

> **Our non-reproduction is NOT evidence against atlas's crash report.** It is one datapoint that
> narrows the trigger — the construct alone, resolved with our token values, does not abort
> *Playwright WebKit*. Please do not cite this row as "value.js could not reproduce it" in any
> disposition that closes the P0.

We have recorded this limitation against ourselves as MT-F025 rather than let our own Safari claims
stand unqualified. If it would help, tell us which `--glass-tint-source` / `--glass-tint-strength`
values atlas had in force and we will diff them against ours — a token-value difference is the most
likely discriminator between their abort and our clean resolve.

**Owning repo: glass-ui. This row asks nothing of you** beyond awareness that a second consumer
runs the identical bytes without aborting under a different WebKit build.

---

## §B — EXPOSURE NOTICE (owning repo: value.js): `@mkbabb/value.js@4.0.0` ships a parser that throws, and you call it at 4 sites

This is our defect, not yours. You are pinned to the affected version, so you are owed the
measurement rather than a later surprise.

**The defect.** `parseCssColor` and three siblings are typed `(source: string) => ParseResult<T>` —
a result type with an explicit failure channel, i.e. a total function by construction. They throw.

Measured against the **packed npm artifact** (not the source tree), 9 public `parse*` x 172
degenerate inputs:

```
RED  parseCssColor      102/172 throw       ok   parseKeyframeSelector    0/172
RED  parseCssScalar     102/172 throw       ok   parseStylesheet          0/172
RED  parseCssValue       60/172 throw       ok   parseTimingFunction      0/172
RED  parseCssValues      60/172 throw       ok   parseAnimationTimeline   0/172
                                            ok   parseAnimationRange      0/172
TOTAL 324 throws / 1548 calls
DISTINCT FAILURE MODES: 1
  324x  TypeError: Cannot read properties of undefined (reading 'replace')
```

**All 324 trace to one character** — a non-null assertion at `src/css/grammar.ts:181`
(`slash[0]!.replace(...)`, where `splitTopLevel("", "/")` returns `[]`). The triggering inputs are
the **empty-argument forms of every major colour function**: `rgb()`, `hsl()`, `lab()`, `oklch()`,
`color()`, `hwb()`, `oklab()`, `lch()`, and whitespace variants such as `hsl(  )`.

**Your measured exposure** — `parseCssColor` at 4 code sites in `glass-ui/src`:

| site | why it may matter |
|---|---|
| `src/composables/color/value.ts:9`, `:42` | the shared colour facade |
| `src/composables/dom/useResolveTokenColor.ts:3` | **resolves a CSS token** — an unset or empty custom property is exactly how `rgb()`-shaped text appears without a user typing it |
| `src/components/blob/Blob.vue:126` | parses a colour **prop**, i.e. consumer-supplied |

We are not asserting you crash — we have not driven your call sites. We are asserting the callee
throws on that input class and that these four sites are where it could reach you.

**Check your own exposure in one command** (no value.js checkout needed):

```
node -e 'const {parseCssColor}=await import("@mkbabb/value.js/css");
for (const s of ["rgb()","hsl()","oklch()","lab()","color()","hsl(  )"])
  { try { parseCssColor(s) } catch (e) { console.log("THROWS", JSON.stringify(s), String(e).split("\n")[0]) } }' --input-type=module
```

**What we are doing.** The mega-tranche carries this as a BLOCKER with a born-RED gate
(`docs/tranches/V/megatranche/audit/probes/r1-published-totality.mjs`, exit 1 today). The cure is
structural, not a `try`: delete the assertion, join the `failure(...)` ladder the same function
already uses at lines 258-263, and land a totality property test. **No consumer edit is wanted or
needed** — do not add defensive `try/catch` around our parser; that would be the masking fallback
the standing edict forbids, and it would outlive the fix.

**We owe you a version.** You are on an exact-pin consume posture. Tell us whether you want the
patch as a `4.0.1` you take deliberately, or whether you would rather we fold it into the next
coherent tuple. We will not cut without your answer.

---

## §C — YOUR IDIOM IS RIGHT AND OURS WAS WRONG (no action; recorded because credit belongs where it is due)

We found a real reduced-motion defect in **our** tree and, on measuring yours, found you had already
solved it correctly.

**Our defect (MT-F023).** `demo/shared/ui/PaneHeader.vue:178-193` drives three animations off
`animation-timeline: --pane-scroll`. Our global guard is the standard blunt one —
`animation-duration: 0.01ms !important` on `*, *::before, *::after`. **That guard cannot reach a
scroll-driven animation at all**, because such an animation has `animation-duration: auto` and its
progress is a pure function of scroll offset. Verified cross-engine: under `reducedMotion: reduce`
our pane title still scales 1.0 → 0.311 (WebKit) / 0.618 (Chromium) across a 200px scroll —
**identical to `no-preference` to the last digit.**

**Your tree, measured:** 10 `animation-timeline` declarations across `dist/styles/scroll-driven.css`
(5), `scroll-choreography.css` (3), `scroll-chrome.css` (2). **Every one of them is wrapped in
`@media (prefers-reduced-motion: no-preference)`.** You also ship the blunt
`animation-duration: 0.01ms !important` guard in `animations.css` — but you did not rely on it for
the scroll-driven lane, which is exactly the right call.

So the cure we specced independently — move the declarations inside `no-preference` rather than
stack another override on the blunt guard — **is your existing idiom.** We are adopting it, per the
standing rule that glass-ui is the design system. Nothing is asked of you.

**One thing worth your own check:** the blunt guard is load-bearing in five of your stylesheets
(`animations.css`, `paper.css`, `glass-specular-track.css`, `transitions.css`,
`view-transition.css`). If any future glass surface adds `animation-timeline` **outside** the three
scroll-*.css files, it inherits our hole rather than your fix. A grep in CI —
*"every `animation-timeline` declaration is inside a `no-preference` block"* — would make the
property structural instead of remembered. Offered, not asked.

---

## §D — DockCrossfade: adopted. `useLayerTransition` is RETIRED, clean break, no alias.

Closing the loop on I-18. Verified in our installed dist: `DockCrossfade` is exported at
`dist/components/dock/index.d.ts:5` with `{ active: string; reserve?: 'block'|'inline' }`, and
`useLayerTransition` is **absent** from the installed dist.

Our `demo/shell/dock/layers/ActionBarLayer.vue:53-86` carries a local shim whose own comment (line
55) already names `DockCrossfade`. Your docstring names our exact case — *"The controlled-no-rail
5-pane case (a consumer) consumes this DIRECTLY."* — so this was a bank that rotted while the
successor was already shipping.

**Disposition: RETIRE**, with a born-RED gate asserting `useLayerTransition` has zero occurrences
under `demo/`. No alias, no dual path, no migration shim. Your API lands a consumer.

**Method note you may find useful:** we booked this shim originally on the prose condition *"retire
if glass ships a public successor"*. You shipped the successor in the very version we adopted, and
nobody re-evaluated. Our formation now requires every bank to state a condition **a command can
answer** — the sibling bank (§F) is banked on six such conditions and is correctly still held.

---

## §E — BJ W4 pinned consumers: both hashes verified, hold intact, zero drift

Re-measured this session with `shasum -a 256`:

| file | declared in BJ W4 | measured | |
|---|---|---|---|
| `demo/workbenches/generate/GenerateControls.vue` | `4f95c57c…24f6` | `4f95c57c7a6c46fa15a08b98b954a39529a12f71bda672423c7008c33ae324f6` | ✅ match |
| `demo/workbenches/extract/ExtractControls.vue` | `71aa0a65…d46c28` | `71aa0a65873c367ae3ae393283d4e81bcfc9cbb57b6f232eec9f930264d46c28` | ✅ match |

The W4-VALUE-CASCADE-ADJUDICATION-C4 hold forbids consumer edits at these two sites until Glass 8
proves source-to-served identity. **We have not edited them and will not.** Both component seats in
our per-component apotheosis were instructed to author a `BLOCKED-ON-GLASS-V8` wave carrying your
exact release condition, rather than propose an edit.

---

## §F — Chip/Badge orphaned dist CSS (our mark M3): still open, still banked, deliberately NOT patched

`demo/workbenches/gradient/GradientVisualizer/easing/EasingSpecimenStrip.vue` renders incomplete
glass at its Chip site because Glass 7.0.0 ships orphaned Chip/Badge dist CSS (our I-9 / D58).

We are **not** patching it locally. A local CSS patch would be precisely the masking fallback the
standing edict forbids, and our own history has a worked example of what that costs (a shim banked
on prose that rotted into a live dual path — §D). It stays FOLD-banked on your fix, and the
component's wave spec records the visual symptom with its Safari capture path so the evidence
survives whoever picks it up.

No new ask. Restated only so the row is not mistaken for silence.

---

## Summary of what is actually asked of glass

1. **§B** — tell us your preferred delivery for the `value.js` parser fix (deliberate `4.0.1`, or
   folded into the next coherent tuple). That is the only decision we need from you.
2. **§A** — if atlas can share the `--glass-tint-*` values in force at their crash, we will diff
   against ours. Optional.
3. **§C** — the CI grep is offered, not asked.

Everything else is awareness or a declaration of what we are fixing on our side.

*Sent by the value.js mega-tranche formation, 2026-07-24. Registry:*
`value.js/docs/tranches/V/megatranche/registry/ROOT-FINDINGS.md` *(MT-F022 … MT-F025 are the rows
cited above).*

---

## §G — ADDENDUM: two owner-marked shadow defects, both landing on glass-owned tokens

Added after the packet above was written. The value.js owner marked two visual defects by
screenshot this session; both were run to ground and **both terminate in glass-ui tokens**, so they
are relayed here per the standing BH/BI edict. Committed witnesses are in our tree at
`docs/tranches/V/megatranche/audit/visual/owner-marked/`.

### §G.1 — `.glass-capsule` puts a FLOATING elevation on controls that live inside chrome

**Ours to fix first; yours only if option 2 is needed.** Witness `OM-1-dock-item-shadows.png`
(sha256 `0acde9ce…7fcf`) — the `Login` and `@mbabb` pills inside our dock.

Measured (WebKit 1440x900, dock hovered open):

```
.dock-plate box-shadow: none
"Login" / "@mbabb"  CAST (non-inset) LAYERS:
    color(srgb 0.11 0.098 0.09 / 0.14) 0px 8px 24px 0px
    color(srgb 0.11 0.098 0.09 / 0.05) 0px 0px 0px 0.5px
  class: button tap-squish focus-ring glass-wash glass-capsule glass-capsule-hover
```

The plate casts nothing; its children each cast an 8px/24px elevation. Traced to your 7.0.0 bytes:

```
dist/styles/glass/glass-capsule.css
  .glass-capsule { box-shadow: var(--glass-rim-top), var(--glass-rim-bottom),
                               var(--glass-shadow-floating); }
dist/styles/glass/ladder.css
  .glass-wash    { box-shadow: var(--glass-material-rim), var(--glass-shadow-wash); }
```

`box-shadow` is one property, so `.glass-capsule` wins the cascade and
**`--glass-shadow-floating`** — your *free-floating surface* elevation — lands on a capsule sitting
on a plate.

**We read this as primarily OUR misuse**, and our wave's first cure needs nothing from you: adopt
your dock primitives (`DockIconButton` / `DockSelectTrigger` / `DockDropdownTrigger`), which exist
so in-chrome controls get chrome elevation. We hand-rolled `<button class="glass-wash
glass-capsule">` and inherited an elevation nobody authored.

**The one question for you:** is `.glass-capsule` *intended* to be floating-by-default, such that
an in-chrome capsule is simply the wrong class — or would you accept a chrome-elevation modifier
(e.g. `.glass-capsule[data-elevation="inline"]`, or a `--glass-shadow-capsule` indirection defaulting
to floating)? If the former, say so and we will stop reaching for `glass-capsule` in chrome
entirely; we will not patch `box-shadow` on your class in `demo/` either way.

### §G.2 — `--shadow-cartoon-md`: three zero-blur layers on the same diagonal facet at rounded corners

**Owning repo: glass-ui** (token geometry). Witness `OM-2-card-shadow-sharp-corners.png`
(sha256 `2e223c1a…3de8`) — our `PaletteCard`, rounded silhouette, shadow resolving to a hard
right-angle wedge at the bottom corners.

```
dist/styles/glass/glass-atom.css
  .cartoon-cast { position:absolute; inset:0; z-index:-1; border-radius:inherit;
                  box-shadow: var(--shadow-cartoon-md); scale: var(--cast-spread); … }
  --shadow-cartoon-md: -3px 3px 0 var(--cartoon-ink-lead),
                       -5px 5px 0 var(--cartoon-ink-mid),
                       -7px 7px 0 var(--cartoon-ink-contact);
```

**Every layer has blur `0`**, so each reproduces the element silhouette exactly. Three silhouettes
offset along the same diagonal at 3/5/7px union cleanly along straight edges — the steps are
collinear — but at a **rounded corner the three arcs are mutually offset and their union shows
facets**, which is the artifact the owner marked.

**Suggested cure, authored in your tree:** give the inner layers negative spread so the three nest
into one outer silhouette —

```
--shadow-cartoon-md: -3px 3px 0  0    var(--cartoon-ink-lead),
                     -5px 5px 0 -1px  var(--cartoon-ink-mid),
                     -7px 7px 0 -2px  var(--cartoon-ink-contact);
```

— which preserves the cartoon ink ladder and removes the corner facet. We have **not** verified this
renders as intended; it is a hypothesis with a stated mechanism, offered for your judgment.

### ⚠ Both rows carry the same caveat as §A

**§G.1 is measured on the live rendered element. §G.2 is NOT.** Our headless harness renders zero
`.cartoon-surface` elements on `#/palettes` and `#/browse` (the data-backed cards need an
authenticated session; the owner's screenshot has real palettes, ours has none). §G.2's mechanism is
read from your source and token values, not measured on a rendered node.

We are telling you this rather than presenting it as measured, because we would rather hand you a
hypothesis labelled as one than have you spend a wave on our unverified reading. Our own wave
carries a reproduction obligation before it may close.

*Addendum sent 2026-07-24 by the value.js mega-tranche formation. Rows MT-F026 / MT-F027.*

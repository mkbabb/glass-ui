# Q.W3 Lane E — substrate REVERT: rainbow + btn-interactive utility re-promote (Q-cos-3)

**Wave**: Q.W3 — Core-feature cohesion transpositions + cosmetic substrate REVERTs.
**Lane**: E — substrate REVERT (Q-cos-3).
**Date**: 2026-05-18.
**Bounds**: `src/styles/utilities.css` only.

---

## Charter

Per W3.md Lane E (lines 36-42) + Qη §1.B + Mμ-4. Commit `b0debec`
(D.W2.D, "delete zero-site style-surface orphans", 2026-04-30) retired
three utility recipes — `.rainbow-vivid`, `.rainbow-pastel`,
`.btn-interactive` — under a zero-consumer audit that **missed
keyframes.js's consumption**. The `--rainbow-*` color tokens survived
in `tokens.css` §14; only the recipes were retired.

Re-promote all three as `@utility` recipes in `utilities.css`, consuming
the surviving tokens. Faithful re-express — recover the original recipe
bodies from `git show b0debec`, re-express idiomatically as Tailwind v4
`@utility` blocks (matching the existing `btn-audacious` / `scale-on-hover`
recipes in the file).

The re-promote does **NOT** violate L invariant 8 (substrate-without-
consumer). Post-revert, keyframes.js is the ≥ 1 consumer; the revert IS
the consumer rediscovery. W5 formally re-adopts them.

---

## `git show b0debec` analysis

`b0debec10dc3394ad34187a5468cc2d50e480b80` — *"refactor(styles): delete
zero-site style-surface orphans (D.W2.D)"*, 2026-04-30. Commit message:

> Fresh W2 grep re-grounded the W0 styles audit against src, demo,
> Fourier, Words, and BBNF before deletion. Deleted 90 original
> library-orphan style artefacts …

It deleted 90 style artefacts from `src/styles/` (a 277-line removal in
`utilities.css` alone). Among them, the three this lane re-promotes —
recovered verbatim from the diff:

```css
/* utilities.css (pre-b0debec), inside @layer components */
.btn-interactive {
    transition: background-color var(--duration-fast) var(--ease-standard),
                color var(--duration-fast) var(--ease-standard),
                transform var(--duration-fast) var(--ease-standard),
                opacity var(--duration-fast) var(--ease-standard);
}
.btn-interactive:hover  { transform: scale(var(--scale-hover)); }
.btn-interactive:active { transform: scale(var(--scale-press)); }
.btn-interactive:disabled {
    opacity: var(--opacity-disabled);
    pointer-events: none;
}
.btn-interactive:focus-visible {
    box-shadow: var(--focus-ring-shadow);
    outline: none;
    /* Fade in; base state has no box-shadow transition → instant removal */
    transition: background-color var(--duration-fast) var(--ease-standard),
                color var(--duration-fast) var(--ease-standard),
                transform var(--duration-fast) var(--ease-standard),
                opacity var(--duration-fast) var(--ease-standard),
                box-shadow var(--duration-fast) var(--ease-standard);
}

.rainbow-pastel {
    background: linear-gradient(to right, var(--rainbow-pastel-red), var(--rainbow-pastel-orange), var(--rainbow-pastel-yellow), var(--rainbow-pastel-green), var(--rainbow-pastel-blue), var(--rainbow-pastel-indigo), var(--rainbow-pastel-violet));
}
.rainbow-vivid {
    background: linear-gradient(to right, var(--rainbow-red), var(--rainbow-orange), var(--rainbow-yellow), var(--rainbow-green), var(--rainbow-blue), var(--rainbow-indigo), var(--rainbow-violet));
}
```

### The false zero-site verdict

The commit message claims the audit "re-grounded against src, demo,
Fourier, Words, and BBNF before deletion." That corpus is **incomplete**:
keyframes.js (`/Users/mkbabb/Programming/keyframes.js`, linked via
`"@mkbabb/glass-ui": "file:../glass-ui"`) was never in the audit set.
keyframes.js consumed all three retired recipes:

| Recipe | keyframes.js consumer | Sites |
|---|---|---|
| `.rainbow-vivid` / `.rainbow-pastel` | `AnimationMenuBar.vue` round play button (`isPlaying ? 'rainbow-vivid' : 'rainbow-pastel'`) | 2 (expanded :91-104, collapsed :125-136) |
| `.btn-interactive` | `CubeScene.vue`, `EasingScene.vue`, `demo/cube/App.vue`, `AnimationControlsGroup.vue` (RIBBON_BUTTON_CLASS), `PlaybackRibbon.vue` (Reverse button) | 7 |

The retiral was **correct in shape** (the recipes were genuinely orphan
in glass-ui's own demo + Fourier + Words + BBNF) but **incorrectly
executed** — one consumer in the fleet was unswept. The recipes' class
names survived as fossils in keyframes.js, silently emitting no styling:
the play button fell back to its bare `bg-primary` Button variant
(near-black `rgb(28, 25, 23)` instead of the rainbow gradient), and the
`.btn-interactive` callsites lost their spring hover-scale.

Note the asymmetric retiral: `b0debec` deleted the recipe **classes**
but left the `--rainbow-*` / `--rainbow-pastel-*` **color tokens** intact
in `tokens.css` §14 (lines 787-801) and their `--color-rainbow-*` bridge
in `theme.css`. The SVG `linearGradient` in `AnimationControlsGroup.vue`
references `var(--rainbow-red)` directly, so it kept working — proving
the tokens are load-bearing. Only the class-form recipe that paints the
gradient as a `background` died. `FuzzySearch.vue` is a second substrate
consumer of `--rainbow-pastel-yellow`, so the token family already had
≥ 2 consumers; re-promoting the class recipes restores the natural home
for the class form.

---

## The three re-promoted `@utility` recipes

Added to `src/styles/utilities.css` (top-level `@utility` blocks, after
`btn-audacious`, before the reduced-motion bracket — matching the
existing top-level `@utility` recipe placement). Re-expressed from the
pre-`b0debec` `@layer components` bodies into idiomatic Tailwind v4
`@utility` form (nested `&` selectors, matching `btn-audacious` /
`scale-on-hover`):

```css
@utility rainbow-vivid {
    background: linear-gradient(
        to right,
        var(--rainbow-red),
        var(--rainbow-orange),
        var(--rainbow-yellow),
        var(--rainbow-green),
        var(--rainbow-blue),
        var(--rainbow-indigo),
        var(--rainbow-violet)
    );
}

@utility rainbow-pastel {
    background: linear-gradient(
        to right,
        var(--rainbow-pastel-red),
        var(--rainbow-pastel-orange),
        var(--rainbow-pastel-yellow),
        var(--rainbow-pastel-green),
        var(--rainbow-pastel-blue),
        var(--rainbow-pastel-indigo),
        var(--rainbow-pastel-violet)
    );
}

@utility btn-interactive {
    transition:
        background-color var(--duration-fast) var(--ease-standard),
        color var(--duration-fast) var(--ease-standard),
        transform var(--duration-fast) var(--ease-standard),
        opacity var(--duration-fast) var(--ease-standard);

    &:hover {
        transform: scale(var(--scale-hover));
    }

    &:active {
        transform: scale(var(--scale-press));
    }

    &:disabled {
        opacity: var(--opacity-disabled);
        pointer-events: none;
    }

    &:focus-visible {
        box-shadow: var(--focus-ring-shadow);
        outline: none;
        /* Fade in; base state has no box-shadow transition → instant
           removal */
        transition:
            background-color var(--duration-fast) var(--ease-standard),
            color var(--duration-fast) var(--ease-standard),
            transform var(--duration-fast) var(--ease-standard),
            opacity var(--duration-fast) var(--ease-standard),
            box-shadow var(--duration-fast) var(--ease-standard);
    }
}
```

Fidelity notes:

- **Token consumption**: every `var()` resolves against a surviving
  token. `rainbow-vivid` → `--rainbow-{red,orange,yellow,green,blue,indigo,violet}`
  (tokens.css §14, lines 787-793). `rainbow-pastel` →
  `--rainbow-pastel-{red…violet}` (lines 795-801). `btn-interactive` →
  `--duration-fast`, `--ease-standard`, `--scale-hover`, `--scale-press`,
  `--opacity-disabled`, `--focus-ring-shadow` (all canonical in §1, §2,
  §11). Zero phantom tokens introduced.
- **No `@keyframes` revived**. The `b0debec` diff also retired a
  `@keyframes rainbow-hue` from `animations.css`, but neither
  `.rainbow-vivid` nor `.rainbow-pastel` referenced it — they are pure
  static `background` gradients. Re-promoting the keyframe would
  reintroduce a genuine orphan; it is correctly left out. Lane E scope
  is exactly the three recipes named in W3.md.
- **`@layer components` → `@utility`**. The pre-`b0debec` bodies lived
  inside `@layer components`; the re-promote uses top-level `@utility`
  (Tailwind v4 idiom — same form as `btn-audacious`). This is the
  canonical re-express, not a paste; pseudo-state selectors become
  nested `&:hover` / `&:active` / `&:focus-visible` blocks.

---

## D.W2.D audit-logic gap diagnosed

The `b0debec` zero-site verdict failed by **incomplete corpus**. The
audit grep ran against `src, demo, Fourier, Words, and BBNF` — five
surfaces — and concluded the three recipes had zero consumers. The
verdict was true *within that corpus* and false *in the fleet*:
keyframes.js, a sixth consumer linked via `file:../glass-ui`, was never
enumerated.

The gap is one of two mechanisms (Qη §0 isolates it as (a) or (b)):

- **(a)** The fleet-wide grep did not include keyframes.js in its corpus
  at all — the audit's consumer list was hand-maintained and keyframes.js
  was simply not on it.
- **(b)** The audit misread keyframes.js's *absence from glass-ui's own
  source* as a *global* absence — i.e. it grepped only the monorepo and
  assumed no external linked consumer existed.

Either way the root cause is the same: a "retire zero-site orphan" audit
that derives "zero-site" from a corpus that is not provably the complete
consumer set. A retiral verdict is only as sound as the enumeration of
consumers feeding it; an unenumerated linked consumer makes any
zero-site claim unfalsifiable.

This is the **"swept-and-missed"** pattern — the same mechanism that
produced cluster C2 at W4 Lane F, and the same shape as the O.W6 Lane D
IconTooltip wrap-span audit (Q.W3 Lane G). It motivates **invariant 32**
(W5 codification): a phantom-class corpus-grep gate that enumerates
*every* `file:`-linked consumer in the fleet before any "retire
zero-site" verdict lands, so a retiral is gated on a provably-complete
consumer set rather than a hand-maintained one.

The fix at this lane is the REVERT itself; the recurrence prevention is
the W5 invariant-32 gate.

---

## Verification

- `npm run typecheck` (vue-tsc --noEmit) — **GREEN**, no errors.
- `npx vitest run` — **GREEN**, 32 files / 377 tests passed.
- Token resolution confirmed: every `var()` in the three recipes
  resolves against a token present in `tokens.css` at HEAD —
  `--rainbow-{red…violet}` (§14 L787-793), `--rainbow-pastel-{red…violet}`
  (§14 L795-801), `--duration-fast` / `--ease-standard` (§1-§2),
  `--scale-hover` / `--scale-press` / `--opacity-disabled` (§11),
  `--focus-ring-shadow` (§11). No phantom tokens.
- Bounds respected: only `src/styles/utilities.css` touched.
- `npm run build` deliberately NOT run (orchestrator-owned); the
  Playwright visual probe (W3 hard-gate (k) — "rainbow recipes paint
  per `--rainbow-*` tokens") is orchestrator-driven post-merge.

---

## Verdict

**COMPLETE.** The three recipes `.rainbow-vivid`, `.rainbow-pastel`,
`.btn-interactive` are re-promoted as `@utility` recipes in
`src/styles/utilities.css`, faithful to their pre-`b0debec` bodies and
consuming only surviving canonical tokens. keyframes.js's round play
button and `.btn-interactive` callsites resolve again with no
consumer-side change. The D.W2.D audit-logic gap (incomplete consumer
corpus → false zero-site verdict) is diagnosed; recurrence prevention is
the W5 invariant-32 corpus-grep gate. L invariant 8 is satisfied —
post-revert keyframes.js is the ≥ 1 consumer.

W3.md hard-gate (f) — *"`.rainbow-vivid` + `.rainbow-pastel` +
`.btn-interactive` re-promoted as `@utility` recipes; D.W2.D audit-logic
gap diagnosed"* — **MET**.

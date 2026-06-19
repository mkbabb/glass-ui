# consumer-tier-class-lint — the consumer-side complement to `proof:tier-class-staleness`

**DISPOSITION: BUILD-as-gate** (FOURIER-INBOUND.md Tier-4 #12, tier-class-staleness).
**Owns:** FOURIER-INBOUND.md Tier-4 #12 (tier-staleness-gate), the consumer-side half.
**Wave:** `BC.W-FOURIER-DECIDES` · **Pairs with:** `scripts/proof-tier-class-staleness.mjs` (the producer-side gate).

> **Placement note.** This recipe lives in `docs/consumer-evidence/` (a glass-ui-owned
> tree), NOT in the `docs/precepts/` submodule — authoring into a submodule is a
> cross-repo write the foreign-tree fence forbids. glass-ui SHIPS the recipe; the
> consumer DROPS it into its own PostCSS/stylelint config (presets-in-consumers).

## The mechanism gap this closes

glass-ui retires CSS tier-class STRINGS on clean breaks (no aliases — inv-7). A retired
tier-class string still written in consumer markup (`class="cartoon-card"`,
`class="glass-subtle"`) does NOT error — it renders FLAT (zero glass), silently, for an
era. The history: `.cartoon-card` + `.elevated-card` were removed at C.W5; fourier kept
binding `cartoon-card` at 14 sites and got zero diagnostic. `proof:consumer-staleness`
catches the JS-import-resolution class (a deleted symbol / a retired subpath); it does
NOT scan consumer markup for a retired CSS-class STRING. That is the gap.

Two halves close it:

1. **Producer-side broadcast gate** — `scripts/proof-tier-class-staleness.mjs`
   (`npm run proof:tier-class-staleness`). For every PRESENT consumer sibling, it scans
   the markup for a `class=` / `:class=` literal containing a `RETIRED_TIER_CLASSES`
   member → WARN (a retired tier-class string renders zero glass silently). It is a
   DIAGNOSTIC (WARN), not a hard consumer-block — the consumer's markup is THEIR repo
   (the foreign-tree fence). The COMPLETENESS arm IS hard-RED: a class retired from
   glass-ui's own styles with no `RETIRED_TIER_CLASSES` entry reds (glass-ui's own
   single-source discipline).

2. **Consumer-side lint (this recipe)** — a consumer drops this into its OWN PostCSS /
   stylelint config to catch retired glass-ui tier-class strings in its markup at build
   time, in its own pipeline. The consumer wires it; glass-ui ships it.

## The retired tier-class set (single-sourced)

The canonical set lives in `scripts/proof-tier-class-staleness.mjs`'s
`RETIRED_TIER_CLASSES` (single-sourced from the retirement record — `cards.css:2`
records `.cartoon-card` + `.elevated-card` removed at C.W5; the glass-ladder re-model
retired the `.glass-subtle` / `.glass-medium` tier strings). At the time of writing:

```
cartoon-card
elevated-card
glass-subtle
glass-medium
glass-elevated
```

A class is ADDED to the set when it is retired (the `proof:precept-current` discipline);
the gate's completeness arm reds a retired-without-entry, so the set cannot fall behind
the retirements.

## The consumer PostCSS / stylelint recipe

Drop this `stylelint` plugin-config fragment into the consumer's `.stylelintrc` (or the
equivalent `postcss` plugin) to flag a retired glass-ui tier-class string in the
consumer's OWN selectors and markup at build time:

```js
// .stylelintrc.js — flag retired glass-ui tier-class strings in CSS selectors.
const RETIRED_GLASS_UI_TIER_CLASSES = [
    "cartoon-card",
    "elevated-card",
    "glass-subtle",
    "glass-medium",
    "glass-elevated",
];

module.exports = {
    plugins: ["stylelint-selector-disallowed-list"],
    rules: {
        "plugin/selector-disallowed-list": [
            RETIRED_GLASS_UI_TIER_CLASSES.map((c) => `.${c}`),
            {
                message: (sel) =>
                    `"${sel}" is a glass-ui tier-class RETIRED on a clean break — it ` +
                    `renders zero glass silently. Migrate to the current tier ` +
                    `(<Card surface="cartoon"> / the 5-rung glass ladder / cartoon-surface).`,
            },
        ],
    },
};
```

For markup (`.vue` / `.html` `class=` attributes the CSS linter does not reach), the
companion grep recipe — run in the consumer's CI before a glass-ui major bump:

```bash
# Flag retired glass-ui tier-class strings in consumer markup.
grep -rnE 'class="[^"]*\b(cartoon-card|elevated-card|glass-subtle|glass-medium|glass-elevated)\b' src/ \
  && echo "WARN: retired glass-ui tier-class string(s) above — renders zero glass silently" || true
```

## The contract with the producer gate

- glass-ui ships the recipe + the `RETIRED_TIER_CLASSES` single-source; the consumer
  wires the lint.
- the producer gate WARNs on a present consumer's retired-class markup (diagnostic, not a
  hard block — the foreign-tree fence); it hard-REDs the completeness arm (glass-ui's own
  retired-without-entry — the single-source discipline).
- a retired class is added to BOTH the recipe set above AND
  `RETIRED_TIER_CLASSES` when it is retired (kept in lockstep by the completeness arm).

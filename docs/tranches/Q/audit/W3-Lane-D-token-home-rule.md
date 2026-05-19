# W3 Lane D — Token-home rule (Q-coh-4)

## Charter

Per W3.md Lane D (line 32–34) and Qβ-F4. No consistent rule governed where feature tokens live: timeline tokens landed in `tokens.css §TIMELINE`; dock geometry tokens were split across `tokens.css §10` and `utilities.css` (density rung assignments). The lane's job is to author the canonical rule in DESIGN.md and establish the precedent the W4 token-promotion work will enforce. Lane D is doc-tier; it sets convention, it does not move CSS.

## The rule as authored

> **Feature tokens live in `tokens.css` under a `§<feature>` block. Feature recipes consume them from the feature's own stylesheet.**

Two-part:

1. Token *definition* — `tokens.css`, named `§<feature>` block. Single consumer-override surface.
2. Recipe *consumption* — the feature's CSS file or SFC non-scoped `<style>` block reads `var(--feature-token)`. No inline literals.

Splitting token assignments across two files (the dock split-brain) creates a silent cascade-order dependency. Consolidating into `tokens.css` makes the override contract predictable and the feature stylesheet literal-free.

## Where it lands in DESIGN.md

Appended to the existing `## Token Architecture` section, immediately after the consumer import-order code block, as a named subsection:

```
## Token Architecture
  [import order block]
  ### Feature token home rule (Q-coh-4)   ← new subsection
```

The subsection contains: rationale, two-part rule, worked example contrasting the compliant timeline shape against the pre-Q3 dock split-brain, and a forward reference to the W4 token promotions that must follow the rule.

## Evidence

**Compliant baseline — timeline (Qβ §2.4 + §5 shadow-cohort verdict).** `3cb70db` feat(timeline) landed `--timeline-dot-*` knobs in `tokens.css §16`, confirmed by `grep -n "§.*TIMELINE" src/styles/tokens.css` → line 804. GlassTimeline SFCs read the tokens via `var()`; no rung of the token is assigned in a second file.

**Violation — dock (Qβ-F1 + Qβ-F4).** `.glass-dock[data-density="*"]` density assignments split across `dock.css` lines 61–116 AND `utilities.css` lines 375–411. The `dock.css` authority comment at lines 691–695 *documents that its own token (`--dock-tab-h`) is set elsewhere* — the authority file's own comment names the fracture. Works only because `index.css` imports `utilities.css` after `dock.css` (line 73 > 68). W3 Lane A closes the fracture; this rule explains why.

## Verdict

Rule authored. DESIGN.md `## Token Architecture → ### Feature token home rule (Q-coh-4)` is the canonical cite. W4 metric-stack and timeline-dot token promotions must land in `tokens.css` under their respective `§<feature>` blocks; assignments in utilities.css or a secondary stylesheet are a hard-gate failure per this rule.

Status: COMPLETE. No source CSS mutated (doc-tier lane).

# BI.W-P072 — Badge

**Status:** DONE
**Disposition:** retained public static categorical metadata

Badge is noninteractive phrasing content. It communicates category or status through
consumer paint plus its retained metadata axes:

- `variant`: `"default" | "secondary" | "outline"`;
- `tone`: `"neutral" | "destructive" | "success" | "warning" | "info"`;
- `size`: `"sm" | "md" | "lg"`;
- `surface`: `"loud" | "glass"`.

The false affordance surface is removed:

- the `cast` prop, `data-cast`, and decorative caster child have no Badge API or markup;
- Badge variants contain no hover recolor, focus ring, active squash, or control
  transition classes;
- the shared glass-atom seam retains its material/tint paint but no longer gives static
  atoms an active squash or cast escalation;
- Badge-only CSS contains only rim, outline, glass fill, tint, and contrast paint.

Command behavior belongs to Button or Chip. Badge does not synthesize a role, tab stop,
or keyboard/pointer action.

Evidence:

- `src/components/badge/Badge.vue` renders one static `div` and its consumer slot.
- `src/components/badge/index.ts` preserves the four metadata axes without interaction
  utilities.
- `src/styles/glass/glass-atom.css` preserves current shared Surface/material work while
  removing Badge/atom press and cast selectors.
- `tests/components/badge.contract.test.ts` verifies the public axes, absent cast API and
  child, static semantics, class output, and shared CSS seam.
- `demo/stories/display/badge.vue` directs commands to Button or Chip and states the
  no-lift/no-squash/no-recolor/no-focus contract.

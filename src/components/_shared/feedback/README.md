# `_shared/feedback` — the charter

BK #21 W-DAG-REDUCE, 2026-08-10. Three files sat in this directory with no statement of
what made them one directory. This is that statement. It is a charter, not documentation:
it decides membership, and a file that cannot satisfy it does not live here.

## What the surface is

**The registers a component composes when it has something to say about ITS OWN state.**
Not a component family — a vocabulary. Nothing here renders a product surface; everything
here is composed BY one.

| member | kind | what it is |
| --- | --- | --- |
| `feedback-tone.css` | register | `.feedback-tone` + the four `.feedback-tone-<name>` tone bindings — a bounded tint of a glass rung toward a house tone token |
| `dot-ring.css` | register | `.glass-dot-ring` + `.glass-dot-ring-bead` — the library's ONE work-in-flight affordance |
| `DotRing.vue` | element | the seven nodes `dot-ring.css` animates, and nothing else (no props: presence is the state machine) |

## The three membership rules

1. **A member is composed by at least two families, or it is not shared.** `feedback-tone`
   is composed by Toast and Alert; `dot-ring` by Button, InfiniteScroll and EasingPicker.
   A register with one consumer belongs in that consumer's own directory, where its
   blast radius is legible. This is the rule that keeps `_shared` from becoming the place
   things go when nobody wants to decide.
2. **A member states state, never identity.** Tone says *this went wrong*; the dot-ring
   says *this is working*. A recipe that says *this is a Card* is not feedback, however
   shared it is.
3. **A member owns no color and mints no token.** Both registers spend house tokens
   (`--success` / `--warning` / `--info` / `--destructive`, the `--glass-plate-*` ladder,
   the spring and duration families). Presets live in consumers; this surface has none.

## Why there is no barrel

`DotRing.vue` has three importers, each reaching it by relative path, and a barrel would
add a module and an edge to the graph this row exists to shrink — an indirection whose
only product is a shorter specifier. The two stylesheets are reached by `@import` from
`src/styles/index.css` (7a, 7b), which is the cascade's own ordering seam and cannot be
delegated to a barrel without losing the load-order guarantee that entry documents.
**The charter is the consolidation.** When a fourth member arrives the rules above decide
it; a barrel would only have hidden the question.

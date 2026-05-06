# Consumer Evidence — `avatarVariants.size.base` + `avatarVariants.shape.square`

**Source**: `src/components/ui/avatar/Avatar.vue` (CVA `avatarVariants`)
**Demo consumer**: `demo/stories/data/avatar.vue:51,65`
**Glass-ui wire-or-retire pass**: I.W7 absorb (β audit found sub-bar — invariant 11)
**Verdict**: WIRE (sub-bar; canonical Storybook-as-oracle consumer)

## Verification command (run at HEAD)

```bash
rg -n 'size=.base.|shape=.square.' src/ demo/
```

Expected hits:
- `demo/stories/data/avatar.vue:51` — `<Avatar size="base" shape="circle">` (people grid)
- `demo/stories/data/avatar.vue:65` — `<Avatar size="base" shape="square">` (square shape demo)

## Notes

`base` is the canonical default rung (between `sm` and `lg`); `square` is the canonical alternate to `circle` for organizational/brand avatars where rounded edges convey corporate context. Both are demonstrated in the data/avatar story as canonical visual references.

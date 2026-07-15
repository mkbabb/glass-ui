# HeaderRibbon

A banner ribbon surface (`@mkbabb/glass-ui/header-ribbon`). A full-width header banner — a
page/section masthead strip — that carries a title, optional actions, and the glass register.

```vue
<HeaderRibbon>
    <template #title>Foundations</template>
    <template #actions>…</template>
</HeaderRibbon>
```

## Export

- **`HeaderRibbon`** — the banner. It exposes its ribbon prop/type surface and reads the glass
  tier so the banner reads as a glass strip over the page substrate.

A live keyframes.js consumer (restored at AZ.W-PRUNE2). The ribbon is the banner-strip register
distinct from the demo `<StoryHero>` masthead — reach for it when a surface needs a persistent
header band rather than a one-shot hero.

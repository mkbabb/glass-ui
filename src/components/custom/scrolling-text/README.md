# ScrollingText

An overflow-marquee text primitive (`@mkbabb/glass-ui/scrolling-text` + the root barrel). Text
that scrolls (marquee) ONLY when it overflows its container — a long label in a tight cell that
reveals itself on scroll, static when it fits.

```vue
<ScrollingText>A very long track title that would otherwise clip</ScrollingText>
```

## Export

- **`ScrollingText`** — the marquee. It scrolls on a compositor `translateX` only when the text
  overflows (static when it fits — no gratuitous motion), and collapses to a static clipped/
  ellipsised read under `prefers-reduced-motion`.

Lifted from the speedtest fleet (v0.9.1). It is cherry-picked onto the root barrel (vueuse-free).
Reach for it for a long single-line label in a constrained width; pair with `FadingScroll` when
you want the overflow to feather rather than scroll.

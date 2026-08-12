# FourierField

The drawing machine. Every frame is the truncated inverse transform of a fixed spectrum,
`Σ c_k·e^{2πikt}` — the rings are the terms, the chain is the sum, the head is where the
parameter currently is. Nothing decorative moves, so anything that moves is derivable.

```vue
<FourierField :config="config" :get-palette="getPalette" />
<FourierField color="var(--viz-fourier)" seed="hero" :interactive="false" />
```

## The four laws

1. **Motion is a theorem.** The paint is the transform of a fixed spectrum.
2. **Touch means TIME.** The pointer scrubs and flicks the clock. The figure never
   translates, leans, or chases.
3. **One axis, no ceiling.** `harmonics` truncates a fixed, amplitude-ordered,
   paint-floored array. `spectrum.length` is the maximum, and it is whatever the mint
   emitted for that source.
4. **The ink is the palette's own law.** An opaque mark over an opaque ink one ramp step
   down, offset along the segment's own tangent. Light-led head, never a white specular.

## The mint

`mintSpectrum` runs once per source or seed: forward DFT → hoist the DC term as the fit
anchor → sort by amplitude → keep a term only if it moves the curve by at least half a
device pixel at the reference stage. Amplitude order is what makes the assembly claim
true — every step of the N axis adds the largest remaining correction. The fit is fixed
under N, so the figure never rescales while you drag.

`ringsAt` is the same question asked of the live stage: a ring is drawn only if its own
diameter reaches the mark's stroke. Below that rung the term is still summed and still
chained; only the outline elides. That is why the machine reads on a phone and in a cel
with zero media queries.

## WebGPU only

There is one renderer. Where WebGPU is absent the field reports the failure through
`rendererStatus` and paints nothing — a blank stage you can ask about, never a lookalike
drawn by a different machine.

## Accessibility

Interactive, the host is the transport: `role="slider"` over the loop parameter, with
`aria-valuetext` carrying the same summed term count the frame used. Arrows scrub by 1/64,
Up/Down by 1/8, Home/End to the ends, Space pauses. A decor mount (`:interactive="false"`)
has no role, no tab stop and no listeners.

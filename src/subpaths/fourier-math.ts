// The `/fourier-math` shared math leaf (AY.W-FF2 §2.9, the W-FF1 PROMOTE
// disposition branch a). `math.ts` is Vue-free + DOM-free by construction, so a
// sibling repo (fourier-analysis) imports the pure inverse-DFT/epicycle math via
// this subpath WITHOUT dragging FourierField.vue or the elliptic-spectrum
// generators into a math-only consumer's bundle (the substrate-isolation concern
// the `/fourier-field` component subpath would violate).
export * from "../components/fourier-field/math";

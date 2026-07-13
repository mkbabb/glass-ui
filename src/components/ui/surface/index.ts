// ui/surface — the bare (tier × decoration) glass plate primitive
// (BI.W-SURFACE-EXTRACT). The extracted plate `<Card>` composes; every
// content/floating surface is `<Surface>` + its own chrome. The surface-axis
// resolver + the `decorationClass` seam live in `_shared/useSurfaceAxis.ts` (the
// shared axis home); this package publishes the COMPONENT + `SurfaceProps`.
export { default as Surface, type SurfaceProps } from "./Surface.vue";
// The decoration seam re-exported beside the component so a consumer reaching for
// the `/surface` subpath has the class resolvers too (the runtime home, beside
// `surfaceClass`). The `Surface` UNION type + `SurfaceTier` publish via `/api` +
// `_shared` (NOT re-exported here — the union name would shadow the `<Surface>`
// component value on this barrel).
export { decorationClass, surfaceClass } from "../_shared/useSurfaceAxis";

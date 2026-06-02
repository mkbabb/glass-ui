// AQ.W6 §Design 5 — the native-`<dialog>` glass pilot package barrel.
//
// NOT re-exported from the root barrel / a flat subpath: the pilot is gated to
// its demo story (the consumer) pending the muster J.W6 ≥2-consumer adoption
// (disposition recorded for the W8 overfitting audit). Demos import it directly
// from this barrel.
export { default as GlassDialogNative } from "./GlassDialogNative.vue";

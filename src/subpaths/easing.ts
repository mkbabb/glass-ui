// @mkbabb/glass-ui/easing — the published <EasingPicker>/<EasingConfigurator>
// curve-authoring family (BB.W-EASING-PRIMITIVE).
//
// The value.js-BEARING leaf of the motion system — it composes the value.js easing
// callables (CSSCubicBezier / steppedEase / bezierPresets / jumpTerms), so it ships
// as its OWN subpath leaf and is NOT on the value.js-FREE root barrel (the SCC-trap
// discipline; the /motion-curves precedent — a value.js-bearing curve leaf carves
// OFF the value.js-free /motion). A consumer that wants the curve editor imports
// here; the value.js-free motion suite stays on /motion.
export * from "../components/custom/easing";

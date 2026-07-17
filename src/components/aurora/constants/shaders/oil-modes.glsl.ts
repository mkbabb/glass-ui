// Aurora oil-stroke MODE selector — the `profileFor(medium, mode) -> StrokeProfile`
// (medium, mode) selector as a cohesive GLSL chunk
// The if-ladder's knobs are the
// StrokeProfile's fields (logic-as-DATA); a new stroke medium AUTHORS a case here.
// `mediums.glsl.ts` splices this export back into AURORA_MEDIUMS_POST_BRUSH_GLSL via
// a template join (immediately after the StrokeProfile struct, before
// paintStrokeLayers) so the assembled shader is byte-identical + GLSL declaration
// order is preserved (profileFor defined before its mediumOil/mediumOilPastel callers).
export const AURORA_OIL_MODES_GLSL = /* glsl */ `StrokeProfile profileFor(int medium, int mode) {
  // The oil baseline (mode 0) — balanced modern-abstract/palette-knife hybrid.
  StrokeProfile prof = StrokeProfile(
    0,      // shapeType — tapered
    0.25,   // bristleAmp
    9.0,    // streakFreq
    0.09,   // streakAmp
    0.9,    // impastoAmp
    0.80,   // hardness
    340.0,  // toothScale — finer 240 → 340. Oil's β sat
            //               right AT the −1.45 band ceiling (±0.02 frame variance straddling
            //               it, surfaced once the vangogh bands went green and the spec reached
            //               the oil β assert). MEASURED on the live GPU: ADDING fine high-
            //               frequency tooth energy steepens oil's power-spectrum slope (more
            //               negative — coarsening it the other way pushed β SHALLOWER to
            //               −1.33). A finer, stronger tooth moves β to a safe distance inside
            //               the −5/3 band [−1.85, −1.45]. Oil-only (oil-pastel sets 280).
    0.14,   // toothAmp — raised 0.09 → 0.14 (same oil-β steepen: more fine-grain high band).
    1.03,   // pigmentSat
    0.65,   // densityBig
    0.78,   // densityMed
    0.90,   // densitySml
    0.0,    // energyGrade — oil is uniform-length (no Starry-Night cascade)
    0.4,    // impastoFloor — oil's 0.4+0.6·edgeN crown falloff
    0.92,   // densityFill — oil fills DENSELY with the directional low-relief fill so the
            //               flat-colour regions between the macro strokes are TEXTURED with
            //               flow-aligned fine strokes (the §4.2 anisotropy needs every pixel
            //               to carry directional gradient; a flat untextured region reads as
            //               an isotropic/degenerate tensor and drags mean A down). The fill
            //               is now directional + low-streak, so dense coverage textures
            //               WITHOUT the round-dab speckle.
    1.0     // groundFloor — oil keeps the full base (no ground darken; fills everywhere)
  );

  // The Van Gogh medium does NOT route through this oil
  // StrokeProfile cascade. It is a DEDICATED atomic-dab body (mediumVangogh / vangoghDab
  // below) — a profile-driven cascade (four dense layers of long-thin
  // tensor-oriented strokes) merges into the "marbled flow-bands" read and runs at ~4fps.
  // profileFor now serves ONLY the oil + oil-pastel stroke mediums; the MEDIUM_VANGOGH
  // case is removed (no caller). MEDIUM_VANGOGH stays #define'd (the main() dispatch +
  // isPainterlyStroke still key off uMedium==5).

  // ── Oil-pastel — broad smeared directional strokes deposited via the brush engine
  // Creamy soft edges (low hardness), heavy build-up, and a chroma punch.
  // Distinct from the dry-crayon tooth-multiply (mediumCrayon): oil-pastel LAYS strokes.
  if (medium == MEDIUM_OILPASTEL) {
    prof.shapeType   = 0;     // tapered directional smear — a round dab reads locally
                              // isotropic (steep β / low A); the creamy oil-pastel mark
                              // is a broad DIRECTIONAL smear, which carries the §4.2
                              // coherence + adds the directional mid-band the §4.3 slope
                              // needs (the round-dab profile rolled β off to −2.8)
    prof.bristleAmp  = 0.10;  // smooth creamy edges (waxy pastel, not bristle)
    prof.streakFreq  = 18.0;  // finer internal smear — adds the mid/high-band the smooth
                              // round-dab profile lacked (the β-too-steep fix); the
                              // directional along-spine streak flattens the §4.3 slope
                              // without crossing the strokes
    prof.streakAmp   = 0.20;
    prof.impastoAmp  = 0.7;   // build-up, but flatter than oil impasto
    prof.hardness    = 0.42;  // CREAMY — soft compositing, strokes blend on overlap
    prof.toothScale  = 280.0;
    prof.toothAmp    = 0.12;  // the pastel tooth reads stronger
    prof.pigmentSat  = 0.80;  // the waxy chroma — kept low so the rendered C clears
                              // the §4.1 band ceiling with margin while the K-M subtractive
                              // overlap path (paintOverOklab) keeps the chroma OFF the grey floor
    prof.hardness    = 0.58;  // creamy but the strokes still REGISTER — a too-soft blend
                              // (0.42) smeared the marks into the smooth colour zones and
                              // the field rolled off too steep (β≈−2.9, a near-gradient);
                              // a crisper deposit keeps the mid/high-band the −5/3 slope needs
    prof.densityBig  = 0.62;  // broad directional coverage — but NOT over-dense: too many
                              // overlapping creamy strokes point in slightly-varied
                              // directions and the local §4.2 coherence DROPS (over-dense
                              // measured A=0.57 < the 0.62-density A=0.63). The mid-density
                              // flow-aligned deposit is the coherence sweet spot.
    prof.densityMed  = 0.78;
    prof.densitySml  = 0.90;
    prof.energyGrade = 0.80;  // a strong Starry-Night length cascade — varies stroke length
                              // by luma/coherence so the dab-size energy spreads across
                              // scales (the −5/3 cascade the uniform-length 0.0 grade lacked,
                              // the §4.3 β-too-steep fix). Not the full van-Gogh 1.0 (oil-
                              // pastel keeps its creamy broad character).
    prof.impastoFloor = 0.55; // a softer crown than van-Gogh's full-height glint
    return prof;
  }

  // ── Oil sub-modes (mode dispatch on the oil medium).
  if (mode == 1) {           // palette knife — razor edges, heavy impasto
    prof.shapeType  = 3;     // flat, even
    prof.bristleAmp = 0.12;
    prof.streakFreq = 4.0;  prof.streakAmp = 0.05;
    prof.impastoAmp = 1.6;
    prof.hardness   = 0.95;
    prof.toothAmp   = 0.04;
    prof.densityBig = 0.80; prof.densityMed = 0.88; prof.densitySml = 0.70;
  } else if (mode == 3) {    // thick brushwork — heavy bristle brush
    prof.shapeType  = 0;     // tapered
    prof.bristleAmp = 0.32;
    prof.streakFreq = 14.0; prof.streakAmp = 0.14;
    prof.impastoAmp = 1.2;
    prof.hardness   = 0.85;
    prof.toothAmp   = 0.07;
  }
  return prof;
}
`;

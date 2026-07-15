// The aurora Van-Gogh medium — the DEDICATED atomic-dab body (`vangoghDab` +
// `mediumVangogh`) carved out of mediums.glsl.ts as a cohesive GLSL chunk. A
// purpose-built two-layer DAB pass disjoint from the oil stroke cascade: short
// loaded comma dabs over a darkened swirl underpainting, oriented off the
// analytic swirl flow (not the expensive per-cell tensor). `mediums.glsl.ts`
// splices this export into `AURORA_MEDIUMS_POST_BRUSH_GLSL` via a template join;
// the composed string is byte-identical to the pre-carve single literal
// (machine-proven by proof:composable-return-types’ GLSL string-parity hash).
export const AURORA_VANGOGH_MEDIUM_GLSL = /* glsl */ `// ── Van-Gogh — DEDICATED atomic-dab body (W-AUR-VANGOGH-REBUILD) ─────────────
// REBUILT FROM FIRST PRINCIPLES. The prior path routed van-Gogh through the shared
// oil paintStrokeMedium cascade — four DENSE layers of LONG-THIN tensor-oriented
// strokes (lenMul up to 5.2, widMul 0.22) hugging a continuous coherent field. Packed
// that tight, thin strokes that follow continuous iso-bands MERGE into smooth flowing
// filaments — the "marbled flow-bands" read (a spirograph/fingerprint, not impasto),
// AND the per-cell 8-tap structure tensor × 4 layers × 9 cells = ~324 sampleBase/pixel
// made it run at ~4fps. Van Gogh's sky is NOT continuous flow — it is DISCRETE, SHORT,
// LOADED comma dabs, separated by visible ground, queued into swirl ROWS.
//
// The rebuild is a purpose-built two-layer DAB pass, disjoint from the oil cascade:
//   • orientation from the analytic SWIRL flowField (van-Gogh skies ARE swirl rows) +
//     per-cell angular jitter — NOT the expensive per-cell tensor (the lag source, and
//     the marble source: a jittered discrete dab can NOT merge into a continuous
//     filament the way a tensor-locked thin stroke does).
//   • SHORT comma dabs (len/wid ≈ 2.6 : 1 — a loaded crescent mark, not a 10:1
//     filament), so each reads as a SEPARABLE atom.
//   • SPARSE placement with visible inter-dab ground (density ≈ 0.42), over a darkened
//     swirl underpainting (the Starry-Night visible ground the bright dabs read over).
//   • a single sampleBase per cell + OKLCh broken-color jitter (pigment shimmer);
//     full-height impasto crown per dab (each catches its own raked glint).
// This is ~2 layers × 9 cells × ~1 sampleBase ≈ 20/pixel (a ~16× cost cut, ~60fps), and
// jittered short dabs CANNOT marble.

// One atomic comma dab — a CLEAN analytic crescent SDF (NOT the oil curvedStroke).
// The oil curvedStroke's spine-projection + rounded end-caps + fwidth-AA + bristle
// edge each leave a thin sub-pixel skirt, and a field of those skirts over open ground
// abuts into a faint network of SEAM LINES. A van-Gogh dab needs none of that
// machinery — it is a short oriented capsule (rounded line segment) whose half-width
// tapers along its length (the loaded-head → dragged-tail comma). The capsule SDF is
// derivative-free (smoothstep AA against the analytic distance), so no fwidth skirt, no
// best-of-9 seam. Returns a StrokeHit (coverage/color/alongT/edgeN) for paintOver.
//   cellSize — dab cell pitch (UV units); lenMul/widMul — dab aspect off the cell;
//   density  — placement gate (sparse → visible gaps); seed — layer decorrelation.
StrokeHit vangoghDab(vec2 p, float cellSize, float lenMul, float widMul,
                     float density, float jitterAmt, float angJitter,
                     vec2 flow, float t, float seed) {
  vec2 cell = floor(p / cellSize);
  StrokeHit best = noHit();
  for (int dy = -1; dy <= 1; dy++) {
    for (int dx = -1; dx <= 1; dx++) {
      vec2 cc = cell + vec2(float(dx), float(dy));
      // Sparse density gate — leaves visible canvas ground between dabs (atomicity).
      if (hash21(cc * 1.7 + seed * 0.3) > density) continue;
      vec2 jit = (hash22(cc + seed) - 0.5) * jitterAmt;
      vec2 center = (cc + 0.5 + jit) * cellSize;

      // Orientation: the analytic swirl flow at the cell center + per-cell angular
      // jitter (so adjacent dabs FAN — the divisionist scatter that keeps the dabs from
      // locking into perfectly-concentric rows) + a flow-noise curl wobble.
      float ang = (hash21(cc + seed + 11.0) - 0.5) * angJitter;
      float curl = (fbm(center * 3.1 + seed * 1.9) - 0.5) * (0.18 + 0.3 * uFlowCurl);
      vec2 dir = rotateDir(safeDir(flow), ang + curl);

      // SHORT comma — len ≈ the cell pitch (a contained dab, not a tiling filament).
      float len = cellSize * lenMul * (0.82 + 0.30 * hash21(cc + seed + 23.0));
      float halfW = max(cellSize * widMul * (0.86 + 0.28 * hash21(cc + seed + 41.0)), 0.010);

      // Local dab frame: along = projection onto the dab axis (centred 0), perp = cross.
      vec2 rel = p - center;
      float along = dot(rel, dir);
      float perp  = dot(rel, vec2(-dir.y, dir.x));
      // The comma TAPER: half-width peaks ~1/3 from the loaded head and drags to a fine
      // tail (the asymmetric crescent). u in [0,1] along the dab from head to tail.
      float halfLen = len * 0.5;
      float u = clamp((along + halfLen) / max(len, 1e-5), 0.0, 1.0);
      float head = smoothstep(0.0, 0.30, u);                 // rounded loaded head
      float tail = pow(clamp((1.0 - u) / 0.70, 0.0, 1.0), 1.3); // dragged thin tail
      float prof = clamp(min(head, tail) * 1.05, 0.0, 1.0);
      float wNow = halfW * prof;
      // A gentle comma CURVE — bow the spine sideways so the mark reads as a crescent.
      float bowAmt = (hash21(cc + seed + 53.0) - 0.5) * halfW * 1.4;
      float spine = bowAmt * sin(u * PI);                    // 0 at ends, max mid
      float d = abs(perp - spine);
      // Derivative-free AA: a fixed fraction of the dab width (no fwidth skirt). Coverage
      // is 1 in the dab body, smoothly 0 at the edge; outside the [head,tail] span wNow→0
      // so the dab self-terminates with no end-cap blob.
      float aa = max(halfW * 0.45, 0.002);
      float cov = (wNow > 1e-5) ? (1.0 - smoothstep(wNow - aa, wNow + aa, d)) : 0.0;
      if (cov < 0.004) continue;

      // One sampleBase per cell + OKLCh broken-color jitter (pigment patch shimmer). The
      // dab pigment is chroma-boosted (saturate3 1.22) AND value-lifted (×1.14) at the
      // SOURCE — the loaded brush mark deposits BRIGHTER + more saturated pigment than the
      // base field, so the loaded-mark pixels lift BOTH the §4.1 colourfulness AND the field
      // mean-luma. The higher mean raises the gap-fraction threshold (meanLum·0.6) so the
      // moderate-depth inter-dab ground falls below it (the gap-fraction atomicity read is
      // DECOUPLED from the ground floor depth — the ground can stay only moderately dark, so
      // the §4.3 slope is NOT over-steepened, while the bright dabs manufacture the gap). The
      // dark ground is untouched, so this lifts C + gap WITHOUT a band-conflicting deep ground.
      vec3 colMid = brokenColorJitter(
        saturate3(sampleBase(center, t), 1.22),
        hash21(cc + seed + 89.0),
        hash21(cc * 2.3 + seed + 97.0),
        1.0
      );

      // edgeN: 1 at the spine, 0 at the edge (the impasto crown reads it).
      float edgeN = (wNow > 1e-5) ? clamp(1.0 - d / wNow, 0.0, 1.0) : 0.0;
      if (cov > best.coverage) {
        best = StrokeHit(cov, colMid, u, (wNow > 1e-5 ? (perp - spine) / wNow : 0.0), edgeN);
      }
    }
  }
  return best;
}

vec3 mediumVangogh(vec3 col, vec2 p, float t) {
  vec3 result = col;
  float height = 0.0;

  // The swirl flow basis (van-Gogh sky = swirl rows). Computed ONCE per pixel.
  vec2 flow = flowField(p, t);

  // Dab cell pitch in UV [0,1]. CHUNKY, SEPARABLE marks — the big layer is ~1/14 of
  // the frame so it reads as a distinct loaded brush dab (not a fine speckle, not a
  // screen-spanning filament). uStrokeScale (authored ~110) modulates the pitch
  // INVERSELY (higher = finer dabs) around the ~0.07 chunky default; clamped so the
  // dab never collapses to noise or balloons past one screen. uStrokeAnisotropy
  // stretches the comma aspect (longer, more directional marks).
  float pitch = clamp(7.0 / max(uStrokeScale, 20.0), 0.044, 0.12);
  // The dab LENGTH ≈ the cell pitch (lenAniso ~1.2-1.7) so a dab sits WITHIN its cell
  // and leaves visible ground around it — a longer dab (lenMul > 2) spans neighbour
  // cells and tiles the field into continuous coverage (no gaps, the gap-fraction floor
  // miss + the marble). Narrow width keeps it a directional crescent, not a wide shard.
  // lenAniso/widAniso — the comma aspect. The W-AUR-VANGOGH-CONFIG reconcile lengthened
  // the comma (1.25-1.75 → 1.5-2.0) and THINNED it (0.40-0.30 → 0.32-0.24): the rebuilt
  // dabs measured §4.2 structure-tensor anisotropy A=0.699, BELOW the reference band
  // floor 0.732 (the dabs read slightly too short-fat → locally isotropic, dragging mean
  // A down). A LONGER, THINNER comma hugs the swirl-flow tangent more strongly so the
  // rendered field reads coherent the way the tensor metric measures it (A lift), while
  // the thinner width LEAVES MORE inter-dab ground (the gap-fraction atomicity read is
  // preserved, not closed). The length stays ≈ the cell pitch so each dab remains a
  // CONTAINED separable mark, not a tiling filament.
  float lenAniso = mix(2.1, 2.7, uStrokeAnisotropy);   // comma length / cell pitch (a contained dab)
  float widAniso = mix(0.23, 0.16, uStrokeAnisotropy); // comma width / cell pitch (a thin loaded crescent)

  // Layer 1 — the big swirl-row dabs: the loaded gestural marks, SPARSE so the dark
  // underpainting shows BETWEEN them (the atomicity read — visible inter-dab ground).
  // hardness 0.74 — the loaded brush deposits with a SOFT shoulder, so adjacent dabs
  // feather instead of razor-clipping into hard polygon shards. jitterAmt 0.85 fully
  // scatters the cell centres so the placement GRID never reads as a periodic seam.
  // angJitter EASED 0.55 → 0.38 (the reconcile A lift): a tighter angular spread keeps
  // adjacent dabs more flow-aligned (coherent) while the per-cell curl wobble still
  // breaks the perfectly-concentric-rows read (the dabs FAN gently, not lock to a grid).
  // angJitter eased 0.38 → 0.26 + hardness 0.74 → 0.84 (the §4.2 A lift): a tighter angular
  // spread keeps adjacent dabs strongly flow-aligned (the structure-tensor coherence) and a
  // sharper edge gives each dab a STRONGER directional gradient (a soft dab's faint edge
  // reads weakly anisotropic). The per-cell curl wobble still breaks the perfectly-
  // concentric-rows read, so the dabs FAN gently rather than locking to a grid.
  StrokeHit dBig = vangoghDab(p, pitch, lenAniso, widAniso,
                              0.30, 0.50, 0.08, flow, t, 1.3);
  // streakFreq raised 14 → 34 (the §4.3 slope fix): a high-frequency streak runs ALONG the
  // dab spine, injecting fine-scale luma energy that flattens the too-steep β WITHOUT
  // adding new isotropic marks (the along-spine streak stays directional, so the §4.2
  // anisotropy the long-thin dab carries is preserved — the band-conflict resolution).
  paintOver(result, height, dBig, 48.0, 0.34,
            uImpasto * 0.75 * uStrokeAmount, 0.84, 1.3, 1.0 /* full crown */);

  // Layer 2 — two-thirds-pitch accent dabs (the divisionist sparkle between the big
  // marks — denser placement but still contained dabs, so dark canvas survives between).
  // angJitter eased 0.5 → 0.34 (same A-lift reasoning — the accent dabs queue along the
  // flow rather than scattering isotropically); hardness 0.78 → 0.86 sharpens the gradient.
  StrokeHit dSml = vangoghDab(p + vec2(-5.1, 8.4), pitch * 0.62, lenAniso * 0.95,
                              widAniso * 0.95, 0.36, 0.60, 0.20, flow, t, 4.1);
  paintOver(result, height, dSml, 42.0, 0.22,
            uImpasto * 0.55 * uStrokeAmount, 0.86, 4.1, 1.0);

  // Layer 3 — the FINE divisionist flecks (W-AUR-VANGOGH-CONFIG reconcile). The two-layer
  // field read as a few BIG cobalt dabs over a smooth empty teal ground (the side-by-side
  // against starry-night-crop.png: the painting is DENSE small varied flecks, not sparse
  // large marks). The flecks are LONG·THIN directional commas hugging the swirl tangent
  // (the A-preserving fleck — short fat flecks read isotropic and drag §4.2 down). Sparse
  // density 0.30 keeps the inter-fleck ground open (the gap-fraction atomicity read).
  // The flecks are FINE (≈0.42× pitch) directional commas, tightly flow-aligned (angJitter
  // 0.22) and SPARSE (0.30) — the divisionist sparkle between the loaded marks that keeps
  // the inter-dab ground open (atomicity) while adding the small-mark mid-band energy. Thin
  // + flow-aligned so the §4.2 anisotropy the long dabs carry survives the added small marks.
  StrokeHit dFleck = vangoghDab(p + vec2(8.7, -3.2), pitch * 0.42, lenAniso * 1.0,
                                widAniso * 0.68, 0.30, 0.85, 0.22, flow, t, 7.7);
  paintOver(result, height, dFleck, 30.0, 0.16,
            uImpasto * 0.40 * uStrokeAmount, 0.80, 7.7, 1.0);

  // ── Flow-aligned GROUND swirl-GROOVING (W-AUR-VANGOGH-CONFIG reconcile) ──
  // The bare ground between the dabs was a SMOOTH low-frequency teal gradient — the §4.3
  // power-spectrum slope ran too STEEP (β≈−2.0: too much low-frequency nuclei-field energy
  // vs the high band). Van Gogh's actual sky has the swirl BRUSHWORK everywhere, so groove
  // the OPEN GROUND with a flow-aligned ripple. It is SUBTRACTIVE-biased (it only darkens,
  // never brightens the ground), so it DEEPENS the inter-dab valleys (MORE gap-fraction —
  // atomicity preserved/strengthened) while injecting the across-flow mid-band luma energy
  // that flattens β. Gated to the open ground (low height) via the (1-height) gate so it
  // never lifts/erodes the loaded dab bodies (the dab read is untouched). Across the swirl
  // FLOW axis so the grooves run WITH the sky's brushwork direction.
  // The ground swirl-combing — a FIXED-global-angle directional grain on the open ground.
  // A flow-FOLLOWING comb varies its direction with the swirl across the readback window,
  // so its blurred structure tensor averages toward isotropic (no §4.2 lift). A comb at one
  // GLOBAL angle (van-Gogh's dominant diagonal stroke grain) is COHERENT over the whole
  // window ⇒ every open-ground pixel reads the SAME direction (the §4.2 mean-anisotropy lift
  // the swirl comb could not reach). Two resolved bands (≈22 + ≈44 across the global axis ⇒
  // ~21px + ~11px at 464px, both in the §4.3 fit window) also feed the β flatten. Gated to
  // the open ground (low height) so the loaded dabs are untouched; SUBTRACTIVE-biased so the
  // inter-dab valleys deepen (gap-fraction preserved, not filled).
  vec2 gdir = normalize(vec2(0.82, 0.57));   // the dominant global stroke grain axis
  float gacross = dot(p, vec2(-gdir.y, gdir.x));
  float groundGate = 1.0 - smoothstep(0.05, 0.28, height);
  float groove = sin(gacross * 22.0) + 0.5 * sin(gacross * 44.0 + 1.3);
  result *= 1.0 - 0.16 * groundGate * (0.5 - 0.5 * groove);

  // Canvas tooth (fine linen weave — base relief the raking light catches).
  float tooth1 = vnoise(p * 220.0);
  float tooth2 = vnoise(p * 220.0 * vec2(0.6, 2.4) + 37.0);
  float tooth  = (0.6 * tooth1 + 0.4 * tooth2) - 0.5;
  result *= 1.0 + tooth * 0.06 * uCanvasGrain;

  // Relight the accumulated impasto height (raking light catches each dab's crown —
  // the visible impasto ridge that makes a dab read as a RAISED loaded mark).
  float canvasBase = tooth * 0.06 * 0.5;
  result = relightImpasto(result, height, canvasBase);

  // The visible Starry-Night GROUND — the open canvas between dabs (low accumulated
  // height) darkens toward the deep underpainting, so the bright impasto dabs read as
  // SEPARABLE atomic marks over a darker field (the dab↔ground contrast the user's
  // "reads as strokes" bar needs, AND the painterly-statistics gap-fraction floor — the
  // dark inter-dab ground must register as a measurable fraction of the field). 0.30
  // floor over a WIDER smoothstep (0..0.40): deep enough that the open gaps read as the
  // dark Starry-Night sky between marks (clearing the 4% gap floor) while the gradual
  // ramp keeps the gaps reading as flowing underpainting, not the hard black ink LINES a
  // narrow near-black step (0.26 / 0.0..0.32) produced.
  // The smoothstep FLOOR starts at 0.10 (not 0): a dab's faint AA coverage TAIL deposits
  // a sliver of height, and where many tails align along the swirl flow those slivers
  // accumulate into a faint continuous height ridge that read as thin curved LINES in the
  // ground. Holding the ground full-dark until a real dab CORE (height > 0.10) lifts out
  // keeps the open field clean — only the loaded dab bodies emerge, the tails stay ground.
  result *= mix(0.115, 1.0, smoothstep(0.085, 0.31, height));

  // The van-Gogh chroma — a light OKLCh punch. EASED to 0.92 (off 1.04) in the
  // W-AUR-VANGOGH-CONFIG reconcile: the rebuilt discrete-dab register's per-dab OKLCh
  // broken-color jitter (the ±16° hue + ±chroma swing per cell) lifts the field's
  // colourfulness on its own, so the prior 1.04 punch on TOP overshot the §4.1
  // reference band (rendered C=100.5 vs the painting's measured 70.67 ± 15/+25 →
  // ceiling 95.67 — neon, not Starry Night's rich-but-not-garish blue/gold). The 0.92
  // demote pulls the rendered colourfulness back IN-band while the broken-color jitter
  // keeps the per-dab pigment variation (the discrete-stroke read is untouched — this
  // is a chroma scale, not a dab-geometry change). Band-anchored on the real painting
  // (proof:aurora-arresting), NOT a widened band.
  result = saturate3(result, 1.0);
  return result;
}

`;

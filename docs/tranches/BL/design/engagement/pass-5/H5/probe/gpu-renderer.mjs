// H5 probe (not a witness): does a headless-shell Chromium launched with GPU arguments rasterise WebGL2 on the
// hardware (ANGLE over Metal), or does it fall back to SwiftShader as the default launch does? CK-19's ambient cell
// (the Aurora) resolves its "css" substrate under the software-raster guard (constants/renderMode.ts), so only a
// hardware renderer could grade it in Chromium. One browser per launch arm, one page, closed in finally.
//   node gpu-renderer.mjs
// GPU launch arguments are admitted only for a witness that names them (the 2026-10-16 machine law): this probe names
// them so the H5 report can rule whether the ambient cell gets a GPU-backed Chromium witness.
import os from "node:os";
const pw = (await import("/Users/mkbabb/Programming/glass-ui/node_modules/playwright/index.mjs")).default;
const load = () => os.loadavg().map((x) => x.toFixed(1)).join("/");
const ARMS = {
  default: [],
  "angle-metal": ["--use-angle=metal", "--enable-gpu", "--ignore-gpu-blocklist"],
  "angle-metal-gl": ["--use-gl=angle", "--use-angle=metal", "--enable-gpu", "--ignore-gpu-blocklist", "--enable-unsafe-swiftshader=false"],
};
for (const [arm, args] of Object.entries(ARMS)) {
  const b = await pw.chromium.launch({ headless: true, args });
  try {
    const ctx = await b.newContext();
    try {
      const page = await ctx.newPage();
      await page.setContent("<canvas></canvas>");
      const r = await page.evaluate(() => {
        const gl = document.querySelector("canvas").getContext("webgl2");
        if (!gl) return { renderer: "no WebGL2 context" };
        const x = gl.getExtension("WEBGL_debug_renderer_info");
        return { renderer: String(x ? gl.getParameter(x.UNMASKED_RENDERER_WEBGL) : gl.getParameter(gl.RENDERER)), vendor: String(x ? gl.getParameter(x.UNMASKED_VENDOR_WEBGL) : gl.getParameter(gl.VENDOR)) };
      });
      console.log(`  REPORT gpu arm ${arm} [${args.join(" ")}] · chromium ${b.version()} · WebGL2 renderer "${r.renderer}" vendor "${r.vendor ?? "-"}" · software ${/swiftshader|llvmpipe|software/i.test(r.renderer)} · load ${load()}`);
    } finally { await ctx.close(); }
  } finally { await b.close(); }
}

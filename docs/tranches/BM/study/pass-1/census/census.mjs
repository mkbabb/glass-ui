// BM pass 1: census of glass-ui consumers at each site's current ref.
// Reads git objects only (git grep / git show on a ref); checks out nothing.
// Usage: node census.mjs > census.json
import { execFileSync } from "node:child_process";

const P = "/Users/mkbabb/Programming";
// One row per site: repo, ref, the path that holds the consuming app.
const SITES = [
  { site: "atlas (library)", repo: `${P}/atlas`, ref: "u/build-atlas-rc", path: "src" },
  { site: "atlas (sci dashboards)", repo: `${P}/sci-report`, ref: "u/v19-sci", path: "dashboards" },
  { site: "value.js", repo: `${P}/value.js`, ref: "c45", path: "." },
  { site: "daraksha", repo: `${P}/daraksha`, ref: "b11-occasion", path: "." },
  { site: "fourier", repo: `${P}/fourier-analysis`, ref: "f45", path: "web" },
  { site: "keyframes", repo: `${P}/keyframes.js`, ref: "kf45", path: "." },
  { site: "gaggle", repo: `${P}/gaggle-site`, ref: "site-redesign", path: "dashboard" },
  { site: "Home Assistant", repo: `${P}/hassio-config`, ref: "master", path: "frontend" },
];

// Candidate deletions, adaptations and hosts. `re` is a git-grep ERE over source files.
const CANDIDATES = [
  // removals named by UNION §2
  ["run mark length writes", "dock-run-mark"],
  ["segmented indicator width/height glide", "tab-indicator-duration|segmented-indicator"],
  ["capsule blur inside track blur", "glass-capsule"],
  ["CommandDialog plate in plate", "CommandDialog"],
  ["grasp carriers", "glass-grasp|grasp-carrier|data-grasp"],
  ["focus veil", "focus-veil"],
  ["specular catch-light", "glass-specular|specular-track"],
  ["luminance clamp", "useGlassBackdropLuminance|backgroundCanvas|background-canvas"],
  ["slider loupe", "glass-loupe|[^a-zA-Z-]loupe([^a-zA-Z-]|$)"],
  ["useLiquidReveal", "useLiquidReveal"],
  ["useDockCtaReceive", "useDockCtaReceive"],
  ["useDragVelocity / per-frame velocity customs", "useDragVelocity|--flex-vel|--atom-drag-v"],
  ["useSpringMount", "useSpringMount"],
  ["scroll-chrome (M8, its reduced-motion snap)", "useScrollChrome|scroll-chrome"],
  ["press squish (useLiquidPress/useLiquidFlex)", "useLiquidPress|useLiquidFlex"],
  ["useDragMorph", "useDragMorph"],
  ["useElementMorph", "useElementMorph"],
  ["useSelectionIndicator", "useSelectionIndicator"],
  ["presence hold keyframe", "glass-reveal-hold"],
  // hosts of the one mark and of buds
  ["SegmentedTabs", "SegmentedTabs"],
  ["SegmentedTabs draggable", "SegmentedTabs[^>]*draggable|:draggable"],
  ["DockLayerGroup switcher", "DockLayerGroup"],
  ["GlassDock", "GlassDock"],
  ["ToggleGroup", "ToggleGroup"],
  ["Switch (glass)", "<Switch[ />]|\\bSwitch\\b.*from ['\"]@mkbabb/glass-ui"],
  ["Slider (glass)", "<Slider[ />]"],
  ["DropdownMenu", "DropdownMenu"],
  ["ContextMenu", "ContextMenu"],
  ["Select (glass)", "<Select[ />]|SelectContent"],
  ["Combobox", "Combobox"],
  ["Popover", "PopoverContent|<Popover[ />]"],
  ["HoverCard", "HoverCard"],
  ["Tooltip", "TooltipContent|<Tooltip[ />]"],
  ["Dialog", "DialogContent|<Dialog[ />]"],
  ["Sheet", "SheetContent|<Sheet[ />]"],
  ["Sheet detents", "v-model:detent|:detents|detents="],
  ["FadingScroll", "FadingScroll|fading-scroll"],
  ["ScrollProgressRim", "ScrollProgressRim|scroll-progress-rim"],
  ["--glass-level written", "--glass-level\\s*:"],
  ["prefers-reduced-transparency", "prefers-reduced-transparency"],
  ["Blob", "<Blob[ />]|from ['\"]@mkbabb/glass-ui/blob"],
];

const git = (repo, args) => {
  try { return execFileSync("git", ["-C", repo, ...args], { encoding: "utf8", maxBuffer: 64 << 20 }); }
  catch (e) { return e.stdout || ""; }
};
const SRC = [":(glob)**/*.vue", ":(glob)**/*.ts", ":(glob)**/*.tsx", ":(glob)**/*.js", ":(glob)**/*.mjs", ":(glob)**/*.css", ":(glob)**/*.html"];
const EXCL = [":(exclude,glob)**/docs/**", ":(exclude,glob)**/node_modules/**", ":(exclude,glob)**/dist/**", ":(exclude,glob)**/*.d.ts"];
const isTest = (f) => /(^|\/)(tests?|e2e|__tests__|spec|tests-visual)(\/|$)|\.(test|spec)\.[a-z]+$/.test(f);

const out = [];
for (const s of SITES) {
  const head = git(s.repo, ["rev-parse", "--short", s.ref]).trim();
  const scope = s.path === "." ? SRC : SRC.map((g) => g.replace(":(glob)", `:(glob)${s.path}/`));
  // 1. named imports from glass-ui, by subpath
  const files = git(s.repo, ["grep", "-l", "-E", "@mkbabb/glass-ui", s.ref, "--", ...scope, ...EXCL])
    .split("\n").filter(Boolean).map((l) => l.slice(s.ref.length + 1));
  const imports = {}; const subpaths = {}; const cssImports = new Set();
  for (const f of files) {
    if (isTest(f)) continue;
    const body = git(s.repo, ["show", `${s.ref}:${f}`]);
    for (const m of body.matchAll(/import\s+(?:type\s+)?(?:([A-Za-z_$][\w$]*)\s*,?\s*)?(?:\{([^}]*)\})?\s*from\s*["']@mkbabb\/glass-ui([^"']*)["']/g)) {
      const sub = m[3] || "(root)";
      (subpaths[sub] ||= new Set()).add(f);
      for (const raw of (m[2] || "").split(",")) {
        const name = raw.replace(/\btype\b/, "").split(/\s+as\s+/)[0].trim();
        if (name) (imports[name] ||= new Set()).add(f);
      }
    }
    for (const m of body.matchAll(/@import\s+["']@mkbabb\/glass-ui([^"']*)["']|import\s+["']@mkbabb\/glass-ui([^"']*\.css)["']/g)) cssImports.add((m[1] || m[2]) + `  (${f})`);
  }
  // 2. candidate patterns over source (test files counted apart)
  const cand = {};
  for (const [name, re] of CANDIDATES) {
    const hits = git(s.repo, ["grep", "-l", "-E", "-e", re, s.ref, "--", ...scope, ...EXCL])
      .split("\n").filter(Boolean).map((l) => l.slice(s.ref.length + 1));
    const src = hits.filter((f) => !isTest(f)); const tst = hits.filter(isTest);
    if (hits.length) cand[name] = { src: src.length, tests: tst.length, files: src.slice(0, 12) };
  }
  out.push({ ...s, head,
    imports: Object.fromEntries(Object.entries(imports).sort().map(([k, v]) => [k, v.size])),
    subpaths: Object.fromEntries(Object.entries(subpaths).sort().map(([k, v]) => [k, v.size])),
    cssImports: [...cssImports], candidates: cand });
}
console.log(JSON.stringify({ at: new Date().toISOString(), sites: out }, null, 1));

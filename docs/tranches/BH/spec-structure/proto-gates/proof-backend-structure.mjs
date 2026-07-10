#!/usr/bin/env node
// proof:backend-structure — the §5 backend transposition gate (BH spec, backend lane).
//
// Transposes the frontend structural law (§1 proportion, §6 G1/G3/G4) to the
// polyglot backend under §5.1 + §5.2. Device-free, self-testing. Detects a repo's
// language from its manifest and applies that language's befitting norms while the
// GRAMMAR (domain-vertical, infra-ring-is-legitimate, no grab-bags, shallow depth,
// unidirectional imports) is constellation-wide.
//
// Usage:
//   node proof-backend-structure.mjs <repo-root>   # audit a real backend
//   node proof-backend-structure.mjs --self-test   # run the self-test bites
//
// Exit 0 = no VIOLATIONS (warnings do not fail). Exit 1 = ≥1 violation or self-test miss.

import { readdirSync, readFileSync, statSync, existsSync } from "node:fs";
import { join, basename, relative, sep, extname } from "node:path";
import { execSync } from "node:child_process";

// ─────────────────────────────────────────────────────────────────────────────
// §5.2 per-language befitting norms + §5.1 grammar constants (the ONLY knobs).
// ─────────────────────────────────────────────────────────────────────────────
const LANG = {
  python: {
    ext: [".py"], hard: 500, soft: 300,
    manifest: "pyproject.toml", pkgMarker: "__init__.py",
    grabBag: /^(utils|helpers|common|misc|stuff|shared_utils)\.py$/,
    // §5.1: named-cohesive infra leaves are NOT grab-bags
    cohesiveLeaf: /^(config|logging|paths|timeouts|constants|errors|exceptions|types|settings|deps|dependencies)\.py$/,
    godFn: "ruff", // §5.2 C901/PLR0915 advisory
  },
  typescript: {
    ext: [".ts"], hard: 500, soft: 300,
    manifest: "package.json", pkgMarker: "index.ts",
    grabBag: /^(utils|helpers|common|misc|stuff)\.ts$/,
    cohesiveLeaf: /^(config|logging|errors|types|constants|client|db)\.ts$/,
    godFn: null,
  },
  rust: {
    ext: [".rs"], hard: 500, soft: 300,
    manifest: "Cargo.toml", pkgMarker: "mod.rs",
    grabBag: /^(utils|helpers|common|misc)\.rs$/,
    cohesiveLeaf: /^(config|error|errors|types|constants|prelude)\.rs$/,
    godFn: null,
  },
};

// §5.1 the infra-ring allowlist: thin CROSS-CUTTING dirs that legitimately run on
// EVERY domain — the backend twin of the FE `_shared/`/`api/client.ts`. These are
// NOT layer-by-type-of-domain-logic scatter.
const INFRA_RING = new Set([
  "middleware", "logging", "events", "core", "http", "config", "db", "cache",
  "caching", "transport", "infra", "internal", "shared", "common_infra",
  "telemetry", "observability", "auth_infra", "deps", "settings",
]);

// §5.1 the layer-by-type-of-domain-logic smell: an APP-GLOBAL dir named for a
// technical layer that scatters domains across type-folders (the vice). Any of
// these at the package top level, holding >1 domain's worth of files, is flagged
// UNLESS it is a thin infra ring (small, cohesive) — the gate distinguishes by
// counting DISTINCT domain stems inside.
const LAYER_TYPE_DIRS = new Set([
  "controllers", "services", "models", "repositories", "repos", "routes",
  "routers", "handlers", "schemas", "serializers", "dto", "dtos", "views",
  "validation", "validators", "managers",
]);

const IGNORE_DIR = new Set([
  "node_modules", ".git", "__pycache__", ".venv", "venv", "target", "dist",
  "build", ".mypy_cache", ".ruff_cache", ".pytest_cache", ".uv-cache",
  ".benchmarks", "coverage", "logs", "data", "cache", "docs", "tests", "test",
  "scripts", "migrations", ".idea", ".vscode", "__tests__",
]);

// ─────────────────────────────────────────────────────────────────────────────
// Walkers
// ─────────────────────────────────────────────────────────────────────────────
function detectLang(root) {
  if (existsSync(join(root, "pyproject.toml"))) return "python";
  if (existsSync(join(root, "Cargo.toml"))) return "rust";
  if (existsSync(join(root, "package.json"))) return "typescript";
  return null;
}

function* walkFiles(dir, exts) {
  let ents;
  try { ents = readdirSync(dir, { withFileTypes: true }); } catch { return; }
  for (const e of ents) {
    if (e.name.startsWith(".") && e.name !== ".") continue;
    const p = join(dir, e.name);
    if (e.isDirectory()) {
      if (IGNORE_DIR.has(e.name)) continue;
      yield* walkFiles(p, exts);
    } else if (exts.includes(extname(e.name))) {
      yield p;
    }
  }
}

function* walkDirs(dir) {
  let ents;
  try { ents = readdirSync(dir, { withFileTypes: true }); } catch { return; }
  for (const e of ents) {
    if (!e.isDirectory() || e.name.startsWith(".") || IGNORE_DIR.has(e.name)) continue;
    const p = join(dir, e.name);
    yield p;
    yield* walkDirs(p);
  }
}

function rawLines(file) {
  try { return readFileSync(file, "utf8").split("\n").length; } catch { return 0; }
}

// The source root: the deepest single dir under root that holds the package (src/,
// or the manifest dir itself). Keeps the audit off the repo chrome.
function sourceRoot(root, lang) {
  const cfg = LANG[lang];
  // python: src/<pkg>/ or the pkg dir with __init__.py
  const candidates = ["src", "app", "server/src", "lib", "backend/src"];
  for (const c of candidates) {
    const p = join(root, c);
    if (existsSync(p) && statSync(p).isDirectory()) {
      // Descend into src/<pkg>/ ONLY when src/ is a BARE CONTAINER (no package marker
      // of its own) holding exactly one package dir — the floridify `src/floridify/`
      // case. If src/ ITSELF carries the marker (src/__init__.py), src/ IS the package
      // root and descending would skip its root files (the dns-speedtest false-GREEN bug).
      const srcIsPkg = existsSync(join(p, cfg.pkgMarker));
      const inner = readdirSync(p, { withFileTypes: true })
        .filter((e) => e.isDirectory() && !e.name.startsWith(".") && !IGNORE_DIR.has(e.name));
      const rootFiles = readdirSync(p, { withFileTypes: true })
        .filter((e) => e.isFile() && cfg.ext.includes(extname(e.name)) && e.name !== cfg.pkgMarker);
      if (lang === "python" && !srcIsPkg && inner.length === 1 && rootFiles.length === 0 &&
          existsSync(join(p, inner[0].name, cfg.pkgMarker))) {
        return join(p, inner[0].name);
      }
      return p;
    }
  }
  return root;
}

// A "package root" = a dir carrying the language's package marker (Python
// __init__.py, Rust mod.rs, TS index.ts). Used for the depth budget (T2) and the
// domain-count logic.
function isPkgRoot(dir, lang) {
  return existsSync(join(dir, LANG[lang].pkgMarker));
}

// ─────────────────────────────────────────────────────────────────────────────
// The checks (each returns {violations:[], warnings:[]})
// ─────────────────────────────────────────────────────────────────────────────

// G-BE1: §1.3 T1 line ceiling — hard 500 raw (fail), soft ~300 (warn).
function checkLineCeiling(srcRoot, lang, rootForRel) {
  const cfg = LANG[lang];
  const V = [], W = [];
  for (const f of walkFiles(srcRoot, cfg.ext)) {
    const n = rawLines(f);
    const rel = relative(rootForRel, f);
    // §1.3 data-manifest / shader single-artifact carve
    const isManifest = /manifest|fixtures?|generated|\.gen\./i.test(basename(f));
    if (n > cfg.hard && !isManifest) {
      V.push(`[G-BE1 god-module] ${rel} — ${n} raw lines > ${cfg.hard} ceiling`);
    } else if (n > cfg.soft && n <= cfg.hard) {
      W.push(`[G-BE1 soft] ${rel} — ${n} lines > ${cfg.soft} soft target`);
    }
  }
  return { violations: V, warnings: W };
}

// G-BE2: §1.4 grab-bag — a single unrelated-accretion file (utils.py/helpers.go/
// common.ts). §5.1 exempts named-cohesive infra leaves. A utils/ DIR is an
// advisory warning (mixed-kind is not mechanically decidable — §1.4 B12b).
function checkGrabBag(srcRoot, lang, rootForRel) {
  const cfg = LANG[lang];
  const V = [], W = [];
  for (const f of walkFiles(srcRoot, cfg.ext)) {
    const b = basename(f);
    if (cfg.grabBag.test(b) && !cfg.cohesiveLeaf.test(b)) {
      V.push(`[G-BE2 grab-bag] ${relative(rootForRel, f)} — grab-bag filename accreting unrelated leaves`);
    }
  }
  for (const d of walkDirs(srcRoot)) {
    if (/^(utils|helpers|common|misc)$/.test(basename(d))) {
      // count non-cohesive members → advisory
      let members;
      try { members = readdirSync(d).filter((n) => cfg.ext.includes(extname(n)) && n !== cfg.pkgMarker); }
      catch { members = []; }
      const noncohesive = members.filter((n) => !cfg.cohesiveLeaf.test(n));
      if (noncohesive.length > 4) {
        W.push(`[G-BE2 utils-dir] ${relative(rootForRel, d)} — ${noncohesive.length} non-cohesive members; audit for mixed-kind scatter`);
      }
    }
  }
  return { violations: V, warnings: W };
}

// G-BE3: §5.1 layer-by-type of DOMAIN LOGIC — an APP-GLOBAL technical-layer dir
// scattering ≥2 distinct domains. The infra-ring carve exempts thin cross-cutting
// dirs. Decided by counting DISTINCT domain stems inside: a technical-layer dir
// holding many differently-named domain modules IS the scatter vice.
function checkLayerByType(srcRoot, lang, rootForRel) {
  const cfg = LANG[lang];
  const V = [], W = [];
  // only APP-GLOBAL grain: direct children of the source root
  let top;
  try { top = readdirSync(srcRoot, { withFileTypes: true }); } catch { return { violations: V, warnings: W }; }
  for (const e of top) {
    if (!e.isDirectory() || e.name.startsWith(".") || IGNORE_DIR.has(e.name)) continue;
    const name = e.name.toLowerCase();
    if (!LAYER_TYPE_DIRS.has(name)) continue;
    if (INFRA_RING.has(name)) continue; // e.g. a top-level `core/` infra dir
    const dir = join(srcRoot, e.name);
    // count distinct DOMAIN stems: files/subdirs named by resource, minus infra
    let members;
    try { members = readdirSync(dir, { withFileTypes: true }); } catch { members = []; }
    const domainStems = new Set();
    for (const m of members) {
      if (m.name.startsWith("_") || m.name.startsWith(".")) continue;
      const stem = m.name.replace(/\.(py|ts|rs)$/, "")
        .replace(/_(repository|repo|service|controller|router|handler|schema|model|validator|dto)$/i, "");
      if (cfg.cohesiveLeaf.test(m.name)) continue;
      if (INFRA_RING.has(stem.toLowerCase())) continue;
      if (["__init__", "index", "mod", "base", "registry"].includes(stem)) continue;
      domainStems.add(stem.toLowerCase());
    }
    if (domainStems.size >= 2) {
      V.push(`[G-BE3 layer-by-type] ${relative(rootForRel, dir)}/ — app-global technical-layer dir scattering ${domainStems.size} domains {${[...domainStems].slice(0, 6).join(", ")}${domainStems.size > 6 ? ", …" : ""}}; group vertically by domain (§5.1)`);
    }
  }
  return { violations: V, warnings: W };
}

// G-BE4: §1.3 T2 depth — a segment dir nested under a segment dir WITHOUT a package
// marker (recursion reset) is over-nesting; >5 dirs below nearest pkg root warns.
function checkDepth(srcRoot, lang, rootForRel) {
  const cfg = LANG[lang];
  const V = [], W = [];
  for (const d of walkDirs(srcRoot)) {
    // depth below nearest package root
    let depth = 0, cur = d, guard = 0;
    while (cur !== srcRoot && guard++ < 40) {
      const parent = join(cur, "..");
      if (isPkgRoot(cur, lang)) depth = 0; else depth++;
      if (isPkgRoot(cur, lang)) break;
      cur = parent;
    }
    const rel = relative(srcRoot, d);
    if (rel.split(sep).length > 5) {
      W.push(`[G-BE4 depth] ${relative(rootForRel, d)} — ${rel.split(sep).length} levels below source root; recorded rationale needed (§1.3 T2)`);
    }
  }
  return { violations: V, warnings: W };
}

// G-BE4b: §5.1 unidirectional import direction (the backend transposition of §6 G4).
// The infra ring (core/, shared/, middleware/) must NOT reach the APP EDGE (api/routes/
// routers/handlers). Advisory-strength: precise cross-language import resolution is itself
// a leaky seam, so a flagged edge is a WARNING pointing a human at the leak, not a hard fail.
const APP_EDGE = /(?:^|[\/.])(api|routes|routers|router|handlers|controllers|endpoints|views)(?:[\/.]|$)/;
const IMPORT_RE = {
  python: /^\s*(?:from\s+([.\w]+)\s+import|import\s+([.\w]+))/gm,
  typescript: /(?:from|import)\s+["']([^"']+)["']/g,
  rust: /^\s*use\s+([\w:]+)/gm,
};
function checkImportDirection(srcRoot, lang, rootForRel) {
  const cfg = LANG[lang];
  const W = [];
  const re = IMPORT_RE[lang];
  if (!re) return { violations: [], warnings: W };
  for (const f of walkFiles(srcRoot, cfg.ext)) {
    const rel = relative(srcRoot, f);
    const segs = rel.split(sep);
    // is this file inside the infra ring / shared home?
    const inRing = segs.some((s) => INFRA_RING.has(s.toLowerCase()));
    if (!inRing) continue;
    let src;
    try { src = readFileSync(f, "utf8"); } catch { continue; }
    let m;
    re.lastIndex = 0;
    while ((m = re.exec(src)) !== null) {
      const target = (m[1] || m[2] || "").replace(/::/g, "/").replace(/\./g, "/");
      // Only the LEADING resolved segment decides direction. A later segment named
      // `core` (e.g. `api.core.exceptions` — the api's OWN core submodule) must NOT
      // exclude the edge; a ring→ring import (`core/config`) is skipped by its leading
      // ring segment. This is the precision fix for the cross-language resolution seam.
      const segs = target.split("/").filter(Boolean);
      const ringLead = segs.length > 0 && INFRA_RING.has(segs[0].toLowerCase());
      if (APP_EDGE.test(target) && !ringLead) {
        W.push(`[G-BE4b import-dir] ${relative(rootForRel, f)} — infra-ring module reaches app edge '${(m[1] || m[2] || "").trim()}' (upward; §5.1 unidirectional shared→domain→app)`);
      }
    }
  }
  return { violations: [], warnings: W };
}

// G-BE5: §5.2 god-FUNCTION advisory — ruff C901/PLR0915 (Python only). Warnings.
function checkGodFunction(root, lang, rootForRel) {
  const W = [];
  if (LANG[lang].godFn !== "ruff") return { violations: [], warnings: W };
  let hasRuff = true;
  try { execSync("ruff --version", { stdio: "ignore" }); } catch { hasRuff = false; }
  if (!hasRuff) { W.push("[G-BE5] ruff absent — god-function advisory skipped"); return { violations: [], warnings: W }; }
  try {
    const out = execSync(
      `ruff check --select C901,PLR0915 --output-format concise "${root}" 2>/dev/null || true`,
      { encoding: "utf8", maxBuffer: 32 * 1024 * 1024 }
    );
    const lines = out.split("\n").filter((l) => /C901|PLR0915/.test(l));
    for (const l of lines.slice(0, 60)) W.push(`[G-BE5 god-fn] ${l.trim()}`);
    if (lines.length > 60) W.push(`[G-BE5 god-fn] … +${lines.length - 60} more`);
  } catch (e) {
    W.push(`[G-BE5] ruff run error: ${String(e).slice(0, 120)}`);
  }
  return { violations: [], warnings: W };
}

// ─────────────────────────────────────────────────────────────────────────────
// Runner
// ─────────────────────────────────────────────────────────────────────────────
function audit(root) {
  const lang = detectLang(root);
  if (!lang) return { lang: null, violations: [`[detect] no backend manifest at ${root}`], warnings: [] };
  const srcRoot = sourceRoot(root, lang);
  const all = { violations: [], warnings: [] };
  for (const check of [checkLineCeiling, checkGrabBag, checkLayerByType, checkDepth, checkImportDirection]) {
    const r = check(srcRoot, lang, root);
    all.violations.push(...r.violations); all.warnings.push(...r.warnings);
  }
  const gf = checkGodFunction(srcRoot, lang, root);
  all.warnings.push(...gf.warnings);
  return { lang, srcRoot, ...all };
}

// ─────────────────────────────────────────────────────────────────────────────
// Self-test bites (§6 discipline: the detector must not be hollow)
// ─────────────────────────────────────────────────────────────────────────────
import { mkdtempSync, mkdirSync, writeFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";

function selfTest() {
  const results = [];
  const t = mkdtempSync(join(tmpdir(), "be-gate-"));
  const mk = (rel, body = "x\n") => { const p = join(t, rel); mkdirSync(join(p, ".."), { recursive: true }); writeFileSync(p, body); };

  // fixture: a Python service with 5 planted smells + 2 legit shapes
  mk("pyproject.toml", "[project]\nname='fix'\n");
  mk("src/fix/__init__.py");
  // BITE 1: god-module (>500 raw)
  mk("src/fix/lookup/pipeline.py", "l\n".repeat(600));
  mk("src/fix/lookup/__init__.py");
  // BITE 2: grab-bag file
  mk("src/fix/utils.py");
  // BITE 3: layer-by-type app-global (models/ scattering 3 domains)
  mk("src/fix/models/__init__.py");
  mk("src/fix/models/dictionary.py");
  mk("src/fix/models/literature.py");
  mk("src/fix/models/user.py");
  // LEGIT 1: infra-ring core/ (must NOT flag as layer-by-type)
  mk("src/fix/core/__init__.py");
  mk("src/fix/core/config.py");
  mk("src/fix/core/logging.py");
  // LEGIT 2: cohesive infra leaf named config.py at root (must NOT grab-bag)
  mk("src/fix/config.py");
  // BITE 4: over-deep segment nest (>5 levels, no pkg marker)
  mk("src/fix/a/b/c/d/e/f/leaf.py");
  // LEGIT 3: a clean domain package (must produce zero violations of its own)
  mk("src/fix/search/__init__.py");
  mk("src/fix/search/engine.py", "l\n".repeat(120));
  // BITE 5: infra-ring core/ reaching the app edge (upward import) → import-dir warn
  mk("src/fix/core/orchestrate.py", "from ..api.routers import lookup\n");

  const r = audit(t);
  const vtext = r.violations.join("\n");
  const wtext = r.warnings.join("\n");

  const bites = [
    ["BITE1 god-module fires", /god-module.*pipeline\.py.*> 500/.test(vtext)],
    ["BITE2 grab-bag fires", /grab-bag.*utils\.py/.test(vtext)],
    ["BITE3 layer-by-type fires (models scatters 3)", /layer-by-type.*models/.test(vtext)],
    ["BITE4 depth warns", /G-BE4 depth/.test(wtext)],
    ["BITE5 import-dir warns (core→api upward)", /G-BE4b import-dir.*orchestrate\.py/.test(wtext)],
    ["LEGIT1 core/ NOT flagged layer-by-type", !/layer-by-type.*\bcore\b/.test(vtext)],
    ["LEGIT2 config.py NOT grab-bag", !/grab-bag.*config\.py/.test(vtext)],
    ["LEGIT3 clean search/ produces no false violation", !/search\/engine/.test(vtext)],
    ["anti-evasion: renamed grab-bag common.py fires", (() => {
        const t2 = mkdtempSync(join(tmpdir(), "be-gate2-"));
        mkdirSync(join(t2, "src/fix"), { recursive: true });
        writeFileSync(join(t2, "pyproject.toml"), "[project]\nname='x'\n");
        writeFileSync(join(t2, "src/fix/__init__.py"), "");
        writeFileSync(join(t2, "src/fix/common.py"), "x\n");
        const rr = audit(t2); rmSync(t2, { recursive: true, force: true });
        return /grab-bag.*common\.py/.test(rr.violations.join("\n"));
      })()],
  ];
  rmSync(t, { recursive: true, force: true });

  let pass = 0;
  for (const [name, ok] of bites) { results.push(`${ok ? "PASS" : "FAIL"}  ${name}`); if (ok) pass++; }
  return { pass, total: bites.length, results };
}

// ─────────────────────────────────────────────────────────────────────────────
// main
// ─────────────────────────────────────────────────────────────────────────────
const arg = process.argv[2];
if (arg === "--self-test") {
  const { pass, total, results } = selfTest();
  console.log("=== proof:backend-structure SELF-TEST ===");
  for (const r of results) console.log("  " + r);
  console.log(`\n${pass}/${total} bites passing`);
  process.exit(pass === total ? 0 : 1);
} else if (arg) {
  const r = audit(arg);
  console.log(`=== proof:backend-structure — ${arg}`);
  console.log(`    language: ${r.lang}   source-root: ${r.srcRoot ? relative(arg, r.srcRoot) || "." : "-"}`);
  console.log(`\n  VIOLATIONS (${r.violations.length}):`);
  for (const v of r.violations) console.log("    " + v);
  console.log(`\n  WARNINGS (${r.warnings.length}):`);
  for (const w of r.warnings) console.log("    " + w);
  console.log(`\n  → ${r.violations.length === 0 ? "GREEN" : "RED"} (${r.violations.length} violations, ${r.warnings.length} warnings)`);
  process.exit(r.violations.length === 0 ? 0 : 1);
} else {
  console.error("usage: proof-backend-structure.mjs <repo-root> | --self-test");
  process.exit(2);
}

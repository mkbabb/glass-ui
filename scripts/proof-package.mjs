import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import semver from "semver";
import { PUBLISHERS, resolveSibling } from "./constellation.mjs";
import { gateArtifactPath, writeGateArtifact } from "./gate-output.mjs";

const root = resolve(fileURLToPath(new URL("../", import.meta.url)));
// The keyframes.js sibling publisher — constellation owns its location + the
// present/absent policy. A dev machine has the local checkout; a clean CI
// runner does not, and resolves the published peer range via the registry.
const keyframesPublisher = PUBLISHERS.find((p) => p.id === "keyframes.js");
const keyframes = keyframesPublisher.dir;
const artifactPath = gateArtifactPath(
    "GLASS_UI_PACKAGE_ARTIFACT",
    "W1-package-proof",
);
const tmp = join(tmpdir(), `glass-ui-packed-fixture-${Date.now()}`);
const pkg = JSON.parse(
    execFileSync("node", ["-e", "console.log(JSON.stringify(require('./package.json')))"], {
        cwd: root,
        encoding: "utf8",
    }),
);

const startedAt = Date.now();
const steps = [];

function run(command, args, options = {}) {
    const stepStartedAt = Date.now();
    try {
        const output = execFileSync(command, args, {
            cwd: options.cwd ?? root,
            encoding: options.capture ? "utf8" : undefined,
            stdio: options.capture ? ["ignore", "pipe", "inherit"] : "inherit",
            env: {
                ...process.env,
                npm_config_audit: "false",
                npm_config_fund: "false",
            },
        });
        steps.push({
            command: [command, ...args].join(" "),
            cwd: options.cwd ?? root,
            status: "pass",
            durationMs: Date.now() - stepStartedAt,
        });
        return output;
    } catch (error) {
        steps.push({
            command: [command, ...args].join(" "),
            cwd: options.cwd ?? root,
            status: "fail",
            durationMs: Date.now() - stepStartedAt,
            exitCode: error.status ?? 1,
        });
        throw error;
    }
}

function dependencyVersion(name) {
    return (
        pkg.devDependencies?.[name] ??
        pkg.dependencies?.[name] ??
        pkg.peerDependencies?.[name] ??
        "latest"
    );
}

function writeArtifact(status, extra = {}) {
    // `generatedAt` + the live `durationMs` measurements are volatile: dropped
    // by default so the cache artefact is byte-stable (git stays clean); kept
    // only under GATE_SNAPSHOT=1 for a deliberate committed snapshot.
    writeGateArtifact(
        artifactPath,
        {
            generatedAt: new Date().toISOString(),
            status,
            package: pkg.name,
            version: pkg.version,
            durationMs: Date.now() - startedAt,
            steps,
            ...extra,
        },
        { volatile: ["durationMs", "steps"] },
    );
}

mkdirSync(tmp, { recursive: true });

// AU.W3 / BD — the keyframes peer-compatibility MATRIX axis. BD adopted the
// keyframes 5.x major (a clean break to `^5.0.0`, no `||^4` straddle — the
// `KeyframesScrollTimeline`/`KeyframesAnimation` ambient-collision renames moved
// the surface). CI-witness that the declared range accepts both the 5.x floor AND
// the current latest 5.x line — a silent drift (a re-narrow below the published
// latest) would orphan consumers with no error. semver-checked against the literal
// range; 4.x is deliberately NOT accepted (the clean-break major bump).
{
    const kfRange = pkg.peerDependencies?.["@mkbabb/keyframes.js"] ?? "";
    // BI (XR-9 lockstep): the kf peer floor is ^5.2.0 — every asks-roster subpath row
    // pairs it; the matrix asserts the floor + a forward minor stay accepted.
    const kfMatrix = ["5.2.0", "5.3.0"];
    const kfMisses = kfMatrix.filter((v) => !semver.satisfies(v, kfRange));
    if (kfMisses.length) {
        steps.push({ command: `peer-matrix @mkbabb/keyframes.js`, status: "fail" });
        writeArtifact("fail", { peerMatrixError: `keyframes peer range "${kfRange}" rejects supported version(s): ${kfMisses.join(", ")}` });
        console.error(`[proof:package] keyframes peer-matrix FAIL — range "${kfRange}" does not accept: ${kfMisses.join(", ")}`);
        process.exit(1);
    }
    steps.push({ command: `peer-matrix @mkbabb/keyframes.js [${kfMatrix.join(", ")}] ⊆ "${kfRange}"`, status: "pass" });
}

try {
    // A prior gate in the same `gates.mjs --run` sequence (profile:budget's
    // iter-build = `vite build` with NO emit-types) rebuilds the canonical dist
    // JS-only, leaving no `.d.ts`. This proof tsc-probes the packed TYPES, so it
    // needs a COMPLETE dist (JS + dts). Build when EITHER is missing — the gate
    // stays a pure function of source, independent of what a sibling gate left
    // in dist (inv-θ). `stdio:inherit` (run helper, non-capture) keeps this
    // build's output off the captured pack stdout below.
    if (
        !existsSync(resolve(root, "dist/glass-ui.js")) ||
        !existsSync(resolve(root, "dist/index.d.ts")) ||
        process.argv.includes("--build")
    ) {
        run("npm", ["run", "build"]);
    }

    // `--ignore-scripts`: do NOT run the `prepare` lifecycle during pack. The
    // dist is already complete above; letting `prepare` rebuild here would be
    // redundant AND leak the build's stdout into the `--json` capture (the
    // "vite v… building" contamination class — npm runs lifecycle output
    // through the same pipe). With scripts off the pack emits pure JSON.
    const packOutput = run(
        "npm",
        ["pack", "--json", "--ignore-scripts", "--pack-destination", tmp],
        { capture: true },
    );
    // Defensive: parse from the first `[` so any residual leading line (an npm
    // banner under some builds) cannot break the parse.
    const packResult = JSON.parse(packOutput.slice(packOutput.indexOf("[")))[0];
    const tarball = resolve(tmp, packResult.filename);

    writeFileSync(
        join(tmp, "package.json"),
        `${JSON.stringify(
            {
                private: true,
                type: "module",
                dependencies: {
                    "@mkbabb/glass-ui": `file:${tarball}`,
                    // Prefer the local sibling checkout when present (dev — tests the
                    // packed surface against the in-tree keyframes); fall back to the
                    // published peer range on a clean runner where no `../keyframes.js`
                    // exists (CI), exactly as the other peers resolve via the registry.
                    "@mkbabb/keyframes.js": resolveSibling(keyframesPublisher)
                        .present
                        ? `file:${keyframes}`
                        : dependencyVersion("@mkbabb/keyframes.js"),
                    "@vueuse/core": dependencyVersion("@vueuse/core"),
                    "class-variance-authority": dependencyVersion(
                        "class-variance-authority",
                    ),
                    clsx: dependencyVersion("clsx"),
                    "embla-carousel-vue": dependencyVersion("embla-carousel-vue"),
                    "lucide-vue-next": dependencyVersion("lucide-vue-next"),
                    "reka-ui": dependencyVersion("reka-ui"),
                    // P.W4 Lane C (Pε-4): `tailwind-merge` retired at v0.9.2;
                    // `cn()` ships its own deduplicator. The synthetic
                    // consumer manifest no longer declares it — the proof
                    // verifies consumers DON'T need `tailwind-merge` in their
                    // deps to consume glass-ui.
                    tailwindcss: dependencyVersion("tailwindcss"),
                    "vaul-vue": dependencyVersion("vaul-vue"),
                    vue: dependencyVersion("vue"),
                },
                devDependencies: {
                    typescript: dependencyVersion("typescript"),
                },
            },
            null,
            2,
        )}\n`,
    );
    writeFileSync(
        join(tmp, "tsconfig.json"),
        `${JSON.stringify(
            {
                compilerOptions: {
                    target: "ES2022",
                    module: "ESNext",
                    moduleResolution: "bundler",
                    strict: true,
                    skipLibCheck: true,
                    noEmit: true,
                    allowArbitraryExtensions: true,
                    types: [],
                },
                include: ["probe.ts", "global.d.ts"],
            },
            null,
            2,
        )}\n`,
    );
    writeFileSync(
        join(tmp, "global.d.ts"),
        "declare module '*.css';\ndeclare module '@mkbabb/glass-ui/styles';\n",
    );
    writeFileSync(
        join(tmp, "probe.ts"),
        `
// P.W4 Lane B inline-absorb (Pε-3 dependency): probe.ts updated to the
// L.W1 vueuse-FREE root-barrel shape (useGlobalDark reaches consumers
// via /dark; root no longer re-exports it). DockPopover was a stale
// reference (the symbol never existed on the dock barrel at HEAD); replaced
// with DockDropdownTrigger (canonical compound), so the probe verifies
// the actual published surface rather than a phantom.
import { Button, Card, Dialog, Tooltip, cn, useInterval } from "@mkbabb/glass-ui";
import { useGlobalDark } from "@mkbabb/glass-ui/dark";
import { chartHeights } from "@mkbabb/glass-ui/tokens";
import "@mkbabb/glass-ui/styles";
// BI.W-DOCK-FOLD — DockIconButton -> DockControl, DockDropdownTrigger -> DockTrigger
// (the two fold survivors; the retired names are DEFINITION-ABSENT, clean break).
import { GlassDock, DockControl, DockTrigger, DockLayerGroup } from "@mkbabb/glass-ui/dock";
import { FuzzySearch, useFuzzySearch } from "@mkbabb/glass-ui/search";
// AI.W5-delta — ProgressiveSidebar SFC retired (Path B per G-AI-D26); the
// /sidebar subpath now surfaces composables only. The probe verifies the
// composables continue to resolve through the subpath after the SFC retire.
import { buildTreeIndex, useTreeIndex } from "@mkbabb/glass-ui/sidebar";
import { DarkModeToggle } from "@mkbabb/glass-ui/controls";
// BI.W-DIALOG-PLACEMENT demoted ConfirmDialog to a consumer preset; the probe now
// samples the BI.W-SURFACE-EXTRACT bare plate through its new published subpath.
import { Surface } from "@mkbabb/glass-ui/surface";
import { InfiniteScroll, useInfiniteScroll } from "@mkbabb/glass-ui/infinite-scroll";
import { SegmentedTabs } from "@mkbabb/glass-ui/tabs";
import { TypewriterText, useTypewriter } from "@mkbabb/glass-ui/typewriter";
import { StackedIconGroup } from "@mkbabb/glass-ui/stacked-icons";
import { Aurora, useAurora } from "@mkbabb/glass-ui/aurora";
import { MetricBadge } from "@mkbabb/glass-ui/metric-badge";
import { StatusDot } from "@mkbabb/glass-ui/status-dot";
import { Pulse } from "@mkbabb/glass-ui/pulse";
import { PaperBackdrop } from "@mkbabb/glass-ui/paper-backdrop";
import { Chip } from "@mkbabb/glass-ui/chip";
import { SortableList } from "@mkbabb/glass-ui/sortable-list";
import { GlassTimeline } from "@mkbabb/glass-ui/timeline";
import { LabeledInput } from "@mkbabb/glass-ui/labeled-field";
import { ExpandableContainer } from "@mkbabb/glass-ui/expandable-container";
import { IconTooltip } from "@mkbabb/glass-ui/icon-tooltip";

const runtimeSymbols = [
  Button, Card, Dialog, Tooltip, cn, useGlobalDark, useInterval, chartHeights,
  GlassDock, DockControl, DockTrigger, DockLayerGroup, FuzzySearch, useFuzzySearch,
  buildTreeIndex, useTreeIndex, DarkModeToggle,
  Surface, InfiniteScroll, useInfiniteScroll, SegmentedTabs,
  TypewriterText, useTypewriter, StackedIconGroup,
  Aurora, useAurora, MetricBadge, StatusDot, Pulse, PaperBackdrop, Chip,
  SortableList, GlassTimeline, LabeledInput,
  ExpandableContainer, IconTooltip,
];

if (runtimeSymbols.length < 34) throw new Error("packed fixture did not load expected symbols");
`,
    );

    run("npm", ["install", "--ignore-scripts"], { cwd: tmp });
    run("npx", ["tsc", "-p", "tsconfig.json", "--noEmit"], { cwd: tmp });
    writeArtifact("pass", {
        tarball: packResult.filename,
        packedFiles: packResult.files?.length ?? null,
    });
    console.log(`Package proof passed: ${artifactPath}`);
} catch (error) {
    writeArtifact("fail", {
        error: error.message,
    });
    throw error;
} finally {
    rmSync(tmp, { recursive: true, force: true });
}

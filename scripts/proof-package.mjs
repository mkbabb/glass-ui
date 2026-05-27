import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(fileURLToPath(new URL("../", import.meta.url)));
const parent = resolve(root, "..");
const keyframes = resolve(parent, "keyframes.js");
const artifactPath = resolve(root, process.env.GLASS_UI_PACKAGE_ARTIFACT ?? "docs/tranches/F/audit/W1-package-proof.json");
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
    mkdirSync(dirname(artifactPath), { recursive: true });
    writeFileSync(
        artifactPath,
        `${JSON.stringify(
            {
                generatedAt: new Date().toISOString(),
                status,
                package: pkg.name,
                version: pkg.version,
                durationMs: Date.now() - startedAt,
                steps,
                ...extra,
            },
            null,
            2,
        )}\n`,
    );
}

mkdirSync(tmp, { recursive: true });

try {
    if (!existsSync(resolve(root, "dist/glass-ui.js")) || process.argv.includes("--build")) {
        run("npm", ["run", "build"]);
    }

    const packOutput = run("npm", ["pack", "--json", "--pack-destination", tmp], {
        capture: true,
    });
    const packResult = JSON.parse(packOutput)[0];
    const tarball = resolve(tmp, packResult.filename);

    writeFileSync(
        join(tmp, "package.json"),
        `${JSON.stringify(
            {
                private: true,
                type: "module",
                dependencies: {
                    "@mkbabb/glass-ui": `file:${tarball}`,
                    "@mkbabb/keyframes.js": `file:${keyframes}`,
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
import { GlassDock, DockIconButton, DockDropdownTrigger, DockLayerGroup } from "@mkbabb/glass-ui/dock";
import { FuzzySearch, useFuzzySearch } from "@mkbabb/glass-ui/search";
// AI.W5-delta — ProgressiveSidebar SFC retired (Path B per G-AI-D26); the
// /sidebar subpath now surfaces composables only. The probe verifies the
// composables continue to resolve through the subpath after the SFC retire.
import { buildTreeIndex, useTreeIndex } from "@mkbabb/glass-ui/sidebar";
import { DarkModeToggle } from "@mkbabb/glass-ui/controls";
import { ConfirmDialog } from "@mkbabb/glass-ui/confirm-dialog";
import { InfiniteScroll, useInfiniteScroll } from "@mkbabb/glass-ui/infinite-scroll";
import { UnderlineTabs, BouncyTabs, BouncyToggle } from "@mkbabb/glass-ui/tabs";
import { TypewriterText, useTypewriter } from "@mkbabb/glass-ui/typewriter";
import { StackedIconGroup } from "@mkbabb/glass-ui/stacked-icons";
import { GlassCarousel, GlassCarouselItem } from "@mkbabb/glass-ui/glass-carousel";
import { Aurora, useAurora } from "@mkbabb/glass-ui/aurora";
import { MetricBadge } from "@mkbabb/glass-ui/metric-badge";
import { StatusDot } from "@mkbabb/glass-ui/status-dot";
import { Pulse } from "@mkbabb/glass-ui/pulse";
import { PaperBackdrop } from "@mkbabb/glass-ui/paper-backdrop";
import { ToggleChip } from "@mkbabb/glass-ui/toggle-chip";
import { GlassPanel } from "@mkbabb/glass-ui/glass-panel";
import { SortableList } from "@mkbabb/glass-ui/sortable-list";
import { GlassTimeline } from "@mkbabb/glass-ui/timeline";
import { LabeledInput } from "@mkbabb/glass-ui/labeled-field";
import { ExpandableContainer } from "@mkbabb/glass-ui/expandable-container";
import { IconTooltip } from "@mkbabb/glass-ui/icon-tooltip";

const runtimeSymbols = [
  Button, Card, Dialog, Tooltip, cn, useGlobalDark, useInterval, chartHeights,
  GlassDock, DockIconButton, DockDropdownTrigger, DockLayerGroup, FuzzySearch, useFuzzySearch,
  buildTreeIndex, useTreeIndex, DarkModeToggle,
  ConfirmDialog, InfiniteScroll, useInfiniteScroll, UnderlineTabs, BouncyTabs, BouncyToggle,
  TypewriterText, useTypewriter, StackedIconGroup, GlassCarousel, GlassCarouselItem,
  Aurora, useAurora, MetricBadge, StatusDot, Pulse, PaperBackdrop, ToggleChip,
  GlassPanel, SortableList, GlassTimeline, LabeledInput,
  ExpandableContainer, IconTooltip,
];

if (runtimeSymbols.length < 40) throw new Error("packed fixture did not load expected symbols");
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

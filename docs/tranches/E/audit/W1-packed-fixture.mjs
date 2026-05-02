import { execFileSync } from "node:child_process";
import { mkdirSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(fileURLToPath(new URL("../../../..", import.meta.url)));
const keyframes = resolve(root, "../keyframes.js");
const tmp = join(tmpdir(), `glass-ui-packed-fixture-${Date.now()}`);

function run(command, args, options = {}) {
    execFileSync(command, args, {
        cwd: options.cwd ?? root,
        stdio: "inherit",
        env: { ...process.env, npm_config_audit: "false", npm_config_fund: "false" },
    });
}

mkdirSync(tmp, { recursive: true });

try {
    run("npm", ["pack", "--pack-destination", tmp]);
    const tarball = join(tmp, "mkbabb-glass-ui-0.3.0.tgz");

    writeFileSync(
        join(tmp, "package.json"),
        JSON.stringify(
            {
                private: true,
                type: "module",
                dependencies: {
                    "@mkbabb/glass-ui": `file:${tarball}`,
                    "@mkbabb/keyframes.js": `file:${keyframes}`,
                    "@vueuse/core": "^14.0.0",
                    "class-variance-authority": "^0.7.1",
                    clsx: "^2.1.1",
                    "embla-carousel-vue": "^8.6.0",
                    "lucide-vue-next": "^0.525.0",
                    "reka-ui": "^2.0.0",
                    "tailwind-merge": "^3.3.1",
                    tailwindcss: "^4.1.11",
                    "vaul-vue": "^0.2.0",
                    vue: "^3.5.18",
                },
                devDependencies: {
                    typescript: "^5.9.3",
                },
            },
            null,
            2,
        ),
    );
    writeFileSync(
        join(tmp, "tsconfig.json"),
        JSON.stringify(
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
        ),
    );
    writeFileSync(join(tmp, "global.d.ts"), "declare module '*.css';\n");
    writeFileSync(
        join(tmp, "probe.ts"),
        `
import { Button, Tooltip, cn, useGlobalDark, useInterval } from "@mkbabb/glass-ui";
import { chartHeights } from "@mkbabb/glass-ui/tokens";
import "@mkbabb/glass-ui/styles";
import { GlassDock, DockIconButton, DockPopover } from "@mkbabb/glass-ui/dock";
import { FuzzySearch, useFuzzySearch } from "@mkbabb/glass-ui/search";
import { ProgressiveSidebar, buildTreeIndex, useTreeIndex } from "@mkbabb/glass-ui/sidebar";
import { DarkModeToggle } from "@mkbabb/glass-ui/controls";
import { ConfirmDialog } from "@mkbabb/glass-ui/confirm-dialog";
import { InfiniteScroll, useInfiniteScroll } from "@mkbabb/glass-ui/infinite-scroll";
import { UnderlineTabs, BouncyToggle } from "@mkbabb/glass-ui/tabs";
import { TypewriterText, useTypewriter } from "@mkbabb/glass-ui/typewriter";
import { StackedIconGroup } from "@mkbabb/glass-ui/stacked-icons";
import { useWindowedStore, useVirtualSectionWindow } from "@mkbabb/glass-ui/virtual";
import { useOffsetPagination } from "@mkbabb/glass-ui/pagination";
import { GlassCarousel, GlassCarouselItem } from "@mkbabb/glass-ui/glass-carousel";
import { Aurora, useAurora } from "@mkbabb/glass-ui/aurora";
import { MetricBadge } from "@mkbabb/glass-ui/metric-badge";
import { StatusDot } from "@mkbabb/glass-ui/status-dot";
import { Pulse } from "@mkbabb/glass-ui/pulse";
import { PaperBackdrop } from "@mkbabb/glass-ui/paper-backdrop";
import { ToggleChip } from "@mkbabb/glass-ui/toggle-chip";
import { GlassPanel } from "@mkbabb/glass-ui/glass-panel";
import { MetaballCanvas } from "@mkbabb/glass-ui/metaballs";
import { SortableList } from "@mkbabb/glass-ui/sortable-list";
import { GlassTimeline } from "@mkbabb/glass-ui/timeline";
import { LabeledInput } from "@mkbabb/glass-ui/labeled-field";
import { ExpandableContainer } from "@mkbabb/glass-ui/expandable-container";
import { IconTooltip } from "@mkbabb/glass-ui/icon-tooltip";

const runtimeSymbols = [
  Button, Tooltip, cn, useGlobalDark, useInterval, chartHeights,
  GlassDock, DockIconButton, DockPopover, FuzzySearch, useFuzzySearch,
  ProgressiveSidebar, buildTreeIndex, useTreeIndex, DarkModeToggle,
  ConfirmDialog, InfiniteScroll, useInfiniteScroll, UnderlineTabs, BouncyToggle,
  TypewriterText, useTypewriter, StackedIconGroup, useWindowedStore,
  useVirtualSectionWindow, useOffsetPagination, GlassCarousel, GlassCarouselItem,
  Aurora, useAurora, MetricBadge, StatusDot, Pulse, PaperBackdrop, ToggleChip,
  GlassPanel, MetaballCanvas, SortableList, GlassTimeline, LabeledInput,
  ExpandableContainer, IconTooltip,
];

if (runtimeSymbols.length < 40) throw new Error("packed fixture did not load expected symbols");
`,
    );

    run("npm", ["install", "--ignore-scripts"], { cwd: tmp });
    run("npx", ["tsc", "-p", "tsconfig.json", "--noEmit"], { cwd: tmp });
} finally {
    rmSync(tmp, { recursive: true, force: true });
}

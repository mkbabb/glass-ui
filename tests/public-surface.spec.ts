import { describe, expect, it } from "vitest";
import { execFileSync } from "node:child_process";
import { existsSync, mkdtempSync, readFileSync, readdirSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { resolve } from "node:path";
import { pathToFileURL } from "node:url";
import * as Aurora from "@glass/components/aurora";
import * as BlobSurface from "@glass/components/blob";
// @ts-expect-error the component-internal renderer contract is not public
import type { UseMetaballRendererOptions } from "@glass/components/blob";
import * as CarouselSurface from "@glass/components/carousel";
import * as CardSurface from "@glass/components/card";
import * as CommandSurface from "@glass/components/command";
import * as Glass from "@glass/index";
import * as DarkModeToggleSurface from "@glass/components/dark-mode-toggle";
import * as Dark from "@glass/composables/dark";
import * as DataTableSurface from "@glass/components/data-table";
import * as DialogSurface from "@glass/components/dialog";
import * as Dock from "@glass/components/dock";
import * as DrawerSurface from "@glass/components/drawer";
import * as DropdownMenuSurface from "@glass/components/dropdown-menu";
import * as ExpandableContainerSurface from "@glass/components/expandable-container";
import * as Forms from "@glass/forms";
import * as HandMarkSurface from "@glass/components/handmark";
import * as InfiniteScrollSurface from "@glass/components/infinite-scroll";
import * as InstrumentChassisSurface from "@glass/components/instrument-chassis";
import * as Keyboard from "@glass/composables/keyboard";
import * as LabeledFieldSurface from "@glass/components/labeled-field";
import * as MetricSurface from "@glass/components/metric";
import * as Motion from "@glass/composables/motion";
import * as MotionCore from "@glass/composables/motion/core";
import * as PaperBackdropSurface from "@glass/components/paper-backdrop";
import * as PopoverSurface from "@glass/components/popover";
import * as ProgressSurface from "@glass/components/progress";
import * as Search from "@glass/components/search";
import * as SelectSurface from "@glass/components/select";
import * as Sidebar from "@glass/composables/sidebar";
import * as ScrollProgressRimSurface from "@glass/components/scroll-progress-rim";
import * as SortableListSurface from "@glass/components/sortable-list";
import * as StatusDotSurface from "@glass/components/status-dot";
import * as SurfacePackage from "@glass/components/surface";
import * as TabsSurface from "@glass/components/tabs";
import * as TimelineSurface from "@glass/components/timeline";
import * as ChipSurface from "@glass/components/chip";
import * as TypewriterSurface from "@glass/components/typewriter";

function runVerifierProbe(probe: string, ...args: string[]): string {
    return execFileSync(process.execPath, ["--input-type=module", "-e", probe, ...args], {
        cwd: process.cwd(),
        encoding: "utf8",
    });
}

const uiRuntimeExports = [
    "Accordion",
    "Alert",
    "Avatar",
    "Badge",
    "Button",
    "Card",
    "Checkbox",
    "Collapsible",
    "Command",
    "DataTable",
    "Dialog",
    "DropdownMenu",
    // HoverCard folded onto <Popover trigger="hover"> (clean break).
    "Label",
    // MultiSelect + the Combobox wrapper family retired: the reka Combobox
    // substrate is wrapped by the ONE Command family (clean break); any
    // anchored-input (field-mode) selection-list surfaces there.
    "NumberField",
    "Popover",
    "Progress",
    "RadioGroup",
    "Select",
    "Separator",
    // Sheet folded onto <DialogContent placement> (clean break).
    "Skeleton",
    "Slider",
    "Switch",
    "Table",
    // `ui/Tabs` (the reka wrapper family) LEFT the public root barrel
    // (the canonical panel-nav surface is now `<SegmentedTabs variant="underline">`
    // on `@mkbabb/glass-ui/tabs`; the reka substrate stays INTERNAL for the dock-rail
    // consumer only). The retirement is asserted in nonCoreRootRetirements below.
    "TagsInput",
    "Toast",
    "ToggleGroup",
    "Tooltip",
];

// Vueuse-bearing form primitives (Input, Textarea, Combobox*) and the
// Carousel family moved to the `/forms` + `/carousel` subpaths; the dark-mode
// + keyboard composables moved to `/dark` + `/keyboard`. Root barrel no
// longer re-exports any vueuse-bearing symbol (SCC trap closure).
//
// keyframes.js-bearing motion composables (`useScrollProgress`,
// `useAnimatedNumber`, `useRAFLoop`,
// `useIntersectionPause`, `installDarkModeSync`, `DAMPING`, `SNAP_THRESHOLD`)
// moved to `/motion`. Root barrel no longer reaches `@mkbabb/keyframes.js`
// statically.
const composableRuntimeExports = [
    "useTouchGate",
    "useTimer",
    "useInterval",
    // UseGlassRenderer/createGlassFilter/destroyGlassFilter
    // retired off the root barrel (the detection-cascade cluster; its binary
    // consumer GlassPanel retired at the prune, no second consumer).
    // UseClipboard composable promotion.
    // The stateless clipboard door is writeClipboard,
    // the honest primitive shared with useClipboard; the lossy copyToClipboard
    // boolean wrapper is cut, its boolean+callback sugar demoted to a consumer
    // preset (value.js adopts writeClipboard).
    "useClipboard",
    "writeClipboard",
];

const rootRuntimeExports = [
    ...uiRuntimeExports,
    ...composableRuntimeExports,
    "AURORA_CURSOR_RADIUS",
    "AccordionContent",
    "AccordionItem",
    "AccordionTrigger",
    "AlertDescription",
    "AlertTitle",
    "AvatarFallback",
    "AvatarImage",
    "BLOB_LEAD_K",
    "BLOB_STRETCH_GAIN",
    "BLOB_STRETCH_MAX",
    "CONFIGURATOR_SIZE_KEY",
    "CardAction",
    "CardContent",
    "CardDescription",
    "CardFooter",
    "CardHeader",
    "CardTitle",
    "CollapsibleContent",
    "CollapsibleTrigger",
    "CommandDialog",
    "CommandEmpty",
    "CommandGroup",
    "CommandInput",
    "CommandItem",
    "CommandList",
    "CommandSeparator",
    "CommandShortcut",
    "Configurator",
    "ConfiguratorLayer",
    "ConfiguratorRow",
    "DialogClose",
    "DialogContent",
    "DialogDescription",
    "DialogFooter",
    "DialogHeader",
    "DialogTitle",
    "DialogTrigger",
    "DropdownMenuCheckboxItem",
    "DropdownMenuContent",
    "DropdownMenuGroup",
    "DropdownMenuItem",
    "DropdownMenuLabel",
    "DropdownMenuRadioGroup",
    "DropdownMenuRadioItem",
    "DropdownMenuSeparator",
    "DropdownMenuShortcut",
    "DropdownMenuSub",
    "DropdownMenuSubContent",
    "DropdownMenuSubTrigger",
    "DropdownMenuTrigger",
    "FOURIER_BIAS_GAIN",
    "FOURIER_FOLLOW_LEAN",
    "NumberFieldContent",
    "NumberFieldDecrement",
    "NumberFieldIncrement",
    "NumberFieldInput",
    "PopoverContent",
    "PopoverTrigger",
    "RadioGroupItem",
    "SelectContent",
    "SelectGroup",
    "SelectItem",
    "SelectLabel",
    "SelectSeparator",
    "SelectTrigger",
    "SelectValue",
    "TableBody",
    "TableCaption",
    "TableCell",
    "TableEmpty",
    "TableHead",
    "TableHeader",
    "TableRow",
    "TagsInputInput",
    "TagsInputItem",
    "TagsInputItemDelete",
    "TagsInputItemText",
    "ToastAction",
    "ToastClose",
    "ToastDescription",
    "ToastTitle",
    "Toaster",
    "ToggleGroupItem",
    "TooltipContent",
    "TooltipProvider",
    "TooltipTrigger",
    "alertVariants",
    "auroraCursorMapping",
    "badgeVariants",
    "blobPullMapping",
    "cn",
    "constellationWellMapping",
    "createSpecularWriter",
    "createTokenColorCache",
    "fourierLeanMapping",
    "provideConfiguratorSize",
    "resolveCanvasColor",
    "resolveTokenColor",
    "snapshotField",
    "startViewTransition",
    "supportsScrollTimeline",
    "supportsViewTimeline",
    "supportsViewTransitions",
    "toast",
    "useBreakpoint",
    "useCanvas2D",
    "useCanvasLifecycle",
    "useConfiguratorState",
    "useDragVelocity",
    "useIdleReady",
    "useLeadTrail",
    "useLiquidFlex",
    "useOptionalConfiguratorSize",
    "usePointerVelocityField",
    "useResizeObserver",
    "useRoutePointer",
    "useSpecularTracking",
    "useToast",
    "useTokenColor",
    "useUserInvalidAria",
    "useViewportReady",
    "vReveal",
    "vSpecular",
] as const;

const subpathRuntimeExports = [
    // Drawer moved OFF the root barrel to the /drawer subpath
    // (keyframes-bearing heavy component, dock/aurora isolation pattern).
    { subpath: "drawer", surface: DrawerSurface, name: "Drawer" },
    { subpath: "drawer", surface: DrawerSurface, name: "DrawerContent" },
    { subpath: "drawer", surface: DrawerSurface, name: "DrawerHeader" },
    { subpath: "drawer", surface: DrawerSurface, name: "DrawerFooter" },
    { subpath: "drawer", surface: DrawerSurface, name: "DrawerTitle" },
    { subpath: "drawer", surface: DrawerSurface, name: "DrawerDescription" },
    { subpath: "search", surface: Search, name: "useFuzzySearch" },
    // The `ProgressiveSidebar` SFC is gone; the `./sidebar` subpath now
    // surfaces composables only.
    { subpath: "sidebar", surface: Sidebar, name: "useScrollTracker" },
    { subpath: "sidebar", surface: Sidebar, name: "useSidebarFollow" },
    { subpath: "sidebar", surface: Sidebar, name: "useTreeIndex" },
    { subpath: "sidebar", surface: Sidebar, name: "buildTreeIndex" },
    {
        subpath: "dark-mode-toggle",
        surface: DarkModeToggleSurface,
        name: "DarkModeToggle",
    },
    {
        subpath: "infinite-scroll",
        surface: InfiniteScrollSurface,
        name: "InfiniteScroll",
    },
    {
        subpath: "infinite-scroll",
        surface: InfiniteScrollSurface,
        name: "useInfiniteScroll",
    },
    { subpath: "tabs", surface: TabsSurface, name: "SegmentedTabs" },
    { subpath: "typewriter", surface: TypewriterSurface, name: "TypewriterText" },
    { subpath: "typewriter", surface: TypewriterSurface, name: "useTypewriter" },
    { subpath: "aurora", surface: Aurora, name: "Aurora" },
    { subpath: "aurora", surface: Aurora, name: "useAurora" },
    { subpath: "status-dot", surface: StatusDotSurface, name: "StatusDot" },
    { subpath: "paper-backdrop", surface: PaperBackdropSurface, name: "PaperBackdrop" },
    { subpath: "handmark", surface: HandMarkSurface, name: "HandMark" },
    // ToggleChip + SelectableChip FOLDED onto the ONE <Chip>
    // (shape × tone; clean break, no alias). Chip ships subpath-ONLY (/chip, OFF the
    // value.js-free root barrel — the value.js-bearing ink solve rides the dynamic
    // accent-tone-solve leaf; the dynamic color-leaf precedent).
    { subpath: "chip", surface: ChipSurface, name: "Chip" },
    {
        subpath: "scroll-progress-rim",
        surface: ScrollProgressRimSurface,
        name: "ScrollProgressRim",
    },
    { subpath: "sortable-list", surface: SortableListSurface, name: "SortableList" },
    { subpath: "timeline", surface: TimelineSurface, name: "GlassTimeline" },
    {
        subpath: "expandable-container",
        surface: ExpandableContainerSurface,
        name: "ExpandableContainer",
    },
    // Vueuse-bearing subpaths
    { subpath: "forms", surface: Forms, name: "Input" },
    { subpath: "forms", surface: Forms, name: "Textarea" },
    { subpath: "carousel", surface: CarouselSurface, name: "useCarousel" },
    { subpath: "dark", surface: Dark, name: "useGlobalDark" },
    // installDarkModeSync (keyframes-free, vueuse-bearing) lives on the /dark
    // subpath (its vueuse home).
    { subpath: "dark", surface: Dark, name: "installDarkModeSync" },
    { subpath: "keyboard", surface: Keyboard, name: "registerShortcut" },
    { subpath: "keyboard", surface: Keyboard, name: "useRegisteredShortcuts" },
    { subpath: "keyboard", surface: Keyboard, name: "formatCombo" },
    { subpath: "keyboard", surface: Keyboard, name: "isMac" },
    // keyframes.js-BEARING motion composables on the `/motion` subpath.
    { subpath: "motion", surface: Motion, name: "useAnimatedNumber" },
    // the keyframes-free leaves live on the flat `/motion-core` subpath (a
    // cheap-leaf import no longer statically reaches the keyframes engine).
    // `constants` (DAMPING/SNAP_THRESHOLD) is duplicate-exported on both.
    { subpath: "motion-core", surface: MotionCore, name: "useScrollProgress" },
    { subpath: "motion-core", surface: MotionCore, name: "useRAFLoop" },
    { subpath: "motion-core", surface: MotionCore, name: "useReducedMotion" },
    { subpath: "motion-core", surface: MotionCore, name: "readReducedMotion" },
    { subpath: "motion-core", surface: MotionCore, name: "useIntersectionPause" },
    // The INP-under-load lever. Engine-free (`/motion-core`).
    { subpath: "motion-core", surface: MotionCore, name: "useYieldToMain" },
    { subpath: "motion-core", surface: MotionCore, name: "yieldToMain" },
    { subpath: "motion", surface: Motion, name: "DAMPING" },
    { subpath: "motion", surface: Motion, name: "SNAP_THRESHOLD" },
    { subpath: "motion-core", surface: MotionCore, name: "DAMPING" },
    { subpath: "motion-core", surface: MotionCore, name: "SNAP_THRESHOLD" },
    // Sub-barrel publishing phase 2. Six remaining
    // `ui/` primitive families a consumer still imports from the root barrel
    // get flat-name subpaths so consumers can shake unrelated families out
    // of the entry chunk. Closes AL-CARRY-REMAINING-ROOT-BARREL-IMPORTS.
    { subpath: "popover", surface: PopoverSurface, name: "Popover" },
    { subpath: "popover", surface: PopoverSurface, name: "PopoverTrigger" },
    { subpath: "popover", surface: PopoverSurface, name: "PopoverContent" },
    { subpath: "select", surface: SelectSurface, name: "Select" },
    { subpath: "select", surface: SelectSurface, name: "SelectContent" },
    { subpath: "select", surface: SelectSurface, name: "SelectItem" },
    { subpath: "select", surface: SelectSurface, name: "SelectTrigger" },
    { subpath: "select", surface: SelectSurface, name: "SelectValue" },
    { subpath: "data-table", surface: DataTableSurface, name: "DataTable" },
] as const;

const retiredSubpathRuntimeMembers = [
    { subpath: "card", surface: CardSurface, name: "ScrollCard" },
    { subpath: "card", surface: CardSurface, name: "ScrollCardHeader" },
    { subpath: "carousel", surface: CarouselSurface, name: "GlassCarouselPager" },
    { subpath: "dialog", surface: DialogSurface, name: "DialogScrollContent" },
    { subpath: "data-table", surface: DataTableSurface, name: "DataTablePagination" },
    { subpath: "drawer", surface: DrawerSurface, name: "DrawerOverlay" },
    { subpath: "drawer", surface: DrawerSurface, name: "DrawerPortal" },
    { subpath: "progress", surface: ProgressSurface, name: "ProgressDefault" },
    { subpath: "progress", surface: ProgressSurface, name: "ProgressGradient" },
    { subpath: "progress", surface: ProgressSurface, name: "ProgressLiquid" },
    { subpath: "progress", surface: ProgressSurface, name: "ProgressSectioned" },
    { subpath: "handmark", surface: HandMarkSurface, name: "InkMark" },
    { subpath: "select", surface: SelectSurface, name: "SelectScrollUpButton" },
    { subpath: "select", surface: SelectSurface, name: "SelectScrollDownButton" },
] as const;

const exactSubpathRuntimeSurfaces = [
    {
        subpath: "instrument-chassis",
        surface: InstrumentChassisSurface,
        names: ["InstrumentChassis"],
    },
    {
        subpath: "surface",
        surface: SurfacePackage,
        names: ["Surface"],
    },
    {
        subpath: "metric",
        surface: MetricSurface,
        names: ["Metric", "MetricCell", "MetricRow", "MetricStack"],
    },
    {
        subpath: "labeled-field",
        surface: LabeledFieldSurface,
        names: [
            "LabeledField",
            "LabeledInput",
            "LabeledSelect",
            "LabeledSlider",
            "LabeledSwitch",
        ],
    },
    {
        subpath: "command",
        surface: CommandSurface,
        names: [
            "Command",
            "CommandDialog",
            "CommandEmpty",
            "CommandGroup",
            "CommandInput",
            "CommandItem",
            "CommandList",
            "CommandSeparator",
            "CommandShortcut",
        ],
    },
    {
        subpath: "dropdown-menu",
        surface: DropdownMenuSurface,
        names: [
            "DropdownMenu",
            "DropdownMenuCheckboxItem",
            "DropdownMenuContent",
            "DropdownMenuGroup",
            "DropdownMenuItem",
            "DropdownMenuLabel",
            "DropdownMenuRadioGroup",
            "DropdownMenuRadioItem",
            "DropdownMenuSeparator",
            "DropdownMenuShortcut",
            "DropdownMenuSub",
            "DropdownMenuSubContent",
            "DropdownMenuSubTrigger",
            "DropdownMenuTrigger",
        ],
    },
    {
        subpath: "dock",
        surface: Dock,
        // added the dock-context canonical DI primitives so
        // consumers can migrate from the retired pre- string keys
        // without reaching for the deep-import path. The DOCK_CONTEXT_KEY
        // symbol + 3 helpers join the SFC default-exports here.
        //
        // Regenerated from disk. The retired DockIconButton /
        // DockTabButton / DockSelectTrigger / DockDropdownTrigger / DockPopoverTrigger
        // fold onto DockControl + DockTrigger (the survivors); the fission
        // (DOCK_SPLIT_SIGNATURES / useDockFission), the V↔H morph
        // (useDockOrientationMorph), and the Siri island (SIRI_* / SiriDockCapability /
        // useSiriDock) are DEFINITION-ABSENT. This list is EXACT to
        // the `@mkbabb/glass-ui/dock` runtime barrel.
        names: [
            "DOCK_CONTEXT_KEY",
            "DockBackgroundToggle",
            // The ONE dock control (folds the
            // retired DockIconButton + DockTabButton onto a shape axis).
            "DockControl",
            // The thin controlled face-swap core.
            "DockCrossfade",
            "DockLayer",
            "DockLayerGroup",
            // The orientation+layout-aware divider primitive.
            "DockSeparator",
            // The ONE overlay trigger (folds the
            // retired DockSelectTrigger/DockDropdownTrigger/DockPopoverTrigger onto the
            // shared `.dock-trigger` recipe).
            "DockTrigger",
            "GlassDock",
            // The external-CTA-morphs-into-dock receive seam
            // (the /motion export STAYS — a re-export, not a move).
            "useDockCtaReceive",
            // The dock-as-native-dynamic-search-bar seam.
            "useDockSearch",
            "provideDockContext",
            "useDockContext",
            "useOptionalDockContext",
        ],
    },
] as const;

describe("public runtime surface", () => {
    it("keeps the package subpath cut exact", () => {
        const manifest = JSON.parse(readFileSync("package.json", "utf8"));
        expect(manifest.exports).toHaveProperty("./metric");
        expect(manifest.typesVersions["*"]).toHaveProperty("metric");
        for (const retired of [
            "notification",
            "color-swatch",
            "focus-scope",
            "spa-view",
            "icon-tooltip",
            "icon-chip",
            "metric-badge",
            "metric-cell",
            "metric-stack",
        ]) {
            expect(manifest.exports).not.toHaveProperty(`./${retired}`);
            expect(manifest.typesVersions["*"]).not.toHaveProperty(retired);
        }
    });

    it("keeps the exact root runtime surface", () => {
        expect(Object.keys(Glass).sort()).toEqual([...rootRuntimeExports].sort());
    });

    it("keeps the Blob renderer implementation private", () => {
        expect(BlobSurface).not.toHaveProperty("useMetaballRenderer");
    });

    it.each(subpathRuntimeExports)(
        "exports $subpath subpath symbol $name",
        ({ surface, name }) => {
            expect(surface).toHaveProperty(name);
        },
    );

    it.each(retiredSubpathRuntimeMembers)(
        "does not export retired $subpath member $name",
        ({ surface, name }) => {
            expect(surface).not.toHaveProperty(name);
        },
    );

    it.each(exactSubpathRuntimeSurfaces)(
        "keeps exact $subpath runtime surface",
        ({ surface, names }) => {
            expect(Object.keys(surface).sort()).toEqual([...names].sort());
        },
    );
});

describe("Row 8 package falsifiers", () => {
    it("keeps the required peer and CSS manifest contract", () => {
        const manifest = JSON.parse(readFileSync("package.json", "utf8"));
        const lock = JSON.parse(readFileSync("package-lock.json", "utf8"));
        expect(manifest.peerDependencies["@mkbabb/keyframes.js"]).toBe("^6.0.0");
        expect(manifest.peerDependenciesMeta).not.toHaveProperty("@mkbabb/keyframes.js");
        expect(manifest.peerDependencies["@mkbabb/pencil-boil"]).toBe("^0.11.2");
        expect(manifest.peerDependenciesMeta["@mkbabb/pencil-boil"]).toEqual({ optional: true });
        expect(manifest.devDependencies["@mkbabb/pencil-boil"]).toBe("0.11.2");
        expect(lock.packages[""]["peerDependencies"]["@mkbabb/pencil-boil"]).toBe("^0.11.2");
        expect(lock.packages[""]["devDependencies"]["@mkbabb/pencil-boil"]).toBe("0.11.2");
        expect(lock.packages["node_modules/@mkbabb/pencil-boil"]).toMatchObject({
            version: "0.11.2",
            resolved: "https://registry.npmjs.org/@mkbabb/pencil-boil/-/pencil-boil-0.11.2.tgz",
            integrity: "sha512-NifgOXlCU8ZBRwV3a3+nd20vFvpNPpol8PjaC1r0SjqyJD5euAQ3L1UEART6jz2zjUHfBqmSWGaq0XDAnIJX2A==",
        });
        expect(manifest.peerDependenciesMeta["@mkbabb/value.js"]).toEqual({ optional: true });
        expect(manifest.exports["./styles.css"]).toBe("./dist/component-styles.css");
    });

    it("keeps package and lock root metadata in exact agreement", () => {
        const manifest = JSON.parse(readFileSync("package.json", "utf8"));
        const lock = JSON.parse(readFileSync("package-lock.json", "utf8"));
        const lockRoot = lock.packages[""];
        for (const field of [
            "name",
            "version",
            "license",
            "engines",
            "workspaces",
            "dependencies",
            "devDependencies",
            "optionalDependencies",
            "peerDependencies",
            "peerDependenciesMeta",
        ]) {
            expect(Object.hasOwn(lockRoot, field)).toBe(Object.hasOwn(manifest, field));
            expect(lockRoot[field]).toEqual(manifest[field]);
        }
    });

    it("rejects an isolated lock-only root mismatch in the existing verifier", () => {
        const fixture = mkdtempSync(resolve(tmpdir(), "glass-package-lock-drift-"));
        try {
            writeFileSync(resolve(fixture, "package.json"), `${JSON.stringify({ name: "fixture", version: "1.0.0" })}\n`);
            writeFileSync(
                resolve(fixture, "package-lock.json"),
                `${JSON.stringify({ packages: { "": { name: "fixture", version: "2.0.0" } } })}\n`,
            );
            const verifier = pathToFileURL(resolve("scripts/verify-export-types.mjs")).href;
            const probe = `
                import { verifyExportTypes } from ${JSON.stringify(verifier)};
                try {
                    verifyExportTypes({ repositoryRoot: process.argv[1], artifactRoot: process.argv[1] });
                    console.log("NO_ERROR");
                } catch (error) {
                    console.log(error.message);
                }
            `;
            expect(runVerifierProbe(probe, fixture)).toContain(
                "package.json/package-lock.json root metadata mismatch: version",
            );
        } finally {
            rmSync(fixture, { recursive: true, force: true });
        }
    });

    it("registers package-lock.json in the shared lifecycle watch inputs", () => {
        const assets = readFileSync("vite.style-assets.ts", "utf8");
        expect(assets).toContain('        "package-lock.json",');
    });

    it("keeps the root barrel explicit", () => {
        const source = readFileSync("src/index.ts", "utf8");
        expect(source).not.toMatch(/^\s*export\s+\*\s+from/m);
        expect(source).toMatch(/export\s+type\s*\{/);
        expect(source).toMatch(/export\s*\{/);
    });

    it("keeps utility defaults declaration-local", () => {
        const source = readFileSync("vite.utility-emit.ts", "utf8");
        expect(source).toContain("rewriteFallbackValue");
        expect(source).not.toMatch(/kept\.append\([^\n]*:root/);
        expect(source).toContain('"--default-transition-duration": "var(--duration-fast, 150ms)"');
    });

    it("keeps the post-cure package, closure, and generation falsifiers durable", () => {
        const verifier = readFileSync("scripts/verify-export-types.mjs", "utf8");
        expect(verifier).not.toContain("--legacy-peer-deps");
        expect(verifier).not.toContain("installAbsentValueTarball");
        expect(verifier).not.toContain("--omit=peer");
        expect(verifier).not.toContain("pathToFileURL");
        expect(verifier).not.toContain("consumer-pencil-shim");
        expect(verifier).toContain("lstatSync(keyframes)");
        expect(verifier).toContain("realpathSync(keyframes)");
        expect(verifier).toContain("realpathSync(pencil)");
        expect(verifier).toContain("consumerDependencies[pencilPeer] = pencilVersion");
        expect(verifier).toContain("function packageCodeSpecifiers(pkg)");
        expect(verifier).toContain("namespaceImports = codeSpecifiers");
        expect(verifier).toContain("runtimeResults");
        expect(verifier).not.toContain("optionalValueAbsence");
        const callerPack = verifier.slice(
            verifier.indexOf("const callerPath = process.env.GLASS_PACKAGE_TARBALL"),
            verifier.indexOf("const packDirectory = mkdtempSync"),
        );
        expect(callerPack).toContain("lstatSync(path).isFile()");
        expect(callerPack).toContain("lstatSync(path).isSymbolicLink()");
        expect(callerPack).not.toContain("tarFiles(path)");
        expect(callerPack).not.toContain('files.has("package.json")');
        expect(callerPack).toContain('"package/package.json"');
        expect(callerPack).toContain("packedPackage.name !== pkg.name");
        expect(callerPack).toContain("packedPackage.version !== pkg.version");
        expect(callerPack).toContain("...preUse");
        expect(callerPack).toContain("const preUse = sha256(path)");
        expect(callerPack).toContain("preUse,");
        expect(callerPack.indexOf("const preUse = sha256(path)")).toBeLessThan(
            callerPack.indexOf('spawnSync("tar", ["-xOzf"'),
        );
        expect(callerPack).toContain("callerProvided: true");
        expect(callerPack).not.toContain("preserved: true");
        expect(callerPack).not.toContain('spawnSync("npm", ["pack"');
        expect(verifier).toContain("const packedFiles = tarFiles(packEvidence.path)");
        expect(verifier).toContain("const packedClaims = packageClaims(pkg, packedFiles)");
        expect(verifier).toContain("packedCssSetFailures(cssClosure.files, packedFiles)");
        expect(verifier).toContain("tar membership is not unique after package normalization");
        expect(verifier).toContain("directGlassPeerRequested: Object.hasOwn(consumerDependencies");
        expect(verifier).toContain("installedThrough: requiredPeer");
        expect(verifier).toContain("if (packEvidence.packDirectory) temporaryRoots.push(packEvidence.packDirectory)");
        expect(verifier).toContain("const postUse = sha256(packEvidence.path)");
        expect(verifier).toContain("GLASS_PACKAGE_TARBALL changed during verification");
        expect(verifier).toContain("packEvidence.postUse = postUse");
        expect(verifier).toContain("packEvidence.preserved = true");
        expect(verifier).toContain("firstAdoption");
        expect(verifier).toContain("candidate !== datum");
        expect(verifier).toContain("BigInt(tarballBytes)");
        expect(verifier).toContain("raw code-bearing source");
        const fold = readFileSync("vite.style-fold.ts", "utf8");
        expect(fold).toContain("CSS_FONT_EXPORTS");
        expect(fold).toContain("inlineStyles");
        expect(fold).not.toContain('filesUnder(resolve(root, "src/fonts"))');
        expect(fold).toContain("copySources");
        expect(fold).toContain("const analyzedCss = new Set<string>()");
        expect(fold).toContain("const publishedCss = new Set<string>()");
        expect(fold).toContain("visitCss(path, true)");
        expect(fold).toContain("cpSync");
        const assets = readFileSync("vite.style-assets.ts", "utf8");
        expect(assets).not.toMatch(/let\s+published\b/);
        expect(assets).toContain("buildEnd(error)");
        expect(assets).toContain("let watchMode = false;");
        expect(assets).toContain("watchMode = Boolean(config.build.watch);");
        const closeBundleMarker = "        async closeBundle() {";
        const buildEndMarker = "        buildEnd(error)";
        const catchMarker = "} catch (error) {";
        const publishCall = "publishGeneration(outputRoot);";
        const exactCatchBlock = [
            "            } catch (error) {",
            "                cleanupGeneration();",
            "                if (!watchMode) throw error;",
            "                console.error(error instanceof Error ? error.message : String(error));",
            "                return;",
            "            }",
        ].join("\n");
        expect((assets.match(/^        async closeBundle\(\) \{$/gm) ?? [])).toHaveLength(1);
        expect((assets.match(/^        buildEnd\(error\)/gm) ?? [])).toHaveLength(1);
        const closeBundleIndex = assets.indexOf(closeBundleMarker);
        const buildEndIndex = assets.indexOf(buildEndMarker);
        expect(buildEndIndex).toBeGreaterThan(closeBundleIndex);
        const closeBundle = assets.slice(closeBundleIndex, buildEndIndex);
        expect((closeBundle.match(/\bcatch\b(?:\s*\([^)]*\))?\s*\{/g) ?? [])).toHaveLength(1);
        expect((closeBundle.match(/publishGeneration\(outputRoot\);/g) ?? [])).toHaveLength(1);
        expect(closeBundle.split(exactCatchBlock)).toHaveLength(2);
        const catchIndex = closeBundle.indexOf(catchMarker);
        const publishIndex = closeBundle.indexOf(publishCall);
        expect(publishIndex).toBeGreaterThanOrEqual(0);
        expect(publishIndex).toBeLessThan(catchIndex);
        expect(closeBundle.slice(catchIndex)).not.toContain(publishCall);
    });

    it("rejects packed CSS drift and duplicate normalized tar members", () => {
        const verifier = pathToFileURL(resolve("scripts/verify-export-types.mjs")).href;
        const probe = `
            import { readdirSync } from "node:fs";
            import { join } from "node:path";
            import { normalizeTarMembers, packedCssSetFailures } from ${JSON.stringify(verifier)};
            const filesUnder = (directory, prefix = "") => readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
                const path = join(directory, entry.name);
                const name = prefix ? [prefix, entry.name].join("/") : entry.name;
                return entry.isDirectory() ? filesUnder(path, name) : [name];
            });
            const rejection = (members) => {
                try {
                    normalizeTarMembers(members);
                    return null;
                } catch (error) {
                    return error.message;
                }
            };
            const acceptedMembers = (members) => [...normalizeTarMembers(members)];
            const artifactCss = new Set(filesUnder("dist").filter((file) => file.endsWith(".css")));
            const packedCss = new Set([...artifactCss].map((file) => ["dist", file].join("/")));
            const withOrphan = new Set([...packedCss, "dist/orphan.css"]);
            const withoutKnown = new Set(packedCss);
            withoutKnown.delete("dist/component-styles.css");
            console.log(JSON.stringify({
                normalizedCollision: rejection("package/dist/a.css\\ndist/a.css\\n"),
                exactDuplicate: rejection("package/dist/a.css\\npackage/dist/a.css\\n"),
                parentAlias: rejection("package/dist/index.js\\npackage/dist/x/../index.js\\n"),
                dotAlias: rejection("package/dist/./index.js\\n"),
                rootEscape: rejection("package/../../escape.js\\n"),
                regularAncestorFirst: rejection("package/dist/index.js\\npackage/dist/index.js/payload\\n"),
                regularAncestorLast: rejection("package/dist/index.js/payload\\npackage/dist/index.js\\n"),
                directoryAncestorFirst: rejection("package/dist/index.js/\\npackage/dist/index.js/payload\\n"),
                directoryAncestorLast: rejection("package/dist/index.js/payload\\npackage/dist/index.js/\\n"),
                conflictingKinds: rejection("package/dist/index.js/\\npackage/dist/index.js\\n"),
                packageRootRegularFirst: rejection("package\\npackage/dist/index.js\\n"),
                packageRootRegularLast: rejection("package/dist/index.js\\npackage\\n"),
                packageRootDirectoryFirst: acceptedMembers("package/\\npackage/dist/index.js\\n"),
                packageRootDirectoryLast: acceptedMembers("package/dist/index.js\\npackage/\\n"),
                artifactCssCount: artifactCss.size,
                packedCssCount: packedCss.size,
                exactCss: packedCssSetFailures(artifactCss, packedCss),
                addedCss: packedCssSetFailures(artifactCss, withOrphan),
                removedCss: packedCssSetFailures(artifactCss, withoutKnown),
            }));
        `;
        const results = JSON.parse(runVerifierProbe(probe));
        expect(results.normalizedCollision).toMatch(/tar membership is not unique after package normalization/);
        expect(results.exactDuplicate).toMatch(/tar membership is not unique after package normalization/);
        expect(results.parentAlias).toContain('".." path alias');
        expect(results.parentAlias).toContain('"package/dist/x/../index.js"');
        expect(results.dotAlias).toContain('"." path alias');
        expect(results.dotAlias).toContain('"package/dist/./index.js"');
        expect(results.rootEscape).toContain("tar member escapes the package root");
        expect(results.rootEscape).toContain('"package/../../escape.js"');
        expect(results.regularAncestorFirst).toContain("tar member has a non-directory ancestor");
        expect(results.regularAncestorFirst).toContain('"package/dist/index.js"');
        expect(results.regularAncestorFirst).toContain('"package/dist/index.js/payload"');
        expect(results.regularAncestorLast).toBe(results.regularAncestorFirst);
        expect(results.directoryAncestorFirst).toBeNull();
        expect(results.directoryAncestorLast).toBeNull();
        expect(results.conflictingKinds).toContain("tar membership is not unique after package normalization");
        expect(results.conflictingKinds).toContain("(directory)");
        expect(results.conflictingKinds).toContain("(regular)");
        expect(results.packageRootRegularFirst).toContain("tar member has a non-directory package root");
        expect(results.packageRootRegularLast).toBe(results.packageRootRegularFirst);
        expect(results.packageRootDirectoryFirst).toEqual(["dist/index.js"]);
        expect(results.packageRootDirectoryLast).toEqual(["dist/index.js"]);
        expect(results.artifactCssCount).toBe(114);
        expect(results.packedCssCount).toBe(114);
        expect(results.exactCss).toEqual([]);
        expect(results.addedCss).toEqual(["packed CSS closure has unreachable member orphan.css"]);
        expect(results.removedCss).toEqual(["packed CSS closure is missing component-styles.css"]);
    });

    it("keeps raw code-bearing sources out of the built artifact", () => {
        const filesUnder = (directory: string, prefix = ""): string[] => {
            if (!existsSync(directory)) return [];
            return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
                const path = resolve(directory, entry.name);
                const name = prefix ? `${prefix}/${entry.name}` : entry.name;
                return entry.isDirectory() ? filesUnder(path, name) : [name];
            });
        };
        expect(existsSync("dist")).toBe(true);
        const files = filesUnder("dist");
        expect(files.filter((file) => /\.vue$/.test(file))).toEqual([]);
        expect(files.filter((file) => /\.(?:ts|tsx|jsx|mts|cts)$/.test(file) && !/\.d\.(?:ts|mts|cts)$/.test(file))).toEqual([]);
    });

    it("rejects datum+1 in first-adoption mode while permitting a later decrease", () => {
        const fixture = mkdtempSync(resolve(tmpdir(), "glass-ratchet-hostile-"));
        try {
            writeFileSync(resolve(fixture, ".bundle-ratchet"), "1097643\n");
            const verifier = pathToFileURL(resolve("scripts/verify-export-types.mjs")).href;
            const probe = `
                import { ratchetEvidence } from ${JSON.stringify(verifier)};
                const root = process.argv[1];
                const results = [];
                try {
                    ratchetEvidence(root, 1097642, { firstAdoption: true });
                } catch (error) {
                    results.push(error.message);
                }
                await import("node:fs").then(({ writeFileSync }) => writeFileSync(root + "/.bundle-ratchet", "1097642\\n"));
                results.push(ratchetEvidence(root, 1097642, { firstAdoption: true }));
                results.push(ratchetEvidence(root, 1097641));
                console.log(JSON.stringify(results));
            `;
            const results = JSON.parse(runVerifierProbe(probe, fixture));
            expect(results[0]).toMatch(/first-adoption bundle ratchet requires exact equality/);
            expect(results[1]).toMatchObject({ mode: "first-adoption", equal: true });
            expect(results[2]).toMatchObject({ mode: "later-coordinate", equal: false });
        } finally {
            rmSync(fixture, { recursive: true, force: true });
        }
    });

});

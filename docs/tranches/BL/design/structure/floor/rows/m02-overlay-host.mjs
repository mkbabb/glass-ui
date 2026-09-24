#!/usr/bin/env node
// rows/m02-overlay-host.mjs — floor row S-8 / F-8: the M02 inversion. Overlay participation
// stops importing the dock. The overlay layer owns the host contract (`OverlayHost`, and the
// `DockHoldKind` name it is typed by) and a kernel context key; the dock provides that key
// beside its own. `dockContext.ts` stays in dock. (Built from B-proto's patch-inversions.)
//   node rows/m02-overlay-host.mjs --root <linked worktree>
import { openRow } from "./lib.mjs";

const row = openRow("m02-overlay-host");
row.edit("src/components/_shared/overlay/participation.ts", [
    [
        `import {
    useOptionalDockContext,
    type DockHoldKind,
} from "../../dock/composables/dockContext";
`,
        `import { createOptionalContext } from "../../../composables/context";

/**
 * What kind of hold a token is: \`"morph"\` (posture only, the default) or \`"grasp"\`
 * (a live pointer hold, which also takes a morph count). The dock gives the two their
 * meaning; the host contract owns the name, so participation never imports the dock.
 */
export type DockHoldKind = "morph" | "grasp";

/** The host a portalled overlay participates in. \`provideDockContext\` provides it. */
export interface OverlayHost {
    id: string;
    keepOpen: (kind?: DockHoldKind) => void;
    release: (kind?: DockHoldKind) => void;
}

const overlayHost = createOptionalContext<OverlayHost>("glass-ui:overlay-host");

/** Provide the overlay host to descendants. The dock calls it beside its own key. */
export const provideOverlayHost = overlayHost.provide;
`,
    ],
    [`    const dock = useOptionalDockContext();`, `    const dock = overlayHost.use();`],
]);
row.edit("src/components/dock/composables/dockContext.ts", [
    [
        `import { DOCK_CONTEXT_LABEL } from "../constants";
`,
        `import { DOCK_CONTEXT_LABEL } from "../constants";
import { provideOverlayHost, type DockHoldKind } from "../../_shared/overlay/participation";
`,
    ],
    [/\n\/\*\*\n \* What KIND of hold a token is\.[\s\S]*?\*\/\nexport type DockHoldKind = "morph" \| "grasp";\n/, "\n"],
    [
        `export function provideDockContext(context: DockContext): void {
    ctx.provide(context);`,
        `export function provideDockContext(context: DockContext): void {
    ctx.provide(context);
    // Overlays read the kernel host key, never the dock's; this is the same object.
    provideOverlayHost(context);`,
    ],
]);
row.edit("src/components/dock/composables/useDockState.ts", [[`import type { DockHoldKind } from "./dockContext";`, `import type { DockHoldKind } from "../../_shared/overlay/participation";`]]);
row.commit("participation owns OverlayHost + DockHoldKind; dock provides it; dockContext stays in dock");

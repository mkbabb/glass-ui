/**
 * W-I.8 R-8: docks found by id. GlassDock writes its entry at mount and removes it at
 * unmount; DockOutlet reads the map. No DOM lookup.
 */
import { reactive, shallowReactive } from "vue";
import type { DockContext } from "./dockContext";

export type DockOutletRegion = "run" | "persistent" | "persistent-end";

export interface DockRegistryEntry {
    id: string;
    context: DockContext;
    regions: Record<DockOutletRegion, HTMLElement | null>;
}

export const dockRegistry = shallowReactive(new Map<string, DockRegistryEntry>());

/** How many outlets ask for each region of each dock (so a region renders unauthored). */
const dockOutletWants = reactive(new Map<string, Record<DockOutletRegion, number>>());

export function wantRegion(id: string, region: DockOutletRegion, delta: 1 | -1): void {
    const row = dockOutletWants.get(id) ?? { run: 0, persistent: 0, "persistent-end": 0 };
    row[region] = Math.max(0, row[region] + delta);
    dockOutletWants.set(id, row);
}

export function regionWanted(id: string | undefined, region: DockOutletRegion): boolean {
    return !!id && (dockOutletWants.get(id)?.[region] ?? 0) > 0;
}

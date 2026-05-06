/**
 * Dock keep-open sink — single-authority primitive shared by every dock
 * descendant that needs to hold the parent dock open during a gesture.
 *
 * The sink wraps the dock's internal keepOpen counter with a Set<symbol>
 * of outstanding tokens. While the set is non-empty the counter is
 * incremented exactly once; when the set drains it is decremented exactly
 * once. `release(token)` is idempotent — releasing an already-released or
 * unknown token is a no-op — so leaf-side double-acquires or leaks cannot
 * desync the dock's internal counter.
 *
 * Provided by `<GlassDock>` via `useDockState`. Consumed by every
 * descendant that needs the keep-open hold (e.g. `<DockPopover>` while
 * its panel is expanded, `<Slider :keep-dock-open>` while a thumb is
 * being dragged).
 */
export interface DockKeepOpenSink {
    acquire(): symbol;
    release(token: symbol): void;
}

/**
 * Inject key for the dock keep-open sink. String literal for stable
 * inject identity across module-graph copies; consumers should treat it
 * as opaque and never reach for the underlying string.
 */
export const DOCK_KEEP_OPEN_SINK_KEY = "dockKeepOpenSink" as const;

/**
 * Build a sink backed by the supplied counter primitive. The counter
 * primitive is the dock-internal `keepOpen` / `release` pair from
 * `useDockState`; the sink lifts those raw functions into a token-based,
 * idempotent imperative API.
 */
export function createDockKeepOpenSink(counter: {
    keepOpen(): void;
    release(): void;
}): DockKeepOpenSink {
    const tokens = new Set<symbol>();
    let held = false;

    return {
        acquire(): symbol {
            const token = Symbol("dockKeepOpenToken");
            tokens.add(token);
            if (!held) {
                held = true;
                counter.keepOpen();
            }
            return token;
        },
        release(token: symbol): void {
            if (!tokens.delete(token)) return;
            if (tokens.size === 0 && held) {
                held = false;
                counter.release();
            }
        },
    };
}

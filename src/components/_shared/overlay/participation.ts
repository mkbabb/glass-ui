import {
    computed,
    onScopeDispose,
    ref,
    toValue,
    watch,
    type ComputedRef,
    type MaybeRefOrGetter,
    type Ref,
} from "vue";
import {
    useOptionalDockContext,
    type DockHoldKind,
} from "../../dock/composables/dockContext";

/**
 * ══ THE ONE KEEP-OPEN TOKEN ══
 *
 * Four sites used to hand-roll the same six lines: a boolean `isHeld`, an
 * acquire guarded on it, a release guarded on it, and a teardown that had to
 * remember to release — `Popover.vue`, `DockLayerGroup.vue`, `useDockSearch.ts`
 * and `useDockHold.ts`. Four copies of a discipline is four chances to leak a
 * token, and a leaked token is a dock that never idle-collapses again for the
 * life of the page. The dock context's `keepOpen`/`release` pair is already a
 * REF-COUNT; what was duplicated is the *token* — the guarantee that one holder
 * takes exactly one count and gives it back exactly once, including on unmount.
 *
 * `target` is a getter rather than a value so a holder can sit above the thing
 * it holds (`useDockSearch` drives its own dock state object; a Popover reads an
 * optional context that may be absent entirely). A null target is not an error:
 * the flag still flips, because whether the holder is holding is a fact about
 * the holder, not about whether a dock happened to be listening.
 */
export interface HoldTarget {
    keepOpen: (kind?: DockHoldKind) => void;
    release: (kind?: DockHoldKind) => void;
}

export interface HoldToken {
    /** `true` while this token holds its count. */
    readonly isHeld: Readonly<Ref<boolean>>;
    /** Idempotent — a second call while held is a no-op, never a second count. */
    acquire: () => void;
    /** Idempotent — a release while free is a no-op, never a negative count. */
    release: () => void;
}

export function useHoldToken(
    target: () => HoldTarget | null | undefined,
    kind?: DockHoldKind,
): HoldToken {
    const isHeld = ref(false);

    function acquire(): void {
        if (isHeld.value) return;
        isHeld.value = true;
        target()?.keepOpen(kind);
    }

    function release(): void {
        if (!isHeld.value) return;
        isHeld.value = false;
        target()?.release(kind);
    }

    // The teardown that three of the four copies each had to remember. Owning it
    // here is the whole point: a holder can no longer forget it.
    onScopeDispose(release);

    return { isHeld, acquire, release };
}

/**
 * The portal stamp pair a dock-owned overlay writes onto its TELEPORTED root.
 *
 * `isTeleportedTarget()` (beside this file) is the reader. Ten hand-written
 * spellings across five sites in three files used to write it, and three
 * portalled surfaces — the tooltip, the submenu, the command list — wrote
 * nothing at all, so a dock-anchored tooltip collapsed the dock the moment the
 * pointer left the icon for the hint.
 */
export interface DockPortalAttrs {
    "data-glass-dock-portal"?: string;
    "data-glass-dock-owner"?: string;
}

export interface DockParticipation {
    /** Spread onto the portalled content root. Empty outside a dock. */
    portalAttrs: ComputedRef<DockPortalAttrs>;
    /** `true` while this surface holds the dock open. */
    readonly isHeld: Readonly<Ref<boolean>>;
    hold: () => void;
    release: () => void;
}

/**
 * Dock participation for a portalled overlay: the stamp, and the one token.
 *
 * `hold` is the DECLARATIVE arm — pass a ref/getter that is true exactly while
 * the surface should pin the dock open and the token is driven for you. The
 * imperative `hold()`/`release()` remain for a caller with an edge rather than a
 * state (the pointer-hold path).
 */
export function useDockParticipation(o?: {
    hold?: MaybeRefOrGetter<boolean>;
    kind?: DockHoldKind;
}): DockParticipation {
    const dock = useOptionalDockContext();
    const token = useHoldToken(() => dock, o?.kind);

    const portalAttrs = computed<DockPortalAttrs>(() =>
        dock?.id
            ? { "data-glass-dock-portal": "", "data-glass-dock-owner": dock.id }
            : {},
    );

    if (o?.hold !== undefined) {
        watch(
            () => toValue(o.hold),
            (on) => (on ? token.acquire() : token.release()),
            { immediate: true },
        );
    }

    return {
        portalAttrs,
        isHeld: token.isHeld,
        hold: token.acquire,
        release: token.release,
    };
}

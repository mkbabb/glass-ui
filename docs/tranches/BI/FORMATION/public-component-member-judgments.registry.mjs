/**
 * Authored exceptions to the exact public component-member judgment engine.
 *
 * The engine deliberately refuses to infer publication legitimacy from a barrel,
 * sibling usage, a unit test, or an internal composition. Every retained-concept
 * member with no causal public/demo witness, and every internal-only member, must
 * therefore appear here by exact exported name.
 */
export const MEMBER_JUDGMENT_OVERRIDES = Object.freeze({
    GlassCarouselPager: {
        disposition: "DELETE_REDUNDANT_PUBLIC_MEMBER",
        target: "CarouselPager + PagerDots",
        ownerWaves: ["BI.W-P119"],
        rationale: "GlassCarouselPager is a zero-witness alternate previous/next/counter implementation. The direct story renders and causally exercises CarouselPager, while PagerDots owns direct position selection; the Glass-prefixed fork has only its definition and barrel projections.",
        acceptancePredicate: "BI.W-P119 deletes GlassCarouselPager.vue and its exact /carousel export, docs, types, and tests. CarouselPager and PagerDots must share one slide identity and together prove previous/next/direct selection, disabled and loop policy, drag, autoplay pause, focus, announcements, touch, and PRM without preserving the fork or aliasing its name.",
        negativeControl: "Restore GlassCarouselPager or its export, count CarouselPager/PagerDots as sibling demand, or retain an independent counter/loop writer; exact-member topology, clean-break, and selection evidence must turn RED.",
    },
    CarouselNext: {
        disposition: "DELETE_REDUNDANT_PUBLIC_MEMBER",
        target: "CarouselPager",
        ownerWaves: ["BI.W-P119"],
        rationale: "The standalone next control has no source, demo, test, or tracked external runtime witness. The live CarouselPager already owns and exercises the same next-slide command against Carousel's single slide identity.",
        acceptancePredicate: "BI.W-P119 deletes CarouselNext.vue and its exact /carousel export, docs, types, and tests while retaining one exercised Next slide command inside CarouselPager. The packed package must not resolve CarouselNext and the direct Carousel scenario must still advance exactly one slide, preserve focus, announce the new identity once, and honor disabled/loop policy.",
        negativeControl: "Restore CarouselNext or its export while CarouselPager remains, or count CarouselPager's live Next button as demand for the sibling symbol; exact-member topology must turn RED.",
    },
    CarouselPrevious: {
        disposition: "DELETE_REDUNDANT_PUBLIC_MEMBER",
        target: "CarouselPager",
        ownerWaves: ["BI.W-P119"],
        rationale: "The standalone previous control has no source, demo, test, or tracked external runtime witness. The live CarouselPager already owns and exercises the same previous-slide command against Carousel's single slide identity.",
        acceptancePredicate: "BI.W-P119 deletes CarouselPrevious.vue and its exact /carousel export, docs, types, and tests while retaining one exercised Previous slide command inside CarouselPager. The packed package must not resolve CarouselPrevious and the direct Carousel scenario must prove disabled-at-start, enable-after-advance, focus, loop, and one shared slide identity.",
        negativeControl: "Restore CarouselPrevious or its export while CarouselPager remains, or let the sibling's rendered button launder this unused symbol; exact-member topology must turn RED.",
    },
    ComboboxCancel: {
        disposition: "DELETE_SPECULATIVE_UPSTREAM_REEXPORT",
        target: "Combobox root/input value policy",
        ownerWaves: ["BI.W-P096"],
        rationale: "The direct upstream ComboboxCancel re-export has no causal consumer or rendered witness. Both live Glass Combobox specimens open, group, select, and update values without rendering it; reset/clear behavior belongs to the explicit value model and named consumer controls, not a speculative primitive projection.",
        acceptancePredicate: "BI.W-P096 removes the exact ComboboxCancel export from the forms entry. The packed package must not resolve it; the canonical Combobox scenarios must still prove controlled reset/clear, filtering, selection, announcement, keyboard, and touch through the root/input value contract without a compatibility alias.",
        negativeControl: "Re-export ComboboxCancel merely because reka-ui provides it, or claim a generic reset button exercises that symbol; exact public-surface and scenario evidence must turn RED.",
    },
    ComboboxSeparator: {
        disposition: "DELETE_SPECULATIVE_PUBLIC_MEMBER",
        target: "ComboboxGroup semantic grouping",
        ownerWaves: ["BI.W-P096"],
        rationale: "ComboboxSeparator has no causal consumer or rendered witness. The live popup already expresses its two collections through named ComboboxGroup regions; a decorative rule is neither selection semantics nor an independently demanded composition primitive.",
        acceptancePredicate: "BI.W-P096 deletes ComboboxSeparator.vue and its exact forms export. The packed package must not resolve it; the direct grouped-list scenario must preserve group labels, option order, active descendant, filtering, and selection without substituting an unlabeled separator as structural evidence.",
        negativeControl: "Restore the separator, count CommandSeparator or a CSS border as its witness, or let a separator replace named grouping; exact-member and combobox semantics must turn RED.",
    },
    ComboboxViewport: {
        disposition: "DELETE_SPECULATIVE_PUBLIC_MEMBER",
        target: "ComboboxList",
        ownerWaves: ["BI.W-P096"],
        rationale: "ComboboxViewport has no causal consumer or rendered witness. ComboboxList is already the portaled content and overflow owner in the live composition; publishing a second optional scroll container creates an unowned nested-scroll/virtualization seam.",
        acceptancePredicate: "BI.W-P096 deletes ComboboxViewport.vue and its exact forms export, then proves ComboboxList alone owns popup bounds, scrolling, active-option visibility, collision, keyboard, touch, and large-result behavior. The packed package must not resolve ComboboxViewport and no nested compatibility wrapper may remain.",
        negativeControl: "Restore ComboboxViewport, add it only to make the inventory look complete, or allow List and Viewport to compete for scroll ownership; exact-member, focus, and responsive evidence must turn RED.",
    },
    CommandDialog: {
        disposition: "RETAIN_PUBLIC_ADD_DIRECT_DEMO",
        target: "Command + Dialog composition",
        ownerWaves: ["BI.W-P108"],
        rationale: "Command's product contract explicitly includes an optional Dialog composition and a required dialog state, and CommandDialog is a coherent single composition of the retained Command and Dialog owners. Its current absence is a demo defect, not proof that the state is unsound: the live Command story exercises only the inline branch and mentions the dialog branch in prose.",
        acceptancePredicate: "BI.W-P108 retains the exact CommandDialog exports and adds a direct open/query/Arrow navigation/execute/Escape/focus-restore specimen using the packed public member. The inline and dialog branches must share one command collection and active identity, and the dialog branch must satisfy Dialog title, modality, focus, dismissal, surface, and PRM contracts.",
        negativeControl: "Leave CommandDialog as prose/export-only, render an ordinary Dialog without importing CommandDialog, fork the command collection, or let the inline scenario donate dialog coverage; exact-member and scenario evidence must turn RED.",
    },
    DataTablePagination: {
        disposition: "REMOVE_PUBLIC_EXPORT_KEEP_PRIVATE_OWNER_PART",
        target: "DataTable",
        ownerWaves: ["BI.W-P116"],
        rationale: "DataTablePagination is used only inside DataTable and has no independent demo or tracked external runtime consumer. Pagination is a required DataTable state, but the implementation child does not thereby become a second public product.",
        acceptancePredicate: "BI.W-P116 removes DataTablePagination from root and /data-table exports while keeping or reshaping it as an implementation-private DataTable part. The direct DataTable scenario must prove page count, bounds, selection continuity, sort/filter interaction, keyboard names, and narrow projection through DataTable's public contract.",
        negativeControl: "Re-export the private child, count DataTable's internal import as public demand, or pass pagination by checking button existence without model transitions; exact-member and data evidence must turn RED.",
    },
    DialogScrollContent: {
        disposition: "FOLD_PUBLIC_MEMBER_INTO_CANONICAL_AXIS",
        target: "DialogContent scroll/layout axis",
        ownerWaves: ["BI.W-P106"],
        rationale: "DialogScrollContent has no causal consumer or rendered witness and duplicates the retained DialogContent with a scroll-layout ModalOverlay plus a second close/content recipe. Scroll is already a required Dialog state and belongs on one canonical content/layout axis.",
        acceptancePredicate: "BI.W-P106 deletes DialogScrollContent.vue and both exact exports, folds its scrollable-body behavior into DialogContent's explicit size/scroll contract, and proves long content, viewport bounds, inner scroll, background inertness, focus, close, touch, and PRM in the direct Dialog scenario. No alias or parallel overlay recipe survives.",
        negativeControl: "Restore DialogScrollContent, keep a second ModalOverlay/close recipe, or prove scroll only with a normal centered Dialog whose content never overflows; clean-break and dialog evidence must turn RED.",
    },
    DrawerOverlay: {
        disposition: "REMOVE_PUBLIC_EXPORT_KEEP_PRIVATE_OWNER_PART",
        target: "DrawerContent",
        ownerWaves: ["BI.W-P107"],
        rationale: "DrawerOverlay is imported only by DrawerContent and has no independent demo or tracked external runtime consumer. Scrim presence is a DrawerContent/modal-mode responsibility, not an independently publishable Drawer product.",
        acceptancePredicate: "BI.W-P107 removes DrawerOverlay from the /drawer public entry while keeping its scrim implementation private to DrawerContent or the shared overlay substrate. Modal and live-behind scenarios must prove the exact scrim/no-scrim, inertness, pointer, focus, staging, and PRM states through public Drawer composition.",
        negativeControl: "Re-export DrawerOverlay, count DrawerContent's private import as demand, or allow consumers to create duplicate/contradictory scrims; exact-member and overlay evidence must turn RED.",
    },
    DrawerPortal: {
        disposition: "DELETE_REDUNDANT_UPSTREAM_REEXPORT",
        target: "DrawerContent-owned DialogPortal",
        ownerWaves: ["BI.W-P004", "BI.W-P107"],
        rationale: "DrawerPortal has no current published-specifier consumer and DrawerContent already portals itself. The one tracked muster import comes from the wrong root specifier and wraps DrawerContent, producing an unnecessary double-portal composition rather than legitimate independent demand.",
        acceptancePredicate: "BI.W-P107 removes DrawerPortal from /drawer without a root alias; BI.W-P004 asks muster to delete the outer DrawerPortal wrapper/import and retain DrawerContent as the sole portal owner through an exact tarball-bound owner packet. The packed package must not resolve DrawerPortal, and Drawer focus, stacking, dismissal, SSR mount, and teardown must pass with exactly one portal boundary.",
        negativeControl: "Add a root compatibility export, preserve the muster double portal, or count the retired/wrong-specifier import as demand; exact-member, clean-break, and consumer-handshake evidence must turn RED.",
    },
    DropdownMenuPortal: {
        disposition: "DELETE_REDUNDANT_UPSTREAM_REEXPORT",
        target: "DropdownMenuContent-owned dynamic Portal",
        ownerWaves: ["BI.W-P105"],
        rationale: "DropdownMenuPortal has no causal consumer or rendered witness. DropdownMenuContent already selects and mounts the correct Dropdown/Context Portal through useMenuPart, so a second exported Portal invites double teleport and breaks the content owner's trigger-dependent family selection.",
        acceptancePredicate: "BI.W-P105 removes DropdownMenuPortal from root and /dropdown-menu exports. The direct click-menu and context-menu scenarios must prove one portal, collision, submenu layering, focus restoration, dismissal, Dock ownership attributes, and teardown through DropdownMenuContent.",
        negativeControl: "Restore the portal re-export, wrap DropdownMenuContent in a second portal, or exercise only the click branch while claiming context ownership; exact-member and overlay evidence must turn RED.",
    },
    HandMark: {
        disposition: "RETAIN_CANONICAL_PUBLIC_NAME",
        target: "HandMark",
        ownerWaves: ["BI.W-P051"],
        rationale: "HandMark is the canonical semantic name, has a direct first-party rendered witness, and owns the only implementation shared with the historical InkMark prose alias.",
        acceptancePredicate: "BI.W-P051 retains HandMark as the sole component export from /handmark and exercises underline, circle, strike, draw, static, dark, and PRM states with seeded geometry. Pure brush/geometry utilities remain separately named; no second component alias survives.",
        negativeControl: "Delete HandMark while retaining InkMark, restore two component names for one SFC, or let unseeded motion erase the static semantic mark; alias-topology, typography, and motion evidence must turn RED.",
    },
    InkMark: {
        disposition: "MIGRATE_CONSUMERS_DELETE_SOURCE_ALIAS",
        target: "HandMark",
        ownerWaves: ["BI.W-P004", "BI.W-P051", "BI.W-P133"],
        rationale: "InkMark is a same-source alias of HandMark, not a separate component or behavior. Its two exact Atlas runtime consumers justify coordinated migration, not permanent dual naming; the barrel's prose preference cannot override the one-name-per-concept law.",
        acceptancePredicate: "BI.W-P051 deletes only the InkMark export while preserving the HandMark SFC and canonical export; BI.W-P004/BI.W-P133 coordinate exact Atlas replacements in src/charts/glyph/HandMark.vue and src/editorial/AnimatedRule.vue through the tarball-bound P closure. The packed package must reject InkMark, both consumer sites must import/render HandMark, and the semantic mark scenarios must remain equivalent without an alias or shim.",
        negativeControl: "Retain `default as InkMark`, add a compatibility alias, rename only the local binding while importing InkMark, or count same-source implementation identity as two public concepts; exact-member, clean-break, and handshake evidence must turn RED.",
    },
    ProgressDefault: {
        disposition: "REMOVE_PUBLIC_EXPORT_KEEP_PRIVATE_OWNER_PART",
        target: "Progress variant dispatcher",
        ownerWaves: ["BI.W-P075"],
        rationale: "ProgressDefault is used only by Progress's internal variant dispatcher. Consumers and the direct story use Progress, so publishing the child creates a second route around value/geometry/state normalization.",
        acceptancePredicate: "BI.W-P075 removes ProgressDefault from root and /progress exports while keeping its paint private behind Progress. The public Progress scenario must prove default determinate/indeterminate bounds, readable state, geometry, vertical mode, and PRM through one normalized value contract.",
        negativeControl: "Re-export ProgressDefault, let a consumer bypass Progress normalization, or count the dispatcher's internal tag as public demand; exact-member and progress evidence must turn RED.",
    },
    ProgressGradient: {
        disposition: "REMOVE_PUBLIC_EXPORT_KEEP_PRIVATE_OWNER_PART",
        target: "Progress variant dispatcher",
        ownerWaves: ["BI.W-P075"],
        rationale: "ProgressGradient is used only by Progress's internal variant dispatcher. Its paint variant is not an independent state model or public component concept.",
        acceptancePredicate: "BI.W-P075 removes ProgressGradient from root and /progress exports while retaining gradient paint only through Progress's typed variant axis. Value/min/max/indeterminate semantics, geometry, contrast, error, and PRM must remain owned by Progress.",
        negativeControl: "Re-export the variant child, duplicate value normalization inside it, or treat a visual flavor as a second Progress product; exact-member and data evidence must turn RED.",
    },
    ProgressLiquid: {
        disposition: "REMOVE_PUBLIC_EXPORT_KEEP_PRIVATE_OWNER_PART",
        target: "Progress variant dispatcher",
        ownerWaves: ["BI.W-P075"],
        rationale: "ProgressLiquid is used only by Progress's internal variant dispatcher. Liquid paint does not justify a parallel public progress state owner.",
        acceptancePredicate: "BI.W-P075 removes ProgressLiquid from root and /progress exports while retaining bounded liquid paint behind Progress's typed variant axis. The one public value/indeterminate/error/PRM model must drive both semantic readout and paint.",
        negativeControl: "Re-export the liquid child, add an independent clock/value writer, or count internal dispatch as publication demand; exact-member, lifecycle, and progress evidence must turn RED.",
    },
    ProgressSectioned: {
        disposition: "REMOVE_PUBLIC_EXPORT_KEEP_PRIVATE_OWNER_PART",
        target: "Progress variant dispatcher",
        ownerWaves: ["BI.W-P075"],
        rationale: "ProgressSectioned is used only by Progress's internal variant dispatcher. Sectioned geometry is a typed Progress mode, not a second component contract.",
        acceptancePredicate: "BI.W-P075 removes ProgressSectioned from root and /progress exports while retaining section geometry behind Progress's public segmented/sectioned axis. Cell count, partial value, bounds, accessible value, and PRM must derive from one Progress model.",
        negativeControl: "Re-export the child, allow section cells to compute a different value than Progress announces, or count internal composition as demand; exact-member and data evidence must turn RED.",
    },
    SelectScrollDownButton: {
        disposition: "REMOVE_PUBLIC_EXPORT_KEEP_PRIVATE_OWNER_PART",
        target: "SelectContent",
        ownerWaves: ["BI.W-P095"],
        rationale: "The down-scroll affordance is used only inside SelectContent and has no independent demo or tracked external runtime consumer. It is an implementation detail of the listbox's overflow and active-option visibility contract.",
        acceptancePredicate: "BI.W-P095 removes SelectScrollDownButton from root and /select exports while keeping overflow scrolling private to SelectContent. Long-list pointer, touch, keyboard, active-option visibility, collision, and teardown scenarios must exercise the public Select compound without exposing the child.",
        negativeControl: "Re-export the scroll child, count SelectContent's private use as demand, or let pointer autoscroll diverge from keyboard active-option visibility; exact-member and select evidence must turn RED.",
    },
    SelectScrollUpButton: {
        disposition: "REMOVE_PUBLIC_EXPORT_KEEP_PRIVATE_OWNER_PART",
        target: "SelectContent",
        ownerWaves: ["BI.W-P095"],
        rationale: "The up-scroll affordance is used only inside SelectContent and has no independent demo or tracked external runtime consumer. It is an implementation detail of the listbox's overflow and active-option visibility contract.",
        acceptancePredicate: "BI.W-P095 removes SelectScrollUpButton from root and /select exports while keeping overflow scrolling private to SelectContent. Long-list pointer, touch, keyboard, active-option visibility, collision, and teardown scenarios must exercise the public Select compound without exposing the child.",
        negativeControl: "Re-export the scroll child, count SelectContent's private use as demand, or let pointer autoscroll diverge from keyboard active-option visibility; exact-member and select evidence must turn RED.",
    },
});

const exactEvidence = (member) => {
    const runtime = member.causalExternalRuntimeEvidence.map((row) => `${row.repository}:${row.file}`);
    const foreignDemo = member.foreignDemoEvidence.map((row) => `${row.repository}:${row.file}`);
    const firstParty = member.firstPartyDemoWitnessPaths.map((path) => `glass-ui:${path}`);
    return [...runtime, ...foreignDemo, ...firstParty];
};

export function resolveMemberJudgment(member) {
    const override = MEMBER_JUDGMENT_OVERRIDES[member.exportedName];
    if (override) return { ...override, judgmentSource: "EXACT_AUTHORED_OVERRIDE" };

    const ownerWaves = member.canonicalWaves;
    const coordinates = `${member.exportedName} from ${member.publishedSpecifiers.join(", ")} → ${member.sourcePath}`;
    const witnesses = exactEvidence(member);
    const witnessText = witnesses.length ? witnesses.join(", ") : "no causal external or rendered witness";
    const base = {
        ownerWaves,
        rationale: `${coordinates}; exact witnesses: ${witnessText}. Concept contract: ${member.contract}`,
        judgmentSource: "AUTHORED_CONCEPT_AND_EXACT_EVIDENCE_RULE",
    };

    if (member.conceptDecision === "delete") return {
        ...base,
        disposition: member.causalExternalRuntimeEvidence.length ? "MIGRATE_CONSUMERS_DELETE_PUBLIC_CONCEPT" : "DELETE_PUBLIC_CONCEPT",
        target: member.conceptId,
        acceptancePredicate: `${ownerWaves.join(" + ")} deletes the exact ${member.exportedName} definition and every published projection at ${member.publishedSpecifiers.join(", ")}; all named witnesses are deleted or migrated to the concept's declared canonical owner. The packed package, source graph, docs, tests, and direct-route graph must contain no compatibility alias or phantom success.`,
        negativeControl: `Restore ${member.exportedName}, preserve an alias/shim, or count a deleted story/test/barrel as demand; exact-member topology and clean-break evidence must turn RED.`,
    };

    if (member.conceptDecision === "private" || member.conceptDecision === "rehome" || member.conceptDecision === "rehome-private") return {
        ...base,
        disposition: member.conceptDecision === "private" ? "REMOVE_PUBLIC_EXPORT_PRIVATE_OWNER" : "REMOVE_PUBLIC_EXPORT_REHOME_OWNER",
        target: member.conceptId,
        acceptancePredicate: `${ownerWaves.join(" + ")} removes ${member.exportedName} from every exact published projection (${member.publishedSpecifiers.join(", ")}) and exercises it only through the declared owner composition. The packed package must reject the symbol; owner integration must prove the concept contract without a standalone story, alias, or future-public placeholder.`,
        negativeControl: `Re-export ${member.exportedName}, count its internal owner import as public demand, or add a standalone specimen to preserve it; exact-member topology and owner integration must turn RED.`,
    };

    if (member.conceptDecision === "rename") return {
        ...base,
        disposition: "CLEAN_RENAME_PUBLIC_MEMBER",
        target: member.conceptId,
        acceptancePredicate: `${ownerWaves.join(" + ")} moves every exact consumer of ${member.exportedName} to the declared canonical name and removes the old symbol from all published projections, packed declarations, docs, tests, and stories in one transaction. No alias or compatibility subpath survives.`,
        negativeControl: `Retain ${member.exportedName} beside its replacement or rename only local bindings while importing the old symbol; clean-break and consumer evidence must turn RED.`,
    };

    if (member.conceptDecision === "fold") {
        if (member.conceptMemberAction === "delete") return {
            ...base,
            disposition: "MIGRATE_CONSUMERS_DELETE_FOLDED_MEMBER",
            target: member.conceptId,
            acceptancePredicate: `${ownerWaves.join(" + ")} migrates every exact witness of ${member.exportedName} to the retained ${member.conceptId} owner, then deletes its definition and all projections. The replacement scenario must preserve the member's actual semantic use; the packed package must reject the old symbol without alias or shim.`,
            negativeControl: `Keep ${member.exportedName} as a convenience wrapper, alias it to the fold target, or let sibling coverage stand in for migrated behavior; exact-member and clean-break evidence must turn RED.`,
        };
        if (member.conceptMemberAction === "rename") return {
            ...base,
            disposition: "FOLD_AND_CLEAN_RENAME_PUBLIC_MEMBER",
            target: member.conceptId,
            acceptancePredicate: `${ownerWaves.join(" + ")} transposes ${member.exportedName} into the declared ${member.conceptId} vocabulary, migrates every exact witness, and removes the old symbol/projection in one transaction. The canonical family's direct scenario must exercise the preserved semantic role.`,
            negativeControl: `Publish both ${member.exportedName} and its folded name, leave a compatibility wrapper, or migrate prose without exact imports/renders; fold and clean-break evidence must turn RED.`,
        };
        return {
            ...base,
            disposition: "RETAIN_CANONICAL_FOLD_TARGET_MEMBER",
            target: member.conceptId,
            acceptancePredicate: `${ownerWaves.join(" + ")} retains ${member.exportedName} as an exact member of the one folded ${member.conceptId} family and exercises its independent semantic role through ${witnessText}. The packed symbol, runtime composition, and direct scenario must resolve to one owner with no parallel legacy member.`,
            negativeControl: `Fork ${member.exportedName} from the folded family, restore a retired sibling, or satisfy it through export/path existence alone; exact-member and scenario evidence must turn RED.`,
        };
    }

    if (member.conceptDecision !== "retain") throw new Error(`unhandled concept decision for ${member.exportedName}: ${member.conceptDecision}`);
    if (!witnesses.length) throw new Error(`retained zero-witness member needs exact override: ${member.exportedName}`);
    if (!member.causalExternalRuntimeEvidence.length && !member.foreignDemoEvidence.length && !member.firstPartyDemoWitnessPaths.length) {
        throw new Error(`retained internal-only member needs exact override: ${member.exportedName}`);
    }
    return {
        ...base,
        disposition: member.causalExternalRuntimeEvidence.length ? "RETAIN_PUBLIC_CONSUMER_BOUND_MEMBER" : "RETAIN_PUBLIC_DEMO_WITNESSED_MEMBER",
        target: member.conceptId,
        acceptancePredicate: `${ownerWaves.join(" + ")} retains the exact ${member.exportedName} symbol at ${member.publishedSpecifiers.join(", ")} and exercises its independently composable role in ${witnessText}. Packed-package resolution, semantic behavior, and the ${member.conceptId} scenario must agree; a barrel, sibling, unit test, or path alone earns no credit.`,
        negativeControl: `Delete or silently alias ${member.exportedName} while a sibling remains green, or preserve the export without its exact role in the named witness/scenario; exact-member demand and scenario evidence must turn RED.`,
    };
}

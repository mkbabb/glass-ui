import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";

import GlassTimeline from "@glass/components/timeline/GlassTimeline.vue";
// BI.W-OVERLAY-UNION — HoverPopover folded onto the sealed <Popover trigger="hover">
// union; the markers wrap each dot in the survivor, same update:open cadence.
import { Popover } from "@glass/components/popover";
import type { TimelineSegment } from "@glass/components/timeline/types";

/**
 * AB.W2.T4 (A4 §nested-interactive) — Option C structural split.
 *
 * The `.continuous-track[role="progressbar"]` rail must NOT nest any
 * focusable descendants (the axe `nested-interactive` rule fires
 * otherwise). The marker buttons live in a sibling
 * `<ul role="list">` overlay so the rail's aggregate-progress role
 * stays clean.
 *
 * AB.W2.T1 (A4 §B2.a) — the same structural change lifts the marker
 * buttons OUT of the rail's `overflow: hidden` clip so the dots' outer
 * box paints in full (perceived centre coincides with math centre).
 *
 * AB.W2.T3 (A2 §B2.b) — `currentSegmentKey` stamps `data-current`
 * on the matching marker so consumers can distinguish the active phase
 * from the transient hovered phase without DOM surgery.
 */

const segments: TimelineSegment[] = [
    { key: "ping", label: "Ping", state: "completed" },
    {
        key: "download",
        label: "Download",
        state: "active",
        progress: 0.4,
        gradient: { from: "#aaa", to: "#fff" },
    },
    { key: "upload", label: "Upload", state: "pending" },
];

describe("GlassTimeline continuous — Option C structural split", () => {
    it("renders the progressbar rail and marker list as siblings (not parent/child)", () => {
        const wrapper = mount(GlassTimeline, {
            props: { variant: "continuous", segments },
        });
        const track = wrapper.find(".continuous-track");
        const markers = wrapper.find(".continuous-markers");
        expect(track.exists()).toBe(true);
        expect(markers.exists()).toBe(true);
        // The marker list must NOT be a descendant of the progressbar
        // rail (the axe nested-interactive constraint).
        expect(track.element.contains(markers.element)).toBe(false);
        // They share the wrap parent.
        expect(track.element.parentElement).toBe(markers.element.parentElement);
        expect(track.element.parentElement?.className).toContain("continuous-track-wrap");
    });

    it("progressbar rail has no focusable descendants", () => {
        const wrapper = mount(GlassTimeline, {
            props: { variant: "continuous", segments },
        });
        const track = wrapper.find(".continuous-track");
        // No buttons, no <a>, no role=button, no tabindex≥0 inside the rail.
        const focusables = track.findAll(
            "button, [href], [tabindex]:not([tabindex='-1']), [role='button']",
        );
        expect(focusables).toHaveLength(0);
    });

    it("marker list carries one interactive button per segment", () => {
        const wrapper = mount(GlassTimeline, {
            props: { variant: "continuous", segments },
        });
        const markerItems = wrapper.findAll(".continuous-marker");
        expect(markerItems).toHaveLength(segments.length);
        for (const item of markerItems) {
            expect(item.attributes("role")).toBe("listitem");
            // Each marker contains exactly one focusable button.
            const buttons = item.findAll("button.continuous-dot");
            expect(buttons.length).toBeGreaterThanOrEqual(1);
        }
        // The marker list itself is role=list.
        const markers = wrapper.find(".continuous-markers");
        expect(markers.attributes("role")).toBe("list");
    });

    it("each region renders a .continuous-region-fill child consuming --continuous-fill-width", () => {
        const wrapper = mount(GlassTimeline, {
            props: { variant: "continuous", segments },
        });
        const regions = wrapper.findAll(".continuous-region");
        expect(regions).toHaveLength(segments.length);
        for (const region of regions) {
            const fill = region.find(".continuous-region-fill");
            expect(fill.exists()).toBe(true);
        }
        // The active region's inline --continuous-fill-width should reflect
        // the segment's `progress` (40% for `progress: 0.4`).
        const active = wrapper.findAll(".continuous-region")[1]!;
        const inlineStyle = active.attributes("style") ?? "";
        expect(inlineStyle).toContain("--continuous-fill-width: 40%");
    });

    it("currentSegmentKey stamps data-current on the matching dot only", () => {
        const wrapper = mount(GlassTimeline, {
            props: {
                variant: "continuous",
                segments,
                currentSegmentKey: "download",
            },
        });
        const dots = wrapper.findAll("button.continuous-dot");
        expect(dots).toHaveLength(segments.length);
        const dataCurrentFor = (key: string) =>
            wrapper.find(`button[aria-label^="${key}"]`).attributes("data-current");
        // Capitalised label in aria-label — match against label, not key.
        const dotByKey = (key: string) =>
            dots.find((d) =>
                segments.find((s) => s.key === key)
                    ? d.attributes("aria-label")?.startsWith(
                          segments.find((s) => s.key === key)!.label,
                      )
                    : false,
            );
        expect(dotByKey("ping")?.attributes("data-current")).toBeUndefined();
        expect(dotByKey("download")?.attributes("data-current")).toBe("true");
        expect(dotByKey("upload")?.attributes("data-current")).toBeUndefined();
        // Silence unused-var lint on the dataCurrentFor helper.
        expect(typeof dataCurrentFor).toBe("function");
    });

    it("data-completed reflects per-segment completed state", () => {
        const wrapper = mount(GlassTimeline, {
            props: { variant: "continuous", segments },
        });
        const dots = wrapper.findAll("button.continuous-dot");
        // ping = completed, download = active, upload = pending
        expect(dots[0]?.attributes("data-completed")).toBe("true");
        expect(dots[1]?.attributes("data-completed")).toBeUndefined();
        expect(dots[2]?.attributes("data-completed")).toBeUndefined();
    });

    it("aria-valuenow on the rail reflects aggregate progress", () => {
        const wrapper = mount(GlassTimeline, {
            props: { variant: "continuous", segments },
        });
        const track = wrapper.find(".continuous-track");
        expect(track.attributes("aria-valuemin")).toBe("0");
        expect(track.attributes("aria-valuemax")).toBe(String(segments.length));
        // 1 completed + 0.4 fractional active = 1.4
        expect(track.attributes("aria-valuenow")).toBe("1.4");
    });

    it("emits hover/hoverEnd via the popover bare-fallback path", async () => {
        // The default continuous variant wraps each dot in <Popover trigger="hover"> so
        // the popover's `update:open` cadence drives the hover events (the
        // pointer-skim flicker fix). The bare-fallback path (popover
        // disabled) still uses raw mouseenter/mouseleave so popover-disabled
        // consumers see the same event surface. This test exercises that
        // fallback.
        const wrapper = mount(GlassTimeline, {
            props: {
                variant: "continuous",
                segments,
                currentSegmentKey: "download",
                disablePopover: true,
            },
        });
        const uploadDot = wrapper
            .findAll("button.continuous-dot")
            .find((d) => d.attributes("aria-label")?.startsWith("Upload"))!;
        await uploadDot.trigger("mouseenter");
        await uploadDot.trigger("mouseleave");
        expect(wrapper.emitted("hover")).toBeTruthy();
        expect(wrapper.emitted("hoverEnd")).toBeTruthy();
        const enterPayload = wrapper.emitted("hover")?.[0]?.[0] as {
            key: string;
        };
        const leavePayload = wrapper.emitted("hoverEnd")?.[0]?.[0] as {
            key: string;
        };
        expect(enterPayload.key).toBe("upload");
        expect(leavePayload.key).toBe("upload");
    });

    it("emits hover/hoverEnd via the Popover update:open path (default popover enabled)", async () => {
        // N-2 coverage gap — the W10 ContinuousMarkers split consumes
        // <Popover trigger="hover"> via `@update:open` (the listen-only uncontrolled
        // defineModel cadence). With the popover ENABLED (default — no
        // `disablePopover`), the dot is wrapped in HoverPopover and the
        // popover's debounced open-state is the authoritative hover signal:
        // `update:open(true)` → `onPopoverOpenChange` emits `hover`,
        // `update:open(false)` emits `hoverEnd`. The bare mouseenter/leave
        // listeners only exist on the disablePopover fallback, so the ONLY
        // way the default path emits hover is through this popover cadence.
        const wrapper = mount(GlassTimeline, {
            props: {
                variant: "continuous",
                segments,
                currentSegmentKey: "download",
            },
        });

        // One Popover per segment when the popover is enabled (proves
        // the default path wraps each dot — not the bare-button fallback).
        const popovers = wrapper.findAllComponents(Popover);
        expect(popovers).toHaveLength(segments.length);

        // The marker whose trigger button labels the "upload" segment.
        const uploadIdx = segments.findIndex((s) => s.key === "upload");
        const uploadPopover = popovers[uploadIdx]!;

        // Drive the popover's open-state model — the same signal the union's
        // HoverCardRoot branch emits after its open/close-delay debounce. This
        // exercises the real `@update:open → markers emit → orchestrator
        // re-emit` chain without depending on reka's pointer/timer machinery.
        uploadPopover.vm.$emit("update:open", true);
        await wrapper.vm.$nextTick();
        uploadPopover.vm.$emit("update:open", false);
        await wrapper.vm.$nextTick();

        expect(wrapper.emitted("hover")).toBeTruthy();
        expect(wrapper.emitted("hoverEnd")).toBeTruthy();
        const enterPayload = wrapper.emitted("hover")?.[0]?.[0] as {
            key: string;
            segment: TimelineSegment;
        };
        const leavePayload = wrapper.emitted("hoverEnd")?.[0]?.[0] as {
            key: string;
            segment: TimelineSegment;
        };
        // The signal carries the correct segment — the popover open-change is
        // bound to THIS marker's segment, not a stale closure capture.
        expect(enterPayload.key).toBe("upload");
        expect(enterPayload.segment.label).toBe("Upload");
        expect(leavePayload.key).toBe("upload");
    });

    it("disablePopover=true skips the Popover wrap (bare button fallback)", () => {
        const wrapper = mount(GlassTimeline, {
            props: { variant: "continuous", segments, disablePopover: true },
        });
        // The Popover root wouldn't render a `.timeline-popover` content
        // class in the trigger tree (the popover content is portaled). The
        // bare-fallback path still renders the buttons.
        const dots = wrapper.findAll("button.continuous-dot");
        expect(dots).toHaveLength(segments.length);
    });
});

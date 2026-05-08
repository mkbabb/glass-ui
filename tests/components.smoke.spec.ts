import { mount } from "@vue/test-utils";
import { nextTick, ref } from "vue";
import { describe, expect, it } from "vitest";
import {
    Alert,
    AlertDescription,
    AlertTitle,
    Badge,
    Button,
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    Input,
    Label,
    MetricPill,
    Progress,
    Section,
    Separator,
    Skeleton,
    Textarea,
    badgeVariants,
    buttonVariants,
} from "../src/index";
import { DarkModeToggle } from "../src/controls";
import { DockLayer, DockLayerGroup, GlassDock } from "../src/dock";
import { MetricBadge } from "../src/metric-badge";
import { PaperBackdrop } from "../src/paper-backdrop";
import { Pulse } from "../src/pulse";
import { StatusDot } from "../src/status-dot";
import { BouncyToggle } from "../src/tabs";
import { ToggleChip, toggleChipVariants } from "../src/toggle-chip";

describe("component smoke coverage", () => {
    it("renders Button slot content", () => {
        const wrapper = mount(Button, { slots: { default: "Submit" } });
        expect(wrapper.text()).toBe("Submit");
        expect(wrapper.element.tagName.toLowerCase()).toBe("button");
    });

    it("applies Button variant classes", () => {
        expect(buttonVariants({ variant: "destructive" })).toContain("bg-destructive");
    });

    it("renders Badge slot content", () => {
        const wrapper = mount(Badge, { slots: { default: "New" } });
        expect(wrapper.text()).toBe("New");
    });

    it("applies Badge outline variant classes", () => {
        expect(badgeVariants({ variant: "outline" })).toContain("text-foreground");
    });

    it("renders Card slots through the compound pieces", () => {
        const wrapper = mount(Card, {
            slots: {
                default: [
                    mount(CardHeader, {
                        slots: { default: mount(CardTitle, { slots: { default: "Title" } }).html() },
                    }).html(),
                    mount(CardContent, { slots: { default: "Body" } }).html(),
                ].join(""),
            },
        });
        expect(wrapper.text()).toContain("Title");
        expect(wrapper.text()).toContain("Body");
    });

    it("supports plain Card styling", () => {
        const wrapper = mount(Card, { props: { plain: true } });
        expect(wrapper.classes().join(" ")).toContain("scrollbar-hidden");
    });

    it("updates Input model value", async () => {
        const wrapper = mount(Input, { props: { modelValue: "a" } });
        await wrapper.setValue("abc");
        expect(wrapper.emitted("update:modelValue")?.at(-1)).toEqual(["abc"]);
    });

    it("updates Textarea model value", async () => {
        const wrapper = mount(Textarea, { props: { modelValue: "a" } });
        await wrapper.setValue("abc");
        expect(wrapper.emitted("update:modelValue")?.at(-1)).toEqual(["abc"]);
    });

    it("renders Label text", () => {
        expect(mount(Label, { slots: { default: "Name" } }).text()).toBe("Name");
    });

    it("renders Separator as decorative by default", () => {
        const wrapper = mount(Separator);
        expect(wrapper.exists()).toBe(true);
    });

    it("renders Skeleton with custom class", () => {
        const wrapper = mount(Skeleton, { props: { class: "w-10" } });
        expect(wrapper.classes()).toContain("w-10");
    });

    it("renders Alert title and description", () => {
        const wrapper = mount(Alert, {
            slots: {
                default: [
                    mount(AlertTitle, { slots: { default: "Heads up" } }).html(),
                    mount(AlertDescription, { slots: { default: "Details" } }).html(),
                ].join(""),
            },
        });
        expect(wrapper.text()).toContain("Heads up");
        expect(wrapper.text()).toContain("Details");
    });

    it("positions Progress indicator from model value", () => {
        const wrapper = mount(Progress, { props: { modelValue: 75 } });
        expect(wrapper.html()).toContain("translateX(-25%)");
    });

    it("renders MetricBadge amount and unit", () => {
        const wrapper = mount(MetricBadge, {
            props: { amount: 42, unit: "ms", color: "red" },
        });
        expect(wrapper.text()).toContain("42");
        expect(wrapper.text()).toContain("ms");
        expect(wrapper.classes()).toContain("metric-badge");
    });

    it("renders MetricBadge placeholder for empty amount", () => {
        const wrapper = mount(MetricBadge, { props: { amount: null, placeholder: "n/a" } });
        expect(wrapper.text()).toBe("n/a");
    });

    it("wraps amount + unit in a single row when MetricBadge labelPosition is stacked", () => {
        const wrapper = mount(MetricBadge, {
            props: {
                label: "DOWNLOAD",
                labelPosition: "stacked",
                amount: 730,
                unit: "Mbps",
                size: "lg",
            },
        });
        const root = wrapper.find(".metric-badge");
        expect(root.classes()).toContain("metric-badge--label-stacked");
        const fullLabel = root.find(".metric-badge__label--full");
        expect(fullLabel.exists()).toBe(true);
        const row = root.find(".metric-badge__row");
        expect(row.exists()).toBe(true);
        const amount = row.find(".metric-badge__amount");
        const unit = row.find(".metric-badge__unit");
        expect(amount.exists()).toBe(true);
        expect(unit.exists()).toBe(true);
        expect(amount.text()).toBe("730");
        expect(unit.text()).toBe("Mbps");
    });

    it("renders MetricPill with stacked-label defaults baked in", () => {
        const wrapper = mount(MetricPill, {
            props: {
                label: "DOWNLOAD",
                amount: 730,
                unit: "Mbps",
                color: "var(--viz-fourier)",
            },
        });
        const root = wrapper.find(".metric-badge");
        expect(root.exists()).toBe(true);
        expect(root.classes()).toContain("metric-pill");
        expect(root.attributes("data-density")).toBe("spacious");
        expect(root.classes()).toContain("metric-badge--label-stacked");
        expect(root.attributes("data-size")).toBe("lg");
        const fullLabel = root.find(".metric-badge__label--full");
        expect(fullLabel.text()).toBe("DOWNLOAD");
        const row = root.find(".metric-badge__row");
        expect(row.exists()).toBe(true);
        expect(row.find(".metric-badge__amount").text()).toBe("730");
        expect(row.find(".metric-badge__unit").text()).toBe("Mbps");
    });

    it("forwards MetricPill density override onto data-density (canonical rail)", () => {
        const wrapper = mount(MetricPill, {
            props: {
                label: "LATENCY",
                amount: 36,
                unit: "ms",
                density: "comfortable",
            },
        });
        const root = wrapper.find(".metric-badge");
        expect(root.attributes("data-density")).toBe("comfortable");
        expect(root.classes()).not.toContain("metric-pill--density-spacious");
        expect(root.classes()).not.toContain("metric-pill--density-comfortable");
    });

    it("keeps MetricBadge inline mode flat (no row wrapper)", () => {
        const wrapper = mount(MetricBadge, {
            props: {
                label: "Latency",
                labelPosition: "inline",
                amount: 36,
                unit: "ms",
                size: "lg",
            },
        });
        expect(wrapper.find(".metric-badge__row").exists()).toBe(false);
        expect(wrapper.find(".metric-badge__amount").exists()).toBe(true);
        expect(wrapper.find(".metric-badge__unit").exists()).toBe(true);
    });

    it("renders StatusDot label", () => {
        expect(mount(StatusDot, { props: { label: "Live" } }).text()).toContain("Live");
    });

    it("renders custom StatusDot color", () => {
        const wrapper = mount(StatusDot, {
            props: { variant: "custom", color: "rgb(1, 2, 3)" },
        });
        expect(wrapper.html()).toContain("rgb(1, 2, 3)");
    });

    it("renders Pulse dots according to count", () => {
        const wrapper = mount(Pulse, { props: { count: 4 } });
        expect(wrapper.findAll(".pulse-dot")).toHaveLength(4);
    });

    it("renders Pulse ring variant", () => {
        const wrapper = mount(Pulse, { props: { variant: "ring" } });
        expect(wrapper.find(".pulse-ring").exists()).toBe(true);
    });

    it("applies PaperBackdrop opacity", () => {
        const wrapper = mount(PaperBackdrop, { props: { opacity: 0.5 } });
        expect(wrapper.attributes("style")).toContain("opacity: 0.5");
    });

    it("V.W3.T7 — Section composes typography ladder via tone variant", () => {
        const wrapper = mount(Section, {
            props: { title: "Audio settings", description: "Configure inputs and outputs.", tone: "heading" },
            slots: { default: "<div>body</div>" },
        });
        expect(wrapper.find("section").exists()).toBe(true);
        expect(wrapper.find("h2").text()).toBe("Audio settings");
        expect(wrapper.find("h2").classes()).toContain("text-heading");
        expect(wrapper.find("p").text()).toBe("Configure inputs and outputs.");
        expect(wrapper.find("p").classes()).toContain("section-description");
        expect(wrapper.text()).toContain("body");
    });

    it("V.W3.T7 — Section tone='label' composes the .section-label class", () => {
        const wrapper = mount(Section, {
            props: { title: "MICROPHONE LEVELS", tone: "label" },
        });
        expect(wrapper.find("h2").classes()).toContain("section-label");
    });

    it("V.W3.T1 — density-rail probe: GlassDock + DockGroup + MetricPill all expose data-density on root", async () => {
        // GlassDock — default density is "comfortable"
        const dock = mount(GlassDock, { slots: { default: "<button>Tool</button>" } });
        expect(dock.find(".glass-dock").attributes("data-density")).toBe("comfortable");
        expect(dock.find(".glass-dock").classes()).not.toContain("density-comfortable");

        // DockGroup — default is undefined; explicit "comfortable" sets the attr
        const { default: DockGroup } = await import("../src/components/custom/dock-group/DockGroup.vue");
        const group = mount(DockGroup, {
            props: { density: "comfortable" },
            slots: { default: "<span>child</span>" },
        });
        expect(group.find(".dock-group").attributes("data-density")).toBe("comfortable");

        // MetricPill — default is "spacious"; passing "comfortable" sets the attr on root
        const pill = mount(MetricPill, {
            props: { label: "PING", amount: 12, unit: "ms", density: "comfortable" },
        });
        expect(pill.find(".metric-badge").attributes("data-density")).toBe("comfortable");
    });

    it("renders the GlassDock rail variant", () => {
        const wrapper = mount(GlassDock, {
            props: { variant: "rail" },
            slots: { default: "<button>Tool</button>" },
        });
        expect(wrapper.text()).toContain("Tool");
        expect(wrapper.classes()).toContain("variant-rail");
        expect(wrapper.classes()).toContain("vertical");
    });

    it("renders rounded GlassDock rail shape", () => {
        const wrapper = mount(GlassDock, {
            props: { variant: "rail", shape: "rounded" },
        });
        expect(wrapper.classes()).toContain("shape-rounded");
    });

    it("emits container-query host attributes when GlassDock has containerName", () => {
        const wrapper = mount(GlassDock, {
            props: { containerName: "pill-cluster", alwaysExpanded: true },
            slots: { default: "<span>child</span>" },
        });
        const root = wrapper.find(".glass-dock");
        expect(root.attributes("data-container-name")).toBe("pill-cluster");
        const style = root.attributes("style") ?? "";
        expect(style).toContain("container-type: inline-size");
        expect(style).toContain("container-name: pill-cluster");
        expect(style).toContain("overflow: visible");
    });

    it("preserves the default overflow shell when GlassDock has no containerName", () => {
        const wrapper = mount(GlassDock, {
            props: { alwaysExpanded: true },
            slots: { default: "<span>child</span>" },
        });
        const root = wrapper.find(".glass-dock");
        expect(root.attributes("data-container-name")).toBeUndefined();
        const style = root.attributes("style") ?? "";
        expect(style).not.toContain("container-type");
    });

    it("lets DockLayerGroup inherit vertical rail orientation", async () => {
        const wrapper = mount({
            components: { DockLayer, DockLayerGroup, GlassDock },
            setup() {
                const active = ref("one");
                return { active };
            },
            template: `
                <GlassDock variant="rail">
                    <DockLayerGroup v-model:active="active">
                        <DockLayer id="one" label="One">One</DockLayer>
                        <DockLayer id="two" label="Two">Two</DockLayer>
                    </DockLayerGroup>
                </GlassDock>
            `,
        });
        await nextTick();
        expect(wrapper.find(".dock-layer-group").classes()).toContain("vertical");
    });

    it("renders DarkModeToggle with bounded size contract", () => {
        const wrapper = mount(DarkModeToggle, {
            props: { size: "sm" },
        });
        const button = wrapper.find(".dark-mode-toggle-button");
        expect(button.exists()).toBe(true);
        expect(button.attributes("data-size")).toBe("sm");
    });

    it("renders ToggleChip slot content", () => {
        expect(mount(ToggleChip, { slots: { default: "Chip" } }).text()).toBe("Chip");
    });

    it("applies ToggleChip cell variant classes", () => {
        expect(toggleChipVariants({ variant: "cell" })).toContain("flex-col");
    });

    it("renders BouncyToggle options", () => {
        const wrapper = mount(BouncyToggle, {
            props: {
                options: [
                    { label: "One", value: "one" },
                    { label: "Two", value: "two" },
                ],
                modelValue: "one",
            },
        });
        expect(wrapper.text()).toContain("One");
        expect(wrapper.text()).toContain("Two");
    });

    it("emits BouncyToggle single-select updates", async () => {
        const wrapper = mount(BouncyToggle, {
            props: {
                options: [
                    { label: "One", value: "one" },
                    { label: "Two", value: "two" },
                ],
                modelValue: "one",
            },
        });
        await wrapper.findAll("button")[1].trigger("click");
        expect(wrapper.emitted("update:modelValue")?.[0]).toEqual(["two"]);
    });
});

import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import {
    Alert,
    AlertDescription,
    AlertTitle,
    Badge,
    BouncyToggle,
    Button,
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    GlassDock,
    Input,
    Label,
    MetricBadge,
    PaperBackdrop,
    Progress,
    Pulse,
    Separator,
    Skeleton,
    StatusDot,
    Textarea,
    ToggleChip,
    badgeVariants,
    buttonVariants,
    toggleChipVariants,
} from "@/index";

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
    });

    it("renders MetricBadge placeholder for empty amount", () => {
        const wrapper = mount(MetricBadge, { props: { amount: null, placeholder: "n/a" } });
        expect(wrapper.text()).toBe("n/a");
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

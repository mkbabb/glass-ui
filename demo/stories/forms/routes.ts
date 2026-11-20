import { FormInput } from "@lucide/vue";
import type { SectionRoutes } from "../manifest/section";

export const section: SectionRoutes = {
    id: "forms",
    title: "Forms",
    icon: FormInput,
    lede: "Fields, choices, sliders and chips.",
    routes: [
        { id: "inputs", title: "Inputs", lede: "A single-line field that tells you when its value is wrong." },
        { id: "textarea", title: "Textarea", lede: "A multi-line field that grows with its content." },
        { id: "select", title: "Select", lede: "Pick one option from a list that opens over the page." },
        { id: "checks", title: "Checkbox · Radio · Switch", lede: "Controls for choosing one option or several." },
        { id: "slider", title: "Slider", lede: "Pick a value along a track." },
        { id: "number-field", title: "Number Field", lede: "Enter a bounded number, or step it up and down." },
        { id: "toggle", title: "Toggle Group", lede: "A strip of buttons that stay pressed." },
        { id: "chip", title: "Chip", lede: "Small labels you can select, act on or remove." },
        { id: "labeled-field", title: "Labeled Field", lede: "A control with its label, description and error." },
    ],
};

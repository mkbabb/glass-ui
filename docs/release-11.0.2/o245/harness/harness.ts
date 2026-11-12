// A gloss card like daraksha's: an open PopoverContent card in dark on a plain dark
// ground, three lines of text and nothing drawn by the host. Imports reach `src/`.
import "../../../../demo/demo.css";
import { createApp, h } from "vue";
import { Popover, PopoverContent, PopoverTrigger } from "../../../../src/components/popover";

document.body.style.cssText = "margin:0;min-height:100vh;background:#2a1f1f";
createApp({
    setup: () => () =>
        h("div", { style: "padding:120px 0;display:flex;justify-content:center" }, [
            h(Popover, { defaultOpen: true }, () => [
                h(PopoverTrigger, { "data-probe": "trigger" }, () => "Ad-Dhuhaa"),
                h(PopoverContent, { "data-probe": "card", style: "width:336px;text-align:center" }, () => [
                    h("p", "Ad-Dhuhaa"),
                    h("p", "The Morning Hours"),
                    h("p", { style: "font-size:12px" }, "Text: Tanzil (licence) · Translation: Pickthall, 1930"),
                ]),
            ]),
        ]),
}).mount("#app");
document.body.dataset.ready = "1";

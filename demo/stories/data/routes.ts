import { Database } from "@lucide/vue";
import type { SectionRoutes } from "../manifest/section";

export const section: SectionRoutes = {
    id: "data",
    title: "Data",
    icon: Database,
    lede: "Tables, lists, timelines and metrics.",
    routes: [
        { id: "table", title: "Table", lede: "Rows and columns with a caption and totals." },
        { id: "data-table", title: "Data Table", lede: "A table you can sort and select." },
        { id: "sortable-list", title: "Sortable List", lede: "Reorder items by dragging or with the keyboard." },
        { id: "infinite-scroll", title: "Infinite Scroll", lede: "A feed that loads more as you reach its end." },
        { id: "timeline", title: "Timeline", lede: "Phases and marks along one axis." },
        { id: "metric", title: "Metric", lede: "A number with its label." },
    ],
};

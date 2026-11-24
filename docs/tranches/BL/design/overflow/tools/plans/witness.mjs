#!/usr/bin/env node
// witness.mjs [cure-port] [only-prefix] > plan.json: the RED/GREEN plan. Every case runs
// on the base tree (release/11.1.1, port 5391) and the cure build (port 5392 = cure v1,
// 5393 = cure v2, 5394 = cure v3, 5395 = cure v4, the patch after the fold, 5396 = cure v5,
// round 2 with value.js's items), in the cells
// named. The fold's cases (names from B1 on) read /ovf.html?fold, the critique's
// compositions.
// only-prefix keeps the cases whose name starts with it.
// Run: node tools/inspect.mjs --engine <e> --plan tools/plans/<plan>.json --out ...
// cure-port may be a comma list (5395,5396): each case then runs on the base and on each.
const CURE_PORTS = (process.argv[2] || "5392").split(",").map(Number);
const ONLY = (process.argv[3] || "").split(",");
const LONG = "Quarterly enrollment by district and program, all years";
const TOKEN = "district_enrollment_by_program_quarterly_2019-2026.csv";
const setText = (sel, i, text) =>
    `eval:(()=>{const e=document.querySelectorAll(${JSON.stringify(sel)})[${i}];if(!e)return 'none';const w=document.createTreeWalker(e,NodeFilter.SHOW_TEXT);let t,best=null;while((t=w.nextNode()))if(t.textContent.trim().length>1&&(!best||t.textContent.length>best.textContent.length))best=t;if(best)best.textContent=${JSON.stringify(text)};return 'ok'})()`;
const sl = (sel) => `eval:document.querySelector(${JSON.stringify(sel)})?.scrollLeft`;
// Lines of text in each element: distinct tops of its text's client rects.
const lines = (sel) =>
    `eval:[...document.querySelectorAll(${JSON.stringify(sel)})].map(e=>{const r=document.createRange();r.selectNodeContents(e);const t=new Set();for(const q of r.getClientRects())if(q.width>0.5&&q.height>4)t.add(Math.round(q.top));const b=e.getBoundingClientRect();return e.textContent.trim().slice(0,14)+' w'+Math.round(b.width*10)/10+' L'+t.size})`;
// Every element inside a box that is wider than its own box, or past the box's edges.
const spills = (sel) =>
    `eval:(()=>{const box=document.querySelector(${JSON.stringify(sel)});if(!box)return 'none';const R=box.getBoundingClientRect();const o=[];for(const e of box.querySelectorAll('*')){const c=getComputedStyle(e);if(c.display==='none')continue;const r=e.getBoundingClientRect();if(!r.width)continue;const past=Math.max(R.left-r.left,r.right-R.right);const inner=e.scrollWidth-e.clientWidth;if((past>0.5||(e.clientWidth>0&&inner>1&&!/^(INPUT|TEXTAREA)$/.test(e.tagName)))&&o.length<8)o.push((e.getAttribute('data-slot')||e.className.toString().split(' ')[0]||e.tagName)+' past '+Math.round(past*10)/10+' sw-cw '+inner+' ox '+c.overflowX)}return {box:box.scrollWidth+'/'+box.clientWidth,n:o.length,o}})()`;

const cases = [
    {
        name: "F1 SegmentedTabs in the Filters sheet (atlas's Filters view)",
        cells: ["390t-light", "390t-dark", "1440-light"],
        url: "/ovf.html",
        do: ["tap:[data-testid=ovf-open-filters]", "wait:2500", "swipe:[data-testid=ovf-filters-body]@-150@0", sl("[data-testid=ovf-filters-body]")],
        sel: ["[data-testid=ovf-filters-body]", "[data-testid=ovf-filters] .segmented-tabs", "[data-testid=ovf-filters] .segmented-tab"],
    },
    {
        name: "F1 SegmentedTabs long label in a demo variant row",
        cells: ["390t-light", "1440-light"],
        url: "/foundations/colors",
        do: [setText(".story-variant-row .segmented-tab", 0, LONG), "wait:600", "swipe:main@-150@0", sl("main")],
        sel: ["main", ".story-variant-row .segmented-tabs"],
    },
    {
        name: "F2 detented left sheet at its 0.4 rung",
        cells: ["390t-light", "1440-light"],
        url: "/containers/sheet",
        do: [
            "key:Escape",
            "wait:700",
            "eval:[...document.querySelectorAll('.story-variant-row')].find(r=>r.textContent.includes('Edge')).querySelectorAll('.segmented-tab')[3].click()",
            "wait:1200",
            "key:Escape",
            "wait:700",
            "eval:[...document.querySelectorAll('.story-variant-row')].find(r=>r.textContent.includes('Detents')).querySelectorAll('.segmented-tab')[1].click()",
            "wait:2500",
        ],
        sel: ["[data-slot=sheet-content]", "[data-slot=sheet-content-region]", "[data-slot=sheet-content] [data-slot=dialog-footer]"],
    },
    {
        name: "F3 DropdownMenu rows with a long word",
        cells: ["390t-light", "1440-light"],
        url: "/ovf.html",
        do: ["tap:[data-testid=ovf-open-menu]", "wait:1200"],
        sel: ["[data-slot=menu-content]", "[data-slot=menu-content] [data-slot=menu-item]", "[data-slot=menu-content] [data-slot=menu-sub-trigger]"],
    },
    {
        name: "F3 Popover body with a long word",
        cells: ["390t-light", "1440-light"],
        url: "/ovf.html",
        do: ["tap:[data-testid=ovf-open-popover]", "wait:1200"],
        sel: ["[data-slot=popover-content]", "[data-slot=popover-content] p"],
    },
    {
        name: "F3 Select options with a long word (phone sheet form at 390, popover at 1440)",
        cells: ["390t-light", "1440-light"],
        url: "/ovf.html",
        do: ["tap:[data-testid=ovf-open-select]", "wait:1200"],
        sel: ["[data-slot=select-content]", "[data-slot=select-viewport]", "[data-slot=select-viewport] [role=option]"],
    },
    {
        name: "F3 narrow column: Command row, Accordion trigger, Chip, ToggleGroup, SegmentedTabs",
        cells: ["390t-light", "1440-light"],
        url: "/ovf.html",
        do: [],
        sel: [
            "[data-testid=ovf-narrow]",
            "[data-testid=ovf-narrow] [data-slot=command-list]",
            "[data-testid=ovf-narrow] [data-slot=command-item]",
            "[data-testid=ovf-narrow] [data-slot=accordion-trigger]",
            "[data-testid=ovf-narrow] [data-slot=accordion-content]",
            "[data-testid=ovf-narrow] .glass-chip",
            "[data-testid=ovf-narrow] [data-slot=toggle-group]",
            "[data-testid=ovf-narrow] .segmented-tabs",
        ],
    },
    {
        name: "F3 ToggleGroup item with a long word in a demo stage",
        cells: ["390t-light"],
        url: "/forms/toggle",
        do: [setText("main [data-slot=toggle-group-item]", 0, TOKEN), "wait:600"],
        sel: ["main [data-slot=toggle-group]", "main [data-slot=toggle-group-item]"],
    },
    {
        name: "F3 Button with a long word in a demo stage",
        cells: ["390t-light"],
        url: "/display/buttons",
        do: [setText("main .buttons-stage button", 0, TOKEN), "wait:600"],
        sel: ["main .buttons-stage", "main .buttons-stage button"],
    },
    {
        name: "F3 Label with a long word over an Input",
        cells: ["390t-light"],
        url: "/forms/inputs",
        do: [setText("main [data-slot=label]", 0, TOKEN), "wait:600"],
        sel: ["main .inputs-stage", "main .inputs-stage-field", "main [data-slot=label]", "main [data-slot=input]"],
    },
    {
        name: "R ExpandableContainer holding a Table with a long cell",
        cells: ["390t-light"],
        url: "/containers/expandable-container",
        do: [setText("main td", 0, TOKEN), "wait:600"],
        sel: ["main .expandable-stage", "main .expandable-container", "main [data-slot=table-container]", "main [data-slot=table]"],
    },
    {
        name: "F4 Timeline end marks past the plate",
        cells: ["390t-light", "1440-light"],
        url: "/data/timeline",
        do: [
            "eval:(()=>{const tl=document.querySelector('.tl');const r=tl.getBoundingClientRect();let o=0;for(const s of tl.querySelectorAll('.tl__mark-seat')){const q=s.getBoundingClientRect();o=Math.max(o,r.left-q.left,q.right-r.right)}return {overhang:Math.round(o*10)/10,tlW:Math.round(r.width)}})()",
        ],
        sel: ["main .tl", "main .tl__marks", "main .tl__track"],
    },
    {
        name: "F2b Dialog description with a long word",
        cells: ["390t-light", "1440-light"],
        url: "/containers/dialog",
        // No click: the demo page opens the dialog on arrival (dialog.vue: open-on-load),
        // and a click on the trigger lands on the scrim and closes it (a tap timed out in
        // WebKit behind the scrim; a forced click in Chromium closed it).
        do: ["wait:1500", setText("[data-slot=dialog-description]", 0, TOKEN), "wait:600"],
        sel: ["[data-slot=dialog-content]", "[data-slot=dialog-header]", "[data-slot=dialog-description]"],
    },
    {
        name: "F3 Tooltip with a long word",
        cells: ["390t-light", "1440-light"],
        url: "/ovf.html",
        do: ["eval:document.querySelector('[data-testid=ovf-open-tooltip]').focus()", "wait:1500"],
        sel: ["[data-reka-popper-content-wrapper]:has([data-slot=tooltip-content])", "[data-slot=tooltip-content]"],
    },
    {
        name: "F3 Toast with a long word",
        cells: ["390t-light", "1440-light"],
        url: "/ovf.html",
        do: ["tap:[data-testid=ovf-open-toast]", "wait:1500"],
        sel: ["[data-slot=toast]", "[data-slot=toast] *"],
    },
];

// ── the fold's cases: the critique's compositions on /ovf.html?fold ──
const FOLD = "/ovf.html?fold";
cases.push(
    {
        name: "B2 eight SegmentedTabs options in a 267 px box",
        cells: ["390t-light", "1440-light"],
        url: FOLD,
        do: [
            "swipe:[data-testid=fold-tabs8]@-150@0",
            sl("[data-testid=fold-tabs8]"),
            sl("[data-testid=fold-tabs8] .segmented-tabs"),
            "eval:(()=>{const s=document.querySelector('[data-testid=fold-tabs8] .segmented-tabs');const t=[...s.querySelectorAll('.segmented-tab')].map(e=>Math.round(e.getBoundingClientRect().width*10)/10);return {strip:s.scrollWidth+'/'+s.clientWidth,tabs:t.join(' '),clipped:[...s.querySelectorAll('.segmented-tab')].filter(e=>e.scrollWidth>e.clientWidth+1).length}})()",
        ],
        sel: ["[data-testid=fold-tabs8]", "[data-testid=fold-tabs8] .segmented-tabs", "[data-testid=fold-tabs8] .segmented-tab"],
    },
    {
        name: "B2 vertical swipes on the eight-tab strip",
        cells: ["390t-light"],
        url: FOLD,
        do: [
            "eval:document.querySelector('[data-testid=fold-tabs8] .segmented-tabs').scrollLeft=60",
            "wait:300",
            sl("[data-testid=fold-tabs8] .segmented-tabs"),
            "swipe:[data-testid=fold-tabs8] .segmented-tabs@0@-200@start",
            sl("[data-testid=fold-tabs8] .segmented-tabs"),
            "eval:scrollTo(0,0)",
            "wait:400",
            "swipe:[data-testid=fold-tabs8] .segmented-tabs@16@-200@start",
            sl("[data-testid=fold-tabs8] .segmented-tabs"),
            "eval:scrollTo(0,0)",
            "wait:400",
            "swipe:[data-testid=fold-tabs8] .segmented-tabs@48@-200@start",
            sl("[data-testid=fold-tabs8] .segmented-tabs"),
            "eval:scrollTo(0,0)",
            "wait:400",
            "swipe:[data-testid=fold-tabs8] .segmented-tabs@-150@0",
            sl("[data-testid=fold-tabs8] .segmented-tabs"),
            sl("[data-testid=fold-tabs8]"),
            "eval:document.querySelectorAll('[data-testid=fold-tabs8] .segmented-tab')[7].click()",
            "wait:900",
            sl("[data-testid=fold-tabs8] .segmented-tabs"),
            "eval:(()=>{const s=document.querySelector('[data-testid=fold-tabs8] .segmented-tabs');const t=s.querySelectorAll('.segmented-tab')[7].getBoundingClientRect();const r=s.getBoundingClientRect();const i=s.querySelector('.segmented-indicator').getBoundingClientRect();return {lastTabInView:t.left>=r.left-0.5&&t.right<=r.right+0.5,indicatorOnTab:Math.abs(i.left-t.left)<1.5&&Math.abs(i.width-t.width)<1.5}})()",
        ],
        sel: ["[data-testid=fold-tabs8] .segmented-tabs"],
    },
    {
        name: "B1 Table with Chip and Button cells in a 300 px box",
        cells: ["390t-light", "1440-light"],
        url: FOLD,
        do: [lines("[data-testid=fold-table] td button, [data-testid=fold-table] td .glass-chip")],
        sel: ["[data-testid=fold-table] [data-slot=table-container]", "[data-testid=fold-table] [data-slot=table]", "[data-testid=fold-table] td button", "[data-testid=fold-table] td .glass-chip"],
    },
    {
        name: "B1 four Buttons in a 240 px flex row",
        cells: ["390t-light", "1440-light"],
        url: FOLD,
        do: [lines("[data-testid=fold-buttons] button")],
        sel: ["[data-testid=fold-buttons]", "[data-testid=fold-buttons] button"],
    },
    {
        name: "M2 selected Chip full width in a 300 px block-axis scroller",
        cells: ["390t-light", "1440-light"],
        url: FOLD,
        do: [
            "swipe:[data-testid=fold-chip-bare]@-150@0",
            sl("[data-testid=fold-chip-bare]"),
            "swipe:[data-testid=fold-chip-pad]@-150@0",
            sl("[data-testid=fold-chip-pad]"),
        ],
        sel: ["[data-testid=fold-chip-bare]", "[data-testid=fold-chip-pad]", "[data-testid=fold-chip-bare] .glass-chip"],
    },
    {
        name: "M3 three-seat dock whose seats all show",
        cells: ["390t-light", "1440-light"],
        url: FOLD,
        do: [
            "eval:document.querySelector('[data-testid=fold-dock3]').scrollIntoView({block:'center'})",
            "wait:600",
            "eval:(()=>{const d=document.querySelector('[data-testid=fold-dock3] .glass-dock');const r=d.querySelector('.dock-run');return {fits:d.hasAttribute('data-run-fits'),run:r.scrollWidth+'/'+r.clientWidth}})()",
            "swipe:[data-testid=fold-dock3] .dock-run@-150@0",
            sl("[data-testid=fold-dock3] .dock-run"),
            "eval:document.querySelector('[data-testid=fold-dock3] .dock-run').scrollLeft=0",
            "eval:document.querySelector('[data-testid=fold-dock3]').scrollIntoView({block:'center'})",
            "wait:400",
            "swipe:[data-testid=fold-dock3] .dock-run@48@-200@start",
            sl("[data-testid=fold-dock3] .dock-run"),
        ],
        sel: ["[data-testid=fold-dock3] .dock-run", "[data-testid=fold-dock3] .glass-dock"],
    },
    {
        name: "M1 atlas's Filters drawer: ToggleGroup, Select and Switch rows",
        cells: ["390t-light", "1440-light"],
        url: FOLD,
        do: [
            "tap:[data-testid=fold-open-atlas]",
            "wait:2500",
            "swipe:[data-testid=fold-atlas-body]@-150@0",
            sl("[data-testid=fold-atlas-body]"),
            lines("[data-testid=fold-atlas] [data-slot=toggle-group-item]"),
        ],
        sel: ["[data-testid=fold-atlas-body]", "[data-testid=fold-atlas-toggle]", "[data-testid=fold-atlas] [data-slot=toggle-group-item]", "[data-testid=fold-atlas] [data-slot=select-trigger]"],
    },
    {
        name: "M4 EasingPicker, CarouselPager and DockLayerGroup in a 300 px column",
        cells: ["390t-light", "1440-light"],
        url: FOLD,
        do: [
            "eval:document.querySelector('[data-testid=fold-m4]').scrollIntoView({block:'start'})",
            "wait:900",
            spills("[data-testid=fold-m4]"),
        ],
        sel: ["[data-testid=fold-m4]", "[data-testid=fold-m4] [data-slot=carousel-pager]", "[data-testid=fold-m4] .glass-dock"],
    },
);

cases.push(
    {
        name: "M3b a long dock run under vertical swipes that begin on it",
        cells: ["390t-light"],
        url: "/ovf.html",
        do: [
            "eval:document.querySelector('[data-testid=ovf-narrow] .glass-dock').scrollIntoView({block:'center'})",
            "wait:600",
            "eval:(()=>{const r=document.querySelector('[data-testid=ovf-narrow] .dock-run');return {run:r.scrollWidth+'/'+r.clientWidth,ta:getComputedStyle(r).touchAction}})()",
            "swipe:[data-testid=ovf-narrow] .dock-run@0@-200@start",
            sl("[data-testid=ovf-narrow] .dock-run"),
            "eval:document.querySelector('[data-testid=ovf-narrow] .glass-dock').scrollIntoView({block:'center'})",
            "wait:400",
            "swipe:[data-testid=ovf-narrow] .dock-run@16@-200@start",
            sl("[data-testid=ovf-narrow] .dock-run"),
            "eval:document.querySelector('[data-testid=ovf-narrow] .glass-dock').scrollIntoView({block:'center'})",
            "wait:400",
            "swipe:[data-testid=ovf-narrow] .dock-run@48@-200@start",
            sl("[data-testid=ovf-narrow] .dock-run"),
        ],
        sel: ["[data-testid=ovf-narrow] .dock-run"],
    },
    {
        name: "B2c the eight-tab strip inside a wrapper in a 267 px flex row",
        cells: ["390t-light", "1440-light"],
        url: FOLD,
        do: [
            "eval:(()=>{const box=document.querySelector('[data-testid=fold-tabs8]');const strip=box.querySelector('.segmented-tabs');const row=document.createElement('div');row.setAttribute('data-testid','fold-wrap-row');row.style.cssText='display:flex;inline-size:267px';const w=document.createElement('div');w.setAttribute('data-testid','fold-wrap');row.append(w);box.after(row);w.append(strip);return 'ok'})()",
            "wait:600",
            "eval:(()=>{const r=document.querySelector('[data-testid=fold-wrap-row]'),w=r.firstElementChild,s=w.querySelector('.segmented-tabs');return {row:r.scrollWidth+'/'+r.clientWidth,wrapper:Math.round(w.getBoundingClientRect().width),strip:s.scrollWidth+'/'+s.clientWidth}})()",
            "eval:(()=>{document.querySelector('[data-testid=fold-wrap]').style.minInlineSize='0';return 'ok'})()",
            "wait:600",
            "eval:(()=>{const r=document.querySelector('[data-testid=fold-wrap-row]'),w=r.firstElementChild,s=w.querySelector('.segmented-tabs');return {minInlineSize0:true,row:r.scrollWidth+'/'+r.clientWidth,wrapper:Math.round(w.getBoundingClientRect().width),strip:s.scrollWidth+'/'+s.clientWidth}})()",
        ],
        sel: ["[data-testid=fold-wrap-row]", "[data-testid=fold-wrap]"],
    },
    {
        name: "L1 Label with a long word, the stage's field given a 0 floor",
        cells: ["390t-light"],
        url: "/forms/inputs",
        do: [
            setText("main [data-slot=label]", 0, TOKEN),
            "eval:(()=>{for(const f of document.querySelectorAll('main .inputs-stage-field'))f.style.gridTemplateColumns='minmax(0, 1fr)';return 'ok'})()",
            "wait:600",
            lines("main [data-slot=label]"),
        ],
        sel: ["main .inputs-stage", "main .inputs-stage-field", "main [data-slot=label]"],
    },
    {
        name: "M4b EasingPicker, CarouselPager and DockLayerGroup in a 200 px column",
        cells: ["390t-light", "1440-light"],
        url: FOLD,
        do: [
            "eval:(()=>{const b=document.querySelector('[data-testid=fold-m4]');b.style.inlineSize='200px';b.scrollIntoView({block:'start'});return 'ok'})()",
            "wait:900",
            spills("[data-testid=fold-m4]"),
        ],
        sel: ["[data-testid=fold-m4]", "[data-testid=fold-m4] [data-slot=carousel-pager]", "[data-testid=fold-m4] .glass-dock"],
    },
    {
        name: "M1b atlas's Filters drawer, a toggle label longer than the field",
        cells: ["390t-light", "1440-light"],
        url: FOLD,
        do: [
            "tap:[data-testid=fold-open-atlas]",
            "wait:2500",
            setText("[data-testid=fold-atlas] [data-slot=toggle-group-item]", 0, "Per-pupil expenditure by funding source, all years"),
            "wait:600",
            "swipe:[data-testid=fold-atlas-body]@-150@0",
            sl("[data-testid=fold-atlas-body]"),
            lines("[data-testid=fold-atlas] [data-slot=toggle-group-item]"),
        ],
        sel: ["[data-testid=fold-atlas-body]", "[data-testid=fold-atlas-toggle]", "[data-testid=fold-atlas] [data-slot=toggle-group-item]"],
    },
);

const jobs = [];
for (const c of cases.filter((c) => ONLY.some((o) => c.name.startsWith(o)))) {
    for (const cell of c.cells) {
        for (const [tree, port] of [["base", 5391], ...CURE_PORTS.map((p) => [{ 5392: "cure", 5393: "cure2", 5394: "cure3", 5395: "cure4", 5396: "cure5" }[p], p])]) {
            jobs.push({ name: c.name, tree, port, cell, url: c.url, do: c.do, sel: c.sel });
        }
    }
}
process.stdout.write(JSON.stringify(jobs, null, 1));

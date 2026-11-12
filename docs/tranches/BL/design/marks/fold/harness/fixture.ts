// Challenge fixture for proposal A (the winning prototype). Scenes by query:
//   ?scene=static&group=clear|skip|misc      plain classes, measured by glyph and mark passes
//   ?scene=comp[&hold=1][&probeink=1][&only=<row>]   the component, cells AB.md did not measure
const w = window as unknown as Record<string, any>;
const params = new URLSearchParams(location.search);
const scene = params.get("scene") ?? "static";
const group = params.get("group") ?? "clear";
document.documentElement.classList.toggle("dark", params.get("theme") === "dark");
if (params.get("hold") === "1") {
    const s = document.createElement("style");
    s.id = "hold";
    s.textContent = ".mark-line, .mark-slide { animation-play-state: paused !important; }";
    document.head.appendChild(s);
}
if (params.get("probeink") === "1") {
    document.documentElement.style.setProperty("--mark-ink", "#ff00ff");
    document.documentElement.style.setProperty("--mark-band", "#ff00ff");
}
w.__drawn = [] as string[];
// scratch variants: each turns one amendment off, to read a gate's bite from the same tree
const variants = (params.get("v") ?? "").split(",").filter(Boolean);
w.__markVariant = Object.fromEntries(variants.map((v) => [v, true]));
if (variants.length) document.documentElement.setAttribute("data-v", variants.join(" "));
w.__supports = {
    inset: CSS.supports("text-decoration-inset", "1px"), under: CSS.supports("text-underline-position", "under"),
    relMin: CSS.supports("color", "oklch(from red 0.86 min(0.16, c * 40) h)"), inert: "inert" in HTMLElement.prototype,
};

const FACES: Record<string, string> = {
    pjs: '"PJS C"', plex: '"Plex C"', georgia: "Georgia", system: "system-ui", helv: '"Helvetica Neue"', times: '"Times New Roman"',
};

interface S { id: string; text: string; face: string; wt: number; px: number; cls: string; style?: string; mstyle?: string; ls?: string; upper?: boolean; bl?: boolean }
function staticRows(): S[] {
    const out: S[] = [];
    const add = (r: S, variants: number) => { for (let v = 0; v < variants; v++) out.push({ ...r, id: `${r.id}~${v}` }); };
    if (group === "clear") {
        const C = "mark-underline";
        const st = "--mark-offset:0.2em";
        for (const [face, wt, px] of [
            ["pjs", 700, 16], ["pjs", 700, 21], ["pjs", 700, 28], ["pjs", 700, 42], ["pjs", 700, 85], ["pjs", 400, 28], ["pjs", 800, 28],
            ["plex", 600, 16], ["plex", 600, 28], ["plex", 600, 42], ["plex", 400, 16],
            ["georgia", 400, 16], ["georgia", 400, 28], ["system", 600, 16], ["system", 600, 28], ["helv", 700, 28], ["times", 400, 28],
        ] as [string, number, number][]) add({ id: `clear-byprogram-${face}-${wt}-${px}`, text: "by program", face, wt, px, cls: C, style: st, bl: true }, 4);
        add({ id: "clear-population-pjs-700-28", text: "population", face: "pjs", wt: 700, px: 28, cls: C, style: st, bl: true }, 4);
        add({ id: "clear-typography-plex-600-28", text: "typography", face: "plex", wt: 600, px: 28, cls: C, style: st, bl: true }, 4);
        // the bite the spec names: a clear seat of 0.14em
        add({ id: "bite14-byprogram-pjs-700-28", text: "by program", face: "pjs", wt: 700, px: 28, cls: C, style: "--mark-offset:0.14em", bl: true }, 4);
        // the default seat on the same phrase, for the record
        add({ id: "skip-byprogram-pjs-700-28", text: "by program", face: "pjs", wt: 700, px: 28, cls: C, bl: true }, 4);
    } else if (group === "fold") {
        // F1: clear-seat candidates. The seat is the font's own descent (text-underline-position: under).
        const COMBOS: [string, number, number][] = [
            ["pjs", 700, 16], ["pjs", 700, 21], ["pjs", 700, 28], ["pjs", 700, 42], ["pjs", 700, 85], ["pjs", 400, 28], ["pjs", 800, 28],
            ["plex", 600, 16], ["plex", 600, 28], ["plex", 600, 42], ["plex", 400, 16],
            ["georgia", 400, 16], ["georgia", 400, 28], ["system", 600, 16], ["system", 600, 28], ["helv", 700, 28], ["times", 400, 28],
        ];
        for (const [face, wt, px] of COMBOS) add({ id: `clear-byprogram-${face}-${wt}-${px}`, text: "by program", face, wt, px, cls: "mark-underline mark-clear", bl: true }, 4);
        for (const [text, face, wt, px] of [["population", "pjs", 700, 28], ["population", "plex", 600, 28], ["typography", "plex", 600, 28], ["4,485", "pjs", 800, 85], ["Qjgy(p)", "pjs", 800, 48], ["Qjgy(p)", "plex", 700, 48], ["by program", "plex", 600, 85]] as [string, string, number, number][])
            add({ id: `clear-${text.replace(/\W/g, "")}-${face}-${wt}-${px}`, text, face, wt, px, cls: "mark-underline mark-clear", bl: true }, 4);
        // bites: the old seat of 0.2em with nothing skipped; the clear class absent (the default seat)
        add({ id: "bite02-byprogram-pjs-700-85", text: "by program", face: "pjs", wt: 700, px: 85, cls: "mark-underline mark-clear", mstyle: "--mark-offset:0.2em", bl: true }, 4);
        add({ id: "bite02-byprogram-pjs-700-16", text: "by program", face: "pjs", wt: 700, px: 16, cls: "mark-underline mark-clear", mstyle: "--mark-offset:0.2em", bl: true }, 4);
        add({ id: "biteskip-byprogram-pjs-700-85", text: "by program", face: "pjs", wt: 700, px: 85, cls: "mark-underline mark-clear", mstyle: "--mark-offset:0.2em;text-decoration-skip-ink:auto", bl: true }, 4);
        add({ id: "skip-byprogram-pjs-700-28", text: "by program", face: "pjs", wt: 700, px: 28, cls: "mark-underline", bl: true }, 4);
    } else if (group === "sel") {
        // rows are built below (F2 selection candidates, F9 band law)
    } else if (group === "skip") {
        const C = "mark-underline";
        for (const [face, wt, px] of [
            ["pjs", 400, 16], ["plex", 400, 16], ["plex", 600, 28], ["georgia", 400, 16], ["system", 400, 16], ["system", 700, 28], ["helv", 400, 16], ["times", 400, 16],
        ] as [string, number, number][])
            for (const text of ["Wake County", "Google", "4,485"]) add({ id: `skip-${text.replace(/\W/g, "")}-${face}-${wt}-${px}`, text, face, wt, px, cls: C, bl: true }, 8);
        for (const [face, wt] of [["plex", 700], ["system", 800], ["georgia", 700]] as [string, number][])
            for (const px of [48, 85]) add({ id: `skip-4485-${face}-${wt}-${px}`, text: "4,485", face, wt, px, cls: C, bl: true }, 4);
    } else {
        // seat (G-SEAT): two faces, both shapes, with the baseline marked
        for (const [face, wt] of [["pjs", 800], ["plex", 700], ["plex", 400], ["georgia", 400], ["system", 700]] as [string, number][])
            for (const cls of ["mark-underline", "mark-highlight"]) out.push({ id: `seat-${face}-${wt}-${cls}`, text: "Hxnox", face, wt, px: 85, cls, bl: true });
        // tracking: the mark's end against the last glyph's ink
        for (const cls of ["mark-underline", "mark-highlight"]) {
            out.push({ id: `track-eyebrow-${cls}`, text: "Quarterly report", face: "pjs", wt: 600, px: 13, cls, ls: "0.14em", upper: true });
            out.push({ id: `track-eyebrow20-${cls}`, text: "Quarterly report", face: "pjs", wt: 600, px: 13, cls, ls: "0.2em", upper: true });
            out.push({ id: `track-h85-${cls}`, text: "Open", face: "pjs", wt: 800, px: 85, cls, ls: "0.05em" });
            out.push({ id: `track-h48-${cls}`, text: "ATLAS", face: "pjs", wt: 700, px: 48, cls, ls: "0.1em" });
            out.push({ id: `track-none-${cls}`, text: "Open", face: "pjs", wt: 800, px: 85, cls });
        }
        // band colour from an achromatic ink
        out.push({ id: "band-ink-grey", text: "Wake County", face: "pjs", wt: 500, px: 28, cls: "mark-highlight", style: "--mark-ink:#1a1a1a" });
        out.push({ id: "band-ink-black", text: "Wake County", face: "pjs", wt: 500, px: 28, cls: "mark-highlight", style: "--mark-ink:#000" });
        out.push({ id: "band-ink-default", text: "Wake County", face: "pjs", wt: 500, px: 28, cls: "mark-highlight" });
        out.push({ id: "band-ink-white", text: "Wake County", face: "pjs", wt: 500, px: 28, cls: "mark-highlight", style: "--mark-ink:#fff" });
    }
    return out;
}

async function main() {
    await import("./fixture.css");
    await Promise.all([
        document.fonts.load('800 85px "PJS C"', "4,485"), document.fonts.load('400 16px "PJS C"', "Wake"),
        document.fonts.load('600 28px "Plex C"', "by program"), document.fonts.load('400 16px "Plex C"', "Wake"),
    ]);
    w.__face = { pjs: document.fonts.check('800 85px "PJS C"'), plex: document.fonts.check('600 28px "Plex C"') };
    const vue = await import("vue");
    const { createApp, defineComponent, h } = vue;
    const { Mark } = await import("../../src/components/mark");

    const Static = defineComponent(() => () =>
        h("div", { class: "sheet" }, [
            ...staticRows().map((r, i) =>
                h("p", { class: "srow", "data-row": r.id, style: `margin-top:${10 + (i % 8) / 8}px;font-family:${FACES[r.face]};font-weight:${r.wt};font-size:${r.px}px;line-height:1.5;${r.ls ? `letter-spacing:${r.ls};` : ""}${r.upper ? "text-transform:uppercase;" : ""}${r.style ?? ""}` }, [
                    h(r.cls === "mark-highlight" ? "mark" : "span", { class: r.cls, "data-m": "1", style: r.mstyle }, r.text),
                    r.bl ? h("span", { class: "bl" }) : null,
                ]),
            ),
            group === "sel"
                ? [
                      ...["ref", "final", "bite", "nobg", "hl", "inline", "fcbite", "ul"].map((c) =>
                          h("p", { class: "srow", "data-row": `sel-${c}`, style: "margin-top:16px;font-size:28px;line-height:1.6;font-weight:500" }, [
                              "Most came from ",
                              c === "ref" ? h("span", { "data-sel": "1" }, "Wake County")
                                  : c === "ul" ? h("span", { class: "mark-underline", "data-sel": "1" }, "Wake County")
                                  : h("mark", { class: `mark-highlight ${c === "final" ? "" : `sel-${c}`}`, "data-sel": "1" }, "Wake County"),
                              " this year",
                          ]),
                      ),
                      h("p", { class: "srow", "data-row": "sel-route", style: "margin-top:16px;font-size:28px;line-height:1.6;font-weight:500;--mark-ink:oklch(0.55 0.13 175)" }, [
                          "Most came from ", h("mark", { class: "mark-highlight", "data-sel": "1" }, "Wake County"), " this year",
                      ]),
                      ...[["grey", "#1a1a1a"], ["black", "#000"], ["default", ""], ["white", "#fff"], ["route", "oklch(0.55 0.13 175)"], ["tint", "hsl(220 8% 12%)"]].flatMap(([n, ink]) =>
                          ["old", "k"].map((law) =>
                              h("p", { class: "srow", "data-row": `band-${law}-${n}`, style: `margin-top:12px;font-size:28px;line-height:1.6;font-weight:500;${ink ? `--mark-ink:${ink}` : ""}` }, [
                                  h("mark", { class: `mark-highlight ${law === "old" ? "band-old" : ""}`, "data-band": `${law}-${n}` }, "Wake County"), ` ${law} ${n}`,
                              ]),
                          ),
                      ),
                  ]
                : null,
            group === "misc"
                ? [
                      h("p", { class: "srow", "data-row": "link-outer", style: "margin-top:16px;font-size:22px;line-height:1.6" }, [
                          "Read ", h("a", { href: "#", style: "text-decoration:underline;color:inherit" }, ["the ", h("span", { class: "mark-underline" }, "full program report"), " today"]),
                      ]),
                      h("p", { class: "srow", "data-row": "link-inner", style: "margin-top:16px;font-size:22px;line-height:1.6" }, [
                          "Read ", h("span", { class: "mark-underline" }, ["the ", h("a", { href: "#", style: "text-decoration:underline;color:inherit" }, "full program report"), " today"]),
                      ]),
                      h("p", { class: "srow", "data-row": "sel-highlight", style: "margin-top:16px;font-size:28px;line-height:1.6;font-weight:500" }, [
                          "Most came from ", h("mark", { class: "mark-highlight", "data-sel": "1" }, "Wake County"), " this year",
                      ]),
                      h("p", { class: "srow", "data-row": "sel-underline", style: "margin-top:16px;font-size:28px;line-height:1.6;font-weight:500" }, [
                          "Most came from ", h("span", { class: "mark-underline", "data-sel": "1" }, "Wake County"), " this year",
                      ]),
                      h("p", { class: "srow", "data-row": "mixed-static-hl", style: "margin-top:16px;font-size:22px;line-height:2" }, [
                          "Attendance ", h("mark", { class: "mark-highlight" }, ["rose ", h("b", { style: "font-size:1.6em" }, "32%"), " in a year"]),
                      ]),
                      h("p", { class: "srow", "data-row": "mixed-static-ul", style: "margin-top:16px;font-size:22px;line-height:2" }, [
                          "Attendance ", h("span", { class: "mark-underline" }, ["rose ", h("b", { style: "font-size:1.6em" }, "32%"), " in a year"]),
                      ]),
                      h("p", { class: "srow", "data-row": "caps-hl", style: "margin-top:16px;font-size:85px;line-height:1.2;font-weight:800" }, [
                          h("mark", { class: "mark-highlight" }, "4,485"), " NASA",
                      ]),
                  ]
                : null,
        ]),
    );

    const only = params.get("only");
    const shape = (params.get("shape") ?? "underline") as "underline" | "highlight";
    const m = (probe: string, text: any, attrs: Record<string, any> = {}) =>
        h(Mark, { shape, "data-probe": probe, onDrawn: () => w.__drawn.push(probe), ...attrs }, () => text);
    const LONG = "rose through September and held through the last week of October";
    const crow = (id: string, tag: string, style: string, kids: any[]) =>
        !only || only === id ? h(tag, { class: "crow", "data-row": id, style }, kids) : null;
    const Comp = defineComponent(() => () =>
        h("div", { class: "sheet", style: "align-items:stretch" }, [
            // control: the same wrapped run, inline
            crow("inline", "p", "font-size:22px;line-height:1.35;width:300px", ["Attendance ", m("inline", LONG), ", the longest."]),
            // the mark as a flex item (blockified), wrapping
            crow("flex", "p", "font-size:22px;line-height:1.35;width:300px;display:flex;gap:0.3em", [m("flex", LONG)]),
            // the mark as a grid item
            crow("grid", "p", "font-size:22px;line-height:1.35;width:300px;display:grid", [m("grid", LONG)]),
            // the mark made inline-block by its consumer
            crow("iblock", "p", "font-size:22px;line-height:1.35;width:300px", ["Attendance ", m("iblock", LONG, { style: "display:inline-block" })]),
            // a larger child inside the mark
            crow("mixed", "p", "font-size:22px;line-height:2;width:520px", ["Attendance ", m("mixed", ["rose ", h("b", { style: "font-size:1.6em" }, "32%"), " in a year"]), "."]),
            // tracked
            crow("track", "p", "font-size:13px;line-height:1.5;letter-spacing:0.14em;text-transform:uppercase;font-weight:600", [m("track", "Quarterly report")]),
            // inside a link
            crow("link", "p", "font-size:22px;line-height:1.6", ["Read ", h("a", { href: "#", style: "text-decoration:underline;color:inherit" }, ["the ", m("link", "full program report"), " today"])]),
            // a heading that scales with the viewport
            crow("vw", "h1", "font-size:8vw;line-height:1.04;font-weight:800;letter-spacing:-0.045em;margin:0 0 28px", [m("vw", "4,485"), " visits"]),
            // truncated heading: more than half the mark clipped
            crow("ellipsis", "h3", "font-size:22px;width:260px;overflow:hidden;white-space:nowrap;text-overflow:ellipsis;font-weight:700", ["Visits ", m("ellipsis", LONG)]),
            crow("ellipsis-plain", "h3", "font-size:22px;width:260px;overflow:hidden;white-space:nowrap;text-overflow:ellipsis;font-weight:700", ["Visits ", h(shape === "highlight" ? "mark" : "span", { class: `mark-${shape}` }, LONG)]),
            // clamped paragraph: the mark starts on line 2 and runs on under the clamp
            crow("clamp", "p", "font-size:18px;line-height:1.4;width:300px;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden", ["Attendance in the county rose and then ", m("clamp", "held through the last week of October and on into the winter, the longest run on record anywhere in the district")]),
            crow("clamp-plain", "p", "font-size:18px;line-height:1.4;width:300px;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden", ["Attendance in the county rose and then ", h(shape === "highlight" ? "mark" : "span", { class: `mark-${shape}` }, "held through the last week of October and on into the winter, the longest run on record anywhere in the district")]),
            // a horizontal scroller (a table cell row, a chip rail): the mark sits mostly past the edge
            crow("scroller", "div", "font-size:18px;width:260px;overflow-x:auto;white-space:nowrap", ["Branch hours: ", m("scroller", "open into the evening through the whole of the winter"), " and beyond"]),
            // a late face: the row is set in a family that arrives on demand
            only !== "late" ? null : crow("late", "h2", 'font-family:"Late C",Georgia,serif;font-size:42px;line-height:1.2;width:560px;font-weight:700;margin:0 0 28px', ["Library visits ", m("late", "doubled again in the county"), " after dark"]),
            // the two rows of proposal A's sheet the amended copy must still land on
            crow("rtl", "p", "font-size:22px;line-height:1.6;width:300px;direction:rtl", ["\u0627\u0631\u062a\u0641\u0639 ", m("rtl", "\u0627\u0644\u062d\u0636\u0648\u0631 \u062e\u0644\u0627\u0644 \u0634\u0647\u0631 \u0633\u0628\u062a\u0645\u0628\u0631 \u0648\u0627\u0633\u062a\u0645\u0631 \u062d\u062a\u0649 \u0646\u0647\u0627\u064a\u0629 \u0623\u0643\u062a\u0648\u0628\u0631"), " ."]),
            crow("nested", "p", "font-size:22px;line-height:1.35;width:300px", ["Attendance ", m("nested", ["rose ", h("em", "through September"), " and ", h("strong", "held through the last"), " week of October"]), "."]),
            crow("clear", "h2", "font-size:28px;line-height:1.3;font-weight:700;margin:0 0 28px", ["Visits ", m("clear", "by program", { class: "mark-clear" }), " rose"]),
            crow("linkin", "p", "font-size:22px;line-height:1.6", ["Read ", m("linkin", ["the ", h("a", { href: "#x", style: "color:inherit" }, "full program report"), " today"])]),
            crow("big", "p", "font-size:22px;line-height:2.4;width:520px", ["Attendance ", m("big", ["rose ", h("b", { style: "font-size:2.2em" }, "32%"), " in a year"]), "."]),
            // far below, for the mid-scroll cell
            params.get("far") === "1" ? h("div", { style: "height:1500px" }) : null,
            params.get("far") === "1" ? crow("far", "p", "font-size:22px;line-height:1.35;width:300px", ["Attendance ", m("far", LONG), ", the longest."]) : null,
            params.get("far") === "1" ? h("div", { style: "height:1500px" }) : null,
        ]),
    );
    // The late row's face is a stylesheet face (fixture.css) the probe holds back on the network.
    w.__loadLate = async () => {
        await document.fonts.ready;
        w.__lateLoaded = document.fonts.check('700 42px "Late C"');
    };

    createApp(scene === "comp" ? Comp : Static).mount("#app");
    // In the mount task, before any observer callback: what the host holds besides the slot.
    w.__atMount = Array.from(document.querySelectorAll("[data-probe]")).map((el) => ({
        probe: (el as HTMLElement).dataset.probe, ink: (el as HTMLElement).dataset.ink,
        childElements: el.childElementCount, textContent: el.textContent, html: el.outerHTML.slice(0, 300),
    }));
    // The server's markup for the same component (G-SSR's claim).
    try {
        const { renderToString } = await import("vue/server-renderer");
        const { createSSRApp } = vue;
        w.__ssr = {
            underline: await renderToString(createSSRApp({ render: () => h(Mark, null, () => "4,485") })),
            highlight: await renderToString(createSSRApp({ render: () => h(Mark, { shape: "highlight" }, () => "Wake County") })),
        };
    } catch (e) {
        w.__ssr = { error: String(e) };
    }
    w.__schemeRules = (() => {
        const out: string[] = [];
        const walk = (rules: CSSRuleList, ctx: string) => {
            for (const r of Array.from(rules)) {
                const anyr = r as any;
                if (anyr.style?.colorScheme) out.push(`${ctx} ${anyr.selectorText} { color-scheme: ${anyr.style.colorScheme} }`);
                if (anyr.cssRules) walk(anyr.cssRules, `${ctx} ${r.constructor.name}(${anyr.name ?? anyr.conditionText ?? ""})`);
            }
        };
        for (const sh of Array.from(document.styleSheets)) { try { walk(sh.cssRules, ""); } catch {} }
        return { rules: out, html: getComputedStyle(document.documentElement).colorScheme, cls: document.documentElement.className };
    })();
    const raf = window.requestAnimationFrame.bind(window);
    raf(() => raf(() => (w.__ready = true)));
}
void main();

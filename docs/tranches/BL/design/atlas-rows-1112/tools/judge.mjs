// The atlas-rows verdicts. Reads the witness readings of one engine on 11.1.1 (red) and
// on the cure (green), judges every cell by the row it witnesses, and prints a Markdown
// table: each cell's verdict on each tree and the reading that decides it.
//
// usage: node judge.mjs <red.json> <green.json>
import { readFileSync } from "node:fs";

const [RED, GREEN] = process.argv.slice(2).map((f) => JSON.parse(readFileSync(f, "utf8")));

// The alpha of a computed colour: rgb(), rgba() or color(srgb … / a).
const alpha = (c) => {
    if (!c) return null;
    const slash = c.match(/\/\s*([\d.]+)\s*\)$/);
    if (slash) return Number(slash[1]);
    const rgba = c.match(/^rgba\([^,]+,[^,]+,[^,]+,\s*([\d.]+)\)$/);
    if (rgba) return Number(rgba[1]);
    return 1;
};
const near = (a, b, tol = 1) => Math.abs(a - b) <= tol;

// Each judge returns [pass, what it read].
const JUDGES = {
    print(c) {
        const p = c.print;
        const hidden = ["dock", "popover", "tooltip", "toast"].filter((k) => p.shown[k] === true);
        const ok = hidden.length === 0 && p.shown.card && p.shown.button && p.frost === 0 && p.shadow === 0 && alpha(p.cardBg) === 1;
        return [ok, `printed: ${hidden.length ? hidden.join(", ") : "none of the chrome"}; card alpha ${alpha(p.cardBg)}; frost ${p.frost}, shadow ${p.shadow}`];
    },
    "print-dialog": (c) => printModal(c),
    "print-sheet": (c) => printModal(c),
    toggle(c) {
        const ok = c.before.label === "Dark mode" && c.after.label === "Dark mode" && c.before.pressed === "false" && c.after.pressed === "true";
        return [ok, `"${c.before.label}" pressed ${c.before.pressed}, then "${c.after.label}" pressed ${c.after.pressed}`];
    },
    popover: (c) => popover(c),
    "popover-child": (c) => popover(c),
    "dlg-scroll"(c) {
        const arms = ["nonModal", "modal"].map((k) => c[k]);
        const ok = arms.every((a) => a.before.overscroll === "contain" && a.pageMovedBy === 0 && a.before.markerX === a.gutter.markerX);
        const [n, m] = arms;
        return [ok, `page moved ${n.pageMovedBy} px (modal={false}) and ${m.pageMovedBy} px (modal); overscroll ${m.before.overscroll}; page bar ${m.gutter.bar} px, content shift ${m.before.markerX - m.gutter.markerX} px`];
    },
    "dlg-pos"(c) {
        const ys = [c.yOpen, c.yEsc, c.yClose, c.yScrim];
        return [ys.every((y) => y === c.y0), `scrollY ${c.y0} before; ${ys.join(", ")} (open, Escape, close button, scrim)`];
    },
    "stack-dialog": (c) => stack(c),
    "stack-sheet": (c) => stack(c),
    "stack-drawer": (c) => stack(c),
    "stack-expand": (c) => stack(c),
    "stack-sibling": (c) => stack(c),
    button(c) {
        return [c.fine.sm === 36 && c.coarse.sm === 44, `sm ${c.fine.sm} px fine, ${c.coarse.sm} px coarse`];
    },
    select(c) {
        const arms = ["keys", "pointer", "touch"].filter((k) => c[k]);
        const bad = arms.filter((k) => c[k].scrollingFocus !== 0 || c[k].pageMin !== c[k].pageY0 || c[k].pageMax !== c[k].pageY0);
        return [bad.length === 0, arms.map((k) => `${k}: ${c[k].scrollingFocus} focus move${c[k].scrollingFocus === 1 ? "" : "s"} without preventScroll`).join("; ")];
    },
    selgroup(c) {
        const ok = c.after.page === c.before.page && c.after.outer === c.before.outer && c.after.run > c.before.run && c.after.selected === "Option 7";
        return [ok, `page ${c.before.page}→${c.after.page}, outer ${c.before.outer}→${c.after.outer}, run ${c.before.run}→${c.after.run}`];
    },
    table(c) {
        const widths = Object.keys(c);
        const fontOk = widths.every((w) => c[w].thFont >= 14);
        const heightOk = widths.every((w) => near(c[w].sortHeight, c[w].coarse ? 44 : 36, 0.5));
        const ringOk = c.fine.ring?.focused === true && c.fine.ring.inset === true;
        return [
            fontOk && heightOk && ringOk,
            `header ${widths.map((w) => `${c[w].thFont}`).join("/")} px; sort ${widths.map((w) => `${Math.round(c[w].sortHeight * 10) / 10}`).join("/")} px (${widths.join("/")}); ring ${c.fine.ring?.focused ? `offset ${c.fine.ring.offset}, width ${c.fine.ring.width}` : "not reached"}`,
        ];
    },
    "sheet-full"(c) {
        const topOk = near(c.sheet.top, c.env, 1) && near(c.sheet.bottom, c.sheet.innerHeight, 1);
        const ok = topOk && c.ruleNamesTopInset;
        return [ok, `inset ${c.env} px; sheet top ${Math.round(c.sheet.top)} px, bottom ${Math.round(c.sheet.bottom)} of ${c.sheet.innerHeight}; rule reads the inset: ${c.ruleNamesTopInset}`];
    },
};

function printModal(c) {
    const p = c.print;
    const ok = p.plate === true && alpha(p.plateBg) === 1 && p.frost === 0 && p.shadow === 0 && alpha(p.scrimBg) === 0 && p.halo !== true;
    return [ok, `plate shown ${p.plate}, alpha ${alpha(p.plateBg)}; scrim alpha ${alpha(p.scrimBg)}; frost ${p.frost}, shadow ${p.shadow}`];
}

function popover(c) {
    const ok = !c.closed.has && c.opened.has && c.opened.target && !c.closedAgain.has;
    const say = (r) => (r.has ? `"${r.value}"${r.value ? (r.target ? " (mounted)" : " (gone)") : ""}` : "none");
    return [ok, `closed ${say(c.closed)}; open ${say(c.opened)}; closed again ${say(c.closedAgain)}`];
}

function stack(c) {
    const b = c.both;
    const a = c.afterEsc;
    const scrim = b.scrimOverLower === "no scrim" || b.scrimOverLower.above;
    // Focus belongs in the lower surface from the start of the top's exit, not only after it.
    const focusOk = a.focusInLower && (!c.duringExit || c.duringExit.focusInLower);
    const ok = b.plateOverLower.above && scrim && !a.topOpen && a.lowerOpen && a.root === c.lowerOnly.root && focusOk;
    const during = c.duringExit ? `, ${c.duringExit.focusInLower ? "in the lower" : c.duringExit.focus} during the exit` : "";
    return [
        ok,
        `top plate over lower ${b.plateOverLower.above}, top scrim over lower ${scrim}; after Escape top ${a.topOpen ? "open" : "closed"}, lower ${a.lowerOpen ? "open" : "closed"}, lock ${c.lowerOnly.root}→${a.root}; focus ${a.focusInLower ? "in the lower" : a.focus}${during}`,
    ];
}

const rows = [];
let unjudged = 0;
for (const name of Object.keys(JUDGES)) {
    const r = RED.cells[name];
    const g = GREEN.cells[name];
    const judge = (cell) => {
        if (!cell) return ["not read", ""];
        if (cell.failed) return ["failed", cell.failed.split("\n")[0].slice(0, 80)];
        const [ok, read] = JUDGES[name](cell);
        return [ok ? "GREEN" : "RED", read];
    };
    const [rv, rr] = judge(r);
    const [gv, gr] = judge(g);
    if (gv !== "GREEN") unjudged += 1;
    rows.push(`| ${name} | ${rv} | ${rr} | ${gv} | ${gr} |`);
}
console.log(`${RED.engine} ${RED.version}\n`);
console.log("| Cell | 11.1.1 | Reading | Cure | Reading |\n|---|---|---|---|---|");
console.log(rows.join("\n"));
if (unjudged) console.log(`\n${unjudged} cell(s) not GREEN on the cure.`);

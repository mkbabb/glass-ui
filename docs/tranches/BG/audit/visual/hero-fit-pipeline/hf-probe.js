// HERO-FIT shared DOM probe. Defines window.__spProbe() -> Promise<string(JSON)>.
// Used by BOTH engines: Safari via callAsyncJavaScript(return await window.__spProbe()),
// Chrome via page.evaluate(src => { eval(src); return window.__spProbe(); }).
window.__spProbe = async function () {
    const px = (s) => {
        const n = parseFloat(s);
        return Number.isFinite(n) ? n : null;
    };
    const iw = window.innerWidth;
    const ih = window.innerHeight; // svh proxy under a fixed-frame capture
    const docEl = document.documentElement;
    const captureReady = docEl.hasAttribute("data-capture-ready");

    // ── the hero <h1> ──────────────────────────────────────────────
    const h1 =
        document.querySelector("h1.story-hero-title") ||
        document.querySelector(".story-hero-title") ||
        document.querySelector("main h1");
    let hero = null;
    if (h1) {
        const r = h1.getBoundingClientRect();
        const cs = getComputedStyle(h1);
        const fs = px(cs.fontSize);
        let lh = px(cs.lineHeight);
        if (!lh || cs.lineHeight === "normal") lh = fs ? fs * 1.05 : null;
        const lineCount = lh ? Math.max(1, Math.round(r.height / lh)) : null;
        hero = {
            selector: h1.matches("h1.story-hero-title")
                ? "h1.story-hero-title"
                : h1.className,
            tag: h1.tagName,
            rect: {
                top: +r.top.toFixed(1),
                left: +r.left.toFixed(1),
                width: +r.width.toFixed(1),
                height: +r.height.toFixed(1),
                bottom: +r.bottom.toFixed(1),
            },
            fontSizePx: fs,
            lineHeightPx: lh ? +lh.toFixed(2) : null,
            lineCount,
            hyphens: cs.hyphens || cs.webkitHyphens || "n/a",
            wordBreak: cs.wordBreak,
            overflowWrap: cs.overflowWrap || cs.wordWrap,
            whiteSpace: cs.whiteSpace,
            text: (h1.textContent || "").replace(/\s+/g, " ").trim(),
            hasSoftHyphen: (h1.textContent || "").includes("­"),
            // horizontal overflow: does the h1 content run past its own box?
            overflowX: h1.scrollWidth > h1.clientWidth + 1,
            scrollWidth: h1.scrollWidth,
            clientWidth: h1.clientWidth,
            blockRatioSvh: ih ? +(r.height / ih).toFixed(4) : null,
            dataHeroScale: h1.getAttribute("data-hero-scale"),
        };
    }

    // ── computed text-display-4 font-size at THIS viewport ─────────
    const ref = document.createElement("h1");
    ref.className = "text-display-4";
    ref.textContent = "M";
    ref.style.position = "absolute";
    ref.style.visibility = "hidden";
    ref.style.left = "-9999px";
    document.body.appendChild(ref);
    const display4FontSizePx = px(getComputedStyle(ref).fontSize);
    ref.className = "text-display-5";
    const display5FontSizePx = px(getComputedStyle(ref).fontSize);
    document.body.removeChild(ref);

    // ── preview cards + fold ───────────────────────────────────────
    const cardEls = Array.from(
        document.querySelectorAll(".section-preview-card"),
    );
    const cards = cardEls.map((el) => {
        const r = el.getBoundingClientRect();
        return {
            top: +r.top.toFixed(1),
            bottom: +r.bottom.toFixed(1),
            height: +r.height.toFixed(1),
            // "above the fold" = the card's top edge sits within the viewport
            // AND it is at least partially visible
            aboveFold: r.top < ih && r.bottom > 0,
            mostlyVisible: r.top < ih * 0.95 && r.top >= 0,
        };
    });
    const cardsAboveFold = cards.filter((c) => c.aboveFold).length;

    const main = document.querySelector("main");
    const mainChildren = main ? main.children.length : null;
    const canvases = Array.from(document.querySelectorAll("canvas"));
    const canvasCount = canvases.length;

    return JSON.stringify({
        iw,
        ih,
        captureReady,
        hero,
        display4FontSizePx,
        display5FontSizePx,
        fontVsDisplay4:
            hero && display4FontSizePx
                ? +(hero.fontSizePx >= display4FontSizePx - 0.5)
                : null,
        cardsTotal: cardEls.length,
        cardsAboveFold,
        cards: cards.slice(0, 8),
        mainChildren,
        canvasCount,
    });
};

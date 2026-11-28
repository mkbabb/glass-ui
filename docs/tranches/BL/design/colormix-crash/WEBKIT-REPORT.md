# WebKit report: a color-mix() of two color-mix() values aborts the page

For the owner to file at bugs.webkit.org (component: CSS). Attach `reduced.html` from this folder. The text below names no product, person or site.

Real Safari has not been checked. Every result here comes from Playwright's WebKit 26.5 build (WebContent 625.1.21, macOS 26.4.1), and on glass that build has given the opposite result to shipping Safari before. Before filing, load `reduced.html` once in Safari and once in Safari Technology Preview. If neither aborts, the report should say it reproduces only in the Playwright build, or it should not be filed.

**Build range (2026-11-27).** Only Playwright WebKit build 2311 (26.5) aborts. Builds 2287 (26.4), 2370 and 2388 (27.2) render every row below and `reduced.html`. File this only if Safari Technology Preview or a shipping Safari aborts on `reduced.html`, and then give the bisect range 2287 to 2311 and say the abort is gone again by 2370.

---

**Title:** color-mix() whose two colour arms each contain a color-mix() aborts the web content process (std::terminate in Style::Color::resolvedColor)

**Summary**

When a `color-mix()` has two colour arms that each contain a `color-mix()`, the web content process aborts while it resolves the element's style. An arm counts if it is a `color-mix()`, a relative colour whose origin is a `color-mix()`, or a `light-dark()` with a `color-mix()` inside. The abort happens on load, and on hover when a `:hover` rule supplies the value. It happens for every colour property I tried.

**Steps to reproduce**

1. Open the attached `reduced.html`:

```html
<!doctype html>
<style>
  .box {
    width: 200px;
    height: 60px;
    background-color: color-mix(in oklab, color-mix(in srgb, red, blue), color-mix(in srgb, green, white));
  }
</style>
<div class="box"></div>
```

**Expected:** a grey-violet box. Chromium 149 resolves the background to `oklab(0.583088 0.0367287 -0.0180101)`.

**Actual:** the web content process aborts with SIGABRT before the page renders.

**Backtrace** (faulting thread, symbols only):

```
 6  libc++abi.dylib  std::terminate()
 7  WebCore          WebCore::Style::Color::resolvedColor() const
 8  WebCore          WebCore::Style::toStyleColor(WebCore::CSS::ColorMix const&, WebCore::Style::ColorResolutionState&)
 9  WebCore          WebCore::Style::toStyleColor(WebCore::CSS::Color const&, WTF::Ref<WebCore::Document const>, WebCore::Style::ComputedStyle const&, ...)
10  WebCore          WebCore::Style::CSSValueConversion<WebCore::Style::Color>::operator()(...)
11  WebCore          WebCore::Style::BuilderFunctions::applyValueBackgroundColor(...)
12  WebCore          WebCore::Style::Builder::applyProperty(...)
14  WebCore          WebCore::Style::Builder::applyNonHighPriorityProperties()
15  WebCore          WebCore::Style::Resolver::applyMatchedProperties(...)
```

On hover the same frames sit under `Element::resolveComputedStyle`, called from `EventHandler::handleMouseMoveEvent`.

**Which values abort**

Each row is a one-element page with the value applied as `background-color`, tested on load and on hover:

| Value | Result |
|---|---|
| `color-mix(in oklab, color-mix(in srgb, red, blue), color-mix(in srgb, green, white))` | aborts |
| the same, with translucent arms, with `transparent` arms, with `currentcolor` arms, or with both arms the same mix | aborts |
| the same, with the outer mix `in srgb` or `in oklch` | aborts |
| `color-mix(in oklab, <mix>, color-mix(in srgb, <mix> 50%, transparent))` (one arm a mix of a mix) | aborts |
| `color-mix(in oklab, <mix>, oklch(from <mix> l c h) 35%)` | aborts |
| `color-mix(in oklab, oklch(from <mix> l c h), oklch(from <mix> l c h) 35%)` | aborts |
| `color-mix(in oklab, light-dark(<mix>, red), light-dark(<mix>, blue) 35%)` | aborts |
| `color-mix(in oklab, <mix>, red 35%)` (one arm a mix) | renders |
| `color-mix(in oklab, <mix> 50%, transparent)` | renders |
| `color-mix(in oklab, color-mix(in oklab, <mix> 50%, transparent) 50%, transparent)` (three levels, one mixed arm at each) | renders |
| `color-mix(in oklab, oklch(from <colour> l c h / 0.1), oklch(from <colour> l c h / 0.14) 35%)` | renders |
| `color-mix(in oklab, oklch(from <mix> l c h), red 35%)` | renders |
| `color-mix(in oklab, light-dark(red, blue), light-dark(green, white) 35%)` | renders |
| `color-mix(in oklab, <mix>, light-dark(red, blue) 35%)` | renders |

With both arms a mix, these properties also abort: `color`, `border-top-color`, `outline-color`, the colour in `box-shadow`, `text-shadow` and `filter: drop-shadow()`, a `linear-gradient()` stop, and SVG `fill`. It also aborts when each arm is a registered `@property` of syntax `<color>` whose value is a mix. One registered `<color>` arm holding a mix, with a plain colour as the other arm, renders.

**Environment**

Playwright WebKit 26.5 (WebContent 625.1.21), headless, macOS 26.4.1 (25E253). Not yet checked in shipping Safari or Safari Technology Preview.

Thanks,
Mike

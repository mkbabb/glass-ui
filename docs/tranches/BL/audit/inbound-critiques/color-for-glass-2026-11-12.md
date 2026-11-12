# color.babb.dev: findings whose cure is in glass-ui

From `~/.dev-logs/design-study/critique/color.md` (2026-11-12). Only the rows owned by glass-ui: the component, token or behaviour to change, and the frame that shows it. Frame paths are relative to `~/.dev-logs/design-study/`. The site's part in each is to relay and adopt, never to shim. "One step" means one measured step of 25 to 55 ms (screencast frames).

Nineteen rows: 6 first, 8 second, 1 open, 4 polish.

## First

| id | component / behaviour to change | what the frame shows | what it should be | frame |
|---|---|---|---|---|
| C-01 | GlassDock, `shape-pill fit-content` at phone width with three seats: the plate's shape | An elliptical plate drawn inside a pill outline of the same width; two silhouettes at rest on every phone page. | One pill: plate and outline coincide, radius half the height. | `frames/color/home-390-light-rest.png` (also every `*-390-*-rest.png`) |
| C-02 | GlassDock morph corners (`components/dock/styles/morph.css:176-191`, CENSUS.md:30) and the face during the morph | Collapsing, the plate is a flat-sided, square-cornered block for 4 of 8 frames and rounds only on the settle frame; a clipped fragment of the first seat's glyph remains at frame 03; on Browse the block has no face for 3 frames. | The pill radius holds through every frame; the face is present throughout; nothing clipped. | `frames/color/home-1440-dark-strip-dock-collapse-03..07.png`, `home-1440-dark-strip-hover-leave-icon-03..05.png`, `browse-1440-dark-strip-size-card-colors-on-04..06.png` |
| C-03 | Dock layer navigation (the root is not tweened when a layer's content changes: `dockMorphMeasure.ts:186-230`, CENSUS.md:32, worst snap 1) and the layer crossfade | Width reaches its end in the first changed step (62.3 px at 22 ms on Home; 242.7 on Generate; 168 px at 390) and both layers' contents are drawn over each other for one to two frames. | Width tweens on the dock spring; the leaving layer has faded before the entering one is legible. | `frames/color/home-1440-dark-strip-size-toolsbar-on-02..03.png`, `home-390-light-strip-size-toolsbar-on-02.png` |
| C-04 | Dock re-fit when a route changes the seat set (same root cause as C-03) | The first seat empties for a frame and the dock is narrower on the next; no travel. | A face in every frame; width tweens between seat sets. | `frames/color/palettes-390-light-strip-nav-out-to-browse-03..04.png` |
| C-05 | The theme seat: a fissioned dock seat to the right of the dock, with a hover animation, fusing on collapse (11.2.0); DarkModeToggle's hover is opacity only (CENSUS hover table: fail) | color has no seat to adopt: the toggle is a checkbox row in a menu at both widths. | The fission seat shipped as a dock piece so the site only places it. | `frames/color/home-390-light-open-menu.png`, `home-1440-dark-rest.png` |
| C-08 | Slider `size="sm"` geometry | A hairline track about 8 px tall with no visible thumb, on five views. | Thumb spans the full track height; one continuous rounded track; the same body as the larger slider at a smaller scale. | `frames/color/extract-1440-dark-rest.png`, `generate-390-light-rest.png`, `atmosphere-1440-dark-rest.png`, `blob-1440-dark-rest.png` |

Related, site-owned: C-09 (the `sm` slider's fill is grey; the site will feed the current colour through the fill token). If the token does not exist for `sm`, that is a glass ask.

## Second

| id | component / behaviour to change | what the frame shows | what it should be | frame |
|---|---|---|---|---|
| C-12 | Animated icons (the piece the intent-motion study proposes) | On hover the dock seat scales about 1.08 with its plate; no glyph moves anywhere in the app. | Each glyph moves once, small and meaningful, and returns. | `frames/color/home-1440-dark-strip-hover-enter-icon-01..08.png` |
| C-13 | Button `emphasis="text"` and icon-only buttons: hover (CENSUS hover table: "Button, text emphasis: underline, untweened: fail") | Filters and Save palette show no change on hover (the Filters hover still is pixel-identical to rest); Open camera gains a 1 px underline only. | A plate or fill that enters and leaves by a tween. | `frames/color/browse-1440-dark-hover-iconbtn.png`, `generate-1440-dark-hover-iconbtn.png`, `extract-1440-dark-hover-button.png` |
| C-19 | Reduced-motion guard (`styles/utilities/a11y-overrides.css:46-53`, CENSUS.md:21, worst snap 11) | No strip was captured; by source color defers to the guard, which cuts. | A short fade in place of each travel. | `frames/color/home-1440-dark-rest-reduced-motion.png` (still only) |
| C-20 | SelectTrigger and disabled Button fill over a saturated light surface | The fills read as muted mauve-grey on the pink panes. | The control surface takes the host's hue rather than greying it. | `frames/color/mix-1440-light-rest.png`, `generate-390-light-rest.png` |
| C-21 | Popover and menu plate opacity | Swatches behind the popover smear through its labels; the colour field shows through the phone menu. | A frosted plate opaque enough that the backdrop never competes with the text. | `frames/color/browse-1440-dark-open-filters.png`, `home-390-light-open-menu.png` |
| C-22 | Slider: a thumb option or tokens for a data-track slider | color restyles `.slider-thumb` from site CSS (`demo/picker/controls/ComponentSliders/ComponentSliders.vue:413-442`). | The needed geometry is a Slider option; the site keeps token values only. | `frames/color/home-1440-dark-rest.png` |
| R-02 | EasingPicker: selected state | The chosen curve sits on a grey disc. | Selected in the host's accent. | `frames/color/gradient-1440-dark-strip-size-disclosure-on-08.png` |
| R-03 | EasingPicker: curve glyphs | Hairline curves in 20 px cells. | Lines thick enough to be the subject (his keyframes order of 2026-11-12 says the same). | `frames/color/gradient-1440-dark-strip-size-disclosure-on-08.png` |

## Open (awaiting Mike)

| id | component | what the frame shows | frame |
|---|---|---|---|
| C-14 | Press state | On a dock seat the plate is smaller and lighter while held, dropping back from the hover scale. No evidence for pane buttons, icon buttons or triggers. Recorded, not called a defect. | `frames/color/home-1440-dark-pressed.png` against `home-1440-dark-hover-dockseat.png` |

## Polish

| id | component / behaviour to change | what the frame shows | what it should be | frame |
|---|---|---|---|---|
| C-28 | Field control edge (Input) | Two concentric outlines on the login, find-by-colour and palette-name fields. | One edge. | `frames/color/home-1440-light-open-login.png`, `browse-1440-dark-open-filters.png` |
| C-29 | Dock trigger ring at the dock's end | At 390 the open trigger's ring meets the plate's edge with no room. Likely gone with C-01. | Room for the ring at both ends. | `frames/color/home-390-light-open-select-view.png` |
| C-30 | Slider thumb at the ends of a round-capped track | The square-shouldered thumb overhangs the cap at 0 and at 100. | The thumb stays inside the cap or shares its radius. | `frames/color/home-1440-dark-rest.png` (h and a rows) |
| R-01 | Accordion open on a tall body | Tweened, but in steps of 145, 133 and 55 px at 50 ms apart at 1440 (smooth at 390). May be capture load; worth one check under no capture. | Even frames. | `frames/color/gradient-1440-dark-strip-size-disclosure-on-02..04.png` |

Not counted above but worth glass's eye: the seat hover on the dock passes A2 by fading a plate in place while the seat scales; the plate does not grow from the control (CENSUS.md:22).

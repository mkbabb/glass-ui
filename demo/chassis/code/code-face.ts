import faceUrl from "../../../src/fonts/fira-code/fira-code-latin.woff2?url";

/**
 * The code face (Fira Code's Latin subset) loads only where code is set. The router
 * starts it as a navigation to a page whose first screen sets it starts; the code
 * disclosure starts it when "Code" is pointed at or focused. Nothing waits for it. One
 * load a page; a document with no font set (the tests' DOM) has no face to load.
 *
 * The face is added from script, not declared in a stylesheet. When a stylesheet holding
 * `@layer` rules joins the document between two others (a route's lazy stylesheets
 * finishing out of order), Chromium makes a new object for every `@font-face` rule; the
 * new `optional` face finds its file in memory and is used at once, so code laid out in
 * the fallback while the face loaded would change face in one frame. A face added from
 * script is kept, and with it the fallback it gave.
 */
const face =
    "fonts" in document
        ? new FontFace("Fira Code", `url(${faceUrl}) format("woff2")`, {
              weight: "300 700",
              display: "optional",
              unicodeRange:
                  "U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+0304, U+0308, U+0329, U+2000-206F, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD",
          })
        : undefined;
if (face) document.fonts.add(face);

let load: Promise<unknown> | undefined;
let loaded = !face;

export function loadCodeFace(): Promise<unknown> {
    load ??= face ? face.load().then(() => (loaded = true), () => undefined) : Promise.resolve();
    return load;
}

/** The face has loaded. Chromium's `document.fonts.check` answers yes before it has. */
export const codeFaceLoaded = (): boolean => loaded;

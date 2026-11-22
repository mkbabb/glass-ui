/**
 * The code face (Fira Code's Latin subset) loads only where code is set. The router
 * starts it as a navigation to a page whose first screen sets it starts; the code
 * disclosure starts it when "Code" is pointed at or focused. Nothing waits for it. One
 * load a page; a document with no font set (the tests' DOM) has no face to load.
 */
let load: Promise<unknown> | undefined;
let loaded = !("fonts" in document);

export function loadCodeFace(): Promise<unknown> {
    load ??= loaded
        ? Promise.resolve()
        : document.fonts.load('1em "Fira Code"').then(() => (loaded = true), () => undefined);
    return load;
}

/** The face has loaded. Chromium's `document.fonts.check` answers yes before it has. */
export const codeFaceLoaded = (): boolean => loaded;

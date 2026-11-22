/**
 * The code face (Fira Code's Latin subset) loads only where code is set. The router
 * starts it as a navigation to a page whose first screen sets it starts; the code
 * disclosure starts it when "Code" is first asked for and opens once it has loaded. One
 * load a page; a document with no font set (the tests' DOM) has no face to wait for.
 */
let load: Promise<unknown> | undefined;

export function loadCodeFace(): Promise<unknown> {
    load ??= "fonts" in document
        ? document.fonts.load('1em "Fira Code"').catch(() => undefined)
        : Promise.resolve();
    return load;
}

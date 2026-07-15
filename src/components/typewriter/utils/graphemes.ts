export function splitGraphemes(text: string): string[] {
    const Segmenter = (Intl as { Segmenter?: typeof Intl.Segmenter }).Segmenter;
    return typeof Segmenter === "function"
        ? [...new Segmenter(undefined, { granularity: "grapheme" }).segment(text)].map(
              ({ segment }) => segment,
          )
        : [...text];
}

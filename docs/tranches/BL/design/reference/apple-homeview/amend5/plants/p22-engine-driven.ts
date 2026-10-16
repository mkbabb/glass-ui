// EXPECT PASS: the engine's own loop drives the spring (keyframes.js playback passes now - lastFrameT unclamped); no dt in src
declare const lead: { play(onFrame?: () => void): void; target: number };
export function hopTo(x: number): void {
    lead.target = x;
    lead.play();
}

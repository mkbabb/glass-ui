// EXPECT FAIL: M-08 S4 "`this.p` with no in-file write of `.p`": the clock object's dt is written elsewhere
export class Stepper {
    lead = { tickDt(dt: number) { void dt; } };
    declare frameDt: number;
    run = () => { this.lead.tickDt(this.frameDt); requestAnimationFrame(this.run); };
}

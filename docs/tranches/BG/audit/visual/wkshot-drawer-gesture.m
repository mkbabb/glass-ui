// BG.W-DRAWER-PAINT-BIND — WebKit (system WebKit.framework, Metal) LIVE-GESTURE probe.
// Off-screen WKWebView loads the NORMAL /compositions/drawer-live-behind route, opens
// the sheet at HALF (#detent-half.click()), then drives a SYNTHETIC pointer drag on the
// grip (pointermove writes --glass-drawer-t SYNCHRONOUSLY — no rAF, so off-screen
// throttling does not gag it) and reads the LIVE scalar + composited translateY per
// move via evaluateJavaScript. Proves the writer PAINTS in the real WebKit engine.
// Then snapshots the open state for a visual PNG (best-effort).
//   usage: wkshot-drawer-gesture <http-url> <out.png> <light|dark>
#import <Cocoa/Cocoa.h>
#import <WebKit/WebKit.h>

@interface Driver : NSObject <WKNavigationDelegate>
@property (strong) WKWebView *web;
@property (strong) NSWindow *win;
@property (strong) NSURL *url;
@property (strong) NSString *outPng;
@property (strong) NSString *mode;
@end

@implementation Driver
- (void)run {
    WKWebViewConfiguration *cfg = [[WKWebViewConfiguration alloc] init];
    self.web = [[WKWebView alloc] initWithFrame:NSMakeRect(0,0,1440,900) configuration:cfg];
    self.web.navigationDelegate = self;
    // Host in a real on-screen window so the CADisplayLink drives requestAnimationFrame
    // at 60fps (an OFF-SCREEN/window-less WKWebView SUSPENDS rAF, freezing the spring —
    // the release-snap could not be sampled). The window is small + auto-closes on exit.
    self.win = [[NSWindow alloc] initWithContentRect:NSMakeRect(0,0,1440,900)
        styleMask:NSWindowStyleMaskBorderless backing:NSBackingStoreBuffered defer:NO];
    [self.win setContentView:self.web];
    [self.win setLevel:NSNormalWindowLevel];
    [self.win orderFrontRegardless];
    [self.web loadRequest:[NSURLRequest requestWithURL:self.url]];
    dispatch_after(dispatch_time(DISPATCH_TIME_NOW, (int64_t)(60*NSEC_PER_SEC)), dispatch_get_main_queue(), ^{
        fprintf(stderr, "HARD TIMEOUT\n"); exit(2);
    });
}
- (void)webView:(WKWebView *)wv didFinishNavigation:(WKNavigation *)nav {
    NSString *js = [NSString stringWithFormat:
        @"(function(){try{localStorage.setItem('vueuse-color-scheme','%@');}catch(e){};var el=document.documentElement;if('%@'==='dark'){el.classList.add('dark');}else{el.classList.remove('dark');}el.style.colorScheme='%@';return el.className;})()",
        self.mode, self.mode, self.mode];
    [wv evaluateJavaScript:js completionHandler:^(id r, NSError *e){
        fprintf(stderr, "mode-inject -> %s\n", e?e.localizedDescription.UTF8String:[[r description] UTF8String]);
        // settle the route, then open the sheet at HALF
        dispatch_after(dispatch_time(DISPATCH_TIME_NOW, (int64_t)(3.0*NSEC_PER_SEC)), dispatch_get_main_queue(), ^{
            [self openHalf];
        });
    }];
}
- (void)openHalf {
    NSString *js = @"(function(){var b=document.getElementById('detent-half');if(!b)return 'no-button';b.click();return 'clicked';})()";
    [self.web evaluateJavaScript:js completionHandler:^(id r, NSError *e){
        fprintf(stderr, "open-half -> %s\n", e?e.localizedDescription.UTF8String:[[r description] UTF8String]);
        // let the open settle (spring rAF may be throttled off-screen; give it time)
        dispatch_after(dispatch_time(DISPATCH_TIME_NOW, (int64_t)(2.0*NSEC_PER_SEC)), dispatch_get_main_queue(), ^{
            [self runGesture];
        });
    }];
}
- (void)runGesture {
    NSString *js =
    @"(function(){"
    "  var el=document.querySelector('[data-glass-drawer]');"
    "  var h=document.querySelector('[data-glass-drawer-handle]');"
    "  if(!el||!h)return JSON.stringify({error:'no-sheet-or-handle',elPresent:!!el,hPresent:!!h});"
    "  function read(){var cs=getComputedStyle(el);var m=new DOMMatrix(cs.transform==='none'?'':cs.transform);"
    "    var inl=el.style.getPropertyValue('--glass-drawer-t').trim();"
    "    return {sc: inl===''?null:parseFloat(inl), ty:Math.round(m.m42*100)/100, vh:innerHeight, snapAttr:el.getAttribute('data-glass-drawer-snap-points'), dir:el.getAttribute('data-glass-drawer-direction')};}"
    "  var seat=read();"
    "  var r=h.getBoundingClientRect();var cx=r.left+r.width/2, cy=r.top+r.height/2;"
    "  var UP=160,N=12;var series=[];"
    "  try{h.dispatchEvent(new PointerEvent('pointerdown',{pointerId:1,clientX:cx,clientY:cy,bubbles:true}));}catch(e){}"
    "  var afterDown=read();"
    "  for(var i=1;i<=N;i++){"
    "    try{h.dispatchEvent(new PointerEvent('pointermove',{pointerId:1,clientX:cx,clientY:cy-(UP*i/N),bubbles:true}));}catch(e){}"
    "    series.push(read());"
    "  }"
    "  var dragPeak=read();"
    "  window.__rel=[];"
    "  try{h.dispatchEvent(new PointerEvent('pointerup',{pointerId:1,clientX:cx,clientY:cy-UP,bubbles:true}));}catch(e){}"
    "  var t0=performance.now();"
    "  var iv=setInterval(function(){var s=read();window.__rel.push({dt:Math.round(performance.now()-t0),sc:s.sc,ty:s.ty});if(performance.now()-t0>1400)clearInterval(iv);},40);"
    "  return JSON.stringify({seat:seat,afterDown:afterDown,dragSeries:series,dragPeak:dragPeak});"
    "})()";
    [self.web evaluateJavaScript:js completionHandler:^(id r, NSError *e){
        if (e) { fprintf(stderr, "gesture ERROR: %s\n", e.localizedDescription.UTF8String); printf("{\"error\":\"eval-failed\"}\n"); }
        else { printf("DRAG %s\n", [[r description] UTF8String]); }
        fflush(stdout);
        // wait for the post-release sampler (setTimeout-based, off-screen-robust) then read it
        dispatch_after(dispatch_time(DISPATCH_TIME_NOW, (int64_t)(1.7*NSEC_PER_SEC)), dispatch_get_main_queue(), ^{
            [self.web evaluateJavaScript:@"JSON.stringify(window.__rel||[])" completionHandler:^(id rr, NSError *ee){
                if (ee) fprintf(stderr, "release-read ERROR: %s\n", ee.localizedDescription.UTF8String);
                else printf("RELEASE %s\n", [[rr description] UTF8String]);
                fflush(stdout);
                [self snapshot];
            }];
        });
    }];
}
- (void)snapshot {
    WKSnapshotConfiguration *snap = [[WKSnapshotConfiguration alloc] init];
    snap.snapshotWidth = @1440;
    snap.afterScreenUpdates = YES;
    [self.web takeSnapshotWithConfiguration:snap completionHandler:^(NSImage *img, NSError *err){
        if (img && self.outPng) {
            CGImageRef cg = [img CGImageForProposedRect:NULL context:nil hints:nil];
            NSBitmapImageRep *rep = [[NSBitmapImageRep alloc] initWithCGImage:cg];
            NSData *png = [rep representationUsingType:NSBitmapImageFileTypePNG properties:@{}];
            [png writeToFile:self.outPng atomically:YES];
            fprintf(stderr, "snapshot %ldx%ld -> %s\n", (long)rep.pixelsWide, (long)rep.pixelsHigh, self.outPng.UTF8String);
        } else {
            fprintf(stderr, "snapshot FAILED: %s\n", err?err.localizedDescription.UTF8String:"nil");
        }
        exit(0);
    }];
}
- (void)webView:(WKWebView *)wv didFailNavigation:(WKNavigation *)nav withError:(NSError *)error { fprintf(stderr, "nav FAILED: %s\n", error.localizedDescription.UTF8String); exit(4); }
- (void)webView:(WKWebView *)wv didFailProvisionalNavigation:(WKNavigation *)nav withError:(NSError *)error { fprintf(stderr, "provisional nav FAILED: %s\n", error.localizedDescription.UTF8String); exit(5); }
@end

int main(int argc, const char **argv) {
    @autoreleasepool {
        if (argc < 4) { fprintf(stderr, "usage: wkshot-drawer-gesture <http-url> <out.png> <light|dark>\n"); return 3; }
        NSApplication *app = [NSApplication sharedApplication];
        [app setActivationPolicy:NSApplicationActivationPolicyAccessory];
        Driver *d = [[Driver alloc] init];
        d.url = [NSURL URLWithString:[NSString stringWithUTF8String:argv[1]]];
        d.outPng = [NSString stringWithUTF8String:argv[2]];
        d.mode = [NSString stringWithUTF8String:argv[3]];
        [d run];
        [app run];
    }
    return 0;
}

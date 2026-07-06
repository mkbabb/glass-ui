// wkshot-screencap — BG.W-DOTMATRIX-STABLE Safari/WebKit leg for a WebGL/WebGPU surface.
// takeSnapshotWithConfiguration does NOT capture the GPU-composited WebGL layer (proven:
// the globe region came back flat). So this hosts the WKWebView in a REAL on-screen NSWindow
// (system WebKit.framework = Safari 26 engine, Metal) and captures the ACTUAL composited
// window pixels via `screencapture -l<windowID>` (Screen-Recording TCC granted) — the GL
// globe is in the frame. Scrolls the ~460px globe into view after data-capture-ready, lets
// the live GL loop paint, then window-captures.
//   usage: wkshot-screencap <http-url> <out.png> <light|dark> [maxWaitMs]
#import <Cocoa/Cocoa.h>
#import <WebKit/WebKit.h>

@interface Driver : NSObject <WKNavigationDelegate>
@property (strong) WKWebView *web;
@property (strong) NSWindow *win;
@property (strong) NSURL *url;
@property (strong) NSString *outPng;
@property (strong) NSString *mode;
@property (assign) double maxWaitMs;
@property (assign) double pollElapsedMs;
@property (assign) BOOL snapped;
@end

@implementation Driver
- (void)run {
    WKWebViewConfiguration *cfg = [[WKWebViewConfiguration alloc] init];
    self.web = [[WKWebView alloc] initWithFrame:NSMakeRect(0,0,1440,900) configuration:cfg];
    self.web.navigationDelegate = self;
    // Place the window on the MAIN (menu-bar) screen, just inside its top-left visible area,
    // so it is on the display we capture. NSWindow origin is bottom-left in the GLOBAL space.
    NSScreen *main = [NSScreen mainScreen];
    NSRect vf = main.visibleFrame;
    CGFloat winX = vf.origin.x + 20;
    CGFloat winY = vf.origin.y + vf.size.height - 900 - 40; // top-left-ish, content 900 tall
    self.win = [[NSWindow alloc] initWithContentRect:NSMakeRect(winX,winY,1440,900)
        styleMask:NSWindowStyleMaskTitled|NSWindowStyleMaskClosable
        backing:NSBackingStoreBuffered defer:NO];
    [self.win setContentView:self.web];
    [self.win setTitle:@"wkshot-dotmatrix"];
    // Float ABOVE other apps (Chrome/Terminal) so the window is NOT occluded — an occluded
    // WKWebView is render-throttled by macOS and screencaptures BLACK.
    [self.win setLevel:NSScreenSaverWindowLevel];
    [self.win makeKeyAndOrderFront:nil];
    [self.win orderFrontRegardless];
    [NSApp activateIgnoringOtherApps:YES];
    self.pollElapsedMs = 0;
    self.snapped = NO;
    [self.web loadRequest:[NSURLRequest requestWithURL:self.url]];
    dispatch_after(dispatch_time(DISPATCH_TIME_NOW, (int64_t)((self.maxWaitMs/1000.0 + 25)*NSEC_PER_SEC)), dispatch_get_main_queue(), ^{
        if (!self.snapped) { fprintf(stderr, "TIMEOUT\n"); exit(2); }
    });
}
- (void)webView:(WKWebView *)wv didFinishNavigation:(WKNavigation *)nav {
    NSString *js = [NSString stringWithFormat:
        @"(function(){try{localStorage.setItem('vueuse-color-scheme','%@');}catch(e){};var el=document.documentElement;if('%@'==='dark'){el.classList.add('dark');}else{el.classList.remove('dark');}el.style.colorScheme='%@';return el.className;})()",
        self.mode, self.mode, self.mode];
    [wv evaluateJavaScript:js completionHandler:^(id r, NSError *e){
        fprintf(stderr, "mode-inject(%s) -> %s\n", self.mode.UTF8String, e?e.localizedDescription.UTF8String:[[r description] UTF8String]);
    }];
    [self pollReady];
}
- (void)pollReady {
    if (self.snapped) return;
    [self.web evaluateJavaScript:@"document.documentElement.hasAttribute('data-capture-ready') ? '1' : '0'"
                completionHandler:^(id r, NSError *e){
        BOOL ready = (!e && [[r description] isEqualToString:@"1"]);
        if (ready) {
            fprintf(stderr, "data-capture-ready after %.0fms -> scroll+paint\n", self.pollElapsedMs);
            [self scrollThenSnap];
            return;
        }
        if (self.pollElapsedMs >= self.maxWaitMs) {
            fprintf(stderr, "maxWaitMs(%.0fms) reached -> scroll+paint anyway\n", self.maxWaitMs);
            [self scrollThenSnap];
            return;
        }
        self.pollElapsedMs += 300;
        dispatch_after(dispatch_time(DISPATCH_TIME_NOW, (int64_t)(0.3*NSEC_PER_SEC)), dispatch_get_main_queue(), ^{
            [self pollReady];
        });
    }];
}
- (void)scrollThenSnap {
    NSString *scrollJs =
        @"(function(){var cs=Array.from(document.querySelectorAll('canvas'));"
        @"var i=cs.findIndex(function(c){var r=c.getBoundingClientRect();return Math.abs(r.height-460)<40&&r.width<1300;});"
        @"if(i<0)return 'nofind';cs[i].scrollIntoView({block:'center'});var r=cs[i].getBoundingClientRect();"
        @"return JSON.stringify({x:Math.round(r.x),y:Math.round(r.y),w:Math.round(r.width),h:Math.round(r.height),n:cs.length});})()";
    [self.web evaluateJavaScript:scrollJs completionHandler:^(id r, NSError *e){
        fprintf(stderr, "scroll -> %s\n", e?e.localizedDescription.UTF8String:[[r description] UTF8String]);
        dispatch_after(dispatch_time(DISPATCH_TIME_NOW, (int64_t)(3.0*NSEC_PER_SEC)), dispatch_get_main_queue(), ^{
            [self screencap];
        });
    }];
}
- (void)screencap {
    if (self.snapped) return;
    self.snapped = YES;
    [self.win makeKeyAndOrderFront:nil];
    [NSApp activateIgnoringOtherApps:YES];
    // FULL-DISPLAY capture (proven to work; -l/-R miss the out-of-process WebContent layer or
    // hit rect errors). Print the globe canvas rect in CG top-left RETINA pixels so the shell
    // crops it precisely. content top-left (CG points) = (winContentX, screenH - (winContentY
    // + contentH)); globe screen rect = content origin + gBCR (viewport points); x2 for retina.
    NSRect cf = [self.web frame];               // content view frame in window coords
    NSRect wf = self.win.frame;                  // window frame (bottom-left, GLOBAL points)
    NSScreen *wscreen = self.win.screen ?: [NSScreen mainScreen];
    NSRect sf = wscreen.frame;                    // the window's screen frame (global points)
    CGFloat scale = wscreen.backingScaleFactor;
    // content origin in GLOBAL points (bottom-left)
    CGFloat contentBLx = wf.origin.x + cf.origin.x;
    CGFloat contentBLy = wf.origin.y + cf.origin.y;
    // convert to the SCREEN-LOCAL top-left origin (screencapture -D writes that display only)
    CGFloat contentLocalTopY = (sf.origin.y + sf.size.height) - (contentBLy + cf.size.height);
    CGFloat contentLocalX = contentBLx - sf.origin.x;
    fprintf(stderr, "WIN_SCREEN frame=(%.0f,%.0f,%.0f,%.0f) scale=%.1f screenNum=%@\n",
        sf.origin.x, sf.origin.y, sf.size.width, sf.size.height, scale,
        wscreen.deviceDescription[@"NSScreenNumber"]);
    __block CGFloat gx=0, gy=0, gw=0, gh=0;
    [self.web evaluateJavaScript:@"(function(){var cs=Array.from(document.querySelectorAll('canvas'));var i=cs.findIndex(function(c){var r=c.getBoundingClientRect();return Math.abs(r.height-460)<40&&r.width<1300;});var r=cs[i].getBoundingClientRect();return r.x+','+r.y+','+r.width+','+r.height;})()"
        completionHandler:^(id r, NSError *e){
        NSArray *parts = [[r description] componentsSeparatedByString:@","];
        if (parts.count==4){ gx=[parts[0] doubleValue]; gy=[parts[1] doubleValue]; gw=[parts[2] doubleValue]; gh=[parts[3] doubleValue]; }
        CGFloat globeLocalX = contentLocalX + gx;
        CGFloat globeLocalY = contentLocalTopY + gy;
        fprintf(stderr, "GLOBE_RETINA_RECT %.0f %.0f %.0f %.0f\n", globeLocalX*scale, globeLocalY*scale, gw*scale, gh*scale);
        // Capture BOTH displays (screencapture writes one file per active display, in order).
        NSString *f0 = [self.outPng stringByReplacingOccurrencesOfString:@".png" withString:@"-disp0.png"];
        NSString *f1 = [self.outPng stringByReplacingOccurrencesOfString:@".png" withString:@"-disp1.png"];
        NSTask *t = [[NSTask alloc] init];
        t.launchPath = @"/usr/sbin/screencapture";
        t.arguments = @[@"-x", f0, f1];
        [t launch];
        [t waitUntilExit];
        NSFileManager *fm = [NSFileManager defaultManager];
        BOOL ok = [fm fileExistsAtPath:f0];
        fprintf(stderr, "screencapture both-displays exit=%d f0=%s f1=%s\n", t.terminationStatus,
            [fm fileExistsAtPath:f0]?"yes":"no", [fm fileExistsAtPath:f1]?"yes":"no");
        printf(ok ? "OK\n" : "FAIL\n");
        fflush(stdout);
        exit(ok ? 0 : 1);
    }];
}
- (void)webView:(WKWebView *)wv didFailNavigation:(WKNavigation *)nav withError:(NSError *)error {
    fprintf(stderr, "nav FAILED: %s\n", error.localizedDescription.UTF8String); exit(4);
}
- (void)webView:(WKWebView *)wv didFailProvisionalNavigation:(WKNavigation *)nav withError:(NSError *)error {
    fprintf(stderr, "provisional nav FAILED: %s\n", error.localizedDescription.UTF8String); exit(5);
}
@end

int main(int argc, const char **argv) {
    @autoreleasepool {
        if (argc < 4) { fprintf(stderr, "usage: wkshot-screencap <http-url> <out.png> <light|dark> [maxWaitMs]\n"); return 3; }
        NSApplication *app = [NSApplication sharedApplication];
        [app setActivationPolicy:NSApplicationActivationPolicyRegular];
        Driver *d = [[Driver alloc] init];
        d.url = [NSURL URLWithString:[NSString stringWithUTF8String:argv[1]]];
        d.outPng = [NSString stringWithUTF8String:argv[2]];
        d.mode = [NSString stringWithUTF8String:argv[3]];
        d.maxWaitMs = argc >= 5 ? atof(argv[4]) : 12000;
        [d run];
        [app run];
    }
    return 0;
}

// wkshot-live — BG.W-PAINT-IS-THE-GATE C-SAFARI leg. A WKWebView (system WebKit.framework
// = the real Safari 26 engine, Metal) loading the LIVE demo route, then off-screen-
// snapshotting the composited content (no Screen-Recording TCC needed). The on-screen
// composite path twin of screencapture window-mode (protocol §5/§6), for the live route the
// file-URL wkshot.m fixture tool cannot reach.
//
//   usage: wkshot-live <http-url> <out.png> <light|dark> [maxWaitMs]
//
// BG C18 CAPTURE MODE (the off-screen-blank fix): drive the `?capture=<route>&mode=<mode>`
// boot path (demo/main.ts). That mode neutralizes the `.route-enter` transform-promoted
// compositing layer (the capture stylesheet) so the off-screen snapshot captures the FULL
// route content (today a bare `?route` URL snapshots a BLANK <main> — the promoted layer is
// dropped off-screen), and signals readiness via `document.documentElement[data-capture-ready]`.
// This harness POLLS that attribute (up to maxWaitMs) BEFORE snapshotting — a deterministic
// readiness signal instead of a fixed sleep. For a non-capture URL the attribute never
// appears, so the poll falls through to the maxWaitMs cap (the legacy fixed-delay behavior).
#import <Cocoa/Cocoa.h>
#import <WebKit/WebKit.h>

@interface Driver : NSObject <WKNavigationDelegate>
@property (strong) WKWebView *web;
@property (strong) NSURL *url;
@property (strong) NSString *outPng;
@property (strong) NSString *mode;
@property (assign) double maxWaitMs;
@property (assign) double pollElapsedMs;
@property (assign) double scrollY;
@property (assign) BOOL snapped;
@end

@implementation Driver
- (void)run {
    WKWebViewConfiguration *cfg = [[WKWebViewConfiguration alloc] init];
    self.web = [[WKWebView alloc] initWithFrame:NSMakeRect(0,0,1440,900) configuration:cfg];
    self.web.navigationDelegate = self;
    self.pollElapsedMs = 0;
    self.snapped = NO;
    [self.web loadRequest:[NSURLRequest requestWithURL:self.url]];
    // Hard ceiling so a wedged page never hangs the harness forever.
    dispatch_after(dispatch_time(DISPATCH_TIME_NOW, (int64_t)((self.maxWaitMs/1000.0 + 20)*NSEC_PER_SEC)), dispatch_get_main_queue(), ^{
        if (!self.snapped) { fprintf(stderr, "TIMEOUT\n"); exit(2); }
    });
}
- (void)webView:(WKWebView *)wv didFinishNavigation:(WKNavigation *)nav {
    // Belt-and-suspenders: the `?capture=&mode=` URL already booted in this mode,
    // but re-assert the mode (idempotent — sets the same value) for a non-capture URL.
    NSString *js = [NSString stringWithFormat:
        @"(function(){try{localStorage.setItem('vueuse-color-scheme','%@');}catch(e){};var el=document.documentElement;if('%@'==='dark'){el.classList.add('dark');}else{el.classList.remove('dark');}el.style.colorScheme='%@';return el.className;})()",
        self.mode, self.mode, self.mode];
    [wv evaluateJavaScript:js completionHandler:^(id r, NSError *e){
        fprintf(stderr, "mode-inject(%s) -> %s\n", self.mode.UTF8String, e?e.localizedDescription.UTF8String:[[r description] UTF8String]);
    }];
    // Begin polling `data-capture-ready` (the C18 deterministic readiness signal).
    [self pollReady];
}
- (void)pollReady {
    if (self.snapped) return;
    [self.web evaluateJavaScript:@"document.documentElement.hasAttribute('data-capture-ready') ? '1' : '0'"
                completionHandler:^(id r, NSError *e){
        BOOL ready = (!e && [[r description] isEqualToString:@"1"]);
        if (ready) {
            fprintf(stderr, "data-capture-ready after %.0fms -> scroll-viz-into-view then snapshot\n", self.pollElapsedMs);
            // The AppShell route-scroller is <main>, not window. Find the viz canvas (the one
            // whose CSS box is narrower than the viewport — the shell aurora is full-bleed) and
            // scroll it to the top of its scroll container so the 1440x900 viewport frames it.
            NSString *sj = @"(function(){var cs=[].slice.call(document.querySelectorAll('canvas'));var pick=null;for(var i=0;i<cs.length;i++){var r=cs[i].getBoundingClientRect();if(r.width>0&&r.width<window.innerWidth-50){pick=cs[i];break;}}if(!pick)pick=cs[cs.length-1];if(pick){pick.scrollIntoView({block:'start'});var r2=pick.getBoundingClientRect();return JSON.stringify({top:Math.round(r2.top),w:Math.round(r2.width),h:Math.round(r2.height)});}return 'nocanvas';})()";
            [self.web evaluateJavaScript:sj completionHandler:^(id rr, NSError *ee){
                fprintf(stderr, "scroll-into-view -> %s\n", ee?ee.localizedDescription.UTF8String:[[rr description] UTF8String]);
                // settle the viz a beat after scroll (rAF frames + one live wave step), then snapshot
                dispatch_after(dispatch_time(DISPATCH_TIME_NOW, (int64_t)(0.9*NSEC_PER_SEC)), dispatch_get_main_queue(), ^{
                    [self snapshot];
                });
            }];
            return;
        }
        if (self.pollElapsedMs >= self.maxWaitMs) {
            fprintf(stderr, "maxWaitMs(%.0fms) reached without data-capture-ready -> snapshotting anyway\n", self.maxWaitMs);
            [self snapshot];
            return;
        }
        self.pollElapsedMs += 300;
        dispatch_after(dispatch_time(DISPATCH_TIME_NOW, (int64_t)(0.3*NSEC_PER_SEC)), dispatch_get_main_queue(), ^{
            [self pollReady];
        });
    }];
}
- (void)snapshot {
    if (self.snapped) return;
    self.snapped = YES;
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
            printf("OK %ldx%ld\n", (long)rep.pixelsWide, (long)rep.pixelsHigh);
        } else {
            fprintf(stderr, "snapshot FAILED: %s\n", err?err.localizedDescription.UTF8String:"nil image");
            printf("FAIL\n");
        }
        fflush(stdout);
        exit(img ? 0 : 1);
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
        if (argc < 4) { fprintf(stderr, "usage: wkshot-live <http-url> <out.png> <light|dark> [maxWaitMs]\n"); return 3; }
        NSApplication *app = [NSApplication sharedApplication];
        [app setActivationPolicy:NSApplicationActivationPolicyAccessory];
        Driver *d = [[Driver alloc] init];
        d.url = [NSURL URLWithString:[NSString stringWithUTF8String:argv[1]]];
        d.outPng = [NSString stringWithUTF8String:argv[2]];
        d.mode = [NSString stringWithUTF8String:argv[3]];
        d.maxWaitMs = argc >= 5 ? atof(argv[4]) : 12000;
        d.scrollY = argc >= 6 ? atof(argv[5]) : 0;
        [d run];
        [app run];
    }
    return 0;
}

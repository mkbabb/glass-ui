// wkshot-concentric — WebKit (Safari 26/Metal) leg for BG.W-CONCENTRIC-LEVELCURVES. Fork of
// docs/tranches/BG/audit/wkshot-live.m with a SCROLL-INTO-VIEW step: the concentric hero sits
// below the fold (y≈1062), so before the off-screen retina snapshot this scrolls
// `.concentric-canvas` to the top of a tall viewport, waits for the composite to settle, prints
// the post-scroll rect (for cropping), then snapshots. Same C18 data-capture-ready poll.
//   usage: wkshot-concentric <http-url> <out.png> <light|dark> [maxWaitMs]
#import <Cocoa/Cocoa.h>
#import <WebKit/WebKit.h>

@interface Driver : NSObject <WKNavigationDelegate>
@property (strong) WKWebView *web;
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
    // Extra-tall viewport so the below-the-fold concentric hero (≈700px at y≈1062) is naturally
    // in-frame with NO scroll (avoids a scrollIntoView-triggered ResizeObserver blank frame).
    self.web = [[WKWebView alloc] initWithFrame:NSMakeRect(0,0,1440,1900) configuration:cfg];
    self.web.navigationDelegate = self;
    self.pollElapsedMs = 0;
    self.snapped = NO;
    [self.web loadRequest:[NSURLRequest requestWithURL:self.url]];
    dispatch_after(dispatch_time(DISPATCH_TIME_NOW, (int64_t)((self.maxWaitMs/1000.0 + 20)*NSEC_PER_SEC)), dispatch_get_main_queue(), ^{
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
            fprintf(stderr, "data-capture-ready after %.0fms -> scroll+snapshot\n", self.pollElapsedMs);
            [self scrollThenSnap];
            return;
        }
        if (self.pollElapsedMs >= self.maxWaitMs) {
            fprintf(stderr, "maxWaitMs reached -> scroll+snapshot anyway\n");
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
    // Scroll the concentric hero to the top of the (tall) viewport, then settle, then snapshot.
    // NO scroll — the tall viewport already contains the concentric. Just read its rect (for the
    // crop) and any WebGL/WebGPU error signal the substrate may have stamped on the element.
    NSString *scrollJs =
        @"(function(){var c=document.querySelector('.concentric-canvas');if(!c)return 'no-canvas';var r2=c.getBoundingClientRect();return JSON.stringify({x:Math.round(r2.x),y:Math.round(r2.y),w:Math.round(r2.width),h:Math.round(r2.height),cw:c.width,ch:c.height,ctx:c.getAttribute('data-substrate')||'?'});})()";
    [self.web evaluateJavaScript:scrollJs completionHandler:^(id r, NSError *e){
        fprintf(stderr, "scroll -> %s\n", e?e.localizedDescription.UTF8String:[[r description] UTF8String]);
        // let the traveling wave paint a fresh frame after scroll before snapping
        dispatch_after(dispatch_time(DISPATCH_TIME_NOW, (int64_t)(0.8*NSEC_PER_SEC)), dispatch_get_main_queue(), ^{
            [self snapshot];
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
        if (argc < 4) { fprintf(stderr, "usage: wkshot-concentric <http-url> <out.png> <light|dark> [maxWaitMs]\n"); return 3; }
        NSApplication *app = [NSApplication sharedApplication];
        [app setActivationPolicy:NSApplicationActivationPolicyAccessory];
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

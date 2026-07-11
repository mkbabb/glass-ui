// BG.W-FOURIER-BEAUTY — WebKit capture in an ON-SCREEN NSWindow. The off-screen (accessory,
// no-window) WKWebView presents WebGPU to a surface that takeSnapshotWithConfiguration cannot
// flatten (the WGSL canvas layer is blank in the snapshot though the render loop runs +
// navigator.gpu is present). Presenting the WebView in a real on-screen window lets WebGPU
// present onto a display layer that the snapshot CAN capture. No Screen-Recording TCC needed
// (takeSnapshotWithConfiguration is WebKit's own API, not CGWindowListCreateImage).
//
//   usage: wkshot-window <url> <out.png> <light|dark> <maxWaitMs> <scrollSelector> <settleMs>
#import <Cocoa/Cocoa.h>
#import <WebKit/WebKit.h>

@interface Driver : NSObject <WKNavigationDelegate>
@property (strong) NSWindow *window;
@property (strong) WKWebView *web;
@property (strong) NSURL *url;
@property (strong) NSString *outPng;
@property (strong) NSString *mode;
@property (strong) NSString *scrollSel;
@property (assign) double settleMs;
@property (assign) double maxWaitMs;
@property (assign) double pollElapsedMs;
@property (assign) BOOL snapped;
@end

@implementation Driver
- (void)run {
    NSRect frame = NSMakeRect(0, 0, 1440, 900);
    WKWebViewConfiguration *cfg = [[WKWebViewConfiguration alloc] init];
    self.web = [[WKWebView alloc] initWithFrame:frame configuration:cfg];
    self.web.navigationDelegate = self;
    self.window = [[NSWindow alloc] initWithContentRect:frame
        styleMask:NSWindowStyleMaskTitled|NSWindowStyleMaskClosable
        backing:NSBackingStoreBuffered defer:NO];
    [self.window setContentView:self.web];
    [self.window makeKeyAndOrderFront:nil];
    [self.window orderFrontRegardless];
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
        if (ready || self.pollElapsedMs >= self.maxWaitMs) {
            fprintf(stderr, "%s after %.0fms -> scroll+snapshot\n", ready?"data-capture-ready":"maxWait", self.pollElapsedMs);
            [self scrollThenSnapshot];
            return;
        }
        self.pollElapsedMs += 300;
        dispatch_after(dispatch_time(DISPATCH_TIME_NOW, (int64_t)(0.3*NSEC_PER_SEC)), dispatch_get_main_queue(), ^{ [self pollReady]; });
    }];
}
- (void)scrollThenSnapshot {
    if (self.snapped) return;
    NSString *sjs = [NSString stringWithFormat:
        @"(function(){var t=document.querySelector('%@');if(!t)return 'no-target';t.scrollIntoView({block:'center'});var r=t.getBoundingClientRect();return JSON.stringify({top:Math.round(r.top),h:Math.round(r.height)});})()",
        self.scrollSel];
    [self.web evaluateJavaScript:sjs completionHandler:^(id r, NSError *e){
        fprintf(stderr, "scroll(%s) -> %s\n", self.scrollSel.UTF8String, e?e.localizedDescription.UTF8String:[[r description] UTF8String]);
        dispatch_after(dispatch_time(DISPATCH_TIME_NOW, (int64_t)((self.settleMs/1000.0)*NSEC_PER_SEC)), dispatch_get_main_queue(), ^{ [self snapshot]; });
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
        if (argc < 7) { fprintf(stderr, "usage: wkshot-window <url> <out.png> <light|dark> <maxWaitMs> <scrollSelector> <settleMs>\n"); return 3; }
        NSApplication *app = [NSApplication sharedApplication];
        [app setActivationPolicy:NSApplicationActivationPolicyRegular];
        Driver *d = [[Driver alloc] init];
        d.url = [NSURL URLWithString:[NSString stringWithUTF8String:argv[1]]];
        d.outPng = [NSString stringWithUTF8String:argv[2]];
        d.mode = [NSString stringWithUTF8String:argv[3]];
        d.maxWaitMs = atof(argv[4]);
        d.scrollSel = [NSString stringWithUTF8String:argv[5]];
        d.settleMs = atof(argv[6]);
        [d run];
        [app run];
    }
    return 0;
}

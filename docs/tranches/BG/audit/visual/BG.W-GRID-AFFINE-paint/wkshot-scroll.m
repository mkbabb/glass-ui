// wkshot-scroll — paint-judge Safari leg for a BELOW-FOLD viz canvas. Same real WebKit.framework
// (Safari 26, Metal) + the ?capture=&mode= boot path + data-capture-ready poll as wkshot-live.m,
// but after readiness it SCROLLS the liquid-grid canvas to the top of the 1440x900 viewport
// (un-parking content-visibility), waits for it to arm + animate, then off-screen-snapshots.
//   usage: wkshot-scroll <http-url> <out.png> <light|dark> [maxWaitMs]
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
    self.web = [[WKWebView alloc] initWithFrame:NSMakeRect(0,0,1440,900) configuration:cfg];
    self.web.navigationDelegate = self;
    self.pollElapsedMs = 0; self.snapped = NO;
    [self.web loadRequest:[NSURLRequest requestWithURL:self.url]];
    dispatch_after(dispatch_time(DISPATCH_TIME_NOW, (int64_t)((self.maxWaitMs/1000.0 + 25)*NSEC_PER_SEC)), dispatch_get_main_queue(), ^{
        if (!self.snapped) { fprintf(stderr, "TIMEOUT\n"); exit(2); }
    });
}
- (void)webView:(WKWebView *)wv didFinishNavigation:(WKNavigation *)nav {
    NSString *js = [NSString stringWithFormat:
        @"(function(){try{localStorage.setItem('vueuse-color-scheme','%@');}catch(e){};var el=document.documentElement;if('%@'==='dark'){el.classList.add('dark');}else{el.classList.remove('dark');}el.style.colorScheme='%@';return el.className;})()",
        self.mode, self.mode, self.mode];
    [wv evaluateJavaScript:js completionHandler:nil];
    [self pollReady];
}
- (void)pollReady {
    if (self.snapped) return;
    [self.web evaluateJavaScript:@"document.documentElement.hasAttribute('data-capture-ready') ? '1' : '0'"
                completionHandler:^(id r, NSError *e){
        BOOL ready = (!e && [[r description] isEqualToString:@"1"]);
        if (ready) { [self scrollThenSnap]; return; }
        if (self.pollElapsedMs >= self.maxWaitMs) { [self scrollThenSnap]; return; }
        self.pollElapsedMs += 300;
        dispatch_after(dispatch_time(DISPATCH_TIME_NOW, (int64_t)(0.3*NSEC_PER_SEC)), dispatch_get_main_queue(), ^{ [self pollReady]; });
    }];
}
- (void)scrollThenSnap {
    NSString *scrollJs =
      @"(function(){var c=document.querySelector('[data-testid=\"liquid-grid-canvas\"]');"
      @"if(!c)return 'no-canvas';c.scrollIntoView({block:'start',inline:'nearest'});"
      @"var r=c.getBoundingClientRect();return JSON.stringify({top:Math.round(r.top),left:Math.round(r.left)});})()";
    [self.web evaluateJavaScript:scrollJs completionHandler:^(id r, NSError *e){
        fprintf(stderr, "scroll -> %s\n", [[r description] UTF8String]);
        // wait ~1.6s for content-visibility un-park + arm + a few animation frames
        dispatch_after(dispatch_time(DISPATCH_TIME_NOW, (int64_t)(4.5*NSEC_PER_SEC)), dispatch_get_main_queue(), ^{
            [self snapshot];
        });
    }];
}
- (void)snapshot {
    if (self.snapped) return;
    self.snapped = YES;
    WKSnapshotConfiguration *snap = [[WKSnapshotConfiguration alloc] init];
    snap.snapshotWidth = @1440; snap.afterScreenUpdates = YES;
    [self.web takeSnapshotWithConfiguration:snap completionHandler:^(NSImage *img, NSError *err){
        if (img && self.outPng) {
            CGImageRef cg = [img CGImageForProposedRect:NULL context:nil hints:nil];
            NSBitmapImageRep *rep = [[NSBitmapImageRep alloc] initWithCGImage:cg];
            NSData *png = [rep representationUsingType:NSBitmapImageFileTypePNG properties:@{}];
            [png writeToFile:self.outPng atomically:YES];
            printf("OK %ldx%ld\n", (long)rep.pixelsWide, (long)rep.pixelsHigh);
        } else { fprintf(stderr, "snapshot FAILED: %s\n", err?err.localizedDescription.UTF8String:"nil"); }
        exit(0);
    }];
}
@end

int main(int argc, const char **argv) {
    if (argc < 4) { fprintf(stderr, "usage: wkshot-scroll <url> <out.png> <light|dark> [maxWaitMs]\n"); return 1; }
    @autoreleasepool {
        [NSApplication sharedApplication];
        Driver *d = [Driver new];
        d.url = [NSURL URLWithString:[NSString stringWithUTF8String:argv[1]]];
        d.outPng = [NSString stringWithUTF8String:argv[2]];
        d.mode = [NSString stringWithUTF8String:argv[3]];
        d.maxWaitMs = argc > 4 ? atof(argv[4]) : 15000;
        [d run];
        [NSApp run];
    }
    return 0;
}

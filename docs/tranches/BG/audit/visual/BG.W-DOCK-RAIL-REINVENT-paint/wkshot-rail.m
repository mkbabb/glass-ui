// wkshot-rail — BG.W-DOCK-RAIL-REINVENT Safari fan-capture variant of wkshot-live.
// After data-capture-ready, scrolls the Nth .dock-stack's owning dock to center and
// (optionally) dispatches pointerenter to fan the macOS-stack open, waits for the
// scroll + intent-dwell + --spring-dock settle, then off-screen snapshots.
//   usage: wkshot-rail <http-url> <out.png> <light|dark> <maxWaitMs> <stackIdx> <expand:0|1>
#import <Cocoa/Cocoa.h>
#import <WebKit/WebKit.h>

@interface Driver : NSObject <WKNavigationDelegate>
@property (strong) WKWebView *web;
@property (strong) NSURL *url;
@property (strong) NSString *outPng;
@property (strong) NSString *mode;
@property (assign) double maxWaitMs;
@property (assign) double pollElapsedMs;
@property (assign) int stackIdx;
@property (assign) int expand;
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
    dispatch_after(dispatch_time(DISPATCH_TIME_NOW, (int64_t)((self.maxWaitMs/1000.0 + 25)*NSEC_PER_SEC)), dispatch_get_main_queue(), ^{
        if (!self.snapped) { fprintf(stderr, "TIMEOUT\n"); exit(2); }
    });
}
- (void)webView:(WKWebView *)wv didFinishNavigation:(WKNavigation *)nav {
    NSString *js = [NSString stringWithFormat:
        @"(function(){try{localStorage.setItem('vueuse-color-scheme','%@');}catch(e){};var el=document.documentElement;if('%@'==='dark'){el.classList.add('dark');}else{el.classList.remove('dark');}el.style.colorScheme='%@';return el.className;})()",
        self.mode, self.mode, self.mode];
    [wv evaluateJavaScript:js completionHandler:^(id r, NSError *e){
        fprintf(stderr, "mode-inject(%s)\n", self.mode.UTF8String);
    }];
    [self pollReady];
}
- (void)pollReady {
    if (self.snapped) return;
    [self.web evaluateJavaScript:@"document.documentElement.hasAttribute('data-capture-ready') ? '1' : '0'"
                completionHandler:^(id r, NSError *e){
        BOOL ready = (!e && [[r description] isEqualToString:@"1"]);
        if (ready) {
            fprintf(stderr, "data-capture-ready after %.0fms -> interacting\n", self.pollElapsedMs);
            [self interactThenSnap];
            return;
        }
        if (self.pollElapsedMs >= self.maxWaitMs) {
            fprintf(stderr, "maxWaitMs(%.0fms) reached -> interacting anyway\n", self.maxWaitMs);
            [self interactThenSnap];
            return;
        }
        self.pollElapsedMs += 300;
        dispatch_after(dispatch_time(DISPATCH_TIME_NOW, (int64_t)(0.3*NSEC_PER_SEC)), dispatch_get_main_queue(), ^{
            [self pollReady];
        });
    }];
}
- (void)interactThenSnap {
    NSString *js = [NSString stringWithFormat:
        @"(function(){var ss=document.querySelectorAll('.dock-stack');var i=%d;var s=ss[i];if(!s)return 'no-stack:'+ss.length;var frame=s.closest('.glass-dock-frame')||s;var dock=frame.querySelector('.glass-dock')||frame;(dock||frame).scrollIntoView({block:'center',inline:'center'});if(%d){s.dispatchEvent(new PointerEvent('pointerenter',{bubbles:false}));}return 'ok stacks='+ss.length+' exp='+s.classList.contains('is-expanded');})()",
        self.stackIdx, self.expand];
    [self.web evaluateJavaScript:js completionHandler:^(id r, NSError *e){
        fprintf(stderr, "interact -> %s\n", e?e.localizedDescription.UTF8String:[[r description] UTF8String]);
        // wait for scroll + 60ms intent + --spring-dock settle, then snapshot
        dispatch_after(dispatch_time(DISPATCH_TIME_NOW, (int64_t)(1.3*NSEC_PER_SEC)), dispatch_get_main_queue(), ^{
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
        if (argc < 7) { fprintf(stderr, "usage: wkshot-rail <url> <out.png> <light|dark> <maxWaitMs> <stackIdx> <expand:0|1>\n"); return 3; }
        NSApplication *app = [NSApplication sharedApplication];
        [app setActivationPolicy:NSApplicationActivationPolicyAccessory];
        Driver *d = [[Driver alloc] init];
        d.url = [NSURL URLWithString:[NSString stringWithUTF8String:argv[1]]];
        d.outPng = [NSString stringWithUTF8String:argv[2]];
        d.mode = [NSString stringWithUTF8String:argv[3]];
        d.maxWaitMs = atof(argv[4]);
        d.stackIdx = atoi(argv[5]);
        d.expand = atoi(argv[6]);
        [d run];
        [app run];
    }
    return 0;
}

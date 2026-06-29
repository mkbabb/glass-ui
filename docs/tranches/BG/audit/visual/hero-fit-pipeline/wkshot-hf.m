// wkshot-hf — BG.W-HERO-FIT C-SAFARI leg. Width-parameterized off-screen WKWebView
// (system WebKit.framework = real Safari 26 / Metal) that loads the ?capture= route,
// polls data-capture-ready, runs the shared DOM probe (window.__spProbe) AND snapshots
// the composited content. Combines wk-sp-probe.m (computed probe) + wkshot-live.m (snapshot).
//   usage: wkshot-hf <http-url> <out.png> <light|dark> <width> <height> <probe-file> [maxWaitMs]
#import <Cocoa/Cocoa.h>
#import <WebKit/WebKit.h>

@interface Driver : NSObject <WKNavigationDelegate>
@property (strong) WKWebView *web;
@property (strong) NSURL *url;
@property (strong) NSString *outPng;
@property (strong) NSString *mode;
@property (strong) NSString *probeSrc;
@property (assign) int vw;
@property (assign) int vh;
@property (assign) double maxWaitMs;
@property (assign) double pollElapsedMs;
@property (assign) BOOL snapped;
@end

@implementation Driver
- (void)run {
    WKWebViewConfiguration *cfg = [[WKWebViewConfiguration alloc] init];
    self.web = [[WKWebView alloc] initWithFrame:NSMakeRect(0,0,self.vw,self.vh) configuration:cfg];
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
            fprintf(stderr, "data-capture-ready after %.0fms -> probe+snapshot\n", self.pollElapsedMs);
            [self probeThenSnapshot];
            return;
        }
        if (self.pollElapsedMs >= self.maxWaitMs) {
            fprintf(stderr, "maxWaitMs reached without data-capture-ready -> probe+snapshot anyway\n");
            [self probeThenSnapshot];
            return;
        }
        self.pollElapsedMs += 300;
        dispatch_after(dispatch_time(DISPATCH_TIME_NOW, (int64_t)(0.3*NSEC_PER_SEC)), dispatch_get_main_queue(), ^{
            [self pollReady];
        });
    }];
}
- (void)probeThenSnapshot {
    NSString *defJS = [self.probeSrc stringByAppendingString:@"\n;\"PROBE_DEFINED\";"];
    [self.web evaluateJavaScript:defJS completionHandler:^(id r, NSError *e){
        if (e) { fprintf(stderr,"probe-def FAIL: %s\n", e.localizedDescription.UTF8String); }
        [self.web callAsyncJavaScript:@"return await window.__spProbe();"
                            arguments:nil
                              inFrame:nil
                       inContentWorld:WKContentWorld.pageWorld
                    completionHandler:^(id res, NSError *err){
            if (err) { fprintf(stderr,"probe-call FAIL: %s\n", err.localizedDescription.UTF8String); printf("PROBE {\"error\":\"probe-call\"}\n"); }
            else {
                NSString *json = [res isKindOfClass:[NSString class]] ? res : [res description];
                printf("PROBE %s\n", json.UTF8String);
                fflush(stdout);
            }
            [self snapshot];
        }];
    }];
}
- (void)snapshot {
    if (self.snapped) return;
    self.snapped = YES;
    WKSnapshotConfiguration *snap = [[WKSnapshotConfiguration alloc] init];
    snap.snapshotWidth = @(self.vw);
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
- (void)webView:(WKWebView *)wv didFailNavigation:(WKNavigation *)nav withError:(NSError *)error { fprintf(stderr,"nav FAIL: %s\n",error.localizedDescription.UTF8String); exit(4); }
- (void)webView:(WKWebView *)wv didFailProvisionalNavigation:(WKNavigation *)nav withError:(NSError *)error { fprintf(stderr,"prov FAIL: %s\n",error.localizedDescription.UTF8String); exit(5); }
@end

int main(int argc, const char **argv) {
    @autoreleasepool {
        if (argc < 7) { fprintf(stderr,"usage: wkshot-hf <url> <out.png> <light|dark> <width> <height> <probe-file> [maxWaitMs]\n"); return 3; }
        NSApplication *app = [NSApplication sharedApplication];
        [app setActivationPolicy:NSApplicationActivationPolicyAccessory];
        Driver *d = [[Driver alloc] init];
        d.url = [NSURL URLWithString:[NSString stringWithUTF8String:argv[1]]];
        d.outPng = [NSString stringWithUTF8String:argv[2]];
        d.mode = [NSString stringWithUTF8String:argv[3]];
        d.vw = atoi(argv[4]);
        d.vh = atoi(argv[5]);
        d.probeSrc = [NSString stringWithContentsOfFile:[NSString stringWithUTF8String:argv[6]] encoding:NSUTF8StringEncoding error:nil];
        d.maxWaitMs = argc >= 8 ? atof(argv[7]) : 15000;
        if (!d.probeSrc) { fprintf(stderr,"cannot read probe file\n"); return 9; }
        [d run];
        [app run];
    }
    return 0;
}

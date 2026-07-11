// BG.W-FOURIER-BEAUTY — WebKit off-screen capture harness with an inner-scroller scroll
// before snapshot. A byte-faithful copy of docs/tranches/BG/audit/wkshot-live.m EXTENDED
// with two extra args: a CSS selector to scrollIntoView({block:'center'}) inside the
// main.demo-main-scroller inner scroll container, and a settle delay so the GL field
// repaints at the new scroll position before the snapshot. The below-fold interactive
// <FourierField> / curve plots are in an inner scroller (main.demo-main-scroller), so the
// bare wkshot-live.m viewport snapshot only reaches the hero — this harness scrolls the
// target into the 1440x900 viewport then snapshots @2x, matching the Chrome scrolled leg.
//
//   usage: wkshot-scroll <http-url> <out.png> <light|dark> <maxWaitMs> <scrollSelector> <settleMs>
#import <Cocoa/Cocoa.h>
#import <WebKit/WebKit.h>

@interface Driver : NSObject <WKNavigationDelegate>
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
            fprintf(stderr, "data-capture-ready after %.0fms -> scrolling target into view\n", self.pollElapsedMs);
            [self scrollThenSnapshot];
            return;
        }
        if (self.pollElapsedMs >= self.maxWaitMs) {
            fprintf(stderr, "maxWaitMs(%.0fms) reached without data-capture-ready -> scroll+snapshot anyway\n", self.maxWaitMs);
            [self scrollThenSnapshot];
            return;
        }
        self.pollElapsedMs += 300;
        dispatch_after(dispatch_time(DISPATCH_TIME_NOW, (int64_t)(0.3*NSEC_PER_SEC)), dispatch_get_main_queue(), ^{
            [self pollReady];
        });
    }];
}
- (void)scrollThenSnapshot {
    if (self.snapped) return;
    NSString *sjs = [NSString stringWithFormat:
        @"(function(){var t=document.querySelector('%@');if(!t)return 'no-target';t.scrollIntoView({block:'center'});var r=t.getBoundingClientRect();return JSON.stringify({top:Math.round(r.top),h:Math.round(r.height)});})()",
        self.scrollSel];
    [self.web evaluateJavaScript:sjs completionHandler:^(id r, NSError *e){
        fprintf(stderr, "scroll(%s) -> %s\n", self.scrollSel.UTF8String, e?e.localizedDescription.UTF8String:[[r description] UTF8String]);
        // DIAGNOSTIC — report GPU-canvas capability of this off-screen WKWebView.
        NSString *djs = @"(function(){try{var gpu=!!navigator.gpu;var cvs=[...document.querySelectorAll('canvas')].map(c=>{var ctx='none';try{if(c.getContext('webgl2'))ctx='webgl2';else if(c.getContext('webgl'))ctx='webgl';}catch(e){}return {w:c.width,h:c.height,cls:(c.className||'').toString().slice(0,24),ctx:ctx};});var ff=document.querySelector('.fourier-field');var head=ff?getComputedStyle(ff).getPropertyValue('--ff-head-xy').trim():'';return JSON.stringify({gpu:gpu,head:head,canvases:cvs});}catch(e){return 'diag-err:'+e.message;}})()";
        [self.web evaluateJavaScript:djs completionHandler:^(id dr, NSError *de){
            fprintf(stderr, "DIAG -> %s\n", de?de.localizedDescription.UTF8String:[[dr description] UTF8String]);
        }];
        // Settle: let the GL field repaint several frames at the new scroll offset.
        dispatch_after(dispatch_time(DISPATCH_TIME_NOW, (int64_t)((self.settleMs/1000.0)*NSEC_PER_SEC)), dispatch_get_main_queue(), ^{
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
        if (argc < 7) { fprintf(stderr, "usage: wkshot-scroll <url> <out.png> <light|dark> <maxWaitMs> <scrollSelector> <settleMs>\n"); return 3; }
        NSApplication *app = [NSApplication sharedApplication];
        [app setActivationPolicy:NSApplicationActivationPolicyAccessory];
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

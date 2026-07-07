// wkshot-scroll — BG.W-DEMO-IA-REDESIGN paint-judge Safari leg for the LIVE scroll-shrink.
// Loads a LIVE demo route (NOT ?capture= — that neutralizes animations), waits for the
// .story-hero-shrink cluster to mount, then sweeps the <main> scroller through the condense
// window reading the wrapper's computed `scale` + the title's `opacity` at each offset
// (the scroll-driven animation-timeline: scroll() sample), prints the sweep as JSON, and
// off-screen-snapshots at the offset passed as arg 5.
//   usage: wkshot-scroll <http-url> <out.png> <light|dark> <maxWaitMs> <snapScrollTop>
#import <Cocoa/Cocoa.h>
#import <WebKit/WebKit.h>

@interface Driver : NSObject <WKNavigationDelegate>
@property (strong) WKWebView *web;
@property (strong) NSURL *url;
@property (strong) NSString *outPng;
@property (strong) NSString *mode;
@property (assign) double maxWaitMs;
@property (assign) double pollElapsedMs;
@property (assign) int snapScroll;
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
    [wv evaluateJavaScript:js completionHandler:^(id r, NSError *e){
        fprintf(stderr, "mode-inject(%s)\n", self.mode.UTF8String);
    }];
    [self pollReady];
}
- (void)pollReady {
    if (self.snapped) return;
    // LIVE route: poll for the .story-hero-shrink cluster (the mount signal).
    [self.web evaluateJavaScript:@"(document.querySelector('.story-hero-shrink') && document.querySelector('main.demo-main-scroller')) ? '1':'0'"
                completionHandler:^(id r, NSError *e){
        BOOL ready = (!e && [[r description] isEqualToString:@"1"]);
        if (ready) {
            fprintf(stderr, "shrink-cluster mounted after %.0fms\n", self.pollElapsedMs);
            // give the GL/entrance one more beat to settle then sweep+snapshot
            dispatch_after(dispatch_time(DISPATCH_TIME_NOW, (int64_t)(1.2*NSEC_PER_SEC)), dispatch_get_main_queue(), ^{ [self sweepThenSnap]; });
            return;
        }
        if (self.pollElapsedMs >= self.maxWaitMs) { fprintf(stderr,"maxWait reached, no shrink cluster\n"); [self sweepThenSnap]; return; }
        self.pollElapsedMs += 300;
        dispatch_after(dispatch_time(DISPATCH_TIME_NOW, (int64_t)(0.3*NSEC_PER_SEC)), dispatch_get_main_queue(), ^{ [self pollReady]; });
    }];
}
- (void)sweepThenSnap {
    // JS sweep: for each offset, set scrollTop, force reflow, read computed scale+opacity.
    NSString *sweepJs =
      @"(function(){var m=document.querySelector('main.demo-main-scroller');m.style.scrollBehavior='auto';"
       "try{document.getAnimations().forEach(function(a){if(a.timeline===document.timeline){try{a.finish();}catch(e){}}});}catch(e){}"
       "var sh=document.querySelector('.story-hero-shrink');"
       "var t=document.querySelector('.story-hero-shrink .story-hero-title, .story-hero-shrink h1');"
       "var offs=[0,20,40,60,80,100,120,140,160,180];var out=[];"
       "for(var i=0;i<offs.length;i++){m.scrollTop=offs[i];void m.offsetHeight;void sh.offsetHeight;"
       "var sc=getComputedStyle(sh).scale;var sn=(sc==='none')?1:parseFloat(sc.split(' ')[0]);"
       "var op=t?parseFloat(getComputedStyle(t).opacity):null;var wo=parseFloat(getComputedStyle(sh).opacity);"
       "out.push({st:m.scrollTop,scale:sn,titleOp:op,wrapOp:wo,raw:sc});}"
       "return JSON.stringify(out);})()";
    [self.web evaluateJavaScript:sweepJs completionHandler:^(id r, NSError *e){
        if (e) fprintf(stderr, "sweep ERR: %s\n", e.localizedDescription.UTF8String);
        else printf("SWEEP %s\n", [[r description] UTF8String]);
        fflush(stdout);
        // set the snapshot scroll offset, settle, then snapshot
        NSString *setJs = [NSString stringWithFormat:@"(function(){var m=document.querySelector('main.demo-main-scroller');m.style.scrollBehavior='auto';m.scrollTop=%d;void m.offsetHeight;return m.scrollTop;})()", self.snapScroll];
        [self.web evaluateJavaScript:setJs completionHandler:^(id r2, NSError *e2){
            fprintf(stderr, "set snap scroll -> %s\n", [[r2 description] UTF8String]);
            dispatch_after(dispatch_time(DISPATCH_TIME_NOW, (int64_t)(0.7*NSEC_PER_SEC)), dispatch_get_main_queue(), ^{ [self snapshot]; });
        }];
    }];
}
- (void)snapshot {
    if (self.snapped) return; self.snapped = YES;
    WKSnapshotConfiguration *snap = [[WKSnapshotConfiguration alloc] init];
    snap.snapshotWidth = @1440; snap.afterScreenUpdates = YES;
    [self.web takeSnapshotWithConfiguration:snap completionHandler:^(NSImage *img, NSError *err){
        if (img && self.outPng) {
            CGImageRef cg = [img CGImageForProposedRect:NULL context:nil hints:nil];
            NSBitmapImageRep *rep = [[NSBitmapImageRep alloc] initWithCGImage:cg];
            NSData *png = [rep representationUsingType:NSBitmapImageFileTypePNG properties:@{}];
            [png writeToFile:self.outPng atomically:YES];
            fprintf(stderr, "snapshot %ldx%ld -> %s\n", (long)rep.pixelsWide, (long)rep.pixelsHigh, self.outPng.UTF8String);
            printf("OK %ldx%ld\n", (long)rep.pixelsWide, (long)rep.pixelsHigh);
        } else { fprintf(stderr, "snapshot FAILED: %s\n", err?err.localizedDescription.UTF8String:"nil"); printf("FAIL\n"); }
        fflush(stdout); exit(img ? 0 : 1);
    }];
}
- (void)webView:(WKWebView *)wv didFailNavigation:(WKNavigation *)nav withError:(NSError *)error { fprintf(stderr,"nav FAIL: %s\n",error.localizedDescription.UTF8String); exit(4); }
- (void)webView:(WKWebView *)wv didFailProvisionalNavigation:(WKNavigation *)nav withError:(NSError *)error { fprintf(stderr,"prov nav FAIL: %s\n",error.localizedDescription.UTF8String); exit(5); }
@end

int main(int argc, const char **argv) {
    @autoreleasepool {
        if (argc < 6) { fprintf(stderr, "usage: wkshot-scroll <url> <out.png> <light|dark> <maxWaitMs> <snapScrollTop>\n"); return 3; }
        NSApplication *app = [NSApplication sharedApplication];
        [app setActivationPolicy:NSApplicationActivationPolicyAccessory];
        Driver *d = [[Driver alloc] init];
        d.url = [NSURL URLWithString:[NSString stringWithUTF8String:argv[1]]];
        d.outPng = [NSString stringWithUTF8String:argv[2]];
        d.mode = [NSString stringWithUTF8String:argv[3]];
        d.maxWaitMs = atof(argv[4]);
        d.snapScroll = atoi(argv[5]);
        [d run];
        [app run];
    }
    return 0;
}

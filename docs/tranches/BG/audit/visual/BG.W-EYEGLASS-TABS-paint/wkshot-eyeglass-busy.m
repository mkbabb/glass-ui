// wkshot-eyeglass-busy — the Safari-26 honest-degrade arm for BG.W-EYEGLASS-TABS (AC1).
// Real system WebKit.framework (Safari 26 engine, Apple GPU/Metal). Loads the LIVE
// ?capture=navigation/tabs route, waits data-capture-ready, runs a JS PROBE that returns
// the load-bearing runtime facts — CSS.supports('backdrop-filter','url(#glass-refract)'),
// the RESOLVED backdrop-filter on the eyeglass pill (is it floating-frost, or a wrong rung,
// or nothing?), the proud geometry, the selected-glyph ink — then scrolls the eyeglass strip
// into view and off-screen-snapshots the composited content. Prints the probe JSON to stdout.
//   usage: wkshot-eyeglass <http-url> <out.png> <light|dark> [maxWaitMs]
#import <Cocoa/Cocoa.h>
#import <WebKit/WebKit.h>

static NSString *PROBE_JS =
@"(function(){try{"
"var strips=[].slice.call(document.querySelectorAll('.segmented-tabs'));"
"var s=strips.filter(function(x){return x.hasAttribute('data-eyeglass');})[0];"
"if(!s)return JSON.stringify({err:'no-eyeglass-strip'});"
"var card=s.closest('.glass-card');"
"var bg=document.createElement('div');bg.id='refract-test-bg';"
"bg.style.cssText='position:fixed;inset:0;z-index:0;background:repeating-linear-gradient(45deg,#001a33 0 10px,#66ccff 10px 20px);';"
"document.body.insertBefore(bg,document.body.firstChild);"
"if(card){card.style.background='transparent';card.style.backdropFilter='none';card.style.webkitBackdropFilter='none';card.style.boxShadow='none';card.style.border='none';card.style.position='relative';card.style.zIndex='2';}"
"var au=document.querySelector('canvas.aurora-canvas');if(au)au.style.opacity='0';"
"s.scrollIntoView({block:'center'});"
"var ind=s.querySelector('.segmented-indicator');"
"var csI=getComputedStyle(ind);"
"var supRefract=CSS.supports('backdrop-filter','url(\"#glass-refract\")')||CSS.supports('-webkit-backdrop-filter','url(\"#glass-refract\")');"
"var supAnchor=CSS.supports('position-anchor','--x');"
"var bd=csI.backdropFilter||csI.webkitBackdropFilter||'';"
"var hasUrl=/url\\(/.test(bd);"
"var tabs=[].slice.call(s.querySelectorAll('.segmented-tab'));"
"var pressed=tabs.filter(function(t){return t.getAttribute('aria-pressed')==='true';})[0];"
"var glyph=pressed?pressed.querySelector('svg'):null;"
"var glyphColor=glyph?getComputedStyle(glyph).color:null;"
"var labelColor=pressed?getComputedStyle(pressed).color:null;"
"var ir=ind.getBoundingClientRect();var sr=s.getBoundingClientRect();"
"var cs=getComputedStyle(s);var padT=parseFloat(cs.paddingTop),padB=parseFloat(cs.paddingBottom);"
"var slotH=sr.height-padT-padB;"
"return JSON.stringify({"
"supportsRefract:supRefract,supportsAnchor:supAnchor,"
"pillBackdropFilter:bd.slice(0,80),pillHasUrlInBackdrop:hasUrl,"
"indH:+ir.height.toFixed(2),slotH:+slotH.toFixed(2),proudVsSlot:+(ir.height/slotH).toFixed(3),"
"indW:+ir.width.toFixed(2),"
"glyphColor:glyphColor,labelColor:labelColor,"
"engine:'webkit'"
"});"
"}catch(e){return JSON.stringify({err:String(e)});}})()";

@interface Driver : NSObject <WKNavigationDelegate>
@property (strong) WKWebView *web; @property (strong) NSURL *url;
@property (strong) NSString *outPng; @property (strong) NSString *mode;
@property (assign) double maxWaitMs; @property (assign) double pollElapsedMs; @property (assign) BOOL snapped;
@end
@implementation Driver
- (void)run {
    WKWebViewConfiguration *cfg = [[WKWebViewConfiguration alloc] init];
    self.web = [[WKWebView alloc] initWithFrame:NSMakeRect(0,0,1440,900) configuration:cfg];
    self.web.navigationDelegate = self; self.pollElapsedMs = 0; self.snapped = NO;
    [self.web loadRequest:[NSURLRequest requestWithURL:self.url]];
    dispatch_after(dispatch_time(DISPATCH_TIME_NOW, (int64_t)((self.maxWaitMs/1000.0 + 20)*NSEC_PER_SEC)), dispatch_get_main_queue(), ^{
        if (!self.snapped) { fprintf(stderr, "TIMEOUT\n"); exit(2); } });
}
- (void)webView:(WKWebView *)wv didFinishNavigation:(WKNavigation *)nav {
    NSString *js = [NSString stringWithFormat:
        @"(function(){try{localStorage.setItem('vueuse-color-scheme','%@');}catch(e){};var el=document.documentElement;if('%@'==='dark'){el.classList.add('dark');}else{el.classList.remove('dark');}el.style.colorScheme='%@';return el.className;})()",
        self.mode, self.mode, self.mode];
    [wv evaluateJavaScript:js completionHandler:^(id r, NSError *e){ }];
    [self pollReady];
}
- (void)pollReady {
    if (self.snapped) return;
    [self.web evaluateJavaScript:@"document.documentElement.hasAttribute('data-capture-ready') ? '1' : '0'"
                completionHandler:^(id r, NSError *e){
        BOOL ready = (!e && [[r description] isEqualToString:@"1"]);
        if (ready || self.pollElapsedMs >= self.maxWaitMs) { [self probeThenSnap]; return; }
        self.pollElapsedMs += 300;
        dispatch_after(dispatch_time(DISPATCH_TIME_NOW, (int64_t)(0.3*NSEC_PER_SEC)), dispatch_get_main_queue(), ^{ [self pollReady]; });
    }];
}
- (void)probeThenSnap {
    if (self.snapped) return;
    [self.web evaluateJavaScript:PROBE_JS completionHandler:^(id r, NSError *e){
        if (e) fprintf(stderr, "probe err: %s\n", e.localizedDescription.UTF8String);
        else printf("PROBE %s\n", [[r description] UTF8String]);
        fflush(stdout);
        // let the scroll settle a beat, then snapshot
        dispatch_after(dispatch_time(DISPATCH_TIME_NOW, (int64_t)(0.8*NSEC_PER_SEC)), dispatch_get_main_queue(), ^{ [self snapshot]; });
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
        } else fprintf(stderr, "snapshot FAILED: %s\n", err?err.localizedDescription.UTF8String:"nil image");
        exit(img ? 0 : 1);
    }];
}
- (void)webView:(WKWebView *)wv didFailNavigation:(WKNavigation *)nav withError:(NSError *)error { fprintf(stderr, "nav FAILED: %s\n", error.localizedDescription.UTF8String); exit(4); }
- (void)webView:(WKWebView *)wv didFailProvisionalNavigation:(WKNavigation *)nav withError:(NSError *)error { fprintf(stderr, "provisional nav FAILED: %s\n", error.localizedDescription.UTF8String); exit(5); }
@end
int main(int argc, const char **argv) {
    @autoreleasepool {
        if (argc < 4) { fprintf(stderr, "usage: wkshot-eyeglass <http-url> <out.png> <light|dark> [maxWaitMs]\n"); return 3; }
        NSApplication *app = [NSApplication sharedApplication];
        [app setActivationPolicy:NSApplicationActivationPolicyAccessory];
        Driver *d = [[Driver alloc] init];
        d.url = [NSURL URLWithString:[NSString stringWithUTF8String:argv[1]]];
        d.outPng = [NSString stringWithUTF8String:argv[2]];
        d.mode = [NSString stringWithUTF8String:argv[3]];
        d.maxWaitMs = argc >= 5 ? atof(argv[4]) : 12000;
        [d run]; [app run];
    }
    return 0;
}

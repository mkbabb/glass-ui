// wkshot-live — BG.W-PAINT-IS-THE-GATE C-SAFARI leg. A WKWebView (system WebKit.framework
// = the real Safari 26 engine, Metal) loading the LIVE :5199 demo route, injecting the dark
// mode, waiting a fixed warm-up for the aurora/WebGL field to paint, then off-screen-
// snapshotting the composited content (no Screen-Recording TCC needed). The on-screen
// composite path twin of screencapture window-mode (protocol §5/§6), for the live route the
// file-URL wkshot.m fixture tool cannot reach.
//   usage: wkshot-live <http-url> <out.png> <light|dark> <delayMs>
#import <Cocoa/Cocoa.h>
#import <WebKit/WebKit.h>

@interface Driver : NSObject <WKNavigationDelegate>
@property (strong) WKWebView *web;
@property (strong) NSURL *url;
@property (strong) NSString *outPng;
@property (strong) NSString *mode;
@property (assign) double delayMs;
@end

@implementation Driver
- (void)run {
    WKWebViewConfiguration *cfg = [[WKWebViewConfiguration alloc] init];
    self.web = [[WKWebView alloc] initWithFrame:NSMakeRect(0,0,1440,900) configuration:cfg];
    self.web.navigationDelegate = self;
    [self.web loadRequest:[NSURLRequest requestWithURL:self.url]];
    dispatch_after(dispatch_time(DISPATCH_TIME_NOW, (int64_t)(40*NSEC_PER_SEC)), dispatch_get_main_queue(), ^{
        fprintf(stderr, "TIMEOUT\n"); exit(2);
    });
}
- (void)webView:(WKWebView *)wv didFinishNavigation:(WKNavigation *)nav {
    // inject the mode (the demo reads localStorage vueuse-color-scheme + a .dark class)
    NSString *js = [NSString stringWithFormat:
        @"(function(){try{localStorage.setItem('vueuse-color-scheme','%@');}catch(e){};var el=document.documentElement;if('%@'==='dark'){el.classList.add('dark');}else{el.classList.remove('dark');}el.style.colorScheme='%@';return el.className;})()",
        self.mode, self.mode, self.mode];
    [wv evaluateJavaScript:js completionHandler:^(id r, NSError *e){
        fprintf(stderr, "mode-inject(%s) -> %s\n", self.mode.UTF8String, e?e.localizedDescription.UTF8String:[[r description] UTF8String]);
    }];
    double d = self.delayMs > 0 ? self.delayMs : 7000;
    dispatch_after(dispatch_time(DISPATCH_TIME_NOW, (int64_t)(d/1000.0*NSEC_PER_SEC)), dispatch_get_main_queue(), ^{
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
    });
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
        if (argc < 4) { fprintf(stderr, "usage: wkshot-live <http-url> <out.png> <light|dark> [delayMs]\n"); return 3; }
        NSApplication *app = [NSApplication sharedApplication];
        [app setActivationPolicy:NSApplicationActivationPolicyAccessory];
        Driver *d = [[Driver alloc] init];
        d.url = [NSURL URLWithString:[NSString stringWithUTF8String:argv[1]]];
        d.outPng = [NSString stringWithUTF8String:argv[2]];
        d.mode = [NSString stringWithUTF8String:argv[3]];
        d.delayMs = argc >= 5 ? atof(argv[4]) : 7000;
        [d run];
        [app run];
    }
    return 0;
}

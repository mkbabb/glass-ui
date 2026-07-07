// wkgpu-probe — evals navigator.gpu + WebGPU adapter availability in the SYSTEM
// WebKit.framework WKWebView (Safari 26/Tahoe engine), to localize whether the concentric
// blank is on the WebGPU-primary path or the WebGL2 GLSL fallback path.
//   usage: wkgpu-probe <http-url> [maxWaitMs]
#import <Cocoa/Cocoa.h>
#import <WebKit/WebKit.h>

@interface P : NSObject <WKNavigationDelegate>
@property (strong) WKWebView *web;
@property (strong) NSURL *url;
@property (assign) double maxWaitMs;
@property (assign) double el;
@property (assign) BOOL done;
@end

@implementation P
- (void)run {
    WKWebViewConfiguration *cfg = [[WKWebViewConfiguration alloc] init];
    self.web = [[WKWebView alloc] initWithFrame:NSMakeRect(0,0,1440,900) configuration:cfg];
    self.web.navigationDelegate = self;
    self.el = 0; self.done = NO;
    [self.web loadRequest:[NSURLRequest requestWithURL:self.url]];
    dispatch_after(dispatch_time(DISPATCH_TIME_NOW, (int64_t)((self.maxWaitMs/1000.0 + 20)*NSEC_PER_SEC)), dispatch_get_main_queue(), ^{
        if (!self.done) { fprintf(stderr, "TIMEOUT\n"); exit(2); }
    });
}
- (void)webView:(WKWebView *)wv didFinishNavigation:(WKNavigation *)nav { [self poll]; }
- (void)poll {
    if (self.done) return;
    [self.web evaluateJavaScript:@"document.documentElement.hasAttribute('data-capture-ready')?'1':'0'"
                completionHandler:^(id r, NSError *e){
        if (!e && [[r description] isEqualToString:@"1"]) { [self probe]; return; }
        if (self.el >= self.maxWaitMs) { [self probe]; return; }
        self.el += 300;
        dispatch_after(dispatch_time(DISPATCH_TIME_NOW,(int64_t)(0.3*NSEC_PER_SEC)),dispatch_get_main_queue(),^{ [self poll]; });
    }];
}
- (void)probe {
    if (self.done) return; self.done = YES;
    NSString *js =
      @"(function(){var out={gpu:typeof navigator.gpu};"
       "try{var c=document.querySelector('canvas.concentric-canvas');out.concCanvas=!!c;}catch(e){out.cErr=String(e);}"
       "return JSON.stringify(out);})()";
    [self.web evaluateJavaScript:js completionHandler:^(id r, NSError *e){
        if (e) fprintf(stdout, "{\"evalErr\":\"%s\"}\n", e.localizedDescription.UTF8String);
        else   fprintf(stdout, "%s\n", [[r description] UTF8String]);
        fflush(stdout);
        // now async adapter probe
        [self.web evaluateJavaScript:@"(navigator.gpu?'has-gpu-obj':'no-gpu-obj')" completionHandler:^(id r2, NSError *e2){
            fprintf(stdout, "adapterObj: %s\n", e2?e2.localizedDescription.UTF8String:[[r2 description] UTF8String]);
            fflush(stdout); exit(0);
        }];
    }];
}
@end

int main(int argc, const char **argv) {
    @autoreleasepool {
        if (argc < 2) { fprintf(stderr, "usage: wkgpu-probe <url> [maxWaitMs]\n"); return 1; }
        [NSApplication sharedApplication];
        P *p = [P new];
        p.url = [NSURL URLWithString:[NSString stringWithUTF8String:argv[1]]];
        p.maxWaitMs = argc > 2 ? atof(argv[2]) : 15000;
        [p run];
        [NSApp run];
    }
    return 0;
}

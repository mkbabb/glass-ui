// wkprobe — real WebKit (Safari 26 engine) GL/GPU health probe for the dot-matrix route.
// The off-screen WKWebView cannot COMPOSITE GL into a snapshot, but it DOES run the real
// WebKit JS + GL/GPU stack. This loads the ?capture route, polls data-capture-ready, then
// evals a health JS: WebGL2 availability + GL_RENDERER + navigator.gpu + WebGPU adapter +
// the dot-matrix canvas presence/size + any window error log. Proves whether the born-GPU
// globe's context WOULD initialize (and thus paint) in WebKit — ruling out a real
// WebKit-specific GL failure masquerading behind the capture limitation.
//   usage: wkprobe <http-url> <light|dark> [maxWaitMs]
#import <Cocoa/Cocoa.h>
#import <WebKit/WebKit.h>

@interface Driver : NSObject <WKNavigationDelegate>
@property (strong) WKWebView *web;
@property (strong) NSURL *url;
@property (strong) NSString *mode;
@property (assign) double maxWaitMs;
@property (assign) double pollElapsedMs;
@property (assign) BOOL done;
@end

@implementation Driver
- (void)run {
    WKWebViewConfiguration *cfg = [[WKWebViewConfiguration alloc] init];
    self.web = [[WKWebView alloc] initWithFrame:NSMakeRect(0,0,1440,900) configuration:cfg];
    self.web.navigationDelegate = self;
    self.pollElapsedMs = 0;
    // capture WebGL/console errors early
    NSString *hook = @"window.__errs=[];window.addEventListener('error',function(e){window.__errs.push(''+e.message)});"
                     @"var _we=console.error;console.error=function(){try{window.__errs.push(Array.from(arguments).map(String).join(' '))}catch(e){};return _we.apply(console,arguments)};";
    WKUserScript *us = [[WKUserScript alloc] initWithSource:hook injectionTime:WKUserScriptInjectionTimeAtDocumentStart forMainFrameOnly:NO];
    [cfg.userContentController addUserScript:us];
    // rebuild webview with the hook-bearing config
    self.web = [[WKWebView alloc] initWithFrame:NSMakeRect(0,0,1440,900) configuration:cfg];
    self.web.navigationDelegate = self;
    [self.web loadRequest:[NSURLRequest requestWithURL:self.url]];
    dispatch_after(dispatch_time(DISPATCH_TIME_NOW, (int64_t)((self.maxWaitMs/1000.0 + 20)*NSEC_PER_SEC)), dispatch_get_main_queue(), ^{
        if (!self.done) { fprintf(stderr, "TIMEOUT\n"); exit(2); }
    });
}
- (void)webView:(WKWebView *)wv didFinishNavigation:(WKNavigation *)nav {
    NSString *js = [NSString stringWithFormat:
        @"(function(){var el=document.documentElement;if('%@'==='dark'){el.classList.add('dark')}else{el.classList.remove('dark')}return el.className})()", self.mode];
    [wv evaluateJavaScript:js completionHandler:nil];
    [self pollReady];
}
- (void)pollReady {
    if (self.done) return;
    [self.web evaluateJavaScript:@"document.documentElement.hasAttribute('data-capture-ready')?'1':'0'"
                completionHandler:^(id r, NSError *e){
        BOOL ready = (!e && [[r description] isEqualToString:@"1"]);
        if (ready || self.pollElapsedMs >= self.maxWaitMs) { [self probe]; return; }
        self.pollElapsedMs += 300;
        dispatch_after(dispatch_time(DISPATCH_TIME_NOW, (int64_t)(0.3*NSEC_PER_SEC)), dispatch_get_main_queue(), ^{ [self pollReady]; });
    }];
}
- (void)probe {
    if (self.done) return;
    self.done = YES;
    NSString *probe =
      @"(function(){"
      @"var out={};"
      @"try{var c=document.createElement('canvas');var gl=c.getContext('webgl2');out.webgl2=!!gl;"
      @"if(gl){var ext=gl.getExtension('WEBGL_debug_renderer_info');out.renderer=ext?gl.getParameter(ext.UNMASKED_RENDERER_WEBGL):gl.getParameter(gl.RENDERER);}}catch(e){out.webgl2err=''+e}"
      @"out.hasGpu=!!navigator.gpu;"
      @"var cs=[].slice.call(document.querySelectorAll('canvas'));"
      @"out.canvasCount=cs.length;"
      @"out.canvases=cs.map(function(c){var b=c.getBoundingClientRect();return {w:Math.round(b.width),h:Math.round(b.height)}});"
      @"var gi=cs.findIndex(function(c){var b=c.getBoundingClientRect();return Math.abs(b.height-460)<40&&b.width<1300});"
      @"out.globeCanvasFound=gi>=0;"
      @"out.errs=(window.__errs||[]).slice(0,10);"
      @"return JSON.stringify(out);})()";
    [self.web evaluateJavaScript:probe completionHandler:^(id r, NSError *e){
        if (e) { fprintf(stderr, "probe err: %s\n", e.localizedDescription.UTF8String); }
        printf("SYNC %s\n", r ? [[r description] UTF8String] : "null");
        // now the async WebGPU adapter check
        NSString *aprobe = @"navigator.gpu ? navigator.gpu.requestAdapter().then(function(a){return 'adapter:'+(!!a)+(a&&a.info?(' '+a.info.vendor+'/'+a.info.architecture):'')}).catch(function(e){return 'adaptererr:'+e}) : Promise.resolve('no-gpu')";
        [self.web callAsyncJavaScript:[NSString stringWithFormat:@"return await (%@);", aprobe] arguments:nil inFrame:nil inContentWorld:WKContentWorld.pageWorld completionHandler:^(id r2, NSError *e2){
            printf("ASYNC %s\n", r2 ? [[r2 description] UTF8String] : (e2?[e2.localizedDescription UTF8String]:"null"));
            fflush(stdout);
            exit(0);
        }];
    }];
}
- (void)webView:(WKWebView *)wv didFailNavigation:(WKNavigation *)nav withError:(NSError *)error { fprintf(stderr,"navfail %s\n",error.localizedDescription.UTF8String); exit(4); }
- (void)webView:(WKWebView *)wv didFailProvisionalNavigation:(WKNavigation *)nav withError:(NSError *)error { fprintf(stderr,"provfail %s\n",error.localizedDescription.UTF8String); exit(5); }
@end

int main(int argc, const char **argv) {
    @autoreleasepool {
        if (argc < 3) { fprintf(stderr, "usage: wkprobe <http-url> <light|dark> [maxWaitMs]\n"); return 3; }
        NSApplication *app = [NSApplication sharedApplication];
        [app setActivationPolicy:NSApplicationActivationPolicyAccessory];
        Driver *d = [[Driver alloc] init];
        d.url = [NSURL URLWithString:[NSString stringWithUTF8String:argv[1]]];
        d.mode = [NSString stringWithUTF8String:argv[2]];
        d.maxWaitMs = argc >= 4 ? atof(argv[3]) : 12000;
        [d run];
        [app run];
    }
    return 0;
}

// wkprobe — system WebKit (Safari 26, WebKit.framework) backend probe. Navigates a
// ?capture route, polls data-capture-ready, then evaluates a rich probe (navigator.gpu
// presence, aurora canvas context types, applied medium label) and prints the JSON.
// Throwaway diagnostic tool (paint-judge, non-authoring): reads only, edits nothing.
#import <Cocoa/Cocoa.h>
#import <WebKit/WebKit.h>
@interface P : NSObject <WKNavigationDelegate>
@property (strong) WKWebView *web; @property (strong) NSURL *url; @property (strong) NSString *mode;
@property (assign) double elapsed; @property (assign) BOOL done;
@end
@implementation P
- (void)run {
  WKWebViewConfiguration *cfg = [[WKWebViewConfiguration alloc] init];
  self.web = [[WKWebView alloc] initWithFrame:NSMakeRect(0,0,1440,900) configuration:cfg];
  self.web.navigationDelegate = self; self.elapsed = 0; self.done = NO;
  [self.web loadRequest:[NSURLRequest requestWithURL:self.url]];
  dispatch_after(dispatch_time(DISPATCH_TIME_NOW,(int64_t)(35*NSEC_PER_SEC)),dispatch_get_main_queue(),^{ if(!self.done){fprintf(stderr,"TIMEOUT\n");exit(2);} });
}
- (void)webView:(WKWebView *)wv didFinishNavigation:(WKNavigation *)nav {
  NSString *js=[NSString stringWithFormat:@"(function(){try{localStorage.setItem('vueuse-color-scheme','%@');}catch(e){};var el=document.documentElement;if('%@'==='dark')el.classList.add('dark');else el.classList.remove('dark');el.style.colorScheme='%@';return '1';})()",self.mode,self.mode,self.mode];
  [wv evaluateJavaScript:js completionHandler:^(id r,NSError *e){ [self poll]; }];
}
- (void)poll {
  if(self.done) return;
  [self.web evaluateJavaScript:@"document.documentElement.hasAttribute('data-capture-ready')?'1':'0'" completionHandler:^(id r,NSError *e){
    if(!e && [[r description] isEqualToString:@"1"]){ [self probe]; return; }
    if(self.elapsed>=15000){ [self probe]; return; }
    self.elapsed+=300;
    dispatch_after(dispatch_time(DISPATCH_TIME_NOW,(int64_t)(0.3*NSEC_PER_SEC)),dispatch_get_main_queue(),^{ [self poll]; });
  }];
}
- (void)probe {
  if(self.done) return; self.done=YES;
  NSString *probe=@"(function(){"
    "var out={};"
    "out.hasGPU=(typeof navigator.gpu!=='undefined');"
    "out.captureReady=document.documentElement.hasAttribute('data-capture-ready');"
    "var cvs=Array.from(document.querySelectorAll('canvas'));"
    "out.canvasCount=cvs.length;"
    "out.ctxTypes=cvs.map(function(c){var t='?';try{if(c.__glType)t=c.__glType;}catch(e){}return {w:Math.round(c.getBoundingClientRect().width),h:Math.round(c.getBoundingClientRect().height),cls:(c.parentElement&&c.parentElement.className||'').toString().slice(0,30)};});"
    "var m=document.querySelector('[data-atom=\\\"medium\\\"]');"
    "out.mediumTrigger=m?(m.innerText||'').replace(/\\s+/g,' ').trim().slice(0,60):null;"
    "try{var c2=document.createElement('canvas');var g2=c2.getContext('webgl2');out.webgl2=!!g2;}catch(e){out.webgl2='err';}"
    "return JSON.stringify(out);})()";
  [self.web evaluateJavaScript:probe completionHandler:^(id r,NSError *e){
    if(e) fprintf(stderr,"probe err: %s\n", e.localizedDescription.UTF8String);
    printf("%s\n", r?[[r description] UTF8String]:"null");
    fflush(stdout); exit(0);
  }];
}
- (void)webView:(WKWebView *)wv didFailNavigation:(WKNavigation *)nav withError:(NSError *)error { fprintf(stderr,"nav fail\n"); exit(4); }
- (void)webView:(WKWebView *)wv didFailProvisionalNavigation:(WKNavigation *)nav withError:(NSError *)error { fprintf(stderr,"prov fail\n"); exit(5); }
@end
int main(int argc,const char**argv){ @autoreleasepool{
  if(argc<3){fprintf(stderr,"usage: wkprobe <url> <light|dark>\n");return 3;}
  NSApplication *app=[NSApplication sharedApplication];[app setActivationPolicy:NSApplicationActivationPolicyAccessory];
  P *p=[[P alloc]init]; p.url=[NSURL URLWithString:[NSString stringWithUTF8String:argv[1]]]; p.mode=[NSString stringWithUTF8String:argv[2]];
  [p run];[app run]; } return 0; }

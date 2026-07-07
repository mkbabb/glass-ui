// BG.W-DOTFLOW-REBUILD paint re-judge — system-WKWebView (real Safari 26 / Metal) DIAG + snapshot.
//
// Two jobs in one run:
//  (1) In-engine DIAG via callAsyncJavaScript on the page world: navigator.gpu present +
//      requestAdapter/requestDevice succeed + viz-canvas ctx probe + rAF liveness + a STANDALONE
//      WebGPU covering-triangle A/B readback (the S7 scalar-branch vs_main vs the OLD indexed-array
//      vs_main), rendered to an OWNED offscreen texture + copyTextureToBuffer + mapAsync readback —
//      the DIRECT in-engine proof that the S7 fix makes WebKit's WGSL/Metal rasterize the covering
//      triangle (non-uniform output) where the pre-S7 indexed-array shape may degenerate to a uniform
//      clear. This is readable (own texture, not the preserveDrawingBuffer:false viz canvas).
//  (2) takeSnapshotWithConfiguration of the route scrolled to the viz canvas — to record the WKWebView
//      WebGPU-canvas-snapshot state (the known tooling limit; the rest of the route composites).
//
//   usage: wkshot-diag <http-url> <out.png> <light|dark> [maxWaitMs]
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
    self.pollElapsedMs = 0;
    self.snapped = NO;
    [self.web loadRequest:[NSURLRequest requestWithURL:self.url]];
    dispatch_after(dispatch_time(DISPATCH_TIME_NOW, (int64_t)((self.maxWaitMs/1000.0 + 30)*NSEC_PER_SEC)), dispatch_get_main_queue(), ^{
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
            fprintf(stderr, "data-capture-ready after %.0fms -> DIAG then scroll+snapshot\n", self.pollElapsedMs);
            [self runDiag];
            return;
        }
        if (self.pollElapsedMs >= self.maxWaitMs) {
            fprintf(stderr, "maxWaitMs(%.0fms) reached -> DIAG then snapshot anyway\n", self.maxWaitMs);
            [self runDiag];
            return;
        }
        self.pollElapsedMs += 300;
        dispatch_after(dispatch_time(DISPATCH_TIME_NOW, (int64_t)(0.3*NSEC_PER_SEC)), dispatch_get_main_queue(), ^{ [self pollReady]; });
    }];
}
- (void)runDiag {
    // The async DIAG body (callAsyncJavaScript treats it as an async function body).
    // Every await is wrapped in Promise.race with a timeout so a hung WebGPU op (mapAsync
    // deadlock / miscompile hang) still returns a partial `out` instead of wedging the harness.
    NSString *diag =
      @"const TO=(p,ms,tag)=>Promise.race([p,new Promise((_,rj)=>setTimeout(()=>rj(new Error('timeout:'+tag)),ms))]);"
      @"const out={gpu:!!navigator.gpu};"
      @"const cv=document.querySelector('.rounded-card canvas')||document.querySelector('canvas');"
      @"out.vizCanvas=cv?{w:cv.width,h:cv.height}:null;"
      @"if(cv){let g2=null;try{g2=cv.getContext('webgl2');}catch(e){}out.vizGetWebgl2=g2?'RETURNED-webgl2':'null(webgpu-or-2d-bound)';}"
      @"out.nCanvas=document.querySelectorAll('canvas').length;"
      @"await new Promise(res=>setTimeout(res,200));"
      @"if(navigator.gpu){try{const ad=await TO(navigator.gpu.requestAdapter(),4000,'adapter');out.adapter=!!ad;if(ad){const dev=await TO(ad.requestDevice(),4000,'device');out.device=!!dev;const W=64,H=64,fmt='rgba8unorm',bpr=256;"
      @"async function shape(vsBody){const tex=dev.createTexture({size:[W,H],format:fmt,usage:GPUTextureUsage.RENDER_ATTACHMENT|GPUTextureUsage.COPY_SRC});"
      @"const sm=dev.createShaderModule({code:'struct VO{ @builtin(position) pos:vec4<f32>, @location(0) uv:vec2<f32> }; @vertex fn vs(@builtin(vertex_index) vi:u32)->VO{ '+vsBody+' var o:VO; o.pos=vec4<f32>(p,0.0,1.0); o.uv=p*0.5+vec2<f32>(0.5,0.5); return o; } @fragment fn fs(inp:VO)->@location(0) vec4<f32>{ return vec4<f32>(inp.uv.x, inp.uv.y, 0.5, 1.0); }'});"
      @"const pipe=dev.createRenderPipeline({layout:'auto',vertex:{module:sm,entryPoint:'vs'},fragment:{module:sm,entryPoint:'fs',targets:[{format:fmt}]},primitive:{topology:'triangle-list'}});"
      @"const enc=dev.createCommandEncoder();const pass=enc.beginRenderPass({colorAttachments:[{view:tex.createView(),clearValue:{r:0,g:0,b:0,a:1},loadOp:'clear',storeOp:'store'}]});pass.setPipeline(pipe);pass.draw(3);pass.end();"
      @"const buf=dev.createBuffer({size:bpr*H,usage:GPUBufferUsage.COPY_DST|GPUBufferUsage.MAP_READ});enc.copyTextureToBuffer({texture:tex},{buffer:buf,bytesPerRow:bpr},[W,H,1]);dev.queue.submit([enc.finish()]);"
      @"await TO(buf.mapAsync(GPUMapMode.READ),4000,'map');const b=new Uint8Array(buf.getMappedRange().slice(0));buf.unmap();"
      @"let mn=255,mx=0,sum=0,sq=0,n=0;for(let y=0;y<H;y++)for(let x=0;x<W;x++){const r=b[y*bpr+x*4];mn=Math.min(mn,r);mx=Math.max(mx,r);sum+=r;sq+=r*r;n++;}const me=sum/n;return{min:mn,max:mx,mean:+me.toFixed(1),stdev:+Math.sqrt(Math.max(0,sq/n-me*me)).toFixed(1)};}"
      @"const NEW='var p=vec2<f32>(-1.0,-1.0); if(vi==1u){p=vec2<f32>(3.0,-1.0);} else if(vi==2u){p=vec2<f32>(-1.0,3.0);}';"
      @"const OLD='var c=array<vec2<f32>,3>(vec2<f32>(-1.0,-1.0),vec2<f32>(3.0,-1.0),vec2<f32>(-1.0,3.0)); let p=c[vi];';"
      @"try{out.coveringNew_S7=await TO(shape(NEW),6000,'new');}catch(e){out.coveringNew_S7='ERR:'+e.message;}"
      @"try{out.coveringOld_indexed=await TO(shape(OLD),6000,'old');}catch(e){out.coveringOld_indexed='ERR:'+e.message;}"
      @"}}catch(e){out.webgpuErr=String((e&&e.message)||e);}}"
      @"return JSON.stringify(out);";
    __block BOOL diagDone = NO;
    if (@available(macOS 11.0, *)) {
        [self.web callAsyncJavaScript:diag arguments:nil inFrame:nil inContentWorld:WKContentWorld.pageWorld
                    completionHandler:^(id result, NSError *error){
            if (diagDone) return; diagDone = YES;
            if (error) fprintf(stderr, "DIAG-ERR -> %s\n", error.localizedDescription.UTF8String);
            else fprintf(stderr, "DIAG -> %s\n", [[result description] UTF8String]);
            [self scrollThenSnapshot];
        }];
        // Harness-level guard: if callAsyncJavaScript never returns in 20s, proceed anyway.
        dispatch_after(dispatch_time(DISPATCH_TIME_NOW, (int64_t)(20*NSEC_PER_SEC)), dispatch_get_main_queue(), ^{
            if (diagDone) return; diagDone = YES;
            fprintf(stderr, "DIAG-GUARD -> callAsyncJavaScript did not return in 20s, proceeding to snapshot\n");
            [self scrollThenSnapshot];
        });
    } else {
        [self scrollThenSnapshot];
    }
}
- (void)scrollThenSnapshot {
    NSString *scrollJs = @"(function(){var cv=document.querySelector('.rounded-card canvas')||document.querySelector('canvas');if(!cv)return 'no-canvas';var el=cv.parentElement,sc=null;while(el){var st=getComputedStyle(el);if((st.overflowY==='auto'||st.overflowY==='scroll')&&el.scrollHeight>el.clientHeight+4){sc=el;break;}el=el.parentElement;}var r=cv.getBoundingClientRect();var delta=r.top-150;if(sc)sc.scrollTop+=delta;else window.scrollBy(0,delta);return 'scrolled '+Math.round(delta)+' via '+(sc?sc.tagName:'window');})()";
    [self.web evaluateJavaScript:scrollJs completionHandler:^(id r, NSError *e){
        fprintf(stderr, "scroll -> %s\n", e?e.localizedDescription.UTF8String:[[r description] UTF8String]);
        dispatch_after(dispatch_time(DISPATCH_TIME_NOW, (int64_t)(2.0*NSEC_PER_SEC)), dispatch_get_main_queue(), ^{ [self snapshot]; });
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
- (void)webView:(WKWebView *)wv didFailNavigation:(WKNavigation *)nav withError:(NSError *)error { fprintf(stderr, "nav FAILED: %s\n", error.localizedDescription.UTF8String); exit(4); }
- (void)webView:(WKWebView *)wv didFailProvisionalNavigation:(WKNavigation *)nav withError:(NSError *)error { fprintf(stderr, "provisional nav FAILED: %s\n", error.localizedDescription.UTF8String); exit(5); }
@end

int main(int argc, const char **argv) {
    @autoreleasepool {
        if (argc < 4) { fprintf(stderr, "usage: wkshot-diag <http-url> <out.png> <light|dark> [maxWaitMs]\n"); return 3; }
        NSApplication *app = [NSApplication sharedApplication];
        [app setActivationPolicy:NSApplicationActivationPolicyAccessory];
        Driver *d = [[Driver alloc] init];
        d.url = [NSURL URLWithString:[NSString stringWithUTF8String:argv[1]]];
        d.outPng = [NSString stringWithUTF8String:argv[2]];
        d.mode = [NSString stringWithUTF8String:argv[3]];
        d.maxWaitMs = argc >= 5 ? atof(argv[4]) : 15000;
        [d run];
        [app run];
    }
    return 0;
}

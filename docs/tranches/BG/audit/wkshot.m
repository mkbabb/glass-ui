// wkshot — wkdriver + a WKWebView snapshot. Loads a file URL, waits for the page
// to postMessage("result", json), snapshots the REAL WebKit composited content
// (the on-screen path: AA rim + DOM-over-GL stack + colorspace), writes a PNG to
// argv[2], then prints the JSON and exits. This is the composite-path twin of the
// FBO-readback fidelity harness — the part a screenshot π actually decodes.
#import <Cocoa/Cocoa.h>
#import <WebKit/WebKit.h>
#import <objc/message.h>

@interface Driver : NSObject <WKScriptMessageHandler, WKNavigationDelegate>
@property (strong) WKWebView *web;
@property (strong) NSURL *url;
@property (strong) NSString *outPng;
@property (strong) NSString *pendingJson;
@end

@implementation Driver
- (void)run {
    WKWebViewConfiguration *cfg = [[WKWebViewConfiguration alloc] init];
    WKUserContentController *ucc = [[WKUserContentController alloc] init];
    [ucc addScriptMessageHandler:self name:@"result"];
    cfg.userContentController = ucc;
    // 256pt view; on retina the snapshot CGImage comes back at backingScale (×2).
    self.web = [[WKWebView alloc] initWithFrame:NSMakeRect(0,0,256,256) configuration:cfg];
    self.web.navigationDelegate = self;
    [self.web loadFileURL:self.url allowingReadAccessToURL:[self.url URLByDeletingLastPathComponent]];
    dispatch_after(dispatch_time(DISPATCH_TIME_NOW, (int64_t)(25*NSEC_PER_SEC)), dispatch_get_main_queue(), ^{
        fprintf(stderr, "TIMEOUT\n"); exit(2);
    });
}
- (void)userContentController:(WKUserContentController *)u didReceiveScriptMessage:(WKScriptMessage *)m {
    if (![m.name isEqualToString:@"result"]) return;
    self.pendingJson = [m.body description];
    WKSnapshotConfiguration *snap = [[WKSnapshotConfiguration alloc] init];
    snap.snapshotWidth = @256;              // pin output width → deterministic grid
    [self.web takeSnapshotWithConfiguration:snap completionHandler:^(NSImage *img, NSError *err){
        if (img && self.outPng) {
            CGImageRef cg = [img CGImageForProposedRect:NULL context:nil hints:nil];
            NSBitmapImageRep *rep = [[NSBitmapImageRep alloc] initWithCGImage:cg];
            NSData *png = [rep representationUsingType:NSBitmapImageFileTypePNG properties:@{}];
            [png writeToFile:self.outPng atomically:YES];
            fprintf(stderr, "snapshot %ldx%ld -> %s\n", (long)rep.pixelsWide, (long)rep.pixelsHigh, self.outPng.UTF8String);
        } else if (err) {
            fprintf(stderr, "snapshot error: %s\n", err.localizedDescription.UTF8String);
        }
        printf("%s\n", self.pendingJson.UTF8String);
        fflush(stdout);
        exit(0);
    }];
}
@end

int main(int argc, const char **argv) {
    @autoreleasepool {
        if (argc < 3) { fprintf(stderr, "usage: wkshot <file.html> <out.png>\n"); return 3; }
        NSApplication *app = [NSApplication sharedApplication];
        [app setActivationPolicy:NSApplicationActivationPolicyAccessory];
        Driver *d = [[Driver alloc] init];
        d.url = [NSURL fileURLWithPath:[NSString stringWithUTF8String:argv[1]]];
        d.outPng = [NSString stringWithUTF8String:argv[2]];
        [d run];
        [app run];
    }
    return 0;
}

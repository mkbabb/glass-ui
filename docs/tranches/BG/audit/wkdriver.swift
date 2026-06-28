import Cocoa
import WebKit

final class Driver: NSObject, WKScriptMessageHandler, WKNavigationDelegate {
    var web: WKWebView!
    let url: URL
    init(url: URL) { self.url = url; super.init() }

    func enableWebGPU(_ prefs: WKPreferences) {
        // Try the private _WKFeature API to flip experimental/internal features named
        // WebGPU. Default-on in Safari 26, but WKWebView often needs the explicit flip.
        let sel = NSSelectorFromString("_features")
        let cls: AnyClass = WKPreferences.self
        if cls.responds(to: sel) || WKPreferences.responds(to: sel) {
            let feats = (WKPreferences.perform(sel)?.takeUnretainedValue()) as? [AnyObject]
            tryFlip(prefs, feats)
        }
        // class method variant
        if let m = class_getClassMethod(object_getClass(WKPreferences.self), sel) {
            _ = m
        }
    }
    func tryFlip(_ prefs: WKPreferences, _ feats: [AnyObject]?) {
        guard let feats = feats else { return }
        for f in feats {
            let keySel = NSSelectorFromString("key")
            let nameSel = NSSelectorFromString("name")
            var key = ""
            if f.responds(to: keySel), let k = f.perform(keySel)?.takeUnretainedValue() as? String { key = k }
            if key.isEmpty, f.responds(to: nameSel), let n = f.perform(nameSel)?.takeUnretainedValue() as? String { key = n }
            if key.range(of: "WebGPU", options: .caseInsensitive) != nil {
                let setSel = NSSelectorFromString("_setEnabled:forFeature:")
                if prefs.responds(to: setSel) {
                    typealias Fn = @convention(c)(AnyObject, Selector, Bool, AnyObject)->Void
                    let imp = prefs.method(for: setSel)
                    let fn = unsafeBitCast(imp, to: Fn.self)
                    fn(prefs, setSel, true, f)
                    FileHandle.standardError.write("flipped feature: \(key)\n".data(using:.utf8)!)
                }
            }
        }
    }

    func run() {
        let cfg = WKWebViewConfiguration()
        let ucc = WKUserContentController()
        ucc.add(self, name: "result")
        cfg.userContentController = ucc
        enableWebGPU(cfg.preferences)
        web = WKWebView(frame: NSRect(x:0,y:0,width:256,height:256), configuration: cfg)
        web.navigationDelegate = self
        web.loadFileURL(url, allowingReadAccessTo: url.deletingLastPathComponent())
        // hard timeout
        DispatchQueue.main.asyncAfter(deadline: .now()+25) {
            FileHandle.standardError.write("TIMEOUT\n".data(using:.utf8)!)
            exit(2)
        }
    }
    func userContentController(_ u: WKUserContentController, didReceive m: WKScriptMessage) {
        if m.name == "result", let s = m.body as? String {
            print(s)
            exit(0)
        }
    }
}

let args = CommandLine.arguments
guard args.count > 1 else { FileHandle.standardError.write("usage: wkdriver <file>\n".data(using:.utf8)!); exit(3) }
let app = NSApplication.shared
app.setActivationPolicy(.accessory)
let d = Driver(url: URL(fileURLWithPath: args[1]))
d.run()
app.run()

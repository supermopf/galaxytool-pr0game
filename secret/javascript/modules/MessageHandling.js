define(["dojo/dom", "dojo/_base/fx", "dojo/on", "dojo/dom-style", "dojo/domReady!"], function(g, h, l, k) {
    function c(a, b) {
        "string" != typeof b && (b = "../images");
        d = a;
        f = b
    }
    var d, f;
    c.prototype.getMessagesHTML = function() {
        for (var a = "", b = 0; b < d.messages.length; b++) {
            var c = d.messages[b],
                e = "";
            switch (c.severity) {
                case "I":
                    e = "info.png";
                    break;
                case "W":
                    e = "warning.png";
                    break;
                default:
                    e = "error.png"
            }
            a += '<p><img src="' + f + "/" + e + '">&nbsp;&nbsp;' + c.message + "</p>"
        }
        return a
    };
    c.prototype.showMessages = function(a) {
        "boolean" != typeof a &&
            (a = !0);
        for (var b = 0; b < d.messages.length && !1 != a; b++) switch (d.messages[b].severity) {
            case "I":
                a = !0;
                break;
            case "W":
                a = !1;
                break;
            default:
                a = !1
        }
        g.byId("messageAreaContent").innerHTML = this.getMessagesHTML(d, f);
        k.set("messageArea", "display", "block");
        h.fadeIn({
            node: "messageArea"
        }).play();
        !0 === a && window.setTimeout(this.hideMessages, 1E4)
    };
    c.prototype.hideMessages = function() {
        h.fadeOut({
            node: g.byId("messageArea")
        }).play();
        k.set("messageArea", "display", "none")
    };
    return c
});
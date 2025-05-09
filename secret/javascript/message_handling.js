function getMessagesHTML(a, c) {
    var b = "";
    dojo.forEach(a.messages, function (a) {
        var d = "";
        switch (a.severity) {
            case "I":
                d = "info.png";
                break;
            case "W":
                d = "warning.png";
                break;
            case "E":
                d = "error.png"
        }
        b += '<p><img src="' + c + "/" + d + '">&nbsp;&nbsp;' + a.message + "</p>"
    });
    return b
}

function showMessages(a, c, b) {
    "string" != typeof c && (c = "../images");
    "boolean" != typeof b && (b = !0);
    dojo.forEach(a.messages, function (a) {
        switch (a.severity) {
            case "I":
                image = "info.png";
                break;
            case "W":
                b = !1;
                break;
            case "E":
                b = !1
        }
    });
    dojo.byId("messageAreaContent").innerHTML = getMessagesHTML(a, c);
    dojo.fx.wipeIn({node: dojo.byId("messageArea")}).play();
    !0 === b && window.setTimeout("hideMessages()", 1E4)
}

function hideMessages() {
    dojo.fx.wipeOut({node: dojo.byId("messageArea")}).play()
};

var galaxytool = window.galaxytool || {};
galaxytool.General = {
    errorMessages: !1,
    checkForVersion: function() {
        require(["dojo/dom", "dijit/registry", "dojo/fx"], function(a, b, c) {
            c.wipeIn({
                node: a.byId("updateArea")
            }).play();
            b.byId("updateAreaContent").set("href", "ajax/ajax_updatecheck.php");
            window.setTimeout(function() {
                galaxytool.General.hideUpdateInfo()
            }, 1E4)
        })
    },
    hideUpdateInfo: function() {
        require(["dojo/dom", "dojo/fx"], function(a, b) {
            b.wipeOut({
                node: a.byId("updateArea")
            }).play()
        })
    },
    compareCoordinates: function(a, b) {
        var c = a.split(":"),
            e = b.split(":");
        if (3 != c.length || 3 != e.length) return 0;
        a = 1E5 * parseInt(c[0]) + 100 * parseInt(c[1]) + parseInt(c[2]);
        b = 1E5 * parseInt(e[0]) + 100 * parseInt(e[1]) + parseInt(e[2]);
        return a < b ? -1 : a > b ? 1 : 0
    },
    compareInteger: function(a, b) {
        return parseInt(a) < parseInt(b) ? -1 : parseInt(a) > parseInt(b) ? 1 : 0
    },
    compareFloat: function(a, b) {
        return parseFloat(a) < parseFloat(b) ? -1 : parseFloat(a) > parseFloat(b) ? 1 : 0
    },
    numberFormat: function(a) {
        var b = (a + "").split(",");
        a = b[0];
        for (var b = 1 < b.length ? "." + b[1] : "", c = /(\d+)(\d{3})/; c.test(a);) a = a.replace(c, "$1.$2");
        return a +
            b
    },
    getPlayerStatusString: function(a, b, c, e, f, g, h) {
        var d = "";
        "false" != b && (d += '<span class="banned">' + a.PLAYER_BANNED + "</span>");
        "false" != c && (d += '<span class="vacation">' + a.PLAYER_VACATION_MODE + "</span>");
        "false" != e && (d += '<span class="noob">' + a.PLAYER_NOOB + "</span>");
        "false" != f && (d += '<span class="inactive">' + a.PLAYER_INACTIVE + "</span>");
        "false" != g && (d += '<span class="longinactive">' + a.PLAYER_LONG_INACTIVE + "</span>");
        "false" != h && (d += '<span class="outlaw">' + a.PLAYER_OUTLAW + "</span>");
        return d
    },
    getPlayerStatusClass: function(a,
        b, c, e, f, g) {
        return "false" != c ? "noob" : "false" != g ? "outlaw" : "false" != b ? "vacation" : "false" != a ? "banned" : "false" != f ? "longinactive" : "false" != e ? "inactive" : "nothing"
    },
    getStorageCapacity: function(a) {
        return 5E3 * Math.floor(2.5 * Math.pow(Math.E, 20 * a / 33))
    }
};
require(["dojo/parser", "dojo/ready", "dojo/query"], function(a, b, c) {
    b(function() {
        a.parse();
        c(".startsHidden").style("opacity", 100).removeClass("startsHidden")
    })
});
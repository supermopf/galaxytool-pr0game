var galaxytool = window.galaxytool || {};
galaxytool.Debris = {
    searchstore: null,
    currentTooltipColumn: null,
    currentTooltipRow: null,
    globalNLS: null,
    startSearch: function () {
        require("dojo/dom dojo/request dijit/registry dojo/dom-form dojo/dom-style dojox/data/QueryReadStore".split(" "), function (a,c, b, g, d, e, f) {
            a.byId("messageAreaContent").innerHTML = "";
            d.set("messageArea", "display", "none");
            galaxytool.Debris.searchstore = null;
			!0 == b.byId("search1").get("open") && b.byId("search1").toggle();
			
            c.post("ajax/ajax_debris.php?type=search", {
                handleAs: "json",
                data: g.toObject(a.byId("debris_report"))
            }).then(function (b) {
				null != b.messages && (new f(b.messages, "../images")).showMessages();
                d.set("result_view","display", "block");
                galaxytool.Debris.searchstore = new e({
                    url: "ajax/ajax_debris.php?type=content",
                    id: "galaxytool.Debris.searchstore",
                    requestMethod: "post"
                })
                searchgrid.setStore(galaxytool.Debris.searchstore);

            }, function (a) {
                console.log("Error:");
                console.log(a)
            })
        });
        return !1
    },
    formatCenter: function (a, c, b) {
        b.customClasses.push("centered_text");
        return a
    },
    formatAddress: function (a, c, b) {
        b.customClasses.push("centered_text");
        c = a.split(":");
        if (3 == c.length) return '<a href="galaxyview.php?gala=' + c[0] + "&system=" + c[1] + '">' + a +
            "</a>"
    },
    formatDatetime: function (a, c, b) {
        b.customClasses.push("centered_text");
        b.customClasses.push("datetime_text");
        return a
    },
    formatDebris: function (a, c, b) {
        b.customClasses.push("centered_text");
        b = a;
        if (0 < a.m || 0 < a.c) a = '<div id="debris' + c + '" style="font-size: 8px;">M:' + galaxytool.General.numberFormat(b.m) + '</div><div style="font-size: 8px;">K:' +
            galaxytool.General.numberFormat(b.c) + "</div>";
        else return "";
        return a
    },
	formatNumber: function(a) {
        var b = (a + "").split(",");
        a = b[0];
        for (var b = 1 < b.length ? "." + b[1] : "", c = /(\d+)(\d{3})/; c.test(a);) a = a.replace(c, "$1.$2");
        return a + b
    },
    formatAlly: function (a, c, b) {
        b.customClasses.push("centered_text");
        return 0 == a.id || null == a.id ? "" : '<a href="allyinformation.php?id=' + a.id + '" class="' + a.s + '">' + a.n + "</a>"
    },
    formatPlayer: function (a, c, b) {
        b.customClasses.push("centered_text");
        return 0 == a.id || null == a.id ? "" : '<a href="playerinformation.php?id=' + a.id + '" class="' + a.s + '">' + a.n + "</a>"
    },
    showRowTooltip: function (a) {
        require(["dojo/on", "dijit/Tooltip", "dojo/mouse", "dojo/i18n!./nls/galaxytool.js"], function (c, b, g, d) {
            var e = !1,
                f = a.cellIndex,
                h = a.rowIndex;
            if (!(f == galaxytool.Debris.currentTooltipColumn && h == galaxytool.Debris.currentTooltipRow)) {
                var k = searchgrid.store.getValue(searchgrid.getItem(h), "debris"),
                    l = "";
                if (2 == f) {
                    if (0 ==
                        k.m && 0 == k.c) return;
                    l = "<div style=font-size:10pt;>" + d.REPORTS_FOR_TF + ":<br>" + d.REPORTS_REC + ": " + galaxytool.General.numberFormat(Math.ceil((k.m + k.c) / 2E4)) + "</div>";
                    e = !0
                }
                !0 == e && (galaxytool.Debris.currentTooltipColumn = f, galaxytool.Debris.currentTooltipRow = h, b.show(l, a.cellNode), c.once(a.cellNode, g.leave, function () {
                    b.hide(a.cellNode)
                }))
            }
        })
    }
};
require("dojo/parser dojo/ready dojo/on dojo/dom dojo/dom-attr dijit/registry dojo/i18n!./nls/galaxytool.js dojo/NodeList-dom dijit/Dialog dijit/TooltipDialog dijit/TitlePane dijit/layout/ContentPane dijit/layout/BorderContainer dijit/form/Form dijit/form/ComboBox dijit/form/TextBox dijit/form/DropDownButton dijit/form/NumberTextBox dijit/form/RadioButton dijit/form/DateTextBox dijit/form/TimeTextBox dijit/form/Select dijit/form/Textarea dojox/grid/DataGrid dojo/data/ItemFileReadStore".split(" "), function (a,
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 c, b, g, d, e, f, h) {
    c(function () {
        galaxytool.Debris.globalNLS = f;
        d.set(e.byId("collector").textbox, "autocomplete", "on");
        b(searchgrid, "RowMouseOver", galaxytool.Debris.showRowTooltip);
        dijit.byId("collector").focus();
    })
});
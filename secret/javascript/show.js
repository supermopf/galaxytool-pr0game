var galaxytool = window.galaxytool || {};
galaxytool.Show = {
    searchstore: null,
    currentTooltipColumn: null,
    currentTooltipRow: null,
    globalNLS: null,
    changePlayerProgressSearch: function () {
        require(["dijit/registry"], function (a) {
            "-" != a.byId("select_playerprogress").get("value") && (a.byId("select_inactive").set("value", "no"), a.byId("select_vacation").set("value", "no"), a.byId("select_banned").set("value", "no"))
        })
    },
    startSearch: function () {
        require("dojo/dom dojo/request dijit/registry dojo/dom-form dojo/dom-style dojox/data/QueryReadStore galaxytool/MessageHandling".split(" "), function (a,
                                                                                                                                                               c, b, g, d, e, f) {
            a.byId("messageAreaContent").innerHTML = "";
            d.set("messageArea", "display", "none");
            galaxytool.Show.searchstore = null;
            !0 == b.byId("search1").get("open") && b.byId("search1").toggle();
            !0 == b.byId("search2").get("open") && b.byId("search2").toggle();
            c.post("ajax/ajax_show.php?type=search", {
                handleAs: "json",
                data: g.toObject(a.byId("show1"))
            }).then(function (b) {
                null != b.messages && (new f(b.messages, "../images")).showMessages();
                a.byId("results").innerHTML = galaxytool.General.numberFormat(b.results);
                d.set("result_view",
                    "display", "block");
                galaxytool.Show.searchstore = new e({
                    url: "ajax/ajax_show.php?type=content",
                    id: "galaxytool.Show.searchstore",
                    requestMethod: "post"
                })
                searchgrid.setStore(galaxytool.Show.searchstore);


            }, function (a) {
                console.log("Error:");
                console.log(a)
            })
        });
        return !1
    },
    displayEspionageQueue: function () {
        console.log("searchstore: " + searchgrid.store._items.length);
        console.log("galaxytool.Show.searchstore: " + galaxytool.Show.searchstore._items.length);
        let queuestring = "";
        for (let i = 0; i < galaxytool.Show.searchstore._items.length; i++) {
            queuestring += galaxytool.Show.searchstore._items[i].i.address + ";";
        }
        queuestring = queuestring.slice(0, -1);
        document.querySelector("#espionagequeue").value = queuestring;
        return true;
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
    formatMoon: function (a, c, b) {
        b.customClasses.push("centered_text");
        return !1 == a.exists ? "" : 'M<br><span style="font-size: 8px;">' + galaxytool.General.numberFormat(a.size) + " km</span>"
    },
    formatDebris: function (a, c, b) {
        b.customClasses.push("centered_text");
        b = a;
        if (0 < a.m || 0 < a.c) a = '<div id="debris' + c + '" style="font-size: 8px;">M:' + galaxytool.General.numberFormat(b.m) + '</div><div style="font-size: 8px;">K:' +
            galaxytool.General.numberFormat(b.c) + "</div>";
        else return "";
        return a
    },
    formatAlly: function (a, c, b) {
        b.customClasses.push("centered_text");
        return 0 == a.id || null == a.id ? "" : '<a href="allyinformation.php?id=' + a.id + '" class="' + a.s + '">' + a.n + "</a>"
    },
    formatPlayer: function (a, c, b) {
        b.customClasses.push("centered_text");
        return 0 == a.id || null == a.id ? "" : '<a href="playerinformation.php?id=' + a.id + '" class="' + a.s + '">' + a.n + "</a>"
    },
    formatStatus: function (a, c, b) {
        b.customClasses.push("centered_text");
        c = "";
        -1 < a.indexOf("v") &&
        (c += '<span class="vacation">' + galaxytool.Show.globalNLS.PLAYER_VACATION_MODE + "</span>");
        -1 < a.indexOf("b") && (c += '<span class="banned">' + galaxytool.Show.globalNLS.PLAYER_BANNED + "</span>");
        -1 < a.indexOf("i") && (c += '<span class="inactive">' + galaxytool.Show.globalNLS.PLAYER_INACTIVE + "</span>");
        -1 < a.indexOf("I") && (c += '<span class="longinactive">' + galaxytool.Show.globalNLS.PLAYER_LONG_INACTIVE + "</span>");
        -1 < a.indexOf("o") && (c += '<span class="outlaw">' + galaxytool.Show.globalNLS.PLAYER_OUTLAW + "</span>");
        return c
    },
    formatNotices: function (a, c, b) {
        a = parseInt(a);
        return !(0 < a) ? "" : '<img class="hyperlink" onClick="galaxytool.Show.ShowNoticeContent(' + a + ')" src="../images/notice.gif" height="14" width="12" alt="notice" border="0">'
    },
    formatReports: function (a, c, b) {
        if (!0 != a.p && !0 != a.m) return "";
        c = "10px";
        !0 == a.p ? b = '<img class="hyperlink" onClick="galaxytool.ReportFetch.showReport(\'' + a.c + '\',false)" src="../images/spio.gif" height="16" width="13" alt="espionage report" border="0">' : (b = "", c = "23px");
        return b = !0 == a.m ? b + ('<img style="margin-left: ' +
            c + ';" class="hyperlink" onClick="galaxytool.ReportFetch.showReport(\'' + a.c + '\',true)" src="../images/spio.gif" height="16" width="13" alt="espionage report" border="0">') : b + ""
    },
    showRowTooltip: function (a) {
        require(["dojo/on", "dijit/Tooltip", "dojo/mouse", "dojo/i18n!./nls/galaxytool.js"], function (c, b, g, d) {
            var e = !1,
                f = a.cellIndex,
                h = a.rowIndex;
            if (!(f == galaxytool.Show.currentTooltipColumn && h == galaxytool.Show.currentTooltipRow)) {
                var k = searchgrid.store.getValue(searchgrid.getItem(h), "debris"),
                    l = "";
                if (2 == f) {
                    if (0 ==
                        k.m && 0 == k.c) return;
                    l = "<div style=font-size:10pt;>" + d.REPORTS_FOR_TF + ":<br>" + d.REPORTS_REC + ": " + galaxytool.General.numberFormat(Math.ceil((k.m + k.c) / 2E4)) + "</div>";
                    e = !0
                }
                !0 == e && (galaxytool.Show.currentTooltipColumn = f, galaxytool.Show.currentTooltipRow = h, b.show(l, a.cellNode), c.once(a.cellNode, g.leave, function () {
                    b.hide(a.cellNode)
                }))
            }
        })
    },
    ShowNoticeContent: function (a) {
        dojo.byId("messageArea").style.display = "none";
        dijit.byId("NoticeDialogContent").set("href", "ajax/ajax_notices_read.php?playerid=" + a);
        dojo.byId("NoticeDialogEdit").setAttribute("onclick",
            "galaxytool.Show.EditNoticeContent(" + a + ")");
        dojo.byId("NoticeDialogEdit").style.display = "";
        dijit.byId("NoticeDialog").show()
    },
    EditNoticeContent: function (a) {
        dijit.byId("NoticeDialogContent").set("href", "ajax/ajax_notices_edit.php?playerid=" + a + "&dialog=NoticeDialog&refresh=");
        dojo.byId("NoticeDialogEdit").style.display = "none"
    }
};
require("dojo/parser dojo/ready dojo/on dojo/dom dojo/dom-attr dijit/registry dojo/i18n!./nls/galaxytool.js dojo/NodeList-dom dijit/Dialog dijit/TooltipDialog dijit/TitlePane dijit/layout/ContentPane dijit/layout/BorderContainer dijit/form/Form dijit/form/ComboBox dijit/form/TextBox dijit/form/DropDownButton dijit/form/NumberTextBox dijit/form/RadioButton dijit/form/DateTextBox dijit/form/TimeTextBox dijit/form/Select dijit/form/Textarea dojox/grid/DataGrid dojo/data/ItemFileReadStore".split(" "), function (a,
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 c, b, g, d, e, f, h) {
    c(function () {
        galaxytool.Show.globalNLS = f;
        d.set(e.byId("player").textbox, "autocomplete", "on");
        d.set(e.byId("alliance").textbox, "autocomplete", "on");
        b(searchgrid, "RowMouseOver", galaxytool.Show.showRowTooltip);
        !0 == TRIGGER_SEARCH ? galaxytool.Show.startSearch() : dijit.byId("player").focus();
    })
});
var galaxytool = window.galaxytool || {};
galaxytool.report_buffer = galaxytool.report_buffer || {};
galaxytool.ReportFetch = {
    _galaxytoolReportTooltipMouseOver: !1, showReport: function (d, a, m, h, e) {
        galaxytool.ReportFetch._galaxytoolReportTooltipMouseOver = !0;
        require(["dojo/dom", "dojo/request", "dojo/html", "galaxytool/ReportDisplay", "dojo/i18n!./nls/galaxytool.js"], function (l, f, k, n, g) {
            if (!(!0 != a && !1 != a)) {
                var c = d.match(/\d+\:\d+\:\d+/), b = d;
                a && (b += "M");
                c && ("undefined" != typeof galaxytool.report_buffer[b] ? galaxytool.ReportFetch.displayReportDialog(d, a, h, e) : f.post("ajax/ajax_report.php?type=load&coordinates=" +
                    d + "&moon=" + a, {handleAs: "json"}).then(function (c) {
                    "" != c && "undefined" != typeof c.id && (galaxytool.report_buffer[b] = c, void 0 === m ? galaxytool.ReportFetch.displayReportDialog(d, a, h, e) : (c = (new n(!0)).display(galaxytool.report_buffer[b].planetname, d, galaxytool.report_buffer[b].playername, g.REPORTS_UPLOAD_BY, galaxytool.report_buffer[b].username, galaxytool.report_buffer[b], a, !1, g.REPORT_ARCHIVE_TITLE, g.REPORTS_ALL_RESOURCES), k.set(l.byId("ReportInline"), c)))
                }, function (a) {
                    console.log("Error:");
                    console.log(a)
                }))
            }
        })
    },
    displayReportDialog: function (d, a, m, h) {
        require("dojo/dom dijit/registry dojo/request dojo/html dijit/popup galaxytool/ReportDisplay dojo/i18n!./nls/galaxytool.js".split(" "), function (e, l, f, k, n, g, c) {
            if (!(!0 != a && !1 != a)) {
                f = d.match(/\d+\:\d+\:(\d+)/)[1];
                var b = d;
                a && (b += "M");
                "undefined" == typeof galaxytool.report_buffer[b] ? console.log("error: buffer empty for coordinates") : (k = new g(!1), g = k.display(galaxytool.report_buffer[b].planetname, d, galaxytool.report_buffer[b].playername, c.REPORTS_UPLOAD_BY, galaxytool.report_buffer[b].username,
                    galaxytool.report_buffer[b], a, !1, c.REPORT_ARCHIVE_TITLE, c.REPORTS_ALL_RESOURCES), !0 === m ? (void 0 === h ? (c = a ? e.byId("reports1_" + f) : e.byId("reports2_" + f), f = ["below", "below-alt", "above", "above-alt"]) : (c = e.byId(h), f = "after before below below-alt above above-alt".split(" ")), e.byId("reporttooltipcontent").innerHTML = g, n.open({
                    popup: l.byId("reporttooltip"),
                    around: c,
                    orient: f
                }), window.setTimeout(galaxytool.ReportFetch.closeReportTooltipIfNotUsed, 2E3)) : (galaxytool.ReportFetch.closeReportTooltip(), e = l.byId("ReportDialog"),
                    e.set("title", c.REPORT_ARCHIVE_DETAILS), e.set("content", g), e.show(), k.addReportClickAndCloseListener()))
            }
        })
    }, closeReportTooltipIfNotUsed: function () {
        require(["dijit/registry", "dijit/popup"], function (d, a) {
            !1 == galaxytool.ReportFetch._galaxytoolReportTooltipMouseOver && a.close(d.byId("reporttooltip"))
        })
    }, closeReportTooltip: function () {
        require(["dijit/registry", "dijit/popup"], function (d, a) {
            a.close(d.byId("reporttooltip"));
            galaxytool.ReportFetch._galaxytoolReportTooltipMouseOver = !1
        })
    }, reportTooltipMouseOver: function () {
        galaxytool.ReportFetch._galaxytoolReportTooltipMouseOver =
            !0
    }
};

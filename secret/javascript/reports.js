var galaxytool = window.galaxytool || {};
galaxytool.Reports = {
    searchstore: null,
    deleteBoxDone: [],
    columnKeys: "address moon ally g_planet player datetime depth all_resources all_resis fleet_resis defence_resis metal crystal deuterium energy kt gt lj sj krz ss kolo rec spio bomb zerri ds skrz sat rak ll sl ion gauss plasma ksk gsk arak irak memi krimi deutsyn solar fusion robo nani rawe mesp krissp deutsp folab terra allydep raksilo mbase sensor sprungtor spiolvl computech waffentech schildtech rpz energytech hypertech vbt impulse hra lasertech iontech plasmatech forschungsnetz expedition gravi".split(" "),
    startSearch: function () {
        require("dojo/dom dojo/request dijit/registry dojo/dom-form dojo/dom-style dojo/data/ItemFileWriteStore galaxytool/MessageHandling".split(" "),
            function (c, b, a, d, e, g, f) {
                c.byId("messageAreaContent").innerHTML = "";
                e.set("messageArea", "display", "none");
                e.set("search_button", "display", "none");
                e.set("search_icon", "display", "");
                galaxytool.Reports.searchstore = null;
                for (var h = 1; 8 > h; h++) !0 == a.byId("search" + h).get("open") && a.byId("search" + h).toggle();
                b.post("ajax/ajax_report.php?type=search", {
                    handleAs: "json",
                    data: d.toObject(c.byId("report1"))
                }).then(function (b) {
                    null != b.messages && (new f(b.messages, "../images")).showMessages();
                    e.set("result_view", "display",
                        "block");
                    galaxytool.Reports.searchstore = new g({
                        id: "searchstore",
                        data: {identifier: "id", items: b.items}
                    });
                    galaxytool.Reports.searchstore.comparatorMap = {};
                    for (var a = 0; a < galaxytool.Reports.columnKeys.length; a++) switch (galaxytool.Reports.columnKeys[a]) {
                        case "player":
                        case "ally":
                        case "g_planet":
                            galaxytool.Reports.searchstore.comparatorMap[galaxytool.Reports.columnKeys[a]] = function (a, b) {
                                return a.localeCompare(b)
                            };
                            break;
                        case "address":
                            galaxytool.Reports.searchstore.comparatorMap[galaxytool.Reports.columnKeys[a]] =
                                galaxytool.General.compareCoordinates;
                            break;
                        case "moon":
                        case "datetime":
                            break;
                        case "depth":
                            galaxytool.Reports.searchstore.comparatorMap[galaxytool.Reports.columnKeys[a]] = galaxytool.General.compareInteger;
                            break;
                        default:
                            galaxytool.Reports.searchstore.comparatorMap[galaxytool.Reports.columnKeys[a]] = galaxytool.General.compareInteger
                    }
                    searchgrid.setStore(galaxytool.Reports.searchstore);
                    c.byId("results").innerHTML = galaxytool.General.numberFormat(b.items.length);
                    e.set("search_button", "display", "");
                    e.set("search_icon",
                        "display", "none")
                }, function (a) {
                    console.log("Error:");
                    console.log(a);
                    e.set("search_button", "display", "");
                    e.set("search_icon", "display", "none")
                })
            });
        return !1
    },
    formatNumber: function (c, b, a) {
        return galaxytool.General.numberFormat(c)
    },
    formatAddress: function (c, b, a) {
        b = c.split(":");
        if (3 == b.length) return '<a href="galaxyview.php?gala=' + b[0] + "&system=" + b[1] + '">' + c + "</a>"
    },
    formatScanDepth: function (c, b, a) {
        switch (c) {
            case "1":
                return column_header.depth.resources;
            case "2":
                return column_header.depth.fleet;
            case "3":
                return column_header.depth.defence;
            case "4":
                return column_header.depth.buildings;
            case "5":
                return column_header.depth.research;
            default:
                return c
        }
    },
    formatDateTime: function (c, b, a) {
        a.customClasses.push("datetime_text");
        return c = c.replace(/(\d+\-)(\d+\-\d+\s\d+\:\d+)(\:\d+)/g, "$2")
    },
    formatMoon: function (c, b, a) {
        return "false" == c ? "" : "M"
    },
    formatAlly: function (c, b, a) {
        a = galaxytool.Reports.searchstore.getValue(searchgrid.getItem(b), "ally_id");
        if (0 == a || null == a) return "";
        b = galaxytool.Reports.searchstore.getValue(searchgrid.getItem(b), "ally_status");
        return '<a href="allyinformation.php?id=' + a + '" class="' + b + '">' + c + "</a>"
    },
    formatPlayer: function (c, b, a) {
        a = galaxytool.Reports.searchstore.getValue(searchgrid.getItem(b), "player_id");
        if (0 == a || null == a) return "";
        b = galaxytool.Reports.searchstore.getValue(searchgrid.getItem(b), "player_status");
        return '<a href="playerinformation.php?id=' + a + '" class="' + b + '">' + c + "</a>"
    },
    formatSecondColumn: function (c, b, a) {
        b = galaxytool.Reports.searchstore.getValue(searchgrid.getItem(b), "moon");
        return "<img onclick='galaxytool.ReportFetch.showReport(\"" +
            c + '",' + b + ')\' src="../images/magnifier2.png" height=16" width="16" style="cursor: pointer;">'
    },
    formatFirstColumn: function (c, b, a) {
        require(["dijit/registry", "dijit/form/CheckBox"], function (a, b) {
            if (!0 == galaxytool.Reports.deleteBoxDone[c]) return a.byId("deletebox" + c);
            galaxytool.Reports.deleteBoxDone[c] = !0;
            try {
                return new b({id: "deletebox" + c, name: "checkBox", value: "true", checked: !1})
            } catch (g) {
                return console.log(g), ""
            }
        })
    },
    changeLayout: function () {
        require(["dijit/registry", "dijit/form/CheckBox"], function (c,
                                                                     b) {
            var a = [[]], d = "";
            a[0].push({
                name: " ", field: "id", formatter: function (a, d, e) {
                    if (!0 == galaxytool.Reports.deleteBoxDone[a]) return c.byId("deletebox" + a);
                    galaxytool.Reports.deleteBoxDone[a] = !0;
                    try {
                        return new b({id: "deletebox" + a, name: "checkBox", value: "true", checked: !1})
                    } catch (f) {
                        return console.log(f), ""
                    }
                }, cellClasses: "default_reports_cell", width: "25px"
            });
            a[0].push({
                name: " ",
                field: "address",
                formatter: galaxytool.Reports.formatSecondColumn,
                cellClasses: "default_reports_cell",
                width: "25px"
            });
            for (var e = {
                address: galaxytool.Reports.formatAddress,
                moon: galaxytool.Reports.formatMoon,
                ally: galaxytool.Reports.formatAlly,
                player: galaxytool.Reports.formatPlayer,
                datetime: galaxytool.Reports.formatDateTime,
                depth: galaxytool.Reports.formatScanDepth,
                others: galaxytool.Reports.formatNumber
            }, d = d + "address", g = 0; g < galaxytool.Reports.columnKeys.length; g++) if ("true" == dijit.byId("column_" + galaxytool.Reports.columnKeys[g]).get("value")) {
                var d = d + ("|" + galaxytool.Reports.columnKeys[g]), f = e.others;
                e[galaxytool.Reports.columnKeys[g]] && (f = e[galaxytool.Reports.columnKeys[g]]);
                var h;
                switch (galaxytool.Reports.columnKeys[g]) {
                    case "address":
                        h = "75px";
                        break;
                    case "moon":
                        h = "40px";
                        break;
                    case "datetime":
                        h = "75px";
                        break;
                    default:
                        h = "100px"
                }
                a[0].push({
                    name: "depth" == galaxytool.Reports.columnKeys[g] ? column_header.depth.header : column_header[galaxytool.Reports.columnKeys[g]],
                    field: galaxytool.Reports.columnKeys[g],
                    formatter: f,
                    cellClasses: "default_reports_cell",
                    width: h
                })
            }
            2 == a[0].length && (a = [[{
                name: column_header.address,
                field: "address",
                formatter: galaxytool.Reports.formatAddress,
                cellClasses: "default_reports_cell",
                width: "75px"
            }, {
                name: column_header.moon,
                field: "moon",
                formatter: galaxytool.Reports.formatMoon,
                cellClasses: "default_reports_cell",
                width: "40px"
            }, {
                name: column_header.ally,
                field: "ally",
                formatter: galaxytool.Reports.formatAlly,
                cellClasses: "default_reports_cell",
                width: "100px"
            }, {
                name: column_header.player,
                field: "player",
                formatter: galaxytool.Reports.formatPlayer,
                cellClasses: "default_reports_cell",
                width: "100px"
            }, {
                name: column_header.datetime,
                field: "datetime",
                formatter: galaxytool.Reports.formatDateTime,
                cellClasses: "default_reports_cell",
                width: "75px"
            }, {
                name: column_header.metal,
                field: "metal",
                formatter: galaxytool.Reports.formatNumber,
                cellClasses: "default_reports_cell",
                width: "100px"
            }, {
                name: column_header.crystal,
                field: "crystal",
                formatter: galaxytool.Reports.formatNumber,
                cellClasses: "default_reports_cell",
                width: "100px"
            }, {
                name: column_header.deuterium,
                field: "deuterium",
                formatter: galaxytool.Reports.formatNumber,
                cellClasses: "default_reports_cell",
                width: "100px"
            }, {
                name: column_header.all_resources, field: "all_resources", formatter: galaxytool.Reports.formatNumber,
                cellClasses: "default_reports_cell", width: "100px"
            }, {
                name: column_header.all_resis,
                field: "all_resis",
                formatter: galaxytool.Reports.formatNumber,
                cellClasses: "default_reports_cell",
                width: "100px"
            }, {
                name: column_header.depth.header,
                field: "depth",
                formatter: galaxytool.Reports.formatScanDepth,
                cellClasses: "default_reports_cell",
                width: "100px"
            }]]);
            searchgrid.set("structure", a);
            searchgrid.set("autoHeight", galaxytool_autoheight);
            c.byId("ColumnDialog").hide();
            !0 == navigator.cookieEnabled && (a = new Date, e = a.getTime() +
                2592E6, a.setTime(e), document.cookie = "report_columns=" + d + "; expires=" + a.toGMTString())
        })
    },
    checkboxSelection: function (c) {
        require(["dijit/registry"], function (b) {
            for (var a = null, a = null, d = 0; d < searchgrid.get("rowCount"); d++) a = searchgrid.getItem(d), null != a && (a = galaxytool.Reports.searchstore.getValues(a, "id"), "true" == b.byId("deletebox" + a).get("value") ? !0 != c && b.byId("deletebox" + a).set("value", !1) : !0 == c && b.byId("deletebox" + a).set("value", !0))
        })
    },
    columnSelection: function (c, b) {
        require(["dijit/registry"], function (a) {
            var d =
                0, e = 1;
            switch (c) {
                case 1:
                    d = 0;
                    e = 10;
                    break;
                case 2:
                    d = 11;
                    e = 14;
                    break;
                case 3:
                    d = 15;
                    e = 28;
                    break;
                case 4:
                    d = 29;
                    e = 38;
                    break;
                case 5:
                    d = 39;
                    e = 56;
                    break;
                case 6:
                    d = 57;
                    e = galaxytool.Reports.columnKeys.length - 1;
                    break;
                default:
                    return
            }
            for (; d <= e; d++) a.byId("column_" + galaxytool.Reports.columnKeys[d]).set("value", b)
        })
    },
    deleteSelected: function () {
        require(["dijit/registry", "dojo/request", "dojo/_base/array", "galaxytool/MessageHandling"], function (c, b, a, d) {
            for (var e = null, g = null, f = [], h = [], k = 0; k < searchgrid.get("rowCount"); k++) e = searchgrid.getItem(k),
            null != e && (g = galaxytool.Reports.searchstore.getValues(e, "id"), "true" == c.byId("deletebox" + g).get("value") && (f.push(parseInt(g)), h.push(e)));
            b.post("ajax/ajax_report.php?type=delete", {handleAs: "json", data: {id: f.join("|")}}).then(function (b) {
                null != b.messages && (new d(b.messages, "../images")).showMessages();
                a.forEach(h, function (a) {
                    null !== a && galaxytool.Reports.searchstore.deleteItem(a)
                })
            }, function (a) {
                console.log("Error:");
                console.log(a)
            })
        })
    },
    loadCookieData: function () {
        require(["dijit/registry"], function (c) {
            if (!0 ==
                navigator.cookieEnabled && document.cookie) for (var b = document.cookie.split(";"), a = 0; a < b.length; a++) if (-1 < b[a].indexOf("report_columns=")) {
                for (var d = 0; d < galaxytool.Reports.columnKeys.length; d++) "true" == c.byId("column_" + galaxytool.Reports.columnKeys[d]).get("value") && c.byId("column_" + galaxytool.Reports.columnKeys[d]).set("value", !1);
                b = b[a].split("|");
                b[0] = b[0].substring(0, b[0].indexOf("report_columns="));
                for (d = 0; d < b.length; d++) if ("" != b[d]) try {
                    c.byId("column_" + b[d]).set("value", !0)
                } catch (e) {
                    console.log("Error at check column dijit"),
                        console.log(e)
                }
                break
            }
        })
    },
    showTooltip: function (c) {
        require(["dijit/registry", "dojo/on", "dijit/Tooltip", "dojo/mouse", "dojo/i18n!./nls/galaxytool.js"], function (b, a, d, e, g) {
            if (!(0 > c.rowIndex)) switch (c.cell.name) {
                case column_header.metal:
                case column_header.crystal:
                case column_header.deuterium:
                case column_header.depth.resources:
                    b = c.grid.getItem(c.rowIndex);
                    var f = 0, h = 0, k = 0, l = "true" == c.grid.store.getValue(b, "player_bandit") ? 1 : 2,
                        f = parseInt(c.grid.store.getValue(b, "metal")), h = parseInt(c.grid.store.getValue(b,
                            "crystal")), k = parseInt(c.grid.store.getValue(b, "deuterium"));
                    b = Math.ceil(Math.max(f + h + k, Math.min(0.75 * (2 * f + h + k), 2 * f + k)) / (5E3 * l));
                    var m = Math.ceil(Math.max(f + h + k, Math.min(0.75 * (2 * f + h + k), 2 * f + k)) / (25E3 * l)),
                        h = Math.ceil(Math.max(f + h + k, Math.min(0.75 * (2 * f + h + k), 2 * f + k)) / (1500 * l)),
                        f = g.REPORTS_FOR_ALL_RES + ":<br />",
                        f = f + (column_header.kt + ": " + galaxytool.General.numberFormat(b) + "<br />"),
                        f = f + (column_header.gt + ": " + galaxytool.General.numberFormat(m) + "<br />"),
                        f = f + (column_header.ss + ": " + galaxytool.General.numberFormat(h) +
                            "<br />");
                    d.show(f, c.cellNode);
                    a.once(c.cellNode, e.leave, function () {
                        d.hide(c.cellNode)
                    });
                    break;
                case column_header.fleet_resis:
                case column_header.defence_resis:
                    b = c.grid.getItem(c.rowIndex), a = 1E3 * parseInt(c.grid.store.getValue(b, c.cell.field)), a = Math.ceil(a * (galaxytool_debris_rate / 100) / 2E4), f = g.REPORTS_FOR_TF + ":<br />", f += g.REPORTS_REC + ": " + galaxytool.General.numberFormat(a) + "<br />", dijit.showTooltip(f, c.cellNode)
            }
        })
    }
};
require("dojo/parser dojo/ready dojo/on dojo/dom dojo/dom-attr dijit/registry dojo/NodeList-dom dijit/Dialog dijit/TooltipDialog dijit/TitlePane dijit/layout/ContentPane dijit/layout/BorderContainer dijit/form/Form dijit/form/ComboBox dijit/form/DropDownButton dijit/form/NumberTextBox dijit/form/CheckBox dijit/form/Select dijit/form/FilteringSelect dojox/grid/DataGrid dojo/data/ItemFileReadStore".split(" "), function (c, b, a, d, e, g, f) {
    b(function () {
        galaxytool.Reports.loadCookieData();
        setTimeout("galaxytool.Reports.changeLayout()",
            0);
        a(searchgrid, "CellMouseOver", galaxytool.Reports.showTooltip)
    })
});

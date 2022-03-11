var grid_layout_done = !1, delete_box_done = [];
google.load("visualization", "1", {packages: ["corechart", "annotatedtimeline"]});

function galaxytool_drawChart() {
    let Chart = dijit.byId("chart_type").get("value");
    let selectedReports = grid1.selection.getSelected();
    if (selectedReports.length > 0) {
        let b = [];
        let ScanTimes = grid1.getItem(2);
        let f = [];
        let ScanTimeAttributes = grid1.store.getAttributes(ScanTimes);

        f.push(grid1.store.getValues(ScanTimes, "c0")[0]);

        for (let e = ScanTimeAttributes.length - 3; e > 0; e--) {
            let h = ScanTimeAttributes[e].replace(/c\d+/, "");
            h = grid1.store.getValue(ScanTimes, ScanTimeAttributes[e]);
            f.push(h);
        }
        b.push(f);

        for (let g = 0; g < selectedReports.length; g++) {
            f = [];
            let selectedItem = selectedReports[g];
            let e = store1.getValue(selectedItem, "key");
            if (!("msg_id" == e || "details" == e || "scantime" == e || "h1" == e || "h2" == e || "h3" == e || "h4" == e || "h5" == e)) {
                ScanTimeAttributes = grid1.store.getAttributes(selectedItem);
                let h = grid1.store.getValue(selectedItem, "c0");
                f.push(h);
                for (e = ScanTimeAttributes.length - 3; 0 < e; e--) {
                    ScanTimeAttributes[e].replace(/c\d+/, "");
                    h = grid1.store.getValue(selectedItem, ScanTimeAttributes[e]);
                    if (e == 0) {
                        f.push(h);
                    } else {
                        f.push(parseInt(h));
                    }
                }
                b.push(f)
            }
        }
        if (b.length > 0) {
            let DataTable = new google.visualization.DataTable;
            for (let h = 0; h < b.length; h++) switch (h) {
                case 0:
                    DataTable.addColumn("datetime", b[h][0]);
                    break;
                default:
                    DataTable.addColumn("number", b[h][0])
            }
            DataTable.addRows(b[0].length - 1);
            for (e = 1; e < b[0].length; e++) {
                //console.log(e);
                for (let j = 0; j < b.length; j++) {
                    switch (j) {
                        case 0:
                            f = b[j][e].toString().replace(/\-/g, " ").replace(/\:/g, " ").split(" ");
                            if(f.length != 6){
                                console.log("invalid date format provided");
                            }
                            DataTable.setValue(e - 1, j, new Date(parseInt(f[0], 10), parseInt(f[1], 10) - 1, parseInt(f[2], 10), parseInt(f[3], 10), parseInt(f[4], 10), parseInt(f[5], 10)));
                            break;
                        default:
                            DataTable.setValue(e - 1, j, b[j][e]), Chart && DataTable.setFormattedValue(e - 1, j, NumberFormat(b[j][e]))
                    }
                }
            }
            console.log(DataTable);
            if (Chart === "linechart") {
                ((new google.visualization.DateFormat({pattern: "yyyy-MM-dd HH:mm:ss"})).format(DataTable, 0), Chart = dijit.byId("ChartDialog"),
                    Chart.set("content", '<div id="chart_div"></div>'), b = new google.visualization.LineChart(document.getElementById("chart_div")), b.draw(DataTable, {
                    backgroundColor: "#13181D",
                    vAxis: {maxValue: 10, textStyle: {color: "#C4C4C4"}},
                    hAxis: {showEveryText : 10, slantedText : true, textStyle: {color: "#C4C4C4"}, gridlines: {color: "#13181D"}},
                    legend: {textStyle: {color: "#C4C4C4"}},
                    width: 700,
                    height: 400,
                    pointSize: 5
                }), Chart.show())
            } else {
                (Chart = dijit.byId("ChartDialog"), Chart.set("content", '<div id="chart_div" style="width: 1000px; height: 500px;"></div>'), Chart.show(), b = new google.visualization.AnnotatedTimeLine(document.getElementById("chart_div")),
                    b.draw(DataTable, {
                        displayAnnotations: !0,
                        dateFormat: "yyyy-MM-dd HH:mm:ss",
                        thickness: 2,
                        legendPosition: "newRow"
                    }))
            }
        }
    }
}

function galaxytool_archive_delete() {
    if (!0 == confirm(archive_confirm_delete)) {
        var d = 0, a = "", b = [];
        do d++, a = "c" + d, a = store1.getValue(grid1.getItem(0), a), "undefined" != typeof a && !0 == dijit.byId(a).get("checked") && b.push(a); while ("undefined" != typeof a && "" != a && 200 > d);
        dojo.xhrPost({
            url: "ajax/ajax_report_archive.php?type=delete",
            content: {msg_id: b.toString()},
            handleAs: "json",
            load: function (a) {
                null != a.messages ? showMessages(a.messages) : (a = store1.url, store1.close(), store1 = new dojo.data.ItemFileReadStore({url: a}),
                    grid_layout_done = !1, grid1.setStore(store1))
            },
            error: function (a) {
                console.log("Error:");
                console.log(a)
            }
        })
    }
}

function galaxytool_show_report(d) {
    var a = 0, b = "", c = "";
    do if (a++, b = "c" + a, store1.getValue(grid1.getItem(1), b) == d) {
        c = b;
        break
    } while ("" == c && 200 > a);
    if ("" != c) {
        try {
            var a = 0, f = b = "";
            d = {};
            do {
                b = store1.getValue(grid1.getItem(a), "key");
                value = store1.getValue(grid1.getItem(a), c);
                f = store1.getValue(grid1.getItem(a), "c0");
                if ("metal" == b || "crystal" == b || "deuterium" == b || "energy" == b) f += ":";
                d[b] = Array(2);
                d[b][0] = value;
                d[b][1] = f;
                a++
            } while (200 > a)
        } catch (g) {
        }
        c = dijit.byId("ReportDialog");
        d = galaxytool.report_display.display(resources_on_text,
            "", report_coordinates, "", report_when, "", "", d, galaxytool_is_moon, !0, "", galaxytool_total_res_text);
        c.set("content", d);
        c.show();
        galaxytool.report_display.addReportClickAndCloseListener()
    }
}

function galaxytool_archive_formatter(d, a, b) {
    a = store1.getValue(grid1.getItem(a), "key");
    if ("msg_id" == a || "h1" == a || "h2" == a || "h3" == a || "h4" == a || "h5" == a) b.customClasses.push("public"), "msg_id" != a && (d = '<div style="height:16px;">' + d + "</div>");
    "details" == a && (d = '<div style="height:16px;"></div>');
    if ("res_sum" == a || "fleet_sum" == a || "def_sum" == a) d = "&sum; " + d, b.customClasses.push("sum_row");
    return d
}

function galaxytool_archive_formatter2(d, a, b) {
    b.customClasses.push("centered_text");
    if (0 == a) {
        if (!1 == galaxytool_delete) return "";
        if (!0 == delete_box_done[d]) return dijit.byId(d);
        delete_box_done[d] = !0;
        try {
            var c = new dijit.form.CheckBox({id: d, name: "checkBox", value: "", checked: !1})
        } catch (f) {
            return console.log(f), ""
        }
        return c
    }
    if (1 == a) return "<img onclick='galaxytool_show_report(" + d + ')\' src="../images/magnifier2.png" style="cursor: pointer;">';
    a = store1.getValue(grid1.getItem(a), "key");
    if ("res_sum" == a || "fleet_sum" ==
        a || "def_sum" == a) b.customClasses.push("sum_row"); else if (("metal" == a || "crystal" == a || "deuterium" == a) && 0 < d) {
        var c = 0, g = store1.getValue(grid1.getItem(37), b.field);
        "h4" != store1.getValue(grid1.getItem(37), "key") && console.log("new lines added - adjust report_archive.js!");
        if ("ok" == g) if (!1 == galaxytool_is_moon) {
            switch (a) {
                case "metal":
                    c = store1.getValue(grid1.getItem(46), b.field);
                    break;
                case "crystal":
                    c = store1.getValue(grid1.getItem(47), b.field);
                    break;
                case "deuterium":
                    c = store1.getValue(grid1.getItem(48), b.field)
            }
            "mesp" !=
            store1.getValue(grid1.getItem(46), "key") && console.log("new lines added - adjust report_archive.js!")
        } else {
            switch (a) {
                case "metal":
                    c = store1.getValue(grid1.getItem(40), b.field);
                    break;
                case "crystal":
                    c = store1.getValue(grid1.getItem(41), b.field);
                    break;
                case "deuterium":
                    c = store1.getValue(grid1.getItem(42), b.field)
            }
            "mesp" != store1.getValue(grid1.getItem(40), "key") && console.log("new lines added - adjust report_archive.js!")
        }
        if ("ok" == g || !0 == galaxytool_is_moon) a = galaxytool.report_display.get_storage_capacity(parseInt(c)),
            c = parseInt(d), a <= c ? b.customClasses.push("traffic_light_red") : 0.9 * a <= c && b.customClasses.push("traffic_light_yellow")
    } else if ("h1" == a || "h2" == a || "h3" == a || "h4" == a || "h5" == a) return "ok" == d ? '<img src="../images/ok.png"">' : '<img src="../images/no.png"">';
    return !isNaN(parseFloat(d)) && isFinite(d) ? NumberFormat(d) : d
}

function galaxytool_archive_fetch_complete(d) {
    if (!0 != grid_layout_done) {
        var a = 0, b = "";
        do a++, b = "c" + a, b = store1.getValues(d[0], b); while ("undefined" != typeof b && "" != b && 200 > a);
        d = {noscroll: !0, cells: [{field: "c0", name: "c0", width: "150px", formatter: galaxytool_archive_formatter}]};
        for (var b = Array(a), c = 1; c < a; c++) b[c - 1] = {
            field: "c" + c,
            name: "",
            width: "75px",
            formatter: galaxytool_archive_formatter2
        };
        a = [d, b];
        grid_layout_done = !0;
        grid1.set("structure", a)
    }
}

function galaxytool_archive_init() {
    try {
        dojo.connect(dijit.byId("grid1"), "_onFetchComplete", galaxytool_archive_fetch_complete)
    } catch (d) {
        console.log(d)
    }
}

dojo.ready(galaxytool_archive_init);

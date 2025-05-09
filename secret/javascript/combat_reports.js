var selected_key = 0
  , data_grid = null
  , published_keys = []
  , filter_active = !1
  , filter = Array(3)
  , current_filter_value = Array(3)
  , report_store = null
  , ignore_next_fetch = !1
  , galaxytool_selected_rows = 0;
function galaxytool_cr_init() {
    dojo.connect(dijit.byId("attacker"), "onKeyPress", galaxytool_handle_searchchange);
    dojo.connect(dijit.byId("defender"), "onKeyPress", galaxytool_handle_searchchange);
    dojo.connect(dijit.byId("search_button"), "onClick", galaxytool_search);
    dojo.connect(dijit.byId("reset_button"), "onClick", galaxytool_reset);
    dojo.connect(dijit.byId("download_button"), "onClick", galaxytool_cr_download);
    dojo.connect(dijit.byId("publish_all_button"), "onClick", galaxytool_publish_selected);
    dojo.connect(dijit.byId("unpublish_all_button"), "onClick", galaxytool_unpublish_selected);
    dojo.connect(dijit.byId("delete_all_button"), "onClick", galaxytool_delete_selected);
    dojo.connect(dijit.byId("publish_button"), "onClick", galaxytool_publish_single);
    dojo.connect(dijit.byId("unpublish_button"), "onClick", galaxytool_unpublish_single);
    dojo.connect(dijit.byId("delete_button"), "onClick", galaxytool_delete_single);
    var a = dijit.byId("grid1");
    dojo.connect(a, "_onFetchComplete", galaxytool_grid_on_fetch_complete);
    dojo.connect(a, "onRowClick", galaxytool_handleRowSelect);
    dojo.connect(a, "onFetchError", handle_dojo_errors);
    try {
        dijit.byId("coordinates").validator = galaxytool_coordinate_input
    } catch (b) {
        console.log(b)
    }
}
dojo.ready(galaxytool_cr_init);
function galaxytool_handle_searchchange(a) {
    null != a && 13 != a.keyCode || galaxytool_search()
}
function galaxytool_handleRowSelect(a) {
    var b = a.grid.getItem(a.rowIndex)
      , d = a.grid.store.getValue(b, "id");
    if ("checkbox" == a.target.type && ("true" == a.grid.store.getValues(b, "selected") ? galaxytool_selected_rows++ : galaxytool_selected_rows--,
    1 < galaxytool_selected_rows)) {
        galaxytool_calculated_content();
        return
    }
    selected_key != d && (selected_key = d,
    data_grid = a.grid,
    galaxytool_load_content(d))
}
function galaxytool_load_content(a) {
    dojo.byId("summary_area").style.display = "none";
    var b;
    dojo.xhrGet({
        url: "ajax/ajax_combat_reports.php?type=content&id=" + a,
        handleAs: "json",
        load: function(a) {
            if (null != a.messages)
                showMessages(a.messages);
            else {
                try {
                    dojo.byId("details_area").style.display = "";
                    dojo.byId("details_area").style.visibility = "visible";
                    var c = ""
                      , e = ""
                      , g = ""
                      , f = ""
                      , k = Array(3)
                      , h = Array(3)
                      , m = 0
                      , n = 0
                      , l = null;
                    for (b = 0; b < a.attacker.length; b++)
                        "" != c && (c += "<br>",
                        g += ", "),
                        g += a.attacker[b].playername,
                        c += '<a class="link" href="playerinformation.php?id=' + a.attacker[b].playerid + '">' + a.attacker[b].playername + "</a>",
                        l = a.attacker[b].coords.split(":"),
                        c += ' [<a class="link" href="galaxyview.php?gala=' + l[0] + "&system=" + l[1] + '">' + a.attacker[b].coords + "</a>]",
                        k[0] = a.attacker[b].tech.w,
                        k[1] = a.attacker[b].tech.s,
                        k[2] = a.attacker[b].tech.a,
                        m = a.attacker[b].lost;
                    for (b = 0; b < a.defender.length; b++)
                        "" != e && (e += "<br>",
                        f += ", "),
                        f += a.defender[b].playername,
                        e += '<a class="link" href="playerinformation.php?id=' + a.defender[b].playerid + '">' + a.defender[b].playername + "</a>",
                        l = a.defender[b].coords.split(":"),
                        e += ' [<a class="link" href="galaxyview.php?gala=' + l[0] + "&system=" + l[1] + '">' + a.defender[b].coords + "</a>]",
                        h[0] = a.defender[b].tech.w,
                        h[1] = a.defender[b].tech.s,
                        h[2] = a.defender[b].tech.a,
                        n = a.defender[b].lost;
                    dojo.byId("attackername").innerHTML = c;
                    dojo.byId("defendername").innerHTML = e;
                    dojo.byId("combattime").innerHTML = a.combattime;
                    dojo.byId("att_lost_units").innerHTML = m;
                    dojo.byId("def_lost_units").innerHTML = n;
                    dojo.byId("att_weapon").innerHTML = k[0];
                    dojo.byId("att_shield").innerHTML = k[1];
                    dojo.byId("att_amour").innerHTML = k[2];
                    dojo.byId("def_weapon").innerHTML = h[0];
                    dojo.byId("def_shield").innerHTML = h[1];
                    dojo.byId("def_amour").innerHTML = h[2];
                    dojo.byId("loot_metal").innerHTML = a.loot.m;
                    dojo.byId("loot_crystal").innerHTML = a.loot.c;
                    dojo.byId("loot_deuterium").innerHTML = a.loot.d;
                    dojo.byId("debris_metal").innerHTML = a.debris.m;
                    dojo.byId("debris_crystal").innerHTML = a.debris.c;
                    dojo.byId("combat_coordinates").innerHTML = a.c_coords;
                    "attacker" == a.winner ? dojo.byId("winner_name").innerHTML = g : "defender" == a.winner ? dojo.byId("winner_name").innerHTML = f : dojo.byId("winner_name").innerHTML = "-"
                } catch (p) {
                    console.log("error:"),
                    console.log(p)
                }
                !0 == published_keys[selected_key] ? (dijit.byId("publish_button").set("disabled", !0),
                dijit.byId("publish_button").set("style", "display:none"),
                dijit.byId("unpublish_button").set("style", "display:inline-block"),
                dijit.byId("unpublish_button").set("disabled", !1),
                dijit.byId("delete_button").set("disabled", !1)) : "private" == published_keys[selected_key] ? (dijit.byId("publish_button").set("style", "display:inline-block"),
                dijit.byId("publish_button").set("disabled", !0),
                dijit.byId("unpublish_button").set("style", "display:none"),
                dijit.byId("unpublish_button").set("disabled", !0),
                dijit.byId("delete_button").set("disabled", !0)) : (dijit.byId("publish_button").set("style", "display:inline-block"),
                dijit.byId("publish_button").set("disabled", !1),
                dijit.byId("unpublish_button").set("style", "display:none"),
                dijit.byId("unpublish_button").set("disabled", !0),
                dijit.byId("delete_button").set("disabled", !1))
            }
        },
        error: function(a) {
            console.log("Error:");
            console.log(a)
        }
    })
}
function galaxytool_calculated_content() {
    dojo.byId("details_area").style.display = "none";
    dojo.byId("details_area").style.visibility = "hidden";
    dojo.byId("summary_area").style.display = "";
    dojo.byId("summary_area").style.visibility = "";
    for (var a = null, b = 0, d = 0, c = 0, e = 0, g = 0, f = 0; f < grid1.get("rowCount"); f++)
        a = grid1.getItem(f),
        null != a && "true" == store1.getValues(a, "selected") && (b += parseInt(store1.getValues(a, "loot_m")),
        d += parseInt(store1.getValues(a, "loot_c")),
        c += parseInt(store1.getValues(a, "loot_d")),
        e += parseInt(store1.getValues(a, "debris_m")),
        g += parseInt(store1.getValues(a, "debris_c")));
    dojo.byId("summary_loot_metal").innerHTML = NumberFormat(b);
    dojo.byId("summary_loot_crystal").innerHTML = NumberFormat(d);
    dojo.byId("summary_loot_deuterium").innerHTML = NumberFormat(c);
    dojo.byId("summary_debris_metal").innerHTML = NumberFormat(e);
    dojo.byId("summary_debris_crystal").innerHTML = NumberFormat(g)
}
function galaxytool_grid_formatter(a, b, d) {
    b = store1.getValues(grid1.getItem(b), "winner");
    "attacker" == d.field ? "attacker" == b ? d.customClasses.push("combat_winner") : "defender" == b && d.customClasses.push("combat_looser") : "attacker" == b ? d.customClasses.push("combat_looser") : "defender" == b && d.customClasses.push("combat_winner");
    return a
}
function handle_dojo_errors(a) {
    console.log("fetch error:");
    console.log(a)
}
function checkbox_selection(a) {
    for (var b = null, d = null, c = 0; c < grid1.get("rowCount"); c++)
        b = grid1.getItem(c),
        null != b && (0 == c && (d = store1.getValues(b, "id")),
        "true" == store1.getValues(b, "selected") ? !0 != a && (store1.setValues(b, "selected", !1),
        galaxytool_selected_rows--) : !0 == a && (store1.setValues(b, "selected", !0),
        galaxytool_selected_rows++));
    1 < galaxytool_selected_rows ? galaxytool_calculated_content() : 1 == galaxytool_selected_rows && galaxytool_load_content(d)
}
function galaxytool_reload_grid(a) {
    ignore_next_fetch = !0;
    store1.url = a;
    store1.revert();
    store1.close();
    ignore_next_fetch = !1;
    grid1.setStore(store1)
}
function galaxytool_publish_helper(a) {
    if ("publish" != a && "unpublish" != a && "delete" != a)
        return !1;
    for (var b = null, d = [], c = 0; c < grid1.get("rowCount"); c++)
        b = grid1.getItem(c),
        null != b && "true" == store1.getValues(b, "selected") && d.push(store1.getValues(b, "id"));
    if (!(1 > d.length)) {
        b = "";
        for (c = 0; c < d.length; c++)
            b += d[c],
            c < d.length - 1 && (b += "|");
        dojo.xhrPost({
            url: "ajax/ajax_combat_reports.php?type=" + a,
            content: {
                id: b
            },
            handleAs: "json",
            load: function(a) {
                null != a.messages ? showMessages(a.messages) : (grid1.selection.deselectAll(),
                galaxytool_reload_grid(store_url))
            },
            error: function(a) {
                console.log("Error:");
                console.log(a)
            }
        })
    }
}
function get_search_source_url(a) {
    var b = dojo.byId("attacker").value
      , d = dojo.byId("defender").value
      , c = dijit.byId("owner").get("value");
    try {
        var e = dojo.date.locale.format(dijit.byId("date_from").get("value"), {
            datePattern: "yyyy-MM-dd",
            selector: "date"
        })
    } catch (g) {
        e = ""
    }
    try {
        var f = dojo.date.locale.format(dijit.byId("date_to").get("value"), {
            datePattern: "yyyy-MM-dd",
            selector: "date"
        })
    } catch (k) {
        f = ""
    }
    var h = "undefined";
    !0 == dijit.byId("public_yes").get("checked") ? h = "true" : !0 == dijit.byId("public_no").get("checked") && (h = "false");
    var m = dijit.byId("coordinates").get("value");
    return !0 != galaxytool_coordinate_input(m, null) ? !1 : "ajax/ajax_combat_reports.php?type=" + a + "&attacker_name=" + escape(b) + "&defender_name=" + escape(d) + "&owner_id=" + (0 == c ? "" : c) + "&public_reports=" + h + "&date_from=" + e + "&date_to=" + f + "&coordinates=" + m
}
function galaxytool_search() {
    var a = get_search_source_url("search");
    galaxytool_reload_grid(a);
    store_url = a;
    dojo.byId("details_area").style.display = "none";
    dojo.byId("details_area").style.visibility = "hidden";
    dojo.byId("result_grid").style.visibility = ""
}
function galaxytool_cr_download() {
    var a = get_search_source_url("download");
    window.location.href = a
}
function galaxytool_reset() {
    dojo.byId("attacker").value = "";
    dojo.byId("defender").value = "";
    dijit.byId("owner").set("value", 0);
    dijit.byId("public_yes").set("checked", !1);
    dijit.byId("public_no").set("checked", !1);
    dojo.byId("date_from").value = "";
    dojo.byId("date_to").value = "";
    dojo.byId("coordinates").value = ""
}
function galaxytool_public_search(a) {
    !0 == dijit.byId(a).get("checked") && ("public_yes" == a ? dijit.byId("public_no").set("checked", !1) : dijit.byId("public_yes").set("checked", !1))
}
function galaxytool_publish_selected() {
    galaxytool_publish_helper("publish")
}
function galaxytool_unpublish_selected() {
    galaxytool_publish_helper("unpublish")
}
function galaxytool_delete_selected() {
    galaxytool_publish_helper("delete")
}
function galaxytool_delete_single() {
    dijit.byId("publish_button").set("disabled", !0);
    dijit.byId("unpublish_button").set("disabled", !0);
    dijit.byId("publish_button").set("style", "display: inline-block");
    dijit.byId("unpublish_button").set("style", "display: none");
    dijit.byId("delete_button").set("disabled", !0);
    dojo.xhrPost({
        url: "ajax/ajax_combat_reports.php?type=delete&id=" + selected_key,
        content: {
            id: selected_key
        },
        handleAs: "json",
        load: function(a) {
            null != a.messages ? showMessages(a.messages) : (a = grid1.selection.getSelected(),
            a.length && dojo.forEach(a, function(a) {
                null !== a && (store1.deleteItem(a),
                grid1.selection.addToSelection(0),
                a = grid1.store.getValue(grid1.selection.getFirstSelected(), "id"),
                null != a && selected_key != a && galaxytool_load_content(a))
            }))
        },
        error: function(a) {
            console.log("Error:");
            console.log(a)
        }
    })
}
function galaxytool_unpublish_single() {
    dijit.byId("unpublish_button").set("disabled", !0);
    dijit.byId("unpublish_button").set("style", "display:none");
    dijit.byId("publish_button").set("style", "display:inline-block");
    dijit.byId("publish_button").set("disabled", !1);
    dojo.xhrPost({
        url: "ajax/ajax_combat_reports.php?type=unpublish&id=" + selected_key,
        content: {
            id: selected_key
        },
        handleAs: "json",
        load: function(a) {
            null != a.messages ? showMessages(a.messages) : published_keys[selected_key] = null
        },
        error: function(a) {
            console.log("Error:");
            console.log(a)
        }
    })
}
function galaxytool_publish_single() {
    dijit.byId("publish_button").set("disabled", !0);
    dijit.byId("publish_button").set("style", "display:none");
    dijit.byId("unpublish_button").set("style", "display:inline-block");
    dijit.byId("unpublish_button").set("disabled", !1);
    dojo.xhrPost({
        url: "ajax/ajax_combat_reports.php?type=publish&id=" + selected_key,
        content: {
            id: selected_key
        },
        handleAs: "json",
        load: function(a) {
            null != a.messages ? showMessages(a.messages) : published_keys[selected_key] = !0
        },
        error: function(a) {
            console.log("Error:");
            console.log(a)
        }
    })
}
function galaxytool_grid_on_fetch_complete() {
    if (!0 == ignore_next_fetch)
        ignore_next_fetch = !1;
    else if (0 < grid1.get("rowCount")) {
        grid1.selection.addToSelection(0);
        var a = grid1.store.getValue(grid1.selection.getFirstSelected(), "id");
        null != a && selected_key != a && galaxytool_load_content(a);
        selected_key = a;
        for (a = 0; a < grid1.get("rowCount"); a++)
            null != grid1.getItem(a) && ("true" == store1.getValues(grid1.getItem(a), "public") ? store1.getValues(grid1.getItem(a), "userid") == galaxytool_userid ? published_keys[store1.getValues(grid1.getItem(a), "id")] = !0 : published_keys[store1.getValues(grid1.getItem(a), "id")] = "private" : published_keys[store1.getValues(grid1.getItem(a), "id")] = null)
    } else
        grid1.selection.deselectAll(),
        selected_key = null,
        dijit.byId("publish_button").set("style", "display:inline-block"),
        dijit.byId("publish_button").set("disabled", !0),
        dijit.byId("unpublish_button").set("disabled", !0),
        dijit.byId("unpublish_button").set("style", "display:none"),
        dijit.byId("delete_button").set("disabled", !0),
        dojo.byId("details_area").style.display = "none",
        dojo.byId("details_area").style.visibility = "hidden"
}
;
var selected_key = 0, data_grid = null, published_keys = [], filter_active = !1, filter = Array(3),
    current_filter_value = Array(3);

function galaxytool_messages_init() {
    dojo.connect(dijit.byId("grid1"), "_onFetchComplete", galaxytool_grid_on_fetch_complete);
    dojo.connect(dijit.byId("grid1"), "onCellDblClick", galaxytool_handle_cellDblClick);
    dojo.connect(dijit.byId("grid1"), "onRowClick", galaxytool_handleRowSelect);
    dojo.connect(dijit.byId("grid1"), "onFetchError", handle_dojo_errors);
    dojo.connect(dijit.byId("delete_button"), "onClick", galaxytool_delete_message);
    dojo.connect(dijit.byId("publish_button"), "onClick", galaxytool_publish_message);
    dojo.connect(dijit.byId("filter_button"), "onClick", galaxytool_filtericon_click);
    filter[0] = dijit.byId("filter_playername");
    filter[1] = dijit.byId("filter_subject");
    filter[2] = dijit.byId("filter_messagetime");
    for (var a = 0; 3 > a; a++) current_filter_value[a] = filter[a].get("value"), dojo.connect(filter[a], "onBlur", galaxytool_handle_filterchange), dojo.connect(filter[a], "onKeyPress", galaxytool_handle_filterchange)
}

dojo.ready(galaxytool_messages_init);

function galaxytool_filtericon_click() {
    if (!1 == filter_active) filter_active = !0, dojo.byId("filter_pane").style.display = "inline"; else {
        dojo.byId("filter_pane").style.display = "none";
        grid1.filter({playername: "*", subject: "*", messagetime: "*"});
        filter_active = !1;
        for (var a = 0; 3 > a; a++) current_filter_value[a] = "*", 0 == a ? filter[a].set("value", "*") : filter[a].set("value", "")
    }
}

function galaxytool_grid_on_fetch_complete() {
    if (0 < grid1.get("rowCount")) {
        grid1.selection.addToSelection(0);
        var a = grid1.store.getValue(grid1.selection.getFirstSelected(), "id");
        data_grid = grid1;
        null != a && selected_key != a && galaxytool_load_content(a);
        selected_key = a
    } else grid1.selection.deselectAll(), selected_key = null, dijit.byId("publish_button").set("disabled", !0), dijit.byId("delete_button").set("disabled", !0), dojo.byId("gridContentPane").innerHTML = ""
}

function galaxytool_publish_message() {
    dijit.byId("publish_button").set("disabled", !0);
    dojo.xhrPost({
        url: "ajax/ajax_messages.php?type=publish&id=" + selected_key, handleAs: "json", load: function (a) {
            null != a.messages ? showMessages(a.messages) : published_keys[selected_key] = !0
        }, error: function (a) {
            console.log("Error:");
            console.log(a)
        }
    })
}

function galaxytool_delete_message() {
    dijit.byId("publish_button").set("disabled", !0);
    dijit.byId("delete_button").set("disabled", !0);
    dojo.byId("gridContentPane").innerHTML = "";
    dojo.xhrPost({
        url: "ajax/ajax_messages.php?type=delete&id=" + selected_key, handleAs: "json", load: function (a) {
            null != a.messages ? showMessages(a.messages) : (a = data_grid.selection.getSelected(), a.length && dojo.forEach(a, function (a) {
                null !== a && store1.deleteItem(a)
            }))
        }, error: function (a) {
            console.log("Error:");
            console.log(a)
        }
    })
}

function galaxytool_handle_filterchange(a) {
    if (!(null != a && 13 != a.keyCode)) {
        a = !1;
        for (var b = 0; 3 > b; b++) filter[b].get("value") != current_filter_value[b] && !("" == filter[b].get("value") && "*" == current_filter_value[b]) && (a = !0);
        if (!1 != a) {
            for (b = 0; 3 > b; b++) current_filter_value[b] = filter[b].get("value"), "" == current_filter_value[b] && (current_filter_value[b] = "*");
            grid1.queryOptions = {ignoreCase: !0};
            grid1.filter({
                playername: current_filter_value[0],
                subject: current_filter_value[1],
                messagetime: current_filter_value[2]
            })
        }
    }
}

function galaxytool_handleRowSelect(a) {
    var b = a.grid.store.getValue(a.grid.getItem(a.rowIndex), "id");
    selected_key != b && (selected_key = b, data_grid = a.grid, galaxytool_load_content(b))
}

function galaxytool_handle_cellDblClick(a) {
    var b = a.rowIndex;
    if (null != b) {
        filter_active = !0;
        switch (a.cellIndex) {
            case 0:
                filter[0].set("value", grid1.store.getValue(grid1.getItem(b), "playername"));
                break;
            case 1:
                filter[1].set("value", grid1.store.getValue(grid1.getItem(b), "subject"));
                break;
            case 2:
                a = grid1.store.getValue(grid1.getItem(b), "messagetime"), a = a.substring(0, 10) + "*", filter[2].set("value", a)
        }
        dojo.byId("filter_pane").style.display = "inline";
        galaxytool_handle_filterchange()
    }
}

function galaxytool_load_content(a) {
    dojo.xhrPost({
        url: "ajax/ajax_messages.php?type=content&id=" + a, handleAs: "json", load: function (a) {
            null != a.messages ? showMessages(a.messages) : (dojo.byId("gridContentPane").innerHTML = a.result, null != published_keys[selected_key] ? dijit.byId("publish_button").set("disabled", !0) : dijit.byId("publish_button").set("disabled", !1), dijit.byId("delete_button").set("disabled", !1))
        }, error: function (a) {
            console.log("Error:");
            console.log(a)
        }
    })
}

function handle_dojo_errors(a) {
    console.log("fetch error:");
    console.log(a)
};

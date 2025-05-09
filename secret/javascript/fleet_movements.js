function show_all_fleets() {
    dijit.byId("fleet_movement_details").set("href", "ajax/ajax_fleetmove_all.php");
    window.location.hash = "#all"
}

function show_fleet_by_id(a) {
    dijit.byId("fleet_movement_details").set("href", "ajax/ajax_fleetmove_id.php?fleet_id=" + a);
    window.location.hash = "#id=" + a
}

function show_fleet_by_planet(a) {
    a = a.split(":");
    3 == a.length && (dijit.byId("fleet_movement_details").set("href", "ajax/ajax_fleetmove_all.php?galaxy=" + a[0] + "&system=" + a[1] + "&planet=" + a[2]), window.location.hash = "#id=" + id)
}

function deleteFleetMovement(a, b) {
    dojo.xhrPost({
        url: "ajax/ajax_fleet_movement.php?fleet_id=" + a + "&sub_fleet_id=" + b + "&action=delete",
        handleAs: "json",
        load: function(c) {
            null != c.messages ? showMessages(c.messages) : dojo.destroy("fleet_" + a + "_" + b)
        },
        error: function(a) {}
    })
}

function galaxytool_fm_init() {
    var a = window.location.hash; - 1 < a.indexOf("#id=") ? (a = a.replace(/#id=/, ""), show_fleet_by_id(a)) : -1 < a.indexOf("#planet=") ? (a = a.replace(/#planet=/, ""), show_fleet_by_planet(a)) : show_all_fleets()
}
dojo.ready(galaxytool_fm_init);
var galaxytool = window.galaxytool || {};
galaxytool.GalaxyView = {
    galaxytoolMoonCalcMouseOver: !1,
    loadSystem: function() {
        require(["dojo/dom", "dojo/request", "dijit/registry", "dojo/dom-style"], function(a, c, e, b) {
            var d = parseInt(a.byId("galaxy").value);
            1 > d && (d = 1);
            var f = parseInt(a.byId("system").value);
            1 > f && (f = 1);
            "" != e.byId("galaxy").get("state") || "" != e.byId("system").get("state") || (window.location.hash = "#select_" + (1E3 * d + f), a.byId("loading_icon").style.display = "", b.set(e.byId("go").domNode, {
                visibility: "hidden",
                display: "none"
            }), c.post("ajax/ajax_galaxyview.php?galaxy=" +
                d + "&system=" + f, {
                    handleAs: "json"
                }).then(function(c) {
                galaxytool.GalaxyView.showNewSystemData(c);
                b.set(e.byId("go").domNode, {
                    visibility: "visible",
                    display: "block"
                });
                a.byId("loading_icon").style.display = "none"
            }, function(a) {
                console.log("Error:");
                console.log(a)
            }), a.byId("messageArea").style.display = "none")
        })
    },
    showNewSystemData: function(a) {
        require(["dojo/dom", "dojo/i18n!./nls/galaxytool.js"], function(c, e) {
            for (var b = 1; 15 >= b; b++) galaxytool.GalaxyView.initilizeData(b);
            parseInt(c.byId("galaxy").value);
            parseInt(c.byId("system").value);
            var d;
            d = "" != a.last_update ? ' <div class="system_updated">' + a.username + " @ " + a.last_update + "</div>" : e.VIEW_NODATA;
            c.byId("galaxy_info").innerHTML = d;
			
			
			//unset progame spy link
			var positiontexts = document.querySelectorAll(".galaxyview_pos > div");

			for(var t = 0; t < positiontexts.length; t++){
				positiontexts[t].innerHTML = t+1;				
				
			}
			
            for (b = 0; b < a.planets.length; b++) galaxytool.GalaxyView.fillPosition(a.planets[b]);
            c.byId("colonies").innerHTML = a.planets.length;
            if (0 == a.phalanx.length) c.byId("phalanx").innerHTML = e.VIEW_NOMOONS;
            else {
                d = "";
                for (b = 0; b < a.phalanx.length; b++) {
                    var f = a.phalanx[b].g + ":" + a.phalanx[b].s + ":" + a.phalanx[b].p;
                    d += '<span class="hyperlink ' + a.phalanx[b].d + '" style="margin-left:10px;" onClick="galaxytool.ReportFetch.showReport(\'' +
                        f + "',true)\">" + f + "</span> "
                }
                c.byId("phalanx").innerHTML = '<div style="max-width: 640px;">' + d + "</div>"
            }
            if (0 == a.irak.length) c.byId("irak").innerHTML = e.VIEW_NOIRAKS;
            else {
                d = "";
                for (b = 0; b < a.irak.length; b++) f = a.irak[b].g + ":" + a.irak[b].s + ":" + a.irak[b].p, d += '<span class="hyperlink ' + a.irak[b].d + '" style="margin-left:10px;" onClick="galaxytool.ReportFetch.showReport(\'' + f + "',false)\">" + f + "</span> ";
                c.byId("irak").innerHTML = '<div style="max-width: 640px;">' + d + "</div>"
            }
        })
    },
    fillPosition: function(a) {
        require(["dojo/dom",
            "dijit/Tooltip", "dojo/i18n!./nls/galaxytool.js"
        ], function(c, e, b) {
            var d = a.pos,
                f = "nothing" != a.diplomatic_status ? "bg_" + a.diplomatic_status + " galaxyview_diplomatic_status_overlay centered_text" : "centered_text";
            c.byId("planetpos_" + d).className = f;
			
			
			document.querySelector("#planetpos_" + d).innerHTML = "<a href='https://pr0game.com/game.php?page=fleetTable&galaxy="+ a.galaxy +"&system="+ a.system +"&planet="+ a.pos +"&planettype=1&target_mission=6' target='_blank'>" + d + "</a>"			
			
            c.byId("planeticon_" + d).setAttribute("class", "planet");
            !0 == a.fleetmoves ? (f = '<img class="hyperlink" src="../images/spaceship_right.png" onclick="galaxytool.GalaxyView.showFleetMove(' + a.galaxy + "," + a.system + "," + d + ')" height="16" width="16" alt="fleet movement" style="vertical-align:bottom" />',
                c.byId("planetname_" + d).innerHTML = a.planetname + " " + f) : c.byId("planetname_" + d).innerHTML = a.planetname;
            0 < a.moonsize && (c.byId("moon_" + d).innerHTML = '<span id="moon_calc_' + d + '" style="cursor: pointer;" onMouseOver="galaxytool.GalaxyView.showMoonCalc(\'' + d + '\');"><img height="30" width="30" src="../images/OGame/moon.gif"></span><input id="moonsize_' + d + '" type="hidden" value="' + a.moonsize + '">');
            a.metal = parseInt(a.metal);
            a.crystal = parseInt(a.crystal);
            if (0 < a.metal || 0 < a.crystal) c.byId("debris_" + d).innerHTML =
                '<img height="30" width="30" src="../images/OGame/tf_a.gif">', f = "<div style=font-size:10pt;><div>" + b.SHOW_METAL_LONG + ": " + galaxytool.General.numberFormat(a.metal) + "</div><div>" + b.SHOW_CRYSTAL_LONG + ": " + galaxytool.General.numberFormat(a.crystal) + "</div><br>" + b.REPORTS_FOR_TF + ":<br>" + b.REPORTS_REC + ': <span id="recycler_' + d + '">' + galaxytool.General.numberFormat(Math.ceil((a.metal + a.crystal) / 2E4)) + "</span></div>", new e({
                    id: "debristooltip_" + d,
                    connectId: ["debris_" + d],
                    label: f
                });
            f = a.playername;
            if (null != a.playername) {
                var h =
                    0 < a.rank ? b.STATS_PLAYERSTATS : b.SHOW_NOTRANKED;
                "true" == a.banned && (a.rank = 0, a.erank = 0, a.frank = 0, a.rrank = 0, a.hrank = 0, a.mbrank = 0, a.mdrank = 0, a.mlrank = 0);
                var g = galaxytool.General.getPlayerStatusString(b, a.banned, a.vacation, a.noob, a.inactive, a.long_inactive, a.outlaw);
                "" != g && (g = "(" + g + ")");
                f = '<span class="' + galaxytool.General.getPlayerStatusClass(a.banned, a.vacation, a.noob, a.inactive, a.long_inactive, a.outlaw) + '">' + a.playername + "</span>";
                c.byId("player_" + d).innerHTML = '<a id="player_anchor_' + d + '" href="playerinformation.php?id=' +
                    escape(a.player_id) + '">' + f + '</a><span style="padding-left: 5px;">' + g + "</span>";
                f = '<div class="' + a.diplomatic_status + '" style="font-size:10pt;">' + h + "</div>";
                0 < a.rank && (f += "<div><table><tr><td>" + b.SHOW_RANK + ":</td><td>#" + a.rank + '</td><td style="padding-left: 5px;">' + b.STATS_SCORE + ":</td><td>" + galaxytool.General.numberFormat(a.points) + "</td></tr><tr><td>" + b.STATS_ECONOMY + ":</td><td>#" + a.erank + '</td><td style="padding-left: 5px;">' + b.STATS_SCORE + ":</td><td>" + galaxytool.General.numberFormat(a.epoints) +
                    "</td></tr><tr><td>" + b.STATS_MILITARY + ":</td><td>#" + a.frank + '</td><td style="padding-left: 5px;">' + b.STATS_SCORE + ":</td><td>" + galaxytool.General.numberFormat(a.fpoints) + "</td></tr><tr><td>" + b.STATS_RESEARCH + ":</td><td>#" + a.rrank + '</td><td style="padding-left: 5px;">' + b.STATS_SCORE + ":</td><td>" + galaxytool.General.numberFormat(a.rpoints) + "</td></tr><tr><td>" + b.STATS_HONOUR + ":</td><td>#" + a.hrank + '</td><td style="padding-left: 5px;">' + b.STATS_SCORE + ":</td><td>" + galaxytool.General.numberFormat(a.hpoints) +
                    "</td></tr><tr><td>" + b.STATS_MILITARY_BUILD + ":</td><td>#" + a.fbrank + '</td><td style="padding-left: 5px;">' + b.STATS_SCORE + ":</td><td>" + galaxytool.General.numberFormat(a.fbpoints) + "</td></tr><tr><td>" + b.STATS_MILITARY_DESTROYED + ":</td><td>#" + a.fdrank + '</td><td style="padding-left: 5px;">' + b.STATS_SCORE + ":</td><td>" + galaxytool.General.numberFormat(a.fdpoints) + "</td></tr><tr><td>" + b.STATS_MILITARY_LOST + ":</td><td>#" + a.flrank + '</td><td style="padding-left: 5px;">' + b.STATS_SCORE + ":</td><td>" + galaxytool.General.numberFormat(a.flpoints) +
                    "</td></tr></table><br>" + b.STATS_UPDATE + ": " + a.plastupdate + "</div>");
                new e({
                    id: "playertooltip_" + d,
                    connectId: ["player_anchor_" + d],
                    label: f
                })
            }
            null != a.allyname && (f = "nothing" != a.dipl_status ? 'class="' + a.dipl_status + '"' : "", f = '<a id="ally_anchor_' + d + '" href="allyinformation.php?id=' + escape(a.alliance_id) + '"><span ' + f + ">" + a.allyname + "</span></a>", c.byId("ally_" + d).innerHTML = f, f = '<div class="' + a.dipl_status + '" style= "font-size:10pt;">' + (0 < a.arank ? b.STATS_ALLYSTATS : b.SHOW_NOTRANKED) + "</div>", 0 < a.rank && (f +=
                    "<div><table><tr><td>" + b.STATS_MEMBERS + ':</td><td colspan="3">' + a.members + "</td></tr><tr><td>" + b.SHOW_RANK + ":</td><td>#" + a.arank + '</td><td style="padding-left: 5px;">' + b.STATS_SCORE + ":</td><td>" + galaxytool.General.numberFormat(a.apoints) + "</td><tr><td>" + b.STATS_ECONOMY + ":</td><td>#" + a.aerank + '</td><td style="padding-left: 5px;">' + b.STATS_SCORE + ":</td><td>" + galaxytool.General.numberFormat(a.aepoints) + "</td></tr><tr><td>" + b.STATS_MILITARY + ":</td><td>#" + a.afrank + '</td><td style="padding-left: 5px;">' +
                    b.STATS_SCORE + ":</td><td>" + galaxytool.General.numberFormat(a.afpoints) + "</td></tr><tr><td>" + b.STATS_RESEARCH + ":</td><td>#" + a.arrank + '</td><td style="padding-left: 5px;">' + b.STATS_SCORE + ":</td><td>" + galaxytool.General.numberFormat(a.arpoints) + "</td></tr><tr><td>" + b.STATS_HONOUR + ":</td><td>#" + a.ahrank + '</td><td style="padding-left: 5px;">' + b.STATS_SCORE + ":</td><td>" + galaxytool.General.numberFormat(a.ahpoints) + "</td></tr><tr><td>" + b.STATS_MILITARY_BUILD + ":</td><td>#" + a.afbrank + '</td><td style="padding-left: 5px;">' +
                    b.STATS_SCORE + ":</td><td>" + galaxytool.General.numberFormat(a.afbpoints) + "</td></tr><tr><td>" + b.STATS_MILITARY_DESTROYED + ":</td><td>#" + a.afdrank + '</td><td style="padding-left: 5px;">' + b.STATS_SCORE + ":</td><td>" + galaxytool.General.numberFormat(a.afdpoints) + "</td></tr><tr><td>" + b.STATS_MILITARY_LOST + ":</td><td>#" + a.aflrank + '</td><td style="padding-left: 5px;">' + b.STATS_SCORE + ":</td><td>" + galaxytool.General.numberFormat(a.aflpoints) + "</td></tr></table><br>" + b.STATS_UPDATE + ": " + a.alastupdate + "</div>"),
                new e({
                    id: "allytooltip_" + d,
                    connectId: ["ally_anchor_" + d],
                    label: f
                }));
            f = null != a.notice_id ? '<img class="hyperlink" onClick="galaxytool.GalaxyView.showNoticeContent(' + a.player_id + ')" src="../images/notice.gif" width="15" height="17" alt="notice" border="0">' : '<img class="hyperlink" onClick="galaxytool.GalaxyView.createNoticeContent(' + a.player_id + ')" src="../images/no_notice.gif" width="15" height="17" alt="notice" border="0">';
            c.byId("notice_" + d).innerHTML = f;
            b = a.galaxy + ":" + a.system + ":" + d;
            e = !0 == a.planet_report ?
                '<a href="report.php?coordinates=' + b + '&amp;moon=false" onClick="galaxytool.ReportFetch.showReport(\'' + b + "',false); return false;\" onmouseover=\"galaxytool.ReportFetch.showReport('" + b + '\',false,undefined,true); galaxytool.ReportFetch.reportTooltipMouseOver();" onmouseout="galaxytool.ReportFetch.reportTooltipMouseLeave(); setTimeout(galaxytool.ReportFetch.closeReportTooltipIfNotUsed, 750)"><img src="../images/spio.gif" width="15" height="17" alt="combat report" border="0"></a>' : "";
            b = !0 == a.moon_report ?
                '<a href="report.php?coordinates=' + b + '&amp;moon=true" onClick="galaxytool.ReportFetch.showReport(\'' + b + "',true); return false;\" onmouseover=\"galaxytool.ReportFetch.showReport('" + b + '\',true,undefined,true); galaxytool.ReportFetch.reportTooltipMouseOver();" onmouseout="galaxytool.ReportFetch.reportTooltipMouseLeave(); setTimeout(galaxytool.ReportFetch.closeReportTooltipIfNotUsed, 750)"><img src="../images/spio.gif" width="15" height="17" alt="combat report" border="0"></a>' : "";
            c.byId("reports1_" +
                d).innerHTML = e;
            c.byId("reports2_" + d).innerHTML = b
        })
    },
    initilizeData: function(a) {
        require(["dojo/dom", "dijit/registry", "dojo/dom-construct"], function(c, e, b) {
            c.byId("planetpos_" + a).className = "centered_text";
            var d = e.byId("playertooltip_" + a);
            d && d.destroy();
            (d = e.byId("allytooltip_" + a)) && d.destroy();
            (d = e.byId("debristooltip_" + a)) && d.destroy();
            c.byId("planeticon_" + a).setAttribute("class", "no_planet");
            c = "planetname_ moon_ debris_ player_ ally_ notice_ reports1_ reports2_".split(" ");
            for (e = 0; e < c.length; e++) b.empty(c[e].toString() +
                a.toString())
        })
    },
    galaDown: function() {
        require(["dojo/dom", "dijit/registry"], function(a, c) {
            var e = parseInt(a.byId("galaxy").value) - 1;
            1 > e && (e = 1);
            a.byId("galaxy").value = e;
            c.byId("galaxy").validate();
            galaxytool.GalaxyView.loadSystem()
        })
    },
    galaUp: function() {
        require(["dojo/dom", "dijit/registry"], function(a, c) {
            a.byId("galaxy").value = parseInt(a.byId("galaxy").value) + 1;
            c.byId("galaxy").validate();
            galaxytool.GalaxyView.loadSystem()
        })
    },
    systemDown: function() {
        require(["dojo/dom", "dijit/registry"], function(a, c) {
            var e =
                parseInt(a.byId("system").value) - 1;
            1 > e && (e = 1);
            a.byId("system").value = e;
            c.byId("system").validate();
            galaxytool.GalaxyView.loadSystem()
        })
    },
    systemUp: function() {
        require(["dojo/dom", "dijit/registry"], function(a, c) {
            a.byId("system").value = parseInt(a.byId("system").value) + 1;
            c.byId("system").validate();
            galaxytool.GalaxyView.loadSystem()
        })
    },
    cursorEvent: function(a) {
        37 == a.keyCode && galaxytool.GalaxyView.systemDown();
        39 == a.keyCode && galaxytool.GalaxyView.systemUp();
        38 == a.keyCode && galaxytool.GalaxyView.galaUp();
        40 == a.keyCode && galaxytool.GalaxyView.galaDown();
        13 == a.keyCode && galaxytool.GalaxyView.loadSystem()
    },
    showFleetMove: function(a, c, e) {
        require(["dojo/dom", "dijit/registry"], function(b, d) {
            b.byId("messageArea").style.display = "none";
            d.byId("FleetDialogContent").set("href", "ajax/ajax_fleetmove_all.php?galaxy=" + a + "&system=" + c + "&planet=" + e);
            d.byId("FleetDialog").show()
        })
    },
    showNoticeContent: function(a) {
        require(["dojo/dom", "dijit/registry"], function(c, e) {
            c.byId("messageArea").style.display = "none";
            e.byId("NoticeDialogContent").set("href",
                "ajax/ajax_notices_read.php?playerid=" + a);
            c.byId("NoticeDialogEdit").setAttribute("onclick", "galaxytool.GalaxyView.editNoticeContent(" + a + ")");
            c.byId("NoticeDialogEdit").style.display = "";
            e.byId("NoticeDialog").show()
        })
    },
    editNoticeContent: function(a) {
        require(["dojo/dom", "dijit/registry"], function(c, e) {
            e.byId("NoticeDialogContent").set("href", "ajax/ajax_notices_edit.php?playerid=" + a + "&dialog=NoticeDialog&refresh=");
            c.byId("NoticeDialogEdit").style.display = "none"
        })
    },
    createNoticeContent: function(a) {
        require(["dojo/dom",
            "dijit/registry"
        ], function(c, e) {
            c.byId("messageArea").style.display = "none";
            e.byId("NoticeDialogContent").set("href", "ajax/ajax_notices_edit.php?playerid=" + a + "&dialog=NoticeDialog&refresh=");
            c.byId("NoticeDialogEdit").style.display = "none";
            e.byId("NoticeDialog").show()
        })
    },
    getMoonDestructionChance: function(a, c) {
        var e = (100 - Math.sqrt(a)) * Math.sqrt(c);
        return e = Math.round(100 * e) / 100
    },
    changeMoonDestChance: function() {
        require(["dojo/dom", "dijit/registry"], function(a, c) {
            var e = parseInt(a.byId("moonsize").value);
            if (!(isNaN(e) || 1 > e)) {
                var b = parseInt(c.byId("death_stars").get("value"));
                isNaN(b) || 1 > b || (a.byId("moon_chance_n").innerHTML = galaxytool.GalaxyView.getMoonDestructionChance(e, b))
            }
        })
    },
    moonCalcClose: function(a) {
        require(["dijit/registry", "dijit/popup"], function(a, e) {
            e.close(a.byId("moontooltip"));
            galaxytool.GalaxyView.galaxytoolMoonCalcMouseOver = !1
        })
    },
    closeMoonCalcIfNotUsed: function() {
        require(["dijit/registry", "dijit/popup"], function(a, c) {
            !1 == galaxytool.GalaxyView.galaxytoolMoonCalcMouseOver && c.close(a.byId("moontooltip"))
        })
    },
    showMoonCalc: function(a) {
        require(["dojo/dom", "dijit/registry"], function(c, e) {
            c.byId("messageArea").style.display = "none";
            var b = parseInt(c.byId("moonsize_" + a).value);
            isNaN(b) || 1 > b || (c.byId("moonsize").value = b, c.byId("moonsize_display").innerHTML = galaxytool.General.numberFormat(b), c.byId("moon_chance_1").innerHTML = galaxytool.GalaxyView.getMoonDestructionChance(b, 1), c.byId("moon_ds_lost").innerHTML = Math.round(Math.sqrt(b) / 2, 2), c.byId("moon_chance_n").innerHTML = galaxytool.GalaxyView.getMoonDestructionChance(b,
                c.byId("death_stars").value), dijit.popup.open({
                popup: e.byId("moontooltip"),
                around: c.byId("moon_calc_" + a)
            }), window.setTimeout(galaxytool.GalaxyView.closeMoonCalcIfNotUsed, 2E3))
        })
    },
    moonCalculatorMouseOver: function(a) {
        galaxytool.GalaxyView.galaxytoolMoonCalcMouseOver = !0
    }
};
galaxytool.Notices.onNoticeSaveFunctions.change_icon = function(a, c) {
    require(["dojo/dom"], function(a) {
        try {
            for (var b = 1; 15 >= b; b++) 0 < a.byId("notice_" + b).innerHTML.indexOf("NoticeContent(" + c + ")") && (a.byId("notice_" + b).innerHTML = '<img class="hyperlink" onClick="galaxytool.GalaxyView.showNoticeContent(' + c + ')" src="../images/notice.gif" alt="notice" border="0">')
        } catch (d) {
            console.log(d)
        }
    })
};
galaxytool.Notices.onNoticeSaveFunctionNames.push("change_icon");
require("dojo/parser dojo/ready dojo/on dojo/dom dijit/registry dojo/NodeList-dom dijit/Dialog dijit/TooltipDialog dijit/layout/ContentPane dijit/layout/BorderContainer dijit/form/Button dijit/form/NumberTextBox dijit/form/Select dijit/form/Textarea".split(" "), function(a, c, e, b, d, f) {
    c(function() {
        e(d.byId("moontooltip"), "MouseLeave", galaxytool.GalaxyView.moonCalcClose);
        e(d.byId("moontooltip"), "MouseOver", galaxytool.GalaxyView.moonCalculatorMouseOver);
        e(d.byId("reporttooltip"), "MouseLeave", galaxytool.ReportFetch.closeReportTooltip);
        e(d.byId("reporttooltip"), "MouseOver", galaxytool.ReportFetch.reportTooltipMouseOver);
        var a = window.location.hash;
        if ("" != a) {
            a = a.replace(/#select_/, "");
            try {
                if (a = parseInt(a), 1001 < a) {
                    var b = Math.floor(a / 1E3),
                        a = a - 1E3 * b;
                    if (parseInt(d.byId("galaxy").get("value")) != b || parseInt(d.byId("system").get("value")) != a) d.byId("galaxy").set("value", b), d.byId("system").set("value", a), galaxytool.GalaxyView.loadSystem()
                }
            } catch (c) {}
        }
    })
});
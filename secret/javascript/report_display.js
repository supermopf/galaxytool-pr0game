var galaxytool = window.galaxytool || {};
galaxytool.report_display = galaxytool.report_display || {};
galaxytool.report_display = {
    report_dialog_close_connector: null,
    report_inline: !1,
    GalaxytoolReportTooltipMouseOver: !1,
    display: function(a, d, c, g, b, m, k, h, p, r, w, q) {
        if (!(!0 != r && !1 != r)) {
            var e;
            e = '<div align="center"><table cellpadding="1" cellspacing="0" border="0" style="width:700px;"><tr class="header"><td colspan="4">';
            e += a;
            "" != d && (e += " " + d);
            a = c.split(":");
            e += ' <a href="' + ("galaxyview.php?gala=" + a[0] + "&system=" + a[1]) + '">[' + c + "]</a> ";
            "" != g && (e += " (" + g + ") ");
            e += b + " " + h.scantime[0];
            !1 == galaxytool.report_display.report_inline &&
                !1 == r && (e += " ", e += '<a href="report.php?coordinates=' + c + "&moon=" + p + '" target="_blank" style="float:right">', e += '<img src="../images/new_tab.png" border="0" alt="' + galaxytool_open_in_new_window_text + '" title="' + galaxytool_open_in_new_window_text + '"></a></img>');
            e += "</td></tr>";
            g = this.start_speedsim_link(galaxytool_def_to_debris, galaxytool_debris_rate, galaxytool_techs, galaxytool_language);
            b = this.start_dragosim_link(galaxytool_def_to_debris, galaxytool_debris_rate, galaxytool_techs, galaxytool_language);
            g = this.update_speedsim_link(g, "coordinates", c);
            b = this.update_dragosim_link(b, "coordinates", c, !1, 0);
            d = 0;
            var l = !1,
                s = 0,
                t = 0,
                f;
            for (f in h)
                if (!("id" == f || "msg_id" == f || "res_sum" == f || "fleet_sum" == f || "def_sum" == f || "scantime" == f || "planetname" == f || "playername" == f || "bandit" == f || "details" == f || "username" == f))
                    if ("h1" == f || "h2" == f || "h3" == f || "h4" == f || "h5" == f) !0 == l && (e += '<td colspan="2">&nbsp;</td>', e += "</tr>"), e += '<tr class="header ' + ("ok" == h[f][0] ? "truespio" : "falsespio") + '"><td colspan="4">' + h[f][1] + "</td></tr>", d =
                        0;
                    else {
                        if ("kt" == f || "gt" == f || "lj" == f || "sj" == f || "krz" == f || "ss" == f || "kolo" == f || "rec" == f || "bomb" == f || "zerri" == f || "ds" == f || "skrz" == f) 0 < h[f][0] && (s += this.get_cargo_capacity(f) * h[f][0]);
                        if ("metal" == f || "crystal" == f || "deuterium" == f) t += parseInt(h[f][0]);
                        var u = h[f][0];
                        if (!isNaN(parseFloat(h[f][0])) && isFinite(h[f][0])) {
                            if (0 == h[f][0] && "metal" != f && "crystal" != f && "deuterium" != f && "energy" != f) continue;
                            g = this.update_speedsim_link(g, f, h[f][0]);
                            b = this.update_dragosim_link(b, f, h[f][0], !0, 0)
                        }
                        var n = "";
                        if ("metal" == f || "crystal" ==
                            f || "deuterium" == f) {
                            l = null;
                            switch (f) {
                                case "metal":
                                    l = "mesp";
                                    break;
                                case "crystal":
                                    l = "krissp";
                                    break;
                                case "deuterium":
                                    l = "deutsp"
                            }
                            var v = 0;
                            try {
                                v = h[l][0]
                            } catch (x) {
                                alert(x)
                            }
                            "ok" == h.h4[0] && !p && (l = this.get_storage_capacity(v), l <= u ? n = 'class="traffic_light_red"' : 0.9 * l <= u && (n = 'class="traffic_light_yellow"'))
                        }
                        0 == d % 2 ? (l = !0, e += "<tr>", e += '<td style="padding-left:20px;">' + h[f][1] + '</td><td style="padding-left:10px; padding-right:20px;" ' + n + ">" + NumberFormat(h[f][0]) + "</td>") : (l = !1, e += '<td style="padding-left:20px;">' +
                            h[f][1] + '</td><td style="padding-left:10px; padding-right:20px;" ' + n + ">" + NumberFormat(h[f][0]) + "</td>", e += "</tr>");
                        d++
                    }! 0 == l && (e += '<td colspan="2">&nbsp;</td>', e += "</tr>");
            "" != k && null !== k && (e += '<tr class="header"><td colspan="4">' + m + " " + k + "</td></tr>");
            e += '<tr class="header"><td colspan="2"><a target="speedsim" href="' + g + '">' + galaxytool_speedsim_text + "</a></td>";
            e += '<td colspan="2"><a target="dragosim" href="' + b + '">' + galaxytool_dragosim_text + "</a></tr>";
            e += '<tr><td colspan="2" style="padding-left:20px;">' +
                q + "</td>";
            e += '<td style="padding-left:20px;" colspan="2">' + NumberFormat(t) + "</tr>";
            "ok" == h.h2[0] && (n = s < h.res_sum[0] ? 'class="traffic_light_red"' : "", e += '<tr><td colspan="2" style="padding-left:20px;">' + galaxytool_cargo_capacity_text + "</td>", e += '<td style="padding-left:20px;" colspan="2" ' + n + ">" + NumberFormat(s) + "</tr>");
            "ok" == h.h4[0] && (!0 == p && 0 < h.sensor[0]) && (e += '<tr><td colspan="2" style="padding-left:20px;">' + galaxytool_phalanx_text + "</td>", m = parseInt(a[1]) - (Math.pow(h.sensor[0], 2) - 1), 0 > m && (m = 1), k =
                parseInt(a[1]) + (Math.pow(h.sensor[0], 2) - 1), 499 < k && (k = 499), q = "galaxyview.php?gala=" + a[0] + "&system=" + m, f = "galaxyview.php?gala=" + a[0] + "&system=" + k, e += '<td style="padding-left:20px;" colspan="2"><a href="' + q + '">' + a[0] + ":" + m + "</a>", e += ' - <a href="' + f + '">' + a[0] + ":" + k + "</a></tr>");
            "ok" == h.h5[0] && (0 < h.impulse[0] && !1 == p && 3 < h.raksilo[0]) && (e += '<tr><td colspan="2" style="padding-left:20px;">' + galaxytool_irak_text + "</td>", m = parseInt(a[1]) - (5 * h.impulse[0] - 1), 0 > m && (m = 1), k = parseInt(a[1]) + (5 * h.impulse[0] - 1), 499 <
                k && (k = 499), q = "galaxyview.php?gala=" + a[0] + "&system=" + m, f = "galaxyview.php?gala=" + a[0] + "&system=" + k, e += '<td style="padding-left:20px;" colspan="2"><a href="' + q + '">' + a[0] + ":" + m + "</a>", e += ' - <a href="' + f + '">' + a[0] + ":" + k + "</a></tr>");
            !1 == r && (e += '<tr class="header"><td colspan="4"><a href="report_archive.php?coordinates=' + c + "&moon=" + p + '">' + w + "</a></td></tr>");
            return e += "</table></div>"
        }
    },
    addReportClickAndCloseListener: function() {
        if (null == this.report_dialog_close_connector) {
            var a = dojo.byId("ReportDialog_underlay");
            this.report_dialog_close_connector = dojo.connect(a, "onclick", null, this.hideReport)
        }
    },
    hideReport: function(a) {
        dijit.byId("ReportDialog").hide();
        dojo.disconnect(this.report_dialog_close_connector);
        this.report_dialog_close_connector = null
    },
    start_speedsim_link: function(a, d, c, g) {
        var b = "http://websim.speedsim.net/?",
            b = (!0 == a ? b + "def_to_df=1&amp;" : b + "def_to_df=0&amp;") + ("perc-df=" + d + "&amp;");
        "object" == typeof c && (0 < c.vbt && (b += "engine0_0=" + c.vbt + "&amp;"), 0 < c.impulse && (b += "engine0_1=" + c.impulse + "&amp;"), 0 < c.hra &&
            (b += "engine0_2=" + c.hra + "&amp;"), 0 < c.waffentech && (b += "tech_a0_0=" + c.waffentech + "&amp;"), 0 < c.schildtech && (b += "tech_a0_1=" + c.schildtech + "&amp;"), 0 < c.rpz && (b += "tech_a0_2=" + c.rpz + "&amp;"));
        switch (g) {
            case "german":
                b += "lang=de&amp;";
                break;
            case "polish":
                b += "lang=pl&amp;";
                break;
            case "english":
                b += "lang=en&amp;";
                break;
            case "spanish":
                b += "lang=sp&amp;";
                break;
            case "dutch":
                b += "lang=nl&amp;";
                break;
            case "balkan":
                b += "lang=ba&amp;";
                break;
            case "french":
                b += "lang=fr&amp;";
                break;
            case "portugues":
                b += "lang=pt&amp;";
                break;
            case "italian":
                b += "lang=it&amp;";
                break;
            case "turkish":
                break;
            case "danish":
                b += "lang=dk&amp;";
                break;
            case "brazilian":
                b += "lang=pt&amp;";
                break;
            case "russian":
                b += "lang=ru&amp;";
                break;
            case "swedish":
                b += "lang=sv&amp;";
                break;
            case "greek":
                b += "lang=gr&amp;";
                break;
            case "romanian":
                b += "lang=ro&amp;";
                break;
            case "hungarian":
                b += "lang=hu&amp;";
                break;
            case "czech":
                b += "lang=cz&amp;";
                break;
            case "korean":
                b += "lang=kr&amp;";
                break;
            case "norwegian":
                b += "lang=no&amp;";
                break;
            case "taiwan":
                b += "lang=tw&amp;";
                break;
            case "japan":
                b +=
                    "lang=ja&amp;";
                break;
            case "chinese":
                b += "lang=cn&amp;";
                break;
            case "bulgarian":
                b += "lang=bg&amp;";
                break;
            case "lithuanian":
                b += "lang=lt&amp;";
                break;
            case "latvian":
                b += "lang=lv&amp;";
                break;
            case "finnish":
                b += "lang=fi&amp;";
                break;
            case "slovak":
                b += "lang=sk&amp;";
                break;
            case "croatian":
                b += "lang=ba&amp;";
                break;
            case "serbian":
                break;
            case "slovenian":
                b += "lang=si&amp;";
                break;
            default:
                b += "lang=en&amp;"
        }
        return b
    },
    update_speedsim_link: function(a, d, c) {
        if ("" == a) return console.log("invalid method call - empty link provided"),
            !1;
        if (0 < c || "coordinates" == d || "enemy_name" == d) switch (d) {
            case "coordinates":
                a += "enemy_pos=" + c + "&amp;";
                break;
            case "enemy_name":
                a += "enemy_name=" + c + "&amp;";
                break;
            case "metal":
                a += "enemy_metal=" + c + "&amp;";
                break;
            case "crystal":
                a += "enemy_crystal=" + c + "&amp;";
                break;
            case "deuterium":
                a += "enemy_deut=" + c + "&amp;";
                break;
            case "kt":
                a += "ship_d0_0_b=" + c + "&amp;";
                break;
            case "gt":
                a += "ship_d0_1_b=" + c + "&amp;";
                break;
            case "lj":
                a += "ship_d0_2_b=" + c + "&amp;";
                break;
            case "sj":
                a += "ship_d0_3_b=" + c + "&amp;";
                break;
            case "krz":
                a += "ship_d0_4_b=" +
                    c + "&amp;";
                break;
            case "ss":
                a += "ship_d0_5_b=" + c + "&amp;";
                break;
            case "kolo":
                a += "ship_d0_6_b=" + c + "&amp;";
                break;
            case "rec":
                a += "ship_d0_7_b=" + c + "&amp;";
                break;
            case "spio":
                a += "ship_d0_8_b=" + c + "&amp;";
                break;
            case "bomb":
                a += "ship_d0_9_b=" + c + "&amp;";
                break;
            case "sat":
                a += "ship_d0_10_b=" + c + "&amp;";
                break;
            case "zerri":
                a += "ship_d0_11_b=" + c + "&amp;";
                break;
            case "ds":
                a += "ship_d0_12_b=" + c + "&amp;";
                break;
            case "skrz":
                a += "ship_d0_13_b=" + c + "&amp;";
                break;
            case "rak":
                a += "ship_d0_14_b=" + c + "&amp;";
                break;
            case "ll":
                a += "ship_d0_15_b=" +
                    c + "&amp;";
                break;
            case "sl":
                a += "ship_d0_16_b=" + c + "&amp;";
                break;
            case "gauss":
                a += "ship_d0_17_b=" + c + "&amp;";
                break;
            case "ion":
                a += "ship_d0_18_b=" + c + "&amp;";
                break;
            case "plasma":
                a += "ship_d0_19_b=" + c + "&amp;";
                break;
            case "ksk":
                a += "ship_d0_20_b=" + c + "&amp;";
                break;
            case "gsk":
                a += "ship_d0_21_b=" + c + "&amp;";
                break;
            case "waffentech":
                a += "tech_d0_0=" + c + "&amp;";
                break;
            case "schildtech":
                a += "tech_d0_1=" + c + "&amp;";
                break;
            case "rpz":
                a += "tech_d0_2=" + c + "&amp;";
                break;
            case "arak":
                a += "abm_b=" + c + "&amp;";
                break;
            case "irak":
                a += "ipm_b=" +
                    c + "&amp;"
        }
        return a
    },
    start_dragosim_link: function(a, d, c, g) {
        d = "http://drago-sim.com/?referrer=galaxytool&amp;" + ("debris_ratio=" + d / 100 + "&amp;");
        !0 == a && (d += "def_tf=0&amp;");
        "object" == typeof c && (0 < c.waffentech && (d += "techs[0][0][w_t]=" + c.waffentech + "&amp;"), 0 < c.schildtech && (d += "techs[0][0][s_t]=" + c.schildtech + "&amp;"), 0 < c.rpz && (d += "techs[0][0][r_p]=" + c.rpz + "&amp;"));
        switch (g) {
            case "german":
                d += "lang=german&amp;";
                break;
            case "polish":
                d += "lang=polish&amp;";
                break;
            case "english":
                d += "lang=english&amp;";
                break;
            case "spanish":
                d += "lang=spanish&amp;";
                break;
            case "dutch":
                d += "lang=dutch&amp;";
                break;
            case "balkan":
                d += "lang=bosnian&amp;";
                break;
            case "french":
                d += "lang=french&amp;";
                break;
            case "portugues":
                d += "lang=portuguese&amp;";
                break;
            case "italian":
                d += "lang=italian&amp;";
                break;
            case "turkish":
                d += "lang=turkish&amp;";
                break;
            case "danish":
                d += "lang=danish&amp;";
                break;
            case "brazilian":
                d += "lang=brazilian&amp;";
                break;
            case "russian":
                d += "lang=russian&amp;";
                break;
            case "swedish":
                d += "lang=swedish&amp;";
                break;
            case "greek":
                d += "lang=greek&amp;";
                break;
            case "romanian":
                d += "lang=romanian&amp;";
                break;
            case "hungarian":
                d += "lang=hungarian&amp;";
                break;
            case "czech":
                d += "lang=czech&amp;";
                break;
            case "korean":
                d += "lang=korean&amp;";
                break;
            case "norwegian":
                break;
            case "taiwan":
                d += "lang=taiwanese&amp;";
                break;
            case "japan":
                break;
            case "chinese":
                break;
            case "bulgarian":
                d += "lang=bulgarian&amp;";
                break;
            case "lithuanian":
                break;
            case "latvian":
                break;
            case "finnish":
                break;
            case "slovak":
                d += "lang=slovak&amp;";
                break;
            case "croatian":
                d += "lang=bosnian&amp;";
                break;
            case "serbian":
                break;
            case "slovenian":
                break;
            default:
                d += "lang=english&amp;"
        }
        return d
    },
    update_dragosim_link: function(a, d, c, g, b) {
        if ("" == a) return console.log("invalid method call - empty link provided"), !1;
        g = !0 == g ? 1 : 0;
        b = parseInt(b);
        switch (d) {
            case "coordinates":
                a += "v_coords=" + c + "&amp;";
                break;
            case "enemy_name":
                a += "v_planet=" + c + "&amp;";
                break;
            case "metal":
                a += "v_met=" + c + "&amp;";
                break;
            case "crystal":
                a += "v_kris=" + c + "&amp;";
                break;
            case "deuterium":
                a += "v_deut=" + c + "&amp;";
                break;
            case "kt":
                a += "numunits[" + g + "][" + b + "][k_t]=" + c + "&amp;";
                break;
            case "gt":
                a += "numunits[" + g + "][" + b + "][g_t]=" + c + "&amp;";
                break;
            case "lj":
                a += "numunits[" + g + "][" + b + "][l_j]=" + c + "&amp;";
                break;
            case "sj":
                a += "numunits[" + g + "][" + b + "][s_j]=" + c + "&amp;";
                break;
            case "krz":
                a += "numunits[" + g + "][" + b + "][kr]=" + c + "&amp;";
                break;
            case "ss":
                a += "numunits[" + g + "][" + b + "][sc]=" + c + "&amp;";
                break;
            case "kolo":
                a += "numunits[" + g + "][" + b + "][ko]=" + c + "&amp;";
                break;
            case "rec":
                a += "numunits[" + g + "][" + b + "][re]=" + c + "&amp;";
                break;
            case "spio":
                a += "numunits[" + g + "][" + b + "][sp]=" + c + "&amp;";
                break;
            case "bomb":
                a +=
                    "numunits[" + g + "][" + b + "][bo]=" + c + "&amp;";
                break;
            case "sat":
                a += "numunits[" + g + "][" + b + "][so]=" + c + "&amp;";
                break;
            case "zerri":
                a += "numunits[" + g + "][" + b + "][z]=" + c + "&amp;";
                break;
            case "ds":
                a += "numunits[" + g + "][" + b + "][t]=" + c + "&amp;";
                break;
            case "skrz":
                a += "numunits[" + g + "][" + b + "][sk]=" + c + "&amp;";
                break;
            case "rak":
                a += "numunits[" + g + "][" + b + "][ra]=" + c + "&amp;";
                break;
            case "ll":
                a += "numunits[" + g + "][" + b + "][l_l]=" + c + "&amp;";
                break;
            case "sl":
                a += "numunits[" + g + "][" + b + "][s_l]=" + c + "&amp;";
                break;
            case "gauss":
                a += "numunits[" + g + "][" +
                    b + "][g]=" + c + "&amp;";
                break;
            case "ion":
                a += "numunits[" + g + "][" + b + "][i]=" + c + "&amp;";
                break;
            case "plasma":
                a += "numunits[" + g + "][" + b + "][p]=" + c + "&amp;";
                break;
            case "ksk":
                a += "numunits[" + g + "][" + b + "][k_s]=" + c + "&amp;";
                break;
            case "gsk":
                a += "numunits[" + g + "][" + b + "][g_s]=" + c + "&amp;";
                break;
            case "waffentech":
                a += "techs[1][0][w_t]=" + c + "&amp;";
                break;
            case "schildtech":
                a += "techs[1][0][s_t]=" + c + "&amp;";
                break;
            case "rpz":
                a += "techs[1][0][r_p]=" + c + "&amp;";
                break;
            case "arak":
                a += "missiles_available_v=" + c + "&amp;";
                break;
            case "irak":
                a +=
                    "missiles_available_a=" + c + "&amp;"
        }
        return a
    },
    get_storage_capacity: function(a) {
        return 5E3 * Math.floor(2.5 * Math.pow(Math.E, 20 * a / 33))
    },
    get_cargo_capacity: function(a) {
        switch (a) {
            case "kt":
                return 5E3;
            case "gt":
                return 25E3;
            case "lj":
                return 50;
            case "sj":
                return 100;
            case "krz":
                return 800;
            case "ss":
                return 1500;
            case "kolo":
                return 7500;
            case "rec":
                return 2E4;
            case "spio":
                return 0;
            case "bomb":
                return 500;
            case "zerri":
                return 2E3;
            case "ds":
                return 1E6;
            case "skrz":
                return 750;
            default:
                alert("unknown ship key")
        }
    },
    CloseReportTooltipIfNotUsed: function() {
        !1 ==
            galaxytool.report_display.GalaxytoolReportTooltipMouseOver && dijit.popup.close(dijit.byId("reporttooltip"))
    },
    CloseReportTooltip: function() {
        dijit.popup.close(dijit.byId("reporttooltip"));
        galaxytool.report_display.GalaxytoolReportTooltipMouseOver = !1
    },
    ReportTooltipMouseOver: function() {
        galaxytool.report_display.GalaxytoolReportTooltipMouseOver = !0
    },
    ReportTooltipMouseLeave: function() {
        galaxytool.report_display.GalaxytoolReportTooltipMouseOver = !1
    }
};
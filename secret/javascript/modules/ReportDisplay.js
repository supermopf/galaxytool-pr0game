define("dojo/dom dijit/registry dojo/on dijit/popup dojo/i18n!./nls/galaxytool.js dojo/domReady!".split(" "), function (
    w, F, G, J, lang) {
    function s(a) {
        if (!0 == a || !1 == a) {
            A = a
        }
    }

    function HideReportDialog(a) {
        F.byId("ReportDialog").hide();
        p.remove();
        p = null
    }

    function GenerateSpeedSimURL(url, item, amount) {
        if ("" === url) return console.log("invalid method call - empty link provided"), !1;
        if (0 < amount || "coordinates" == item || "enemy_name" == item) switch (item) {
            case "coordinates":
                url += "enemy_pos=" + amount + "&amp;";
                break;
            case "enemy_name":
                url += "enemy_name=" + amount + "&amp;";
                break;
            case "metal":
                url += "enemy_metal=" +
                    amount + "&amp;";
                break;
            case "crystal":
                url += "enemy_crystal=" + amount + "&amp;";
                break;
            case "deuterium":
                url += "enemy_deut=" + amount + "&amp;";
                break;
            case "kt":
                url += "ship_d0_0_b=" + amount + "&amp;";
                break;
            case "gt":
                url += "ship_d0_1_b=" + amount + "&amp;";
                break;
            case "lj":
                url += "ship_d0_2_b=" + amount + "&amp;";
                break;
            case "sj":
                url += "ship_d0_3_b=" + amount + "&amp;";
                break;
            case "krz":
                url += "ship_d0_4_b=" + amount + "&amp;";
                break;
            case "ss":
                url += "ship_d0_5_b=" + amount + "&amp;";
                break;
            case "kolo":
                url += "ship_d0_6_b=" + amount + "&amp;";
                break;
            case "rec":
                url += "ship_d0_7_b=" + amount + "&amp;";
                break;
            case "spio":
                url += "ship_d0_8_b=" +
                    amount + "&amp;";
                break;
            case "bomb":
                url += "ship_d0_9_b=" + amount + "&amp;";
                break;
            case "sat":
                url += "ship_d0_10_b=" + amount + "&amp;";
                break;
            case "zerri":
                url += "ship_d0_11_b=" + amount + "&amp;";
                break;
            case "ds":
                url += "ship_d0_12_b=" + amount + "&amp;";
                break;
            case "skrz":
                url += "ship_d0_13_b=" + amount + "&amp;";
                break;
            case "rak":
                url += "ship_d0_14_b=" + amount + "&amp;";
                break;
            case "ll":
                url += "ship_d0_15_b=" + amount + "&amp;";
                break;
            case "sl":
                url += "ship_d0_16_b=" + amount + "&amp;";
                break;
            case "gauss":
                url += "ship_d0_17_b=" + amount + "&amp;";
                break;
            case "ion":
                url += "ship_d0_18_b=" + amount + "&amp;";
                break;
            case "plasma":
                url += "ship_d0_19_b=" +
                    amount + "&amp;";
                break;
            case "ksk":
                url += "ship_d0_20_b=" + amount + "&amp;";
                break;
            case "gsk":
                url += "ship_d0_21_b=" + amount + "&amp;";
                break;
            case "waffentech":
                url += "tech_d0_0=" + amount + "&amp;";
                break;
            case "schildtech":
                url += "tech_d0_1=" + amount + "&amp;";
                break;
            case "rpz":
                url += "tech_d0_2=" + amount + "&amp;";
                break;
            case "arak":
                url += "abm_b=" + amount + "&amp;";
                break;
            case "irak":
                url += "ipm_b=" + amount + "&amp;"
        }
        return url
    }

    function GenerateDragoSimURL(url, item, amount, d, c) {
        if ("" == url) return console.log("invalid method call - empty link provided"), !1;
        d = !0 == d ? 1 : 0;
        c = parseInt(c);
        switch (item) {
            case "coordinates":
                url += "v_coords=" +
                    amount + "&amp;";
                break;
            case "enemy_name":
                url += "v_planet=" + amount + "&amp;";
                break;
            case "metal":
                url += "v_met=" + amount + "&amp;";
                break;
            case "crystal":
                url += "v_kris=" + amount + "&amp;";
                break;
            case "deuterium":
                url += "v_deut=" + amount + "&amp;";
                break;
            case "kt":
                url += "numunits[" + d + "][" + c + "][k_t]=" + amount + "&amp;";
                break;
            case "gt":
                url += "numunits[" + d + "][" + c + "][g_t]=" + amount + "&amp;";
                break;
            case "lj":
                url += "numunits[" + d + "][" + c + "][l_j]=" + amount + "&amp;";
                break;
            case "sj":
                url += "numunits[" + d + "][" + c + "][s_j]=" + amount + "&amp;";
                break;
            case "krz":
                url += "numunits[" + d + "][" + c + "][kr]=" + amount + "&amp;";
                break;
            case "ss":
                url +=
                    "numunits[" + d + "][" + c + "][sc]=" + amount + "&amp;";
                break;
            case "kolo":
                url += "numunits[" + d + "][" + c + "][ko]=" + amount + "&amp;";
                break;
            case "rec":
                url += "numunits[" + d + "][" + c + "][re]=" + amount + "&amp;";
                break;
            case "spio":
                url += "numunits[" + d + "][" + c + "][sp]=" + amount + "&amp;";
                break;
            case "bomb":
                url += "numunits[" + d + "][" + c + "][bo]=" + amount + "&amp;";
                break;
            case "sat":
                url += "numunits[" + d + "][" + c + "][so]=" + amount + "&amp;";
                break;
            case "zerri":
                url += "numunits[" + d + "][" + c + "][z]=" + amount + "&amp;";
                break;
            case "ds":
                url += "numunits[" + d + "][" + c + "][t]=" + amount + "&amp;";
                break;
            case "skrz":
                url += "numunits[" + d + "][" +
                    c + "][sk]=" + amount + "&amp;";
                break;
            case "rak":
                url += "numunits[" + d + "][" + c + "][ra]=" + amount + "&amp;";
                break;
            case "ll":
                url += "numunits[" + d + "][" + c + "][l_l]=" + amount + "&amp;";
                break;
            case "sl":
                url += "numunits[" + d + "][" + c + "][s_l]=" + amount + "&amp;";
                break;
            case "gauss":
                url += "numunits[" + d + "][" + c + "][g]=" + amount + "&amp;";
                break;
            case "ion":
                url += "numunits[" + d + "][" + c + "][i]=" + amount + "&amp;";
                break;
            case "plasma":
                url += "numunits[" + d + "][" + c + "][p]=" + amount + "&amp;";
                break;
            case "ksk":
                url += "numunits[" + d + "][" + c + "][k_s]=" + amount + "&amp;";
                break;
            case "gsk":
                url += "numunits[" + d + "][" + c + "][g_s]=" + amount + "&amp;";
                break;
            case "waffentech":
                url += "techs[1][0][w_t]=" + amount + "&amp;";
                break;
            case "schildtech":
                url += "techs[1][0][s_t]=" + amount + "&amp;";
                break;
            case "rpz":
                url += "techs[1][0][r_p]=" + amount + "&amp;";
                break;
            case "arak":
                url += "missiles_available_v=" + amount + "&amp;";
                break;
            case "irak":
                url += "missiles_available_a=" + amount + "&amp;"
        }
        return url
    }

    function GenerateOSimulateURL(url, item, amount, d, c) {
        if ("" == url) return console.log("invalid method call - empty link provided"), !1;
        d = !0 == d ? "d" : "a";
        c = parseInt(c);
        switch (item) {
            case "coordinates":
                url += "enemy_pos=" + amount + "&amp;";
                break;
            case "enemy_name":
                url += "enemy_name=" +
                    amount + "&amp;";
                break;
            case "metal":
                url += "enemy_metal=" + amount + "&amp;";
                break;
            case "crystal":
                url += "enemy_crystal=" + amount + "&amp;";
                break;
            case "deuterium":
                url += "enemy_deut=" + amount + "&amp;";
                break;
            case "kt":
                url += "ship_" + d + c + "_0_b=" + amount + "&amp;";
                break;
            case "gt":
                url += "ship_" + d + c + "_1_b=" + amount + "&amp;";
                break;
            case "lj":
                url += "ship_" + d + c + "_2_b=" + amount + "&amp;";
                break;
            case "sj":
                url += "ship_" + d + c + "_3_b=" + amount + "&amp;";
                break;
            case "krz":
                url += "ship_" + d + c + "_4_b=" + amount + "&amp;";
                break;
            case "ss":
                url += "ship_" + d + c + "_5_b=" + amount + "&amp;";
                break;
            case "kolo":
                url += "ship_" + d + c + "_6_b=" + amount + "&amp;";
                break;
            case "rec":
                url += "ship_" + d + c + "_7_b=" + amount + "&amp;";
                break;
            case "spio":
                url += "ship_" + d + c + "_8_b=" + amount + "&amp;";
                break;
            case "bomb":
                url += "ship_" + d + c + "_9_b=" + amount + "&amp;";
                break;
            case "sat":
                url += "ship_" + d + c + "_10_b=" + amount + "&amp;";
                break;
            case "zerri":
                url += "ship_" + d + c + "_11_b=" + amount + "&amp;";
                break;
            case "ds":
                url += "ship_" + d + c + "_12_b=" + amount + "&amp;";
                break;
            case "skrz":
                url += "ship_" + d + c + "_13_b=" + amount + "&amp;";
                break;
            case "rak":
                url += "ship_" + d + c + "_14_b=" + amount + "&amp;";
                break;
            case "ll":
                url += "ship_" + d + c + "_15_b=" + amount + "&amp;";
                break;
            case "sl":
                url += "ship_" + d + c + "_16_b=" + amount +
                    "&amp;";
                break;
            case "gauss":
                url += "ship_" + d + c + "_17_b=" + amount + "&amp;";
                break;
            case "ion":
                url += "ship_" + d + c + "_18_b=" + amount + "&amp;";
                break;
            case "plasma":
                url += "ship_" + d + c + "_19_b=" + amount + "&amp;";
                break;
            case "ksk":
                url += "ship_" + d + c + "_20_b=" + amount + "&amp;";
                break;
            case "gsk":
                url += "ship_" + d + c + "_21_b=" + amount + "&amp;";
                break;
            case "waffentech":
                url += "tech_" + d + c + "_0=" + amount + "&amp;";
                break;
            case "schildtech":
                url += "tech_" + d + c + "_1=" + amount + "&amp;";
                break;
            case "rpz":
                url += "tech_" + d + c + "_2=" + amount + "&amp;";
                break;
            case "arak":
                url += "abm_b=" + amount + "&amp;";
                break;
            case "irak":
                url += "inter=" + amount + "&amp;";
                break;
            case "bandit":
                url += "plunder_perc=" + amount + "&amp;"
        }
        if ("a" == d) switch (item) {
            case "vbt":
                url += "engine" + c + "_0=" + amount + "&amp;";
                break;
            case "impulse":
                url += "engine" + c + "_1=" + amount + "&amp;";
                break;
            case "hra":
                url += "engine" + c + "_2=" + amount + "&amp;"
        }
        return url
    }

    function GetStorageForShip(ship) {
        switch (ship) {
            case "kt":
                return 5000;
            case "gt":
                return 25000;
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
                return 20000;
            case "spio":
                return 5;
            case "bomb":
                return 500;
            case "zerri":
                return 2000;
            case "ds":
                return 1000000;
            case "skrz":
                return 750;
            default:
                alert("unknown ship key")
        }
    }

    var p, A = !1;
    s.prototype.display = function (metal, q, SpeedSim, crystal, deut, typearray, t, p, s, html) {
        if (!(!0 != p && !1 != p)) {
            html =
                '<div align="center"><table cellpadding="1" cellspacing="0" border="0" style="width:700px;"><tr class="header"><td colspan="4">';
            html += lang.RESOURCES_ON;
            "" != metal && (html += " " + metal);
            metal = q.split(":");
            html += ' <a href="' + ("galaxyview.php?gala=" + metal[0] + "&system=" + metal[1]) + '">[' + q +
                "]</a> ";
            "" != SpeedSim && (html += " (" + SpeedSim + ") ");
            html += lang.REPORT_WHEN + " " + typearray.scantime[0];
            !1 == A && !1 == p && (html += " ", html += '<a href="report.php?coordinates=' +
                q + "&moon=" + t + '" target="_blank" style="float:right">', html +=
                '<img src="../images/new_tab.png" border="0" alt="' + lang.GENERAL_OPEN_IN_NEW_WINDOW +
                '" title="' + lang.GENERAL_OPEN_IN_NEW_WINDOW + '"></a></img>');
            html += "</td></tr>";
            var SpeedSimURL;
            SpeedSim = "http://websim.speedsim.net/?";
            SpeedSim = !0 == galaxytool.Settings.DefToDebris ? SpeedSim + "def_to_df=1&amp;" : SpeedSim +
                "def_to_df=0&amp;";
            SpeedSim += "perc-df=" + galaxytool.Settings.DebrisRate + "&amp;";
            "object" == typeof galaxytool.Settings.UserTechs && (0 < galaxytool.Settings.UserTechs.vbt && (
                SpeedSim += "engine0_0=" + galaxytool.Settings.UserTechs.vbt +
                    "&amp;"), 0 < galaxytool.Settings.UserTechs.impulse && (SpeedSim += "engine0_1=" +
                galaxytool.Settings.UserTechs.impulse + "&amp;"), 0 < galaxytool.Settings.UserTechs
                .hra && (SpeedSim += "engine0_2=" + galaxytool.Settings.UserTechs.hra + "&amp;"), 0 <
            galaxytool.Settings.UserTechs.waffentech && (SpeedSim += "tech_a0_0=" + galaxytool
                .Settings.UserTechs.waffentech + "&amp;"), 0 < galaxytool.Settings.UserTechs
                .schildtech && (SpeedSim += "tech_a0_1=" + galaxytool.Settings.UserTechs.schildtech +
                "&amp;"), 0 < galaxytool.Settings.UserTechs.rpz && (SpeedSim += "tech_a0_2=" +
                galaxytool.Settings.UserTechs.rpz +
                "&amp;"));
            switch (galaxytool.Settings.Language) {
                case "german":
                    SpeedSim += "lang=de&amp;";
                    break;
                case "polish":
                    SpeedSim += "lang=pl&amp;";
                    break;
                case "english":
                    SpeedSim += "lang=en&amp;";
                    break;
                case "spanish":
                    SpeedSim += "lang=sp&amp;";
                    break;
                case "dutch":
                    SpeedSim += "lang=nl&amp;";
                    break;
                case "balkan":
                    SpeedSim += "lang=ba&amp;";
                    break;
                case "french":
                    SpeedSim += "lang=fr&amp;";
                    break;
                case "portugues":
                    SpeedSim += "lang=pt&amp;";
                    break;
                case "italian":
                    SpeedSim += "lang=it&amp;";
                    break;
                case "turkish":
                    break;
                case "danish":
                    SpeedSim += "lang=dk&amp;";
                    break;
                case "brazilian":
                    SpeedSim += "lang=pt&amp;";
                    break;
                case "russian":
                    SpeedSim +=
                        "lang=ru&amp;";
                    break;
                case "swedish":
                    SpeedSim += "lang=sv&amp;";
                    break;
                case "greek":
                    SpeedSim += "lang=gr&amp;";
                    break;
                case "romanian":
                    SpeedSim += "lang=ro&amp;";
                    break;
                case "hungarian":
                    SpeedSim += "lang=hu&amp;";
                    break;
                case "czech":
                    SpeedSim += "lang=cz&amp;";
                    break;
                case "korean":
                    SpeedSim += "lang=kr&amp;";
                    break;
                case "norwegian":
                    SpeedSim += "lang=no&amp;";
                    break;
                case "taiwan":
                    SpeedSim += "lang=tw&amp;";
                    break;
                case "japan":
                    SpeedSim += "lang=ja&amp;";
                    break;
                case "chinese":
                    SpeedSim += "lang=cn&amp;";
                    break;
                case "bulgarian":
                    SpeedSim += "lang=bg&amp;";
                    break;
                case "lithuanian":
                    SpeedSim += "lang=lt&amp;";
                    break;
                case "latvian":
                    SpeedSim +=
                        "lang=lv&amp;";
                    break;
                case "finnish":
                    SpeedSim += "lang=fi&amp;";
                    break;
                case "slovak":
                    SpeedSim += "lang=sk&amp;";
                    break;
                case "croatian":
                    SpeedSim += "lang=ba&amp;";
                    break;
                case "serbian":
                    break;
                case "slovenian":
                    SpeedSim += "lang=si&amp;";
                    break;
                default:
                    SpeedSim += "lang=en&amp;"
            }
            var DragoSimURL;
            DragoSimURL = "http://drago-sim.com/?referrer=galaxytool&amp;" + ("debris_ratio=" + galaxytool
                .Settings.DebrisRate / 100 + "&amp;");

            galaxytool.Settings.DefToDebris && (DragoSimURL += "def_tf=0&amp;");

            "object" == typeof galaxytool.Settings.UserTechs && (0 < galaxytool.Settings.UserTechs
                .waffentech && (DragoSimURL += "techs[0][0][w_t]=" +
                galaxytool.Settings.UserTechs.waffentech + "&amp;"), 0 < galaxytool.Settings
                .UserTechs.schildtech && (DragoSimURL += "techs[0][0][s_t]=" + galaxytool.Settings
                .UserTechs.schildtech + "&amp;"), 0 < galaxytool.Settings.UserTechs.rpz && (
                DragoSimURL += "techs[0][0][r_p]=" + galaxytool.Settings.UserTechs.rpz + "&amp;"));
            switch (galaxytool.Settings.Language) {
                case "german":
                    DragoSimURL += "lang=german&amp;";
                    break;
                case "polish":
                    DragoSimURL += "lang=polish&amp;";
                    break;
                case "english":
                    DragoSimURL += "lang=english&amp;";
                    break;
                case "spanish":
                    DragoSimURL += "lang=spanish&amp;";
                    break;
                case "dutch":
                    DragoSimURL += "lang=dutch&amp;";
                    break;
                case "balkan":
                    DragoSimURL += "lang=bosnian&amp;";
                    break;
                case "french":
                    DragoSimURL += "lang=french&amp;";
                    break;
                case "portugues":
                    DragoSimURL += "lang=portuguese&amp;";
                    break;
                case "italian":
                    DragoSimURL += "lang=italian&amp;";
                    break;
                case "turkish":
                    DragoSimURL += "lang=turkish&amp;";
                    break;
                case "danish":
                    DragoSimURL += "lang=danish&amp;";
                    break;
                case "brazilian":
                    DragoSimURL += "lang=brazilian&amp;";
                    break;
                case "russian":
                    DragoSimURL += "lang=russian&amp;";
                    break;
                case "swedish":
                    DragoSimURL += "lang=swedish&amp;";
                    break;
                case "greek":
                    DragoSimURL += "lang=greek&amp;";
                    break;
                case "romanian":
                    DragoSimURL += "lang=romanian&amp;";
                    break;
                case "hungarian":
                    DragoSimURL +=
                        "lang=hungarian&amp;";
                    break;
                case "czech":
                    DragoSimURL += "lang=czech&amp;";
                    break;
                case "korean":
                    DragoSimURL += "lang=korean&amp;";
                    break;
                case "norwegian":
                    break;
                case "taiwan":
                    DragoSimURL += "lang=taiwanese&amp;";
                    break;
                case "japan":
                    break;
                case "chinese":
                    break;
                case "bulgarian":
                    DragoSimURL += "lang=bulgarian&amp;";
                    break;
                case "lithuanian":
                    break;
                case "latvian":
                    break;
                case "finnish":
                    break;
                case "slovak":
                    DragoSimURL += "lang=slovak&amp;";
                    break;
                case "croatian":
                    DragoSimURL += "lang=bosnian&amp;";
                    break;
                case "serbian":
                    break;
                case "slovenian":
                    break;
                default:
                    DragoSimURL += "lang=english&amp;"
            }
            let OSimulateURL;
            OSimulateURL =
                "http://www.osimulate.com/?" + ("perc-df=" + galaxytool.Settings.DebrisRate + "&amp;");
            !0 == galaxytool.Settings.DefToDebris && (OSimulateURL += "defense_debris=30&amp;");
            OSimulateURL += "uni_speed=" + galaxytool.Settings.SpeedRate + "&amp;";
            "object" == typeof galaxytool.Settings.UserTechs && (0 < galaxytool.Settings.UserTechs
                .waffentech && (OSimulateURL += "tech_a0_0=" + galaxytool.Settings.UserTechs.waffentech +
                "&amp;"), 0 < galaxytool.Settings.UserTechs.schildtech && (OSimulateURL +=
                "tech_a0_1=" + galaxytool.Settings.UserTechs.schildtech + "&amp;"), 0 < galaxytool
                .Settings.UserTechs.rpz &&
            (OSimulateURL += "tech_a0_2=" + galaxytool.Settings.UserTechs.rpz + "&amp;"), 0 <
            galaxytool.Settings.UserTechs.vbt && (OSimulateURL += "engine_0=" + galaxytool.Settings
                .UserTechs.vbt + "&amp;"), 0 < galaxytool.Settings.UserTechs.impulse && (
                OSimulateURL += "engine_1=" + galaxytool.Settings.UserTechs.impulse + "&amp;"), 0 <
            galaxytool.Settings.UserTechs.hra && (OSimulateURL += "engine_2=" + galaxytool.Settings
                .UserTechs.hra + "&amp;"));
            switch (galaxytool.Settings.Language) {
                case "german":
                    OSimulateURL += "lang=de&amp;";
                    break;
                case "polish":
                    OSimulateURL += "lang=pl&amp;";
                    break;
                case "english":
                    OSimulateURL += "lang=gb&amp;";
                    break;
                case "spanish":
                    OSimulateURL += "lang=es&amp;";
                    break;
                case "dutch":
                    OSimulateURL += "lang=nl&amp;";
                    break;
                case "balkan":
                    OSimulateURL += "lang=ba&amp;";
                    break;
                case "french":
                    OSimulateURL += "lang=fr&amp;";
                    break;
                case "portugues":
                    OSimulateURL += "lang=pt&amp;";
                    break;
                case "italian":
                    OSimulateURL += "lang=it&amp;";
                    break;
                case "turkish":
                    OSimulateURL += "lang=tr&amp;";
                    break;
                case "danish":
                    OSimulateURL += "lang=dk&amp;";
                    break;
                case "brazilian":
                    OSimulateURL += "lang=br&amp;";
                    break;
                case "russian":
                    OSimulateURL += "lang=ru&amp;";
                    break;
                case "swedish":
                    OSimulateURL += "lang=se&amp;";
                    break;
                case "greek":
                    OSimulateURL += "lang=gr&amp;";
                    break;
                case "romanian":
                    OSimulateURL += "lang=ro&amp;";
                    break;
                case "hungarian":
                    OSimulateURL += "lang=hu&amp;";
                    break;
                case "czech":
                    OSimulateURL += "lang=cz&amp;";
                    break;
                case "korean":
                    OSimulateURL += "lang=kr&amp;";
                    break;
                case "norwegian":
                    break;
                case "taiwan":
                    OSimulateURL += "lang=tw&amp;";
                    break;
                case "japan":
                    break;
                case "chinese":
                    break;
                case "bulgarian":
                    OSimulateURL += "lang=bg&amp;";
                    break;
                case "lithuanian":
                    break;
                case "latvian":
                    break;
                case "finnish":
                    break;
                case "slovak":
                    OSimulateURL += "lang=sk&amp;";
                    break;
                case "croatian":
                    OSimulateURL += "lang=hr&amp;";
                    break;
                case "serbian":
                    break;
                case "slovenian":
                    break;
                default:
                    OSimulateURL += "lang=gb&amp;"
            }
            SpeedSimURL = GenerateSpeedSimURL(SpeedSim, "coordinates", q);
            DragoSimURL = GenerateDragoSimURL(DragoSimURL, "coordinates", q, !1, 0);
            OSimulateURL = GenerateOSimulateURL(OSimulateURL, "coordinates", q, !1, 0);
            var y = 0,
                n = !1,
                v = 0,
                z = 0;
            SpeedSim = !1;
            for (var type in typearray) {
                if ("bandit" === type) {
                    SpeedSim = typearray[type], "true" === SpeedSim && (OSimulateURL = GenerateOSimulateURL(
                        OSimulateURL, type, "100", !1, 0)), SpeedSim = !1;
                } else if (!(
                    "id" == type ||
                    "msg_id" == type ||
                    "res_sum" == type ||
                    "fleet_sum" == type ||
                    "def_sum" == type ||
                    "scantime" == type ||
                    "planetname" == type ||
                    "playername" == type ||
                    "details" == type ||
                    "username" == type)) {
                    if ("h1" == type || "h2" == type || "h3" == type || "h4" == type || "h5" == type) {
                        !0 == n && (html += '<td colspan="2">&nbsp;</td>', html += "</tr>"), html +=
                            '<tr class="header ' + ("ok" == typearray[type][0] ? "truespio" : "falsespio") +
                            '"><td colspan="4">' + typearray[type][1] +
                            "</td></tr>", y = 0;
                    } else {
                        if ("kt" == type || "gt" == type || "lj" == type || "sj" == type || "krz" == type ||
                            "ss" == type || "kolo" == type || "rec" == type || "bomb" == type || "zerri" ==
                            type || "ds" == type || "skrz" == type) 0 < typearray[type][0] && (v +=
                            GetStorageForShip(type) * typearray[type][0]);
                        if ("metal" == type || "crystal" == type || "deuterium" == type) {
                            z += parseInt(typearray[type][0]);
                        }
                        var D = typearray[type][0];
                        if (!isNaN(parseFloat(typearray[type][0])) && isFinite(typearray[type][0])) {
                            if (0 == typearray[type][0] && "metal" != type && "crystal" != type &&
                                "deuterium" != type && "energy" != type) continue;
                            SpeedSimURL = GenerateSpeedSimURL(SpeedSimURL, type, typearray[type][0]);
                            DragoSimURL = GenerateDragoSimURL(DragoSimURL, type, typearray[type][0], !0, 0);
                            OSimulateURL = GenerateOSimulateURL(OSimulateURL, type, typearray[type][0], !0, 0)
                        }
                        var r = "";
                        if ("metal" == type || "crystal" == type || "deuterium" == type) {
                            n = null;
                            switch (type) {
                                case "metal":
                                    n = "mesp";
                                    break;
                                case "crystal":
                                    n = "krissp";
                                    break;
                                case "deuterium":
                                    n = "deutsp"
                            }
                            var E = 0;
                            try {
                                E = typearray[n][0]
                            } catch (w) {
                                alert(w)
                            }
                            "ok" == typearray.h4[0] && !t && (n = 5E3 * Math.floor(2.5 * Math.pow(Math.E,
                                20 * E / 33)), n <= D ? r = 'class="traffic_light_red"' : 0.9 * n <=
                                D && (r = 'class="traffic_light_yellow"'))
                        }
                        0 == y % 2 ? (n = !0, html += "<tr>", html += '<td style="padding-left:20px;">' +
                            typearray[type][1] +
                            '</td><td style="padding-left:10px; padding-right:20px;" ' + r + ">" +
                            galaxytool.General.numberFormat(typearray[type][0]) + "</td>") : (n = !1,
                            html += '<td style="padding-left:20px;">' +
                                typearray[type][1] +
                                '</td><td style="padding-left:10px; padding-right:20px;" ' + r + ">" +
                                galaxytool.General.numberFormat(typearray[type][0]) + "</td>", html +=
                            "</tr>");
                        y++
                    }
                }
            }
            !0 == n && (html += '<td colspan="2">&nbsp;</td>', html += "</tr>");
            "" != deut && null !== deut && (html += '<tr class="header"><td colspan="4">' + crystal + " " + deut +
                "</td></tr>");

            html += '<tr class="header"><td colspan="1"><a target="speedsim" href="' + SpeedSimURL + '">' +
                lang.REPORTS_SPEEDSIM + "</a></td>";

            html += '<td colspan="2"><a target="dragosim" href="' + DragoSimURL + '">' + lang.REPORTS_DRAGOSIM +
                "</a></td>";

            html += '<td colspan="1"><a target="OSimulate" href="' +
                OSimulateURL + '">' + lang.REPORTS_OSIMULATE + "</a></td></tr>";

            html += '<tr><td colspan="2" style="padding-left:20px;">' + lang.REPORTS_ALL_RESOURCES + "</td>";

            html += '<td style="padding-left:20px;" colspan="2">' + galaxytool.General.numberFormat(z) +
                "</tr>";

            "ok" == typearray.h2[0] && (r = v < typearray.res_sum[0] ? 'class="traffic_light_red"' : "",
                html += '<tr><td colspan="2" style="padding-left:20px;">' + lang
                    .REPORT_ARCHIVE_FLEET_CARGO + "</td>", html +=
                '<td style="padding-left:20px;" colspan="2" ' + r + ">" + galaxytool.General
                    .numberFormat(v) + "</tr>");

            "ok" == typearray.h4[0] && (!0 == t && 0 < typearray.sensor[0]) &&
            (html += '<tr><td colspan="2" style="padding-left:20px;">' + lang.DETAILEDINFO_PHALANX_AREA +
                "</td>", crystal = parseInt(metal[1]) - (Math.pow(typearray.sensor[0], 2) - 1), 0 > crystal && (crystal = 1),
                deut = parseInt(metal[1]) + (Math.pow(typearray.sensor[0], 2) - 1), 499 < deut && (deut = 499),
                type = "galaxyview.php?gala=" + metal[0] + "&system=" + crystal, DragoSimURL =
                "galaxyview.php?gala=" + metal[0] + "&system=" + deut, html +=
                '<td style="padding-left:20px;" colspan="2"><a href="' + type + '">' + metal[0] + ":" + crystal +
                "</a>", html += ' - <a href="' + DragoSimURL + '">' + metal[0] + ":" + deut + "</a></tr>");

            "ok" == typearray.h5[0] && (0 < typearray.impulse[0] && !1 == t && 3 < typearray.raksilo[0]) &&
            (html += '<tr><td colspan="2" style="padding-left:20px;">' +
                lang.REPORT_ARCHIVE_IRAK_RANGE + "</td>", crystal = parseInt(metal[1]) - (5 * typearray.impulse[0] -
                1), 0 > crystal && (crystal = 1), deut = parseInt(metal[1]) + (5 * typearray.impulse[0] - 1), 499 <
            deut && (deut = 499), type = "galaxyview.php?gala=" + metal[0] + "&system=" + crystal, DragoSimURL =
                "galaxyview.php?gala=" + metal[0] + "&system=" + deut, html +=
                '<td style="padding-left:20px;" colspan="2"><a href="' + type + '">' + metal[0] + ":" + crystal +
                "</a>", html += ' - <a href="' + DragoSimURL + '">' + metal[0] + ":" + deut + "</a></tr>");


            //Für alle raidbaren Ressourcen

            html += '<tr><td colspan="2" style="padding-left:20px; vertical-align:text-top;">' + lang
                .REPORTS_FOR_ALL_RES + "</td>";

            metal = typearray.metal[0];
            crystal = typearray.crystal[0];
            deut = typearray.deuterium[0];

            metal = parseInt(metal);
            crystal = parseInt(crystal);
            deut = parseInt(deut);

            SpeedSim = true != SpeedSim ? !1 : !0;


            if (!(0 > metal) && !(0 > crystal) && !(0 > deut)) {
                DragoSimURL = !0 == SpeedSim ? 1 : 2;
                    type = Math.ceil(Math.max(metal + crystal + deut, Math.min(0.75 * (2 * metal + crystal + deut), 2 * metal + deut)) / (5E3 * DragoSimURL));

                    SpeedSim = Math.ceil(Math.max(metal + crystal + deut, Math.min(0.75 * (2 * metal + crystal + deut), 2 * metal + deut)) / (25E3 * DragoSimURL));

                    metal = Math.ceil(Math.max(metal + crystal + deut, Math.min(0.75 * (2 * metal + crystal + deut), 2 * metal + deut)) / (1500 * DragoSimURL))

                    crystal = lang.REPORTS_KT + ": " + galaxytool.General.numberFormat(type) + "<br />";
                    crystal += lang.REPORTS_GT + ": " + galaxytool.General.numberFormat(SpeedSim) + "<br />";
                    metal = crystal += lang.REPORTS_SS + ": " + galaxytool.General.numberFormat(metal) + "<br />";
            } else {
                metal = void 0;
            }


            html += '<td colspan="2" style="padding-left:20px;">' + metal + "</td></tr>";

            //Debris Calc
            let DebrisTotal = 0;
            let DefToDebris = (galaxytool.Settings.DefToDebris ? 1 : 0);
            for (var typearrayKey in typearray) switch (typearrayKey) {
                case "kt":
                    DebrisTotal += 1200 * typearray[typearrayKey][0];
                    break;
                case "gt":
                    DebrisTotal += 3600 * typearray[typearrayKey][0];
                    break;
                case "lj":
                    DebrisTotal += 1200 * typearray[typearrayKey][0];
                    break;
                case "sj":
                    DebrisTotal += 3E3 * typearray[typearrayKey][0];
                    break;
                case "krz":
                    DebrisTotal += 8100 * typearray[typearrayKey][0];
                    break;
                case "ss":
                    DebrisTotal += 18E3 * typearray[typearrayKey][0];
                    break;
                case "kolo":
                    DebrisTotal += 9E3 * typearray[typearrayKey][0];
                    break;
                case "rec":
                    DebrisTotal += 4800 * typearray[typearrayKey][0];
                    break;
                case "spio":
                    DebrisTotal += 300 * typearray[typearrayKey][0];
                    break;
                case "bomb":
                    DebrisTotal += 22500 * typearray[typearrayKey][0];
                    break;
                case "sat":
                    DebrisTotal += 600 * typearray[typearrayKey][0];
                    break;
                case "zerri":
                    DebrisTotal += 33E3 * typearray[typearrayKey][0];
                    break;
                case "ds":
                    DebrisTotal += 27E5 * typearray[typearrayKey][0];
                    break;
                case "skrz":
                    DebrisTotal += 21E3 * typearray[typearrayKey][0];
                    break;
                case "rak":
                    DebrisTotal += 600 * typearray[typearrayKey][0] * DefToDebris;
                    break;
                case "ll":
                    DebrisTotal += 600 * typearray[typearrayKey][0] * DefToDebris;
                    break;
                case "sl":
                    DebrisTotal += 2400 * typearray[typearrayKey][0] * DefToDebris;
                    break;
                case "gauss":
                    DebrisTotal += 10500 * typearray[typearrayKey][0] * DefToDebris;
                    break;
                case "ion":
                    DebrisTotal += 2400 * typearray[typearrayKey][0] * DefToDebris;
                    break;
                case "plasma":
                    DebrisTotal += 3E4 * typearray[typearrayKey][0] * DefToDebris;
                    break;
                case "ksk":
                    DebrisTotal += 6E3 * typearray[typearrayKey][0] * DefToDebris;
                    break;
                case "gsk":
                    DebrisTotal += 3E4 * typearray[typearrayKey][0] * DefToDebris
            }

            let RecyclerNeeded = Math.ceil(DebrisTotal / 20000);

            html += '<tr><td colspan="2" style="padding-left:20px; vertical-align:text-top;">' + lang.SHOW_DF_LONG +
                    "</td>";

            html += '<td colspan="2" style="padding-left:20px;">' +
                    galaxytool.General.numberFormat(DebrisTotal) +
                    " ( " + RecyclerNeeded + " " + lang.REPORTS_REC + ")</td></tr>";

            html += '<tr class="header"><td colspan="4"><a href="report_archive.php?coordinates=' + q +
                    "&moon=" + t + '">' + s + "</a></td></tr>";

            html += "</table></div>";
            return html;
        }
    };
    s.prototype.addReportClickAndCloseListener = function () {
        if (null == p) {
            var a = w.byId("ReportDialog_underlay");
            p = G(a, "click", HideReportDialog)
        }
    };
    return s
});
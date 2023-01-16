<?php

/**
 * PHP parser for the OGame API data provided with differnt XML files
 *
 * @author eX0du5
 *
 */
class pr0gameAPIParser extends GenericSuperclass
{

    const category_player = 1;
    const category_alliance = 2;

    const type_total = 0;
    const type_Economy = 1;
    const type_Research = 2;
    const type_Military = 3;
    const type_Military_Lost = 4;
    const type_Military_Built = 5;
    const type_Military_Destroyed = 6;
    const type_Honor = 7;

    private $dbtablename = null;
    private $systemtablename = null;
    private $allytable = null;
    private $playertable = null;
    private $global_universe = null;
    private $depth = 0;
    private $fastOverride = true;
    private $lastUpdate = array();

    public function __construct($global_universe, $dbtablename, $systemtablename, $playertable, $allytable, $combattable, $combatparty, $noticetable, $playerhistory, $player_activity, $messagetable, $fastOverride = false)
    {
        parent::__construct();

        if ($dbtablename == "") throw new InvalidArgumentException("Galaxy table empty");
        $this->dbtablename = $dbtablename;

        if ($systemtablename == "") throw new InvalidArgumentException("Galaxy table empty");
        $this->systemtablename = $systemtablename;

        if ($playertable == "") throw new InvalidArgumentException("Player table empty");
        $this->playertable = $playertable;

        if ($allytable == "") throw new InvalidArgumentException("Ally table empty");
        $this->allytable = $allytable;

        if ($combattable == "") throw new InvalidArgumentException("Combat table empty");
        $this->combattable = $combattable;

        if ($combatparty == "") throw new InvalidArgumentException("Combat Party table empty");
        $this->combatparty = $combatparty;

        if ($noticetable == "") throw new InvalidArgumentException("Notice table empty");
        $this->noticetable = $noticetable;

        if ($playerhistory == "") throw new InvalidArgumentException("Player History table empty");
        $this->playerhistory = $playerhistory;

        if ($player_activity == "") throw new InvalidArgumentException("Player Activity table empty");
        $this->player_activity = $player_activity;

        if ($messagetable == "") throw new InvalidArgumentException("Message table empty");
        $this->messagetable = $messagetable;

        if ($global_universe == "") throw new InvalidArgumentException("Universe empty");
        $this->global_universe = $global_universe;

        $this->fastOverride = $fastOverride;

    }

    /**
     * Load statistics data from pr0game API
     * @param Integer $user_id
     * @return boolean
     * @throws InvalidArgumentException
     */
    public function load_pr0game_statistics_data($user_id)
    {
        $PR0GAME_STATS_URL = "https://pr0game.com/stats_Universe_2.json";
        $user_id = intval($user_id);
        if ($user_id < 1) throw new InvalidArgumentException("Invalid user id provided");

        try {
            // player data
            $result = $this->get_player_data($PR0GAME_STATS_URL);

            if ($result === false) {
                return false;
            }
            $result2 = $this->save_playerdata($result, $user_id);
            if ($result2 === false) {
                return false;
            }


        } catch (Exception $e) {
            $this->error_object = new ErrorObject(ErrorObject::severity_error, $e->getMessage());
            return false;
        }

        return true;
    }

    /**
     * Extract player information from pr0game API and return as array
     * @param String $url
     * @return boolean|array
     * @throws InvalidArgumentException
     */
    protected function get_player_data($url)
    {
        $url = strip_tags($url);
        if (substr($url, -5) != ".json") throw new InvalidArgumentException("No JSON file provided");

        if (!$this->validate_url($url)) return false;

        $json = file_get_contents($url);

        if (!$json) {
            $this->error_object = new ErrorObject(ErrorObject::severity_error, "Error: Getting file failed");
            return;
        }
        $obj = json_decode($json);

        $last_update = date("Y-m-d H:i:s");

        foreach ($obj as $item) {
            $item->last_update = $last_update;
        }

        return $obj;
    }

    /**
     * Convert player data array into database queries and save them.
     * @param array $data
     * @param Integer $user_id
     * @return boolean
     * @throws InvalidArgumentException
     */
    protected function save_playerdata(array $data, $user_id)
    {
        $user_id = intval($user_id);
        if ($user_id < 1) throw new InvalidArgumentException("Invalid user id provided");

        if (count($data) < 2) return false;

        // get all alliances from database
        $query = "SELECT id, ogame_allyid FROM $this->allytable";
        $stmt = $this->query($query);
        if (!$stmt) return false;
        unset($query);
        $ogame_allyid_2_gt_id = array();
        while ($line = $stmt->fetch(PDO::FETCH_OBJ)) {
            $ogame_allyid_2_gt_id[$line->ogame_allyid] = $line->id;
        }

        $query_start = "INSERT INTO `$this->playertable` (`playername`,`ogame_playerid`,`alliance_id`,`rank`,`points`," .
            "`frank`,`fpoints`,`rrank`,`rpoints`,`erank`,`epoints`,`defrank`,`defpoints`," .
            "`last_stats_update`,`user_id`) VALUES ";
        $query_end = "ON DUPLICATE KEY UPDATE playername=VALUES(playername), alliance_id=VALUES(alliance_id), last_stats_update=VALUES(last_stats_update), user_id=VALUES(user_id)," .
            "rank=VALUES(rank), points=VALUES(points), frank=VALUES(frank), fpoints=VALUES(fpoints), rrank=VALUES(rrank), rpoints=VALUES(rpoints), erank=VALUES(erank), epoints=VALUES(epoints)," .
            "defrank=VALUES(defrank), defpoints=VALUES(defpoints)";

        $query = "";
        $entries = 0;
        foreach ($data as $playerdata) {
            $entries++;

            $name = $playerdata->playerName;
            $playerid = $playerdata->playerId;
            if ($playerdata->allianceId == 0) {
                $GTAllianceID = 0;
            } else {
                $GTAllianceID = $ogame_allyid_2_gt_id[$playerdata->allianceId];
            }
            $rank = $playerdata->rank;
            $points = $playerdata->score;
            $frank = $playerdata->fleetRank;
            $fpoints = $playerdata->fleetScore;
            $rrank = $playerdata->researchRank;
            $rpoints = $playerdata->researchScore;
            $erank = $playerdata->buildingRank;
            $epoints = $playerdata->buildingScore;
            $defrank = $playerdata->defensiveRank;
            $defpoints = $playerdata->defensiveScore;
            $last_update = $playerdata->last_update;


            $query .= "(" . DB::getDB()->quote($name) . "," . intval($playerid) . "," . $GTAllianceID . ",";
            $query .= $rank . "," . $points . "," . $frank . "," . $fpoints . "," . $rrank . "," . $rpoints . "," . $erank . "," . $epoints . "," .
                $defrank . "," . $defpoints . ",";
            $query .= DB::getDB()->quote($last_update) . ",$user_id),";


            if ($entries == 500) {
                // remove last comma
                $query = substr($query, 0, strlen($query) - 1);

                $execute_query = $query_start . " " . $query . " " . $query_end;
                $res = $this->exec($execute_query);
                unset($execute_query);
                if ($res === false) return false;

                $query = "";
                $entries = 0;
            }
        }
        if ($entries > 0) {
            // remove last comma
            $query = substr($query, 0, strlen($query) - 1);

            $execute_query = $query_start . " " . $query . " " . $query_end;
            $res = $this->exec($execute_query);
            unset($execute_query);
            if ($res === false) return false;
        }

        // delete player and its references which are no longer part of OGame
        //$result = $this->delete_outdated_players($last_update);
        //if ($result !== true) return false;

        return true;
    }


    /**
     * Checks if a given OGame API url exists at host.
     * @param String $url OGame API URL including .xml
     * @return boolean
     */
    private function validate_url($url)
    {
        $one_byte_content = @file_get_contents($url, 0, NULL, 0, 1);
        if ($one_byte_content === false) {
            $this->error_object = new ErrorObject(ErrorObject::severity_error, str_replace("&1", $url, INSTALL_STEP4_URL_CHECK_FAILED));
            return false;
        }

        return true;
    }


    private function delete_outdated_players($last_update)
    {

        $query = "SELECT id, ogame_playerid FROM $this->playertable WHERE last_stats_update < :last_update";
        $stmt = DB::getDB()->prepare($query);
        $stmt->bindParam(":last_update", $last_update);
        $res = $this->execute($stmt);
        if ($res === false) return false;
        $ids = array();
        $oids = array();
        while ($line = $stmt->fetch(PDO::FETCH_OBJ)) {
            array_push($ids, $line->id);
            array_push($oids, $line->ogame_playerid);
        }
        if (count($ids) > 0) {
            $query = "DELETE FROM $this->playertable WHERE id IN (" . implode(",", $ids) . ")";
            $res = $this->exec($query);
            if ($res === false) return false;

            // delete referenced information
            $query = "DELETE FROM $this->playerhistory WHERE player_id IN (" . implode(",", $ids) . ")";
            $res = $this->exec($query);
            if ($res === false) return false;
            $query = "DELETE FROM $this->noticetable WHERE player_id IN (" . implode(",", $ids) . ")";
            $res = $this->exec($query);
            if ($res === false) return false;
            $query = "DELETE FROM $this->dbtablename WHERE ogame_playerid  IN (" . implode(",", $oids) . ")";
            $res = $this->exec($query);
            if ($res === false) return false;

            $query = "SELECT combat_id FROM $this->combatparty WHERE player_id IN (" . implode(",", $ids) . ")";
            $stmt = $this->query($query);
            if ($stmt === false) return false;
            $combat_ids = array();
            while ($line = $stmt->fetch(PDO::FETCH_OBJ)) {
                array_push($combat_ids, $line->combat_id);
            }
            if (count($combat_ids) > 0) {
                $query = "DELETE FROM $this->combattable WHERE id IN (" . implode(",", $combat_ids) . ")";
                $res = $this->exec($query);
                if ($res === false) return false;
                $query = "DELETE FROM $this->combatparty WHERE combat_id IN (" . implode(",", $combat_ids) . ")";
                $res = $this->exec($query);
                if ($res === false) return false;
            }

            $query = "DELETE FROM $this->player_activity WHERE player_id IN (" . implode(",", $ids) . ")";
            $res = $this->exec($query);
            if ($res === false) return false;
            $query = "DELETE FROM $this->messagetable WHERE player_id_from IN (" . implode(",", $ids) . ") OR player_id_to IN (" . implode(",", $ids) . ")";
            $res = $this->exec($query);
            if ($res === false) return false;

        }

        return true;
    }

}
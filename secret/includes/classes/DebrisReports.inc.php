<?php
/**
 * CRUD services for combat reports.
 * @author eX0du5
 *
 */
class DebrisReports extends GenericSuperclass {

	private $debris_report_table;			// database table name for combat reports
	private $playertable;					// database table name for players
	private $usertable;                     // database table for galaxytool user

	function __construct($debris_report_table, $playertable, $usertable) {
		parent::__construct();

		if ($debris_report_table == "") throw new InvalidArgumentException("Debris Report table empty");
		$this->debris_report_table = $debris_report_table;

		if ($playertable == "") throw new InvalidArgumentException("Player table empty");
		$this->playertable = $playertable;

		if ($usertable == "") throw new InvalidArgumentException("User table empty");
		$this->usertable = $usertable;
	}
	
	/**
	 * Return the number of rows that match the selection criteria.
	 * @return number|NULL
	 */
	public function get_number_of_results() {
		if ($this->results == null) return 0;
		return $this->results;
	}

	public function get_content($start, $count) {
		$start = intval($start);
		$count = intval($count);
		if ($start < 0) $start = 0;
		if ($count < 10) $count = $_SESSION['s_auth']->get_setting(iAuthorization::setting_hits);

		$limit = $start.",".$count;

		$stmt = $this->query($this->query . " LIMIT " . $limit);
		if (!$stmt) return false;

		$result = ' "items":[';
		while ($line = $stmt->fetch(PDO::FETCH_ASSOC)) {
			$result .= '{'.
			" coordinates:".json_encode($line['coordinates']).", ".
			" collector:".json_encode($line['playername']).", ".
			" collectiontime:".json_encode($line['collectiontime']).", ".
			" owner:".json_encode($line['username']).", ".
			" loot_m:".json_encode($line['loot_metal']).", ".
			" loot_c:".json_encode($line['loot_crystal']).
			'},';

		}
		$result .= ' ]';
		return $result;
	}
	
	
	/*
	
	old shit
	
	
		public function get_search_results($collector, $owner_id, $date_from, $date_to, $coordinates) {
		$owner    = intval($owner_id);
		$collector = str_replace("*", "%", $collector);
		if (preg_replace("/\d\d\d\d-\d\d-\d\d/","",$date_from) != "") { // this will also allow empty dates
			// date not ok
			return "";
		}
		if (preg_replace("/\d\d\d\d-\d\d-\d\d/","",$date_to) != "") { // this will also allow empty dates
			// date not ok
			return "";
		}

		if (CoordinatesHelper::validate_coordinates($coordinates) !== true) return "Wrong coordinates";


		$query = "SELECT `dr`.`id`,`dr`.`collectiontime`,`dr`.`loot_metal`,`dr`.`loot_crystal`,`dr`.`userid`, `u`.`username`,  `p`.`playername`, ".
		" CONCAT(`dr`.`galaxy`, ':', `dr`.`system`, ':', `dr`.`planet`) as coordinates ".
		" FROM $this->debris_report_table dr ".
		" INNER JOIN $this->usertable u ON (`dr`.userid = u.id) ".
		" INNER JOIN $this->playertable p ON (`dr`.player_id = p.id) ";

		$query .= "WHERE 1=1 ";
		
		if ($owner != "") {
			$query .= " AND `dr`.`userid` LIKE ".DB::getDB()->quote($owner);
		}
		if ($collector != "") {
			$query .= " AND `p`.`playername` LIKE ".DB::getDB()->quote($collector);
		}
		if ($date_from != "") {
			$query .= " AND `dr`.`collectiontime` > '".$date_from." 00:00:00'";
		}
		if ($date_to != "") {
			$query .= " AND `dr`.`collectiontime` < '".$date_to." 23:59:59'";
		}

		// coordinates
		$query .= CoordinatesHelper::get_coordinate_where_statement($coordinates, "dr");

		$stmt = $this->query($query);
		if (!$stmt) return false;

		// collect results in array and combine playernames for same combat report
		$debrisreports = array();
		while ($line = $stmt->fetch(PDO::FETCH_OBJ)) {
			
			$debrisreports[$line->id] = array(
			'coordinates'   => $line->coordinates,
			'collector'   => $line->playername,
			'collectiontime' => $line->collectiontime,
			'owner'     => $line->username,
			'loot_m'     => intval($line->loot_metal),
			'loot_c'     => intval($line->loot_crystal)
			);
		}

		$return_value =
		"{ identifier: 'id',\n".
		"label: 'id',\n".
		"items: [\n";
		if (count($debrisreports) == 0) {
			$return_value .= "";
		} else {
			foreach ($debrisreports as $id => $data) {
				$return_value .= "{ id:'$id',".
				" coordinates:".json_encode($data['coordinates']).",".
				" collector:".json_encode($data['collector']).",".
				" collectiontime:".json_encode($data['collectiontime']).",".
				" owner:".json_encode($data['owner']).",".
				" loot_m:".json_encode($data['loot_m']).",".
				" loot_c:".json_encode($data['loot_c']).
				//" debris:".json_encode([m => $data['loot_m'],c => $data['loot_c']]).
				" },\n";
			}
			$return_value = substr($return_value,0,strlen($return_value)-2); // remove ,\n
		}
		$return_value .= "]}\n";

		return $return_value;

	}
	
	*/


	/**
	 * Provide the POST array containing all parameter of the form and perform validations and store selection parameter in an internal array.
	 * @param array $param
	 */
	public function set_search_parameter ($param) {
		$this->query = null; // reset former selection parameter
		$this->results = null;

		$this->selection['collector']      = trim(stripslashes(strip_tags($param['collector'])));
	    $this->selection['coordinates'] = (CoordinatesHelper::validate_coordinates($param['coordinates'])) ? $param['coordinates'] : "";

		if (preg_replace("/\d{4}\-\d{2}\-\d{2}/", "", $param['date_from']) == "") {
			$this->selection['date'] = $param['date_from'];
		}
		
		if (preg_replace("/\d{4}\-\d{2}\-\d{2}/", "", $param['date_to']) == "") {
			$this->selection['date'] = $param['date_to'];
		}

	    $this->selection['metal']   = (is_numeric($param['metal']) && $param['metal'] > 0) ? intval($param['metal']) : 0;
	    $this->selection['crystal'] = (is_numeric($param['crystal']) && $param['crystal'] > 0) ? intval($param['crystal']) : 0;
		$this->selection['both']    = (is_numeric($param['both']) && $param['both'] > 0) ? intval($param['both']) : 0;

	}
	public function perform_search($page=1) {
		if ($this->query == null && $this->selection == null) throw new InvalidArgumentException("No search parameter defined!");
		if ($this->query == null) {
			$res = $this->build_query();
			if (!$res) return false;
			$page = 1;
		}
		$this->selection = null;

		// add limit parameter
		$query = $this->query . " LIMIT ".$page * $_SESSION['s_auth']->get_setting(iAuthorization::setting_hits).", ".$_SESSION['s_auth']->get_setting(iAuthorization::setting_hits);

		$stmt   = $this->query($query);
		if (!$stmt) return false;

		$results = array();
		while ($line = $stmt->fetch(PDO::FETCH_ASSOC)) {
			array_push($results, $line);
		}

		return $results;
	}

	/**
	 * Transform selection parameter into a query which can be executed and get the number of maximum records for that query.
	 * @return boolean
	 */
	private function build_query() {
		/*
		SELECT `dr`.`id`,`dr`.`collectiontime`,`dr`.`loot_metal`,`dr`.`loot_crystal`,`dr`.`userid`, `u`.`username`,  `p`.`playername`, ".
		" CONCAT(`dr`.`galaxy`, ':', `dr`.`system`, ':', `dr`.`planet`) as coordinates ".
		" FROM $this->debris_report_table dr ".
		" INNER JOIN $this->usertable u ON (`dr`.userid = u.id) ".
		" INNER JOIN $this->playertable p ON (`dr`.player_id = p.id)
		*/
		$whereclause = $this->get_where_statement();

		$from_part = "FROM $this->debris_report_table dr ".
					 "INNER JOIN $this->usertable u ON (`dr`.userid = u.id) ".
		             "INNER JOIN $this->playertable p ON (`dr`.player_id = `p`.`ogame_playerid`) ";

		$count_query = "SELECT count(*) as results $from_part $whereclause";
		$stmt         = $this->query($count_query);
		if (!$stmt) return false;

		//$this->error_object = new ErrorObject(ErrorObject::severity_info, $count_query);

		$line          = $stmt->fetch(PDO::FETCH_OBJ);
		$this->results = $line->results;

		$this->query = "SELECT `dr`.`id`,`dr`.`galaxy`,`dr`.`system`,`dr`.`planet`,`dr`.`collectiontime`,`dr`.`loot_metal`,`dr`.`loot_crystal`,`dr`.`userid`, `u`.`username`,  `p`.`playername`, ".
					   "CONCAT(`dr`.`galaxy`, ':', `dr`.`system`, ':', `dr`.`planet`) as coordinates  ".
		               $from_part." ".$whereclause." ".
					   "ORDER BY `dr`.`galaxy`,`dr`.`system`,`dr`.`planet` ";

		return true;
	}

	/**
	 * Create the complex WHERE statement based on the selection parameter provided earlier.
	 * @return string
	 */
	private function get_where_statement() {
		$wheres = array();

		if (!empty($this->selection['collector'])) {
			$player = DB::getDB()->quote($this->selection['collector']);
			if (strpos($player, "*") === false) {
				array_push($wheres, "p.playername=$player");
			} else {
				$player = str_replace("*","%",$player);
				array_push($wheres, "p.playername LIKE $player");
			}
		}

		if ($this->selection['metal'] > 0) {
			array_push($wheres, "`dr`.`loot_metal` > ".$this->selection['metal']);
		}
		if ($this->selection['crystal'] > 0) {
			array_push($wheres, "`dr`.`loot_crystal` > ".$this->selection['crystal']);
		}
		if ($this->selection['both'] > 0) {
			array_push($wheres, "(`dr`.`loot_metal`+`dr`.`loot_crystal` > ".$this->selection['both'].")");
		}

		if (!empty($this->selection['date_from'])) {
			array_push($wheres, "`dr`.`collectiontime` > ".$this->selection['date_from']);
		}
		
		if (!empty($this->selection['date_to'])) {
			array_push($wheres, "`dr`.`collectiontime` < ".$this->selection['date_to']);
		}

	    // finally create the where clause

		$whereclause = "WHERE 1=1 "; // 1=1 is just a trick to avoid checking for "AND"
		if (count($wheres) > 0) {
			$whereclause .= " AND " . implode(" AND ", $wheres);
		}

		if (!empty($this->selection['coordinates'])) {
			$whereclause .= CoordinatesHelper::get_coordinate_where_statement($this->selection['coordinates'], "dr");
		}

		return $whereclause;
	}
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	//$dr_obj->get_search_results($collector, $owner_id, $date_from, $date_to, $coordinates);

	public function get_search_results($collector, $owner_id, $date_from, $date_to, $coordinates) {
		$owner    = intval($owner_id);
		$collector = str_replace("*", "%", $collector);
		if (preg_replace("/\d\d\d\d-\d\d-\d\d/","",$date_from) != "") { // this will also allow empty dates
			// date not ok
			return "";
		}
		if (preg_replace("/\d\d\d\d-\d\d-\d\d/","",$date_to) != "") { // this will also allow empty dates
			// date not ok
			return "";
		}

		if (CoordinatesHelper::validate_coordinates($coordinates) !== true) return "Wrong coordinates";


		$query = "SELECT `dr`.`id`,`dr`.`collectiontime`,`dr`.`loot_metal`,`dr`.`loot_crystal`,`dr`.`userid`, `u`.`username`,  `p`.`playername`, ".
		" CONCAT(`dr`.`galaxy`, ':', `dr`.`system`, ':', `dr`.`planet`) as coordinates ".
		" FROM $this->debris_report_table dr ".
		" INNER JOIN $this->usertable u ON (`dr`.userid = u.id) ".
		" INNER JOIN $this->playertable p ON (`dr`.player_id = p.id) ";

		$query .= "WHERE 1=1 ";
		
		if ($owner != "") {
			$query .= " AND `dr`.`userid` LIKE ".DB::getDB()->quote($owner);
		}
		if ($collector != "") {
			$query .= " AND `p`.`playername` LIKE ".DB::getDB()->quote($collector);
		}
		if ($date_from != "") {
			$query .= " AND `dr`.`collectiontime` > '".$date_from." 00:00:00'";
		}
		if ($date_to != "") {
			$query .= " AND `dr`.`collectiontime` < '".$date_to." 23:59:59'";
		}

		// coordinates
		$query .= CoordinatesHelper::get_coordinate_where_statement($coordinates, "dr");

		$stmt = $this->query($query);
		if (!$stmt) return false;

		// collect results in array and combine playernames for same combat report
		$debrisreports = array();
		while ($line = $stmt->fetch(PDO::FETCH_OBJ)) {
			
			$debrisreports[$line->id] = array(
			'coordinates'   => $line->coordinates,
			'collector'   => $line->playername,
			'collectiontime' => $line->collectiontime,
			'owner'     => $line->username,
			'loot_m'     => intval($line->loot_metal),
			'loot_c'     => intval($line->loot_crystal)
			);
		}

		$return_value =
		"{ identifier: 'id',\n".
		"label: 'id',\n".
		"items: [\n";
		if (count($debrisreports) == 0) {
			$return_value .= "";
		} else {
			foreach ($debrisreports as $id => $data) {
				$return_value .= "{ id:'$id',".
				" coordinates:".json_encode($data['coordinates']).",".
				" collector:".json_encode($data['collector']).",".
				" collectiontime:".json_encode($data['collectiontime']).",".
				" owner:".json_encode($data['owner']).",".
				" loot_m:".json_encode($data['loot_m']).",".
				" loot_c:".json_encode($data['loot_c']).
				//" debris:".json_encode([m => $data['loot_m'],c => $data['loot_c']]).
				" },\n";
			}
			$return_value = substr($return_value,0,strlen($return_value)-2); // remove ,\n
		}
		$return_value .= "]}\n";

		return $return_value;

	}

}
?>
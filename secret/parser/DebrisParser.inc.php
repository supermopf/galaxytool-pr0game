<?php
require_once GALAXYTOOL_ROOT."/languages/english_probes.inc.php";

/*
* Class to convert the XML content into php variables and to insert the content into
* corresponding datebase tables.
*
*/
class DebrisParser extends XMLParserGlobal{
	
	private $debristable = "";
		
	function __construct($debristable,$utablename,$playertable,$player_activitytable,$universe)
	{
		$this->xml_schema = "xml_schema/debris_report.xsd";
		//  call super constructor
		$result = parent::__construct("DUMMY_TABLE_NAME",$playertable,$utablename,$universe);
		if ($result === false) {
			return false;
		}
		if (trim($debristable) == "") return false;

		// local setup
		$this->debristable = $debristable;

		// create object to track player activities
		$this->activity_parser = new ActivityParser($player_activitytable,$playertable,$utablename,$universe);
		if ($this->activity_parser === false) return false;

		return $this;
	}

	public function insert_data($xml_content) {
		$xdoc = $this->validate_header($xml_content,XMLParserGlobal::content_type_debris_report);
		if ($xdoc === false) {
			return false;
		}


		$result = $this->insert_debris_report($xdoc,$this->userid);

		// add error or success messages
		$this->check_result($result);

		return $result;
	}
	
	private function insert_debris_report($xdoc, $userid)
    {
        $reports = $xdoc->getElementsByTagName("debris_report");
        $reports_data = array();

        foreach ($reports as $report) {
            // extract information from XML file
            $report_data = $this->get_report_data($report);
            // store results
            $reports_data[] = $report_data;
        }
        unset($reports);
        unset($xdoc);

        if ($this->update_reports_at_database($reports_data, $userid)) {
            return true;
        } else {
            return false;
        }
    }
	
	private function get_report_data($report_DOMNode)
    {

        $return_value = [];
		
		$return_value["msg_id"] = $report_DOMNode->getAttribute("msg_id");
		
        $return_value["galaxy"] = $report_DOMNode->getAttribute("galaxy");
        $return_value["system"] = $report_DOMNode->getAttribute("system");
        $return_value["planet"] = $report_DOMNode->getAttribute("planet");
		
		$return_value["collector"] = trim($report_DOMNode->getAttribute("collector"));
		$return_value["datetime"] = $report_DOMNode->getAttribute("datetime");
		$return_value["metal"] = $report_DOMNode->getAttribute("metal");
		$return_value["crystal"] = $report_DOMNode->getAttribute("crystal");

        return $return_value;
    }
	
	private function delete_existing_reports_from_array(array &$reports)
    {

        $report_ids = array();
        foreach ($reports as $report) {
            if ($report['msg_id'] != null) array_push($report_ids, $report['msg_id']);
        }

        // check which IDs exist on DB level
        $query = "SELECT `msg_id` FROM `" . $this->debristable . "` WHERE `msg_id` IN ('" . implode("','", $report_ids) . "')";
        $stmt = $this->query($query);
        if (!$stmt) {
            $this->error_object = new ErrorObject(ErrorObject::severity_error, "DB error occurred while checking for existing reports");
            $this->error_object->add_child_message($this->get_db_error_object());
            return false;
        }

        $existing_reports = [];
        while ($line = $stmt->fetch(PDO::FETCH_OBJ)) {
            $existing_reports[$line->msg_id] = "";
        }
		
        unset($line);
        unset($report_ids);


        foreach ($reports as $key => &$report) {
            if (isset($existing_reports[$report['msg_id']])) {
                // delete message from array
                unset($reports[$key]);
            }
        }

    }

    private function update_reports_at_database(array $reports, $userid)
    {
        $this->delete_existing_reports_from_array($reports);

        if (count($reports) == 0) return true;

        foreach ($reports as $report) {
            // initialize entries array
            $entries_array = [];

            // start building the query information
			$entries_array["msg_id"] = intval($report["msg_id"]);
			
            $entries_array["galaxy"] = intval($report["galaxy"]);
            $entries_array["system"] = intval($report["system"]);
            $entries_array["planet"] = intval($report["planet"]);
			
            $entries_array["player_id"] = $report["collector"];
			$entries_array["collectiontime"] = str_replace(".", "-", $report["datetime"]);
            $entries_array["loot_metal"] = intval($report["metal"]);
            $entries_array["loot_crystal"] = intval($report["crystal"]);
			$entries_array["userid"] = intval($userid);
        }

        //Get the SQL Ready
        $general_fields = ['galaxy', 'system', 'planet', 'msg_id', 'player_id' ,'collectiontime', 'loot_metal', 'loot_crystal', 'userid'];

        $EntryFields = "";
        $EntryValues = "(";
        //Add all general Values
        foreach ($general_fields as $field) {
            $EntryFields .= "`" . $field . "`,";
            if (isset($entries_array[$field])) {
                $EntryValues .= ":" . $field . ",";
            } else {
                $EntryValues .= "0,";
            }
        }
		
        $EntryFields = rtrim($EntryFields, ",");
        $EntryValues = rtrim($EntryValues, ",") . ")";

        $sql = 'INSERT INTO ' . $this->debristable . ' (' . $EntryFields . ') VALUES ' . $EntryValues;

        $stmt = DB::getDB()->prepare($sql);

        //PDO reads everthing as strings if not bind directly...
        foreach ($entries_array as $key => $value) {
            //$sql = str_replace(":".$key.",",$value.",",$sql);
            // echo ":$key - $value - ".gettype($value)."#";
            switch (gettype($value)) {
                case "integer":
                    $stmt->bindValue($key, $value, PDO::PARAM_INT);
                    break;
                default:
                    $stmt->bindValue($key, $value, PDO::PARAM_STR);
                    break;
            }
        }

        $res = $stmt->execute();

        if ($res === false) {
            $this->error_object = new ErrorObject(ErrorObject::severity_error, "DB error occurred while inserting or updating reports");
            $this->error_object->add_child_message($this->get_db_error_object());
            return false;
        }

        return true;
    }


}
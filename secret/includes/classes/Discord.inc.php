<?php
/**
 * Send Stuff to Discord
 * @author supermopf
 *
 */
class Discord extends DBHandler {

    private $ratelimitreset = 0;

	/**
	 * Send Webhook to our Discord
	 * @return bool
	 */
	private function sendWebhook($JSON, $webhook) {
		try{
            if($this->ratelimitreset > time()){
                sleep($this->ratelimitreset - time());
            }

			$send = curl_init($webhook);

			curl_setopt($send, CURLOPT_HTTPHEADER, array("Content-type: application/json"));
			curl_setopt($send, CURLOPT_POST, 1);
			curl_setopt($send, CURLOPT_POSTFIELDS, $JSON);
			curl_setopt($send, CURLOPT_FOLLOWLOCATION, 1);
			curl_setopt($send, CURLOPT_HEADER, 1);
			curl_setopt($send, CURLOPT_RETURNTRANSFER, 1);

			$response = curl_exec($send);
            $headerSize = curl_getinfo( $send , CURLINFO_HEADER_SIZE );
            $headerStr = substr( $response , 0 , $headerSize );

            // convert headers to array
            $headers = $this->headersToArray( $headerStr );

            $this->ratelimitreset = $headers['x-ratelimit-reset'];
            return true;
		}catch(Exception $exception){
			$this->error_object = new ErrorObject(ErrorObject::severity_error, $exception->getMessage());
		}
	}

    private function headersToArray( $str )
    {
        $headers = array();
        $headersTmpArray = explode( "\r\n" , $str );
        for ( $i = 0 ; $i < count( $headersTmpArray ) ; ++$i )
        {
            // we dont care about the two \r\n lines at the end of the headers
            if ( strlen( $headersTmpArray[$i] ) > 0 )
            {
                // the headers start with HTTP status codes, which do not contain a colon so we can filter them out too
                if ( strpos( $headersTmpArray[$i] , ":" ) )
                {
                    $headerName = substr( $headersTmpArray[$i] , 0 , strpos( $headersTmpArray[$i] , ":" ) );
                    $headerValue = substr( $headersTmpArray[$i] , strpos( $headersTmpArray[$i] , ":" )+1 );
                    $headers[$headerName] = $headerValue;
                }
            }
        }
        return $headers;
    }

    private function to_time_ago( $time )
    {
        // Calculate difference between current
        // time and given timestamp in seconds
        $diff = time() - $time;

        if( $diff < 1 ) {
            return 'less than 1 second ago';
        }

        $time_rules = array (
            12 * 30 * 24 * 60 * 60  => 'year',
            30 * 24 * 60 * 60       => 'month',
            24 * 60 * 60            => 'day',
            60 * 60                 => 'hour',
            60                      => 'minute',
            1                       => 'second'
        );

        foreach( $time_rules as $secs => $str ) {

            $div = $diff / $secs;

            if( $div >= 1 ) {

                $t = round( $div );

                return $t . ' ' . $str .
                    ( $t > 1 ? 's' : '' ) . ' ago';
            }
        }
    }

	public function SendAttackMessage($attacker,$attackercoords,$defender,$defendercoords,$arrivaltime, $Fleet, $FleetKnown) {
        $FleetString = "";
        $FleetTitle = "";
        $FlightString100 = "";
        $FlightString90 = "";
        $FlightString80 = "";
        $FlightString70 = "";
        $FlightString60 = "";
        $FlightString50 = "";
        $TechUpdate = "";
        $WaffenTech = "";
        $SchildTech = "";
        $PanzerTech = "";

        $query = "SELECT `waffentech`,`schildtech`,`rpz`,`vbt`,`impulse`,`hra`,`last_tech_update` FROM `players` WHERE `playername` = ";

        $query .= DB::getDB()->quote($attacker);

        $stmt = $this->query($query);
        if ($stmt) {
            while ($line = $stmt->fetch(PDO::FETCH_OBJ)) {
                //Techs
                $WaffenTech .= $line->waffentech;
                $SchildTech .= $line->schildtech;
                $PanzerTech .= $line->rpz;
                $TechUpdate .= $this->to_time_ago(strtotime($line->last_tech_update));

                //Flugzeit

                $FleetSpeed = [
                    "Kleine Transporter" => $line->impulse >= 5 ? 10000 * (1 + 0.2 * $line->impulse) : 5000 * (1 + 0.1 * $line->vbt),
                    "Große Transporter"  => 7500 * (1 + 0.1 * $line->vbt),
                    "Leichte Jäger"      => 12500 * (1 + 0.1 * $line->vbt),
                    "Schwere Jäger"      => 10000 * (1 + 0.2 * $line->impulse),
                    "Kreuzer"            => 15000 * (1 + 0.2 * $line->impulse),
                    "Schlachtschiffe"    => 10000 * (1 + 0.3 * $line->hra),
                    "Kolonieschiffe"     => 2500 * (1 + 0.2 * $line->impulse),
                    "Recyler"            => $line->impulse >= 17 ? 4000 * (1 + 0.2 * $line->impulse) : 2000 * (1 + 0.1 * $line->vbt), // TODO: Hyperaum
                    "Spionagesonden"     => 100000000 * (1 + 0.1 * $line->vbt),
                    "Bomber"             => $line->hra >= 8 ? 5000 * (1 + 0.3 * $line->hra) : 4000 * (1 + 0.1 * $line->impulse),
                    "Zerstörer"          => 5000 * (1 + 0.3 * $line->hra),
                    "Todesstern"         => 200 * (1 + 0.3 * $line->hra),
                    "Schlachtkreuzer"    => 10000 * (1 + 0.3 * $line->hra)
                ];

                $LowestSpeed = 90000000000;

                foreach ($Fleet as $ship => $amount){
                    if($amount > 0) {
                        if ($LowestSpeed > $FleetSpeed[$ship]) {
                            $LowestSpeed = $FleetSpeed[$ship];
                        }
                    }
                }

                //Distance
                if($attackercoords[0] == $defendercoords[0]){
                    //same galaxy
                    if($attackercoords[1] == $defendercoords[1]){
                        //same system
                        $Distance = abs($attackercoords[2] - $defendercoords[2])  * 5 + 1000;
                    }else{
                        //different system
                        $Distance = abs($attackercoords[1] - $defendercoords[1])  * 95 + 2700;
                    }
                }else{
                    //different galaxy
                    $Distance = abs($attackercoords[0] - $defendercoords[0]) * 20000;
                }

                $TripTime100 = floor((3500 / 1) * pow(($Distance * 10 / $LowestSpeed), 0.5) + 10);
                $TripTime90 = floor((3500 / 0.9) * pow(($Distance * 10 / $LowestSpeed), 0.5) + 10);
                $TripTime80 = floor((3500 / 0.8) * pow(($Distance * 10 / $LowestSpeed), 0.5) + 10);
                $TripTime70 = floor((3500 / 0.7) * pow(($Distance * 10 / $LowestSpeed), 0.5) + 10);
                $TripTime60 = floor((3500 / 0.6) * pow(($Distance * 10 / $LowestSpeed), 0.5) + 10);
                $TripTime50 = floor((3500 / 0.5) * pow(($Distance * 10 / $LowestSpeed), 0.5) + 10);

                $FlightTime100 = new DateTime($arrivaltime);
                $FlightTime90  = new DateTime($arrivaltime);
                $FlightTime80  = new DateTime($arrivaltime);
                $FlightTime70  = new DateTime($arrivaltime);
                $FlightTime60  = new DateTime($arrivaltime);
                $FlightTime50  = new DateTime($arrivaltime);

                $FlightTime100->modify('+'.$TripTime100.' seconds');
                $FlightTime90->modify('+'.$TripTime90.' seconds');
                $FlightTime80->modify('+'.$TripTime80.' seconds');
                $FlightTime70->modify('+'.$TripTime70.' seconds');
                $FlightTime60->modify('+'.$TripTime60.' seconds');
                $FlightTime50->modify('+'.$TripTime50.' seconds');

                $FlightString100 .= $FlightTime100->format('H:i:s');
                $FlightString90  .= $FlightTime90->format('H:i:s');
                $FlightString80  .= $FlightTime80->format('H:i:s');
                $FlightString70  .= $FlightTime70->format('H:i:s');
                $FlightString60  .= $FlightTime60->format('H:i:s');
                $FlightString50  .= $FlightTime50->format('H:i:s');

            }
        }

        if($FleetKnown == "true"){
            $HeaderMissing = true;
            foreach ($Fleet as $Ship=>$amount){
                if($amount > 0){
                    if($HeaderMissing){
                        $FleetTitle .= "Flotte";
                        $HeaderMissing = false;
                    }
                    $FleetString .= $Ship.': '.$amount.'\n';
                }
            }
        }else{
            $HeaderMissing = true;
            foreach ($Fleet as $Ship=>$amount){
                if($amount > 0){
                    if($HeaderMissing){
                        $FleetTitle .= "Flotte ($amount Schiffe)";
                        $HeaderMissing = false;
                    }
                    $FleetString .= $Ship.'\n';
                }
            }
        }

		$JSON = '{
					"username": "Walter Harriman",
					"avatar_url": "https://pr0game.gamerangerz.de/images/walter.png",
					"content": "",
					"embeds": [
					{
					  "author": {
						"name": "Eingehender Angriff",
						"icon_url": "https://www.iconsdb.com/icons/preview/soylent-red/warning-7-xxl.png"
					  },
					  "color": 13369344,
					  "fields": [
						{
						  "name": "Angreifer",
						  "value": "'.$attacker.' ['.$attackercoords[0].':'.$attackercoords[1].':'.$attackercoords[2].']",
						  "inline": true
						},
						{
						  "name": "Verteidiger",
						  "value": "'.$defender.' ['.$defendercoords[0].':'.$defendercoords[1].':'.$defendercoords[2].']",
						  "inline": true
						},
						{
						  "name": "Ankunft um",
						  "value": "'.$arrivaltime.'",
						  "inline": true
						},
						{
						  "name": "Letzter Scan",
						  "value": "'.$TechUpdate.'"
						},
						{
						  "name": "Waffentechnik",
						  "value": "'.$WaffenTech.'",
						  "inline": true
						},
						{
						  "name": "Schildtechnik",
						  "value": "'.$SchildTech.'",
						  "inline": true
						},
						{
						  "name": "Panzerung",
						  "value": "'.$PanzerTech.'",
						  "inline": true
						},
						{
						  "name": "'.$FleetTitle.'",
						  "value": "'.$FleetString.'"
						},
						{
						  "name": "Rückkehr 100%",
						  "value": "'.$FlightString100.'",
						  "inline": true
						},
						{
						  "name": "Rückkehr 90%",
						  "value": "'.$FlightString90.'",
						  "inline": true
						},
						{
						  "name": "Rückkehr 80%",
						  "value": "'.$FlightString80.'",
						  "inline": true
						},
						{
						  "name": "Rückkehr 70%",
						  "value": "'.$FlightString70.'",
						  "inline": true
						},
						{
						  "name": "Rückkehr 60%",
						  "value": "'.$FlightString60.'",
						  "inline": true
						},
				        {
						  "name": "Rückkehr 50%",
						  "value": "'.$FlightString50.'",
						  "inline": true
						},
						{
						  "name": "pr0game Aktion",
						  "value": "[Planet halten](https://pr0game.com/game.php?page=fleetTable&galaxy='.$defendercoords[0].'&system='.$defendercoords[1].'&planet='.$defendercoords[2].'&planettype=1&target_mission=5)"
						}
					  ]
					}
					]
				}';

			$this->sendWebhook($JSON, ATTACK_WEBHOOK);
			return true;
	}

	public function SendHeavyLossMessage($player,$statsbefore,$statsafter,$totalloss,$planets,$moonchance) {
        $planetsarray = explode(";",$planets);
        $planetsstring = "";
        foreach ($planetsarray as $prettyplanet){
            preg_match("/(\d+):(\d+):(\d+)/", $prettyplanet, $coords);
            $planetsstring .= "[".$prettyplanet."](https://pr0game.com/game.php?page=galaxy&galaxy=".$coords[1]."&system=".$coords[2].");";
        }
        $planetsstring = rtrim($planetsstring, ";");
		$JSON = '{
					"username": "Walter Harriman",
					"avatar_url": "https://pr0game.gamerangerz.de/images/walter.png",
					"content": "",
					"embeds": [
					{
					  "author": {
						"name": "Schwere Flottenverluste",
						"icon_url": "https://www.iconsdb.com/icons/preview/soylent-red/warning-19-xxl.png"
					  },
					  "color": 13369344,
					  "fields": [
					  	{
						  "name": "'.$player.'",
						  "value": "Punkte verloren: -'.$totalloss.' ('.$statsbefore.' -> '.$statsafter.')"
						},
						{
						  "name": "Planeten",
						  "value": "'.$planetsstring.'"
						},
						{
						  "name": "Mondchance",
						  "value": "'.$moonchance.'%"
						}
					  ]
					}
					]
				}';

			$this->sendWebhook($JSON, FLEETLOSS_WEBHOOK);
			return true;
	}

}
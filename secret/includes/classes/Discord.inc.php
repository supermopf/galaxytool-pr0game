<?php
/**
 * Send Stuff to Discord
 * @author supermopf
 *
 */
class Discord {

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

	public function SendAttackMessage($attacker,$attackercoords,$defender,$defendercoords,$arrivaltime, $Fleet, $FleetKnown) {
        $FleetString = "";

        if($FleetKnown == "true"){
            $HeaderMissing = true;
            foreach ($Fleet as $Ship=>$amount){
                if($amount > 0){
                    if($HeaderMissing){
                        $FleetString .= "Flotte besteht aus folgenden Schiffen:".'\n\n';
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
                        $FleetString .= "Flotte besteht aus $amount Schiffen folgender Typen:".'\n\n';
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
						  "value": "'.$arrivaltime.'"
						},
						{
						  "name": "pr0game Aktion",
						  "value": "[Planet halten](https://pr0game.com/game.php?page=fleetTable&galaxy='.$defendercoords[0].'&system='.$defendercoords[1].'&planet='.$defendercoords[2].'&planettype=1&target_mission=5)"
						},
						{
						  "name": "Flotte",
						  "value": "'.$FleetString.'"
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
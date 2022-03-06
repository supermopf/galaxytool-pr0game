<?php
/**
 * Send Stuff to Discord
 * @author supermopf
 *
 */
class Discord {	
	/**
	 * Send Webhook to our Discord
	 * @return bool
	 */
	public static function sendWebhook($JSON, $webhook) {
		try{
			$send = curl_init($webhook);

			curl_setopt($send, CURLOPT_HTTPHEADER, array("Content-type: application/json"));
			curl_setopt($send, CURLOPT_POST, 1);
			curl_setopt($send, CURLOPT_POSTFIELDS, $JSON);
			curl_setopt($send, CURLOPT_FOLLOWLOCATION, 1);
			curl_setopt($send, CURLOPT_HEADER, 0);
			curl_setopt($send, CURLOPT_RETURNTRANSFER, 1);
			
			return curl_exec($send);
			
		}catch(Exception $exception){
			$this->error_object = new ErrorObject(ErrorObject::severity_error, $exception->getMessage());
		}
	}
	
	public static function SendAttackMessage($attacker,$attackercoords,$defender,$defendercoords,$arrivaltime) {
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
						  "name": "Ankunft um:",
						  "value": "'.$arrivaltime.'"
						}
					  ]
					}
					]
				}';
				
			Discord::sendWebhook($JSON, ATTACK_WEBHOOK);
			return true;
	}
	
	public static function SendHeavyLossMessage($player,$statsbefore,$statsafter,$totalloss,$planets) {
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
						  "value": "'.$planets.'"
						}
					  ]
					}
					]
				}';
				
			Discord::sendWebhook($JSON, FLEETLOSS_WEBHOOK);
			return true;
	}
	
}
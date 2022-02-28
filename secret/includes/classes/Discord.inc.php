<?php
/**
 * Send Stuff to Discord
 * @author supermopf
 *
 */
class Discord {
	
	private static $webhook = "";
	
	/**
	 * Send Webhook to our Discord
	 * @return bool
	 */
	public static function sendWebhook($JSON) {
		try{
			
			$send = curl_init(Discord::$webhook);

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
				
			Discord::sendWebhook($JSON);
			return true;
	}
	
}
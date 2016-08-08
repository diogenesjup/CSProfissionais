<?php 
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT');

$address = "Brasil+Carapicuiba";
$url = "http://maps.google.com/maps/api/geocode/json?address=$address&sensor=false&region=Brasil";

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
curl_setopt($ch, CURLOPT_PROXYPORT, 3128);
curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 0);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, 0);
$response = curl_exec($ch);
curl_close($ch);
$response_a = json_decode($response);
echo $lat = $response_a->results[0]->geometry->location->lat;
echo "<br />";
echo $long = $response_a->results[0]->geometry->location->lng;
//echo "<br><br>";
//print_r($response_a);

?>
<?php 
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT');

$json_file = file_get_contents("http://api.mdanave.com.br/api/especializacao/listar");   
$json_str = json_decode($json_file, true);


echo $json_str["Data"]["List"][0]["Nome"];

?>
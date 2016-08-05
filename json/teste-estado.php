<?php 


$estados_API = file_get_contents('http://api.csprofissionais.com.br/api/Estado/Listar');
$json_estados = json_decode($estados_API, true);

//echo $json_estados["Data"]["List"][0]["Sigla"];

echo count($json_estados["Data"]["List"]);

 ?>
<?php 
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT');

$estados_API = file_get_contents('http://api.csprofissionais.com.br/api/especializacao/listar');
$json_estados = json_decode($estados_API, true);

//echo $json_estados["Data"]["List"][0]["Sigla"];


$tot_estados = count($json_estados["Data"]["List"]);

$flag = 0;

echo "<option value=''>", "Selecione um item </option>";

while($flag<$tot_estados):

	echo "<option value='", $json_estados["Data"]["List"][$flag]["Nome"], "'>", $json_estados["Data"]["List"][$flag]["Nome"], "</option>";

	$flag++;

endwhile;


 ?>
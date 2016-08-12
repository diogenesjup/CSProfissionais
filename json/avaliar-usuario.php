<?php 
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT');

$rating = $_POST["rating"];
$idCliente = $_POST["idCliente"];
$idPro = $_POST["idPro"];


$postdata2 = http_build_query(
    array(
        'ProfissionalId' => $idPro,
        'ClienteId' => $idCliente,
        'Nota' => $rating
    )
);

$opts2 = array('http' =>
    array(
        'method'  => 'POST',
        'header'  => 'Content-type: application/x-www-form-urlencoded',
        'content' => $postdata2
    )
);

$context2  = stream_context_create($opts2);

$result2 = file_get_contents('http://api.csprofissionais.com.br/api/profissional/QualificacaoProfissional', false, $context2);
$json_str2 = json_decode($result2, true);

?>
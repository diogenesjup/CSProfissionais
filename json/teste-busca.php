<?php 

    $ClienteId = "16";
    $Radius = "6371";
    $Dist = "25";
    $EspecializacaoId = "Analista de Sistemas";


$postdata = http_build_query(
    array(
        'ClienteId' => $ClienteId,
        'Radius' => $Radius,
        'Dist' => $Dist,
        'EspecializacaoId' => $EspecializacaoId
    )
);

$opts = array('http' =>
    array(
        'method'  => 'POST',
        'header'  => 'Content-type: application/x-www-form-urlencoded',
        'content' => $postdata
    )
);

$context  = stream_context_create($opts);

$result = file_get_contents('http://api.csprofissionais.com.br/api/profissional/listarporlatlon', false, $context);
$json_str = json_decode($result, true);

print_r($json_str);

 ?>
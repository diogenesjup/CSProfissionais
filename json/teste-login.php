<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT'); 
session_start();

$email = "luiz@teste.com";
$senha = "123456";

$postdata = http_build_query(
    array(
        'email' => $email,
        'senha' => $senha
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

$result = file_get_contents('http://api.csprofissionais.com.br/api/cliente/Login', false, $context);
$json_str = json_decode($result, true);


echo '<pre>'.print_r($json_str, true).'</pre>';


?>
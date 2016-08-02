<?php 
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT');
session_start();

$key = $_GET["chave"];

require("conexao.php");

$sql = "SELECT * FROM usuario WHERE email = '$key'";
$result = $PDO->query( $sql );
$usuario = $result->fetchAll( PDO::FETCH_ASSOC );

if($usuario[0]["logado"]=="cliente"){
	echo "logado";
}else{
	echo "não logado";
}


?>

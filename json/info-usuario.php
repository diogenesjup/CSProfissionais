<?php 
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT');
session_start();

$info = $_GET["valor"];
$chave = $_GET["chave"];

require("conexao.php");

$sql = "SELECT * FROM usuario WHERE email = '$chave'";
$result = $PDO->query( $sql );
$usuario = $result->fetchAll( PDO::FETCH_ASSOC );

// DEVOLVER VALOR REQUISITADO

if($info=="ClienteId") echo $usuario[0]["clietid"];
if($info=="Nome") echo $usuario[0]["nome"];
if($info=="TelefoneFixo") echo $usuario[0]["telfixo"];
if($info=="TelefoneCelular") echo $usuario[0]["telcelular"];
if($info=="Email") echo $usuario[0]["email"];
if($info=="Cpf") echo $usuario[0]["cpf"];
if($info=="CidadeId") echo $usuario[0]["cidade"];
if($info=="NomeRua") echo $usuario[0]["nomerua"];
if($info=="Numero") echo $usuario[0]["numero"];
if($info=="Complemento") echo $usuario[0]["complemento"];
if($info=="Bairro") echo $usuario[0]["bairro"];
if($info=="Cep") echo $usuario[0]["cep"]; 
if($info=="Lat") echo $usuario[0]["lat"]; 
if($info=="Lon") echo $usuario[0]["lon"];  

?>
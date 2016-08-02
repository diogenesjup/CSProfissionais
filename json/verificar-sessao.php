<?php 
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT');
session_start();

if($_SESSION["logado"]=="cliente"){
	echo "logado";
}else{
	echo "logado";
}

?>

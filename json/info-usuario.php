<?php 
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT');
session_start();

$info = $_GET["valor"];

   // DEVOLVER VALOR REQUISITADO
   echo $_SESSION[$info];

?>
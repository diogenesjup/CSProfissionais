<?php 

$teste = $_POST["teste"];
$teste2 = $_POST["teste2"];
$endereco = $_POST["endereco"];

echo "Valor teste: ", $teste, "<br>";
echo "Valor teste 2: ", $teste2, "<br>";
echo "Valor teste 3: ", $endereco["cep"], "<br>";

 ?>
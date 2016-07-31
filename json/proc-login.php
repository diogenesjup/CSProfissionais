<?php 
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT');
session_start();

$email = $_POST["email"];
$senha = $_POST["senha"];

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

if($json_str!=""):
    
    // Valores retornados
	// ClienteId, Nome, TelefoneFixo, TelefoneCelular, Email, Cpf, Senha, Endereco, CidadeId, Nome, Numero, Complemento, Bairro, Cep

	$_SESSION["logado"] = "cliente";
	$_SESSION["ClienteId"] = $json_str["Data"]["ClienteId"];
	$_SESSION["Nome"] = $json_str["Data"]["Nome"];
	$_SESSION["TelefoneFixo"] = $json_str["Data"]["TelefoneFixo"];
	$_SESSION["TelefoneCelular"] = $json_str["Data"]["TelefoneCelular"];
	$_SESSION["Email"] = $json_str["Data"]["Email"];
	$_SESSION["Cpf"] = $json_str["Data"]["Cpf"];
	$_SESSION["CidadeId"] = $json_str["Data"]["Endereco"]["CidadeId"];
	$_SESSION["NomeRua"] = $json_str["Data"]["Endereco"]["Nome"];
	$_SESSION["Numero"] = $json_str["Data"]["Endereco"]["Numero"];
	$_SESSION["Complemento"] = $json_str["Data"]["Endereco"]["Complemento"];
	$_SESSION["Bairro"] = $json_str["Data"]["Endereco"]["Bairro"];
	$_SESSION["Cep"] = $json_str["Data"]["Endereco"]["Cep"];

else:
    
    $_SESSION["logado"] = "não logado";
    echo "Login não encontrado"; 

endif;


?>
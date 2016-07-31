<?php 

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT');

session_start();

$nome = $_POST["nome"];
$cep  = $_POST["cep"];
$cpf = $_POST["cpf"];
$email = $_POST["email"];
$senha = $_POST["senha"];


$postdata = http_build_query(
    array(
        'nome' => $nome,
        'cpf' => $cpf,
        'email' => $email,
        'senha' => $senha
        //'endereco[cep]' => $cep
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

$result = file_get_contents('http://api.csprofissionais.com.br/api/cliente/inserir', false, $context);
$json_str = json_decode($result, true);
print_r($json_str);
echo "fim execução";

// DEPOIS DO LOGIN, VAMOS LOGAR ESSE USUÁRIO

$postdata2 = http_build_query(
    array(
        'email' => $email,
        'senha' => $senha
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

$result2 = file_get_contents('http://api.csprofissionais.com.br/api/cliente/Login', false, $context2);
$json_str2 = json_decode($result2, true);

if($json_str2!=""):
    
    //
    // Valores retornados
	// ClienteId, Nome, TelefoneFixo, TelefoneCelular, Email, Cpf, Senha, Endereco, CidadeId, Nome, Numero, Complemento, Bairro, Cep
    // Como é um novo cadastro, ainda não temos todos os campos
    //

	$_SESSION["logado"] = "cliente";
	$_SESSION["ClienteId"] = $json_str["Data"]["ClienteId"];
	$_SESSION["Nome"] = $json_str["Data"]["Nome"];
	$_SESSION["Email"] = $json_str["Data"]["Email"];
	$_SESSION["Cpf"] = $json_str["Data"]["Cpf"];
	$_SESSION["Cep"] = $json_str["Data"]["Endereco"]["Cep"]; 

else:
    
    $_SESSION["logado"] = "não logado";
    echo "Login não encontrado"; 

endif;


?>
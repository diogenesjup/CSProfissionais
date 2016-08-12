<?php 
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT');

$id = $_POST["id"];
$nome = $_POST["nome"];
$cpf = $_POST["cpf"];
$email = $_POST["email"];
$telefone = $_POST["telefone"];
$celular = $_POST["celular"];
$endereco = $_POST["endereco"];
$numero = $_POST["numero"];
$bairro = $_POST["bairro"];

$cep = $_POST["cep"];
$senha = $_POST["senha"];

$postdata = http_build_query(
	
    array(
        'clienteid' => $id,
        'nome' => $nome,
        'telefonefixo' => $telefone,
        'telefonecelular' => $celular,
        'email' => $email,
        'cpf' => $cpf,
        'senha' => $senha,
        'endereco' => array('Nome' => $enderecoNome, 'Numero' => $Numero, 'Bairro' => $Bairro, 'Cep' => $Cep);        
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

$result = file_get_contents('http://api.csprofissionais.com.br/api/cliente/Editar', false, $context);
$json_str = json_decode($result, true);


?>
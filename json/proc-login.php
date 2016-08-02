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

    require("conexao.php");

	$logado = "cliente";
	$ClienteId = $json_str["Data"]["ClienteId"];
	$Nome = $json_str["Data"]["Nome"];
	$TelefoneFixo = $json_str["Data"]["TelefoneFixo"];
	$TelefoneCelular = $json_str["Data"]["TelefoneCelular"];
	$Email = $json_str["Data"]["Email"];
	$Cpf = $json_str["Data"]["Cpf"];
	$CidadeId = $json_str["Data"]["Endereco"]["CidadeId"];
	$NomeRua = $json_str["Data"]["Endereco"]["Nome"];
	$Numero = $json_str["Data"]["Endereco"]["Numero"];
	$Complemento = $json_str["Data"]["Endereco"]["Complemento"];
	$Bairro = $json_str["Data"]["Endereco"]["Bairro"];
	$Cep = $json_str["Data"]["Endereco"]["Cep"];
	$lat = $json_str["Data"]["Endereco"]["Latitude"];
	$lon = $json_str["Data"]["Endereco"]["Longitude"];

	$sql = "INSERT INTO usuario(logado,nome,telfixo,telcelular,email,cpf,cidade,nomerua,numero,complemento,bairro,cep,lat,lon,clietid) VALUES(:logado,:nome,:telfixo,:telcelular,:email,:cpf,:cidade,:nomerua,:numero,:complemento,:bairro,:cep,:lat,:lon,:clietid)";
	$stmt = $PDO->prepare( $sql );
	
	$stmt->bindParam( ':logado', $logado );
	$stmt->bindParam( ':nome', $Nome );
	$stmt->bindParam( ':telfixo', $TelefoneFixo );
	$stmt->bindParam( ':telcelular', $TelefoneCelular );
	$stmt->bindParam( ':email', $Email );
	$stmt->bindParam( ':cpf', $Cpf );
	$stmt->bindParam( ':cidade', $CidadeId );
	$stmt->bindParam( ':nomerua', $NomeRua );
	$stmt->bindParam( ':numero', $Numero );
	$stmt->bindParam( ':complemento', $Complemento );
	$stmt->bindParam( ':bairro', $Bairro );
	$stmt->bindParam( ':cep', $Cep );
	$stmt->bindParam( ':lat', $lat );
	$stmt->bindParam( ':lon', $lon );
	$stmt->bindParam( ':clietid', $ClienteId );
	 
	$result = $stmt->execute();	

else:
    
    $logado = "não logado";
    echo "Login não encontrado"; 

endif;

?>
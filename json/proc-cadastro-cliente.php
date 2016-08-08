<?php 

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT');

session_start();

$Nome = $_POST["nome"];
$Cep  = $_POST["cep"];
$Cpf = $_POST["cpf"];
$Email = $_POST["email"];
$Senha = $_POST["senha"];
$Estado = $_POST["estado"];
$Cidade = $_POST["cidade"];

$gmap_estado = $estado;
$gmap_cidade = $cidade;

// BUSCAR LISTA DE ESTADOS E CIDADES PARA PEGAR O ID DA CIDADE
//
// ESTADOS
//
$estados_API = file_get_contents('http://api.csprofissionais.com.br/api/Estado/Listar');
$json_estados = json_decode($estados_API, true);

$tot_estados = count($json_estados["Data"]["List"]);

$flagEstados = 0;

while($flagEstados<$tot_estados):
  
  if($json_estados["Data"]["List"][$flagEstados]["Sigla"] == $Estado) $Estado = $json_estados["Data"]["List"][$flagEstados]["EstadoId"];
  $flagEstados++;

endwhile;
//
// CIDADES
//
$cidades_API = file_get_contents('http://api.csprofissionais.com.br/api/Cidade/Listar/'.$Estado);
$json_cidades = json_decode($cidades_API, true);

$tot_cidades = count($json_cidades["Data"]["List"]);

$flagCidades = 0;

while($flagCidades<$tot_cidades):
  
  if($json_cidades["Data"]["List"][$flagCidades]["Nome"] == $Cidade && $json_cidades["Data"]["List"][$flagCidades]["EstadoId"] == $Estado) $Cidade = $json_cidades["Data"]["List"][$flagCidades]["CidadeId"];
  $flagCidades++;

endwhile;
//
//
// FIM BUSCA ESTADOS / CIDADES
//
//

$TelefoneFixo = "00000000";
$TelefoneCelular = "00000000";

$Endereco = "N/A";
$CidadeId = $Cidade;
$enderecoNome = "N/A";
$Numero = "N/A";
$Complemento = "N/A";
$Bairro = "N/A";

$gmap_cidade = str_replace(" ", "", $gmap_cidade);
$address = $gmap_estado."+".$gmap_cidade;
$url = "http://maps.google.com/maps/api/geocode/json?address=$address&sensor=false&region=Brasil";

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, $url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
curl_setopt($ch, CURLOPT_PROXYPORT, 3128);
curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 0);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, 0);
$response = curl_exec($ch);
curl_close($ch);
$response_a = json_decode($response);

$Latitude = $response_a->results[0]->geometry->location->lat;
$Longitude = $response_a->results[0]->geometry->location->lng;

if($Latitude=="" || $Longitude==""){
    $Latitude = "-25.2912987";
    $Longitude = "-25.2912987";
}

$postdata = http_build_query(
    array(

        'nome' => $Nome,
        'cpf' => $Cpf,
        'email' => $Email,
        'senha' => $Senha,
        'endereco' => array('CidadeId' => $CidadeId, 'Nome' => $enderecoNome, 'Numero' => $Numero, 'Complemento' => $Complemento, 'Bairro' => $Bairro, 'Cep' => $Cep, 'Latitude' => $Latitude, 'Longitude' => $Longitude )
        
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
        'email' => $Email,
        'senha' => $Senha
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

    require("conexao.php");
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
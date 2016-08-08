<?php 

header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT');

$tipo = $_GET["tipo"];
$cep = $_GET["cep"];
$lat = $_GET["lat"];
$lon = $_GET["lon"];

$clienteid =  $_GET["idcliente"];
$radius = "6371";
$dist = "25";

$postdata = http_build_query(
    array(
        'ClienteId' => $clienteid,
        'Radius' => $radius,
        'Dist' => $dist,
        'EspecializacaoId' => $tipo
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

$result = file_get_contents('http://api.csprofissionais.com.br/api/profissional/listarporlatlon', false, $context);
$json_str = json_decode($result, true);

//echo '<pre>'.print_r($json_str, true).'</pre>';

/*

O ARRAY RETORNADO TRARÁ:

ProfissionalId = id único do profissional
Nome           = nome do profissional
NomeFoto       = link da foto do profissional
Celular        = celular de contato do profissional
Latitude       = latitude da localização do profissional
Longitude      = longitude da localização do profisssional
NroEstrela     = número de estrelas do profissional

*/

// PEGAR O TOTAL DE PROFISSIONAIS RETORNADOS
$tot_profissionais = count($json_str["Data"]["List"]);



 ?>




<div class="container" style="padding-bottom:65px;">

     <div class="row">


<?php 


// LOOP PARA A IMPRESSÃO DOS RESULTADOS

$imp = 0;

while($imp<$tot_profissionais):

?>     

         <div class="col-sm-12 col-xs-12 text-left user-preview">         
	             <h5><?php echo $json_str["Data"]["List"][$imp]["Nome"]; ?></h5>
	             <span>
                     <?php 
                     
                     $estrelas = 0;
                     while($estrelas<$json_str["Data"]["List"][$imp]["NroEstrela"]):

                     ?> 
		             <i class="fa fa-star" aria-hidden="true"></i>
		             <?php 
                     
                     $estrelas++;
                     endwhile;

		             ?>
	             </span>
	             <p>
	             <i class="fa fa-phone" aria-hidden="true"></i> <?php echo $json_str["Data"]["List"][$imp]["Celular"]; ?>&nbsp;             
	             </p>
	             </p>
	             <p class="btn-detalhe"><a href="detalhes-user.html?idUsuario=<?php echo $json_str["Data"]["List"][$imp]["ProfissionalId"]; ?>" class="btn btn-primary">DETALHES</a></p>
         </div>


<?php 

$imp++;
endwhile;

if($tot_profissionais<=0):

?>         

<h4>Nenhum resultado encontrado para o seu critério de pesquisa</h4>

<?php

endif;

 ?>
        

         <div class="col-sm-12 col-xs-12 text-center user-preview" id="areaBannerAnuncio3">
             <a href="#">
                 <img src="http://www.csprofissionais.com.br/upload/11072016234342Anu1.png" />
             </a>
         </div>

     </div>



</div>
<!-- WORK -->
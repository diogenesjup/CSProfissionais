<?php 
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT');

$profissional = $_GET["profissional"];

$json_file = file_get_contents("http://api.csprofissionais.com.br/api/profissional/obter/".$profissional);   
$json_str = json_decode($json_file, true);

//echo '<pre>'.print_r($json_str, true).'</pre>';

/*

{
  "Data": {
    "ProfissionalId": 29,
    "Nome": "Fernando batista",
    "NomeFoto": "57af7a20-bb03-4cb5-82c2-aa9c346524acAmado.jpg",
    "TelefoneCelular": "1192323233",
    "Telefonefixo": "1122222226",
    "Email": "fernando@teste.com",
    "Descricao:" "Trabalho a mais de 10 anos com desenvolvimento\r\n<br>Alta tecnologia\r\nAplicações mobiles e web",
    "NroEstrela": 0,
    "AceitaRegistro": false,
    "Destaque": false,
    "Endereco": {
      "CidadeId": 9422,
      "Nome": "Praça Gelson Reicher",
      "Numero": 22,
      "Complemento": "",
      "Bairro": "Jardim da Glória",
      "Cep": "01545100",
      "Latitude": "-23.5820807",
      "Longitude": "-46.6168111"
    },
    "Especializacao": [
      {
        "EspecializacaoId": 1,
        "Nome": "Analista de Sistemas",
        "GrupoespecializacaoId": 1
      }
    ]
  },
  "Errors": []
}

*/
?><div class="row">
         <div class="col-sm-12 col-xs-12 text-left user-preview">
             <img src="http://www.csprofissionais.com.br/upload/<?php echo $json_str["Data"]["NomeFoto"]; ?>" class="<?php echo $json_str["Data"][0]["Nome"]; ?>" style="width:40%;float:left;margin-right:14px;margin-bottom:14px;" />
             <h4><?php echo $json_str["Data"]["Nome"]; ?></h4>
             <span>
                      <?php 
                     
                     $estrelas = 0;
                     while($estrelas<$json_str["Data"]["NroEstrela"]):

                     ?> 
		             <i class="fa fa-star" aria-hidden="true"></i>
		             <?php 
                     
                     $estrelas++;
                     endwhile;

		             ?>
                 </span>

             
             <p>&nbsp;</p>
           
             <p> <i class="fa fa-phone" aria-hidden="true"></i> <?php echo $json_str["Data"]["TelefoneCelular"]; ?>, <?php echo $json_str["Data"]["Telefonefixo"]; ?></p>
           
             <p><b>Endereço:</b> <?php echo  $json_str["Data"]["Endereco"]["Nome"], " ",$json_str["Data"]["Endereco"]["Numero"], " - ", $json_str["Data"]["Endereco"]["Complemento"], $json_str["Data"]["Endereco"]["Bairro"];  ?><br>                          
             </p>
             <hr />
             <p><b>Sobre:</b> <?php echo $json_str["Data"]["Descricao"]; ?></p>
             <hr />

             <p>
                 <a href="#" class="btn btn-default" data-toggle="modal" data-target="#ultimosTrabalhos" onclick="buscarUltimosTrabalhos(<?php echo $profissional; ?>)">Ver últimos trabalhos</a>
             </p>
             <!--<p>
                 <a href="mensagens.html" class="btn btn-default">Enviar mensagem</a>
             </p>-->
             <p>
                 <a href="#" class="btn btn-default" data-toggle="modal" data-target="#avaliarUsuario">Avaliar esse usuário</a>
             </p>
             <p>
                 <a href="#" class="btn btn-default" onclick="solicContato();" >Solicitar Contato</a>
             </p>
             <p>
                 <a href="#" class="btn btn-primary" style="width:100%;" data-toggle="modal" data-target="#verComentarios"><i class="fa fa-star" aria-hidden="true"></i> Ver comentários</a>
             </p>
            
         </div>         

         <div class="col-sm-12 col-xs-12 text-center user-preview" id="areaBannerAnuncio3">
             <a href="#">
                 <img src="http://www.csprofissionais.com.br/upload/11072016234342Anu1.png" />
             </a>
         </div>

     </div>
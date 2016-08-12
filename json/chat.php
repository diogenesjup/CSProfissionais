<?php 
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT');

$cliente = $_GET["cliente"];


$result = file_get_contents('http://api.csprofissionais.com.br/api/mensagem/ListProfissionaisMensagemCliente/'.$cliente);
$json_str = json_decode($result, true);


// PEGAR O TOTAL DE PROFISSIONAIS RETORNADOS
$tot_msg = count($json_str["Data"]["List"]);


if($tot_msg==0):

?>

<li style="padding:10px;color:#ff0000;"><p><i>Nenhuma mensagem encontrada</i></p></li>   

<?php 

endif;


if($tot_msg!=0):

    $g = 0;

while($g<$tot_msg):

?>



<li class="list-group-item">
                        <div class="row">
                            <div class="col-xs-2 col-md-1">
                                <img src="http://www.csprofissionais.com.br/upload/73894207-5f4e-488c-a72a-65294f59215cJuniorBaiano.jpg" class="img-circle img-responsive" alt="" /></div>
                            <div class="col-xs-10 col-md-11">
                                <div>
                                <?php $id_pro = $json_str["Data"]["List"][$g]["ProfissionalId"]; ?>
                                    <a href="msg.html?profissional=<?php echo $id_pro; ?>">
                                    
                                    <?php
                                    
                                    echo $json_str["Data"]["List"][$g]["Nome"]; 

                                    ?>

                                    </a>
                                    <div class="mic-info">
                                        
                                    </div>
                                </div>
                                <div class="comment-text">
                                    clique para abrir a mensagem
                                </div>
                               
                        
      <a href="msg.html" class="btn btn-xs btn-default" style="width:auto;"><span class="glyphicon glyphicon-share-alt" style="padding-right:3px;"></span>visualizar</a>
      
      
                              
                            </div>
                        </div>
                    </li>



<?php 

$g++;

endwhile;

endif;


?>                    
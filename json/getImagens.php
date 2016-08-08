<?php 
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, PUT');

$profissional = $_GET["profissional"];

$json_file = file_get_contents("http://api.csprofissionais.com.br/api/profissional/ObterImagens/".$profissional);   
$json_str = json_decode($json_file, true);


$flag = 0;

$tot_imagens = count($json_str["Data"]["Imagens"]);

while($flag<$tot_imagens):

 ?>

        <p>
        <img src="http://www.csprofissionais.com.br/upload/<?php echo $json_str["Data"]["Imagens"][$flag]["Nome"]; ?>" class="img-responsive" alt="<?php echo $json_str["Data"]["Imagens"][$flag]["Descricao"]; ?>" />
        </p>

<?php 

$flag++;

endwhile;

?>        



           
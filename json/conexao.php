<?php 

define( 'MYSQL_HOST', 'localhost' );
define( 'MYSQL_USER', 'diogenes_cspro' );
define( 'MYSQL_PASSWORD', 'Q862nGF2AT%Z' );
define( 'MYSQL_DB_NAME', 'diogenes_csprofissionais' );



try
{
    $PDO = new PDO( 'mysql:host=' . MYSQL_HOST . ';dbname=' . MYSQL_DB_NAME, MYSQL_USER, MYSQL_PASSWORD );
}
catch ( PDOException $e )
{
    echo 'Erro ao conectar com o MySQL: ' . $e->getMessage();
}



?>
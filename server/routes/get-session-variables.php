<?php 

require_once "../database/connect_db.php";

function getSessionInfo($db)
{
    session_start();
    $_SESSION['uuid'] = '22051104';
    $_SESSION['username'] = 'asyarb';

    $array = array();
    $array['uuid'] = $_SESSION['uuid'];
    $array['username'] = $_SESSION['username'];

    return json_encode($array);
}

echo getSessionInfo($mysqli);
?>
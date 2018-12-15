<?php 

function getSessionInfo()
{
    session_start();
    $_SESSION['uuid'] = '22051104';
    $_SESSION['username'] = 'asyarb';

    $array = array();
    $array['uuid'] = $_SESSION['uuid'];
    $array['username'] = $_SESSION['username'];

    return json_encode($array);
}

echo getSessionInfo();
?>
<?php 
session_start();
include "./do_auth.php";

if (isset($_SESSION["host"])) {
    $host = $_SESSION["host"];
} else {
    $host = "https://www.hawaii.edu/help/hdsupport/";
}

function getSessionInfo()
{
    $array = array();
    $array['uuid'] = $_SESSION['uuid'];
    $array['username'] = $_SESSION['username'];

    return json_encode($array);
}

echo getSessionInfo();
?>
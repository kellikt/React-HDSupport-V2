<?php

ini_set('session.gc_maxlifetime', 14400);
session_set_cookie_params(14400);

session_start();
include "./do_auth.php";

if (isset($_SESSION["host"])) {
    $host = $_SESSION["host"];
} else {
    $host = "https://www.hawaii.edu/help/hdsupport/";
}

function deleteHoliday($db, $timestamp)
{
    $stmt = $db->prepare("DELETE FROM holidays WHERE date = ? LIMIT 1");
    $stmt->bind_param("i", $timestamp);
    $stmt->execute();
    $stmt->close();

    return true;
}

$_POST = json_decode(file_get_contents("php://input"), true);
echo deleteHoliday($mysqli, $_POST['timestamp']);

?>
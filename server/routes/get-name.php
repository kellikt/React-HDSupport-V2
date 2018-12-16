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

function getName($db, $id)
{
    $stmt = $db->prepare("SELECT first_name, last_name, expired FROM users WHERE uuid=?");
    $stmt->bind_param("s", $id);
    $stmt->execute();
    $array = $stmt->get_result()->fetch_assoc();

    $stmt->close();

    return json_encode($array);
}

echo getName($mysqli, $_GET['uuid']);

?>
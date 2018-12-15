<?php 

session_start();
include "./do_auth.php";

if (isset($_SESSION["host"])) {
    $host = $_SESSION["host"];
} else {
    $host = "https://www.hawaii.edu/help/hdsupport/";
}

function getUsername($db, $id)
{
    $stmt = $db->prepare("SELECT username FROM users WHERE uuid=?");
    $stmt->bind_param("s", $id);
    $stmt->execute();
    $array = $stmt->get_result()->fetch_assoc();

    $stmt->close();

    return json_encode($array);
}

echo getUsername($mysqli, $_GET['uuid']);

?>
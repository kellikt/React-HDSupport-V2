<?php

session_start();
include "./do_auth.php";

if (isset($_SESSION["host"])) {
    $host = $_SESSION["host"];
} else {
    $host = "https://www.hawaii.edu/help/hdsupport/";
}

function deleteBadge($db, $bid) 
{
    $stmt = $db->prepare("DELETE FROM badges WHERE bid=? LIMIT 1");
    $stmt->bind_param("s", $bid);
    $stmt->execute();
    $stmt->close();

    return true;
}

$_POST = json_decode(file_get_contents("php://input"), true);
echo deleteBadge($mysqli, $_POST['bid']);

?>
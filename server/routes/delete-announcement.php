<?php

session_start();
include "./do_auth.php";

if (isset($_SESSION["host"])) {
    $host = $_SESSION["host"];
} else {
    $host = "https://www.hawaii.edu/help/hdsupport/";
}

function deleteAnnouncement($db, $anid) 
{
    $stmt = $db->prepare("DELETE FROM announcements WHERE anid=? LIMIT 1");
    $stmt->bind_param("i", $anid);
    $stmt->execute();
    $stmt->close();

    return true;
}

$_POST = json_decode(file_get_contents("php://input"), true);
echo deleteAnnouncement($mysqli, $_POST['anid']);

?>
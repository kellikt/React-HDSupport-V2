<?php

session_start();
include "./do_auth.php";

if (isset($_SESSION["host"])) {
    $host = $_SESSION["host"];
} else {
    $host = "https://www.hawaii.edu/help/hdsupport/";
}

function deleteStudentBadge($db, $bid, $uid)
{
    $stmt = $db->prepare("DELETE FROM badge_log WHERE bid=? AND uid=? LIMIT 1");
    $stmt->bind_param("ss", $bid, $uid);
    $stmt->execute();
    $stmt->close();

    return true;
}

$_POST = json_decode(file_get_contents("php://input"), true);
echo deleteStudentBadge($mysqli, $_POST['bid'], $_POST['uid']);

?>
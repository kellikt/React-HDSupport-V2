<?php

session_start();
include "./do_auth.php";

if (isset($_SESSION["host"])) {
    $host = $_SESSION["host"];
} else {
    $host = "https://www.hawaii.edu/help/hdsupport/";
}

function deleteLeaveRequest($db, $lid)
{
    $stmt = $db->prepare("DELETE FROM leave_requests WHERE lid = ?");
    $stmt->bind_param("i", $lid);
    $stmt->execute();
    $stmt->close();

    return true;
}

$_POST = json_decode(file_get_contents("php://input"), true);
echo deleteLeaveRequest($mysqli, $_POST['lid']);

?>
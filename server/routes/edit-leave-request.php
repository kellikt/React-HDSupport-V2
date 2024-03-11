<?php

session_start();
include "./do_auth.php";

if (isset($_SESSION["host"])) {
    $host = $_SESSION["host"];
} else {
    $host = "https://www.hawaii.edu/help/hdsupport/";
}

function editLeaveRequest($db, $lid, $beginDate, $endDate, $comment, $status, $staffComment)
{
    $stmt = $db->prepare("UPDATE leave_requests
        SET begin_date = ?, end_date = ?, comment = ?, status = ?, staff_comment = ?
        WHERE lid = ?    
    ");
    $stmt->bind_param("sssisi", $beginDate, $endDate, $comment, $status, $staffComment, $lid);
    $stmt->execute();
    $stmt->close();

    return true;
}

$_POST = json_decode(file_get_contents("php://input"), true);
echo editLeaveRequest($mysqli, $_POST['lid'], $_POST['beginDate'], $_POST['endDate'], $_POST['comment'], $_POST['status'], $_POST['staffComment']);
?>
<?php
session_start();
include "./do_auth.php";

if (isset($_SESSION["host"])) {
    $host = $_SESSION["host"];
} else {
    $host = "https://www.hawaii.edu/help/hdsupport/";
}

function addLeaveRequest($db, $username, $beginDate, $endDate, $comment, $status) 
{   
    $checkUser = $db->prepare("SELECT uid FROM users WHERE username=?");
    $checkUser->bind_param("s", $username);
    $checkUser->execute();
    $result = $checkUser->get_result();
    if ($result->num_rows === 0) {
        $checkUser->close();
        return false;
    } else {
        $array = $result->fetch_assoc();
        $uid = $array["uid"];
        $checkUser->close();

        // check for duplicate request
        $checkDupe = $db->prepare("SELECT * FROM leave_requests WHERE uid=? AND begin_date=? and end_date=?");
        $checkDupe->bind_param("iss", $uid, $beginDate, $endDate);
        $checkDupe->execute();
        $result = $checkDupe->get_result();
        $checkDupe->close();
        if ($result->num_rows > 0) {
            return false;
        } else {
            $stmt = $db->prepare("INSERT INTO leave_requests (uid, begin_date, end_date, comment, status) VALUES (?, ?, ?, ?, ?)");
            $stmt->bind_param("ssssi", $uid, $beginDate, $endDate, $comment, $status);
            $stmt->execute();
            $stmt->close();

            return true;
        }
    }
}

$_POST = json_decode(file_get_contents("php://input"), true);
echo addLeaveRequest($mysqli, $_POST['username'], $_POST['beginDate'], $_POST['endDate'], $_POST['comment'], $_POST['status']);

?>
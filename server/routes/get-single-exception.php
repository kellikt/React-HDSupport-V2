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

function getSingleException($db, $date, $username)
{
    $final = array();

    $stmt = $db->prepare("SELECT * FROM exceptions WHERE date_tag = ? AND username= ?");
    $stmt->bind_param("ss", $date, $username);
    $stmt->execute();
    $result = $stmt->get_result();
    if ($result->num_rows === 0) {
        $array = array("t0" => "", "t1" => "", "t2" => "", "t3" => "", "t4" => "", "t5" => "", "eid" => "");
    } else {
        $array = $result->fetch_assoc();
    }

    $final[] = $array;
    $stmt->close();

    $splitDate = explode("/", $date);
    $month = $splitDate[0];
    $day = $splitDate[1];
    $year = $splitDate[2];

    $logStmt = $db->prepare("SELECT * FROM log WHERE username = ? AND month = ? AND day = ? AND year = ? ");
    $logStmt->bind_param("ssss", $username, $month, $day, $year);
    $logStmt->execute();
    $result = $logStmt->get_result();
    $logArray = array();
    while ($row = $result->fetch_assoc()) {
        $logArray[] = $row;
    }

    $final[] = $logArray;
    $final[] = $splitDate;

    $logStmt->close();

    return json_encode($final);
}

echo getSingleException($mysqli, $_GET['date'], $_GET['username']);

?>
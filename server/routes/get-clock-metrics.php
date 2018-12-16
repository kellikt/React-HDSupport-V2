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

function getClockMetrics($db, $username, $year, $month, $startDay, $endDay)
{
    $stmt = $db->prepare("SELECT logid, action, ampm, comments, hour, ip, min, month, day FROM log WHERE username = ? AND (year = ?) AND (month = ?) AND (day >= ? AND day <= ?)");
    $stmt->bind_param("ssiii", $username, $year, $month, $startDay, $endDay);
    $stmt->execute();
    $result = $stmt->get_result();
    $array = array();

    while ($row = $result->fetch_assoc()) {
        $array[] = $row;
    }

    $stmt->close();

    return json_encode($array);
}

$_POST = json_decode(file_get_contents("php://input"), true);
echo getClockMetrics($mysqli, $_POST['username'], $_POST["year"], $_POST["month"], $_POST["startDay"], $_POST["endDay"]);

?>
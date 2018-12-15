<?php 

session_start();
include "./do_auth.php";

if (isset($_SESSION["host"])) {
    $host = $_SESSION["host"];
} else {
    $host = "https://www.hawaii.edu/help/hdsupport/";
}

function addScheduleChange($db, $username, $reason, $startDate, $endDate)
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

        $stmt = $db->prepare("INSERT INTO old_schedule(uid, begin_date, end_date, notes) VALUES (?, ?, ?, ?)");
        $stmt->bind_param("ssss", $uid, $startDate, $endDate, $reason);
        $stmt->execute();
        $stmt->close();

        return true;
    }
}

$_POST = json_decode(file_get_contents("php://input"), true);
echo addScheduleChange($mysqli, $_POST['username'], $_POST['reason'], $_POST['startDate'], $_POST['endDate']);

?>
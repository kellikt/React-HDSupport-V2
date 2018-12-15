<?php 

session_start();
include "./do_auth.php";

if (isset($_SESSION["host"])) {
    $host = $_SESSION["host"];
} else {
    $host = "https://www.hawaii.edu/help/hdsupport/";
}

function deleteScheduleChange($db, $sid)
{
    $stmt = $db->prepare("DELETE FROM old_schedule WHERE sid = ?");
    $stmt->bind_param("s", $sid);
    $stmt->execute();
    $stmt->close();

    return true;
}

$_POST = json_decode(file_get_contents("php://input"), true);
echo deleteScheduleChange($mysqli, $_POST['sid']);

?>
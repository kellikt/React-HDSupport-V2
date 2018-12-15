<?php 

session_start();
include "./do_auth.php";

if (isset($_SESSION["host"])) {
    $host = $_SESSION["host"];
} else {
    $host = "https://www.hawaii.edu/help/hdsupport/";
}

function editScheduleChange($db, $sid, $notes, $beginDate, $endDate)
{
    $stmt = $db->prepare("UPDATE old_schedule 
        SET notes = ?, begin_date = ?, end_date = ?
        WHERE sid = ?
    ");
    $stmt->bind_param("sssi", $notes, $beginDate, $endDate, $sid);
    $stmt->execute();
    $stmt->close();

    return true;
}

$_POST = json_decode(file_get_contents("php://input"), true);
echo editScheduleChange($mysqli, $_POST['sid'], $_POST['notes'], $_POST['beginDate'], $_POST['endDate']);

?>
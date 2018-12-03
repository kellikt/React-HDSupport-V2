<?php 

require_once "../database/connect_db.php";

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
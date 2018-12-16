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

function addScheduleChange($db, $eid, $username, $t0, $t1, $t2, $t3, $t4, $t5, $date)
{
    if ($eid === '') {
        $stmt = $db->prepare("INSERT INTO exceptions (date_tag, username, t0, t1, t2, t3, t4, t5) VALUES (?, ?, ?, ?, ?, ?, ?, ?)");
        $stmt->bind_param("ssssssss", $date, $username, $t0, $t1, $t2, $t3, $t4, $t5);
        $stmt->execute();
        $stmt->close();
    } else {
        $stmt = $db->prepare("UPDATE exceptions SET t0 = ?, t1 = ?, t2 = ?, t3 = ?, t4 = ?, t5 = ? WHERE eid = ?");
        $stmt->bind_param("ssssssi", $t0, $t1, $t2, $t3, $t4, $t5, $eid);
        $stmt->execute();
        $stmt->close();
    }

    return true;
}

$_POST = json_decode(file_get_contents("php://input"), true);
echo addScheduleChange($mysqli, $_POST['eid'], $_POST['username'], $_POST['t0'], $_POST['t1'], $_POST['t2'], $_POST['t3'], $_POST['t4'], $_POST['t5'], $_POST['date']);

?>
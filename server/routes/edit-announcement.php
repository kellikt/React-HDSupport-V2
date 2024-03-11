<?php
session_start();
include "./do_auth.php";

if (isset($_SESSION["host"])) {
    $host = $_SESSION["host"];
} else {
    $host = "https://www.hawaii.edu/help/hdsupport/";
}

function editAnnouncement($db, $anid, $title, $description, $help_desk, $lab, $open_date, $close_date)
{
    $stmt = $db->prepare("UPDATE announcements SET title=?, description=?, help_desk=?, lab=?, open_date=?, close_date=? WHERE anid=?");
    $stmt->bind_param("ssssssi", $title, $description, $help_desk, $lab, $open_date, $close_date, $anid);
    $stmt->execute();
    $stmt->close();
    
    return true;
}
$_POST = json_decode(file_get_contents("php://input"), true);
echo editAnnouncement($mysqli, $_POST['anid'], $_POST['title'], $_POST['description'], $_POST['helpDesk'], $_POST['lab'], $_POST['openDate'], $_POST['closeDate']);
?>
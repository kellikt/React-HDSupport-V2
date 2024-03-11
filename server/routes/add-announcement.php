<?php
session_start();
include "./do_auth.php";

if (isset($_SESSION["host"])) {
    $host = $_SESSION["host"];
} else {
    $host = "https://www.hawaii.edu/help/hdsupport/";
}

function addAnnouncement($db, $title, $description, $help_desk, $lab, $open_date, $close_date)
{
    $stmt = $db->prepare("INSERT INTO announcements (title, description, help_desk, lab, open_date, close_date) VALUES (?, ?, ?, ?, ?, ?)");
    $stmt->bind_param("ssssss", $title, $description, $help_desk, $lab, $open_date, $close_date);
    $stmt->execute();
    $stmt->close();

    return true;
}
$_POST = json_decode(file_get_contents("php://input"), true);
echo addAnnouncement($mysqli, $_POST['title'], $_POST['description'], $_POST['helpDesk'], $_POST['lab'], $_POST['openDate'], $_POST['closeDate']);
?>
<?php 

require_once "../database/connect_db.php";

function addWorkWeek($db, $description, $timestamp, $weeks)
{
    $stmt = $db->prepare("INSERT INTO wwexceptions (date, description) VALUES (?, ?) ON DUPLICATE KEY UPDATE description = ?");
    $stmt->bind_param("iss", $timestamp, $description, $description);
    $stmt->execute();
    $stmt->close();

    return true;
}

$_POST = json_decode(file_get_contents("php://input"), true);
echo addWorkWeek($mysqli, $_POST["description"], $_POST["timestamp"], $_POST['weeks']);

?>
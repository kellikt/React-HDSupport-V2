<?php 

require_once "../database/connect_db.php";

function addHoliday($db, $description, $timestamp)
{
    $stmt = $db->prepare("INSERT INTO holidays (date, description) VALUES (?, ?) ON DUPLICATE KEY UPDATE description = ?");
    $stmt->bind_param("iss", $timestamp, $description, $description);
    $stmt->execute();
    $stmt->close();

    return true;
}

$_POST = json_decode(file_get_contents("php://input"), true);
echo addHoliday($mysqli, $_POST["description"], $_POST["timestamp"]);

?>
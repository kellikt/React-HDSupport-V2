<?php 

require_once "../database/connect_db.php";

function addWorkWeek($db, $description, $timestamp, $weeks)
{
    for ($i = 0; $i < $weeks; $i++) {
        $week = $timestamp;
        for ($j = 0; $j < $i; $j++) {
            $week = strtotime("+1 week", $week);
        }

        $stmt = $db->prepare("INSERT INTO wwexceptions (date, description) VALUES (?, ?) ON DUPLICATE KEY UPDATE description = ?");
        $stmt->bind_param("iss", $week, $description, $description);
        $stmt->execute();
        $stmt->close();
    }

    return true;
}

$_POST = json_decode(file_get_contents("php://input"), true);
echo addWorkWeek($mysqli, $_POST["description"], $_POST["timestamp"], $_POST['weeks']);

?>
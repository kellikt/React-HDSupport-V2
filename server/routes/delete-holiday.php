<?php 

require_once "../database/connect_db.php";

function deleteHoliday($db, $timestamp)
{
    $stmt = $db->prepare("DELETE FROM holidays WHERE date = ? LIMIT 1");
    $stmt->bind_param("i", $timestamp);
    $stmt->execute();
    $stmt->close();

    return true;
}

$_POST = json_decode(file_get_contents("php://input"), true);
echo deleteHoliday($mysqli, $_POST['timestamp']);

?>
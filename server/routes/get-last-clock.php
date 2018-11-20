<?php 

require_once "../database/connect_db.php";

function getLastClock($db, $username)
{
    $stmt = $db->prepare("SELECT action, comments, month, day, year, hour, min, ampm, dow FROM log WHERE username=? ORDER BY logid DESC LIMIT 1");
    $stmt->bind_param("s", $username);
    $stmt->execute();
    $array = $stmt->get_result()->fetch_assoc();

    $stmt->close();

    return json_encode($array);
}

echo getLastClock($mysqli, $_GET['username']);

?>
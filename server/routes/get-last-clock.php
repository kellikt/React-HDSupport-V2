<?php 

session_start();
include "./do_auth.php";

if (isset($_SESSION["host"])) {
    $host = $_SESSION["host"];
} else {
    $host = "https://www.hawaii.edu/help/hdsupport/";
}

function getLastClock($db, $username)
{
    $stmt = $db->prepare("SELECT action, comments, month, day, year, hour, min, ampm, dow FROM log WHERE username=? ORDER BY logid DESC LIMIT 1");
    $stmt->bind_param("s", $username);
    $stmt->execute();
    $array = $stmt->get_result()->fetch_assoc();

    $stmt->close();

    if (is_null($array)) {
        return json_encode(["action" => "out", "comments" => "", "month" => "", "day" => "", "year" => "", "hour" => "", "min" => "", "ampm" => "", "dow" => ""]);
    }

    return json_encode($array);
}

echo getLastClock($mysqli, $_GET['username']);

?>
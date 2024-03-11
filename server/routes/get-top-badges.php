<?php
session_start();
include "./do_auth.php";

if (isset($_SESSION["host"])) {
    $host = $_SESSION["host"];
} else {
    $host = "https://www.hawaii.edu/help/hdsupport/";
}

function getTopBadges($db)
{
    $stmt = $db -> prepare("SELECT b.first_name, b.last_name, b.username, count(*) as count
    FROM badge_log as a,
    users as b
    WHERE b.uid = a.uid
    GROUP BY b.uid
    ORDER BY count desc LIMIT 1");
    $stmt->execute();
    $result = $stmt->get_result();
    $array = array();

    while ($row = $result->fetch_assoc()) {
        $array[] = $row;
    }
  
    $stmt->close();
    return json_encode($array);
}

echo getTopBadges($mysqli);


?>
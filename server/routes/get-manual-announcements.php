<?php

session_start();
include "./do_auth.php";

if (isset($_SESSION["host"])) {
    $host = $_SESSION["host"];
} else {
    $host = "https://www.hawaii.edu/help/hdsupport/";
}

 function getManualAnnouncements($db, $openDate, $closeDate)
 {
    $stmt = $db->prepare("SELECT * 
    FROM announcements 
    WHERE (open_date >= ? AND open_date <= ?)
    OR (close_date >= ? AND close_date <= ?)
    OR (open_date <= ? AND close_date >= ?)");
    $stmt->bind_param("ssssss", $openDate, $closeDate, $openDate, $closeDate, $openDate, $closeDate);
    $stmt->execute();
    $result = $stmt->get_result();
    $array = array();

    while ($row = $result->fetch_assoc()) {
        $array[] = $row;
    }

    $stmt->close();

    return json_encode($array);

 }
 $_POST = json_decode(file_get_contents("php://input"), true);
echo getManualAnnouncements($mysqli, $_POST["openDate"], $_POST["closeDate"]);

?>
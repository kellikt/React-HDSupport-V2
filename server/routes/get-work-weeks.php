<?php 

ini_set('session.gc_maxlifetime', 14400);
session_set_cookie_params(14400);

session_start();
include "./do_auth.php";

if (isset($_SESSION["host"])) {
    $host = $_SESSION["host"];
} else {
    $host = "https://www.hawaii.edu/help/hdsupport/";
}

function getWorkWeeks($db, $full)
{
    $now = strtotime("now");
    $fourWeeks = $now - 2419200;

    if ($full === "yes") {
        // get all holidays
        $stmt = $db->prepare("SELECT * FROM wwexceptions ORDER BY date ASC");
    } else {
        // get only 4 weeks holidays
        $stmt = $db->prepare("SELECT * FROM wwexceptions WHERE date > ? ORDER BY date ASC");
        $stmt->bind_param("i", $fourWeeks);
    }

    $stmt->execute();
    $array = array();
    $result = $stmt->get_result();

    while ($row = $result->fetch_assoc()) {
        $array[] = $row;
    }

    $stmt->close();

    return json_encode($array);
}

echo getWorkWeeks($mysqli, $_GET['full']);

?>
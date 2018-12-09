<?php 

require_once "../database/connect_db.php";

function getHolidays($db, $full)
{
    $now = strtotime("now");
    $fourWeeks = $now - 2419200;

    if ($full === "yes") {
        // get all holidays
        $stmt = $db->prepare("SELECT * FROM holidays ORDER BY date ASC");
    } else {
        // get only 4 weeks holidays
        $stmt = $db->prepare("SELECT * FROM holidays WHERE date > ? ORDER BY date ASC");
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

echo getHolidays($mysqli, $_GET['full']);

?>
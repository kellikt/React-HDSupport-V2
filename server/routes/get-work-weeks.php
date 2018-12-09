<?php 

require_once "../database/connect_db.php";

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
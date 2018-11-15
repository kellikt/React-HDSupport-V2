<?php 

require_once "../database/connect_db.php";

function getTestData($db, $id)
{
    $stmt = $db->prepare("SELECT first_name, username FROM users WHERE uuid=?");
    $stmt->bind_param("s", $id);
    $stmt->execute();
    $array = $stmt->get_result()->fetch_assoc();

    return json_encode($array);
}

echo getTestData($mysqli, $_GET['uuid']);

?>
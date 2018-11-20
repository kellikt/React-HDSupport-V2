<?php 

require_once "../database/connect_db.php";

function getName($db, $id)
{
    $stmt = $db->prepare("SELECT first_name, last_name FROM users WHERE uuid=?");
    $stmt->bind_param("s", $id);
    $stmt->execute();
    $array = $stmt->get_result()->fetch_assoc();

    $stmt->close();

    return json_encode($array);
}

echo getName($mysqli, $_GET['uuid']);

?>
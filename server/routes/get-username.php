<?php 

require_once "../database/connect_db.php";

function getUsername($db, $id)
{
    $stmt = $db->prepare("SELECT username FROM users WHERE uuid=?");
    $stmt->bind_param("s", $id);
    $stmt->execute();
    $array = $stmt->get_result()->fetch_assoc();

    $stmt->close();

    return json_encode($array);
}

echo getUsername($mysqli, $_GET['uuid']);

?>
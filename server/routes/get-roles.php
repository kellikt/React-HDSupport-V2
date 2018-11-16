<?php 

require_once "../database/connect_db.php";

function getRoles($db, $username)
{
    $stmt = $db->prepare("SELECT * FROM user_groups WHERE username=?");
    $stmt->bind_param("s", $username);
    $stmt->execute();
    $array = $stmt->get_result()->fetch_assoc();

    return json_encode($array);
}

echo getRoles($mysqli, $_GET['username']);

?>
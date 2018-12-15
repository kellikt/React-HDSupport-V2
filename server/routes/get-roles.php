<?php 

session_start();
include "./do_auth.php";

if (isset($_SESSION["host"])) {
    $host = $_SESSION["host"];
} else {
    $host = "https://www.hawaii.edu/help/hdsupport/";
}

function getRoles($db, $username)
{
    $stmt = $db->prepare("SELECT * FROM user_groups WHERE username=?");
    $stmt->bind_param("s", $username);
    $stmt->execute();
    $array = $stmt->get_result()->fetch_assoc();

    $stmt->close();

    return json_encode($array);
}

echo getRoles($mysqli, $_GET['username']);

?>
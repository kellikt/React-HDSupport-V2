<?php
session_start();
include "./do_auth.php";

if (isset($_SESSION["host"])) {
    $host = $_SESSION["host"];
} else {
    $host = "https://www.hawaii.edu/help/hdsupport/";
}

function deleteEmailTemplate($db, $gtid)
{
    $stmt = $db->prepare("DELETE FROM google_templates WHERE gtid = ?");
    $stmt->bind_param("i", $gtid);
    $stmt->execute();
    $stmt->close();

    return true;
}

$_POST = json_decode(file_get_contents("php://input"), true);
echo deleteEmailTemplate($mysqli, $_POST["gtid"]);
?>
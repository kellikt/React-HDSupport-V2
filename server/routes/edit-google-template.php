<?php
session_start();
include "./do_auth.php";

if (isset($_SESSION["host"])) {
    $host = $_SESSION["host"];
} else {
    $host = "https://www.hawaii.edu/help/hdsupport";
}

function editGoogleTemplate($db, $gtid, $tname, $fromAddress, $subject, $content)
{
    $stmt = $db->prepare("UPDATE google_templates
        SET tname = ?, from_address = ?, subject = ?, content = ?
        WHERE gtid = ?
    ");
    $stmt->bind_param("ssssi", $tname, $fromAddress, $subject, $content, $gtid);
    $stmt->execute();
    $stmt->close();

    return true;
}

$_POST = json_decode(file_get_contents("php://input"), true);
echo editGoogleTemplate($mysqli, $_POST["gtid"], $_POST["tname"], $_POST["fromAddress"], $_POST["subject"], $_POST["content"]);
?>
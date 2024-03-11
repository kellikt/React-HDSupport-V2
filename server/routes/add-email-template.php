<?php
session_start();
include "./do_auth.php";

if (isset($_SESSION["host"])) {
    $host = $_SESSION["host"];
} else {
    $host = "https://www.hawaii.edu/help/hdsupport/";
}

function addEmailTemplate($db, $tname, $fromAddress, $toAddress, $subject, $content)
{
    $stmt = $db->prepare("INSERT INTO email_templates (tname, from_address, to_address, subject, content) VALUES (?, ?, ?, ?, ?)");
    $stmt->bind_param("sssss", $tname, $fromAddress, $toAddress, $subject, $content);
    $stmt->execute();
    $stmt->close();

    return true;
}

$_POST = json_decode(file_get_contents("php://input"), true);
echo addEmailTemplate($mysqli, $_POST["tname"], $_POST["fromAddress"], $_POST["toAddress"], $_POST["subject"], $_POST["content"]);
?>
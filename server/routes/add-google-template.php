<?php
session_start();
include "./do_auth.php";

if (isset($_SESSION["host"])) {
    $host = $_SESSION["host"];
} else {
    $host = "https://www.hawaii.edu/help/hdsupport/";
}

function addGoogleTemplate($db, $tname, $fromAddress, $subject, $content) 
{
    $stmt = $db->prepare("INSERT INTO google_templates (tname, from_address, subject, content) VALUES (?, ?, ?, ?)");
    $stmt->bind_param("ssss", $tname, $fromAddress, $subject, $content);
    $stmt->execute();
    $stmt->close();

    return true;
}

$_POST = json_decode(file_get_contents("php://input"), true);
echo addGoogleTemplate($mysqli, $_POST["tname"], $_POST["fromAddress"], $_POST["subject"], $_POST["content"]);
?>
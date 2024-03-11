<?php
session_start();
include "./do_auth.php";

if (isset($_SESSION["host"])) {
    $host = $_SESSION["host"];
} else {
    $host = "https://www.hawaii.edu/help/hdsupport/";
}

function editEmailTemplate($db, $tid, $tname, $fromAddress, $toAddress, $subject, $content) 
{
    $stmt = $db->prepare("UPDATE email_templates 
        SET tname = ?, from_address = ?, to_address = ?, subject = ?, content = ?
        WHERE tid = ?
    ");
    $stmt->bind_param("sssssi", $tname, $fromAddress, $toAddress, $subject, $content, $tid);
    $stmt->execute();
    $stmt->close();

    return true;
}

$_POST = json_decode(file_get_contents("php://input"), true);
echo editEmailTemplate($mysqli, $_POST["tid"], $_POST["tname"], $_POST["fromAddress"], $_POST["toAddress"], $_POST["subject"], $_POST["content"]);
?>
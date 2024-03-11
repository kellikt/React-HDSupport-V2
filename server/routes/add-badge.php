<?php 

session_start();
include "./do_auth.php";

if (isset($_SESSION["host"])) {
    $host = $_SESSION["host"];
} else {
    $host = "https://www.hawaii.edu/help/hdsupport/";
}

function addBadge($db, $title, $hex, $hex_secondary, $description, $link) 
{
    $stmt = $db->prepare("INSERT INTO badges (title, hex, hex_secondary, description, link) VALUES (?, ?, ?, ?, ?)");
    $stmt->bind_param("sssss", $title, $hex, $hex_secondary, $description, $link);
    $stmt->execute();
    $stmt->close();

    return true;
}

$_POST = json_decode(file_get_contents("php://input"), true);
echo addBadge($mysqli, $_POST["title"], $_POST["hex"], $_POST["hex_secondary"], $_POST["description"], $_POST["link"]);

?>
<?php
session_start();
include "./do_auth.php";

if (isset($_SESSION["host"])) {
    $host = $_SESSION["host"];
} else {
    $host = "https://www.hawaii.edu/help/hdsupport/";
}

function editBadge($db, $bid, $title, $hex, $hex_secondary, $description, $link) 
{
  $stmt = $db->prepare("UPDATE badges SET title=?, hex=?, hex_secondary=?, description=?, link=? WHERE bid=?");
  $stmt->bind_param("sssssi", $title, $hex, $hex_secondary, $description, $link, $bid);
  $stmt->execute();
  $stmt->close();

  return true;
}

$_POST = json_decode(file_get_contents("php://input"), true);
echo editBadge($mysqli, $_POST["bid"], $_POST["title"], $_POST["hex"], $_POST["hex_secondary"], $_POST["description"], $_POST["link"]);

?>
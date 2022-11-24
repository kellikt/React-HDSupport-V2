<?php
session_start();
include "./do_auth.php";

if (isset($_SESSION["host"])) {
    $host = $_SESSION["host"];
} else {
    $host = "https://www.hawaii.edu/help/hdsupport/";
}

function editBadge($db, $bid, $title, $hex, $description, $link) 
{
  $stmt = $db->prepare("UPDATE badges SET title=?, hex=?, description=?, link=? WHERE bid=?");
  $stmt->bind_param("ssssi", $title, $hex, $description, $link, $bid);
  $stmt->execute();
  $stmt->close();

  return true;
}

$_POST = json_decode(file_get_contents("php://input"), true);
echo editBadge($mysqli, $_POST["bid"], $_POST["title"], $_POST["hex"], $_POST["description"], $_POST["link"]);

?>
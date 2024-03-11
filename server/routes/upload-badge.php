<?php
session_start();
include "./do_auth.php";

error_reporting(E_ALL);
ini_set('display_errors', 1);

function uploadBadge($db, $badge) {
  $stmt = $db->prepare("INSERT INTO badges (base64) VALUES (?)");
  $stmt->bind_param("s", $badge);
  $stmt->execute();
  $uid = $db->insert_id;
  $stmt->close();

  return $uid;
}

$_POST = json_decode(file_get_contents("php://input"), true);
echo uploadBadge($mysqli, $_POST['badge']);

?>
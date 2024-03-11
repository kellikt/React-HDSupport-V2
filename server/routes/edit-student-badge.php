<?php

session_start();
include "./do_auth.php";

if (isset($_SESSION["host"])) {
    $host = $_SESSION["host"];
} else {
    $host = "https://www.hawaii.edu/help/hdsupport/";
}

function editStudentBadge($db, $username, $bid, $tstamp, $notes, $fav)
{
  $checkUser = $db->prepare("SELECT uid FROM users WHERE username=?");
  $checkUser->bind_param("s", $username);
  $checkUser->execute();
  $result = $checkUser->get_result();
  if ($result->num_rows === 0) {
      $checkUser->close();
      return false;
  } else {
    $array = $result->fetch_assoc();
    $uid = $array["uid"];
    $stmt = $db->prepare("UPDATE badge_log SET tstamp=?, notes=?, fav=? WHERE bid=? AND uid=?");
    $stmt->bind_param("sssii", $tstamp, $notes, $fav, $bid, $uid);
    $stmt->execute();
    $stmt->close();

    return true;
  }
}

$_POST = json_decode(file_get_contents("php://input"), true);
echo editStudentBadge($mysqli, $_POST['username'], $_POST['bid'], $_POST['tstamp'], $_POST['notes'], $_POST['fav']);

?>
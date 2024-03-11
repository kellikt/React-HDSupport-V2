<?php

session_start();
include "./do_auth.php";

if (isset($_SESSION["host"])) {
    $host = $_SESSION["host"];
} else {
    $host = "https://www.hawaii.edu/help/hdsupport/";
}

function addStudentBadge($db, $username, $bid, $notes)
{
  // make sure that user selected a badge id
  if (intval($bid) != 0) {
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
      $checkExisting = $db->prepare("SELECT * FROM badge_log WHERE uid=? AND bid=?");
      $checkExisting->bind_param("ii", $uid, $bid);
      $checkExisting->execute();
      $result = $checkExisting->get_result();

      if ($result->num_rows === 0) {
        // query for current staff ID
        $tstamp = time();
        $stmt = $db->prepare("INSERT INTO badge_log(uid, bid, tstamp, notes, fav, staff_username) VALUES (?, ?, ?, ?, 0, ?)");
        $stmt->bind_param("iisss", $uid, $bid, $tstamp, $notes, $_SESSION["username"]);
        $stmt->execute();
        $stmt->close();

        return true;
      } else {
        $checkExisting->close();
        return "User already has this badge.";
      }
    } 
  } else {
    return false;
  }
}

$_POST = json_decode(file_get_contents("php://input"), true);
echo addStudentBadge($mysqli, $_POST['username'], $_POST['bid'], $_POST['notes']);


?>
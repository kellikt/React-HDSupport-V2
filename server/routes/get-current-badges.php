<?php

session_start();
include "./do_auth.php";

if (isset($_SESSION["host"])) {
  $host = $_SESSION["host"];
} else {
  $host = "https://www.hawaii.edu/help/hdsupport/";
}

function getCurrentBadges($db, $username) 
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
        $stmt = $db->prepare("SELECT a.uid, a.bid, a.tstamp, a.fav, b.title, a.notes, a.staff_username, b.hex, b.hex_secondary, b.description, b.link
        FROM badge_log as a, badges as b
        WHERE b.bid=a.bid
        AND a.uid = ?
        ORDER BY a.tstamp DESC");
        $stmt->bind_param('i', $uid);
        $stmt->execute();
        $result = $stmt->get_result();
        $array = array();

        while ($row = $result->fetch_assoc()) {
          $array[] = $row;
        }

        $stmt->close();

        return json_encode($array);
    }
}

$_POST = json_decode(file_get_contents("php://input"), true);
echo getCurrentBadges($mysqli, $_POST['user']);
?>
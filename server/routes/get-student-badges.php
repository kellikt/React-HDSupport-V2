<?php

session_start();
include "./do_auth.php";

if (isset($_SESSION["host"])) {
  $host = $_SESSION["host"];
} else {
  $host = "https://www.hawaii.edu/help/hdsupport/";
}

function getStudentBadges($db, $title, $username)
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
      if ($title === "") {
        $stmt = $db->prepare("SELECT a.username, a.uid, b.bid, b.title, c.tstamp, c.notes, c.fav FROM users as a,badges as b,badge_log as c WHERE a.uid=c.uid AND b.bid=c.bid AND c.uid=?");
        $stmt->bind_param('s', $uid);
        $stmt->execute();
        $result = $stmt->get_result();
        $array = array();
    
        while ($row = $result->fetch_assoc()) {
          $array[] = $row;
        }
    
        $stmt->close();
    
        return json_encode($array);
        
      } else {
        $stmt = $db->prepare("SELECT a.username, a.uid, b.bid, b.title, c.tstamp, c.notes, c.fav FROM users as a,badges as b,badge_log as c WHERE a.uid=c.uid AND b.bid=c.bid AND c.uid=? AND b.title LIKE CONCAT('%',?,'%')");
        $stmt->bind_param('s', $title);
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

}

$_POST = json_decode(file_get_contents("php://input"), true);
echo getStudentBadges($mysqli, $_POST['badge'], $_POST['user']);

?>
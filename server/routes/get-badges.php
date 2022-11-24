<?php
session_start();
include "./do_auth.php";

if (isset($_SESSION["host"])) {
  $host = $_SESSION["host"];
} else {
  $host = "https://www.hawaii.edu/help/hdsupport/";
}

function getBadges($db, $name)
{
  if ($name === "") {
    $stmt = $db->prepare("SELECT * FROM badges");
    $stmt->execute();
    $result = $stmt->get_result();
    $array = array();

    while ($row = $result->fetch_assoc()) {
      $array[] = $row;
    }

    $stmt->close();

    return json_encode($array);
  } else {
    $stmt = $db->prepare("SELECT * FROM badges WHERE title LIKE CONCAT('%',?,'%')");
    $stmt->bind_param('s', $name);
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
echo getBadges($mysqli, $_POST['name']);

?>
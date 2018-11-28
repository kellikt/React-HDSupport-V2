<?php 

require_once "../database/connect_db.php";

function clockIn($db, $username, $comments, $action)
{
    $ip = $_SERVER["REMOTE_ADDR"];
    $hostname = gethostbyaddr($ip);
    $month = date("n");
    $day = date("j");
    $dow = date("l");
    $year = date("Y");
    $hour = date("g");
    $min = date("i");
    $ampm = date("A");
    $cleanedComments = addslashes($comments);

    $stmt = $db->prepare("INSERT INTO log (username, ip, hostname, month, day, dow, year, hour, min, ampm, action, comments) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
    $stmt->bind_param("ssssssssssss", $username, $ip, $hostname, $month, $day, $dow, $year, $hour, $min, $ampm, $action, $cleanedComments);
    $stmt->execute();
    $stmt->close();

    return true;
}

$_POST = json_decode(file_get_contents("php://input"), true);
echo clockIn($mysqli, $_POST['username'], $_POST['comments'], $_POST['action']);

?>
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

    $uidStmt = $db->prepare("SELECT uid FROM users WHERE username = ?");
    $uidStmt->bind_param("s", $username);
    $uidStmt->execute();
    $uidResult = $uidStmt->get_result()->fetch_assoc();
    $uid = $uidResult['uid'];
    $uidStmt->close();

    $timestamp = time();

    $clockStmt = $db->prepare("INSERT INTO clock (uid, tstamp, action, ip, hostname, comments) VALUES (?, ?, ?, ?, ?, ?)");
    $clockStmt->bind_param("iissss", $uid, $timestamp, $action, $ip, $hostname, $comments);
    $clockStmt->execute();
    $clockStmt->close();

    return true;
}

$_POST = json_decode(file_get_contents("php://input"), true);
echo clockIn($mysqli, $_POST['username'], $_POST['comments'], $_POST['action']);

?>
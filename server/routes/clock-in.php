<?php

session_start();
include "./do_auth.php";

if (isset($_SESSION["host"])) {
    $host = $_SESSION["host"];
} else {
    $host = "https://www.hawaii.edu/help/hdsupport/";
}

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

    // get uid
    $uidStmt = $db->prepare("SELECT uid FROM users WHERE username = ?");
    $uidStmt->bind_param("s", $username);
    $uidStmt->execute();
    $uidResult = $uidStmt->get_result()->fetch_assoc();
    $uid = $uidResult['uid'];
    $uidStmt->close();

    if ($action === 'out') {
        $lastClockStmt = $db->prepare("SELECT * FROM log WHERE username = ? ORDER BY logid DESC LIMIT 1");
        $lastClockStmt->bind_param("s", $username);
        $lastClockStmt->execute();
        $row = $lastClockStmt->get_result()->fetch_assoc();

        $lastDay = $row['day'];
        $lastMonth = $row['month'];
        $lastYear = $row['year'];
        $inAction = 'in';
        $eleven = '11';
        $fiftyNine = '59';
        $PM = 'PM';
        $twelve = '12';
        $zeroZero = '00';
        $AM = 'AM';
        $lastClockStmt->close();

        if ($day !== $lastDay) {
            $inDay = strtotime("$lastMonth/$lastDay/$lastYear");
            $outDay = strtotime("$month/$day/$year");

            $troubleshoot[] = $inDay;
            $troubleshoot[] = $outDay;

            while ($inDay < $outDay) {
                // setup
                $inDayStamp = $inDay + 86399;
                $outMonth = date('n', $inDay);
                $outNumDay = date('j', $inDay);
                $outDow = date('l', $inDay);
                $outYear = date('Y', $inDay);

                $outClock = $db->prepare("INSERT INTO clock (uid, tstamp, action, ip, hostname, comments) VALUES (?, ?, ?, ?, ?, ?)");
                $outClock->bind_param("iissss", $uid, $inDayStamp, $action, $ip, $hostname, $cleanedComments);
                $outClock->execute();
                $outClock->close();

                $outStmt = $db->prepare("INSERT INTO log (username, ip, hostname, month, day, dow, year, hour, min, ampm, action, comments) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
                $outStmt->bind_param("ssssssssssss", $username, $ip, $hostname, $outMonth, $outNumDay, $outDow, $outYear, $eleven, $fiftyNine, $PM, $action, $cleanedComments);
                $outStmt->execute();
                $outStmt->close();

                // setup
                $inDay += 86400;
                $inMonth = date('n', $inDay);
                $inNumDay = date('j', $inDay);
                $inDow = date('l', $inDay);
                $inYear = date('Y', $inDay);

                $inClock = $db->prepare("INSERT INTO clock (uid, tstamp, action, ip, hostname, comments) VALUES (?, ?, ?, ?, ?, ?)");
                $inClock->bind_param("iissss", $uid, $inDay, $inAction, $ip, $hostname, $cleanedComments);
                $inClock->execute();
                $inClock->close();

                $inStmt = $db->prepare("INSERT INTO log (username, ip, hostname, month, day, dow, year, hour, min, ampm, action, comments) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
                $inStmt->bind_param("ssssssssssss", $username, $ip, $hostname, $inMonth, $inNumDay, $inDow, $inYear, $twelve, $zeroZero, $AM, $inAction, $cleanedComments);
                $inStmt->execute();
                $inStmt->close();
            }
        }
    }

    $stmt = $db->prepare("INSERT INTO log (username, ip, hostname, month, day, dow, year, hour, min, ampm, action, comments) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
    $stmt->bind_param("ssssssssssss", $username, $ip, $hostname, $month, $day, $dow, $year, $hour, $min, $ampm, $action, $cleanedComments);
    $stmt->execute();
    $stmt->close();

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
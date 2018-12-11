<?php 

require_once "../database/connect_db.php";

function getPartialHours($db, $username, $periodStart, $periodEnd, $gap, $year)
{
    $clockArray = array();
    $exceptionsArray = array();
    $logArray = array();
    $return = array();

    // GET UID

    $uidStmt = $db->prepare("SELECT uid FROM users WHERE username = ?");
    $uidStmt->bind_param("s", $username);
    $uidStmt->execute();
    $uidResult = $uidStmt->get_result()->fetch_assoc();
    $uid = $uidResult['uid'];
    $uidStmt->close();

    // END UID

    // GET FROM LOG
    $month = date("n", $periodStart);
    $dayStart = date("j", $periodStart);
    $dayEnd = date("j", $periodEnd - 86400);

    $logStmt = $db->prepare("SELECT hour, min, ampm, month, day, year FROM log WHERE username= ? AND year = ? AND month = ? AND day >= ? AND day <= ?");
    $logStmt->bind_param("ssiii", $username, $year, $month, $dayStart, $dayEnd);
    $logStmt->execute();
    $logResult = $logStmt->get_result();

    while ($row = $logResult->fetch_assoc()) {
        $logArray[] = $row;
    }
    $logStmt->close();

    // END FROM LOG

    // GET from CLOCK

    $stmt = $db->prepare("SELECT tstamp FROM clock WHERE uid = ? AND tstamp >= ? AND tstamp <= ?");
    $stmt->bind_param("iii", $uid, $periodStart, $periodEnd);
    $stmt->execute();
    $result = $stmt->get_result();

    while ($row = $result->fetch_assoc()) {
        $clockArray[] = $row;
    }
    $stmt->close();

    

    // END FROM CLOCK

    // GET EXCEPTIONS

    for ($i = 0; $i < $gap; $i++) {
        $dayToCheck = date("n/j/Y", ($periodStart + ($i * 86400)));

        $exceptions = $db->prepare("SELECT date_tag, t0, t1, t2, t3, t4, t5 FROM exceptions WHERE username = ? AND date_tag = ?");
        $exceptions->bind_param("ss", $username, $dayToCheck);
        $exceptions->execute();
        $exceptionsResult = $exceptions->get_result();

        if (!($exceptionsResult->num_rows === 0)) {
            $exceptionsArray[] = $exceptionsResult->fetch_assoc();
        }
        $exceptions->close();
    }

    // END EXCEPTIONS

    $return[] = $clockArray;
    $return[] = $logArray;
    $return[] = $exceptionsArray;

    $finalArray = array();

    if (count($exceptionsArray) === 0) {
        // just use clockArray
        $sum = 0;
        for ($i = 1; $i < count($clockArray); $i = $i + 2) {
            if ($i % 2 === 1) {
                $sum += $clockArray[$i]["tstamp"] - $clockArray[$i - 1]["tstamp"];
            }
        }

        return $sum / 3600;
    } else {
        // we need to determine where the exceptions modify the clockins

        return json_encode($return);
    }
}

$_POST = json_decode(file_get_contents("php://input"), true);
echo getPartialHours($mysqli, $_POST['username'], $_POST['periodStart'], $_POST['periodEnd'], $_POST['dayGap'], $_POST['year']);

?>
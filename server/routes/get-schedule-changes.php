<?php 

session_start();
include "./do_auth.php";

if (isset($_SESSION["host"])) {
    $host = $_SESSION["host"];
} else {
    $host = "https://www.hawaii.edu/help/hdsupport/";
}

function getScheduleChanges($db, $username, $beginDate, $endDate, $option)
{
    if ($username === "") {
        if ($option === "") {
            // get all outages for date range
            $stmt = $db->prepare("SELECT begin_date, end_date, notes, username, sid
                  FROM old_schedule
                  INNER JOIN user_groups ON user_groups.uid = old_schedule.uid
                  WHERE old_schedule.uid = user_groups.uid
                  AND ((begin_date >=  ? AND begin_date <=  ?)
                  OR (end_date >=  ? AND end_date <=  ?)
                  OR (begin_date <=  ? AND end_date >=  ?))
                  ORDER BY begin_date ASC 
            ");
        } else if ($option === "Students") {
            $stmt = $db->prepare("SELECT begin_date, end_date, notes, username, sid
                  FROM old_schedule
                  INNER JOIN user_groups ON user_groups.uid = old_schedule.uid
                  WHERE old_schedule.uid = user_groups.uid
                  AND ((begin_date >=  ? AND begin_date <=  ?)
                  OR (end_date >=  ? AND end_date <=  ?)
                  OR (begin_date <=  ? AND end_date >=  ?))
                  AND user_groups.staff = 'no'
                  ORDER BY begin_date ASC 
            ");
        } else {
            $stmt = $db->prepare("SELECT begin_date, end_date, notes, username, sid
                  FROM old_schedule
                  INNER JOIN user_groups ON user_groups.uid = old_schedule.uid
                  WHERE old_schedule.uid = user_groups.uid
                  AND ((begin_date >=  ? AND begin_date <=  ?)
                  OR (end_date >=  ? AND end_date <=  ?)
                  OR (begin_date <=  ? AND end_date >=  ?))
                  AND user_groups.staff = 'yes'
                  ORDER BY begin_date ASC 
            ");
        }
        $stmt->bind_param('ssssss', $beginDate, $endDate, $beginDate, $endDate, $beginDate, $endDate);
        $stmt->execute();
        $result = $stmt->get_result();
        $array = array();

        while ($row = $result->fetch_assoc()) {
            $array[] = $row;
        }

        $stmt->close();

        return json_encode($array);
    } else {
        $checkUser = $db->prepare("SELECT uid from users WHERE username=?");
        $checkUser->bind_param('s', $username);
        $checkUser->execute();
        $checkResult = $checkUser->get_result();
        if ($checkResult->num_rows === 0) {
            $checkUser->close();
            return 0;
        } else {
            $array = $checkResult->fetch_assoc();
            $uid = $array["uid"];
            $checkUser->close();

            $stmt = $db->prepare("SELECT begin_date, end_date, notes, username, sid
                  FROM old_schedule
                  INNER JOIN users ON users.uid = old_schedule.uid
                  WHERE username =  ?
                  AND ((begin_date >=  ? AND begin_date <=  ?)
                  OR (end_date >=  ? AND end_date <=  ?)
                  OR (begin_date <=  ? AND end_date >=  ?))
                  ORDER BY begin_date ASC 
            ");
            $stmt->bind_param('sssssss', $username, $beginDate, $endDate, $beginDate, $endDate, $beginDate, $endDate);
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
echo getScheduleChanges($mysqli, $_POST["username"], $_POST["beginDate"], $_POST["endDate"], $_POST["option"]);

?>
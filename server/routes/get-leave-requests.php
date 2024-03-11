<?php

session_start();
include "./do_auth.php";

if (isset($_SESSION["host"])) {
    $host = $_SESSION["host"];
} else {
    $host = "https://www.hawaii.edu/help/hdsupport/";
}

function getLeaveRequests($db, $username, $beginDate, $endDate, $shift)
{
    if ($username != '') {
        $checkUser = $db->prepare("SELECT uid from users WHERE username=?");
        $checkUser->bind_param("s", $username);
        $checkUser->execute();
        $checkResult = $checkUser->get_result();
        if ($checkResult->num_rows === 0) {
            $checkUser->close();
            return false;
        } else {
            $array = $checkResult->fetch_assoc();
            $uid = $array["uid"];
            $checkUser->close();

            $stmt = $db->prepare("SELECT leave_requests.lid, leave_requests.uid, leave_requests.begin_date, leave_requests.end_date, leave_requests.comment, leave_requests.status, leave_requests.staff_comment, users.first_name, users.last_name, users.priority FROM leave_requests
                INNER JOIN users ON users.uid = leave_requests.uid 
                WHERE username=?
                AND ((leave_requests.begin_date >=  ? AND leave_requests.begin_date <=  ?)
                OR (leave_requests.end_date >=  ? AND leave_requests.end_date <=  ?)
                OR (leave_requests.begin_date <=  ? AND leave_requests.end_date >=  ?))
                ORDER BY leave_requests.begin_date ASC, users.priority ASC
            ");
            $stmt->bind_param('sssssss', $username, $beginDate, $endDate, $beginDate, $endDate, $beginDate, $endDate);
            $stmt->execute();
            $result = $stmt->get_result();
            $array = array();

            while ($row = $result->fetch_assoc()) {
                $array[] = $row;
            }
        }
    } else {
        if ($shift == "1") {
            $stmt = $db->prepare("SELECT a.lid, a.uid, a.begin_date, a.end_date, a.comment, a.status, a.staff_comment, b.username, b.first_name, b.last_name, b.priority FROM leave_requests as a, users as b, user_groups as c
            WHERE ((a.begin_date >=  ? AND a.begin_date <=  ?)
            OR (a.end_date >=  ? AND a.end_date <=  ?)
            OR (a.begin_date <=  ? AND a.end_date >=  ?))
            AND a.uid = b.uid
            AND a.uid = c.uid
            AND c.first_staff = 'yes'
            ORDER BY b.priority ASC, a.begin_date ASC
            ");
        } else if ($shift == "2") {
            $stmt = $db->prepare("SELECT a.lid, a.uid, a.begin_date, a.end_date, a.comment, a.status, a.staff_comment, b.username, b.first_name, b.last_name, b.priority FROM leave_requests as a, users as b, user_groups as c
            WHERE ((a.begin_date >=  ? AND a.begin_date <=  ?)
            OR (a.end_date >=  ? AND a.end_date <=  ?)
            OR (a.begin_date <=  ? AND a.end_date >=  ?))
            AND a.uid = b.uid
            AND a.uid = c.uid
            AND c.second_staff = 'yes'
            ORDER BY b.priority ASC, a.begin_date ASC
            ");
        } else if ($shift == "3") {
            $stmt = $db->prepare("SELECT a.lid, a.uid, a.begin_date, a.end_date, a.comment, a.status, a.staff_comment, b.username, b.first_name, b.last_name, b.priority FROM leave_requests as a, users as b, user_groups as c
            WHERE ((a.begin_date >=  ? AND a.begin_date <=  ?)
            OR (a.end_date >=  ? AND a.end_date <=  ?)
            OR (a.begin_date <=  ? AND a.end_date >=  ?))
            AND a.uid = b.uid
            AND a.uid = c.uid
            AND c.third_staff = 'yes'
            ORDER BY b.priority ASC, a.begin_date ASC
            ");
        }
        $stmt->bind_param('ssssss', $beginDate, $endDate, $beginDate, $endDate, $beginDate, $endDate);
        $stmt->execute();
        $result = $stmt->get_result();
        $array = array();

        while ($row = $result->fetch_assoc()) {
            $array[] = $row;
        }
    }

        $stmt->close();

        return json_encode($array);
}

$_POST = json_decode(file_get_contents("php://input"), true);
echo getLeaveRequests($mysqli, $_POST["username"], $_POST["beginDate"], $_POST["endDate"], $_POST["shift"]);

?>
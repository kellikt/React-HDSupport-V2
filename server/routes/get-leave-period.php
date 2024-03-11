<?php
session_start();
include "./do_auth.php";

if (isset($_SESSION["host"])) {
    $host = $_SESSION["host"];
} else {
    $host = "https://www.hawaii.edu/help/hdsupport/";
}

function getLeavePeriod($db)
{
    $current = time();
    $current_formatted = date('Y-m-d', $current);

    // open/close dates of period (access to leave requests)
    $default_one_open = date('Y-m-d', strtotime('first monday of june this year'));
    $default_one_close = date('Y-m-d', strtotime('fourth friday of june this year'));
    $default_two_open = date('Y-m-d', strtotime('first monday of december this year'));
    $default_two_close = date('Y-m-d', strtotime('fourth friday of december this year'));

    // actual start/end dates of period
    $period_one_start = date('Y-m-d', strtotime('first day of january next year'));
    $period_one_end = date('Y-m-d', strtotime('last day of june next year'));
    $period_two_start = date('Y-m-d', strtotime('first day of july next year'));
    $period_two_end = date('Y-m-d', strtotime('last day of december next year'));

    // check if entry for leave period exists
    $stmt = $db->prepare("SELECT * FROM leave_periods WHERE open_date <= ? AND close_date >= ?");
    $stmt->bind_param('ss', $current_formatted, $current_formatted);
    $stmt->execute();
    $result = $stmt->get_result();
    $stmt->close();
    if ($result->num_rows === 0) {
        // if leave period does not exist, provide default date instead
        if ($current >= strtotime($default_one_open) && $current <= strtotime($default_one_close)) {
            // period one
            return json_encode(["open_period" => true, "period" => 1, "year" => date('Y', strtotime($default_one_open)), "open_date" => $period_one_start, "close_date" => $period_one_end]);
        } else if ($current >= strtotime($default_two_open) && $current <= strtotime($default_two_close)){
            // period two
            return json_encode(["open_period" => true, "period" => 2, "year" => date('Y', strtotime($default_two_open)), "open_date" => $period_two_start, "close_date" => $period_two_end]);
        } else {
            // return false, leave period submission not open
            return json_encode(["open_period" => false]);
        }
    } else {
        // return first period from db 
        $array = array();
        while ($row = $result->fetch_assoc()) {
            $array[] = $row;
        }
        return json_encode(["open_period" => true, "period" => $array[0]["period"], "year" => $array[0]["year"], "open_date" => $array[0]["open_date"], "close_date" => $array[0]["close_date"]]);
    }
}

$_POST = json_decode(file_get_contents("php://input"), true);
echo getLeavePeriod($mysqli);
?>
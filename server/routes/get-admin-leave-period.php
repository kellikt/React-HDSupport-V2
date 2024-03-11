<?php
session_start();
include "./do_auth.php";

if (isset($_SESSION["host"])) {
    $host = $_SESSION["host"];
} else {
    $host = "https://www.hawaii.edu/help/hdsupport/";
}

function getAdminLeavePeriod($db, $period, $year)
{
    $current_year = $year - 1;
    // open/close dates of period (access to leave requests)
    $default_one_open = date('Y-m-d', strtotime('first monday of june ' . $current_year));
    $default_one_close = date('Y-m-d', strtotime('fourth friday of june ' . $current_year));
    $default_two_open = date('Y-m-d', strtotime('first monday of december ' . $current_year));
    $default_two_close = date('Y-m-d', strtotime('fourth friday of december ' . $current_year));

    if ($period == 1) {
        // period one
        $openDate = $default_one_open;
        $closeDate = $default_one_close;
    } else {
        // period two
        $openDate = $default_two_open;
        $closeDate = $default_two_close;
    }

    // check for existing leave period
    $stmt = $db->prepare("SELECT * FROM leave_periods WHERE period = ? AND year = ?");
    $stmt->bind_param("ss", $period, $year);
    $stmt->execute();
    $result = $stmt->get_result();
    $stmt->close();
    if ($result->num_rows === 0) {
        // leave period doesn't exist, use default date
        return json_encode(["lpid" => -1, "open_date" => $openDate, "close_date" => $closeDate]);
    } else {
        // leave period exists
        $array = array();
        while ($row = $result->fetch_assoc()) {
            $array[] = $row;
        }
        return json_encode(["lpid" => $array[0]["lpid"], "open_date" => $array[0]["open_date"], "close_date" => $array[0]["close_date"]]);
    }

}

$_POST = json_decode(file_get_contents("php://input"), true);
echo getAdminLeavePeriod($mysqli, $_POST["period"], $_POST["year"]);
?>
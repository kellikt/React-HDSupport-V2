<?php
session_start();
include "./do_auth.php";

if (isset($_SESSION["host"])) {
    $host = $_SESSION["host"];
} else {
    $host = "https://www.hawaii.edu/help/hdsupport/";
}

function editLeavePeriod($db, $lpid, $period, $year, $openDate, $closeDate)
{
    // check for default period - based on period / year
    if ($period == 1) {
        $startDate = date('Y-m-d', strtotime('first day of january ' . $year));
        $endDate = date('Y-m-d', strtotime('last day of june ' . $year));
    } else {
        $startDate = date('Y-m-d', strtotime('first day of july ' . $year));
        $endDate = date('Y-m-d', strtotime('last day of decemeber ' . $year));
    }

    // check for lpid (-1 if one doesn't exist right now)
    if ($lpid === -1) {
        // leave period not found, create new entry
        $stmt = $db->prepare("INSERT INTO leave_periods(open_date, close_date, start_date, end_date, period, year) VALUES (?, ?, ?, ?, ?, ?)");
        $stmt->bind_param("ssssss", $openDate, $closeDate, $startDate, $endDate, $period, $year);
        $stmt->execute();
        $stmt->close();
        return true;
    } else {
        // update existing leave period
        $stmt = $db->prepare("UPDATE leave_periods SET open_date=?, close_date=? WHERE lpid=?");
        $stmt->bind_param("sss", $openDate, $closeDate, $lpid);
        $stmt->execute();
        $stmt->close();
        return true;
    }
}

$_POST = json_decode(file_get_contents("php://input"), true);
echo editLeavePeriod($mysqli, $_POST["lpid"], $_POST["period"], $_POST["year"], $_POST["openDate"], $_POST["closeDate"]);
?>
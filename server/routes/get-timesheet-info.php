<?php 

ini_set('session.gc_maxlifetime', 14400);
session_set_cookie_params(14400);

session_start();
include "./do_auth.php";

if (isset($_SESSION["host"])) {
    $host = $_SESSION["host"];
} else {
    $host = "https://www.hawaii.edu/help/hdsupport/";
}

function getTimesheetInfo($db, $passed_payPeriod, $passed_year, $passed_username)
{
    error_reporting(0);

    require "./timesheet_functions.php";
    require "./timesheet_ver_functions.php";
    require "./calc_timesheet.php";

    $return = array();

    $grandTotals = array();
    $grandTotals[] = $grand_total_reg_parsed;
    $grandTotals[] = $grand_total_night_parsed;
    $grandTotals[] = $grand_totalot_reg_parsed;
    $grandTotals[] = $grand_totalot_night_parsed;

    $return[] = $week1;
    $return[] = $week2;
    $return[] = $week3;
    $return[] = $partial_week;
    $return[] = $grandTotals;

    error_reporting(E_ALL);

    return json_encode($return);
}

$_POST = json_decode(file_get_contents("php://input"), true);
echo getTimesheetInfo($mysqli, $_POST['payPeriod'], $_POST['year'], $_POST['username']);

?>
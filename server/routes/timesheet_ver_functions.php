<?php

function get_max_hours($start)
{
     // start date adjust
    $adjstart = $start - 86400 - (date("w", $start - 86400) * 86400); // get the sunday of the week
    $qry = "SELECT * FROM wwexceptions WHERE date='$adjstart' LIMIT 1";
    $result = mysqli_query($GLOBALS['mysqli'], $qry);
    if ($row = mysqli_fetch_array($result))
        return 2400; //40 hours per week (in minutes)
    else
        return 1200; //20 hours per week (in minutes)
}

function verify_partial_hours(&$partial_week, &$week1)
{
    $student_max_hours = get_max_hours($week1["start_day"]);

    $partial_week_mins = $partial_week["subtotal_reg_mins"] + $partial_week["subtotal_night_mins"];
    $partial_week_mins_ot = $partial_week["subtotalot_reg_mins"] + $partial_week["subtotalot_night_mins"];

    $week1_mins = $week1["subtotal_reg_mins"] + $week1["subtotal_night_mins"];
    $week1_mins_ot = $week1["subtotalot_reg_mins"] + $week1["subtotalot_night_mins"];

    $checkval = $partial_week_mins + $week1_mins + $partial_week_mins_ot + $week1_mins_ot;

    if ($checkval > $student_max_hours) {
        $partial_week["partial_week_hours_parsed"] = "<font color='red'>ERROR: " . $partial_week["partial_week_hours_parsed"] . "</font>";
        $week1["subtotal_reg"] = "<font color='red'>ERROR: " . $week1["subtotal_reg"] . "</font>";
        $week1["subtotal_night"] = "<font color='red'>ERROR: " . $week1["subtotal_night"] . "</font>";
    }
}

function verify_full_week_hours(&$week)
{
    $student_max_hours = get_max_hours($week["start_day"]);

    $week_mins = $week["subtotal_reg_mins"] + $week["subtotal_night_mins"];
    $week_mins_ot = $week["subtotalot_reg_mins"] + $week["subtotalot_night_mins"];

    if (($week_mins + $week_mins_ot) > $student_max_hours) {
        $week["subtotal_reg"] = "<font color='red'>ERROR: " . $week["subtotal_reg"] . "</font>";
        $week["subtotal_night"] = "<font color='red'>ERROR: " . $week["subtotal_night"] . "</font>";
    }
}


function verify_daily_hours(&$week)
{
    foreach ($week as $key => $val) {
        if (isset($week[$key]["total_reg_mins"]) && isset($week[$key]["total_night_mins"])) {
            $total_mins = $week[$key]["total_reg_mins"] + $week[$key]["total_night_mins"];
        }

        if ($total_mins > 480) {
            for ($x = 0; $x < 6; $x++) {
                if (!empty($week[$key]["times"]) && $week[$key]["times"][$x] != "") 
                    $week[$key]["times"][$x] = "<font color='red'>ERROR: " . $week[$key]["times"][$x] . "</font>";
                
            }
            if (!empty($week[$key]["total_reg"])) {
                $week[$key]["total_reg"] = "<font color='red'>ERROR: " . $week[$key]["total_reg"] . "</font>";
                $week[$key]["total_night"] = "<font color='red'>ERROR: " . $week[$key]["total_night"] . "</font>";
            }
        }
    }
}
?>
<?php

$week1 = array();
$week2 = array();
$week3 = array();

//chose date, so we are calculating the timesheet
//that includes this date, for the current user.

$chosen_year = $passed_year;
$chosen_period = $passed_payPeriod;
$chosen_user = $passed_username;

$splitPeriod = explode(',', $passed_payPeriod);
$chosen_month = $splitPeriod[0];
$chosen_day = $splitPeriod[1];

//period start and end dates should be static once calculated.
$period_start_day;
$period_start_month;
$period_start_year;

$period_end_day;
$period_end_month;
$period_end_year;

//populate period start and end dates 
calc_initial_vars(
    $chosen_day,
    $chosen_month,
    $chosen_year,
    $period_start_day,
    $period_start_month,
    $period_start_year,
    $period_end_day,
    $period_end_month,
    $period_end_year
);

//the first day of the first week is always the first day of the pay period.
//we'll increment these week_start vars as we progress through week population.
$week_start_day = $period_start_day;
$week_start_month = $period_start_month;
$week_start_year = $period_start_year;

//calculate the 3 weeks on the timesheet.
$week1 = calc_week(
    $chosen_user,
    $week_start_day,
    $week_start_month,
    $week_start_year,
    $period_end_day,
    $period_end_month,
    $period_end_year,
    $period_start_day,
    $period_start_month,
    $period_start_year
);
$week1["start_day"] = mktime(0, 0, 0, $week_start_month, $week_start_day, $week_start_year);

$week2 = calc_week(
    $chosen_user,
    $week_start_day,
    $week_start_month,
    $week_start_year,
    $period_end_day,
    $period_end_month,
    $period_end_year,
    $period_start_day,
    $period_start_month,
    $period_start_year
);
$week2["start_day"] = mktime(0, 0, 0, $week_start_month, $week_start_day, $week_start_year);

$week3 = calc_week(
    $chosen_user,
    $week_start_day,
    $week_start_month,
    $week_start_year,
    $period_end_day,
    $period_end_month,
    $period_end_year,
    $period_start_day,
    $period_start_month,
    $period_start_year
);
$week3["start_day"] = mktime(0, 0, 0, $week_start_month, $week_start_day, $week_start_year);

$grand_total_reg_mins = $week1["subtotal_reg_mins"] + $week2["subtotal_reg_mins"] + $week3["subtotal_reg_mins"];
$grand_total_reg_parsed = sprintf("%u:%02u", ($grand_total_reg_mins - $grand_total_reg_mins % 60) / 60, $grand_total_reg_mins % 60);
$grand_total_reg_conv = sprintf("%u.%02u", ($grand_total_reg_mins - $grand_total_reg_mins % 60) / 60, round($grand_total_reg_mins % 60 / 60 * 100));

$grand_total_night_mins = $week1["subtotal_night_mins"] + $week2["subtotal_night_mins"] + $week3["subtotal_night_mins"];
$grand_total_night_parsed = sprintf("%u:%02u", ($grand_total_night_mins - $grand_total_night_mins % 60) / 60, $grand_total_night_mins % 60);
$grand_total_night_conv = sprintf("%u.%02u", ($grand_total_night_mins - $grand_total_night_mins % 60) / 60, round($grand_total_night_mins % 60 / 60 * 100));

$grand_totalot_reg_mins = $week1["subtotalot_reg_mins"] + $week2["subtotalot_reg_mins"] + $week3["subtotalot_reg_mins"];
$grand_totalot_reg_parsed = sprintf("%u:%02u", ($grand_totalot_reg_mins - $grand_totalot_reg_mins % 60) / 60, $grand_totalot_reg_mins % 60);
$grand_totalot_reg_conv = sprintf("%u.%02u", ($grand_totalot_reg_mins - $grand_totalot_reg_mins % 60) / 60, round($grand_totalot_reg_mins % 60 / 60 * 100));

$grand_totalot_night_mins = $week1["subtotalot_night_mins"] + $week2["subtotalot_night_mins"] + $week3["subtotalot_night_mins"];
$grand_totalot_night_parsed = sprintf("%u:%02u", ($grand_totalot_night_mins - $grand_totalot_night_mins % 60) / 60, $grand_totalot_night_mins % 60);
$grand_totalot_night_conv = sprintf("%u.%02u", ($grand_totalot_night_mins - $grand_totalot_night_mins % 60) / 60, round($grand_totalot_night_mins % 60 / 60 * 100));

//find the Sunday before the first day of the week,
$week_start_sunday = find_week_start_day($period_start_day, $period_start_month, $period_start_year);

//calculate the partial week info.
//start of this "week" is the sunday of the first pay period week.
//end period of this "week" is the day before the actual first day of the pay period
//start of the period is the sunday of the first pay period week.
//only do this if week 1 doesn't start on a Sunday (no need for partial week hours then)

$partial_week = array();

if ($week_start_sunday["day"] == $period_start_day && $week_start_sunday["month"] == $period_start_month && $week_start_sunday["year"] == $period_start_year) {
    $partial_week["partial_week_mins"] = 0;
    $partial_week["partial_week_hours_parsed"] = "0:00";
} else {
    $partial_week = calc_week(
        $chosen_user,
        $week_start_sunday["day"],
        $week_start_sunday["month"],
        $week_start_sunday["year"],
        $period_start_day - 1,
        $period_start_month,
        $period_start_year,
        $week_start_sunday["day"],
        $week_start_sunday["month"],
        $week_start_sunday["year"]
    );

    $partial_week["partial_week_mins"] = $partial_week["subtotal_reg_mins"] + $partial_week["subtotal_night_mins"];
    $partial_week["partial_week_mins"] += $partial_week["subtotalot_reg_mins"] + $partial_week["subtotalot_night_mins"];

    $partial_week["partial_week_hours_parsed"] = sprintf(
        "%u:%02u",
        ($partial_week["partial_week_mins"] - $partial_week["partial_week_mins"] % 60) / 60,
        $partial_week["partial_week_mins"] % 60
    );

}

//verify output, and color tag them appropriately.

//check partial week and week1 hours do not exceed 20 hours.
verify_partial_hours($partial_week, $week1);

//check week2 and week3 subtotals do not exceed 20 hours.
verify_full_week_hours($week2);

verify_full_week_hours($week3);

//check every day's times do not exceed 8 hours.
verify_daily_hours($week1);
verify_daily_hours($week2);
verify_daily_hours($week3);

//ENDSTATE: week arrays are populated, verified, and ready for display to timesheet form.
?>

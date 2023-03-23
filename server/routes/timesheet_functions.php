<?php

//calculate and assign the values for the start and end dates of the pay period by reference,
//using the user input date.
//the time period chosen should include the date input by the user.
function calc_initial_vars(
    $chosen_day,
    $chosen_month,
    $chosen_year,
    &$period_start_day,
    &$period_start_month,
    &$period_start_year,
    &$period_end_day,
    &$period_end_month,
    &$period_end_year
) {
  //if the chosen day falls between 9/6/07 and 9/10/07, set the period start and end dates to 9/6 and 9/10, respectively
    if ($chosen_month == 9 && $chosen_year == 2007 && $chosen_day >= 6 && $chosen_day <= 10) {
        $period_start_day = 6;
        $period_start_month = 9;
        $period_start_year = 2007;

        $period_end_day = 10;
        $period_end_month = 9;
        $period_end_year = 2007;
  //if the chosen day is within the pay period of 12/26/07-1/09/08
    } else if (($chosen_year == 2007 && $chosen_month == 12 && $chosen_day >= 26) || ($chosen_year == 2008 && $chosen_month == 1 && $chosen_day <= 9)) {
        //start date will be 12/26/07 and end date will be 1/9/08
        $period_start_day = 26;
        $period_start_month = 12;
        $period_start_year = 2007;

        $period_end_day = 9;
        $period_end_month = 1;
        $period_end_year = 2008;
  //if the chosen day is within the pay period of 12/25/08-01/05/09
    } else if (($chosen_year == 2008 && $chosen_month == 12 && $chosen_day >= 25) || ($chosen_year == 2009 && $chosen_month == 1 && $chosen_day <= 5)) {
        //start date will be 12/25/08 and end date will be 01/05/09
        $period_start_day = 25;
        $period_start_month = 12;
        $period_start_year = 2008;

        $period_end_day = 5;
        $period_end_month = 1;
        $period_end_year = 2009;
  //From 9/11/2007 till 12/25/2007, the pay periods were 11th-25th or 26th-10th
    } else if ($chosen_year == 2007 && ($chosen_month > 9 || ($chosen_month == 9 && $chosen_day >= 10))) {
    //if the chosen day falls within the 11th-25th pay period.
        if ($chosen_day >= 11 && $chosen_day <= 25) {
        //start and end dates are always within the same month
	//of the same year.
            $period_start_day = 11;
            $period_start_month = $chosen_month;
            $period_start_year = $chosen_year;

            $period_end_day = 25;
            $period_end_month = $chosen_month;
            $period_end_year = $chosen_year;

    //if the chosen day is greater than or equal to 26, then it falls within
    //the 26th to 10th pay period.
        } else if ($chosen_day >= 26) {
            $period_start_day = 26;
            $period_start_month = $chosen_month;
            $period_start_year = $chosen_year;

            $period_end_day = 10;
	
	//if the start date is December, the end date will be in January
	//of the next year.
            if ($period_start_month == 12) {
                $period_end_month = 1;
                $period_end_year = $period_start_year + 1;
	//otherwise, the end date will be the next month of the same year
            } else {
                $period_end_month = $period_start_month + 1;
                $period_end_year = $period_start_year;
            }
    //if the chosen day is less than 11, it also falls within the 26th-10th
    //pay period, but the start and end dates need to be calculated differently.
        } else {
            $period_start_day = 26;
            $period_end_day = 10;
	//if its january, then the start month is december of last year,
	//and the end month is january of this year.
            if ($chosen_month == 1) {
                $period_start_month = 12;
                $period_start_year = $chosen_year - 1;
                $period_end_month = $chosen_month;
                $period_end_year = $chosen_year;
	//otherwise the start month is the previous month of this year,
	//and then end month is this month of this year.
            } else {
                $period_start_month = $chosen_month - 1;
                $period_start_year = $chosen_year;
                $period_end_month = $chosen_month;
                $period_end_year = $chosen_year;
            }
        }

  //From 1/10/2008 through 12/24/2008, the pay periods are 10th-24th or 25th-9th
    } else if ($chosen_year == 2008 && (($chosen_month == 1 && $chosen_day >= 10) || ($chosen_month == 12 && $chosen_day <= 24) || ($chosen_month > 1 && $chosen_moth < 12))) {

    //if the chosen day falls within the 10th-24th pay period.
        if ($chosen_day >= 10 && $chosen_day <= 24) {

        //start and end dates are always within the same month
	//of the same year.
            $period_start_day = 10;
            $period_start_month = $chosen_month;
            $period_start_year = $chosen_year;

            $period_end_day = 24;
            $period_end_month = $chosen_month;
            $period_end_year = $chosen_year;

    //if the chosen day is greater than or equal to 25, then it falls within
    //the 25th-9th pay period.
        } else if ($chosen_day >= 25) {

            $period_start_day = 25;
            $period_start_month = $chosen_month;
            $period_start_year = $chosen_year;

            $period_end_day = 9;
	
	//if the start date is December, the end date will be in January
	//of the next year.
            if ($period_start_month == 12) {

                $period_end_month = 1;
                $period_end_year = $period_start_year + 1;
	
	//otherwise, the end date will be the next month of the same year
            } else {

                $period_end_month = $period_start_month + 1;
                $period_end_year = $period_start_year;

            }
  
    //if the chosen day is less than 10, it also falls within the 25th-9th
    //pay period, but the start and end dates need to be calculated differently.
        } else {

            $period_start_day = 25;
            $period_end_day = 9;
	
	//if its january, then the start month is december of last year,
	//and the end month is january of this year.
            if ($chosen_month == 1) {

                $period_start_month = 12;
                $period_start_year = $chosen_year - 1;
                $period_end_month = $chosen_month;
                $period_end_year = $chosen_year;
	
	//otherwise the start month is the previous month of this year,
	//and then end month is this month of this year.
            } else {

                $period_start_month = $chosen_month - 1;
                $period_start_year = $chosen_year;
                $period_end_month = $chosen_month;
                $period_end_year = $chosen_year;

            }

        }

  //if the chosen day falls before 9/5/07, or between 1/5/2009 and 12/6/2012, set the time period to use the 6th-20th or 21st-5th start and end dates
    } else if (($chosen_year == 2007 && $chosen_month == 9 && $chosen_day < 6) || ($chosen_year == 2007 && $chosen_month < 9) || ($chosen_year < 2007) || ($chosen_year == 2009 && $chosen_month == 1 && $chosen_day > 6) || ($chosen_year == 2009 && $chosen_month > 1) || ($chosen_year > 2009 && $chosen_year < 2012) || ($chosen_year == 2012 && $chosen_month < 12) || ($chosen_year == 2012 && $chosen_month == 12 && $chosen_day < 6)) {

        //if the chosen day falls within the 6th-20th time period.
        if ($chosen_day >= 6 && $chosen_day <= 20) {

            //start and end dates are always within the same month
	    //of the same year.
            $period_start_day = 6;
            $period_start_month = $chosen_month;
            $period_start_year = $chosen_year;

            $period_end_day = 20;
            $period_end_month = $chosen_month;
            $period_end_year = $chosen_year;

        //if the chosen day is greater than or equal to 21, then it falls within
        //the 21st to 5th pay period.
        } else if ($chosen_day >= 21) {

            $period_start_day = 21;
            $period_start_month = $chosen_month;
            $period_start_year = $chosen_year;

            $period_end_day = 5;
	
            //if the start date is December, the end date will be in January
            //of the next year.
            if ($period_start_month == 12) {

                $period_end_month = 1;
                $period_end_year = $period_start_year + 1;

            //otherwise, the end date will be the next month of the same year
            } else {

                $period_end_month = $period_start_month + 1;
                $period_end_year = $period_start_year;

            }

        //if the chosen day is less than 5, it also falls within the 21st-5th
        //pay period, but the start and end dates need to be calculated differently.
        } else if ($chosen_day <= 5) {

            $period_start_day = 21;
            $period_end_day = 5;

            //if its january, then the start month is december of last year,
            //and the end month is january of this year.
            if ($chosen_month == 1) {

                $period_start_month = 12;
                $period_start_year = $chosen_year - 1;
                $period_end_month = $chosen_month;
                $period_end_year = $chosen_year;

            //otherwise the start month is the previous month of this year,
            //and then end month is this month of this year.
            } else {

                $period_start_month = $chosen_month - 1;
                $period_start_year = $chosen_year;
                $period_end_month = $chosen_month;
                $period_end_year = $chosen_year;

            }

        }

  //if the chosen day falls after 12/6/2012, set the time period to use the 1st-15th or 16th-<end of month> start and end dates
    } else if (($chosen_year == 2012 && $chosen_month == 12 && $chosen_day > 6) || ($chosen_year > 2012)) {

	//a special pay period setup for 12/6/2012-12/31/2012, will split this into 2 timesheet pages based on the chosen day
        if ($chosen_year == 2012 && $chosen_month == 12 && $chosen_day >= 6) {

	    //print out page 1 of this pay period (12/6/2012-12/22/2012)
            if ($chosen_day >= 6 && $chosen_day <= 22) {

                $period_start_day = 6;
                $period_start_month = $chosen_month;
                $period_start_year = $chosen_year;

                $period_end_day = 22;
                $period_end_month = $chosen_month;
                $period_end_year = $chosen_year;

	    //print out page 2 of this pay period (12/23/2012-12/31/2012)
            } else {

                $period_start_day = 23;
                $period_start_month = $chosen_month;
                $period_start_year = $chosen_year;

                $period_end_day = 31;
                $period_end_month = $chosen_month;
                $period_end_year = $chosen_year;

            }

	//special pay periods for 2/2013 - 2/1/2013-2/14/2013 and 2/15/2013-2/28/2013
        } else if ($chosen_year == 2013 && $chosen_month == 2) {

	    //chosen_day is in period 2/1/2013-2/14/2013
            if ($chosen_day <= 14) {

                $period_start_day = 1;
                $period_start_month = $chosen_month;
                $period_start_year = $chosen_year;

                $period_end_day = 14;
                $period_end_month = $chosen_month;
                $period_end_year = $chosen_year;

	    //chosen_day is in period 2/15/2013-2/28/2013
            } else {

                $period_start_day = 15;
                $period_start_month = $chosen_month;
                $period_start_year = $chosen_year;

                $period_end_day = 28;
                $period_end_month = $chosen_month;
                $period_end_year = $chosen_year;

            }

        //if the chosen day falls within the 1st-15th time period.
        } else if ($chosen_day >= 1 && $chosen_day <= 15) {

            //start and end dates are always within the same month
	    //of the same year.
            $period_start_day = 1;
            $period_start_month = $chosen_month;
            $period_start_year = $chosen_year;

            $period_end_day = 15;
            $period_end_month = $chosen_month;
            $period_end_year = $chosen_year;

        //if the chosen day is greater than or equal to 16, then it falls within
        //the 16th to <end of month> pay period.
        } else if ($chosen_day >= 16) {

            $period_start_day = 16;
            $period_start_month = $chosen_month;
            $period_start_year = $chosen_year;

            $period_end_day = date("t", mktime(0, 0, 0, $chosen_month, $chosen_day, $chosen_year));
            $period_end_month = $chosen_month;
            $period_end_year = $chosen_year;

        }

    }

} //end calc_initial_vars


//calculate times and pull log info
function calc_week(
    $username,
    &$week_start_day,
    &$week_start_month,
    &$week_start_year,
    $period_end_day,
    $period_end_month,
    $period_end_year,
    $period_start_day,
    $period_start_month,
    $period_start_year,
    $period_logs,
    $period_exceptions
) {

    $week = array();

    $current_day = $week_start_day;
    $current_month = $week_start_month;
    $current_year = $week_start_year;

    $this_day = date("l", mktime(0, 0, 0, $current_month, $current_day, $current_year));
  
  
  /*
  format of week arrays:
  
  $array["Day Name"]["date"]            - the mm/dd/yyyy formatted date for this day
                    ["times"][0]-[5]    - hh:mm AM/PM formatted times
					["action"][0]-[5]   - "in" or "out" record of the action type matching to ["times"] data.
					["total_reg"]       - total calculated regular hours for this period, in hh:mm format
					["total_reg_mins"]  - total calculated regular minutes for this period
					["total_night"]     - total calculated night hours for this period, in hh:mm format
					["total_night_mins"]- total calculated night minutes for this period
					["totalot_reg"]       - total calculated regular overtime hours for this period, in hh:mm format
					["totalot_reg_mins"]  - total calculated regular overtime minutes for this period
					["totalot_night"]     - total calculated night overtime hours for this period, in hh:mm format
					["totalot_night_mins"]- total calculated night overtime minutes for this period
		["subtotal_reg"]                - subtotal regular hours for this week
		["subtotal_reg_mins"]           - subtotal regular hours, in raw minutes calculated.
		["subtotal_night"]              - subtotal night hours for this week
		["subtotal_night_mins"]         - subtotal night hours, in raw minutes calculated.
		["subtotalot_reg"]                - subtotal regular overtime hours for this week
		["subtotalot_reg_mins"]           - subtotal regular overtime hours, in raw minutes calculated.
		["subtotalot_night"]              - subtotal night overtime hours for this week
		["subtotalot_night_mins"]         - subtotal night overtime hours, in raw minutes calculated.
					
  NOTE: Overtime and Night Overtime are not calculated by default. 

     */

  //checking if the period end is 9/10/07 and current day is 9/11/07, since this will print through the do-while loop
  //so we need to catch that case so it doesn't print
    if (!($period_end_year == 2007 && $period_end_month == 9 && $period_end_day == 10 && $current_year == 2007 && $current_month == 9 && $current_day == 11)) {
        $log_array = $period_logs;

        $exceptions_array = $period_exceptions;

        do {
            $week[$this_day]["date"] = (int)$current_month . "/" . (int)$current_day . "/" . (int)$current_year;
            $this_day_ut = mktime(0, 0, 0, $current_month, $current_day, $current_year);

            $filter_exception = $week[$this_day]["date"];
            $check_exceptions_res = array_filter($exceptions_array, function ($var) use ($filter_exception){
                return ($var['date_tag'] == $filter_exception);
            });
            $filter_result = array_filter($log_array, function ($var) use ($current_day){
                return ($var['day'] == $current_day);
            });

	        //if there is an entry in the exceptions table for this date and user
            if (count((array)$check_exceptions_res) > 0) {
                global $exc_counter;
                if ($exc_counter == 0) {
                    $exceptions = $check_exceptions_res[0];

                    for ($x = 0; $x < 6; $x++) {

                        $hour = str_pad(substr($exceptions["t" . $x], 0, strpos($exceptions["t" . $x], ":")), 2, '0', STR_PAD_LEFT);
                        $min = substr($exceptions["t" . $x], strpos($exceptions["t" . $x], " ") - 2, strpos($exceptions["t" . $x], " ") - 1);
                        $ampm = substr($exceptions["t" . $x], sizeof((array)$exceptions["t" . $x]) - 3, 2);
    
                        if ($exceptions["t" . $x] != "") {
                            round_time($hour, $min, $ampm);
                            $week[$this_day]["times"][$x] = $hour . ":" . $min . " " . $ampm;
                            $week[$this_day]["action"][$x] = ($x % 2 ? "out" : "in");
    
                        }
                    }
                    $exc_counter = $exc_counter + count((array)$check_exceptions_res);

                } else {
                    $exc_counter = $exc_counter + count((array)$check_exceptions_res);
                    $exceptions = $check_exceptions_res[$exc_counter - 1];
                    for ($x = 0; $x < 6; $x++) {

                        $hour = str_pad(substr($exceptions["t" . $x], 0, strpos($exceptions["t" . $x], ":")), 2, '0', STR_PAD_LEFT);
                        $min = substr($exceptions["t" . $x], strpos($exceptions["t" . $x], " ") - 2, strpos($exceptions["t" . $x], " ") - 1);
                        $ampm = substr($exceptions["t" . $x], sizeof((array)$exceptions["t" . $x]) - 3, 2);
    
                        if ($exceptions["t" . $x] != "") {
                            round_time($hour, $min, $ampm);
                            $week[$this_day]["times"][$x] = $hour . ":" . $min . " " . $ampm;
                            $week[$this_day]["action"][$x] = ($x % 2 ? "out" : "in");
    
                        }
                    }
                }

                global $clock_counter;
                $clock_counter = $clock_counter + count((array)$filter_result);

	//otherwise, calculate the week based on the log table.
            } else {

                $x = 0;

                while ($x < count((array)$filter_result)) {
                    global $clock_counter;

                    $hour = str_pad($filter_result[$x + $clock_counter]["hour"], 2, '0', STR_PAD_LEFT);
                    $min = $filter_result[$x + $clock_counter]["min"];
                    $ampm = $filter_result[$x + $clock_counter]["ampm"];
                    $action = $filter_result[$x + $clock_counter]["action"];
	  
	    //round the time to the nearest 5 minute multiple.
                    round_time($hour, $min, $ampm);
	  
	    //the final result after all manipulation is plopped into the week's array.
                    $week[$this_day]["times"][$x] = $hour . ":" . $min . " " . $ampm;
                    $week[$this_day]["action"][$x] = $action;

                    $x++;

                }
                global $clock_counter;
                $clock_counter = $clock_counter + count((array)$filter_result);

            }//end else

 

  //since using a do-while loop, when the pay period is <= 14 days, the end of the pay period is on the second week, so the first date of the next pay period will print on the third week
  //to fix this, will need to check for this condition and unset the date so the timesheet doesn't have an erroneous date listed

            $after_period_end_day = date("j", mktime(0, 0, 0, $period_end_month, $period_end_day + 1, $period_end_year));
            $after_period_end_month = date("n", mktime(0, 0, 0, $period_end_month, $period_end_day + 1, $period_end_year));
            $after_period_end_year = date("Y", mktime(0, 0, 0, $period_end_month, $period_end_day + 1, $period_end_year));


            if ($current_month == $after_period_end_month && $current_day == $after_period_end_day && $current_year == $after_period_end_year) {
                unset($week[$this_day]);
            } //end if
            increment_day($current_day, $current_month, $current_year);
            $this_day = date("l", mktime(0, 0, 0, $current_month, $current_day, $current_year));


        } while ($this_day != "Sunday" && is_in_period(
            $current_day,
            $current_month,
            $current_year,
            $period_end_day,
            $period_end_month,
            $period_end_year,
            $period_start_day,
            $period_start_month,
            $period_start_year
        ));

    } //end if

  //make sure each day starts with an "in" action and
  //ends with an "out" action. otherwise drop the offenders.
    synch_times($week);
  
  
  //calculate hours worked and create and populate the appropriate array values.
    calc_hours_worked($week);
  

  //update the week_start variables, so the next call to this function
  //starts on the next unprocessed day.
    $week_start_day = $current_day;
    $week_start_month = $current_month;
    $week_start_year = $current_year;

    return $week;
}//end calc_week


//used for iterating through a given week.
//checks for month and year changes.
function increment_day(&$day, &$month, &$year)
{

    if ($day == date("t", mktime(0, 0, 0, $month, $day, $year))) {

        $day = "01";

        if ($month == "12") {

            $month = "01";
            $year++;

        } else {
            $month++;
        }

    } else {

        $day++;

    }


} //end increment_day


//find the Sunday before the first day of the pay cycle
//used to calculate partial hours for last week.
//$day, $month, and $year is the first day of the pay cycle.
function find_week_start_day($oday, $omonth, $oyear)
{

    $week_start_date = array();

    $day = $oday;
    $month = $omonth;
    $year = $oyear;

    $this_day = date("l", mktime(0, 0, 0, $month, $day, $year));

    while ($this_day != "Sunday") {

        if ($day == 1) {

            if ($month == 1) {

                $month = 12;
                $year--;
                $day = (int)date("t", mktime(0, 0, 0, $month, 1, $year));

            } else {

                $month--;
                $day = (int)date("t", mktime(0, 0, 0, $month, 1, $year));

            }

        } else {

            $day--;

        }

        $this_day = date("l", mktime(0, 0, 0, $month, $day, $year));

    }//end while


    $week_start_date["month"] = $month;
    $week_start_date["day"] = $day;
    $week_start_date["year"] = $year;

    return $week_start_date;

}


//checks to see whether a given date is within the calculated time period.
function is_in_period($day, $month, $year, $period_end_day, $period_end_month, $period_end_year, $period_start_day, $period_start_month, $period_start_year)
{

  //the one-time special pay period of 9/6/07-9/10/07
    if (($period_start_year == 2007 && $period_start_month == 9 && $period_start_day == 6) && ($period_end_year == 2007 && $period_end_month == 9 && $period_end_day == 10)) {

        if ($year == $period_end_year && $month == $period_end_month && $day <= $period_end_day && $day >= $period_start_day) {

            return true;

        } else {

            return false;

        }

  //the one-time special pay period of 12/26/07-1/9/08
    } else if (($period_start_year == 2007 && $period_start_month == 12 && $period_start_day == 26) && ($period_end_year == 2008 && $period_end_month == 1 && $period_end_day == 9)) {

        if (($year == $period_end_year && $month == $period_end_month && $day <= $period_end_day) || ($year == $period_start_year && $month == $period_start_month && $day >= $period_start_day)) {

            return true;

        } else {

            return false;

        }

  //the one-time special pay period of 12/25/08-1/5/09
    } else if (($period_start_year == 2008 && $period_start_month == 12 && $period_start_day == 25) && ($period_end_year == 2009 && $period_end_month == 1 && $period_end_day == 5)) {

        if (($year == $period_end_year && $month == $period_end_month && $day <= $period_end_day) || ($year == $period_start_year && $month == $period_start_month && $day >= $period_start_day)) {

            return true;

        } else {

            return false;

        }

  //pay periods between 9/10/07 and 12/25/07
    } else if ($period_end_year == 2007 && (($period_end_month > 9 && $period_end_month < 12) || ($period_end_month == 9 && $period_end_day >= 10) || ($period_end_month == 12 && $period_end_day <= 25))) {

    //within the 26th-10th pay period
        if ($period_end_day == 10 && $period_start_day == 26) {

            if (($year == $period_end_year && $month == $period_end_month && $day <= $period_end_day) || ($year == $period_start_year && $month == $period_start_month && $day >= $period_start_day)) {

                return true;

            } else {

                return false;

            }

    //within the 11th-25th time period or we're calculating a partial week
        } else {

      //if the day is between the start and end days of the period and the month and year are the same as
      //the month and year of the period end date, then the given date is in this period.
            if ($day <= $period_end_day && $day >= $period_start_day && $month == $period_end_month && $year == $period_end_year) {

                return true;

            } else {

                return false;

            }

        }

  //pay periods after 1/9/08 and before 12/25/08
    } else if ($period_end_year == 2008 && (($period_end_month == 1 && $period_end_day >= 10) || ($period_end_month == 12 && $period_end_day <= 24) || ($period_end_month > 1 && $period_end_month < 12))) {

    //within the 25th-9th pay period
        if ($period_end_day == 9 && $period_start_day == 25) {

            if (($year == $period_end_year && $month == $period_end_month && $day <= $period_end_day) || ($year == $period_start_year && $month == $period_start_month && $day >= $period_start_day)) {

                return true;

            } else {

                return false;

            }

    //within the 10th-24th pay period or we're calculating a partial week
        } else {

      //if the day is between the start and end days of the period and the month and year are the same as
      //the month and year of the period end date, then the given date is in this period.
            if ($day <= $period_end_day && $day >= $period_start_day && $month == $period_end_month && $year == $period_end_year) {

                return true;

            } else {

                return false;

            }

        }

  //all pay periods before 9/5/07 or after 1/6/2009, or partial weeks
    } else {

    //we're within the 21st-5th time period
        if ($period_end_day == 5 && $period_start_day == 21) {

            if (($year == $period_end_year && $month == $period_end_month && $day <= $period_end_day) || ($year == $period_start_year && $month == $period_start_month && $day >= $period_start_day)) {

                return true;

            } else {

                return false;
            }
  
    //we're within the 6th-20th time period or we're calculating a partial week
        } else if ($period_end_day == 6 && $period_start_day == 20) {
  
      //if the day is between the start and end days of the period and the month and year are the same as
      //the month and year of the period end date, then the given date is in this period.
            if ($day <= $period_end_day && $day >= $period_start_day && $month == $period_end_month && $year == $period_end_year) {

                return true;

            } else {

                return false;

            }

    //we're in a partial week, or something is amiss
        } else {

      //if partial week crosses years
            if ($period_start_year < $period_end_year) {

        //date is in same year as period start
                if ($year == $period_start_year) {

          //date is in same month as period start
                    if ($month == $period_start_month) {

                        $period_start_month_end = date("t", mktime(0, 0, 0, $period_start_month, 1, $period_start_year));

                        if ($day >= $period_start_day && $day <= $period_start_month_end) {

                            return true;

                        } else {

                            return false;

                        }

          //date is in any valid month after period start
                    } else if ($month > $period_start_month && $month <= 12) {

                        return true;

                    } else {

                        return false;

                    } //end if (period month check)

        //date is in same year as period end
                } else if ($year == $period_end_year) {

          //date is in same month as period end
                    if ($month == $period_end_month) {

                        if ($day >= 1 && $day <= $period_end_day) {

                            return true;

                        } else {

                            return false;

                        }

          //date is in any valid month before period end
                    } else if ($month >= 1 && $month < $period_end_month) {

                        return true;

                    } else {

                        return false;

                    } //end if (period month check)

        //date is in a year between the period start year and end year
                } else if ($year > $period_start_year && $year < $period_end_year) {

                    return true;

                } else {

                    return false;

                } //end if
 
      //if partial week period in the same year
            } else if ($period_start_year == $period_end_year) {

        //partial week starts and ends in different months
                if ($period_start_month != $period_end_month) {

                    if ($period_start_month < $period_end_month) {

            //date is in same month as period start month
                        if ($month == $period_start_month) {

                            $period_start_month_end = date("t", mktime(0, 0, 0, $period_start_month, 1, $period_start_year));

                            if ($day >= $period_start_day && $day <= $period_start_month_end) {

                                return true;

                            } else {

                                return false;

                            }

            //date is in same month as period end month
                        } else if ($month == $period_end_month) {

                            if ($day >= 1 && $day <= $period_end_day) {

                                return true;

                            } else {

                                return false;

                            }

            //date is in a month between period start and end
                        } else if ($month > $period_start_month && $month < $period_end_month) {

                            return true;

                        } else {

                            return false;

                        }

          //invalid period specified
                    } else {

                        return false;

                    }

        //partial week starts and ends in same month
                } else {

                    if ($month == $period_start_month && $day >= $period_start_day && $day <= $period_end_day) {

                        return true;

                    } else {

                        return false;

                    }

                } //end if (period month check)

            } else {

                return false;

            } //end if (period year check)

        } //end if

    } //end if (special period check)

}//end is_in_period

//current assumption: If minutes value mod 5 is 2 or less, round the time
//down to the nearest 5 minute increment. If it is 3 or higher, round it to
//the next highest increment.
function round_time(&$hour, &$min, &$ampm)
{

  //if the minute is between 0-2, ie 3:10 or 4:42
  //then round it down.
    if (((int)$min % 5) <= 2) {

        $min = (int)$min - ((int)$min % 5);
  
  //otherwise, if it is the 3 or 4, or 8 or 9, minute,
  //then round it up.
    } else {
  
    //if min is within the 55 block and we're rounding up,
	//we need to increment the hour and check to see whether
	//AM/PM needs to be toggled.
        if ($min >= 55) {
            $min = 0;

            if ($hour == 11) {
                $hour = 12;
                if ($ampm == "AM")
                    $ampm = "PM";
                else
                    $ampm = "AM";
            } else if ($hour == 12) {

                $hour = 1;

            } else {
                $hour++;
            }
	   	
	  //if the min block is not in the 55 block and we're rounding up,
	  //we just need to add on the difference between 5 and mod 5, so
	  //the min rounds up to the next multiple of 5.  
        } else {

            $min = $min + (5 - ($min % 5));

        }

    } //end else

  //for formatting, if the minute is less than 10, pad it with a 0.
    if ($min < 10)
        $min = "0" . $min;

} //end round_time


//make sure that for each day calculated, the first action is always an "in"
//and the last action is always an "out". If not, drop the offending action
//so it evens out.
function synch_times(&$week)
{

    foreach ($week as $key => $day) {

        if ($day["action"][0] == "out") {

            for ($x = 0; $x < count((array)$day["times"]); $x++) {

                $week[$key]["times"][$x] = $week[$key]["times"][$x + 1];
                $week[$key]["action"][$x] = $week[$key]["action"][$x + 1];

            }

        }//end if first day is an "out"

        if ($day["action"][count((array)$day["times"]) - 1] == "in") {

            $week[$key]["times"][count((array)$day["times"]) - 1] = "";
            $week[$key]["action"][count((array)$day["action"]) - 1] = "";

        }//end if last day is an "in"

    }//end foreach


} //end synch_times


function calc_hours_worked(&$week)
{

    $subtotal_reg_mins = 0;
    $subtotal_night_mins = 0;
    $subtotalot_reg_mins = 0;
    $subtotalot_night_mins = 0;

  // holiday array
    $holidayarr = array();

    $qry = "SELECT * FROM holidays WHERE date>='" . strtotime($week["Sunday"]["date"]) . "' AND date<='" . strtotime($week["Saturday"]["date"]) . "' LIMIT 7";
    $result = mysqli_query($GLOBALS['mysqli'], $qry);
    while ($row = mysqli_fetch_array($result)) {
        array_push($holidayarr, $row['date']);
    }
    $dow = array('Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday');

  //array to hold converted time
    $temp_times = array();
	
  //increment through the days
    foreach ($week as $key => $value) {

     // holiday array
        $qry = "SELECT * FROM holidays WHERE date='" . strtotime($week[$key]["date"]) . "' LIMIT 1";
        $result = mysqli_query($GLOBALS['mysqli'], $qry);
        if ($row = mysqli_fetch_array($result))
            array_push($holidayarr, $row['date']);

      
    //convert PM time to 24-hour format for easy calculation
        for ($x = 0; $x < 6; $x++) {

            if (strpos($week[$key]["times"][$x], "PM") != false && $week[$key]["times"][$x] != false) {

                if (substr($week[$key]["times"][$x], 0, 2) != "12")
                    $hour = substr($week[$key]["times"][$x], 0, 2) + 12;
                else
                    $hour = substr($week[$key]["times"][$x], 0, 2);
                $min = substr($week[$key]["times"][$x], strpos($week[$key]["times"][$x], ":") + 1, 2);

                $temp_times[$key][$x]["hour"] = $hour;
                $temp_times[$key][$x]["min"] = $min;

            } else if (isset($week[$key]["times"][$x]) && $week[$key]["times"][$x] != false) {


                $temp_times[$key][$x]["hour"] = substr($week[$key]["times"][$x], 0, 2);
                $temp_times[$key][$x]["min"] = substr($week[$key]["times"][$x], strpos($week[$key]["times"][$x], ":") + 1, 2);
            // 12:00am endtime fix
                if (strpos($week[$key]["times"][$x], "AM") != false && $temp_times[$key][$x]["hour"] == "12") {
                    if ($temp_times[$key][$x]["min"] == "0") {
                        if ($week[$key]["action"][$x] == "in")
                            $temp_times[$key][$x]["hour"] = "0";
                        else
                            $temp_times[$key][$x]["hour"] = "24";
                    } else
                        $temp_times[$key][$x]["hour"] = "0";
                }

            } else {

                $temp_times[$key][$x]["hour"] = 0;
                $temp_times[$key][$x]["min"] = 0;

            }

        }//end for

    }//end foreach

  //increment through the days
    foreach ($week as $key => $value) {
    
	//calculate raw hour difference 
        $per1 = calc_single_set_hours($temp_times[$key][0], $temp_times[$key][1]);
	
	//echo "per1: " . $per1["reg"] . " " . $per1["night"] . "<br />";

        $per2 = calc_single_set_hours($temp_times[$key][2], $temp_times[$key][3]);
	
	//echo "per2: " . $per2["reg"] . " " . $per2["night"] . "<br />";

        $per3 = calc_single_set_hours($temp_times[$key][4], $temp_times[$key][5]);
	
	//echo "per3: " . $per3["reg"] . " " . $per3["night"] . "<br />";

        $total_reg = $per1["reg"] + $per2["reg"] + $per3["reg"];

        $parsetime_reg = sprintf("%u:%02u", ($total_reg - $total_reg % 60) / 60, $total_reg % 60);

        // holiday check
        $today = strtotime($week[$key]["date"]);

        $holiday = 0;
        if (in_array($today, $holidayarr)) { // today is a holiday
            $holiday = 1;
        } elseif (in_array(($today + 86400), $holidayarr)) { // day before a holiday
            $tmin = 0;
            if (intval($temp_times[$key][1]["hour"]) == 24) { // working overnight
                $tmin += (23 - intval($temp_times[$key][0]["hour"])) * 60;
                $tmin += 60 - intval($temp_times[$key][0]["min"]);
            }
            if (intval($temp_times[$key][3]["hour"]) == 24) { // working overnight
                $tmin += (23 - intval($temp_times[$key][2]["hour"])) * 60;
                $tmin += 60 - intval($temp_times[$key][2]["min"]);
            }
            if (intval($temp_times[$key][5]["hour"]) == 24) { // working overnight
                $tmin += (23 - intval($temp_times[$key][4]["hour"])) * 60;
                $tmin += 60 - intval($temp_times[$key][4]["min"]);
            }
            $tmp = $dow[array_search($key, $dow) + 1];
            $hmin = intval($temp_times[$tmp][1]["hour"]) * 60 + intval($temp_times[$tmp][1]["min"]);
            if ($hmin > $tmin)  // majority of time worked lands on holiday
            $holiday = 2;
        } elseif (in_array(($today - 86400), $holidayarr)) { // day after a holiday
            $tmp = $dow[array_search($key, $dow) - 1];
            $hmin = 0;
            if (intval($temp_times[$tmp][1]["hour"]) == 24) { // working overnight
                $hmin += (23 - intval($temp_times[$tmp][0]["hour"])) * 60;
                $hmin += 60 - intval($temp_times[$tmp][0]["min"]);
            }
            if (intval($temp_times[$tmp][3]["hour"]) == 24) { // working overnight
                $hmin += (23 - intval($temp_times[$tmp][2]["hour"])) * 60;
                $hmin += 60 - intval($temp_times[$tmp][2]["min"]);
            }
            if (intval($temp_times[$tmp][5]["hour"]) == 24) { // working overnight
                $hmin += (23 - intval($temp_times[$tmp][4]["hour"])) * 60;
                $hmin += 60 - intval($temp_times[$tmp][4]["min"]);
            }
            $tmin = intval($temp_times[$key][1]["hour"]) * 60 + intval($temp_times[$key][1]["min"]);
            if ($hmin > $tmin) // majority of time worked lands on holiday
            $holiday = 3;
        }


        if ($holiday == 1) {
            $subtotalot_reg_mins += $total_reg;
            $week[$key]["totalot_reg"] = $parsetime_reg;
            $week[$key]["totalot_reg_mins"] = $total_reg;
            $week[$key]["total_reg"] = "0:00";
            $week[$key]["total_reg_mins"] = 0;
        }
//        elseif ($holiday > 1 && $tmin > 360) { // day before or after a holiday
//        } // should not legally reach here, since 12 hour shifts are illegal.  use regular output
        else {
            $subtotal_reg_mins += $total_reg;
            $week[$key]["total_reg"] = $parsetime_reg;
            $week[$key]["total_reg_mins"] = $total_reg;
            $week[$key]["totalot_reg"] = "0:00";
            $week[$key]["totalot_reg_mins"] = 0;
        }

        $total_night = $per1["night"] + $per2["night"] + $per3["night"];
        $parsetime_night = sprintf("%u:%02u", ($total_night - $total_night % 60) / 60, $total_night % 60);
        if (!$holiday) {
            $subtotal_night_mins += $total_night;
            $week[$key]["total_night"] = $parsetime_night;
            $week[$key]["total_night_mins"] = $total_night;
            $week[$key]["totalot_night"] = "0:00";
            $week[$key]["totalot_night_mins"] = 0;
        } elseif ($holiday == 1) {
            $subtotalot_night_mins += $total_night;
            $week[$key]["totalot_night"] = $parsetime_night;
            $week[$key]["totalot_night_mins"] = $total_night;
            $week[$key]["total_night"] = "0:00";
            $week[$key]["total_night_mins"] = 0;
        } elseif ($holiday > 1) {
            $adjtime = $total_night - $tmin;
            $adjtime1_night = sprintf("%u:%02u", ($adjtime - $adjtime % 60) / 60, $adjtime % 60);
            $adjtime2_night = sprintf("%u:%02u", ($tmin - $tmin % 60) / 60, $tmin % 60);

            $subtotal_night_mins += $total_night - $tmin;
            $subtotalot_night_mins += $tmin;

            $week[$key]["total_night"] = $adjtime1_night;
            $week[$key]["total_night_mins"] = $adjtime;
            $week[$key]["totalot_night"] = $adjtime2_night;
            $week[$key]["totalot_night_mins"] = $tmin;
        }
	
	//echo $total_reg . " " . $total_night . "<br />";



    }//end foreach

    $week["subtotal_reg"] = sprintf("%u:%02u", ($subtotal_reg_mins - $subtotal_reg_mins % 60) / 60, $subtotal_reg_mins % 60);
    $week["subtotal_night"] = sprintf("%u:%02u", ($subtotal_night_mins - $subtotal_night_mins % 60) / 60, $subtotal_night_mins % 60);
    $week["subtotal_reg_mins"] = $subtotal_reg_mins;
    $week["subtotal_night_mins"] = $subtotal_night_mins;

    $week["subtotalot_reg"] = sprintf("%u:%02u", ($subtotalot_reg_mins - $subtotalot_reg_mins % 60) / 60, $subtotalot_reg_mins % 60);
    $week["subtotalot_night"] = sprintf("%u:%02u", ($subtotalot_night_mins - $subtotalot_night_mins % 60) / 60, $subtotalot_night_mins % 60);
    $week["subtotalot_reg_mins"] = $subtotalot_reg_mins;
    $week["subtotalot_night_mins"] = $subtotalot_night_mins;

}//end calc_hours_worked

function calc_single_set_hours($start_times, $end_times)
{

  //$start_times and $end_times are the equivalent of $temp_times[$key][$x].
  //we're calculating time for a single in/out clock pair.
    $mins_worked_reg = 0;
    $mins_worked_night = 0;
  
  //if the shift is entirely during day hours.
    if ($start_times["hour"] < 18 && $end_times["hour"] < 18 && $start_times["hour"] >= 6 && $end_times["hour"] >= 6) {

        $mins_worked_reg = ($end_times["hour"] - $start_times["hour"]) * 60;
	//adjust for partial beginning hour
        $mins_worked_reg = $mins_worked_reg - $start_times["min"];
	//adjust for partial end hour
        $mins_worked_reg = $mins_worked_reg + $end_times["min"];
  
  //if the shift is entirely during night hours.
    } else if (($start_times["hour"] >= 18 && $end_times["hour"] >= 18) || ($start_times["hour"] < 6 && $end_times["hour"] < 6)) {

        $mins_worked_night = ($end_times["hour"] - $start_times["hour"]) * 60;
	//adjust for partial beginning hour
        $mins_worked_night = $mins_worked_night - $start_times["min"];
	//adjust for partial end hour
        $mins_worked_night = $mins_worked_night + $end_times["min"];
  
  
  //if the shift starts during night hours(12am-6am) and ends during day hours
    } else if ($start_times["hour"] < 6 && $end_times["hour"] < 18) {

        $mins_worked_night = (5 - $start_times["hour"]) * 60;
	//adjust for partial end hour
        $mins_worked_night = $mins_worked_night + (60 - $start_times["min"]);

        $mins_worked_reg = ($end_times["hour"] - 6) * 60;
	//adjust for partial beginning hour
        $mins_worked_reg = $mins_worked_reg + $end_times["min"];
	
  //if the shift starts during night hours(12am-6pm) and ends during night hours(6pm-12am)
    } else if ($start_times["hour"] < 6 && $end_times["hour"] >= 18) {

        $mins_worked_reg = "720";

        $mins_worked_night = (5 - $start_times["hour"]) * 60;
	//adjust for partial end hour
        $mins_worked_night = $mins_worked_night + (60 - $start_times["min"]);

        $mins_worked_night = $mins_worked_night + ($end_times["hour"] - 18) * 60;
	//adjust for partial end hour
        $mins_worked_night = $mins_worked_night + $end_times["min"];
        
  
  //if the shift starts during day hours and ends during night hours
    } else if ($start_times["hour"] < 18 && $end_times["hour"] >= 18) {

        $mins_worked_reg = (18 - $start_times["hour"]) * 60;
	//adjust for partial beginning hour
        $mins_worked_reg = $mins_worked_reg - $start_times["min"];

        $mins_worked_night = ($end_times["hour"] - 18) * 60;
	//adjust for partial end hour
        $mins_worked_night = $mins_worked_night + $end_times["min"];

    }

    $times = array();

    $times["reg"] = $mins_worked_reg;
    $times["night"] = $mins_worked_night;

    return $times;


}//end calc_single_set_hours

?>

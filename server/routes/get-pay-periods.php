<?php 

session_start();
include "./do_auth.php";

if (isset($_SESSION["host"])) {
    $host = $_SESSION["host"];
} else {
    $host = "https://www.hawaii.edu/help/hdsupport/";
}

// Helper to determine if user has a clock-in for the pay period
function clockIsInPayPeriod($clock_ins, $pay_period) {
    foreach ($clock_ins as $clock_in) {
      if ((int)$clock_in["month"] == $pay_period["value"][0] && ((int)$clock_in["day"] >= $pay_period["value"][1] && (int)$clock_in["day"] <= $pay_period["value"][2])) {
        return true;
      }
    }
    return false;
}

/**
 * Main function to get existing pay periods for a particular user.
 */
function getPayPeriods($db)
{

  // Array to store each period
  $existing_pay_periods = array();

  // Default pay periods
  $pay_periods = array();
  $pay_periods[] = array('string' => "January 1 - January 15", "value" => [1, 1, 15]);
  $pay_periods[] = array('string' => "January 16 - January 31", "value" => [1, 16, 31]);
  $pay_periods[] = array('string' => "Febuary 1 - Febuary 15", "value" => [2, 1, 15]);
  $pay_periods[] = array('string' => "Febuary 16 - End of Feb", "value" => [2, 16, 29]);
  $pay_periods[] = array('string' => "March 1 - March 15", "value" => [3, 1, 15]);
  $pay_periods[] = array('string' => "March 16 - March 31", "value" => [3, 16, 31]);
  $pay_periods[] = array('string' => "April 1 - April 15", "value" => [4, 1, 15]);
  $pay_periods[] = array('string' => "April 16 - April 30", "value" => [4, 16, 30]);
  $pay_periods[] = array('string' => "May 1 - May 15", "value" => [5, 1, 15]);
  $pay_periods[] = array('string' => "May 16 - May 31", "value" => [5, 16, 31]);
  $pay_periods[] = array('string' => "June 1 - June 15", "value" => [6, 1, 15]);
  $pay_periods[] = array('string' => "June 16 - June 30", "value" => [6, 16, 30]);
  $pay_periods[] = array('string' => "July 1 - July 15", "value" => [7, 1, 15]);
  $pay_periods[] = array('string' => "July 16 - July 31", "value" => [7, 16, 31]);
  $pay_periods[] = array('string' => "August 1 - August 15", "value" => [8, 1, 15]);
  $pay_periods[] = array('string' => "August 16 - August 31", "value" => [8, 16, 31]);
  $pay_periods[] = array('string' => "September 1 - September 15", "value" => [9, 1, 15]);
  $pay_periods[] = array('string' => "September 16 - September 30", "value" => [9, 16, 30]);
  $pay_periods[] = array('string' => "October 1 - October 15", "value" => [10, 1, 15]);
  $pay_periods[] = array('string' => "October 16 - October 31", "value" => [10, 16, 31]);
  $pay_periods[] = array('string' => "November 1 - November 15", "value" => [11, 1, 15]);
  $pay_periods[] = array('string' => "November 16 - November 30", "value" => [11, 16, 30]);
  $pay_periods[] = array('string' => "December 1 - December 15", "value" => [12, 1, 15]);
  $pay_periods[] = array('string' => "December 16 - December 31", "value" => [12, 16, 31]);

  // Get all clock-ins for user

  $stmt = $db->prepare("SELECT * FROM log WHERE username=? ORDER BY year ASC");
  $stmt->bind_param("s", $_SESSION["username"]);
  $stmt->execute();
  $result = $stmt->get_result();
  $clock_in_array = array();

  while ($row = $result->fetch_assoc()) {
      $clock_in_array[] = $row;
  }

  // Create array items based on keys (year)
  $year_clock_ins = array_unique(array_column($clock_in_array, 'year'));

  // Get all exceptions for user
  $stmt = $db->prepare("SELECT * FROM exceptions WHERE username=? ORDER BY date_tag ASC");
  $stmt->bind_param("s", $_SESSION["username"]);
  $stmt->execute();
  $result = $stmt->get_result();
  $exceptions_array = array();

  while ($row = $result->fetch_assoc()) {
      $exceptions_array[] = $row;
  }

  $stmt->close();

  // Extract years from exceptions
  $year_exceptions = array_unique(array_column($exceptions_array, 'date_tag'));
  $year_exceptions = array_unique(array_map(function($year_exception) {
      $date = DateTime::createFromFormat("m/d/Y", $year_exception);
      return $date->format("Y");
  }, $year_exceptions));


  // Combine with clock-ins
  $years = array_unique(array_merge($year_clock_ins, $year_exceptions));

  // Append pay period to year array -
  
  // For each year, check each pay period
  foreach ($years as $year) {

    // Filter clock-in array by year
    $filtered_clock_ins = array_filter($clock_in_array, function($clock_in) use ($year) {

        return $clock_in["year"] == $year;
    });

    // Filter exception array by year
    $filtered_exceptions = array_filter($exceptions_array, function($exception) use ($year) {
        $exception_dates = explode("/", $exception["date_tag"]);
        return $exception_dates[2] == $year;
    });

    // Go through each pay period

    $existing_periods = array();

    foreach ($pay_periods as $pay_period) {
      // If a clock-in or exception exists within this time frame, add pay period to array
      if (clockIsInPayPeriod($filtered_clock_ins, $pay_period)) {
          $existing_periods[] = $pay_period;
      }
    }

    $existing_pay_periods[] = array("year" => $year, "pay_periods" => array_reverse($existing_periods));
  }

  return json_encode($existing_pay_periods);

}

echo getPayPeriods($mysqli);

?>
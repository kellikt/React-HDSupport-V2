<?php

session_start();
include "./do_auth.php";

if (isset($_SESSION["host"])) {
  $host = $_SESSION["host"];
} else {
  $host = "https://www.hawaii.edu/help/hdsupport/";
}

include "./helpers/timesheet_functions_test.php";
include "./helpers/timesheet_ver_functions.php";
include "./helpers/calc_timesheet.php";

?>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN"
"http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<title></title>
<meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1">
<link rel="stylesheet" type="text/css" href="../css/timesheet_styles.css">

</head>
<body>
<table>
<tr>
<!-- BEGIN UPPER LEFT INSTRUCTIONS BLOCK -->
<td>
<table class="upperleft">
  <tr>
    <td>
      UH Form 23(DISB)<br />
      Revised 5/91<br />
      APM A8.885<br />
      <br />
      <br />
      General Instructions:<br />
      * Use ink or indelible pencil<br />
      * Workweek = 12:01 AM Sunday to 12:00 PM Saturday<br />
      * For Supervisors of CWSP (F1) student assistant: Federal regulations
      specify that individual Daily Time Record must be kept for a period of 5 years
      following a completed audit.
    </td>
  </tr>
</table>
</td>
<!-- END UPPER LEFT INSTRUCTIONS BLOCK -->
<td>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
&nbsp;&nbsp;&nbsp;

</td>
<!-- BEGIN TITLE BLOCK -->
<td>
  <div class="title">
      <span class="title13">UNIVERSITY OF HAWAII</span><br />
      <span class="title15">INDIVIDUAL DAILY TIME RECORD</span><br /><br /><br />
	  <span class="size6-ul-bottom">Federal (F) and Trust (P-280-F) Funds Only</span>
  </div>

</td>
<!-- END TITLE BLOCK -->
<td>
  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
</td>
<!-- BEGIN NAME/DATE BLOCK -->
<td class="topalign" align="right">
<table>
  <tr>
    <td class="topalign">
      <table>
	  <tr>
	  <td>
	  <span class="size8">Name</span>
	  </td>
	  <td width="300">
	  <div class="nameline">
	  
	  <?php

  $result = mysqli_query($GLOBALS['mysqli'], "SELECT first_name, last_name FROM users where username='" . $chosen_user . "'");

  $row = mysqli_fetch_assoc($result);

  echo $row["last_name"];

  $x = 28 - strlen($row["last_name"]);

  while ($x > 0) {

    echo "&nbsp;";
    $x--;

  }

  echo $row["first_name"];
	  //total chars = 84
  ?>
	  </div>
	  </td>
	  </tr>
	  </table>
	  <div class="lastfirstmiddle" align="left">
	   &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
	  <span class="size6">Last</span>
	  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
	  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
	  &nbsp;
	  <span class="size6">First</span>
	  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
	  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
	  &nbsp;
	  <span class="size6">Middle</span>
	  &nbsp;&nbsp;&nbsp;&nbsp
	  </div>
    </td>
  </tr>
  <tr>
	<td>
	  <table cellspacing="0">
	   <tr>
	     <td>
	     <span class="size8">Month</span>
		 </td>
		 <td width="185">
	     <div class="nameline">
	     <?php
      echo date("F", mktime(0, 0, 0, $period_start_month, 1, $period_start_year)) . " " . (int)$period_start_day .
        " - " . date("F", mktime(0, 0, 0, $period_end_month, 1, $period_end_year)) . " " . (int)$period_end_day;
      ?>
		 </div>
		</td>
        <td>
	    <span class="size8">Year</span>
		</td>
		<td width="100">
         <div class="nameline">
	     <?php
      echo "&nbsp;&nbsp;&nbsp;&nbsp;" . $period_end_year;
      ?>
		 </div>
		 </td>
       </tr>
     </table>
	</td>
  </tr>
  
</table>
</td>
<!-- END NAME/DATE BLOCK -->
</tr>
<tr>
<td></td>
<td colspan="4">
<table width="100%">
<tr>
<td width="40"><span class="size6">Hours Worked for Partial Week On Last Time Record</span></td>
<td>
<span class="underline-bottom">
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
<?php echo $partial_week["partial_week_hours_parsed"]; ?>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
</span>
</td>
<td>
&nbsp;&nbsp;
<span class="size6">Account Code</span>
&nbsp;&nbsp;&nbsp;
<span class="underline-bottom">
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
</span>
</td>
<td align="right">
&nbsp;&nbsp;
<span class="size6">Hourly Rate</span>
&nbsp;&nbsp;&nbsp;
<span class="underline-bottom">
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
</span>
&nbsp;&nbsp;
<span class="size6">Warr. Dist. Code</span>
&nbsp;&nbsp;&nbsp;
<span class="underline-bottom">
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
</span>
</td>
</tr>
</table>
</td>
</tr>
</table>

<table class="clocktime">
<!-- CLOCK TIME ROW -->
<tr>
<td class="hide-small-center">
</td>
<td class="hide-small-center">
</td>
<td colspan="6" class="span"><span class="size8">
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
CLOCK TIME (indicate AM and PM hours)</span></td>
<td class="nobottom-center"><span class="size8">REGULAR</span></td>
<td class="nobottom-center"><span class="size8">NIGHT</span></td>
<td class="nobottom-center"><span class="size8">OVERTIME</span></td>
<td class="nobottom-center"><span class="size8">NT-OVERTIME</span></td>
</tr>
<!-- END CLOCK TIME ROW -->

<!-- DATE ROW -->
<tr>
<td class="hide-small-center">
</td>
<td class="small-center"><span class="size8">Date</span></td>
<td class="noright-center"><span class="size8">Start</span></td>
<td class="noleft-center"><span class="size8">Stop</span></td>
<td class="noright-center"><span class="size8">Start</span></td>
<td class="noleft-center"><span class="size8">Stop</span></td>
<td class="noright-center"><span class="size8">Start</span></td>
<td class="noleft-center"><span class="size8">Stop</span></td>
<td class="notop-center"><span class="size6">Hours & Minutes</span></td>
<td class="notop-center"><span class="size6">Hours & Minutes</span></td>
<td class="notop-center"><span class="size6">Hours & Minutes</span></td>
<td class="notop-center"><span class="size6">Hours & Minutes</span></td>
</tr>
<!-- END DATE ROW -->

<!-- SUNDAY ROW -->
<tr>
<td class="small-center"><span class="size8">&nbsp;Sunday</span></td>
<td class="small-center"><span class="times10"><?php echo $week1["Sunday"]["date"]; ?></span></td>
<td><span class="times10"><?php echo $week1["Sunday"]["times"][0]; ?></span></td>
<td><span class="times10"><?php echo $week1["Sunday"]["times"][1]; ?></span></td>
<td><span class="times10"><?php echo $week1["Sunday"]["times"][2]; ?></span></td>
<td><span class="times10"><?php echo $week1["Sunday"]["times"][3]; ?></span></td>
<td><span class="times10"><?php echo $week1["Sunday"]["times"][4]; ?></span></td>
<td><span class="times10"><?php echo $week1["Sunday"]["times"][5]; ?></span></td>
<td><span class="times10"><?php echo $week1["Sunday"]["total_reg"]; ?></span></td>
<td><span class="times10"><?php echo $week1["Sunday"]["total_night"]; ?></span></td>
<td><span class="times10"><?php echo $week1["Sunday"]["totalot_reg"]; ?></span></td>
<td><span class="times10"><?php echo $week1["Sunday"]["totalot_night"]; ?></span></td>
</tr>
<!-- END SUNDAY ROW-->

<!-- MONDAY ROW -->
<tr>
<td class="small-center"><span class="size8">&nbsp;Monday</span></td>
<td class="small-center"><span class="times10"><?php echo $week1["Monday"]["date"]; ?></span></td>
<td><span class="times10"><?php echo $week1["Monday"]["times"][0]; ?></span></td>
<td><span class="times10"><?php echo $week1["Monday"]["times"][1]; ?></span></td>
<td><span class="times10"><?php echo $week1["Monday"]["times"][2]; ?></span></td>
<td><span class="times10"><?php echo $week1["Monday"]["times"][3]; ?></span></td>
<td><span class="times10"><?php echo $week1["Monday"]["times"][4]; ?></span></td>
<td><span class="times10"><?php echo $week1["Monday"]["times"][5]; ?></span></td>
<td><span class="times10"><?php echo $week1["Monday"]["total_reg"]; ?></span></td>
<td><span class="times10"><?php echo $week1["Monday"]["total_night"]; ?></span></td>
<td><span class="times10"><?php echo $week1["Monday"]["totalot_reg"]; ?></span></td>
<td><span class="times10"><?php echo $week1["Monday"]["totalot_night"]; ?></span></td>
</tr>
<!-- END MONDAY ROW -->

<!-- TUESDAY ROW -->
<tr>
<td class="small-center"><span class="size8">&nbsp;Tuesday</span></td>
<td class="small-center"><span class="times10"><?php echo $week1["Tuesday"]["date"]; ?></span></td>
<td><span class="times10"><?php echo $week1["Tuesday"]["times"][0]; ?></span></td>
<td><span class="times10"><?php echo $week1["Tuesday"]["times"][1]; ?></span></td>
<td><span class="times10"><?php echo $week1["Tuesday"]["times"][2]; ?></span></td>
<td><span class="times10"><?php echo $week1["Tuesday"]["times"][3]; ?></span></td>
<td><span class="times10"><?php echo $week1["Tuesday"]["times"][4]; ?></span></td>
<td><span class="times10"><?php echo $week1["Tuesday"]["times"][5]; ?></span></td>
<td><span class="times10"><?php echo $week1["Tuesday"]["total_reg"]; ?></span></td>
<td><span class="times10"><?php echo $week1["Tuesday"]["total_night"]; ?></span></td>
<td><span class="times10"><?php echo $week1["Tuesday"]["totalot_reg"]; ?></span></td>
<td><span class="times10"><?php echo $week1["Tuesday"]["totalot_night"]; ?></span></td>
</tr>
<!-- END TUESDAY ROW -->

<!-- WEDNESDAY ROW -->
<tr>
<td class="small-center"><span class="size8">&nbsp;Wednesday</span></td>
<td class="small-center"><span class="times10"><?php echo $week1["Wednesday"]["date"]; ?></span></td>
<td><span class="times10"><?php echo $week1["Wednesday"]["times"][0]; ?></span></td>
<td><span class="times10"><?php echo $week1["Wednesday"]["times"][1]; ?></span></td>
<td><span class="times10"><?php echo $week1["Wednesday"]["times"][2]; ?></span></td>
<td><span class="times10"><?php echo $week1["Wednesday"]["times"][3]; ?></span></td>
<td><span class="times10"><?php echo $week1["Wednesday"]["times"][4]; ?></span></td>
<td><span class="times10"><?php echo $week1["Wednesday"]["times"][5]; ?></span></td>
<td><span class="times10"><?php echo $week1["Wednesday"]["total_reg"]; ?></span></td>
<td><span class="times10"><?php echo $week1["Wednesday"]["total_night"]; ?></span></td>
<td><span class="times10"><?php echo $week1["Wednesday"]["totalot_reg"]; ?></span></td>
<td><span class="times10"><?php echo $week1["Wednesday"]["totalot_night"]; ?></span></td>
</tr>
<!-- END WEDNESDAY ROW -->

<!-- THURSDAY ROW -->
<tr>
<td class="small-center"><span class="size8">&nbsp;Thursday</span></td>
<td class="small-center"><span class="times10"><?php echo $week1["Thursday"]["date"]; ?></span></td>
<td><span class="times10"><?php echo $week1["Thursday"]["times"][0]; ?></span></td>
<td><span class="times10"><?php echo $week1["Thursday"]["times"][1]; ?></span></td>
<td><span class="times10"><?php echo $week1["Thursday"]["times"][2]; ?></span></td>
<td><span class="times10"><?php echo $week1["Thursday"]["times"][3]; ?></span></td>
<td><span class="times10"><?php echo $week1["Thursday"]["times"][4]; ?></span></td>
<td><span class="times10"><?php echo $week1["Thursday"]["times"][5]; ?></span></td>
<td><span class="times10"><?php echo $week1["Thursday"]["total_reg"]; ?></span></td>
<td><span class="times10"><?php echo $week1["Thursday"]["total_night"]; ?></span></td>
<td><span class="times10"><?php echo $week1["Thursday"]["totalot_reg"]; ?></span></td>
<td><span class="times10"><?php echo $week1["Thursday"]["totalot_night"]; ?></span></td>
</tr>
<!-- END THURSDAY ROW -->

<!-- FRIDAY ROW -->
<tr>
<td class="small-center"><span class="size8">&nbsp;Friday</span></td>
<td class="small-center"><span class="times10"><?php echo $week1["Friday"]["date"]; ?></span></td>
<td><span class="times10"><?php echo $week1["Friday"]["times"][0]; ?></span></td>
<td><span class="times10"><?php echo $week1["Friday"]["times"][1]; ?></span></td>
<td><span class="times10"><?php echo $week1["Friday"]["times"][2]; ?></span></td>
<td><span class="times10"><?php echo $week1["Friday"]["times"][3]; ?></span></td>
<td><span class="times10"><?php echo $week1["Friday"]["times"][4]; ?></span></td>
<td><span class="times10"><?php echo $week1["Friday"]["times"][5]; ?></span></td>
<td><span class="times10"><?php echo $week1["Friday"]["total_reg"]; ?></span></td>
<td><span class="times10"><?php echo $week1["Friday"]["total_night"]; ?></span></td>
<td><span class="times10"><?php echo $week1["Friday"]["totalot_reg"]; ?></span></td>
<td><span class="times10"><?php echo $week1["Friday"]["totalot_night"]; ?></span></td>
</tr>
<!-- END FRIDAY ROW -->

<!-- SATURDAY ROW -->
<tr>
<td class="small-center"><span class="size8">&nbsp;Saturday</span></td>
<td class="small-center"><span class="times10"><?php echo $week1["Saturday"]["date"]; ?></span></td>
<td><span class="times10"><?php echo $week1["Saturday"]["times"][0]; ?></span></td>
<td><span class="times10"><?php echo $week1["Saturday"]["times"][1]; ?></span></td>
<td><span class="times10"><?php echo $week1["Saturday"]["times"][2]; ?></span></td>
<td><span class="times10"><?php echo $week1["Saturday"]["times"][3]; ?></span></td>
<td><span class="times10"><?php echo $week1["Saturday"]["times"][4]; ?></span></td>
<td><span class="times10"><?php echo $week1["Saturday"]["times"][5]; ?></span></td>
<td><span class="times10"><?php echo $week1["Saturday"]["total_reg"]; ?></span></td>
<td><span class="times10"><?php echo $week1["Saturday"]["total_night"]; ?></span></td>
<td><span class="times10"><?php echo $week1["Saturday"]["totalot_reg"]; ?></span></td>
<td><span class="times10"><?php echo $week1["Saturday"]["totalot_night"]; ?></span></td>
</tr>
<!-- END SATURDAY ROW -->

<!-- WEEK 1 SUBTOTAL ROW -->
<tr>
<td class="hide-small-center">
</td>
<td class="hide-small-center">
</td>
<td class="hide">
</td>
<td class="hide">
</td>
<td class="hide">
</td>
<td class="hide">
</td>
<td class="hide">
</td>
<td class="hide"><span class="size8">SUB-TOTAL HOURS</span></td>
<td class="boldbottom"><span class="times10-bold"><?php echo $week1["subtotal_reg"]; ?></span></td>
<td class="boldbottom"><span class="times10-bold"><?php echo $week1["subtotal_night"]; ?></span></td>
<td class="boldbottom"><span class="times10-bold"><?php echo $week1["subtotalot_reg"]; ?></span></td>
<td class="boldbottom"><span class="times10-bold"><?php echo $week1["subtotalot_night"]; ?></span></td>
</tr>
<!-- END WEEK 1 SUBTOTAL ROW -->

<tr>
<td class="hide-small-center">
</td>
<td class="hide-small-center">
</td>
<td colspan="6" class="span"><span class="size8">
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
CLOCK TIME (indicate AM and PM hours)</span></td>
<td class="nobottom-center-boldtop"><span class="size8">REGULAR</span></td>
<td class="nobottom-center-boldtop"><span class="size8">NIGHT</span></td>
<td class="nobottom-center-boldtop"><span class="size8">OVERTIME</span></td>
<td class="nobottom-center-boldtop"><span class="size8">NT-OVERTIME</span></td>
</tr>
<!-- END CLOCK TIME ROW -->

<!-- DATE ROW -->
<tr>
<td class="hide-small-center">
</td>
<td class="small-center"><span class="size8">Date</span></td>
<td class="noright-center"><span class="size8">Start</span></td>
<td class="noleft-center"><span class="size8">Stop</span></td>
<td class="noright-center"><span class="size8">Start</span></td>
<td class="noleft-center"><span class="size8">Stop</span></td>
<td class="noright-center"><span class="size8">Start</span></td>
<td class="noleft-center"><span class="size8">Stop</span></td>
<td class="notop-center"><span class="size6">Hours & Minutes</span></td>
<td class="notop-center"><span class="size6">Hours & Minutes</span></td>
<td class="notop-center"><span class="size6">Hours & Minutes</span></td>
<td class="notop-center"><span class="size6">Hours & Minutes</span></td>
</tr>
<!-- END DATE ROW -->

<!-- SUNDAY ROW -->
<tr>
<td class="small-center"><span class="size8">&nbsp;Sunday</span></td>
<td class="small-center"><span class="times10"><?php echo $week2["Sunday"]["date"]; ?></span></td>
<td><span class="times10"><?php echo $week2["Sunday"]["times"][0]; ?></span></td>
<td><span class="times10"><?php echo $week2["Sunday"]["times"][1]; ?></span></td>
<td><span class="times10"><?php echo $week2["Sunday"]["times"][2]; ?></span></td>
<td><span class="times10"><?php echo $week2["Sunday"]["times"][3]; ?></span></td>
<td><span class="times10"><?php echo $week2["Sunday"]["times"][4]; ?></span></td>
<td><span class="times10"><?php echo $week2["Sunday"]["times"][5]; ?></span></td>
<td><span class="times10"><?php echo $week2["Sunday"]["total_reg"]; ?></span></td>
<td><span class="times10"><?php echo $week2["Sunday"]["total_night"]; ?></span></td>
<td><span class="times10"><?php echo $week2["Sunday"]["totalot_reg"]; ?></span></td>
<td><span class="times10"><?php echo $week2["Sunday"]["totalot_night"]; ?></span></td>
</tr>
<!-- END SUNDAY ROW-->

<!-- MONDAY ROW -->
<tr>
<td class="small-center"><span class="size8">&nbsp;Monday</span></td>
<td class="small-center"><span class="times10"><?php echo $week2["Monday"]["date"]; ?></span></td>
<td><span class="times10"><?php echo $week2["Monday"]["times"][0]; ?></span></td>
<td><span class="times10"><?php echo $week2["Monday"]["times"][1]; ?></span></td>
<td><span class="times10"><?php echo $week2["Monday"]["times"][2]; ?></span></td>
<td><span class="times10"><?php echo $week2["Monday"]["times"][3]; ?></span></td>
<td><span class="times10"><?php echo $week2["Monday"]["times"][4]; ?></span></td>
<td><span class="times10"><?php echo $week2["Monday"]["times"][5]; ?></span></td>
<td><span class="times10"><?php echo $week2["Monday"]["total_reg"]; ?></span></td>
<td><span class="times10"><?php echo $week2["Monday"]["total_night"]; ?></span></td>
<td><span class="times10"><?php echo $week2["Monday"]["totalot_reg"]; ?></span></td>
<td><span class="times10"><?php echo $week2["Monday"]["totalot_night"]; ?></span></td>
</tr>
<!-- END MONDAY ROW -->

<!-- TUESDAY ROW -->
<tr>
<td class="small-center"><span class="size8">&nbsp;Tuesday</span></td>
<td class="small-center"><span class="times10"><?php echo $week2["Tuesday"]["date"]; ?></span></td>
<td><span class="times10"><?php echo $week2["Tuesday"]["times"][0]; ?></span></td>
<td><span class="times10"><?php echo $week2["Tuesday"]["times"][1]; ?></span></td>
<td><span class="times10"><?php echo $week2["Tuesday"]["times"][2]; ?></span></td>
<td><span class="times10"><?php echo $week2["Tuesday"]["times"][3]; ?></span></td>
<td><span class="times10"><?php echo $week2["Tuesday"]["times"][4]; ?></span></td>
<td><span class="times10"><?php echo $week2["Tuesday"]["times"][5]; ?></span></td>
<td><span class="times10"><?php echo $week2["Tuesday"]["total_reg"]; ?></span></td>
<td><span class="times10"><?php echo $week2["Tuesday"]["total_night"]; ?></span></td>
<td><span class="times10"><?php echo $week2["Tuesday"]["totalot_reg"]; ?></span></td>
<td><span class="times10"><?php echo $week2["Tuesday"]["totalot_night"]; ?></span></td>
</tr>
<!-- END TUESDAY ROW -->

<!-- WEDNESDAY ROW -->
<tr>
<td class="small-center"><span class="size8">&nbsp;Wednesday</span></td>
<td class="small-center"><span class="times10"><?php echo $week2["Wednesday"]["date"]; ?></span></td>
<td><span class="times10"><?php echo $week2["Wednesday"]["times"][0]; ?></span></td>
<td><span class="times10"><?php echo $week2["Wednesday"]["times"][1]; ?></span></td>
<td><span class="times10"><?php echo $week2["Wednesday"]["times"][2]; ?></span></td>
<td><span class="times10"><?php echo $week2["Wednesday"]["times"][3]; ?></span></td>
<td><span class="times10"><?php echo $week2["Wednesday"]["times"][4]; ?></span></td>
<td><span class="times10"><?php echo $week2["Wednesday"]["times"][5]; ?></span></td>
<td><span class="times10"><?php echo $week2["Wednesday"]["total_reg"]; ?></span></td>
<td><span class="times10"><?php echo $week2["Wednesday"]["total_night"]; ?></span></td>
<td><span class="times10"><?php echo $week2["Wednesday"]["totalot_reg"]; ?></span></td>
<td><span class="times10"><?php echo $week2["Wednesday"]["totalot_night"]; ?></span></td>
</tr>
<!-- END WEDNESDAY ROW -->

<!-- THURSDAY ROW -->
<tr>
<td class="small-center"><span class="size8">&nbsp;Thursday</span></td>
<td class="small-center"><span class="times10"><?php echo $week2["Thursday"]["date"]; ?></span></td>
<td><span class="times10"><?php echo $week2["Thursday"]["times"][0]; ?></span></td>
<td><span class="times10"><?php echo $week2["Thursday"]["times"][1]; ?></span></td>
<td><span class="times10"><?php echo $week2["Thursday"]["times"][2]; ?></span></td>
<td><span class="times10"><?php echo $week2["Thursday"]["times"][3]; ?></span></td>
<td><span class="times10"><?php echo $week2["Thursday"]["times"][4]; ?></span></td>
<td><span class="times10"><?php echo $week2["Thursday"]["times"][5]; ?></span></td>
<td><span class="times10"><?php echo $week2["Thursday"]["total_reg"]; ?></span></td>
<td><span class="times10"><?php echo $week2["Thursday"]["total_night"]; ?></span></td>
<td><span class="times10"><?php echo $week2["Thursday"]["totalot_reg"]; ?></span></td>
<td><span class="times10"><?php echo $week2["Thursday"]["totalot_night"]; ?></span></td>
</tr>
<!-- END THURSDAY ROW -->

<!-- FRIDAY ROW -->
<tr>
<td class="small-center"><span class="size8">&nbsp;Friday</span></td>
<td class="small-center"><span class="times10"><?php echo $week2["Friday"]["date"]; ?></span></td>
<td><span class="times10"><?php echo $week2["Friday"]["times"][0]; ?></span></td>
<td><span class="times10"><?php echo $week2["Friday"]["times"][1]; ?></span></td>
<td><span class="times10"><?php echo $week2["Friday"]["times"][2]; ?></span></td>
<td><span class="times10"><?php echo $week2["Friday"]["times"][3]; ?></span></td>
<td><span class="times10"><?php echo $week2["Friday"]["times"][4]; ?></span></td>
<td><span class="times10"><?php echo $week2["Friday"]["times"][5]; ?></span></td>
<td><span class="times10"><?php echo $week2["Friday"]["total_reg"]; ?></span></td>
<td><span class="times10"><?php echo $week2["Friday"]["total_night"]; ?></span></td>
<td><span class="times10"><?php echo $week2["Friday"]["totalot_reg"]; ?></span></td>
<td><span class="times10"><?php echo $week2["Friday"]["totalot_night"]; ?></span></td>
</tr>
<!-- END FRIDAY ROW -->

<!-- SATURDAY ROW -->
<tr>
<td class="small-center"><span class="size8">&nbsp;Saturday</span></td>
<td class="small-center"><span class="times10"><?php echo $week2["Saturday"]["date"]; ?></span></td>
<td><span class="times10"><?php echo $week2["Saturday"]["times"][0]; ?></span></td>
<td><span class="times10"><?php echo $week2["Saturday"]["times"][1]; ?></span></td>
<td><span class="times10"><?php echo $week2["Saturday"]["times"][2]; ?></span></td>
<td><span class="times10"><?php echo $week2["Saturday"]["times"][3]; ?></span></td>
<td><span class="times10"><?php echo $week2["Saturday"]["times"][4]; ?></span></td>
<td><span class="times10"><?php echo $week2["Saturday"]["times"][5]; ?></span></td>
<td><span class="times10"><?php echo $week2["Saturday"]["total_reg"]; ?></span></td>
<td><span class="times10"><?php echo $week2["Saturday"]["total_night"]; ?></span></td>
<td><span class="times10"><?php echo $week2["Saturday"]["totalot_reg"]; ?></span></td>
<td><span class="times10"><?php echo $week2["Saturday"]["totalot_night"]; ?></span></td>
</tr>
<!-- END SATURDAY ROW -->

<!-- WEEK 2 SUBTOTAL ROW -->
<tr>
<td class="hide-small-center">
</td>
<td class="hide-small-center">
</td>
<td class="hide">
</td>
<td class="hide">
</td>
<td class="hide">
</td>
<td class="hide">
</td>
<td class="hide">
</td>
<td class="hide"><span class="size8">SUB-TOTAL HOURS</span></td>
<td class="boldbottom"><span class="times10-bold"><?php echo $week2["subtotal_reg"]; ?></span></td>
<td class="boldbottom"><span class="times10-bold"><?php echo $week2["subtotal_night"]; ?></span></td>
<td class="boldbottom"><span class="times10-bold"><?php echo $week2["subtotalot_reg"]; ?></span></td>
<td class="boldbottom"><span class="times10-bold"><?php echo $week2["subtotalot_night"]; ?></span></td>
</tr>
<!-- END WEEK 2 SUBTOTAL ROW -->

<tr>
<td class="hide-small-center">
</td>
<td class="hide-small-center">
</td>
<td colspan="6" class="span"><span class="size8">
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
CLOCK TIME (indicate AM and PM hours)</span></td>
<td class="nobottom-center-boldtop"><span class="size8">REGULAR</span></td>
<td class="nobottom-center-boldtop"><span class="size8">NIGHT</span></td>
<td class="nobottom-center-boldtop"><span class="size8">OVERTIME</span></td>
<td class="nobottom-center-boldtop"><span class="size8">NT-OVERTIME</span></td>
</tr>
<!-- END CLOCK TIME ROW -->

<!-- DATE ROW -->
<tr>
<td class="hide-small-center">
</td>
<td class="small-center"><span class="size8">Date</span></td>
<td class="noright-center"><span class="size8">Start</span></td>
<td class="noleft-center"><span class="size8">Stop</span></td>
<td class="noright-center"><span class="size8">Start</span></td>
<td class="noleft-center"><span class="size8">Stop</span></td>
<td class="noright-center"><span class="size8">Start</span></td>
<td class="noleft-center"><span class="size8">Stop</span></td>
<td class="notop-center"><span class="size6">Hours & Minutes</span></td>
<td class="notop-center"><span class="size6">Hours & Minutes</span></td>
<td class="notop-center"><span class="size6">Hours & Minutes</span></td>
<td class="notop-center"><span class="size6">Hours & Minutes</span></td>
</tr>
<!-- END DATE ROW -->

<!-- SUNDAY ROW -->
<tr>
<td class="small-center"><span class="size8">&nbsp;Sunday</span></td>
<td class="small-center"><span class="times10"><?php echo $week3["Sunday"]["date"]; ?></span></td>
<td><span class="times10"><?php echo $week3["Sunday"]["times"][0]; ?></span></td>
<td><span class="times10"><?php echo $week3["Sunday"]["times"][1]; ?></span></td>
<td><span class="times10"><?php echo $week3["Sunday"]["times"][2]; ?></span></td>
<td><span class="times10"><?php echo $week3["Sunday"]["times"][3]; ?></span></td>
<td><span class="times10"><?php echo $week3["Sunday"]["times"][4]; ?></span></td>
<td><span class="times10"><?php echo $week3["Sunday"]["times"][5]; ?></span></td>
<td><span class="times10"><?php echo $week3["Sunday"]["total_reg"]; ?></span></td>
<td><span class="times10"><?php echo $week3["Sunday"]["total_night"]; ?></span></td>
<td><span class="times10"><?php echo $week3["Sunday"]["totalot_reg"]; ?></span></td>
<td><span class="times10"><?php echo $week3["Sunday"]["totalot_night"]; ?></span></td>
</tr>
<!-- END SUNDAY ROW-->

<!-- MONDAY ROW -->
<tr>
<td class="small-center"><span class="size8">&nbsp;Monday</span></td>
<td class="small-center"><span class="times10"><?php echo $week3["Monday"]["date"]; ?></span></td>
<td><span class="times10"><?php echo $week3["Monday"]["times"][0]; ?></span></td>
<td><span class="times10"><?php echo $week3["Monday"]["times"][1]; ?></span></td>
<td><span class="times10"><?php echo $week3["Monday"]["times"][2]; ?></span></td>
<td><span class="times10"><?php echo $week3["Monday"]["times"][3]; ?></span></td>
<td><span class="times10"><?php echo $week3["Monday"]["times"][4]; ?></span></td>
<td><span class="times10"><?php echo $week3["Monday"]["times"][5]; ?></span></td>
<td><span class="times10"><?php echo $week3["Monday"]["total_reg"]; ?></span></td>
<td><span class="times10"><?php echo $week3["Monday"]["total_night"]; ?></span></td>
<td><span class="times10"><?php echo $week3["Monday"]["totalot_reg"]; ?></span></td>
<td><span class="times10"><?php echo $week3["Monday"]["totalot_night"]; ?></span></td>
</tr>
<!-- END MONDAY ROW -->

<!-- TUESDAY ROW -->
<tr>
<td class="small-center"><span class="size8">&nbsp;Tuesday</span></td>
<td class="small-center"><span class="times10"><?php echo $week3["Tuesday"]["date"]; ?></span></td>
<td><span class="times10"><?php echo $week3["Tuesday"]["times"][0]; ?></span></td>
<td><span class="times10"><?php echo $week3["Tuesday"]["times"][1]; ?></span></td>
<td><span class="times10"><?php echo $week3["Tuesday"]["times"][2]; ?></span></td>
<td><span class="times10"><?php echo $week3["Tuesday"]["times"][3]; ?></span></td>
<td><span class="times10"><?php echo $week3["Tuesday"]["times"][4]; ?></span></td>
<td><span class="times10"><?php echo $week3["Tuesday"]["times"][5]; ?></span></td>
<td><span class="times10"><?php echo $week3["Tuesday"]["total_reg"]; ?></span></td>
<td><span class="times10"><?php echo $week3["Tuesday"]["total_night"]; ?></span></td>
<td><span class="times10"><?php echo $week3["Tuesday"]["totalot_reg"]; ?></span></td>
<td><span class="times10"><?php echo $week3["Tuesday"]["totalot_night"]; ?></span></td>
</tr>
<!-- END TUESDAY ROW -->

<!-- WEDNESDAY ROW -->
<tr>
<td class="small-center"><span class="size8">&nbsp;Wednesday</span></td>
<td class="small-center"><span class="times10"><?php echo $week3["Wednesday"]["date"]; ?></span></td>
<td><span class="times10"><?php echo $week3["Wednesday"]["times"][0]; ?></span></td>
<td><span class="times10"><?php echo $week3["Wednesday"]["times"][1]; ?></span></td>
<td><span class="times10"><?php echo $week3["Wednesday"]["times"][2]; ?></span></td>
<td><span class="times10"><?php echo $week3["Wednesday"]["times"][3]; ?></span></td>
<td><span class="times10"><?php echo $week3["Wednesday"]["times"][4]; ?></span></td>
<td><span class="times10"><?php echo $week3["Wednesday"]["times"][5]; ?></span></td>
<td><span class="times10"><?php echo $week3["Wednesday"]["total_reg"]; ?></span></td>
<td><span class="times10"><?php echo $week3["Wednesday"]["total_night"]; ?></span></td>
<td><span class="times10"><?php echo $week3["Wednesday"]["totalot_reg"]; ?></span></td>
<td><span class="times10"><?php echo $week3["Wednesday"]["totalot_night"]; ?></span></td>
</tr>
<!-- END WEDNESDAY ROW -->

<!-- THURSDAY ROW -->
<tr>
<td class="small-center"><span class="size8">&nbsp;Thursday</span></td>
<td class="small-center"><span class="times10"><?php echo $week3["Thursday"]["date"]; ?></span></td>
<td><span class="times10"><?php echo $week3["Thursday"]["times"][0]; ?></span></td>
<td><span class="times10"><?php echo $week3["Thursday"]["times"][1]; ?></span></td>
<td><span class="times10"><?php echo $week3["Thursday"]["times"][2]; ?></span></td>
<td><span class="times10"><?php echo $week3["Thursday"]["times"][3]; ?></span></td>
<td><span class="times10"><?php echo $week3["Thursday"]["times"][4]; ?></span></td>
<td><span class="times10"><?php echo $week3["Thursday"]["times"][5]; ?></span></td>
<td><span class="times10"><?php echo $week3["Thursday"]["total_reg"]; ?></span></td>
<td><span class="times10"><?php echo $week3["Thursday"]["total_night"]; ?></span></td>
<td><span class="times10"><?php echo $week3["Thursday"]["totalot_reg"]; ?></span></td>
<td><span class="times10"><?php echo $week3["Thursday"]["totalot_night"]; ?></span></td>
</tr>
<!-- END THURSDAY ROW -->

<!-- FRIDAY ROW -->
<tr>
<td class="small-center"><span class="size8">&nbsp;Friday</span></td>
<td class="small-center"><span class="times10"><?php echo $week3["Friday"]["date"]; ?></span></td>
<td><span class="times10"><?php echo $week3["Friday"]["times"][0]; ?></span></td>
<td><span class="times10"><?php echo $week3["Friday"]["times"][1]; ?></span></td>
<td><span class="times10"><?php echo $week3["Friday"]["times"][2]; ?></span></td>
<td><span class="times10"><?php echo $week3["Friday"]["times"][3]; ?></span></td>
<td><span class="times10"><?php echo $week3["Friday"]["times"][4]; ?></span></td>
<td><span class="times10"><?php echo $week3["Friday"]["times"][5]; ?></span></td>
<td><span class="times10"><?php echo $week3["Friday"]["total_reg"]; ?></span></td>
<td><span class="times10"><?php echo $week3["Friday"]["total_night"]; ?></span></td>
<td><span class="times10"><?php echo $week3["Friday"]["totalot_reg"]; ?></span></td>
<td><span class="times10"><?php echo $week3["Friday"]["totalot_night"]; ?></span></td>
</tr>
<!-- END FRIDAY ROW -->

<!-- SATURDAY ROW -->
<tr>
<td class="small-center"><span class="size8">&nbsp;Saturday</span></td>
<td class="small-center"><span class="times10"><?php echo $week3["Saturday"]["date"]; ?></span></td>
<td><span class="times10"><?php echo $week3["Saturday"]["times"][0]; ?></span></td>
<td><span class="times10"><?php echo $week3["Saturday"]["times"][1]; ?></span></td>
<td><span class="times10"><?php echo $week3["Saturday"]["times"][2]; ?></span></td>
<td><span class="times10"><?php echo $week3["Saturday"]["times"][3]; ?></span></td>
<td><span class="times10"><?php echo $week3["Saturday"]["times"][4]; ?></span></td>
<td><span class="times10"><?php echo $week3["Saturday"]["times"][5]; ?></span></td>
<td><span class="times10"><?php echo $week3["Saturday"]["total_reg"]; ?></span></td>
<td><span class="times10"><?php echo $week3["Saturday"]["total_night"]; ?></span></td>
<td><span class="times10"><?php echo $week3["Saturday"]["totalot_reg"]; ?></span></td>
<td><span class="times10"><?php echo $week3["Saturday"]["totalot_night"]; ?></span></td>
</tr>
<!-- END SATURDAY ROW -->

<!-- WEEK 3 SUBTOTAL ROW -->
<tr>
<td class="hide-small-center">
</td>
<td class="hide-small-center">
</td>
<td class="hide">
</td>
<td class="hide">
</td>
<td class="hide">
</td>
<td class="hide">
</td>
<td class="hide">
</td>
<td class="hide"><span class="size8">SUB-TOTAL HOURS</span></td>
<td class="boldbottom"><span class="times10-bold"><?php echo $week3["subtotal_reg"]; ?></span></td>
<td class="boldbottom"><span class="times10-bold"><?php echo $week3["subtotal_night"]; ?></span></td>
<td class="boldbottom"><span class="times10-bold"><?php echo $week3["subtotalot_reg"]; ?></span></td>
<td class="boldbottom"><span class="times10-bold"><?php echo $week3["subtotalot_night"]; ?></span></td>
</tr>
<!-- END WEEK 3 SUBTOTAL ROW -->

<tr>

<td colspan="4" class="hide-small-span"><span class="underline-bottom">
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
</span></td>
<td rowspan="7" colspan="3" class="hide">
<table border="1" class="convert">
<tr>
<th colspan="4" class="hide"><span class="times6">** CONVERTED HOURS: Convert partial hours to decimal fraction usng the following table:</span></th>
</tr>
<tr>
<td class="hide"><span class="times6-underline">Minutes</span></td>
<td class="hide"><span class="times6-underline">Fraction</span></td>
<td class="hide"><span class="times6-underline">Minutes</span></td>
<td class="hide"><span class="times6-underline">Fraction</span></td>
</tr>
<tr>
<td class="hide"><span class="times6">:05</span></td>
<td class="hide"><span class="times6">.08</span></td>
<td class="hide"><span class="times6">:35</span></td>
<td class="hide"><span class="times6">.58</span></td>

</tr>
<tr>
<td class="hide"><span class="times6">:10</span></td>
<td class="hide"><span class="times6">.17</span></td>
<td class="hide"><span class="times6">:40</span></td>
<td class="hide"><span class="times6">.67</span></td>
</tr>
<tr>
<td class="hide"><span class="times6">:15</span></td>
<td class="hide"><span class="times6">.25</span></td>
<td class="hide"><span class="times6">:45</span></td>
<td class="hide"><span class="times6">.75</span></td>

</tr>
<tr>
<td class="hide"><span class="times6">:20</span></td>
<td class="hide"><span class="times6">.33</span></td>
<td class="hide"><span class="times6">:50</span></td>
<td class="hide"><span class="times6">.83</span></td>

</tr>
<tr>
<td class="hide"><span class="times6">:25</span></td>
<td class="hide"><span class="times6">.42</span></td>
<td class="hide"><span class="times6">:55</span></td>
<td class="hide"><span class="times6">.92</span></td>

<tr>
<td class="hide"><span class="times6">:30</span></td>
<td class="hide"><span class="times6">.50</span></td>
<td class="hide"><span class="times6"></span></td>
<td class="hide"><span class="times6"></span></td>
</tr>
</table>
</td>
<td class="hide"><span class="size7-bold">GRAND TOTAL HOURS</span></td>
<td class="boldbottom"><span class="times10-bold"><?php echo $grand_total_reg_parsed; ?></span></td>
<td class="boldbottom"><span class="times10-bold"><?php echo $grand_total_night_parsed; ?></span></td>
<td class="boldbottom"><span class="times10-bold"><?php echo $grand_totalot_reg_parsed; ?></span></td>
<td class="boldbottom"><span class="times10-bold"><?php echo $grand_totalot_night_parsed; ?></span></td>
</tr>

<tr>
<td colspan="4" class="hide-small-span"><span class="size7">&nbsp;&nbsp;&nbsp;Signature - Employee</span></td>
<td class="hide"><span class="size7-bold">**CONVERTED HOURS</span></td>
<td class="boldbottom"><span class="times10-bold"><?php echo $grand_total_reg_conv; ?></span></td>
<td class="boldbottom"><span class="times10-bold"><?php echo $grand_total_night_conv; ?></span></td>
<td class="boldbottom"><span class="times10-bold"><?php echo $grand_totalot_reg_conv; ?></span></td>
<td class="boldbottom"><span class="times10-bold"><?php echo $grand_totalot_night_conv; ?></span></td>
</tr>

<tr>
<td colspan="4" class="hide-small-span"></td>
<td class="hide"></td>
<td class="hide"></td>
<td class="hide"></td>
<td class="hide"></td>
<td class="hide"></td>
</tr>

<tr>
<td colspan="4" class="hide-small-span"><span class="size6-italic">"I certify that this student has worked the number of hours<br /> stated, and has performed the work satisfactorily."</span></td>
<td class="hide"></td>
<td class="hide"></td>
<td class="hide"></td>
<td class="hide"></td>
<td class="hide"></td>
</tr>

<tr>
<td colspan="4" class="hide-small-span"><span class="times10">&nbsp;</span></td>
<td class="hide"></td>
<td class="hide"></td>
<td class="hide"></td>
<td class="hide"></td>
<td class="hide"></td>
</tr>

<td colspan="4" class="hide-small-span"><span class="underline-bottom">
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
</span></td>
<td class="hide"></td>
<td class="hide"></td>
<td class="hide"></td>
<td class="hide"></td>
<td class="hide"></td>
</td>
</tr>

<tr>
<td colspan="4" class="hide-small-span"><span class="size7">&nbsp;&nbsp;&nbsp;Signature - Supervisor</span></td>
<td class="hide"></td>
<td class="hide"></td>
<td class="hide"></td>
<td class="hide"></td>
<td class="hide"></td>
</tr>

</table>
</body>
</html>

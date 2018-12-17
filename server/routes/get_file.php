<?php
//BEGIN Authentication

session_start();

include "./do_auth.php";

function mysqli_result($res, $row, $field = 0)
{
  $res->data_seek($row);
  $datarow = $res->fetch_array();
  return $datarow[$field];
} 

//END Authentication.

if (isset($_SESSION["host"])) {
  $host = $_SESSION["host"];
} else {
  $host = "https://www.hawaii.edu/help/hdsupport/";
}

if (!isset($_GET["showfile"]) && isset($_GET['fid'])) {
  ?>

<script>
  window.open("get_file.php?showfile=yes&fid=<?php echo $_GET["fid"]; ?>");
  location.replace("get_file.php?showfile=no&fid=<?php echo $_GET["fid"]; ?>");
</script>

<?php

}

if ($_GET["showfile"] == "yes") {

  $fid = $_GET['fid'];
  $result = mysqli_query($GLOBALS['mysqli'], "SELECT * from files WHERE fid =" . $fid);

  if (mysqli_num_rows($result) === 1) {
    $file = mysqli_result($result, 0, "file");
    $fname = mysqli_result($result, 0, "fname");
    $fsize = mysqli_result($result, 0, "fsize");
    $ftype = mysqli_result($result, 0, "ftype");

    header("Content-type: $ftype\n");
    header("Cache-Control: private\n");
    header("Content-Disposition: inline; filename=$fname\n");
    header("Content-Transfer-Encoding: binary\n");
    header("Content-length: $fsize\n");
    echo $file;

  }

} else if ($_GET["showfile"] == "no") {

  ?>
<html>
<head>
<title>Get File</title>
<meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1">
<link href="<?php echo $host . "styles.css"; ?>" rel="stylesheet" type="text/css">
</head>

<body>

<!-- BEGIN MAIN BODY -->
<?php
$fid = $_GET['fid'];
$result = mysqli_query($GLOBALS['mysqli'], "SELECT fname,fsize,ftype from files WHERE fid =" . $fid);

if (mysqli_num_rows($result) == 1) {

  $fname = mysqli_result($result, 0, "fname");
  $fsize = mysqli_result($result, 0, "fsize");
  $ftype = mysqli_result($result, 0, "ftype");

}

?>
<a href="main.php">Home</a> <b>></b> Get File
<h1>Get File</h1>

You have downloaded:<br />
<table class="resultstable">
<tr>
  <td>
    Name:
  </td>
  <td>
    <?php echo $fname; ?>
  </td>
</tr>
<tr>
  <td>
    Size:
  </td>
  <td>
    <?php echo $fsize; ?> bytes
  </td>
</tr>
<tr>
  <td>
    Type:
  </td>
  <td>
    <?php echo $ftype; ?>  
  </td>
</tr>
</table>
<br />
<br />
Make sure all pop-up blockers are disabled, or add http://www.hawaii.edu to your list of trusted sites.<br />
Click <a href="get_file.php?fid=<?php echo $fid; ?>">here</a> to download again.<br />

<!--END MAIN BODY -->
<!-- BEGIN FOOTER -->
<!-- END FOOTER -->
</body>
</html>

<?php

}

?>

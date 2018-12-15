<?php

session_start();

if (isset($_SESSION["uuid"])) {

    if (isset($_SESSION["host"])) {
        $host = $_SESSION["host"];
    } else {
        $host = "https://www.hawaii.edu/help/hdsupport/";
    }
    $offset = $_SESSION["offset"];

	//destroy all references to the array.
    $_SESSION = array();


	//kill the session cookie
    setcookie(session_name(), '', time() - 42000, '/');

	//force data loss on script exit
    session_destroy();

    header("Location: https://authn.hawaii.edu/cas/logout?service=" . $host . "logout.php");

} else {

    ?>
<html>
<head>
<title>ITS Help Desk Support</title>
<meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1">
<link href="<?php echo $host . "styles.css"; ?>" rel="stylesheet" type="text/css">
</head>

<body>
<!--BEGIN MAIN BODY -->
You are now logged out.<br /><br />
<a href="index.html">Log</a> back in.
<!--END MAIN BODY -->

</body>

</html>
<?php

}

?>

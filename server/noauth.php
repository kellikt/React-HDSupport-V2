<?php

if (isset($_SESSION["host"])) {
	$host = $_SESSION["host"];
} else {
	$host = "https://www.hawaii.edu/help/hdsupport/";
}

?>

<html>
	<head>
	<title>Welcome to the ITS Help Desk Support Page</title>
	<meta http-equiv="Content-Type" content="text/html; charset=iso-8859-1">
</head>

<body>
	<h2>Not Authorized</h2>

	<p>You are not an authorized user for this site. Please contact the Site Administrator if this is an error.</p>
	<br />
</body>
</html>

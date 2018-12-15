<?php

 //BEGIN AUTHENTICATION

session_start();
include "./do_auth.php";

//END AUTHENTICATION

if (isset($_SESSION["host"])) {
    $host = $_SESSION["host"];
} else {
    $host = "https://www.hawaii.edu/help/hdsupport/";
}

?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<body>
    <p><?php echo $_SESSION['username']; ?></p>
    <p><?php echo $_SESSION['username']; ?></p>
    <p><?php echo $_SESSION['eduPersonAffiliation']; ?></p>
</body>
</html>
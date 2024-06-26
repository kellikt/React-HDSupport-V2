<?php

// server should keep session data for AT LEAST 4 hours
ini_set("session.gc_maxlifetime", 14400);

// each client should remember their session id for EXACTLY 4 hours
session_set_cookie_params(14400);

session_start();
include "./do_auth.php";

if (isset($_SESSION["host"])) {
    $host = $_SESSION["host"];
} else {
    $host = "https://www.hawaii.edu/help/hdsupport/";
}

?>

<!doctype html><html lang="en"><head><meta charset="utf-8"/><meta name="viewport" content="width=device-width,initial-scale=1,shrink-to-fit=no"/><meta name="theme-color" content="#000000"/><link rel="manifest" href="/help/hdsupport/dev6/manifest.json"/><title>HDSupport</title><script defer="defer" src="/help/hdsupport/dev6/static/js/main.181afc84.js"></script><link href="/help/hdsupport/dev6/static/css/main.757e50a8.css" rel="stylesheet"></head><body><noscript>You need to enable JavaScript to run this app.</noscript><div id="root"></div></body></html>
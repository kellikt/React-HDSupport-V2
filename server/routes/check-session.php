<?php

session_start();
// need to go through once to ensure they are logged in
require_once "./do_auth.php";
function checkSession() 
{
    // check request ticket, responsible for cas
    if (session_status() == PHP_SESSION_ACTIVE && isset($_SESSION['uuid'])) {
        return 0;
    } else {
        return 1;
    }
}
echo checkSession();
?>
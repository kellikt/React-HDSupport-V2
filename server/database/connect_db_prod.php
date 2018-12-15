<?php

$host = 'mdb41.pvt.hawaii.edu';
$db = '';
$user = '';
$pass = '';
$charset = 'utf8mb4';

mysqli_report(MYSQLI_REPORT_OFF);

try {
    $mysqli = new mysqli($host, $user, $pass, $db);
    $mysqli->set_charset($charset);
} catch (\myslqi_sql_exception $e) {
    throw new \mysqli_sql_exception($e->getMessage(), $e->getCode());
}

?>
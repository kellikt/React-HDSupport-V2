<?php

$host = '';
$db = '';
$user = '';
$pass = '';
$charset = '';

mysqli_report(MYSQLI_REPORT_OFF);

try {
    $mysqli = new mysqli($host, $user, $pass, $db);
    $mysqli->set_charset($charset);
} catch (\myslqi_sql_exception $e) {
    throw new \mysqli_sql_exception($e->getMessage(), $e->getCode());
}

?>
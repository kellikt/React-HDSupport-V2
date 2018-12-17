<?php

$host = '127.0.0.1';
$db = '';
$user = '';
$pass = '';
$charset = 'utf8mb4';

mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);

try {
    $mysqli = new mysqli($host, $user, $pass, $db);
    $mysqli->set_charset($charset);
} catch (\myslqi_sql_exception $e) {
    throw new \mysqli_sql_exception($e->getMessage(), $e->getCode());
}

?>
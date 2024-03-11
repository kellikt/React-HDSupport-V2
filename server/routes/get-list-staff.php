<?php

error_reporting(E_ALL);
ini_set('display_errors', 1);

session_start();
include "./do_auth.php";

if (isset($_SESSION["host"])) {
    $host = $_SESSION["host"];
} else {
    $host = "https://www.hawaii.edu/help/hdsupport/";
}

/*
 * Returns an Array of JSON objects of staff. Specify between 1st, 2nd, or 3rd Shift via the GET["shift"] parameter.
 */

 function getListStaff($db, $shift)
 {
    if ((int)$shift === 1) {
        $stmt = $db->prepare("SELECT DISTINCT user_groups.uid, users.first_name, users.last_name, users.username
            FROM user_groups
            INNER JOIN users ON user_groups.uid = users.uid
            WHERE (user_groups.first_staff = 'yes') AND users.expired = '0'
            ORDER BY users.last_name ASC
        ");
    } else if ((int)$shift === 2) {
        $stmt = $db->prepare("SELECT DISTINCT user_groups.uid, users.first_name, users.last_name, users.username
            FROM user_groups
            INNER JOIN users ON user_groups.uid = users.uid
            WHERE (user_groups.second_staff = 'yes') AND users.expired = '0'
            ORDER BY users.last_name ASC
        ");
    } else if ((int)$shift === 3) {
        $stmt = $db->prepare("SELECT DISTINCT user_groups.uid, users.first_name, users.last_name, users.username
            FROM user_groups
            INNER JOIN users ON user_groups.uid = users.uid
            WHERE (user_groups.third_staff = 'yes') AND users.expired = '0'
            ORDER BY users.last_name ASC
        ");
    }



    $stmt->execute();
    $result = $stmt->get_result();
    $array = array();

    while ($row = $result->fetch_assoc()) {
        $array[] = $row;
    }

    $stmt->close();

    return json_encode($array);

 }

 echo getListStaff($mysqli, $_GET['shift']);

?>
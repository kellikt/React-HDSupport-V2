<?php 

ini_set('session.gc_maxlifetime', 14400);
session_set_cookie_params(14400);

session_start();
include "./do_auth.php";

if (isset($_SESSION["host"])) {
    $host = $_SESSION["host"];
} else {
    $host = "https://www.hawaii.edu/help/hdsupport/";
}

/*
 * Returns an Array of JSON objects of students. Specify between labs, HD, or 3rd Shift via the GET["role"] parameter.
 */

function getListStudents($db, $role)
{
    if ($role === "helpdesk") {
        $stmt = $db->prepare("SELECT DISTINCT user_groups.uid, users.first_name, users.last_name, users.username
            FROM user_groups
            INNER JOIN users ON user_groups.uid = users.uid
            WHERE (user_groups.helpdesk = 'yes') AND user_groups.staff = 'no' AND user_groups.third_shift = 'no' AND users.expired = '0'
            ORDER BY users.last_name ASC
        ");
    } else if ($role === "lab") {
        $stmt = $db->prepare("SELECT DISTINCT user_groups.uid, users.first_name, users.last_name, users.username
            FROM user_groups
            INNER JOIN users ON user_groups.uid = users.uid
            WHERE (user_groups.lab = 'yes') AND user_groups.staff = 'no' AND users.expired = '0'
            ORDER BY users.last_name ASC
        ");
    } else if ($role === "third_shift") {
        $stmt = $db->prepare("SELECT DISTINCT user_groups.uid, users.first_name, users.last_name, users.username
            FROM user_groups
            INNER JOIN users ON user_groups.uid = users.uid
            WHERE (user_groups.helpdesk = 'yes') AND user_groups.staff = 'no' AND user_groups.third_shift = 'yes' AND users.expired = '0'
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

echo getListStudents($mysqli, $_GET['role']);

?>
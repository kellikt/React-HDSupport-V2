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
 * Returns an Array or JSON objects of all outages for a specified day via GET.
 * Specify between Staff or Students via the 'staff' GET parameter.
 */

function getOutages($db, $role, $date)
{
    $staff = 'no';
    if ($role === 'staff') {
        $staff = 'yes';
    }

    $stmt = $db->prepare("SELECT DISTINCT old_schedule.uid, date_format( old_schedule.begin_date, '%Y-%m-%d' ) AS begin_date, date_format( old_schedule.end_date, '%Y-%m-%d' ) AS end_date ,old_schedule.notes, users.first_name, users.last_name
                  FROM old_schedule
                  INNER JOIN users ON old_schedule.uid = users.uid
                  INNER JOIN user_groups ON user_groups.uid = old_schedule.uid
                  WHERE end_date >= ? AND user_groups.staff = ? AND begin_date <= ?
                  ORDER BY begin_date");
    $stmt->bind_param('sss', $date, $staff, $date);
    $stmt->execute();
    $result = $stmt->get_result();
    $array = array();

    while ($row = $result->fetch_assoc()) {
        $array[] = $row;
    }

    $stmt->close();

    return json_encode($array);
}

echo getOutages($mysqli, $_GET['role'], $_GET['date']);

?>
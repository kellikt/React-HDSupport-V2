<?php 

session_start();
include "./do_auth.php";

if (isset($_SESSION["host"])) {
    $host = $_SESSION["host"];
} else {
    $host = "https://www.hawaii.edu/help/hdsupport/";
}

function addUserGroups($db, $uid, $username, $super_admin, $admin, $manager, $staff, $helpdesk, $tech, $lab, $third_shift, $leapstart, $first_staff, $second_staff, $third_staff)
{
    $stmt = $db->prepare("INSERT INTO user_groups (uid, username, super_admin, administrator, manager, staff, helpdesk, tech, lab, third_shift, leapstart, first_staff, second_staff, third_staff) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
    $stmt->bind_param("ssssssssssssss", $uid, $username, $super_admin, $admin, $manager, $staff, $helpdesk, $tech, $lab, $third_shift, $leapstart, $first_staff, $second_staff, $third_staff);
    $stmt->execute();
    $stmt->close();

    return true;
}

$_POST = json_decode(file_get_contents("php://input"), true);
echo addUserGroups($mysqli, $_POST["uid"], $_POST["username"], $_POST["super_admin"], $_POST["admin"], $_POST["manager"], $_POST["staff"], $_POST["helpdesk"], $_POST["tech"], $_POST["lab"], $_POST["third_shift"], $_POST["leapstart"], $_POST["first_staff"], $_POST["second_staff"], $_POST["third_staff"]);

?>
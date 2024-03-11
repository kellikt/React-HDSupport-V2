<?php 

session_start();
include "./do_auth.php";

if (isset($_SESSION["host"])) {
    $host = $_SESSION["host"];
} else {
    $host = "https://www.hawaii.edu/help/hdsupport/";
}

function editGroups($db, $username, $super_admin, $admin, $manager, $staff, $helpdesk, $tech, $lab, $third_shift, $leapstart, $first_staff, $second_staff, $third_staff, $uid)
{
    $stmt = $db->prepare("UPDATE user_groups SET username=?, super_admin=?, administrator=?, manager=?, staff=?, helpdesk=?, tech=?, lab=?, third_shift=?, leapstart=?, first_staff=?, second_staff=?, third_staff=? WHERE uid=?");
    $stmt->bind_param("sssssssssssssi", $username, $super_admin, $admin, $manager, $staff, $helpdesk, $tech, $lab, $third_shift, $leapstart, $first_staff, $second_staff, $third_staff, $uid);
    $stmt->execute();
    $stmt->close();

    return true;
}

$_POST = json_decode(file_get_contents("php://input"), true);
echo editGroups($mysqli, $_POST["username"], $_POST["super_admin"], $_POST["administrator"], $_POST["manager"], $_POST["staff"], $_POST["helpdesk"], $_POST["tech"], $_POST["lab"], $_POST["third_shift"], $_POST["leapstart"], $_POST["first_staff"], $_POST["second_staff"], $_POST["third_staff"], $_POST["uid"]);

?>
<?php 

session_start();
include "./do_auth.php";

if (isset($_SESSION["host"])) {
    $host = $_SESSION["host"];
} else {
    $host = "https://www.hawaii.edu/help/hdsupport/";
}

function editGroups($db, $username, $admin, $manager, $staff, $helpdesk, $tech, $lab, $third_shift, $uid)
{
    $stmt = $db->prepare("UPDATE user_groups SET username=?, administrator=?, manager=?, staff=?, helpdesk=?, tech=?, lab=?, third_shift=? WHERE uid=?");
    $stmt->bind_param("ssssssssi", $username, $admin, $manager, $staff, $helpdesk, $tech, $lab, $third_shift, $uid);
    $stmt->execute();
    $stmt->close();

    return true;
}

$_POST = json_decode(file_get_contents("php://input"), true);
echo editGroups($mysqli, $_POST["username"], $_POST["administrator"], $_POST["manager"], $_POST["staff"], $_POST["helpdesk"], $_POST["tech"], $_POST["lab"], $_POST["third_shift"], $_POST["uid"]);

?>
<?php 

require_once "../database/connect_db.php";

function addUserGroups($db, $uid, $username, $admin, $manager, $staff, $helpdesk, $tech, $lab, $third_shift)
{
    $stmt = $db->prepare("INSERT INTO user_groups (uid, username, administrator, manager, staff, helpdesk, tech, lab, third_shift) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)");
    $stmt->bind_param("sssssssss", $uid, $username, $admin, $manager, $staff, $helpdesk, $tech, $lab, $third_shift);
    $stmt->execute();
    $stmt->close();

    return true;
}

$_POST = json_decode(file_get_contents("php://input"), true);
echo addUserGroups($mysqli, $_POST["uid"], $_POST["username"], $_POST["admin"], $_POST["manager"], $_POST["staff"], $_POST["helpdesk"], $_POST["tech"], $_POST["lab"], $_POST["third_shift"]);

?>
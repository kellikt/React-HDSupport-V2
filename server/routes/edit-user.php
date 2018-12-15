<?php 

session_start();
include "./do_auth.php";

if (isset($_SESSION["host"])) {
    $host = $_SESSION["host"];
} else {
    $host = "https://www.hawaii.edu/help/hdsupport/";
}

function editUser($db, $uuid, $firstName, $lastName, $username, $altEmail, $homePhone, $cellPhone, $otherPhone, $address, $zip, $city, $expired, $uid)
{
    $stmt = $db->prepare("UPDATE users SET uuid=?, first_name=?, last_name=?, username=?, alt_email=?, home_phone=?, cell_phone=?, other_phone=?, street_address=?, zipcode=?, city=?, expired=? WHERE uid=?");
    $stmt->bind_param("sssssssssssii", $uuid, $firstName, $lastName, $username, $altEmail, $homePhone, $cellPhone, $otherPhone, $address, $zip, $city, $expired, $uid);
    $stmt->execute();
    $stmt->close();

    return true;
}

$_POST = json_decode(file_get_contents("php://input"), true);
echo editUser($mysqli, $_POST["uuid"], $_POST["firstName"], $_POST["lastName"], $_POST["username"], $_POST["altEmail"], $_POST["homePhone"], $_POST["cellPhone"], $_POST["otherPhone"], $_POST["address"], $_POST["zip"], $_POST["city"], $_POST["expired"], $_POST["uid"]);

?>
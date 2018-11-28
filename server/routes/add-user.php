<?php 

require_once "../database/connect_db.php";

function addUser($db, $uuid, $firstName, $lastName, $username, $altEmail, $homePhone, $cellPhone, $otherPhone, $address, $zip, $city)
{
    $enter_date = date("Y-m-d");

    $stmt = $db->prepare("INSERT INTO users (uid, uuid, first_name, last_name, username, alt_email, home_phone, cell_phone, other_phone, street_address, zipcode, city, date_of_employ, expired) VALUES (DEFAULT, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 0)");
    $stmt->bind_param("isssssssssss", $uuid, $firstName, $lastName, $username, $altEmail, $homePhone, $cellPhone, $otherPhone, $address, $zip, $city, $enter_date);
    $stmt->execute();
    $uid = $db->insert_id;
    $stmt->close();

    return $uid;
}

$_POST = json_decode(file_get_contents("php://input"), true);
echo addUser($mysqli, $_POST["uuid"], $_POST["firstName"], $_POST["lastName"], $_POST["username"], $_POST["altEmail"], $_POST["homePhone"], $_POST["cellPhone"], $_POST["otherPhone"], $_POST["address"], $_POST["zip"], $_POST["city"]);

?>
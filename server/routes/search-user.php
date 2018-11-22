<?php 

require_once "../database/connect_db.php";


function searchUser($db, $username, $uuid, $firstName, $lastName)
{
    $query = "SELECT * FROM users WHERE ";
    if (strlen($username) > 0) {
        $query .= "username LIKE CONCAT('%', ?, '%')";
        $stmt = $db->prepare($query);
        $stmt->bind_param("s", $username);
    } else if (strlen($uuid) > 0) {
        $query .= "uuid LIKE CONCAT('%', ?, '%')";
        $stmt = $db->prepare($query);
        $stmt->bind_param("s", $uuid);
    } else if (strlen($firstName) > 0) {
        if (strlen($lastName) > 0) {
            $query .= "first_name LIKE CONCAT('%', ?, '%')";
            $query .= " AND last_name LIKE CONCAT('%', ?, '%')";
            $stmt = $db->prepare($query);
            $stmt->bind_param("ss", $firstName, $lastName);
        } else {
            $query .= "first_name LIKE CONCAT('%', ?, '%')";
            $stmt = $db->prepare($query);
            $stmt->bind_param("s", $firstName);
        }
    } else if (strlen($lastName) > 0) {
        $query .= "last_name LIKE CONCAT('%', ?, '%')";
        $stmt = $db->prepare($query);
        $stmt->bind_param("s", $lastName);
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

$_POST = json_decode(file_get_contents("php://input"), true);
echo searchUser($mysqli, $_POST['username'], $_POST['uuid'], $_POST['firstName'], $_POST['lastName']);

?>
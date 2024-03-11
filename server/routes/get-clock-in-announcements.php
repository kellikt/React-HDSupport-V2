<?php
ini_set('display_errors', '1');
ini_set('display_startup_errors', '1');
error_reporting(E_ALL);
session_start();
include "./do_auth.php";

if (isset($_SESSION["host"])) {
    $host = $_SESSION["host"];
} else {
    $host = "https://www.hawaii.edu/help/hdsupport/";
}

date_default_timezone_set("Pacific/Honolulu");
function getClockInAnnouncements($db, $token, $channel, $username)
{
    // get last clock in
    $stmt = $db->prepare("SELECT month, day, year, hour, min, ampm FROM log WHERE username=? ORDER BY logid DESC LIMIT 1");
    $stmt->bind_param("s", $username);
    $stmt->execute();
    $clockin = $stmt->get_result()->fetch_assoc();
    $stmt->close();

    // if last clock-in not found, use date of employment
    if (!is_countable($clockin)) {
        $stmt = $db->prepare("SELECT date_of_employ FROM users WHERE username=? LIMIT 1");
        $stmt->bind_param("s", $username);
        $stmt->execute();
        $clockin = $stmt->get_result()->fetch_assoc();
        $stmt->close();

        $clockin = $clockin["date_of_employ"];
        $clockString = $clockin;
    } else {
        // convert clock in to timestamp
        $clockString = $clockin["year"] . "-" . $clockin["month"] . "-" . $clockin["day"];
        $clockin = strtotime($clockin["year"] . "-" . $clockin["month"] . "-" . $clockin["day"] . " " . $clockin["hour"] . ":" . $clockin["min"] . $clockin["ampm"]);
    }

    // get user roles (helpdesk, leapstart, and lab)
    $stmt = $db->prepare("SELECT helpdesk, lab, leapstart FROM user_groups WHERE username=? LIMIT 1");
    $stmt->bind_param("s", $username);
    $stmt->execute();
    $roles = $stmt->get_result()->fetch_assoc();
    $stmt->close();

    // get manual announcements for current date
    $announcements = [];
    $currentDate = date('Y-m-d', time());

    if (($roles["helpdesk"] == "yes" || $roles["leapstart"] == "yes") && $roles["lab"] == "yes") {
        $stmt = $db->prepare("SELECT * 
        FROM announcements 
        WHERE ((open_date >= ? AND close_date >= ? AND open_date <= ?) OR (open_date = ?)) ORDER BY open_date DESC");
    } else if ($roles["helpdesk"] == "yes" || $roles["leapstart"] == "yes") {
        $stmt = $db->prepare("SELECT * 
        FROM announcements 
        WHERE ((open_date >= ? AND close_date >= ? AND open_date <= ?) OR (open_date = ?)) AND help_desk = 'yes' ORDER BY open_date DESC");
    } else if ($roles["lab"] == "yes") {
        $stmt = $db->prepare("SELECT * 
        FROM announcements 
        WHERE ((open_date >= ? AND close_date >= ? AND open_date <= ?) OR (open_date = ?)) AND lab = 'yes' ORDER BY open_date DESC");
    } else {
        // fetch all (for staff)
        $stmt = $db->prepare("SELECT * 
        FROM announcements 
        WHERE ((open_date >= ? AND close_date >= ? AND open_date <= ?) OR (open_date = ?)) ORDER BY open_date DESC");
    }
    $stmt->bind_param("ssss", $clockString, $currentDate, $currentDate, $currentDate);
    $stmt->execute();
    $result = $stmt->get_result();
    $array = array();

    while ($row = $result->fetch_assoc()) {
        $array[] = $row;
    }

    foreach ($array as $value) {
        $announcements[] = array(
            "atype" => "manual",
            "ts" => "",
            "open" => strtotime($value["open_date"]),
            "close" => strtotime($value["close_date"]),
            "title" => $value["title"],
            "text" => $value["description"],
            "subtype" => "",
            "room" => "",
        );
    }

    $stmt->close();

    return json_encode($announcements);
}
$_POST = json_decode(file_get_contents("php://input"), true);
echo getClockInAnnouncements($mysqli, $_POST['token'], $_POST['channel'], $_POST['username']);
?>
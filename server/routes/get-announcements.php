<?php
session_start();
include "./do_auth.php";

if (isset($_SESSION["host"])) {
    $host = $_SESSION["host"];
} else {
    $host = "https://www.hawaii.edu/help/hdsupport/";
}

function getAnnouncements($db, $username, $token, $channel)
{
    // get manual announcements for current date
    $currentDate = date('Y-m-d', time());
    $announcements = [];

    // get user roles (helpdesk, leapstart, and lab)
    $stmt = $db->prepare("SELECT helpdesk, lab, leapstart FROM user_groups WHERE username=? LIMIT 1");
    $stmt->bind_param("s", $username);
    $stmt->execute();
    $roles = $stmt->get_result()->fetch_assoc();
    $stmt->close();

    if (($roles["helpdesk"] == "yes" || $roles["leapstart"] == "yes") && $roles["lab"] == "yes") {
        $stmt = $db->prepare("SELECT * 
        FROM announcements 
        WHERE (open_date <= ? AND close_date >= ?)");
    }
    else if ($roles["helpdesk"] == "yes" || $roles["leapstart"] == "yes") {
        $stmt = $db->prepare("SELECT * 
        FROM announcements 
        WHERE (open_date <= ? AND close_date >= ?) AND help_desk = 'yes'");
    } else if ($roles["lab"] == "yes") {
        $stmt = $db->prepare("SELECT * 
        FROM announcements 
        WHERE (open_date <= ? AND close_date >= ?) AND lab = 'yes'");
    } else {
        $stmt = $db->prepare("SELECT * 
        FROM announcements 
        WHERE (open_date <= ? AND close_date >= ?)");
    }
    $stmt->bind_param("ss", $currentDate, $currentDate);
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
        );
    }

    $stmt->close();

    // get Slack announcements
    $ch = curl_init();
    $authorization = "Authorization: Bearer " . $token;
    $url = 'https://slack.com/api/conversations.history?channel=' . $channel;
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type: application/json', $authorization));
    curl_setopt($ch, CURLOPT_CUSTOMREQUEST, 'GET');
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
    $result = json_decode(curl_exec($ch));
    curl_close($ch);
    $slackAnnouncements = [];
    
    foreach ($result->messages as $value) {
        // filter leave/channel join messages
        if ($value->subtype != "channel_leave" && $value->subtype != "channel_join" && $value->subtype != "reminder_add") {
            $slackAnnouncements[] = array(
                "atype" => "slack",
                "ts" => $value->ts,
                "open" => $value->ts,
                "close" => "",
                "title" => "",
                "text" => $value->text,
            );
        }
    }
    // trim to 5 most recent messages
    $slackAnnouncements = array_slice($slackAnnouncements, 0, 5);

    foreach ($slackAnnouncements as $value) {
        $announcements[] = array(
            "atype" => $value["atype"],
            "ts" => $value["ts"],
            "open" => $value["open"],
            "close" => $value["close"],
            "title" => $value["title"],
            "text" => $value["text"],
        );
     }

    array_multisort(array_column($announcements, "open"), SORT_DESC, $announcements);

    return json_encode($announcements);
    

    // return - timestamp, title, description, manual or slack (slack announcements need to have addtl proccessing)
}
$_POST = json_decode(file_get_contents("php://input"), true);
echo getAnnouncements($mysqli, $_POST['username'], $_POST['token'], $_POST['channel']);
?>
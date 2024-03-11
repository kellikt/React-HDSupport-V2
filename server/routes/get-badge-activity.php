<?php
session_start();
include "./do_auth.php";

if (isset($_SESSION["host"])) {
  $host = $_SESSION["host"];
} else {
  $host = "https://www.hawaii.edu/help/hdsupport/";
}

function getBadgeActivity($db, $log, $ranking, $profile)
{
  if ($log === "yes") {
    $stmt = $db->prepare("SELECT a.tstamp, a.notes, a.staff_username, b.title, b.hex, b.hex_secondary, b.description, b.link, c.first_name, c.last_name, c.username 
    FROM badge_log as a, badges as b, users as c
    WHERE b.bid=a.bid
    AND c.uid=a.uid
    ORDER BY a.tstamp 
    DESC LIMIT 5");
    $stmt->execute();
    $result = $stmt->get_result();
    $array = array();

    while ($row = $result->fetch_assoc()) {
      $array[] = $row;
    }

    $stmt->close();

    return json_encode($array);
  } else if ($ranking === "yes") {

    // query badge log
    $stmt = $db->prepare("SELECT a.uid, a.bid from badge_log as a, users as b WHERE b.expired = 0 AND a.uid = b.uid ");
    $stmt->execute();
    $result = $stmt->get_result();
    $badge_log = array();

    while ($row = $result->fetch_assoc()) {
      $badge_log[] = $row;
    }
    $stmt->close();

    // query badges
    $stmt = $db->prepare("SELECT * from badges");
    $stmt->execute();
    $result = $stmt->get_result();
    $badges = array();

    while ($row = $result->fetch_assoc()) {
      $badges[] = $row;
    }

    // query non-expired users
    $stmt = $db->prepare("SELECT a.uid, a.first_name, a.last_name from users as a, user_groups as b WHERE a.expired = 0 AND b.staff = 'no' AND a.uid = b.uid");
    $stmt->execute();
    $result = $stmt->get_result();
    $users = array();

    while ($row = $result->fetch_assoc()) {
      $users[] = $row;
    }

    // rarity array to store percentages
    $badge_rarity = array();

    // create rare badge array - name, URL, percentage of users w badge
    foreach ($badges as $badge) {
      // filter badge log array to see how many users have the badge
      $badge_rate = array_filter($badge_log, function($log_badge) use($badge) {
        return $log_badge["bid"] == $badge["bid"];
      });

      // divide users who have badge by total users
      $badge_decimal = count($badge_rate) / count($users);
      $badge_rarity[] = array(
        "bid" => $badge["bid"],
        "title" => $badge["title"],
        "link" => $badge["link"],
        "color" => $badge["hex_secondary"],
        "rarity" => $badge_decimal
      );
    }

    // sort badge rarity ascending by rarity key
    usort($badge_rarity, function ($a, $b) {
      return $a["rarity"] > $b["rarity"];
    });

    // create user array
    
    $rankings = array();

    foreach ($users as $user) {
      // get badge count
      $badge_count = array_filter($badge_log, function($badge) use($user) {
        return $badge["uid"] == $user["uid"];
      });

      // filter badge rarity so it only contains badges that user has, check badge log? - should be first element
      $rarest_badge = array_values(array_filter($badge_rarity, function($badge) use($user, $badge_count) {
        return in_array($badge["bid"], array_column($badge_count, "bid"));
      }));


      // push element to ranking array - name, badge count, rarity
      $rankings[] = array(
        "name" => $full_name = $user["first_name"] . " " . $user["last_name"],
        "badge_count" => count($badge_count),
        "total_badges" => count($badges),
        "rarest_badge" => $rarest_badge[0]
      );
    }

    // sort array by badge count

    usort($rankings, function ($a, $b) {
      return $a["badge_count"] < $b["badge_count"];
    });

    return json_encode($rankings);

  } else if ($profile === "yes") {
    // query badges
    $stmt = $db->prepare("SELECT * from badges");
    $stmt->execute();
    $result = $stmt->get_result();
    $badges = array();

    while ($row = $result->fetch_assoc()) {
      $badges[] = $row;
    }

    // query badge log
    $stmt = $db->prepare("SELECT a.uid, a.bid, a.tstamp, a.notes, a.fav, a.staff_username FROM badge_log as a, users as b WHERE b.expired = 0 AND a.uid = b.uid");
    $stmt->execute();
    $result = $stmt->get_result();
    $badge_log = array();

    while ($row = $result->fetch_assoc()) {
      $badge_log[] = $row;
    }

    // query all users
    $stmt = $db->prepare("SELECT uid, first_name, last_name FROM users WHERE expired = 0");
    $stmt->execute();
    $result = $stmt->get_result();
    $users = array();

    while ($row = $result->fetch_assoc()) {
      $users[] = $row;
    }

    $stmt->close();

    $badge_list = array();


    // go through each badge
    foreach ($badges as $badge) {
      // filter badge log to see how many students have the badge
      $badge_rate = array_filter($badge_log, function($log) use($badge) {
        return $badge["bid"] == $log["bid"];
      });

      // filter badge log to see how many students have the badge favorited
      $favorite_rate = array_filter($badge_log, function($log) use($badge) {
        return $badge["bid"] == $log["bid"] && $log["fav"] == 1;
      });

      if (count($badge_rate) == 0) {
        $favorite_percentage = 0;
      } else {
        $favorite_percentage = count($favorite_rate)/count($badge_rate);
      }


      // filter badge log to see which students recently received the badge
      $recent_badge_log = array_filter($badge_log, function($log) use($badge) {
        $current_time = time();

        return $badge["bid"] == $log["bid"] && $log["tstamp"] > strtotime("last day of last month");
      });

      // filter user list to get user properties of those who recently received the badge
      $recent_students = array_values(array_filter($users, function($user) use($recent_badge_log) {
        return in_array($user["uid"], array_column($recent_badge_log, "uid"));
      }));

      $badge_list[] = array(
        "bid" => $badge["bid"],
        "title" => $badge["title"],
        "hex" => $badge["hex"],
        "hex_secondary" => $badge["hex_secondary"],
        "description" => $badge["description"],
        "link" => $badge["link"],
        "badge_rate" => count($badge_rate)/count($users),
        "favorite_rate" => $favorite_percentage,
        "recent_students" => $recent_students,
      );
    }

    return json_encode($badge_list);
  } else {
    // grab UID of current user
    $stmt = $db->prepare("SELECT a.tstamp, a.notes, a.staff_username, b.title, b.hex, b.hex_secondary, b.description, b.link
    FROM badge_log as a, badges as b, users as c
    WHERE b.bid=a.bid
    AND a.uid = c.uid
    AND c.uuid=?
    ORDER BY a.tstamp DESC
    LIMIT 1");
    $stmt->bind_param('i', $_SESSION["uuid"]);
    $stmt->execute();
    $result = $stmt->get_result();
    $array = array();

    while ($row = $result->fetch_assoc()) {
      $array[] = $row;
    }

    $stmt->close();

    return json_encode($array);
  }
}

$_POST = json_decode(file_get_contents("php://input"), true);
echo getBadgeActivity($mysqli, $_POST['log'], $_POST['ranking'], $_POST['profile']);

?>
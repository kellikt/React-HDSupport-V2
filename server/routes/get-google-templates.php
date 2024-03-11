<?php
session_start();
include "./do_auth.php";

if (isset($_SESSION["host"])) {
    $host = $_SESSION["host"];
} else {
    $host = "https://www.hawaii.edu/help/hdsupport";
}

function getGoogleTemplates($db, $gtid)
{
    if ($gtid == '') {
        $stmt = $db->prepare("SELECT * FROM google_templates");
    } else {
        $stmt = $db->prepare("SELECT * FROM google_templates WHERE gtid=?");
        $stmt->bind_param("i", $gtid);
    }

    $stmt->execute();
    $array = array();
    $result = $stmt->get_result();

    while ($row = $result->fetch_assoc()) {
        $array[] = $row;
    }
    $stmt->close();

    return json_encode($array);
}
echo getGoogleTemplates($mysqli, $_GET["gtid"]);
?>
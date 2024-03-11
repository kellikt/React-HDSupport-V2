<?php
session_start();
include "./do_auth.php";

if (isset($_SESSION["host"])) {
    $host = $_SESSION["host"];
} else {
    $host = "https://www.hawaii.edu/help/hdsupport/";
}

function getEmailTemplates($db, $tid) {
    if ($tid == '') {
        $stmt = $db->prepare("SELECT * FROM email_templates");
    } else {
        $stmt = $db->prepare("SELECT * FROM email_templates
        WHERE tid = ?");
        $stmt->bind_param("i", $tid);
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

echo getEmailTemplates($mysqli, $_GET['tid']);

?>
<?php 

session_start();
include "./do_auth.php";

if (isset($_SESSION["host"])) {
    $host = $_SESSION["host"];
} else {
    $host = "https://www.hawaii.edu/help/hdsupport/";
}

function sendEmail($from, $to, $subject, $bcc, $body)
{
    $strippedBody = stripslashes($body);
    $header = 'MIME-Version: 1.0' . "\r\n" . 'Content-type: text/html; charset=iso-8859-1' . "\r\n" . "From: " . $from;
    $header .= "\r\nReply-To:" . $from;

    if ($bcc) {
        $header .= "\r\nBcc: " . $bcc;
    }

    $mailsend = mail($to, $subject, $strippedBody, $header);

    return $mailsend;
}

$_POST = json_decode(file_get_contents("php://input"), true);
echo sendEmail($_POST["from"], $_POST["to"], $_POST["subject"], $_POST["bcc"], $_POST["body"]);

?>
<?php 

function getEmailContents($type)
{
    if ($type === "banner") {
        $body = file_get_contents('../templates/BannerReset.txt');
    } else if ($type === "usernamechange") {
        $body = file_get_contents('../templates/UsernameChange.txt');
    } else if ($type === "filedrop") {
        $body = file_get_contents('../templates/Filedrop.txt');
    }

    return $body;
}

echo getEmailContents($_GET["type"]);

?>
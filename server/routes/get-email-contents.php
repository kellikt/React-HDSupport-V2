<?php 

function getEmailContents($type)
{
    if ($type === "banner") {
        $body = file_get_contents('../templates/BannerReset.txt');
    } else if ($type === "usernamechange") {
        $body = file_get_contents('../templates/UsernameChange.txt');
    } else if ($type === "filedrop") {
        $body = file_get_contents('../templates/Filedrop.txt');
    } else if ($type === "sortsite") {
        $body = file_get_contents('../templates/SortSite.txt');
    } else if ($type === "traininglab") {
        $body = file_get_contents('../templates/TrainingLab.txt');
    } else if ($type === "fmo") {
        $body = file_get_contents('../templates/FMO.txt');
    }

    return $body;
}

echo getEmailContents($_GET["type"]);

?>
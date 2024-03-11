<?php

function slack($token, $email)
{
    $ch = curl_init();
    $authorization = "Authorization: Bearer " . $token;
    $url = 'https://slack.com/api/users.lookupByEmail?email=' . $email;
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type: application/json', $authorization));
    curl_setopt($ch, CURLOPT_CUSTOMREQUEST, 'GET');
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
    $result = curl_exec($ch);
    curl_close($ch);

    $result = json_decode($result);
    
    return $result->user->profile->image_192;
}

$_POST = json_decode(file_get_contents("php://input"), true);
echo slack($token, $_POST["email"]);
?>
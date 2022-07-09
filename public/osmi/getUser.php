<?php

$token = $_SERVER['HTTP_AUTHORIZATION'];

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, "https://www.onlinescoutmanager.co.uk/oauth/resource");
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
curl_setopt($ch, CURLOPT_HTTPHEADER, array("Authorization: " . $token));
$res = curl_exec($ch);
http_response_code(curl_getinfo($ch, CURLINFO_HTTP_CODE));
curl_close($ch);

echo($res);
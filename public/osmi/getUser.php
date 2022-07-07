<?php

$token = $_SERVER['HTTP_AUTHORIZATION'];

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, "https://www.onlinescoutmanger.co.uk/oauth/resource");
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
curl_setopt($ch, CURLOPT_HTTPHEADER, "Authorization: " . $token);
$res = curl_exec($ch);
curl_close($ch);

echo($res);
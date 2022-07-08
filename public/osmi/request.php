<?php

$token = $_SERVER['HTTP_AUTHORIZATION'];
$endpoint = $_POST['endpoint'];
$params = $_POST['params'];

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, "https://www.onlinescoutmanager.co.uk/" . $endpoint);
curl_setopt($ch, CURLOPT_POSTFIELDS, $params);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
curl_setopt($ch, CURLOPT_HTTPHEADER, array("Authorization: " . $token));
$res = curl_exec($ch);
curl_close($ch);

echo($res);
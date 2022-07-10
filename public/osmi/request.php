<?php

$token = $_SERVER['HTTP_AUTHORIZATION'];

$json = json_decode(file_get_contents('php://input'));

$endpoint = $json->endpoint . '?' . http_build_query($json->data, null, '&');

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, "https://www.onlinescoutmanager.co.uk/" . $endpoint);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
curl_setopt($ch, CURLOPT_HTTPHEADER, array("Authorization: " . $token));
$res = curl_exec($ch);
http_response_code(curl_getinfo($ch, CURLINFO_HTTP_CODE));
curl_close($ch);

echo($res);
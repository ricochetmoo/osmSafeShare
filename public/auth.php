<?php
require '../vendor/autoload.php';

$dotenv = Dotenv\Dotenv::createImmutable("../");
$dotenv->load();

$provider = new \League\OAuth2\Client\Provider\GenericProvider
([
	'clientId' => $_ENV['OSM_CLIENT_ID'],
	'clientSecret' => $_ENV['OSM_CLIENT_SECRET'],
	'redirectUri' => $_ENV['APP_URI'] . '/auth.php',
	'urlAuthorize' => 'https://onlinescoutmanager.co.uk/oauth/authorize',
	'urlAccessToken' => 'https://onlinescoutmanager.co.uk/oauth/token',
	'urlResourceOwnerDetails' => 'https://onlinescoutmanager.co.uk/oauth/resource',
    /*'header' => ['Content-Type' => 'application/x-www-form-urlencoded']*/
    'scope' => ['member:read']
]);

if (!isset($_GET['code'])) {

    // Fetch the authorization URL from the provider; this returns the
    // urlAuthorize option and generates and applies any necessary parameters
    // (e.g. state).
    $authorizationUrl = $provider->getAuthorizationUrl();

    // Get the state generated for you and store it to the session.
    $_SESSION['oauth2state'] = $provider->getState();

    // Redirect the user to the authorization URL.
    header('Location: ' . $authorizationUrl);
    exit;

// Check given state against previously stored one to mitigate CSRF attack
} elseif (empty($_GET['state']) || (isset($_SESSION['oauth2state']) && $_GET['state'] !== $_SESSION['oauth2state'])) {

    if (isset($_SESSION['oauth2state'])) {
        unset($_SESSION['oauth2state']);
    }

    exit('Invalid state');

} else {

    try {

        $url = "https://www.onlinescoutmanager.co.uk/oauth/token?grant_type=authorization_code&client_id=" . $_ENV['OSM_CLIENT_ID'] . "&client_secret=" . $_ENV['OSM_CLIENT_SECRET'] . "&redirect_uri=" . urlencode($_ENV['APP_URI'] . '/auth.php') . "&code=" . $_GET['code'];

        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURL_RETURNTRANSFER, 1);
        $res = json_decode(curl_exec());
        curl_close();

    } catch (\League\OAuth2\Client\Provider\Exception\IdentityProviderException $e) {

        // Failed to get the access token or user details.
        exit($e->getMessage());
    }

}
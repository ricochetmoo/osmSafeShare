function redirectIfLoggedIn()
{
	if (Cookies.get('oauth-token') == undefined)
	{
		window.location.href = 'index.html';
	}
}

redirectIfLoggedIn();
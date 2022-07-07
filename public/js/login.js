function redirectIfLoggedIn()
{
	if (Cookies.get('oauth-token'))
	{
		window.location.href = 'index.html';
	}
}

redirectIfLoggedIn();
function redirectIfLoggedOut()
{
	if (!Cookies.get('oauth-token'))
	{
		window.location.href = 'login.html';
	}
}

redirectIfLoggedOut();
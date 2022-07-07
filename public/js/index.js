function redirectIfLoggedOut()
{
	if (Cookies.get('oauth-token') == undefined)
	{
		window.location.href = 'login.html';
	}
}

redirectIfLoggedOut();
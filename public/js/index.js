function redirectIfLoggedOut()
{
	if (Cookies.get('oauth-token') == undefined)
	{
		window.location.href = 'login.html';
	}
}

function getUserDetails()
{
	const xhr = new XMLHttpRequest();
	xhr.open('GET', 'osmi/getUser.php', false);
	xhr.setRequestHeader("Authorization", "Bearer " + Cookies.get('oauth-token'));
	xhr.send(null);

	console.log(xhr.responseText);
}

redirectIfLoggedOut();
getUserDetails();
function setCookie()
{
	const p = document.querySelector("#token");

	Cookies.set('oauth-token', p.innerHTML);
}
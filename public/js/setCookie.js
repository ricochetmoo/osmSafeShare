function setCookie()
{
	const p = document.querySelector("#token");

	Cookies.set('oauth-token', p.innerHTML);

	window.location.href = "index.html";
}
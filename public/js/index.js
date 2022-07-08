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

	const res = JSON.parse(xhr.responseText)

	document.querySelector("#name").innerHTML = res.full_name;

	const sectionsList = document.querySelector("#sections");

	res.sections.forEach
	(section =>
		{
			const li = document.createElement("li");
			li.innerHTML = section.section_name;
			sectionsList.appendChild(li);
		}
	);
}

redirectIfLoggedOut();
getUserDetails();
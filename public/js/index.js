function redirectToLoginAndRemoveCookieIfSet()
{
	if (Cookies.get('oauth-token') != undefined)
	{
		Cookies.remove('oauth-token');
	}
	
	window.location.href = 'login.html';
}

function redirectIfLoggedOut()
{
	if (Cookies.get('oauth-token') == undefined)
	{
		redirectToLoginAndRemoveCookieIfSet();
	}
}

function getUserDetails()
{
	const xhr = new XMLHttpRequest();
	xhr.open('GET', 'osmi/getUser.php', false);
	xhr.setRequestHeader("Authorization", "Bearer " + Cookies.get('oauth-token'));
	xhr.send(null);

	if (xhr.status == 403)
	{
		redirectToLoginAndRemoveCookieIfSet();
	}

	const res = JSON.parse(xhr.responseText).data;

	document.querySelector("#name").innerHTML = res.full_name;

	const sectionsList = document.querySelector("#sections");

	res.sections.forEach
	(section =>
		{
			const li = document.createElement("li");
			li.innerHTML = section.section_name;
			li.id = section.section_id;
			li.classList.add("section");
			sectionsList.appendChild(li);
		}
	);
}

function getMembers(sectionId)
{
	const data = 
	{
		"endpoint": "ext/members/contact/?action=getListOfMembers",
		"data":
		{
			"sort": "dob",
			"sectionid": sectionId
		}	
	};
	
	const xhr = new XMLHttpRequest();
	xhr.open('GET', 'osmi/request.php');
	xhr.setRequestHeader("Authorization", "Bearer " + Cookies.get('oauth-token'));
	xhr.send(data);

	console.log(xhr.responseText);
}

function addEventListenersByClass(className, listener, method)
{
	document.querySelectorAll("." + className).forEach
	((element) =>
	{
		element.addEventListener(listener, () => {method(element.id)});
	});
}

redirectIfLoggedOut();
getUserDetails();
addEventListenersByClass("section", "onClick", getMembers);
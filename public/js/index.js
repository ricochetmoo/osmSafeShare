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
		element.addEventListener(listener, method(this.id));
	});
}

redirectIfLoggedOut();
getUserDetails();
addEventListenersByClass("section", "onClick", getMembers);
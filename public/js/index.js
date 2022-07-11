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
			
			const ul = document.createElement("ul");
			section.terms.forEach((term) =>
			{
				const termLi = document.createElement("li");
				termLi.innerHTML = term.name;
				termLi.id = section.section_id + "-" + term.term_id;
				termLi.classList.add("section");

				ul.appendChild(termLi);
			});

			li.appendChild(ul);

			sectionsList.appendChild(li);
		}
	);
}

function getMembers(sectionTermId)
{
	sectionTermId = sectionTermId.split("-");
	
	const data = 
	{
		"endpoint": "ext/members/contact/",
		"data":
		{
			"action": "getListOfMembers",
			"sort": "dob",
			"sectionid": sectionTermId[0],
			"termid": sectionTermId[1]
		}	
	};
	
	const xhr = new XMLHttpRequest();
	xhr.open('POST', 'osmi/request.php', false);
	xhr.setRequestHeader("Authorization", "Bearer " + Cookies.get('oauth-token'));
	xhr.send(JSON.stringify(data));

	if (xhr.status == 403)
	{
		redirectToLoginAndRemoveCookieIfSet();
	}

	return JSON.parse(xhr.responseText);
}

function getAndPopulateMembers(sectionTermId)
{
	const members = getMembers(sectionTermId);
	
	const membersList = document.querySelector("#members");
	membersList.innerHTML = "";

	members.items.forEach((member) =>
	{
		const age = member.age.split(" / ");

		if (member.age >= 13)
		{
			const li = document.createElement("li");
			li.innerHTML = member.firstname + " " + member.lastname + " (" + member.age + ")";
			li.id = member.scoutid;
			li.classList.add("member");
			membersList.appendChild(li);
		}
		
	});
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
addEventListenersByClass("section", "click", getAndPopulateMembers);
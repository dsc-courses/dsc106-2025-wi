console.log("IT’S ALIVE!");

function $$ (selector, context = document) {
	return Array.from(context.querySelectorAll(selector));
}

// Step 2
let nav = document.createElement("nav");
document.body.prepend(nav);

let pages = [
	{url: "", title: "Home"},
	{url: "projects/", title: "Projects"},
	{url: "cv/", title: "CV"},
	{url: "contact/", title: "Contact"},
	{url: "https://github.com/leaverou", title: "GitHub"},
];

const ARE_WE_HOME = document.documentElement.classList.contains("home");

for (let p of pages) {
	let url = p.url;
	let title = p.title;
	let a = document.createElement("a");

	a.textContent = title;
	url = ARE_WE_HOME && !url.startsWith("http") ? p.url : "../" + p.url;
	a.href = url;

	if (a.host !== location.host) {
		a.target = "_blank";
	}
	else {
		// Local link
		if (a.pathname === location.pathname) {
			a.classList.add("current");
		}
	}

	nav.appendChild(a);
}

// Step 4.2
document.body.insertAdjacentHTML("afterbegin", `
	<label class="color-scheme">
		Theme:
		<select>
			<option value="light dark">Automatic</option>
			<option value="light">Light</option>
			<option value="dark">Dark</option>
		</select>
	</label>
`);

// Step 4.4
let select = document.querySelector("select");
select.addEventListener("input", event => {
	setColorScheme(event.target.value);
});

function setColorScheme (colorScheme) {
	select.value = colorScheme;
	document.documentElement.style.setProperty("color-scheme", colorScheme);

	// Step 4.5 (1)
	localStorage.colorScheme = colorScheme;
}

// Step 4.5 (2)
if (localStorage.colorScheme) {
	setColorScheme(localStorage.colorScheme);
}

// Step 5
let form = document.querySelector("form");
form?.addEventListener("submit", evt => {
	evt.preventDefault();
	let data = new FormData(form);
	let params = [];
	for (let [name, value] of data) {
		params.push(name + "=" + encodeURIComponent(value));
	}
	let url = form.action + "?" + params.join("&");
	location.href = url;
});

// Lab 4 sample by Nate del Rosario, if you have questions feel free to reach out on slack
// 1.2
export async function fetchJSON(url) {
    try {
        // Fetch the JSON file from the given URL
        const response = await fetch(url);
		if (!response.ok) {
			throw new Error(`Failed to fetch projects: ${response.statusText}`);
		}
		console.log(response);
		const data = await response.json();
		// works
		console.log(data)
		return data; 

    } catch (error) {
        console.error('Error fetching or parsing JSON data:', error);
    }

}

// 1.3
export function renderProjects(projects, containerElement, headingLevel='h2') {

	// ensure containerElement is a valid DOM
	if (!(containerElement instanceof HTMLElement)) {
		console.error('Invalid container element provided.');
		return;
	}

	// validate headingLevel to prevent non-heading tags
    const validHeadings = ['h1', 'h2', 'h3', 'h4', 'h5'];
    if (!validHeadings.includes(headingLevel)) {
        headingLevel = 'h2';
    }

	// clear existing container
	containerElement.innerHTML = '';

	projects.forEach(project => {
		// check if project is valid object
		if (!project || typeof project !== 'object') {
			console.error('Invalid project:', project);
			return;
		}

		// create article for each project dynamically
		const article = document.createElement('article');
		
		article.innerHTML = `
			<${headingLevel}>${project.title}</${headingLevel}>
			<img src="${project.image}" alt="${project.title}">
			<p>${project.description}</p>
		`;

		console.log(project)
		containerElement.appendChild(article);
	});
}

// 3.2
export async function fetchGitHubData(username) {
	// return statement here
	return fetchJSON(`https://api.github.com/users/${username}`);
  }
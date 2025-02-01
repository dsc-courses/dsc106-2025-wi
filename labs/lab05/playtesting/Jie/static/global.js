console.log("IT’S ALIVE!");

function $$ (selector, context = document) {
	return Array.from(context.querySelectorAll(selector));
}

// let navLinks = $$("nav a");
// let currentLink = navLinks.find(a => a.host === location.host && a.pathname === location.pathname)
// currentLink?.classList.add("current");

// let pages = [
// 	{url: ".", title: "Home"},
// 	{url: "projects", title: "Projects"},
// 	{url: "resume", title: "Resume"},
//     {url: "https://github.com/jayefan", title: "GitHub"},
//     {url: "contact", title: "Contact"},
// ];

// let nav = document.createElement("nav");
// document.body.prepend(nav);
// const ARE_WE_HOME = document.documentElement.classList.contains("home");
// const isGitHubPages = location.hostname.includes('github.io');
// let baseURL = isGitHubPages ? 'portfolio/' : '/';

// for (let p of pages) {
// 	let url = p.url;
//     // url = !url.startsWith("http") ? baseURL + url : url;
//     url = !ARE_WE_HOME && !url.startsWith("http") ? "../" + url : url;

// 	let title = p.title;
//     let a = document.createElement("a");
//     a.href = url;
//     a.textContent = title;
//     nav.append(a);

//     a.classList.toggle("current", a.host === location.host && a.pathname === location.pathname);
//     if (a.host !== location.host) {
//         a.target = "_blank";
//     }
// }

// document.body.insertAdjacentHTML("afterbegin", `
// 	<label class="color-scheme">
// 		Theme:
// 		<select>
//             <option value="light dark">Automatic</option>
//             <option value="light" selected>Light</option>
//             <option value="dark">Dark</option>
// 		</select>
// 	</label>`
// );

// let select = document.querySelector("select");

// select.addEventListener("input", function (event) {
// 	console.log("color scheme changed to", event.target.value);
//     localStorage.colorScheme = event.target.value;

//         document.documentElement.style.setProperty("color-scheme", event.target.value);
// });

// if ("colorScheme" in localStorage) {
//     document.documentElement.style.setProperty("color-scheme", localStorage.colorScheme);
// }
// select.value = localStorage.colorScheme;


// form?.addEventListener("submit", function (event) {
//     event.preventDefault();
//     let data = new FormData(form);
//     for (let [name, value] of data) {
//         console.log(name, value);
//     }
// }

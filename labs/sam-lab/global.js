export function $$(selector, context = document) {
  return Array.from(context.querySelectorAll(selector));
}

let pages = [
  { url: '', title: 'Home' },
  { url: 'projects/', title: 'Projects' },
  { url: 'contact/', title: 'Contact' },
  { url: 'meta/', title: 'Meta' },
];

let nav = document.createElement('nav');
document.body.prepend(nav);

const ARE_WE_HOME = document.documentElement.classList.contains('home');

for (let p of pages) {
  let url = !ARE_WE_HOME && !p.url.startsWith('http') ? '../' + p.url : p.url;
  let title = p.title;
  let a = document.createElement('a');
  a.href = url;
  a.textContent = title;
  nav.append(a);

  a.classList.toggle(
    'current',
    a.host === location.host && a.pathname === location.pathname,
  );
}

document.body.insertAdjacentHTML(
  'afterbegin',
  `
	<label class="color-scheme">
		Theme:
		<select>
      <option value="light dark">Automatic</option>
      <option value="light">Light</option>
      <option value="dark">Dark</option>
		</select>
	</label>`,
);

let select = document.querySelector('.color-scheme select');

if (localStorage.getItem('colorScheme')) {
  document.documentElement.style.setProperty(
    'color-scheme',
    localStorage.getItem('colorScheme'),
  );
  select.value = localStorage.getItem('colorScheme');
}

select.addEventListener('input', (event) => {
  localStorage.setItem('colorScheme', event.target.value);
  document.documentElement.style.setProperty(
    'color-scheme',
    event.target.value,
  );
});

export async function fetchJSON(url) {
  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Failed to fetch: ${response.statusText}`);
    }
    const result = await response.json();
    return result;
  } catch (error) {
    console.error(error);
  }
}

export function renderProjects(projects, containerEl, headingLevel = 'h2') {
  containerEl.innerHTML = '';

  for (const project of projects) {
    const article = document.createElement('article');
    article.innerHTML = `
        <${headingLevel}>${project.title}</${headingLevel}>
        <img src="${project.image}" alt="${project.title}">
        <p>${project.description} <br><small>Year: ${project.year}</small></p>
    `;
    containerEl.appendChild(article);
  }
}

export async function fetchGitHubData(username) {
  return fetchJSON(`https://api.github.com/users/${username}`);
}

console.log('Hi!');

const setColorScheme = (colorScheme) => {
  console.log('color scheme changed to', colorScheme);
  document.documentElement.style.setProperty('color-scheme', colorScheme);
  localStorage.setItem('colorScheme', colorScheme);
};



const pages = {
  '': 'Home',
  'projects/': 'Projects',
  'resume/': 'Resume',
  'contact/': 'Contact',
  'https://github.com/casillasenrique': 'GitHub',
};

const ARE_WE_HOME = document.documentElement.classList.contains('home');

const nav = document.createElement('nav');
document.body.prepend(nav);

for (let url in pages) {
  const title = pages[url];

  let a = document.createElement('a');

  if (title === 'GitHub') {
    a.rel = 'noopener noreferrer';
    a.target = '_blank';
  }
  a.href = ARE_WE_HOME || title === 'GitHub' ? url : '../' + url;
  a.textContent = title;
  nav.append(a);

  if (a.host === location.host && a.pathname === location.pathname) {
    a.classList.add('current');
  }
}

document.body.insertAdjacentHTML(
  'afterbegin',
  `
	<label class="color-scheme">
		Theme:
		<select>
			<option value="light dark">Automatic</option>
			<option value="dark">Dark</option>
			<option value="light">Light</option>
		</select>
	</label>`,
);

const select = document.querySelector('select');

select.addEventListener('input', function (event) {
  setColorScheme(event.target.value);
});

const form = document.querySelector('form');

form?.addEventListener('submit', (event) => {
  event.preventDefault();
  const data = new FormData(form);
  let url = 'mailto:example@example.com?';
  for (let [name, value] of data) {
    url = url + `${name}=${encodeURIComponent(value)}&`;
    console.log(name, value);
  }

  location.href = url;
});

const storedColorScheme = localStorage.getItem('colorScheme');
if (storedColorScheme) {
  setColorScheme(storedColorScheme);
  select.value = storedColorScheme;
}
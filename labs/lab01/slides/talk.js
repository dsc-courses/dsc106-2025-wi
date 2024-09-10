import "../../slides/talk.js";

let relativeURLForm = document.querySelector("#relative-urls form");

if (relativeURLForm) {
	relativeURLForm.addEventListener("submit", (event) => {
		event.preventDefault();
	});

	relativeURLForm.addEventListener("input", (event) => {
		let form = event.currentTarget;
		let url = form.elements.url;
		let base = form.elements.base;
		let result = form.elements.result;

		let baseURL;

		base.setCustomValidity("");
		url.setCustomValidity("");

		try {
			baseURL = new URL(base.value);
		}
		catch (error) {
			base.setCustomValidity(error);
			base.reportValidity();
			return;
		}

		try {
			result.value = new URL(url.value, baseURL);
		}
		catch (error) {
			url.setCustomValidity(error);
			url.reportValidity();
		}
	});

	relativeURLForm.dispatchEvent(new InputEvent("input"));
}

for (let container of document.querySelectorAll(".elements")) {
	linkifyElements(container);
	container.addEventListener("inspire-domchanged", e => {
		linkifyElements(e.target);
	});
}

const create = Inspire.util.create;

function linkifyElements (container) {
	for (let code of container.querySelectorAll("code:not(pre > *, a > :only-child):is(.language-html, .language-html *)")) {
		let text = code.textContent;
		let elementName = text.match(/^<(\w+)>$/)[1];

		if (elementName) {
			create.around(code, `<a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Element/${elementName}"></a>`);
		}
	}
}
function $$ (selector, context = document) {
	return Array.from(context.querySelectorAll(selector));
}

const form = document.querySelector("form")
form?.addEventListener("submit", function (event) {
    event.preventDefault();
    const data = new FormData(form);
    let url = `${form.action}?`
    for (let [name, value] of data) {
        url += `${name}=${encodeURIComponent(value)}`;
    }
    location.href = url;
});
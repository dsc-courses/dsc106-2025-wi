import "./slides/plugins/browser/plugin.js";

let lab = location.pathname.match(/\/labs\/([\w-]+)\//)?.[1];

/**
 * Checkboxes to mark steps as done
 */
// Read stored data about which steps are done
let labs_done = JSON.parse(localStorage.labs_done ?? "{}");

let stepHeadingsSelector = ":is(h2, h3, h4, h5, h6)[id^='step-']";
let stepHeadings = document.querySelectorAll(stepHeadingsSelector);
let stepIndex = 0;

for (let h of stepHeadings) {
	let section = h.closest("section");
	let isOptional = h.textContent.includes("Optional");
	let isRecommended = h.textContent.toLowerCase().includes("recommended");

	if (isOptional) {
		// Make optional sections collapsed by default
		let details = document.createElement("details");
		let summary = document.createElement("summary");

		details.open = isRecommended;
		h.replaceWith(summary);
		summary.append(h);
		details.append(summary, ...section.childNodes);
		section.replaceWith(details);
		section = details;
	}

	let childSteps = section.querySelectorAll(`:scope :is(section, details)[id^='step-']`);
	section.childSteps = childSteps;
	section.classList.add(childSteps.length > 0 ? "step-group" : "step");
	section.classList.toggle("optional", isOptional);
	section.classList.toggle("recommended", isRecommended);

	let checkbox = document.createElement("input");
	checkbox.type = "checkbox";
	checkbox.dataset.for = h.id;
	h.prepend(checkbox);

	if (childSteps.length > 0) {
		checkbox.readOnly = true;
		checkbox.addEventListener("change", function () {
			// User action overrides computed value
			// States: (readonly) -> (checked) -> (unchecked) -> (readonly)
			if (this.checked && !this.readOnly) {
				// Get back to readonly (computed)
				this.readOnly = true;
				groupDoneChanged(section);
				return;
			}

			if (this.readOnly) {
				this.readOnly = false;
			}

			let state = this.checked;
			if (this.checked) {
				section.querySelectorAll(".step-checkbox").forEach(checkbox => {
					if (checkbox.checked !== state) {
						checkbox.click();
					}
				});
			}
		});
	}
	else {
		section.dataset.step_index = stepIndex++;
		checkbox.classList.add("step-checkbox");
		checkbox.addEventListener("change", function () {
			doneChanged(this, {save: true, scrollToNext: true});
		});
	}
}

let progress = document.createElement("progress");
progress.id = "step-progress";
progress.value = 0;
progress.max = document.querySelectorAll(".step:not(.optional, .optional *)").length;
stepHeadings[0]?.parentNode.before(progress);

// Mark steps as done that were previously marked done
if (labs_done[lab]) {
	for (let [id, checked] of Object.entries(labs_done[lab])) {
		let checkbox = document.querySelector(`[id="${id}"] input`);
		if (checkbox) {
			setDone(checkbox, checked);
		}
	}
}

// Update step groups
for (let section of document.querySelectorAll(".step-group")) {
	groupDoneChanged(section);
}

function setDone (checkbox, checked) {
	checkbox.checked = checked;
	doneChanged(checkbox);
}

function doneChanged (checkbox, o = {}) {
	let h = checkbox.closest("h2, h3, h4, h5, h6");
	let section = h.closest("section, details");
	let tocLink = document.querySelector(`#markdown-toc a[href="#${h.id}"]`);

	tocLink.classList.toggle("done", checkbox.checked);
	section.classList.toggle("done", checkbox.checked);
	progress.value = document.querySelectorAll("main section.step.done").length;

	let parent = section;
	while (parent = parent.parentNode.closest(".step-group")) {
		groupDoneChanged(parent);
	}

	if (o.save) {
		labs_done[lab] ??= {};
		labs_done[lab][checkbox.dataset.for] = checkbox.checked;
		localStorage.labs_done = JSON.stringify(labs_done);
	}

	if (o.scrollToNext) {
		let next = section.querySelector(":scope ~ :is(.step, .step-group):not(.done)");
		if (next) {
			next.scrollIntoView({behavior: "smooth"});
		}

	}
}

function groupDoneChanged (section) {
	let checkboxes = [...section.querySelectorAll(".step-checkbox")];
	let checked = checkboxes.filter(checkbox => checkbox.checked);

	section.style.setProperty("--steps", checkboxes.length);
	section.style.setProperty("--done", checked.length);

	// The section’s own checkbox will be the first
	let ownCheckbox = section.querySelector("input[type=checkbox]");

	if (!ownCheckbox.readOnly) {
		// User set
		return;
	}

	let done;

	if (checkboxes.length === checked.length) {
		// All done
		done = "all";
		ownCheckbox.checked = true;
		ownCheckbox.indeterminate = false;
	}
	else if (checked.length === 0) {
		// None done
		done = "none";
		ownCheckbox.checked = false;
		ownCheckbox.indeterminate = false;
	}
	else {
		// Some done
		done = "some";
		ownCheckbox.indeterminate = true;
	}

	section.classList.toggle("done", done === "all");
}

/**
 * Autolinking to MDN
 */

// Link CSS properties in CSS code blocks to MDN docs
for (let pre of document.querySelectorAll("pre:is(.language-css, .language-css *)")) {
	for (let propertyToken of pre.querySelectorAll(".py, .nl")) {
		let property = propertyToken.textContent;

		let urlSlug = property.startsWith("--")? "--*" : property;
		propertyToken.insertAdjacentHTML("beforebegin",
			`<a href="https://developer.mozilla.org/en-US/docs/Web/CSS/${urlSlug}" target="_blank" class="${propertyToken.className}">${property}</span>`);
		propertyToken.remove();
	}
}

// Link HTML elements to MDN docs
for (let code of document.querySelectorAll("code.language-plaintext.highlighter-rouge:not(pre > *):not(a > *)")) {
	let content = code.textContent;
	let urlPrefix;
	let urlContent = content;
	const mdnRoot = "https://developer.mozilla.org/en-US/docs/Web/";

	if (/^<[\w-]+>$/.test(content)) {
		urlPrefix = "HTML/Element";
		urlContent = content.slice(1, -1);
	}
	else if (/^[\w-]+$/.test(content) && content in document.body.style) {
		urlPrefix = "CSS";
	}
	else if (/^[\w-]+: /.test(content)) {
		let [property, value] = content.split(":");

		if (property in document.body.style) {
			let url = `${mdnRoot}/CSS/${property}`;
			code.innerHTML = `<a href="${ url }" target="_blank">${ property }</a>:${ value }`;
		}

	}

	if (urlPrefix) {
		// Wrap with link to docs
		let url = `${mdnRoot}${urlPrefix}/${urlContent}`;
		code.insertAdjacentHTML("beforebegin", `<a href="${ url }" target="_blank"></a>`);
		code.previousSibling.append(code);
	}
}
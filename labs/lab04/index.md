---
layout: assignment
title: 'Lab 4: Svelte (Templating & Control Flow)'
lab: 4
parent: '👩‍🔬 Programming Labs'
released: false
---

# Lab 4: JavaScript (Templating & Control Flow)

{: .no_toc}

{: .summary}

> In this lab, we will learn:
>
> - What is npm?
> - What are JavaScript modules and why are they useful?
> - Using JavaScript for templating and control flow in web development.
> - First steps with modular JavaScript: templating and control flow

<details open markdown="block">
  <summary>
    Table of contents
  </summary>
  {: .text-delta }
- TOC
{:toc}
</details>

---

## Check-off

To get checked off for the lab, please record a 2-minute video with the following components:

1. Present your webpage.
2. Show how you interact with your webpage using the JavaScript-based modifications.
3. Share the most interesting thing you learned from this lab.

**Videos longer than 2 minutes will be trimmed to 2 minutes before grading, so ensure your video is concise.**

## Prerequisites

- You should have completed all the steps in [Lab 0](../0/), i.e., that you have Node.js and npm installed.
- This lab assumes you have already completed [Lab 1](../1/), [Lab 2](../2/), and [Lab 3](../3/) as we will use the same website as a starting point.

## [Slides](./slides/)

Make sure to read the notes on each slide as well!

## What to Expect When Using Modular JavaScript

Unlike the previous labs, this lab will not involve dramatic changes to the end-user experience of our website.
In terms of user-facing changes, we will only add a section of the 3 selected projects to the home page and display a count of projects.

However, we will be completely re-architecting its internals using JavaScript modules and templating for better organization and scalability.

## Step 1: Setting up

### Step 1.1: Creating a new project structure

In this lab, we will create a **new folder** for our website and gradually import our existing website into it.
Decide on a name for your new folder (e.g., `my-portfolio-js`).

Open your existing website folder with VS Code.
In the integrated terminal, navigate to its parent folder using:

```bash
cd ..
```

Then create a new folder for your project:

```bash
mkdir my-portfolio-js && cd my-portfolio-js
```

Initialize a new npm project:

```bash
npm init -y
```

This will create a `package.json` file, which will help manage your project dependencies.

### Step 1.2: Setting up a local development server

Install a simple HTTP server for local development:

```bash
npm install --save-dev http-server
```

Add a script to `package.json` to start the server:

```json
"scripts": {
  "start": "http-server ."
}
```

Run the server:

```bash
npm start
```

You should see output indicating that your server is running. Visit `http://localhost:8080` in your browser to verify.

### Step 1.3: Organizing your files

Copy your existing `images/`, `style.css`, and `global.js` files into the new folder. Create an `index.html` file for your homepage.

Your project structure should now look like this:

```
my-portfolio-js/
├── images/
├── style.css
├── global.js
├── index.html
├── package.json
├── node_modules/
```

---

## Step 2: Modularizing Your Code

### Step 2.1: Setting up JavaScript modules

Modern JavaScript allows you to split your code into separate modules, making it easier to organize and reuse code.

Create a new `src/` directory to store your JavaScript files:

```bash
mkdir src
```

Inside `src/`, create the following files:

- `projects.js` (to hold your project data)
- `template.js` (to generate HTML dynamically)
- `main.js` (to initialize and control the webpage)

Update your `index.html` to use these modules:

```html
<script type="module" src="src/main.js"></script>
```

### Step 2.2: Moving project data to a module

In `src/projects.js`, export an array of project data:

```javascript
export const projects = [
  {
    title: "Project 1",
    image: "images/project1.png",
    description: "Description for project 1."
  },
  {
    title: "Project 2",
    image: "images/project2.png",
    description: "Description for project 2."
  },
  {
    title: "Project 3",
    image: "images/project3.png",
    description: "Description for project 3."
  }
];
```

### Step 2.3: Creating templates for dynamic content

In `src/template.js`, export a function to generate HTML for a project:

```javascript
export function createProjectHTML(project) {
  return `
    <article>
      <h2>${project.title}</h2>
      <img src="${project.image}" alt="${project.title}">
      <p>${project.description}</p>
    </article>
  `;
}
```

### Step 2.4: Displaying projects dynamically

In `src/main.js`, import the modules and display the projects:

```javascript
import { projects } from './projects.js';
import { createProjectHTML } from './template.js';

const projectContainer = document.querySelector(".projects");

projects.forEach((project) => {
  projectContainer.innerHTML += createProjectHTML(project);
});
```

Add a `<div class="projects"></div>` to your `index.html` where the projects will be displayed.

---

## Step 3: Adding Interactivity

### Step 3.1: Counting projects

In `src/main.js`, display the total number of projects:

```javascript
const projectCount = document.querySelector(".project-count");
projectCount.textContent = `Total projects: ${projects.length}`;
```

Add a placeholder for this count in `index.html`:

```html
<h1 class="project-count"></h1>
```

### Step 3.2: Filtering projects

Add a filter input to `index.html`:

```html
<input type="text" id="filter" placeholder="Search projects">
```

In `src/main.js`, implement the filter logic:

```javascript
const filterInput = document.getElementById("filter");

filterInput.addEventListener("input", () => {
  const query = filterInput.value.toLowerCase();
  const filteredProjects = projects.filter((project) =>
    project.title.toLowerCase().includes(query)
  );

  projectContainer.innerHTML = "";
  filteredProjects.forEach((project) => {
    projectContainer.innerHTML += createProjectHTML(project);
  });
});
```

---

## Step 4: Publishing Your Website

### Step 4.1: Deploying to GitHub Pages

Create a `gh-pages` branch and push your code to GitHub. Use GitHub Pages to host your site. See [GitHub Pages documentation](https://pages.github.com/) for detailed steps.

---

## To be continued...

In the next lab, we will learn how to enhance interactivity with advanced JavaScript techniques, including handling user input and working with APIs.

## Resources

- [JavaScript Modules](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules)
- [Dynamic HTML Generation](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/template)


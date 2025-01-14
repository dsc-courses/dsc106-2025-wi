---
layout: assignment
title: 'Lab 4: JavaScript II (Templating, Control Flow, and Reactivity)'
lab: 4
parent: '👩‍🔬 Programming Labs'
released: false
---

# Lab 4: JavaScript II (Templating, Control Flow, and Reactivity)

{: .no_toc}

{: .summary}

> In this lab, we will learn:
>
> - Modular JavaScript for organizing and maintaining complex projects.
> - Adding interactivity through event-driven programming.
> - Fetching and displaying API data dynamically.

<details open markdown="block">
  <summary>
    Table of contents
  </summary>
  {: .text-delta }
- TOC
{:toc}
</details>

---

## Submission

In your submission for the lab, please record a 2 minute video *as an mp4 file* with the following components:

1. Present your webpage.
2. Show you interacting with your webpage with your new javascript modifications.
3. Share the most interesting thing you learned from this lab.

**Videos longer than 2 minutes will be trimmed to 2 minutes before we grade, so
make sure your video is 2 minutes or less.**

## Prerequisites

- You should have completed all the steps in [Lab 0](../0/), i.e. that you have Node.js and npm installed. You will not need the local server from Lab 0, as SvelteKit will provide its own.
- This lab assumes you have already completed [Lab 1](../1/), [Lab 2](../2/), [Lab 3](../3/) as we will use the same website as a starting point.

## [Slides](./slides/)

Make sure to read the notes on each slide as well!

## Step 1: Templating projects from a data file

In the previous labs, we were using a hardcoded blob of HTML to display our projects.
This is not ideal: if we want to change the HTML for our projects, we have to do it N times, where N is the number of projects we have.
Now, it is true that if we design our HTML well, we should be able to change its style without changing its structure, but there are many changes we may want to make that would require changing the structure of the HTML.
And even the most well written HTML is no help when we want to display the same data in multiple ways.
For example, what if we wanted to display our projects on the homepage as well?
Or provide a data file for others to use?
Or draw a visualization of them?
Maintaining our data together with its presentation tends to become painful, fast.

### Step 1.1: Creating a JSON file with our project data

We will use the browser console to _extract_ the data from our HTML to JSON so that if you have edited your HTML to contain your actual projects, you don’t lose your data.
The following code assumes you have used the same structure for your projects as what was given in the previous labs, where the list of projects was within a `<div class="projects>` and each project looked like this:

```html
<article>
  <h2>Project title</h2>
  <img src="path/to/image.png" alt="" />
  <p>Project description</p>
</article>
```

Load your Projects page and open the dev tools console.
Paste the following code into it and hit Enter:

```js
$$('.projects > article').map((a) => ({
  title: $('h2', a).textContent,
  image: $('img', a).getAttribute('src'),
  description: $('p', a).textContent,
}));
```

Inspect the array returned by the code and make sure it looks like what you expect.

<img src="images/json-array.gif" class="browser" alt="">

If you’re happy with it, right click on it and select "Copy object".

<img src="images/copy-object.png" alt="">

Create a new file in a new folder `lib/` called `projects.json` and paste the JSON there.

<details>
<summary>Having trouble?</summary>

If you’re having trouble with the above steps, you can use this <a href="download/projects.json" download><code>projects.json</code></a> file as a starting point.

</details>

### Step 1.2: Importing Project Data into the Projects Page

In this step, you’ll create a function in your `global.js` file to load project data from a JSON file and dynamically display it on the Projects page.

#### **1. Setting Up the Function**
Start by defining an **asynchronous function** that will fetch project data. Use the following snippet to get started:

```js
export async function loadProjects() {
    try {
        // Fetch the JSON file containing project data
        const response = await fetch('../src/projects.json');
    } catch (error) {
        console.error('Error fetching project data:', error);
    }
}
```

**What to Do:**
1. Copy this snippet into your `global.js` file.
2. Identify the URL `../src/projects.json` and make sure the file exists in your project structure.

#### **2. Handling Errors**
Add a check to ensure the `fetch` request was successful. If it wasn’t, throw an error to handle invalid responses. Here’s the next piece:

```js
if (!response.ok) {
    throw new Error(`Failed to fetch projects: ${response.statusText}`);
}
```

**What to Do:**
1. Place this snippet inside the `try` block, **immediately after** the `fetch` function call.
2. Use `console.log(response)` to inspect the response object in your browser’s developer tools and confirm that it’s working correctly.

#### **3. Parsing the Data**
Once you’ve verified the response is valid, parse it into a format you can work with. Here’s how to parse the response:

```js
const projects = await response.json();
console.log('Parsed projects:', projects); // only for debugging purposes, can be removed later
```

**What to Do:**
1. Add this snippet after the `if (!response.ok)` check.
2. Open the browser console to ensure `projects` contains the data from your JSON file.

#### **4. Selecting the Projects Container**
To display the projects, locate the container in your HTML with the class `projects`. Use the following code to select it:

```js
const projectsContainer = document.querySelector('.projects');
projectsContainer.innerHTML = ''; // Clear existing content
```

#### **5. Displaying Projects Dynamically**
Use JavaScript to loop through each project and create the HTML structure dynamically. 

```js
projects.forEach(project => {
    const article = document.createElement('article');
    article.innerHTML = `
        <h2>${project.title}</h2>
        <img src="${project.image}" alt="${project.title}">
        <p>${project.description}</p>
    `;
    projectsContainer.appendChild(article);
});
```

Place this inside your function, **after clearing the container**.

### Step 1.3: Templating our project data

First, delete or comment out all your `<article>` elements inside the `<div class="projects">`.
Then, you must **import** your new javascript function from your `script` element like so:

```html
    <script type="module">
        import { loadProjects } from '/global.js';
        document.addEventListener('DOMContentLoaded', loadProjects);
    </script>
```

If you view your website at this point, you should see your projects displayed in the same way as before but imported from your json file.
Try making an edit to your JSON file and see if it reflects on your website.

### Step 1.4: Counting projects

A big bonus of this approach is that we can use code to compute things from the data,
and have it update automatically when the data changes.
Try it: add a count of projects at the top of the page by adding `{ projects.length }` in the `<h1>` element.

<img src="images/projects-count.png" alt="" class="browser">

## Step 2: Displaying the First 3 Projects on the Home Page Using JavaScript

We will now display the first 3 projects on the home page. We could do this by copying the project template from the Projects page and pasting it into the home page. However, this means that if we want to change it (e.g., add a date), we’d need to update it in two places.

That’s precisely what reusable functions in JavaScript are for!

Reusable JavaScript functions encapsulate logic for an independent piece of UI and can be reused across your app. 

### Step 2.1: Creating a `renderProject` Function

You’ll build a `renderProject` function to dynamically generate and display project content. This function will allow you to reuse project rendering logic anywhere on your site.

#### **1. Defining the Basic Function**

Start by creating a function that accepts two parameters: the `project` object and the `containerElement` where the project will be displayed.

```js
function renderProject(project, containerElement) {
    // Your code will go here
}
```

**What to Do:**
1. Add this snippet to your `global.js` file.
2. Think about why you need these two parameters.

**Challenge:**
- What type of data should the `project` parameter contain?
- How would you test if the `containerElement` is valid?

#### **2. Creating the HTML Structure**

Within the function, create an `<article>` element to hold the project details. Then, use `innerHTML` to define its content dynamically.

```js
const article = document.createElement('article');
article.innerHTML = `
    <h3>${project.title}</h3>
    <img src="${project.image}" alt="${project.title}" />
    <p>${project.description}</p>
`;
```

**What to Do:**
1. Place this snippet inside the function.
2. Replace hardcoded values (e.g., `project.title`, `project.image`, etc.) with dynamic ones from the `project` object.

**Think About It:**
- Why do we use `createElement` instead of directly inserting HTML?
- What happens if the `project` object is missing a property like `title`?

#### **3. Appending the Article**

Finally, append the `<article>` element to the provided `containerElement`.

```js
containerElement.appendChild(article);
```

**What to Do:**
1. Add this line after defining the `<article>` content.
2. Ensure `containerElement` is a valid DOM element in your tests.

**Check Your Understanding:**
- What happens if `containerElement` is null?
- How can you make the function robust against missing or incorrect parameters?

#### **4. Enhancing the Functionality**

Now that the basic function is ready, let’s enhance it to allow dynamic heading levels. This makes the function reusable for different contexts.

```js
export function renderProject(project, containerElement, headingLevel = 'h2') {
    const article = document.createElement('article');
    article.innerHTML = `
        <${headingLevel}>${project.title}</${headingLevel}>
        <img src="${project.image}" alt="${project.title}" />
        <p>${project.description}</p>
    `;
    containerElement.appendChild(article);
}
```

**What to Do:**
1. Replace your existing function with this enhanced version.
2. Test it by calling the function with different `headingLevel` values.

**Challenge:**
- What happens if you pass an invalid `headingLevel` (e.g., a non-heading tag)?
- How can you validate the `headingLevel` parameter?

### Step 2.2: Creating a `loadLatestProjects` Function

This function will fetch project data from a JSON file and use the `renderProject` function to display the latest projects.

#### **1. Setting Up the Function**

Start by defining an asynchronous function that takes the JSON file path and container as parameters.


```js
export async function loadLatestProjects(jsonPath, containerElement) {
    try {
        // Your code will go here
    } catch (error) {
        console.error('Error loading projects:', error);
    }
}
```

**What to Do:**
1. Add this snippet to your `global.js` file.
2. Think about why the function needs both `jsonPath` and `containerElement`.

#### **2. Fetching the Data**

Inside the `try` block, use `fetch` to get data from the JSON file. Check if the response is successful.

```js
const response = await fetch(jsonPath);
if (!response.ok) {
    throw new Error(`Failed to fetch projects: ${response.statusText}`);
}
```

**What to Do:**
1. Place this snippet inside the `try` block.
2. Test your implementation with a valid JSON path.

**Challenge:**
- What happens if the JSON file path is incorrect?
- How can you handle network errors gracefully?

#### **3. Parsing the Data**

Once the response is successful, parse it into a JavaScript object.

```js
const projects = await response.json();
```

**What to Do:**
1. Add this line after checking the response.
2. Use `console.log(projects)` to inspect the fetched data.

**Think About It:**
- What structure does the `projects` array need for this function to work correctly?

#### **4. Displaying the Latest Projects**

Filter the first three projects from the array and pass each one to the `renderProject` function.

```js
const latestProjects = projects.slice(0, 3);
latestProjects.forEach((project) => {
    renderProject(project, containerElement, 'h3');
});
```

**What to Do:**
1. Add this snippet after parsing the data.
2. Ensure your JSON file contains at least three projects for testing.

**Test Your Knowledge:**
- Why do we use `slice(0, 3)`?
- What happens if there are fewer than three projects in the JSON file?

Test your function by calling it with a valid JSON file path and container element and erify that only the first three projects are displayed.

### Step 2.3: Importing Projects into `index.html`

You’ll now integrate the script to dynamically load and display projects on the page.

#### **1. Adding the `<script>` Tag**

Start by adding a `<script>` tag to your `index.html` file. This tag will load a JavaScript module when the page is loaded.

```html
<script type="module">
    // Your code will go here
</script>
```

**What to Do:**
1. Add this snippet into the `<head>` or before the closing `</body>` tag of your `index.html` file.
2. Ensure you specify `type="module"`, as this enables ES6 module imports.

**Think About It:**
- Why do we need the `type="module"` attribute?

#### **2. Importing the JavaScript Function**

Inside the `<script>` tag, import the `loadLatestProjects` function from your `global.js` file. This function will handle loading and displaying the projects.

```js
import { loadLatestProjects } from '/global.js'; // Adjust path based on file structure
```

**What to Do:**
1. Add this line inside your `<script>` tag.
2. Confirm the correct file path for `global.js` by checking your project structure.

**Challenge:**
- What happens if the file path is incorrect? How can you debug it?

#### **3. Listening for the DOM Content Loaded Event**

You’ll need to wait until the DOM (Document Object Model) is fully loaded before running the function. Use `addEventListener` to listen for the `DOMContentLoaded` event.

```js
document.addEventListener('DOMContentLoaded', () => {
    // Code to run after DOM is fully loaded
});
```

**What to Do:**
1. Place this inside your `<script>` tag.
2. Test by adding a simple `console.log('DOM fully loaded!');` inside the event listener to verify it works.

**Think About It:**
- Why is it important to wait for the DOM to load?

#### **4. Selecting the Target Container**

Identify the container on your page where the projects will be displayed. Use `document.querySelector` to select the container.

```js
const container = document.querySelector('.projects.highlights');
```

**What to Do:**
1. Add this line inside the `DOMContentLoaded` event listener.
2. Check your HTML to ensure there’s a container with the class `projects highlights`.

**Challenge:**
- What happens if the selector doesn’t match any element? How can you handle this?

#### **5. Calling the Function**

Finally, call the `loadLatestProjects` function and pass the JSON file path and container as arguments. This will load and display the projects.

```js
loadLatestProjects('./src/projects.json', container);
```

**What to Do:**
1. Add this line after defining the `container`.
2. Ensure the JSON file exists at the specified path.

**Test Your Knowledge:**
- What arguments is the `loadLatestProjects` function expecting?
- Why do we pass the container as an argument?

#### **6. Adding the HTML Container for Projects**

Before your script can dynamically display the projects, you need to provide a placeholder container in your `index.html` file. This container will hold the dynamically added project content.

```html
<h2>Latest Projects</h2>
<div class="projects highlights">
    <!-- Dynamically added content will appear here -->
</div>
```

**What to Do:**
1. Add this snippet to your `index.html` file
2. Ensure the `div` element has the class `projects highlights`, as this matches the container selected in your script.

**Think About It:**
- Why do we include both `projects` and `highlights` as classes?
- What happens if this container is missing or the classes don’t match?

Check out the home page of your website to see if everything looks right!

## Step 3: Loading data from an API

So far we have been loading data from a static JSON file in our own repository.
But what fun is that?

Let’s load data from another website and display it in our app!
We will use GitHub’s [API](https://en.wikipedia.org/wiki/Web_API) to read stats about our GitHub profile and display them in our homepage.

### Step 3.0: Follow some of your classmates!

If you’re new to GitHub, you may not have followers yet.
Since we will be printing out your number of followers from the GitHub API in this step, it will be more rewarding the more followers you have.
Plus, you get to explore how quickly the API updates with new data!

Ask the people next to you, behind you, and in front of you for their GitHub usernames,
and follow them.
Then ask them to follow you back.
When you leave the lab, you should all have at least three followers and three following.

### Step 3.1: Viewing the data in our browser

GitHub is one of the few APIs left that provides public data without requiring us to authenticate.
We can use the [`/users/username`](https://docs.github.com/en/rest/users/users?apiVersion=2022-11-28#get-a-user) [_API endpoint_](https://blog.hubspot.com/website/api-endpoint) to get public data about a user.
Visit `https://api.github.com/users/your-username` in your browser, replacing `your-username` with your GitHub username.
For example, here is mine: [`https://api.github.com/users/giorgianicolaou`](https://api.github.com/users/giorgianicolaou).

You should see something like this in your browser:

<img src="images/github-api-data.png" alt="" class="browser" data-url="https://api.github.com/users/leaverou">

### Step 3.2: Fetching the data with Javascript

To make an arbitrary HTTP request in JS, we can use the [`fetch()`](https://developer.mozilla.org/en-US/docs/Web/API/fetch) function. In this step, you’ll use JavaScript to fetch data from GitHub’s API and display it dynamically on the page.

#### **1. Writing an Asynchronous Function**

You’ll need an asynchronous function to fetch data from the GitHub API. Start by defining a function that takes a username as an argument.

```js
const fetchGitHubData = async (username) => {
    // Your code will go here
};
```

**What to Do:**
1. Create this function in your JavaScript file.
2. Remember, `async` allows you to use `await` inside the function.

#### **2. Fetching the Data**

Inside the function, use the `fetch` method to request data from the GitHub API. The API URL should include the `username` parameter.

```js
const response = await fetch(`https://api.github.com/users/${username}`);
```

**What to Do:**
1. Place this line inside your function.
2. Replace `username` with a dynamic variable passed to the function.

**Check Your Understanding:** 
- What does `fetch` do?
- Why do we use `await` with `fetch`?


#### **3. Parsing the Response**

Once you’ve fetched the data, parse the response as JSON to make it usable in JavaScript.

```js
const data = await response.json();
```

**What to Do:**
1. Add this line after your `fetch` call.
2. Use `console.log(data)` to inspect the structure of the fetched data in the browser’s developer console.

**Think About It:**
- What does `response.json()` return?
- Why do we use `await` here as well?

#### **4. Targeting the HTML Element**

Identify the container in your HTML where the fetched data will be displayed. Use `document.getElementById` or `querySelector` to select it.

```js
const statsContainer = document.getElementById('profile-stats');
```

**What to Do:**
1. Add this line to your function.
2. Check your HTML file to ensure there’s an element with the ID `profile-stats`.

#### **5. Updating the HTML**

If the container exists, update its content using the fetched data. Use template literals to dynamically insert the data into your HTML. You can include the information that you would like to display on your website, but here is an example: 

```js
if (statsContainer) {
    statsContainer.innerHTML = `
        <dl>
          <dt>Public Repos:</dt><dd>${data.public_repos}</dd>
          <dt>Public Gists:</dt><dd>${data.public_gists}</dd>
          <dt>Followers:</dt><dd>${data.followers}</dd>
          <dt>Following:</dt><dd>${data.following}</dd>
        </dl>
    `;
}
```

**What to Do:**
1. Add this block inside the function, after checking if `statsContainer` exists.
2. Add additional placeholders (`${data.public_repos}`, etc.) with data fields from your `data` object if you want.

**Test Your Knowledge:**
- Why do we use template literals here?
- What does the `<dl>` element represent in HTML?

#### **6. Testing the Function**

Now that the function is complete, call it with a specific GitHub username to see the data displayed.

```js
fetchGitHubData('giorgianicolaou');
```

**What to Do:**
1. Call your function at the end of your script.
2. Replace `'giorgianicolaou'` with your GitHub username to test with your own data.


{: .important }

> `fetch()` is an example of an [asynchronous function](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous/Concepts).
> This means that it does not return the data directly, but rather a [Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise) that will eventually resolve to the data.
> In fact, `fetch()` returns a `Promise` that resolves to a [`Response`](https://developer.mozilla.org/en-US/docs/Web/API/Response) object, which is a representation of the response to the request.
> To get meaningful data from a `Response` object, we need to call one of its methods, such as `json()`, which returns a `Promise` that resolves to the JSON representation of the response body.
> You do not need to understand promises deeply for the purposes of this lab,
> but if you want to learn more, you can read [MDN’s guide to promises](https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous/Promises).

 Add a `<div>` dropdown with an `id="profile-stats"` in your homepage HTML to display the fetched data with a header.

You can style it however you want! 

<img src="https://github.com/dsc-courses/dsc106-2025-wi/raw/43d13f763aab1b2af6990316e0735bb7c975181a/labs/lab05/images/gh-stats-styled.png" alt="">

In case you want a similar style, the gist of it is:

- I applied a grid on the `<dl>` with four equal-sized columns (1fr each)
- I used grid-row to override the automatic grid placement and specify that every `<dt>` should be placed on the first row of the grid, and every `<dd>` on the second row

## Step 4: Update your project data

This is in preparation for the next lab.
Please update your project data (`src/projects.json`) with your assignments from the class and any other projects you can think of.
Make sure you have at least 12 projects, even if you need to leave some placeholder data in.
Also add a `"year"` field to each project with a number for the year you worked on it.
Example:

```js
{
  "title": "Lorem ipsum dolor sit.",
  "year": "2024",
  "image": "https://vis-society.github.io/labs/2/images/empty.svg",
  "description": "Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam dolor quos, quod assumenda explicabo odio, nobis ipsa laudantium quas eum veritatis ullam sint porro minima modi molestias doloribus cumque odit."
},
```

Make sure not all your projects have the same year, since in the next lab we’ll be drawing visualizations based on it, and it would be a pretty boring visualization if they all had the same one!


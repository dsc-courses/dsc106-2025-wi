// Step 1
console.log("IT’S ALIVE!");

function $$(selector, context = document) {
    let myArray = Array.from(context.querySelectorAll(selector));
    console.log(myArray);
    return myArray;
}

// 
const form = document.querySelector('form');
form?.addEventListener('submit', (event) => {
    event.preventDefault();
    const data = new FormData(form);
    let url = 'mailto:example@example.com?';
    for (let [name, value] of data) {
        url = url + `${name}=${encodeURIComponent(value)}&`;
        console.log(name, value);
    }

    location.href = url; // it opens the email client with the email address and subject line filled in
    // location is a property of the global object, it is a reference to the current URL
});

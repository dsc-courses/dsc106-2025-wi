// button is null, why??
const button = document.querySelector('#submit');

button.addEventListener('click', (event) => {
  event.preventDefault();
  console.log(event);
});

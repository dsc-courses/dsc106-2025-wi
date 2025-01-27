const button = document.querySelector('#submit');

button.addEventListener('click', (event) => {
  const celsiusTag = document.querySelector('#celsius');
  const celsius = celsiusTag.value;
  const fah = (celsius * 9) / 5 + 32;

  const result = document.querySelector('#result');
  result.innerText = `${celsius} degrees Celsius is ${fah} degrees Fahrenheit.`;
});

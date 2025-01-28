const celsiusTag = document.querySelector('#celsius');
const result = document.querySelector('#result');

celsiusTag.addEventListener('input', (event) => {
  const celsius = celsiusTag.value;
  const fah = (celsius * 9) / 5 + 32;
  result.innerText = `${celsius} degrees Celsius is ${fah} degrees Fahrenheit.`;
});

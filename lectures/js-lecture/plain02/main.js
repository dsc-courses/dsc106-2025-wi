document.addEventListener('DOMContentLoaded', () => {
  const button = document.getElementById('submit');

  button.addEventListener('click', (event) => {
    event.preventDefault();
    const celsiusTag = document.getElementById('celsius');
    const celsius = celsiusTag.value;
    const fah = (celsius * 9) / 5 + 32;

    const result = document.getElementById('result');
    result.innerText =
      `${celsius} degrees Celsius is ${fah} degrees Fahrenheit.`;
  });
});




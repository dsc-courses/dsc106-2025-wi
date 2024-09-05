<script>
  // Works, but not the Svelte way!
  import { onMount } from 'svelte';
  onMount(() => {
    const button = document.getElementById('submit');

    button.addEventListener('click', (event) => {
      const celsiusTag = document.getElementById('celsius');
      const celsius = celsiusTag.value;
      const fah = (celsius * 9) / 5 + 32;

      const result = document.getElementById('result');
      result.innerText = `${celsius} degrees Celsius is ${fah} degrees Fahrenheit.`;
    });
  });
</script>

<main>
  <h1>Temperature Converter</h1>

  <div id="converter">
    <input type="text" id="celsius" placeholder="Celsius" />
    <button id="submit" type="submit">Convert</button>
  </div>

  <div id="result">X degrees Celsius is Y degrees Fahrenheit</div>
</main>

<style>
  main {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
      'Helvetica Neue', Arial, sans-serif;
    max-width: 800px;
    margin: 5em auto;
    padding: 1em;
  }

  #converter {
    margin-bottom: 1em;
  }
</style>

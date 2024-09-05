<script>
  let celsiusTag;
  let button;
  let result;

  function updateFah() {
    const celsius = celsiusTag.value;
    const fah = (celsius * 9) / 5 + 32;
    result.innerText = `${celsius} degrees Celsius is ${fah} degrees Fahrenheit.`;
  }
</script>

<main>
  <h1>Temperature Converter</h1>

  <div id="converter">
    <input bind:this={celsiusTag} type="text" placeholder="Celsius" />
    <button bind:this={button} on:click={updateFah}>Convert</button>
  </div>

  <div bind:this={result} id="result">
    X degrees Celsius is Y degrees Fahrenheit
  </div>
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

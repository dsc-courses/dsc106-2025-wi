<script>
  let celsius = 0;
  $: fah = (celsius * 9) / 5 + 32;
</script>

<main>
  <h1>Temperature Converter</h1>

  <div id="converter">
    <input bind:value={celsius} type="text" />
  </div>

  <div id="result">
    {celsius} degrees Celsius is
    {fah} degrees Fahrenheit
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

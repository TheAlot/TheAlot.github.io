<script lang="ts">
  import AwesomeButton from './lib/atoms/AwesomeButton.svelte';

  const { log } = console;
</script>

<main>
  <div>
    <p>This is the webpage</p>
  </div>
  <AwesomeButton
    onClick={(_event) => {
      log('button clicked');
    }}
  />
</main>

<style>
  :root {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
      Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    background: rgb(255, 255, 255);
  }
</style>

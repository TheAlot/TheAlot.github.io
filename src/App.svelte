<script lang="ts">
  import AwesomeButton from './lib/atoms/AwesomeButton.svelte';

  const { log } = console;
</script>

<main>
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
  }

  main {
    text-align: center;
    padding: 1em;
    margin: 0 auto;
  }
</style>

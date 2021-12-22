import App from './App.svelte';

const target = document.getElementById('app');
if (!target) {
  throw new Error('Html did not contain an element with id="app"');
}

const app = new App({
  target,
});

export default app;

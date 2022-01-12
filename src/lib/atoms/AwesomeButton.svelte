<script lang="ts">
  const { log } = console;
  export let title = 'Button';
  export let loadingText = 'Wait';
  export let type = 'primary';
  export let size = 'auto';
  export let disabled = false;
  export let visible = true;
  export let ripple = false;
  export let onClick: svelte.JSX.MouseEventHandler<HTMLButtonElement> = (
    _event,
  ) => {
    log(type, size, disabled, visible, ripple);
  };
  export let loading = false;

  let button: HTMLButtonElement;

  let mousePos = 'middle';

  const onMouseMove: svelte.JSX.MouseEventHandler<HTMLButtonElement> = (
    event,
  ) => {
    const { left } = button.getBoundingClientRect();
    const width = button.offsetWidth;
    if (event.pageX < left + width * 0.3) {
      mousePos = 'left';
    } else if (event.pageX > left + width * 0.65) {
      mousePos = 'right';
    } else {
      mousePos = 'middle';
    }
    log(mousePos);
  };
</script>

<button bind:this={button} on:click={onClick} on:mousemove={onMouseMove} class={mousePos}>
  <span>
    {loading ? loadingText : title}
  </span>
</button>

<style src="./style.scss"></style>
